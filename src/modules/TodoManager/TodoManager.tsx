///<reference path="model.d.ts"/>
import * as React from 'react';
import autobind from 'autobind-decorator';
import { uniqueId } from 'lodash';

import { SearchForm } from './SearchForm';
import { ItemList } from './ItemList';

export interface State {
    items: TodoItemDic;
    searchText: string;
}

export class TodoManager extends React.Component<{}, State> {
    constructor(props: {}) {
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
        const itemList = Object.keys(this.state.items)
            .map(id => this.state.items[id])
            .filter(this.itemsFilter);

        return (
            <div className="b-todo-list">
                <SearchForm
                    text={this.state.searchText}
                    onChange={searchText => this.setState({searchText})}
                    onSubmit={title => title && this.addItem(title)}
                />
                <ItemList
                    items={itemList}
                    onRename={this.handleItemRename}
                    onToggle={this.handleItemToggle}
                    onDismiss={this.handleItemDismiss}
                />
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
    handleItemDismiss(id: string) {
        this.setState(state => {
            let { [id]: __, ...newItems } = state.items;

            return { items: newItems };
        });
    }

    private addItem(title: string) {
        this.setState(state => {
            const id = uniqueId();

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
        reducer: (props: TodoItemProps) => Partial<TodoItemProps>,
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
