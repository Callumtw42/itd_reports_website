import Typography from '@material-ui/core/Typography/Typography';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Table from './lib/table/table';
import useSelect from './lib/useselect/useselect';

export default function SandBox(props: RouteComponentProps) {

    const tabledata = [{ x: "abc", y: "def" }, { x: "abc", y: "def" }, { x: "abc", y: "def" }]
    const [data, setData] = useState("no data")

    fetch(`api/test`).then(res => res.json()).then(data => setData(data))

    const { Select, selected } = useSelect(["asdbasbd", "asdbasbd", "asdbasbd", "asdasf"]);
    return (
        <div className="SandBox">
            <Link className="link" to={"/"}><Typography >Logout</Typography></Link>
            <p>{data}</p>
            <Select />
            <div><Table data={tabledata} /></div>
        </div>
    )
}
