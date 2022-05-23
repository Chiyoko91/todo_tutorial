import { useState } from 'react';

type Todo = { // タスク内容保持
  value: string; // タスク内容(タスク名)
  readonly id: number; // タスクのキー
  checked: boolean; // タスクが完了したか識別
  removed: boolean; // タスクが削除されたか識別
};

// フィルタリング用 フィルタの種別
type Filter = 'all' | 'checked' | 'unchecked' | 'removed'; 

// メインのコンポーネント
export const App = () => { 
  /**
   * useStateで初期値など設定
   * これをやっておくとコンポーネントが再レンダリングされても変数値を保持できるらしい
   * const [初期値を設定する変数名, 再設定用の関数(？)名] = useState 設定する諸々;のような記法
   */ 
  const [text, setText] = useState(''); // textの初期値として空の文字列が入るようにする
  const [todos, setTodos] = useState<Todo[]>([]); // todosの初期値として何も入っていないTodo型の構造体(？)を入れる
  const [filter, setFilter] = useState<Filter>('all'); // filterの初期値にFilterのallを入れる
  
  // textステートを更新するコールバック関数
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todosステートの更新をするコールバック関数
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

  // 既に登録されたtodoが編集されたときのコールバック関数
  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // チェックボックスがチェックされたときのコールバック関数
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // タスクが削除されたときのコールバック関数
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // ゴミ箱を空にするコールバック関数
  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  // フィルタリング後のTodoリストの表示をする関数
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

  // 出力
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
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};