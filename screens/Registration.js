import {
    Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert
} from 'react-native';
import Footer from '../components/screens/Footer';
import Calendar from '../components/modals/Calendar';
import { handleRegistration } from '../endpoints/Registration'
import { Ionicons, Fontisto } from '@expo/vector-icons';
import Loading from '../components/modals/Loading';
import React, { useState } from 'react';

const Registration = ({navigation}) => {
    const [password, showPassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [birthDate, setBirthDate] = useState();
    const notRequired = ['dateOfBirth', 'fathersName'];

    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        inviteCode: '',
        lastName: '',
        firstName: '',
        fathersName: '',
        dateOfBirth: ''
    });

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const setBirthDateValue = (value) => {
        handleInputChange('dateOfBirth', value);
        setBirthDate(value.toLocaleDateString('ua-UA'));
    }

    const handleValidation = (validate) => {
        const errors = {...formErrors};

        switch(validate) {
            case 'email':
                errors.email = formData.email ? '' : 'Заповніть поле';
                if (!errors.email) {
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    errors.email = !errors.email && emailPattern.test(formData.email) ? '' : 'Введіть коректну пошту';
                }
                break;
            case 'password': errors.password = formData.password ? '' : 'Заповніть поле';
                break;
            case 'inviteCode': errors.inviteCode = formData.inviteCode ? '' : 'Заповніть поле';
                break;
            case 'lastName':
                errors.lastName = formData.lastName ? '' : 'Заповніть поле';
                if (!errors.lastName) {
                    errors.lastName = formData.lastName.includes(' ') ? 'Видаліть пробіли' : '';
                }
                break;
            case 'firstName': errors.firstName = formData.firstName ? '' : 'Заповніть поле';
                if (!errors.firstName) {
                    errors.firstName = formData.firstName.includes(' ') ? 'Видаліть пробіли' : '';
                }
                break;
            case 'fathersName':
                errors.fathersName = formData.fathersName && formData.fathersName.length < 5
                    ? 'Введіть коректні дані'
                    : '';
                if (!errors.fathersName) {
                    errors.fathersName = formData.fathersName.includes(' ') ? 'Видаліть пробіли' : '';
                }
                break;
            default: break;
        }

        setFormErrors(errors);
    };

    const register = async () => {
        let hasError = Object.keys(formErrors).find((key) => {
            return !!formErrors[key];
        }) || Object.keys(formData).find((key) => {
            return !formData[key] && !notRequired.includes(key);
        });

        if (hasError) {
            Alert.alert("Помилка", 'Заповніть всі дані!');
            return;
        }

        const data = {};

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data[key] = formData[key];
            }
        })

        await handleRegistration(data, navigation, setLoading);
    }

    return (
        <SafeAreaView className="flex-1">
            <Loading visible={loading}/>
            <Calendar visible={visible} hideModal={() => setVisible(false)} setValue={setBirthDateValue}/>

            <View>
                <Text className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Зареєструватись
                </Text>
            </View>

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <View className="m-3 p-1 rounded-md border-2 border-gray-200">
                            <View className="flex-1">
                                <View>
                                    <View className="flex-row items-center">
                                        <Text for="email" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                            Електронна пошта
                                        </Text>
                                        <Fontisto name="asterisk" size={7} color="red"/>
                                    </View>
                                    <View className="mt-1">
                                        <TextInput
                                            id="email"
                                            name="email"
                                            inputMode="email"
                                            autocomplete="email"
                                            placeholder="test@vntu.edu.ua"
                                            required
                                            className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                            onChangeText={(text) => handleInputChange('email', text)}
                                            onBlur={() => handleValidation('email')}
                                        />
                                        { formErrors.email &&
                                            <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.email}</Text>
                                        }
                                    </View>
                                </View>

                                <View className="flex">
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
                                            onBlur={() => handleValidation('password')}
                                            required
                                            className="block w-full p-2 rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900"
                                        />
                                    </View>
                                    { formErrors.password &&
                                        <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.password}</Text>
                                    }
                                </View>

                                <View>
                                    <View className="mt-2 flex-row items-center">
                                        <Text className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                            Код запрошення
                                        </Text>
                                        <Fontisto name="asterisk" size={7} color="red"/>
                                    </View>
                                    <View className="mt-1">
                                        <TextInput
                                            id="inviteCode"
                                            name="inviteCode"
                                            placeholder=""
                                            required
                                            onChangeText={(text) => handleInputChange('inviteCode', text)}
                                            onBlur={() => handleValidation('inviteCode')}
                                            className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                        />
                                    </View>
                                    { formErrors.inviteCode &&
                                        <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.inviteCode}</Text>
                                    }
                                </View>

                                <View className="flex flex-row justify-around">
                                    <View className="w-1/2 mr-1">
                                        <View className="mt-2 flex-row items-center">
                                            <Text className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                                Прізвище
                                            </Text>
                                            <Fontisto name="asterisk" size={7} color="red"/>
                                        </View>
                                        <View className="mt-1">
                                            <TextInput
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Іванов"
                                                onChangeText={(text) => handleInputChange('lastName', text)}
                                                onBlur={() => handleValidation('lastName')}
                                                required
                                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                            />
                                            { formErrors.lastName &&
                                                <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.lastName}</Text>
                                            }
                                        </View>
                                    </View>

                                    <View className="w-1/2 ml-1">
                                        <View className="mt-2 flex-row items-center">
                                            <Text className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                                Ім'я
                                            </Text>
                                            <Fontisto name="asterisk" size={7} color="red"/>
                                        </View>
                                        <View className="mt-1">
                                            <TextInput
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Іван"
                                                onChangeText={(text) => handleInputChange('firstName', text)}
                                                onBlur={() => handleValidation('firstName')}
                                                required
                                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                            />
                                            { formErrors.firstName &&
                                                <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.firstName}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View className="mt-2 flex-row items-center">
                                        <Text className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                            По-батькові
                                        </Text>
                                    </View>
                                    <View className="mt-1">
                                        <TextInput
                                            id="fathersName"
                                            name="fathersName"
                                            placeholder="Іванович"
                                            onChangeText={(text) => handleInputChange('fathersName', text)}
                                            onBlur={() => handleValidation('fathersName')}
                                            required
                                            className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                        />
                                        { formErrors.fathersName &&
                                            <Text className="block text-xs leading-6 text-red-500 mr-1"> {formErrors.fathersName}</Text>
                                        }
                                    </View>
                                </View>

                                <View className="flex">
                                <View className="mt-2 flex-row items-center">
                                    <Text className="block text-sm font-medium leading-6 text-gray-900 mr-2">Дата народження</Text>
                                </View>
                                <View className="mt-1">
                                    <View className="flex z-10 absolute p-2 h-full w-full right-0">
                                        <TouchableOpacity onPress={() => setVisible(true)} className="h-full w-full justify-center items-end">
                                            <Ionicons name={'calendar'} size={25} color="grey"/>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        type="date"
                                        placeholder="дд.мм.рррр"
                                        value={birthDate}
                                        editable={false}
                                        required
                                        className="block w-full p-2 rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900"
                                    />
                                </View>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    type="submit"
                                    className="flex mt-3 w-full rounded-md bg-sky-500 px-3 py-3 text-sm leading-6"
                                    onPress={register}
                                >
                                    <Text className="text-center text-white font-bold">Далі</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    type="submit"
                                    className="flex w-full rounded-md bg-transparent px-3 py-3 text-sm leading-6"
                                    onPress={() => navigation.navigate('Login')}
                                >
                                <View className="flex-row justify-center">
                                    <Text className="text-center text-sky-600 font-medium">Вже є акаунт? </Text>
                                    <Text className="text-center text-sky-600 font-medium underline">Вхід</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <View>
                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default Registration