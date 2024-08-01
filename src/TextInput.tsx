import mapping from './mapping.json'
interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    text: string,
    setMorse: React.Dispatch<React.SetStateAction<string>>
}

const TextInput: React.FC<ChildProps> = ({ setText, text, setMorse}) => {
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
       setMorse(e.target.value.replace(/\s+/g, ' ').toUpperCase().split('').map(char => mapping[char as keyof object]).join(' '))
       setText(e.target.value)
    }
    return (
        <div>
            <input type="text" onInput={handleChange} value={text}/>
        </div>
    )
}
export default TextInput
