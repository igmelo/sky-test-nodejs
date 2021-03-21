const express = require("express");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const DB = require("./database");
// Importando rotas
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/users");

mongoose.connect(DB.DATABASE_URL, DB.DB_CONFIG, (error) => {
  if (!error) {
    console.log("MongoDB Conectado");
  } else {
    console.log(`Erro ao conectar no MongoDB: ${error}`);
  }
});

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/user", userRoute);
app.use("*", (req, res) => {
  res.status(404).json({ mensagem: "mensagem de erro" });
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("Servidor rodando..."));
