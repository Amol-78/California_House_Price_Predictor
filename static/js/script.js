async function predict() {
    const MedInc = parseFloat(document.getElementById('MedInc').value);
    const HouseAge = parseFloat(document.getElementById('HouseAge').value);
    const AveRooms = parseFloat(document.getElementById('AveRooms').value);
    const Population = parseFloat(document.getElementById('Population').value);
    const AveOccup = parseFloat(document.getElementById('AveOccup').value);
    const Latitude = parseFloat(document.getElementById('Latitude').value);

    const url = `http://localhost:8000/predict?MedInc=${MedInc}&HouseAge=${HouseAge}&AveRooms=${AveRooms}&Population=${Population}&AveOccup=${AveOccup}&Latitude=${Latitude}`;

    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('predictionResult').innerText = "Predicted Price: " + data.prediction;
}


async function predictFile() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/predict_file", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    // Create table
    let table = "<table border='1' style='width:100%; text-align:center; border-collapse: collapse;'>";
    
    // Table header
    table += "<tr>";
    for (let key in data[0]) {
        table += `<th>${key}</th>`;
    }
    table += "</tr>";

    // Table rows
    data.forEach(row => {
        table += "<tr>";
        for (let key in row) {
            table += `<td>${row[key]}</td>`;
        }
        table += "</tr>";
    });

    table += "</table>";

    document.getElementById('fileResult').innerHTML = table;
}


