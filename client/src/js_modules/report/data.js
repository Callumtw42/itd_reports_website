import { useState, useEffect } from 'react'

export default function useData(url, format) {

    const [data, setData] = useState([]);

    const fetchData = (...then) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(format(data));
                then.map(f => { return f(data) })
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