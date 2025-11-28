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

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/page.tsx     # About page
│   ├── layout.tsx         # Root layout with navigation
│   ├── globals.css        # Global styles and Tailwind directives
│   └── components/        # App-specific components
│       └── ScrollBlurEffect.tsx
├── components/            # Shared components
│   ├── ui/               # shadcn/ui components (all .tsx files)
│   ├── theme-provider.tsx
│   └── mode-toggle.tsx
├── lib/                   # Utilities and helpers
│   └── utils.tsx         # cn() utility for className merging
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts
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

## Important Notes

### Current Status
- **Completed Pages**: Homepage (placeholder content), About page
- **TODO Pages**: Portfolio page, Contact page
- **Placeholder Content**: Company logos, tool icons on About page need actual assets

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
Project uses Git for version control with .gitignore configured for Next.js projects.

## Future Enhancements
1. Complete Portfolio and Contact pages
2. Add actual company logos and tool icons
3. Implement contact form backend
4. Add portfolio project case studies
5. Consider adding blog/articles section
6. Implement SEO optimizations
7. Add analytics tracking