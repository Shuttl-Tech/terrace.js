import React from 'react';
import renderer from 'react-test-renderer';

import ParametrizedView from './';

it('component tree looks like how it should', () => {
	let props = { match: { params: { id: 1 } } };

	const component = renderer.create(<ParametrizedView {...props} />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
