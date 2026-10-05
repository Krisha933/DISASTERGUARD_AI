import pandas as pd

file_path = "data/flood_cleaned.csv"
output_file = "data/district_list_cleaned.csv"

df = pd.read_csv(file_path)

districts = set()

for value in df["Districts"].dropna():
    parts = str(value).split(",")

    for district in parts:
        district = district.strip()

        if not district:
            continue

        lower = district.lower()

        # Invalid/non-district descriptions remove
        if "districts" in lower:
            continue

        if "parts of" in lower:
            continue

        if "district affected" in lower:
            continue

        if lower == "unknown":
            continue

        districts.add(district)

districts = sorted(districts)

result = pd.DataFrame({
    "District": districts
})

result.to_csv(output_file, index=False)

print("\n========== CLEANING COMPLETE ==========")
print("Original Unique Districts: 804")
print("Cleaned Unique Districts:", len(result))
print("\nSaved File:")
print(output_file)

print("\nFirst 30 Districts:")
print(result.head(30).to_string(index=False))