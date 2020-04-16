import 'date-fns';
import React, { useEffect } from 'react';
import { useSalesBreakdown } from './sales_breakdown.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import * as f from '../functions.js';
import styled, { injectGlobal } from 'styled-components';

export function VAT(props) {

    const {
        header,
        allocateData,
        data,
        fetchData,
        startDate,
        endDate,
        Dates
    } = useSalesBreakdown(props);

    useEffect(() => {
        if (props.display === 'inline') props.callBack(header);
    }, [props.display, header]);

    useEffect(() => {
        fetchData(`/api/VAT/${props.db}/${startDate}/${endDate}`);
    }, [startDate, endDate, props.db]);

    useEffect(() => {
        allocateData(data);
    }, [data]);

    function formatTotalData() {
        return f.removeColumns(f.sumAndGroup(data, 'VatRate'), 'date','Receipt_No', 'Price', 'Type', 'IDiscount', 'Discount', 'PriceBand', 'RefundID', 'RefundDate', 'Amount');
    }

    function formatDateData(data) {
        return f.removeColumns(f.sumAndGroup(data, 'Receipt_No'), 'VatRate', 'Price', 'Type', 'IDiscount', 'Discount', 'PriceBand', 'RefundID', 'RefundDate', 'Amount');
        // return data;
    }



    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar header={props.header}></HeaderBar>
                <div className='reportBody'>
                    <Dates />
                    <H1>Total VAT</H1>
                    <EnhancedTable data={formatTotalData(data)} />
                    <H1>VAT Receipts</H1>
                    <EnhancedTable data={formatDateData(data)} />
                </div>
            </Paper>
        </div>
    );

}

const H1 = styled.h1`

color: #004064;;
text-align:left;
margin-left: 1em;
font-size: 1em;

`;

