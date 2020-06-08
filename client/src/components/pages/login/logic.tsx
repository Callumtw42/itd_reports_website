import React, { useState, useEffect } from 'react';
import useSpinner from "../../../lib/usespinner/usespinner"
import Typography from "@material-ui/core/Typography/Typography"

export interface UserData {
    id: number,
    username: string
}

export default function useLogin() {

    const [data, setData] = useState<UserData[]>([])
    // const [loading, setLoading] = useState(false)
    const { Spinner, setLoading } = useSpinner()


    // function Spinner(props: {}) {
    //     return loading ? <div className="Spinner"><div className="text"><Typography >Loading...</Typography></div> </div> : null
    // }

    async function login(username: string, password: string) {

        setLoading(true)

        const header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        }
        fetch(`${process.env.REACT_APP_DOMAIN}api/login`, header)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
            .catch((error) => {
                console.error(error)
                login(username, password)
            });
    }

    useEffect(() => {
        setLoading(false)
    }, [data])

    return {
        Spinner,
        data,
        login,
    }
}