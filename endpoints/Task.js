import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS } from '../components/Constants';
import { setItem } from '../helpers/asyncStorageHelper';

const saveTasks = async (data) => {
    if (!data) {
        return;
    }

    await setItem('tasks', data);
}

export const getTasksInfo = async (data) => {
    let url = HOSTNAME + ENDPOINTS.getTasksInfo;
    let result = [];

    if (data.login) {
        url += '?login=' + data.login;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let responseData = {};

        switch (response.status) {
            case 200:
                responseData = await response.json();
                if (responseData.isSuccess) {
                    result = responseData?.data || [];
                    await saveTasks(result);
                } else {
                    Alert.alert('Помилка', "Щось пішло не так.. Спробуйте ще раз пізніше!");
                }
                break;
            case 400:
                Alert.alert('Помилка', "Спробуйте ще раз пізніше!");
                break;
            default:
                responseData = await response.json();
                console.log(responseData);
                break;
        }
    } catch (error) {
        Alert.alert('Помилка', "Щось пішло не так...")
    }

    return result;
}
