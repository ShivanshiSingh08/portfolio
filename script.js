<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geolocation and Bing Maps</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- Font Awesome Icons -->
    <style>
        /* Add custom styles here */
        #map {
            height: 400px;
        }

        .animated {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }

        .gradient {
            fill: url(#gradient);
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h2>Your Location</h2>
                <p id="location-info">Fetching location...</p>
            </div>
            <div class="col-md-6">
                <h2>Map</h2>
                <div id="map"></div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12">
                <h2>SVG Graphics</h2>
                <div class="d-flex justify-content-between">
                    <!-- SVG content with animation -->
                    <svg class="animated-svg" width="100" height="100">
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color: #FF8008;" />
                                <stop offset="100%" style="stop-color: #FFC837;" />
                            </linearGradient>
                        </defs>
                        <circle class="animated gradient" cx="50" cy="50" r="40" />
                    </svg>

                    <!-- SVG content with animation -->
                    <svg class="animated-svg" width="100" height="100">
                        <defs>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color: #29ABE2;" />
                                <stop offset="100%" style="stop-color: #75C6E5;" />
                            </linearGradient>
                        </defs>
                        <rect class="animated gradient" width="100" height="100" />
                    </svg>

                    <!-- SVG content with animation -->
                    <svg class="animated-svg" width="100" height="100">
                        <defs>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color: #9B59B6;" />
                                <stop offset="100%" style="stop-color: #C882E1;" />
                            </linearGradient>
                        </defs>
                        <polygon class="animated gradient" points="50,10 90,90 10,90" />
                    </svg>
                </div>

                <div class="d-flex justify-content-center mt-3">
                    <button class="btn btn-primary btn-lg me-2">
                        <i class="fab fa-instagram"></i> Instagram
                    </button>
                    <button class="btn btn-primary btn-lg">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://www.bing.com/api/maps/mapcontrol?key=As9bWLCk8eA_Ph7lYO_9sLc9F0HZlQ9Z_GIXVLHQ_2YLCGZFTwViAIo_Sly2E0Gx"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // Get references to DOM elements
            const locationInfo = document.getElementById("location-info");
            const mapContainer = document.getElementById("map");
            const svgContainers = document.querySelectorAll(".animated-svg");

            // Check if geolocation is supported by the browser
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    locationInfo.textContent = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;

                    // Initialize Bing Map
                    const map = new Microsoft.Maps.Map(mapContainer, {
                        center: new Microsoft.Maps.Location(latitude, longitude),
                        zoom: 14
                    });

                    // Add a pushpin for the current location
                    const pin = new Microsoft.Maps.Pushpin(map.getCenter(), {});
                    map.entities.push(pin);

                    // Apply SVG animations
                    svgContainers.forEach(container => {
                        container.classList.add("animated");
                    });
                }, error => {
                    locationInfo.textContent = "Unable to retrieve location.";
                    console.error(error);
                });
            } else {
                locationInfo.textContent = "Geolocation is not supported by this browser.";
            }
        });
    </script>
</body>
</html>
