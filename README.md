# ColaboraPro

Prototipo API sin dependencias externas, realizado como incremento técnico para la actividad de cierre de Gestión Ágil.

## Requisitos
Node.js 20+

## Uso
```bash
npm test
npm start
```
API local: `http://localhost:3000`

## Endpoints
- `GET /health`
- `GET/POST /projects` (POST: `{ "name": "...", "description": "..." }`)
- `GET/POST /tasks` (POST: `{ "projectId": "...", "title": "...", "dueDate": "YYYY-MM-DD", "assignee": "..." }`)
- `PATCH /tasks/:id/state` (body: `{ "state": "Por hacer|En curso|Hecho" }`)

## Alcance y limitaciones
La API usa almacenamiento en memoria, por lo que los datos se pierden al reiniciar. No es una aplicación desplegada ni una implementación completa de todas las historias del backlog. CI ejecuta pruebas automatizadas de lógica de dominio.
