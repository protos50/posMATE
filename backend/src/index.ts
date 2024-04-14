import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/authRouter';
dotenv.config();

const app: express.Application = express();
//use json
app.use(express.json());
 
const port = process.env.PORT;

app.use('/auth', authRouter);

app.get('/', (_req: express.Request, _res: express.Response) => {
  _res.send('Hola');
});

// Server setup
app.listen(port, () => {
  console.log(`POSMATE API running on
		http://localhost:${port}/`);
});
