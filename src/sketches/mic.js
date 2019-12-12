import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

export default function sketch(p){
    let canvas;
    let mic;
    let micHistory = []
    let signalHistory = []
    let sourcesUpdated = false;
    let selectedSource = 0;
    let signal
    let signalAmp = 0.0
    let signalFreq = 1000
    let time = 0
    let frequencies = [100, 250, 500, 750, 1000,2000,4000,8000]


    p.setup = () => {
      canvas = p.createCanvas(1080, 540);
    
      // Create an Audio input
      mic = new p5.AudioIn();
    
      // start the Audio Input.
      // By default, it does not .connect() (to the computer speakers)
      mic.start();
      mic.getSources().then(sources => {
        console.log(sources)
        if (sourcesUpdated)
          sourcesUpdated(sources)
      })
      mic.amp(1.0)


      signal = new p5.Oscillator('sine');
      signal.amp(signalAmp); // set amplitude
      signal.freq(signalFreq); // set frequency
      signal.start(); // start oscillating
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function(newProps){
      sourcesUpdated = newProps.sourcesUpdated
      if (newProps.selectedSource && newProps.selectedSource !== selectedSource){
        selectedSource = newProps.selectedSource
        mic.setSource(selectedSource)
      }
    }

    let triggerSignals = () => {
      time++
      if (time % 50 !== 0)
        return

      signalAmp = 1.0
      signal.amp(signalAmp); // set amplitude
      console.log(signalFreq)
      setTimeout(() => {
        signalAmp = 0.0
        signal.amp(signalAmp); // set amplitude

        signalFreq = frequencies[frequencies.findIndex(s => s === signalFreq) + 1 % frequencies.length]
        signal.freq(signalFreq)
      }, 100)
    }

    p.draw = () => {
      p.background(0);
    
      // Get the overall volume (between 0 and 1.0)
      let micVol = mic.getLevel();
      micHistory.push(micVol)
      signalHistory.push(signalAmp)

      // p.fill(127);
      p.noFill();
    

      // Draw the signal history
      p.stroke([150, 0,0]);
      p.strokeWeight(1);
      p.beginShape()
      for (let i = 0; i < signalHistory.length; i++) {
        const y = p.map(signalHistory[i], 0, 1, canvas.height, 0);
        p.vertex(i, y);
      }
      p.endShape()

      // Draw the mic history
      p.stroke([0, 0,255]);
      p.strokeWeight(3);
      // p.fill([0, 0,255])
      p.beginShape()
      for (let i = 0; i < micHistory.length; i++) {
        const y = p.map(micHistory[i], 0, 1, canvas.height, 0);
        p.vertex(i, y);
      }
      p.endShape()


      if (micHistory.length > canvas.width)
        micHistory.shift()
      if (signalHistory.length > canvas.width)
      signalHistory.shift()

      triggerSignals()
    }
}