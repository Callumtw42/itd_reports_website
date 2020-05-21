
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from '../usedata';
import useDate from '../lib/usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from '../header_bar'
import SimpleSelect from '../lib/useselect/useselect'
import Table from '../lib/table/table'
export default function VoucherSales(props: { db: string, header: string }) {

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/voucher/${props.db}/${startDate}/${endDate}`, (data) => { return data });

    // const [tableData, setTableData] = useState([]);
    // const Table = useTable(data)

    // useEffect(() => {
    //     setTableData(data);
    // },[data])

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography><Dates color='white' /></HeaderBar>
                <div className='reportBody'>
                    <Table data={data} />
                </div>
            </Paper>
        </div>
    );
}