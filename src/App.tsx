import React from "react";
import Beats, { Subdivisions } from "./Beats";
import Button from "./Button";

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
        <Button onClick={switchSignature(4)}>4:4</Button>
        <Button onClick={switchSignature(6)}>6:8</Button>
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={switchSubdivision(Subdivisions.Quarter)}>
          Quarter notes
        </Button>
        <Button onClick={switchSubdivision(Subdivisions.Eighth)}>
          Eighth notes
        </Button>
        <Button onClick={switchSubdivision(Subdivisions.Sixteenth)}>
          Sixteenth notes
        </Button>
      </div>
        <Beats beatCount={beatCount} subdivision={subdivision} />
    </div>
  );
}

export default App;
