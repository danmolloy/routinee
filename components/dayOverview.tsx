import { StyleSheet, Text, View } from "react-native";
import { ActivityInstance } from "../app";
import { useFonts, Raleway_600SemiBold, Raleway_700Bold, Raleway_400Regular, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { DateTime } from "luxon";

export type DayOverviewProps = {
  selectedDate: string
  instances: ActivityInstance[]
  hashtagFilters: string
}

export default function DayOverview(props: DayOverviewProps) {
  const { selectedDate, instances, hashtagFilters } = props;
  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_500Medium,
    Raleway_700Bold,
    Raleway_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, paddingVertical: 2}}>
        {String(DateTime.fromISO(selectedDate).toFormat("EEE dd LLLL yyyy"))}
      </Text>
      <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 0, marginBottom: 3}}>
        {instances.length} instance{instances.length > 1 && "s"} logged.
      </Text>
      {instances.map(i => (
        <View key={i.id} style={styles.instanceContainer}>
          <Text style={{fontFamily: "Raleway_500Medium", fontSize: 16}}>
            Instance {instances.indexOf(i) + 1}
          </Text>
          {!i.count && !i.hashtags && !i.notes
          && <Text style={{fontFamily: "Raleway_400Regular", fontSize: 14, color: "rgb(100 116 139)", marginHorizontal: 12, marginVertical: 6}}>
            No information
          </Text>}
          {i.count 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
            Count: {i.count}
          </Text>}
          {i.notes 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
            Notes: {i.notes ? i.notes : "n/a"}
          </Text>}
          {i.hashtags 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
            {i.hashtags && i.hashtags.length > 0 ? [...i.hashtags.map(i => (
              <Text key={i}>
                {`#${i} `}
              </Text>
            ))] : "n/a"}
          </Text>}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: "25%"
  },
  instanceContainer: {
    marginVertical: 12,
    marginHorizontal: 12
  }
})