import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './contents/HomeScreen';
import Search from './contents/SearchScreen';
import Add from './contents/AddScreen';
import Plan from './contents/PlanScreen';
import Profile from './contents/ProfileScreen';

const sampleTabNavigation = createBottomTabNavigator(
);
 
export default class Content extends React.Component {
    render() {
 
    return (
    <NavigationContainer>
    <sampleTabNavigation.Navigator
    screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
 
        if (route.name === 'Home') {
            iconName = 'md-home-sharp';
        } else if (route.name === 'Search') {
            iconName = 'md-search-sharp';
        } else if (route.name === 'Add') {
            iconName = 'md-add-circle-sharp';
        } else if (route.name === 'Plan') {
            iconName = 'md-book-sharp';
        } else if (route.name === 'Profile') {
            iconName = 'md-person-sharp';
        }
 
        return <Ionicons name = {iconName} size={size} color={color} />;
    },
    })}

    tabBarOptions={{
        activeTintColor: '#8AB594',
        inactiveTintColor: '#626262',
    }}
    >
    <sampleTabNavigation.Screen name="Home" component={Home} />
    <sampleTabNavigation.Screen name="Search" component={Search} />
    <sampleTabNavigation.Screen name="Add" component={Add} />
    <sampleTabNavigation.Screen name="Plan" component={Plan} />
    <sampleTabNavigation.Screen name="Profile" component={Profile} />
    </sampleTabNavigation.Navigator>
    </NavigationContainer>
);
}
}