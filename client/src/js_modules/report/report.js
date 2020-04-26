import { useState, useEffect } from "react";
import useData from './data'

export default function useReport(props, url, formatData, /* formatTableData */) {

    const {
        data,
        ...rest
    } = useData(url, formatData);

    const [header, setHeader] = useState(props.header);

    useEffect(() => {
        if (props.display === 'inline') props.setHeader(header);
    }, [props.display, header]);

    return {
        data,
        header,
        setHeader,
        ...rest
    }
}
