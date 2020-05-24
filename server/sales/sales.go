package sales

import (
	"server/server/lib/datafns"
)

//Data datafns.data
type Data = datafns.Data

//Groups collection of data slices summed and grouped by their respective categories
type Groups = struct {
	Category    Data
	Product     Data
	Pricemark   Data
	Cashier     Data
	Transaction Data
}

func groupCategory(data Data) (group Data) {
	return group
}

func groupProduct(data Data) (group Data) {
	return group
}

func groupPricemark(data Data) (group Data) {
	return group
}

func groupCashier(data Data) (group Data) {
	return group
}

func groupTransaction(data Data) (group Data) {
	return group
}

func salesData(data Data) (groups Groups) {
	return groups
}
