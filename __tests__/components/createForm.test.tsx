import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { colorArr } from "../../app/create";
import CreateForm, { CreateFormProps } from "../../components/createForm";
import uuid from 'react-native-uuid'

const mockProps: CreateFormProps = {
  handleCreate: jest.fn(),
  selectedColor: colorArr[0],
  setSelectedColor: jest.fn(),
  uuid: String(uuid.v1())
}

describe("<CreateActivity />", () => {
  beforeEach(() => {
    render(
      <CreateForm {...mockProps} />
    )
  })
  it("create-activity-view is truthy", () => {
    const createActivityView = screen.getByTestId("create-activity-view")
    expect(createActivityView).toBeTruthy()
  })
  it("'Create Activity' title is truthy", () => {
    const formTitle = screen.getByText("Create Activity")
    expect(formTitle).toBeTruthy()
  })
  it("activity text input is truthy with label", () => {
    const activityLabel = screen.getByText(/^Activity/)
    expect(activityLabel).toBeTruthy()

    const activityInput = screen.getByTestId("activity-input")
    expect(activityInput).toBeTruthy()

  })
  it("blurb text input is truthy with label", () => {
    const blurbLabel = screen.getByText(/Blurb/)
    expect(blurbLabel).toBeTruthy()
    const blurbInput = screen.getByTestId("blurb-input")
    expect(blurbInput).toBeTruthy()
  })
  it("color selection is truthy with and label", () => {
    const colorLabel = screen.getByText(/Color/)
    expect(colorLabel).toBeTruthy()

    const colorPicker = screen.getByTestId("color-picker")
    expect(colorPicker).toBeTruthy()
  })
  it("create button is truthy and calls handleSubmit with expected args on press", () => {
    const createBtn = screen.getByText(/^Create$/)
    expect(createBtn).toBeTruthy()
  })
  it("color-picker has all expected colors", () => {
    let color;
    let colorPicker;
    for (let i = 0; i < colorArr.length; i++) {
      color = colorArr[i]
      colorPicker = screen.getByTestId(`${color}-color`)
      expect(colorPicker).toBeTruthy()
    }
  })
  it("create button calls handleSubmit with expected args on press", async () => {
    const createBtn = screen.getByText(/^Create$/)
    const nameInput = screen.getByTestId("activity-input")
    const blurbInput = screen.getByTestId("blurb-input")
    const blurbText = "Practice while watching The Expanse"
    const nameText = "Practice trombone"
       
    await act(async () => {
      await waitFor(() => {
        fireEvent.changeText(nameInput, nameText)
      })
    })
    await act(async () => {
      await waitFor(() => {
        fireEvent.changeText(blurbInput, blurbText)
      })
    })
    
    await act(async () => {
      await waitFor(() => {
        fireEvent.press(createBtn)
      })
    })
    expect(mockProps.handleCreate).toBeCalledWith({
      blurb: blurbText,
      name: nameText,
      instances: [],
      color: colorArr[0],
      id: mockProps.uuid
    })
  })
})