// タスクが削除されたときのコールバック関数
import React from "react";

export const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);

    return(
        <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
            {todo.removed ? '復元' : '削除'}
        </button>
    );
  };