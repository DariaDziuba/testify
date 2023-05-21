import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Footer from '../components/screens/Footer';
import { Ionicons} from '@expo/vector-icons';
import React, { useState } from 'react';

const Home = ({navigation}) => {
    const [password, showPassword] = useState(true);

    return (
        <SafeAreaView className="flex-1">
            <View className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Text className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Вітаємо!
                </Text>
            </View>

            <View className="flex-1">
                <View className="m-3 p-5 sm:mx-auto sm:w-full sm:max-w-sm rounded-md border-2 border-gray-200">
                    <View>
                        <Text for="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Електронна пошта
                        </Text>
                        <View className="mt-1">
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                placeholder="test@vntu.edu.ua"
                                required
                                className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                            />
                        </View>
                    </View>

                    <View className="flex">
                        <View className="mt-2">
                            <Text className="block text-sm font-medium leading-6 text-gray-900">Пароль</Text>
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
                                placeholder="password"
                                required
                                className="block w-full p-2 rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900"
                            />
                        </View>
                        <TouchableOpacity>
                            <Text className="text-sm font-medium leading-6 text-sky-600 text-right underline">Забули пароль?</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            type="submit"
                            className="flex mt-3 w-full rounded-md bg-sky-500 px-3 py-3 text-sm leading-6"
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text className="text-center text-white font-bold">Вхід</Text>
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