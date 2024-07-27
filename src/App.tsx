import TextInput from './TextInput';
import MorseInput from './MorseInput';
import Sound from './Sound';
import { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('')

    return (
        <div className="App">
            <TextInput setText={setText} text={text}/>
            <MorseInput setText={setText} text={text}/>
            <Sound/>
        </div>
    );
}

export default App;
