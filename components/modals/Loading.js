import React from 'react';
import { Modal, ActivityIndicator, SafeAreaView } from 'react-native';

const Loading = ({visible}) => {
    return (
        <Modal transparent visible={visible} animationType='fade'>
            <SafeAreaView className="flex-1 bg-grey-transparent justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </SafeAreaView>
        </Modal>
    );
}

export default Loading;