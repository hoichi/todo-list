import { connect, Dispatch } from 'react-redux';

import { AppState } from '../../store';
import { createTodo, updateTodo, deleteTodo } from './actions';
import { TodoManager } from './TodoManager';
import { Action } from 'typescript-fsa';

type OwnProps = TodoManagerProps;

type StateProps = TodoManagerProps;

interface DispatchProps extends TodoManagerProps {
    onCreate: (title: string) => Action<string>;
    onUpdate: (data: Partial<TodoItemProps>) =>
        Action<Partial<TodoItemProps>>;
    onDelete: (id: string) => Action<string>;
}

function mapStateToProps(
    state: AppState, ownProps: OwnProps
): StateProps {
    return {
        ...ownProps,
        items: state.todos.items,
    };
}

function mapDispatchToProps(
    dispatch: Dispatch<AppState>,
    ownProps: OwnProps
): DispatchProps {
    return {
        ...ownProps,
        onCreate: (title: string) => dispatch(createTodo(title)),
        onUpdate: (data: Partial<TodoItemProps>) =>
            dispatch(updateTodo(data)),
        onDelete: (id: string) => dispatch(deleteTodo(id)),
    };
}

const ConnectedTodoManager = connect<object, object, object>(
    mapStateToProps,
    mapDispatchToProps,
)(TodoManager);

export default ConnectedTodoManager;
