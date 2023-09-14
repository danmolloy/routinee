import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import ActivityTab, { ActivityTabProps } from "../../components/activityTab";
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from "luxon";
import DayOverview, { DayOverviewProps } from "../../components/dayOverview";

jest.mock("react-native-animatable");
jest.mock("@react-native-async-storage/async-storage");

const mockProps: DayOverviewProps = {
  selectedDate: DateTime.fromJSDate(new Date(mockActivity.instances[0].date)).toFormat('yyyy-MM-dd'),
  instances: mockActivity.instances,
  hashtagFilters: Math.random() > .4 ? "" : "lol"
}

describe("<DayOverview />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<DayOverview {...mockProps} />)
    })
  })
  it("dayOverview view is Truthy", () => {
    const dayOverview = screen.getByTestId("day-overview")
    expect(dayOverview).toBeTruthy()
  })
  it("states if there is no information of instance", () => {
    if (mockProps.instances.length === 0) {
      let badNews = screen.getByText("Nothing logged on this day.")
      expect(badNews).toBeTruthy()
    }
  })
  it("all expected instances are in the view", () => {
    for (let i = 0; i < mockProps.instances.length; i ++) {
      let instanceCount = screen.getByText(`Instance ${mockProps.instances.length}`)
      expect(instanceCount).toBeTruthy()
    }
  })
  it("states instance count data if it has been added", () => {
    for (let i = 0; i < mockProps.instances.length; i ++) {
      if (mockProps.instances[i].count) {
        let instanceCount = screen.getByTestId(`${mockProps.instances[i].id}-count`)
        expect(instanceCount).toBeTruthy()
      }
    }
  })
  it("notes on instance is in the document", () => {
    for (let i = 0; i < mockProps.instances.length; i ++) {
      if (mockProps.instances[i].notes) {
        let instanceNotes = screen.getByTestId(`${mockProps.instances[i].id}-notes`)
        expect(instanceNotes).toBeTruthy()
      }
    }
  })
  it("instance hashtags are listed", () => {
    for (let i = 0; i < mockProps.instances.length; i ++) {
      if (mockProps.instances[i].hashtags !== undefined) {
        let hashtags = mockProps.instances[i].hashtags?.map(i => `#${i} `).join("")
        let instancehashtags = screen.getByText(hashtags ? hashtags : "error!")
        expect(instancehashtags).toBeTruthy()
      }
    }
  })
})