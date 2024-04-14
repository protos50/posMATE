 
//const Client = require('@rmp135/sql-ts').Client
import { Client } from '@rmp135/sql-ts' 
//include env ../backend/.env
import dotenv from 'dotenv'
dotenv.config({path: '../backend/.env'})

 import fs from 'fs'
const config = {
  "client": "mssql",
  "connection": {
    "host":  process.env.DB_HOST,
    "user":  process.env.DB_USER,
    "password":  process.env.DB_PASS,
    "database":  process.env.DB_NAME,
  }
}
 
const main=async()=>{
  console.log('Generando interfaces de la base de datos')
const definition = await Client
  .fromConfig(config)
  .fetchDatabase()
  .toTypescript()

  //save to Database.ts

  fs.writeFileSync('../backend/src/models/DBInterfaces.ts',definition)

console.log(definition)
}

main()

export default main