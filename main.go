package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"

	"lib/sqlapi"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var mysqlConnect = sqlapi.MysqlConnect
var sel = sqlapi.Sel
var db = sqlapi.DB
var run = sqlapi.Run
var jsonEncode = sqlapi.JSONEncode

func printPID() {
	fmt.Print("PID: ")
	// cmd := exec.Command("pgrep", "api")
	cmd := exec.Command("ps")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		log.Fatalf("cmd.Run() failed with %s\n", err)
	}
}

func main() {

	fmt.Println("Go Rest API")
	printPID()

	//connect
	mysqlConnect(
		"root",
		"0089fxcy?",
		"localhost",
		"3306",
		"itdepos",
	)
	defer db.Close()

	//init router
	router := mux.NewRouter()

	//Stock
	router.HandleFunc("/api/stock/{db}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		data := sel("./sql/Stock.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//Stock Reorder
	router.HandleFunc("/api/reorder/{db}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		data := sel("./sql/Reorder.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//non scan
	router.HandleFunc("/api/nonscan/{db}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		data := sel("./sql/Non_Scan.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//customer credit
	router.HandleFunc("/api/credit/{db}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		data := sel("./sql/Customer_Credit.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//Product exchange
	router.HandleFunc("/api/exchange/{db}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		data := sel("./sql/Product_Exchange.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//Sales
	router.HandleFunc("/api/salesByProduct/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Sales.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//stock adjust
	router.HandleFunc("/api/adjust/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Stock_Adjustment.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//Expiry Date
	router.HandleFunc("/api/expiry/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Expiry_Dates.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//voucher sales
	router.HandleFunc("/api/voucher/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Voucher_Sales.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//price override
	router.HandleFunc("/api/priceoverride/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Price_Override.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//wastage
	router.HandleFunc("/api/wastage/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Wastage.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//refundn
	router.HandleFunc("/api/refund/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Refund_Report.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//staff_hours
	router.HandleFunc("/api/staffhours/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Staff_Hours.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//void sales
	router.HandleFunc("/api/voidsales/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Void_Sales.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//return to supplier
	router.HandleFunc("/api/returntosupplier/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/Return_To_Supplier.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//VAT
	router.HandleFunc("/api/VAT/{db}/{startDate}/{endDate}", func(res http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		run("use " + params["db"])
		run("set @startDate = " + "'" + params["startDate"] + "'")
		run("set @endDate = " + "'" + params["endDate"] + "'")
		data := sel("./sql/VAT.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//dblist
	router.HandleFunc("/api/databases", func(res http.ResponseWriter, req *http.Request) {
		data := sel("./sql/databases.sql")
		jsonEncode(res, data)
	}).Methods("GET")

	//listen
	log.Fatal(http.ListenAndServe(":8001", router))
}
