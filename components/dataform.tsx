import { Formik } from "formik";
import { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { DateTime } from "luxon"
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityType } from "../app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Raleway_700Bold, Raleway_600SemiBold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getHashtags } from "../app/[activity]";



export type DataFormProps = {
  activityId: string
  instanceId: string
  data: ActivityType[]
  setAddData: (data: any) => void
  setShowForm: (arg: boolean) => void
  getData: () => void
  color: string
}

export type InstanceData = {
  activityId: string
  instanceId: string
  date: Date
  count: number
  notes: string
  hashtags: string
}

export default function DataForm(props: DataFormProps) {
  const { activityId, instanceId, data, getData, setAddData, setShowForm, color } = props;
  const [newDate, setNewDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold, 
    Raleway_500Medium,
  });

  const handleSubmit = async (values: InstanceData) => {
    let dataObj: any = {};
    let formDate = DateTime.fromJSDate(newDate).toFormat('yyyy-MM-dd')
    let activity = data.find(i => i.id == values.activityId)
    let instance = activity?.instances.find(i => i.id === values.instanceId)
    let hastagsArr = values.hashtags.toLowerCase().split(" ").filter(i => i !== "" && i !== " ")

    if (String(instance?.date) !== String(formDate)) {
      dataObj.date = formDate
    } 

    if (values.count > 0) {
      dataObj.count = values.count
    }
    if (values.notes !== "") {
      dataObj.notes = values.notes
    }
    if (values.hashtags.length > 0) {
      dataObj.hashtags = hastagsArr
    }


    if (Object.keys(dataObj).length > 0 && activity) {
      dataObj.date = DateTime.fromJSDate(newDate).toFormat('yyyy-MM-dd')
      dataObj.id = instanceId
      activity.instances = [...activity.instances.slice(0, -1), dataObj]
      /* const activityIndex = data.findIndex((i: any) => i.id === activityId)
      const newData = [...data].splice(activityIndex, 1, activity) */
      const otherActivities = data.filter(i => i.id !== activityId)
      const newData = [...otherActivities, activity]
      
      try {
        await AsyncStorage.setItem('my-data', JSON.stringify(newData));
        getData()
        setAddData(null)
        setShowForm(false)
      } catch (e) {
        alert("Error")
      }
    }
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false)
    setNewDate(currentDate);
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const activity = data.find(i => i.id == activityId)

  return (
    <ScrollView style={styles.container} onTouchStart={Keyboard.dismiss}> 
      <Formik
        initialValues={{
          activityId: activityId,
          instanceId: instanceId,
          date: newDate,
          count: 0,
          notes: "",
          hashtags: "",
        }}
        onSubmit={values => handleSubmit(values)}
      >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View style={styles.formikContainer} >
        {/* <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 18, alignSelf: "flex-start", marginVertical: 6}}>
          Add Data
        </Text> */}
        <View 
          style={styles.inputContainer}
         >
         <Text style={{...styles.inputLabel, color: color}}>
          Date 
         </Text>
          
          <DateTimePicker style={styles.datePicker} value={newDate} onChange={onDateChange}/>
         </View>

        <View           
          style={styles.inputContainer}
        >
         <Text style={{...styles.inputLabel, color: color}}>
          Count/Reps
         </Text>
         <TextInput
           style={styles.textInput}
           keyboardType="numeric"
           onChangeText={handleChange('count')}
           onBlur={handleBlur('count')}
           value={String(values.count)}
         />
         </View>

         <View 
          style={styles.inputContainer}
         >
         <Text style={{...styles.inputLabel, color: color}}>
          Notes
         </Text>
         <TextInput
          placeholder="Really glad I did it! Feeling great."
            style={styles.textAreaInput}
           onChangeText={handleChange('notes')}
           onBlur={() => {handleBlur('notes'); Keyboard.dismiss()}}
           value={values.notes}
           editable
          multiline
          numberOfLines={4}
          maxLength={40}
         />
         </View>
         
        <View 
          style={styles.inputContainer}
         >
         <Text style={{...styles.inputLabel, color: color}}>
          Hastags
         </Text>
         <TextInput
          placeholder={activity !== undefined && getHashtags(activity.instances).length > 0 ?  getHashtags(activity.instances).reverse().join(" ") : "fun exciting keepOnPushing"}
          style={styles.textAreaInput}
          onChangeText={handleChange('hashtags')}
          onBlur={handleBlur('hashtags')}
          value={values.hashtags}
          editable
          multiline={true}
          numberOfLines={2}
          maxLength={150}
         />
         </View>
         <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
          <Text style={{fontFamily: "Raleway_500Medium", color: color}}>Submit</Text>
        </TouchableOpacity>
       </View>
     )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  formikContainer: {
    flex: 1,
    height: "auto",
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
    height: 32,
    backgroundColor: "white",
    fontSize: 17,
  },
  textAreaInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    height: 64,
    backgroundColor: "white",
    fontSize: 15,

  },
  inputContainer: {
    width: 250,
    marginVertical: 12,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
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
    backgroundColor: "white",
  },
  inputLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 15,
  },
  datePicker: {
    alignSelf: "flex-start",
    marginVertical: 8,
  }
})