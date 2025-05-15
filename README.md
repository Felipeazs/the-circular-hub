![GitHub package.json version](https://img.shields.io/github/package-json/v/Felipeazs/monorepo_example) ![GitHub repo size](https://img.shields.io/github/repo-size/Felipeazs/monorepo_example) [![Deployment production pipeline](https://github.com/Felipeazs/monorepo_example/actions/workflows/ci.yml/badge.svg)](https://github.com/Felipeazs/monorepo_example/actions/workflows/ci.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/53862c2a473e971a4d0a/maintainability)](https://codeclimate.com/github/Felipeazs/monorepo_example/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/Felipeazs/monorepo_example/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Felipeazs/monorepo_example?targetFile=package.json)

![image](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

# Monorepo Template - React (Vite) / Hono.dev

## Purpose and Proposal

This web application is a monorepo template designed to demonstrate a full-stack web app architecture using React with Vite on the frontend and Hono.dev on the backend. It aims to provide a scalable, maintainable, and performant starting point for building modern web applications with a clean separation of concerns and best practices.

The app includes user authentication, state management, API integration, and UI components to facilitate rapid development of feature-rich applications. It also integrates analytics and monitoring tools to support production readiness.

## Web Stack

### Frontend

- **Framework:** React (with React 18 features)
- **Bundler:** Vite for fast development and optimized builds
- **State Management:** Zustand for lightweight and flexible global state
- **Routing:** @tanstack/react-router for declarative and powerful routing
- **UI Components:** Custom components with Tailwind CSS utility classes
- **Data Fetching:** React Query (@tanstack/react-query) for server state management and caching
- **Date Handling:** date-fns with locale support for formatting and relative dates

### Backend

- **Framework:** Hono.dev, a lightweight and fast web framework for Node.js
- **Middleware:** Custom middlewares for security headers, CORS, error handling, and not found routes
- **Static Serving:** Serve static assets from the public directory
- **Redis:** Used for caching or session management (initialized in create-app)
- **PostHog:** Integrated for analytics and event tracking
- **Environment:** Configured via environment variables with type safety

### Tools

- **Package Manager:** Bun for fast installs and scripts
- **Linting:** ESLint with custom config for code quality and style
- **Testing:** (Not explicitly shown but can be integrated)
- **Devtools:** Hono showRoutes for route debugging in development
- **Version Control:** GitHub with CI pipeline for deployment and maintainability checks

### External Services

- **PostHog:** For user behavior analytics and event tracking
- **Redis:** For caching and session storage
- **Railway:** Deployment platform (badge shown)

## Features

- User authentication and session management
- Global state management with Zustand
- Declarative routing with nested routes and error boundaries
- Responsive UI components with accessibility considerations
- Data fetching and caching with React Query
- Date formatting and relative time display in Spanish locale
- Analytics integration with PostHog
- Secure HTTP headers and CORS configuration
- Static file serving and SPA fallback routing
- Development tooling with route visualization and logging

## Getting Started

To install dependencies:

```bash
bun install
```

To build the project:

```bash
bun run build
```

To run in development mode:

```bash
bun run dev
```

To run in production mode:

```bash
bun run start
```

Open your browser at [http://localhost:3000](http://localhost:3000) to view the app.
