import pandas as pd

# Original dataset
input_file = "data/flood_data.csv"

# Cleaned dataset
output_file = "data/flood_cleaned.csv"

print("Loading dataset...")

df = pd.read_csv(input_file)

print("Original Records:", len(df))
print("Original Columns:", len(df.columns))


# 1. Remove unnecessary columns
columns_to_remove = [
    "Unnamed: 0",
    "UEI",
    "Location",
    "Latitude",
    "Longitude",
    "Event Souce ID",
    "District_LGD_Codes",
    "State_Codes",
    "Description of Casualties/injured"
]

df = df.drop(
    columns=columns_to_remove,
    errors="ignore"
)


# 2. Convert dates
df["Start Date"] = pd.to_datetime(
    df["Start Date"],
    errors="coerce"
)

df["End Date"] = pd.to_datetime(
    df["End Date"],
    errors="coerce"
)


# 3. Convert numeric columns
numeric_columns = [
    "Duration(Days)",
    "Human fatality",
    "Human injured",
    "Human Displaced",
    "Animal Fatality"
]

for column in numeric_columns:
    if column in df.columns:
        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )


# 4. Fill missing numeric values
for column in numeric_columns:
    if column in df.columns:
        df[column] = df[column].fillna(0)


# 5. Clean text columns
text_columns = [
    "Main Cause",
    "Districts",
    "State",
    "Extent of damage"
]

for column in text_columns:
    if column in df.columns:
        df[column] = df[column].fillna("Unknown")
        df[column] = df[column].astype(str).str.strip()


# 6. Create date features
df["Year"] = df["Start Date"].dt.year
df["Month"] = df["Start Date"].dt.month


# 7. Create total human impact
df["Total Human Impact"] = (
    df["Human fatality"] +
    df["Human injured"] +
    df["Human Displaced"]
)


# 8. Remove records without date
df = df.dropna(
    subset=["Start Date"]
)


# 9. Reset index
df = df.reset_index(drop=True)


# 10. Save cleaned dataset
df.to_csv(
    output_file,
    index=False
)


print("\n========== CLEANING COMPLETE ==========")

print("Cleaned Records:", len(df))
print("Cleaned Columns:", len(df.columns))

print("\nColumns:")
for column in df.columns:
    print("-", column)

print("\nSaved File:")
print(output_file)

print("\nFirst 5 Records:")
print(df.head())