import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Platform, TouchableOpacity, AccessibilityInfo } from 'react-native';
import uuid from 'react-native-uuid'
import DataForm from '../components/dataform';
import { DateTime } from "luxon"
import { useFonts, Raleway_700Bold, Raleway_600SemiBold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { ScrollView } from 'react-native-gesture-handler';
import IndexOverview from '../components/indexOverview';
import ActivityTab from '../components/activityTab';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics'


/* Lets do this */

export type ActivityInstance = {
  date: string,
  id: string
  count?: number
  notes?: string
  hashtags?: string[]
}

export type ActivityType = {
  name: string
  blurb: string
  instances: ActivityInstance[]
  id: string
  color: string
}



export default function App() {
  const [data, setData] = useState<ActivityType[]>([])
  const [hashtagBox, setHashtagBox] = useState<string|null>(null)
  const [addData, setAddData] = useState<{activity: string, instance: string}|null>(null)
  const [showForm, setShowForm] = useState(false)
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold, 
    Raleway_500Medium,
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      console.log(jsonValue)
      return jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleClick = async (id: string) => {
    const activity = [...data].find(i => i.id === id)
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
    // Set time to 00:00 (midnight)
    let instanceId = String(uuid.v1())

    

    if (activity) {
      activity.instances = [...activity.instances, {
        date: String(currentDate),
        id: instanceId
      }]
      const activityIndex = data.findIndex((i: any) => i.id === id)
      const newData = [...data]
      newData.splice(activityIndex, 1, activity)
      try {
        await AsyncStorage.setItem('my-data', JSON.stringify(newData));
        getData()
        setAddData({activity: activity.id, instance: instanceId})
        Haptics.notificationAsync()
      } catch (e) {
        alert("Error")
      }
    }
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }



  return (
    <ScrollView style={styles.scrollContainer}>
      <Animatable.View 
    animation={"fadeIn"}
    duration={500}
    iterationCount={1}
    style={styles.animatableView}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Your Activities
        </Text>
      </View> 
    <View style={styles.container} >
      
      {data.length > 0 
      ? <View style={styles.activitesContainer}>
        {data.map(i => (
        <View key={i.id} style={{width: "100%", marginVertical: 8, borderRadius: 8,  flex: 1, alignItems: "center",    shadowColor: 'rgb(30 64 175)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .2,
        shadowRadius: 2,
        elevation: 2, backgroundColor: "white"}}>
        <ActivityTab 
        activity={i}
        addData={addData}
        showForm={showForm}
        setShowForm={(arg) => setShowForm(arg)}
        getData={() => getData}
        setAddData={(arg) => setAddData(arg)}
        data={data}
        handleClick={(arg) => handleClick(arg)}
        />
        </View>
      ))}
      </View>
      : 
      <View>
              <Image style={styles.image} source={require('../assets/character.png')}/>

      <View style={styles.helperContainer}>
        <Text style={{...styles.helperText, fontFamily: "Raleway_700Bold", color: "rgb(99 102 241)"}}>No activities found.</Text>
        <Text style={{...styles.helperText, fontFamily: "Raleway_600SemiBold",}}>Click the help button (bottom right corner) to get started.</Text>
      </View>
      </View>
      }
      <StatusBar style="auto" />
      {data.length > 0  && 
      <View style={styles.overViewContainer}>
        <View style={styles.overviewHeadContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Image style={{...styles.image, alignSelf: "center"}} source={require('../assets/character.png')}/>
        </View>
      <IndexOverview data={data}/>
      </View>
      }
    </View>
    </Animatable.View>
    </ScrollView>
  );
}

const activity = {
  marginVertical: 8,
  backgroundColor: "white",
  padding: 10,
  borderRadius: 5,
  shadowColor: 'rgb(37 99 235)',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
}


const styles = StyleSheet.create({
  overviewTitle: {
    fontFamily: "Raleway_700Bold",
    fontSize: 24,
  },
  overViewContainer: {
    marginTop: "20%",
    paddingBottom: "25%",
  },
  overviewHeadContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  
  box: {
    borderWidth: 4,
  },
  header: {
    padding: 12,
  },
  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: 24,

  },
  activityHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    borderRadius: 6
  },
  activitySimple: {
    ...activity,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    color: "black",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "scroll",
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    //paddingBottom: "50%",
  },
  activitesContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  scrollContainer: {
    /* paddingBottom: "50%", */
    flex: 1,
  },
  animatableView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    margin: 4,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  helperText: {
    fontSize: 18,
    textAlign: "center",
    padding: 12,
  },
  helperContainer: {
    padding: 12,
    backgroundColor: "white",
    marginVertical: "30%",
    borderRadius: 12,
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
    marginTop: -56
  },
  image: {
    marginBottom: -54,
    width: 100, 
    height: 100, 
  },
});
