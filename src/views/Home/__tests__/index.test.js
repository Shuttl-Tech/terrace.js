import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import i18n from 'i18n';

import { SESSION_STATE } from 'views/Home/session-reducer';
import { component as Home } from '../';


it('renders routes if authenticated', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTHENTICATED} checkAuthentication={jest.fn()} t={(...args) => i18n.t(...args)} />);
	expect(wrapper.find(Route).length).toBeGreaterThan(1);
});

it('does not render routes if not auth failed', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTH_FAILED} checkAuthentication={jest.fn()} t={(...args) => i18n.t(...args)} />);
	expect(wrapper.find(Route).length).toBe(0);
});

it('does not render routes if not auth pending', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.UNAUTHENTICATED} checkAuthentication={jest.fn()} t={(...args) => i18n.t(...args)} />);
	expect(wrapper.find(Route).length).toBe(0);
});
