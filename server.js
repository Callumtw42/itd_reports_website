//includes
const express = require('express');
const mysql = require('mysql');


// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0089fxcy?',
    database : 'itdepos'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

//requests

/*ITD Sales Report 1

Category = Description
Qty = count(*) Group by Description
Cost = PackCost / PackSize
Sales = SUM(Price)

*/


//getTodaysSales
app.get('/api/salesData/:startDate/:endDate', (req, res) => {
    let sql = `SELECT Cat, Description as Category, SUM(Quantity) as Qty, SUM((PackCost / PackSize)) as Cost, SUM(Price * Quantity) as Sales, Amount as Refund FROM(
        (SELECT Description, CategoryID as Cat FROM Category) as a
         JOIN
         (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as ProdName,ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '${req.params.startDate}' AND t.TillDate <= '${req.params.endDate}' ORDER BY t.TillID,ti.TillItemID) as b
         ON b.CategoryID = a.Cat
         ) Group by Category;`;
    let query = db.query(sql, (err, results) =>{
    if(err) throw err;
    // res.send('sales fetched');
    
    res.json(results);
    });
});

//getHourlySales
app.get('/api/hourlySalesData/:startDate', (req, res) => {
    let sql = `SELECT Product, Cat, Description as Category, Quantity as Qty, (PackCost / PackSize) as Cost, (Price * Quantity) as Sales, Amount as Refund, DATE_FORMAT(TillDate, '%y-%m-%d') as TillDate, TIME_FORMAT(TillTime, '%H:%m') as TillHour, TillTime FROM(
        (SELECT Description, CategoryID as Cat FROM Category) as a
         JOIN
         (SELECT ti.TillItemID,t.TillID, t.TillDate,t.TillTime,t.PriceBand,c.CategoryID,ti.ProdID,ti.Barcode AS ItemID,ti.PLU,ti.Price,ti.ItemTotal,ti.Quantity,ti.VATRate,ti.SaleByWeight AS SoldByWeight,ti.IDiscount,ti.RefundID,p.BarCode,p.PackBarcode,p.PackPLU,p.PackSize,p.PackCost,p.Wholesale,p.PackSalePrice,p.Retail,p.RetailAWt,p.PackSalePriceB,p.RetailB,p.RetailBWt,p.SaleByWeight,p.UnitKg,ti.Type AS ItemType,ti.SPOffer,ti.SPOfferText,ti.SPGroupID,ti.Description as Product,ri.Amount,ri.RefundDate FROM TillItem ti INNER JOIN Till t ON ti.TillID = t.TillID LEFT JOIN Product p ON ti.ProdID = p.ProductID LEFT JOIN Category c ON p.CategoryID = c.CategoryID LEFT JOIN RefundItem ri ON ti.RefundID = ri.RefundID WHERE t.TillDate >= '${req.params.startDate}' AND t.TillDate <= '${req.params.startDate}' ORDER BY t.TillID,ti.TillItemID) as b
         ON b.CategoryID = a.Cat
         )`;
    let query = db.query(sql, (err, results) =>{
    if(err) throw err;
    // res.send('sales fetched');
    
    res.json(results);
    });
});

app.get('/api/stock', (req, res) => {
    let sql = `SELECT ProdID, ProductName, Description, UnitQuantity, stockitem.LastUpdate FROM itdepos.stockitem JOIN product ON stockitem.ProdID = product.ProductID JOIN category ON product.CategoryID = category.CategoryID;`;
    let query = db.query(sql, (err, results) =>{
    if(err) throw err;
    // res.send('sales fetched');
    
    res.json(results);
    });
});



//listen
app.listen('5000', () => {
    console.log('Server started on port 5000');
});
