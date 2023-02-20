import '../css/index.css';

import image1 from '../assets/128x128.PNG';
import image2 from '../assets/256x256.PNG';
import image3 from '../assets/500x500.PNG';

import Worker from './index.worker.js';
const worker = new Worker();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js");
  console.log('[Service Worker] registered');
}

import { getDocument } from 'pdfjs-dist';

const pdfEditTxtBx = document.querySelector('#edit-text');
const pdfUploadIpt = document.querySelector('#pdf-upload');
const pdfReadBttn = document.querySelector('#pdf-read');

const playBttn = document.querySelector('#play');
const pauseBttn = document.querySelector('#pause');
const stopBttn = document.querySelector('#stop');


function getPortionToRead() {
  let text = pdfEditTxtBx.value;
  let cursorPos = pdfEditTxtBx.selectionStart;
  let cursorEndPos = pdfEditTxtBx.selectionEnd;
  console.log({cursorPos});
  console.log(text.length);
  if (cursorPos == text.length) return text;
  else if (cursorPos === cursorEndPos) return text.slice(cursorPos);
  else if (cursorEndPos > text.length) return text.slice(cursorPos);
  else if (cursorEndPos < text.length) return text.slice(cursorPos, cursorEndPos+1);
  return text;
}


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

playBttn.addEventListener('click', () => {
  if (speechSynthesis.paused) speechSynthesis.resume();
  else speechSynthesis.speak(new SpeechSynthesisUtterance(getPortionToRead()));
});

pauseBttn.addEventListener('click', () => {
  if (speechSynthesis.speaking) speechSynthesis.pause();
});

stopBttn.addEventListener('click', () => {
  speechSynthesis.cancel();
});

let utterance = new SpeechSynthesisUtterance("Upload a PDF to begin.");
speechSynthesis.speak(utterance);