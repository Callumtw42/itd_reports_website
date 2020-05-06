import { useState, useEffect } from 'react'

export default function useData(url, format) {

    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data != null
                ? setData(format(data))
                : setData([])
            })
            .catch((error) => {
                console.error(error)
            })
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