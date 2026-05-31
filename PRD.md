# Product Requirement Document (PRD) - RoadSoS

## 1. Vision & Objectives
**RoadSoS** is a location-first emergency road assistance application built to minimize response times during the critical "Golden Hour" (the first 60 minutes after a road accident). 

The goal of the platform is to empower bystanders, victims, and drivers with immediate, offline-capable access to verified local emergency resources—such as trauma centres, ambulance providers, police stations, and towing services—without requiring user authentication or paid API dependencies.

---

## 2. Target Users
* **Bystanders / Good Samaritans:** Citizens who witness a road accident and need immediate first-aid instructions and verified local emergency numbers.
* **Accident Victims:** Individuals involved in a crash who need to quickly determine their location, contact services, and share a structured report.
* **Drivers & Travelers:** Road users seeking nearby vehicle rescue, showrooms, or tyre repair shops in unfamiliar territory.

---

## 3. Scope & Key Features

### 3.1. Live Emergency Map (Location-First UI)
* **Description:** A responsive, interactive map showing emergency and support services based on the user's selected country and current location.
* **Specifications:**
  * Powered by OpenStreetMap (OSM) and Leaflet.js to avoid paid Google Maps API keys.
  * Filters for: Trauma Centres, Hospitals, Police Stations, Ambulance Services, Towing Services, Puncture Shops, Showrooms, and National Contacts.
  * Pinpoints nearest emergency services with customized markers.

### 3.2. Rescue Priority Score (Ranking System)
* **Description:** A smart service ranking mechanism that ranks nearby emergency services so users don't waste time calling distant or low-priority numbers.
* **Specifications:**
  * Ranks list based on **Category Priority** (e.g., Trauma Centres rank higher than General Hospitals) and **Response Minutes** (lower response time = higher rank).
  * Prominently displays verified badge and the date of last verification.

### 3.3. Golden Hour Response Timer
* **Description:** A prominent, active countdown timer reminding users of the critical 60-minute window for trauma care.
* **Specifications:**
  * Starts a 60-minute timer.
  * Shows step-by-step scene safety and medical priority alerts (e.g., Secure scene ➡️ Call numbers ➡️ Control bleeding).

### 3.4. Accident Report Builder
* **Description:** A simple, form-based message generator that creates a formatted, shareable emergency SMS or chat text.
* **Specifications:**
  * Dropdowns for Injury Level (Minor, Serious, Unconscious) and Service Need.
  * Text box for location or landmarks.
  * Generates a ready-to-copy text like: `[EMERGENCY] Road accident reported at Connaught Place. Status: Serious injuries. Need ambulance and police. Please send help immediately.`

### 3.5. AI Chatbot Helper
* **Description:** A low-latency chatbot providing instant first-aid response guidelines.
* **Specifications:**
  * Responds to keywords: `golden hour`, `bleeding`, `fracture`, `cpr`, `burns`, `towing`, `puncture`, and `offline`.
  * Returns concise, easy-to-follow diagnostic checklists.

### 3.6. Low-Network Local Storage Cache
* **Description:** Stores critical numbers locally to ensure functionality in regions with poor mobile network connectivity.
* **Specifications:**
  * Automatically caches the list of services and emergency contacts in the browser's `localStorage` on the first successful load.
  * Renders contacts offline directly from the browser cache when server calls fail.

---

## 4. Technical Constraints & Design Principles
* **No Authentication Required:** In an emergency, every second counts. Users must be able to access the tool instantly without logging in or signing up.
* **Lightweight Dependencies:** Avoid heavy frontend frameworks and commercial APIs. Ensure the app loads rapidly even on low-speed (2G/3G) cellular networks.
* **Local Data Sovereignty:** Run database storage locally on SQLite, ensuring ease of deployment for demonstrations.

---

## 5. Future Roadmap
* **Auto-GPS Location Detection:** Integrate HTML5 Geolocation API to auto-center the map on load.
* **SMS Gateway Integration:** Implement direct SMS sending capabilities using Twilio or native web sharing links.
* **Multilingual Support:** Localize first-aid instructions into regional Indian languages (Hindi, Tamil, Telugu, etc.).
