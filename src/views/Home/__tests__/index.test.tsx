import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
// template-begin with-i18n keep
import i18n from 'i18n';
// template-end with-i18n

import { SESSION_STATE } from 'views/Home/session.reducer';
import Home from '../';

// template-begin with-i18n keep
it('renders routes if authenticated', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTHENTICATED} checkAuthentication={jest.fn()} t={(a: string) => i18n.t(a)} />);
	expect(wrapper.find(Route).length).toBeGreaterThan(1);
});

it('does not render routes if not auth failed', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTH_FAILED} checkAuthentication={jest.fn()} t={(a: string) => i18n.t(a)} />);
	expect(wrapper.find(Route).length).toBe(0);
});

it('does not render routes if not auth pending', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.UNAUTHENTICATED} checkAuthentication={jest.fn()} t={(a: string) => i18n.t(a)} />);
	expect(wrapper.find(Route).length).toBe(0);
});
// template-end with-i18n
// template-begin with-i18n remove
it('renders routes if authenticated', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTHENTICATED} checkAuthentication={jest.fn()} />);
	expect(wrapper.find(Route).length).toBeGreaterThan(1);
});

it('does not render routes if not auth failed', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.AUTH_FAILED} checkAuthentication={jest.fn()} />);
	expect(wrapper.find(Route).length).toBe(0);
});

it('does not render routes if not auth pending', () => {
	const wrapper = shallow(<Home sessionStatus={SESSION_STATE.UNAUTHENTICATED} checkAuthentication={jest.fn()} />);
	expect(wrapper.find(Route).length).toBe(0);
});
// template-end with-i18n
