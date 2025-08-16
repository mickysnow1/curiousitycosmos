// learnspark-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons with error handling
    try {
        lucide.createIcons();
    } catch (e) {
        console.warn('Lucide icons failed to load:', e);
        // Fallback: Add text to menu button if icons fail
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<span class="sr-only">Toggle Menu</span><span>Menu</span>';
        }
    }

    // Mobile menu and dropdown functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
            try {
                lucide.createIcons();
            } catch (e) {
                console.warn('Lucide icons failed to reinitialize:', e);
            }
        });

        // Dropdown toggle for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                    try {
                        lucide.createIcons();
                    } catch (e) {
                        console.warn('Lucide icons failed to reinitialize:', e);
                    }
                }
            });
        });
    } else {
        console.warn('Mobile menu elements not found');
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faqItem => faqItem.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form submission
    const learningForm = document.getElementById('learningForm');
    const successToast = document.getElementById('successToast');

    if (learningForm) {
        learningForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(learningForm);
            const childName = formData.get('childName');
            const childAge = formData.get('childAge');
            const parentName = formData.get('parentName');
            const email = formData.get('email');
            const challenges = formData.get('challenges');

            if (!childName || !childAge || !parentName || !email) {
                showError('Please fill in all required fields.');
                return;
            }

            if (childAge < 1 || childAge > 16) {
                showError('Child age must be between 1 and 16.');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            showToast();
            learningForm.reset();
            console.log('Form submitted with data:', {
                childName,
                childAge,
                parentName,
                email,
                challenges
            });
        });
    }

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                try {
                    lucide.createIcons();
                } catch (e) {
                    console.warn('Lucide icons failed to reinitialize:', e);
                }
            }
        }
    });
});

    // Floating blocks animation delays
    const floatingBlocks = document.querySelectorAll('.floating-block');
    floatingBlocks.forEach((block, index) => {
        const delay = index * 200;
        block.style.animationDelay = `${delay}ms`;
    });

    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.step-card, .pricing-card, .card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.backdropFilter = 'blur(12px)';
        }
    });

    // Pricing cards hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'rgba(156, 163, 175, 0.2)';
            }
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.cta-button, .plan-button, .form-submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Age-specific theme application
    const ageInput = document.getElementById('childAge');
    if (ageInput) {
        ageInput.addEventListener('change', function() {
            const age = parseInt(this.value);
            if (age) {
                const body = document.body;
                body.classList.remove('toddler-theme', 'preschool-theme', 'elementary-theme', 'middle-theme', 'teen-theme');
                if (age >= 1 && age <= 3) {
                    body.classList.add('toddler-theme');
                } else if (age >= 4 && age <= 5) {
                    body.classList.add('preschool-theme');
                } else if (age >= 6 && age <= 10) {
                    body.classList.add('elementary-theme');
                } else if (age >= 11 && age <= 13) {
                    body.classList.add('middle-theme');
                } else if (age >= 14 && age <= 16) {
                    body.classList.add('teen-theme');
                }
            }
        });
    }

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.faq-question')) {
            e.preventDefault();
            e.target.closest('.faq-question').click();
        } else if ((e.key === 'Enter' || e.key === ' ') && e.target === mobileMenuBtn) {
            e.preventDefault();
            mobileMenuBtn.click();
        } else if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            try {
                lucide.createIcons();
            } catch (e) {
                console.warn('Lucide icons failed to reinitialize:', e);
            }
        }
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
});

// Toast notification function
function showToast() {
    const toast = document.getElementById('successToast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
        toast.addEventListener('click', function() {
            this.classList.remove('show');
        });
    }
}

// Utility function for smooth scroll
function scrollToElement(elementId, offset = 100) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Error handling for form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const errorToast = document.createElement('div');
    errorToast.className = 'toast error';
    errorToast.innerHTML = `
        <div class="toast-content">
            <i data-lucide="alert-circle" class="toast-icon"></i>
            <div class="toast-text">
                <h4>Error</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
    errorToast.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
    document.body.appendChild(errorToast);
    try {
        lucide.createIcons();
    } catch (e) {
        console.warn('Lucide icons failed to load for error toast:', e);
    }
    setTimeout(() => errorToast.classList.add('show'), 100);
    setTimeout(() => {
        errorToast.classList.remove('show');
        setTimeout(() => errorToast.remove(), 300);
    }, 4000);
}
