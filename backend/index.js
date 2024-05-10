import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./mvc/user/user.controller.js";
import connection from "./config.js";
import busboy from "connect-busboy";
import dataRouter from "./mvc/data/data.controller.js";
import excelRouter from "./mvc/excel/excel.controller.js";

const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  })
);

dotenv.config();
const port = process.env.PORT;

connection();

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.use("/auth", authRouter);

app.use("/api", dataRouter);

app.use("/excel", excelRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
