# Logistics Module Demo

This folder contains the logistics module UI components that display scheduling and optimization data in a dashboard format.

## Structure

```
logistics_demo/
├── components/
│   ├── LogisticsModule.tsx    # Main container component
│   ├── GanttChart.tsx         # Timeline view of personnel schedules
│   └── RadarChart.tsx         # Optimization metrics visualization
├── types.ts                   # TypeScript interfaces
├── mockData.ts                # Sample data for development
├── index.ts                   # Export file
└── README.md                  # This file
```

## Components

### LogisticsModule
- Main container that combines all logistics components
- Header with module title and "Back to Home" button
- "What shall I change?" input box for user feedback
- Layout with Gantt chart on left, radar chart on right

### GanttChart
- Displays personnel schedules using Google Charts Gantt library
- Date selector with navigation buttons
- Search functionality for filtering personnel
- View mode toggle (Personnel/Gantt)
- Professional timeline visualization with proper scaling

### RadarChart
- Visualizes optimization metrics using Chart.js radar chart
- Compares recommended vs baseline performance
- Shows key metrics: Appointment Volume, Provider Balance, Travel Efficiency, Continuity of Care
- Displays summary statistics below the chart
- Interactive chart with hover effects and proper styling

## Features

- **Date Navigation**: Previous/next day buttons with formatted date display
- **Search & Filter**: Search personnel by name, role, or skills
- **View Modes**: Toggle between Personnel and Gantt views
- **Responsive Layout**: Adapts to different screen sizes
- **Mock Data**: Includes sample personnel and appointment data for development

## Chart Libraries

This module uses two professional charting libraries:

- **Chart.js** - For the radar chart visualization of optimization metrics
- **Google Charts** - For the Gantt chart display of personnel schedules

Both libraries provide interactive features, proper scaling, and professional appearance.

## Integration

The logistics module integrates with the main app through the `MainContent` component. When a logistics module is active, it displays the full logistics dashboard instead of the simple text content.

## Usage

```tsx
import { LogisticsModule } from '@/logistics_demo'

<LogisticsModule
  moduleTitle="My Logistics Module"
  onBackToHome={() => setActiveModuleId(null)}
/>
```

## Data Structure

The module expects data in the following format:
- **Personnel**: List of staff members with roles
- **Appointments**: Scheduled tasks with time slots
- **Optimization Data**: Performance metrics for comparison

All data structures are defined in `types.ts` with sample data in `mockData.ts`.
