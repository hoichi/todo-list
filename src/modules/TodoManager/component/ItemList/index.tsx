import * as React from 'react';
import { ReactElement } from 'react';
import { TodoItem, Props as TodoItemProps } from '../Item';

export interface Props {
    items: TodoItemProps[];
}

export interface Handlers {
    onRename: (id: string, newTitle: string) => void;
    onToggle: (id: string, done?: boolean) => void;
    onDismiss: (id: string) => void;
}

export function ItemList(
    props: Props & Handlers
): ReactElement<Props & Handlers> {
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