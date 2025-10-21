# Interactive Map & Timeline Component Specification

## Overview
The Map & Timeline component provides an immersive way to explore African history through geographical and chronological lenses. Built with Mapbox GL JS for mapping and D3.js for timeline interactions, it supports clickable regions, layered historical data, trade routes, migration animations, and a scrubber-based timeline with event filtering.

## Component Features

### Map Features
- **Clickable Regions**: Countries/regions highlight on hover and display info cards on click.
- **Historical Layers Toggle**: Switch between modern and historical boundaries (e.g., ancient kingdoms).
- **Trade Routes Overlay**: Animated lines showing trade paths with direction indicators.
- **Animated Migration Paths**: Dotted lines with movement animations for population migrations.

### Timeline Features
- **Draggable Scrubber**: Horizontal timeline with a movable indicator to filter map data by date.
- **Event Cards on Hover**: Pop-up cards with event details when hovering over timeline markers.
- **Filter by Era/Region**: Dropdowns to narrow events (e.g., "Pre-Colonial", "Colonial Era") and regions.

## Data Contract

### GeoJSON Schema for Map Data
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      },
      "properties": {
        "id": "string", // Unique identifier
        "name": "string", // Region name
        "type": "country|kingdom|trade_route", // Feature type
        "historical_periods": ["string"], // Array of applicable eras
        "description": "string", // Short description
        "events": ["event_id"] // Linked event IDs
      }
    }
  ]
}
```

### Event Schema for Timeline
```json
{
  "events": [
    {
      "id": "string", // Unique identifier
      "title": "string", // Event name
      "description": "string", // Detailed description
      "date": "YYYY-MM-DD", // ISO date string
      "era": "string", // e.g., "Pre-Colonial"
      "region": "string", // Associated region
      "coordinates": [lng, lat], // Optional map coordinates
      "sources": ["string"], // Array of source URLs
      "category": "political|military|economic|cultural" // Event type
    }
  ]
}
```

## Sample JSON for One Country (Kenya)

### GeoJSON Sample
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[34.0, -4.0], [41.0, -4.0], [41.0, 5.0], [34.0, 5.0], [34.0, -4.0]]]
      },
      "properties": {
        "id": "kenya",
        "name": "Kenya",
        "type": "country",
        "historical_periods": ["Pre-Colonial", "Colonial", "Post-Colonial"],
        "description": "East African nation with rich history from ancient trade to modern independence.",
        "events": ["kenya-independence", "mau-mau-uprising"]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [[36.8, -1.3], [39.7, -4.0], [40.0, -2.5]]
      },
      "properties": {
        "id": "swahili-trade-route",
        "name": "Swahili Coast Trade Route",
        "type": "trade_route",
        "historical_periods": ["Pre-Colonial"],
        "description": "Ancient trade route connecting inland gold mines to coastal ports.",
        "events": []
      }
    }
  ]
}
```

### Event Sample
```json
{
  "events": [
    {
      "id": "kenya-independence",
      "title": "Kenya Gains Independence",
      "description": "Kenya achieved independence from British colonial rule on December 12, 1963, led by Jomo Kenyatta.",
      "date": "1963-12-12",
      "era": "Post-Colonial",
      "region": "Kenya",
      "coordinates": [36.8, -1.3],
      "sources": ["https://en.wikipedia.org/wiki/History_of_Kenya"],
      "category": "political"
    },
    {
      "id": "mau-mau-uprising",
      "title": "Mau Mau Uprising",
      "description": "Anti-colonial rebellion against British rule in Kenya from 1952 to 1960.",
      "date": "1952-10-20",
      "era": "Colonial",
      "region": "Kenya",
      "coordinates": [36.8, -1.3],
      "sources": ["https://www.britannica.com/event/Mau-Mau-rebellion"],
      "category": "military"
    }
  ]
}
```

## Performance Notes
- **WebGL Layers**: Use Mapbox's WebGL rendering for large datasets (>1000 points) to maintain <200ms lag on zoom/scrub.
- **Data Chunking**: Load timeline events in chunks (e.g., 50 events per era) and lazy-load map layers.
- **Animation Optimization**: Use D3's transition library with requestAnimationFrame for smooth animations; avoid heavy computations during scrub.
- **Caching**: Cache GeoJSON and event data in IndexedDB for offline access.
- **Mobile Considerations**: Reduce animation complexity on low-end devices; use touch-friendly scrubber.

## React Component API

```typescript
interface MapTimelineProps {
  geoJsonUrl: string; // URL to GeoJSON data
  eventsUrl: string; // URL to events JSON
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  onRegionClick?: (region: GeoJsonFeature) => void;
  onEventHover?: (event: EventData) => void;
  onTimelineScrub?: (date: Date) => void;
  filters?: {
    era?: string;
    region?: string;
  };
}

const MapTimeline: React.FC<MapTimelineProps> = ({
  geoJsonUrl,
  eventsUrl,
  initialCenter = [20, 0], // Africa center
  initialZoom = 3,
  onRegionClick,
  onEventHover,
  onTimelineScrub,
  filters,
}) => {
  // Component implementation using Mapbox and D3
  return (
    <div className="map-timeline-container">
      <div id="map" className="map-container" />
      <div className="timeline-container">
        <TimelineScrubber onScrub={onTimelineScrub} />
        <EventFilters filters={filters} />
      </div>
    </div>
  );
};

export default MapTimeline;
```

## Accessibility Fallback
- **List View**: If map fails to load (e.g., no WebGL support), render a scrollable list of regions and events.
- **Keyboard Navigation**: Arrow keys for timeline scrub, Enter to select regions/events.
- **Screen Reader Support**: ARIA labels for map regions and timeline elements; describe animations verbally.
- **High Contrast**: Ensure event cards and map overlays meet WCAG AA contrast ratios.

## Acceptance Criteria
- Map supports zoom (up to level 10), click interactions, and timeline scrubbing with <200ms lag on modern devices (tested on Chrome 90+, Firefox 88+).
- All features load within 3 seconds on 4G connection.
- Component gracefully degrades on unsupported browsers (fallback to static map image + list).
