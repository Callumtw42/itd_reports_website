import useDataBuffer from '../usedatabuffer'
import Table from '../../../../../lib/table/table'
import React, { useState, useContext } from 'react'
import { ctx } from './stockreport'

export default function Stock() {
    const initSort: {
        by: String, order: false | "desc" | "asc" | undefined
    } = { by: "id", order: "desc" }
    const [sort, setSort] = useState(initSort)
    const { db } = useContext(ctx)

    const {
        data,
        getNextBuffer,
        Spinner
    } = useDataBuffer(`api/stock/${db}/${sort.by}/${sort.order}`, 100);

    return (
        <Spinner>
            <Table
                data={data}
                bufferCallback={getNextBuffer}
                sortCallback={setSort}
                initOrder={sort.order} />
        </Spinner>
    )
}