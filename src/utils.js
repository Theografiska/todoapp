// utils.js
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage(key, defaultValue = []) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
}