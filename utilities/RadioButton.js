import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


export default class RadioButton extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.8} style={styles.radioButton}>
                <View style={[styles.radioButtonHolder, { height: this.props.button.size, width: this.props.button.size, borderColor: this.props.button.color }]}>
                    {
                        (this.props.button.selected)
                            ?
                            (<View style={[styles.radioIcon, { height: this.props.button.size / 2, width: this.props.button.size / 2, backgroundColor: this.props.button.color }]}></View>)
                            :
                            null
                    }
                </View>
                <Text style={[styles.label, { color: this.props.button.color }]}>{this.props.button.label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonHolder: {
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioIcon: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginLeft: 10,
        fontSize: 20
    },

});