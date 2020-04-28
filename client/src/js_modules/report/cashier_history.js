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

    const [tableData, setTableData] = useState([]);

    const [cashier, setCashier] = useState('');

    const {
        split,
        notEmpty,
        ...d
    } = useDataFunctions();

    const {
        startDate,
        endDate,
        Dates
    } = useDate();

    const {
        data
    } = useData(`/api/salesByProduct/${props.db}/${startDate}/${endDate}`, (data) => { return (data) });

    const {
        SimpleSelect,
    } = useSimpleSelect(
        d.getUniqueValues(data, 'Cashier').map(e => {
            return { text: e, callBack: setCashier.bind(this, e) }
        })
    );

    function formatTableData(data, cashier) {
        let filterColumns = d.columns(data, 'Receipt', 'Product', 'Sales', 'Qty', 'Refund', 'Discount', 'TillDate', 'TillTime', 'Cashier')
        let filterRows = d.getElementsWithValue(filterColumns, 'Cashier', cashier)
        let sortByReceipt = d.sort(filterRows, 'Receipt')
        return split(sortByReceipt, 'Receipt')
    }

    function Tables() {

        let lastDate = '00-00-00'

        function PrintDate(date) {
            if (date === lastDate)
                return <></>
            else {
                lastDate = date;
                return <DateLabel><Typography>{date}</Typography></DateLabel>
            }
        }

        return (
            tableData.map((e, index) => {
                return < div key={index}>
                    {PrintDate(e[0]['TillDate'])}
                    <TableLabel>
                        <Typography>{'Receipt ' + e[0]['Receipt']}</Typography>
                        <Typography>{e[0]['TillTime']}</Typography>
                    </TableLabel>
                    <EnhancedTable data={d.columns(e, 'Product', 'Qty', 'Sales')} />
                </div>
            })
        )
    }

    useEffect(() => {
        setTableData(formatTableData(data, cashier));
    }, [cashier, data])

    useEffect(() => {
        setCashier(
            data[0]
                ? data[0]['Cashier']
                : ''
        )
    }, [data])

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography><Dates color='white' /></HeaderBar>
                <div className='reportBody'>
                    <SimpleSelect color='black' /><Tables />
                </div>
            </Paper>
        </div>
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
