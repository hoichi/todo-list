
import actionCreatorFactory from 'typescript-fsa';
import { TodoItem } from './model';

const aC = actionCreatorFactory('TODOS');

export const
    todoCreate = aC<string>('CREATE'),
    todoUpdate =
        aC<{id: string, data: Partial<TodoItem>}>('UPDATE'),
    todoDelete = aC<string>('DELETE');