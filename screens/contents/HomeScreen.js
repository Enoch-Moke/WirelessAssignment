import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '../../utilities/CustomButton';

export default function HomeScreen({ navigation, route }) {

    const [email, setEmail] = useState('');

    useEffect(() => {
        validateUser();
    }, [])

    const validateUser = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setEmail(user.Email);
                    }
                }

                )
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('UserData');
            navigation.navigate('Auth');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Welcome {email}.
            </Text>
            <CustomButton
                style={styles.button}
                title='Your Meal Log'
                onPress={() => {
                    navigation.navigate('My Meal Log', {
                    email: email,
                })}}
            />
            <CustomButton
                style={styles.button}
                title='Log Out'
                onPress={logout}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#DFEFE3',
        paddingTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    button: {
        margin: -50,
    }
});