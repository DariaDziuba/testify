import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Subject from '../subjects/Subject';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getSubjects } from '../../endpoints/Subjects';

const NoSubjects = () => {
    return (
        <View>
            <Text className="text-gray-500 text-base ml-2 tracking-tight">Предметів не визначено</Text>
        </View>
    );
}

const FilterBar = ({visible, hideModal, options, user}) => {
    const all_cards = [...options.allCards];
    const [ selectedFilters, setSelectedFilters ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);

    const processFilterClick = (filterName) => {
        console.log(selectedFilters)
        const result = selectedFilters.includes(filterName)
            ? selectedFilters.filter((selectedFilter) => selectedFilter != filterName)
            : [...selectedFilters, filterName];

        setSelectedFilters(result);
    }

    useEffect(() => {
        const getCategories = async () => {
            let data = await getSubjects(user);
            let result = data.map((subject) => subject.subjectLongName);

            setSubjects(result);
        };

        getCategories();
    }, [])

    const getFilteredCards = () => {
        if (!selectedFilters.length) {
            return all_cards;
        }

        const result = all_cards.filter((card) => {
            return selectedFilters.includes(card.subject);
        });

        return result;
    };

    const submit = () => {
        const result = getFilteredCards();
        options.setCards(result);
        hideModal();
    };

    return (
        <Modal transparent={true} visible={visible} animationType='fade'>
            <View className="flex-1 bg-grey-transparent justify-items-start">
                <SafeAreaProvider className="flex-1 bg-white w-4/5 rounded-md ">
                    <SafeAreaView className="flex-1 p-3">
                        <View className="flex-row justify-between">
                            <Text className="text-sky-500 text-3xl font-bold leading-9 tracking-tight">Фільтрування</Text>
                            <TouchableOpacity
                                className="h-full w-1/6 items-center justify-start"
                                onPress={() => submit()}
                            >
                                <Ionicons name="close" size={40} color="#0ea5e9" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-gray-600 text-xl font-bold leading-9 tracking-tight">Предмети</Text>
                            { subjects.length && <FlatList
                                data={subjects}
                                listKey={(item, index) => `_key${index.toString()}`}
                                renderItem={({item}) => <Subject props={{subject: item, onPress: processFilterClick, selected: selectedFilters.includes(item)}} />}
                                ListEmptyComponent={() => NoSubjects()}
                                numColumns={1}
                                scrollEnabled={true}
                                className="ml-3"
                            />}
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    )
}

export default FilterBar;