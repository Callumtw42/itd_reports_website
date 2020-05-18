package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_pieChart(t *testing.T) {
	data := Data{
		{"Sales": 1.00, "Cat": 1, "Category": "food", "foo": "bar"},
		{"Sales": 2.40, "Cat": 1, "Category": "food", "foo": "bar"},
		{"Sales": 4.20, "Cat": 2, "Category": "drink", "foo": "bar"},
		{"Sales": 3.60, "Cat": 2, "Category": "drink", "foo": "bar"},
	}
	exp := PieChartData{
		[]float64{3.40, 7.80},
		[]string{"food", "drink"},
		[]string{"rgba(128,128,128, 0.6)", "rgba(128,128,0, 0.6)"},
	}
	type args struct {
		data Data
	}
	tests := []struct {
		name             string
		args             args
		wantPieChartData PieChartData
	}{
		{"category", args{data}, exp},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotPieChartData := pieChart(tt.args.data)
			assert.Equal(t, tt.wantPieChartData, gotPieChartData, "", "")
		})
	}
}

func Test_color(t *testing.T) {
	type args struct {
		id int
	}
	tests := []struct {
		name    string
		args    args
		wantClr string
	}{
		{"big num", args{65}, "rgba(0,0,0, 0.6)"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := color(tt.args.id)
			assert.Equal(t, tt.wantClr, got, "", "")
		})
	}
}

func Test_barChart(t *testing.T) {
	data = Data{
		{"Sales": 1.00, "Cat": 1, "Category": "food", "foo": "bar"},
		{"Sales": 2.40, "Cat": 1, "Category": "food", "foo": "bar"},
		{"Sales": 4.20, "Cat": 2, "Category": "drink", "foo": "bar"},
		{"Sales": 3.60, "Cat": 2, "Category": "drink", "foo": "bar"},
	}
	exp = BarChartData{}
	type args struct {
		data Data
	}
	tests := []struct {
		name             string
		args             args
		wantBarChartData BarChartData
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotBarChartData := barChart(tt.args.data)
			assert.Equal(t, tt.wantBarChartData, gotBarChartData, "", "")
		})
	}
}
