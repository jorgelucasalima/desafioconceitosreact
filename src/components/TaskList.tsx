import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    
    
    if (!newTaskTitle) return; // verifica se é vazia a state de newTaskTitle

    // Objeto para guardar o id criado de forma aleatoria e o title e o iscomplete
    const novaTask = {
      id: Math.random(),
      title:  newTaskTitle,
      isComplete: false,
    }

    setTasks(dadosAntigos => [...dadosAntigos, novaTask])
    setNewTaskTitle('')



  }

  function handleToggleTaskCompletion(id: number) {
    
    //verifica nas task se tem alguma em false e depois realiza a troca para true

    const checkTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task)

    setTasks(checkTasks)
  }

  function handleRemoveTask(id: number) {
    const rmTasks = tasks.filter(task => task.id != id);
    setTasks(rmTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}