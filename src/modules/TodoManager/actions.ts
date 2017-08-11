import actionCreatorFactory from 'typescript-fsa';

const aC = actionCreatorFactory('TodoManager');

export const
    createTodo = aC<string>('TODO_CREATE'),
    updateTodo = aC<Partial<TodoItemProps>>('TODO_UPDATE'),
    deleteTodo = aC<string>('TODO_DELETE');