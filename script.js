document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', handleFiles);
document.getElementById('dropZone').addEventListener('dragover', handleDragOver);
document.getElementById('dropZone').addEventListener('drop', handleDrop);

function handleFiles(event) {
    const files = event.target.files || event.dataTransfer.files;
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            saveImage(e.target.result);
            displayImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event);
}

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
    imgElement.addEventListener('click', () => openModal(dataUrl));
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.appendChild(imgElement);
    document.getElementById('gallery').appendChild(galleryItem);
}

function openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = src;
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', loadImages);
