
//includes
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0089fxcy?',
    database: 'itdepos'
})

//connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

function run(sql) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
}

function select(sql, res) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

//SalesData
app.get('/api/salesByProduct/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Sales.sql'), { encoding: "UTF-8" }), res)
});

// Stock
app.get('/api/stock/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Stock.sql'), { encoding: "UTF-8" }), res)
});

// Stock_Reorder
app.get('/api/reorder/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Reorder.sql'), { encoding: "UTF-8" }), res)
});

// Stock_Reorder
app.get('/api/nonscan/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Non_Scan.sql'), { encoding: "UTF-8" }), res)
});

//Stock Adjust
app.get('/api/adjust/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Stock_Adjustment.sql'), { encoding: "UTF-8" }), res)
});

//Customer Credit
app.get('/api/credit/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Customer_Credit.sql'), { encoding: "UTF-8" }), res)
});

//Product Exchange
app.get('/api/exchange/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Product_Exchange.sql'), { encoding: "UTF-8" }), res)
});

//Expiry Date
app.get('/api/expiry/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Expiry_Dates.sql'), { encoding: "UTF-8" }), res)
});

//Voucher Sales
app.get('/api/voucher/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Voucher_Sales.sql'), { encoding: "UTF-8" }), res)
});

//Price_Override
app.get('/api/priceoverride/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Price_Override.sql'), { encoding: "UTF-8" }), res)
});

//Wastage
app.get('/api/wastage/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Wastage.sql'), { encoding: "UTF-8" }), res)
});


//Refund
app.get('/api/refund/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Refund_Report.sql'), { encoding: "UTF-8" }), res)
});


//Staff Hours
app.get('/api/staffhours/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Staff_Hours.sql'), { encoding: "UTF-8" }), res)
});


//Void_Sales
app.get('/api/voidsales/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Void_Sales.sql'), { encoding: "UTF-8" }), res)
});


//Return to Supplier
app.get('/api/returntosupplier/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'Return_To_Supplier.sql'), { encoding: "UTF-8" }), res)
});

//DBList
app.get('/api/databases', (req, res) => {
    select(`SHOW DATABASES;`, res);
});

//VAT
app.get('/api/VAT/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    select(fs.readFileSync(path.join('SQL_Queries', 'VAT.sql'), { encoding: "UTF-8" }), res);
});

//listen
app.listen('5000', () => {
    console.log('Server started on port 5000');
});
