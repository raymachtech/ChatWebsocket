"use strict";
const mssql = require('mssql');
// const logger = require('./winston.js');

// const config ={
//     DB_USER: 'shivam',
// DB_PASSWORD: 'Zxcvbnm,./123',
// DB_SERVER: '164.52.213.218',

// }
const sqlConfig= {
    user: 'shivam',
    password: 'Zxcvbnm,./123',
    // database: process.env.DB_NAME,
    server: "164.52.213.218",
    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 30000
    // },
    options:{
        trustServerCertificate: true,
        // trustedconnection: true,
        // enableArithAbort: true,
        // instanceName: "",
    },
    port: 9987,
}

class DbClass {
    constructor(sql,config){
        this.config = config;
        this.sql = sql;
        this.pool = null;
    }

    async connect(){
        try {
            this.pool = await new this.sql.connect(this.config);
            console.log(this.pool);
            console.log("connected")
        } catch (error) {
            console.log("errorrr")
            console.log(error)
        }
    }

    connection(){
        return {sql:this.sql,pool: this.pool};
    }

    async runQuery(query){
        try {
            const result = await this.sql.query`${query}`;
            console.dir(result);
        } catch (error) {
            // logger.info('error in connectiong to database')
            console.error(error);
        }
    }
}

const DbInstance = new DbClass(mssql,sqlConfig);
// Object.freeze(DbInstance);
module.exports = DbInstance;








// // async function connect(){
// //     try {
// //         // make sure that any items are correctly URL encoded in the connection string
// //         // await sql.connect('Server=localhost;Database=master;Trusted_Connection=True');
// //         await sql.connect(config);
// //         console.log("server connected");
// //         // const result = await sql.query`SELECT @@ServerName`;
// //         // console.dir(result);
// //     } catch (err) {
// //         console.log("errr",err);
// //         // ... error checks
// //     }
// // } 

// // connect();

// // // async () => {
// // //     try {
// // //      // make sure that any items are correctly URL encoded in the connection string
// // //      await sql.connect(sqlConfig)
// // //      const result = await sql.query`SELECT @@ServerName`
// // //      console.dir(result)
// // //     } catch (err) {
// // //      // ... error checks
// // //     }
// // //    }



