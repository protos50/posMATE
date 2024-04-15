import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/authRouter";
import clientesRouter from "./routes/clientesRouter";
 
 

dotenv.config();

 
// if (!db.connected) {
//   database
//     .connect()
//     .then((asd:any) => {
//       console.log(asd)
//       console.log("Connected to database");
//     })
//     .catch((err:any) => {
//       console.log("Error connecting to database", err);
//     });
// }


const app: express.Application = express();
//use json
app.use(express.json());

const port = process.env.PORT;

app.use("/auth", authRouter);
app.use("/clientes", clientesRouter);

app.get("/", (_req: express.Request, _res: express.Response) => {
  _res.send("Hola");
});

// Server setup
app.listen(port, () => {
  console.log(`POSMATE API running on
		http://localhost:${port}/`);
});
