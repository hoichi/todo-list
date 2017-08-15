
import actionCreatorFactory from 'typescript-fsa';
import { TodoItem, TodoList } from './model';

const aC = actionCreatorFactory('TODOS');

export const
    todoInit = aC<{}>('INIT'),
    todoCreate = aC<string>('CREATE'),
    todoUpdate =
        aC<{id: string, data: Partial<TodoItem>}>('UPDATE'),
    todoDelete = aC<string>('DELETE'),
    todoSetState = aC<TodoList>('SET_STATE');