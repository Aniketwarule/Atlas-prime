# AtlasPrime

AtlasPrime is an AI-powered travel planner built with React and Vite.
It generates detailed itineraries, discovers nearby activities, supports curated destination templates, and exports complete trip plans to PDF.

## Overview

AtlasPrime provides two planning paths:

- Custom Trip Planner: a 3-step wizard that generates personalized itineraries and enriches them in multi-stage AI passes.
- Discover: a mood-and-activity driven recommendation flow for nearby experiences.

The app uses browser caching for persistence (no Firestore required in active create/view flows), so trips remain available across reloads for a limited retention window.

## Core Features

- Multi-stage AI trip generation:
	- Stage 1: itinerary
	- Stage 2: hotels/hostels + transport
	- Stage 3: costs + local experiences + travel hacks
- Discover mode with guided form + activity chips + smart ranking.
- Google Places autocomplete in planning and discover flows.
- Destination cards with curated hardcoded trips as reliable fallback.
- Browser-based trip persistence (summary cache + full trip documents).
- PDF export with structured sections and cost formatting normalization.
- Light/Dark theme support with persisted theme preference.

## Tech Stack

- Frontend: React 18, React Router 7, Vite 6
- Styling/UI: Tailwind CSS, custom UI components, Lucide icons, Sonner toasts
- AI: Google Generative AI SDK (`gemini-3-flash-preview`)
- Location/Media: Google Places API (Autocomplete + place details)
- Export: jsPDF + jspdf-autotable
- State/Persistence: React state + `localStorage`

## Runtime Architecture

### Routing

Defined in `src/main.jsx`:

- `/` Home landing page
- `/create-trip` Trip creation wizard
- `/discover` Discover recommendations workflow
- `/destinations` Curated + previously planned trip cards
- `/view-trip/:tripId` Trip detail + staged enrichment view

### Data Flow

1. User submits planner form in `src/create-trip/index.jsx`.
2. Stage 1 AI output is generated via `generateContent` from `src/service/AIModel.jsx`.
3. Trip document is persisted to browser cache (`upsertTripDocumentInCache`).
4. Summary card is persisted for destinations listing (`savePlannedTripToCache`).
5. User is navigated to `/view-trip/:tripId`.
6. View page loads cached trip document, then triggers Stage 2 and Stage 3 enrichments and writes updates back to cache.
7. Final trip can be exported to PDF from the hero section.

## Caching Model

Implemented in `src/lib/tripCache.js`.

- `atlasprime:planned-trips-cache`: summary cards for Destinations page.
- `atlasprime:trip-documents-cache`: full trip documents used by View Trip.
- TTL: 14 days for both cache families.
- Limits:
	- Summary cards: 24 entries
	- Full trip documents: 48 entries

## AI Prompting

Prompt templates are in `src/constants/options.jsx`:

- `PROMPT_STAGE_1`
- `PROMPT_STAGE_2`
- `PROMPT_STAGE_3`

These templates enforce JSON-only responses and structured output contracts consumed by the app.

## PDF Export

Implemented in `src/lib/tripPdf.js` and triggered from `src/view-trip/components/InformationSection.jsx`.

Included sections:

- Trip overview
- Highlights
- Day-wise itinerary
- Hotels/hostels
- Transport
- Cost breakdown
- Local experiences
- Travel hacks

The PDF layer normalizes currency/whitespace and optimizes cost column rendering for better readability.

## Discover Module

Main UI: `src/discover/index.jsx`

- 3-step discover flow
- Activity chip selection with search, keyboard interactions, and quick picks
- Mood/companion/energy/time/radius filters
- Places-based location input

## Curated Destination Fallbacks

Curated destination data and itinerary generation helpers are in `src/constants/hardcodedTrips.js`.

The app can render curated trips if a user opens a known destination id or when live generation context is unavailable.

## Project Structure

Important directories and files:

- `src/main.jsx`: router + app bootstrap
- `src/create-trip/index.jsx`: planner wizard and Stage 1 generation
- `src/view-trip/[tripId]/index.jsx`: staged enrichments and trip rendering
- `src/discover/index.jsx`: discover planner flow
- `src/destinations/index.jsx`: curated and cached trip cards
- `src/lib/tripCache.js`: cache persistence layer
- `src/lib/tripPdf.js`: itinerary PDF generation
- `src/service/AIModel.jsx`: Gemini model setup and message generation
- `src/service/GlobalApi.jsx`: Google Places lookup and photo APIs
- `src/constants/options.jsx`: trip prompts and selection metadata
- `src/constants/hardcodedTrips.js`: curated trip content/fallback generator
- `src/context/ThemeContext.jsx`: theme persistence and toggling

## Environment Variables

Create `.env.local` in the project root with:

```env
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
```

Notes:

- `VITE_GOOGLE_PLACE_API_KEY` is used for autocomplete, place details, and destination photos.
- `VITE_GOOGLE_GEMINI_AI_API_KEY` is used for itinerary/discover generation.
- Do not commit real API keys to source control.

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Configure environment

Create `.env.local` as shown above.

### 3. Run development server

```bash
npm run dev
```

### 4. Build production bundle

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

From `package.json`:

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run preview`: preview built app
- `npm run lint`: run ESLint
- `npm run start`: legacy CRA script (not used by Vite runtime)
- `npm run test`: legacy CRA test script
- `npm run eject`: legacy CRA eject script

## Troubleshooting

### Places requests blocked (`ERR_BLOCKED_BY_CLIENT`)

Usually caused by browser privacy/ad-block extensions.

- Allowlist Google Maps/Places domains for localhost.
- Disable blocking extension for local development.

### No trip found on view page

- Confirm the trip was generated in the same browser profile.
- Cache is local to browser and expires after retention window.

### AI output parse failures

- Ensure API key is valid and has access to selected model.
- Check browser console for malformed/non-JSON AI responses.

## Current Persistence Mode

Trip creation and trip view enrichment are currently cache-backed and do not require Firestore.

If you later reintroduce backend persistence, update:

- `src/create-trip/index.jsx`
- `src/view-trip/[tripId]/index.jsx`
- `src/lib/tripCache.js`

## Contribution Notes

- Keep prompt JSON contracts stable when changing AI templates.
- Preserve cache shape compatibility for older saved trips.
- Validate with `npm run build` before pushing changes.

