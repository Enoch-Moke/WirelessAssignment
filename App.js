import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import GoalScreen from './screens/GoalScreen';
import ContentScreen from './screens/ContentScreen';

const RootStack = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
    },
    Signup: {
        screen: SignupScreen
    },
    Signin: {
        screen: SigninScreen
    },
    UserDetails: {
        screen: UserDetailsScreen
    },
    Goal: {
        screen: GoalScreen
    },
    Content: {
        screen: ContentScreen
    },
}, {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#8AB594',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft: null,
    },
});

const AppContainer = createAppContainer(RootStack);
export default AppContainer;