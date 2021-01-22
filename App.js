import _ from 'lodash';
import moment from 'moment';

import React, { AsyncStorage, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from 'react-native';

import axios from 'axios';

import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import AppLoading from 'expo-app-loading';
import { isLoaded, useFonts } from 'expo-font';

import { Header } from './component/Header';
import { ButtonMain } from './component/ButtonMain';
import { Button } from './component/Button';
import { Footer } from './component/Footer';

const ImgBg = require('./assets/bg-aot.png');

const Stack = createStackNavigator();
const url = 'https://aotkios.web.app/api/v1';

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
      <SafeAreaView style={{backgroundColor: '#3053b6', flex: 1}}>
        <ImageBackground source={ImgBg} style={styles.image}>
          <Header style={{height: 100}}/> 

          <NavigationContainer>
            <Stack.Navigator headerMode={false} screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
              <Stack.Screen name="HomePage" component={HomeScreen} options={{gestureDirection: 'horizontal', gestureEnabled: true}} />
              <Stack.Screen name="OptionPage" component={OptionScreen} options={{gestureDirection: 'horizontal', gestureEnabled: true}} />
            </Stack.Navigator>
          </NavigationContainer>

          <Footer />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

function HomeScreen() {
  const navigation = useNavigation();
  const [dataService, setDataService] = useState([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  const getService = async () => {
    await axios.post(url+'/getservice', {
        "branchID": "0001"
    }, {
      auth: {
        username: "aotsmartq",
        password: "RurFebScfw6u2wYeZL6a5rL5YKKHV5eG"
      },
      headers: {
        "x-api-key": "bVYLDtJHzY4meuGatFmmqxufbPudY3H3",
        "Content-Type": "application/json"
      }
    }).then(res=>{
      const response = res.data;
      console.log(response.data);

      setIsLoadedData(true);
      setDataService(response.data);
    }).catch(err=>{
      alert(err)
    });
  }

  useEffect(() => {
    getService();
  }, []);


    return (
      <View style={styles.container}>
        {
          (!isLoadedData) ? <ActivityIndicator size="large" color="#7BDDFF" /> :
          <View style={styles.card}>
            <Text style={styles.head}>ระบบจองคิวล่วงหน้า</Text>
            <ScrollView>
              <Text style={[styles.h1, {marginTop: 4}]}>บัตรบุคคล และ ยานพาหนะ</Text>
              { dataService.filter((item_filter)=>item_filter.type === 'อนุญาตบุคคล').map((item)=><ButtonMain key={item.key} color="blue" circle={item.button_title} text={item.name} navigation={navigation} page="OptionPage" /> )}
              
              <Text style={[styles.h1, {marginTop: 4}]}>บัตรจอดรถ</Text>
              { dataService.filter((item_filter)=>item_filter.type === 'อนุญาตจอดรถ').map((item)=><ButtonMain key={item.key} color="blue" circle={item.button_title} text={item.name} navigation={navigation} page="OptionPage" /> )}
            </ScrollView>
          </View>
        }
      </View>

    );
}

function OptionScreen({ route, navigation }) {
  const { circle, text } = route.params;
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    setIsLoadedData(true);
  }, [])

  // Get Current Date
  const getCurrentDate = () => {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    // alert(year + "-" + month + "-" + date);
    // prints date in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
  }

  // Get Min Date
  const getMinDate = () => {
    let date_ob = new Date();

    let date = ("0" + (date_ob.getDate() + 1)).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    // alert(year + "-" + month + "-" + date);
    // prints date in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
  }

  // Get Min Date
  const getMaxDate = () => {
    let date_ob = new Date();

    let date = ("0" + (date_ob.getDate() + 1)).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 2)).slice(-2);
    let year = date_ob.getFullYear();
    
    // alert(year + "-" + month + "-" + date);
    // prints date in YYYY-MM-DD format
    return (year + "-" + month + "-" + date);
  }

  const getDisabledDates = (startDate, endDate, daysToDisable) => {
    const disabledDates = {};
    const start = moment(startDate);
    const end = moment(endDate);

    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      if (_.includes(daysToDisable, m.weekday())) {
        disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
      }
    }
    return disabledDates;
  };

  const currentDateDefault = new Date().toISOString().slice(0, 10);

  const [dateSelected, setDateSelected] = useState(getCurrentDate());
  const [dateHilight, setDateHilight] = useState(getMinDate());
  const [currentDate, setCurrentDate] = useState(currentDateDefault);

  return (
    <View style={styles.container}>
      {
          (!isLoadedData) ? <ActivityIndicator size="large" color="#7BDDFF" />:
          <View style={styles.card}>
            <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginBottom: 10}]}>{circle}. {text}</Text>

            <Calendar
            displayLoadingIndicator
              current={ getCurrentDate() }
              minDate={ getMinDate() }
              maxDate={ getMaxDate() }
              enableSwipeMonths={true}
              disabledDaysIndexes={[0, 6]}
              disableAllTouchEventsForDisabledDays={true}
              onDayPress={(day) => {
                let dateClick = day.dateString
                setDateHilight(dateClick);

                let daySelect = (day.day < 10) ? '0'+day.day : day.day,
                    monthSelect = (day.month < 10) ? '0'+day.month : day.month,
                    yearSelect = day.year;

                let dateSelect = daySelect+'-'+monthSelect+'-'+yearSelect;

                setDateSelected(dateSelect);

                // alert(dateSelect+' , '+dateClick)
              }}
              markedDates={{
                [dateHilight]: {selected: true},
                ...getDisabledDates('2021-01-01', '2028-01-01', [0, 6])
              }}
              // markedDay = {[day.dateString]:{selected: true, marked: true}}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleDisabledColor: '#d9e1e8',
                dayTextColor: '#3053b6',
                textDayFontFamily: 'kanit-regular',
                textMonthFontFamily: 'kanit-regular',
                textDayHeaderFontFamily: 'kanit-medium',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 16
              }}
            />

            {/* <Calendar
              // Initially visible month. Default = Date()
              current={ getCurrentDate() }
              minDate={ getMinDate() }
              maxDate={'2021-02-23'}
              enableSwipeMonths={true}
              onDayPress={(day) => {
                let dateClick = day.dateString
                setDateHilight(dateClick);

                let daySelect = day.day,
                    monthSelect = (day.month < 10) ? '0'+day.month : day.month,
                    yearSelect = day.year;

                let dateSelect = daySelect+'-'+monthSelect+'-'+yearSelect;

                setDateSelected(dateSelect);

                alert(dateSelect+' , '+dateClick)
              }}
              markedDates={{
                [dateHilight]: {selected: true}
              }}
              // markedDay = {[day.dateString]:{selected: true, marked: true}}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#7BDDFF',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#7BDDFF',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#7BDDFF',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#7BDDFF',
                selectedDotColor: '#7BDDFF',
                arrowColor: '#3053b6',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#3053b6',
                indicatorColor: 'blue',
                textDayFontFamily: 'kanit-regular',
                textMonthFontFamily: 'kanit-regular',
                textDayHeaderFontFamily: 'kanit-medium',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
            /> */}

            <Text>{}</Text>
          </View>
      }   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3053b6',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  card: {
    flex: 2.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  h1: {
    fontSize: 20,
    color: '#002458',
    fontFamily: 'kanit-regular'
  },
  head: {
    fontSize: 28,
    color: '#002458',
    fontFamily: 'kanit-regular',
    textAlign: 'center',
  }
});
