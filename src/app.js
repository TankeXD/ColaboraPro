import { randomUUID } from 'node:crypto';

const allowedStates = new Set(['Por hacer', 'En curso', 'Hecho']);

export function createAppState() {
  return { projects: [], tasks: [] };
}

export function createProject(state, { name, description = '' }) {
  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName || cleanName.length > 60) return { error: 'El nombre es obligatorio y debe tener hasta 60 caracteres.' };
  if (state.projects.some(p => p.name.toLowerCase() === cleanName.toLowerCase())) return { error: 'Ya existe un proyecto con ese nombre.' };
  const project = { id: randomUUID(), name: cleanName, description: String(description).trim(), createdAt: new Date().toISOString() };
  state.projects.push(project);
  return project;
}

export function createTask(state, { projectId, title, dueDate = null, assignee = null }) {
  if (!state.projects.some(p => p.id === projectId)) return { error: 'Proyecto no encontrado.' };
  const cleanTitle = typeof title === 'string' ? title.trim() : '';
  if (!cleanTitle || cleanTitle.length > 80) return { error: 'El título es obligatorio y debe tener hasta 80 caracteres.' };
  const task = { id: randomUUID(), projectId, title: cleanTitle, state: 'Por hacer', assignee, dueDate, createdAt: new Date().toISOString() };
  state.tasks.push(task);
  return task;
}

export function moveTask(state, taskId, newState) {
  if (!allowedStates.has(newState)) return { error: 'Estado inválido.' };
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return { error: 'Tarea no encontrada.' };
  task.state = newState;
  return task;
}

export function deadlineIndicator(task, today = new Date()) {
  if (task.state === 'Hecho' || !task.dueDate) return null;
  const due = new Date(task.dueDate + 'T00:00:00Z');
  const current = new Date(today.toISOString().slice(0, 10) + 'T00:00:00Z');
  const days = Math.ceil((due - current) / 86400000);
  if (days < 0) return 'rojo';
  if (days <= 2) return 'naranja';
  return null;
}
