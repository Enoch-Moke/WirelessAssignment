import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './contents/HomeScreen';
import Search from './contents/SearchScreen';
import Add from './contents/AddScreen';
import Plan from './contents/PlanScreen';
import Profile from './contents/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

function ContentScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                        size = focused ? 23 : 18;
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                        size = focused ? 23 : 18;
                    } else if (route.name === 'Add') {
                        iconName = 'plus';
                        size = focused ? 23 : 18;
                    } else if (route.name === 'Plan') {
                        iconName = 'book-open';
                        size = focused ? 23 : 18;
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                        size = focused ? 23 : 18;
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                }
            })}
            activeColor='#8AB594'
            inactiveColor='#d3d3d3'
            barStyle={{ backgroundColor: '#ffffff' }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
            />
            <Tab.Screen
                name='Search'
                component={Search}
            />
            <Tab.Screen
                name='Add'
                component={Add}
            />
            <Tab.Screen
                name='Plan'
                component={Plan}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
            />
        </Tab.Navigator>
    )
}

export default ContentScreen;