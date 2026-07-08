const canUseStorage = storageAvailable('localStorage');

export function saveToStorage(key, data) {
    if (canUseStorage) {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        console.warn("localStorage unavailable — changes won't persist");
    }
}

export function loadFromStorage(key) {
    if (canUseStorage) {
        return JSON.parse(localStorage.getItem(key));
    } 
    
    console.warn("localStorage unavailable");
    return null;
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}