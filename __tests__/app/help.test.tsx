import React from "react";
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/';
import { mockActivity } from "../../__mocks__/mockData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import HelpCenter, { helpArr } from "../../app/help";

jest.mock("react-native-animatable");

describe("<HelpCenter />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<HelpCenter />)
    })
  })
  it("help-view is truthy", () => {
    const helpView = screen.getByTestId("help-view")
    expect(helpView).toBeTruthy()
  })
  it("Mr TaskTrek is truthy", () => {
    const mrTaskTrek = screen.getByTestId("mr-task-trek")
    expect(mrTaskTrek).toBeTruthy()
  })
  it("default renders helpArr[0], with header, info and expected page number truthy", () => {
    const header = screen.getByText(helpArr[0].header)
    expect(header).toBeTruthy()

    for (let i = 0; i < helpArr[0].info.length; i++) {
      let info = screen.getByText(helpArr[0].info[i])
      expect(info).toBeTruthy()
    }
    
    const pageNum = screen.getByText("1 / 4")
    expect(pageNum).toBeTruthy()
  })
  it("both nav buttons operational, with expected pages rendering", async () => {
    const forwardBtn = screen.getByTestId("forward-btn")
    const backBtn = screen.getByTestId("back-btn")
    let pageNum = screen.getByText("1 / 4")
    let header;
    let info;

    expect(pageNum).toBeTruthy()
    expect(forwardBtn).toBeTruthy()
    expect(backBtn).toBeTruthy()

    for (let i = 0; i < helpArr.length; i ++) {
      await act(async () => {
        await waitFor(() => {
          fireEvent.press(forwardBtn)
        })
      })
      await waitFor(() => {
        header = screen.getByText(helpArr[i].header)
        info = screen.getByText(helpArr[i].info[0])
        pageNum = screen.getByText(`${i + 1} / 4`)
        expect(pageNum).toBeTruthy()
        expect(header).toBeTruthy()
        expect(info).toBeTruthy()
      })
      if (i === helpArr.length) {
        await act(async () => {
          await waitFor(() => {
            fireEvent.press(forwardBtn)
          })
        })
        await waitFor(() => {
          pageNum = screen.getByText(`${i + 1} / 4`)
          expect(pageNum).toBeTruthy()
        })
      }
    }
    
    for (let i = helpArr.length - 1; i > 0; i --) {
      await act(async () => {
        await waitFor(() => {
          fireEvent.press(backBtn)
        })
      })
      await waitFor(() => {
        pageNum = screen.getByText(`${i + 1} / 4`)
        expect(pageNum).toBeTruthy()
      })
      if (i === 0) {
        await act(async () => {
          await waitFor(() => {
            fireEvent.press(backBtn)
          })
        })
        await waitFor(() => {
          pageNum = screen.getByText(`${i + 1} / 4`)
          expect(pageNum).toBeTruthy()
        })
      }
    }
    
    
  })
})