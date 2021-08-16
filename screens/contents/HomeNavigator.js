import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ViewLog from './ViewLog';
import AddScreen from './AddScreen';
import ViewDetails from './ViewDetails';

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: 'bold',
        }}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerLeft: () => null
                }}
            />
            <Stack.Screen
                name='My Meal Log'
                component={ViewLog}
            />
            <Stack.Screen
                name='View Details'
                component={ViewDetails}
                options={({ route }) => ({ title: route.params.headerTitle })}
            />
            <Stack.Screen
                name='Add Meal'
                component={AddScreen}
            />
        </Stack.Navigator>
    )
}

export default Home;