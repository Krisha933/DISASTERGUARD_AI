from flask import Flask, render_template, jsonify, request, Response
import json
import urllib.request
import joblib
import urllib.parse
import urllib.request

app = Flask(__name__)
@app.route("/favicon.ico")
def favicon():
    return Response(status=204)
model = joblib.load("models/flood_model.pkl")
# ==============================
# LOAD HISTORICAL DISASTER DATA
# ==============================

with open("data/historical_disasters.json", "r") as file:
    historical_data = json.load(file)


def get_historical_risk(city):

    records = [
        record
        for record in historical_data
        if record["city"].lower() == city.lower()
    ]

    if not records:
        return {
            "score": 0,
            "level": "LOW",
            "incidents": 0
        }

    incidents = len(records)

    high_severity = sum(
        1
        for record in records
        if record["severity"] == "High"
    )

    medium_severity = sum(
        1
        for record in records
        if record["severity"] == "Medium"
    )

    score = (
        incidents * 10
        + high_severity * 10
        + medium_severity * 5
    )

    score = min(score, 100)

    if score < 25:
        level = "LOW"
    elif score < 50:
        level = "MEDIUM"
    elif score < 75:
        level = "HIGH"
    else:
        level = "CRITICAL"

    return {
        "score": score,
        "level": level,
        "incidents": incidents
    }
# ==============================
# HISTORICAL RISK API
# ==============================

@app.route("/historical-risk")
def historical_risk_api():

    city = request.args.get("city", "")

    result = get_historical_risk(city)

    return jsonify({
        "city": city,
        "historical_risk": result
    })
@app.route("/predict-flood", methods=["GET"])
def predict_flood():

    temperature = float(request.args.get("temperature", 25))
    rainfall = float(request.args.get("rainfall", 0))
    wind = float(request.args.get("wind", 10))

    prediction = model.predict([
        [temperature, rainfall, wind]
    ])[0]

    probability = model.predict_proba([
        [temperature, rainfall, wind]
    ])[0][1]

    if prediction == 1:
        result = "FLOOD RISK"
    else:
        result = "NORMAL"

    return jsonify({
        "prediction": int(prediction),
        "result": result,
        "probability": round(float(probability) * 100, 2),
        "temperature": temperature,
        "rainfall": rainfall,
        "wind": wind
    })
# =========================================
# AI SAFE ROUTE ANALYSIS
# =========================================

@app.route("/safe-route")
def safe_route():

    try:

        latitude = float(
            request.args.get("latitude", 0)
        )

        longitude = float(
            request.args.get("longitude", 0)
        )

        destination = request.args.get(
            "destination", ""
        ).strip()

        risk = float(
            request.args.get("risk", 0)
        )

        flood = float(
            request.args.get("flood", 0)
        )

        lightning = float(
            request.args.get("lightning", 0)
        )

        storm = float(
            request.args.get("storm", 0)
        )

        weather = float(
            request.args.get("weather", 0)
        )


        # Destination check

        if not destination:

            return jsonify({
                "success": False,
                "message": "Destination is required"
            }), 400


        # =========================================
        # FIND HIGHEST HAZARD
        # =========================================

        hazards = {

            "Flood": flood,

            "Lightning": lightning,

            "Storm": storm,

            "Severe Weather": weather

        }


        highest_hazard = max(
            hazards,
            key=hazards.get
        )


        highest_hazard_risk = hazards[
            highest_hazard
        ]


        # =========================================
        # AI ROUTE RISK ANALYSIS
        # =========================================

        if risk >= 75:

            route_status = "CRITICAL"

            recommendation = (
                "Avoid unnecessary travel. "
                "Move to a safer location and "
                "follow official emergency instructions."
            )


        elif risk >= 50:

            route_status = "HIGH RISK"

            recommendation = (
                f"High {highest_hazard} risk detected. "
                "Avoid unnecessary travel and "
                "high-risk areas."
            )


        elif risk >= 25:

            route_status = "CAUTION"

            recommendation = (
                f"Moderate {highest_hazard} risk detected. "
                "Travel with caution and avoid "
                "low-lying, waterlogged or exposed areas."
            )


        else:

            route_status = "LOW RISK"

            recommendation = (
                "Current environmental conditions "
                "are relatively safe for travel. "
                "Continue monitoring live alerts."
            )


        # =========================================
        # HAZARD-SPECIFIC RECOMMENDATION
        # =========================================

        if (
            highest_hazard == "Flood"
            and flood >= 25
        ):

            recommendation += (
                " Avoid waterlogged roads, "
                "drainage areas and low-lying locations."
            )


        elif (
            highest_hazard == "Lightning"
            and lightning >= 25
        ):

            recommendation += (
                " Avoid open areas and exposed locations "
                "during thunder or lightning activity."
            )


        elif (
            highest_hazard == "Storm"
            and storm >= 25
        ):

            recommendation += (
                " Avoid exposed roads and "
                "areas with strong wind conditions."
            )


        elif (
            highest_hazard == "Severe Weather"
            and weather >= 25
        ):

            recommendation += (
                " Monitor weather alerts before "
                "starting your journey."
            )


        # =========================================
        # SEND RESULT TO FRONTEND
        # =========================================

        return jsonify({

            "success": True,

            "destination": destination,

            "overall_risk": round(
                risk, 1
            ),

            "highest_hazard":
                highest_hazard,

            "highest_hazard_risk":
                round(
                    highest_hazard_risk,
                    1
                ),

            "route_status":
                route_status,

            "recommendation":
                recommendation,

            "origin": {

                "latitude":
                    latitude,

                "longitude":
                    longitude

            }

        })


    except Exception as error:

        print(
            "Safe Route Error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Unable to analyse safe route"

        }), 500
# =========================================
# ROUTE RISK COMPARISON
# =========================================

@app.route("/compare-routes", methods=["GET"])
def compare_routes():

    try:
        latitude = float(request.args.get("latitude"))
        longitude = float(request.args.get("longitude"))
        destination = request.args.get("destination", "").strip()

        overall_risk = float(request.args.get("risk", 0))
        flood_risk = float(request.args.get("flood", 0))
        lightning_risk = float(request.args.get("lightning", 0))
        storm_risk = float(request.args.get("storm", 0))
        weather_risk = float(request.args.get("weather", 0))

        if not destination:
            return jsonify({
                "success": False,
                "message": "Destination is required"
            }), 400

        # -----------------------------------------
        # STEP 1: GEOCODE DESTINATION
        # -----------------------------------------

        query = urllib.parse.quote(destination)

        geocode_url = (
            "https://nominatim.openstreetmap.org/search"
            "?format=json"
            "&limit=1"
            "&q=" + query
        )

        req = urllib.request.Request(
            geocode_url,
            headers={
                "User-Agent": "DisasterGuardAI/1.0"
            }
        )

        with urllib.request.urlopen(
            req,
            timeout=10
        ) as response:

            location_data = json.loads(
                response.read().decode("utf-8")
            )

        if not location_data:

            return jsonify({
                "success": False,
                "message": "Destination not found"
            }), 404

        destination_lat = float(
            location_data[0]["lat"]
        )

        destination_lon = float(
            location_data[0]["lon"]
        )

        # -----------------------------------------
        # STEP 2: GET ALTERNATIVE ROUTES
        # -----------------------------------------

        route_url = (
            "https://router.project-osrm.org/route/v1/driving/"
            f"{longitude},{latitude};"
            f"{destination_lon},{destination_lat}"
            "?overview=full"
            "&geometries=geojson"
            "&alternatives=true"
        )

        route_request = urllib.request.Request(
            route_url,
            headers={
                "User-Agent": "DisasterGuardAI/1.0"
            }
        )

        with urllib.request.urlopen(
            route_request,
            timeout=15
        ) as response:

            route_data = json.loads(
                response.read().decode("utf-8")
            )

        if route_data.get("code") != "Ok":

            return jsonify({
                "success": False,
                "message": "Unable to find routes"
            }), 500

        routes = route_data.get(
            "routes",
            []
        )

        if not routes:

            return jsonify({
                "success": False,
                "message": "No route found"
            }), 404

        # -----------------------------------------
        # STEP 3: CALCULATE ROUTE RISK
        # -----------------------------------------

        results = []

        base_hazard_risk = (
            (flood_risk * 0.35) +
            (storm_risk * 0.25) +
            (lightning_risk * 0.20) +
            (weather_risk * 0.20)
        )

        shortest_distance = min(
            route["distance"]
            for route in routes
        )

        for index, route in enumerate(routes):

            distance_km = (
                route["distance"] / 1000
            )

            duration_minutes = (
                route["duration"] / 60
            )

            # Longer routes have slightly more exposure.
            distance_factor = (
                distance_km /
                max(shortest_distance / 1000, 1)
            )

            exposure_factor = min(
                distance_factor * 5,
                15
            )

            route_risk = min(
                round(
                    (base_hazard_risk * 0.85) +
                    exposure_factor
                ),
                100
            )

            results.append({

                "route_number": index + 1,

                "distance_km": round(
                    distance_km,
                    2
                ),

                "duration_minutes": round(
                    duration_minutes
                ),

                "risk_score": route_risk,

                "geometry": route.get(
                    "geometry",
                    {}
                )
            })

        # -----------------------------------------
        # STEP 4: FIND LOWEST-RISK ROUTE
        # -----------------------------------------

        recommended_route = min(
            results,
            key=lambda route:
                route["risk_score"]
        )

        for route in results:

            if (
                route["route_number"] ==
                recommended_route["route_number"]
            ):
                route["recommended"] = True
            else:
                route["recommended"] = False

        return jsonify({

            "success": True,

            "destination": destination,

            "destination_coordinates": {
                "latitude": destination_lat,
                "longitude": destination_lon
            },

            "overall_risk": round(
                overall_risk,
                2
            ),

            "routes": results,

            "recommended_route":
                recommended_route["route_number"],

            "analysis": (
                "Routes are compared using estimated "
                "multi-hazard risk and route exposure."
            )

        })

    except Exception as error:

        print(
            "Route Comparison Error:",
            error
        )

        return jsonify({
            "success": False,
            "message": "Unable to compare routes"
        }), 500    
@app.route("/")
def home():
    return render_template("index.html")

# =========================================
# LOCATION SEARCH API
# =========================================

@app.route("/geocode")
def geocode():

    location = request.args.get("q", "").strip()

    if not location:
        return jsonify({
            "success": False,
            "message": "Location is required"
        }), 400

    try:

        query = urllib.parse.quote(location)

        url = (
            "https://nominatim.openstreetmap.org/search"
            "?format=json"
            "&limit=1"
            "&addressdetails=1"
            "&q=" + query
        )

        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "DisasterGuardAI/1.0"
            }
        )

        with urllib.request.urlopen(
            req,
            timeout=10
        ) as response:

            data = json.loads(
                response.read().decode("utf-8")
            )

        if not data:

            return jsonify({
                "success": False,
                "message": "Location not found"
            })

        result = data[0]

        return jsonify({
            "success": True,
            "latitude": float(result["lat"]),
            "longitude": float(result["lon"]),
            "display_name": result.get(
                "display_name",
                location
            ),
            "address": result.get(
                "address",
                {}
            )
        })

    except Exception as error:

        print("Geocoding Error:", error)

        return jsonify({
            "success": False,
            "message": "Unable to search location"
        }), 500
if __name__ == "__main__":
    app.run(debug=True)