import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import logo from './logo.svg';
import './App.scss';
import * as $ from 'jquery';


class TodaysSales extends Component {
  constructor() {
    super();
    this.state = {
      todaysSales: [],
      chartData: {},
      totalSales: 0,
      date: this.retrieveDate()
    };
  }

  retrieveDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
    return date;
  }

  componentDidMount() {
    // console.log("mount" + this.state.date);
    fetch(`/api/todaysSales/${this.state.date}`)
      .then(res => res.json())
      .then(todaysSales => this.setState({ todaysSales }, () => console.log('todaysSales fetched...', todaysSales)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      })
  }

  reRender(newDate) {
    // console.log("re-render" + newDate);
    this.setState({ date: newDate });
    fetch(`/api/toDaysSales/${newDate}`)
      .then(res => res.json())
      .then(todaysSales => this.setState({ todaysSales }, () => console.log('todaysSales fetched...', todaysSales)))
      .then(this.formatChartData)
      .catch((error) => {
        console.log(error)
      });
  }

  sum = (total, n) => {
    return total + n
  }

  formatChartData = () => {
    let colors = this.state.todaysSales.map(saleCat => 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + 0.6 + ')');
    let _totalSales = (this.state.todaysSales.length > 0) ? this.state.todaysSales.map(saleCat => saleCat.Sales).reduce(this.sum) : 0;
    let _data = (this.state.todaysSales.length > 0) ? this.state.todaysSales.map(saleCat => saleCat.Sales) : [0];

    this.setState({

      totalSales: _totalSales,

      chartData: {

        labels: this.state.todaysSales.map(saleCat => saleCat.Department),
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
    let newDate = event.target.value;
    this.reRender(newDate);
  };

  render() {
    return (
      <div>
        { /*   <h2>todaysSales</h2>
     <ul>
          {this.state.todaysSales.map(todaysSales =>
            <li key={todaysSales.Department}>{todaysSales.Department} {todaysSales.Sales}</li>
          )}
        </ul>
       */ }
        <Chart chartData={this.state.chartData} totalSales={this.state.totalSales} date={this.state.date} />
        <input type="date" onChange={event => this.dateChange(event)}></input>
        <Table sales={this.state.todaysSales} />
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
                text: this.props.date + ' - Session Sales Report',
                fontSize: 25
              },
              legend: {
                display: true,
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
    return (
      <div className="container">

        <div className="table">
          <div className="table-header">
            {
            (this.state.headers).map(obj=> {
                return (obj !=null) ? <div key={obj} className="header__item"><a id={obj} className="filter__link filter__link--number" href="App.scss">{obj}</a></div> : null;
              })}

          </div>
          <div className="table-content">
            <div className="table-row">
              <div className="table-data">Tom</div>
              <div className="table-data">2</div>
              <div className="table-data">0</div>
              <div className="table-data">1</div>
              <div className="table-data">5</div>
            </div>
            <div className="table-row">
              <div className="table-data">Dick</div>
              <div className="table-data">1</div>
              <div className="table-data">1</div>
              <div className="table-data">2</div>
              <div className="table-data">3</div>
            </div>
            <div className="table-row">
              <div className="table-data">Harry</div>
              <div className="table-data">0</div>
              <div className="table-data">2</div>
              <div className="table-data">2</div>
              <div className="table-data">2</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function App() {
  return (
    <div className="App">
      <TodaysSales />
    </div>
  );
}

export default App;
