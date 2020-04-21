import 'date-fns';
import React, { useEffect } from 'react';
import useReport from './report.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';

export function Stock(props) {

    const {
        tableData,
        data
    } = useReport(props, `/api/stock/${props.db}`, (data)=>{return data}, ()=>{return data});

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar header={props.header}></HeaderBar>
                <div className='reportBody'>
                    <EnhancedTable data={tableData} />
                </div>
            </Paper>
        </div>
    );

}

