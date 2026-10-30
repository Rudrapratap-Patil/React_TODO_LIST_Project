
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [editId, setEditId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputTyping = (event) => {
    setInputValue(event.target.value)
    setErrorMessage('')
  }

  const handleAddTask = () => {
    const taskText = inputValue.trim()

    if (!taskText) {
      alert('Please enter a todo.')
      return
    }

    const normalizedTaskText = taskText.toLocaleLowerCase()
    const isDuplicate = tasks.some(
      (task) =>
        task.id !== editId &&
        task.text.trim().toLocaleLowerCase() === normalizedTaskText,
    )

    if (isDuplicate) {
      setErrorMessage('This task already exists.')
      return
    }

    if (editId !== null) {
      if (!window.confirm('Do you want to save the changes?')) return

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editId ? { ...task, text: taskText } : task
        )
      )
      setEditId(null)
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: Date.now(),
          text: taskText,
          completed: false,
          timestamp: new Date().toLocaleString(),
        },
      ])
    }

    setInputValue('')
  }

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  return (
    <main className="todo">
      <h1>My TODO LIST</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleAddTask()
        }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={handleInputTyping}
        />
        <button type="submit">
          {editId !== null ? 'Save' : 'Add task'}
        </button>
        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null)
              setInputValue('')
              setErrorMessage('')
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {errorMessage && <p role="alert">{errorMessage}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Tasks</th>
            <th>Is Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.text}</td>
              <td>{task.completed ? 'Yes' : 'No'}</td>
              <td>
                <button type="button" onClick={() => handleToggleTask(task.id)}>
                  Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditId(task.id)
                    setInputValue(task.text)
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTasks((currentTasks) =>
                      currentTasks.filter((t) => t.id !== task.id)
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default App