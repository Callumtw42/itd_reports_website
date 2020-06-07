import "./style.scss"
import React, { useState, useEffect, ReactNode } from 'react'
import Typography from "@material-ui/core/Typography/Typography"

export interface obj {
    [key: string]: any
}

export default function useData(url: string, /*format: (d: obj[]) => obj[]*/) {

    const [data, setData] = useState<obj[]>([]);
    const [loading, setLoading] = useState(false)

    function Spinner(props: {}) {
        return loading ? <div className="Spinner"><div className = "text"><Typography >Loading...</Typography></div> </div>: null
    }

    async function fetchData() {
        try {
            fetch(`${process.env.REACT_APP_DOMAIN}${url}`)
                .then(res => res.json())
                .then(data => {
                    data != null
                        ? setData(data)
                        : setData([])
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (err) {
            setData([])
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData();
        setLoading(true)
    }, [url]);

    useEffect(() => {
        setLoading(false)
    }, [data])

    return {
        data,
        setData,
        fetchData,
        Spinner
    }

}
