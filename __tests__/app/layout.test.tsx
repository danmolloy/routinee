import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import Layout from "../../app/_layout";
import { Slot, Link } from 'expo-router';

jest.mock('expo-router');

describe("<Layout />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Layout />)
    })
  })
  it("layout-view is truthy", () => {
    const layoutView = screen.getByTestId("layout-view")
    expect(layoutView).toBeTruthy()
  })
  it("header-view is truthy", () => {
    const headerView = screen.getByTestId("header-view")
    expect(headerView).toBeTruthy()
  })
  it("footer-view is truthy", () => {
    const footerView = screen.getByTestId("footer-view")
    expect(footerView).toBeTruthy()
  })
})