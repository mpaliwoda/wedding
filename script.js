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
    const startDate = new Date(); // When countdown started (for progress calculation)
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

            // Update progress bars (in party mode)
            updateCountdownProgress(days, hours, minutes, seconds);

            requestAnimationFrame(updateCountdown);
        } else {
            // Wedding day has arrived!
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            updateCountdownProgress(0, 0, 0, 0);
        }
    }

    function updateCountdownProgress(days, hours, minutes, seconds) {
        // Calculate total days from start to wedding
        const totalDays = Math.floor((weddingDate - startDate) / (1000 * 60 * 60 * 24));
        const elapsedDays = totalDays - days;
        
        // Calculate progress percentages (inverted to show "filling up" as we get closer)
        const daysProgress = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 100;
        const hoursProgress = ((23 - hours) / 24) * 100; // Inverted: fewer hours = more progress
        const minutesProgress = ((59 - minutes) / 60) * 100; // Inverted
        const secondsProgress = ((59 - seconds) / 60) * 100; // Inverted

        // Update progress bar widths
        const daysProgressEl = document.getElementById("daysProgress");
        const hoursProgressEl = document.getElementById("hoursProgress");
        const minutesProgressEl = document.getElementById("minutesProgress");
        const secondsProgressEl = document.getElementById("secondsProgress");

        if (daysProgressEl) daysProgressEl.style.width = daysProgress + '%';
        if (hoursProgressEl) hoursProgressEl.style.width = hoursProgress + '%';
        if (minutesProgressEl) minutesProgressEl.style.width = minutesProgress + '%';
        if (secondsProgressEl) secondsProgressEl.style.width = secondsProgress + '%';
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

    // COMIC BOOK STYLE EFFECTS
    function createComicEffect(x, y, element) {
        if (!document.body.classList.contains('party-mode')) return;

        // Different words for different elements
        let words;
        if (element.matches('button, .calendar-btn, .contact-link, .map-link, .view-btn, .lang-btn')) {
            words = ['CLICK!', 'POW!', 'ZAP!', 'BOOM!'];
        } else if (element.matches('.detail-card, .info-card')) {
            words = ['WOW!', 'COOL!', 'YEAH!', 'RAD!'];
        } else if (element.matches('img, .masonry-item')) {
            words = ['SNAP!', 'FLASH!', 'SMILE!', 'CHEESE!'];
        } else {
            words = ['BAM!', 'WHAM!', 'KAPOW!', 'ZOOM!'];
        }

        const word = words[Math.floor(Math.random() * words.length)];
        const comic = document.createElement('div');
        comic.className = 'comic-effect';
        comic.textContent = word;
        
        // Random rotation and offset
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        const rotation = (Math.random() - 0.5) * 30;
        
        comic.style.left = (x + offsetX) + 'px';
        comic.style.top = (y + offsetY) + 'px';
        comic.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        
        document.body.appendChild(comic);
        
        // Trigger animation
        setTimeout(() => {
            comic.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            comic.style.opacity = '0';
            setTimeout(() => comic.remove(), 300);
        }, 600);
    }

    // Add comic effect listeners to common clickable elements
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('party-mode')) return;
        
        const target = e.target.closest('button, a, .detail-card, .info-card, .masonry-item, img');
        if (target) {
            createComicEffect(e.clientX, e.clientY, target);
        }
    });

    // FLOATING PHOTO BUBBLES
    const photoBubblesContainer = document.getElementById('photoBubbles');
    let bubbleInterval = null;
    const activeBubbles = [];
    const maxBubbles = 6;

    function createFloatingBubble() {
        if (!document.body.classList.contains('party-mode')) return;
        if (activeBubbles.length >= maxBubbles) return;

        // Sample photos from gallery (we'll use photo paths)
        const samplePhotos = [
            'assets/photos/krakówpolska.jpeg',
            'assets/photos/seattleunitedstates.jpeg',
            'assets/photos/vancouvercanada.jpeg',
            'assets/photos/zermattschweizsuissesvizzerasvizra.jpeg',
            'assets/photos/málagaespaña_1.jpeg',
            'assets/photos/sevillaespaña.jpeg',
            'assets/photos/courmayeuritalia.jpeg',
            'assets/photos/manarolaitalia.jpeg'
        ];

        const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
        
        const bubble = document.createElement('div');
        bubble.className = 'photo-bubble';
        
        const img = document.createElement('img');
        img.src = randomPhoto;
        img.alt = 'Photo bubble';
        bubble.appendChild(img);

        // Random starting position (edges of screen)
        const startSide = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let startX, startY;
        
        switch(startSide) {
            case 0: // top
                startX = Math.random() * window.innerWidth;
                startY = -100;
                break;
            case 1: // right
                startX = window.innerWidth + 100;
                startY = Math.random() * window.innerHeight;
                break;
            case 2: // bottom
                startX = Math.random() * window.innerWidth;
                startY = window.innerHeight + 100;
                break;
            case 3: // left
                startX = -100;
                startY = Math.random() * window.innerHeight;
                break;
        }

        bubble.style.left = startX + 'px';
        bubble.style.top = startY + 'px';

        // Random velocity
        const velocityX = (Math.random() - 0.5) * 3;
        const velocityY = (Math.random() - 0.5) * 3;
        const rotationSpeed = (Math.random() - 0.5) * 2;

        const bubbleData = {
            element: bubble,
            x: startX,
            y: startY,
            vx: velocityX,
            vy: velocityY,
            rotation: 0,
            rotationSpeed: rotationSpeed,
            size: 80 + Math.random() * 40 // 80-120px
        };

        bubble.style.width = bubbleData.size + 'px';
        bubble.style.height = bubbleData.size + 'px';

        // Click to remove with comic effect
        bubble.addEventListener('click', (e) => {
            createComicEffect(e.clientX, e.clientY, bubble);
            const index = activeBubbles.indexOf(bubbleData);
            if (index > -1) {
                activeBubbles.splice(index, 1);
            }
            bubble.style.transform = 'scale(0) rotate(360deg)';
            setTimeout(() => bubble.remove(), 300);
        });

        photoBubblesContainer.appendChild(bubble);
        activeBubbles.push(bubbleData);
    }

    function animateBubbles() {
        if (!document.body.classList.contains('party-mode')) {
            requestAnimationFrame(animateBubbles);
            return;
        }

        activeBubbles.forEach((bubble, index) => {
            // Update position
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            bubble.rotation += bubble.rotationSpeed;

            // Bounce off edges
            const margin = bubble.size / 2;
            if (bubble.x < -margin || bubble.x > window.innerWidth + margin ||
                bubble.y < -margin || bubble.y > window.innerHeight + margin) {
                // Remove bubbles that go too far off screen
                bubble.element.style.opacity = '0';
                setTimeout(() => {
                    bubble.element.remove();
                    activeBubbles.splice(index, 1);
                }, 500);
                return;
            }

            // Apply transform
            bubble.element.style.left = bubble.x + 'px';
            bubble.element.style.top = bubble.y + 'px';
            bubble.element.style.transform = `translate(-50%, -50%) rotate(${bubble.rotation}deg)`;
        });

        requestAnimationFrame(animateBubbles);
    }

    // Start bubble animation loop
    animateBubbles();

    // Spawn bubbles every 8 seconds in party mode
    function startBubbleSpawning() {
        if (bubbleInterval) return;
        
        bubbleInterval = setInterval(() => {
            if (document.body.classList.contains('party-mode')) {
                createFloatingBubble();
            }
        }, 8000); // Every 8 seconds
    }

    function stopBubbleSpawning() {
        if (bubbleInterval) {
            clearInterval(bubbleInterval);
            bubbleInterval = null;
        }
        // Clear all bubbles
        activeBubbles.forEach(bubble => {
            bubble.element.remove();
        });
        activeBubbles.length = 0;
    }

    // Start/stop bubbles with party mode
    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (document.body.classList.contains('party-mode')) {
                    startBubbleSpawning();
                    // Spawn first bubble immediately
                    createFloatingBubble();
                } else {
                    stopBubbleSpawning();
                }
            }, 0);
        });
    }

    // Start if already in party mode
    if (document.body.classList.contains('party-mode')) {
        startBubbleSpawning();
        createFloatingBubble();
    }

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
