import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/screens/Header';
import TestWasClosed from '../components/modals/TestWasClosed';
import Footer from '../components/screens/Footer';
import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const getTopics = (topics) => {
    const result = [];

    if (topics) {
        topics.forEach((topic, index) => {
            if (topic) {
                result.push(
                    <View key={"topic_" + index} className="flex-row p-2 items-center">
                        <Octicons name="tag" size={17} color="grey" />
                        <Text className="text-gray-700 mb-1 text-base ml-2 tracking-tight">
                            {topic}
                        </Text>
                    </View>
                );
            }
        });
    }

    return result;
}

const Details = (props) => {
    const { testInfo } = props.route.params;
    const isEvaluated = !!testInfo.result;
    const [visible, setVisible] = useState(false);

    return (
        <SafeAreaView className="flex flex-1">
            <TestWasClosed visible={visible} hideModal={() => setVisible(false)} testID={testInfo.ID}/>
            <View>
                <Header navigation={props.navigation}/>
            </View>
            <View className="p-2 flex-1">
                <View className="flex-row items-center mb-2">
                    <TouchableOpacity className="m-1" onPress={() => props.navigation.goBack()}>
                        <Octicons name="arrow-left" size={30} color="#0ea5e9" />
                    </TouchableOpacity>

                    <View className="flex flex-row w-4/5">
                        <View className="justify-center">
                            <Text className="text-gray-700 text-lg ml-2 tracking-tight">
                                Тест {testInfo.ID} -
                            </Text>
                        </View>
                        <View className="justify-center w-4/5">
                            <Text numberOfLines={1} ellipsizeMode="tail" className="text-gray-500 text-lg ml-2 tracking-tight">
                                {testInfo.subject}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text className="text-gray-900 text-lg font-bold ml-2 leading-none text-center tracking-tight">
                        {testInfo.name.toUpperCase()}
                    </Text>
                </View>
                <View className="flex-1 p-2">
                    <View>
                        {isEvaluated &&
                            <View className="flex-row items-center">
                                <Octicons name="zap" size={22} color="#0ea5e9" />
                                <Text className="text-gray-900 ml-2 text-lg leading-none tracking-tight">
                                    Оцінка: {testInfo.result + '/' + testInfo.maxPoints}
                                </Text>
                            </View>
                        }
                    </View>
                    <View className="flex-row items-center">
                        <Octicons name="question" size={22} color="#0ea5e9" />
                        <Text className="text-gray-900 ml-2 text-lg leading-none tracking-tight">
                            Кількість тестових питань: {testInfo.questions}
                        </Text>
                    </View>
                    <View className="flex-1">
                        {testInfo.topics && testInfo.topics.length &&
                            <View>
                                <View className="flex-row items-center">
                                    <Octicons name="pin" size={22} color="#0ea5e9" />
                                    <Text className="text-gray-900 ml-2 text-lg leading-none tracking-tight">Теми для проходження:</Text>
                                </View>
                                <ScrollView>
                                    <View className="pr-3">
                                        { getTopics(testInfo.topics) }
                                    </View>
                                </ScrollView>
                            </View>
                        }
                    </View>
                </View>
                {!isEvaluated &&
                    <View>
                        <TouchableOpacity
                            className="flex  p-2 rounded-md bg-sky-500 px-3 h-10 text-sm leading-6 justify-center"
                            onPress={() => {
                                props.navigation.navigate('Test', { testID: testInfo.ID, showModal: () => setVisible(true)});
                            }}
                        >
                            <Text className="text-center text-white font-bold">Розпочати тест!</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View>
                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default Details