import React from "react";
import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/';

import Loading from "../../components/loading";

describe("<Loading />", () => {
  beforeEach(() => {
    render(<Loading />)
  })
  it("it matches snapshot", () => {
    const loadingView = screen.getByTestId("loading-view")
    expect(loadingView).toBeTruthy()
  })
  it("'loading...' text is in the document", () => {
    const loadingText = screen.getByText(/Loading../)
    expect(loadingText).toBeTruthy()
  })
  it("Mr TaskTrek is in the document", () => {
    const mrTaskTrek = screen.getByTestId("mr-task-trek")
    expect(mrTaskTrek).toBeTruthy()
  })
})