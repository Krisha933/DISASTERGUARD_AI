import pandas as pd
import urllib.request
import urllib.parse
import json

flood_file = "data/flood_cleaned.csv"
coordinates_file = "data/district_coordinates.csv"

flood_df = pd.read_csv(flood_file)
coord_df = pd.read_csv(coordinates_file)

# First flood record
# Find the first flood event with a usable district
event = None

for _, row in flood_df.iterrows():

    district_value = str(row["Districts"]).strip()

    if district_value.lower() == "unknown":
        continue

    district = district_value.split(",")[0].strip()

    matches = coord_df[
        coord_df["District"].str.lower() == district.lower()
    ]

    if not matches.empty:
        event = row
        break

if event is None:
    print("No matching flood event found.")
    exit()

district = str(event["Districts"]).split(",")[0].strip()
event_date = str(event["Start Date"])[:10]

print("\n========== FLOOD EVENT ==========")
print("District:", district)
print("Date:", event_date)

# Find coordinates
matches = coord_df[
    coord_df["District"].str.lower() == district.lower()
]

if matches.empty:
    print("Coordinates not found for this district.")
    exit()

latitude = matches.iloc[0]["Latitude"]
longitude = matches.iloc[0]["Longitude"]

print("Latitude:", latitude)
print("Longitude:", longitude)

# Historical Weather API
params = urllib.parse.urlencode({
    "latitude": latitude,
    "longitude": longitude,
    "start_date": event_date,
    "end_date": event_date,
    "daily": "temperature_2m_mean,precipitation_sum,wind_speed_10m_max",
    "timezone": "Asia/Kolkata"
})

url = (
    "https://archive-api.open-meteo.com/v1/archive?"
    + params
)

print("\nRequesting historical weather...")

try:

    with urllib.request.urlopen(url, timeout=30) as response:

        data = json.loads(
            response.read().decode()
        )

    print("\n========== HISTORICAL WEATHER ==========")

    daily = data.get("daily", {})

    print("Date:", daily.get("time"))
    print(
        "Mean Temperature:",
        daily.get("temperature_2m_mean")
    )
    print(
        "Rainfall:",
        daily.get("precipitation_sum")
    )
    print(
        "Maximum Wind:",
        daily.get("wind_speed_10m_max")
    )

    print("\nWeather data received successfully!")

except Exception as e:

    print("\nERROR:")
    print(e)