import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import './styles.css';

const App = () => {
  const [listening, setListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();
  const [sentence, setSentence] = useState('');

  const toggleListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    } else {
      SpeechRecognition.stopListening();
    }
    setListening(!listening);
  };

  const speakTranscript = () => {
    speak({ text: transcript });
  };

  const speakSentence = () => {
    speak({ text: sentence });
  };

  const handleInputChange = (event) => {
    resetTranscript();
    setSentence(event.target.value);
  };

  return (
    <div className='container'>
      <h1>Voice Recognition</h1>
      <div className="controls">
        <button onClick={toggleListening} className={listening ? 'listening' : 'button'} >
          <FontAwesomeIcon icon={faMicrophone} />
          {listening ? ' Stop ' : ' Start'}
        </button>
        <button onClick={resetTranscript} className="button secondary">Reset</button>
        <button onClick={speakTranscript} disabled={!transcript} className="button danger">Replay</button>
        
      </div>
      <div className="text-area-container">
        <textarea className="text-area" value={transcript} onChange={handleInputChange} placeholder="Speak or type here..." />
      </div>
      <button onClick={speakSentence} disabled={!sentence} className="button primary">Speak</button>
      <div className="input-box">
        <input type="text" value={sentence} onChange={handleInputChange} placeholder="Enter a sentence to speak" />
      </div>
    </div>
  );
};

export default App;
