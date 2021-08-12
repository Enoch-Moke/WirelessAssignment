import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './contents/HomeScreen';
import Recipe from './contents/RecipeNavigator';
import Add from './contents/AddScreen';
import PlanHome from './contents/PlanHome';
import Profile from './contents/ProfileScreen';
import { sortedLastIndex } from 'lodash';

const Tab = createBottomTabNavigator();

function ContentScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#9299ff',
        activeBackgroundColor: '#030d9f',
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        showLabel: true,
        labelStyle: {fontSize: 16},
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Plan" component={PlanHome} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default ContentScreen;
