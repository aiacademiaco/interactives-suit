# Nuxt 3 Minimal Starter

```bash
├── assets/                  # Recursos globales como imágenes y estilos.
│   ├── css/
│   ├── images/
│   └── fonts/
├── components/              # Componentes reutilizables.
│   ├── base/               # Componentes base globales.
│   ├── interactives/       # Componentes específicos para interactivos.
│   └── courses/            # Componentes específicos para cursos.
├── layouts/                # Diseños de aplicación.
├── middleware/             # Middleware de Nuxt.js.
├── pages/                  # Rutas y vistas de la aplicación.
│   ├── courses/
│   │   ├── _courseId/
│   │   │   ├── _interactiveId.vue   # Página interactiva específica dentro de un curso.
├── plugins/                # Plugins de Nuxt.js.
├── server/                 # Lógica de servidor (APIs, etc.)
│   ├── api/
│   │   ├── courses.js
│   │   └── interactives.js
├── static/                 # Archivos estáticos.
│   └── favicon.ico
└── store/                  # Almacenamiento Vuex si es utilizado.
```

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
