import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { Link } from 'expo-router';
import Footer from "../../components/footer";

jest.mock('expo-router');

describe("<Footer />", () => {
  beforeEach(() => {
    render(<Footer />)
  })
  it("footer-view is truthy", () => {
    const footerView = screen.getByTestId("footer-view")
    expect(footerView).toBeTruthy()
  })
  it("home-link is truthy with expected href", () => {
    const homeLink = screen.getByTestId("home-link")
    expect(homeLink).toBeTruthy()
    const hrefProp = homeLink.props.href
    expect(hrefProp).toBe('/')
  })
  it("create-link is truthy with expected href", () => {
    const createLink = screen.getByTestId("create-link")
    expect(createLink).toBeTruthy()
    const hrefProp = createLink.props.href
    expect(hrefProp).toBe('/create')
  })
  it("help-link is truthy with expected href", () => {
    const helpLink = screen.getByTestId("help-link")
    expect(helpLink).toBeTruthy()
    const hrefProp = helpLink.props.href
    expect(hrefProp).toBe('/help')
  })
})