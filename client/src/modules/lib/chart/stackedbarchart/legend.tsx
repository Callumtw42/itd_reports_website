import { ChartData } from "./logic";
import React from "react"

export default function Legend(props: { chartData: ChartData }) {
    let key = 0;
    let colorStrings = props.chartData.datasets.map(i => { return i.backgroundColor });
    let labels = props.chartData.datasets.map(i => { return i.label });
    let legendItems = colorStrings.map(c => {
        return <div key={key++} className='legendItem'>
            <span key={key++} className="dot" style={{ backgroundColor: c }}></span>
            <label key={key++} className="label" >{labels[colorStrings.indexOf(c)]}</label>
        </div>
    })
    return <div className="scroll-bar-wrap">
        <ul>{legendItems}</ul>
        <div className="cover-bar"></div>
    </div>;
}