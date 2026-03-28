let scannerOn = false;
let reader = new Html5Qrcode("camera");  // Initialize the QR code reader with the 'camera' element ID

// Toggle the QR code scanner on and off
function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();  // Start scanning
        mapContainer.style.display = "none";  // Hide map container when scanning
        btn.innerText = "CANCEL";  // Change button text to 'CANCEL'
    } else {
        stopScanner();  // Stop scanning
        mapContainer.style.display = "block";  // Show map container when not scanning
        btn.innerText = "SCAN";  // Change button text back to 'SCAN'
    }
}

// Start the scanner when the button is clicked
function startScanner() {
    // Make sure the 'camera' element is present and initialized
    reader.start(
        { facingMode: "environment" },  // Use the device camera
        { },  // Default configuration
        function (text) {
            // Parse the scanned JSON data
            const place = JSON.parse(text);

            // Display the marker at the decoded coordinates
            showMarkerAt(place.top, place.left);

            // Stop the scanner after a successful scan
            toggleScanner();
        }
    ).catch(function (err) {
        console.error("Error starting the scanner: ", err);  // Log any errors in scanner initialization
    });
}

// Stop the scanner
function stopScanner() {
    reader.stop();  // Stop the QR code reader (camera)
}

// Function to show the marker on the map (if needed)
function showMarkerAt(top, left) {
    const marker = document.getElementById("marker");
    marker.style.top = top;
    marker.style.left = left;
}
