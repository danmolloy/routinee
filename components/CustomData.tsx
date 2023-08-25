import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function CustomData() {
  return (
    <View style={styles.customDataContainer}>
          <Text>
            Add Custom Data 
          </Text>
          <Text>
            Label
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={() => {}}
            onBlur={() => {}}
            value={""}
         />
         <View>
          <Text>
            Data Type
          </Text>
          <TouchableOpacity>
            <Text>
              Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              Numeric
            </Text>
          </TouchableOpacity>
         </View>
          
         </View>
  )
}

const styles = StyleSheet.create({
  customDataContainer: {},
  textInput: {},
})