/*!
 * 
 *   @budajeff/killer-game-logic v1.0.131
 *   https://github.com/budajeff/killer-game-logic
 *
 *   Copyright (c) Jeff Buda (https://github.com/budajeff) and project contributors.
 *
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *
 */
!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.KillerGameLogic=e():n.KillerGameLogic=e()}(self,(function(){return(()=>{"use strict";var n={d:(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o:(n,e)=>Object.prototype.hasOwnProperty.call(n,e),r:n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},e={};n.r(e),n.d(e,{Card:()=>R,CardSequence:()=>o.CardSequence,GameState:()=>E,Play:()=>b,PlayerStatus:()=>u,Rank:()=>t,Suit:()=>r,cardToString:()=>g,createDeck:()=>G,findOfAKinds:()=>M,findRuns:()=>W,getActivePlayers:()=>k,getCurrentPlayer:()=>N,getNextPlayer:()=>H,getPassedPlayers:()=>T,orderBy:()=>C,transitionState:()=>X,transitionStateAuto:()=>_});var r,t,a,u,o={};function i(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function c(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){s(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function s(n,e,r){return e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function f(n,e){var r="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!r){if(Array.isArray(n)||(r=h(n))||e&&n&&"number"==typeof n.length){r&&(n=r);var t=0,a=function(){};return{s:a,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,o=!0,i=!1;return{s:function(){r=r.call(n)},n:function(){var n=r.next();return o=n.done,n},e:function(n){i=!0,u=n},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw u}}}}function l(n){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function d(n){return function(n){if(Array.isArray(n))return y(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||h(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(n,e){if(n){if("string"==typeof n)return y(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(n,e):void 0}}function y(n,e){(null==e||e>n.length)&&(e=n.length);for(var r=0,t=new Array(e);r<e;r++)t[r]=n[r];return t}function p(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function v(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function g(n){return function(n){switch(n){case t.Two:return"2";case t.Ace:return"A";case t.King:return"K";case t.Queen:return"Q";case t.Jack:return"J";case t.Ten:return"10";case t.Nine:return"9";case t.Eight:return"8";case t.Seven:return"7";case t.Six:return"6";case t.Five:return"5";case t.Four:return"4";case t.Three:return"3";default:return"?"}}(n.rank)+function(n){switch(n){case"hearts":return"♥";case"diamonds":return"♦";case"clubs":return"♧";case"spades":return"♠";default:return"?"}}(n.suit)}function m(n){return n.every((function(e){return e.rank===n[0].rank}))?function(n){switch(n){case 1:return a.OneOfAKind;case 2:return a.TwoOfAKind;case 3:return a.ThreeOfAKind;case 4:return a.FourOfAKind;default:return a.Unknown}}(n.length):function(n){var e=W(n).find((function(e){return e.length===n.length}));if(!e)return a.Unknown;switch(e.length){case 3:return a.RunOfThree;case 4:return a.RunOfFour;case 5:return a.RunOfFive;case 6:return a.RunOfSix;case 7:return a.RunOfSeven;case 8:return a.RunOfEight;case 9:return a.RunOfNine;case 10:return a.RunOfTen;case 11:return a.RunOfEleven;case 12:return a.RunOfTwelve;case 13:return a.RunOfThirteen;default:return a.Unknown}}(n)}function O(n){var e=n.reduce((function(n,e,r){return n+(g(e)+(r===n.length-1?"":" "))}),"");return"".concat(e," (").concat(m(n),")")}n.r(o),n.d(o,{Zb:()=>R,D2:()=>E,sh:()=>b,cS:()=>u,yw:()=>t,hE:()=>r,VV:()=>g,tI:()=>G,L:()=>M,AY:()=>W,Pm:()=>k,JC:()=>N,uU:()=>H,eO:()=>T,Xo:()=>C,LG:()=>X,eg:()=>_}),function(n){n.Hearts="hearts",n.Diamonds="diamonds",n.Clubs="clubs",n.Spades="spades"}(r||(r={})),function(n){n[n.Two=13]="Two",n[n.Ace=12]="Ace",n[n.King=11]="King",n[n.Queen=10]="Queen",n[n.Jack=9]="Jack",n[n.Ten=8]="Ten",n[n.Nine=7]="Nine",n[n.Eight=6]="Eight",n[n.Seven=5]="Seven",n[n.Six=4]="Six",n[n.Five=3]="Five",n[n.Four=2]="Four",n[n.Three=1]="Three"}(t||(t={})),function(n){n.Unknown="unknown",n.OneOfAKind="one of a kind",n.TwoOfAKind="two of a kind",n.ThreeOfAKind="three of a kind",n.FourOfAKind="four of a kind",n.RunOfThree="run of three",n.RunOfFour="run of four",n.RunOfFive="run of five",n.RunOfSix="run of six",n.RunOfSeven="run of seven",n.RunOfEight="run of eight",n.RunOfNine="run of nine",n.RunOfTen="run of ten",n.RunOfEleven="run of eleven",n.RunOfTwelve="run of twelve",n.RunOfThirteen="run of thirteen",n.RunOfThreePairs="run of three pairs",n.RunOfFourPairs="run of four pairs",n.RunOfFivePairs="run of five pairs",n.RunOfSixPairs="run of six pairs",n.RunOfThreeTriples="run of three triples",n.RunOfFourTriples="run of four triples"}(a||(a={})),function(n){n.InRound="in",n.PassedRound="passed"}(u||(u={}));var w,b=function n(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;v(this,n),this.playerName=e,this.cards=r},R=function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.Ace,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.Hearts;v(this,n),this.rank=e,this.suit=a};!function(n){n.Human="human",n.AI="ai"}(w||(w={}));var P=function(){function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"player",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w.AI,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:u.InRound,i=arguments.length>5&&void 0!==arguments[5]&&arguments[5];v(this,n),this.name=e,this.kind=r,this.order=t,this.cards=a,this.status=o,this.current=i}var e,r,t;return e=n,(r=[{key:"toString",value:function(){var n;return"Player ".concat(this.name," with ").concat(null==this||null===(n=this.cards)||void 0===n?void 0:n.length," cards remaining")}}])&&p(e.prototype,r),t&&p(e,t),n}();function S(n,e){return n.players.find((function(n){return n.name===e}))}function k(n){return n.players.filter((function(n){return n.status===u.InRound}))}function T(n){return n.players.filter((function(n){return n.status===u.PassedRound}))}function A(n,e){n.players.forEach((function(n){return n.current=!1})),n.players.find((function(n){return n.name===e.name})).current=!0}function N(n){return n.players.find((function(n){return n.current}))}function K(n){return n.players.some((function(n){return 0===n.cards.length}))}var j=function n(e,r){v(this,n),this.playerName=e,this.cards=r},E=function n(e,r,t,a,u){v(this,n),this.players=e,this.roundKind=r,this.discardPile=t,this.message=a,this.error=u};function I(n,e){return n.rank>e.rank?1:n.rank<e.rank?-1:0}function x(n){switch(n){case r.Hearts:return 3;case r.Diamonds:return 2;case r.Clubs:return 1;case r.Spades:return 0}}function F(n,e){return n.order>e.order?1:n.order<e.order?-1:0}function C(n){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return function(r,t){return r[n]>t[n]?e?1:-1:r[n]<t[n]?e?-1:1:0}}function D(n,e){if(m(n)!==m(e))throw new Error("Cannot compare ".concat(m(n)," to ").concat(m(e)));var r=d(n).sort(I).reverse()[0],t=d(e).sort(I).reverse()[0];return r.rank===t.rank?function(n,e){var r=x(n),t=x(e);return r===t?0:r>t?1:-1}(r.suit,t.suit):r.rank>t.rank?1:-1}function U(n,e){if(e.length>4||e.length<2)throw new Error("invalid Player length");!function(n){for(var e,r=n.length;0!==r;){e=Math.floor(Math.random()*r),r--;var t=[n[e],n[r]];n[r]=t[0],n[e]=t[1]}}(n),e.forEach((function(e){return e.cards=n.splice(0,13)}))}function J(n){if(void 0!==n){if("object"!==l(n))throw new Error("Only undefined and object are supported.");return JSON.parse(JSON.stringify(n))}}function q(n){return Object.keys(n).filter((function(n){return Number.isNaN(+n)}))}function G(){var n,e=[],a=f(q(r));try{for(a.s();!(n=a.n()).done;){var u,o=n.value,i=f(q(t));try{for(i.s();!(u=i.n()).done;){var c=u.value;e.push({suit:r[o],rank:t[c]})}}catch(n){i.e(n)}finally{i.f()}}}catch(n){a.e(n)}finally{a.f()}return e}function H(n,e){var r=d(n.players).sort(F),t=r.indexOf(r.find((function(n){return n.name===e})));do{if(t===r.length-1?t=0:t+=1,r[t].status===u.InRound)return r[t]}while(r[t].name!==e)}function M(n){for(var e=d(n).sort(I),r=[],t=[r];e.length>0;){var a=e.shift();0===r.length||r[r.length-1].rank===a.rank?r.push(a):(r=[a],t.push(r))}return t}function W(n){var e=[];return n.forEach((function(r){for(var t=[r],a=d(n),u=r.rank;a.find((function(n){return n.rank===u+1}));){var o=a.find((function(n){return n.rank===u+1})),i=a.indexOf(o);t.push(a.splice(i,1)[0]),u++}t.length>2&&e.push(t)})),e}function L(n){return[].concat(d(W(n)),d(M(n)))}function Q(n,e){switch(e){case a.OneOfAKind:return M(n).filter((function(n){return 1===n.length}));case a.TwoOfAKind:return M(n).filter((function(n){return 2===n.length}));case a.ThreeOfAKind:return M(n).filter((function(n){return 3===n.length}));case a.FourOfAKind:return M(n).filter((function(n){return 4===n.length}));case a.RunOfThree:return W(n).filter((function(n){return 3===n.length}));case a.RunOfFour:return W(n).filter((function(n){return 4===n.length}));case a.RunOfFive:return W(n).filter((function(n){return 5===n.length}));case a.RunOfSix:return W(n).filter((function(n){return 6===n.length}));case a.RunOfSeven:return W(n).filter((function(n){return 7===n.length}));case a.RunOfEight:return W(n).filter((function(n){return 8===n.length}));case a.RunOfNine:return W(n).filter((function(n){return 9===n.length}));case a.RunOfTen:return W(n).filter((function(n){return 10===n.length}));case a.RunOfEleven:return W(n).filter((function(n){return 11===n.length}));case a.RunOfTwelve:return W(n).filter((function(n){return 12===n.length}));case a.RunOfThirteen:return W(n).filter((function(n){return 13===n.length}));default:return[]}}function B(n,e,r){var t=S(n,e);return r.forEach((function(n){var e=t.cards.find((function(e){return e.rank===n.rank&&e.suit===n.suit})),r=t.cards.indexOf(e);if(!(r>-1))throw new Error("Player does not have card ".concat(g(n)));t.cards.splice(r,1)})),r}function V(n){return 0===n.discardPile.length?void 0:n.discardPile[n.discardPile.length-1]}function _(n){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(n){},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(n){return!n.error};!K(n)&&r(n);){var t=N(n);if(0===n.discardPile.length){var a=L(t.cards);a.sort(C("length",!1)),e(n=X(n,new b(t.name,a[0])))}else if(t.name===V(n).playerName){var u=L(t.cards).sort(C("length",!1));e(n=X(n,new b(t.name,u[0])))}else{var o=m(V(n).cards),i=Q(t.cards,o).filter((function(e){return 1===D(e,V(n).cards)}));e(n=0===i.length?X(n,new b(t.name,[])):X(n,new b(t.name,i[0])))}}return n}function X(){var n,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(t=J(t),!r){var o=[new P("A",w.Human,0),new P("B",w.AI,1),new P("C",w.AI,2),new P("D",w.AI,3)],i={players:o,error:"",roundKind:void 0,discardPile:[],message:"New Game! Waiting on ".concat(o[0])};return A(i,i.players[0]),U(G(),i.players),i.players[0].current=!0,i}var s=r.players.filter((function(n){return 0===n.cards.length}));if(s.length>0)return c(c({},J(r)),{},{error:"".concat(s[0].name," won this game.")});if(N(r).name!==t.playerName)return c(c({},J(r)),{},{error:"It is not ".concat(t.playerName,"'s turn. It is ").concat(N(r).name,"'s turn.")});if((null===(n=t)||void 0===n||null===(e=n.cards)||void 0===e?void 0:e.length)>0&&m(t.cards)===a.Unknown)return c(c({},J(r)),{},{message:"",error:"Unknown card sequence: ".concat(O(t.cards))});if(!t.cards||0===t.cards.length){var f=c(c({},J(r)),{},{error:""});return f.players.find((function(n){return n.name===t.playerName})).status=u.PassedRound,A(f,H(f,N(f).name)),f.message="".concat(t.playerName," passes. Waiting on ").concat(N(f).name),1===k(f).length&&(f.roundKind=void 0),f}if(void 0===r.roundKind){var l=c(c({},J(r)),{},{error:"",roundKind:m(t.cards),discardPile:d(r.discardPile)}),h=new j(t.playerName,B(l,t.playerName,t.cards));l.discardPile.push(h);var y=S(l,t.playerName);return 0===y.cards.length?(l.message="".concat(y.name," played ").concat(O(t.cards),", has no cards left, and is the winner. "),l):(l.players.forEach((function(n){return n.status=u.InRound})),A(l,H(l,t.playerName)),l.message="".concat(t.playerName," lead new round with ").concat(O(t.cards),". Waiting on ").concat(N(l).name),l)}if(r.roundKind&&k(r).length>1&&m(t.cards)!==r.roundKind)return c(c({},J(r)),{},{message:"",error:"".concat(t.playerName," cannot play card sequence ").concat(O(t.cards)," because the current round is ").concat(r.roundKind)});if(1===k(r).length){var p=c(c({},J(r)),{},{error:"",roundKind:void 0,discardPile:d(r.discardPile)}),v=new j(t.playerName,B(p,t.playerName,t.cards));return p.discardPile.push(v),p.players.forEach((function(n){return n.status=u.InRound})),p.message="".concat(t.playerName," played ").concat(O(t.cards)," and won the round. Waiting on ").concat(N(p).name," to start new round."),p}if(V(r)&&1===D(V(r).cards,t.cards))return c(c({},J(r)),{},{message:"",error:"Proposed play sequence ".concat(O(t.cards)," is less than the current sequence ").concat(O(V(r).cards))});var g=c(c({},J(r)),{},{error:"",discardPile:d(r.discardPile)}),b=new j(t.playerName,B(g,t.playerName,t.cards));g.discardPile.push(b);var R=S(g,t.playerName);return 0===R.cards.length?g.message="".concat(R.name," played ").concat(O(t.cards),", has no cards left, and is the winner. "):(A(g,H(g,t.playerName)),g.message="".concat(R.name," played ").concat(O(t.cards),". Waiting on ").concat(N(g).name)),g}return e})()}));
//# sourceMappingURL=index.js.map