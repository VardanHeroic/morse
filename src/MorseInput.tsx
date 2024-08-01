import mapping from './mapping.json'

interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    morse: string,
    setMorse: React.Dispatch<React.SetStateAction<string>>
}

const MorseInput: React.FC<ChildProps> = ({ setText, setMorse, morse }) => {
    const getKeyByValue = (value:string) => {
        return Object.keys(mapping).find(key => mapping[key as keyof Object].toString() === value);
    };

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setMorse(e.target.value)
        const result = e.target.value.trim().split(' ').map(morse => getKeyByValue(morse))
        setText(result.every(letter => letter) ? result.join('') : '#')
    }


    return (
        <div>
            <input type="text" onInput={handleChange} value={morse} />
        </div>
    )
}
export default MorseInput
