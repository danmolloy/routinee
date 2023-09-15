import { StyleSheet, Text, View, TextInput, Button, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import uuid from 'react-native-uuid'
import { Field, Formik } from 'formik'
import { router } from "expo-router";
import { ActivityType } from ".";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import CreateForm from "../components/createForm";

export const colorArr = ["rgb(74 222 128)", "rgb(168 85 247)", "rgb(244 63 94)",  "rgb(34 211 238)", "rgb(99 102 241)", "rgb(244 114 182)", "rgb(245 158 11)"]


export const colorPalettes: {
  primary: string
  light: string
  dark: string
  darkest: string
}[] = [
  {
    primary: "rgb(74 222 128)",
    light: "rgb(187 247 208)",
    dark: "rgb(22 163 74)",
    darkest: "rgb(22 101 52)",
  },
  {
    primary: "rgb(168 85 247)",
    light: "rgb(216 180 254)",
    dark: "rgb(126 34 206)",
    darkest: "rgb(88 28 135)",
  },
  {
    primary: "rgb(244 63 94)",
    light: "rgb(253 164 175)",
    dark: "rgb(190 18 60)",
    darkest: "rgb(136 19 55)"
  },
  { 
    primary: "rgb(34 211 238)",
    light: "rgb(165 243 252)",
    dark: "rgb(8 145 178)",
    darkest: "rgb(21 94 117)",
  },
  { 
    primary: "rgb(99 102 241)",
    light: "rgb(165 180 252)",
    dark: "rgb(67 56 202)",
    darkest: "rgb(49 46 129)",

  },
  {
    primary: "rgb(244 114 182)",
    light: "rgb(251 207 232)",
    dark: "rgb(219 39 119)",
    darkest: "rgb(157 23 77)"
  }, 
  {
    primary: "rgb(245 158 11)",
    light: "rgb(252 211 77)",
    dark: "rgb(180 83 9)",
    darkest: "rgb(146 64 14)"
  }
]

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
    <CreateForm 
      handleCreate={(activity) => handleCreate(activity)}
      setSelectedColor={(color) => setSelectedColor(color)}
      selectedColor={selectedColor}
      uuid={String(uuid.v1())}
    />
  )
}
