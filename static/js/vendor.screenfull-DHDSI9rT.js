import{R as e}from"./vendor.more-fbEBWHMD.js";var n,r,l={exports:{}},t=(n||(n=1,r=l,function(){var e="undefined"!=typeof window&&void 0!==window.document?window.document:{},n=r.exports,l=function(){for(var n,r=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],
// New WebKit
["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],
// Old WebKit
["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,t=r.length,s={};l<t;l++)if((n=r[l])&&n[1]in e){for(l=0;l<n.length;l++)s[r[0][l]]=n[l];return s}return!1}(),t={change:l.fullscreenchange,error:l.fullscreenerror},s={request:function(n,r){return new Promise(function(t,s){var c=function(){this.off("change",c),t()}.bind(this);this.on("change",c);var u=(n=n||e.documentElement)[l.requestFullscreen](r);u instanceof Promise&&u.then(c).catch(s)}.bind(this))},exit:function(){return new Promise(function(n,r){if(this.isFullscreen){var t=function(){this.off("change",t),n()}.bind(this);this.on("change",t);var s=e[l.exitFullscreen]();s instanceof Promise&&s.then(t).catch(r)}else n()}.bind(this))},toggle:function(e,n){return this.isFullscreen?this.exit():this.request(e,n)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(n,r){var l=t[n];l&&e.addEventListener(l,r,!1)},off:function(n,r){var l=t[n];l&&e.removeEventListener(l,r,!1)},raw:l};l?(Object.defineProperties(s,{isFullscreen:{get:function(){return Boolean(e[l.fullscreenElement])}},element:{enumerable:!0,get:function(){return e[l.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){
// Coerce to boolean in case of old WebKit
return Boolean(e[l.fullscreenEnabled])}}}),n?r.exports=s:window.screenfull=s):n?r.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}}()),l.exports);
/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/const s=e(t);export{s};
