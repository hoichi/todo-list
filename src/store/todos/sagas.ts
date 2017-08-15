import { SagaIterator } from 'redux-saga';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';

import * as actions from './actions';
import { TodoItem, TodoList, UpdatePayload } from './model';

export default function* todosRoot(): SagaIterator {
    yield fork(init);
    yield fork(create);
    yield fork(update);
    yield fork(remove);
}

function* init(): SagaIterator {
    yield takeEvery(actions.todoInit.type, initWorker);
}

function* create(): SagaIterator {
    yield takeEvery(actions.todoCreate.type, createWorker);
}

function* update(): SagaIterator {
    yield takeEvery(actions.todoUpdate.type, updateWorker);
}

function* remove(): SagaIterator {
    yield takeEvery(actions.todoDelete.type, removeWorker);
}

function* initWorker(): SagaIterator {
    // hack
    yield updateTodos(x => x);
}

function* createWorker(action: Action<string>): SagaIterator {
    yield updateTodos(({items, lastId}) => {
        lastId++;
        const id = lastId.toString();

        const newItem: TodoItem = {
            id,
            title: action.payload,
            done: false,
        };

        return {
            items: {
                ...items,
                [id]: newItem,
            },
            lastId,
        };
    });
}

function* updateWorker(action: Action<UpdatePayload>): SagaIterator {
    yield updateTodos(({items, lastId}) => {
        const {id, data} = action.payload;

        const item = items[id];
        if (!item) { throw TypeError(`Item with id ${id} not found`); }

        return {
            items: {
                ...items,
                [id]: {...item, ...data},
            },
            lastId,
        };
    });
}

function* removeWorker(action: Action<string>): SagaIterator {
    yield updateTodos(({items, lastId}) => {
        const id = action.payload;

        const { [id]: __, ...newItems } = items;

        return {items: newItems, lastId};
    });
}

function updateTodos(reducer: (todos: TodoList) => TodoList) {
    const storagePath = 'todoListTodos';

    try {
        const storage = window.localStorage;

        const todos: TodoList = JSON.parse(
            storage.getItem(storagePath) || '{"items": {}, lasID: 0}'
        );

        const newTodos = reducer(todos);

        storage[storagePath] = JSON.stringify(newTodos);

        return put(actions.todoSetState(newTodos));
    } catch (err) {
        throw Error('Oh well...');
    }
}
