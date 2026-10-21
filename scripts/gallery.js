/* --- Dynamic Filterable Gallery Logic --- */

const galleryDatabase = [
    { id: 1, title: 'Classic Fudge Square', variety: 'classic', category: 'Classic Brownie', img: './assets/slide1.png' },
    { id: 2, title: 'Dark Delight Indulgence', variety: 'dark', category: 'Dark Delight', img: './assets/slide2.png' },
    { id: 3, title: 'Triple Chocolate Treat', variety: 'triple', category: 'Triple Treat', img: './assets/slide1.png' },
    { id: 4, title: 'Birthday Celebration Box', variety: 'celebration', category: 'Celebration Box', img: './assets/slide2.png' },
    { id: 5, title: 'Seasonal Walnut Crunch', variety: 'seasonal', category: 'Seasonal Special', img: './assets/slide1.png' },
    { id: 6, title: 'Classic Golden Bake', variety: 'classic', category: 'Classic Brownie', img: './assets/slide2.png' },
    { id: 7, title: 'Intense Dark Ganache', variety: 'dark', category: 'Dark Delight', img: './assets/slide1.png' },
    { id: 8, title: 'Triple Layer Bliss', variety: 'triple', category: 'Triple Treat', img: './assets/slide2.png' },
    { id: 9, title: 'Anniversary Gift Box', variety: 'celebration', category: 'Celebration Box', img: './assets/slide1.png' },
    { id: 10, title: 'Classic Choc-Chip Square', variety: 'classic', category: 'Classic Brownie', img: './assets/slide2.png' },
    { id: 11, title: 'Dark Cocoa Midnight', variety: 'dark', category: 'Dark Delight', img: './assets/slide1.png' },
    { id: 12, title: 'Festive Celebration Hamper', variety: 'celebration', category: 'Celebration Box', img: './assets/slide1.png' },
    { id: 13, title: 'Triple Choc Fudge Block', variety: 'triple', category: 'Triple Treat', img: './assets/slide2.png' },
    { id: 14, title: 'Seasonal Berry Fusion', variety: 'seasonal', category: 'Seasonal Special', img: './assets/slide1.png' },
    { id: 15, title: 'Classic Family Box', variety: 'classic', category: 'Classic Brownie', img: './assets/slide2.png' },
    { id: 16, title: 'Dark Lava Core', variety: 'dark', category: 'Dark Delight', img: './assets/slide1.png' },
    { id: 17, title: 'Triple Treat Deluxe', variety: 'triple', category: 'Triple Treat', img: './assets/slide1.png' },
    { id: 18, title: 'Grand Wedding Hamper', variety: 'celebration', category: 'Celebration Box', img: './assets/slide2.png' },
    { id: 19, title: 'Seasonal Almond Mocha', variety: 'seasonal', category: 'Seasonal Special', img: './assets/slide1.png' },
    { id: 20, title: 'Classic Signature Cut', variety: 'classic', category: 'Classic Brownie', img: './assets/slide1.png' }
];

let currentFilter = 'all';
let displayLimit = 12; // Initially show max 12 items

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const loadMoreBtnContainer = document.getElementById('loadMoreContainer');
    if (!grid) return;

    // Filter items based on current active category
    const filteredItems = currentFilter === 'all' 
        ? galleryDatabase 
        : galleryDatabase.filter(item => item.variety === currentFilter);

    // Slice items up to the display limit
    const itemsToShow = filteredItems.slice(0, displayLimit);

    // Render HTML cards
    grid.innerHTML = itemsToShow.map(item => `
        <div class="showcase-gallery-item">
            <div class="showcase-img-wrap">
                <span class="showcase-badge">${item.category}</span>
                <img src="${item.img}" alt="${item.title}" loading="lazy">
            </div>
            <div class="showcase-info">
                <h4 class="showcase-title">${item.title}</h4>
                <p class="showcase-sub">Baked fresh in Chennai 💛</p>
            </div>
        </div>
    `).join('');

    // Manage Load More button visibility
    if (loadMoreBtnContainer) {
        if (displayLimit >= filteredItems.length) {
            loadMoreBtnContainer.style.display = 'none';
        } else {
            loadMoreBtnContainer.style.display = 'flex';
        }
    }
}

// Handle Category Filter Click
window.filterGallery = function(variety, btnElement) {
    currentFilter = variety;
    displayLimit = 12; // Reset limit back to 12 when switching filters

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    renderGallery();
};

// Handle Load More Click
window.loadMoreGallery = function() {
    displayLimit += 8; // Reveal 8 more items per click
    renderGallery();
};

// Initialize Gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
});