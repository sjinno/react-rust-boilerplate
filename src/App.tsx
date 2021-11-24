import React, { useMemo, useReducer } from "react";
import { useObserve } from "observable-rs";

function App({ wasm }: { wasm: any }) {
  const [listVisible, toggleShow] = useReducer((show: boolean) => !show, true);

  const [thing, theList] = useMemo(() => {
    const thing = wasm.create_rust_thing();
    setInterval(() => thing.do_something(), 1000);
    return [thing, thing.get_the_list()];
  }, [wasm]);

  return (
    <div className="App">
      Hello, world!
      <button onClick={toggleShow}>
        {listVisible ? "Hide the list" : "Show the list"}
      </button>
      <br />
      {listVisible ? <TheList theList={theList} /> : ""}
    </div>
  );
}

export default App;

const TheList = ({ theList }: { theList: any }) => {
  useObserve(theList);

  return (
    <div>
      <h2>The List:</h2>
      <ul>
        {theList.map((v: any) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
};
