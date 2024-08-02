import { useState } from "react"

export default function Sound({ morse }: { morse: string }) {
    const [unit, setUnit] = useState(55)
    const [freq, setFreq] = useState(550)
    const timing = {
        ' ': [3, 0],
        '.': [1, 1],
        '-': [3, 1],
        '/': [0, 0]
    }

    const playSound = async (time: number, freq: number) => {
        return new Promise((resolve) => {
            const audioCtx = new window.AudioContext();
            const oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination)
            oscillator.start();

            setTimeout(() => {
                oscillator.stop(audioCtx.currentTime);
                resolve('')
            }, time)
        })
            ;
    };

    const playMorse = async () => {
        for (const char of morse.split('')) {
            if (char !== ' ') {
                await playSound(unit, 0)
            }
            await playSound(timing[char as keyof object][0] * unit, timing[char as keyof object][1] * freq)
        }
    }

    console.log(morse.split('').map(char => timing[char as keyof object]));
    return (
        <div>
            <input type="range" onInput={(e: any) => { setFreq(e.target.value) }} min={300} value={freq} max={800} />
            <input type="range" onInput={(e: any) => { setUnit(e.target.value) }} min={20} value={unit} max={200} />
            <button onClick={playMorse}>START</button>
        </div>
    )
}
