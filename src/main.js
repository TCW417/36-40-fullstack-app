import React from 'react';
import { render as renderDom } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer/main';
import App from './components/app/app';
import thunk from './lib/middleware/redux-thunk';
import logger from './lib/middleware/logger';
import errorLogger from './lib/middleware/error-logger';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger, errorLogger)));
const root = document.createElement('div');
document.body.appendChild(root);

renderDom(<Provider store={store}><App /></Provider>, root);
