import { useState } from 'react';

export type Todo = {
    value: string;
    readonly id: number;
    checked: boolean;
    removed: boolean;
  };

export type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const [text, setText] = useState('');
export const [todos, setTodos] = useState<Todo[]>([]);
export const [filter, setFilter] = useState<Filter>('all');
