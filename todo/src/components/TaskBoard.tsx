import React from "react";
import {handleOnChange} from 'handleOnChange';

type Todo = { // タスク内容保持
    value: string; // タスク内容(タスク名)
    readonly id: number; // タスクのキー
    checked: boolean; // タスクが完了したか識別
    removed: boolean; // タスクが削除されたか識別
  };
  
  // フィルタリング用 フィルタの種別
  type Filter = 'all' | 'checked' | 'unchecked' | 'removed'; 

export const TaskBoard(): React.FC => () => {
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