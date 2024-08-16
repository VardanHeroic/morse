import mapping from './mapping.json'

interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    morse: string,
    setMorse: React.Dispatch<React.SetStateAction<string>>
}

const MorseInput: React.FC<ChildProps> = ({ setText, setMorse, morse }) => {
    const getKeyByValue = (value: string) => {
        return Object.keys(mapping).find(key => mapping[key as keyof Object].toString() === value);
    };

    function handleChange(e: React.FormEvent<HTMLTextAreaElement>) {
        const target = e.target as HTMLTextAreaElement
        setMorse(target.value)
        const result = target.value.trim().replace(/\s+/g, ' ').split(' ').map(morse => getKeyByValue(morse))
        setText(result.every(letter => letter) ? result.join('') : '#')
    }


    return (
        <textarea placeholder='There should be morse' onInput={handleChange} value={morse} />
    )
}
export default MorseInput
