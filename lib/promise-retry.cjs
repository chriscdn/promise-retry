function r(){return r=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(r[e]=n[e])}return r},r.apply(this,arguments)}var t={maxAttempts:10,retryDelay:0,onError:function(r,t){}};module.exports=function n(e,o,i){void 0===o&&(o=t),void 0===i&&(i=1);var a=r({},t,o);return e(i).catch(function(r){if(a.onError(r,i),i<a.maxAttempts)return new Promise(function(r){setTimeout(function(){return r(n(e,o,i+1))},a.retryDelay)});throw r})};
//# sourceMappingURL=promise-retry.cjs.map