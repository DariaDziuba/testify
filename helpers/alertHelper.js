import { Alert } from 'react-native';
import { deleteItem } from './asyncStorageHelper';

export const showClosedTestError = (testID) => {
    Alert.alert('Попередження', `Проходження тесту ${testID} завершено. Поточний результат перед виходом із додатку збережено.`,
        [
            { text: "Добре", onPress: () => deleteItem('testInfo') },
        ]
    );
}

export const showTestBackWarning = (navigation) => {
    Alert.alert('Попередження', 'При спробі завершити тест ваш поточний результат буде збережено!\nВи дійсно бажаєте завершити тестування?',
        [
            { text: "Так", onPress: () => navigation.goBack() },
            { text: "Ні", isPreferred: true }
        ]
    );
};

export const showTestResult = (testID, navigation) => {
    Alert.alert('Результат', `Проходження тесту ${testID} завершено. Ваш результат збережено.`,
        [
            { text: "Добре", onPress: () => navigation.goBack() },
        ]
    );
};