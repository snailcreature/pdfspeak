import '../css/index.css';

import Worker from './index.worker.js';
const worker = new Worker();

import fs from 'fs';
import { parse } from 'path';
import { getDocument } from 'pdfjs-dist';

console.log("Hello, World!");

// const voices = speechSynthesis.getVoices();

// const voiceList = document.querySelector('#voice-list');
// voices.forEach((voice) => {
//   voiceList.innerHTML += `<li>${voice.name}</li>`
// });

const pdfTextP = document.querySelector('#pdf-text');
const pdfUploadIpt = document.querySelector('#pdf-upload');
const pdfReadBttn = document.querySelector('#pdf-read');
console.log('make a change');

pdfReadBttn.addEventListener('click', () => {
  let file;
  if (pdfUploadIpt.files.length > 0) {
    file = pdfUploadIpt.files[0];
    let loadingTask = getDocument(URL.createObjectURL(file));
    loadingTask.promise.then((pdf) => {
      console.log('loaded');
      pdf.getPage(1).then((page) => {
        page.getTextContent().then((text) => {
          console.log(text);
          text.items.forEach((item) => {
            if (item.str) pdfTextP.textContent += item.str + ' ';
          })
        });
      });
    })
  } else {
    console.log('No file');
  }
});

let utterance = new SpeechSynthesisUtterance("Hello world!");
speechSynthesis.speak(utterance);