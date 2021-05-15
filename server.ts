
//includes
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const Joi = require('joi')
const cors = require("cors")
const port = process.env.PORT || 8080;
const dbHost = "itddb.mysql.database.azure.com"
const user = "callum@itddb"
const fs = require('fs');
const d = require("./src/utils.ts")
const _ = require("lodash")
// import * as R from "ramda"
const db = mysql.createConnection({
    host: dbHost,
    user: user,
    password: '0089fxcy?',
    database: 'itdepos',
    port: 3306
})

//connect
db.connect((err) => {
    console.log(`Connecting...
    DB: ${dbHost} 
    User: ${user}`)
    if (err) {
        throw err;
    }
    else {
        console.log(`MySql Connected... `);
    }
});

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "build")))


function run(sql) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
}

function select(sql, res, process?) {
    db.query(sql, (err, results) => {
        if (err) throw err;
        else if (process) process(results);
        else res.json(results)

    });
}
function readFile(filePath) {
    return fs.readFileSync(path.resolve(filePath), { encoding: "UTF-8" })
}

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
            run(`USE users;`);
            run(`set @name = '${value.username}';`)
            run(`set @password = '${value.password}';`)
            let sql = fs.readFileSync(path.resolve('sql', 'Login.sql'), { encoding: "UTF-8" })
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

//Sales New
app.get('/api/sales/:db/:startDate/:endDate/:groupBy/:metric/:dateRange', (req, res) => {
    const { db, startDate, endDate, groupBy, metric, dateRange } = req.params;
    run(`USE ${db};`);

    const sql = readFile("sql/Sales.sql")
        .replace("${startDate}", `"${startDate}"`)
        .replace("${endDate}", `"${endDate}"`)

    function get24hrRange() {
        const labels = [];
        for (let i = 0; i < 24; i++) {
            if (i < 10)
                labels.push("0" + i + ":00");
            else
                labels.push(i + ":00");
        }
        return labels;
    }

    function getDays(startDate, endDate) {
        const days = [];
        while (startDate != endDate) {
            startDate = d.addToDate(startDate, 1)
            days.push(startDate);
        }
        return days;
    }

    function getTableData(results) {
        const filtered = (() => {
            switch (groupBy) {
                case "Category": return d.columns(results, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Product": return d.columns(results, "Product", 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "PriceMark": return d.columns(results, "PriceMark", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Cashier": return d.columns(results, "Cashier", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
                case "Receipt": return d.columns(results, "Receipt", 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
            }
        })();
        const summedAndGrouped = d.sumAndGroup(filtered, groupBy);
        return summedAndGrouped;
    }

    function getDataSets(results, labels, timePeriod) {
        return d.getUniqueValues(results, groupBy).map((group, index) => {
            const filtered = d.columns(d.getElementsWithValue(results, groupBy, group), timePeriod, metric)
            const timeSlots = labels.map(label => {
                return {
                    [timePeriod]: label,
                    [metric]: 0.00
                }
            })
            filtered.forEach(obj => {
                timeSlots.forEach((timeSlot) => {
                    if (obj[timePeriod] === timeSlot[timePeriod]) {
                        timeSlot[metric] += obj[metric];
                    }
                })
            })
            const data = timeSlots.map((timeSlot) => {
                return timeSlot[metric]
            })
            return {
                label: group,
                data: data,
                backgroundColor: d.colors(index),
                fill: false,
                borderColor: d.colors(index),
                tension: 0.1
            }
        })
    }

    const labelMap = {
        Day: get24hrRange(),
        Week: getDays(startDate, endDate),
        Month: getDays(startDate, endDate),
        Quarter: getDays(startDate, endDate),
        Year: getDays(startDate, endDate)
    }

    function getLineData(results) {
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        const datasets = getDataSets(results, labels, timePeriod)

        const totals = labels.map(label => 0)
        datasets.forEach(dataset => {
            dataset.data.forEach((dat, index) => {
                totals[index] += dat;
            })
        })

        const total = {
            label: "Total",
            data: totals.map(t => t.toFixed(2)),
            backgroundColor: "rgba(0, 51, 81, 0.5)",
            fill: false,
            borderColor: "rgba(0, 51, 81, 0.5)",
            tension: 0.1
        }
        // datasets.push(total);
        return {
            labels: labels,
            datasets: [total]

        }
    }

    function getBarData(results) {
        const timePeriod = dateRange === "Day" ? "TillHour" : "TillDate";
        const labels = labelMap[dateRange]
        return {
            labels: labels,
            datasets: getDataSets(results, labels, timePeriod)
        }
    }

    function getPieData(results) {
        const filtered = d.columns(results, metric, groupBy);
        const summed = d.sumAndGroup(filtered, groupBy);
        const labels = summed.map((obj) => obj[groupBy]);
        const data = summed.map((obj) => obj[metric]);
        return {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor: labels.map((label, index) => {
                        return d.colors(index);
                    }),
                    data: data
                }
            ]
        }
    }


    const callback = (results) => {
        const tableData = getTableData(results);
        const barData = getBarData(results);
        const pieData = getPieData(results);
        const lineData = getLineData(results);
        let data = {};
        // console.log(d.roundData(tableData, 2));
        if (metric === "Sales" || metric === "Profit") {
            data = {
                tableData: d.roundData(tableData, 2, ["Sales", "Cost", "Discount", "Refund", "Profit"]),
                barData: d.roundData(barData, 2),
                pieData: d.roundData(pieData, 2),
                lineData: d.roundData(lineData, 2)
            }
        }
        else data = {
            tableData: d.roundData(tableData, 2, ["Sales", "Cost", "Discount", "Refund", "Profit"]),
            barData: barData,
            pieData: pieData,
            lineData: lineData,
        }
        res.json(data)
    };

    select(sql, res, callback)
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
app.listen(port, (err) => {
    if (err) throw err;
    else console.log(`Server started on port ${port}`);
}).on("error", (err) => { console.log(err.stack) });

setInterval(() => {
    db.query(`SELECT 1`, (err, results) => {
        console.log("Refreshing Connection")
    });
}, 60000)
