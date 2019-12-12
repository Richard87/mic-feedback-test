import React from 'react';
import './App.css';
import sketch from './sketches/mic'
import P5Wrapper from 'react-p5-wrapper';

function App() {
  const [[sources, selected], setSources] = React.useState([[],""])

  const sourcesUpdated = (sources) => {
    setSources([sources, selected])
  }

  return (
    <div className="App">
      <header className="App-header">
          Microphone (Feedback) Test
      </header>
      <P5Wrapper sketch={sketch} selectedSource={selected} sourcesUpdated={sourcesUpdated}/>

      <select value={selected} onChange={e => setSources([sources, e.target.value])}>
        {sources.map((s,i) => <option key={s.deviceId} value={i}>{s.label}</option>)}
      </select>
    </div>
  );
}

export default App;

/*
 MediaDeviceInfo
​​
deviceId: "TIJdALKjdnt1ClJ+95/U4wV4thx/QzlIFuyeTYTMJ3s="
​​
groupId: "AJHvC/cX/73IHfGR5k9D6IgKyU09vX5eBbfaskoVqRs="
​​
kind: "audioinput"
​​
label: "Meteorite condenser microphone Analog Stereo"
*/
