interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    text: string;
}

const MorseInput: React.FC<ChildProps> = ({ setText, text }) => {
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value)
    }
    return (
        <div>
            <input type="text" onInput={handleChange} value={text} />
        </div>
    )
}
export default MorseInput
