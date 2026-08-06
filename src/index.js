import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import passport from "./utils/passport.js";

import transactionsRouter from "./routes/transactions.js";
import budgetsRouter from "./routes/budgets.js";
import summaryRouter from "./routes/summary.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.status(200).send("Budget API is alive and well.");
});

app.use("/api/transactions", transactionsRouter);
app.use("/api/budgets", budgetsRouter);
app.use("/api/summary", summaryRouter);

app.get("/success", (req, res) => {
  res.send("Success");
});

app.get("/fail", (req, res) => {
  res.send("Fail");
});

app.get("/test", (req, res) => {
  res.json({ message: "server is running" });
});

app.use((req, res) => {
  res.status(404).send("Endpoint cannot be found.");
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`Listening on port ${PORT}`);
});
