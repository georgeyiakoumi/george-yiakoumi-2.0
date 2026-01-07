# George Yiakoumi Portfolio

A modern, full-stack portfolio website showcasing design and development work. Built with Next.js 15 and powered by a headless Strapi CMS, featuring smooth animations, dark mode, and a fully responsive design.

## Features

- **Dynamic Content Management**: All portfolio projects, about page content, and contact information managed through Strapi CMS
- **Rich Text Rendering**: Custom renderer supporting nested lists, formatting, embedded images, code blocks, and more
- **Responsive Design**: Mobile-first approach with seamless adaptation across all screen sizes
- **Dark Mode**: System-aware theme switching with persistent user preference
- **Smooth Animations**: Interactive animated icons and smooth transitions throughout
- **Type-Safe**: Full TypeScript integration across frontend and API layer
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 22.15.1 (managed via nvm)
- Strapi CMS instance running (configure via environment variables)

### Environment Variables

#### Frontend (.env.local)

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_url
STRAPI_API_TOKEN=your_api_token
```

#### CMS (cms/.env)

The CMS requires its own environment file at `cms/.env`:

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Database (PostgreSQL/Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=your_db_host
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_db_password
DATABASE_SSL=true

# Cloudinary (for media storage)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

**Note:** The `cms/.env` file is gitignored for security.

### Development Servers

#### Frontend (Next.js)

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

#### CMS (Strapi)

The CMS runs separately from the frontend. You can start it in two ways:

**Option 1: From project root**
```bash
npm run cms:dev
```

**Option 2: From cms directory**
```bash
cd cms
npm run develop
```

Open [http://localhost:1337/admin](http://localhost:1337/admin) to access the Strapi admin panel.

**Troubleshooting:**
- If you get "Port 1337 is already used by another application", kill the existing process:
  ```bash
  lsof -ti:1337 | xargs kill -9
  ```
  Then try starting Strapi again.

### Storybook

Run Storybook to view and develop UI components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

## Available Scripts

### Frontend
- `npm run dev` - Start Next.js development server (port 3000)
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

### CMS (from project root)
- `npm run cms:dev` - Start Strapi development server (port 1337)
- `npm run cms:build` - Build Strapi admin panel
- `npm run cms:start` - Start Strapi in production mode

### Storybook
- `npm run storybook` - Start Storybook dev server (port 6006)
- `npm run build-storybook` - Build Storybook for production

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 with React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React + @animate-ui/icons for animated components
- **Animation**: CSS transitions and @animate-ui interactive animations
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes (dark mode support)

### CMS
- **Headless CMS**: Strapi 5.8.1
- **Content Types**: Projects, About Page, Contact Info
- **Media**: Cloudinary integration for images

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── about/               # About page with GSAP animations
│   ├── portfolio/           # Portfolio listing and detail pages
│   │   └── [slug]/         # Dynamic project pages
│   ├── contact/            # Contact page
│   └── layout.tsx          # Root layout with navigation
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── lib/                   # Utilities and integrations
│   ├── strapi.ts         # Strapi API client
│   ├── strapi-queries.ts # Content fetching functions
│   ├── strapi-types.ts   # TypeScript type definitions
│   └── strapi-blocks-renderer.tsx # Rich text renderer
└── public/               # Static assets
```

## Content Management

Portfolio content is managed through Strapi CMS with the following content types:

- **Projects**: Portfolio case studies with rich text sections (Challenge, Solution, Role, Impact, Takeaway), images, tags, and external links
- **About Page**: Personal bio, skills, and work experience
- **Contact Info**: Contact details and social links

### Rich Text Features

The custom rich text renderer supports:
- Paragraphs with text formatting (bold, italic, underline, strikethrough, code)
- Nested bullet and ordered lists
- Headings (h1-h6)
- Blockquotes
- Code blocks
- Links
- Embedded images within content sections

## Pages

- **Home** (`/`) - Redirects to About page
- **About** (`/about`) - Main landing page with bio, skills, and work experience featuring scroll-triggered animations
- **Portfolio** (`/portfolio`) - Responsive grid showcasing all portfolio projects
- **Project Details** (`/portfolio/[slug]`) - Individual case studies with rich content sections (Challenge, Solution, Role, Impact, Key Takeaway)
- **Contact** (`/contact`) - Contact form with validation and success page
- **Form Success** (`/forms/contact`) - Animated confirmation page after form submission

## Deployment

This project is designed to be deployed on modern hosting platforms:

- **Frontend**: Vercel, Netlify, or any Node.js hosting
- **CMS**: Railway, Render, DigitalOcean, or self-hosted
- **Database**: Supabase (PostgreSQL)
- **Media**: Cloudinary CDN

For detailed technical documentation and development guidelines, see [CLAUDE.md](CLAUDE.md).
