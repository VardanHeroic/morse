import TextInput from './TextInput';
import MorseInput from './MorseInput';
import Sound from './Sound';
import { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('')
    const [morse, setMorse] = useState('')

    const props = {
        setText: setText,
        setMorse: setMorse,
        text: text,
        morse: morse
    }
    return (
        <div className="App">
            <TextInput {...props} />
            <MorseInput {...props} />
            <Sound morse={morse} />
        </div>
    );
}

export default App;
