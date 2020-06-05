import { useState, useEffect } from 'react'

export interface obj {
    [key: string]: any
}

export default function useData(url: string, /*format: (d: obj[]) => obj[]*/) {

    const [data, setData] = useState<obj[]>([]);

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
    }, [url]);

    return {
        data,
        setData,
        fetchData,
    }

}
