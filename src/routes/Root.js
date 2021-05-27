import React, { useContext, useEffect } from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native';

/* Navigation */
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

/* Single stack */
import HomeScren from '../screens/Home'
import DetailsScreen from '../screens/Details'
import WeekDetailsScreen from '../screens/WeekDetails'

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack.Navigator>
                <Stack.Screen
                    name="Indicadores"
                    component={HomeScren}
                    options={{
                        ...TransitionPresets.ScaleFromCenterAndroid
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        ...TransitionPresets.SlideFromRightIOS
                    }}

                />
                <Stack.Screen
                    name="Week"
                    component={WeekDetailsScreen}
                    options={{
                        ...TransitionPresets.SlideFromRightIOS
                    }}

                />
            </Stack.Navigator>
        </SafeAreaView>
    );
}
export default RootStack

