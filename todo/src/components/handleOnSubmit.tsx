// todosステートの更新をするコールバック関数
import { useState } from 'react';
import { handleOnChange } from './handleOnChange';

export type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};
export const handleOnSubmit = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  if (!text) return;
    const newTodo: Todo = {
    value: text,
    id: new Date().getTime(),
    checked: false,
    removed: false,
  };

  setTodos([newTodo, ...todos]);
  setText('');

  return(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => handleOnChange(e)}
      />
      <input type="submit" value="追加" onSubmit={handleOnSubmit} />
    </form>
  );
};