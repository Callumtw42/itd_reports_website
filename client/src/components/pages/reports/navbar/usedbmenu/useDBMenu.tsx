import useSelect from '../../../../../lib/useselect/useselect'
import React, { useEffect, useState } from 'react'
import useData, { obj } from '../../../../../lib/usedata'
import e from 'express';

export default function useDBMenu() {
    const { data } = useData(`api/databases`)
    const [DBList, setDBList] = useState([] as string[])
    const { Select, selected } = useSelect(DBList, "white");

    useEffect(() => {
        setDBList(createDBList(data))
    }, [data])

    return {
        Select,
        selected
    }
}

export function createDBList(data: obj[]): string[] {
    let dbList: string[] = data.map(e => {
        return e.schema_name
    })
    return dbList
}