document.addEventListener('DOMContentLoaded', function() {
    // Sample image data (replace with actual API data later)
    const images = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Kathmandu, Nepal',
            description: 'The vibrant streets of Kathmandu at sunset'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop',
            location: 'Everest Base Camp',
            description: 'Majestic view of Mount Everest'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Pokhara, Nepal',
            description: 'Peaceful Phewa Lake at dawn'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=900&fit=crop',
            location: 'Bhaktapur Durbar Square',
            description: 'Ancient architecture of Bhaktapur'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop',
            location: 'Lumbini, Nepal',
            description: 'Birthplace of Lord Buddha'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&h=800&fit=crop',
            location: 'Annapurna Circuit',
            description: 'Stunning views of the Annapurna range'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Chitwan National Park',
            description: 'Wildlife safari in the jungle'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop',
            location: 'Patan Durbar Square',
            description: 'UNESCO World Heritage Site'
        },
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=700&fit=crop',
            location: 'Nagarkot',
            description: 'Panoramic views of the Himalayas'
        },
        {
            id: 10,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=900&fit=crop',
            location: 'Bandipur',
            description: 'Traditional Newari town'
        },
        {
            id: 11,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Langtang Valley',
            description: 'Valley of Glaciers'
        },
        {
            id: 12,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&h=800&fit=crop',
            location: 'Upper Mustang',
            description: 'The Last Forbidden Kingdom'
        },
        {
            id: 13,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Pashupatinath Temple',
            description: 'Sacred Hindu Temple'
        },
        {
            id: 14,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop',
            location: 'Swayambhunath Stupa',
            description: 'Monkey Temple of Kathmandu'
        },
        {
            id: 15,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=700&fit=crop',
            location: 'Boudhanath Stupa',
            description: 'Largest Buddhist Stupa in Nepal'
        },
        {
            id: 16,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=900&fit=crop',
            location: 'Ghorepani Poon Hill',
            description: 'Famous viewpoint in the Annapurna region'
        },
        {
            id: 17,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Tengboche Monastery',
            description: 'Highest monastery in the Everest region'
        },
        {
            id: 18,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&h=800&fit=crop',
            location: 'Gokyo Lakes',
            description: 'Turquoise lakes in the Everest region'
        },
        {
            id: 19,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            location: 'Thamel, Kathmandu',
            description: 'Tourist hub of Nepal'
        },
        {
            id: 20,
            url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop',
            location: 'Dolpo Region',
            description: 'Remote and pristine landscapes'
        }
    ];

    // DOM Elements
    const masonryGrid = document.getElementById('masonryGrid');
    const searchInput = document.getElementById('searchInput');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const closeLightbox = document.querySelector('.close-lightbox');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Initialize gallery
    function initGallery() {
        loadImages(images);
        setupEventListeners();
    }

    // Load images with lazy loading
    function loadImages(imagesToLoad) {
        imagesToLoad.forEach(image => {
            const card = createImageCard(image);
            masonryGrid.appendChild(card);
        });
    }

    // Create image card element
    function createImageCard(image) {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
            <img src="${image.url}" alt="${image.location}" loading="lazy">
            <div class="image-info">
                <h3>${image.location}</h3>
                <p>${image.description}</p>
                <i class="fas fa-heart heart-icon"></i>
            </div>
        `;

        // Add click event for lightbox
        card.addEventListener('click', () => openLightbox(image));

        return card;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', debounce(handleSearch, 300));

        // Lightbox close
        closeLightbox.addEventListener('click', closeLightboxModal);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxModal();
        });

        // Upload button
        document.querySelector('.upload-btn').addEventListener('click', handleUpload);

        // Heart icon click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('heart-icon')) {
                e.target.classList.toggle('fas');
                e.target.classList.toggle('far');
            }
        });
    }

    // Search functionality
    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredImages = images.filter(image => 
            image.location.toLowerCase().includes(searchTerm) ||
            image.description.toLowerCase().includes(searchTerm)
        );

        // Clear and reload grid
        masonryGrid.innerHTML = '';
        loadImages(filteredImages);
    }

    // Lightbox functionality
    function openLightbox(image) {
        lightboxImage.src = image.url;
        lightboxLocation.textContent = image.location;
        lightboxDescription.textContent = image.description;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Upload functionality
    function handleUpload() {
        // This will be implemented when connecting to backend
        console.log('Upload functionality to be implemented');
    }

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize the gallery
    initGallery();
}); 