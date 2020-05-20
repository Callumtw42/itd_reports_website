import 'date-fns';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import HeaderBar from '../header_bar'
import * as d from './datafns';
import useDate from '../usedate/usedate';
import useReport from './report';
import Table from '../table/table';


export function VAT(props: { db: string, header: string }) {

    const {
        startDate,
        endDate,
        Dates,
        ...date
    } = useDate()


    const {
        data
    } = useReport(
        props,
        `/api/VAT/${props.db}/${startDate}/${endDate}`,
        (data: d.obj[]) => { return d.columns(data, 'VatRate', 'Receipt_No', 'Total_Sales', 'Quantity', 'Total_VAT', 'Nett') },
    );

    let totalVat: d.obj[] = d.sumAndGroup(d.removeColumns(data, 'Receipt_No'), 'VatRate')
    let receipts: d.obj[] = d.sumAndGroup(d.removeColumns(data, 'VatRate'), 'Receipt_No')

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar>
                    <Typography className='text' variant="h6">{props.header}</Typography>
                    <Dates color='white' />
                </HeaderBar>
                <div className='reportBody'>
                    <H1>Total VAT</H1>
                    <Table data={totalVat}  />
                    <H1>VAT Receipts</H1>
                    <Table data  ={receipts} />
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


