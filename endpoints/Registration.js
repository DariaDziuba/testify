import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS, ACCOUNT_TYPE } from '../components/Constants';

export const handleRegistration = async (data, navigation, setLoading) => {
    const url = HOSTNAME + ENDPOINTS.createUser;
    setLoading(true);

    data.accountType = ACCOUNT_TYPE;
    data.login = data.email;

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
            navigation.navigate('Home');
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
}
