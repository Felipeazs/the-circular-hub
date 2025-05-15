The Circular Hub

## Purpose and Proposal

This web application is a user-centric platform designed to manage and evaluate user responses related to sustainability or
environmental impact assessments. Users can register, log in, and submit detailed responses to a structured questionnaire covering
various sustainability topics such as collaboration, circular design, education, energy efficiency, repairability, resource
management, waste management, environmental impact, and community engagement.

The app stores user profiles and their associated responses securely, allowing users to track their assessment results over time. The
platform supports roles such as super_admin, admin, and user, enabling different levels of access and management capabilities.

The proposal is to provide an interactive, data-driven tool for users to self-assess or be assessed on sustainability practices, with
a clean UI and responsive charts to visualize results. It integrates analytics tracking and uses modern web technologies to ensure a
smooth user experience.

## Web Technologies

### Frontend

- React with TypeScript for building UI components.
- Zustand for state management.
- TanStack Router for routing and route context management.
- React Query for data fetching and caching.
- Sonner for toast notifications.
- Various UI components and charts for data visualization.
- CSS with utility classes (likely Tailwind CSS).
- Suspense and lazy loading for performance optimization.
- PostHog for analytics tracking.

### Backend

- Node.js with Hono framework for building the API server.
- Drizzle ORM with PostgreSQL for database schema and queries.
- Zod for schema validation and type inference.
- Redis for caching or session management.
- Cloudinary for image uploads.
- Email provider integration for password reset and notifications.
- Middleware for security (CSP, CORS, secure headers), logging, error handling, and route protection.
- Environment variables managed via a custom env module.

### Build and Tooling

- Bun as the package manager and runtime.
- Monorepo structure with client, server, and packages workspaces.
- ESLint for linting and code quality.
- TypeScript for static typing.
- React DOM for rendering.
- TanStack React Query Devtools and Router Devtools for development.

### External Services

- **PostHog:** For user behavior analytics and event tracking
- **Redis:** For caching and session storage
- **Railway:** Deployment platform (badge shown)

### Features

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
