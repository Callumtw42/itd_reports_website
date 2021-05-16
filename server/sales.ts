import { run, select, readFile } from "./server-utils"
import * as d from "../src/utils"

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
        return summedAndGrouped;
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
        // datasets.push(total);
        return {
            labels: labels,
            datasets: [total]

        }
    }

    function getBarData(results) {
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        return {
            labels: labels,
            datasets: getDataSets(results, labels, timePeriod)
        }
    }

    function getPieData(results) {
        const filtered = d.columns(results, metric, groupBy);
        const summed = d.sumAndGroup(filtered, groupBy);
        const labels = summed.map((obj) => obj[groupBy]);
        const data = summed.map((obj) => obj[metric]);
        return {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor: labels.map((label, index) => {
                        return d.colors(index);
                    }),
                    data: data
                }
            ]
        }
    }


    const callback = (results) => {
        const tableData = getTableData(results);
        const barData = getBarData(results);
        const pieData = getPieData(results);
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