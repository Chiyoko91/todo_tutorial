import { useState } from 'react';
const [text, setText] = useState('');

export const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setText(e.target.value);
    
    return(
        <input
        type="text"
        value={text}
        onChange={(e) => handleOnChange(e)}
      />
    ) 
};

