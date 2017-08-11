///<reference path="../model.d.ts"/>
import * as React from 'react';
import { Key } from 'ts-keycode-enum';
import autobind from 'autobind-decorator';

interface PropsWithHandlers extends TodoItemProps {
    onRename: (id: string, newTitle: string) => void;
    onToggle: (id: string, done: boolean) => void;
    onDismiss: (id?: string) => void;
}

interface State {
    editing: boolean;
    editText: string;
}

export class TodoItem extends React.Component<
    PropsWithHandlers, State
> {
    private textInput: HTMLInputElement | null = null;

    constructor(props: PropsWithHandlers) {
        super(props);

        this.state = {
            editing: false,
            editText: props.title,
        };
    }

    render() {
        const props = this.props;

        return (
            <li
                className={
                    'b-todo-item'
                    + ( this.state.editing
                        ? ' b-todo-item_editing'
                        : '' )
                }
            >
                <div
                    className={
                        'b-todo-item__view'
                        + ( this.state.editing
                            ? ' u-hidden'
                            : '' )
                    }
                >
                    <label
                        className={
                            'b-todo-item__label'
                            + (props.done
                                ? ' b-todo-item__label_done'
                                : '' )
                        }
                        onDoubleClick={this.handleEdit}
                    >
                        <input
                            className="b-todo-item__toggle"
                            type="checkbox"
                            checked={props.done}
                            onChange={e => props.onToggle(
                                props.id, !props.done
                            )}
                        />
                        {props.title}
                    </label>

                    <button
                        className="b-todo-item__destroy"
                        onClick={e => props.onDismiss(props.id)}
                    />
                </div>

                <input
                    type="text"
                    className={
                        'b-todo-item__edit'
                        + ( this.state.editing
                            ? ''
                            : ' u-hidden' )
                    }
                    value={this.state.editText}
                    ref={input => this.textInput = input}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }

    componentDidUpdate(__: TodoItemProps, state: State) {
        const
            input = this.textInput,
            isStartingEdit = !state.editing && this.state.editing;

        if (!input || !isStartingEdit) { return; }

        input.focus();

        const len = input.value.length;
        input.setSelectionRange(len, len);
    }

    @autobind
    private handleEdit() {
        this.setState((__, props) => ({
            editing: true,
            editText: props.title,
        }));
    }

    @autobind
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        this.setState({ editText : input.value });
    }

    @autobind
    private handleSubmit() {
        let wasEditing: boolean;

        this.setState(
            state => {
                wasEditing = state.editing;
                return {editing: false};
            },
            () => wasEditing &&
                this.props.onRename &&
                this.props.onRename(this.props.id, this.state.editText)
        );
    }

    @autobind
    private handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        const keyCode = event.keyCode;

        if (keyCode === Key.Escape) {
            this.cancelEdit();
        } else if (keyCode === Key.Enter) {
            this.handleSubmit();
        }
    }

    private cancelEdit() {
        this.setState((state, props) => ({
            editing: false,
            editText: props.title,
        }));
    }
}
