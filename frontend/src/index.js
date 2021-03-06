import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from 'redux'
import {BrowserRouter as Router} from "react-router-dom";

import App from './components/App';
import rootReducer from './reducers'
import { Route } from "react-router-dom";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
      <Router>
          <Route component={App}/>
      </Router>
  </Provider>, document.getElementById('app')
);
