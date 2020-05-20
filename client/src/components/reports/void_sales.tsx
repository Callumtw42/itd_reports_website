import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from '../usedata';
import useDate from '../usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from '../header_bar'
import SimpleSelect from '../select/useselect'
import Table from '../table/table'
export default function VoidSales(props: { header: string, db: string }) {

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/voidsales/${props.db}/${startDate}/${endDate}`, (data) => { return data });

    // const [tableData, setTableData] = useState([]);
    // const Table = useTable(data)

    // useEffect(() => {
    //     setTableData(data);
    // }, [data])

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