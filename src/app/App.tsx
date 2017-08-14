import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import './App.css';
import TodoManager from '../modules/TodoManager';
import { AppState } from '../store';

export interface AppProps {
    store: Store<AppState>;
}

export function App({store}: AppProps) {
    return (
        <Provider store={store} key="provider">
            <div className="App">
                <div className="App-header">
                    <h2>React TodoList</h2>
                </div>
                <TodoManager/>
            </div>
        </Provider>
    );
}

export default App;
