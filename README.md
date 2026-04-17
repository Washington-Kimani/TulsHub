# TULS Hub – Web Tools Utility Platform

A modern, feature-rich web application for extracting, converting, and organizing web content. Powered by a Next.js frontend with TypeScript and a Flask backend using BeautifulSoup.

## Overview

TULS Hub provides three powerful utilities in one elegant interface:

- **Link Extractor** – Scan webpages and export all links into structured CSV files
- **HTML to DOCX** – Convert HTML pages into clean, formatted Word documents while preserving layout
- **Bulk Image Downloader** – Extract and download all images from any webpage instantly

## Features

**Modern UI/UX**
- Clean, intuitive interface with dark/light theme support
- Responsive design optimized for desktop and mobile
- Smooth animations powered by Framer Motion
- Accessible navigation with sidebar and navbar

**Core Utilities**
- Extract hyperlinks with one click
- Convert web content to Microsoft Word format
- Batch download images with preview gallery
- Real-time loading states and error handling

**Developer Experience**
- Built with Next.js 16 (latest features)
- Type-safe with TypeScript
- React 19 with modern hooks
- Tailwind CSS for rapid styling
- ESLint configured for code quality

## Tech Stack

### Frontend
- **Next.js** 16.2.3 – React framework
- **React** 19.2.4 – UI library
- **TypeScript** 5 – Type safety
- **Tailwind CSS** 4 – Utility-first CSS framework
- **Framer Motion** 12.38.0 – Animations
- **Lucide React** 1.8.0 – Icon library
- **React Query** 5.99.0 – Server state management
- **next-themes** 0.4.6 – Theme management

### Backend
- Flask (Python) – REST API server
- BeautifulSoup – HTML parsing and extraction
- Word document generation library

## Project Structure

```
tuls-hub/
├── app/
│   ├── page.tsx                     # Home page
│   ├── mainapp/
│   │   └── page.tsx                # Main dashboard view
│   ├── (tools)/                    # Route group for tools
│   │   ├── get-all-urls/
│   │   │   └── page.tsx            # Link extraction tool
│   │   ├── html-to-docx/
│   │   │   └── page.tsx            # HTML to Word converter
│   │   └── images-download/
│   │       └── page.tsx            # Image downloader tool
│   ├── components/
│   │   ├── navbar/                 # Top navigation
│   │   └── sidebar/                # Side navigation
│   ├── images/                     # Asset exports
│   │   └── index.ts                # Image imports
│   ├── lib/
│   │   └── api.ts                  # API client utilities
│   └── layout.tsx                  # Root layout
├── public/
│   └── assets/                     # Static assets
├── package.json                    # Dependencies
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind configuration
└── eslint.config.mjs               # ESLint configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ (for Next.js 16)
- npm, yarn, pnpm, or bun
- Python backend running (for API endpoints)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tuls-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The app will automatically reload when you modify files in the editor.

## Usage

### Link Extractor
1. Navigate to `/get-all-urls`
2. Enter a webpage URL
3. Click "Extract Links"
4. View results and download as CSV

### HTML to DOCX Converter
1. Navigate to `/html-to-docx`
2. Enter a webpage URL
3. Click "Convert"
4. Download the generated Word document

### Image Downloader
1. Navigate to `/images-download`
2. Enter a webpage URL
3. Click "Fetch Images"
4. Preview images and download as batch

## Development

### Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Quality

This project uses ESLint for code quality. Run the linter with:
```bash
npm run lint
```

### Environment Setup

Ensure the Flask backend is running and accessible at the configured API endpoint in `app/lib/api.ts`.

## Backend Integration

The frontend communicates with a Flask backend via REST API calls. Key endpoints:

- `POST /extract-links` – Extract links from URL
- `POST /convert-docx` – Convert HTML to Word document
- `POST /extract-images` – Extract images from URL

Ensure the backend server is running before using the tools.

## Styling & Theming

- **CSS Framework**: Tailwind CSS 4
- **Theme Support**: next-themes for persistent dark/light mode
- **Custom Colors**: Brand color `#2f27ce` (primary purple)
- **Animations**: Framer Motion for smooth transitions

## Performance Optimization

- **Image Optimization**: Next.js `<Image>` component
- **Font Optimization**: Geist font family from Vercel
- **Code Splitting**: Automatic route-based code splitting
- **State Management**: React Query for efficient server state

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel automatically detects Next.js and configures build settings
4. Deploy with one click

**Important**: Ensure your Flask backend is deployed separately and configure the API endpoint in the deployed environment.

### Deploy on Other Platforms

For Docker, traditional hosting, or other platforms:

```bash
# Build the project
npm run build

# Start the server
npm start
```

See [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Troubleshooting

### API Connection Issues
- Verify Flask backend is running
- Check API endpoint configuration in `app/lib/api.ts`
- Review browser console for network errors

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

### Styling Issues
- Rebuild Tailwind cache: `npm run build`
- Check for conflicting global styles in `app/globals.css`

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

For issues, feature requests, or questions, please open an issue in the repository.

