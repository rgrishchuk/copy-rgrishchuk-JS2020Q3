export default function voiceWord(word) {
  const audio = document.querySelector('.voice');
  audio.src = `assets/audio/${word}.mp3`;
  audio.play();
}
