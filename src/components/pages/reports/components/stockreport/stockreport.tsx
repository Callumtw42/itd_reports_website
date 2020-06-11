import 'date-fns';

import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';

import useSimpleSelect from '../../../../../lib/useselect/useselect';
import HeaderBar from '../headerbar/headerbar';
import { ReportProps } from '../logic';
import NonScan from './nonscan';
import Reorder from './reorder';
import Stock from './stock';
import StockAdjust from './stockadjust';

export const ctx = React.createContext({ db: "itdepos" })

export function StockReport(props: ReportProps) {

    const { selected, Select } = useSimpleSelect(
        [
            "Stock",
            "Reorder",
            "Non Scan",
            "Stock Adjust"
        ],
        "white"
    );

    function render() {
        return (
            <div className='StockReport'>
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

