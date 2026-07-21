// API Configuration
const API_URL = '/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Save token to localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('token');
}

// Get user from localStorage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Save user to localStorage
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Remove user from localStorage
function removeUser() {
    localStorage.removeItem('user');
}

// Check if user is logged in
function isLoggedIn() {
    return !!getToken();
}

// Check if user is admin
function isAdmin() {
    const user = getUser();
    return user && user.role === 'admin';
}

// Logout
function logout() {
    removeToken();
    removeUser();
    window.location.href = '/index.html';
}

// Download file with authentication
async function downloadFile(url, filename) {
    try {
        const token = getToken();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: response.statusText }));
            throw new Error(error.error || 'Gagal mengunduh file');
        }

        // Get filename from Content-Disposition header if available
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition && contentDisposition.includes('filename=')) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match) filename = match[1];
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
        
        showAlert('File berhasil diunduh!', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showAlert('Gagal mengunduh file: ' + error.message, 'danger');
    }
}

// API Call with authentication
async function apiCall(endpoint, options = {}) {
    const token = getToken();
    
    const config = {
        ...options,
        headers: {
            ...options.headers,
        }
    };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Terjadi kesalahan');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Format date to Indonesian
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Format date for input
function formatDateInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// Show alert
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Show loading
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'text-center my-5';
    loadingDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    return loadingDiv;
}

// Get status badge class
function getStatusBadgeClass(status) {
    const badges = {
        'pending': 'badge-pending',
        'diterima': 'badge-diterima',
        'diproses': 'badge-diproses',
        'selesai': 'badge-selesai',
        'ditolak': 'badge-ditolak'
    };
    return badges[status] || 'bg-secondary';
}

// Get status label
function getStatusLabel(status) {
    const labels = {
        'pending': 'Menunggu',
        'diterima': 'Diterima',
        'diproses': 'Diproses',
        'selesai': 'Selesai',
        'ditolak': 'Ditolak'
    };
    return labels[status] || status;
}

/* ================================
   MODERN UI ENHANCEMENTS
   ================================ */

// Initialize Modern UI Features
document.addEventListener('DOMContentLoaded', function() {
    // MINIMAL MODE - Only smooth scroll
    initSmoothScroll();
    
    // ALL ENHANCEMENTS DISABLED TO FIX SCROLL/CLICK ISSUES
    // Uncomment one by one after testing
    // initRippleEffect();
    // initIntersectionObserver();
    // initNavbarScroll();
    // initScrollProgress();
    // initCounterAnimation();
    // enhanceAlerts();
    // enhanceButtons();
    // enhanceCards();
    // enhanceTables();
    
    console.log('✅ WBS UI loaded - MINIMAL MODE (Scroll & Click Fixed)');
});

// 1. Smooth Scroll Enhancement
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 2. Ripple Effect for Buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .menu-item, .card');
    
    buttons.forEach(button => {
        if (!button.classList.contains('no-ripple')) {
            button.classList.add('btn-ripple');
            
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        }
    });
    
    // Add ripple CSS dynamically
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3. Intersection Observer for Fade-in Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 4. Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// 5. Scroll Progress Bar
function initScrollProgress() {
    // Create progress bar if not exists
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
    }
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 6. Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter, .stat-card h3, [data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent) || parseInt(counter.getAttribute('data-target')) || 0;
        if (target === 0 || isNaN(target)) return;
        
        counter.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 7. Enhanced Alert with Animation
function enhanceAlerts() {
    // Override showAlert to add animations
    const originalShowAlert = window.showAlert;
    if (originalShowAlert) {
        window.showAlert = function(message, type = 'success') {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-slide-in`;
            alertDiv.style.animation = 'slideInDown 0.5s ease';
            alertDiv.innerHTML = `
                <i class="bi bi-${getAlertIcon(type)}"></i> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(alertDiv, container.firstChild);
                
                // Add slide out animation before remove
                setTimeout(() => {
                    alertDiv.style.animation = 'slideOutUp 0.5s ease';
                    setTimeout(() => alertDiv.remove(), 500);
                }, 5000);
            }
        };
    }
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle-fill',
        'danger': 'exclamation-triangle-fill',
        'warning': 'exclamation-circle-fill',
        'info': 'info-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}

// 8. Enhance Buttons with Effects
function enhanceButtons() {
    // Add hover glow to primary buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (!btn.classList.contains('no-glow')) {
            btn.classList.add('btn-glow');
        }
    });
    
    // Add 3D effect to success/danger buttons
    document.querySelectorAll('.btn-success, .btn-danger').forEach(btn => {
        if (!btn.classList.contains('no-3d')) {
            btn.classList.add('btn-3d');
        }
    });
}

// 9. Enhance Cards with Hover Effects
function enhanceCards() {
    // Add hover lift to cards
    document.querySelectorAll('.card').forEach(card => {
        if (!card.classList.contains('no-hover')) {
            card.classList.add('card-hover-lift');
        }
    });
    
    // Add glass effect to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        if (!card.classList.contains('no-glass')) {
            card.classList.add('stat-card-enhanced');
        }
    });
}

// 10. Enhance Tables with Animations
function enhanceTables() {
    document.querySelectorAll('.table').forEach(table => {
        if (!table.classList.contains('table-hover')) {
            table.classList.add('table-hover');
        }
        if (!table.classList.contains('no-animation')) {
            table.classList.add('table-animated');
        }
    });
}

// 11. Add Badges Pulse Animation
function enhanceBadges() {
    document.querySelectorAll('.badge-pending').forEach(badge => {
        badge.classList.add('badge-pulse');
    });
}

// 12. Form Input Enhancement
document.addEventListener('focus', function(e) {
    if (e.target.matches('.form-control, .form-select')) {
        e.target.closest('.mb-3, .form-group')?.classList.add('focused');
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.matches('.form-control, .form-select')) {
        e.target.closest('.mb-3, .form-group')?.classList.remove('focused');
    }
}, true);

// 13. Loading State Enhancement
function showLoadingEnhanced(container) {
    const loader = document.createElement('div');
    loader.className = 'text-center my-5';
    loader.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Memuat data...</p>
    `;
    container.appendChild(loader);
    return loader;
}

// 14. Success/Error State Animations
function showSuccess(element) {
    element.classList.add('success-bounce');
    setTimeout(() => element.classList.remove('success-bounce'), 600);
}

function showError(element) {
    element.classList.add('error-shake');
    setTimeout(() => element.classList.remove('error-shake'), 500);
}

// 15. Lazy Load Images (if any)
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 16. Add Page Transition Effect
function addPageTransition() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// Initialize page transition
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPageTransition);
} else {
    addPageTransition();
}

// 17. Enhanced Tooltip (if needed)
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            animation: true,
            delay: { show: 300, hide: 100 }
        });
    });
}

// Call initTooltips if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    initTooltips();
}

// 18. Add Floating Labels Animation
document.querySelectorAll('.form-floating input, .form-floating textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Export functions for use in other scripts
window.UIEnhancements = {
    animateCounter,
    showSuccess,
    showError,
    showLoadingEnhanced,
    enhanceBadges,
    initLazyLoad
};

