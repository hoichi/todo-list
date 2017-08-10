///<reference path="model.d.ts"/>
import * as React from 'react';
import autobind from 'autobind-decorator';
import { Key } from 'ts-keycode-enum';
import { uuid } from './Utils';

import { TodoItem } from './TodoItem';

type ItemPropsPartial = {
    [key in keyof TodoItemProps]?: TodoItemProps[key];
};

export class TodoList extends React.Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);

        this.state = {
            items: {
                'uno': {
                    id: 'uno',
                    title: 'Take over the world',
                    done: false,
                },
                'due': {
                    id: 'due',
                    title: 'Take a nap',
                    done: false,
                },
                'tre': {
                    id: 'tre',
                    title: 'Take it all in',
                    done: false,
                },
            },
            searchText: '',
        };
    }

    render() {
        const itemsList =
            Object.keys(this.state.items)
                .map(id => this.state.items[id]);

        return (
            <div className="b-todo-list">
                <header className="b-todo-list__header">
                    <input
                        type="text"
                        className="b-todo-list__search"
                        value={this.state.searchText}
                        placeholder="Type away, baby"
                        autoFocus={true}
                        onChange={this.handleSearchTyping}
                        onKeyDown={this.handleSearchKeyDown}
                    />
                </header>
                <ul className="b-todo-list__items">
                    {itemsList
                        .filter(this.itemsFilter)
                        .map(item =>
                            <TodoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                done={item.done}
                                onRename={this.handleItemRename}
                                onToggle={this.handleItemToggle}
                                onDestroy={this.handleItemDestroy}
                            />
                        )
                    }
                </ul>
            </div>
        );
    }

    @autobind
    handleItemRename(id: string, newTitle: string) {
        this.updateItem(
            id,
            item => ({
                title: newTitle
            })
        );
    }

    @autobind
    handleItemToggle(id: string, done?: boolean) {
        this.updateItem(
            id,
            item => ({
                done: (done == null ? !item.done : done)
            })
        );
    }

    @autobind
    handleItemDestroy(id: string) {
        this.setState(state => {
            let { [id]: dismiss, ...newItems } = state.items;

            return { items: newItems };
        });
    }

    @autobind
    handleSearchTyping(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target;
        this.setState({ searchText : input.value });
    }

    @autobind
    handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode !== Key.Enter) {
            return;
        }

        event.preventDefault();

        const title = this.state.searchText;
        title &&
            this.addItem(title);
    }

    private addItem(title: string) {
        this.setState(state => {
            const id = uuid();

            const items = {
                    ...state.items,
                [id]: {
                    id,
                    title,
                    done: false,
                },
            };

            return {
                items,
                searchText: '',
            };
        });
    }

    private updateItem(
        id: string,
        reducer: (props: TodoItemProps) => ItemPropsPartial,
    ) {
        this.setState(state => {
            const
                prevItem = state.items[id],
                updatedItem = {
                    ...prevItem,
                    ...reducer(prevItem),
                };

            return {
                items: {
                    ...state.items,
                    [id]: updatedItem,
                }
            };
        });
    }

    @autobind
    private itemsFilter(item: TodoItemProps) {
        const { searchText } = this.state;
        return !searchText
            || item.title.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase());
    }
}
