import * as $ from 'jquery';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/macro";


function TableOld(props) {

  const [headers, setHeaders] = useState([]);

  const [sales, setSales] = useState(props.sales);

  const [properties, setProperties] = useState([
    'name',
    'wins',
    'draws',
    'losses',
    'total',
  ]);

  useEffect(() => {

    if (sales !== props.sales) {
      setSales(props.sales);
      setHeaders(Object.keys((props.sales[0])));
    }

    $.each(properties, function (i, val) {

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
  });

  let key = 0;
  return (
    <Div>
      <div className="container">
        <div className="table">
          <div className="table-header">
            {
              (headers).map(obj => {
                return (obj != null) ? <div key={key++} className="header__item"><a id={obj} className="filter__link filter__link--number" href="App.scss">{obj}</a></div> : null;
              })
            }
          </div>
          <div className="table-content">
            {
              (sales).map(saleCat => {
                return (saleCat != null) ? <div key={key++} className="table-row"> {Object.values(saleCat).map(obj2 => { return <div key={key++} className="table-data">{obj2}</div> })} </div> : null
              })
            }
          </div>
        </div>
      </div>
    </Div>
  )

}


const Div = styled.div`
/* * {
  font-size: 16;
} */
*{
--base-spacing-unit: 48px;
--half-spacing-unit: var(--base-spacing-unit) / 2;
--color-alpha: #1772ff;
--color-form-highlight: #eeeeee;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  padding: var(--base-spacing-unit);
//   font-family: Verdana, Geneva, sans-serif;
  margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.container {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // min-height:100vh;
}
.table {
  width: 100%;
  border: 1px solid var(--color-form-highlight);
}
.table-header {
  display: flex;
  width: 100%;
  background: rgba(0, 64, 101, 0.6);
  padding: (var(--half-spacing-unit) * 1.5) 0;
}
.table-row {
  display: flex;
  width: 100%;
  padding: (var(--half-spacing-unit) * 1.5) 0;
  &:nth-of-type(odd) {
    background: var(--color-form-highlight);
  }
}
.table-data,
.header__item {
  flex: 1 1 20%;
  /* text-align: center; */
  font-size: 32px;
  text-align: left;
 
}
.table-data{
  padding: 20px;
}
.header__item {
  text-transform: uppercase;
  text-align: left;
  /* font-size: 24px; */
}
.header__item > a {
  padding: 20px;
 /* text-align: center; */
}
.filter__link {
  color: white;
  text-decoration: none;
  position: relative;
  display: inline-block;
  padding-left: var(--base-spacing-unit);
  padding-right: var(--base-spacing-unit);
  &::after {
    content: "";
    position: absolute;
    right: -(var(--half-spacing-unit) * 1.5);
    color: white;
    font-size: var(--half-spacing-unit);
    top: 50%;
    transform: translateY(-50%);
  }
  &.desc::after {
    content: "(desc)";
  }
  &.asc::after {
    content: "(asc)";
  }
}
`;

export default TableOld;