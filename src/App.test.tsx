import React from 'react';
import App from 'App';
import ShallowRenderer from 'react-test-renderer/shallow';

// ShallowRenderer: https://reactjs.org/docs/shallow-renderer.html
it('renders without crashing', () => {
	const renderer = ShallowRenderer.createRenderer();
	renderer.render(<App />);
});
