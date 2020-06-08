import useDataBuffer from '../usedatabuffer'
import Table from '../../../../../lib/table/table'
import React, { useState, useContext } from 'react'
import { ctx } from './stockreport'

export default function Reorder() {
    //NEXT: Implement sortCallBack in Table
    const [sort, setSort] = useState({ by: "id", order: "desc" })
    const { db } = useContext(ctx)

    const {
        data,
        getNextBuffer,
        Spinner
    } = useDataBuffer(`api/reorder/${db}/${sort.by}/${sort.order}`, 100);

    return <Spinner><Table data={data} bufferCallback={getNextBuffer} sortCallback={setSort} /></Spinner>
}