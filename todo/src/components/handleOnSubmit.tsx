// todosステートの更新をするコールバック関数
import { useState } from 'react';

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
};