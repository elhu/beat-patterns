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

function initSelectedBeats(beatCount: number, subdivision: Subdivisions) {
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

function shuffleArray(a: number[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Beats(props: IProps) {
  const beats = [];
  for (let i = 1; i <= props.beatCount; i++) {
    beats.push(i.toString());
    switch (props.subdivision) {
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
  const [beatSelection, setBeatSelection] = React.useState(initSelectedBeats(props.beatCount, props.subdivision));
  React.useEffect(() => {
    setBeatSelection(initSelectedBeats(props.beatCount, props.subdivision));
  }, [props]);

  const onBeatClick = (index: number) => {
    return () => {
      setBeatSelection(beatSelection.map((b, idx) => { return index === idx ? !b : b }))
    }
  }

  const randomizeStrums = () => {
    console.log(beatSelection.map((_, idx) => { return idx }));
    const strumIndices = shuffleArray(beatSelection.map((_, idx) => { return idx })).slice(0, 3);
    let newSelection = beatSelection.map(() => false);
    console.log(strumIndices);
    strumIndices.forEach((idx) => { newSelection[idx] = true });

    setBeatSelection(newSelection);
  }
  return (
    <div className="beats">
      <button onClick={randomizeStrums}>Randomize strums</button>
      <div>
        {beats.map((b, idx) => (
          <Beat selected={beatSelection[idx]} value={b} key={idx} onClick={onBeatClick(idx)} />
        ))}
      </div>
    </div>
  );
}

export { Subdivisions };
export default Beats;
