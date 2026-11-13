// =========================================
// NUMBER COUNTER ANIMATION
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Speed of counting (kam number = tez speed)

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, ''); // Commas hata kar number banana

            // Har step main kitna number add karna hai
            const inc = target / speed;

            // Agar current count target se kam hai, toh increase karo
            if (count < target) {
                let nextValue = Math.ceil(count + inc);
                
                // Numbers ko comma form me dikhane ke liye (jaise 27,000)
                counter.innerText = nextValue.toLocaleString();
                
                // Har 15 millisecond baad function wapis call hoga
                setTimeout(updateCount, 15);
            } else {
                // Aakhir main exact target set kar do
                counter.innerText = target.toLocaleString();
            }
        };

        updateCount();
    });
});

// =========================================
// PRICING SCREEN TOGGLE LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedScreens = btn.getAttribute('data-screens');

            // Update each card's price and details
            pricingCards.forEach(card => {
                const priceEl = card.querySelector('.price-val');
                const saveTag = card.querySelector('.savings-tag');
                const saveValEl = card.querySelector('.save-val');
                const screenTextEl = card.querySelector('.screen-count-text');
                
                // Get the data attributes for prices and savings
                const basePrice = priceEl.getAttribute('data-base');
                const priceS2 = priceEl.getAttribute('data-s2');
                const priceS3 = priceEl.getAttribute('data-s3');
                
                const saveS2 = saveValEl.getAttribute('data-s2');
                const saveS3 = saveValEl.getAttribute('data-s3');

                // Logic based on selected screens
                if (selectedScreens === '1') {
                    priceEl.textContent = basePrice;
                    screenTextEl.textContent = "1 screen";
                    saveTag.style.display = "none";
                } 
                else if (selectedScreens === '2') {
                    priceEl.textContent = priceS2;
                    screenTextEl.textContent = "2 screens";
                    saveValEl.textContent = saveS2;
                    saveTag.style.display = "block";
                } 
                else if (selectedScreens === '3') {
                    priceEl.textContent = priceS3;
                    screenTextEl.textContent = "3 screens";
                    saveValEl.textContent = saveS3;
                    saveTag.style.display = "block";
                }
            });
        });
    });
});


/// =========================================
// TRIGGER ANIMATION ON SCROLL (Repeats on Scroll Up/Down)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15 // 15% element screen par aane par
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jab element screen par aaye, .show class add kar do (Animate ho jaye)
                entry.target.classList.add('show');
            } else {
                // Jab element screen se wapis upar/neechay nikal jaye, .show class hata do 
                // Taake jab aap dobara wahan aayein to animation phir se chale!
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});


// =========================================
// FAQ ACCORDION TOGGLE
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');

            // Optional: Close all other open accordion items (Uncomment agar sabhi ko aik waqt me aik khulwana ho)
            /*
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-icon').textContent = '+';
            });
            */

            // Toggle active state on clicked item
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-icon').textContent = '×';
            } else {
                item.classList.remove('active');
                item.querySelector('.faq-icon').textContent = '+';
            }
        });
    });
});


// =========================================
// MOBILE HAMBURGER MENU TOGGLE
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.main-nav');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            const icon = hamburger.querySelector('i');
            if(navMenu.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    menu.classList.toggle('show');
}

function changeLanguage(lang) {
    alert("Language switched to: " + lang.toUpperCase());
    document.getElementById('langMenu').classList.remove('show');
    // Yahan aap apni translation API ya text mapping laga sakte hain
}

// Bahir click karne par menu band ho jaye
window.addEventListener('click', function(e) {
    if (!e.target.closest('.bottom-left-toggle')) {
        const menu = document.getElementById('langMenu');
        if(menu) menu.classList.remove('show');
    }
});

// =========================================
// MOBILE HAMBURGER MENU DRAWER LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');

    // Menu open hone par screen dim karne ke liye dynamic backdrop
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    if (hamburgerBtn && mainNav) {
        function toggleMenu() {
            const isOpen = mainNav.classList.toggle('active');
            backdrop.classList.toggle('active', isOpen);
            
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark'); // Bars icon cross ('X') ban jayega
                    document.body.style.overflow = 'hidden'; // Page scroll pause ho jayega
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        }

        function closeMenu() {
            mainNav.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }

        // Hamburger button click toggle
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Outside backdrop click par menu band ho jayega
        backdrop.addEventListener('click', closeMenu);

        // Link click hote hi drawer auto-close ho jayega
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.article-faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.article-faq-question');
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
});