import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export class Button extends Component {
    render() {
        const checkColor = () => {
            return 'grey';
        }

        return (
            <TouchableOpacity
            onPress={() => alert('hi')}
            style={{
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: {width: 2, height: 1},
                textShadowRadius: 1,
            }}
            >
                
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={[styles.btnText, {fontFamily:'kanit-medium'}]}>Test</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        borderRadius:100,
        textAlign: 'center',
        overflow: 'hidden',
        marginBottom: 10,
        minWidth: 280,
        width: '100%'
    },
    btnCircle: {
        borderRadius: 100,
        width: 30,
        maxWidth: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 30,
        fontFamily: 'kanit-medium',
    },
    btnText: {
        // height: 50,
        fontSize: 15,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 1,
        flex: 4,
        textAlignVertical: 'auto',
        justifyContent: 'center'
    }
})
