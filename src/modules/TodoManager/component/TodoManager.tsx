import * as React from 'react';
import autobind from 'autobind-decorator';

import { SearchForm } from './SearchForm';
import { Props as ItemProps } from './Item';
import { ItemList } from './ItemList';

interface State {
    searchText: string;
}

export interface Props {
    items: ItemProps[];
}

export interface Handlers {
    onCreate: (title: string) => void;
    onUpdate: (id: string, data: Partial<ItemProps>) => void;
    onDelete: (id: string) => void;
}

export class TodoManager extends React.Component<Props & Handlers, State> {
    constructor(props: Props & Handlers) {
        super(props);

        this.state = {
            searchText: '',
        };
    }

    render() {
        const itemList = this.props.items
            .filter(this.itemsFilter);

        return (
            <div className="b-todo-list">
                <SearchForm
                    text={this.state.searchText}
                    onChange={searchText => this.setState({searchText})}
                    onSubmit={this.handleSubmit}
                />
                <ItemList
                    items={itemList}
                    onRename={(id, newTitle) =>
                        this.props.onUpdate(id, {title: newTitle})
                    }
                    onToggle={(id, done) => this.props.onUpdate( id, {done} )}
                    onDismiss={this.props.onDelete}
                />
            </div>
        );
    }

    @autobind
    handleSubmit(title: string) {
        this.props.onCreate(title);
        this.setState({searchText: ''});
    }

    @autobind
    private itemsFilter(item: ItemProps) {
        const { searchText } = this.state;
        return !searchText
            || item.title.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase());
    }
}
