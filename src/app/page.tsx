'use client';

import { fetchTasks, deleteTask, createTask } from '@/lib/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task {
  id: number;
  descricao: string;
  data: string;
  status: 'fazer' | 'fazendo' | 'finalizado';
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    fetchTasks()
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch(err => console.error('Erro ao buscar Tarefas', err));
      setTasks([]);
  }, []);


  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(prev => prev ? prev.filter(task => task.id !== id) : []);
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>

      {tasks === null ? (
        <p>Carregando Tarefas...</p>
      ) : tasks.length === 0 ? (
        <h3>NENHUMA TAREFA CADASTRADA</h3>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="border p-2 rounded flex justify-between">
              <div>
                <p><strong>Descrição:</strong>{task.descricao}</p>
                <p><strong>Data:</strong>{task.data}</p>
                <p><strong>Status:</strong>{task.status}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link rel="stylesheet" href="/novo">
        Criar Tarefa
      </Link>
    </main>
  );
}
