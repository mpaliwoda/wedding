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
    const startDate = new Date("2024-11-17T00:00:00"); // Fixed start date for progress calculation
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
            updateCountdownProgress();

            requestAnimationFrame(updateCountdown);
        } else {
            // Wedding day has arrived!
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            updateCountdownProgress();
        }
    }

    function updateCountdownProgress() {
        const now = new Date();
        
        // Calculate total time from start to wedding (in milliseconds)
        const totalTime = weddingDate - startDate;
        const elapsedTime = now - startDate;
        
        // Calculate overall progress percentage (0-100%)
        let overallProgress = (elapsedTime / totalTime) * 100;
        
        // Clamp between 0 and 100
        overallProgress = Math.max(0, Math.min(100, overallProgress));

        // Update single progress bar
        const progressEl = document.getElementById("countdownProgress");
        if (progressEl) progressEl.style.width = overallProgress + '%';
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

    const ctx = cursorCanvas.getContext('2d', { alpha: true, willReadFrequently: false });
    const trails = [];
    const colors = ['#ff1493', '#00ffff', '#39ff14', '#ffff00', '#ff6600', '#9d00ff'];
    const maxTrails = 50; // Limit max trail particles
    
    // Detect mobile/low-end devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile || navigator.hardwareConcurrency <= 4;

    // Resize canvas
    function resizeCanvas() {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Throttle cursor trail creation
    let lastTrailTime = 0;
    const trailThrottle = isLowEnd ? 50 : 16; // 20fps on low-end, 60fps on high-end

    // Cursor Trail - optimized with throttling
    document.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('party-mode')) return;

        const now = Date.now();
        if (now - lastTrailTime < trailThrottle) return;
        lastTrailTime = now;

        // Limit max trails for performance
        if (trails.length >= maxTrails) {
            trails.shift(); // Remove oldest trail
        }

        trails.push({
            x: e.clientX,
            y: e.clientY,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * (isLowEnd ? 12 : 15) + (isLowEnd ? 8 : 10),
            life: 1
        });
    }, { passive: true });

    // Optimized trail animation with batching
    let animationFrameId = null;
    function animateTrails() {
        if (!document.body.classList.contains('party-mode')) {
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            animationFrameId = requestAnimationFrame(animateTrails);
            return;
        }

        // Clear canvas completely each frame
        ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        // Batch draw operations for better performance
        for (let i = trails.length - 1; i >= 0; i--) {
            const trail = trails[i];
            
            // Update trail properties
            trail.life -= isLowEnd ? 0.04 : 0.03; // Faster decay on low-end
            trail.size *= 0.95;

            if (trail.life <= 0) {
                trails.splice(i, 1);
                continue;
            }

            // Draw trail
            ctx.globalAlpha = trail.life;
            ctx.fillStyle = trail.color;
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(animateTrails);
    }
    animateTrails();

    // Confetti - optimized frequency and reduced count
    let confettiInterval = null;
    const confettiCount = isLowEnd ? 2 : 3; // Fewer on low-end devices
    const confettiFrequency = isLowEnd ? 500 : 300; // Less frequent on low-end

    function createConfetti() {
        if (!document.body.classList.contains('party-mode')) return;

        // Use DocumentFragment for better DOM performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            confetti.style.willChange = 'transform'; // Hint for GPU acceleration
            fragment.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
        
        confettiContainer.appendChild(fragment);
    }

    // Start/stop confetti based on party mode
    const partyModeToggle = document.getElementById('partyModeToggle');
    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (document.body.classList.contains('party-mode')) {
                    if (!confettiInterval) {
                        confettiInterval = setInterval(createConfetti, confettiFrequency);
                    }
                } else {
                    if (confettiInterval) {
                        clearInterval(confettiInterval);
                        confettiInterval = null;
                    }
                    // Clean up trails when exiting party mode
                    trails.length = 0;
                }
            }, 0);
        });
    }

    // Start if already in party mode
    if (document.body.classList.contains('party-mode')) {
        confettiInterval = setInterval(createConfetti, confettiFrequency);
    }

    // Optimized sparkles on click - throttled
    let lastClickTime = 0;
    const clickThrottle = 300; // Limit to one sparkle burst per 300ms
    const sparkleCount = isLowEnd ? 3 : 5;

    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('party-mode')) return;

        const now = Date.now();
        if (now - lastClickTime < clickThrottle) return;
        lastClickTime = now;

        const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖', '💕', '🎉', '🎊'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            sparkle.style.left = e.clientX + (Math.random() * 60 - 30) + 'px';
            sparkle.style.top = e.clientY + (Math.random() * 60 - 30) + 'px';
            sparkle.style.willChange = 'transform, opacity';
            fragment.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 2000);
        }
        
        sparklesContainer.appendChild(fragment);
    }, { passive: true });

    // Random sparkles - less frequent on low-end
    const randomSparkleInterval = isLowEnd ? 2000 : 1000;
    
    function createRandomSparkle() {
        if (!document.body.classList.contains('party-mode')) return;

        const sparkleEmojis = ['✨', '💫', '⭐'];
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.willChange = 'transform, opacity';
        sparklesContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }

    setInterval(createRandomSparkle, randomSparkleInterval);

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

    // FLOATING PHOTO BUBBLES - optimized
    const photoBubblesContainer = document.getElementById('photoBubbles');
    let bubbleInterval = null;
    const activeBubbles = [];
    const maxBubbles = isLowEnd ? 3 : 6; // Fewer bubbles on low-end devices

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

        // Random starting position (edges of screen) - use actual visible viewport
        // Use visualViewport for most accurate dimensions (accounts for all browser UI)
        const viewportWidth = (window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth);
        const viewportHeight = (window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight);
        
        // Inset from edges to avoid spawning in sidebars/hidden areas
        const insetMargin = 50; // Start 50px inside the viewport edge
        
        const startSide = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let startX, startY;
        
        switch(startSide) {
            case 0: // top - spawn just inside top edge
                startX = insetMargin + Math.random() * (viewportWidth - insetMargin * 2);
                startY = -50; // Less far off-screen
                break;
            case 1: // right - spawn just inside right edge
                startX = viewportWidth - insetMargin;
                startY = insetMargin + Math.random() * (viewportHeight - insetMargin * 2);
                break;
            case 2: // bottom - spawn just inside bottom edge
                startX = insetMargin + Math.random() * (viewportWidth - insetMargin * 2);
                startY = viewportHeight - insetMargin;
                break;
            case 3: // left - spawn just inside left edge
                startX = insetMargin;
                startY = insetMargin + Math.random() * (viewportHeight - insetMargin * 2);
                break;
        }

        // Velocity should move bubble toward center of viewport
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const speed = 0.5 + Math.random() * 1.5; // 0.5 to 2.0 pixels per frame
        
        // Calculate direction toward center (with some randomness)
        let velocityX, velocityY;
        switch(startSide) {
            case 0: // top - move down (and slightly left/right)
                velocityX = (Math.random() - 0.5) * 2;
                velocityY = speed + Math.random();
                break;
            case 1: // right - move left (and slightly up/down)
                velocityX = -(speed + Math.random());
                velocityY = (Math.random() - 0.5) * 2;
                break;
            case 2: // bottom - move up (and slightly left/right)
                velocityX = (Math.random() - 0.5) * 2;
                velocityY = -(speed + Math.random());
                break;
            case 3: // left - move right (and slightly up/down)
                velocityX = speed + Math.random();
                velocityY = (Math.random() - 0.5) * 2;
                break;
        }
        
        const rotationSpeed = (Math.random() - 0.5) * 2;
        const size = 80 + Math.random() * 40; // 80-120px

        const bubbleData = {
            element: bubble,
            x: startX,
            y: startY,
            vx: velocityX,
            vy: velocityY,
            rotation: 0,
            rotationSpeed: rotationSpeed,
            size: size
        };

        // Set initial position and size
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = '0';
        bubble.style.top = '0';
        bubble.style.transform = `translate(${startX - size/2}px, ${startY - size/2}px) rotate(0deg)`;
        bubble.style.willChange = 'transform'; // Hint for GPU acceleration
        bubble.style.display = 'block'; // Force display
        bubble.style.opacity = '1'; // Force visible
        bubble.style.visibility = 'visible'; // Force visible
        bubble.style.zIndex = '1000'; // Ensure on top


        // Click to remove with comic effect
        bubble.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent general click handler from firing
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

    // Optimized bubble animation with transform caching
    let lastBubbleUpdate = 0;
    const bubbleUpdateInterval = isLowEnd ? 33 : 16; // 30fps on low-end, 60fps on high-end
    
    function animateBubbles(timestamp = 0) {
        if (!document.body.classList.contains('party-mode')) {
            requestAnimationFrame(animateBubbles);
            return;
        }

        // Throttle updates on low-end devices
        if (timestamp && lastBubbleUpdate && (timestamp - lastBubbleUpdate < bubbleUpdateInterval)) {
            requestAnimationFrame(animateBubbles);
            return;
        }
        lastBubbleUpdate = timestamp || Date.now();

        // Use reverse iteration for safe removal
        for (let i = activeBubbles.length - 1; i >= 0; i--) {
            const bubble = activeBubbles[i];
            
            // Update position
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            bubble.rotation += bubble.rotationSpeed;

            // Remove bubbles that go too far off screen (use actual visible viewport)
            const margin = bubble.size / 2;
            const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
            const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
            
            if (bubble.x < -margin * 2 || bubble.x > viewportWidth + margin * 2 ||
                bubble.y < -margin * 2 || bubble.y > viewportHeight + margin * 2) {
                // Remove bubbles that go too far off screen
                bubble.element.style.opacity = '0';
                setTimeout(() => {
                    bubble.element.remove();
                }, 500);
                activeBubbles.splice(i, 1);
                continue;
            }

            // Apply transform using composite property for better performance
            bubble.element.style.transform = `translate(${bubble.x - bubble.size/2}px, ${bubble.y - bubble.size/2}px) rotate(${bubble.rotation}deg)`;
        }

        requestAnimationFrame(animateBubbles);
    }

    // Start bubble animation loop
    animateBubbles();

    // Spawn bubbles - less frequently on low-end devices
    const bubbleSpawnInterval = isLowEnd ? 12000 : 8000; // 12s on low-end, 8s on high-end
    
    function startBubbleSpawning() {
        if (bubbleInterval) return;
        
        bubbleInterval = setInterval(() => {
            if (document.body.classList.contains('party-mode')) {
                createFloatingBubble();
            }
        }, bubbleSpawnInterval);
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

    // OCCASIONAL FIREWORKS - optimized
    function createFirework() {
        if (!document.body.classList.contains('party-mode')) return;
        if (isLowEnd) return; // Skip fireworks on low-end devices

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
            will-change: bottom;
        `;
        document.body.appendChild(launcher);

        // Animate launch with RAF instead of setInterval
        let currentY = window.innerHeight;
        const launchSpeed = 8;

        function animateLaunch() {
            currentY -= launchSpeed;
            launcher.style.bottom = (window.innerHeight - currentY) + 'px';

            // Explode when reaching target height
            if (currentY <= targetY) {
                launcher.remove();
                explode(launchX, currentY, color);
            } else {
                requestAnimationFrame(animateLaunch);
            }
        }
        requestAnimationFrame(animateLaunch);
    }

    function explode(x, y, baseColor) {
        const particleCount = 30; // Reduced from 50
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
                will-change: transform, opacity;
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

    // Launch fireworks occasionally - disabled on low-end devices
    function scheduleFireworks() {
        if (!document.body.classList.contains('party-mode') || isLowEnd) {
            setTimeout(scheduleFireworks, 1000);
            return;
        }

        createFirework();

        // Random delay between 3-8 seconds (increased for better performance)
        const delay = 3000 + Math.random() * 5000;
        setTimeout(scheduleFireworks, delay);
    }

    if (!isLowEnd) {
        scheduleFireworks();
    }
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
