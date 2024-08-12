# Contact Management App with Charts and Maps

## Overview

This project is a Contact Management application built with React, TypeScript, TailwindCSS, React Router v6, and React Query. The app features contact management functionality, along with a dashboard displaying COVID-19 data via charts and maps.

## Features

- **Contact Management:**

  - Add new contacts through a user-friendly form.
  - View a list of all contacts with the ability to click and view more details.
  - Edit and delete contacts easily.
  - Data is managed using Redux for state management.

- **Dashboard:**

  - A line chart displaying fluctuations in COVID-19 cases over time.
  - An interactive map using React Leaflet, showing markers with country-specific COVID-19 data. Markers display total active cases, recovered cases, and deaths.

- **Responsive Design:**
  - The app is fully responsive, ensuring an optimal user experience on both desktop and mobile devices.

## Technologies Used

- **React** with **TypeScript**: Provides a strongly-typed framework for building a scalable and maintainable frontend.
- **TailwindCSS**: A utility-first CSS framework for quickly designing responsive interfaces.
- **React Router v6**: Handles client-side routing and enables navigation between different components.
- **React Query (Tanstack Query)**: Efficiently manages API requests, caching, and synchronization of server data.
- **Redux**: Manages the global state of the application, specifically for handling contact data.
- **React Chartjs 2**: Integrates charts for visualizing data, specifically the line chart for COVID-19 cases.
- **React Leaflet**: Implements interactive maps to display geospatial data related to COVID-19.

## API Endpoints Used

- Global data: https://disease.sh/v3/covid-19/all
- Country-specific data: https://disease.sh/v3/covid-19/countries
- Historical data: https://disease.sh/v3/covid-19/historical/all?lastdays=all
- These endpoints provide the data for the charts and maps in the dashboard.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14.x or later)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd contact-management-app
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be running on `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```
