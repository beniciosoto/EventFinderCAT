console.log("Events Manager - EventFinderCAT Catamarca");

class EventsManager {
    constructor() {
        this.events = this.loadEvents();
        this.filteredEvents = [...this.events];
        this.currentFilters = {
            category: 'all',
            date: '',
            search: '',
            location: 'all'
        };

        this.init();
    }

    init() {
        this.renderEvents();
        this.setupEventListeners();
        this.updateEventsCount();
    }

    loadEvents() {
        const savedEvents = JSON.parse(localStorage.getItem('catamarca_events')) || [];
        const defaultEvents = [
            {
                id: 1,
                title: "Feria Artesanal Catamarqueña",
                category: "artesania",
                date: "2026-02-18",
                time: "10:00",
                location: "Plaza 25 de Mayo",
                description: "Feria de artesanos locales con productos típicos catamarqueños. Vení a descubrir las mejores artesanías de nuestra provincia.",
                organizer: "Municipalidad de SFVC",
                contact: "feria@catamarca.gob.ar",
                price: "Gratis",
                icon: "🎨",
                featured: true
            },
            {
                id: 2,
                title: "Festival del Poncho",
                category: "cultural",
                date: "2026-03-15",
                time: "18:00",
                location: "Predio Ferial Catamarca",
                description: "El festival folklórico más importante de la provincia. Música en vivo, danzas y gastronomía regional.",
                organizer: "Gobierno de Catamarca",
                contact: "festivalponcho@catamarca.gob.ar",
                price: "$1000",
                icon: "🎪",
                featured: true
            }
        ];

        return [...defaultEvents, ...savedEvents];
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.applyFilters();
        });

        document.getElementById('date-filter').addEventListener('change', (e) => {
            this.currentFilters.date = e.target.value;
            this.applyFilters();
        });

        document.getElementById('search-filter').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        document.getElementById('location-filter').addEventListener('change', (e) => {
            this.currentFilters.location = e.target.value;
            this.applyFilters();
        });

        // Reset filters
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });
    }

    applyFilters() {
        this.filteredEvents = this.events.filter(event => {
            // Filtro por categoría
            if (this.currentFilters.category !== 'all' && event.category !== this.currentFilters.category) {
                return false;
            }

            // Filtro por fecha
            if (this.currentFilters.date && event.date !== this.currentFilters.date) {
                return false;
            }

            // Filtro por búsqueda
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const matchesSearch = 
                    event.title.toLowerCase().includes(searchTerm) ||
                    event.description.toLowerCase().includes(searchTerm) ||
                    event.location.toLowerCase().includes(searchTerm) ||
                    event.organizer.toLowerCase().includes(searchTerm);
                
                if (!matchesSearch) return false;
            }

            // Filtro por ubicación
            if (this.currentFilters.location !== 'all') {
                const locationMap = {
                    'centro': ['Plaza 25 de Mayo', 'Teatro Municipal', 'Paseo General Navarro'],
                    'plaza-25-mayo': ['Plaza 25 de Mayo'],
                    'predio-ferial': ['Predio Ferial Catamarca'],
                    'mercado-norte': ['Mercado Norte'],
                    'costanera': ['Costanera']
                };

                if (!locationMap[this.currentFilters.location].includes(event.location)) {
                    return false;
                }
            }

            return true;
        });

        this.renderEvents();
        this.updateEventsCount();
    }

    resetFilters() {
        this.currentFilters = {
            category: 'all',
            date: '',
            search: '',
            location: 'all'
        };

        document.getElementById('category-filter').value = 'all';
        document.getElementById('date-filter').value = '';
        document.getElementById('search-filter').value = '';
        document.getElementById('location-filter').value = 'all';

        this.filteredEvents = [...this.events];
        this.renderEvents();
        this.updateEventsCount();
    }

    renderEvents() {
        const container = document.getElementById('events-container');
        const noEvents = document.getElementById('no-events');

        if (!container) return;

        if (this.filteredEvents.length === 0) {
            container.innerHTML = '';
            noEvents.style.display = 'block';
            return;
        }

        noEvents.style.display = 'none';

        container.innerHTML = this.filteredEvents.map(event => `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-image">
                    <span>${event.icon || '🎉'}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <span class="event-date">📅 ${this.formatDate(event.date)} | ⏰ ${event.time}</span>
                        <span class="event-location">📍 ${event.location}</span>
                        <span class="event-category">🏷️ ${this.formatCategory(event.category)}</span>
                    </div>
                    <p>${event.description}</p>
                    <div class="event-details">
                        <span class="event-organizer">👤 ${event.organizer}</span>
                        ${event.contact ? `<span class="event-contact">📞 ${event.contact}</span>` : ''}
                        <span class="event-price">💰 ${event.price || 'Consultar'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        return new Date(dateString).toLocaleDateString('es-AR', options);
    }

    formatCategory(category) {
        const categories = {
            'cultural': 'Cultural',
            'musica': 'Música',
            'deportes': 'Deportes',
            'gastronomia': 'Gastronomía',
            'artesania': 'Artesanía',
            'fiesta': 'Fiesta',
            'educacion': 'Educación',
            'negocios': 'Negocios'
        };
        return categories[category] || category;
    }

    updateEventsCount() {
        const countElement = document.getElementById('events-count');
        if (countElement) {
            countElement.textContent = `${this.filteredEvents.length} evento${this.filteredEvents.length !== 1 ? 's' : ''} encontrado${this.filteredEvents.length !== 1 ? 's' : ''}`;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.eventsManager = new EventsManager();
    console.log("Events Manager inicializado para Catamarca");
});

// Utilidades adicionales
function sortEventsByDate(events) {
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function filterUpcomingEvents(events) {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date >= today);
}