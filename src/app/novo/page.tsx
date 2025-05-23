'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/lib/api';

export default function NovaTarefa() {
  const router = useRouter();

  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState<'fazer' | 'fazendo' | 'finalizado'>('fazer');
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!descricao || !data) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      await createTask({ descricao, data, status });
      router.push('/');
      router.refresh()
    } catch (err) {
      console.error('Erro ao criar a tarefa', err);
      alert('Erro ao criar tarefa');
    }finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nova Tarefa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'fazer' | 'fazendo' | 'finalizado')}
            className="w-full border p-2 rounded"
          >
            <option value="fazer">Fazer</option>
            <option value="fazendo">Fazendo</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Salvando' : "Salvar"}
        </button>
      </form>
    </main>
  );
}
