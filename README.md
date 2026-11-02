# GymDuo

[![Demo](https://img.shields.io/badge/Probar%20la%20app-4a3df0?style=for-the-badge)](https://mariahts.github.io/GymDuo/)

PWA para registrar tus entrenamientos de fuerza y llevar la rutina compartida con tu compañero/a de gym.

Funciona en el móvil como una app (se puede instalar), guarda los datos en el propio dispositivo y, si quieres, sincroniza la rutina y los entrenos con otra persona en tiempo real.

## Funcionalidades

**Rutina**
- Crea tus días de entrenamiento y añade ejercicios con series, repeticiones mínimas y máximas.
- Edita todo desde Inicio, sin pasar por los ajustes.
- Cada espacio empieza vacío, con una rutina de ejemplo disponible si prefieres partir de una base.

**Entrenamiento**
- Marca cada serie al completarla y registra peso y repeticiones.
- Temporizador de descanso integrado.
- Botón ↻ para cambiar un ejercicio al momento si la máquina está ocupada, sin salir de la sesión.
- Alternativas sugeridas según el grupo muscular, con versión local y versión generada por IA (con límite diario y caché para no gastar consultas).
- Copia los datos de la última sesión para no repetir el cálculo.

**Progreso**
- Volumen por semana, mejores marcas por ejercicio y 1RM estimado.
- Rachas de entrenamiento y meta semanal.
- Cierre de mes con informe listo para guardar o compartir.

**Compartido**
- Espacios individuales o en pareja/grupo.
- Sincronización de rutina y registros mediante un código, con actualizaciones en tiempo real.
- Sin registro obligatorio: la app funciona entera en local si no quieres sincronizar.

**App**
- Instalable en iOS y Android.
- Funciona sin conexión gracias al service worker.
- Tema claro/oscuro y diseño pensado para usarse con una mano en el gym.

## Cómo se usa

1. Entra en la [demo](https://mariahts.github.io/GymDuo/) e instálala desde el navegador si quieres tenerla a mano.
2. Crea tu rutina desde **Inicio → Mi rutina → Editar**.
3. Durante el entreno, abre el día que toca, registra las series y deja que la app lleve el descanso y los récords.
4. Consulta **Progreso** para ver la evolución del mes.

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | HTML, CSS y JavaScript vanilla, sin frameworks |
| Persistencia | localStorage |
| Sincronización | Supabase (Postgres + Realtime) |
| IA | Supabase Edge Functions + Groq |
| Distribución | PWA con service worker, desplegada en GitHub Pages |

## Arquitectura

- Aplicación completamente cliente: un único documento HTML con la lógica, el estilo y el estado, sin paso de build.
- Sincronización opcional basada en un identificador de espacio compartido; los cambios se propagan por Realtime y se aplican solo si son más recientes que el estado local, lo que permite entrenar sin conexión y reconciliar al volver.
- La generación de alternativas ocurre en el servidor: el cliente nunca maneja claves de API. Si la función no está disponible, la app recurre a un catálogo local de ejercicios.
- Caché por ejercicio y límite diario de consultas para mantener el coste de la IA bajo control.

## Licencia

Este proyecto es de código abierto.
