import { Link, Slot } from 'expo-router';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Layout() {


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
      </View>
      <Slot />
      <View style={styles.footer}>
        <Link href="/" asChild>

        <TouchableHighlight 
        style={styles.link}
        activeOpacity={0.6}
        underlayColor="black"
        
        >
          <Feather size={32} name="home" color={"rgb(59 130 246)"} />
        </TouchableHighlight>
        </Link>

        <Link href="/create" asChild>
        <TouchableHighlight 
        style={styles.link}
        activeOpacity={0.6}
        underlayColor="black"
        
        >
          <Feather size={32} name="plus" color={"rgb(59 130 246)"} />
          </TouchableHighlight>
        </Link>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    height: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white"
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    
  },
  link: {
    height: 60,
    width: 60,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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