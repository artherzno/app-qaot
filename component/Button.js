import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export class Button extends Component {
    render() {
        const { navigation, color, text, page } = this.props;

        const checkColor = () => {
            if(color==='grey') {
                return { bgColor: '#E2E2E2', textColor: '#888888', shadow: 0 };
            } else {
                return { bgColor: '#4472C4', textColor: '#ffffff', shadow: 1 };
            }
        }

        return (
            <View style={[styles.btn, {display: 'flex', flexDirection: 'row'}]}>
                <Text style={[styles.btnText, {fontFamily:'kanit-medium', backgroundColor: checkColor().bgColor, color: checkColor().textColor, textShadowOffset: {width: checkColor().shadow, height: checkColor().shadow}}]}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 30,
        textAlign: 'center',
        overflow: 'hidden',
        marginBottom: 10,
        minWidth: 280,
        width: '100%',
    },
    btnText: {
        // height: 50,
        fontSize: 20,
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        color: '#fff',
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
        // textShadowOffset: {width: 1, height: 1},
        // textShadowRadius: 1,
        flex: 4,
        textAlignVertical: 'auto',
        justifyContent: 'center'
    }
})
