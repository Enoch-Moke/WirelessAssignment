import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';

class CustomButton extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                >
                <View style={[buttonStyles.userBtn, this.props.style]}>
                    <Text style={buttonStyles.btnText}>{this.props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const buttonStyles = StyleSheet.create({
    userBtn: {
    backgroundColor: '#8AB594',
    padding: 15,
    marginTop: 100,
    bottom: 0,
    width: 300,
    fontFamily: 'Roboto',
  },

  btnText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#Ffffff',
    fontFamily: 'Roboto',
  },
});

module.exports = {
    CustomButton: CustomButton,
}