export interface TodoList {
    items: Record<string, TodoItem>;
    lastId: number;
}

export interface TodoItem {
    id: string;
    title: string;
    done: boolean;
}

export interface UpdatePayload {
    id: string;
    data: Partial<TodoItem>;
}