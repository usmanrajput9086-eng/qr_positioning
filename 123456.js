let scannerOn = false;
let reader = new Html5Qrcode("camera");  // Initialize the QR code reader

// Toggle the QR code scanner on and off
function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

// Start the scanner when the button is clicked
function startScanner() {
    reader.start(
        { facingMode: "environment" },  // Use the device camera
        {},  // Default configuration
        function (text) {
            // Parse the scanned JSON data
            const item = JSON.parse(text);

            // Display item details in separate <p> tags
            displayItemDetails(item);

            // Stop the scanner after a successful scan
            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);  // Handle error in scanning
    });
}

// Stop the scanner
function stopScanner() {
    reader.stop();
}

// Display the item details dynamically
function displayItemDetails(data) {
    // Get the <p> tags by their IDs
    const nameParagraph = document.getElementById("item-name");
    const inStockParagraph = document.getElementById("in-stock");
    const priceParagraph = document.getElementById("price");

    // Update the content of the <p> tags
    nameParagraph.textContent = "Name: " + data.name;
    inStockParagraph.textContent = "In Stock: " + (data.inStock ? "Yes" : "No");
    priceParagraph.textContent = "Price: €" + data.price.toFixed(2);
}
