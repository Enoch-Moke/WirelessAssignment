import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlanMain from './PlanMain';
import PlanDetails from './PlanDetails';

const Stack = createStackNavigator();

function Plan() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: 'bold',
            }}>
            <Stack.Screen
                name='Plan Main'
                component={PlanMain}
                options={{
                    headerLeft: () => null,
                    headerTitle: 'Plan'
                }}
            />
            
            <Stack.Screen
                name='Plan Details'
                component={PlanDetails}
                options={({ route }) => ({ title: route.params.headerTitle })}
            />
        </Stack.Navigator>
    )
}

export default Plan;