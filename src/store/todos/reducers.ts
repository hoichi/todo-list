import * as actions from './actions';
import { TodoList, UpdatePayload } from './model';

import { Action, isType } from 'typescript-fsa';

export function todos(
    state: TodoList = { items: {}, lastId: 0 },
    action: Action<string | UpdatePayload | TodoList>
) {
    if ( isType(action, actions.todoSetState) ) {
        return action.payload as TodoList;
    } else {
        return state;
    }
}
