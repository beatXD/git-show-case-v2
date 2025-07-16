# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Portfolio website built with React 19 and Vite. It showcases GitHub repositories, user statistics, and activity through a modern, responsive interface. The application fetches data from the GitHub API and displays it in an attractive portfolio format.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Environment Setup

Create a `.env` file in the root directory:
```
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-personal-access-token
```

The GitHub token is optional but recommended for higher API rate limits. Get one from: https://github.com/settings/tokens

## Project Structure

- `src/components/` - Reusable UI components
  - `common/` - Header, Footer, Loading components
  - `home/` - HeroSection, GitHubStats components
  - `projects/` - ProjectCard, ProjectList, ProjectDetail, FilterBar
  - `activity/` - ContributionGraph component
- `src/pages/` - Route-level page components
- `src/services/` - GitHub API service layer
- `src/hooks/` - Custom React hooks for data fetching
- `src/utils/` - Utility functions and formatters

## Key Features

- **GitHub Integration**: Fetches user profile, repositories, and activity
- **Repository Showcase**: Displays repositories with stats, languages, and topics
- **Advanced Filtering**: Search and filter repositories by language, sort by various criteria
- **Project Details**: Individual project pages with README rendering
- **Activity Timeline**: Shows recent GitHub activity and contributions
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Dependencies

- **React 19** - Core UI library with modern features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for GitHub API requests
- **React Markdown** - Markdown rendering with syntax highlighting
- **React Syntax Highlighter** - Code block highlighting
- **Framer Motion** - Animation library for smooth transitions
- **Day.js** - Date manipulation and formatting
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library (Feather icons)
- **Zustand** - Lightweight state management

## GitHub API Integration

The application uses the GitHub REST API v3 and GraphQL API for:
- User profile information
- Repository listings with metadata
- Pinned repositories (GraphQL)
- Repository details, README files, languages, contributors
- User activity and events

API calls are centralized in `src/services/githubApi.js` with proper error handling and rate limiting considerations.

## Component Architecture

- **Custom Hooks**: Data fetching logic is abstracted into reusable hooks
- **Loading States**: Comprehensive loading and error states throughout
- **Responsive Design**: All components are mobile-first and responsive
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Lazy loading and optimized re-renders

## Styling Approach

- **Tailwind CSS v4**: Utility-first CSS with custom configuration
- **PostCSS Integration**: Uses `@tailwindcss/postcss` plugin for processing
- **Custom Styles**: Additional styles in `src/index.css` for markdown content
- **Animations**: Framer Motion for smooth page transitions and interactions
- **Color Scheme**: Professional blue/gray palette with accent colors
- **Typography**: System fonts with good hierarchy and readability

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: {...} },
      animation: { 'spin-slow': 'spin 3s linear infinite' }
    }
  }
}
```

PostCSS configuration in `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
```