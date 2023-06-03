import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS } from '../components/Constants';
import { saveSecureData, deleteSecureData } from '../helpers/secureStorageHelper'

const saveCustomerData = async (data) => {
    if (!data.login || !data.password) {
        return;
    }

    await saveSecureData('credentials', data)
}

export const handleLogin = async (data, navigation, setLoading, autoLogin) => {
    const url = HOSTNAME + ENDPOINTS.checkUserCredentials;
    setLoading(true);
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
            await saveCustomerData(data);
            navigation.navigate('Home');
            setLoading(false);
            break;
        case 401:
            setLoading(false);
            if (autoLogin) {
                await deleteSecureData('credentials');
            } else {
                Alert.alert('Помилка', "Перевірте правильність введених даних");
            }
            break;
        default:
            responseData = await response.json();
            if (autoLogin) {
                await deleteSecureData('credentials');
            }
            setLoading(false);
            console.log(responseData);
            break;
    }
}
