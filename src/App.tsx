import React, { useState } from "react";
import GameOfLife from "./components/GameOfLife";

function App({ wasm }: { wasm: any }) {
  console.log(wasm);

  // useEffect(() => {
  //   const alertOnce = () => wasm.greet("Oliver");
  //   alertOnce();
  // }, [wasm]);

  return (
    <div className="App">
      Hello, world!
      <GameOfLife wasm={wasm} />
    </div>
  );
}

export default App;
