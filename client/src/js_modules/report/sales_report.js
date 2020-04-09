import 'date-fns';
import React, { useEffect, useState } from 'react';
import BarChart from '../bar_chart.js';
import DateField from '../date_field.js';
import * as f from '../functions.js';
import { fetchData, Report } from './report.js';
import { todaysDate } from './report_interface.js';
import styled from 'styled-components';
import RadioButtons from '../radio_buttons.js';
import DropDown from '../drop_down.js';

export default function FixedTimeReport(props) {

    return (
        <Report
            header={props.header}
            tableData={props.tableData}
            content={props.content}
        />
    )

}