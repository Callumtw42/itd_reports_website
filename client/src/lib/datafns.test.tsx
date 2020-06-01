import { getUniqueValues, addRows } from './datafns'

interface obj {
    [key: string]: any
}


test("getUniqueValues", () => {
    let data: obj[] = [
        { x: 0, y: "a" },
        { x: 1, y: "a" },
        { x: 0, y: "b" },
        { x: 1, y: "b" }
    ]
    let expX: number[] = [
        0, 1
    ]
    let expY: string[] = [
        "a", "b"
    ]
    expect(getUniqueValues(data, "x")).toMatchObject(expX)
    expect(getUniqueValues(data, "y")).toMatchObject(expY)
})

test("addRows", () => {

    let data: obj[] = [
        { x: 0, y: "a" },
        { x: 1, y: "a" },
    ]

    let exp: obj[] = [
        { x: 0, y: "a" },
        { x: 1, y: "a" },
        { x: 0, y: "b" },
        { x: 1, y: "b" }
    ]

    let toAdd: obj[] = [
        { x: 0, y: "b" },
        { x: 1, y: "b" }
    ]
    expect(addRows(data, toAdd)).toMatchObject(exp)
})