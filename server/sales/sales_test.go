package sales

import (
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

var data Data = Data{
	{
		"Category   ": "drinks",
		"Product    ": "coke",
		"AssocProdId": 1.0,
		"Cashier    ": "Callum",
		"Receipt":     1.0,
		"v":           1.0,
	},

	{
		"Category   ": "drinks",
		"Product    ": "coke",
		"AssocProdId": 1.0,
		"Cashier    ": "Callum",
		"Receipt":     1.0,
		"v":           1.0,
	},

	{
		"Category   ": "groceries",
		"Product    ": "apple",
		"AssocProdId": 2.0,
		"Cashier    ": "Bob",
		"Receipt":     2.0,
		"v":           2.0,
	},
}

//NEXT: Mock data using datagrip JSON, write expected results in same file, write tests
func Test_groupProduct(t *testing.T) {
	exp := Data{

		{
			"Product   ": "coke",
			"v":          2.0,
		},

		{
			"Product   ": "apple",
			"v":          2.0,
		},
	}

	type args struct {
		data Data
	}
	tests := []struct {
		name      string
		args      args
		wantGroup Data
	}{
		{"Product", args{data}, exp},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotGroup := groupCategory(tt.args.data)
			assert.Equal(t, tt.wantGroup, gotGroup, "", "")
		})
	}
}

func Test_groupCategory(t *testing.T) {
	exp := Data{

		{
			"Category   ": "drinks",
			"v":           2.0,
		},

		{
			"Category   ": "groceries",
			"v":           2.0,
		},
	}
	type args struct {
		data Data
	}
	tests := []struct {
		name      string
		args      args
		wantGroup Data
	}{
		{"Category", args{data}, exp},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotGroup := groupCategory(tt.args.data)
			assert.Equal(t, tt.wantGroup, gotGroup, "", "")
		})
	}
}

func Test_salesData(t *testing.T) {

	type args struct {
		data Data
	}
	tests := []struct {
		name       string
		args       args
		wantGroups Groups
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotGroups := salesData(tt.args.data); !reflect.DeepEqual(gotGroups, tt.wantGroups) {
				t.Errorf("salesData() = %v, want %v", gotGroups, tt.wantGroups)
			}
		})
	}
}
