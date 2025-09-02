console.log("EventFinderCAT - San Fernando del Valle de Catamarca");

// Eventos típicos de Catamarca
const featuredEvents = [
    {
        id: 1,
        title: "Feria Artesanal Catamarqueña",
        category: "artesania",
        date: "2026-02-18",
        location: "Plaza 25 de Mayo",
        description: "Feria de artesanos locales con productos típicos catamarqueños",
        icon: "🎨"
    },
    {
        id: 2,
        title: "Festival del Poncho",
        category: "cultural",
        date: "2026-03-15",
        location: "Predio Ferial Catamarca",
        description: "El festival folklórico más importante de la provincia",
        icon: "🎪"
    },
    {
        id: 3,
        title: "Fiesta de la Chaya",
        category: "fiesta",
        date: "2026-02-24",
        location: "Toda la ciudad",
        description: "Celebración tradicional con música, baile y alegría",
        icon: "🎉"
    },
    {
        id: 4,
        title: "Ruta del Vino Catamarqueño",
        category: "gastronomia",
        date: "2026-04-10",
        location: "Valles Catamarqueños",
        description: "Degustación de vinos de altitud de Catamarca",
        icon: "🍷"
    },
    {
        id: 5,
        title: "Carnaval Catamarqueño",
        category: "fiesta",
        date: "2026-02-12",
        location: "Calles céntricas",
        description: "Corsos y comparsas por el carnaval catamarqueño",
        icon: "🎭"
    },
    {
        id: 6,
        title: "Mercado Norte Nocturno",
        category: "gastronomia",
        date: "2026-02-20",
        location: "Mercado Norte",
        description: "Noche de comida local y música en vivo",
        icon: "🌙"
    }
];

// Cargar eventos destacados
function loadFeaturedEvents() {
    const container = document.getElementById('featured-events-container');
    
    if (!container) return;
    
    container.innerHTML = ''; // Limpiar contenedor
    
    featuredEvents.forEach(event => {
        const eventCard = `
            <div class="event-card">
                <div class="event-image">
                    <span>${event.icon}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <span class="event-date">📅 ${formatDate(event.date)} | 📍 ${event.location}</span>
                    <p>${event.description}</p>
                    <span class="event-category">Categoría: ${event.category}</span>
                </div>
            </div>
        `;
        container.innerHTML += eventCard;
    });
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedEvents();
    console.log("Eventos de Catamarca cargados correctamente");
    
    // Animación smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Sistema de gestión de eventos
const EventManager = {
    events: JSON.parse(localStorage.getItem('catamarca_events')) || [],
    
    init() {
        console.log("Sistema de eventos de Catamarca inicializado");
    },
    
    addEvent(event) {
        this.events.push(event);
        this.saveEvents();
    },
    
    saveEvents() {
        localStorage.setItem('catamarca_events', JSON.stringify(this.events));
    }
};

// Inicializar el manager
EventManager.init();

// Efectos de animación
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos para animación
    document.querySelectorAll('.event-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        observer.observe(card);
    });
}

// Iniciar animaciones
setTimeout(animateElements, 1000);