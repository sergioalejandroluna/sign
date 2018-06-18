import { configure } from "enzyme";
import "jest-localstorage-mock";
import Adapter from "enzyme-adapter-react-16";
jest.mock("axios", () => ({
  create: jest.fn()
}));
configure({ adapter: new Adapter() });
global.XMLHttpRequest = undefined;
