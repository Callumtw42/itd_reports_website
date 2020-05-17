
export default function useDataFunctions() {

    interface obj {
        [key: string]: any
    }

    function notEmpty(data: obj[]): number {
        return (data && data.length);
    }

    function getColumn(data: obj[], col: string): number[] | string[] {
        return (notEmpty(data)) ? data.map(e => { return e[col] }) : [0];
    }

    function sumColumn(data: obj[], col: string) {
        let column = getColumn(data, col) as number[]
        return column.reduce((acc, n) => { return acc + n });
    }

    function setColumn(data: obj[], column: string, f: (v: any) => any) {
        let copy: obj[] = JSON.parse(JSON.stringify(data));
        copy.forEach(e => e[column] = f(e[column]));
        return copy;
    }

    function addColumn(data: obj[], column: string, newColumn: string, f: (v: any) => any) {
        let copy: obj[] = JSON.parse(JSON.stringify(data));
        copy.forEach(e => Object.assign(e, { [newColumn]: f(e[column]) }));
        return copy;
    }

    function removeColumns(data: obj[], ...col: string[]) {
        const _data: obj[] = JSON.parse(JSON.stringify(data));
        return (notEmpty(_data)) ? _data.map(e => { col.map(c => { return delete e[c] }); return e }) : [];
    }

    function columns(data: obj[], ...cols: string[]) {
        return notEmpty(data)
        ? data.map(e => { let en = {}; cols.map(c => { return Object.assign(en, { [c]: e[c] }) }); return en })
        :[] 
    }

    function sumAndGroup(data: obj[], col: string, ...dontSum: string[]) {
        let groups = getUniqueValues(data, col);
        let split = groups.map(e => { return getElementsWithValue(data, col, e) });
        const sumObjectsByKey = (obj1: obj, obj2: obj) => {
            Object.keys(obj1).forEach(k => { obj1[k] = (typeof obj1[k] === 'number' && k !== col && !dontSum.includes(k)) ? obj1[k] + obj2[k] : obj1[k] });
            return obj1;
        }
        split = JSON.parse(JSON.stringify(split));
        let grouped = split.map(a => { return a.reduce(sumObjectsByKey) });
        return grouped;
    }

    function split(data: obj[], col: string) {
        let groups = getUniqueValues(data, col);
        return groups.map(e => { return getElementsWithValue(data, col, e) });
    }

    function getUniqueValues(data: obj[], col: string): any[] {
        let arr: any[] = []
        if (notEmpty(data)) {
            let uniqueVals: Set<any> = new Set()
            data.forEach(e => uniqueVals.add(e[col]))
            uniqueVals.forEach(v => arr.push(v))
        }
        return arr
    }

    function getElementsWithValue(data: obj[], key: string, value: any) {
        return data.filter(e =>
            e[key] === value)
    }

    function sort(data: obj[], property: any, order: string) {
        return data.sort(sortByProperty(property, order))
    }

    function sortByProperty(property: any, ordstr: string) {
        let order: number = (ordstr === 'asc') ? -1 : 1;
        return function (a: obj, b: obj) {
            if (a[property] > b[property])
                return order;
            else if (a[property] < b[property])
                return -order;
            return 0;
        }
    }


    return {
        sort,
        notEmpty,
        getColumn,
        sumColumn,
        setColumn,
        addColumn,
        removeColumns,
        sumAndGroup,
        getUniqueValues,
        getElementsWithValue,
        columns,
        split


    }

}