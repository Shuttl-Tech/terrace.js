import React from 'react';
import { shallow } from 'enzyme';
// template-begin with-i18n keep
import i18n from 'i18n/index';
// template-end with-i18n

// template-begin reducer-snippets keep
import { REQUEST_STATE } from 'globals/constants';
// template-end reducer-snippets
import ___componentName___ from '../';

// template-begin with-i18n keep
const t = (key: string) => i18n.t(key);

// template-end with-i18n
describe('___componentName___ view', () => {
  // template-begin reducer-snippets keep
  // --1 template-begin with-i18n keep
  it('renders correctly when request is successful', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.SUCCESS} t={t} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual(t('view-data-loaded'));
  });

  it('renders correctly when request has failed', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.FAILURE} t={t} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual(t('view-data-failed'));
  });

  it('renders correctly when request is pending', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.REQUEST} t={t} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual(t('view-data-pending'));
  });
  // --1 template-end with-i18n
  // --2 template-begin with-i18n remove
  it('renders correctly when request is successful', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.SUCCESS} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual('View data loaded.');
  });

  it('renders correctly when request has failed', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.FAILURE} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual('View data failed.');
  });

  it('renders correctly when request is pending', () => {
  	const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.REQUEST} fetchViewData={jest.fn()} />);
  	expect(wrapper.text()).toEqual('View data pending.');
  });
  // --2 template-end with-i18n
  // template-end reducer-snippets
  // template-begin reducer-snippets remove
  // --1 template-begin with-i18n keep
  it('renders correctly', () => {
  	const wrapper = shallow(<___componentName___ t={t} />);
  	expect(wrapper.text()).toEqual(t('view-data-loaded.'));
  });
  // --1 template-end with-i18n
  // --2 template-begin with-i18n remove
  it('renders correctly', () => {
  	const wrapper = shallow(<___componentName___ />);
  	expect(wrapper.text()).toEqual('View data loaded.');
  });
  // --2 template-end with-i18n
  // template-end reducer-snippets
});
