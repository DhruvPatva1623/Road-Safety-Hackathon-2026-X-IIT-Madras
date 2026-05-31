# Security Policy & Implementation - RoadSoS

This document outlines the security architecture, input sanitization principles, and user privacy protections implemented in the RoadSoS emergency platform.

---

## 1. Database Security (SQL Injection Prevention)

All database operations in RoadSoS are designed to prevent SQL Injection (SQLi) vulnerabilities. 

* **Parameterized Queries:** Dynamic queries in the application use placeholder parameters (`?`) rather than string interpolation or string formatting.
* **Example from `app.py`:**
  ```python
  # SECURE: Using tuple parameter binding
  rows = conn.execute(
      f"SELECT * FROM {table} WHERE country = ? ORDER BY response_minutes, name",
      [country]
  ).fetchall()
  ```
* **Schema Safety:** Table names are validated against a strict hardcoded whitelist (`SERVICE_TABLES.keys()`), preventing dynamic table execution tricks.

---

## 2. Cross-Site Scripting (XSS) Mitigation

To prevent malicious scripts from executing in the victim's or bystander's browser:

### 2.1. Template Auto-Escaping (Jinja2)
Flask's **Jinja2 rendering engine** is enabled with auto-escaping. Any variables rendered inside HTML templates (e.g., `{{ var }}`) are automatically escaped by converting characters like `<`, `>`, and `&` to safe HTML entities.

### 2.2. Safe Client-Side DOM Operations
In [static/js/main.js](file:///c:/dhruv/Road%20Safety%20AI%20Hackathon/static/js/main.js), user-generated messages and chatbot responses are appended to the DOM using **`textContent`** or **`document.createTextNode()`** instead of `innerHTML`:
```javascript
// SECURE: Prevents HTML/Script injection
const messageText = document.createElement("div");
messageText.className = "message-content";
messageText.textContent = text; // Safe assignment
```

---

## 3. User Data Privacy (No-Tracking Design)

Because this is an emergency road application, user privacy and application performance are prioritized together:

1. **Client-Side Geolocation:** User coordinates retrieved via the browser's HTML5 Geolocation API are processed and displayed **only on the client side**.
2. **No Backend Coordinate Logging:** The user's exact latitude and longitude are never sent to, stored in, or transmitted by the Flask backend. 
3. **Authentication-Free Scope:** RoadSoS does not use login systems, cookie tracking, or user profiles. This completely eliminates the risk of user account compromises or credential leaks.

---

## 4. Infrastructure & Transport Security

When deployed on **Render** (or similar hosting providers):
* **Automatic SSL/TLS:** All web traffic is encrypted using HTTPS. Traffic sent over standard HTTP (port 80) is redirected automatically to secure HTTPS (port 443).
* **Environment Separation:** Local database SQLite variables are kept isolated from production deployment builds.
