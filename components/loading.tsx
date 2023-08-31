import { StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';

export default function Loading() {

  return (
    <View style={styles.loadingView}>
      <Image style={styles.image} source={require('../assets/character.png')}/>

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
  },
  image: {
    width: 100,
    height: 100,
  }
})