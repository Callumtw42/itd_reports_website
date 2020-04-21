export default function useDataFunctions() {

    function notEmpty(data) {
        return (data && data.length);
    }

    function getColumn(data, col) {
        return (notEmpty(data)) ? data.map(e => { return e[col] }) : [0];
    }

    function sumColumn(data, col) {
        return getColumn(data, col).reduce((acc, n) => { return acc + n });
    }

    function setColumn(data, column, f) {
        let copy = JSON.parse(JSON.stringify(data));
        copy.forEach(e => e[column] = f(e[column]));
        return copy;
    }

    function addColumn(data, column, newColumn, f) {
        let copy = JSON.parse(JSON.stringify(data));
        copy.forEach(e => Object.assign(e, { [newColumn]: f(e[column]) }));
        return copy;
    }

    function removeColumns(data, ...col) {
        const _data = JSON.parse(JSON.stringify(data));
        return (notEmpty(_data)) ? _data.map(e => { col.map(c => { return delete e[c] }); return e }) : [];
    }

    function columns(data, ...cols) {
       return data.map(e => { let en = {}; cols.map(c => { return Object.assign(en, { [c]: e[c] }) }); return en });
    }

    function sumAndGroup(data, col, ...dontSum) {
        let groups = getUniqueValues(data, col);
        let split = groups.map(e => { return getElementsWithValue(data, col, e) });
        const sumObjectsByKey = (obj1, obj2) => {
            Object.keys(obj1).forEach(k => { obj1[k] = (typeof obj1[k] === 'number' && k !== col && !dontSum.includes(k)) ? obj1[k] + obj2[k] : obj1[k] });
            return obj1;
        }
        split = JSON.parse(JSON.stringify(split));
        let grouped = split.map(a => { return a.reduce(sumObjectsByKey) });
        return grouped;
    }

    function getUniqueValues(data, col) {
        return [...new Set(data.map(i => {
            return i[col];
        }))];
    }

    function getElementsWithValue(data, key, value) {
        return data.filter(e =>
            e[key] === value)
    }

    return {

        notEmpty,
        getColumn,
        sumColumn,
        setColumn,
        addColumn,
        removeColumns,
        sumAndGroup,
        getUniqueValues,
        getElementsWithValue,
        columns

    }

}