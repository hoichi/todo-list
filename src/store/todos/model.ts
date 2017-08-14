export interface TodoList {
    items: Record<string, TodoItem>;
}

export interface TodoItem {
    id: string;
    title: string;
    done: boolean;
}