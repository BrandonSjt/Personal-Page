# Personal Page Design

Date: 2026-06-21
Project: My Page
Target folder: D:\PERSONAL PAGE

## Goal

Build a single-page personal website for a student focused on web and AI. The page should be ready to push to GitHub and run on GitHub Pages without a build step.

## Constraints

- All project changes stay inside `D:\PERSONAL PAGE`.
- Do not install dependencies or extra applications.
- Do not push to GitHub without explicit confirmation.
- Use a static HTML/CSS/JS architecture.
- Keep external dependencies at zero.
- Keep content in English.

## Audience

Visitors who want a quick understanding of the owner's learning focus, skills, and contact links.

## Architecture

The site will use these files:

- `index.html`: semantic page structure and English content.
- `styles.css`: Dark AI lab visual system, responsive layout, accessibility states, and reduced-motion rules.
- `script.js`: mobile navigation, active section highlighting, smooth nav behavior, and light hero effects.
- `README.md`: local preview and GitHub Pages deployment notes.
- `.gitignore`: minimal ignore rules for common local artifacts.

No framework, package manager, or build pipeline is required.

## Sections

- Home: Hero with `My Page`, student positioning, and two calls to action.
- About: Short profile focused on learning web interfaces, AI tools, and practical experiments.
- Skills: Compact skill groups covering Web, AI, and Workflow.
- Contact: Replaceable starter links for GitHub, LinkedIn, Email, and Instagram.

## Visual Direction

The page will use a Dark AI lab identity: a deep dark background, subtle grid lines, restrained cyan and violet accents, and a clean technical layout.

Signature element: a hero-side learning console that shows short status lines such as web, AI, experiments, and learning in public. It should feel like a lab interface without becoming noisy.

## Interaction

- Sticky navigation.
- Mobile menu for small screens.
- Active navigation state while scrolling.
- Smooth scrolling for section links.
- Clear hover and keyboard focus states.
- Reduced motion support for users who prefer less animation.

## Accessibility

- Semantic landmarks and sections.
- Sufficient color contrast.
- Keyboard-accessible navigation and links.
- Visible focus states.
- `prefers-reduced-motion` respected.

## Verification

- Confirm expected files exist in `D:\PERSONAL PAGE`.
- Preview locally using built-in tooling only if available.
- Inspect the page in a local browser preview if possible.
- Do not push to GitHub.

