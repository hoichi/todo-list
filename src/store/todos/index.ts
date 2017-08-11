
export interface TodosState {
    items: TodoItemDic;
}

export interface TodoItemDic {
    [id: string]: TodoItemProps;
}
