
export function getUniqueValues(objArr, key) {
    return [...new Set(objArr.map(i => {
        return getValue(i, key);
    }))];
}

export function getElementsWithValue(objArr, key, value) {
    return objArr.filter(e =>
        getValue(e, key) === value)
}

export function getData(url) {
    fetch(url)
        .then(res => res.json())
        .catch((error) => {
        })
}

export function add(total, n) {
    return total + n
}

export function colors(subArr) {
    let colors = [
        'rgba(0,0,0, 0.6)',
        'rgba(128,128,128, 0.6)',
        'rgba(128,128,0, 0.6)',
        'rgba(128,0,128, 0.6)',
        'rgba(128,0,0, 0.6)',
        'rgba(0,128,128, 0.6)',
        'rgba(0,128,0, 0.6)',
        'rgba(0,0,128, 0.6)',

        'rgba(255,255,255, 0.6)',
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
    return subArr.map(i => { return colors[colors.length - (i % colors.length) - 1] });
}

export function notEmpty(data) {
    return (data && data.length)
}

export function exists(data) {
    return (data) ? true : false;
}

export function getColumn(data, col) {
    return (notEmpty(data)) ? data.map(e => { return getValue(e, col) }) : []
}

export function removeColumns(refData, ...col) {
    const data = JSON.parse(JSON.stringify(refData));
    return (notEmpty(data)) ? data.map(e => { col.map(c => { return delete e[c] }); return e }) : [];
}

export function sum(arr) {
    return (notEmpty(arr)) ? arr.reduce((acc, n) => { return acc + n }) : 0;
}

export function getValue(e, key) {
    return e[key];
}

export function convertDate(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
}

export function sizeOf(e) {
    return Object.keys(e).length;
}

export function viewport(small, large) {
    return (window.innerWidth > 1024) ? small : large;
}

export function sumAndGroup(refData, groupBy) {
    const data = JSON.parse(JSON.stringify(refData));
    let groups = getUniqueValues(data, groupBy);
    let split = groups.map(e => { return getElementsWithValue(data, groupBy, e) });
    const sumObjectsByKey = (obj1, obj2) => {
        Object.keys(obj1).forEach(k => { obj1[k] = (typeof obj1[k] === 'number' && k !== groupBy) ? obj1[k] + obj2[k] : obj1[k] });
        return obj1;
    }
    let grouped = split.map(a => { return a.reduce(sumObjectsByKey) });
    return grouped;
}

