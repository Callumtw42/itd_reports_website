import { run, select, readFile } from "./server-utils"
import * as Rb from "rambda"
import * as R from "ramda"
import * as d from "../src/utils"
import { curry, any, compose, where, reduce, filter, groupWith, includes, map, pick, pipe, prop, props, sum, transpose, __ } from "ramda"

// const { splitOther, getPieData } = require("./chart-utils/chart-utils")
const { getPieData, getLineData, getBarData } = require("./chart");
const dbg = console.log


function getTableData(results, groupBy) {
    const filtered = (() => {
        switch (groupBy) {
            case "Category": return d.columns(results, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            case "Product": return d.columns(results, "Product", 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            case "PriceMark": return d.columns(results, "PriceMark", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            case "Cashier": return d.columns(results, "Cashier", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            case "Receipt": return d.columns(results, "Receipt", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
        }
    })();
    const summedAndGrouped = d.sumAndGroup(filtered, groupBy);
    const colored = summedAndGrouped.map((o, i) =>
        Rb.map((v, k) =>
            k === groupBy
                ? { value: v, color: d.colors(i) }
                : v
            , o)
    )
    return colored;
}

function get24hrRange() {
    const labels = [];
    for (let i = 0; i < 24; i++) {
        if (i < 10)
            labels.push("0" + i + ":00");
        else
            labels.push(i + ":00");
    }
    return labels;
}

function getDays(startDate, endDate) {
    const days = [];
    while (startDate != endDate) {
        startDate = d.addToDate(startDate, 1)
        days.push(startDate);
    }
    return days;
}


export function sales(req, res, db) {

    //Sales New
    const { startDate, endDate, groupBy, metric, dateRange } = req.params;
    run(`USE ${req.params.db};`, db);

    const sql = readFile("sql/Sales.sql")
        .replace("${startDate}", `"${startDate}"`)
        .replace("${endDate}", `"${endDate}"`)

    const labelMap = {
        Day: get24hrRange(),
        Week: getDays(startDate, endDate),
        Month: getDays(startDate, endDate),
        Quarter: getDays(startDate, endDate),
        Year: getDays(startDate, endDate)
    }

    const callback = (results) => {
        // const filtered = d.columns(data, metric, groupBy);
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        const tableData = getTableData(results, groupBy);
        const barData = getBarData(results, metric, groupBy, labelMap[dateRange], timePeriod);
        const pieData = getPieData(results, metric, groupBy)
        const lineData = getLineData(results, metric, groupBy, labelMap[dateRange], timePeriod);
        const total = d.sumColumn(results, metric)
        let data = {};
        if (metric === "Sales" || metric === "Profit") {
            data = {
                tableData: d.roundData(tableData, 2, ["Sales", "Cost", "Discount", "Refund", "Profit"]),
                barData: d.roundData(barData, 2),
                pieData: d.roundData(pieData, 2),
                lineData: d.roundData(lineData, 2),
                total: "£" + total.toFixed(2)
            }
        }
        else data = {
            tableData: d.roundData(tableData, 2, ["Sales", "Cost", "Discount", "Refund", "Profit"]),
            barData: barData,
            pieData: pieData,
            lineData: lineData,
            total: total
        }
        res.json(data)
    };

    select(sql, db, res, callback)
}