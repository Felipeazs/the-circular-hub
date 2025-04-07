/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutRegistroImport } from './routes/_layout/registro'
import { Route as LayoutLoginImport } from './routes/_layout/login'
import { Route as LayoutAuthImport } from './routes/_layout/_auth'
import { Route as LayoutPasswordResetImport } from './routes/_layout/password/reset'
import { Route as LayoutPasswordForgotImport } from './routes/_layout/password/forgot'
import { Route as LayoutAuthUsuarioImport } from './routes/_layout/_auth/_usuario'
import { Route as LayoutAuthEvaluacionIndexImport } from './routes/_layout/_auth/evaluacion/index'
import { Route as LayoutAuthUsuarioDashboardImport } from './routes/_layout/_auth/_usuario/dashboard'
import { Route as LayoutAuthUsuarioAjustesImport } from './routes/_layout/_auth/_usuario/ajustes'
import { Route as LayoutAuthUsuarioResultadosIndexImport } from './routes/_layout/_auth/_usuario/resultados/index'
import { Route as LayoutAuthUsuarioResultadosIdImport } from './routes/_layout/_auth/_usuario/resultados/$id'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutRegistroRoute = LayoutRegistroImport.update({
  id: '/registro',
  path: '/registro',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLoginRoute = LayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthRoute = LayoutAuthImport.update({
  id: '/_auth',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPasswordResetRoute = LayoutPasswordResetImport.update({
  id: '/password/reset',
  path: '/password/reset',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPasswordForgotRoute = LayoutPasswordForgotImport.update({
  id: '/password/forgot',
  path: '/password/forgot',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthUsuarioRoute = LayoutAuthUsuarioImport.update({
  id: '/_usuario',
  getParentRoute: () => LayoutAuthRoute,
} as any)

const LayoutAuthEvaluacionIndexRoute = LayoutAuthEvaluacionIndexImport.update({
  id: '/evaluacion/',
  path: '/evaluacion/',
  getParentRoute: () => LayoutAuthRoute,
} as any)

const LayoutAuthUsuarioDashboardRoute = LayoutAuthUsuarioDashboardImport.update(
  {
    id: '/dashboard',
    path: '/dashboard',
    getParentRoute: () => LayoutAuthUsuarioRoute,
  } as any,
)

const LayoutAuthUsuarioAjustesRoute = LayoutAuthUsuarioAjustesImport.update({
  id: '/ajustes',
  path: '/ajustes',
  getParentRoute: () => LayoutAuthUsuarioRoute,
} as any)

const LayoutAuthUsuarioResultadosIndexRoute =
  LayoutAuthUsuarioResultadosIndexImport.update({
    id: '/resultados/',
    path: '/resultados/',
    getParentRoute: () => LayoutAuthUsuarioRoute,
  } as any)

const LayoutAuthUsuarioResultadosIdRoute =
  LayoutAuthUsuarioResultadosIdImport.update({
    id: '/resultados/$id',
    path: '/resultados/$id',
    getParentRoute: () => LayoutAuthUsuarioRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_auth': {
      id: '/_layout/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutAuthImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/login': {
      id: '/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LayoutLoginImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/registro': {
      id: '/_layout/registro'
      path: '/registro'
      fullPath: '/registro'
      preLoaderRoute: typeof LayoutRegistroImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_auth/_usuario': {
      id: '/_layout/_auth/_usuario'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutAuthUsuarioImport
      parentRoute: typeof LayoutAuthImport
    }
    '/_layout/password/forgot': {
      id: '/_layout/password/forgot'
      path: '/password/forgot'
      fullPath: '/password/forgot'
      preLoaderRoute: typeof LayoutPasswordForgotImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/password/reset': {
      id: '/_layout/password/reset'
      path: '/password/reset'
      fullPath: '/password/reset'
      preLoaderRoute: typeof LayoutPasswordResetImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_auth/_usuario/ajustes': {
      id: '/_layout/_auth/_usuario/ajustes'
      path: '/ajustes'
      fullPath: '/ajustes'
      preLoaderRoute: typeof LayoutAuthUsuarioAjustesImport
      parentRoute: typeof LayoutAuthUsuarioImport
    }
    '/_layout/_auth/_usuario/dashboard': {
      id: '/_layout/_auth/_usuario/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof LayoutAuthUsuarioDashboardImport
      parentRoute: typeof LayoutAuthUsuarioImport
    }
    '/_layout/_auth/evaluacion/': {
      id: '/_layout/_auth/evaluacion/'
      path: '/evaluacion'
      fullPath: '/evaluacion'
      preLoaderRoute: typeof LayoutAuthEvaluacionIndexImport
      parentRoute: typeof LayoutAuthImport
    }
    '/_layout/_auth/_usuario/resultados/$id': {
      id: '/_layout/_auth/_usuario/resultados/$id'
      path: '/resultados/$id'
      fullPath: '/resultados/$id'
      preLoaderRoute: typeof LayoutAuthUsuarioResultadosIdImport
      parentRoute: typeof LayoutAuthUsuarioImport
    }
    '/_layout/_auth/_usuario/resultados/': {
      id: '/_layout/_auth/_usuario/resultados/'
      path: '/resultados'
      fullPath: '/resultados'
      preLoaderRoute: typeof LayoutAuthUsuarioResultadosIndexImport
      parentRoute: typeof LayoutAuthUsuarioImport
    }
  }
}

// Create and export the route tree

interface LayoutAuthUsuarioRouteChildren {
  LayoutAuthUsuarioAjustesRoute: typeof LayoutAuthUsuarioAjustesRoute
  LayoutAuthUsuarioDashboardRoute: typeof LayoutAuthUsuarioDashboardRoute
  LayoutAuthUsuarioResultadosIdRoute: typeof LayoutAuthUsuarioResultadosIdRoute
  LayoutAuthUsuarioResultadosIndexRoute: typeof LayoutAuthUsuarioResultadosIndexRoute
}

const LayoutAuthUsuarioRouteChildren: LayoutAuthUsuarioRouteChildren = {
  LayoutAuthUsuarioAjustesRoute: LayoutAuthUsuarioAjustesRoute,
  LayoutAuthUsuarioDashboardRoute: LayoutAuthUsuarioDashboardRoute,
  LayoutAuthUsuarioResultadosIdRoute: LayoutAuthUsuarioResultadosIdRoute,
  LayoutAuthUsuarioResultadosIndexRoute: LayoutAuthUsuarioResultadosIndexRoute,
}

const LayoutAuthUsuarioRouteWithChildren =
  LayoutAuthUsuarioRoute._addFileChildren(LayoutAuthUsuarioRouteChildren)

interface LayoutAuthRouteChildren {
  LayoutAuthUsuarioRoute: typeof LayoutAuthUsuarioRouteWithChildren
  LayoutAuthEvaluacionIndexRoute: typeof LayoutAuthEvaluacionIndexRoute
}

const LayoutAuthRouteChildren: LayoutAuthRouteChildren = {
  LayoutAuthUsuarioRoute: LayoutAuthUsuarioRouteWithChildren,
  LayoutAuthEvaluacionIndexRoute: LayoutAuthEvaluacionIndexRoute,
}

const LayoutAuthRouteWithChildren = LayoutAuthRoute._addFileChildren(
  LayoutAuthRouteChildren,
)

interface LayoutRouteChildren {
  LayoutAuthRoute: typeof LayoutAuthRouteWithChildren
  LayoutLoginRoute: typeof LayoutLoginRoute
  LayoutRegistroRoute: typeof LayoutRegistroRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutPasswordForgotRoute: typeof LayoutPasswordForgotRoute
  LayoutPasswordResetRoute: typeof LayoutPasswordResetRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAuthRoute: LayoutAuthRouteWithChildren,
  LayoutLoginRoute: LayoutLoginRoute,
  LayoutRegistroRoute: LayoutRegistroRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutPasswordForgotRoute: LayoutPasswordForgotRoute,
  LayoutPasswordResetRoute: LayoutPasswordResetRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutAuthUsuarioRouteWithChildren
  '/login': typeof LayoutLoginRoute
  '/registro': typeof LayoutRegistroRoute
  '/': typeof LayoutIndexRoute
  '/password/forgot': typeof LayoutPasswordForgotRoute
  '/password/reset': typeof LayoutPasswordResetRoute
  '/ajustes': typeof LayoutAuthUsuarioAjustesRoute
  '/dashboard': typeof LayoutAuthUsuarioDashboardRoute
  '/evaluacion': typeof LayoutAuthEvaluacionIndexRoute
  '/resultados/$id': typeof LayoutAuthUsuarioResultadosIdRoute
  '/resultados': typeof LayoutAuthUsuarioResultadosIndexRoute
}

export interface FileRoutesByTo {
  '': typeof LayoutAuthUsuarioRouteWithChildren
  '/login': typeof LayoutLoginRoute
  '/registro': typeof LayoutRegistroRoute
  '/': typeof LayoutIndexRoute
  '/password/forgot': typeof LayoutPasswordForgotRoute
  '/password/reset': typeof LayoutPasswordResetRoute
  '/ajustes': typeof LayoutAuthUsuarioAjustesRoute
  '/dashboard': typeof LayoutAuthUsuarioDashboardRoute
  '/evaluacion': typeof LayoutAuthEvaluacionIndexRoute
  '/resultados/$id': typeof LayoutAuthUsuarioResultadosIdRoute
  '/resultados': typeof LayoutAuthUsuarioResultadosIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/_auth': typeof LayoutAuthRouteWithChildren
  '/_layout/login': typeof LayoutLoginRoute
  '/_layout/registro': typeof LayoutRegistroRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/_auth/_usuario': typeof LayoutAuthUsuarioRouteWithChildren
  '/_layout/password/forgot': typeof LayoutPasswordForgotRoute
  '/_layout/password/reset': typeof LayoutPasswordResetRoute
  '/_layout/_auth/_usuario/ajustes': typeof LayoutAuthUsuarioAjustesRoute
  '/_layout/_auth/_usuario/dashboard': typeof LayoutAuthUsuarioDashboardRoute
  '/_layout/_auth/evaluacion/': typeof LayoutAuthEvaluacionIndexRoute
  '/_layout/_auth/_usuario/resultados/$id': typeof LayoutAuthUsuarioResultadosIdRoute
  '/_layout/_auth/_usuario/resultados/': typeof LayoutAuthUsuarioResultadosIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/registro'
    | '/'
    | '/password/forgot'
    | '/password/reset'
    | '/ajustes'
    | '/dashboard'
    | '/evaluacion'
    | '/resultados/$id'
    | '/resultados'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/registro'
    | '/'
    | '/password/forgot'
    | '/password/reset'
    | '/ajustes'
    | '/dashboard'
    | '/evaluacion'
    | '/resultados/$id'
    | '/resultados'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/_auth'
    | '/_layout/login'
    | '/_layout/registro'
    | '/_layout/'
    | '/_layout/_auth/_usuario'
    | '/_layout/password/forgot'
    | '/_layout/password/reset'
    | '/_layout/_auth/_usuario/ajustes'
    | '/_layout/_auth/_usuario/dashboard'
    | '/_layout/_auth/evaluacion/'
    | '/_layout/_auth/_usuario/resultados/$id'
    | '/_layout/_auth/_usuario/resultados/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_auth",
        "/_layout/login",
        "/_layout/registro",
        "/_layout/",
        "/_layout/password/forgot",
        "/_layout/password/reset"
      ]
    },
    "/_layout/_auth": {
      "filePath": "_layout/_auth.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_auth/_usuario",
        "/_layout/_auth/evaluacion/"
      ]
    },
    "/_layout/login": {
      "filePath": "_layout/login.tsx",
      "parent": "/_layout"
    },
    "/_layout/registro": {
      "filePath": "_layout/registro.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/_auth/_usuario": {
      "filePath": "_layout/_auth/_usuario.tsx",
      "parent": "/_layout/_auth",
      "children": [
        "/_layout/_auth/_usuario/ajustes",
        "/_layout/_auth/_usuario/dashboard",
        "/_layout/_auth/_usuario/resultados/$id",
        "/_layout/_auth/_usuario/resultados/"
      ]
    },
    "/_layout/password/forgot": {
      "filePath": "_layout/password/forgot.tsx",
      "parent": "/_layout"
    },
    "/_layout/password/reset": {
      "filePath": "_layout/password/reset.tsx",
      "parent": "/_layout"
    },
    "/_layout/_auth/_usuario/ajustes": {
      "filePath": "_layout/_auth/_usuario/ajustes.tsx",
      "parent": "/_layout/_auth/_usuario"
    },
    "/_layout/_auth/_usuario/dashboard": {
      "filePath": "_layout/_auth/_usuario/dashboard.tsx",
      "parent": "/_layout/_auth/_usuario"
    },
    "/_layout/_auth/evaluacion/": {
      "filePath": "_layout/_auth/evaluacion/index.tsx",
      "parent": "/_layout/_auth"
    },
    "/_layout/_auth/_usuario/resultados/$id": {
      "filePath": "_layout/_auth/_usuario/resultados/$id.tsx",
      "parent": "/_layout/_auth/_usuario"
    },
    "/_layout/_auth/_usuario/resultados/": {
      "filePath": "_layout/_auth/_usuario/resultados/index.tsx",
      "parent": "/_layout/_auth/_usuario"
    }
  }
}
ROUTE_MANIFEST_END */
