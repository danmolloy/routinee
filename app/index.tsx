import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, AccessibilityInfo } from 'react-native';
import uuid from 'react-native-uuid'
import DataForm from '../components/dataform';
import { DateTime } from "luxon"
import { useFonts, Raleway_700Bold, Raleway_600SemiBold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { ScrollView } from 'react-native-gesture-handler';


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
      } catch (e) {
        alert("Error")
      }
    }
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ScrollView>
    <View style={styles.container} >
      {data.length > 0 
      ? data.map(i => (
        <View key={i.id} style={i.id === addData?.activity && showForm === true ? styles.activityLarge : styles.activitySimple}>
        <View style={styles.activityHeader}>
          <View>
        <Text style={{fontSize: 20, color: "black", fontFamily:"Raleway_700Bold"}}>
          {i.name}
        </Text>
        {i.instances.length === 0 
        ? <Text style={{fontSize: 14, color: "rgb(100 116 139)", fontFamily:"Raleway_500Medium"}}>No instances logged</Text>
        : DateTime.fromISO(i.instances[i.instances.length - 1].date).hasSame(DateTime.now(), "day")
        ? <Text style={{fontSize: 14, color: "rgb(100 116 139)", fontFamily:"Raleway_500Medium"}}>Last instance: Today</Text>
        : <Text style={{fontSize: 14, color: "rgb(100 116 139)", fontFamily:"Raleway_500Medium"}}>Last instance: {String(DateTime.fromISO(i.instances[i.instances.length - 1].date).toFormat('dd LLL yyyy'))}</Text>}
        </View>
        <View style={styles.buttonsContainer}>
          {i.id === addData?.activity
          && <TouchableOpacity style={styles.activityButton} onPress={() => setShowForm(!showForm)} >
            <Feather size={20} name='edit' color={"rgb(59 130 246)"} />
          </TouchableOpacity>}
        <Link 
        asChild
        href={{
          pathname: `/${[i.name.toLowerCase()]}`,
          params: { activity: i.name.toLowerCase() }
      }}>
        <TouchableOpacity style={styles.activityButton} onPress={() => {}} >
        <Feather size={20} name="activity" color={"rgb(59 130 246)"} />
        </TouchableOpacity>
      </Link>
      <TouchableOpacity style={styles.activityButton} onPress={() => {handleClick(i.id)}} >
        <Feather size={20} name='check' color={"rgb(59 130 246)"} />
      </TouchableOpacity>
      </View>
      </View>
      {i.id === addData?.activity && showForm === true
      && <DataForm setShowForm={(bool) => setShowForm(bool)} getData={() => getData()} setAddData={data => setAddData(data)} data={data} activityId={addData.activity} instanceId={addData.instance} />}
      </View>
      ))
      : <Text>No activities. Click the help button (bottom right corner) to get started.</Text>}
      <StatusBar style="auto" />
    </View>
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
  activityHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
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
    alignItems: 'center',
    justifyContent: "flex-start",
    height: "85%",
    width: "100%",
    padding: 12,
    backgroundColor: "white"
    
  },
  activityLarge: {
    ...activity,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "95%",    
    height: "auto",
    flexGrow: 1,
    marginVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
  }
});
