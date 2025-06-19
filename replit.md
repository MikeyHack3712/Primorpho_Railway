# Primorpho - Custom Web Development Platform

## Overview

Primorpho is a full-stack web application built to showcase custom web development services with a futuristic, neural-enhanced theme. The platform features client portfolio displays, service packages, contact forms, audit tools, and an admin dashboard for managing submissions and reservations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom futuristic theme and shadcn/ui components
- **State Management**: React Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **Email Service**: SendGrid for email notifications

### UI/UX Design
- Custom futuristic theme with neon accents (cyan, purple, yellow)
- Dark mode design with glass morphism effects
- Responsive design with mobile-first approach
- Interactive elements with hover effects and animations

## Key Components

### Core Pages
- **Home**: Hero section with service introduction and CTAs
- **Services**: Package offerings (LaunchPad, Pro Presence, Smart Business)
- **Portfolio**: Project showcases with results metrics
- **About**: Developer background and experience
- **Contact**: Multi-purpose contact form with audit request capability
- **Tools**: Free website audit tool with performance analysis
- **Admin**: Dashboard for managing submissions and reservations

### Database Schema
- **Users**: Replit Auth integration for user management
- **Sessions**: Required for Replit Auth session storage
- **Contact Submissions**: Form submissions with audit request flags
- **Slot Reservations**: Project slot booking system
- **Audit Results**: Website audit data storage

### Authentication System
- Replit Auth with OpenID Connect integration
- Session-based authentication with PostgreSQL storage
- Protected admin routes with user role validation

## Data Flow

### Contact Form Flow
1. User submits contact form with optional website URL for audit
2. Form validation using Zod schemas
3. Data stored in contact_submissions table
4. Email notification sent via SendGrid
5. Admin dashboard displays new submissions

### Audit Tool Flow
1. User enters website URL for free audit
2. Backend processes audit request
3. Results stored in audit_results table
4. Performance scores and recommendations generated
5. Results displayed to user with improvement suggestions

### Slot Reservation Flow
1. User fills out multi-step reservation form
2. Package selection and project details captured
3. Data stored in slot_reservations table
4. Confirmation email sent to user
5. Admin can manage reservations through dashboard

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@sendgrid/mail**: Email service integration
- **passport**: Authentication middleware

### UI Components
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **typescript**: Type safety
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution
- **esbuild**: Production bundling

## Deployment Strategy

### Development Environment
- Replit hosting with integrated development environment
- PostgreSQL database provisioning
- Environment variables for API keys and database connections
- Hot reload with Vite development server

### Production Build
- Vite builds client-side assets to `dist/public`
- esbuild bundles server code to `dist/index.js`
- Node.js production server serves static files and API routes
- Port 5000 exposed for external access

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- `SENDGRID_API_KEY` for email service
- `SESSION_SECRET` for session encryption
- `REPLIT_DOMAINS` for authentication

### Autoscale Deployment
- Replit autoscale deployment target
- Build command: `npm run build`
- Start command: `npm run start`
- Automatic scaling based on traffic

## Changelog

```
Changelog:
- June 19, 2025. Initial setup
- June 19, 2025. Enhanced home page with premium futuristic animations
  * Added ultra-premium visual effects: floating particles, Matrix rain drops, holographic text
  * Integrated energy waves, morphing blobs, scan line effects, and data stream animations
  * Applied Orbitron cyberpunk font with advanced 3D hover effects and interactive elements
  * Maintained original content structure: "TRANSFORM YOUR DIGITAL PRESENCE" headline
  * Kept original messaging: "From vision to velocity, we code transformation"
  * Preserved original button text: "INITIATE PROJECT" and "VIEW PORTFOLIO"
  * Retained "READY TO TRANSCEND?" call-to-action with premium transformation messaging
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```