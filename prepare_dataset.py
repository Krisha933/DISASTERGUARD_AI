import json
import csv
import os

INPUT_FILE = "data/historical_disasters.json"
OUTPUT_FILE = "data/disaster_ml_dataset.csv"


def prepare_dataset():

    # Historical JSON data read karo
    with open(INPUT_FILE, "r") as file:
        data = json.load(file)

    rows = []

    for record in data:

        disaster = record["disaster"].lower()

        # Disaster type ko binary value mein convert karna
        flood = 1 if disaster == "flood" else 0
        thunderstorm = 1 if disaster == "thunderstorm" else 0
        lightning = 1 if disaster == "lightning" else 0

        # Severity ko numerical risk score mein convert karna
        if record["severity"] == "High":
            risk_score = 80
            risk_level = "CRITICAL"

        elif record["severity"] == "Medium":
            risk_score = 50
            risk_level = "HIGH"

        else:
            risk_score = 20
            risk_level = "LOW"

        row = {
            "city": record["city"],
            "year": record["year"],
            "rainfall_mm": record["rainfall_mm"],
            "flood": flood,
            "thunderstorm": thunderstorm,
            "lightning": lightning,
            "risk_score": risk_score,
            "risk_level": risk_level
        }

        rows.append(row)

    # CSV mein save karo
    fieldnames = [
        "city",
        "year",
        "rainfall_mm",
        "flood",
        "thunderstorm",
        "lightning",
        "risk_score",
        "risk_level"
    ]

    with open(
        OUTPUT_FILE,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()
        writer.writerows(rows)

    print("================================")
    print("DATASET PREPARATION COMPLETE")
    print("================================")
    print(f"Total records: {len(rows)}")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    prepare_dataset()