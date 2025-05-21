document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.querySelector('.preview-area');
    const removeBtn = document.querySelector('.remove-btn');
    const locationInput = document.getElementById('location');
    const descriptionInput = document.getElementById('description');
    const tagsInput = document.getElementById('tags');
    const tagsContainer = document.querySelector('.tags-container');
    const errorMessage = document.querySelector('.error-message');
    const submitBtn = document.querySelector('.submit-btn');

    let selectedFile = null;
    let tags = new Set();

    // Drag and Drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.classList.add('drag-over');
    }

    function unhighlight() {
        uploadArea.classList.remove('drag-over');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // File input change handler
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                selectedFile = file;
                displayPreview(file);
                errorMessage.textContent = '';
            } else {
                errorMessage.textContent = 'Please select an image file';
            }
        }
    }

    function displayPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewArea.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-btn" title="Remove image">
                    <i class="fas fa-times"></i>
                </button>
            `;
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Remove image handler
    previewArea.addEventListener('click', (e) => {
        if (e.target.closest('.remove-btn')) {
            selectedFile = null;
            previewArea.innerHTML = '';
            previewArea.style.display = 'none';
            uploadArea.style.display = 'block';
            fileInput.value = '';
        }
    });

    // Tags management
    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagsInput.value.trim();
            if (tag && !tags.has(tag)) {
                addTag(tag);
                tagsInput.value = '';
            }
        }
    });

    function addTag(tag) {
        tags.add(tag);
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerHTML = `
            ${tag}
            <i class="fas fa-times" data-tag="${tag}"></i>
        `;
        tagsContainer.appendChild(tagElement);
    }

    tagsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-times')) {
            const tag = e.target.dataset.tag;
            tags.delete(tag);
            e.target.parentElement.remove();
        }
    });

    // Form submission
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            errorMessage.textContent = 'Please select an image';
            return;
        }

        if (!locationInput.value.trim()) {
            errorMessage.textContent = 'Please enter a location';
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('location', locationInput.value.trim());
        formData.append('description', descriptionInput.value.trim());
        formData.append('tags', Array.from(tags).join(','));
        formData.append('privacy', document.querySelector('input[name="privacy"]:checked').value);

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

            // Replace with your actual API endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = '/gallery.html';
            } else {
                const data = await response.json();
                errorMessage.textContent = data.message || 'Upload failed';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred during upload';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Share Photo';
        }
    });
}); 