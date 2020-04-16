import 'date-fns';
import React, { useEffect } from 'react';
import { useReport } from './sales_breakdown.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';

export function Stock(props) {

    const {
        tableData
    } = useReport(props, `/api/stock/${props.db}`, (data)=>{return data}, (data)=>{return data});

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

