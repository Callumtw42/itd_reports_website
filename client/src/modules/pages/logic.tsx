import { SetStateAction } from 'react';

export interface ReportsProps {
    display: DisplayVars,
    setDisplay: React.Dispatch<SetStateAction<{ row1: string; row2: string; }>>
}

export interface DisplayVars {
    salesByCategory: string,
    salesByHour: string,
    stock: string,
    noSales: string,
}