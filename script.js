document.addEventListener("DOMContentLoaded", function() {
    const partyModeToggle = document.getElementById('partyModeToggle');
    const body = document.body;

    function updatePartyModeButton(isPartyMode) {
        const icon = partyModeToggle.querySelector('.party-mode-icon');
        const text = partyModeToggle.querySelector('.party-mode-text');

        if (isPartyMode) {
            icon.textContent = '🎉';
            text.setAttribute('data-en', 'Party');
            text.setAttribute('data-pl', 'Impreza');
            // Update text based on current language
            const currentLang = localStorage.getItem("preferredLanguage") || "pl";
            text.textContent = text.getAttribute(`data-${currentLang}`);
        } else {
            icon.textContent = '✨';
            text.setAttribute('data-en', 'Party');
            text.setAttribute('data-pl', 'Impreza');
            // Update text based on current language
            const currentLang = localStorage.getItem("preferredLanguage") || "pl";
            text.textContent = text.getAttribute(`data-${currentLang}`);
        }
    }

    const isPartyMode = localStorage.getItem('partyMode') === 'true';
    if (isPartyMode) {
        body.classList.add('party-mode');
        if (partyModeToggle) {
            updatePartyModeButton(true);
        }
    }

    const timeAnnouncement = document.getElementById('timeAnnouncement');
    const dismissBtn = document.getElementById('dismissAnnouncement');
    const dontShowAgain = document.getElementById('dontShowAgain');

    if (timeAnnouncement && !localStorage.getItem('timeAnnouncementDismissed')) {
        timeAnnouncement.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
            if (dontShowAgain && dontShowAgain.checked) {
                localStorage.setItem('timeAnnouncementDismissed', 'true');
            }
            timeAnnouncement.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    if (timeAnnouncement) {
        timeAnnouncement.querySelector('.announcement-backdrop').addEventListener('click', function() {
            if (dontShowAgain && dontShowAgain.checked) {
                localStorage.setItem('timeAnnouncementDismissed', 'true');
            }
            timeAnnouncement.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            body.classList.toggle('party-mode');
            const isNowPartyMode = body.classList.contains('party-mode');
            localStorage.setItem('partyMode', isNowPartyMode);
            updatePartyModeButton(isNowPartyMode);
        });
    }

    const langButtons = document.querySelectorAll(".lang-btn");
    const elementsWithLang = document.querySelectorAll("[data-en], [data-pl]");
    const htmlElement = document.documentElement;

    let currentLang = localStorage.getItem("preferredLanguage") || "pl";

    function switchLanguage(lang) {
        currentLang = lang;
        htmlElement.setAttribute("lang", lang);

        elementsWithLang.forEach((element) => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === "TITLE") {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        langButtons.forEach((btn) => {
            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        localStorage.setItem("preferredLanguage", lang);

        // Update party mode button text when language changes
        if (partyModeToggle) {
            const isNowPartyMode = body.classList.contains('party-mode');
            updatePartyModeButton(isNowPartyMode);
        }
    }

    langButtons.forEach((button) => {
        button.addEventListener("click", function() {
            const lang = this.getAttribute("data-lang");
            switchLanguage(lang);
        });
    });

    switchLanguage(currentLang);


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

    document.querySelectorAll(".timeline-item").forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(item);
    });

    document.querySelectorAll(".detail-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

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

    document.querySelectorAll(".info-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

    const weddingDate = new Date("2026-07-10T14:00:00");
    const startDate = new Date("2024-11-17T00:00:00"); // Fixed start date for progress calculation
    let lastUpdate = 0;

    function updateCountdown(timestamp) {
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

            if (daysEl.textContent !== String(days)) daysEl.textContent = days;
            if (hoursEl.textContent !== String(hours)) hoursEl.textContent = hours;
            if (minutesEl.textContent !== String(minutes)) minutesEl.textContent = minutes;
            if (secondsEl.textContent !== String(seconds)) secondsEl.textContent = seconds;

            updateCountdownProgress();

            requestAnimationFrame(updateCountdown);
        } else {
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            updateCountdownProgress();
        }
    }

    function updateCountdownProgress() {
        const now = new Date();
        
        const totalTime = weddingDate - startDate;
        const elapsedTime = now - startDate;
        
        let overallProgress = (elapsedTime / totalTime) * 100;
        
        overallProgress = Math.max(0, Math.min(100, overallProgress));

        const progressEl = document.getElementById("countdownProgress");
        if (progressEl) progressEl.style.width = overallProgress + '%';
    }

    requestAnimationFrame(updateCountdown);

    const calendarBtn = document.getElementById("addToCalendar");
    const calendarDropdown = document.getElementById("calendarDropdown");

    if (calendarBtn && calendarDropdown) {
        calendarBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            calendarDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function(e) {
            if (
                !calendarBtn.contains(e.target) &&
                !calendarDropdown.contains(e.target)
            ) {
                calendarDropdown.classList.remove("show");
            }
        });

        document.querySelectorAll(".calendar-option").forEach((option) => {
            option.addEventListener("click", function(e) {
                e.preventDefault();
                const service = this.getAttribute("data-service");

                const eventDetails = {
                    title: "Irena & Marcin Wedding / Wesele Irena i Marcin",
                    description:
                        "Wedding ceremony and reception at Gospoda Nad Zimną Rzeczką",
                    location: "Gospoda Nad Zimną Rzeczką, ul. Zimna Rzeczka 8, Kłokoczyn",
                    startDate: "20260710T140000",
                    endDate: "20260711T040000",
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
                        const icsContent = [
                            "BEGIN:VCALENDAR",
                            "VERSION:2.0",
                            "PRODID:-//Irena & Marcin Wedding//EN",
                            "BEGIN:VEVENT",
                            `DTSTART:${eventDetails.startDate}`,
                            `DTEND:${eventDetails.endDate}`,
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
    const maxTrails = 50;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = isMobile || navigator.hardwareConcurrency <= 4 || prefersReducedMotion;

    function debounce(fn, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const ViewportCache = {
        width: window.innerWidth,
        height: window.innerHeight,
        update() {
            this.width = window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth;
            this.height = window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight;
        }
    };

    const AnimationController = {
        trailsRunning: false,
        bubblesRunning: false,
        trailsFrameId: null,
        bubblesFrameId: null,

        startTrails() {
            if (this.trailsRunning) return;
            this.trailsRunning = true;
            this.animateTrailsLoop();
        },

        stopTrails() {
            this.trailsRunning = false;
            if (this.trailsFrameId) {
                cancelAnimationFrame(this.trailsFrameId);
                this.trailsFrameId = null;
            }
            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
            trails.length = 0;
        },

        animateTrailsLoop() {
            if (!this.trailsRunning) return;

            ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

            for (let i = trails.length - 1; i >= 0; i--) {
                const trail = trails[i];
                trail.life -= isLowEnd ? 0.04 : 0.03;
                trail.size *= 0.95;

                if (trail.life <= 0) {
                    trails.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = trail.life;
                ctx.fillStyle = trail.color;
                ctx.beginPath();
                ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
                ctx.fill();
            }

            this.trailsFrameId = requestAnimationFrame(() => this.animateTrailsLoop());
        },

        startBubbles() {
            if (this.bubblesRunning) return;
            this.bubblesRunning = true;
            this.animateBubblesLoop();
        },

        stopBubbles() {
            this.bubblesRunning = false;
            if (this.bubblesFrameId) {
                cancelAnimationFrame(this.bubblesFrameId);
                this.bubblesFrameId = null;
            }
        },

        lastBubbleUpdate: 0,
        animateBubblesLoop(timestamp = 0) {
            if (!this.bubblesRunning) return;

            const isMobileView = window.innerWidth <= 768;
            if (isMobileView) {
                this.bubblesFrameId = requestAnimationFrame((ts) => this.animateBubblesLoop(ts));
                return;
            }

            const bubbleUpdateInterval = isLowEnd ? 33 : 16;
            if (timestamp && this.lastBubbleUpdate && (timestamp - this.lastBubbleUpdate < bubbleUpdateInterval)) {
                this.bubblesFrameId = requestAnimationFrame((ts) => this.animateBubblesLoop(ts));
                return;
            }
            this.lastBubbleUpdate = timestamp || Date.now();

            const vw = ViewportCache.width;
            const vh = ViewportCache.height;

            for (let i = activeBubbles.length - 1; i >= 0; i--) {
                const bubble = activeBubbles[i];

                bubble.x += bubble.vx;
                bubble.y += bubble.vy;
                bubble.rotation += bubble.rotationSpeed;

                const radius = bubble.size / 2;

                if (bubble.x - radius < 0) {
                    bubble.x = radius;
                    bubble.vx = Math.abs(bubble.vx) * 0.8;
                } else if (bubble.x + radius > vw) {
                    bubble.x = vw - radius;
                    bubble.vx = -Math.abs(bubble.vx) * 0.8;
                }

                if (bubble.y - radius < 0) {
                    bubble.y = radius;
                    bubble.vy = Math.abs(bubble.vy) * 0.8;
                } else if (bubble.y + radius > vh) {
                    bubble.y = vh - radius;
                    bubble.vy = -Math.abs(bubble.vy) * 0.8;
                }

                bubble.element.style.transform = `translate(${bubble.x - radius}px, ${bubble.y - radius}px) rotate(${bubble.rotation}deg)`;
            }

            this.bubblesFrameId = requestAnimationFrame((ts) => this.animateBubblesLoop(ts));
        },

        onPartyModeChange(isPartyMode) {
            if (isPartyMode) {
                this.startTrails();
                this.startBubbles();
            } else {
                this.stopTrails();
                this.stopBubbles();
            }
        }
    };

    function resizeCanvas() {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
        ViewportCache.update();
    }
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 150));

    let lastTrailTime = 0;
    const trailThrottle = isLowEnd ? 50 : 16; // 20fps on low-end, 60fps on high-end

    document.addEventListener('mousemove', (e) => {
        if (!document.body.classList.contains('party-mode')) return;

        const now = Date.now();
        if (now - lastTrailTime < trailThrottle) return;
        lastTrailTime = now;

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

    if (document.body.classList.contains('party-mode')) {
        AnimationController.startTrails();
    }

    let confettiInterval = null;
    const confettiCount = isLowEnd ? 2 : 3; // Fewer on low-end devices
    const confettiFrequency = isLowEnd ? 500 : 300; // Less frequent on low-end

    function createConfetti() {
        if (!document.body.classList.contains('party-mode')) return;

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

    const partyModeToggle = document.getElementById('partyModeToggle');
    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            setTimeout(() => {
                const isPartyMode = document.body.classList.contains('party-mode');
                AnimationController.onPartyModeChange(isPartyMode);
                if (isPartyMode) {
                    if (!confettiInterval) {
                        confettiInterval = setInterval(createConfetti, confettiFrequency);
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

    if (document.body.classList.contains('party-mode')) {
        confettiInterval = setInterval(createConfetti, confettiFrequency);
    }

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

    function initPhotoMadness() {
        if (!document.body.classList.contains('party-mode')) return;

        document.addEventListener('click', (e) => {
            if (!document.body.classList.contains('party-mode')) return;

            const target = e.target;
            if (target.tagName === 'IMG' && target.closest('.masonry-item, .photo-gallery')) {
                createPhotoExplosion(e.clientX, e.clientY);
            }
        });

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

    initPhotoMadness();

    const partyToggle = document.getElementById('partyModeToggle');
    if (partyToggle) {
        partyToggle.addEventListener('click', () => {
            setTimeout(initPhotoMadness, 100);
        });
    }

    function createComicEffect(x, y, element) {
        if (!document.body.classList.contains('party-mode')) return;

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
        
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        const rotation = (Math.random() - 0.5) * 30;
        
        comic.style.left = (x + offsetX) + 'px';
        comic.style.top = (y + offsetY) + 'px';
        comic.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
        
        document.body.appendChild(comic);
        
        setTimeout(() => {
            comic.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        }, 10);
        
        setTimeout(() => {
            comic.style.opacity = '0';
            setTimeout(() => comic.remove(), 300);
        }, 600);
    }

    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('party-mode')) return;
        
        const target = e.target.closest('button, a, .detail-card, .info-card, .masonry-item, img');
        if (target) {
            createComicEffect(e.clientX, e.clientY, target);
        }
    });

    const photoBubblesContainer = document.getElementById('photoBubbles');
    let bubbleInterval = null;
    const activeBubbles = [];
    const maxBubbles = isLowEnd ? 3 : 6; // Fewer bubbles on low-end devices

    function createFloatingBubble() {
        if (!document.body.classList.contains('party-mode')) return;
        if (activeBubbles.length >= maxBubbles) return;

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

        const viewportWidth = (window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth);
        const viewportHeight = (window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight);

        // Disable movement on mobile devices
        const isMobile = window.innerWidth <= 768;

        const insetMargin = 50; // Start 50px inside the viewport edge
        let startX, startY;

        if (isMobile) {
            // On mobile, spawn at random static positions within the viewport
            startX = insetMargin + Math.random() * (viewportWidth - insetMargin * 2);
            startY = insetMargin + Math.random() * (viewportHeight - insetMargin * 2);
        } else {
            // On desktop, spawn at edges to float in
            const startSide = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left

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
        }

        const baseSpeed = isLowEnd ? 0.5 : 1.0;
        const maxSpeed = isLowEnd ? 1.5 : 2.5;

        const velocityX = isMobile ? 0 : (Math.random() - 0.5) * (baseSpeed + Math.random() * maxSpeed);
        const velocityY = isMobile ? 0 : (Math.random() - 0.5) * (baseSpeed + Math.random() * maxSpeed);

        const rotationSpeed = isMobile ? 0 : (Math.random() - 0.5) * 2;
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

    if (document.body.classList.contains('party-mode')) {
        AnimationController.startBubbles();
    }

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
        activeBubbles.forEach(bubble => {
            bubble.element.remove();
        });
        activeBubbles.length = 0;
    }

    if (partyModeToggle) {
        partyModeToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (document.body.classList.contains('party-mode')) {
                    startBubbleSpawning();
                    createFloatingBubble();
                } else {
                    stopBubbleSpawning();
                }
            }, 0);
        });
    }

    if (document.body.classList.contains('party-mode')) {
        startBubbleSpawning();
        createFloatingBubble();
    }

    function createFirework() {
        if (!document.body.classList.contains('party-mode')) return;
        if (isLowEnd) return; // Skip fireworks on low-end devices

        const launchX = Math.random() * window.innerWidth;
        const targetY = 100 + Math.random() * 300; // Explode in upper portion
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

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

        let currentY = window.innerHeight;
        const launchSpeed = 8;

        function animateLaunch() {
            currentY -= launchSpeed;
            launcher.style.bottom = (window.innerHeight - currentY) + 'px';

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

        function animateParticles() {
            let allDead = true;

            particles.forEach(p => {
                if (p.life <= 0) return;

                allDead = false;

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15; // Gravity
                p.vx *= 0.98; // Air resistance
                p.life -= 0.015;

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

    function scheduleFireworks() {
        if (!document.body.classList.contains('party-mode') || isLowEnd) {
            setTimeout(scheduleFireworks, 1000);
            return;
        }

        createFirework();

        const delay = 3000 + Math.random() * 5000;
        setTimeout(scheduleFireworks, delay);
    }

    if (!isLowEnd) {
        scheduleFireworks();
    }
}

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

const EasterEggs = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
    konamiIndex: 0,
    konamiActivated: false,
    namesClickCount: 0,
    namesClickTimer: null,
    rainbowClickCount: 0,
    rainbowClickTimer: null,
    rainbowMode: false,

    init() {
        this.initPartyButtonHint();
        this.initNamesSecret();
        this.initFooterHearts();
        this.initRainbowMode();
        this.initKonami();
        this.initSpecialDates();
        this.initCountdownMilestones();
    },

    getLang() {
        return document.documentElement.lang || localStorage.getItem('preferredLanguage') || 'pl';
    },

    showNotification(text) {
        const existing = document.querySelector('.easter-egg-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.textContent = text;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2500);
    },

    initPartyButtonHint() {
        if (localStorage.getItem('partyModeDiscovered')) return;

        const partyToggle = document.getElementById('partyModeToggle');
        if (!partyToggle) return;

        const showHint = () => {
            if (document.body.classList.contains('party-mode')) {
                localStorage.setItem('partyModeDiscovered', 'true');
                return;
            }
            partyToggle.classList.add('hint-active');
            setTimeout(() => partyToggle.classList.remove('hint-active'), 1000);
        };

        setTimeout(showHint, 30000);
        setInterval(() => {
            if (!localStorage.getItem('partyModeDiscovered')) {
                showHint();
            }
        }, 60000);

        partyToggle.addEventListener('click', () => {
            localStorage.setItem('partyModeDiscovered', 'true');
        }, { once: true });
    },

    initNamesSecret() {
        const namesElement = document.querySelector('.names');
        if (!namesElement) return;

        namesElement.addEventListener('click', (e) => {
            this.namesClickCount++;
            clearTimeout(this.namesClickTimer);
            this.namesClickTimer = setTimeout(() => this.namesClickCount = 0, 2000);

            this.createClickHeart(e.clientX, e.clientY, this.namesClickCount);

            if (this.namesClickCount >= 3) {
                this.triggerNamesSecret(namesElement);
                this.namesClickCount = 0;
            }
        });
    },

    createClickHeart(x, y, count) {
        const hearts = ['💕'];
        if (count >= 2) hearts.push('💕');

        hearts.forEach((h, i) => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.textContent = h;
            heart.style.left = (x + (i * 20) - 10) + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (1.2 + count * 0.3) + 'rem';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        });
    },

    triggerNamesSecret(element) {
        element.classList.add('celebrating');
        setTimeout(() => element.classList.remove('celebrating'), 1500);

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const hearts = ['💖', '💕', '💗', '💓', '💘', '💝', '❤️', '🩷'];

        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'celebration-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

                const angle = (Math.PI * 2 * i) / 16;
                const distance = 60 + Math.random() * 80;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;

                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.setProperty('--tx', (offsetX * 1.5) + 'px');
                heart.style.setProperty('--ty', (offsetY * 1.5 - 30) + 'px');

                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }, i * 30);
        }
    },

    initFooterHearts() {
        const footerHearts = document.querySelector('.footer .hearts');
        if (!footerHearts) return;

        footerHearts.addEventListener('click', () => this.triggerHeartRain());
    },

    triggerHeartRain() {
        const hearts = ['💖', '💕', '💗', '💓', '💘', '💝', '❤️', '🩷', '💜', '💙'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'rain-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
                heart.style.fontSize = (18 + Math.random() * 16) + 'px';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 4500);
            }, i * 80);
        }
    },

    initRainbowMode() {
        const partyToggle = document.getElementById('partyModeToggle');
        if (!partyToggle) return;

        partyToggle.addEventListener('click', () => {
            this.rainbowClickCount++;
            clearTimeout(this.rainbowClickTimer);
            this.rainbowClickTimer = setTimeout(() => {
                this.rainbowClickCount = 0;
                partyToggle.classList.remove('rainbow-hint');
            }, 1000);

            if (this.rainbowClickCount === 2) {
                partyToggle.classList.add('rainbow-hint');
                setTimeout(() => partyToggle.classList.remove('rainbow-hint'), 500);
            }

            if (this.rainbowClickCount >= 3) {
                this.toggleRainbowMode();
                this.rainbowClickCount = 0;
                partyToggle.classList.remove('rainbow-hint');
            }
        });
    },

    toggleRainbowMode() {
        this.rainbowMode = !this.rainbowMode;
        document.body.classList.toggle('rainbow-mode', this.rainbowMode);

        if (this.rainbowMode) {
            if (!document.body.classList.contains('party-mode')) {
                document.getElementById('partyModeToggle')?.click();
            }
            this.showNotification(this.getLang() === 'en' ? '🌈 Rainbow mode!' : '🌈 Tryb tęczowy!');
        } else {
            this.showNotification(this.getLang() === 'en' ? '🌈 Rainbow off' : '🌈 Tęcza wyłączona');
        }
    },

    initKonami() {
        document.addEventListener('keydown', (e) => {
            const expected = this.konamiCode[this.konamiIndex];

            if (e.code === expected) {
                this.konamiIndex++;
                this.createKonamiSparkle();

                if (this.konamiIndex === this.konamiCode.length) {
                    this.triggerKonami();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    },

    createKonamiSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'konami-sparkle';
        sparkle.textContent = '✨';
        sparkle.style.right = (20 + (this.konamiIndex * 15)) + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    },

    triggerKonami() {
        if (this.konamiActivated) return;
        this.konamiActivated = true;

        const overlay = document.createElement('div');
        overlay.className = 'konami-overlay';
        const isEn = this.getLang() === 'en';
        overlay.innerHTML = `
            <div class="konami-content">
                <div class="konami-hearts">💖💖💖</div>
                <h2>${isEn ? 'Secret unlocked!' : 'Sekret odblokowany!'}</h2>
                <p style="color: #ccc; margin: 0.5rem 0;">${isEn ? 'You found the Konami code!' : 'Znalazłeś kod Konami!'}</p>
                <div class="konami-emojis">🎮🕹️👾🎉</div>
            </div>
        `;
        document.body.appendChild(overlay);

        if (!document.body.classList.contains('party-mode')) {
            document.getElementById('partyModeToggle')?.click();
        }

        this.triggerHeartRain();

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.remove();
                this.konamiActivated = false;
            }, 500);
        }, 3500);
    },

    initSpecialDates() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();

        if (month === 7 && day === 10) {
            if (year === 2026) {
                setTimeout(() => this.triggerWeddingDay(), 2000);
            } else if (year > 2026) {
                const anniversary = year - 2026;
                setTimeout(() => this.triggerAnniversary(anniversary), 2000);
            }
        }
    },

    triggerWeddingDay() {
        if (!document.body.classList.contains('party-mode')) {
            document.getElementById('partyModeToggle')?.click();
        }
        this.showNotification(this.getLang() === 'en' ? "🎊 IT'S THE DAY! 👰🤵" : '🎊 TO JEST TEN DZIEŃ! 👰🤵');
        this.triggerHeartRain();
    },

    triggerAnniversary(years) {
        const ordinal = years === 1 ? 'st' : years === 2 ? 'nd' : years === 3 ? 'rd' : 'th';
        this.showNotification(
            this.getLang() === 'en'
                ? `💕 Happy ${years}${ordinal} Anniversary! 💕`
                : `💕 Szczęśliwej ${years}. rocznicy! 💕`
        );
    },

    milestonesShown: new Set(),

    initCountdownMilestones() {
        const checkMilestones = () => {
            const daysEl = document.getElementById('days');
            if (!daysEl) return;

            const days = parseInt(daysEl.textContent);
            if (isNaN(days)) return;

            const milestones = {
                100: { en: 'Triple digits! 💯', pl: 'Trzy cyfry! 💯' },
                69: { en: 'Nice. 😏', pl: 'Nice. 😏' },
                7: { en: 'One week! 🎉', pl: 'Jeszcze tydzień! 🎉' },
                1: { en: 'TOMORROW! 💒', pl: 'JUTRO! 💒' }
            };

            if (milestones[days] && !this.milestonesShown.has(days)) {
                this.milestonesShown.add(days);
                const msg = milestones[days];
                setTimeout(() => this.showNotification(this.getLang() === 'en' ? msg.en : msg.pl), 3000);
            }
        };

        setTimeout(checkMilestones, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => EasterEggs.init());
