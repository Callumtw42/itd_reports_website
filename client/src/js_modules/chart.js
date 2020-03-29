import React, { Component } from 'react';

class Chart extends Component {

  static defaultProps = {
    displayTitle: false,
    displayLegend: false,
    location: 'City',

  }

  legend() {
    let key = 0;
    let colorStrings = this.props.chartData.datasets.map(i => { return [...new Set(i.backgroundColor)] });
    let labels = this.props.chartData.datasets.map(i => { return [...new Set(i.label)] });
    let legendItems = colorStrings.map(c => {
      return <div key={key++} className='legendItem'>
        <span key={key++} className="dot" style={{ backgroundColor: c }}></span>
        <label key={key++} className="label" >{labels[colorStrings.indexOf(c)]}</label>
      </div>

    }).reverse();
    return <div className="scroll-bar-wrap">
      <ul>{legendItems}</ul>
      <div className="cover-bar"></div>
    </div>;
  }
}

export default Chart;