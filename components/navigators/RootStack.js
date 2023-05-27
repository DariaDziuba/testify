import React from 'react';

//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Start from './../../screens/Start';
import Home from './../../screens/Home';
import Login from '../../screens/Login';
import Registration from '../../screens/Registration';
import Details from '../../screens/Details';
import Test from '../../screens/Test';

const { Navigator, Screen } = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Start"
                screenOptions={screenOptions}
            >
                <Screen name="Start" component={Start}/>
                <Screen name="Home" component={Home}/>
                <Screen name="Login" component={Login}/>
                <Screen name="Registration" component={Registration}/>
                <Screen name="Details" component={Details}/>
                <Screen name="Test" component={Test}/>
            </Navigator>
        </NavigationContainer>
    );
}

const screenOptions = {
    headerStyled: {
        backgrounfColor: 'transparent'
    },
    headerTransparent: true,
    headerBackTitleStyle: {
        fontSize: 18,
        paddingTop: 20
    },
    headerTitle: '',
    headerLeftContainerStyle: {
        paddingLeft: 100
    },
    headerBackVisible: false,
    headerShown: false
};

const getScreeenOptions = (showBackArrow) => {
    return {
        headerBackVisible: showBackArrow,
        headerShown: showBackArrow,
        headerBackTitleStyle: {

        }
    };
}

export default RootStack;