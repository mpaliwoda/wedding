// Language switching functionality
document.addEventListener("DOMContentLoaded", function() {
    // Party Mode Toggle
    const partyModeToggle = document.getElementById('partyModeToggle');
    const body = document.body;

    // Check if party mode was previously enabled
    const isPartyMode = localStorage.getItem('partyMode') === 'true';
    if (isPartyMode) {
        body.classList.add('party-mode');
    }

    // Toggle party mode on button click
    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            body.classList.toggle('party-mode');
            const isNowPartyMode = body.classList.contains('party-mode');
            localStorage.setItem('partyMode', isNowPartyMode);
        });
    }

    const langButtons = document.querySelectorAll(".lang-btn");
    const elementsWithLang = document.querySelectorAll("[data-en], [data-pl]");
    const htmlElement = document.documentElement;

    // Get saved language or default to Polish
    let currentLang = localStorage.getItem("preferredLanguage") || "pl";

    // Function to switch language
    function switchLanguage(lang) {
        currentLang = lang;
        htmlElement.setAttribute("lang", lang);

        // Update all elements with language data attributes
        elementsWithLang.forEach((element) => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // For title tag
                if (element.tagName === "TITLE") {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update active button
        langButtons.forEach((btn) => {
            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Save preference
        localStorage.setItem("preferredLanguage", lang);
    }

    // Add click event listeners to language buttons
    langButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const lang = this.getAttribute("data-lang");
            switchLanguage(lang);
        });
    });

    // Set initial language
    switchLanguage(currentLang);


    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Add scroll animation for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe timeline items for animation
    document.querySelectorAll(".timeline-item").forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(item);
    });

    // Observe detail cards for animation
    document.querySelectorAll(".detail-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", function() {
            const nextSection = document.querySelector(".details-section");
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    }

    // Observe info cards for animation
    document.querySelectorAll(".info-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

    // Countdown timer functionality - optimized with requestAnimationFrame
    const weddingDate = new Date("2026-07-10T00:00:00");
    let lastUpdate = 0;

    function updateCountdown(timestamp) {
        // Only update once per second to reduce reflows
        if (timestamp - lastUpdate < 1000) {
            requestAnimationFrame(updateCountdown);
            return;
        }
        lastUpdate = timestamp;

        const now = new Date();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");

            // Batch DOM updates
            if (daysEl.textContent !== String(days)) daysEl.textContent = days;
            if (hoursEl.textContent !== String(hours)) hoursEl.textContent = hours;
            if (minutesEl.textContent !== String(minutes)) minutesEl.textContent = minutes;
            if (secondsEl.textContent !== String(seconds)) secondsEl.textContent = seconds;

            requestAnimationFrame(updateCountdown);
        } else {
            // Wedding day has arrived!
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
        }
    }

    // Start countdown with requestAnimationFrame
    requestAnimationFrame(updateCountdown);

    // Calendar functionality
    const calendarBtn = document.getElementById("addToCalendar");
    const calendarDropdown = document.getElementById("calendarDropdown");

    if (calendarBtn && calendarDropdown) {
        // Toggle dropdown
        calendarBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            calendarDropdown.classList.toggle("show");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function(e) {
            if (
                !calendarBtn.contains(e.target) &&
                !calendarDropdown.contains(e.target)
            ) {
                calendarDropdown.classList.remove("show");
            }
        });

        // Handle calendar service clicks
        document.querySelectorAll(".calendar-option").forEach((option) => {
            option.addEventListener("click", function(e) {
                e.preventDefault();
                const service = this.getAttribute("data-service");

                // Event details
                const eventDetails = {
                    title: "Irena & Marcin Wedding / Wesele Irena i Marcin",
                    description:
                        "Wedding ceremony and reception at Gospoda Nad Zimną Rzeczką",
                    location: "Gospoda Nad Zimną Rzeczką, ul. Zimna Rzeczka 8, Kłokoczyn",
                    startDate: "20260710",
                    endDate: "20260711", // Next day for all-day event
                    startTime: "", // No time yet
                    endTime: "",
                };

                switch (service) {
                    case "google":
                        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
                        window.open(googleUrl, "_blank");
                        break;

                    case "outlook":
                        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&startdt=${eventDetails.startDate}&enddt=${eventDetails.endDate}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
                        window.open(outlookUrl, "_blank");
                        break;

                    case "apple":
                    case "ics":
                        // Generate .ics file
                        const icsContent = [
                            "BEGIN:VCALENDAR",
                            "VERSION:2.0",
                            "PRODID:-//Irena & Marcin Wedding//EN",
                            "BEGIN:VEVENT",
                            `DTSTART;VALUE=DATE:${eventDetails.startDate}`,
                            `DTEND;VALUE=DATE:${eventDetails.endDate}`,
                            `SUMMARY:${eventDetails.title}`,
                            `DESCRIPTION:${eventDetails.description}`,
                            `LOCATION:${eventDetails.location}`,
                            "STATUS:CONFIRMED",
                            "SEQUENCE:0",
                            "END:VEVENT",
                            "END:VCALENDAR",
                        ].join("\r\n");

                        const blob = new Blob([icsContent], {
                            type: "text/calendar;charset=utf-8",
                        });
                        const link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = "irena-marcin-wedding.ics";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        break;
                }

                calendarDropdown.classList.remove("show");
            });
        });
    }

    // Party Mode Visual Effects
    initPartyModeEffects();
});

function initPartyModeEffects() {
    const cursorCanvas = document.getElementById('cursorTrail');
    const confettiContainer = document.getElementById('confetti');
    const sparklesContainer = document.getElementById('sparkles');

    if (!cursorCanvas || !confettiContainer || !sparklesContainer) return;

    const ctx = cursorCanvas.getContext('2d');
    const trails = [];
    const colors = ['#ff1493', '#00ffff', '#39ff14', '#ffff00', '#ff6600', '#9d00ff'];

    // Resize canvas
    function resizeCanvas() {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cursor Trail - optimized with passive listener
    document.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('party-mode')) return;

        trails.push({
            x: e.clientX,
            y: e.clientY,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 15 + 10,
            life: 1
        });
    }, { passive: true });

    function animateTrails() {
        if (!document.body.classList.contains('party-mode')) {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            requestAnimationFrame(animateTrails);
            return;
        }

        // Clear canvas completely each frame
        ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        for (let i = trails.length - 1; i >= 0; i--) {
            const trail = trails[i];
            ctx.globalAlpha = trail.life;
            ctx.fillStyle = trail.color;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
            ctx.fill();

            trail.life -= 0.03;
            trail.size *= 0.95;

            if (trail.life <= 0) {
                trails.splice(i, 1);
            }
        }

        requestAnimationFrame(animateTrails);
    }
    animateTrails();

    // Confetti - optimized to only run when party mode is active
    let confettiInterval = null;

    function createConfetti() {
        if (!document.body.classList.contains('party-mode')) return;

        for (let i = 0; i < 3; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Start/stop confetti based on party mode
    const partyModeToggle = document.getElementById('partyModeToggle');
    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (document.body.classList.contains('party-mode')) {
                    if (!confettiInterval) {
                        confettiInterval = setInterval(createConfetti, 300);
                    }
                } else {
                    if (confettiInterval) {
                        clearInterval(confettiInterval);
                        confettiInterval = null;
                    }
                }
            }, 0);
        });
    }

    // Start if already in party mode
    if (document.body.classList.contains('party-mode')) {
        confettiInterval = setInterval(createConfetti, 300);
    }

    // Sparkles on click
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('party-mode')) return;

        const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖', '💕', '🎉', '🎊'];

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.left = e.clientX + (Math.random() * 60 - 30) + 'px';
                sparkle.style.top = e.clientY + (Math.random() * 60 - 30) + 'px';
                sparklesContainer.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 2000);
            }, i * 50);
        }
    });

    // Random sparkles
    function createRandomSparkle() {
        if (!document.body.classList.contains('party-mode')) return;

        const sparkleEmojis = ['✨', '💫', '⭐'];
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparklesContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }

    setInterval(createRandomSparkle, 1000);

    // EXTRA PHOTO MADNESS IN PARTY MODE
    function initPhotoMadness() {
        if (!document.body.classList.contains('party-mode')) return;

        // Photo click explosion
        document.addEventListener('click', (e) => {
            if (!document.body.classList.contains('party-mode')) return;

            const target = e.target;
            if (target.tagName === 'IMG' && target.closest('.masonry-item, .photo-gallery')) {
                createPhotoExplosion(e.clientX, e.clientY);
            }
        });

        // Floating photo emojis (less frequent)
        setInterval(() => {
            if (!document.body.classList.contains('party-mode')) return;

            const photoEmojis = ['📸', '🎨', '🌈', '💫'];
            const emoji = document.createElement('div');
            emoji.className = 'sparkle';
            emoji.textContent = photoEmojis[Math.floor(Math.random() * photoEmojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = Math.random() * 100 + '%';
            emoji.style.fontSize = (Math.random() * 15 + 25) + 'px';
            sparklesContainer.appendChild(emoji);

            setTimeout(() => emoji.remove(), 2000);
        }, 3000);
    }

    function createPhotoExplosion(x, y) {
        const explosionEmojis = ['✨', '🌟', '💫', '💖', '🎉'];

        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'sparkle';
                emoji.textContent = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];

                const angle = (Math.PI * 2 * i) / 12;
                const distance = Math.random() * 100 + 40;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;

                emoji.style.left = (x + offsetX) + 'px';
                emoji.style.top = (y + offsetY) + 'px';
                emoji.style.fontSize = (Math.random() * 12 + 20) + 'px';
                sparklesContainer.appendChild(emoji);

                setTimeout(() => emoji.remove(), 1500);
            }, i * 50);
        }
    }

    // Initialize photo madness
    initPhotoMadness();

    // Re-initialize when party mode toggles
    const partyToggle = document.getElementById('partyModeToggle');
    if (partyToggle) {
        partyToggle.addEventListener('click', () => {
            setTimeout(initPhotoMadness, 100);
        });
    }

    // NEON SNAKE THAT ZOOMS AROUND
    function initNeonSnake() {
        const snake = document.createElement('div');
        snake.id = 'neonSnake';
        snake.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 50;
            filter: blur(2px);
            display: none;
        `;
        document.body.appendChild(snake);

        const trail = [];
        const trailLength = 100; // MEGA LONG SNAKE!
        let x = 400;
        let y = 400;
        let direction = Math.random() * Math.PI * 2; // Random initial direction
        const speed = 6; // Constant speed
        let colorHue = 0;
        let turnTimer = 0;
        let nextTurn = 60 + Math.random() * 60; // Turn every 60-120 frames

        // Create trail segments
        for (let i = 0; i < trailLength; i++) {
            const segment = document.createElement('div');
            segment.className = 'snake-segment';
            const size = Math.max(3, 30 - i * 0.27); // Gradual taper from 30px to 3px
            segment.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                pointer-events: none;
                z-index: ${50 - Math.floor(i / 3)};
                filter: blur(${1 + i * 0.05}px);
                display: none;
            `;
            document.body.appendChild(segment);
            trail.push({ element: segment, x: x, y: y });
        }

        function animateSnake() {
            if (!document.body.classList.contains('party-mode')) {
                snake.style.display = 'none';
                trail.forEach(seg => seg.element.style.display = 'none');
                requestAnimationFrame(animateSnake);
                return;
            }

            snake.style.display = 'block';
            trail.forEach(seg => seg.element.style.display = 'block');

            // Get current window dimensions
            const maxX = window.innerWidth;
            const maxY = window.innerHeight;
            const margin = 100;

            // Sharp turns for snake-like movement
            turnTimer++;
            if (turnTimer >= nextTurn) {
                // Make a sharp turn (30-90 degrees)
                const turnAmount = (Math.random() - 0.5) * Math.PI * 0.8;
                direction += turnAmount;
                turnTimer = 0;
                nextTurn = 40 + Math.random() * 80;
            }

            // Move in current direction at constant speed
            const dx = Math.cos(direction) * speed;
            const dy = Math.sin(direction) * speed;
            x += dx;
            y += dy;

            // Bounce off walls by reversing direction
            let bounced = false;
            if (x < margin || x > maxX - margin) {
                direction = Math.PI - direction; // Reflect horizontally
                x = Math.max(margin, Math.min(maxX - margin, x));
                bounced = true;
            }
            if (y < margin || y > maxY - margin) {
                direction = -direction; // Reflect vertically
                y = Math.max(margin, Math.min(maxY - margin, y));
                bounced = true;
            }

            // If bounced, add small random variation
            if (bounced) {
                direction += (Math.random() - 0.5) * 0.5;
                turnTimer = 0;
                nextTurn = 30 + Math.random() * 40; // Turn sooner after bounce
            }

            // Update color
            colorHue = (colorHue + 2) % 360;
            const color = `hsl(${colorHue}, 100%, 50%)`;

            snake.style.left = x + 'px';
            snake.style.top = y + 'px';
            snake.style.background = color;
            snake.style.boxShadow = `
                0 0 20px ${color},
                0 0 40px ${color},
                0 0 60px ${color}
            `;

            // Update trail - shift positions back
            for (let i = trail.length - 1; i > 0; i--) {
                trail[i].x = trail[i - 1].x;
                trail[i].y = trail[i - 1].y;
            }
            trail[0].x = x;
            trail[0].y = y;

            // Render trail
            trail.forEach((seg, i) => {
                const trailColor = `hsl(${(colorHue - i * 10) % 360}, 100%, 50%)`;
                seg.element.style.left = seg.x + 'px';
                seg.element.style.top = seg.y + 'px';
                seg.element.style.background = trailColor;
                seg.element.style.boxShadow = `
                    0 0 ${20 - i}px ${trailColor},
                    0 0 ${40 - i * 2}px ${trailColor}
                `;
                seg.element.style.opacity = (trailLength - i) / trailLength * 0.8;
            });

            requestAnimationFrame(animateSnake);
        }

        animateSnake();
    }

    initNeonSnake();
}

// Add CSS animation for photo explosion shake
const style = document.createElement('style');
style.textContent = `
    @keyframes photoExplosionShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-10px, -10px) rotate(-5deg); }
        20% { transform: translate(10px, 10px) rotate(5deg); }
        30% { transform: translate(-10px, 10px) rotate(-5deg); }
        40% { transform: translate(10px, -10px) rotate(5deg); }
        50% { transform: translate(-5px, -5px) rotate(-2deg); }
        60% { transform: translate(5px, 5px) rotate(2deg); }
        70% { transform: translate(-5px, 5px) rotate(-2deg); }
        80% { transform: translate(5px, -5px) rotate(2deg); }
        90% { transform: translate(-2px, -2px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);
