import React, { useState, useEffect } from 'react'
import { addRows } from '../../../../lib/datafns'

export interface obj {
    [key: string]: any
}


export default function useDataBuffer(route: string, rowsPerBuffer: number) {
    const [data, setData] = useState([] as obj[])
    const [bufferCount, setBufferCount] = useState(0)

    useEffect(() => {
        fetch(`${route}/${rowsPerBuffer}/${bufferCount}`)
            .then(res => res.json())
            .then(rows => setData([...data, ...rows]))
            .catch(error => console.log(error))


    }, [bufferCount])

    useEffect(() => {
        setBufferCount(0)
        fetch(`${route}/${rowsPerBuffer}/${bufferCount}`)
            .then(res => res.json())
            .then(rows => setData(rows))
            .catch(error => console.log(error))
    }, [route])


    function getNextBuffer() {
        setBufferCount(bufferCount + 1)
    }

    return {
        data,
        getNextBuffer
    }

}