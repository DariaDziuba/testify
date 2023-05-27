import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Calendar = ({visible, hideModal, setValue}) => {
    const [currentValue, setCurrentValue] = useState(new Date());
    const submit = () => {
        setValue(currentValue.toLocaleDateString('ua-UA'));
        hideModal();
    };

    const onChange = (event, selectedDate) => {
        setCurrentValue(selectedDate);
    };

    return (
        <Modal transparent visible={visible} animationType='fade'>
            <SafeAreaView className="flex-1 bg-grey-transparent justify-center items-center">
                <View className="bg-white w-4/5 rounded-md p-3">
                    <View>
                        <TouchableOpacity onPress={() => hideModal()} className="justify-center  items-end z-10">
                            <Octicons name="x" size={30} color="#0ea5e9" />
                        </TouchableOpacity>
                        <View className='flex absolute w-full h-full items-center'>
                            <Text className="text-lg font-bold tracking-tight text-gray-900">
                                Дата народження
                            </Text>
                        </View>
                    </View>
                    <View className="flex-1">
                        <DateTimePicker
                            testID="dateTimePicker"
                            locale="uk"
                            value={currentValue}
                            maximumDate={new Date()}
                            mode='date'
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}
                        />
                    </View>
                    <TouchableOpacity
                        className="flex w-full rounded-md bg-sky-500 text-sm leading-6 h-10 justify-center items-center"
                        onPress={() => submit()}
                    >
                        <Text className="text-center text-white font-bold">Вибрати</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default Calendar;