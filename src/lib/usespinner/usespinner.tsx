import React, { useState, ReactNode } from "react"
import Typography from "@material-ui/core/Typography/Typography"
import "./style.scss"

export default function useSpinner() {

    const [loading, setLoading] = useState(false)

    function Spinner(props: { children?: ReactNode }) {
        return <div className="Spinner">{props.children}{loading
            ? <div className="overlay">
                <div className="text"><Typography >Loading...</Typography></div>
            </div>
            : null
        }</div>
    }
    return {
        setLoading,
        Spinner
    }
}