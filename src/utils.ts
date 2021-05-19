import * as R from "rambda"

export interface obj {
    [key: string]: any
}

export function addRows(data: obj[], newRows: obj[]): obj[] {
    return [...data, ...newRows]
}

export function notEmpty(data: obj[]): number {
    return (data && data.length);
}

export function getColumn(data: obj[], col: string) {
    return (notEmpty(data)) ? data.map(e => { return e[col] }) : [0];
}

export function sumColumn(data: obj[], col: string) {
    const column: number[] = getColumn(data, col);
    if (typeof column[0] != "string")
        return column.reduce((acc, n) => {
            if (typeof acc != "number")
                acc = 0;
            if (typeof n === "number")
                return acc + n
            else return acc
        });
    else return null
}

export function sumColumns(data: obj[]) {
    if (notEmpty(data)) {
        const columns = Object.keys(data[0])
        const summed = {}
        columns.forEach((col) => {
            const summedCol = sumColumn(data, col);
            Object.assign(summed, { [col]: summedCol })
        })
        return summed;
    }
    else {
        return {};
    }
}

export function setColumn(data: obj[], column: string, f: (v: any) => any) {
    const copy: obj[] = JSON.parse(JSON.stringify(data));
    copy.forEach(e => e[column] = f(e[column]));
    return copy;
}

export function addColumn(data: obj[], column: string, newColumn: string, f: (v: any) => any) {
    const copy: obj[] = JSON.parse(JSON.stringify(data));
    copy.forEach(e => Object.assign(e, { [newColumn]: f(e[column]) }));
    return copy;
}

export function removeColumns(data: obj[], ...col: string[]) {
    const _data: obj[] = JSON.parse(JSON.stringify(data));
    return (notEmpty(_data)) ? _data.map(e => { col.map(c => { return delete e[c] }); return e }) : [];
}

export function columns(data: obj[], ...cols: string[]) {
    return notEmpty(data)
        ? data.map(e => { const en = {}; cols.map(c => { return Object.assign(en, { [c]: e[c] }) }); return en })
        : []
}

export function round(n: number, precision: number) {
    const k = Math.pow(10, precision)
    const out = parseFloat((Math.round((n) * k) / k).toFixed(precision));
    return out;
}

/**Recursively rounds every value matching the given keys to the specified precision in a JSON tree 
 * If no keys are given, all numeric values are rounded
 */
export function roundData(data, precision, columns = []) {
    const arr = v => R.cond(
        [
            [() => R.is(Number, v), () => (<Number>v).toFixed(precision)],
            [() => R.is(Object, v) || R.is(Array, v), () => roundData(v, precision, columns)],
            [R.T, () => v]
        ]
    )()

    const obj = (v, k) => R.cond(
        [
            [() => R.is(Number, v) && columns.includes(k), () => (<Number>v).toFixed(precision)],
            [() => R.is(Object, v) || R.is(Array, v), () => roundData(v, precision, columns)],
            [R.T, () => v]
        ]
    )()

    return R.ifElse(
        (d) => (R.is(Object, d)) && !R.isEmpty(columns),
        (d) => R.map(obj, d),
        (d) => R.map(arr, d)
    )(data)
}

export function sumAndGroup(data: obj[], col: string, ...dontSum: string[]) {
    const groups = getUniqueValues(data, col);
    let split = groups.map(e => { return getElementsWithValue(data, col, e) });
    const sumObjectsByKey = (obj1: obj, obj2: obj) => {
        Object.keys(obj1).forEach(k => {
            obj1[k] =
                ((typeof obj1[k] === 'number' && k !== col && !dontSum.includes(k))
                    ? obj1[k] + obj2[k]
                    : obj1[k])
        });
        return obj1;
    }
    split = JSON.parse(JSON.stringify(split));
    const grouped = split.map(a => { return a.reduce(sumObjectsByKey) });
    return grouped;
}

export function split(data: obj[], col: string) {
    const groups = getUniqueValues(data, col);
    const split = {}
    groups.forEach(e => {
        Object.assign(split, { [e]: removeColumns(getElementsWithValue(data, col, e), col) })
    });
    return split;
}

export function getUniqueValues(data: obj[], col: string): any[] {
    const arr: any[] = []
    if (notEmpty(data)) {
        const uniqueVals: Set<any> = new Set()
        data.forEach(e => uniqueVals.add(e[col]))
        uniqueVals.forEach(v => arr.push(v))
    }
    return arr
}

export function getElementsWithValue(data: obj[], key: string, value: any) {
    return data.filter(e =>
        e[key] === value)
}

export function sort(data: obj[], property: any, order: string) {
    return data.sort(sortByProperty(property, order))
}

export function encodeString(str: String) {
    const n = [""]
    for (const c in str.split("")) n.push(String(c.charCodeAt(0)))
    const decString = n.join("");
    console.log(decString);
    return parseInt(decString);
}

export function sortByProperty(property: any, ordstr: string) {
    const order: number = (ordstr === 'desc') ? -1 : 1;
    return function (a: obj, b: obj) {
        if (a[property] > b[property])
            return order;
        else if (a[property] < b[property])
            return -order;
        return 0;
    }
}

export function pad(num: number | string) {
    const out = new String(num)
    if (out.length < 2)
        return "0" + out
    else return out;
}

export function addToDate(yyyymmdd: string, daysToAdd: number) {
    const startDate = new Date(yyyymmdd);
    const absDate = new Date(startDate.setDate(startDate.getDate() + daysToAdd));
    return getYYYYMMDD(absDate);
}

export function getYYYYMMDD(date: Date) {
    const out =
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate());
    return out;
}

/**
 * Takes an array of data, a column and a ratio between 0 and 1 
 * removing rows where the value in the column falls below the ratio
 * of the total of that column, summing the removed rows into a single
 * row appended at the end. String values in this row will be renamed to "Other"
 * */
export function sumOther(data, column, minRatio) {
    const total = sumColumn(data, column)
    const other = {};
    const trimmed = [];
    data.forEach(o =>
        o[column] / total > minRatio
            ? trimmed.push(o)
            : R.forEach((v, k) =>
                R.is(Number, v)
                    ? Object.assign(other, { [k]: v + other[k] || 0 })
                    : Object.assign(other, { [k]: "Other" })
                , o)
    )
    Object.assign(other, {color:"rgba(128,128,128, 0.6)"})
    if (!R.isEmpty(other)) trimmed.push(other)
    return trimmed
}

export function todaysDate() {
    const today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    return date;
}

/**Returns rows with atleast 1 cell matching on the passed string */
export function matchRows(data, matchOn) {
    const matches = [];
    const regex = new RegExp(`.*${matchOn}.*`, "i")
    data.forEach((o) => {
        const values = Object.values(o);
        if (values.some((value) => {
            if (R.is(Object, value))
                return regex.test("" + value["value"])
            else return regex.test("" + value)
        })) {
            matches.push(o);
        }
    })
    return matches;
}

export function colors(index: number) {
    const colors = [
        
        'rgba(128,128,0, 0.6)',
        'rgba(128,0,128, 0.6)',
        'rgba(128,0,0, 0.6)',
        'rgba(0,128,128, 0.6)',
        'rgba(0,128,0, 0.6)',
        'rgba(0,0,128, 0.6)',
        'rgba(255,255,0, 0.6)',
        'rgba(255,0,255, 0.6)',
        'rgba(255,0,0, 0.6)',
        'rgba(0,255,255, 0.6)',
        'rgba(0,255,0, 0.6)',
        'rgba(0,0,255, 0.6)',
        'rgba(255,255,128, 0.6)',
        'rgba(255,128,255, 0.6)',
        'rgba(255,128,128, 0.6)',
        'rgba(128,255,255, 0.6)',
        'rgba(128,255,128, 0.6)',
        'rgba(128,128,255, 0.6)',
        'rgba(128,0,255, 0.6)',
        'rgba(0,128,255, 0.6)',
        'rgba(255,128,0, 0.6)',
        'rgba(64,64,64, 0.6)',
        'rgba(192,192,192, 0.6)',
        'rgba(192,192,64, 0.6)',
        'rgba(192,64,192, 0.6)',
        'rgba(192,64,64, 0.6)',
        'rgba(64,192,192, 0.6)',
        'rgba(64,192,64, 0.6)',
        'rgba(64,64,192, 0.6)',
        'rgba(255,255,64, 0.6)',
        'rgba(255,64,255, 0.6)',
        'rgba(255,64,64, 0.6)',
        'rgba(64,255,255, 0.6)',
        'rgba(64,255,64, 0.6)',
        'rgba(64,64,255, 0.6)',
        'rgba(255,255,192, 0.6)',
        'rgba(255,192,255, 0.6)',
        'rgba(255,192,192, 0.6)',
        'rgba(192,255,255, 0.6)',
        'rgba(192,255,192, 0.6)',
        'rgba(192,192,255, 0.6)',
        'rgba(192,64,255, 0.6)',
        'rgba(64,192,255, 0.6)',
        'rgba(255,192,64, 0.6)',
        'rgba(64,64,0, 0.6)',
        'rgba(64,0,64, 0.6)',
        'rgba(64,0,0, 0.6)',
        'rgba(0,64,64, 0.6)',
        'rgba(0,64,0, 0.6)',
        'rgba(0,0,64, 0.6)',
        'rgba(192,192,0, 0.6)',
        'rgba(192,0,192, 0.6)',
        'rgba(192,0,0, 0.6)',
        'rgba(0,192,192, 0.6)',
        'rgba(0,192,0, 0.6)',
        'rgba(0,0,192, 0.6)',
        'rgba(64,0,192, 0.6)',
        'rgba(0,64,192, 0.6)',
        'rgba(192,64,0, 0.6)',
        'rgba(102,51,0, 0.6)',
        'rgba(255,229,204, 0.6)',
        'rgba(255,153,153, 0.6)',
    ];
    return colors[index % colors.length]
}

export function post(url, body, callback) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(d => callback(d))
        .catch(error => {
            console.error(error);
        });
}

export function get(url, callback) {
    fetch(url)
        .then(res => res.json())
        .then((d) => { callback(d) })
        .catch(error => {
            console.error(error);
        });
}
