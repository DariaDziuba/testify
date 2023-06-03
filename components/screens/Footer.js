import { Text, View } from 'react-native';
import { APP_NAME } from '../Constants';
import React from 'react';

const Footer = () => {
    return (
        <View className="border-t-2 items-center border-gray-300 bg-gray-100">
            <Text className="text-sky-500 text-lg ml-2 tracking-tight">©2023 { APP_NAME }</Text>
        </View>
    )
}

export default Footer;