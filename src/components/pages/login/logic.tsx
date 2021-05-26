import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import useSpinner from '../../../lib/usespinner/usespinner';

export interface UserData {
    id: number,
    username: string
}

export default function useLogin() {

    const [data, setData] = useState<UserData[]>([])
    const { Spinner, setLoading } = useSpinner()

    async function login(username: string, password: string, props: RouteComponentProps) {
        setLoading(true)

        const header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        }
        // console.log(header.body)
        // console.log(host)
        fetch(`/api/login`, header)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
                if (data[0] && data[0]["id"]) {
                    localStorage.setItem("id", data[0]["id"])
                    props.history.push("/reports")
                    console.log("LOGGED IN")
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                // login(username, password, props)
            });
    }

    return {
        Spinner,
        data,
        login,
    }
}