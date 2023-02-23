import '../css/index.css';

import image1 from '../assets/128x128.PNG';
import image2 from '../assets/256x256.PNG';
import image3 from '../assets/500x500.PNG';

import Worker from './index.worker.js';
import async from 'async';

import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js");
  console.log('[Service Worker] registered');
}

import { getDocument } from 'pdfjs-dist';

let voices = speechSynthesis.getVoices().filter((value) => {if (value.localService) return value});
if (voices.length == 0) location.reload();

if (!localStorage.getItem('voice')) {
  console.log(speechSynthesis.getVoices().filter(voice => voice.default)[0].name)
  localStorage.setItem('voice', speechSynthesis.getVoices().filter(voice => voice.default)[0].name);
  localStorage.setItem('rate', '1.0');
}

const pdfEditTxtBx = document.querySelector('#edit-text');
const pdfUploadIpt = document.querySelector('#pdf-upload');
const pdfReadBttn = document.querySelector('#pdf-read');

const playBttn = document.querySelector('#play');
const pauseBttn = document.querySelector('#pause');
const stopBttn = document.querySelector('#stop');
const optionsBttn = document.querySelector('#options');

const optionsDlg = document.querySelector('#options-dialog');
const voiceSlct = document.querySelector('#voice-control');
const speedRng = document.querySelector('#speed-control');
const testBttn = document.querySelector('#test-voice');
const saveCloseBttn = document.querySelector('#save-close');

/**
 * Gets the text to read based on the cursor position.
 * @returns {string} - The string of text to read
 */
function getPortionToRead() {
  let text = pdfEditTxtBx.value;
  let cursorPos = pdfEditTxtBx.selectionStart;
  let cursorEndPos = pdfEditTxtBx.selectionEnd;
  if (cursorPos == text.length) return text;
  else if (cursorPos === cursorEndPos) return text.slice(cursorPos);
  else if (cursorEndPos > text.length) return text.slice(cursorPos);
  else if (cursorEndPos < text.length) return text.slice(cursorPos, cursorEndPos+1);
  return text;
}

/**
 * Event listener to load the text from the PDF selected.
 */
pdfReadBttn.addEventListener('click', () => {
  let file;
  pdfEditTxtBx.value = '';
  // If there is a file, get the file
  if (pdfUploadIpt.files.length > 0) {
    file = pdfUploadIpt.files[0];
    // Load the file
    let loadingTask = getDocument(URL.createObjectURL(file));
    loadingTask.promise.then((pdf) => {
      let pages = Array.from({
        length: pdf.numPages,
      }, (_, index) => index+1);

      // Get the pages of the file
      const getPage = async (index) => {
        return pdf.getPage(index).then((res) => {return res})
      }

      const getText = async (page) => {
        return page.value.getTextContent()
      }

      const convertToString = async (text) => {
        let out = '';
        text.value.items.forEach((line) => {
          if (line.str) {
            out += line.str + ' ';
          }
          else {
            out += '\n\n';
          }
        });
        return out;
      }

      async.mapSeries(pages, async.reflect(getPage), (_, res) => {
        async.mapSeries(res, async.reflect(getText), (_, res) => {
          async.mapSeries(res, async.reflect(convertToString), (_, res) => {
            pdfEditTxtBx.value = res.map((value) => {return value.value}).join('\n\n');
            // Try to save the file text
            try {
              localStorage.setItem('file', compressToUTF16(pdfEditTxtBx.value));
              console.log('file saved');
            } catch (error) {
              console.warn(error);
            }
          });
        });
      });
      console.log('loaded');

    });
  } else {
    console.log('No file');
  }
});

// Attempt to load saved pdf text if it exists
if (localStorage.getItem('file')) {
  try {
    pdfEditTxtBx.value = decompressFromUTF16(localStorage.getItem('file'));
  } catch (error) {
    console.warn(error);
  }
} else {
  console.log('no file saved');
}

let utterance = new SpeechSynthesisUtterance("Upload a PDF to begin.");
utterance.voice = voices.filter(voice => voice.name == localStorage.getItem('voice'))[0];
utterance.rate = parseFloat(localStorage.getItem('rate'));

/**
 * Event listener to play the speech
 */
playBttn.addEventListener('click', () => {
  if (speechSynthesis.paused) speechSynthesis.resume();
  else {
    utterance.text = getPortionToRead();
    speechSynthesis.speak(utterance);
  }
});

/**
 * Event listener to pause the speech
 */
pauseBttn.addEventListener('click', () => {
  if (speechSynthesis.speaking) speechSynthesis.pause();
});

/**
 * Event listener to stop the speech and clear its text
 */
stopBttn.addEventListener('click', () => {
  speechSynthesis.cancel();
});

speechSynthesis.speak(utterance);

// *** OPTIONS DIALOG *** //

let testUtterance = new SpeechSynthesisUtterance('The quick red fox jumps over the lazy brown dog.');
testUtterance.voice = voices.filter(voice => voice.name == localStorage.getItem('voice'))[0];
testUtterance.rate = parseFloat(localStorage.getItem('rate'));

optionsBttn.addEventListener('click', () => {
  speechSynthesis.cancel();
  optionsDlg.showModal();
});

saveCloseBttn.addEventListener('click', () => {
  utterance.voice = testUtterance.voice;
  utterance.rate = testUtterance.rate;
  localStorage.setItem('voice', voiceSlct.selectedOptions[0].getAttribute('data-name'));
  localStorage.setItem('rate', speedRng.value.toString());
  optionsDlg.close();
});

voiceSlct.innerHTML = '';
voices.forEach((voice, index) => {
  let opt = document.createElement('option');
  opt.textContent = voice.name;
  if (voice.default) opt.textContent += ' (default)';
  if (voice.name === localStorage.getItem('voice')) opt.selected = true;

  opt.setAttribute('data-lang', voice.lang);
  opt.setAttribute('data-name', voice.name);
  opt.setAttribute('data-index', index);

  voiceSlct.appendChild(opt);
});

voiceSlct.addEventListener('change', () => {
  testUtterance.voice = voices[voiceSlct.selectedOptions[0].getAttribute('data-index')];
});

speedRng.value = parseFloat(localStorage.getItem('rate'));
speedRng.addEventListener('change', () => {
  testUtterance.rate = speedRng.value;
});

testBttn.addEventListener('click', () => {
  speechSynthesis.speak(testUtterance);
});