import '../css/index.css';

import fs from 'fs';
import PDFJS from 'pdfjs-dist';
import { parse } from 'path';

console.log("Hello, World!");

// const voices = speechSynthesis.getVoices();

// const voiceList = document.querySelector('#voice-list');
// voices.forEach((voice) => {
//   voiceList.innerHTML += `<li>${voice.name}</li>`
// });

const pdfTextP = document.querySelector('#pdf-text');

PDFJS.getDocument('./PCODE_UP882151.pdf').then((pdf) => {
  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then((page) => {
      page.getTextContent().then((textContent) => {
        pdfTextP.innerHTML += textContent
      });
    });
  }
});

let utterance = new SpeechSynthesisUtterance("Hello world!");
speechSynthesis.speak(utterance);