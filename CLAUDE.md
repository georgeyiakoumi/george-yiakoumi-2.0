# George Yiakoumi Portfolio Project Documentation

## Project Overview
This is a personal portfolio website built with modern web technologies to showcase design and development work.

## Tech Stack

### Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - All components use TypeScript (.tsx files)

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Intelligent Tailwind class merging

### Icons
- **Lucide React** - Exclusive icon library (User, Briefcase, Mail, Github, LinkedIn, ArrowRight, etc.)
  - No other icon libraries are used - maintain consistency with Lucide only

### Animation
- **GSAP 3.13.0** - Professional-grade animation library
- **ScrollTrigger** - GSAP plugin for scroll-based animations

### Theme & Dark Mode
- **next-themes** - Theme management with dark mode support
- Theme toggle available in top-right corner

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Additional Libraries
- **Sonner** - Toast notifications
- **date-fns** - Date utilities
- **cmdk** - Command menu
- **embla-carousel-react** - Carousel component
- **recharts** - Data visualization

### CMS (Content Management)
- **Strapi 5.8.1** - Headless CMS located in `/cms` folder
- **PostgreSQL** - Database (hosted on Supabase)
- **Cloudinary** - Media storage and optimization
- Portfolio projects, images, and content managed through Strapi admin panel

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (redirects to /about)
│   ├── about/page.tsx     # About page (main landing)
│   ├── portfolio/         # Portfolio pages
│   │   ├── page.tsx       # Portfolio listing
│   │   └── [slug]/page.tsx # Individual project pages
│   ├── contact/page.tsx   # Contact page
│   ├── layout.tsx         # Root layout with navigation
│   ├── globals.css        # Global styles and Tailwind directives
│   └── components/        # App-specific components
│       └── ScrollBlurEffect.tsx
├── components/            # Shared components
│   ├── ui/               # shadcn/ui components (all .tsx files)
│   ├── section.tsx       # Reusable section wrapper
│   ├── logo-item.tsx     # Company/tool logo component
│   ├── theme-provider.tsx
│   └── mode-toggle.tsx
├── lib/                   # Utilities and helpers
│   ├── utils.tsx         # cn() utility for className merging
│   ├── constants.ts      # Site-wide constants (companies, tools, author)
│   ├── strapi.ts         # Strapi API connection utilities
│   ├── strapi-queries.ts # Strapi data fetching functions
│   └── strapi-blocks-renderer.tsx # Rich text rendering
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts
├── cms/                   # Strapi CMS (separate Node.js app)
│   ├── config/           # Strapi configuration
│   ├── src/              # Content types, controllers, services
│   ├── public/uploads/   # Uploaded media (gitignored)
│   ├── database/         # Database files (gitignored)
│   └── .env             # CMS environment variables (gitignored)
└── public/               # Static assets
    └── logo.svg

```

## Key Features

### Navigation
- Fixed navigation menu (bottom-left on mobile, top-left on desktop)
- Links: About, Portfolio (TODO), Contact (TODO), LinkedIn, GitHub
- Logo displayed top-left mobile, bottom-right desktop

### Scroll Effects
- Custom ScrollBlurEffect wrapper that adds fade/blur at viewport edges
- GSAP animations on scroll for About page elements
- Smooth scroll-triggered content reveals

### Dark Mode
- System-aware dark mode with manual toggle
- Persistent theme selection
- Smooth transitions without flicker

## Development Commands

### Frontend (Next.js)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### CMS (Strapi)
```bash
# Start CMS in development mode (from project root)
npm run cms:dev

# Build CMS (from project root)
npm run cms:build

# Start CMS in production mode (from project root)
npm run cms:start

# Or run directly from cms folder
cd cms
npm run develop  # Development mode with auto-reload
npm run build    # Build admin panel
npm run start    # Production mode
```

**Note**: The CMS runs on port 1337 by default. Access the admin panel at `http://localhost:1337/admin`

## Important Notes

### Current Status
- **Completed Pages**: About page (main landing), Portfolio listing, Portfolio detail pages, Contact page
- **CMS Integration**: Fully integrated with Strapi for portfolio content management
- **TODO**: Company logos and tool icons on About page need actual assets (currently placeholder text)

### Code Style
- Use TypeScript exclusively (.tsx/.ts files) - no JavaScript files
- Use Tailwind classes for styling
- Follow existing component patterns in components/ui
- No unnecessary comments in code
- Keep animations smooth and performant

### Image Handling
- Avatar hosted on Cloudinary
- Use Next.js Image component for optimization
- Store static assets in public folder

### Testing & Validation
- Always run `npm run lint` before committing
- Test dark mode toggle functionality
- Verify responsive design on mobile/tablet/desktop
- Check scroll animations performance

## Environment Requirements
- Node.js 22.15.1 (via nvm)
- npm package manager

## Git Repository
Project uses Git for version control with .gitignore configured for both Next.js and Strapi.

### Monorepo Structure
- Frontend and CMS are in the same repository
- CMS lives in `/cms` folder with its own `package.json` and `node_modules`
- CMS database, uploads, and build artifacts are gitignored
- CMS `.env` file contains sensitive credentials and is gitignored

## CMS Content Types
The Strapi CMS includes the following content types:
- **Projects** - Portfolio case studies with rich text, images, tags, dates, client info
- **About** - About page content
- **Contact Page** - Contact form configuration
- **Global SEO** - Site-wide SEO metadata
- **Navigation** - Site navigation structure
- **Tools** - Skills and technologies

## Future Enhancements
1. Add actual company logos and tool icons (replace placeholder text)
2. Implement contact form backend with email service
3. Consider adding blog/articles section
4. Implement SEO optimizations and meta tags
5. Add analytics tracking (Google Analytics, Plausible, etc.)
6. Add more portfolio projects through Strapi
7. Implement image optimization for company/tool logos