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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _assets_128x128_PNG__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/128x128.PNG */ \"./src/assets/128x128.PNG\");\n/* harmony import */ var _assets_256x256_PNG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/256x256.PNG */ \"./src/assets/256x256.PNG\");\n/* harmony import */ var _assets_500x500_PNG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/500x500.PNG */ \"./src/assets/500x500.PNG\");\n/* harmony import */ var _index_worker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.worker.js */ \"./src/javascript/index.worker.js\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pdfjs-dist */ \"./node_modules/pdfjs-dist/build/pdf.js\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pdfjs_dist__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst worker = new _index_worker_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n\nif (\"serviceWorker\" in navigator) {\n  navigator.serviceWorker.register(\"../sw.js\");\n  alert('[Service Worker] Registered');\n}\n\n\n\nconst pdfEditTxtBx = document.querySelector('#edit-text');\nconst pdfUploadIpt = document.querySelector('#pdf-upload');\nconst pdfReadBttn = document.querySelector('#pdf-read');\n\nconst playBttn = document.querySelector('#play');\nconst pauseBttn = document.querySelector('#pause');\nconst stopBttn = document.querySelector('#stop');\n\npdfReadBttn.addEventListener('click', () => {\n  let file;\n  pdfEditTxtBx.value = '';\n  // If there is a file, get the file\n  if (pdfUploadIpt.files.length > 0) {\n    file = pdfUploadIpt.files[0];\n    // Load the file\n    let loadingTask = (0,pdfjs_dist__WEBPACK_IMPORTED_MODULE_5__.getDocument)(URL.createObjectURL(file));\n    loadingTask.promise.then((pdf) => {\n      // Get the pages of the file\n      let pageTrack = [...Array(pdf.numPages).keys()].map((value) => {return value + 1});\n      console.log({pageTrack});\n      for (let i = 1; i < pdf.numPages; i++) {\n        setTimeout(() => {\n          pdf.getPage(i).then((page) => {\n            page.getTextContent().then((text) => {\n              text.items.forEach((line) => {\n                if (line.str) {\n                  pdfEditTxtBx.value += line.str + ' ';\n                }\n                else {\n                  pdfEditTxtBx.value += '\\n\\n';\n                }\n              });\n              pdfEditTxtBx.value += '\\n\\n';\n            });\n            page.cleanup();\n          });\n        }, 1000*i); \n      };\n      console.log('loaded');\n    });\n  } else {\n    console.log('No file');\n  }\n});\n\nplayBttn.addEventListener('click', () => {\n  if (speechSynthesis.paused) speechSynthesis.resume();\n  else speechSynthesis.speak(new SpeechSynthesisUtterance(pdfEditTxtBx.value));\n});\n\npauseBttn.addEventListener('click', () => {\n  if (speechSynthesis.speaking) speechSynthesis.pause();\n});\n\nstopBttn.addEventListener('click', () => {\n  speechSynthesis.cancel();\n});\n\nlet utterance = new SpeechSynthesisUtterance(\"Upload a PDF to begin.\");\nspeechSynthesis.speak(utterance);\n\n//# sourceURL=webpack://pdfspeak/./src/javascript/index.js?");

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