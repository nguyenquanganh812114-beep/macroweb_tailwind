/**
 * Macroweb - Main JavaScript
 * 
 * A modular, maintainable JavaScript architecture for the Macroweb website.
 * Organized into distinct modules for easy development and maintenance.
 * 
 * @version 2.0.0
 * @author Macroweb Team
 */

(function() {
    'use strict';

    // ==========================================================================
    // CONFIGURATION
    // ==========================================================================
    
    const CONFIG = {
        // Scroll threshold for header effects (pixels)
        SCROLL_THRESHOLD: 50,
        
        // Animation durations (milliseconds)
        ANIMATION: {
            HERO_DELAY: 100,
            TYPEWRITER_SPEED: 40,
            TYPEWRITER_DELAY: 500,
            MESSAGE_PAUSE: 2000,
            MESSAGE_INTERVAL: 1500,
        },
        
        // CSS selectors
        SELECTORS: {
            HEADER: '.site-header',
            HERO: '.hero-v2-container, .hero',
            DESIGNER_IMAGE: '.main-designer-img',
            MEGA_MENU: '.site-header-dropdown-mega',
            HOVER_CARDS: '.hero-v2-feature-item, .feature-card, .service-card',
            FILTER_BUTTONS: '.bloglist-filter-btn',
            AI_CHAT_BUBBLE: '.ai-chat-message-bubble',
            AI_WELCOME_TEXT: '#ai-welcome-text',
        },
        
        // CSS class names
        CLASSES: {
            HEADER_SCROLLED: 'site-header--scrolled',
            MEGA_MENU_OPEN: 'site-header-mega-menu-open',
            ACTIVE: 'active',
            SHOW: 'show',
        },
        
        // GSAP Animation settings
        GSAP: {
            HERO_BRAND: { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' },
            HERO_NAV: { y: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
            HERO_BUTTON: { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' },
            HERO_IMAGE: { x: 100, opacity: 0, duration: 1.2, ease: 'power4.out' },
            CARD_HOVER: { y: -10, duration: 0.3, ease: 'power2.out' },
            FLOATING: { y: 15, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' },
        },
    };

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================

    /**
     * Safely query a single DOM element
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {Element|null}
     */
    const $ = (selector, context = document) => context.querySelector(selector);

    /**
     * Safely query multiple DOM elements
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {NodeList}
     */
    const $$ = (selector, context = document) => context.querySelectorAll(selector);

    /**
     * Check if element exists
     * @param {Element|null} element 
     * @returns {boolean}
     */
    const exists = (element) => element !== null && element !== undefined;

    /**
     * Debounce function for performance optimization
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function}
     */
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ==========================================================================
    // MODULES
    // ==========================================================================

    /**
     * Header Module
     * Handles header scroll effects and navigation behavior
     */
    const HeaderModule = (() => {
        let header = null;
        let megaMenu = null;

        /**
         * Handle scroll event
         */
        const handleScroll = () => {
            if (!header) return;
            
            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                header.classList.add(CONFIG.CLASSES.HEADER_SCROLLED);
            } else {
                header.classList.remove(CONFIG.CLASSES.HEADER_SCROLLED);
            }
        };

        /**
         * Handle mega menu hover states
         */
        const initMegaMenu = () => {
            if (!megaMenu) return;

            megaMenu.addEventListener('mouseenter', () => {
                document.body.classList.add(CONFIG.CLASSES.MEGA_MENU_OPEN);
            });

            megaMenu.addEventListener('mouseleave', () => {
                document.body.classList.remove(CONFIG.CLASSES.MEGA_MENU_OPEN);
            });
        };

        /**
         * Initialize header module
         */
        const init = () => {
            header = $(CONFIG.SELECTORS.HEADER);
            megaMenu = $(CONFIG.SELECTORS.MEGA_MENU);

            // Initial scroll check
            handleScroll();

            // Scroll listener with passive option for performance
            window.addEventListener('scroll', debounce(handleScroll, 10), { passive: true });

            // Initialize mega menu
            initMegaMenu();
        };

        return { init };
    })();

    /**
     * Hero Animation Module
     * Handles entrance animations for hero sections using GSAP
     */
    const HeroAnimationModule = (() => {
        let heroElement = null;
        let designerImage = null;

        /**
         * Play hero entrance animation timeline
         */
        const playEntranceAnimation = () => {
            if (!heroElement || typeof gsap === 'undefined') return;

            const timeline = gsap.timeline();

            timeline
                .from('.site-header-brand', {
                    ...CONFIG.GSAP.HERO_BRAND,
                })
                .from('.site-header-nav-item', {
                    ...CONFIG.GSAP.HERO_NAV,
                }, '-=0.5')
                .from('.btn-gradient.d-none', {
                    ...CONFIG.GSAP.HERO_BUTTON,
                }, '-=0.5')
                .from('.main-designer-img', {
                    ...CONFIG.GSAP.HERO_IMAGE,
                }, '-=1');
        };

        /**
         * Initialize floating animation for designer image
         */
        const initFloatingAnimation = () => {
            if (!designerImage || typeof gsap === 'undefined') return;

            gsap.to(designerImage, CONFIG.GSAP.FLOATING);
        };

        /**
         * Initialize hero animation module
         */
        const init = () => {
            heroElement = $(CONFIG.SELECTORS.HERO);
            designerImage = $(CONFIG.SELECTORS.DESIGNER_IMAGE);

            playEntranceAnimation();
            initFloatingAnimation();
        };

        return { init };
    })();

    /**
     * Card Interaction Module
     * Handles hover effects and interactions for cards
     */
    const CardInteractionModule = (() => {
        let hoverCards = [];

        /**
         * Initialize hover effects for cards
         */
        const initHoverEffects = () => {
            hoverCards = $$(CONFIG.SELECTORS.HOVER_CARDS);

            if (hoverCards.length === 0 || typeof gsap === 'undefined') return;

            hoverCards.forEach(card => {
                const hoverEffect = gsap.quickTo(card, 'y', CONFIG.GSAP.CARD_HOVER);

                card.addEventListener('mouseenter', () => hoverEffect(CONFIG.GSAP.CARD_HOVER.y));
                card.addEventListener('mouseleave', () => hoverEffect(0));
            });
        };

        /**
         * Initialize card interaction module
         */
        const init = () => {
            initHoverEffects();
        };

        return { init };
    })();

    /**
     * Blog Filter Module
     * Handles blog category filtering functionality
     */
    const BlogFilterModule = (() => {
        let filterButtons = [];

        /**
         * Handle filter button click
         * @param {Event} event 
         */
        const handleFilterClick = (event) => {
            const clickedButton = event.currentTarget;

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove(CONFIG.CLASSES.ACTIVE));
            
            // Add active class to clicked button
            clickedButton.classList.add(CONFIG.CLASSES.ACTIVE);

            // TODO: Add filtering logic here when backend is ready
            // Example: filterBlogPosts(clickedButton.textContent);
        };

        /**
         * Initialize filter buttons
         */
        const initFilterButtons = () => {
            filterButtons = $$(CONFIG.SELECTORS.FILTER_BUTTONS);

            filterButtons.forEach(btn => {
                btn.addEventListener('click', handleFilterClick);
            });
        };

        /**
         * Initialize blog filter module
         */
        const init = () => {
            initFilterButtons();
        };

        return { init };
    })();

    /**
     * AI Chat Module
     * Handles AI chat welcome message typewriter effect
     */
    const AIChatModule = (() => {
        let welcomeTextElement = null;
        let chatBubble = null;
        let messageIndex = 0;
        let isTyping = false;

        // Welcome messages pool
        const WELCOME_MESSAGES = [
            "Dạ, em chào Quý khách ạ! 😊",
            "Anh/Chị cần em tư vấn gì không ạ? ❤️",
            "Em đang sẵn sàng hỗ trợ Anh/Chị đây ạ! 🥰",
            "Quý khách cứ nhắn tin để em giúp nhắn nhé! ❤️",
            "Dạ, mời Anh/Chị để lại lời nhắn cho em ạ! 😊",
            "Em có thể giúp gì được cho mình không ạ? 🥰",
            "Dạ, Anh/Chị cần tư vấn dịch vụ nào cứ bảo em nhé! ❤️",
            "Em luôn ở đây hỗ trợ Quý khách tận tình ạ! 😊",
            "Chào Quý khách, em giúp gì được cho mình ạ? ❤️",
            "Dạ, mời Anh/Chị trải nghiệm dịch vụ bên em ạ! 🥰",
        ];

        /**
         * Type out a message character by character
         * @param {string} message 
         * @returns {Promise<void>}
         */
        const typeMessage = (message) => {
            return new Promise((resolve) => {
                welcomeTextElement.innerHTML = '';
                chatBubble.classList.add(CONFIG.CLASSES.SHOW);

                let charIndex = 0;

                const typeChar = () => {
                    if (charIndex < message.length) {
                        welcomeTextElement.innerHTML += message.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, CONFIG.ANIMATION.TYPEWRITER_SPEED);
                    } else {
                        resolve();
                    }
                };

                setTimeout(typeChar, CONFIG.ANIMATION.TYPEWRITER_DELAY);
            });
        };

        /**
         * Display next message in rotation
         */
        const displayNextMessage = async () => {
            if (isTyping || !welcomeTextElement || !chatBubble) return;
            
            isTyping = true;
            const currentMessage = WELCOME_MESSAGES[messageIndex];

            await typeMessage(currentMessage);

            // Pause before hiding
            await new Promise(resolve => 
                setTimeout(resolve, CONFIG.ANIMATION.MESSAGE_PAUSE)
            );

            chatBubble.classList.remove(CONFIG.CLASSES.SHOW);

            // Wait before showing next message
            await new Promise(resolve => 
                setTimeout(resolve, CONFIG.ANIMATION.MESSAGE_INTERVAL)
            );

            // Update message index (circular)
            messageIndex = (messageIndex + 1) % WELCOME_MESSAGES.length;
            isTyping = false;

            displayNextMessage();
        };

        /**
         * Initialize AI chat module
         */
        const init = () => {
            welcomeTextElement = $(CONFIG.SELECTORS.AI_WELCOME_TEXT);
            chatBubble = $(CONFIG.SELECTORS.AI_CHAT_BUBBLE);

            if (!welcomeTextElement || !chatBubble) return;

            // Start message rotation after initial delay
            setTimeout(displayNextMessage, CONFIG.ANIMATION.HERO_DELAY);
        };

        return { init };
    })();

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    /**
     * Initialize all modules
     */
    const initializeAll = () => {
        try {
            HeaderModule.init();
            HeroAnimationModule.init();
            CardInteractionModule.init();
            BlogFilterModule.init();
            AIChatModule.init();

            console.log('✅ Macroweb JavaScript initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Macroweb JavaScript:', error);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        initializeAll();
    }

})();
