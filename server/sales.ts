import { run, select, readFile } from "./server-utils"
import * as Rb from "rambda"
import * as R from "ramda"
import * as d from "../src/utils"
import { curry, any, compose, where, reduce, filter, groupWith, includes, map, pick, pipe, prop, props, sum, transpose, __ } from "ramda"

const { splitOther, getPieData } = require("./chart-utils/chart-utils")
const dbg = console.log

function getStacks(data, metric, groupBy, labels, xAxis) {
    const filterCols = compose(map, pick, () => [groupBy, metric, xAxis])()
    const dateInLabels = () => ({ [xAxis]: R.includes(__, labels) })
    //@ts-ignore
    const filterDates = compose(filter, where, dateInLabels)()
    //@ts-ignore
    const group = compose(R.groupBy, prop(groupBy))()
    const timeIndex = curry(
        (o) => R.assoc(xAxis, R.indexOf(R.prop(xAxis)(o))(labels), o)
    )
    const timeIndexes = compose(map, map, timeIndex)()
    const zeros = new Array(labels.length).fill(0)
    const reducer = curry((acc, o) => {
        const idx = o[xAxis]
        return R.update(idx, acc[idx] + o[metric], acc)
    })
    //@ts-ignore
    const yValues = compose(map, reduce(reducer, zeros))()
    //@ts-ignore
    return pipe(filterCols, filterDates, group, timeIndexes, yValues)(data)
}

//@ts-ignore
const sumMatrix = R.pipe(transpose, map(sum))

function getAxisData(data, metric, groupBy, labels, xAxis) {
    const stacks = getStacks(data, metric, groupBy, labels, xAxis);

    const xSplit = Math.round(labels.length / 30) || 1
    //@ts-ignore
    const trimX = R.pipe(map(R.splitEvery(xSplit)), map(map(sum)))(stacks)
    const trimLabels = R.pipe(R.splitEvery(xSplit), map(R.head))(labels)

    const matrix = R.values(trimX)
    //@ts-ignore
    const totals = sumMatrix(matrix)

    return {
        data: trimX,
        labels: trimLabels,
        totals: totals
    }
}

function getBarData(results, metric, groupBy, xRange, xAxis) {
    const { data, labels, totals } = getAxisData(results, metric, groupBy, xRange, xAxis)
    //@ts-ignore
    const max = R.pipe(R.sort(R.subtract), R.last)(totals)
    //@ts-ignore
    const removeInsignificant = curry(n => (n >= 0.01 * max) ? n : 0)
    //@ts-ignore
    const trimY = R.compose(map, map, removeInsignificant)()(data)
    //@ts-ignore
    const trimYTotals = sumMatrix(R.values(trimY))
    //@ts-ignore
    const otherValues = sumMatrix([totals, map(R.negate)(trimYTotals)])
    const othered = R.assoc("Other", otherValues, trimY)


    const dataset = curry((v, k, o, i) => {
        const color = k === "Other" ? "rgba(128,128,128, 0.6)" : d.colors(i)
        return {
            label: k,
            data: v,
            backgroundColor: color,
            fill: false,
            borderColor: color,
            tension: 0.1
        }
    })
    //@ts-ignore
    const dataMap = R.addIndex(R.mapObjIndexed)(dataset)
    //@ts-ignore
    const datasets = pipe(dataMap, R.values, R.reverse)(othered)
    //@ts-ignore
    return {
        labels: labels,
        datasets: datasets
    };
}

export function sales(req, res, db) {

    //Sales New
    const { startDate, endDate, groupBy, metric, dateRange } = req.params;
    run(`USE ${req.params.db};`, db);

    const sql = readFile("sql/Sales.sql")
        .replace("${startDate}", `"${startDate}"`)
        .replace("${endDate}", `"${endDate}"`)

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

    function getTableData(results) {
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


    const labelMap = {
        Day: get24hrRange(),
        Week: getDays(startDate, endDate),
        Month: getDays(startDate, endDate),
        Quarter: getDays(startDate, endDate),
        Year: getDays(startDate, endDate)
    }

    function getLineData(results, metric, groupBy, xRange, xAxis,) {
        const { labels, totals } = getAxisData(results, metric, groupBy, xRange, xAxis)
        return {
            labels: labels,
            datasets: [{
                label: "Total",
                data: totals,
                backgroundColor: "rgba(0,64,100, 0.6)",
                fill: false,
                borderColor: "rgba(0,64,100, 0.6)",
                tension: 0.1
            }]
        }
    }


    const callback = (results) => {
        // const filtered = d.columns(data, metric, groupBy);
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        const tableData = getTableData(results);
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