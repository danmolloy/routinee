import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { DateTime } from 'luxon'
import { Text, View } from 'react-native';

export type CalendarPickerProps = {
  instancesArr: {
    date: string;
    id: string;
  }[]
  selected: string
  setSelected: (arg: string) => void
  activityColor: string
}

export default function CalendarPicker(props: CalendarPickerProps) {
  const { instancesArr, selected, setSelected, activityColor } = props;
  //const [selected, setSelected] = useState(DateTime.now().toFormat('yyyy-MM-dd'));

  const markedDatesObj = (instances: {
    date: string;
    id: string;
  }[]) => {
    let obj: any = {}
    for (let i = 0; i < instances.length; i ++) {
      let key = String(instances[i].date)
      obj[key] = {marked: true, dotColor: "rgb(59 130 246)"}
    }
    return obj
  }

  return (
    <View testID='calendar-picker-view'>
      <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        ...markedDatesObj(instancesArr),
        [selected]: {
          selected: true, 
          marked: instancesArr.find(i => String(i.date) === selected) ? true : false,
          disableTouchEvent: true, 
          selectedColor: activityColor,
          
        },
      }}
    />
    </View>
    
  );
};
