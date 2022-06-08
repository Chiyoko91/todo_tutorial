import { useState } from 'react';
import { TaskBoard } from './components/TaskBoard';

// メインのコンポーネント
export const App = () => { 
  // 出力
  return (
    <div>
      <TaskBoard/>
    </div>
  );
};