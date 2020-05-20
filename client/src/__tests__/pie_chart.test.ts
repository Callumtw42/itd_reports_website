import * as _ from '../components/piechart/logic'

test('toInt', () => {
    let str: string = "a"
    expect(_.toInt(str)).toEqual(97)
    expect(_.toInt("abc")).toEqual(979899)
})
