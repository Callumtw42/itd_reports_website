import styled from 'styled-components';
import useSimpleSelect from '../select'
import useDataFunctions from './data_functions'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from './data';
import useDate from './date';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from '../header_bar'
import SimpleSelect from '../select'
import EnhancedTable from '../table'
export default function CashierHistory(props) {

    const {
        columns,
        split,
        notEmpty,
        getUniqueValues,
    } = useDataFunctions();

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/salesByProduct/${props.db}/${startDate}/${endDate}`, (data) => { return (data) });

    const [tableData, setTableData] = useState([]);
    const [cashier, setCashier] = useState('');

    const {
        SimpleSelect
    } = useSimpleSelect(
        getUniqueValues(data, 'Cashier').map(e => {
            return { text: e, callBack: setCashier.bind(this, e) }
        })
    );

    useEffect(() => {
        setTableData(formatTableData(data));
    }, [data])

    function formatTableData(data) {
        let filtered = columns(data, 'Receipt', 'Product', 'Sales', 'Qty', 'Refund', 'Discount', 'TillDate', 'TillTime', 'Cashier')
        return split(filtered, 'Receipt')
    }



    function Tables() {
        return notEmpty(tableData)
            ? tableData.map((e, index) => {
                return < div key = {index}>
                    <Div >
                        <Typography>{'Receipt ' + e[0]['Receipt']}</Typography>
                        <Typography>{e[0]['TillDate'] + ' - ' + e[0]['TillTime']}</Typography>
                        <Typography>{'Cashier: ' + e[0]['Cashier']}</Typography>
                    </Div>
                    <EnhancedTable data={columns(e, 'Product', 'Qty', 'Sales')} />
                </div>
            })
            : <></>
    }

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography></HeaderBar>
                <div className='reportBody'>
                    <SimpleSelect color='black' /><Dates /><Tables />
                </div>
            </Paper>
        </div>
    );
}

const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
text-align: left;
background-color:#004064;
color: white;

.MuiTypography-body1 {
    font-size: 1em;
    margin-left: 5px;
}

`;
