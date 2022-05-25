// textステートを更新するコールバック関数
import { useState } from 'react';

const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [text, setText] = useState(''); // textの初期値として空の文字列が入るようにする
    setText(e.target.value);
};