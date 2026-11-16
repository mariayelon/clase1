import { useState } from 'react'
import './App.css'

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'active', label: 'Pendientes' },
  { id: 'completed', label: 'Completadas' },
]

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const remainingTasks = tasks.filter((task) => !task.completed).length
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()

    if (!title) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    setNewTask('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <main className="todo-app">
      <header className="page-header">
        <span className="eyebrow">UN PASO A LA VEZ</span>
        <h1>Tu día, en orden.</h1>
        <p>Organiza tus pendientes y celebra cada avance.</p>
      </header>

      <section className="todo-card" aria-label="Lista de tareas">
        <form className="task-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="new-task">
            Nueva tarea
          </label>
          <input
            id="new-task"
            type="text"
            placeholder="¿Qué necesitas hacer?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            maxLength={120}
          />
          <button type="submit" disabled={!newTask.trim()}>
            <span aria-hidden="true">+</span>
            Añadir
          </button>
        </form>

        <div className="list-toolbar">
          <p className="task-count" aria-live="polite">
            <strong>{remainingTasks}</strong>{' '}
            {remainingTasks === 1 ? 'tarea pendiente' : 'tareas pendientes'}
          </p>
          <div className="filters" aria-label="Filtrar tareas">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? 'filter active' : 'filter'}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {visibleTasks.length > 0 ? (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="custom-checkbox" aria-hidden="true" />
                  <span
                    className={task.completed ? 'task-title completed' : 'task-title'}
                  >
                    {task.title}
                  </span>
                </label>
                <button
                  type="button"
                  className="delete-task"
                  aria-label={`Eliminar ${task.title}`}
                  onClick={() => deleteTask(task.id)}
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 10h-7L6.1 6m2.4 3v4m3-4v4" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              {filter === 'completed' ? '✓' : '✳'}
            </span>
            <h2>
              {tasks.length === 0
                ? 'Tu lista está despejada'
                : filter === 'active'
                  ? 'No tienes tareas pendientes'
                  : 'Aún no has completado tareas'}
            </h2>
            <p>
              {tasks.length === 0
                ? 'Añade una tarea y empieza a organizar tu día.'
                : 'Cuando haya tareas aquí, las verás en esta lista.'}
            </p>
          </div>
        )}

        {tasks.length > 0 && (
          <footer className="list-footer">
            <span>
              {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} en total
            </span>
            <span>Pequeños pasos, grandes logros.</span>
          </footer>
        )}
      </section>
      <p className="page-note">Hecho con calma, una tarea a la vez.</p>
    </main>
  )
}

export default App
