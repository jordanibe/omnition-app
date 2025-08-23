# Omnition App

A modern React + Next.js SaaS platform interface with a dark theme and collapsible sidebar.

## Features

- **Collapsible Sidebar**: Toggle between full and icon-only view
- **Module Management**: Create, search, and organize modules
- **Dynamic Interface**: Floating text animations and modern UI
- **Agent Cards**: Quick access to Logistics Agent and upcoming Documentation Agent
- **Dark Theme**: Professional dark gray theme with blue accents
- **Responsive Design**: Optimized for desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
omnition-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Sidebar.tsx
│   └── MainContent.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Customization

### Client Configuration

Update the `MainContent` component to customize:
- Client name: Change the `clientName` prop
- Client logo: Add a `clientLogo` prop with the path to your logo

### Theme

The color scheme is defined in `tailwind.config.js` and can be customized by modifying the dark color palette.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
