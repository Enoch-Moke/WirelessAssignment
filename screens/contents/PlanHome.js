import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlanMain from './PlanMain';
import PlanDetails from './PlanDetails';

const Stack = createStackNavigator();

function Plan() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Plan Main'
                component={PlanMain}
                options={{
                    header: () => null
                }}
            />
            <Stack.Screen
                name='Plan Details'
                component={PlanDetails}
            />
        </Stack.Navigator>
    )
}

export default Plan;