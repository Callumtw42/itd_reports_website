import 'date-fns';
import React, { useEffect } from 'react';
import useDate from './date.js';
import useReport from "./report";

import useDataFunctions from "./data_functions";
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
        columns,
        ...dataFunctions
    } = useDataFunctions();

    const {
        data
    } = useReport(
        props,
        `/api/VAT/${props.db}/${startDate}/${endDate}`,
        (data) => { return columns(data, 'VatRate', 'Receipt_No', 'Total_Sales', 'Quantity', 'Total_VAT', 'Nett') },
        () => { return data }
    );

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar header={props.header}></HeaderBar>
                <div className='reportBody'>
                    <Dates />
                    <H1>Total VAT</H1>
                    <EnhancedTable data={sumAndGroup(removeColumns(data, 'Receipt_No'), 'VatRate')} />
                    <H1>VAT Receipts</H1>
                    <EnhancedTable data={sumAndGroup(removeColumns(data, 'VatRate'), 'Receipt_No')} />
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


