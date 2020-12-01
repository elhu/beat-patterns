import React from "react";
import Beats, { Subdivisions } from "./Beats";

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
    <div className="container h-full">
      <div className="flex justify-center items-center">
        <button className="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={switchSignature(4)}>4:4</button>
        <button className="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={switchSignature(6)}>6:8</button>
      </div>
      <div className="flex justify-center items-center">
        <button className="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={switchSubdivision(Subdivisions.Quarter)}>
          Quarter notes
        </button>
        <button className="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={switchSubdivision(Subdivisions.Eighth)}>
          Eighth notes
        </button>
        <button className="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={switchSubdivision(Subdivisions.Sixteenth)}>
          Sixteenth notes
        </button>
      </div>
        <Beats beatCount={beatCount} subdivision={subdivision} />
    </div>
  );
}

export default App;
