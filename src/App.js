import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from 'views/Home';

type Props = {}

class App extends Component<Props> {
  render() {
    return (
      <Router>
        <Home />
      </Router>
    );
  }
}

export default App;
