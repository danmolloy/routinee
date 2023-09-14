import { Link, Slot } from 'expo-router';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from '../components/footer';



export default function Layout() {

  return (
    <View testID='layout-view' style={styles.container}>
      <View testID='header-view' style={styles.header}>
      </View>
      <Slot />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  header: {
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white"
  },
})