# WORLD MAP ENGINE

This document captures the high-level structure for the World Map Engine: zones, special areas, and the hierarchical World Mission Map.

## Local Zones

- Tourism Points
  - Description: places of cultural or natural interest used for micro-tasks (guide, clean-up, local storytelling).
  - Fields: `id`, `name`, `lat`, `lng`, `category`, `accessibility`, `partners`, `verification_rules`.

- Needs Areas
  - Description: neighborhoods or sites with local needs (food distribution, maintenance, elder support).
  - Fields: `id`, `name`, `lat`, `lng`, `needs_type`, `priority`, `local_contacts`.

- Community Nodes
  - Description: established community centers, NGOs, or volunteer groups that coordinate local missions.
  - Fields: `id`, `name`, `lat`, `lng`, `org_type`, `capacity`, `contact_info`.

## Special Zones

- Crisis Zones
  - Description: temporarily flagged areas for emergencies (flood, fire, disease) with safety and verification protocols.
  - Rules: restrict certain mission types, require extra verification, route rewards through emergency funds.

- Event Zones
  - Description: short-term event locations (festivals, sports events) with time-limited missions and scaled reward multipliers.

- Eco-Restoration Zones
  - Description: areas targeted for restoration missions (tree planting, habitat cleanup) with long-term impact tracking.

## World Mission Map (hierarchy)

- Cultural Missions
  - R&D Missions
    - Sports Training Missions
      - Global Social Missions

Notes on hierarchy:
- Missions are defined as templates (title, objective, reward, verification criteria) and mapped to zones.
- Higher-level missions aggregate and report impact from many local mission completions (e.g., Cultural Missions aggregate Tourism Points activities).

## Suggested data model (minimal)

- `zones` table/base: `id, name, type, lat, lng, metadata(json)`
- `missions` table/base: `id, template_id, zone_id, status, assigned_to, starts_at, ends_at, reward_tokens`
- `mission_templates` table: `id, name, description, verification_rules, reward_structure`

## Pilot steps (practical)

1. Seed an Airtable or simple CSV with 20 local zones (mix of Tourism Points, Needs Areas, Community Nodes) for one city.
2. Create 5 mission templates (one per category) and map them to the seeded zones.
3. Run a 2-week micro-pilot: recruit 10 participants, assign missions manually, collect evidence via existing `Proof Layer` endpoints.
4. Measure impact: completions, verification success rate, participant satisfaction, and local partner feedback.

## Next steps (options)

- Visualize seed data as GeoJSON and show in a simple Leaflet/Mapbox map (static HTML) for partners.
- Create quick Airtable base and Typeform intake for zone reports and community-driven zone suggestions.
- Define emergency rules for Crisis Zones and gating for Event Zones (time windows, capacity limits).

---
File created by project assistant — can expand into `worldmap/geojson/` and a simple `worldmap/visualization/index.html` when you want a map preview.
