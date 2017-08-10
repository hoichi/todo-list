interface TodoItemState {
    editing: boolean;
    editText: string;
}

interface TodoItemProps {
    id: string;
    title: string;
    done: boolean;
}

interface TodoItemHandlers {
    onRename: (id: string, newTitle: string) => void;
    onToggle: (id: string, done: boolean) => void;
    onDestroy: (id?: string) => void;
}

interface TodoItemDic {
    [id: string]: TodoItemProps;
}

interface TodoListState {
    items: TodoItemDic;
    searchText: string;
}

interface TodoListProps {

}