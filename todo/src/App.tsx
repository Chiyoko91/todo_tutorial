import React, { useState } from "react";

type Todo = { //構造体的なもの？
  value: string;
  readonly id: number;
};

export const App = () => {
  /**
   * text:ステートの値
   * setText:ステートの値を更新するメソッド
   * useState:ステートの初期値
   * 
   */
  const [text, setText] = useState('');
  /**
   * 
   */
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
  };

  // todosステートを更新する関数
  const handleOnSubmit = () =>{
    //何も入力されていなければリターン
    if(!text) return;

    //新しいtodoを作成
    const newTodo: Todo = {
      value: text,
    };
    /**
     * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
     * 以下と同義
     *
     * const oldTodos = todos.slice();
     * oldTodos.unshift(newTodo);
     * setTodos(oldTodos);
     *
     **/
    setTodos([newTodo, ...todos]);
    setText('');
  }

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit()}>
        {/**
         * 入力中のテキストの値をtextステートが持っているので、
         * それをvalueとして表示
         * onChangeイベント(入力テキストの変化)をtextステートに反映する
         */}
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)} 
        />

        <input
          type="submit"
          value="追加"
          onSubmit={(e) => handleOnSubmit()} />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li>{todo.value}</li>;
        })}
      </ul>
    </div>
  );
};