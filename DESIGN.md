# Design System: LinkSphere + Siraji Admin

## Overview
Dual-app design system: LinkSphere (social media, `/`) is 100% Facebook-like with clean minimal design. Siraji Admin Panel (`/admin`) uses professional dark-theme dashboard with teal/purple analytics accents. Both apps use OKLCH color tokens, enforce AA+ contrast in light & dark modes.

## LinkSphere (User App, `/`)

### Purpose & Aesthetic
Facebook-like social media: posts, stories, reels, profiles. Tone: clean, minimal, functional. Facebook blue (#1877F2) primary, white cards, light grey (#F0F2F5) background. No decoration, no gradients. Mobile-native bottom tab navigation (Feed, Reels, Friends, Notifications, Profile). Desktop sidebar layout. Pure content-first design.

### LinkSphere Color Palette (Light/Dark)

| Token         | Light           | Dark            | Purpose                    |
|---------------|-----------------|-----------------|----------------------------|
| Primary       | 0.54 0.22 254   | 0.62 0.24 254   | Facebook blue, links, CTAs |
| Secondary     | 0.5 0.15 254    | 0.58 0.2 254    | Supporting, secondary use  |
| Accent        | 0.54 0.22 254   | 0.65 0.24 254   | Highlights, FAB, active    |
| Background    | 0.973 0.002 0   | 0.11 0.01 282   | Page bg (#F0F2F5)          |
| Card          | 1.0 0 0         | 0.16 0.01 282   | Pure white cards           |
| Muted         | 0.9 0.004 0     | 0.28 0.01 282   | Secondary text, borders    |
| Destructive   | 0.55 0.22 25    | 0.65 0.19 22    | Delete, error states       |

### LinkSphere Zones

| Zone              | Light Treatment                              | Dark Treatment                         |
|-------------------|----------------------------------------------|----------------------------------------|
| Header            | White bg, blue text/icons, soft 1px border   | Dark bg (0.16L), blue icons             |
| Mobile Nav (5 tab) | Bottom sticky, white bg, blue active text    | Dark bg (0.16L), blue active text       |
| Cards             | Pure white, soft 1px shadow, 8px radius      | 0.16L bg, minimal border, small shadow  |
| Stories Bar       | Horizontal scroll, white container, blue ring | Same, dark bg (0.19L)                   |
| Post Content      | White card, 16px padding, soft shadow        | 0.16L card, subtle border               |

## Siraji Admin Panel (`/admin`)

### Purpose & Aesthetic
Admin dashboard for LinkSphere content control. Tone: professional, minimal, data-dense. Dark sidebar (0.14L) + deep indigo bg (0.11L). Teal (180°) + purple (260°) chart accents. Stats cards, data tables, analytics charts. High information density, no decoration.

### Siraji Color Palette (Admin Dark Only)

| Token         | Admin Dark      | Purpose                    |
|---------------|-----------------|----------------------------|
| Primary       | 0.62 0.22 260   | Primary actions, focus     |
| Secondary     | 0.68 0.24 180   | Teal accent (analytics)    |
| Background    | 0.11 0.008 282  | Deep indigo page bg        |
| Card          | 0.15 0.01 282   | Stat cards, table bg       |
| Sidebar       | 0.14 0.008 282  | Left nav, very dark        |
| Border        | 0.2 0.008 282   | Dividers, subtle grid      |
| Chart 1 (Teal) | 0.58 0.28 180   | Line/bar chart primary     |
| Chart 2 (Purple) | 0.62 0.24 260 | Line/bar chart secondary   |

### Siraji Zones

| Zone              | Treatment                                          |
|-------------------|---------------------------------------------------|
| Sidebar           | 0.14L, left sticky, icons + labels, 280px width   |
| Header            | 0.15L bg, user profile, logout, breadcrumb        |
| Stat Cards        | 0.15L bg, 1px subtle border, 1.5rem padding       |
| Data Tables       | 0.2L header row, striped 0.15L rows, hover lift    |
| Charts            | Teal/purple/coral palette, minimal grid           |
| Content           | 0.11L background, grid 24px gutters               |

## Shared Typographic System

| Tier      | Font                | Size  | Weight | Use                    |
|-----------|---------------------|-------|--------|------------------------|
| Display   | Bricolage Grotesque | 32px  | 700    | Hero, major headers    |
| Heading   | Bricolage Grotesque | 20px  | 700    | Section titles         |
| Body      | General Sans        | 14px  | 400    | Main content           |
| Label     | General Sans        | 12px  | 500    | UI labels              |
| Mono      | Geist Mono          | 13px  | 400    | Code, timestamps       |

## Motion & Interaction
LinkSphere: Fade-in load, slide-in cards, 0.25s tab switch. No decorative motion. Focus on content. Siraji: Subtle pulse on stat updates, smooth row hover, 0.2s focus ring on table rows.

## Component Patterns
- **Buttons**: LinkSphere solid blue (#1877F2); Siraji uses teal/purple
- **Cards**: LinkSphere pure white with 1px soft shadow; Siraji dark cards with borders
- **Tables**: Siraji data-table class with striped rows, header highlight, hover state
- **Icons**: Blue on white (LinkSphere); white/teal on dark (Siraji)

## Constraints & Rules
- No hex colors or arbitrary tailwind classes — OKLCH tokens only
- LinkSphere light mode primary, dark available. Siraji admin-dark class only
- Min AA+ contrast: foreground-on-background ≥0.7 lightness diff
- Cards: 16px padding, 12px gaps. Mobile 375px+, desktop 768px+
- No decorative gradients. Facebook-clean aesthetic.

## Signature Details
LinkSphere: Blue underline (3px) on active tab. White cards on grey background. Zero decoration. Siraji: Teal highlight on active sidebar, stat card elevation on hover.

---

**Status**: Complete. Dual-app system ready for frontend implementation.
