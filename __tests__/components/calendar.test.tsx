import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from "luxon";
import * as Animatable from 'react-native-animatable';
import CalendarPicker, { CalendarPickerProps } from "../../components/calendar";

jest.mock("react-native-animatable");
jest.mock("@react-native-async-storage/async-storage");

const mockProps: CalendarPickerProps = {
  instancesArr: mockActivity.instances,
  selected: DateTime.now().toFormat('yyyy-MM-dd'),
  setSelected: jest.fn(),
  activityColor: mockActivity.color,
}

describe("<CalendarPicker />", () => {
  beforeEach(async() => {
    await waitFor(() => {
      render(<CalendarPicker {...mockProps} />)
    })
  })
  it("calendarPicker view is Truthy", () => {
    const calendarPickerView = screen.getByTestId("calendar-picker-view")
    expect(calendarPickerView).toBeTruthy()
  })
})