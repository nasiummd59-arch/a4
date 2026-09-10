// ==========================================================================
// NOBLEBAGCREST - INTERACTIVE LUXURY ATELIER ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('noblebagcrest_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('noblebagcrest_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Atelier atmosphere set to ${newTheme === 'dark' ? 'Imperial Onyx' : 'Silk Alabaster'}`);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // 3. Interactive Atelier Capsule Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const capsuleCards = document.querySelectorAll('.capsule-card');
    if (filterBtns.length && capsuleCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-filter');

                capsuleCards.forEach(card => {
                    if (cat === 'all' || card.getAttribute('data-category') === cat) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // 4. Interactive Patina Aging Simulator
    const patinaSlider = document.getElementById('patinaSlider');
    const patinaAgeLabel = document.getElementById('patinaAgeLabel');
    const patinaImg = document.getElementById('patinaImg');
    const leatherOptBtns = document.querySelectorAll('.leather-opt-btn');

    if (patinaSlider && patinaAgeLabel && patinaImg) {
        patinaSlider.addEventListener('input', (e) => {
            const years = e.target.value;
            patinaAgeLabel.textContent = `${years} Year${years > 1 ? 's' : ''} of Patina`;
            
            // Adjust brightness, contrast, sepia for aging visual effect
            const sepiaVal = years * 8;
            const contrastVal = 100 + (years * 4);
            const brightnessVal = 100 - (years * 2.5);
            patinaImg.style.filter = `sepia(${sepiaVal}%) contrast(${contrastVal}%) brightness(${brightnessVal}%)`;
        });

        leatherOptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                leatherOptBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const leatherName = btn.textContent.trim();
                showToast(`Calibrated simulator for ${leatherName}`);
            });
        });
    }

    // 5. Bespoke Monogramming Live Preview
    const monogramInput = document.getElementById('monogramInput');
    const liveMonogramText = document.getElementById('liveMonogramText');
    const foilBtns = document.querySelectorAll('.foil-btn');

    if (monogramInput && liveMonogramText) {
        monogramInput.addEventListener('input', (e) => {
            const val = e.target.value.toUpperCase().slice(0, 4);
            e.target.value = val;
            liveMonogramText.textContent = val.length ? val : 'NBC';
        });

        foilBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                foilBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const foilType = btn.getAttribute('data-foil');

                if (foilType === 'gold') {
                    liveMonogramText.style.color = '#d4af37';
                    liveMonogramText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(255,255,255,0.2)';
                } else if (foilType === 'silver') {
                    liveMonogramText.style.color = '#e0e0e0';
                    liveMonogramText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(255,255,255,0.3)';
                } else if (foilType === 'blind') {
                    liveMonogramText.style.color = 'rgba(0,0,0,0.4)';
                    liveMonogramText.style.textShadow = 'inset 2px 2px 3px rgba(0,0,0,0.8), 1px 1px 1px rgba(255,255,255,0.1)';
                }
                showToast(`Embossing foil selected: ${btn.textContent.trim()}`);
            });
        });
    }

    // 6. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const a = i.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = null;
                });
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // 7. Salon Booking Form Submission
    const salonForm = document.getElementById('salonBookingForm');
    if (salonForm) {
        salonForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientName = document.getElementById('clientName')?.value || 'Valued Patron';
            showToast(`Thank you, ${clientName}. Your Private Concierge appointment has been submitted.`);
            salonForm.reset();
        });
    }

    // Toast Functionality
    function showToast(msg) {
        let toast = document.getElementById('luxuryToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'luxuryToast';
            toast.className = 'toast-notification';
            toast.innerHTML = '<i class="fas fa-crown text-gold"></i> <span id="toastMsg"></span>';
            document.body.appendChild(toast);
        }
        document.getElementById('toastMsg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});
