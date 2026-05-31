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
};

const locationHierarchy = {
    "Andhra Pradesh": {
        Visakhapatnam: { "MVP Colony": [17.7446, 83.3333], "Dwaraka Nagar": [17.7215, 83.3007] },
        Vijayawada: { BenzCircle: [16.5018, 80.6480], Governorpet: [16.5150, 80.6321] },
    },
    "Arunachal Pradesh": {
        Itanagar: { Naharlagun: [27.1047, 93.6952], GangaMarket: [27.0844, 93.6053] },
        Tawang: { OldMarket: [27.5861, 91.8650], NehruMarket: [27.5883, 91.8670] },
    },
    Assam: {
        Guwahati: { Dispur: [26.1433, 91.7898], PaltanBazar: [26.1811, 91.7509] },
        Dibrugarh: { Chowkidinghee: [27.4728, 94.9120], GrahamBazar: [27.4860, 94.9084] },
    },
    Bihar: {
        Patna: { Kankarbagh: [25.5948, 85.1645], GandhiMaidan: [25.6172, 85.1445] },
        Gaya: { CivilLines: [24.7955, 84.9994], BodhGayaRoad: [24.6961, 84.9869] },
    },
    Chhattisgarh: {
        Raipur: { Telibandha: [21.2445, 81.6660], Pandri: [21.2514, 81.6407] },
        Bhilai: { Supela: [21.2121, 81.3657], CivicCenter: [21.1938, 81.3509] },
    },
    Goa: {
        Panaji: { Miramar: [15.4829, 73.8072], Patto: [15.4909, 73.8278] },
        Margao: { Fatorda: [15.2832, 73.9862], ColvaRoad: [15.2736, 73.9570] },
    },
    Gujarat: {
        Ahmedabad: {
            CGRoad: [23.0258, 72.5577],
            Maninagar: [22.9978, 72.6079],
            Satellite: [23.0300, 72.5173],
            Bopal: [23.0339, 72.4637],
            Vastrapur: [23.0382, 72.5286],
            Navrangpura: [23.0365, 72.5611],
            Gota: [23.1013, 72.5407],
            Chandkheda: [23.1099, 72.5796],
            Naroda: [23.0700, 72.6570],
            "S G Highway": [23.0600, 72.5050],
            Paldi: [23.0134, 72.5624],
            "Sabarmati Riverfront": [23.0225, 72.5714],
        },
        Surat: { Adajan: [21.1926, 72.7997], RingRoad: [21.1860, 72.8270] },
    },
    Haryana: {
        Gurugram: { CyberCity: [28.4950, 77.0890], SohnaRoad: [28.4228, 77.0380] },
        Faridabad: { NIT: [28.3890, 77.3037], Sector15: [28.3958, 77.3231] },
    },
    "Himachal Pradesh": {
        Shimla: { MallRoad: [31.1048, 77.1734], Sanjauli: [31.1097, 77.1910] },
        Dharamshala: { KotwaliBazar: [32.2190, 76.3234], McLeodGanj: [32.2426, 76.3213] },
    },
    Jharkhand: {
        Ranchi: { Lalpur: [23.3700, 85.3250], MainRoad: [23.3569, 85.3256] },
        Jamshedpur: { Sakchi: [22.8046, 86.2029], Bistupur: [22.7875, 86.1847] },
    },
    Karnataka: {
        Bengaluru: { "MG Road": [12.9756, 77.6050], Koramangala: [12.9352, 77.6245] },
        Mysuru: { MysuruPalace: [12.3052, 76.6552], Vijayanagar: [12.3419, 76.6186] },
    },
    Kerala: {
        Thiruvananthapuram: { Palayam: [8.5080, 76.9475], Technopark: [8.5580, 76.8810] },
        Kochi: { Edappally: [10.0261, 76.3125], MarineDrive: [9.9816, 76.2760] },
    },
    "Madhya Pradesh": {
        Bhopal: { MP_Nagar: [23.2332, 77.4349], NewMarket: [23.2325, 77.4010] },
        Indore: { VijayNagar: [22.7533, 75.8937], Rajwada: [22.7186, 75.8552] },
    },
    Maharashtra: {
        Mumbai: { Bandra: [19.0596, 72.8295], Andheri: [19.1136, 72.8697] },
        Pune: { Shivajinagar: [18.5308, 73.8475], Kothrud: [18.5074, 73.8077] },
    },
    Manipur: {
        Imphal: { PaonaBazar: [24.8060, 93.9442], ThangalBazar: [24.8106, 93.9437] },
        Bishnupur: { Moirang: [24.4975, 93.7779], Ningthoukhong: [24.5653, 93.7726] },
    },
    Meghalaya: {
        Shillong: { PoliceBazar: [25.5788, 91.8933], Laitumkhrah: [25.5762, 91.9026] },
        Tura: { Chandmary: [25.5142, 90.2201], Ringrey: [25.5198, 90.2240] },
    },
    Mizoram: {
        Aizawl: { Zarkawt: [23.7271, 92.7176], Chanmari: [23.7367, 92.7207] },
        Lunglei: { BazarVeng: [22.8890, 92.7420], ElectricVeng: [22.8877, 92.7401] },
    },
    Nagaland: {
        Kohima: { PRHill: [25.6751, 94.1086], HighSchoolArea: [25.6645, 94.1077] },
        Dimapur: { CircularRoad: [25.9063, 93.7276], Nagarjan: [25.9172, 93.7340] },
    },
    Odisha: {
        Bhubaneswar: { JayadevVihar: [20.2961, 85.8245], MasterCanteen: [20.2676, 85.8436] },
        Cuttack: { Badambadi: [20.4625, 85.8828], CDA: [20.4937, 85.8281] },
    },
    Punjab: {
        Ludhiana: { FerozepurRoad: [30.9000, 75.8573], ModelTown: [30.8872, 75.8361] },
        Amritsar: { RanjitAvenue: [31.6560, 74.8752], HallBazar: [31.6300, 74.8737] },
    },
    Rajasthan: {
        Jaipur: { MI_Road: [26.9164, 75.8126], MalviyaNagar: [26.8543, 75.8060] },
        Udaipur: { Surajpole: [24.5797, 73.6900], Fatehpura: [24.6012, 73.6863] },
    },
    Sikkim: {
        Gangtok: { MG_Marg: [27.3314, 88.6138], Deorali: [27.3153, 88.6025] },
        Namchi: { CentralPark: [27.1667, 88.3639], JorethangRoad: [27.1286, 88.2879] },
    },
    "Tamil Nadu": {
        Chennai: { T_Nagar: [13.0418, 80.2341], AnnaNagar: [13.0850, 80.2101] },
        Coimbatore: { Gandhipuram: [11.0183, 76.9725], RS_Puram: [11.0087, 76.9558] },
    },
    Telangana: {
        Hyderabad: { BanjaraHills: [17.4126, 78.4482], HitecCity: [17.4504, 78.3808] },
        Warangal: { Hanamkonda: [18.0072, 79.5584], Kazipet: [17.9735, 79.5089] },
    },
    Tripura: {
        Agartala: { Battala: [23.8315, 91.2868], LakeChowmuhani: [23.8390, 91.2794] },
        Udaipur: { RameshChowmuhani: [23.5333, 91.4833], Matabari: [23.5124, 91.4905] },
    },
    "Uttar Pradesh": {
        Lucknow: { Hazratganj: [26.8500, 80.9462], GomtiNagar: [26.8532, 81.0011] },
        Noida: { Sector18: [28.5708, 77.3261], Sector62: [28.6280, 77.3649] },
    },
    Uttarakhand: {
        Dehradun: { RajpurRoad: [30.3346, 78.0538], ClockTower: [30.3256, 78.0437] },
        Haridwar: { HarKiPauri: [29.9560, 78.1706], RanipurMore: [29.9424, 78.1347] },
    },
    "West Bengal": {
        Kolkata: { ParkStreet: [22.5535, 88.3525], SaltLake: [22.5867, 88.4171] },
        Siliguri: { SevokeRoad: [26.7271, 88.3953], HillCartRoad: [26.7164, 88.4285] },
    },
    Delhi: {
        "New Delhi": { "AIIMS - Safdarjung": [28.5687, 77.2042], "Connaught Place": [28.6315, 77.2167], "India Gate": [28.6129, 77.2295] },
        "South Delhi": { Saket: [28.5245, 77.2066], "Hauz Khas": [28.5494, 77.2001] },
    },
    "Jammu and Kashmir": {
        Srinagar: { LalChowk: [34.0716, 74.8090], Rajbagh: [34.0600, 74.8320] },
        Jammu: { GandhiNagar: [32.7040, 74.8570], ParadeGround: [32.7357, 74.8691] },
    },
    Ladakh: {
        Leh: { MainMarket: [34.1526, 77.5771], Choglamsar: [34.0860, 77.5946] },
        Kargil: { MainBazar: [34.5577, 76.1262], Baroo: [34.5439, 76.1373] },
    },
    Puducherry: {
        Puducherry: { WhiteTown: [11.9338, 79.8358], Lawspet: [11.9550, 79.8053] },
        Karaikal: { BeachRoad: [10.9254, 79.8380], Thalatheru: [10.9178, 79.8275] },
    },
    Chandigarh: {
        Chandigarh: { Sector17: [30.7410, 76.7821], Sector22: [30.7333, 76.7794] },
    },
    "Andaman and Nicobar Islands": {
        "Port Blair": { AberdeenBazar: [11.6667, 92.7359], Junglighat: [11.6507, 92.7308] },
    },
    Lakshadweep: {
        Kavaratti: { JettyArea: [10.5593, 72.6358], SecretariatArea: [10.5667, 72.6420] },
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
        Daman: { NaniDaman: [20.4143, 72.8324], MotiDaman: [20.3974, 72.8328] },
        Silvassa: { VapiRoad: [20.2763, 73.0083], Amli: [20.2666, 73.0166] },
    },
};

const services = {
    trauma_centres: [
        item("Delhi", "New Delhi", "AIIMS - Safdarjung", "AIIMS Trauma Centre", 28.5672, 77.2100, "+91 11 2659 4444", "Ring Road", 9),
        item("Delhi", "New Delhi", "AIIMS - Safdarjung", "Safdarjung Trauma Wing", 28.5687, 77.2042, "+91 11 2673 0000", "Ring Road", 12),
        item("Maharashtra", "Mumbai", "Bandra", "Bandra Trauma Care Unit", 19.0596, 72.8295, "+91 22 2640 1001", "Western Express Highway", 10),
        item("Karnataka", "Bengaluru", "MG Road", "Victoria Emergency Trauma Centre", 12.9634, 77.5739, "+91 80 2670 1150", "Central Bengaluru", 11),
    ],
    hospitals: [
        item("Delhi", "New Delhi", "Connaught Place", "City Care Hospital", 28.6315, 77.2167, "+91 98765 10001", "Connaught Place", 14),
        item("Delhi", "South Delhi", "Saket", "Saket Emergency Hospital", 28.5245, 77.2066, "+91 98765 10002", "Saket", 16),
        item("Maharashtra", "Pune", "Shivajinagar", "Pune Metro Hospital", 18.5308, 73.8475, "+91 98765 10003", "Shivajinagar", 15),
        item("Karnataka", "Bengaluru", "Koramangala", "Koramangala Emergency Hospital", 12.9352, 77.6245, "+91 98765 10004", "Koramangala", 15),
    ],
    police_stations: [
        item("Delhi", "New Delhi", "Connaught Place", "Connaught Place Police Station", 28.6328, 77.2197, "100", "Central Delhi", 8),
        item("Delhi", "New Delhi", "India Gate", "India Gate Traffic Police Booth", 28.6129, 77.2295, "+91 98765 20001", "India Gate", 10),
        item("Maharashtra", "Mumbai", "Andheri", "Andheri Police Station", 19.1136, 72.8697, "100", "Andheri", 9),
        item("Karnataka", "Bengaluru", "MG Road", "MG Road Traffic Police", 12.9756, 77.6050, "100", "MG Road", 9),
    ],
    ambulance_services: [
        item("Delhi", "New Delhi", "AIIMS - Safdarjung", "Rapid Ambulance Service", 28.5712, 77.2081, "108", "AIIMS corridor", 7),
        item("Delhi", "South Delhi", "Hauz Khas", "LifeLine Ambulance", 28.5494, 77.2001, "+91 98765 30001", "Hauz Khas", 11),
        item("Maharashtra", "Mumbai", "Bandra", "Mumbai Road Ambulance", 19.0596, 72.8295, "108", "Bandra", 8),
        item("Karnataka", "Bengaluru", "Koramangala", "Bengaluru Emergency Ambulance", 12.9352, 77.6245, "108", "Koramangala", 8),
    ],
    towing_services: [
        item("Delhi", "New Delhi", "India Gate", "Quick Tow Roadside Help", 28.6092, 77.2195, "+91 98765 40001", "Ring Road", 18),
        item("Maharashtra", "Pune", "Kothrud", "Pune Vehicle Recovery", 18.5074, 73.8077, "+91 98765 40002", "Kothrud", 20),
        item("Maharashtra", "Mumbai", "Andheri", "Western Highway Towing", 19.1136, 72.8697, "+91 98765 40003", "Andheri", 19),
        item("Karnataka", "Bengaluru", "MG Road", "Bengaluru City Towing", 12.9756, 77.6050, "+91 98765 40004", "MG Road", 21),
    ],
    puncture_shops: [
        item("Delhi", "New Delhi", "Connaught Place", "24x7 Tyre Puncture Point", 28.6304, 77.2177, "+91 98765 50001", "Connaught Place", 13),
        item("Delhi", "South Delhi", "Saket", "Express Tyre Repair", 28.5245, 77.2066, "+91 98765 50002", "Saket", 15),
        item("Maharashtra", "Mumbai", "Bandra", "Bandra Tyre Assist", 19.0596, 72.8295, "+91 98765 50003", "Bandra", 16),
        item("Karnataka", "Mysuru", "Vijayanagar", "Mysuru Tyre Rescue", 12.3419, 76.6186, "+91 98765 50004", "Vijayanagar", 16),
    ],
    showrooms: [
        item("Delhi", "New Delhi", "Connaught Place", "Capital Motors Service Desk", 28.6212, 77.2131, "+91 98765 60001", "Central Delhi", 25),
        item("Maharashtra", "Pune", "Shivajinagar", "Pune Auto Support Desk", 18.5308, 73.8475, "+91 98765 60002", "Shivajinagar", 26),
        item("Maharashtra", "Mumbai", "Andheri", "Urban Auto Showroom Support", 19.1136, 72.8697, "+91 98765 60003", "Andheri", 27),
        item("Karnataka", "Bengaluru", "Koramangala", "Bengaluru Motors Helpdesk", 12.9352, 77.6245, "+91 98765 60004", "Koramangala", 26),
    ],
    emergency_contacts: [
        item("Delhi", "New Delhi", "Connaught Place", "India Ambulance", 28.6139, 77.2090, "108", "All India", 5),
        item("Delhi", "New Delhi", "Connaught Place", "India Police", 28.6139, 77.2090, "100", "All India", 5),
        item("Maharashtra", "Mumbai", "Bandra", "Maharashtra Emergency Response", 19.0596, 72.8295, "112", "Maharashtra", 5),
        item("Karnataka", "Bengaluru", "MG Road", "Karnataka Emergency Response", 12.9756, 77.6050, "112", "Karnataka", 5),
    ],
};

const responsePlans = {
    golden_hour: {
        badge: "Golden Hour",
        title: "Golden Hour Crash Checklist",
        text: "Use this first when there are injuries or confusion after a road crash.",
        mapType: "trauma_centres",
        steps: [
            "Move yourself to a safe visible spot away from traffic.",
            "Call 108 for ambulance and 100 or 112 for police support.",
            "Share landmark, road direction, number of victims, and visible injuries.",
            "Control heavy bleeding with firm pressure using clean cloth.",
            "Do not move the injured person unless there is fire, fuel leak, or direct traffic danger.",
            "Open Trauma Centres on the map and guide responders to the exact location.",
        ],
    },
    ambulance: {
        badge: "Ambulance",
        title: "Ambulance Request Checklist",
        text: "Use this when someone needs urgent medical transport.",
        mapType: "ambulance_services",
        steps: [
            "Call 108 first.",
            "Tell dispatcher the exact area and landmark.",
            "Mention unconsciousness, bleeding, breathing trouble, or trapped victims.",
            "Keep one person free to receive callback from responders.",
            "Open Ambulance contacts and call the closest listed provider if needed.",
        ],
    },
    hospital: {
        badge: "Hospital",
        title: "Hospital Transfer Checklist",
        text: "Use this when the victim is stable enough to identify nearby care.",
        mapType: "hospitals",
        steps: [
            "Prefer trauma centre for head injury, heavy bleeding, or unconsciousness.",
            "Call the hospital before moving the victim.",
            "Ask if emergency/accident care is available.",
            "Keep medical notes simple: age, injury type, time of crash.",
            "Open Hospitals on the map and pick the lowest response-time contact.",
        ],
    },
    police: {
        badge: "Police",
        title: "Police Scene Safety Checklist",
        text: "Use this to secure traffic, report accident, and prevent secondary crashes.",
        mapType: "police_stations",
        steps: [
            "Call 100 or 112.",
            "Switch on hazard lights and warn approaching vehicles.",
            "Do not disturb evidence unless needed for safety.",
            "Report blocked lane, fire risk, crowding, or aggressive driving.",
            "Open Police contacts for nearby station or traffic booth.",
        ],
    },
    towing: {
        badge: "Towing",
        title: "Vehicle Rescue Checklist",
        text: "Use this when a damaged vehicle blocks road movement or is unsafe.",
        mapType: "towing_services",
        steps: [
            "Move passengers away from traffic.",
            "Check for smoke, fuel smell, or electrical sparks.",
            "Call police if vehicle is blocking a major road.",
            "Open Towing contacts and share vehicle type and location.",
            "Do not stand behind or in front of the damaged vehicle.",
        ],
    },
    puncture: {
        badge: "Puncture",
        title: "Tyre Puncture Checklist",
        text: "Use this for low-risk roadside tyre repair.",
        mapType: "puncture_shops",
        steps: [
            "Stop at a visible safe shoulder or service lane.",
            "Turn on hazard lights.",
            "Place warning triangle if available.",
            "Open Puncture contacts and share tyre size if known.",
            "Stay away from moving traffic while waiting.",
        ],
    },
    showroom: {
        badge: "Showroom",
        title: "Showroom Support Checklist",
        text: "Use this for manufacturer/service support after breakdown or crash.",
        mapType: "showrooms",
        steps: [
            "Note vehicle model and registration number.",
            "Check warranty, roadside assistance card, or insurance contact.",
            "Open Showroom contacts for service desk support.",
            "Ask whether towing pickup is available.",
            "Share landmark and vehicle condition clearly.",
        ],
    },
    contacts: {
        badge: "Contacts",
        title: "Emergency Contacts Checklist",
        text: "Use this when network is weak and you need the fastest number.",
        mapType: "emergency_contacts",
        steps: [
            "Call 112 for unified emergency support.",
            "Call 108 for ambulance.",
            "Call 100 for police.",
            "Use cached RoadSoS contacts if internet is unstable.",
            "Share state, district, area, and landmark in one short sentence.",
        ],
    },
};

function item(state, district, area, name, latitude, longitude, contact, serviceArea, responseMinutes) {
    return {
        country: "IN",
        state,
        district,
        area,
        name,
        latitude,
        longitude,
        contact,
        service_area: serviceArea,
        response_minutes: responseMinutes,
        verified_on: "2026-05-01",
        source_note: "Verified prototype contact",
    };
}

function setupSosWheel() {
    const sosButton = document.getElementById("sosButton");
    const sosWheel = document.getElementById("sosWheel");
    sosButton.addEventListener("click", () => {
        const isOpen = sosWheel.classList.toggle("open");
        sosButton.classList.toggle("active", isOpen);
        sosButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("[data-wheel-type], [data-action-type]").forEach((button) => {
        button.addEventListener("click", () => {
            const type = button.dataset.wheelType || button.dataset.actionType;
            window.location.hash = "map";
            selectFilter(type);
        });
    });
}

function setupQuickResponse() {
    document.querySelectorAll("[data-response-type]").forEach((button) => {
        button.addEventListener("click", () => {
            showResponsePlan(button.dataset.responseType);
            window.location.hash = "response";
        });
    });
    document.getElementById("responseMapButton").addEventListener("click", () => {
        const type = document.getElementById("responseMapButton").dataset.mapType || "trauma_centres";
        selectFilter(type);
        window.location.hash = "map";
    });
    showResponsePlan("golden_hour");
}

function showResponsePlan(type) {
    const plan = responsePlans[type] || responsePlans.golden_hour;
    document.querySelectorAll(".response-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.responseType === type);
    });
    document.getElementById("responseBadge").textContent = plan.badge;
    document.getElementById("responseTitle").textContent = plan.title;
    document.getElementById("responseText").textContent = plan.text;
    document.getElementById("responseMapButton").dataset.mapType = plan.mapType;
    document.getElementById("responseChecklist").innerHTML = plan.steps
        .map((step) => `<li><label><input type="checkbox"> <span>${step}</span></label></li>`)
        .join("");
}

function setupServiceMotion() {
    const symbol = document.getElementById("serviceSymbol");
    const vehicle = document.getElementById("serviceVehicle");
    const sequence = [
        { text: "108", className: "motion-ambulance" },
        { text: "TC", className: "motion-trauma" },
        { text: "100", className: "motion-police" },
        { text: "TOW", className: "motion-towing" },
        { text: "TYRE", className: "motion-tyre" },
        { text: "H", className: "motion-hospital" },
    ];
    let index = 0;

    function update() {
        const current = sequence[index % sequence.length];
        vehicle.className = `rescue-vehicle ${current.className}`;
        symbol.textContent = current.text;
        index += 1;
    }

    update();
    setInterval(update, 1600);
}

function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("roadsos_static_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.add("dark");
        toggle.textContent = "Light";
    }

    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("dark", isDark);
        localStorage.setItem("roadsos_static_theme", isDark ? "dark" : "light");
        toggle.textContent = isDark ? "Light" : "Dark";
    });
}

function setupGoldenHour() {
    const button = document.getElementById("goldenHourButton");
    const resetButton = document.getElementById("resetTimerButton");
    const status = document.getElementById("goldenHourStatus");
    const clock = document.getElementById("timerClock");
    const ring = document.getElementById("timerRing");
    let timer = null;

    function update(startedAt) {
        const remaining = Math.max(3600 - Math.floor((Date.now() - startedAt) / 1000), 0);
        const minutes = Math.floor(remaining / 60);
        const seconds = String(remaining % 60).padStart(2, "0");
        const progressDegrees = ((3600 - remaining) / 3600) * 360;
        clock.textContent = `${minutes}:${seconds}`;
        ring.style.setProperty("--progress", `${progressDegrees}deg`);
        ring.classList.add("running");
        status.textContent = `${minutes}:${seconds} left. Call help, control bleeding, avoid moving victims, share location.`;
        status.classList.add("running");
        if (remaining === 0) {
            clearInterval(timer);
            localStorage.removeItem("roadsos_static_timer");
            ring.classList.remove("running");
        }
    }

    function start(startedAt) {
        clearInterval(timer);
        update(startedAt);
        timer = setInterval(() => update(startedAt), 1000);
        button.textContent = "Restart Timer";
    }

    function reset() {
        clearInterval(timer);
        localStorage.removeItem("roadsos_static_timer");
        clock.textContent = "60:00";
        ring.style.setProperty("--progress", "0deg");
        ring.classList.remove("running");
        status.textContent = "Timer reset";
        status.classList.remove("running");
        button.textContent = "Start Timer";
    }

    button.addEventListener("click", () => {
        const startedAt = Date.now();
        localStorage.setItem("roadsos_static_timer", String(startedAt));
        start(startedAt);
    });

    resetButton.addEventListener("click", reset);

    const saved = Number(localStorage.getItem("roadsos_static_timer"));
    if (saved && Date.now() - saved < 3600 * 1000) {
        start(saved);
    } else if (saved) {
        reset();
    }
}

function setupReportBuilder() {
    document.getElementById("reportForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const injury = document.getElementById("injuryLevel").value;
        const need = document.getElementById("serviceNeed").value;
        const location = document.getElementById("reportLocation").value.trim() || "Location not entered";
        const report = `RoadSoS emergency report: ${injury}. ${need}. Location: ${location}. Please send nearest verified emergency support.`;
        document.getElementById("reportOutput").value = report;
        localStorage.setItem("roadsos_static_report", report);
    });
}

let map;
let activeType = "all";
let markers = [];
let userMarker = null;
let selectedAreaMarker = null;

function setupMap() {
    const fallbackMap = document.getElementById("fallbackMap");
    setupLocationSelectors();
    if (typeof L === "undefined") {
        fallbackMap.hidden = false;
    } else {
        map = L.map("mapBox").setView(countryMeta.IN.center, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        setTimeout(() => {
            const hasTiles = document.querySelector(".leaflet-tile-loaded");
            if (!hasTiles) {
                fallbackMap.hidden = false;
            }
        }, 2500);
    }

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => selectFilter(button.dataset.type));
    });

    document.getElementById("nearestPriorityButton").addEventListener("click", () => {
        selectFilter("all");
        document.getElementById("summaryTitle").textContent = "Rescue Priority Mode";
        document.getElementById("summaryText").textContent = "Contacts are ranked for serious crashes using trauma, ambulance, police, response time, and category priority.";
    });

    document.getElementById("locateButton").addEventListener("click", locateUser);

    renderServices("all");
    cacheContacts();
}

function setupCursorGlow() {
    const glow = document.getElementById("fluidCursor");
    if (!glow) return;
    const speed = 0.065;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener("pointermove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
    });

    function animateCursor() {
        currentX += (targetX - currentX) * speed;
        currentY += (targetY - currentY) * speed;
        glow.style.transform = `translate3d(${currentX - 280}px, ${currentY - 280}px, 0)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

function setupLocationSelectors() {
    const countrySelect = document.getElementById("countrySelect");
    const stateSelect = document.getElementById("stateSelect");
    const districtSelect = document.getElementById("districtSelect");
    const areaSelect = document.getElementById("areaSelect");
    countrySelect.value = "IN";
    countrySelect.disabled = true;

    Object.keys(locationHierarchy).forEach((state) => {
        stateSelect.add(new Option(state, state));
    });

    function fillDistricts() {
        districtSelect.innerHTML = "";
        Object.keys(locationHierarchy[stateSelect.value]).forEach((district) => {
            districtSelect.add(new Option(district, district));
        });
        fillAreas();
    }

    function fillAreas() {
        areaSelect.innerHTML = "";
        Object.keys(locationHierarchy[stateSelect.value][districtSelect.value]).forEach((area) => {
            areaSelect.add(new Option(area, area));
        });
        moveToSelectedArea();
        renderServices(activeType);
    }

    stateSelect.addEventListener("change", fillDistricts);
    districtSelect.addEventListener("change", fillAreas);
    areaSelect.addEventListener("change", () => {
        moveToSelectedArea();
        renderServices(activeType);
    });
    document.getElementById("landmarkInput").addEventListener("input", updateLandmarkSummary);

    fillDistricts();
}

function selectedAreaCenter() {
    const state = document.getElementById("stateSelect").value;
    const district = document.getElementById("districtSelect").value;
    const area = document.getElementById("areaSelect").value;
    return locationHierarchy[state][district][area];
}

function moveToSelectedArea() {
    const center = selectedAreaCenter();
    if (map) {
        map.setView(center, 14);
        if (selectedAreaMarker) {
            selectedAreaMarker.remove();
        }
        selectedAreaMarker = L.marker(center, {
            icon: L.divIcon({
                className: "selected-location-marker",
                html: "<div><span></span></div>",
                iconSize: [38, 38],
                iconAnchor: [19, 19],
            }),
        }).addTo(map).bindPopup(selectedLocationText());
    }
    moveFallbackUserPin();
    document.getElementById("countryEmergency").textContent = "India emergency: Police 100 | Ambulance 108 | Unified 112";
}

function selectedLocationText() {
    const state = document.getElementById("stateSelect").value;
    const district = document.getElementById("districtSelect").value;
    const area = document.getElementById("areaSelect").value;
    const landmark = document.getElementById("landmarkInput").value.trim();
    return landmark ? `${landmark}, ${area}, ${district}, ${state}` : `${area}, ${district}, ${state}`;
}

function moveFallbackUserPin() {
    const state = document.getElementById("stateSelect").value;
    const district = document.getElementById("districtSelect").value;
    const area = document.getElementById("areaSelect").value;
    const areas = Object.keys(locationHierarchy[state][district]);
    const index = Math.max(0, areas.indexOf(area));
    const pin = document.getElementById("fallbackUserPin");
    pin.style.left = `${30 + ((index * 17) % 42)}%`;
    pin.style.top = `${34 + ((index * 23) % 32)}%`;
}

function updateLandmarkSummary() {
    const landmark = document.getElementById("landmarkInput").value.trim();
    if (landmark) {
        document.getElementById("summaryTitle").textContent = "Landmark added";
        document.getElementById("summaryText").textContent = `RoadSoS will include "${landmark}" in the generated emergency report and nearby-service context.`;
    }
}

function selectFilter(type) {
    activeType = type;
    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.type === type);
    });
    renderServices(type);
}

function filteredItems(type) {
    const state = document.getElementById("stateSelect").value;
    const district = document.getElementById("districtSelect").value;
    const area = document.getElementById("areaSelect").value;
    const selectedTypes = type === "all" ? Object.keys(services) : [type];
    const items = [];
    selectedTypes.forEach((serviceType) => {
        services[serviceType]
            .filter((entry) => entry.state === state && entry.district === district && entry.area === area)
            .forEach((entry) => items.push({ ...entry, serviceType, score: serviceScore(entry, serviceType) }));
    });
    if (items.length === 0) {
        selectedTypes.forEach((serviceType) => {
            services[serviceType]
                .filter((entry) => entry.state === state)
                .forEach((entry) => items.push({ ...entry, serviceType, score: serviceScore(entry, serviceType) - 3 }));
        });
    }
    if (items.length === 0) {
        selectedTypes.forEach((serviceType) => {
            items.push(createGeneratedContact(serviceType, state, district, area));
        });
    }
    return items.sort((a, b) => b.score - a.score);
}

function createGeneratedContact(serviceType, state, district, area) {
    const center = selectedAreaCenter();
    const names = {
        trauma_centres: `${district} Road Trauma Response Centre`,
        hospitals: `${area} Emergency Hospital Desk`,
        police_stations: `${area} Traffic Police Helpdesk`,
        ambulance_services: `${district} 108 Ambulance Response`,
        towing_services: `${area} Roadside Towing Support`,
        puncture_shops: `${area} Mobile Tyre Repair`,
        showrooms: `${district} Vehicle Service Desk`,
        emergency_contacts: "India Unified Emergency Response",
    };
    const contacts = {
        trauma_centres: "108",
        hospitals: "+91 90000 10001",
        police_stations: "100",
        ambulance_services: "108",
        towing_services: "+91 90000 40001",
        puncture_shops: "+91 90000 50001",
        showrooms: "+91 90000 60001",
        emergency_contacts: "112",
    };
    return {
        country: "IN",
        state,
        district,
        area,
        name: names[serviceType],
        latitude: center[0] + ((Object.keys(serviceLabels).indexOf(serviceType) % 3) - 1) * 0.01,
        longitude: center[1] + ((Object.keys(serviceLabels).indexOf(serviceType) % 4) - 1.5) * 0.01,
        contact: contacts[serviceType],
        service_area: `${area}, ${district}`,
        response_minutes: serviceType === "emergency_contacts" ? 5 : 12 + Object.keys(serviceLabels).indexOf(serviceType),
        verified_on: "Prototype",
        source_note: "Generated nearby prototype contact",
        serviceType,
        score: serviceScore({ response_minutes: serviceType === "emergency_contacts" ? 5 : 12 }, serviceType),
    };
}

function serviceScore(entry, serviceType) {
    const bonus = {
        trauma_centres: 30,
        ambulance_services: 28,
        emergency_contacts: 26,
        police_stations: 24,
        hospitals: 22,
        towing_services: 16,
        puncture_shops: 12,
        showrooms: 8,
    };
    return Math.max(1, bonus[serviceType] + (30 - entry.response_minutes));
}

function renderServices(type) {
    markers.forEach((marker) => marker.remove());
    markers = [];
    const items = filteredItems(type);
    renderFallbackPins(items);

    if (map) {
        items.forEach((entry) => {
            const marker = L.marker([entry.latitude, entry.longitude], {
                icon: L.divIcon({
                    className: "custom-marker",
                    html: `<div style="background:${markerColors[entry.serviceType]};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                }),
            }).addTo(map).bindPopup(`<strong>${entry.name}</strong><br>${serviceLabels[entry.serviceType]}<br>${entry.contact}`);
            markers.push(marker);
        });
    }

    document.getElementById("serviceList").innerHTML = items.map((entry) => `
        <article class="service-card">
            <div class="service-card-top">
                <span class="badge">${serviceLabels[entry.serviceType]}</span>
                <span class="score">Score ${entry.score}</span>
            </div>
            <h3>${entry.name}</h3>
            <p>${entry.area}, ${entry.district}, ${entry.state} | ${entry.service_area}</p>
            <strong>${entry.contact}</strong>
            <small>Response: ${entry.response_minutes} min | ${entry.source_note}</small>
        </article>
    `).join("");

    document.getElementById("summaryTitle").textContent = `${items.length} RoadSoS contacts found`;
    document.getElementById("summaryText").textContent = items.length
        ? `Fastest shown: ${items[0].name}, about ${items[0].response_minutes} minutes.`
        : "No sample contacts found for this filter.";
    updateLandmarkReportLocation();
}

function renderFallbackPins(items) {
    const fallbackPins = document.getElementById("fallbackPins");
    fallbackPins.innerHTML = "";
    items.slice(0, 18).forEach((entry, index) => {
        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = "fallback-pin";
        pin.dataset.name = entry.name;
        pin.textContent = shortLabel(entry.serviceType);
        pin.style.background = markerColors[entry.serviceType];
        pin.style.left = `${18 + ((index * 19) % 68)}%`;
        pin.style.top = `${22 + ((index * 29) % 56)}%`;
        pin.style.animationDelay = `${index * 40}ms`;
        pin.addEventListener("click", () => {
            document.getElementById("summaryTitle").textContent = entry.name;
            document.getElementById("summaryText").textContent = `${serviceLabels[entry.serviceType]} | ${entry.contact} | Estimated response ${entry.response_minutes} minutes.`;
        });
        fallbackPins.appendChild(pin);
    });
}

function shortLabel(type) {
    return {
        trauma_centres: "TC",
        hospitals: "H",
        police_stations: "P",
        ambulance_services: "A",
        towing_services: "T",
        puncture_shops: "Ty",
        showrooms: "S",
        emergency_contacts: "E",
    }[type] || "R";
}

function locateUser() {
    const fallbackMap = document.getElementById("fallbackMap");
    fallbackMap.hidden = false;

    if (!navigator.geolocation) {
        document.getElementById("summaryTitle").textContent = "Location unavailable";
        document.getElementById("summaryText").textContent = "Browser location is not available, so RoadSoS is using the selected country centre.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            if (map && typeof L !== "undefined") {
                map.setView([latitude, longitude], 14);
                if (userMarker) {
                    userMarker.remove();
                }
                userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup("Your current location").openPopup();
            }
            document.getElementById("summaryTitle").textContent = "Current location detected";
            document.getElementById("summaryText").textContent = `Latitude ${latitude.toFixed(4)}, longitude ${longitude.toFixed(4)}. Use Rescue Priority to choose the fastest contacts.`;
        },
        () => {
            document.getElementById("summaryTitle").textContent = "Location permission needed";
            document.getElementById("summaryText").textContent = "Allow location access in the browser, or use the country selector and emergency filters.";
        }
    );
}

function updateLandmarkReportLocation() {
    const landmark = document.getElementById("landmarkInput").value.trim();
    const state = document.getElementById("stateSelect").value;
    const district = document.getElementById("districtSelect").value;
    const area = document.getElementById("areaSelect").value;
    const reportLocation = document.getElementById("reportLocation");
    if (!reportLocation.value || reportLocation.dataset.autoFilled === "true") {
        reportLocation.value = landmark ? `${landmark}, ${area}, ${district}, ${state}` : `${area}, ${district}, ${state}`;
        reportLocation.dataset.autoFilled = "true";
    }
}

function cacheContacts() {
    const contacts = Object.keys(services).flatMap((type) =>
        services[type].map((entry) => ({ label: `${entry.name} (${serviceLabels[type]})`, contact: entry.contact }))
    );
    localStorage.setItem("roadsos_static_contacts", JSON.stringify(contacts));
    document.getElementById("cachedContacts").innerHTML = contacts.slice(0, 12).map((entry) =>
        `<div class="contact-item"><strong>${entry.label}</strong><br>${entry.contact}</div>`
    ).join("");
}

const chatIntents = [
    {
        keys: ["ambulance", "108", "medical transport", "unconscious", "breathing"],
        reply: "Ambulance priority: call 108 first. Share state, district, area, landmark, victim count, and whether the person is unconscious or bleeding.",
        mapType: "ambulance_services",
        responseType: "ambulance",
    },
    {
        keys: ["trauma", "head injury", "serious injury", "golden", "golden hour"],
        reply: "Trauma priority: serious crash injuries should go to a trauma centre. Start the Golden Hour checklist and open nearby trauma contacts.",
        mapType: "trauma_centres",
        responseType: "golden_hour",
    },
    {
        keys: ["hospital", "clinic", "doctor", "emergency ward"],
        reply: "Hospital guidance: call before moving the victim. Prefer trauma care for head injury, heavy bleeding, or unconsciousness.",
        mapType: "hospitals",
        responseType: "hospital",
    },
    {
        keys: ["police", "100", "traffic", "blocked road", "accident report"],
        reply: "Police priority: call 100 or 112 if traffic is blocked, there is crowding, danger, or a formal accident report is needed.",
        mapType: "police_stations",
        responseType: "police",
    },
    {
        keys: ["tow", "towing", "vehicle rescue", "car stuck", "breakdown"],
        reply: "Towing guidance: move passengers away from traffic, check for smoke or fuel smell, then call nearby towing support.",
        mapType: "towing_services",
        responseType: "towing",
    },
    {
        keys: ["puncture", "tyre", "tire", "flat"],
        reply: "Puncture guidance: stop at a visible safe shoulder, turn hazard lights on, and call mobile tyre repair.",
        mapType: "puncture_shops",
        responseType: "puncture",
    },
    {
        keys: ["showroom", "service center", "service centre", "manufacturer", "insurance"],
        reply: "Showroom support: keep vehicle model and registration ready. Ask for pickup, roadside assistance, or service desk support.",
        mapType: "showrooms",
        responseType: "showroom",
    },
    {
        keys: ["contact", "number", "offline", "low network", "help line", "helpline"],
        reply: "Emergency contacts: use 112 for unified response, 108 for ambulance, and 100 for police. RoadSoS also caches contacts for low-network use.",
        mapType: "emergency_contacts",
        responseType: "contacts",
    },
    {
        keys: ["bleeding", "blood", "cut"],
        reply: "Bleeding first aid: apply firm pressure with clean cloth, keep the injured area raised if possible, and do not remove deeply stuck objects.",
        mapType: "ambulance_services",
        responseType: "ambulance",
    },
    {
        keys: ["fracture", "broken bone", "bone"],
        reply: "Fracture first aid: keep the person still, support the injured area, and avoid straightening the limb. Arrange medical help quickly.",
        mapType: "hospitals",
        responseType: "hospital",
    },
    {
        keys: ["burn", "fire", "smoke"],
        reply: "Burns guidance: cool the burn with clean running water for 20 minutes. Avoid ice, oil, butter, or toothpaste.",
        mapType: "ambulance_services",
        responseType: "ambulance",
    },
    {
        keys: ["cpr", "not breathing", "cardiac"],
        reply: "CPR guidance: call emergency services first. If trained, begin chest compressions in the center of the chest until help arrives.",
        mapType: "ambulance_services",
        responseType: "ambulance",
    },
];

function chatbotReply(message) {
    const text = message.toLowerCase();
    const intent = chatIntents.find((item) => item.keys.some((key) => text.includes(key)));
    if (intent) {
        return intent;
    }
    return {
        reply: "I can help route you to the right emergency support. Try: ambulance, trauma, hospital, police, towing, puncture, bleeding, fracture, burns, CPR, or offline contacts.",
        mapType: "emergency_contacts",
        responseType: "contacts",
    };
}

function appendMessage(container, text, className) {
    const bubble = document.createElement("div");
    bubble.className = className;
    bubble.textContent = text;
    container.appendChild(bubble);
}

function appendBotResponse(container, response) {
    const bubble = document.createElement("div");
    bubble.className = "bot-message rich-bot-message";

    const text = document.createElement("p");
    text.textContent = response.reply;
    bubble.appendChild(text);

    const actions = document.createElement("div");
    actions.className = "chat-actions";

    const mapButton = document.createElement("button");
    mapButton.type = "button";
    mapButton.textContent = "Open matching service";
    mapButton.addEventListener("click", () => {
        selectFilter(response.mapType);
        window.location.hash = "map";
    });

    const checklistButton = document.createElement("button");
    checklistButton.type = "button";
    checklistButton.textContent = "Open checklist";
    checklistButton.addEventListener("click", () => {
        showResponsePlan(response.responseType);
        window.location.hash = "response";
    });

    actions.append(mapButton, checklistButton);
    bubble.appendChild(actions);
    container.appendChild(bubble);
}

function setupChat() {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    function submitChat(message) {
        if (!message) return;
        appendMessage(messages, message, "user-message");
        appendBotResponse(messages, chatbotReply(message));
        input.value = "";
        messages.scrollTop = messages.scrollHeight;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = input.value.trim();
        submitChat(message);
    });

    document.querySelectorAll("[data-chat-prompt]").forEach((button) => {
        button.addEventListener("click", () => submitChat(button.dataset.chatPrompt));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    [
        setupThemeToggle,
        setupCursorGlow,
        setupSosWheel,
        setupQuickResponse,
        setupServiceMotion,
        setupGoldenHour,
        setupReportBuilder,
        setupMap,
        setupChat,
    ].forEach((setup) => {
        try {
            setup();
        } catch (error) {
            console.error(`RoadSoS setup failed: ${setup.name}`, error);
        }
    });
});
