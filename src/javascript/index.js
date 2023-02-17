import '../css/index.css';

import Worker from './index.worker.js';
const worker = new Worker();

import { getDocument } from 'pdfjs-dist';

const pdfTextP = document.querySelector('#pdf-text');
const pdfUploadIpt = document.querySelector('#pdf-upload');
const pdfReadBttn = document.querySelector('#pdf-read');


pdfReadBttn.addEventListener('click', () => {
  let file;
  // If there is a file, get the file
  if (pdfUploadIpt.files.length > 0) {
    pdfTextP.innerHTML = '';
    file = pdfUploadIpt.files[0];
    // Load the file
    let loadingTask = getDocument(URL.createObjectURL(file));
    loadingTask.promise.then((pdf) => {
      console.log('loaded');
      // Get the pages of the file
      for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then((page) => {
          page.getTextContent().then((text) => {
            let para = document.createElement('p');
            text.items.forEach((line) => {
              if (line.str) para.textContent += line.str + ' ';
              else {
                pdfTextP.appendChild(para);
                para = document.createElement('p');
              }
            })
          });
        });
      }
    });
  } else {
    console.log('No file');
  }
});

let utterance = new SpeechSynthesisUtterance("Hello world!");
speechSynthesis.speak(utterance);