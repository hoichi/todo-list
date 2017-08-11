/// <reference types="webpack-env" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';

function render() {
    ReactDOM.render(
        <App />,
        document.getElementById('root') as HTMLElement
    );
}

if (module.hot) {
    module.hot.accept('./app/App', render);
}
