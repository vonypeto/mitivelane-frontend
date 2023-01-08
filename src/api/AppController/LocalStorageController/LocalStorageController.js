export const setLocalStorage = (itemName, data) => {
  return localStorage.setItem(itemName, JSON.stringify(data));
};

export const getLocalStorage = (itemName) => {
  return JSON.parse(localStorage.getItem(itemName));
};

// For Object, {}
export const setLocalStorageObject = (itemName, data, key) => {
  var localStorageData = JSON.parse(localStorage.getItem(itemName));
  localStorageData[key] = data;

  return localStorage.setItem(itemName, JSON.stringify(localStorageData));
};

// Update Object Value in Object
export const updateLocalStorageObject = (itemName, data, key, childKey) => {
  var localStorageData = JSON.parse(localStorage.getItem(itemName));
  localStorageData[key][childKey] = data;

  return localStorage.setItem(itemName, JSON.stringify(localStorageData));
};
