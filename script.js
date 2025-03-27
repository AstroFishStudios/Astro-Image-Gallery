document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const files = document.getElementById('fileInput').files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                saveImage(e.target.result);
                displayImage(e.target.result);
            };
        })(files[i]);
        reader.readAsDataURL(files[i]);
    }
});

function saveImage(dataUrl) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(dataUrl);
    localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(displayImage);
}

function displayImage(dataUrl) {
    const imgElement = document.createElement('img');
    imgElement.src = dataUrl;
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.appendChild(imgElement);
    document.getElementById('gallery').appendChild(galleryItem);
}

document.addEventListener('DOMContentLoaded', loadImages);
