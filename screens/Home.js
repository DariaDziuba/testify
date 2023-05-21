import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Card from '../components/tests/Card';
import Footer from '../components/screens/Footer';
import Header from '../components/screens/Header';
import { test_card, test_cards } from '../test_data/test';
import React, { useState, useEffect } from 'react';

const Home = ({navigation}) => {
    const [cards, setCards] = useState(test_cards);
    const [refreshing, setRefreshing] = useState(false);
    const [filterID, setFilterID] = useState('all');
    const filterStyles = "flex flex-row items-center justify-content border-b-2 h-5/6 p-2 rounded-md ";

    const refresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }

    const filterCards = (filter) => {
        const filteredCards = test_cards.filter((card) => {
            setFilterID(filter);
            switch (filter) {
                case 'evaluated' : return !!card.result;
                case 'scheduled' : return !!card.startDate || !!card.endDate;
                default: return true;
            }
        });

        setCards(filteredCards);
    };

    return (
        <SafeAreaView className="flex-1">
            <Header navigation={navigation} />
            <View className="bg-gray-200 flex flex-row items-center justify-around h-14">
                <TouchableOpacity
                    className={filterStyles + (filterID === 'all' ? 'border-sky-500' : 'border-gray-300')}
                    onPress={() => filterCards('all')}
                >
                    <Octicons name="note" size={25} color="#0ea5e9" />
                    <Text className="text-gray-500 text-lg ml-2 font-bold tracking-tight">Всі</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={filterStyles + (filterID === 'evaluated' ? 'border-sky-500' : 'border-gray-300')}
                    onPress={() => filterCards('evaluated')}
                >
                    <Octicons name="check" size={25} color="#0ea5e9" />
                    <Text className="text-gray-500 text-lg ml-2 font-bold tracking-tight">Оцінені</Text>
                </TouchableOpacity>
                <TouchableOpacity className={filterStyles + (filterID === 'scheduled' ? 'border-sky-500' : 'border-gray-300')}
                    onPress={() => filterCards('scheduled')}
                >
                    <Octicons name="clock" size={25} color="#0ea5e9" />
                    <Text className="text-gray-500 text-lg ml-2 font-bold tracking-tight">Призначенні</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-1">
                <View>
                    <FlatList
                        data={cards}
                        listKey={(item, index) => `_key${index.toString()}`}
                        renderItem={({item}) => <Card props={{card: {...item}, navigation: navigation}}/>}
                        ListEmptyComponent={() => (<Text> No tests!</Text>)}
                        numColumns={1}
                        scrollEnabled={true}
                        className="p-2 h-full"
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    );
}

export default Home