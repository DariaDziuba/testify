import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS, IS_MOCKED } from '../components/Constants';
import { getItem } from '../helpers/asyncStorageHelper';
import { toTestCards } from '../models/testCards';
import { tasks_info } from '../mocks/tasks';

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
                    const rawTasksInfo = IS_MOCKED ? tasks_info : responseData?.data || [];
                    result = toTestCards(rawTasksInfo);
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
        const savedTasks = await getItem('savedTasks', true);
        result = Object.keys(savedTasks).map((key) => savedTasks[key]);
        Alert.alert('Попередження', "Зв'язок з інтернетом відсутній. Було завантажено збережені тести")
    }

    return result;
}
