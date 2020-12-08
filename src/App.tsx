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
  const [defaultSelection, setDefaultSelection] = React.useState([] as number[])
  const oldFaithFul = () => {
    setBeats(4)
    setSubdivision(Subdivisions.Eighth)
    setDefaultSelection([0, 2, 3, 5, 6])
  }

  const sixEightBasic = () => {
    setBeats(6)
    setSubdivision(Subdivisions.Eighth)
    setDefaultSelection([0, 3, 4, 6, 9, 10, 11])
  }

  return (
    <div className="container flex h-full">
      <div className="w-2/3 h-full">
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
          <Beats beatCount={beatCount} subdivision={subdivision} defaultSelection={defaultSelection} />
      </div>
      <div className="w-1/3 h-full">
        <Button onClick={oldFaithFul}>Old faithful</Button>
        <Button onClick={sixEightBasic}>6:8 basic</Button>
      </div>
    </div>
  );
}

export default App;
