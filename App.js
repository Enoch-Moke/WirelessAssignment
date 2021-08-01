import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import GoalScreen from './screens/GoalScreen';
import ContentScreen from './screens/ContentScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
        //make the header become null
        options={{
          header: () => null
        }}
        />
        <Stack.Screen
          name='Sign Up'
          component={SignupScreen}
        />
        <Stack.Screen
          name='Sign In'
          component={SigninScreen}
        />
        <Stack.Screen
          name='User Details'
          component={UserDetailsScreen}
        />
        <Stack.Screen
          name='Goal'
          component={GoalScreen}
        />
        <Stack.Screen
          name='Content'
          component={ContentScreen}
          options={{
            header: () => null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
})

export default App;