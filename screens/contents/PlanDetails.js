import React, { useState, useEffect, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    FlatList,
    SafeAreaView,
    Image,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

let config = require('../../Config');

export default function PlanDetails({ navigation, route }) {
    const { id, headerTitle } = route.params;
    const [fetching, setFetching] = useState(false);
    const [plan, setPlan] = useState([]);

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = () => {
        console.log("id: " + id);
        let url = config.settings.serverPath + '/api/plans/' + id;
        setFetching(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    Alert.alert('Error in fetching plan', response.status.toString());
                    throw Error('Error in fetching plan: ' + response.status);
                }
                return response.json()
            })
            .then((planData) => {
                setPlan(planData);
                console.log("plan data: " + planData);
                setFetching(false);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        console.log("plan" + plan),
        <View style={styles.container} >
            <FlatList
                data={plan}
                showsVerticalScrollIndicator={true}
                refreshing={fetching}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.planList}>
                            <Text style={styles.planTitle}>{item.plan_days}</Text>
                            <Text style={styles.planInfo}>{item.breakfast}</Text>
                            <Text style={styles.planInfo}>{item.lunch}</Text>
                            <Text style={styles.planInfo}>{item.dinner}</Text>
                            <Image source={{ uri: item.plan_photo }}
                                style={styles.image} />
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#DFEFE3',
        paddingTop: 20,
    },

    text: {
        fontSize: 20,
        alignItems: 'center',
        margin: 10,
        color: '#07006b',
        marginBottom: 0,
        marginTop: 20,
        fontWeight: 'bold',
    },

    dayContainer: {
        backgroundColor: '#cffadb',
        width: '100%',
        height: 100,
        color: 'black',
        margin: 10,
        marginBottom: -10
    },

    dayEvenContainer: {
        backgroundColor: '#Ffffff',
        width: '100%',
        height: 100,
        color: 'black',
        margin: 10,
        marginBottom: -10
    },

    planContainer: {
        height: '40%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    image: {
        width: '33.333333%',
        height: '100%',
        position: 'absolute',
        right: 12,
        top: 2,
        resizeMode: 'contain',
    },

    daytext: {
        color: 'green',
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 0,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#000000',
    },
    planTitle: {
        fontSize: 25,
        fontWeight: '800',
        color: '#000000',
        marginBottom: 30,
    },
    planInfo: {
        fontSize: 20,
        marginBottom: 30,
    },

    planList: {
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 40,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },

});
