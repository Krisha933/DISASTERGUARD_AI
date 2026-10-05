import pandas as pd
import urllib.request
import urllib.parse
import json
import time

flood_file = "data/flood_cleaned.csv"
coordinates_file = "data/district_coordinates.csv"
output_file = "data/historical_weather_dataset.csv"

flood_df = pd.read_csv(flood_file)
coord_df = pd.read_csv(coordinates_file)

# Fast coordinate lookup
coord_lookup = {}

for _, row in coord_df.iterrows():
    district = str(row["District"]).strip().lower()

    coord_lookup[district] = (
        row["Latitude"],
        row["Longitude"]
    )

results = []

total = len(flood_df)

print("\n========== FINAL HISTORICAL WEATHER DATASET ==========")
print("Total Flood Records:", total)

processed = 0
skipped = 0

for index, event in flood_df.iterrows():

    district_value = str(event["Districts"]).strip()

    if district_value.lower() == "unknown":
        skipped += 1
        continue

    # Use first listed district as event location
    district = district_value.split(",")[0].strip()

    key = district.lower()

    if key not in coord_lookup:
        skipped += 1
        continue

    latitude, longitude = coord_lookup[key]

    event_date = str(event["Start Date"])[:10]

    params = urllib.parse.urlencode({
        "latitude": latitude,
        "longitude": longitude,
        "start_date": event_date,
        "end_date": event_date,
        "daily": (
            "temperature_2m_mean,"
            "precipitation_sum,"
            "wind_speed_10m_max"
        ),
        "timezone": "Asia/Kolkata"
    })

    url = (
        "https://archive-api.open-meteo.com/v1/archive?"
        + params
    )

    try:

        with urllib.request.urlopen(
            url,
            timeout=30
        ) as response:

            data = json.loads(
                response.read().decode()
            )

        daily = data.get("daily", {})

        temperature = daily.get(
            "temperature_2m_mean",
            [None]
        )[0]

        rainfall = daily.get(
            "precipitation_sum",
            [None]
        )[0]

        wind = daily.get(
            "wind_speed_10m_max",
            [None]
        )[0]

        results.append({
            "Date": event_date,
            "District": district,
            "State": event["State"],
            "Latitude": latitude,
            "Longitude": longitude,
            "Temperature": temperature,
            "Rainfall": rainfall,
            "Max_Wind": wind,
            "Flood": 1
        })

        processed += 1

        if processed % 10 == 0:
            print(
                f"Processed: {processed} | "
                f"Skipped: {skipped}"
            )

    except Exception as e:

        print(
            f"Weather error: "
            f"{district} | {event_date} | {e}"
        )

    time.sleep(0.2)


result_df = pd.DataFrame(results)

result_df.to_csv(
    output_file,
    index=False
)

print("\n========== COMPLETE ==========")

print("Weather records created:", len(result_df))
print("Records skipped:", skipped)

print("\nSaved File:")
print(output_file)

print("\nColumns:")
for column in result_df.columns:
    print("-", column)