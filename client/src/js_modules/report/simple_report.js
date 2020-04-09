// import 'date-fns';
// import React, { useEffect, useState } from 'react';
// import * as f from '../functions.js';
// import { fetchData, Report} from './report.js';


// export default function SimpleReport(props) {

//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     getData();
//     if (props.display === 'inline') props.callBack(props.header);
//   }, [props.db]);

//   useEffect(() => {
//     if (props.display === 'inline') props.callBack(props.header);
//   }, [props.display]);

//   function getData() {
//     fetchData(props.url, allocateData);
//   }

//   function allocateData(data) {
//     console.log(data);
//     formatTableData(data);
//   }

//   function formatTableData(data) {
//     setTableData(f.removeColumns(data, 'Cat'))
//   }

//   return (

//     <Report
//       header={props.header}
//       tableData={tableData}
//     />
//   )
// }
