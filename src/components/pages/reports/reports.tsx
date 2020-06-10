
import React, { useState } from 'react';
import useNavBar from './navbar/navbar'
import { RouteComponentProps } from "react-router-dom"
import CashierHistory from './components/cashier_history'
import VoidSales from './components/cashier_history';
import CustomerCredit from './components/customer_credit';
import ExpiryDates from './components/expiry_dates';
import PriceOverride from './components/price_override';
import ProductExchange from './components/product_exchange';
import Refund from './components/refund';
import ReturnToSupplier from './components/return_to_supplier';
import { SalesBreakdown } from './components/salesbreakdown/sales_breakdown';
import StaffHours from './components/staff_hours';
import { StockReport } from './components/stockreport/stockreport';
import { VAT } from './components/vat_report/vat_report';
import VoucherSales from './components/voucher_sales';
import Wastage from './components/wastage';
// import Div from './style';
import './style.scss'

export default function Reports(props: RouteComponentProps) {
    const { db, NavBar } = useNavBar()
    return (
        <div className="reportspage">
            <NavBar />
            < div className="reports">
                <SalesBreakdown header={'Sales Breakdown'} db={db} />
                <StockReport id="stock" header={'Stock'} db={db} />
                <CashierHistory header={'Cashier History'} db={db} />
                <VAT header={'VAT'} db={db} />
                <PriceOverride header={'Price Override Report'} db={db} />
                <Wastage header={'Wastage'} db={db} />
                <Refund header={'Refund Report'} db={db} />
                <StaffHours header={'Staff Hours'} db={db} />
                <ExpiryDates header={'Expiry Dates'} db={db} />

                {/* <VoidSales header={'Void Sales'} db={db} /> */}
                {/* <ReturnToSupplier header={'Return To Supplier'} db={db} />
                <CustomerCredit header={'Customer Credit'} db={db} />
                <ProductExchange header={'Product Exchange'} db={db} />
                <VoucherSales header={'Voucher Sales'} db={db} /> */}
            </div>
        </div >
    )
}
