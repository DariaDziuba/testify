import { View, Text, TouchableOpacity } from 'react-native';
import { student } from '../../mocks/students';
import { Octicons } from '@expo/vector-icons';
import React from 'react';

const Header = (props) => {
    return (
        <View>
            <View className="h-16 border-b-2 flex flex-row justify-between items-center p-1 border-gray-300">
                <View className="flex flex-row p-1 items-center">
                    <View className="m-1">
                        <Octicons name="book" size={40} color="#0ea5e9" />
                    </View>
                    <Text className="text-sky-500 text-3xl font-bold leading-9 tracking-tight">TESTIFY</Text>
                </View>
                <View className="flex flex-row items-center">
                    <View>
                        <Text className="text-gray-800 text-base mr-2 font-bold tracking-tight">
                            {student.surname} {student.name}
                        </Text>
                        <Text className="text-gray-400 text-xs m-0 font-bold tracking-tight -mt-1">{student.group}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}className="pt-1 ml-2 mr-2">
                        <Octicons name="sign-out" size={28} color="#0ea5e9" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default Header;