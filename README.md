## Real Estate Listings Dashboard

A small React + TypeScript app to explore real estate listings: search, filter, sort, dive into details, view price history, and explore locations on an interactive map.

### [Check the live app here](https://real-estate-listing-inky.vercel.app/)

### Tech
- React + TypeScript (Vite)
- React Router
- Recharts (price history chart)
- Leaflet + React-Leaflet (interactive map with OpenStreetMap tiles)
- ESLint

### Getting started
```bash
npm install
npm run dev
```

- Dev server: `http://localhost:5173` (Vite’s default)
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

### Features
- Responsive property grid:
  - Clean card layout with image, title, price, and quick stats
  - Subtle hover effects (shadow + scale)
- Search & filters:
  - Instant search by title (placeholder: "Search properties...")
  - Filter by minimum bedrooms
  - Filter by maximum price
- Sorting:
  - Price: Low → High
  - Price: High → Low
  - Most Bedrooms
  - Largest Size (sqft)
- Details page:
  - Full-width hero image and quick stats (beds, baths, sqft, year)
  - Rich description and feature chips
  - Price history chart powered by Recharts
- Interactive map:
  - Leaflet map with markers for each property that has coordinates
  - Popups show title, price, and quick details
  - Focus/center on a selected property from the details page
  - Optional "Go to Location" button to center the map on the selected home
- Helpful states:
  - Empty state: “No properties found. Try adjusting your filters.”
  - Active filter chips and a one-click “Clear all filters”

### Data model
- Mocked data lives in `src/data.ts`
  - Each property can include `priceHistory` (for charting) and `coordinates` (for the map)
- Types are defined in `src/types.ts`

### Notes
- Built with modern React (Vite) and a straightforward component structure:
  - `pages/ListPage.tsx` for browsing/searching/filtering/sorting
  - `pages/DetailsPage.tsx` for the property detail view, chart, and map
  - `components/MapView.tsx` wraps Leaflet/React-Leaflet
  - `components/Controls.tsx` handles search/filter/sort controls
- The Leaflet CSS is imported inside the map component, so no extra setup is needed.
- How long: ~2.5 hours
- Satisfaction: 8/10

### If I had more time
- URL-based filters (so state survives refresh/sharing)
- Better UI
- Pagination or infinite scroll for larger datasets
- Unit tests and integration tests
- Server/API integration instead of mocked data
- Saved favorites and compare view
