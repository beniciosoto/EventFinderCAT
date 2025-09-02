console.log("Map Manager - EventFinderCAT Catamarca");

class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.init();
    }

    init() {
        this.initializeMap();
        this.loadEventsOnMap();
    }

    initializeMap() {
        // Coordenadas de San Fernando del Valle de Catamarca
        const catamarcaCoords = [-28.4696, -65.7795];
        
        this.map = L.map('map').setView(catamarcaCoords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Marcador central de Catamarca
        L.marker(catamarcaCoords)
            .addTo(this.map)
            .bindPopup('<b>San Fernando del Valle de Catamarca</b><br>¡Bienvenido a la perla del oeste!')
            .openPopup();
    }

    loadEventsOnMap() {
        // Simular carga de eventos (en un caso real, se cargarían desde eventsManager)
        const events = [
            {
                id: 1,
                title: "Plaza 25 de Mayo",
                lat: -28.4695,
                lng: -65.7792,
                events: ["Feria Artesanal", "Eventos culturales"]
            },
            {
                id: 2,
                title: "Predio Ferial Catamarca",
                lat: -28.4550,
                lng: -65.7850,
                events: ["Festival del Poncho", "Exposiciones"]
            },
            {
                id: 3,
                title: "Mercado Norte",
                lat: -28.4720,
                lng: -65.7810,
                events: ["Mercado Nocturno", "Gastronomía"]
            },
            {
                id: 4,
                title: "Teatro Municipal",
                lat: -28.4680,
                lng: -65.7780,
                events: ["Obras de teatro", "Conciertos"]
            }
        ];

        this.addEventMarkers(events);
    }

    addEventMarkers(events) {
        // Limpiar marcadores existentes
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        events.forEach(event => {
            const marker = L.marker([event.lat, event.lng])
                .addTo(this.map)
                .bindPopup(`
                    <div class="map-popup">
                        <h4>${event.title}</h4>
                        <p><strong>Eventos:</strong></p>
                        <ul>
                            ${event.events.map(e => `<li>${e}</li>`).join('')}
                        </ul>
                    </div>
                `);

            this.markers.push(marker);
        });

        // Ajustar vista del mapa para mostrar todos los marcadores
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    addEvent(lat, lng, title, description) {
        const marker = L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${title}</h4>
                    <p>${description}</p>
                </div>
            `);

        this.markers.push(marker);
        return marker;
    }
}

// Inicializar mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.mapManager = new MapManager();
    console.log("Map Manager inicializado para Catamarca");
});

// Utilidades geográficas para Catamarca
const CatamarcaLocations = {
    'Plaza 25 de Mayo': { lat: -28.4695, lng: -65.7792 },
    'Predio Ferial Catamarca': { lat: -28.4550, lng: -65.7850 },
    'Mercado Norte': { lat: -28.4720, lng: -65.7810 },
    'Teatro Municipal': { lat: -28.4680, lng: -65.7780 },
    'Costanera': { lat: -28.4660, lng: -65.7820 },
    'Paseo General Navarro': { lat: -28.4700, lng: -65.7800 }
};

function getCoordinatesForLocation(locationName) {
    return CatamarcaLocations[locationName] || { lat: -28.4696, lng: -65.7795 };
}