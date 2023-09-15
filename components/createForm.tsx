import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import { Formik } from "formik";
import uuid from 'react-native-uuid'
import { colorArr } from "../app/create";
import { ActivityType } from "../app";

export type CreateFormProps = {
  handleCreate: (activity: ActivityType) => void
  setSelectedColor: (color: string) => void
  selectedColor: string
  uuid: string
}


export default function CreateForm(props: CreateFormProps) {
  const { handleCreate, setSelectedColor, selectedColor, uuid } = props;
  return (
    <ScrollView testID="create-activity-view" style={styles.container} onTouchStart={Keyboard.dismiss}>
      <Animatable.View 
    animation={"fadeIn"}
    duration={500}
    iterationCount={1}>
      <Formik
        initialValues={{
           name: '',
           blurb: '',
           instances: [],
           id: uuid,
          }}
        onSubmit={values => handleCreate({...values, color: selectedColor})}
      >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View style={{...styles.formikContainer, }}>
        <Text style={{fontFamily: "Raleway_700Bold", fontSize: 24, margin: 6, color: selectedColor }}>
        Create Activity
      </Text>
        <View           
          style={styles.inputContainer}
        >
         <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 18, }}>
          Activity
         </Text>
         <TextInput
          testID="activity-input"
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
         <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 18}}>
          Blurb
         </Text>
         <TextInput
         testID="blurb-input"
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
          <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 18}}>
            Color
          </Text>
          <View testID="color-picker" style={styles.colorPickerContainer}>
            {colorArr.map(i => (
              <TouchableOpacity testID={`${i}-color`} onPress={() => setSelectedColor(i)} key={i}>
                <View style={selectedColor === i ? {...styles.colorPicker, backgroundColor: i, borderColor: "black", borderWidth: 2} : {...styles.colorPicker, backgroundColor: i}} />
              </TouchableOpacity>
            ))}
          </View>
          </View>
         
         <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
          <Text style={{fontFamily: "Raleway_500Medium", color: "rgb(59 130 246)", backgroundColor: "white"}}>
            Create
          </Text>
         </TouchableOpacity>
       </View>
     )}
      </Formik>
      </Animatable.View>
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
  container: {
    flex: 1,
    width: "100%",
    padding: 12,
    paddingBottom: "50%"
  },
  formikContainer: {
    alignItems: 'center',
    justifyContent: "flex-start",
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: "50%",
    shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
  },

  textInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor: "white",
    fontSize: 16
  },
  blurbInput: {
    borderColor: "rgb(203 213 225)",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    height: 140,
    backgroundColor: "white",
    fontSize: 16
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
