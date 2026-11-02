# GymDuo

[![Ver en GitHub Pages](https://img.shields.io/badge/Ver%20en-GitHub%20Pages-4a3df0?style=for-the-badge)](https://mariahts.github.io/GymDuo/)

Una aplicación web progresiva (PWA) para llevar el registro de rutinas de gimnasio en pareja o de forma individual. Diseñada para usarse en móvil, con sincronización entre personas y seguimiento de progreso.

## Características

- **Modo dúo o individual** - Entrena solo o junto a tu pareja/grupo
- **Rutinas personalizables** - Crea, edita o borra días y ejercicios con series, repeticiones mínimas y máximas
- **Editor en Inicio** - La rutina se edita desde la pestaña Inicio con un botón "Editar", sin llenar los Ajustes
- **Cambio rápido de ejercicio** - Durante el entreno, el botón ↻ de cada ejercicio sugiere alternativas para el mismo grupo muscular (máquina ocupada, sin material, etc.)
- **Sugerencias con IA (opcional)** - Botón "Pedir a la IA" con límite diario y caché para no gastar consultas
- **Seguimiento de series** - Marca series completadas, registra peso y repeticiones, cuenta descanso entre series (90 segundos)
- **Sincronización entre personas** - Comparte un código para sincronizar rutinas y entrenos entre dos personas usando Supabase
- **Seguimiento de progreso** - Gráficas de volumen por semana, mejores marcas por ejercicio y cálculo de 1RM estimado
- **Rachas y metas** - Seguimiento de días consecutivos, semanas con racha y meta semanal configurable
- **Cierre de mes** - Genera un informe con gráficas para guardar o compartir
- **Modo oscuro/claro** - Se adapta al tema del sistema con opción de personalizar colores
- **PWA** - Instalable en móvil, funciona offline con caché
- **Sin registro obligatorio** - Funciona completamente en local, la sincronización es opcional
- **Empieza vacío** - Los espacios nuevos no traen ejercicios por defecto; hay un botón para cargar la rutina de ejemplo si quieres probarla

## Uso

Accede a la app en: [https://mariahts.github.io/GymDuo/](https://mariahts.github.io/GymDuo/)

### Primer uso

1. Al abrir por primera vez, el asistente te guiará para configurar tu perfil
2. Puedes crear un espacio **solo** o **acompañado** (dúo/grupo)
3. Si es acompañado, comparte el código generado con tu pareja para sincronizar
4. Tu rutina empieza vacía: añade tus días y ejercicios desde **Inicio → Mi rutina → Editar**
5. Si quieres ver una rutina ya montada, pulsa **Usar la rutina de ejemplo**

### Durante el entrenamiento

- Selecciona el día de tu rutina
- Para cada ejercicio, copia los datos de la última vez o introduce peso/repeticiones
- Marca cada serie con ✓ al completarla (se inicia el temporizador de descanso)
- Si una máquina está ocupada, toca el botón **↻** del ejercicio y elige una alternativa
- Al finalizar todas las series, puedes marcar la sesión como terminada
- Se guardan récords personales automáticamente

### Progreso

En la pestaña "Progreso" puedes ver:
- Estadísticas del mes (sesiones, series, volumen, récords)
- Volumen por semana
- Mejores marcas por ejercicio con evolución
- Opción para cerrar el mes y generar informe

## Tecnologías

- **Frontend**: HTML, CSS, JavaScript vanilla (sin frameworks)
- **Almacenamiento**: localStorage
- **Sincronización**: Supabase (Postgres + Realtime) con la clave pública `anon`
- **IA**: función Edge de Supabase que llama a Groq (la clave nunca llega al navegador)
- **PWA**: Service Worker para caché y funcionamiento offline
- **Diseño**: Responsive, optimizado para móvil

## Configurar la sincronización (Supabase)

La app ya apunta al proyecto de Supabase del repositorio, pero las tablas hay que crearlas una vez:

1. Entra en tu proyecto de [Supabase](https://supabase.com)
2. Abre **SQL Editor** y pega el contenido de [`supabase/schema.sql`](supabase/schema.sql)
3. Pulsa **Run**

Eso crea las tablas `spaces` y `profiles`, activa Row Level Security con permisos para la clave pública y habilita Realtime.

## Configurar la IA (opcional y gratis)

Los usuarios no necesitan pegar ninguna clave: la IA vive en una función Edge del servidor.

1. Crea una clave gratuita en [Groq](https://console.groq.com/keys)
2. En Supabase, abre **Edge Functions → Create function** y llámala `suggest`
3. Pega el código de [`supabase/functions/suggest/index.ts`](supabase/functions/suggest/index.ts)
4. En **Secrets**, añade `GROQ_API_KEY` con tu clave
5. Despliega la función

Sin este paso la app sigue funcionando: el botón ↻ usa sugerencias locales integradas, sin coste ni conexión.

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/mariahts/GymDuo.git

# Abrir en el navegador
cd GymDuo
# O servir con un servidor local
npx serve .
```

## Licencia

Este proyecto es de código abierto.
