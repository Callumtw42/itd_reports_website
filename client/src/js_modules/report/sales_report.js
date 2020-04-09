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

export function useSalesReport(props) {

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [sales, setSales] = useState(0);
    const [profit, setProfit] = useState(0);
    const [total, setTotal] = useState(0);
    const [startDate, setStartDate] = useState(todaysDate());
    const [endDate, setEndDate] = useState(todaysDate());
    const [header, setHeader] = useState({ row1: "Sales Breakdown", row2: todaysDate() + ' - ' + todaysDate() });
    const [dataChoice, setDataChoice] = useState('Sales');
    const [quantity, setQuantity] = useState(0);
    const [groupBy, setGroupBy] = useState('Cat');

    

    useEffect(() => {
        getData(startDate, endDate);
        if (props.display === 'inline') props.callBack(header);
    }, [startDate, endDate, props.db]);

    useEffect(() => {
        if (props.display === 'inline') props.callBack(header);
    }, [props.display]);

    useEffect(() => {
        switchData();
    }, [groupBy, dataChoice]);

    function getData(start, end) {
        fetchData(`/api/salesByProduct/${props.db}/${start}/${end}`, allocateData);
    }

    function allocateData(response) {
        console.log(response);
        setData(response);
        formatChartData(f.sumAndGroup(response, groupBy), x => { return x.Sales.toFixed(2) });
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

    function idToName(e) {
        return (groupBy === 'Id') ? e['Product'] : e['Category'];
    }

    function formatChartData(_data, setX) {
        let axisData = (_data.length > 0) ? _data.map(e => setX(e)) : [0];
        setChartData({

            labels: _data.map(e => idToName(e)),
            datasets: [
                {
                    label: 'Net Sales £',
                    data: axisData,
                    backgroundColor: f.colors(f.getUniqueValues(_data, groupBy))
                }
            ]

        });
    }

    const dateChange = (event) => {
        let caller = event.target;
        let newDate = caller.value;
        if (caller.id === 'startDate') {
            setHeader({ row1: "Sales By Category", row2: newDate + ' - ' + endDate })
            setStartDate(newDate);
        }
        else if (caller.id === 'endDate') {
            setHeader({ row1: "Sales By Category", row2: startDate + ' - ' + newDate })
            setEndDate(newDate);
        }
    };

    const handleDataChoiceSwitch = (event) => {
        let choice = event.target.value
        setDataChoice(choice);
    }

    const handleGroupBySwitch = (value) => {
        setGroupBy(value);
    }

    function switchData() {
        switch (dataChoice) {
            case 'Sales': formatChartData(f.sumAndGroup(data, groupBy), x => { return x.Sales.toFixed(2) }); setTotal(sales);
                break;
            case 'Profit': formatChartData(f.sumAndGroup(data, groupBy), x => { return (x.Sales - x.Cost || 0 - x.Refund || 0).toFixed(2) }); setTotal(profit);
                break;
            case 'Quantity': formatChartData(f.sumAndGroup(data, groupBy), x => { return (x.Qty) }); setTotal(quantity);
                break;
            default:
                break;
        }
    }

    return {
        state: {
            data: data,
            tableData: tableData,
            chartData: chartData,
            sales: sales,
            profit: profit,
            total: total,
            startDate: startDate,
            endDate: endDate,
            header: header,
            dataChoice: dataChoice,
            quantity: quantity,
            groupBy: groupBy
        },

        functions: {
            handleDataChoiceSwitch: handleDataChoiceSwitch,
            handleGroupBySwitch: handleGroupBySwitch,
            dateChange: dateChange

        }
    }

}

export function SalesReport(props) {

    return (
        <Report
            header={props.header}
            tableData={props.tableData}
            content={props.content}
        />
    )

}