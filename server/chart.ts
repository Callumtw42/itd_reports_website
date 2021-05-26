import R, { curry, any, compose, where, reduce, filter, groupWith, includes, map, pick, pipe, prop, props, sum, transpose, __ } from "ramda"
import * as d from "../src/utils"

//@ts-ignore
const sumMatrix = R.pipe(transpose, map(sum))

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

export function getBarData(results, metric, groupBy, xRange, xAxis) {
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
    const cleaned = compose(filter, curry(o => R.sum(o.data) > 0))()(datasets)
    //@ts-ignore
    const sizes = compose(map, prop("data"))()(cleaned)

    return {
        labels: labels,
        datasets: cleaned
    };
}

export function getLineData(results, metric, groupBy, xRange, xAxis,) {
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

export function getPieData(data, metric, groupBy) {
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