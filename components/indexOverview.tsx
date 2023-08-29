import { useFonts, Raleway_700Bold, Raleway_600SemiBold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { Feather } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityType } from '../app';

type IndexOverviewProps = {
  data: ActivityType[]
}

export default function IndexOverview(props: IndexOverviewProps) {
  const { data } = props;
  const [selectedDate, setSelectedDate] = useState(DateTime.now().startOf("week").toFormat('yyyy-MM-dd'));

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold, 
    Raleway_500Medium,
  });

  const selectDate = (operand: string) => {
    const thisWeek = DateTime.now().startOf("week")
    if (operand == "plus" && selectedDate !== thisWeek.toFormat('yyyy-MM-dd')) {
      setSelectedDate(DateTime.fromJSDate(new Date(selectedDate)).plus({days: 7}).toFormat('yyyy-MM-dd'))
    } else if (operand == "minus" && selectedDate !> thisWeek.minus({weeks: 24}).toFormat('yyyy-MM-dd')) {
      setSelectedDate(DateTime.fromJSDate(new Date(selectedDate)).minus({days: 7}).toFormat('yyyy-MM-dd'))
    }
  }

  const getWeekArr = (date: string, data: ActivityType) => {
    let weekArr = [];

    for (let i = 0; i < 7; i++) {
      let formattedDate = String(DateTime.fromJSDate(new Date(date)).plus({days:i}).toFormat('yyyy-MM-dd'))
      let instancesBool = data.instances.find(i => i.date === formattedDate)
      weekArr[i] = {
        date: formattedDate,
        squareColor: instancesBool ? data.color : "white"
      }
    }
    return weekArr;
  }

  const daysOfWeekArr = (date: string) => {
    let weekArr = [];

    for (let i = 0; i < 7; i++) {
      let dateTimeDate = DateTime.fromJSDate(new Date(date)).plus({days:i})
      weekArr[i] = {
        date: dateTimeDate,
      }
    }
    return weekArr;
  }


  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>
          Week Overview
        </Text>
      </View> */}
      <View>
      <View style={styles.dayHeader}>
        <TouchableOpacity style={styles.navigateDayBtn} onPress={() => selectDate("minus")}>
          <Feather name="chevron-left" />
        </TouchableOpacity>
        <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, paddingVertical: 2}}>
          Week of {String(DateTime.fromISO(selectedDate).toFormat("dd LLLL yyyy"))}
        </Text>
        <TouchableOpacity style={styles.navigateDayBtn} onPress={() => selectDate("plus")}>
          <Feather name="chevron-right" />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.daysContainer}>
        {daysOfWeekArr(selectedDate).map(i => (
          <View key={String(i.date)} style={{ width:32, }}>
            <Text style={{textAlign: "center"}}>
              {String(i.date.toFormat("EEE"))}
            </Text>
          </View>
        ))}
        </View>
      {data.map(i => (
        <View key={i.id} style={styles.activitiesContainer}>
          {getWeekArr(selectedDate, i).map(j => (
          <View key={j.date} style={{...styles.square, backgroundColor: j.squareColor}} />
        ))}
        </View>
      ))}
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    width: 32,
    height: 32,
    borderRadius: 24,
    backgroundColor: "red",
    margin: 2,
    shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-evenly",
    width: "100%",

  },
  daysContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-evenly"
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-evenly"
  },
  container: {
    width: "100%",
    marginVertical: "25%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dayHeader: {
    flex: 1, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 12
  },
  navigateDayBtn: {
    padding: 4
  }
  
})