import React from 'react';
import Beat from './Beat';
import "./Beats.css";

interface IProps {
  beatCount: number,
  subdivision: Subdivisions,
}

enum Subdivisions {
  Quarter,
  Eighth,
  Sixteenth
}

const initSelectedBeats = (beatCount: number, subdivision: Subdivisions) => {
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
  const beats = initBeats(props.beatCount, props.subdivision);
  const [beatSelection, setBeatSelection] = React.useState(initSelectedBeats(props.beatCount, props.subdivision));
  const [strumCount, setStrumCount] = React.useState(Math.ceil(beats.length / 2))

  // Reset strummed beats and number of strums when subdivision or beat count changes
  React.useEffect(() => {
    setBeatSelection(initSelectedBeats(props.beatCount, props.subdivision));
    setStrumCount(Math.ceil(beats.length / 2))
  }, [props, beats.length]);

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

  return (
    <div>
      <label>Number of strums: {strumCount}
        <input type="range" min="1" max={beats.length} value={strumCount} name="strum-count" onChange={handleStrumCountChange} />
      </label>
      <br />
      <button onClick={randomizeStrumCount}>Randomize strum count</button>
      <button onClick={randomizeStrums}>Randomize strums</button>
      <div className="beats">
        <div>
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
