import React, { AsyncStorage } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { Header } from './component/Header';
import { Button } from './component/Button';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.h1]}>บัตรบุคคล และ ยานพาหนะ</Text>
        
        <Button color="blue" circle="A" text="Menu A" navigation={navigation} page="OptionPage" /> 

        <Text style={styles.h1}>บัตรจอดรถ</Text>

      </View>
    </View>
  );
}

function OptionScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.h1]}>OPTION PAGE</Text>
        
        <Button color="grey" circle="B" text="Menu B" navigation={navigation} page="HomePage" /> 

      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'kanit-semibold': require('./assets/fonts/Kanit-SemiBold.ttf'),
    'kanit-medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'kanit-regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'kanit-light': require('./assets/fonts/Kanit-Light.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <React.Fragment>
        <Header style={{height: 100}}/>
        <NavigationContainer>
          <Stack.Navigator headerMode={false}>
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="OptionPage" component={OptionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#60C5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 2.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
    padding: 30
  },
  h1: {
    fontSize: 20,
    color: '#002458',
    fontFamily: 'kanit-semibold'
  }
});
