import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

const LeaveTest = ({visible, leaveTest}) => {
    return (
        <Modal transparent visible={visible} animationType='fade'>
            <SafeAreaView className="flex-1 bg-grey-transparent justify-center items-center">
                <View className="bg-white w-4/5 rounded-md p-3">
                    <View>
                        <TouchableOpacity onPress={ () => leaveTest(false) } className="justify-center  items-end z-10">
                            <Octicons name="x" size={30} color="#0ea5e9" />
                        </TouchableOpacity>
                        <View className='flex absolute w-full h-full items-center justify-center flex-row'>
                            <Text className="text-xl ml-2 font-bold tracking-tight text-gray-900">
                                Попередження
                            </Text>
                        </View>
                    </View>

                    <View className="p-2 pr-4">
                        <View className="flex-row items-center w-5/6 mb-3">
                            <Ionicons name="warning-outline" size={30} color="#0ea5e9"/>
                            <Text className="text-gray-800 mb-1 ml-2 text-base leading-4">При спробі завершити тест ваш поточний результат буде збережено!{"\n"}Ви дійсно бажаєте 
                                <Text className="font-bold"> завершити тестування</Text>?
                            </Text>
                        </View>
                    </View>

                    <View className='flex-row justify-around rounded-md border-t-2 pt-2 border-sky-500'>
                        <TouchableOpacity
                            className="flex w-1/3 rounded-md bg-transparent text-sm border-2 border-sky-500 leading-6 h-10 justify-center items-center"
                            onPress={() => leaveTest(true)}
                        >
                            <Text className="text-center text-sky-500 font-bold">Так</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex w-1/3 rounded-md bg-sky-500 text-sm leading-6 h-10 justify-center items-center"
                            onPress={() => leaveTest(false)}
                        >
                            <Text className="text-center text-white font-bold">Ні</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default LeaveTest;