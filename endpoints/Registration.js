import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS, ACCOUNT_TYPE } from '../components/Constants';
import { saveSecureData } from '../helpers/secureStorageHelper'

const saveCustomerData = async (data) => {
    if (!data.login || !data.password) {
        return;
    }

    await saveSecureData('user', data)
}

export const handleRegistration = async (data, navigation, setLoading) => {
    const url = HOSTNAME + ENDPOINTS.createUser;
    setLoading(true);

    data.accountType = ACCOUNT_TYPE;
    data.login = data.email;

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
                    await saveCustomerData(data);
                    navigation.navigate('Home', { user: data });
                } else {
                    Alert.alert('Помилка', "Щось пішло не так.. Спробуйте ще раз пізніше!");
                }
                setLoading(false);
                break;
            case 400:
                setLoading(false);
                Alert.alert('Помилка', "Групу із заданим кодом не знайдено!");
                break;
            default:
                responseData = await response.json();
                setLoading(false);
                console.log(responseData);
                break;
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
        Alert.alert('Помилка', "Щось пішло не так... Спробуйте зареєструватись пізніше")
    }
}
