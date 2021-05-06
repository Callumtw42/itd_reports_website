import { ReportProps } from './logic'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from '../../../../lib/usedata/usedata';
import useDate from '../../../../lib/usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from './headerbar/headerbar'
import SimpleSelect from '../../../../lib/useselect/useselect'
import Table from '../../../../lib/table/table'
export default function StaffHours({dates, header, db}) {

    // const {
    //     startDate,
    //     endDate,
    //     Dates
    // } = useDate();
    const{start,end} = dates;
    const {
        data,
        Spinner
    } = useData(`api/staffhours/${db}/${start}/${end}`);

    return (
        <div className='report'>
            <Spinner>
                <Paper className='reportContainer'>
                    <HeaderBar ><Typography className='text' variant="h6">{header}</Typography></HeaderBar>
                    <div className='reportBody'>
                        <Table data={data} />
                    </div>
                </Paper>
            </Spinner>
        </div>
    );
}