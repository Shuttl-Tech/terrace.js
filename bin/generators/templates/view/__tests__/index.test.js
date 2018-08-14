import React from 'react';
import { shallow } from 'enzyme';
import i18n from 'i18n/index';

// template-begin reducer-snippets keep
import { REQUEST_STATE } from '../___lowerCaseResourceName___-reducer';
// template-end reducer-snippets
import { ___componentName___ } from '../';

const t = (...args) => i18n.t(...args);

describe('___componentName___ view', () => {
	// template-begin reducer-snippets keep
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
	// template-end reducer-snippets
	// template-begin reducer-snippets remove
	it('renders correctly', () => {
		const wrapper = shallow(<___componentName___ t={t} />);
		expect(wrapper.text()).toEqual(t('view-data-loaded'));
	});
	// template-end reducer-snippets
});
