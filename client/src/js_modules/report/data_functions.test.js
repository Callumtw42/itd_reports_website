import  useDataFunctions  from './data_functions'

const { ...d } = useDataFunctions();

let data = [
    { a: 0, b: 1, c: -1, d: 1.5, e: -1.5, f: 'banana' },
    { a: 0, b: 1, c: -1, d: 1.5, e: -1.5, f: 'banana' }
]

let empty = []

    test("test array for emptyness", () => {
        expect(d.notEmpty(data)).toEqual(2);
    })