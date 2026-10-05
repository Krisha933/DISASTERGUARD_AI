import pandas as pd
import urllib.parse
import urllib.request
import json
import time

input_file = "data/flood_cleaned.csv"
output_file = "data/district_coordinates.csv"
not_found_file = "data/district_coordinates_not_found.csv"

df = pd.read_csv(input_file)

# Known district name corrections
name_corrections = {
    "Ahmednagar": "Ahilyanagar"
}

# Create district -> state mapping
district_state = {}

for _, row in df.iterrows():

    state_value = str(row["State"]).strip()
    district_value = str(row["Districts"]).strip()

    if district_value == "nan":
        continue

    # Sometimes State contains multiple states.
    # Use the first state as a fallback.
    state_parts = [
        s.strip()
        for s in state_value.split(",")
        if s.strip()
    ]

    default_state = state_parts[0] if state_parts else ""

    for district in district_value.split(","):

        district = district.strip()

        if not district:
            continue

        lower = district.lower()

        # Remove invalid descriptions
        if "districts" in lower:
            continue

        if "parts of" in lower:
            continue

        if "district affected" in lower:
            continue

        if lower == "unknown":
            continue

        # Apply known name correction
        search_name = name_corrections.get(
            district,
            district
        )

        district_state[district] = (
            search_name,
            default_state
        )


districts = sorted(district_state.keys())


results = []
not_found = []

print("\n========== DISTRICT COORDINATE COLLECTION ==========")
print("Total Districts:", len(districts))

for i, district in enumerate(districts, start=1):

    search_name, state = district_state[district]

    query = f"{search_name}, {state}, India"

    params = urllib.parse.urlencode({
        "name": query,
        "count": 5,
        "language": "en",
        "countryCode": "IN",
        "format": "json"
    })

    url = (
        "https://geocoding-api.open-meteo.com/v1/search?"
        + params
    )

    try:

        with urllib.request.urlopen(
            url,
            timeout=15
        ) as response:

            data = json.loads(
                response.read().decode()
            )

        location = None

        if "results" in data:

            # Find an Indian result
            for item in data["results"]:

                if item.get("country_code") == "IN":
                    location = item
                    break

        if location:

            latitude = location.get("latitude")
            longitude = location.get("longitude")

            results.append({
                "District": district,
                "Search_Name": search_name,
                "State": state,
                "Latitude": latitude,
                "Longitude": longitude
            })

            print(
                f"[{i}/{len(districts)}] "
                f"{district} -> "
                f"{latitude}, {longitude}"
            )

        else:

            print(
                f"[{i}/{len(districts)}] "
                f"{district} -> NOT FOUND"
            )

            not_found.append({
                "District": district,
                "State": state,
                "Search_Name": search_name
            })

    except Exception as e:

        print(
            f"[{i}/{len(districts)}] "
            f"{district} -> ERROR"
        )

        not_found.append({
            "District": district,
            "State": state,
            "Search_Name": search_name
        })

    # Small delay to avoid sending requests too quickly
    time.sleep(0.5)


# Save successful coordinates
result_df = pd.DataFrame(results)

result_df.to_csv(
    output_file,
    index=False
)

# Save unsuccessful locations separately
not_found_df = pd.DataFrame(not_found)

not_found_df.to_csv(
    not_found_file,
    index=False
)


print("\n========== COMPLETE ==========")

print(
    "Coordinates Found:",
    len(result_df)
)

print(
    "Not Found:",
    len(not_found_df)
)

print("\nSaved Files:")

print(output_file)
print(not_found_file)