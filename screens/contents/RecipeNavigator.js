import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeScreen from './RecipeScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';

const Stack = createStackNavigator();

function Recipe() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: 'bold',
            }}>
            <Stack.Screen
                name='Recipe Home'
                component={RecipeScreen}
                options={{
                    headerLeft: () => null,
                    headerTitle: 'Recipe'
                }}
            />
            <Stack.Screen
                name='Recipe Details'
                component={RecipeDetailsScreen}
                options={({ route }) => ({ title: route.params.headerTitle })}
            />
        </Stack.Navigator>
    )
}

export default Recipe;