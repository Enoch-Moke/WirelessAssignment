import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './contents/HomeScreen';
import Search from './contents/SearchScreen';
import Add from './contents/AddScreen';
import PlanHome from './contents/PlanHome';
import Profile from './contents/ProfileScreen';

const Tab = createBottomTabNavigator();

function ContentScreen() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#8AB594',
                inactiveTintColor: '#d3d3d3',
                showLabel: true,
                labelStyle: { fontSize: 14 },
            }
            }
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
                component={PlanHome}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
            />
        </Tab.Navigator>
    )
}

export default ContentScreen;