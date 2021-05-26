import { run, select, readFile } from "./server-utils"
import * as Rb from "rambda"
import * as R from "ramda"
import * as d from "@callumtw42/toolkit/utils"
import { get24hrRange, getDays } from "@callumtw42/toolkit/time"
import { getBarData, getLineData, getPieData } from "@callumtw42/toolkit/chart"
import { getTableData } from "@callumtw42/toolkit/table"
import { curry, any, compose, where, reduce, filter, groupWith, includes, map, pick, pipe, prop, props, sum, transpose, __ } from "ramda"
// const { getPieData, getLineData, getBarData } = require("./chart");
const dbg = console.log

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
        const columns = (() => {
            switch (groupBy) {
                case "Category": return d.columns(results, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Product": return d.columns(results, "Product", 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "PriceMark": return d.columns(results, "PriceMark", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Cashier": return d.columns(results, "Cashier", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Receipt": return d.columns(results, "Receipt", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            }
        })();

        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const tableData = getTableData(columns, groupBy);
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