'use client';

import { fetchTasks, deleteTask, createTask} from '@/lib/api';
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  descrição: string;
  data: string;
  status: 'fazer' | 'fazendo' | 'finalizado';
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border p-2 rounded flex justify-between">
            <span>{task.descrição}</span>
            <span>{task.data}</span>
            <span>{task.status}</span>
            <button 
              onClick={() => handleDelete(task.id)} className="text-red-500">
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => {
        createTask()}>Criar Tarefa</button>
    </main>
  );
}
