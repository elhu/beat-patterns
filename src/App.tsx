import React from "react";
import Beats, { Subdivisions } from "./Beats";
import "./App.css";

function App() {
  const [beatCount, setBeats] = React.useState(4);
  const switchSignature = (newSignature: number) => {
    return () => {
      setBeats(newSignature);
    };
  };
  const [subdivision, setSubdivision] = React.useState(Subdivisions.Eighth);
  const switchSubdivision = (newSub: Subdivisions) => {
    return () => {
      setSubdivision(newSub);
    };
  };

  return (
    <div className="App">
      <button onClick={switchSignature(4)}>4:4</button>
      <button onClick={switchSignature(6)}>6:8</button>
      <br />
      <button onClick={switchSubdivision(Subdivisions.Quarter)}>
        Quarter notes
      </button>
      <button onClick={switchSubdivision(Subdivisions.Eighth)}>
        Eighth notes
      </button>
      <button onClick={switchSubdivision(Subdivisions.Sixteenth)}>
        Sixteenth notes
      </button>

      <Beats beatCount={beatCount} subdivision={subdivision} />
    </div>
  );
}

export default App;
