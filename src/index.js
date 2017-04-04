import { render } from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import immutableDevTools from 'immutablejs-devtools';
import reducers from './reducers';

import { App } from './components';

import '../main.less';

const store = createStore(reducers);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
});

immutableDevTools.install();
