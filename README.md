# RoadSoS

**Documentation Navigation:** 
[📋 Product Requirements (PRD)](PRD.md) • [🏗️ System Architecture](ARCHITECTURE.md) • [🛡️ Security Policy](SECURITY.md) • [🤝 Code of Conduct](CODE_OF_CONDUCT.md)

RoadSoS is a simple emergency road assistance web app built for a hackathon demo. It uses Flask, SQLite, plain HTML, CSS, JavaScript, Leaflet.js, and OpenStreetMap.

## Features

- Home page with SOS and emergency service buttons
- Map with sample trauma centres, hospitals, police stations, ambulance services, towing services, puncture shops, showrooms, and emergency contacts
- Country selector with sample data for India, the United States, and the United Kingdom
- Rescue Priority Mode that ranks contacts using service type, estimated response time, and verification details
- Golden Hour Mode with a 60-minute action timer for bystanders
- Accident Report Builder that creates a short shareable emergency message
- Basic keyword chatbot with predefined emergency replies
- Static first-aid and road response guidance for CPR, bleeding, burns, fractures, scene safety, low network use, and vehicle rescue
- Browser local storage for cached emergency contacts and the latest loaded service data

## Requirements

- Python 3
- Flask

Install Flask:

```bash
pip install flask
```

## Run Locally

```bash
python app.py
```

Open this URL in your browser:

```text
http://127.0.0.1:5000
```

The SQLite database file `roadsos.db` is created automatically on the first run and filled with sample data.

## Project Structure

```text
RoadSoS/
  app.py
  roadsos.db
  templates/
    base.html
    index.html
    map.html
    chat.html
    guidance.html
  static/
    css/
      style.css
    js/
      main.js
  README.md
```

## Project Documentation

Detailed project specifications, architectural designs, and protocols can be found here:

- [Product Requirement Document (PRD)](PRD.md): Product scope, vision, target audience, and roadmap.
- [System Architecture & Workflows](ARCHITECTURE.md): Structural blocks, database schemas, and client-server flowcharts.
- [Security Policy](SECURITY.md): Sanitization logic, query structures, and SQLi/XSS mitigations.
- [Code of Conduct](CODE_OF_CONDUCT.md): Contribution guidelines and standards.

## Demo Keywords For Chat

Try typing:

- golden hour
- bleeding
- fracture
- burns
- CPR
- trauma
- hospital
- police
- ambulance
- towing
- puncture
- showroom
- offline

## Unique Methods Included

- Golden Hour Mode: Starts a simple 60-minute timer and reminds users of the most important first actions.
- Rescue Priority Score: Ranks contacts using category importance and estimated response time.
- Accident Report Builder: Generates a short message containing injury level, needed service, and location/landmark.
- Low-Network Cache: Stores emergency contacts and services in browser local storage after first load.
- Global Sample View: Demonstrates how the same platform can work across countries with local emergency numbers.

## Notes

This project intentionally avoids authentication, paid APIs, Docker, AI model training, and heavy dependencies so second-year engineering students can understand and present it easily.
