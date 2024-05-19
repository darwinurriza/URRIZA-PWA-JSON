document.addEventListener('DOMContentLoaded', function () {
    const homeTab = document.getElementById('home');
    const galleryTab = document.getElementById('gallery');
    const aboutTab = document.getElementById('about');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const userData = document.getElementById('userData');
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                li.classList.add('list-group-item');
                userData.appendChild(li);
            });
        });

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            const photoData = document.getElementById('photoData');
            data.forEach(photo => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item', 'card');

                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.title;
                img.classList.add('card-img-top');

                const caption = document.createElement('div');
                caption.textContent = photo.title;
                caption.classList.add('card-body', 'card-text');

                galleryItem.appendChild(img);
                galleryItem.appendChild(caption);

                photoData.appendChild(galleryItem);
            });
        });

    homeTab.classList.remove('d-none');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            homeTab.classList.add('d-none');
            galleryTab.classList.add('d-none');
            aboutTab.classList.add('d-none');

            if (link.getAttribute('href') === '#home') {
                homeTab.classList.remove('d-none');
            } else if (link.getAttribute('href') === '#gallery') {
                galleryTab.classList.remove('d-none');
            } else if (link.getAttribute('href') === '#about') {
                aboutTab.classList.remove('d-none');
            }
        });
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }
});
