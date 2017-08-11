
interface TodoItemProps {
    id: string;
    title: string;
    done: boolean;
}

interface TodoListProps {
    items: TodoItemProps[];
}

interface TodoItemDic {
    [id: string]: TodoItemProps;
}

interface TodoManagerProps {
    items: TodoItemDic;
}
