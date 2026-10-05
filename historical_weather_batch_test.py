import pandas as pd
import urllib.request
import urllib.parse
import json
import time

flood_file = "data/flood_cleaned.csv"
coordinates_file = "data/district_coordinates.csv"

flood_df = pd.read_csv(flood_file)
coord_df = pd.read_csv(coordinates_file)

results = []

print("\n========== HISTORICAL WEATHER BATCH TEST ==========")

count = 0

for _, event in flood_df.iterrows():

    if count >= 10:
        break

    district_value = str(event["Districts"]).strip()

    if district_value.lower() == "unknown":
        continue

    district = district_value.split(",")[0].strip()
    event_date = str(event["Start Date"])[:10]

    matches = coord_df[
        coord_df["District"].str.lower() == district.lower()
    ]

    if matches.empty:
        continue

    latitude = matches.iloc[0]["Latitude"]
    longitude = matches.iloc[0]["Longitude"]

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

        count += 1

        print(
            f"[{count}/10] "
            f"{district} | {event_date} | "
            f"Rain: {rainfall} mm | "
            f"Temp: {temperature} °C | "
            f"Wind: {wind} km/h"
        )

    except Exception as e:

        print(
            f"ERROR: {district} | {event_date} | {e}"
        )

    time.sleep(1)


result_df = pd.DataFrame(results)

output_file = "data/historical_weather_test.csv"

result_df.to_csv(
    output_file,
    index=False
)

print("\n========== TEST COMPLETE ==========")

print("Records collected:", len(result_df))

print("\nSaved File:")
print(output_file)

print("\nFinal Data:")
print(result_df.to_string(index=False))