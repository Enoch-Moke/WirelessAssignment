import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '../../utilities/CustomButton';

export default function HomeScreen({ navigation, route }) {

    const [name, setName] = useState('');
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
                        setName(user.Name);
                        setEmail(user.Email);
                    }
                }

                )
        } catch (error) {
            console.log(error);
        }
    }

    console.log(email);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Welcome {name}.
            </Text>
            <CustomButton
                style={styles.button}
                title='Your Meal Log'
                onPress={() => {
                    navigation.navigate('My Meal Log', {
                        email: email,
                    })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f1ee',
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