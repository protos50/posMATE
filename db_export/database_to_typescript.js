 
//const Client = require('@rmp135/sql-ts').Client
import { Client } from '@rmp135/sql-ts' 
 
 import fs from 'fs'
const config = {
  "client": "mssql",
  "connection": {
    "host": "localhost",
    "user": "sa",
    "password": "Password12345",
    "database": "DB_posmate"
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