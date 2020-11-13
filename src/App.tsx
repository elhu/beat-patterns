import React from 'react';
import Beats, { Subdivisions } from './Beats';
import './App.css';

function App() {
  const [beatCount, setBeatCount] = React.useState(4);
  const [subdivision, setSubdivision] = React.useState(Subdivisions.Eighth);
  const switchSubdivision = (newSub: Subdivisions) => {
    return () => {
      setSubdivision(newSub);
    }
  }

  return (
    <div className="App">
      <button onClick={switchSubdivision(Subdivisions.Quarter)}>Quarter notes</button>
      <button onClick={switchSubdivision(Subdivisions.Eighth)}>Eighth notes</button>
      <button onClick={switchSubdivision(Subdivisions.Sixteenth)}>Sixteenth notes</button>

      <Beats beatCount={beatCount} subdivision={subdivision} />
    </div>
  );
}

export default App;
