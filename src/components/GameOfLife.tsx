import React, { useState, useEffect } from 'react';
import { Universe } from '../wasm-game-of-life-build';

const GameOfLife = ({ wasm }: { wasm: any }) => {
    // State
    const [life, setLife] = useState('');

    useEffect(() => {
        const universe = wasm.Universe.new();
        // console.log('SHOHEI universe: ', universe);

        const renderLoop = () => {
            setLife(universe.render());
            universe.tick();
            requestAnimationFrame(renderLoop);
        };

        requestAnimationFrame(renderLoop);
    }, [wasm.Universe]);

    return (
        <div>
            <p>Hello from Game of Life!</p>
            <pre>{life}</pre>
        </div>
    );
};

export default GameOfLife;

// import React, { useMemo, useReducer } from "react";
// import { useObserve } from "observable-rs";

// function App({ wasm }: { wasm: any }) {
//   let [listVisible, toggleShow] = useReducer((show: boolean) => { return !show }, true);

//   let [thing, the_list] = useMemo(() => {
//     let thing = wasm.create_rust_thing();
//     setInterval(() => thing.do_something(), 1000);
//     return [thing, thing.get_the_list()];
//   }, [wasm]);

//   return (
//     <div className="App">
//       <button onClick={toggleShow}>{listVisible ? "Hide the list" : "Show the List"} </button><br />
//       { listVisible ? <TheList the_list={the_list} /> : ''}
//     </div>
//   );
// }

// export default App;

// function TheList({ the_list }: { the_list: any }) {
//   // Bind this observable to the react component
//   useObserve(the_list);

//   return (
//     <div>The List:<br />
//       <ul>
//         {the_list.map((v: any) => (
//           <li key={v}>{v}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }
