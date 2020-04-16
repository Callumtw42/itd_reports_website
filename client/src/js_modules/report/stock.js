import 'date-fns';
import React, { useEffect } from 'react';
import { useSalesBreakdown } from './sales_breakdown.js';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';

export function Stock(props) {

    const {
        header,
        tableData,
        allocateData,
        data,
        fetchData,
    } = useSalesBreakdown(props, {formatTableData});

    useEffect(() => {
        if (props.display === 'inline') props.callBack(header);
    }, [props.display, header]);

    useEffect(() => {
        fetchData(`/api/stock/${props.db}`);
    }, []);

    useEffect(() => {
        allocateData(data);
    }, [data]);

    function formatTableData(data) {
        return data;
    }

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

