
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
import { StayCurrentLandscapeTwoTone } from '@material-ui/icons';

export default function Reports(props: RouteComponentProps) {
    const { db, startDate, endDate, dateRange, NavBar } = useNavBar();
    // console.log(endDate)
    return (
        <div className="reportspage">
            <NavBar />
            < div className="reports">
                <SalesBreakdown dates={{ start: startDate, end: endDate }} dateRange={dateRange} header={'Sales Breakdown'} db={db} />
                <StockReport dates={{ start: startDate, end: endDate }} id="stock" header={'Stock'} db={db} />
                <CashierHistory dates={{ start: startDate, end: endDate }} header={'Cashier History'} db={db} />
                <VAT dates={{ start: startDate, end: endDate }} header={'VAT'} db={db} />
                <PriceOverride dates={{ start: startDate, end: endDate }} header={'Price Override Report'} db={db} />
                <Wastage dates={{ start: startDate, end: endDate }} header={'Wastage'} db={db} />
                <Refund dates={{ start: startDate, end: endDate }} header={'Refund Report'} db={db} />
                <StaffHours dates={{ start: startDate, end: endDate }} header={'Staff Hours'} db={db} />
                <ExpiryDates dates={{ start: startDate, end: endDate }} header={'Expiry Dates'} db={db} />

                {/* <VoidSales header={'Void Sales'} db={db} />
                {/* <ReturnToSupplier header={'Return To Supplier'} db={db} />
                <CustomerCredit header={'Customer Credit'} db={db} />
                <ProductExchange header={'Product Exchange'} db={db} />
                <VoucherSales header={'Voucher Sales'} db={db} /> */}
            </div>
        </div >
    )
}
