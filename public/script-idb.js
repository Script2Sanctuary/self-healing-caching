let db;
const request = indexedDB.open('data-cache', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore('articles', { keyPath: 'id' });
    objectStore.createIndex('title', 'title', { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;
    fetchData();
};

request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.errorCode);
};

function fetchData() {
    fetch('/data/data.json')
        .then(response => response.json())
        .then(data => {
            saveToIndexedDB(data);
            displayData(data);
        })
        .catch(() => {
            loadFromIndexedDB();
        });
}

function saveToIndexedDB(data) {
    const transaction = db.transaction(['articles'], 'readwrite');
    const objectStore = transaction.objectStore('articles');
    data.forEach((item) => {
        objectStore.put(item);
    });
}

function loadFromIndexedDB() {
    const transaction = db.transaction(['articles'], 'readonly');
    const objectStore = transaction.objectStore('articles');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        displayData(event.target.result);
    };
}

function displayData(data) {
    const list = document.getElementById('data-list');
    list.innerHTML = '';
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title;
        list.appendChild(listItem);
    });
}
