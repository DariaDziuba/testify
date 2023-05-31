import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key, parse, callback) => {
    const result = await AsyncStorage.getItem(key).then((item) => {
        let value = item;
        if (parse) {
            value = item ? JSON.parse(item) : null;
        }

        if (callback) {
            return callback(value);
        }

        return value;
    });

    return result;
};

export const setItem = async(key, value) => {
    const storeItem = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, storeItem);
};

export const deleteItem = async (key, callback) => {
    await AsyncStorage.removeItem(key).then(() => {
        if (callback) {
            callback();
        }
    });
};