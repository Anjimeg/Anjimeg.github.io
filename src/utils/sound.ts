/**
 * Web Audio API synthesizer for responsive, crisp sound effects without external audio asset dependencies.
 */
import hymne from '../assets/hymne.mp3';

let audioCtx: AudioContext | null = null;
let hymneAudio: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return audioCtx;
}

export const soundEffects = {
  // Duolingo-style signature chime on correct answer
  playCorrect: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Two-note bright ascending chime (C5 -> G5)
      const notes = [523.25, 783.99];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(
          0.25,
          now + idx * 0.1 + 0.02
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + idx * 0.1 + 0.35
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.36);
      });
    } catch {
      // Audio context might be restricted before user gesture
    }
  },

  // Soft low tone on incorrect answer
  playIncorrect: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore audio error
    }
  },

  // Pop sound when selecting buttons / chips
  playTap: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  },

  // Cheerful fanfare on lesson complete
  playFanfare: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Arpeggio: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.5];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(
          0.28,
          now + idx * 0.12 + 0.03
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + idx * 0.12 + (idx === 3 ? 0.7 : 0.4)
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(
          now + idx * 0.12 + (idx === 3 ? 0.75 : 0.45)
        );
      });
    } catch {
      // Ignore
    }
  },

  // Heart crack sound
  playHeartLost: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }
};

/**
 * Text-to-Speech using browser Web Speech API with Indonesian/Javanese voice priority
 */
export function speakText(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Look for Indonesian or Malaysian voices
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(
      v => v.lang.startsWith('id') || v.lang.startsWith('ms')
    );

    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.lang = 'id-ID';
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech error if unsupported
  }
}

/**
 * Background music: Hymne
 */
export const hymneMusic = {
  play: async () => {
    try {
      if (!hymneAudio) {
        hymneAudio = new Audio(hymne);
        hymneAudio.loop = true;
        hymneAudio.volume = 0.15;
      }

      await hymneAudio.play();
    } catch {
      // Abaikan jika audio belum diizinkan browser
    }
  },

  pause: () => {
    if (hymneAudio) {
      hymneAudio.pause();
    }
  },

  isPlaying: () => {
    return hymneAudio ? !hymneAudio.paused : false;
  }
};