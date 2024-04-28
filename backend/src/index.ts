import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/authRouter";
import clientesRouter from "./routes/clientesRouter";
import usuariosRouter from "./routes/usuariosRouter";
import { database } from "./config/database";

dotenv.config();

function checkDBConnection() {
  if (!database.connected) {
    console.log("Connecting to database...");
    database
      .connect()
      .then((conn: any) => {

        console.log(`Connected to database ${conn.config.database} on server ${conn.config.server}:${conn.config.port}`);
      })
      .catch((err: any) => {
        console.log("Error connecting to database", err.message);
      });
  }
}

checkDBConnection();

setInterval(() => {
  checkDBConnection();
}, 10000);

const app: express.Application = express();
//use json
app.use(express.json());

const port = process.env.PORT;

app.use("/auth", authRouter);
app.use("/clientes", clientesRouter);
app.use("/usuarios", usuariosRouter);

app.get("/", (_req: express.Request, _res: express.Response) => {
  _res.send("Hola");
});

// Server setup
app.listen(port, () => {
  console.log(`POSMATE API running on
		http://localhost:${port}/`);
});
