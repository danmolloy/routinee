import React from "react";
import { render, screen, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import CreateActivity from "../../app/create";

describe("<CreateActivity />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<CreateActivity />)
    })
  })
  it("create-activity-view is truthy", () => {
    const createActivityView = screen.getByTestId("create-activity-view")
    expect(createActivityView).toBeTruthy()
  })
})