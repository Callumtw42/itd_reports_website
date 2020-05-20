import 'date-fns';

import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';

import HeaderBar from '../header_bar'
import useSimpleSelect from '../select/useselect';
import useData from '../usedata';
import useDate from '../usedate/usedate';
import Table from '../table/table';

export function Stock(props: { header: string, db: string, display: string }) {

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
    } = useData(`/api/stock/${props.db}`, (data) => { return data });
    const {
        data: reorder
    } = useData(`/api/reorder/${props.db}`, (data) => { return data });
    const {
        data: nonScan
    } = useData(`/api/nonscan/${props.db}`, (data) => { return data });
    const {
        data: stockAdjust
    } = useData(`/api/adjust/${props.db}/${startDate}/${endDate}`, (data) => { return data });
    const [tableData, setTableData] = useState(stock)
    const [dateDisplay, setDateDisplay] = useState("flex");

    useEffect(() => {
        if (selected === "Stock Adjust") setDateDisplay("flex")
        else setDateDisplay("none")
        setTableData(tableChoice(selected));
    }, [selected, stock])

    useEffect(() => {
        if (props.display === 'inline') setHeader(header);
    }, [props.display, header]);

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
            case "Stock": return stock
            case "Reorder": return reorder
            case "Non Scan": return nonScan
            case "Stock Adjust": return stockAdjust
            default: return stock
        }
    }

    return render()
}

