import { useState, useEffect,useRef } from "react"

export default function Sound({ morse }: { morse: string }) {
    const [unit, setUnit] = useState(55)
    const [freq, setFreq] = useState(550)
    const [play, setPlay] = useState(false)
    const [looping, setLooping] = useState(false)
    const [volume, setVolume] = useState(50)
    const audioContextRef:any = useRef(null);
    const gainNodeRef:any = useRef(null);
    const oscillatorRef:any = useRef(null)
    const isStartedRef:any = useRef(false)
    let stop = false
    const timing = {
        ' ': [3, 0],
        '.': [1, 1],
        '-': [3, 1],
        '/': [0, 0]
    }

    const playSound = async (time: number, freq: number) => {
        console.log(gainNodeRef.current.gain);

        return new Promise((resolve) => {
            if (stop) {
                return;
            }
            oscillatorRef.current.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
            oscillatorRef.current.connect(gainNodeRef.current).connect(audioContextRef.current.destination)
            setTimeout(() => {
                oscillatorRef.current.connect(gainNodeRef.current).disconnect(audioContextRef.current.destination)
                resolve('')
            }, time)
        })
            ;
    };

    useEffect(() => {
        if (!isStartedRef.current && oscillatorRef.current) {
            oscillatorRef.current.start();
            isStartedRef.current = true
        }
        let loopStop = false
        async function Mainmorse() {
            if (!play) {
                return
            }
            if (!looping) {
                await playMorse()
                setPlay(false)
                return
            }

            while (true) {
                if (loopStop) {
                    break
                }
                await playMorse()
                await playSound(7 * unit, 0)
            }

        }
        Mainmorse()
        return () => {
            loopStop = true
        }

    }, [play])

    const playMorse = async () => {
        for (const char of morse.split('')) {
            if (char !== ' ') {
                await playSound(unit, 0)
            }
            await playSound(timing[char as keyof object][0] * unit, timing[char as keyof object][1] * freq)

        }
        stop = false
    }
    useEffect(() => {
        console.log(volume);
        audioContextRef.current = new window.AudioContext()
        gainNodeRef.current =  audioContextRef.current.createGain()
        oscillatorRef.current = audioContextRef.current.createOscillator()
        gainNodeRef.current.gain.setValueAtTime(volume/100,audioContextRef.current.currentTime )
        oscillatorRef.current.type = 'sine'
    }, [])


    return (
        <div className="sound">
            <label>Volume</label><br />
            <input type="range" onInput={(e: any) => { setVolume(e.target.value);gainNodeRef.current.gain.setValueAtTime(+e.target.value/100,audioContextRef.current.currentTime )   }} min={0} value={volume} max={100} /><span>{volume + '%'}</span><br />
            <label>Pitch</label><br />
            <input type="range" onInput={(e: any) => { setFreq(e.target.value) }} min={300} value={freq} max={800} /><span>{freq + 'Hz'}</span><br />
            <label>Unit(in ms)</label><br />
            <input type="range" onInput={(e: any) => { setUnit(e.target.value) }} min={20} value={unit} max={200} /><span>{unit + 'ms'}</span><br />
            <input type="checkbox" onInput={() => { setLooping(!looping) }}></input> <label>Looping</label><br /><br />
            <button onClick={!play ? () => { setPlay(true) } : () => { stop = true; setPlay(false) }}>{play ? "Stop" : "Play"}</button>
        </div>
    )
}
