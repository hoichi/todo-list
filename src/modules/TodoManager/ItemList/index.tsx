import * as React from 'react';
import { ReactElement } from 'react';
import { TodoItem } from './Item';

interface PropsWithHandlers extends TodoListProps {
    onRename: (id: string, newTitle: string) => void;
    onToggle: (id: string, done?: boolean) => void;
    onDismiss: (id: string) => void;
}

export function ItemList(
    props: PropsWithHandlers
): ReactElement<PropsWithHandlers> {
    return (
        <ul className="b-todo-list__items">
            {props.items.map(item =>
                <TodoItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    done={item.done}
                    onRename={props.onRename}
                    onToggle={props.onToggle}
                    onDismiss={props.onDismiss}
                />
            )}
        </ul>
    );
}