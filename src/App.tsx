import React from 'react';
import GameOfLife from './components/GameOfLife';

interface Props {
    wasm: any;
    memory: WebAssembly.Memory;
}

function App({ wasm, memory }: Props) {
    return (
        <div className="App">
            Hello, world!
            <GameOfLife wasm={wasm} memory={memory} />
        </div>
    );
}

export default App;
