# E-Cell Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides real-time data visualization and analytics in a clean, user-friendly interface.

![Dashboard Screenshot](./public/screenshot.png)

## Features

- 📊 Real-time data visualization with interactive charts
- 🌓 Dark/Light theme with system preference detection
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Optimized performance with React Query
- 🎨 Modern UI with Tailwind CSS
- 🔄 Configurable data refresh rates
- 🔍 Searchable and sortable data tables
- 📤 Export data to CSV
- ♿ Accessible and keyboard-navigable

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **State Management**: React Query for server state
- **Charts**: Chart.js with react-chartjs-2
- **UI Components**: Headless UI, Hero Icons
- **Routing**: React Router
- **Build Tool**: Vite
- **Testing**: Vitest (coming soon)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecell-dashboard.git
   cd ecell-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests (coming soon)
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── styles/          # Global styles and Tailwind config
└── utils/           # Utility functions
```

## Configuration

The dashboard can be configured using environment variables. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fecell-dashboard)

1. Push your code to a GitHub repository
2. Import the project on Vercel
3. Add environment variables if needed
4. Deploy!

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/ecell-dashboard)

1. Push your code to a GitHub repository
2. Import the project on Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Add environment variables if needed
6. Deploy!

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query)
- [Chart.js](https://www.chartjs.org/)
- [Hero Icons](https://heroicons.com/)
- [Headless UI](https://headlessui.com/)

---

Made with ❤️ by [Apaarshakti](https://github.com/apaarshakti) for E-Cell
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
