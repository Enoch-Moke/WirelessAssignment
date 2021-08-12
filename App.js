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
import ContentScreen from './screens/ContentScreen';

const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Sign In"
        component={SigninScreen}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{
        header: () => null
      }}
      >
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
        />
        <Stack.Screen
          name='Auth'
          component={AuthScreens}
        />
        <Stack.Screen
          name='Content'
          component={ContentScreen}
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