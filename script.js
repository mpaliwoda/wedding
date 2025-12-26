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

    // NEON SNAKE - Fresh start!
    function initNeonSnake() {
        const canvas = document.createElement('canvas');
        canvas.id = 'snakeCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
            display: none;
        `;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Snake state
        const snake = {
            segments: [],
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: 5,
            frameCount: 0,
            totalSegments: 80,
            hue: 0
        };

        // Initialize segments with spacing
        for (let i = 0; i < snake.totalSegments; i++) {
            snake.segments.push({ x: snake.x, y: snake.y });
        }

        function updateSnake() {
            if (!document.body.classList.contains('party-mode')) {
                canvas.style.display = 'none';
                requestAnimationFrame(updateSnake);
                return;
            }

            canvas.style.display = 'block';
            snake.frameCount++;

            // Make sharper turns occasionally
            if (snake.frameCount % 60 === 0) {
                snake.angle += (Math.random() - 0.5) * Math.PI * 0.5;
            } else {
                snake.angle += (Math.random() - 0.5) * 0.08;
            }

            // Move head
            snake.x += Math.cos(snake.angle) * snake.speed;
            snake.y += Math.sin(snake.angle) * snake.speed;

            // Wrap around screen
            const margin = 50;
            if (snake.x < -margin) snake.x = canvas.width + margin;
            if (snake.x > canvas.width + margin) snake.x = -margin;
            if (snake.y < -margin) snake.y = canvas.height + margin;
            if (snake.y > canvas.height + margin) snake.y = -margin;

            // Update segments only every few frames for visible spacing
            if (snake.frameCount % 2 === 0) {
                snake.segments.unshift({ x: snake.x, y: snake.y });
                snake.segments.pop();
            }

            // Draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw segments with gaps
            for (let i = 0; i < snake.segments.length; i++) {
                if (i % 2 !== 0) continue; // Skip every other segment for gaps

                const segment = snake.segments[i];
                const progress = i / snake.segments.length;
                const size = (1 - progress) * 12 + 4;
                const hue = (snake.hue - i * 4) % 360;

                // Outer glow
                ctx.shadowBlur = 25;
                ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;

                // Main segment
                ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
                ctx.globalAlpha = 1 - progress * 0.2;

                ctx.beginPath();
                ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
                ctx.fill();

                // Inner bright core
                ctx.shadowBlur = 10;
                ctx.fillStyle = `hsl(${hue}, 100%, 90%)`;
                ctx.globalAlpha = 1 - progress * 0.4;
                ctx.beginPath();
                ctx.arc(segment.x, segment.y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }

            snake.hue = (snake.hue + 1.5) % 360;

            requestAnimationFrame(updateSnake);
        }

        updateSnake();
    }

    initNeonSnake();

    // OCCASIONAL FIREWORKS
    function createFirework() {
        if (!document.body.classList.contains('party-mode')) return;

        // Random launch position
        const launchX = Math.random() * window.innerWidth;
        const targetY = 100 + Math.random() * 300; // Explode in upper portion
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

        // Create launch particle
        const launcher = document.createElement('div');
        launcher.style.cssText = `
            position: fixed;
            left: ${launchX}px;
            bottom: 0;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(launcher);

        // Animate launch
        let currentY = window.innerHeight;
        const launchSpeed = 8;

        const launchInterval = setInterval(() => {
            currentY -= launchSpeed;
            launcher.style.bottom = (window.innerHeight - currentY) + 'px';

            // Explode when reaching target height
            if (currentY <= targetY) {
                clearInterval(launchInterval);
                launcher.remove();
                explode(launchX, currentY, color);
            }
        }, 16);
    }

    function explode(x, y, baseColor) {
        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = 3 + Math.random() * 4;
            const hue = (parseInt(baseColor.match(/\d+/)[0]) + (Math.random() - 0.5) * 60) % 360;
            const color = `hsl(${hue}, 100%, 60%)`;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 8px ${color};
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(particle);

            // Random direction and speed
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
            const speed = 3 + Math.random() * 5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            particles.push({
                element: particle,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                life: 1
            });
        }

        // Animate particles
        function animateParticles() {
            let allDead = true;

            particles.forEach(p => {
                if (p.life <= 0) return;

                allDead = false;

                // Update position
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15; // Gravity
                p.vx *= 0.98; // Air resistance
                p.life -= 0.015;

                // Update element
                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
                p.element.style.opacity = p.life;

                if (p.life <= 0) {
                    p.element.remove();
                }
            });

            if (!allDead) {
                requestAnimationFrame(animateParticles);
            }
        }

        animateParticles();
    }

    // Launch fireworks occasionally
    function scheduleFireworks() {
        if (!document.body.classList.contains('party-mode')) {
            setTimeout(scheduleFireworks, 1000);
            return;
        }

        createFirework();

        // Random delay between 2-6 seconds
        const delay = 2000 + Math.random() * 4000;
        setTimeout(scheduleFireworks, delay);
    }

    scheduleFireworks();
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
