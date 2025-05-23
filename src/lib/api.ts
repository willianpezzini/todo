const API_URL = 'http://localhost:4000';

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/task`);
  if (!res.ok) throw new Error(' Erro ao buscar a Tarefa');

  const json = await res.json();
  return json.data;
}

export async function createTask(data: {
  descricao: string;
  data: string;
  status: 'fazer' | 'fazendo' | 'finalizado';
}) {
  const res = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // if (!res.ok) throw new Error ('Erro ao Criar a Tarefa');

  // const taskCriada = await res.json();
  // return taskCriada;

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Resposta:', text);

  if(!res.ok) throw new Error("Erro ao criar a tarefa:" + text);
  return JSON.parse(text);
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error ('Erro ao Deletar a Tarefa');
  return res.json();
}