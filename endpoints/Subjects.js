import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS, IS_MOCKED } from '../components/Constants';
import { setItem } from '../helpers/asyncStorageHelper';
import { subjects } from '../mocks/categories';

const saveSubjects = async (data) => {
    if (!data) {
        return;
    }

    await setItem('subjects', data);
}

export const getSubjects = async (data, ) => {
    let url = HOSTNAME + ENDPOINTS.getSubjects;
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
                    result = IS_MOCKED ? subjects : responseData?.data || [];
                    await saveSubjects(result);
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
