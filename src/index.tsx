/// <reference types="webpack-env" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import { store } from './store/index';

function render() {
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('root') as HTMLElement
    );
}

render();

if (module.hot) {
    module.hot.accept('./app/App', render);
}
