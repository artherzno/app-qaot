import _ from 'lodash';
import moment from 'moment';

import React, { AsyncStorage, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Modal, Alert, Platform, Image } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import axios from 'axios';

import QRCode from 'react-native-qrcode-svg';
import * as Permissions from 'expo-permissions';
import ViewShot from "react-native-view-shot";

import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import AppLoading from 'expo-app-loading';
import { isLoaded, useFonts } from 'expo-font';

import { Header } from './component/Header';
import { ButtonMain } from './component/ButtonMain';
import { ButtonGradient } from './component/ButtonGradient';
import { Button } from './component/Button';
import { Footer } from './component/Footer';

const ImgBg = require('./assets/bg-aot.png');
const IconAOT = require('./assets/logo-aot-big.png');

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
              <Stack.Screen name="GenQrPage" component={GenQrScreen} options={{gestureDirection: 'horizontal', gestureEnabled: true}} />
              <Stack.Screen name="CompletePage" component={CompleteScreen} options={{gestureDirection: 'horizontal', gestureEnabled: true}} />
            </Stack.Navigator>
          </NavigationContainer>

          {/* <Footer /> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


// Home Screen ==================================================================================//
function HomeScreen() {
  const navigation = useNavigation();
  const [dataService, setDataService] = useState([]);
  const [infoService, setInfoService] = useState([]);
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
      setInfoService(response.info);
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
              { dataService.filter((item_filter)=>item_filter.type === 'อนุญาตบุคคล').map((item)=><ButtonMain key={item.key} color="blue" circle={item.button_title} jobname={item.name} dataKey={item.key} info={infoService} navigation={navigation} page="OptionPage" /> )}
              
              <Text style={[styles.h1, {marginTop: 4}]}>บัตรจอดรถ</Text>
              { dataService.filter((item_filter)=>item_filter.type === 'อนุญาตจอดรถ').map((item)=><ButtonMain key={item.key} color="blue" circle={item.button_title} jobname={item.name} dataKey={item.key} info={infoService} navigation={navigation} page="OptionPage" /> )}
            </ScrollView>
          </View>
        }
      </View>

    );
}


// Option Screen ==================================================================================//
function OptionScreen({ route, navigation }) {
  const { circle, jobname, info, dataKey } = route.params;
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    setIsLoadedData(true);
  }, [])
  
  // Current Date
  let date_ob = new Date();
  // date_ob.setFullYear(2021);
  // date_ob.setMonth(1);
  // date_ob.setDate(2);

  // Get New Current Date in YYYY-MM-DD format
  const getNewCurrentDate = () => {

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return (date + "-" + month + "-" + year);
  }

  // Get Current Date in YYYY-MM-DD format
  const getCurrentDate = () => {

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return (year + "-" + month + "-" + date);
  }

  // Get Min Date in YYYY-MM-DD format
  const getMinDate = () => {

    let date = ("0" + (date_ob.getDate() + 1)).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    return (year + "-" + month + "-" + date);
  }

  // Get Min Date in YYYY-MM-DD format
  const getMaxDate = () => {

    let date = ("0" + (date_ob.getDate() + 1)).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 2)).slice(-2);
    let year = date_ob.getFullYear();
    return (year + "-" + month + "-" + date);
  }

  const checkWeekend = () => {

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    if(date_ob.getDay() == 0) {
      let date = ("0" + (date_ob.getDate() + 1)).slice(-2);

      // alert("SUN "+year + "-" + month + "-" + date)
      return (year + "-" + month + "-" + date).toString();

    // } else if(date_ob.getDay() == 6) {
    //   let date = ("0" + (date_ob.getDate() + 2)).slice(-2);

    //   alert("SAT "+year + "-" + month + "-" + date)
    //   return (year + "-" + month + "-" + date).toString();

    // } else if(date_ob.getDay() == 5) {
    //   let date = ("0" + (date_ob.getDate() + 3)).slice(-2);

    //   alert("FRI "+year + "-" + month + "-" + date)
    //   return (year + "-" + month + "-" + date).toString();

    } else {
      let date = ("0" + (date_ob.getDate())).slice(-2);
      
      // alert("NORMAL "+year + "-" + month + "-" + date)
      return (year + "-" + month + "-" + date);
    }
  }

  // Get Disable Date
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

  const [dateShow, setDateShow] = useState(getNewCurrentDate())
  const [dateSelected, setDateSelected] = useState(getNewCurrentDate());
  const [timeHrSelected, setTimeHrSelected] = useState('08');
  const [timeMinSelected, setTimeMinSelected] = useState('00');
  const [timeStamp, setTimeStamp] = useState('0819990011')
  const [dateHilight, setDateHilight] = useState(checkWeekend());
  const [currentDate, setCurrentDate] = useState(currentDateDefault);
  const [modalVisible, setModalVisible] = useState(false);

  const reqBooking = async () => {
    // Set Date & Time Selected
    let dateTimeSelected = `${dateSelected} ${timeHrSelected}:${timeMinSelected}`

    // Get Result
    await axios.post(url+'/req_booking', JSON.stringify({
        "branchID" : info.branchID,
        "branchName": info.branchName,
        "bookingTime": dateTimeSelected,
        "key": dataKey,
        "token": timeStamp,
        "jobName": jobname
      }), {
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
      // alert(JSON.stringify(response.data));
      navigation.navigate('GenQrPage', {
        dataGen: response.data.data,
        circle: circle,
        jobname: jobname,
        branchname: info.branchName,
        dateSelected: dateShow,
        timeSelected: [timeHrSelected, timeMinSelected]
      });
    }).catch(err=>{
      alert(err)
    });
  }

  return (
    <View style={styles.container}>
      {
          (!isLoadedData) ? <ActivityIndicator size="large" color="#7BDDFF" />:
          <View style={styles.card}>
            <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginBottom: 5, lineHeight: 24, textAlign: 'center'}]}>{circle}. {jobname}</Text>
            <ScrollView>
              <Text style={[styles.p, {marginBottom: 0, fontFamily: 'kanit-medium'}]}>กรุณาเลือกวันจองคิว</Text>
              <Text style={[styles.notice, {marginBottom: 10}]}>หมายเหตุ: เริ่มจองคิวล่วงหน้าในวันถัดไป แต่ไม่เกิน 30 วัน</Text>
              <Calendar
                
                current={ getCurrentDate() }
                minDate={ getMinDate() }
                maxDate={ getMaxDate() }
                disabledDaysIndexes={[0, 6]}
                disableAllTouchEventsForDisabledDays={true}
                onDayPress={(day) => {
                  let dateClick = day.dateString
                  setDateHilight(dateClick);
                  
// alert(JSON.stringify(day))
                  let daySelect = (day.day < 10) ? '0'+day.day : day.day,
                      monthSelect = (day.month < 10) ? '0'+day.month : day.month,
                      yearSelect = day.year;

                  let dateSelect = monthSelect+'/'+daySelect+'/'+yearSelect;
                  let dateShow = daySelect+'/'+monthSelect+'/'+yearSelect;

                  setDateShow(dateShow);
                  setDateSelected(dateSelect);
                  setTimeStamp(day.timestamp)

                  // alert(dateSelect+' , '+dateClick)
                }}
                markedDates={{
                  [dateHilight]: {selected: true},
                  // ...getDisabledDates('2021-01-01', '2028-01-01', [0, 6])
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

                style={[{borderWidth: 1, borderStyle: 'solid', borderColor: '#3053b6', borderRadius: 8}]}
              />


              <Text style={[styles.p, {marginTop: 10, marginBottom: 0, fontFamily: 'kanit-medium'}]}>กรุณาเลือกเวลาจองคิว</Text>   
              <Text style={[styles.notice, {marginBottom: 10}]}>หมายเหตุ: เวลาทำการ 08:00 - 16:00 น.</Text>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={[{width: '48%', textAlign: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#3053b6', borderRadius: 8}]}>    
                  <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => setTimeHrSelected(value)}
                    value={timeHrSelected}
                    items={[
                        { label: '08', value: '08' },
                        { label: '09', value: '09' },
                        { label: '10', value: '10' },
                        { label: '11', value: '11' },
                        { label: '12', value: '12' },
                        { label: '13', value: '13' },
                        { label: '14', value: '14' },
                        { label: '15', value: '15' },
                        // { label: '16', value: 16 },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View> 
                <Text style={{width: '5%',fontSize: 20, alignSelf: 'center'}}> : </Text>
                <View style={[{width: '47%', textAlign: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#3053b6', borderRadius: 8}]}> 
                  <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => setTimeMinSelected(value)}
                    value={timeMinSelected}
                    items={[
                        { label: '00', value: '00' },
                        { label: '01', value: '01' },
                        { label: '02', value: '02' },
                        { label: '03', value: '03' },
                        { label: '04', value: '04' },
                        { label: '05', value: '05' },
                        { label: '06', value: '06' },
                        { label: '07', value: '07' },
                        { label: '08', value: '08' },
                        { label: '09', value: '09' },
                        { label: '10', value: '10' },
                        { label: '11', value: '11' },
                        { label: '12', value: '12' },
                        { label: '13', value: '13' },
                        { label: '14', value: '14' },
                        { label: '15', value: '15' },
                        { label: '16', value: '16' },
                        { label: '17', value: '17' },
                        { label: '18', value: '18' },
                        { label: '19', value: '19' },
                        { label: '20', value: '20' },
                        { label: '21', value: '21' },
                        { label: '22', value: '22' },
                        { label: '23', value: '23' },
                        { label: '24', value: '24' },
                        { label: '25', value: '25' },
                        { label: '26', value: '26' },
                        { label: '27', value: '27' },
                        { label: '28', value: '28' },
                        { label: '29', value: '29' },
                        { label: '30', value: '30' },
                        { label: '31', value: '31' },
                        { label: '32', value: '32' },
                        { label: '33', value: '33' },
                        { label: '34', value: '34' },
                        { label: '35', value: '35' },
                        { label: '36', value: '36' },
                        { label: '37', value: '37' },
                        { label: '38', value: '38' },
                        { label: '39', value: '39' },
                        { label: '40', value: '40' },
                        { label: '41', value: '41' },
                        { label: '42', value: '42' },
                        { label: '43', value: '43' },
                        { label: '44', value: '44' },
                        { label: '45', value: '45' },
                        { label: '46', value: '46' },
                        { label: '47', value: '47' },
                        { label: '48', value: '48' },
                        { label: '49', value: '49' },
                        { label: '50', value: '50' },
                        { label: '51', value: '51' },
                        { label: '52', value: '52' },
                        { label: '53', value: '53' },
                        { label: '54', value: '54' },
                        { label: '55', value: '55' },
                        { label: '56', value: '56' },
                        { label: '57', value: '57' },
                        { label: '58', value: '58' },
                        { label: '59', value: '59' },
                    ]}
                    style={pickerSelectStyles}
                  />
                </View>
              </View>

              <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={[styles.shadowBox]}
              >
                <ButtonGradient color="blue" text="จองคิว" />
              </TouchableOpacity>


              <TouchableOpacity
                  onPress={() => {
                          navigation.navigate('HomePage')
                  }}
                  style={[styles.shadowBox]}
              >
                <Button color="grey" text="ยกเลิก"/>
              </TouchableOpacity>

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={[styles.p, {color: '#000000', fontSize: 16, lineHeight: 20}]}>คุณได้ทำการจองคิวรายการ</Text>
                    <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 24, textAlign: 'center'}]}>{circle}. {jobname}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 30}]}>วันที่  </Text>
                        <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 28, color: '#4472C4'}]}>{dateShow}  </Text>
                      </View>
                      <View  style={{flexDirection: 'row'}}>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 30}]}>เวลา </Text>
                        <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 28, color: '#4472C4'}]}>{`${timeHrSelected} : ${timeMinSelected} `}</Text>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', marginTop: 10, marginBottom: 5, lineHeight: 30}]}>น.</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{color: '#888888', fontFamily: 'kanit-regular', fontSize: 18, margin: 15, marginBottom: 0}}>ยกเลิก</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          reqBooking();
                        }}
                      >
                        <Text style={{color: '#002458', fontFamily: 'kanit-regular', fontSize: 18, margin: 15, marginBottom: 0}}>ยืนยัน</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </View>
      }   
    </View>
  );
}


// Gen QR Screen ==================================================================================//
function GenQrScreen({ route, navigation }) {
  const {dataGen, circle, jobname, branchname, dateSelected, timeSelected} = route.params;
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [rollGranted, setRollGranted] = useState(false);
  const [dataUri, setDataUri] = useState('FZ Smart Que : เกิดข้อผิดพลาดระหว่างทำรายการ กรุณลองใหม่อีกครั้ง');
  const [isSend, setIsSend] = useState(false);

  async function getCameraRollPermissions() {
    // const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      console.log('Oh Yes! The user has granted us CAMERA_ROLL permission.');
      setRollGranted(true);
    } else {
      console.log('Uh oh! The user has not granted usC AMERA_ROLL permission.');
      setRollGranted(false);
    }
  }

  onCapture = uri => {
    setDataUri(uri);
  }

  async function screenshotAndCreateAlbum () {
    const uri = dataUri;
    console.log('uri', dataUri);
    const asset = await MediaLibrary.createAssetAsync(uri);

    if(Platform.OS === 'android') {
      //************* PLATEFORM : ANDROID ***********//
      const DCIM_id = asset.albumId.toString();

      console.log('asset :', asset);
      console.log('Platform OS Name '+Platform.OS)
      
      await MediaLibrary.createAlbumAsync('AOT', asset)
      await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id)
      .then(() => {
        console.log('Album created!');
        setIsSend(false);
        navigation.navigate('CompletePage', {
          circle: circle,
          jobname: jobname
        })
      })
      .catch(error => {
        Alert.alert('เกิดข้อผิดพลาดระหว่างทำรายการ กรุณลองใหม่อีกครั้ง')
      });
    } else {

    //********* PLATEFORM : IOS ***************//
    console.log('asset :', asset);
    console.log('Platform OS Name '+Platform.OS)
    
    await MediaLibrary.createAlbumAsync('AOT', asset)
    .then(() => {
      console.log('Album created!');
      setIsSend(false);
      navigation.navigate('CompletePage', {
        circle: circle,
        jobname: jobname
      })
    })
    .catch(error => {
      Alert.alert('เกิดข้อผิดพลาดระหว่างทำรายการ กรุณลองใหม่อีกครั้ง')
    });
    }
    
    
  }

  useEffect(() => {
    getCameraRollPermissions();
    setIsLoadedData(true);
  }, [])
  
  return (
    <View style={styles.container}>
      {
        (!isLoadedData) ? <ActivityIndicator size="large" color="#7BDDFF" /> :
        
          <View style={[styles.card, {paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,}]}>
              <ScrollView>
                <ViewShot onCapture={onCapture} captureMode="mount" options={{ format: "jpg", quality: 0.9 }}>
                  <View style={{backgroundColor: '#ffffff', paddingTop: 30, paddingBottom: 0, paddingLeft: 20, paddingRight: 20,}}>
                    <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginBottom: 5, lineHeight: 24, textAlign: 'center'}]}>{circle}. {jobname}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', lineHeight: 32, textAlignVertical: 'bottom'}]}>จองคิววันที่ </Text>
                        <Text style={[styles.h1, {fontFamily: 'kanit-medium', color: '#4472C4'}]}>{dateSelected} </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', lineHeight: 32, textAlignVertical: 'bottom'}]}>เวลา </Text>
                        <Text style={[styles.h1, {fontFamily: 'kanit-medium', color: '#4472C4'}]}>{timeSelected[0]} : {timeSelected[1]}</Text>
                        <Text style={[styles.p, {fontFamily: 'kanit-medium', lineHeight: 32, textAlignVertical: 'bottom'}]}> น.</Text>
                      </View>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <QRCode
                        value={JSON.stringify(dataGen)}
                        size={200}
                      />
                    </View>
                    <Text style={[styles.p, {marginBottom: 0, marginTop: 20, lineHeight: 20, fontFamily: 'kanit-regular', textAlign: 'center'}]}>กรุณาบันทึก QR Code นี้ เพื่อใช้ยืนยันการจองคิวล่วงหน้า ภายใน 10 นาที ก่อนเวลานัดหมายที่เครื่องออกบัตรคิว ณ {branchname}</Text>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Image source={IconAOT} style={styles.qrlogo}></Image>
                    </View>
                  </View>
                </ViewShot>
                <TouchableOpacity
                  onPress={()=> rollGranted
                    ? (screenshotAndCreateAlbum(), setIsSend(true))
                    : Alert.alert('Permissions not granted')
                  }
                  style={{marginTop: 20, paddingLeft: 20, paddingRight: 20}}
                >
                  { isSend ? <ActivityIndicator size="large" color="#7BDDFF" /> : <ButtonGradient color="blue" text="บันทึก" />}
                </TouchableOpacity>
              </ScrollView>
          </View>
      }
    </View>
  );
}


// Complete Screen ==================================================================================//
function CompleteScreen({ route, navigation }) {
  const {circle, jobname} = route.params;
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    setIsLoadedData(true);
  }, [])
  return (
    <View style={styles.container}>
      {
        (!isLoadedData) ? <ActivityIndicator size="large" color="#7BDDFF" /> :
        <View style={styles.card}>
          <Text style={[styles.h1, {fontFamily: 'kanit-medium', marginBottom: 5, lineHeight: 24, textAlign: 'center'}]}>{circle}. {jobname}</Text>
              <ScrollView>
                <Text style={[styles.head, {marginTop: 10, marginBottom: 20, textAlign: 'center', color: '#3053b6'}]}>บันทึก QR Code เรียบร้อย</Text>
                <Text style={[styles.h1, {marginBottom: 0, lineHeight: 27, fontFamily: 'kanit-regular', textAlign: 'center'}]}>บริษัท ท่าอากาศยานไทย จำกัด (มหาชน)</Text>
                <Text style={[styles.h1, {marginBottom: 20, lineHeight: 27, fontFamily: 'kanit-regular', textAlign: 'center'}]}>ขอขอบคุณที่ใช้บริการ</Text>
              
                <TouchableOpacity
                  onPress={()=>navigation.navigate('HomePage')}
                >
                  <Button color="grey" text="กลับหน้าหลัก" />
                </TouchableOpacity>
              </ScrollView>
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
  qrlogo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flex: 2.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
    paddingTop: 30,
    paddingBottom: 0,
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
  },
  p: {
    fontSize: 14,
    lineHeight: 18,
    color: '#002458',
    fontFamily: 'kanit-regular'

  },
  notice: {
    fontSize: 14,
    lineHeight: 18,
    color: '#88929B',
    fontFamily: 'kanit-regular'
  },
  shadowBox: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: 'kanit-regular'
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: 'kanit-regular'
  },
});
