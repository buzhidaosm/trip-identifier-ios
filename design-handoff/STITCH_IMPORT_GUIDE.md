# Stitch / Figma Import Guide

## Best Route

Use Stitch for ideation and screen expansion, then use Figma as the final source of truth before Xcode implementation.

Recommended path:

1. Open Stitch and create a mobile app design project.
2. Add the current HTML mockup or screenshots as visual context.
3. Paste the product brief and component IDs from `DESIGN.md`.
4. Ask Stitch to preserve component names and generate variants only for the requested screen.
5. Export to Figma for precise editing, variants, spacing, color styles, and handoff.
6. Send the final Figma link or exported inspect assets back to Codex.

## Prompt To Paste Into Stitch

```text
Create and refine a mobile app UI for Tomato, a net-income assistant for rideshare/delivery drivers.

Use the attached/current Home mockup as the baseline. Preserve the product structure and component names from DESIGN.md. The app needs two variants of the same Home screen: night/in-car dark mode and daytime light mode.

Priorities:
- Fast scanning while driving or between trips.
- Strong contrast for net income, costs, online status, and trip recommendation.
- Compact operational UI, not a marketing landing page.
- Keep components stable: Topbar, ShiftCard, GoalCard, TripCard, TabBar.

Do not redesign unrelated areas unless explicitly requested.
When changing colors, spacing, typography, or state styles, describe the exact component ID and token affected.
```

## What To Export Back

Minimum useful handoff:

- Final screenshot for each screen and mode.
- Figma link or Stitch project link.
- Notes for changed components using stable IDs.

Best handoff:

- Figma file with named frames and components.
- Color styles and text styles.
- Component variants for dark/light and selected/unselected states.
- Inspect values for spacing, radius, shadows, and font sizes.
- Exported assets for icons or custom illustrations.

## Naming Convention

Use this naming pattern inside Figma:

```text
Screen / Component / Variant / State
```

Examples:

```text
Home / ShiftCard / Dark / Online
Home / ShiftCard / Light / Online
Home / GoalCard / Dark / Default
Home / TabBar / Light / HomeActive
```

