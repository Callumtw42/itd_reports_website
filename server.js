
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

//getTodaysSales
app.get('/api/salesData/:db/:startDate/:endDate', (req, res) => {
    use(req.params.db);
    let sql = `SELECT Cat, Description as Category, SUM(Quantity) as Qty, SUM((PackCost / PackSize)*Quantity) as Cost, SUM(Price * Quantity) as Sales, SUM(Amount) as Refund FROM(
        (SELECT Description, CategoryID as Cat FROM Category) as a
         JOIN
         (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as ProdName,ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '${req.params.startDate}' AND t.TillDate <= '${req.params.endDate}' ORDER BY t.TillID,ti.TillItemID) as b
         ON b.CategoryID = a.Cat
         ) Group by Category;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        res.json(results);
    });
});


function run(sql) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        // res.json(results);
    });
}


//getTodaysSales
app.get('/api/salesByProduct/:db/:startDate/:endDate', (req, res) => {
    use(req.params.db);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);

    let sql = fs.readFileSync(path.join('SQL_Queries', 'Sales.sql'), { encoding: "UTF-8" })
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//getHourlySales
app.get('/api/hourlySalesData/:db/:startDate', (req, res) => {
    use(req.params.db);
    let sql = `SELECT Product, Cat, Description as Category, Quantity as Qty, ((PackCost / PackSize)*Quantity) as Cost, (Price * Quantity) as Sales, Amount as Refund, DATE_FORMAT(TillDate, '%y-%m-%d') as TillDate, TIME_FORMAT(TillTime, '%H:%i') as TillHour, TillTime FROM(
        (SELECT Description, CategoryID as Cat FROM Category) as a
         JOIN
         (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as Product,ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '${req.params.startDate}' AND t.TillDate <= '${req.params.startDate}' ORDER BY t.TillID,ti.TillItemID) as b
         ON b.CategoryID = a.Cat
         );`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        res.json(results);
    });
});

app.get('/api/stock/:db', (req, res) => {
    use(req.params.db);
    let sql =  fs.readFileSync(path.join('SQL_Queries', 'Stock.sql'), { encoding: "UTF-8" })
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        res.json(results);
    });
});

app.get('/api/databases', (req, res) => {

    let sql = `SHOW DATABASES;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        res.json(results);
    });
});



app.get('/api/VAT/:db/:startDate/:endDate', (req, res) => {
    use(req.params.db);
    let sql = `SELECT ti.TillID as Receipt_No, DATE_FORMAT(ti.date, '%y/%m/%d') as date, (ti.ItemTotal - IFNULL(ri.Amount, 0)) as Total_Sales, ti.Quantity, ti.Price, ti.VatRate, ti.Type, ti.IDiscount,
    t.Discount,t.PriceBand,ri.RefundID,ri.RefundDate,ri.Amount, ((ti.ItemTotal - IFNULL(ri.Amount, 0)) - ((ti.ItemTotal - IFNULL(ri.Amount, 0)) / (1 + (ti.VatRate / 100)))) as Total_VAT, 
    ((ti.ItemTotal - IFNULL(ri.Amount, 0))-((ti.ItemTotal - IFNULL(ri.Amount, 0)) - ((ti.ItemTotal - IFNULL(ri.Amount, 0)) / (1 + (ti.VatRate / 100))))) as Nett
    FROM TillItem ti INNER JOIN Till t ON ti.TillId = t.TillID LEFT JOIN RefundItem ri ON ri.RefundID = ti.RefundID 
    WHERE t.TillDate >= '${req.params.startDate}' AND t.TillDate <= '${req.params.endDate}' AND t.Reason = 'Sale' ORDER BY ti.TillID;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        // res.send('sales fetched');

        res.json(results);
    });
});



function use(dbSel) {
    let sql = `USE ${dbSel};`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
}


//listen
app.listen('5000', () => {
    console.log('Server started on port 5000');
});
