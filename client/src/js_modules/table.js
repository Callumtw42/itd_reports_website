import React, { Component } from 'react';
import * as $ from 'jquery';


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

  export default Table;