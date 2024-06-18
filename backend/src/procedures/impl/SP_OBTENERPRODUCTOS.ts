/*
 * This code was auto-generated by generator-mssql-types.
 * See https://github.com/jweyrich/generator-mssql-types for more information.
 * WARNING: If you change anything in this file it may be automatically overwriten!
 */

//import { Datasource, IProcedureResult, Procedure, SqlTypes } from '@internal/mssql-connector';
import { database } from '../../config/database';
import sql from 'mssql';

//export class SP_OBTENERPRODUCTOS {
   // readonly _repository: Datasource;

    //constructor(repository: Datasource) {
    //    this._repository = repository;
    //}

 export const execute = async(): Promise<sql.IProcedureResult<Result>> => {
       
    // const procedure = new Procedure<Result>('SP_OBTENERPRODUCTOS');
    var request = new sql.Request(database);
    //request.output('output_parameter', sql.VarChar(50));
    const recordsets = await request.execute<Result>('SP_OBTENERPRODUCTOS');
    console.log("RecordSet SP_OBTENERPRODUCTOS",recordsets)
    return recordsets
    //return await this._repository.execProcedure(procedure);

    }
//}


export type Result = {
    IdProducto: number; /* int */
    IdCategoria?: number; /* int */
    Nombre?: string; /* varchar(50) */
    Descripcion?: string; /* varchar(50) */
    Stock: number; /* int */
    PrecioCompra?: number; /* decimal(10, 2) */
    PrecioVenta?: number; /* decimal(10, 2) */
    Estado?: boolean; /* bit */
    FechaRegistro?: Date; /* datetime */
    CategoriaDescripcion?: string; /* varchar(50) */
    codigoProducto?: string; /* varchar(50) */
} | null;
