import { Feather } from "@expo/vector-icons";
import { useFonts, Raleway_700Bold, Raleway_600SemiBold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import { Image } from "expo-image"

const helpArr = [
  {
    header: "Create Activity",
    info: [
      "To get started, click the plus button to create a new activity to track.",
      "As well as naming your activity, you can give it a small blurb. This could be a small encouraging phrase or a reminder of what you're aiming for.",
/*       "Additionally, you can add further data sections. This might be to log how many reps you did or for how long.",
 */      "Click Create once you're happy with your activity info.",
    ]
  },
  {
    header: "Logging an Instance",
    info: [
      "On the home screen, you can see a list of your activities. Click the tick when you do your activity.",
      "This will render a new button - click this to add any further data such as time or reps in the count section.",
      "You can also add as many hashtags as you like. Use these to filter instances."
    ]
  },
  {
    header: "Viewing your data",
    info: [
      "View the data of your instance by clicking the activity name. The data page contains a month view calendar or a year-long heat chart.",
      "Select a day on the calendar/heat chart to view a list of instances you logged that day.",
      "You can also filter your instances by the hashtags you've added.",
      "Additionally, you can edit the activity (and it's instances) or delete it."
    ]
  }
]

export default function HelpCenter() {
  const [pageIndex, setPageIndex] = useState<number>(0)
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold, 
    Raleway_500Medium,
  });
  const [fadeInOut, setFadeInOut] = useState("")

  const handlePress = (operator: string) => {
    if (operator === "+" && pageIndex < helpArr.length - 1) {
      setFadeInOut("fadeOutLeftBig")
      setTimeout(() => {
        setPageIndex(pageIndex + 1)
        setFadeInOut("fadeInRightBig")
      }, 500)
    } else if (operator === "-" && pageIndex > 0) {
      setFadeInOut("fadeOutRightBig")

      setTimeout(() => {
        setPageIndex(pageIndex - 1)
        setFadeInOut("fadeInLeftBig")
      }, 500)
    } else {
      return;
    }
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={require('../assets/character.png')}/>
      <Animatable.View 
        animation={fadeInOut}
        duration={500}
        iterationCount={1}>
      <View style={styles.textContainer}>
      <View>
        <Text style={styles.header}>
          {helpArr[pageIndex].header}
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        {helpArr[pageIndex].info.map(i => (
          <Text key={i} style={styles.text}>
            {i}
          </Text>
        ))}
      </View>
      
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => handlePress("-")} style={styles.navBtn}>
          <Feather size={32} name="chevron-left" color={"#F59E0B"}/>
        </TouchableOpacity>
        <Text style={styles.text}>
          {`${pageIndex + 1} / ${helpArr.length}`}
        </Text>
        <TouchableOpacity onPress={() => handlePress("+")} style={styles.navBtn}>
          <Feather size={32} name="chevron-right" color={"#F59E0B"} />
        </TouchableOpacity>
      </View>
      </View>
      </Animatable.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    marginHorizontal: 8
  },
  textContainer: {
    marginTop: -56,
    backgroundColor: "white",
    height: "100%",
    borderRadius: 12,
    padding: 12,
    shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
  zIndex: 1,

  },
  sectionContainer: {
    padding: 12,
    backgroundColor: "transparent"
  },
  header: {
    fontSize: 24,
    padding: 12,
    fontFamily: "Raleway_700Bold",
    color: "#6366F1"
  },
  text: {
    paddingVertical: 12,
    fontFamily: "Raleway_600SemiBold",
    color: "black",
    fontSize: 18
  },
  btnContainer: {
    marginVertical: 24, 
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  navBtn: {
   
    width: 60, 
    height: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    
  },
  image: {
    marginTop: -10,

    width: 100, 
    height: 100, 
  },
})