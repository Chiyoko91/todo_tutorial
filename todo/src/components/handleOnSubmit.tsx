import { useState } from 'react';

type Todo = { // タスク内容保持
    value: string; // タスク内容(タスク名)
    readonly id: number; // タスクのキー
    checked: boolean; // タスクが完了したか識別
    removed: boolean; // タスクが削除されたか識別
};

const [text, setText] = useState('');
const [todos, setTodos] = useState<Todo[]>([]);

const handleOnSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');

    return (
        
    )
};