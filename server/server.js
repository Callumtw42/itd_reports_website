/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
// includes
import express from 'express';
import path from 'path';
import Joi from 'joi';
import cors from 'cors';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d from '@callumtw42/toolkit/utils/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { run, select, connectDB } from '@callumtw42/toolkit/mysql/mysql';
import * as R from 'rambda';
import sales from './sales';

function readFile(filePath) {
  // @ts-ignore
  return fs.readFileSync(path.join(__dirname, filePath), { encoding: 'UTF-8' });
}
export default function serve() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../build')));

  const db = connectDB(
    'itddb.mysql.database.azure.com',
    'callum@itddb',
    '0089fxcy?',
    'itdepos',
  );
  const port = process.env.PORT || 8080;

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  app.get('/reports', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
  });

  // test
  app.get('/api/test', (req, res) => {
    res.json('test');
  });

  // login
  app.post('/api/login', (req, res) => {
    // NEXT: learn to post request to eliminate questionmark bug
    const { username, password } = req.body;
    const emptyMsg = () => 'Please enter a username and password';
    const noAccountMsg = () => 'No accounts match that username / password';
    const invalidCharMsg = () => 'Invalid input. Allowed alphanumeric or the following characters: _, @, #, $, %, ?';
    const valid = /[a-zA-Z0-9_@#$%?]+/.test(username + password);
    if (!valid) res.json(invalidCharMsg());
    else if (username.length > 0 && password.length > 0 && valid) {
      console.log('running');
      const schema = Joi.object({
        username: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg),
        password: Joi.string().required().regex(/^[\w@#$%?]+$/).error(invalidCharMsg),
      }).required().error(emptyMsg);

      const validated = schema.validate(req.body);
      const { error, value } = validated;

      if (error) {
        // res.json(invalidCharMsg())
        throw error;
        // res.json(error.details[0].message)
      } else {
        run('USE users;', db);
        run(`set @name = '${value.username}';`, db);
        run(`set @password = '${value.password}';`, db);

        const sql = readFile('sql/Login.sql');
        db.query(sql, (err, results) => {
          if (err) throw err;
          console.log('object');
          if (results[0]) res.json(results);
          else res.json(noAccountMsg());
        });
      }
    } else res.json(emptyMsg());
  });

  app.get('/api/sales/:db/:startDate/:endDate/:groupBy/:metric/:dateRange', (req, res) => {
    sales(req, res, db);
  });

  app.get('/api/salesSearch/:db/:startDate/:endDate/:groupBy/:metric/:dateRange/:search', (req, res) => {
    const {
      startDate, endDate, groupBy, search,
    } = req.params;
    function getTableData(results) {
      const filtered = (() => {
        switch (groupBy) {
          case 'Category': return d.columns(results, 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
          case 'Product': return d.columns(results, 'Product', 'Category', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
          case 'PriceMark': return d.columns(results, 'PriceMark', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
          case 'Cashier': return d.columns(results, 'Cashier', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
          case 'Receipt': return d.columns(results, 'Receipt', 'Sales', 'Cost', 'Discount', 'Refund', 'Profit', 'Qty');
          default: return [];
        }
      })();
      const summedAndGrouped = d.sumAndGroup(filtered, groupBy);
      const colored = summedAndGrouped.map(
        (o, i) => R.map((v, k) => (k === groupBy
          ? { value: v, color: d.colors(i) }
          : v),
          o),
      );
      const match = d.matchRows(colored, search);
      return match;
    }

    const sql = readFile('sql/Sales.sql')
      .replace('${startDate}', `"${startDate}"`)
      .replace('${endDate}', `"${endDate}"`);

    select(sql, db, res, (results) => {
      const data = d.roundData(getTableData(results), 2, ['Sales', 'Cost', 'Discount', 'Refund', 'Profit']);
      res.json(data);
    });
  });

  // SalesData
  app.get('/api/salesByProduct/:db/:startDate/:endDate', (req, res) => {
    // console.log(req.params)
    const { startDate, endDate } = req.params;
    run(`USE ${req.params.db};`, db);
    // run(`USE banana;`, db);
    // run(`SET @startDate = '${req.params.startDate}';`);
    // run(`SET @endDate = '${req.params.endDate}';`);
    const sql = readFile('sql/Sales.sql')
      .replace('${startDate}', `'${startDate}'`)
      .replace('${endDate}', `'${endDate}'`);
    select(sql, db, res);
  });

  // Stock
  app.get('/api/stock/:schema/:orderBy/:order/:search/:bufferSize/:bufferCount/', (req, res) => {
    // console.log(req.params)
    const {
      schema, orderBy, order, bufferSize, bufferCount, search,
    } = req.params;
    const size = parseInt(bufferSize, 10);
    const count = parseInt(bufferCount, 10);
    // console.log(search);
    const sql = readFile('sql/stock.sql')
      .replace('${orderBy}', `${orderBy}`)
      .replace('${order}', `${order}`);
    // .replace("${bufferSize}", `${parseInt(bufferSize)}`)
    // .replace("${offset}", `${parseInt(bufferSize) * parseInt(bufferCount)}`)

    run(`use ${schema}`, db);
    select(sql, db, res, (results) => {
      const match = d.matchRows(results, search);
      const startIndex = size * count;
      const endIndex = (count + 1) * size;
      // console.log(endIndex)
      const buffer = match.slice(startIndex, endIndex);
      // console.log(match.slice(0,10))
      // console.log(bufferCount)
      // console.log(bufferSize)
      // console.log("////////////////////////////////////////////")
      // console.log(sql)
      // console.log(buffer.slice(0, 10))
      res.json(buffer);
    });
    // db.query(sql, (err, results) => {
    //     if (err) throw err;
    //     res.json(results)
    // });
  });

  // Stock_Reorder
  app.get('/api/reorder/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    const {
      schema, orderBy, order, bufferSize, bufferCount,
    } = req.params;
    const sql = readFile('sql/reorder.sql')
      .replace('${orderBy}', `'${orderBy}'`)
      .replace('${order}', `'${order}'`)
      .replace('${bufferSize}', `${parseInt(bufferSize, 10)}`)
      .replace('${offset}', `${parseInt(bufferSize, 10) * parseInt(bufferCount, 10)}`);

    run(`use ${schema}`, db);
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // nonscan
  app.get('/api/nonscan/:schema/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    const {
      schema, orderBy, order, bufferSize, bufferCount,
    } = req.params;
    const sql = readFile('sql/nonscan.sql')
      .replace('${orderBy}', `'${orderBy}'`)
      .replace('${order}', `'${order}'`)
      .replace('${bufferSize}', `${parseInt(bufferSize, 10)}`)
      .replace('${offset}', `${parseInt(bufferSize, 10) * parseInt(bufferCount, 10)}`);

    run(`use ${schema}`, db);
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Stock Adjust
  app.get('/api/adjust/:schema/:startDate/:endDate/:orderBy/:order/:bufferSize/:bufferCount', (req, res) => {
    const {
      schema, startDate, endDate, orderBy, order, bufferSize, bufferCount,
    } = req.params;
    const sql = readFile('sql/adjust.sql')
      .replace('${startDate}', `'${startDate}'`)
      .replace('${endDate}', `'${endDate}'`)
      .replace('${orderBy}', `'${orderBy}'`)
      .replace('${order}', `'${order}'`)
      .replace('${bufferSize}', `${parseInt(bufferSize, 10)}`)
      .replace('${offset}', `${parseInt(bufferSize, 10) * parseInt(bufferCount, 10)}`);

    run(`use ${schema}`, db);
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Customer Credit
  app.get('/api/credit/:db', (req, res) => {
    run(`USE ${req.params.db};`, db);
    const sql = readFile('sql/Customer_Credit.sql');
    select(sql, db, res);
  });

  // Product Exchange
  app.get('/api/exchange/:db', (req, res) => {
    run(`USE ${req.params.db};`, db);
    const sql = readFile('sql/Product_Exchange.sql');
    select(sql, db, res);
  });

  // Expiry Date
  app.get('/api/expiry/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Expiry_Dates.sql');
    select(sql, db, res);
  });

  // Voucher Sales
  app.get('/api/voucher/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Voucher_Sales.sql');
    select(sql, db, res);
  });

  // Price_Override
  app.get('/api/priceoverride/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Price_Override.sql');
    select(sql, db, res);
  });

  // Wastage
  app.get('/api/wastage/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Wastage.sql');
    select(sql, db, res);
  });

  // Refund
  app.get('/api/refund/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Refund_Report.sql');
    select(sql, db, res);
  });

  // Staff Hours
  app.get('/api/staffhours/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Staff_Hours.sql');
    select(sql, db, res);
  });

  // Void_Sales
  app.get('/api/voidsales/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Void_Sales.sql');
    select(sql, db, res);
  });

  // Return to Supplier
  app.get('/api/returntosupplier/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/Return_To_Supplier.sql');
    select(sql, db, res);
  });

  // DBList
  app.get('/api/databases', () => {
    readFile('./sql/databases.sql');
  });

  // VAT
  app.get('/api/VAT/:db/:startDate/:endDate', (req, res) => {
    run(`USE ${req.params.db};`, db);
    run(`SET @startDate = '${req.params.startDate}';`, db);
    run(`SET @endDate = '${req.params.endDate}';`, db);
    const sql = readFile('sql/VAT.sql');
    select(sql, db, res);
  });

  // listen
  // @ts-ignore
  app.listen(port, (err) => {
    if (err) throw err;
    else console.log(`Server started on port ${port}`);
  }).on('error', (err) => { console.log(err.stack); });

  setInterval(() => {
    db.query('SELECT 1', () => {
      console.log('Refreshing Connection');
    });
  }, 60000);
}

// module.exports = {
//     serve
// }
