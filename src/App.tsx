import * as React from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>React TodoList</h2>
                </div>
                <TodoList/>
            </div>
        );
    }
}

export default App;
