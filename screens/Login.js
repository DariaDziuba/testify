import { Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Footer from '../components/screens/Footer';
import Loading from '../components/modals/Loading';
import { handleLogin } from '../endpoints/Login';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';

const Home = ({navigation}) => {
    const [password, showPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkUserCredentials = async () => {
        let hasError = Object.keys(formErrors).find((key) => {
            return !!formErrors[key];
        });

        if (hasError || !formData.login || !formData.password) {
            Alert.alert("Помилка", 'Заповніть всі дані!');
            return;
        }

        await handleLogin(formData, navigation, setLoading)
    }

    const handleValidation = (validate) => {
        const errors = {...formErrors};

        switch(validate) {
            case 'login': errors.login = formData.login ? '' : 'Заповніть поле';
                if (!errors.login) {
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    errors.login = !errors.login && emailPattern.test(formData.login) ? '' : 'Введіть коректну пошту';
                }
                break;
            case 'password': errors.password = formData.password ? '' : 'Заповніть поле';
                break;
            default:
                errors.login = formData.login ? '' : 'Заповніть поле';
                errors.password = formData.password ? '' : 'Заповніть поле';
                break;
        }

        setFormErrors(errors);
    };

    return (
        <SafeAreaView className="flex-1">
            <Loading visible={loading}/>
            <View>
                <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Вхід
                </Text>
            </View>

            <View className="flex-1">
                <View className="m-3 p-5 sm:mx-auto sm:w-full sm:max-w-sm rounded-md border-2 border-gray-200">
                    <View>
                        <View className="flex-row items-center">
                            <Text for="login" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                Електронна пошта
                            </Text>
                            <Fontisto name="asterisk" size={7} color="red"/>
                        </View>
                        <View className="mt-1">
                            <TextInput
                                id="login"
                                name="login"
                                type="login"
                                autocomplete="login"
                                placeholder="test@vntu.edu.ua"
                                onChangeText={(text) => handleInputChange('login', text)}
                                onEndEditing={() => handleValidation('login')}
                                required
                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                            />
                            { formErrors.login &&
                                <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.login}</Text>
                            }
                        </View>
                    </View>

                    <View className="flex mb-3">
                        <View className="mt-2 flex-row items-center">
                            <Text className="block text-sm font-medium leading-6 text-gray-900 mr-2">Пароль</Text>
                            <Fontisto name="asterisk" size={7} color="red"/>
                        </View>
                        <View className="mt-1">
                            <View className="flex z-10 absolute p-2 h-full right-0 justify-center">
                                <TouchableOpacity onPress={() => showPassword(!password)}>
                                    <Ionicons name={password ? 'md-eye-off' : 'md-eye'} size={25} color="grey"/>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                secureTextEntry={password}
                                autocomplete="current-password"
                                placeholder="Qwerty123"
                                onChangeText={(text) => handleInputChange('password', text)}
                                onEndEditing={() => handleValidation('password')}
                                required
                                className="block w-full p-2 rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900"
                            />
                        </View>
                        { formErrors.password &&
                            <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.password}</Text>
                        }
                    </View>

                    <View>
                        <TouchableOpacity
                            type="submit"
                            className="flex mt-3 w-full rounded-md bg-sky-500 px-3 py-3 text-sm leading-6"
                            onPress={checkUserCredentials}
                        >
                            <Text className="text-center text-white font-bold">Вхід</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            type="submit"
                            className="flex w-full rounded-md bg-transparent px-3 py-3 text-sm leading-6"
                            onPress={() => navigation.navigate('Registration')}
                        >
                            <View className="flex-row justify-center">
                            <Text className="text-sm font-medium leading-6 text-sky-600 text-right">Немає акаунта?</Text>
                            <Text className="text-sm font-medium leading-6 text-sky-600 text-right underline"> Реєстрація</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default Home