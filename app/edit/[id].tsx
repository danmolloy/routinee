import { router, useLocalSearchParams } from "expo-router";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityType } from "..";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FieldArray, Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { colorArr } from "../create";

export default function EditActivity() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<ActivityType|null>(null)
  const [selectedColor, setSelectedColor] = useState(colorArr[0])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      jsonValue != null ? setSelectedColor(JSON.parse(jsonValue).find((i: ActivityType) => i.id === id).color) : null;
      return jsonValue != null ? setData(JSON.parse(jsonValue).find((i: ActivityType) => i.id === id)) : null;
    } catch (e) {

      // error reading value
    }
  }

  useEffect(() => {
    getData()
    
  }, [])

  if (data === null) {
    return (
      <Loading />
    )
  }

  const handleEdit = async (activity: ActivityType) => {
    if (activity.name.length < 1) {
      return;
    }
    const jsonValue = await AsyncStorage.getItem('my-data');
    const activities = jsonValue && JSON.parse(jsonValue)
    const activityIndex = activities.findIndex((i: any) => i.id === id)
    activities.splice(activityIndex, 1, activity)
    
    try {
      await AsyncStorage.setItem('my-data', JSON.stringify(activities));
      router.replace(`/`)
    } catch (e) {
      alert("Error")
    }
    
  }



  return (
    <ScrollView  style={styles.container} onTouchStart={Keyboard.dismiss}>
      <Formik
        initialValues={{
           name: data.name,
           blurb: data.blurb,
           instances: data.instances,
           id: data.id,
          }}
        onSubmit={values => handleEdit({...values, color: selectedColor})}
      >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View style={styles.formikContainer}>
        <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 20, marginVertical: 6, color: selectedColor}}>
        Edit Activity
      </Text>
        <View           
          style={styles.inputContainer}
        >
         <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16}} >
          Activity
         </Text>
         <TextInput
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
          Instances
         </Text>
         <FieldArray name="instances">
          {({insert, remove, push}: any) => (
          <ScrollView style={styles.instancesScrollView}>
          {values.instances.length < 1 
          ? <Text style={{fontFamily: "Raleway_500Medium", fontSize: 14, margin: 6, color: "gray"}}>No instances</Text>
          : values.instances.map((i, index) => (
            <View style={styles.instanceView}>
              <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
              <Text key={i.id} style={{fontSize: 16}}>
                {i.date}
              </Text>
              <TouchableOpacity onPress={() => remove(index)}>
              <Feather style={{color: "rgb(239 68 68)", paddingHorizontal: 4}} name="trash-2" />
              </TouchableOpacity>
              </View>
              {i.count && <Text key={i.id} style={{fontSize: 12, marginLeft: 8}}>
                Count: {i.count}
              </Text>}
              {i.hashtags && <Text key={i.id} style={{fontSize: 12, marginLeft: 8}}>
                Hashtags: {JSON.stringify(i.hashtags)}
              </Text>}
              {i.notes && <Text key={i.id} style={{fontSize: 12, marginLeft: 8}}>
                Notes: {i.notes}
              </Text>}
              {!i.count && !i.hashtags && !i.notes 
              && <Text key={i.id} style={{fontSize: 12, marginLeft: 8}}>
              No data
            </Text>}
            </View>
          ))}
          </ScrollView>
          )}
         </FieldArray>
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
            Submit
          </Text>
         </TouchableOpacity>
       </View>
     )}
      </Formik>

      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  colorPickerContainer: {
    flex: 1, 
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
    borderRadius: 12,
    justifyContent: 'space-evenly',
    marginVertical: 8
  },
  colorPicker: {
    width: 24,
    height: 24,
    borderRadius: 6,
    margin: 2,
  },
  instancesScrollView: {
    flex: 1, 
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 4,
    borderRadius: 5,
    width: "100%",
    margin: 8,
    backgroundColor: "white"

  },
  instanceView: {
    flex: 1,
    flexDirection: "column",
    padding: 4,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 20
  },
  container: {
    flex: 1,
    height: "50%",
    width: "100%",
    padding: 12,

  },
  formikContainer: {
    alignItems: 'center',
    justifyContent: "flex-start",
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: "50%"

  },

  textInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor: "white",
    fontSize: 18
  },
  blurbInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    height: 100,
    fontSize: 18,
    backgroundColor: "white"
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
    backgroundColor: "white"

  },
  inputLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 16,
    color: "white"
  },
});
