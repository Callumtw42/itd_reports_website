package main

import (
	"server/server/datafns"
)

type Data = datafns.Data

type PieChartData struct {
	AxisData   []float64
	AxisLabels []string
	Colors     []string
}

type BarChartData struct {
}

type TableData struct {
}

type SalesData struct {
	PieChartData PieChartData
	BarChartData BarChartData
	TableData    TableData
}

//needs test
func pieChart(data Data) (pieChartData PieChartData) {
	var x []float64 = pieChartData.AxisData
	var l []string = pieChartData.AxisLabels
	var c []string = pieChartData.Colors
	for _, e := range data {
		x = append(x, e["Sales"].(float64))
		l = append(l, e["Category"].(string))
		c = append(c, color(e["Cat"].(int)))
	}
	return pieChartData
}

//needs test
func color(id int) (clrs string) {
	return colorPallette[id%len(colorPallette)]
}

var colorPallette []string = []string{
	"rgba(0,0,0, 0.6)",
	"rgba(128,128,128, 0.6)",
	"rgba(128,128,0, 0.6)",
	"rgba(128,0,128, 0.6)",
	"rgba(128,0,0, 0.6)",
	"rgba(0,128,128, 0.6)",
	"rgba(0,128,0, 0.6)",
	"rgba(0,0,128, 0.6)",
	"rgba(255,255,255, 0.6)",
	"rgba(255,255,0, 0.6)",
	"rgba(255,0,255, 0.6)",
	"rgba(255,0,0, 0.6)",
	"rgba(0,255,255, 0.6)",
	"rgba(0,255,0, 0.6)",
	"rgba(0,0,255, 0.6)",
	"rgba(255,255,128, 0.6)",
	"rgba(255,128,255, 0.6)",
	"rgba(255,128,128, 0.6)",
	"rgba(128,255,255, 0.6)",
	"rgba(128,255,128, 0.6)",
	"rgba(128,128,255, 0.6)",
	"rgba(128,0,255, 0.6)",
	"rgba(0,128,255, 0.6)",
	"rgba(255,128,0, 0.6)",
	"rgba(64,64,64, 0.6)",
	"rgba(192,192,192, 0.6)",
	"rgba(192,192,64, 0.6)",
	"rgba(192,64,192, 0.6)",
	"rgba(192,64,64, 0.6)",
	"rgba(64,192,192, 0.6)",
	"rgba(64,192,64, 0.6)",
	"rgba(64,64,192, 0.6)",
	"rgba(255,255,64, 0.6)",
	"rgba(255,64,255, 0.6)",
	"rgba(255,64,64, 0.6)",
	"rgba(64,255,255, 0.6)",
	"rgba(64,255,64, 0.6)",
	"rgba(64,64,255, 0.6)",
	"rgba(255,255,192, 0.6)",
	"rgba(255,192,255, 0.6)",
	"rgba(255,192,192, 0.6)",
	"rgba(192,255,255, 0.6)",
	"rgba(192,255,192, 0.6)",
	"rgba(192,192,255, 0.6)",
	"rgba(192,64,255, 0.6)",
	"rgba(64,192,255, 0.6)",
	"rgba(255,192,64, 0.6)",
	"rgba(64,64,0, 0.6)",
	"rgba(64,0,64, 0.6)",
	"rgba(64,0,0, 0.6)",
	"rgba(0,64,64, 0.6)",
	"rgba(0,64,0, 0.6)",
	"rgba(0,0,64, 0.6)",
	"rgba(192,192,0, 0.6)",
	"rgba(192,0,192, 0.6)",
	"rgba(192,0,0, 0.6)",
	"rgba(0,192,192, 0.6)",
	"rgba(0,192,0, 0.6)",
	"rgba(0,0,192, 0.6)",
	"rgba(64,0,192, 0.6)",
	"rgba(0,64,192, 0.6)",
	"rgba(192,64,0, 0.6)",
	"rgba(102,51,0, 0.6)",
	"rgba(255,229,204, 0.6)",
	"rgba(255,153,153, 0.6)",
}
