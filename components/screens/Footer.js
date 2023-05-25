import { Text, View } from 'react-native';
import React, { Component } from 'react';

const Footer = () => {
    return (
        <View className="border-t-2 items-center border-gray-300">
            <Text className="text-sky-500 text-lg ml-2 tracking-tight">©2023 TestifyApp</Text>
        </View>
    )
}

export default Footer;