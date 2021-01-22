import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export class Footer extends Component {
    render() {
        return (
            <View>
                <Text style={[styles.footer, {textAlign: 'left', left: 10}]}>FZ Smart Que By AIRPORTS OF THAILAND PLC.</Text>
                <Text style={[styles.footer, {textAlign: 'right', right: 10}]}>v. 1.0.0</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 5,
        textAlign: 'center',
        width: '100%',
        fontSize: 9,
    }
})
