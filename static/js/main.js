const fallbackContacts = [
    { label: "India Police", contact: "100" },
    { label: "India Ambulance", contact: "108" },
    { label: "US Emergency", contact: "911" },
    { label: "UK Emergency", contact: "999" },
    { label: "RoadSoS Helpdesk", contact: "+91 98765 00000" },
];

const serviceLabels = {
    trauma_centres: "Trauma Centre",
    hospitals: "Hospital",
    police_stations: "Police Station",
    ambulance_services: "Ambulance Service",
    towing_services: "Towing Service",
    puncture_shops: "Puncture Shop",
    showrooms: "Vehicle Showroom",
    emergency_contacts: "Emergency Contact",
};

const markerColors = {
    trauma_centres: "#7b1fa2",
    hospitals: "#2e7d32",
    police_stations: "#1565c0",
    ambulance_services: "#d32f2f",
    towing_services: "#ef6c00",
    puncture_shops: "#00838f",
    showrooms: "#455a64",
    emergency_contacts: "#6d4c41",
};

const countryMeta = {
    IN: { center: [28.6139, 77.2090], emergency: "100 / 108" },
    US: { center: [40.7128, -74.0060], emergency: "911" },
    GB: { center: [51.5072, -0.1276], emergency: "999" },
    ALL: { center: [28.6139, 77.2090], emergency: "Country-specific numbers shown in contacts" },
};

function saveOfflineServices(services) {
    localStorage.setItem("roadsos_services", JSON.stringify(services));
}

function getOfflineServices() {
    const saved = localStorage.getItem("roadsos_services");
    try {
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        localStorage.removeItem("roadsos_services");
        return {};
    }
}

function saveOfflineContacts(services) {
    const contacts = [...fallbackContacts];

    Object.keys(services).forEach((type) => {
        services[type].forEach((item) => {
            contacts.push({
                label: `${item.name} (${serviceLabels[type]})`,
                contact: item.contact,
            });
        });
    });

    localStorage.setItem("roadsos_contacts", JSON.stringify(contacts));
}

function getOfflineContacts() {
    const saved = localStorage.getItem("roadsos_contacts");
    try {
        return saved ? JSON.parse(saved) : fallbackContacts;
    } catch (error) {
        localStorage.removeItem("roadsos_contacts");
        return fallbackContacts;
    }
}

function renderCachedContacts() {
    const container = document.getElementById("cachedContacts");
    if (!container) {
        return;
    }

    container.innerHTML = getOfflineContacts()
        .slice(0, 12)
        .map((item) => `<div class="contact-item"><strong>${item.label}</strong><br>${item.contact}</div>`)
        .join("");
}

function setupSosButton() {
    const sosButton = document.getElementById("sosButton");
    const sosWheel = document.getElementById("sosWheel");
    if (!sosButton) {
        return;
    }

    sosButton.addEventListener("click", () => {
        if (!sosWheel) {
            alert("SOS activated. Call the local emergency number first. India: 100 / 108, US: 911, UK: 999.");
            return;
        }

        const isOpen = sosWheel.classList.toggle("open");
        sosButton.classList.toggle("active", isOpen);
        sosButton.setAttribute("aria-expanded", String(isOpen));
        sosWheel.setAttribute("aria-hidden", String(!isOpen));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sosWheel) {
            sosWheel.classList.remove("open");
            sosButton.classList.remove("active");
            sosButton.setAttribute("aria-expanded", "false");
            sosWheel.setAttribute("aria-hidden", "true");
        }
    });
}

function setupGoldenHour() {
    const button = document.getElementById("goldenHourButton");
    const status = document.getElementById("goldenHourStatus");
    if (!button || !status) {
        return;
    }

    let timer = null;

    function updateTimer(startedAt) {
        const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
        const remainingSeconds = Math.max(3600 - elapsedSeconds, 0);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = String(remainingSeconds % 60).padStart(2, "0");
        status.textContent = `${minutes}:${seconds} left. Call help, control bleeding, avoid moving victims, share location.`;
        status.classList.add("running");

        if (remainingSeconds === 0) {
            clearInterval(timer);
            localStorage.removeItem("roadsos_golden_hour_started");
            status.textContent = "Golden hour complete. Continue giving updates to responders.";
            status.classList.remove("running");
        }
    }

    function startTimer(startedAt) {
        clearInterval(timer);
        updateTimer(startedAt);
        timer = setInterval(() => updateTimer(startedAt), 1000);
        button.textContent = "Restart Timer";
    }

    button.addEventListener("click", () => {
        const startedAt = Date.now();
        localStorage.setItem("roadsos_golden_hour_started", String(startedAt));
        startTimer(startedAt);
    });

    const savedStart = Number(localStorage.getItem("roadsos_golden_hour_started"));
    if (savedStart && Date.now() - savedStart < 3600 * 1000) {
        startTimer(savedStart);
    } else if (savedStart) {
        localStorage.removeItem("roadsos_golden_hour_started");
    }
}

function setupReportBuilder() {
    const form = document.getElementById("reportForm");
    const output = document.getElementById("reportOutput");
    if (!form || !output) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const injury = document.getElementById("injuryLevel").value;
        const need = document.getElementById("serviceNeed").value;
        const location = document.getElementById("reportLocation").value.trim() || "Location not entered";
        const report = `RoadSoS emergency report: ${injury}. ${need}. Location: ${location}. Please send nearest verified emergency support.`;
        output.value = report;
        localStorage.setItem("roadsos_last_report", report);

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(report);
            output.value = `${report}\n\nCopied to clipboard.`;
        }
    });
}

function createIcon(color) {
    return L.divIcon({
        className: "custom-marker",
        html: `<div style="background:${color};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
}

function serviceScore(item, serviceType) {
    const categoryBonus = {
        trauma_centres: 30,
        ambulance_services: 28,
        police_stations: 24,
        hospitals: 22,
        towing_services: 16,
        puncture_shops: 12,
        showrooms: 8,
        emergency_contacts: 26,
    };
    return Math.max(1, (categoryBonus[serviceType] || 10) + (30 - Number(item.response_minutes || 30)));
}

async function setupMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement || typeof L === "undefined") {
        return;
    }

    const countrySelect = document.getElementById("countrySelect");
    const countryEmergency = document.getElementById("countryEmergency");
    const summaryTitle = document.getElementById("summaryTitle");
    const summaryText = document.getElementById("summaryText");
    const serviceList = document.getElementById("serviceList");
    const map = L.map("map").setView(countryMeta.IN.center, 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    let services = {};
    let activeType = new URLSearchParams(window.location.search).get("type") || "all";
    const markers = [];

    async function loadServices() {
        const country = countrySelect ? countrySelect.value : "IN";
        try {
            const response = await fetch(`/api/services?country=${country}`);
            services = await response.json();
            saveOfflineServices(services);
            saveOfflineContacts(services);
        } catch (error) {
            services = getOfflineServices();
            alert("Network data could not be loaded. RoadSoS is showing cached offline services.");
        }
    }

    function clearMarkers() {
        markers.forEach((marker) => marker.remove());
        markers.length = 0;
    }

    function selectedItems(type) {
        const selectedTypes = type === "all" ? Object.keys(services) : [type];
        const items = [];
        selectedTypes.forEach((serviceType) => {
            (services[serviceType] || []).forEach((item) => {
                items.push({ ...item, serviceType, score: serviceScore(item, serviceType) });
            });
        });
        return items.sort((a, b) => b.score - a.score);
    }

    function render(type) {
        clearMarkers();
        activeType = type;
        const items = selectedItems(type);

        items.forEach((item) => {
            const marker = L.marker([item.latitude, item.longitude], {
                icon: createIcon(markerColors[item.serviceType]),
            })
                .addTo(map)
                .bindPopup(`
                    <strong>${item.name}</strong><br>
                    ${serviceLabels[item.serviceType]}<br>
                    ${item.contact}<br>
                    Response: ${item.response_minutes} min
                `);
            markers.push(marker);
        });

        serviceList.innerHTML = items
            .map((item) => `
                <article class="service-card">
                    <div class="service-card-top">
                        <span class="badge">${serviceLabels[item.serviceType]}</span>
                        <span class="score">Score ${item.score}</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p>${item.city}, ${item.country} | ${item.service_area}</p>
                    <strong>${item.contact}</strong>
                    <small>Verified: ${item.verified_on} | ${item.source_note}</small>
                </article>
            `)
            .join("");

        summaryTitle.textContent = `${items.length} RoadSoS contacts found`;
        summaryText.textContent = items.length
            ? `Fastest shown: ${items[0].name}, about ${items[0].response_minutes} minutes.`
            : "No sample contacts found for this filter.";
    }

    function updateCountryView() {
        const country = countrySelect.value;
        countryEmergency.textContent = `Emergency: ${countryMeta[country].emergency}`;
        map.setView(countryMeta[country].center, country === "ALL" ? 3 : 13);
    }

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            render(button.dataset.type);
        });
    });

    const requestedButton = document.querySelector(`[data-type="${activeType}"]`);
    if (requestedButton) {
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        requestedButton.classList.add("active");
    }

    if (countrySelect) {
        countrySelect.addEventListener("change", async () => {
            updateCountryView();
            await loadServices();
            render(activeType);
        });
    }

    const priorityButton = document.getElementById("nearestPriorityButton");
    if (priorityButton) {
        priorityButton.addEventListener("click", () => {
            render("all");
            summaryTitle.textContent = "Rescue Priority Mode";
            summaryText.textContent = "Contacts are ranked for serious crashes using trauma, ambulance, police, response time, and verification freshness.";
        });
    }

    updateCountryView();
    await loadServices();
    render(requestedButton ? activeType : "all");
}

function addMessage(text, className) {
    const chatMessages = document.getElementById("chatMessages");
    const bubble = document.createElement("div");
    bubble.className = className;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupChat() {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");

    if (!form || !input) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const message = input.value.trim();
        if (!message) {
            return;
        }

        addMessage(message, "user-message");
        input.value = "";

        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        addMessage(data.reply, "bot-message");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCachedContacts();
    setupSosButton();
    setupGoldenHour();
    setupReportBuilder();
    setupMap();
    setupChat();
});
