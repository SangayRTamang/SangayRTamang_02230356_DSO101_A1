import { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')

  const fetchTodos = () => axios.get(`${API}/todos`).then(r => setTodos(r.data))

  useEffect(() => { fetchTodos() }, [])

  const addTodo = async () => {
    if (!task.trim()) return
    await axios.post(`${API}/todos`, { task })
    setTask(''); fetchTodos()
  }

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/todos/${todo.id}`, { task: todo.task, completed: !todo.completed })
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`)
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>To-Do List</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={task} onChange={e => setTask(e.target.value)}
          placeholder="New task..." style={{ flex: 1, padding: 8 }} />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      <ul style={{ marginTop: 20, padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center',
            gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App