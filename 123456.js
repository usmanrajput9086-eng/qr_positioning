let scannerOn = false;
let reader = null;  // QR Code reader object

// Toggle the QR code scanner on and off
function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();  // Start scanning
        btn.innerText = "CANCEL";  // Change button text to 'CANCEL'
    } else {
        stopScanner();  // Stop scanning
        btn.innerText = "SCAN";  // Change button text back to 'SCAN'
    }
}

// Start the scanner when the button is clicked
function startScanner() {
    // Initialize the QR code reader with the 'qr-reader' element
    reader = new Html5QrcodeScanner(
        "qr-reader", {
            fps: 10,  // Frames per second (smooth scanning)
            qrbox: 250  // Size of the QR code box
        }
    );

    // Start scanning with the environment-facing camera
    reader.render(onScanSuccess, onScanError);
}

// Function that runs when the QR code is successfully scanned
function onScanSuccess(decodedText, decodedResult) {
    console.log("QR Code scanned successfully:", decodedText); // Log to ensure it's scanning
    // Parse the decoded text (assumed to be JSON formatted)
    let data;
    try {
        data = JSON.parse(decodedText);  // Parse the scanned QR code text as JSON
        console.log("Decoded Data:", data); // Log parsed data
    } catch (error) {
        console.error("Failed to parse QR data:", error);
        return;
    }

    // Display the new dynamic data from the QR code
    displayItemDetails(data);

    // Stop scanning after a successful scan
    toggleScanner();
}

// Function that runs when an error occurs during scanning
function onScanError(errorMessage) {
    console.error("Error scanning QR code:", errorMessage);
}

// Function to stop the scanner
function stopScanner() {
    if (reader) {
        reader.clear();  // Clear the scanner
    }
}

// Function to display item details dynamically
function displayItemDetails(data) {
    const nameParagraph = document.getElementById("item-name");
    const latitudeParagraph = document.getElementById("in-stock"); // Replacing "In Stock" with Latitude
    const longitudeParagraph = document.getElementById("price");  // Replacing "Price" with Longitude

    // Update the <p> tags with item details
    nameParagraph.textContent = "Name: " + data.name;
    latitudeParagraph.textContent = "Latitude: " + data.latitude;
    longitudeParagraph.textContent = "Longitude: " + data.longitude;
}
