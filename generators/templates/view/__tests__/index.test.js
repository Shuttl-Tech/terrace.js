import React from 'react';
import { shallow } from 'enzyme';
import i18n from 'i18n';

import { REQUEST_STATE } from '../reducer';
import { ___componentName___ } from '../';

const t = (...args) => i18n.t(...args);

describe('___componentName___ component', () => {
	it('renders correctly when request is successful', () => {
		const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.SUCCESS} {t} />);
		expect(wrapper.text()).toEqual(t('view-data-loaded'));
	});

	it('renders correctly when request has failed', () => {
		const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.FAILURE} {t} />);
		expect(wrapper.text()).toEqual(t('view-data-failed'));
	});

	it('renders correctly when request is pending', () => {
		const wrapper = shallow(<___componentName___ requestStatus={REQUEST_STATE.REQUEST} {t} />);
		expect(wrapper.text()).toEqual(t('view-data-pending'));
	});

});
