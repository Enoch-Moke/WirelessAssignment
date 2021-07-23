import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({navigation}) => {
    return(
    <View style={styles.container}>
        <Image
            style={styles.picture}
            source={require('../images/welcome.png')}
        />
        <Text style={styles.description}>Keep track of your diet with Fit-Sique</Text>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Signup')}
        >
            <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
    </View>
    );     
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DFEFE3',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    picture: {
        width: '70%',
        height: '40%',
    },
    buttonContainer: {
        backgroundColor: '#8AB594',
        padding: 15,
        marginTop: 50,
        bottom: 0,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        fontFamily: 'Roboto',
    },
    description: {
        fontSize: 18,
        margin: 20,
        fontFamily: 'Roboto',
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
    }
});