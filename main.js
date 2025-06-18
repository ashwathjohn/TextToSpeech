
  let speech = new SpeechSynthesisUtterance();
  let voices = [];
  const voiceSelect = document.querySelector("select");

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length) {
      voiceSelect.innerHTML = "";
      voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
      });
      speech.voice = voices[0];
    } else {
      setTimeout(populateVoices, 200);
    }
  }

  populateVoices(); 
  speechSynthesis.onvoiceschanged = populateVoices; 

  voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
  });

  document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value.trim();
    if (!text) return;
    speech.text = text;
    speechSynthesis.cancel(); 
    speechSynthesis.speak(speech);
  });

