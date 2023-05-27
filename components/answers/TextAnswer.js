import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';

const TextAnswer = ({proceed}) => {
    const [selectedValue, setSelectedValue] = useState('');
    const buttonClasses = 'flex w-2/3 rounded-md text-sm leading-6 h-10 justify-center items-center ';

    const handleTextChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                <View>
                    <View className="flex-row items-center">
                        <Text for="email" className="block text-sm font-medium leading-6 text-gray-900 mr-1">
                            Відповідь
                        </Text>
                        <Fontisto name="asterisk" size={7} color="red"/>
                    </View>
                    <TextInput
                        id="text"
                        name="text"
                        type="text"
                        placeholder="відповідь"
                        onEndEditing={handleTextChange}
                        className="block p-2 w-full rounded-md border-2 border-gray-300 focus:border-sky-500 focus:border-opacity-25 py-3 text-gray-900 ring-1 sm:text-sm sm:leading-6"
                    />
                </View>
            </ScrollView>

            <View className="w-full items-center">
                <TouchableOpacity
                    disabled={!selectedValue}
                    className={buttonClasses + (selectedValue ? 'bg-sky-500' : 'bg-gray-300')}
                    onPress={() => proceed(selectedValue)}
                >
                    <Text className="text-center text-white font-bold">Далі</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TextAnswer;