import { useState } from 'react';

export interface UserData {
    id: number,
    username: string
}

export default function useLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState<UserData[]>([])

    async function login(username: string, password: string) {
        console.log(username);
        console.log(password);

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(res => console.log(res.text()); res.json())
            .then(data => {
                setData(data)
            })
            .catch((error) => console.log(error));
    }
    return {
        setUsername,
        setPassword,
        data,
        setData,
        login,
        username,
        password
    }
}