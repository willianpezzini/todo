'use client';

import { useState } from 'react';
import { createTask } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title });
    router.push('/');
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Nova Tarefa</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite a tarefa"
          className="border p-2 rounded w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Criar
        </button>
      </form>
    </main>
  );
}
