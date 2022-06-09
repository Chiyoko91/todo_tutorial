import { useState } from 'react';
import { Todo, Filter } from './classes';
import { TaskEtc } from './TaskEtc';
import { TodoList } from './TodoList';

export const TaskBoard = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div>
      <TaskEtc text todos filter/>
      <TodoList/>
    </div>
  );
};