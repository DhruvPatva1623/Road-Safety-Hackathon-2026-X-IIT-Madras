import os
import sqlite3

from flask import Flask, jsonify, render_template, request


app = Flask(__name__)
DATABASE = os.path.join(app.root_path, "roadsos.db")


SERVICE_TABLES = {
    "trauma_centres": "Trauma Centre",
    "hospitals": "Hospital",
    "police_stations": "Police Station",
    "ambulance_services": "Ambulance Service",
    "towing_services": "Towing Service",
    "puncture_shops": "Puncture Shop",
    "showrooms": "Vehicle Showroom",
    "emergency_contacts": "Emergency Contact",
}


SAMPLE_DATA = {
    "trauma_centres": [
        ("IN", "New Delhi", "AIIMS Trauma Centre", 28.5672, 77.2100, "+91 11 2659 4444", "South Delhi", "2026-05-01", 9, "Sample public trauma centre entry"),
        ("IN", "New Delhi", "Safdarjung Trauma Wing", 28.5687, 77.2042, "+91 11 2673 0000", "Ring Road", "2026-05-01", 12, "Sample hospital trauma wing"),
        ("US", "New York", "Bellevue Emergency Trauma", 40.7394, -73.9760, "+1 212 562 4141", "Manhattan", "2026-04-15", 10, "Demo global sample"),
        ("GB", "London", "St Mary's Major Trauma Centre", 51.5175, -0.1739, "+44 20 3312 6666", "Central London", "2026-04-20", 11, "Demo global sample"),
    ],
    "hospitals": [
        ("IN", "New Delhi", "City Care Hospital", 28.6139, 77.2090, "+91 98765 10001", "Connaught Place", "2026-05-05", 14, "Verified by RoadSoS volunteer"),
        ("IN", "New Delhi", "Metro Emergency Hospital", 28.6202, 77.2167, "+91 98765 10002", "ITO", "2026-05-05", 16, "Verified by phone"),
        ("US", "New York", "NYC General Hospital", 40.7411, -73.9897, "+1 212 555 0101", "Midtown", "2026-04-18", 15, "Demo global sample"),
        ("GB", "London", "London Road Emergency Hospital", 51.5078, -0.1280, "+44 20 7946 0101", "Westminster", "2026-04-22", 17, "Demo global sample"),
    ],
    "police_stations": [
        ("IN", "New Delhi", "Central Police Station", 28.6155, 77.2115, "100", "Connaught Place", "2026-05-04", 8, "Official emergency number"),
        ("IN", "New Delhi", "North Traffic Police Booth", 28.6251, 77.2055, "+91 98765 20001", "Civil Lines", "2026-05-04", 10, "Demo traffic support point"),
        ("US", "New York", "Midtown Police Precinct", 40.7552, -73.9874, "911", "Midtown", "2026-04-18", 9, "Demo global sample"),
        ("GB", "London", "Westminster Police Station", 51.4975, -0.1357, "999", "Westminster", "2026-04-22", 9, "Demo global sample"),
    ],
    "ambulance_services": [
        ("IN", "New Delhi", "Rapid Ambulance Service", 28.6115, 77.2188, "108", "Central Delhi", "2026-05-05", 7, "Official emergency number"),
        ("IN", "New Delhi", "LifeLine Ambulance", 28.6190, 77.1985, "+91 98765 30001", "Karol Bagh", "2026-05-05", 11, "Verified by RoadSoS volunteer"),
        ("US", "New York", "NYC Emergency Medical Response", 40.7507, -73.9935, "911", "Manhattan", "2026-04-18", 8, "Demo global sample"),
        ("GB", "London", "London Ambulance Response", 51.5120, -0.1180, "999", "Central London", "2026-04-22", 8, "Demo global sample"),
    ],
    "towing_services": [
        ("IN", "New Delhi", "Quick Tow Roadside Help", 28.6177, 77.2033, "+91 98765 40001", "Central Delhi", "2026-05-03", 18, "Verified by phone"),
        ("IN", "New Delhi", "Highway Towing Support", 28.6092, 77.2195, "+91 98765 40002", "Ring Road", "2026-05-03", 22, "Demo vehicle rescue provider"),
        ("US", "New York", "Manhattan Towing Help", 40.7484, -73.9857, "+1 212 555 0401", "Manhattan", "2026-04-18", 20, "Demo global sample"),
        ("GB", "London", "London Vehicle Recovery", 51.5033, -0.1195, "+44 20 7946 0401", "Central London", "2026-04-22", 21, "Demo global sample"),
    ],
    "puncture_shops": [
        ("IN", "New Delhi", "24x7 Tyre Puncture Point", 28.6168, 77.2146, "+91 98765 50001", "Connaught Place", "2026-05-02", 13, "Roadside repair sample"),
        ("IN", "New Delhi", "Express Tyre Repair", 28.6042, 77.2108, "+91 98765 50002", "India Gate", "2026-05-02", 15, "Roadside repair sample"),
        ("US", "New York", "Midtown Tyre Assist", 40.7520, -73.9810, "+1 212 555 0501", "Midtown", "2026-04-18", 16, "Demo global sample"),
        ("GB", "London", "Central Tyre Rescue", 51.5098, -0.1342, "+44 20 7946 0501", "Soho", "2026-04-22", 16, "Demo global sample"),
    ],
    "showrooms": [
        ("IN", "New Delhi", "Capital Motors Service Desk", 28.6212, 77.2131, "+91 98765 60001", "Central Delhi", "2026-05-02", 25, "Vehicle support sample"),
        ("IN", "New Delhi", "Urban Auto Showroom Support", 28.6081, 77.1997, "+91 98765 60002", "Janpath", "2026-05-02", 27, "Vehicle support sample"),
        ("US", "New York", "NY Auto Road Desk", 40.7462, -73.9980, "+1 212 555 0601", "Chelsea", "2026-04-18", 26, "Demo global sample"),
        ("GB", "London", "London Auto Assist Desk", 51.5151, -0.1410, "+44 20 7946 0601", "Mayfair", "2026-04-22", 26, "Demo global sample"),
    ],
    "emergency_contacts": [
        ("IN", "National", "India Ambulance", 28.6139, 77.2090, "108", "All India", "2026-05-01", 5, "National emergency contact"),
        ("IN", "National", "India Police", 28.6139, 77.2090, "100", "All India", "2026-05-01", 5, "National emergency contact"),
        ("US", "National", "United States Emergency", 40.7128, -74.0060, "911", "All United States", "2026-04-01", 5, "National emergency contact"),
        ("GB", "National", "United Kingdom Emergency", 51.5072, -0.1276, "999", "All United Kingdom", "2026-04-01", 5, "National emergency contact"),
    ],
}


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_column(cursor, table, name, definition):
    columns = [row[1] for row in cursor.execute(f"PRAGMA table_info({table})").fetchall()]
    if name not in columns:
        cursor.execute(f"ALTER TABLE {table} ADD COLUMN {name} {definition}")


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    for table in SAMPLE_DATA:
        cursor.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {table} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                country TEXT NOT NULL DEFAULT 'IN',
                city TEXT NOT NULL DEFAULT 'New Delhi',
                name TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                contact TEXT NOT NULL,
                service_area TEXT NOT NULL DEFAULT 'Local area',
                verified_on TEXT NOT NULL DEFAULT '2026-05-01',
                response_minutes INTEGER NOT NULL DEFAULT 15,
                source_note TEXT NOT NULL DEFAULT 'Demo sample data'
            )
            """
        )
        ensure_column(cursor, table, "country", "TEXT NOT NULL DEFAULT 'IN'")
        ensure_column(cursor, table, "city", "TEXT NOT NULL DEFAULT 'New Delhi'")
        ensure_column(cursor, table, "service_area", "TEXT NOT NULL DEFAULT 'Local area'")
        ensure_column(cursor, table, "verified_on", "TEXT NOT NULL DEFAULT '2026-05-01'")
        ensure_column(cursor, table, "response_minutes", "INTEGER NOT NULL DEFAULT 15")
        ensure_column(cursor, table, "source_note", "TEXT NOT NULL DEFAULT 'Demo sample data'")

        count = cursor.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        if count < len(SAMPLE_DATA[table]):
            cursor.execute(f"DELETE FROM {table}")
            cursor.executemany(
                f"""
                INSERT INTO {table}
                (country, city, name, latitude, longitude, contact, service_area, verified_on, response_minutes, source_note)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                SAMPLE_DATA[table],
            )

    conn.commit()
    conn.close()


def fetch_services(country=None):
    conn = get_db_connection()
    data = {}
    params = []
    country_clause = ""
    if country and country != "ALL":
        country_clause = "WHERE country = ?"
        params = [country]

    for table in SAMPLE_DATA:
        rows = conn.execute(
            f"SELECT * FROM {table} {country_clause} ORDER BY response_minutes, name",
            params,
        ).fetchall()
        data[table] = [dict(row) for row in rows]

    conn.close()
    return data


def chatbot_reply(message):
    text = message.lower()

    if "golden" in text or "hour" in text:
        return "Golden Hour plan: secure the scene, call ambulance and police, control bleeding, avoid moving the victim, and share the exact location."
    if "bleeding" in text or "blood" in text:
        return "For bleeding: apply firm pressure with a clean cloth, raise the injured area if possible, and call emergency help if bleeding does not stop."
    if "fracture" in text or "broken" in text or "bone" in text:
        return "For a possible fracture: keep the person still, support the injured area, avoid straightening the limb, and seek medical help quickly."
    if "burn" in text:
        return "For burns: cool the burn under clean running water for 20 minutes, remove tight items nearby, and do not apply ice, butter, or toothpaste."
    if "cpr" in text or "unconscious" in text:
        return "For CPR: call emergency services first. If trained, start chest compressions in the center of the chest at a steady rhythm until help arrives."
    if "trauma" in text:
        return "Trauma centres are prioritised on the map because they are best suited for serious crash injuries during the golden hour."
    if "hospital" in text:
        return "Nearby hospitals and trauma centres are shown on the map with estimated response time and verification notes."
    if "police" in text:
        return "For police help, call the national emergency number or open the Police filter on the map."
    if "ambulance" in text:
        return "For ambulance help, call the national emergency number first, then use RoadSoS to find nearby ambulance services."
    if "tow" in text or "towing" in text or "vehicle rescue" in text:
        return "For vehicle rescue, open Towing on the map. Keep passengers away from traffic while waiting."
    if "puncture" in text or "tyre" in text or "tire" in text:
        return "For tyre punctures, use the Puncture filter. Stop in a visible safe area before calling roadside repair."
    if "showroom" in text or "service center" in text:
        return "For manufacturer or showroom support, use the Showroom filter for nearby vehicle assistance contacts."
    if "offline" in text or "network" in text:
        return "RoadSoS caches emergency contacts in browser storage. Open the home page once with internet, then contacts remain visible in low-network conditions."

    return "I can help with RoadSoS keywords: golden hour, bleeding, fracture, burns, CPR, trauma, hospital, police, ambulance, towing, puncture, showroom, or offline."


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/map")
def emergency_map():
    return render_template("map.html")


@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "POST":
        message = request.json.get("message", "") if request.is_json else ""
        return jsonify({"reply": chatbot_reply(message)})
    return render_template("chat.html")


@app.route("/guidance")
def guidance():
    return render_template("guidance.html")


@app.route("/robots.txt")
def serve_robots():
    return app.send_static_file("robots.txt")


@app.route("/sitemap.xml")
def serve_sitemap():
    return app.send_static_file("sitemap.xml")


@app.route("/api/services")
def api_services():
    country = request.args.get("country")
    return jsonify(fetch_services(country))


@app.route("/api/meta")
def api_meta():
    return jsonify(
        {
            "countries": [
                {"code": "IN", "name": "India", "center": [28.6139, 77.2090], "emergency": "100 / 108"},
                {"code": "US", "name": "United States", "center": [40.7128, -74.0060], "emergency": "911"},
                {"code": "GB", "name": "United Kingdom", "center": [51.5072, -0.1276], "emergency": "999"},
            ],
            "service_labels": SERVICE_TABLES,
        }
    )


# Initialize database on import (ensures database and tables exist under WSGI servers like Gunicorn)
init_db()

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
