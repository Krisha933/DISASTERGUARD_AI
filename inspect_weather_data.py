import pandas as pd

file_path = "data/flood_cleaned.csv"

df = pd.read_csv(file_path)

print("\n========== WEATHER DATA INSPECTION ==========")

print("\nTotal Records:", len(df))

print("\nImportant Columns:")
for column in [
    "Start Date",
    "End Date",
    "State",
    "Districts",
    "Main Cause"
]:
    if column in df.columns:
        print("-", column)

print("\nUnique States:", df["State"].nunique())

print("\nStates:")
print(df["State"].value_counts().head(20))

print("\nSample District Data:")
print(df["Districts"].dropna().head(20))

print("\nDate Range:")
print("Start:", df["Start Date"].min())
print("End:", df["Start Date"].max())

print("\nMissing Values:")
print(
    df[
        ["Start Date", "State", "Districts"]
    ].isnull().sum()
)