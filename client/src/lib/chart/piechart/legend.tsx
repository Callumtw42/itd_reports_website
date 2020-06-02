import React from 'react';

import * as d from "../../datafns";
import * as _ from './logic';

export default function Legend(props: { chartData: _.ChartData }) {
    if (d.notEmpty(props.chartData.datasets)) {
        let colorStrings = props.chartData.datasets[0].backgroundColor;
        let labels = props.chartData.labels
        let legendItems = colorStrings.map((c: string, key: number) => {
            return <div key={key++} className='legendItem'>
                <span key={key++} className="dot" style={{ backgroundColor: c }}></span>
                <label key={key++} className="label" >{labels[colorStrings.indexOf(c)]}</label>
            </div>
        })
        return <div className="Legend">
            <ul>{legendItems}</ul>
            <div className="cover-bar"></div>
        </div>;
    }
    else return <div></div>
}