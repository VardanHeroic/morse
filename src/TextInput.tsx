import mapping from './mapping.json'
interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    text: string,
    setMorse: React.Dispatch<React.SetStateAction<string>>
}

const TextInput: React.FC<ChildProps> = ({ setText, text, setMorse}) => {
    function handleChange(e:React.FormEvent<HTMLTextAreaElement>) {
        const target = e.target as HTMLTextAreaElement
       setMorse(target.value.replace(/\s+/g, ' ').toUpperCase().split('').map(char => mapping[char as keyof object]).join(' '))
       setText(target.value)
    }
    return (
            <textarea placeholder='There should be text' onInput={handleChange} value={text}></textarea>
    )
}
export default TextInput
