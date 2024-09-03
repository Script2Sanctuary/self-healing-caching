if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

fetch('/data/data.json')
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.error('Failed to fetch data:', error));

function displayData(data) {
    const list = document.getElementById('data-list');
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title;
        list.appendChild(listItem);
    });
}
