function r(){return r=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var e in t)({}).hasOwnProperty.call(t,e)&&(r[e]=t[e])}return r},r.apply(null,arguments)}var n={maxAttempts:10,retryDelay:0,onError:function(r,n){}},t=function(e,o,i){void 0===o&&(o=n),void 0===i&&(i=1);var u=r({},n,o);return e(i).catch(function(r){if(u.onError(r,i),i<u.maxAttempts)return new Promise(function(r){setTimeout(function(){return r(t(e,o,i+1))},u.retryDelay)});throw r})};exports.Retryify=function(r,n){return void 0===n&&(n={}),function(){var e=arguments;return t(function(){return r.apply(void 0,[].slice.call(e))},n)}},exports.promiseRetry=t;
//# sourceMappingURL=promise-retry.cjs.map
