import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from "luxon";
import * as Animatable from 'react-native-animatable';
import IndexOverview, { IndexOverviewProps } from "../../components/indexOverview";

jest.mock("react-native-animatable");
jest.mock("@react-native-async-storage/async-storage");

const mockProps: IndexOverviewProps = {
  data: [mockActivity]
}

describe("<IndexOverview />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<IndexOverview {...mockProps} />)
    })
  })
  it("current week is stated", () => {
    const thisWeekFormatted = DateTime.now().startOf("week").toFormat('dd LLLL yyyy')
    const weekTitle = screen.getByText(`Week of ${thisWeekFormatted}`)
    expect(weekTitle).toBeTruthy()
  })
  it("nav buttons move back and forwards weeks", () => {
    const thisWeek = DateTime.now().startOf("week")
    const navBack = screen.getByTestId("nav-back")
    const navForward = screen.getByTestId("nav-forward")
    act(() => {
      fireEvent.press(navBack)
    })
    let weekTitle = screen.getByText(`Week of ${thisWeek.minus({weeks: 1}).toFormat('dd LLLL yyyy')}`)
    expect(weekTitle).toBeTruthy()
    act(() => {
      fireEvent.press(navForward)
    })
    weekTitle = screen.getByText(`Week of ${thisWeek.toFormat('dd LLLL yyyy')}`)
    expect(weekTitle).toBeTruthy()
  })
  it("each day of the week is labelled", () => {
    const dateTimeDay = DateTime.now().startOf("week")
    for (let i = 0; i < 7; i ++) {
      let dayLabel = screen.getByText(dateTimeDay.plus({days: i}).toFormat('EEE'))
      expect(dayLabel).toBeTruthy()
    }
  })
  it("each activity is labelled and has circle for each day", () => {
    for (let i = 0; i < mockProps.data.length; i ++) {
      let activityLabel = screen.getByText(mockProps.data[i].name)
      expect(activityLabel).toBeTruthy()
    }
  })
  it("if activity has been achieved, that particular day's circle is colored", () => {})
  it("colored circles are links to activity page", () => {})
})