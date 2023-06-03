import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS } from '../components/Constants';
import { saveSecureData, deleteSecureData, getSecureData } from '../helpers/secureStorageHelper'

const saveCustomerData = async (data) => {
    if (!data.login || !data.password) {
        return;
    }

    await saveSecureData('user', data)
}

export const handleLogin = async (data, navigation, setLoading, autoLogin) => {
    const url = HOSTNAME + ENDPOINTS.checkUserCredentials;
    setLoading(true);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let responseData = {};

        switch (response.status) {
            case 200:
                responseData = await response.json();
                if (responseData.isSuccess) {
                    const user = responseData?.data?.userInfo || null;
                    await saveCustomerData(user);
                    navigation.navigate('Home', { user: user });
                } else {
                    Alert.alert('Помилка', "Щось пішло не так.. Спробуйте ще раз пізніше!");
                }
                setLoading(false);
                break;
            case 401:
                setLoading(false);
                if (autoLogin) {
                    await deleteSecureData('user');
                } else {
                    Alert.alert('Помилка', "Перевірте правильність введених даних");
                }
                break;
            default:
                responseData = await response.json();
                if (autoLogin) {
                    await deleteSecureData('user');
                }
                setLoading(false);
                Alert.alert('Помилка', "Щось пішло не так.. Спробуйте ще раз пізніше!");
                console.log(responseData);
                break;
        }
    } catch (error) {
        const dataRaw = await getSecureData('user');
        if (!dataRaw) {
            return;
        }

        const data = JSON.parse(dataRaw);

        if (data.login && data.password) {
            navigation.navigate('Home', { user: user });
        }
    }
}
