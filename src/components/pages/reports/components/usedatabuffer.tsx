import React, { useEffect, useState } from 'react';
import useSpinner from "../../../../lib/usespinner/usespinner"
import { host } from "../../../utils"

export interface obj {
    [key: string]: any
}


export default function useDataBuffer(route: string, rowsPerBuffer: number) {
    const [data, setData] = useState([] as obj[])
    const [bufferCount, setBufferCount] = useState(0)
    const { Spinner, setLoading } = useSpinner()

    async function fetchData() {
        // setLoading(true)
        setBufferCount(0)
        fetch(`/${route}/${rowsPerBuffer}/${bufferCount}`)
            .then(res => res.json())
            .then(rows => setData(rows))
            .catch(error => {
                console.error(error)
                // fetchData()
            })
    }

    async function fetchBuffer() {
        // setLoading(true)
        fetch(`/${route}/${rowsPerBuffer}/${bufferCount}`)
            .then(res => res.json())
            .then(rows => setData(rows))
            .catch(error => {
                console.log(error)
                // fetchBuffer()
            })
    }

    useEffect(() => {
        fetchBuffer()
    }, [bufferCount])

    useEffect(() => {
        console.log(route)
        fetchData()
    }, [route])

    useEffect(() => {
        // setLoading(false)
    }, [data])


    function getNextBuffer(inc) {
        if (bufferCount + inc >= 0)
            setBufferCount(bufferCount + inc)
        else setBufferCount(0);
    }

    function resetBuffer() {
        setBufferCount(0)
    }

    return {
        data,
        getNextBuffer,
        Spinner,
        resetBuffer

    }

}