# California Housing Prediction App

This is a FastAPI app that predicts California housing prices using a pre-trained model.

## Features
- Input 6 features manually and get predictions
- Upload CSV files to get batch predictions
- Modern web UI with HTML, CSS, and JS
- Docker-ready for deployment

CMD by default give  http://0.0.0.0:8000
but we need below one 

http://127.0.0.1:8000/
http://localhost:8000/

## How to Run

### Using Docker:
```bash
docker build -t app-app .
docker run -p 8000:8000 app-app
