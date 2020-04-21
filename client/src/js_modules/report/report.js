import { useState, useEffect } from "react";
import useData from './data'

export default function useReport(props, url, formatData, formatTableData) {

    const {
        data,
        ...rest
    } = useData(url, formatData);

    const [tableData, setTableData] = useState([]);
    const [header, setHeader] = useState(props.header);

    useEffect(() => {
        if (props.display === 'inline') props.setHeader(header);
    }, [props.display, header]);

    useEffect(() => {
        setTableData(formatTableData());
    }, [data])

    return {
        data,
        tableData,
        setTableData,
        header,
        setHeader,
        ...rest
    }
}
