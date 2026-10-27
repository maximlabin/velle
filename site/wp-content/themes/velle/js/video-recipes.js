/******/ (() => { // webpackBootstrap
    /******/ 	"use strict";
    /******/ 	var __webpack_modules__ = ({

        /***/ "./src/scss/main.scss":
        /*!****************************!*\
          !*** ./src/scss/main.scss ***!
          \****************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            // extracted by mini-css-extract-plugin


            /***/
        })

        /******/
    });
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
        /******/ 		if (cachedModule !== undefined) {
            /******/ 			return cachedModule.exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = __webpack_module_cache__[moduleId] = {
            /******/ 			// no module.id needed
            /******/ 			// no module.loaded needed
            /******/ 			exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/
    }
    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
        /******/ 		// define __esModule on exports
        /******/ 		__webpack_require__.r = (exports) => {
            /******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
            }
            /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        /*!*************************!*\
          !*** ./src/js/index.js ***!
          \*************************/
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");


        (function () {
            document.addEventListener('DOMContentLoaded', function () {
                const videoBlock = document.querySelector('#video-block');
                if (videoBlock) {
                    const video = document.querySelector('.video'),
                        // playBtn = document.querySelector('.controls_play'),
                        progress = document.querySelector('.progress'),
                        playButton = document.querySelector('.play_btn'),
                        pauseButton = document.querySelector('.pause_btn'),
                        volume = document.querySelector('.volume'),
                        volumeSvgPath = document.querySelectorAll('.volume_svg'),
                        volumeSvgLine = document.querySelector('.svg_line')

                    function playVideoStatus() {
                        if (video.paused) {
                            video.play()
                        }
                    }

                    function pauseVideoStatus() {
                        if (video.paused) {
                            return
                        } else {
                            video.pause()
                        }
                        video.pause()
                    }

                    function toggleVideoStatus() {
                        if (video.paused) {
                            video.play()
                        } else {
                            video.pause()
                        }
                    }

                    playButton.addEventListener('click', playVideoStatus)
                    pauseButton.addEventListener('click', pauseVideoStatus)
                    video.addEventListener('click', toggleVideoStatus)

                    function updateProgress() {
                        progress.value = (video.currentTime / video.duration) * 100
                        let target = document.getElementById('range')
                        const min = target.min
                        const max = target.max
                        const val = target.value

                        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
                    }

                    video.addEventListener('timeupdate', updateProgress)

                    function setProgress() {
                        video.currentTime = (progress.value * video.duration) / 100
                    }

                    progress.addEventListener('change', setProgress)

                    function mute() {
                        if (video.muted) {
                            video.muted = false
                            volumeSvgPath.forEach(function (el) {
                                el.style.fill = '#F4F1EB'
                            });
                            volumeSvgLine.style.stroke = '#F4F1EB'
                        } else {
                            video.muted = true
                            volumeSvgPath.forEach(function (el) {
                                el.style.fill = '#7C7C7C'
                            });
                            volumeSvgLine.style.stroke = '#7C7C7C'
                        }
                    }

                    volume.addEventListener('click', mute)

                    const rangeInputs = document.querySelectorAll('input[type="range"]')

                    function handleInputChange(e) {
                        let target = e.target
                        if (e.target.type !== 'range') {
                            target = document.getElementById('range')
                        }
                        const min = target.min
                        const max = target.max
                        const val = target.value

                        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
                    }

                    rangeInputs.forEach(input => {
                        input.addEventListener('input', handleInputChange)
                    })
                }
            })
        })()
    })();

    /******/
})()
;
//# sourceMappingURL=index.js.map

const preloader = document.querySelector('.preloader')

document.addEventListener('DOMContentLoaded', () => {

    const mediaFiles = document.querySelectorAll('video');
    let i = 0

    mediaFiles.forEach((file) => {
        file.oncanplay = () => {
            i++
            if (i === mediaFiles.length) {
                preloader.classList.add('preloader--hide')
            }
        }
        if(file.readyState===4) {
            preloader.classList.add('preloader--hide')
        }
    })

})
