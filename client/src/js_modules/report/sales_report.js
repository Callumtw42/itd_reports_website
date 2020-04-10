import 'date-fns';
import React, { useEffect, useState } from 'react';
import * as f from '../functions.js';
import { fetchData, Report } from './report.js';
import styled from 'styled-components';


export function useSalesReport(props, child) {

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [sales, setSales] = useState(0);
    const [profit, setProfit] = useState(0);
    const [total, setTotal] = useState(0);
    const [header, setHeader] = useState('');
    const [dataChoice, setDataChoice] = useState('Sales');
    const [quantity, setQuantity] = useState(0);
    const [groupBy, setGroupBy] = useState('Cat');

    useEffect(() => {
        if (props.display === 'inline') props.callBack(header);
    }, [props.display, props.header]);

    useEffect(() => {
        switchData();
    }, [groupBy, dataChoice]);

    function getData(start, end) {
        fetchData(`/api/salesByProduct/${props.db}/${start}/${end}`, allocateData);
    }

    function allocateData(response) {
        console.log(response);
        setData(response);
        child.formatChartData(response, x => { return x.Sales });
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

    function switchData() {
        switch (dataChoice) {
            case 'Sales': child.formatChartData(data, x => { return x.Sales }); setTotal(sales);
                break;
            case 'Profit': child.formatChartData(data, x => { return (x.Sales - x.Cost || 0 - x.Refund || 0) }); setTotal(profit);
                break;
            case 'Quantity': child.formatChartData(data, x => { return (x.Qty) }); setTotal(quantity);
                break;
            default:
                break;
        }
    }

    return {
        data: data,
        tableData: tableData,
        chartData: chartData,
        sales: sales,
        profit: profit,
        total: total,
        header: header,
        dataChoice: dataChoice,
        quantity: quantity,
        groupBy: groupBy,
        handleDataChoiceSwitch: handleDataChoiceSwitch,
        handleGroupBySwitch: handleGroupBySwitch,
        setHeader: setHeader,
        getData: getData,
        setChartData: setChartData,
        setSales: setSales
    }

}

export function SalesReport(props) {

    return (
        <Div>
            <Report
                header={props.header}
                tableData={props.tableData}
                content={props.content}
            />
        </Div>
    )

}

const Div = styled.div`




/**.::after..................... */

.sales > h1{
  font-size: 32px;
  margin: auto 0;
  margin-right: 5%;
}

.sales {
  margin: 7em 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;

}

@media (min-width:64em){

    .sales > h1{
    font-size: 1em;
    }

    .sales {
    margin: 1em 0 0 0;
    }
}
`;