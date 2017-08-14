import { combineReducers, Reducer } from 'redux';

import { TodoList, todos } from './todos';
import initialState from './initialState';
import { Store, createStore } from 'redux';

export {
    AppState,
    store,
};

interface AppState {
    todos: TodoList;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    todos,
});

const store: Store<AppState> = createStore(
    rootReducer,
    initialState
);
