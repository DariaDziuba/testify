import { View, Text } from 'react-native'
import React from 'react'

const NoTests = () => {
    return (
        <View className="flex-1 items-center">
            <Text className="text-sky-600 text-base ml-2 font-bold tracking-tight">
                Тестів не знайдено
            </Text>
        </View>
    )
}

export default NoTests