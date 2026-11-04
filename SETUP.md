# Guía de desarrollo

Documentación técnica para ejecutar, configurar y desplegar Buddy.

## Requisitos

- Node.js 18 o superior
- Un proyecto de [Supabase](https://supabase.com) (plan gratuito)
- Opcional: una clave de [Groq](https://console.groq.com/keys) para las sugerencias con IA

La app es HTML, CSS y JavaScript vanilla. No hay build ni dependencias de frontend.

## Estructura

```
.
├── index.html                  Shell de la aplicación
├── assets/
│   ├── styles.css              Hoja de estilos (tokens, componentes, temas)
│   └── app.js                  Lógica: estado, vistas, sync y sugerencias
├── sw.js                       Service worker (caché y offline)
├── manifest.webmanifest        Manifest PWA
├── supabase/
│   ├── schema.sql              Tablas, RLS y publicación realtime
│   └── functions/suggest/      Edge Function para la IA (Groq)
└── SETUP.md                    Esta guía
```

## Desarrollo local

```bash
git clone https://github.com/mariahts/GymDuo.git
cd GymDuo
npm start
```

`npm start` sirve el proyecto en `http://localhost:5173` con `serve`. Cualquier servidor estático funciona, pero el service worker necesita `http` o `https`: abrir `index.html` con `file://` desactiva la PWA.

Comprobación de sintaxis:

```bash
npm run check
```

## Configurar Supabase

1. Crea un proyecto en Supabase.
2. Abre **SQL Editor**, pega `supabase/schema.sql` y pulsa **Run**.
3. Copia la URL del proyecto y la clave pública (`anon` / publishable) en `assets/app.js`:

```js
const SB_URL = "https://<proyecto>.supabase.co";
const SB_KEY = "<clave-publica>";
```

El script crea:

| Tabla      | Contenido                                                        |
| ---------- | ---------------------------------------------------------------- |
| `spaces`   | Espacio compartido: `id` (código), `cfg` con perfiles y rutinas |
| `profiles` | Datos de cada miembro: `space_id`, `profile`, `data`             |

También activa Row Level Security con permisos para el rol `anon` y añade ambas tablas a la publicación `supabase_realtime`.

## Configurar la IA (opcional)

La clave de Groq vive en el servidor, nunca en el navegador.

**Desde el dashboard**

1. **Edge Functions → Create function**, nombre `suggest`.
2. Pega el contenido de `supabase/functions/suggest/index.ts`.
3. En **Secrets**, añade `GROQ_API_KEY`.
4. Despliega.

**Con la CLI**

```bash
supabase functions deploy suggest --project-ref <ref>
supabase secrets set GROQ_API_KEY=<clave>
```

La función recibe `{ exercise, day, space }` y devuelve hasta tres alternativas como `{ items: [{ nombre, razon }] }`. Sin la función desplegada, la app usa el catálogo local de sugerencias.

## Sugerencias locales e IA

- El catálogo local (`ALTS` en `assets/app.js`) cubre los grupos musculares habituales y no consume red.
- La IA tiene un límite de 8 consultas al día por dispositivo (`gd-ai-use`) y caché diaria por ejercicio (`gd-altcache`).
- Si se agota el límite o falla la petición, se muestran alternativas locales automáticamente.

## Despliegue

El repositorio se publica con GitHub Pages desde la rama `main`:

1. **Settings → Pages → Source**: rama `main`, carpeta `/ (root)`.
2. La app queda en `https://<usuario>.github.io/GymDuo/`.

Al cambiar `styles.css` o `app.js`, sube la versión de caché en `sw.js` (`rutina-v2` → `rutina-v3`) para que los usuarios reciban los archivos nuevos.

## Modelo de datos local

Todo se guarda en `localStorage` antes de sincronizarse:

| Clave           | Contenido                                        |
| --------------- | ------------------------------------------------ |
| `rutina-v1`     | Espacio principal (rutina, registros e historial) |
| `gd-s-<id>`     | Copia de cada espacio adicional                  |
| `gd-spaces`     | Índice de espacios                               |
| `gd-cur`        | Espacio activo                                   |
| `gd-ai-use`     | Contador diario de consultas a la IA             |
| `gd-altcache`   | Caché de sugerencias por ejercicio y día         |
| `gd-ask`        | Preferencia de sincronización automática         |
| `gd-skip`       | sessionStorage: omite el onboarding en la sesión |
