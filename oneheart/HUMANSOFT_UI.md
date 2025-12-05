# HUMANSOFT UI

High-level UI design for OneHeart's human-facing apps (web/mobile). This file records the feature groups, primary screens and recommended next steps for prototyping.

## Player Dashboard

- XP Tree
  - Goal: show progression, skill branches, and next actions to level up.
  - Key elements: current level, XP bar, available skill nodes, suggested tasks.

- Quest Log
  - Goal: list active/available/completed quests with quick actions (start, submit proof, request help).
  - Key elements: filters (local/global), status badges, due dates, reward preview.

- Impact Summary
  - Goal: concise view of user's verified impact — Heart Tokens balance, Impact Credits earned, recent contributions.
  - Key elements: charts (weekly impact), top missions, leaderboard position.

## World Screen

- Map Layer
  - Interactive map showing seeded zones, missions and user location.
  - Tech: GeoJSON seed, Leaflet/Mapbox for prototype.

- Zone Indicators
  - Visual markers for `Tourism Points`, `Needs Areas`, `Community Nodes` with quick stats and actions.

- Events Overlay
  - Time-limited events and crisis overlays; toggles to filter event types or safety warnings.

## Shop Interface

- Token Exchange
  - Convert Heart Tokens to marketplace spend or redeem sponsor-subsidized items.

- Reward Previews
  - Item cards with images, token price, supplier info and estimated fulfillment time.

- Sponsor Items
  - Special sponsored items or vouchers with eligibility rules or co-pay options.

## Guild Center

- Party Formation
  - Create/join parties for cooperative missions, manage roles and invites.

- Raid Board
  - Time-limited group missions with signups, slots and roles.

- Results Feed
  - Show party outcomes, raid leaderboards, and team rewards.

## Prototype & Implementation Plan

1. Create low-fidelity wireframes for Player Dashboard and World Screen (Figma recommended). Keep designs mobile-first.
2. Produce GeoJSON seed and a static Leaflet preview page for `oneheart/web/ui-demo/map.html`.
3. Build a small demo site under `oneheart/web/ui-demo/` containing:
   - `index.html` (dashboard shell)
   - `map.html` (Leaflet map with seed zones)
   - minimal CSS and JS to demonstrate interactions (open/close quest, view reward card)
4. Connect the demo to backend endpoints (`/api/proof`, missions) for submit/view flows once APIs are stable.

## Files to add (suggested)

- `oneheart/web/ui-demo/index.html` — Dashboard shell (static)  
- `oneheart/web/ui-demo/map.html` — Leaflet map demo  
- `oneheart/web/ui-demo/styles.css`  
- `oneheart/web/ui-demo/app.js` — sample interactions and fetch stubs

---
When you want, I can generate the demo files (HTML/CSS/JS + sample GeoJSON) and add them to the repository so you can open `oneheart/web/ui-demo/map.html` in a browser.
