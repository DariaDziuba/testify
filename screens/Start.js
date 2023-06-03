import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { APP_NAME } from '../components/Constants';
import { getItem } from '../helpers/asyncStorageHelper';
import { getSecureData } from '../helpers/secureStorageHelper';
import { showClosedTestError } from '../helpers/alertHelper';
import { Octicons } from '@expo/vector-icons';
import Loading from '../components/modals/Loading';
import { handleLogin } from '../endpoints/Login';
import React, { useEffect, useState } from 'react'

const Start = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        const checkLastTest = async () => await getItem('testInfo', true, (data) => {
            if (data) {
                showClosedTestError(data.testID);
            };
        });

        const login = async () => {
            const dataRaw = await getSecureData('user');
            if (!dataRaw) {
                return;
            }

            const data = JSON.parse(dataRaw);

            if (data.login && data.password) {
                await handleLogin(data, navigation, setLoading, true);
            }
        }

        login();
        checkLastTest();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-sky-100">
            <Loading visible={loading}/>
            <View className="flex-1 items-center justify-center">
                <View className="flex p-1 items-center">
                    <View className="flex-row p-1 items-center">
                        <View className="m-1">
                            <Octicons name="book" size={40} color="#0ea5e9" />
                        </View>
                        <Text className="text-sky-500 text-3xl font-bold leading-9 tracking-tight">{ APP_NAME }</Text>
                    </View>
                    <View>
                        <Image
                            className="h-80 w-80 opacity-60 rounded-lg"
                            source={require('../assets/start-image.jpg')}
                        />
                    </View>
                </View>
                <View className="w-4/5">
                    <TouchableOpacity
                        className="flex mt-3 w-full rounded-md bg-sky-500 px-3 py-3 text-sm leading-6"
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text className="text-lg text-center text-white font-bold">Вхід</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex bg-transparent w-full rounded-md px-3 py-3 text-sm leading-6"
                        onPress={() => navigation.navigate('Registration')}
                    >
                        <Text className="text-lg font-medium leading-6 text-sky-600 text-center">Реєстрація</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Start