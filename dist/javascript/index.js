/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkpdfspeak"] = self["webpackChunkpdfspeak"] || []).push([["index"],{

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://pdfspeak/./src/css/index.css?");

/***/ }),

/***/ "./src/javascript/index.worker.js":
/*!****************************************!*\
  !*** ./src/javascript/index.worker.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Worker_fn)\n/* harmony export */ });\nfunction Worker_fn() {\n  return new Worker(__webpack_require__.p + \"javascript/index.worker.js\");\n}\n\n\n//# sourceURL=webpack://pdfspeak/./src/javascript/index.worker.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _assets_128x128_PNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/128x128.PNG */ \"./src/assets/128x128.PNG\");\n/* harmony import */ var _assets_256x256_PNG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/256x256.PNG */ \"./src/assets/256x256.PNG\");\n/* harmony import */ var _assets_500x500_PNG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/500x500.PNG */ \"./src/assets/500x500.PNG\");\n/* harmony import */ var _index_worker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.worker.js */ \"./src/javascript/index.worker.js\");\n/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! async */ \"./node_modules/async/dist/async.mjs\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pdfjs-dist */ \"./node_modules/pdfjs-dist/build/pdf.js\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pdfjs_dist__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n\nif (\"serviceWorker\" in navigator) {\n  navigator.serviceWorker.register(\"../sw.js\");\n  console.log('[Service Worker] registered');\n}\n\n\n\nlet voices = speechSynthesis.getVoices().filter((value) => {if (value.localService) return value});\nif (voices.length == 0) location.reload();\n\nif (typeof localStorage.getItem('voice') == null) {\n  console.log(speechSynthesis.getVoices().filter(voice => voice.default)[0].name)\n  localStorage.setItem('voice', speechSynthesis.getVoices().filter(voice => voice.default)[0].name);\n  localStorage.setItem('rate', '1.0');\n}\n\nconst pdfEditTxtBx = document.querySelector('#edit-text');\nconst pdfUploadIpt = document.querySelector('#pdf-upload');\nconst pdfReadBttn = document.querySelector('#pdf-read');\n\nconst playBttn = document.querySelector('#play');\nconst pauseBttn = document.querySelector('#pause');\nconst stopBttn = document.querySelector('#stop');\nconst optionsBttn = document.querySelector('#options');\n\nconst optionsDlg = document.querySelector('#options-dialog');\nconst voiceSlct = document.querySelector('#voice-control');\nconst speedRng = document.querySelector('#speed-control');\nconst testBttn = document.querySelector('#test-voice');\nconst saveCloseBttn = document.querySelector('#save-close');\n\n/**\n * Gets the text to read based on the cursor position.\n * @returns {string} - The string of text to read\n */\nfunction getPortionToRead() {\n  let text = pdfEditTxtBx.value;\n  let cursorPos = pdfEditTxtBx.selectionStart;\n  let cursorEndPos = pdfEditTxtBx.selectionEnd;\n  if (cursorPos == text.length) return text;\n  else if (cursorPos === cursorEndPos) return text.slice(cursorPos);\n  else if (cursorEndPos > text.length) return text.slice(cursorPos);\n  else if (cursorEndPos < text.length) return text.slice(cursorPos, cursorEndPos+1);\n  return text;\n}\n\n/**\n * Event listener to load the text from the PDF selected.\n */\npdfReadBttn.addEventListener('click', () => {\n  let file;\n  pdfEditTxtBx.value = '';\n  // If there is a file, get the file\n  if (pdfUploadIpt.files.length > 0) {\n    file = pdfUploadIpt.files[0];\n    // Load the file\n    let loadingTask = (0,pdfjs_dist__WEBPACK_IMPORTED_MODULE_6__.getDocument)(URL.createObjectURL(file));\n    loadingTask.promise.then((pdf) => {\n      let pages = Array.from({\n        length: pdf.numPages,\n      }, (_, index) => index+1);\n\n      // Get the pages of the file\n      const getPage = async (index) => {\n        return pdf.getPage(index).then((res) => {return res})\n      }\n\n      const getText = async (page) => {\n        return page.value.getTextContent()\n      }\n\n      const convertToString = async (text) => {\n        let out = '';\n        text.value.items.forEach((line) => {\n          if (line.str) {\n            out += line.str + ' ';\n          }\n          else {\n            out += '\\n\\n';\n          }\n        });\n        return out;\n      }\n\n      async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].mapSeries(pages, async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].reflect(getPage), (_, res) => {\n        async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].mapSeries(res, async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].reflect(getText), (_, res) => {\n          async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].mapSeries(res, async__WEBPACK_IMPORTED_MODULE_5__[\"default\"].reflect(convertToString), (_, res) => {\n            pdfEditTxtBx.value = res.map((value) => {return value.value}).join('\\n\\n');\n          });\n        });\n      });\n      console.log('loaded');\n    });\n  } else {\n    console.log('No file');\n  }\n});\n\n\n\nlet utterance = new SpeechSynthesisUtterance(\"Upload a PDF to begin.\");\nutterance.voice = voices.filter(voice => voice.name == localStorage.getItem('voice'))[0];\nutterance.rate = parseFloat(localStorage.getItem('rate'));\n\n/**\n * Event listener to play the speech\n */\nplayBttn.addEventListener('click', () => {\n  if (speechSynthesis.paused) speechSynthesis.resume();\n  else {\n    utterance.text = getPortionToRead();\n    speechSynthesis.speak(utterance);\n  }\n});\n\n/**\n * Event listener to pause the speech\n */\npauseBttn.addEventListener('click', () => {\n  if (speechSynthesis.speaking) speechSynthesis.pause();\n});\n\n/**\n * Event listener to stop the speech and clear its text\n */\nstopBttn.addEventListener('click', () => {\n  speechSynthesis.cancel();\n});\n\nspeechSynthesis.speak(utterance);\n\n// *** OPTIONS DIALOG *** //\n\nlet testUtterance = new SpeechSynthesisUtterance('The quick red fox jumps over the lazy brown dog.');\ntestUtterance.voice = voices.filter(voice => voice.name == localStorage.getItem('voice'))[0];\ntestUtterance.rate = parseFloat(localStorage.getItem('rate'));\n\noptionsBttn.addEventListener('click', () => {\n  speechSynthesis.cancel();\n  optionsDlg.showModal();\n});\n\nsaveCloseBttn.addEventListener('click', () => {\n  utterance.voice = testUtterance.voice;\n  utterance.rate = testUtterance.rate;\n  localStorage.setItem('voice', voiceSlct.selectedOptions[0].getAttribute('data-name'));\n  localStorage.setItem('rate', speedRng.value.toString());\n  optionsDlg.close();\n});\n\nvoices.forEach((voice, index) => {\n  let opt = document.createElement('option');\n  opt.textContent = voice.name;\n  if (voice.default) opt.textContent += ' (default)';\n  if (voice.name === localStorage.getItem('voice')) opt.selected = true;\n\n  opt.setAttribute('data-lang', voice.lang);\n  opt.setAttribute('data-name', voice.name);\n  opt.setAttribute('data-index', index);\n\n  voiceSlct.appendChild(opt);\n});\n\nvoiceSlct.addEventListener('change', () => {\n  testUtterance.voice = voices[voiceSlct.selectedOptions[0].getAttribute('data-index')];\n});\n\nspeedRng.value = parseFloat(localStorage.getItem('rate'));\nspeedRng.addEventListener('change', () => {\n  testUtterance.rate = speedRng.value;\n});\n\ntestBttn.addEventListener('click', () => {\n  speechSynthesis.speak(testUtterance);\n});\n\n//# sourceURL=webpack://pdfspeak/./src/javascript/index.js?");

/***/ }),

/***/ "./src/assets/128x128.PNG":
/*!********************************!*\
  !*** ./src/assets/128x128.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"2c8a2de4e0311ecee90f.PNG\";\n\n//# sourceURL=webpack://pdfspeak/./src/assets/128x128.PNG?");

/***/ }),

/***/ "./src/assets/256x256.PNG":
/*!********************************!*\
  !*** ./src/assets/256x256.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6f62c0c3a1a71ecbf984.PNG\";\n\n//# sourceURL=webpack://pdfspeak/./src/assets/256x256.PNG?");

/***/ }),

/***/ "./src/assets/500x500.PNG":
/*!********************************!*\
  !*** ./src/assets/500x500.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6b85ef3f157defe914d8.PNG\";\n\n//# sourceURL=webpack://pdfspeak/./src/assets/500x500.PNG?");

/***/ }),

/***/ "?4a14":
/*!************************!*\
  !*** canvas (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/canvas_(ignored)?");

/***/ }),

/***/ "?fe90":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/fs_(ignored)?");

/***/ }),

/***/ "?d446":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/http_(ignored)?");

/***/ }),

/***/ "?4c38":
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/https_(ignored)?");

/***/ }),

/***/ "?9f5f":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/url_(ignored)?");

/***/ }),

/***/ "?afbb":
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pdfspeak/zlib_(ignored)?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/javascript/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);