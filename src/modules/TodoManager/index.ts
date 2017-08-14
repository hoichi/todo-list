import { connect, Dispatch } from 'react-redux';

import { AppState } from '../../store';
import { TodoItem,
    todoCreate, todoUpdate, todoDelete } from '../../store/todos';

import { TodoManager, Props, Handlers } from './component';

function mapStateToProps(state: AppState): Props {
    const items = state.todos.items;

    return {
        items: Object.keys(items).map(id => items[id]),
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): Handlers {
    return {
        onCreate: (title: string) => dispatch(todoCreate(title)),
        onUpdate: (id: string, data: Partial<TodoItem>) =>
            dispatch(todoUpdate({id, data})),
        onDelete: (id: string) => dispatch(todoDelete(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoManager);
