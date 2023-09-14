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
    <View testID="day-overview" style={styles.container}>
      {instances.length === 0 && <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 0, marginBottom: 3}}>
        Nothing logged on this day.
      </Text>}
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
          && <Text testID={`${i.id}-count`} style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
            Count: {i.count}
          </Text>}
          {i.notes 
          && <Text testID={`${i.id}-notes`} style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
            {i.notes ? i.notes : "No notes logged"}
          </Text>}
          {i.hashtags 
          && <Text testID={`${i.id}-hashtags`} style={{fontFamily: "Raleway_500Medium", fontSize: 14, marginHorizontal: 12, marginVertical: 6}}>
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
    marginVertical: 6,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(229 229 229)"
  }
})