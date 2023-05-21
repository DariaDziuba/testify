import { Text, View, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import React from 'react';

const Card = ({props}) => {
    const card = props.card;
    return (
        <View className="flex-1 w-full mt-1 mb-1 border-2 p-2 rounded-md border-gray-300 drop-shadow-xl">
            <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                    <Octicons name="bookmark" size={25} color="#0ea5e9" />
                    <Text className="text-gray-500 text-lg ml-2 font-bold tracking-tight">Тест {card.ID}</Text>
                </View>
                <Text className="text-gray-800 text-lg ml-2 font-bold tracking-tight">
                    {card.result || 0}/{card.maxPoints}
                </Text>
            </View>
            <View className="mt-2">
                <Text className="text-gray-800 text-sm tracking-tight">
                    {card.name}
                </Text>
            </View>
            <View className="flex flex-row mr-1 justify-between items-center pt-3">
                <View className="content-center items-center">
                    {
                        card.endDate &&
                            <Text className="text-gray-400">
                                Доступно до:
                                <Text className="font-bold"> {card.endDate}</Text>
                            </Text>
                    }
                </View>
                <TouchableOpacity
                    className="flex w-1/3 p-2 rounded-md bg-sky-500 px-3 h-10 text-sm leading-6 justify-center"
                    onPress={() => props.navigation.navigate('Details', { testInfo: {...card} })}
                >
                    <Text className="text-center text-white font-bold">Детальніше</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Card;