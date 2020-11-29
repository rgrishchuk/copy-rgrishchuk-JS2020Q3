export default function createAudio() {
  let audio = document.createElement('audio');
  audio.src = './assets/sound/move.mp3';
  audio.classList.add('audio__move');
  document.body.prepend(audio);
  audio = document.createElement('audio');
  audio.src = './assets/sound/win.mp3';
  audio.classList.add('audio__win');
  document.body.prepend(audio);
  return audio;
}
