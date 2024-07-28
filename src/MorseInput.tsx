import mapping from './mapping.json'

interface ChildProps {
    setText: React.Dispatch<React.SetStateAction<string>>;
    text: string;
}

const MorseInput: React.FC<ChildProps> = ({ setText, text }) => {
    const getKeyByValue = (value:string) => {
        return Object.keys(mapping).find(key => mapping[key as keyof Object].toString() === value);
    };

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target.value.split(' ').map(morse => getKeyByValue(morse)));
        // e.target.value.split(' ').map(morse => console.log(morse))
        const morse = text.replace(/\s+/g, ' ').toUpperCase().split('').map(char => mapping[char as keyof Object]).join(' ')
        const result = e.target.value.split(' ').map(morse => getKeyByValue(morse)).join('')
        if (result[0]) {
            setText(result)
            e.target.value = morse
        }
        else{
            setText('#')
        }
    }


    return (
        <div>
            <input type="text" onInput={handleChange}  />
        </div>
    )
}
export default MorseInput
