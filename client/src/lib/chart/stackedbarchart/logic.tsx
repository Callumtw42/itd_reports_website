import {
    notEmpty,
    getUniqueValues,
    obj,
    getElementsWithValue,
    getColumn,
} from "../../datafns"

import { colors, toInt, viewport } from "../logic"

export * from "../logic"

export function getLabelSize(): number {
    return viewport(12, 26);
}

export interface DataSet {
    label: string,
    data: number[],
    backgroundColor: string,
    datasetKeyProvider: number
}

export interface ChartData {
    labels: string[],
    datasets: DataSet[]
}

export function formatChartData(data: obj[], x: string[], groupBy: string, values: string): ChartData {
    // let stacks = d.getUniqueValues(data, groupBy);
    let stackNames: string[] = getUniqueValues(data, groupBy);
    let stackIds: number[] = stackNames.map(s => { return toInt(s) })
    let clrs: string[] = colors(stackIds)
    let dataSets = stackNames.map((name, index) => {
        let color: string = clrs[index]
        let valuesArr: number[] = x.map((t: string) => {
            let atHour: obj[] = getElementsWithValue(data, 'TillHour', t);
            let withCategory: obj[] = getElementsWithValue(atHour, groupBy, stackNames[index]);
            let withValue: number[] = getColumn(withCategory, values) as number[];
            return notEmpty(withCategory) ? withValue.reduce((acc, n) => acc + n) : 0;
        })
        return {
            label: stackNames[stackNames.indexOf(name)] as string,
            data: valuesArr,
            backgroundColor: color,
            datasetKeyProvider: index
        }
    });
    return {
        labels: x,
        datasets: dataSets
    };
}