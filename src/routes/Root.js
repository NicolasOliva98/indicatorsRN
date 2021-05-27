import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScren from '../screens/Home'
import DetailsScreen from '../screens/Details'
import WeekDetailsScreen from '../screens/WeekDetails'

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack.Navigator headerMode='none'>
                <Stack.Screen
                    name="Indicadores"
                    component={HomeScren}
                    options={{
                        ...TransitionPresets.ScaleFromCenterAndroid
                    }}
                    initialParams={{tittle:'Indicadores'}}
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

