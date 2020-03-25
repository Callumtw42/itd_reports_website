import Block from './block.js';

class SalesReport extends Block {
    constructor() {
        super();
        this.state = {
          tableData: [],
          chartData: {},
          totalSales: 0,
          date: { startDate: this.todaysDate(), endDate: this.todaysDate(), }
        };
      }

      todaysDate() {
        var today = new Date();
        var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
        return date;
      }

      getData(url) {
        super.getData(url);
      }

      allocateData(data) {
        super.allocateData(data);
        this.formatChartData(data);
        // this.formatTableData(data);
        this.setState({
          totalSales: this.sum(this.getColumn(data, 'Sales')) - this.sum(this.getColumn(data, 'Refund')),
          tableData: data
        });
      }
}

export default SalesReport