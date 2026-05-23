# Keshab Room Rent — Premium Living in North Guwahati

A premium, modern web application for **Keshab Room Rent**, showcasing available room styles, features, and resident reviews. Located in Baruah Souk, North Guwahati (near the IIT Guwahati campus), this site offers an optimized, high-fidelity experience for prospective bachelors, students, and families looking for accommodations.

---

## 🚀 Modern Performance Tech Stack

This project was upgraded to use a state-of-the-art interactive front-end pipeline:

* **React + Vite:** Ultra-fast, hot-reloading development server and optimized bundle generation.
* **Tailwind CSS v4:** A CSS-first utility styling implementation, mapping an earthy, premium linen-and-sage color palette natively using modern theme variables.
* **Lenis Smooth Scroll:** Delivers momentum-based inertial scrolling across viewports, yielding a fluid, native app-like experience.
* **Framer Motion:** Powers all micro-animations, stagger entries, viewport scroll triggers, spring hovers, and `<AnimatePresence>` modal overlays.

---

## ✨ Key Features

1. **Cinematic Hero Landing:** Featuring a slow-zoom parallax building preview and fade-in heading stagger variants.
2. **Interactive Room Details:** Categorized room rentals (Single Room, Sharing Room, Family Room) with custom hover lifts.
3. **Amenities & Badges:** A responsive list showcasing shared, parking, and building utilities.
4. **Lightbox Gallery Modal:** A grid of property photos with scale-and-fade animation overlays during entry/exit transitions.
5. **AI Chatbot Assistant:**
   * **Vanishing Options:** Interactive suggestion chips that automatically vanish from the view once the user has sent their first query.
   * **Info Isolation:** Strict responses containing *only* requested details (e.g. price questions return rents only, location questions return map link only).
   * **Scroll Prevention:** Prevents Lenis scroll conflicts using `data-lenis-prevent` for smooth, uninterrupted chat log tracking.
6. **Owner Profile Dashboard:** An administrative co-owner profile display with local storage sync, text mask security toggles, and live profiles editor.
7. **SEO Optimization:** Compelling description tags, semantic layout markup, and performance load speed optimizations.

---

## 🛠️ Development & Installation

Ensure you have [Node.js](https://nodejs.org) installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Runs the server locally on [http://localhost:5173](http://localhost:5173).

### 3. Run Linter Validation
```bash
npm run lint
```
Checks files for JavaScript syntax, hooks usage, and unused variables.

### 4. Build Production Bundle
```bash
npm run build
```
Compiles and generates optimized assets in the `/dist` directory for production deployment.
