import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { component as ParametrizedView } from './';
import { parametrizePath } from 'utils/transition';

it('component tree looks like how it should', () => {
	let props = {
		match: {
			params: {
				id: 1
			}
		}
	};

	const component = renderer.create(<ParametrizedView {...props} />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
