import React from "react";
import Beat from "./Beat";
import Button from "./Button";

interface IProps {
  beatCount: number,
  subdivision: Subdivisions,
  defaultSelection: number[],
}

enum Subdivisions {
  Quarter,
  Eighth,
  Sixteenth
}

const initSelectedBeats = (beatCount: number, subdivision: Subdivisions, initialBeats: number[] = []) => {
  const initialValues: boolean[] = [];

  for (let i = 1; i <= beatCount; i++) {
    initialValues.push(false);
    switch (subdivision) {
      case Subdivisions.Eighth:
        initialValues.push(false);
        break;
      case Subdivisions.Sixteenth:
        initialValues.push(false, false, false);
        break;
      default:
        break;
    }
  }
  console.log(initialBeats);
  for (let i = 0; i < initialBeats.length; i++) {
    initialValues[initialBeats[i]] = true;
  }
  return initialValues;
}

const shuffleArray = (a: number[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const initBeats = (beatCount: number, subdivision: Subdivisions) => {
  const beats = [];
  for (let i = 1; i <= beatCount; i++) {
    beats.push(i.toString());
    switch (subdivision) {
      case Subdivisions.Eighth:
        beats.push("+")
        break;
      case Subdivisions.Sixteenth:
        beats.push("a", "+", "e")
        break;
      default:
        break;
    }
  }
  return beats
}

function Beats(props: IProps) {
  console.log(props);
  const beats = initBeats(props.beatCount, props.subdivision);
  const [beatSelection, setBeatSelection] = React.useState(initSelectedBeats(props.beatCount, props.subdivision, props.defaultSelection));
  const [strumCount, setStrumCount] = React.useState(Math.ceil(beats.length / 2))

  // Reset strummed beats and number of strums when subdivision or beat count changes
  React.useEffect(() => {
    console.log("WTF");
    setBeatSelection(initSelectedBeats(props.beatCount, props.subdivision, props.defaultSelection));
    setStrumCount(Math.ceil(beats.length / 2))
  }, [props.beatCount, props.subdivision, props.defaultSelection, beats.length]);

  const onBeatClick = (index: number) => {
    return () => {
      const newSelection = beatSelection.map((b, idx) => { return index === idx ? !b : b });
      setBeatSelection(newSelection);
      setStrumCount(newSelection.filter((s) => s).length);
    }
  }

  const randomizeStrums = () => {
    const strumIndices = shuffleArray(beatSelection.map((_, idx) => { return idx })).slice(0, strumCount);
    let newSelection = beatSelection.map(() => false);
    strumIndices.forEach((idx) => { newSelection[idx] = true });

    setBeatSelection(newSelection);
  }

  const handleStrumCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrumCount(parseInt(event.target.value));
  }

  // Fake normal-ish distribution
  const gaussianRand = () => {
    let rand = 0;
    const factor = 2;
    for (var i = 0; i < factor; i++) {
      rand += Math.random();
    }

    return rand / factor;
  }

  const randomizeStrumCount = () => {
    setStrumCount(Math.floor(1 + gaussianRand() * beats.length));
  }

  console.log(beatSelection);
  return (
    <div>
      <div className="flex justify-center items-center">
        <label>Number of strums: {strumCount}
          <input type="range" min="1" max={beats.length} value={strumCount} name="strum-count" onChange={handleStrumCountChange} />
        </label>
      </div>
      <div className="flex justify-center items-center">
        <Button color="blue" onClick={randomizeStrumCount}>Randomize strum count</Button>
        <Button color="blue" onClick={randomizeStrums}>Randomize strums</Button>
      </div>
      <div className="beats pt-10">
        <div className="flex justify-center items-center">
          {beats.map((b, idx) => (
            <Beat selected={beatSelection[idx]} value={b} key={idx} onClick={onBeatClick(idx)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Subdivisions };
export default Beats;
