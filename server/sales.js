import { run, select, readFile } from "./server-utils"
import * as Rb from "rambda"
import * as R from "ramda"
import * as d from "../src/utils"
const { splitOther, sumList } = require("./chart-utils")

function getPieData(data, metric, groupBy) {
    const summed = d.sumAndGroup(data, groupBy);
    summed.forEach((o, index) =>
        Object.assign(o, { ["color"]: d.colors(index) })
    )
    const trimmed = d.sumOther(summed, metric, 0.01)
    const values = trimmed.map((obj) => obj[metric]);
    return {
        labels: d.getColumn(trimmed, groupBy),
        datasets: [{
            label: "",
            backgroundColor: trimmed.map((o) => {
                return o.color;
            }),
            data: values
        }]
    }

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

    function getDataSets(results, labels, timePeriod) {
        return d.getUniqueValues(results, groupBy).map((group, index) => {
            const filtered = d.columns(d.getElementsWithValue(results, groupBy, group), timePeriod, metric)
            const timeSlots = labels.map(label => {
                return {
                    [timePeriod]: label,
                    [metric]: 0.00
                }
            })
            //sum and group
            filtered.forEach(obj => {
                timeSlots.forEach((timeSlot) => {
                    if (obj[timePeriod] === timeSlot[timePeriod]) {
                        timeSlot[metric] += obj[metric];
                    }
                })
            })
            const data = timeSlots.map((timeSlot) => {
                return timeSlot[metric]
            })
            return {
                label: group,
                data: data,
                backgroundColor: d.colors(index),
                fill: false,
                borderColor: d.colors(index),
                tension: 0.1
            }
        })
        // return d.split(results, timePeriod).map(arr =>
        //     getDataset(arr, metric, timePeriod)
        // )
    }

    const labelMap = {
        Day: get24hrRange(),
        Week: getDays(startDate, endDate),
        Month: getDays(startDate, endDate),
        Quarter: getDays(startDate, endDate),
        Year: getDays(startDate, endDate)
    }

    function getLineData(results) {
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        const datasets = getDataSets(results, labels, timePeriod)

        const totals = labels.map(label => 0)
        datasets.forEach(dataset => {
            dataset.data.forEach((dat, index) => {
                totals[index] += dat;
            })
        })

        const total = {
            label: "Total",
            data: totals.map(t => t.toFixed(2)),
            backgroundColor: "rgba(0, 51, 81, 0.5)",
            fill: false,
            borderColor: "rgba(0, 51, 81, 0.5)",
            tension: 0.1
        }
        return {
            labels: labels,
            datasets: [total]

        }
    }

    function getBarData(results) {
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        const datasets = getDataSets(results, labels, timePeriod);
        const matrix = Rb.map(ds =>
            ds["data"]
        )(datasets)
        const { trim, other } = splitOther(matrix, 0.01)
        const splitBy = R.cond(
            [
                [R.equals("Quarter"), () => 3],
                [R.equals("Year"), () => 7],
                [R.T, () => 1]
            ]
        )
        // console.log(splitBy(dateRange))
        const split = R.splitEvery(splitBy(dateRange))
        const sum = R.sum
        const map = R.map
        const trimX = R.pipe(map(split), map(map(sum)))(trim)
        const trimLabels = R.pipe(split, map(R.head))(labels)

        const rounded = datasets.map((ds, i) => {

            return {
                label: ds.label,
                data: trimX[i],
                backgroundColor: ds.backgroundColor,
                fill: false,
                borderColor: ds.borderColor,
                tension: 0.1
            }
        }
        )

        const filter = R.filter
        const cond = o => sum(o.data) > 0;
        const trimmed = filter(cond)(rounded)
        // const trimmed = R.filter(o => {
        //     return sumList(o["data"]) > 0
        // }
        // )(rounded)


        const otherSet = {
            label: "Other",
            data: other,
            backgroundColor: "rgba(128,128,128, 0.6)",
            fill: false,
            borderColor: "rgba(128,128,128, 0.6)",
            tension: 0.1
        }
        const newDatasets = [otherSet].concat(trimmed)
        const out = {
            labels: trimLabels,
            datasets: newDatasets
        }
        return out;
    }

    const callback = (results) => {
        // const filtered = d.columns(data, metric, groupBy);
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const tableData = getTableData(results);
        // console.log(d.split(summed, timePeriod))
        const barData = getBarData(results);
        const pieData = getPieData(results, metric, groupBy)
        const lineData = getLineData(results);
        const total = d.sumColumn(results, metric)
        let data = {};
        // console.log(d.roundData(tableData, 2));
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