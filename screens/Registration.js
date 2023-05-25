import {
    Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import Footer from '../components/screens/Footer';
import Calendar from '../components/modals/Calendar';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';

const Registration = ({navigation}) => {
    const [password, showPassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());

    const showModal = () => {
        setVisible(true);
    }

    const setBirthDateValue = (value) => {
        setBirthDate(value);
    }

    return (
        <SafeAreaView className="flex-1">
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
                                        />
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
                                            required
                                            className="block w-full p-2 rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900"
                                        />
                                    </View>
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
                                            className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                        />
                                    </View>
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
                                                required
                                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                            />
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
                                                required
                                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View className="mt-2 flex-row items-center">
                                        <Text className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                                            По-батькові
                                        </Text>
                                        <Fontisto name="asterisk" size={7} color="red"/>
                                    </View>
                                    <View className="mt-1">
                                        <TextInput
                                            id="fathersName"
                                            name="fathersName"
                                            placeholder="Іванович"
                                            required
                                            className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                                        />
                                    </View>
                                </View>

                                <View className="flex">
                                <View className="mt-2 flex-row items-center">
                                    <Text className="block text-sm font-medium leading-6 text-gray-900 mr-2">Дата народження</Text>
                                </View>
                                <View className="mt-1">
                                    <View className="flex z-10 absolute p-2 h-full w-full right-0">
                                        <TouchableOpacity onPress={() => showModal()} className="h-full w-full justify-center items-end">
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
                                    onPress={() => navigation.navigate('Home')}
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