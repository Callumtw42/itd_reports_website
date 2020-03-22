import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import logo from './logo.svg';
import './App.scss';
import * as $ from 'jquery';


class SalesReport extends Component {
  constructor() {
    super();
    this.state = {
      salesData: [],
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

  componentDidMount() {
    console.log("mount" + this.state.date.startDate + ' - ' + this.state.date.endDate);
    fetch(`/api/salesData/${this.state.date.startDate}/${this.state.date.startDate}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      })
  }

  reRender(start, end) {
    this.setState({ date: { startDate: start, endDate: end } });
    fetch(`/api/salesData/${start}/${end}`)
      .then(res => res.json())
      .then(salesData => this.setState({ salesData }, () => console.log('salesData fetched...', salesData)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      });
  }

  sum = (total, n) => {
    return total + n
  }

  formatChartData = () => {
    let colors = this.state.salesData.map(saleCat => 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + 0.6 + ')');
    let _totalSales = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales).reduce(this.sum) - this.state.salesData.map(saleCat => saleCat.Refund).reduce(this.sum)  : 0;
    let _data = (this.state.salesData.length > 0) ? this.state.salesData.map(saleCat => saleCat.Sales) : [0];

    this.setState({

      totalSales: _totalSales,

      chartData: {

        labels: this.state.salesData.map(saleCat => saleCat.Department),
        datasets: [
          {
            label: 'Net Sales £',
            data: _data,
            backgroundColor: colors
          }
        ]
      }
    });
  }

  dateChange(event) {
    console.log(event.target.value);
    let caller = event.target;
    let newDate = caller.value;
    if (caller.id === 'startDate') {
      // console.log("re-render" + newDate);
      // this.setState({ date: { startDate: caller.value } });
      this.reRender(newDate, this.state.date.endDate);
    }
    else if (caller.id === 'endDate') {
      // this.setState({date:{ endDate: caller.value }});
      this.reRender(this.state.date.startDate, newDate);
    }
  };

  render() {
    return (
      <div>
        { /*   <h2>salesData</h2>
     <ul>
          {this.state.salesData.map(salesData =>
            <li key={salesData.Department}>{salesData.Department} {salesData.Sales}</li>
          )}
        </ul>
       */ }
        <Chart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} />
        <input id='startDate' type="date" onChange={event => this.dateChange(event)}></input>
        <input id='endDate' type="date" onChange={event => this.dateChange(event)}></input>
        <Table sales={this.state.salesData} />
      </div>
    );
  }
}

class Chart extends Component {

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City',

  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.props.chartData}
          options={
            {
              plugins: {
                labels:
                {
                  render: (data) => { return "" },
                  // fontSize: 24,
                }
              },
              labels: { display: false },
              title: {
                display: this.props.displayTitle,
                text: this.props.date.startDate + " - " + this.props.date.endDate + " Session Sales Report",
                fontSize: 25
              },
              legend: {
                display: false,
                position: 'top',
                align: 'center',
                labels: {
                  usePointStyle: true,
                  fontSize: 24
                },
                fullWidth: true

              },
              tooltips: {
                mode: 'index',
                callbacks: {
                  label: (tooltipItem, data) => {
                    var label = data.labels[tooltipItem.index];
                    return label;
                  },
                  afterLabel: (tooltipItem, data) => {
                    var sales = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / this.props.totalSales * 100;
                    percent = percent.toFixed(2); // make a nice string
                    return '£ ' + sales + ' (' + percent + '%' + ')';
                  }
                },
                fontSize: 24
              }
            }
          }
        />
        <h1>Total: £{this.props.totalSales.toFixed(2)}</h1>
      </div>

    )
  }
}

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: props.sales,
      properties: [
        'name',
        'wins',
        'draws',
        'losses',
        'total',
      ],
      headers: []

    };
  }

  componentDidMount() {

    $.each(this.state.properties, function (i, val) {

      var orderClass = '';

      $("#" + val).click(function (e) {
        e.preventDefault();
        $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
        $(this).toggleClass('filter__link--active');
        $('.filter__link').removeClass('asc desc');

        if (orderClass === 'desc' || orderClass === '') {
          $(this).addClass('asc');
          orderClass = 'asc';
        } else {
          $(this).addClass('desc');
          orderClass = 'desc';
        }

        var parent = $(this).closest('.header__item');
        var index = $(".header__item").index(parent);
        var $table = $('.table-content');
        var rows = $table.find('.table-row').get();
        var isSelected = $(this).hasClass('filter__link--active');
        var isNumber = $(this).hasClass('filter__link--number');

        rows.sort(function (a, b) {

          var x = $(a).find('.table-data').eq(index).text();
          var y = $(b).find('.table-data').eq(index).text();

          if (isNumber === true) {

            if (isSelected) {
              return x - y;
            } else {
              return y - x;
            }

          } else {

            if (isSelected) {
              if (x < y) return -1;
              if (x > y) return 1;
              return 0;
            } else {
              if (x > y) return -1;
              if (x < y) return 1;
              return 0;
            }
          }
        });

        $.each(rows, function (index, row) {
          $table.append(row);
        });

        return false;
      });

    });
  }

  componentDidUpdate() {
    if (this.state.sales !== this.props.sales) {
      this.setState({
        sales: this.props.sales,
        headers: ((this.props.sales).length > 0) ? Object.keys((this.props.sales[0])) : []
      });
    }
    console.log(this.state.headers);
  }

  render() {
    let key = 0;
    return (
      <div className="container">
        <div className="table">
          <div className="table-header">
            {
              (this.state.headers).map(obj => {
                return (obj != null) ? <div key={obj} className="header__item"><a id={obj} className="filter__link filter__link--number" href="App.scss">{obj}</a></div> : null;
              })
            }
          </div>
          <div className="table-content">
            {
              (this.state.sales).map(saleCat => {
                return (saleCat != null) ? <div key={key++} className="table-row"> {Object.values(saleCat).map(obj2 => { return <div key={key++} className="table-data">{obj2}</div> })} </div> : null
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <SalesReport />
    </div>
  );
}

export default App;
