import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from "luxon";
import * as Animatable from 'react-native-animatable';
import DataForm, { DataFormProps } from "../../components/dataform";

jest.mock("react-native-animatable");
jest.mock("@react-native-async-storage/async-storage");

const mockProps: DataFormProps = {
  activityId: mockActivity.id,
  instanceId: mockActivity.instances[0].id,
  setAddData: jest.fn(),
  setShowForm: jest.fn(),
  getData: jest.fn(),
  data: [mockActivity],
  color: mockActivity.color
}

describe("<DataForm />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<DataForm {...mockProps} />)
    })
  })

  it("date input is in view with label", () => {
    const dateInput = screen.getByTestId("date-input-view")
    expect(dateInput).toBeTruthy()
  })

  it("count input is in view with label and default at 0", () => {
    const countInput = screen.getByTestId("count-input-view")
    expect(countInput).toBeTruthy()
  })
  it("notes input is in view with label", () => {
    const notesInput = screen.getByTestId("notes-input-view")
    expect(notesInput).toBeTruthy()
  })
  it("hashtags input is in view with label", () => {
    const hashtagsInput = screen.getByTestId("hashtags-input-view")
    expect(hashtagsInput).toBeTruthy()
  })
  it("date input default has today's date selected", () => {})
  it("count input defaults at 0", () => {})
  it("hashtags input placeholder is past hashtags", () => {})
  it("submit button is labelled and calls handleSubmit with expected args", () => {})
})