import { StyleSheet, Text, View, TextInput, Button, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import uuid from 'react-native-uuid'
import { Field, Formik } from 'formik'
import { router } from "expo-router";
import { ActivityType } from ".";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CustomData from "../components/CustomData";

export const colorArr = ["rgb(74 222 128)", "rgb(168 85 247)", "rgb(244 63 94)",  "rgb(34 211 238)", "rgb(99 102 241)", "rgb(244 114 182)", "rgb(52 211 153)", "rgb(245 158 11)"]

export default function CreateActivity() {
  const [name, setName] = useState("")
  const [blurb, setBlurb] = useState("")
  const [data, setData] = useState([])
  const [selectedColor, setSelectedColor] = useState(colorArr[0])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      return jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      alert(e)
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const handleCreate = async (activity: ActivityType) => {
    if (activity.name.length < 1) {
      return;
    }
    
    try {
      if (data.length > 0) {
        await AsyncStorage.setItem('my-data', JSON.stringify([...data, activity]));
      } else {
        await AsyncStorage.setItem('my-data', JSON.stringify([activity]));
      }
      router.replace("/")
    } catch (e) {
      alert("Error")
    }
    
  }

  return (
    <ScrollView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <Text style={{fontFamily: "Raleway_700Bold", fontSize: 20, margin: 6}}>
        Create Activity
      </Text>
      <Formik
        initialValues={{
           name: '',
           blurb: '',
           instances: [],
           id: String(uuid.v1()),
          }}
        onSubmit={values => handleCreate({...values, color: selectedColor})}
      >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View style={styles.formikContainer}>
        <View           
          style={styles.inputContainer}
        >
         <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16}}>
          Activity
         </Text>
         <TextInput
          placeholder="Exercise"
          style={styles.textInput}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
         />
         </View>
         <View 
          style={styles.inputContainer}
         >
         <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16}}>
          Blurb
         </Text>
         <TextInput
            placeholder="Three times a week. Remember what you're aiming for!"
            style={styles.blurbInput}
           onChangeText={handleChange('blurb')}
           onBlur={handleBlur('blurb')}
           value={values.blurb}
           editable
            multiline={true}
            numberOfLines={4}
            maxLength={150}
         />
         </View>
         <View style={styles.inputContainer}>
          <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16}}>
            Color
          </Text>
          <View style={styles.colorPickerContainer}>
            {colorArr.map(i => (
              <TouchableOpacity onPress={() => setSelectedColor(i)} key={i}>
                <View style={selectedColor === i ? {...styles.colorPicker, backgroundColor: i, borderColor: "black", borderWidth: 2} : {...styles.colorPicker, backgroundColor: i}} />
              </TouchableOpacity>
            ))}
          </View>
          </View>
         
         <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
          <Text style={{fontFamily: "Raleway_500Medium", color: "rgb(59 130 246)"}}>
            Create
          </Text>
         </TouchableOpacity>
       </View>
     )}
      </Formik>
      {/* <CustomData /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    
  },
  colorPickerContainer: {
    flex: 1, 
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap"
  },
  colorPicker: {
    width: 20,
    height: 20,
    borderRadius: 6,
    margin: 2,
  },
  container: {
    flex: 1,
    height: "50%",
    
    width: "100%",
    padding: 12,
    paddingBottom: "50%"
  },
  formikContainer: {
    height: "70%",
    alignItems: 'center',
    justifyContent: "flex-start",
    width: "100%",
    padding: 12,
  },

  textInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
  },
  blurbInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    height: 100
  },
  inputContainer: {
    width: 250,
    padding: 12,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  },
  submitButton: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 0.5,
    margin: 4,
    padding: 12,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

  },
  inputLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 16
  },
});
