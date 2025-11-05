from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import pickle
import pandas as pd

app = FastAPI()

# Load model
with open("california_model.pkl", "rb") as f:
    classifier = pickle.load(f)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve HTML page
@app.get("/", response_class=HTMLResponse)
def main_page():
    with open("templates/index.html", "r") as f:
        return f.read()

#  Predict from input boxes
@app.get("/predict")
def predict(MedInc: float, HouseAge: float, AveRooms: float,
            Population: float, AveOccup: float, Latitude: float):
    input_data = [[MedInc, HouseAge, AveRooms, Population, AveOccup, Latitude]]
    prediction = classifier['model'].predict(input_data)
    return {"prediction": float(round(prediction[0],2))}

#  Predict from uploaded CSV
@app.post("/predict_file")
def predict_file(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    prediction = classifier['model'].predict(df)

    # Add predictions to dataframe
    df["Prediction"] = prediction

    # Return full table as JSON 
    return df.to_dict(orient="records")


