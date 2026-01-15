
// CONFIGURAÇÃO DO BANCO DE DADOS (AlwaysData)

/*const db = mysql.createConnection({
  host: 'mysql-albertocossa.alwaysdata.net',
  user: '430726',
  password: 'Acossa@824018',
  database: 'albertocossa_sistema',
  port:'3306',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.get("/clientes", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  res.json(rows);
});

app.listen(3000, () => console.log("Servidor rodando"));
*/

import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// LISTAR clientes
app.get("/clientes", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  res.json(rows);
});

// SALVAR cliente
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone } = req.body;
  await pool.query(
    "INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)",
    [nome, email, telefone]
  );
  res.json({ sucesso: true });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
