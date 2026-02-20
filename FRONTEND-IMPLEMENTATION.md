# 🎬 YouGlish Reels - Frontend

Aplicación web tipo TikTok para aprender idiomas con videos de YouGlish.

## 🚀 Características Implementadas

### ✅ Arquitectura
- **Angular 18** con Standalone Components
- **Clean Architecture** con separación de responsabilidades
- **Signals** para estado reactivo
- **Lazy Loading** para todas las rutas
- **OnPush Change Detection** optimizado

### ✅ Funcionalidades

#### 🔐 Autenticación
- Login con JWT
- Registro de usuarios
- Auth Guard para protección de rutas
- HTTP Interceptor para tokens
- Persistencia en localStorage

#### 📚 Gestión de Frases
- CRUD completo de palabras/frases
- Activar/Desactivar frases
- Filtrado por idioma y acento
- Visualización de estadísticas

#### 🎥 Feed Tipo TikTok
- **Scroll vertical infinito** (como TikTok)
- **Swipe gestures** en mobile
- **Preload inteligente** del siguiente video
- **Integración YouGlish Widget**
- **Controles overlay**:
  - Toggle subtítulos
  - Navegación a gestión de frases
  - Skip al siguiente video
- **Atajos de teclado**:
  - `↓` / `Space`: Siguiente video
  - `S`: Toggle subtítulos

### 🎨 UI/UX
- Diseño moderno tipo TikTok
- Fullscreen vertical
- Animaciones suaves
- Responsive design
- Loading states
- Error handling

## 📁 Estructura del Proyecto

```
src/app/
├── core/                      # Servicios core y lógica de negocio
│   ├── auth/                  # Autenticación
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── auth.interceptor.ts
│   └── api/                   # Servicios de API
│       ├── feed-api.service.ts
│       └── phrase-api.service.ts
│
├── features/                  # Features modulares
│   ├── auth/
│   │   ├── login/            # Componente de login
│   │   └── register/         # Componente de registro
│   ├── feed/                 # 🔥 FEED PRINCIPAL (TikTok-like)
│   │   ├── feed.component.ts
│   │   ├── feed.component.html
│   │   └── feed.component.scss
│   └── phrases/
│       └── phrase-list/      # Gestión de frases
│
├── shared/
│   └── models/
│       └── types.ts          # Interfaces TypeScript
│
├── app.routes.ts             # Configuración de rutas
└── app.config.ts             # Configuración de app
```

## 🛠️ Setup & Instalación

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Configurar Environment

El archivo ya está creado en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 3. Iniciar Desarrollo

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

## 🔌 Integración con Backend

El frontend está configurado para conectarse con el backend en:
- **Development**: `http://localhost:8080/api`
- **Production**: Configurar en `environment.prod.ts`

### Endpoints Utilizados

#### Auth
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login

#### Phrases
- `GET /api/phrases` - Listar frases del usuario
- `POST /api/phrases` - Crear frase
- `PUT /api/phrases/{id}` - Actualizar frase
- `DELETE /api/phrases/{id}` - Eliminar frase

#### Feed
- `GET /api/feed/next` - Obtener siguiente video
- `GET /api/feed/stats` - Estadísticas del usuario
- `POST /api/feed/clean-history` - Limpiar historial

## 🎯 Flujo de Usuario

1. **Registro/Login** → Usuario se autentica
2. **Agregar Frases** → En `/phrases` agrega palabras/frases a aprender
3. **Ver Feed** → En `/feed` disfruta videos infinitos tipo TikTok
4. **Scroll/Swipe** → Cada scroll carga un nuevo video random

## 📱 Gestos Soportados

- **Swipe Up** (Mobile): Siguiente video
- **Scroll Down** (Desktop): Siguiente video
- **Arrow Down**: Siguiente video
- **Spacebar**: Siguiente video
- **S Key**: Toggle subtítulos

## 🎨 Componentes Principales

### FeedComponent (Estrella 🌟)
El componente más importante - Feed tipo TikTok:
- Fullscreen vertical
- Preload del siguiente video
- Integración YouGlish Widget
- Gestures y keyboard shortcuts
- Transiciones suaves

### PhraseListComponent
Gestión completa de frases:
- CRUD operations
- Filtrado por estado
- Visualización de stats
- Formulario inline

### Auth Components
- Login y Register con validación
- Error handling
- Loading states

## 🔧 Optimizaciones

### Performance
- ✅ Lazy loading de rutas
- ✅ OnPush change detection
- ✅ Preload siguiente video
- ✅ Signals para estado reactivo
- ✅ Tree-shakeable providers

### UX
- ✅ Loading spinners
- ✅ Error messages claros
- ✅ Transiciones suaves
- ✅ Responsive design
- ✅ Keyboard shortcuts

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en `dist/frontend/browser/`

## 📝 Comandos Útiles

```bash
# Desarrollo
npm start

# Build
npm run build

# Tests
npm test

# Linting (si está configurado)
ng lint
```

## 🔐 Seguridad

- ✅ JWT token en headers
- ✅ Auth guards en rutas protegidas
- ✅ HTTP interceptor automático
- ✅ Validación de formularios
- ✅ Error handling robusto

## 📚 Tecnologías

- **Angular 18** (Standalone Components)
- **TypeScript 5.4**
- **RxJS 7.8**
- **SCSS** para estilos
- **YouGlish Widget API**

## 🎯 Próximos Pasos

### Features Pendientes
- [ ] Virtual scroll para mejor performance
- [ ] Cache de videos
- [ ] Modo offline
- [ ] Estadísticas avanzadas
- [ ] Compartir videos
- [ ] Sistema de favoritos
- [ ] Notificaciones

### Mejoras UI/UX
- [ ] Dark/Light mode toggle
- [ ] Animaciones más elaboradas
- [ ] Efectos de transición entre videos
- [ ] Tutorial interactivo (onboarding)

## 🐛 Troubleshooting

### El backend no responde
Verificar que el backend esté corriendo en `http://localhost:8080`

### YouGlish Widget no carga
Verificar que el script se haya cargado correctamente en el navegador

### Errores de CORS
Configurar CORS en el backend Spring Boot

## 👨‍💻 Desarrollo

Para agregar nuevas features:

1. Crear componente en `features/`
2. Agregar ruta en `app.routes.ts`
3. Crear servicio API si es necesario en `core/api/`
4. Actualizar tipos en `shared/models/types.ts`

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el repositorio principal.

---

**Status**: ✅ **COMPLETAMENTE IMPLEMENTADO**

El frontend está 100% funcional y listo para usarse con el backend.

