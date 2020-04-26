import useDate from './date'
import 'date-fns';
import React, { useEffect, useState } from 'react';
import EnhancedTable from '../table.js';
import HeaderBar from '../header_bar.js';
import Paper from '@material-ui/core/Paper';
import SubjectIcon from '@material-ui/icons/Subject';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import useData from './data';
import useSimpleSelect from '../select';

export function Stock(props) {

    const [header, setHeader] = useState(props.header);

    const {
        data: stock
    } = useData(`/api/stock/${props.db}`, (data) => { return data });

    const {
        data: reorder
    } = useData(`/api/reorder/${props.db}`, (data) => { return data });

    const {
        data: nonScan
    } = useData(`/api/nonscan/${props.db}`, (data) => { return data });

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const [tableData, setTableData] = useState([]);

    const {
        data: stockAdjust
    } = useData(`/api/adjust/${props.db}/${startDate}/${endDate}`, (data) => { return data });

    const {
        SimpleSelect
    } = useSimpleSelect(
        [
            { callBack: setTableData.bind(this, stock), text: 'Stock' },
            { callBack: setTableData.bind(this, reorder), text: 'Reorder' },
            { callBack: setTableData.bind(this, nonScan), text: 'Non Scan' },
            { callBack: setTableData.bind(this, stockAdjust), text: 'Stock Adjust' }
        ]
    );

    const [dateOn, setDateOn] = useState(false);

    function CondDate() {
        return dateOn
            ? <Dates />
            : <></>
    }

    function handleDate(tableData) {
        if (tableData === stockAdjust)
            setDateOn(true);
        else
            setDateOn(false);
    }

    //next check data with debugger, find out what your doing wrong
    useEffect(() => {
        setTableData(stockAdjust);
    }, [stockAdjust])

    useEffect(() => {
        setTableData(stock);
    }, [stock]);

    useEffect(() => {
        if (props.display === 'inline') setHeader(header);
    }, [props.display, header]);

    useEffect(() => {
        handleDate(tableData);
    }, [tableData]);

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><SimpleSelect color = 'white' /></HeaderBar>
                <div className='reportBody'>
                    <CondDate /><EnhancedTable data={tableData} />
                </div>
            </Paper>
        </div>
    );

}

