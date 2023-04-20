import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css'
const App = () => {
  
 
  const commands = [
    {
      command: 'reset',
      callback: ({ resetTranscript }) => {
        resetTranscript();  }
      
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'open *',
      callback: (site) => { window.open('http://' + site) }
    },
    {
      command: 'increase text size',
      callback: () => {document.getElementById('cont').style.fontSize = '30px'}
    },
    {
      command: 'decrease text size',
      callback: () => {document.getElementById('cont').style.fontSize = '10px'}
    },
    {
      command: 'change text colour to *',
      callback: (color) => {document.getElementById('cont').style.color =  color}
    }
  ]

  SpeechRecognition.startListening({ continuous: true, language:'en-IN' })
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

  
  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <div className='container'>
      <div className='navbar'>
        <h1>Type something to write..</h1>
        <h2>Some of the commands to use in the speech recognition..</h2>
        <ul>
          <li>Open *: To open the browser</li>
          <li>Reset : To reset the transcript</li>
          <li>Clear : To clear the transcript</li>
          <li>Increase text size : To increase text size of the transcript</li>
          <li>Decrease text size : To decrease text size of the transcript</li>
          <li>Change text colour to * :To change text colour to * of the transcript</li>
        </ul>
      </div>
      <div id='cont'>
        {transcript}
      </div>
    </div>
  )
}
export default App