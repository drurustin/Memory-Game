!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);class n{constructor(){this.cards=[{name:"Bart",imgSrc:"bart.jpg"},{name:"Homer and Marg",imgSrc:"homer_marg.jpg"},{name:"Dr Hibbert",imgSrc:"dr_hibbert.jpg"},{name:"Grandpa Simpson",imgSrc:"grandpa.jpg"},{name:"Hans Moleman",imgSrc:"hans.jpg"},{name:"Moe",imgSrc:"moe.jpg"},{name:"Ned Flanders",imgSrc:"ned.jpg"},{name:"Nelson",imgSrc:"nelson.jpg"}],this.gameScore=0,this.moveCount=0}createNewDeck(){this.cards=a(this.cards),this.cards=o(this.cards)}isHighScore(e,t){let r=!1;return console.log(t.length),t.length<10?r=!0:t.forEach(t=>{e>parseInt(t.score)&&(r=!0)}),r}updateMoveCounter(e){this.moveCount++}}const a=e=>{const t=[];for(let r=0;r<e.length;r++)t.push(e[r]);return e.concat(t)},o=e=>{for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*t),n=e[t];e[t]=e[r],e[r]=n}return e};class s{constructor(e){this.leaders=e.slice(0,4)||[]}updateLeaderBoard(e){this.leaders.push(e),this.leaders.length>1&&this.leaders.sort((function(e,t){return t.score-e.score}))}}const c={gameBoard:document.querySelector(".game-board"),starContainer:document.querySelector("#star-rating"),stars:document.querySelectorAll(".star"),starsDisabled:document.querySelectorAll(".star-disabled"),star:document.querySelector(".star"),modal:document.querySelector(".modal")},d={starDisabled:"star-disabled",star:"star",leaderNameInput:"leaderNameInput",winnerModal:"winner-message-content"},i=e=>{document.getElementById("move-counter").innerText=e},l=(e,t)=>{m(e,t)},u=e=>{const t=document.querySelectorAll(".card");Array.from(t).forEach(t=>{m(t,e)})},m=(e,t)=>{"lock"===t?e.classList.add("card-lock"):"unlock"===t&&e.classList.remove("card-lock")},g=e=>{document.getElementById("time-counter").innerHTML=`${e} seconds`},p=()=>{setTimeout((function(){const e=document.querySelector(`.${d.star}`);e.classList.add(d.starDisabled),e.classList.remove(d.star),console.log("removed")}),3500)},f=e=>{const t=document.querySelector(".modal");t&&"open"===e?t.classList.add("open"):t&&"close"===e&&t.classList.remove("open")};let h={};const b=()=>{(()=>{const e=document.querySelectorAll(".card");e.length>0&&(console.log(e),Array.from(e).forEach(e=>{e.parentNode.removeChild(e)}))})(),h.game=new n,h.game.createNewDeck(),h.game.cards.forEach(e=>{(e=>{document.body.getAttribute("data-root");const t=`\n    <div class='card card-face-down' data-item='${e.name.replace(/\s+/g,"-").toLowerCase()}'>\n    <picture>\n      <source media="(min-width: 650px)" srcset="img/${e.imgSrc}" class="card-img">\n      <source media="(min-width: 465px)" srcset="img/${e.imgSrc}" class="card-img">\n      <img src="img/${e.imgSrc}" alt="Simpsons Character" class="card-img">\n    </picture>  \n    </div>\n  `;c.gameBoard.insertAdjacentHTML("beforeend",t)})(e)})},S=()=>{h={gameStatus:"stopped",score:1e3,flipCount:0,currentSelection:[],correctGuesses:0,matches:[],starRating:3,currentTime:0,leaderBoard:[]},h.timer=setInterval(()=>{"playing"===h.gameStatus?(h.currentTime++,g(h.currentTime),h.score>0&&"playing"===h.gameStatus&&h.score--):"stopped"===h.gameStatus&&g(h.finishTime)},1e3);const e=JSON.parse(localStorage.getItem("leaderBoard"));e&&(h.leaderBoard=e),b(),i(h.game.moveCount),(()=>{const e=document.querySelectorAll(`.${d.starDisabled}`);Array.from(e).forEach(e=>{e.classList.remove(d.starDisabled),e.classList.add(d.star)})})(),f("close"),h.gameStatus="playing"};document.addEventListener("DOMContentLoaded",S),document.addEventListener("click",e=>{var t,r;e.target.matches(".card, .card *")&&!e.target.classList.contains("guessed")&&(h.flipCount+=1,l(e.target,"lock"),h.flipCount%2==0&&(h.game.updateMoveCounter(h.flipCount),i(h.game.moveCount),l("lock")),35===(r=h.game.moveCount)?(h.starRating=0,p()):25===r?(h.starRating=1,p()):15===r&&(h.starRating=2,p()),h.currentSelection.push(e.target.dataset.item),(t=e.target).matches(".card-face-down")?t.classList.replace("card-face-down","card-face-up"):t.matches(".card-face-up")&&t.classList.replace("card-face-up","card-face-down"),h.currentSelection.length>1&&(u("lock"),h.currentSelection[0]===h.currentSelection[1]?(h.correctGuesses+=1,h.currentSelection.forEach(e=>{var t;t=e,setTimeout((function(){const e=document.querySelectorAll(`div[data-item='${t}'`);Array.from(e).forEach(e=>{e.classList.add("correct-guess")})}),1e3)}),8===h.correctGuesses&&(h.gameState="stopped",h.finishTime=h.currentTime,((e,t)=>{let r;r=t>0?`\n    <div id='winner-message-content' class="has-star-rating">\n      <h2>Woohoo, you have won!</h2>\n      <p>You finished in ${e} seconds and have collected ${t} / 3 doughnuts.</p>\n      <button class='btn btn-primary btn-restart'>Play again?</button>\n      <button class='btn-close-modal'>Close</button>\n    </div>\n  `:`\n    <div id='winner-message-content' class="no-star-rating">\n      <h2>Good job, you have guessed all matches!</h2>\n      <p>You finished in ${e} seconds.</p>\n      <button class='btn btn-primary btn-restart'>Play again?</button>\n      <button class='btn-close-modal'>Close</button>\n    </div>\n  `;const n=document.querySelector(".dialog");n&&(n.innerHTML="");const a=document.querySelector(".modal");n.insertAdjacentHTML("afterbegin",r),setTimeout((function(){a.classList.add("open")}),2500)})(h.finishTime,h.starRating),h.game.isHighScore(h.score,h.leaderBoard)&&(e=>{const t=`        \n    <form class='leader-form'>\n      <div class='form-group'>\n        <h3>New high score of ${e}!</h3>\n        <p>Enter your name to be added to the leaderboard</p>\n        <input id='leaderNameInput' class='form-control' /><br>\n        <input type='submit' class='btn btn-reverse' value='Submit'>\n      </div>\n    </form>\n  `;document.querySelector(`#${d.winnerModal}`).insertAdjacentHTML("beforeend",t)})(h.score))):h.currentSelection.forEach(e=>{(e=>{const t=document.querySelectorAll(`div[data-item='${e}'`);Array.from(t).forEach(e=>{e.classList.contains("card-face-up")&&setTimeout((function(){e.classList.add("incorrect-guess"),setTimeout((function(){e.classList.remove("card-face-up"),e.classList.remove("incorrect-guess"),e.classList.add("flip-down"),e.classList.add("card-face-down"),setTimeout((function(){e.classList.remove("flip-down")}),1600)}),1e3)}),1200)})})(e)}),setTimeout((function(){u("unlock")}),3e3),h.currentSelection=[])),e.target.matches(".btn-close-modal")&&(f("close"),clearInterval(h.timer),S())}),document.addEventListener("submit",e=>{if(e.preventDefault(),e.target.matches(".leader-form")){const e=new s(h.leaderBoard),t={name:document.querySelector(`#${d.leaderNameInput}`).value,score:h.score};t.name.length>0?(e.updateLeaderBoard(t),h.leaderBoard=e.leaders,f("close"),f("open"),(e=>{const t=`\n    <h2>Springfield Hall of Fame</h2>\n    <div class="leader-board-container"> \n      <div>        \n        <picture>\n          <source media="(min-width: 650px)" srcset="img/ralph.png">\n          <source media="(min-width: 465px)" srcset="img/ralph.png">\n          <img src="img/ralph.png" alt="Ralph Wiggum" class="ralph-wiggum">\n        </picture> \n      </div>\n      <div>\n        <table id='leader-board-table'>\n          <thead>\n            <tr>\n              <th>Rank</th>\n              <th>Name</th>\n              <th>Score</th>\n            </tr>\n          </thead>\n          <tbody>\n            ${e.map((e,t)=>((e,t)=>`\n  <tr>\n    <td>${t}</td>\n    <td>${e.name}</td>\n    <td>${e.score}</td>\n  </tr>\n`)(e,t+1)).join("")}\n          </tbody>\n        </table>\n        <button class='btn btn-primary btn-restart'>\n          Restart Game\n        </button>\n      </div>\n    </div>\n  `,r=document.querySelector(".dialog");r&&(r.innerHTML=""),document.querySelector(".modal .dialog").insertAdjacentHTML("afterbegin",t)})(h.leaderBoard),localStorage.setItem("leaderBoard",JSON.stringify(h.leaderBoard))):(leaderNameInput.classList.add("invalid-field"),leaderNameInput.insertAdjacentHTML("afterend",'<div class="error-label">Please enter a name.</div>'))}}),window.addEventListener("scroll",(function(e){if(window.pageYOffset>250){const e=document.querySelectorAll(".cloud");Array.from(e).forEach(e=>{e.classList.add("fade-out")})}})),document.querySelector(".page-wrapper").addEventListener("click",e=>{e.target.matches(".btn-restart")&&(clearInterval(h.timer),S())})}]);