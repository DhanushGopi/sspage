// Seamless Infinite Carousel Logic
const slidesContainer = document.getElementById('carousel-slides');
const dotsContainer = document.getElementById('carousel-dots');
const originalSlides = Array.from(slidesContainer.children);
const totalOriginalSlides = originalSlides.length;

let currentIndex = 0;
let slideInterval;
const slideDuration = 10000; // 10 seconds

// Clone the first slide and append it to the end for seamless looping
const firstClone = originalSlides[0].cloneNode(true);
slidesContainer.appendChild(firstClone);

const totalSlidesWithClone = slidesContainer.children.length;

function updateCarousel(withTransition = true) {
    if (withTransition) {
        slidesContainer.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        slidesContainer.style.transition = 'none';
    }
    
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function updateDots() {
    const dots = dotsContainer.children;
    // Map the clone index (equal to totalOriginalSlides) back to index 0 for dots
    const activeDotIndex = currentIndex === totalOriginalSlides ? 0 : currentIndex;
    
    for (let i = 0; i < dots.length; i++) {
        if (i === activeDotIndex) {
            dots[i].className = "dot active";
        } else {
            dots[i].className = "dot inactive";
        }
    }
}

function nextSlide() {
    currentIndex++;
    updateCarousel(true);

    // If we landed on the cloned first slide, instantly snap back to real index 0 without animation
    if (currentIndex === totalOriginalSlides) {
        setTimeout(() => {
            currentIndex = 0;
            updateCarousel(false);
        }, 700); // Matches transition duration
    }
}

function currentSlide(index) {
    currentIndex = index;
    updateCarousel(true);
    resetTimer();
}

function startTimer() {
    slideInterval = setInterval(nextSlide, slideDuration);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();

// Interactive Weight Chip State Logic
function selectSize(button, cardId, price) {
    const container = button.parentElement;
    const chips = container.querySelectorAll('.weight-chip');
    
    chips.forEach(chip => {
        chip.className = "weight-chip inactive";
    });

    button.className = "weight-chip active";

    const payBtn = document.getElementById(`pay-btn-${cardId}`);
    payBtn.innerText = `Pay Rs.${price}`;
}


// Store active selections for each card initialized to 250 gm menu prices
const productSelections = {
    'card-1': { name: 'Classic Brownie', weight: '250 gm', price: 250 },
    'card-2': { name: 'Dark Delight Brownie', weight: '250 gm', price: 270 },
    'card-3': { name: 'Triple Treat Brownie', weight: '250 gm', price: 270 }
};

// Handle chip selection
function selectSize(buttonElement, cardId, productName, weight, price) {
    const card = document.getElementById(cardId);
    
    // Update chip active/inactive states within this card
    const chips = card.querySelectorAll('.weight-chip');
    chips.forEach(chip => {
        chip.classList.remove('active');
        chip.classList.add('inactive');
    });
    
    buttonElement.classList.remove('inactive');
    buttonElement.classList.add('active');

    // Update state tracker
    productSelections[cardId] = {
        name: productName,
        weight: weight,
        price: price
    };

    // Dynamically update the Pay button amount text
    const payBtn = card.querySelector('.pay-btn');
    payBtn.textContent = `Pay Rs.${price}`;
}

// Trigger WhatsApp message functionality
function triggerWhatsApp(cardId) {
    const selection = productSelections[cardId];
    const phoneNumber = "6382878748"; // Replace with your WhatsApp business number
    
    const message = `Hey, I wanna buy this product!\n\n*Product:* ${selection.name}\n*Weight:* ${selection.weight}\n*Price:* Rs.${selection.price}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}


/*Celebration Box section*/

// State tracker for Celebration Box
let celebrationSelection = {
    name: 'Celebration Box',
    weight: '250 gm',
    price: 400
};

// Handle size chip selection for Celebration Box
function selectBoxSize(weight, price) {
    const card = document.getElementById('celebration-card');
    const chips = card.querySelectorAll('.weight-chip');
    
    chips.forEach(chip => {
        chip.classList.remove('active');
        chip.classList.add('inactive');
    });
    
    // Find and activate the clicked chip
    event.currentTarget.classList.remove('inactive');
    event.currentTarget.classList.add('active');

    // Update state
    celebrationSelection.weight = weight;
    celebrationSelection.price = price;

    // Update button text
    const payBtn = document.getElementById('celebration-pay-btn');
    payBtn.textContent = `Pay Rs.${price}`;
}

// Trigger WhatsApp for Celebration Box with custom note
function triggerCelebrationWhatsApp() {
    const noteText = document.getElementById('celebration-note').value.trim();
    const phoneNumber = "6382878748"; // Replace with your WhatsApp business number
    
    let message = `Hey, I wanna buy this Celebration Box!\n\n*Product:* ${celebrationSelection.name}\n*Box Size:* ${celebrationSelection.weight}\n*Price:* Rs.${celebrationSelection.price}`;
    
    if (noteText) {
        message += `\n*Special Instructions / Note:* ${noteText}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}



//Reels section

// document.addEventListener('DOMContentLoaded', () => {
//     const cards = document.querySelectorAll('.reel-card');
//     const counter = document.getElementById('reelCounter');
//     let currentIndex = 0;
//     const totalCards = cards.length;

//     function updateStack() {
//         cards.forEach((card, i) => {
//             card.classList.remove('active', 'next', 'hidden', 'swiped-left', 'swiped-right');
//             const video = card.querySelector('.reel-video');
            
//             if (i === currentIndex) {
//                 card.classList.add('active');
//                 video.play().catch(() => {}); // Play active video
//             } else {
//                 card.classList.add(i === (currentIndex + 1) % totalCards ? 'next' : 'hidden');
//                 video.pause(); // Pause inactive videos
//             }
//         });
//         counter.textContent = `${currentIndex + 1} / ${totalCards}`;
//     }

//     window.nextReel = function() {
//         const currentCard = cards[currentIndex];
//         currentCard.classList.add('swiped-right');
//         currentIndex = (currentIndex + 1) % totalCards;
//         setTimeout(updateStack, 300);
//     };

//     window.prevReel = function() {
//         currentIndex = (currentIndex - 1 + totalCards) % totalCards;
//         updateStack();
//     };

//     // Global Mute/Unmute toggle
//     window.toggleAudio = function(btn) {
//         const activeCard = cards[currentIndex];
//         const video = activeCard.querySelector('.reel-video');
        
//         video.muted = !video.muted;
//         btn.textContent = video.muted ? "🔇 Unmute" : "🔊 Mute";
//     };

//     // Touch / Swipe (Tinder-style)
//     let startX = 0;
//     cards.forEach(card => {
//         card.addEventListener('touchstart', (e) => {
//             startX = e.touches[0].clientX;
//         });

//         card.addEventListener('touchend', (e) => {
//             const endX = e.changedTouches[0].clientX;
//             const diffX = endX - startX;

//             if (Math.abs(diffX) > 80) {
//                 if (diffX > 0) {
//                     card.classList.add('swiped-right');
//                 } else {
//                     card.classList.add('swiped-left');
//                 }
//                 currentIndex = (currentIndex + 1) % totalCards;
//                 setTimeout(updateStack, 300);
//             }
//         });
//     });

//     updateStack();
// });


// Open Reel Popup Modal
window.openReelModal = function(event, videoSrc) {
    event.preventDefault(); 
    
    const modal = document.getElementById('reelModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalSocialLink = document.getElementById('modalSocialLink');
    
    const socialUrl = event.currentTarget.getAttribute('href');

    modalVideo.src = videoSrc;
    modalSocialLink.setAttribute('href', socialUrl);
    
    modal.classList.add('active');
    modalVideo.play().catch(() => {});
};

// Close Reel Popup Modal
window.closeReelModal = function() {
    const modal = document.getElementById('reelModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
};

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeReelModal();
    }
});



//HAMBURGER MENU



document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu') || document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    
    if (!hamburger || !mobileMenu) return;

    // Create background overlay element dynamically if it doesn't exist
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking any nav link inside it
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
});