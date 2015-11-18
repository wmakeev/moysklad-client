function init() {
    // script


// moysklad-client 0.2.8 (bundle length 419190)
// Сборка библиотеки moysklad-client для браузера
//
// Vitaliy Makeev (w.makeev@gmail.com)
// https://github.com/wmakeev
// 
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"lodash":[function(require,module,exports){
module.exports=require('EBUqFC');
},{}],"EBUqFC":[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.2 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,r,t){for(var e=(t||0)-1,u=n?n.length:0;++e<u;)if(n[e]===r)return e;return-1}function r(r,t){var e=typeof t;if(r=r.cache,"boolean"==e||null==t)return r[t]?0:-1;"number"!=e&&"string"!=e&&(e="object");var u="number"==e?t:m+t;return r=(r=r[e])&&r[u],"object"==e?r&&n(r,t)>-1?0:-1:r?0:-1}function t(n){var r=this.cache,t=typeof n;if("boolean"==t||null==n)r[n]=!0;else{"number"!=t&&"string"!=t&&(t="object");var e="number"==t?n:m+n,u=r[t]||(r[t]={});"object"==t?(u[e]||(u[e]=[])).push(n):u[e]=!0;

}}function e(n){return n.charCodeAt(0)}function u(n,r){for(var t=n.criteria,e=r.criteria,u=-1,o=t.length;++u<o;){var a=t[u],i=e[u];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(a<i||"undefined"==typeof i)return-1}}return n.index-r.index}function o(n){var r=-1,e=n.length,u=n[0],o=n[e/2|0],a=n[e-1];if(u&&"object"==typeof u&&o&&"object"==typeof o&&a&&"object"==typeof a)return!1;var i=f();i["false"]=i["null"]=i["true"]=i.undefined=!1;var l=f();for(l.array=n,l.cache=i,l.push=t;++r<e;)l.push(n[r]);

return l}function a(n){return"\\"+G[n]}function i(){return h.pop()||[]}function f(){return g.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var r=n.cache;r&&c(r),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,g.length<_&&g.push(n)}function p(n,r,t){r||(r=0),"undefined"==typeof t&&(t=n?n.length:0);for(var e=-1,u=t-r||0,o=Array(u<0?0:u);++e<u;)o[e]=n[r+e];

return o}function s(t){function h(n){return n&&"object"==typeof n&&!Yt(n)&&Tt.call(n,"__wrapped__")?n:new g(n)}function g(n,r){this.__chain__=!!r,this.__wrapped__=n}function _(n){function r(){if(e){var n=p(e);$t.apply(n,arguments)}if(this instanceof r){var o=J(t.prototype),a=t.apply(o,n||arguments);return Sn(a)?a:o}return t.apply(u,n||arguments)}var t=n[0],e=n[2],u=n[4];return Xt(r,n),r}function G(n,r,t,e,u){if(t){var o=t(n);if("undefined"!=typeof o)return o}var a=Sn(n);if(!a)return n;var f=Nt.call(n);

if(!K[f])return n;var c=Jt[f];switch(f){case F:case B:return new c(+n);case q:case P:return new c(n);case L:return o=c(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o}var s=Yt(n);if(r){var v=!e;e||(e=i()),u||(u=i());for(var h=e.length;h--;)if(e[h]==n)return u[h];o=s?c(n.length):{}}else o=s?p(n):oe({},n);return s&&(Tt.call(n,"index")&&(o.index=n.index),Tt.call(n,"input")&&(o.input=n.input)),r?(e.push(n),u.push(o),(s?Xn:fe)(n,function(n,a){o[a]=G(n,r,t,e,u)}),v&&(l(e),l(u)),o):o}function J(n,r){return Sn(n)?zt(n):{};

}function Q(n,r,t){if("function"!=typeof n)return Yr;if("undefined"==typeof r||!("prototype"in n))return n;var e=n.__bindData__;if("undefined"==typeof e&&(Qt.funcNames&&(e=!n.name),e=e||!Qt.funcDecomp,!e)){var u=At.call(n);Qt.funcNames||(e=!O.test(u)),e||(e=I.test(u),Xt(n,e))}if(e===!1||e!==!0&&1&e[1])return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,e){return n.call(r,t,e)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){
return n.call(r,t,e,u,o)}}return $r(n,r)}function X(n){function r(){var n=f?a:this;if(u){var h=p(u);$t.apply(h,arguments)}if((o||c)&&(h||(h=p(arguments)),o&&$t.apply(h,o),c&&h.length<i))return e|=16,X([t,s?e:-4&e,h,null,a,i]);if(h||(h=arguments),l&&(t=n[v]),this instanceof r){n=J(t.prototype);var g=t.apply(n,h);return Sn(g)?g:n}return t.apply(n,h)}var t=n[0],e=n[1],u=n[2],o=n[3],a=n[4],i=n[5],f=1&e,l=2&e,c=4&e,s=8&e,v=t;return Xt(r,n),r}function Y(t,e){var u=-1,a=ln(),i=t?t.length:0,f=i>=b&&a===n,l=[];

if(f){var p=o(e);p?(a=r,e=p):f=!1}for(;++u<i;){var s=t[u];a(e,s)<0&&l.push(s)}return f&&c(e),l}function nn(n,r,t,e){for(var u=(e||0)-1,o=n?n.length:0,a=[];++u<o;){var i=n[u];if(i&&"object"==typeof i&&"number"==typeof i.length&&(Yt(i)||vn(i))){r||(i=nn(i,r,t));var f=-1,l=i.length,c=a.length;for(a.length+=l;++f<l;)a[c++]=i[f]}else t||a.push(i)}return a}function rn(n,r,t,e,u,o){if(t){var a=t(n,r);if("undefined"!=typeof a)return!!a}if(n===r)return 0!==n||1/n==1/r;var f=typeof n,c=typeof r;if(n===n&&(!n||!V[f])&&(!r||!V[c]))return!1;

if(null==n||null==r)return n===r;var p=Nt.call(n),s=Nt.call(r);if(p==T&&(p=z),s==T&&(s=z),p!=s)return!1;switch(p){case F:case B:return+n==+r;case q:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case L:case P:return n==jt(r)}var h=p==$;if(!h){var g=Tt.call(n,"__wrapped__"),y=Tt.call(r,"__wrapped__");if(g||y)return rn(g?n.__wrapped__:n,y?r.__wrapped__:r,t,e,u,o);if(p!=z)return!1;var m=n.constructor,b=r.constructor;if(m!=b&&!(In(m)&&m instanceof m&&In(b)&&b instanceof b)&&"constructor"in n&&"constructor"in r)return!1;

}var _=!u;u||(u=i()),o||(o=i());for(var d=u.length;d--;)if(u[d]==n)return o[d]==r;var w=0;if(a=!0,u.push(n),o.push(r),h){if(d=n.length,w=r.length,a=w==d,a||e)for(;w--;){var j=d,k=r[w];if(e)for(;j--&&!(a=rn(n[j],k,t,e,u,o)););else if(!(a=rn(n[w],k,t,e,u,o)))break}}else ie(r,function(r,i,f){return Tt.call(f,i)?(w++,a=Tt.call(n,i)&&rn(n[i],r,t,e,u,o)):v}),a&&!e&&ie(n,function(n,r,t){return Tt.call(t,r)?a=--w>-1:v});return u.pop(),o.pop(),_&&(l(u),l(o)),a}function tn(n,r,t,e,u){(Yt(r)?Xn:fe)(r,function(r,o){
var a,i,f=r,l=n[o];if(r&&((i=Yt(r))||le(r))){for(var c=e.length;c--;)if(a=e[c]==r){l=u[c];break}if(!a){var p;t&&(f=t(l,r),(p="undefined"!=typeof f)&&(l=f)),p||(l=i?Yt(l)?l:[]:le(l)?l:{}),e.push(r),u.push(l),p||tn(l,r,t,e,u)}}else t&&(f=t(l,r),"undefined"==typeof f&&(f=r)),"undefined"!=typeof f&&(l=f);n[o]=l})}function en(n,r){return n+St(Ht()*(r-n+1))}function un(t,e,u){var a=-1,f=ln(),p=t?t.length:0,s=[],v=!e&&p>=b&&f===n,h=u||v?i():s;if(v){var g=o(h);f=r,h=g}for(;++a<p;){var y=t[a],m=u?u(y,a,t):y;

(e?!a||h[h.length-1]!==m:f(h,m)<0)&&((u||v)&&h.push(m),s.push(y))}return v?(l(h.array),c(h)):u&&l(h),s}function on(n){return function(r,t,e){var u={};t=h.createCallback(t,e,3);var o=-1,a=r?r.length:0;if("number"==typeof a)for(;++o<a;){var i=r[o];n(u,i,t(i,o,r),r)}else fe(r,function(r,e,o){n(u,r,t(r,e,o),o)});return u}}function an(n,r,t,e,u,o){var a=1&r,i=2&r,f=4&r,l=16&r,c=32&r;if(!i&&!In(n))throw new kt;l&&!t.length&&(r&=-17,l=t=!1),c&&!e.length&&(r&=-33,c=e=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),
s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=u),!a&&1&s[1]&&(r|=8),!f||4&s[1]||(s[5]=o),l&&$t.apply(s[2]||(s[2]=[]),t),c&&Wt.apply(s[3]||(s[3]=[]),e),s[1]|=r,an.apply(null,s);var v=1==r||17===r?_:X;return v([n,r,t,e,u,o])}function fn(n){return re[n]}function ln(){var r=(r=h.indexOf)===br?n:r;return r}function cn(n){return"function"==typeof n&&Rt.test(n)}function pn(n){var r,t;return n&&Nt.call(n)==z&&(r=n.constructor,!In(r)||r instanceof r)?(ie(n,function(n,r){t=r}),"undefined"==typeof t||Tt.call(n,t)):!1;

}function sn(n){return te[n]}function vn(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==T||!1}function hn(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t=r,r=!1),G(n,r,"function"==typeof t&&Q(t,e,1))}function gn(n,r,t){return G(n,!0,"function"==typeof r&&Q(r,t,1))}function yn(n,r){var t=J(n);return r?oe(t,r):t}function mn(n,r,t){var e;return r=h.createCallback(r,t,3),fe(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function bn(n,r,t){var e;return r=h.createCallback(r,t,3),
dn(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function _n(n,r,t){var e=[];ie(n,function(n,r){e.push(r,n)});var u=e.length;for(r=Q(r,t,3);u--&&r(e[u--],e[u],n)!==!1;);return n}function dn(n,r,t){var e=ne(n),u=e.length;for(r=Q(r,t,3);u--;){var o=e[u];if(r(n[o],o,n)===!1)break}return n}function wn(n){var r=[];return ie(n,function(n,t){In(n)&&r.push(t)}),r.sort()}function jn(n,r){return n?Tt.call(n,r):!1}function kn(n){for(var r=-1,t=ne(n),e=t.length,u={};++r<e;){var o=t[r];u[n[o]]=o}return u}function xn(n){
return n===!0||n===!1||n&&"object"==typeof n&&Nt.call(n)==F||!1}function Cn(n){return n&&"object"==typeof n&&Nt.call(n)==B||!1}function On(n){return n&&1===n.nodeType||!1}function Nn(n){var r=!0;if(!n)return r;var t=Nt.call(n),e=n.length;return t==$||t==P||t==T||t==z&&"number"==typeof e&&In(n.splice)?!e:(fe(n,function(){return r=!1}),r)}function Rn(n,r,t,e){return rn(n,r,"function"==typeof t&&Q(t,e,2))}function En(n){return Pt(n)&&!Kt(parseFloat(n))}function In(n){return"function"==typeof n}function Sn(n){
return!(!n||!V[typeof n])}function An(n){return Tn(n)&&n!=+n}function Dn(n){return null===n}function Tn(n){return"number"==typeof n||n&&"object"==typeof n&&Nt.call(n)==q||!1}function $n(n){return n&&"object"==typeof n&&Nt.call(n)==L||!1}function Fn(n){return"string"==typeof n||n&&"object"==typeof n&&Nt.call(n)==P||!1}function Bn(n){return"undefined"==typeof n}function Wn(n,r,t){var e={};return r=h.createCallback(r,t,3),fe(n,function(n,t,u){e[t]=r(n,t,u)}),e}function qn(n){var r=arguments,t=2;if(!Sn(n))return n;

if("number"!=typeof r[2]&&(t=r.length),t>3&&"function"==typeof r[t-2])var e=Q(r[--t-1],r[t--],2);else t>2&&"function"==typeof r[t-1]&&(e=r[--t]);for(var u=p(arguments,1,t),o=-1,a=i(),f=i();++o<t;)tn(n,u[o],e,a,f);return l(a),l(f),n}function zn(n,r,t){var e={};if("function"!=typeof r){var u=[];ie(n,function(n,r){u.push(r)}),u=Y(u,nn(arguments,!0,!1,1));for(var o=-1,a=u.length;++o<a;){var i=u[o];e[i]=n[i]}}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)||(e[t]=n)});return e}function Ln(n){
for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;){var o=t[r];u[r]=[o,n[o]]}return u}function Pn(n,r,t){var e={};if("function"!=typeof r)for(var u=-1,o=nn(arguments,!0,!1,1),a=Sn(n)?o.length:0;++u<a;){var i=o[u];i in n&&(e[i]=n[i])}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)&&(e[t]=n)});return e}function Kn(n,r,t,e){var u=Yt(n);if(null==t)if(u)t=[];else{var o=n&&n.constructor,a=o&&o.prototype;t=J(a)}return r&&(r=h.createCallback(r,e,4),(u?Xn:fe)(n,function(n,e,u){return r(t,n,e,u)})),
t}function Un(n){for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;)u[r]=n[t[r]];return u}function Mn(n){for(var r=arguments,t=-1,e=nn(r,!0,!1,1),u=r[2]&&r[2][r[1]]===n?1:e.length,o=ht(u);++t<u;)o[t]=n[e[t]];return o}function Vn(n,r,t){var e=-1,u=ln(),o=n?n.length:0,a=!1;return t=(t<0?Mt(0,o+t):t)||0,Yt(n)?a=u(n,r,t)>-1:"number"==typeof o?a=(Fn(n)?n.indexOf(r,t):u(n,r,t))>-1:fe(n,function(n){return++e<t?v:!(a=n===r)}),a}function Gn(n,r,t){var e=!0;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&(e=!!r(n[u],u,n)););else fe(n,function(n,t,u){
return e=!!r(n,t,u)});return e}function Hn(n,r,t){var e=[];r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o;){var a=n[u];r(a,u,n)&&e.push(a)}else fe(n,function(n,t,u){r(n,t,u)&&e.push(n)});return e}function Jn(n,r,t){r=h.createCallback(r,t,3);var e=-1,u=n?n.length:0;if("number"!=typeof u){var o;return fe(n,function(n,t,e){return r(n,t,e)?(o=n,!1):v}),o}for(;++e<u;){var a=n[e];if(r(a,e,n))return a}}function Qn(n,r,t){var e;return r=h.createCallback(r,t,3),Yn(n,function(n,t,u){
return r(n,t,u)?(e=n,!1):v}),e}function Xn(n,r,t){var e=-1,u=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof u)for(;++e<u&&r(n[e],e,n)!==!1;);else fe(n,r);return n}function Yn(n,r,t){var e=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof e)for(;e--&&r(n[e],e,n)!==!1;);else{var u=ne(n);e=u.length,fe(n,function(n,t,o){return t=u?u[--e]:--e,r(o[t],t,o)})}return n}function Zn(n,r){var t=p(arguments,2),e=-1,u="function"==typeof r,o=n?n.length:0,a=ht("number"==typeof o?o:0);

return Xn(n,function(n){a[++e]=(u?r:n[r]).apply(n,t)}),a}function nr(n,r,t){var e=-1,u=n?n.length:0;if(r=h.createCallback(r,t,3),"number"==typeof u)for(var o=ht(u);++e<u;)o[e]=r(n[e],e,n);else o=[],fe(n,function(n,t,u){o[++e]=r(n,t,u)});return o}function rr(n,r,t){var u=-(1/0),o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f>o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a>u&&(u=a,o=n)});return o;

}function tr(n,r,t){var u=1/0,o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f<o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a<u&&(u=a,o=n)});return o}function er(n,r,t,e){if(!n)return t;var u=arguments.length<3;r=h.createCallback(r,e,4);var o=-1,a=n.length;if("number"==typeof a)for(u&&(t=n[++o]);++o<a;)t=r(t,n[o],o,n);else fe(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)});return t}function ur(n,r,t,e){
var u=arguments.length<3;return r=h.createCallback(r,e,4),Yn(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)}),t}function or(n,r,t){return r=h.createCallback(r,t,3),Hn(n,function(n,t,e){return!r(n,t,e)})}function ar(n,r,t){if(n&&"number"!=typeof n.length&&(n=Un(n)),null==r||t)return n?n[en(0,n.length-1)]:v;var e=ir(n);return e.length=Vt(Mt(0,r),e.length),e}function ir(n){var r=-1,t=n?n.length:0,e=ht("number"==typeof t?t:0);return Xn(n,function(n){var t=en(0,++r);e[r]=e[t],e[t]=n}),e}function fr(n){var r=n?n.length:0;

return"number"==typeof r?r:ne(n).length}function lr(n,r,t){var e;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&!(e=r(n[u],u,n)););else fe(n,function(n,t,u){return!(e=r(n,t,u))});return!!e}function cr(n,r,t){var e=-1,o=Yt(r),a=n?n.length:0,p=ht("number"==typeof a?a:0);for(o||(r=h.createCallback(r,t,3)),Xn(n,function(n,t,u){var a=p[++e]=f();o?a.criteria=nr(r,function(r){return n[r]}):(a.criteria=i())[0]=r(n,t,u),a.index=e,a.value=n}),a=p.length,p.sort(u);a--;){
var s=p[a];p[a]=s.value,o||l(s.criteria),c(s)}return p}function pr(n){return n&&"number"==typeof n.length?p(n):Un(n)}function sr(n){for(var r=-1,t=n?n.length:0,e=[];++r<t;){var u=n[r];u&&e.push(u)}return e}function vr(n){return Y(n,nn(arguments,!0,!0,1))}function hr(n,r,t){var e=-1,u=n?n.length:0;for(r=h.createCallback(r,t,3);++e<u;)if(r(n[e],e,n))return e;return-1}function gr(n,r,t){var e=n?n.length:0;for(r=h.createCallback(r,t,3);e--;)if(r(n[e],e,n))return e;return-1}function yr(n,r,t){var e=0,u=n?n.length:0;

if("number"!=typeof r&&null!=r){var o=-1;for(r=h.createCallback(r,t,3);++o<u&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[0]:v;return p(n,0,Vt(Mt(0,e),u))}function mr(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(n=nr(n,t,e)),nn(n,r)}function br(r,t,e){if("number"==typeof e){var u=r?r.length:0;e=e<0?Mt(0,u+e):e||0}else if(e){var o=Nr(r,t);return r[o]===t?o:-1}return n(r,t,e)}function _r(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){
var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else e=null==r||t?1:r||e;return p(n,0,Vt(Mt(0,u-e),u))}function dr(){for(var t=[],e=-1,u=arguments.length,a=i(),f=ln(),p=f===n,s=i();++e<u;){var v=arguments[e];(Yt(v)||vn(v))&&(t.push(v),a.push(p&&v.length>=b&&o(e?t[e]:s)))}var h=t[0],g=-1,y=h?h.length:0,m=[];n:for(;++g<y;){var _=a[0];if(v=h[g],(_?r(_,v):f(s,v))<0){for(e=u,(_||s).push(v);--e;)if(_=a[e],(_?r(_,v):f(t[e],v))<0)continue n;m.push(v)}}for(;u--;)_=a[u],_&&c(_);return l(a),l(s),
m}function wr(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[u-1]:v;return p(n,Mt(0,u-e))}function jr(n,r,t){var e=n?n.length:0;for("number"==typeof t&&(e=(t<0?Mt(0,e+t):Vt(t,e-1))+1);e--;)if(n[e]===r)return e;return-1}function kr(n){for(var r=arguments,t=0,e=r.length,u=n?n.length:0;++t<e;)for(var o=-1,a=r[t];++o<u;)n[o]===a&&(Bt.call(n,o--,1),u--);return n}function xr(n,r,t){n=+n||0,t="number"==typeof t?t:+t||1,
null==r&&(r=n,n=0);for(var e=-1,u=Mt(0,Et((r-n)/(t||1))),o=ht(u);++e<u;)o[e]=n,n+=t;return o}function Cr(n,r,t){var e=-1,u=n?n.length:0,o=[];for(r=h.createCallback(r,t,3);++e<u;){var a=n[e];r(a,e,n)&&(o.push(a),Bt.call(n,e--,1),u--)}return o}function Or(n,r,t){if("number"!=typeof r&&null!=r){var e=0,u=-1,o=n?n.length:0;for(r=h.createCallback(r,t,3);++u<o&&r(n[u],u,n);)e++}else e=null==r||t?1:Mt(0,r);return p(n,e)}function Nr(n,r,t,e){var u=0,o=n?n.length:u;for(t=t?h.createCallback(t,e,1):Yr,r=t(r);u<o;){
var a=u+o>>>1;t(n[a])<r?u=a+1:o=a}return u}function Rr(){return un(nn(arguments,!0,!0))}function Er(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(t=h.createCallback(t,e,3)),un(n,r,t)}function Ir(n){return Y(n,p(arguments,1))}function Sr(){for(var n=-1,r=arguments.length;++n<r;){var t=arguments[n];if(Yt(t)||vn(t))var e=e?un(Y(e,t).concat(Y(t,e))):t}return e||[]}function Ar(){for(var n=arguments.length>1?arguments:arguments[0],r=-1,t=n?rr(ve(n,"length")):0,e=ht(t<0?0:t);++r<t;)e[r]=ve(n,r);

return e}function Dr(n,r){var t=-1,e=n?n.length:0,u={};for(r||!e||Yt(n[0])||(r=[]);++t<e;){var o=n[t];r?u[o]=r[t]:o&&(u[o[0]]=o[1])}return u}function Tr(n,r){if(!In(r))throw new kt;return function(){return--n<1?r.apply(this,arguments):v}}function $r(n,r){return arguments.length>2?an(n,17,p(arguments,2),null,r):an(n,1,null,null,r)}function Fr(n){for(var r=arguments.length>1?nn(arguments,!0,!1,1):wn(n),t=-1,e=r.length;++t<e;){var u=r[t];n[u]=an(n[u],1,null,null,n)}return n}function Br(n,r){return arguments.length>2?an(r,19,p(arguments,2),null,n):an(r,3,null,null,n);

}function Wr(){for(var n=arguments,r=n.length;r--;)if(!In(n[r]))throw new kt;return function(){for(var r=arguments,t=n.length;t--;)r=[n[t].apply(this,r)];return r[0]}}function qr(n,r){return r="number"==typeof r?r:+r||n.length,an(n,4,null,null,null,r)}function zr(n,r,t){var e,u,o,a,i,f,l,c=0,p=!1,s=!0;if(!In(n))throw new kt;if(r=Mt(0,r)||0,t===!0){var h=!0;s=!1}else Sn(t)&&(h=t.leading,p="maxWait"in t&&(Mt(r,t.maxWait)||0),s="trailing"in t?t.trailing:s);var g=function(){var t=r-(ge()-a);if(t>0)f=Ft(g,t);
else{u&&It(u);var p=l;u=f=l=v,p&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))}},y=function(){f&&It(f),u=f=l=v,(s||p!==r)&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))};return function(){if(e=arguments,a=ge(),i=this,l=s&&(f||!h),p===!1)var t=h&&!f;else{u||h||(c=a);var v=p-(a-c),m=v<=0;m?(u&&(u=It(u)),c=a,o=n.apply(i,e)):u||(u=Ft(y,v))}return m&&f?f=It(f):f||r===p||(f=Ft(g,r)),t&&(m=!0,o=n.apply(i,e)),!m||f||u||(e=i=null),o}}function Lr(n){if(!In(n))throw new kt;var r=p(arguments,1);return Ft(function(){n.apply(v,r);

},1)}function Pr(n,r){if(!In(n))throw new kt;var t=p(arguments,2);return Ft(function(){n.apply(v,t)},r)}function Kr(n,r){if(!In(n))throw new kt;var t=function(){var e=t.cache,u=r?r.apply(this,arguments):m+arguments[0];return Tt.call(e,u)?e[u]:e[u]=n.apply(this,arguments)};return t.cache={},t}function Ur(n){var r,t;if(!In(n))throw new kt;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}}function Mr(n){return an(n,16,p(arguments,1))}function Vr(n){return an(n,32,null,p(arguments,1));

}function Gr(n,r,t){var e=!0,u=!0;if(!In(n))throw new kt;return t===!1?e=!1:Sn(t)&&(e="leading"in t?t.leading:e,u="trailing"in t?t.trailing:u),U.leading=e,U.maxWait=r,U.trailing=u,zr(n,r,U)}function Hr(n,r){return an(r,16,[n])}function Jr(n){return function(){return n}}function Qr(n,r,t){var e=typeof n;if(null==n||"function"==e)return Q(n,r,t);if("object"!=e)return tt(n);var u=ne(n),o=u[0],a=n[o];return 1!=u.length||a!==a||Sn(a)?function(r){for(var t=u.length,e=!1;t--&&(e=rn(r[u[t]],n[u[t]],null,!0)););
return e}:function(n){var r=n[o];return a===r&&(0!==a||1/a==1/r)}}function Xr(n){return null==n?"":jt(n).replace(ue,fn)}function Yr(n){return n}function Zr(n,r,t){var e=!0,u=r&&wn(r);r&&(t||u.length)||(null==t&&(t=r),o=g,r=n,n=h,u=wn(r)),t===!1?e=!1:Sn(t)&&"chain"in t&&(e=t.chain);var o=n,a=In(o);Xn(u,function(t){var u=n[t]=r[t];a&&(o.prototype[t]=function(){var r=this.__chain__,t=this.__wrapped__,a=[t];$t.apply(a,arguments);var i=u.apply(n,a);if(e||r){if(t===i&&Sn(i))return this;i=new o(i),i.__chain__=r;

}return i})})}function nt(){return t._=Ot,this}function rt(){}function tt(n){return function(r){return r[n]}}function et(n,r,t){var e=null==n,u=null==r;if(null==t&&("boolean"==typeof n&&u?(t=n,n=1):u||"boolean"!=typeof r||(t=r,u=!0)),e&&u&&(r=1),n=+n||0,u?(r=n,n=0):r=+r||0,t||n%1||r%1){var o=Ht();return Vt(n+o*(r-n+parseFloat("1e-"+((o+"").length-1))),r)}return en(n,r)}function ut(n,r){if(n){var t=n[r];return In(t)?n[r]():t}}function ot(n,r,t){var e=h.templateSettings;n=jt(n||""),t=ae({},t,e);var u,o=ae({},t.imports,e.imports),i=ne(o),f=Un(o),l=0,c=t.interpolate||E,p="__p += '",s=wt((t.escape||E).source+"|"+c.source+"|"+(c===N?x:E).source+"|"+(t.evaluate||E).source+"|$","g");

n.replace(s,function(r,t,e,o,i,f){return e||(e=o),p+=n.slice(l,f).replace(S,a),t&&(p+="' +\n__e("+t+") +\n'"),i&&(u=!0,p+="';\n"+i+";\n__p += '"),e&&(p+="' +\n((__t = ("+e+")) == null ? '' : __t) +\n'"),l=f+r.length,r}),p+="';\n";var g=t.variable,y=g;y||(g="obj",p="with ("+g+") {\n"+p+"\n}\n"),p=(u?p.replace(w,""):p).replace(j,"$1").replace(k,"$1;"),p="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(u?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";

var m="\n/*\n//# sourceURL="+(t.sourceURL||"/lodash/template/source["+D++ +"]")+"\n*/";try{var b=mt(i,"return "+p+m).apply(v,f)}catch(_){throw _.source=p,_}return r?b(r):(b.source=p,b)}function at(n,r,t){n=(n=+n)>-1?n:0;var e=-1,u=ht(n);for(r=Q(r,t,1);++e<n;)u[e]=r(e);return u}function it(n){return null==n?"":jt(n).replace(ee,sn)}function ft(n){var r=++y;return jt(null==n?"":n)+r}function lt(n){return n=new g(n),n.__chain__=!0,n}function ct(n,r){return r(n),n}function pt(){return this.__chain__=!0,
this}function st(){return jt(this.__wrapped__)}function vt(){return this.__wrapped__}t=t?Z.defaults(H.Object(),t,Z.pick(H,A)):H;var ht=t.Array,gt=t.Boolean,yt=t.Date,mt=t.Function,bt=t.Math,_t=t.Number,dt=t.Object,wt=t.RegExp,jt=t.String,kt=t.TypeError,xt=[],Ct=dt.prototype,Ot=t._,Nt=Ct.toString,Rt=wt("^"+jt(Nt).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Et=bt.ceil,It=t.clearTimeout,St=bt.floor,At=mt.prototype.toString,Dt=cn(Dt=dt.getPrototypeOf)&&Dt,Tt=Ct.hasOwnProperty,$t=xt.push,Ft=t.setTimeout,Bt=xt.splice,Wt=xt.unshift,qt=function(){
try{var n={},r=cn(r=dt.defineProperty)&&r,t=r(n,n,n)&&r}catch(e){}return t}(),zt=cn(zt=dt.create)&&zt,Lt=cn(Lt=ht.isArray)&&Lt,Pt=t.isFinite,Kt=t.isNaN,Ut=cn(Ut=dt.keys)&&Ut,Mt=bt.max,Vt=bt.min,Gt=t.parseInt,Ht=bt.random,Jt={};Jt[$]=ht,Jt[F]=gt,Jt[B]=yt,Jt[W]=mt,Jt[z]=dt,Jt[q]=_t,Jt[L]=wt,Jt[P]=jt,g.prototype=h.prototype;var Qt=h.support={};Qt.funcDecomp=!cn(t.WinRTError)&&I.test(s),Qt.funcNames="string"==typeof mt.name,h.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,
variable:"",imports:{_:h}},zt||(J=function(){function n(){}return function(r){if(Sn(r)){n.prototype=r;var e=new n;n.prototype=null}return e||t.Object()}}());var Xt=qt?function(n,r){M.value=r,qt(n,"__bindData__",M),M.value=null}:rt,Yt=Lt||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==$||!1},Zt=function(n){var r,t=n,e=[];if(!t)return e;if(!V[typeof n])return e;for(r in t)Tt.call(t,r)&&e.push(r);return e},ne=Ut?function(n){return Sn(n)?Ut(n):[]}:Zt,re={"&":"&amp;",
"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},te=kn(re),ee=wt("("+ne(te).join("|")+")","g"),ue=wt("["+ne(re).join("")+"]","g"),oe=function(n,r,t){var e,u=n,o=u;if(!u)return o;var a=arguments,i=0,f="number"==typeof t?2:a.length;if(f>3&&"function"==typeof a[f-2])var l=Q(a[--f-1],a[f--],2);else f>2&&"function"==typeof a[f-1]&&(l=a[--f]);for(;++i<f;)if(u=a[i],u&&V[typeof u])for(var c=-1,p=V[typeof u]&&ne(u),s=p?p.length:0;++c<s;)e=p[c],o[e]=l?l(o[e],u[e]):u[e];return o},ae=function(n,r,t){var e,u=n,o=u;

if(!u)return o;for(var a=arguments,i=0,f="number"==typeof t?2:a.length;++i<f;)if(u=a[i],u&&V[typeof u])for(var l=-1,c=V[typeof u]&&ne(u),p=c?c.length:0;++l<p;)e=c[l],"undefined"==typeof o[e]&&(o[e]=u[e]);return o},ie=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(e in u)if(r(u[e],e,n)===!1)return o;return o},fe=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(var a=-1,i=V[typeof u]&&ne(u),f=i?i.length:0;++a<f;)if(e=i[a],
r(u[e],e,n)===!1)return o;return o},le=Dt?function(n){if(!n||Nt.call(n)!=z)return!1;var r=n.valueOf,t=cn(r)&&(t=Dt(r))&&Dt(t);return t?n==t||Dt(n)==t:pn(n)}:pn,ce=on(function(n,r,t){Tt.call(n,t)?n[t]++:n[t]=1}),pe=on(function(n,r,t){(Tt.call(n,t)?n[t]:n[t]=[]).push(r)}),se=on(function(n,r,t){n[t]=r}),ve=nr,he=Hn,ge=cn(ge=yt.now)&&ge||function(){return(new yt).getTime()},ye=8==Gt(d+"08")?Gt:function(n,r){return Gt(Fn(n)?n.replace(R,""):n,r||0)};return h.after=Tr,h.assign=oe,h.at=Mn,h.bind=$r,h.bindAll=Fr,
h.bindKey=Br,h.chain=lt,h.compact=sr,h.compose=Wr,h.constant=Jr,h.countBy=ce,h.create=yn,h.createCallback=Qr,h.curry=qr,h.debounce=zr,h.defaults=ae,h.defer=Lr,h.delay=Pr,h.difference=vr,h.filter=Hn,h.flatten=mr,h.forEach=Xn,h.forEachRight=Yn,h.forIn=ie,h.forInRight=_n,h.forOwn=fe,h.forOwnRight=dn,h.functions=wn,h.groupBy=pe,h.indexBy=se,h.initial=_r,h.intersection=dr,h.invert=kn,h.invoke=Zn,h.keys=ne,h.map=nr,h.mapValues=Wn,h.max=rr,h.memoize=Kr,h.merge=qn,h.min=tr,h.omit=zn,h.once=Ur,h.pairs=Ln,
h.partial=Mr,h.partialRight=Vr,h.pick=Pn,h.pluck=ve,h.property=tt,h.pull=kr,h.range=xr,h.reject=or,h.remove=Cr,h.rest=Or,h.shuffle=ir,h.sortBy=cr,h.tap=ct,h.throttle=Gr,h.times=at,h.toArray=pr,h.transform=Kn,h.union=Rr,h.uniq=Er,h.values=Un,h.where=he,h.without=Ir,h.wrap=Hr,h.xor=Sr,h.zip=Ar,h.zipObject=Dr,h.collect=nr,h.drop=Or,h.each=Xn,h.eachRight=Yn,h.extend=oe,h.methods=wn,h.object=Dr,h.select=Hn,h.tail=Or,h.unique=Er,h.unzip=Ar,Zr(h),h.clone=hn,h.cloneDeep=gn,h.contains=Vn,h.escape=Xr,h.every=Gn,
h.find=Jn,h.findIndex=hr,h.findKey=mn,h.findLast=Qn,h.findLastIndex=gr,h.findLastKey=bn,h.has=jn,h.identity=Yr,h.indexOf=br,h.isArguments=vn,h.isArray=Yt,h.isBoolean=xn,h.isDate=Cn,h.isElement=On,h.isEmpty=Nn,h.isEqual=Rn,h.isFinite=En,h.isFunction=In,h.isNaN=An,h.isNull=Dn,h.isNumber=Tn,h.isObject=Sn,h.isPlainObject=le,h.isRegExp=$n,h.isString=Fn,h.isUndefined=Bn,h.lastIndexOf=jr,h.mixin=Zr,h.noConflict=nt,h.noop=rt,h.now=ge,h.parseInt=ye,h.random=et,h.reduce=er,h.reduceRight=ur,h.result=ut,h.runInContext=s,
h.size=fr,h.some=lr,h.sortedIndex=Nr,h.template=ot,h.unescape=it,h.uniqueId=ft,h.all=Gn,h.any=lr,h.detect=Jn,h.findWhere=Jn,h.foldl=er,h.foldr=ur,h.include=Vn,h.inject=er,Zr(function(){var n={};return fe(h,function(r,t){h.prototype[t]||(n[t]=r)}),n}(),!1),h.first=yr,h.last=wr,h.sample=ar,h.take=yr,h.head=yr,fe(h,function(n,r){var t="sample"!==r;h.prototype[r]||(h.prototype[r]=function(r,e){var u=this.__chain__,o=n(this.__wrapped__,r,e);return u||null!=r&&(!e||t&&"function"==typeof r)?new g(o,u):o;

})}),h.VERSION="2.4.2",h.prototype.chain=pt,h.prototype.toString=st,h.prototype.value=vt,h.prototype.valueOf=vt,Xn(["join","pop","shift"],function(n){var r=xt[n];h.prototype[n]=function(){var n=this.__chain__,t=r.apply(this.__wrapped__,arguments);return n?new g(t,n):t}}),Xn(["push","reverse","sort","unshift"],function(n){var r=xt[n];h.prototype[n]=function(){return r.apply(this.__wrapped__,arguments),this}}),Xn(["concat","slice","splice"],function(n){var r=xt[n];h.prototype[n]=function(){return new g(r.apply(this.__wrapped__,arguments),this.__chain__);

}}),h}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" 	\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p \+= '';/g,j=/\b(__p \+=) '' \+/g,k=/(__e\(.*?\)|\b__t\)) \+\n'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,R=RegExp("^["+d+"]*0+(?=.$)"),E=/($^)/,I=/\bthis\b/,S=/['\n\r\t\u2028\u2029\\]/g,A=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=0,T="[object Arguments]",$="[object Array]",F="[object Boolean]",B="[object Date]",W="[object Function]",q="[object Number]",z="[object Object]",L="[object RegExp]",P="[object String]",K={};

K[W]=!1,K[T]=K[$]=K[F]=K[B]=K[q]=K[z]=K[L]=K[P]=!0;var U={leading:!1,maxWait:0,trailing:!1},M={configurable:!1,enumerable:!1,value:null,writable:!1},V={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},G={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},H=V[typeof window]&&window||this,J=V[typeof exports]&&exports&&!exports.nodeType&&exports,Q=V[typeof module]&&module&&!module.nodeType&&module,X=Q&&Q.exports===J&&J,Y=V[typeof global]&&global;!Y||Y.global!==Y&&Y.window!==Y||(H=Y);

var Z=s();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(H._=Z,define(function(){return Z})):J&&Q?X?(Q.exports=Z)._=Z:J._=Z:H._=Z}).call(this);
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"moment":[function(require,module,exports){
module.exports=require('2V8r5n');
},{}],"2V8r5n":[function(require,module,exports){
//! moment.js
//! version : 2.5.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function c(a,b){return function(c){return k(a.call(this,c),b)}}function d(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function e(){}function f(a){w(a),h(this,a)}function g(a){var b=q(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function h(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function i(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&qb.hasOwnProperty(b)&&(c[b]=a[b]);return c}function j(a){return 0>a?Math.ceil(a):Math.floor(a)}function k(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function l(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&db.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function m(a){return"[object Array]"===Object.prototype.toString.call(a)}function n(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function o(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&s(a[d])!==s(b[d]))&&g++;return g+f}function p(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Tb[a]||Ub[b]||b}return a}function q(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=p(c),b&&(d[b]=a[c]));return d}function r(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}db[b]=function(e,f){var g,h,i=db.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=db().utc().set(d,a);return i.call(db.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function s(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function t(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function u(a){return v(a)?366:365}function v(a){return a%4===0&&a%100!==0||a%400===0}function w(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[jb]<0||a._a[jb]>11?jb:a._a[kb]<1||a._a[kb]>t(a._a[ib],a._a[jb])?kb:a._a[lb]<0||a._a[lb]>23?lb:a._a[mb]<0||a._a[mb]>59?mb:a._a[nb]<0||a._a[nb]>59?nb:a._a[ob]<0||a._a[ob]>999?ob:-1,a._pf._overflowDayOfYear&&(ib>b||b>kb)&&(b=kb),a._pf.overflow=b)}function x(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function y(a){return a?a.toLowerCase().replace("_","-"):a}function z(a,b){return b._isUTC?db(a).zone(b._offset||0):db(a).local()}function A(a,b){return b.abbr=a,pb[a]||(pb[a]=new e),pb[a].set(b),pb[a]}function B(a){delete pb[a]}function C(a){var b,c,d,e,f=0,g=function(a){if(!pb[a]&&rb)try{require("./lang/"+a)}catch(b){}return pb[a]};if(!a)return db.fn._lang;if(!m(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=y(a[f]).split("-"),b=e.length,d=y(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&o(e,d,!0)>=b-1)break;b--}f++}return db.fn._lang}function D(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function E(a){var b,c,d=a.match(vb);for(b=0,c=d.length;c>b;b++)d[b]=Yb[d[b]]?Yb[d[b]]:D(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function F(a,b){return a.isValid()?(b=G(b,a.lang()),Vb[b]||(Vb[b]=E(b)),Vb[b](a)):a.lang().invalidDate()}function G(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(wb.lastIndex=0;d>=0&&wb.test(a);)a=a.replace(wb,c),wb.lastIndex=0,d-=1;return a}function H(a,b){var c,d=b._strict;switch(a){case"DDDD":return Ib;case"YYYY":case"GGGG":case"gggg":return d?Jb:zb;case"Y":case"G":case"g":return Lb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Kb:Ab;case"S":if(d)return Gb;case"SS":if(d)return Hb;case"SSS":if(d)return Ib;case"DDD":return yb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Cb;case"a":case"A":return C(b._l)._meridiemParse;case"X":return Fb;case"Z":case"ZZ":return Db;case"T":return Eb;case"SSSS":return Bb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Hb:xb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return xb;default:return c=new RegExp(P(O(a.replace("\\","")),"i"))}}function I(a){a=a||"";var b=a.match(Db)||[],c=b[b.length-1]||[],d=(c+"").match(Qb)||["-",0,0],e=+(60*d[1])+s(d[2]);return"+"===d[0]?-e:e}function J(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[jb]=s(b)-1);break;case"MMM":case"MMMM":d=C(c._l).monthsParse(b),null!=d?e[jb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[kb]=s(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=s(b));break;case"YY":e[ib]=s(b)+(s(b)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":e[ib]=s(b);break;case"a":case"A":c._isPm=C(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[lb]=s(b);break;case"m":case"mm":e[mb]=s(b);break;case"s":case"ss":e[nb]=s(b);break;case"S":case"SS":case"SSS":case"SSSS":e[ob]=s(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=I(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function K(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=M(a),a._w&&null==a._a[kb]&&null==a._a[jb]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[ib]?db().weekYear():a._a[ib]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=Z(f(g.GG),g.W||1,g.E,4,1):(i=C(a._l),j=null!=g.d?V(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=Z(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[ib]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[ib]?d[ib]:a._a[ib],a._dayOfYear>u(e)&&(a._pf._overflowDayOfYear=!0),c=U(e,0,a._dayOfYear),a._a[jb]=c.getUTCMonth(),a._a[kb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[lb]+=s((a._tzm||0)/60),l[mb]+=s((a._tzm||0)%60),a._d=(a._useUTC?U:T).apply(null,l)}}function L(a){var b;a._d||(b=q(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],K(a))}function M(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function N(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=C(a._l),h=""+a._i,i=h.length,j=0;for(d=G(a._f,g).match(vb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(H(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Yb[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),J(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[lb]<12&&(a._a[lb]+=12),a._isPm===!1&&12===a._a[lb]&&(a._a[lb]=0),K(a),w(a)}function O(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function P(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Q(a){var c,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,a._d=new Date(0/0),void 0;for(f=0;f<a._f.length;f++)g=0,c=h({},a),c._pf=b(),c._f=a._f[f],N(c),x(c)&&(g+=c._pf.charsLeftOver,g+=10*c._pf.unusedTokens.length,c._pf.score=g,(null==e||e>g)&&(e=g,d=c));h(a,d||c)}function R(a){var b,c,d=a._i,e=Mb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Ob.length;c>b;b++)if(Ob[b][1].exec(d)){a._f=Ob[b][0]+(e[6]||" ");break}for(b=0,c=Pb.length;c>b;b++)if(Pb[b][1].exec(d)){a._f+=Pb[b][0];break}d.match(Db)&&(a._f+="Z"),N(a)}else a._d=new Date(d)}function S(b){var c=b._i,d=sb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?R(b):m(c)?(b._a=c.slice(0),K(b)):n(c)?b._d=new Date(+c):"object"==typeof c?L(b):b._d=new Date(c)}function T(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function U(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function V(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function W(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function X(a,b,c){var d=hb(Math.abs(a)/1e3),e=hb(d/60),f=hb(e/60),g=hb(f/24),h=hb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",hb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,W.apply({},i)}function Y(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=db(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function Z(a,b,c,d,e){var f,g,h=U(a,0,1).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:u(a-1)+g}}function $(a){var b=a._i,c=a._f;return null===b?db.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=C().preparse(b)),db.isMoment(b)?(a=i(b),a._d=new Date(+b._d)):c?m(c)?Q(a):N(a):S(a),new f(a))}function _(a,b){db.fn[a]=db.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),db.updateOffset(this),this):this._d["get"+c+b]()}}function ab(a){db.duration.fn[a]=function(){return this._data[a]}}function bb(a,b){db.duration.fn["as"+a]=function(){return+this/b}}function cb(a){var b=!1,c=db;"undefined"==typeof ender&&(a?(gb.moment=function(){return!b&&console&&console.warn&&(b=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),c.apply(null,arguments)},h(gb.moment,c)):gb.moment=db)}for(var db,eb,fb="2.5.1",gb=this,hb=Math.round,ib=0,jb=1,kb=2,lb=3,mb=4,nb=5,ob=6,pb={},qb={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},rb="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,sb=/^\/?Date\((\-?\d+)/i,tb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,ub=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,vb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,wb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,xb=/\d\d?/,yb=/\d{1,3}/,zb=/\d{1,4}/,Ab=/[+\-]?\d{1,6}/,Bb=/\d+/,Cb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Db=/Z|[\+\-]\d\d:?\d\d/gi,Eb=/T/i,Fb=/[\+\-]?\d+(\.\d{1,3})?/,Gb=/\d/,Hb=/\d\d/,Ib=/\d{3}/,Jb=/\d{4}/,Kb=/[+-]?\d{6}/,Lb=/[+-]?\d+/,Mb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Nb="YYYY-MM-DDTHH:mm:ssZ",Ob=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Pb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Qb=/([\+\-]|\d\d)/gi,Rb="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Sb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Tb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Ub={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Vb={},Wb="DDD w W M D d".split(" "),Xb="M D H h m s w W".split(" "),Yb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return k(this.year()%100,2)},YYYY:function(){return k(this.year(),4)},YYYYY:function(){return k(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+k(Math.abs(a),6)},gg:function(){return k(this.weekYear()%100,2)},gggg:function(){return k(this.weekYear(),4)},ggggg:function(){return k(this.weekYear(),5)},GG:function(){return k(this.isoWeekYear()%100,2)},GGGG:function(){return k(this.isoWeekYear(),4)},GGGGG:function(){return k(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return s(this.milliseconds()/100)},SS:function(){return k(s(this.milliseconds()/10),2)},SSS:function(){return k(this.milliseconds(),3)},SSSS:function(){return k(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+k(s(a/60),2)+":"+k(s(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+k(s(a/60),2)+k(s(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Zb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Wb.length;)eb=Wb.pop(),Yb[eb+"o"]=d(Yb[eb],eb);for(;Xb.length;)eb=Xb.pop(),Yb[eb+eb]=c(Yb[eb],2);for(Yb.DDDD=c(Yb.DDD,3),h(e.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=db.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=db([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return Y(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),db=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=c,g._f=d,g._l=e,g._strict=f,g._isUTC=!1,g._pf=b(),$(g)},db.utc=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=c,g._f=d,g._strict=f,g._pf=b(),$(g).utc()},db.unix=function(a){return db(1e3*a)},db.duration=function(a,b){var c,d,e,f=a,h=null;return db.isDuration(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(h=tb.exec(a))?(c="-"===h[1]?-1:1,f={y:0,d:s(h[kb])*c,h:s(h[lb])*c,m:s(h[mb])*c,s:s(h[nb])*c,ms:s(h[ob])*c}):(h=ub.exec(a))&&(c="-"===h[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},f={y:e(h[2]),M:e(h[3]),d:e(h[4]),h:e(h[5]),m:e(h[6]),s:e(h[7]),w:e(h[8])}),d=new g(f),db.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},db.version=fb,db.defaultFormat=Nb,db.updateOffset=function(){},db.lang=function(a,b){var c;return a?(b?A(y(a),b):null===b?(B(a),a="en"):pb[a]||C(a),c=db.duration.fn._lang=db.fn._lang=C(a),c._abbr):db.fn._lang._abbr},db.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),C(a)},db.isMoment=function(a){return a instanceof f||null!=a&&a.hasOwnProperty("_isAMomentObject")},db.isDuration=function(a){return a instanceof g},eb=Zb.length-1;eb>=0;--eb)r(Zb[eb]);for(db.normalizeUnits=function(a){return p(a)},db.invalid=function(a){var b=db.utc(0/0);return null!=a?h(b._pf,a):b._pf.userInvalidated=!0,b},db.parseZone=function(a){return db(a).parseZone()},h(db.fn=f.prototype,{clone:function(){return db(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=db(this).utc();return 0<a.year()&&a.year()<=9999?F(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):F(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return x(this)},isDSTShifted:function(){return this._a?this.isValid()&&o(this._a,(this._isUTC?db.utc(this._a):db(this._a)).toArray())>0:!1},parsingFlags:function(){return h({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=F(this,a||db.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?db.duration(+b,a):db.duration(a,b),l(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?db.duration(+b,a):db.duration(a,b),l(this,c,-1),this},diff:function(a,b,c){var d,e,f=z(a,this),g=6e4*(this.zone()-f.zone());return b=p(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-db(this).startOf("month")-(f-db(f).startOf("month")))/d,e-=6e4*(this.zone()-db(this).startOf("month").zone()-(f.zone()-db(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:j(e)},from:function(a,b){return db.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(db(),a)},calendar:function(){var a=z(db(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return v(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=V(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),db.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=p(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=p(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+db(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+db(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+z(a,this).startOf(b)},min:function(a){return a=db.apply(null,arguments),this>a?this:a},max:function(a){return a=db.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=I(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&l(this,db.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?db(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return t(this.year(),this.month())},dayOfYear:function(a){var b=hb((db(this).startOf("day")-db(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(a){var b=Y(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=Y(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=Y(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=p(a),this[a]()},set:function(a,b){return a=p(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=C(b),this)}}),eb=0;eb<Rb.length;eb++)_(Rb[eb].toLowerCase().replace(/s$/,""),Rb[eb]);_("year","FullYear"),db.fn.days=db.fn.day,db.fn.months=db.fn.month,db.fn.weeks=db.fn.week,db.fn.isoWeeks=db.fn.isoWeek,db.fn.toJSON=db.fn.toISOString,h(db.duration.fn=g.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=j(e/1e3),h.seconds=a%60,b=j(a/60),h.minutes=b%60,c=j(b/60),h.hours=c%24,f+=j(c/24),h.days=f%30,g+=j(f/30),h.months=g%12,d=j(g/12),h.years=d},weeks:function(){return j(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*s(this._months/12)},humanize:function(a){var b=+this,c=X(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=db.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=db.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=p(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=p(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:db.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(eb in Sb)Sb.hasOwnProperty(eb)&&(bb(eb,Sb[eb]),ab(eb.toLowerCase()));bb("Weeks",6048e5),db.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},db.lang("en",{ordinal:function(a){var b=a%10,c=1===s(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),rb?(module.exports=db,cb(!0)):"function"==typeof define&&define.amd?define("moment",function(b,c,d){return d.config&&d.config()&&d.config().noGlobal!==!0&&cb(d.config().noGlobal===a),db}):cb()}).call(this);
},{}],"gaBrea":[function(require,module,exports){
(function (global){
!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.stampit=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){function c(a,b){this[b]=a}var d=a("mout/object/forIn");b.exports=function(a){for(var b,e=0,f=arguments.length;++e<f;)b=arguments[e],null!=b&&d(b,c,a);return a}},{"mout/object/forIn":14}],2:[function(a,b){function c(a,b,c){if(null!=a)for(var d=-1,e=a.length;++d<e&&b.call(c,a[d],d,a)!==!1;);}b.exports=c},{}],3:[function(a,b){function c(a,b,c){b=d(b,c);var e=[];if(null==a)return e;for(var f=-1,g=a.length;++f<g;)e[f]=b(a[f],f,a);return e}var d=(a("./forEach"),a("../function/makeIterator_"));b.exports=c},{"../function/makeIterator_":4,"./forEach":2}],4:[function(a,b){function c(a,b){switch(typeof a){case"object":return null!=a?function(b){return e(b,a)}:a;case"string":case"number":return d(a);case"function":return"undefined"==typeof b?a:function(c,d,e){return a.call(b,c,d,e)};default:return a}}var d=a("./prop"),e=a("../object/deepMatches");b.exports=c},{"../object/deepMatches":13,"./prop":5}],5:[function(a,b){function c(a){return function(b){return b[a]}}b.exports=c},{}],6:[function(a,b){function c(a){switch(h(a)){case"Object":return d(a);case"Array":return g(a);case"RegExp":return e(a);case"Date":return f(a);default:return a}}function d(a){return i(a)?j({},a):a}function e(a){var b="";return b+=a.multiline?"m":"",b+=a.global?"g":"",b+=a.ignorecase?"i":"",new RegExp(a.source,b)}function f(a){return new Date(+a)}function g(a){return a.slice()}var h=a("./kindOf"),i=a("./isPlainObject"),j=a("../object/mixIn");b.exports=c},{"../object/mixIn":18,"./isPlainObject":11,"./kindOf":12}],7:[function(a,b){function c(a,b){switch(h(a)){case"Object":return d(a,b);case"Array":return e(a,b);default:return f(a)}}function d(a,b){if(i(a)){var d={};return g(a,function(a,d){this[d]=c(a,b)},d),d}return b?b(a):a}function e(a,b){for(var d=[],e=-1,f=a.length;++e<f;)d[e]=c(a[e],b);return d}var f=a("./clone"),g=a("../object/forOwn"),h=a("./kindOf"),i=a("./isPlainObject");b.exports=c},{"../object/forOwn":15,"./clone":6,"./isPlainObject":11,"./kindOf":12}],8:[function(a,b){var c=a("./isKind"),d=Array.isArray||function(a){return c(a,"Array")};b.exports=d},{"./isKind":9}],9:[function(a,b){function c(a,b){return d(a)===b}var d=a("./kindOf");b.exports=c},{"./kindOf":12}],10:[function(a,b){function c(a){return d(a,"Object")}var d=a("./isKind");b.exports=c},{"./isKind":9}],11:[function(a,b){function c(a){return!!a&&"object"==typeof a&&a.constructor===Object}b.exports=c},{}],12:[function(a,b){function c(a){return null===a?"Null":a===d?"Undefined":e.exec(f.call(a))[1]}var d,e=/^\[object (.*)\]$/,f=Object.prototype.toString;b.exports=c},{}],13:[function(a,b){function c(a,b){for(var c=-1,d=a.length;++c<d;)if(f(a[c],b))return!0;return!1}function d(a,b){for(var d=-1,e=b.length;++d<e;)if(!c(a,b[d]))return!1;return!0}function e(a,b){var c=!0;return g(b,function(b,d){return f(a[d],b)?void 0:c=!1}),c}function f(a,b){return a&&"object"==typeof a?h(a)&&h(b)?d(a,b):e(a,b):a===b}var g=a("./forOwn"),h=a("../lang/isArray");b.exports=f},{"../lang/isArray":8,"./forOwn":15}],14:[function(a,b){function c(){g=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=!0;for(var a in{toString:null})f=!1}function d(a,b,d){var h,i=0;null==f&&c();for(h in a)if(e(b,a,h,d)===!1)break;if(f)for(;(h=g[i++])&&(a[h]===Object.prototype[h]||e(b,a,h,d)!==!1););}function e(a,b,c,d){return a.call(d,b[c],c,b)}var f,g;b.exports=d},{}],15:[function(a,b){function c(a,b,c){e(a,function(e,f){return d(a,f)?b.call(c,a[f],f,a):void 0})}var d=a("./hasOwn"),e=a("./forIn");b.exports=c},{"./forIn":14,"./hasOwn":16}],16:[function(a,b){function c(a,b){return Object.prototype.hasOwnProperty.call(a,b)}b.exports=c},{}],17:[function(a,b){function c(){var a,b,g,h,i=1;for(h=e(arguments[0]);g=arguments[i++];)for(a in g)d(g,a)&&(b=g[a],h[a]=f(b)&&f(h[a])?c(h[a],b):e(b));return h}var d=a("./hasOwn"),e=a("../lang/deepClone"),f=a("../lang/isObject");b.exports=c},{"../lang/deepClone":7,"../lang/isObject":10,"./hasOwn":16}],18:[function(a,b){function c(a){for(var b,c=0,f=arguments.length;++c<f;)b=arguments[c],null!=b&&e(b,d,a);return a}function d(a,b){this[b]=a}var e=a("./forOwn");b.exports=c},{"./forOwn":15}],19:[function(a,b){"use strict";var c=a("mout/array/forEach"),d=a("mout/object/mixIn"),e=a("mout/object/merge"),f=a("mout/array/map"),g=a("mout/object/forOwn"),h=a("./mixinchain.js"),i=[].slice,j=function(a){function b(){}if(arguments.length>1)throw new Error("Object.create implementation only accepts the first parameter.");return b.prototype=a,new b};Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});var k=function(a){var b=[],d=[].slice.call(arguments);return"function"==typeof a?b=f(d,function(a){return"function"==typeof a?a:void 0}):"object"==typeof a?c(d,function(a){g(a,function(a){b.push(a)})}):Array.isArray(a)&&c(a,function(a){b.push(a)}),b},l=function(a,b,f){var g={methods:a||{},state:b,enclose:k(f)},l=function(a){var b=e({},g.state),f=d(j(g.methods||{}),b,a),h=g.enclose,k=i.call(arguments,1);return c(h,function(a){"function"==typeof a&&(f=a.apply(f,k)||f)}),f};return d(l,{create:l,fixed:g,methods:function(){var a=g.methods||{},b=[a].concat([].slice.call(arguments));return g.methods=h.apply(this,b),this},state:function(){var a=g.state||{},b=[a].concat([].slice.call(arguments));return g.state=d.apply(this,b),this},enclose:function(){return g.enclose=g.enclose.concat(k.apply(null,arguments)),this}})},m=function(){var a=[].slice.call(arguments),b=l();return c(a,function(a){a&&(a.fixed.methods&&(b.fixed.methods=h({},b.fixed.methods,a.fixed.methods)),a.fixed.state&&(b.fixed.state=d({},b.fixed.state,a.fixed.state)),a.fixed.enclose&&(b.fixed.enclose=b.fixed.enclose.concat(a.fixed.enclose)))}),l(b.fixed.methods,b.fixed.state,b.fixed.enclose)},n=function(a){return l().methods(a.prototype).enclose(a)};b.exports=d(l,{compose:m,extend:d,mixIn:d,convertConstructor:n})},{"./mixinchain.js":1,"mout/array/forEach":2,"mout/array/map":3,"mout/object/forOwn":15,"mout/object/merge":17,"mout/object/mixIn":18}]},{},[19])(19)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"stampit":[function(require,module,exports){
module.exports=require('gaBrea');
},{}],7:[function(require,module,exports){
module.exports={
  "name": "moysklad-client",
  "version": "0.2.8",
  "author": {
    "name": "Vitaliy Makeev",
    "email": "w.makeev@gmail.com",
    "url": "https://github.com/wmakeev"
  },
  "description": "JavaScript клиент для комфортной работы с API сервиса МойСклад.",
  "main": "./src/moysklad-client/index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/wmakeev/moysklad-client.git"
  },
  "bugs": {
      "url": "https://github.com/wmakeev/moysklad-client/issues"
  },
  "keywords": [
    "moysklad",
    "warehouse",
    "wms",
    "crm",
    "client"
  ],
  "devDependencies": {
    "browserify": "^4.1.5",
    "fs-sync": "~0.2.4",
    "grunt": "^0.4.5",
    "grunt-browserify": "^2.1.0",
    "grunt-contrib-concat": "^0.4.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-webmake": "^0.1.2",
    "js-beautify": "~1.4.2",
    "rewire": "^2.1.0",
    "should": "~3.2.0-beta1",
    "sinon": "^1.10.3"
  },
  "dependencies": {
    "colors": "~0.6.2",
    "lodash": "^2.4.1",
    "moment": "~2.5.0",
    "request": "^2.37.0",
    "stampit": "~0.7.1",
    "tracer": "~0.6.1",
    "xmldom": "~0.1.17"
  }
}

},{}],8:[function(require,module,exports){
module.exports={"name":"moysklad","enums":{"uomType":{"MASS":"mass","VOLUME":"volume","PIECE":"piece"},"accessMode":{"NONE":"NONE","SELF":"SELF","PARENT":"PARENT","NEIGHBOUR":"NEIGHBOUR","ALL":"ALL"},"companyType":{"URLI":"URLI","INPR":"INPR","FILI":"FILI"},"attributeType":{"STRING":"STRING","LONG":"LONG","TIME":"TIME","ID_CUSTOM":"ID_CUSTOM","FILE":"FILE","DOUBLE":"DOUBLE","BOOLEAN":"BOOLEAN","ID_EMBEDDED":"ID_EMBEDDED","TEXT":"TEXT","LINK":"LINK"},"editablePeriodType":{"ALL":"ALL","CALENDAR_DAYS":"CALENDAR_DAYS","WORK_DAYS":"WORK_DAYS","DATE":"DATE"},"barcodeType":{"EAN8":"EAN8","EAN13":"EAN13","CODE128":"Code128"},"contractType":{"SALES":"Sales","COMMISSION":"Commission"},"rewardType":{"PERCENTOFSALES":"PercentOfSales","NONE":"None"},"overheadDistribution":{"BY_PRICE":"BY_PRICE","BY_WEIGHT":"BY_WEIGHT","BY_VOLUME":"BY_VOLUME"},"cmlType":{"BITRIX":"BITRIX","UMICMS":"UMICMS","HOSTCMS":"HOSTCMS","INSALES":"INSALES","WEBASYST":"WEBASYST","SIMPLA":"SIMPLA","UMIRU":"UMIRU","PRESTASHOP":"PRESTASHOP","SITEEDIT":"SITEEDIT","BITRIXSMB":"BITRIXSMB","FASTSALES":"FASTSALES","MAGENTO":"MAGENTO","DIAFAN":"DIAFAN","SHOPIUM":"SHOPIUM","VIRTUEMART":"VIRTUEMART","ADVANTSHOP":"ADVANTSHOP","AGORAPLATFORM":"AGORAPLATFORM","CSCART":"CSCART","WEBASYST5":"WEBASYST5","GENERIC_CML":"GENERIC_CML","NETHOUSE":"NETHOUSE"}},"elementInfos":[{"elementName":"agent","typeInfo":"moysklad.agent"},{"elementName":"agentPictureDocument","typeInfo":"moysklad.agentPictureDocument"},{"elementName":"amiroConnectorSettings","typeInfo":"moysklad.amiroConnectorSettings"},{"elementName":"attachmentDocument","typeInfo":"moysklad.attachmentDocument"},{"elementName":"barcode","typeInfo":"moysklad.barcode"},{"elementName":"cashIn","typeInfo":"moysklad.cashIn"},{"elementName":"cashOut","typeInfo":"moysklad.cashOut"},{"elementName":"cashier","typeInfo":"moysklad.cashier"},{"elementName":"cmlConnectorSettings","typeInfo":"moysklad.cmlConnectorSettings"},{"elementName":"collection","typeInfo":"moysklad.collection"},{"elementName":"commissionReportIn","typeInfo":"moysklad.commissionReportIn"},{"elementName":"commissionReportInPosition","typeInfo":"moysklad.commissionReportInPosition"},{"elementName":"commissionReportOut","typeInfo":"moysklad.commissionReportOut"},{"elementName":"commissionReportOutPosition","typeInfo":"moysklad.commissionReportOutPosition"},{"elementName":"company","typeInfo":"moysklad.company"},{"elementName":"consignment","typeInfo":"moysklad.consignment"},{"elementName":"contract","typeInfo":"moysklad.contract"},{"elementName":"contractDocument","typeInfo":"moysklad.contractDocument"},{"elementName":"country","typeInfo":"moysklad.country"},{"elementName":"currency","typeInfo":"moysklad.currency"},{"elementName":"customEntity","typeInfo":"moysklad.customEntity"},{"elementName":"customEntityMetadata","typeInfo":"moysklad.customEntityMetadata"},{"elementName":"customerOrder","typeInfo":"moysklad.customerOrder"},{"elementName":"demand","typeInfo":"moysklad.demand"},{"elementName":"document","typeInfo":"moysklad.document"},{"elementName":"documentMiniature","typeInfo":"moysklad.documentMiniature"},{"elementName":"embeddedEntityMetadata","typeInfo":"moysklad.embeddedEntityMetadata"},{"elementName":"employee","typeInfo":"moysklad.employee"},{"elementName":"enter","typeInfo":"moysklad.enter"},{"elementName":"entityTemplatesMetadata","typeInfo":"moysklad.entityTemplatesMetadata"},{"elementName":"exchange","typeInfo":"moysklad.exchangeContainer"},{"elementName":"expenseItem","typeInfo":"moysklad.expenseItem"},{"elementName":"factureIn","typeInfo":"moysklad.factureIn"},{"elementName":"factureOut","typeInfo":"moysklad.factureOut"},{"elementName":"feature","typeInfo":"moysklad.feature"},{"elementName":"good","typeInfo":"moysklad.good"},{"elementName":"goodFolder","typeInfo":"moysklad.goodFolder"},{"elementName":"goodImage","typeInfo":"moysklad.goodImage"},{"elementName":"group","typeInfo":"moysklad.group"},{"elementName":"gtd","typeInfo":"moysklad.gtd"},{"elementName":"internalOrder","typeInfo":"moysklad.internalOrder"},{"elementName":"inventory","typeInfo":"moysklad.inventory"},{"elementName":"invoiceIn","typeInfo":"moysklad.invoiceIn"},{"elementName":"invoiceOut","typeInfo":"moysklad.invoiceOut"},{"elementName":"loss","typeInfo":"moysklad.loss"},{"elementName":"move","typeInfo":"moysklad.move"},{"elementName":"myCompany","typeInfo":"moysklad.myCompany"},{"elementName":"operationDocument","typeInfo":"moysklad.operationDocument"},{"elementName":"paymentIn","typeInfo":"moysklad.paymentIn"},{"elementName":"paymentOut","typeInfo":"moysklad.paymentOut"},{"elementName":"priceList","typeInfo":"moysklad.priceList"},{"elementName":"priceType","typeInfo":"moysklad.priceType"},{"elementName":"processing","typeInfo":"moysklad.processing"},{"elementName":"processingOrder","typeInfo":"moysklad.processingOrder"},{"elementName":"processingPlan","typeInfo":"moysklad.processingPlan"},{"elementName":"processingPlanFolder","typeInfo":"moysklad.processingPlanFolder"},{"elementName":"project","typeInfo":"moysklad.project"},{"elementName":"purchaseOrder","typeInfo":"moysklad.purchaseOrder"},{"elementName":"purchaseReturn","typeInfo":"moysklad.purchaseReturn"},{"elementName":"reportTemplatesMetadata","typeInfo":"moysklad.reportTemplatesMetadata"},{"elementName":"retailCashIn","typeInfo":"moysklad.retailCashIn"},{"elementName":"retailCashOut","typeInfo":"moysklad.retailCashOut"},{"elementName":"retailDemand","typeInfo":"moysklad.retailDemand"},{"elementName":"retailSalesReturn","typeInfo":"moysklad.retailSalesReturn"},{"elementName":"retailShift","typeInfo":"moysklad.retailShift"},{"elementName":"retailStore","typeInfo":"moysklad.retailStore"},{"elementName":"salesReturn","typeInfo":"moysklad.salesReturn"},{"elementName":"service","typeInfo":"moysklad.service"},{"elementName":"slot","typeInfo":"moysklad.slot"},{"elementName":"supply","typeInfo":"moysklad.supply"},{"elementName":"template","typeInfo":"moysklad.template"},{"elementName":"thing","typeInfo":"moysklad.thing"},{"elementName":"tinyImage","typeInfo":"moysklad.tinyImage"},{"elementName":"uom","typeInfo":"moysklad.uom"},{"elementName":"warehouse","typeInfo":"moysklad.warehouse"},{"elementName":"workflow","typeInfo":"moysklad.workflow"},{"elementName":"ymlConnectorSettings","typeInfo":"moysklad.ymlConnectorSettings"},{"elementName":"collection","typeInfo":"moysklad.collection"},{"elementName":"uuid","typeInfo":"String"},{"elementName":"id","typeInfo":"String"},{"elementName":"error","typeInfo":"moysklad.error"}],"typeInfos":[{"type":"classInfo","localName":"uom","propertyInfos":[{"type":"attribute","name":"type","typeInfo":"String"}],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"predefinedLegendEntity","propertyInfos":[{"type":"attribute","name":"favourite","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"legendEntity","propertyInfos":[{"type":"attribute","name":"name","typeInfo":"String"},{"type":"element","name":"code","typeInfo":"String"},{"type":"element","name":"externalcode","typeInfo":"String"},{"type":"element","name":"description","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"infoEntity","propertyInfos":[{"type":"attribute","name":"updated","typeInfo":"DateTime"},{"type":"attribute","name":"updatedBy","typeInfo":"String"},{"type":"element","name":"deleted","typeInfo":"DateTime"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"entity","propertyInfos":[{"type":"attribute","name":"readMode","typeInfo":"String"},{"type":"attribute","name":"changeMode","typeInfo":"String"},{"type":"element","name":"groupUuid","typeInfo":"String"},{"type":"element","name":"ownerUid","typeInfo":"String"},{"type":"element","name":"shared","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.accountEntity"},{"type":"classInfo","localName":"accountEntity","propertyInfos":[{"type":"element","name":"accountUuid","typeInfo":"String"},{"type":"element","name":"accountId","typeInfo":"String"},{"type":"element","name":"uuid","typeInfo":"String"}]},{"type":"classInfo","localName":"exchangeContainer","propertyInfos":[{"type":"element","name":"commissionReportIn","collection":true,"wrapperElementName":"commissionReportIn","typeInfo":"moysklad.commissionReportIn"},{"type":"element","name":"commissionReportOut","collection":true,"wrapperElementName":"commissionReportOut","typeInfo":"moysklad.commissionReportOut"},{"type":"element","name":"workflow","collection":true,"wrapperElementName":"workflow","typeInfo":"moysklad.workflow"},{"type":"element","name":"customEntityMetadata","collection":true,"wrapperElementName":"customEntityMetadata","typeInfo":"moysklad.customEntityMetadata"},{"type":"element","name":"embeddedEntityMetadata","collection":true,"wrapperElementName":"embeddedEntityMetadata","typeInfo":"moysklad.embeddedEntityMetadata"},{"type":"element","name":"entityTemplatesMetadata","collection":true,"wrapperElementName":"entityTemplatesMetadata","typeInfo":"moysklad.entityTemplatesMetadata"},{"type":"element","name":"reportTemplatesMetadata","collection":true,"wrapperElementName":"reportTemplatesMetadata","typeInfo":"moysklad.reportTemplatesMetadata"},{"type":"element","name":"customEntity","collection":true,"wrapperElementName":"customEntity","typeInfo":"moysklad.customEntity"},{"type":"element","name":"currencies","elementName":"currency","collection":true,"wrapperElementName":"currencies","typeInfo":"moysklad.currency"},{"type":"element","name":"country","collection":true,"wrapperElementName":"country","typeInfo":"moysklad.country"},{"type":"element","name":"gtd","collection":true,"wrapperElementName":"gtd","typeInfo":"moysklad.gtd"},{"type":"element","name":"uoms","elementName":"uom","collection":true,"wrapperElementName":"uoms","typeInfo":"moysklad.uom"},{"type":"element","name":"myCompany","collection":true,"wrapperElementName":"myCompany","typeInfo":"moysklad.myCompany"},{"type":"element","name":"agents","elementName":"agent","collection":true,"wrapperElementName":"agents","typeInfo":"moysklad.agent"},{"type":"element","name":"companies","elementName":"company","collection":true,"wrapperElementName":"companies","typeInfo":"moysklad.company"},{"type":"element","name":"goodFolders","elementName":"goodFolder","collection":true,"wrapperElementName":"goodFolders","typeInfo":"moysklad.goodFolder"},{"type":"element","name":"goods","elementName":"good","collection":true,"wrapperElementName":"goods","typeInfo":"moysklad.good"},{"type":"element","name":"service","collection":true,"wrapperElementName":"service","typeInfo":"moysklad.service"},{"type":"element","name":"things","elementName":"thing","collection":true,"wrapperElementName":"things","typeInfo":"moysklad.thing"},{"type":"element","name":"employees","elementName":"employee","collection":true,"wrapperElementName":"employees","typeInfo":"moysklad.employee"},{"type":"element","name":"warehouses","elementName":"warehouse","collection":true,"wrapperElementName":"warehouses","typeInfo":"moysklad.warehouse"},{"type":"element","name":"project","collection":true,"wrapperElementName":"project","typeInfo":"moysklad.project"},{"type":"element","name":"contract","collection":true,"wrapperElementName":"contract","typeInfo":"moysklad.contract"},{"type":"element","name":"processingPlans","elementName":"processingPlan","collection":true,"wrapperElementName":"processingPlans","typeInfo":"moysklad.processingPlan"},{"type":"element","name":"features","elementName":"feature","collection":true,"wrapperElementName":"features","typeInfo":"moysklad.feature"},{"type":"element","name":"consignments","elementName":"consignment","collection":true,"wrapperElementName":"consignments","typeInfo":"moysklad.consignment"},{"type":"element","name":"priceLists","elementName":"priceList","collection":true,"wrapperElementName":"priceLists","typeInfo":"moysklad.priceList"},{"type":"element","name":"paymentIn","collection":true,"wrapperElementName":"paymentIn","typeInfo":"moysklad.paymentIn"},{"type":"element","name":"paymentOut","collection":true,"wrapperElementName":"paymentOut","typeInfo":"moysklad.paymentOut"},{"type":"element","name":"factureIn","collection":true,"wrapperElementName":"factureIn","typeInfo":"moysklad.factureIn"},{"type":"element","name":"factureOut","collection":true,"wrapperElementName":"factureOut","typeInfo":"moysklad.factureOut"},{"type":"element","name":"cashIn","collection":true,"wrapperElementName":"cashIn","typeInfo":"moysklad.cashIn"},{"type":"element","name":"cashOut","collection":true,"wrapperElementName":"cashOut","typeInfo":"moysklad.cashOut"},{"type":"element","name":"deliveries-demand","elementName":"demand","collection":true,"wrapperElementName":"deliveries-demand","typeInfo":"moysklad.demand"},{"type":"element","name":"deliveries-supply","elementName":"supply","collection":true,"wrapperElementName":"deliveries-supply","typeInfo":"moysklad.supply"},{"type":"element","name":"retailCashIn","collection":true,"wrapperElementName":"retailCashIn","typeInfo":"moysklad.retailCashIn"},{"type":"element","name":"retailCashOut","collection":true,"wrapperElementName":"retailCashOut","typeInfo":"moysklad.retailCashOut"},{"type":"element","name":"retailDemand","collection":true,"wrapperElementName":"retailDemand","typeInfo":"moysklad.retailDemand"},{"type":"element","name":"retailSalesReturn","collection":true,"wrapperElementName":"retailSalesReturn","typeInfo":"moysklad.retailSalesReturn"},{"type":"element","name":"inventories","elementName":"inventory","collection":true,"wrapperElementName":"inventories","typeInfo":"moysklad.inventory"},{"type":"element","name":"moves","elementName":"move","collection":true,"wrapperElementName":"moves","typeInfo":"moysklad.move"},{"type":"element","name":"losses","elementName":"loss","collection":true,"wrapperElementName":"losses","typeInfo":"moysklad.loss"},{"type":"element","name":"enters","elementName":"enter","collection":true,"wrapperElementName":"enters","typeInfo":"moysklad.enter"},{"type":"element","name":"invoicesIn","elementName":"invoiceIn","collection":true,"wrapperElementName":"invoicesIn","typeInfo":"moysklad.invoiceIn"},{"type":"element","name":"invoicesOut","elementName":"invoiceOut","collection":true,"wrapperElementName":"invoicesOut","typeInfo":"moysklad.invoiceOut"},{"type":"element","name":"salesReturns","elementName":"salesReturn","collection":true,"wrapperElementName":"salesReturns","typeInfo":"moysklad.salesReturn"},{"type":"element","name":"purchaseReturns","elementName":"purchaseReturn","collection":true,"wrapperElementName":"purchaseReturns","typeInfo":"moysklad.purchaseReturn"},{"type":"element","name":"processings","elementName":"processing","collection":true,"wrapperElementName":"processings","typeInfo":"moysklad.processing"},{"type":"element","name":"customerOrders","elementName":"customerOrder","collection":true,"wrapperElementName":"customerOrders","typeInfo":"moysklad.customerOrder"},{"type":"element","name":"purchaseOrders","elementName":"purchaseOrder","collection":true,"wrapperElementName":"purchaseOrders","typeInfo":"moysklad.purchaseOrder"},{"type":"element","name":"internalOrders","elementName":"internalOrder","collection":true,"wrapperElementName":"internalOrders","typeInfo":"moysklad.internalOrder"},{"type":"element","name":"proccessingOrders","elementName":"processingOrder","collection":true,"wrapperElementName":"proccessingOrders","typeInfo":"moysklad.processingOrder"},{"type":"element","name":"amiroConnectors","elementName":"amiroConnectorSettings","collection":true,"wrapperElementName":"amiroConnectors","typeInfo":"moysklad.amiroConnectorSettings"},{"type":"element","name":"cmlConnectors","elementName":"cmlConnectorSettings","collection":true,"wrapperElementName":"cmlConnectors","typeInfo":"moysklad.cmlConnectorSettings"},{"type":"element","name":"ymlConnectors","elementName":"ymlConnectorSettings","collection":true,"wrapperElementName":"ymlConnectors","typeInfo":"moysklad.ymlConnectorSettings"}]},{"type":"classInfo","localName":"commissionReportIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"commissionReportInPositions","collection":true,"typeInfo":"moysklad.commissionReportInPosition"}],"baseTypeInfo":"moysklad.commissionReport"},{"type":"classInfo","localName":"commissionReport","propertyInfos":[{"type":"attribute","name":"endCommissionPeriod","typeInfo":"DateTime"},{"type":"attribute","name":"rewardPercent","typeInfo":"Double"},{"type":"attribute","name":"rewardType","typeInfo":"String"},{"type":"attribute","name":"startCommissionPeriod","typeInfo":"DateTime"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"operationWithPositions","propertyInfos":[],"baseTypeInfo":"moysklad.operation"},{"type":"classInfo","localName":"operation","propertyInfos":[{"type":"attribute","name":"stateUuid","typeInfo":"String"},{"type":"attribute","name":"targetAgentUuid","typeInfo":"String"},{"type":"attribute","name":"sourceAgentUuid","typeInfo":"String"},{"type":"attribute","name":"targetStoreUuid","typeInfo":"String"},{"type":"attribute","name":"sourceStoreUuid","typeInfo":"String"},{"type":"attribute","name":"applicable","typeInfo":"Boolean"},{"type":"attribute","name":"projectUuid","typeInfo":"String"},{"type":"attribute","name":"contractUuid","typeInfo":"String"},{"type":"attribute","name":"retailShiftUuid","typeInfo":"String"},{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"attribute","name":"targetAccountUuid","typeInfo":"String"},{"type":"attribute","name":"sourceAccountUuid","typeInfo":"String"},{"type":"attribute","name":"payerVat","typeInfo":"Boolean"},{"type":"attribute","name":"retailStoreUuid","typeInfo":"String"},{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"rate","typeInfo":"Double"},{"type":"attribute","name":"vatIncluded","typeInfo":"Boolean"},{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"attribute","name":"createdBy","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.operationAttributeValue"},{"type":"element","name":"document","collection":true,"typeInfo":"moysklad.operationDocument"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"financeIn","propertyInfos":[{"type":"attribute","name":"commissionReportUuid","typeInfo":"String"},{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"attribute","name":"factureOutUuid","typeInfo":"String"},{"type":"attribute","name":"invoiceOutUuid","typeInfo":"String"},{"type":"attribute","name":"purchaseReturnUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.finance"},{"type":"classInfo","localName":"finance","propertyInfos":[{"type":"attribute","name":"expenseItemUuid","typeInfo":"String"},{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"paymentPurpose","typeInfo":"String"},{"type":"attribute","name":"vatSum","typeInfo":"Double"}],"baseTypeInfo":"moysklad.operation"},{"type":"classInfo","localName":"customerOrder","propertyInfos":[{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"invoicesOutUuid","elementName":"invoiceOutRef","collection":true,"wrapperElementName":"invoicesOutUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"customerOrderPosition","collection":true,"typeInfo":"moysklad.customerOrderPosition"},{"type":"element","name":"purchaseOrdersUuid","elementName":"purchaseOrderRef","collection":true,"wrapperElementName":"purchaseOrdersUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"order","propertyInfos":[{"type":"attribute","name":"deliveryPlannedMoment","typeInfo":"DateTime"},{"type":"attribute","name":"reservedSum","typeInfo":"Double"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"abstractDemand","propertyInfos":[{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"attribute","name":"factureUuid","typeInfo":"String"},{"type":"element","name":"invoicesOutUuid","elementName":"invoiceOutRef","collection":true,"wrapperElementName":"invoicesOutUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"shipmentOut","collection":true,"typeInfo":"moysklad.shipmentOut"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"comingOutOperation","propertyInfos":[],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"stockOperation","propertyInfos":[],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"factureOut","propertyInfos":[{"type":"attribute","name":"paymentDate","typeInfo":"DateTime"},{"type":"attribute","name":"paymentNumber","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"extension","typeInfo":"moysklad.factureOutExtension"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"returnsUuid","elementName":"returnRef","collection":true,"wrapperElementName":"returnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.facture"},{"type":"classInfo","localName":"facture","propertyInfos":[],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"factureOutExtension","propertyInfos":[],"baseTypeInfo":"moysklad.operationExtension"},{"type":"classInfo","localName":"operationExtension","propertyInfos":[{"type":"attribute","name":"consigneeUuid","typeInfo":"String"}]},{"type":"classInfo","localName":"company","propertyInfos":[{"type":"attribute","name":"director","typeInfo":"String"},{"type":"attribute","name":"chiefAccountant","typeInfo":"String"},{"type":"attribute","name":"payerVat","typeInfo":"Boolean"},{"type":"attribute","name":"companyType","typeInfo":"String"},{"type":"element","name":"sign","typeInfo":"moysklad.agentPictureDocument"},{"type":"element","name":"stamp","typeInfo":"moysklad.agentPictureDocument"}],"baseTypeInfo":"moysklad.agent"},{"type":"classInfo","localName":"agent","propertyInfos":[{"type":"attribute","name":"discount","typeInfo":"Double"},{"type":"attribute","name":"autoDiscount","typeInfo":"Double"},{"type":"attribute","name":"discountCardNumber","typeInfo":"String"},{"type":"attribute","name":"discountCorrection","typeInfo":"Double"},{"type":"attribute","name":"stateUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.agentAttributeValue"},{"type":"element","name":"requisite","typeInfo":"moysklad.requisite"},{"type":"element","name":"bankAccount","collection":true,"typeInfo":"moysklad.agentAccount"},{"type":"element","name":"contact","typeInfo":"moysklad.contact"},{"type":"element","name":"contactPerson","collection":true,"typeInfo":"moysklad.contactPerson"},{"type":"element","name":"agentNewsItem","collection":true,"typeInfo":"moysklad.agentNewsItem"},{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentPictureDocument","propertyInfos":[],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"attachableDocument","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"document","propertyInfos":[{"type":"attribute","name":"created","typeInfo":"DateTime"},{"type":"attribute","name":"filename","typeInfo":"String"},{"type":"attribute","name":"miniatureUuid","typeInfo":"String"},{"type":"element","name":"contents","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"documentMiniature","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"agentAttributeValue","propertyInfos":[{"type":"attribute","name":"agentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"attributeValue","propertyInfos":[{"type":"attribute","name":"metadataUuid","typeInfo":"String"},{"type":"attribute","name":"valueText","typeInfo":"String"},{"type":"attribute","name":"valueString","typeInfo":"String"},{"type":"attribute","name":"doubleValue","typeInfo":"Double"},{"type":"attribute","name":"longValue","typeInfo":"Long"},{"type":"attribute","name":"booleanValue","typeInfo":"Boolean"},{"type":"attribute","name":"timeValue","typeInfo":"DateTime"},{"type":"attribute","name":"entityValueUuid","typeInfo":"String"},{"type":"attribute","name":"agentValueUuid","typeInfo":"String"},{"type":"attribute","name":"goodValueUuid","typeInfo":"String"},{"type":"attribute","name":"placeValueUuid","typeInfo":"String"},{"type":"attribute","name":"consignmentValueUuid","typeInfo":"String"},{"type":"attribute","name":"contractValueUuid","typeInfo":"String"},{"type":"attribute","name":"projectValueUuid","typeInfo":"String"},{"type":"attribute","name":"employeeValueUuid","typeInfo":"String"},{"type":"element","name":"file","typeInfo":"moysklad.attachmentDocument"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"attributeMetadata","propertyInfos":[{"type":"attribute","name":"attrType","typeInfo":"String"},{"type":"attribute","name":"dictionaryMetadataUuid","typeInfo":"String"},{"type":"attribute","name":"entityMetadataUuid","typeInfo":"String"},{"type":"attribute","name":"feature","typeInfo":"Boolean"},{"type":"attribute","name":"position","typeInfo":"Int"},{"type":"attribute","name":"required","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"entityMetadata","propertyInfos":[{"type":"attribute","name":"uniqueCode","typeInfo":"Boolean"},{"type":"attribute","name":"codeValueType","typeInfo":"Int"},{"type":"attribute","name":"independentNameGenerator","typeInfo":"Boolean"},{"type":"attribute","name":"partialReserve","typeInfo":"Boolean"},{"type":"attribute","name":"noEditFromOtherPlaceSource","typeInfo":"Boolean"},{"type":"attribute","name":"noApplicableFromOtherPlaceSource","typeInfo":"Boolean"},{"type":"attribute","name":"noEditFromOtherPlaceTarget","typeInfo":"Boolean"},{"type":"attribute","name":"noApplicableFromOtherPlaceTarget","typeInfo":"Boolean"},{"type":"attribute","name":"editablePeriod","typeInfo":"String"},{"type":"attribute","name":"editableCalendarDays","typeInfo":"Int"},{"type":"attribute","name":"editableWorkDays","typeInfo":"Int"},{"type":"attribute","name":"editableFromDate","typeInfo":"DateTime"},{"type":"element","name":"attributeMetadata","collection":true,"typeInfo":"moysklad.attributeMetadata"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"customEntity","propertyInfos":[{"type":"attribute","name":"entityMetadataUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.customEntityAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"customEntityMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.entityMetadata"},{"type":"classInfo","localName":"customEntityAttributeValue","propertyInfos":[{"type":"attribute","name":"customEntityUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"attachmentDocument","propertyInfos":[],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"goodFolder","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"parentUuid","typeInfo":"String"},{"type":"attribute","name":"productCode","typeInfo":"String"},{"type":"attribute","name":"vat","typeInfo":"Long"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.goodAttributeValue"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"classifier","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"goodAttributeValue","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"warehouse","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"parentUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.placeAttributeValue"},{"type":"element","name":"contact","typeInfo":"moysklad.contact"},{"type":"element","name":"slots","elementName":"slot","collection":true,"wrapperElementName":"slots","typeInfo":"moysklad.slot"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"placeAttributeValue","propertyInfos":[{"type":"attribute","name":"placeUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"contact","propertyInfos":[{"type":"attribute","name":"address","typeInfo":"String"},{"type":"attribute","name":"phones","typeInfo":"String"},{"type":"attribute","name":"faxes","typeInfo":"String"},{"type":"attribute","name":"mobiles","typeInfo":"String"},{"type":"attribute","name":"email","typeInfo":"String"}]},{"type":"classInfo","localName":"slot","propertyInfos":[{"type":"attribute","name":"warehouseUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"consignment","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"isDefault","typeInfo":"Boolean"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.barcode"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.consignmentAttributeValue"},{"type":"element","name":"feature","typeInfo":"moysklad.feature"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"barcode","propertyInfos":[{"type":"attribute","name":"barcode","typeInfo":"String"},{"type":"attribute","name":"barcodeType","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"consignmentAttributeValue","propertyInfos":[{"type":"attribute","name":"consignmentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"feature","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"isDefault","typeInfo":"Boolean"},{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.featureAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"featureAttributeValue","propertyInfos":[],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"abstractGood","propertyInfos":[{"type":"attribute","name":"minPrice","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"},{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"supplierUuid","typeInfo":"String"},{"type":"attribute","name":"salePrice","typeInfo":"Double"},{"type":"attribute","name":"saleCurrencyUuid","typeInfo":"String"},{"type":"attribute","name":"buyCurrencyUuid","typeInfo":"String"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.barcode"},{"type":"element","name":"salePrices","elementName":"price","collection":true,"wrapperElementName":"salePrices","typeInfo":"moysklad.price"}],"baseTypeInfo":"moysklad.goodFolder"},{"type":"classInfo","localName":"country","propertyInfos":[],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"currency","propertyInfos":[{"type":"attribute","name":"enteredRate","typeInfo":"Double"},{"type":"attribute","name":"invertRate","typeInfo":"Boolean"},{"type":"attribute","name":"rate","typeInfo":"Double"},{"type":"element","name":"major","typeInfo":"moysklad.unit"},{"type":"element","name":"minor","typeInfo":"moysklad.unit"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"unit","propertyInfos":[{"type":"attribute","name":"s1","typeInfo":"String"},{"type":"attribute","name":"s24","typeInfo":"String"},{"type":"attribute","name":"s5","typeInfo":"String"},{"type":"attribute","name":"sex","typeInfo":"UnsignedShort"}]},{"type":"classInfo","localName":"prices","propertyInfos":[{"type":"element","name":"price","collection":true,"typeInfo":"moysklad.price"}]},{"type":"classInfo","localName":"price","propertyInfos":[{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"value","typeInfo":"Double"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"priceType","propertyInfos":[{"type":"attribute","name":"index","typeInfo":"Int"},{"type":"attribute","name":"name","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"contract","propertyInfos":[{"type":"attribute","name":"agentUuid","typeInfo":"String"},{"type":"attribute","name":"agentAccountUuid","typeInfo":"String"},{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"contractType","typeInfo":"String"},{"type":"attribute","name":"currencyUuid","typeInfo":"String"},{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"attribute","name":"ownCompanyUuid","typeInfo":"String"},{"type":"attribute","name":"ownCompanyAccountUuid","typeInfo":"String"},{"type":"attribute","name":"rewardPercent","typeInfo":"Double"},{"type":"attribute","name":"rewardType","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.contractAttributeValue"},{"type":"element","name":"document","collection":true,"typeInfo":"moysklad.contractDocument"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentAccount","propertyInfos":[{"type":"attribute","name":"accountNumber","typeInfo":"String"},{"type":"attribute","name":"bankLocation","typeInfo":"String"},{"type":"attribute","name":"bankName","typeInfo":"String"},{"type":"attribute","name":"bic","typeInfo":"String"},{"type":"attribute","name":"correspondentAccount","typeInfo":"String"},{"type":"attribute","name":"isDefault","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"contractAttributeValue","propertyInfos":[{"type":"attribute","name":"contractUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"contractDocument","propertyInfos":[{"type":"attribute","name":"contractUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.printedDocument"},{"type":"classInfo","localName":"printedDocument","propertyInfos":[{"type":"attribute","name":"emailedDate","typeInfo":"DateTime"},{"type":"attribute","name":"publicId","typeInfo":"String"}],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"moneyAmount","propertyInfos":[{"type":"attribute","name":"sum","typeInfo":"Double"},{"type":"attribute","name":"sumInCurrency","typeInfo":"Double"}]},{"type":"classInfo","localName":"project","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.projectAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"projectAttributeValue","propertyInfos":[{"type":"attribute","name":"projectUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"employee","propertyInfos":[{"type":"attribute","name":"archived","typeInfo":"Boolean"},{"type":"attribute","name":"city","typeInfo":"String"},{"type":"attribute","name":"email","typeInfo":"String"},{"type":"attribute","name":"fax","typeInfo":"String"},{"type":"attribute","name":"firstName","typeInfo":"String"},{"type":"attribute","name":"icqNumber","typeInfo":"String"},{"type":"attribute","name":"lastName","typeInfo":"String"},{"type":"attribute","name":"middleName","typeInfo":"String"},{"type":"attribute","name":"mobile","typeInfo":"String"},{"type":"attribute","name":"phone","typeInfo":"String"},{"type":"attribute","name":"postalAddress","typeInfo":"String"},{"type":"attribute","name":"postalCode","typeInfo":"String"},{"type":"attribute","name":"pzInternalNumber","typeInfo":"String"},{"type":"attribute","name":"skypeName","typeInfo":"String"},{"type":"attribute","name":"uid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.employeeAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"employeeAttributeValue","propertyInfos":[{"type":"attribute","name":"employeeUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"requisite","propertyInfos":[{"type":"element","name":"bankAccount","typeInfo":"moysklad.agentAccount"},{"type":"attribute","name":"legalTitle","typeInfo":"String"},{"type":"attribute","name":"legalAddress","typeInfo":"String"},{"type":"attribute","name":"actualAddress","typeInfo":"String"},{"type":"attribute","name":"inn","typeInfo":"String"},{"type":"attribute","name":"kpp","typeInfo":"String"},{"type":"attribute","name":"okpo","typeInfo":"String"},{"type":"attribute","name":"ogrn","typeInfo":"String"},{"type":"attribute","name":"ogrnip","typeInfo":"String"},{"type":"attribute","name":"nomerSvidetelstva","typeInfo":"String"},{"type":"attribute","name":"dataSvidetelstva","typeInfo":"DateTime"}]},{"type":"classInfo","localName":"contactPerson","propertyInfos":[{"type":"attribute","name":"email","typeInfo":"String"},{"type":"attribute","name":"phone","typeInfo":"String"},{"type":"attribute","name":"position","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"agentNewsItem","propertyInfos":[{"type":"attribute","name":"moment","typeInfo":"DateTime"},{"type":"element","name":"text","typeInfo":"String"}],"baseTypeInfo":"moysklad.infoEntity"},{"type":"classInfo","localName":"state","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"purchaseReturn","propertyInfos":[{"type":"attribute","name":"factureUuid","typeInfo":"String"},{"type":"attribute","name":"supplyUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"purchaseReturnPosition","collection":true,"typeInfo":"moysklad.purchaseReturnPosition"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"purchaseReturnPosition","propertyInfos":[],"baseTypeInfo":"moysklad.abstractShipmentOut"},{"type":"classInfo","localName":"abstractShipmentOut","propertyInfos":[],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"comingOut","propertyInfos":[],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"stockMotion","propertyInfos":[{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"gtdUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"motion","propertyInfos":[{"type":"attribute","name":"discount","typeInfo":"Double"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"attribute","name":"goodPackUuid","typeInfo":"String"},{"type":"attribute","name":"consignmentUuid","typeInfo":"String"},{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"slotUuid","typeInfo":"String"},{"type":"attribute","name":"vat","typeInfo":"Long"},{"type":"element","name":"basePrice","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"price","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"things","elementName":"thingRef","collection":true,"wrapperElementName":"things","typeInfo":"moysklad.thing"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"gtd","propertyInfos":[],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"thing","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"element","name":"attribute","collection":true,"typeInfo":"moysklad.thingAttributeValue"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"thingAttributeValue","propertyInfos":[{"type":"attribute","name":"thingUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"goodPack","propertyInfos":[{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"supply","propertyInfos":[{"type":"attribute","name":"factureInUuid","typeInfo":"String"},{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"overheadDistribution","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"element","name":"invoicesInUuid","elementName":"invoiceInRef","collection":true,"wrapperElementName":"invoicesInUuid","typeInfo":"String"},{"type":"element","name":"overhead","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"shipmentIn","collection":true,"typeInfo":"moysklad.shipmentIn"},{"type":"element","name":"purchaseReturnsUuid","elementName":"purchaseReturnRef","collection":true,"wrapperElementName":"purchaseReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"comingInOperation","propertyInfos":[],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"factureIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.facture"},{"type":"classInfo","localName":"financeOut","propertyInfos":[{"type":"attribute","name":"commissionreportoutUuid","typeInfo":"String"},{"type":"attribute","name":"factureInUuid","typeInfo":"String"},{"type":"attribute","name":"invoiceInUuid","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"attribute","name":"salesReturnUuid","typeInfo":"String"},{"type":"attribute","name":"supplyUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.finance"},{"type":"classInfo","localName":"commissionReportOut","propertyInfos":[{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"commissionReportOutPositions","collection":true,"typeInfo":"moysklad.commissionReportOutPosition"}],"baseTypeInfo":"moysklad.commissionReport"},{"type":"classInfo","localName":"commissionReportOutPosition","propertyInfos":[],"baseTypeInfo":"moysklad.commissionReportPosition"},{"type":"classInfo","localName":"commissionReportPosition","propertyInfos":[{"type":"element","name":"reward","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"operationAttributeValue","propertyInfos":[{"type":"attribute","name":"operationUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attributeValue"},{"type":"classInfo","localName":"operationDocument","propertyInfos":[{"type":"attribute","name":"operationUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.printedDocument"},{"type":"classInfo","localName":"retailShift","propertyInfos":[{"type":"attribute","name":"closeDate","typeInfo":"DateTime"}],"baseTypeInfo":"moysklad.operation"},{"type":"classInfo","localName":"retailStore","propertyInfos":[{"type":"attribute","name":"acquireUuid","typeInfo":"String"},{"type":"attribute","name":"acquireAccountUuid","typeInfo":"String"},{"type":"attribute","name":"active","typeInfo":"Boolean"},{"type":"attribute","name":"address","typeInfo":"String"},{"type":"attribute","name":"controlCashierChoice","typeInfo":"Boolean"},{"type":"attribute","name":"controlShippingStock","typeInfo":"Boolean"},{"type":"attribute","name":"demandPrefix","typeInfo":"String"},{"type":"attribute","name":"enableDiscount","typeInfo":"Boolean"},{"type":"attribute","name":"maxDiscount","typeInfo":"Double"},{"type":"attribute","name":"myCompanyUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"warehouseUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"myCompany","propertyInfos":[],"baseTypeInfo":"moysklad.company"},{"type":"classInfo","localName":"invoiceIn","propertyInfos":[{"type":"attribute","name":"incomingDate","typeInfo":"DateTime"},{"type":"attribute","name":"incomingNumber","typeInfo":"String"},{"type":"attribute","name":"purchaseOrderUuid","typeInfo":"String"},{"type":"element","name":"financesOutUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"financesOutUuid","typeInfo":"String"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.invoice"},{"type":"classInfo","localName":"invoice","propertyInfos":[{"type":"attribute","name":"paymentPlannedMoment","typeInfo":"DateTime"},{"type":"element","name":"invoicePosition","collection":true,"typeInfo":"moysklad.invoicePosition"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"purchaseOrder","propertyInfos":[{"type":"element","name":"customerOrdersUuid","elementName":"customerOrderRef","collection":true,"wrapperElementName":"customerOrdersUuid","typeInfo":"String"},{"type":"element","name":"internalOrders","elementName":"internalOrderRef","collection":true,"wrapperElementName":"internalOrders","typeInfo":"moysklad.internalOrder"},{"type":"element","name":"invoicesUuid","elementName":"invoiceInRef","collection":true,"wrapperElementName":"invoicesUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.purchaseOrderPosition"},{"type":"element","name":"suppliesUuid","elementName":"supplyRef","collection":true,"wrapperElementName":"suppliesUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"internalOrder","propertyInfos":[{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.purchaseOrderPosition"},{"type":"element","name":"purchaseOrdersUuid","elementName":"purchaseOrderRef","collection":true,"wrapperElementName":"purchaseOrdersUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"moveRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"purchaseOrderPosition","propertyInfos":[],"baseTypeInfo":"moysklad.orderPosition"},{"type":"classInfo","localName":"orderPosition","propertyInfos":[{"type":"element","name":"reserve","typeInfo":"Double"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"move","propertyInfos":[{"type":"attribute","name":"internalOrderUuid","typeInfo":"String"},{"type":"element","name":"movePosition","collection":true,"typeInfo":"moysklad.movePosition"}],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"movePosition","propertyInfos":[{"type":"attribute","name":"sourceSlotUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"invoicePosition","propertyInfos":[],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"abstractSalesReturn","propertyInfos":[{"type":"element","name":"lossesUuid","elementName":"lossRef","collection":true,"wrapperElementName":"lossesUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeOutRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"},{"type":"element","name":"salesReturnPosition","collection":true,"typeInfo":"moysklad.salesReturnPosition"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"loss","propertyInfos":[{"type":"attribute","name":"expenseItemUuid","typeInfo":"String"},{"type":"attribute","name":"inventoryUuid","typeInfo":"String"},{"type":"attribute","name":"salesReturnUuid","typeInfo":"String"},{"type":"element","name":"lossPosition","collection":true,"typeInfo":"moysklad.lossPosition"}],"baseTypeInfo":"moysklad.comingOutOperation"},{"type":"classInfo","localName":"expenseItem","propertyInfos":[],"baseTypeInfo":"moysklad.predefinedLegendEntity"},{"type":"classInfo","localName":"inventory","propertyInfos":[{"type":"element","name":"entersUuid","elementName":"enterRef","collection":true,"wrapperElementName":"entersUuid","typeInfo":"String"},{"type":"element","name":"lossesUuid","elementName":"lossRef","collection":true,"wrapperElementName":"lossesUuid","typeInfo":"String"},{"type":"element","name":"inventoryPosition","collection":true,"typeInfo":"moysklad.inventoryPosition"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"enter","propertyInfos":[{"type":"attribute","name":"inventoryUuid","typeInfo":"String"},{"type":"element","name":"enterPosition","collection":true,"typeInfo":"moysklad.enterPosition"}],"baseTypeInfo":"moysklad.comingInOperation"},{"type":"classInfo","localName":"enterPosition","propertyInfos":[{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"comingIn","propertyInfos":[],"baseTypeInfo":"moysklad.stockMotion"},{"type":"classInfo","localName":"inventoryPosition","propertyInfos":[{"type":"attribute","name":"correctionAmount","typeInfo":"Double"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"lossPosition","propertyInfos":[{"type":"element","name":"tags","elementName":"tag","collection":true,"wrapperElementName":"tags","typeInfo":"String"}],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"salesReturnPosition","propertyInfos":[],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"shipmentIn","propertyInfos":[{"type":"attribute","name":"overhead","typeInfo":"Double"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"invoiceOut","propertyInfos":[{"type":"attribute","name":"customerOrderUuid","typeInfo":"String"},{"type":"element","name":"demandsUuid","elementName":"demandRef","collection":true,"wrapperElementName":"demandsUuid","typeInfo":"String"},{"type":"element","name":"paymentsUuid","elementName":"financeInRef","collection":true,"wrapperElementName":"paymentsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.invoice"},{"type":"classInfo","localName":"shipmentOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractShipmentOut"},{"type":"classInfo","localName":"customerOrderPosition","propertyInfos":[],"baseTypeInfo":"moysklad.orderPosition"},{"type":"classInfo","localName":"commissionReportInPosition","propertyInfos":[],"baseTypeInfo":"moysklad.commissionReportPosition"},{"type":"classInfo","localName":"workflow","propertyInfos":[{"type":"element","name":"state","collection":true,"typeInfo":"moysklad.state"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"embeddedEntityMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.entityMetadata"},{"type":"classInfo","localName":"entityTemplatesMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.templatesMetadata"},{"type":"classInfo","localName":"templatesMetadata","propertyInfos":[{"type":"element","name":"template","collection":true,"typeInfo":"moysklad.template"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"template","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"reportTemplatesMetadata","propertyInfos":[],"baseTypeInfo":"moysklad.templatesMetadata"},{"type":"classInfo","localName":"good","propertyInfos":[{"type":"attribute","name":"isSerialTrackable","typeInfo":"Boolean"},{"type":"attribute","name":"minimumBalance","typeInfo":"Double"},{"type":"attribute","name":"weight","typeInfo":"Double"},{"type":"attribute","name":"volume","typeInfo":"Double"},{"type":"element","name":"pack","collection":true,"typeInfo":"moysklad.goodPack"},{"type":"element","name":"preferences","elementName":"preference","collection":true,"wrapperElementName":"preferences","typeInfo":"moysklad.goodSlotPreference"},{"type":"element","name":"images","elementName":"image","collection":true,"wrapperElementName":"images","typeInfo":"moysklad.goodImage"}],"baseTypeInfo":"moysklad.abstractGood"},{"type":"classInfo","localName":"goodSlotPreference","propertyInfos":[{"type":"attribute","name":"slotUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"goodImage","propertyInfos":[{"type":"attribute","name":"tinyUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.attachableDocument"},{"type":"classInfo","localName":"tinyImage","propertyInfos":[],"baseTypeInfo":"moysklad.document"},{"type":"classInfo","localName":"service","propertyInfos":[],"baseTypeInfo":"moysklad.abstractGood"},{"type":"classInfo","localName":"processingPlan","propertyInfos":[{"type":"element","name":"material","collection":true,"typeInfo":"moysklad.material"},{"type":"element","name":"price","typeInfo":"moysklad.moneyAmount"},{"type":"element","name":"product","collection":true,"typeInfo":"moysklad.product"}],"baseTypeInfo":"moysklad.processingPlanFolder"},{"type":"classInfo","localName":"processingPlanFolder","propertyInfos":[{"type":"attribute","name":"parentUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.classifier"},{"type":"classInfo","localName":"material","propertyInfos":[{"type":"attribute","name":"isOptional","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.processingPlanItem"},{"type":"classInfo","localName":"processingPlanItem","propertyInfos":[{"type":"attribute","name":"goodUuid","typeInfo":"String"},{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"quantity","typeInfo":"Double"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"product","propertyInfos":[],"baseTypeInfo":"moysklad.processingPlanItem"},{"type":"classInfo","localName":"priceList","propertyInfos":[{"type":"element","name":"metadata","typeInfo":"moysklad.priceListMetadata"},{"type":"element","name":"priceListRow","collection":true,"typeInfo":"moysklad.priceListRow"}],"baseTypeInfo":"moysklad.operationWithPositions"},{"type":"classInfo","localName":"priceListMetadata","propertyInfos":[{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"element","name":"column","collection":true,"typeInfo":"moysklad.priceListMetadataColumn"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"priceListMetadataColumn","propertyInfos":[{"type":"attribute","name":"percentageDiscount","typeInfo":"Int"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"priceListRow","propertyInfos":[{"type":"element","name":"cell","collection":true,"typeInfo":"moysklad.priceListCell"}],"baseTypeInfo":"moysklad.motion"},{"type":"classInfo","localName":"priceListCell","propertyInfos":[{"type":"attribute","name":"columnName","typeInfo":"String"},{"type":"element","name":"sum","typeInfo":"moysklad.moneyAmount"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"paymentIn","propertyInfos":[],"baseTypeInfo":"moysklad.financeIn"},{"type":"classInfo","localName":"paymentOut","propertyInfos":[],"baseTypeInfo":"moysklad.financeOut"},{"type":"classInfo","localName":"cashIn","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashIn"},{"type":"classInfo","localName":"abstractCashIn","propertyInfos":[],"baseTypeInfo":"moysklad.financeIn"},{"type":"classInfo","localName":"cashOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashOut"},{"type":"classInfo","localName":"abstractCashOut","propertyInfos":[],"baseTypeInfo":"moysklad.financeOut"},{"type":"classInfo","localName":"demand","propertyInfos":[{"type":"element","name":"extension","typeInfo":"moysklad.demandExtension"},{"type":"element","name":"salesReturnsUuid","elementName":"salesReturnRef","collection":true,"wrapperElementName":"salesReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractDemand"},{"type":"classInfo","localName":"demandExtension","propertyInfos":[{"type":"attribute","name":"opened","typeInfo":"Boolean"},{"type":"attribute","name":"carrierUuid","typeInfo":"String"},{"type":"attribute","name":"loadName","typeInfo":"String"},{"type":"attribute","name":"consignorIndication","typeInfo":"String"},{"type":"attribute","name":"transportFacility","typeInfo":"String"},{"type":"attribute","name":"goodPackQuantity","typeInfo":"Int"},{"type":"attribute","name":"carNumber","typeInfo":"String"}],"baseTypeInfo":"moysklad.operationExtension"},{"type":"classInfo","localName":"salesReturn","propertyInfos":[{"type":"attribute","name":"demandUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractSalesReturn"},{"type":"classInfo","localName":"retailCashIn","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashIn"},{"type":"classInfo","localName":"retailCashOut","propertyInfos":[],"baseTypeInfo":"moysklad.abstractCashOut"},{"type":"classInfo","localName":"retailDemand","propertyInfos":[{"type":"attribute","name":"nonCash","typeInfo":"Boolean"},{"type":"element","name":"salesReturnsUuid","elementName":"salesReturnRef","collection":true,"wrapperElementName":"salesReturnsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractDemand"},{"type":"classInfo","localName":"retailSalesReturn","propertyInfos":[{"type":"attribute","name":"demandUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.abstractSalesReturn"},{"type":"classInfo","localName":"processing","propertyInfos":[{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"processingOrderUuid","typeInfo":"String"},{"type":"attribute","name":"processingSum","typeInfo":"Double"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"element","name":"material","collection":true,"typeInfo":"moysklad.processingPositionMaterial"},{"type":"element","name":"results","elementName":"result","collection":true,"wrapperElementName":"results","typeInfo":"moysklad.processingPositionResult"}],"baseTypeInfo":"moysklad.stockOperation"},{"type":"classInfo","localName":"processingPositionMaterial","propertyInfos":[],"baseTypeInfo":"moysklad.comingOut"},{"type":"classInfo","localName":"processingOrder","propertyInfos":[{"type":"attribute","name":"planUuid","typeInfo":"String"},{"type":"attribute","name":"quantity","typeInfo":"Double"},{"type":"element","name":"purchaseOrderPosition","collection":true,"typeInfo":"moysklad.customerOrderPosition"},{"type":"element","name":"processings","elementName":"processingRef","collection":true,"wrapperElementName":"processings","typeInfo":"moysklad.processing"}],"baseTypeInfo":"moysklad.order"},{"type":"classInfo","localName":"processingPositionResult","propertyInfos":[{"type":"attribute","name":"costShare","typeInfo":"Double"}],"baseTypeInfo":"moysklad.comingIn"},{"type":"classInfo","localName":"amiroConnectorSettings","propertyInfos":[{"type":"attribute","name":"commentsColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerAddressColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerCodeColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerEmailColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerFirstNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerLastNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerNickColumnNum","typeInfo":"Int"},{"type":"attribute","name":"customerPhoneColumnNum","typeInfo":"Int"},{"type":"attribute","name":"goodIdColumnNum","typeInfo":"Int"},{"type":"attribute","name":"goodNameColumnNum","typeInfo":"Int"},{"type":"attribute","name":"orderDateColumnNum","typeInfo":"Int"},{"type":"attribute","name":"orderIdColumnNum","typeInfo":"Int"},{"type":"attribute","name":"prefixForAgent","typeInfo":"Boolean"},{"type":"attribute","name":"prefixForGood","typeInfo":"Boolean"},{"type":"attribute","name":"prefixForOperation","typeInfo":"Boolean"},{"type":"attribute","name":"priceColumnNum","typeInfo":"Int"},{"type":"attribute","name":"quantityColumnNum","typeInfo":"Int"},{"type":"attribute","name":"shippingAmountColumnNum","typeInfo":"Int"},{"type":"attribute","name":"stateColumnNum","typeInfo":"Int"},{"type":"attribute","name":"taxColumnNum","typeInfo":"Int"},{"type":"element","name":"customAttribute","collection":true,"typeInfo":"moysklad.amiroCustomAttributeInfo"}],"baseTypeInfo":"moysklad.operationConnectorSetting"},{"type":"classInfo","localName":"operationConnectorSetting","propertyInfos":[{"type":"attribute","name":"adminDomain","typeInfo":"String"},{"type":"attribute","name":"autoReserve","typeInfo":"Boolean"},{"type":"attribute","name":"orderplaceUuid","typeInfo":"String"},{"type":"attribute","name":"shopDomain","typeInfo":"String"},{"type":"attribute","name":"syncFeatures","typeInfo":"Boolean"},{"type":"attribute","name":"useShopOperationName","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.abstractConnectorSetting"},{"type":"classInfo","localName":"abstractConnectorSetting","propertyInfos":[{"type":"attribute","name":"active","typeInfo":"Boolean"},{"type":"attribute","name":"login","typeInfo":"String"},{"type":"attribute","name":"organizationUuid","typeInfo":"String"},{"type":"attribute","name":"password","typeInfo":"String"},{"type":"attribute","name":"pollPeriod","typeInfo":"Int"}],"baseTypeInfo":"moysklad.legendEntity"},{"type":"classInfo","localName":"amiroCustomAttributeInfo","propertyInfos":[{"type":"attribute","name":"columnNumber","typeInfo":"Int"},{"type":"attribute","name":"name","typeInfo":"String"},{"type":"attribute","name":"settingsUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"cmlConnectorSettings","propertyInfos":[{"type":"attribute","name":"features","typeInfo":"Boolean"},{"type":"attribute","name":"goodFolderUuid","typeInfo":"String"},{"type":"attribute","name":"priceTypeUuid","typeInfo":"String"},{"type":"attribute","name":"shopType","typeInfo":"String"},{"type":"attribute","name":"stockActive","typeInfo":"Boolean"},{"type":"attribute","name":"stockplaceUuid","typeInfo":"String"},{"type":"attribute","name":"stockPollPeriod","typeInfo":"Int"},{"type":"attribute","name":"syncOrderState","typeInfo":"Boolean"}],"baseTypeInfo":"moysklad.operationConnectorSetting"},{"type":"classInfo","localName":"ymlConnectorSettings","propertyInfos":[],"baseTypeInfo":"moysklad.abstractConnectorSetting"},{"type":"classInfo","localName":"collectionContainer","propertyInfos":[{"type":"anyElement","name":"items","collection":true}]},{"type":"classInfo","localName":"cashier","propertyInfos":[{"type":"attribute","name":"createAndPrintRetailCashOut","typeInfo":"Boolean"},{"type":"attribute","name":"employeeUuid","typeInfo":"String"},{"type":"attribute","name":"printCheck","typeInfo":"Boolean"},{"type":"attribute","name":"printCheckFR","typeInfo":"Boolean"},{"type":"attribute","name":"retailStoreUuid","typeInfo":"String"}],"baseTypeInfo":"moysklad.entity"},{"type":"classInfo","localName":"group","propertyInfos":[{"type":"element","name":"uuid","typeInfo":"String"},{"type":"element","name":"accountUuid","typeInfo":"String"},{"type":"attribute","name":"name","typeInfo":"String"}]},{"type":"classInfo","localName":"error","propertyInfos":[{"type":"element","name":"uid","typeInfo":"String"},{"type":"element","name":"moment","typeInfo":"String"},{"type":"element","name":"message","typeInfo":"String"},{"type":"element","name":"stack","typeInfo":"String"}]},{"type":"classInfo","localName":"collection","propertyInfos":[{"type":"attribute","name":"total","typeInfo":"Int"},{"type":"attribute","name":"start","typeInfo":"Int"},{"type":"attribute","name":"count","typeInfo":"Int"}],"baseTypeInfo":"moysklad.collectionContainer"},{"type":"classInfo","localName":"abstractGood","propertyInfos":[{"type":"attribute","name":"minPrice","typeInfo":"Double"},{"type":"attribute","name":"uomUuid","typeInfo":"String"},{"type":"attribute","name":"countryUuid","typeInfo":"String"},{"type":"attribute","name":"supplierUuid","typeInfo":"String"},{"type":"attribute","name":"salePrice","typeInfo":"Double"},{"type":"attribute","name":"saleCurrencyUuid","typeInfo":"String"},{"type":"attribute","name":"buyCurrencyUuid","typeInfo":"String"},{"type":"element","name":"barcode","collection":true,"typeInfo":"moysklad.barcode"},{"type":"element","name":"salePrices","elementName":"price","collection":true,"wrapperElementName":"salePrices","typeInfo":"moysklad.price"}],"baseTypeInfo":"moysklad.goodFolder"}]}
},{}],9:[function(require,module,exports){
/**
 * auth
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getBasicAuthHttpHeader = require('./tools').getBasicAuthHttpHeader;

var logger = require('project/logger');

/** @class */
var AuthProvider = function (provider) {
    var _auth = {
        login: null,
        password: null
    };

    /**
     * 
     * @param login
     * @param password
     * @returns {AuthProvider|Client} <code>this</code>
     */
    this.setAuth = function (login, password) {
        _auth.login = login;
        _auth.password = password;

        return this;
    };

    // В качестве источника авторизации передан другой провайдер авторизации
    if (provider && provider.getAuth) {
        // копируем ссылку на объект
        _auth = provider.getAuth();
    }

    // Логин и пароль переданы в параметрах
    else if (arguments.length == 2
        && typeof arguments[0] === 'string'
        && typeof arguments[1] === 'string') {

        this.setAuth(arguments[0], arguments[1]);
    }

    /**
     *
     * @returns {*}
     */
    this.getAuth = function () {

        if (!_auth.login || !_auth.password) {
            var credentials = require('project/default-auth');
            if (credentials) {
                var auth = credentials.getAuth();
                this.setAuth(auth.login, auth.password);
            }
        }

        return _auth;
    };

    /**
     *
     * @returns {string|null}
     */
    this.getBasicAuthHeader = function () {
        var auth = this.getAuth();

        if (auth) {
            return getBasicAuthHttpHeader(auth.login, auth.password);
        } else {
            return null;
        }
    };

    /**
     *
     * @returns {boolean}
     */
    this.isAuth = function () {
        var auth = this.getAuth();
        return !!auth && !!auth.login && !!auth.password;
    };
};

module.exports = AuthProvider;
},{"./tools":90,"project/default-auth":"rUG5Il","project/logger":"37nxtW"}],10:[function(require,module,exports){
/**
 * Client
 * Date: 25.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                         = require('lodash')
  , stampit                   = require('stampit')
  , Query                     = require('./../rest-clients/ms-xml/query')
  , operators                 = require('./../rest-clients/ms-xml/query/operators')
  , authProviderBehavior      = require('./../../authProviderBehavior')
  , providerAccessorBehavior  = require('./../../providerAccessorBehavior');

/**
 * @lends Client.prototype
 */
var clientMethods = {
    // Ms
    from:   require('./methods/from'),
    load:   require('./methods/load'),
    chain:  require('./methods/chain'),
    first:  require('./methods/first'),
    total:  require('./methods/total'),
    save:   require('./methods/save'),

    // Query
    createQuery: Query.createQuery,

    // LazyLoader
    createLazyLoader:   require('./lazy-loader')
};

var jsonServiceMethods = require('./methods/json-service');

/**
 * @class Client
 */
var Client = stampit()

    // Options
    .state({
        options: {
            filterLimit: 50,
            allowNotFilterOperators: false,
            flowControl: 'sync'
        },

        sortMode: {
            ASC: 'asc',
            DESC: 'desc'
        }
    })

    // Auth
    .enclose(authProviderBehavior)

    // Providers accessor
    .enclose(providerAccessorBehavior)

    // Methods
    //
    .methods(clientMethods)
    .methods(jsonServiceMethods)
    .methods(operators);

module.exports = Client;
},{"./../../authProviderBehavior":9,"./../../providerAccessorBehavior":88,"./../rest-clients/ms-xml/query":46,"./../rest-clients/ms-xml/query/operators":56,"./lazy-loader":20,"./methods/chain":23,"./methods/first":24,"./methods/from":25,"./methods/json-service":26,"./methods/load":27,"./methods/save":28,"./methods/total":29,"lodash":"EBUqFC","stampit":"gaBrea"}],11:[function(require,module,exports){
/**
 * batch
 * Date: 13.05.2014
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit');


function batch () {

    var that = this,
        _batches = {};

    this.batch = {

        addUuids: function (batchName, uuids) {
            var curBatch = this.get(batchName);

            if (curBatch) {
                _.forEach(that.entityHash.filterNotExist(uuids), function (uuid) {
                    //TODO Перебор по массиву идет два раза. Можно оптимизировать.
                    if (_.indexOf(curBatch, uuid, true) == -1) {
                        curBatch.splice(_.sortedIndex(curBatch, uuid), 0, uuid);
                    }
                });
            }

            return this;
        },

        take: function (batchName) {
            if (_batches[batchName]) {
                var batch = _batches[batchName];
                _batches[batchName] = null;
                return batch;
            } else {
                return null;
            }
        },

        get: function (name) {
            if (arguments.length === 0)
                return _batches;

            if (_batches[name])
                return _batches[name];
            else
                return (_batches[name] = []);
        },

        isExsist: function (batchName) {
            return (_batches[batchName] && _batches[batchName].length > 0);
        }
    }

}

module.exports = batch;
},{"lodash":"EBUqFC","stampit":"gaBrea"}],12:[function(require,module,exports){


module.exports = {
    
    slot:       require('./slot'),

    state:      require('./state'),
    
    sourceSlot: require('./slot'),
    
    payments:   require('./payments')

};
},{"./payments":13,"./slot":14,"./state":15}],13:[function(require,module,exports){
/**
 * slot
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchPayments(type, uuids, containerEntity) {
    var client = this.client;

    // ...
    throw new Error('fetchPayments not implemented')

}

module.exports = fetchPayments;
},{"lodash":"EBUqFC"}],14:[function(require,module,exports){
/**
 * slot
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

function fetchSlots(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this;
    
    var query = client.from('warehouse');
    
    var warehouseUuid = (type == 'sourceSlot' ?
        containerEntity.sourceStoreUuid :
        containerEntity.targetStoreUuid);
    
    var warehouses = warehouseUuid ?
        [client.load('warehouse', warehouseUuid)] :
        client.from('warehouse').load();
    
    var slots = _.reduce(warehouses, function(slots, warehouse) {
        that.entityHash.add(this.mapLazyLoader(warehouse, path, batches, warehouse));
        if (warehouse.slots) slots = slots.concat(warehouse.slots);
        return slots;
    }, []);
    
    if (typeof uuids === 'string') {
        //TODO Добавляем без привязки LazyLoader'а (не критично для slot)
        that.entityHash.add(slots);
        return that.entityHash.get(uuids);
    }
    else if (uuids instanceof Array) {
        // Возвращаем все ячейки (выше они будут добавелны в Hash и привязан LazyLoader)
        // TODO Нужно учитывать, что фактически возвращаем не то, что запрошено 
        return slots;
    }
}

module.exports = fetchSlots;
},{"lodash":"EBUqFC"}],15:[function(require,module,exports){
/**
 * state
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , tools = require('project/tools');


function fetchState(type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        that = this;

    var query = client.from('workflow');

    if (containerEntity)
        query.filter('name', tools.getUriTypeName(containerEntity));

    var workflowCollection = query.load();

    var states = _.reduce(workflowCollection, function(states, workflow) {
        that.entityHash.add(workflow);
        if (workflow.state) states = states.concat(workflow.state);
        return states;
    }, []);

    if (typeof uuids === 'string') {
        //Добавляем без привязки LazyLoader'а (не критично для slot)
        that.entityHash.add(states); // Массив с одним элементом
        return that.entityHash.get(uuids);
    }
    else if (uuids instanceof Array) {
        // Нужно учитывать, что фактически возвращаем не то, что запрошено
        return states;
    }

}

module.exports = fetchState;
},{"lodash":"EBUqFC","project/tools":82}],16:[function(require,module,exports){
/**
 * defProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


/**
 * Создает совойство, при обращении к которому происходит ленивая загрузка сущности(ей)
 * 
 * @param {object} entity Объект к которому привязывается свойство
 * @param {string} propertyName Имя создаваемого свойства
 * @param {string | Array.<string>} uuids Идентификатор или массив идентификаторов
 * @param {string} path Путь к текущему совойству
 * @param {Array} batches Массив определителей свойств для списка групповой загрузки
 * @param {object} containerEntity Базовый объект МойСклад (напр. CustomerOrder) который содержит текущее свойство propertyName
 */
function defProperty (entity, propertyName, uuids, path, batches, containerEntity) {
    if (!uuids) return;

    var batchName = _.find(batches, function(batchItem) {
        //noinspection JSReferencingMutableVariableFromClosure
        //TODO Нужно быть точно уверенным что в пачку могут попасть uuid только сущностей одного типа
        return path.slice(-batchItem.length) == batchItem; 
    });

    if (batchName) this.batch.addUuids(batchName, uuids);

    var that = this;
    //TODO Функционал getTypeOfProperty нужно перемесить в customFetch?
    //TODO Возможно получение Demands решить аналогично через customFetch, а не через batch
    Object.defineProperty(entity, propertyName, {
        get: function () {
            var type = that.getTypeOfProperty(propertyName, entity);
            return that.getEntities(type, uuids, path, batchName, batches, containerEntity);
        },
        enumerable: false,
        configurable: true
    });
}

module.exports = defProperty;
},{"lodash":"EBUqFC"}],17:[function(require,module,exports){
/**
 * entityHash
 * Date: 13.05.2014
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , stampit = require('stampit');


function entityHash () {

    var _entityHash = {};

    this.entityHash = {

        add: function (entities) {
            if (entities instanceof Array) {
                return _.map(entities, function (entity) {
                    return _entityHash[entity.uuid] = entity;
                });

            } else {
                return _entityHash[entities.uuid] = entities;
            }
        },

        get: function (uuids) {
            if (uuids instanceof Array) {
                return _.map(uuids, function (uuid) {
                    //Не проверяем на отсутствие сущности в Hash
                    return _entityHash[uuid];
                });

            } else {
                return _entityHash[uuids];
            }
        },

        exist: function (uuid) {
            //TODO Если будет необходимость, то возможно реализовать вариант проверки по массиву uuid
            return !!_entityHash[uuid];
        },

        getHash: function () {
            return _entityHash;
        },

        filterNotExist: function (uuids) {
            if (uuids instanceof Array) {
                return _.filter(uuids, function (uuid) {
                    //Не проверяем на отсутствие сущности в Hash
                    return !_entityHash[uuid];
                });
            } else {
                return _entityHash[uuids] ? [] : [uuids];
            }
        }
    };

}

module.exports = entityHash;
},{"lodash":"EBUqFC","stampit":"gaBrea"}],18:[function(require,module,exports){
/**
 * getEntities
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , customFetch = require('./customFetch');


function getEntities (type, uuids, path, batchName, batches, containerEntity) {
    var client = this.client,
        entity, entities;

    var that = this;

    // Используем альтернативный способ получения сущностей (напр. для Slot)
    if (type in customFetch) {
        return customFetch[type].apply(this, arguments);

    } else {

        if (this.batch.isExsist(batchName)) {

            var batchUuids = this.entityHash.filterNotExist(this.batch.take(batchName));

            if (batchUuids.length > 0) {

                if (batchUuids.length == 1) {
                    // Загружаем без фильтра (возможно, так быстрее)
                    entities = [client.load(type, batchUuids[0], { fileContent: this.fileContent })];

                } else {
                    entities = client.from(type)
                        .uuids(batchUuids)
                        .load({ fileContent: this.fileContent });
                }

                _.forEach(entities, function (entityItem) {
                    that.entityHash.add(
                        that.mapLazyLoader(entityItem, path, batches, entityItem)
                    );
                });
            }
        }

        if (typeof uuids === 'string' && !this.entityHash.exist(uuids)) {
            entity = client.load(type, uuids, { fileContent: this.fileContent });
            return this.entityHash.add(this.mapLazyLoader(entity, path, batches, entity));
        }

        // В данном случае обрабатываются только единичные сущности или массивы идентификаторов
        // (напр. "demandsUuid"), которые загружаются через batch.
        // Поэтому, полагаем, что всё что нужно уже присутствует в entityHash.
        return this.entityHash.get(uuids);
    }
}

module.exports = getEntities;
},{"./customFetch":12,"lodash":"EBUqFC"}],19:[function(require,module,exports){
/**
 * getTypeOfProperty
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var propMap = require('./nameToTypeMap');


function getTypeOfProperty(propertyName, entity) {
    if (propMap[propertyName])
        return propMap[propertyName];

    else if (entity.TYPE_NAME && propMap[entity.TYPE_NAME] && propMap[entity.TYPE_NAME][propertyName])
        return propMap[entity.TYPE_NAME][propertyName];

    else
        return propertyName;
}

module.exports = getTypeOfProperty;
},{"./nameToTypeMap":22}],20:[function(require,module,exports){
/**
 * LazyLoader
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , stampit = require('stampit');


var LazyLoader = stampit()

    .state({
        fileContent: false
    })

    .enclose(require('./batch'))

    .enclose(require('./entityHash'))

    .methods({
        getEntities:        require('./getEntities'),
        getTypeOfProperty:  require('./getTypeOfProperty'),
        mapLazyLoader:      require('./mapLazyLoader'),
        defProperty:        require('./defProperty')
    });

var createLazyLoader = function () {
    var lazyLoader = LazyLoader
        //.state({ client: this }) // не корректно
        .create();

    lazyLoader.client = this;
    
    //noinspection JSUnusedGlobalSymbols
    return {
        attach: function (obj, batches) {

            if (typeof obj !== 'object')
                throw new Error('attach: obj argument must be an object');

            if (typeof batches === 'string') batches = [batches];

            batches = batches || [];

            lazyLoader.mapLazyLoader(
                obj,                                            // Сущность в корой будет созданы "ленивые" свойства на основе uuid связей
                obj.TYPE_NAME || 'object',                      // Путь к текущему элементу
                batches,                                        // Определители свойств коллекций, для которых необходима пакетная загрузка
                (obj.TYPE_NAME && !(obj instanceof Array)) ?    // Сущность контейнер/containerEntity (текущий объект)
                    obj :
                    null
            );

            return this;
        },

        fileContent: function (obj) {
            if (obj) lazyLoader.fileContent = !!obj;

            return this;
        }
    }
};

module.exports = createLazyLoader;
},{"./batch":11,"./defProperty":16,"./entityHash":17,"./getEntities":18,"./getTypeOfProperty":19,"./mapLazyLoader":21,"lodash":"EBUqFC","stampit":"gaBrea"}],21:[function(require,module,exports){
/**
 * mapLazyLoader
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , tools = require('project/tools');


/**
 * Рекурсивно создает свойства согласно ссылкам на связанные объекты
 *
 * @param {object} entity Объект или узел внутри объекта
 * @param {string|null} path Путь к обрабатываемому узлу ( напр. "prop1.prop2")
 * @param {array|null} batches
 * @param {object} containerEntity Базовый объект МойСклад (напр. CustomerOrder) который содержит текущее свойство propertyName
 * @returns {*}
 * @private
 *
 */
function mapLazyLoader (entity, path, batches, containerEntity) {
    var curPath, propertyName;
    path = path || '';

    // Список методов tools которые необходимо привязать к объекту
    //TODO Нужно ли делать через defineProperty?
    var bindingMethods = [];

    if (!(entity instanceof Array)) {
        bindingMethods.push('getProperty');
    }

    // Привязываем проверку типа
    if ('TYPE_NAME' in entity) {
        bindingMethods.push('instanceOf');
    }

    if (tools.instanceOf(entity, 'order'))
        bindingMethods.push('reserve');

    // Привязываем универсальный метод доступа к позициям документа (если применимо)
    if (tools.instanceOf(entity, 'operationWithPositions'))
        bindingMethods.push('getPositions');

    //TODO Если атрибуты не заданы entity.attribute будет не определен и привязка не произойдет ..
    //TODO .. нужно проверять по схеме, есть ли в этой сущности аттрибуты
    // Привязываем методы для работы с атрибутами
    if (entity.attribute)
        bindingMethods = bindingMethods.concat(['getAttr', 'getAttrValue']);

    if (entity.salePrices)
        bindingMethods = bindingMethods.concat(['getPrice', 'getPriceValue']);

    _.each(bindingMethods, function (propName) {
        if (!entity[propName])
            entity[propName] = tools[propName].bind(tools, entity);
    });
/*

    _.forEach(entity.attribute, function (attribute) {
        Object.defineProperty(entity, attribute.metadataUuid, {
            get: function () {

            },
            enumerable: false,
            configurable: true
        });
    });
*/

    //TODO Перепроверить логику обхода гарфа объекта
    for (var key in entity) {
        var subEntity = entity[key];

        if (subEntity && entity.hasOwnProperty(key) && !(subEntity instanceof Date)) {

            // строка идентификатор или массив идентификаторов [name]Uuid, напр. ".goodUuid", ".demandsUuid[]"
            if (isNaN(key) && key.substring(key.length - 4) == 'Uuid') {

                // demandsUuid -> demands
                propertyName = key.substring(0, key.length - 4);
                curPath = path + '.' + propertyName;

                // напр. "demandsUuid" .. то при обращении нужно загрузить все сущности по массиву идентификаторов
                if (subEntity instanceof Array) {
                    (batches = batches || []).push(curPath);
                }

                this.defProperty(entity, propertyName, subEntity, curPath, batches, containerEntity);
            }

            // массив
            else if (subEntity instanceof Array) {
                entity instanceof Array ?
                    // [[]] - вложенный массив
                    this.mapLazyLoader(subEntity, path + '.object', batches, containerEntity) :
                    // свойство массив, напр. ".customerOrderPosition[]"
                    this.mapLazyLoader(subEntity, path, batches, containerEntity);
            }

            // объект
            else if (typeof subEntity === 'object') {
                var typeName = subEntity.TYPE_NAME ? subEntity.TYPE_NAME.split('.')[1] : null;
                this.mapLazyLoader(subEntity,
                        path + '.' + (typeName || 'object'), batches,
                        containerEntity || (subEntity.TYPE_NAME ? subEntity : null));
            }

        }
    }
    return entity;
}

module.exports = mapLazyLoader;
},{"lodash":"EBUqFC","project/tools":82}],22:[function(require,module,exports){
module.exports={
    "moysklad.customerOrder": {
        "sourceAgent": "company",
        "targetAgent": "myCompany"
    },

    "moysklad.invoiceOut": {
        "sourceAgent": "myCompany",
        "targetAgent": "company"
    },

    "moysklad.contract": {
        "ownCompany": "myCompany"
    },

    "sourceStore": "warehouse",
    "targetStore": "warehouse",
    "demands": "demand",
    "invoicesOut": "invoice",
    "supplier": "company"
}
},{}],23:[function(require,module,exports){
/**
 * chain
 * Date: 25.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

var chain = function () {
    return _.chain(this.load.apply(this, arguments));
};

module.exports = chain;
},{"../../../tools/index":90,"lodash":"EBUqFC"}],24:[function(require,module,exports){
/**
 * first
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

/**
 * First. Возвращает первую сущность из списка сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Object}
 */
var first = function (type, query, callback) {
    //TODO Ensure
    var _restClient = this.getProvider('ms-xml'),
        _obj = null,
        _queryParametersList;

    function _firstFromParts (paramsIndex, callback) {
        var _params = _queryParametersList[paramsIndex];

        if (_params && ('count' in _params ? _params.count !== 0 : true)) {

            _restClient.get(type, _.extend({}, _params, { count: 1 }), function (err, data) {
                if (err) return callback(err);

                if (data.obj.length > 0) {
                    return callback(null, data.obj[0]);

                } else {
                    _firstFromParts(++paramsIndex, callback)
                }
            });

        } else {
            return callback(null, null);
        }
    }

    // query
    if (typeof query == 'object' && 'getQueryParameters' in query) {
        _queryParametersList = query.getQueryParameters(this.options.filterLimit);
    }

    //TODO Ничего не мешеает использовать first без query
    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    _firstFromParts(0, function (err, data) {
        _obj = callbackAdapter(err, data, callback);
    });

    return _obj;
};

module.exports = first;
},{"../../../tools/index":90,"lodash":"EBUqFC"}],25:[function(require,module,exports){
/**
 * from
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , Query = require('./../../rest-clients/ms-xml/query/index').Query;

//TODO Оформить синонимы как подмассив
var bindingMethods = [ 'load', 'first', 'total', 'chain' ];

/**
 * Возвращает запрос привязанный к указанному типу сущности.
 * Используется для более лаконичной записи зароса ввиде цепочки методов.
 *
 * @param type
 */
var from = function (type) {
    //TODO Ensure

    Query.enclose(function () {
        this.getType = function () {
            return type;
        };
    });

    var that = this;

    // set client methods to query (i.e. query.load)
    _.each(bindingMethods, function (methodName) {
        Query.enclose(function () {
            this[methodName] = function () {
                var args = Array.prototype.slice.call(arguments, 0);
                return that[methodName].apply(that, [type, this].concat(args));
            }
        });
    });

    return Query.create();
};

module.exports = from;
},{"./../../rest-clients/ms-xml/query/index":46,"lodash":"EBUqFC"}],26:[function(require,module,exports){
/**
 * json-service
 * Date: 24.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

//TODO Вероятно нужно перенести этот модуль в rest-clients/json (для целостности пониманя работы модуля)

var callService = function (serviceName) {
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , _restClient = this.getProvider('json-services')
      , _obj        = null;

    var serviceArgs = args.slice(1, args.length - (callback ? 1 : 0));

    serviceArgs.push(function (err, data) {
        _obj = callbackAdapter(err, data.obj, callback);
    });

    _restClient[serviceName].apply(_restClient, serviceArgs);

    return _obj;
};

[
    'stock',
    'stockForGood',
    'slot',
    'mutualSettlement',
    'mutualSettlementForCustomer'

].forEach(function (serviceName) {
    module.exports[serviceName] = function () {
        return callService.apply(this,
            [serviceName].concat(Array.prototype.slice.call(arguments, 0)));
    }
});


},{"../../../tools/index":90,"lodash":"EBUqFC"}],27:[function(require,module,exports){
/**
 * load
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = require('../../../tools/index').callbackAdapter
  , _ = require('lodash');

//noinspection JSValidateJSDoc,JSCommentMatchesSignature
/**
 * Load. Получает сущность по идентификатору или список сущностей согласно запросу.
 *
 * @param {String} type Тип сущности
 * @param {String|Object} query Идентификатор сущности или запрос для фильтрации
 * @param {Boolean=} [options.fileContent] Опции
 * @param {Function=} [callback]
 * @returns {Object|Object[]}
 */
var load = function (type, query) {
    //TODO Ensure
    var args = _.toArray(arguments)
      , callback = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      , options = typeof args[2] === 'object' ? args[2] : {}
      , _queryParametersList
      , _restClient = this.getProvider('ms-xml')
      , _obj = null;

    function loadPartial(paramsIndex, paging, cumulativeTotal, resultCollection, callback) {

        if (_queryParametersList[paramsIndex] && ('count' in paging ? paging.count !== 0 : true)) {
            var _params = _.extend({}, _queryParametersList[paramsIndex], paging);

            _restClient.get(type, _params, function (err, data) {
                if (err) return callback(err);

                var _collection = data.obj,
                    _length     = _collection.length,
                    _total      = _collection.total;

                if (paging.start) paging.start - _total > 0 ?
                    paging.start -= _total :
                    paging.start = 0;

                if (paging.count) paging.count - _length > 0 ?
                    paging.count -= _length :
                    paging.count = 0;

                cumulativeTotal += _total;
                resultCollection = resultCollection.concat(_collection);

                loadPartial(++paramsIndex, paging, cumulativeTotal, resultCollection, callback);
            });

        } else {
            //TODO Уточнить
            resultCollection.total = cumulativeTotal; // -1 когда нет данных о total
            callback(null, resultCollection);
        }
    }

    if (query instanceof Array)
        query = this.createQuery({}, options).uuids(query);

    // uuid ..
    if (typeof query == 'string') {
        var params = { uuid: query };

        if (options.fileContent) params.fileContent = true;

        _restClient.get(type, params, function (err, data) {
            _obj = callbackAdapter(err, data.obj, callback);
        });
    }

    // .. или query
    else if (typeof query == 'object' && 'getQueryParameters' in query) {
        //TODO Не забыть про options при написании документации
        _queryParametersList = query.getQueryParameters(this.options.filterLimit);

        var paging = {};
        if (_queryParametersList[0].start) paging.start = _queryParametersList[0].start;
        if (_queryParametersList[0].count) paging.count = _queryParametersList[0].count;

        loadPartial(0, paging, 0, [], function (err, data) {
            _obj = callbackAdapter(err, data, callback);
        });
    }

    // .. ошибка
    else {
        return callbackAdapter(new TypeError('Incorrect uuid or query parameter'), null, callback);
    }

    return _obj;
};

module.exports = load;
},{"../../../tools/index":90,"lodash":"EBUqFC"}],28:[function(require,module,exports){
/**
 * save
 * Date: 15.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

//TODO Ограничение на кол-во сохраняемых объектов в коллекции (проверить)

/**
 * Save. Сохраняет сущность или список сущностей.
 *
 * @param {String} [type] Тип сущности (если не указан производится попытка получить тип из свойства объекта TYPE_NAME)
 * @param {Object} ent Сущность или список сущностей
 * @param {Function=} callback
 * @returns {Object} Созданная/сохраненная сущность
 */
var save = function () {
    //TODO Ensure
    var args        = _.toArray(arguments)
      , callback    = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null;

    var restClient  = this.getProvider('ms-xml'),
        obj = null;

    var putArgs = args.slice(0, args.length);

    putArgs.push(function (err, data) {
        obj = callbackAdapter(err, data.obj, callback);
    });

    restClient.put.apply(restClient, putArgs);

    return obj;
};

module.exports = save;
},{"../../../tools/index":90,"lodash":"EBUqFC"}],29:[function(require,module,exports){
/**
 * total
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools/index').callbackAdapter;

/**
 *
 * @param {String} type Тип сущности
 * @param {Object} query Объект запроса для фильтрации сущностей
 * @param {Function=} callback
 * @returns {Number}
 */
var total = function (type, query, callback) {
    //TODO Ensure
    var _restClient = this.getProvider('ms-xml'),
        _total = null,
        _queryParametersList;

    function _totalFromParts(paramsIndex, cumulativeTotal, callback) {

        if (_queryParametersList[paramsIndex]) {
            var _params = _.extend({}, _queryParametersList[paramsIndex], { count: 0 });

            _restClient.get(type, _params, function (err, data) {
                if (err) return callback(err);

                cumulativeTotal += data.obj.total;

                _totalFromParts(++paramsIndex, cumulativeTotal, callback);
            });

        } else {
            callback(null, cumulativeTotal);
        }
    }

    // query
    if (typeof query == 'object' && 'getQueryParameters' in query) {
        _queryParametersList = query.getQueryParameters();

        _totalFromParts(0, 0, function (err, data) {
            _total = callbackAdapter(err, data, callback);
        });
    }

    // .. error
    else {
        return callbackAdapter(new TypeError('Incorrect query parameter'), null, callback);
    }

    return _total;
};

module.exports = total;
},{"../../../tools/index":90,"lodash":"EBUqFC"}],"moysklad-client":[function(require,module,exports){
module.exports=require('1wiUUs');
},{}],"1wiUUs":[function(require,module,exports){
/**
 * MoyskladClient
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('./client')
  , query  = require('./rest-clients/ms-xml/query')
  , logger = require('project/logger')
  , pkg    = require('../../package');

logger.info('moysklad-client v' + pkg.version);

module.exports = {

    createClient: function () {
        return client.apply(this, [null].concat(Array.prototype.slice.call(arguments, 0)));
    },

    createQuery: query.createQuery,

    tools: require('project/tools'),
    logger: require('project/logger'),
    version: pkg.version
};
},{"../../package":7,"./client":10,"./rest-clients/ms-xml/query":46,"project/logger":"37nxtW","project/tools":82}],32:[function(require,module,exports){
module.exports={
    "baseUrl": "https://online.moysklad.ru/exchange"
}
},{}],33:[function(require,module,exports){
/**
 * stock
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var stockJsonClient = stampit()

    // Authable
    .enclose(require('./../../../authProviderBehavior'))

    // Pass options to provider from client
    .enclose(function (client) {
        if (client) this.options = client.options || {};
    })

    // Methods
    //
    .methods({

        // add client methods
        stock:                          require('./methods/stock'),
        stockForGood:                   require('./methods/stock-for-good'),
        slot:                           require('./methods/slot'),
        mutualSettlement:               require('./methods/mutualSettlement').list,
        mutualSettlementForCustomer:    require('./methods/mutualSettlement').customer,

        fetch:                          require('./methods/fetch')

    });

module.exports = stockJsonClient;

//TODO Написать необходимые Enum'ы
},{"./../../../authProviderBehavior":9,"./methods/fetch":34,"./methods/mutualSettlement":35,"./methods/slot":36,"./methods/stock":38,"./methods/stock-for-good":37,"stampit":"gaBrea"}],34:[function(require,module,exports){
/**
 * fetch
 * Date: 19.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
  , moment                      = require('moment')
  , client_properties           = require('./../../client-properties')
  , fetchProviderRespHandler    = require('./../providerResponseHandler')
  , endPoint                    = client_properties.baseUrl + '/rest';

var fetch = function (options, callback) {

    var _fetchProvider = require('project/fetch'),
        query;

    if (options.params) {
        query = _.reduce(options.params, function (result, value, key) {
            var itemValues = value instanceof Array ? value : [value];

            _.forEach(itemValues, function (itemValue) {
                if (itemValue instanceof Date || moment.isMoment(itemValue))
                    itemValue = moment(itemValue).format('YYYYMMDDHHmmss');

                result.push(key + '=' + encodeURIComponent(itemValue));
            });

            return result;
        }, []).join('&');

        query = query ? '/?' + query : null;
    }

    var fetchOptions = _.extend({
        // default
        contentType: 'application/json',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: 'GET',
        url: endPoint + '/' + options.service + '/json' + (options.path || '') + (query || '')
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    _fetchProvider.fetch(fetchOptions, function (err, result) {
        return fetchProviderRespHandler(err, result, callback);
    });
};

module.exports = fetch;
},{"./../../client-properties":32,"./../providerResponseHandler":39,"lodash":"EBUqFC","moment":"2V8r5n","project/fetch":"Q962xy"}],35:[function(require,module,exports){
/**
 * mutualSettlement
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

var list = function () {

    var args        = _.toArray(arguments)
      , options     = (typeof args[0] === 'object') ? args[0] : null
      , callback;

    var lastArg = args.slice(-1)[0];
    if (typeof lastArg === 'function')
        callback = lastArg;
    else
        throw new Error('callback not defined');

    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/list',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

var customer = function (customerUuid) {

    var args        = _.toArray(arguments)
      , options     = (typeof args[1] === 'object') ? args[0] : null
      , callback;

    var lastArg = args.slice(-1)[0];
    if (typeof lastArg === 'function')
        callback = lastArg;
    else
        throw new Error('callback not defined');

    var fetchOptions = {
        service : 'mutualSettlement',
        path    : '/customer/' + customerUuid,
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = {
    list    : list,
    customer: customer
};
},{"lodash":"EBUqFC","moment":"2V8r5n"}],36:[function(require,module,exports){
/**
 * slot
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

var slot = function (options, callback) {

    //TODO Callback adapter
    if (!options.storeUuid)
        throw new Error('slot: options.storeUuid not defined');

    var fetchOptions = {
        service : 'slot',
        params  : {
            storeUuid: options.storeUuid
        }
    };

    var goodUuids = (typeof options.goodUuid === 'string') ? [options.goodUuid] : options.goodUuid;

    if (goodUuids && goodUuids.length > 0) {
        //TODO Реализовать пейджинг по 50 шт
        if (goodUuids.length > 50)
            throw new Error('slot: good uuids array length more than 50 not supported now');

        fetchOptions.params.goodUuid = goodUuids;
    }

    this.fetch(fetchOptions, callback);
};

module.exports = slot;
},{"lodash":"EBUqFC","moment":"2V8r5n"}],37:[function(require,module,exports){
/**
 * stockForGood
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var stockForGood = function (options, callback) {

    var fetchOptions = {
        service : 'stock-for-good',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = stockForGood;
},{"lodash":"EBUqFC","moment":"2V8r5n"}],38:[function(require,module,exports){
/**
 * stock
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , moment = require('moment');

var stock = function (options, callback) {

    var fetchOptions = {
        service : 'stock',
        params  : options
    };

    this.fetch(fetchOptions, callback);
};

module.exports = stock;
},{"lodash":"EBUqFC","moment":"2V8r5n"}],39:[function(require,module,exports){
/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , callbackAdapter = require('../../../tools').callbackAdapter;

//TODO Часть кода providerResponseHandler'ов не оправданно дублируется .. >
var providerResponseHandler = function (err, result, callback) {
    var _log = require('project/logger');

    // .. этот кусок общий для всех
    if (!err) {

        switch (result.response.responseCode) {

            //TODO Прописать все ошибки stock сервисов
            //TODO Есть ли общие для всех ошибки (нужно ли выделять)?

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                return callbackAdapter(
                    new Error('Server error 500'), result, callback);

            // ошибка авторизации
            case 401:
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO ??? Надо парсить Html ответа и выделять описание ошибки
                _log.log('Ответ сервера: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {
            result.obj = JSON.parse(result.response.contentText);
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;
},{"../../../tools":90,"lodash":"EBUqFC","project/logger":"37nxtW"}],40:[function(require,module,exports){
/**
 * index
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');

var msXmlClient = stampit()

    // Authable
    .enclose(require('./../../../authProviderBehavior'))

    // Pass options to provider from client
    .enclose(function (client) {
        if (client) this.options = client.options || {};
    })

    // Methods
    //
    .methods({

        // add client methods
        get:    require('./methods/get'),
        put:    require('./methods/put'),
        del:    require('./methods/del'),
        fetch:  require('./methods/fetch'),

        // Tools
        getObjectTypeName: function (className) {
            if (className.indexOf('.') != -1) className = className.split('.')[1];
            return className.charAt(0).toUpperCase() + className.substring(1);
        }
    });

module.exports = msXmlClient;
},{"./../../../authProviderBehavior":9,"./methods/del":41,"./methods/fetch":42,"./methods/get":43,"./methods/put":44,"stampit":"gaBrea"}],41:[function(require,module,exports){
/**
 * del
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');


module.exports = function (type, data, callback) {
    var _fetchOptions = {
            path: '/' + this.getObjectTypeName(type)
        };

    if (data instanceof Array) {
        // POST /{type}/list/delete
        _fetchOptions.path += '/list/delete';
        _fetchOptions.method = 'POST';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    return {
                        name: {
                            localPart: 'String'
                        },
                        value: item
                    };
                })
            }
        };

    } else {
        // PUT /{type}/{id}
        _fetchOptions.path += '/' + data;
        _fetchOptions.method = 'DELETE';

    }

    this.fetch(_fetchOptions, callback);
}
},{"lodash":"EBUqFC"}],42:[function(require,module,exports){
/**
 * fetch
 * Date: 27.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _                           = require('lodash')
  , client_properties           = require('./../../client-properties')
  , fetchProviderRespHandler    = require('./../providerResponseHandler')
  , endPoint                    = client_properties.baseUrl + '/rest/ms/xml';


var fetch = function (options, callback) {
    var that = this;

    var _fetchProvider  = require('project/fetch')
      , _marshaller     = require('project/marshaller').create()
      , _log            = require('project/logger');

    var fetchOptions = _.extend({
        // default
        contentType: 'application/xml',
        headers: {},
        async: this.options.flowControl === 'async'
    }, {
        // parameters
        method: options.method,
        url: endPoint + options.path
    });

    if (this.isAuth())
        fetchOptions.headers.Authorization = this.getBasicAuthHeader();

    if (options.payload)
        fetchOptions.payload = _marshaller.marshalString(options.payload);

    _fetchProvider.fetch(fetchOptions, function (err, result) {
        return fetchProviderRespHandler(err, result, callback);
    });
};

module.exports = fetch;
},{"./../../client-properties":32,"./../providerResponseHandler":45,"lodash":"EBUqFC","project/fetch":"Q962xy","project/logger":"37nxtW","project/marshaller":69}],43:[function(require,module,exports){
/**
 * get
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = function (type, params, callback) {
    var _path = '/' + this.getObjectTypeName(type);

    if (params.uuid && typeof params.uuid === 'string') {
        // GET /{type}/{id}
        _path += '/' + params.uuid;
        if (params.fileContent) _path += '/?fileContent=true';

    } else {
        // GET /{type}/list
        _path += '/list';
        if (Object.keys(params).length > 0) {
            _path += '/?' + _.map(params, function (value, key) {
                return key + '=' + encodeURIComponent(value);
            }).join('&');
        }
    }

    this.fetch({ method: 'GET', path: _path }, callback);
};
},{"lodash":"EBUqFC"}],44:[function(require,module,exports){
/**
 * put
 * Date: 24.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 *
 * @param {String} [type] Тип сущности (если не указан производится попытка получить тип из свойства объекта TYPE_NAME)
 * @param {Object|Array.<Object>} data
 * @param {Function} callback
 */
var put = function () {
    //TODO Ensure
    var args            = _.toArray(arguments)
      , type            = typeof args[0] == 'string' && typeof args[1] == 'object' ? args[0] : null
      , data            = type ? args[1] : args[0]
      , callback        = typeof args.slice(-1)[0] === 'function' ? args.slice(-1)[0] : null
      ;

    if (!type) {
        if (data.TYPE_NAME) {
            type = data.TYPE_NAME;
        } else if ((data instanceof Array) && data.length > 0) {
            type = data[0].TYPE_NAME;
        }
    }

    if (type && type.indexOf('.') != -1)
        type = type.split('.')[1]; // moysklad.{type}

    var _fetchOptions = {
        method: 'PUT',
        path: '/' + this.getObjectTypeName(type),
        payload: {
            name: {}
        }
    };

    if (data instanceof Array) {
        // PUT /{type} + /list/update

        _fetchOptions.path += '/list/update';

        _fetchOptions.payload = {
            name: {
                localPart: 'collection'
            },
            value: {
                items: _.map(data, function (item) {
                    //TODO Ensure localPart type
                    return {
                        name: {
                            //TODO Нужна ли выбрка или подставить то, что выведено выше
                            localPart: type ? type : item.TYPE_NAME.split('.')[1]
                        },
                        value: item
                    };
                })
            }
        };

    } else if (typeof data == 'object') {
        // PUT /{type}
        _fetchOptions.payload = {
            name: {
                localPart: type ? type : data.TYPE_NAME.split('.')[1]
            },
            value: data
        };
        //TODO Ensure localPart type
        if (!_fetchOptions.payload.name.localPart)
            return callback(new TypeError('Type information not specified'));

    } else {
        return callback(new TypeError('Incorrect data parameter'));
    }

    this.fetch(_fetchOptions, callback);
};

module.exports = put;
},{"lodash":"EBUqFC"}],45:[function(require,module,exports){
/**
 * providerResponseHandler
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _               = require('lodash')
  , callbackAdapter = require('../../../tools').callbackAdapter;


var providerResponseHandler = function (err, result, callback) {
    var data;

var _log            = require('project/logger'),
    _unmarshaller   = require('project/unmarshaller').create();

    if (!err) {

        switch (result.response.responseCode) {

            // ошибка пришла ввиде XML сериализуем и обработаем ниже
            case 500:
                break;

            // ошибка авторизации
            case 401:
                return callbackAdapter(
                    new Error('Request requires HTTP authentication'), result, callback);

            // корректный ответ сервера (работаем с ним дальше)
            case 200:
                break;

            // любой другой код ответа - ошибка
            default:
                //TODO Надо парсить Html ответа и выделять описание ошибки
                _log.log('Server response: \n' + result.response.contentText);
                return callbackAdapter(
                    new Error('Server response error ' + result.response.responseCode), result, callback);
        }

        if (result.response.contentText.length > 0) {

            //_log.time('Response unmarshalling time');

            data = result.response.contentXml ?
                _unmarshaller.unmarshalDocument(result.response.contentXml) :
                _unmarshaller.unmarshalString(result.response.contentText);

            //_log.timeEnd('Response unmarshalling time');

            result.type = data.name.localPart;

            if (result.type == 'error') return callbackAdapter(new Error(data.value.message));

            if (result.type == 'collection') {
                result.obj = _.pluck(data.value.items, 'value');
                _.extend(result.obj, {
                    total:      data.value.total,
                    start:      data.value.start,
                    count:      data.value.count,
                    TYPE_NAME:  data.value.TYPE_NAME
                });
            } else {
                result.obj = data.value;
            }
        }
    }

    return callbackAdapter(err, result, callback);
};

module.exports = providerResponseHandler;
},{"../../../tools":90,"lodash":"EBUqFC","project/logger":"37nxtW","project/unmarshaller":85}],46:[function(require,module,exports){
/**
 * index
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Query = require('./query');

module.exports = {

    createQuery: function (queryObj, options) {
        return Query.create(null, queryObj, options);
    },

    Query: Query
};


},{"./query":58}],47:[function(require,module,exports){
/**
 * fileContent
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

var fileContent = function () {
    if (arguments.length == 0) {
        return this.getParameter('fileContent');

    } else {
        this.setParameter('fileContent', !!arguments[0]);
    }
    return this;
};

module.exports = fileContent;
},{"../../../../../tools/index":90}],48:[function(require,module,exports){
/**
 * Created by mvv on 17.05.14.
 */

var filter = function (key, value) {
    var filterObj = {};
    filterObj[key] = value;
    this.appendFilter(filterObj);

    return this;
};

module.exports = filter;
},{}],49:[function(require,module,exports){
/**
 * getQueryParameters
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash')
  , moment      = require('moment')
  , Ensure      = require('../../../../../tools/index').Ensure
  , operators   = require('../operators');

//TODO Описать параметры и скорректировать наименование
/**
 *  Сворачивает фильтр в объект ключ-значение
 */
function _flattenFilter(obj, path, filter) {

    filter = filter || {};

    _.forOwn(obj, function (value, key) {
        var curPath = (path ? path + '.' : '') + key;

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            filter[curPath] = [ '=' + value ];

        } else if (value instanceof Array) {
            filter[curPath] = _.map(value, function (item) { return '=' + item; });

        } else if (value instanceof Date) {
            filter[curPath] = [ '=' + moment(value).format('YYYYMMDDHHmmss') ];

        } else if (moment.isMoment(value)) {
            filter[curPath] = [ '=' + value.format('YYYYMMDDHHmmss') ];

        } else if (value.type === 'QueryOperatorResult' && value.filter) {
            filter[curPath] = value.filter;

        } else if (value instanceof Object) {
            var keys = _.keys(value);

            if (keys.length == 0)
                throw new TypeError('Empty key value [' + curPath + '] in filter object.');

            if (keys[0].substring(0, 1) == '$') {
                filter[curPath] = [];

                _.forEach(keys, function (key) {
                    var operator = operators[key];
                    if (typeof operator !== 'function')
                        throw new TypeError('Incorrect operator [' + key + '] in filter object [' + curPath + ']');

                    filter[curPath] = filter[curPath].concat(operator(value[key]).filter);
                });

            } else {

                _flattenFilter(value, curPath, filter);
            }

        } else {
            throw new TypeError('Incorrect key value [' + curPath + '] in filter object.');
        }
    });

    return filter;
}

function _splitFiltersAccordingLimit(filters, limit) {
    var splitedFilters = [];

    _.forEach(filters, function (filter) {
        _.forOwn(filter, function (filterValues, filterKey) {
            if (filterValues.length > limit) {
                var start = 0,
                    filterParts = [];

                while (start < filterValues.length) {
                    filterParts.push(filterValues.slice(start, start + limit));
                    start += limit;
                }

                _.forEach(filterParts, function (filterPart) {
                    var clonedFilter = _.clone(filter);
                    clonedFilter[filterKey] = filterPart;
                    splitedFilters.push(clonedFilter);
                });

                return false;
            }
        });
    });

    return splitedFilters.length > 0 ? _splitFiltersAccordingLimit(splitedFilters, limit) : filters;
}


/**
 * Возвращает параметры для формирования строки запроса текущего Query
 * @returns {{}}
 */
var getQueryParameters = function (filterLimit) {
    //TODO Проверка входного значения
    filterLimit = filterLimit > 0 ? filterLimit : 50;

    var queryParams = this.getParameters(),
        queryParamsVariations = [],
        flattenedFilter,
        flattenedFilterVariations;

    flattenedFilter = _flattenFilter(this.getFilter());
    flattenedFilterVariations = _splitFiltersAccordingLimit([ flattenedFilter ], filterLimit);

    _.forEach(flattenedFilterVariations, function (filter) {
        var filterItems = [];
        _.forOwn(filter, function (filterValues, filterKey) {
            _.forEach(filterValues, function (filterValue) {
                filterItems.push(filterKey + filterValue);
            })
        });

        var clonedParams = _.clone(queryParams);
        if (filterItems.length > 0) clonedParams.filter = filterItems.join(';');
        queryParamsVariations.push(clonedParams);
    });

    return queryParamsVariations;
};

module.exports = getQueryParameters;
},{"../../../../../tools/index":90,"../operators":56,"lodash":"EBUqFC","moment":"2V8r5n"}],50:[function(require,module,exports){
/**
 * count
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

var addPaging = function (method, args) {
    if (Is.args(args, 'number')) {
        this.setParameter(method, args[0]);
    } else if (args.length == 0) {
        return this.getParameter(method);
    } else {
        throw new Error(method + ': incorrect parameter [' + obj + '], number expected');
    }
    return this;
};

module.exports = {

    start: function () {
        return addPaging.call(this, 'start', arguments);
    },

    count: function () {
        return addPaging.call(this, 'count', arguments);
    },

    page: function (number, size) {
        this.start((number - 1) * size).count(size);
    }

};
},{"../../../../../tools/index":90}],51:[function(require,module,exports){
/**
 * select
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    // Query
    if ('getFilter' in  arguments[0]) {
        this.appendFilter(arguments[0].getFilter());
        return this;

    // Object
    } else if (Is.args(arguments, Object)) {
        this.appendFilter(arguments[0]);
        return this;

    // null
    } else if (arguments.length == 1 && arguments[0] === null) {
        this.resetFilter();
        return this;

    } else if (arguments.length == 0) {
        return this.getFilter();
    }

    throw new TypeError('filter: incorrect parameter');
};
},{"../../../../../tools/index":90}],52:[function(require,module,exports){
/**
 * showArchived
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'boolean')) {
        this.setParameter('showArchived', arguments[0]);

    } else if (arguments.length == 0) {
        return this.getParameter('showArchived');

    } else {
        throw new Error('showArchived: incorrect parameters ' + obj.toString());
    }

    return this;
};

},{"../../../../../tools/index":90}],53:[function(require,module,exports){
/**
 * sort
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'string')) {
        this.setParameter('sort', arguments[0]);

    } else if (Is.args(arguments, 'string', 'string')) {
        this.setParameters({
            sort: arguments[0],
            sortMode: arguments[1]
        });

    } else if (arguments.length == 0) {
        return this.getParameter('sort');

    } else {
        throw new Error('sort: incorrect parameters ' + obj);
    }

    return this;
};

},{"../../../../../tools/index":90}],54:[function(require,module,exports){
/**
 * sortMode
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var Is = require('../../../../../tools/index').Is;

module.exports = function () {

    if (Is.args(arguments, 'string')) {
        this.setParameter('sortMode', arguments[0]);

    } else if (arguments.length == 0) {
        return this.getParameter('sortMode');

    } else {
        throw new Error('sortMode: incorrect parameters ' + obj);
    }

    return this;
};

},{"../../../../../tools/index":90}],55:[function(require,module,exports){
/**
 * uuids
 * Date: 17.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var uuids = function (uuids) {

    if (uuids instanceof Array && uuids.length > 0) {
        var filterObj = {};
        filterObj['uuid'] = uuids;
        filterObj['showArchived'] = true;

        this.appendFilter(filterObj);
    } else {

        throw new Error('uuids: incorrect or empty array parameter')
    }

    return this;
};

module.exports = uuids;
},{}],56:[function(require,module,exports){
/**
 * operators
 * Date: 17.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , moment = require('moment');

function convertValue(value) {

    //TODO Подумать правильно ли я проверяю типы?
    if (typeof value === 'string' || typeof value === 'number') {
        return value;

    /*} else if (value instanceof Array) {
        return value;*/

    } else if (value instanceof Date) {
        return moment(value).format('YYYYMMDDHHmmss');

    } else if (moment.isMoment(value)) {
        return value.format('YYYYMMDDHHmmss');

    } else if (typeof value === 'undefined' || value === 'null') {
        throw new TypeError('Null or undefined parameter in query operator');

    } else {
        throw new TypeError('Incorrect parameter in query operator');
    }
}

var operators = {

    //
    anyOf: function () {
        var values;

        if (arguments.length == 1 && arguments[0] instanceof Array)
            values = arguments[0];

        else if (arguments.length > 0)
            values = Array.prototype.slice.call(arguments, 0);

        else
            throw new Error('anyOf: no argumets');

        return {
            type: 'QueryOperatorResult',
            filter: _.map(values, function (value) {
                return '=' + convertValue(value);
            })
        };
    },

    //
    between: function (value1, value2) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(value1), '<' + convertValue(value2) ]
        };
    },

    //
    greaterThen: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>' + convertValue(value) ]
        };
    },

    //
    greaterThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '>=' + convertValue(value) ]
        };
    },

    //
    lessThan: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<' + convertValue(value) ]
        };
    },

    //
    lessThanOrEqualTo: function (value) {
        return {
            type: 'QueryOperatorResult',
            filter: [ '<=' + convertValue(value) ]
        };
    }

};

operators.$in   = operators.anyOf;
operators.$bt   = operators.between;
operators.$gt   = operators.greaterThen;
operators.$gte  = operators.greaterThanOrEqualTo;
operators.$lt   = operators.lessThan;
operators.$lte  = operators.lessThanOrEqualTo;

module.exports = operators;
},{"lodash":"EBUqFC","moment":"2V8r5n"}],57:[function(require,module,exports){
/**
 * query.filter
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('../../../../tools/index').Is;

module.exports = function () {
    var _filter = {};

    this.getFilter = function (name) {
        return _filter;
    };

    this.setFilter = function (value) {
        //TODO Ensure Object
        _filter = value;
        return this;
    };

    this.resetFilter = function () {
        _filter = {};
        return this;
    };

    this.appendFilter = function (value) {
        if (Is.object(value)) {
            //TODO Необходимо реализовать логинку наложения условий при объединении фильров
            _filter = _.merge(_filter, value);
        } else {
            throw new TypeError('addFilter: incorrect parameter [' + value + '], object required');
        }
        return this;
    };

    if (arguments[0]) this.appendFilter(arguments[0]);
};
},{"../../../../tools/index":90,"lodash":"EBUqFC"}],58:[function(require,module,exports){
/**
 * Query
 * Date: 21.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var stampit = require('stampit');


var Query = stampit()

    // Methods
    //
    .methods({
        getQueryParameters  : require('./methods/getQueryParameters'),
        start               : require('./methods/paging').start,
        skip                : require('./methods/paging').start,
        count               : require('./methods/paging').count,
        limit               : require('./methods/paging').count,
        page                : require('./methods/paging').page,
        filter              : require('./methods/filter'),
        uuids               : require('./methods/uuids'),
        fileContent         : require('./methods/fileContent'),
        select              : require('./methods/select'),
        showArchived        : require('./methods/showArchived'),
        sort                : require('./methods/sort'),
        orderBy             : require('./methods/sort'), // alias for sort
        sortMode            : require('./methods/sortMode')
    })

    // Properties
    //
    .enclose(require('./query.params.js'))  // _params
    .enclose(require('./query.filter.js')); // _filter


module.exports = Query;
},{"./methods/fileContent":47,"./methods/filter":48,"./methods/getQueryParameters":49,"./methods/paging":50,"./methods/select":51,"./methods/showArchived":52,"./methods/sort":53,"./methods/sortMode":54,"./methods/uuids":55,"./query.filter.js":57,"./query.params.js":59,"stampit":"gaBrea"}],59:[function(require,module,exports){
/**
 * query.params
 * Date: 22.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , Is = require('../../../../tools').Is;

module.exports = function () {
    var that = this,
        _params = {};

    //TODO Проверить входные
    this.getParameter = function (name) {
        return _params[name];
    };

    this.getParameters = function () {
        return _params;
    };

    this.setParameter = function (name, value) {
        //TODO Ensure Object
        _params[name] = value;
    };

    this.setParameters = function (parameters) {
        //TODO Ensure Object
        _.extend(_params, parameters);
    };

    if (arguments[1]) {
        _.forOwn(arguments[1], function (value, key) {
            if (typeof that[key] === 'function') {
                that[key](value);
            }
        });
    }
};
},{"../../../../tools":90,"lodash":"EBUqFC"}],"project/default-auth":[function(require,module,exports){
module.exports=require('rUG5Il');
},{}],"rUG5Il":[function(require,module,exports){
/**
 * default browser auth (dummy)
 * Date: 23.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = null;
},{}],"Q962xy":[function(require,module,exports){
/**
 * Default Http request provider factory
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , callbackAdapter = require('./../../../tools/callbackAdapter')
  , log = require('project/logger');

var fetch = {

    fetch: function (options, callback) {

        var _options = {
            contentType: 'application/x-www-form-urlencoded',
            method: 'GET'
        };
        _.extend(_options, options);

        var xhr = new XMLHttpRequest()
          , response;

        xhr.open(_options.method, _options.url, !!_options.async);
        xhr.setRequestHeader('Content-Type', _options.contentType);

        _.forOwn(_options.headers, function (value, key) {
            xhr.setRequestHeader(key, value);
        });

        // Show request info
        log.info([
            'http',
            _options.method,
            _options.url
        ].join(' '));

        var getResult = function () {
            response = {
                headers: null,
                contentText: xhr.responseText,
                contentXml: xhr.responseXML,
                responseCode: (typeof xhr.status === 'number') ? xhr.status : parseInt(xhr.status.split('\n')[0]),
                responseCodeText: xhr.statusText
            };

            var result = {
                response: response,
                request: _options
            };

            log.info([
                'http',
                response.responseCode,
                _options.url,
                (new Date() - startTime) + 'ms ' + response.contentText.length + 'b'
            ].join(' '));

            return result;
        };

        var startTime = new Date();

        if (!!_options.async) {
            if (!callback) throw new Error('fetch: callback must be defined in async mode');
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                callback(null, getResult());
            };
            xhr.send(_options.payload);

        } else {
            xhr.send(_options.payload);
            return callbackAdapter(null, getResult(), callback);
        }
    }
};


module.exports = fetch;
},{"./../../../tools/callbackAdapter":89,"lodash":"EBUqFC","project/logger":"37nxtW"}],"project/fetch":[function(require,module,exports){
module.exports=require('Q962xy');
},{}],64:[function(require,module,exports){
/**
 * Context
 * Date: 28.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    create: function () {
        var map = require('project/mapping'),
            Jsonix = require('project/jsonix').Jsonix;

        return new Jsonix.Context([map]);
    }
};
},{"project/jsonix":65,"project/mapping":68}],65:[function(require,module,exports){
/**
 * Jsonix (node.js context)
 * Date: 13.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */


module.exports = require('../../../../vendor/jsonix');
},{"../../../../vendor/jsonix":91}],"project/logger":[function(require,module,exports){
module.exports=require('37nxtW');
},{}],"37nxtW":[function(require,module,exports){
/**
 * Logger (Browser context)
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var consoleLog = console.log,
    profilers = {};

function log(msg) {
    consoleLog.apply(console, arguments);
}

module.exports = {
    log: log,
    info: log,
    debug: log,
    time: function (name) {
        profilers[name] = +(new Date());
    },
    timeEnd: function (name) {
        if (profilers[name]) {
            var end = +(new Date());
            this.log(name + ': ' + ((new Date() - profilers[name])) + 'ms');
        }
    }
};
},{}],68:[function(require,module,exports){
/**
 * object mapping data factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

//TODO mapping объект, по хорошему, должен возвращатся внутри массива, т.к. возможно несколько пространств имен
// .. но так, как пока не предвидится что-то кроме "moysklad", оставим так.

module.exports = require('../../../../res/mapping');
},{"../../../../res/mapping":8}],69:[function(require,module,exports){
/**
 * marshaller factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    create: function () {

        var context = require('project/jsonix/context').create();

        return context.createMarshaller();   // JSON to XML
    }
};
},{"project/jsonix/context":64}],70:[function(require,module,exports){
/**
 * index
 * Date: 27.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var MoneyToStr = require('./../../../../vendor/moneytostr').MoneyToStr
  , Currency = require('./../../../../vendor/moneytostr').Currency
  , Language = require('./../../../../vendor/moneytostr').Language
  , Pennies = require('./../../../../vendor/moneytostr').Pennies;

var moneyToStrRUR;

module.exports = {
    //TODO Реализовать указание валюты (пока RUR)
    printAmount: function (value) {
        moneyToStrRUR = moneyToStrRUR || (new MoneyToStr(Currency.RUR, Language.RUS, Pennies.NUMBER));
        var moneyStr = moneyToStrRUR.convertValue(value);
        return moneyStr.slice(0, 1).toUpperCase() + moneyStr.slice(1);
    }
};
},{"./../../../../vendor/moneytostr":92}],71:[function(require,module,exports){
/**
 * clone
 * Date: 15.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var fieldsToReset = [
    'createdBy',
    'updated',
    'updatedBy',
    'uuid',
    'operationUuid'
];

var resetUuids = function (obj) {

    if (obj) {
        //TODO Может быть использовать _.omit, вместо обнуления полей?
        _.forEach(fieldsToReset, function (fieldName) {
            if (obj[fieldName]) obj[fieldName] = null;
        });

        for (var property in obj) {
            if (obj.hasOwnProperty(property) && typeof obj[property] === 'object') {
                resetUuids(obj[property]);
            }
        }
    }

    return obj;
};

/**
 * Клонирует объекты МойСклад
 * - используется стандартная процедура глубокого клонирования,
 * за тем исключением, что обнуляются идентификаторы объектов "uuid"
 *
 * @param obj Клонируемый объект
 */
var clone = function (obj) {

    if (obj) {
        //TODO Реализовать свой механизм клонирования (приходится два раза обходить гарф объекта)
        var cloned = _.cloneDeep(obj);

        return resetUuids(cloned);
    }

    return null;
};

module.exports = clone;
},{"lodash":"EBUqFC"}],72:[function(require,module,exports){
/**
 * createAttrValue
 * Date: 17.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Создает объект AttributeValue
 */
var createAttrValue = function () {

    var attributes = {},
        isSingleAttribute = false;

    // createAttributeValue(type, metadataUuid, value)
    if (arguments.length === 3) {
        attributes[arguments[1]] = [
            arguments[0], arguments[2]
        ];
        isSingleAttribute = true;
    }

    // createAttributeValue([
    //     [ type, metadataUuid, value ],
    //     ...
    // ])
    else if (arguments.length === 1 && arguments[0] instanceof Array) {
        _.forEach(arguments[0], function (attrInfo) {
            attributes[attrInfo[1]] = [ attrInfo[0], attrInfo[2] ]
        });
    }

    else {
        throw new Error('createAttributeValue: incorrect arguments');
    }

    var attributeValues = _.map(attributes, function (attributeValueData, metadataUuid) {

        var type    = attributeValueData[0],
            value   = attributeValueData[1];

        var attributeValue = {
            TYPE_NAME: 'moysklad.attributeValue',
            metadataUuid: metadataUuid
        };

        switch (type) {
            case 'Text':
            case 'Текст':
            case 'Link':
            case 'Ссылка':
                attributeValue.valueText = value;
                break;

            case 'String':
            case 'Строка':
                attributeValue.valueString = value;
                break;

            case 'Double':
            case 'Число дробное':
                attributeValue.doubleValue = value;
                break;

            case 'Long':
            case 'Число целое':
                attributeValue.longValue = value;
                break;

            case 'Boolean':
            case 'Флажок':
                attributeValue.booleanValue = value;
                break;

            case 'Date':
            case 'Дата':
                if (value) {
                    if (value instanceof Date && value !== Infinity)
                        attributeValue.timeValue = value;
                    else
                        throw new Error('createAttributeValue: value parameter must be instance of Date');
                } else {
                    return null;
                }
                break;

            case 'CustomEntity':
            case 'Справочник':
                attributeValue.entityValueUuid = value;
                break;

            /*case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;

             case '':
             attributeValue. = value;
             break;*/

            default:
                throw new Error('createAttributeValue: attribute type [' + type + '] not correct');
        }

        return attributeValue;
    });

    attributeValues = _.compact(attributeValues);

    return isSingleAttribute ? attributeValues[0] : attributeValues;
};

module.exports = createAttrValue;
},{"lodash":"EBUqFC"}],73:[function(require,module,exports){
/**
 * description
 * Date: 16.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var append = function (entity, message) {
    if (!message) return this;

    entity.description ?
        message = '\n\n' + message :
        entity.description = '';

    entity.description += message;

    return this;
};


var prepend = function (entity, message) {
    if (!message) return this;

    entity.description = entity.description ?
        message + '\n\n' + entity.description :
        message;

    return this;
};


function description (entity) {
    if (!entity) throw new Error('description: entity parameter not defined');

    var pub = {
        append: function (message) {
            return append.call(this, entity, message);
        },
        prepend: function (message) {
            return prepend.call(this, entity, message);
        },
        value: function () { return entity ? entity.description : null; }
    };

    return pub;
}

module.exports = description;
},{}],74:[function(require,module,exports){
/**
 * getAttribute
 * Date: 20.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Возвращает атрибут объекта. Если атрибут не определен, то пустой объект привязанный к сущности
 * (не использовать этот метод для проверки наличия атрибута!)
 *
 * @param entity
 * @param metadataUuid
 * @returns {{}}
 */
var getAttr = function (entity, metadataUuid) {
    var attribute,
        that = this;

    if (entity) {
        if (entity.attribute)
            attribute = _.find(entity.attribute, { metadataUuid: metadataUuid });

        if (!attribute) {
            attribute = {};
            attribute.metadataUuid = metadataUuid;
            entity.attribute = entity.attribute || [];
            entity.attribute.push(attribute);
        }

        return attribute;
    }

    return null;
};

module.exports = getAttr;
},{"lodash":"EBUqFC"}],75:[function(require,module,exports){
/**
 * getAttribute
 * Date: 01.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
    , getType = require('./getType');

var attributeValue = getType('attributeValue');

var attributeFields = _(attributeValue.propertyInfos)
    .map('name').pull('metadataUuid').value();

/*var attributeFields = [
 'valueText',
 'valueString',
 'doubleValue',
 'longValue',
 'booleanValue',
 'timeValue',
 'entityValueUuid',
 'agentValueUuid',
 'goodValueUuid',
 'placeValueUuid',
 'consignmentValueUuid',
 'contractValueUuid',
 'projectValueUuid',
 'employeeValueUuid'
 ];*/

/**
 * Получение значения аттрибута по metadataUuid
 * (осуществляется методом перебора возможных полей без дополнительной загрузки метаданных)
 * @param entity Сущность с аттрибутами
 * @param metadataUuid Идентификатор метаданных аттрибута
 * @returns {*}
 */
var getAttrValue = function (entity, metadataUuid) {

    var attribute = _.find(entity.attribute, { metadataUuid: metadataUuid });

    if (attribute) {
        var fieldName = _.find(attributeFields, function (fieldName) {
            return fieldName in attribute;
        });

        if (fieldName) return attribute[fieldName];
    }
};

module.exports = getAttrValue;
},{"./getType":80,"lodash":"EBUqFC"}],76:[function(require,module,exports){
/**
 * getPositions
 * Возвращает свойство с массивом позиций для указанного документа (полезно для унификации
 * доступа к позициям документа, т.к. для разных типов объектов наименование свойств с позициями различно)
 *
 * Date: 02.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , instanceOf = require('./instanceOf');

/**
 * Возвращает свойство с массивом позиций для указанного документа
 *
 * @param entity Сущность с аттрибутами
 * @returns Array
 */
var getPositions = function (entity) {

    if (instanceOf(entity, 'operationWithPositions')) {

        return _.find(entity, function (value, key) {
            return instanceOf(key, 'motion');
        })
    }

    return null;
};

module.exports = getPositions;
},{"./instanceOf":83,"lodash":"EBUqFC"}],77:[function(require,module,exports){
/**
 * getPrice
 * Date: 20.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Возвращает объект цены. Если цена не определена, то пустой объект уже привязанный к сущности
 *
 * @param entity
 * @param priceTypeUuid
 * @returns {{}}
 */
var getPrice = function (entity, priceTypeUuid) {

    if (entity) {
        var price = _.find(entity.salePrices, { priceTypeUuid: priceTypeUuid });

        if (!price) {
            price = {
                priceTypeUuid: priceTypeUuid,
                value: 0
            };
            entity.salePrices = entity.salePrices || [];
            entity.salePrices.push(price);
        }

        return price;
    }

    return null;
};

module.exports = getPrice;
},{"lodash":"EBUqFC"}],78:[function(require,module,exports){
/**
 * getPriceValue
 * Date: 01.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

/**
 * Получение значения цены по идентификатору типа цены
 * (осуществляется методом перебора возможных полей без дополнительной загрузки метаданных)
 * @param entity Сущность с аттрибутами
 * @param priceTypeUuid Идентификатор типа цены
 * @returns {*}
 */
var getPriceValue = function (entity, priceTypeUuid) {

    var price = _.find(entity.salePrices, { priceTypeUuid: priceTypeUuid });

    if (price) return price.value / 100;
};

module.exports = getPriceValue;
},{"lodash":"EBUqFC"}],79:[function(require,module,exports){
/**
 * getProperty
 * Date: 26.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var getProperty = function (entity, propertyName, defaultValue) {

    var chaines = propertyName.split('.'),
        i = 0,
        value = entity;

    while (i < chaines.length && !(value === undefined || value === null)) {
        value = value[chaines[i]];
        i++;
    }

    return defaultValue && (value === undefined || value === null || value === Infinity) ?
        defaultValue : value;
};


module.exports = getProperty;
},{}],80:[function(require,module,exports){
/**
 * getType
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , typeInfos;


var typeInfosScopeMap = {};

var getType = function(typeName) {
    typeInfos = typeInfos || require('project/mapping').typeInfos;

    if (!typeInfosScopeMap[typeName]) {
        var type = _.find(typeInfos, { localName: typeName });
        if (type) {
            typeInfosScopeMap[typeName] = type;
            if (type.baseTypeInfo) {
                type.baseTypeInfo = getType(type.baseTypeInfo.split('.')[1])
            }
        }
    }
    return typeInfosScopeMap[typeName];
};

module.exports = getType;
},{"lodash":"EBUqFC","project/mapping":68}],81:[function(require,module,exports){
/**
 * getTypeName
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

/**
 * Возвращает тип объекта с большой буквы
 * (напр. "moysklad.customerOrder" -> "CustomerOrder")
 * @param {Object|String} obj Объект МойСклад или строка наименование класса
 * @returns {String|null}
 */
var getUriTypeName = function (obj) {
    var typeName;

    if (typeof obj === 'object' && obj.TYPE_NAME) {
        typeName = obj.TYPE_NAME.split('.')[1];

    } else if (typeof obj === 'string') {
        typeName = obj;
    }

    if (typeName)
        return typeName.charAt(0).toUpperCase() + typeName.substring(1);

    return null;
};

module.exports = getUriTypeName;
},{}],82:[function(require,module,exports){
/**
 * index
 * Date: 14.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {

    getUriTypeName          : require('./getUriTypeName'),
    getAttr                 : require('./getAttr'),
    getAttrValue            : require('./getAttrValue'),
    getPrice                : require('./getPrice'),
    getPriceValue           : require('./getPriceValue'),
    createAttributeValue    : require('./createAttrValue'), // deprecated
    createAttrValue         : require('./createAttrValue'),
    getPositions            : require('./getPositions'),
    getType                 : require('./getType'),
    getProperty             : require('./getProperty'),
    instanceOf              : require('./instanceOf'),
    clone                   : require('./clone'),
    reserve                 : require('./reserve'),
    description             : require('./description'),

    format: {
        printAmount          : require('./../moneytostr').printAmount
    }

    //:              require('./'),
    //:              require('./'),
    //:              require('./'),
    //:              require('./'),
    //:              require('./'),
};
},{"./../moneytostr":70,"./clone":71,"./createAttrValue":72,"./description":73,"./getAttr":74,"./getAttrValue":75,"./getPositions":76,"./getPrice":77,"./getPriceValue":78,"./getProperty":79,"./getType":80,"./getUriTypeName":81,"./instanceOf":83,"./reserve":84}],83:[function(require,module,exports){
/**
 * instanceOf
 * Date: 29.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , getType = require('./getType');


var isInstanceOf = function (entityType, superType) {
    var type = getType(entityType);
    if (type) 
        return type.localName == superType ?
            true :
            (type.baseTypeInfo ? isInstanceOf(type.baseTypeInfo.localName, superType) : false);
    else 
        return false;
};

/**
 *
 * @param {Object | String} entity
 * @param {String} typeName
 */
var instanceOf = function (entity, typeName) {

    var entityType = entity.TYPE_NAME || entity;

    if (typeof entityType === 'string') {
        // moysklad.{type}
        entityType = entityType.indexOf('.') != -1 ?
            entityType.split('.')[1] : entityType;

        return isInstanceOf(entityType, typeName);
    }

    return false;
};

module.exports = instanceOf;
},{"./getType":80,"lodash":"EBUqFC"}],84:[function(require,module,exports){
/**
 * reserve
 * Date: 16.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash')
  , instanceOf = require('./instanceOf')
  , getPositions = require('./getPositions');

var reserve = function (order) {
    // Резерв только для заказов
    if (instanceOf(order, 'order')) {

        _.forEach(getPositions(order), function (position) {
            position.reserve = position.quantity;
        });

        order.reservedSum = order.sum.sum;
    }
};

module.exports = reserve;
},{"./getPositions":76,"./instanceOf":83,"lodash":"EBUqFC"}],85:[function(require,module,exports){
/**
 * unmarshaller factory
 * Date: 14.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    create: function () {
        var context = require('project/jsonix/context').create();
        return context.createUnmarshaller();   // XML to JSON
    }
};
},{"project/jsonix/context":64}],"xmldom":[function(require,module,exports){
module.exports=require('JFUvMs');
},{}],"JFUvMs":[function(require,module,exports){
/**
 * browser
 * Date: 02.07.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = {
    DOMParser: DOMParser,

    DOMImplementation: function() {
        this.createDocument = function () {
            return document.implementation.createDocument('', '', null);
        };
        return this;
    },

    XMLSerializer: XMLSerializer
};
},{}],88:[function(require,module,exports){
/**
 * providerAccessor
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _providersConstructors = {
    // Получаю модули не динамически, иначе сборщик не увидит модуль
    'ms-xml'        : require('./moysklad-client/rest-clients/ms-xml'),
    'json-services' : require('./moysklad-client/rest-clients/json')
} ;

var requireProviderCtor = function (name) {
    return _providersConstructors[name];
};

/** @class */
var ProviderAccessor = function () {
    var _providers = {};

    this.getProvider = function (name) {

        if (!_providers[name]) {
            var providerCtor = requireProviderCtor(name);

            if (typeof providerCtor == 'function')
                _providers[name] = providerCtor.create(null, this);

            /*else if (typeof providerCtor == 'object')
             providers[name] = providerCtor;*/

            else
            //TODO Нужна ли ошибка при отсутствии провайдера?
            //throw new Error('Provider [' + name + '] not found.');
                return null;
        }

        return _providers[name];
    };

    this.setProvider = function (name, provider) {

        if (name && provider) _providers[name] = provider;
        return this;
    }
};

module.exports = ProviderAccessor;
},{"./moysklad-client/rest-clients/json":33,"./moysklad-client/rest-clients/ms-xml":40}],89:[function(require,module,exports){
/**
 * callbackAdapter
 * Date: 03.04.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var callbackAdapter = function (err, data, callback) {
    if (callback) {
        return callback(err, data);

    } else {
        if (err)
            throw err;
        else
            return data;
    }
};

module.exports = callbackAdapter;

},{}],90:[function(require,module,exports){
/**
 * Common Tools
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

//TODO Разнести по отдельным модулям

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

var Base64 = {

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //метод для кодировки в base64 на javascript
    encode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    //метод для раскодировки из base64
    decode: function (input) {
        var Base64 = this;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },

    // метод для кодировки в utf8
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;

    },

    //метод для раскодировки из urf8
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c, c2, c3; // mvv: c1 not used
        c = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

};

//exports.fetch = require('project/fetch');

exports.Base64 = Base64;

exports.getBasicAuthHttpHeader = function (login, password) {

    // TODO Надо подумать как лучше переключать функции в зависимости от среды исполнения
    return "Basic " + Base64.encode(login + ":" + password);

};

exports.callbackAdapter = require('./callbackAdapter');

exports.Is = {
    'args': function () {
        var args = arguments[0],
            condition = Array.prototype.slice.call(arguments, -(arguments.length - 1));

        if (args.length == condition.length) {
            for (var i = 0, l = args.length; i < l; i++) {
                if (typeof condition[i] === 'string') {
                    if (typeof args[i] !== condition[i]) return false;

                } else if (condition[i] && condition[i].isMoment && typeof condition[i].isMoment === 'function') {
                    if (!condition[i].isMoment(args[i])) return false;

                } else {
                    if (!(args[i] instanceof condition[i])) return false;
                }
            }
            return true;
        }
        return false;
    },
    'exists': function (value) {
        return (typeof value !== 'undefined' && value !== null);
    },
    'object': function (value) {
        return typeof value === 'object';
    },
    'numberNotNaN': function (value) {
        return (typeof value === 'number') && !isNaN(value);
    },
    'integer': function (value) {
        return _.isNumber(value) && ((value % 1) === 0);
    },
    'uuid': function (value) {
        return UUID_REGEX.test(value);
    }
};

//TODO Сформировать эту структуру динамически
exports.Ensure = {
    'ensure': function (value, message, test, callback) {
        var isTest = test(value);
        if (!isTest) {
            var err = new Error(message.replace('%value', value, 'gi'));
            if (_.isFunction(callback)) callback(err);
            else throw err;
        }
        return isTest;
    },
    'boolean': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isBoolean, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a boolean.', _.isBoolean, arguments[1]);
        }
    },
    'string': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isString, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a string.', _.isString, arguments[1]);
        }
    },
    'uuid': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.uuid, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be uuid format.', exports.Is.uuid, arguments[1]);
        }
    },
    'numberNotNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.numberNotNaN, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number (not NaN).', exports.Is.numberNotNaN, arguments[1]);
        }
    },
    'numberOrNaN': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isNumber, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a number or NaN.', _.isNumber, arguments[1]);
        }
    },
    'integer': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.integer, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an integer.', exports.Is.integer, arguments[1]);
        }
    },
    'date': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isDate, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a date.', _.isDate, arguments[1]);
        }
    },
    'object': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.object, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an object.', exports.Is.object, arguments[1]);
        }
    },
    'array': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isArray, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be an array.', _.isArray, arguments[1]);
        }
    },
    'function': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], _.isFunction, arguments[2]);
        } else {
            return this.ensure(value, 'Argument [%value] must be a function.', _.isFunction, arguments[1]);
        }
    },
    'exists': function (value) {
        if (_.isString(arguments[1])) {
            return this.ensure(value, arguments[1], exports.Is.exists, arguments[2]);
        } else {
            return this.ensure(value, 'Argument does not exist.', exports.Is.exists, arguments[1]);
        }
    }
};
},{"./callbackAdapter":89,"lodash":"EBUqFC"}],91:[function(require,module,exports){
/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010 - 2014, Alexey Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Alexey Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEXEY VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var Jsonix = {
	singleFile : true
};

// Node.js
if(typeof require === 'function'){
	module.exports.Jsonix = Jsonix;
}

Jsonix.Util = {};

Jsonix.Util.extend = function(destination, source) {
	destination = destination || {};
	if (source) {
		/*jslint forin: true */
		for ( var property in source) {
			var value = source[property];
			if (value !== undefined) {
				destination[property] = value;
			}
		}

		/**
		 * IE doesn't include the toString property when iterating over an
		 * object's properties with the for(property in object) syntax.
		 * Explicitly check if the source has its own toString property.
		 */

		/*
		 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
		 * prototype object" when calling hawOwnProperty if the source object is
		 * an instance of window.Event.
		 */

		// REWORK
		// Node.js
		var sourceIsEvt = typeof window !== 'undefined' && window !== null && typeof window.Event == "function" && source instanceof window.Event;

		if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
			destination.toString = source.toString;
		}
	}
	return destination;
};
Jsonix.Class = function() {
	var Class = function() {
		this.initialize.apply(this, arguments);
	};
	var extended = {};
	var empty = function() {
	};
	var parent, initialize, Type;
	for ( var i = 0, len = arguments.length; i < len; ++i) {
		Type = arguments[i];
		if (typeof Type == "function") {
			// make the class passed as the first argument the superclass
			if (i === 0 && len > 1) {
				initialize = Type.prototype.initialize;
				// replace the initialize method with an empty function,
				// because we do not want to create a real instance here
				Type.prototype.initialize = empty;
				// the line below makes sure that the new class has a
				// superclass
				extended = new Type();
				// restore the original initialize method
				if (initialize === undefined) {
					delete Type.prototype.initialize;
				} else {
					Type.prototype.initialize = initialize;
				}
			}
			// get the prototype of the superclass
			parent = Type.prototype;
		} else {
			// in this case we're extending with the prototype
			parent = Type;
		}
		Jsonix.Util.extend(extended, parent);
	}
	Class.prototype = extended;
	return Class;
};

Jsonix.XML = {};


Jsonix.DOM = {
	createDocument : function() {
		// REWORK
		// Node.js
		if (typeof require === 'function')
		{
			return new (require('xmldom').DOMImplementation)().createDocument();
		} else if (typeof document !== 'undefined' && Jsonix.Util.Type.exists(document.implementation) && Jsonix.Util.Type.isFunction(document.implementation.createDocument)) {
			return document.implementation.createDocument('', '', null);
		} else if (typeof ActiveXObject !== 'undefined') {
			return new ActiveXObject('MSXML2.DOMDocument');
		} else {
			throw new Error('Error created the DOM document.');
		}
	},
	serialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		// REWORK
		// Node.js
		if (typeof require === 'function')
		{
			return (new (require('xmldom')).XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(XMLSerializer)) {
			return (new XMLSerializer()).serializeToString(node);
		} else if (Jsonix.Util.Type.exists(node.xml)) {
			return node.xml;
		} else {
			throw new Error('Could not serialize the node, neither XMLSerializer nor the [xml] property were found.');
		}
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureExists(text);
		if (typeof require === 'function')
		{
			return (new (require('xmldom')).DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof DOMParser != 'undefined') {
			return (new DOMParser()).parseFromString(text, 'application/xml');
		} else if (typeof ActiveXObject != 'undefined') {
			var doc = Jsonix.DOM.createDocument('', '');
			doc.loadXML(text);
			return doc;
		} else {
			var url = 'data:text/xml;charset=utf-8,' + encodeURIComponent(text);
			var request = new XMLHttpRequest();
			request.open('GET', url, false);
			if (request.overrideMimeType) {
				request.overrideMimeType("text/xml");
			}
			request.send(null);
			return request.responseXML;
		}
	},
	load : function(url, callback, options) {

		var request = Jsonix.Request.INSTANCE;

		request.issue(
						url,
						function(transport) {
							var result;
							if (Jsonix.Util.Type.exists(transport.responseXML) && Jsonix.Util.Type.exists(transport.responseXML.documentElement)) {
								result = transport.responseXML;
							} else if (Jsonix.Util.Type.isString(transport.responseText)) {
								result = Jsonix.DOM.parse(transport.responseText);
							} else {
								throw new Error('Response does not have valid [responseXML] or [responseText].');
							}
							callback(result);

						}, function(transport) {
							throw new Error('Could not retrieve XML from URL [' + url	+ '].');

						}, options);
	}
};
Jsonix.Request = Jsonix
		.Class({
			// REWORK
			factories : [ function() {
				return new XMLHttpRequest();
			}, function() {
				return new ActiveXObject('Msxml2.XMLHTTP');
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}, function() {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}, function() {
				return new ActiveXObject('Microsoft.XMLHTTP');
			}, function() {
				// Node.js
				if (typeof require === 'function')
				{
					var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
					return new XMLHttpRequest();
				}
				else
				{
					return null;
				}
			}],
			initialize : function() {
			},
			issue : function(url, onSuccess, onFailure, options) {
				Jsonix.Util.Ensure.ensureString(url);
				if (Jsonix.Util.Type.exists(onSuccess)) {
					Jsonix.Util.Ensure.ensureFunction(onSuccess);
				} else {
					onSuccess = function() {
					};
				}
				if (Jsonix.Util.Type.exists(onFailure)) {
					Jsonix.Util.Ensure.ensureFunction(onFailure);
				} else {
					onFailure = function() {
					};
				}
				if (Jsonix.Util.Type.exists(options)) {
					Jsonix.Util.Ensure.ensureObject(options);
				} else {
					options = {};
				}

				var transport = this.createTransport();

				var method = Jsonix.Util.Type.isString(options.method) ? options.method
						: 'GET';
				var async = Jsonix.Util.Type.isBoolean(options.async) ? options.async
						: true;
				var proxy = Jsonix.Util.Type.isString(options.proxy) ? options.proxy
						: Jsonix.Request.PROXY;

				var user = Jsonix.Util.Type.isString(options.user) ? options.user
						: null;
				var password = Jsonix.Util.Type.isString(options.password) ? options.password
						: null;

				if (Jsonix.Util.Type.isString(proxy) && (url.indexOf("http") === 0)) {
					url = proxy + encodeURIComponent(url);
				}

				if (Jsonix.Util.Type.isString(user)) {
					transport.open(method, url, async, user, password);
				} else {
					transport.open(method, url, async);
				}

				if (Jsonix.Util.Type.isObject(options.headers)) {

					for ( var header in options.headers) {
						if (options.headers.hasOwnProperty(header)) {
							transport.setRequestHeader(header,
									options.headers[header]);
						}
					}
				}

				var data = Jsonix.Util.Type.exists(options.data) ? options.data
						: null;
				if (!async) {
					transport.send(data);
					this.handleTransport(transport, onSuccess, onFailure);
				} else {
					var that = this;
					if (typeof window !== 'undefined') {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess,
									onFailure);
						};

						window.setTimeout(function() {
							transport.send(data);
						}, 0);
					} else {

						transport.onreadystatechange = function() {
							that.handleTransport(transport, onSuccess, onFailure);
						};
						console.log('Sending.');
						transport.send(data);
					}
				}
				return transport;

			},
			handleTransport : function(transport, onSuccess, onFailure) {
				if (transport.readyState == 4) {
					if (!transport.status || (transport.status >= 200 && transport.status < 300)) {
						onSuccess(transport);
					}
					if (transport.status && (transport.status < 200 || transport.status >= 300)) {
						onFailure(transport);
					}
				}
			},
			createTransport : function() {
				for ( var index = 0, length = this.factories.length; index < length; index++) {
					try {
						var transport = this.factories[index]();
						if (transport !== null) {
							return transport;
						}
					} catch (e) {
						// TODO log
					}
				}
				throw new Error('Could not create XML HTTP transport.');
			},
			CLASS_NAME : 'Jsonix.Request'
		});
Jsonix.Request.INSTANCE = new Jsonix.Request();
Jsonix.Request.PROXY = null;
Jsonix.Schema = {};
Jsonix.Model = {};
Jsonix.Util.Type = {
	exists : function(value) {
		return (typeof value !== 'undefined' && value !== null);
	},
	isString : function(value) {
		return typeof value === 'string';
	},
	isBoolean : function(value) {
		return typeof value === 'boolean';
	},
	isObject : function(value) {
		return typeof value === 'object';
	},
	isFunction : function(value) {
		return typeof value === 'function';
	},
	isNumber : function(value) {
		return (typeof value === 'number') && !isNaN(value);
	},
	isNumberOrNaN : function(value) {
		return (value === +value) || (Object.prototype.toString.call(value) === '[object Number]');
	},
	isNaN : function(value) {
		return Jsonix.Util.Type.isNumberOrNaN(value) && isNaN(value);
	},
	isArray : function(value) {
		// return value instanceof Array;
		return !!(value && value.concat && value.unshift && !value.callee);
	},
	isDate : function(value) {
		return !!(value && value.getTimezoneOffset && value.setUTCFullYear);
	},
	isRegExp : function(value) {
		return !!(value && value.test && value.exec && (value.ignoreCase || value.ignoreCase === false));
	},
	isEqual : function(a, b, report) {
		var doReport = Jsonix.Util.Type.isFunction(report);
		// TODO rework
		var _range = function(start, stop, step) {
			var args = slice.call(arguments);
			var solo = args.length <= 1;
			var start_ = solo ? 0 : args[0];
			var stop_ = solo ? args[0] : args[1];
			var step_ = args[2] || 1;
			var len = Math.max(Math.ceil((stop_ - start_) / step_), 0);
			var idx = 0;
			var range = new Array(len);
			while (idx < len) {
				range[idx++] = start_;
				start_ += step_;
			}
			return range;
		};

		var _keys = Object.keys || function(obj) {
			if (Jsonix.Util.Type.isArray(obj)) {
				return _range(0, obj.length);
			}
			var keys = [];
			for ( var key in obj) {
				if (obj.hasOwnProperty(key)) {
					keys[keys.length] = key;
				}
			}
			return keys;
		};

		// Check object identity.
		if (a === b) {
			return true;
		}

		// Check if both are NaNs
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return true;
		}
		// Different types?
		var atype = typeof a;
		var btype = typeof b;
		if (atype != btype) {
			if (doReport) {
				report('Types differ [' + atype + '], [' + btype + '].');
			}
			return false;
		}
		// Basic equality test (watch out for coercions).
		if (a == b) {
			return true;
		}
		// One is falsy and the other truthy.
		if ((!a && b) || (a && !b)) {
			if (doReport) {
				report('One is falsy, the other is truthy.');
			}
			return false;
		}
		// Check dates' integer values.
		if (Jsonix.Util.Type.isDate(a) && Jsonix.Util.Type.isDate(b)) {
			return a.getTime() === b.getTime();
		}
		// Both are NaN?
		if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
			return false;
		}
		// Compare regular expressions.
		if (Jsonix.Util.Type.isRegExp(a) && Jsonix.Util.Type.isRegExp(b)) {
			return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
		}
		// If a is not an object by this point, we can't handle it.
		if (atype !== 'object') {
			return false;
		}
		// Check for different array lengths before comparing contents.
		if (a.length && (a.length !== b.length)) {
			if (doReport) {
					report('Lengths differ.');
					report('A.length=' + a.length);
					report('B.length=' + b.length);
			}
			return false;
		}
		// Nothing else worked, deep compare the contents.
		var aKeys = _keys(a);
		var bKeys = _keys(b);
		// Different object sizes?
		if (aKeys.length != bKeys.length) {
			if (doReport) {
				report('Different number of properties [' + aKeys.length + '], [' + bKeys.length + '].');
			}
			for ( var andex = 0; andex < aKeys.length; andex++) {
				if (doReport) {
					report('A [' + aKeys[andex] + ']=' + a[aKeys[andex]]);
				}
			}
			for ( var bndex = 0; bndex < bKeys.length; bndex++) {
				if (doReport) {
					report('B [' + bKeys[bndex] + ']=' + b[bKeys[bndex]]);
				}
			}
			return false;
		}
		// Recursive comparison of contents.
		for (var kndex = 0; kndex < aKeys.length; kndex++) {
			var key = aKeys[kndex];
			if (!(key in b) || !Jsonix.Util.Type.isEqual(a[key], b[key], report)) {
				if (doReport) {
					report('One of the properties differ.');
					report('Key: [' + key + '].');
					report('Left: [' + a[key] + '].');
					report('Right: [' + b[key] + '].');
				}
				return false;
			}
		}
		return true;
	}
};
Jsonix.Util.NumberUtils = {
	isInteger : function(value) {
		return Jsonix.Util.Type.isNumber(value) && ((value % 1) === 0);
	}
};
Jsonix.Util.StringUtils = {
	trim : (!!String.prototype.trim) ?
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.trim();
	} :
	function(str) {
		Jsonix.Util.Ensure.ensureString(str);
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	/* isEmpty : function(str) {
		var wcm = Jsonix.Util.StringUtils.whitespaceCharactersMap;
		for (var index = 0; index < str.length; index++)
		{
			if (!wcm[str[index]])
			{
				return false;
			}
		}
		return true;
	}, */
	isEmpty : function(str) {
		var length = str.length;
		if (!length) {
			return true;
		}
		for (var index = 0; index < length; index++)
		{
			var c = str[index];
			if (c === ' ')
			{
				// skip
			}
			else if (c > '\u000D' && c < '\u0085')
			{
				return false;
			}
			else if (c < '\u00A0')
			{
				if (c < '\u0009')
				{
					return false;
				}
				else if (c > '\u0085')
				{
					return false;
				}
			}
			else if (c > '\u00A0')
			{
				if (c < '\u2028')
				{
					if (c < '\u180E')
					{
						if (c < '\u1680')
						{
							return false;
						}
						else if(c > '\u1680')
						{
							return false;
						}
					}
					else if (c > '\u180E')
					{
						if (c < '\u2000')
						{
							return false;
						}
						else if (c > '\u200A')
						{
							return false;
						}
					}
				}
				else if (c > '\u2029')
				{
					if (c < '\u205F')
					{
						if (c < '\u202F')
						{
							return false;
						}
						else if (c > '\u202F')
						{
							return false;
						}
					}
					else if (c > '\u205F')
					{
						if (c < '\u3000')
						{
							return false;
						}
						else if (c > '\u3000')
						{
							return false;
						}
					}
				}
			}
		}
		return true;
	},
	isNotBlank : function(str) {
		return Jsonix.Util.Type.isString(str) && !Jsonix.Util.StringUtils.isEmpty(str);
	},
	whitespaceCharacters: '\u0009\u000A\u000B\u000C\u000D \u0085\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000',
	whitespaceCharactersMap: {
		'\u0009' : true,
		'\u000A' : true,
		'\u000B' : true,
		'\u000C' : true,
		'\u000D' : true,
		' ' : true,
		'\u0085' : true,
		'\u00A0' : true,
		'\u1680' : true,
		'\u180E' : true,
		'\u2000' : true,
		'\u2001' : true,
		'\u2002' : true,
		'\u2003' : true,
		'\u2004' : true,
		'\u2005' : true,
		'\u2006' : true,
		'\u2007' : true,
		'\u2008' : true,
		'\u2009' : true,
		'\u200A' : true,
		'\u2028' : true,
		'\u2029' : true,
		'\u202F' : true,
		'\u205F' : true,
		'\u3000' : true
	},
	splitBySeparatorChars : function(str, separatorChars) {
		Jsonix.Util.Ensure.ensureString(str);
		Jsonix.Util.Ensure.ensureString(separatorChars);
		var len = str.length;
		if (len === 0) {
			return [];
		}
		if (separatorChars.length === 1)
		{
			return str.split(separatorChars);
		}
		else
		{
			var list = [];
			var sizePlus1 = 1;
			var i = 0;
			var start = 0;
			var match = false;
			var lastMatch = false;
			var max = -1;
			var preserveAllTokens = false;
			// standard case
				while (i < len) {
						if (separatorChars.indexOf(str.charAt(i)) >= 0) {
								if (match || preserveAllTokens) {
										lastMatch = true;
										if (sizePlus1++ == max) {
												i = len;
												lastMatch = false;
										}
										list.push(str.substring(start, i));
										match = false;
								}
								start = ++i;
								continue;
						}
						lastMatch = false;
						match = true;
						i++;
				}
				if (match || (preserveAllTokens && lastMatch)) {
					list.push(str.substring(start, i));
			}
			return list;
		}
	}
};
Jsonix.Util.Ensure = {
	ensureBoolean : function(value) {
		if (!Jsonix.Util.Type.isBoolean(value)) {
			throw new Error('Argument [' + value + '] must be a boolean.');
		}
	},
	ensureString : function(value) {
		if (!Jsonix.Util.Type.isString(value)) {
			throw new Error('Argument [' + value + '] must be a string.');
		}
	},
	ensureNumber : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument [' + value + '] must be a number.');
		}
	},
	ensureNumberOrNaN : function(value) {
		if (!Jsonix.Util.Type.isNumberOrNaN(value)) {
			throw new Error('Argument [' + value + '] must be a number or NaN.');
		}
	},
	ensureInteger : function(value) {
		if (!Jsonix.Util.Type.isNumber(value)) {
			throw new Error('Argument must be an integer, but it is not a number.');
		} else if (!Jsonix.Util.NumberUtils.isInteger(value)) {
			throw new Error('Argument [' + value + '] must be an integer.');
		}
	},
	ensureDate : function(value) {
		if (!(value instanceof Date)) {
			throw new Error('Argument [' + value + '] must be a date.');
		}
	},
	ensureObject : function(value) {
		if (!Jsonix.Util.Type.isObject(value)) {
			throw new Error('Argument [' + value + '] must be an object.');
		}
	},
	ensureArray : function(value) {
		if (!Jsonix.Util.Type.isArray(value)) {
			throw new Error('Argument [' + value + '] must be an array.');
		}
	},
	ensureFunction : function(value) {
		if (!Jsonix.Util.Type.isFunction(value)) {
			throw new Error('Argument [' + value + '] must be a function.');
		}
	},
	ensureExists : function(value) {
		if (!Jsonix.Util.Type.exists(value)) {
			throw new Error('Argument [' + value + '] does not exist.');
		}
	}
};
Jsonix.XML.QName = Jsonix.Class({
	key : null,
	namespaceURI : null,
	localPart : null,
	prefix : null,
	string : null,
	initialize : function(one, two, three) {
		var namespaceURI;
		var localPart;
		var prefix;
		var key;
		var string;

		if (!Jsonix.Util.Type.exists(two)) {
			namespaceURI = '';
			localPart = one;
			prefix = '';
		} else if (!Jsonix.Util.Type.exists(three)) {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			var colonPosition = two.indexOf(':');
			if (colonPosition > 0 && colonPosition < two.length) {
				prefix = two.substring(0, colonPosition);
				localPart = two.substring(colonPosition + 1);
			} else {
				prefix = '';
				localPart = two;
			}
		} else {
			namespaceURI = Jsonix.Util.Type.exists(one) ? one : '';
			localPart = two;
			prefix = Jsonix.Util.Type.exists(three) ? three : '';
		}
		this.namespaceURI = namespaceURI;
		this.localPart = localPart;
		this.prefix = prefix;

		this.key = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + localPart;
		this.string = (namespaceURI !== '' ? ('{' + namespaceURI + '}') : '') + (prefix !== '' ? (prefix + ':') : '') + localPart;
	},
	toString : function() {
		return this.string;
	},
	clone : function() {
		return new Jsonix.XML.QName(this.namespaceURI, this.localPart, this.prefix);
	},
	equals : function(that) {
		if (!that) {
			return false;
		} else {
			return (this.namespaceURI == that.namespaceURI) && (this.localPart == that.localPart);
		}

	},
	CLASS_NAME : "Jsonix.XML.QName"
});
Jsonix.XML.QName.fromString = function(qNameAsString) {
	var leftBracket = qNameAsString.indexOf('{');
	var rightBracket = qNameAsString.lastIndexOf('}');
	var namespaceURI;
	var prefixedName;
	if ((leftBracket === 0) && (rightBracket > 0) && (rightBracket < qNameAsString.length)) {
		namespaceURI = qNameAsString.substring(1, rightBracket);
		prefixedName = qNameAsString.substring(rightBracket + 1);
	} else {
		namespaceURI = '';
		prefixedName = qNameAsString;
	}
	var colonPosition = prefixedName.indexOf(':');
	var prefix;
	var localPart;
	if (colonPosition > 0 && colonPosition < prefixedName.length) {
		prefix = prefixedName.substring(0, colonPosition);
		localPart = prefixedName.substring(colonPosition + 1);
	} else {
		prefix = '';
		localPart = prefixedName;
	}
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.QName') {
		return object;
	}
	Jsonix.Util.Ensure.ensureString(object.localPart);
	var namespaceURI = Jsonix.Util.Type.isString(object.namespaceURI) ? object.namespaceURI : '';
	var localPart = object.localPart;
	var prefix = Jsonix.Util.Type.isString(object.prefix) ? object.prefix : '';
	return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};
Jsonix.XML.QName.key = function(namespaceURI, localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	if (namespaceURI) {
		var colonPosition = localPart.indexOf(':');
		if (colonPosition > 0 && colonPosition < localPart.length) {
			localName = localPart.substring(colonPosition + 1);
		} else {
			localName = localPart;
		}
		return '{' + namespaceURI + '}' + localName;
	} else {
		return localPart;
	}
};
Jsonix.XML.Calendar = Jsonix.Class({
	year : NaN,
	month : NaN,
	day : NaN,
	hour : NaN,
	minute : NaN,
	second : NaN,
	fractionalSecond : NaN,
	timezone : NaN,
	initialize : function(data) {
		Jsonix.Util.Ensure.ensureObject(data);
		// Year
		if (Jsonix.Util.Type.exists(data.year)) {
			Jsonix.Util.Ensure.ensureInteger(data.year);
			if (data.year >= -9999 && data.year <= 9999) {
				this.year = data.year;
			} else {
				throw new Error('Invalid year [' + data.year + '].');
			}

		} else {
			this.year = NaN;
		}
		// Month
		if (Jsonix.Util.Type.exists(data.month)) {
			Jsonix.Util.Ensure.ensureInteger(data.month);
			if (data.month >= 1 && data.month <= 12) {
				this.month = data.month;
			} else {
				throw new Error('Invalid month [' + data.month + '].');
			}

		} else {
			this.month = NaN;
		}
		// Day
		if (Jsonix.Util.Type.exists(data.day)) {
			Jsonix.Util.Ensure.ensureInteger(data.day);
			if (data.day >= 1 && data.day <= 31) {
				this.day = data.day;
			} else {
				throw new Error('Invalid day [' + data.day + '].');
			}

		} else {
			this.day = NaN;
		}
		// Hour
		if (Jsonix.Util.Type.exists(data.hour)) {
			Jsonix.Util.Ensure.ensureInteger(data.hour);
			if (data.hour >= 0 && data.hour <= 23) {
				this.hour = data.hour;
			} else {
				throw new Error('Invalid hour [' + data.hour + '].');
			}

		} else {
			this.hour = NaN;
		}
		// Minute
		if (Jsonix.Util.Type.exists(data.minute)) {
			Jsonix.Util.Ensure.ensureInteger(data.minute);
			if (data.minute >= 0 && data.minute <= 59) {
				this.minute = data.minute;
			} else {
				throw new Error('Invalid minute [' + data.minute + '].');
			}

		} else {
			this.minute = NaN;
		}
		// Second
		if (Jsonix.Util.Type.exists(data.second)) {
			Jsonix.Util.Ensure.ensureInteger(data.second);
			if (data.second >= 0 && data.second <= 59) {
				this.second = data.second;
			} else {
				throw new Error('Invalid second [' + data.second + '].');
			}

		} else {
			this.second = NaN;
		}
		// Fractional second
		if (Jsonix.Util.Type.exists(data.fractionalSecond)) {
			Jsonix.Util.Ensure.ensureNumber(data.fractionalSecond);
			if (data.fractionalSecond >= 0 && data.fractionalSecond < 1) {
				this.fractionalSecond = data.fractionalSecond;
			} else {
				throw new Error('Invalid fractional second [' + data.fractionalSecond + '].');
			}

		} else {
			this.fractionalSecond = NaN;
		}
		// Timezone
		if (Jsonix.Util.Type.exists(data.timezone)) {
			if (Jsonix.Util.Type.isNaN(data.timezone)) {
				this.timezone = NaN;
			} else {
				Jsonix.Util.Ensure.ensureInteger(data.timezone);
				if (data.timezone >= -1440 && data.timezone < 1440) {
					this.timezone = data.timezone;
				} else {
					throw new Error('Invalid timezone [' + data.timezone + '].');
				}
			}
		} else {
			this.timezone = NaN;
		}
	},
	CLASS_NAME : "Jsonix.XML.Calendar"
});
Jsonix.XML.Calendar.fromObject = function(object) {
	Jsonix.Util.Ensure.ensureObject(object);
	if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === 'Jsonix.XML.Calendar') {
		return object;
	}
	return new Jsonix.XML.Calendar(object);
};
Jsonix.XML.Input = Jsonix.Class({
	root : null,
	node : null,
	attributes : null,
	eventType : null,
	initialize : function(node) {
		Jsonix.Util.Ensure.ensureExists(node);
		this.root = node;
	},
	hasNext : function() {
		// No current node, we've not started yet
		if (this.node === null) {
			return true;
		} else if (this.node === this.root) {
			var nodeType = this.node.nodeType;
			// Root node is document, last event type is END_DOCUMENT
			if (nodeType === 9 && this.eventType === 8) {
				return false;
			}
			// Root node is element, last event type is END_ELEMENT
			else if (nodeType === 1 && this.eventType === 2) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
	next : function() {
		if (this.eventType === null) {
			return this.enter(this.root);
		}
		// START_DOCUMENT
		if (this.eventType === 7) {
			var documentElement = this.node.documentElement;
			if (documentElement) {
				return this.enter(documentElement);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 1) {
			var firstChild = this.node.firstChild;
			if (firstChild) {
				return this.enter(firstChild);
			} else {
				return this.leave(this.node);
			}
		} else if (this.eventType === 2) {
			var nextSibling = this.node.nextSibling;
			if (nextSibling) {
				return this.enter(nextSibling);
			} else {
				return this.leave(this.node);
			}
		} else {
			return this.leave(this.node);
		}
	},
	enter : function(node) {
		var nodeType = node.nodeType;
		this.node = node;
		this.attributes = null;
		// Document node
		if (nodeType === 1) {
			// START_ELEMENT
			this.eventType = 1;
			return this.eventType;
		} else if (nodeType === 2) {
			// ATTRIBUTE
			this.eventType = 10;
			return this.eventType;
		} else if (nodeType === 3) {
			var nodeValue = node.nodeValue;
			if (Jsonix.Util.StringUtils.isEmpty(nodeValue)) {
				// SPACE
				this.eventType = 6;
			} else {
				// CHARACTERS
				this.eventType = 4;
			}
			return this.eventType;
		} else if (nodeType === 4) {
			// CDATA
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 5) {
			// ENTITY_REFERENCE_NODE = 5
			// ENTITY_REFERENCE
			this.eventType = 9;
			return this.eventType;
		} else if (nodeType === 6) {
			// ENTITY_DECLARATION
			this.eventType = 15;
			return this.eventType;
		} else if (nodeType === 7) {
			// PROCESSING_INSTRUCTION
			this.eventType = 3;
			return this.eventType;
		} else if (nodeType === 8) {
			// COMMENT
			this.eventType = 5;
			return this.eventType;
		} else if (nodeType === 9) {
			// START_DOCUMENT
			this.eventType = 7;
			return this.eventType;
		} else if (nodeType === 10) {
			// DTD
			this.eventType = 12;
			return this.eventType;
		} else if (nodeType === 12) {
			// NOTATION_DECLARATION
			this.eventType = 14;
			return this.eventType;
		} else {
			// DOCUMENT_FRAGMENT_NODE = 11
			throw new Error("Node type [" + nodeType + '] is not supported.');
		}
	},
	leave : function(node) {
		if (node.nodeType === 9) {
			if (this.eventType == 8) {
				throw new Error("Invalid state.");
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 8;
				return this.eventType;
			}
		} else if (node.nodeType === 1) {
			if (this.eventType == 2) {
				var nextSibling = node.nextSibling;
				if (nextSibling) {
					return this.enter(nextSibling);
				}
			} else {
				this.node = node;
				this.attributes = null;
				// END_ELEMENT
				this.eventType = 2;
				return this.eventType;
			}
		}

		var nextSibling1 = node.nextSibling;
		if (nextSibling1) {
			return this.enter(nextSibling1);
		} else {
			var parentNode = node.parentNode;
			this.node = parentNode;
			this.attributes = null;
			if (parentNode.nodeType === 9) {
				this.eventType = 8;
			} else {
				this.eventType = 2;
			}
			return this.eventType;
		}
	},
	getName : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			if (Jsonix.Util.Type.isString(node.namespaceURI)) {
				return new Jsonix.XML.QName(node.namespaceURI, node.nodeName);
			} else {
				return new Jsonix.XML.QName(node.nodeName);
			}
		} else {
			return null;
		}
	},
	getNameKey : function() {
		var node = this.node;
		if (Jsonix.Util.Type.isString(node.nodeName)) {
			return Jsonix.XML.QName.key(node.namespaceURI, node.nodeName);
		} else {
			return null;
		}
	},
	getText : function() {
		return this.node.nodeValue;
	},
	nextTag : function() {
		var et = this.next();
		// TODO isWhiteSpace
		while (et === 7 || et === 4 || et === 12 || et === 6 || et === 3 || et === 5) {
			et = this.next();
		}
		if (et !== 1 && et !== 2) {
			// TODO location
			throw new Error('Expected start or end tag.');
		}
		return et;

	},
	getElementText : function() {
		if (this.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next text.");
		}
		var et = this.next();
		var content = '';
		while (et !== 2) {
			if (et === 4 || et === 12 || et === 6 || et === 9) {
				content = content + this.getText();
			} else if (et === 3 || et === 5) {
				// Skip PI or comment
			} else if (et === 8) {
				// End document
				throw new Error("Unexpected end of document when reading element text content.");
			} else if (et === 1) {
				// End element
				// TODO location
				throw new Error("Element text content may not contain START_ELEMENT.");
			} else {
				// TODO location
				throw new Error("Unexpected event type [" + et + "].");
			}
			et = this.next();
		}
		return content;
	},
	getAttributeCount : function() {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		return attributes.length;
	},
	getAttributeName : function(index) {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute name can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		
		
		if (Jsonix.Util.Type.isString(attribute.namespaceURI)) {
			return new Jsonix.XML.QName(attribute.namespaceURI, attribute.nodeName);
		} else {
			return new Jsonix.XML.QName(attribute.nodeName);
		}
	},
	getAttributeNameKey : function(index) {
		var attributes;
		if (this.attributes) {
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute name key can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];

		return Jsonix.XML.QName.key(attribute.namespaceURI, attribute.nodeName);
	},
	getAttributeValue : function(index) {
		var attributes;
		if (this.attributes)
		{
			attributes = this.attributes;
		} else if (this.eventType === 1) {
			attributes = this.node.attributes;
			this.attributes = attributes;
		} else if (this.eventType === 10) {
			attributes = this.node.parentNode.attributes;
			this.attributes = attributes;
		} else {
			throw new Error("Attribute value can only be retrieved for START_ELEMENT or ATTRIBUTE.");
		}
		if (index < 0 || index >= attributes.length) {
			throw new Error("Invalid attribute index [" + index + "].");
		}
		var attribute = attributes[index];
		return attribute.value; //mvv: nodeValue
	},
	getElement : function() {
		if (this.eventType === 1 || this.eventType === 2) {
			// Go to the END_ELEMENT
			this.eventType = 2;
			return this.node;
		} else {
			throw new Error("Parser must be on START_ELEMENT or END_ELEMENT to return current element.");
		}
	},
	CLASS_NAME : "Jsonix.XML.Input"

});

Jsonix.XML.Input.START_ELEMENT = 1;
Jsonix.XML.Input.END_ELEMENT = 2;
Jsonix.XML.Input.PROCESSING_INSTRUCTION = 3;
Jsonix.XML.Input.CHARACTERS = 4;
Jsonix.XML.Input.COMMENT = 5;
Jsonix.XML.Input.SPACE = 6;
Jsonix.XML.Input.START_DOCUMENT = 7;
Jsonix.XML.Input.END_DOCUMENT = 8;
Jsonix.XML.Input.ENTITY_REFERENCE = 9;
Jsonix.XML.Input.ATTRIBUTE = 10;
Jsonix.XML.Input.DTD = 11;
Jsonix.XML.Input.CDATA = 12;
Jsonix.XML.Input.NAMESPACE = 13;
Jsonix.XML.Input.NOTATION_DECLARATION = 14;
Jsonix.XML.Input.ENTITY_DECLARATION = 15;
Jsonix.XML.Output = Jsonix.Class({
	document : null,
	node : null,
	nodes : null,
	xmldom : null,
	namespacePrefixes : null,
	namespacePrefixIndex : 0,
	initialize : function(options) {
		// REWORK
		if (typeof ActiveXObject !== 'undefined') {
			this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
		} else {
			this.xmldom = null;
		}
		this.nodes = [];
		this.namespacePrefixes = {
			'' : ''
		};
		if (Jsonix.Util.Type.isObject(options)) {
			if (Jsonix.Util.Type.isObject(options.namespacePrefixes)) {
				for ( var name in options.namespacePrefixes) {
					if (options.namespacePrefixes.hasOwnProperty(name)) {
						this.namespacePrefixes[name] = options.namespacePrefixes[name];
					}
				}
			}
		}
	},
	destroy : function() {
		this.xmldom = null;
	},
	writeStartDocument : function() {
		// TODO Check
		var doc = Jsonix.DOM.createDocument();
		this.document = doc;
		return this.push(doc);
	},
	writeEndDocument : function() {
		return this.pop();

	},
	writeStartElement : function(name) {
		Jsonix.Util.Ensure.ensureObject(name);
		Jsonix.Util.Ensure.ensureString(name.localPart);

		var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : '';
		var localPart = name.localPart;

		var prefix = name.prefix || this.getPrefix(namespaceURI);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var element;
		if (Jsonix.Util.Type.isFunction(this.document.createElementNS))	{
			element = this.document.createElementNS(namespaceURI, qualifiedName);
		}
		else if (this.xmldom) {
			element = this.xmldom.createNode(1, qualifiedName, namespaceURI);

		} else {
			throw new Error("Could not create an element node.");
		}
		this.peek().appendChild(element);
		return this.push(element);
	},
	writeEndElement : function() {
		return this.pop();
	},
	writeCharacters : function(text) {
		var node;
		if (Jsonix.Util.Type.isFunction(this.document.createTextNode))	{
			node = this.document.createTextNode(text);
		}
		else if (this.xmldom) {
			node = this.xmldom.createTextNode(text);
		} else {
			throw new Error("Could not create a text node.");
		}
		this.peek().appendChild(node);
		return node;

	},
	writeAttribute : function(name, value) {
		Jsonix.Util.Ensure.ensureObject(name);
		Jsonix.Util.Ensure.ensureString(name.localPart);
		Jsonix.Util.Ensure.ensureString(value);

		var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : '';
		var localPart = name.localPart;
		var prefix = name.prefix || this.getPrefix(namespaceURI);

		var qualifiedName = (!prefix ? localPart : prefix + ':' + localPart);

		var node = this.peek();

		if (namespaceURI === '') {
			node.setAttribute(qualifiedName, value);
		} else {
			if (node.setAttributeNS) {
				node.setAttributeNS(namespaceURI, qualifiedName, value);
			} else {
				if (this.xmldom) {
					var attribute = this.document.createNode(2, qualifiedName, namespaceURI);
					attribute.nodeValue = value;
					node.setAttributeNode(attribute);
				} else {
					throw new Error("The [setAttributeNS] method is not implemented");
				}
			}
		}
	},
	writeNode : function(node) {
		var importedNode;
		if (Jsonix.Util.Type.exists(this.document.importNode)) {
			importedNode = this.document.importNode(node, true);
		} else {
			importedNode = node;
		}
		this.peek().appendChild(importedNode);
		return importedNode;
	},
	push : function(node) {
		this.nodes.push(node);
		return node;
	},
	peek : function() {
		return this.nodes[this.nodes.length - 1];
	},
	pop : function() {
		var result = this.nodes.pop();
		return result;
	},
	getPrefix : function(namespaceURI) {
		var p = this.namespacePrefixes[namespaceURI];
		if (Jsonix.Util.Type.exists(p)) {
			return p;
		} else {
			p = 'p' + (this.namespacePrefixIndex++);
			this.namespacePrefixes[namespaceURI] = p;
			return p;
		}

	},
	CLASS_NAME : "Jsonix.XML.Output"

});
Jsonix.Model.TypeInfo = Jsonix.Class({
	name : null,
	initialize : function() {
	},
	CLASS_NAME : 'Jsonix.Model.TypeInfo'
});
Jsonix.Schema.XSD = {};
Jsonix.Schema.XSD.NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
Jsonix.Schema.XSD.PREFIX = 'xsd';
Jsonix.Schema.XSD.qname = function(localPart) {
	Jsonix.Util.Ensure.ensureString(localPart);
	return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI, localPart,
			Jsonix.Schema.XSD.PREFIX);
};

Jsonix.Schema.XSD.AnyType = Jsonix.Class(Jsonix.Model.TypeInfo, {
	name : 'AnyType',
	typeName : Jsonix.Schema.XSD.qname('anyType'),
	initialize : function() {
		Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
	},
	isInstance : function(value) {
		throw new Error('Abstract method [isInstance].');
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyType'
});
Jsonix.Schema.XSD.AnyType.INSTANCE = new Jsonix.Schema.XSD.AnyType();
Jsonix.Schema.XSD.AnySimpleType = Jsonix.Class(Jsonix.Schema.XSD.AnyType, {
	name : 'AnySimpleType',
	typeName : Jsonix.Schema.XSD.qname('anySimpleType'),
	simpleType : true,
	print : function(value) {
		throw new Error('Abstract method [print].');
	},
	parse : function(text) {
		throw new Error('Abstract method [parse].');
	},
	unmarshal : function(context, input) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.parse(text);
		} else {
			return null;
		}
	},
	marshal : function(context, value, output) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeCharacters(this.print(value));
		}
	},
	build: function(context, module)
	{
		// Nothing to do
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnySimpleType'
});

Jsonix.Schema.XSD.List = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : null,
					typeName : null,
					typeInfo : null,
					separator : ' ',
					trimmedSeparator : Jsonix.Util.StringUtils.whitespaceCharacters,
					simpleType : true,
					built : false,
					initialize : function(typeInfo, typeName, separator) {
						Jsonix.Util.Ensure.ensureExists(typeInfo);
						// TODO Ensure correct argument
						this.typeInfo = typeInfo;
						if (!Jsonix.Util.Type.exists(this.name)) {
							this.name = typeInfo.name + "*";
						}
						if (Jsonix.Util.Type.exists(typeName)) {
							// TODO Ensure correct argument
							this.typeName = typeName;
						}

						if (Jsonix.Util.Type.isString(separator)) {
							// TODO Ensure correct argument
							this.separator = separator;
						} else {
							this.separator = ' ';
						}

						var trimmedSeparator = Jsonix.Util.StringUtils
								.trim(this.separator);
						if (trimmedSeparator.length === 0) {
							this.trimmedSeparator = Jsonix.Util.StringUtils.whitespaceCharacters;
						} else {
							this.trimmedSeparator = trimmedSeparator;
						}
					},
					build : function(context, module) {
						if (!this.built) {
							this.typeInfo = context.resolveTypeInfo(
									this.typeInfo, module);
							this.built = true;
						}
					},
					print : function(value) {
						if (!Jsonix.Util.Type.exists(value)) {
							return null;
						}
						// TODO Exception if not an array
						Jsonix.Util.Ensure.ensureArray(value);
						var result = '';
						for ( var index = 0; index < value.length; index++) {
							if (index > 0) {
								result = result + this.separator;
							}
							result = result + this.typeInfo.print(value[index]);
						}
						return result;
					},
					parse : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var items = Jsonix.Util.StringUtils
								.splitBySeparatorChars(text,
										this.trimmedSeparator);
						var result = [];
						for ( var index = 0; index < items.length; index++) {
							result.push(this.typeInfo
									.parse(Jsonix.Util.StringUtils
											.trim(items[index])));
						}
						return result;
					},
					CLASS_NAME : 'Jsonix.Schema.XSD.List'
				});

Jsonix.Schema.XSD.String = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'String',
	typeName : Jsonix.Schema.XSD.qname('string'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.String'
});
Jsonix.Schema.XSD.String.INSTANCE = new Jsonix.Schema.XSD.String();
Jsonix.Schema.XSD.String.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.String.INSTANCE);
Jsonix.Schema.XSD.Strings = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'Strings',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.String.INSTANCE, Jsonix.Schema.XSD.qname('strings'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Strings'
});
Jsonix.Schema.XSD.Strings.INSTANCE = new Jsonix.Schema.XSD.Strings();
Jsonix.Schema.XSD.NormalizedString = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'NormalizedString',
	typeName : Jsonix.Schema.XSD.qname('normalizedString'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NormalizedString'
});
Jsonix.Schema.XSD.NormalizedString.INSTANCE = new Jsonix.Schema.XSD.NormalizedString();
Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);
Jsonix.Schema.XSD.Token = Jsonix.Class(Jsonix.Schema.XSD.NormalizedString, {
	name : 'Token',
	typeName : Jsonix.Schema.XSD.qname('token'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Token'
});
Jsonix.Schema.XSD.Token.INSTANCE = new Jsonix.Schema.XSD.Token();
Jsonix.Schema.XSD.Token.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);
Jsonix.Schema.XSD.Language = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Language',
	typeName : Jsonix.Schema.XSD.qname('language'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Language'
});
Jsonix.Schema.XSD.Language.INSTANCE = new Jsonix.Schema.XSD.Language();
Jsonix.Schema.XSD.Language.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);
Jsonix.Schema.XSD.Name = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'Name',
	typeName : Jsonix.Schema.XSD.qname('Name'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.Name'
});
Jsonix.Schema.XSD.Name.INSTANCE = new Jsonix.Schema.XSD.Name();
Jsonix.Schema.XSD.Name.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);
Jsonix.Schema.XSD.NCName = Jsonix.Class(Jsonix.Schema.XSD.Name, {
	name : 'NCName',
	typeName : Jsonix.Schema.XSD.qname('NCName'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NCName'
});
Jsonix.Schema.XSD.NCName.INSTANCE = new Jsonix.Schema.XSD.NCName();
Jsonix.Schema.XSD.NCName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);
Jsonix.Schema.XSD.NMToken = Jsonix.Class(Jsonix.Schema.XSD.Token, {
	name : 'NMToken',
	typeName : Jsonix.Schema.XSD.qname('NMTOKEN'),
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMToken'
});
Jsonix.Schema.XSD.NMToken.INSTANCE = new Jsonix.Schema.XSD.NMToken();
Jsonix.Schema.XSD.NMTokens = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'NMTokens',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.NMToken.INSTANCE, Jsonix.Schema.XSD.qname('NMTOKEN'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.NMTokens'
});
Jsonix.Schema.XSD.NMTokens.INSTANCE = new Jsonix.Schema.XSD.NMTokens();
Jsonix.Schema.XSD.Boolean = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Boolean',
	typeName : Jsonix.Schema.XSD.qname('boolean'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureBoolean(value);
		return value ? 'true' : 'false';
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === 'true' || text === '1') {
			return true;
		} else if (text === 'false' || text === '0') {
			return false;
		} else {
			throw new Error("Either [true], [1], [0] or [false] expected as boolean value.");
		}
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isBoolean(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Boolean'
});
Jsonix.Schema.XSD.Boolean.INSTANCE = new Jsonix.Schema.XSD.Boolean();
Jsonix.Schema.XSD.Boolean.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);
Jsonix.Schema.XSD.Base64Binary = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : 'Base64Binary',
					typeName : Jsonix.Schema.XSD.qname('base64Binary'),
					charToByte : {},
					byteToChar : [],
					initialize : function() {
						Jsonix.Schema.XSD.AnySimpleType.prototype.initialize
								.apply(this);
						// Initialize charToByte and byteToChar table for fast
						// lookups
						var charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
						for ( var i = 0; i < charTable.length; i++) {
							var _char = charTable.charAt(i);
							var _byte = charTable.charCodeAt(i);
							this.byteToChar[i] = _char;
							this.charToByte[_char] = i;
						}
					},
					print : function(value) {
						Jsonix.Util.Ensure.ensureArray(value);
						return this.encode(value);
					},

					parse : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						return this.decode(text);
					},
					encode : function(uarray) {
						var output = "";
						var byte0;
						var byte1;
						var byte2;
						var char0;
						var char1;
						var char2;
						var char3;
						var i = 0;
						var j = 0;
						var length = uarray.length;

						for (i = 0; i < length; i += 3) {
							byte0 = uarray[i] & 0xFF;
							char0 = this.byteToChar[byte0 >> 2];

							if (i + 1 < length) {
								byte1 = uarray[i + 1] & 0xFF;
								char1 = this.byteToChar[((byte0 & 0x03) << 4)
										| (byte1 >> 4)];
								if (i + 2 < length) {
									byte2 = uarray[i + 2] & 0xFF;
									char2 = this.byteToChar[((byte1 & 0x0F) << 2)
											| (byte2 >> 6)];
									char3 = this.byteToChar[byte2 & 0x3F];
								} else {
									char2 = this.byteToChar[(byte1 & 0x0F) << 2];
									char3 = "=";
								}
							} else {
								char1 = this.byteToChar[(byte0 & 0x03) << 4];
								char2 = "=";
								char3 = "=";
							}
							output = output + char0 + char1 + char2 + char3;
						}
						return output;
					},
					decode : function(text) {

						input = text.replace(/[^A-Za-z0-9\+\/\=]/g, "");

						var length = (input.length / 4) * 3;
						if (input.charAt(input.length - 1) === "=") {
							length--;
						}
						if (input.charAt(input.length - 2) === "=") {
							length--;
						}

						var uarray = new Array(length);

						var byte0;
						var byte1;
						var byte2;
						var char0;
						var char1;
						var char2;
						var char3;
						var i = 0;
						var j = 0;

						for (i = 0; i < length; i += 3) {
							// get the 3 octects in 4 ascii chars
							char0 = this.charToByte[input.charAt(j++)];
							char1 = this.charToByte[input.charAt(j++)];
							char2 = this.charToByte[input.charAt(j++)];
							char3 = this.charToByte[input.charAt(j++)];

							byte0 = (char0 << 2) | (char1 >> 4);
							byte1 = ((char1 & 0x0F) << 4) | (char2 >> 2);
							byte2 = ((char2 & 0x03) << 6) | char3;

							uarray[i] = byte0;
							if (char2 != 64) {
								uarray[i + 1] = byte1;
							}
							if (char3 != 64) {
								uarray[i + 2] = byte2;
							}
						}
						return uarray;
					},
					isInstance : function(value) {
						return Jsonix.Util.Type.isArray(value);
					},
					CLASS_NAME : 'Jsonix.Schema.XSD.Base64Binary'
				});
Jsonix.Schema.XSD.Base64Binary.INSTANCE = new Jsonix.Schema.XSD.Base64Binary();
Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Base64Binary.INSTANCE);
Jsonix.Schema.XSD.HexBinary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'HexBinary',
	typeName : Jsonix.Schema.XSD.qname('hexBinary'),
	charToQuartet : {},
	byteToDuplet : [],
	initialize : function() {
		Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
		var charTableUpperCase = "0123456789ABCDEF";
		var charTableLowerCase = charTableUpperCase.toLowerCase();
		var i;
		for (i = 0; i < 16; i++) {
			this.charToQuartet[charTableUpperCase.charAt(i)] = i;
			if (i >= 0xA) {
				this.charToQuartet[charTableLowerCase.charAt(i)] = i;
			}
		}
		for (i = 0; i < 256; i++) {
			this.byteToDuplet[i] =
			//
			charTableUpperCase[i >> 4] + charTableUpperCase[i & 0xF];
		}
	},
	print : function(value) {
		Jsonix.Util.Ensure.ensureArray(value);
		return this.encode(value);
	},

	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		return this.decode(text);
	},
	encode : function(uarray) {
		var output = "";
		for ( var i = 0; i < uarray.length; i++) {
			output = output + this.byteToDuplet[uarray[i] & 0xFF];
		}
		return output;
	},
	decode : function(text) {
		var input = text.replace(/[^A-Fa-f0-9]/g, "");
		// Round by two
		var length = input.length >> 1;
		var uarray = new Array(length);
		for ( var i = 0; i < length; i++) {
			var char0 = input.charAt(2 * i);
			var char1 = input.charAt(2 * i + 1);
			uarray[i] = this.charToQuartet[char0] << 4
					| this.charToQuartet[char1];
		}
		return uarray;
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isArray(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.HexBinary'
});
Jsonix.Schema.XSD.HexBinary.INSTANCE = new Jsonix.Schema.XSD.HexBinary();
Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.HexBinary.INSTANCE);
Jsonix.Schema.XSD.Number = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Number',
	typeName : Jsonix.Schema.XSD.qname('number'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureNumberOrNaN(value);
		if (Jsonix.Util.Type.isNaN(value)) {
			return 'NaN';
		} else if (value === Infinity) {
			return 'INF';
		} else if (value === -Infinity) {
			return '-INF';
		} else {
			var text = String(value);
			return text;
		}
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		if (text === '-INF') {
			return -Infinity;
		} else if (text === 'INF') {
			return Infinity;
		} else if (text === 'NaN') {
			return NaN;
		} else {
			var value = Number(text);
			Jsonix.Util.Ensure.ensureNumber(value);
			return value;
		}
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isNumberOrNaN(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Number'
});
Jsonix.Schema.XSD.Number.INSTANCE = new Jsonix.Schema.XSD.Number();
Jsonix.Schema.XSD.Number.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);
Jsonix.Schema.XSD.Float = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Float',
	typeName : Jsonix.Schema.XSD.qname('float'),
	isInstance : function(value) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -3.4028235e+38,
	MAX_VALUE : 3.4028235e+38,
	CLASS_NAME : 'Jsonix.Schema.XSD.Float'
});
Jsonix.Schema.XSD.Float.INSTANCE = new Jsonix.Schema.XSD.Float();
Jsonix.Schema.XSD.Float.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);
Jsonix.Schema.XSD.Decimal = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Decimal',
	typeName : Jsonix.Schema.XSD.qname('decimal'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureNumber(value);
		var text = String(value);
		return text;
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureNumber(value);
		return value;
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isNumber(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Decimal'
});
Jsonix.Schema.XSD.Decimal.INSTANCE = new Jsonix.Schema.XSD.Decimal();
Jsonix.Schema.XSD.Decimal.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);
Jsonix.Schema.XSD.Integer = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Integer',
	typeName : Jsonix.Schema.XSD.qname('integer'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureInteger(value);
		var text = String(value);
		return text;
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var value = Number(text);
		Jsonix.Util.Ensure.ensureInteger(value);
		return value;
	},
	isInstance : function(value) {
		return Jsonix.Util.NumberUtils.isInteger(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
	},
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Integer'
});
Jsonix.Schema.XSD.Integer.INSTANCE = new Jsonix.Schema.XSD.Integer();
Jsonix.Schema.XSD.Integer.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);
Jsonix.Schema.XSD.NonPositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonPositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('nonPositiveInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: 0,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonPositiveInteger'
});
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE = new Jsonix.Schema.XSD.NonPositiveInteger();
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);
Jsonix.Schema.XSD.NegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger, {
	name : 'NegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('negativeInteger'),
	MIN_VALUE: -9223372036854775808,
	MAX_VALUE: -1,
	CLASS_NAME : 'Jsonix.Schema.XSD.NegativeInteger'
});
Jsonix.Schema.XSD.NegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NegativeInteger();
Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NegativeInteger.INSTANCE);
Jsonix.Schema.XSD.Long = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'Long',
	typeName : Jsonix.Schema.XSD.qname('long'),
	MIN_VALUE : -9223372036854775808,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.Long'
});
Jsonix.Schema.XSD.Long.INSTANCE = new Jsonix.Schema.XSD.Long();
Jsonix.Schema.XSD.Long.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Long.INSTANCE);
Jsonix.Schema.XSD.Int = Jsonix.Class(Jsonix.Schema.XSD.Long, {
	name : 'Int',
	typeName : Jsonix.Schema.XSD.qname('int'),
	MIN_VALUE : -2147483648,
	MAX_VALUE : 2147483647,
	CLASS_NAME : 'Jsonix.Schema.XSD.Int'
});
Jsonix.Schema.XSD.Int.INSTANCE = new Jsonix.Schema.XSD.Int();
Jsonix.Schema.XSD.Int.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Int.INSTANCE);
Jsonix.Schema.XSD.Short = Jsonix.Class(Jsonix.Schema.XSD.Int, {
	name : 'Short',
	typeName : Jsonix.Schema.XSD.qname('short'),
	MIN_VALUE : -32768,
	MAX_VALUE : 32767,
	CLASS_NAME : 'Jsonix.Schema.XSD.Short'
});
Jsonix.Schema.XSD.Short.INSTANCE = new Jsonix.Schema.XSD.Short();
Jsonix.Schema.XSD.Short.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);
Jsonix.Schema.XSD.Byte = Jsonix.Class(Jsonix.Schema.XSD.Short, {
	name : 'Byte',
	typeName : Jsonix.Schema.XSD.qname('byte'),
	MIN_VALUE : -128,
	MAX_VALUE : 127,
	CLASS_NAME : 'Jsonix.Schema.XSD.Byte'
});
Jsonix.Schema.XSD.Byte.INSTANCE = new Jsonix.Schema.XSD.Byte();
Jsonix.Schema.XSD.Byte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);
Jsonix.Schema.XSD.NonNegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
	name : 'NonNegativeInteger',
	typeName : Jsonix.Schema.XSD.qname('nonNegativeInteger'),
	MIN_VALUE: 0,
	MAX_VALUE: 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.NonNegativeInteger'
});
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NonNegativeInteger();
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);
Jsonix.Schema.XSD.UnsignedLong = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'UnsignedLong',
	typeName : Jsonix.Schema.XSD.qname('unsignedLong'),
	MIN_VALUE : 0,
	MAX_VALUE : 18446744073709551615,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedLong'
});
Jsonix.Schema.XSD.UnsignedLong.INSTANCE = new Jsonix.Schema.XSD.UnsignedLong();
Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);
Jsonix.Schema.XSD.UnsignedInt = Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong, {
	name : 'UnsignedInt',
	typeName : Jsonix.Schema.XSD.qname('unsignedInt'),
	MIN_VALUE : 0,
	MAX_VALUE : 4294967295,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedInt'
});
Jsonix.Schema.XSD.UnsignedInt.INSTANCE = new Jsonix.Schema.XSD.UnsignedInt();
Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);
Jsonix.Schema.XSD.UnsignedShort = Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt, {
	name : 'UnsignedShort',
	typeName : Jsonix.Schema.XSD.qname('unsignedShort'),
	MIN_VALUE : 0,
	MAX_VALUE : 65535,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedShort'
});
Jsonix.Schema.XSD.UnsignedShort.INSTANCE = new Jsonix.Schema.XSD.UnsignedShort();
Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);
Jsonix.Schema.XSD.UnsignedByte = Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort, {
	name : 'UnsignedByte',
	typeName : Jsonix.Schema.XSD.qname('unsignedByte'),
	MIN_VALUE : 0,
	MAX_VALUE : 255,
	CLASS_NAME : 'Jsonix.Schema.XSD.UnsignedByte'
});
Jsonix.Schema.XSD.UnsignedByte.INSTANCE = new Jsonix.Schema.XSD.UnsignedByte();
Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);
Jsonix.Schema.XSD.PositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
	name : 'PositiveInteger',
	typeName : Jsonix.Schema.XSD.qname('positiveInteger'),
	MIN_VALUE : 1,
	MAX_VALUE : 9223372036854775807,
	CLASS_NAME : 'Jsonix.Schema.XSD.PositiveInteger'
});
Jsonix.Schema.XSD.PositiveInteger.INSTANCE = new Jsonix.Schema.XSD.PositiveInteger();
Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);
Jsonix.Schema.XSD.Double = Jsonix.Class(Jsonix.Schema.XSD.Number, {
	name : 'Double',
	typeName : Jsonix.Schema.XSD.qname('double'),
	isInstance : function(value) {
		return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || (Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE);
	},
	MIN_VALUE : -1.7976931348623157e+308,
	MAX_VALUE : 1.7976931348623157e+308,
	CLASS_NAME : 'Jsonix.Schema.XSD.Double'
});
Jsonix.Schema.XSD.Double.INSTANCE = new Jsonix.Schema.XSD.Double();
Jsonix.Schema.XSD.Double.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);
Jsonix.Schema.XSD.AnyURI = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'AnyURI',
	typeName : Jsonix.Schema.XSD.qname('anyURI'),
	print : function(value) {
		Jsonix.Util.Ensure.ensureString(value);
		return value;
	},
	parse : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		return text;
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isString(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.AnyURI'
});
Jsonix.Schema.XSD.AnyURI.INSTANCE = new Jsonix.Schema.XSD.AnyURI();
Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);
Jsonix.Schema.XSD.QName = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'QName',
	typeName : Jsonix.Schema.XSD.qname('QName'),
	CLASS_NAME : 'Jsonix.Schema.XSD.QName'
});
Jsonix.Schema.XSD.QName.INSTANCE = new Jsonix.Schema.XSD.QName();
Jsonix.Schema.XSD.QName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.QName.INSTANCE);
Jsonix.Schema.XSD.Calendar = Jsonix
		.Class(
				Jsonix.Schema.XSD.AnySimpleType,
				{
					name : 'Calendar',
					typeName : Jsonix.Schema.XSD.qname('calendar'),
					parse : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;
						var data = negative ? text.substring(1) : text;

						// Detect pattern

						var result;
						if (data.length >= 19 && data.charAt(4) === '-' && data.charAt(7) === '-' && data.charAt(10) === 'T' && data.charAt(13) === ':' && data.charAt(16) === ':') {
							return this.parseDateTime(text);
						} else if (data.length >= 10 && data.charAt(4) === '-' && data.charAt(7) === '-') {
							return this.parseDate(text);
						} else if (data.length >= 8 && data.charAt(2) === ':' && data.charAt(5) === ':') {
							return this.parseTime(text);
						} else {
							throw new Error('Value [' + text + '] does not match dateTime, date or time patterns.');
						}
					},
					parseDateTime : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;

						var dateTimeWithTimeZone = negative ? text.substring(1) : text;

						if (dateTimeWithTimeZone.length < 19 || dateTimeWithTimeZone.charAt(4) !== '-' || dateTimeWithTimeZone.charAt(7) !== '-' || dateTimeWithTimeZone.charAt(10) !== 'T' || dateTimeWithTimeZone.charAt(13) !== ':' || dateTimeWithTimeZone.charAt(16) !== ':') {
							throw new Error('Date time string [' + dateTimeWithTimeZone + '] must be a string in format [\'-\'? yyyy \'-\' mm \'-\' dd \'T\' hh \':\' mm \':\' ss (\'.\' s+)? (zzzzzz)?].');
						}

						var timeZoneIndex;
						var plusIndex = dateTimeWithTimeZone.indexOf('+', 19);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = dateTimeWithTimeZone.indexOf('-', 19);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = dateTimeWithTimeZone.indexOf('Z', 19);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = dateTimeWithTimeZone.length;
								}
							}
						}

						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateTimeWithTimeZone.length;

						var dateString = dateTimeWithTimeZone.substring(0, 10);
						var timeString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(11, timeZoneIndex) : dateTimeWithTimeZone.substring(11);
						var timeZoneString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(timeZoneIndex) : '';
						var date = this.parseDateString(dateString);
						var time = this.parseTimeString(timeString);
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							year : sign * date.year,
							month : date.month,
							day : date.day,
							hour : time.hour,
							minute : time.minute,
							second : time.second,
							fractionalSecond : time.fractionalSecond,
							timezone : timezone
						});

					},
					parseDate : function(text) {
						Jsonix.Util.Ensure.ensureString(text);

						var negative = (text.charAt(0) === '-');
						var sign = negative ? -1 : 1;

						var dateWithTimeZone = negative ? text.substring(1) : text;

						var timeZoneIndex;
						var plusIndex = dateWithTimeZone.indexOf('+', 10);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = dateWithTimeZone.indexOf('-', 10);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = dateWithTimeZone.indexOf('Z', 10);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = dateWithTimeZone.length;
								}
							}
						}
						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateWithTimeZone.length;
						var dateString = validTimeZoneIndex ? dateWithTimeZone.substring(0, timeZoneIndex) : dateWithTimeZone;

						var date = this.parseDateString(dateString);
						var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							year : sign * date.year,
							month : date.month,
							day : date.day,
							timezone : timezone
						});

					},
					parseTime : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						var timeZoneIndex;
						var plusIndex = text.indexOf('+', 7);
						if (plusIndex >= 0) {
							timeZoneIndex = plusIndex;
						} else {
							var minusIndex = text.indexOf('-', 7);
							if (minusIndex >= 0) {
								timeZoneIndex = minusIndex;
							} else {
								var zIndex = text.indexOf('Z', 7);
								if (zIndex >= 0) {
									timeZoneIndex = zIndex;
								} else {
									timeZoneIndex = text.length;
								}
							}
						}

						var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < text.length;
						var timeString = validTimeZoneIndex ? text.substring(0, timeZoneIndex) : text;

						var time = this.parseTimeString(timeString);
						var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : '';
						var timezone = this.parseTimeZoneString(timeZoneString);

						return Jsonix.XML.Calendar.fromObject({
							hour : time.hour,
							minute : time.minute,
							second : time.second,
							fractionalSecond : time.fractionalSecond,
							timezone : timezone
						});

					},
					parseDateString : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 10) {
							throw new Error('Date string [' + text + '] must be 10 characters long.');
						}

						if (text.charAt(4) !== '-' || text.charAt(7) !== '-') {
							throw new Error('Date string [' + text + '] must be a string in format [yyyy \'-\' mm \'-\' ss ].');
						}

						var year = this.parseYear(text.substring(0, 4));
						var month = this.parseMonth(text.substring(5, 7));
						var day = this.parseDay(text.substring(8, 10));

						return {
							year : year,
							month : month,
							day : day
						};
					},
					parseTimeString : function(timeString) {
						Jsonix.Util.Ensure.ensureString(timeString);
						if (timeString.length < 8 || timeString.charAt(2) !== ':' || timeString.charAt(5) !== ':') {
							throw new Error('Time string [' + timeString + '] must be a string in format [hh \':\' mm \':\' ss (\'.\' s+)?].');
						}
						var hourString = timeString.substring(0, 2);
						var minuteString = timeString.substring(3, 5);
						var secondString = timeString.substring(6, 8);
						var fractionalSecondString = timeString.length >= 9 ? timeString.substring(8) : '';
						var hour = this.parseHour(hourString);
						var minute = this.parseHour(minuteString);
						var second = this.parseSecond(secondString);
						var fractionalSecond = this.parseFractionalSecond(fractionalSecondString);
						return {
							hour : hour,
							minute : minute,
							second : second,
							fractionalSecond : fractionalSecond
						};

					},
					parseTimeZoneString : function(text) {
						// (('+' | '-') hh ':' mm) | 'Z'
						Jsonix.Util.Ensure.ensureString(text);
						if (text === '') {
							return NaN;
						} else if (text === 'Z') {
							return 0;
						} else {
							if (text.length !== 6) {
								throw new Error('Time zone must be an empty string, \'Z\' or a string in format [(\'+\' | \'-\') hh \':\' mm].');
							}
							var signString = text.charAt(0);
							var sign;
							if (signString === '+') {
								sign = 1;
							} else if (signString === '-') {
								sign = -1;
							} else {
								throw new Error('First character of the time zone [' + text + '] must be \'+\' or \'-\'.');
							}
							var hour = this.parseHour(text.substring(1, 3));
							var minute = this.parseMinute(text.substring(4, 6));
							return sign * (hour * 60 + minute);
						}

					},
					parseYear : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 4) {
							throw new Error('Year [' + text + '] must be a four-digit number.');
						}
						var year = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(year);
						return year;
					},
					parseMonth : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Month [' + text + '] must be a two-digit number.');
						}
						var month = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(month);
						return month;
					},
					parseDay : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Day [' + text + '] must be a two-digit number.');
						}
						var day = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(day);
						return day;
					},
					parseHour : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Hour [' + text + '] must be a two-digit number.');
						}
						var hour = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(hour);
						return hour;
					},
					parseMinute : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Minute [' + text + '] must be a two-digit number.');
						}
						var minute = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureInteger(minute);
						return minute;
					},
					parseSecond : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text.length !== 2) {
							throw new Error('Second [' + text + '] must be a two-digit number.');
						}
						var second = Number(text);
						// TODO message
						Jsonix.Util.Ensure.ensureNumber(second);
						return second;
					},
					parseFractionalSecond : function(text) {
						Jsonix.Util.Ensure.ensureString(text);
						if (text === '') {
							return 0;
						} else {
							var fractionalSecond = Number(text);
							// TODO message
							Jsonix.Util.Ensure.ensureNumber(fractionalSecond);
							return fractionalSecond;
						}
					},
					print : function(value) {
						if (Jsonix.Util.Type.isString(value)) {
							return value;
						}
						Jsonix.Util.Ensure.ensureObject(value);
						if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day) && Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
								.isInteger(value.second)) {
							return this.printDateTime(value);
						} else if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) {
							return this.printDate(value);
						} else if (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
							return this.printTime(value);
						} else {
							throw new Error('Value [' + value + '] is not recognized as dateTime, date or time.');
						}
					},
					printDateTime : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.year);
						Jsonix.Util.Ensure.ensureInteger(value.month);
						Jsonix.Util.Ensure.ensureInteger(value.day);
						Jsonix.Util.Ensure.ensureInteger(value.hour);
						Jsonix.Util.Ensure.ensureInteger(value.minute);
						Jsonix.Util.Ensure.ensureNumber(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalString)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
						}
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}
						var result = this.printDateString(value);
						result = result + 'T';
						result = result + this.printTimeString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printDate : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureNumber(value.year);
						Jsonix.Util.Ensure.ensureNumber(value.month);
						Jsonix.Util.Ensure.ensureNumber(value.day);
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}
						var result = this.printDateString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printTime : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureNumber(value.hour);
						Jsonix.Util.Ensure.ensureNumber(value.minute);
						Jsonix.Util.Ensure.ensureNumber(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalString)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
						}
						if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
							Jsonix.Util.Ensure.ensureInteger(value.timezone);
						}

						var result = this.printTimeString(value);
						if (Jsonix.Util.Type.exists(value.timezone)) {
							result = result + this.printTimeZoneString(value.timezone);
						}
						return result;
					},
					printDateString : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.year);
						Jsonix.Util.Ensure.ensureInteger(value.month);
						Jsonix.Util.Ensure.ensureInteger(value.day);
						return (value.year < 0 ? ('-' + this.printYear(-value.year)) : this.printYear(value.year)) + '-' + this.printMonth(value.month) + '-' + this.printDay(value.day);
					},
					printTimeString : function(value) {
						Jsonix.Util.Ensure.ensureObject(value);
						Jsonix.Util.Ensure.ensureInteger(value.hour);
						Jsonix.Util.Ensure.ensureInteger(value.minute);
						Jsonix.Util.Ensure.ensureInteger(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
							Jsonix.Util.Ensure.ensureNumber(value.fractionalSecond);
						}
						var result = this.printHour(value.hour);
						result = result + ':';
						result = result + this.printMinute(value.minute);
						result = result + ':';
						result = result + this.printSecond(value.second);
						if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
							result = result + this.printFractionalSecond(value.fractionalSecond);
						}
						return result;
					},
					printTimeZoneString : function(value) {
						if (!Jsonix.Util.Type.exists(value) || Jsonix.Util.Type.isNaN(value)) {
							return '';
						} else {
							Jsonix.Util.Ensure.ensureInteger(value);

							var sign = value < 0 ? -1 : (value > 0 ? 1 : 0);
							var data = value * sign;
							var minute = data % 60;
							var hour = Math.floor(data / 60);

							var result;
							if (sign === 0) {
								return 'Z';
							} else {
								if (sign > 0) {
									result = '+';
								} else if (sign < 0) {
									result = '-';
								}
								result = result + this.printHour(hour);
								result = result + ':';
								result = result + this.printMinute(minute);
								return result;
							}
						}
					},
					printYear : function(value) {
						return this.printInteger(value, 4);
					},
					printMonth : function(value) {
						return this.printInteger(value, 2);
					},
					printDay : function(value) {
						return this.printInteger(value, 2);
					},
					printHour : function(value) {
						return this.printInteger(value, 2);
					},
					printMinute : function(value) {
						return this.printInteger(value, 2);
					},
					printSecond : function(value) {
						return this.printInteger(value, 2);
					},
					printFractionalSecond : function(value) {
						Jsonix.Util.Ensure.ensureNumber(value);
						if (value < 0 || value >= 1) {
							throw new Error('Fractional second [' + value + '] must be between 0 and 1.');
						} else if (value === 0) {
							return '';
						} else {
							var string = String(value);
							var dotIndex = string.indexOf('.');
							if (dotIndex < 0) {
								return '';
							} else {
								return string.substring(dotIndex);
							}
						}
					},
					printInteger : function(value, length) {
						Jsonix.Util.Ensure.ensureInteger(value);
						Jsonix.Util.Ensure.ensureInteger(length);
						if (length <= 0) {
							throw new Error('Length [' + value + '] must be positive.');
						}
						if (value < 0) {
							throw new Error('Value [' + value + '] must not be negative.');
						}
						if (value >= Math.pow(10, length)) {
							throw new Error('Value [' + value + '] must be less than [' + Math.pow(10, length) + '].');
						}
						var result = String(value);
						for ( var i = result.length; i < length; i++) {
							result = '0' + result;
						}
						return result;
					},
					isInstance : function(value) {
						return Jsonix.Util.Type.isObject(value) && ((Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) || (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils
								.isInteger(value.second)));
					},
					CLASS_NAME : 'Jsonix.Schema.XSD.Calendar'
				});
Jsonix.Schema.XSD.Calendar.INSTANCE = new Jsonix.Schema.XSD.Calendar();
Jsonix.Schema.XSD.Calendar.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);
Jsonix.Schema.XSD.Duration = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'Duration',
	typeName : Jsonix.Schema.XSD.qname('duration'),
	CLASS_NAME : 'Jsonix.Schema.XSD.Duration'
});
Jsonix.Schema.XSD.Duration.INSTANCE = new Jsonix.Schema.XSD.Duration();
Jsonix.Schema.XSD.Duration.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.Duration.INSTANCE);
Jsonix.Schema.XSD.DateTime = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'DateTime',
	typeName : Jsonix.Schema.XSD.qname('dateTime'),
	parse : function(value) {
		var calendar = this.parseDateTime(value);

        // wmakeev: set date in ctor (bug with overflow)
        var date = new Date(
            calendar.year,
            calendar.month - 1,
            calendar.day,
            calendar.hour,
            calendar.minute,
            calendar.second);

		if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
			date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
		}

        // wmakeev:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        //
        // The time-zone offset is the difference, in minutes, between UTC and local time.
        // The value returned by the getTime method is the number of milliseconds since 1 January 1970 00:00:00 UTC.

		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone))
            return new Date(date.getTime() - (60000 * date.getTimezoneOffset()) - (calendar.timezone * 60000));
		else
            return new Date(date.getTime() - (60000 * date.getTimezoneOffset()));
	},
	print : function(value) {
		Jsonix.Util.Ensure.ensureDate(value);
		return this.printDateTime(new Jsonix.XML.Calendar({
			year : value.getFullYear(),
			month : value.getMonth() + 1,
			day : value.getDate(),
			hour : value.getHours(),
			minute : value.getMinutes(),
			second : value.getSeconds(),
			fractionalSecond : (value.getMilliseconds() / 1000),
			timezone: -value.getTimezoneOffset()
		}));
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.DateTime'
});
Jsonix.Schema.XSD.DateTime.INSTANCE = new Jsonix.Schema.XSD.DateTime();
Jsonix.Schema.XSD.DateTime.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);

Jsonix.Schema.XSD.Time = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Time',
	typeName : Jsonix.Schema.XSD.qname('time'),
	parse : function(value) {
		var calendar = this.parseTime(value);
		//		
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
			var date = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
			if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
				date.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
			}

			var time = date.getTime() - (calendar.timezone * 60000);
			return new Date(time - (60000 * date.getTimezoneOffset()));

		} else {
			var result = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
			if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
				result.setMilliseconds(Math.floor(1000 * calendar.fractionalSecond));
			}
			return result;
		}
	},
	print : function(value) {
		Jsonix.Util.Ensure.ensureDate(value);
		var time = value.getTime();
		if (time <= -86400000 && time >= 86400000) {
			throw new Error('Invalid time [' + value + '].');
		}
		if (time >= 0) {
			return this.printTime(new Jsonix.XML.Calendar({
				hour : value.getHours(),
				minute : value.getMinutes(),
				second : value.getSeconds(),
				fractionalSecond : (value.getMilliseconds() / 1000)
			}));
		} else {
			var timezoneOffsetHours = Math.ceil(-time / 3600000);
			return this.printTime(new Jsonix.XML.Calendar({
				hour : (value.getUTCHours() + timezoneOffsetHours) % 24,
				minute : value.getUTCMinutes(),
				second : value.getUTCSeconds(),
				fractionalSecond : (value.getUTCMilliseconds() / 1000),
				timezone : timezoneOffsetHours * 60
			}));
		}
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isDate(value) && value.getTime() > -86400000 && value.getTime() < 86400000;
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Time'
});
Jsonix.Schema.XSD.Time.INSTANCE = new Jsonix.Schema.XSD.Time();
Jsonix.Schema.XSD.Time.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);
Jsonix.Schema.XSD.Date = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
	name : 'Date',
	typeName : Jsonix.Schema.XSD.qname('date'),
	parse : function(value) {
		var calendar = this.parseDate(value);
		//		
		if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
			var date = new Date();
			date.setFullYear(calendar.year);
			date.setMonth(calendar.month - 1);
			date.setDate(calendar.day);
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return new Date(date.getTime() - (60000 * date.getTimezoneOffset()) + (calendar.timezone * 60000));
		} else {
			var result = new Date();
			result.setFullYear(calendar.year);
			result.setMonth(calendar.month - 1);
			result.setDate(calendar.day);
			result.setHours(0);
			result.setMinutes(0);
			result.setSeconds(0);
			result.setMilliseconds(0);
			return result;
		}
	},
	print : function(value) {
		Jsonix.Util.Ensure.ensureDate(value);
		var localDate = new Date(value.getTime());
		localDate.setHours(0);
		localDate.setMinutes(0);
		localDate.setSeconds(0);
		localDate.setMilliseconds(0);

		var localTimezoneOffset = value.getTime() - localDate.getTime();
		if (localTimezoneOffset === 0) {
			return this.printDate(new Jsonix.XML.Calendar({
				year : value.getFullYear(),
				month : value.getMonth() + 1,
				day : value.getDate()
			}));
		} else {
			var timezoneOffset = localTimezoneOffset + (60000 * value.getTimezoneOffset());
			if (timezoneOffset <= 43200000) {
				return this.printDate(new Jsonix.XML.Calendar({
					year : value.getFullYear(),
					month : value.getMonth() + 1,
					day : value.getDate(),
					timezone : Math.floor(timezoneOffset / (60000))
				}));
			} else {
				var nextDay = new Date(value.getTime() + 86400000);
				return this.printDate(new Jsonix.XML.Calendar({
					year : nextDay.getFullYear(),
					month : nextDay.getMonth() + 1,
					day : nextDay.getDate(),
					timezone : (Math.floor(timezoneOffset / (60000)) - 1440)
				}));
			}
		}
	},
	isInstance : function(value) {
		return Jsonix.Util.Type.isDate(value);
	},
	CLASS_NAME : 'Jsonix.Schema.XSD.Date'
});
Jsonix.Schema.XSD.Date.INSTANCE = new Jsonix.Schema.XSD.Date();
Jsonix.Schema.XSD.Date.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);
Jsonix.Schema.XSD.GYearMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GYearMonth',
	typeName : Jsonix.Schema.XSD.qname('gYearMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GYearMonth'
});
Jsonix.Schema.XSD.GYearMonth.INSTANCE = new Jsonix.Schema.XSD.GYearMonth();
Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GYearMonth.INSTANCE);
Jsonix.Schema.XSD.GYear = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GYear',
	typeName : Jsonix.Schema.XSD.qname('gYear'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GYear'
});
Jsonix.Schema.XSD.GYear.INSTANCE = new Jsonix.Schema.XSD.GYear();
Jsonix.Schema.XSD.GYear.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GYear.INSTANCE);
Jsonix.Schema.XSD.GMonthDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonthDay',
	typeName : Jsonix.Schema.XSD.qname('gMonthDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonthDay'
});
Jsonix.Schema.XSD.GMonthDay.INSTANCE = new Jsonix.Schema.XSD.GMonthDay();
Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonthDay.INSTANCE);
Jsonix.Schema.XSD.GDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GDay',
	typeName : Jsonix.Schema.XSD.qname('gDay'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GDay'
});
Jsonix.Schema.XSD.GDay.INSTANCE = new Jsonix.Schema.XSD.GDay();
Jsonix.Schema.XSD.GDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GDay.INSTANCE);
Jsonix.Schema.XSD.GMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
	name : 'GMonth',
	typeName : Jsonix.Schema.XSD.qname('gMonth'),
	CLASS_NAME : 'Jsonix.Schema.XSD.GMonth'
});
Jsonix.Schema.XSD.GMonth.INSTANCE = new Jsonix.Schema.XSD.GMonth();
Jsonix.Schema.XSD.GMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.GMonth.INSTANCE);
Jsonix.Schema.XSD.ID = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'ID',
	typeName : Jsonix.Schema.XSD.qname('ID'),
	CLASS_NAME : 'Jsonix.Schema.XSD.ID'
});
Jsonix.Schema.XSD.ID.INSTANCE = new Jsonix.Schema.XSD.ID();
Jsonix.Schema.XSD.ID.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.ID.INSTANCE);
Jsonix.Schema.XSD.IDREF = Jsonix.Class(Jsonix.Schema.XSD.String, {
	name : 'IDREF',
	typeName : Jsonix.Schema.XSD.qname('IDREF'),
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREF'
});
Jsonix.Schema.XSD.IDREF.INSTANCE = new Jsonix.Schema.XSD.IDREF();
Jsonix.Schema.XSD.IDREF.INSTANCE.LIST = new Jsonix.Schema.XSD.List(
		Jsonix.Schema.XSD.IDREF.INSTANCE);
Jsonix.Schema.XSD.IDREFS = Jsonix.Class(Jsonix.Schema.XSD.List, {
	name : 'IDREFS',
	initialize : function() {
		Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.IDREF.INSTANCE, Jsonix.Schema.XSD.qname('IDREFS'), ' ' ]);
	},
	// TODO Constraints
	CLASS_NAME : 'Jsonix.Schema.XSD.IDREFS'
});
Jsonix.Schema.XSD.IDREFS.INSTANCE = new Jsonix.Schema.XSD.IDREFS();
Jsonix.Model.Adapter = Jsonix.Class({
	initialize : function() {
	},
	unmarshal: function(context, input, typeInfo)
	{
		return typeInfo.unmarshal(context, input);
	},
	marshal: function(context, value, output, typeInfo)
	{
		typeInfo.marshal(context, value, output);
	},	
	CLASS_NAME : "Jsonix.Model.Adapter"
});
Jsonix.Model.Adapter.INSTANCE = new Jsonix.Model.Adapter();
Jsonix.Model.Adapter.getAdapter = function (elementInfo)
{
	Jsonix.Util.Ensure.ensureObject(elementInfo);
	Jsonix.Util.Ensure.ensureObject(elementInfo.typeInfo);
	return Jsonix.Util.Type.exists(elementInfo.adapter) ? elementInfo.adapter : Jsonix.Model.Adapter.INSTANCE;
};
Jsonix.Model.ClassInfo = Jsonix
		.Class(Jsonix.Model.TypeInfo, {
			name : null,
			baseTypeInfo : null,
			properties : null,
			structure : null,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			built : false,
			initialize : function(options) {
				Jsonix.Model.TypeInfo.prototype.initialize.apply(this, []);
				Jsonix.Util.Ensure.ensureObject(options);
				Jsonix.Util.Ensure.ensureString(options.name);
				this.name = options.name;
				if (Jsonix.Util.Type
						.isString(options.defaultElementNamespaceURI)) {
					this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
				}
				if (Jsonix.Util.Type
						.isString(options.defaultAttributeNamespaceURI)) {
					this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
				}
				if (Jsonix.Util.Type.exists(options.baseTypeInfo)) {
					this.baseTypeInfo = options.baseTypeInfo;
				}
				this.properties = [];
				if (Jsonix.Util.Type.exists(options.propertyInfos)) {
					Jsonix.Util.Ensure.ensureArray(options.propertyInfos);
					for ( var index = 0; index < options.propertyInfos.length; index++) {
						this.p(options.propertyInfos[index]);
					}
				}
			},
			// Obsolete
			destroy : function() {
			},
			build : function(context, module) {
				if (!this.built) {
					this.baseTypeInfo = context
						.resolveTypeInfo(this.baseTypeInfo, module);
					if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
						this.baseTypeInfo.build(context, module);
					}

					// Build properties in this context
					for ( var index = 0; index < this.properties.length; index++) {
						var propertyInfo = this.properties[index];
						propertyInfo.build(context, module);
					}

					// Build the structure
					var structure = {
						elements : null,
						attributes : {},
						anyAttribute : null,
						value : null,
						any : null
					};
					this.buildStructure(context, structure);
					this.structure = structure;
				}
			},
			buildStructure : function(context, structure) {
				if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
					this.baseTypeInfo.buildStructure(context, structure);
				}
				for ( var index = 0; index < this.properties.length; index++) {
					var propertyInfo = this.properties[index];
					propertyInfo.buildStructure(context, structure);
				}
			},
			unmarshal : function(context, input) {
				this.build(context);
				var result = {
					TYPE_NAME : this.name
				};

				if (input.eventType !== 1) {
					throw new Error("Parser must be on START_ELEMENT to read a class info.");
				}

				// Read attributes
				if (Jsonix.Util.Type.exists(this.structure.attributes)) {
					var attributeCount = input.getAttributeCount();
					if (attributeCount !== 0) {
						for ( var index = 0; index < attributeCount; index++) {
							var attributeNameKey = input
									.getAttributeNameKey(index);
							if (Jsonix.Util.Type
									.exists(this.structure.attributes[attributeNameKey])) {
								var attributeValue = input
										.getAttributeValue(index);
								if (Jsonix.Util.Type.isString(attributeValue)) {
									var attributePropertyInfo = this.structure.attributes[attributeNameKey];
									this.unmarshalPropertyValue(context, input,
											attributePropertyInfo, result,
											attributeValue);
								}
							}
						}
					}
				}
				// Read any attribute
				if (Jsonix.Util.Type.exists(this.structure.anyAttribute)) {
					var propertyInfo = this.structure.anyAttribute;
					this
							.unmarshalProperty(context, input, propertyInfo,
									result);
				}
				// Read elements
				if (Jsonix.Util.Type.exists(this.structure.elements)) {

					var et = input.next();
					while (et !== Jsonix.XML.Input.END_ELEMENT) {
						if (et === Jsonix.XML.Input.START_ELEMENT) {
							// New sub-element starts
							var elementNameKey = input.getNameKey();
							if (Jsonix.Util.Type
									.exists(this.structure.elements[elementNameKey])) {
								var elementPropertyInfo = this.structure.elements[elementNameKey];
								this.unmarshalProperty(context, input,
										elementPropertyInfo, result);
							} else if (Jsonix.Util.Type
									.exists(this.structure.any)) {
								// TODO Refactor

								var anyPropertyInfo = this.structure.any;
								this.unmarshalProperty(context, input,
										anyPropertyInfo, result);
							} else {
								// TODO report a validation error that element
								// is not expected
								throw new Error('Unexpected element [' + elementNameKey + '].');
							}
						} else if ((et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE) && Jsonix.Util.Type.exists(this.structure.mixed)) {
							// Characters and structure has a mixed property
							var mixedPropertyInfo = this.structure.mixed;
							this.unmarshalProperty(context, input,
									mixedPropertyInfo, result);
						} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT	|| et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
							// Ignore
						} else {
							throw new Error("Illegal state: unexpected event type [" + et	+ "].");
						}
						et = input.next();
					}
				} else if (Jsonix.Util.Type.exists(this.structure.value)) {
					var valuePropertyInfo = this.structure.value;
					this.unmarshalProperty(context, input, valuePropertyInfo,
							result);
				} else {
					// Just skip everything
					input.nextTag();
				}
				if (input.eventType !== 2) {
					throw new Error("Illegal state: must be END_ELEMENT.");
				}
				return result;
			},
			unmarshalProperty : function(context, input, propertyInfo, result) {
				var propertyValue = propertyInfo
						.unmarshal(context, this, input);
				propertyInfo.setProperty(result, propertyValue);
			},
			unmarshalPropertyValue : function(context, input, propertyInfo,
					result, value) {
				var propertyValue = propertyInfo.unmarshalValue(context, this,
						input, value);
				propertyInfo.setProperty(result, propertyValue);
			},
			marshal : function(context, value, output) {
				// TODO This must be reworked
				if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
					this.baseTypeInfo.marshal(context, value, output);
				}
				for ( var index = 0; index < this.properties.length; index++) {
					var propertyInfo = this.properties[index];
					var propertyValue = value[propertyInfo.name];
					if (Jsonix.Util.Type.exists(propertyValue)) {
						propertyInfo.marshal(context, this, propertyValue,
								output);
					}
				}
			},
			isInstance : function(value) {
				return Jsonix.Util.Type.isObject(value)	&& Jsonix.Util.Type.isString(value.TYPE_NAME) && value.TYPE_NAME === this.name;
			},

			// Obsolete, left for backwards compatibility
			b : function(baseTypeInfo) {
				Jsonix.Util.Ensure.ensureObject(baseTypeInfo);
				this.baseTypeInfo = baseTypeInfo;
				return this;
			},
			// Obsolete, left for backwards compatibility
			ps : function() {
				return this;
			},
			p : function(property) {
				Jsonix.Util.Ensure.ensureObject(property);
				// If property is an instance of the property class
				if (property instanceof Jsonix.Model.PropertyInfo) {
					this.addProperty(property);
				}
				// Else create it via generic mapping configuration
				else {
					// Ensure property info type is provided
					Jsonix.Util.Ensure.ensureString(property.type);
					var type = property.type;
					// Locate the creator function
					if (Jsonix.Util.Type
							.isFunction(this.propertyInfoCreators[type])) {
						var propertyInfoCreator = this.propertyInfoCreators[type];
						// Call the creator function
						propertyInfoCreator.call(this, property);
					} else {
						throw new Error("Unknown property info type [" + type + "].");
					}
				}
			},
			aa : function(options) {
				this.addDefaultNamespaces(options);
				return this
						.addProperty(new Jsonix.Model.AnyAttributePropertyInfo(
								options));
			},
			ae : function(options) {
				this.addDefaultNamespaces(options);
				return this
						.addProperty(new Jsonix.Model.AnyElementPropertyInfo(
								options));
			},
			a : function(options) {
				this.addDefaultNamespaces(options);
				return this.addProperty(new Jsonix.Model.AttributePropertyInfo(
						options));
			},
			em : function(options) {
				this.addDefaultNamespaces(options);
				return this
						.addProperty(new Jsonix.Model.ElementMapPropertyInfo(
								options));
			},
			e : function(options) {
				this.addDefaultNamespaces(options);
				return this.addProperty(new Jsonix.Model.ElementPropertyInfo(
						options));
			},
			es : function(options) {
				this.addDefaultNamespaces(options);
				return this.addProperty(new Jsonix.Model.ElementsPropertyInfo(
						options));
			},
			er : function(options) {
				this.addDefaultNamespaces(options);
				return this
						.addProperty(new Jsonix.Model.ElementRefPropertyInfo(
								options));
			},
			ers : function(options) {
				this.addDefaultNamespaces(options);
				return this
						.addProperty(new Jsonix.Model.ElementRefsPropertyInfo(
								options));
			},
			v : function(options) {
				this.addDefaultNamespaces(options);
				return this.addProperty(new Jsonix.Model.ValuePropertyInfo(
						options));
			},
			addDefaultNamespaces : function(options) {
				if (Jsonix.Util.Type.isObject(options)) {
					if (!Jsonix.Util.Type
							.isString(options.defaultElementNamespaceURI)) {
						options.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
					}
					if (!Jsonix.Util.Type
							.isString(options.defaultAttributeNamespaceURI)) {
						options.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
					}
				}
			},
			addProperty : function(property) {
				this.properties.push(property);
				return this;
			},
			CLASS_NAME : 'Jsonix.Model.ClassInfo'
		});
Jsonix.Model.ClassInfo.prototype.propertyInfoCreators = {
	"anyAttribute" : Jsonix.Model.ClassInfo.prototype.aa,
	"anyElement" : Jsonix.Model.ClassInfo.prototype.ae,
	"attribute" : Jsonix.Model.ClassInfo.prototype.a,
	"elementMap" : Jsonix.Model.ClassInfo.prototype.em,
	"element" : Jsonix.Model.ClassInfo.prototype.e,
	"elements" : Jsonix.Model.ClassInfo.prototype.es,
	"elementRef" : Jsonix.Model.ClassInfo.prototype.er,
	"elementRefs" : Jsonix.Model.ClassInfo.prototype.ers,
	"value" : Jsonix.Model.ClassInfo.prototype.v
};
Jsonix.Model.ElementInfo = Jsonix.Class({
	elementName : null,
	typeInfo : null,
	substitutionHead : null,
	scope : null,
	built : false,
	initialize : function(mapping) {
		Jsonix.Util.Ensure.ensureObject(mapping);
		// TODO elementName may be string
		Jsonix.Util.Ensure.ensureObject(mapping.elementName);
		this.elementName = mapping.elementName;
		Jsonix.Util.Ensure.ensureExists(mapping.typeInfo);
		this.typeInfo = mapping.typeInfo;
		if (Jsonix.Util.Type.exists(mapping.substitutionHead)) {
			this.substitutionHead = mapping.substitutionHead;
		}
		if (Jsonix.Util.Type.exists(mapping.scope)) {
			this.scope = mapping.scope;
		}
	},
	build : function(context, module) {
		// If element info is not yet built
		if (!this.built) {
			this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			this.scope = context.resolveTypeInfo(this.scope, module);
			this.built = true;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementInfo'
});
Jsonix.Model.PropertyInfo = Jsonix
		.Class({
			name : null,
			collection : false,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			built : false,
			initialize : function(options) {
				Jsonix.Util.Ensure.ensureObject(options);
				Jsonix.Util.Ensure.ensureString(options.name);
				this.name = options.name;
				if (Jsonix.Util.Type
						.isString(options.defaultElementNamespaceURI)) {
					this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
				}
				if (Jsonix.Util.Type
						.isString(options.defaultAttributeNamespaceURI)) {
					this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
				}
				if (Jsonix.Util.Type.isBoolean(options.collection)) {
					this.collection = options.collection;
				} else {
					this.collection = false;
				}
			},
			build : function(context, module) {
				if (!this.built) {
					this.doBuild(context, module);
					this.built = true;
				}
			},
			doBuild : function(context, module) {
				throw new Error("Abstract method [doBuild].");
			},
			buildStructure : function(context, structure) {
				throw new Error("Abstract method [buildStructure].");
			},
			setProperty : function(object, value) {
				if (Jsonix.Util.Type.exists(value)) {
					if (this.collection) {
						Jsonix.Util.Ensure.ensureArray(value,
								'Collection property requires an array value.');
						if (!Jsonix.Util.Type.exists(object[this.name])) {
							object[this.name] = [];
						}
						for ( var index = 0; index < value.length; index++) {
							object[this.name].push(value[index]);
						}

					} else {
						object[this.name] = value;
					}
				}
			},
			CLASS_NAME : 'Jsonix.Model.PropertyInfo'
		});
Jsonix.Model.AnyAttributePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
	},
	unmarshal : function(context, scope, input) {
		var attributeCount = input.getAttributeCount();
		if (attributeCount === 0) {
			return null;
		} else {
			var result = {};
			for ( var index = 0; index < attributeCount; index++) {
				var attributeNameKey = input.getAttributeNameKey(index);
				var attributeValue = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(attributeValue)) {
					result[attributeNameKey] = attributeValue;
				}
			}
			return result;
		}
	},
	marshal : function(context, scope, value, output) {
		if (!Jsonix.Util.Type.isObject(value)) {
			// Nothing to do
			return;
		}
		for ( var attributeName in value) {
			if (value.hasOwnProperty(attributeName)) {
				var attributeValue = value[attributeName];
				if (Jsonix.Util.Type.isString(attributeValue)) {
					output.writeAttribute(Jsonix.XML.QName.fromString(attributeName), attributeValue);
				}
			}
		}

	},
	doBuild : function(context, module)	{
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.anyAttribute))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an any attribute
		// property.");
		// } else
		// {
		structure.anyAttribute = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AnyAttributePropertyInfo'
});

Jsonix.Model.SingleTypePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo,
		{
			typeInfo : 'String',
			initialize : function(options) {
				Jsonix.Util.Ensure.ensureObject(options);
				Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,
						[ options ]);
				if (Jsonix.Util.Type.exists(options.typeInfo)) {
					this.typeInfo = options.typeInfo;
				}
			},
			doBuild : function(context, module) {
				this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			},
			unmarshalValue : function(context, scope, input, value) {
				return this.parse(context, scope, value);
			},
			parse : function(context, scope, value) {
				return this.typeInfo.parse(value);
			},
			print : function(context, scope, value) {
				return this.typeInfo.print(value);
			},
			CLASS_NAME : 'Jsonix.Model.SingleTypePropertyInfo'
		});

Jsonix.Model.AttributePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	attributeName : null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
		// TODO Ensure correct argument
		if (Jsonix.Util.Type.isObject(options.attributeName)) {
			Jsonix.Util.Ensure.ensureString(options.attributeName.localPart, 'Attribute name must contain a string property [localPart].');
			this.attributeName = Jsonix.XML.QName.fromObject(options.attributeName);
		} else if (Jsonix.Util.Type.isString(options.attributeName)) {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, options.attributeName);
		} else {
			this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, this.name);
		}
	},
	unmarshal : function(context, scope, input) {
		var attributeCount = input.getAttributeCount();
		var result = null;
		for ( var index = 0; index < attributeCount; index++) {
			var attributeNameKey = input.getAttributeNameKey(index);
			if (this.attributeName.key === attributeNameKey) {
				var attributeValue = input.getAttributeValue(index);
				if (Jsonix.Util.Type.isString(attributeValue)) {
					result = this.unmarshalValue(context, scope, input, attributeValue);
				}
			}
		}
		return result;
	},
	marshal : function(context, scope, value, output) {
		if (Jsonix.Util.Type.exists(value)) {
			output.writeAttribute(this.attributeName, this.print(context, scope, value));
		}

	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		Jsonix.Util.Ensure.ensureObject(structure.attributes);
		var key = this.attributeName.key;
		// if (Jsonix.Util.Type.exists(structure.attributes[key])) {
		// // TODO better exception
		// throw new Error("The structure already defines an attribute for the key
		// ["
		// + key + "].");
		// } else
		// {
		structure.attributes[key] = this;
		// }
	},
	CLASS_NAME : 'Jsonix.Model.AttributePropertyInfo'
});

Jsonix.Model.ValuePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
	},
	unmarshal : function(context, scope, input) {
		var text = input.getElementText();
		if (Jsonix.Util.StringUtils.isNotBlank(text)) {
			return this.unmarshalValue(context, scope, input, text);
		} else {
			return null;
		}
	},
	marshal : function(context, scope, value, output) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		output.writeCharacters(this.print(context, scope, value));
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		// if (Jsonix.Util.Type.exists(structure.value)) {
		// // TODO better exception
		// throw new Error("The structure already defines a value
		// property.");
		// } else
		if (Jsonix.Util.Type.exists(structure.elements)) {
			// TODO better exception
			throw new Error("The structure already defines element mappings, it cannot define a value property.");
		} else {
			structure.value = this;
		}
	},
	CLASS_NAME : 'Jsonix.Model.ValuePropertyInfo'
});

Jsonix.Model.AbstractElementsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
		// TODO Ensure correct argument
		if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
			Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, 'Wrapper element name must contain a string property [localPart].');
			this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
		} else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
		} else {
			this.wrapperElementName = null;
		}
	},
	unmarshal : function(context, scope, input) {
		var result = null;
		var that = this;
		var callback = function(value) {
			if (that.collection) {
				if (result === null) {
					result = [];
				}
				result.push(value);

			} else {
				if (result === null) {
					result = value;
				} else {
					// TODO Report validation error
					throw new Error("Value already set.");
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, callback);
		} else {
			this.unmarshalElement(context, input, callback);
		}
		return result;
	},
	unmarshalWrapperElement : function(context, input, callback) {
		var et = input.next();
		while (et !== Jsonix.XML.Input.END_ELEMENT) {
			// New sub-element starts
			if (et === Jsonix.XML.Input.START_ELEMENT) {
				this.unmarshalElement(context, input, callback);
			} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
				// Skip whitespace
			} else {
				// TODO ignore comments, processing
				// instructions
				throw new Error("Illegal state: unexpected event type [" + et + "].");
			}
			et = input.next();
		}
	},
	unmarshalElement : function(context, input, callback) {
		throw new Error("Abstract method [unmarshalElement].");
	},
	marshal : function(context, scope, value, output) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		if (!this.collection) {
			this.marshalElement(context, value, output);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			// TODO Exception if not array
			for ( var index = 0; index < value.length; index++) {
				var item = value[index];
				// TODO Exception if item does not exist
				this.marshalElement(context, item, output);
			}
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	marshalElement : function(context, value, output) {
		throw new Error("Abstract method [marshalElement].");
	},
	marshalElementTypeInfo : function(context, value, elementName, typeInfo, output) {
		output.writeStartElement(elementName);
		typeInfo.marshal(context, value, output);
		output.writeEndElement();
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	CLASS_NAME : 'Jsonix.Model.AbstractElementsPropertyInfo'
});

Jsonix.Model.ElementPropertyInfo = Jsonix.Class(
		Jsonix.Model.AbstractElementsPropertyInfo, {
			typeInfo : 'String',
			elementName : null,
			initialize : function(options) {
				Jsonix.Util.Ensure.ensureObject(options);
				Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize
						.apply(this, [ options ]);
				// TODO Ensure correct argument
				if (Jsonix.Util.Type.exists(options.typeInfo)) {
					if (Jsonix.Util.Type.isObject(options.typeInfo)) {
						Jsonix.Util.Ensure.ensureObject(options.typeInfo);
						this.typeInfo = options.typeInfo;
					} else {
						Jsonix.Util.Ensure.ensureString(options.typeInfo);
						this.typeInfo = options.typeInfo;
					}
				}
				// TODO Ensure correct argument
				if (Jsonix.Util.Type.isObject(options.elementName)) {
					this.elementName = Jsonix.XML.QName
							.fromObject(options.elementName);
				} else if (Jsonix.Util.Type.isString(options.elementName)) {
					this.elementName = new Jsonix.XML.QName(
							this.defaultElementNamespaceURI,
							options.elementName);
				} else {
					this.elementName = new Jsonix.XML.QName(
							this.defaultElementNamespaceURI, this.name);
				}
			},
			unmarshalElement : function(context, input, callback) {
				return callback(this.typeInfo.unmarshal(context, input));
			},
			marshalElement : function(context, value, output) {
				this.marshalElementTypeInfo(context, value, this.elementName,
						this.typeInfo, output);
			},
			doBuild : function(context, module) {
				this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			},
			buildStructureElements : function(context, structure) {
				structure.elements[this.elementName.key] = this;
			},
			CLASS_NAME : 'Jsonix.Model.ElementPropertyInfo'
		});

Jsonix.Model.ElementsPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementsPropertyInfo,
				{
					elementTypeInfos : null,
					elementTypeInfosMap : null,
					initialize : function(options) {
						Jsonix.Util.Ensure.ensureObject(options);
						Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize
								.apply(this, [ options ]);
						// TODO Ensure correct arguments
						Jsonix.Util.Ensure
								.ensureArray(options.elementTypeInfos);
						this.elementTypeInfos = options.elementTypeInfos;
					},
					unmarshalElement : function(context, input, callback) {
						// TODO make sure it's the right event type
						var elementNameKey = input.getNameKey();
						var typeInfo = this.elementTypeInfosMap[elementNameKey];
						if (Jsonix.Util.Type.exists(typeInfo)) {
							return callback(typeInfo.unmarshal(context, input));
						}
						// TODO better exception
						throw new Error("Element [" + elementNameKey + "] is not known in this context");
					},
					marshalElement : function(context, value, output) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							var typeInfo = elementTypeInfo.typeInfo;
							if (typeInfo.isInstance(value)) {
								var elementName = elementTypeInfo.elementName;
								this.marshalElementTypeInfo(context, value,
										elementName, typeInfo, output);
								return;
							}
						}
						throw new Error("Could not find an element with type info supporting the value ["	+ value + "].");
					},
					doBuild : function(context, module) {
						this.elementTypeInfosMap = {};
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							elementTypeInfo.typeInfo = context.resolveTypeInfo(
									elementTypeInfo.typeInfo, module);
							Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
							if (Jsonix.Util.Type
									.isObject(elementTypeInfo.elementName)) {
								Jsonix.Util.Ensure
										.ensureString(
												elementTypeInfo.elementName.localPart,
												'Element name must contain a string property [localPart].');
								elementTypeInfo.elementName = Jsonix.XML.QName
										.fromObject(elementTypeInfo.elementName);
							} else {
								Jsonix.Util.Ensure
										.ensureString(elementTypeInfo.elementName);
								elementTypeInfo.elementName = new Jsonix.XML.QName(
										this.defaultElementNamespaceURI,
										elementTypeInfo.elementName);
							}
							this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
						}
					},
					buildStructureElements : function(context, structure) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							structure.elements[elementTypeInfo.elementName.key] = this;
						}
					},
					CLASS_NAME : 'Jsonix.Model.ElementsPropertyInfo'
				});

Jsonix.Model.ElementMapPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
	elementName : null,
	key : null,
	value : null,
	entryTypeInfo : null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
		// TODO Ensure correct argument
		Jsonix.Util.Ensure.ensureObject(options.key);
		Jsonix.Util.Ensure.ensureObject(options.value);
		// TODO Ensure correct argument
		if (Jsonix.Util.Type.isObject(options.elementName)) {
			Jsonix.Util.Ensure.ensureString(options.elementName.localPart, 'Element name must contain a string property [localPart].');
			this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
		} else if (Jsonix.Util.Type.isString(options.elementName)) {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
		} else {
			this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
		}
		this.entryTypeInfo = new Jsonix.Model.ClassInfo({
			name : "",
			localName: "",
			propertyInfos : [ options.key, options.value ]
		});

	},
	unmarshalWrapperElement : function(context, input) {
		var result = Jsonix.Model.AbstractElementsPropertyInfo.prototype.unmarshalWrapperElement.apply(this, arguments);
	},
	unmarshal : function(context, scope, input) {
		var result = null;
		var that = this;
		var callback = function(value) {

			if (Jsonix.Util.Type.exists(value)) {
				Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
				if (!Jsonix.Util.Type.exists(result)) {
					result = {};
				}
				for ( var attributeName in value) {
					if (value.hasOwnProperty(attributeName)) {
						var attributeValue = value[attributeName];
						if (that.collection) {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = [];
							}
							result[attributeName].push(attributeValue);
						} else {
							if (!Jsonix.Util.Type.exists(result[attributeName])) {
								result[attributeName] = attributeValue;
							} else {
								// TODO Report validation error
								throw new Error("Value was already set.");
							}
						}
					}
				}
			}
		};

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			this.unmarshalWrapperElement(context, input, callback);
		} else {
			this.unmarshalElement(context, input, callback);
		}
		return result;
	},
	unmarshalElement : function(context, input, callback) {
		var entry = this.entryTypeInfo.unmarshal(context, input);
		var result = {};
		if (!!entry[this.key.name]) {
			result[entry[this.key.name]] = entry[this.value.name];
		}
		return callback(result);
	},
	marshal : function(context, scope, value, output) {

		if (!Jsonix.Util.Type.exists(value)) {
			// Do nothing
			return;
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeStartElement(this.wrapperElementName);
		}

		this.marshalElement(context, value, output);

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			output.writeEndElement();
		}
	},
	marshalElement : function(context, value, output) {
		if (!!value) {
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (!this.collection) {
						var singleEntry = {};
						singleEntry[this.key.name] = attributeName;
						singleEntry[this.value.name] = attributeValue;
						output.writeStartElement(this.elementName);
						this.entryTypeInfo.marshal(context, singleEntry, output);
						output.writeEndElement();

					} else {
						for ( var index = 0; index < attributeValue.length; index++) {
							var collectionEntry = {};
							collectionEntry[this.key.name] = attributeName;
							collectionEntry[this.value.name] = attributeValue[index];
							output.writeStartElement(this.elementName);
							this.entryTypeInfo.marshal(context, collectionEntry, output);
							output.writeEndElement();
						}
					}
				}
			}
		}
	},
	doBuild: function(context, module) {
		this.entryTypeInfo.build(context, module);
		// TODO get property by name
		this.key = this.entryTypeInfo.properties[0]; 
		this.value = this.entryTypeInfo.properties[1];
	},
	buildStructureElements : function(context, structure) {
		structure.elements[this.elementName.key] = this;
	},
	setProperty : function(object, value) {
		if (Jsonix.Util.Type.exists(value)) {
			Jsonix.Util.Ensure.ensureObject(value, 'Map property requires an object.');
			if (!Jsonix.Util.Type.exists(object[this.name])) {
				object[this.name] = {};
			}
			var map = object[this.name];
			for ( var attributeName in value) {
				if (value.hasOwnProperty(attributeName)) {
					var attributeValue = value[attributeName];
					if (this.collection) {
						if (!Jsonix.Util.Type.exists(map[attributeName])) {
							map[attributeName] = [];
						}

						for ( var index = 0; index < attributeValue.length; index++) {
							map[attributeName].push(attributeValue[index]);
						}
					} else {
						map[attributeName] = attributeValue;
					}
				}
			}
		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementMapPropertyInfo'
});

Jsonix.Model.AbstractElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	wrapperElementName : null,
	mixed : false,
	// TODO
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options, 'Options argument must be an object.');
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
		if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
			Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, 'Wrapper element name must contain a string property [localPart].');
			this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
		} else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
			this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
		} else {
			this.wrapperElementName = null;
		}
		if (Jsonix.Util.Type.isBoolean(options.mixed)) {
			this.mixed = options.mixed;
		} else {
			this.mixed = false;
		}
	},
	unmarshal : function(context, scope, input) {
		var et = input.eventType;

		if (et === Jsonix.XML.Input.START_ELEMENT) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				return this.unmarshalWrapperElement(context, scope, input);
			} else {
				return this.unmarshalElement(context, scope, input);
			}
		} else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
			var value = input.getText();
			if (this.collection) {
				return [ value ];

			} else {
				return value;
			}
		} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			// Skip whitespace
		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");
		}
	},
	unmarshalWrapperElement : function(context, scope, input) {
		var result = null;
		var et = input.next();
		while (et !== Jsonix.XML.Input.END_ELEMENT) {
			if (et === Jsonix.XML.Input.START_ELEMENT) {
				var value = this.unmarshalElement(context, scope, input);
				if (this.collection) {
					if (result === null) {
						result = [];
					}
					for ( var index = 0; index < value.length; index++) {
						result.push(value[index]);
					}

				} else {
					if (result === null) {
						result = value;
					} else {
						// TODO Report validation error
						throw new Error("Value already set.");
					}
				}
			} else
			// Characters
			if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
				var text = input.getText();
				if (this.collection) {
					if (result === null) {
						result = [];
					}
					result.push(text);
				} else {
					if (result === null) {
						result = text;
					} else {
						// TODO Report validation error
						throw new Error("Value already set.");
					}
				}
			} else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
				// Skip whitespace
			} else {
				throw new Error("Illegal state: unexpected event type [" + et + "].");
			}
			et = input.next();
		}
		return result;
	},
	unmarshalElement : function(context, scope, input) {
		var name = input.getName();
		var typeInfo = this.getElementTypeInfo(context, scope, name);
		var value = {
			name : name,
			value : typeInfo.unmarshal(context, input)
		};
		if (this.collection) {
			return [ value ];
		} else {
			return value;
		}
	},
	marshal : function(context, scope, value, output) {

		if (Jsonix.Util.Type.exists(value)) {
			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeStartElement(this.wrapperElementName);
			}

			if (!this.collection) {
				this.marshalItem(context, scope, value, output);
			} else {
				Jsonix.Util.Ensure.ensureArray(value, 'Collection property requires an array value.');
				for ( var index = 0; index < value.length; index++) {
					var item = value[index];
					this.marshalItem(context, scope, item, output);
				}
			}

			if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
				output.writeEndElement();
			}
		}

	},
	marshalItem : function(context, scope, value, output) {

		if (Jsonix.Util.Type.isString(value)) {
			if (!this.mixed) {
				// TODO
				throw new Error("Property is not mixed, can't handle string values.");
			} else {
				output.writeCharacters(value);
			}
		} else if (Jsonix.Util.Type.isObject(value)) {
			this.marshalElement(context, scope, value, output);

		} else {
			if (this.mixed) {
				throw new Error("Unsupported content type, either objects or strings are supported.");
			} else {
				throw new Error("Unsupported content type, only objects are supported.");
			}
		}

	},
	marshalElement : function(context, scope, value, output) {
		var elementName = Jsonix.XML.QName.fromObject(value.name);
		var typeInfo = this.getElementTypeInfo(context, scope, elementName);
		return this.marshalElementTypeInfo(context, value, elementName, typeInfo, output);
	},
	marshalElementTypeInfo : function(context, value, elementName, typeInfo, output) {
		output.writeStartElement(elementName);
		if (Jsonix.Util.Type.exists(value.value)) {
			typeInfo.marshal(context, value.value, output);
		}
		output.writeEndElement();

	},
	getElementTypeInfo : function(context, scope, elementName) {
		var propertyElementTypeInfo = this.getPropertyElementTypeInfo(elementName);
		if (Jsonix.Util.Type.exists(propertyElementTypeInfo)) {
			return propertyElementTypeInfo.typeInfo;
		} else {
			var contextElementTypeInfo = context.getElementInfo(elementName, scope);
			if (Jsonix.Util.Type.exists(contextElementTypeInfo)) {
				return contextElementTypeInfo.typeInfo;
			} else {
				throw new Error("Element [" + elementName.key + "] is not known in this context.");
			}
		}

	},
	getPropertyElementTypeInfo : function(elementName) {
		throw new Error("Abstract method [getPropertyElementTypeInfo].");
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
			structure.elements[this.wrapperElementName.key] = this;
		} else {
			this.buildStructureElements(context, structure);
		}

		// if (Jsonix.Util.Type.exists(structure.elements[key]))
		// {
		// // TODO better exception
		// throw new Error("The structure already defines an element for
		// the key ["
		// + key + "].");
		// } else
		// {
		// structure.elements[key] = this;
		// }

		if (this.mixed && !Jsonix.Util.Type.exists(this.wrapperElementName)) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	buildStructureElements : function(context, structure) {
		throw new Error("Abstract method [buildStructureElements].");
	},
	buildStructureElementTypeInfos : function(context, structure, elementTypeInfo) {
		structure.elements[elementTypeInfo.elementName.key] = this;
		var substitutionMembers = context.getSubstitutionMembers(elementTypeInfo.elementName);
		if (Jsonix.Util.Type.isArray(substitutionMembers)) {
			for ( var jndex = 0; jndex < substitutionMembers.length; jndex++) {
				var substitutionElementInfo = substitutionMembers[jndex];
				this.buildStructureElementTypeInfos(context, structure, substitutionElementInfo);
			}

		}
	},
	CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
});

Jsonix.Model.ElementRefPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementRefsPropertyInfo,
				{
					typeInfo : 'String',
					elementName : null,
					initialize : function(options) {
						Jsonix.Util.Ensure.ensureObject(options);
						Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize
								.apply(this, [ options ]);
						// TODO Ensure correct argument
						if (Jsonix.Util.Type.exists(options.typeInfo)) {
							if (Jsonix.Util.Type.isObject(options.typeInfo)) {
								Jsonix.Util.Ensure
										.ensureObject(options.typeInfo);
								this.typeInfo = options.typeInfo;
							} else {
								Jsonix.Util.Ensure
										.ensureString(options.typeInfo);
								this.typeInfo = options.typeInfo;
							}
						}
						// TODO Ensure correct argument
						if (Jsonix.Util.Type.isObject(options.elementName)) {
							this.elementName = Jsonix.XML.QName
									.fromObject(options.elementName);
						} else if (Jsonix.Util.Type
								.isString(options.elementName)) {
							this.elementName = new Jsonix.XML.QName(
									this.defaultElementNamespaceURI,
									options.elementName);
						} else {
							this.elementName = new Jsonix.XML.QName(
									this.defaultElementNamespaceURI, this.name);
						}
					},
					getPropertyElementTypeInfo : function(elementName) {
						Jsonix.Util.Ensure.ensureObject(elementName);
						Jsonix.Util.Ensure.ensureString(elementName.localPart);
						var name = Jsonix.XML.QName.fromObject(elementName);

						if (name.key === this.elementName.key) {
							return this;
						} else {
							return null;
						}
					},
					doBuild : function(context, module) {
						this.typeInfo = context.resolveTypeInfo(this.typeInfo,
								module);
					},
					buildStructureElements : function(context, structure) {
						this.buildStructureElementTypeInfos(context, structure,
								this);
					},
					CLASS_NAME : 'Jsonix.Model.ElementRefPropertyInfo'
				});

Jsonix.Model.ElementRefsPropertyInfo = Jsonix
		.Class(
				Jsonix.Model.AbstractElementRefsPropertyInfo,
				{
					elementTypeInfos : null,
					elementTypeInfosMap : null,
					initialize : function(options) {
						Jsonix.Util.Ensure.ensureObject(options);
						Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize
								.apply(this, [ options ]);
						// TODO Ensure correct arguments
						Jsonix.Util.Ensure
								.ensureArray(options.elementTypeInfos);
						this.elementTypeInfos = options.elementTypeInfos;
					},
					getPropertyElementTypeInfo : function(elementName) {
						Jsonix.Util.Ensure.ensureObject(elementName);
						Jsonix.Util.Ensure.ensureString(elementName.localPart);
						var name = Jsonix.XML.QName.fromObject(elementName);

						var typeInfo = this.elementTypeInfosMap[name.key];
						if (Jsonix.Util.Type.exists(typeInfo)) {
							return {
								elementName : name,
								typeInfo : typeInfo
							};
						} else {
							return null;
						}
					},
					doBuild : function(context, module) {
						this.elementTypeInfosMap = {};
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							elementTypeInfo.typeInfo = context.resolveTypeInfo(
									elementTypeInfo.typeInfo, module);
							Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
							if (Jsonix.Util.Type
									.isObject(elementTypeInfo.elementName)) {
								Jsonix.Util.Ensure
										.ensureString(
												elementTypeInfo.elementName.localPart,
												'Element name must contain a string property [localPart].');
								elementTypeInfo.elementName = Jsonix.XML.QName
										.fromObject(elementTypeInfo.elementName);
							} else {
								Jsonix.Util.Ensure
										.ensureString(elementTypeInfo.elementName);
								elementTypeInfo.elementName = new Jsonix.XML.QName(
										this.defaultElementNamespaceURI,
										elementTypeInfo.elementName);
							}
							this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
						}
					},
					buildStructureElements : function(context, structure) {
						for ( var index = 0; index < this.elementTypeInfos.length; index++) {
							var elementTypeInfo = this.elementTypeInfos[index];
							this.buildStructureElementTypeInfos(context,
									structure, elementTypeInfo);
						}
					},
					CLASS_NAME : 'Jsonix.Model.ElementRefsPropertyInfo'
				});

Jsonix.Model.AnyElementPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
	allowDom : true,
	allowTypedObject : true,
	mixed : true,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
		if (Jsonix.Util.Type.isBoolean(options.allowDom)) {
			this.allowDom = options.allowDom;
		} else {
			this.allowDom = true;
		}
		if (Jsonix.Util.Type.isBoolean(options.allowTypedObject)) {
			this.allowTypedObject = options.allowTypedObject;
		} else {
			this.allowTypedObject = true;
		}
		if (Jsonix.Util.Type.isBoolean(options.mixed)) {
			this.mixed = options.mixed;
		} else {
			this.mixed = true;
		}
	},
	unmarshal : function(context, scope, input) {
		var et = input.eventType;

		if (et === Jsonix.XML.Input.START_ELEMENT) {
			return this.unmarshalElement(context, scope, input);
		} else if (this.mixed && (et === 4 || et === 12 || et === 9)) {
			var value = input.getText();
			if (this.collection) {
				return [ value ];

			} else {
				return value;
			}
		} else if (this.mixed && (et === Jsonix.XML.Input.SPACE)) {
			// Whitespace
			return null;
		} else if (et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
			return null;

		} else {
			// TODO better exception
			throw new Error("Illegal state: unexpected event type [" + et + "].");

		}
	},
	unmarshalElement : function(context, scope, input) {

		var name = input.getName();
		var value;

		if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name, scope))) {
			// TODO optimize
			var elementDeclaration = context.getElementInfo(name, scope);
			var typeInfo = elementDeclaration.typeInfo;
			var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
			value = {
				name : name,
				value : adapter.unmarshal(context, input, typeInfo)
			};
		} else if (this.allowDom) {
			value = input.getElement();
		} else {
			// TODO better exception
			throw new Error("Element [" + name.toString() + "] is not known in this context and property does not allow DOM.");
		}
		if (this.collection) {
			return [ value ];
		} else {
			return value;
		}
	},
	marshal : function(context, scope, value, output) {
		if (!Jsonix.Util.Type.exists(value)) {
			return;
		}
		if (!this.collection) {
			this.marshalItem(context, value, output);
		} else {
			Jsonix.Util.Ensure.ensureArray(value);
			for ( var index = 0; index < value.length; index++) {
				this.marshalItem(context, value[index], output);
			}
		}
	},
	marshalItem : function(context, value, output) {
		if (this.mixed && Jsonix.Util.Type.isString(value)) {
			// Mixed
			output.writeCharacters(value);
		} else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
			// DOM node
			output.writeNode(value);

		} else {
			// Typed object
			var name = Jsonix.XML.QName.fromObject(value.name);
			if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name))) {
				var elementDeclaration = context.getElementInfo(name);
				var typeInfo = elementDeclaration.typeInfo;
				var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
				output.writeStartElement(name);
				adapter.marshal(context, value.value, output, typeInfo);
				output.writeEndElement();
			} else {
				// TODO better exception
				throw new Error("Element [" + name.toString() + "] is not known in this context");
			}
		}
	},
	doBuild : function(context, module)	{
		// Nothing to do
	},
	buildStructure : function(context, structure) {
		Jsonix.Util.Ensure.ensureObject(structure);
		if (Jsonix.Util.Type.exists(structure.value)) {
			// TODO better exception
			throw new Error("The structure already defines a value property.");
		} else if (!Jsonix.Util.Type.exists(structure.elements)) {
			structure.elements = {};
		}

		if ((this.allowDom || this.allowTypedObject)) {
			// if (Jsonix.Util.Type.exists(structure.any)) {
			// // TODO better exception
			// throw new Error("The structure already defines the any
			// property.");
			// } else
			// {
			structure.any = this;
			// }
		}
		if (this.mixed) {
			// if (Jsonix.Util.Type.exists(structure.mixed)) {
			// // TODO better exception
			// throw new Error("The structure already defines the mixed
			// property.");
			// } else
			// {
			structure.mixed = this;
			// }
		}
	},
	CLASS_NAME : 'Jsonix.Model.AnyElementPropertyInfo'
});

Jsonix.Model.Module = Jsonix
		.Class({
			name : null,
			typeInfos : null,
			elementInfos : null,
			defaultElementNamespaceURI : '',
			defaultAttributeNamespaceURI : '',
			initialize : function(options) {
				this.typeInfos = [];
				this.elementInfos = [];
				if (typeof options !== 'undefined') {
					Jsonix.Util.Ensure.ensureObject(options);
					if (Jsonix.Util.Type.isString(options.name)) {
						this.name = options.name;
					}
					if (Jsonix.Util.Type
							.isString(options.defaultElementNamespaceURI)) {
						this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
					}
					if (Jsonix.Util.Type
							.isString(options.defaultAttributeNamespaceURI)) {
						this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
					}
					// Initialize type infos
					if (Jsonix.Util.Type.isArray(options.typeInfos)) {
						this.initializeTypeInfos(options.typeInfos);
					}
					// Backwards compatibility: class infos can also be defined
					// as properties of the schema, for instance Schema.MyType
					for ( var typeInfoName in options) {
						if (options.hasOwnProperty(typeInfoName)) {
							if (options[typeInfoName] instanceof Jsonix.Model.ClassInfo) {
								this.typeInfos.push(options[typeInfoName]);
							}
						}
					}
					// Initialize element infos
					if (Jsonix.Util.Type.isArray(options.elementInfos)) {
						this.initializeElementInfos(options.elementInfos);
					}
				}
			},
			initializeTypeInfos : function(typeInfoMappings) {
				Jsonix.Util.Ensure.ensureArray(typeInfoMappings);
				var index, typeInfoMapping, typeInfo;
				for (index = 0; index < typeInfoMappings.length; index++) {
					typeInfoMapping = typeInfoMappings[index];
					typeInfo = this.createTypeInfo(typeInfoMapping);
					this.typeInfos.push(typeInfo);
				}
			},
			initializeElementInfos : function(elementInfoMappings) {
				Jsonix.Util.Ensure.ensureArray(elementInfoMappings);
				var index, elementInfoMapping, elementInfo;
				for (index = 0; index < elementInfoMappings.length; index++) {
					elementInfoMapping = elementInfoMappings[index];
					elementInfo = this.createElementInfo(elementInfoMapping);
					this.elementInfos.push(elementInfo);
				}
			},
			createTypeInfo : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				var typeInfo;
				// If mapping is already a type info, do nothing
				if (mapping instanceof Jsonix.Model.TypeInfo) {
					typeInfo = mapping;
				}
				// Else create it via generic mapping configuration
				else {
					// Ensure property info type is provided
					Jsonix.Util.Ensure.ensureString(mapping.type);
					var type = mapping.type;
					// Locate the creator function
					if (Jsonix.Util.Type
							.isFunction(this.typeInfoCreators[type])) {
						var typeInfoCreator = this.typeInfoCreators[type];
						// Call the creator function
						typeInfo = typeInfoCreator.call(this, mapping);
					} else {
						throw new Error("Unknown type info type [" + type + "].");
					}
				}
				return typeInfo;
			},
			createClassInfo : function(options) {
				Jsonix.Util.Ensure.ensureObject(options);
				if (!Jsonix.Util.Type
						.isString(options.defaultElementNamespaceURI)) {
					options.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
				}
				if (!Jsonix.Util.Type
						.isString(options.defaultAttributeNamespaceURI)) {
					options.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
				}

				// Calculate both name as well as localName
				// name is provided
				if (Jsonix.Util.Type.isString(options.name)) {
					// localName is not provided
					if (!Jsonix.Util.Type.isString(options.localName)) {
						// But module name is provided
						if (Jsonix.Util.Type.isString(this.name)) {
							// If name starts with module name, use second part
							// as local name
							if (options.name.indexOf(this.name + '.') === 0) {
								options.localName = options.name
										.substring(this.name.length + 1);
							}
							// Else use name as local name
							else {
								options.localName = options.name;
							}
						}
						// Module name is not provided, use name as local name
						else {
							options.localName = options.name;
						}
					}
				}
				// name is not provided but local name is provided
				else if (Jsonix.Util.Type.isString(options.localName)) {
					// Module name is provided
					if (Jsonix.Util.Type.isString(this.name)) {
						options.name = this.name + '.' + options.localName;
					}
					// Module name is not provided
					else {
						options.name = options.localName;
					}
				} else {
					throw new Error("Neither [name] nor [localName] was provided for the class info.");
				}
				// Now both name an local name are initialized
				var classInfo = new Jsonix.Model.ClassInfo(options);
				return classInfo;
			},
			createList : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				Jsonix.Util.Ensure.ensureExists(mapping.typeInfo);
				var typeInfo = mapping.typeInfo;
				var typeName = mapping.typeName || null;
				var separator = mapping.separator || ' ';
				return new Jsonix.Schema.XSD.List(typeInfo, typeName, separator);
			},
			createElementInfo : function(options) {
				Jsonix.Util.Ensure.ensureObject(options);
				Jsonix.Util.Ensure.ensureExists(options.elementName);
				Jsonix.Util.Ensure.ensureExists(options.typeInfo);
				if (Jsonix.Util.Type.isObject(options.elementName)) {
					options.elementName = Jsonix.XML.QName
							.fromObject(options.elementName);
				} else if (Jsonix.Util.Type.isString(options.elementName)) {
					options.elementName = new Jsonix.XML.QName(
							this.defaultElementNamespaceURI,
							options.elementName);
				} else {
					throw new Error('Element info [' + options + '] must provide an element name.');
				}
				if (Jsonix.Util.Type.exists(options.substitutionHead)) {
					if (Jsonix.Util.Type.isObject(options.substitutionHead)) {
						options.substitutionHead = Jsonix.XML.QName
								.fromObject(options.substitutionHead);
					} else {
						Jsonix.Util.Ensure
								.ensureString(options.substitutionHead);
						options.substitutionHead = new Jsonix.XML.QName(
								this.defaultElementNamespaceURI,
								options.substitutionHead);
					}
				}
				var elementInfo = new Jsonix.Model.ElementInfo(options);
				return elementInfo;
			},
			registerTypeInfos : function(context) {
				for ( var index = 0; index < this.typeInfos.length; index++) {
					var typeInfo = this.typeInfos[index];
					context.registerTypeInfo(typeInfo);
				}
			},
			buildTypeInfos : function(context) {
				for ( var index = 0; index < this.typeInfos.length; index++) {
					var typeInfo = this.typeInfos[index];
					typeInfo.build(context, this);
				}
			},
			registerElementInfos : function(context) {
				for ( var index = 0; index < this.elementInfos.length; index++) {
					var elementInfo = this.elementInfos[index];
					context.registerElementInfo(elementInfo);
				}
			},
			buildElementInfos : function(context) {
				for ( var index = 0; index < this.elementInfos.length; index++) {
					var elementInfo = this.elementInfos[index];
					elementInfo.build(context, this);
				}
			},
			// Obsolete, retained for backwards compatibility
			cs : function() {
				return this;
			},
			// Obsolete, retained for backwards compatibility
			es : function() {
				return this;
			},
			CLASS_NAME : 'Jsonix.Model.Module'
		});
Jsonix.Model.Module.prototype.typeInfoCreators = {
	"classInfo" : Jsonix.Model.Module.prototype.createClassInfo,
	"list" : Jsonix.Model.Module.prototype.createList
};
Jsonix.Context = Jsonix
		.Class({
			modules : [],
			typeInfos : null,
			elementInfos : null,
			properties : null,
			substitutionMembersMap : null,
			scopedElementInfosMap : null,
			initialize : function(mappings, properties) {
				this.modules = [];
				this.elementInfos = [];
				this.typeInfos = {};
				this.registerBuiltinTypeInfos();
				this.properties = {
					namespacePrefixes : {}
				};
				this.substitutionMembersMap = {};
				this.scopedElementInfosMap = {};

				// Initialize properties
				if (Jsonix.Util.Type.exists(properties)) {
					if (Jsonix.Util.Ensure.ensureObject(properties)) {
						if (Jsonix.Util.Type
								.isObject(properties.namespacePrefixes)) {
							this.properties.namespacePrefixes = properties.namespacePrefixes;
						}
					}
				}
				// Initialize modules
				if (Jsonix.Util.Type.exists(mappings)) {
					Jsonix.Util.Ensure.ensureArray(mappings);
					// Initialize modules
					var index, mapping, module;
					for (index = 0; index < mappings.length; index++) {
						mapping = mappings[index];
						module = this.createModule(mapping);
						this.modules[index] = module;
					}
				}
				this.processModules();
			},
			createModule : function(mapping) {
				var module;
				if (mapping instanceof Jsonix.Model.Module) {
					module = mapping;
				} else {
					module = new Jsonix.Model.Module(mapping);
				}
				return module;
			},
			registerBuiltinTypeInfos : function() {
				for ( var index = 0; index < this.builtinTypeInfos.length; index++) {
					this.registerTypeInfo(this.builtinTypeInfos[index]);
				}
			},
			processModules : function() {
				var index, module;
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildTypeInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.registerElementInfos(this);
				}
				for (index = 0; index < this.modules.length; index++) {
					module = this.modules[index];
					module.buildElementInfos(this);
				}
			},
			registerTypeInfo : function(typeInfo) {
				Jsonix.Util.Ensure.ensureObject(typeInfo);
				Jsonix.Util.Ensure.ensureString(typeInfo.name);
				this.typeInfos[typeInfo.name] = typeInfo;
			},
			resolveTypeInfo : function(mapping, module) {
				if (!Jsonix.Util.Type.exists(mapping)) {
					return null;
				} else if (mapping instanceof Jsonix.Model.TypeInfo) {
					return mapping;
				} else if (Jsonix.Util.Type.isString(mapping)) {
					if (!this.typeInfos[mapping]) {
						throw new Error('Type info [' + mapping + '] is not known in this context.');
					} else {
						return this.typeInfos[mapping];
					}
				} else {
					Jsonix.Util.Ensure
							.ensureObject(module,
									'Type info mapping can only be resolved if module is provided.');
					var typeInfo = module.createTypeInfo(mapping);
					typeInfo.build(this, module);
					return typeInfo;
				}
			},
			registerElementInfo : function(elementInfo) {
				Jsonix.Util.Ensure.ensureObject(elementInfo);
				this.elementInfos.push(elementInfo);

				if (Jsonix.Util.Type.exists(elementInfo.substitutionHead)) {
					var substitutionHead = elementInfo.substitutionHead;
					var substitutionHeadKey = substitutionHead.key;
					var substitutionMembers = this.substitutionMembersMap[substitutionHeadKey];

					if (!Jsonix.Util.Type.isArray(substitutionMembers)) {
						substitutionMembers = [];
						this.substitutionMembersMap[substitutionHeadKey] = substitutionMembers;
					}
					substitutionMembers.push(elementInfo);
				}

				var scopeKey;
				if (Jsonix.Util.Type.exists(elementInfo.scope)) {
					scopeKey = this.resolveTypeInfo(elementInfo.scope).name;
				} else {
					scopeKey = '##global';
				}

				var scopedElementInfos = this.scopedElementInfosMap[scopeKey];

				if (!Jsonix.Util.Type.isObject(scopedElementInfos)) {
					scopedElementInfos = {};
					this.scopedElementInfosMap[scopeKey] = scopedElementInfos;
				}
				scopedElementInfos[elementInfo.elementName.key] = elementInfo;

			},
			getElementInfo : function(name, scope) {
				if (Jsonix.Util.Type.exists(scope)) {
					var scopeKey = scope.name;
					var scopedElementInfos = this.scopedElementInfosMap[scopeKey];
					if (Jsonix.Util.Type.exists(scopedElementInfos)) {
						var scopedElementInfo = scopedElementInfos[name.key];
						if (Jsonix.Util.Type.exists(scopedElementInfo)) {
							return scopedElementInfo;
						}
					}
				}

				var globalScopeKey = '##global';
				var globalScopedElementInfos = this.scopedElementInfosMap[globalScopeKey];
				if (Jsonix.Util.Type.exists(globalScopedElementInfos)) {
					var globalScopedElementInfo = globalScopedElementInfos[name.key];
					if (Jsonix.Util.Type.exists(globalScopedElementInfo)) {
						return globalScopedElementInfo;
					}
				}
				return null;
				//
				// throw new Error("Element [" + name.key
				// + "] could not be found in the given context.");
			},
			getSubstitutionMembers : function(name) {
				return this.substitutionMembersMap[Jsonix.XML.QName
						.fromObject(name).key];
			},
			createMarshaller : function() {
				return new Jsonix.Context.Marshaller(this);
			},
			createUnmarshaller : function() {
				return new Jsonix.Context.Unmarshaller(this);
			},
			/**
			 * Builtin type infos.
			 */
			builtinTypeInfos : [ Jsonix.Schema.XSD.AnyType.INSTANCE,
					Jsonix.Schema.XSD.AnyURI.INSTANCE,
					Jsonix.Schema.XSD.Base64Binary.INSTANCE,
					Jsonix.Schema.XSD.Boolean.INSTANCE,
					Jsonix.Schema.XSD.Byte.INSTANCE,
					Jsonix.Schema.XSD.Calendar.INSTANCE,
					Jsonix.Schema.XSD.Date.INSTANCE,
					Jsonix.Schema.XSD.DateTime.INSTANCE,
					Jsonix.Schema.XSD.Decimal.INSTANCE,
					Jsonix.Schema.XSD.Double.INSTANCE,
					Jsonix.Schema.XSD.Duration.INSTANCE,
					Jsonix.Schema.XSD.Float.INSTANCE,
					Jsonix.Schema.XSD.GDay.INSTANCE,
					Jsonix.Schema.XSD.GMonth.INSTANCE,
					Jsonix.Schema.XSD.GMonthDay.INSTANCE,
					Jsonix.Schema.XSD.GYear.INSTANCE,
					Jsonix.Schema.XSD.GYearMonth.INSTANCE,
					Jsonix.Schema.XSD.HexBinary.INSTANCE,
					Jsonix.Schema.XSD.ID.INSTANCE,
					Jsonix.Schema.XSD.IDREF.INSTANCE,
					Jsonix.Schema.XSD.IDREFS.INSTANCE,
					Jsonix.Schema.XSD.Int.INSTANCE,
					Jsonix.Schema.XSD.Integer.INSTANCE,
					Jsonix.Schema.XSD.Language.INSTANCE,
					Jsonix.Schema.XSD.Long.INSTANCE,
					Jsonix.Schema.XSD.Name.INSTANCE,
					Jsonix.Schema.XSD.NCName.INSTANCE,
					Jsonix.Schema.XSD.NegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NMToken.INSTANCE,
					Jsonix.Schema.XSD.NMTokens.INSTANCE,
					Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE,
					Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.NormalizedString.INSTANCE,
					Jsonix.Schema.XSD.Number.INSTANCE,
					Jsonix.Schema.XSD.PositiveInteger.INSTANCE,
					Jsonix.Schema.XSD.QName.INSTANCE,
					Jsonix.Schema.XSD.Short.INSTANCE,
					Jsonix.Schema.XSD.String.INSTANCE,
					Jsonix.Schema.XSD.Strings.INSTANCE,
					Jsonix.Schema.XSD.Time.INSTANCE,
					Jsonix.Schema.XSD.Token.INSTANCE,
					Jsonix.Schema.XSD.UnsignedByte.INSTANCE,
					Jsonix.Schema.XSD.UnsignedInt.INSTANCE,
					Jsonix.Schema.XSD.UnsignedLong.INSTANCE,
					Jsonix.Schema.XSD.UnsignedShort.INSTANCE ],
			CLASS_NAME : 'Jsonix.Context'
		});
Jsonix.Context.Marshaller = Jsonix.Class({
	context : null,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	marshalString : function(value) {
		var doc = this.marshalDocument(value);
		var text = Jsonix.DOM.serialize(doc);
		return text;
	},
	marshalDocument : function(value) {
		var output = new Jsonix.XML.Output({
			namespacePrefixes : this.context.properties.namespacePrefixes
		});

		var doc = output.writeStartDocument();

		this.marshalElementNode(value, output);

		output.writeEndDocument();

		return doc;

	},
	marshalElementNode : function(value, output) {

		Jsonix.Util.Ensure.ensureObject(value);
		Jsonix.Util.Ensure.ensureObject(value.name);
		Jsonix.Util.Ensure.ensureString(value.name.localPart);
		Jsonix.Util.Ensure.ensureExists(value.value);

		var name = Jsonix.XML.QName.fromObject(value.name);

		var elementDeclaration = this.context.getElementInfo(name);
		if (!Jsonix.Util.Type.exists(elementDeclaration)) {
			throw new Error("Could not find element declaration for the element [" + name.key + "].");
		}
		Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
		var typeInfo = elementDeclaration.typeInfo;
		var element = output.writeStartElement(value.name);
		var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
		adapter.marshal(this.context, value.value, output, typeInfo);
		output.writeEndElement();
		return element;

	},
	CLASS_NAME : 'Jsonix.Context.Marshaller'
});
Jsonix.Context.Unmarshaller = Jsonix.Class({
	context : null,
	initialize : function(context) {
		Jsonix.Util.Ensure.ensureObject(context);
		this.context = context;
	},
	unmarshalString : function(text) {
		Jsonix.Util.Ensure.ensureString(text);
		var doc = Jsonix.DOM.parse(text);
		return this.unmarshalDocument(doc);
	},
	unmarshalURL : function(url, callback, options) {
		Jsonix.Util.Ensure.ensureString(url);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;
		Jsonix.DOM.load(url, function(doc) {
			callback(that.unmarshalDocument(doc));
		}, options);
	},
	unmarshalFile : function(fileName, callback, options) {
		Jsonix.Util.Ensure.ensureString(fileName);
		Jsonix.Util.Ensure.ensureFunction(callback);
		if (Jsonix.Util.Type.exists(options)) {
			Jsonix.Util.Ensure.ensureObject(options);
		}
		that = this;

		var fs = require('fs');
		fs.readFile(fileName, options, function(err, data) {
			if (err)
			{
				throw err;
			}
			else
			{
				var text = data.toString();
				var doc = Jsonix.DOM.parse(text);
				callback(that.unmarshalDocument(doc));
			}
		});
	},
	unmarshalDocument : function(doc) {
		var input = new Jsonix.XML.Input(doc);

		var result = null;
		input.nextTag();
		return this.unmarshalElementNode(input);

	},
	unmarshalElementNode : function(input) {
		if (input.eventType != 1) {
			throw new Error("Parser must be on START_ELEMENT to read next text.");
		}

		var result = null;
		var name = Jsonix.XML.QName.fromObject(input.getName());

		var elementDeclaration = this.context.getElementInfo(name);
		if (!Jsonix.Util.Type.exists(elementDeclaration)) {
			throw new Error("Could not find element declaration for the element [" + name.key + "].");
		}
		Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
		var typeInfo = elementDeclaration.typeInfo;
		var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
		var value = adapter.unmarshal(this.context, input, typeInfo);
		result = {
			name : name,
			value : value
		};

		return result;

	},
	CLASS_NAME : 'Jsonix.Context.Unmarshaller'
});

},{"xmldom":"JFUvMs"}],92:[function(require,module,exports){
/*
 * Copyright 2013 Valentyn Kolesnikov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var currencyList =
{
    "CurrencyList": {
        "language": { "-value": "UKR" },
        "UKR": {
            "item": [
                {
                    "-value": "0",
                    "-text": "нуль"
                },
                {
                    "-value": "1000_10",
                    "-text": "тисяч,мільйонів,мільярдів,трильйонів"
                },
                {
                    "-value": "1000_1",
                    "-text": "тисяча,мільйон,мільярд,трильйон"
                },
                {
                    "-value": "1000_234",
                    "-text": "тисячі,мільйона,мільярда,трильйона"
                },
                {
                    "-value": "1000_5",
                    "-text": "тисяч,мільйонів,мільярдів,трильйонів"
                },
                {
                    "-value": "10_19",
                    "-text": "десять,одинадцять,дванадцять,тринадцять,чотирнадцять,п’ятнадцять,шiстнадцять,сiмнадцять,вiсiмнадцять,дев'ятнадцять"
                },
                {
                    "-value": "1",
                    "-text": "одна,один,один,одна"
                },
                {
                    "-value": "2",
                    "-text": "дві,два,два,дві"
                },
                {
                    "-value": "3_9",
                    "-text": "три,чотири,п’ять,шість,сім,вісім,дев’ять"
                },
                {
                    "-value": "100_900",
                    "-text": "сто ,двісті ,триста ,чотириста ,п’ятсот ,шістсот ,сімсот ,вісімсот ,дев’ятсот "
                },
                {
                    "-value": "20_90",
                    "-text": "двадцять ,тридцять ,сорок ,п’ятдесят ,шістдесят ,сімдесят ,вісімдесят ,дев’яносто "
                },
                {
                    "-value": "pdv",
                    "-text": "в т.ч. ПДВ "
                },
                {
                    "-value": "pdv_value",
                    "-text": "20"
                }
            ]
        },
        "RUS": {
            "item": [
                {
                    "-value": "0",
                    "-text": "ноль"
                },
                {
                    "-value": "1000_10",
                    "-text": "тысяч,миллионов,миллиардов,триллионов"
                },
                {
                    "-value": "1000_1",
                    "-text": "тысяча,миллион,миллиард,триллион"
                },
                {
                    "-value": "1000_234",
                    "-text": "тысячи,миллиона,миллиарда,триллиона"
                },
                {
                    "-value": "1000_5",
                    "-text": "тысяч,миллионов,миллиардов,триллионов"
                },
                {
                    "-value": "10_19",
                    "-text": "десять,одиннадцать,двенадцать,тринадцать,четырнадцать,пятнадцать,шестнадцать,семнадцать,восемнадцать,девятнадцать"
                },
                {
                    "-value": "1",
                    "-text": "одна,один,один,одна"
                },
                {
                    "-value": "2",
                    "-text": "две,два,два,две"
                },
                {
                    "-value": "3_9",
                    "-text": "три,четыре,пять,шесть,семь,восемь,девять"
                },
                {
                    "-value": "100_900",
                    "-text": "сто ,двести ,триста ,четыреста ,пятьсот ,шестьсот ,семьсот ,восемьсот ,девятьсот "
                },
                {
                    "-value": "20_90",
                    "-text": "двадцать ,тридцать ,сорок ,пятьдесят ,шестьдесят ,семьдесят ,восемьдесят ,девяносто "
                },
                {
                    "-value": "pdv",
                    "-text": "в т.ч. НДС "
                },
                {
                    "-value": "pdv_value",
                    "-text": "18"
                }
            ]
        },
        "ENG": {
            "item": [
                {
                    "-value": "0",
                    "-text": "zero"
                },
                {
                    "-value": "1000_10",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_1",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_234",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "1000_5",
                    "-text": "thousand,million,billion,trillion"
                },
                {
                    "-value": "10_19",
                    "-text": "ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen"
                },
                {
                    "-value": "1",
                    "-text": "one,one,one,one"
                },
                {
                    "-value": "2",
                    "-text": "two,two,two,two"
                },
                {
                    "-value": "3_9",
                    "-text": "three,four,five,six,seven,eight,nine"
                },
                {
                    "-value": "100_900",
                    "-text": "one hundred ,two hundred ,three hundred ,four hundred ,five hundred ,six hundred ,seven hundred ,eight hundred ,nine hundred "
                },
                {
                    "-value": "20_90",
                    "-text": "twenty-,thirty-,forty-,fifty-,sixty-,seventy-,eighty-,ninety-"
                },
                {
                    "-value": "pdv",
                    "-text": "including VAT "
                },
                {
                    "-value": "pdv_value",
                    "-text": "10"
                }
            ]
        },
        "RUR": [
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "RUS",
                "-RubOneUnit": "рубль",
                "-RubTwoUnit": "рубля",
                "-RubFiveUnit": "рублей",
                "-RubSex": "M",
                "-RubShortUnit": "руб.",
                "-KopOneUnit": "копейка",
                "-KopTwoUnit": "копейки",
                "-KopFiveUnit": "копеек",
                "-KopSex": "F"
            },
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "UKR",
                "-RubOneUnit": "рубль",
                "-RubTwoUnit": "рублі",
                "-RubFiveUnit": "рублів",
                "-RubSex": "M",
                "-RubShortUnit": "руб.",
                "-KopOneUnit": "копійка",
                "-KopTwoUnit": "копійки",
                "-KopFiveUnit": "копійок",
                "-KopSex": "F"
            },
            {
                "-CurrID": "810",
                "-CurrName": "Российские рубли",
                "-language": "ENG",
                "-RubOneUnit": "ruble",
                "-RubTwoUnit": "rubles",
                "-RubFiveUnit": "rubles",
                "-RubSex": "M",
                "-RubShortUnit": "RUR.",
                "-KopOneUnit": "kopeck",
                "-KopTwoUnit": "kopecks",
                "-KopFiveUnit": "kopecks",
                "-KopSex": "M"
            }
        ],
        "UAH": [
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "RUS",
                "-RubOneUnit": "гривня",
                "-RubTwoUnit": "гривни",
                "-RubFiveUnit": "гривень",
                "-RubSex": "F",
                "-RubShortUnit": "грн.",
                "-KopOneUnit": "копейка",
                "-KopTwoUnit": "копейки",
                "-KopFiveUnit": "копеек",
                "-KopSex": "F"
            },
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "UKR",
                "-RubOneUnit": "гривня",
                "-RubTwoUnit": "гривні",
                "-RubFiveUnit": "гривень",
                "-RubSex": "F",
                "-RubShortUnit": "грн.",
                "-KopOneUnit": "копійка",
                "-KopTwoUnit": "копійки",
                "-KopFiveUnit": "копійок",
                "-KopSex": "F"
            },
            {
                "-CurrID": "980",
                "-CurrName": "Украинскі гривні",
                "-language": "ENG",
                "-RubOneUnit": "hryvnia",
                "-RubTwoUnit": "hryvnias",
                "-RubFiveUnit": "hryvnias",
                "-RubSex": "M",
                "-RubShortUnit": "UAH.",
                "-KopOneUnit": "kopeck",
                "-KopTwoUnit": "kopecks",
                "-KopFiveUnit": "kopecks",
                "-KopSex": "M"
            }
        ],
        "USD": [
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "RUS",
                "-RubOneUnit": "доллар",
                "-RubTwoUnit": "доллара",
                "-RubFiveUnit": "долларов",
                "-RubSex": "M",
                "-RubShortUnit": "дол.",
                "-KopOneUnit": "цент",
                "-KopTwoUnit": "цена",
                "-KopFiveUnit": "центов",
                "-KopSex": "M"
            },
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "UKR",
                "-RubOneUnit": "долар",
                "-RubTwoUnit": "долара",
                "-RubFiveUnit": "доларів",
                "-RubSex": "M",
                "-RubShortUnit": "дол.",
                "-KopOneUnit": "цент",
                "-KopTwoUnit": "цена",
                "-KopFiveUnit": "центів",
                "-KopSex": "M"
            },
            {
                "-CurrID": "840",
                "-CurrName": "Долари США",
                "-language": "ENG",
                "-RubOneUnit": "dollar",
                "-RubTwoUnit": "dollars",
                "-RubFiveUnit": "dollars",
                "-RubSex": "M",
                "-RubShortUnit": "USD.",
                "-KopOneUnit": "cent",
                "-KopTwoUnit": "cents",
                "-KopFiveUnit": "cents",
                "-KopSex": "M"
            }
        ],
        "PER10": [
            {
                "-CurrID": "556",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "десятая процента",
                "-KopTwoUnit": "десятых процента",
                "-KopFiveUnit": "десятых процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "556",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "десята відсотка",
                "-KopTwoUnit": "десятих відсотка",
                "-KopFiveUnit": "десятих відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "560",
                "-CurrName": "Вiдсотки з десятими частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "tenth of one percent",
                "-KopTwoUnit": "tenth of one percent",
                "-KopFiveUnit": "tenth of one percent",
                "-KopSex": "F"
            }
        ],
        "PER100": [
            {
                "-CurrID": "557",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "сотая процента",
                "-KopTwoUnit": "сотых процента",
                "-KopFiveUnit": "сотых процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "557",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "сота відсотка",
                "-KopTwoUnit": "сотих відсотка",
                "-KopFiveUnit": "сотих відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "561",
                "-CurrName": "Вiдсотки з сотими частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "hundred percent",
                "-KopTwoUnit": "hundredth of percent",
                "-KopFiveUnit": "hundredth of percent",
                "-KopSex": "F"
            }
        ],
        "PER1000": [
            {
                "-CurrID": "558",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "тысячная процента",
                "-KopTwoUnit": "тысячных процента",
                "-KopFiveUnit": "тысячных процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "558",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "тисячна відсотка",
                "-KopTwoUnit": "тисячних відсотка",
                "-KopFiveUnit": "тисячних відсотка",
                "-KopSex": "F"
            },
            {
                "-CurrID": "562",
                "-CurrName": "Вiдсотки з тисячними частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "thousandth of percent",
                "-KopTwoUnit": "thousandths of percent",
                "-KopFiveUnit": "thousandths of percent",
                "-KopSex": "F"
            }
        ],
        "PER10000": [
            {
                "-CurrID": "559",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "RUS",
                "-RubOneUnit": "целая,",
                "-RubTwoUnit": "целых,",
                "-RubFiveUnit": "целых,",
                "-RubSex": "F",
                "-KopOneUnit": "десятитысячная процента",
                "-KopTwoUnit": "десятитысячные процента",
                "-KopFiveUnit": "десятитысячных процента",
                "-KopSex": "F"
            },
            {
                "-CurrID": "559",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "UKR",
                "-RubOneUnit": "ціла,",
                "-RubTwoUnit": "цілих,",
                "-RubFiveUnit": "цілих,",
                "-RubSex": "F",
                "-KopOneUnit": "десятитисячна відсотка",
                "-KopTwoUnit": "десятитисячних відсотка",
                "-KopFiveUnit": "десятитисячних відсотка",
                "-KopSex": "M"
            },
            {
                "-CurrID": "563",
                "-CurrName": "Вiдсотки з десяти тисячними частинами",
                "-language": "ENG",
                "-RubOneUnit": ",",
                "-RubTwoUnit": "integers,",
                "-RubFiveUnit": "integers,",
                "-RubSex": "F",
                "-KopOneUnit": "ten percent",
                "-KopTwoUnit": "ten-percent",
                "-KopFiveUnit": "ten-percent",
                "-KopSex": "F"
            }
        ]
    }
};
/**
 * Converts numbers to symbols.
 *
 * @author Valentyn V Kolesnikov
 * @version $Revision$ $Date$
 */

/** Currency. */
var Currency = (function () {
    function Currency() {
    }
    Currency.UAH = 'UAH';

    Currency.RUR = 'RUR';

    Currency.USD = 'USD';

    Currency.PER10 = 'PER10';

    Currency.PER100 = 'PER100';

    Currency.PER1000 = 'PER1000';

    Currency.PER10000 = 'PER10000';
    return Currency;
})();

/** Language. */
var Language = (function () {
    function Language() {
    }
    Language.RUS = 'RUS';

    Language.UKR = 'UKR';

    Language.ENG = 'ENG';
    return Language;
})();

/** Pennies. */
var Pennies = (function () {
    function Pennies() {
    }
    Pennies.NUMBER = 'NUMBER';

    Pennies.TEXT = 'TEXT';
    return Pennies;
})();

var StringBuilder = (function () {
    function StringBuilder() {
        this._buffer = [];
    }
    StringBuilder.prototype.append = function (text) {
        this._buffer[this._buffer.length] = text;
        return this;
    };

    StringBuilder.prototype.insert = function (index, text) {
        this._buffer.splice(index, 0, text);
        return this;
    };

    StringBuilder.prototype.length = function () {
        return this.toString().length;
    };

    StringBuilder.prototype.deleteCharAt = function (index) {
        var str = this.toString();
        this._buffer = [];
        this.append(str.substring(0, index));
        return this;
    };

    StringBuilder.prototype.toString = function () {
        return this._buffer.join("");
    };
    return StringBuilder;
})();

var MoneyToStr = (function () {
    MoneyToStr.NUM0 = 0;
    MoneyToStr.NUM1 = 1;
    MoneyToStr.NUM2 = 2;
    MoneyToStr.NUM3 = 3;
    MoneyToStr.NUM4 = 4;
    MoneyToStr.NUM5 = 5;
    MoneyToStr.NUM6 = 6;
    MoneyToStr.NUM7 = 7;
    MoneyToStr.NUM8 = 8;
    MoneyToStr.NUM9 = 9;
    MoneyToStr.NUM10 = 10;
    MoneyToStr.NUM11 = 11;
    MoneyToStr.NUM14 = 14;
    MoneyToStr.NUM100 = 100;
    MoneyToStr.NUM1000 = 1000;
    MoneyToStr.NUM10000 = 10000;
    MoneyToStr.INDEX_0 = 0;
    MoneyToStr.INDEX_1 = 1;
    MoneyToStr.INDEX_2 = 2;
    MoneyToStr.INDEX_3 = 3;

    MoneyToStr.percentToStr = function (amount, lang) {
        if (amount == null) {
            throw new Error("amount is null");
        }
        if (lang == null) {
            throw new Error("lang is null");
        }
        var intPart = parseInt(amount);
        var fractPart = 0;
        var result;
        if (amount == parseInt(amount)) {
            result = new MoneyToStr(Currency.PER10, lang, Pennies.TEXT).convert(amount, 0);
        } else if ((amount * MoneyToStr.NUM10).toFixed(4) == parseInt(amount * MoneyToStr.NUM10)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM10);
            result = new MoneyToStr(Currency.PER10, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else if ((amount * MoneyToStr.NUM100).toFixed(4) == parseInt(amount * MoneyToStr.NUM100)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM100);
            result = new MoneyToStr(Currency.PER100, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else if ((amount * MoneyToStr.NUM1000).toFixed(4) == parseInt(amount * MoneyToStr.NUM1000)) {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM1000);
            result = new MoneyToStr(Currency.PER1000, lang, Pennies.TEXT).convert(intPart, fractPart);
        } else {
            fractPart = Math.round((amount - intPart) * MoneyToStr.NUM10000);
            result = new MoneyToStr(Currency.PER10000, lang, Pennies.TEXT).convert(intPart, fractPart);
        }
        return result;
    }

    function MoneyToStr(currency, language, pennies) {
        this.currency = currency;
        this.language = language;
        this.pennies = pennies;
        var languageElement = language;
        var items = currencyList['CurrencyList'][languageElement]['item'];
        this.messages = {};
        for (var index in items) {
            var languageItem = items[index];
            if (languageItem["-text"]) {
                this.messages[languageItem["-value"]] = languageItem["-text"].split(",");
            }
        }
        var currencyItem = currencyList['CurrencyList'][currency]
        var theISOElement = null;
        for (var index in currencyItem) {
            if (currencyItem[index]["-language"] == language) {
                theISOElement = currencyItem[index];
                break;
            }
        }
        if (theISOElement == null) {
            throw new Error("Currency not found " + currency);
        }
        this.rubOneUnit = theISOElement["-RubOneUnit"];
        this.rubTwoUnit = theISOElement["-RubTwoUnit"];
        this.rubFiveUnit = theISOElement["-RubFiveUnit"];
        this.kopOneUnit = theISOElement["-KopOneUnit"];
        this.kopTwoUnit = theISOElement["-KopTwoUnit"];
        this.kopFiveUnit = theISOElement["-KopFiveUnit"];
        this.rubSex = theISOElement["-RubSex"];
        this.kopSex = theISOElement["-KopSex"];
        this.rubShortUnit = theISOElement["-RubShortUnit"];
    }

    /**
     * Converts double value to the text description.
     *
     * @param theMoney
     *            the amount of money in format major.minor
     * @return the string description of money value
     */
    MoneyToStr.prototype.convertValue = function (theMoney) {
        if (typeof theMoney === undefined || theMoney == null) {
            throw new Error("theMoney is null");
        }
        var intPart = parseInt(theMoney);
        var fractPart = Math.round((theMoney - intPart) * MoneyToStr.NUM100);
        if (this.currency == Currency.PER1000) {
            fractPart = Math.round((theMoney - intPart) * MoneyToStr.NUM1000);
        }
        return this.convert(intPart, fractPart);
    }

    /**
     * Converts number to currency. Usage: MoneyToStr moneyToStr = new MoneyToStr("UAH"); String result =
     * moneyToStr.convert(123D); Expected: result = сто двадцять три гривні 00 копійок
     *
     * @param theMoney
     *            the amount of money major currency
     * @param theKopeiki
     *            the amount of money minor currency
     * @return the string description of money value
     */
    MoneyToStr.prototype.convert = function (theMoney, theKopeiki) {
        if (typeof theMoney === undefined || theMoney == null) {
            throw new Error("theMoney is null");
        }
        if (typeof theKopeiki === undefined || theKopeiki == null) {
            throw new Error("theKopeiki is null");
        }
        var money2str = new StringBuilder();
        var triadNum = 0;
        var theTriad = 0;
        var intPart = theMoney;
        if (intPart == 0) {
            money2str.append(this.messages["0"][0] + " ");
        }
        do {
            theTriad = parseInt(intPart % MoneyToStr.NUM1000);
            money2str.insert(0, this.triad2Word(theTriad, triadNum, this.rubSex));
            if (triadNum == 0) {
                var range10 = parseInt((theTriad % MoneyToStr.NUM100) / MoneyToStr.NUM10);
                var range = parseInt(theTriad % MoneyToStr.NUM10);
                if (range10 == MoneyToStr.NUM1) {
                    money2str.append(this.rubFiveUnit);
                } else {
                    switch (range) {
                        case MoneyToStr.NUM1:
                            money2str.append(this.rubOneUnit);
                            break;
                        case MoneyToStr.NUM2:
                        case MoneyToStr.NUM3:
                        case MoneyToStr.NUM4:
                            money2str.append(this.rubTwoUnit);
                            break;
                        default:
                            money2str.append(this.rubFiveUnit);
                            break;
                    }
                }
            }
            intPart = parseInt(intPart / MoneyToStr.NUM1000);
            triadNum++;
        } while (intPart > 0);

        if (this.pennies == Pennies.TEXT) {
            money2str.append(this.language == Language.ENG ? " and " : " ").append(theKopeiki == 0 ? this.messages["0"][0] + " " : this.triad2Word(theKopeiki, 0, this.kopSex));
        } else {
            money2str.append(" " + (theKopeiki < 10 ? "0" + theKopeiki : theKopeiki) + " ");
        }
        if (theKopeiki >= MoneyToStr.NUM11 && theKopeiki <= MoneyToStr.NUM14) {
            money2str.append(this.kopFiveUnit);
        } else {
            switch (parseInt(theKopeiki % MoneyToStr.NUM10)) {
                case MoneyToStr.NUM1:
                    money2str.append(this.kopOneUnit);
                    break;
                case MoneyToStr.NUM2:
                case MoneyToStr.NUM3:
                case MoneyToStr.NUM4:
                    money2str.append(this.kopTwoUnit);
                    break;
                default:
                    money2str.append(this.kopFiveUnit);
                    break;
            }
        }
        return money2str.toString().trim();
    }

    MoneyToStr.prototype.triad2Word = function (triad, triadNum, sex) {
        var triadWord = new StringBuilder();

        if (triad == 0) {
            return "";
        }

        var range = this.check1(triad, triadWord);
        if (this.language == Language.ENG && triadWord.length() > 0 && triad % MoneyToStr.NUM10 == 0) {
            triadWord.deleteCharAt(triadWord.length() - 1);
            triadWord.append(" ");
        }

        var range10 = range;
        range = parseInt(triad % MoneyToStr.NUM10);
        this.check2(triadNum, sex, triadWord, triad, range10);
        switch (triadNum) {
            case MoneyToStr.NUM0:
                break;
            case MoneyToStr.NUM1:
            case MoneyToStr.NUM2:
            case MoneyToStr.NUM3:
            case MoneyToStr.NUM4:
                if (range10 == MoneyToStr.NUM1) {
                    triadWord.append(this.messages["1000_10"][triadNum - 1] + " ");
                } else {
                    switch (range) {
                        case MoneyToStr.NUM1:
                            triadWord.append(this.messages["1000_1"][triadNum - 1] + " ");
                            break;
                        case MoneyToStr.NUM2:
                        case MoneyToStr.NUM3:
                        case MoneyToStr.NUM4:
                            triadWord.append(this.messages["1000_234"][triadNum - 1] + " ");
                            break;
                        default:
                            triadWord.append(this.messages["1000_5"][triadNum - 1] + " ");
                            break;
                    }
                }
                break;
            default:
                triadWord.append("??? ");
                break;
        }
        return triadWord.toString();
    }

    /**
     * @param triadNum the triad num
     * @param sex the sex
     * @param triadWord the triad word
     * @param triad the triad
     * @param range10 the range 10
     */
    MoneyToStr.prototype.check2 = function (triadNum, sex, triadWord, triad, range10) {
        var range = parseInt(triad % MoneyToStr.NUM10);
        if (range10 == 1) {
            triadWord.append(this.messages["10_19"][range] + " ");
        } else {
            switch (range) {
                case MoneyToStr.NUM1:
                    if (triadNum == MoneyToStr.NUM1) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_0] + " ");
                    } else if (triadNum == MoneyToStr.NUM2 || triadNum == MoneyToStr.NUM3 || triadNum == MoneyToStr.NUM4) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_1] + " ");
                    } else if ("M" == sex) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_2] + " ");
                    } else if ("F" == sex) {
                        triadWord.append(this.messages["1"][MoneyToStr.INDEX_3] + " ");
                    }
                    break;
                case MoneyToStr.NUM2:
                    if (triadNum == MoneyToStr.NUM1) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_0] + " ");
                    } else if (triadNum == MoneyToStr.NUM2 || triadNum == MoneyToStr.NUM3 || triadNum == MoneyToStr.NUM4) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_1] + " ");
                    } else if ("M" == sex) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_2] + " ");
                    } else if ("F" == sex) {
                        triadWord.append(this.messages["2"][MoneyToStr.INDEX_3] + " ");
                    }
                    break;
                case MoneyToStr.NUM3:
                case MoneyToStr.NUM4:
                case MoneyToStr.NUM5:
                case MoneyToStr.NUM6:
                case MoneyToStr.NUM7:
                case MoneyToStr.NUM8:
                case MoneyToStr.NUM9:
                    triadWord.append(["", "", ""].concat(this.messages["3_9"])[range] + " ");
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * @param triad the triad
     * @param triadWord the triad word
     * @return the range
     */
    MoneyToStr.prototype.check1 = function (triad, triadWord) {
        var range = parseInt(triad / MoneyToStr.NUM100);
        triadWord.append([""].concat(this.messages["100_900"])[range]);

        range = parseInt((triad % MoneyToStr.NUM100) / MoneyToStr.NUM10);
        triadWord.append(["", ""].concat(this.messages["20_90"])[range]);
        return range;
    }

    MoneyToStr.prototype.getMessages = function() {
        return this.messages;
    }

    MoneyToStr.prototype.getRubShortUnit = function() {
        return this.rubShortUnit;
    }

    return MoneyToStr;
})();

//TODO Удалить лишние языки (генерация из данных валюты МойСклад)
module.exports = {
    MoneyToStr: MoneyToStr,
    Pennies: Pennies,
    Language: Language,
    Currency: Currency
};
},{}]},{},["1wiUUs"]);

    return {
        start: function(taist, entryPoint) {}
    };
}