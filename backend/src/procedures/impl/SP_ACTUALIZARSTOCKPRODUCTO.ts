/*
 * This code was auto-generated by generator-mssql-types.
 * See https://github.com/jweyrich/generator-mssql-types for more information.
 * WARNING: If you change anything in this file it may be automatically overwriten!
 */

//import { Datasource, IProcedureResult, Procedure, SqlTypes } from '@internal/mssql-connector';
import { database } from '../../config/database';
import sql from 'mssql';

//export class SP_ACTUALIZARSTOCKPRODUCTO {
   // readonly _repository: Datasource;

    //constructor(repository: Datasource) {
    //    this._repository = repository;
    //}

 export const execute = async(params: Params): Promise<sql.IProcedureResult<Result>> => {
       
    // const procedure = new Procedure<Result>('SP_ACTUALIZARSTOCKPRODUCTO');
    var request = new sql.Request(database);
        if (params.ProductoId != null) {
            request.input('ProductoId', sql.Int(), params.ProductoId);
            // procedure.addParameter('ProductoId', params.ProductoId, SqlTypes.Int());
        }
        if (params.Cantidad != null) {
            request.input('Cantidad', sql.Int(), params.Cantidad);
            // procedure.addParameter('Cantidad', params.Cantidad, SqlTypes.Int());
        }
    //request.output('output_parameter', sql.VarChar(50));
    const recordsets = await request.execute<Result>('SP_ACTUALIZARSTOCKPRODUCTO');
    console.log("RecordSet SP_ACTUALIZARSTOCKPRODUCTO",recordsets)
    return recordsets
    //return await this._repository.execProcedure(procedure);

    }
//}

/*
 * All attributes below are optional because MSSQL does not give us the correct information.
 * We'd need to write a custom T-SQL parser to get this piece of information.
 */
export type Params = {
    ProductoId?: number; /* int */
    Cantidad?: number; /* int */
};

export type Result = void;