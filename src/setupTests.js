import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// template-begin with-i18n keep
import i18n from 'i18n';

// template-end with-i18n
configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;
// template-begin with-i18n keep

global.getTranslatedString = (key, ...rest) => i18n.t(key, ...rest);

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: global.getTranslatedString };
    return Component;
  },
}));
// template-end with-i18n
