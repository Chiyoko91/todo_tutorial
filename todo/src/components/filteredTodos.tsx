import {handleOnCheck} from './handleOnCheck';
import {handleOnEdit} from './handleOnEdit';
import {handleOnRemove} from './handleOnRemove';

// フィルタリング後のTodoリストの表示をする関数
export const filteredTodos = todos.filter((todo) => {
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
    return(
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
    );
});