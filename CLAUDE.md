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

### Icons & Animations
- **Lucide React** - Primary icon library (User, Briefcase, Mail, Github, LinkedIn, etc.)
- **@animate-ui/icons** - Animated icon components from shadcn (ArrowLeft, CheckCheck, etc.)
  - Use AnimateIcon wrapper with animateOnHover and animateOnView props

### Animation
- **@animate-ui/icons** - Interactive animated icons with hover and view triggers
- **CSS Transitions** - Smooth theme transitions and UI state changes
- **Tailwind Transitions** - Utility-based animation classes

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
- Links: About, Portfolio, Contact, LinkedIn, GitHub
- Logo displayed top-left mobile, bottom-right desktop (ThemedLogo component manages drawer visibility)

### Animations
- Animated icons with hover and view-trigger effects using @animate-ui
- Smooth CSS transitions for theme switching and UI interactions
- Loading states with skeleton components

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

### Netlify Function Usage
**CRITICAL: Always check Netlify function usage impact before implementing solutions**

This project is hosted on Netlify Free Tier with limited serverless function invocations per month. Before implementing any solution, ALWAYS verify it won't cause excessive function usage:

#### What Causes High Function Usage:
- `export const dynamic = "force-dynamic"` in pages (forces SSR on every request)
- `cache: 'no-store'` in fetch calls (bypasses caching, hits functions every time)
- Missing `revalidate` exports (defaults to always dynamic)
- Missing `generateStaticParams` for dynamic routes

#### Best Practices:
- Use ISR (Incremental Static Regeneration) with `revalidate: 3600` for most pages
- Use `generateStaticParams` for dynamic routes to pre-render at build time
- Default to `cache: 'force-cache'` for Strapi API calls
- Only use `cache: 'no-store'` when absolutely necessary (real-time data)
- Configure aggressive caching headers in [netlify.toml](netlify.toml) for static assets
- Use Next.js tags and `revalidatePath`/`revalidateTag` for on-demand revalidation

#### Current Configuration:
- Pages use ISR with 1-hour revalidation
- Strapi API calls default to `force-cache`
- Static assets cached for 1 year with immutable headers
- Using `@netlify/plugin-nextjs` (do NOT enable Netlify Prerender Extension)

### Current Status
- **Completed Pages**: All core pages complete - About, Portfolio (listing + detail pages), Contact, Contact Success
- **CMS Integration**: Fully integrated with Strapi for all dynamic content
- **Responsive Design**: Fully responsive across all breakpoints (mobile, tablet, desktop)
- **Animations**: Interactive animated icons throughout, smooth CSS transitions
- **Form Handling**: Contact form with validation, success page with animated confirmation

### Code Style
- Use TypeScript exclusively (.tsx/.ts files) - no JavaScript files
- Use Tailwind classes for styling
- Follow existing component patterns in components/ui
- No unnecessary comments in code
- Keep animations smooth and performant

### Media Handling
- All media assets hosted on Cloudinary via Strapi
- **Images**: Use Next.js Image component with fill prop and sizes="100vw" for responsive images
- **Videos**: Use native HTML5 video element with Intersection Observer for auto-play on scroll
  - Videos auto-play when 50% visible, pause when out of view
  - Muted and looped for smooth background effect
  - No controls displayed for immersive experience
- Aspect ratios controlled via wrapper divs with Tailwind aspect-* utilities
- Support for responsive aspect ratios using breakpoint prefixes (sm:, md:, lg:, etc.)
- **Media Gallery**: Projects support mixed media (images + videos) distributed between content sections
  - Media items alternate between Challenge, Solution, Role, Impact sections
  - Gracefully handles variable number of media items (1-4+)

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
- **Projects** - Portfolio case studies with:
  - Rich text content sections (Challenge, Solution, Role, Impact, Takeaway)
  - Media gallery field supporting multiple images and videos
  - Hero image, thumbnail, tags, dates, client info
  - Slug for URL routing
- **About** - About page content
- **Contact Page** - Contact form configuration
- **Global SEO** - Site-wide SEO metadata
- **Navigation** - Site navigation structure
- **Tools** - Skills and technologies

## Future Enhancements
1. Implement contact form email backend (currently form submits to /forms/contact success page)
2. Add SEO metadata and Open Graph tags for social sharing
3. Consider adding blog/articles section
4. Add analytics tracking (Google Analytics, Plausible, etc.)
5. Add more portfolio projects through Strapi CMS
6. Optimize loading states and skeleton components
7. Add page transitions between routes