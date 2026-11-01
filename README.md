# GymDuo

[![Ver en GitHub Pages](https://img.shields.io/badge/Ver%20en-GitHub%20Pages-4a3df0?style=for-the-badge)](https://mariahts.github.io/GymDuo/)

Una aplicación web progresiva (PWA) para llevar el registro de rutinas de gimnasio en pareja o de forma individual. Diseñada para usarse en móvil, con sincronización entre personas y seguimiento de progreso.

## Características

- **Modo dúo o individual** - Entrena solo o junto a tu pareja/grupo
- **Rutinas personalizables** - Crea, edita o borra días y ejercicios con series, repeticiones mínimas y máximas
- **Seguimiento de series** - Marca series completadas, registra peso y repeticiones, cuenta descanso entre series (90 segundos)
- **Sincronización entre personas** - Comparte un código para sincronizar rutinas y entrenos entre dos personas usando Firebase
- **Seguimiento de progreso** - Gráficas de volumen por semana, mejores marcas por ejercicio y cálculo de 1RM estimado
- **Rachas y metas** - Seguimiento de días consecutivos, semanas con racha y meta semanal configurable
- **Cierre de mes** - Genera un informe con gráficas para guardar o compartir
- **Modo oscuro/claro** - Se adapta al tema del sistema con opción de personalizar colores
- **PWA** - Instalable en móvil, funciona offline con caché
- **Sin registro obligatorio** - Funciona completamente en local, la sincronización es opcional

## Uso

Accede a la app en: [https://mariahts.github.io/GymDuo/](https://mariahts.github.io/GymDuo/)

### Primer uso

1. Al abrir por primera vez, el asistente te guiará para configurar tu perfil
2. Puedes crear un espacio **solo** o **acompañado** (dúo/grupo)
3. Si es acompañado, comparte el código generado con tu pareja para sincronizar

### Durante el entrenamiento

- Selecciona el día de tu rutina
- Para cada ejercicio, copia los datos de la última vez o introduce peso/repeticiones
- Marca cada serie con ✓ al completarla (se inicia el temporizador de descanso)
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
- **Sincronización**: Firebase Firestore + Firebase Auth (anónimo)
- **PWA**: Service Worker para caché y funcionamiento offline
- **Diseño**: Responsive, optimizado para móvil

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/mariahts/GymDuo.git

# Abrir index.html en el navegador
cd GymDuo
# O servir con un servidor local
npx serve .
```

## Licencia

Este proyecto es de código abierto.
