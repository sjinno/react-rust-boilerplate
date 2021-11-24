import React, { useEffect } from "react";

function App({ wasm }: { wasm: any }) {
  console.log(wasm);
  useEffect(() => {
    const alertOnce = () => wasm.greet();
    alertOnce();
  }, [wasm]);

  return <div className="App">Hello, world!</div>;
}

export default App;
