import * as d from '../components/reports/datafns'

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
    let expY: string[]= [
        "a", "b"
    ]
    expect(d.getUniqueValues(data, "x")).toMatchObject(expX)
    expect(d.getUniqueValues(data, "y")).toMatchObject(expY)
})