# George Yiakoumi Portfolio

Personal portfolio website built with Next.js and powered by Strapi CMS, showcasing design and development work.

## Features

- Dynamic portfolio projects loaded from Strapi CMS
- Rich text content with nested lists, formatting, and embedded images
- Responsive design with dark mode support
- Smooth scroll animations powered by GSAP
- SEO-friendly with Next.js App Router
- Type-safe integration with TypeScript

## Getting Started

### Prerequisites

- Node.js 22.15.1 (managed via nvm)
- Strapi CMS instance running (configure via environment variables)

### Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_url
STRAPI_API_TOKEN=your_api_token
```

### Development Server

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Storybook

Run Storybook to view and develop UI components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

## Available Scripts

- `npm run dev` - Start Next.js development server (port 3000)
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook dev server (port 6006)
- `npm run build-storybook` - Build Storybook for production

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 with React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.13
- **UI Components**: shadcn/ui + Radix UI
- **Animation**: GSAP 3.13.0 with ScrollTrigger
- **Icons**: Lucide React
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

- **Home** (`/`) - Landing page
- **About** (`/about`) - Personal information with scroll animations
- **Portfolio** (`/portfolio`) - Grid of all projects
- **Project Details** (`/portfolio/[slug]`) - Individual project case studies
- **Contact** (`/contact`) - Contact information and form

For detailed technical documentation, see [CLAUDE.md](CLAUDE.md).
