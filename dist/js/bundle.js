/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = '';
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = './js/app.js');
/******/ })
/************************************************************************/
/******/ ({

/***/ './js/app.js':
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

'use strict';
eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_Cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Cards */ \'./js/models/Cards.js\');\n\n\n/** Data */\n\nconst cards = [\n  {\n    \'name\': \'LA Lakers\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Boston Celtics\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Milwaukee Bucks\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Golden State Warriors\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'New York Knicks\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Chicago Bulls\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Houston Rockets\',\n    \'imgSrc\': \'\'\n  },\n  {\n    \'name\': \'Detroit Pistons\',\n    \'imgSrc\': \'\'\n  }\n];\n\n/** Global state of the app\n * - Deck state\n * - Star Rating\n * - Move Counter\n * - Leaderboard\n */\n\nconst state = {\n  \'cards\': [],\n  \'score\': 0,\n  \'starRating\': 3,\n  \'leaderBoard\': []\n};\n\n\n/* Card Controller */\n/* =============== */\n\nconst controlCard = () => {\n  // Set up card deck\n  state.cards = new _models_Cards__WEBPACK_IMPORTED_MODULE_0__[\'default\'](cards);\n  state.cards.createNewDeck();\n\n  console.log(state);\n\n  // Distribute individual cards to game board (grid)\n}\n\n\n// const shuffleDeck = array => {\n//   for (let i = array.length - 1; i > 0; i--) {\n//     const j = Math.floor(Math.random() * i);\n//     const temp = array[i];\n//     array[i] = array[j];\n//     array[j] = temp;\n//   }    \n  \n//   return array;\n// }\n\n// const createNewDeck = array => {\n//   const newDeck = [...array];\n\n//   // Create card pairs from the cards array\n//   for(let i = 0; i < array.length; i++) {\n//     newDeck.push(array[i]);\n//   }\n\n//   // Shuffle cards\n//   shuffleDeck(newDeck);\n\n//   return newDeck;\n// }\n\nconst init = () => {\n  controlCard();\n\n  // Reset Star Rating\n\n  // Reset Move Count\n\n  // Reset Timer\n\n}\n\n// Run init function when content loads\ndocument.addEventListener(\'DOMContentLoaded\', init);\n\n\n\n\n\n//# sourceURL=webpack:///./js/app.js?');

/***/ }),

/***/ './js/models/Cards.js':
/*!****************************!*\
  !*** ./js/models/Cards.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

'use strict';
eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \'default\', function() { return Cards; });\nclass Cards {\n  constructor(cardsArray) {\n    // Main Card Deck\n    this.deck = cardsArray;\n  }\n\n  createNewDeck() {\n    // Create pairs\n    this.deck = createCardPairs(this.deck);\n\n    // Shufffle deck\n    this.deck = shuffleDeck(this.deck);\n  }\n\n  createCardPairs() {\n    const newArray = [...this.deck];\n\n    // Create card pairs and push to newArray\n    for(let i = 0; i < newArray.length; i++) {\n      newArray.push(newArray[i]);\n    }\n    \n    this.deck = newArray;\n    return newArray\n  }\n\n  shuffleDeck(arr) {\n    for (let i = this.deck.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * i);\n      const temp = this.deck[i];\n      this.deck[i] = this.deck[j];\n      this.deck[j] = temp;\n    }    \n    \n    return array;\n  }\n\n}\n\n//# sourceURL=webpack:///./js/models/Cards.js?');

/***/ })

/******/ });