# Buddy

[![Probar la app](https://img.shields.io/badge/Probar%20la%20app-4a3df0?style=for-the-badge)](https://mariahts.github.io/GymDuo/)

Buddy es una aplicación web progresiva (PWA) para registrar entrenamientos de fuerza y compartir la rutina con quienes entrenan al lado. Sirve para entrenar solo, en dúo, trío o grupo, y también para acompañar, hacer de spotter o supervisar la sesión de otra persona.

## Para quién

- **Entrenar solo** — rutina y progreso propios, sin depender de nadie.
- **Entrenar en grupo** — dúo, trío o equipo; cada persona mantiene su propio registro dentro del mismo espacio.
- **Acompañar y spotear** — apuntar series y cuidar la técnica de quien entrena.
- **Guiar (coach o familia)** — supervisar la sesión de otra persona sin mezclar sus datos con los propios.

## Funcionalidades

### Rutina
- Editor de días y ejercicios con series, repeticiones mínimas y máximas.
- Rutina propia por espacio; cada grupo conserva la suya.
- Empieza vacía, con opción de cargar una rutina de ejemplo.
- Cambio rápido de ejercicio: alternativas para el mismo grupo muscular si la máquina está ocupada o no hay material.
- Sugerencias con IA opcional, con límite diario y caché para no gastar consultas.

### Entrenamiento
- Registro de peso y repeticiones por serie, con copia de la última sesión.
- Descanso automático entre series y aviso al terminar.
- Récords personales y 1RM estimado.
- Racha semanal: cuenta cuando se alcanza la meta de días, no exige entrenar todos los días.
- Un fueguito por cada día entrenado de la semana.

### Progreso
- Volumen semanal y mensual.
- Mejor serie por ejercicio y evolución de la fuerza estimada.
- Estadísticas privadas de cada persona, aunque el espacio sea compartido.
- Informe mensual listo para guardar o compartir.

### Compartido
- Varios espacios separados: solo, dúo, trío o grupo.
- Código o enlace para unirse al grupo; la configuración se carga al abrirlo.
- Sincronización opcional; la app funciona igual sin conexión y sin cuenta.
- Cada persona apunta sus series; también se pueden apuntar las de quien entrena sin móvil.

### App
- Instalable en iOS y Android, con funcionamiento offline.
- Tema claro y oscuro, acento por perfil y colores adaptados.
- Sin registro obligatorio y sin nombres visibles fuera del entrenamiento.
- Pantalla inicial de bienvenida con días por semana y objetivo.
- Frase motivadora del día y distintivo al completar el entreno o la meta semanal.

## Cómo se usa

1. **Bienvenida** — elegir entrenar solo o en grupo, días por semana y objetivo. Se guarda solo.
2. **Rutina** — crearla desde cero o cargar la de ejemplo.
3. **Entrenar** — apuntar peso y reps, descansar entre series y sustituir ejercicios si hace falta.
4. **Progreso** — revisar volumen, mejores marcas y evolución.

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | HTML, CSS y JavaScript vanilla |
| Almacenamiento | localStorage |
| Sincronización | Supabase (Postgres + Realtime) |
| IA | Edge Function de Supabase con Groq |
| PWA | Service Worker, manifest e iconos |
| Despliegue | GitHub Pages |

## Estructura

```
index.html                      Shell de la app
assets/styles.css               Sistema visual y estilos
assets/app.js                   Lógica de la aplicación
sw.js                           Service Worker
manifest.webmanifest            Metadatos PWA
supabase/schema.sql             Tablas y políticas de sincronización
supabase/functions/suggest/     Edge Function de sugerencias con IA
SETUP.md                        Configuración técnica y despliegue
```

## Desarrollo

```bash
npm start        # servidor local
npm run check    # comprobación de sintaxis
```

La configuración de Supabase, la función de IA y el despliegue están detallados en [SETUP.md](SETUP.md).

## Arquitectura

Aplicación de una sola página sin frameworks. El estado vive en localStorage y se sincroniza por espacios mediante Supabase; la interfaz se repinta desde un único `render()`. Cada espacio guarda rutina, registros e historial, y la sincronización es opcional: sin conexión todo sigue funcionando en local.

## Licencia

MIT.
