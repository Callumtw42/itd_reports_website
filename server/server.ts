//includes
const express = require('express');
const path = require('path');
const Joi = require('joi')
const cors = require("cors")
const fs = require('fs');
const d = require("../src/utils.ts")
const _ = require("lodash")
const { run, select, readFile, connectDB } = require("./server-utils")
const { sales } = require("./sales")

export function serve() {
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, "build")))

    const db = connectDB();
    const port = process.env.PORT || 8080;

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/build/index.html"))
    })


    app.get("/reports", (req, res) => {
        res.sendFile(path.join(__dirname, "./", "build", "index.html"))
    })

    //test
    app.get('/api/test', (req, res) => {
        res.json("test");
    });

    //login
    app.post('/api/login', (req, res) => {
        //NEXT: learn to post request to eliminate questionmark bug 
        const { username, password } = req.body;
        const emptyMsg = () => { return "Please enter a username and password" }
        const noAccountMsg = () => { return "No accounts match that username / password" }
        const invalidCharMsg = () => { return "Invalid input. Allowed alphanumeric or the following characters: _, @, #, $, %, ?" }
        const valid = /[a-zA-Z0-9_@#$%?]+/.test(username + password)
        if (!valid) res.json(invalidCharMsg())
        else if (username.length > 0 && password.length > 0 && valid) {
            console.log("running")
            const schema = Joi.object({
                username: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg),
                password: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg)
            }).required().error(emptyMsg)

            const validated = schema.validate(req.body)
            const { error, value } = validated

            if (error) {
                // res.json(invalidCharMsg())
                throw error;
                // res.json(error.details[0].message)
            }
            else {
                run(`USE users;`, db);
                run(`set @name = '${value.username}';`, db)
                run(`set @password = '${value.password}';`, db)
                let sql = fs.readFileSync(path.join(__dirname, 'sql', 'Login.sql'), { encoding: "UTF-8" })
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    console.log("object")
                    results[0]
                        ? res.json(results)
                        : res.json(noAccountMsg())
                });
            }
        }
        else res.json(emptyMsg())
    });

    app.get('/api/sales/:db/:startDate/:endDate/:groupBy/:metric/:dateRange', (req, res) => {
        sales(req, res, db)
    })
    //SalesData
    // app.get('/api/salesByProduct/:db/:startDate/:endDate', (req, res) => {
    //     run(`USE ${req.params.db};`);
    //     run(`SET @startDate = '${req.params.startDate}';`);
    //     run(`SET @endDate = '${req.params.endDate}';`);
    //     let data = select(fs.readFileSync(path.resolve('sql', 'Sales.sql'), { encoding: "UTF-8" }), res)
    // });

    // Stock
    app.get('/api/stock/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
        let { schema, orderBy, order, bufferSize, bufferCount } = req.params
        let sql = fs.readFileSync(path.join('sql', 'stock.sql'), { encoding: "UTF-8" })
            .replace("${orderBy}", orderBy)
            .replace("${order}", order)
            .replace("${bufferSize}", parseInt(bufferSize))
            .replace("${offset}", parseInt(bufferSize) * parseInt(bufferCount))

        run(`use ${schema}`, db)
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

        run(`use ${schema}`, db)
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

        run(`use ${schema}`, db)
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

        run(`use ${schema}`, db)
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        });
    });

    //Customer Credit
    app.get('/api/credit/:db', (req, res) => {
        run(`USE ${req.params.db};`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Customer_Credit.sql'), { encoding: "UTF-8" }), db, res)
    });

    //Product Exchange
    app.get('/api/exchange/:db', (req, res) => {
        run(`USE ${req.params.db};`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Product_Exchange.sql'), { encoding: "UTF-8" }), db, res)
    });

    //Expiry Date
    app.get('/api/expiry/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Expiry_Dates.sql'), { encoding: "UTF-8" }), db, res)
    });

    //Voucher Sales
    app.get('/api/voucher/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Voucher_Sales.sql'), { encoding: "UTF-8" }), db, res)
    });

    //Price_Override
    app.get('/api/priceoverride/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Price_Override.sql'), { encoding: "UTF-8" }), db, res)
    });

    //Wastage
    app.get('/api/wastage/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Wastage.sql'), { encoding: "UTF-8" }), db, res)
    });


    //Refund
    app.get('/api/refund/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Refund_Report.sql'), { encoding: "UTF-8" }), db, res)
    });


    //Staff Hours
    app.get('/api/staffhours/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Staff_Hours.sql'), { encoding: "UTF-8" }), db, res)
    });


    //Void_Sales
    app.get('/api/voidsales/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Void_Sales.sql'), { encoding: "UTF-8" }), db, res)
    });


    //Return to Supplier
    app.get('/api/returntosupplier/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'Return_To_Supplier.sql'), { encoding: "UTF-8" }), db, res)
    });

    //DBList
    app.get('/api/databases', (req, res) => {
        // let data = select(fs.readFileSync(path.join('sql', 'databases.sql'), { encoding: "UTF-8" }), db, res)
        let data = readFile("./sql/databases.sql");
    });

    //VAT
    app.get('/api/VAT/:db/:startDate/:endDate', (req, res) => {
        run(`USE ${req.params.db};`, db);
        run(`SET @startDate = '${req.params.startDate}';`, db);
        run(`SET @endDate = '${req.params.endDate}';`, db);
        let data = select(fs.readFileSync(path.join('sql', 'VAT.sql'), { encoding: "UTF-8" }), db, res);
    });

    //listen
    app.listen(port, (err) => {
        if (err) throw err;
        else console.log(`Server started on port ${port}`);
    }).on("error", (err) => { console.log(err.stack) });

    setInterval(() => {
        db.query(`SELECT 1`, (err, results) => {
            console.log("Refreshing Connection")
        });
    }, 60000)
}