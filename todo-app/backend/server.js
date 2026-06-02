require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

async function ensureSchema() {
  await pool.query(`CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    done BOOLEAN DEFAULT false
  )`);
}

app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(result.rows);
});

app.post('/todos', async (req, res) => {
  const { task } = req.body;
  const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
  res.json(result.rows[0]);
});

app.put('/todos/:id', async (req, res) => {
  const { task, done } = req.body;
  const result = await pool.query(
    'UPDATE todos SET task=$1, done=$2 WHERE id=$3 RETURNING *',
    [task, done, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/todos/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id=$1', [req.params.id]);
  res.json({ message: 'Deleted' });
});

async function start() {
  const port = Number(process.env.PORT) || 3000;
  const deadline = Date.now() + 60_000;
  let attempt = 0;
  while (Date.now() < deadline) {
    try {
      await ensureSchema();
      app.listen(port, () => console.log(`Server running on port ${port}`));
      return;
    } catch (err) {
      attempt += 1;
      console.warn(`Database not ready (attempt ${attempt}): ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  console.error(
    'Could not reach PostgreSQL. In Docker, use `docker compose up` from the todo-app folder, ' +
      'or set DB_HOST to your database host (not localhost unless Postgres runs in the same container).'
  );
  process.exit(1);
}

start();
