import {  ReportProps} from './logic'
import 'date-fns';

import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';

import HeaderBar from '../header_bar'
import useSimpleSelect from '../lib/useselect/useselect';
import useData from '../usedata';
import useDate from '../lib/usedate/usedate';
import Table from '../lib/table/table';
import { columns } from "../lib/datafns";

export function Stock(props: ReportProps) {

    const [header, setHeader] = useState(props.header);
    const { startDate, endDate, Dates } = useDate();
    const { selected, Select } = useSimpleSelect(
        [
            "Stock",
            "Reorder",
            "Non Scan",
            "Stock Adjust"
        ],
        "white"
    );
    const {
        data: stock
    } = useData(`/api/stock/${props.db}`);
    const {
        data: reorder
    } = useData(`/api/reorder/${props.db}`);
    const {
        data: nonScan
    } = useData(`/api/nonscan/${props.db}`);
    const {
        data: stockAdjust
    } = useData(`/api/adjust/${props.db}/${startDate}/${endDate}`);
    const [tableData, setTableData] = useState(stock)
    const [dateDisplay, setDateDisplay] = useState("flex");

    useEffect(() => {
        if (selected === "Stock Adjust") setDateDisplay("flex")
        else setDateDisplay("none")
        setTableData(tableChoice(selected));
    }, [selected, stock])

    useEffect(() => {
        if (props.phoneDisplay === 'inline') setHeader(header);
    }, [props.phoneDisplay, header]);

    function render() {
        return (
            <div className='report'>
                <Paper className='reportContainer'>
                    <HeaderBar ><Select /></HeaderBar>
                    <div className='reportBody'>
                        <Dates display={dateDisplay} /><Table data={tableData} />
                    </div>
                </Paper>
            </div>
        );
    }

    function tableChoice(selected: string) {
        switch (selected) {
            case "Stock": return columns(stock, "Prod", "Id", "Rtl", "Cost", "Profit", "WhSale", "Updated", "Qty")
            case "Reorder": return reorder
            case "Non Scan": return nonScan
            case "Stock Adjust": return stockAdjust
            default: return stock
        }
    }

    return render()
}

