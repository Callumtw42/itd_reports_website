import R, { curry } from "ramda"

export const map = R.addIndex(R.map);

export const sig = (n, c, r) =>
    R.gte(n / c, r) ? n : 0

export const sigArr = (ln, lc, r) =>
    map((v, i) => sig(ln[i], lc, r), ln)


export const sumList = curry((l) =>
    R.reduce((acc: number, n: number) =>
        acc + n
    )(0, l)
)

export const sumColumns = (l2d) =>
    map(arr =>
        sumList(arr)
        , R.transpose(l2d)
    )
export const getMax = l =>
    l.sort(((i1, i2) =>
        i1 < i2 ? -1 : 1
    )).pop();

export const sig2D = curry(
    (l2d, r) =>
        map((arr) =>
            sigArr(arr, getMax(sumColumns(l2d)), r), l2d)
)

export const splitOther = (l2d, r) => {
    const oldSum = sumColumns(l2d);
    const trimmed = sig2D(l2d, r);
    const newSum = sumColumns(trimmed);
    const other = R.zipWith((i1: number, i2: number) =>
        i1 - i2
    )(<number[]>oldSum, <number[]>newSum)
    return {
        trim: trimmed,
        other: other
    }
}
