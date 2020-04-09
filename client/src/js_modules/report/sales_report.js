import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';

export default function FixedTimeReport(props) {

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [sales, setSales] = useState(0);
    const [profit, setProfit] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataChoice, setDataChoice] = useState('Sales');
    const [quantity, setQuantity] = useState(0);
    const [groupBy, setGroupBy] = useState('Cat');

    useEffect(() => {
        if (props.display === 'inline') props.callBack(header);
    }, [props.display]);

    useEffect(() => {
        switchData();
    }, [groupBy, dataChoice]);

    export const fetchData = (url, allocateData) => {
        fetch(url)
            .then(res => res.json())
            .then(data => allocateData(data))
            .catch((error) => {
            })
    }

    function getData(date) {
        return props.getData(date);
    }

    function getData(start, end) {
        return props.getData(start, end);
    }

    function chartFeed(response, groupBy) {
        return props.chartFeed(response, groupBy);
    }

    export function allocateData(response) {
        console.log(response);
        setData(response);
        formatChartData(chartFeed(response, groupBy), x => { return x.Sales });
        formatTableData(f.sumAndGroup(response, groupBy));
        setSales(
            f.sum(f.getColumn(response, 'Sales'))
        );
        setTotal(
            f.sum(f.getColumn(response, 'Sales'))
        );
        setProfit(f.sum(f.getColumn(response, 'Sales'))
            - f.sum(f.getColumn(response, 'Refund'))
            - f.sum(f.getColumn(response, 'Cost')));
        setQuantity(f.sum(f.getColumn(response, 'Qty')));
    }

    function formatTableData(_data) {
        setTableData(_data);
    }

    const handleDataChoiceSwitch = (event) => {
        let choice = event.target.value
        setDataChoice(choice);
    }

    const handleGroupBySwitch = (value) => {
        setGroupBy(value);
    }

    function Total() {

        return (
            <div className='sales'>
                <DropDown callback={handleGroupBySwitch} list={['Cat', 'Id']} title={'Group By'} />
                <RadioButtons handleChange={handleDataChoiceSwitch} value={dataChoice} />
                <h1>Total: {(total === quantity) ? total : '£' + total.toFixed(2)}</h1>
            </div>);

    }

    return (
        <Report
            header={props.header}
            tableData={props.tableData}
            content={props.content}
        />
    )

}