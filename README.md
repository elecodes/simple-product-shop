# Simple Product Shop

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS. This project demonstrates a clean architecture with feature-based organization, providing a robust foundation for scalable frontend development.

## Features

- **🛍️ Product Catalog**: Responsive grid layout displaying products with images and prices.
- **🛒 Shopping Cart**: Fully functional cart with add/remove capabilities, quantity adjustments, and live price summaries.
- **💳 Checkout Process**: Streamlined checkout interface (UI only).
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop experiences using Tailwind CSS.
- **⚡ High Performance**: Powered by Vite for lightning-fast development and production builds.
- **🧪 Robust Testing**: Integrated with Vitest for unit testing and Playwright for end-to-end testing.

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)
- **Linting & Formatting**: ESLint, Prettier

## Project Structure

The project follows a feature-based architecture pattern:

```
src/
├── features/           # Independent business features
│   ├── auth/           # Authentication logic
│   ├── product-catalog/# Product listing and display logic
│   ├── shopping-cart/  # Cart management and state
│   └── checkout/       # Checkout process logic
├── shared/             # Shared components, hooks, and utilities
├── pages/              # Route components (Home, Cart, Checkout)
├── infrastructure/     # External services and adapters
└── App.tsx             # Main application entry and routing
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd simple-product-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

Create a production-ready build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Running Tests

Run unit tests:
```bash
npm test
```

Run end-to-end tests:
```bash
npm run test:e2e
```
