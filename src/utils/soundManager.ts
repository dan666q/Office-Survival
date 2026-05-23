// src/utils/soundManager.ts

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmNodes: { oscillators: OscillatorNode[]; gain: GainNode } | null = null;
  private bgmInterval: ReturnType<typeof setInterval> | null = null;
  private tickInterval: ReturnType<typeof setInterval> | null = null;
  private seqInterval: ReturnType<typeof setInterval> | null = null;
  
  private isTense = false;
  private eventCount = 0;
  private bgmPlaying = false;
  private bgmGenre = 2; // Default to 2 (Zelda Lofi)
  
  private chordIndex = 0;
  private activeNotes: number[] = [];
  private seqCounter = 0;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  isPlaying() {
    return this.bgmPlaying;
  }

  getGenre() {
    return this.bgmGenre;
  }

  setBGMGenre(genre: number) {
    if (this.bgmGenre === genre) return;
    this.bgmGenre = genre;
    if (this.bgmPlaying) {
      this.stopBGM();
      this.startBGM();
    }
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const playNote = (freq: number, delay: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    playNote(523.25, 0, 0.22);
    playNote(659.25, 0.06, 0.22);
    playNote(783.99, 0.12, 0.22);
    playNote(1046.50, 0.18, 0.35);
  }

  playDanger() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const playNote = (freq: number, delay: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now + delay);
      osc.frequency.linearRampToValueAtTime(freq * 0.7, now + delay + duration);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.05, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    playNote(150, 0, 0.35);
    playNote(145, 0.05, 0.35);
  }

  playBurnout() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.9);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.9);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  playDayPass() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const playNote = (freq: number, delay: number, duration: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    playNote(523.25, 0, 0.3);      // C5
    playNote(783.99, 0.08, 0.3);   // G5
    playNote(1046.50, 0.16, 0.3);  // C6
    playNote(1318.51, 0.24, 0.5);  // E6
    playNote(1567.98, 0.32, 0.6);  // G6
  }

  private getBounceIndex(counter: number, length: number): number {
    if (length <= 1) return 0;
    const doubleLength = (length - 1) * 2;
    const mod = counter % doubleLength;
    return mod < length ? mod : doubleLength - mod;
  }

  private updateActiveNotes() {
    if (this.bgmGenre === 1) {
      if (!this.isTense) {
        const chords = [
          [110, 220, 261.63, 329.63], // Am7
          [174.61, 220, 261.63, 349.23], // Fmaj7
          [130.81, 261.63, 329.63, 392],   // Cmaj7
          [196, 246.94, 293.66, 392], // Gadd9
        ];
        this.activeNotes = chords[this.chordIndex % chords.length];
      } else {
        const chords = [
          [110, 220, 261.63, 311.13], // Adim7
          [174.61, 207.65, 261.63, 349.23], // Fm7
          [130.81, 261.63, 311.13, 392],   // Cm7
          [207.65, 246.94, 293.66, 370], // G#dim7
        ];
        this.activeNotes = chords[this.chordIndex % chords.length];
      }
    } else {
      if (!this.isTense) {
        const chords = [
          [130.81, 164.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88], // Cmaj7 harp wave
          [103.83, 130.81, 155.56, 196.00, 207.65, 261.63, 311.13, 392.00], // Abmaj7
          [87.31, 110.00, 130.81, 164.81, 174.61, 220.00, 261.63, 329.63], // Fmaj7
          [87.31, 103.83, 130.81, 146.83, 174.61, 207.65, 261.63, 293.66], // Fm6
        ];
        this.activeNotes = chords[this.chordIndex % chords.length];
      } else {
        const chords = [
          [220.00, 233.08, 261.63, 277.18, 311.13, 329.63, 440.00, 466.16], // Adim7
          [174.61, 185.00, 207.65, 220.00, 246.94, 261.63, 349.23, 369.99], // Fdim7
          [130.81, 138.59, 155.56, 164.81, 196.00, 207.65, 261.63, 277.18], // Cm7b5
          [207.65, 220.00, 246.94, 261.63, 293.66, 311.13, 415.30, 440.00], // G#dim7
        ];
        this.activeNotes = chords[this.chordIndex % chords.length];
      }
    }
  }

  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    this.chordIndex = 0;
    this.seqCounter = 0;
    
    this.updateActiveNotes();

    const playChordCycle = () => {
      if (!this.ctx || !this.bgmPlaying) return;
      
      const now = this.ctx.currentTime;
      this.updateActiveNotes();
      
      if (this.bgmGenre === 1) {
        if (this.bgmNodes) {
          const oldNodes = this.bgmNodes;
          const oldGain = oldNodes.gain;
          oldGain.gain.setValueAtTime(oldGain.gain.value, now);
          oldGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
          oldNodes.oscillators.forEach(osc => {
            try {
              osc.stop(now + 3.5);
            } catch (e) {}
          });
          setTimeout(() => {
            try {
              oldGain.disconnect();
              oldNodes.oscillators.forEach(osc => osc.disconnect());
            } catch (e) {}
          }, 4000);
        }
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(this.isTense ? 850 : 320, now);
        filter.connect(this.ctx.destination);
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.isTense ? 0.045 : 0.03, now + 2.0);
        gain.connect(filter);
        
        const oscillators = this.activeNotes.map((freq, i) => {
          if (!this.ctx) return null;
          const osc = this.ctx.createOscillator();
          osc.type = "triangle";
          
          const detune = this.isTense ? (i % 2 === 0 ? 6 : -6) : 0;
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime(detune, now);
          
          osc.connect(gain);
          osc.start(now);
          return osc;
        }).filter(Boolean) as OscillatorNode[];
        
        this.bgmNodes = { oscillators, gain };

        if (this.isTense && this.chordIndex % 2 === 0) {
          const oscBeep = this.ctx.createOscillator();
          const gainBeep = this.ctx.createGain();
          oscBeep.type = "sine";
          const beepFreq = this.chordIndex % 4 === 0 ? 1046.50 : 1174.66;
          oscBeep.frequency.setValueAtTime(beepFreq, now + 0.6);
          gainBeep.gain.setValueAtTime(0, now + 0.6);
          gainBeep.gain.linearRampToValueAtTime(0.012, now + 0.62);
          gainBeep.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
          oscBeep.connect(gainBeep);
          gainBeep.connect(this.ctx.destination);
          oscBeep.start(now + 0.6);
          oscBeep.stop(now + 1.5);
        }
      }
      
      this.chordIndex++;
    };
    
    if (this.bgmGenre === 1) {
      playChordCycle();
    }
    
    const padInterval = this.isTense ? 3000 : 5500;
    const arpeggioInterval = this.isTense ? 3000 : 6000;
    this.bgmInterval = setInterval(playChordCycle, this.bgmGenre === 1 ? padInterval : arpeggioInterval);
    
    this.startSequencerLoop();
    this.startTickLoop();
  }

  private startSequencerLoop() {
    if (this.seqInterval) clearInterval(this.seqInterval);
    if (this.bgmGenre !== 2) return;
    
    // Slowed down normal plucking delay from 280ms to 340ms for an extremely chill lofi feel
    const pluckingDelay = this.isTense ? 120 : 340; 
    
    this.seqInterval = setInterval(() => {
      if (!this.ctx || !this.bgmPlaying || this.bgmGenre !== 2) return;
      
      const now = this.ctx.currentTime;
      const noteIdx = this.getBounceIndex(this.seqCounter, this.activeNotes.length);
      const freq = this.activeNotes[noteIdx];
      
      if (freq) {
        const osc = this.ctx.createOscillator();
        const gainNote = this.ctx.createGain();
        
        osc.type = this.isTense ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);
        
        if (this.isTense) {
          osc.detune.setValueAtTime(this.seqCounter % 2 === 0 ? 12 : -12, now);
        }
        
        gainNote.gain.setValueAtTime(0, now);
        gainNote.gain.linearRampToValueAtTime(this.isTense ? 0.045 : 0.035, now + 0.02);
        // Extended note release decay to 3.5s to let slow plucks ring out beautifully
        gainNote.gain.exponentialRampToValueAtTime(0.0001, now + (this.isTense ? 1.0 : 3.5));
        
        osc.connect(gainNote);
        gainNote.connect(this.ctx.destination);
        osc.start(now);
        // Slow plucks stop at 3.8s to blend into the next notes
        osc.stop(now + (this.isTense ? 1.2 : 3.8));
      }
      
      if (this.isTense && this.seqCounter % 16 === 0) {
        for (let b = 0; b < 6; b++) {
          const beepTime = now + (b * 0.12);
          const oscBeep = this.ctx.createOscillator();
          const gainBeep = this.ctx.createGain();
          oscBeep.type = "sine";
          oscBeep.frequency.setValueAtTime(b % 2 === 0 ? 1396.91 : 1479.98, beepTime);
          
          gainBeep.gain.setValueAtTime(0, beepTime);
          gainBeep.gain.linearRampToValueAtTime(0.015, beepTime + 0.01);
          gainBeep.gain.exponentialRampToValueAtTime(0.0001, beepTime + 0.1);
          
          oscBeep.connect(gainBeep);
          gainBeep.connect(this.ctx.destination);
          oscBeep.start(beepTime);
          oscBeep.stop(beepTime + 0.12);
        }
      }
      
      this.seqCounter++;
    }, pluckingDelay);
  }

  private startTickLoop() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    this.tickInterval = setInterval(() => {
      if (!this.ctx || !this.bgmPlaying || this.eventCount < 2) return;
      
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = "sine";
      const pitch = this.isTense ? 1200 : 700;
      osc.frequency.setValueAtTime(pitch, time);
      
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(pitch, time);
      filter.Q.setValueAtTime(5, time);
      
      gain.gain.setValueAtTime(0.012, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.08);
    }, 350);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
    if (this.seqInterval) {
      clearInterval(this.seqInterval);
      this.seqInterval = null;
    }
    
    const now = this.ctx ? this.ctx.currentTime : 0;
    if (this.bgmNodes) {
      const oldNodes = this.bgmNodes;
      try {
        oldNodes.gain.gain.setValueAtTime(oldNodes.gain.gain.value, now);
        oldNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        oldNodes.oscillators.forEach(osc => {
          try {
            osc.stop(now + 0.6);
          } catch (e) {}
        });
      } catch (e) {}
      
      setTimeout(() => {
        try {
          oldNodes.gain.disconnect();
          oldNodes.oscillators.forEach(osc => osc.disconnect());
        } catch (e) {}
      }, 700);
      this.bgmNodes = null;
    }
  }

  setTension(isTense: boolean) {
    if (this.isTense !== isTense) {
      this.isTense = isTense;
      if (this.bgmPlaying) {
        this.stopBGM();
        this.startBGM();
      }
    }
  }

  setEventCount(count: number) {
    if (this.eventCount !== count) {
      this.eventCount = count;
      if (this.bgmPlaying) {
        this.startTickLoop();
      }
    }
  }
}

export const soundManager = new SoundManager();
