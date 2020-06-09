import React, { useState, useEffect, ReactNode } from 'react'
import Typography from "@material-ui/core/Typography/Typography"
import useSpinner from "../usespinner/usespinner"

export interface obj {
    [key: string]: any
}

export default function useData(url: string, body?: RequestInit) {

    const [data, setData] = useState<obj[]>([]);
    const { Spinner, setLoading } = useSpinner()

    async function fetchData() {
        setLoading(true)
        try {
            fetch(`${process.env.REACT_APP_DOMAIN}${url}`, body)
                .then(res => res.json())
                .then(data => {
                    data != null
                        ? setData(data)
                        : setData([])
                })
                .catch((error) => {
                    console.log(error)
                    console.log("Reattempting Connection...")
                    setTimeout(() => { }, 1000)
                    fetchData()
                })
        } catch (err) {
            setData([])
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    useEffect(() => {
        setLoading(false)
    }, [data])

    return {
        data,
        setData,
        fetchData,
        Spinner,

    }

}
