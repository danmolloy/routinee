import { StyleSheet, Text, View } from "react-native";

export default function Loading() {

  return (
    <View style={styles.loadingView}>
      <Text style={{ fontSize: 20, color: "black" }}>Loading..</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  }
})