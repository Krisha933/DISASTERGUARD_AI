console.log("🔥🔥🔥 DASHBOARD JS TEST LOADED 🔥🔥🔥");
// =====================================================
// DISASTERGUARD AI - DASHBOARD.JS
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("🛡️ DISASTERGUARD AI MAP STARTED");

    // =====================================================
    // GLOBAL VARIABLES
    // =====================================================

    window.currentLatitude = 26.8467;
    window.currentLongitude = 80.9462;

    window.currentHistoricalRisk = 0;
    window.currentMLFloodProbability = 0;

    window.currentWeatherRisk = 0;
    window.currentFloodRisk = 0;
    window.currentLightningRisk = 0;
    window.currentStormRisk = 0;
    window.currentOverallRisk = 0;

    window.currentRouteDestination = "";
    window.currentRouteData = null;


    // =====================================================
    // MAP
    // =====================================================

    const mapElement =
        document.getElementById("riskMap");

    if (!mapElement) {

        console.error(
            "❌ Risk map element not found!"
        );

        return;
    }


    const map =
        L.map("riskMap").setView(
            [26.8467, 80.9462],
            11
        );


    window.disasterGuardMap = map;


    // =====================================================
    // ROUTE LAYER GROUP
    // =====================================================

    window.routeLayerGroup =
        L.layerGroup().addTo(map);


    // =====================================================
    // OPEN STREET MAP
    // =====================================================

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // =====================================================
    // MAP LEGEND
    // =====================================================

    const legend =
        L.control({
            position: "topright"
        });


    legend.onAdd = function () {

        const div =
            L.DomUtil.create(
                "div",
                "route-map-legend"
            );


        div.style.background = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
        div.style.boxShadow =
            "0 2px 8px rgba(0,0,0,0.25)";
        div.style.fontSize = "13px";


        div.innerHTML = `

            <div style="
                font-weight:700;
                margin-bottom:7px;
            ">
                🗺️ Route Legend
            </div>

            <div>
                <span style="
                    display:inline-block;
                    width:28px;
                    height:6px;
                    background:#16a34a;
                    margin-right:6px;
                    border-radius:5px;
                "></span>

                🟢 AI Recommended
            </div>

            <div>
                <span style="
                    display:inline-block;
                    width:28px;
                    height:5px;
                    background:#64748b;
                    margin-right:6px;
                    border-radius:5px;
                "></span>

                ⚪ Alternative
            </div>

        `;


        L.DomEvent.disableClickPropagation(div);

        return div;
    };


    legend.addTo(map);


    // =====================================================
    // DEFAULT LOCATION MARKER
    // =====================================================

    L.marker([
        26.8467,
        80.9462
    ])
    .addTo(map)
    .bindPopup(`
        <b>🛡️ DisasterGuard AI</b><br>
        Monitoring Area
    `);


    const locationText =
        document.getElementById(
            "locationText"
        );


    if (locationText) {

        locationText.innerHTML =
            `Lucknow <small>(26.8467, 80.9462)</small>`;

    }


    // =====================================================
    // DEMO FLOOD ZONE
    // =====================================================

    L.circle(
        [26.8500, 80.9600],
        {
            radius: 1800,
            color: "#2563eb",
            fillColor: "#60a5fa",
            fillOpacity: 0.25
        }
    )
    .addTo(map)
    .bindPopup(`
        <b>🌊 Flood Risk Zone</b><br>
        Estimated Risk: 21%
    `);


    // =====================================================
    // DEMO LIGHTNING ZONE
    // =====================================================

    L.circle(
        [26.8300, 80.9200],
        {
            radius: 1500,
            color: "#eab308",
            fillColor: "#fde047",
            fillOpacity: 0.25
        }
    )
    .addTo(map)
    .bindPopup(`
        <b>⚡ Lightning Risk Zone</b><br>
        Estimated Risk: 18%
    `);


    // =====================================================
    // DEMO STORM ZONE
    // =====================================================

    L.circle(
        [26.8700, 80.9300],
        {
            radius: 1200,
            color: "#8b5cf6",
            fillColor: "#a78bfa",
            fillOpacity: 0.25
        }
    )
    .addTo(map)
    .bindPopup(`
        <b>⛈️ Storm Risk Zone</b><br>
        Estimated Risk: 38%
    `);


    // =====================================================
    // HELPER - HAZARD LEVEL
    // =====================================================

    function getHazardLevel(score) {

        if (score < 25)
            return "LOW";

        if (score < 50)
            return "MEDIUM";

        if (score < 75)
            return "HIGH";

        return "CRITICAL";
    }


    // =====================================================
    // HELPER - OVERALL LEVEL
    // =====================================================

    function getRiskLevel(score) {

        if (score < 25)
            return "SAFE";

        if (score < 50)
            return "WATCH";

        if (score < 75)
            return "WARNING";

        return "CRITICAL";
    }


    // =====================================================
    // UPDATE HAZARD ELEMENT
    // =====================================================

    function updateHazardElement(
        id,
        score
    ) {

        const element =
            document.getElementById(id);

        if (!element)
            return;


        const level =
            getHazardLevel(score);


        element.innerText =
            level;


        element.classList.remove(
            "low",
            "medium",
            "high",
            "critical"
        );


        element.classList.add(
            level.toLowerCase()
        );
    }


    // =====================================================
    // UPDATE HAZARD BADGE BY SELECTOR
    // =====================================================

    function updateHazardBadge(
        selector,
        score
    ) {

        const element =
            document.querySelector(selector);

        if (!element)
            return;


        const level =
            getHazardLevel(score);


        element.innerText =
            level;


        element.classList.remove(
            "low",
            "medium",
            "high",
            "critical"
        );


        element.classList.add(
            level.toLowerCase()
        );
    }


    // =====================================================
    // UPDATE RISK VALUE
    // =====================================================

    function updateRiskValue(
        id,
        value
    ) {

        const element =
            document.getElementById(id);

        if (element) {

            element.innerText =
                `${Math.round(value)}%`;

        }
    }


    // =====================================================
    // WHY THIS RISK - AI FACTOR ANALYSIS
    // =====================================================

    function updateWhyThisRisk(
        rainfall,
        humidity,
        wind,
        historicalRisk
    ) {

        // ---------------------------------------------
        // CORRECT HTML ID: rainfallValue
        // ---------------------------------------------

        const rainfallFactor =
            document.getElementById(
                "rainfallValue"
            );

        if (rainfallFactor) {

            rainfallFactor.innerText =
                `${Number(rainfall).toFixed(1)} mm`;

        }


        // ---------------------------------------------
        // CORRECT HTML ID: humidityValue
        // ---------------------------------------------

        const humidityFactor =
            document.getElementById(
                "humidityValue"
            );

        if (humidityFactor) {

            humidityFactor.innerText =
                `${Number(humidity).toFixed(0)}%`;

        }


        // ---------------------------------------------
        // CORRECT HTML ID: windValue
        // ---------------------------------------------

        const windFactor =
            document.getElementById(
                "windValue"
            );

        if (windFactor) {

            windFactor.innerText =
                `${Number(wind).toFixed(1)} km/h`;

        }


        // ---------------------------------------------
        // CORRECT HTML ID:
        // historicalRiskLevel
        // ---------------------------------------------

        const historicalFactor =
            document.getElementById(
                "historicalRiskLevel"
            );

        if (historicalFactor) {

            const historicalScore =
                Number(historicalRisk || 0);

            historicalFactor.innerText =
                `${historicalScore}/100`;

        }


        console.log(
            "🤖 WHY THIS RISK UPDATED:",
            {
                rainfall,
                humidity,
                wind,
                historicalRisk
            }
        );

    }


    // =====================================================
    // ML FLOOD PREDICTION
    // =====================================================

    async function predictFloodWithML(
        temperature,
        rainfall,
        wind
    ) {

        try {

            const response =
                await fetch(
                    `/predict-flood?temperature=${encodeURIComponent(temperature)}` +
                    `&rainfall=${encodeURIComponent(rainfall)}` +
                    `&wind=${encodeURIComponent(wind)}`
                );


            const data =
                await response.json();


            console.log(
                "🤖 ML FLOOD PREDICTION:",
                data
            );


            // Save ML probability

            window.currentMLFloodProbability =
                Number(
                    data.probability || 0
                );


            // ==========================================
            // FLOOD RISK
            // ==========================================

            const floodRiskElement =
                document.getElementById(
                    "floodRisk"
                );


            if (floodRiskElement) {

                floodRiskElement.innerText =
                    `${Math.round(
                        Number(
                            data.probability || 0
                        )
                    )}%`;

            }


            // ==========================================
            // ML PREDICTION TEXT
            // ==========================================

            const floodProbabilityElement =
                document.getElementById(
                    "floodProbability"
                );


            if (floodProbabilityElement) {

                floodProbabilityElement.innerText =
                    "ML Prediction: " +
                    Math.round(
                        Number(
                            data.probability || 0
                        )
                    ) +
                    "%";

            }


            // ==========================================
            // OPTIONAL RESULT ELEMENT
            // ==========================================

            const mlFloodResult =
                document.getElementById(
                    "mlFloodResult"
                );


            if (mlFloodResult) {

                mlFloodResult.innerText =
                    data.result ||
                    "NORMAL";

            }


            // ==========================================
            // OPTIONAL PROBABILITY ELEMENT
            // ==========================================

            const mlFloodProbability =
                document.getElementById(
                    "mlFloodProbability"
                );


            if (mlFloodProbability) {

                mlFloodProbability.innerText =
                    `${Math.round(
                        Number(
                            data.probability || 0
                        )
                    )}%`;

            }


            return data;

        }
        catch (error) {

            console.error(
                "❌ ML Flood Prediction Error:",
                error
            );


            window.currentMLFloodProbability =
                0;


            const floodProbabilityElement =
                document.getElementById(
                    "floodProbability"
                );


            if (floodProbabilityElement) {

                floodProbabilityElement.innerText =
                    "ML Prediction: Unavailable";

            }


            return null;

        }

    }


    // =====================================================
    // SAFETY RECOMMENDATIONS
    // =====================================================

    window.updateSafetyRecommendations =
        function () {

            const safetyInstructions =
                document.getElementById(
                    "safetyInstructions"
                );


            if (!safetyInstructions)
                return;


            const risk =
                window.currentOverallRisk || 0;

            const flood =
                window.currentFloodRisk || 0;

            const lightning =
                window.currentLightningRisk || 0;

            const storm =
                window.currentStormRisk || 0;


            let recommendations = [];


            if (risk >= 75) {

                recommendations.push(
                    "🔴 CRITICAL: Avoid unnecessary travel."
                );

                recommendations.push(
                    "🏠 Move to a safe indoor location."
                );

                recommendations.push(
                    "📢 Follow official emergency instructions."
                );

            }
            else if (risk >= 50) {

                recommendations.push(
                    "🟠 High risk detected. Travel only if necessary."
                );

                recommendations.push(
                    "📱 Keep monitoring live alerts."
                );

            }
            else if (risk >= 25) {

                recommendations.push(
                    "🟡 Moderate risk. Travel with caution."
                );

                recommendations.push(
                    "🌦️ Continue monitoring weather conditions."
                );

            }
            else {

                recommendations.push(
                    "🟢 Current conditions are relatively safe."
                );

                recommendations.push(
                    "📱 Continue monitoring live alerts."
                );

            }


            if (flood >= 50) {

                recommendations.push(
                    "🌊 Avoid low-lying and waterlogged roads."
                );

            }


            if (lightning >= 50) {

                recommendations.push(
                    "⚡ Avoid open areas during lightning."
                );

            }


            if (storm >= 50) {

                recommendations.push(
                    "⛈️ Avoid exposed areas during strong winds."
                );

            }


            safetyInstructions.innerHTML =
                recommendations
                    .map(
                        item =>
                            `<div style="margin-bottom:7px;">
                                ${item}
                            </div>`
                    )
                    .join("");

        };


    // =====================================================
    // LOCATION SEARCH
    // =====================================================

    const searchButton =
        document.getElementById(
            "searchLocationBtn"
        );


    const searchInput =
        document.getElementById(
            "locationSearch"
        );


    if (searchButton && searchInput) {

        searchButton.addEventListener(
            "click",
            async function () {

                const locationName =
                    searchInput.value.trim();


                if (!locationName) {

                    alert(
                        "Please enter a location."
                    );

                    return;
                }


                try {

                    // =================================
                    // GEOCODING
                    // =================================

                    const response =
                        await fetch(
                            `/geocode?q=${encodeURIComponent(locationName)}`
                        );


                    const data =
                        await response.json();


                    if (!data.success) {

                        alert(
                            data.message ||
                            "Location not found."
                        );

                        return;
                    }


                    const latitude =
                        Number(
                            data.latitude
                        );


                    const longitude =
                        Number(
                            data.longitude
                        );


                    window.currentLatitude =
                        latitude;

                    window.currentLongitude =
                        longitude;


                    console.log(
                        "📍 Location found:",
                        locationName,
                        latitude,
                        longitude
                    );


                    // =================================
                    // MOVE MAP
                    // =================================

                    map.setView(
                        [
                            latitude,
                            longitude
                        ],
                        13
                    );


                    // =================================
                    // DESTINATION MARKER
                    // =================================

                    if (
                        window.searchLocationMarker
                    ) {

                        map.removeLayer(
                            window.searchLocationMarker
                        );

                    }


                    window.searchLocationMarker =
                        L.marker([
                            latitude,
                            longitude
                        ])
                        .addTo(map)
                        .bindPopup(`
                            <b>📍 ${locationName}</b>
                            <br>
                            ${latitude.toFixed(5)},
                            ${longitude.toFixed(5)}
                        `)
                        .openPopup();


                    // =================================
                    // LOCATION TEXT
                    // =================================

                    if (locationText) {

                        locationText.innerHTML =
                            `${locationName}
                            <small>
                                (${latitude.toFixed(4)},
                                ${longitude.toFixed(4)})
                            </small>`;

                    }


                    // =================================
                    // CITY
                    // =================================

                    const address =
                        data.address || {};


                    const city =
                        address.city ||
                        address.town ||
                        address.village ||
                        address.county ||
                        locationName;


                    console.log(
                        "📍 HISTORICAL CITY:",
                        city
                    );


                    // =================================
                    // HISTORICAL RISK
                    // =================================

                    try {

                        const historicalResponse =
                            await fetch(
                                `/historical-risk?city=${encodeURIComponent(city)}`
                            );


                        const historicalResult =
                            await historicalResponse.json();


                        console.log(
                            "📊 HISTORICAL RISK:",
                            historicalResult
                        );


                        const historical =
                            historicalResult
                                .historical_risk ||
                            {
                                score: 0,
                                level: "LOW",
                                incidents: 0
                            };


                        window.currentHistoricalRisk =
                            Number(
                                historical.score || 0
                            );


                        const historicalLevel =
                            document.getElementById(
                                "historicalRiskLevel"
                            );


                        const historicalProgress =
                            document.getElementById(
                                "historicalRiskProgress"
                            );


                        if (historicalLevel) {

                            historicalLevel.innerText =
                                `${historical.level} (${historical.score}/100)`;

                        }


                        if (historicalProgress) {

                            historicalProgress.style.width =
                                `${historical.score}%`;

                        }

                    }
                    catch (error) {

                        console.error(
                            "❌ Historical Risk Error:",
                            error
                        );


                        window.currentHistoricalRisk =
                            0;

                    }


                    // =================================
                    // WEATHER
                    // =================================

                    const weatherURL =
                        `https://api.open-meteo.com/v1/forecast` +
                        `?latitude=${latitude}` +
                        `&longitude=${longitude}` +
                        `&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m` +
                        `&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m` +
                        `&forecast_days=2` +
                        `&timezone=auto`;


                    const weatherResponse =
                        await fetch(
                            weatherURL
                        );


                    const weather =
                        await weatherResponse.json();


                    console.log(
                        "🌦️ REAL WEATHER DATA:",
                        weather
                    );


                    const current =
                        weather.current ||
                        {};


                    const hourly =
                        weather.hourly ||
                        {};


                    const temperature =
                        Number(
                            current.temperature_2m || 0
                        );


                    const rainfall =
                        Number(
                            current.rain || 0
                        );


                    const humidity =
                        Number(
                            current.relative_humidity_2m || 0
                        );


                    const wind =
                        Number(
                            current.wind_speed_10m || 0
                        );


                    // =================================
                    // WEATHER DISPLAY
                    // =================================

                    const temperatureElement =
                        document.getElementById(
                            "temperature"
                        );


                    const humidityElement =
                        document.getElementById(
                            "humidity"
                        );


                    const windElement =
                        document.getElementById(
                            "wind"
                        );


                    const rainfallElement =
                        document.getElementById(
                            "rainfall"
                        );


                    if (temperatureElement) {

                        temperatureElement.innerText =
                            `${temperature}°C`;

                    }


                    if (humidityElement) {

                        humidityElement.innerText =
                            `${humidity}%`;

                    }


                    if (windElement) {

                        windElement.innerText =
                            `${wind} km/h`;

                    }


                    if (rainfallElement) {

                        rainfallElement.innerText =
                            `${rainfall} mm`;

                    }


                    // =================================
                    // ML
                    // =================================

                    await predictFloodWithML(
                        temperature,
                        rainfall,
                        wind
                    );


                    // =================================
                    // WEATHER RISK
                    // =================================

                    let weatherRisk =
                        Math.round(
                            (humidity * 0.25) +
                            (wind * 0.5) +
                            (rainfall * 5)
                        );


                    weatherRisk =
                        Math.min(
                            weatherRisk,
                            100
                        );


                    // =============================================
                    // WHY THIS RISK - UPDATE REAL VALUES
                    // =============================================

                    updateWhyThisRisk(
                        rainfall,
                        humidity,
                        wind,
                        window.currentHistoricalRisk || 0
                    );


                    // =================================
                    // FLOOD RISK
                    // =================================

                    let floodRisk =
                        Math.round(
                            rainfall * 10
                        );


                    floodRisk =
                        Math.min(
                            floodRisk,
                            100
                        );


                    // =================================
                    // LIGHTNING RISK
                    // =================================

                    let lightningRisk = 0;


                    if (humidity >= 90) {

                        lightningRisk += 40;

                    }
                    else if (humidity >= 80) {

                        lightningRisk += 25;

                    }
                    else if (humidity >= 70) {

                        lightningRisk += 15;

                    }


                    if (rainfall > 5) {

                        lightningRisk += 30;

                    }


                    lightningRisk =
                        Math.min(
                            lightningRisk,
                            100
                        );


                    // =================================
                    // STORM RISK
                    // =================================

                    let stormRisk =
                        Math.round(
                            (wind * 1.2) +
                            (rainfall * 6) +
                            (humidity * 0.15)
                        );


                    stormRisk =
                        Math.min(
                            stormRisk,
                            100
                        );


                    // =================================
                    // SAVE RISKS
                    // =================================

                    window.currentWeatherRisk =
                        weatherRisk;

                    window.currentFloodRisk =
                        floodRisk;

                    window.currentLightningRisk =
                        lightningRisk;

                    window.currentStormRisk =
                        stormRisk;


                    // =================================
                    // DISPLAY HAZARDS
                    // =================================

                    /*
                     * Weather/Storm badge IDs in the HTML
                     * are inconsistent, so we use the card
                     * selectors as a safe fallback.
                     */

                    updateHazardElement(
                        "floodLevel",
                        floodRisk
                    );


                    updateHazardElement(
                        "lightningLevel",
                        lightningRisk
                    );


                    // Weather card
                    const weatherBadge =
                        document.querySelector(
                            ".risk-card.weather .risk-level"
                        );


                    if (weatherBadge) {

                        const level =
                            getHazardLevel(
                                weatherRisk
                            );


                        weatherBadge.innerText =
                            level;


                        weatherBadge.classList.remove(
                            "low",
                            "medium",
                            "high",
                            "critical"
                        );


                        weatherBadge.classList.add(
                            level.toLowerCase()
                        );

                    }


                    // Storm card
                    const stormBadge =
                        document.querySelector(
                            ".risk-card.storm .risk-level"
                        );


                    if (stormBadge) {

                        const level =
                            getHazardLevel(
                                stormRisk
                            );


                        stormBadge.innerText =
                            level;


                        stormBadge.classList.remove(
                            "low",
                            "medium",
                            "high",
                            "critical"
                        );


                        stormBadge.classList.add(
                            level.toLowerCase()
                        );

                    }


                    updateRiskValue(
                        "weatherRisk",
                        weatherRisk
                    );


                    updateRiskValue(
                        "floodRisk",
                        floodRisk
                    );


                    updateRiskValue(
                        "lightningRisk",
                        lightningRisk
                    );


                    updateRiskValue(
                        "stormRisk",
                        stormRisk
                    );


                    // =================================
                    // CURRENT CONDITION RISK
                    // =================================

                    const historicalScore =
                        window.currentHistoricalRisk ||
                        0;


                    const currentConditionRisk =
                        Math.round(
                            (weatherRisk * 0.30) +
                            (floodRisk * 0.25) +
                            (lightningRisk * 0.20) +
                            (stormRisk * 0.25)
                        );


                    const mlFloodRisk =
                        window.currentMLFloodProbability ||
                        0;


                    const riskScore =
                        Math.round(
                            (currentConditionRisk * 0.70) +
                            (historicalScore * 0.15) +
                            (mlFloodRisk * 0.15)
                        );


                    window.currentOverallRisk =
                        Math.min(
                            riskScore,
                            100
                        );
 // =============================================
// 🔮 SYNC WHAT-IF DISASTER SIMULATOR
// =============================================

if (
    typeof window.updateWhatIfSimulator === "function"
) {

    window.updateWhatIfSimulator();

}

                    // =================================
                    // OVERALL RISK DISPLAY
                    // =================================

                    const riskScoreElement =
                        document.getElementById(
                            "riskScore"
                        );


                    if (riskScoreElement) {

                        riskScoreElement.innerText =
                            riskScore;

                    }


                    const riskLevel =
                        getRiskLevel(
                            riskScore
                        );


                    const safetyStatus =
                        document.getElementById(
                            "safetyStatus"
                        );


                    const safetyMessage =
                        document.getElementById(
                            "safetyMessage"
                        );


                    if (safetyStatus) {

                        if (riskLevel === "SAFE") {

                            safetyStatus.innerText =
                                "🟢 SAFE";

                        }
                        else if (
                            riskLevel === "WATCH"
                        ) {

                            safetyStatus.innerText =
                                "⚠️ WATCH";

                        }
                        else if (
                            riskLevel === "WARNING"
                        ) {

                            safetyStatus.innerText =
                                "🔶 WARNING";

                        }
                        else {

                            safetyStatus.innerText =
                                "🔴 CRITICAL";

                        }

                    }


                    if (safetyMessage) {

                        if (riskLevel === "SAFE") {

                            safetyMessage.innerText =
                                "Current environmental conditions are relatively safe.";

                        }
                        else if (
                            riskLevel === "WATCH"
                        ) {

                            safetyMessage.innerText =
                                "Some environmental conditions require monitoring.";

                        }
                        else if (
                            riskLevel === "WARNING"
                        ) {

                            safetyMessage.innerText =
                                "Environmental conditions require increased caution.";

                        }
                        else {

                            safetyMessage.innerText =
                                "Critical conditions detected. Follow safety instructions.";

                        }

                    }


                    // =================================
                    // HISTORICAL VS CURRENT
                    // =================================

                    const comparisonHistorical =
                        document.getElementById(
                            "comparisonHistoricalRisk"
                        );


                    const comparisonCurrent =
                        document.getElementById(
                            "comparisonCurrentRisk"
                        );


                    const comparisonMessage =
                        document.getElementById(
                            "comparisonMessage"
                        );


                    if (comparisonHistorical) {

                        comparisonHistorical.innerText =
                            `${historicalScore}%`;

                    }


                    if (comparisonCurrent) {

                        comparisonCurrent.innerText =
                            `${riskScore}%`;

                    }


                    if (comparisonMessage) {

                        if (
                            historicalScore >
                            riskScore
                        ) {

                            comparisonMessage.innerText =
                                "Historical risk is higher than the current environmental risk.";

                        }
                        else if (
                            riskScore >
                            historicalScore
                        ) {

                            comparisonMessage.innerText =
                                "Current environmental risk is higher than the historical risk.";

                        }
                        else {

                            comparisonMessage.innerText =
                                "Historical and current risk levels are currently similar.";

                        }

                    }


                    // =================================
                    // FUTURE RISK FUNCTION
                    // =================================

                    function calculateFutureRisk(
                        index
                    ) {

                        const rainArray =
                            hourly.rain || [];


                        const humidityArray =
                            hourly.relative_humidity_2m ||
                            [];


                        const windArray =
                            hourly.wind_speed_10m ||
                            [];


                        const futureRain =
                            Number(
                                rainArray[index] || 0
                            );


                        const futureHumidity =
                            Number(
                                humidityArray[index] ||
                                0
                            );


                        const futureWind =
                            Number(
                                windArray[index] || 0
                            );


                        let futureWeatherRisk =
                            Math.round(
                                (futureHumidity * 0.20) +
                                (futureWind * 0.70) +
                                (futureRain * 6)
                            );


                        futureWeatherRisk =
                            Math.min(
                                futureWeatherRisk,
                                100
                            );


                        let futureFloodRisk =
                            Math.round(
                                futureRain * 12
                            );


                        futureFloodRisk =
                            Math.min(
                                futureFloodRisk,
                                100
                            );


                        let futureLightningRisk =
                            0;


                        if (
                            futureHumidity >= 90
                        ) {

                            futureLightningRisk += 45;

                        }
                        else if (
                            futureHumidity >= 85
                        ) {

                            futureLightningRisk += 30;

                        }
                        else if (
                            futureHumidity >= 80
                        ) {

                            futureLightningRisk += 20;

                        }
                        else if (
                            futureHumidity >= 70
                        ) {

                            futureLightningRisk += 10;

                        }


                        if (
                            futureRain > 5
                        ) {

                            futureLightningRisk += 30;

                        }


                        futureLightningRisk =
                            Math.min(
                                futureLightningRisk,
                                100
                            );


                        let futureStormRisk =
                            Math.round(
                                (futureWind * 1.8) +
                                (futureRain * 7) +
                                (futureHumidity * 0.10)
                            );


                        futureStormRisk =
                            Math.min(
                                futureStormRisk,
                                100
                            );


                        const conditionRisk =
                            Math.round(
                                (futureWeatherRisk * 0.30) +
                                (futureFloodRisk * 0.20) +
                                (futureLightningRisk * 0.20) +
                                (futureStormRisk * 0.30)
                            );


                        return Math.min(
                            Math.round(
                                (conditionRisk * 0.85) +
                                (historicalScore * 0.15)
                            ),
                            100
                        );

                    }


                    // =================================
                    // FUTURE VALUES
                    // =================================

                    const risk1hr =
                        calculateFutureRisk(1);


                    const risk3hr =
                        calculateFutureRisk(3);


                    const risk6hr =
                        calculateFutureRisk(6);


                    const riskNowElement =
                        document.getElementById(
                            "riskNow"
                        );


                    const risk1hrElement =
                        document.getElementById(
                            "risk1hr"
                        );


                    const risk3hrElement =
                        document.getElementById(
                            "risk3hr"
                        );


                    const risk6hrElement =
                        document.getElementById(
                            "risk6hr"
                        );


                    if (riskNowElement) {

                        riskNowElement.innerText =
                            riskScore;

                    }


                    if (risk1hrElement) {

                        risk1hrElement.innerText =
                            risk1hr;

                    }


                    if (risk3hrElement) {

                        risk3hrElement.innerText =
                            risk3hr;

                    }


                    if (risk6hrElement) {

                        risk6hrElement.innerText =
                            risk6hr;

                    }


                    // =================================
                    // TREND
                    // =================================

                    const shortChange =
                        risk1hr -
                        riskScore;


                    const longChange =
                        risk6hr -
                        riskScore;


                    const riskTrend =
                        document.getElementById(
                            "riskTrend"
                        );


                    const predictionMessage =
                        document.querySelector(
                            ".prediction-message p"
                        );


                    let trend =
                        "STABLE";


                    if (
                        shortChange >= 5 ||
                        longChange >= 5
                    ) {

                        trend =
                            "INCREASING";

                    }
                    else if (
                        shortChange <= -5 ||
                        longChange <= -5
                    ) {

                        trend =
                            "DECREASING";

                    }


                    if (riskTrend) {

                        riskTrend.innerText =
                            trend;

                    }


                    if (predictionMessage) {

                        if (
                            trend === "INCREASING"
                        ) {

                            predictionMessage.innerText =
                                "⚠️ Risk is expected to increase in the coming hours.";

                        }
                        else if (
                            trend === "DECREASING"
                        ) {

                            predictionMessage.innerText =
                                "🟢 Risk is expected to decrease in the coming hours.";

                        }
                        else {

                            predictionMessage.innerText =
                                "ℹ️ Risk is expected to remain relatively stable.";

                        }

                    }


                    // =================================
                    // SAFETY RECOMMENDATIONS
                    // =================================

                    window.updateSafetyRecommendations();


                    // =================================
                    // SMART ALERTS
                    // =================================

                    updateSmartAlerts(
                        riskScore,
                        weatherRisk,
                        floodRisk,
                        lightningRisk,
                        stormRisk
                    );


                }
                catch (error) {

                    console.error(
                        "❌ Location/Weather Error:",
                        error
                    );


                    alert(
                        "❌ Unable to load weather data. Please try again."
                    );

                }

            }
        );

    }


    // =====================================================
    // ENTER KEY SEARCH
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function (event) {

                if (
                    event.key === "Enter" &&
                    searchButton
                ) {

                    searchButton.click();

                }

            }
        );

    }


    // =====================================================
    // SMART ALERTS
    // =====================================================

    function updateSmartAlerts(
        overall,
        weather,
        flood,
        lightning,
        storm
    ) {

        const latestAlertTitle =
            document.getElementById(
                "latestAlertTitle"
            );


        const latestAlertMessage =
            document.getElementById(
                "latestAlertMessage"
            );


        let title =
            "🟢 No Major Alert";


        let message =
            "Current conditions are being monitored.";


        if (overall >= 75) {

            title =
                "🔴 CRITICAL DISASTER ALERT";

            message =
                "Critical environmental risk detected. Avoid unnecessary travel and follow official emergency instructions.";

        }
        else if (flood >= 60) {

            title =
                "🌊 FLOOD RISK ALERT";

            message =
                "High flood risk detected. Avoid low-lying and waterlogged areas.";

        }
        else if (lightning >= 60) {

            title =
                "⚡ LIGHTNING ALERT";

            message =
                "High lightning risk detected. Avoid open areas and exposed locations.";

        }
        else if (storm >= 60) {

            title =
                "⛈️ STORM ALERT";

            message =
                "Strong storm conditions detected. Avoid exposed areas.";

        }
        else if (overall >= 50) {

            title =
                "🟠 HIGH RISK WARNING";

            message =
                "Environmental risk is elevated. Travel with caution.";

        }
        else if (overall >= 25) {

            title =
                "🟡 WEATHER WATCH";

            message =
                "Moderate environmental risk detected. Continue monitoring conditions.";

        }


        if (latestAlertTitle) {

            latestAlertTitle.innerText =
                title;

        }


        if (latestAlertMessage) {

            latestAlertMessage.innerText =
                message;

        }

    }


    // =====================================================
    // ALERT MODAL
    // =====================================================

    const alertModal =
        document.getElementById(
            "alertModal"
        );


    const closeAlertModal =
        document.getElementById(
            "closeAlertModal"
        );


    const viewAlertsBtn =
        document.getElementById(
            "viewAlertsBtn"
        );


    function fillAlertModal() {

        const title =
            document.getElementById(
                "modalAlertTitle"
            );


        const message =
            document.getElementById(
                "modalAlertMessage"
            );


        const weather =
            document.getElementById(
                "modalWeatherRisk"
            );


        const flood =
            document.getElementById(
                "modalFloodRisk"
            );


        const lightning =
            document.getElementById(
                "modalLightningRisk"
            );


        const storm =
            document.getElementById(
                "modalStormRisk"
            );


        const overall =
            document.getElementById(
                "modalOverallRisk"
            );


        if (title) {

            title.innerText =
                "🛡️ DisasterGuard AI Alert";

        }


        if (message) {

            message.innerText =
                "Current multi-hazard environmental conditions.";

        }


        if (weather) {

            weather.innerText =
                `${window.currentWeatherRisk || 0}%`;

        }


        if (flood) {

            flood.innerText =
                `${window.currentFloodRisk || 0}%`;

        }


        if (lightning) {

            lightning.innerText =
                `${window.currentLightningRisk || 0}%`;

        }


        if (storm) {

            storm.innerText =
                `${window.currentStormRisk || 0}%`;

        }


        if (overall) {

            overall.innerText =
                `${window.currentOverallRisk || 0}%`;

        }

    }


    if (viewAlertsBtn) {

        viewAlertsBtn.addEventListener(
            "click",
            function () {

                fillAlertModal();


                if (alertModal) {

                    alertModal.style.display =
                        "flex";

                    alertModal.classList.add(
                        "show"
                    );

                }

            }
        );

    }


    if (closeAlertModal) {

        closeAlertModal.addEventListener(
            "click",
            function () {

                if (alertModal) {

                    alertModal.style.display =
                        "none";

                    alertModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    if (alertModal) {

        alertModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    alertModal
                ) {

                    alertModal.style.display =
                        "none";

                    alertModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // =====================================================
    // SAFE ROUTE
    // =====================================================

    const safeRouteBtn =
        document.getElementById(
            "safeRouteBtn"
        );


    const safeRouteDestination =
        document.getElementById(
            "safeRouteDestination"
        );


    const safeRouteMessage =
        document.getElementById(
            "safeRouteMessage"
        );


    if (safeRouteBtn) {

        safeRouteBtn.addEventListener(
            "click",
            async function () {

                console.log(
                    "🛣️ AI SAFE ROUTE COMPARISON STARTED"
                );


                const destination =
                    safeRouteDestination
                    ? safeRouteDestination.value.trim()
                    : "";


                if (!destination) {

                    if (safeRouteMessage) {

                        safeRouteMessage.innerText =
                            "📍 Please enter your destination first.";

                    }


                    return;
                }


                const latitude =
                    Number(
                        window.currentLatitude
                    );


                const longitude =
                    Number(
                        window.currentLongitude
                    );


                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {

                    if (safeRouteMessage) {

                        safeRouteMessage.innerText =
                            "📍 Please search your location first.";

                    }


                    return;
                }


                const risk =
                    window.currentOverallRisk || 0;


                const flood =
                    window.currentFloodRisk || 0;


                const lightning =
                    window.currentLightningRisk || 0;


                const storm =
                    window.currentStormRisk || 0;


                const weather =
                    window.currentWeatherRisk || 0;


                if (safeRouteMessage) {

                    safeRouteMessage.innerText =
                        "🔄 Finding routes and analysing multi-hazard risk...";

                }


                try {

                    const params =
                        new URLSearchParams({

                            latitude:
                                latitude,

                            longitude:
                                longitude,

                            destination:
                                destination,

                            risk:
                                risk,

                            flood:
                                flood,

                            lightning:
                                lightning,

                            storm:
                                storm,

                            weather:
                                weather

                        });


                    const response =
                        await fetch(
                            `/compare-routes?${params.toString()}`
                        );


                    const data =
                        await response.json();


                    console.log(
                        "🤖 AI ROUTE COMPARISON RESULT:",
                        data
                    );


                    if (!data.success) {

                        if (safeRouteMessage) {

                            safeRouteMessage.innerText =
                                "❌ " +
                                (
                                    data.message ||
                                    "Unable to compare routes."
                                );

                        }


                        return;
                    }


                    if (
                        !data.routes ||
                        data.routes.length === 0
                    ) {

                        if (safeRouteMessage) {

                            safeRouteMessage.innerText =
                                "❌ No routes found.";

                        }


                        return;
                    }


                    window.currentRouteDestination =
                        destination;


                    window.currentRouteData =
                        data;


                    showRouteAnalysis(
                        data
                    );


                    if (safeRouteMessage) {

                        safeRouteMessage.innerText =
                            "🗺️ Routes analysed successfully. AI recommended the safest available route.";

                    }

                }
                catch (error) {

                    console.error(
                        "❌ AI Route Comparison Error:",
                        error
                    );


                    if (safeRouteMessage) {

                        safeRouteMessage.innerText =
                            "❌ Unable to analyse safe route.";

                    }

                }

            }
        );

    }


    // =====================================================
    // ROUTE MODAL ELEMENTS
    // =====================================================

    const routeModal =
        document.getElementById(
            "routeAnalysisModal"
        );


    const closeRouteModal =
        document.getElementById(
            "closeRouteModal"
        );


    const routeDestination =
        document.getElementById(
            "routeDestination"
        );


    const routeOverallRisk =
        document.getElementById(
            "routeOverallRisk"
        );


    const routeResults =
        document.getElementById(
            "routeResults"
        );


    const routeRecommendation =
        document.getElementById(
            "routeRecommendation"
        );


    const openRecommendedRoute =
        document.getElementById(
            "openRecommendedRoute"
        );


    // =====================================================
    // CLOSE ROUTE MODAL
    // =====================================================

    if (closeRouteModal) {

        closeRouteModal.addEventListener(
            "click",
            function () {

                if (routeModal) {

                    routeModal.style.display =
                        "none";

                    routeModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    if (routeModal) {

        routeModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    routeModal
                ) {

                    routeModal.style.display =
                        "none";

                    routeModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    // =====================================================
    // SHOW ROUTE ANALYSIS
    // =====================================================

    function showRouteAnalysis(data) {

        console.log(
            "🗺️ SHOW ROUTE ANALYSIS STARTED"
        );


        if (!routeModal) {

            console.error(
                "❌ routeAnalysisModal not found"
            );

            return;
        }


        if (
            !data ||
            !data.success
        ) {

            console.error(
                "❌ Invalid route data:",
                data
            );

            return;
        }


        // ================================================
        // DESTINATION
        // ================================================

        if (routeDestination) {

            routeDestination.innerText =
                data.destination ||
                "Unknown destination";

        }


        // ================================================
        // OVERALL RISK
        // ================================================

        if (routeOverallRisk) {

            routeOverallRisk.innerText =
                `${data.overall_risk || 0}%`;

        }


        // ================================================
        // CLEAR OLD ROUTES
        // ================================================

        if (
            !window.routeLayerGroup
        ) {

            window.routeLayerGroup =
                L.layerGroup().addTo(
                    window.disasterGuardMap
                );

        }


        window.routeLayerGroup.clearLayers();


        // ================================================
        // ROUTES
        // ================================================

        const routes =
            data.routes || [];


        const recommendedRouteNumber =
            Number(
                data.recommended_route
            );


        console.log(
            "⭐ BACKEND RECOMMENDED ROUTE:",
            recommendedRouteNumber
        );


        // ================================================
        // CLEAR RESULT CARDS
        // ================================================

        if (routeResults) {

            routeResults.innerHTML = "";

        }


        // ================================================
        // DRAW ROUTES
        // ================================================

        const drawnLayers = [];


        routes.forEach(
            function (route) {

                if (
                    !route.geometry ||
                    !route.geometry.coordinates
                ) {

                    console.warn(
                        "⚠️ Route geometry missing:",
                        route
                    );

                    return;
                }


                const coordinates =
                    route.geometry.coordinates;


                const latLngs =
                    coordinates.map(
                        function (coordinate) {

                            return [
                                coordinate[1],
                                coordinate[0]
                            ];

                        }
                    );


                const isRecommended =
                    Number(
                        route.route_number
                    ) ===
                    recommendedRouteNumber;


                const routeColor =
                    isRecommended
                    ? "#16a34a"
                    : "#64748b";


                const routeWeight =
                    isRecommended
                    ? 8
                    : 5;


                const routeOpacity =
                    isRecommended
                    ? 1
                    : 0.65;


                const polyline =
                    L.polyline(
                        latLngs,
                        {

                            color:
                                routeColor,

                            weight:
                                routeWeight,

                            opacity:
                                routeOpacity,

                            lineCap:
                                "round",

                            lineJoin:
                                "round"

                        }
                    );


                polyline.bindPopup(`

                    <div style="
                        min-width:180px;
                    ">

                        <strong>
                            ${
                                isRecommended
                                ? "🟢 AI Recommended Route"
                                : "⚪ Alternative Route"
                            }
                        </strong>

                        <br><br>

                        Route:
                        ${route.route_number}

                        <br>

                        Distance:
                        ${route.distance_km} km

                        <br>

                        Time:
                        ${route.duration_minutes} min

                        <br>

                        Risk:
                        ${route.risk_score}/100

                    </div>

                `);


                polyline.addTo(
                    window.routeLayerGroup
                );


                drawnLayers.push(
                    polyline
                );


                // =========================================
                // RESULT CARD
                // =========================================

                if (routeResults) {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.style.padding =
                        "12px";


                    card.style.marginBottom =
                        "10px";


                    card.style.borderRadius =
                        "10px";


                    card.style.border =
                        isRecommended
                        ? "2px solid #16a34a"
                        : "1px solid #cbd5e1";


                    card.style.background =
                        isRecommended
                        ? "#f0fdf4"
                        : "#f8fafc";


                    card.innerHTML = `

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            margin-bottom:8px;
                        ">

                            <strong>
                                Route ${route.route_number}
                            </strong>

                            ${
                                isRecommended
                                ?
                                `
                                <span style="
                                    color:#16a34a;
                                    font-weight:700;
                                ">
                                    🟢 RECOMMENDED
                                </span>
                                `
                                :
                                `
                                <span style="
                                    color:#64748b;
                                    font-weight:600;
                                ">
                                    ⚪ ALTERNATIVE
                                </span>
                                `
                            }

                        </div>


                        <div>
                            📏
                            ${route.distance_km}
                            km
                        </div>


                        <div>
                            ⏱️
                            ${route.duration_minutes}
                            minutes
                        </div>


                        <div>
                            ⚠️ Risk:
                            <strong>
                                ${route.risk_score}/100
                            </strong>
                        </div>

                    `;


                    routeResults.appendChild(
                        card
                    );

                }

            }
        );


        console.log(
            "🗺️ ROUTES DRAWN:",
            drawnLayers.length
        );


        // ================================================
        // DESTINATION MARKER
        // ================================================

        if (
            data.destination_coordinates &&
            window.disasterGuardMap
        ) {

            const destinationLat =
                Number(
                    data.destination_coordinates
                        .latitude
                );


            const destinationLon =
                Number(
                    data.destination_coordinates
                        .longitude
                );


            const destinationMarker =
                L.marker([
                    destinationLat,
                    destinationLon
                ]);


            destinationMarker.bindPopup(`
                <b>📍 Destination</b>
                <br>
                ${data.destination}
            `);


            destinationMarker.addTo(
                window.routeLayerGroup
            );

        }


        // ================================================
        // FIT MAP
        // ================================================

        if (
            drawnLayers.length > 0 &&
            window.disasterGuardMap
        ) {

            const group =
                L.featureGroup(
                    drawnLayers
                );


            window.disasterGuardMap.fitBounds(
                group.getBounds(),
                {
                    padding: [
                        40,
                        40
                    ]
                }
            );

        }


        // ================================================
        // RECOMMENDATION TEXT
        // ================================================

        const recommendedRoute =
            routes.find(
                function (route) {

                    return Number(
                        route.route_number
                    ) ===
                    recommendedRouteNumber;

                }
            );


        if (
            routeRecommendation &&
            recommendedRoute
        ) {

            routeRecommendation.innerHTML = `

                <div style="
                    padding:12px;
                    border-radius:10px;
                    background:#f0fdf4;
                    border:1px solid #16a34a;
                ">

                    <strong style="
                        color:#16a34a;
                    ">

                        🟢 AI Recommended Route:
                        Route
                        ${recommendedRouteNumber}

                    </strong>

                    <br><br>

                    📏 Distance:
                    <strong>
                        ${recommendedRoute.distance_km}
                        km
                    </strong>

                    <br>

                    ⏱️ Estimated Time:
                    <strong>
                        ${recommendedRoute.duration_minutes}
                        minutes
                    </strong>

                    <br>

                    ⚠️ Risk Score:
                    <strong>
                        ${recommendedRoute.risk_score}/100
                    </strong>

                    <br><br>

                    <span style="
                        color:#16a34a;
                        font-weight:700;
                    ">
                        🟢 Green line =
                        AI Recommended Route
                    </span>

                    <br>

                    <span style="
                        color:#64748b;
                        font-weight:700;
                    ">
                        ⚪ Gray line =
                        Alternative Route
                    </span>

                </div>

            `;

        }


        // ================================================
        // SAVE DATA
        // ================================================

        window.currentRouteData =
            data;


        window.currentRouteDestination =
            data.destination;


        // ================================================
        // OPEN MODAL
        // ================================================

        routeModal.style.display =
            "flex";


        routeModal.classList.add(
            "show"
        );


        console.log(
            "🟢 FINAL RECOMMENDED ROUTE:",
            recommendedRouteNumber
        );

    }


    // =====================================================
    // MAKE FUNCTION GLOBAL
    // =====================================================

    window.showRouteAnalysis =
        showRouteAnalysis;


    // =====================================================
    // GOOGLE MAPS
    // =====================================================

    if (openRecommendedRoute) {

        openRecommendedRoute.addEventListener(
            "click",
            function () {

                const latitude =
                    Number(
                        window.currentLatitude
                    );


                const longitude =
                    Number(
                        window.currentLongitude
                    );


                const destination =
                    window.currentRouteDestination ||
                    (
                        safeRouteDestination
                            ? safeRouteDestination.value
                            : ""
                    ) ||
                    "";


                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude) ||
                    !destination
                ) {

                    alert(
                        "❌ Route information is not available."
                    );

                    return;
                }


                const mapsURL =
                    "https://www.google.com/maps/dir/?api=1" +
                    "&origin=" +
                    encodeURIComponent(
                        `${latitude},${longitude}`
                    ) +
                    "&destination=" +
                    encodeURIComponent(
                        destination
                    ) +
                    "&travelmode=driving";


                console.log(
                    "🗺️ Opening Google Maps:",
                    mapsURL
                );


                window.open(
                    mapsURL,
                    "_blank"
                );

            }
        );

    }


    // =====================================================
    // CLEAN ORPHAN ROUTE LAYERS
    // =====================================================

    window.cleanupOrphanRouteLayers =
        function () {

            const currentMap =
                window.disasterGuardMap;


            if (!currentMap) {

                console.warn(
                    "⚠️ Map not available for route cleanup"
                );

                return;
            }


            const layersToRemove =
                [];


            currentMap.eachLayer(
                function (layer) {

                    if (
                        layer instanceof L.Polyline &&
                        !(layer instanceof L.Polygon)
                    ) {

                        layersToRemove.push(
                            layer
                        );

                    }

                }
            );


            layersToRemove.forEach(
                function (layer) {

                    currentMap.removeLayer(
                        layer
                    );

                }
            );


            console.log(
                "🧹 Old/orphan route cleanup completed"
            );

        };


    // =====================================================
    // MAP RESIZE FIX
    // =====================================================

    setTimeout(
        function () {

            if (window.disasterGuardMap) {

                window.disasterGuardMap.invalidateSize();

            }

        },
        500
    );


    // =====================================================
// 🚨 AI EMERGENCY ACTION CENTER
// =====================================================

function initializeEmergencyActionCenter() {

    const emergencySection =
        document.getElementById(
            "emergencyActionCenter"
        );

    if (!emergencySection) {

        console.warn(
            "⚠️ Emergency Action Center HTML not found."
        );

        return;
    }


    // =================================================
    // ELEMENTS
    // =================================================

    const statusBadge =
        document.getElementById(
            "emergencyStatusBadge"
        );

    const statusCard =
        document.getElementById(
            "emergencyStatusCard"
        );

    const statusIcon =
        document.getElementById(
            "emergencyStatusIcon"
        );

    const statusTitle =
        document.getElementById(
            "emergencyStatusTitle"
        );

    const statusMessage =
        document.getElementById(
            "emergencyStatusMessage"
        );

    const riskScoreElement =
        document.getElementById(
            "emergencyRiskScore"
        );

    const hazardRisk =
        document.getElementById(
            "hazardInstructionRisk"
        );

    const hazardInstructions =
        document.getElementById(
            "hazardSpecificInstructions"
        );

    const monitoringMessage =
        document.getElementById(
            "emergencyMonitoringMessage"
        );

    const emergencyTimer =
        document.getElementById(
            "emergencyTimer"
        );

    const activateEmergencyBtn =
        document.getElementById(
            "activateEmergencyBtn"
        );

    const findShelterBtn =
        document.getElementById(
            "findShelterBtn"
        );

    const findHospitalBtn =
        document.getElementById(
            "findHospitalBtn"
        );

    const findPoliceBtn =
        document.getElementById(
            "findPoliceBtn"
        );

    const navigateSafeBtn =
        document.getElementById(
            "navigateSafeBtn"
        );


    // =================================================
    // RISK LEVEL
    // =================================================

    function getEmergencyLevel(risk) {

        if (risk >= 75) {

            return {
                level: "CRITICAL",
                icon: "🔴",
                title:
                    "Immediately Move to Safe Shelter",
                message:
                    "Critical disaster risk detected. Avoid unnecessary travel and follow official emergency instructions.",
                className:
                    "emergency-critical"
            };

        }


        if (risk >= 50) {

            return {
                level: "HIGH",
                icon: "🟠",
                title:
                    "Avoid Low-Lying Areas & Unnecessary Travel",
                message:
                    "High disaster risk detected. Avoid exposed and low-lying areas and keep monitoring emergency alerts.",
                className:
                    "emergency-high"
            };

        }


        if (risk >= 25) {

            return {
                level: "MEDIUM",
                icon: "🟡",
                title:
                    "Stay Alert and Monitor Conditions",
                message:
                    "Moderate risk detected. Stay alert, monitor weather conditions and avoid high-risk locations.",
                className:
                    "emergency-medium"
            };

        }


        return {
            level: "LOW",
            icon: "🟢",
            title:
                "Conditions Currently Stable",
            message:
                "Current environmental conditions are relatively stable. Continue monitoring for sudden changes.",
            className:
                "emergency-low"
        };

    }


    // =================================================
    // UPDATE STATUS
    // =================================================

    function updateEmergencyStatus() {

        const risk =
            Number(
                window.currentOverallRisk ?? 0
            );


        const emergency =
            getEmergencyLevel(risk);


        // STATUS BADGE

        if (statusBadge) {

            statusBadge.innerText =
                `${emergency.icon} ${emergency.level} RISK`;

        }


        // STATUS CARD

        if (statusCard) {

            statusCard.classList.remove(
                "emergency-low",
                "emergency-medium",
                "emergency-high",
                "emergency-critical"
            );

            statusCard.classList.add(
                emergency.className
            );

        }


        // ICON

        if (statusIcon) {

            statusIcon.innerText =
                emergency.icon;

        }


        // TITLE

        if (statusTitle) {

            statusTitle.innerText =
                emergency.title;

        }


        // MESSAGE

        if (statusMessage) {

            statusMessage.innerText =
                emergency.message;

        }


        // SCORE

        if (riskScoreElement) {

            riskScoreElement.innerText =
                `${Math.round(risk)}/100`;

        }


        // HAZARD BADGE

        if (hazardRisk) {

            hazardRisk.innerText =
                `${emergency.level} RISK • ${Math.round(risk)}/100`;

        }


        // MONITORING MESSAGE

        if (monitoringMessage) {

            if (risk >= 75) {

                monitoringMessage.innerText =
                    "Critical risk detected. Emergency response monitoring is active.";

            }

            else if (risk >= 50) {

                monitoringMessage.innerText =
                    "High-risk conditions detected. Continue monitoring emergency alerts.";

            }

            else if (risk >= 25) {

                monitoringMessage.innerText =
                    "Moderate-risk conditions detected. Stay alert for changes.";

            }

            else {

                monitoringMessage.innerText =
                    "System is actively monitoring current disaster conditions.";

            }

        }


        updateHazardSpecificInstructions();

    }


    // =================================================
    // HAZARD-SPECIFIC INSTRUCTIONS
    // =================================================

    function updateHazardSpecificInstructions() {

        if (!hazardInstructions) {
            return;
        }


        const flood =
            Number(
                window.currentFloodRisk ?? 0
            );

        const lightning =
            Number(
                window.currentLightningRisk ?? 0
            );

        const storm =
            Number(
                window.currentStormRisk ?? 0
            );


        const overall =
            Number(
                window.currentOverallRisk ?? 0
            );


        const instructions = [];


        // ---------------------------------------------
        // FLOOD
        // ---------------------------------------------

        if (flood >= 25) {

            instructions.push({

                type: "flood",

                icon: "🌊",

                title:
                    "Flood Safety",

                text:
                    flood >= 75
                        ? "Critical flood risk. Move to higher ground immediately and never attempt to cross flowing water."
                        : "Avoid waterlogged roads, drainage areas, low-lying locations and flooded crossings."

            });

        }


        // ---------------------------------------------
        // LIGHTNING
        // ---------------------------------------------

        if (lightning >= 25) {

            instructions.push({

                type: "lightning",

                icon: "⚡",

                title:
                    "Lightning Safety",

                text:
                    lightning >= 75
                        ? "Severe lightning risk. Move indoors immediately and stay away from windows, rooftops and open areas."
                        : "Avoid open areas, isolated trees, rooftops and exposed locations during thunder activity."

            });

        }


        // ---------------------------------------------
        // STORM
        // ---------------------------------------------

        if (storm >= 25) {

            instructions.push({

                type: "storm",

                icon: "⛈️",

                title:
                    "Storm Safety",

                text:
                    storm >= 75
                        ? "Severe storm risk. Stay indoors, secure loose objects and avoid unnecessary travel."
                        : "Avoid exposed roads and areas with strong winds. Monitor official weather updates."

            });

        }


        // ---------------------------------------------
        // GENERAL CRITICAL
        // ---------------------------------------------

        if (
            overall >= 75
        ) {

            instructions.unshift({

                type: "critical",

                icon: "🚨",

                title:
                    "Critical Emergency Action",

                text:
                    "Immediately move to a safer location or designated shelter and follow official emergency instructions."

            });

        }


        // ---------------------------------------------
        // GENERAL HIGH
        // ---------------------------------------------

        else if (
            overall >= 50 &&
            instructions.length === 0
        ) {

            instructions.push({

                type: "high",

                icon: "🟠",

                title:
                    "High Risk Guidance",

                text:
                    "Avoid unnecessary travel and stay away from known disaster-prone areas."

            });

        }


        // ---------------------------------------------
        // MEDIUM
        // ---------------------------------------------

        if (
            overall >= 25 &&
            instructions.length === 0
        ) {

            instructions.push({

                type: "medium",

                icon: "🟡",

                title:
                    "Stay Alert",

                text:
                    "Monitor changing conditions and keep emergency contacts ready."

            });

        }


        // ---------------------------------------------
        // LOW
        // ---------------------------------------------

        if (
            instructions.length === 0
        ) {

            instructions.push({

                type: "low",

                icon: "🟢",

                title:
                    "Conditions Stable",

                text:
                    "No major hazard-specific action is currently required. Continue normal monitoring."

            });

        }


        hazardInstructions.innerHTML =
            instructions
                .map(function (item) {

                    return `
                        <div class="hazard-tip hazard-tip-${item.type}">

                            <div class="hazard-tip-icon">
                                ${item.icon}
                            </div>

                            <div>

                                <strong>
                                    ${item.title}
                                </strong>

                                <p>
                                    ${item.text}
                                </p>

                            </div>

                        </div>
                    `;

                })
                .join("");

    }


    // =================================================
    // FIND NEAREST PLACE
    // =================================================

    function searchNearbyPlace(
        type,
        resultElementId
    ) {

        const resultElement =
            document.getElementById(
                resultElementId
            );


        const latitude =
            Number(
                window.currentLatitude
            );

        const longitude =
            Number(
                window.currentLongitude
            );


        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {

            if (resultElement) {

                resultElement.innerText =
                    "Please search your location first.";

            }

            return;

        }


        let query = "";


        if (type === "shelter") {

            query =
                "emergency shelter";

        }

        else if (type === "hospital") {

            query =
                "hospital";

        }

        else if (type === "police") {

            query =
                "police station";

        }


        const mapsURL =
            "https://www.google.com/maps/search/" +
            encodeURIComponent(query) +
            "/@" +
            latitude +
            "," +
            longitude +
            ",13z";


        if (resultElement) {

            resultElement.innerText =
                "Opening nearby locations...";

        }


        window.open(
            mapsURL,
            "_blank"
        );

    }


    // =================================================
    // SHELTER
    // =================================================

    if (findShelterBtn) {

        findShelterBtn.addEventListener(
            "click",
            function () {

                searchNearbyPlace(
                    "shelter",
                    "nearestShelter"
                );

            }
        );

    }


    // =================================================
    // HOSPITAL
    // =================================================

    if (findHospitalBtn) {

        findHospitalBtn.addEventListener(
            "click",
            function () {

                searchNearbyPlace(
                    "hospital",
                    "nearestHospital"
                );

            }
        );

    }


    // =================================================
    // POLICE
    // =================================================

    if (findPoliceBtn) {

        findPoliceBtn.addEventListener(
            "click",
            function () {

                searchNearbyPlace(
                    "police",
                    "nearestPolice"
                );

            }
        );

    }


    // =================================================
    // NAVIGATE TO SAFETY
    // =================================================

    if (navigateSafeBtn) {

        navigateSafeBtn.addEventListener(
            "click",
            function () {

                const latitude =
                    Number(
                        window.currentLatitude
                    );

                const longitude =
                    Number(
                        window.currentLongitude
                    );


                if (
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)
                ) {

                    alert(
                        "📍 Please search your location first."
                    );

                    return;

                }


                const mapsURL =
                    "https://www.google.com/maps/search/" +
                    encodeURIComponent(
                        "safe shelter"
                    ) +
                    "/@" +
                    latitude +
                    "," +
                    longitude +
                    ",13z";


                window.open(
                    mapsURL,
                    "_blank"
                );

            }
        );

    }


    // =================================================
    // EMERGENCY TIMER
    // =================================================

    let timerSeconds = 600;

    let timerStarted = false;


    function startEmergencyTimer() {

        if (timerStarted) {
            return;
        }


        timerStarted = true;


        const timer =
            setInterval(
                function () {

                    if (
                        timerSeconds <= 0
                    ) {

                        clearInterval(timer);

                        if (emergencyTimer) {

                            emergencyTimer.innerText =
                                "00:00";

                        }

                        return;

                    }


                    timerSeconds--;


                    const minutes =
                        Math.floor(
                            timerSeconds / 60
                        );

                    const seconds =
                        timerSeconds % 60;


                    if (emergencyTimer) {

                        emergencyTimer.innerText =
                            String(minutes).padStart(2, "0") +
                            ":" +
                            String(seconds).padStart(2, "0");

                    }

                },
                1000
            );

    }


    // =================================================
    // ACTIVATE EMERGENCY MODE
    // =================================================

    if (activateEmergencyBtn) {

        activateEmergencyBtn.addEventListener(
            "click",
            function () {

                emergencySection.classList.add(
                    "emergency-active"
                );


                startEmergencyTimer();


                const risk =
                    Number(
                        window.currentOverallRisk ?? 0
                    );


                let message =
                    "Emergency mode activated.";


                if (risk >= 75) {

                    message =
                        "🚨 CRITICAL: Immediately move to a safe shelter and call 112 if immediate assistance is required.";

                }

                else if (risk >= 50) {

                    message =
                        "🟠 HIGH RISK: Avoid unnecessary travel and low-lying areas. Monitor emergency alerts.";

                }

                else if (risk >= 25) {

                    message =
                        "🟡 MEDIUM RISK: Stay alert and monitor changing conditions.";

                }

                else {

                    message =
                        "🟢 Current conditions are stable. Continue monitoring.";

                }


                if (monitoringMessage) {

                    monitoringMessage.innerText =
                        message;

                }


                alert(
                    message
                );

            }
        );

    }


    // =================================================
    // INITIAL UPDATE
    // =================================================

    updateEmergencyStatus();


    // =================================================
    // AUTO REFRESH
    // =================================================

    setInterval(
        function () {

            updateEmergencyStatus();

        },
        3000
    );


    console.log(
        "🚨 AI Emergency Action Center: READY"
    );

}

    // =====================================================
    // INITIAL LOG
    // =====================================================

    console.log(
        "=========================================="
    );

    console.log(
        "🛡️ DISASTERGUARD AI DASHBOARD READY"
    );

    console.log(
        "📍 Default Location: Lucknow"
    );

    console.log(
        "🗺️ Map: READY"
    );

    console.log(
        "🌦️ Weather Engine: READY"
    );

    console.log(
        "🤖 ML Prediction: READY"
    );

    console.log(
        "🛣️ AI Route Comparison: READY"
    );

    console.log(
        "=========================================="
    );

});



// =====================================================
// 🚨 AI EMERGENCY ACTION CENTER
// =====================================================

(function () {

    function initEmergencyActionCenter() {

        const center =
            document.getElementById("emergencyActionCenter") ||
            document.querySelector(".emergency-action-section");

        if (!center) {
            console.warn(
                "⚠️ Emergency Action Center HTML not found."
            );
            return;
        }

        console.log(
            "🚨 Emergency Action Center initialized"
        );


        // =================================================
        // HELPERS
        // =================================================

        function getRisk() {

            const risk = Number(
                window.currentOverallRisk
            );

            if (Number.isFinite(risk)) {
                return Math.max(0, Math.min(risk, 100));
            }

            // Fallback: read dashboard risk score
            const riskElement =
                document.getElementById("riskScore");

            if (riskElement) {

                const value =
                    parseFloat(
                        riskElement.innerText
                    );

                if (Number.isFinite(value)) {
                    return Math.max(
                        0,
                        Math.min(value, 100)
                    );
                }
            }

            return 0;
        }


        function getRiskInfo(risk) {

            if (risk >= 75) {

                return {
                    level: "CRITICAL",
                    icon: "🔴",
                    message:
                        "Immediately move to safe shelter"
                };

            }

            if (risk >= 50) {

                return {
                    level: "HIGH",
                    icon: "🟠",
                    message:
                        "Avoid low-lying areas & unnecessary travel"
                };

            }

            if (risk >= 25) {

                return {
                    level: "MEDIUM",
                    icon: "🟡",
                    message:
                        "Stay alert and monitor conditions"
                };

            }

            return {
                level: "LOW",
                icon: "🟢",
                message:
                    "Conditions currently stable"
            };
        }


        // =================================================
        // UPDATE STATUS
        // =================================================

        function updateEmergencyStatus() {

            const risk = getRisk();

            const info =
                getRiskInfo(risk);


            // Status badge
            const badge =
                center.querySelector(
                    ".emergency-status-badge"
                );

            if (badge) {

                badge.innerText =
                    `${info.icon} ${info.level} RISK`;

            }


            // Status card
            const statusCard =
                center.querySelector(
                    ".emergency-status-card"
                );

            if (statusCard) {

                statusCard.classList.remove(
                    "low",
                    "medium",
                    "high",
                    "critical"
                );

                statusCard.classList.add(
                    info.level.toLowerCase()
                );

            }


            // Status icon
            const statusIcon =
                center.querySelector(
                    ".emergency-status-icon"
                );

            if (statusIcon) {
                statusIcon.innerText =
                    info.icon;
            }


            // Status heading
            const statusHeading =
                center.querySelector(
                    ".emergency-status-content h3"
                );

            if (statusHeading) {

                statusHeading.innerText =
                    info.message;

            }


            // Status paragraph
            const statusParagraph =
                center.querySelector(
                    ".emergency-status-content p"
                );

            if (statusParagraph) {

                statusParagraph.innerText =
                    `Current AI risk score: ${Math.round(risk)}/100`;

            }


            // Risk score row
            const riskRow =
                center.querySelector(
                    ".emergency-risk-row"
                );

            if (riskRow) {

                const riskText =
                    riskRow.querySelector(
                        "strong, b"
                    );

                if (riskText) {
                    riskText.innerText =
                        `${Math.round(risk)}/100`;
                }

            }


            console.log(
                "🚨 Emergency Status:",
                info.level,
                risk
            );
        }


        // =================================================
        // HAZARD DETECTION
        // =================================================

        function getHazards() {

            return {

                Flood: Number(
                    window.currentFloodRisk || 0
                ),

                Lightning: Number(
                    window.currentLightningRisk || 0
                ),

                Storm: Number(
                    window.currentStormRisk || 0
                )

            };
        }


        function getHighestHazard() {

            const hazards =
                getHazards();

            let highest =
                "Flood";

            Object.keys(hazards).forEach(
                function (hazard) {

                    if (
                        hazards[hazard] >
                        hazards[highest]
                    ) {

                        highest = hazard;

                    }

                }
            );

            return {
                name: highest,
                score: hazards[highest]
            };
        }


        // =================================================
        // HAZARD INSTRUCTIONS
        // =================================================

        function updateHazardInstructions() {

            const list =
                center.querySelector(
                    ".hazard-instruction-list"
                );

            if (!list) {
                return;
            }


            const hazards =
                getHazards();

            const highest =
                getHighestHazard();


            list.innerHTML = `

                <div class="hazard-tip flood">
                    <div>
                        <strong>🌊 Flood Safety</strong>
                        <p>
                            Avoid low-lying and waterlogged areas.
                            Do not cross flooded roads or drains.
                        </p>
                    </div>
                    <span class="hazard-risk-badge">
                        ${Math.round(hazards.Flood)}%
                    </span>
                </div>


                <div class="hazard-tip lightning">
                    <div>
                        <strong>⚡ Lightning Safety</strong>
                        <p>
                            Stay indoors during lightning.
                            Avoid open fields, trees and exposed areas.
                        </p>
                    </div>
                    <span class="hazard-risk-badge">
                        ${Math.round(hazards.Lightning)}%
                    </span>
                </div>


                <div class="hazard-tip storm">
                    <div>
                        <strong>🌪️ Storm Safety</strong>
                        <p>
                            Avoid exposed roads and unstable structures.
                            Stay indoors during strong winds.
                        </p>
                    </div>
                    <span class="hazard-risk-badge">
                        ${Math.round(hazards.Storm)}%
                    </span>
                </div>

            `;


            console.log(
                "⚡ Highest Hazard:",
                highest.name,
                highest.score
            );
        }


        // =================================================
        // GOOGLE MAPS SEARCH
        // =================================================

        function openNearbyPlace(place) {

            const latitude =
                Number(window.currentLatitude);

            const longitude =
                Number(window.currentLongitude);


            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            ) {

                alert(
                    "📍 Current location is not available. Please detect/search your location first."
                );

                return;
            }


            const query =
                `${place} near ${latitude},${longitude}`;


            const url =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(query);


            window.open(
                url,
                "_blank"
            );
        }



        // =================================================
        // EMERGENCY CONTACTS
        // =================================================

        const contactCards =
            center.querySelectorAll(
                ".emergency-contact-card"
            );


        contactCards.forEach(
            function (card) {

                if (
                    card.dataset.contactBound ===
                    "true"
                ) {
                    return;
                }


                card.dataset.contactBound =
                    "true";


                card.addEventListener(
                    "click",
                    function () {

                        const text =
                            card.innerText;


                        const numberMatch =
                            text.match(
                                /\b(112|108|101|100)\b/
                            );


                        if (
                            numberMatch
                        ) {

                            window.location.href =
                                "tel:" +
                                numberMatch[1];

                        }

                    }
                );

            }
        );


        // =================================================
        // EMERGENCY COUNTDOWN
        // =================================================

        let emergencySeconds =
            10 * 60;

        let countdownRunning =
            false;

        let countdownInterval =
            null;


        function updateTimerDisplay() {

            const timer =
                center.querySelector(
                    ".emergency-monitoring-bar .timer"
                ) ||
                center.querySelector(
                    ".emergency-monitoring-bar strong"
                );


            if (!timer) {
                return;
            }


            const minutes =
                Math.floor(
                    emergencySeconds / 60
                );

            const seconds =
                emergencySeconds % 60;


            timer.innerText =
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        }


        function startCountdown() {

            if (countdownRunning) {
                return;
            }


            countdownRunning =
                true;


            countdownInterval =
                setInterval(
                    function () {

                        if (
                            emergencySeconds <= 0
                        ) {

                            clearInterval(
                                countdownInterval
                            );

                            countdownRunning =
                                false;

                            return;
                        }


                        emergencySeconds--;

                        updateTimerDisplay();

                    },
                    1000
                );

        }
        // =================================================
// 🚨 ACTIVATE EMERGENCY MODE
// =================================================

const emergencyModeButton =
    document.getElementById("activateEmergencyBtn");

const emergencyModePanel =
    document.getElementById("emergencyModePanel");

if (
    emergencyModeButton &&
    emergencyModeButton.dataset.emergencyBound !== "true"
) {
    emergencyModeButton.dataset.emergencyBound = "true";

    emergencyModeButton.addEventListener(
        "click",
        function () {

            // Open emergency mode panel
            if (emergencyModePanel) {
                emergencyModePanel.classList.add("active");
            }

            // Change button text
            emergencyModeButton.innerText =
                "🚨 EMERGENCY MODE ACTIVE";

            // Active button style
            emergencyModeButton.classList.add("active");

            // Start emergency countdown
            startCountdown();

            // Get current risk
            const risk = getRisk();

            console.log(
                "🚨 EMERGENCY MODE ACTIVATED",
                risk
            );

            // Emergency call confirmation
            const callEmergency = confirm(
                "🚨 Emergency Mode activated.\n\n" +
                "If this is a real emergency, call India's emergency number 112.\n\n" +
                "Do you want to call 112 now?"
            );

            if (callEmergency) {
                window.location.href = "tel:112";
            }
        }
    );
}
// =================================================
// 📍 FIND NEARBY EMERGENCY PLACES
// =================================================

function openNearbyPlace(placeType) {

    const latitude = Number(window.currentLatitude);
    const longitude = Number(window.currentLongitude);

    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {
        alert(
            "📍 Location is not available yet.\n\n" +
            "Please search your location first."
        );
        return;
    }

    // Convert all possible button values
    // into one standard search type.
    const normalizedType =
        String(placeType)
            .trim()
            .toLowerCase();

    let searchQuery = "";

    if (
        normalizedType === "shelter" ||
        normalizedType === "emergency shelter"
    ) {
        searchQuery = "emergency shelter";
    }

    else if (
        normalizedType === "hospital"
    ) {
        searchQuery = "hospital";
    }

    else if (
        normalizedType === "police" ||
        normalizedType === "police station"
    ) {
        searchQuery = "police station";
    }

    else {
        console.warn(
            "⚠️ Unknown nearby place type:",
            placeType
        );
        return;
    }

    const query =
        `${searchQuery} near ${latitude},${longitude}`;

    const mapsURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(query);

    console.log(
        "📍 Nearby search:",
        searchQuery
    );

    console.log(
        "📍 Current coordinates:",
        latitude,
        longitude
    );

    console.log(
        "🗺️ Google Maps URL:",
        mapsURL
    );

    window.open(
        mapsURL,
        "_blank"
    );
}

// =================================================
// 🗺️ NAVIGATE TO SAFETY
// =================================================

function navigateToSafety() {

    const latitude =
        Number(window.currentLatitude);

    const longitude =
        Number(window.currentLongitude);

    // Check current location
    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {

        alert(
            "📍 Current location is not available.\n\n" +
            "Please search your location first."
        );

        return;
    }

    // Safe destination
    const destination =
        "emergency shelter near " +
        latitude +
        "," +
        longitude;

    // Google Maps navigation URL
    const mapsURL =
        "https://www.google.com/maps/dir/?api=1" +
        "&origin=" +
        encodeURIComponent(
            `${latitude},${longitude}`
        ) +
        "&destination=" +
        encodeURIComponent(
            destination
        ) +
        "&travelmode=driving";

    console.log(
        "🗺️ NAVIGATE TO SAFETY"
    );

    console.log(
        "📍 Current Location:",
        latitude,
        longitude
    );

    console.log(
        "🛡️ Safe Destination:",
        destination
    );

    console.log(
        "🗺️ Google Maps Navigation:",
        mapsURL
    );

    // Open Google Maps
    window.open(
        mapsURL,
        "_blank"
    );
}


// =================================================
// 🗺️ NAVIGATE TO SAFETY BUTTON
// =================================================

const navigateSafeBtn =
    document.getElementById(
        "navigateSafeBtn"
    );

if (navigateSafeBtn) {

    navigateSafeBtn.addEventListener(
        "click",
        function () {

            console.log(
                "🗺️ NAVIGATE TO SAFETY CLICKED"
            );

            navigateToSafety();

        }
    );

}

// =================================================
// 📍 EMERGENCY PLACE BUTTONS
// =================================================

const findShelterBtn =
    document.getElementById("findShelterBtn");

const findHospitalBtn =
    document.getElementById("findHospitalBtn");

const findPoliceBtn =
    document.getElementById("findPoliceBtn");


if (findShelterBtn) {

    findShelterBtn.addEventListener(
        "click",
        function () {

            console.log(
                "📍 FIND SHELTER CLICKED"
            );

            openNearbyPlace("shelter");
        }
    );

}


if (findHospitalBtn) {

    findHospitalBtn.addEventListener(
        "click",
        function () {

            console.log(
                "🏥 FIND HOSPITAL CLICKED"
            );

            openNearbyPlace("hospital");
        }
    );

}


if (findPoliceBtn) {

    findPoliceBtn.addEventListener(
        "click",
        function () {

            console.log(
                "🚓 FIND POLICE CLICKED"
            );

            openNearbyPlace("police");
        }
    );

}
        // =================================================
        // ONE CLICK EMERGENCY ALERT
        // =================================================

        const allButtons =
            center.querySelectorAll(
                "button"
            );


        allButtons.forEach(
            function (button) {

                const text =
                    button.innerText
                        .toLowerCase();


                if (
                    (
                        text.includes("alert") ||
                        text.includes("emergency")
                    ) &&
                    button !== emergencyModeButton &&
                    button.dataset.alertBound !==
                        "true"
                ) {

                    button.dataset.alertBound =
                        "true";


                    button.addEventListener(
                        "click",
                        function () {

                            const confirmAlert =
                                confirm(
                                    "🚨 Send emergency alert?\n\nThis will open the emergency call option."
                                );


                            if (
                                confirmAlert
                            ) {

                                window.location.href =
                                    "tel:112";

                            }

                        }
                    );

                }

            }
        );


        // =================================================
        // INITIAL UPDATE
        // =================================================

        updateEmergencyStatus();

        updateHazardInstructions();

        updateTimerDisplay();


        // =================================================
        // KEEP CENTER SYNCHRONIZED
        // =================================================

        setInterval(
            function () {

                updateEmergencyStatus();

                updateHazardInstructions();

            },
            2000
        );

    }


    // =====================================================
    // SAFE DOM READY
    // =====================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initEmergencyActionCenter
        );

    }
    else {

        initEmergencyActionCenter();

    }

})();

// =====================================================
// 🔮 WHAT-IF DISASTER SIMULATOR
// =====================================================

(function initializeWhatIfSimulator() {

    function startSimulator() {

        const simulator =
            document.getElementById(
                "whatIfSimulator"
            );

        if (!simulator) {
            console.warn(
                "🔮 What-If Simulator HTML not found yet."
            );
            return false;
        }


        // =================================================
        // 🎛️ GET SIMULATOR ELEMENTS
        // =================================================

        const rainfallSlider =
            document.getElementById(
                "simulationRainfall"
            );

        const windSlider =
            document.getElementById(
                "simulationWind"
            );

        const humiditySlider =
            document.getElementById(
                "simulationHumidity"
            );


        const rainfallValue =
            document.getElementById(
                "simulationRainfallValue"
            );

        const windValue =
            document.getElementById(
                "simulationWindValue"
            );

        const humidityValue =
            document.getElementById(
                "simulationHumidityValue"
            );


        const currentRiskElement =
            document.getElementById(
                "simulationCurrentRisk"
            );

        const currentLevelElement =
            document.getElementById(
                "simulationCurrentLevel"
            );


        const riskElement =
            document.getElementById(
                "simulationRiskScore"
            );

        const riskLevelElement =
            document.getElementById(
                "simulationRiskLevel"
            );

        const riskChangeElement =
            document.getElementById(
                "simulationRiskChange"
            );


        const explanationElement =
            document.getElementById(
                "simulationExplanation"
            );


        const statusElement =
            document.getElementById(
                "simulationStatus"
            );


        const resetButton =
            document.getElementById(
                "resetSimulationBtn"
            );


        // =================================================
        // 🛡️ CHECK REQUIRED ELEMENTS
        // =================================================

        if (
            !rainfallSlider ||
            !windSlider ||
            !humiditySlider ||
            !currentRiskElement ||
            !riskElement ||
            !riskChangeElement
        ) {

            console.error(
                "❌ What-If Simulator elements are missing."
            );

            return false;
        }


        // Prevent duplicate initialization
        if (
            simulator.dataset.initialized === "true"
        ) {

            console.log(
                "🔮 What-If Simulator already initialized."
            );

            return true;
        }


        simulator.dataset.initialized = "true";

function getCurrentRisk() {

    // =============================================
    // 1️⃣ First check live dashboard risk
    // =============================================

    const windowRisk =
        Number(window.currentOverallRisk);


    // Use live window risk only when it is
    // actually greater than zero.
    if (
        Number.isFinite(windowRisk) &&
        windowRisk > 0
    ) {

        return Math.round(
            Math.max(
                0,
                Math.min(
                    100,
                    windowRisk
                )
            )
        );

    }


    // =============================================
    // 2️⃣ Check dashboard Risk Score element
    // =============================================

    const riskScoreElement =
        document.getElementById(
            "riskScore"
        );


    if (riskScoreElement) {

        const text =
            riskScoreElement.innerText
                .replace(
                    /[^0-9.-]/g,
                    ""
                );


        const domRisk =
            parseFloat(text);


        if (
            Number.isFinite(domRisk)
        ) {

            return Math.round(
                Math.max(
                    0,
                    Math.min(
                        100,
                        domRisk
                    )
                )
            );

        }

    }


    // =============================================
    // 3️⃣ If both are unavailable
    // =============================================

    return 0;
}
        // =================================================
        // 🚦 RISK LEVEL
        // =================================================

        function getRiskLevel(score) {

            if (score >= 75) {
                return "CRITICAL";
            }

            if (score >= 50) {
                return "HIGH";
            }

            if (score >= 25) {
                return "MEDIUM";
            }

            return "LOW";
        }


        // =================================================
        // 🔮 UPDATE SIMULATION
        // =================================================

        function calculateSimulation() {

            const currentRisk =
                getCurrentRisk();


            const rainfallChange =
                Number(
                    rainfallSlider.value
                );


            const windChange =
                Number(
                    windSlider.value
                );


            const humidityChange =
                Number(
                    humiditySlider.value
                );


            // ---------------------------------------------
            // Slider values
            // ---------------------------------------------

            if (rainfallValue) {

                rainfallValue.innerText =
                    (rainfallChange >= 0 ? "+" : "") +
                    rainfallChange +
                    "%";

            }


            if (windValue) {

                windValue.innerText =
                    (windChange >= 0 ? "+" : "") +
                    windChange +
                    "%";

            }


            if (humidityValue) {

                humidityValue.innerText =
                    (humidityChange >= 0 ? "+" : "") +
                    humidityChange +
                    "%";

            }


            // ---------------------------------------------
            // Simulation impact
            // ---------------------------------------------

            const rainfallImpact =
                rainfallChange * 0.20;


            const windImpact =
                windChange * 0.08;


            const humidityImpact =
                humidityChange * 0.10;


            let simulatedRisk =
                currentRisk +
                rainfallImpact +
                windImpact +
                humidityImpact;


            simulatedRisk =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round(
                            simulatedRisk
                        )
                    )
                );


            const change =
                simulatedRisk -
                currentRisk;


            const currentLevel =
                getRiskLevel(
                    currentRisk
                );


            const simulatedLevel =
                getRiskLevel(
                    simulatedRisk
                );


            // =================================================
            // 📊 UPDATE CURRENT RISK
            // =================================================

            currentRiskElement.innerText =
                currentRisk + "/100";


            if (currentLevelElement) {

                currentLevelElement.innerText =
                    currentLevel;

            }


            // =================================================
            // 🔮 UPDATE SIMULATED RISK
            // =================================================

            riskElement.innerText =
                simulatedRisk + "/100";


            if (riskLevelElement) {

                riskLevelElement.innerText =
                    simulatedLevel;

            }


            if (riskChangeElement) {

                riskChangeElement.innerText =
                    (change >= 0 ? "+" : "") +
                    change;

            }


            // =================================================
            // 🤖 EXPLANATION
            // =================================================

            updateSimulationExplanation(
                currentRisk,
                simulatedRisk,
                change,
                rainfallChange,
                windChange,
                humidityChange,
                simulatedLevel
            );


            // =================================================
            // 🟢 STATUS
            // =================================================

            if (
                rainfallChange === 0 &&
                windChange === 0 &&
                humidityChange === 0
            ) {

                if (statusElement) {

                    statusElement.innerText =
                        "🟢 READY";

                }

            }
            else {

                if (statusElement) {

                    statusElement.innerText =
                        "🔮 SIMULATING";

                }

            }


            console.log(
                "🔮 SIMULATION:",
                {
                    currentRisk,
                    simulatedRisk,
                    change,
                    rainfallChange,
                    windChange,
                    humidityChange
                }
            );

        }


        // =================================================
        // 🤖 SIMULATION EXPLANATION
        // =================================================

        function updateSimulationExplanation(
            currentRisk,
            simulatedRisk,
            change,
            rainfallChange,
            windChange,
            humidityChange,
            simulatedLevel
        ) {

            if (!explanationElement) {
                return;
            }


            // ---------------------------------------------
            // No changes
            // ---------------------------------------------

            if (
                rainfallChange === 0 &&
                windChange === 0 &&
                humidityChange === 0
            ) {

                explanationElement.innerText =
                    "🤖 Simulation matches current conditions. " +
                    "Increase the sliders to see how changing conditions may affect disaster risk.";

                return;
            }


            // ---------------------------------------------
            // Find main factor
            // ---------------------------------------------

            let mainFactor =
                "changing environmental conditions";


            if (
                rainfallChange > 0 &&
                rainfallChange >= windChange &&
                rainfallChange >= humidityChange
            ) {

                mainFactor =
                    "increased rainfall";

            }

            else if (
                windChange > 0 &&
                windChange >= humidityChange
            ) {

                mainFactor =
                    "increased wind speed";

            }

            else if (
                humidityChange > 0
            ) {

                mainFactor =
                    "increased humidity";

            }


            // ---------------------------------------------
            // Significant increase
            // ---------------------------------------------

            if (change >= 20) {

                explanationElement.innerText =
                    "🚨 AI Simulation Warning: " +
                    mainFactor +
                    " could significantly increase the overall risk. " +
                    "Simulated risk reaches " +
                    simulatedRisk +
                    "/100 (" +
                    simulatedLevel +
                    ").";

            }


            // ---------------------------------------------
            // Moderate increase
            // ---------------------------------------------

            else if (change >= 5) {

                explanationElement.innerText =
                    "⚠️ AI Simulation: " +
                    mainFactor +
                    " increases the estimated risk from " +
                    currentRisk +
                    " to " +
                    simulatedRisk +
                    ". Continue monitoring conditions.";

            }


            // ---------------------------------------------
            // Risk decreases
            // ---------------------------------------------

            else if (change < 0) {

                explanationElement.innerText =
                    "🟢 AI Simulation: The changed conditions " +
                    "reduce the estimated risk from " +
                    currentRisk +
                    " to " +
                    simulatedRisk +
                    ".";

            }


            // ---------------------------------------------
            // Small change
            // ---------------------------------------------

            else {

                explanationElement.innerText =
                    "🟡 AI Simulation: The changed conditions " +
                    "have only a small effect on the current risk.";

            }

        }


        // =================================================
        // 🎚️ SLIDER EVENTS
        // =================================================

        rainfallSlider.addEventListener(
            "input",
            calculateSimulation
        );


        windSlider.addEventListener(
            "input",
            calculateSimulation
        );


        humiditySlider.addEventListener(
            "input",
            calculateSimulation
        );


        // =================================================
        // 🔄 RESET SIMULATION
        // =================================================

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    rainfallSlider.value = 0;

                    windSlider.value = 0;

                    humiditySlider.value = 0;


                    calculateSimulation();


                    if (statusElement) {

                        statusElement.innerText =
                            "🟢 READY";

                    }


                    console.log(
                        "🔄 What-If Simulation reset."
                    );

                }
            );

        }


        // =================================================
        // 🚀 INITIAL CALCULATION
        // =================================================

        calculateSimulation();


        // =================================================
        // 🔄 SYNC WITH LIVE DASHBOARD RISK
        // =================================================

        const riskSyncInterval =
            setInterval(
                function () {

                    if (
                        !document.body.contains(
                            simulator
                        )
                    ) {

                        clearInterval(
                            riskSyncInterval
                        );

                        return;

                    }


                    const liveRisk =
                        getCurrentRisk();


                    const displayedRisk =
                        parseInt(
                            currentRiskElement.innerText
                        ) || 0;


                    /*
                     * Only refresh the simulation base
                     * automatically when the user has not
                     * changed any slider.
                     */

                    const slidersAtDefault =
                        Number(
                            rainfallSlider.value
                        ) === 0 &&
                        Number(
                            windSlider.value
                        ) === 0 &&
                        Number(
                            humiditySlider.value
                        ) === 0;


                    if (
                        slidersAtDefault &&
                        liveRisk !== displayedRisk
                    ) {

                        calculateSimulation();

                    }

                },
                1000
            );


        console.log(
            "🔮 What-If Disaster Simulator initialized successfully."
        );


        return true;

    }


    // =================================================
    // 🚀 START AFTER DOM IS READY
    // =================================================

    function bootSimulator() {

        if (startSimulator()) {
            return;
        }


        /*
         * If dashboard.js loads before the simulator HTML,
         * try again shortly instead of permanently failing.
         */

        let attempts = 0;


        const retryTimer =
            setInterval(
                function () {

                    attempts++;


                    if (
                        startSimulator()
                    ) {

                        clearInterval(
                            retryTimer
                        );

                        return;

                    }


                    if (
                        attempts >= 20
                    ) {

                        clearInterval(
                            retryTimer
                        );

                        console.error(
                            "❌ What-If Simulator could not be initialized after multiple attempts."
                        );

                    }

                },
                300
            );

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            bootSimulator
        );

    }
    else {

        bootSimulator();

    }

})();

// =====================================================
// 🧠 AI DISASTER COPILOT
// =====================================================
(function initializeAIDisasterCopilot() {

    // =====================================================
    // 🧠 GET CURRENT DASHBOARD DATA
    // =====================================================

    function getDashboardData() {

        function getValidNumber(value) {

            const number = Number(value);

            if (!Number.isFinite(number)) {
                return null;
            }

            return number;
        }


        function getElementNumber(id) {

            const element =
                document.getElementById(id);

            if (!element) {
                return null;
            }

            const text =
                element.innerText ||
                element.textContent ||
                "";

            const match =
                text.match(/-?\d+(\.\d+)?/);

            if (!match) {
                return null;
            }

            const number =
                Number(match[0]);

            return Number.isFinite(number)
                ? number
                : null;
        }


        // ---------------------------------------------
        // LIVE WINDOW VALUES
        // ---------------------------------------------

        let overallRisk =
            getValidNumber(
                window.currentOverallRisk
            );

        let weatherRisk =
            getValidNumber(
                window.currentWeatherRisk
            );

        let floodRisk =
            getValidNumber(
                window.currentFloodRisk
            );

        let lightningRisk =
            getValidNumber(
                window.currentLightningRisk
            );

        let stormRisk =
            getValidNumber(
                window.currentStormRisk
            );

        let historicalRisk =
            getValidNumber(
                window.currentHistoricalRisk
            );


        // ---------------------------------------------
        // FALLBACK VALUES
        // ---------------------------------------------

        if (overallRisk === null) {
            overallRisk =
                getElementNumber("riskScore");
        }

        if (weatherRisk === null) {
            weatherRisk =
                getElementNumber("weatherRisk");
        }

        if (floodRisk === null) {
            floodRisk =
                getElementNumber("floodRisk");
        }

        if (lightningRisk === null) {
            lightningRisk =
                getElementNumber("lightningRisk");
        }

        if (stormRisk === null) {
            stormRisk =
                getElementNumber("stormRisk");
        }

        if (historicalRisk === null) {
            historicalRisk =
                getElementNumber("historicalRisk");
        }


        // ---------------------------------------------
        // DEFAULT VALUES
        // ---------------------------------------------

        overallRisk =
            overallRisk === null ? 0 : overallRisk;

        weatherRisk =
            weatherRisk === null ? 0 : weatherRisk;

        floodRisk =
            floodRisk === null ? 0 : floodRisk;

        lightningRisk =
            lightningRisk === null ? 0 : lightningRisk;

        stormRisk =
            stormRisk === null ? 0 : stormRisk;

        historicalRisk =
            historicalRisk === null ? 0 : historicalRisk;


        // ---------------------------------------------
        // LIMIT 0–100
        // ---------------------------------------------

        overallRisk =
            Math.max(0, Math.min(100, overallRisk));

        weatherRisk =
            Math.max(0, Math.min(100, weatherRisk));

        floodRisk =
            Math.max(0, Math.min(100, floodRisk));

        lightningRisk =
            Math.max(0, Math.min(100, lightningRisk));

        stormRisk =
            Math.max(0, Math.min(100, stormRisk));

        historicalRisk =
            Math.max(0, Math.min(100, historicalRisk));


        return {

            overallRisk:
                Math.round(overallRisk),

            weatherRisk:
                Math.round(weatherRisk),

            floodRisk:
                Math.round(floodRisk),

            lightningRisk:
                Math.round(lightningRisk),

            stormRisk:
                Math.round(stormRisk),

            historicalRisk:
                Math.round(historicalRisk)
        };
    }


    // =====================================================
    // 🧠 UPDATE COPILOT DATA CARDS
    // =====================================================

    function updateCopilotContext() {

        const data =
            getDashboardData();


        const overallRiskElement =
            document.getElementById(
                "copilotOverallRisk"
            );

        const weatherRiskElement =
            document.getElementById(
                "copilotWeatherRisk"
            );

        const floodRiskElement =
            document.getElementById(
                "copilotFloodRisk"
            );

        const lightningRiskElement =
            document.getElementById(
                "copilotLightningRisk"
            );

        const stormRiskElement =
            document.getElementById(
                "copilotStormRisk"
            );

        const historicalRiskElement =
            document.getElementById(
                "copilotHistoricalRisk"
            );

        const status =
            document.getElementById(
                "copilotStatus"
            );


        if (overallRiskElement) {
            overallRiskElement.innerText =
                data.overallRisk + "/100";
        }

        if (weatherRiskElement) {
            weatherRiskElement.innerText =
                data.weatherRisk + "%";
        }

        if (floodRiskElement) {
            floodRiskElement.innerText =
                data.floodRisk + "%";
        }

        if (lightningRiskElement) {
            lightningRiskElement.innerText =
                data.lightningRisk + "%";
        }

        if (stormRiskElement) {
            stormRiskElement.innerText =
                data.stormRisk + "%";
        }

        if (historicalRiskElement) {
            historicalRiskElement.innerText =
                data.historicalRisk + "/100";
        }

        if (status) {
            status.innerText =
                "🟢 ONLINE";
        }
    }


    // =====================================================
    // 🧠 RISK LEVEL
    // =====================================================

    function getRiskLevel(score) {

        score =
            Number(score) || 0;

        if (score >= 75) {
            return "CRITICAL";
        }

        if (score >= 50) {
            return "HIGH";
        }

        if (score >= 25) {
            return "MEDIUM";
        }

        return "LOW";
    }


    // =====================================================
    // 🧠 FIND HIGHEST HAZARD
    // =====================================================

    function getHighestHazard(data) {

        const hazards = [

            {
                name: "Flood",
                score: data.floodRisk
            },

            {
                name: "Lightning",
                score: data.lightningRisk
            },

            {
                name: "Storm",
                score: data.stormRisk
            },

            {
                name: "Severe Weather",
                score: data.weatherRisk
            }

        ];


        hazards.sort(
            function (a, b) {
                return b.score - a.score;
            }
        );


        return hazards[0];
    }


    // =====================================================
    // 🛡️ SAFETY RECOMMENDATIONS
    // =====================================================

    function getSafetyAdvice(data) {

        const advice = [];


        if (data.overallRisk >= 75) {

            advice.push(
                "🚨 Move to a safer location or official shelter if conditions are becoming dangerous."
            );

            advice.push(
                "📞 Follow official emergency instructions and keep emergency contacts ready."
            );
        }

        else if (data.overallRisk >= 50) {

            advice.push(
                "⚠️ Avoid unnecessary travel and high-risk areas."
            );

            advice.push(
                "📱 Continue monitoring live disaster alerts."
            );
        }

        else if (data.overallRisk >= 25) {

            advice.push(
                "🟡 Stay alert and monitor changing weather conditions."
            );

            advice.push(
                "🚗 Avoid waterlogged roads and exposed locations."
            );
        }

        else {

            advice.push(
                "🟢 Current conditions appear relatively stable."
            );

            advice.push(
                "📡 Continue monitoring the dashboard for changes."
            );
        }


        if (data.floodRisk >= 50) {

            advice.push(
                "🌊 Avoid low-lying and waterlogged areas because flood risk is elevated."
            );
        }


        if (data.lightningRisk >= 50) {

            advice.push(
                "⚡ During lightning, stay indoors and avoid open areas, isolated trees and exposed structures."
            );
        }


        if (data.stormRisk >= 50) {

            advice.push(
                "⛈️ Avoid exposed roads and locations where strong winds may create hazards."
            );
        }


        return advice;
    }


    // =====================================================
    // 🤖 GENERATE AI RESPONSE
    // =====================================================

    function generateResponse(question) {

        const data =
            getDashboardData();


        const text =
            String(question)
                .toLowerCase()
                .trim();


        const level =
            getRiskLevel(
                data.overallRisk
            );


        const highestHazard =
            getHighestHazard(data);


        // ---------------------------------------------
        // GREETING
        // ---------------------------------------------

        if (
            text === "hi" ||
            text === "hello" ||
            text.includes("hey")
        ) {

            return (
                "👋 Hello! I am your DisasterGuard AI Copilot. " +
                "I can explain your current disaster risk, hazards and safety precautions."
            );
        }


        // ---------------------------------------------
        // OVERALL RISK
        // ---------------------------------------------

        if (
            text.includes("overall risk") ||
            text.includes("overall disaster risk") ||
            text.includes("risk score") ||
            text.includes("why is my risk") ||
            text.includes("why is my current disaster risk") ||
            text.includes("my disaster risk") ||
            text === "risk"
        ) {

            return (
                "🛡️ Your current overall disaster risk is " +
                data.overallRisk +
                "/100, which is classified as " +
                level +
                ". " +

                "The highest contributing hazard is " +
                highestHazard.name +
                " with an estimated risk of " +
                highestHazard.score +
                "%. " +

                "Weather risk is " +
                data.weatherRisk +
                "%, flood risk is " +
                data.floodRisk +
                "%, lightning risk is " +
                data.lightningRisk +
                "% and storm risk is " +
                data.stormRisk +
                "%."
            );
        }


        // ---------------------------------------------
        // FLOOD
        // ---------------------------------------------

        if (
            text.includes("flood") ||
            text.includes("waterlogging") ||
            text.includes("water logged")
        ) {

            if (data.floodRisk >= 75) {

                return (
                    "🌊 Flood risk is currently " +
                    data.floodRisk +
                    "% — a critical level. " +
                    "Avoid low-lying areas, flooded roads and drainage channels. " +
                    "Do not attempt to cross fast-moving water."
                );
            }


            if (data.floodRisk >= 50) {

                return (
                    "🌊 Flood risk is currently " +
                    data.floodRisk +
                    "%. " +
                    "Avoid low-lying and waterlogged areas and monitor local alerts."
                );
            }


            return (
                "🌊 Current flood risk is " +
                data.floodRisk +
                "%. " +
                "The dashboard does not currently indicate a high flood risk."
            );
        }


        // ---------------------------------------------
        // LIGHTNING
        // ---------------------------------------------

        if (
            text.includes("lightning") ||
            text.includes("thunder")
        ) {

            return (
                "⚡ Current lightning risk is " +
                data.lightningRisk +
                "%. " +
                "If lightning activity increases, move indoors, " +
                "avoid open areas, isolated trees and exposed structures."
            );
        }


        // ---------------------------------------------
        // STORM
        // ---------------------------------------------

        if (
            text.includes("storm") ||
            text.includes("wind")
        ) {

            return (
                "⛈️ Current storm risk is " +
                data.stormRisk +
                "%. " +
                "If strong winds develop, avoid exposed roads, " +
                "unstable structures and outdoor areas."
            );
        }


        // ---------------------------------------------
        // WEATHER
        // ---------------------------------------------

        if (
            text.includes("weather") ||
            text.includes("weather condition")
        ) {

            return (
                "🌦️ Current weather-related risk is " +
                data.weatherRisk +
                "%. " +
                "The dashboard combines current environmental " +
                "conditions with the multi-hazard risk engine."
            );
        }


        // ---------------------------------------------
        // HISTORICAL
        // ---------------------------------------------

        if (
            text.includes("historical") ||
            text.includes("past disaster") ||
            text.includes("history")
        ) {

            return (
                "📚 The current historical disaster risk score is " +
                data.historicalRisk +
                "/100. " +
                "This represents the historical disaster context " +
                "being used by DisasterGuard AI for the selected location."
            );
        }


        // ---------------------------------------------
        // SAFETY / PRECAUTIONS
        // ---------------------------------------------

        if (
            text.includes("precaution") ||
            text.includes("safety") ||
            text.includes("safe") ||
            text.includes("what should i do") ||
            text.includes("what can i do") ||
            text.includes("protect")
        ) {

            const advice =
                getSafetyAdvice(data);


            return (
                "🛡️ Based on the current dashboard conditions:\n\n" +
                advice.join("\n\n")
            );
        }


        // ---------------------------------------------
        // RAINFALL
        // ---------------------------------------------

        if (
            text.includes("rain") ||
            text.includes("rainfall")
        ) {

            return (
                "🌧️ Rainfall is an important factor in the " +
                "DisasterGuard AI risk engine. Higher rainfall can " +
                "increase flood and severe-weather risk."
            );
        }


        // ---------------------------------------------
        // WHAT-IF
        // ---------------------------------------------

        if (
            text.includes("increase rainfall") ||
            text.includes("rainfall increase") ||
            text.includes("what if")
        ) {

            return (
                "🔮 You can use the What-If Disaster Simulator " +
                "to increase rainfall, wind or humidity and observe " +
                "how the estimated risk changes."
            );
        }


        // ---------------------------------------------
        // EMERGENCY
        // ---------------------------------------------

        if (
            text.includes("emergency") ||
            text.includes("danger")
        ) {

            return (
                "🚨 If you are facing an actual emergency, move to a safe " +
                "location and contact India's emergency number 112. " +
                "DisasterGuard AI provides risk information but does not " +
                "replace official emergency services."
            );
        }


        // ---------------------------------------------
        // DEFAULT
        // ---------------------------------------------

        return (
            "🤖 I can help you understand your current disaster risk, " +
            "flood risk, lightning risk, storm risk, weather conditions, " +
            "historical risk and safety precautions. " +
            "Try asking: \"Why is my risk high?\""
        );
    }


    // =====================================================
    // 🚀 START COPILOT
    // =====================================================

    function startCopilot() {

        const copilot =
            document.getElementById(
                "aiDisasterCopilot"
            );


        if (!copilot) {

            console.warn(
                "🧠 AI Disaster Copilot HTML not found yet."
            );

            return false;
        }


        const input =
            document.getElementById(
                "copilotInput"
            );

        const sendButton =
            document.getElementById(
                "copilotSendBtn"
            );

        const chat =
            document.getElementById(
                "copilotChat"
            );

        const status =
            document.getElementById(
                "copilotStatus"
            );

        const quickButtons =
            copilot.querySelectorAll(
                ".copilot-question-btn"
            );


        if (
            !input ||
            !sendButton ||
            !chat
        ) {

            console.error(
                "❌ AI Disaster Copilot elements are missing."
            );

            return false;
        }


        if (
            copilot.dataset.initialized === "true"
        ) {

            return true;
        }


        copilot.dataset.initialized =
            "true";


        // ---------------------------------------------
        // SEND QUESTION
        // ---------------------------------------------

        function sendQuestion(question) {

            const userQuestion =
                String(question || "")
                    .trim();


            if (!userQuestion) {
                return;
            }


            addMessage(
                userQuestion,
                "user"
            );


            input.value = "";


            if (status) {
                status.innerText =
                    "🤖 ANALYSING";
            }


            setTimeout(
                function () {

                    updateCopilotContext();


                    const response =
                        generateResponse(
                            userQuestion
                        );


                    addMessage(
                        response,
                        "ai"
                    );


                    if (status) {
                        status.innerText =
                            "🟢 ONLINE";
                    }

                },
                350
            );
        }


        // ---------------------------------------------
        // ADD MESSAGE
        // ---------------------------------------------

        function addMessage(
            message,
            type
        ) {

            const messageWrapper =
                document.createElement(
                    "div"
                );


            if (type === "user") {

                messageWrapper.className =
                    "copilot-message copilot-message-user";

                messageWrapper.innerHTML =
                    '<div class="copilot-avatar">👤</div>' +
                    '<div class="copilot-message-content">' +
                    '<strong>You</strong>' +
                    '<p></p>' +
                    '</div>';

            }
            else {

                messageWrapper.className =
                    "copilot-message copilot-message-ai";

                messageWrapper.innerHTML =
                    '<div class="copilot-avatar">🧠</div>' +
                    '<div class="copilot-message-content">' +
                    '<strong>DisasterGuard AI</strong>' +
                    '<p></p>' +
                    '</div>';
            }


            const paragraph =
                messageWrapper.querySelector("p");


            if (paragraph) {
                paragraph.innerText =
                    message;
            }


            chat.appendChild(
                messageWrapper
            );


            chat.scrollTop =
                chat.scrollHeight;
        }


        // ---------------------------------------------
        // SEND BUTTON
        // ---------------------------------------------

        sendButton.addEventListener(
            "click",
            function () {

                sendQuestion(
                    input.value
                );
            }
        );


        // ---------------------------------------------
        // ENTER KEY
        // ---------------------------------------------

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendQuestion(
                        input.value
                    );
                }
            }
        );


        // ---------------------------------------------
        // QUICK QUESTIONS
        // ---------------------------------------------

        quickButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const question =
                            button.dataset.question ||
                            button.innerText;

                        sendQuestion(
                            question
                        );
                    }
                );
            }
        );


        // ---------------------------------------------
        // INITIAL CONTEXT
        // ---------------------------------------------

        updateCopilotContext();


        const contextInterval =
            setInterval(
                function () {

                    if (
                        !document.body.contains(
                            copilot
                        )
                    ) {

                        clearInterval(
                            contextInterval
                        );

                        return;
                    }


                    updateCopilotContext();

                },
                2000
            );


        console.log(
            "🧠 AI Disaster Copilot initialized successfully."
        );


        return true;
    }


    // =====================================================
    // 🔄 BOOT COPILOT
    // =====================================================

    function bootCopilot() {

        if (
            startCopilot()
        ) {

            return;
        }


        let attempts = 0;


        const retryTimer =
            setInterval(
                function () {

                    attempts++;


                    if (
                        startCopilot()
                    ) {

                        clearInterval(
                            retryTimer
                        );

                        return;
                    }


                    if (
                        attempts >= 20
                    ) {

                        clearInterval(
                            retryTimer
                        );

                        console.error(
                            "❌ AI Disaster Copilot could not be initialized."
                        );
                    }

                },
                300
            );
    }


    // =====================================================
    // DOM READY
    // =====================================================

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            bootCopilot
        );

    }
    else {

        bootCopilot();

    }

})();

/* =========================================================
   📡 DISASTERGUARD AI — OFFLINE EMERGENCY MODE
   Step 3: Network Detection + Local Storage
   ========================================================= */

(function initializeOfflineEmergencyMode() {

    "use strict";

    const STORAGE_KEY = "disasterGuardOfflineData";

    /* =====================================================
       GET ELEMENTS
       ===================================================== */

    function getElements() {

        return {
            section: document.getElementById("offlineEmergencyMode"),

            statusBadge:
                document.getElementById("offlineStatusBadge"),

            statusCard:
                document.getElementById("offlineStatusCard"),

            statusIcon:
                document.getElementById("offlineStatusIcon"),

            statusTitle:
                document.getElementById("offlineStatusTitle"),

            statusMessage:
                document.getElementById("offlineStatusMessage"),

            lastSync:
                document.getElementById("offlineLastSync"),

            risk:
                document.getElementById("offlineRisk"),

            riskLevel:
                document.getElementById("offlineRiskLevel"),

            hazard:
                document.getElementById("offlineHazard"),

            hazardRisk:
                document.getElementById("offlineHazardRisk"),

            location:
                document.getElementById("offlineLocation"),

            notice:
                document.getElementById("offlineEmergencyNotice"),

            emergencyCall:
                document.getElementById("offlineEmergencyCallBtn"),

            refresh:
                document.getElementById("offlineRefreshBtn")
        };

    }


    /* =====================================================
       RISK LEVEL
       ===================================================== */

    function getRiskLevel(score) {

        score = Number(score) || 0;

        if (score >= 75) {
            return "CRITICAL";
        }

        if (score >= 50) {
            return "HIGH";
        }

        if (score >= 25) {
            return "MEDIUM";
        }

        return "LOW";
    }


    /* =====================================================
       HIGHEST HAZARD
       ===================================================== */

    function getHighestHazard() {

        const hazards = {
            Flood:
                Number(window.currentFloodRisk) || 0,

            Lightning:
                Number(window.currentLightningRisk) || 0,

            Storm:
                Number(window.currentStormRisk) || 0,

            Weather:
                Number(window.currentWeatherRisk) || 0
        };

        let highestHazard = "Weather";
        let highestValue = hazards.Weather;

        Object.keys(hazards).forEach(function (hazard) {

            if (hazards[hazard] > highestValue) {

                highestHazard = hazard;
                highestValue = hazards[hazard];

            }

        });

        return {
            name: highestHazard,
            risk: highestValue
        };

    }


    /* =====================================================
       SAVE CURRENT DASHBOARD DATA
       ===================================================== */

    function saveOfflineData() {

        try {

            const risk =
                Number(window.currentOverallRisk) ||
                Number(
                    document.getElementById("riskScore")?.innerText
                        ?.replace(/[^\d.]/g, "")
                ) ||
                0;

            const hazard = getHighestHazard();

            const latitude =
                Number(window.currentLatitude);

            const longitude =
                Number(window.currentLongitude);

            let location = "Unknown location";

            if (
                Number.isFinite(latitude) &&
                Number.isFinite(longitude)
            ) {

                location =
                    `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

            }

            const offlineData = {

                risk: Math.round(risk),

                riskLevel:
                    getRiskLevel(risk),

                hazard:
                    hazard.name,

                hazardRisk:
                    Math.round(hazard.risk),

                weatherRisk:
                    Number(window.currentWeatherRisk) || 0,

                floodRisk:
                    Number(window.currentFloodRisk) || 0,

                lightningRisk:
                    Number(window.currentLightningRisk) || 0,

                stormRisk:
                    Number(window.currentStormRisk) || 0,

                latitude:
                    Number.isFinite(latitude)
                        ? latitude
                        : null,

                longitude:
                    Number.isFinite(longitude)
                        ? longitude
                        : null,

                location: location,

                savedAt:
                    new Date().toISOString()

            };

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(offlineData)
            );

            console.log(
                "💾 Offline emergency data saved:",
                offlineData
            );

        } catch (error) {

            console.error(
                "❌ Unable to save offline data:",
                error
            );

        }

    }


    /* =====================================================
       LOAD SAVED DATA
       ===================================================== */

    function loadOfflineData() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {

                console.log(
                    "📡 No previous offline data found."
                );

                return null;

            }

            const data =
                JSON.parse(saved);

            console.log(
                "📡 Offline data loaded:",
                data
            );

            return data;

        } catch (error) {

            console.error(
                "❌ Unable to load offline data:",
                error
            );

            return null;

        }

    }


    /* =====================================================
       FORMAT LAST SYNC TIME
       ===================================================== */

    function formatSavedTime(timestamp) {

        if (!timestamp) {
            return "No previous sync";
        }

        try {

            const date =
                new Date(timestamp);

            return date.toLocaleString(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );

        } catch (error) {

            return "Previous sync available";

        }

    }


    /* =====================================================
       UPDATE SAVED DATA UI
       ===================================================== */

    function updateSavedDataUI(data) {

        const elements =
            getElements();

        if (!data) {
            return;
        }

        if (elements.risk) {

            elements.risk.innerText =
                `${data.risk}/100`;

        }

        if (elements.riskLevel) {

            elements.riskLevel.innerText =
                data.riskLevel;

        }

        if (elements.hazard) {

            elements.hazard.innerText =
                data.hazard;

        }

        if (elements.hazardRisk) {

            elements.hazardRisk.innerText =
                `${data.hazardRisk}%`;

        }

        if (elements.location) {

            elements.location.innerText =
                data.location || "Unknown";

        }

        if (elements.lastSync) {

            elements.lastSync.innerText =
                formatSavedTime(data.savedAt);

        }

    }


    /* =====================================================
       UPDATE ONLINE STATE
       ===================================================== */

    function setOnlineState() {

        const elements =
            getElements();

        if (!elements.section) {
            return;
        }

        elements.section.classList.remove(
            "offline-mode"
        );

        if (elements.statusBadge) {

            elements.statusBadge.innerText =
                "🟢 ONLINE";

            elements.statusBadge.classList.remove(
                "offline",
                "warning"
            );

            elements.statusBadge.classList.add(
                "online"
            );

        }

        if (elements.statusCard) {

            elements.statusCard.classList.remove(
                "offline",
                "warning"
            );

            elements.statusCard.classList.add(
                "online"
            );

        }

        if (elements.statusIcon) {

            elements.statusIcon.innerText =
                "🟢";

        }

        if (elements.statusTitle) {

            elements.statusTitle.innerText =
                "Connection Active";

        }

        if (elements.statusMessage) {

            elements.statusMessage.innerText =
                "Live disaster, weather and safety data is available.";

        }

        if (elements.notice) {

            elements.notice.classList.remove(
                "offline",
                "warning"
            );

            elements.notice.innerText =
                "🟢 Connection active. DisasterGuard AI is receiving live data.";

        }

        console.log(
            "🟢 OFFLINE MODE: ONLINE"
        );

    }


    /* =====================================================
       UPDATE OFFLINE STATE
       ===================================================== */

    function setOfflineState() {

        const elements =
            getElements();

        if (!elements.section) {
            return;
        }

        elements.section.classList.add(
            "offline-mode"
        );

        if (elements.statusBadge) {

            elements.statusBadge.innerText =
                "🔴 OFFLINE";

            elements.statusBadge.classList.remove(
                "online",
                "warning"
            );

            elements.statusBadge.classList.add(
                "offline"
            );

        }

        if (elements.statusCard) {

            elements.statusCard.classList.remove(
                "online",
                "warning"
            );

            elements.statusCard.classList.add(
                "offline"
            );

        }

        if (elements.statusIcon) {

            elements.statusIcon.innerText =
                "📡";

        }

        if (elements.statusTitle) {

            elements.statusTitle.innerText =
                "Offline Emergency Mode Active";

        }

        if (elements.statusMessage) {

            elements.statusMessage.innerText =
                "Internet connection is unavailable. Using the last known safety information.";

        }

        if (elements.notice) {

            elements.notice.classList.remove(
                "warning"
            );

            elements.notice.classList.add(
                "offline"
            );

            elements.notice.innerText =
                "🔴 Internet connection lost. Last known disaster and safety information is being displayed.";

        }

        const savedData =
            loadOfflineData();

        updateSavedDataUI(savedData);

        console.log(
            "🔴 OFFLINE MODE: ACTIVE"
        );

    }


    /* =====================================================
       DETECT CONNECTION
       ===================================================== */

    function updateConnectionStatus() {

        if (navigator.onLine) {

            setOnlineState();

        } else {

            setOfflineState();

        }

    }


    /* =====================================================
       EMERGENCY CALL
       ===================================================== */

    function callEmergencyServices() {

        const confirmCall =
            confirm(
                "🚨 EMERGENCY SERVICES\n\n" +
                "You are about to call India's emergency number 112.\n\n" +
                "Continue?"
            );

        if (confirmCall) {

            window.location.href =
                "tel:112";

        }

    }


    /* =====================================================
       REFRESH OFFLINE DATA
       ===================================================== */

    function refreshOfflineData() {

        if (!navigator.onLine) {

            alert(
                "📡 You are currently offline.\n\n" +
                "Live data cannot be refreshed.\n" +
                "Showing the last known safety information."
            );

            setOfflineState();

            return;

        }

        saveOfflineData();

        alert(
            "✅ Safety information synchronized successfully."
        );

        setOnlineState();

    }


    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    function bindEvents() {

        window.addEventListener(
            "online",
            function () {

                console.log(
                    "🟢 Internet connection restored."
                );

                setOnlineState();

                setTimeout(
                    saveOfflineData,
                    1000
                );

            }
        );


        window.addEventListener(
            "offline",
            function () {

                console.log(
                    "🔴 Internet connection lost."
                );

                saveOfflineData();

                setOfflineState();

            }
        );


        const elements =
            getElements();


        if (
            elements.emergencyCall &&
            elements.emergencyCall.dataset.bound !== "true"
        ) {

            elements.emergencyCall.dataset.bound =
                "true";

            elements.emergencyCall.addEventListener(
                "click",
                callEmergencyServices
            );

        }


        if (
            elements.refresh &&
            elements.refresh.dataset.bound !== "true"
        ) {

            elements.refresh.dataset.bound =
                "true";

            elements.refresh.addEventListener(
                "click",
                refreshOfflineData
            );

        }

    }


    /* =====================================================
       PERIODIC DATA BACKUP
       ===================================================== */

    function startBackupMonitoring() {

        setInterval(
            function () {

                if (navigator.onLine) {

                    saveOfflineData();

                }

            },
            30000
        );

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        const elements =
            getElements();

        if (!elements.section) {

            console.warn(
                "⚠️ Offline Emergency Mode HTML not found."
            );

            return;

        }

        const savedData =
            loadOfflineData();

        if (savedData) {

            updateSavedDataUI(
                savedData
            );

        }

        bindEvents();

        updateConnectionStatus();

        startBackupMonitoring();

        console.log(
            "📡 Offline Emergency Mode initialized successfully."
        );

    }


    /* =====================================================
       DOM READY
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }

})();