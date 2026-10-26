# BSAOS Brand UI Refresh

## Direction
Align the interface with the official Brainy Stars identity: purple, green, and white. The target user is the Academic In-Charge, so the experience should prioritize daily operations and academic monitoring without removing specialist modules.

## Brand tokens
- Primary purple: #602A73
- Dark purple: #49205A
- Primary green: #59AC43
- Dark green: #438632
- Soft purple surface: #F4EDF7
- Soft green surface: #EDF7E9
- Canvas: #F8F7FA
- Border: #E8E2EB

These values are approximate starting points based on the supplied logo and should be calibrated against the original image asset.

## Scope of this first pass
- Add a global brand layer that recolors existing Tailwind utility accents without changing component structure or routes.
- Refine base surfaces, focus visibility, selection styling, scrollbar and table styling.
- Update document title, description and browser theme color.
- Add a simple brand-coloured favicon.

## Not included yet
- Embedding the exact supplied Brainy Stars logo asset in the sidebar/header. The original image file must be added to the repository's public assets before the existing brand mark can be replaced with the authentic artwork.
- Reorganising sidebar groups and dashboard layout.
- Changing application logic, data flows, authentication, persistence, or campus permissions.

## Verification
Run `npm run lint`, `npm test`, `npm run validate:config`, and `npm run build`. Review desktop and narrow viewport layouts, especially buttons, warning states, and any components using teal/emerald as semantic status colours. The current app remains demo-only.
