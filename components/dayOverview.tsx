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
      <Text style={{fontFamily: "Raleway_700Bold", fontSize: 20, paddingVertical: 8}}>
        {String(DateTime.fromISO(selectedDate).toFormat("dd LLLL yyyy"))}
      </Text>
      <Text style={{fontFamily: "Raleway_500Medium", fontSize: 16, marginHorizontal: 12, marginBottom: 6}}>
        You have {instances.length} instance{instances.length > 1 && "s"} on this day {hashtagFilters !== "" && `tagged #${hashtagFilters}`}.
      </Text>
      {instances.map(i => (
        <View key={i.id} style={styles.instanceContainer}>
          <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 20}}>
            Instance {instances.indexOf(i) + 1}
          </Text>
          {!i.count && !i.hashtags && !i.notes
          && <Text style={{fontFamily: "Raleway_400Regular", fontSize: 16, color: "rgb(100 116 139)", marginHorizontal: 12, marginVertical: 6}}>
            No information on this instance
          </Text>}
          {i.count 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 16, marginHorizontal: 12, marginVertical: 6}}>
            Count: {i.count}
          </Text>}
          {i.notes 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 16, marginHorizontal: 12, marginVertical: 6}}>
            Notes: {i.notes ? i.notes : "n/a"}
          </Text>}
          {i.hashtags 
          && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 16, marginHorizontal: 12, marginVertical: 6}}>
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
    padding: 12
  },
  instanceContainer: {
    marginVertical: 12,
    marginHorizontal: 12
  }
})