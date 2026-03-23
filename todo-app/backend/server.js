const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Creating table
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`);

// GET all todos
app.get('/todos', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(rows);
});

// POST new todo
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  const [result] = await pool.query(
    'INSERT INTO todos (task) VALUES (?)', [task]
  );
  res.json({ id: result.insertId, task, completed: false });
});

// PUT update todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  await pool.query(
    'UPDATE todos SET task=?, completed=? WHERE id=?',
    [task, completed, id]
  );
  res.json({ id, task, completed });
});

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id=?', [id]);
  res.json({ message: 'Deleted' });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});