import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

export class ButtonMain extends Component {
    render() {
        const { navigation, color, circle, jobname, page, info, dataKey} = this.props;

        const checkColor = (val) => {
            if(val==='A') {
                return '#18CB4B';
            } else if(val==='B') {
                return '#7BDDFF'
            } else if(val=='C') {
                return '#FF7DE1'
            } else {
                return '#FFFF24';
            }
        }

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(page, {
                    circle,
                    jobname,
                    info,
                    dataKey
                  })}
                style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowOffset: {width: 2, height: 1},
                    textShadowRadius: 1,
                }}
                >
                    <LinearGradient 
                        colors={['#4FD1FF', '#4472C4']}
                        start={[0, 0]}
                        end={[0, 1]}
                        location={[0.25, 0.4, 1]} 
                        style={[styles.btn, styles.btnBlue]}
                    >
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={[styles.btnCircle, {backgroundColor: checkColor(circle)}]}>{circle}</Text>
                            <Text style={[styles.btnText, {fontFamily:'kanit-medium'}]}>{jobname}</Text>
                        </View>
                    </LinearGradient>
            </TouchableOpacity>
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
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
    },
    btnBlue: {
        backgroundColor: '#60C5EA'
    },
    btnCircle: {
        borderRadius: 30,
        width: 30,
        maxWidth: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 30,
        fontFamily: 'kanit-medium',
        alignSelf: 'center',
    },
    btnText: {
        // height: 50,
        fontSize: 18,
        lineHeight: 24,
        padding: 5,
        paddingLeft: 0,
        paddingRight: 10,
        textAlign: 'left',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        flex: 4,
        textAlignVertical: 'auto',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
