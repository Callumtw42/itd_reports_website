import { Component } from 'react';

class Block extends Component {

    getUniqueValues(objArr, key) {
        return [...new Set(objArr.map(i => {
          return this.getValue(i, key);
        }))];
      }

    getElementsWithValue(objArr, key, value) {
        return objArr.filter(e => 
          this.getValue(e, key) === value)
      }

    allocateData(data) {
        console.log('data fetched...', data);
    }

    getData(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => this.allocateData(data))
            .catch((error) => {
                console.log(error)
            })
    }

    add = (total, n) => {
        return total + n
    }

    colors(subArr) {
        let colors = [
            'rgba(0,0,0, 0.6)',
            'rgba(128,128,128, 0.6)',
            'rgba(128,128,0, 0.6)',
            'rgba(128,0,128, 0.6)',
            'rgba(128,0,0, 0.6)',
            'rgba(0,128,128, 0.6)',
            'rgba(0,128,0, 0.6)',
            'rgba(0,0,128, 0.6)',

            'rgba(255,255,255, 0.6)',
            'rgba(255,255,0, 0.6)',
            'rgba(255,0,255, 0.6)',
            'rgba(255,0,0, 0.6)',
            'rgba(0,255,255, 0.6)',
            'rgba(0,255,0, 0.6)',
            'rgba(0,0,255, 0.6)',

            'rgba(255,255,128, 0.6)',
            'rgba(255,128,255, 0.6)',
            'rgba(255,128,128, 0.6)',
            'rgba(128,255,255, 0.6)',
            'rgba(128,255,128, 0.6)',
            'rgba(128,128,255, 0.6)',

            'rgba(128,0,255, 0.6)',
            'rgba(0,128,255, 0.6)',
            'rgba(255,128,0, 0.6)',


            'rgba(64,64,64, 0.6)',
            'rgba(192,192,192, 0.6)',
            'rgba(192,192,64, 0.6)',
            'rgba(192,64,192, 0.6)',
            'rgba(192,64,64, 0.6)',
            'rgba(64,192,192, 0.6)',
            'rgba(64,192,64, 0.6)',
            'rgba(64,64,192, 0.6)',

            'rgba(255,255,64, 0.6)',
            'rgba(255,64,255, 0.6)',
            'rgba(255,64,64, 0.6)',
            'rgba(64,255,255, 0.6)',
            'rgba(64,255,64, 0.6)',
            'rgba(64,64,255, 0.6)',

            'rgba(255,255,192, 0.6)',
            'rgba(255,192,255, 0.6)',
            'rgba(255,192,192, 0.6)',
            'rgba(192,255,255, 0.6)',
            'rgba(192,255,192, 0.6)',
            'rgba(192,192,255, 0.6)',

            'rgba(192,64,255, 0.6)',
            'rgba(64,192,255, 0.6)',
            'rgba(255,192,64, 0.6)',


            'rgba(64,64,0, 0.6)',
            'rgba(64,0,64, 0.6)',
            'rgba(64,0,0, 0.6)',
            'rgba(0,64,64, 0.6)',
            'rgba(0,64,0, 0.6)',
            'rgba(0,0,64, 0.6)',

            'rgba(192,192,0, 0.6)',
            'rgba(192,0,192, 0.6)',
            'rgba(192,0,0, 0.6)',
            'rgba(0,192,192, 0.6)',
            'rgba(0,192,0, 0.6)',
            'rgba(0,0,192, 0.6)',


            'rgba(64,0,192, 0.6)',
            'rgba(0,64,192, 0.6)',
            'rgba(192,64,0, 0.6)',


            'rgba(102,51,0, 0.6)',
            'rgba(255,229,204, 0.6)',
            'rgba(255,153,153, 0.6)',
        ];
        return subArr.map(i => { return colors[colors.length - (i % colors.length) - 1] });
    }

    notEmpty(data) {
        return (data && data.length)
    }

    getColumn(data, col) {
        return (this.notEmpty(data)) ? data.map(e => { return this.getValue(e, col) }) : []
    }

    sum = (arr) => {
        return (this.notEmpty(arr)) ? arr.reduce(this.add) : 0;
    }

    getValue(e, key){
        return Object.values(e)[Object.keys(e).indexOf(key)];
    }


}

export default Block;