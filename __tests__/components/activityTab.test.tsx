import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import ActivityTab, { ActivityTabProps } from "../../components/activityTab";
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from "luxon";
import * as Animatable from 'react-native-animatable';

jest.mock("react-native-animatable");
jest.mock("@react-native-async-storage/async-storage");

const mockProps: ActivityTabProps = {
  activity: mockActivity,
  addData: null,
  showForm: Math.random() > .4 ? true : false,
  setShowForm: jest.fn(),
  getData: jest.fn(),
  setAddData: jest.fn(),
  data: [mockActivity],
  handleClick: jest.fn()
}

describe("<ActivityTab />", () => {
  beforeEach(() => {
    render(<ActivityTab {...mockProps}/>)
  })

  it("activity name is in view", () => {
    //const activityTab = screen.getByTestId("activity-tab-view")
    const activityName = screen.getByText(mockProps.activity.name)
    expect(activityName).toBeTruthy()
  })

  it("states when last instance was or states if none logged", () => {
    let lastInstance;
    if (mockProps.activity.instances.length === 0) {
      lastInstance = screen.getByText("No instances logged")
    }
    else if (DateTime.fromISO(mockProps.activity.instances.sort((a, b) => a.date.localeCompare(b.date))[mockProps.activity.instances.length - 1].date).hasSame(DateTime.now(), "day")) {
      lastInstance = screen.getByText(`Last instance: Today`)
    } else {
      lastInstance = screen.getByText(`Last instance: ${DateTime.fromJSDate(new Date(mockProps.activity.instances.sort((a, b) => a.date.localeCompare(b.date))[mockProps.activity.instances.length - 1].date)).toFormat('dd LLL yyyy')}`)
    }
    expect(lastInstance).toBeTruthy()
  })

  it("check button in the document", () => {
    let checkBtn = null; 
    checkBtn = screen.getByTestId("check-btn")
    expect(checkBtn).toBeTruthy()
  })

  it("link to activity page is in the document", async () => {
    let activityLink = screen.getByTestId("activity-link")
    expect(activityLink).toBeTruthy()
  })

  it("check button calls handleClick with args and handleAnimaiton onPress", async () => {
    let checkBtn = screen.getByTestId("check-btn")
    await waitFor(() => {
      fireEvent.press(checkBtn)
    })
    expect(mockProps.handleClick).toBeCalledWith(mockProps.activity.id)
  })
  it("edit button renders on check button press", () => {})
  it("<DataForm /> renders on edit button press", () => {})
})