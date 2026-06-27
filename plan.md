# ZEUS FF JOURNAL - Implementation Plan

## Scope Summary
Build a comprehensive Free Fire companion platform (ZEUS FF JOURNAL) with a premium gaming UI. Key features include news, player tools, guides, redeem codes, events, and a full admin/user system.

**Non-Goals:**
- Real-time game integration (unless public APIs exist; otherwise, data is admin-managed).
- Payment processing.
- Actual game hosting.

## Assumptions & Open Questions
- **Persistence:** Since this is a "no-database/no-supabase" session, all persistence will be handled via `localStorage` for standard users. For the Admin system, we will use a "Mock Backend" approach where state is initialized from a `mockData.ts` file and persisted to `localStorage` during the session.
- **Admin Access:** The initial Super Administrator (Zeus) will have a hardcoded credential check against the provided email (`ge5853987@gmail.com`) in the mock auth layer.
- **Real Player Search:** Without an official Garena API key (which is restricted), the "Real Player Search" will be implemented as a robust UI that searches a local "Verified Players" dataset. If not found, it shows the required "No player information found" message.

## Affected Areas
- **Frontend:** React + Tailwind CSS + Lucide icons.
- **Routing:** React Router for navigation between Home, Search, Redeem, Events, News, Guides, Tournaments, Admin, and User Profile.
- **State Management:** Context API or simple hooks + `localStorage`.
- **UI Components:** Shadcn/ui (already present in `src/components/ui`).

## Ordered Phases

### Phase 1: Foundation & Theme
- Set up project structure and routing.
- Implement the "Premium Gaming" theme (Dark mode, blue/orange neon accents, custom CSS for animations).
- Create Layout wrapper (Navbar, Sidebar, Footer with owner details).
- **Owner:** `frontend_engineer`

### Phase 2: Mock Data & Services
- Create `src/services/mockData.ts` to hold initial data for News, Events, Guides, Redeem Codes, and "Verified Players".
- Implement service layer functions to CRUD this data from `localStorage`.
- **Owner:** `frontend_engineer`

### Phase 3: Core Public Pages
- **Home Page:** All required sections (Featured Banner, Trending, etc.).
- **Player Search:** Functional search logic with loading states.
- **Redeem Code Center:** Active/Expired filters, copy logic, region filters.
- **News/Guides/Events/Tournaments:** Listing and detail views.
- **Owner:** `frontend_engineer`

### Phase 4: User & Admin Systems
- **User System:** Login/Register forms, Profile page, Bookmarks logic.
- **Admin Dashboard:** Secure route for Zeus.
- **Management Modules:** Full CRUD for News, Codes, Events, Users, and Site Settings.
- **Owner:** `frontend_engineer`

### Phase 5: Polish & Extra Features
- Daily Missions UI.
- Global Search functionality.
- Smooth transitions and loading animations.
- SEO meta tags and responsive testing.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup theme, routing, and all core functional pages/logic.
2. quick_fix_engineer — Final UI polish, animations, and bug fixes.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** 
    - Initialize React Router.
    - Configure Tailwind for neon blue (`#00f2ff`) and orange (`#ff8c00`) accents.
    - Build `src/services/storage.ts` to manage `localStorage` persistence for news, codes, and users.
    - Implement the Super Admin check for `ge5853987@gmail.com`.
    - Create all functional pages: Home, Search, Redeem Center, Events, News, Guides, Tournaments, Login, Profile, and Admin Dashboard.
- **Files:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/components/*`, `src/pages/*`, `src/services/*`.
- **Depends on:** none
- **Acceptance criteria:** All navigation works; Admin can add a redeem code and it appears in the public center; Player search shows "No data" for unknown UIDs; Mobile layout is responsive.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** 
    - Add Framer Motion (if available) or CSS transitions for animated cards.
    - Audit all copy (ensure owner details in footer match prompt).
    - Fix any overlapping text on mobile.
    - Ensure "Copy" button on redeem codes shows a "Copied!" toast.
- **Files:** `src/index.css`, `src/components/ui/sonner.tsx`, Various component files.
- **Depends on:** frontend_engineer
- **Acceptance criteria:** Animations are smooth; no visual regressions; mobile UI is perfect.
