const API_URL = 'http://localhost:4000';

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function createTask(data: string) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  return res.json();
}