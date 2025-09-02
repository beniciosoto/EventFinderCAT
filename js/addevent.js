console.log("AddEvent Manager - EventFinderCAT Catamarca");

class AddEventManager {
    constructor() {
        this.form = document.getElementById('add-event-form');
        this.notification = document.getElementById('form-notification');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setMinDate();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validación en tiempo real
        document.getElementById('event-title').addEventListener('blur', (e) => this.validateField(e.target));
        document.getElementById('event-description').addEventListener('blur', (e) => this.validateField(e.target));
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('event-date').min = today;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.saveEvent();
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field, 'Este campo es obligatorio');
            return false;
        }

        // Validaciones específicas
        if (field.id === 'event-date') {
            const selectedDate = new Date(field.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                this.showError(field, 'La fecha no puede ser anterior a hoy');
                return false;
            }
        }

        this.clearError(field);
        return true;
    }

    showError(field, message) {
        this.clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;

        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.style.borderColor = '#e0e0e0';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    saveEvent() {
        const eventData = {
            id: Date.now(),
            title: document.getElementById('event-title').value.trim(),
            category: document.getElementById('event-category').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            address: document.getElementById('event-address').value.trim(),
            description: document.getElementById('event-description').value.trim(),
            organizer: document.getElementById('event-organizer').value.trim(),
            contact: document.getElementById('event-contact').value.trim(),
            price: document.getElementById('event-price').value.trim(),
            icon: this.getCategoryIcon(document.getElementById('event-category').value),
            createdAt: new Date().toISOString()
        };

        // Guardar en localStorage
        this.addEventToStorage(eventData);
        
        // Mostrar éxito
        this.showNotification('✅ Evento publicado exitosamente! Será visible en la sección de eventos.', 'success');
        
        // Resetear formulario
        this.form.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    getCategoryIcon(category) {
        const icons = {
            'cultural': '🎭',
            'musica': '🎵',
            'deportes': '⚽',
            'gastronomia': '🍴',
            'artesania': '🎨',
            'fiesta': '🎉',
            'educacion': '📚',
            'negocios': '💼'
        };
        return icons[category] || '🎉';
    }

    addEventToStorage(eventData) {
        const existingEvents = JSON.parse(localStorage.getItem('catamarca_events')) || [];
        existingEvents.push(eventData);
        localStorage.setItem('catamarca_events', JSON.stringify(existingEvents));
    }

    showNotification(message, type) {
        this.notification.textContent = message;
        this.notification.className = `form-notification ${type}`;
        this.notification.style.display = 'block';

        // Ocultar después de 5 segundos
        setTimeout(() => {
            this.notification.style.display = 'none';
        }, 5000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.addEventManager = new AddEventManager();
    console.log("AddEvent Manager inicializado para Catamarca");
});

// Utilidades adicionales
function formatEventDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generateEventId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}