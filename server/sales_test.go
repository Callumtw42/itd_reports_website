package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_sales(t *testing.T) {
	data := Data{
		{"Sales": 1.0, "Id": 1},
		{"Sales": 2.0, "Id": 2},
	}
	exp := Data{}
	type args struct {
		data Data
	}
	tests := []struct {
		name          string
		args          args
		wantSalesData SalesData
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotSalesData := sales(tt.args.data)
			assert.Equal(t, tt.wantSalesData, gotSalesData, "", "")
		})
	}
}
