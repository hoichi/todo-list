import * as React from 'react';
import autobind from 'autobind-decorator';
import { Key } from 'ts-keycode-enum';

interface Props {
    text: string;
    onChange: (text: string) => void;
    onSubmit: (text: string) => void;
}

export class SearchForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <header className="b-todo-list__header">
                <input
                    type="text"
                    className="b-todo-list__search"
                    value={this.props.text}
                    placeholder="Type away, baby"
                    autoFocus={true}
                    onChange={e => this.props.onChange(e.target.value)}
                    onKeyDown={this.handleSearchKeyDown}
                />
            </header>
        );
    }

    @autobind
    handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode !== Key.Enter) {
            return;
        }

        event.preventDefault();

        this.props.onSubmit(
            (event.target as HTMLInputElement).value
        );
    }
}