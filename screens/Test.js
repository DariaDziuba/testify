import { View, Text, SafeAreaView, TouchableOpacity, AppState, Alert } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import SimpleHeader from '../components/screens/SimpleHeader';
import Footer from '../components/screens/Footer';
import { questions } from '../mocks/questions';
import { setItem } from '../helpers/asyncStorageHelper';
import { useRoute } from '@react-navigation/native';
import Single from '../components/answers/Single';
import Multiple from '../components/answers/Multiple';
import TextAnswer from '../components/answers/TextAnswer';
import { showTestResult, showTestBackWarning, showClosedTestError } from '../helpers/alertHelper';

import React, { useState, useEffect } from 'react';

const getVariants = (type, answers, proceed) => {
    switch(type) {
        case 'single': return <Single answers={answers} proceed={proceed} />
        case 'multiple': return <Multiple answers={answers} proceed={proceed} />
        case 'text': return <TextAnswer answers={answers} proceed={proceed} />
        default: return <Text>Hello</Text>
    }
};

const Test = (props) => {
    const route = useRoute();
    const params = route.params;
    const testID = params && params.testID;
    const [result, setResult] = useState({});
    const [activeTest, setActiveTest] = useState(0);
    let question = questions[activeTest];

    const proceed = (answer) => {
        setResult({...result, [question.id]: answer});
        if (questions.length - 1 > activeTest) {
            setActiveTest(activeTest + 1);
        } else {
            showTestResult(testID, props.navigation);
        }
    };

    useEffect(() => {
        const handleAppStateChange = (newState) => {
            if (newState === 'inactive') {
                setItem('testInfo', { testID: testID });
                props.navigation.goBack();
                showClosedTestError(testID);
            }
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView className='flex-1'>
            <SimpleHeader />
            <View className="flex-1 p-2">
                <View className="flex-row items-center mb-2">
                    <TouchableOpacity className="m-1" onPress={() => showTestBackWarning(props.navigation)}>
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
                <View className="flex-1 p-2">
                    <View className="justify-center items-center mb-2">
                        <Text className="text-sky-500 text-3xl font-bold leading-9 tracking-tight">Питання №{question.id}</Text>
                    </View>

                    <View>
                        <Text className="text-gray-900 ml-2 mb-2 text-xl leading-none tracking-tight">{question.title}</Text>
                    </View>

                    {getVariants(question.type, question.answers, proceed)}
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    )
}

export default Test