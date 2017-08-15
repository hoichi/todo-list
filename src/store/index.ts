import {
    Reducer, combineReducers,
    Store, createStore,
    applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import { TodoList, todos } from './todos';
import todosRoot from './todos/sagas';

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

const sagaMiddleware = createSagaMiddleware();

const store: Store<AppState> = createStore(
    rootReducer,
    {todos: {items: {}, lastId: 0}},
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

function* rootSaga() {
    yield all([
        fork(todosRoot),
    ]);
}
