import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { employeeRouter } from "./routes/employee/employee.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo");
  return client;
}

export const client = await createConnection();

app.get("/api/v1/", (request, response) => {
  response.send("Hello 🌏 heroku");
});

app.use("/api/v1/employee", employeeRouter);

app.listen(PORT, () => console.log("Server started", PORT));
