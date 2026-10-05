import pandas as pd

file_path = "data/historical_weather_dataset.csv"

print("Loading dataset...")

df = pd.read_csv(file_path)

print("\n========== DATASET CHECK ==========")

print("Total Records:", len(df))
print("Total Columns:", len(df.columns))

print("\nColumns:")
for column in df.columns:
    print("-", column)

print("\nFlood Value Count:")
print(df["Flood"].value_counts())

print("\nMissing Values:")
print(df.isnull().sum())

print("\nUnique Districts:")
print(df["District"].nunique())

print("\nDate Range:")
print("From:", df["Date"].min())
print("To:", df["Date"].max())

print("\nRainfall Statistics:")
print(df["Rainfall"].describe())

print("\nTemperature Statistics:")
print(df["Temperature"].describe())

print("\nWind Statistics:")
print(df["Max_Wind"].describe())

print("\nFirst 10 Records:")
print(df.head(10))