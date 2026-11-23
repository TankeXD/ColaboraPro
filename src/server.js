import { createServer } from 'node:http';
import { createAppState, createProject, createTask, moveTask, deadlineIndicator } from './app.js';

const state = createAppState();
const server = createServer(async (req, res) => {
  const send = (code, body) => { res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); };
  if (req.method === 'GET' && req.url === '/health') return send(200, { status: 'ok' });
  let body = {};
  if (['POST','PATCH'].includes(req.method)) {
    try { body = await new Promise((resolve, reject) => { let data=''; req.on('data', chunk => data += chunk); req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); } }); }); }
    catch { return send(400, { error: 'JSON inválido.' }); }
  }
  if (req.method === 'POST' && req.url === '/projects') {
    const result = createProject(state, body); return send(result.error ? 400 : 201, result);
  }
  if (req.method === 'GET' && req.url === '/projects') return send(200, state.projects);
  if (req.method === 'POST' && req.url === '/tasks') {
    const result = createTask(state, body); return send(result.error ? 400 : 201, result);
  }
  if (req.method === 'GET' && req.url === '/tasks') return send(200, state.tasks.map(t => ({ ...t, deadline: deadlineIndicator(t) })));
  const match = req.url.match(/^\/tasks\/([^/]+)\/state$/);
  if (req.method === 'PATCH' && match) { const result = moveTask(state, match[1], body.state); return send(result.error ? 400 : 200, result); }
  return send(404, { error: 'Ruta no encontrada.' });
});
const port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log(`ColaboraPro API en http://localhost:${port}`));
