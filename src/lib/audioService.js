let utterance = null;
let currentIndex = 0;
let articles = [];
let onArticleChange = null;
let onComplete = null;
let onStateChange = null;

export function initAudio({ items, onArticle, onDone, onState }) {
  articles = items;
  onArticleChange = onArticle;
  onComplete = onDone;
  onStateChange = onState;
  currentIndex = 0;
}

function speakArticle(index) {
  if (index >= articles.length) {
    onComplete?.();
    onStateChange?.('stopped');
    return;
  }

  const article = articles[index];
  const text = `Story ${index + 1}. ${article.headline}. ${article.summary}`;

  utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.05;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    onArticleChange?.(index);
  };

  utterance.onend = () => {
    currentIndex = index + 1;
    speakArticle(currentIndex);
  };

  utterance.onerror = (e) => {
    if (e.error !== 'interrupted') {
      currentIndex = index + 1;
      speakArticle(currentIndex);
    }
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function play() {
  onStateChange?.('playing');
  speakArticle(currentIndex);
}

export function pause() {
  window.speechSynthesis.pause();
  onStateChange?.('paused');
}

export function resume() {
  window.speechSynthesis.resume();
  onStateChange?.('playing');
}

export function stop() {
  window.speechSynthesis.cancel();
  currentIndex = 0;
  onStateChange?.('stopped');
  onArticleChange?.(null);
}

export function skipNext() {
  window.speechSynthesis.cancel();
  currentIndex = Math.min(currentIndex + 1, articles.length - 1);
  speakArticle(currentIndex);
}

export function skipPrev() {
  window.speechSynthesis.cancel();
  currentIndex = Math.max(currentIndex - 1, 0);
  speakArticle(currentIndex);
}

export function getCurrentIndex() {
  return currentIndex;
}