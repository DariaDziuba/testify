import { View, Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { APP_NAME } from '../Constants';
import React from 'react';

const SimpleHeader = () => {
    return (
        <View>
            <View className="h-16 border-b-2 flex flex-row justify-center items-center p-1 border-gray-300">
                <View className="flex flex-row p-1 items-center">
                    <View className="m-1">
                        <Octicons name="book" size={40} color="#0ea5e9" />
                    </View>
                    <Text className="text-sky-500 text-3xl font-bold leading-9 tracking-tight">{ APP_NAME }</Text>
                </View>
            </View>
        </View>
    )
};

export default SimpleHeader;