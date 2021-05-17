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
import { Typography } from '@material-ui/core';
import useDataBuffer from '../usedatabuffer';
import Table from "../../../../../lib/table/table"

export const ctx = React.createContext({ db: "itdepos" })

function TableChoice({ selected, db }) {
    switch (selected) {

        case "Stock": return <Stock />
        case "Reorder": return <Reorder />
        case "Non Scan": return <NonScan />
        case "Stock Adjust": return <StockAdjust />
        default: return <Stock />
    }
}
export function StockReport({ dates, id, header, db }) {

    // const { selected, Select } = useSimpleSelect(
    //     [
    //         "Stock",
    //         "Reorder",
    //         "Non Scan",
    //         "Stock Adjust"
    //     ],
    //     "white"
    // );

    const initSort: {
        by: String, order: false | "desc" | "asc" | undefined
    } = { by: "id", order: "desc" }
    const [sort, setSort] = useState(initSort)
    const [sortOrder, setSortOrder] = useState("asc")
    const [sortBy, setSortBy] = useState("id")
    // const { db } = useContext(ctx)
    const [search, setSearch] = useState(".*")

    const {
        data,
        getNextBuffer,
        Spinner,
        resetBuffer
    } = useDataBuffer(`api/stock/${db}/${sortBy}/${sortOrder}/${search}`, 500);

    function handleSearch(e) {
        resetBuffer();
        setSearch(e.currentTarget.value.trim() || ".*");
    }

    function sortCallback(sort){
        console.log(sort)
        resetBuffer();
        setSortBy(sort.by)
        setSortOrder(sort.order)
    }
    return (
        <div className='StockReport'>
            <Paper className='reportContainer'>
                <HeaderBar >
                    <div className="left">
                        <Typography variant="h6">Stock</Typography>
                        {/* <Select /> */}
                        <input type="text"
                            className="form-control"
                            placeholder="search"
                            onInput={handleSearch}></input>
                    </div>
                </HeaderBar>
                <div className='reportBody'>
                    {/* <ctx.Provider value={{ db: db }}> */}
                        {/* <TableChoice selected={selected} db={db} /> */}
                        {/* <Stock /> */}
                        {/* <Spinner> */}
                            <Table
                                data={data}
                                bufferCallback={getNextBuffer}
                                sortCallback={sortCallback}
                                initOrder={sortOrder} />
                        {/* </Spinner> */}
                    {/* </ctx.Provider> */}
                </div>
            </Paper>
        </div>
    );

}
