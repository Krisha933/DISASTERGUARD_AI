import pandas as pd

file_path = "data/flood_cleaned.csv"

df = pd.read_csv(file_path)

districts = set()

for value in df["Districts"].dropna():
    parts = str(value).split(",")

    for district in parts:
        district = district.strip()

        if district and district.lower() != "unknown":
            districts.add(district)

districts = sorted(districts)

print("\n========== DISTRICT LIST ==========")
print("Total Unique Districts:", len(districts))

for district in districts:
    print(district)