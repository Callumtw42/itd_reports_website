import React, { SetStateAction } from "react"

export interface ReportProps {
    db: string,
    header: string,
    setHeader: React.Dispatch<SetStateAction<{ row1: string; row2: string; }>>
    phoneDisplay: string
}
