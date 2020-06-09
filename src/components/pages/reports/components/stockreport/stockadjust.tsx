import useDataBuffer from '../usedatabuffer'
import Table from '../../../../../lib/table/table'
import React, { useState, useContext } from 'react'
import { ctx } from './stockreport'
import useDate from '../../../../../lib/usedate/usedate'

export default function StockAdjust() {

    const [sort, setSort] = useState({ by: "id", order: "desc" })
    const { db } = useContext(ctx)
    const { startDate, endDate, Dates } = useDate();

    const {
        data,
        getNextBuffer,
        Spinner
    } = useDataBuffer(`api/adjust/${db}/${startDate}/${endDate}/${sort.by}/${sort.order}`, 100);

    return (<Spinner>
        <Dates />
        <Table data={data} bufferCallback={getNextBuffer} sortCallback={setSort} />
    </Spinner>)
}