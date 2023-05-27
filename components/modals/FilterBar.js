import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { subjects } from '../../mocks/categories';

const getSubjects = (onPress) => {
    const result = [];

    subjects.forEach((subject, index) => {
        const [checked, setChecked] = useState(false);
        result.push(
            <View className="flex-row items-center mt-1" key={"filtered_subjects_" + index}>
                <TouchableOpacity className="mr-2" onPress={() => { setChecked(!checked); onPress(subject)}}>
                    <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={35} color="#0ea5e9" />
                </TouchableOpacity>
                <Text className="text-gray-500 text-base ml-2 tracking-tight">{subject}</Text>
            </View>
        )
    });

    return result;
};

const FilterBar = ({visible, hideModal, options}) => {
    const all_cards = [...options.allCards];
    const [ selectedFilters, setSelectedFilters ] = useState([]);

    const processFilterClick = (filterName) => {
        const result = selectedFilters.includes(filterName)
            ? selectedFilters.filter((selectedFilter) => selectedFilter != filterName)
            : [...selectedFilters, filterName];

        setSelectedFilters(result);
    }

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
                        <ScrollView>
                            <Text className="text-gray-600 text-xl font-bold leading-9 tracking-tight">Предмети</Text>
                            <View className="ml-3">
                                { getSubjects(processFilterClick) }
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
        </Modal>
    )
}

export default FilterBar;