import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default function TestRoute(props: RouteComponentProps) {
    return (
        <button onClick={() => props.history.push("/sandbox")}> 
            Sandbox
        </button>
    )
}
