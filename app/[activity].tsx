import { Link, router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { ActivityInstance, ActivityType } from ".";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import CalendarPicker from "../components/calendar";
import { DateTime } from 'luxon';
import { useFonts, Raleway_700Bold, Raleway_500Medium, Raleway_400Regular } from '@expo-google-fonts/raleway';
import DayOverview from "../components/dayOverview";
import { Feather } from "@expo/vector-icons";
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Loading from "../components/loading";
import { colorPalettes } from "./create";

const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const yearArr = new Array(364);


for (let i = 0; i < yearArr.length; i++) {
  yearArr[i] = {
    date: String(DateTime.now().minus({days:i}).toFormat('yyyy-MM-dd'))
  }
}

const monthIndex = yearArr[0].date.slice(5, 7)


export const getHashtags = (instances: ActivityInstance[]) => {
  let hashtagsSet = new Set<string>()
  for (let i = 0; i < instances.length; i++) {
    if (instances[i].hashtags !== undefined) {
      instances[i].hashtags?.filter(i => i !== "" && i !== " ").forEach(hashtag => hashtagsSet.add(hashtag));
    }
  }
  return Array.from(hashtagsSet);
}

export default function Activity() {
  const { activity } = useLocalSearchParams()
  const [data, setData] = useState<ActivityType|null>(null)
  const [calendarType, setCalendarType] = useState<string>("year")
  const [selected, setSelected] = useState(DateTime.now().toFormat('yyyy-MM-dd'));
  const [selectedSquare, setSelectedSquare] = useState<string>(DateTime.now().toFormat('yyyy-MM-dd'))
  const [hashtagFilters, setHashtagFilters] = useState<string>("")
  const [filteredInstances, setFilteredInstances] = useState<ActivityInstance[]>([])
  
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_500Medium,
    Raleway_400Regular
  });


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      return jsonValue != null ? setData(JSON.parse(jsonValue).find((i: ActivityType) => i.name.toLowerCase() === activity)) : null;
    } catch (e) {

      // error reading value
    }
  }

  useEffect(() => {
    getData()
    
  }, [])

  useEffect(() => {
    if (data && hashtagFilters !== "") {
      setFilteredInstances([...data.instances.filter(i => i.hashtags?.includes(hashtagFilters))])
    } else if (data) {
      setFilteredInstances([...data.instances])
    }
  }, [data])


  const deleteActivity = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      if (jsonValue !== null) {
        const newData = JSON.stringify(JSON.parse(jsonValue).filter((i: any) => i.name.toLowerCase() !== activity))
        await AsyncStorage.setItem('my-data', newData);
        router.replace("/")
      }
    } catch (e) {
      alert(e)
      // error reading value
    }
  }

  const handleDelete = async() => {
    Alert.alert('Delete Activity', `Are you sure you want to delete ${data?.name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteActivity()},
    ]);
  }

  const countPeriodInstances = (instanceArr: {date: string}[], days: number) => {
    return instanceArr.filter(i => String(i.date) > DateTime.now().minus({days:days}).toFormat('yyyy-MM-dd')).length
  }
  

  const handleHashtagPress = (hashtag: string): void => {
    if (hashtagFilters === hashtag && data) {
      setHashtagFilters("")
      setFilteredInstances([...data.instances])

    } else if (data) {
      setHashtagFilters(hashtag)
      setFilteredInstances([...data.instances.filter(i => i.hashtags?.includes(hashtag))])

    }

  } 

  const getSquareStyle = (squareDate: string, numInstances: number) => {
    const styleObj: any = {
      width: 22,
      height: 22,
      margin: 1,
      borderRadius: 2,
    }
    const palette = colorPalettes.find(i => i.primary === data?.color)
    if (selectedSquare === squareDate) {
      styleObj.borderColor = "black",
      styleObj.borderWidth = 2
    } 
    if (numInstances > 2) {
      styleObj.backgroundColor = palette ? palette.dark : data?.color
    } else if (numInstances === 2) {
      styleObj.backgroundColor = palette ? palette.primary : data?.color
    } else if (numInstances === 1) {
      styleObj.backgroundColor = palette ? palette.light : data?.color
    } else {
      styleObj.backgroundColor = "rgb(229 229 229)"    
    }

    return styleObj
  }


  if (data === null) {
    return (
      <Loading />
    )
  }
  if (!fontsLoaded && !fontError) {
    return (
      <Loading />
    )
  }
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
      <View style={styles.header}>
        <Link href={"/"}>
          <Text style={{fontSize: 28, fontFamily: "Raleway_700Bold", color: data.color}}>
            {data.name}
          </Text>
        </Link>
      <Text style={{margin: 12, color: "black", fontFamily: "Raleway_500Medium", fontSize: 18}}>
        {data.blurb}
      </Text>
      {getHashtags(data.instances).length > 0 
      && <View>
        <Text style={{marginHorizontal: 12, marginTop: 0, color: "gray", fontFamily: "Raleway_500Medium", fontSize: 12}}>
          Filter by hashtag
        </Text>
        <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
        {getHashtags(data.instances).map(i => (
        <TouchableOpacity style={{alignSelf: "flex-start"}} key={i} onPress={() => handleHashtagPress(i)}>
          <Text style={hashtagFilters === i ? {...styles.selectedFilter, backgroundColor: data.color} : {margin: 12, color: data.color, fontFamily: "Raleway_500Medium", fontSize: 16}}>
            #{i}
          </Text>
        </TouchableOpacity>
      ))}
      </View>
      </View>}
      </View>
      <View style={styles.tabsView}>
      <TouchableOpacity  style={calendarType === "year" ? {...styles.selectedTabButton, borderBottomColor: data.color}: styles.tabButton} onPress={() => setCalendarType("year")}>
          <Text>
            Year
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={calendarType === "month" ? {...styles.selectedTabButton, borderBottomColor: data.color}: styles.tabButton} onPress={() => setCalendarType("month")}>
          <Text>
            Month
          </Text>
        </TouchableOpacity>
        
      </View>
      {calendarType === "month" 
      ? <View style={styles.monthContainer}>
        {/* <Text style={{fontSize: 20, fontFamily: "Raleway_700Bold", paddingVertical: 8}}>
          Month Overview 
        </Text> */}
        {hashtagFilters !== "" 
        && <Text style={{fontSize: 20, fontFamily: "Raleway_700Bold", paddingVertical: 4, color: data.color}}>
          #{hashtagFilters}
        </Text>}
        {/* <Text style={{marginLeft: 12,fontFamily: "Raleway_400Regular", fontSize: 16, paddingVertical: 4, color: "black"}}>
          28 day count: {countPeriodInstances(filteredInstances, 28)}
        </Text> */}
        <CalendarPicker selected={selected} setSelected={(e) => setSelected(e)} instancesArr={filteredInstances} activityColor={data.color}/> 
        <DayOverview hashtagFilters={hashtagFilters} selectedDate={selected} instances={filteredInstances.filter(i => String(i.date) === selected)}/>     
      </View>
       :<View style={styles.yearContainer}>
        {/* <Text style={{fontSize: 20, fontFamily: "Raleway_700Bold", paddingVertical: 8, }}>
          Year Overview
        </Text> */}
        {hashtagFilters !== "" 
        && <Text style={{fontSize: 20, fontFamily: "Raleway_700Bold", paddingVertical: 4, color: data.color}}>
          #{hashtagFilters}
        </Text>}
       {/*  <Text style={{marginLeft: 12,fontFamily: "Raleway_400Regular", fontSize: 16, paddingVertical: 4, color: "black"}}>
          Year count: {countPeriodInstances(filteredInstances, 365)}
        </Text> */}
        <InvertibleScrollView horizontal={true} inverted={true} >
    <View style={{flex: 1, flexDirection: "column"}}>
    <View style={styles.monthArr}>
        {[...monthsArr.slice(monthIndex), ...monthsArr.slice(0, monthIndex)].map(i => (
          <Text key={i} style={{fontFamily: "Raleway_400Regular", fontSize: 12,}}>
            {i}
          </Text>
        ))}
      </View>
      <View style={styles.gridContainer}>
      
      {yearArr.map(i => (
        <TouchableOpacity key={i.date}  onPress={() => setSelectedSquare(i.date)} 
          style={getSquareStyle(i.date, filteredInstances.filter(j => j.date === i.date).length)
/*             i.date === selectedSquare && filteredInstances.find(j => j.date === i.date)
            ? {...styles.gridSquareBlueSelected, backgroundColor: data.color}
            : i.date === selectedSquare && !filteredInstances.find(j => j.date === i.date)
            ? styles.gridSquareGraySelected
            : filteredInstances.find(j => j.date === i.date)
            ? {...styles.gridSquareBlue, backgroundColor: data.color}
            : styles.gridSquareGray */}>
            </TouchableOpacity>
      ))}
            </View>

      </View>
      </InvertibleScrollView>
  <DayOverview hashtagFilters={hashtagFilters} selectedDate={selectedSquare} instances={filteredInstances.filter(i => String(i.date) === selectedSquare)}/>     
      </View>}
      <View style={styles.buttonsContainer}>
        <Link href={{
          pathname: "/edit/[id]",
          params: { id: data.id }
        }} asChild>
          <TouchableOpacity style={styles.editButtons}>
            <Feather style={{color: "rgb(245 158 11)", paddingHorizontal: 4}} name="edit-2" />
            <Text style={{color: "rgb(245 158 11)", fontFamily: "Raleway_500Medium",}}>
            Edit Activity
            </Text>
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity style={styles.editButtons} onPress={() => handleDelete()}>
          <Feather style={{color: "rgb(239 68 68)", paddingHorizontal: 4}} name="trash-2" />
          <Text style={{fontFamily: "Raleway_500Medium", color: "rgb(239 68 68)"}}>
            Delete Activity
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  )
}

{/*       <InvertibleScrollView horizontal={true} inverted={true} >
 */}      

const gridSquare = {
  width: 22,
  height: 22,
  margin: 1,
  borderRadius: 2,

}



const styles = StyleSheet.create({
  tabsView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tabButton: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 8,
  },
  selectedTabButton: {
    width: "30%",
    borderBottomWidth: 3,
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "rgb(96 165 250)",
  },

  monthArr: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 4,
    justifyContent: "space-between",
    width: "auto",
    marginLeft: 32,
  },
  selectedFilter: {
    margin: 8, 
    padding: 4,
    color: "white", 
    fontFamily: "Raleway_500Medium", 
    fontSize: 16,
    width: "auto",
    borderRadius: 10,
    overflow: "hidden"
  },
  loadingView: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  gridSquareBlueSelected: {
    ...gridSquare,
    backgroundColor: "rgb(96 165 250)",
    borderColor: "black",
    borderWidth: 2,
  },
  gridSquareGraySelected: {
    ...gridSquare,
    backgroundColor: "rgb(229 229 229)",
    borderColor: "black",
    borderWidth: 2,
  },
  gridSquareBlue: {
    ...gridSquare,
    backgroundColor: "rgb(96 165 250)",
  },
  gridSquareGray: {
    backgroundColor: "rgb(229 229 229)",
    ...gridSquare,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    flexWrap: "wrap-reverse",
    height: 170,
    width: "auto",
    alignContent: "center",
    justifyContent: "flex-start",
    overflow: "scroll",
  },
  weekContainer: {
    height: 140,
    width: "95%"
  },
  monthContainer: {
    width: "95%",
    paddingVertical: 24,
  },
  yearContainer: {
    width: "95%",
    paddingVertical: 24,

  },
  header: {
    width: "95%",
  },
  editButtons: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 0.5,
    margin: 4,
    padding: 12,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonsContainer: {
    marginVertical: 12,
    flex: 1, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});


