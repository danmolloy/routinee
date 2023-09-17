import {  StyleSheet, Text, View } from "react-native";
import { ActivityType } from "../app"
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DateTime } from "luxon";
import { Feather } from "@expo/vector-icons";
import DataForm from "./dataform";
import { useRef, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { Emitter } from "react-native-particles";

export type ActivityTabProps = {
  activity: ActivityType
  addData: {activity: string, instance: string}|null
  showForm: boolean
  setShowForm: (arg: boolean) => void
  getData: () => void
  setAddData: (arg:{
    activity: string 
    instance: string
  }) => void
  data: ActivityType[]
  handleClick: (id: string) => void
}



export default function ActivityTab(props: ActivityTabProps) {
  const { activity, addData, showForm, setShowForm, getData, data, setAddData, handleClick, } = props;
  const [animation, setAnimation] = useState(false)
  const [sparkles, setSparkles] = useState(false)


  const handleAnimation = () => {
    setAnimation(true)
    setSparkles(true)
    setTimeout(() => {
      setAnimation(false);
    }, 300);
    setTimeout(() => {
      setSparkles(false);
    }, 2000);

  }


  return (
    <View testID="activity-tab-view" style={ activity.id === addData?.activity && showForm === true ? {...styles.activityLarge} : {...styles.activitySimple, }}>
        <Link 
        testID="activity-link"
        asChild
        style={{width: "100%"}}
        href={{
          pathname: `/${[activity.name.toLowerCase()]}`,
          params: { activity: activity.name.toLowerCase() }
      }}>
        <TouchableOpacity style={{...styles.activityHeader, /* backgroundColor: i.color */}}>
        
          <View style={{}}>
        <Text style={{fontSize: 20, color: activity.color, fontFamily:"Raleway_700Bold"}}>
          {activity.name}
        </Text>
        {activity.instances.length === 0 
        ? <Text style={{fontSize: 14, fontFamily:"Raleway_500Medium"}}>No instances logged</Text>
        : DateTime.fromISO(activity.instances.sort((a, b) => a.date.localeCompare(b.date))[activity.instances.length - 1].date).hasSame(DateTime.now(), "day")
        ? <Text style={{fontSize: 14, fontFamily:"Raleway_500Medium"}}>Last instance: Today</Text>
        : <Text style={{fontSize: 14, fontFamily:"Raleway_500Medium"}}>Last instance: {String(DateTime.fromISO(activity.instances.sort((a, b) => a.date.localeCompare(b.date))[activity.instances.length - 1].date).toFormat('dd LLL yyyy'))}</Text>}
        </View>
        
        <View style={styles.buttonsContainer}>
          {activity.id === addData?.activity
          && 
          <Animatable.View
     
        animation={"bounceIn"}
        duration={4000}
        iterationCount={1}
        >
          <TouchableOpacity testID="edit-btn" style={styles.activityButton} onPress={() => setShowForm(!showForm)} >
            <Feather size={20} name='edit' color={activity.color} />
          </TouchableOpacity>
          </Animatable.View>
          }
          <Animatable.View
     
        animation={animation ? "rubberBand": ""}
        duration={800}
        iterationCount={1}
        >
      <TouchableOpacity testID="check-btn" style={styles.activityButton} onPress={() => { handleClick(activity.id); handleAnimation()}} > 
      
        <Feather size={20} name='check' color={activity.color} />
       {sparkles && <View style={{top: -16, left: -6}}>
      <Emitter
        numberOfParticles={6}
        emissionRate={6}
        interval={200}
        particleLife={1500}
        direction={-30}
        spread={360}
      >
                    <Feather size={12} name='star' color={activity.color} />

      </Emitter>
      </View>}
      </TouchableOpacity>
      </Animatable.View>
      
      </View>
      </TouchableOpacity>
      </Link>

      {activity.id === addData?.activity && showForm === true
      && <DataForm color={activity.color} setShowForm={(bool) => setShowForm(bool)} getData={() => getData()} setAddData={data => setAddData(data)} data={data} activityId={addData.activity} instanceId={addData.instance} />}
      </View>
  )
}


const activity = {
  backgroundColor: "white",
  borderWidth: 1,
  borderRadius: 5,
}



const styles = StyleSheet.create({
  box: {
    borderWidth: 4,
  },
  activitySimple: {
    borderRadius: 5,
    width: "100%",
    padding: 4,
  },
  activityLarge: {
    borderRadius: 5,
    width: "100%",
    padding: 4,
  },
  activityHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonsContainer: {
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "white"
  },
  activityButton: {
    width: 40,
    height: 40,
    margin: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'rgb(30 64 175)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .2,
    shadowRadius: 2,
    elevation: 2,
  },
});
