import { useState } from 'react';
import { Todo, Filter } from './classes';

export const TaskEtc = (text:string, todos:Todo, filter:Filter) => {
  const [mytext, setText] = useState(text);
  const [mytodos, setTodos] = useState(todos);
  const [myfilter, setFilter] = useState(filter);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

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

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };


  return (
    <div>
    <select
      defaultValue="all"
      onChange={(e) => setFilter(e.target.value as Filter)}
    >
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
    {filter === 'removed' ? (
      <button
        onClick={handleOnEmpty}
        disabled={todos.filter((todo) => todo.removed).length === 0}
      >
        ごみ箱を空にする
      </button>
    ) : (
      filter !== 'checked' && (
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
      )
    )}
    </div>
  );
};