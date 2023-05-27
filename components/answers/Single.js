import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

const getAnswers = (answers, selectedValue, setSelectedValue) => {
    return answers.map((answer) => {
        const selected = answer.fid === selectedValue;
        return (
            <View className='flex-row items-center' key={"single_question_" + answer.fid}>
                <TouchableOpacity className="mr-2" onPress={() => setSelectedValue(answer.fid)}>
                    <Ionicons name={selected ? 'radio-button-on' : 'radio-button-off'} size={30} color="#0ea5e9" />
                </TouchableOpacity>
                <Text className="text-gray-700 ml-2 mb-2 text-lg leading-none tracking-tight">{answer.text}</Text>
            </View>
        );
    });
};

const Single = ({answers, proceed}) => {
    const [selectedValue, setSelectedValue] = useState('');
    let answerComponents = getAnswers(answers, selectedValue, setSelectedValue);
    const buttonClasses = 'flex w-2/3 rounded-md text-sm leading-6 h-10 justify-center items-center ';

    useEffect(() => {
        answerComponents = getAnswers(answers, selectedValue, setSelectedValue);
    }, [selectedValue]);

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                { answerComponents }
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

export default Single;