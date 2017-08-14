import * as actions from './actions';
import { TodoList, TodoItem } from './model';

import { Action, isType } from 'typescript-fsa';
import { uniqueId } from 'lodash';

interface UpdatePayload {
    id: string;
    data: Partial<TodoItem>;
}

type ItemList = TodoList['items'];

export function todos(
    state: TodoList = { items: {} },
    action: Action<string | UpdatePayload>
) {

    const {payload} = action;

    switch (true) {
    case isType(action, actions.todoCreate):
        return createTodo(state, payload as string);

    case isType(action, actions.todoUpdate):
        return updateTodo(state, payload as UpdatePayload);

    case isType(action, actions.todoDelete):
        return deleteTodo(state, payload as string);

    default:
        return state;   // todo: exhaustiveness?
    }
}

function createTodo(state: TodoList, title: string) {
    const id = uniqueId();

    return updateItems(state, items => ({
        ...items,
        [id]: {id, title, done: false},
    }));
}

function updateTodo(state: TodoList, {id, data}: UpdatePayload) {
    return updateItems(state, items => {
        const item = items[id];
        if (!item) { throw TypeError(`Item with id ${id} not found`); }

        return {
            ...items,
            [id]: {...item, ...data}
        };
    });
}

function deleteTodo(state: TodoList, id: string) {
    return updateItems(state, items => {
        const {[id]: __, ...newItems} = items;

        return newItems;
    });
}

function updateItems(state: TodoList, reducer: (items: ItemList) => ItemList) {
    const {items} = state;

    return {
        ...state,
        items: reducer(items),
    };
}