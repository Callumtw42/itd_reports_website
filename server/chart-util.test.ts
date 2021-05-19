import { getMax, sig, sig2D, sigArr, splitOther, sumColumns, sumList } from './chart-utils';

test("testSig", () => {
    expect(sig(1, 100, 0.05)
    ).toEqual(0)
    expect(sig(1, 100, 0.01)
    ).toEqual(1)
}
);

test("testSigArr", () => {
    expect(sigArr([1, 5], [100, 100], 0.05)
    ).toEqual([0, 5])
    expect(sigArr([1, 5], [100, 100], 0.01)
    ).toEqual([1, 5])
});


test('sumList ', () => {
    expect(sumList([1, 2])).toEqual(3);
})


test("testSumColumns", () => {
    expect(sumColumns([[1, 5], [1, 5]])
    ).toEqual([2, 10])
})

test("testSig2D", () => {
    const arg = [
        [1, 2],
        [3, 4]
    ];
    const exp = [[0, 0], [3, 4]]
    expect(sig2D(arg, 0.6)
    ).toEqual(exp)
}
);


test("testSplitOther", () => {
    const arg = [
        [1, 2],
        [3, 4]
    ];
    const exp = { trim: [[0, 0], [3, 4]], other: [1, 2] }
    expect(splitOther(arg, 0.6))
        .toEqual(exp)
});

test('getMax', () => {
    expect(getMax([1, 5, 2, 4, 3])).toEqual(5)
})


export { };