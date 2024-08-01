export default function Sound({ morse }: { morse: string }) {
    let unit = 50
    let freq = 1000
    const timing = {
        ' ': [3, 0],
        '.': [1, 1],
        '-': [3, 1],
        '/': [1, 0]
    }

    const playSound = async (time: number, freq: number) => {
        return new Promise((resolve) => {
            const audioCtx = new window.AudioContext();
            const oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine'; // You can change this to 'square', 'sawtooth', or 'triangle'
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // Frequency in Hz
            oscillator.connect(audioCtx.destination);
            oscillator.start();

            // Stop the sound after 1 second
            setTimeout(() => {
                oscillator.stop();
                resolve('')
            }, time)
        })
            ;
    };

    const playMorse = async () => {
        for (const char of morse.split('')) {
            if (char !== ' ') {
            await playSound(unit,0)
            }
            await playSound(timing[char as keyof object][0] * unit, timing[char as keyof object][1] * freq)
        }
    }

    console.log(morse.split('').map(char => timing[char as keyof object]));
    return (
        <div>
            <input type="range" min={100} value={1000} max={10000} />
            <input type="range" min={50} value={100} max={1000} />
            <button onClick={playMorse}>START</button>
        </div>
    )
}
