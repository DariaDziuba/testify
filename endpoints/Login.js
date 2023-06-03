import { Alert } from 'react-native';
import { HOSTNAME, ENDPOINTS } from '../components/Constants';

export const handleLogin = async (data, navigation, setLoading) => {
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
            navigation.navigate('Home');
            setLoading(false);
            break;
        case 401:
            setLoading(false);
            Alert.alert('Помилка', "Перевірте правильність введених даних");
            break;
        default:
            responseData = await response.json();
            setLoading(false);
            console.log(responseData);
            break;
    }
}
