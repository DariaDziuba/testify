import { SafeAreaView, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Octicons, Fontisto } from '@expo/vector-icons';
import Footer from '../components/screens/Footer';
import Header from '../components/screens/Header';
import FilterBar from '../components/modals/FilterBar';
import { test_card, test_cards } from '../mocks/test';
import { toTestCards } from '../models/testCards';
import NoTests from '../components/screens/NoTests';
import React, { useState, useEffect } from 'react';

const Card = React.lazy(() => import('../components/tests/Card'));

const Home = ({navigation}) => {
    const [allCards, setAllCards] = useState([]);
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filterID, setFilterID] = useState('all');
    const [visible, setVisible] = useState(false);
    const filterStyles = "flex flex-row items-center justify-content border-b-2 h-5/6 p-2 ml-1 ";

    useEffect(() => {
        setRefreshing(true);
        const fetchData = async () => {
            const result  = await toTestCards(test_cards);

            setAllCards(result);
            setCards(result);
            setFilteredCards(result);
            setRefreshing(false);
        };

        fetchData();
    }, []);

    const refresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const filterCards = (filter, cardsToFilter) => {
        setFilterID(filter);

        const result = (cardsToFilter || cards).filter((card) => {
            switch (filter) {
                case 'evaluated' : return !!card.evaluated;
                case 'scheduled' : return !!card.scheduled;
                case 'saved' : return !!card.saved;
                default: return true;
            }
        });

        setFilteredCards(result);
    };

    const updateCards = (cards) => {
        setCards(cards);
        filterCards(filterID, cards);
    }


    return (
        <SafeAreaView className="flex-1">
            <FilterBar
                visible={visible}
                hideModal={() => setVisible(false)}
                options={{allCards: allCards, setCards: updateCards}}
            />

            <Header navigation={navigation} />
            <View className="bg-gray-200 flex flex-row items-center justify-around h-14">
                <View className="m-1">
                    <TouchableOpacity
                        className="flex flex-row items-center justify-content border-r-2 h-5/6 p-2 border-gray-300"
                        onPress={() => setVisible(true)}
                    >
                            <Fontisto name="filter" size={20} color="#0ea5e9" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-1 h-full ml-1">
                    <TouchableOpacity
                        className={filterStyles + (filterID === 'all' ? 'border-sky-500' : 'border-gray-300')}
                        onPress={() => filterCards('all')}
                    >
                        <Octicons name="note" size={20} color="#0ea5e9" />
                        <Text className="text-gray-500 text-base ml-2 font-bold tracking-tight">Всі</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={filterStyles + (filterID === 'evaluated' ? 'border-sky-500' : 'border-gray-300')}
                        onPress={() => filterCards('evaluated')}
                    >
                        <Octicons name="check" size={20} color="#0ea5e9" />
                        <Text className="text-gray-500 text-base ml-2 font-bold tracking-tight">Оцінені</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={filterStyles + (filterID === 'scheduled' ? 'border-sky-500' : 'border-gray-300')}
                        onPress={() => filterCards('scheduled')}
                    >
                        <Octicons name="clock" size={20} color="#0ea5e9" />
                        <Text className="text-gray-500 text-base ml-2 font-bold tracking-tight">Призначенні</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={filterStyles + (filterID === 'saved' ? 'border-sky-500' : 'border-gray-300')}
                        onPress={() => filterCards('saved')}
                    >
                        <Octicons name="bookmark" size={20} color="#0ea5e9" />
                        <Text className="text-gray-500 text-base ml-2 font-bold tracking-tight">Збережені</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View className="flex-1">
                <View>
                    <FlatList
                        data={filteredCards}
                        listKey={(item, index) => `_key${index.toString()}`}
                        renderItem={({item}) => <Card props={{card: item, navigation: navigation}}/>}
                        ListEmptyComponent={() => (<NoTests />)}
                        numColumns={1}
                        scrollEnabled={true}
                        className="p-2 h-full flex"
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