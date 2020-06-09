import React, { useEffect, useState } from 'react';

import useSpinner from '../../../lib/usespinner/usespinner';

export interface UserData {
    id: number,
    username: string
}

export default function useLogin() {

    const [data, setData] = useState<UserData[]>([])
    const { Spinner, setLoading } = useSpinner()

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
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setTimeout(1000)
                login(username, password)
            });
    }

    return {
        Spinner,
        data,
        login,
    }
}