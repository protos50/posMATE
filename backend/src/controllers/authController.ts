import { Request, Response } from 'express';
import { database } from '../config/database';

export const getPerformance = async (req: Request, res: Response) => {
  try {
    if (!database.connected) {
      await database.connect();
    }

    const result = await database.query('SELECT TOP 5 * FROM Cliente');
    //await database.close();

   res.setHeader('Content-Type', 'application/json').json({
      message: 'Lista de usuarios ',
      result: result.recordset,
    });
  } catch (error) {
    res.json(error);
  }
};
