/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack_boilerplate"] = self["webpackChunkwebpack_boilerplate"] || []).push([["index"],{

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-boilerplate/./src/css/index.css?");

/***/ }),

/***/ "./src/javascript/index.worker.js":
/*!****************************************!*\
  !*** ./src/javascript/index.worker.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Worker_fn)\n/* harmony export */ });\nfunction Worker_fn() {\n  return new Worker(__webpack_require__.p + \"javascript/index.1676653270454.worker.js\");\n}\n\n\n//# sourceURL=webpack://webpack-boilerplate/./src/javascript/index.worker.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _index_worker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.worker.js */ \"./src/javascript/index.worker.js\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdfjs-dist */ \"./node_modules/pdfjs-dist/build/pdf.js\");\n/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pdfjs_dist__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst worker = new _index_worker_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n\n\nconst pdfEditTxtBx = document.querySelector('#edit-text');\nconst pdfUploadIpt = document.querySelector('#pdf-upload');\nconst pdfReadBttn = document.querySelector('#pdf-read');\nconst readAloudBttn = document.querySelector('#read-aloud');\n\n\npdfReadBttn.addEventListener('click', () => {\n  let file;\n  pdfEditTxtBx.value = '';\n  // If there is a file, get the file\n  if (pdfUploadIpt.files.length > 0) {\n    file = pdfUploadIpt.files[0];\n    // Load the file\n    let loadingTask = (0,pdfjs_dist__WEBPACK_IMPORTED_MODULE_2__.getDocument)(URL.createObjectURL(file));\n    loadingTask.promise.then((pdf) => {\n      console.log('loaded');\n      // Get the pages of the file\n      let pageTrack = ['page'] * pdf.numPages;\n      pageTrack.forEach(() => {\n        pdf.getPage(i).then((page) => {\n          page.getTextContent().then((text) => {\n            text.items.forEach((line) => {\n              if (line.str) {\n                pdfEditTxtBx.value += line.str + ' ';\n              }\n              else {\n                pdfEditTxtBx.value += '\\n\\n';\n              }\n            });\n            pdfEditTxtBx.value += '\\n\\n';\n          });\n          page.cleanup()\n        });\n      });\n    });\n  } else {\n    console.log('No file');\n  }\n});\n\nreadAloudBttn.addEventListener('click', () => {\n  let utterance = new SpeechSynthesisUtterance(pdfEditTxtBx.value);\n  speechSynthesis.speak(utterance);\n});\n\nlet utterance = new SpeechSynthesisUtterance(\"Upload a PDF to begin.\");\nspeechSynthesis.speak(utterance);\n\n//# sourceURL=webpack://webpack-boilerplate/./src/javascript/index.js?");

/***/ }),

/***/ "?4a14":
/*!************************!*\
  !*** canvas (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/canvas_(ignored)?");

/***/ }),

/***/ "?fe90":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/fs_(ignored)?");

/***/ }),

/***/ "?d446":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/http_(ignored)?");

/***/ }),

/***/ "?4c38":
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/https_(ignored)?");

/***/ }),

/***/ "?9f5f":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/url_(ignored)?");

/***/ }),

/***/ "?afbb":
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://webpack-boilerplate/zlib_(ignored)?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/javascript/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);