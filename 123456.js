let scannerOn = false;
let reader = null;  // QR Code reader object

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
    // Parse the JSON data from the QR code
    const item = JSON.parse(decodedText);

    // Display item details in separate <p> tags
    displayItemDetails(item);

    // Stop scanning after a successful scan
    toggleScanner();
}

// Function that runs when an error occurs during scanning
function onScanError(errorMessage) {
    console.error("Error scanning QR code:", errorMessage);
}

// Function to stop the scanner
function stopScanner() {
    reader.clear();  // Clear the scanner
}

// Function to display item details dynamically
function displayItemDetails(data) {
    const nameParagraph = document.getElementById("item-name");
    const inStockParagraph = document.getElementById("in-stock");
    const priceParagraph = document.getElementById("price");

    // Update the <p> tags with item details
    nameParagraph.textContent = "Name: " + data.name;
    inStockParagraph.textContent = "In Stock: " + (data.inStock ? "Yes" : "No");
    priceParagraph.textContent = "Price: €" + data.price.toFixed(2);
}
