import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = () => fetch(`${API}/todos`).then(r => r.json()).then(setTodos);

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(`${API}/todos`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    setTask(''); fetchTodos();
  };

  const toggleDone = async (todo) => {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: todo.task, done: !todo.done })
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>To-Do List</h1>
      <input value={task} onChange={e => setTask(e.target.value)}
        placeholder="New task..." style={{ width: '70%', padding: 8 }} />
      <button onClick={addTodo} style={{ padding: 8, marginLeft: 8 }}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            <span
              onClick={() => toggleDone(todo)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;