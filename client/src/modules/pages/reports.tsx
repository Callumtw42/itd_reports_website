
import { useOktaAuth } from '@okta/okta-react'
import React, { useState } from 'react';

import NavBar from '../navbar/navbar';
import CashierHistory from '../reports/cashier_history';
import CustomerCredit from '../reports/customer_credit';
import ExpiryDates from '../reports/expiry_dates';
import PriceOverride from '../reports/price_override';
import ProductExchange from '../reports/product_exchange';
import Refund from '../reports/refund';
import ReturnToSupplier from '../reports/return_to_supplier';
import { SalesBreakdown } from '../reports/sales/sales_breakdown';
import StaffHours from '../reports/staff_hours';
import { Stock } from '../reports/stock';
import { VAT } from '../reports/vat_report';
import VoidSales from '../reports/void_sales';
import VoucherSales from '../reports/voucher_sales';
import Wastage from '../reports/wastage';
import SideBar from '../sidebar';
import Div from './style';
import { RouteComponentProps } from 'react-router-dom'

export default function Reports(props: RouteComponentProps) {
    const [display, setDisplay] = useState({
        salesByCategory: 'none',
        salesByHour: 'inline',
        stock: 'none',
        noSales: 'none'
    });
    const [header, setHeader] = useState({ row1: 'Test1', row2: 'Test2' });
    const [sideBar, setSideBar] = useState(false);
    const [db, setDb] = useState('itdepos');

    const logout = async () => {
        // Redirect to '/' after logout
    }

    return (
        <Div display={display}>

            <div className='navBar'>
                <NavBar
                    header={header}
                    setSideBar={setSideBar}
                    setDb={setDb}>
                </NavBar>
            </div>

            <SideBar
                display={sideBar}
                setSideBar={setSideBar}
                setDisplay={setDisplay}

            />
            <div className="content">

                <button onClick={logout}>Logout</button>
                <div className='paper' id='salesByCategory'>
                    <SalesBreakdown
                        header={'Sales Breakdown'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.salesByCategory}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <CashierHistory
                        header={'Cashier History'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='stock'>
                    <Stock
                        header={'Stock'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='VAT'>
                    <VAT
                        header={'VAT'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <PriceOverride
                        header={'Price Override Report'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <Wastage
                        header={'Wastage'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <Refund
                        header={'Refund Report'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <StaffHours
                        header={'Staff Hours'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <VoidSales
                        header={'Void Sales'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <ReturnToSupplier
                        header={'Return To Supplier'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <CustomerCredit
                        header={'Customer Credit'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <ProductExchange
                        header={'Product Exchange'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <ExpiryDates
                        header={'Expiry Dates'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

                <div className='paper' id='CustomerCredit'>
                    <VoucherSales
                        header={'Voucher Sales'}
                        db={db}
                        setHeader={setHeader}
                        phoneDisplay={display.stock}
                    />
                </div>

            </div>
        </Div>
    )
}
