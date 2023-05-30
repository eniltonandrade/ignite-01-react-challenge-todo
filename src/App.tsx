import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle, Clipboard } from "@phosphor-icons/react";
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { Task, TaskType } from "./components/Task";

import styles from './App.module.css';
import './global.css'



export function App() {
  const [tasks, setTasks] = useState([] as TaskType[]);
  const [newTask, setNewTask] = useState('')

  const tasksCompleted = tasks.filter(task => task.isCompleted === true).length
  const allTasksCount = tasks.length

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório')
  }

  function handleCompletionToogle(taskIdToUpdate: string) {
    const NewTasks = tasks.map(task => {
      if (task.id === taskIdToUpdate) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task
    })
    setTasks(NewTasks)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })
    setTasks(tasksWithoutDeletedOne)
  }

  function handleTaskCreation(event: FormEvent) {
    event.preventDefault();

    const task: TaskType = {
      id: uuidv4(),
      description: newTask,
      isCompleted: false
    }
    setTasks([...tasks, task]);
    setNewTask('');
  }
  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.taskform} onSubmit={handleTaskCreation}>
          <input
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            value={newTask}
            type="text"
            placeholder="Adicione uma nova tarefa"
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.taskList}>
          <div className={styles.tasksHeader}>
            <div className={styles.counter}>
              <strong>Tarefas criadas</strong>
              <span>{allTasksCount}</span>
            </div>
            <div className={styles.status}>
              <strong>Concluídas</strong>
              <span>{tasksCompleted} de {allTasksCount}</span>
            </div>
          </div>
          {
            tasks.length > 0 ?
              tasks.map(task => {
                return <Task task={task} key={task.id} onUpdateTask={handleCompletionToogle} onDeleteTask={deleteTask} />
              })
              :
              <div className={styles.emptyList}>
                <Clipboard size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
          }
        </div>
      </main>
    </>
  )
}
