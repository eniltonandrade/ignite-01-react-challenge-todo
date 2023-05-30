import { Trash } from "@phosphor-icons/react";
import styles from './Task.module.css';

export interface TaskType {
    id: string,
    description: string;
    isCompleted: boolean;

}

interface TaskProps {
    task: TaskType
    onUpdateTask: (id: string) => void
    onDeleteTask: (id: string) => void
}

export function Task({ task, onUpdateTask, onDeleteTask }: TaskProps) {
    function handleCompleteTask() {
        onUpdateTask(task.id)
    }

    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

    return (
        <article className={styles.task}>
            <input type="checkbox" name="" checked={task.isCompleted} onChange={handleCompleteTask} />
            <p>{task.description}</p>
            <button title="Deletar Tarefa" onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>

        </article>
    )
}
