import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Subject = ({ props }) => {
    const { subject, onPress, selected } = props
    const [ checked, setChecked ] = useState(selected);
    const handlePress = () => {
        setChecked(!checked);
        onPress(subject);
    };

    return (
        <View className="flex-row items-center mt-1">
            <TouchableOpacity className="mr-2" onPress={handlePress}>
                <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={35} color="#0ea5e9" />
            </TouchableOpacity>
            <Text className="text-gray-500 text-base ml-2 tracking-tight">{subject}</Text>
        </View>
    )
}

export default Subject;