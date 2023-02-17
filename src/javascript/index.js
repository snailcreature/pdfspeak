import '../css/index.css';

import Worker from './index.worker.js';
const worker = new Worker();

import { getDocument } from 'pdfjs-dist';

const pdfEditTxtBx = document.querySelector('#edit-text');
const pdfUploadIpt = document.querySelector('#pdf-upload');
const pdfReadBttn = document.querySelector('#pdf-read');
const readAloudBttn = document.querySelector('#read-aloud');


pdfReadBttn.addEventListener('click', () => {
  let file;
  pdfEditTxtBx.value = '';
  // If there is a file, get the file
  if (pdfUploadIpt.files.length > 0) {
    file = pdfUploadIpt.files[0];
    // Load the file
    let loadingTask = getDocument(URL.createObjectURL(file));
    loadingTask.promise.then((pdf) => {
      // Get the pages of the file
      let pageTrack = [...Array(pdf.numPages).keys()].map((value) => {return value + 1});
      console.log({pageTrack});
      for (let i = 1; i < pdf.numPages; i++) {
        setTimeout(() => {
          pdf.getPage(i).then((page) => {
            page.getTextContent().then((text) => {
              text.items.forEach((line) => {
                if (line.str) {
                  pdfEditTxtBx.value += line.str + ' ';
                }
                else {
                  pdfEditTxtBx.value += '\n\n';
                }
              });
              pdfEditTxtBx.value += '\n\n';
            });
            page.cleanup();
          });
        }, 1000*i); 
      };
      console.log('loaded');
    });
  } else {
    console.log('No file');
  }
});

readAloudBttn.addEventListener('click', () => {
  let utterance = new SpeechSynthesisUtterance(pdfEditTxtBx.value);
  speechSynthesis.speak(utterance);
});

let utterance = new SpeechSynthesisUtterance("Upload a PDF to begin.");
speechSynthesis.speak(utterance);