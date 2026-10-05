# 🌪️ DisasterGuard AI

### AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

**Predict • Monitor • Analyse • Navigate • Stay Safe**

DisasterGuard AI is an intelligent disaster-risk monitoring platform designed to help users understand **flood risk, weather conditions, historical disaster patterns, and safer travel routes** through a single web application.

---

## 🚨 What is DisasterGuard AI?

Natural disasters such as floods, heavy rainfall, and extreme weather can create serious risks for people, vehicles, and infrastructure.

**DisasterGuard AI** combines:

- 🤖 Machine Learning
- 🌦️ Live Weather Data
- 🌊 Flood Risk Prediction
- 📊 Historical Disaster Analysis
- 🗺️ Interactive Maps
- 🚗 Safe Route Analysis
- 📍 Location & Geocoding Services

to provide users with useful disaster-risk information in an easy-to-understand dashboard.

> ⚠️ **Safety Notice:** DisasterGuard AI is an educational and decision-support system. It should not replace official government warnings, emergency services, or professional disaster-management advice.

---

# ✨ Key Features

| Feature | Description |
|---|---|
| 🌊 Flood Prediction | Predicts flood risk using a trained Random Forest model |
| 🌦️ Live Weather | Retrieves current weather information |
| 📊 Historical Risk | Shows historical disaster/weather information |
| 🗺️ Interactive Map | Displays locations and routes using Leaflet |
| 🚗 Safe Route Analysis | Helps compare routes using available risk information |
| 🔀 Route Comparison | Compares alternative routes |
| 📍 Location Search | Converts locations into geographic coordinates |
| 📈 Risk Monitoring | Presents important disaster-related information in one dashboard |
| 💻 Web Dashboard | Easy-to-use browser-based interface |

---

# 🧠 Machine Learning

The main Machine Learning component of DisasterGuard AI is **Flood Risk Prediction**.

The project uses a **Random Forest Classifier**.

### Input Features

The model uses weather-related features such as:

- 🌡️ Temperature
- 🌧️ Rainfall
- 💨 Maximum Wind Speed

### Target

```text
Flood

The trained model is stored in:

models/flood_model.pkl
ML Pipeline
Weather / Disaster Dataset
          ↓
Data Cleaning
          ↓
Feature Selection
          ↓
Dataset Preparation
          ↓
Random Forest Training
          ↓
Model Evaluation
          ↓
flood_model.pkl
          ↓
Flood Risk Prediction
🤖 Flood Prediction API

The application provides a prediction endpoint:

/predict-flood

Example request:

/predict-flood?temperature=30&rainfall=120&wind=25

The model processes the input values and returns the predicted flood condition.

📊 Dataset

DisasterGuard AI uses multiple datasets for different parts of the application.

Important dataset files include:

data/
├── disaster_ml_dataset.csv
├── ml_dataset.csv
├── flood_data.csv
├── flood_cleaned.csv
├── historical_weather_dataset.csv
├── historical_weather_test.csv
├── historical_disasters.json
├── district_coordinates.csv
└── district_list_cleaned.csv

These datasets are used for:

Machine Learning
Historical risk analysis
Weather analysis
District/location information
Flood prediction
📈 Historical Risk Analysis

DisasterGuard AI can provide historical risk information for a selected city.

Example:

/historical-risk?city=Lucknow

Historical information can help users understand whether a location has experienced disaster-related risk in the past.

🌦️ Live Weather Intelligence

The application uses weather data to provide current environmental information.

Weather information can include:

Temperature
Rainfall
Wind speed
Weather conditions

The project uses Open-Meteo for weather information.

🗺️ Interactive Disaster Map

The application uses:

Leaflet
OpenStreetMap

to create an interactive map.

The map can be used for:

Location visualization
Route visualization
Disaster-risk monitoring
Geographic analysis
🚗 Safe Route Analysis

DisasterGuard AI includes a route-analysis component designed to help users understand possible travel risks.

The system can consider:

Starting Location
       ↓
Destination
       ↓
Route Calculation
       ↓
Alternative Routes
       ↓
Risk Information
       ↓
Route Comparison
       ↓
Recommended Safer Option

The route analysis is intended as decision support and should always be verified against official road closures and emergency instructions.

🔀 Alternative Route Comparison

The project can work with routing and geocoding services such as:

OpenStreetMap
Nominatim
OSRM
Google Maps

These services can help with:

Location → Coordinates
Coordinates → Route
Route → Alternative Route
Alternative Routes → Comparison
🏗️ System Architecture
                    ┌──────────────────────┐
                    │       USER           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   WEB DASHBOARD      │
                    │   HTML/CSS/JS        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FLASK APP       │
                    │       app.py         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │ Flood ML     │  │ Weather API  │  │ Route APIs   │
     │ Random Forest│  │ Open-Meteo   │  │ OSM / OSRM   │
     └──────┬───────┘  └──────────────┘  └──────────────┘
            │
            ▼
     ┌────────────────┐
     │ flood_model.pkl│
     └────────────────┘
            │
            ▼
     ┌──────────────────────┐
     │ Risk Prediction &    │
     │ Route Information    │
     └──────────┬───────────┘
                │
                ▼
     ┌──────────────────────┐
     │ Results on Dashboard  │
     └──────────────────────┘
📱 Dashboard

The DisasterGuard AI dashboard provides a centralized interface for disaster monitoring.

The dashboard can contain sections such as:

🌊 Flood Risk

Displays the predicted flood condition based on weather-related inputs.

🌦️ Weather

Shows current weather information.

📊 Historical Risk

Provides historical information related to disaster conditions.

🗺️ Map

Displays geographic information and routes.

🚗 Safe Route

Provides route analysis and alternative route information.

🛠️ Technology Stack
Frontend
HTML5
CSS3
JavaScript
Leaflet.js
Backend
Python
Flask
Machine Learning
Scikit-learn
Random Forest
Pandas
NumPy
Maps & Routing
OpenStreetMap
Leaflet
Nominatim
OSRM
Google Maps
Weather
Open-Meteo
Development Tools
Visual Studio Code
Git
GitHub
Python Virtual Environment
📁 Project Structure
DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
│
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
│
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── requirements.txt
├── README.md
│
├── data/
│   ├── disaster_ml_dataset.csv
│   ├── district_coordinates.csv
│   ├── district_coordinates_not_found.csv
│   ├── district_coordinates_test.csv
│   ├── district_list_cleaned.csv
│   ├── flood_cleaned.csv
│   ├── flood_data.csv
│   ├── historical_disasters.json
│   ├── historical_weather_dataset.csv
│   ├── historical_weather_test.csv
│   └── ml_dataset.csv
│
├── models/
│   └── flood_model.pkl
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── dashboard.js
│
└── templates/
    └── index.html
⚙️ Installation
1. Clone the Repository
git clone https://github.com/Krisha933/DISASTERGUARD_AI.git

Go inside the project:

cd DISASTERGUARD_AI
2. Create Virtual Environment

Windows:

python -m venv venv

Activate it:

venv\Scripts\activate

You should see:

(venv)

at the beginning of your terminal.

3. Install Dependencies
pip install -r requirements.txt
4. Run the Application
python app.py

The Flask server will start locally.

Open the address shown in the terminal in your browser.

Usually:

http://127.0.0.1:5000
🧠 Train the Machine Learning Model

If you want to train the flood prediction model again:

python train_model.py

The trained model is saved as:

models/flood_model.pkl
🔌 API Endpoints
Endpoint	Purpose
/	Main dashboard
/predict-flood	Flood prediction
/historical-risk	Historical disaster risk
/safe-route	Safe route analysis
/compare-routes	Compare routes
/geocode	Location/geocoding
🌍 External Services

DisasterGuard AI can interact with external services for additional information.

Open-Meteo

Used for weather information.

OpenStreetMap

Used for map data.

Leaflet

Used for interactive maps.

Nominatim

Used for geocoding locations.

OSRM

Used for route calculation.

Google Maps

Can be used for additional route navigation/reference.

🌎 Real-World Applications

DisasterGuard AI can be useful in areas such as:

🚨 Disaster Management

Helps users understand possible disaster risks.

🚗 Transportation

Provides route information during potentially risky conditions.

🏙️ Smart Cities

Can support location-based risk monitoring.

🌾 Agriculture

Weather and rainfall information can help understand environmental conditions.

🏫 Educational Projects

Demonstrates the practical use of:

Artificial Intelligence
Machine Learning
Web Development
APIs
Maps
Data Analysis
⭐ Why DisasterGuard AI?

Traditional weather applications mainly show weather conditions.

DisasterGuard AI attempts to combine several useful capabilities:

Weather
   +
Machine Learning
   +
Historical Data
   +
Maps
   +
Route Analysis
   =
DisasterGuard AI

This makes the project more than a simple weather application.

🔮 Future Improvements

Possible future improvements include:

🌊 Real-time flood sensor integration
🛰️ Satellite-based disaster detection
🧠 Deep Learning models
🌧️ Rainfall forecasting
📱 Android/mobile application
🔔 Emergency notifications
📍 Real-time GPS tracking
🏠 Shelter/relief-center detection
🗺️ Live disaster heatmaps
📡 Government disaster-alert integration
🤖 AI-based disaster assistant chatbot
📊 Advanced analytics dashboard
⚠️ Limitations

The current system has some limitations:

Predictions depend on available datasets.
Weather data may change over time.
External APIs may occasionally be unavailable.
Route information may not reflect real-time road closures.
ML predictions are not guaranteed to be correct.
The system should not be used as the only source during an actual emergency.

Always follow official emergency-management instructions.

🛡️ Responsible Use

DisasterGuard AI is designed as a decision-support and educational system.

For real emergencies, users should always verify information through official sources such as:

Government disaster-management authorities
Local administration
Emergency services
Weather authorities
Police and rescue services
👩‍💻 Developer

Krisha933

GitHub:

https://github.com/Krisha933

Project Repository:

https://github.com/Krisha933/DISASTERGUARD_AI

📜 License

This project is intended for educational, research, and hackathon purposes.

You may adapt and improve the project according to your requirements.

⭐ Support the Project

If you find DisasterGuard AI useful:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements
🤝 Contribute to the project

🌪️ DisasterGuard AI
Predict • Monitor • Analyse • Navigate • Stay Safe

Building technology for smarter disaster-risk awareness.


### Step 2 — Save karo

VS Code me:

**Ctrl + S**

Phir README ka preview dekhne ke liye:

**Ctrl + Shift + V**

Agar preview me headings, tables aur sections properly dikh rahe hain, to README ready hai. ✅

### Step 3 — GitHub par push karo

VS Code ka terminal kholo aur **sirf ye commands** ek-ek karke run karo:

```powershell
git status

Phir:

git add README.md

Phir:

git commit -m "Add professional README"

Aur finally:

git push
Step 4 — GitHub check

Browser me apna repository refresh karo:

github.com/Krisha933/DISASTERGUARD_AI

Ab README automatically repository ke main page par show hona chahiye. 🎉

Important: README me abhi fake screenshot/image links nahi daale hain. Pehle actual DisasterGuard AI website ke 2–3 screenshots lenge, phir unhe screenshots/ folder me add karke README ko aur hackathon/professional level bana denge.

div align="center">

# 🌪️ DisasterGuard AI

### 🚨 AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

**Predict • Monitor • Analyse • Navigate • Stay Safe**
\<p> \<img src="[https://img.shields.io/badge/AI%20%26%20ML-Random%20Forest-8B5CF6?style=for-the-badge](https://img.shields.io/badge/AI%20%26%20ML-Random%20Forest-8B5CF6?style=for-the-badge)" alt="AI and ML"> \<img src="[https://img.shields.io/badge/Weather-Live%20Intelligence-06B6D4?style=for-the-badge](https://img.shields.io/badge/Weather-Live%20Intelligence-06B6D4?style=for-the-badge)" alt="Weather"> \<img src="[https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-22C55E?style=for-the-badge](https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-22C55E?style=for-the-badge)" alt="Maps"> \<img src="[https://img.shields.io/badge/Routing-OSRM-F97316?style=for-the-badge](https://img.shields.io/badge/Routing-OSRM-F97316?style=for-the-badge)" alt="Routing"> \</p>
\<p> \<img src="[https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square\&logo=python\&logoColor=white)" alt="Python"> \<img src="[https://img.shields.io/badge/Flask-Web%20App-000000?style=flat-square&logo=flask&logoColor=white](https://img.shields.io/badge/Flask-Web%20App-000000?style=flat-square\&logo=flask\&logoColor=white)" alt="Flask"> \<img src="[https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?style=flat-square&logo=scikit-learn&logoColor=white](https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?style=flat-square\&logo=scikit-learn\&logoColor=white)" alt="Scikit-learn"> \<img src="[https://img.shields.io/badge/OpenStreetMap-Mapping-7EBC6F?style=flat-square&logo=openstreetmap](https://img.shields.io/badge/OpenStreetMap-Mapping-7EBC6F?style=flat-square\&logo=openstreetmap)" alt="OpenStreetMap"> \</p>
\<p> 🌦️ Weather Intelligence  •  🌊 Flood Prediction  •  ⚡ Lightning Risk  •  🌪️ Storm Risk  •  🗺️ Multi-Hazard Map  •  🚗 Safe Route Analysis \</p>
\<p> \<a href="[https://github.com/Krisha933/DISASTERGUARD_AI](https://github.com/Krisha933/DISASTERGUARD_AI)"> \<img src="[https://img.shields.io/badge/GitHub-DISASTERGUARD__AI-181717?style=for-the-badge&logo=github](https://img.shields.io/badge/GitHub-DISASTERGUARD__AI-181717?style=for-the-badge\&logo=github)" alt="GitHub Repository"> \</a> \</p>
\</div>

---

## 🚨 What is DisasterGuard AI?

**DisasterGuard AI** is a full-stack web-based disaster monitoring and decision-support prototype that combines **machine learning, live weather intelligence, historical disaster data, interactive maps, hazard analysis, and route comparison** in a single dashboard.
Instead of presenting weather information alone, the system converts multiple environmental signals into an easy-to-understand **multi-hazard risk view** and provides safety-oriented travel guidance.

### 🎯 Core idea

```
🌦️ Weather Data
↓
🤖 Risk & ML Analysis
↓
🌊 Flood • ⚡ Lightning • 🌪️ Storm
↓
📊 Overall Risk Assessment
↓
🗺️ Risk Visualization
↓
🚗 Route Comparison
↓
🛡️ Safety Guidance
```

> ⚠️ **Safety notice:** DisasterGuard AI is an educational/research prototype. It is **not an official emergency-warning system** and must not be used as the sole source for life-safety decisions. During a real emergency, follow official authorities and emergency services.

---

## ✨ Key Features

| Feature | Description |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 🌦️ **Weather Intelligence** | Uses live weather information to support current environmental risk assessment. |
| 🌊 **AI Flood Prediction** | Uses a trained Random Forest classifier to estimate flood risk from temperature, rainfall and maximum wind. |
| ⚡ **Lightning Risk** | Displays lightning-related risk indicators in the dashboard. |
| 🌪️ **Storm Risk** | Tracks storm/severe-weather related conditions. |
| 📊 **Overall Risk Score** | Combines available hazard indicators into an easy-to-read safety status. |
| 🗺️ **Multi-Hazard Risk Map** | Visualizes locations and risk information using an interactive map. |
| 📚 **Historical Risk Analysis** | Uses stored disaster records to add historical context for a selected city. |
| 🚗 **AI Safe Route Analysis** | Analyses current risk values and provides travel-oriented recommendations. |
| 🛣️ **Alternative Route Comparison** | Finds driving routes and compares them using the available hazard-risk information. |
| 📍 **Location Search** | Supports location-based monitoring and route workflows. |
| 🚨 **Emergency Action Center** | Provides safety-oriented guidance and navigation options. |
| 🏥 **Nearby Help Workflows** | Supports workflows for finding emergency assistance such as hospitals, shelters and police services. |
| 📱 **Interactive Dashboard** | Presents risk cards, alerts, maps, recommendations and route information in one interface. |

---

## 🧠 How the AI/ML Component Works

### 🌊 Random Forest Flood-Risk Prediction

The project includes a **Random Forest Classifier** for flood-risk prediction.
The current model uses three input features:

```
Temperature
Rainfall
Max_Wind
```

Target:

```
Flood
```

The application exposes the prediction through the Flask endpoint:

```
GET /predict-flood
```

Example:

```
/predict-flood?temperature=30&rainfall=120&wind=25
```

A response can contain information such as:

```
{
"prediction": 0,
"result": "NORMAL",
"probability": 12.5
}
```

or:

```
{
"prediction": 1,
"result": "FLOOD RISK",
"probability": 78.4
}
```

### 🔬 Model training pipeline

```
📄 data/ml_dataset.csv
↓
🔍 Select ML Features
↓
✂️ Train/Test Split
↓
🌲 RandomForestClassifier
↓
📊 Model Evaluation
↓
💾 models/flood_model.pkl
```

To retrain the model:

```
python train_model.py
```

The training workflow uses the project's ML dataset and stores the trained model in:

```
models/flood_model.pkl
```

> **Important:** A model probability is an estimate, not a guarantee that a flood will occur.

---

## 📊 Dataset & Historical Intelligence

The repository contains prepared datasets and historical records used by the application and ML workflow.

### Main ML dataset

```
data/ml_dataset.csv
```

The supplied project contains a prepared flood-prediction dataset with environmental and geographic fields such as:

```
Date
District
State
Latitude
Longitude
Temperature
Rainfall
Max_Wind
Flood
```

### Historical weather data

```
data/historical_weather_dataset.csv
data/historical_weather_test.csv
```

These files support historical weather-data preparation and testing workflows.

### Flood/disaster data

```
data/flood_data.csv
data/flood_cleaned.csv
data/disaster_ml_dataset.csv
```

### Historical disaster records

```
data/historical_disasters.json
```

These records are used to provide additional historical context for the selected location.

---

## 📚 Historical Risk Analysis

DisasterGuard AI includes a historical-risk workflow through:

```
GET /historical-risk
```

Example:

```
/historical-risk?city=Lucknow
```

The historical analysis uses stored disaster information to provide contextual risk levels such as:

```
LOW
MEDIUM
HIGH
CRITICAL
```

This historical score is intended to **complement current environmental indicators**, not replace live official warnings.

---

## 🌦️ Live Weather Intelligence

The dashboard uses **Open-Meteo** weather/forecast information as part of its environmental monitoring workflow.
The system uses weather-related signals such as:

- 🌧️ Rainfall
- 🌡️ Temperature
- 💨 Wind
- ⚡ Lightning-related conditions
- 🌪️ Storm/severe-weather conditions

These signals are processed by the frontend/backend risk logic to produce an understandable current safety view.

---

## 🗺️ Interactive Multi-Hazard Risk Map

The dashboard uses:

- **Leaflet.js** for interactive mapping
- **OpenStreetMap** for map data/tiles

The map can support:

- 📍 Monitoring location
- 🌊 Flood-risk information
- ⚡ Lightning-risk information
- 🌪️ Storm/hazard information
- 🛣️ Route alternatives
- 🟢 Recommended route
- ⚪ Alternative routes

The goal is to make complex environmental information easier to understand visually.

---

## 🚗 AI Safe Route Analysis

A major feature of DisasterGuard AI is its **Safe Route Analysis**.
The user enters a destination, and the application uses the current location and current risk values to request route analysis.
The route workflow considers:

```
Overall Risk
Flood Risk
Lightning Risk
Storm Risk
Weather Risk
```

The system can communicate statuses such as:

```
🟢 LOW RISK
🟡 CAUTION
🟠 HIGH RISK
🔴 CRITICAL
```

Example safety guidance:

> High flood risk detected. Avoid unnecessary travel and avoid waterlogged, low-lying or drainage-prone roads.

---

## 🛣️ Alternative Route Comparison

The route-comparison workflow follows this pipeline:

```
📍 Current Location
↓
📍 Destination
↓
🔎 Destination Geocoding
↓
🛣️ Driving Route Generation
↓
📏 Route Distance / Duration
↓
🌦️ Hazard Exposure Analysis
↓
📊 Route Risk Comparison
↓
🤖 Safer Available Route Recommendation
```

The project uses:

| Service | Purpose |
| ----------------------------- | ----------------------------------- |
| **Nominatim / OpenStreetMap** | Destination geocoding |
| **OSRM** | Driving-route generation |
| **Google Maps** | Navigation/search links |
| **Project risk values** | Environmental route-risk estimation |

The route system is an **estimated risk-analysis prototype**, not a certified navigation or emergency-routing system.

---

## 🔄 System Architecture

```
🌦️ Weather Data
│
▼
┌─────────────────────┐
│ Environmental Risk │
│ Processing │
└──────────┬──────────┘
│
┌────────────────┼────────────────┐
▼ ▼ ▼
🌊 Flood ⚡ Lightning 🌪️ Storm
│ │ │
└────────────────┼────────────────┘
▼
📊 Overall Risk
│
┌─────────────┴─────────────┐
▼ ▼
🤖 ML Flood Model 📚 Historical Data
│ │
└─────────────┬─────────────┘
▼
🛡️ DisasterGuard AI
│
┌────────────────┼────────────────┐
▼ ▼ ▼
🗺️ Risk Map 🚗 Safe Route 🚨 Safety
```

---

## 🖥️ Dashboard

The interface is designed as a lightweight disaster-monitoring center.

### Main dashboard areas

- 🛡️ Current Safety Status
- 🌦️ Weather Risk
- 🌊 Flood Risk
- ⚡ Lightning Risk
- 🌪️ Storm Risk
- 📊 Overall Risk Score
- 🗺️ Multi-Hazard Risk Map
- 📚 Historical vs Current Risk
- 🤖 ML Flood Prediction
- 🚗 Safe Route Analysis
- 🛣️ Alternative Route Comparison
- 🚨 Current Risk Alerts
- 🧭 Safety Recommendations
- 🆘 Emergency Action Center

---

## 🧩 Technology Stack

### Backend

- 🐍 Python
- 🌐 Flask
- 📦 Joblib

### Machine Learning & Data

- 🤖 Scikit-learn
- 🌲 Random Forest
- 🐼 Pandas
- 🔢 NumPy
- 📊 CSV/JSON datasets

### Frontend

- HTML5
- CSS3
- JavaScript
- Leaflet.js

### Maps & Routing

- 🗺️ OpenStreetMap
- 📍 Nominatim
- 🛣️ OSRM
- 🧭 Google Maps links

### Weather

- 🌦️ Open-Meteo

---

## 📁 Project Structure

```
DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── data/
│ ├── ml_dataset.csv
│ ├── historical_weather_dataset.csv
│ ├── historical_weather_test.csv
│ ├── flood_data.csv
│ ├── flood_cleaned.csv
│ ├── disaster_ml_dataset.csv
│ ├── historical_disasters.json
│ ├── district_coordinates.csv
│ ├── district_coordinates_not_found.csv
│ ├── district_coordinates_test.csv
│ └── district_list_cleaned.csv
│
├── models/
│ └── flood_model.pkl
│
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── dashboard.js
│
├── templates/
│ └── index.html
│
├── requirements.txt
│
└── README.md
```

> **Do not commit `venv/`, `.env`, API keys, passwords or other secrets.** A virtual environment should be recreated locally rather than stored in GitHub.

---

# 🚀 Installation & Setup

## 1. Clone the repository

```
git clone https://github.com/Krisha933/DISASTERGUARD_AI.git
cd DISASTERGUARD_AI
```

## 2. Create a virtual environment

### Windows

```
python -m venv venv
```

Activate it:

```
venv\Scripts\activate
```

### macOS / Linux

```
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

Install the project's required Python packages:

```
pip install -r requirements.txt
```

If your local `requirements.txt` is incomplete for the ML/data-processing scripts, install the core dependencies manually:

```
pip install flask pandas numpy scikit-learn joblib
```

> After confirming the application works, it is recommended to keep `requirements.txt` synchronized with the working environment.

## 4. Run the application

From the project root:

```
python app.py
```

Then open the local URL displayed by Flask, commonly:

```
http://127.0.0.1:5000
```

or:

```
http://localhost:5000
```

---

## 🤖 Retrain the Flood Model

To retrain the Random Forest model:

```
python train_model.py
```

The model is saved as:

```
models/flood_model.pkl
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
| ------ | ------------------ | ------------------------------------------------------- |
| `GET` | `/` | Loads the DisasterGuard AI dashboard |
| `GET` | `/predict-flood` | Predicts flood risk from temperature, rainfall and wind |
| `GET` | `/historical-risk` | Calculates historical disaster risk for a city |
| `GET` | `/safe-route` | Provides destination/travel risk analysis |
| `GET` | `/compare-routes` | Finds and compares available driving routes |
| `GET` | `/geocode` | Supports location/destination geocoding workflows |

### Flood prediction example

```
http://127.0.0.1:5000/predict-flood?temperature=30&rainfall=120&wind=25
```

### Historical risk example

```
http://127.0.0.1:5000/historical-risk?city=Lucknow
```

---

## 🌐 External Services

| Service | Used For |
| --------------------- | ----------------------- |
| 🌦️ **Open-Meteo** | Weather/forecast data |
| 🗺️ **OpenStreetMap** | Map data/tiles |
| 📍 **Nominatim** | Geocoding |
| 🛣️ **OSRM** | Driving routes |
| 🧭 **Google Maps** | Navigation/search links |

> External services are third-party services. Availability, rate limits, policies and data quality may change independently of this project.

---

## 🎯 Real-World Applications

DisasterGuard AI demonstrates how AI and web technologies could support:

### 🏙️ Smart Cities

Location-based environmental monitoring and risk visualization.

### 🚗 Safer Travel

Helping users understand whether current environmental conditions may make travel risky.

### 🏫 Education

Demonstrating practical integration of machine learning, APIs, maps and data processing.

### 🚨 Disaster Awareness

Bringing multiple hazard indicators together in one interface.

### 🏢 Emergency Planning

Providing a prototype workflow for multi-hazard monitoring and decision support.

### 🗺️ Location-Based Risk Analysis

Combining geographic, weather and historical information for a selected area.

---

## 🏆 Why DisasterGuard AI?

DisasterGuard AI goes beyond a basic weather application by combining:

```
🤖 MACHINE LEARNING
+
🌦️ WEATHER DATA
+
📚 HISTORICAL DATA
+
📊 RISK ANALYSIS
+
🗺️ RISK MAP
+
🚗 ROUTE COMPARISON
+
🚨 SAFETY GUIDANCE
```

This makes it suitable as a:

- 🏆 Hackathon prototype
- 🎓 College project
- 🤖 AI/ML demonstration
- 🌍 Disaster-management concept
- 💻 Full-stack application showcase

---

## ⚠️ Limitations

This project is a prototype and has important limitations:

- The flood model uses a limited number of input features.
- Historical records are not equivalent to a complete national/international disaster database.
- ML predictions can produce false positives and false negatives.
- A prediction probability is not proof that a disaster will occur.
- Route risk is an estimation based on available hazard values and route exposure logic.
- Weather, geocoding and routing depend on third-party services and network connectivity.
- The project does not replace official government warnings.
- Production deployment would require stronger validation, monitoring, logging, authentication and reliable real-time hazard feeds.
- Real emergency systems would require rigorous testing, redundancy, security, fail-safe design and authoritative data sources.

---

## 🔮 Future Improvements

Planned/possible upgrades include:

- 🧠 Advanced ML and deep-learning models
- 🌊 Improved flood forecasting
- 🛰️ Satellite and GIS hazard layers
- 📡 Real-time emergency feeds
- 📍 Live GPS tracking
- 🚨 SMS, email and push notifications
- 📱 Android/mobile application
- 🗄️ Database-backed event history
- 👤 User authentication
- 🧭 Advanced route-risk scoring
- 🗺️ Live flood-zone overlays
- 🔥 Wildfire and heatwave prediction
- 🌍 Additional disaster categories
- 📈 Historical trend analytics
- ☁️ Cloud deployment
- 🐳 Docker support
- 🧪 Automated ML evaluation
- 💡 Explainable AI for model predictions

---

## 🔐 Responsible Use & Safety

DisasterGuard AI is intended for:

- Educational use
- Research
- Demonstration
- Hackathons
- Disaster-awareness concepts

**Do not rely on this prototype as the sole source of information during an actual emergency.**
For real-world emergencies:

> **Follow official government alerts, local authorities and emergency services.**

---

## 👩‍💻 Developer

\<div align="center">

### **Krisha933**

AI/ML • Full-Stack Development • Disaster-Safety Innovation
\<p> \<a href="[https://github.com/Krisha933](https://github.com/Krisha933)"> \<img src="[https://img.shields.io/badge/GitHub-Krisha933-181717?style=for-the-badge&logo=github](https://img.shields.io/badge/GitHub-Krisha933-181717?style=for-the-badge\&logo=github)" alt="GitHub"> \</a> \</p>
**Project Repository:**

Krisha933/DISASTERGUARD_AI \</div> --- ## 📜 License This project is currently intended for **educational and research purposes**. If you want others to legally use, modify and distribute the project, add an open-source license such as the **MIT License** to the repository. --- ## ⭐ Support the Project If you find DisasterGuard AI useful or interesting: ⭐ Star the repository 🍴 Fork the project 🐛 Report issues 💡 Suggest improvements 🤝 Contribute ideas --- \<div align="center"> # 🛡️ DisasterGuard AI ### **Predict • Monitor • Analyse • Navigate • Stay Safe** 🌦️ Weather Intelligence 🤖 AI Flood Prediction 🗺️ Multi-Hazard Mapping 🚗 Safe Route Analysis 🚨 Safety Guidance **Made with ❤️ for AI, ML & Disaster-Safety Innovation** \</div> ye readme sahi h na essha bana kr do sundar sa

Haan 👍 content achha hai, lekin jo tumne paste kiya hai usme Markdown/HTML bahut zyada escaped aur malformed ho gaya hai—jaise \<div>, [[https..., \#, etc. Is form me GitHub README sundar nahi dikhega.

Main tumhare same project/features ko preserve karke, clean, professional aur GitHub-friendly version bana raha hoon. Isme unnecessary fake claims bhi avoid kiye hain.

✅ Kya karna hai

VS Code me README.md kholo → Ctrl + A → neeche wala poora code paste karo → Ctrl + S.

<div align="center">

# 🌪️ DisasterGuard AI

### 🚨 AI-Powered Multi-Hazard Disaster Risk Monitoring & Safe Route Assistant

**Predict • Monitor • Analyse • Navigate • Stay Safe**

<p>
  <img src="https://img.shields.io/badge/AI%20%26%20ML-Random%20Forest-8B5CF6?style=for-the-badge" alt="AI and ML">
  <img src="https://img.shields.io/badge/Weather-Live%20Intelligence-06B6D4?style=for-the-badge" alt="Weather">
  <img src="https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-22C55E?style=for-the-badge" alt="Maps">
  <img src="https://img.shields.io/badge/Routing-OSRM-F97316?style=for-the-badge" alt="Routing">
</p>

<p>
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-Web%20App-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Scikit--learn-Machine%20Learning-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" alt="Scikit-learn">
  <img src="https://img.shields.io/badge/OpenStreetMap-Mapping-7EBC6F?style=flat-square&logo=openstreetmap" alt="OpenStreetMap">
</p>

<p>
  🌦️ Weather Intelligence &nbsp;•&nbsp;
  🌊 Flood Prediction &nbsp;•&nbsp;
  ⚡ Lightning Risk &nbsp;•&nbsp;
  🌪️ Storm Risk &nbsp;•&nbsp;
  🗺️ Multi-Hazard Map &nbsp;•&nbsp;
  🚗 Safe Route Analysis
</p>

<p>
  <a href="https://github.com/Krisha933/DISASTERGUARD_AI">
    <img src="https://img.shields.io/badge/GitHub-DISASTERGUARD__AI-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

</div>

---

## 🚨 What is DisasterGuard AI?

**DisasterGuard AI** is a full-stack web-based disaster monitoring and decision-support prototype that combines:

- 🤖 Machine Learning
- 🌦️ Live Weather Intelligence
- 📊 Historical Disaster Data
- 🗺️ Interactive Maps
- 🌊 Flood Risk Prediction
- ⚡ Lightning Risk Indicators
- 🌪️ Storm Risk Indicators
- 🚗 Route Comparison
- 🛡️ Safety Guidance

Instead of showing weather information alone, the system brings multiple environmental signals together into an easy-to-understand **multi-hazard risk dashboard**.

> ⚠️ **Safety Notice:** DisasterGuard AI is an educational/research prototype. It is **not an official emergency-warning system** and must not be used as the sole source for life-safety decisions. During a real emergency, always follow official authorities and emergency services.

---

# 🎯 Core Idea

```text
🌦️ Weather Data
       ↓
🤖 Risk & ML Analysis
       ↓
🌊 Flood • ⚡ Lightning • 🌪️ Storm
       ↓
📊 Overall Risk Assessment
       ↓
🗺️ Risk Visualization
       ↓
🚗 Route Comparison
       ↓
🛡️ Safety Guidance
✨ Key Features
Feature	Description
🌦️ Weather Intelligence	Uses weather information to support current environmental risk assessment.
🌊 AI Flood Prediction	Uses a trained Random Forest classifier to estimate flood risk.
⚡ Lightning Risk	Displays lightning-related risk indicators.
🌪️ Storm Risk	Tracks storm and severe-weather related conditions.
📊 Overall Risk Score	Combines available hazard indicators into an easy-to-read safety status.
🗺️ Multi-Hazard Risk Map	Visualizes locations and risk information using an interactive map.
📚 Historical Risk Analysis	Uses stored disaster records to provide historical context.
🚗 Safe Route Analysis	Analyses available risk values for travel-oriented recommendations.
🛣️ Alternative Route Comparison	Finds and compares available driving routes.
📍 Location Search	Supports location-based monitoring and route workflows.
🚨 Emergency Action Center	Provides safety-oriented guidance and navigation options.
🏥 Nearby Help Workflows	Supports workflows for finding emergency assistance.
📱 Interactive Dashboard	Presents alerts, maps, risk cards and recommendations in one interface.
🧠 AI / Machine Learning
🌊 Random Forest Flood-Risk Prediction

The project includes a Random Forest Classifier for flood-risk prediction.

The current model uses three main input features:

Temperature
Rainfall
Max_Wind
Target
Flood

The trained model is stored at:

models/flood_model.pkl
ML Training Pipeline
📄 Dataset
    ↓
🔍 Feature Selection
    ↓
✂️ Train / Test Split
    ↓
🌲 Random Forest Classifier
    ↓
📊 Model Evaluation
    ↓
💾 flood_model.pkl
    ↓
🌊 Flood Risk Prediction

To retrain the model:

python train_model.py

Important: A model probability is an estimate, not a guarantee that a flood will occur.

🔌 Flood Prediction API

The Flask application provides a flood prediction endpoint:

GET /predict-flood
Example
/predict-flood?temperature=30&rainfall=120&wind=25

A response may contain information such as:

{
  "prediction": 0,
  "result": "NORMAL",
  "probability": 12.5
}

or:

{
  "prediction": 1,
  "result": "FLOOD RISK",
  "probability": 78.4
}
📊 Dataset & Historical Intelligence

The repository contains prepared datasets and historical records used by the application and ML workflow.

Main ML Dataset
data/ml_dataset.csv

Important fields include:

Date
District
State
Latitude
Longitude
Temperature
Rainfall
Max_Wind
Flood
Historical Weather
data/historical_weather_dataset.csv
data/historical_weather_test.csv
Flood / Disaster Data
data/flood_data.csv
data/flood_cleaned.csv
data/disaster_ml_dataset.csv
Historical Disaster Records
data/historical_disasters.json
📚 Historical Risk Analysis

DisasterGuard AI includes a historical-risk workflow:

GET /historical-risk

Example:

/historical-risk?city=Lucknow

Historical information provides additional context for the selected location.

Possible risk levels include:

🟢 LOW
🟡 MEDIUM
🟠 HIGH
🔴 CRITICAL

Historical information is intended to complement current environmental indicators, not replace official warnings.

🌦️ Live Weather Intelligence

The project uses Open-Meteo as part of its weather-data workflow.

Weather-related signals can include:

🌧️ Rainfall
🌡️ Temperature
💨 Wind
⚡ Lightning-related conditions
🌪️ Storm/severe-weather conditions

These signals are used by the application to create an understandable current risk view.

🗺️ Interactive Multi-Hazard Risk Map

The dashboard uses:

Leaflet.js for interactive maps
OpenStreetMap for map data

The map can support:

📍 Monitoring Location
🌊 Flood Risk
⚡ Lightning Risk
🌪️ Storm Risk
🛣️ Route Alternatives
🟢 Recommended Route
⚪ Alternative Routes

The goal is to make complex environmental information easier to understand visually.

🚗 Safe Route Analysis

DisasterGuard AI includes a Safe Route Analysis workflow.

The system can consider available risk indicators such as:

Overall Risk
Flood Risk
Lightning Risk
Storm Risk
Weather Risk

Possible statuses:

🟢 LOW RISK
🟡 CAUTION
🟠 HIGH RISK
🔴 CRITICAL

Example safety guidance:

High flood risk detected. Avoid unnecessary travel and avoid waterlogged, low-lying or drainage-prone roads.

🛣️ Alternative Route Comparison

The route workflow follows:

📍 Current Location
       ↓
📍 Destination
       ↓
🔎 Destination Geocoding
       ↓
🛣️ Driving Route Generation
       ↓
📏 Distance / Duration
       ↓
🌦️ Hazard Exposure Analysis
       ↓
📊 Route Risk Comparison
       ↓
🛡️ Safer Available Route
Services
Service	Purpose
Nominatim / OpenStreetMap	Destination geocoding
OSRM	Driving-route generation
Google Maps	Navigation/search links
Project Risk Values	Environmental risk estimation

The route system is an estimated risk-analysis prototype, not a certified navigation or emergency-routing system.

🏗️ System Architecture
                         🌦️ Weather Data
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Environmental Risk  │
                    │     Processing      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          🌊 Flood         ⚡ Lightning      🌪️ Storm
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                       📊 Overall Risk
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
          🤖 ML Flood Model          📚 Historical Data
                 │                           │
                 └─────────────┬─────────────┘
                               ▼
                      🛡️ DisasterGuard AI
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          🗺️ Risk Map      🚗 Safe Route     🚨 Safety
🖥️ Dashboard

The interface works as a lightweight disaster-monitoring center.

Main Dashboard Areas
🛡️ Current Safety Status
🌦️ Weather Risk
🌊 Flood Risk
⚡ Lightning Risk
🌪️ Storm Risk
📊 Overall Risk Score
🗺️ Multi-Hazard Risk Map
📚 Historical vs Current Risk
🤖 ML Flood Prediction
🚗 Safe Route Analysis
🛣️ Alternative Route Comparison
🚨 Current Risk Alerts
🧭 Safety Recommendations
🆘 Emergency Action Center
🧩 Technology Stack
Backend
🐍 Python
🌐 Flask
📦 Joblib
Machine Learning & Data
🤖 Scikit-learn
🌲 Random Forest
🐼 Pandas
🔢 NumPy
📊 CSV / JSON
Frontend
HTML5
CSS3
JavaScript
Leaflet.js
Maps & Routing
🗺️ OpenStreetMap
📍 Nominatim
🛣️ OSRM
🧭 Google Maps
Weather
🌦️ Open-Meteo
📁 Project Structure
DISASTERGUARD_AI/
│
├── app.py
├── train_model.py
├── prepare_dataset.py
├── check_dataset.py
├── check_historical_weather_dataset.py
├── clean_district_list.py
├── clean_flood_data.py
├── create_normal_samples.py
├── district_list.py
├── get_district_coordinates.py
├── historical_weather_batch_test.py
├── historical_weather_dataset.py
├── historical_weather_test.py
├── inspect_weather_data.py
│
├── data/
│   ├── ml_dataset.csv
│   ├── historical_weather_dataset.csv
│   ├── historical_weather_test.csv
│   ├── flood_data.csv
│   ├── flood_cleaned.csv
│   ├── disaster_ml_dataset.csv
│   ├── historical_disasters.json
│   ├── district_coordinates.csv
│   ├── district_coordinates_not_found.csv
│   ├── district_coordinates_test.csv
│   └── district_list_cleaned.csv
│
├── models/
│   └── flood_model.pkl
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── dashboard.js
│
├── templates/
│   └── index.html
│
├── requirements.txt
└── README.md

Do not commit venv/, .env, API keys, passwords or other secrets.

🚀 Installation & Setup
1. Clone the Repository
git clone https://github.com/Krisha933/DISASTERGUARD_AI.git
cd DISASTERGUARD_AI
2. Create Virtual Environment
Windows
python -m venv venv

Activate:

venv\Scripts\activate
macOS / Linux
python3 -m venv venv
source venv/bin/activate
3. Install Dependencies
pip install -r requirements.txt

If additional core packages are required:

pip install flask pandas numpy scikit-learn joblib
4. Run the Application
python app.py

Then open:

http://127.0.0.1:5000

or:

http://localhost:5000
🤖 Retrain the Flood Model

To retrain the Random Forest model:

python train_model.py

The model will be stored at:

models/flood_model.pkl
🔌 API Endpoints
Method	Endpoint	Purpose
GET	/	Loads the DisasterGuard AI dashboard
GET	/predict-flood	Predicts flood risk
GET	/historical-risk	Provides historical risk
GET	/safe-route	Provides route-risk analysis
GET	/compare-routes	Compares available routes
GET	/geocode	Location/geocoding workflow
Flood Prediction
http://127.0.0.1:5000/predict-flood?temperature=30&rainfall=120&wind=25
Historical Risk
http://127.0.0.1:5000/historical-risk?city=Lucknow
🌐 External Services
Service	Used For
🌦️ Open-Meteo	Weather / forecast data
🗺️ OpenStreetMap	Map data
📍 Nominatim	Geocoding
🛣️ OSRM	Driving routes
🧭 Google Maps	Navigation/search links

External services may have their own availability, rate limits and usage policies.

🎯 Real-World Applications
🏙️ Smart Cities

Location-based environmental monitoring and risk visualization.

🚗 Safer Travel

Helps users understand whether environmental conditions may make travel risky.

🏫 Education

Demonstrates practical integration of AI, ML, APIs, maps and data processing.

🚨 Disaster Awareness

Combines multiple hazard indicators into one interface.

🏢 Emergency Planning

Provides a prototype workflow for multi-hazard monitoring and decision support.

🗺️ Location-Based Risk Analysis

Combines geographic, weather and historical information for a selected area.

🏆 Why DisasterGuard AI?

Unlike a basic weather application, DisasterGuard AI combines:

🤖 MACHINE LEARNING
        +
🌦️ WEATHER DATA
        +
📚 HISTORICAL DATA
        +
📊 RISK ANALYSIS
        +
🗺️ RISK MAP
        +
🚗 ROUTE COMPARISON
        +
🚨 SAFETY GUIDANCE
        =
🛡️ DISASTERGUARD AI

This makes it suitable as a:

🏆 Hackathon Prototype
🎓 College Project
🤖 AI/ML Demonstration
🌍 Disaster-Management Concept
💻 Full-Stack Application
⚠️ Limitations

This project is a prototype and has important limitations:

The flood model uses a limited number of input features.
Historical records are not a complete disaster database.
ML predictions can produce false positives and false negatives.
A prediction probability is not proof that a disaster will occur.
Route risk is an estimation based on available risk information.
Weather, geocoding and routing depend on third-party services.
The system does not replace official government warnings.
A production system would require stronger validation, monitoring, logging, security and reliable real-time hazard feeds.
🔮 Future Improvements

Possible future upgrades include:

🧠 Advanced ML and Deep Learning models
🌊 Improved flood forecasting
🛰️ Satellite and GIS hazard layers
📡 Real-time emergency feeds
📍 Live GPS tracking
🚨 SMS / Email / Push Notifications
📱 Android / Mobile Application
🗄️ Database-backed event history
👤 User Authentication
🧭 Advanced route-risk scoring
🗺️ Live flood-zone overlays
🔥 Wildfire and heatwave prediction
🌍 Additional disaster categories
📈 Historical trend analytics
☁️ Cloud deployment
🐳 Docker support
🧪 Automated ML evaluation
💡 Explainable AI
🔐 Responsible Use & Safety

DisasterGuard AI is intended for:

Educational use
Research
Demonstration
Hackathons
Disaster-awareness concepts

Do not rely on this prototype as the sole source of information during an actual emergency.

For real emergencies:

🚨 Follow official government alerts, local authorities and emergency services.

👩‍💻 Developer
<div align="center">
Krisha933

AI/ML • Full-Stack Development • Disaster-Safety Innovation

<a href="https://github.com/Krisha933"> <img src="https://img.shields.io/badge/GitHub-Krisha933-181717?style=for-the-badge&logo=github" alt="GitHub"> </a>

<br><br>

Project Repository

<a href="https://github.com/Krisha933/DISASTERGUARD_AI"> https://github.com/Krisha933/DISASTERGUARD_AI </a> </div>
📜 License

This project is currently intended for educational and research purposes.

If you want to officially open-source the project for reuse, modification and distribution, consider adding an appropriate license such as the MIT License.

⭐ Support the Project

If you find DisasterGuard AI useful or interesting:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements
🤝 Contribute ideas

<div align="center">
🛡️ DisasterGuard AI
Predict • Monitor • Analyse • Navigate • Stay Safe

🌦️ Weather Intelligence
🤖 AI Flood Prediction
🗺️ Multi-Hazard Mapping
🚗 Safe Route Analysis
🚨 Safety Guidance


</div> ```