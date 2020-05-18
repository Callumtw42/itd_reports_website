import { toInt } from '../js_modules/report/piechart/piechart'

test('toInt', () => {
    let str: string = "a"
    expect(toInt(str)).toEqual(97)
    expect(toInt("abc")).toEqual(979899)
})
