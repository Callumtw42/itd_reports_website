const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const dbHost = "itddb.mysql.database.azure.com"
const user = "callum@itddb"

export function run(sql, db) {
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
}

export function select(sql, db, res, process?) {
    db.query(sql, (err, results) => {
        if (err) throw err;
        else if (process) process(results);
        else res.json(results)

    });
}
export function readFile(filePath) {
    return fs.readFileSync(path.join(__dirname, filePath), { encoding: "UTF-8" })

}

export function connectDB() {
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
    return db;
}