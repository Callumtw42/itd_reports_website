import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from '../../../../lib/usedata';
import useDate from '../../../../lib/usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from './headerbar/headerbar'
import SimpleSelect from '../../../../lib/useselect/useselect'
import Table from '../../../../lib/table/table'
import {  ReportProps} from './logic'
export default function Refund(props: ReportProps) {

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/refund/${props.db}/${startDate}/${endDate}`);

    // const [tableData, setTableData] = useState([]);
    // const Table = useTable(data)

    // useEffect(() => {
    //     setTableData(data);
    // },[data])

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography><Dates /></HeaderBar>
                <div className='reportBody'>
                    <Table data={data} />
                </div>
            </Paper>
        </div>
    );
}