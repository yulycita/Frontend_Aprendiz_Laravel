# Frontend Aprendiz

Interfaz en React (Vite) y Material UI para gestionar aprendices. Consume una API REST de Laravel.

## Requisitos
- Node.js 24 o superior
- Backend de Laravel corriendo en http://127.0.0.1:8000

## Instalación
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Estructura
- `src/service`: llamadas a la API con axios
- `src/componentes`: formulario y tabla
- `src/views`: vista principal con el estado y la lógica

## API
La URL base está en `src/service/aprendizService.js`.