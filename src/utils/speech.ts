export const playAudio = async (audioUrl: string): Promise<void> => {
  const audio = new Audio();
  
  try {
    // Add error handling for the loading phase
    await new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', () => resolve(undefined));
      audio.addEventListener('error', (e) => reject(e));
      audio.src = audioUrl;
    });

    // Play the audio with error handling
    await audio.play();
  } catch (error) {
    console.error('Error playing audio:', error);
    // Fallback to speech synthesis if audio playback fails
    const text = audioUrl.includes('definition') 
      ? 'Sorry, definition audio is unavailable'
      : 'Sorry, word audio is unavailable';
    speakText(text, 'en-US', 1);
    throw new Error('Audio playback failed');
  } finally {
    // Cleanup
    audio.remove();
  }
};

export const speakText = (text: string, lang: string = 'zh-CN', rate: number = 1) => {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  
  // Add error handling for speech synthesis
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
  };

  window.speechSynthesis.speak(utterance);
};