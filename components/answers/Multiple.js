import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

const getAnswers = (answers, selectedValues, proceedSelectedValues) => {
    return answers.map((answer) => {
        const selected = selectedValues.includes(answer.fid);
        return (
            <View className='flex-row items-center' key={"multiple_question_" + answer.fid}>
                <TouchableOpacity className="mr-2" onPress={() => proceedSelectedValues(answer.fid)}>
                    <Ionicons name={selected ? 'checkbox' : 'square-outline'} size={30} color="#0ea5e9" />
                </TouchableOpacity>
                <Text className="text-gray-700 ml-2 mb-2 text-lg leading-none tracking-tight">{answer.text}</Text>
            </View>
        );
    });
};

const Multiple = ({answers, proceed}) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const buttonClasses = 'flex w-2/3 rounded-md text-sm leading-6 h-10 justify-center items-center ';

    const proceedSelectedValues = (value) => {
        const result = selectedValues.includes(value)
            ? selectedValues.filter((selectedValue) => selectedValue != value)
            : [...selectedValues, value];

        setSelectedValues(result);
    };

    let answerComponents = getAnswers(answers, selectedValues, proceedSelectedValues);

    useEffect(() => {
        answerComponents = getAnswers(answers, selectedValues, proceedSelectedValues);
    }, [selectedValues]);

    return (
        <View className="flex-1">
            <ScrollView className="flex-1">
                { answerComponents }
            </ScrollView>

            <View className="w-full items-center">
                <TouchableOpacity
                    disabled={!selectedValues.length}
                    className={buttonClasses + (selectedValues.length ? 'bg-sky-500' : 'bg-gray-300')}
                    onPress={() => proceed(selectedValues)}
                >
                    <Text className="text-center text-white font-bold">Далі</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Multiple;