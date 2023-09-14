import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function Footer() {
  return (
    <View testID='footer-view' style={styles.footer}>
    <Link testID='home-link' href="/" asChild>

    <TouchableHighlight 
    style={styles.link}
    activeOpacity={0.6}
    underlayColor="black"
    >
      <Feather size={32} name="home" color={"rgb(59 130 246)"} />
    </TouchableHighlight>
    </Link>

    <Link testID='create-link' href="/create" asChild>
    <TouchableHighlight 
    style={styles.link}
    activeOpacity={0.6}
    underlayColor="black"
    
    >
      <Feather size={32} name="plus" color={"#4ADE80"} />
      </TouchableHighlight>
    </Link>
    <Link testID='help-link' href="/help" asChild>
      <TouchableHighlight 
      style={styles.link}
      activeOpacity={0.6}
      underlayColor="black"
      
      >
        <Feather size={32} name="help-circle" color={"#F472B6"} />
      </TouchableHighlight>
    </Link>
  </View>
  )
}


const styles = StyleSheet.create({
  
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopColor: "rgb(239 246 255)",
    borderTopWidth: 1
  },
  link: {
    height: 60,
    width: 60,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 12,
    backgroundColor: "white",
    margin: 4,
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

  },
})