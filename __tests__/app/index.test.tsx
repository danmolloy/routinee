import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { Slot, Link } from 'expo-router';
import App from "../../app/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockActivity } from "../../__mocks__/mockData";


jest.mock('expo-router');
jest.mock("react-native-animatable");

describe("<App /> with data", () => {
  jest.mock("@react-native-async-storage/async-storage");

  beforeEach(async() => {
    await waitFor(() => {
      render(<App />)
    })

  })
  it("app-view is truthy", () => {
    const appView = screen.getByTestId("app-view")
    expect(appView).toBeTruthy()
  })
  it("activities title is truthy", () => {
    const activitiesTitle = screen.getByText("Your Activities")
    expect(activitiesTitle).toBeTruthy()
  })
  it("activities container is truthy", () => {
    const activitiesContainer = screen.getByTestId("activities-container")
    expect(activitiesContainer).toBeTruthy()
  })
  it("expected activities are truthy", () => {
    const activity = screen.getAllByText(mockActivity.name)
    expect(activity).toHaveLength(2)
  })
  it("Mr TaskTrek is truthy", () => {
    const mrTaskTrek = screen.getByTestId("mr-tasktrek")
    expect(mrTaskTrek).toBeTruthy()
  })
  it("weekOverview container is truthy", () => {
    const overviewContainer = screen.getByTestId("overview-container")
    expect(overviewContainer).toBeTruthy()
  })
  it("weekOverview is truthy", () => {
    const weekOverview = screen.getByTestId("index-overview")
    expect(weekOverview).toBeTruthy()
  })
})

describe("<App /> without data", () => {

  beforeEach(async() => {
    await waitFor(() => {
      render(<App />)
    })

  })
  it("app-view is truthy", () => {
    const appView = screen.getByTestId("app-view")
    expect(appView).toBeTruthy()
  })
  it("no acitivites help if no activities found", () => {})
  
})