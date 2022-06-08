// ゴミ箱を空にするコールバック関数
export const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);

    return(
        <button
            onClick={handleOnEmpty}
            disabled={todos.filter((todo) => todo.removed).length === 0}
        >
            ごみ箱を空にする
        </button>
    );
};