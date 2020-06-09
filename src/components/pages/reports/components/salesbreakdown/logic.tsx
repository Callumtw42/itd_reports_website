import React from 'react'
import * as d from "../../../../../lib/datafns"


export function formatTableData(data: d.obj[], groupBy: string): d.obj[] {
    let format = d.sumAndGroup(data, groupBy, 'Id', 'CashierNum');
    switch (groupBy) {
        case 'PriceMark': return d.columns(format, 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
        case 'Cashier': return d.columns(format, 'Cashier', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
        case 'Product': return d.columns(format, 'Product', 'Id', 'Category', 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
        case 'Category': return d.columns(format, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
        case 'Receipt': return d.columns(format, 'Receipt', 'Cashier', 'TillDate', 'TillTime', 'Sales', 'Cost', 'Discount', 'DsctReason', 'Refund', 'Profit', 'Qty');
        default: return d.columns(format, 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
    }
}

export interface GetDateFieldProps {
    chart: string
}

export interface GetChartProps {
    chart: string
}

export interface SalesBreakdownProps {
    header: string
    db: string
    display: React.Dispatch<any>
    phoneDisplay: string
}

export function convertPM(data: d.obj[]) {
    let priceMark = d.addColumn(data, 'AssocProdID', 'PriceMark', (cell) => { return cell ? 'PM' : 'Non PM' });
    priceMark.forEach(e => { Object.assign(e, { ['Profit']: (e['Sales'] - e['Discount'] - e['Cost']) }) });
    return priceMark;
}
