import pandas as pd

file_path = "data/flood_data.csv"

df = pd.read_csv(file_path)

print("\n========== DATASET INFORMATION ==========")

print("Total Records:", len(df))

print("\nColumns:")
for column in df.columns:
    print("-", column)

print("\nFirst 5 Records:")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nMissing Values:")
print(df.isnull().sum())