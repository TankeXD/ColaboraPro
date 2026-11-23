import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppState, createProject, createTask, moveTask, deadlineIndicator } from '../src/app.js';

test('project name is trimmed and duplicates are case-insensitive', () => {
  const s = createAppState();
  assert.equal(createProject(s, { name: ' Demo ' }).name, 'Demo');
  assert.ok(createProject(s, { name: 'demo' }).error);
});
test('task requires a project and valid title', () => {
  const s = createAppState();
  assert.ok(createTask(s, { projectId: 'missing', title: 'task' }).error);
  const p = createProject(s, { name: 'Demo' });
  assert.ok(createTask(s, { projectId: p.id, title: ' ' }).error);
});
test('task can transition only to valid states', () => {
  const s = createAppState(), p = createProject(s, { name: 'Demo' }), t = createTask(s, { projectId: p.id, title: 'Task' });
  assert.equal(moveTask(s, t.id, 'En curso').state, 'En curso');
  assert.ok(moveTask(s, t.id, 'invalid').error);
});
test('deadline indicator ignores done tasks and categorizes dates', () => {
  const today = new Date('2026-11-23T12:00:00Z');
  assert.equal(deadlineIndicator({ state:'Por hacer', dueDate:'2026-11-22' }, today), 'rojo');
  assert.equal(deadlineIndicator({ state:'En curso', dueDate:'2026-11-25' }, today), 'naranja');
  assert.equal(deadlineIndicator({ state:'Por hacer', dueDate:'2026-11-28' }, today), null);
  assert.equal(deadlineIndicator({ state:'Hecho', dueDate:'2026-11-22' }, today), null);
});
