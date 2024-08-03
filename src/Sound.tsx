import { useState, useEffect } from "react"

export default function Sound({ morse }: { morse: string }) {
    const [unit, setUnit] = useState(55)
    const [freq, setFreq] = useState(550)
    const [play, setPlay] = useState(false)
    let stop = false
    const timing = {
        ' ': [3, 0],
        '.': [1, 1],
        '-': [3, 1],
        '/': [0, 0]
    }

    const audioCtx = new window.AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'
    oscillator.start();
    const playSound = async (time: number, freq: number) => {
        return new Promise((resolve) => {
            if (stop) {
                return;
            }
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination)
            setTimeout(() => {
                oscillator.disconnect(audioCtx.destination)
                resolve('')
            }, time)
        })
            ;
    };

    useEffect(() => {
        if (play) {
           playMorse()
        }
    },[play])

    const playMorse = async () => {
        for (const char of morse.split('')) {
            if (char !== ' ') {
                await playSound(unit, 0)
            }
            await playSound(timing[char as keyof object][0] * unit, timing[char as keyof object][1] * freq)
        }
        stop = false
        setPlay(false)
    }

    return (
        <div className="sound">
            <input type="range" onInput={(e: any) => { setFreq(e.target.value) }} min={300} value={freq} max={800} /><span>{freq}</span><br/>
            <input type="range" onInput={(e: any) => { setUnit(e.target.value) }} min={20} value={unit} max={200} /><span>{unit}</span><br/>
            <button onClick={!play ? () => {setPlay(true)} : () => {setPlay(false); stop = true}}>{play ? "Stop" : "Play"}</button>
        </div>
    )
}
