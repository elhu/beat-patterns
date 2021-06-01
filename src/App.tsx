import React from "react";
import Beats, { Subdivisions, initSelectedBeats } from "./Beats";
import Button from "./Button";

function App() {
  const params = new URLSearchParams(window.location.search);

  const initialBeatCount = params.get("beatCount") ? Number(params.get("beatCount")) : 4;
  const [beatCount, setBeats] = React.useState(initialBeatCount);
  const switchSignature = (newSignature: number) => {
    return () => {
      setBeats(newSignature);
    };
  };

  const initialSubdivision = params.get("subdivision") ? Number(params.get("subdivision")) : Subdivisions.Eighth;
  const [subdivision, setSubdivision] = React.useState(initialSubdivision);
  const switchSubdivision = (newSub: Subdivisions) => {
    return () => {
      setSubdivision(newSub);
    };
  };

  const [defaultSelection, setDefaultSelection] = React.useState([] as number[])
  const beatSelectionParam = params.get("beatSelection") ?? ""
  let initialBeatSelection = [] as boolean[];
  if (params.get("beatSelection") !== "") {
    initialBeatSelection = beatSelectionParam.split("").map(e => e === "1")
  } else {
    initialBeatSelection = initSelectedBeats(initialBeatCount, subdivision, defaultSelection);
  }
  console.log(initialBeatSelection);
  const [beatSelection, setBeatSelection] = React.useState(initialBeatSelection);

  React.useEffect(() => {
    const state = {
      subdivision: `${subdivision}`,
      beatSelection: beatSelection.map((e) => e ? "1" : "0").join(""),
      beatCount: `${beatCount}`,
    }
    window.history.replaceState(state, '', `/?${new URLSearchParams(state).toString()}`);
  }, [subdivision, beatSelection, beatCount]);

  const oldFaithFul = () => {
    setBeats(4)
    setSubdivision(Subdivisions.Eighth)
    setDefaultSelection([0, 2, 3, 5, 6])
  }

  const hotelCalifornia = () => {
    setBeats(4)
    setSubdivision(Subdivisions.Sixteenth)
    setDefaultSelection([0, 3, 4, 7, 8, 9, 10, 12, 14, 15])
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
        <Beats beatCount={beatCount} beatSelection={beatSelection} setBeatSelection={setBeatSelection} subdivision={subdivision} defaultSelection={defaultSelection} />
      </div>
      <div className="w-1/3 h-full">
        <Button onClick={oldFaithFul}>Old faithful</Button>
        <Button onClick={hotelCalifornia}>Hotel California</Button>
        <Button onClick={sixEightBasic}>6:8 basic</Button>
      </div>
    </div>
  );
}

export default App;
