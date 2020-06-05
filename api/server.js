
//includes
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const Joi = require('joi')
const bodyParser = require("body-parser")

const db = mysql.createConnection({
    host: 'callum.mysql.database.azure.com',
    user: 'callum@callum',
    password: '0089fxcy?',
    database: 'itdepos',
    port: 3306
})

//connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('MySql Connected...');
    }
});

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function run(sql) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
}

function select(sql, res, process) {
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)

    });
}

//test
app.get('api/test', (req, res) => {
    res.json("COnnected")
});

//login
app.post('/api/login', (req, res) => {
    //NEXT: learn to post request to eliminate questionmark bug 

    const emptyMsg = () => { return "Please enter a username and password" }
    const noAccountMsg = () => { return "No accounts match that username / password" }
    const invalidCharMsg = () => { return "Invalid input. Allowed alphanumeric or the following characters: _, @, #, $, %, ?" }


    const schema = Joi.object({
        username: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg),
        password: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg)
    }).required().error(emptyMsg)

    const validated = schema.validate(req.body)
    const { error, value } = validated

    if (error)
        res.send(error.details[0].message)
    else {
        run(`USE users;`);
        run(`set @name = '${value.username}';`)
        run(`set @password = '${value.password}';`)
        let sql = fs.readFileSync(path.join('sql', 'Login.sql'), { encoding: "UTF-8" })
        db.query(sql, (err, results) => {
            if (err) throw err;
            console.log("object")
            results[0]
                ? res.json(results)
                : res.json(noAccountMsg())
        });
    }
});

//SalesData
app.get('/api/salesByProduct/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Sales.sql'), { encoding: "UTF-8" }), res)
});

// Stock
app.get('/api/stock/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    let { schema, orderBy, order, bufferSize, bufferCount } = req.params
    let sql = fs.readFileSync(path.join('sql', 'stock.sql'), { encoding: "UTF-8" })
        .replace("${orderBy}", orderBy)
        .replace("${order}", order)
        .replace("${bufferSize}", parseInt(bufferSize))
        .replace("${offset}", parseInt(bufferSize) * parseInt(bufferCount))

    run(`use ${schema}`)
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

// Stock_Reorder
app.get('/api/reorder/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    let { schema, orderBy, order, bufferSize, bufferCount } = req.params
    let sql = fs.readFileSync(path.join('sql', 'reorder.sql'), { encoding: "UTF-8" })
        .replace("${orderBy}", orderBy)
        .replace("${order}", order)
        .replace("${bufferSize}", parseInt(bufferSize))
        .replace("${offset}", parseInt(bufferSize) * parseInt(bufferCount))

    run(`use ${schema}`)
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

// nonscan
app.get('/api/nonscan/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    let { schema, orderBy, order, bufferSize, bufferCount } = req.params
    let sql = fs.readFileSync(path.join('sql', 'nonscan.sql'), { encoding: "UTF-8" })
        .replace("${orderBy}", orderBy)
        .replace("${order}", order)
        .replace("${bufferSize}", parseInt(bufferSize))
        .replace("${offset}", parseInt(bufferSize) * parseInt(bufferCount))

    run(`use ${schema}`)
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

//Stock Adjust
app.get('/api/adjust/:schema/:startDate/:endDate/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    let { schema, startDate, endDate, orderBy, order, bufferSize, bufferCount } = req.params
    let sql = fs.readFileSync(path.join('sql', 'adjust.sql'), { encoding: "UTF-8" })
        .replace("${startDate}", startDate)
        .replace("${endDate}", endDate)
        .replace("${orderBy}", orderBy)
        .replace("${order}", order)
        .replace("${bufferSize}", parseInt(bufferSize))
        .replace("${offset}", parseInt(bufferSize) * parseInt(bufferCount))

    run(`use ${schema}`)
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

//Customer Credit
app.get('/api/credit/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    let data = select(fs.readFileSync(path.join('sql', 'Customer_Credit.sql'), { encoding: "UTF-8" }), res)
});

//Product Exchange
app.get('/api/exchange/:db', (req, res) => {
    run(`USE ${req.params.db};`);
    let data = select(fs.readFileSync(path.join('sql', 'Product_Exchange.sql'), { encoding: "UTF-8" }), res)
});

//Expiry Date
app.get('/api/expiry/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Expiry_Dates.sql'), { encoding: "UTF-8" }), res)
});

//Voucher Sales
app.get('/api/voucher/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Voucher_Sales.sql'), { encoding: "UTF-8" }), res)
});

//Price_Override
app.get('/api/priceoverride/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Price_Override.sql'), { encoding: "UTF-8" }), res)
});

//Wastage
app.get('/api/wastage/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Wastage.sql'), { encoding: "UTF-8" }), res)
});


//Refund
app.get('/api/refund/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Refund_Report.sql'), { encoding: "UTF-8" }), res)
});


//Staff Hours
app.get('/api/staffhours/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Staff_Hours.sql'), { encoding: "UTF-8" }), res)
});


//Void_Sales
app.get('/api/voidsales/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Void_Sales.sql'), { encoding: "UTF-8" }), res)
});


//Return to Supplier
app.get('/api/returntosupplier/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'Return_To_Supplier.sql'), { encoding: "UTF-8" }), res)
});

//DBList
app.get('/api/databases', (req, res) => {
    let data = select(fs.readFileSync(path.join('sql', 'databases.sql'), { encoding: "UTF-8" }), res)
});

//VAT
app.get('/api/VAT/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`);
    run(`SET @startDate = '${req.params.startDate}';`);
    run(`SET @endDate = '${req.params.endDate}';`);
    let data = select(fs.readFileSync(path.join('sql', 'VAT.sql'), { encoding: "UTF-8" }), res);
});

//listen
let server = app.listen('8888', (err) => {
    if (err) throw err;
    else console.log(`Server started on port 8888`);
});