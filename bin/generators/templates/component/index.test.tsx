import React from 'react';
import renderer from 'react-test-renderer';

import ___componentName___ from './';

it('___componentName___ tree looks like how it should', () => {
  let props = { id: '1' };

  const component = renderer.create(<___componentName___ {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
