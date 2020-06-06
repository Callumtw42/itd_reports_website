import { ReportProps } from '../logic'
import 'date-fns';
import Stock from './stock'
import Reorder from './reorder';
import Paper from '@material-ui/core/Paper';
import NonScan from './nonscan'
import StockAdjust from './stockadjust'
import React, { useEffect, useState } from 'react';

import HeaderBar from '../headerbar/headerbar'
import useSimpleSelect from '../../../../../lib/useselect/useselect';
import useData from '../../../../../lib/usedata';
import useDataBuffer from '../usedatabuffer'
import useDate from '../../../../../lib/usedate/usedate';
import Table from '../../../../../lib/table/table';
import { columns } from "../../../../../lib/datafns";

export const ctx = React.createContext({ db: "itdepos" })

export function StockReport(props: ReportProps) {

    const [header, setHeader] = useState(props.header);
    const { selected, Select } = useSimpleSelect(
        [
            "Stock",
            "Reorder",
            "Non Scan",
            "Stock Adjust"
        ],
        "white"
    );

    // useEffect(() => {
    //     if (selected === "Stock Adjust") setDateDisplay("flex")
    //     else setDateDisplay("none")
    //     // setTableData(tableChoice(selected));
    // }, [selected])

    function render() {
        return (
            <div className='report'>
                <Paper className='reportContainer'>
                    <HeaderBar ><Select /></HeaderBar>
                    <div className='reportBody'>
                        <ctx.Provider value={{ db: props.db }}>
                            <TableChoice selected={selected} db={props.db} />
                        </ctx.Provider>
                    </div>
                </Paper>
            </div>
        );
    }


    function TableChoice(props: { selected: string, db: string }) {
        switch (selected) {

            case "Stock": return <Stock />
            case "Reorder": return <Reorder />
            case "Non Scan": return <NonScan />
            case "Stock Adjust": return <StockAdjust />
            default: return <Stock />
        }
    }

    return render()
}

