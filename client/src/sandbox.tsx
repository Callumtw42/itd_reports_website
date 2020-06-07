import React from 'react'
import useSelect from "./lib/useselect/useselect"
import Table from "./lib/table/table"

const data = [{ x: "abc", y: "def" }, { x: "abc", y: "def" }, { x: "abc", y: "def" }]

export default function SandBox() {

    const { Select, selected } = useSelect(["asdbasbd", "asdbasbd", "asdbasbd", "asdasf"]);
    return (
        <div className="SandBox">
            <Select />
            <div><Table data={data} /></div>
        </div>
    )
}
