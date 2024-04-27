/*
 * This code was auto-generated by generator-mssql-types.
 * See https://github.com/jweyrich/generator-mssql-types for more information.
 * WARNING: If you change anything in this file it may be automatically overwriten!
 */

//import { Datasource, IProcedureResult, Procedure, SqlTypes } from '@internal/mssql-connector';
import { database } from '../../config/database';
import sql from 'mssql';

//export class SP_OBTENERDETALLESCOMPRA {
   // readonly _repository: Datasource;

    //constructor(repository: Datasource) {
    //    this._repository = repository;
    //}

 export const execute = async(params: Params): Promise<sql.IProcedureResult<Result>> => {
       
    // const procedure = new Procedure<Result>('SP_OBTENERDETALLESCOMPRA');
    var request = new sql.Request(database);
        if (params.IdCompra != null) {
            request.input('IdCompra', sql.Int(), params.IdCompra);
            // procedure.addParameter('IdCompra', params.IdCompra, SqlTypes.Int());
        }
    //request.output('output_parameter', sql.VarChar(50));
    const recordsets = await request.execute<Result>('SP_OBTENERDETALLESCOMPRA');
    console.log("RecordSet SP_OBTENERDETALLESCOMPRA",recordsets)
    return recordsets
    //return await this._repository.execProcedure(procedure);

    }
//}

/*
 * All attributes below are optional because MSSQL does not give us the correct information.
 * We'd need to write a custom T-SQL parser to get this piece of information.
 */
export type Params = {
    IdCompra?: number; /* int */
};

export type Result = {
    IdDetalleCompra: number; /* int */
    IdProducto?: number; /* int */
    PrecioCompra?: number; /* decimal(10, 2) */
    PrecioVenta?: number; /* decimal(10, 2) */
    Cantidad?: number; /* int */
    MontoTotal?: number; /* decimal(10, 2) */
    FechaRegistro?: Date; /* datetime */
    NombreProducto?: string; /* varchar(50) */
} | null;