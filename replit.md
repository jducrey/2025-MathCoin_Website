# MathCoin - Cours Particuliers de Mathématiques

## Overview

MathCoin is a French mathematics tutoring website built as a full-stack application. It provides a landing page for a mathematics tutor to showcase services and collect contact requests from potential students. The application features a modern React frontend with Tailwind CSS styling and a Node.js/Express backend with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with TypeScript (ESM modules)
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Validation**: Zod for request/response validation
- **Session Management**: Built-in support with connect-pg-simple

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contact Requests Table**: Stores tutoring inquiries with fields:
  - demandeur (requester name)
  - niveau (education level)
  - besoin (specific needs)
  - volume (lesson volume/frequency)
  - objectif (learning objectives)
  - disponibilites (availability)
  - message (additional message)
  - createdAt (timestamp)

## Key Components

### Frontend Components
- **Landing Page**: Single-page application showcasing tutoring services
- **Contact Form**: Multi-field form for tutoring requests with validation
- **UI Components**: Comprehensive shadcn/ui component library including forms, cards, buttons, toasts
- **Mobile Responsive**: Tailored for both desktop and mobile experiences

### Backend Services
- **Contact API**: Handles form submissions and stores requests
- **Storage Layer**: Abstract storage interface with in-memory implementation (ready for database integration)
- **Validation Layer**: Zod schemas for type-safe data handling
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Development Tools
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **TypeScript**: Full type safety across the entire stack
- **Path Aliases**: Simplified imports with @ and @shared prefixes
- **Database Migrations**: Drizzle Kit for schema management

## Data Flow

1. **User Visit**: Client loads React SPA from Vite dev server
2. **Form Submission**: Contact form data validated client-side with Zod
3. **API Request**: TanStack Query sends POST request to `/api/contact`
4. **Server Validation**: Express route validates data against shared Zod schema
5. **Data Storage**: Contact request stored via storage abstraction layer
6. **Response**: Success/error response sent back to client
7. **UI Feedback**: Toast notification displays result to user

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **typescript**: Type checking and compilation
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundling for production backend

## Deployment Strategy

### Platform Configuration
- **Environment**: Replit with Node.js 20, PostgreSQL 16
- **Development**: `npm run dev` runs both frontend and backend concurrently
- **Production Build**: Vite builds frontend, esbuild bundles backend
- **Deployment**: Autoscale deployment target on port 80

### Environment Setup
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Build Process**: Frontend static files served by Express in production
- **Port Configuration**: Local development on port 5000, production on port 80

### File Structure
- `client/`: React frontend application
- `server/`: Express backend API
- `shared/`: Common schemas and types
- `dist/`: Production build output
- `migrations/`: Database migration files

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 16, 2025. Initial setup