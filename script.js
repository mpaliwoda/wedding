// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-en], [data-pl]');
    const htmlElement = document.documentElement;

    // Get saved language or default to English
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Function to switch language
    function switchLanguage(lang) {
        currentLang = lang;
        htmlElement.setAttribute('lang', lang);

        // Update all elements with language data attributes
        elementsWithLang.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // For title tag
                if (element.tagName === 'TITLE') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update active button
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Set initial language
    switchLanguage(currentLang);

    // Update language for dynamically loaded elements
    function updateLanguage() {
        const lang = currentLang;
        document.querySelectorAll('[data-en], [data-pl]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add scroll animation for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items for animation
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe detail cards for animation
    document.querySelectorAll('.detail-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.details-section');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Observe info cards for animation
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Countdown timer functionality
    function updateCountdown() {
        const weddingDate = new Date('2026-07-10T00:00:00');
        const now = new Date();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        } else {
            // Wedding day has arrived!
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Calendar functionality
    const calendarBtn = document.getElementById('addToCalendar');
    const calendarDropdown = document.getElementById('calendarDropdown');

    if (calendarBtn && calendarDropdown) {
        // Toggle dropdown
        calendarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            calendarDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!calendarBtn.contains(e.target) && !calendarDropdown.contains(e.target)) {
                calendarDropdown.classList.remove('show');
            }
        });

        // Handle calendar service clicks
        document.querySelectorAll('.calendar-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const service = this.getAttribute('data-service');

                // Event details
                const eventDetails = {
                    title: 'Irena & Marcin Wedding / Wesele Irena i Marcin',
                    description: 'Wedding ceremony and reception at Gospoda Nad Zimną Rzeczką',
                    location: 'Gospoda Nad Zimną Rzeczką, ul. Zimna Rzeczka 8, Kłokoczyn',
                    startDate: '20260710',
                    endDate: '20260711', // Next day for all-day event
                    startTime: '', // No time yet
                    endTime: ''
                };

                switch(service) {
                    case 'google':
                        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
                        window.open(googleUrl, '_blank');
                        break;

                    case 'outlook':
                        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&startdt=${eventDetails.startDate}&enddt=${eventDetails.endDate}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
                        window.open(outlookUrl, '_blank');
                        break;

                    case 'apple':
                    case 'ics':
                        // Generate .ics file
                        const icsContent = [
                            'BEGIN:VCALENDAR',
                            'VERSION:2.0',
                            'PRODID:-//Irena & Marcin Wedding//EN',
                            'BEGIN:VEVENT',
                            `DTSTART;VALUE=DATE:${eventDetails.startDate}`,
                            `DTEND;VALUE=DATE:${eventDetails.endDate}`,
                            `SUMMARY:${eventDetails.title}`,
                            `DESCRIPTION:${eventDetails.description}`,
                            `LOCATION:${eventDetails.location}`,
                            'STATUS:CONFIRMED',
                            'SEQUENCE:0',
                            'END:VEVENT',
                            'END:VCALENDAR'
                        ].join('\r\n');

                        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = 'irena-marcin-wedding.ics';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        break;
                }

                calendarDropdown.classList.remove('show');
            });
        });
    }
});
