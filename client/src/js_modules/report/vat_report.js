import 'date-fns';
import React, { useEffect } from 'react';
import { useReport, useDate, useDataFunctions } from './sales_breakdown.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import * as f from '../functions.js';
import styled, { injectGlobal } from 'styled-components';

export function VAT(props) {

    const {
        startDate,
        endDate,
        Dates,
        ...date
    } = useDate()

    const {
        removeColumns,
        sumAndGroup,
        ...dataFunctions
    } = useDataFunctions();

    const {
        data
    } = useReport(
        props,
        `/api/VAT/${props.db}/${startDate}/${endDate}`,
        (data) => { return removeColumns(data, 'date', 'Price', 'Type', 'IDiscount', 'Discount', 'PriceBand', 'RefundID', 'RefundDate', 'Amount') },
        (data) => { return data }
    );

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar header={props.header}></HeaderBar>
                <div className='reportBody'>
                    <Dates />
                    <H1>Total VAT</H1>
                    <EnhancedTable data={sumAndGroup(data, 'VatRate')} />
                    <H1>VAT Receipts</H1>
                    <EnhancedTable data={sumAndGroup(data, 'Receipt_No')} />
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


