import {  ReportProps} from '../logic';
import 'date-fns';
import "./vat.scss"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

import HeaderBar from '../headerbar/headerbar';
import { columns, obj, removeColumns, sumAndGroup } from '../../../../../lib/datafns';
import Table from '../../../../../lib/table/table';
import useDate from '../../../../../lib/usedate/usedate';
import useData from '../../../../../lib/usedata';


export function VAT(props: ReportProps) {

    const {
        startDate,
        endDate,
        Dates,
        ...date
    } = useDate()

    const { data } = useData(`/api/VAT/${props.db}/${startDate}/${endDate}`)

    const tableData = columns(data, 'VatRate', 'Receipt_No', 'Total_Sales', 'Quantity', 'Total_VAT', 'Nett')
    const totalVat: obj[] = sumAndGroup(removeColumns(tableData, 'Receipt_No'), 'VatRate')
    const receipts: obj[] = sumAndGroup(removeColumns(tableData, 'VatRate'), 'Receipt_No')

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar>
                    <Typography className='text' variant="h6">{props.header}</Typography>
                    <Dates />
                </HeaderBar>
                <div className='reportBody'>
                    <H1>Total VAT</H1>
                    <Table data={totalVat} />
                    <H1>VAT Receipts</H1>
                    <Table data={receipts} />
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


