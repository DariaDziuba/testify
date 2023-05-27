import { View, Text, SafeAreaView, TouchableOpacity, AppState } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import SimpleHeader from '../components/screens/SimpleHeader';
import Footer from '../components/screens/Footer';
import LeaveTest from '../components/modals/LeaveTest';
import { setItem } from '../helpers/asyncStorageHelper';
import { useRoute } from '@react-navigation/native';

import React, { useState, useEffect } from 'react'

const Test = (props) => {
    const route = useRoute();
    const params = route.params;
    const testID = params && params.testID;
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState({});

    const leaveTest = (decision) => {
        if (decision) {
            props.navigation.goBack();
        }

        setVisible(false);
    };

    useEffect(() => {
        const handleAppStateChange = (newState) => {
            if (newState === 'inactive') {
                setItem('testInfo', { testID: testID });
                params.showModal();
                props.navigation.goBack();
            }
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView className='flex-1'>
            <LeaveTest visible={visible} leaveTest={ leaveTest }/>
            <SimpleHeader />
            <View className="flex-1 p-2">
                <View className="flex-row items-center mb-2">
                    <TouchableOpacity className="m-1" onPress={() => setVisible(true)}>
                        <Octicons name="arrow-left" size={30} color="#0ea5e9" />
                    </TouchableOpacity>

                    <View className="flex flex-row w-4/5">
                        <View className="justify-center">
                            <Text className="text-gray-700 text-lg ml-2 tracking-tight">
                                Тест {testID}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    )
}

export default Test