import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getItem, setItem } from '../../helpers/asyncStorageHelper';
import React, { useState } from 'react';

const Card = ({ props }) => {
    const card = props.card;
    const [ saved, setSaved ] = useState(card.saved);

    const saveTask = async () => {
        const savedTasks = await getItem('savedTasks', true, (_values) => {
            const values = _values || {};
            if (Object.prototype.hasOwnProperty.call(values, card.ID)) {
                delete values[card.ID];
            } else {
                values[card.ID] = card;
            }

            return values;
        });

        await setItem('savedTasks', savedTasks);

        props.card.saved = !saved;
        setSaved(!saved);
    };

    return (
        <View className="flex-1 w-full mt-1 mb-1 border-2 p-2 rounded-md border-gray-300 drop-shadow-xl">
            <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                    <TouchableOpacity onPress={() => saveTask()}>
                        <FontAwesome name={saved ? "bookmark" : "bookmark-o"} size={25} color="#0ea5e9" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="text-gray-500 text-lg ml-2 tracking-tight">Тест {card.ID} - {card.subjectShort}</Text>
                </View>
                <View className="ml-2">
                    { card.result
                        ? <Text className="text-gray-800 text-lg ml-2 font-bold tracking-tight"> {card.result || 0}/{card.maxPoints}</Text>
                        : <Text className="text-red-300 text-lg ml-2 font-bold tracking-tight">../{card.maxPoints}</Text>
                    }
                </View>
            </View>
            <View>
                <Text className="text-gray-800 text-sm tracking-tight">
                    {card.name}
                </Text>
            </View>
            <View className="flex flex-row mr-1 justify-between items-center pt-3">
                <View className="content-center items-center">
                    {
                        card.scheduled &&
                            <Text className="text-gray-400">
                                Доступно до:
                                <Text className="font-bold"> {card.endDate}</Text>
                            </Text>
                    }
                </View>
                <TouchableOpacity
                    className="flex w-1/3 p-2 rounded-md bg-sky-500 px-3 h-10 text-sm leading-6 justify-center"
                    onPress={() => props.navigation.navigate('Details', { testInfo: {...card}, user: props.user })}
                >
                    <Text className="text-center text-white font-bold">Детальніше</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Card;