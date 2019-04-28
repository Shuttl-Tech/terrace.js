import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../';

it('Table tree looks like how it should', () => {
	const component = renderer.create(<Home/>);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
