import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeScreen from './RecipeScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';

const Stack = createStackNavigator();

function Recipe() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Recipe Home'
                component={RecipeScreen}
                options={{
                    header: () => null
                }}
            />
            <Stack.Screen
                name='Recipe Details'
                component={RecipeDetailsScreen}
            />
        </Stack.Navigator>
    )
}

export default Recipe;