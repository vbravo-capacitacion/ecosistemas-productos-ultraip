# Danaide Learning 

Microexperiencia asincrónica para el cierre de capacitaciones de productos Danaide / Suite Ultra IP. El recorrido identifica a la persona por nombre, apellido y área, presenta las familias de productos, ofrece un quiz breve y recoge feedback.

## Stack

- React 19, TanStack Start y Vite 8
- Tailwind CSS 4
- Supabase para la integración de autenticación del servidor
- Bun como gestor de paquetes (`bun.lock`)

El estado de la experiencia se conserva en `sessionStorage` durante la sesión del navegador.  

## Desarrollo

Requiere Node.js y Bun.

```sh
bun install
bun run dev
```

Comandos disponibles:

```sh
bun run test
bun run lint
bun run build
bun run preview
```

La integración Supabase utiliza `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_PROJECT_ID`, además de sus equivalentes `VITE_` que consume el cliente. Configurá los valores en el entorno local; no agregues credenciales privadas al repositorio.

## Estructura

```text
src/
  components/       Componentes de la experiencia, formularios y layout
  hooks/            Estado de la sesión del participante
  integrations/     Integración Supabase activa
  lib/              Contenido y manejo de errores
  routes/           Rutas file-based del recorrido
  test/             Pruebas de rutas
  routeTree.gen.ts  Árbol de rutas generado; no editar manualmente
```

Rutas del flujo: `/` (identificación), `/experiencia`, `/quiz`, `/feedback` y `/gracias`.
