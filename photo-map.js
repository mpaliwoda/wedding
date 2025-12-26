
// Photo locations data with GPS coordinates (shared between gallery and map)
const photoLocations = [
    {
        name: "Pieve Ligure",
        country: "Italia",
        lat: 44.3828027777778,
        lng: 9.0909,
        photos: ["assets/photos/pieveligureitalia.jpeg"]
    },
    {
        name: "Seattle",
        country: "United States",
        lat: 47.6034388888889,
        lng: -122.281227777778,
        photos: ["assets/photos/seattleunitedstates.jpeg"]
    },
    {
        name: "Machico",
        country: "Portugal",
        lat: 32.7546361111111,
        lng: -16.7526305555556,
        photos: ["assets/photos/machicoportugal.jpeg"]
    },
    {
        name: "Zermatt",
        country: "Switzerland",
        lat: 46.0320083333333,
        lng: 7.74614444444444,
        photos: ["assets/photos/zermattschweizsuissesvizzerasvizra.jpeg"]
    },
    {
        name: "Budzyń",
        country: "Polska",
        lat: 50.0482361111111,
        lng: 19.7968138888889,
        photos: ["assets/photos/budzyńpolska.jpeg"]
    },
    {
        name: "Grand Canyon",
        country: "United States",
        lat: 36.0636,
        lng: -112.113,
        photos: [
            "assets/photos/grandcanyonvillageunitedstates.jpeg",
            "assets/photos/grandcanyonvillageunitedstates_1.jpeg"
        ]
    },
    {
        name: "Małe Ciche",
        country: "Polska",
        lat: 49.2590638888889,
        lng: 20.0765305555556,
        photos: ["assets/photos/małecichepolska.jpeg"]
    },
    {
        name: "Bryce Canyon Area",
        country: "United States",
        lat: 37.272,
        lng: -112.945,
        photos: [
            "assets/photos/washingtoncountyunitedstates.jpeg",
            "assets/photos/washingtoncountyunitedstates_1.jpeg"
        ]
    },
    {
        name: "Zuberec",
        country: "Slovensko",
        lat: 49.2227944444444,
        lng: 19.6823305555556,
        photos: ["assets/photos/zuberecslovensko.jpeg"]
    },
    {
        name: "Skaftárhreppur",
        country: "Ísland",
        lat: 63.7789416666667,
        lng: -18.1767222222222,
        photos: ["assets/photos/skaftárhreppurÍsland.jpeg"]
    },
    {
        name: "Kraków",
        country: "Polska",
        lat: 50.0510416666667,
        lng: 20.1687416666667,
        photos: [
            "assets/photos/krakówpolska.jpeg",
            "assets/photos/krakówpolska_1.jpeg"
        ]
    },
    {
        name: "Vancouver",
        country: "Canada",
        lat: 49.2830694444444,
        lng: -123.108405555556,
        photos: ["assets/photos/vancouvercanada.jpeg"]
    },
    {
        name: "Pisary",
        country: "Polska",
        lat: 50.1316305555556,
        lng: 19.6816416666667,
        photos: ["assets/photos/pisarypolska.jpeg"]
    },
    {
        name: "Manarola",
        country: "Italia",
        lat: 44.1075027777778,
        lng: 9.72644444444444,
        photos: ["assets/photos/manarolaitalia.jpeg"]
    },
    {
        name: "Courmayeur",
        country: "Italia",
        lat: 45.8469916666667,
        lng: 7.03350833333333,
        photos: ["assets/photos/courmayeuritalia.jpeg"]
    },
    {
        name: "Sestri Levante",
        country: "Italia",
        lat: 44.2544277777778,
        lng: 9.40542222222222,
        photos: ["assets/photos/sestrilevanteitalia.jpeg"]
    },
    {
        name: "North Cascades",
        country: "United States",
        lat: 48.7389944444444,
        lng: -121.840377777778,
        photos: ["assets/photos/whatcomcountyunitedstates.jpeg"]
    },
    {
        name: "Clallam County",
        country: "United States",
        lat: 48.2506944444444,
        lng: -124.691338888889,
        photos: ["assets/photos/clallamcountyunitedstates.jpeg"]
    },
    {
        name: "San Francisco Mazapa",
        country: "México",
        lat: 19.6930611111111,
        lng: -98.84555,
        photos: ["assets/photos/sanfranciscomazapaméxico.jpeg"]
    },
    {
        name: "Sevilla",
        country: "España",
        lat: 37.377625,
        lng: -5.98800833333333,
        photos: ["assets/photos/sevillaespaña.jpeg"]
    },
    {
        name: "Kościelisko",
        country: "Polska",
        lat: 49.2435111111111,
        lng: 19.8641305555556,
        photos: ["assets/photos/kościeliskopolska.jpeg"]
    },
    {
        name: "Málaga",
        country: "España",
        lat: 36.7211222222222,
        lng: -4.41571666666667,
        photos: [
            "assets/photos/málagaespaña.jpeg",
            "assets/photos/málagaespaña_1.jpeg"
        ]
    },
    {
        name: "Zalipie",
        country: "Polska",
        lat: 50.2371555555556,
        lng: 20.8603305555556,
        photos: ["assets/photos/zalipiepolska.jpeg"]
    },
    {
        name: "Starachowice",
        country: "Polska",
        lat: 51.0357083333333,
        lng: 21.0801444444444,
        photos: ["assets/photos/starachowicepolska.jpeg"]
    },
    {
        name: "Area C Sasquatch Country",
        country: "Canada",
        lat: 49.5210388888889,
        lng: -121.767425,
        photos: ["assets/photos/areacsasquatchcountrycanada.jpeg"]
    },
    {
        name: "Rabka-Zdrój",
        country: "Polska",
        lat: 49.6150138888889,
        lng: 19.9720833333333,
        photos: ["assets/photos/rabkazdrójpolska.jpeg"]
    }
];

// Gallery functionality
function initGallery() {
    const masonryGrid = document.getElementById('masonryGrid');
    if (!masonryGrid) return;

    // Create gallery items from all photos
    let itemIndex = 0;
    photoLocations.forEach(location => {
        location.photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'masonry-item';
            item.style.setProperty('--item-index', itemIndex++);

            item.innerHTML = `
                <img src="${photo}" alt="${location.name}, ${location.country}" loading="lazy">
                <div class="masonry-item-overlay">
                    <div class="masonry-item-location">${location.name}</div>
                    <div class="masonry-item-country">${location.country}</div>
                </div>
            `;

            // Click to view full size
            item.addEventListener('click', () => {
                viewPhotos(`${location.name}, ${location.country}`, [photo]);
            });

            masonryGrid.appendChild(item);
        });
    });
}

// Photo Map functionality
function initPhotoMap() {
    const photoMapElement = document.getElementById('photoMap');
    if (!photoMapElement) return;

    // Only initialize if not already initialized
    if (photoMapElement.dataset.initialized) return;
    photoMapElement.dataset.initialized = 'true';

    // Initialize map centered on Europe (roughly between all locations)
    const map = L.map('photoMap').setView([48.0, 10.0], 4);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Create marker cluster group
    const markers = L.markerClusterGroup({
        maxClusterRadius: 80,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            return L.divIcon({
                html: '<div class="cluster-icon">' + count + '</div>',
                className: 'custom-cluster-icon',
                iconSize: L.point(40, 40)
            });
        }
    });

    // Add markers for each location
    photoLocations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]);

        // Create popup content with photo thumbnails
        const photosHtml = location.photos.map(photo =>
            `<img src="${photo}" alt="${location.name}" onclick="viewPhotos('${location.name}', ${JSON.stringify(location.photos).replace(/"/g, '&quot;')})" />`
        ).join('');

        const popupContent = `
            <div class="popup-location">${location.name}, ${location.country}</div>
            <div class="popup-photos">
                ${photosHtml}
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 320,
            minWidth: 200
        });

        markers.addLayer(marker);
    });

    // Add marker cluster group to map
    map.addLayer(markers);

    // Adjust map bounds to show all markers
    const bounds = L.latLngBounds(photoLocations.map(loc => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Gallery navigation state
let currentPhotoIndex = 0;
let allPhotos = [];

// Build array of all photos with their locations
photoLocations.forEach(location => {
    location.photos.forEach(photo => {
        allPhotos.push({
            src: photo,
            location: `${location.name}, ${location.country}`
        });
    });
});

// Function to view photos in modal
window.viewPhotos = function(locationName, photos) {
    const photoViewer = document.getElementById('photoViewer');
    const locationNameEl = document.getElementById('photoLocationName');
    const photoGallery = document.getElementById('photoGallery');

    // Find the index of the first photo in the global array
    if (photos.length > 0) {
        currentPhotoIndex = allPhotos.findIndex(p => p.src === photos[0]);
        if (currentPhotoIndex === -1) currentPhotoIndex = 0;
    }

    // Check if we're just updating an existing view
    const existingImg = photoGallery.querySelector('img');
    const isUpdate = existingImg && photos.length === 1;

    if (isUpdate) {
        // Just update the existing image smoothly
        const newImg = new Image();
        newImg.onload = function() {
            existingImg.src = photos[0];
            existingImg.alt = locationName;
            locationNameEl.textContent = locationName;
        };
        newImg.src = photos[0];
    } else {
        // Set location name
        locationNameEl.textContent = locationName;

        // Clear previous photos
        photoGallery.innerHTML = '';

        // Add photos to gallery
        photos.forEach(photoPath => {
            const img = document.createElement('img');
            img.src = photoPath;
            img.alt = locationName;
            img.loading = 'eager'; // Load immediately for navigation
            photoGallery.appendChild(img);
        });
    }

    // Show photo viewer
    photoViewer.classList.remove('hidden');

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
};

// Navigate to next photo
function nextPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    const photo = allPhotos[currentPhotoIndex];
    viewPhotos(photo.location, [photo.src]);
}

// Navigate to previous photo
function prevPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    const photo = allPhotos[currentPhotoIndex];
    viewPhotos(photo.location, [photo.src]);
}

// Close photo viewer
const closePhotoViewer = document.getElementById('closePhotoViewer');
if (closePhotoViewer) {
    closePhotoViewer.addEventListener('click', function() {
        const photoViewer = document.getElementById('photoViewer');
        photoViewer.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}

// Close photo viewer when clicking outside
const photoViewer = document.getElementById('photoViewer');
if (photoViewer) {
    photoViewer.addEventListener('click', function(e) {
        if (e.target === photoViewer) {
            photoViewer.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Keyboard navigation for photo viewer
document.addEventListener('keydown', function(e) {
    const photoViewer = document.getElementById('photoViewer');
    if (!photoViewer || photoViewer.classList.contains('hidden')) return;

    switch(e.key) {
        case 'ArrowLeft':
        case 'h':
            e.preventDefault();
            prevPhoto();
            break;
        case 'ArrowRight':
        case 'l':
            e.preventDefault();
            nextPhoto();
            break;
        case 'Escape':
            e.preventDefault();
            photoViewer.classList.add('hidden');
            document.body.style.overflow = 'auto';
            break;
    }
});

// View switcher functionality
function initViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const galleryView = document.getElementById('galleryView');
    const mapView = document.getElementById('mapView');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');

            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Switch views
            if (view === 'gallery') {
                galleryView.classList.add('active');
                mapView.classList.remove('active');
            } else if (view === 'map') {
                galleryView.classList.remove('active');
                mapView.classList.add('active');

                // Load Leaflet libraries and initialize map
                if (window.loadLeaflet) {
                    window.loadLeaflet().then(() => {
                        setTimeout(() => {
                            initPhotoMap();
                        }, 100);
                    });
                } else {
                    // Fallback if Leaflet is already loaded
                    setTimeout(() => {
                        initPhotoMap();
                    }, 100);
                }
            }
        });
    });
}

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
        initViewSwitcher();
    });
} else {
    initGallery();
    initViewSwitcher();
}
