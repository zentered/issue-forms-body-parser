!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("unified"),require("remark-parse"),require("remark-gfm"),require("@sindresorhus/slugify"),require("remark-stringify"),require("strip-final-newline"),require("date-fns"),require("date-fns-tz")):"function"==typeof define&&define.amd?define(["unified","remark-parse","remark-gfm","@sindresorhus/slugify","remark-stringify","strip-final-newline","date-fns","date-fns-tz"],n):(e||self).issueFormsBodyParser=n(e.unified,e.remarkParse,e.remarkGfm,e.slugify,e.remarkStringify,e.stripFinalNewline,e.dateFns,e.dateFnsTz)}(this,function(e,n,t,r,i,o,u,a){function f(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=/*#__PURE__*/f(n),d=/*#__PURE__*/f(t),s=/*#__PURE__*/f(r),c=/*#__PURE__*/f(i),h=/*#__PURE__*/f(o);function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var y=["yyyy-MM-dd","dd/MM/yyyy","dd/MM/yy","dd-MM-yyyy","dd-MM-yy","dd.MM.yyyy","dd.MM.yy"],p=["HH:mm","HH.mm","hh:mm aaa","hh:mm a..aa","hh:mm aaaa"],v=function e(n){return n.children.map(function(t){var r={};return"list"===t.type?e(n):"listItem"===t.type?(r.checked=t.checked,t.children.map(function(e){if("paragraph"===e.type)return r.text=e.children.map(function(e){return"link"===e.type?(r.link=e.url,"["+e.children[0].value+"]("+e.url+")"):e.value}).filter(function(e){return!!e}).join(""),r}).filter(function(e){return!!e})):void 0}).filter(function(e){return!!e})};function g(e,n,t){if(!e.s){if(t instanceof b){if(!t.s)return void(t.o=g.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(g.bind(null,e,n),g.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}const b=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){const r=new e,i=this.s;if(i){const e=1&i?n:t;if(e){try{g(r,1,e(this.v))}catch(e){g(r,2,e)}return r}return this}return this.o=function(e){try{const i=e.v;1&e.s?g(r,1,n?n(i):i):t?g(r,1,t(i)):g(r,2,i)}catch(e){g(r,2,e)}},r},e}();function k(e){return e instanceof b&&1&e.s}return function(n){try{var t,r,i,o,f,M,x,w,T,j,q,I,O;return Promise.resolve(e.unified().use(l.default).use(d.default).parse(n)).then(function(n){function l(){for(q in S)(O=(I=S[q]).content.filter(Boolean))&&O.length>0&&(1===O.length&&(I.text=O[0]),I.text=O.join("\n\n")),I.content=O;return S}if(!n)return[];var S={},U=null;t=function(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(t)return(t=t.call(e)).next.bind(t);if(Array.isArray(e)||(t=function(e,n){if(e){if("string"==typeof e)return m(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?m(e,n):void 0}}(e))){t&&(e=t);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(n.children);var A=function(e,n,t){for(var r;;){var i=e();if(k(i)&&(i=i.v),!i)return o;if(i.then){r=0;break}var o=t();if(o&&o.then){if(!k(o)){r=1;break}o=o.s}if(n){var u=n();if(u&&u.then&&!k(u)){r=2;break}}}var a=new b,f=g.bind(null,a,2);return(0===r?i.then(d):1===r?o.then(l):u.then(s)).then(void 0,f),a;function l(r){o=r;do{if(n&&(u=n())&&u.then&&!k(u))return void u.then(s).then(void 0,f);if(!(i=e())||k(i)&&!i.v)return void g(a,1,o);if(i.then)return void i.then(d).then(void 0,f);k(o=t())&&(o=o.v)}while(!o||!o.then);o.then(l).then(void 0,f)}function d(e){e?(o=t())&&o.then?o.then(l).then(void 0,f):l(o):g(a,1,o)}function s(){(i=e())?i.then?i.then(d).then(void 0,f):d(i):g(a,1,o)}}(function(){return!(r=t()).done},void 0,function(){return i=r.value,Promise.resolve(e.unified().use(d.default).use(c.default).stringify(i)).then(function(e){var n,t;(o=h.default(e)).indexOf("\\_")>-1&&(o=o.replace(/\\_/g,"_")),"heading"===i.type?(U=s.default(i.children[0].value),S[U]={title:i.children[0].value,heading:i.depth,content:[]}):"paragraph"===i.type&&U?(f=S[U],n=o,t=y.map(function(e){return u.isMatch(n,e)}),M=t.indexOf(!0)>-1?a.zonedTimeToUtc(u.parse(n,y[t.indexOf(!0)],new Date),"UTC").toJSON().split("T")[0]:null,x=function(e){var n=p.map(function(n){return u.isMatch(e,n)});if(n.indexOf(!0)>-1){var t=a.zonedTimeToUtc(u.parse(e,p[n.indexOf(!0)],new Date),"UTC");return a.formatInTimeZone(t,"UTC","HH:mm")}return null}(o),w=function(e){var n=!1,t={hours:0,minutes:0},r=new RegExp(/([0-9]+)h([0-9]+)m/),i=new RegExp(/([0-9]+)h/);if(e.match(r)){n=!0;var o=e.match(r),u=o[2];t.hours=parseInt(o[1]),t.minutes=parseInt(u)}else if(e.match(i)){n=!0;var a=e.match(i);t.hours=parseInt(a[1]),t.minutes=0}return n?t:null}(o),M&&(f.date=M),x&&(f.time=x),w&&(f.duration=w),f.content.push(o)):"list"===i.type?((T=S[U]).text=o,T.list=v(i).flat()):"html"===i.type?S[U].content.push(i.html):"code"===i.type?((j=S[U]).lang=i.lang,j.text=o):process.env.DEBUG&&(console.log("unhandled token type"),console.log(i))})});return A&&A.then?A.then(l):l()})}catch(e){return Promise.reject(e)}}});
//# sourceMappingURL=parse.umd.js.map
