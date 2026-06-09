
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

// Small WebP thumbnails (assets/photos/thumbs/) for grid/map/bubbles;
// full-size JPEGs only load in the photo viewer.
function thumbSrc(photo) {
    return photo
        .replace('assets/photos/', 'assets/photos/thumbs/')
        .replace(/\.jpeg$/, '.webp');
}

const landscapePhotos = new Set([
    'budzyńpolska',
    'clallamcountyunitedstates',
    'courmayeuritalia',
    'málagaespaña_1',
    'seattleunitedstates',
    'sevillaespaña',
    'skaftárhreppurÍsland'
]);

function photoDimensions(photo) {
    const base = photo.split('/').pop().replace(/\.jpeg$/, '');
    return landscapePhotos.has(base)
        ? { width: 1920, height: 1440 }
        : { width: 1440, height: 1920 };
}

function initGallery() {
    const masonryGrid = document.getElementById('masonryGrid');
    if (!masonryGrid) return;

    let itemIndex = 0;
    photoLocations.forEach(location => {
        location.photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'masonry-item';
            item.style.setProperty('--item-index', itemIndex++);
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `${location.name}, ${location.country}`);

            const { width, height } = photoDimensions(photo);
            item.innerHTML = `
                <img src="${thumbSrc(photo)}" alt="${location.name}, ${location.country}" width="${width}" height="${height}" loading="lazy">
                <div class="masonry-item-overlay">
                    <div class="masonry-item-location">${location.name}</div>
                    <div class="masonry-item-country">${location.country}</div>
                </div>
            `;

            item.addEventListener('click', () => {
                viewPhotos(`${location.name}, ${location.country}`, [photo]);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    viewPhotos(`${location.name}, ${location.country}`, [photo]);
                }
            });

            masonryGrid.appendChild(item);
        });
    });
}

function initPhotoMap() {
    const photoMapElement = document.getElementById('photoMap');
    if (!photoMapElement) return;

    if (photoMapElement.dataset.initialized) return;
    photoMapElement.dataset.initialized = 'true';

    const map = L.map('photoMap').setView([48.0, 10.0], 4);

    // Muted CARTO basemap matches the site's palette better than default OSM
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
    }).addTo(map);

    const pinIcon = L.divIcon({
        className: 'custom-pin',
        html: '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M15 1C7.3 1 1 7.4 1 15.2 1 26 15 39 15 39s14-13 14-23.8C29 7.4 22.7 1 15 1z" fill="#8e6f80" stroke="#fbf9f6" stroke-width="1.5"/><circle cx="15" cy="15" r="5" fill="#fbf9f6"/></svg>',
        iconSize: [30, 40],
        iconAnchor: [15, 39],
        popupAnchor: [0, -34]
    });

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

    photoLocations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], { icon: pinIcon });

        const photosHtml = location.photos.map(photo =>
            `<img src="${thumbSrc(photo)}" alt="${location.name}" loading="lazy" onclick="viewPhotos('${location.name}', ${JSON.stringify(location.photos).replace(/"/g, '&quot;')})" />`
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

    map.addLayer(markers);

    const bounds = L.latLngBounds(photoLocations.map(loc => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
}

let currentPhotoIndex = 0;
let allPhotos = [];

photoLocations.forEach(location => {
    location.photos.forEach(photo => {
        allPhotos.push({
            src: photo,
            location: `${location.name}, ${location.country}`
        });
    });
});

window.viewPhotos = function(locationName, photos) {
    const photoViewer = document.getElementById('photoViewer');
    const locationNameEl = document.getElementById('photoLocationName');
    const photoGallery = document.getElementById('photoGallery');

    if (photos.length > 0) {
        currentPhotoIndex = allPhotos.findIndex(p => p.src === photos[0]);
        if (currentPhotoIndex === -1) currentPhotoIndex = 0;
    }

    const counterEl = document.getElementById('photoCounter');
    if (counterEl) {
        counterEl.textContent = photos.length === 1
            ? `${currentPhotoIndex + 1} / ${allPhotos.length}`
            : '';
    }

    const existingImg = photoGallery.querySelector('img');
    const isUpdate = existingImg && photos.length === 1;

    if (isUpdate) {
        const newImg = new Image();
        newImg.onload = function() {
            existingImg.src = photos[0];
            existingImg.alt = locationName;
            locationNameEl.textContent = locationName;
        };
        newImg.src = photos[0];
    } else {
        locationNameEl.textContent = locationName;

        photoGallery.innerHTML = '';

        photos.forEach(photoPath => {
            const img = document.createElement('img');
            img.src = photoPath;
            img.alt = locationName;
            img.loading = 'eager'; // Load immediately for navigation
            photoGallery.appendChild(img);
        });
    }

    const wasHidden = photoViewer.classList.contains('hidden');
    photoViewer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Push history state so back button works — but only when opening the
    // viewer, not on every next/prev navigation (which also calls viewPhotos)
    if (wasHidden) {
        history.pushState({ photoViewerOpen: true }, '', window.location.href);
    }
};

function nextPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    const photo = allPhotos[currentPhotoIndex];
    viewPhotos(photo.location, [photo.src]);
}

function prevPhoto() {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    const photo = allPhotos[currentPhotoIndex];
    viewPhotos(photo.location, [photo.src]);
}

function closePhotoViewerModal(skipHistoryPop = false) {
    const photoViewer = document.getElementById('photoViewer');
    if (!photoViewer || photoViewer.classList.contains('hidden')) return;

    photoViewer.classList.add('hidden');
    document.body.style.overflow = '';

    // If we're closing manually (not via back button), go back in history
    if (!skipHistoryPop && window.history.state?.photoViewerOpen) {
        window.history.back();
    }
}

const closePhotoViewer = document.getElementById('closePhotoViewer');
if (closePhotoViewer) {
    closePhotoViewer.addEventListener('click', function() {
        closePhotoViewerModal();
    });
}

const photoViewer = document.getElementById('photoViewer');
if (photoViewer) {
    photoViewer.addEventListener('click', function(e) {
        if (e.target === photoViewer) {
            closePhotoViewerModal();
        }
    });
}

// Handle back button to close photo viewer
window.addEventListener('popstate', function(e) {
    const photoViewer = document.getElementById('photoViewer');
    if (photoViewer && !photoViewer.classList.contains('hidden')) {
        // Close without going back again (skipHistoryPop = true)
        closePhotoViewerModal(true);
    }
});

// Wire up navigation arrows
const prevPhotoBtn = document.getElementById('prevPhotoBtn');
const nextPhotoBtn = document.getElementById('nextPhotoBtn');

if (prevPhotoBtn) {
    prevPhotoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevPhoto();
    });
}

if (nextPhotoBtn) {
    nextPhotoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextPhoto();
    });
}

// Add swipe gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

const photoViewerElement = document.getElementById('photoViewer');
if (photoViewerElement) {
    photoViewerElement.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    photoViewerElement.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for a swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next photo
            nextPhoto();
        } else {
            // Swiped right - go to previous photo
            prevPhoto();
        }
    }
}

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
            closePhotoViewerModal();
            break;
    }
});

function initViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const galleryView = document.getElementById('galleryView');
    const mapView = document.getElementById('mapView');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');

            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (view === 'gallery') {
                galleryView.classList.add('active');
                mapView.classList.remove('active');
            } else if (view === 'map') {
                galleryView.classList.remove('active');
                mapView.classList.add('active');

                if (window.loadLeaflet) {
                    window.loadLeaflet().then(() => {
                        setTimeout(() => {
                            initPhotoMap();
                        }, 100);
                    });
                } else {
                    setTimeout(() => {
                        initPhotoMap();
                    }, 100);
                }
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
        initViewSwitcher();
    });
} else {
    initGallery();
    initViewSwitcher();
}
