import React, { Component } from 'react';
import router from './router';

class App extends Component {
  render() {
    return (
      <div>
      <div className="body">
        {router}
      </div>
      </div>
    );
  }
}

export default App;
