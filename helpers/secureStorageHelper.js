import * as SecureStore from 'expo-secure-store';

export const saveSecureData = async (key, value) => {
    try {
        const valueToSave = value && typeof value !== 'string' ? JSON.stringify(value) : '';
        await SecureStore.setItemAsync(key, valueToSave);
    } catch (error) {
        console.error('Error saving secure data:', error);
    }
};

export const getSecureData = async (key, callback) => {
    try {
        const data = await SecureStore.getItemAsync(key);

        if (callback) {
            return callback(data);
        }

        return data;
    } catch (error) {
        console.log(error)
    }
};

export const deleteSecureData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error('Error clearing secure data:', error);
    }
};