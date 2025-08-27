import{g as e}from"./vendor.artplayer-370vFu9C.js";import{y as t,z as n,A as i,B as r,E as a,G as o,H as s,I as l,J as u,K as c,M as p,_ as h,O as f,P as d,Q as g,R as m,T as v,U as y,V as _,W as x,X as w,Y as M,Z as b,$ as S,a0 as I,a1 as D,a2 as C,a3 as T,a4 as k,a5 as O,a6 as L,a7 as A,a8 as N,a9 as R,aa as E,ab as P,ac as B,ad as V,ae as F,af as z,ag as U,ah as G,ai as H,aj as W,ak as Y,al as Z,am as q,an as j,ao as X,ap as K,aq as $,ar as J,as as Q,at as ee,au as te,av as ne,aw as ie,ax as re,ay as ae,az as oe,aA as se,aB as le,aC as ue,aD as ce,aE as pe,aF as he,aG as fe,aH as de,aI as ge,aJ as me,aK as ve,aL as ye,aM as _e,aN as xe,aO as we,aP as Me,aQ as be,aR as Se,aS as Ie,aT as De,aU as Ce,aV as Te,aW as ke,aX as Oe,aY as Le,aZ as Ae,a_ as Ne,a$ as Re,b0 as Ee,b1 as Pe,b2 as Be,b3 as Ve,b4 as Fe,b5 as ze,b6 as Ue}from"./vendor.more-CKMtQPvh.js";var Ge={};
/**
 * Linear mapping a value from domain to range
 * @param  val
 * @param  domain Domain extent domain[0] can be bigger than domain[1]
 * @param  range  Range extent range[0] can be bigger than range[1]
 * @param  clamp Default to be false
 */
function He(e,t,n,i){var r=t[0],a=t[1],o=n[0],s=n[1],l=a-r,u=s-o;if(0===l)return 0===u?o:(o+s)/2;
// Avoid accuracy problem in edge, such as
// 146.39 - 62.83 === 83.55999999999999.
// See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
// It is a little verbose for efficiency considering this method
// is a hotspot.
if(i)if(l>0){if(e<=r)return o;if(e>=a)return s}else{if(e>=r)return o;if(e<=a)return s}else{if(e===r)return o;if(e===a)return s}return(e-r)/l*u+o}
/**
 * Convert a percent string to absolute number.
 * Returns NaN if percent is not a valid string or number
 */function We(e,n){switch(e){case"center":case"middle":e="50%";break;case"left":case"top":e="0%";break;case"right":case"bottom":e="100%"}return t(e)?(i=e,i.replace(/^\s+|\s+$/g,"")).match(/%$/)?parseFloat(e)/100*n:parseFloat(e):null==e?NaN:+e;var i}function Ye(e,t,n){return null==t&&(t=10),
// Avoid range error
t=Math.min(Math.max(0,t),20),
// PENDING: 1.005.toFixed(2) is '1.00' rather than '1.01'
e=(+e).toFixed(t),n?e:+e}
/**
 * Inplacd asc sort arr.
 * The input arr will be modified.
 */
/**
 * Get precision.
 */
function Ze(e){if(e=+e,isNaN(e))return 0;
// It is much faster than methods converting number to string as follows
//      let tmp = val.toString();
//      return tmp.length - 1 - tmp.indexOf('.');
// especially when precision is low
// Notice:
// (1) If the loop count is over about 20, it is slower than `getPrecisionSafe`.
//     (see https://jsbench.me/2vkpcekkvw/1)
// (2) If the val is less than for example 1e-15, the result may be incorrect.
//     (see test/ut/spec/util/number.test.ts `getPrecision_equal_random`)
if(e>1e-14)for(var t=1,n=0;n<15;n++,t*=10)if(Math.round(e*t)/t===e)return n;return qe(e)}
/**
 * Get precision with slow but safe method
 */function qe(e){
// toLowerCase for: '3.4E-12'
var t=e.toString().toLowerCase(),n=t.indexOf("e"),i=n>0?+t.slice(n+1):0,r=n>0?n:t.length,a=t.indexOf(".");
// Consider scientific notation: '3.4e-12' '3.4e+12'
return Math.max(0,(a<0?0:r-1-a)-i)}
/**
 * Minimal dicernible data precisioin according to a single pixel.
 */function je(e,t){var n=Math.log,i=Math.LN10,r=Math.floor(n(e[1]-e[0])/i),a=Math.round(n(Math.abs(t[1]-t[0]))/i),o=Math.min(Math.max(-r+a,0),20);return isFinite(o)?o:20}
/**
 * Get a data of given precision, assuring the sum of percentages
 * in valueList is 1.
 * The largest remainder method is used.
 * https://en.wikipedia.org/wiki/Largest_remainder_method
 *
 * @param valueList a list of all data
 * @param idx index of the data to be processed in valueList
 * @param precision integer number showing digits of precision
 * @return percent ranging from 0 to 100
 */
/**
 * Solve the floating point adding problem like 0.1 + 0.2 === 0.30000000000000004
 * See <http://0.30000000000000004.com/>
 */
function Xe(e,t){var n=Math.max(Ze(e),Ze(t)),i=e+t;
// const multiplier = Math.pow(10, maxPrecision);
// return (Math.round(val0 * multiplier) + Math.round(val1 * multiplier)) / multiplier;
// // PENDING: support more?
return n>20?i:Ye(i,n)}
// Number.MAX_SAFE_INTEGER, ie do not support.
// eslint-disable-next-line
var Ke=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;// jshint ignore:line
/**
 * @param value valid type: number | string | Date, otherwise return `new Date(NaN)`
 *   These values can be accepted:
 *   + An instance of Date, represent a time in its own time zone.
 *   + Or string in a subset of ISO 8601, only including:
 *     + only year, month, date: '2012-03', '2012-03-01', '2012-03-01 05', '2012-03-01 05:06',
 *     + separated with T or space: '2012-03-01T12:22:33.123', '2012-03-01 12:22:33.123',
 *     + time zone: '2012-03-01T12:22:33Z', '2012-03-01T12:22:33+8000', '2012-03-01T12:22:33-05:00',
 *     all of which will be treated as local time if time zone is not specified
 *     (see <https://momentjs.com/>).
 *   + Or other string format, including (all of which will be treated as local time):
 *     '2012', '2012-3-1', '2012/3/1', '2012/03/01',
 *     '2009/6/12 2:00', '2009/6/12 2:05:08', '2009/6/12 2:05:08.123'
 *   + a timestamp, which represent a time in UTC.
 * @return date Never be null/undefined. If invalid, return `new Date(NaN)`.
 */function $e(e){if(e instanceof Date)return e;if(t(e)){
// Different browsers parse date in different way, so we parse it manually.
// Some other issues:
// new Date('1970-01-01') is UTC,
// new Date('1970/01/01') and new Date('1970-1-01') is local.
// See issue #3623
var n=Ke.exec(e);if(!n)
// return Invalid Date.
return new Date(NaN);
// Use local time when no timezone offset is specified.
if(n[8]){var i=+n[4]||0;return"Z"!==n[8].toUpperCase()&&(i-=+n[8].slice(0,3)),new Date(Date.UTC(+n[1],+(n[2]||1)-1,+n[3]||1,i,+(n[5]||0),+n[6]||0,n[7]?+n[7].substring(0,3):0))}
// match[n] can only be string or undefined.
// But take care of '12' + 1 => '121'.
return new Date(+n[1],+(n[2]||1)-1,+n[3]||1,+n[4]||0,+(n[5]||0),+n[6]||0,n[7]?+n[7].substring(0,3):0)}return null==e?new Date(NaN):new Date(Math.round(e))}
/**
 * Quantity of a number. e.g. 0.1, 1, 10, 100
 *
 * @param val
 * @return
 */function Je(e){return Math.pow(10,Qe(e))}
/**
 * Exponent of the quantity of a number
 * e.g., 1234 equals to 1.234*10^3, so quantityExponent(1234) is 3
 *
 * @param val non-negative value
 * @return
 */function Qe(e){if(0===e)return 0;var t=Math.floor(Math.log(e)/Math.LN10);
/**
   * exp is expected to be the rounded-down result of the base-10 log of val.
   * But due to the precision loss with Math.log(val), we need to restore it
   * using 10^exp to make sure we can get val back from exp. #11249
   */return e/Math.pow(10,t)>=10&&t++,t}
/**
 * find a “nice” number approximately equal to x. Round the number if round = true,
 * take ceiling if round = false. The primary observation is that the “nicest”
 * numbers in decimal are 1, 2, and 5, and all power-of-ten multiples of these numbers.
 *
 * See "Nice Numbers for Graph Labels" of Graphic Gems.
 *
 * @param  val Non-negative value.
 * @param  round
 * @return Niced number
 */function et(e,t){var n=Qe(e),i=Math.pow(10,n),r=e/i;
// Fix 3 * 0.1 === 0.30000000000000004 issue (see IEEE 754).
// 20 is the uppper bound of toFixed.
return e=(t?r<1.5?1:r<2.5?2:r<4?3:r<7?5:10:r<1?1:r<2?2:r<3?3:r<5?5:10)*i,n>=-20?+e.toFixed(n<0?-n:0):e}
/**
 * This code was copied from "d3.js"
 * <https://github.com/d3/d3/blob/9cc9a875e636a1dcf36cc1e07bdf77e1ad6e2c74/src/arrays/quantile.js>.
 * See the license statement at the head of this file.
 * @param ascArr
 */
/**
 * [Numeric is defined as]:
 *     `parseFloat(val) == val`
 * For example:
 * numeric:
 *     typeof number except NaN, '-123', '123', '2e3', '-2e3', '011', 'Infinity', Infinity,
 *     and they rounded by white-spaces or line-terminal like ' -123 \n ' (see es spec)
 * not-numeric:
 *     null, undefined, [], {}, true, false, 'NaN', NaN, '123ab',
 *     empty string, string with only white-spaces or line-terminal (see es spec),
 *     0x12, '0x12', '-0x12', 012, '012', '-012',
 *     non-string, ...
 *
 * @test See full test cases in `test/ut/spec/util/number.js`.
 * @return Must be a typeof number. If not numeric, return NaN.
 */
function tt(e){var n=parseFloat(e);return n==e&&(0!==n||!t(e)||e.indexOf("x")<=0)?n:NaN}
/**
 * Definition of "numeric": see `numericToNumber`.
 */function nt(e){return!isNaN(tt(e))}
/**
 * Use random base to prevent users hard code depending on
 * this auto generated marker id.
 * @return An positive integer.
 */
/**
 * Get the greatest common divisor.
 *
 * @param {number} a one number
 * @param {number} b the other number
 */
function it(e,t){return 0===t?e:it(t,e%t)}
/**
 * Get the least common multiple.
 *
 * @param {number} a one number
 * @param {number} b the other number
 */function rt(e,t){return null==e?t:null==t?e:e*t/it(e,t)}function at(e){throw new Error(e)}function ot(e,t,n){return(t-e)*n+e}var st="series\0";function lt(e){return e instanceof Array?e:null==e?[]:[e]}function ut(e,t,n){if(e){e[t]=e[t]||{},e.emphasis=e.emphasis||{},e.emphasis[t]=e.emphasis[t]||{};for(var i=0,r=n.length;i<r;i++){var a=n[i];!e.emphasis[t].hasOwnProperty(a)&&e[t].hasOwnProperty(a)&&(e.emphasis[t][a]=e[t][a])}}}var ct=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"];function pt(e){return!o(e)||a(e)||e instanceof Date?e:e.value}function ht(e){return o(e)&&!(e instanceof Array)}function ft(e,t,n){var i=gt(t[e],null),r=gt(n[e],null);return null!=i&&null!=r&&i===r}function dt(e){return gt(e,"")}function gt(e,n){return null==e?n:t(e)?e:s(e)||l(e)?e+"":n}function mt(e){var t=e.name;return!(!t||!t.indexOf(st))}function vt(e){return e&&null!=e.id&&0===dt(e.id).indexOf("\0_ec_\0")}function yt(e,t){return null!=t.dataIndexInside?t.dataIndexInside:null!=t.dataIndex?a(t.dataIndex)?i(t.dataIndex,function(t){return e.indexOfRawIndex(t)}):e.indexOfRawIndex(t.dataIndex):null!=t.name?a(t.name)?i(t.name,function(t){return e.indexOfName(t)}):e.indexOfName(t.name):void 0}function _t(){var e="__ec_inner_"+xt++;return function(t){return t[e]||(t[e]={})}}var xt=Math.round(9*Math.random());function wt(e,t,n){var i=Mt(t,n),r=i.queryOptionMap,a=i.others,o=n?n.defaultMainType:null;return!i.mainTypeSpecified&&o&&r.set(o,{}),r.each(function(t,i){var r=St(e,i,t,{useDefault:o===i,enableAll:!n||null==n.enableAll||n.enableAll,enableNone:!n||null==n.enableNone||n.enableNone});a[i+"Models"]=r.models,a[i+"Model"]=r.models[0]}),a}function Mt(e,n){var i;if(t(e)){var r={};r[e+"Index"]=0,i=r}else i=e;var a=u(),o={},s=!1;return c(i,function(e,t){if("dataIndex"!==t&&"dataIndexInside"!==t){var i=t.match(/^(\w+)(Index|Id|Name)$/)||[],r=i[1],l=(i[2]||"").toLowerCase();!r||!l||n&&n.includeMainTypes&&p(n.includeMainTypes,r)<0||(s=s||!!r,(a.get(r)||a.set(r,{}))[l]=e)}else o[t]=e}),{mainTypeSpecified:s,queryOptionMap:a,others:o}}var bt={useDefault:!0,enableAll:!1,enableNone:!1};function St(e,t,n,i){i=i||bt;var a=n.index,o=n.id,s=n.name,l={models:null,specified:null!=a||null!=o||null!=s};if(!l.specified){var u=void 0;return l.models=i.useDefault&&(u=e.getComponent(t))?[u]:[],l}return"none"===a||!1===a?(r(i.enableNone,'`"none"` or `false` is not a valid value on index option.'),l.models=[],l):("all"===a&&(r(i.enableAll,'`"all"` is not a valid value on index option.'),a=o=s=null),l.models=e.queryComponents({mainType:t,index:a,id:o,name:s}),l)}function It(e,t,n){e.setAttribute?e.setAttribute(t,n):e[t]=n}var Dt="___EC__COMPONENT__CONTAINER___",Ct="___EC__EXTENDED_CLASS___";function Tt(e){var t={main:"",sub:""};if(e){var n=e.split(".");t.main=n[0]||"",t.sub=n[1]||""}return t}function kt(e){e.$constructor=e,e.extend=function(e){var t,n,i=this;return g(n=i)&&/^class\s/.test(Function.prototype.toString.call(n))?t=/** @class */
function(e){function t(){return e.apply(this,arguments)||this}return h(t,e),t}(i):(t=function(){(e.$constructor||i).apply(this,arguments)},f(t,this)),d(t.prototype,e),t[Ct]=!0,t.extend=this.extend,t.superCall=At,t.superApply=Nt,t.superClass=i,t}}function Ot(e,t){e.extend=t.extend}var Lt=Math.round(10*Math.random());function At(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return this.superClass.prototype[t].apply(e,n)}function Nt(e,t,n){return this.superClass.prototype[t].apply(e,n)}function Rt(e){var t={};e.registerClass=function(e){var n,i=e.type||e.prototype.type;if(i){r(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(n=i),'componentType "'+n+'" illegal'),e.prototype.type=i;var a=Tt(i);if(a.sub){if(a.sub!==Dt){var o=function(e){var n=t[e.main];return n&&n[Dt]||((n=t[e.main]={})[Dt]=!0),n}(a);o[a.sub]=e}}else t[a.main]=e}return e},e.getClass=function(e,n,i){var r=t[e];if(r&&r[Dt]&&(r=n?r[n]:null),i&&!r)throw new Error(n?"Component "+e+"."+(n||"")+" is used but not imported.":e+".type should be specified.");return r},e.getClassesByMainType=function(e){var n=Tt(e),i=[],r=t[n.main];return r&&r[Dt]?c(r,function(e,t){t!==Dt&&i.push(e)}):i.push(r),i},e.hasClass=function(e){var n=Tt(e);return!!t[n.main]},e.getAllClassMainTypes=function(){var e=[];return c(t,function(t,n){e.push(n)}),e},e.hasSubTypes=function(e){var n=Tt(e),i=t[n.main];return i&&i[Dt]}}function Et(e,t){
// Normalize
for(var n=0;n<e.length;n++)e[n][1]||(e[n][1]=e[n][0]);return t=t||!1,function(n,i,r){for(var a={},o=0;o<e.length;o++){var s=e[o][1];if(!(i&&p(i,s)>=0||r&&p(r,s)<0)){var l=n.getShallow(s,t);null!=l&&(a[e[o][0]]=l)}}
// TODO Text or image?
return a}}var Pt=Et([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),Bt=/** @class */function(){function e(){}return e.prototype.getAreaStyle=function(e,t){return Pt(this,e,t)},e}(),Vt=_t(),Ft=1,zt={},Ut=_t(),Gt=_t(),Ht=["emphasis","blur","select"],Wt=["normal","emphasis","blur","select"],Yt="highlight",Zt="downplay",qt="select",jt="unselect",Xt="toggleSelect";function Kt(e){return null!=e&&"none"!==e}function $t(e,t,n){e.onHoverStateChange&&(e.hoverState||0)!==n&&e.onHoverStateChange(t),e.hoverState=n}function Jt(e){$t(e,"emphasis",2)}function Qt(e){2===e.hoverState&&$t(e,"normal",0)}function en(e){$t(e,"blur",1)}function tn(e){1===e.hoverState&&$t(e,"normal",0)}function nn(e){e.selected=!0}function rn(e){e.selected=!1}function an(e,t,n){t(e,n)}function on(e,t,n){an(e,t,n),e.isGroup&&e.traverse(function(e){an(e,t,n)})}function sn(e,t){var n=this.states[e];if(this.style){if("emphasis"===e)return function(e,t,n,i){var r=n&&p(n,"select")>=0,a=!1;if(e instanceof m){var o=Ut(e),s=r&&o.selectFill||o.normalFill,l=r&&o.selectStroke||o.normalStroke;if(Kt(s)||Kt(l)){var u=(i=i||{}).style||{};"inherit"===u.fill?(a=!0,i=d({},i),(u=d({},u)).fill=s):!Kt(u.fill)&&Kt(s)?(a=!0,i=d({},i),(u=d({},u)).fill=v(s)):!Kt(u.stroke)&&Kt(l)&&(a||(i=d({},i),u=d({},u)),u.stroke=v(l)),i.style=u}}if(i&&null==i.z2){a||(i=d({},i));var c=e.z2EmphasisLift;i.z2=e.z2+(null!=c?c:10)}return i}(this,0,t,n);if("blur"===e)return function(e,t,n){var i=p(e.currentStates,t)>=0,r=e.style.opacity,a=i?null:function(e,t,n,i){for(var r=e.style,a={},o=0;o<t.length;o++){var s=t[o],l=r[s];a[s]=null==l?i&&i[s]:l}for(o=0;o<e.animators.length;o++){var u=e.animators[o];u.__fromStateTransition&&u.__fromStateTransition.indexOf(n)<0&&"style"===u.targetName&&u.saveTo(a,t)}return a}(e,["opacity"],t,{opacity:1}),o=(n=n||{}).style||{};return null==o.opacity&&(n=d({},n),o=d({
// Already being applied 'emphasis'. DON'T mul opacity multiple times.
opacity:i?r:.1*a.opacity},o),n.style=o),n}(this,e,n);if("select"===e)return function(e,t,n){if(n&&null==n.z2){n=d({},n);var i=e.z2SelectLift;n.z2=e.z2+(null!=i?i:9)}return n}(this,0,n)}return n}function ln(e){e.stateProxy=sn;var t=e.getTextContent(),n=e.getTextGuideLine();t&&(t.stateProxy=sn),n&&(n.stateProxy=sn)}function un(e,t){!mn(e,t)&&!e.__highByOuter&&on(e,Jt)}function cn(e,t){!mn(e,t)&&!e.__highByOuter&&on(e,Qt)}function pn(e,t){e.__highByOuter|=1<<(t||0),on(e,Jt)}function hn(e,t){!(e.__highByOuter&=~(1<<(t||0)))&&on(e,Qt)}function fn(e){on(e,tn)}function dn(e){on(e,nn)}function gn(e){on(e,rn)}function mn(e,t){return e.__highDownSilentOnTouch&&t.zrByTouch}function vn(e){var t=e.getModel(),n=[],i=[];t.eachComponent(function(t,r){var a=Gt(r),o="series"===t,s=o?e.getViewOfSeriesModel(r):e.getViewOfComponentModel(r);!o&&i.push(s),a.isBlured&&(s.group.traverse(function(e){tn(e)}),o&&n.push(r)),a.isBlured=!1}),c(i,function(e){e&&e.toggleBlurSeries&&e.toggleBlurSeries(n,!1,t)})}function yn(e,t,n,i){var r=i.getModel();function a(e,t){for(var n=0;n<t.length;n++){var i=e.getItemGraphicEl(t[n]);i&&fn(i)}}if(n=n||"coordinateSystem",null!=e&&t&&"none"!==t){var s=r.getSeriesByIndex(e),l=s.coordinateSystem;l&&l.master&&(l=l.master);var u=[];r.eachSeries(function(e){var r=s===e,c=e.coordinateSystem;if(c&&c.master&&(c=c.master),!(// Not blur other series if blurScope series
"series"===n&&!r||"coordinateSystem"===n&&!(c&&l?c===l:r)||"series"===t&&r)){if(i.getViewOfSeriesModel(e).group.traverse(function(e){e.__highByOuter&&r&&"self"===t||en(e)}),y(t))a(e.getData(),t);else if(o(t))for(var p=_(t),h=0;h<p.length;h++)a(e.getData(p[h]),t[p[h]]);u.push(e),Gt(e).isBlured=!0}}),r.eachComponent(function(e,t){if("series"!==e){var n=i.getViewOfComponentModel(t);n&&n.toggleBlurSeries&&n.toggleBlurSeries(u,!0,r)}})}}function _n(e,t,n){if(null!=e&&null!=t){var i=n.getModel().getComponent(e,t);if(i){Gt(i).isBlured=!0;var r=n.getViewOfComponentModel(i);r&&r.focusBlurEnabled&&r.group.traverse(function(e){en(e)})}}}function xn(e,t,n,i){var r={focusSelf:!1,dispatchers:null};if(null==e||"series"===e||null==t||null==n)return r;var a=i.getModel().getComponent(e,t);if(!a)return r;var o=i.getViewOfComponentModel(a);if(!o||!o.findHighDownDispatchers)return r;for(var s,l=o.findHighDownDispatchers(n),u=0;u<l.length;u++)if("self"===Vt(l[u]).focus){s=!0;break}return{focusSelf:s,dispatchers:l}}function wn(e){var t=e.getAllData();c(t,function(t){var n=t.type;t.data.eachItemGraphicEl(function(t,i){e.isSelected(i,n)?dn(t):gn(t)})})}function Mn(e){var t=[];return e.eachSeries(function(e){var n=e.getAllData();c(n,function(n){var i=n.type,r=e.getSelectedDataIndices();if(r.length>0){var a={dataIndex:r,seriesIndex:e.seriesIndex};null!=i&&(a.dataType=i),t.push(a)}})}),t}function bn(e){return!(!e||!e.__highDownDispatcher)}function Sn(e){var t=e.type;return t===qt||t===jt||t===Xt}function In(e){var t=e.type;return t===Yt||t===Zt}function Dn(e,t,n,i,r,a,s){var l,u=!1;g(r)?(s=a,a=r,r=null):o(r)&&(a=r.cb,s=r.during,u=r.isFrom,l=r.removeOpt,r=r.dataIndex);var c="leave"===e;c||t.stopAnimation("leave");var p=function(e,t,n,i,r){var a;if(t&&t.ecModel){var o=t.ecModel.getUpdatePayload();a=o&&o.animation}var s="update"===e;if(t&&t.isAnimationEnabled()){var l=void 0,u=void 0,c=void 0;return i?(l=x(i.duration,200),u=x(i.easing,"cubicOut"),c=0):(l=t.getShallow(s?"animationDurationUpdate":"animationDuration"),u=t.getShallow(s?"animationEasingUpdate":"animationEasing"),c=t.getShallow(s?"animationDelayUpdate":"animationDelay")),a&&(null!=a.duration&&(l=a.duration),null!=a.easing&&(u=a.easing),null!=a.delay&&(c=a.delay)),g(c)&&(c=c(n,r)),g(l)&&(l=l(n)),{duration:l||0,delay:c,easing:u}}return null}(e,i,r,c?l||{}:null,i&&i.getAnimationDelayParams?i.getAnimationDelayParams(t,r):null);if(p&&p.duration>0){var h={duration:p.duration,delay:p.delay||0,easing:p.easing,done:a,force:!!a||!!s,
// Set to final state in update/init animation.
// So the post processing based on the path shape can be done correctly.
setToFinal:!c,scope:e,during:s};u?t.animateFrom(n,h):t.animateTo(n,h)}else t.stopAnimation(),!u&&t.attr(n),s&&s(1),a&&a()}function Cn(e,t,n,i,r,a){Dn("update",e,t,n,i,r,a)}function Tn(e,t,n,i,r,a){Dn("enter",e,t,n,i,r,a)}function kn(e){if(!e.__zr)return!0;for(var t=0;t<e.animators.length;t++)if("leave"===e.animators[t].scope)return!0;return!1}_t();var On=Math.max,Ln=Math.min,An={},Nn=M;
/**
 * Register a user defined shape.
 * The shape class can be fetched by `getShapeClass`
 * This method will overwrite the registered shapes, including
 * the registered built-in shapes, if using the same `name`.
 * The shape can be used in `custom series` and
 * `graphic component` by declaring `{type: name}`.
 *
 * @param name
 * @param ShapeClass Can be generated by `extendShape`.
 */
function Rn(e,t){An[e]=t}
/**
 * Find shape class registered by `registerShape`. Usually used in
 * fetching user defined shape.
 *
 * [Caution]:
 * (1) This method **MUST NOT be used inside echarts !!!**, unless it is prepared
 * to use user registered shapes.
 * Because the built-in shape (see `getBuiltInShape`) will be registered by
 * `registerShape` by default. That enables users to get both built-in
 * shapes as well as the shapes belonging to themsleves. But users can overwrite
 * the built-in shapes by using names like 'circle', 'rect' via calling
 * `registerShape`. So the echarts inner featrues should not fetch shapes from here
 * in case that it is overwritten by users, except that some features, like
 * `custom series`, `graphic component`, do it deliberately.
 *
 * (2) In the features like `custom series`, `graphic component`, the user input
 * `{tpye: 'xxx'}` does not only specify shapes but also specify other graphic
 * elements like `'group'`, `'text'`, `'image'` or event `'path'`. Those names
 * are reserved names, that is, if some user registers a shape named `'image'`,
 * the shape will not be used. If we intending to add some more reserved names
 * in feature, that might bring break changes (disable some existing user shape
 * names). But that case probably rarely happens. So we don't make more mechanism
 * to resolve this issue here.
 *
 * @param name
 * @return The shape class. If not found, return nothing.
 */
/**
 * Create a path element from path data string
 * @param pathData
 * @param opts
 * @param rect
 * @param layout 'center' or 'cover' default to be cover
 */
function En(e,t,n,i){var r=b(e,t);return n&&("center"===i&&(n=Bn(n,r.getBoundingRect())),Fn(r,n)),r}
/**
 * Create a image element from image url
 * @param imageUrl image url
 * @param opts options
 * @param rect constrain rect
 * @param layout 'center' or 'cover'. Default to be 'cover'
 */function Pn(e,t,n){var i=new S({style:{image:e,x:t.x,y:t.y,width:t.width,height:t.height},onload:function(e){"center"===n&&i.setStyle(Bn(t,{width:e.width,height:e.height}))}});return i}
/**
 * Get position of centered element in bounding box.
 *
 * @param  rect         element local bounding box
 * @param  boundingRect constraint bounding box
 * @return element position containing x, y, width, and height
 */function Bn(e,t){
// Set rect to center, keep width / height ratio.
var n,i=t.width/t.height,r=e.height*i;return n=r<=e.width?e.height:(r=e.width)/i,{x:e.x+e.width/2-r/2,y:e.y+e.height/2-n/2,width:r,height:n}}var Vn=w;
/**
 * Resize a path to fit the rect
 * @param path
 * @param rect
 */function Fn(e,t){if(e.applyTransform){var n=e.getBoundingRect().calculateTransform(t);e.applyTransform(n)}}
/**
 * Get transform matrix of target (param target),
 * in coordinate of its ancestor (param ancestor)
 *
 * @param target
 * @param [ancestor]
 */function zn(e,t){var n;
// TODO
// Polyfill for fixing zrender group traverse don't visit it's root issue.
e.isGroup&&(n=t(e)),n||e.traverse(t)}
// Register built-in shapes. These shapes might be overwritten
// by users, although we do not recommend that.
Rn("circle",T),Rn("ellipse",k),Rn("sector",O),Rn("ring",L),Rn("polygon",A),Rn("polyline",N),Rn("rect",R),Rn("line",E),Rn("bezierCurve",P),Rn("arc",B);var Un={},Gn=["fontStyle","fontWeight","fontSize","fontFamily","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY"],Hn=["align","lineHeight","width","height","tag","verticalAlign","ellipsis"],Wn=["padding","borderWidth","borderRadius","borderDashOffset","backgroundColor","borderColor","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"];function Yn(e,t,n,i,r,a,o,s){n=!r&&n||Un;var l=i&&i.inheritColor,u=t.getShallow("color"),c=t.getShallow("textBorderColor"),p=x(t.getShallow("opacity"),n.opacity);"inherit"!==u&&"auto"!==u||(u=l||null),"inherit"!==c&&"auto"!==c||(c=l||null),c=c||n.textBorderColor,null!=(u=u||n.color)&&(e.fill=u),null!=c&&(e.stroke=c);var h=x(t.getShallow("textBorderWidth"),n.textBorderWidth);null!=h&&(e.lineWidth=h);var f=x(t.getShallow("textBorderType"),n.textBorderType);null!=f&&(e.lineDash=f);var d=x(t.getShallow("textBorderDashOffset"),n.textBorderDashOffset);null!=d&&(e.lineDashOffset=d),r||null!=p||s||(p=i&&i.defaultOpacity),null!=p&&(e.opacity=p),r||null==e.fill&&i.inheritColor&&(e.fill=i.inheritColor);for(var g=0;g<Gn.length;g++)null!=(y=x(t.getShallow(v=Gn[g]),n[v]))&&(e[v]=y);for(g=0;g<Hn.length;g++)null!=(y=t.getShallow(v=Hn[g]))&&(e[v]=y);if(null==e.verticalAlign){var m=t.getShallow("baseline");null!=m&&(e.verticalAlign=m)}if(!o||!i.disableBox){for(g=0;g<Wn.length;g++){var v,y;null!=(y=t.getShallow(v=Wn[g]))&&(e[v]=y)}var _=t.getShallow("borderType");null!=_&&(e.borderDash=_),"auto"!==e.backgroundColor&&"inherit"!==e.backgroundColor||!l||(e.backgroundColor=l),"auto"!==e.borderColor&&"inherit"!==e.borderColor||!l||(e.borderColor=l)}}var Zn,qn,jn=_t(),Xn=["textStyle","color"],Kn=["fontStyle","fontWeight","fontSize","fontFamily","padding","lineHeight","rich","width","height","overflow"],$n=new F,Jn=/** @class */function(){function e(){}
/**
   * Get color property or get color from option.textStyle.color
   */
// TODO Callback
return e.prototype.getTextColor=function(e){var t=this.ecModel;return this.getShallow("color")||(!e&&t?t.get(Xn):null)},
/**
   * Create font string from fontStyle, fontWeight, fontSize, fontFamily
   * @return {string}
   */
e.prototype.getFont=function(){return e={fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},n=(t=this.ecModel)&&t.getModel("textStyle"),V([
// FIXME in node-canvas fontWeight is before fontStyle
e.fontStyle||n&&n.getShallow("fontStyle")||"",e.fontWeight||n&&n.getShallow("fontWeight")||"",(e.fontSize||n&&n.getShallow("fontSize")||12)+"px",e.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" "));var e,t,n},e.prototype.getTextRect=function(e){for(var t={text:e,verticalAlign:this.getShallow("verticalAlign")||this.getShallow("baseline")},n=0;n<Kn.length;n++)t[Kn[n]]=this.getShallow(Kn[n]);return $n.useStyle(t),$n.update(),$n.getBoundingRect()},e}(),Qn=[["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["lineDash","type"],["lineDashOffset","dashOffset"],["lineCap","cap"],["lineJoin","join"],["miterLimit"]],ei=Et(Qn),ti=/** @class */function(){function e(){}return e.prototype.getLineStyle=function(e){return ei(this,e)},e}(),ni=[["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["lineDash","borderType"],["lineDashOffset","borderDashOffset"],["lineCap","borderCap"],["lineJoin","borderJoin"],["miterLimit","borderMiterLimit"]],ii=Et(ni),ri=/** @class */function(){function e(){}return e.prototype.getItemStyle=function(e,t){return ii(this,e,t)},e}(),ai=/** @class */function(){function e(e,t,n){this.parentModel=t,this.ecModel=n,this.option=e}return e.prototype.init=function(){},
/**
   * Merge the input option to me.
   */
e.prototype.mergeOption=function(e){z(this.option,e,!0)},
// `path` can be 'a.b.c', so the return value type have to be `ModelOption`
// TODO: TYPE strict key check?
// get(path: string | string[], ignoreParent?: boolean): ModelOption;
e.prototype.get=function(e,t){return null==e?this.option:this._doGet(this.parsePath(e),!t&&this.parentModel)},e.prototype.getShallow=function(e,t){var n=this.option,i=null==n?n:n[e];if(null==i&&!t){var r=this.parentModel;r&&(
// FIXME:TS do not know how to make it works
i=r.getShallow(e))}return i},
// `path` can be 'a.b.c', so the return value type have to be `Model<ModelOption>`
// getModel(path: string | string[], parentModel?: Model): Model;
// TODO 'a.b.c' is deprecated
e.prototype.getModel=function(t,n){var i=null!=t,r=i?this.parsePath(t):null;return new e(i?this._doGet(r):this.option,n=n||this.parentModel&&this.parentModel.getModel(this.resolveParentPath(r)),this.ecModel)},
/**
   * If model has option
   */
e.prototype.isEmpty=function(){return null==this.option},e.prototype.restoreData=function(){},
// Pending
e.prototype.clone=function(){return new(0,this.constructor)(U(this.option))},
// setReadOnly(properties): void {
// clazzUtil.setReadOnly(this, properties);
// }
// If path is null/undefined, return null/undefined.
e.prototype.parsePath=function(e){return"string"==typeof e?e.split("."):e},
// Resolve path for parent. Perhaps useful when parent use a different property.
// Default to be a identity resolver.
// Can be modified to a different resolver.
e.prototype.resolveParentPath=function(e){return e},
// FIXME:TS check whether put this method here
e.prototype.isAnimationEnabled=function(){if(!G.node&&this.option){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled()}},e.prototype._doGet=function(e,t){var n=this.option;if(!e)return n;for(var i=0;i<e.length&&(!e[i]||null!=(
// obj could be number/string/... (like 0)
n=n&&"object"==typeof n?n[e[i]]:null));i++);return null==n&&t&&(n=t._doGet(this.resolveParentPath(e),t.parentModel)),n},e}();
// Enable Model.extend.
kt(ai),Zn=ai,qn=["__\0is_clz",Lt++].join("_"),Zn.prototype[qn]=!0,Zn.isInstance=function(e){return!(!e||!e[qn])},H(ai,ti),H(ai,ri),H(ai,Bt),H(ai,Jn);var oi=Math.round(10*Math.random());function si(e){return[e||"",oi++].join("_")}var li="ZH",ui="EN",ci=ui,pi={},hi={},fi=G.domSupported&&/* eslint-disable-next-line */(document.documentElement.lang||navigator.language||navigator.browserLanguage||ci).toUpperCase().indexOf(li)>-1?li:ci;function di(e,t){e=e.toUpperCase(),hi[e]=new ai(t),pi[e]=t}
// export function getLocale(locale: string) {
//     return localeStorage[locale];
// }
// Default locale
di(ui,{time:{month:["January","February","March","April","May","June","July","August","September","October","November","December"],monthAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayOfWeekAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},legend:{selector:{all:"All",inverse:"Inv"}},toolbox:{brush:{title:{rect:"Box Select",polygon:"Lasso Select",lineX:"Horizontally Select",lineY:"Vertically Select",keep:"Keep Selections",clear:"Clear Selections"}},dataView:{title:"Data View",lang:["Data View","Close","Refresh"]},dataZoom:{title:{zoom:"Zoom",back:"Zoom Reset"}},magicType:{title:{line:"Switch to Line Chart",bar:"Switch to Bar Chart",stack:"Stack",tiled:"Tile"}},restore:{title:"Restore"},saveAsImage:{title:"Save as Image",lang:["Right Click to Save Image"]}},series:{typeNames:{pie:"Pie chart",bar:"Bar chart",line:"Line chart",scatter:"Scatter plot",effectScatter:"Ripple scatter plot",radar:"Radar chart",tree:"Tree",treemap:"Treemap",boxplot:"Boxplot",candlestick:"Candlestick",k:"K line chart",heatmap:"Heat map",map:"Map",parallel:"Parallel coordinate map",lines:"Line graph",graph:"Relationship graph",sankey:"Sankey diagram",funnel:"Funnel chart",gauge:"Gauge",pictorialBar:"Pictorial bar",themeRiver:"Theme River Map",sunburst:"Sunburst",custom:"Custom chart",chart:"Chart"}},aria:{general:{withTitle:'This is a chart about "{title}"',withoutTitle:"This is a chart"},series:{single:{prefix:"",withName:" with type {seriesType} named {seriesName}.",withoutName:" with type {seriesType}."},multiple:{prefix:". It consists of {seriesCount} series count.",withName:" The {seriesId} series is a {seriesType} representing {seriesName}.",withoutName:" The {seriesId} series is a {seriesType}.",separator:{middle:"",end:""}}},data:{allData:"The data is as follows: ",partialData:"The first {displayCnt} items are: ",withName:"the data for {name} is {value}",withoutName:"{value}",separator:{middle:", ",end:". "}}}}),di(li,{time:{month:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthAbbr:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],dayOfWeekAbbr:["日","一","二","三","四","五","六"]},legend:{selector:{all:"全选",inverse:"反选"}},toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图",custom:"自定义图表",chart:"图表"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}});var gi=36e5,mi=864e5,vi=31536e6,yi={year:"{yyyy}",month:"{MMM}",day:"{d}",hour:"{HH}:{mm}",minute:"{HH}:{mm}",second:"{HH}:{mm}:{ss}",millisecond:"{HH}:{mm}:{ss} {SSS}",none:"{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"},_i="{yyyy}-{MM}-{dd}",xi={year:"{yyyy}",month:"{yyyy}-{MM}",day:_i,hour:_i+" "+yi.hour,minute:_i+" "+yi.minute,second:_i+" "+yi.second,millisecond:yi.none},wi=["year","month","day","hour","minute","second","millisecond"],Mi=["year","half-year","quarter","month","week","half-week","day","half-day","quarter-day","hour","minute","second","millisecond"];function bi(e,t){return"0000".substr(0,t-(e+="").length)+e}function Si(e){switch(e){case"half-year":case"quarter":return"month";case"week":case"half-week":return"day";case"half-day":case"quarter-day":return"hour";default:
// year, minutes, second, milliseconds
return e}}function Ii(e){return e===Si(e)}function Di(
// Note: The result based on `isUTC` are totally different, which can not be just simply
// substituted by the result without `isUTC`. So we make the param `isUTC` mandatory.
e,t,n,i){var r=$e(e),a=r[ki(n)](),o=r[Oi(n)]()+1,s=Math.floor((o-1)/3)+1,l=r[Li(n)](),u=r["get"+(n?"UTC":"")+"Day"](),c=r[Ai(n)](),p=(c-1)%12+1,h=r[Ni(n)](),f=r[Ri(n)](),d=r[Ei(n)](),g=c>=12?"pm":"am",m=g.toUpperCase(),v=i instanceof ai?i:function(e){return hi[e]}(i||fi)||hi[ci],y=v.getModel("time"),_=y.get("month"),x=y.get("monthAbbr"),w=y.get("dayOfWeek"),M=y.get("dayOfWeekAbbr");return(t||"").replace(/{a}/g,g+"").replace(/{A}/g,m+"").replace(/{yyyy}/g,a+"").replace(/{yy}/g,bi(a%100+"",2)).replace(/{Q}/g,s+"").replace(/{MMMM}/g,_[o-1]).replace(/{MMM}/g,x[o-1]).replace(/{MM}/g,bi(o,2)).replace(/{M}/g,o+"").replace(/{dd}/g,bi(l,2)).replace(/{d}/g,l+"").replace(/{eeee}/g,w[u]).replace(/{ee}/g,M[u]).replace(/{e}/g,u+"").replace(/{HH}/g,bi(c,2)).replace(/{H}/g,c+"").replace(/{hh}/g,bi(p+"",2)).replace(/{h}/g,p+"").replace(/{mm}/g,bi(h,2)).replace(/{m}/g,h+"").replace(/{ss}/g,bi(f,2)).replace(/{s}/g,f+"").replace(/{SSS}/g,bi(d,3)).replace(/{S}/g,d+"")}function Ci(e,t){var n=$e(e),i=n[Oi(t)]()+1,r=n[Li(t)](),a=n[Ai(t)](),o=n[Ni(t)](),s=n[Ri(t)](),l=0===n[Ei(t)](),u=l&&0===s,c=u&&0===o,p=c&&0===a,h=p&&1===r;return h&&1===i?"year":h?"month":p?"day":c?"hour":u?"minute":l?"second":"millisecond"}function Ti(e,t,n){var i=s(e)?$e(e):e;switch(t=t||Ci(e,n)){case"year":return i[ki(n)]();case"half-year":return i[Oi(n)]()>=6?1:0;case"quarter":return Math.floor((i[Oi(n)]()+1)/4);case"month":return i[Oi(n)]();case"day":return i[Li(n)]();case"half-day":return i[Ai(n)]()/24;case"hour":return i[Ai(n)]();case"minute":return i[Ni(n)]();case"second":return i[Ri(n)]();case"millisecond":return i[Ei(n)]()}}function ki(e){return e?"getUTCFullYear":"getFullYear"}function Oi(e){return e?"getUTCMonth":"getMonth"}function Li(e){return e?"getUTCDate":"getDate"}function Ai(e){return e?"getUTCHours":"getHours"}function Ni(e){return e?"getUTCMinutes":"getMinutes"}function Ri(e){return e?"getUTCSeconds":"getSeconds"}function Ei(e){return e?"getUTCMilliseconds":"getMilliseconds"}function Pi(e){return e?"setUTCFullYear":"setFullYear"}function Bi(e){return e?"setUTCMonth":"setMonth"}function Vi(e){return e?"setUTCDate":"setDate"}function Fi(e){return e?"setUTCHours":"setHours"}function zi(e){return e?"setUTCMinutes":"setMinutes"}function Ui(e){return e?"setUTCSeconds":"setSeconds"}function Gi(e){return e?"setUTCMilliseconds":"setMilliseconds"}function Hi(e){if(!nt(e))return t(e)?e:"-";var n=(e+"").split(".");return n[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(n.length>1?"."+n[1]:"")}var Wi=W,Yi=["a","b","c","d","e","f","g"],Zi=function(e,t){return"{"+e+(null==t?"":t)+"}"};function qi(e,t,n){a(t)||(t=[t]);var i=t.length;if(!i)return"";for(var r=t[0].$vars||[],o=0;o<r.length;o++){var s=Yi[o];e=e.replace(Zi(s),Zi(s,0))}for(var l=0;l<i;l++)for(var u=0;u<r.length;u++){var c=t[l][r[u]];e=e.replace(Zi(Yi[u],l),n?Y(c):c)}return e}var ji=c,Xi=["left","right","top","bottom","width","height"],Ki=[["width","left","right"],["height","top","bottom"]];
/**
 * @public
 */function $i(e,t,n,i,r){var a=0,o=0;null==i&&(i=1/0),null==r&&(r=1/0);var s=0;t.eachChild(function(l,u){var c,p,h=l.getBoundingRect(),f=t.childAt(u+1),d=f&&f.getBoundingRect();if("horizontal"===e){var g=h.width+(d?-d.x+h.x:0);
// Wrap when width exceeds maxWidth or meet a `newline` group
// FIXME compare before adding gap?
(c=a+g)>i||l.newline?(a=0,c=g,o+=s+n,s=h.height):
// FIXME: consider rect.y is not `0`?
s=Math.max(s,h.height)}else{var m=h.height+(d?-d.y+h.y:0);
// Wrap when width exceeds maxHeight or meet a `newline` group
(p=o+m)>r||l.newline?(a+=s+n,o=0,p=m,s=h.width):s=Math.max(s,h.width)}l.newline||(l.x=a,l.y=o,l.markRedraw(),"horizontal"===e?a=c+n:o=p+n)})}
/**
 * VBox layouting
 * @param {module:zrender/graphic/Group} group
 * @param {number} gap
 * @param {number} [width=Infinity]
 * @param {number} [height=Infinity]
 */function Ji(e){var t=e.layoutMode||e.constructor.layoutMode;return o(t)?t:t?{type:t}:null}
/**
 * Consider Case:
 * When default option has {left: 0, width: 100}, and we set {right: 0}
 * through setOption or media query, using normal zrUtil.merge will cause
 * {right: 0} does not take effect.
 *
 * @example
 * ComponentModel.extend({
 *     init: function () {
 *         ...
 *         let inputPositionParams = layout.getLayoutParams(option);
 *         this.mergeOption(inputPositionParams);
 *     },
 *     mergeOption: function (newOption) {
 *         newOption && zrUtil.merge(thisOption, newOption, true);
 *         layout.mergeLayoutParam(thisOption, newOption);
 *     }
 * });
 *
 * @param targetOption
 * @param newOption
 * @param opt
 */function Qi(e,t,n){var i=n&&n.ignoreSize;!a(i)&&(i=[i,i]);var r=s(Ki[0],0),o=s(Ki[1],1);function s(n,r){var a={},o=0,s={},c=0;if(ji(n,function(t){s[t]=e[t]}),ji(n,function(e){
// Consider case: newOption.width is null, which is
// set by user for removing width setting.
l(t,e)&&(a[e]=s[e]=t[e]),u(a,e)&&o++,u(s,e)&&c++}),i[r])
// Only one of left/right is premitted to exist.
return u(t,n[1])?s[n[2]]=null:u(t,n[2])&&(s[n[1]]=null),s;
// Case: newOption: {width: ..., right: ...},
// or targetOption: {right: ...} and newOption: {width: ...},
// There is no conflict when merged only has params count
// little than enoughParamNumber.
if(2!==c&&o){if(o>=2)return a;
// Chose another param from targetOption by priority.
for(var p=0;p<n.length;p++){var h=n[p];if(!l(a,h)&&l(e,h)){a[h]=e[h];break}}return a}return s}function l(e,t){return e.hasOwnProperty(t)}function u(e,t){return null!=e[t]&&"auto"!==e[t]}function c(e,t,n){ji(e,function(e){t[e]=n[e]})}c(Ki[0],e,r),c(Ki[1],e,o)}
/**
 * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
 */function er(e){
/**
 * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
 * @param {Object} source
 * @return {Object} Result contains those props.
 */
return function(e,t){return t&&e&&ji(Xi,function(n){t.hasOwnProperty(n)&&(e[n]=t[n])}),e}({},e)}q($i,"vertical"),
/**
 * HBox layouting
 * @param {module:zrender/graphic/Group} group
 * @param {number} gap
 * @param {number} [width=Infinity]
 * @param {number} [height=Infinity]
 */
q($i,"horizontal");var tr=_t(),nr=/** @class */function(e){function t(t,n,i){var r=e.call(this,t,n,i)||this;return r.uid=si("ec_cpt_model"),r}return h(t,e),t.prototype.init=function(e,t,n){this.mergeDefaultAndTheme(e,n)},t.prototype.mergeDefaultAndTheme=function(e,t){var n=Ji(this),i=n?er(e):{},r=t.getTheme();z(e,r.get(this.mainType)),z(e,this.getDefaultOption()),n&&Qi(e,i,n)},t.prototype.mergeOption=function(e){z(this.option,e,!0);var t=Ji(this);t&&Qi(this.option,e,t)},
/**
   * Called immediately after `init` or `mergeOption` of this instance called.
   */
t.prototype.optionUpdated=function(){},
/**
   * [How to declare defaultOption]:
   *
   * (A) If using class declaration in typescript (since echarts 5):
   * ```ts
   * import {ComponentOption} from '../model/option.js';
   * export interface XxxOption extends ComponentOption {
   *     aaa: number
   * }
   * export class XxxModel extends Component {
   *     static type = 'xxx';
   *     static defaultOption: XxxOption = {
   *         aaa: 123
   *     }
   * }
   * Component.registerClass(XxxModel);
   * ```
   * ```ts
   * import {inheritDefaultOption} from '../util/component.js';
   * import {XxxModel, XxxOption} from './XxxModel.js';
   * export interface XxxSubOption extends XxxOption {
   *     bbb: number
   * }
   * class XxxSubModel extends XxxModel {
   *     static defaultOption: XxxSubOption = inheritDefaultOption(XxxModel.defaultOption, {
   *         bbb: 456
   *     })
   *     fn() {
   *         let opt = this.getDefaultOption();
   *         // opt is {aaa: 123, bbb: 456}
   *     }
   * }
   * ```
   *
   * (B) If using class extend (previous approach in echarts 3 & 4):
   * ```js
   * let XxxComponent = Component.extend({
   *     defaultOption: {
   *         xx: 123
   *     }
   * })
   * ```
   * ```js
   * let XxxSubComponent = XxxComponent.extend({
   *     defaultOption: {
   *         yy: 456
   *     },
   *     fn: function () {
   *         let opt = this.getDefaultOption();
   *         // opt is {xx: 123, yy: 456}
   *     }
   * })
   * ```
   */
t.prototype.getDefaultOption=function(){var e=this.constructor;
// If using class declaration, it is different to travel super class
// in legacy env and auto merge defaultOption. So if using class
// declaration, defaultOption should be merged manually.
if(!function(e){return!(!e||!e[Ct])}(e))
// When using ts class, defaultOption must be declared as static.
return e.defaultOption;
// FIXME: remove this approach?
var t=tr(this);if(!t.defaultOption){for(var n=[],i=e;i;){var r=i.prototype.defaultOption;r&&n.push(r),i=i.superClass}for(var a={},o=n.length-1;o>=0;o--)a=z(a,n[o],!0);t.defaultOption=a}return t.defaultOption},
/**
   * Notice: always force to input param `useDefault` in case that forget to consider it.
   * The same behavior as `modelUtil.parseFinder`.
   *
   * @param useDefault In many cases like series refer axis and axis refer grid,
   *        If axis index / axis id not specified, use the first target as default.
   *        In other cases like dataZoom refer axis, if not specified, measn no refer.
   */
t.prototype.getReferringComponents=function(e,t){var n=e+"Id";return St(this.ecModel,e,{index:this.get(e+"Index",!0),id:this.get(n,!0)},t)},t.prototype.getBoxLayoutParams=function(){
// Consider itself having box layout configs.
var e=this;return{left:e.get("left"),top:e.get("top"),right:e.get("right"),bottom:e.get("bottom"),width:e.get("width"),height:e.get("height")}},
/**
   * Get key for zlevel.
   * If developers don't configure zlevel. We will assign zlevel to series based on the key.
   * For example, lines with trail effect and progressive series will in an individual zlevel.
   */
t.prototype.getZLevelKey=function(){return""},t.prototype.setZLevel=function(e){this.option.zlevel=e},t.protoInitialize=function(){var e=t.prototype;e.type="component",e.id="",e.name="",e.mainType="",e.subType="",e.componentIndex=0}(),t}(ai);Ot(nr,ai),Rt(nr),function(e){var t={};e.registerSubTypeDefaulter=function(e,n){var i=Tt(e);t[i.main]=n},e.determineSubType=function(n,i){var r=i.type;if(!r){var a=Tt(n).main;e.hasSubTypes(n)&&t[a]&&(r=t[a](i))}return r}}(nr),function(){function e(e,t){return e[t]||(e[t]={predecessor:[],successor:[]}),e[t]}nr.topologicalTravel=function(t,n,r,a){if(t.length){var o=function(t){var n={},r=[];return c(t,function(a){var o,s,l=e(n,a),u=function(e,t){var n=[];return c(e,function(e){p(t,e)>=0&&n.push(e)}),n}(l.originalDeps=(s=[],c(nr.getClassesByMainType(o=a),function(e){s=s.concat(e.dependencies||e.prototype.dependencies||[])}),
// Ensure main type.
s=i(s,function(e){return Tt(e).main}),
// Hack dataset for convenience.
"dataset"!==o&&p(s,"dataset")<=0&&s.unshift("dataset"),s),t);l.entryCount=u.length,0===l.entryCount&&r.push(a),c(u,function(t){p(l.predecessor,t)<0&&l.predecessor.push(t);var i=e(n,t);p(i.successor,t)<0&&i.successor.push(a)})}),{graph:n,noEntryList:r}}(n),s=o.graph,l=o.noEntryList,u={};for(c(t,function(e){u[e]=!0});l.length;){var h=l.pop(),f=s[h],d=!!u[h];d&&(r.call(a,h,f.originalDeps.slice()),delete u[h]),c(f.successor,d?m:g)}c(u,function(){throw new Error("")})}function g(e){s[e].entryCount--,0===s[e].entryCount&&l.push(e)}function m(e){u[e]=!0,g(e)}}}
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/**
 * Language: English.
 */();var ir="";"undefined"!=typeof navigator&&(ir=navigator.platform||"");var rr="rgba(0, 0, 0, 0.2)";const ar={darkMode:"auto",
// backgroundColor: 'rgba(0,0,0,0)',
colorBy:"series",color:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],gradientColor:["#f6efa6","#d88273","#bf444c"],aria:{decal:{decals:[{color:rr,dashArrayX:[1,0],dashArrayY:[2,5],symbolSize:1,rotation:Math.PI/6},{color:rr,symbol:"circle",dashArrayX:[[8,8],[0,8,8,0]],dashArrayY:[6,0],symbolSize:.8},{color:rr,dashArrayX:[1,0],dashArrayY:[4,3],rotation:-Math.PI/4},{color:rr,dashArrayX:[[6,6],[0,6,6,0]],dashArrayY:[6,0]},{color:rr,dashArrayX:[[1,0],[1,6]],dashArrayY:[1,0,6,0],rotation:Math.PI/4},{color:rr,symbol:"triangle",dashArrayX:[[9,9],[0,9,9,0]],dashArrayY:[7,2],symbolSize:.75}]}},
// If xAxis and yAxis declared, grid is created by default.
// grid: {},
textStyle:{
// color: '#000',
// decoration: 'none',
// PENDING
fontFamily:ir.match(/^Win/)?"Microsoft YaHei":"sans-serif",
// fontFamily: 'Arial, Verdana, sans-serif',
fontSize:12,fontStyle:"normal",fontWeight:"normal"},
// http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
// Default is source-over
blendMode:null,stateAnimation:{duration:300,easing:"cubicOut"},animation:"auto",animationDuration:1e3,animationDurationUpdate:500,animationEasing:"cubicInOut",animationEasingUpdate:"cubicInOut",animationThreshold:2e3,
// Configuration for progressive/incremental rendering
progressiveThreshold:3e3,progressive:400,
// Threshold of if use single hover layer to optimize.
// It is recommended that `hoverLayerThreshold` is equivalent to or less than
// `progressiveThreshold`, otherwise hover will cause restart of progressive,
// which is unexpected.
// see example <echarts/test/heatmap-large.html>.
hoverLayerThreshold:3e3,
// See: module:echarts/scale/Time
useUTC:!1};var or=u(["tooltip","label","itemName","itemId","itemGroupId","itemChildGroupId","seriesName"]),sr="original",lr="arrayRows",ur="objectRows",cr="keyedColumns",pr="typedArray",hr="unknown",fr="column",dr="row",gr=_t();
/**
 * [The strategy of the arrengment of data dimensions for dataset]:
 * "value way": all axes are non-category axes. So series one by one take
 *     several (the number is coordSysDims.length) dimensions from dataset.
 *     The result of data arrengment of data dimensions like:
 *     | ser0_x | ser0_y | ser1_x | ser1_y | ser2_x | ser2_y |
 * "category way": at least one axis is category axis. So the the first data
 *     dimension is always mapped to the first category axis and shared by
 *     all of the series. The other data dimensions are taken by series like
 *     "value way" does.
 *     The result of data arrengment of data dimensions like:
 *     | ser_shared_x | ser0_y | ser1_y | ser2_y |
 *
 * @return encode Never be `null/undefined`.
 */
function mr(e,t,n){var i={},r=vr(t);
// Currently only make default when using dataset, util more reqirements occur.
if(!r||!e)return i;var a,s,l=[],u=[],p=gr(t.ecModel).datasetMap,h=r.uid+"_"+n.seriesLayoutBy;e=e.slice(),c(e,function(t,n){var r=o(t)?t:e[n]={name:t};"ordinal"===r.type&&null==a&&(a=n,s=g(r)),i[r.name]=[]});var f=p.get(h)||p.set(h,{categoryWayDim:s,valueWayDim:0});
// TODO
// Auto detect first time axis and do arrangement.
function d(e,t,n){for(var i=0;i<n;i++)e.push(t+i)}function g(e){var t=e.dimsDef;return t?t.length:1}return c(e,function(e,t){var n=e.name,r=g(e);
// In value way.
if(null==a)d(i[n],o=f.valueWayDim,r),d(u,o,r),f.valueWayDim+=r;else if(a===t)d(i[n],0,r),d(l,0,r);else{var o;d(i[n],o=f.categoryWayDim,r),d(u,o,r),f.categoryWayDim+=r}}),l.length&&(i.itemName=l),u.length&&(i.seriesName=u),i}
/**
 * @return If return null/undefined, indicate that should not use datasetModel.
 */function vr(e){if(!e.get("data",!0))return St(e.ecModel,"dataset",{index:e.get("datasetIndex",!0),id:e.get("datasetId",!0)},bt).models[0]}
/**
 * @return Always return an array event empty.
 */
/**
 * The rule should not be complex, otherwise user might not
 * be able to known where the data is wrong.
 * The code is ugly, but how to make it neat?
 */
function yr(e,n){
// dimIndex may be overflow source data.
// return {BE_ORDINAL}
return function(e,n,i,r,s,l){var u,c,p;
// Experience value.
if(j(e))return 3;
// When sourceType is 'objectRows' or 'keyedColumns', dimensionsDefine
// always exists in source.
if(r){var h=r[l];o(h)?(c=h.name,p=h.type):t(h)&&(c=h)}if(null!=p)return"ordinal"===p?1:3;if(n===lr){var f=e;if(i===dr){for(var d=f[l],g=0;g<(d||[]).length&&g<5;g++)if(null!=(u=w(d[s+g])))return u}else for(g=0;g<f.length&&g<5;g++){var m=f[s+g];if(m&&null!=(u=w(m[l])))return u}}else if(n===ur){var v=e;if(!c)return 3;for(g=0;g<v.length&&g<5;g++)if((_=v[g])&&null!=(u=w(_[c])))return u}else if(n===cr){if(!c)return 3;if(!(d=e[c])||j(d))return 3;for(g=0;g<d.length&&g<5;g++)if(null!=(u=w(d[g])))return u}else if(n===sr){var y=e;for(g=0;g<y.length&&g<5;g++){var _,x=pt(_=y[g]);if(!a(x))return 3;if(null!=(u=w(x[l])))return u}}function w(e){var n=t(e);
// Consider usage convenience, '1', '2' will be treated as "number".
// `Number('')` (or any whitespace) is `0`.
return null!=e&&Number.isFinite(Number(e))&&""!==e?n?2:3:n&&"-"!==e?1:void 0}return 3}(e.data,e.sourceFormat,e.seriesLayoutBy,e.dimensionsDefine,e.startIndex,n)}var _r=u(),xr=_t();_t();var wr,Mr,br,Sr=/** @class */function(){function e(){}return e.prototype.getColorFromPalette=function(e,t,n){
/**
 * @param name MUST NOT be null/undefined. Otherwise call this function
 *             twise with the same parameters will get different result.
 * @param scope default this.
 * @return Can be null/undefined
 */
return function(e,t,n,i,r,a,o){var s=xr(a=a||e),l=s.paletteIdx||0,u=s.paletteNameMap=s.paletteNameMap||{};
// Use `hasOwnProperty` to avoid conflict with Object.prototype.
if(u.hasOwnProperty(r))return u[r];var c=null!=o&&i?function(e,t){
// TODO palettes must be in order
for(var n=e.length,i=0;i<n;i++)if(e[i].length>t)return e[i];return e[n-1]}(i,o):n;
// In case can't find in layered color palette.
if((c=c||n)&&c.length){var p=c[l];return r&&(u[r]=p),s.paletteIdx=(l+1)%c.length,p}}(this,0,lt(this.get("color",!0)),this.get("colorLayer",!0),e,t,n)},e.prototype.clearColorPalette=function(){!function(e,t){t(e).paletteIdx=0,t(e).paletteNameMap={}}(this,xr)},e}(),Ir="\0_ec_inner",Dr=
/** @class */function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return h(n,e),n.prototype.init=function(e,t,n,i,r,a){i=i||{},this.option=null,this._theme=new ai(i),this._locale=new ai(r),this._optionManager=a},n.prototype.setOption=function(e,t,n){var i=kr(t);this._optionManager.setOption(e,n,i),this._resetOption(null,i)},n.prototype.resetOption=function(e,t){return this._resetOption(e,kr(t))},n.prototype._resetOption=function(e,t){var n=!1,i=this._optionManager;if(!e||"recreate"===e){var r=i.mountOption("recreate"===e);this.option&&"recreate"!==e?(this.restoreData(),this._mergeOption(r,t)):br(this,r),n=!0}if("timeline"!==e&&"media"!==e||this.restoreData(),!e||"recreate"===e||"timeline"===e){var a=i.getTimelineOption(this);a&&(n=!0,this._mergeOption(a,t))}if(!e||"recreate"===e||"media"===e){var o=i.getMediaOption(this);o.length&&c(o,function(e){n=!0,this._mergeOption(e,t)},this)}return n},n.prototype.mergeOption=function(e){this._mergeOption(e,null)},n.prototype._mergeOption=function(e,t){var n=this.option,i=this._componentsMap,a=this._componentsCount,s=[],l=u(),p=t&&t.replaceMergeMainTypeMap;
// `datasetMap` is used to make default encode.
gr(this).datasetMap=u(),c(e,function(e,t){null!=e&&(nr.hasClass(t)?t&&(s.push(t),l.set(t,!0)):n[t]=null==n[t]?U(e):z(n[t],e,!0))}),p&&p.each(function(e,t){nr.hasClass(t)&&!l.get(t)&&(s.push(t),l.set(t,!0))}),nr.topologicalTravel(s,nr.getAllClassMainTypes(),function(t){var s=function(e,t,n){var i=_r.get(t);if(!i)return n;var r=i(e);return r?n.concat(r):n}(this,t,lt(e[t])),l=i.get(t),h=function(e,t,n){var i="normalMerge"===n,a="replaceMerge"===n,s="replaceAll"===n;e=e||[],t=(t||[]).slice();var l=u();c(t,function(e,n){o(e)||(t[n]=null)});var p,h,f=function(e,t,n){var i=[];if("replaceAll"===n)return i;for(var r=0;r<e.length;r++){var a=e[r];a&&null!=a.id&&t.set(a.id,r),i.push({existing:"replaceMerge"===n||vt(a)?null:a,newOption:null,keyInfo:null,brandNew:null})}return i}(e,l,n);return(i||a)&&function(e,t,n,i){c(i,function(a,o){if(a&&null!=a.id){var s=dt(a.id),l=n.get(s);if(null!=l){var u=e[l];r(!u.newOption,'Duplicated option on id "'+s+'".'),u.newOption=a,u.existing=t[l],i[o]=null}}})}(f,e,l,t),i&&function(e,t){c(t,function(n,i){if(n&&null!=n.name)for(var r=0;r<e.length;r++){var a=e[r].existing;if(!e[r].newOption&&a&&(null==a.id||null==n.id)&&!vt(n)&&!vt(a)&&ft("name",a,n))return e[r].newOption=n,void(t[i]=null)}})}(f,t),i||a?function(e,t,n){c(t,function(t){if(t){for(var i,r=0;
// Be `!resultItem` only when `nextIdx >= result.length`.
(i=e[r])&&(i.newOption||vt(i.existing)||// In mode "replaceMerge", here no not-mapped-non-internal-existing.
i.existing&&null!=t.id&&!ft("id",t,i.existing));)r++;i?(i.newOption=t,i.brandNew=n):e.push({newOption:t,brandNew:n,existing:null,keyInfo:null}),r++}})}(f,t,a):s&&function(e,t){c(t,function(t){e.push({newOption:t,brandNew:!0,existing:null,keyInfo:null})})}(f,t),p=f,h=u(),c(p,function(e){var t=e.existing;t&&h.set(t.id,e)}),c(p,function(e){var t=e.newOption;r(!t||null==t.id||!h.get(t.id)||h.get(t.id)===e,"id duplicates: "+(t&&t.id)),t&&null!=t.id&&h.set(t.id,e),!e.keyInfo&&(e.keyInfo={})}),c(p,function(e,t){var n=e.existing,i=e.newOption,r=e.keyInfo;if(o(i)){if(r.name=null!=i.name?dt(i.name):n?n.name:st+t,n)r.id=dt(n.id);else if(null!=i.id)r.id=dt(i.id);else{var a=0;do{r.id="\0"+r.name+"\0"+a++}while(h.get(r.id))}h.set(r.id,e)}}),f}(l,s,
// `!oldCmptList` means init. See the comment in `mappingToExists`
l?p&&p.get(t)?"replaceMerge":"normalMerge":"replaceAll");(function(e,t,n){c(e,function(e){var i=e.newOption;o(i)&&(e.keyInfo.mainType=t,e.keyInfo.subType=function(e,t,n,i){return t.type?t.type:n?n.subType:i.determineSubType(e,t)}(t,i,e.existing,n))})})(h,t,nr),n[t]=null,i.set(t,null),a.set(t,0);var f,g=[],m=[],v=0;c(h,function(e,n){var i=e.existing,r=e.newOption;if(r){var a=nr.getClass(t,e.keyInfo.subType,!("series"===t));if(!a)return;if("tooltip"===t){if(f)return;f=!0}if(i&&i.constructor===a)i.name=e.keyInfo.name,i.mergeOption(r,this),i.optionUpdated(r,!1);else{var o=d({componentIndex:n},e.keyInfo);i=new a(r,this,this,o),d(i,o),e.brandNew&&(i.__requireNewView=!0),i.init(r,this,this),i.optionUpdated(null,!0)}}else i&&(i.mergeOption({},this),i.optionUpdated({},!1));i?(g.push(i.option),m.push(i),v++):(g.push(void 0),m.push(void 0))},this),n[t]=g,i.set(t,m),a.set(t,v),"series"===t&&wr(this)},this),this._seriesIndices||wr(this)},n.prototype.getOption=function(){var e=U(this.option);return c(e,function(t,n){if(nr.hasClass(n)){for(var i=lt(t),r=i.length,a=!1,o=r-1;o>=0;o--)i[o]&&!vt(i[o])?a=!0:(i[o]=null,!a&&r--);i.length=r,e[n]=i}}),delete e[Ir],e},n.prototype.getTheme=function(){return this._theme},n.prototype.getLocaleModel=function(){return this._locale},n.prototype.setUpdatePayload=function(e){this._payload=e},n.prototype.getUpdatePayload=function(){return this._payload},n.prototype.getComponent=function(e,t){var n=this._componentsMap.get(e);if(n){var i=n[t||0];if(i)return i;if(null==t)for(var r=0;r<n.length;r++)if(n[r])return n[r]}},n.prototype.queryComponents=function(e){var t=e.mainType;if(!t)return[];var n,i=e.index,r=e.id,a=e.name,o=this._componentsMap.get(t);return o&&o.length?(null!=i?(n=[],c(lt(i),function(e){o[e]&&n.push(o[e])})):n=null!=r?Cr("id",r,o):null!=a?Cr("name",a,o):X(o,function(e){return!!e}),Tr(n,e)):[]},n.prototype.findComponents=function(e){var t,n,i,r,a,o=e.mainType,s=(n=o+"Index",i=o+"Id",r=o+"Name",!(t=e.query)||null==t[n]&&null==t[i]&&null==t[r]?null:{mainType:o,
// subType will be filtered finally.
index:t[n],id:t[i],name:t[r]});return a=Tr(s?this.queryComponents(s):X(this._componentsMap.get(o),function(e){return!!e}),e),e.filter?X(a,e.filter):a},n.prototype.eachComponent=function(e,n,i){var r=this._componentsMap;if(g(e)){var a=n,s=e;r.each(function(e,t){for(var n=0;e&&n<e.length;n++){var i=e[n];i&&s.call(a,t,i,i.componentIndex)}})}else for(var l=t(e)?r.get(e):o(e)?this.findComponents(e):null,u=0;l&&u<l.length;u++){var c=l[u];c&&n.call(i,c,c.componentIndex)}},n.prototype.getSeriesByName=function(e){var t=gt(e,null);return X(this._componentsMap.get("series"),function(e){return!!e&&null!=t&&e.name===t})},n.prototype.getSeriesByIndex=function(e){return this._componentsMap.get("series")[e]},n.prototype.getSeriesByType=function(e){return X(this._componentsMap.get("series"),function(t){return!!t&&t.subType===e})},n.prototype.getSeries=function(){return X(this._componentsMap.get("series"),function(e){return!!e})},n.prototype.getSeriesCount=function(){return this._componentsCount.get("series")},n.prototype.eachSeries=function(e,t){Mr(this),c(this._seriesIndices,function(n){var i=this._componentsMap.get("series")[n];e.call(t,i,n)},this)},n.prototype.eachRawSeries=function(e,t){c(this._componentsMap.get("series"),function(n){n&&e.call(t,n,n.componentIndex)})},n.prototype.eachSeriesByType=function(e,t,n){Mr(this),c(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];r.subType===e&&t.call(n,r,i)},this)},n.prototype.eachRawSeriesByType=function(e,t,n){return c(this.getSeriesByType(e),t,n)},n.prototype.isSeriesFiltered=function(e){return Mr(this),null==this._seriesIndicesMap.get(e.componentIndex)},n.prototype.getCurrentSeriesIndices=function(){return(this._seriesIndices||[]).slice()},n.prototype.filterSeries=function(e,t){Mr(this);var n=[];c(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];e.call(t,r,i)&&n.push(i)},this),this._seriesIndices=n,this._seriesIndicesMap=u(n)},n.prototype.restoreData=function(e){wr(this);var t=this._componentsMap,n=[];t.each(function(e,t){nr.hasClass(t)&&n.push(t)}),nr.topologicalTravel(n,nr.getAllClassMainTypes(),function(n){c(t.get(n),function(t){!t||"series"===n&&function(e,t){if(t){var n=t.seriesIndex,i=t.seriesId,r=t.seriesName;return null!=n&&e.componentIndex!==n||null!=i&&e.id!==i||null!=r&&e.name!==r}}(t,e)||t.restoreData()})})},n.internalField=(wr=function(e){var t=e._seriesIndices=[];c(e._componentsMap.get("series"),function(e){e&&t.push(e.componentIndex)}),e._seriesIndicesMap=u(t)},Mr=function(){},void(br=function(e,t){e.option={},e.option[Ir]=1,e._componentsMap=u({series:[]}),e._componentsCount=u();var n=t.aria;o(n)&&null==n.enabled&&(n.enabled=!0),function(e,t){var n=e.color&&!e.colorLayer;c(t,function(t,i){"colorLayer"===i&&n||nr.hasClass(i)||("object"==typeof t?e[i]=e[i]?z(e[i],t,!1):U(t):null==e[i]&&(e[i]=t))})}(t,e._theme.option),z(t,ar,!1),e._mergeOption(t,null)})),n}(ai);function Cr(e,t,n){if(a(t)){var i=u();return c(t,function(e){null!=e&&null!=gt(e,null)&&i.set(e,!0)}),X(n,function(t){return t&&i.get(t[e])})}var r=gt(t,null);return X(n,function(t){return t&&null!=r&&t[e]===r})}function Tr(e,t){return t.hasOwnProperty("subType")?X(e,function(e){return e&&e.subType===t.subType}):e}function kr(e){var t=u();return e&&c(lt(e.replaceMerge),function(e){t.set(e,!0)}),{replaceMergeMainTypeMap:t}}H(Dr,Sr);var Or=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isSSR","isDisposed","on","off","getDataURL","getConnectedDataURL",
// 'getModel',
"getOption",
// 'getViewOfComponentModel',
// 'getViewOfSeriesModel',
"getId","updateLabelLayout"],Lr=function(e){c(Or,function(t){this[t]=K(e[t],e)},this)},Ar={},Nr=/** @class */function(){function e(){this._coordinateSystems=[]}return e.prototype.create=function(e,t){var n=[];c(Ar,function(i){var r=i.create(e,t);n=n.concat(r||[])}),this._coordinateSystems=n},e.prototype.update=function(e,t){c(this._coordinateSystems,function(n){n.update&&n.update(e,t)})},e.prototype.getCoordinateSystems=function(){return this._coordinateSystems.slice()},e.register=function(e,t){Ar[e]=t},e.get=function(e){return Ar[e]},e}(),Rr=/^(min|max)?(.+)$/,Er=
/** @class */function(){function e(e){this._timelineOptions=[],this._mediaList=[],this._currentMediaIndices=[],this._api=e}return e.prototype.setOption=function(e,t){e&&(c(lt(e.series),function(e){e&&e.data&&j(e.data)&&$(e.data)}),c(lt(e.dataset),function(e){e&&e.source&&j(e.source)&&$(e.source)})),e=U(e);var n=this._optionBackup,i=function(e,t,n){var i,r,o=[],s=e.baseOption,l=e.timeline,u=e.options,p=e.media,h=!!e.media,f=!!(u||l||s&&s.timeline);function d(e){c(t,function(t){t(e,n)})}return s?(r=s).timeline||(r.timeline=l):((f||h)&&(e.options=e.media=null),r=e),h&&a(p)&&c(p,function(e){e&&e.option&&(e.query?o.push(e):i||(i=e))}),d(r),c(u,function(e){return d(e)}),c(o,function(e){return d(e.option)}),{baseOption:r,timelineOptions:u||[],mediaDefault:i,mediaList:o}}(e,t,!n);this._newBaseOption=i.baseOption,n?(i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i},e.prototype.mountOption=function(e){var t=this._optionBackup;return this._timelineOptions=t.timelineOptions,this._mediaList=t.mediaList,this._mediaDefault=t.mediaDefault,this._currentMediaIndices=[],U(e?t.baseOption:this._newBaseOption)},e.prototype.getTimelineOption=function(e){var t,n=this._timelineOptions;if(n.length){var i=e.getComponent("timeline");i&&(t=U(
// FIXME:TS as TimelineModel or quivlant interface
n[i.getCurrentIndex()]))}return t},e.prototype.getMediaOption=function(){var e,t=this._api.getWidth(),n=this._api.getHeight(),r=this._mediaList,a=this._mediaDefault,o=[],s=[];if(!r.length&&!a)return s;for(var l=0,u=r.length;l<u;l++)Pr(r[l].query,t,n)&&o.push(l);return!o.length&&a&&(o=[-1]),o.length&&(e=this._currentMediaIndices,o.join(",")!==e.join(","))&&(s=i(o,function(e){return U(-1===e?a.option:r[e].option)})),this._currentMediaIndices=o,s},e}();function Pr(e,t,n){var i={width:t,height:n,aspectratio:t/n},r=!0;return c(e,function(e,t){var n=t.match(Rr);if(n&&n[1]&&n[2]){var a=n[1],o=n[2].toLowerCase();(function(e,t,n){return"min"===n?e>=t:"max"===n?e<=t:e===t})(i[o],e,a)||(r=!1)}}),r}var Br=c,Vr=o,Fr=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"];function zr(e){var t=e&&e.itemStyle;if(t)for(var n=0,i=Fr.length;n<i;n++){var r=Fr[n],a=t.normal,o=t.emphasis;a&&a[r]&&(e[r]=e[r]||{},e[r].normal?z(e[r].normal,a[r]):e[r].normal=a[r],a[r]=null),o&&o[r]&&(e[r]=e[r]||{},e[r].emphasis?z(e[r].emphasis,o[r]):e[r].emphasis=o[r],o[r]=null)}}function Ur(e,t,n){if(e&&e[t]&&(e[t].normal||e[t].emphasis)){var i=e[t].normal,r=e[t].emphasis;i&&(n?(e[t].normal=e[t].emphasis=null,I(e[t],i)):e[t]=i),r&&(e.emphasis=e.emphasis||{},e.emphasis[t]=r,r.focus&&(e.emphasis.focus=r.focus),r.blurScope&&(e.emphasis.blurScope=r.blurScope))}}function Gr(e){Ur(e,"itemStyle"),Ur(e,"lineStyle"),Ur(e,"areaStyle"),Ur(e,"label"),Ur(e,"labelLine"),Ur(e,"upperLabel"),Ur(e,"edgeLabel")}function Hr(e,t){var n=Vr(e)&&e[t],i=Vr(n)&&n.textStyle;if(i)for(var r=0,a=ct.length;r<a;r++){var o=ct[r];i.hasOwnProperty(o)&&(n[o]=i[o])}}function Wr(e){e&&(Gr(e),Hr(e,"label"),e.emphasis&&Hr(e.emphasis,"label"))}function Yr(e){return a(e)?e:e?[e]:[]}function Zr(e){return(a(e)?e[0]:e)||{}}function qr(e){e&&c(jr,function(t){t[0]in e&&!(t[1]in e)&&(e[t[1]]=e[t[0]])})}var jr=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],Xr=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],Kr=[["borderRadius","barBorderRadius"],["borderColor","barBorderColor"],["borderWidth","barBorderWidth"]];function $r(e){var t=e&&e.itemStyle;if(t)for(var n=0;n<Kr.length;n++){var i=Kr[n][1];null!=t[i]&&(t[Kr[n][0]]=t[i])}}function Jr(e){e&&"edge"===e.alignTo&&null!=e.margin&&null==e.edgeDistance&&(e.edgeDistance=e.margin)}function Qr(e){e&&e.downplay&&!e.blur&&(e.blur=e.downplay)}function ea(e,t){if(e)for(var n=0;n<e.length;n++)t(e[n]),e[n]&&ea(e[n].children,t)}function ta(e,t){(function(e,t){Br(Yr(e.series),function(e){Vr(e)&&function(e){if(Vr(e)){zr(e),Gr(e),Hr(e,"label"),Hr(e,"upperLabel"),Hr(e,"edgeLabel"),e.emphasis&&(Hr(e.emphasis,"label"),Hr(e.emphasis,"upperLabel"),Hr(e.emphasis,"edgeLabel"));var t=e.markPoint;t&&(zr(t),Wr(t));var n=e.markLine;n&&(zr(n),Wr(n));var i=e.markArea;i&&Wr(i);var r=e.data;if("graph"===e.type){r=r||e.nodes;var o=e.links||e.edges;if(o&&!j(o))for(var s=0;s<o.length;s++)Wr(o[s]);c(e.categories,function(e){Gr(e)})}if(r&&!j(r))for(s=0;s<r.length;s++)Wr(r[s]);if((t=e.markPoint)&&t.data){var l=t.data;for(s=0;s<l.length;s++)Wr(l[s])}if((n=e.markLine)&&n.data){var u=n.data;for(s=0;s<u.length;s++)a(u[s])?(Wr(u[s][0]),Wr(u[s][1])):Wr(u[s])}"gauge"===e.type?(Hr(e,"axisLabel"),Hr(e,"title"),Hr(e,"detail")):"treemap"===e.type?(Ur(e.breadcrumb,"itemStyle"),c(e.levels,function(e){Gr(e)})):"tree"===e.type&&Gr(e.leaves)}}(e)});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];t&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),Br(n,function(t){Br(Yr(e[t]),function(e){e&&(Hr(e,"axisLabel"),Hr(e.axisPointer,"label"))})}),Br(Yr(e.parallel),function(e){var t=e&&e.parallelAxisDefault;Hr(t,"axisLabel"),Hr(t&&t.axisPointer,"label")}),Br(Yr(e.calendar),function(e){Ur(e,"itemStyle"),Hr(e,"dayLabel"),Hr(e,"monthLabel"),Hr(e,"yearLabel")}),Br(Yr(e.radar),function(e){Hr(e,"name"),e.name&&null==e.axisName&&(e.axisName=e.name,delete e.name),null!=e.nameGap&&null==e.axisNameGap&&(e.axisNameGap=e.nameGap,delete e.nameGap)}),Br(Yr(e.geo),function(e){Vr(e)&&(Wr(e),Br(Yr(e.regions),function(e){Wr(e)}))}),Br(Yr(e.timeline),function(e){Wr(e),Ur(e,"label"),Ur(e,"itemStyle"),Ur(e,"controlStyle",!0);var t=e.data;a(t)&&c(t,function(e){o(e)&&(Ur(e,"label"),Ur(e,"itemStyle"))})}),Br(Yr(e.toolbox),function(e){Ur(e,"iconStyle"),Br(e.feature,function(e){Ur(e,"iconStyle")})}),Hr(Zr(e.axisPointer),"label"),Hr(Zr(e.tooltip).axisPointer,"label")})(e,t),e.series=lt(e.series),c(e.series,function(e){if(o(e)){var t=e.type;if("line"===t)null!=e.clipOverflow&&(e.clip=e.clipOverflow);else if("pie"===t||"gauge"===t){if(null!=e.clockWise&&(e.clockwise=e.clockWise),Jr(e.label),(r=e.data)&&!j(r))for(var n=0;n<r.length;n++)Jr(r[n]);null!=e.hoverOffset&&(e.emphasis=e.emphasis||{},(e.emphasis.scaleSize=null)&&(e.emphasis.scaleSize=e.hoverOffset))}else if("gauge"===t){var i=function(e){for(var t="pointer.color".split(","),n=e,i=0;i<t.length&&null!=(n=n&&n[t[i]]);i++);return n}(e);null!=i&&function(e,t,n){for(var i,r="itemStyle.color".split(","),a=e,o=0;o<r.length-1;o++)null==a[i=r[o]]&&(a[i]={}),a=a[i];null==a[r[o]]&&(a[r[o]]=n)}(e,0,i)}else if("bar"===t){var r;if($r(e),$r(e.backgroundStyle),$r(e.emphasis),(r=e.data)&&!j(r))for(n=0;n<r.length;n++)"object"==typeof r[n]&&($r(r[n]),$r(r[n]&&r[n].emphasis))}else if("sunburst"===t){var a=e.highlightPolicy;a&&(e.emphasis=e.emphasis||{},e.emphasis.focus||(e.emphasis.focus=a)),Qr(e),ea(e.data,Qr)}else"graph"===t||"sankey"===t?function(e){e&&null!=e.focusNodeAdjacency&&(e.emphasis=e.emphasis||{},null==e.emphasis.focus&&(e.emphasis.focus="adjacency"))}(e):"map"===t&&(e.mapType&&!e.map&&(e.map=e.mapType),e.mapLocation&&I(e,e.mapLocation));null!=e.hoverAnimation&&(e.emphasis=e.emphasis||{},e.emphasis&&null==e.emphasis.scale&&(e.emphasis.scale=e.hoverAnimation)),qr(e)}}),e.dataRange&&(e.visualMap=e.dataRange),c(Xr,function(t){var n=e[t];n&&(a(n)||(n=[n]),c(n,function(e){qr(e)}))})}
// (1) [Caution]: the logic is correct based on the premises:
//     data processing stage is blocked in stream.
//     See <module:echarts/stream/Scheduler#performDataProcessorTasks>
// (2) Only register once when import repeatedly.
//     Should be executed after series is filtered and before stack calculation.
function na(e){c(e,function(t,n){var i=[],r=[NaN,NaN],a=[t.stackResultDimension,t.stackedOverDimension],o=t.data,s=t.isStackedByIndex,l=t.seriesModel.get("stackStrategy")||"samesign";
// Should not write on raw data, because stack series model list changes
// depending on legend selection.
o.modify(a,function(a,u,c){var p,h,f=o.get(t.stackedDimension,c);
// Consider `connectNulls` of line area, if value is NaN, stackedOver
// should also be NaN, to draw a appropriate belt area.
if(isNaN(f))return r;s?h=o.getRawIndex(c):p=o.get(t.stackedByDimension,c);
// If stackOver is NaN, chart view will render point on value start.
for(var d=NaN,g=n-1;g>=0;g--){var m=e[g];
// Has been optimized by inverted indices on `stackedByDimension`.
if(s||(h=m.data.rawIndexOf(m.stackedByDimension,p)),h>=0){var v=m.data.getByRawIndex(m.stackResultDimension,h);
// Considering positive stack, negative stack and empty data
if("all"===l||"positive"===l&&v>0||"negative"===l&&v<0||"samesign"===l&&f>=0&&v>0||"samesign"===l&&f<=0&&v<0){
// The sum has to be very small to be affected by the
// floating arithmetic problem. An incorrect result will probably
// cause axis min/max to be filtered incorrectly.
f=Xe(f,v),d=v;break}}}return i[0]=f,i[1]=d,i})})}var ia,ra,aa,oa,sa,la=
/** @class */
function(){return function(e){this.data=e.data||(e.sourceFormat===cr?{}:[]),this.sourceFormat=e.sourceFormat||hr,this.seriesLayoutBy=e.seriesLayoutBy||fr,this.startIndex=e.startIndex||0,this.dimensionsDetectedCount=e.dimensionsDetectedCount,this.metaRawOption=e.metaRawOption;var t=this.dimensionsDefine=e.dimensionsDefine;if(t)for(var n=0;n<t.length;n++){var i=t[n];null==i.type&&1===yr(this,n)&&(i.type="ordinal")}}}();function ua(e){return e instanceof la}function ca(e,n,i){i=i||ha(e);var r=n.seriesLayoutBy,o=function(e,n,i,r,o){var l,u;if(!e)return{dimensionsDefine:fa(o),startIndex:u,dimensionsDetectedCount:l};if(n===lr){var p=e;"auto"===r||null==r?da(function(e){null!=e&&"-"!==e&&(t(e)?null==u&&(u=1):u=0)},i,p,10):u=s(r)?r:r?1:0,o||1!==u||(o=[],da(function(e,t){o[t]=null!=e?e+"":""},i,p,1/0)),l=o?o.length:i===dr?p.length:p[0]?p[0].length:null}else if(n===ur)o||(o=function(e){for(var t,n=0;n<e.length&&!(t=e[n++]););if(t)return _(t)}(e));else if(n===cr)o||(o=[],c(e,function(e,t){o.push(t)}));else if(n===sr){var h=pt(e[0]);l=a(h)&&h.length||1}return{startIndex:u,dimensionsDefine:fa(o),dimensionsDetectedCount:l}}(e,i,r,n.sourceHeader,n.dimensions);return new la({data:e,sourceFormat:i,seriesLayoutBy:r,dimensionsDefine:o.dimensionsDefine,startIndex:o.startIndex,dimensionsDetectedCount:o.dimensionsDetectedCount,metaRawOption:U(n)})}function pa(e){return new la({data:e,sourceFormat:j(e)?pr:sr})}function ha(e){var t=hr;if(j(e))t=pr;else if(a(e)){0===e.length&&(t=lr);for(var n=0,i=e.length;n<i;n++){var r=e[n];if(null!=r){if(a(r)||j(r)){t=lr;break}if(o(r)){t=ur;break}}}}else if(o(e))for(var s in e)if(J(e,s)&&y(e[s])){t=cr;break}return t}function fa(e){if(e){var t=u();return i(e,function(e){var n={name:(e=o(e)?e:{name:e}).name,displayName:e.displayName,type:e.type};if(null==n.name)return n;n.name+="",null==n.displayName&&(n.displayName=n.name);var i=t.get(n.name);return i?n.name+="-"+i.count++:t.set(n.name,{count:1}),n})}}function da(e,t,n,i){if(t===dr)for(var r=0;r<n.length&&r<i;r++)e(n[r]?n[r][0]:null,r);else{var a=n[0]||[];for(r=0;r<a.length&&r<i;r++)e(a[r],r)}}function ga(e){var t=e.sourceFormat;return t===ur||t===cr}var ma=
/** @class */function(){function e(e,t){var n=ua(e)?e:pa(e);this._source=n;var i=this._data=n.data;n.sourceFormat===pr&&(this._offset=0,this._dimSize=t,this._data=i),sa(this,i,n)}return e.prototype.getSource=function(){return this._source},e.prototype.count=function(){return 0},e.prototype.getItem=function(){},e.prototype.appendData=function(){},e.prototype.clean=function(){},e.protoInitialize=function(){var t=e.prototype;t.pure=!1,t.persistent=!0}(),e.internalField=function(){var e;sa=function(e,r,a){var o=a.sourceFormat,s=a.seriesLayoutBy,l=a.startIndex,u=a.dimensionsDefine,c=oa[Da(o,s)];if(d(e,c),o===pr)e.getItem=t,e.count=i,e.fillStorage=n;else{var p=_a(o,s);e.getItem=K(p,null,r,l,u);var h=Ma(o,s);e.count=K(h,null,r,l,u)}};var t=function(e,t){t=t||[];for(var n=this._data,i=this._dimSize,r=i*(e-=this._offset),a=0;a<i;a++)t[a]=n[r+a];return t},n=function(e,t,n,i){for(var r=this._data,a=this._dimSize,o=0;o<a;o++){for(var s=i[o],l=null==s[0]?1/0:s[0],u=null==s[1]?-1/0:s[1],c=t-e,p=n[o],h=0;h<c;h++){var f=r[h*a+o];p[e+h]=f,f<l&&(l=f),f>u&&(u=f)}s[0]=l,s[1]=u}},i=function(){return this._data?this._data.length/this._dimSize:0};function r(e){for(var t=0;t<e.length;t++)this._data.push(e[t])}(e={})[lr+"_"+fr]={pure:!0,appendData:r},e[lr+"_"+dr]={pure:!0,appendData:function(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".')}},e[ur]={pure:!0,appendData:r},e[cr]={pure:!0,appendData:function(e){var t=this._data;c(e,function(e,n){for(var i=t[n]||(t[n]=[]),r=0;r<(e||[]).length;r++)i.push(e[r])})}},e[sr]={appendData:r},e[pr]={persistent:!1,pure:!0,appendData:function(e){this._data=e},
// Clean self if data is already used.
clean:function(){this._offset+=this.count(),this._data=null}},oa=e}(),e}(),va=function(e,t,n,i){return e[i]},ya=((ia={})[lr+"_"+fr]=function(e,t,n,i){return e[i+t]},ia[lr+"_"+dr]=function(e,t,n,i,r){i+=t;for(var a=r||[],o=e,s=0;s<o.length;s++){var l=o[s];a[s]=l?l[i]:null}return a},ia[ur]=va,ia[cr]=function(e,t,n,i,r){for(var a=r||[],o=0;o<n.length;o++){var s=e[n[o].name];a[o]=s?s[i]:null}return a},ia[sr]=va,ia);function _a(e,t){return ya[Da(e,t)]}var xa=function(e){return e.length},wa=((ra={})[lr+"_"+fr]=function(e,t){return Math.max(0,e.length-t)},ra[lr+"_"+dr]=function(e,t){var n=e[0];return n?Math.max(0,n.length-t):0},ra[ur]=xa,ra[cr]=function(e,t,n){var i=e[n[0].name];return i?i.length:0},ra[sr]=xa,ra);function Ma(e,t){return wa[Da(e,t)]}var ba=function(e,t){return e[t]},Sa=((aa={})[lr]=ba,aa[ur]=function(e,t,n){return e[n]},aa[cr]=ba,aa[sr]=function(e,t){var n=pt(e);return n instanceof Array?n[t]:n},aa[pr]=ba,aa);function Ia(e){return Sa[e]}function Da(e,t){return e===lr?e+"_"+t:e}function Ca(e,t,n){if(e){var i=e.getRawDataItem(t);if(null!=i){var r=e.getStore(),a=r.getSource().sourceFormat;if(null!=n){var o=e.getDimensionIndex(n),s=r.getDimensionProperty(o);return Ia(a)(i,o,s)}var l=i;return a===sr&&(l=pt(i)),l}}}var Ta=/\{@(.+?)\}/g,ka=
/** @class */function(){function e(){}return e.prototype.getDataParams=function(e,t){var n=this.getData(t),i=this.getRawValue(e,t),r=n.getRawIndex(e),a=n.getName(e),o=n.getRawDataItem(e),s=n.getItemVisual(e,"style"),l=s&&s[n.getItemVisual(e,"drawType")||"fill"],u=s&&s.stroke,c=this.mainType,p="series"===c,h=n.userOutput&&n.userOutput.get();return{componentType:c,componentSubType:this.subType,componentIndex:this.componentIndex,seriesType:p?this.subType:null,seriesIndex:this.seriesIndex,seriesId:p?this.id:null,seriesName:p?this.name:null,name:a,dataIndex:r,data:o,dataType:t,value:i,color:l,borderColor:u,dimensionNames:h?h.fullDimensions:null,encode:h?h.encode:null,
// Param name list for mapping `a`, `b`, `c`, `d`, `e`
$vars:["seriesName","name","value"]}},e.prototype.getFormattedLabel=function(e,n,i,r,o,s){n=n||"normal";var l=this.getData(i),u=this.getDataParams(e,i);return s&&(u.value=s.interpolatedValue),null!=r&&a(u.value)&&(u.value=u.value[r]),o||(o=l.getItemModel(e).get("normal"===n?["label","formatter"]:[n,"label","formatter"])),g(o)?(u.status=n,u.dimensionIndex=r,o(u)):t(o)?qi(o,u).replace(Ta,function(t,n){var i=n.length,r=n;"["===r.charAt(0)&&"]"===r.charAt(i-1)&&(r=+r.slice(1,i-1));var o=Ca(l,e,r);if(s&&a(s.interpolatedValue)){var u=l.getDimensionIndex(r);u>=0&&(o=s.interpolatedValue[u])}return null!=o?o+"":""}):void 0},e.prototype.getRawValue=function(e,t){return Ca(this.getData(t),e)},e.prototype.formatTooltip=function(){},e}();function Oa(e){return new La(e)}var La=
/** @class */function(){function e(e){this._reset=(e=e||{}).reset,this._plan=e.plan,this._count=e.count,this._onDirty=e.onDirty,this._dirty=!0}return e.prototype.perform=function(e){var t,n=this._upstream,i=e&&e.skip;if(this._dirty&&n){var r=this.context;r.data=r.outputData=n.context.outputData}this.__pipeline&&(this.__pipeline.currentTask=this),this._plan&&!i&&(t=this._plan(this.context));var o,s=p(this._modBy),l=this._modDataCount||0,u=p(e&&e.modBy),c=e&&e.modDataCount||0;function p(e){return!(e>=1)&&(e=1),e}s===u&&l===c||(t="reset"),(this._dirty||"reset"===t)&&(this._dirty=!1,o=this._doReset(i)),this._modBy=u,this._modDataCount=c;var h=e&&e.step;if(this._dueEnd=n?n._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var f=this._dueIndex,d=Math.min(null!=h?this._dueIndex+h:1/0,this._dueEnd);if(!i&&(o||f<d)){var g=this._progress;if(a(g))for(var m=0;m<g.length;m++)this._doProgress(g[m],f,d,u,c);else this._doProgress(g,f,d,u,c)}this._dueIndex=d,this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:d}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished()},e.prototype.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context)},e.prototype._doProgress=function(e,t,n,i,r){Aa.reset(t,n,i,r),this._callingProgress=e,this._callingProgress({start:t,end:n,count:n-t,next:Aa.next},this.context)},e.prototype._doReset=function(e){var t,n;this._dueIndex=this._outputDueEnd=this._dueEnd=0,this._settedOutputEnd=null,!e&&this._reset&&((t=this._reset(this.context))&&t.progress&&(n=t.forceFirstProgress,t=t.progress),a(t)&&!t.length&&(t=null)),this._progress=t,this._modBy=this._modDataCount=null;var i=this._downstream;return i&&i.dirty(),n},e.prototype.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd},e.prototype.pipe=function(e){(this._downstream!==e||this._dirty)&&(this._downstream=e,e._upstream=this,e.dirty())},e.prototype.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0)},e.prototype.getUpstream=function(){return this._upstream},e.prototype.getDownstream=function(){return this._downstream},e.prototype.setOutputEnd=function(e){this._outputDueEnd=this._settedOutputEnd=e},e}(),Aa=function(){var e,t,n,i,r,a={reset:function(l,u,c,p){t=l,e=u,n=c,i=p,r=Math.ceil(i/n),a.next=n>1&&i>0?s:o}};return a;function o(){return t<e?t++:null}function s(){var a=t%r*n+Math.ceil(t/r),o=t>=e?null:a<i?a:t;return t++,o}}();function Na(e,t){var n=t&&t.type;return"ordinal"===n?e:("time"!==n||s(e)||null==e||"-"===e||(e=+$e(e)),null==e||""===e?NaN:Number(e))}u({number:function(e){return parseFloat(e)},time:function(e){return+$e(e)},trim:function(e){return t(e)?V(e):e}});var Ra=
/** @class */function(){function e(){}return e.prototype.getRawData=function(){throw new Error("not supported")},e.prototype.getRawDataItem=function(){throw new Error("not supported")},e.prototype.cloneRawData=function(){},e.prototype.getDimensionInfo=function(){},e.prototype.cloneAllDimensionInfo=function(){},e.prototype.count=function(){},e.prototype.retrieveValue=function(){},e.prototype.retrieveValueFromItem=function(){},e.prototype.convertValue=function(e,t){return Na(e,t)},e}();function Ea(e){return Ua(e.sourceFormat)||at(""),e.data}function Pa(e){var t=e.sourceFormat,n=e.data;if(Ua(t)||at(""),t===lr){for(var i=[],r=0,a=n.length;r<a;r++)i.push(n[r].slice());return i}if(t===ur){for(i=[],r=0,a=n.length;r<a;r++)i.push(d({},n[r]));return i}}function Ba(e,t,n){if(null!=n)return s(n)||!isNaN(n)&&!J(t,n)?e[n]:J(t,n)?t[n]:void 0}function Va(e){return U(e)}var Fa=u();function za(e,t){t.length||at(""),o(e)||at("");var n=Fa.get(e.type);n||at("");var r=i(t,function(e){return function(e,t){var n=new Ra,i=e.data,r=n.sourceFormat=e.sourceFormat,a=e.startIndex;e.seriesLayoutBy!==fr&&at("");var o=[],s={},l=e.dimensionsDefine;if(l)c(l,function(e,t){var n=e.name,i={index:t,name:n,displayName:e.displayName};o.push(i),null!=n&&(J(s,n)&&at(""),s[n]=i)});else for(var u=0;u<e.dimensionsDetectedCount;u++)o.push({index:u});var p=_a(r,fr);t.__isBuiltIn&&(n.getRawDataItem=function(e){return p(i,a,o,e)},n.getRawData=K(Ea,null,e)),n.cloneRawData=K(Pa,null,e);var h=Ma(r,fr);n.count=K(h,null,i,a,o);var f=Ia(r);n.retrieveValue=function(e,t){var n=p(i,a,o,e);return d(n,t)};var d=n.retrieveValueFromItem=function(e,t){if(null!=e){var n=o[t];return n?f(e,t,n.name):void 0}};return n.getDimensionInfo=K(Ba,null,o,s),n.cloneAllDimensionInfo=K(Va,null,o),n}(e,n)}),a=lt(n.transform({upstream:r[0],upstreamList:r,config:U(e.config)}));return i(a,function(e,n){var i;o(e)||at(""),e.data||at(""),Ua(ha(e.data))||at("");var r=t[0];if(r&&0===n&&!e.dimensions){var a=r.startIndex;a&&(e.data=r.data.slice(0,a).concat(e.data)),i={seriesLayoutBy:fr,sourceHeader:a,dimensions:r.metaRawOption.dimensions}}else i={seriesLayoutBy:fr,sourceHeader:0,dimensions:e.dimensions};return ca(e.data,i,null)})}function Ua(e){return e===lr||e===ur}var Ga,Ha="undefined",Wa=typeof Uint32Array===Ha?Array:Uint32Array,Ya=typeof Uint16Array===Ha?Array:Uint16Array,Za=typeof Int32Array===Ha?Array:Int32Array,qa=typeof Float64Array===Ha?Array:Float64Array,ja={float:qa,int:Za,
// Ordinal data type can be string or int
ordinal:Array,number:Array,time:qa};function Xa(e){return e>65535?Wa:Ya}function Ka(){return[1/0,-1/0]}function $a(e){var t=e.constructor;return t===Array?e.slice():new t(e)}function Ja(e,t,n,i,r){var a=ja[n||"float"];if(r){var o=e[t],s=o&&o.length;if(s!==i){for(var l=new a(i),u=0;u<s;u++)l[u]=o[u];e[t]=l}}else e[t]=new a(i)}var Qa=
/** @class */function(){function e(){this._chunks=[],this._rawExtent=[],this._extent=[],this._count=0,this._rawCount=0,this._calcDimNameToIdx=u()}return e.prototype.initData=function(e,t,n){this._provider=e,this._chunks=[],this._indices=null,this.getRawIndex=this._getRawIdxIdentity;var r=e.getSource(),a=this.defaultDimValueGetter=Ga[r.sourceFormat];this._dimValueGetter=n||a,this._rawExtent=[],ga(r),this._dimensions=i(t,function(e){return{
// Only pick these two props. Not leak other properties like orderMeta.
type:e.type,property:e.property}}),this._initDataFromProvider(0,e.count())},e.prototype.getProvider=function(){return this._provider},e.prototype.getSource=function(){return this._provider.getSource()},e.prototype.ensureCalculationDimension=function(e,t){var n=this._calcDimNameToIdx,i=this._dimensions,r=n.get(e);if(null!=r){if(i[r].type===t)return r}else r=i.length;return i[r]={type:t},n.set(e,r),this._chunks[r]=new ja[t||"float"](this._rawCount),this._rawExtent[r]=[1/0,-1/0],r},e.prototype.collectOrdinalMeta=function(e,t){var n=this._chunks[e],i=this._dimensions[e],r=this._rawExtent,a=i.ordinalOffset||0,o=n.length;0===a&&(r[e]=[1/0,-1/0]);for(var s=r[e],l=a;l<o;l++){var u=n[l]=t.parseAndCollect(n[l]);isNaN(u)||(s[0]=Math.min(u,s[0]),s[1]=Math.max(u,s[1]))}i.ordinalMeta=t,i.ordinalOffset=o,i.type="ordinal"},e.prototype.getOrdinalMeta=function(e){return this._dimensions[e].ordinalMeta},e.prototype.getDimensionProperty=function(e){var t=this._dimensions[e];return t&&t.property},e.prototype.appendData=function(e){var t=this._provider,n=this.count();t.appendData(e);var i=t.count();return t.persistent||(i+=n),n<i&&this._initDataFromProvider(n,i,!0),[n,i]},e.prototype.appendValues=function(e,t){for(var n=this._chunks,i=this._dimensions,r=i.length,a=this._rawExtent,o=this.count(),s=o+Math.max(e.length,t||0),l=0;l<r;l++)Ja(n,l,i[l].type,s,!0);for(var u=[],c=o;c<s;c++)for(var p=c-o,h=0;h<r;h++){var f=Ga.arrayRows.call(this,e[p]||u,i[h].property,p,h);n[h][c]=f;var d=a[h];f<d[0]&&(d[0]=f),f>d[1]&&(d[1]=f)}return this._rawCount=this._count=s,{start:o,end:s}},e.prototype._initDataFromProvider=function(e,t,n){for(var r=this._provider,a=this._chunks,o=this._dimensions,s=o.length,l=this._rawExtent,u=i(o,function(e){return e.property}),c=0;c<s;c++){var p=o[c];l[c]||(l[c]=Ka()),Ja(a,c,p.type,t,n)}if(r.fillStorage)r.fillStorage(e,t,a,l);else for(var h=[],f=e;f<t;f++){h=r.getItem(f,h);for(var d=0;d<s;d++){var g=a[d],m=this._dimValueGetter(h,u[d],f,d);g[f]=m;var v=l[d];m<v[0]&&(v[0]=m),m>v[1]&&(v[1]=m)}}!r.persistent&&r.clean&&r.clean(),this._rawCount=this._count=t,this._extent=[]},e.prototype.count=function(){return this._count},e.prototype.get=function(e,t){if(!(t>=0&&t<this._count))return NaN;var n=this._chunks[e];return n?n[this.getRawIndex(t)]:NaN},e.prototype.getValues=function(e,t){var n=[],i=[];if(null==t){t=e,e=[];for(var r=0;r<this._dimensions.length;r++)i.push(r)}else i=e;r=0;for(var a=i.length;r<a;r++)n.push(this.get(i[r],t));return n},e.prototype.getByRawIndex=function(e,t){if(!(t>=0&&t<this._rawCount))return NaN;var n=this._chunks[e];return n?n[t]:NaN},e.prototype.getSum=function(e){var t=0;if(this._chunks[e])for(var n=0,i=this.count();n<i;n++){var r=this.get(e,n);isNaN(r)||(t+=r)}return t},e.prototype.getMedian=function(e){var t=[];this.each([e],function(e){isNaN(e)||t.push(e)});var n=t.sort(function(e,t){return e-t}),i=this.count();return 0===i?0:i%2==1?n[(i-1)/2]:(n[i/2]+n[i/2-1])/2},e.prototype.indexOfRawIndex=function(e){if(e>=this._rawCount||e<0)return-1;if(!this._indices)return e;var t=this._indices,n=t[e];if(null!=n&&n<this._count&&n===e)return e;for(var i=0,r=this._count-1;i<=r;){var a=(i+r)/2|0;if(t[a]<e)i=a+1;else{if(!(t[a]>e))return a;r=a-1}}return-1},e.prototype.indicesOfNearest=function(e,t,n){var i=this._chunks[e],r=[];if(!i)return r;null==n&&(n=1/0);for(var a=1/0,o=-1,s=0,l=0,u=this.count();l<u;l++){var c=t-i[this.getRawIndex(l)],p=Math.abs(c);p<=n&&((p<a||p===a&&c>=0&&o<0)&&(a=p,o=c,s=0),c===o&&(r[s++]=l))}return r.length=s,r},e.prototype.getIndices=function(){var e,t=this._indices;if(t){var n=this._count;if((r=t.constructor)===Array){e=new r(n);for(var i=0;i<n;i++)e[i]=t[i]}else e=new r(t.buffer,0,n)}else{var r;for(e=new(r=Xa(this._rawCount))(this.count()),i=0;i<e.length;i++)e[i]=i}return e},e.prototype.filter=function(e,t){if(!this._count)return this;for(var n=this.clone(),i=n.count(),r=new(Xa(n._rawCount))(i),a=[],o=e.length,s=0,l=e[0],u=n._chunks,c=0;c<i;c++){var p=void 0,h=n.getRawIndex(c);if(0===o)p=t(c);else if(1===o)p=t(u[l][h],c);else{for(var f=0;f<o;f++)a[f]=u[e[f]][h];a[f]=c,p=t.apply(null,a)}p&&(r[s++]=h)}return s<i&&(n._indices=r),n._count=s,n._extent=[],n._updateGetRawIdx(),n},e.prototype.selectRange=function(e){var t=this.clone(),n=t._count;if(!n)return this;var i=_(e),r=i.length;if(!r)return this;var a=t.count(),o=new(Xa(t._rawCount))(a),s=0,l=i[0],u=e[l][0],c=e[l][1],p=t._chunks,h=!1;if(!t._indices){var f=0;if(1===r){for(var d=p[i[0]],g=0;g<n;g++)((S=d[g])>=u&&S<=c||isNaN(S))&&(o[s++]=f),f++;h=!0}else if(2===r){d=p[i[0]];var m=p[i[1]],v=e[i[1]][0],y=e[i[1]][1];for(g=0;g<n;g++){var x=m[g];((S=d[g])>=u&&S<=c||isNaN(S))&&(x>=v&&x<=y||isNaN(x))&&(o[s++]=f),f++}h=!0}}if(!h)if(1===r)for(g=0;g<a;g++){var w=t.getRawIndex(g);((S=p[i[0]][w])>=u&&S<=c||isNaN(S))&&(o[s++]=w)}else for(g=0;g<a;g++){for(var M=!0,b=(w=t.getRawIndex(g),0);b<r;b++){var S,I=i[b];((S=p[I][w])<e[I][0]||S>e[I][1])&&(M=!1)}M&&(o[s++]=t.getRawIndex(g))}return s<a&&(t._indices=o),t._count=s,t._extent=[],t._updateGetRawIdx(),t},e.prototype.map=function(e,t){var n=this.clone(e);return this._updateDims(n,e,t),n},e.prototype.modify=function(e,t){this._updateDims(this,e,t)},e.prototype._updateDims=function(e,t,n){for(var i=e._chunks,r=[],a=t.length,o=e.count(),s=[],l=e._rawExtent,u=0;u<t.length;u++)l[t[u]]=Ka();for(var c=0;c<o;c++){for(var p=e.getRawIndex(c),h=0;h<a;h++)s[h]=i[t[h]][p];s[a]=c;var f=n&&n.apply(null,s);if(null!=f)for("object"!=typeof f&&(r[0]=f,f=r),u=0;u<f.length;u++){var d=t[u],g=f[u],m=l[d],v=i[d];v&&(v[p]=g),g<m[0]&&(m[0]=g),g>m[1]&&(m[1]=g)}}},e.prototype.lttbDownSample=function(e,t){var n,i,r,a=this.clone([e],!0),o=a._chunks[e],s=this.count(),l=0,u=Math.floor(1/t),c=this.getRawIndex(0),p=new(Xa(this._rawCount))(Math.min(2*(Math.ceil(s/u)+2),s));p[l++]=c;for(var h=1;h<s-1;h+=u){for(var f=Math.min(h+u,s-1),d=Math.min(h+2*u,s),g=(d+f)/2,m=0,v=f;v<d;v++){var y=o[I=this.getRawIndex(v)];isNaN(y)||(m+=y)}m/=d-f;var _=h,x=Math.min(h+u,s),w=h-1,M=o[c];n=-1,r=_;var b=-1,S=0;for(v=_;v<x;v++){var I;y=o[I=this.getRawIndex(v)],isNaN(y)?(S++,b<0&&(b=I)):(i=Math.abs((w-g)*(y-M)-(w-v)*(m-M)))>n&&(n=i,r=I)}S>0&&S<x-_&&(p[l++]=Math.min(b,r),r=Math.max(b,r)),p[l++]=r,c=r}return p[l++]=this.getRawIndex(s-1),a._count=l,a._indices=p,a.getRawIndex=this._getRawIdx,a},e.prototype.minmaxDownSample=function(e,t){for(var n=this.clone([e],!0),i=n._chunks,r=Math.floor(1/t),a=i[e],o=this.count(),s=new(Xa(this._rawCount))(2*Math.ceil(o/r)),l=0,u=0;u<o;u+=r){var c=u,p=a[this.getRawIndex(c)],h=u,f=a[this.getRawIndex(h)],d=r;u+r>o&&(d=o-u);for(var g=0;g<d;g++){var m=a[this.getRawIndex(u+g)];m<p&&(p=m,c=u+g),m>f&&(f=m,h=u+g)}var v=this.getRawIndex(c),y=this.getRawIndex(h);c<h?(s[l++]=v,s[l++]=y):(s[l++]=y,s[l++]=v)}return n._count=l,n._indices=s,n._updateGetRawIdx(),n},e.prototype.downSample=function(e,t,n,i){for(var r=this.clone([e],!0),a=r._chunks,o=[],s=Math.floor(1/t),l=a[e],u=this.count(),c=r._rawExtent[e]=[1/0,-1/0],p=new(Xa(this._rawCount))(Math.ceil(u/s)),h=0,f=0;f<u;f+=s){s>u-f&&(o.length=s=u-f);for(var d=0;d<s;d++){var g=this.getRawIndex(f+d);o[d]=l[g]}var m=n(o),v=this.getRawIndex(Math.min(f+i(o,m)||0,u-1));l[v]=m,m<c[0]&&(c[0]=m),m>c[1]&&(c[1]=m),p[h++]=v}return r._count=h,r._indices=p,r._updateGetRawIdx(),r},e.prototype.each=function(e,t){if(this._count)for(var n=e.length,i=this._chunks,r=0,a=this.count();r<a;r++){var o=this.getRawIndex(r);switch(n){case 0:t(r);break;case 1:t(i[e[0]][o],r);break;case 2:t(i[e[0]][o],i[e[1]][o],r);break;default:for(var s=0,l=[];s<n;s++)l[s]=i[e[s]][o];l[s]=r,t.apply(null,l)}}},e.prototype.getDataExtent=function(e){var t=this._chunks[e],n=[1/0,-1/0];if(!t)return n;var i,r=this.count();if(!this._indices)return this._rawExtent[e].slice();if(i=this._extent[e])return i.slice();for(var a=(i=n)[0],o=i[1],s=0;s<r;s++){var l=t[this.getRawIndex(s)];l<a&&(a=l),l>o&&(o=l)}return this._extent[e]=i=[a,o],i},e.prototype.getRawDataItem=function(e){var t=this.getRawIndex(e);if(this._provider.persistent)return this._provider.getItem(t);for(var n=[],i=this._chunks,r=0;r<i.length;r++)n.push(i[r][t]);return n},e.prototype.clone=function(t,i){var r=new e,a=this._chunks,o=t&&n(t,function(e,t){return e[t]=!0,e},{});if(o)for(var s=0;s<a.length;s++)r._chunks[s]=o[s]?$a(a[s]):a[s];else r._chunks=a;return this._copyCommonProps(r),i||(r._indices=this._cloneIndices()),r._updateGetRawIdx(),r},e.prototype._copyCommonProps=function(e){e._count=this._count,e._rawCount=this._rawCount,e._provider=this._provider,e._dimensions=this._dimensions,e._extent=U(this._extent),e._rawExtent=U(this._rawExtent)},e.prototype._cloneIndices=function(){if(this._indices){var e=this._indices.constructor,t=void 0;if(e===Array){var n=this._indices.length;t=new e(n);for(var i=0;i<n;i++)t[i]=this._indices[i]}else t=new e(this._indices);return t}return null},e.prototype._getRawIdxIdentity=function(e){return e},e.prototype._getRawIdx=function(e){return e<this._count&&e>=0?this._indices[e]:-1},e.prototype._updateGetRawIdx=function(){this.getRawIndex=this._indices?this._getRawIdx:this._getRawIdxIdentity},e.internalField=function(){function e(e,t,n,i){return Na(e[i],this._dimensions[i])}Ga={arrayRows:e,objectRows:function(e,t,n,i){return Na(e[t],this._dimensions[i])},keyedColumns:e,original:function(e,t,n,i){var r=e&&(null==e.value?e:e.value);return Na(r instanceof Array?r[i]:r,this._dimensions[i])},typedArray:function(e,t,n,i){return e[i]}}}(),e}(),eo=
/** @class */function(){function e(e){this._sourceList=[],this._storeList=[],this._upstreamSignList=[],this._versionSignBase=0,this._dirty=!0,this._sourceHost=e}return e.prototype.dirty=function(){this._setLocalSource([],[]),this._storeList=[],this._dirty=!0},e.prototype._setLocalSource=function(e,t){this._sourceList=e,this._upstreamSignList=t,this._versionSignBase++,this._versionSignBase>9e10&&(this._versionSignBase=0)},e.prototype._getVersionSign=function(){return this._sourceHost.uid+"_"+this._versionSignBase},e.prototype.prepareSource=function(){this._isDirty()&&(this._createSource(),this._dirty=!1)},e.prototype._createSource=function(){this._setLocalSource([],[]);var e,t,n=this._sourceHost,i=this._getUpstreamSourceManagers(),r=!!i.length;if(no(n)){var a=n,o=void 0,s=void 0,l=void 0;if(r){var u=i[0];u.prepareSource(),o=(l=u.getSource()).data,s=l.sourceFormat,t=[u._getVersionSign()]}else o=a.get("data",!0),s=j(o)?pr:sr,t=[];var c=this._getSourceMetaRawOption()||{},p=l&&l.metaRawOption||{},h=x(c.seriesLayoutBy,p.seriesLayoutBy)||null,f=x(c.sourceHeader,p.sourceHeader),d=x(c.dimensions,p.dimensions);e=h!==p.seriesLayoutBy||!!f!=!!p.sourceHeader||d?[ca(o,{seriesLayoutBy:h,sourceHeader:f,dimensions:d},s)]:[]}else{var g=n;if(r){var m=this._applyTransform(i);e=m.sourceList,t=m.upstreamSignList}else e=[ca(g.get("source",!0),this._getSourceMetaRawOption(),null)],t=[]}this._setLocalSource(e,t)},e.prototype._applyTransform=function(e){var t,n=this._sourceHost,i=n.get("transform",!0),r=n.get("fromTransformResult",!0);null!=r&&1!==e.length&&io("");var a,o=[],s=[];return c(e,function(e){e.prepareSource();var t=e.getSource(r||0);null==r||t||io(""),o.push(t),s.push(e._getVersionSign())}),i?t=function(e,t){var n=lt(e),i=n.length;i||at("");for(var r=0,a=i;r<a;r++)t=za(n[r],t),r!==a-1&&(t.length=Math.max(t.length,1));return t}(i,o):null!=r&&(t=[(a=o[0],new la({data:a.data,sourceFormat:a.sourceFormat,seriesLayoutBy:a.seriesLayoutBy,dimensionsDefine:U(a.dimensionsDefine),startIndex:a.startIndex,dimensionsDetectedCount:a.dimensionsDetectedCount}))]),{sourceList:t,upstreamSignList:s}},e.prototype._isDirty=function(){if(this._dirty)return!0;for(var e=this._getUpstreamSourceManagers(),t=0;t<e.length;t++){var n=e[t];if(
// Consider the case that there is ancestor diry, call it recursively.
// The performance is probably not an issue because usually the chain is not long.
n._isDirty()||this._upstreamSignList[t]!==n._getVersionSign())return!0}},e.prototype.getSource=function(e){var t=this._sourceList[e=e||0];if(!t){var n=this._getUpstreamSourceManagers();return n[0]&&n[0].getSource(e)}return t},e.prototype.getSharedDataStore=function(e){var t=e.makeStoreSchema();return this._innerGetDataStore(t.dimensions,e.source,t.hash)},e.prototype._innerGetDataStore=function(e,t,n){var i=this._storeList,r=i[0];r||(r=i[0]={});var a=r[n];if(!a){var o=this._getUpstreamSourceManagers()[0];no(this._sourceHost)&&o?a=o._innerGetDataStore(e,t,n):(a=new Qa).initData(new ma(t,e.length),e),r[n]=a}return a},e.prototype._getUpstreamSourceManagers=function(){var e=this._sourceHost;if(no(e)){var t=vr(e);return t?[t.getSourceManager()]:[]}return i(function(e){
// Only these attributes declared, we by default reference to `datasetIndex: 0`.
// Otherwise, no reference.
return e.get("transform",!0)||e.get("fromTransformResult",!0)?St(e.ecModel,"dataset",{index:e.get("fromDatasetIndex",!0),id:e.get("fromDatasetId",!0)},bt).models:[]}(e),function(e){return e.getSourceManager()})},e.prototype._getSourceMetaRawOption=function(){var e,t,n,i=this._sourceHost;if(no(i))e=i.get("seriesLayoutBy",!0),t=i.get("sourceHeader",!0),n=i.get("dimensions",!0);else if(!this._getUpstreamSourceManagers().length){var r=i;e=r.get("seriesLayoutBy",!0),t=r.get("sourceHeader",!0),n=r.get("dimensions",!0)}return{seriesLayoutBy:e,sourceHeader:t,dimensions:n}},e}();function to(e){e.option.transform&&$(e.option.transform)}function no(e){return"series"===e.mainType}function io(e){throw new Error(e)}function ro(e,t){return t.type=e,t}var ao=_t();function oo(e,t){return e.getName(t)||e.getId(t)}var so=
/** @class */function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t._selectedDataIndicesMap={},t}return h(i,e),i.prototype.init=function(e,t,n){this.seriesIndex=this.componentIndex,this.dataTask=Oa({count:uo,reset:co}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(e,n),(ao(this).sourceManager=new eo(this)).prepareSource();var i=this.getInitialData(e,n);ho(i,this),this.dataTask.context.data=i,ao(this).dataBeforeProcessed=i,lo(this),this._initSelectedMapFromData(i)},i.prototype.mergeDefaultAndTheme=function(e,t){var n=Ji(this),i=n?er(e):{},r=this.subType;nr.hasClass(r)&&(r+="Series"),z(e,t.getTheme().get(this.subType)),z(e,this.getDefaultOption()),ut(e,"label",["show"]),this.fillDataTextStyle(e.data),n&&Qi(e,i,n)},i.prototype.mergeOption=function(e,t){e=z(this.option,e,!0),this.fillDataTextStyle(e.data);var n=Ji(this);n&&Qi(this.option,e,n);var i=ao(this).sourceManager;i.dirty(),i.prepareSource();var r=this.getInitialData(e,t);ho(r,this),this.dataTask.dirty(),this.dataTask.context.data=r,ao(this).dataBeforeProcessed=r,lo(this),this._initSelectedMapFromData(r)},i.prototype.fillDataTextStyle=function(e){if(e&&!j(e))for(var t=["show"],n=0;n<e.length;n++)e[n]&&e[n].label&&ut(e[n],"label",t)},i.prototype.getInitialData=function(){},i.prototype.appendData=function(e){this.getRawData().appendData(e.data)},i.prototype.getData=function(e){var t=go(this);if(t){var n=t.context.data;return null!=e&&n.getLinkedData?n.getLinkedData(e):n}return ao(this).data},i.prototype.getAllData=function(){var e=this.getData();return e&&e.getLinkedDataAll?e.getLinkedDataAll():[{data:e}]},i.prototype.setData=function(e){var t=go(this);if(t){var n=t.context;n.outputData=e,t!==this.dataTask&&(n.data=e)}ao(this).data=e},i.prototype.getEncode=function(){var e=this.get("encode",!0);if(e)return u(e)},i.prototype.getSourceManager=function(){return ao(this).sourceManager},i.prototype.getSource=function(){return this.getSourceManager().getSource()},i.prototype.getRawData=function(){return ao(this).dataBeforeProcessed},i.prototype.getColorBy=function(){return this.get("colorBy")||"series"},i.prototype.isColorBySeries=function(){return"series"===this.getColorBy()},i.prototype.getBaseAxis=function(){var e=this.coordinateSystem;return e&&e.getBaseAxis&&e.getBaseAxis()},i.prototype.formatTooltip=function(e,i){return function(e){var i,r,s,l,u=e.series,p=e.dataIndex,h=e.multipleSeries,f=u.getData(),d=f.mapDimensionsAll("defaultedTooltip"),g=d.length,m=u.getRawValue(p),v=a(m),y=function(e,n){return function(e,n){return n=n||"transparent",t(e)?e:o(e)&&e.colorStops&&(e.colorStops[0]||{}).color||n}(e.getData().getItemVisual(n,"style")[e.visualDrawType])}(u,p);if(g>1||v&&!g){var _=function(e,t,i,r,a){
// check: category-no-encode-has-axis-data in dataset.html
var o=t.getData(),s=n(e,function(e,t,n){var i=o.getDimensionInfo(n);return e||i&&!1!==i.tooltip&&null!=i.displayName},!1),l=[],u=[],p=[];function h(e,t){var n=o.getDimensionInfo(t);
// If `dimInfo.tooltip` is not set, show tooltip.
n&&!1!==n.otherDims.tooltip&&(s?p.push(ro("nameValue",{markerType:"subItem",markerColor:a,name:n.displayName,value:e,valueType:n.type})):(l.push(e),u.push(n.type)))}return r.length?c(r,function(e){h(Ca(o,i,e),e)}):c(e,h),{inlineValues:l,inlineValueTypes:u,blocks:p}}(m,u,p,d,y);i=_.inlineValues,r=_.inlineValueTypes,s=_.blocks,
// Only support tooltip sort by the first inline value. It's enough in most cases.
l=_.inlineValues[0]}else if(g){var x=f.getDimensionInfo(d[0]);l=i=Ca(f,p,d[0]),r=x.type}else l=i=v?m[0]:m;
// Do not show generated series name. It might not be readable.
var w=mt(u),M=w&&u.name||"",b=f.getName(p),S=h?M:b;return ro("section",{header:M,
// When series name is not specified, do not show a header line with only '-'.
// This case always happens in tooltip.trigger: 'item'.
noHeader:h||!w,sortParam:l,blocks:[ro("nameValue",{markerType:"item",markerColor:y,
// Do not mix display seriesName and itemName in one tooltip,
// which might confuses users.
name:S,
// name dimension might be auto assigned, where the name might
// be not readable. So we check trim here.
noName:!V(S),value:i,valueType:r,dataIndex:p})].concat(s||[])})}({series:this,dataIndex:e,multipleSeries:i})},i.prototype.isAnimationEnabled=function(){var e=this.ecModel;if(G.node&&(!e||!e.ssr))return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),!!t},i.prototype.restoreData=function(){this.dataTask.dirty()},i.prototype.getColorFromPalette=function(e,t,n){var i=this.ecModel,r=Sr.prototype.getColorFromPalette.call(this,e,t,n);return r||(r=i.getColorFromPalette(e,t,n)),r},i.prototype.coordDimToDataDim=function(e){return this.getRawData().mapDimensionsAll(e)},i.prototype.getProgressive=function(){return this.get("progressive")},i.prototype.getProgressiveThreshold=function(){return this.get("progressiveThreshold")},i.prototype.select=function(e,t){this._innerSelect(this.getData(t),e)},i.prototype.unselect=function(e,t){var n=this.option.selectedMap;if(n){var i=this.option.selectedMode,r=this.getData(t);if("series"===i||"all"===n)return this.option.selectedMap={},void(this._selectedDataIndicesMap={});for(var a=0;a<e.length;a++){var o=oo(r,e[a]);n[o]=!1,this._selectedDataIndicesMap[o]=-1}}},i.prototype.toggleSelect=function(e,t){for(var n=[],i=0;i<e.length;i++)n[0]=e[i],this.isSelected(e[i],t)?this.unselect(n,t):this.select(n,t)},i.prototype.getSelectedDataIndices=function(){if("all"===this.option.selectedMap)return[].slice.call(this.getData().getIndices());for(var e=this._selectedDataIndicesMap,t=_(e),n=[],i=0;i<t.length;i++){var r=e[t[i]];r>=0&&n.push(r)}return n},i.prototype.isSelected=function(e,t){var n=this.option.selectedMap;if(!n)return!1;var i=this.getData(t);return("all"===n||n[oo(i,e)])&&!i.getItemModel(e).get(["select","disabled"])},i.prototype.isUniversalTransitionEnabled=function(){if(this.__universalTransitionEnabled)return!0;var e=this.option.universalTransition;return!!e&&(!0===e||e&&e.enabled)},i.prototype._innerSelect=function(e,t){var n,i,r=this.option,a=r.selectedMode,s=t.length;if(a&&s)if("series"===a)r.selectedMap="all";else if("multiple"===a){o(r.selectedMap)||(r.selectedMap={});for(var l=r.selectedMap,u=0;u<s;u++){var c=t[u];l[h=oo(e,c)]=!0,this._selectedDataIndicesMap[h]=e.getRawIndex(c)}}else if("single"===a||!0===a){var p=t[s-1],h=oo(e,p);r.selectedMap=((n={})[h]=!0,n),this._selectedDataIndicesMap=((i={})[h]=e.getRawIndex(p),i)}},i.prototype._initSelectedMapFromData=function(e){if(!this.option.selectedMap){var t=[];e.hasItemOption&&e.each(function(n){var i=e.getRawDataItem(n);i&&i.selected&&t.push(n)}),t.length>0&&this._innerSelect(e,t)}},i.registerClass=function(e){return nr.registerClass(e)},i.protoInitialize=function(){var e=i.prototype;e.type="series.__base__",e.seriesIndex=0,e.ignoreStyleOnData=!1,e.hasSymbolVisual=!1,e.defaultSymbol="circle",e.visualStyleAccessPath="itemStyle",e.visualDrawType="fill"}(),i}(nr);function lo(e){var t=e.name;mt(e)||(e.name=function(e){var t=e.getRawData(),n=t.mapDimensionsAll("seriesName"),i=[];return c(n,function(e){var n=t.getDimensionInfo(e);n.displayName&&i.push(n.displayName)}),i.join(" ")}(e)||t)}function uo(e){return e.model.getRawData().count()}function co(e){var t=e.model;return t.setData(t.getRawData().cloneShallow()),po}function po(e,t){t.outputData&&e.end>t.outputData.count()&&t.model.getRawData().cloneShallow(t.outputData)}function ho(e,t){c(Q(e.CHANGABLE_METHODS,e.DOWNSAMPLE_METHODS),function(n){e.wrapMethod(n,q(fo,t))})}function fo(e,t){var n=go(e);return n&&n.setOutputEnd((t||this).count()),t}function go(e){var t=(e.ecModel||{}).scheduler,n=t&&t.getPipeline(e.uid);if(n){var i=n.currentTask;if(i){var r=i.agentStubMap;r&&(i=r.get(e.uid))}return i}}H(so,ka),H(so,Sr),Ot(so,nr);var mo=/** @class */function(){function e(){this.group=new ee,this.uid=si("viewComponent")}return e.prototype.init=function(){},e.prototype.render=function(){},e.prototype.dispose=function(){},e.prototype.updateView=function(){
// Do nothing;
},e.prototype.updateLayout=function(){
// Do nothing;
},e.prototype.updateVisual=function(){
// Do nothing;
},
/**
   * Hook for toggle blur target series.
   * Can be used in marker for blur or leave blur the markers
   */
e.prototype.toggleBlurSeries=function(){
// Do nothing;
},
/**
   * Traverse the new rendered elements.
   *
   * It will traverse the new added element in progressive rendering.
   * And traverse all in normal rendering.
   */
e.prototype.eachRendered=function(e){var t=this.group;t&&t.traverse(e)},e}();kt(mo),Rt(mo);var vo=_t(),yo=
/**
 * @return {string} If large mode changed, return string 'reset';
 */
function(){var e=_t();return function(t){var n=e(t),i=t.pipelineContext,r=!!n.large,a=!!n.progressiveRender,o=n.large=!(!i||!i.large),s=n.progressiveRender=!(!i||!i.progressiveRender);return!(r===o&&a===s)&&"reset"}}(),_o=
/** @class */function(){function e(){this.group=new ee,this.uid=si("viewChart"),this.renderTask=Oa({plan:Mo,reset:bo}),this.renderTask.context={view:this}}return e.prototype.init=function(){},e.prototype.render=function(){},e.prototype.highlight=function(e,t,n,i){var r=e.getData(i&&i.dataType);r&&wo(r,i,"emphasis")},e.prototype.downplay=function(e,t,n,i){var r=e.getData(i&&i.dataType);r&&wo(r,i,"normal")},e.prototype.remove=function(){this.group.removeAll()},e.prototype.dispose=function(){},e.prototype.updateView=function(e,t,n,i){this.render(e,t,n,i)},e.prototype.updateLayout=function(e,t,n,i){this.render(e,t,n,i)},e.prototype.updateVisual=function(e,t,n,i){this.render(e,t,n,i)},e.prototype.eachRendered=function(e){!function(e,t){if(e)if(a(e))for(var n=0;n<e.length;n++)zn(e[n],t);else zn(e,t)}(this.group,e)},e.markUpdateMethod=function(e,t){vo(e).updateMethod=t},e.protoInitialize=void(e.prototype.type="chart"),e}();function xo(e,t,n){e&&bn(e)&&("emphasis"===t?pn:hn)(e,n)}function wo(e,t,n){var i=yt(e,t),r=t&&null!=t.highlightKey?function(e){var t=zt[e];return null==t&&Ft<=32&&(t=zt[e]=Ft++),t}(t.highlightKey):null;null!=i?c(lt(i),function(t){xo(e.getItemGraphicEl(t),n,r)}):e.eachItemGraphicEl(function(e){xo(e,n,r)})}function Mo(e){return yo(e.model)}function bo(e){var t=e.model,n=e.ecModel,i=e.api,r=e.payload,a=t.pipelineContext.progressiveRender,o=e.view,s=r&&vo(r).updateMethod,l=a?"incrementalPrepareRender":s&&o[s]?s:"render";return"render"!==l&&o[l](t,n,i,r),So[l]}kt(_o),Rt(_o);var So={incrementalPrepareRender:{progress:function(e,t){t.view.incrementalRender(e,t.model,t.ecModel,t.api,t.payload)}},render:{
// Put view.render in `progress` to support appendData. But in this case
// view.render should not be called in reset, otherwise it will be called
// twise. Use `forceFirstProgress` to make sure that view.render is called
// in any cases.
forceFirstProgress:!0,progress:function(e,t){t.view.render(t.model,t.ecModel,t.api,t.payload)}}};
/**
 * @public
 * @param {(Function)} fn
 * @param {number} [delay=0] Unit: ms.
 * @param {boolean} [debounce=false]
 *        true: If call interval less than `delay`, only the last call works.
 *        false: If call interval less than `delay, call works on fixed rate.
 * @return {(Function)} throttled fn.
 */function Io(e,t,n){var i,r,a,o,s,l=0,u=0,c=null;function p(){u=(new Date).getTime(),c=null,e.apply(a,o||[])}t=t||0;var h=function(){for(var e=[],h=0;h<arguments.length;h++)e[h]=arguments[h];i=(new Date).getTime(),a=this,o=e;var f=s||t,d=s||n;s=null,r=i-(d?l:u)-f,clearTimeout(c),
// Here we should make sure that: the `exec` SHOULD NOT be called later
// than a new call of `cb`, that is, preserving the command order. Consider
// calculating "scale rate" when roaming as an example. When a call of `cb`
// happens, either the `exec` is called dierectly, or the call is delayed.
// But the delayed call should never be later than next call of `cb`. Under
// this assurance, we can simply update view state each time `dispatchAction`
// triggered by user roaming, but not need to add extra code to avoid the
// state being "rolled-back".
d?c=setTimeout(p,f):r>=0?p():c=setTimeout(p,-r),l=i};
/**
   * Clear throttle.
   * @public
   */return h.clear=function(){c&&(clearTimeout(c),c=null)},
/**
   * Enable debounce once.
   */
h.debounceNextCall=function(e){s=e},h}var Do=_t(),Co={itemStyle:Et(ni,!0),lineStyle:Et(Qn,!0)},To={lineStyle:"stroke",itemStyle:"fill"};function ko(e,t){return e.visualStyleMapper||Co[t]||Co.itemStyle}function Oo(e,t){return e.visualDrawType||To[t]||"fill"}var Lo={createOnAllSeries:!0,performRawSeries:!0,reset:function(e,t){var n=e.getData(),i=e.visualStyleAccessPath||"itemStyle",r=e.getModel(i),a=ko(e,i)(r),o=r.getShallow("decal");o&&(n.setVisual("decal",o),o.dirty=!0);var s=Oo(e,i),l=a[s],u=g(l)?l:null;if(!a[s]||u||"auto"===a.fill||"auto"===a.stroke){var c=e.getColorFromPalette(
// TODO series count changed.
e.name,null,t.getSeriesCount());a[s]||(a[s]=c,n.setVisual("colorFromPalette",!0)),a.fill="auto"===a.fill||g(a.fill)?c:a.fill,a.stroke="auto"===a.stroke||g(a.stroke)?c:a.stroke}if(n.setVisual("style",a),n.setVisual("drawType",s),!t.isSeriesFiltered(e)&&u)return n.setVisual("colorFromPalette",!1),{dataEach:function(t,n){var i=e.getDataParams(n),r=d({},a);r[s]=u(i),t.setItemVisual(n,"style",r)}}}},Ao=new ai,No={createOnAllSeries:!0,performRawSeries:!0,reset:function(e,t){if(!e.ignoreStyleOnData&&!t.isSeriesFiltered(e)){var n=e.getData(),i=e.visualStyleAccessPath||"itemStyle",r=ko(e,i),a=n.getVisual("drawType");return{dataEach:n.hasItemOption?function(e,t){var n=e.getRawDataItem(t);if(n&&n[i]){Ao.option=n[i];var o=r(Ao),s=e.ensureUniqueItemVisual(t,"style");d(s,o),Ao.option.decal&&(e.setItemVisual(t,"decal",Ao.option.decal),Ao.option.decal.dirty=!0),a in o&&e.setItemVisual(t,"colorFromPalette",!1)}}:null}}}},Ro={performRawSeries:!0,overallReset:function(e){var t=u();e.eachSeries(function(e){var n=e.getColorBy();if(!e.isColorBySeries()){var i=e.type+"-"+n,r=t.get(i);r||t.set(i,r={}),Do(e).scope=r}}),e.eachSeries(function(t){if(!t.isColorBySeries()&&!e.isSeriesFiltered(t)){var n=t.getRawData(),i={},r=t.getData(),a=Do(t).scope,o=Oo(t,t.visualStyleAccessPath||"itemStyle");r.each(function(e){var t=r.getRawIndex(e);i[t]=e}),n.each(function(e){var s=i[e];if(r.getItemVisual(s,"colorFromPalette")){var l=r.ensureUniqueItemVisual(s,"style"),u=n.getName(e)||e+"",c=n.count();l[o]=t.getColorFromPalette(u,a,c)}})}})}},Eo=Math.PI,Po=
/** @class */function(){function e(e,t,n,i){this._stageTaskMap=u(),this.ecInstance=e,this.api=t,n=this._dataProcessorHandlers=n.slice(),i=this._visualHandlers=i.slice(),this._allHandlers=n.concat(i)}return e.prototype.restoreData=function(e,t){e.restoreData(t),this._stageTaskMap.each(function(e){var t=e.overallTask;t&&t.dirty()})},e.prototype.getPerformArgs=function(e,t){if(e.__pipeline){var n=this._pipelineMap.get(e.__pipeline.id),i=n.context,r=!t&&n.progressiveEnabled&&(!i||i.progressiveRender)&&e.__idxInPipeline>n.blockIndex?n.step:null,a=i&&i.modDataCount;return{step:r,modBy:null!=a?Math.ceil(a/r):null,modDataCount:a}}},e.prototype.getPipeline=function(e){return this._pipelineMap.get(e)},e.prototype.updateStreamModes=function(e,t){var n=this._pipelineMap.get(e.uid),i=e.getData().count(),r=n.progressiveEnabled&&t.incrementalPrepareRender&&i>=n.threshold,a=e.get("large")&&i>=e.get("largeThreshold"),o="mod"===e.get("progressiveChunkMode")?i:null;e.pipelineContext=n.context={progressiveRender:r,modDataCount:o,large:a}},e.prototype.restorePipelines=function(e){var t=this,n=t._pipelineMap=u();e.eachSeries(function(e){var i=e.getProgressive(),r=e.uid;n.set(r,{id:r,head:null,tail:null,threshold:e.getProgressiveThreshold(),progressiveEnabled:i&&!(e.preventIncremental&&e.preventIncremental()),blockIndex:-1,step:Math.round(i||700),count:0}),t._pipe(e,e.dataTask)})},e.prototype.prepareStageTasks=function(){var e=this._stageTaskMap,t=this.api.getModel(),n=this.api;c(this._allHandlers,function(i){var a=e.get(i.uid)||e.set(i.uid,{});r(!(i.reset&&i.overallReset),""),i.reset&&this._createSeriesStageTask(i,a,t,n),i.overallReset&&this._createOverallStageTask(i,a,t,n)},this)},e.prototype.prepareView=function(e,t,n,i){var r=e.renderTask,a=r.context;a.model=t,a.ecModel=n,a.api=i,r.__block=!e.incrementalPrepareRender,this._pipe(t,r)},e.prototype.performDataProcessorTasks=function(e,t){this._performStageTasks(this._dataProcessorHandlers,e,t,{block:!0})},e.prototype.performVisualTasks=function(e,t,n){this._performStageTasks(this._visualHandlers,e,t,n)},e.prototype._performStageTasks=function(e,t,n,i){i=i||{};var r=!1,a=this;function o(e,t){return e.setDirty&&(!e.dirtyMap||e.dirtyMap.get(t.__pipeline.id))}c(e,function(e){if(!i.visualType||i.visualType===e.visualType){var s=a._stageTaskMap.get(e.uid),l=s.seriesTaskMap,u=s.overallTask;if(u){var c,p=u.agentStubMap;p.each(function(e){o(i,e)&&(e.dirty(),c=!0)}),c&&u.dirty(),a.updatePayload(u,n);var h=a.getPerformArgs(u,i.block);p.each(function(e){e.perform(h)}),u.perform(h)&&(r=!0)}else l&&l.each(function(s){o(i,s)&&s.dirty();var l=a.getPerformArgs(s,i.block);l.skip=!e.performRawSeries&&t.isSeriesFiltered(s.context.model),a.updatePayload(s,n),s.perform(l)&&(r=!0)})}}),this.unfinished=r||this.unfinished},e.prototype.performSeriesTasks=function(e){var t;e.eachSeries(function(e){t=e.dataTask.perform()||t}),this.unfinished=t||this.unfinished},e.prototype.plan=function(){this._pipelineMap.each(function(e){var t=e.tail;do{if(t.__block){e.blockIndex=t.__idxInPipeline;break}t=t.getUpstream()}while(t)})},e.prototype.updatePayload=function(e,t){"remain"!==t&&(e.context.payload=t)},e.prototype._createSeriesStageTask=function(e,t,n,i){var r=this,a=t.seriesTaskMap,o=t.seriesTaskMap=u(),s=e.seriesType,l=e.getTargetSeries;function c(t){var s=t.uid,l=o.set(s,a&&a.get(s)||Oa({plan:Uo,reset:Go,count:Yo}));l.context={model:t,ecModel:n,api:i,
// PENDING: `useClearVisual` not used?
useClearVisual:e.isVisual&&!e.isLayout,plan:e.plan,reset:e.reset,scheduler:r},r._pipe(t,l)}e.createOnAllSeries?n.eachRawSeries(c):s?n.eachRawSeriesByType(s,c):l&&l(n,i).each(c)},e.prototype._createOverallStageTask=function(e,t,n,i){var a=this,o=t.overallTask=t.overallTask||Oa({reset:Bo});o.context={ecModel:n,api:i,overallReset:e.overallReset,scheduler:a};var s=o.agentStubMap,l=o.agentStubMap=u(),p=e.seriesType,h=e.getTargetSeries,f=!0,d=!1;function g(e){var t=e.uid,n=l.set(t,s&&s.get(t)||(// When the result of `getTargetSeries` changed, the overallTask
// should be set as dirty and re-performed.
// When the result of `getTargetSeries` changed, the overallTask
// should be set as dirty and re-performed.
d=!0,Oa({reset:Vo,onDirty:zo})));n.context={model:e,overallProgress:f},n.agent=o,n.__block=f,a._pipe(e,n)}r(!e.createOnAllSeries,""),p?n.eachRawSeriesByType(p,g):h?h(n,i).each(g):(f=!1,c(n.getSeries(),g)),d&&o.dirty()},e.prototype._pipe=function(e,t){var n=this._pipelineMap.get(e.uid);!n.head&&(n.head=t),n.tail&&n.tail.pipe(t),n.tail=t,t.__idxInPipeline=n.count++,t.__pipeline=n},e.wrapStageHandler=function(e,t){return g(e)&&(e={overallReset:e,seriesType:Zo(e)}),e.uid=si("stageHandler"),t&&(e.visualType=t),e},e}();function Bo(e){e.overallReset(e.ecModel,e.api,e.payload)}function Vo(e){return e.overallProgress&&Fo}function Fo(){this.agent.dirty(),this.getDownstream().dirty()}function zo(){this.agent&&this.agent.dirty()}function Uo(e){return e.plan?e.plan(e.model,e.ecModel,e.api,e.payload):null}function Go(e){e.useClearVisual&&e.data.clearAllVisual();var t=e.resetDefines=lt(e.reset(e.model,e.ecModel,e.api,e.payload));return t.length>1?i(t,function(e,t){return Wo(t)}):Ho}var Ho=Wo(0);function Wo(e){return function(t,n){var i=n.data,r=n.resetDefines[e];if(r&&r.dataEach)for(var a=t.start;a<t.end;a++)r.dataEach(i,a);else r&&r.progress&&r.progress(t,i)}}function Yo(e){return e.data.count()}function Zo(e){qo=null;try{e(jo,Xo)}catch(t){}return qo}var qo,jo={},Xo={};function Ko(e,t){for(var n in t.prototype)e[n]=te}
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/Ko(jo,Dr),Ko(Xo,Lr),jo.eachSeriesByType=jo.eachRawSeriesByType=function(e){qo=e},jo.eachComponent=function(e){"series"===e.mainType&&e.subType&&(qo=e.subType)};var $o=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"];const Jo={color:$o,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],$o]};
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/var Qo="#B9B8CE",es="#100C2A",ts=function(){return{axisLine:{lineStyle:{color:Qo}},splitLine:{lineStyle:{color:"#484753"}},splitArea:{areaStyle:{color:["rgba(255,255,255,0.02)","rgba(255,255,255,0.05)"]}},minorSplitLine:{lineStyle:{color:"#20203B"}}}},ns=["#4992ff","#7cffb2","#fddd60","#ff6e76","#58d9f9","#05c091","#ff8a45","#8d48e3","#dd79ff"],is={darkMode:!0,color:ns,backgroundColor:es,axisPointer:{lineStyle:{color:"#817f91"},crossStyle:{color:"#817f91"},label:{
// TODO Contrast of label backgorundColor
color:"#fff"}},legend:{textStyle:{color:Qo},pageTextStyle:{color:Qo}},textStyle:{color:Qo},title:{textStyle:{color:"#EEF1FA"},subtextStyle:{color:"#B9B8CE"}},toolbox:{iconStyle:{borderColor:Qo}},dataZoom:{borderColor:"#71708A",textStyle:{color:Qo},brushStyle:{color:"rgba(135,163,206,0.3)"},handleStyle:{color:"#353450",borderColor:"#C5CBE3"},moveHandleStyle:{color:"#B0B6C3",opacity:.3},fillerColor:"rgba(135,163,206,0.2)",emphasis:{handleStyle:{borderColor:"#91B7F2",color:"#4D587D"},moveHandleStyle:{color:"#636D9A",opacity:.7}},dataBackground:{lineStyle:{color:"#71708A",width:1},areaStyle:{color:"#71708A"}},selectedDataBackground:{lineStyle:{color:"#87A3CE"},areaStyle:{color:"#87A3CE"}}},visualMap:{textStyle:{color:Qo}},timeline:{lineStyle:{color:Qo},label:{color:Qo},controlStyle:{color:Qo,borderColor:Qo}},calendar:{itemStyle:{color:es},dayLabel:{color:Qo},monthLabel:{color:Qo},yearLabel:{color:Qo}},timeAxis:ts(),logAxis:ts(),valueAxis:ts(),categoryAxis:ts(),line:{symbol:"circle"},graph:{color:ns},gauge:{title:{color:Qo},axisLine:{lineStyle:{color:[[1,"rgba(207,212,219,0.2)"]]}},axisLabel:{color:Qo},detail:{color:"#EEF1FA"}},candlestick:{itemStyle:{color:"#f64e56",color0:"#54ea92",borderColor:"#f64e56",borderColor0:"#54ea92"}}};is.categoryAxis.splitLine.show=!1;var rs=
/** @class */function(){function e(){}return e.prototype.normalizeQuery=function(e){var n={},i={},r={};if(t(e)){var a=Tt(e);n.mainType=a.main||null,n.subType=a.sub||null}else{var o=["Index","Name","Id"],s={name:1,dataIndex:1,dataType:1};c(e,function(e,t){for(var a=!1,l=0;l<o.length;l++){var u=o[l],c=t.lastIndexOf(u);if(c>0&&c===t.length-u.length){var p=t.slice(0,c);"data"!==p&&(n.mainType=p,n[u.toLowerCase()]=e,a=!0)}}s.hasOwnProperty(t)&&(i[t]=e,a=!0),a||(r[t]=e)})}return{cptQuery:n,dataQuery:i,otherQuery:r}},e.prototype.filter=function(e,t){var n=this.eventInfo;if(!n)return!0;var i=n.targetEl,r=n.packedEvent,a=n.model,o=n.view;if(!a||!o)return!0;var s=t.cptQuery,l=t.dataQuery;return u(s,a,"mainType")&&u(s,a,"subType")&&u(s,a,"index","componentIndex")&&u(s,a,"name")&&u(s,a,"id")&&u(l,r,"name")&&u(l,r,"dataIndex")&&u(l,r,"dataType")&&(!o.filterForExposedEvent||o.filterForExposedEvent(e,t.otherQuery,i,r));function u(e,t,n,i){return null==e[n]||t[i||n]===e[n]}},e.prototype.afterTrigger=function(){this.eventInfo=null},e}(),as=["symbol","symbolSize","symbolRotate","symbolOffset"],os=as.concat(["symbolKeepAspect"]),ss={createOnAllSeries:!0,
// For legend.
performRawSeries:!0,reset:function(e,t){var n=e.getData();if(e.legendIcon&&n.setVisual("legendIcon",e.legendIcon),e.hasSymbolVisual){for(var i={},r={},a=!1,o=0;o<as.length;o++){var s=as[o],l=e.get(s);g(l)?(a=!0,r[s]=l):i[s]=l}
// Only visible series has each data be visual encoded
if(i.symbol=i.symbol||e.defaultSymbol,n.setVisual(d({legendIcon:e.legendIcon||i.symbol,symbolKeepAspect:e.get("symbolKeepAspect")},i)),!t.isSeriesFiltered(e)){var u=_(r);return{dataEach:a?function(t,n){for(var i=e.getRawValue(n),a=e.getDataParams(n),o=0;o<u.length;o++){var s=u[o];t.setItemVisual(n,s,r[s](i,a))}}:null}}}}},ls={createOnAllSeries:!0,
// For legend.
performRawSeries:!0,reset:function(e,t){if(e.hasSymbolVisual&&!t.isSeriesFiltered(e))return{dataEach:e.getData().hasItemOption?function(e,t){for(var n=e.getItemModel(t),i=0;i<os.length;i++){var r=os[i],a=n.getShallow(r,!0);null!=a&&e.setItemVisual(t,r,a)}}:null};
// Only visible series has each data be visual encoded
}};function us(e,n,i,r,o){var s=e+n;i.isSilent(s)||r.eachComponent({mainType:"series",subType:"pie"},function(e){for(var n=e.seriesIndex,r=e.option.selectedMap,l=o.selected,u=0;u<l.length;u++)if(l[u].seriesIndex===n){var c=e.getData(),p=yt(c,o.fromActionPayload);i.trigger(s,{type:s,seriesId:e.id,name:a(p)?c.getName(p[0]):c.getName(p),selected:t(r)?r:d({},r)})}})}
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function cs(e,t,n){for(var i;e&&(!t(e)||(i=e,!n));)e=e.__hostTarget||e.parent;return i}
/**
 * Triangle shape
 * @inner
 */var ps=m.extend({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(e,t){var n=t.cx,i=t.cy,r=t.width/2,a=t.height/2;e.moveTo(n,i-a),e.lineTo(n+r,i+a),e.lineTo(n-r,i+a),e.closePath()}}),hs=m.extend({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(e,t){var n=t.cx,i=t.cy,r=t.width/2,a=t.height/2;e.moveTo(n,i-a),e.lineTo(n+r,i),e.lineTo(n,i+a),e.lineTo(n-r,i),e.closePath()}}),fs=m.extend({type:"pin",shape:{
// x, y on the cusp
x:0,y:0,width:0,height:0},buildPath:function(e,t){var n=t.x,i=t.y,r=t.width/5*3,a=Math.max(r,t.height),o=r/2,s=o*o/(a-o),l=i-a+o+s,u=Math.asin(s/o),c=Math.cos(u)*o,p=Math.sin(u),h=Math.cos(u),f=.6*o,d=.7*o;e.moveTo(n-c,l+s),e.arc(n,l,o,Math.PI-u,2*Math.PI+u),e.bezierCurveTo(n+c-p*f,l+s+h*f,n,i-d,n,i),e.bezierCurveTo(n,i-d,n-c+p*f,l+s+h*f,n-c,l+s),e.closePath()}}),ds=m.extend({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function(e,t){var n=t.height,i=t.x,r=t.y,a=t.width/3*2;e.moveTo(i,r),e.lineTo(i+a,r+n),e.lineTo(i,r+n/4*3),e.lineTo(i-a,r+n),e.lineTo(i,r),e.closePath()}}),gs={line:function(e,t,n,i,r){r.x1=e,r.y1=t+i/2,r.x2=e+n,r.y2=t+i/2},rect:function(e,t,n,i,r){r.x=e,r.y=t,r.width=n,r.height=i},roundRect:function(e,t,n,i,r){r.x=e,r.y=t,r.width=n,r.height=i,r.r=Math.min(n,i)/4},square:function(e,t,n,i,r){var a=Math.min(n,i);r.x=e,r.y=t,r.width=a,r.height=a},circle:function(e,t,n,i,r){
// Put circle in the center of square
r.cx=e+n/2,r.cy=t+i/2,r.r=Math.min(n,i)/2},diamond:function(e,t,n,i,r){r.cx=e+n/2,r.cy=t+i/2,r.width=n,r.height=i},pin:function(e,t,n,i,r){r.x=e+n/2,r.y=t+i/2,r.width=n,r.height=i},arrow:function(e,t,n,i,r){r.x=e+n/2,r.y=t+i/2,r.width=n,r.height=i},triangle:function(e,t,n,i,r){r.cx=e+n/2,r.cy=t+i/2,r.width=n,r.height=i}},ms={};
/**
 * Diamond shape
 * @inner
 */c({line:E,rect:R,roundRect:R,square:R,circle:T,diamond:hs,pin:fs,arrow:ds,triangle:ps},function(e,t){ms[t]=new e});var vs=m.extend({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},calculateTextPosition:function(e,t,n){var i=ne(e,t,n),r=this.shape;return r&&"pin"===r.symbolType&&"inside"===t.position&&(i.y=n.y+.4*n.height),i},buildPath:function(e,t,n){var i=t.symbolType;if("none"!==i){var r=ms[i];r||(r=ms[
// Default rect
i="rect"]),gs[i](t.x,t.y,t.width,t.height,r.shape),r.buildPath(e,r.shape,n)}}});
// Provide setColor helper method to avoid determine if set the fill or stroke outside
function ys(e,t){if("image"!==this.type){var n=this.style;this.__isEmptyBrush?(n.stroke=e,n.fill=t||"#fff",
// TODO Same width with lineStyle in LineView
n.lineWidth=2):"line"===this.shape.symbolType?n.stroke=e:n.fill=e,this.markRedraw()}}
/**
 * Create a symbol element with given symbol configuration: shape, x, y, width, height, color
 */function _s(e,t,n,i,r,a,
// whether to keep the ratio of w/h,
o){
// TODO Support image object, DynamicImage.
var s,l=0===e.indexOf("empty");return l&&(e=e.substr(5,1).toLowerCase()+e.substr(6)),(s=0===e.indexOf("image://")?Pn(e.slice(8),new Z(t,n,i,r),o?"center":"cover"):0===e.indexOf("path://")?En(e.slice(7),{},new Z(t,n,i,r),o?"center":"cover"):new vs({shape:{symbolType:e,x:t,y:n,width:i,height:r}})).__isEmptyBrush=l,
// TODO Should deprecate setColor
s.setColor=ys,a&&s.setColor(a),s}var xs=new ie,ws=new re(100),Ms=["symbol","symbolSize","symbolKeepAspect","color","backgroundColor","dashArrayX","dashArrayY","maxTileWidth","maxTileHeight"];function bs(e,n){if("none"===e)return null;var r=n.getDevicePixelRatio(),o=n.getZr(),l="svg"===o.painter.type;e.dirty&&xs.delete(e);var u=xs.get(e);if(u)return u;var c=I(e,{symbol:"rect",symbolSize:1,symbolKeepAspect:!0,color:"rgba(0, 0, 0, 0.2)",backgroundColor:null,dashArrayX:5,dashArrayY:5,rotation:0,maxTileWidth:512,maxTileHeight:512});"none"===c.backgroundColor&&(c.backgroundColor=null);var p={repeat:"repeat"};return function(e){for(var n,u=[r],p=!0,h=0;h<Ms.length;++h){var f=c[Ms[h]];if(null!=f&&!a(f)&&!t(f)&&!s(f)&&"boolean"!=typeof f){p=!1;break}u.push(f)}if(p){n=u.join(",")+(l?"-svg":"");var d=ws.get(n);d&&(l?e.svgElement=d:e.image=d)}var g,m=Is(c.dashArrayX),v=function(e){if(!e||"object"==typeof e&&0===e.length)return[0,0];if(s(e)){var t=Math.ceil(e);return[t,t]}var n=i(e,function(e){return Math.ceil(e)});return e.length%2?n.concat(n):n}(c.dashArrayY),y=Ss(c.symbol),_=i(m,function(e){return Ds(e)}),x=Ds(v),w=!l&&ae.createCanvas(),M=l&&{tag:"g",attrs:{},key:"dcl",children:[]},b=function(){for(var e=1,t=0,n=_.length;t<n;++t)e=rt(e,_[t]);var i=1;for(t=0,n=y.length;t<n;++t)i=rt(i,y[t].length);e*=i;var r=x*_.length*y.length;return{width:Math.max(1,Math.min(e,c.maxTileWidth)),height:Math.max(1,Math.min(r,c.maxTileHeight))}}();w&&(w.width=b.width*r,w.height=b.height*r,g=w.getContext("2d")),function(){g&&(g.clearRect(0,0,w.width,w.height),c.backgroundColor&&(g.fillStyle=c.backgroundColor,g.fillRect(0,0,w.width,w.height)));for(var e=0,t=0;t<v.length;++t)e+=v[t];if(!(e<=0))for(var n=-x,i=0,a=0,s=0;n<b.height;){if(i%2==0){for(var u=a/2%y.length,p=0,h=0,f=0;p<2*b.width;){var d=0;for(t=0;t<m[s].length;++t)d+=m[s][t];if(d<=0)break;if(h%2==0){var _=.5*(1-c.symbolSize);S(p+m[s][h]*_,n+v[i]*_,m[s][h]*c.symbolSize,v[i]*c.symbolSize,y[u][f/2%y[u].length])}p+=m[s][h],++f,++h===m[s].length&&(h=0)}++s===m.length&&(s=0)}n+=v[i],++a,++i===v.length&&(i=0)}function S(e,t,n,i,a){var s=l?1:r,u=_s(a,e*s,t*s,n*s,i*s,c.color,c.symbolKeepAspect);if(l){var p=o.painter.renderOneToVNode(u);p&&M.children.push(p)}else oe(g,u)}}(),p&&ws.put(n,w||M),e.image=w,e.svgElement=M,e.svgWidth=b.width,e.svgHeight=b.height}(p),p.rotation=c.rotation,p.scaleX=p.scaleY=l?1:1/r,xs.set(e,p),e.dirty=!1,p}function Ss(e){if(!e||0===e.length)return[["rect"]];if(t(e))return[[e]];for(var n=!0,i=0;i<e.length;++i)if(!t(e[i])){n=!1;break}if(n)return Ss([e]);var r=[];for(i=0;i<e.length;++i)t(e[i])?r.push([e[i]]):r.push(e[i]);return r}function Is(e){if(!e||0===e.length)return[[0,0]];if(s(e))return[[a=Math.ceil(e),a]];for(var t=!0,n=0;n<e.length;++n)if(!s(e[n])){t=!1;break}if(t)return Is([e]);var r=[];for(n=0;n<e.length;++n)if(s(e[n])){var a=Math.ceil(e[n]);r.push([a,a])}else a=i(e[n],function(e){return Math.ceil(e)}),r.push(a.length%2==1?a.concat(a):a);return r}function Ds(e){for(var t=0,n=0;n<e.length;++n)t+=e[n];return e.length%2==1?2*t:t}var Cs=new se,Ts={};function ks(e){return Ts[e]}var Os=2e3,Ls=4500,As={PROCESSOR:{FILTER:1e3,SERIES_FILTER:800,STATISTIC:5e3},VISUAL:{LAYOUT:1e3,PROGRESSIVE_LAYOUT:1100,GLOBAL:Os,CHART:3e3,POST_CHART_LAYOUT:4600,COMPONENT:4e3,BRUSH:5e3,CHART_ITEM:Ls,ARIA:6e3,DECAL:7e3}},Ns="__flagInMainProcess",Rs="__pendingUpdate",Es="__needsUpdateStatus",Ps=/^[a-zA-Z0-9_]+$/,Bs="__connectUpdateStatus";function Vs(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];if(!this.isDisposed())return zs(this,e,t)}}function Fs(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return zs(this,e,t)}}function zs(e,t,n){return n[0]=n[0]&&n[0].toLowerCase(),se.prototype[t].apply(e,n)}var Us,Gs,Hs,Ws,Ys,Zs,qs,js,Xs,Ks,$s,Js,Qs,el,tl,nl,il,rl,al=
/** @class */function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return h(t,e),t}(se),ol=al.prototype;ol.on=Fs("on"),ol.off=Fs("off");var sl=
/** @class */function(e){function n(n,i,r){var a=e.call(this,new rs)||this;a._chartsViews=[],a._chartsMap={},a._componentsViews=[],a._componentsMap={},a._pendingActions=[],r=r||{},t(i)&&(i=gl[i]),a._dom=n,r.ssr&&pe(function(e){var t=Vt(e),n=t.dataIndex;if(null!=n){var i=u();return i.set("series_index",t.seriesIndex),i.set("data_index",n),t.ssrType&&i.set("ssr_type",t.ssrType),i}});var o=a._zr=ue(n,{renderer:r.renderer||"canvas",devicePixelRatio:r.devicePixelRatio,width:r.width,height:r.height,ssr:r.ssr,useDirtyRect:x(r.useDirtyRect,!1),useCoarsePointer:x(r.useCoarsePointer,"auto"),pointerSize:r.pointerSize});a._ssr=r.ssr,a._throttledZrFlush=Io(K(o.flush,o),17),(i=U(i))&&ta(i,!0),a._theme=i,a._locale=function(e){if(t(e)){var n=pi[e.toUpperCase()]||{};return e===li||e===ui?U(n):z(U(n),U(pi[ci]),!1)}return z(U(e),U(pi[ci]),!1)}(r.locale||fi),a._coordSysMgr=new Nr;var s=a._api=tl(a);function l(e,t){return e.__prio-t.__prio}return ce(dl,l),ce(hl,l),a._scheduler=new Po(a,s,hl,dl),a._messageCenter=new al,a._initEvents(),a.resize=K(a.resize,a),o.animation.on("frame",a._onframe,a),Ks(o,a),$s(o,a),$(a),a}return h(n,e),n.prototype._onframe=function(){if(!this._disposed){rl(this);var e=this._scheduler;if(this[Rs]){var t=this[Rs].silent;this[Ns]=!0;try{Us(this),Ws.update.call(this,null,this[Rs].updateParams)}catch(o){throw this[Ns]=!1,this[Rs]=null,o}this._zr.flush(),this[Ns]=!1,this[Rs]=null,js.call(this,t),Xs.call(this,t)}else if(e.unfinished){var n=1,i=this._model,r=this._api;e.unfinished=!1;do{var a=+new Date;e.performSeriesTasks(i),e.performDataProcessorTasks(i),Zs(this,i),e.performVisualTasks(i),el(this,this._model,r,"remain",{}),n-=+new Date-a}while(n>0&&e.unfinished);e.unfinished||this._zr.flush()}}},n.prototype.getDom=function(){return this._dom},n.prototype.getId=function(){return this.id},n.prototype.getZr=function(){return this._zr},n.prototype.isSSR=function(){return this._ssr},n.prototype.setOption=function(e,t,n){if(!this[Ns]&&!this._disposed){var i,r,a;if(o(t)&&(n=t.lazyUpdate,i=t.silent,r=t.replaceMerge,a=t.transition,t=t.notMerge),this[Ns]=!0,!this._model||t){var s=new Er(this._api),l=this._theme,u=this._model=new Dr;u.scheduler=this._scheduler,u.ssr=this._ssr,u.init(null,null,null,l,this._locale,s)}this._model.setOption(e,{replaceMerge:r},fl);var c={seriesTransition:a,optionChanged:!0};if(n)this[Rs]={silent:i,updateParams:c},this[Ns]=!1,this.getZr().wakeUp();else{try{Us(this),Ws.update.call(this,null,c)}catch(p){throw this[Rs]=null,this[Ns]=!1,p}this._ssr||this._zr.flush(),this[Rs]=null,this[Ns]=!1,js.call(this,i),Xs.call(this,i)}}},n.prototype.setTheme=function(){},n.prototype.getModel=function(){return this._model},n.prototype.getOption=function(){return this._model&&this._model.getOption()},n.prototype.getWidth=function(){return this._zr.getWidth()},n.prototype.getHeight=function(){return this._zr.getHeight()},n.prototype.getDevicePixelRatio=function(){return this._zr.painter.dpr||G.hasGlobalWindow&&window.devicePixelRatio||1},n.prototype.getRenderedCanvas=function(e){return this.renderToCanvas(e)},n.prototype.renderToCanvas=function(e){return this._zr.painter.getRenderedCanvas({backgroundColor:(e=e||{}).backgroundColor||this._model.get("backgroundColor"),pixelRatio:e.pixelRatio||this.getDevicePixelRatio()})},n.prototype.renderToSVGString=function(e){return this._zr.painter.renderToString({useViewBox:(e=e||{}).useViewBox})},n.prototype.getSvgDataURL=function(){if(G.svgSupported){var e=this._zr,t=e.storage.getDisplayList();return c(t,function(e){e.stopAnimation(null,!0)}),e.painter.toDataURL()}},n.prototype.getDataURL=function(e){if(!this._disposed){var t=this._model,n=[],i=this;c((e=e||{}).excludeComponents,function(e){t.eachComponent({mainType:e},function(e){var t=i._componentsMap[e.__viewId];t.group.ignore||(n.push(t),t.group.ignore=!0)})});var r="svg"===this._zr.painter.getType()?this.getSvgDataURL():this.renderToCanvas(e).toDataURL("image/"+(e&&e.type||"png"));return c(n,function(e){e.group.ignore=!1}),r}},n.prototype.getConnectedDataURL=function(e){if(!this._disposed){var t="svg"===e.type,n=this.group,i=Math.min,r=Math.max,a=1/0;if(yl[n]){var o=a,s=a,l=-1/0,u=-1/0,p=[],h=e&&e.pixelRatio||this.getDevicePixelRatio();c(vl,function(a){if(a.group===n){var c=t?a.getZr().painter.getSvgDom().innerHTML:a.renderToCanvas(U(e)),h=a.getDom().getBoundingClientRect();o=i(h.left,o),s=i(h.top,s),l=r(h.right,l),u=r(h.bottom,u),p.push({dom:c,left:h.left,top:h.top})}});var f=(l*=h)-(o*=h),d=(u*=h)-(s*=h),g=ae.createCanvas(),m=ue(g,{renderer:t?"svg":"canvas"});if(m.resize({width:f,height:d}),t){var v="";return c(p,function(e){v+='<g transform="translate('+(e.left-o)+","+(e.top-s)+')">'+e.dom+"</g>"}),m.painter.getSvgRoot().innerHTML=v,e.connectedBackgroundColor&&m.painter.setBackgroundColor(e.connectedBackgroundColor),m.refreshImmediately(),m.painter.toDataURL()}return e.connectedBackgroundColor&&m.add(new R({shape:{x:0,y:0,width:f,height:d},style:{fill:e.connectedBackgroundColor}})),c(p,function(e){var t=new S({style:{x:e.left*h-o,y:e.top*h-s,image:e.dom}});m.add(t)}),m.refreshImmediately(),g.toDataURL("image/"+(e&&e.type||"png"))}return this.getDataURL(e)}},n.prototype.convertToPixel=function(e,t){return Ys(this,"convertToPixel",e,t)},n.prototype.convertFromPixel=function(e,t){return Ys(this,"convertFromPixel",e,t)},n.prototype.containPixel=function(e,t){if(!this._disposed){var n,i=wt(this._model,e);return c(i,function(e,i){i.indexOf("Models")>=0&&c(e,function(e){var r=e.coordinateSystem;if(r&&r.containPoint)n=n||!!r.containPoint(t);else if("seriesModels"===i){var a=this._chartsMap[e.__viewId];a&&a.containPoint&&(n=n||a.containPoint(t,e))}},this)},this),!!n}},n.prototype.getVisual=function(e,t){var n=wt(this._model,e,{defaultMainType:"series"}),i=n.seriesModel.getData(),r=n.hasOwnProperty("dataIndexInside")?n.dataIndexInside:n.hasOwnProperty("dataIndex")?i.indexOfRawIndex(n.dataIndex):null;return null!=r?function(e,t,n){switch(n){case"color":return e.getItemVisual(t,"style")[e.getVisual("drawType")];case"opacity":return e.getItemVisual(t,"style").opacity;case"symbol":case"symbolSize":case"liftZ":return e.getItemVisual(t,n)}}(i,r,t):function(e,t){switch(t){case"color":return e.getVisual("style")[e.getVisual("drawType")];case"opacity":return e.getVisual("style").opacity;case"symbol":case"symbolSize":case"liftZ":return e.getVisual(t)}}(i,t)},n.prototype.getViewOfComponentModel=function(e){return this._componentsMap[e.__viewId]},n.prototype.getViewOfSeriesModel=function(e){return this._chartsMap[e.__viewId]},n.prototype._initEvents=function(){var e,t,n=this;c(ul,function(e){var t=function(t){var i,r=n.getModel(),a=t.target;if("globalout"===e?i={}:a&&cs(a,function(e){var t=Vt(e);if(t&&null!=t.dataIndex){var n=t.dataModel||r.getSeriesByIndex(t.seriesIndex);return i=n&&n.getDataParams(t.dataIndex,t.dataType,a)||{},!0}if(t.eventData)return i=d({},t.eventData),!0},!0),i){var o=i.componentType,s=i.componentIndex;"markLine"!==o&&"markPoint"!==o&&"markArea"!==o||(o="series",s=i.seriesIndex);var l=o&&null!=s&&r.getComponent(o,s),u=l&&n["series"===l.mainType?"_chartsMap":"_componentsMap"][l.__viewId];i.event=t,i.type=e,n._$eventProcessor.eventInfo={targetEl:a,packedEvent:i,model:l,view:u},n.trigger(e,i)}};t.zrEventfulCallAtLast=!0,n._zr.on(e,t,n)}),c(pl,function(e,t){n._messageCenter.on(t,function(e){this.trigger(t,e)},n)}),c(["selectchanged"],function(e){n._messageCenter.on(e,function(t){this.trigger(e,t)},n)}),e=this,t=this._api,this._messageCenter.on("selectchanged",function(n){var i=t.getModel();n.isFromClick?(us("map","selectchanged",e,i,n),us("pie","selectchanged",e,i,n)):"select"===n.fromAction?(us("map","selected",e,i,n),us("pie","selected",e,i,n)):"unselect"===n.fromAction&&(us("map","unselected",e,i,n),us("pie","unselected",e,i,n))})},n.prototype.isDisposed=function(){return this._disposed},n.prototype.clear=function(){this._disposed||this.setOption({series:[]},!0)},n.prototype.dispose=function(){if(!this._disposed){this._disposed=!0,this.getDom()&&It(this.getDom(),wl,"");var e=this,t=e._api,n=e._model;c(e._componentsViews,function(e){e.dispose(n,t)}),c(e._chartsViews,function(e){e.dispose(n,t)}),e._zr.dispose(),e._dom=e._model=e._chartsMap=e._componentsMap=e._chartsViews=e._componentsViews=e._scheduler=e._api=e._zr=e._throttledZrFlush=e._theme=e._coordSysMgr=e._messageCenter=null,delete vl[e.id]}},n.prototype.resize=function(e){if(!this[Ns]&&!this._disposed){this._zr.resize(e);var t=this._model;if(this._loadingFX&&this._loadingFX.resize(),t){var n=t.resetOption("media"),i=e&&e.silent;this[Rs]&&(null==i&&(i=this[Rs].silent),n=!0,this[Rs]=null),this[Ns]=!0;try{n&&Us(this),Ws.update.call(this,{type:"resize",animation:d({
// Disable animation
duration:0},e&&e.animation)})}catch(r){throw this[Ns]=!1,r}this[Ns]=!1,js.call(this,i),Xs.call(this,i)}}},n.prototype.showLoading=function(e,t){if(!this._disposed&&(o(e)&&(t=e,e=""),e=e||"default",this.hideLoading(),ml[e])){var n=ml[e](this._api,t),i=this._zr;this._loadingFX=n,i.add(n)}},n.prototype.hideLoading=function(){this._disposed||(this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null)},n.prototype.makeActionFromEvent=function(e){var t=d({},e);return t.type=pl[e.type],t},n.prototype.dispatchAction=function(e,t){if(!this._disposed&&(o(t)||(t={silent:!!t}),cl[e.type]&&this._model))if(this[Ns])this._pendingActions.push(e);else{var n=t.silent;qs.call(this,e,n);var i=t.flush;i?this._zr.flush():!1!==i&&G.browser.weChat&&this._throttledZrFlush(),js.call(this,n),Xs.call(this,n)}},n.prototype.updateLabelLayout=function(){Cs.trigger("series:layoutlabels",this._model,this._api,{
// Not adding series labels.
// TODO
updatedSeries:[]})},n.prototype.appendData=function(e){if(!this._disposed){var t=e.seriesIndex;this.getModel().getSeriesByIndex(t).appendData(e),this._scheduler.unfinished=!0,this.getZr().wakeUp()}},n.internalField=function(){function e(e){e.clearColorPalette(),e.eachSeries(function(e){e.clearColorPalette()})}function t(e){for(var t=[],n=e.currentStates,i=0;i<n.length;i++){var r=n[i];"emphasis"!==r&&"blur"!==r&&"select"!==r&&t.push(r)}e.selected&&e.states.select&&t.push("select"),2===e.hoverState&&e.states.emphasis?t.push("emphasis"):1===e.hoverState&&e.states.blur&&t.push("blur"),e.useStates(t)}function n(e,t){if(!e.preventAutoZ){var n=e.get("z")||0,i=e.get("zlevel")||0;t.eachRendered(function(e){return r(e,n,i,-1/0),!0})}}function r(e,t,n,i){var a=e.getTextContent(),o=e.getTextGuideLine();if(e.isGroup)for(var s=e.childrenRef(),l=0;l<s.length;l++)i=Math.max(r(s[l],t,n,i),i);else e.z=t,e.zlevel=n,i=Math.max(e.z2,i);if(a&&(a.z=t,a.zlevel=n,isFinite(i)&&(a.z2=i+2)),o){var u=e.textGuideLineConfig;o.z=t,o.zlevel=n,isFinite(i)&&(o.z2=i+(u&&u.showAbove?1:-1))}return i}function o(e,t){t.eachRendered(function(e){if(!kn(e)){var t=e.getTextContent(),n=e.getTextGuideLine();e.stateTransition&&(e.stateTransition=null),t&&t.stateTransition&&(t.stateTransition=null),n&&n.stateTransition&&(n.stateTransition=null),e.hasState()?(e.prevStates=e.currentStates,e.clearStates()):e.prevStates&&(e.prevStates=null)}})}function s(e,n){var i=e.getModel("stateAnimation"),r=e.isAnimationEnabled(),a=i.get("duration"),o=a>0?{duration:a,delay:i.get("delay"),easing:i.get("easing")}:null;n.eachRendered(function(e){if(e.states&&e.states.emphasis){if(kn(e))return;if(e instanceof m&&function(e){var t=Ut(e);t.normalFill=e.style.fill,t.normalStroke=e.style.stroke;var n=e.states.select||{};t.selectFill=n.style&&n.style.fill||null,t.selectStroke=n.style&&n.style.stroke||null}(e),e.__dirty){var n=e.prevStates;n&&e.useStates(n)}if(r){e.stateTransition=o;var i=e.getTextContent(),a=e.getTextGuideLine();i&&(i.stateTransition=o),a&&(a.stateTransition=o)}e.__dirty&&t(e)}})}Us=function(e){var t=e._scheduler;t.restorePipelines(e._model),t.prepareStageTasks(),Gs(e,!0),Gs(e,!1),t.plan()},Gs=function(e,t){for(var n=e._model,i=e._scheduler,r=t?e._componentsViews:e._chartsViews,a=t?e._componentsMap:e._chartsMap,o=e._zr,s=e._api,l=0;l<r.length;l++)r[l].__alive=!1;function u(e){var l=e.__requireNewView;e.__requireNewView=!1;var u="_ec_"+e.id+"_"+e.type,c=!l&&a[u];if(!c){var p=Tt(e.type);(c=new(t?mo.getClass(p.main,p.sub):
// FIXME:TS
// (ChartView as ChartViewConstructor).getClass('series', classType.sub)
// For backward compat, still support a chart type declared as only subType
// like "liquidfill", but recommend "series.liquidfill"
// But need a base class to make a type series.
_o.getClass(p.sub))).init(n,s),a[u]=c,r.push(c),o.add(c.group)}e.__viewId=c.__id=u,c.__alive=!0,c.__model=e,c.group.__ecComponentInfo={mainType:e.mainType,index:e.componentIndex},!t&&i.prepareView(c,e,n,s)}for(t?n.eachComponent(function(e,t){"series"!==e&&u(t)}):n.eachSeries(u),l=0;l<r.length;){var c=r[l];c.__alive?l++:(!t&&c.renderTask.dispose(),o.remove(c.group),c.dispose(n,s),r.splice(l,1),a[c.__id]===c&&delete a[c.__id],c.__id=c.group.__ecComponentInfo=null)}},Hs=function(e,t,n,i,r){var o=e._model;if(o.setUpdatePayload(n),i){var s={};s[i+"Id"]=n[i+"Id"],s[i+"Index"]=n[i+"Index"],s[i+"Name"]=n[i+"Name"];var l={mainType:i,query:s};r&&(l.subType=r);var p,h=n.excludeSeriesId;null!=h&&(p=u(),c(lt(h),function(e){var t=gt(e,null);null!=t&&p.set(t,!0)})),o&&o.eachComponent(l,function(t){if(!p||null==p.get(t.id))if(In(n))if(t instanceof so)n.type!==Yt||n.notBlur||t.get(["emphasis","disabled"])||function(e,t,n){var i=e.seriesIndex,r=e.getData(t.dataType);if(r){var o=yt(r,t);o=(a(o)?o[0]:o)||0;var s=r.getItemGraphicEl(o);if(!s)for(var l=r.count(),u=0;!s&&u<l;)s=r.getItemGraphicEl(u++);if(s){var c=Vt(s);yn(i,c.focus,c.blurScope,n)}else{var p=e.get(["emphasis","focus"]),h=e.get(["emphasis","blurScope"]);null!=p&&yn(i,p,h,n)}}}(t,n,e._api);else{var i=xn(t.mainType,t.componentIndex,n.name,e._api),r=i.dispatchers;n.type===Yt&&i.focusSelf&&!n.notBlur&&_n(t.mainType,t.componentIndex,e._api),r&&c(r,function(e){n.type===Yt?pn(e):hn(e)})}else Sn(n)&&t instanceof so&&(function(e,t){if(Sn(t)){var n=t.dataType,i=yt(e.getData(n),t);a(i)||(i=[i]),e[t.type===Xt?"toggleSelect":t.type===qt?"select":"unselect"](i,n)}}(t,n),wn(t),il(e))},e),o&&o.eachComponent(l,function(t){p&&null!=p.get(t.id)||f(e["series"===i?"_chartsMap":"_componentsMap"][t.__viewId])},e)}else c([].concat(e._componentsViews).concat(e._chartsViews),f);function f(i){i&&i.__alive&&i[t]&&i[t](i.__model,o,e._api,n)}},Ws={prepareAndUpdate:function(e){Us(this),Ws.update.call(this,e,{
// Needs to mark option changed if newOption is given.
// It's from MagicType.
// TODO If use a separate flag optionChanged in payload?
optionChanged:null!=e.newOption})},update:function(t,n){var i=this._model,r=this._api,a=this._zr,o=this._coordSysMgr,s=this._scheduler;if(i){i.setUpdatePayload(t),s.restoreData(i,t),s.performSeriesTasks(i),o.create(i,r),s.performDataProcessorTasks(i,t),Zs(this,i),o.update(i,r),e(i),s.performVisualTasks(i,t),Js(this,i,r,t,n);var l=i.get("backgroundColor")||"transparent",u=i.get("darkMode");a.setBackgroundColor(l),null!=u&&"auto"!==u&&a.setDarkMode(u),Cs.trigger("afterupdate",i,r)}},updateTransform:function(t){var n=this,i=this._model,r=this._api;if(i){i.setUpdatePayload(t);var a=[];i.eachComponent(function(e,o){if("series"!==e){var s=n.getViewOfComponentModel(o);if(s&&s.__alive)if(s.updateTransform){var l=s.updateTransform(o,i,r,t);l&&l.update&&a.push(s)}else a.push(s)}});var o=u();i.eachSeries(function(e){var a=n._chartsMap[e.__viewId];if(a.updateTransform){var s=a.updateTransform(e,i,r,t);s&&s.update&&o.set(e.uid,1)}else o.set(e.uid,1)}),e(i),this._scheduler.performVisualTasks(i,t,{setDirty:!0,dirtyMap:o}),el(this,i,r,t,{},o),Cs.trigger("afterupdate",i,r)}},updateView:function(t){var n=this._model;n&&(n.setUpdatePayload(t),_o.markUpdateMethod(t,"updateView"),e(n),this._scheduler.performVisualTasks(n,t,{setDirty:!0}),Js(this,n,this._api,t,{}),Cs.trigger("afterupdate",n,this._api))},updateVisual:function(t){var n=this,i=this._model;i&&(i.setUpdatePayload(t),i.eachSeries(function(e){e.getData().clearAllVisual()}),_o.markUpdateMethod(t,"updateVisual"),e(i),this._scheduler.performVisualTasks(i,t,{visualType:"visual",setDirty:!0}),i.eachComponent(function(e,r){if("series"!==e){var a=n.getViewOfComponentModel(r);a&&a.__alive&&a.updateVisual(r,i,n._api,t)}}),i.eachSeries(function(e){n._chartsMap[e.__viewId].updateVisual(e,i,n._api,t)}),Cs.trigger("afterupdate",i,this._api))},updateLayout:function(e){Ws.update.call(this,e)}},Ys=function(e,t,n,i){if(!e._disposed)for(var r,a=e._model,o=e._coordSysMgr.getCoordinateSystems(),s=wt(a,n),l=0;l<o.length;l++){var u=o[l];if(u[t]&&null!=(r=u[t](a,s,i)))return r}},Zs=function(e,t){var n=e._chartsMap,i=e._scheduler;t.eachSeries(function(e){i.updateStreamModes(e,n[e.__viewId])})},qs=function(e,t){var n=this,r=this.getModel(),a=e.type,o=e.escapeConnect,s=cl[a],l=s.actionInfo,u=(l.update||"update").split(":"),p=u.pop(),h=null!=u[0]&&Tt(u[0]);this[Ns]=!0;var f=[e],g=!1;e.batch&&(g=!0,f=i(e.batch,function(t){return(t=I(d({},t),e)).batch=null,t}));var m,v=[],y=Sn(e),_=In(e);if(_&&vn(this._api),c(f,function(t){if((m=(m=s.action(t,n._model,n._api))||d({},t)).type=l.event||m.type,v.push(m),_){var i=Mt(e),r=i.mainTypeSpecified?i.queryOptionMap.keys()[0]:"series";Hs(n,p,t,r),il(n)}else y?(Hs(n,p,t,"series"),il(n)):h&&Hs(n,p,t,h.main,h.sub)}),"none"!==p&&!_&&!y&&!h)try{this[Rs]?(Us(this),Ws.update.call(this,e),this[Rs]=null):Ws[p].call(this,e)}catch(M){throw this[Ns]=!1,M}if(m=g?{type:l.event||a,escapeConnect:o,batch:v}:v[0],this[Ns]=!1,!t){var x=this._messageCenter;if(x.trigger(m.type,m),y){var w={type:"selectchanged",escapeConnect:o,selected:Mn(r),isFromClick:e.isFromClick||!1,fromAction:e.type,fromActionPayload:e};x.trigger(w.type,w)}}},js=function(e){for(var t=this._pendingActions;t.length;){var n=t.shift();qs.call(this,n,e)}},Xs=function(e){!e&&this.trigger("updated")},Ks=function(e,t){e.on("rendered",function(n){t.trigger("rendered",n),
// Although zr is dirty if initial animation is not finished
// and this checking is called on frame, we also check
// animation finished for robustness.
!e.animation.isFinished()||t[Rs]||t._scheduler.unfinished||t._pendingActions.length||t.trigger("finished")})},$s=function(e,t){e.on("mouseover",function(e){var n=cs(e.target,bn);n&&(function(e,t,n){var i=Vt(e),r=xn(i.componentMainType,i.componentIndex,i.componentHighDownName,n),a=r.dispatchers;a?(r.focusSelf&&_n(i.componentMainType,i.componentIndex,n),c(a,function(e){return un(e,t)})):(yn(i.seriesIndex,i.focus,i.blurScope,n),"self"===i.focus&&_n(i.componentMainType,i.componentIndex,n),un(e,t))}(n,e,t._api),il(t))}).on("mouseout",function(e){var n=cs(e.target,bn);n&&(function(e,t,n){vn(n);var i=Vt(e),r=xn(i.componentMainType,i.componentIndex,i.componentHighDownName,n).dispatchers;r?c(r,function(e){return cn(e,t)}):cn(e,t)}(n,e,t._api),il(t))}).on("click",function(e){var n=cs(e.target,function(e){return null!=Vt(e).dataIndex},!0);if(n){var i=n.selected?"unselect":"select",r=Vt(n);t._api.dispatchAction({type:i,dataType:r.dataType,dataIndexInside:r.dataIndex,seriesIndex:r.seriesIndex,isFromClick:!0})}})},Js=function(e,t,n,i,r){!function(e){var t=[],n=[],i=!1;if(e.eachComponent(function(e,r){var a=r.get("zlevel")||0,o=r.get("z")||0,s=r.getZLevelKey();i=i||!!s,("series"===e?n:t).push({zlevel:a,z:o,idx:r.componentIndex,type:e,key:s})}),i){var r,a,o=t.concat(n);ce(o,function(e,t){return e.zlevel===t.zlevel?e.z-t.z:e.zlevel-t.zlevel}),c(o,function(t){var n=e.getComponent(t.type,t.idx),i=t.zlevel,o=t.key;null!=r&&(i=Math.max(r,i)),o?(i===r&&o!==a&&i++,a=o):a&&(i===r&&i++,a=""),r=i,n.setZLevel(i)})}}(t),Qs(e,t,n,i,r),c(e._chartsViews,function(e){e.__alive=!1}),el(e,t,n,i,r),c(e._chartsViews,function(e){e.__alive||e.remove(t,n)})},Qs=function(e,t,i,r,a,l){c(l||e._componentsViews,function(e){var a=e.__model;o(0,e),e.render(a,t,i,r),n(a,e),s(a,e)})},el=function(e,t,i,r,a,l){var u=e._scheduler;a=d(a||{},{updatedSeries:t.getSeries()}),Cs.trigger("series:beforeupdate",t,i,a);var c=!1;t.eachSeries(function(t){var n=e._chartsMap[t.__viewId];n.__alive=!0;var i=n.renderTask;u.updatePayload(i,r),o(0,n),l&&l.get(t.uid)&&i.dirty(),i.perform(u.getPerformArgs(i))&&(c=!0),n.group.silent=!!t.get("silent"),function(e,t){var n=e.get("blendMode")||null;t.eachRendered(function(e){e.isGroup||(e.style.blend=n)})}(t,n),wn(t)}),u.unfinished=c||u.unfinished,Cs.trigger("series:layoutlabels",t,i,a),Cs.trigger("series:transition",t,i,a),t.eachSeries(function(t){var i=e._chartsMap[t.__viewId];n(t,i),s(t,i)}),function(e,t){var n=0;e._zr.storage.traverse(function(e){e.isGroup||n++}),n>t.get("hoverLayerThreshold")&&!G.node&&!G.worker&&t.eachSeries(function(t){if(!t.preventUsingHoverLayer){var n=e._chartsMap[t.__viewId];n.__alive&&n.eachRendered(function(e){e.states.emphasis&&(e.states.emphasis.hoverLayer=!0)})}})}(e,t),Cs.trigger("series:afterupdate",t,i,a)},il=function(e){e[Es]=!0,e.getZr().wakeUp()},rl=function(e){e[Es]&&(e.getZr().storage.traverse(function(e){kn(e)||t(e)}),e[Es]=!1)},tl=function(e){return new(/** @class */
function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return h(n,t),n.prototype.getCoordinateSystems=function(){return e._coordSysMgr.getCoordinateSystems()},n.prototype.getComponentByElement=function(t){for(;t;){var n=t.__ecComponentInfo;if(null!=n)return e._model.getComponent(n.mainType,n.index);t=t.parent}},n.prototype.enterEmphasis=function(t,n){pn(t,n),il(e)},n.prototype.leaveEmphasis=function(t,n){hn(t,n),il(e)},n.prototype.enterBlur=function(t){!function(e){on(e,en)}(t),il(e)},n.prototype.leaveBlur=function(t){fn(t),il(e)},n.prototype.enterSelect=function(t){dn(t),il(e)},n.prototype.leaveSelect=function(t){gn(t),il(e)},n.prototype.getModel=function(){return e.getModel()},n.prototype.getViewOfComponentModel=function(t){return e.getViewOfComponentModel(t)},n.prototype.getViewOfSeriesModel=function(t){return e.getViewOfSeriesModel(t)},n}(Lr))(e)},nl=function(e){function t(e,t){for(var n=0;n<e.length;n++)e[n][Bs]=t}c(pl,function(n,i){e._messageCenter.on(i,function(n){if(yl[e.group]&&0!==e[Bs]){if(n&&n.escapeConnect)return;var i=e.makeActionFromEvent(n),r=[];c(vl,function(t){t!==e&&t.group===e.group&&r.push(t)}),t(r,0),c(r,function(e){1!==e[Bs]&&e.dispatchAction(i)}),t(r,2)}})})}}(),n}(se),ll=sl.prototype;ll.on=Vs("on"),ll.off=Vs("off"),ll.one=function(e,t,n){var i=this;this.on.call(this,e,function n(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];t&&t.apply&&t.apply(this,r),i.off(e,n)},n)};var ul=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"],cl={},pl={},hl=[],fl=[],dl=[],gl={},ml={},vl={},yl={},_l=+new Date-0,xl=+new Date-0,wl="_echarts_instance_";function Ml(e,t,n){var i=!(n&&n.ssr);if(i){var r=Il(e);if(r)return r}var a=new sl(e,t,n);return a.id="ec_"+_l++,vl[a.id]=a,i&&It(e,wl,a.id),nl(a),Cs.trigger("afterinit",a),a}function bl(e){yl[e]=!1}var Sl=bl;function Il(e){return vl[function(e,t){return e.getAttribute?e.getAttribute(t):e[t]}(e,wl)]}function Dl(e,t){gl[e]=t}function Cl(e){p(fl,e)<0&&fl.push(e)}function Tl(e,t){Bl(hl,e,t,2e3)}function kl(e){Ll("afterinit",e)}function Ol(e){Ll("afterupdate",e)}function Ll(e,t){Cs.on(e,t)}function Al(e,t,n){g(t)&&(n=t,t="");var i=o(e)?e.type:[e,e={event:t}][0];e.event=(e.event||i).toLowerCase(),pl[t=e.event]||(r(Ps.test(i)&&Ps.test(t)),cl[i]||(cl[i]={action:n,actionInfo:e}),pl[t]=i)}function Nl(e,t){Nr.register(e,t)}function Rl(e,t){Bl(dl,e,t,1e3,"layout")}function El(e,t){Bl(dl,e,t,3e3,"visual")}var Pl=[];function Bl(e,t,n,i,r){if((g(t)||o(t))&&(n=t,t=i),!(p(Pl,n)>=0)){Pl.push(n);var a=Po.wrapStageHandler(n,r);a.__prio=t,a.__raw=n,e.push(a)}}function Vl(e,t){ml[e]=t}function Fl(e,t,n){var i=ks("registerMap");i&&i(e,t,n)}var zl=function(e){var t=(e=U(e)).type;t||at("");var n=t.split(":");2!==n.length&&at("");var i=!1;"echarts"===n[0]&&(t=n[1],i=!0),e.__isBuiltIn=i,Fa.set(t,e)};
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function Ul(e){return null==e?0:e.length||1}function Gl(e){return e}El(Os,Lo),El(Ls,No),El(Ls,Ro),El(Os,ss),El(Ls,ls),El(7e3,function(e,t){e.eachRawSeries(function(n){if(!e.isSeriesFiltered(n)){var i=n.getData();i.hasItemVisual()&&i.each(function(e){var n=i.getItemVisual(e,"decal");n&&(i.ensureUniqueItemVisual(e,"style").decal=bs(n,t))});var r=i.getVisual("decal");r&&(i.getVisual("style").decal=bs(r,t))}})}),Cl(ta),Tl(900,function(e){var t=u();e.eachSeries(function(e){var n=e.get("stack");
// Compatible: when `stack` is set as '', do not stack.
if(n){var i=t.get(n)||t.set(n,[]),r=e.getData(),a={
// Used for calculate axis extent automatically.
// TODO: Type getCalculationInfo return more specific type?
stackResultDimension:r.getCalculationInfo("stackResultDimension"),stackedOverDimension:r.getCalculationInfo("stackedOverDimension"),stackedDimension:r.getCalculationInfo("stackedDimension"),stackedByDimension:r.getCalculationInfo("stackedByDimension"),isStackedByIndex:r.getCalculationInfo("isStackedByIndex"),data:r,seriesModel:e};
// If stacked on axis that do not support data stack.
if(!a.stackedDimension||!a.isStackedByIndex&&!a.stackedByDimension)return;i.length&&r.setCalculationInfo("stackedOnSeries",i[i.length-1].seriesModel),i.push(a)}}),t.each(na)}),Vl("default",
/**
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [opts]
 * @param {string} [opts.text]
 * @param {string} [opts.color]
 * @param {string} [opts.textColor]
 * @return {module:zrender/Element}
 */
function(e,t){I(t=t||{},{text:"loading",textColor:"#000",fontSize:12,fontWeight:"normal",fontStyle:"normal",fontFamily:"sans-serif",maskColor:"rgba(255, 255, 255, 0.8)",showSpinner:!0,color:"#5470c6",spinnerRadius:10,lineWidth:5,zlevel:0});var n=new ee,i=new R({style:{fill:t.maskColor},zlevel:t.zlevel,z:1e4});n.add(i);var r,a=new F({style:{text:t.text,fill:t.textColor,fontSize:t.fontSize,fontWeight:t.fontWeight,fontStyle:t.fontStyle,fontFamily:t.fontFamily},zlevel:t.zlevel,z:10001}),o=new R({style:{fill:"none"},textContent:a,textConfig:{position:"right",distance:10},zlevel:t.zlevel,z:10001});return n.add(o),t.showSpinner&&((r=new B({shape:{startAngle:-Eo/2,endAngle:-Eo/2+.1,r:t.spinnerRadius},style:{stroke:t.color,lineCap:"round",lineWidth:t.lineWidth},zlevel:t.zlevel,z:10001})).animateShape(!0).when(1e3,{endAngle:3*Eo/2}).start("circularInOut"),r.animateShape(!0).when(1e3,{startAngle:3*Eo/2}).delay(300).start("circularInOut"),n.add(r)),
// Inject resize
n.resize=function(){var n=a.getBoundingRect().width,s=t.showSpinner?t.spinnerRadius:0,l=(e.getWidth()-2*s-(t.showSpinner&&n?10:0)-n)/2-(t.showSpinner&&n?0:5+n/2)+(t.showSpinner?0:n/2)+(n?0:s),u=e.getHeight()/2;t.showSpinner&&r.setShape({cx:l,cy:u}),o.setShape({x:l-s,y:u-s,width:2*s,height:2*s}),i.setShape({x:0,y:0,width:e.getWidth(),height:e.getHeight()})},n.resize(),n}),Al({type:Yt,event:Yt,update:Yt},te),Al({type:Zt,event:Zt,update:Zt},te),Al({type:qt,event:qt,update:qt},te),Al({type:jt,event:jt,update:jt},te),Al({type:Xt,event:Xt,update:Xt},te),Dl("light",Jo),Dl("dark",is);var Hl=/** @class */function(){
/**
   * @param context Can be visited by this.context in callback.
   */
function e(e,t,n,i,r,
// By default: 'oneToOne'.
a){this._old=e,this._new=t,this._oldKeyGetter=n||Gl,this._newKeyGetter=i||Gl,
// Visible in callback via `this.context`;
this.context=r,this._diffModeMultiple="multiple"===a}
/**
   * Callback function when add a data
   */return e.prototype.add=function(e){return this._add=e,this},
/**
   * Callback function when update a data
   */
e.prototype.update=function(e){return this._update=e,this},
/**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
e.prototype.updateManyToOne=function(e){return this._updateManyToOne=e,this},
/**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
e.prototype.updateOneToMany=function(e){return this._updateOneToMany=e,this},
/**
   * Callback function when update a data and only work in `cbMode: 'byKey'`.
   */
e.prototype.updateManyToMany=function(e){return this._updateManyToMany=e,this},
/**
   * Callback function when remove a data
   */
e.prototype.remove=function(e){return this._remove=e,this},e.prototype.execute=function(){this[this._diffModeMultiple?"_executeMultiple":"_executeOneToOne"]()},e.prototype._executeOneToOne=function(){var e=this._old,t=this._new,n={},i=new Array(e.length),r=new Array(t.length);this._initIndexMap(e,null,i,"_oldKeyGetter"),this._initIndexMap(t,n,r,"_newKeyGetter");for(var a=0;a<e.length;a++){var o=i[a],s=n[o],l=Ul(s);
// idx can never be empty array here. see 'set null' logic below.
if(l>1){
// Consider there is duplicate key (for example, use dataItem.name as key).
// We should make sure every item in newArr and oldArr can be visited.
var u=s.shift();1===s.length&&(n[o]=s[0]),this._update&&this._update(u,a)}else 1===l?(n[o]=null,this._update&&this._update(s,a)):this._remove&&this._remove(a)}this._performRestAdd(r,n)},
/**
   * For example, consider the case:
   * oldData: [o0, o1, o2, o3, o4, o5, o6, o7],
   * newData: [n0, n1, n2, n3, n4, n5, n6, n7, n8],
   * Where:
   *     o0, o1, n0 has key 'a' (many to one)
   *     o5, n4, n5, n6 has key 'b' (one to many)
   *     o2, n1 has key 'c' (one to one)
   *     n2, n3 has key 'd' (add)
   *     o3, o4 has key 'e' (remove)
   *     o6, o7, n7, n8 has key 'f' (many to many, treated as add and remove)
   * Then:
   *     (The order of the following directives are not ensured.)
   *     this._updateManyToOne(n0, [o0, o1]);
   *     this._updateOneToMany([n4, n5, n6], o5);
   *     this._update(n1, o2);
   *     this._remove(o3);
   *     this._remove(o4);
   *     this._remove(o6);
   *     this._remove(o7);
   *     this._add(n2);
   *     this._add(n3);
   *     this._add(n7);
   *     this._add(n8);
   */
e.prototype._executeMultiple=function(){var e=this._new,t={},n={},i=[],r=[];this._initIndexMap(this._old,t,i,"_oldKeyGetter"),this._initIndexMap(e,n,r,"_newKeyGetter");for(var a=0;a<i.length;a++){var o=i[a],s=t[o],l=n[o],u=Ul(s),c=Ul(l);if(u>1&&1===c)this._updateManyToOne&&this._updateManyToOne(l,s),n[o]=null;else if(1===u&&c>1)this._updateOneToMany&&this._updateOneToMany(l,s),n[o]=null;else if(1===u&&1===c)this._update&&this._update(l,s),n[o]=null;else if(u>1&&c>1)this._updateManyToMany&&this._updateManyToMany(l,s),n[o]=null;else if(u>1)for(var p=0;p<u;p++)this._remove&&this._remove(s[p]);else this._remove&&this._remove(s)}this._performRestAdd(r,n)},e.prototype._performRestAdd=function(e,t){for(var n=0;n<e.length;n++){var i=e[n],r=t[i],a=Ul(r);if(a>1)for(var o=0;o<a;o++)this._add&&this._add(r[o]);else 1===a&&this._add&&this._add(r);
// Support both `newDataKeyArr` are duplication removed or not removed.
t[i]=null}},e.prototype._initIndexMap=function(e,
// Can be null.
t,
// In 'byKey', the output `keyArr` is duplication removed.
// In 'byIndex', the output `keyArr` is not duplication removed and
//     its indices are accurately corresponding to `arr`.
n,i){for(var r=this._diffModeMultiple,a=0;a<e.length;a++){
// Add prefix to avoid conflict with Object.prototype.
var o="_ec_"+this[i](e[a],a);if(r||(n[a]=o),t){var s=t[o],l=Ul(s);0===l?(
// Simple optimize: in most cases, one index has one key,
// do not need array.
t[o]=a,r&&n.push(o)):1===l?t[o]=[s,a]:s.push(a)}}},e}(),Wl=
/** @class */function(){function e(e,t){this._encode=e,this._schema=t}return e.prototype.get=function(){return{
// Do not generate full dimension name until fist used.
fullDimensions:this._getFullDimensionNames(),encode:this._encode}},e.prototype._getFullDimensionNames=function(){return this._cachedDimNames||(this._cachedDimNames=this._schema?this._schema.makeOutputDimensionNames():[]),this._cachedDimNames},e}();function Yl(e,t){return e.hasOwnProperty(t)||(e[t]=[]),e[t]}var Zl=
/**
   * @param opt All of the fields will be shallow copied.
   */
function(e){
/**
     * The format of `otherDims` is:
     * ```js
     * {
     *     tooltip?: number
     *     label?: number
     *     itemName?: number
     *     seriesName?: number
     * }
     * ```
     *
     * A `series.encode` can specified these fields:
     * ```js
     * encode: {
     *     // "3, 1, 5" is the index of data dimension.
     *     tooltip: [3, 1, 5],
     *     label: [0, 3],
     *     ...
     * }
     * ```
     * `otherDims` is the parse result of the `series.encode` above, like:
     * ```js
     * // Suppose the index of this data dimension is `3`.
     * this.otherDims = {
     *     // `3` is at the index `0` of the `encode.tooltip`
     *     tooltip: 0,
     *     // `3` is at the index `1` of the `encode.label`
     *     label: 1
     * };
     * ```
     *
     * This prop should never be `null`/`undefined` after initialized.
     */
this.otherDims={},null!=e&&d(this,e)},ql=_t(),jl={float:"f",int:"i",ordinal:"o",number:"n",time:"t"},Xl=/** @class */function(){function e(e){this.dimensions=e.dimensions,this._dimOmitted=e.dimensionOmitted,this.source=e.source,this._fullDimCount=e.fullDimensionCount,this._updateDimOmitted(e.dimensionOmitted)}return e.prototype.isDimensionOmitted=function(){return this._dimOmitted},e.prototype._updateDimOmitted=function(e){this._dimOmitted=e,e&&(this._dimNameMap||(this._dimNameMap=Jl(this.source)))},
/**
   * @caution Can only be used when `dimensionOmitted: true`.
   *
   * Get index by user defined dimension name (i.e., not internal generate name).
   * That is, get index from `dimensionsDefine`.
   * If no `dimensionsDefine`, or no name get, return -1.
   */
e.prototype.getSourceDimensionIndex=function(e){return x(this._dimNameMap.get(e),-1)},
/**
   * @caution Can only be used when `dimensionOmitted: true`.
   *
   * Notice: may return `null`/`undefined` if user not specify dimension names.
   */
e.prototype.getSourceDimension=function(e){var t=this.source.dimensionsDefine;if(t)return t[e]},e.prototype.makeStoreSchema=function(){for(var e=this._fullDimCount,t=ga(this.source),n=!Ql(e),i="",r=[],a=0,o=0;a<e;a++){var s=void 0,l=void 0,u=void 0,c=this.dimensions[o];
// The list has been sorted by `storeDimIndex` asc.
if(c&&c.storeDimIndex===a)s=t?c.name:null,l=c.type,u=c.ordinalMeta,o++;else{var p=this.getSourceDimension(a);p&&(s=t?p.name:null,l=p.type)}r.push({property:s,type:l,ordinalMeta:u}),
// If retrieving data by index,
//   use <index, type, ordinalMeta> to determine whether data can be shared.
//   (Because in this case there might be no dimension name defined in dataset, but indices always exists).
//   (Indices are always 0, 1, 2, ..., so we can ignore them to shorten the hash).
// Otherwise if retrieving data by property name (like `data: [{aa: 123, bb: 765}, ...]`),
//   use <property, type, ordinalMeta> in hash.
!t||null==s||c&&c.isCalculationCoord||(i+=n?s.replace(/\`/g,"`1").replace(/\$/g,"`2"):s),i+="$",i+=jl[l]||"f",u&&(i+=u.uid),i+="$"}
// Source from endpoint(usually series) will be read differently
// when seriesLayoutBy or startIndex(which is affected by sourceHeader) are different.
// So we use this three props as key.
var h=this.source;return{dimensions:r,hash:[h.seriesLayoutBy,h.startIndex,i].join("$$")}},e.prototype.makeOutputDimensionNames=function(){for(var e=[],t=0,n=0;t<this._fullDimCount;t++){var i=void 0,r=this.dimensions[n];
// The list has been sorted by `storeDimIndex` asc.
if(r&&r.storeDimIndex===t)r.isCalculationCoord||(i=r.name),n++;else{var a=this.getSourceDimension(t);a&&(i=a.name)}e.push(i)}return e},e.prototype.appendCalculationDimension=function(e){this.dimensions.push(e),e.isCalculationCoord=!0,this._fullDimCount++,
// If append dimension on a data store, consider the store
// might be shared by different series, series dimensions not
// really map to store dimensions.
this._updateDimOmitted(!0)},e}();function Kl(e){return e instanceof Xl}function $l(e){for(var t=u(),n=0;n<(e||[]).length;n++){var i=e[n],r=o(i)?i.name:i;null!=r&&null==t.get(r)&&t.set(r,n)}return t}function Jl(e){var t=ql(e);return t.dimNameMap||(t.dimNameMap=$l(e.dimensionsDefine))}function Ql(e){return e>30}var eu,tu,nu,iu,ru,au,ou,su=o,lu=i,uu="undefined"==typeof Int32Array?Array:Int32Array,cu=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_dimSummary","userOutput","_rawData","_dimValueGetter","_nameDimIdx","_idDimIdx","_nameRepeatCount"],pu=["_approximateExtent"],hu=
/** @class */function(){function e(e,n){var i;this.type="list",this._dimOmitted=!1,this._nameList=[],this._idList=[],this._visual={},this._layout={},this._itemVisuals=[],this._itemLayouts=[],this._graphicEls=[],this._approximateExtent={},this._calculationInfo={},this.hasItemOption=!1,this.TRANSFERABLE_METHODS=["cloneShallow","downSample","minmaxDownSample","lttbDownSample","map"],this.CHANGABLE_METHODS=["filterSelf","selectRange"],this.DOWNSAMPLE_METHODS=["downSample","minmaxDownSample","lttbDownSample"];var r=!1;Kl(e)?(i=e.dimensions,this._dimOmitted=e.isDimensionOmitted(),this._schema=e):(r=!0,i=e),i=i||["x","y"];for(var a={},o=[],s={},l=!1,p={},h=0;h<i.length;h++){var f=i[h],d=t(f)?new Zl({name:f}):f instanceof Zl?f:new Zl(f),g=d.name;d.type=d.type||"float",d.coordDim||(d.coordDim=g,d.coordDimIndex=0);var m=d.otherDims=d.otherDims||{};o.push(g),a[g]=d,null!=p[g]&&(l=!0),d.createInvertedIndices&&(s[g]=[]),0===m.itemName&&(this._nameDimIdx=h),0===m.itemId&&(this._idDimIdx=h),r&&(d.storeDimIndex=h)}if(this.dimensions=o,this._dimInfos=a,this._initGetDimensionInfo(l),this.hostModel=n,this._invertedIndicesMap=s,this._dimOmitted){var v=this._dimIdxToName=u();c(o,function(e){v.set(a[e].storeDimIndex,e)})}}return e.prototype.getDimension=function(e){var t=this._recognizeDimIndex(e);if(null==t)return e;if(t=e,!this._dimOmitted)return this.dimensions[t];var n=this._dimIdxToName.get(t);if(null!=n)return n;var i=this._schema.getSourceDimension(t);return i?i.name:void 0},e.prototype.getDimensionIndex=function(e){var t=this._recognizeDimIndex(e);if(null!=t)return t;if(null==e)return-1;var n=this._getDimInfo(e);return n?n.storeDimIndex:this._dimOmitted?this._schema.getSourceDimensionIndex(e):-1},e.prototype._recognizeDimIndex=function(e){if(s(e)||null!=e&&!isNaN(e)&&!this._getDimInfo(e)&&(!this._dimOmitted||this._schema.getSourceDimensionIndex(e)<0))return+e},e.prototype._getStoreDimIndex=function(e){return this.getDimensionIndex(e)},e.prototype.getDimensionInfo=function(e){return this._getDimInfo(this.getDimension(e))},e.prototype._initGetDimensionInfo=function(e){var t=this._dimInfos;this._getDimInfo=e?function(e){return t.hasOwnProperty(e)?t[e]:void 0}:function(e){return t[e]}},e.prototype.getDimensionsOnCoord=function(){return this._dimSummary.dataDimsOnCoord.slice()},e.prototype.mapDimension=function(e,t){var n=this._dimSummary;if(null==t)return n.encodeFirstDimNotExtra[e];var i=n.encode[e];return i?i[t]:null},e.prototype.mapDimensionsAll=function(e){return(this._dimSummary.encode[e]||[]).slice()},e.prototype.getStore=function(){return this._store},e.prototype.initData=function(e,t,n){var r,a=this;if(e instanceof Qa&&(r=e),!r){var o=this.dimensions,s=ua(e)||y(e)?new ma(e,o.length):e;r=new Qa;var l=lu(o,function(e){return{type:a._dimInfos[e].type,property:e}});r.initData(s,l,n)}this._store=r,this._nameList=(t||[]).slice(),this._idList=[],this._nameRepeatCount={},this._doInit(0,r.count()),this._dimSummary=function(e,t){var n={},r=n.encode={},a=u(),o=[],s=[],l={};c(e.dimensions,function(t){var n,i=e.getDimensionInfo(t),u=i.coordDim;if(u){var c=i.coordDimIndex;Yl(r,u)[c]=t,i.isExtraCoord||(a.set(u,1),"ordinal"!==(n=i.type)&&"time"!==n&&(o[0]=t),Yl(l,u)[c]=e.getDimensionIndex(i.name)),i.defaultTooltip&&s.push(t)}or.each(function(e,t){var n=Yl(r,t),a=i.otherDims[t];null!=a&&!1!==a&&(n[a]=i.name)})});var p=[],h={};a.each(function(e,t){var n=r[t];h[t]=n[0],p=p.concat(n)}),n.dataDimsOnCoord=p,n.dataDimIndicesOnCoord=i(p,function(t){return e.getDimensionInfo(t).storeDimIndex}),n.encodeFirstDimNotExtra=h;var f=r.label;f&&f.length&&(o=f.slice());var d=r.tooltip;return d&&d.length?s=d.slice():s.length||(s=o.slice()),r.defaultedLabel=o,r.defaultedTooltip=s,n.userOutput=new Wl(l,t),n}(this,this._schema),this.userOutput=this._dimSummary.userOutput},e.prototype.appendData=function(e){var t=this._store.appendData(e);this._doInit(t[0],t[1])},e.prototype.appendValues=function(e,t){var n=this._store.appendValues(e,t&&t.length),i=n.start,r=n.end,a=this._shouldMakeIdFromName();if(this._updateOrdinalMeta(),t)for(var o=i;o<r;o++)this._nameList[o]=t[o-i],a&&ou(this,o)},e.prototype._updateOrdinalMeta=function(){for(var e=this._store,t=this.dimensions,n=0;n<t.length;n++){var i=this._dimInfos[t[n]];i.ordinalMeta&&e.collectOrdinalMeta(i.storeDimIndex,i.ordinalMeta)}},e.prototype._shouldMakeIdFromName=function(){var e=this._store.getProvider();return null==this._idDimIdx&&e.getSource().sourceFormat!==pr&&!e.fillStorage},e.prototype._doInit=function(e,t){if(!(e>=t)){var n=this._store.getProvider();this._updateOrdinalMeta();var i=this._nameList,r=this._idList;if(n.getSource().sourceFormat===sr&&!n.pure)for(var a=[],o=e;o<t;o++){var s=n.getItem(o,a);if(!this.hasItemOption&&ht(s)&&(this.hasItemOption=!0),s){var l=s.name;null==i[o]&&null!=l&&(i[o]=gt(l,null));var u=s.id;null==r[o]&&null!=u&&(r[o]=gt(u,null))}}if(this._shouldMakeIdFromName())for(o=e;o<t;o++)ou(this,o);eu(this)}},e.prototype.getApproximateExtent=function(e){return this._approximateExtent[e]||this._store.getDataExtent(this._getStoreDimIndex(e))},e.prototype.setApproximateExtent=function(e,t){t=this.getDimension(t),this._approximateExtent[t]=e.slice()},e.prototype.getCalculationInfo=function(e){return this._calculationInfo[e]},e.prototype.setCalculationInfo=function(e,t){su(e)?d(this._calculationInfo,e):this._calculationInfo[e]=t},e.prototype.getName=function(e){var t=this.getRawIndex(e),n=this._nameList[t];return null==n&&null!=this._nameDimIdx&&(n=nu(this,this._nameDimIdx,t)),null==n&&(n=""),n},e.prototype._getCategory=function(e,t){var n=this._store.get(e,t),i=this._store.getOrdinalMeta(e);return i?i.categories[n]:n},e.prototype.getId=function(e){return tu(this,this.getRawIndex(e))},e.prototype.count=function(){return this._store.count()},e.prototype.get=function(e,t){var n=this._dimInfos[e];if(n)return this._store.get(n.storeDimIndex,t)},e.prototype.getByRawIndex=function(e,t){var n=this._dimInfos[e];if(n)return this._store.getByRawIndex(n.storeDimIndex,t)},e.prototype.getIndices=function(){return this._store.getIndices()},e.prototype.getDataExtent=function(e){return this._store.getDataExtent(this._getStoreDimIndex(e))},e.prototype.getSum=function(e){return this._store.getSum(this._getStoreDimIndex(e))},e.prototype.getMedian=function(e){return this._store.getMedian(this._getStoreDimIndex(e))},e.prototype.getValues=function(e,t){var n=this,i=this._store;return a(e)?i.getValues(lu(e,function(e){return n._getStoreDimIndex(e)}),t):i.getValues(e)},e.prototype.hasValue=function(e){for(var t=this._dimSummary.dataDimIndicesOnCoord,n=0,i=t.length;n<i;n++)if(isNaN(this._store.get(t[n],e)))return!1;return!0},e.prototype.indexOfName=function(e){for(var t=0,n=this._store.count();t<n;t++)if(this.getName(t)===e)return t;return-1},e.prototype.getRawIndex=function(e){return this._store.getRawIndex(e)},e.prototype.indexOfRawIndex=function(e){return this._store.indexOfRawIndex(e)},e.prototype.rawIndexOf=function(e,t){var n=e&&this._invertedIndicesMap[e],i=n&&n[t];return null==i||isNaN(i)?-1:i},e.prototype.indicesOfNearest=function(e,t,n){return this._store.indicesOfNearest(this._getStoreDimIndex(e),t,n)},e.prototype.each=function(e,t,n){g(e)&&(n=t,t=e,e=[]);var i=n||this,r=lu(iu(e),this._getStoreDimIndex,this);this._store.each(r,i?K(t,i):t)},e.prototype.filterSelf=function(e,t,n){g(e)&&(n=t,t=e,e=[]);var i=n||this,r=lu(iu(e),this._getStoreDimIndex,this);return this._store=this._store.filter(r,i?K(t,i):t),this},e.prototype.selectRange=function(e){var t=this,n={},i=_(e);return c(i,function(i){var r=t._getStoreDimIndex(i);n[r]=e[i]}),this._store=this._store.selectRange(n),this},e.prototype.mapArray=function(e,t,n){g(e)&&(n=t,t=e,e=[]);var i=[];return this.each(e,function(){i.push(t&&t.apply(this,arguments))},n=n||this),i},e.prototype.map=function(e,t,n,i){var r=n||i||this,a=lu(iu(e),this._getStoreDimIndex,this),o=au(this);return o._store=this._store.map(a,r?K(t,r):t),o},e.prototype.modify=function(e,t,n,i){var r=n||i||this,a=lu(iu(e),this._getStoreDimIndex,this);this._store.modify(a,r?K(t,r):t)},e.prototype.downSample=function(e,t,n,i){var r=au(this);return r._store=this._store.downSample(this._getStoreDimIndex(e),t,n,i),r},e.prototype.minmaxDownSample=function(e,t){var n=au(this);return n._store=this._store.minmaxDownSample(this._getStoreDimIndex(e),t),n},e.prototype.lttbDownSample=function(e,t){var n=au(this);return n._store=this._store.lttbDownSample(this._getStoreDimIndex(e),t),n},e.prototype.getRawDataItem=function(e){return this._store.getRawDataItem(e)},e.prototype.getItemModel=function(e){var t=this.hostModel,n=this.getRawDataItem(e);return new ai(n,t,t&&t.ecModel)},e.prototype.diff=function(e){var t=this;return new Hl(e?e.getStore().getIndices():[],this.getStore().getIndices(),function(t){return tu(e,t)},function(e){return tu(t,e)})},e.prototype.getVisual=function(e){var t=this._visual;return t&&t[e]},e.prototype.setVisual=function(e,t){this._visual=this._visual||{},su(e)?d(this._visual,e):this._visual[e]=t},e.prototype.getItemVisual=function(e,t){var n=this._itemVisuals[e],i=n&&n[t];return null==i?this.getVisual(t):i},e.prototype.hasItemVisual=function(){return this._itemVisuals.length>0},e.prototype.ensureUniqueItemVisual=function(e,t){var n=this._itemVisuals,i=n[e];i||(i=n[e]={});var r=i[t];return null==r&&(r=this.getVisual(t),a(r)?r=r.slice():su(r)&&(r=d({},r)),i[t]=r),r},e.prototype.setItemVisual=function(e,t,n){var i=this._itemVisuals[e]||{};this._itemVisuals[e]=i,su(t)?d(i,t):i[t]=n},e.prototype.clearAllVisual=function(){this._visual={},this._itemVisuals=[]},e.prototype.setLayout=function(e,t){su(e)?d(this._layout,e):this._layout[e]=t},e.prototype.getLayout=function(e){return this._layout[e]},e.prototype.getItemLayout=function(e){return this._itemLayouts[e]},e.prototype.setItemLayout=function(e,t,n){this._itemLayouts[e]=n?d(this._itemLayouts[e]||{},t):t},e.prototype.clearItemLayouts=function(){this._itemLayouts.length=0},e.prototype.setItemGraphicEl=function(e,t){!function(e,t,n,i){if(i){var r=Vt(i);
// Add data index and series index for indexing the data by element
// Useful in tooltip
r.dataIndex=n,r.dataType=t,r.seriesIndex=e,r.ssrType="chart",
// TODO: not store dataIndex on children.
"group"===i.type&&i.traverse(function(i){var r=Vt(i);r.seriesIndex=e,r.dataIndex=n,r.dataType=t,r.ssrType="chart"})}}(this.hostModel&&this.hostModel.seriesIndex,this.dataType,e,t),this._graphicEls[e]=t},e.prototype.getItemGraphicEl=function(e){return this._graphicEls[e]},e.prototype.eachItemGraphicEl=function(e,t){c(this._graphicEls,function(n,i){n&&e&&e.call(t,n,i)})},e.prototype.cloneShallow=function(t){return t||(t=new e(this._schema?this._schema:lu(this.dimensions,this._getDimInfo,this),this.hostModel)),ru(t,this),t._store=this._store,t},e.prototype.wrapMethod=function(e,t){var n=this[e];g(n)&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(e),this[e]=function(){var e=n.apply(this,arguments);return t.apply(this,[e].concat(he(arguments)))})},e.internalField=(eu=function(e){var t=e._invertedIndicesMap;c(t,function(n,i){var r=e._dimInfos[i],a=r.ordinalMeta,o=e._store;if(a){n=t[i]=new uu(a.categories.length);for(var s=0;s<n.length;s++)n[s]=-1;for(s=0;s<o.count();s++)n[o.get(r.storeDimIndex,s)]=s}})},nu=function(e,t,n){return gt(e._getCategory(t,n),null)},tu=function(e,t){var n=e._idList[t];return null==n&&null!=e._idDimIdx&&(n=nu(e,e._idDimIdx,t)),null==n&&(n="e\0\0"+t),n},iu=function(e){return a(e)||(e=null!=e?[e]:[]),e},au=function(t){var n=new e(t._schema?t._schema:lu(t.dimensions,t._getDimInfo,t),t.hostModel);return ru(n,t),n},ru=function(e,t){c(cu.concat(t.__wrappedMethods||[]),function(n){t.hasOwnProperty(n)&&(e[n]=t[n])}),e.__wrappedMethods=t.__wrappedMethods,c(pu,function(n){e[n]=U(t[n])}),e._calculationInfo=d({},t._calculationInfo)},void(ou=function(e,t){var n=e._nameList,i=e._idList,r=e._nameDimIdx,a=e._idDimIdx,o=n[t],s=i[t];if(null==o&&null!=r&&(n[t]=o=nu(e,r,t)),null==s&&null!=a&&(i[t]=s=nu(e,a,t)),null==s&&null!=o){var l=e._nameRepeatCount,u=l[o]=(l[o]||0)+1;s=o,u>1&&(s+="__ec__"+u),i[t]=s}})),e}();
/**
 * This method builds the relationship between:
 * + "what the coord sys or series requires (see `coordDimensions`)",
 * + "what the user defines (in `encode` and `dimensions`, see `opt.dimensionsDefine` and `opt.encodeDefine`)"
 * + "what the data source provids (see `source`)".
 *
 * Some guess strategy will be adapted if user does not define something.
 * If no 'value' dimension specified, the first no-named dimension will be
 * named as 'value'.
 *
 * @return The results are always sorted by `storeDimIndex` asc.
 */
function fu(
// TODO: TYPE completeDimensions type
e,n){ua(e)||(e=pa(e));var i=(n=n||{}).coordDimensions||[],r=n.dimensionsDefine||e.dimensionsDefine||[],a=u(),s=[],l=
// ??? TODO
// Originally detect dimCount by data[0]. Should we
// optimize it to only by sysDims and dimensions and encode.
// So only necessary dims will be initialized.
// But
// (1) custom series should be considered. where other dims
// may be visited.
// (2) sometimes user need to calculate bubble size or use visualMap
// on other dimensions besides coordSys needed.
// So, dims that is not used by system, should be shared in data store?
function(e,t,n,i){
// Note that the result dimCount should not small than columns count
// of data, otherwise `dataDimNameMap` checking will be incorrect.
var r=Math.max(e.dimensionsDetectedCount||1,t.length,n.length,i||0);return c(t,function(e){var t;o(e)&&(t=e.dimsDef)&&(r=Math.max(r,t.length))}),r}(e,i,r,n.dimensionsCount),p=n.canOmitUnusedDimensions&&Ql(l),h=r===e.dimensionsDefine,f=h?Jl(e):$l(r),g=n.encodeDefine;!g&&n.encodeDefaulter&&(g=n.encodeDefaulter(e,l));for(var m=u(g),v=new Za(l),y=0;y<v.length;y++)v[y]=-1;function _(e){var t=v[e];if(t<0){var n=r[e],i=o(n)?n:{name:n},a=new Zl,l=i.name;return null!=l&&null!=f.get(l)&&(
// Only if `series.dimensions` is defined in option
// displayName, will be set, and dimension will be displayed vertically in
// tooltip by default.
a.name=a.displayName=l),null!=i.type&&(a.type=i.type),null!=i.displayName&&(a.displayName=i.displayName),v[e]=s.length,a.storeDimIndex=e,s.push(a),a}return s[t]}if(!p)for(y=0;y<l;y++)_(y);
// Set `coordDim` and `coordDimIndex` by `encodeDefMap` and normalize `encodeDefMap`.
m.each(function(e,n){var i=lt(e).slice();
// Note: It is allowed that `dataDims.length` is `0`, e.g., options is
// `{encode: {x: -1, y: 1}}`. Should not filter anything in
// this case.
if(1===i.length&&!t(i[0])&&i[0]<0)m.set(n,!1);else{var r=m.set(n,[]);c(i,function(e,i){
// The input resultDimIdx can be dim name or index.
var a=t(e)?f.get(e):e;null!=a&&a<l&&(r[i]=a,w(_(a),n,i))})}});
// Apply templates and default order from `sysDims`.
var x=0;function w(e,t,n){null!=or.get(t)?e.otherDims[t]=n:(e.coordDim=t,e.coordDimIndex=n,a.set(t,!0))}
// Make sure the first extra dim is 'value'.
c(i,function(e){var n,i,r,a;if(t(e))n=e,a={};else{n=(a=e).name;var s=a.ordinalMeta;a.ordinalMeta=null,(a=d({},a)).ordinalMeta=s,
// `coordDimIndex` should not be set directly.
i=a.dimsDef,r=a.otherDims,a.name=a.coordDim=a.coordDimIndex=a.dimsDef=a.otherDims=null}var u=m.get(n);
// negative resultDimIdx means no need to mapping.
if(!1!==u){
// dimensions provides default dim sequences.
if(!(u=lt(u)).length)for(var p=0;p<(i&&i.length||1);p++){for(;x<l&&null!=_(x).coordDim;)x++;x<l&&u.push(x++)}
// Apply templates.
c(u,function(e,t){var s=_(e);
// Coordinate system has a higher priority on dim type than source.
if(h&&null!=a.type&&(s.type=a.type),w(I(s,a),n,t),null==s.name&&i){var l=i[t];!o(l)&&(l={name:l}),s.name=s.displayName=l.name,s.defaultTooltip=l.defaultTooltip}
// FIXME refactor, currently only used in case: {otherDims: {tooltip: false}}
r&&I(s.otherDims,r)})}});var M=n.generateCoord,b=n.generateCoordCount,S=null!=b;b=M?b||1:0;var D=M||"value";function C(e){null==e.name&&(
// Duplication will be removed in the next step.
e.name=e.coordDim)}
// Set dim `name` and other `coordDim` and other props.
if(p)c(s,function(e){
// PENDING: guessOrdinal or let user specify type: 'ordinal' manually?
C(e)}),
// Sort dimensions: there are some rule that use the last dim as label,
// and for some latter travel process easier.
s.sort(function(e,t){return e.storeDimIndex-t.storeDimIndex});else for(var T=0;T<l;T++){var k=_(T);null==k.coordDim&&(
// TODO no need to generate coordDim for isExtraCoord?
k.coordDim=du(D,a,S),k.coordDimIndex=0,
// Series specified generateCoord is using out.
(!M||b<=0)&&(k.isExtraCoord=!0),b--),C(k),null!=k.type||1!==yr(e,T)&&(!k.isExtraCoord||null==k.otherDims.itemName&&null==k.otherDims.seriesName)||(k.type="ordinal")}return function(e){for(var t=u(),n=0;n<e.length;n++){var i=e[n],r=i.name,a=t.get(r)||0;a>0&&(
// Starts from 0.
i.name=r+(a-1)),a++,t.set(r,a)}}(s),new Xl({source:e,dimensions:s,fullDimensionCount:l,dimensionOmitted:p})}function du(e,t,n){if(n||t.hasKey(e)){for(var i=0;t.hasKey(e+i);)i++;e+=i}return t.set(e,!0),e}var gu=
/** @class */
function(){return function(e){this.coordSysDims=[],this.axisMap=u(),this.categoryAxisMap=u(),this.coordSysName=e}}(),mu={cartesian2d:function(e,t,n,i){var r=e.getReferringComponents("xAxis",bt).models[0],a=e.getReferringComponents("yAxis",bt).models[0];t.coordSysDims=["x","y"],n.set("x",r),n.set("y",a),vu(r)&&(i.set("x",r),t.firstCategoryDimIndex=0),vu(a)&&(i.set("y",a),null==t.firstCategoryDimIndex&&(t.firstCategoryDimIndex=1))},singleAxis:function(e,t,n,i){var r=e.getReferringComponents("singleAxis",bt).models[0];t.coordSysDims=["single"],n.set("single",r),vu(r)&&(i.set("single",r),t.firstCategoryDimIndex=0)},polar:function(e,t,n,i){var r=e.getReferringComponents("polar",bt).models[0],a=r.findAxisModel("radiusAxis"),o=r.findAxisModel("angleAxis");t.coordSysDims=["radius","angle"],n.set("radius",a),n.set("angle",o),vu(a)&&(i.set("radius",a),t.firstCategoryDimIndex=0),vu(o)&&(i.set("angle",o),null==t.firstCategoryDimIndex&&(t.firstCategoryDimIndex=1))},geo:function(e,t){t.coordSysDims=["lng","lat"]},parallel:function(e,t,n,i){var r=e.ecModel,a=r.getComponent("parallel",e.get("parallelIndex")),o=t.coordSysDims=a.dimensions.slice();c(a.parallelAxisIndex,function(e,a){var s=r.getComponent("parallelAxis",e),l=o[a];n.set(l,s),vu(s)&&(i.set(l,s),null==t.firstCategoryDimIndex&&(t.firstCategoryDimIndex=a))})}};function vu(e){return"category"===e.get("type")}
/**
 * Note that it is too complicated to support 3d stack by value
 * (have to create two-dimension inverted index), so in 3d case
 * we just support that stacked by index.
 *
 * @param seriesModel
 * @param dimensionsInput The same as the input of <module:echarts/data/SeriesData>.
 *        The input will be modified.
 * @param opt
 * @param opt.stackedCoordDimension Specify a coord dimension if needed.
 * @param opt.byIndex=false
 * @return calculationInfo
 * {
 *     stackedDimension: string
 *     stackedByDimension: string
 *     isStackedByIndex: boolean
 *     stackedOverDimension: string
 *     stackResultDimension: string
 * }
 */function yu(e,n,i){var r,a,o,s=(i=i||{}).byIndex,l=i.stackedCoordDimension;!function(e){return!Kl(e.schema)}(n)?(r=(a=n.schema).dimensions,o=n.store):r=n;
// Compatibal: when `stack` is set as '', do not stack.
var u,p,h,f,d=!(!e||!e.get("stack"));
// Add stack dimension, they can be both calculated by coordinate system in `unionExtent`.
// That put stack logic in List is for using conveniently in echarts extensions, but it
// might not be a good way.
if(c(r,function(e,n){t(e)&&(r[n]=e={name:e}),d&&!e.isExtraCoord&&(
// Find the first ordinal dimension as the stackedByDimInfo.
s||u||!e.ordinalMeta||(u=e),
// Find the first stackable dimension as the stackedDimInfo.
p||"ordinal"===e.type||"time"===e.type||l&&l!==e.coordDim||(p=e))}),!p||s||u||(
// Compatible with previous design, value axis (time axis) only stack by index.
// It may make sense if the user provides elaborately constructed data.
s=!0),p){
// Use a weird name that not duplicated with other names.
// Also need to use seriesModel.id as postfix because different
// series may share same data store. The stack dimension needs to be distinguished.
h="__\0ecstackresult_"+e.id,f="__\0ecstackedover_"+e.id,
// Create inverted index to fast query index by value.
u&&(u.createInvertedIndices=!0);var g=p.coordDim,m=p.type,v=0;c(r,function(e){e.coordDim===g&&v++});var y={name:h,coordDim:g,coordDimIndex:v,type:m,isExtraCoord:!0,isCalculationCoord:!0,storeDimIndex:r.length},_={name:f,
// This dimension contains stack base (generally, 0), so do not set it as
// `stackedDimCoordDim` to avoid extent calculation, consider log scale.
coordDim:f,coordDimIndex:v+1,type:m,isExtraCoord:!0,isCalculationCoord:!0,storeDimIndex:r.length+1};a?(o&&(y.storeDimIndex=o.ensureCalculationDimension(f,m),_.storeDimIndex=o.ensureCalculationDimension(h,m)),a.appendCalculationDimension(y),a.appendCalculationDimension(_)):(r.push(y),r.push(_))}return{stackedDimension:p&&p.name,stackedByDimension:u&&u.name,isStackedByIndex:s,stackedOverDimension:f,stackResultDimension:h}}function _u(e,t){
// Each single series only maps to one pair of axis. So we do not need to
// check stackByDim, whatever stacked by a dimension or stacked by index.
return!!t&&t===e.getCalculationInfo("stackedDimension")}var xu=/** @class */function(){function e(e){this._setting=e||{},this._extent=[1/0,-1/0]}return e.prototype.getSetting=function(e){return this._setting[e]},
/**
   * Set extent from data
   */
e.prototype.unionExtent=function(e){var t=this._extent;e[0]<t[0]&&(t[0]=e[0]),e[1]>t[1]&&(t[1]=e[1])},
/**
   * Set extent from data
   */
e.prototype.unionExtentFromData=function(e,t){this.unionExtent(e.getApproximateExtent(t))},
/**
   * Get extent
   *
   * Extent is always in increase order.
   */
e.prototype.getExtent=function(){return this._extent.slice()},
/**
   * Set extent
   */
e.prototype.setExtent=function(e,t){var n=this._extent;isNaN(e)||(n[0]=e),isNaN(t)||(n[1]=t)},
/**
   * If value is in extent range
   */
e.prototype.isInExtentRange=function(e){return this._extent[0]<=e&&this._extent[1]>=e},
/**
   * When axis extent depends on data and no data exists,
   * axis ticks should not be drawn, which is named 'blank'.
   */
e.prototype.isBlank=function(){return this._isBlank},
/**
   * When axis extent depends on data and no data exists,
   * axis ticks should not be drawn, which is named 'blank'.
   */
e.prototype.setBlank=function(e){this._isBlank=e},e}();Rt(xu);var wu=0,Mu=/** @class */function(){function e(e){this.categories=e.categories||[],this._needCollect=e.needCollect,this._deduplication=e.deduplication,this.uid=++wu}return e.createByAxisModel=function(t){var n=t.option,r=n.data,a=r&&i(r,bu);return new e({categories:a,needCollect:!a,
// deduplication is default in axis.
deduplication:!1!==n.dedplication})},e.prototype.getOrdinal=function(e){
// @ts-ignore
return this._getOrCreateMap().get(e)},
/**
   * @return The ordinal. If not found, return NaN.
   */
e.prototype.parseAndCollect=function(e){var n,i=this._needCollect;
// The value of category dim can be the index of the given category set.
// This feature is only supported when !needCollect, because we should
// consider a common case: a value is 2017, which is a number but is
// expected to be tread as a category. This case usually happen in dataset,
// where it happent to be no need of the index feature.
if(!t(e)&&!i)return e;
// Optimize for the scenario:
// category is ['2012-01-01', '2012-01-02', ...], where the input
// data has been ensured not duplicate and is large data.
// Notice, if a dataset dimension provide categroies, usually echarts
// should remove duplication except user tell echarts dont do that
// (set axis.deduplication = false), because echarts do not know whether
// the values in the category dimension has duplication (consider the
// parallel-aqi example)
if(i&&!this._deduplication)return this.categories[n=this.categories.length]=e,n;var r=this._getOrCreateMap();
// @ts-ignore
return null==(n=r.get(e))&&(i?(this.categories[n=this.categories.length]=e,
// @ts-ignore
r.set(e,n)):n=NaN),n},
// Consider big data, do not create map until needed.
e.prototype._getOrCreateMap=function(){return this._map||(this._map=u(this.categories))},e}();function bu(e){return o(e)&&null!=e.value?e.value:e+""}
/**
 * @param extent Both extent[0] and extent[1] should be valid number.
 *               Should be extent[0] < extent[1].
 * @param splitNumber splitNumber should be >= 1.
 */
/**
 * @return interval precision
 */
function Su(e){
// Tow more digital for tick.
return Ze(e)+2}function Iu(e,t,n){e[t]=Math.max(Math.min(e[t],n[1]),n[0])}
// In some cases (e.g., splitNumber is 1), niceTickExtent may be out of extent.
function Du(e,t){return e>=t[0]&&e<=t[1]}function Cu(e,t){return t[1]===t[0]?.5:(e-t[0])/(t[1]-t[0])}function Tu(e,t){return e*(t[1]-t[0])+t[0]}var ku=/** @class */function(e){function n(t){var n=e.call(this,t)||this;n.type="ordinal";var r=n.getSetting("ordinalMeta");
// Caution: Should not use instanceof, consider ec-extensions using
// import approach to get OrdinalMeta class.
return r||(r=new Mu({})),a(r)&&(r=new Mu({categories:i(r,function(e){return o(e)?e.value:e})})),n._ordinalMeta=r,n._extent=n.getSetting("extent")||[0,r.categories.length-1],n}return h(n,e),n.prototype.parse=function(e){
// Caution: Math.round(null) will return `0` rather than `NaN`
return null==e?NaN:t(e)?this._ordinalMeta.getOrdinal(e):Math.round(e)},n.prototype.contain=function(e){return Du(e=this.parse(e),this._extent)&&null!=this._ordinalMeta.categories[e]},
/**
   * Normalize given rank or name to linear [0, 1]
   * @param val raw ordinal number.
   * @return normalized value in [0, 1].
   */
n.prototype.normalize=function(e){return Cu(e=this._getTickNumber(this.parse(e)),this._extent)},
/**
   * @param val normalized value in [0, 1].
   * @return raw ordinal number.
   */
n.prototype.scale=function(e){return e=Math.round(Tu(e,this._extent)),this.getRawOrdinalNumber(e)},n.prototype.getTicks=function(){for(var e=[],t=this._extent,n=t[0];n<=t[1];)e.push({value:n}),n++;return e},n.prototype.getMinorTicks=function(){},
/**
   * @see `Ordinal['_ordinalNumbersByTick']`
   */
n.prototype.setSortInfo=function(e){if(null!=e){for(var t=e.ordinalNumbers,n=this._ordinalNumbersByTick=[],i=this._ticksByOrdinalNumber=[],r=0,a=this._ordinalMeta.categories.length,o=Math.min(a,t.length);r<o;++r){var s=t[r];n[r]=s,i[s]=r}
// Handle that `series.data` only covers part of the `axis.category.data`.
for(var l=0;r<a;++r){for(;null!=i[l];)l++;n.push(l),i[l]=r}}else this._ordinalNumbersByTick=this._ticksByOrdinalNumber=null},n.prototype._getTickNumber=function(e){var t=this._ticksByOrdinalNumber;
// also support ordinal out of range of `ordinalMeta.categories.length`,
// where ordinal numbers are used as tick value directly.
return t&&e>=0&&e<t.length?t[e]:e},
/**
   * @usage
   * ```js
   * const ordinalNumber = ordinalScale.getRawOrdinalNumber(tickVal);
   *
   * // case0
   * const rawOrdinalValue = axisModel.getCategories()[ordinalNumber];
   * // case1
   * const rawOrdinalValue = this._ordinalMeta.categories[ordinalNumber];
   * // case2
   * const coord = axis.dataToCoord(ordinalNumber);
   * ```
   *
   * @param {OrdinalNumber} tickNumber index of display
   */
n.prototype.getRawOrdinalNumber=function(e){var t=this._ordinalNumbersByTick;
// tickNumber may be out of range, e.g., when axis max is larger than `ordinalMeta.categories.length`.,
// where ordinal numbers are used as tick value directly.
return t&&e>=0&&e<t.length?t[e]:e},
/**
   * Get item on tick
   */
n.prototype.getLabel=function(e){if(!this.isBlank()){var t=this.getRawOrdinalNumber(e.value),n=this._ordinalMeta.categories[t];
// Note that if no data, ordinalMeta.categories is an empty array.
// Return empty if it's not exist.
return null==n?"":n+""}},n.prototype.count=function(){return this._extent[1]-this._extent[0]+1},n.prototype.unionExtentFromData=function(e,t){this.unionExtent(e.getApproximateExtent(t))},
/**
   * @override
   * If value is in extent range
   */
n.prototype.isInExtentRange=function(e){return e=this._getTickNumber(e),this._extent[0]<=e&&this._extent[1]>=e},n.prototype.getOrdinalMeta=function(){return this._ordinalMeta},n.prototype.calcNiceTicks=function(){},n.prototype.calcNiceExtent=function(){},n.type="ordinal",n}(xu);xu.registerClass(ku);var Ou=Ye,Lu=/** @class */function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="interval",
// Step is calculated in adjustExtent.
t._interval=0,t._intervalPrecision=2,t}return h(t,e),t.prototype.parse=function(e){return e},t.prototype.contain=function(e){return Du(e,this._extent)},t.prototype.normalize=function(e){return Cu(e,this._extent)},t.prototype.scale=function(e){return Tu(e,this._extent)},t.prototype.setExtent=function(e,t){var n=this._extent;
// start,end may be a Number like '25',so...
isNaN(e)||(n[0]=parseFloat(e)),isNaN(t)||(n[1]=parseFloat(t))},t.prototype.unionExtent=function(e){var t=this._extent;e[0]<t[0]&&(t[0]=e[0]),e[1]>t[1]&&(t[1]=e[1]),
// unionExtent may called by it's sub classes
this.setExtent(t[0],t[1])},t.prototype.getInterval=function(){return this._interval},t.prototype.setInterval=function(e){this._interval=e,
// Dropped auto calculated niceExtent and use user-set extent.
// We assume user wants to set both interval, min, max to get a better result.
this._niceExtent=this._extent.slice(),this._intervalPrecision=Su(e)},
/**
   * @param expandToNicedExtent Whether expand the ticks to niced extent.
   */
t.prototype.getTicks=function(e){var t=this._interval,n=this._extent,i=this._niceExtent,r=this._intervalPrecision,a=[];
// If interval is 0, return [];
if(!t)return a;
// Consider this case: using dataZoom toolbox, zoom and zoom.
n[0]<i[0]&&a.push(e?{value:Ou(i[0]-t,r)}:{value:n[0]});for(var o=i[0];o<=i[1]&&(a.push({value:o}),(
// Avoid rounding error
o=Ou(o+t,r))!==a[a.length-1].value);)if(a.length>1e4)return[];
// Consider this case: the last item of ticks is smaller
// than niceTickExtent[1] and niceTickExtent[1] === extent[1].
var s=a.length?a[a.length-1].value:i[1];return n[1]>s&&a.push(e?{value:Ou(s+t,r)}:{value:n[1]}),a},t.prototype.getMinorTicks=function(e){for(var t=this.getTicks(!0),n=[],i=this.getExtent(),r=1;r<t.length;r++){for(var a=t[r-1],o=0,s=[],l=(t[r].value-a.value)/e;o<e-1;){var u=Ou(a.value+(o+1)*l);
// For the first and last interval. The count may be less than splitNumber.
u>i[0]&&u<i[1]&&s.push(u),o++}n.push(s)}return n},
/**
   * @param opt.precision If 'auto', use nice presision.
   * @param opt.pad returns 1.50 but not 1.5 if precision is 2.
   */
t.prototype.getLabel=function(e,t){if(null==e)return"";var n=t&&t.precision;return null==n?n=Ze(e.value)||0:"auto"===n&&(
// Should be more precise then tick.
n=this._intervalPrecision),Hi(Ou(e.value,n,!0))},
/**
   * @param splitNumber By default `5`.
   */
t.prototype.calcNiceTicks=function(e,t,n){e=e||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){
// User may set axis min 0 and data are all negative
// FIXME If it needs to reverse ?
r<0&&(r=-r,i.reverse());var a=function(e,t,n,i){var r={},a=r.interval=et((e[1]-e[0])/t,!0);null!=n&&a<n&&(a=r.interval=n),null!=i&&a>i&&(a=r.interval=i);
// Tow more digital for tick.
var o=r.intervalPrecision=Su(a);
// Niced extent inside original extent
return function(e,t){!isFinite(e[0])&&(e[0]=t[0]),!isFinite(e[1])&&(e[1]=t[1]),Iu(e,0,t),Iu(e,1,t),e[0]>e[1]&&(e[0]=e[1])}(r.niceTickExtent=[Ye(Math.ceil(e[0]/a)*a,o),Ye(Math.floor(e[1]/a)*a,o)],e),r}(i,e,t,n);this._intervalPrecision=a.intervalPrecision,this._interval=a.interval,this._niceExtent=a.niceTickExtent}},t.prototype.calcNiceExtent=function(e){var t=this._extent;
// If extent start and end are same, expand them
if(t[0]===t[1])if(0!==t[0]){
// Expand extent
// Note that extents can be both negative. See #13154
var n=Math.abs(t[0]);
// In the fowllowing case
//      Axis has been fixed max 100
//      Plus data are all 100 and axis extent are [100, 100].
// Extend to the both side will cause expanded max is larger than fixed max.
// So only expand to the smaller side.
e.fixMax||(t[1]+=n/2),t[0]-=n/2}else t[1]=1;
// If there are no data and extent are [Infinity, -Infinity]
isFinite(t[1]-t[0])||(t[0]=0,t[1]=1),this.calcNiceTicks(e.splitNumber,e.minInterval,e.maxInterval);
// let extent = this._extent;
var i=this._interval;e.fixMin||(t[0]=Ou(Math.floor(t[0]/i)*i)),e.fixMax||(t[1]=Ou(Math.ceil(t[1]/i)*i))},t.prototype.setNiceExtent=function(e,t){this._niceExtent=[e,t]},t.type="interval",t}(xu);function Au(e){return e.get("stack")||"__ec_stack_"+e.seriesIndex}function Nu(e){return e.dim+e.index}xu.registerClass(Lu);var Ru=
/** @class */function(e){function n(t){var n=e.call(this,t)||this;return n.type="time",n}return h(n,e),n.prototype.getLabel=function(e){var t=this.getSetting("useUTC");return Di(e.value,xi[function(e){switch(e){case"year":case"month":return"day";case"millisecond":return"millisecond";default:
// Also for day, hour, minute, second
return"second"}}(Si(this._minLevelUnit))]||xi.second,t,this.getSetting("locale"))},n.prototype.getFormattedLabel=function(e,n,i){var r=this.getSetting("useUTC");return function(e,n,i,r,o){var s=null;if(t(i))
// Single formatter for all units at all levels
s=i;else if(g(i))
// Callback formatter
s=i(e.value,n,{level:e.level});else{var l=d({},yi);if(e.level>0)for(var u=0;u<wi.length;++u)l[wi[u]]="{primary|"+l[wi[u]]+"}";var c=i?!1===i.inherit?i:I(i,l):l,p=Ci(e.value,o);if(c[p])s=c[p];else if(c.inherit){for(u=Mi.indexOf(p)-1;u>=0;--u)if(c[p]){s=c[p];break}s=s||l.none}if(a(s)){var h=null==e.level?0:e.level>=0?e.level:s.length+e.level;s=s[h=Math.min(h,s.length-1)]}}return Di(new Date(e.value),s,o,r)}(e,n,i,this.getSetting("locale"),r)},n.prototype.getTicks=function(){var e=this._extent,t=[];if(!this._interval)return t;t.push({value:e[0],level:0});var n=this.getSetting("useUTC"),r=function(e,t,n,r){var a=Mi,o=0;function s(e,t,n,i,a,o,s){for(var l=new Date(t),u=t,c=l[i]();u<n&&u<=r[1];)s.push({value:u}),l[a](c+=e),u=l.getTime();s.push({value:u,notAdd:!0})}function l(e,i,a){var o=[],l=!i.length;if(!function(e,t,n,i){var r=$e(t),a=$e(n),o=function(e){return Ti(r,e,i)===Ti(a,e,i)},s=function(){return o("year")},l=function(){return s()&&o("month")},u=function(){return l()&&o("day")},c=function(){return u()&&o("hour")},p=function(){return c()&&o("minute")},h=function(){return p()&&o("second")};switch(e){case"year":return s();case"month":return l();case"day":return u();case"hour":return c();case"minute":return p();case"second":return h();case"millisecond":return h()&&o("millisecond")}}(Si(e),r[0],r[1],n)){l&&(i=[{
// TODO Optimize. Not include so may ticks.
value:Uu(new Date(r[0]),e,n)},{value:r[1]}]);for(var u=0;u<i.length-1;u++){var c=i[u].value,p=i[u+1].value;if(c!==p){var h=void 0,f=void 0,d=void 0;switch(e){case"year":h=Math.max(1,Math.round(t/mi/365)),f=ki(n),d=Pi(n);break;case"half-year":case"quarter":case"month":h=Bu(t),f=Oi(n),d=Bi(n);break;case"week":
// PENDING If week is added. Ignore day.
case"half-week":case"day":h=Pu(t),f=Li(n),d=Vi(n);break;case"half-day":case"quarter-day":case"hour":h=Vu(t),f=Ai(n),d=Fi(n);break;case"minute":h=Fu(t,!0),f=Ni(n),d=zi(n);break;case"second":h=Fu(t,!1),f=Ri(n),d=Ui(n);break;case"millisecond":h=zu(t),f=Ei(n),d=Gi(n)}s(h,c,p,f,d,0,o),"year"===e&&a.length>1&&0===u&&a.unshift({value:a[0].value-h})}}for(u=0;u<o.length;u++)a.push(o[u]);return o}}for(var u=[],c=[],p=0,h=0,f=0;f<a.length&&o++<1e4;++f){var d=Si(a[f]);if(Ii(a[f])&&(l(a[f],u[u.length-1]||[],c),d!==(a[f+1]?Si(a[f+1]):null))){if(c.length){h=p,c.sort(function(e,t){return e.value-t.value});for(var g=[],m=0;m<c.length;++m){var v=c[m].value;0!==m&&c[m-1].value===v||(g.push(c[m]),v>=r[0]&&v<=r[1]&&p++)}var y=(r[1]-r[0])/t;if(p>1.5*y&&h>y/1.5)break;if(u.push(g),p>y||e===a[f])break}c=[]}}var _=X(i(u,function(e){return X(e,function(e){return e.value>=r[0]&&e.value<=r[1]&&!e.notAdd})}),function(e){return e.length>0}),x=[],w=_.length-1;for(f=0;f<_.length;++f)for(var M=_[f],b=0;b<M.length;++b)x.push({value:M[b].value,level:w-f});x.sort(function(e,t){return e.value-t.value});var S=[];for(f=0;f<x.length;++f)0!==f&&x[f].value===x[f-1].value||S.push(x[f]);return S}(this._minLevelUnit,this._approxInterval,n,e);return(t=t.concat(r)).push({value:e[1],level:0}),t},n.prototype.calcNiceExtent=function(e){var t=this._extent;if(t[0]===t[1]&&(t[0]-=mi,t[1]+=mi),t[1]===-1/0&&t[0]===1/0){var n=new Date;t[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),t[0]=t[1]-mi}this.calcNiceTicks(e.splitNumber,e.minInterval,e.maxInterval)},n.prototype.calcNiceTicks=function(e,t,n){var i=this._extent;this._approxInterval=(i[1]-i[0])/(e=e||10),null!=t&&this._approxInterval<t&&(this._approxInterval=t),null!=n&&this._approxInterval>n&&(this._approxInterval=n);var r=Eu.length,a=Math.min(function(e,t,n,i){for(;n<i;){var r=n+i>>>1;e[r][1]<t?n=r+1:i=r}return n}(Eu,this._approxInterval,0,r),r-1);this._interval=Eu[a][1],this._minLevelUnit=Eu[Math.max(a-1,0)][0]},n.prototype.parse=function(e){return s(e)?e:+$e(e)},n.prototype.contain=function(e){return Du(this.parse(e),this._extent)},n.prototype.normalize=function(e){return Cu(this.parse(e),this._extent)},n.prototype.scale=function(e){return Tu(e,this._extent)},n.type="time",n}(Lu),Eu=[
// Format                           interval
["second",1e3],["minute",6e4],["hour",gi],["quarter-day",216e5],["half-day",432e5],["day",10368e4],["half-week",3024e5],["week",6048e5],["month",26784e5],["quarter",8208e6],["half-year",vi/2],["year",vi]];function Pu(e){return(e/=mi)>16?16:e>7.5?7:e>3.5?4:e>1.5?2:1}function Bu(e){return(e/=2592e6)>6?6:e>3?3:e>2?2:1}function Vu(e){return(e/=gi)>12?12:e>6?6:e>3.5?4:e>2?2:1}function Fu(e,t){return(e/=t?6e4:1e3)>30?30:e>20?20:e>15?15:e>10?10:e>5?5:e>2?2:1}function zu(e){return et(e,!0)}function Uu(e,t,n){var i=new Date(e);switch(Si(t)){case"year":case"month":i[Bi(n)](0);case"day":i[Vi(n)](1);case"hour":i[Fi(n)](0);case"minute":i[zi(n)](0);case"second":i[Ui(n)](0),i[Gi(n)](0)}return i.getTime()}xu.registerClass(Ru);var Gu=xu.prototype,Hu=Lu.prototype,Wu=Ye,Yu=Math.floor,Zu=Math.ceil,qu=Math.pow,ju=Math.log,Xu=/** @class */function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="log",t.base=10,t._originalScale=new Lu,
// FIXME:TS actually used by `IntervalScale`
t._interval=0,t}
/**
   * @param Whether expand the ticks to niced extent.
   */return h(t,e),t.prototype.getTicks=function(e){var t=this._extent,n=this._originalScale.getExtent(),r=Hu.getTicks.call(this,e);return i(r,function(e){var i=e.value,r=Ye(qu(this.base,i));
// Fix #4158
return r=i===t[0]&&this._fixMin?$u(r,n[0]):r,{value:r=i===t[1]&&this._fixMax?$u(r,n[1]):r}},this)},t.prototype.setExtent=function(e,t){var n=ju(this.base);
// log(-Infinity) is NaN, so safe guard here
e=ju(Math.max(0,e))/n,t=ju(Math.max(0,t))/n,Hu.setExtent.call(this,e,t)},
/**
   * @return {number} end
   */
t.prototype.getExtent=function(){var e=this.base,t=Gu.getExtent.call(this);t[0]=qu(e,t[0]),t[1]=qu(e,t[1]);
// Fix #4158
var n=this._originalScale.getExtent();return this._fixMin&&(t[0]=$u(t[0],n[0])),this._fixMax&&(t[1]=$u(t[1],n[1])),t},t.prototype.unionExtent=function(e){this._originalScale.unionExtent(e);var t=this.base;e[0]=ju(e[0])/ju(t),e[1]=ju(e[1])/ju(t),Gu.unionExtent.call(this,e)},t.prototype.unionExtentFromData=function(e,t){
// TODO
// filter value that <= 0
this.unionExtent(e.getApproximateExtent(t))},
/**
   * Update interval and extent of intervals for nice ticks
   * @param approxTickNum default 10 Given approx tick number
   */
t.prototype.calcNiceTicks=function(e){e=e||10;var t=this._extent,n=t[1]-t[0];if(!(n===1/0||n<=0)){var i=Je(n);
// Interval should be integer
for(
// Filter ticks to get closer to the desired count.
e/n*i<=.5&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&Math.abs(i)>0;)i*=10;var r=[Ye(Zu(t[0]/i)*i),Ye(Yu(t[1]/i)*i)];this._interval=i,this._niceExtent=r}},t.prototype.calcNiceExtent=function(e){Hu.calcNiceExtent.call(this,e),this._fixMin=e.fixMin,this._fixMax=e.fixMax},t.prototype.parse=function(e){return e},t.prototype.contain=function(e){return Du(e=ju(e)/ju(this.base),this._extent)},t.prototype.normalize=function(e){return Cu(e=ju(e)/ju(this.base),this._extent)},t.prototype.scale=function(e){return e=Tu(e,this._extent),qu(this.base,e)},t.type="log",t}(xu),Ku=Xu.prototype;
// FIXME:TS refactor: not good to call it directly with `this`?
function $u(e,t){return Wu(e,Ze(t))}Ku.getMinorTicks=Hu.getMinorTicks,Ku.getLabel=Hu.getLabel,xu.registerClass(Xu);var Ju=
/** @class */function(){function e(e,t,n){this._prepareParams(e,t,n)}return e.prototype._prepareParams=function(e,t,n){n[1]<n[0]&&(n=[NaN,NaN]),this._dataMin=n[0],this._dataMax=n[1];var i=this._isOrdinal="ordinal"===e.type;this._needCrossZero="interval"===e.type&&t.getNeedCrossZero&&t.getNeedCrossZero();var r=t.get("min",!0);null==r&&(r=t.get("startValue",!0));var o=this._modelMinRaw=r;g(o)?this._modelMinNum=tc(e,o({min:n[0],max:n[1]})):"dataMin"!==o&&(this._modelMinNum=tc(e,o));var s=this._modelMaxRaw=t.get("max",!0);if(g(s)?this._modelMaxNum=tc(e,s({min:n[0],max:n[1]})):"dataMax"!==s&&(this._modelMaxNum=tc(e,s)),i)this._axisDataLen=t.getCategories().length;else{var l=t.get("boundaryGap"),u=a(l)?l:[l||0,l||0];this._boundaryGapInner="boolean"==typeof u[0]||"boolean"==typeof u[1]?[0,0]:[fe(u[0],1),fe(u[1],1)]}},e.prototype.calculate=function(){var e=this._isOrdinal,t=this._dataMin,n=this._dataMax,i=this._axisDataLen,r=this._boundaryGapInner,a=e?null:n-t||Math.abs(t),o="dataMin"===this._modelMinRaw?t:this._modelMinNum,s="dataMax"===this._modelMaxRaw?n:this._modelMaxNum,l=null!=o,u=null!=s;null==o&&(o=e?i?0:NaN:t-r[0]*a),null==s&&(s=e?i?i-1:NaN:n+r[1]*a),(null==o||!isFinite(o))&&(o=NaN),(null==s||!isFinite(s))&&(s=NaN);var c=de(o)||de(s)||e&&!i;this._needCrossZero&&(o>0&&s>0&&!l&&(o=0),o<0&&s<0&&!u&&(s=0));var p=this._determinedMin,h=this._determinedMax;return null!=p&&(o=p,l=!0),null!=h&&(s=h,u=!0),{min:o,max:s,minFixed:l,maxFixed:u,isBlank:c}},e.prototype.modifyDataMinMax=function(e,t){this[ec[e]]=t},e.prototype.setDeterminedMinMax=function(e,t){this[Qu[e]]=t},e.prototype.freeze=function(){this.frozen=!0},e}(),Qu={min:"_determinedMin",max:"_determinedMax"},ec={min:"_dataMin",max:"_dataMax"};function tc(e,t){return null==t?null:de(t)?NaN:e.parse(t)}
/**
 * Get axis scale extent before niced.
 * Item of returned array can only be number (including Infinity and NaN).
 *
 * Caution:
 * Precondition of calling this method:
 * The scale extent has been initialized using series data extent via
 * `scale.setExtent` or `scale.unionExtentFromData`;
 */
/**
 * @param axis
 * @return Label formatter function.
 *         param: {number} tickValue,
 *         param: {number} idx, the index in all ticks.
 *                         If category axis, this param is not required.
 *         return: {string} label string.
 */
function nc(e){var n,i,r=e.getLabelModel().get("formatter"),a="category"===e.type?e.scale.getExtent()[0]:null;return"time"===e.scale.type?(i=r,function(t,n){return e.scale.getFormattedLabel(t,n,i)}):t(r)?function(t){return function(n){
// For category axis, get raw value; for numeric axis,
// get formatted label like '1,333,444'.
var i=e.scale.getLabel(n);return t.replace("{value}",null!=i?i:"")}}(r):g(r)?(n=r,function(t,i){
// The original intention of `idx` is "the index of the tick in all ticks".
// But the previous implementation of category axis do not consider the
// `axisLabel.interval`, which cause that, for example, the `interval` is
// `1`, then the ticks "name5", "name7", "name9" are displayed, where the
// corresponding `idx` are `0`, `2`, `4`, but not `0`, `1`, `2`. So we keep
// the definition here for back compatibility.
return null!=a&&(i=t.value-a),n(function(e,t){
// In category axis with data zoom, tick is not the original
// index of axis.data. So tick should not be exposed to user
// in category axis.
return"category"===e.type?e.scale.getLabel(t):t.value}
/**
 * @param model axisLabelModel or axisTickModel
 * @return {number|String} Can be null|'auto'|number|function
 */(e,t),i,null!=t.level?{level:t.level}:null)}):function(t){return e.scale.getLabel(t)}}function ic(e){var t=e.get("interval");return null==t?"auto":t}
/**
 * Set `categoryInterval` as 0 implicitly indicates that
 * show all labels regardless of overlap.
 * @param {Object} axis axisModel.axis
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var rc=/** @class */function(){function e(){}return e.prototype.getNeedCrossZero=function(){return!this.option.scale},
/**
   * Should be implemented by each axis model if necessary.
   * @return coordinate system model
   */
e.prototype.getCoordSysModel=function(){},e}();
/**
 * Create a multi dimension List structure from seriesModel.
 */const ac=Object.freeze(Object.defineProperty({__proto__:null,createDimensions:
/**
 * For outside usage compat (like echarts-gl are using it).
 */
function(e,t){return fu(e,t).dimensions},createList:function(e){
/**
 * Caution: there are side effects to `sourceManager` in this method.
 * Should better only be called in `Series['getInitialData']`.
 */
return function(e,t,n){n=n||{};var r,o,s=t.getSourceManager();
// Is series.data. not dataset.
o=(r=s.getSource()).sourceFormat===sr;var l=function(e){var t=e.get("coordinateSystem"),n=new gu(t),i=mu[t];if(i)return i(e,n,n.axisMap,n.categoryAxisMap),n}(t),u=function(e,t){var n,r=e.get("coordinateSystem"),a=Nr.get(r);return t&&t.coordSysDims&&(n=i(t.coordSysDims,function(e){var n={name:e},i=t.axisMap.get(e);if(i){var r=i.get("type");n.type=function(e){return"category"===e?"ordinal":"time"===e?"time":"float"}(r)}return n})),n||(
// Get dimensions from registered coordinate system
n=a&&(a.getDimensionsInfo?a.getDimensionsInfo():a.dimensions.slice())||["x","y"]),n}(t,l),p=n.useEncodeDefaulter,h=g(p)?p:p?q(mr,u,t):null,f=fu(r,{coordDimensions:u,generateCoord:n.generateCoord,encodeDefine:t.getEncode(),encodeDefaulter:h,canOmitUnusedDimensions:!o}),d=function(e,t,n){var i,r;return n&&c(e,function(e,a){var o=n.categoryAxisMap.get(e.coordDim);o&&(null==i&&(i=a),e.ordinalMeta=o.getOrdinalMeta(),t&&(e.createInvertedIndices=!0)),null!=e.otherDims.itemName&&(r=!0)}),r||null==i||(e[i].otherDims.itemName=0),i}(f.dimensions,n.createInvertedIndices,l),m=o?null:s.getSharedDataStore(f),v=yu(t,{schema:f,store:m}),y=new hu(f,t);y.setCalculationInfo(v);var _=null!=d&&function(e){if(e.sourceFormat===sr){var t=function(e){for(var t=0;t<e.length&&null==e[t];)t++;return e[t]}(e.data||[]);return!a(pt(t))}}(r)?function(e,t,n,i){
// Use dataIndex as ordinal value in categoryAxis
return i===d?n:this.defaultDimValueGetter(e,t,n,i)}:null;return y.hasItemOption=!1,y.initData(
// Try to reuse the data store in sourceManager if using dataset.
o?r:m,null,_),y}(0,e)},createScale:
/**
 * Create scale
 * @param {Array.<number>} dataExtent
 * @param {Object|module:echarts/Model} option If `optoin.type`
 *        is secified, it can only be `'value'` currently.
 */
function(e,t){var n=t;t instanceof ai||(n=new ai(t));var i=
/**
 * @param axisType Default retrieve from model.type
 */
function(e,t){if(t=t||e.get("type"))switch(t){
// Buildin scale
case"category":return new ku({ordinalMeta:e.getOrdinalMeta?e.getOrdinalMeta():e.getCategories(),extent:[1/0,-1/0]});case"time":return new Ru({locale:e.ecModel.getLocaleModel(),useUTC:e.ecModel.get("useUTC")});default:
// case 'value'/'interval', 'log', or others.
return new(xu.getClass(t)||Lu)}}(n);return i.setExtent(e[0],e[1]),
// Precondition of calling this method:
// The scale extent has been initialized using series data extent via
// `scale.setExtent` or `scale.unionExtentFromData`;
function(e,t){var n=t,i=function(e,t){var n=e.type,i=function(e,t,n){var i=e.rawExtentInfo;return i||(i=new Ju(e,t,n),e.rawExtentInfo=i,i)}(e,t,e.getExtent()).calculate();e.setBlank(i.isBlank);var r,a,o,s=i.min,l=i.max,u=t.ecModel;if(u&&"time"/* || scaleType === 'interval' */===n){var p=function(e,t){var n=[];return t.eachSeriesByType("bar",function(e){
// Check series coordinate, do layout for cartesian2d only
(function(e){return e.coordinateSystem&&"cartesian2d"===e.coordinateSystem.type})(e)&&n.push(e)}),n}
/**
 * Map from (baseAxis.dim + '_' + baseAxis.index) to min gap of two adjacent
 * values.
 * This works for time axes, value axes, and log axes.
 * For a single time axis, return value is in the form like
 * {'x_0': [1000000]}.
 * The value of 1000000 is in milliseconds.
 */(0,u),h=!1;if(c(p,function(e){h=h||e.getBaseAxis()===t.axis}),h){
// Calculate placement of bars on axis. TODO should be decoupled
// with barLayout
var f=(a=function(e){
/**
   * Map from axis.index to values.
   * For a single time axis, axisValues is in the form like
   * {'x_0': [1495555200000, 1495641600000, 1495728000000]}.
   * Items in axisValues[x], e.g. 1495555200000, are time values of all
   * series.
   */
var t={};c(e,function(e){var n=e.coordinateSystem.getBaseAxis();if("time"===n.type||"value"===n.type)for(var i=e.getData(),r=n.dim+"_"+n.index,a=i.getDimensionIndex(i.mapDimension(n.dim)),o=i.getStore(),s=0,l=o.count();s<l;++s){var u=o.get(a,s);t[r]?
// No value in previous series
t[r].push(u):
// No previous data for the axis
t[r]=[u];
// Ignore duplicated time values in the same axis
}});var n={};for(var i in t)if(t.hasOwnProperty(i)){var r=t[i];if(r){
// Sort axis values into ascending order to calculate gaps
r.sort(function(e,t){return e-t});for(var a=null,o=1;o<r.length;++o){var s=r[o]-r[o-1];s>0&&(
// Ignore 0 delta because they are of the same axis value
a=null===a?s:Math.min(a,s))}
// Set to null if only have one data
n[i]=a}}return n}(r=p),o=[],c(r,function(e){var t,n=e.coordinateSystem.getBaseAxis(),i=n.getExtent();if("category"===n.type)t=n.getBandWidth();else if("value"===n.type||"time"===n.type){var r=a[n.dim+"_"+n.index],s=Math.abs(i[1]-i[0]),l=n.scale.getExtent(),u=Math.abs(l[1]-l[0]);t=r?s/u*r:s}else{var c=e.getData();t=Math.abs(i[1]-i[0])/c.count()}var p=We(e.get("barWidth"),t),h=We(e.get("barMaxWidth"),t),f=We(
// barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
// the auto-calculated bar width might be less than 0.5 / 1.
e.get("barMinWidth")||(function(e){return e.pipelineContext&&e.pipelineContext.large}(e)?.5:1),t),d=e.get("barGap"),g=e.get("barCategoryGap");o.push({bandWidth:t,barWidth:p,barMaxWidth:h,barMinWidth:f,barGap:d,barCategoryGap:g,axisKey:Nu(n),stackId:Au(e)})}),function(e){
// Columns info on each category axis. Key is cartesian name
var t={};c(e,function(e){var n=e.axisKey,i=e.bandWidth,r=t[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:null,gap:"20%",stacks:{}},a=r.stacks;t[n]=r;var o=e.stackId;a[o]||r.autoWidthCount++,a[o]=a[o]||{width:0,maxWidth:0};
// Caution: In a single coordinate system, these barGrid attributes
// will be shared by series. Consider that they have default values,
// only the attributes set on the last series will work.
// Do not change this fact unless there will be a break change.
var s=e.barWidth;s&&!a[o].width&&(
// See #6312, do not restrict width.
a[o].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=e.barMaxWidth;l&&(a[o].maxWidth=l);var u=e.barMinWidth;u&&(a[o].minWidth=u);var c=e.barGap;null!=c&&(r.gap=c);var p=e.barCategoryGap;null!=p&&(r.categoryGap=p)});var n={};return c(t,function(e,t){n[t]={};var i=e.stacks,r=e.bandWidth,a=e.categoryGap;if(null==a){var o=_(i).length;
// More columns in one group
// the spaces between group is smaller. Or the column will be too thin.
a=Math.max(35-4*o,15)+"%"}var s=We(a,r),l=We(e.gap,1),u=e.remainedWidth,p=e.autoWidthCount,h=(u-s)/(p+(p-1)*l);h=Math.max(h,0),
// Find if any auto calculated bar exceeded maxBarWidth
c(i,function(e){var t=e.maxWidth,n=e.minWidth;if(e.width)i=e.width,t&&(i=Math.min(i,t)),
// `minWidth` has higher priority, as described above
n&&(i=Math.max(i,n)),e.width=i,u-=i+l*i,p--;else{var i=h;t&&t<i&&(i=Math.min(t,u)),
// `minWidth` has higher priority. `minWidth` decide that whether the
// bar is able to be visible. So `minWidth` should not be restricted
// by `maxWidth` or `remainedWidth` (which is from `bandWidth`). In
// the extreme cases for `value` axis, bars are allowed to overlap
// with each other if `minWidth` specified.
n&&n>i&&(i=n),i!==h&&(e.width=i,u-=i+l*i,p--)}}),
// Recalculate width again
h=(u-s)/(p+(p-1)*l),h=Math.max(h,0);var f,d=0;c(i,function(e){e.width||(e.width=h),f=e,d+=e.width*(1+l)}),f&&(d-=f.width*l);var g=-d/2;c(i,function(e,i){n[t][i]=n[t][i]||{bandWidth:r,offset:g,width:e.width},g+=e.width*(1+l)})}),n}(o)),d=function(e,t,n,
// Only support cartesian coord yet.
i){
// Get Axis Length
var r=n.axis.getExtent(),a=Math.abs(r[1]-r[0]),o=function(e,t){if(e&&t)return e[Nu(t)]}(i,n.axis);if(void 0===o)return{min:e,max:t};var s=1/0;c(o,function(e){s=Math.min(e.offset,s)});var l=-1/0;c(o,function(e){l=Math.max(e.offset+e.width,l)}),s=Math.abs(s),l=Math.abs(l);var u=s+l,p=t-e,h=p/(1-(s+l)/a)-p;
// Calculate required buffer based on old range and overflow
return{min:e-=h*(s/u),max:t+=h*(l/u)}}(s,l,t,f);
// Adjust axis min and max to account for overflow
s=d.min,l=d.max}}return{extent:[s,l],
// "fix" means "fixed", the value should not be
// changed in the subsequent steps.
fixMin:i.minFixed,fixMax:i.maxFixed}}(e,n),r=i.extent,a=n.get("splitNumber");e instanceof Xu&&(e.base=n.get("logBase"));var o=e.type,s=n.get("interval"),l="interval"===o||"time"===o;e.setExtent(r[0],r[1]),e.calcNiceExtent({splitNumber:a,fixMin:i.fixMin,fixMax:i.fixMax,minInterval:l?n.get("minInterval"):null,maxInterval:l?n.get("maxInterval"):null}),
// If some one specified the min, max. And the default calculated interval
// is not good enough. He can specify the interval. It is often appeared
// in angle axis with angle 0 - 360. Interval calculated in interval scale is hard
// to be 60.
// FIXME
null!=s&&e.setInterval&&e.setInterval(s)}(i,n),i}
/**
 * Mixin common methods to axis model,
 *
 * Include methods
 * `getFormattedLabels() => Array.<string>`
 * `getCategories() => Array.<string>`
 * `getMin(origin: boolean) => number`
 * `getMax(origin: boolean) => number`
 * `getNeedCrossZero() => boolean`
 */,createSymbol:_s,createTextStyle:function(e,t){return function(e,t,n,i){var r={};return function(e,t,n,i){n=n||Un;var r,a=t.ecModel,o=a&&a.option.textStyle,s=function(e){for(var t;e&&e!==e.ecModel;){var n=(e.option||Un).rich;if(n){t=t||{};for(var i=_(n),r=0;r<i.length;r++)t[i[r]]=1}e=e.parentModel}return t}(t);if(s)for(var l in r={},s)if(s.hasOwnProperty(l)){var u=t.getModel(["rich",l]);Yn(r[l]={},u,o,n,i,0,!1,!0)}r&&(e.rich=r);var c=t.get("overflow");c&&(e.overflow=c);var p=t.get("minMargin");null!=p&&(e.margin=p),Yn(e,t,o,n,i,0,!0,!1)}(r,e,null,i),r}(e,0,0,"normal"!==(t=t||{}).state)},dataStack:{isDimensionStacked:_u,enableDataStack:yu,getStackedDimension:function(e,t){return _u(e,t)?e.getCalculationInfo("stackResultDimension"):t}},enableHoverEmphasis:function(e,t,n){!function(e){var t=e;e.highDownSilentOnTouch&&(t.__highDownSilentOnTouch=e.highDownSilentOnTouch),t.__highByOuter=t.__highByOuter||0,t.__highDownDispatcher=!0}(e),on(e,ln),function(e,t,n){var i=Vt(e);null!=t?(i.focus=t,i.blurScope=n):i.focus&&(i.focus=null)}(e,t,n)},getECData:Vt,getLayoutRect:
/**
 * Parse position info.
 */
function(e,t,n){n=Wi(n||0);var i=t.width,r=t.height,a=We(e.left,i),o=We(e.top,r),s=We(e.right,i),l=We(e.bottom,r),u=We(e.width,i),c=We(e.height,r),p=n[2]+n[0],h=n[1]+n[3],f=e.aspect;
// Align left and top
switch(
// If width is not specified, calculate width from left and right
isNaN(u)&&(u=i-s-h-a),isNaN(c)&&(c=r-l-p-o),null!=f&&(
// If width and height are not given
// 1. Graph should not exceeds the container
// 2. Aspect must be keeped
// 3. Graph should take the space as more as possible
// FIXME
// Margin is not considered, because there is no case that both
// using margin and aspect so far.
isNaN(u)&&isNaN(c)&&(f>i/r?u=.8*i:c=.8*r),
// Calculate width or height with given aspect
isNaN(u)&&(u=f*c),isNaN(c)&&(c=u/f)),
// If left is not specified, calculate left from right and width
isNaN(a)&&(a=i-s-u-h),isNaN(o)&&(o=r-l-c-p),e.left||e.right){case"center":a=i/2-u/2-n[3];break;case"right":a=i-u-h}switch(e.top||e.bottom){case"middle":case"center":o=r/2-c/2-n[0];break;case"bottom":o=r-c-p}
// If something is wrong and left, top, width, height are calculated as NaN
a=a||0,o=o||0,isNaN(u)&&(
// Width may be NaN if only one value is given except width
u=i-h-a-(s||0)),isNaN(c)&&(
// Height may be NaN if only one value is given except height
c=r-p-o-(l||0));var d=new Z(a+n[3],o+n[0],u,c);return d.margin=n,d},mixinAxisModelCommonMethods:function(e){H(e,rc)}},Symbol.toStringTag,{value:"Module"}));var oc=[],sc={registerPreprocessor:Cl,registerProcessor:Tl,registerPostInit:kl,registerPostUpdate:Ol,registerUpdateLifecycle:Ll,registerAction:Al,registerCoordinateSystem:Nl,registerLayout:Rl,registerVisual:El,registerTransform:zl,registerLoading:Vl,registerMap:Fl,registerImpl:function(e,t){Ts[e]=t},PRIORITY:As,ComponentModel:nr,ComponentView:mo,SeriesModel:so,ChartView:_o,
// TODO Use ComponentModel and SeriesModel instead of Constructor
registerComponentModel:function(e){nr.registerClass(e)},registerComponentView:function(e){mo.registerClass(e)},registerSeriesModel:function(e){so.registerClass(e)},registerChartView:function(e){_o.registerClass(e)},registerSubTypeDefaulter:function(e,t){nr.registerSubTypeDefaulter(e,t)},registerPainter:function(e,t){ge(e,t)}};function lc(e){a(e)?
// use([ChartLine, ChartBar]);
c(e,function(e){lc(e)}):p(oc,e)>=0||(oc.push(e),g(e)&&(e={install:e}),e.install(sc))}var uc=[];function cc(e,t){for(var n=0;n<e.length;n++)_e(e[n],e[n],t)}function pc(e,t,n,i){for(var r=0;r<e.length;r++){var a=e[r];i&&(
// projection may return null point.
a=i.project(a)),a&&isFinite(a[0])&&isFinite(a[1])&&(ve(t,t,a),ye(n,n,a))}}var hc=/** @class */function(){function e(e){this.name=e}return e.prototype.setCenter=function(e){this._center=e},
/**
   * Get center point in data unit. That is,
   * for GeoJSONRegion, the unit is lat/lng,
   * for GeoSVGRegion, the unit is SVG local coord.
   */
e.prototype.getCenter=function(){var e=this._center;return e||(
// In most cases there are no need to calculate this center.
// So calculate only when called.
e=this._center=this.calcCenter()),e},e}(),fc=function(e,t){this.type="polygon",this.exterior=e,this.interiors=t},dc=function(e){this.type="linestring",this.points=e},gc=/** @class */function(e){function t(t,n,i){var r=e.call(this,t)||this;return r.type="geoJSON",r.geometries=n,r._center=i&&[i[0],i[1]],r}return h(t,e),t.prototype.calcCenter=function(){for(var e,t=this.geometries,n=0,i=0;i<t.length;i++){var r=t[i],a=r.exterior,o=a&&a.length;o>n&&(e=r,n=o)}if(e)return function(e){
// Polygon should been closed.
for(var t=0,n=0,i=0,r=e.length,a=e[r-1][0],o=e[r-1][1],s=0;s<r;s++){var l=e[s][0],u=e[s][1],c=a*u-l*o;t+=c,n+=(a+l)*c,i+=(o+u)*c,a=l,o=u}return t?[n/t/3,i/t/3,t]:[e[0][0]||0,e[0][1]||0]}(e.exterior);
// from bounding rect by default.
var s=this.getBoundingRect();return[s.x+s.width/2,s.y+s.height/2]},t.prototype.getBoundingRect=function(e){var t=this._rect;
// Always recalculate if using projection.
if(t&&!e)return t;var n=[1/0,1/0],i=[-1/0,-1/0];return c(this.geometries,function(t){"polygon"===t.type?
// Doesn't consider hole
pc(t.exterior,n,i,e):c(t.points,function(t){pc(t,n,i,e)})}),
// Normalie invalid bounding.
isFinite(n[0])&&isFinite(n[1])&&isFinite(i[0])&&isFinite(i[1])||(n[0]=n[1]=i[0]=i[1]=0),t=new Z(n[0],n[1],i[0]-n[0],i[1]-n[1]),e||(this._rect=t),t},t.prototype.contain=function(e){var t=this.getBoundingRect(),n=this.geometries;if(!t.contain(e[0],e[1]))return!1;e:for(var i=0,r=n.length;i<r;i++){var a=n[i];
// Only support polygon.
if("polygon"===a.type){var o=a.interiors;if(me(a.exterior,e[0],e[1])){
// Not in the region if point is in the hole.
for(var s=0;s<(o?o.length:0);s++)if(me(o[s],e[0],e[1]))continue e;return!0}}}return!1},
/**
   * Transform the raw coords to target bounding.
   * @param x
   * @param y
   * @param width
   * @param height
   */
t.prototype.transformTo=function(e,t,n,i){var r=this.getBoundingRect(),a=r.width/r.height;n?i||(i=n/a):n=a*i;for(var o=new Z(e,t,n,i),s=r.calculateTransform(o),l=this.geometries,u=0;u<l.length;u++){var p=l[u];"polygon"===p.type?(cc(p.exterior,s),c(p.interiors,function(e){cc(e,s)})):c(p.points,function(e){cc(e,s)})}(r=this._rect).copy(o),
// Update center
this._center=[r.x+r.width/2,r.y+r.height/2]},t.prototype.cloneShallow=function(e){null==e&&(e=this.name);var n=new t(e,this.geometries,this._center);// Simply avoid to be called.
return n._rect=this._rect,n.transformTo=null,n},t}(hc);function mc(e,t,n){for(var i=0;i<e.length;i++)e[i]=vc(e[i],t[i],n)}function vc(e,t,n){for(var i=[],r=t[0],a=t[1],o=0;o<e.length;o+=2){var s=e.charCodeAt(o)-64,l=e.charCodeAt(o+1)-64;
// ZigZag decoding
s=s>>1^-(1&s),l=l>>1^-(1&l),r=
// Delta deocding
s+=r,a=l+=a,
// Dequantize
i.push([s/n,l/n])}return i}function yc(e,t){return e=function(e){if(!e.UTF8Encoding)return e;var t=e,n=t.UTF8Scale;return null==n&&(n=1024),c(t.features,function(e){var t=e.geometry,i=t.encodeOffsets,r=t.coordinates;
// Geometry may be appeded manually in the script after json loaded.
// In this case this geometry is usually not encoded.
if(i)switch(t.type){case"LineString":t.coordinates=vc(r,i,n);break;case"Polygon":case"MultiLineString":mc(r,i,n);break;case"MultiPolygon":c(r,function(e,t){return mc(e,i[t],n)})}}),
// Has been decoded
t.UTF8Encoding=!1,t}(e),i(X(e.features,function(e){
// Output of mapshaper may have geometry null
return e.geometry&&e.properties&&e.geometry.coordinates.length>0}),function(e){var n=e.properties,i=e.geometry,r=[];switch(i.type){case"Polygon":var a=i.coordinates;
// According to the GeoJSON specification.
// First must be exterior, and the rest are all interior(holes).
r.push(new fc(a[0],a.slice(1)));break;case"MultiPolygon":c(i.coordinates,function(e){e[0]&&r.push(new fc(e[0],e.slice(1)))});break;case"LineString":r.push(new dc([i.coordinates]));break;case"MultiLineString":r.push(new dc(i.coordinates))}var o=new gc(n[t||"name"],r,n.cp);return o.properties=n,o})}
/** @class */!function(e){function t(t,n){var i=e.call(this,t)||this;return i.type="geoSVG",i._elOnlyForCalculate=n,i}h(t,e),t.prototype.calcCenter=function(){for(var e=this._elOnlyForCalculate,t=e.getBoundingRect(),n=[t.x+t.width/2,t.y+t.height/2],i=D(uc),r=e;r&&!r.isGeoSVGGraphicRoot;)C(i,r.getLocalTransform(),i),r=r.parent;return xe(i,i),_e(n,n,i),n}}(hc);const _c=Object.freeze(Object.defineProperty({__proto__:null,MAX_SAFE_INTEGER:9007199254740991,asc:function(e){return e.sort(function(e,t){return e-t}),e},getPercentWithPrecision:function(e,t,r){if(!e[t])return 0;var a=
/**
 * Get a data of given precision, assuring the sum of percentages
 * in valueList is 1.
 * The largest remainder method is used.
 * https://en.wikipedia.org/wiki/Largest_remainder_method
 *
 * @param valueList a list of all data
 * @param precision integer number showing digits of precision
 * @return {Array<number>}
 */
function(e,t){var r=n(e,function(e,t){return e+(isNaN(t)?0:t)},0);if(0===r)return[];
// Has remainding votes.
for(var a=Math.pow(10,t),o=i(e,function(e){return(isNaN(e)?0:e)/r*a*100}),s=100*a,l=i(o,function(e){
// Assign automatic seats.
return Math.floor(e)}),u=n(l,function(e,t){return e+t},0),c=i(o,function(e,t){return e-l[t]});u<s;){for(
// Find next largest remainder.
var p=Number.NEGATIVE_INFINITY,h=null,f=0,d=c.length;f<d;++f)c[f]>p&&(p=c[f],h=f);
// Add a vote to max remainder.
++l[h],c[h]=0,++u}return i(l,function(e){return e/a})}(e,r);return a[t]||0},getPixelPrecision:je,getPrecision:Ze,getPrecisionSafe:qe,isNumeric:nt,isRadianAroundZero:
/**
 * @param {type} radian
 * @return {boolean}
 */
function(e){return e>-1e-4&&e<1e-4},linearMap:He,nice:et,numericToNumber:tt,parseDate:$e,quantile:function(e,t){var n=(e.length-1)*t+1,i=Math.floor(n),r=+e[i-1],a=n-i;return a?r+a*(e[i]-r):r}
/**
 * Order intervals asc, and split them when overlap.
 * expect(numberUtil.reformIntervals([
 *     {interval: [18, 62], close: [1, 1]},
 *     {interval: [-Infinity, -70], close: [0, 0]},
 *     {interval: [-70, -26], close: [1, 1]},
 *     {interval: [-26, 18], close: [1, 1]},
 *     {interval: [62, 150], close: [1, 1]},
 *     {interval: [106, 150], close: [1, 1]},
 *     {interval: [150, Infinity], close: [0, 0]}
 * ])).toEqual([
 *     {interval: [-Infinity, -70], close: [0, 0]},
 *     {interval: [-70, -26], close: [1, 1]},
 *     {interval: [-26, 18], close: [0, 1]},
 *     {interval: [18, 62], close: [0, 1]},
 *     {interval: [62, 150], close: [0, 1]},
 *     {interval: [150, Infinity], close: [0, 0]}
 * ]);
 * @param list, where `close` mean open or close
 *        of the interval, and Infinity can be used.
 * @return The origin list, which has been reformed.
 */,quantity:Je,quantityExponent:Qe,reformIntervals:function(e){e.sort(function(e,t){return s(e,t,0)?-1:1});for(var t=-1/0,n=1,i=0;i<e.length;){for(var r=e[i].interval,a=e[i].close,o=0;o<2;o++)r[o]<=t&&(r[o]=t,a[o]=o?1:1-n),t=r[o],n=a[o];r[0]===r[1]&&a[0]*a[1]!==1?e.splice(i,1):i++}return e;function s(e,t,n){return e.interval[n]<t.interval[n]||e.interval[n]===t.interval[n]&&(e.close[n]-t.close[n]===(n?-1:1)||!n&&s(e,t,1))}},remRadian:
/**
 * To 0 - 2 * PI, considering negative radian.
 */
function(e){var t=2*Math.PI;return(e%t+t)%t},round:Ye},Symbol.toStringTag,{value:"Module"})),xc=Object.freeze(Object.defineProperty({__proto__:null,format:Di,parse:$e},Symbol.toStringTag,{value:"Module"})),wc=Object.freeze(Object.defineProperty({__proto__:null,Arc:B,BezierCurve:P,BoundingRect:Z,Circle:T,CompoundPath:we,Ellipse:k,Group:ee,Image:S,IncrementalDisplayable:Me,Line:E,LinearGradient:be,Polygon:A,Polyline:N,RadialGradient:Se,Rect:R,Ring:L,Sector:O,Text:F,clipPointsByRect:function(e,t){
// FIXME: This way might be incorrect when graphic clipped by a corner
// and when element has a border.
return i(e,function(e){var n=e[0];n=On(n,t.x),n=Ln(n,t.x+t.width);var i=e[1];return i=On(i,t.y),[n,i=Ln(i,t.y+t.height)]})}
/**
 * Return a new clipped rect. If rect size are negative, return undefined.
 */,clipRectByRect:function(e,t){var n=On(e.x,t.x),i=Ln(e.x+e.width,t.x+t.width),r=On(e.y,t.y),a=Ln(e.y+e.height,t.y+t.height);
// If the total rect is cliped, nothing, including the border,
// should be painted. So return undefined.
if(i>=n&&a>=r)return{x:n,y:r,width:i-n,height:a-r}},createIcon:function(e,
// Support 'image://' or 'path://' or direct svg path.
t,n){var i=d({rectHover:!0},t),r=i.style={strokeNoScale:!0};if(n=n||{x:-1,y:-1,width:2,height:2},e)return 0===e.indexOf("image://")?(r.image=e.slice(8),I(r,n),new S(i)):En(e.replace("path://",""),i,n,"center")},extendPath:
/**
 * Extend path
 */
function(e,t){return Nn(e,t)},extendShape:
/**
 * Extend shape with parameters
 */
function(e){return m.extend(e)},getShapeClass:function(e){if(An.hasOwnProperty(e))return An[e]},getTransform:function(e,t){for(var n=D([]);e&&e!==t;)C(n,e.getLocalTransform(),n),e=e.parent;return n},initProps:Tn,makeImage:Pn,makePath:En,mergePath:Vn,registerShape:Rn,resizePath:Fn,updateProps:Cn},Symbol.toStringTag,{value:"Module"})),Mc=Object.freeze(Object.defineProperty({__proto__:null,addCommas:Hi,capitalFirst:function(e){return e?e.charAt(0).toUpperCase()+e.substr(1):e},encodeHTML:Y,formatTime:function(e,t,n){"week"!==e&&"month"!==e&&"quarter"!==e&&"half-year"!==e&&"year"!==e||(e="MM-dd\nyyyy");var i=$e(t),r=n?"getUTC":"get",a=i[r+"FullYear"](),o=i[r+"Month"]()+1,s=i[r+"Date"](),l=i[r+"Hours"](),u=i[r+"Minutes"](),c=i[r+"Seconds"](),p=i[r+"Milliseconds"]();return e.replace("MM",bi(o,2)).replace("M",o).replace("yyyy",a).replace("yy",bi(a%100+"",2)).replace("dd",bi(s,2)).replace("d",s).replace("hh",bi(l,2)).replace("h",l).replace("mm",bi(u,2)).replace("m",u).replace("ss",bi(c,2)).replace("s",c).replace("SSS",bi(p,3))},formatTpl:qi,getTextRect:function(e,t,n,i,r,a,o,s){return new F({style:{text:e,font:t,align:n,verticalAlign:i,padding:r,rich:a,overflow:o?"truncate":null,lineHeight:s}}).getBoundingRect()},getTooltipMarker:function(e,n){var i=t(e)?{color:e,extraCssText:n}:e||{},r=i.color,a=i.type;n=i.extraCssText;var o=i.renderMode||"html";return r?"html"===o?"subItem"===a?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+Y(r)+";"+(n||"")+'"></span>':'<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:'+Y(r)+";"+(n||"")+'"></span>':{renderMode:o,content:"{"+(i.markerId||"markerX")+"|}  ",style:"subItem"===a?{width:4,height:4,borderRadius:2,backgroundColor:r}:{width:10,height:10,borderRadius:5,backgroundColor:r}}:""},normalizeCssArray:Wi,toCamelCase:function(e,t){return e=(e||"").toLowerCase().replace(/-(.)/g,function(e,t){return t.toUpperCase()}),t&&e&&(e=e.charAt(0).toUpperCase()+e.slice(1)),e},truncateText:Ie},Symbol.toStringTag,{value:"Module"})),bc=Object.freeze(Object.defineProperty({__proto__:null,bind:K,clone:U,curry:q,defaults:I,each:c,extend:d,filter:X,indexOf:p,inherits:f,isArray:a,isFunction:g,isObject:o,isString:t,map:i,merge:z,reduce:n},Symbol.toStringTag,{value:"Module"}));var Sc=_t();function Ic(e,t){var n=i(t,function(t){return e.scale.parse(t)});return"time"===e.type&&n.length>0&&(
// Time axis needs duplicate first/last tick (see TimeScale.getTicks())
// The first and last tick/label don't get drawn
n.sort(),n.unshift(n[0]),n.push(n[n.length-1])),n}function Dc(e,t){var n,i,r=Cc(e,"labels"),a=ic(t);return Tc(r,a)||(g(a)?n=Lc(e,a):(i="auto"===a?function(e){var t=Sc(e).autoInterval;return null!=t?t:Sc(e).autoInterval=e.calculateCategoryInterval()}
/**
 * Calculate interval for category axis ticks and labels.
 * To get precise result, at least one of `getRotate` and `isHorizontal`
 * should be implemented in axis.
 */(e):a,n=Oc(e,i)),kc(r,a,{labels:n,labelCategoryInterval:i}))}function Cc(e,t){
// Because key can be a function, and cache size always is small, we use array cache.
return Sc(e)[t]||(Sc(e)[t]=[])}function Tc(e,t){for(var n=0;n<e.length;n++)if(e[n].key===t)return e[n].value}function kc(e,t,n){return e.push({key:t,value:n}),n}function Oc(e,t,n){var i=nc(e),r=e.scale,a=r.getExtent(),o=e.getLabelModel(),s=[],l=Math.max((t||0)+1,1),u=a[0],c=r.count();
// Calculate start tick based on zero if possible to keep label consistent
// while zooming and moving while interval > 0. Otherwise the selection
// of displayable ticks and symbols probably keep changing.
// 3 is empirical value.
0!==u&&l>1&&c/l>2&&(u=Math.round(Math.ceil(u/l)*l));
// (1) Only add min max label here but leave overlap checking
// to render stage, which also ensure the returned list
// suitable for splitLine and splitArea rendering.
// (2) Scales except category always contain min max label so
// do not need to perform this process.
var p=function(e){return"category"===e.type&&0===ic(e.getLabelModel())}(e),h=o.get("showMinLabel")||p,f=o.get("showMaxLabel")||p;h&&u!==a[0]&&g(a[0]);
// Optimize: avoid generating large array by `ordinalScale.getTicks()`.
for(var d=u;d<=a[1];d+=l)g(d);function g(e){var t={value:e};s.push(n?e:{formattedLabel:i(t),rawLabel:r.getLabel(t),tickValue:e})}return f&&d-l!==a[1]&&g(a[1]),s}function Lc(e,t,n){var i=e.scale,r=nc(e),a=[];return c(i.getTicks(),function(e){var o=i.getLabel(e),s=e.value;t(e.value,o)&&a.push(n?s:{formattedLabel:r(e),rawLabel:o,tickValue:s})}),a}var Ac=[0,1],Nc=/** @class */function(){function e(e,t,n){this.onBand=!1,this.inverse=!1,this.dim=e,this.scale=t,this._extent=n||[0,0]}
/**
   * If axis extent contain given coord
   */return e.prototype.contain=function(e){var t=this._extent,n=Math.min(t[0],t[1]),i=Math.max(t[0],t[1]);return e>=n&&e<=i},
/**
   * If axis extent contain given data
   */
e.prototype.containData=function(e){return this.scale.contain(e)},
/**
   * Get coord extent.
   */
e.prototype.getExtent=function(){return this._extent.slice()},
/**
   * Get precision used for formatting
   */
e.prototype.getPixelPrecision=function(e){return je(e||this.scale.getExtent(),this._extent)},
/**
   * Set coord extent
   */
e.prototype.setExtent=function(e,t){var n=this._extent;n[0]=e,n[1]=t},
/**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   */
e.prototype.dataToCoord=function(e,t){var n=this._extent,i=this.scale;return e=i.normalize(e),this.onBand&&"ordinal"===i.type&&Rc(n=n.slice(),i.count()),He(e,Ac,n,t)},
/**
   * Convert coord to data. Data is the rank if it has an ordinal scale
   */
e.prototype.coordToData=function(e,t){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&Rc(n=n.slice(),i.count());var r=He(e,n,Ac,t);return this.scale.scale(r)},
/**
   * Convert pixel point to data in axis
   */
e.prototype.pointToData=function(){},
/**
   * Different from `zrUtil.map(axis.getTicks(), axis.dataToCoord, axis)`,
   * `axis.getTicksCoords` considers `onBand`, which is used by
   * `boundaryGap:true` of category axis and splitLine and splitArea.
   * @param opt.tickModel default: axis.model.getModel('axisTick')
   * @param opt.clamp If `true`, the first and the last
   *        tick must be at the axis end points. Otherwise, clip ticks
   *        that outside the axis extent.
   */
e.prototype.getTicksCoords=function(e){var t=(e=e||{}).tickModel||this.getTickModel(),n=
/**
 * @param {module:echats/coord/Axis} axis
 * @param {module:echarts/model/Model} tickModel For example, can be axisTick, splitLine, splitArea.
 * @return {Object} {
 *     ticks: Array.<number>
 *     tickCategoryInterval: number
 * }
 */
function(e,t){var n=e.getTickModel().get("customValues");if(n){var r=e.scale.getExtent(),a=Ic(e,n);return{ticks:X(a,function(e){return e>=r[0]&&e<=r[1]})}}
// Only ordinal scale support tick interval
return"category"===e.type?function(e,t){var n,r,a=Cc(e,"ticks"),o=ic(t),s=Tc(a,o);if(s)return s;if(
// Optimize for the case that large category data and no label displayed,
// we should not return all ticks.
t.get("show")&&!e.scale.isBlank()||(n=[]),g(o))n=Lc(e,o,!0);else if("auto"===o){var l=Dc(e,e.getLabelModel());r=l.labelCategoryInterval,n=i(l.labels,function(e){return e.tickValue})}else n=Oc(e,r=o,!0);
// Cache to avoid calling interval function repeatedly.
return kc(a,o,{ticks:n,tickCategoryInterval:r})}(e,t):{ticks:i(e.scale.getTicks(),function(e){return e.value})}}(this,t),r=i(n.ticks,function(e){return{coord:this.dataToCoord("ordinal"===this.scale.type?this.scale.getRawOrdinalNumber(e):e),tickValue:e}},this);
// If axis has labels [1, 2, 3, 4]. Bands on the axis are
// |---1---|---2---|---3---|---4---|.
// So the displayed ticks and splitLine/splitArea should between
// each data item, otherwise cause misleading (e.g., split tow bars
// of a single data item when there are two bar series).
// Also consider if tickCategoryInterval > 0 and onBand, ticks and
// splitLine/spliteArea should layout appropriately corresponding
// to displayed labels. (So we should not use `getBandWidth` in this
// case).
return function(e,t,n,i){var r=t.length;if(e.onBand&&!n&&r){var a,o=e.getExtent();if(1===r)t[0].coord=o[0],a=t[1]={coord:o[1],tickValue:t[0].tickValue};else{var s=(t[r-1].coord-t[0].coord)/(t[r-1].tickValue-t[0].tickValue);c(t,function(e){e.coord-=s/2});var l=e.scale.getExtent();t.push(a={coord:t[r-1].coord+s*(1+l[1]-t[r-1].tickValue),tickValue:l[1]+1})}var u=o[0]>o[1];
// Handling clamp.
p(t[0].coord,o[0])&&(i?t[0].coord=o[0]:t.shift()),i&&p(o[0],t[0].coord)&&t.unshift({coord:o[0]}),p(o[1],a.coord)&&(i?a.coord=o[1]:t.pop()),i&&p(a.coord,o[1])&&t.push({coord:o[1]})}function p(e,t){
// Avoid rounding error cause calculated tick coord different with extent.
// It may cause an extra unnecessary tick added.
return e=Ye(e),t=Ye(t),u?e>t:e<t}}
// --------------------- Deprecated Extension Methods ---------------------
// Should use `ComponentModel.extend` or `class XXXX extend ComponentModel` to create class.
// Then use `registerComponentModel` in `install` parameter when `use` this extension. For example:
// class Bar3DModel extends ComponentModel {}
// export function install(registers) { registers.registerComponentModel(Bar3DModel); }
// echarts.use(install);
(this,r,t.get("alignWithLabel"),e.clamp),r},e.prototype.getMinorTicksCoords=function(){if("ordinal"===this.scale.type)
// Category axis doesn't support minor ticks
return[];var e=this.model.getModel("minorTick").get("splitNumber");
// Protection.
e>0&&e<100||(e=5);var t=this.scale.getMinorTicks(e);return i(t,function(e){return i(e,function(e){return{coord:this.dataToCoord(e),tickValue:e}},this)},this)},e.prototype.getViewLabels=function(){return function(e){var t=e.getLabelModel().get("customValues");if(t){var n=nc(e),r=e.scale.getExtent(),a=Ic(e,t),o=X(a,function(e){return e>=r[0]&&e<=r[1]});return{labels:i(o,function(t){var i={value:t};return{formattedLabel:n(i),rawLabel:e.scale.getLabel(i),tickValue:t}})}}
// Only ordinal scale support tick interval
return"category"===e.type?function(e){var t=e.getLabelModel(),n=Dc(e,t);return!t.get("show")||e.scale.isBlank()?{labels:[],labelCategoryInterval:n.labelCategoryInterval}:n}(e):function(e){var t=e.scale.getTicks(),n=nc(e);return{labels:i(t,function(t,i){return{level:t.level,formattedLabel:n(t,i),rawLabel:e.scale.getLabel(t),tickValue:t.value}})}}(e)}(this).labels},e.prototype.getLabelModel=function(){return this.model.getModel("axisLabel")},
/**
   * Notice here we only get the default tick model. For splitLine
   * or splitArea, we should pass the splitLineModel or splitAreaModel
   * manually when calling `getTicksCoords`.
   * In GL, this method may be overridden to:
   * `axisModel.getModel('axisTick', grid3DModel.getModel('axisTick'));`
   */
e.prototype.getTickModel=function(){return this.model.getModel("axisTick")},
/**
   * Get width of band
   */
e.prototype.getBandWidth=function(){var e=this._extent,t=this.scale.getExtent(),n=t[1]-t[0]+(this.onBand?1:0);
// Fix #2728, avoid NaN when only one data.
0===n&&(n=1);var i=Math.abs(e[1]-e[0]);return Math.abs(i)/n},
/**
   * Only be called in category axis.
   * Can be overridden, consider other axes like in 3D.
   * @return Auto interval for cateogry axis tick and label
   */
e.prototype.calculateCategoryInterval=function(){return function(e){var t=function(e){var t=e.getLabelModel();return{axisRotate:e.getRotate?e.getRotate():e.isHorizontal&&!e.isHorizontal()?90:0,labelRotate:t.get("rotate")||0,font:t.getFont()}}(e),n=nc(e),i=(t.axisRotate-t.labelRotate)/180*Math.PI,r=e.scale,a=r.getExtent(),o=r.count();if(a[1]-a[0]<1)return 0;var s=1;
// Simple optimization. Empirical value: tick count should less than 40.
o>40&&(s=Math.max(1,Math.floor(o/40)));
// Caution: Performance sensitive for large category data.
// Consider dataZoom, we should make appropriate step to avoid O(n) loop.
for(var l=a[0],u=e.dataToCoord(l+1)-e.dataToCoord(l),c=Math.abs(u*Math.cos(i)),p=Math.abs(u*Math.sin(i)),h=0,f=0;l<=a[1];l+=s){var d,g=De(n({value:l}),t.font,"center","top");d=1.3*g.height,
// Min size, void long loop.
h=Math.max(h,1.3*g.width,7),f=Math.max(f,d,7)}var m=h/c,v=f/p;
// 0/0 is NaN, 1/0 is Infinity.
isNaN(m)&&(m=1/0),isNaN(v)&&(v=1/0);var y=Math.max(0,Math.floor(Math.min(m,v))),_=Sc(e.model),x=e.getExtent(),w=_.lastAutoInterval,M=_.lastTickCount;
// Use cache to keep interval stable while moving zoom window,
// otherwise the calculated interval might jitter when the zoom
// window size is close to the interval-changing size.
// For example, if all of the axis labels are `a, b, c, d, e, f, g`.
// The jitter will cause that sometimes the displayed labels are
// `a, d, g` (interval: 2) sometimes `a, c, e`(interval: 1).
return null!=w&&null!=M&&Math.abs(w-y)<=1&&Math.abs(M-o)<=1&&w>y&&_.axisExtent0===x[0]&&_.axisExtent1===x[1]?y=w:(_.lastTickCount=o,_.lastAutoInterval=y,_.axisExtent0=x[0],_.axisExtent1=x[1]),y}(this)},e}();
/**
 * Base class of Axis.
 */function Rc(e,t){var n=(e[1]-e[0])/t/2;e[0]+=n,e[1]-=n}var Ec=2*Math.PI,Pc=Oe.CMD,Bc=["top","right","bottom","left"];function Vc(e,t,n,i,r){var a=n.width,o=n.height;switch(e){case"top":i.set(n.x+a/2,n.y-t),r.set(0,-1);break;case"bottom":i.set(n.x+a/2,n.y+o+t),r.set(0,1);break;case"left":i.set(n.x-t,n.y+o/2),r.set(-1,0);break;case"right":i.set(n.x+a+t,n.y+o/2),r.set(1,0)}}function Fc(e,t,n,i,r,a,o,s,l){o-=e,s-=t;var u=Math.sqrt(o*o+s*s),c=(o/=u)*n+e,p=(s/=u)*n+t;if(Math.abs(i-r)%Ec<1e-4)return l[0]=c,l[1]=p,u-n;if(a){var h=i;i=Ne(r),r=Ne(h)}else i=Ne(i),r=Ne(r);i>r&&(r+=Ec);var f=Math.atan2(s,o);if(f<0&&(f+=Ec),f>=i&&f<=r||f+Ec>=i&&f+Ec<=r)return l[0]=c,l[1]=p,u-n;var d=n*Math.cos(i)+e,g=n*Math.sin(i)+t,m=n*Math.cos(r)+e,v=n*Math.sin(r)+t,y=(d-o)*(d-o)+(g-s)*(g-s),_=(m-o)*(m-o)+(v-s)*(v-s);return y<_?(l[0]=d,l[1]=g,Math.sqrt(y)):(l[0]=m,l[1]=v,Math.sqrt(_))}function zc(e,t,n,i,r,a,o,s){var l=r-e,u=a-t,c=n-e,p=i-t,h=Math.sqrt(c*c+p*p),f=(l*(c/=h)+u*(p/=h))/h;s&&(f=Math.min(Math.max(f,0),1));var d=o[0]=e+(f*=h)*c,g=o[1]=t+f*p;return Math.sqrt((d-r)*(d-r)+(g-a)*(g-a))}function Uc(e,t,n,i,r,a,o){n<0&&(e+=n,n=-n),i<0&&(t+=i,i=-i);var s=e+n,l=t+i,u=o[0]=Math.min(Math.max(r,e),s),c=o[1]=Math.min(Math.max(a,t),l);return Math.sqrt((u-r)*(u-r)+(c-a)*(c-a))}var Gc=[];function Hc(e,t,n){var i=Uc(t.x,t.y,t.width,t.height,e.x,e.y,Gc);return n.set(Gc[0],Gc[1]),i}function Wc(e,t,n){for(var i,r,a=0,o=0,s=0,l=0,u=1/0,c=t.data,p=e.x,h=e.y,f=0;f<c.length;){var d=c[f++];1===f&&(s=a=c[f],l=o=c[f+1]);var g=u;switch(d){case Pc.M:a=s=c[f++],o=l=c[f++];break;case Pc.L:g=zc(a,o,c[f],c[f+1],p,h,Gc,!0),a=c[f++],o=c[f++];break;case Pc.C:g=Ae(a,o,c[f++],c[f++],c[f++],c[f++],c[f],c[f+1],p,h,Gc),a=c[f++],o=c[f++];break;case Pc.Q:g=Le(a,o,c[f++],c[f++],c[f],c[f+1],p,h,Gc),a=c[f++],o=c[f++];break;case Pc.A:var m=c[f++],v=c[f++],y=c[f++],_=c[f++],x=c[f++],w=c[f++];f+=1;var M=!!(1-c[f++]);i=Math.cos(x)*y+m,r=Math.sin(x)*_+v,f<=1&&(s=i,l=r),g=Fc(m,v,_,x,x+w,M,(p-m)*_/y+m,h,Gc),a=Math.cos(x+w)*y+m,o=Math.sin(x+w)*_+v;break;case Pc.R:g=Uc(s=a=c[f++],l=o=c[f++],c[f++],c[f++],p,h,Gc);break;case Pc.Z:g=zc(a,o,s,l,p,h,Gc,!0),a=s,o=l}g<u&&(u=g,n.set(Gc[0],Gc[1]))}return u}var Yc=new Ce,Zc=new Ce,qc=new Ce,jc=new Ce,Xc=new Ce;function Kc(e,t){if(e){var n=e.getTextGuideLine(),i=e.getTextContent();if(i&&n){var r=e.textGuideLineConfig||{},a=[[0,0],[0,0],[0,0]],o=r.candidates||Bc,s=i.getBoundingRect().clone();s.applyTransform(i.getComputedTransform());var l=1/0,u=r.anchor,c=e.getComputedTransform(),p=c&&xe([],c),h=t.get("length2")||0;u&&qc.copy(u);for(var f=0;f<o.length;f++){Vc(o[f],0,s,Yc,jc),Ce.scaleAndAdd(Zc,Yc,jc,h),Zc.transform(p);var d=e.getBoundingRect(),g=u?u.distance(Zc):e instanceof m?Wc(Zc,e.path,qc):Hc(Zc,d,qc);g<l&&(l=g,Zc.transform(c),qc.transform(c),qc.toArray(a[0]),Zc.toArray(a[1]),Yc.toArray(a[2]))}!function(e,t){if(t<=180&&t>0){t=t/180*Math.PI,Yc.fromArray(e[0]),Zc.fromArray(e[1]),qc.fromArray(e[2]),Ce.sub(jc,Yc,Zc),Ce.sub(Xc,qc,Zc);var n=jc.len(),i=Xc.len();if(!(n<.001||i<.001)){jc.scale(1/n),Xc.scale(1/i);var r=jc.dot(Xc);if(Math.cos(t)<r){var a=zc(Zc.x,Zc.y,qc.x,qc.y,Yc.x,Yc.y,$c,!1);Jc.fromArray($c),Jc.scaleAndAdd(Xc,a/Math.tan(Math.PI-t));var o=qc.x!==Zc.x?(Jc.x-Zc.x)/(qc.x-Zc.x):(Jc.y-Zc.y)/(qc.y-Zc.y);if(isNaN(o))return;o<0?Ce.copy(Jc,Zc):o>1&&Ce.copy(Jc,qc),Jc.toArray(e[1])}}}}(a,t.get("minTurnAngle")),n.setShape({points:a})}}}var $c=[],Jc=new Ce;function Qc(e,t,n,i){var r="normal"===n,a=r?e:e.ensureState(n);a.ignore=t;var o=i.get("smooth");o&&!0===o&&(o=.3),a.shape=a.shape||{},o>0&&(a.shape.smooth=o);var s=i.getModel("lineStyle").getLineStyle();r?e.useStyle(s):a.style=s}function ep(e,t){var n=t.smooth,i=t.points;if(i)if(e.moveTo(i[0][0],i[0][1]),n>0&&i.length>=3){var r=Te(i[0],i[1]),a=Te(i[1],i[2]);if(!r||!a)return e.lineTo(i[1][0],i[1][1]),void e.lineTo(i[2][0],i[2][1]);var o=Math.min(r,a)*n,s=ke([],i[1],i[0],o/r),l=ke([],i[1],i[2],o/a),u=ke([],s,l,.5);e.bezierCurveTo(s[0],s[1],s[0],s[1],u[0],u[1]),e.bezierCurveTo(l[0],l[1],l[0],l[1],i[2][0],i[2][1])}else for(var c=1;c<i.length;c++)e.lineTo(i[c][0],i[c][1])}function tp(e,t,n,i,r){var a=e.length;if(!(a<2)){e.sort(function(e,n){return e.rect[t]-n.rect[t]});for(var o,s=0,l=!1,u=0;u<a;u++){var c=e[u],p=c.rect;(o=p[t]-s)<0&&(p[t]-=o,c.label[t]-=o,l=!0),s=p[t]+p[n]}var h,f,d=e[0],g=e[a-1];return m(),h<0&&_(-h,.8),f<0&&_(f,.8),m(),v(h,f,1),v(f,h,-1),m(),h<0&&x(-h),f<0&&x(f),l}function m(){h=d.rect[t]-i,f=r-g.rect[t]-g.rect[n]}function v(e,t,n){if(e<0){var i=Math.min(t,-e);if(i>0){y(i*n,0,a);var r=i+e;r<0&&_(-r*n,1)}else _(-e*n,1)}}function y(n,i,r){0!==n&&(l=!0);for(var a=i;a<r;a++){var o=e[a];o.rect[t]+=n,o.label[t]+=n}}function _(i,r){for(var o=[],s=0,l=1;l<a;l++){var u=e[l-1].rect,c=Math.max(e[l].rect[t]-u[t]-u[n],0);o.push(c),s+=c}if(s){var p=Math.min(Math.abs(i)/s,r);if(i>0)for(l=0;l<a-1;l++)y(o[l]*p,0,l+1);else for(l=a-1;l>0;l--)y(-o[l-1]*p,l,a)}}function x(e){var t=e<0?-1:1;e=Math.abs(e);for(var n=Math.ceil(e/(a-1)),i=0;i<a-1;i++)if(t>0?y(n,0,i+1):y(-n,a-i-1,a),(e-=n)<=0)return}}function np(e){if(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n].slice());return t}}function ip(e,t){var n=e.label,i=t&&t.getTextGuideLine();return{dataIndex:e.dataIndex,dataType:e.dataType,seriesIndex:e.seriesModel.seriesIndex,text:e.label.style.text,rect:e.hostRect,labelRect:e.rect,
// x: labelAttr.x,
// y: labelAttr.y,
align:n.style.align,verticalAlign:n.style.verticalAlign,labelLinePoints:np(i&&i.shape.points)}}var rp=["align","verticalAlign","width","height","fontSize"],ap=new Ee,op=_t(),sp=_t();function lp(e,t,n){for(var i=0;i<n.length;i++){var r=n[i];null!=t[r]&&(e[r]=t[r])}}var up=["x","y","rotation"],cp=
/** @class */function(){function e(){this._labelList=[],this._chartViewList=[]}return e.prototype.clearLabels=function(){this._labelList=[],this._chartViewList=[]},e.prototype._addLabel=function(e,t,n,i,r){var a=i.style,o=i.__hostTarget.textConfig||{},s=i.getComputedTransform(),l=i.getBoundingRect().plain();Z.applyTransform(l,l,s),s?ap.setLocalTransform(s):(ap.x=ap.y=ap.rotation=ap.originX=ap.originY=0,ap.scaleX=ap.scaleY=1),ap.rotation=Ne(ap.rotation);var u,c=i.__hostTarget;if(c){u=c.getBoundingRect().plain();var p=c.getComputedTransform();Z.applyTransform(u,u,p)}var h=u&&c.getTextGuideLine();this._labelList.push({label:i,labelLine:h,seriesModel:n,dataIndex:e,dataType:t,layoutOption:r,computedLayoutOption:null,rect:l,hostRect:u,
// Label with lower priority will be hidden when overlapped
// Use rect size as default priority
priority:u?u.width*u.height:0,
// Save default label attributes.
// For restore if developers want get back to default value in callback.
defaultAttr:{ignore:i.ignore,labelGuideIgnore:h&&h.ignore,x:ap.x,y:ap.y,scaleX:ap.scaleX,scaleY:ap.scaleY,rotation:ap.rotation,style:{x:a.x,y:a.y,align:a.align,verticalAlign:a.verticalAlign,width:a.width,height:a.height,fontSize:a.fontSize},cursor:i.cursor,attachedPos:o.position,attachedRot:o.rotation}})},e.prototype.addLabelsOfSeries=function(e){var t=this;this._chartViewList.push(e);var n=e.__model,i=n.get("labelLayout");(g(i)||_(i).length)&&e.group.traverse(function(e){if(e.ignore)return!0;var r=e.getTextContent(),a=Vt(e);r&&!r.disableLabelLayout&&t._addLabel(a.dataIndex,a.dataType,n,r,i)})},e.prototype.updateLayoutConfig=function(e){var t=e.getWidth(),n=e.getHeight();function i(e,t){return function(){Kc(e,t)}}for(var r=0;r<this._labelList.length;r++){var a=this._labelList[r],o=a.label,s=o.__hostTarget,l=a.defaultAttr,u=void 0;u=g(a.layoutOption)?a.layoutOption(ip(a,s)):a.layoutOption,a.computedLayoutOption=u=u||{};var c=Math.PI/180;s&&s.setTextConfig({
// Force to set local false.
local:!1,
// Ignore position and rotation config on the host el if x or y is changed.
position:null!=u.x||null!=u.y?null:l.attachedPos,
// Ignore rotation config on the host el if rotation is changed.
rotation:null!=u.rotate?u.rotate*c:l.attachedRot,offset:[u.dx||0,u.dy||0]});var p=!1;if(null!=u.x?(o.x=We(u.x,t),o.setStyle("x",0),p=!0):(o.x=l.x,o.setStyle("x",l.style.x)),null!=u.y?(o.y=We(u.y,n),o.setStyle("y",0),p=!0):(o.y=l.y,o.setStyle("y",l.style.y)),u.labelLinePoints){var h=s.getTextGuideLine();h&&(h.setShape({points:u.labelLinePoints}),p=!1)}op(o).needsUpdateLabelLine=p,o.rotation=null!=u.rotate?u.rotate*c:l.rotation,o.scaleX=l.scaleX,o.scaleY=l.scaleY;for(var f=0;f<rp.length;f++){var d=rp[f];o.setStyle(d,null!=u[d]?u[d]:l.style[d])}if(u.draggable){if(o.draggable=!0,o.cursor="move",s){var m=a.seriesModel;null!=a.dataIndex&&(m=a.seriesModel.getData(a.dataType).getItemModel(a.dataIndex)),o.on("drag",i(s,m.getModel("labelLine")))}}else o.off("drag"),o.cursor=l.cursor}},e.prototype.layout=function(e){var t=e.getWidth(),n=e.getHeight(),i=function(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];if(!i.defaultAttr.ignore){var r=i.label,a=r.getComputedTransform(),o=r.getBoundingRect(),s=!a||a[1]<1e-5&&a[2]<1e-5,l=r.style.margin||0,u=o.clone();u.applyTransform(a),u.x-=l/2,u.y-=l/2,u.width+=l,u.height+=l;var c=s?new Re(o,a):null;t.push({label:r,labelLine:i.labelLine,rect:u,localRect:o,obb:c,priority:i.priority,defaultAttr:i.defaultAttr,layoutOption:i.computedLayoutOption,axisAligned:s,transform:a})}}return t}(this._labelList),r=X(i,function(e){return"shiftX"===e.layoutOption.moveOverlap}),a=X(i,function(e){return"shiftY"===e.layoutOption.moveOverlap});tp(r,"x","width",0,t),tp(a,"y","height",0,n),function(e){var t=[];e.sort(function(e,t){return t.priority-e.priority});var n=new Z(0,0,0,0);function i(e){if(!e.ignore){var t=e.ensureState("emphasis");null==t.ignore&&(t.ignore=!1)}e.ignore=!0}for(var r=0;r<e.length;r++){var a=e[r],o=a.axisAligned,s=a.localRect,l=a.transform,u=a.label,c=a.labelLine;n.copy(a.rect),n.width-=.1,n.height-=.1,n.x+=.05,n.y+=.05;for(var p=a.obb,h=!1,f=0;f<t.length;f++){var d=t[f];if(n.intersect(d.rect)){if(o&&d.axisAligned){h=!0;break}if(d.obb||(d.obb=new Re(d.localRect,d.transform)),p||(p=new Re(s,l)),p.intersect(d.obb)){h=!0;break}}}h?(i(u),c&&i(c)):(u.attr("ignore",a.defaultAttr.ignore),c&&c.attr("ignore",a.defaultAttr.labelGuideIgnore),t.push(a))}}(X(i,function(e){return e.layoutOption.hideOverlap}))},e.prototype.processLabelsOverall=function(){var e=this;c(this._chartViewList,function(t){var n=t.__model,i=t.ignoreLabelLineUpdate,r=n.isAnimationEnabled();t.group.traverse(function(t){if(t.ignore&&!t.forceLabelAnimation)return!0;var a=!i,o=t.getTextContent();!a&&o&&(a=op(o).needsUpdateLabelLine),a&&e._updateLabelLine(t,n),r&&e._animateLabels(t,n)})})},e.prototype._updateLabelLine=function(e,t){var n=e.getTextContent(),i=Vt(e),r=i.dataIndex;if(n&&null!=r){var a=t.getData(i.dataType),o=a.getItemModel(r),s={},l=a.getItemVisual(r,"style");if(l){var u=a.getVisual("drawType");s.stroke=l[u]}var c=o.getModel("labelLine");!function(e,t,n){var i=e.getTextGuideLine(),r=e.getTextContent();if(r){for(var a=t.normal,o=a.get("show"),s=r.ignore,l=0;l<Wt.length;l++){var u=Wt[l],c=t[u],p="normal"===u;if(c){var h=c.get("show");if((p?s:x(r.states[u]&&r.states[u].ignore,s))||!x(h,o)){var f=p?i:i&&i.states[u];f&&(f.ignore=!0),i&&Qc(i,!0,u,c);continue}i||(i=new N,e.setTextGuideLine(i),p||!s&&o||Qc(i,!0,"normal",t.normal),e.stateProxy&&(i.stateProxy=e.stateProxy)),Qc(i,!1,u,c)}}if(i){I(i.style,n),i.style.fill=null;var d=a.get("showAbove");(e.textGuideLineConfig=e.textGuideLineConfig||{}).showAbove=d||!1,i.buildPath=ep}}else i&&e.removeTextGuideLine()}(e,function(e,t){for(var n={normal:e.getModel(t=t||"labelLine")},i=0;i<Ht.length;i++){var r=Ht[i];n[r]=e.getModel([r,t])}return n}(o),s),Kc(e,c)}},e.prototype._animateLabels=function(e,n){var i=e.getTextContent(),r=e.getTextGuideLine();if(i&&(e.forceLabelAnimation||!i.ignore&&!i.invisible&&!e.disableLabelAnimation&&!kn(e))){var a=(v=op(i)).oldLayout,o=Vt(e),l=o.dataIndex,u={x:i.x,y:i.y,rotation:i.rotation},c=n.getData(o.dataType);if(a){i.attr(a);var h=e.prevStates;h&&(p(h,"select")>=0&&i.attr(v.oldLayoutSelect),p(h,"emphasis")>=0&&i.attr(v.oldLayoutEmphasis)),Cn(i,u,n,l)}else if(i.attr(u),!jn(i).valueAnimation){var f=x(i.style.opacity,1);i.style.opacity=0,Tn(i,{style:{opacity:f}},n,l)}if(v.oldLayout=u,i.states.select){var d=v.oldLayoutSelect={};lp(d,u,up),lp(d,i.states.select,up)}if(i.states.emphasis){var m=v.oldLayoutEmphasis={};lp(m,u,up),lp(m,i.states.emphasis,up)}!function(e,n,i,r,a){var o=jn(e);if(o.valueAnimation&&o.prevValue!==o.value){var l=o.defaultInterpolatedText,u=x(o.interpolatedValue,o.prevValue),c=o.value;e.percent=0,(null==o.prevValue?Tn:Cn)(e,{
// percent is used to prevent animation from being aborted #15916
percent:1},r,n,null,function(r){var p=function(e,n,i,r,a){var o=null==n||"auto"===n;if(null==r)return r;if(s(r))return Ye(m=ot(i||0,r,a),o?Math.max(Ze(i||0),Ze(r)):n);if(t(r))return a<1?i:r;for(var l=[],u=i,c=r,p=Math.max(u?u.length:0,c.length),h=0;h<p;++h){var f=e.getDimensionInfo(h);if(f&&"ordinal"===f.type)l[h]=(a<1&&u?u:c)[h];else{var d=u&&u[h]?u[h]:0,g=c[h],m=ot(d,g,a);l[h]=Ye(m,o?Math.max(Ze(d),Ze(g)):n)}}return l}(i,o.precision,u,c,r);o.interpolatedValue=1===r?null:p;var h=function(e,t,n){var i,r=e.labelFetcher,a=e.labelDataIndex,o=e.labelDimIndex,s=t.normal;r&&(i=r.getFormattedLabel(a,"normal",null,o,s&&s.get("formatter"),null!=n?{interpolatedValue:n}:null)),null==i&&(i=g(e.defaultText)?e.defaultText(a,e,n):e.defaultText);for(var l={normal:i},u=0;u<Ht.length;u++){var c=Ht[u],p=t[c];l[c]=x(r?r.getFormattedLabel(a,c,null,o,p&&p.get("formatter")):null,i)}return l}({labelDataIndex:n,labelFetcher:a,defaultText:l?l(p):p+""},o.statesModels,p);!function(e,t){for(var n=0;n<Ht.length;n++){var i=Ht[n],r=t[i],a=e.ensureState(i);a.style=a.style||{},a.style.text=r}var o=e.currentStates.slice();e.clearStates(!0),e.setStyle({text:t.normal}),e.useStates(o,!0)}(e,h)})}}(i,l,c,n,n)}if(r&&!r.ignore&&!r.invisible){var v=sp(r),y={points:r.shape.points};(a=v.oldLayout)?(r.attr({shape:a}),Cn(r,{shape:y},n)):(r.setShape(y),r.style.strokePercent=0,Tn(r,{style:{strokePercent:1}},n)),v.oldLayout=y}},e}(),pp=_t(),hp=/** @class */function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="dataset",t}return h(t,e),t.prototype.init=function(t,n,i){e.prototype.init.call(this,t,n,i),this._sourceManager=new eo(this),to(this)},t.prototype.mergeOption=function(t,n){e.prototype.mergeOption.call(this,t,n),to(this)},t.prototype.optionUpdated=function(){this._sourceManager.dirty()},t.prototype.getSourceManager=function(){return this._sourceManager},t.type="dataset",t.defaultOption={seriesLayoutBy:fr},t}(nr),fp=/** @class */function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="dataset",t}return h(t,e),t.type="dataset",t}(mo);lc([function(e){e.registerPainter("canvas",Pe)},function(e){e.registerComponentModel(hp),e.registerComponentView(fp)}]);const dp={init:function(){return Ml.apply(null,arguments)}};lc(function(e){e.registerUpdateLifecycle("series:beforeupdate",function(e,t){
// TODO api provide an namespace that can save stuff per instance
var n=pp(t).labelManager;n||(n=pp(t).labelManager=new cp),n.clearLabels()}),e.registerUpdateLifecycle("series:layoutlabels",function(e,t,n){var i=pp(t).labelManager;n.updatedSeries.forEach(function(e){i.addLabelsOfSeries(t.getViewOfSeriesModel(e))}),i.updateLayoutConfig(t),i.layout(t),i.processLabelsOverall()})});const gp=Object.freeze(Object.defineProperty({__proto__:null,Axis:Nc,ChartView:_o,ComponentModel:nr,ComponentView:mo,List:hu,Model:ai,PRIORITY:As,SeriesModel:so,color:Be,connect:function(e){if(a(e)){var t=e;e=null,c(t,function(t){null!=t.group&&(e=t.group)}),e=e||"g_"+xl++,c(t,function(t){t.group=e})}return yl[e]=!0,e},dataTool:{},default:dp,dependencies:{zrender:"5.6.1"},disConnect:Sl,disconnect:bl,dispose:function(e){t(e)?e=vl[e]:e instanceof sl||(e=Il(e)),e instanceof sl&&!e.isDisposed()&&e.dispose()},env:G,extendChartView:function(e){var t=_o.extend(e);return _o.registerClass(t),t},extendComponentModel:function(e){var t=nr.extend(e);return nr.registerClass(t),t},extendComponentView:function(e){var t=mo.extend(e);return mo.registerClass(t),t},extendSeriesModel:function(e){var t=so.extend(e);return so.registerClass(t),t},format:Mc,getCoordinateSystemDimensions:function(e){var t=Nr.get(e);if(t)return t.getDimensionsInfo?t.getDimensionsInfo():t.dimensions.slice()},getInstanceByDom:Il,getInstanceById:function(e){return vl[e]},getMap:function(e){var t=ks("getMap");return t&&t(e)},graphic:wc,helper:ac,init:Ml,innerDrawElementOnCanvas:oe,matrix:Ve,number:_c,parseGeoJSON:yc,parseGeoJson:yc,registerAction:Al,registerCoordinateSystem:Nl,registerLayout:Rl,registerLoading:Vl,registerLocale:di,registerMap:Fl,registerPostInit:kl,registerPostUpdate:Ol,registerPreprocessor:Cl,registerProcessor:Tl,registerTheme:Dl,registerTransform:zl,registerUpdateLifecycle:Ll,registerVisual:El,setCanvasCreator:function(e){le({createCanvas:e})},setPlatformAPI:le,throttle:Io,time:xc,use:lc,util:bc,vector:Fe,version:"5.6.0",zrUtil:ze,zrender:Ue},Symbol.toStringTag,{value:"Module"}));var mp,vp,yp;mp||(mp=1,vp=Ge,yp=function(e,t){if(t){var n=["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"];t.registerTheme("macarons",{color:n,title:{textStyle:{fontWeight:"normal",color:"#008acd"}},visualMap:{itemWidth:15,color:["#5ab1ef","#e0ffff"]},toolbox:{iconStyle:{borderColor:n[0]}},tooltip:{borderWidth:0,backgroundColor:"rgba(50,50,50,0.5)",textStyle:{color:"#FFF"},axisPointer:{type:"line",lineStyle:{color:"#008acd"},crossStyle:{color:"#008acd"},shadowStyle:{color:"rgba(200,200,200,0.2)"}}},dataZoom:{dataBackgroundColor:"#efefff",fillerColor:"rgba(182,162,222,0.2)",handleColor:"#008acd"},grid:{borderColor:"#eee"},categoryAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitLine:{lineStyle:{color:["#eee"]}}},valueAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.1)","rgba(200,200,200,0.1)"]}},splitLine:{lineStyle:{color:["#eee"]}}},timeline:{lineStyle:{color:"#008acd"},controlStyle:{color:"#008acd",borderColor:"#008acd"},symbol:"emptyCircle",symbolSize:3},line:{smooth:!0,symbol:"emptyCircle",symbolSize:3},candlestick:{itemStyle:{color:"#d87a80",color0:"#2ec7c9"},lineStyle:{width:1,color:"#d87a80",color0:"#2ec7c9"},areaStyle:{color:"#2ec7c9",color0:"#b6a2de"}},scatter:{symbol:"circle",symbolSize:4},map:{itemStyle:{color:"#ddd"},areaStyle:{color:"#fe994e"},label:{color:"#d87a80"}},graph:{itemStyle:{color:"#d87a80"},linkStyle:{color:"#2ec7c9"}},gauge:{axisLine:{lineStyle:{color:[[.2,"#2ec7c9"],[.8,"#5ab1ef"],[1,"#d87a80"]],width:10}},axisTick:{splitNumber:10,length:15,lineStyle:{color:"auto"}},splitLine:{length:22,lineStyle:{color:"auto"}},pointer:{width:5}}})}else"undefined"!=typeof console&&console&&console},yp(0,"string"!=typeof Ge.nodeName?e(gp):vp.echarts));
