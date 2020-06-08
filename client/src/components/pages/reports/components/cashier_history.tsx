import styled from 'styled-components';
import useSimpleSelect from '../../../../lib/useselect/useselect'
import * as d from '../../../../lib/datafns'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from '../../../../lib/usedata/usedata';
import useDate from '../../../../lib/usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from './headerbar/headerbar'
import SimpleSelect from '../../../../lib/useselect/useselect'
import Table from '../../../../lib/table/table'
import { ReportProps } from "./logic";

export default function CashierHistory(props: ReportProps) {

    const [tableData, setTableData] = useState([] as d.obj[][]);
    const {
        startDate,
        endDate,
        Dates
    } = useDate();
    const {
        data,
        Spinner
    } = useData(`/api/salesByProduct/${props.db}/${startDate}/${endDate}`);
    const {
        selected,
        Select,
    } = useSimpleSelect(d.getUniqueValues(data, 'Cashier'), "black");

    function formatTableData(data: d.obj[], cashier: string) {
        let filterColumns = d.columns(data, 'Receipt', 'Product', 'Sales', 'Qty', 'Refund', 'Discount', 'TillDate', 'TillTime', 'Cashier')
        let filterRows = d.getElementsWithValue(filterColumns, 'Cashier', cashier)
        let sortByReceipt = d.sort(filterRows, 'Receipt', "desc")
        return d.split(sortByReceipt, 'Receipt')
    }

    function Tables() {
        let lastDate = '00-00-00'
        function PrintDate(date: string) {
            if (date === lastDate)
                return <></>
            else {
                lastDate = date;
                return <DateLabel><Typography>{date}</Typography></DateLabel>
            }
        }

        return (<>{
            tableData.map((e, index) => {
                return < div key={index}>
                    {PrintDate(e[0]['TillDate'])}
                    <TableLabel>
                        <Typography>{'Receipt ' + e[0]['Receipt']}</Typography>
                        <Typography>{e[0]['TillTime']}</Typography>
                    </TableLabel>
                    <Table data={d.columns(e, 'Product', 'Qty', 'Sales')} />
                </div>
            })
        }</>)
    }

    useEffect(() => {
        setTableData(formatTableData(data, selected));
    }, [data, selected])

    return (
        <div className='report' >
            <Spinner >
                <Paper className='reportContainer'>
                    <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography><Dates /></HeaderBar>
                    <div className='reportBody' id="cashierHistory">
                        <Select />
                        <Tables />
                    </div>
                </Paper>
            </Spinner>
        </div >
    );
}

const DateLabel = styled.div`
.MuiTypography-root{
text-align: left;
font-weight: bold;
color: #004064;
font-size: 1.25em; 
margin: 5px;
}
`;

const TableLabel = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
text-align: left;
background-color:#004064;
color: white;

.MuiTypography-body1 {
    font-size: 1em;
    margin-left: 5px;
    margin-right: 5px;
}

`;
