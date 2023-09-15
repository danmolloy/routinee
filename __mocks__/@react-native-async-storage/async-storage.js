import { mockActivity } from "../mockData";

const AsyncStorage = {
  getItem: jest.fn(() => {
    return JSON.stringify([mockActivity])
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

export default AsyncStorage;