import pandas as pd
import random

input_file = "data/historical_weather_dataset.csv"
output_file = "data/ml_dataset.csv"

print("Loading historical weather dataset...")

df = pd.read_csv(input_file)

# Flood records
flood_data = df[df["Flood"] == 1].copy()

print("Flood Records:", len(flood_data))

# Reproducible random selection
random.seed(42)

# Same number of normal samples as flood samples
normal_data = flood_data.sample(
    n=len(flood_data),
    random_state=42
).copy()

# Modify weather values slightly to represent normal/non-flood conditions
normal_data["Rainfall"] = normal_data["Rainfall"] * 0.20
normal_data["Max_Wind"] = normal_data["Max_Wind"] * 0.80

# Keep values realistic
normal_data["Rainfall"] = normal_data["Rainfall"].round(1)
normal_data["Max_Wind"] = normal_data["Max_Wind"].round(1)

# Change label
normal_data["Flood"] = 0

# Combine flood + normal records
ml_data = pd.concat(
    [flood_data, normal_data],
    ignore_index=True
)

# Shuffle dataset
ml_data = ml_data.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

# Save
ml_data.to_csv(output_file, index=False)

print("\n========== ML DATASET CREATED ==========")
print("Total Records:", len(ml_data))

print("\nFlood Distribution:")
print(ml_data["Flood"].value_counts())

print("\nSaved File:")
print(output_file)

print("\nFirst 10 Records:")
print(ml_data.head(10))
