import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = (key, parse, callback) => {
    AsyncStorage.getItem(key).then((item) => {
        let value = item;
        if (parse) {
            value = item ? JSON.parse(item) : null;
        }

        if (callback) {
            callback(value);
        }
    });
};

export const setItem = (key, value) => {
    const storeItem = typeof value === 'string' ? value : JSON.stringify(value);
    AsyncStorage.setItem(key, storeItem);
};

export const deleteItem = (key, callback) => {
    AsyncStorage.removeItem(key).then(() => {
        if (callback) {
            callback();
        }
    });
};