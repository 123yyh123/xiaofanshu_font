(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__BA62897",
    appName: "xiaofanshu",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.99",
    uniRuntimeVersion: "3.99",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__BA62897",
      appName: "xiaofanshu",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"xiaofanshu","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"xiaofanshu","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"xiaofanshu","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"xiaofanshu","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"xiaofanshu","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/*!**************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/apis/auth_apis.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.otherLogin = exports.generalLogin = exports.checkToken = exports.bindNumberPhone = void 0;
var _request = __webpack_require__(/*! ../utils/request.js */ 31);
var checkToken = function checkToken() {
  return (0, _request.$request)({
    url: '/auth/checkToken',
    method: 'GET'
  });
};
exports.checkToken = checkToken;
var generalLogin = function generalLogin() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/auth/login?phoneNumber=' + params.phoneNumber + '&password=' + params.password,
    method: 'POST'
  });
};
exports.generalLogin = generalLogin;
var otherLogin = function otherLogin() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/auth/otherLogin?type=' + params.type + '&code=' + params.code,
    method: 'POST'
  });
};
exports.otherLogin = otherLogin;
var bindNumberPhone = function bindNumberPhone() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/auth/bindPhone',
    method: 'POST',
    data: params.registerVo
  });
};
exports.bindNumberPhone = bindNumberPhone;
var register = function register() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/auth/register',
    method: 'POST',
    data: params.registerVo
  });
};
exports.register = register;

/***/ }),
/* 31 */
/*!*************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/utils/request.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$request = void 0;
var _index = __webpack_require__(/*! ../config/index */ 32);
var _websocket = _interopRequireDefault(__webpack_require__(/*! ./websocket.js */ 33));
var $request = function $request() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    uni.showLoading({
      title: '加载中',
      mask: true
    });
    var header = {
      'token': uni.getStorageSync('token')
    };
    var timer = setTimeout(function () {
      uni.hideLoading();
      reject(new Error('请求超时'));
    }, 5000);
    uni.request({
      url: _index.baseUrl + params.url,
      method: params.method,
      header: header,
      data: params.data,
      success: function success(res) {
        if (res.data.code === 40310 || res.data.code === 40320 || res.data.code === 40330) {
          uni.hideLoading();
          _websocket.default.completeClose();
          uni.showToast({
            icon: "none",
            title: "用户未认证或登录过期,请重新登录",
            duration: 500
          });
          uni.removeStorageSync("userInfo");
          uni.removeStorageSync('token');
          setTimeout(function () {
            uni.reLaunch({
              url: "/pages/login/login"
            });
          }, 500);
        }
        resolve(res.data);
      },
      fail: function fail(err) {
        reject(err);
        _websocket.default.completeClose();
      },
      complete: function complete() {
        uni.hideLoading();
      }
    });
  });
};
exports.$request = $request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 32 */
/*!************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/config/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseUrl = void 0;
var baseUrl = "http://192.168.116.102:9000";
exports.baseUrl = baseUrl;

/***/ }),
/* 33 */
/*!***************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/utils/websocket.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _index = __webpack_require__(/*! ../config/index.js */ 32);
//是否已经连接上ws
var isOpenSocket = false;
//心跳间隔，单位毫秒
var heartBeatDelay = 3000;
var heartBeatInterval = null;
//心跳时发送的消息文本
var heartBeatText = {
  from: uni.getStorageSync('userInfo').id,
  content: "ping",
  messageType: 1
};
//最大重连次数
var reconnectTimes = 10;
var reconnectInterval = null;
//重连间隔，单位毫秒
var reconnectDelay = 3000;
var wsUrl = _index.baseUrl + '/ws/xfs';
var socketTask = null;

//这个参数是防止重连失败之后onClose方法会重复执行reconnect方法，导致重连定时器出问题
//连接并打开之后可重连，且只执行重连方法一次
var canReconnect = false;

//封装的对象，最后以模块化向外暴露，
//init方法 初始化socketTask对象
//completeClose方法 完全将socketTask关闭（不重连）
//其他关于socketTask的方法与uniapp的socketTask api一致
var ws = {
  socketTask: null,
  init: init,
  completeClose: completeClose
};
function init() {
  socketTask = uni.connectSocket({
    url: wsUrl,
    fail: function fail(res) {
      console.log(res);
    }
  });
  socketTask.onOpen(function () {
    clearInterval(heartBeatInterval);
    clearInterval(reconnectInterval);
    isOpenSocket = true;
    canReconnect = true;
    send({
      from: uni.getStorageSync('userInfo').id,
      messageType: 0
    });
    heartBeat();
  });
  socketTask.onMessage(function (res) {
    console.log(res);
    var meaasge = JSON.parse(res);
    // 聊天信息
    if (meaasge.messageType === 3) {}
  });
  socketTask.onClose(function () {
    isOpenSocket = false;
    if (canReconnect) {
      reconnect();
      canReconnect = false;
    }
  });
  ws.socketTask = socketTask;
}
function heartBeat() {
  heartBeatInterval = setInterval(function () {
    send(heartBeatText);
  }, heartBeatDelay);
}
function send(value) {
  if (ws.socketTask.readyState === 1) {
    ws.socketTask.send({
      data: JSON.stringify(value),
      success: function success() {},
      fail: function fail() {
        console.log("消息发送失败");
        completeClose();
      }
    });
  } else {
    console.log("WebSocket 连接已关闭，无法发送消息");
    completeClose();
  }
}
function reconnect() {
  //停止发送心跳
  clearInterval(heartBeatInterval);
  //如果不是人为关闭的话，进行重连
  if (!isOpenSocket) {
    var count = 0;
    reconnectInterval = setInterval(function () {
      console.log("正在尝试重连");
      init();
      count++;
      //重连一定次数后就不再重连
      if (count >= reconnectTimes) {
        clearInterval(reconnectInterval);
        console.log("网络异常或服务器错误");
      }
    }, reconnectDelay);
  }
}
function completeClose() {
  console.log("关闭连接");
  clearInterval(heartBeatInterval);
  clearInterval(reconnectInterval);
  canReconnect = false;
  if (ws.socketTask) {
    ws.socketTask.close();
  }
}
module.exports = ws;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */
/*!*****************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/apis/user_service.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSex = exports.updateNickname = exports.updateIntroduction = exports.updateBirthday = exports.updateBackgroundImage = exports.updateAvatarUrl = exports.updateArea = exports.resetPassword = exports.getUserInfo = void 0;
var _request = __webpack_require__(/*! ../utils/request.js */ 31);
var resetPassword = function resetPassword() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/resetPassword?phoneNumber=' + params.phoneNumber + '&password=' + params.password + '&smsCode=' + params.smsCode,
    method: 'POST'
  });
};
exports.resetPassword = resetPassword;
var getUserInfo = function getUserInfo() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/getUserInfo?userId=' + params.userId,
    method: 'GET'
  });
};
exports.getUserInfo = getUserInfo;
var updateAvatarUrl = function updateAvatarUrl() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateAvatarUrl',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateAvatarUrl = updateAvatarUrl;
var updateBackgroundImage = function updateBackgroundImage() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateBackgroundImage',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateBackgroundImage = updateBackgroundImage;
var updateNickname = function updateNickname() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateNickname',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateNickname = updateNickname;
var updateIntroduction = function updateIntroduction() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateIntroduction',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateIntroduction = updateIntroduction;
var updateSex = function updateSex() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateSex',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateSex = updateSex;
var updateBirthday = function updateBirthday() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateBirthday',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateBirthday = updateBirthday;
var updateArea = function updateArea() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/user/updateArea',
    method: 'POST',
    data: params.userVO
  });
};
exports.updateArea = updateArea;

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 38 */
/*!*********************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni.promisify.adaptor.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (_typeof(res) === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 39 */
/*!**************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 40));
var _mpMixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpMixin.js */ 41));
var _luchRequest = _interopRequireDefault(__webpack_require__(/*! ./libs/luch-request */ 42));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/util/route.js */ 60));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 64));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 65));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 66));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 67));
var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index.js */ 68));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 71));
var _props = _interopRequireDefault(__webpack_require__(/*! ./libs/config/props.js */ 72));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 162));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/config/color.js */ 120));
var _platform = _interopRequireDefault(__webpack_require__(/*! ./libs/function/platform */ 163));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 看到此报错，是因为没有配置vue.config.js的【transpileDependencies】，详见：https://www.uviewui.com/components/npmSetting.html#_5-cli模式额外配置
var pleaseSetTranspileDependencies = {},
  babelTest = pleaseSetTranspileDependencies === null || pleaseSetTranspileDependencies === void 0 ? void 0 : pleaseSetTranspileDependencies.test;

// 引入全局mixin

var $u = _objectSpread(_objectSpread({
  route: _route.default,
  date: _index.default.timeFormat,
  // 另名date
  colorGradient: _colorGradient.default.colorGradient,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  colorToRgba: _colorGradient.default.colorToRgba,
  test: _test.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: new _luchRequest.default(),
  config: _config.default,
  // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default,
  mixin: _mixin.default,
  mpMixin: _mpMixin.default,
  props: _props.default
}, _index.default), {}, {
  color: _color.default,
  platform: _platform.default
});

// $u挂载到uni对象上
uni.$u = $u;
var install = function install(Vue) {
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return uni.$u.timeFrom(timestamp, format);
  });
  // 同时挂载到uni和Vue.prototype中

  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.prototype.$u = $u;
  Vue.mixin(_mixin.default);
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 40 */
/*!*************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/mixin/mixin.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ''
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u: function $u() {
      // 在非nvue端，移除props，http，mixin等对象，避免在小程序setData时数据过大影响性能
      return uni.$u.deepMerge(uni.$u, {
        props: undefined,
        http: undefined,
        mixin: undefined
      });
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem: function bem() {
      return function (name, fixed, change) {
        var _this = this;
        // 类名前缀
        var prefix = "u-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
        // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      };
    }
  },

  methods: {
    // 跳转某一个页面
    openPage: function openPage() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {
      var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this2)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this3 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = uni.$u.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 41 */
/*!***************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/mixin/mpMixin.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
};
exports.default = _default;

/***/ }),
/* 42 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 43));
var _default = _Request.default;
exports.default = _default;

/***/ }),
/* 43 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/Request.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 44));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 52));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 53));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 54));
var _utils = __webpack_require__(/*! ../utils */ 47);
var _clone = _interopRequireDefault(__webpack_require__(/*! ../utils/clone */ 55));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  /**
  * @param {Object} arg - 全局配置
  * @param {String} arg.baseURL - 全局根路径
  * @param {Object} arg.header - 全局header
  * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
  * @param {String} arg.dataType = [json] - 全局默认的dataType
  * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
  * @param {Object} arg.custom - 全局默认的自定义参数
  * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
  * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
  * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
  * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
  * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
  */
  function Request() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = (0, _clone.default)(_objectSpread(_objectSpread({}, _defaults.default), arg));
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
  * @Function
  * @param {Request~setConfigCallback} f - 设置全局默认配置
  */
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value: function setConfig(f) {
      this.config = f(this.config);
    }
  }, {
    key: "middleware",
    value: function middleware(config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }

    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
  }, {
    key: "request",
    value: function request() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET'
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "connect",
    value: function connect(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT'
      }, options));
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD'
      }, options));
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS'
      }, _options));
    }
  }, {
    key: "trace",
    value: function trace(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE'
      }, options));
    }
  }, {
    key: "upload",
    value: function upload(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    }
  }, {
    key: "download",
    value: function download(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    }
  }]);
  return Request;
}();
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
exports.default = Request;

/***/ }),
/* 44 */
/*!***********************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/dispatchRequest.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 45));
var _default = function _default(config) {
  return (0, _index.default)(config);
};
exports.default = _default;

/***/ }),
/* 45 */
/*!*****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/adapters/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 46));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 48));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 51));
var _utils = __webpack_require__(/*! ../utils */ 47);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 返回可选值存在的配置
 * @param {Array} keys - 可选值数组
 * @param {Object} config2 - 配置
 * @return {{}} - 存在的配置项
 */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
var _default = function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        (0, _settle.default)(resolve, reject, response);
      }
    };
    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      var optionalKeys = ['formData'];
      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = ['data', 'method', 'timeout', 'dataType', 'responseType'];
      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 46 */
/*!*******************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/helpers/buildURL.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var utils = _interopRequireWildcard(__webpack_require__(/*! ../utils */ 47));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }
  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils.isArray(val)) {
        key = "".concat(key, "[]");
      } else {
        val = [val];
      }
      utils.forEach(val, function (v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push("".concat(encode(key), "=").concat(encode(v)));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/***/ }),
/* 47 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/utils.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMerge = deepMerge;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isURLSearchParams = isURLSearchParams;
exports.isUndefined = isUndefined;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((0, _typeof2.default)(obj) !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 48 */
/*!*********************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/buildFullPath.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 49));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 50));
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 49 */
/*!************************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 50 */
/*!**********************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/helpers/combineURLs.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? "".concat(baseURL.replace(/\/+$/, ''), "/").concat(relativeURL.replace(/^\/+/, '')) : baseURL;
}

/***/ }),
/* 51 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/settle.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 52 */
/*!**************************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/InterceptorManager.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var _default = InterceptorManager;
exports.default = _default;

/***/ }),
/* 53 */
/*!*******************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/mergeConfig.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../utils */ 47);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
 * @param {Array} keys - 配置项
 * @param {Object} globalsConfig - 当前的全局配置
 * @param {Object} config2 - 局部配置
 * @return {{}}
 */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
 *
 * @param globalsConfig - 当前实例的全局配置
 * @param config2 - 当前的局部配置
 * @return - 合并后的配置
 */
var _default = function _default(globalsConfig) {
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {})
  };
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {} else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = ['filePath', 'name', 'formData'];
    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = ['data', 'timeout', 'dataType', 'responseType'];
    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.default = _default;

/***/ }),
/* 54 */
/*!****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/core/defaults.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 默认的全局配置
 */
var _default = {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  custom: {},
  timeout: 60000,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
exports.default = _default;

/***/ }),
/* 55 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/luch-request/utils/clone.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/* eslint-disable */
var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
   */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((0, _typeof2.default)(circular) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != 'undefined';
    if (typeof circular == 'undefined') circular = true;
    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;
      if (depth === 0) return parent;
      var child;
      var proto;
      if ((0, _typeof2.default)(parent) != 'object') {
        return parent;
      }
      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        if (Buffer.from) {
          // Node.js >= 5.10.0
          child = Buffer.from(parent);
        } else {
          // Older Node.js versions
          child = new Buffer(parent.length);
          parent.copy(child);
        }
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index = allParents.indexOf(parent);
        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }
      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }
      for (var i in parent) {
        var attrs = Object.getOwnPropertyDescriptor(parent, i);
        if (attrs) {
          child[i] = _clone(parent[i], depth - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent, i);
          if (objProperty.set === 'undefined') {
            // no setter defined. Skip cloning this property
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        } catch (e) {
          if (e instanceof TypeError) {
            // when in strict mode, TypeError will be thrown if child[i] property only has a getter
            // we can't do anything about this, other than inform the user that this property cannot be set.
            continue;
          } else if (e instanceof ReferenceError) {
            //this may happen in non strict mode
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;
    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;
  function __isDate(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;
  function __isArray(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;
  function __isRegExp(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;
  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;
  return clone;
}();
var _default = clone;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 56).Buffer))

/***/ }),
/* 56 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 57)
var ieee754 = __webpack_require__(/*! ieee754 */ 58)
var isArray = __webpack_require__(/*! isarray */ 59)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 57 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 58 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 59 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 60 */
/*!************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/util/route.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 61));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 63));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: 'pop-in',
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = uni.$u.queryParams(params);
      return url += query;
    }

    // 对外的方法名称
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};
                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepMerge(this.config, options);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === uni.$u.page())) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {
                  _context.next = 16;
                  break;
                }
                _context.next = 12;
                return new Promise(function (resolve, reject) {
                  uni.$u.routeIntercept(mergeConfig, resolve);
                });
              case 12:
                isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);
                _context.next = 17;
                break;
              case 16:
                this.openPage(mergeConfig);
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // 执行路由跳转
  }, {
    key: "openPage",
    value: function openPage(config) {
      // 解构参数
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 61 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 62)();
module.exports = runtime;

/***/ }),
/* 62 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 63 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 64 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/colorGradient.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; // 总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    var hex = rgbToHex("rgb(".concat(Math.round(sR * i + startR), ",").concat(Math.round(sG * i + startG), ",").concat(Math.round(sB * i + startB), ")"));
    // 确保第一个颜色值为startColor的值
    if (i === 0) hex = rgbToHex(startColor);
    // 确保最后一个颜色值为endColor的值
    if (i === step - 1) hex = rgbToHex(endColor);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i, _i + 2))));
    }
    if (!str) {
      return sColorChange;
    }
    return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return arr.map(function (val) {
      return Number(val);
    });
  }
  return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? "".concat(0, hex) : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    var aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      var numHex = '#';
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
* JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
* sHex为传入的十六进制的色值
* alpha为rgba的透明度
*/
function colorToRgba(color, alpha) {
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = String(color).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i3, _i3 + 2))));
    }
    // return sColorChange.join(',')
    return "rgba(".concat(sColorChange.join(','), ",").concat(alpha, ")");
  }
  return sColor;
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba
};
exports.default = _default;

/***/ }),
/* 65 */
/*!***************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/test.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证字符串
 */
function string(value) {
  return typeof value === 'string';
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function func(value) {
  return typeof value === 'function';
}

/**
 * 是否promise对象
 * @param {Object} value
 */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
 * @param {Object} value
 */
function image(value) {
  var newValue = value.split('?')[0];
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}

/**
 * 是否为正则对象
 * @param {Object}
 * @return {Boolean}
 */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code,
  func: func,
  promise: promise,
  video: video,
  image: image,
  regExp: regExp,
  string: string
};
exports.default = _default;

/***/ }),
/* 66 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/debounce.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 67 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/throttle.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer;
var flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = throttle;
exports.default = _default;

/***/ }),
/* 68 */
/*!****************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 65));
var _digit = __webpack_require__(/*! ./digit.js */ 69);
/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_test.default.number(value)) {
    return unit ? "".concat(value, "px") : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$u.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
function sleep() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}
/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
function sys() {
  return uni.getSystemInfoSync();
}

/**
 * @description 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
function addStyle(customStyle) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if (_test.default.empty(customStyle) || (0, _typeof2.default)(customStyle) === 'object' && target === 'object' || target === 'string' && typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
function addUnit() {
  var _uni$$u$config$unit, _uni, _uni$$u, _uni$$u$config;
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_uni$$u$config$unit = (_uni = uni) === null || _uni === void 0 ? void 0 : (_uni$$u = _uni.$u) === null || _uni$$u === void 0 ? void 0 : (_uni$$u$config = _uni$$u.config) === null || _uni$$u$config === void 0 ? void 0 : _uni$$u$config.unit) !== null && _uni$$u$config$unit !== void 0 ? _uni$$u$config$unit : 'px';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (obj === null || (0, _typeof2.default)(obj) !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  var clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return [key, deepClone(value, cache)];
    }));
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, function (value) {
      return deepClone(value, cache);
    }));
  } else if (Array.isArray(obj)) {
    clone = obj.map(function (value) {
      return deepClone(value, cache);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (var _i3 = 0, _Object$entries = Object.entries(obj); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i3], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if ((0, _typeof2.default)(target) !== 'object' || target === null || (0, _typeof2.default)(source) !== 'object' || source === null) return target;
  var merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    var sourceValue = source[prop];
    var targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if ((0, _typeof2.default)(sourceValue) === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}

/**
 * @description error提示
 * @param {*} err 错误内容
 */
function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uView\u63D0\u793A\uFF1A".concat(err));
  }
}

/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String');
    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  var date;
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date();
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime === null || dateTime === void 0 ? void 0 : dateTime.toString().trim())) {
    date = new Date(dateTime * 1000);
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime));
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'));
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime);
  }
  var timeSource = {
    'y': date.getFullYear().toString(),
    // 年
    'm': (date.getMonth() + 1).toString().padStart(2, '0'),
    // 月
    'd': date.getDate().toString().padStart(2, '0'),
    // 日
    'h': date.getHours().toString().padStart(2, '0'),
    // 时
    'M': date.getMinutes().toString().padStart(2, '0'),
    // 分
    's': date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var key in timeSource) {
    var _ref3 = new RegExp("".concat(key, "+")).exec(formatStr) || [],
      _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
      ret = _ref4[0];
    if (ret) {
      // 年可能只需展示两位
      var beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }
  return formatStr;
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }
  }
  return tips;
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
      }
    } else {
      _result.push("".concat(key, "=").concat(value));
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration
  });
}

/**
 * @description 根据主题type值,获取对应的图标
 * @param {String} type 主题名称,primary|info|error|warning|success
 * @param {boolean} fill 是否使用fill填充实体的图标
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
function priceFormat(number) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  s = (prec ? (0, _digit.round)(n, prec) + '' : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @description 获取duration值
 * 如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
 * 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
 * @param {String|number} value 比如: "1s"|"100ms"|1|100
 * @param {boolean} unit  提示: 如果是false 默认返回number
 * @return {string|number}
 */
function getDuration(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
function padZero(value) {
  return "00".concat(value).slice(-2);
}

/**
 * @description 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
function formValidate(instance, event) {
  var formItem = uni.$u.$parent.call(instance, 'u-form-item');
  var form = uni.$u.$parent.call(instance, 'u-form');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }
  if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};
    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

/**
 * @description 设置对象的属性值，如果'a.b.c'的形式进行设置
 * @param {object} obj 对象
 * @param {string} key 需要设置的属性
 * @param {string} value 设置的值
 */
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || (0, _typeof2.default)(_obj[k]) !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== 'string' || key === '') {} else if (key.indexOf('.') !== -1) {
    // 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

/**
 * @description 获取当前页面路径
 */
function page() {
  var _pages$route, _pages;
  var pages = getCurrentPages();
  // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
  return "/".concat((_pages$route = (_pages = pages[pages.length - 1]) === null || _pages === void 0 ? void 0 : _pages.route) !== null && _pages$route !== void 0 ? _pages$route : '');
}

/**
 * @description 获取当前路由栈实例数组
 */
function pages() {
  var pages = getCurrentPages();
  return pages;
}

/**
 * 获取页面历史栈指定层实例
 * @param back {number} [0] - 0或者负数，表示获取历史栈的哪一层，0表示获取当前页面实例，-1 表示获取上一个页面实例。默认0。
 */
function getHistoryPage() {
  var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pages = getCurrentPages();
  var len = pages.length;
  return pages[len - 1 + back];
}

/**
 * @description 修改uView内置属性值
 * @param {object} props 修改内置props属性
 * @param {object} config 修改内置config属性
 * @param {object} color 修改内置color属性
 * @param {object} zIndex 修改内置zIndex属性
 */
function setConfig(_ref5) {
  var _ref5$props = _ref5.props,
    props = _ref5$props === void 0 ? {} : _ref5$props,
    _ref5$config = _ref5.config,
    config = _ref5$config === void 0 ? {} : _ref5$config,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? {} : _ref5$color,
    _ref5$zIndex = _ref5.zIndex,
    zIndex = _ref5$zIndex === void 0 ? {} : _ref5$zIndex;
  var deepMerge = uni.$u.deepMerge;
  uni.$u.config = deepMerge(uni.$u.config, config);
  uni.$u.props = deepMerge(uni.$u.props, props);
  uni.$u.color = deepMerge(uni.$u.color, color);
  uni.$u.zIndex = deepMerge(uni.$u.zIndex, zIndex);
}
var _default = {
  range: range,
  getPx: getPx,
  sleep: sleep,
  os: os,
  sys: sys,
  random: random,
  guid: guid,
  $parent: $parent,
  addStyle: addStyle,
  addUnit: addUnit,
  deepClone: deepClone,
  deepMerge: deepMerge,
  error: error,
  randomArray: randomArray,
  timeFormat: timeFormat,
  timeFrom: timeFrom,
  trim: trim,
  queryParams: queryParams,
  toast: toast,
  type2icon: type2icon,
  priceFormat: priceFormat,
  getDuration: getDuration,
  padZero: padZero,
  formValidate: formValidate,
  getProperty: getProperty,
  setProperty: setProperty,
  page: page,
  pages: pages,
  getHistoryPage: getHistoryPage,
  setConfig: setConfig
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 69 */
/*!****************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/digit.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.divide = divide;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports.minus = minus;
exports.plus = plus;
exports.round = round;
exports.times = times;
var _toArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toArray */ 70));
var _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn("".concat(num, " \u8D85\u51FA\u4E86\u7CBE\u5EA6\u9650\u5236\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u6B63\u786E"));
    }
  }
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {function} operation 迭代操作
 * @private
 */
function iteratorOperation(arr, operation) {
  var _arr = (0, _toArray2.default)(arr),
    num1 = _arr[0],
    num2 = _arr[1],
    others = _arr.slice(2);
  var res = operation(num1, num2);
  others.forEach(function (num) {
    res = operation(res, num);
  });
  return res;
}

/**
 * 高精度乘法
 * @export
 */
function times() {
  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 */
function plus() {
  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  // 取最大的小数位
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 */
function minus() {
  for (var _len3 = arguments.length, nums = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    nums[_key3] = arguments[_key3];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 */
function divide() {
  for (var _len4 = arguments.length, nums = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    nums[_key4] = arguments[_key4];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // 重要，这里必须用strip进行修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 * @export
 */
function round(num, ratio) {
  var base = Math.pow(10, ratio);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  // 位数不足则补0
  return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
function enableBoundaryChecking() {
  var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  _boundaryCheckingState = flag;
}
var _default = {
  times: times,
  plus: plus,
  minus: minus,
  divide: divide,
  round: round,
  enableBoundaryChecking: enableBoundaryChecking
};
exports.default = _default;

/***/ }),
/* 70 */
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 71 */
/*!***************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/config.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 此版本发布于2023-03-27
var version = '2.0.36';

// 开发环境才提示，生产环境不会提示
if (true) {
  console.log("\n %c uView V".concat(version, " %c https://uviewui.com/ \n\n"), 'color: #ffffff; background: #3c9cff; padding:5px 0; border-radius: 5px;');
}
var _default = {
  v: version,
  version: version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning'],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'u-primary': '#2979ff',
    'u-warning': '#ff9900',
    'u-success': '#19be6b',
    'u-error': '#fa3534',
    'u-info': '#909399',
    'u-main-color': '#303133',
    'u-content-color': '#606266',
    'u-tips-color': '#909399',
    'u-light-color': '#c0c4cc'
  },
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: 'px'
};
exports.default = _default;

/***/ }),
/* 72 */
/*!**************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 71));
var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./props/actionSheet.js */ 73));
var _album = _interopRequireDefault(__webpack_require__(/*! ./props/album.js */ 74));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./props/alert.js */ 75));
var _avatar = _interopRequireDefault(__webpack_require__(/*! ./props/avatar */ 76));
var _avatarGroup = _interopRequireDefault(__webpack_require__(/*! ./props/avatarGroup */ 77));
var _backtop = _interopRequireDefault(__webpack_require__(/*! ./props/backtop */ 78));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./props/badge */ 79));
var _button = _interopRequireDefault(__webpack_require__(/*! ./props/button */ 80));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./props/calendar */ 81));
var _carKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/carKeyboard */ 82));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./props/cell */ 83));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./props/cellGroup */ 84));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./props/checkbox */ 85));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./props/checkboxGroup */ 86));
var _circleProgress = _interopRequireDefault(__webpack_require__(/*! ./props/circleProgress */ 87));
var _code = _interopRequireDefault(__webpack_require__(/*! ./props/code */ 88));
var _codeInput = _interopRequireDefault(__webpack_require__(/*! ./props/codeInput */ 89));
var _col = _interopRequireDefault(__webpack_require__(/*! ./props/col */ 90));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./props/collapse */ 91));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./props/collapseItem */ 92));
var _columnNotice = _interopRequireDefault(__webpack_require__(/*! ./props/columnNotice */ 93));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./props/countDown */ 94));
var _countTo = _interopRequireDefault(__webpack_require__(/*! ./props/countTo */ 95));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./props/datetimePicker */ 96));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./props/divider */ 97));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./props/empty */ 98));
var _form = _interopRequireDefault(__webpack_require__(/*! ./props/form */ 99));
var _formItem = _interopRequireDefault(__webpack_require__(/*! ./props/formItem */ 100));
var _gap = _interopRequireDefault(__webpack_require__(/*! ./props/gap */ 101));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./props/grid */ 102));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./props/gridItem */ 103));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./props/icon */ 104));
var _image = _interopRequireDefault(__webpack_require__(/*! ./props/image */ 105));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./props/indexAnchor */ 106));
var _indexList = _interopRequireDefault(__webpack_require__(/*! ./props/indexList */ 107));
var _input = _interopRequireDefault(__webpack_require__(/*! ./props/input */ 108));
var _keyboard = _interopRequireDefault(__webpack_require__(/*! ./props/keyboard */ 109));
var _line = _interopRequireDefault(__webpack_require__(/*! ./props/line */ 110));
var _lineProgress = _interopRequireDefault(__webpack_require__(/*! ./props/lineProgress */ 111));
var _link = _interopRequireDefault(__webpack_require__(/*! ./props/link */ 112));
var _list = _interopRequireDefault(__webpack_require__(/*! ./props/list */ 113));
var _listItem = _interopRequireDefault(__webpack_require__(/*! ./props/listItem */ 114));
var _loadingIcon = _interopRequireDefault(__webpack_require__(/*! ./props/loadingIcon */ 115));
var _loadingPage = _interopRequireDefault(__webpack_require__(/*! ./props/loadingPage */ 116));
var _loadmore = _interopRequireDefault(__webpack_require__(/*! ./props/loadmore */ 117));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./props/modal */ 118));
var _navbar = _interopRequireDefault(__webpack_require__(/*! ./props/navbar */ 119));
var _noNetwork = _interopRequireDefault(__webpack_require__(/*! ./props/noNetwork */ 121));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./props/noticeBar */ 122));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./props/notify */ 123));
var _numberBox = _interopRequireDefault(__webpack_require__(/*! ./props/numberBox */ 124));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/numberKeyboard */ 125));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./props/overlay */ 126));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./props/parse */ 127));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./props/picker */ 128));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./props/popup */ 129));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./props/radio */ 130));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./props/radioGroup */ 131));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./props/rate */ 132));
var _readMore = _interopRequireDefault(__webpack_require__(/*! ./props/readMore */ 133));
var _row = _interopRequireDefault(__webpack_require__(/*! ./props/row */ 134));
var _rowNotice = _interopRequireDefault(__webpack_require__(/*! ./props/rowNotice */ 135));
var _scrollList = _interopRequireDefault(__webpack_require__(/*! ./props/scrollList */ 136));
var _search = _interopRequireDefault(__webpack_require__(/*! ./props/search */ 137));
var _section = _interopRequireDefault(__webpack_require__(/*! ./props/section */ 138));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./props/skeleton */ 139));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./props/slider */ 140));
var _statusBar = _interopRequireDefault(__webpack_require__(/*! ./props/statusBar */ 141));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./props/steps */ 142));
var _stepsItem = _interopRequireDefault(__webpack_require__(/*! ./props/stepsItem */ 143));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./props/sticky */ 144));
var _subsection = _interopRequireDefault(__webpack_require__(/*! ./props/subsection */ 145));
var _swipeAction = _interopRequireDefault(__webpack_require__(/*! ./props/swipeAction */ 146));
var _swipeActionItem = _interopRequireDefault(__webpack_require__(/*! ./props/swipeActionItem */ 147));
var _swiper = _interopRequireDefault(__webpack_require__(/*! ./props/swiper */ 148));
var _swipterIndicator = _interopRequireDefault(__webpack_require__(/*! ./props/swipterIndicator */ 149));
var _switch2 = _interopRequireDefault(__webpack_require__(/*! ./props/switch */ 150));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./props/tabbar */ 151));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./props/tabbarItem */ 152));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./props/tabs */ 153));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./props/tag */ 154));
var _text = _interopRequireDefault(__webpack_require__(/*! ./props/text */ 155));
var _textarea = _interopRequireDefault(__webpack_require__(/*! ./props/textarea */ 156));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./props/toast */ 157));
var _toolbar = _interopRequireDefault(__webpack_require__(/*! ./props/toolbar */ 158));
var _tooltip = _interopRequireDefault(__webpack_require__(/*! ./props/tooltip */ 159));
var _transition = _interopRequireDefault(__webpack_require__(/*! ./props/transition */ 160));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./props/upload */ 161));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var color = _config.default.color;
var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actionSheet.default), _album.default), _alert.default), _avatar.default), _avatarGroup.default), _backtop.default), _badge.default), _button.default), _calendar.default), _carKeyboard.default), _cell.default), _cellGroup.default), _checkbox.default), _checkboxGroup.default), _circleProgress.default), _code.default), _codeInput.default), _col.default), _collapse.default), _collapseItem.default), _columnNotice.default), _countDown.default), _countTo.default), _datetimePicker.default), _divider.default), _empty.default), _form.default), _formItem.default), _gap.default), _grid.default), _gridItem.default), _icon.default), _image.default), _indexAnchor.default), _indexList.default), _input.default), _keyboard.default), _line.default), _lineProgress.default), _link.default), _list.default), _listItem.default), _loadingIcon.default), _loadingPage.default), _loadmore.default), _modal.default), _navbar.default), _noNetwork.default), _noticeBar.default), _notify.default), _numberBox.default), _numberKeyboard.default), _overlay.default), _parse.default), _picker.default), _popup.default), _radio.default), _radioGroup.default), _rate.default), _readMore.default), _row.default), _rowNotice.default), _scrollList.default), _search.default), _section.default), _skeleton.default), _slider.default), _statusBar.default), _steps.default), _stepsItem.default), _sticky.default), _subsection.default), _swipeAction.default), _swipeActionItem.default), _swiper.default), _swipterIndicator.default), _switch2.default), _tabbar.default), _tabbarItem.default), _tabs.default), _tag.default), _text.default), _textarea.default), _toast.default), _toolbar.default), _tooltip.default), _transition.default), _upload.default);
exports.default = _default;

/***/ }),
/* 73 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/actionSheet.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:44:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
 */
var _default = {
  // action-sheet组件
  actionSheet: {
    show: false,
    title: '',
    description: '',
    actions: function actions() {
      return [];
    },
    index: '',
    cancelText: '',
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: '',
    closeOnClickOverlay: true,
    round: 0
  }
};
exports.default = _default;

/***/ }),
/* 74 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/album.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:47:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/album.js
 */
var _default = {
  // album 组件
  album: {
    urls: function urls() {
      return [];
    },
    keyName: '',
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: 'scaleToFill',
    multipleMode: 'aspectFill',
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true
  }
};
exports.default = _default;

/***/ }),
/* 75 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/alert.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:48:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/alert.js
 */
var _default = {
  // alert警告组件
  alert: {
    title: '',
    type: 'warning',
    description: '',
    closable: false,
    showIcon: false,
    effect: 'light',
    center: false,
    fontSize: 14
  }
};
exports.default = _default;

/***/ }),
/* 76 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/avatar.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:22
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatar.js
 */
var _default = {
  // avatar 组件
  avatar: {
    src: '',
    shape: 'circle',
    size: 40,
    mode: 'scaleToFill',
    text: '',
    bgColor: '#c0c4cc',
    color: '#ffffff',
    fontSize: 18,
    icon: '',
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: '',
    colorIndex: '',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 77 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/avatarGroup.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatarGroup.js
 */
var _default = {
  // avatarGroup 组件
  avatarGroup: {
    urls: function urls() {
      return [];
    },
    maxCount: 5,
    shape: 'circle',
    mode: 'scaleToFill',
    showMore: true,
    size: 40,
    keyName: '',
    gap: 0.5,
    extraValue: 0
  }
};
exports.default = _default;

/***/ }),
/* 78 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/backtop.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:50:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/backtop.js
 */
var _default = {
  // backtop组件
  backtop: {
    mode: 'circle',
    icon: 'arrow-upward',
    text: '',
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: function iconStyle() {
      return {
        color: '#909399',
        fontSize: '19px'
      };
    }
  }
};
exports.default = _default;

/***/ }),
/* 79 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/badge.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 19:51:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/badge.js
 */
var _default = {
  // 徽标数组件
  badge: {
    isDot: false,
    value: '',
    show: true,
    max: 999,
    type: 'error',
    showZero: false,
    bgColor: null,
    color: null,
    shape: 'circle',
    numberType: 'overflow',
    offset: function offset() {
      return [];
    },
    inverted: false,
    absolute: false
  }
};
exports.default = _default;

/***/ }),
/* 80 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/button.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:51:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/button.js
 */
var _default = {
  // button组件
  button: {
    hairline: false,
    type: 'info',
    size: 'normal',
    shape: 'square',
    plain: false,
    disabled: false,
    loading: false,
    loadingText: '',
    loadingMode: 'spinner',
    loadingSize: 15,
    openType: '',
    formType: '',
    appParameter: '',
    hoverStopPropagation: true,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataName: '',
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: '',
    icon: '',
    iconColor: '',
    color: ''
  }
};
exports.default = _default;

/***/ }),
/* 81 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/calendar.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:52:43
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
 */
var _default = {
  // calendar 组件
  calendar: {
    title: '日期选择',
    showTitle: true,
    showSubtitle: true,
    mode: 'single',
    startText: '开始',
    endText: '结束',
    customList: function customList() {
      return [];
    },
    color: '#3c9cff',
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: '确定',
    confirmDisabledText: '确定',
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    // Infinity
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false,
    round: 0,
    monthNum: 3
  }
};
exports.default = _default;

/***/ }),
/* 82 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/carKeyboard.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:53:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/carKeyboard.js
 */
var _default = {
  // 车牌号键盘
  carKeyboard: {
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 83 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/cell.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 20:53:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cell.js
 */
var _default = {
  // cell组件的props
  cell: {
    customClass: '',
    title: '',
    label: '',
    value: '',
    icon: '',
    disabled: false,
    border: true,
    center: false,
    url: '',
    linkType: 'navigateTo',
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: '',
    iconStyle: {},
    rightIconStyle: {},
    rightIcon: 'arrow-right',
    titleStyle: {},
    size: '',
    stop: true,
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 84 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/cellGroup.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cellGroup.js
 */
var _default = {
  // cell-group组件的props
  cellGroup: {
    title: '',
    border: true,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 85 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/checkbox.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 21:06:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkbox.js
 */
var _default = {
  // checkbox组件
  checkbox: {
    name: '',
    shape: '',
    size: '',
    checkbox: false,
    disabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    iconColor: '',
    label: '',
    labelSize: '',
    labelColor: '',
    labelDisabled: ''
  }
};
exports.default = _default;

/***/ }),
/* 86 */
/*!****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/checkboxGroup.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkboxGroup.js
 */
var _default = {
  // checkbox-group组件
  checkboxGroup: {
    name: '',
    value: function value() {
      return [];
    },
    shape: 'square',
    disabled: false,
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    size: 18,
    placement: 'row',
    labelSize: 14,
    labelColor: '#303133',
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    iconPlacement: 'left',
    borderBottom: false
  }
};
exports.default = _default;

/***/ }),
/* 87 */
/*!*****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/circleProgress.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:02
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/circleProgress.js
 */
var _default = {
  // circleProgress 组件
  circleProgress: {
    percentage: 30
  }
};
exports.default = _default;

/***/ }),
/* 88 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/code.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
 */
var _default = {
  // code 组件
  code: {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    keepRunning: false,
    uniqueKey: ''
  }
};
exports.default = _default;

/***/ }),
/* 89 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/codeInput.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
 */
var _default = {
  // codeInput 组件
  codeInput: {
    adjustPosition: true,
    maxlength: 6,
    dot: false,
    mode: 'box',
    hairline: false,
    space: 10,
    value: '',
    focus: false,
    bold: false,
    color: '#606266',
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: '#c9cacc',
    disabledDot: true
  }
};
exports.default = _default;

/***/ }),
/* 90 */
/*!******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/col.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/col.js
 */
var _default = {
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: 'start',
    align: 'stretch',
    textAlign: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 91 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/collapse.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapse.js
 */
var _default = {
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true
  }
};
exports.default = _default;

/***/ }),
/* 92 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/collapseItem.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapseItem.js
 */
var _default = {
  // collapseItem 组件
  collapseItem: {
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: 'left',
    name: '',
    icon: '',
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 93 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/columnNotice.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/columnNotice.js
 */
var _default = {
  // columnNotice 组件
  columnNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true
  }
};
exports.default = _default;

/***/ }),
/* 94 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/countDown.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:29
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countDown.js
 */
var _default = {
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    millisecond: false
  }
};
exports.default = _default;

/***/ }),
/* 95 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/countTo.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countTo.js
 */
var _default = {
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: '.',
    color: '#606266',
    fontSize: 22,
    bold: false,
    separator: ''
  }
};
exports.default = _default;

/***/ }),
/* 96 */
/*!*****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/datetimePicker.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:48
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
 */
var _default = {
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: '',
    title: '',
    mode: 'datetime',
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    }
  }
};
exports.default = _default;

/***/ }),
/* 97 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/divider.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:58:03
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/divider.js
 */
var _default = {
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
    text: '',
    textSize: 14,
    textColor: '#909399',
    lineColor: '#dcdfe6'
  }
};
exports.default = _default;

/***/ }),
/* 98 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/empty.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/empty.js
 */
var _default = {
  // empty组件
  empty: {
    icon: '',
    text: '',
    textColor: '#c0c4cc',
    textSize: 14,
    iconColor: '#c0c4cc',
    iconSize: 90,
    mode: 'data',
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
exports.default = _default;

/***/ }),
/* 99 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/form.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/form.js
 */
var _default = {
  // form 组件
  form: {
    model: function model() {
      return {};
    },
    rules: function rules() {
      return {};
    },
    errorType: 'message',
    borderBottom: true,
    labelPosition: 'left',
    labelWidth: 45,
    labelAlign: 'left',
    labelStyle: function labelStyle() {
      return {};
    }
  }
};
exports.default = _default;

/***/ }),
/* 100 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/formItem.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/formItem.js
 */
var _default = {
  // formItem 组件
  formItem: {
    label: '',
    prop: '',
    borderBottom: '',
    labelPosition: '',
    labelWidth: '',
    rightIcon: '',
    leftIcon: '',
    required: false,
    leftIconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 101 */
/*!******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/gap.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gap.js
 */
var _default = {
  // gap组件
  gap: {
    bgColor: 'transparent',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 102 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/grid.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:57
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/grid.js
 */
var _default = {
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 103 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/gridItem.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gridItem.js
 */
var _default = {
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 104 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/icon.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 71));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 18:00:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/icon.js
 */

var color = _config.default.color;
var _default = {
  // icon组件
  icon: {
    name: '',
    color: color['u-content-color'],
    size: '16px',
    bold: false,
    index: '',
    hoverClass: '',
    customPrefix: 'uicon',
    label: '',
    labelPos: 'right',
    labelSize: '15px',
    labelColor: color['u-content-color'],
    space: '3px',
    imgMode: '',
    width: '',
    height: '',
    top: 0,
    stop: false
  }
};
exports.default = _default;

/***/ }),
/* 105 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/image.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:51
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/image.js
 */
var _default = {
  // image组件
  image: {
    src: '',
    mode: 'aspectFill',
    width: '300',
    height: '225',
    shape: 'square',
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: 'photo',
    errorIcon: 'error-circle',
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: '#f3f4f6'
  }
};
exports.default = _default;

/***/ }),
/* 106 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/indexAnchor.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:15
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexAnchor.js
 */
var _default = {
  // indexAnchor 组件
  indexAnchor: {
    text: '',
    color: '#606266',
    size: 14,
    bgColor: '#dedede',
    height: 32
  }
};
exports.default = _default;

/***/ }),
/* 107 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/indexList.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexList.js
 */
var _default = {
  // indexList 组件
  indexList: {
    inactiveColor: '#606266',
    activeColor: '#5677fc',
    indexList: function indexList() {
      return [];
    },
    sticky: true,
    customNavHeight: 0
  }
};
exports.default = _default;

/***/ }),
/* 108 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/input.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
 */
var _default = {
  // index 组件
  input: {
    value: '',
    type: 'text',
    fixed: false,
    disabled: false,
    disabledColor: '#f5f7fa',
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: null,
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    showWordLimit: false,
    confirmType: 'done',
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: 'left',
    fontSize: '15px',
    color: '#303133',
    prefixIcon: '',
    prefixIconStyle: '',
    suffixIcon: '',
    suffixIconStyle: '',
    border: 'surround',
    readonly: false,
    shape: 'square',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 109 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/keyboard.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/keyboard.js
 */
var _default = {
  // 键盘组件
  keyboard: {
    mode: 'number',
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: '',
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: '取消',
    confirmText: '确定',
    autoChange: false
  }
};
exports.default = _default;

/***/ }),
/* 110 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/line.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/line.js
 */
var _default = {
  // line组件
  line: {
    color: '#d6d7d9',
    length: '100%',
    direction: 'row',
    hairline: true,
    margin: 0,
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 111 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/lineProgress.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:11
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/lineProgress.js
 */
var _default = {
  // lineProgress 组件
  lineProgress: {
    activeColor: '#19be6b',
    inactiveColor: '#ececec',
    percentage: 0,
    showText: true,
    height: 12
  }
};
exports.default = _default;

/***/ }),
/* 112 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/link.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 71));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:36
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/link.js
 */

var color = _config.default.color;
var _default = {
  // link超链接组件props参数
  link: {
    color: color['u-primary'],
    fontSize: 15,
    underLine: false,
    href: '',
    mpTips: '链接已复制，请在浏览器打开',
    lineColor: '',
    text: ''
  }
};
exports.default = _default;

/***/ }),
/* 113 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/list.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/list.js
 */
var _default = {
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: '',
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1
  }
};
exports.default = _default;

/***/ }),
/* 114 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/listItem.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/listItem.js
 */
var _default = {
  // listItem 组件
  listItem: {
    anchor: ''
  }
};
exports.default = _default;

/***/ }),
/* 115 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/loadingIcon.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 71));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
 */

var color = _config.default.color;
var _default = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color['u-tips-color'],
    textColor: color['u-tips-color'],
    vertical: false,
    mode: 'spinner',
    size: 24,
    textSize: 15,
    text: '',
    timingFunction: 'ease-in-out',
    duration: 1200,
    inactiveColor: ''
  }
};
exports.default = _default;

/***/ }),
/* 116 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/loadingPage.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:23
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingPage.js
 */
var _default = {
  // loading-page组件
  loadingPage: {
    loadingText: '正在加载',
    image: '',
    loadingMode: 'circle',
    loading: false,
    bgColor: '#ffffff',
    color: '#C8C8C8',
    fontSize: 19,
    iconSize: 28,
    loadingColor: '#C8C8C8'
  }
};
exports.default = _default;

/***/ }),
/* 117 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/loadmore.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:26
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadmore.js
 */
var _default = {
  // loadmore 组件
  loadmore: {
    status: 'loadmore',
    bgColor: 'transparent',
    icon: true,
    fontSize: 14,
    iconSize: 17,
    color: '#606266',
    loadingIcon: 'spinner',
    loadmoreText: '加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    isDot: false,
    iconColor: '#b7b7b7',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    line: false,
    lineColor: '#E6E8EB',
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 118 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/modal.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
 */
var _default = {
  // modal 组件
  modal: {
    show: false,
    title: '',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: '650rpx',
    confirmButtonShape: ''
  }
};
exports.default = _default;

/***/ }),
/* 119 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/navbar.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _color = _interopRequireDefault(__webpack_require__(/*! ../color */ 120));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/navbar.js
 */
var _default = {
  // navbar 组件
  navbar: {
    safeAreaInsetTop: true,
    placeholder: false,
    fixed: true,
    border: false,
    leftIcon: 'arrow-left',
    leftText: '',
    rightText: '',
    rightIcon: '',
    title: '',
    bgColor: '#ffffff',
    titleWidth: '400rpx',
    height: '44px',
    leftIconSize: 20,
    leftIconColor: _color.default.mainColor,
    autoBack: false,
    titleStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 120 */
/*!**************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/color.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: '#3c9cff',
  info: '#909399',
  default: '#909399',
  warning: '#f9ae3d',
  error: '#f56c6c',
  success: '#5ac725',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#e4e7ed'
};
var _default = color;
exports.default = _default;

/***/ }),
/* 121 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/noNetwork.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noNetwork.js
 */
var _default = {
  // noNetwork
  noNetwork: {
    tips: '哎呀，网络信号丢失',
    zIndex: '',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAABLAAAAADYYILnAABAAElEQVR4Ae29CZhkV3kefNeq6m2W7tn3nl0aCbHIAgmQPGB+sLCNzSID9g9PYrAf57d/+4+DiW0cy8QBJ06c2In/PLFDHJ78+MGCGNsYgyxwIwktwEijAc1ohtmnZ+2Z7p5eq6vu9r/vuXWrq25VdVV1V3dXVX9Hmj73nv285963vvOd75yraeIEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQaD8E9PbrkvRopSMwMBBYRs+5O/yJS68cPnzYXel4tFP/jXbqjPRFEAiCQNe6Bw/6gdFn9Oy9Q90LLG2DgBBW2wyldIQIPPPCte2a5q3jtR+4ff/4wuBuXotrDwSEsNpjHKUXQODppy+udYJMEUEZgbd94DvnNwlA7YGAEFZ7jOOK78Xp06eTTkq7sxwQhmXuf/754VXl4iSstRAQwmqt8ZLWlkHg0UcD49qYfUjXfLtMtOZ7npExJu4iqZWLl7DWQUAIq3XGSlpaAYHD77q8xwuCOSUoXw8Sl0eMux977DGzQjES3AIICGG1wCBJEysj8PXnz230XXdr5RQFMYbRvWnv6w8UhMhliyGwYghr4Pjg3oEXL34ey9zyC9tiD2ml5h47dr1LN7S6CMjz/A3PvHh1Z6UyJby5EVgRhKUe7Kz/JU0LfvrJo5f+Y3MPibSuFgQGBgasYSd9l6GDsup0WS/T/9RTp9fXmU2SNwECdQ92E7S57iaMeJnPQLK6ixkDLfjlb7546RfrLkQyNBcC3dsP6oHWMd9G+V3JgwPHh7rnm1/yLQ8CbU9Y33zp0j+nZFUMb/DHmB7+SHGY3LUKAk8cObtD00xlHDrfNge+Z2ozU3c9dvx4Yr5lSL6lR6CtCWvg6OAPw9z538ZhhZRl6XrwhW8du1KX/iNejtwvPQIDR8+vSRqJ/obU7GupjdNdh2gW0ZDypJBFR6BtB2rg2OVtuub9JcmpHIpBoK1xfffLzx4f7C0XL2HNiYDp6bs9z23Ypn1fC1Y/9PCFDc3ZW2lVHIG2JKzTp4Ok7nv/G6Q054MIvda+bNb74pEgKGtwGAdL7pcfAa8vOKEZ2kyjWuLr7uDh+/qvN6o8KWdxEWhLwroyeek/g4zuqwU6kNrhyZcu/UktaSXN8iNwuL9/RuvVXtJ9PbPQ1vhmcP6t9+47u9ByJP/SIdB2hDVw9MJHQFYfrQdCph84evFX68kjaZcPAZJWwjMXRFpJ2zr91tfuvrh8vZCa54NA2xGWrunvmg8QWCJ/N4ir7fCYDxatkOeBB7an501agXbygVdvv9IK/ZQ2FiPQdi9osGbH+zRNf7y4m9Xu9Me7N9nv0HXdr5ZS4psHgXpJC9P/wDRTx0Vn1TxjWG9LGrbaUm/Fi5meSvcrkxf/Cg/ow9XqAUk91v3qHT97r6471dJKfHMi8Oyzgx1Z03t1YAQVT2MwgsC3u+yXHzi0faQ5eyGtqgWBtpOw2Ol9+/TM+sTOn8L08MtzgQCy+tOHXr3jA0JWc6HU/HF5Scssr4jXcYqfP6V/T8iq+ceyWgvbUsKKOn38eJAYyl56TAuCEr2WYei//9Crd/5GlFb81kdASVopSFrerKRlaoZj9HR+700H10+0fg+lB21NWBxe2lhNHsUpDZr27mi4dV379R9+za4/iO7Fbx8ECknLCPTsTDJ17O33bJpqnx6u7J60PWFxeAcCbMV56dJfQKf1bkMLfuGh1+76zMoe9vbuPUnLsb2DtmOe5HSxvXsrvWtLBEhaTx29+Ma27Jx0ShAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQaEsEVoQdVluO3BJ06ptHL34b1XRjp4Ch6Rq24+kmjG4Nwwg+9uA9u/73EjRBqhAEihAoe3xwUQq5WTYEzp0b3ZnV/Ncf6O/9AvY9wlh/6dy3X7ncN512Zw9BVLXjuAP4np44vnQtkZoEgVkEhLBmsWiKqwsXpjbPBOn3gRfenwnc+7GBe+zsjclvonFDS9nA9Iy/u3x9+vAP3735VPk4CRUEFhcBIazFxbfm0k9fHD7k+v4nQFaPQIrx8Gmyx/GJ0J/t7ez7mw0b9MmaC2pQQgh0/ZSm4g5TwueWWtqLt0HuVy4CQljLPPYnB0depTn+b3t+8B4t0AdBUv93h2H9xc6da0aXs2m+r1WQsLRnl7NdUvfKRkAIa5nG//r1oGtsZvjTgev/kqYHF/TA+AXoqv4npJemOEiQU1Eo2l+G0movBK1UBBPU7s9E1+ILAkuNgKwSLjXiqO/khVtvARH8dxDBRkMzPrF/V+9/BlG5y9CUqlXinHv9mRPXtvuus88L9H3JPv2zD2yXExCqAicJBIFWRwAvv3Xqwq0/Pnn+lv/K+ZvfPH3p9p5W75O0fxaBp793ce3AwIDMWmYhafiVgNtwSMsXeHp4eNXJC8Nf0PAdRCiuf/XgrnWUqsqotcvnl9DmRkCdweX4b9N7+m/ih+mbMraLM14yJVwcXItKpT1VRve+ArC3Qqn+3gM7132jKEGZm6tXg86J7OhDfuA/iHwPUpfUZSfu2L59tXxEoQxeyxkEgjKeOnLxHb4RqC+NY5H3+2953d4XlrNN7Vq3ENYij+yZwbG9jpt9GkBPQ5H9zgP9607OVeWp87cOQtn9zwJf+xDMNFfj+jryPqXpxj8c2Nn7P+SXey70lidu4IXzb0DNB4tr9751+HV7zxSHyd1CERDCWiiCc+QPjUCnsaqmZ62O5IN7N/VUNP48ee7mAZDTf4Tt049iUG4Guv4ZfNLos9UIbo7qJWoJEHjy+bP7fNsoOcnW0A0/aacef8PdG28sQTNWTBVCWIs01OfPj66BpfqTmq732UnjgT1bei+Vq4pTv7HM8Ceg2/o1qLQug7T+FaaM3IqTLZdewpoHgYEjV9fphvOj+OShWa5V+CxvZtpzv/LwG/aNl4uXsPoRwI+4uEYjAJ2GmdG8L0FK2mYa+tsrkdXZy+P7x2ZuHdW14P+BLdank9q6Qwd3rf+ckFWjR6Tx5Q2cP58K9Jm3VCIr1ogt48lO237r3//96YofeG18y9q7RFklXITxPXV+5DchKb3ZDMy37Nu5tuxG4R9cHH6b42QfAzlds+3EPXu2rfrBIjRFilwkBIIR7SHoJDurFU89ZOd680Gke6JaWomvjoBIWNUxqivFD87fej0e0n8Fwvr0/t1rnyqX+QfnRz7g+8FX8Rv8vL3auF/IqhxKzR2WCPxXqKeq3krDTdj2ierpJEUtCIgOqxaUakwzNBR0D09yiqePHOjveyOkpxLr9VMXb73V97S/h3nDXx7Y2fdPkAYbncW1IgIDxy5vM7LZt/hgrnLtxyaBrJNxv/72N+6tuNhSLp+EVUZACKsyNnXHvHL+1qcgNf2KbSXu2bt9dcmS9qlzo/fARgcmCtpzB3b1/Vg5QiuslLowENyDWDn8cSjl98PgdBviu03N+rl9/WufLEwr18uDwLdevLTF1YK3xnVZ2HI1bUxrT7z5zTuXdRP78qCyeLUKYTUI25OXbm4JPO00TBj+6I7+db8ZL3ZwMOiYdG4dA1lN9HWte2iuI2NAVPapC8O/CGPR34Ip/AZIbIMo7yX8G9QMbcS09P+2b1vf5XgdrXaPfiYns9oeLLEd8D1/B7Dp0E1jGP042pXQj7RKf546cmGzp+tv1TRf6YQD35/QO3seP3xow5IfC9QqmM23naJ0ny9ysXwgq98BWc0kVhv/Nhalbqe8kd/Fr8MOSEr3zEVWrwyO3I29hl+E9LUHGf+nAXI6sGPdd8uV2YphIKnE5IyL6bLxk7cn3bdkHHefrpvJAExMZ1uBZmqeNzXtfzUzk/m/ens7LjV7Px+8d9e1579/44l0duZtge+Np5zEEw8c2pBu9na3YvtEwmrAqNE8IZvNHsep5//yjl3r/0O8yFOXbv0QCO05gP0JGIL+fjw+uj91YeRh/Dp/PtCDM7Zpfmjvjt6Xo7hW9ycmJjaYduf7Hdf/8HTGfa3rG9rYxLSWnsloPg7fijZV8oFM2Ja2a9t6EJd7bCztvHP7us4rrdD/r3/7ct9I99jEI4cOiQ3dIg2YEFYDgOUJDFj1e8TqX7cT4kImXuQr5279A4DeBEX8ayvprU4N3rovcALot/TH13T0fXDTJn0qXk4r3k9OTm4y7a6PzjjORzOOvn1kbEqbnEprPhRzwAKzwFLHk05hv6Yd6N+o3R6beG50aPSdr3qV6IJKkVp5ITIlXOCYn4Yexr0w/DO6YXymHFlR0e5r7tsM3fxgJbI6fW1ivTeT+SsYmr54cFff+5Cu5X+hb94Merp6/J/PusGvTE6724eGJ7RpSFOkKPCUZvBPBccoHBet3Rwe13rX9tw/PjXzZ5hKvr8SfhWKkeA2REAIa4GD6p0feRdWBnvxjv2PckVhVfBf4A29uG/X2i+Ui2eYn8n8NryuDr3jPfWSFV5k44UT137eshIP2K7/64cObbheqZ6lCp+Ydt8TBO7vTM5od1+/NR4SFVhoLpKKt410lnE8LTMzo3V2dLznxLkhYgQ9obiVjEDln7mVjEodfYcpw+MAsftg/7qSDbAnb97sCSb0Yei2fqOcbovVqKNnNO8HmAE9Cv3Wp+uoWjt27HpXNqH9WTKR+kBHKqEFbvo5y3N/avfu4g23R45f3WGa1k9ZicTd0zPTf/f6O7f8dT311Jp2fHzmgJlI/N70jPPe4bEZ6Kg4qw0lqlrLiNKBiLWerpTW25PUbkPXZViW62ecHz+4d8PXojTirzwEyhq8rTwYFtRjvpX/rlwJ+iSXugPbMuyKBOHo3geRJtuT7PujcmVUCuPJlhnL/9NUqvMD2eyM5sxMaIlE4n7XML907tyNjcxHQjty4sZv66Z1xEok/xNW5n4uZSf+8sT5m++vVO58wkEu5sR09pd9w/rWyET2vReujiqygrSopn/zKZN5qMeirotKeTyolm7p/+X06Wvr51ue5Gt9BISwFjiGsLl6N6SrvylXDNTK70D4mX071pwtF88w6Jd/DG/1E1u26NOV0pQL71y3/8PJVOcHMzPTWkcCH2YGOaTTaS2RTN6f1fQvvvDK1bdnbO2JZCr1SeRfn05Pa1PTU0gXJBKW+ecnzlxvCGndhFQ1NRP8bcY1/vjS9bF1V26MwHwsVKiXa3etYVw1TNhYJ3TDjQCO42jJVMcez7J+t9YyJF37ISCEtahjGjxkGDr2DJZ31D8h5vUQJL5RPkXlUMM07u3qSGidICvkzzuSlmlZb0olrK9hD9v9JCrPC196JoPMAolFg6CV+PPj54YeyWecx8Vk2v1Q0rSfhFT18LnBmzBRyNalp5qrSuq7kiAsh4SFa7oZ9M0wzI+cPHOjZPo9V1kS1z4ICGEt4lhiCvZrSa2jol7qzPXJPk6nIGbVbWfUvcr7hO9MP97ZVXpggOu6ajplYStj7l1XvbRMXbPAbp6HzSSBlkraNknrvfVCcPt2sHYi7f3pTDb47KUbYxuvKqkKpYBXKBnV869c3WgbDEixAck0FGFFfEzJzbIsO9C1TyrcymWWsLZGIHoW2rqTzdo5dXyykz0NC8l779i5vu4zwM+eHVntGP5jqVTq/6AkVc5NZ3wNH2lVxNWZNIukMSjiNd9z0+CHp5DXAdX4SAg203w8GB5IATtODHzdK8C15kEjhXvNS9rWA11dnfcMDY9prscss48RySakrOLWqODCoIKAgkuVgsS0urtD60haeV1YYVbbtjUn6/74HXvW/11huFy3PwKzT1r797Upe3jq4sib9u9Y+wxe+vh7W1N7jx49v6ZzbffnQD4/Cj1Pfjx54XiBls6GVuTUc9mQsOIO9mPQFdkIRlz4fy5JLm2ZMOqTcJaXIqpcqnixVe+rdbZ3dbc2OT0D0wZIibHSksmklslknvx+//q3PiKnXcTQae/b+LPQ3r1t0969cOL6G7o6E09qgZegdMJBpVQ1DbKCpyUt6oPKz/4NEJalCAuZFIuEVBJd+jgLh4rvAiFqUVGkhJZMWFp3Z0obGSu/d5gSnWmavuO6h+/cvYHSobgVgoAYjrb4QPMUiGtj1/79jBMkLBwiTlMASlYzTkhWCJyTrGAyMOFkst/BoYMmuIIyGJYcMXMMdNwHPhYN1qWS1t6ZLGaKZL8yzFXTr15BooLLMugHMBRNKgW+It8y9TEcJGt4rvcRFCCEVQbFdg0Swmrxkb0+cf2XOzq73kgdFieEXF2jdEUJKQH6SVWQrNjtZDKlpTPp38U58iUbthk/Ph7sN6zg/xudSGvD4xkq6otcnnjyF0XRRTflkyC0IIJE1JG0QbqGNpMNp5xFhRTcZDNoj66988SFm5vv3LX+WkGUXLYxAuXnCW3c4XbqGs9hwjv+a9lsuN+ahOJSCoLjNDAFvVUll0p1aNPp6adTweSflEszPO48oFn+4yOTmR+6enOshKyYhzWpf/jDuuf6x2aV/qNRaPG/1d0gUXWCA0uu7GhMmkqmerEc8KOVU0lMuyFQ+Ylut562YX9Sncmf7Ojo3BDZWbGLtMkiUVXSWTFNuMqWuYG530f7+/tnGFboxsfdd9mm8XdDo9O7rg6NFq0CFqZr5DWlK9qV0fZqGvZchSuPlevB2VmG/hOV4yWm3RAQwmrhEcW64qu4ykfJho52Vp3J8quBYQooqWDKADftBd6HD+5efyoKj/zR8ew/hWXY56/cnFh7a3RCTTGjuMX0SVB9qzu1qfQM+jO3dBW1g6uVSHv/qVNX10Vh4rc3AkJYLTy+WA/8ou9kJjo7bOh+DLVFZ64TEbCyBktxI5PJZj56R//Gx+NdH5vM4vuI+p8NXh9LjU1iw3EZhXc8TyPuuV9wDaaCfBjTM06N0hVWQmHBDzvSDZ5tvqYR7ZAymh8BIazmH6OKLbzv0KZvJEz3ZzEFnEolaEtV2XEaCLKadrIz//TQnk1/EU85NuH8th8Yf4j9gMZUOrNkZEVZCnsbtTU9KW18GqcKFyjh420sd2+j33pg3F8uTsLaDwEhrBYf04O7N/2t7/o/C2FoGnsIy/YGlvAwSfCvZzLOe+8oR1ZT3u/5uvHJC9dGtJlMrfqjslXVHwjpat2aLi2rjFFLjUSrFUjlO0juddXSSXx7ICCE1QbjiHO0/hofbPgwpnDTOR2V6hWNQqGUx34890noet5yaO+Gko3Y45PO7/uB/lvnrwxrWdha1absbgxo1FWtwplXqYSJY5Nn5lU3bLHQmGA/yko0plVSSjMjIITVzKNTR9sO7dv8RSeb/T9BWmMkKv4D+YzBXuljV7yxd+zfte6VeHGKrHTz4+cv38JWmyUmKzSGG5z7VndoE7kz3uPtq+Welvhwm39weVjOyaoFsBZPI4TV4gNY2Pw79mz8KyebeRIH+VEZTaX0sf27+v794TKmCxNTzr/2NOPj5wZBVjjdYSklq6jN69dyKuhqmWztivYob+RTSkPbe/xMdlMUJn77IiCE1W5jq+s4dYEO6mzsYAmvi/+CrH7LDYxPcBq4HGTFVcG1ULLT5orS1ULIkoSFI2cMHKG8obiXcteOCAhhtdmo6gaOh4EWWlkyYU9gvHswXfgV19d/7+LVkSWfBrItJJhObL/p7elQR8fUZnEV70XxPc01sM+xrzhU7toRgZIHuh07uZL6xA3LBaYB+Ar8rBsfz34YX1j+D5eu317QNGy2xPquSE4mDuXb2IujY2AgytNE67RiKFshzuwCR5s9ZSMlsK0QEMJqq+GkBKOF5yFzRoidK5BoFCeMjM/8mG+a//Xy0Li55KYLBRiTrGjwOQ1br4VMBQuKVJeQKVPxMLlvPwSEsNpsTEECmBLSgbHUpwD1YGwse59l2p+9fmuig4fiNZIowrqq/6Xeqm9Vh9JbjcOKvqFtACX7gV8kTVZvkaRoRQSEsFpx1OZoM2iKxxuHLtDcsZlgLzYZfv7m7XSv+r7fIm234XSP/8o5ktWqzqSyZr89PoXPYDTYkZvziw0NLluKayoEyq4iNVULpTF1IaDjHHZmoAW4aep9geN8fiLt998cGYdtVp7K6iqzXGJFUCAi7jdkuapsBJKcPBwgyP8YRyV7B04Q3dDbpY3jg6gupoMNla5U41BbUN9n0sr1ScKaHwEhrOYfo7paCAW0WiWknihhW/0Tabf/6tDtxpIVSIhGnz1dSXUkDL8fSHKi4/lWPId9Kp3Vxqegp8J/m9f14D6DQ/nmb281FwgkZ1Dj7bnSSFx7ICCE1R7jmO8FJJr8jCvjeNrIxFjDJBpKVaSlXhwDw384MyucBoLAGEfHI5ptO6n1YAq4FjorH9IWjUOnFlF3pj62aui3whbI33ZGQAir/UY3XCVEvzgdw/8NcSyGUhSlpVWQrFg2p39xp0JYLyIohaXxdZ2FGofG6yi85/QS32F0Asu8URgu1+2JgCjd22xcsVElPC85169Gaa1YTkRWJKpSqooBiQQzONvq9sRULKKxtzzAEJw1api2EFZjoW3K0oSwmnJY5tcoSD09HanEDztubnfO/IopyUWC6sUmZUpW5aSqkgwgK04DxxaZrFivacCaIdAuH9zaM1rSDgloOwSEsNpoSMenvU93dXb+EE5taFivKElRqd67qrNmsqIF+yjMF/i56MV2JqadYKxXMDXM6+4Wu04pf/kQEMJaPuwbWvPticwj4Il/NnTrdl7JrqaDC5wTUle1GmdWWVCw1+JotjA6PgnThsIdQrXknF8arkJi/+R355dbcrUaArU9ha3WqxXW3tHR9C5dN//T9eEJ3aGdUwP7T0V7F86Mr0VW4mF6o2NTS/ilaB2HDmb8wA2+08AuS1FNjIAQVhMPTi1NgwRkGKbxRxMz3uaJSRzVUkumOtLwo6Zc7aOkVdEhynN9NQ1cyuNqeEqD67mX9TXGyxXbJhFthYAQVosP58S0909czfqJqzdGODVqaG/IUbCWr2p0yukfp4FUtDfeir1yl8IPUGjPHFy/fqJyKolpJwSEsFp4NEfT6Z3YBvOp8MvMc0hAi9hHNQ1cBrJil5TUZxhfXsTuSdFNhoAQVpMNSD3NMTzzU1PZYAM/ProYkg3UV5rHT8lXmA7SwnwEq4FLLVkRI04HM+n0LdvzvlEPZpK2tREQwmrR8ZucCd7hePr7rw2N5PfxLUZXON1zHKz4kb0KnIttP6Njk8tyaimbwXPrsW/yq3v3bhoqaJZctjkCQlgtOMCYCnU4GedTI+NpQ32XbxH7QOmKG5nzdIWZJz8HNkKygqI9TmSL2JSiovGVn0A39c8WBcpN2yMghNWCQ4zPc0HRbr6GEs6chJFnmfl3knZO4/hmII1B6fiFG9br0s6qAeXPp2WUrhzHeXH/jr6n5pNf8rQuAkJYLTZ2kK7Wul7w6zeGx9DyUsZovOodOizosTg1TM9k1Wogpa7lIisOF+w48E/7E5B1Y/cgtdizsBKbK6c1tNioT6X9n3MDcyePOo7OoJqrC6S0+ZIYV+GSOHxvc18PJCxXG4ed13I727axqTp9yk9rX1jutkj9S4+ASFhLj/m8axwdDdbgELxfGsLpoZyqVXPVU1QugVJUV0dC27p+FaaBWWxknq6ceAljTNMiAf/BoUMbJpewWqmqSRAQCatJBqKWZpgJ731Zx9pJM4aK0hXe5vlKVFEbKFlxs3PvqpSSqpbzKztRm+gnEkktnU6/2GFMfa4wXK5XDgJCWC0y1iAR6/Z49iOjY7C5qkG6mk+3SFQGlEP8FFdnygrNFqBsn1OxP5+K5pGHbcBhqhT8fqu/v39mHkVIljZAQAirRQYx7Wj3Zj3tddQjVVJ4l50CMjHe8mqOTJCCvmoTyIrENXx7Uinbm4Gs2PZUqkObnp76i0N7N36tWl8kvn0RaGnCGhgILKPn3B3+xKVXDh8+nPseX3sOlpt13+P4uonv71WeDqLr1ampFB8S1JrulNaHc9rTMxltcpofOeWns0rTLkeIZUHRnpm5YibMf7kc9UudzYNAyyrd8ZLpWvfgQT8w+oyevXeo++bBtaEtQd9s1/ffRsV3I6eDJCp+nourgH04UZQnhIYfWm1o8xdUGCU8/E/bil89sH3dlQUVJplbHoGWJaxnXri2HTvd1nEEcCBS3z++MLi75UejQgcmJjL92ax/gNJPo6QekhVXAbdvXI3D+XQ1Bcxiu02zTAEjKFIdHTQS/S8Hd2/4YhQm/spFoCUJ6+mnL651gkwRQRmBt33gO+c3teNQYin/oG6aKX5rcKEukqqoWN+Ij5vy81v8UATDG0WGC21jlJ96K6wKPpWd8H8jChN/ZSPQcoR1+vTppJPS7iw3bIZl7n/++eFV5eJaOczX9Z2YvM1LPxWpocBHKv8qHHdMqSphGUqqahaThfj40ITBcbLnsDj6oXvu2bS4n96JVy73TYtASxHWo48GxrUx+5Cu+XY5RH3PMzLGxF0ktXLxrRoGNVPPfNtOolIrgElLGYH2wbZqcipdIFVFlDbfGhqfj9bskCaHHS/7gTt3r73Y+BqkxFZFoKUI6/C7Lu/Bl1jmlKB8PUhcHjHufuyxx/g5lbZw+BL7bX4EoiZqyS0T0uM0j1+82QSl+ua+bhxj7GjD2LicwWkLzaarigbKsmDJ7gcTmezMBw/t3ixntUfAiK8QaBmzhq8/f26j77pbaxo3w+jetPf1B5D2RE3pmzyR4/nH+Mti4Wx1dUrCHO0lSVGqskFUnakkpn6mhu086jgYHkWTW3Wbo4Tli6L5gqYHE47vfeDufVv+YflaIjU3KwItIWEdO3a9Szc0ElDNDqcLbHjmxas7a87QxAnX9ljfxcr+Mzs29ykpi1O8iJjoR/cm5o7dnUl89LRLW93dyWmVIip+Kp7pmlWqIvQ8Mga9Gslm3Efu3LX+K008HNK0ZUSgplnGMrZPGxgYsIKeXa/TA61jPu0w0+7xBx/cd3M+eZspD0wbDgWm+RXP13cODY/jWGKuGAb48jG+agNpilbqlKZoWDqDY2AyjtNUlupzYZlKpXgaxIVMNv0zd+/d+uxcaSVuZSPQ/IT13TN34QRvZW81n6HSDdMLUqmjh9tgd//Fi8OHEl3JL3Z2dh3MzGA7XU664llVWRz/QhLjNYmsmaWp/DjCjqIDdlaZTOZZ1/A+fGj7hjP5OLkQBMog0NSE9cSRszuswNhdpt31BRnazM3U9IuPHDrUuG+419eChqU+cvzqjp7u5P9KJpMPpqc51Zv9QntLkFQBEqZluVCw/7nhaP9i376+8YIouRQEyiLQtIQ1cPT8GjOw7vE8tyFtxBrb2MBXdh579FF99g0vC0nzB548ebNHT2l/aFmJj1BPBYyav9EFLaQ+jdPAVNL8/pZ13a8qiJLLOhAAjvrTRy/d0enbF+69d0tzHFhWR/vnk7Rple6mp+9uFFkRGF8LVj/08IUN8wGp2fIcPLh+4sCu9R+F3ucj0MLf4vaVVnChqYWmdaQS2jpY2vd0djh86Vqh7c3Yxm8dudTPxaW0lrn7yJEjZW0Tm7HdC2lT0xKW1xecgHE3FDWNcb7uDh6+r/96Y0prjlIO7ur7TOD5b3ayzt9ylY0Gl83qKFXZsCXrXdOlrV3djf2LBr556JOshLDmMWhPPXV6vav5O5jVxYLUhNl3iIbV8yiqpbI0bQcP85C2Xu0l3dczC0XUN4Pzb71339mFltOM+Q/0rzu5f2fvu1zH+QDOt3uZ0pbVRMRFouJK5qqeTkhVqyBdtdUmhGV5JI4cudrpd5kHiyp3tTU/8s6r+4rC2vCmaQmLWJO0Ep65INJK2tbpt75298U2HLuiLh3oX/95L+0/kHUyvwTieiUJHVEimVzy1UKeWMqv2pCoKEVFRNXT1aHawnBx80eAZj7TwcxdAc5Gi5fiaNnNT37nCk4xaV/X1IRF2B94YHt63qQVaCcfePX2K+07fMU9U7qtHev+xE/7r3cc70O+6w1gxuV0dHZiusgvJS/O7IskRXLs6KCxqj+B26t9a3uUREWi4plbQlTFYzXvu+7tB3EIUGel/L6e3TNw5NS8zYAqldss4YvzBC9C7559drAja3qvDoyg6pwCP+KBZaVOPPjazS1vMLpQKE9fuPnawDB+EqehPwzWuAuSl8LPg90WVxhJJPWQCUmPBAWTBEz1TFUGpqO3wYYvIPgr2az35a2b1/50V6f1e1NTlVcvEzB0xRekj67usu5FmS2/crvQcaol/zeeObfTSOj91dIq28PxiaOHDx9quy8LtQxhcZBqIS0Dhkl2l/3yA4e2j1Qb2JUUD1Iyz1waOQib0vsxKXsAFvH3wMB0JySwtZC+DBPTN5BOCEnhrI1BuKe9l6tIzsVCiD6E0DOabrwI2elZ09aP7N3aNxjheXvK+a1OENa0EFYEyYL9rz072Ju03ZpNQKj7Xd899cKhNrA9LASvZTY/s9GcHoK0XsrakLS8UklLxyl+/rj+/Qfu2367sJNyTS7SuZfneO7ffweBGScu3NwAqWgrTvTc5jjBZmw87tMCfRXYKQWOgula4OiBOQUZ7DZuhrAGdQXxV0zPuCaGnkv3VPGHOpPw7+QPR62OM5HhdNddGOeX2kmCbSnC4mDlSStVTFr4eLljdHV+702vWz9R66Cu5HS5h5hmHvz3QiOxwJTRo2BGgY06dm7OVhewYGAY6s75oD+ZDs4JPY9JyqSCQ7ABqftd5VFM3/j2Ja4mtsWpJQSq6ZXu5UZTKeJnsHpohiYPRqBn04nkS2+CQWW59BK2dAjwS0Y4IHDz2ERWG8Gnwm7iK9W3sFmbvrqGPzw6gW8eTmvTM07XmTPX28KYd7EQ3rjnvv1QFHbPt3zT9DcMPHd+13zzN1s+/hC2rKOo7NjeQdsxT5LEWrYjbdLw05eHtwWe9jl0542u62HZHZIVpalY/yIlP5X3MHYddLLZfy4fmYiBhNuB509vw+rG3tKY+kOwGHLi7W/cS91jS7v4s9TSnZHGLx8CICH9lXNDX+zpWfXuycnaBV2e3e567nAm4973qv0bzy1fD5qr5oEB7KXt0u7B3Loh7yhWVfypbOalh9+wr6U3mbfklLC5Hi1pDRE4ef7Wj+EEiZ+amqpvJT2bzWjJRLIPR3n9riA5i4DZg720DSIrlsrvHXSZ9p7ZGlrzSgirNcetqVp9/vz5FJTqj6JRejTdq6eBMzNpHP9s//QrF4bvrydfO6f1JrCX1mvcXlo98Kembjotr3wXwmrnp36J+pYNeh5JdqRem83O77gxkpxtW3bgOZ/g1HKJmt3U1Rw+3D+zrc89aunagnWzpq6PdxujLz388L4F78tdbtCEsJZ7BFq8/sHBoMPX/I9hyrGgnuDUUZzrnnz7yQu3HlxQQW2Ued++fZmJ1e5LoPB5k5ZpWCPXz+08du+99zrtAI0QVjuM4jL2YcIZeh+2+9wF49MFtYJSlgmHE0g/JlLWLJQPg7RmhtyXsJ18eja0tivsXhj6xy9ve/mRR5TRcG2ZmjyViN9NPkDN3Dz1FW5z9XM4i+s1ME1YcFNpUIrVLHzJzHnwjl0bn1twgW1UwPHjxxPXpztejR0HFTc+F3YXRwxdfdM9W08D0zrs4wtLaM5rkbCac1xaolWOvurhZIPIih0OdVm2haNTfqUlAFjCRnJP4HBn+iUqz6tVa2nGpTe/etsP2o2s2G8hrGqjL/FlEQC5GHghfplSUSMdvwaEA/9+4vjpa3c2stx2KIsfUek2dr+EuXNF2xEjSJx98w/tbFt7NiGsdniSl6EPp84O3W/Z1oPzXRms1GRKWdCJdeCIlJ+vlGYlh997r+70+EPH8NHJEtLCauCph+7bmj81ox1xEsJqx1Fdij4Zxi9AT2KSYBrtslgxhOD2gWOyz7AstFzx6zFHj1mGobYUYAgC9cHge3ddK5uhjQKFsNpoMJeqK6+8cm0X6noXiWUxHA8WxAdWNyQM45HFKL8dyiRpueM7jllmMGpnjO+1w9fNaxmXxiogaqlR0jQdAkeOBPjczrnOiQ6jw88ESSOA6KT7iQzOHEvavu1pZsLQg4QPP/DdZG9Xx/vWrOr+mfR03SvtNffdxleAQIgvTzjBT0w409Mpu2faufZy+vDhw5WPMa25dEnYqggIYbXqyNXY7i/jCyvdfmaVb5hdVsLp9LJGp43j1/1A7/RdvdMwPRzEboRnLVHe9vEvL3eXBOB4ZMta22H+TiqV2LJQ26u5u6Bju44Z3J7O/Lvp6cwPmBanOwQ4uNHRTWMK21bSvh1Mm642nTWCtKkH07rnTE72aOO0XZq7bIltVQSEsFp15HLthg5J/+aJE12m3tVjOPYq1/dW4cTjHnwMYhXOce8xDd3y/PJW6OpMdsTRVy4iK/rKMR/jwvz825VIHFzT3fkx13UW/dnhRy3GJyeeHEs7n1XNibUPFvY6vtGDw5vV9w0Vofn81qGhZfDhi3HX8SfQ/3HPMse9CWcCX0gel2OIFJIt+2fRH7qWRaYJG85NxldGzV4tGayFSLQ24+q9ULyu9gJfMU5ELTn6wUISTl03NHz1KzyiJLqmX657OLLdSJgoXTO7cBxyN172blier4YCvBsFdSNXV2dC35tKJrbzfPfFdjwvC/qs9MSMxxNRsSqmT6LhUDQHE+jUBE7UnATXTuLsrRn01K2l/x6+qItiR3TNG8V59KNB0DGSfNXGUXwJY2Gm+osNhpSvEBDCasIHgVLTt75/aQ0MnXpBNb2QgNYEntfr4wu/nBYpKQLtxtdwAh0SBX3VDe7nM/Ha5vf1Fb/CURS2bCTAWWuxR229qRsbQQQbUed61LfW14JVKKsTJ5sk8WUcHbtlNANyTOhgcmAGKH7p3m1FWpqtuZCu+LByVdKHVMjpKEQrBwIW9tnpXOIH+QTDSH/D9f0bmCLewDn1I4HmwtAypPDZ/oe9oXKf/aMPsWxSs/RR13FHrURiZE1gDR86tKHEdCDMKX+XCwEhrOVCvqBeHNaW6ui11/mWDtLQ1kEiWodXE4rwYgepAPssTPCMOjIdAk94TZ8pMZjch8HjDorGFUTUAwlkh64be0A9/ZCatiDZWtOyE7ClQmIdJICJFYhA+TRV4Fo5/QIHiUvrTEbkVRCxiJfsSBbfYk87OTExXxdazY5yUgiRKfpHQ1YSkONmAZY+gV4NIeVFfCXoLNA5h/Plb5LzWAyzF+IVXdNnvO/6GcsyhjC1vmWZ7s2pO3fdOqzriy9asnJxZREoerDLppDAhiIAEtCfO3F5rW0a6z1PX4/nf53nG5RqqrpieSnULEVh8cx4E7ugH78H8tG9eP/24oVezY+pkpA8b/abhPF8le75BqdsXUtaFeaTlTI2IByEoU1l8oq1mkokcZHElIRoWmpejMMCMyCvQXyy7JjjuUcgOl4tLCzCMpTHgFpcgkViX/dH/ax2Szf8m2Yqc/MN+1r7BM/C/rfCtRDWEozSkbMjq7NTY5t13dqE6dhG3wsSqlp+C9DDi0ifLrqmT1f6BgUaPjiHN0lJAGAfvpWcI4XjiHIMF6ocO/EjmMa9HeelQ1LT1PRpoce/sJwOTCQtc+kfGQp6Uxl+9JWtmL+jNEaJ0gKBgbsygR58B4sHfwV5aliVWg3vCHv6ymHcdG868IzrVsK6pnd71+/dsmXxbD3m3/W2ybn0T1/bQFe5I8euX+9ybuqbXMPbDA7ZCKV4uMOecyz+9OfmWvj9x9zEw6JW+JuOX298WhE6qtwLEV3TL1tb/AWj7sqwfqaro/sdmcyM+vBp2XzzDEzaBiQsNH+e+eeTjQ+ohwqnG0BYhfVzNYKrkOmpyauYYH8KvD8G6RPBszrC6Jq+ystl0ghzXEZjR5+O4+iZwTh+eG7Yqa5rq/3hGzzTSkXKn4YgIITVABjBP+ZzP7i8ydasrZCetuCHvIvFRs92SEdlpnCYE2LOQi12OA7RNf1yjrphHIyE9yOXPnfNMDg70DpdTf8DWDKs5rRvMVwChAWrUgh21HzllD0NrigqlxKVC7bKQuOOWeGiuI7OTkhb6T8C/Xw3xkel9cXxj6eIxiY3Hhx3X9dHsWJwDaa3l1+zd9Mt/F4tUk/ijWnP+/DBb8++LWqvnh0c7NDGta0pO7kl6zpb8AJzEUr91kYEFdeBRCt69Nm4+AsSl6jwjVGckY6VwPwUpLhLURx9xliWvxFHi/w+zB0SWCnLsVpxnoXesSI2ngp4zmRJXPgf/0IleGH51R6uwjeX5MR76qtITh7+8N9Cp4GF7Sm8Zl1s35pVXVomm/5c1vG+Wm284njHJeJq44/FjixUAld8w7uijW6+xo3MhW2S6+oIVHumqpewglJ87+LFtcFUcqur+1vxwPcZJqYPMOyhXw6GKI4+4/GwQpjCBhe+6XDIpFb06PM+np5hhS5eXzw9bLJ2pBLGv4Fe36BU4kA6IQGw8MUY6MJywVeqDs54Z69zrWdY7jI3G1ZtUiSV6zzDI3IqLLew/wu9jspl+yywrA1pEed5QceXPT3jBb/DLrA5ua5UHZ/4eMTbFx+fwvE3DJO8fANrjlctL7giJhRx9MrfR89R+VgJ1Y6currONuwd0FNsxwtV02mPlWGLy1TxlPHf6Hh8PH9xesvw9yRM+5PIRT2ZIgVKKZxWUY/PT8aTFPji0i3m4Ed1hDWV/7uY9bNGtiGqAyorJRWSqCgdkrQiR5KddrwPlsq8xfhG6efvx8dvtiQczDdmmPaldDBxSVYeZ3GJXxUMWzxq5d4fPz7Ym7X1HTAL2A7NqtJHEQ3qtCPjw3LoxB/v+OMZ5VVzR5aHWRuErYA+y4uu6fM+Xl9J/lh7bFvbY+vmv0bWos9tsXAWSLIiaSnyApHxJz6SbFSFuXTw8i86r5vVRW1m+6IHmUREAuI0lcREP5q2ztWPrO9/YK54xsXHI56+cePvj3qBfimZNS+J5FWMcrjptThsRd4dPX9+DcwEd5iQphwozfkCwJKaLv9ewHYKeicfSudwShcnJDBBOD3MTwGRO0cqLIj73jQTaejDBYaPHTBgJ/i5+HyYijd95sFhRzkzB7yL2IrCtGwezj9nOQVTUlfPwiicifnu5J0qHHd8mXHIG6ZD7JQqIk9kJK6QwAokMWRUhMaSeJ0vcfaiXNhs7PyuwpYV51Vh+EM/Pu2M9GckpyiOuZm2Wvtom+Y4me8xPbvIIujzPu6Wbvyt1ejL3U7Sv/v754ZHsORwaX3KGdwiJhO5pzY+Mivk/urVq52jTnIXlEc78LKu8qAMx/G8kHhyOicosz0ovM3IrIDKb15HSvDoOoqv+hMLYCOWI8ash0vmufryZVcqLz4u8fym3ov1xT/EVp4UDUTn4/iS0xW+sZTMojASmLqGp64iH4FRXJQ2TKj+lv7JVRTVxwQkm9APyaboGnGMzSVR6VR87ipsVT645ovOzi5tamb6zzB1/nqzjz+s9YetwLioZW5C8jq08K9+1IxS8yQsfF6ap1WL2BK8VOaJc6NbPcPrx7wJ++hmHQUPvOaQgMJ3ETtVlERDP0wVsQ19uPgcLQyt/Dc+p4jlL6k/1xa2qVyh5ApEzEoErm/DsPOTXV3de6anq36roFyRdYWVbVSshHJEMt98saIXfIu9koplYZL6m/hUz7kS/Jt0/PE8+Jj6X/Y6k+fv2tA1BKIvB/OC8WnGAmp5dpqx3XW36fjgYK/upXbhFd+BrRlqn16MfkrspkoC4hnirYjbUVWzs4rHx8uL3cerjwt0TA4RcBcsuX8Rn97q54okVsCKJJ9YkSvy1gJR4aOtnAr6OJP+L13d+BKBKMEzHhAfgDh6yzD+vqHjTDDvYpAxLqwEfVdbE9bpIEi6V27tdLP+LnzPrWS/XrRTnz5d4e79+LNY7r4kP+Z7Jv7z1LyPL0B4Tb+ci9cXLy+eJ54e8Rw//rqqcUR+HOrgYVprJbBl5E2w63oI64J7k8mUDZLGhmAXs19ucVkxP8gKQu4ptCxbMy2TW3KAGI4u1P207ztH3CDx/7bL+Cdse8h1Zy5ev7Dp8uHD7blJuy0J69TV8XW6l92Dl3cbLG6g98idbhDgdANcY1ZY9o2N4mpNr96GRf1Da3Wui0RW69F1bWslvp81LD2xDTOGu9DhQzBc7AcYfYlkAqo6A6ozqHNBYJTESGitTGShsp0qQSxT4AcoPJQw0LBlEPhBFakHDjoLvY+XgVIyg7WK77tG8n9pvpHXBbXL+OMBd7FN6KLu+uf27esbX9RHdIkLbxvCGhgYsDb3v2a7obt7YHakpKmYiqgE2ioqJbzIOszXcSov/DAzRRNehyJKvPx4+igv/ZLKEaCkoZxUFMYXE1I8f7Xyq/UHp9CkAlfbCF3NdlhS7IQguA0N2wiJYy1ktC5IISb1Okr5jSYruy2SGlYkIkKLSC3yy/WrUWGzSnjaTUX/QEhYQuNewLCdwBFKRkpOuAfr4sBnwwfDg6B0MHagORhBHNqHw5WxTwYav6lAt/42MBLfrYZXHO9w3Ftr/B0Hp0pY+tkD29ddAz5ln8NGjddSlNPyhHV8aKjbzAS7Dd3egRcvgRHJWyrHASw9Pyp+vlSxEluH0jWAGQF9VVZMpxHVRZ/xSKQU4PR5Xy0+/sLQZCFS9DN/XKtSeh5WrL2x+sMyZv+W67+vwz5eC7oDx12rm9pakNg639B68XL3Qh+2Bm94DySxHhg0daBHSQhiCbyyyMS9SDi8RhEHyYP1qD9qak0S4VGn5VYrSTRKEkKHWYYiHuQmCYb/YKYLqS+3H5LYckxJmz6qhSYJ5yNgzgtuclESpncBfN8Fj3lgJdCSGpHcGECoxrouMoHjzO+4evLLMB1VKxJV8Wyj8Q80Ix043jnTu32hlTdkh08Yn7UWcnio9Qs3pzZm0lN7LCOxIdIZxbuQ1+lAVFFxJB7aMeUIiPkiPRPjo2v6dPF4FVjHnxi/oQK0Az/bymf5uI7ayGLj6eM63nrbF5VNXzV7nv3HViQL3JAEaSV1z0iBNJIgJBCYkSKJYbdjEiSHw7a0BI5s6QBBbINUswMUsQ6E11UojZGccA9dcZDBdQY+TgyFTgkiEKYyIBvstAQzIRk8cBJ+A2j4gZFDFWAqjAp3V5IhQYYwwUJ57ByS0QINzMYK8FyrRxt3KNbXb2qG/UVNT5wDyCt6/A0boGbdqzPA4tD21SPquWihPy1FWHjQzYs3xnZkM95ePIZd8RccBx1xez/UPowp46I4+uVcLD9/8Plq0Gfy6Jp+uez5uqPyY+UtNN5DuVQc06drpv4bIDXsjtsMpdkOSC79QK4Xog3PzwF4IBNCBiIhpBSpoE8jioqWaM2KCRuOqwLXgIQItKIe0lCYD/lZjoqgGIo0+J++SsmMKA8eqQ21qHuUh2PfzQHN6vgG6vVK8GfmQhcbr3Yff+AEi3rtdCtNF8u/eIWD2ATXx4Mg0XH1Vr/hm7sDQw8PvyvTrriKWocEE0C6oM/kJRJHrAykgj6WGlq+JUifu6YfS6pu4/UVa6AgQcXKi78ApekhcWFBwMstEkTX9MvVHw+Lt2ex+4+Pg62CxgsHEwZbAdgWIJfA+ICkfDRYtyAwWWB7Ay8F8VT/KB0bOJ4Gx/CQfUKSwZGrJJs8iZHYgB0zMB+zk8hopQ8hEcEog2ERASIBAOL5fIrVIKLxXKtzKPZLgZUckvGf+/nH5HsK0+Uz3316zeAjj3D23Lwu90w0ZwNpiZ72UnvwfO/AXIFnXfLBxLOsHn6yiLqmr3oQ04LHX9hq6TFHI6txrlYWkHj98UT1lh8vryR/rIKq6aO204drdP8hRWF3itmLUw42QnW1CSTSA2IAIXkWOBYKLWw8wjVqNkEaFqjFwLQNJhWI4ZiFoiq6QX0SbsEo6HMoWVFCYprwjw6FP65BXCSoXJwiOwpnFK9A6yiWkQhRDwA9XAfpwLS/AqnqSKP7jwapquiznXFXMn6x8Yg/X/HySvLHKqiaPlZfvf0H6BloAM/v3tpzHkJwUx59Uxb4GE5Lfnt2ZGS16SX3+F5mq4llfegtwnaSR6J5EC8hPUV6IDaS6aDnoZ5DpYe6AtdgOr4pyhXLNPH0KKCo/DDP7N+S+mI6qHzbQr7AbdgW+iylWn0l5cf6E29ftfSN6L9lGl04x30tOtMHklmLhxpClW9BL4S1T+i2uNPRp+0FflD0AN9A9LHnmHGBBfJCE3QL9ALiguoJqiu+64gDzWGIIAlhzhaSDsMV/yjJi3BxyY9khP9BXBSzEMY/AFORGMmM1yyKZfmm+ZKuJf4uMHV1THEj+o+S864E7zYd/8Dliqp2MamvPbt9uw4dY/M4DnXTuMuXx/scK9iHLcbryzfKwvOJBSGNPl10Tb8WV0xYyMFymDdXXv46Kq+ueChJQI4WlSUqf8StOf5CNdXqr9afxe8/Gm6AoLAqGKyCGLSG350ACFzKM2FvaeOseEhFOsjItdQ2S6wYYmkOdl2+CfLBvmpIV55vYY2Qn6uAxAWC40zbhxSmWArcQj0TSIiSU37mx0kgVesgLereOSz8E5EWJa6Qzyh1hZEcO7xY4Ct9WLfNvwa+5xA2h6uGP6vMPxMsZ8WNf0Gf+cOCw9usq51a5+kNG9Sn1IjJsjoO0LI7EpVra/vxhPdFs7JyjYriohlbTAKGxO1C6oJEljseOLqmTxfPX66OucJK66OUNzuDjK7p05UIbGwX25I/vrj4BYrnD0uZ/Rtvfzz9fPsPIkgkbL0DZNMFRVEHFEY2ZCBTcwMLdfCsCCVN4SwpE9YG+ARNgD24IDHYSYB1yNCYDkLRFoC8oOUG40AKQx5IYyAmlQ6SF7dDoSof0hbJiApzqLs43aPc5UG+AvVQ/4T7nGQFQiJ5kdbAkmgH2Sz0FaWB4gLrad22v4nmuvPt/yzCc1+V4t0e4z93r8PYwDCvNANxLSthkai0jmCf5+jq6y6Y4SkjTfoKprgWufj9Dg3AozBmiK7pl3H8WDH3u0YfLY6u6c/HVS2vSvsxoygyTF2q/qNenEyjJ5NJPYGPRidME1M1/JYqwyoNq32Ihu4J0z5M+WA2DoqwEI9wfmEaEhQJzPNsKNOh0jJwrfRVJqbnNOrC6IGwQFzgHiKrpCuq2kE+FizrMXWE7IWCEKemg7hSiimOQchNIC3EchqpHlBO95TshQThkwF5TL9k+Mm/MZLGzVo3AlQdLzagDle1vCYd/wU9/5Z5ZcyZPnNow/J8ZHZZCGtsbKw3rdn7nIzTx42o0WfP1cPKuYJ6XPFs5q7p8zmKx5v8cdcxDeMPOR1fj+gh4X10TV/dukiC+nJPeLy8eH1hrtm/UVvpKxcrP2oL/dlcs1eQ9PCeo73wGcp+R2Xyvlp74vH19B9EkoA2CYKUlcQqJCQj6vkoyBjh/IurcJiy4Zxy2FMptRBO7sK3kClR0UYUZAX+wMqfC1ICiYHMYBsKSQsSFKaAUEqZLoiK00ASFsgpN0UEUWE6yOkiiArE6NmUb91OWwAAEuNJREFUszCNxA0c/uBoF04W86YOarWQAYjGmHBBEIkUiXEqib025hNmInWknv6zKo77Sh3/RvcfSx5Xl4O4yr5Y7NxiuEEQFT4uvs8yrF5VvosX28LLS185vsiRHkc9YPiJtrCbJIzHyx3gJdfpl80flZWPR6qIxJghus7xjSqj4E9UNn2VvN76Csqq6XIR+48OYEeGlcAaXhLfQwxNQcgQEI9IErOOxBUuCuDLz9Arm5iyOTaYy7Jty8hAb2VCm43ZmwnwQTbgFpAWyA4SGEKhaMdgYNpngKAcpeMCAfFjYGE4yAqco3RZ0LorUqOkxVkf6AgzvFBPFbISSsOUD+WRrWijpcwbmI4Gomj4yxAIv4bPVU+q9sfxk/EP36UlfP49N3vNWr/m9CZdX/zzjDDofAoW3XHVr9NPHdB8p2+uORl/mjFLUktMbBTtkSJbpLCRxYyD5OpJps/4+DJuvq5IIgoLqfi3pLzcRuloM7QSzKImsBSWG80LVKkxkSvOkFHaCjL5QvrPN9rwvaSVtEg2ICmQCNRQkGjwnlOpNktMxdds+GxcRFrIyCmhTQMEUJjl4qwtzPbAOVC8o0DUZroGiMmBpEUfRBZ4DvRUJC4/1GOpij1ML9XU0PJdFxIZGsOpJkkOQ0YdFh5CPodKl0WfRqQkVUhTIEf1iN4GkdJU4Rx/xsJfHkpfMv4cd+IAUJb1+YdkfSU7NXp6+/bti7qquKiEdfVq0Gl2TO2DonYzAcUTCv0slCB8FuGia/q8j7iAPl30aNIPHVKq55w+00MvjFLo05WmV8H5P9XLzydVF/H0xbGl9UGfjm226B98po2u6fO+0f3H9M7SbT1h+FoS00ybSmm+5/RZHxzbwWvVHtSvNuLRR4BKl0vPtHRhWh1SESUsNBkH0qjvNiAx4MA1JDBc4yBmTPmwJArJCFM+dA1SE5XsmFIqRTzKUrZYkMio78IUkauFoW6Mcbin1GWrOR8nqOEUEUQFmuK3ZdEw6NFg92s9j3XLp0CIsAuS8VdPkcKhCZ9/KAc81x/c3NdzFjy6KHZc0YPNh7VhDg9jYnh4co9n2dvx1nLalys7Rimx2xLGigfEJBQ0Xr149FkBVb04BQiTlPAFbTiDxRGKM1pJf5AgarPKG0sQu413N07hkCANO5m0fSebtCwziW5DqMISHTRMJCDF23inYbmsauNCHq+Vn1ta5dErzKN8psP/RiIXVpAegKJQ30Y06AQSEXdAIpdL0wbTNsLpoSIeCwRJHZYBpTusIFAIlPC0iqL5AxoCcmLPQkkLdITRCc0dSFqQD1A51g4pLOXmhZCwDMO2BpH9q6ZtDoU4oKQIy5yEynFnv+mzw+0+/q3Sf5yT4aYs89zq1alLIK7wYeQANcCpgW5AOaqIARzxcudrXrMTz+cuFAxBI1Rw06eLKz3xsnDikt+Mmr9mWBlXrbySeJAlTt8MXJImXHRNv0zx2GpWZ3r0KKqzXHlRHH26+fQf+mkbg56ADjppUuihMJl7BEhGtmnj+4Phj1lEUAzjaQcgJkzcqPPmlI/yjdJV8Trf/+hbeYyP0uMS0zSVF8SEaSELxkhR6a7IC1IVHkNMBWEkCljxYQ7YXgWKrDCHw2ohJDDKSkr5Tst3TANBp7DdgkTFKSOpxYMtV2i3hXQoJjwbBo3L4oibAajdXmSbCl01PEvi6x3PetMvwfi3cv+xHpPRk8GZvo6Oq5y5FvZlvtfqQZ5v5igfH7iRdHqrn/H24McyEb6ejCUxkCwqEATi8JDNKtWRIxI6wrLj+aOyQgIqLT/KTZ+OLYnCFGHE60PdSgzIgVmcfrbt5evjYkB97VeNyv8plx/UYoChElhYgB7KtD3PAUWRpejIVNzNAjNzyDuYRqnrMF5dIx4CkTrlAJQRps2FhZIX5lqYwfFLOygTBeSmkUhDEgNvIC7MR5ML6JhozoCpn+858G1utbH4j7BRT0Z9VlZzbTyOKJCKeCjkqYbkFBJh+DXCPVcKuXKIFURlm8WBoZSFOBCYmk6i33ioT+Kw1CegEMspcFfe+M8+rRySNum/YUwm9I7TPT04NWOBDg/nwtz16xMbEp3mPswIOuI6G7wBSlynz1pQWZEIP0smIcEEWN3QsfJDn+nj9FFSPh73wilgdE2f+eOumo4pPqWI2kI/LKu4RVXLq7H/kJopRUFhnkj4joNT9KC/BlZgAIVD1I+cwASVUBgCIsF1KEQxJLpGPKHGP5LYrAs5ikREnmJ61KF4K5cG1+REVS6HC1JauGroYYcOrLWUEp6MSF0UpoZgK5hV2dgEzeNLYbMBnRQZEUPnOwGMT6GOp57Kg/0WTCMYjnsQHpDmlJFTR5IcNt/alvV1PdF5NsKcLSpGG03L6QcjnWDpeIXqgFYb//A9wGi1+fMPDeqY7nae6uvT530KKp+JebkhHJyX6Fqz33X83tCgRr1d6gXBH+XnFtEwDmEVMBfAtbK7UvHxVTb1gGLQokbFVBZMDtUJHmT+dsPxmqSRU2nkrxkWxhfbOfEVwLov4sIaonSRr1qZy6vy8xliPbn+qPjYHxSm6mJwdB357DfaVtJ/BMLeW0/ayVQSR6TA5AB7h8kwmFeRrFBUSFYkJk7GsM+F5SuiCQmFBEriCskHYcxfEM9ozBjBS/yaKD//rBzndjD3BHswAcmqwFdhOWGugCw5owwpEt9sxMlVGWQEK4GlcAOi1XAcL6eLICfdcMFmNDnH7xdO/YTCHTkxM2B6EiSPbuXmHrZO5eJy4Iu6lfo2Gu8orFfA+PM9UMjnHpBIx9v+/Q9Wm8nMfcMTE1d7u7vP4Ec6fzy1wqOGP3xI63JHjgT2/rsy/boTbMP0pe78dVUWS5wjK0VUjIqNN3kA62ZYeIcfxofXDFNFUZBTT4W6m71mWBlXrb4yWSoEYWh0jVIUdJEmzA6o18mRDN7dCplCEkK8IiP4WRAU9OO8j5wimZB3SAhKYlJEphLkJCaSEP7PEdxsfVG5UWFxP6qPPngTlvBED6IWLN8dTPmg8ocFPPRXWBdlFWqqCEmLlhAgLRtKdLaAkpQNfRUM6DUQGOUiTimNEaT7FvRVw/F6K91XG4/mHf9KPaovvJ36jzfSS1mpc6mUdhnvhZL4a0GjZsKBKK+n0+kt0AHvztCAsIzjeeAeUKVPF1l101cBWCICxcGmcPalUeHRnyguIsJYej79fFnpKxdjrKhu+spVK69Ke+OW6SXlh7Xk/8b7D5umJKY6nUiQAEmp5ZKoD5Ay8kTFzcAsJIrL+ZREYCWAaU4ubXRNP8wfpuSuGubHMwCJhSuGPCiYJIMw5GV6xkfY0Wd+WoPiBAlEhvnzNluw3SKZYTkQHIQ5J1RQDg7Lw/QQGUIdFp4wcC9KgQ/7KkxjucEHROVmc3ZaCFfEjMxUvlPvBZ0WhT1Q1zG06hQKyGPA9qEh4bPRJuO/0p//WvoPyXpa77BPr9L1mn64QiJRT0vlP3jg1oyn0/th1dnN6VOkQyh8wVRuPpLUH9GHi+sckD4vLaj43NSHLwfv8cKjbGxdgc97JUpFpIRbpovKYHTUltkpHYkyEqNYf1gWfZU+Vn+JiMZERS4qKyTAMv1hmwoItLT/aL6OL9cn8A4mknhDkR5CUuh43ExhAXjnIQVxRQ9UwnU1JM73meHISINzlY/1Ir3jwNQBtui5IpU3K2mFZbEUEhgJiHlZhkqI8rws7hPFxBHlZ5romu1CGRSv2HyQEQiLPkwefJcSk2o0mU+F8Z46KswbKd8qvRUWiq7BsuoYlF/q+Jd839p4/KNnFHhw+Fbc819r/y3dHO7qsk9D2lLPBvEq59SLXC6CYSCq1OTk5F48g+FxLyQSvvyzhFK8taaYL1ACiYdkkSOg/HVO4irmAySLlR8+yHy5wnaWysTF7YmnRxdyecMXFDcxx3KjNCUEGUtb2r4Iixwh5qebxEG58v2Hkh0ERqlLp5kClNLkngLSyF8XExrZi089SYbFm9DRg1FCbEKyoxQE8sqFkTOgTwrDVIPCP/k8qpRcGrxMEXmxnpwjUeXbhjpgA2bBNsp0HPQWOiwNOnddw5YcNIdSFyzTlUKehEbrLDxDNn7osjCXPw5FO22qgPfKHn/pf8XxxxetvSvYlX8BxBVKCdGDmPPDhz0W+Oijjxof//jHt+Hh2oko/qKqFx4l0BJQmQIwS3RNn/fxZXqGFbq4nQzimI9tKFs+S1S1KJ9XoQkEfUQwtKg98fSzefMMwmx5F28/IqK2RLjM2b54/gX0H0v6+IiDZSVgHJogfYWNzDMUpCtsUkKg4pKIUJAsnNTlkjNWzfBCPMOhi8JAiCSqPBmyMFVQ1OdctQwLywNZ5cPCpDl80D6IhjzBASQF0sUeREpSJCyE4ceSpJXbEO2612AHepaTSRn/YrtEAD3n8xV/ntv4+S96nyGRO9gccQZmEPiBK3bRi5kPHcG+v2T32n2+53bxNY8oQyWIB0SR9OmqxMeTh5lm/8azx8srEbCQNSqTpUTX+eagwCiPqiWeQAXO/olHV2tPaYUFjWCxsQJjt7MV564K6iOB2Xj1adNGa3PqDMFl4XwSSnAQCUIibqFPlwtTwbiOkoSR+JvLx3KYv9BXaSrlLyifSegQBNMFTAWhiIeFArRZnoX+8Y2EzKhbnuNlYO9wFpZXkwoH5Kmj/6qOFTz+0n8+Y4Y/2pVIcJqY35+YJ6wjEN33ZzL9kPY3hWjx6Sv+RcByLIQAZZYQJSn2C944FRF/QkvjQ31XZDcV04GVPOGl+WdJEhVGbaNPV3d7Va7ZP83U/1ACgzTjkg4gjUFvHhGWkrPAPnnBLNeFSEKKfAbzOu9yBAUdVj6cZURpZuU3XOUILioD93x2IEnxxFGc9c6M+M93cHSNZVzHquBQDeMn4x898wQ2us7pgGvAbyU8/z5e5EupVEqtJirCgp4KHxVI7sbrQIYKHyKF3+yvIvEEX8FsQNk9qXwgBpgQwNo7p9OKrukzfdzF08+WTmYrV35YF+tU8bEpYImInGtLVH+8PkzZ8iQcVpjrawXCLOHH5uo/9JmWjbXHJMQcNhVW8bOklbsumnJw7Q+cgtVK2mJxAUNNKKncp54KHuzAwnjCE01B1UIHA1A80ik/IkdIfTj6mE8MXh2sSKZhdHUd+IcDykwFLj4eMv7Fv+il75c8/xEmeHaojD+jZ4LgbsPVVvO5iutg4oSAFCCiAqVp/jrUKRU8mzVexsube05ff3tiD0Q1wkP/ojrYgeiaftiheHsjLKL4GrudTxYvb0H9h94bpzeAwCD4cAqJf5SmlBjFH5D8ChVC1Q8KyIkrjtgbE64y4lqtINJHel5Hq4q4ZdsYzsWBWaU+rkFWtFzQbiNNnWciNbT/qD4+Hitq/FdE/3mWzmvQU+W4hZZPenQuRHRNfylcvfVjpUqz0Tj6dNE1/fm4euufTx1z5am3/hr6z6lj9A9ElneKwPJ3IYEVEpqKys0YFeUhoDBP4TV/+bjVIkfqKuu8/ixC/+tqR73111V4DYnrrb+G8a+h1tkk9dY/m7MxV7XUzwdP3ApBgCYG6Co+L6/+kcB4X0g0ERFFzwXjojBc5q8ZhqOKtWEoROmLEwSWBIHowVySyqSS5kIABEYhisRFEov8SgRWGD6K9OMgq8IwBIkTBBYXASGsxcW3pUoHgfF5iIiLPv9x+03kuLxMqaqsUj1KJL4gsFgICGEtFrJtUG6OwDhtJHHhqLOl+dBAG0AnXRAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBIGVhMD/D0fV/fpMMM+gAAAAAElFTkSuQmCC'
  }
};
exports.default = _default;

/***/ }),
/* 122 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/noticeBar.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
 */
var _default = {
  // noticeBar
  noticeBar: {
    text: function text() {
      return [];
    },
    direction: 'row',
    step: false,
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    speed: 80,
    fontSize: 14,
    duration: 2000,
    disableTouch: true,
    url: '',
    linkType: 'navigateTo'
  }
};
exports.default = _default;

/***/ }),
/* 123 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/notify.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:10:21
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/notify.js
 */
var _default = {
  // notify组件
  notify: {
    top: 0,
    type: 'primary',
    color: '#ffffff',
    bgColor: '',
    message: '',
    duration: 3000,
    fontSize: 15,
    safeAreaInsetTop: false
  }
};
exports.default = _default;

/***/ }),
/* 124 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/numberBox.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:46
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberBox.js
 */
var _default = {
  // 步进器组件
  numberBox: {
    name: '',
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: '#323233',
    buttonSize: 30,
    bgColor: '#EBECEE',
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 125 */
/*!*****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/numberKeyboard.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:05
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberKeyboard.js
 */
var _default = {
  // 数字键盘
  numberKeyboard: {
    mode: 'number',
    dotDisabled: false,
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 126 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/overlay.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/overlay.js
 */
var _default = {
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 127 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/parse.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/parse.js
 */
var _default = {
  // parse
  parse: {
    copyLink: true,
    errorImg: '',
    lazyLoad: false,
    loadingImg: '',
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true
  }
};
exports.default = _default;

/***/ }),
/* 128 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/picker.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
 */
var _default = {
  // picker
  picker: {
    show: false,
    showToolbar: true,
    title: '',
    columns: function columns() {
      return [];
    },
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确定',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    keyName: 'text',
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    },
    immediateChange: false
  }
};
exports.default = _default;

/***/ }),
/* 129 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/popup.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
 */
var _default = {
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: 'bottom',
    duration: 300,
    closeable: false,
    overlayStyle: function overlayStyle() {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: 'top-right',
    round: 0,
    zoom: true,
    bgColor: '',
    overlayOpacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 130 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/radio.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:02:34
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radio.js
 */
var _default = {
  // radio组件
  radio: {
    name: '',
    shape: '',
    disabled: '',
    labelDisabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    labelSize: '',
    label: '',
    labelColor: '',
    size: '',
    iconColor: '',
    placement: ''
  }
};
exports.default = _default;

/***/ }),
/* 131 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/radioGroup.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
 */
var _default = {
  // radio-group组件
  radioGroup: {
    value: '',
    disabled: false,
    shape: 'circle',
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    name: '',
    size: 18,
    placement: 'row',
    label: '',
    labelColor: '#303133',
    labelSize: 14,
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    borderBottom: false,
    iconPlacement: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 132 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/rate.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rate.js
 */
var _default = {
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: '#b2b2b2',
    activeColor: '#FA3534',
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: 'star-fill',
    inactiveIcon: 'star',
    touchable: true
  }
};
exports.default = _default;

/***/ }),
/* 133 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/readMore.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:41
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/readMore.js
 */
var _default = {
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: '展开阅读全文',
    openText: '收起',
    color: '#2979ff',
    fontSize: 14,
    textIndent: '2em',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 134 */
/*!******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/row.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/row.js
 */
var _default = {
  // row
  row: {
    gutter: 0,
    justify: 'start',
    align: 'center'
  }
};
exports.default = _default;

/***/ }),
/* 135 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/rowNotice.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rowNotice.js
 */
var _default = {
  // rowNotice
  rowNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80
  }
};
exports.default = _default;

/***/ }),
/* 136 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/scrollList.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:28
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/scrollList.js
 */
var _default = {
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#3c9cff',
    indicatorStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 137 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/search.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:45
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
 */
var _default = {
  // search
  search: {
    shape: 'round',
    bgColor: '#f2f2f2',
    placeholder: '请输入关键字',
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: function actionStyle() {
      return {};
    },
    actionText: '搜索',
    inputAlign: 'left',
    inputStyle: function inputStyle() {
      return {};
    },
    disabled: false,
    borderColor: 'transparent',
    searchIconColor: '#909399',
    searchIconSize: 22,
    color: '#606266',
    placeholderColor: '#909399',
    searchIcon: 'search',
    margin: '0',
    animation: false,
    value: '',
    maxlength: '-1',
    height: 32,
    label: null
  }
};
exports.default = _default;

/***/ }),
/* 138 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/section.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/section.js
 */
var _default = {
  // u-section组件
  section: {
    title: '',
    subTitle: '更多',
    right: true,
    fontSize: 15,
    bold: true,
    color: '#303133',
    subColor: '#909399',
    showLine: true,
    lineColor: '',
    arrow: true
  }
};
exports.default = _default;

/***/ }),
/* 139 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/skeleton.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/skeleton.js
 */
var _default = {
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle'
  }
};
exports.default = _default;

/***/ }),
/* 140 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/slider.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/slider.js
 */
var _default = {
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: '#2979ff',
    inactiveColor: '#c0c4cc',
    blockColor: '#ffffff',
    showValue: false,
    disabled: false,
    blockStyle: function blockStyle() {}
  }
};
exports.default = _default;

/***/ }),
/* 141 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/statusBar.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/statusBar.js
 */
var _default = {
  // statusBar
  statusBar: {
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 142 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/steps.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
 */
var _default = {
  // steps组件
  steps: {
    direction: 'row',
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#969799',
    activeIcon: '',
    inactiveIcon: '',
    dot: false
  }
};
exports.default = _default;

/***/ }),
/* 143 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/stepsItem.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/stepsItem.js
 */
var _default = {
  // steps-item组件
  stepsItem: {
    title: '',
    desc: '',
    iconSize: 17,
    error: false
  }
};
exports.default = _default;

/***/ }),
/* 144 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/sticky.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sticky.js
 */
var _default = {
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: 'transparent',
    zIndex: '',
    index: ''
  }
};
exports.default = _default;

/***/ }),
/* 145 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/subsection.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
 */
var _default = {
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#303133',
    mode: 'button',
    fontSize: 12,
    bold: true,
    bgColor: '#eeeeef',
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 146 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/swipeAction.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeAction.js
 */
var _default = {
  // swipe-action组件
  swipeAction: {
    autoClose: true
  }
};
exports.default = _default;

/***/ }),
/* 147 */
/*!******************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/swipeActionItem.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeActionItem.js
 */
var _default = {
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: '',
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 148 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/swiper.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:21:38
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiper.js
 */
var _default = {
  // swiper 组件
  swiper: {
    list: function list() {
      return [];
    },
    indicator: false,
    indicatorActiveColor: '#FFFFFF',
    indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
    indicatorStyle: '',
    indicatorMode: 'line',
    autoplay: true,
    current: 0,
    currentItemId: '',
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: 'default',
    keyName: 'url',
    imgMode: 'aspectFill',
    height: 130,
    bgColor: '#f3f4f6',
    radius: 4,
    loading: false,
    showTitle: false
  }
};
exports.default = _default;

/***/ }),
/* 149 */
/*!*******************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/swipterIndicator.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiperIndicator.js
 */
var _default = {
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: '',
    indicatorInactiveColor: '',
    indicatorMode: 'line'
  }
};
exports.default = _default;

/***/ }),
/* 150 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/switch.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/switch.js
 */
var _default = {
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: '#2979ff',
    inactiveColor: '#ffffff',
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0
  }
};
exports.default = _default;

/***/ }),
/* 151 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/tabbar.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbar.js
 */
var _default = {
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    fixed: true,
    placeholder: true
  }
};
exports.default = _default;

/***/ }),
/* 152 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/tabbarItem.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbarItem.js
 */
var _default = {
  //
  tabbarItem: {
    name: null,
    icon: '',
    badge: null,
    dot: false,
    text: '',
    badgeStyle: 'top: 6px;right:2px;'
  }
};
exports.default = _default;

/***/ }),
/* 153 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/tabs.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
 */
var _default = {
  //
  tabs: {
    duration: 300,
    list: function list() {
      return [];
    },
    lineColor: '#3c9cff',
    activeStyle: function activeStyle() {
      return {
        color: '#303133'
      };
    },
    inactiveStyle: function inactiveStyle() {
      return {
        color: '#606266'
      };
    },
    lineWidth: 20,
    lineHeight: 3,
    lineBgSize: 'cover',
    itemStyle: function itemStyle() {
      return {
        height: '44px'
      };
    },
    scrollable: true,
    current: 0,
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 154 */
/*!******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/tag.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tag.js
 */
var _default = {
  // tag 组件
  tag: {
    type: 'primary',
    disabled: false,
    size: 'medium',
    shape: 'square',
    text: '',
    bgColor: '',
    color: '',
    borderColor: '',
    closeColor: '#C6C7CB',
    name: '',
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: ''
  }
};
exports.default = _default;

/***/ }),
/* 155 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/text.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/text.js
 */
var _default = {
  // text 组件
  text: {
    type: '',
    show: true,
    text: '',
    prefixIcon: '',
    suffixIcon: '',
    mode: '',
    href: '',
    format: '',
    call: false,
    openType: '',
    bold: false,
    block: false,
    lines: '',
    color: '#303133',
    size: 15,
    iconStyle: function iconStyle() {
      return {
        fontSize: '15px'
      };
    },
    decoration: 'none',
    margin: 0,
    lineHeight: '',
    align: 'left',
    wordWrap: 'normal'
  }
};
exports.default = _default;

/***/ }),
/* 156 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/textarea.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/textarea.js
 */
var _default = {
  // textarea 组件
  textarea: {
    value: '',
    placeholder: '',
    placeholderClass: 'textarea-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: 70,
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 157 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/toast.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toast.js
 */
var _default = {
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: '',
    icon: '',
    type: '',
    loadingMode: '',
    show: '',
    overlay: false,
    position: 'center',
    params: function params() {},
    duration: 2000,
    isTab: false,
    url: '',
    callback: null,
    back: false
  }
};
exports.default = _default;

/***/ }),
/* 158 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/toolbar.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toolbar.js
 */
var _default = {
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    title: ''
  }
};
exports.default = _default;

/***/ }),
/* 159 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/tooltip.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:25:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tooltip.js
 */
var _default = {
  // tooltip 组件
  tooltip: {
    text: '',
    copyText: '',
    size: 14,
    color: '#606266',
    bgColor: 'transparent',
    direction: 'top',
    zIndex: 10071,
    showCopy: true,
    buttons: function buttons() {
      return [];
    },
    overlay: true,
    showToast: true
  }
};
exports.default = _default;

/***/ }),
/* 160 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/transition.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:59:00
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/transition.js
 */
var _default = {
  // transition动画组件的props
  transition: {
    show: false,
    mode: 'fade',
    duration: '300',
    timingFunction: 'ease-out'
  }
};
exports.default = _default;

/***/ }),
/* 161 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/props/upload.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:09:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/upload.js
 */
var _default = {
  // upload组件
  upload: {
    accept: 'image',
    capture: function capture() {
      return ['album', 'camera'];
    },
    compressed: true,
    camera: 'back',
    maxDuration: 60,
    uploadIcon: 'camera-fill',
    uploadIconColor: '#D3D4D6',
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: 'aspectFill',
    name: '',
    sizeType: function sizeType() {
      return ['original', 'compressed'];
    },
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: function fileList() {
      return [];
    },
    uploadText: '',
    width: 80,
    height: 80,
    previewImage: true
  }
};
exports.default = _default;

/***/ }),
/* 162 */
/*!***************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/config/zIndex.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),
/* 163 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/function/platform.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 注意：
 * 此部分内容，在vue-cli模式下，需要在vue.config.js加入如下内容才有效：
 * module.exports = {
 *     transpileDependencies: ['uview-v2']
 * }
 */

var platform = 'none';
platform = 'vue2';
platform = 'weixin';
platform = 'mp';
var _default = platform;
exports.default = _default;

/***/ }),
/* 164 */
/*!****************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/utils/sqliteUtil.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
var sqliteUtil = {
  dbName: 'xfsDB',
  // 数据库名称
  dbPath: '_doc/xfs.db',
  // 数据库地址,推荐以下划线为开头   _doc/xxx.db
  //id，user_id，avatar_url，user_name，last_message，last_time，unread_num，stranger
  // 判断数据库是否打开
  isOpen: function isOpen() {
    // 数据库打开了就返回 true,否则返回 false
    var open = plus.sqlite.isOpenDatabase({
      name: this.dbName,
      // 数据库名称
      path: this.dbPath // 数据库地址
    });

    return open;
  },
  // 创建数据库 或 有该数据库就打开
  openSqlite: function openSqlite() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      // 打开数据库
      plus.sqlite.openDatabase({
        name: _this.dbName,
        path: _this.dbPath,
        success: function success(e) {
          resolve(e); // 成功回调
        },
        fail: function fail(e) {
          reject(e); // 失败回调
        }
      });
    });
  },
  // 关闭数据库
  closeSqlite: function closeSqlite() {
    var _this2 = this;
    return new Promise(function (resolve, reject) {
      plus.sqlite.closeDatabase({
        name: _this2.dbName,
        success: function success(e) {
          resolve(e);
        },
        fail: function fail(e) {
          reject(e);
        }
      });
    });
  },
  // 数据库删表 sql:'DROP TABLE dbTable'
  dropTable: function dropTable(dbTable) {
    var _this3 = this;
    console.log("DROP TABLE ".concat(dbTable));
    return new Promise(function (resolve, reject) {
      plus.sqlite.executeSql({
        name: _this3.dbName,
        sql: "DROP TABLE ".concat(dbTable),
        success: function success(e) {
          resolve(e);
        },
        fail: function fail(e) {
          reject(e);
        }
      });
    });
  },
  //-----------------------js对象方法，简化操作-------------
  ///原生的sql操作
  SqlExecute: function SqlExecute(sql) {
    var _this4 = this;
    console.log(sql);
    return new Promise(function (resolve, reject) {
      plus.sqlite.executeSql({
        name: _this4.dbName,
        sql: sql,
        success: function success(e) {
          // console.log(e)
          resolve(e);
        },
        fail: function fail(e) {
          console.log(e);
          reject(e);
        }
      });
    });
  },
  //执行原生的select语句
  SqlSelect: function SqlSelect(sql) {
    var _this5 = this;
    console.log(sql);
    return new Promise(function (resolve, reject) {
      plus.sqlite.selectSql({
        name: _this5.dbName,
        sql: sql,
        success: function success(e) {
          console.log(e);
          resolve(e);
        },
        fail: function fail(e) {
          console.log(e);
          reject(e);
        }
      });
    });
  },
  //通过对象创建数据表,使用对象参数
  JsCreateTable: function JsCreateTable(dbTable, data) {
    data = Object.entries(data).map(function (item) {
      return item[0] + ' ' + item[1];
    }).join(',');
    var sql = "CREATE TABLE IF NOT EXISTS ".concat(dbTable, "(\"id\" INTEGER PRIMARY KEY AUTOINCREMENT,").concat(data, ")");
    return this.SqlExecute(sql);
  },
  //通过对象创建数据表,使用对象的数据类型
  JsCreateTableType: function JsCreateTableType(dbTable, data) {
    data = Object.entries(data).map(function (item) {
      var typeName = '';
      switch (item[1].constructor) {
        case Number:
          if (Math.floor(item[1]) == item[1]) {
            typeName = 'INTEGER';
          } else {
            typeName = 'REAL';
          }
          break;
        case String:
          typeName = 'TEXT';
          break;
        case Boolean:
          typeName = 'BOOLEAN';
          break;
        case Date:
          typeName = 'TEXT';
          break;
      }
      return item[0] + ' ' + typeName;
    }).join(',');
    var sql = "CREATE TABLE IF NOT EXISTS ".concat(dbTable, "(\"id\" INTEGER PRIMARY KEY AUTOINCREMENT,").concat(data, ")");
    console.log(sql);
    return this.SqlExecute(sql);
  },
  //通过对象插入数据
  JsInsertTableData: function JsInsertTableData(dbTable, data) {
    var condition = [];
    var sqlValue = [];
    Object.entries(data).forEach(function (item) {
      condition.push("'".concat(item[0], "'"));
      if (item[1] != undefined) {
        if (item[1].constructor == String) {
          sqlValue.push("'".concat(item[1], "'"));
        } else if (item[1].constructor == Date) {
          sqlValue.push("'".concat(item[1].format('yyyy-MM-dd hh:mm:ss'), "'"));
        } else {
          sqlValue.push(item[1]);
        }
      }
    });
    condition = condition.join(',');
    sqlValue = sqlValue.join(',');
    var sql = "INSERT INTO ".concat(dbTable, " (").concat(condition, ") VALUES(").concat(sqlValue, ")");
    return this.SqlExecute(sql);
  },
  //通过对象选择数据
  JsSelectTableData: function JsSelectTableData(dbTable, data) {
    var sql = '';
    var condition = [];
    if (data == undefined || data == null || data == {}) {
      sql = "SELECT * FROM ".concat(dbTable);
    } else if (data.constructor == Number) {
      sql = "SELECT * FROM ".concat(daTable, " where id = ").concat(data);
    } else {
      Object.entries(data).forEach(function (item) {
        if (item[1] != undefined && item[0] != 'id') {
          if (_typeof(item[1] == 'string')) {
            condition.push(" ".concat(item[0], " = '").concat(item[1], "' "));
          } else {
            condition.push(" ".concat(item[0], " = ").concat(item[1], " "));
          }
        }
      });
      condition = condition.join('AND');
      sql = "SELECT * FROM ".concat(dbTable, " WHERE ").concat(condition);
    }
    return this.SqlSelect(sql);
  },
  //通过对象获取
  JsUpdate: function JsUpdate(dbTable, data) {
    try {
      var sql = '';
      var condition = [];
      Object.entries(data).forEach(function (item) {
        if (item[1] != undefined && item[0] != 'id') {
          if (_typeof(item[1] == 'string')) {
            condition.push(" ".concat(item[0], " = '").concat(item[1], "' "));
          } else {
            condition.push(" ".concat(item[0], " = ").concat(item[1], " "));
          }
        }
      });
      condition = condition.join(',');
      sql = "UPDATE ".concat(dbTable, " SET ").concat(condition, " where id = ").concat(data.id);
      return this.SqlExecute(sql);
    } catch (e) {
      console.log(e);
      //TODO handle the exception
    }
  },
  JsDelete: function JsDelete(dbTable, data) {
    var sql = '';
    // debugger
    var condition = [];
    try {
      if (data.constructor == Number) {
        sql = "DELETE FROM ".concat(dbTable, " where id = ").concat(data);
      } else {
        Object.entries(data).forEach(function (item) {
          if (item[1] != undefined && item[0] != 'id') {
            if (_typeof(item[1] == 'string')) {
              condition.push(" ".concat(item[0], " = '").concat(item[1], "' "));
            } else {
              condition.push(" ".concat(item[0], " = ").concat(item[1], " "));
            }
          }
        });
        condition = condition.join('AND');
        sql = "Delete FROM ".concat(dbTable, " WHERE ").concat(condition);
      }
      return this.SqlExecute(sql);
    } catch (e) {
      console.log(e);
    }
  }
};
module.exports = sqliteUtil;

/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */
/*!******************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/apis/third_service.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResetPhoneSms = exports.sendRegisterPhoneSms = exports.sendBindPhoneSms = void 0;
var _request = __webpack_require__(/*! ../utils/request.js */ 31);
var sendBindPhoneSms = function sendBindPhoneSms() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/third/sendBindPhoneSms?phoneNumber=' + params.phoneNumber,
    method: 'GET'
  });
};
exports.sendBindPhoneSms = sendBindPhoneSms;
var sendResetPhoneSms = function sendResetPhoneSms() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/third/sendResetPhoneSms?phoneNumber=' + params.phoneNumber,
    method: 'GET'
  });
};
exports.sendResetPhoneSms = sendResetPhoneSms;
var sendRegisterPhoneSms = function sendRegisterPhoneSms() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.$request)({
    url: '/third/sendRegisterPhoneSms?phoneNumber=' + params.phoneNumber,
    method: 'GET'
  });
};
exports.sendRegisterPhoneSms = sendRegisterPhoneSms;

/***/ }),
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */
/*!****************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/mixin/openType.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo: function onGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    onContact: function onContact(event) {
      this.$emit('contact', event.detail);
    },
    onGetPhoneNumber: function onGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    onError: function onError(event) {
      this.$emit('error', event.detail);
    },
    onLaunchApp: function onLaunchApp(event) {
      this.$emit('launchapp', event.detail);
    },
    onOpenSetting: function onOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    }
  }
};
exports.default = _default;

/***/ }),
/* 240 */
/*!**************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/libs/mixin/button.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
};
exports.default = _default;

/***/ }),
/* 241 */
/*!****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-action-sheet/props.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 操作菜单是否展示 （默认false）
    show: {
      type: Boolean,
      default: uni.$u.props.actionSheet.show
    },
    // 标题
    title: {
      type: String,
      default: uni.$u.props.actionSheet.title
    },
    // 选项上方的描述信息
    description: {
      type: String,
      default: uni.$u.props.actionSheet.description
    },
    // 数据
    actions: {
      type: Array,
      default: uni.$u.props.actionSheet.actions
    },
    // 取消按钮的文字，不为空时显示按钮
    cancelText: {
      type: String,
      default: uni.$u.props.actionSheet.cancelText
    },
    // 点击某个菜单项时是否关闭弹窗
    closeOnClickAction: {
      type: Boolean,
      default: uni.$u.props.actionSheet.closeOnClickAction
    },
    // 处理底部安全区（默认true）
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni.$u.props.actionSheet.safeAreaInsetBottom
    },
    // 小程序的打开方式
    openType: {
      type: String,
      default: uni.$u.props.actionSheet.openType
    },
    // 点击遮罩是否允许关闭 (默认true)
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.actionSheet.closeOnClickOverlay
    },
    // 圆角值
    round: {
      type: [Boolean, String, Number],
      default: uni.$u.props.actionSheet.round
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-button/props.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-16 10:04:04
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-16 10:04:24
 * @FilePath     : /u-view2.0/uview-ui/components/u-button/props.js
 */
var _default = {
  props: {
    // 是否细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.button.hairline
    },
    // 按钮的预置样式，info，primary，error，warning，success
    type: {
      type: String,
      default: uni.$u.props.button.type
    },
    // 按钮尺寸，large，normal，small，mini
    size: {
      type: String,
      default: uni.$u.props.button.size
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: uni.$u.props.button.shape
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: uni.$u.props.button.plain
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: uni.$u.props.button.disabled
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.button.loading
    },
    // 加载中提示文字
    loadingText: {
      type: [String, Number],
      default: uni.$u.props.button.loadingText
    },
    // 加载状态图标类型
    loadingMode: {
      type: String,
      default: uni.$u.props.button.loadingMode
    },
    // 加载图标大小
    loadingSize: {
      type: [String, Number],
      default: uni.$u.props.button.loadingSize
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: uni.$u.props.button.openType
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: uni.$u.props.button.formType
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: uni.$u.props.button.appParameter
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: uni.$u.props.button.hoverStopPropagation
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: uni.$u.props.button.lang
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: uni.$u.props.button.sessionFrom
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: uni.$u.props.button.sendMessageTitle
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: uni.$u.props.button.sendMessagePath
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: uni.$u.props.button.sendMessageImg
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: uni.$u.props.button.showMessageCard
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: uni.$u.props.button.dataName
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: uni.$u.props.button.throttleTime
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStartTime
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStayTime
    },
    // 按钮文字，之所以通过props传入，是因为slot传入的话
    // nvue中无法控制文字的样式
    text: {
      type: [String, Number],
      default: uni.$u.props.button.text
    },
    // 按钮图标
    icon: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮图标
    iconColor: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮颜色，支持传入linear-gradient渐变色
    color: {
      type: String,
      default: uni.$u.props.button.color
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-badge/props.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示圆点
    isDot: {
      type: Boolean,
      default: uni.$u.props.badge.isDot
    },
    // 显示的内容
    value: {
      type: [Number, String],
      default: uni.$u.props.badge.value
    },
    // 是否显示
    show: {
      type: Boolean,
      default: uni.$u.props.badge.show
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: [Number, String],
      default: uni.$u.props.badge.max
    },
    // 主题类型，error|warning|success|primary
    type: {
      type: String,
      default: uni.$u.props.badge.type
    },
    // 当数值为 0 时，是否展示 Badge
    showZero: {
      type: Boolean,
      default: uni.$u.props.badge.showZero
    },
    // 背景颜色，优先级比type高，如设置，type参数会失效
    bgColor: {
      type: [String, null],
      default: uni.$u.props.badge.bgColor
    },
    // 字体颜色
    color: {
      type: [String, null],
      default: uni.$u.props.badge.color
    },
    // 徽标形状，circle-四角均为圆角，horn-左下角为直角
    shape: {
      type: String,
      default: uni.$u.props.badge.shape
    },
    // 设置数字的显示方式，overflow|ellipsis|limit
    // overflow会根据max字段判断，超出显示`${max}+`
    // ellipsis会根据max判断，超出显示`${max}...`
    // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
    numberType: {
      type: String,
      default: uni.$u.props.badge.numberType
    },
    // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
    offset: {
      type: Array,
      default: uni.$u.props.badge.offset
    },
    // 是否反转背景和字体颜色
    inverted: {
      type: Boolean,
      default: uni.$u.props.badge.inverted
    },
    // 是否绝对定位
    absolute: {
      type: Boolean,
      default: uni.$u.props.badge.absolute
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-popup/props.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示弹窗
    show: {
      type: Boolean,
      default: uni.$u.props.popup.show
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: uni.$u.props.popup.overlay
    },
    // 弹出的方向，可选值为 top bottom right left center
    mode: {
      type: String,
      default: uni.$u.props.popup.mode
    },
    // 动画时长，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.popup.duration
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: uni.$u.props.popup.closeable
    },
    // 自定义遮罩的样式
    overlayStyle: {
      type: [Object, String],
      default: uni.$u.props.popup.overlayStyle
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.popup.closeOnClickOverlay
    },
    // 层级
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.popup.zIndex
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetBottom
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetTop
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: uni.$u.props.popup.closeIconPos
    },
    // 是否显示圆角
    round: {
      type: [Boolean, String, Number],
      default: uni.$u.props.popup.round
    },
    // mode=center，也即中部弹出时，是否使用缩放模式
    zoom: {
      type: Boolean,
      default: uni.$u.props.popup.zoom
    },
    // 弹窗背景色，设置为transparent可去除白色背景
    bgColor: {
      type: String,
      default: uni.$u.props.popup.bgColor
    },
    // 遮罩的透明度，0-1之间
    overlayOpacity: {
      type: [Number, String],
      default: uni.$u.props.popup.overlayOpacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-textarea/props.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 输入框的内容
    value: {
      type: [String, Number],
      default: uni.$u.props.textarea.value
    },
    // 输入框为空时占位符
    placeholder: {
      type: [String, Number],
      default: uni.$u.props.textarea.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: uni.$u.props.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: uni.$u.props.input.placeholderStyle
    },
    // 输入框高度
    height: {
      type: [String, Number],
      default: uni.$u.props.textarea.height
    },
    // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
    confirmType: {
      type: String,
      default: uni.$u.props.textarea.confirmType
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: uni.$u.props.textarea.disabled
    },
    // 是否显示统计字数
    count: {
      type: Boolean,
      default: uni.$u.props.textarea.count
    },
    // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
    focus: {
      type: Boolean,
      default: uni.$u.props.textarea.focus
    },
    // 是否自动增加高度
    autoHeight: {
      type: Boolean,
      default: uni.$u.props.textarea.autoHeight
    },
    // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
    fixed: {
      type: Boolean,
      default: uni.$u.props.textarea.fixed
    },
    // 指定光标与键盘的距离
    cursorSpacing: {
      type: Number,
      default: uni.$u.props.textarea.cursorSpacing
    },
    // 指定focus时的光标位置
    cursor: {
      type: [String, Number],
      default: uni.$u.props.textarea.cursor
    },
    // 是否显示键盘上方带有”完成“按钮那一栏，
    showConfirmBar: {
      type: Boolean,
      default: uni.$u.props.textarea.showConfirmBar
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: Number,
      default: uni.$u.props.textarea.selectionStart
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: Number,
      default: uni.$u.props.textarea.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: uni.$u.props.textarea.adjustPosition
    },
    // 是否去掉 iOS 下的默认内边距，只微信小程序有效
    disableDefaultPadding: {
      type: Boolean,
      default: uni.$u.props.textarea.disableDefaultPadding
    },
    // focus时，点击页面的时候不收起键盘，只微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: uni.$u.props.textarea.holdKeyboard
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.textarea.maxlength
    },
    // 边框类型，surround-四周边框，bottom-底部边框
    border: {
      type: String,
      default: uni.$u.props.textarea.border
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: uni.$u.props.textarea.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-transition/props.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: uni.$u.props.transition.show
    },
    // 使用的动画模式
    mode: {
      type: String,
      default: uni.$u.props.transition.mode
    },
    // 动画的执行时间，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.transition.duration
    },
    // 使用的动画过渡函数
    timingFunction: {
      type: String,
      default: uni.$u.props.transition.timingFunction
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 280 */
/*!*******************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-transition/transition.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 61));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 63));
var _nvueAniMap = _interopRequireDefault(__webpack_require__(/*! ./nvue.ani-map.js */ 281));
// 定义一个一定时间后自动成功的promise，让调用nextTick方法处，进入下一个then方法
var nextTick = function nextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 1000 / 50);
  });
};
// nvue动画模块实现细节抽离在外部文件

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
var getClassNames = function getClassNames(name) {
  return {
    enter: "u-".concat(name, "-enter u-").concat(name, "-enter-active"),
    'enter-to': "u-".concat(name, "-enter-to u-").concat(name, "-enter-active"),
    leave: "u-".concat(name, "-leave u-").concat(name, "-leave-active"),
    'leave-to': "u-".concat(name, "-leave-to u-").concat(name, "-leave-active")
  };
};
var _default = {
  methods: {
    // 组件被点击发出事件
    clickHandler: function clickHandler() {
      this.$emit('click');
    },
    // vue版本的组件进场处理
    vueEnter: function vueEnter() {
      var _this = this;
      // 动画进入时的类名
      var classNames = getClassNames(this.mode);
      // 定义状态和发出动画进入前事件
      this.status = 'enter';
      this.$emit('beforeEnter');
      this.inited = true;
      this.display = true;
      this.classes = classNames.enter;
      this.$nextTick( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 标识动画尚未结束
                _this.$emit('enter');
                _this.transitionEnded = false;
                // 组件动画进入后触发的事件
                _this.$emit('afterEnter');
                // 赋予组件enter-to类名
                _this.classes = classNames['enter-to'];
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    },
    // 动画离场处理
    vueLeave: function vueLeave() {
      var _this2 = this;
      // 如果不是展示状态，无需执行逻辑
      if (!this.display) return;
      var classNames = getClassNames(this.mode);
      // 标记离开状态和发出事件
      this.status = 'leave';
      this.$emit('beforeLeave');
      // 获得类名
      this.classes = classNames.leave;
      this.$nextTick(function () {
        // 动画正在离场的状态
        _this2.transitionEnded = false;
        _this2.$emit('leave');
        // 组件执行动画，到了执行的执行时间后，执行一些额外处理
        setTimeout(_this2.onTransitionEnd, _this2.duration);
        _this2.classes = classNames['leave-to'];
      });
    },
    // 完成过渡后触发
    onTransitionEnd: function onTransitionEnd() {
      // 如果已经是结束的状态，无需再处理
      if (this.transitionEnded) return;
      this.transitionEnded = true;
      // 发出组件动画执行后的事件
      this.$emit(this.status === 'leave' ? 'afterLeave' : 'afterEnter');
      if (!this.show && this.display) {
        this.display = false;
        this.inited = false;
      }
    }
  }
};
exports.default = _default;

/***/ }),
/* 281 */
/*!*********************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-transition/nvue.ani-map.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  fade: {
    enter: {
      opacity: 0
    },
    'enter-to': {
      opacity: 1
    },
    leave: {
      opacity: 1
    },
    'leave-to': {
      opacity: 0
    }
  },
  'fade-up': {
    enter: {
      opacity: 0,
      transform: 'translateY(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(100%)'
    }
  },
  'fade-down': {
    enter: {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(-100%)'
    }
  },
  'fade-left': {
    enter: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(-100%)'
    }
  },
  'fade-right': {
    enter: {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(100%)'
    }
  },
  'slide-up': {
    enter: {
      transform: 'translateY(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(100%)'
    }
  },
  'slide-down': {
    enter: {
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(-100%)'
    }
  },
  'slide-left': {
    enter: {
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(-100%)'
    }
  },
  'slide-right': {
    enter: {
      transform: 'translateX(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(100%)'
    }
  },
  zoom: {
    enter: {
      transform: 'scale(0.95)'
    },
    'enter-to': {
      transform: 'scale(1)'
    },
    leave: {
      transform: 'scale(1)'
    },
    'leave-to': {
      transform: 'scale(0.95)'
    }
  },
  'fade-zoom': {
    enter: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 1,
      transform: 'scale(1)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'scale(0.95)'
    }
  }
};
exports.default = _default;

/***/ }),
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-icon/icons.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'uicon-level': "\uE693",
  'uicon-column-line': "\uE68E",
  'uicon-checkbox-mark': "\uE807",
  'uicon-folder': "\uE7F5",
  'uicon-movie': "\uE7F6",
  'uicon-star-fill': "\uE669",
  'uicon-star': "\uE65F",
  'uicon-phone-fill': "\uE64F",
  'uicon-phone': "\uE622",
  'uicon-apple-fill': "\uE881",
  'uicon-chrome-circle-fill': "\uE885",
  'uicon-backspace': "\uE67B",
  'uicon-attach': "\uE632",
  'uicon-cut': "\uE948",
  'uicon-empty-car': "\uE602",
  'uicon-empty-coupon': "\uE682",
  'uicon-empty-address': "\uE646",
  'uicon-empty-favor': "\uE67C",
  'uicon-empty-permission': "\uE686",
  'uicon-empty-news': "\uE687",
  'uicon-empty-search': "\uE664",
  'uicon-github-circle-fill': "\uE887",
  'uicon-rmb': "\uE608",
  'uicon-person-delete-fill': "\uE66A",
  'uicon-reload': "\uE788",
  'uicon-order': "\uE68F",
  'uicon-server-man': "\uE6BC",
  'uicon-search': "\uE62A",
  'uicon-fingerprint': "\uE955",
  'uicon-more-dot-fill': "\uE630",
  'uicon-scan': "\uE662",
  'uicon-share-square': "\uE60B",
  'uicon-map': "\uE61D",
  'uicon-map-fill': "\uE64E",
  'uicon-tags': "\uE629",
  'uicon-tags-fill': "\uE651",
  'uicon-bookmark-fill': "\uE63B",
  'uicon-bookmark': "\uE60A",
  'uicon-eye': "\uE613",
  'uicon-eye-fill': "\uE641",
  'uicon-mic': "\uE64A",
  'uicon-mic-off': "\uE649",
  'uicon-calendar': "\uE66E",
  'uicon-calendar-fill': "\uE634",
  'uicon-trash': "\uE623",
  'uicon-trash-fill': "\uE658",
  'uicon-play-left': "\uE66D",
  'uicon-play-right': "\uE610",
  'uicon-minus': "\uE618",
  'uicon-plus': "\uE62D",
  'uicon-info': "\uE653",
  'uicon-info-circle': "\uE7D2",
  'uicon-info-circle-fill': "\uE64B",
  'uicon-question': "\uE715",
  'uicon-error': "\uE6D3",
  'uicon-close': "\uE685",
  'uicon-checkmark': "\uE6A8",
  'uicon-android-circle-fill': "\uE67E",
  'uicon-android-fill': "\uE67D",
  'uicon-ie': "\uE87B",
  'uicon-IE-circle-fill': "\uE889",
  'uicon-google': "\uE87A",
  'uicon-google-circle-fill': "\uE88A",
  'uicon-setting-fill': "\uE872",
  'uicon-setting': "\uE61F",
  'uicon-minus-square-fill': "\uE855",
  'uicon-plus-square-fill': "\uE856",
  'uicon-heart': "\uE7DF",
  'uicon-heart-fill': "\uE851",
  'uicon-camera': "\uE7D7",
  'uicon-camera-fill': "\uE870",
  'uicon-more-circle': "\uE63E",
  'uicon-more-circle-fill': "\uE645",
  'uicon-chat': "\uE620",
  'uicon-chat-fill': "\uE61E",
  'uicon-bag-fill': "\uE617",
  'uicon-bag': "\uE619",
  'uicon-error-circle-fill': "\uE62C",
  'uicon-error-circle': "\uE624",
  'uicon-close-circle': "\uE63F",
  'uicon-close-circle-fill': "\uE637",
  'uicon-checkmark-circle': "\uE63D",
  'uicon-checkmark-circle-fill': "\uE635",
  'uicon-question-circle-fill': "\uE666",
  'uicon-question-circle': "\uE625",
  'uicon-share': "\uE631",
  'uicon-share-fill': "\uE65E",
  'uicon-shopping-cart': "\uE621",
  'uicon-shopping-cart-fill': "\uE65D",
  'uicon-bell': "\uE609",
  'uicon-bell-fill': "\uE640",
  'uicon-list': "\uE650",
  'uicon-list-dot': "\uE616",
  'uicon-zhihu': "\uE6BA",
  'uicon-zhihu-circle-fill': "\uE709",
  'uicon-zhifubao': "\uE6B9",
  'uicon-zhifubao-circle-fill': "\uE6B8",
  'uicon-weixin-circle-fill': "\uE6B1",
  'uicon-weixin-fill': "\uE6B2",
  'uicon-twitter-circle-fill': "\uE6AB",
  'uicon-twitter': "\uE6AA",
  'uicon-taobao-circle-fill': "\uE6A7",
  'uicon-taobao': "\uE6A6",
  'uicon-weibo-circle-fill': "\uE6A5",
  'uicon-weibo': "\uE6A4",
  'uicon-qq-fill': "\uE6A1",
  'uicon-qq-circle-fill': "\uE6A0",
  'uicon-moments-circel-fill': "\uE69A",
  'uicon-moments': "\uE69B",
  'uicon-qzone': "\uE695",
  'uicon-qzone-circle-fill': "\uE696",
  'uicon-baidu-circle-fill': "\uE680",
  'uicon-baidu': "\uE681",
  'uicon-facebook-circle-fill': "\uE68A",
  'uicon-facebook': "\uE689",
  'uicon-car': "\uE60C",
  'uicon-car-fill': "\uE636",
  'uicon-warning-fill': "\uE64D",
  'uicon-warning': "\uE694",
  'uicon-clock-fill': "\uE638",
  'uicon-clock': "\uE60F",
  'uicon-edit-pen': "\uE612",
  'uicon-edit-pen-fill': "\uE66B",
  'uicon-email': "\uE611",
  'uicon-email-fill': "\uE642",
  'uicon-minus-circle': "\uE61B",
  'uicon-minus-circle-fill': "\uE652",
  'uicon-plus-circle': "\uE62E",
  'uicon-plus-circle-fill': "\uE661",
  'uicon-file-text': "\uE663",
  'uicon-file-text-fill': "\uE665",
  'uicon-pushpin': "\uE7E3",
  'uicon-pushpin-fill': "\uE86E",
  'uicon-grid': "\uE673",
  'uicon-grid-fill': "\uE678",
  'uicon-play-circle': "\uE647",
  'uicon-play-circle-fill': "\uE655",
  'uicon-pause-circle-fill': "\uE654",
  'uicon-pause': "\uE8FA",
  'uicon-pause-circle': "\uE643",
  'uicon-eye-off': "\uE648",
  'uicon-eye-off-outline': "\uE62B",
  'uicon-gift-fill': "\uE65C",
  'uicon-gift': "\uE65B",
  'uicon-rmb-circle-fill': "\uE657",
  'uicon-rmb-circle': "\uE677",
  'uicon-kefu-ermai': "\uE656",
  'uicon-server-fill': "\uE751",
  'uicon-coupon-fill': "\uE8C4",
  'uicon-coupon': "\uE8AE",
  'uicon-integral': "\uE704",
  'uicon-integral-fill': "\uE703",
  'uicon-home-fill': "\uE964",
  'uicon-home': "\uE965",
  'uicon-hourglass-half-fill': "\uE966",
  'uicon-hourglass': "\uE967",
  'uicon-account': "\uE628",
  'uicon-plus-people-fill': "\uE626",
  'uicon-minus-people-fill': "\uE615",
  'uicon-account-fill': "\uE614",
  'uicon-thumb-down-fill': "\uE726",
  'uicon-thumb-down': "\uE727",
  'uicon-thumb-up': "\uE733",
  'uicon-thumb-up-fill': "\uE72F",
  'uicon-lock-fill': "\uE979",
  'uicon-lock-open': "\uE973",
  'uicon-lock-opened-fill': "\uE974",
  'uicon-lock': "\uE97A",
  'uicon-red-packet-fill': "\uE690",
  'uicon-photo-fill': "\uE98B",
  'uicon-photo': "\uE98D",
  'uicon-volume-off-fill': "\uE659",
  'uicon-volume-off': "\uE644",
  'uicon-volume-fill': "\uE670",
  'uicon-volume': "\uE633",
  'uicon-red-packet': "\uE691",
  'uicon-download': "\uE63C",
  'uicon-arrow-up-fill': "\uE6B0",
  'uicon-arrow-down-fill': "\uE600",
  'uicon-play-left-fill': "\uE675",
  'uicon-play-right-fill': "\uE676",
  'uicon-rewind-left-fill': "\uE679",
  'uicon-rewind-right-fill': "\uE67A",
  'uicon-arrow-downward': "\uE604",
  'uicon-arrow-leftward': "\uE601",
  'uicon-arrow-rightward': "\uE603",
  'uicon-arrow-upward': "\uE607",
  'uicon-arrow-down': "\uE60D",
  'uicon-arrow-right': "\uE605",
  'uicon-arrow-left': "\uE60E",
  'uicon-arrow-up': "\uE606",
  'uicon-skip-back-left': "\uE674",
  'uicon-skip-forward-right': "\uE672",
  'uicon-rewind-right': "\uE66F",
  'uicon-rewind-left': "\uE671",
  'uicon-arrow-right-double': "\uE68D",
  'uicon-arrow-left-double': "\uE68C",
  'uicon-wifi-off': "\uE668",
  'uicon-wifi': "\uE667",
  'uicon-empty-data': "\uE62F",
  'uicon-empty-history': "\uE684",
  'uicon-empty-list': "\uE68B",
  'uicon-empty-page': "\uE627",
  'uicon-empty-order': "\uE639",
  'uicon-man': "\uE697",
  'uicon-woman': "\uE69C",
  'uicon-man-add': "\uE61C",
  'uicon-man-add-fill': "\uE64C",
  'uicon-man-delete': "\uE61A",
  'uicon-man-delete-fill': "\uE66A",
  'uicon-zh': "\uE70A",
  'uicon-en': "\uE692"
};
exports.default = _default;

/***/ }),
/* 290 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-icon/props.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图标类名
    name: {
      type: String,
      default: uni.$u.props.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: uni.$u.props.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: uni.$u.props.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: uni.$u.props.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: uni.$u.props.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: uni.$u.props.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: uni.$u.props.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: uni.$u.props.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: uni.$u.props.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: uni.$u.props.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: uni.$u.props.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: uni.$u.props.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: uni.$u.props.icon.stop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-sticky/props.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [String, Number],
      default: uni.$u.props.sticky.offsetTop
    },
    // 自定义导航栏的高度
    customNavHeight: {
      type: [String, Number],
      default: uni.$u.props.sticky.customNavHeight
    },
    // 是否开启吸顶功能
    disabled: {
      type: Boolean,
      default: uni.$u.props.sticky.disabled
    },
    // 吸顶区域的背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.sticky.bgColor
    },
    // z-index值
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.sticky.zIndex
    },
    // 列表中的索引值
    index: {
      type: [String, Number],
      default: uni.$u.props.sticky.index
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-tabs/props.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 滑块的移动过渡时间，单位ms
    duration: {
      type: Number,
      default: uni.$u.props.tabs.duration
    },
    // tabs标签数组
    list: {
      type: Array,
      default: uni.$u.props.tabs.list
    },
    // 滑块颜色
    lineColor: {
      type: String,
      default: uni.$u.props.tabs.lineColor
    },
    // 菜单选择中时的样式
    activeStyle: {
      type: [String, Object],
      default: uni.$u.props.tabs.activeStyle
    },
    // 菜单非选中时的样式
    inactiveStyle: {
      type: [String, Object],
      default: uni.$u.props.tabs.inactiveStyle
    },
    // 滑块长度
    lineWidth: {
      type: [String, Number],
      default: uni.$u.props.tabs.lineWidth
    },
    // 滑块高度
    lineHeight: {
      type: [String, Number],
      default: uni.$u.props.tabs.lineHeight
    },
    // 滑块背景显示大小，当滑块背景设置为图片时使用
    lineBgSize: {
      type: String,
      default: uni.$u.props.tabs.lineBgSize
    },
    // 菜单item的样式
    itemStyle: {
      type: [String, Object],
      default: uni.$u.props.tabs.itemStyle
    },
    // 菜单是否可滚动
    scrollable: {
      type: Boolean,
      default: uni.$u.props.tabs.scrollable
    },
    // 当前选中标签的索引
    current: {
      type: [Number, String],
      default: uni.$u.props.tabs.current
    },
    // 默认读取的键名
    keyName: {
      type: String,
      default: uni.$u.props.tabs.keyName
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */
/*!************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-loadmore/props.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
    status: {
      type: String,
      default: uni.$u.props.loadmore.status
    },
    // 组件背景色
    bgColor: {
      type: String,
      default: uni.$u.props.loadmore.bgColor
    },
    // 是否显示加载中的图标
    icon: {
      type: Boolean,
      default: uni.$u.props.loadmore.icon
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.loadmore.fontSize
    },
    // 图标大小
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.loadmore.iconSize
    },
    // 字体颜色
    color: {
      type: String,
      default: uni.$u.props.loadmore.color
    },
    // 加载中状态的图标，spinner-花朵状图标，circle-圆圈状，semicircle-半圆
    loadingIcon: {
      type: String,
      default: uni.$u.props.loadmore.loadingIcon
    },
    // 加载前的提示语
    loadmoreText: {
      type: String,
      default: uni.$u.props.loadmore.loadmoreText
    },
    // 加载中提示语
    loadingText: {
      type: String,
      default: uni.$u.props.loadmore.loadingText
    },
    // 没有更多的提示语
    nomoreText: {
      type: String,
      default: uni.$u.props.loadmore.nomoreText
    },
    // 在“没有更多”状态下，是否显示粗点
    isDot: {
      type: Boolean,
      default: uni.$u.props.loadmore.isDot
    },
    // 加载中图标的颜色
    iconColor: {
      type: String,
      default: uni.$u.props.loadmore.iconColor
    },
    // 上边距
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.loadmore.marginTop
    },
    // 下边距
    marginBottom: {
      type: [String, Number],
      default: uni.$u.props.loadmore.marginBottom
    },
    // 高度，单位px
    height: {
      type: [String, Number],
      default: uni.$u.props.loadmore.height
    },
    // 是否显示左边分割线
    line: {
      type: Boolean,
      default: uni.$u.props.loadmore.line
    },
    // 线条颜色
    lineColor: {
      type: String,
      default: uni.$u.props.loadmore.lineColor
    },
    // 是否虚线，true-虚线，false-实线
    dashed: {
      type: Boolean,
      default: uni.$u.props.loadmore.dashed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-navbar/props.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否开启顶部安全区适配
    safeAreaInsetTop: {
      type: Boolean,
      default: uni.$u.props.navbar.safeAreaInsetTop
    },
    // 固定在顶部时，是否生成一个等高元素，以防止塌陷
    placeholder: {
      type: Boolean,
      default: uni.$u.props.navbar.placeholder
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      default: uni.$u.props.navbar.fixed
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: uni.$u.props.navbar.border
    },
    // 左边的图标
    leftIcon: {
      type: String,
      default: uni.$u.props.navbar.leftIcon
    },
    // 左边的提示文字
    leftText: {
      type: String,
      default: uni.$u.props.navbar.leftText
    },
    // 左右的提示文字
    rightText: {
      type: String,
      default: uni.$u.props.navbar.rightText
    },
    // 右边的图标
    rightIcon: {
      type: String,
      default: uni.$u.props.navbar.rightIcon
    },
    // 标题
    title: {
      type: [String, Number],
      default: uni.$u.props.navbar.title
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.navbar.bgColor
    },
    // 标题的宽度
    titleWidth: {
      type: [String, Number],
      default: uni.$u.props.navbar.titleWidth
    },
    // 导航栏高度
    height: {
      type: [String, Number],
      default: uni.$u.props.navbar.height
    },
    // 左侧返回图标的大小
    leftIconSize: {
      type: [String, Number],
      default: uni.$u.props.navbar.leftIconSize
    },
    // 左侧返回图标的颜色
    leftIconColor: {
      type: String,
      default: uni.$u.props.navbar.leftIconColor
    },
    // 点击左侧区域(返回图标)，是否自动返回上一页
    autoBack: {
      type: Boolean,
      default: uni.$u.props.navbar.autoBack
    },
    // 标题的样式，对象或字符串
    titleStyle: {
      type: [String, Object],
      default: uni.$u.props.navbar.titleStyle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-radio-group/props.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 绑定的值
    value: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radioGroup.value
    },
    // 是否禁用全部radio
    disabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.disabled
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.radioGroup.shape
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radioGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radioGroup.inactiveColor
    },
    // 标识符
    name: {
      type: String,
      default: uni.$u.props.radioGroup.name
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: uni.$u.props.radioGroup.placement
    },
    // label的文本
    label: {
      type: [String],
      default: uni.$u.props.radioGroup.label
    },
    // label的颜色 （默认 '#303133' ）
    labelColor: {
      type: [String],
      default: uni.$u.props.radioGroup.labelColor
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.labelSize
    },
    // 是否禁止点击文本操作checkbox(默认 false )
    labelDisabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.radioGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.iconSize
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.radioGroup.borderBottom
    },
    // 图标与文字的对齐方式
    iconPlacement: {
      type: String,
      default: uni.$u.props.radio.iconPlacement
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */
/*!*********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-radio/props.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // radio的名称
    name: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radio.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni.$u.props.radio.shape
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.disabled
    },
    // 是否禁止点击提示语选中单选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.labelDisabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radio.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radio.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radio.iconSize
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radio.labelSize
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni.$u.props.radio.label
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni.$u.props.radio.size
    },
    // 图标颜色
    color: {
      type: String,
      default: uni.$u.props.radio.color
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.radio.labelColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-divider/props.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否虚线
    dashed: {
      type: Boolean,
      default: uni.$u.props.divider.dashed
    },
    // 是否细线
    hairline: {
      type: Boolean,
      default: uni.$u.props.divider.hairline
    },
    // 是否以点替代文字，优先于text字段起作用
    dot: {
      type: Boolean,
      default: uni.$u.props.divider.dot
    },
    // 内容文本的位置，left-左边，center-中间，right-右边
    textPosition: {
      type: String,
      default: uni.$u.props.divider.textPosition
    },
    // 文本内容
    text: {
      type: [String, Number],
      default: uni.$u.props.divider.text
    },
    // 文本大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.divider.textSize
    },
    // 文本颜色
    textColor: {
      type: String,
      default: uni.$u.props.divider.textColor
    },
    // 线条颜色
    lineColor: {
      type: String,
      default: uni.$u.props.divider.lineColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-cell/props.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = {
  props: {
    // 标题
    title: {
      type: [String, Number],
      default: uni.$u.props.cell.title
    },
    // 标题下方的描述信息
    label: {
      type: [String, Number],
      default: uni.$u.props.cell.label
    },
    // 右侧的内容
    value: {
      type: [String, Number],
      default: uni.$u.props.cell.value
    },
    // 左侧图标名称，或者图片链接(本地文件建议使用绝对地址)
    icon: {
      type: String,
      default: uni.$u.props.cell.icon
    },
    // 是否禁用cell
    disabled: {
      type: Boolean,
      default: uni.$u.props.cell.disabled
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: uni.$u.props.cell.border
    },
    // 内容是否垂直居中(主要是针对右侧的value部分)
    center: {
      type: Boolean,
      default: uni.$u.props.cell.center
    },
    // 点击后跳转的URL地址
    url: {
      type: String,
      default: uni.$u.props.cell.url
    },
    // 链接跳转的方式，内部使用的是uView封装的route方法，可能会进行拦截操作
    linkType: {
      type: String,
      default: uni.$u.props.cell.linkType
    },
    // 是否开启点击反馈(表现为点击时加上灰色背景)
    clickable: {
      type: Boolean,
      default: uni.$u.props.cell.clickable
    },
    // 是否展示右侧箭头并开启点击反馈
    isLink: {
      type: Boolean,
      default: uni.$u.props.cell.isLink
    },
    // 是否显示表单状态下的必填星号(此组件可能会内嵌入input组件)
    required: {
      type: Boolean,
      default: uni.$u.props.cell.required
    },
    // 右侧的图标箭头
    rightIcon: {
      type: String,
      default: uni.$u.props.cell.rightIcon
    },
    // 右侧箭头的方向，可选值为：left，up，down
    arrowDirection: {
      type: String,
      default: uni.$u.props.cell.arrowDirection
    },
    // 左侧图标样式
    iconStyle: {
      type: [Object, String],
      default: function _default() {
        return uni.$u.props.cell.iconStyle;
      }
    },
    // 右侧箭头图标的样式
    rightIconStyle: {
      type: [Object, String],
      default: function _default() {
        return uni.$u.props.cell.rightIconStyle;
      }
    },
    // 标题的样式
    titleStyle: {
      type: [Object, String],
      default: function _default() {
        return uni.$u.props.cell.titleStyle;
      }
    },
    // 单位元的大小，可选值为large
    size: {
      type: String,
      default: uni.$u.props.cell.size
    },
    // 点击cell是否阻止事件传播
    stop: {
      type: Boolean,
      default: uni.$u.props.cell.stop
    },
    // 标识符，cell被点击时返回
    name: {
      type: [Number, String],
      default: uni.$u.props.cell.name
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */
/*!*************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/address-picker/province-city-county.json ***!
  \*************************************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"areaId\":1,\"areaType\":0,\"children\":[{\"areaId\":110000,\"areaType\":1,\"children\":[{\"areaId\":110101,\"areaType\":2,\"name\":\"东城区\",\"parentAreaId\":110000},{\"areaId\":110102,\"areaType\":2,\"name\":\"西城区\",\"parentAreaId\":110000},{\"areaId\":110105,\"areaType\":2,\"name\":\"朝阳区\",\"parentAreaId\":110000},{\"areaId\":110106,\"areaType\":2,\"name\":\"丰台区\",\"parentAreaId\":110000},{\"areaId\":110107,\"areaType\":2,\"name\":\"石景山区\",\"parentAreaId\":110000},{\"areaId\":110108,\"areaType\":2,\"name\":\"海淀区\",\"parentAreaId\":110000},{\"areaId\":110109,\"areaType\":2,\"name\":\"门头沟区\",\"parentAreaId\":110000},{\"areaId\":110111,\"areaType\":2,\"name\":\"房山区\",\"parentAreaId\":110000},{\"areaId\":110112,\"areaType\":2,\"name\":\"通州区\",\"parentAreaId\":110000},{\"areaId\":110113,\"areaType\":2,\"name\":\"顺义区\",\"parentAreaId\":110000},{\"areaId\":110114,\"areaType\":2,\"name\":\"昌平区\",\"parentAreaId\":110000},{\"areaId\":110115,\"areaType\":2,\"name\":\"大兴区\",\"parentAreaId\":110000},{\"areaId\":110116,\"areaType\":2,\"name\":\"怀柔区\",\"parentAreaId\":110000},{\"areaId\":110117,\"areaType\":2,\"name\":\"平谷区\",\"parentAreaId\":110000},{\"areaId\":110118,\"areaType\":2,\"name\":\"密云区\",\"parentAreaId\":110000},{\"areaId\":110119,\"areaType\":2,\"name\":\"延庆区\",\"parentAreaId\":110000}],\"name\":\"北京市\",\"parentAreaId\":1}],\"name\":\"北京市\",\"parentAreaId\":0},{\"areaId\":2,\"areaType\":0,\"children\":[{\"areaId\":120000,\"areaType\":1,\"children\":[{\"areaId\":120101,\"areaType\":2,\"name\":\"和平区\",\"parentAreaId\":120000},{\"areaId\":120102,\"areaType\":2,\"name\":\"河东区\",\"parentAreaId\":120000},{\"areaId\":120103,\"areaType\":2,\"name\":\"河西区\",\"parentAreaId\":120000},{\"areaId\":120104,\"areaType\":2,\"name\":\"南开区\",\"parentAreaId\":120000},{\"areaId\":120105,\"areaType\":2,\"name\":\"河北区\",\"parentAreaId\":120000},{\"areaId\":120106,\"areaType\":2,\"name\":\"红桥区\",\"parentAreaId\":120000},{\"areaId\":120110,\"areaType\":2,\"name\":\"东丽区\",\"parentAreaId\":120000},{\"areaId\":120111,\"areaType\":2,\"name\":\"西青区\",\"parentAreaId\":120000},{\"areaId\":120112,\"areaType\":2,\"name\":\"津南区\",\"parentAreaId\":120000},{\"areaId\":120113,\"areaType\":2,\"name\":\"北辰区\",\"parentAreaId\":120000},{\"areaId\":120114,\"areaType\":2,\"name\":\"武清区\",\"parentAreaId\":120000},{\"areaId\":120115,\"areaType\":2,\"name\":\"宝坻区\",\"parentAreaId\":120000},{\"areaId\":120116,\"areaType\":2,\"name\":\"滨海新区\",\"parentAreaId\":120000},{\"areaId\":120117,\"areaType\":2,\"name\":\"宁河区\",\"parentAreaId\":120000},{\"areaId\":120118,\"areaType\":2,\"name\":\"静海区\",\"parentAreaId\":120000},{\"areaId\":120119,\"areaType\":2,\"name\":\"蓟州区\",\"parentAreaId\":120000}],\"name\":\"天津市\",\"parentAreaId\":2}],\"name\":\"天津市\",\"parentAreaId\":0},{\"areaId\":3,\"areaType\":0,\"children\":[{\"areaId\":310000,\"areaType\":1,\"children\":[{\"areaId\":310101,\"areaType\":2,\"name\":\"黄浦区\",\"parentAreaId\":310000},{\"areaId\":310104,\"areaType\":2,\"name\":\"徐汇区\",\"parentAreaId\":310000},{\"areaId\":310105,\"areaType\":2,\"name\":\"长宁区\",\"parentAreaId\":310000},{\"areaId\":310106,\"areaType\":2,\"name\":\"静安区\",\"parentAreaId\":310000},{\"areaId\":310107,\"areaType\":2,\"name\":\"普陀区\",\"parentAreaId\":310000},{\"areaId\":310109,\"areaType\":2,\"name\":\"虹口区\",\"parentAreaId\":310000},{\"areaId\":310110,\"areaType\":2,\"name\":\"杨浦区\",\"parentAreaId\":310000},{\"areaId\":310112,\"areaType\":2,\"name\":\"闵行区\",\"parentAreaId\":310000},{\"areaId\":310113,\"areaType\":2,\"name\":\"宝山区\",\"parentAreaId\":310000},{\"areaId\":310114,\"areaType\":2,\"name\":\"嘉定区\",\"parentAreaId\":310000},{\"areaId\":310115,\"areaType\":2,\"name\":\"浦东新区\",\"parentAreaId\":310000},{\"areaId\":310116,\"areaType\":2,\"name\":\"金山区\",\"parentAreaId\":310000},{\"areaId\":310117,\"areaType\":2,\"name\":\"松江区\",\"parentAreaId\":310000},{\"areaId\":310118,\"areaType\":2,\"name\":\"青浦区\",\"parentAreaId\":310000},{\"areaId\":310120,\"areaType\":2,\"name\":\"奉贤区\",\"parentAreaId\":310000},{\"areaId\":310151,\"areaType\":2,\"name\":\"崇明区\",\"parentAreaId\":310000}],\"name\":\"上海市\",\"parentAreaId\":3}],\"name\":\"上海市\",\"parentAreaId\":0},{\"areaId\":4,\"areaType\":0,\"children\":[{\"areaId\":500000,\"areaType\":1,\"children\":[{\"areaId\":500101,\"areaType\":2,\"name\":\"万州区\",\"parentAreaId\":500000},{\"areaId\":500102,\"areaType\":2,\"name\":\"涪陵区\",\"parentAreaId\":500000},{\"areaId\":500103,\"areaType\":2,\"name\":\"渝中区\",\"parentAreaId\":500000},{\"areaId\":500104,\"areaType\":2,\"name\":\"大渡口区\",\"parentAreaId\":500000},{\"areaId\":500105,\"areaType\":2,\"name\":\"江北区\",\"parentAreaId\":500000},{\"areaId\":500106,\"areaType\":2,\"name\":\"沙坪坝区\",\"parentAreaId\":500000},{\"areaId\":500107,\"areaType\":2,\"name\":\"九龙坡区\",\"parentAreaId\":500000},{\"areaId\":500108,\"areaType\":2,\"name\":\"南岸区\",\"parentAreaId\":500000},{\"areaId\":500109,\"areaType\":2,\"name\":\"北碚区\",\"parentAreaId\":500000},{\"areaId\":500110,\"areaType\":2,\"name\":\"綦江区\",\"parentAreaId\":500000},{\"areaId\":500111,\"areaType\":2,\"name\":\"大足区\",\"parentAreaId\":500000},{\"areaId\":500112,\"areaType\":2,\"name\":\"渝北区\",\"parentAreaId\":500000},{\"areaId\":500113,\"areaType\":2,\"name\":\"巴南区\",\"parentAreaId\":500000},{\"areaId\":500114,\"areaType\":2,\"name\":\"黔江区\",\"parentAreaId\":500000},{\"areaId\":500115,\"areaType\":2,\"name\":\"长寿区\",\"parentAreaId\":500000},{\"areaId\":500116,\"areaType\":2,\"name\":\"江津区\",\"parentAreaId\":500000},{\"areaId\":500117,\"areaType\":2,\"name\":\"合川区\",\"parentAreaId\":500000},{\"areaId\":500118,\"areaType\":2,\"name\":\"永川区\",\"parentAreaId\":500000},{\"areaId\":500119,\"areaType\":2,\"name\":\"南川区\",\"parentAreaId\":500000},{\"areaId\":500120,\"areaType\":2,\"name\":\"璧山区\",\"parentAreaId\":500000},{\"areaId\":500151,\"areaType\":2,\"name\":\"铜梁区\",\"parentAreaId\":500000},{\"areaId\":500152,\"areaType\":2,\"name\":\"潼南区\",\"parentAreaId\":500000},{\"areaId\":500153,\"areaType\":2,\"name\":\"荣昌区\",\"parentAreaId\":500000},{\"areaId\":500154,\"areaType\":2,\"name\":\"开州区\",\"parentAreaId\":500000},{\"areaId\":500155,\"areaType\":2,\"name\":\"梁平区\",\"parentAreaId\":500000},{\"areaId\":500156,\"areaType\":2,\"name\":\"武隆区\",\"parentAreaId\":500000},{\"areaId\":500229,\"areaType\":2,\"name\":\"城口县\",\"parentAreaId\":500000},{\"areaId\":500230,\"areaType\":2,\"name\":\"丰都县\",\"parentAreaId\":500000},{\"areaId\":500231,\"areaType\":2,\"name\":\"垫江县\",\"parentAreaId\":500000},{\"areaId\":500233,\"areaType\":2,\"name\":\"忠县\",\"parentAreaId\":500000},{\"areaId\":500235,\"areaType\":2,\"name\":\"云阳县\",\"parentAreaId\":500000},{\"areaId\":500236,\"areaType\":2,\"name\":\"奉节县\",\"parentAreaId\":500000},{\"areaId\":500237,\"areaType\":2,\"name\":\"巫山县\",\"parentAreaId\":500000},{\"areaId\":500238,\"areaType\":2,\"name\":\"巫溪县\",\"parentAreaId\":500000},{\"areaId\":500240,\"areaType\":2,\"name\":\"石柱土家族自治县\",\"parentAreaId\":500000},{\"areaId\":500241,\"areaType\":2,\"name\":\"秀山土家族苗族自治县\",\"parentAreaId\":500000},{\"areaId\":500242,\"areaType\":2,\"name\":\"酉阳土家族苗族自治县\",\"parentAreaId\":500000},{\"areaId\":500243,\"areaType\":2,\"name\":\"彭水苗族土家族自治县\",\"parentAreaId\":500000}],\"name\":\"重庆市\",\"parentAreaId\":4}],\"name\":\"重庆市\",\"parentAreaId\":0},{\"areaId\":8,\"areaType\":0,\"children\":[{\"areaId\":810000,\"areaType\":1,\"children\":[{\"areaId\":810101,\"areaType\":2,\"name\":\"中西区\",\"parentAreaId\":810000},{\"areaId\":810102,\"areaType\":2,\"name\":\"东区\",\"parentAreaId\":810000},{\"areaId\":810103,\"areaType\":2,\"name\":\"九龙城区\",\"parentAreaId\":810000},{\"areaId\":810104,\"areaType\":2,\"name\":\"观塘区\",\"parentAreaId\":810000},{\"areaId\":810105,\"areaType\":2,\"name\":\"南区\",\"parentAreaId\":810000},{\"areaId\":810106,\"areaType\":2,\"name\":\"深水埗区\",\"parentAreaId\":810000},{\"areaId\":810107,\"areaType\":2,\"name\":\"湾仔区\",\"parentAreaId\":810000},{\"areaId\":810108,\"areaType\":2,\"name\":\"黄大仙区\",\"parentAreaId\":810000},{\"areaId\":810109,\"areaType\":2,\"name\":\"油尖旺区\",\"parentAreaId\":810000},{\"areaId\":810110,\"areaType\":2,\"name\":\"离岛区\",\"parentAreaId\":810000},{\"areaId\":810111,\"areaType\":2,\"name\":\"葵青区\",\"parentAreaId\":810000},{\"areaId\":810112,\"areaType\":2,\"name\":\"北区\",\"parentAreaId\":810000},{\"areaId\":810113,\"areaType\":2,\"name\":\"西贡区\",\"parentAreaId\":810000},{\"areaId\":810114,\"areaType\":2,\"name\":\"沙田区\",\"parentAreaId\":810000},{\"areaId\":810115,\"areaType\":2,\"name\":\"屯门区\",\"parentAreaId\":810000},{\"areaId\":810116,\"areaType\":2,\"name\":\"大埔区\",\"parentAreaId\":810000},{\"areaId\":810117,\"areaType\":2,\"name\":\"荃湾区\",\"parentAreaId\":810000},{\"areaId\":810118,\"areaType\":2,\"name\":\"元朗区\",\"parentAreaId\":810000}],\"name\":\"香港特别行政区\",\"parentAreaId\":8}],\"name\":\"香港特别行政区\",\"parentAreaId\":0},{\"areaId\":9,\"areaType\":0,\"children\":[{\"areaId\":820000,\"areaType\":1,\"children\":[{\"areaId\":820101,\"areaType\":2,\"name\":\"澳门半岛\",\"parentAreaId\":820000},{\"areaId\":820102,\"areaType\":2,\"name\":\"凼仔\",\"parentAreaId\":820000},{\"areaId\":820103,\"areaType\":2,\"name\":\"路凼城\",\"parentAreaId\":820000},{\"areaId\":820104,\"areaType\":2,\"name\":\"路环\",\"parentAreaId\":820000}],\"name\":\"澳门特别行政区\",\"parentAreaId\":9}],\"name\":\"澳门特别行政区\",\"parentAreaId\":0},{\"areaId\":10,\"areaType\":0,\"children\":[{\"areaId\":710000,\"areaType\":1,\"children\":[{\"areaId\":710100,\"areaType\":2,\"name\":\"台北市\",\"parentAreaId\":710000},{\"areaId\":710200,\"areaType\":2,\"name\":\"高雄市\",\"parentAreaId\":710000},{\"areaId\":710300,\"areaType\":2,\"name\":\"台南市\",\"parentAreaId\":710000},{\"areaId\":710400,\"areaType\":2,\"name\":\"台中市\",\"parentAreaId\":710000},{\"areaId\":710600,\"areaType\":2,\"name\":\"南投县\",\"parentAreaId\":710000},{\"areaId\":710700,\"areaType\":2,\"name\":\"基隆市\",\"parentAreaId\":710000},{\"areaId\":710800,\"areaType\":2,\"name\":\"新竹市\",\"parentAreaId\":710000},{\"areaId\":710900,\"areaType\":2,\"name\":\"嘉义市\",\"parentAreaId\":710000},{\"areaId\":711100,\"areaType\":2,\"name\":\"新北市\",\"parentAreaId\":710000},{\"areaId\":711200,\"areaType\":2,\"name\":\"宜兰县\",\"parentAreaId\":710000},{\"areaId\":711300,\"areaType\":2,\"name\":\"新竹县\",\"parentAreaId\":710000},{\"areaId\":711400,\"areaType\":2,\"name\":\"桃园市\",\"parentAreaId\":710000},{\"areaId\":711500,\"areaType\":2,\"name\":\"苗栗县\",\"parentAreaId\":710000},{\"areaId\":711700,\"areaType\":2,\"name\":\"彰化县\",\"parentAreaId\":710000},{\"areaId\":711900,\"areaType\":2,\"name\":\"嘉义县\",\"parentAreaId\":710000},{\"areaId\":712100,\"areaType\":2,\"name\":\"云林县\",\"parentAreaId\":710000},{\"areaId\":712400,\"areaType\":2,\"name\":\"屏东县\",\"parentAreaId\":710000},{\"areaId\":712500,\"areaType\":2,\"name\":\"台东县\",\"parentAreaId\":710000},{\"areaId\":712600,\"areaType\":2,\"name\":\"花莲县\",\"parentAreaId\":710000},{\"areaId\":712700,\"areaType\":2,\"name\":\"澎湖县\",\"parentAreaId\":710000}],\"name\":\"台湾省\",\"parentAreaId\":10}],\"name\":\"台湾省\",\"parentAreaId\":0},{\"areaId\":130000,\"areaType\":0,\"children\":[{\"areaId\":130100,\"areaType\":1,\"children\":[{\"areaId\":130102,\"areaType\":2,\"name\":\"长安区\",\"parentAreaId\":130100},{\"areaId\":130104,\"areaType\":2,\"name\":\"桥西区\",\"parentAreaId\":130100},{\"areaId\":130105,\"areaType\":2,\"name\":\"新华区\",\"parentAreaId\":130100},{\"areaId\":130107,\"areaType\":2,\"name\":\"井陉矿区\",\"parentAreaId\":130100},{\"areaId\":130108,\"areaType\":2,\"name\":\"裕华区\",\"parentAreaId\":130100},{\"areaId\":130109,\"areaType\":2,\"name\":\"藁城区\",\"parentAreaId\":130100},{\"areaId\":130110,\"areaType\":2,\"name\":\"鹿泉区\",\"parentAreaId\":130100},{\"areaId\":130111,\"areaType\":2,\"name\":\"栾城区\",\"parentAreaId\":130100},{\"areaId\":130121,\"areaType\":2,\"name\":\"井陉县\",\"parentAreaId\":130100},{\"areaId\":130123,\"areaType\":2,\"name\":\"正定县\",\"parentAreaId\":130100},{\"areaId\":130125,\"areaType\":2,\"name\":\"行唐县\",\"parentAreaId\":130100},{\"areaId\":130126,\"areaType\":2,\"name\":\"灵寿县\",\"parentAreaId\":130100},{\"areaId\":130127,\"areaType\":2,\"name\":\"高邑县\",\"parentAreaId\":130100},{\"areaId\":130128,\"areaType\":2,\"name\":\"深泽县\",\"parentAreaId\":130100},{\"areaId\":130129,\"areaType\":2,\"name\":\"赞皇县\",\"parentAreaId\":130100},{\"areaId\":130130,\"areaType\":2,\"name\":\"无极县\",\"parentAreaId\":130100},{\"areaId\":130131,\"areaType\":2,\"name\":\"平山县\",\"parentAreaId\":130100},{\"areaId\":130132,\"areaType\":2,\"name\":\"元氏县\",\"parentAreaId\":130100},{\"areaId\":130133,\"areaType\":2,\"name\":\"赵县\",\"parentAreaId\":130100},{\"areaId\":130181,\"areaType\":2,\"name\":\"辛集市\",\"parentAreaId\":130100},{\"areaId\":130183,\"areaType\":2,\"name\":\"晋州市\",\"parentAreaId\":130100},{\"areaId\":130184,\"areaType\":2,\"name\":\"新乐市\",\"parentAreaId\":130100}],\"name\":\"石家庄市\",\"parentAreaId\":130000},{\"areaId\":130200,\"areaType\":1,\"children\":[{\"areaId\":130202,\"areaType\":2,\"name\":\"路南区\",\"parentAreaId\":130200},{\"areaId\":130203,\"areaType\":2,\"name\":\"路北区\",\"parentAreaId\":130200},{\"areaId\":130204,\"areaType\":2,\"name\":\"古冶区\",\"parentAreaId\":130200},{\"areaId\":130205,\"areaType\":2,\"name\":\"开平区\",\"parentAreaId\":130200},{\"areaId\":130207,\"areaType\":2,\"name\":\"丰南区\",\"parentAreaId\":130200},{\"areaId\":130208,\"areaType\":2,\"name\":\"丰润区\",\"parentAreaId\":130200},{\"areaId\":130209,\"areaType\":2,\"name\":\"曹妃甸区\",\"parentAreaId\":130200},{\"areaId\":130223,\"areaType\":2,\"name\":\"滦县\",\"parentAreaId\":130200},{\"areaId\":130224,\"areaType\":2,\"name\":\"滦南县\",\"parentAreaId\":130200},{\"areaId\":130225,\"areaType\":2,\"name\":\"乐亭县\",\"parentAreaId\":130200},{\"areaId\":130227,\"areaType\":2,\"name\":\"迁西县\",\"parentAreaId\":130200},{\"areaId\":130229,\"areaType\":2,\"name\":\"玉田县\",\"parentAreaId\":130200},{\"areaId\":130281,\"areaType\":2,\"name\":\"遵化市\",\"parentAreaId\":130200},{\"areaId\":130283,\"areaType\":2,\"name\":\"迁安市\",\"parentAreaId\":130200}],\"name\":\"唐山市\",\"parentAreaId\":130000},{\"areaId\":130300,\"areaType\":1,\"children\":[{\"areaId\":130302,\"areaType\":2,\"name\":\"海港区\",\"parentAreaId\":130300},{\"areaId\":130303,\"areaType\":2,\"name\":\"山海关区\",\"parentAreaId\":130300},{\"areaId\":130304,\"areaType\":2,\"name\":\"北戴河区\",\"parentAreaId\":130300},{\"areaId\":130306,\"areaType\":2,\"name\":\"抚宁区\",\"parentAreaId\":130300},{\"areaId\":130321,\"areaType\":2,\"name\":\"青龙满族自治县\",\"parentAreaId\":130300},{\"areaId\":130322,\"areaType\":2,\"name\":\"昌黎县\",\"parentAreaId\":130300},{\"areaId\":130324,\"areaType\":2,\"name\":\"卢龙县\",\"parentAreaId\":130300}],\"name\":\"秦皇岛市\",\"parentAreaId\":130000},{\"areaId\":130400,\"areaType\":1,\"children\":[{\"areaId\":130402,\"areaType\":2,\"name\":\"邯山区\",\"parentAreaId\":130400},{\"areaId\":130403,\"areaType\":2,\"name\":\"丛台区\",\"parentAreaId\":130400},{\"areaId\":130404,\"areaType\":2,\"name\":\"复兴区\",\"parentAreaId\":130400},{\"areaId\":130406,\"areaType\":2,\"name\":\"峰峰矿区\",\"parentAreaId\":130400},{\"areaId\":130407,\"areaType\":2,\"name\":\"肥乡区\",\"parentAreaId\":130400},{\"areaId\":130408,\"areaType\":2,\"name\":\"永年区\",\"parentAreaId\":130400},{\"areaId\":130423,\"areaType\":2,\"name\":\"临漳县\",\"parentAreaId\":130400},{\"areaId\":130424,\"areaType\":2,\"name\":\"成安县\",\"parentAreaId\":130400},{\"areaId\":130425,\"areaType\":2,\"name\":\"大名县\",\"parentAreaId\":130400},{\"areaId\":130426,\"areaType\":2,\"name\":\"涉县\",\"parentAreaId\":130400},{\"areaId\":130427,\"areaType\":2,\"name\":\"磁县\",\"parentAreaId\":130400},{\"areaId\":130430,\"areaType\":2,\"name\":\"邱县\",\"parentAreaId\":130400},{\"areaId\":130431,\"areaType\":2,\"name\":\"鸡泽县\",\"parentAreaId\":130400},{\"areaId\":130432,\"areaType\":2,\"name\":\"广平县\",\"parentAreaId\":130400},{\"areaId\":130433,\"areaType\":2,\"name\":\"馆陶县\",\"parentAreaId\":130400},{\"areaId\":130434,\"areaType\":2,\"name\":\"魏县\",\"parentAreaId\":130400},{\"areaId\":130435,\"areaType\":2,\"name\":\"曲周县\",\"parentAreaId\":130400},{\"areaId\":130481,\"areaType\":2,\"name\":\"武安市\",\"parentAreaId\":130400}],\"name\":\"邯郸市\",\"parentAreaId\":130000},{\"areaId\":130500,\"areaType\":1,\"children\":[{\"areaId\":130502,\"areaType\":2,\"name\":\"桥东区\",\"parentAreaId\":130500},{\"areaId\":130503,\"areaType\":2,\"name\":\"桥西区\",\"parentAreaId\":130500},{\"areaId\":130521,\"areaType\":2,\"name\":\"邢台县\",\"parentAreaId\":130500},{\"areaId\":130522,\"areaType\":2,\"name\":\"临城县\",\"parentAreaId\":130500},{\"areaId\":130523,\"areaType\":2,\"name\":\"内丘县\",\"parentAreaId\":130500},{\"areaId\":130524,\"areaType\":2,\"name\":\"柏乡县\",\"parentAreaId\":130500},{\"areaId\":130525,\"areaType\":2,\"name\":\"隆尧县\",\"parentAreaId\":130500},{\"areaId\":130526,\"areaType\":2,\"name\":\"任县\",\"parentAreaId\":130500},{\"areaId\":130527,\"areaType\":2,\"name\":\"南和县\",\"parentAreaId\":130500},{\"areaId\":130528,\"areaType\":2,\"name\":\"宁晋县\",\"parentAreaId\":130500},{\"areaId\":130529,\"areaType\":2,\"name\":\"巨鹿县\",\"parentAreaId\":130500},{\"areaId\":130530,\"areaType\":2,\"name\":\"新河县\",\"parentAreaId\":130500},{\"areaId\":130531,\"areaType\":2,\"name\":\"广宗县\",\"parentAreaId\":130500},{\"areaId\":130532,\"areaType\":2,\"name\":\"平乡县\",\"parentAreaId\":130500},{\"areaId\":130533,\"areaType\":2,\"name\":\"威县\",\"parentAreaId\":130500},{\"areaId\":130534,\"areaType\":2,\"name\":\"清河县\",\"parentAreaId\":130500},{\"areaId\":130535,\"areaType\":2,\"name\":\"临西县\",\"parentAreaId\":130500},{\"areaId\":130581,\"areaType\":2,\"name\":\"南宫市\",\"parentAreaId\":130500},{\"areaId\":130582,\"areaType\":2,\"name\":\"沙河市\",\"parentAreaId\":130500}],\"name\":\"邢台市\",\"parentAreaId\":130000},{\"areaId\":130600,\"areaType\":1,\"children\":[{\"areaId\":130602,\"areaType\":2,\"name\":\"竞秀区\",\"parentAreaId\":130600},{\"areaId\":130606,\"areaType\":2,\"name\":\"莲池区\",\"parentAreaId\":130600},{\"areaId\":130607,\"areaType\":2,\"name\":\"满城区\",\"parentAreaId\":130600},{\"areaId\":130608,\"areaType\":2,\"name\":\"清苑区\",\"parentAreaId\":130600},{\"areaId\":130609,\"areaType\":2,\"name\":\"徐水区\",\"parentAreaId\":130600},{\"areaId\":130623,\"areaType\":2,\"name\":\"涞水县\",\"parentAreaId\":130600},{\"areaId\":130624,\"areaType\":2,\"name\":\"阜平县\",\"parentAreaId\":130600},{\"areaId\":130626,\"areaType\":2,\"name\":\"定兴县\",\"parentAreaId\":130600},{\"areaId\":130627,\"areaType\":2,\"name\":\"唐县\",\"parentAreaId\":130600},{\"areaId\":130628,\"areaType\":2,\"name\":\"高阳县\",\"parentAreaId\":130600},{\"areaId\":130629,\"areaType\":2,\"name\":\"容城县\",\"parentAreaId\":130600},{\"areaId\":130630,\"areaType\":2,\"name\":\"涞源县\",\"parentAreaId\":130600},{\"areaId\":130631,\"areaType\":2,\"name\":\"望都县\",\"parentAreaId\":130600},{\"areaId\":130632,\"areaType\":2,\"name\":\"安新县\",\"parentAreaId\":130600},{\"areaId\":130633,\"areaType\":2,\"name\":\"易县\",\"parentAreaId\":130600},{\"areaId\":130634,\"areaType\":2,\"name\":\"曲阳县\",\"parentAreaId\":130600},{\"areaId\":130635,\"areaType\":2,\"name\":\"蠡县\",\"parentAreaId\":130600},{\"areaId\":130636,\"areaType\":2,\"name\":\"顺平县\",\"parentAreaId\":130600},{\"areaId\":130637,\"areaType\":2,\"name\":\"博野县\",\"parentAreaId\":130600},{\"areaId\":130638,\"areaType\":2,\"name\":\"雄县\",\"parentAreaId\":130600},{\"areaId\":130681,\"areaType\":2,\"name\":\"涿州市\",\"parentAreaId\":130600},{\"areaId\":130682,\"areaType\":2,\"name\":\"定州市\",\"parentAreaId\":130600},{\"areaId\":130683,\"areaType\":2,\"name\":\"安国市\",\"parentAreaId\":130600},{\"areaId\":130684,\"areaType\":2,\"name\":\"高碑店市\",\"parentAreaId\":130600}],\"name\":\"保定市\",\"parentAreaId\":130000},{\"areaId\":130700,\"areaType\":1,\"children\":[{\"areaId\":130702,\"areaType\":2,\"name\":\"桥东区\",\"parentAreaId\":130700},{\"areaId\":130703,\"areaType\":2,\"name\":\"桥西区\",\"parentAreaId\":130700},{\"areaId\":130705,\"areaType\":2,\"name\":\"宣化区\",\"parentAreaId\":130700},{\"areaId\":130706,\"areaType\":2,\"name\":\"下花园区\",\"parentAreaId\":130700},{\"areaId\":130708,\"areaType\":2,\"name\":\"万全区\",\"parentAreaId\":130700},{\"areaId\":130709,\"areaType\":2,\"name\":\"崇礼区\",\"parentAreaId\":130700},{\"areaId\":130722,\"areaType\":2,\"name\":\"张北县\",\"parentAreaId\":130700},{\"areaId\":130723,\"areaType\":2,\"name\":\"康保县\",\"parentAreaId\":130700},{\"areaId\":130724,\"areaType\":2,\"name\":\"沽源县\",\"parentAreaId\":130700},{\"areaId\":130725,\"areaType\":2,\"name\":\"尚义县\",\"parentAreaId\":130700},{\"areaId\":130726,\"areaType\":2,\"name\":\"蔚县\",\"parentAreaId\":130700},{\"areaId\":130727,\"areaType\":2,\"name\":\"阳原县\",\"parentAreaId\":130700},{\"areaId\":130728,\"areaType\":2,\"name\":\"怀安县\",\"parentAreaId\":130700},{\"areaId\":130730,\"areaType\":2,\"name\":\"怀来县\",\"parentAreaId\":130700},{\"areaId\":130731,\"areaType\":2,\"name\":\"涿鹿县\",\"parentAreaId\":130700},{\"areaId\":130732,\"areaType\":2,\"name\":\"赤城县\",\"parentAreaId\":130700}],\"name\":\"张家口市\",\"parentAreaId\":130000},{\"areaId\":130800,\"areaType\":1,\"children\":[{\"areaId\":130802,\"areaType\":2,\"name\":\"双桥区\",\"parentAreaId\":130800},{\"areaId\":130803,\"areaType\":2,\"name\":\"双滦区\",\"parentAreaId\":130800},{\"areaId\":130804,\"areaType\":2,\"name\":\"鹰手营子矿区\",\"parentAreaId\":130800},{\"areaId\":130821,\"areaType\":2,\"name\":\"承德县\",\"parentAreaId\":130800},{\"areaId\":130822,\"areaType\":2,\"name\":\"兴隆县\",\"parentAreaId\":130800},{\"areaId\":130824,\"areaType\":2,\"name\":\"滦平县\",\"parentAreaId\":130800},{\"areaId\":130825,\"areaType\":2,\"name\":\"隆化县\",\"parentAreaId\":130800},{\"areaId\":130826,\"areaType\":2,\"name\":\"丰宁满族自治县\",\"parentAreaId\":130800},{\"areaId\":130827,\"areaType\":2,\"name\":\"宽城满族自治县\",\"parentAreaId\":130800},{\"areaId\":130828,\"areaType\":2,\"name\":\"围场满族蒙古族自治县\",\"parentAreaId\":130800},{\"areaId\":130881,\"areaType\":2,\"name\":\"平泉市\",\"parentAreaId\":130800}],\"name\":\"承德市\",\"parentAreaId\":130000},{\"areaId\":130900,\"areaType\":1,\"children\":[{\"areaId\":130902,\"areaType\":2,\"name\":\"新华区\",\"parentAreaId\":130900},{\"areaId\":130903,\"areaType\":2,\"name\":\"运河区\",\"parentAreaId\":130900},{\"areaId\":130921,\"areaType\":2,\"name\":\"沧县\",\"parentAreaId\":130900},{\"areaId\":130922,\"areaType\":2,\"name\":\"青县\",\"parentAreaId\":130900},{\"areaId\":130923,\"areaType\":2,\"name\":\"东光县\",\"parentAreaId\":130900},{\"areaId\":130924,\"areaType\":2,\"name\":\"海兴县\",\"parentAreaId\":130900},{\"areaId\":130925,\"areaType\":2,\"name\":\"盐山县\",\"parentAreaId\":130900},{\"areaId\":130926,\"areaType\":2,\"name\":\"肃宁县\",\"parentAreaId\":130900},{\"areaId\":130927,\"areaType\":2,\"name\":\"南皮县\",\"parentAreaId\":130900},{\"areaId\":130928,\"areaType\":2,\"name\":\"吴桥县\",\"parentAreaId\":130900},{\"areaId\":130929,\"areaType\":2,\"name\":\"献县\",\"parentAreaId\":130900},{\"areaId\":130930,\"areaType\":2,\"name\":\"孟村回族自治县\",\"parentAreaId\":130900},{\"areaId\":130981,\"areaType\":2,\"name\":\"泊头市\",\"parentAreaId\":130900},{\"areaId\":130982,\"areaType\":2,\"name\":\"任丘市\",\"parentAreaId\":130900},{\"areaId\":130983,\"areaType\":2,\"name\":\"黄骅市\",\"parentAreaId\":130900},{\"areaId\":130984,\"areaType\":2,\"name\":\"河间市\",\"parentAreaId\":130900}],\"name\":\"沧州市\",\"parentAreaId\":130000},{\"areaId\":131000,\"areaType\":1,\"children\":[{\"areaId\":131002,\"areaType\":2,\"name\":\"安次区\",\"parentAreaId\":131000},{\"areaId\":131003,\"areaType\":2,\"name\":\"广阳区\",\"parentAreaId\":131000},{\"areaId\":131022,\"areaType\":2,\"name\":\"固安县\",\"parentAreaId\":131000},{\"areaId\":131023,\"areaType\":2,\"name\":\"永清县\",\"parentAreaId\":131000},{\"areaId\":131024,\"areaType\":2,\"name\":\"香河县\",\"parentAreaId\":131000},{\"areaId\":131025,\"areaType\":2,\"name\":\"大城县\",\"parentAreaId\":131000},{\"areaId\":131026,\"areaType\":2,\"name\":\"文安县\",\"parentAreaId\":131000},{\"areaId\":131028,\"areaType\":2,\"name\":\"大厂回族自治县\",\"parentAreaId\":131000},{\"areaId\":131081,\"areaType\":2,\"name\":\"霸州市\",\"parentAreaId\":131000},{\"areaId\":131082,\"areaType\":2,\"name\":\"三河市\",\"parentAreaId\":131000}],\"name\":\"廊坊市\",\"parentAreaId\":130000},{\"areaId\":131100,\"areaType\":1,\"children\":[{\"areaId\":131102,\"areaType\":2,\"name\":\"桃城区\",\"parentAreaId\":131100},{\"areaId\":131103,\"areaType\":2,\"name\":\"冀州区\",\"parentAreaId\":131100},{\"areaId\":131121,\"areaType\":2,\"name\":\"枣强县\",\"parentAreaId\":131100},{\"areaId\":131122,\"areaType\":2,\"name\":\"武邑县\",\"parentAreaId\":131100},{\"areaId\":131123,\"areaType\":2,\"name\":\"武强县\",\"parentAreaId\":131100},{\"areaId\":131124,\"areaType\":2,\"name\":\"饶阳县\",\"parentAreaId\":131100},{\"areaId\":131125,\"areaType\":2,\"name\":\"安平县\",\"parentAreaId\":131100},{\"areaId\":131126,\"areaType\":2,\"name\":\"故城县\",\"parentAreaId\":131100},{\"areaId\":131127,\"areaType\":2,\"name\":\"景县\",\"parentAreaId\":131100},{\"areaId\":131128,\"areaType\":2,\"name\":\"阜城县\",\"parentAreaId\":131100},{\"areaId\":131182,\"areaType\":2,\"name\":\"深州市\",\"parentAreaId\":131100}],\"name\":\"衡水市\",\"parentAreaId\":130000}],\"name\":\"河北省\",\"parentAreaId\":0},{\"areaId\":140000,\"areaType\":0,\"children\":[{\"areaId\":140100,\"areaType\":1,\"children\":[{\"areaId\":140105,\"areaType\":2,\"name\":\"小店区\",\"parentAreaId\":140100},{\"areaId\":140106,\"areaType\":2,\"name\":\"迎泽区\",\"parentAreaId\":140100},{\"areaId\":140107,\"areaType\":2,\"name\":\"杏花岭区\",\"parentAreaId\":140100},{\"areaId\":140108,\"areaType\":2,\"name\":\"尖草坪区\",\"parentAreaId\":140100},{\"areaId\":140109,\"areaType\":2,\"name\":\"万柏林区\",\"parentAreaId\":140100},{\"areaId\":140110,\"areaType\":2,\"name\":\"晋源区\",\"parentAreaId\":140100},{\"areaId\":140121,\"areaType\":2,\"name\":\"清徐县\",\"parentAreaId\":140100},{\"areaId\":140122,\"areaType\":2,\"name\":\"阳曲县\",\"parentAreaId\":140100},{\"areaId\":140123,\"areaType\":2,\"name\":\"娄烦县\",\"parentAreaId\":140100},{\"areaId\":140181,\"areaType\":2,\"name\":\"古交市\",\"parentAreaId\":140100}],\"name\":\"太原市\",\"parentAreaId\":140000},{\"areaId\":140200,\"areaType\":1,\"children\":[{\"areaId\":140212,\"areaType\":2,\"name\":\"新荣区\",\"parentAreaId\":140200},{\"areaId\":140213,\"areaType\":2,\"name\":\"平城区\",\"parentAreaId\":140200},{\"areaId\":140214,\"areaType\":2,\"name\":\"云冈区\",\"parentAreaId\":140200},{\"areaId\":140215,\"areaType\":2,\"name\":\"云州区\",\"parentAreaId\":140200},{\"areaId\":140221,\"areaType\":2,\"name\":\"阳高县\",\"parentAreaId\":140200},{\"areaId\":140222,\"areaType\":2,\"name\":\"天镇县\",\"parentAreaId\":140200},{\"areaId\":140223,\"areaType\":2,\"name\":\"广灵县\",\"parentAreaId\":140200},{\"areaId\":140224,\"areaType\":2,\"name\":\"灵丘县\",\"parentAreaId\":140200},{\"areaId\":140225,\"areaType\":2,\"name\":\"浑源县\",\"parentAreaId\":140200},{\"areaId\":140226,\"areaType\":2,\"name\":\"左云县\",\"parentAreaId\":140200}],\"name\":\"大同市\",\"parentAreaId\":140000},{\"areaId\":140300,\"areaType\":1,\"children\":[{\"areaId\":140302,\"areaType\":2,\"name\":\"城区\",\"parentAreaId\":140300},{\"areaId\":140303,\"areaType\":2,\"name\":\"矿区\",\"parentAreaId\":140300},{\"areaId\":140311,\"areaType\":2,\"name\":\"郊区\",\"parentAreaId\":140300},{\"areaId\":140321,\"areaType\":2,\"name\":\"平定县\",\"parentAreaId\":140300},{\"areaId\":140322,\"areaType\":2,\"name\":\"盂县\",\"parentAreaId\":140300}],\"name\":\"阳泉市\",\"parentAreaId\":140000},{\"areaId\":140400,\"areaType\":1,\"children\":[{\"areaId\":140402,\"areaType\":2,\"name\":\"城区\",\"parentAreaId\":140400},{\"areaId\":140411,\"areaType\":2,\"name\":\"郊区\",\"parentAreaId\":140400},{\"areaId\":140421,\"areaType\":2,\"name\":\"长治县\",\"parentAreaId\":140400},{\"areaId\":140423,\"areaType\":2,\"name\":\"襄垣县\",\"parentAreaId\":140400},{\"areaId\":140424,\"areaType\":2,\"name\":\"屯留县\",\"parentAreaId\":140400},{\"areaId\":140425,\"areaType\":2,\"name\":\"平顺县\",\"parentAreaId\":140400},{\"areaId\":140426,\"areaType\":2,\"name\":\"黎城县\",\"parentAreaId\":140400},{\"areaId\":140427,\"areaType\":2,\"name\":\"壶关县\",\"parentAreaId\":140400},{\"areaId\":140428,\"areaType\":2,\"name\":\"长子县\",\"parentAreaId\":140400},{\"areaId\":140429,\"areaType\":2,\"name\":\"武乡县\",\"parentAreaId\":140400},{\"areaId\":140430,\"areaType\":2,\"name\":\"沁县\",\"parentAreaId\":140400},{\"areaId\":140431,\"areaType\":2,\"name\":\"沁源县\",\"parentAreaId\":140400},{\"areaId\":140481,\"areaType\":2,\"name\":\"潞城市\",\"parentAreaId\":140400}],\"name\":\"长治市\",\"parentAreaId\":140000},{\"areaId\":140500,\"areaType\":1,\"children\":[{\"areaId\":140502,\"areaType\":2,\"name\":\"城区\",\"parentAreaId\":140500},{\"areaId\":140521,\"areaType\":2,\"name\":\"沁水县\",\"parentAreaId\":140500},{\"areaId\":140522,\"areaType\":2,\"name\":\"阳城县\",\"parentAreaId\":140500},{\"areaId\":140524,\"areaType\":2,\"name\":\"陵川县\",\"parentAreaId\":140500},{\"areaId\":140525,\"areaType\":2,\"name\":\"泽州县\",\"parentAreaId\":140500},{\"areaId\":140581,\"areaType\":2,\"name\":\"高平市\",\"parentAreaId\":140500}],\"name\":\"晋城市\",\"parentAreaId\":140000},{\"areaId\":140600,\"areaType\":1,\"children\":[{\"areaId\":140602,\"areaType\":2,\"name\":\"朔城区\",\"parentAreaId\":140600},{\"areaId\":140603,\"areaType\":2,\"name\":\"平鲁区\",\"parentAreaId\":140600},{\"areaId\":140621,\"areaType\":2,\"name\":\"山阴县\",\"parentAreaId\":140600},{\"areaId\":140622,\"areaType\":2,\"name\":\"应县\",\"parentAreaId\":140600},{\"areaId\":140623,\"areaType\":2,\"name\":\"右玉县\",\"parentAreaId\":140600},{\"areaId\":140681,\"areaType\":2,\"name\":\"怀仁市\",\"parentAreaId\":140600}],\"name\":\"朔州市\",\"parentAreaId\":140000},{\"areaId\":140700,\"areaType\":1,\"children\":[{\"areaId\":140702,\"areaType\":2,\"name\":\"榆次区\",\"parentAreaId\":140700},{\"areaId\":140721,\"areaType\":2,\"name\":\"榆社县\",\"parentAreaId\":140700},{\"areaId\":140722,\"areaType\":2,\"name\":\"左权县\",\"parentAreaId\":140700},{\"areaId\":140723,\"areaType\":2,\"name\":\"和顺县\",\"parentAreaId\":140700},{\"areaId\":140724,\"areaType\":2,\"name\":\"昔阳县\",\"parentAreaId\":140700},{\"areaId\":140725,\"areaType\":2,\"name\":\"寿阳县\",\"parentAreaId\":140700},{\"areaId\":140726,\"areaType\":2,\"name\":\"太谷县\",\"parentAreaId\":140700},{\"areaId\":140727,\"areaType\":2,\"name\":\"祁县\",\"parentAreaId\":140700},{\"areaId\":140728,\"areaType\":2,\"name\":\"平遥县\",\"parentAreaId\":140700},{\"areaId\":140729,\"areaType\":2,\"name\":\"灵石县\",\"parentAreaId\":140700},{\"areaId\":140781,\"areaType\":2,\"name\":\"介休市\",\"parentAreaId\":140700}],\"name\":\"晋中市\",\"parentAreaId\":140000},{\"areaId\":140800,\"areaType\":1,\"children\":[{\"areaId\":140802,\"areaType\":2,\"name\":\"盐湖区\",\"parentAreaId\":140800},{\"areaId\":140821,\"areaType\":2,\"name\":\"临猗县\",\"parentAreaId\":140800},{\"areaId\":140822,\"areaType\":2,\"name\":\"万荣县\",\"parentAreaId\":140800},{\"areaId\":140823,\"areaType\":2,\"name\":\"闻喜县\",\"parentAreaId\":140800},{\"areaId\":140824,\"areaType\":2,\"name\":\"稷山县\",\"parentAreaId\":140800},{\"areaId\":140825,\"areaType\":2,\"name\":\"新绛县\",\"parentAreaId\":140800},{\"areaId\":140826,\"areaType\":2,\"name\":\"绛县\",\"parentAreaId\":140800},{\"areaId\":140827,\"areaType\":2,\"name\":\"垣曲县\",\"parentAreaId\":140800},{\"areaId\":140828,\"areaType\":2,\"name\":\"夏县\",\"parentAreaId\":140800},{\"areaId\":140829,\"areaType\":2,\"name\":\"平陆县\",\"parentAreaId\":140800},{\"areaId\":140830,\"areaType\":2,\"name\":\"芮城县\",\"parentAreaId\":140800},{\"areaId\":140881,\"areaType\":2,\"name\":\"永济市\",\"parentAreaId\":140800},{\"areaId\":140882,\"areaType\":2,\"name\":\"河津市\",\"parentAreaId\":140800}],\"name\":\"运城市\",\"parentAreaId\":140000},{\"areaId\":140900,\"areaType\":1,\"children\":[{\"areaId\":140902,\"areaType\":2,\"name\":\"忻府区\",\"parentAreaId\":140900},{\"areaId\":140921,\"areaType\":2,\"name\":\"定襄县\",\"parentAreaId\":140900},{\"areaId\":140922,\"areaType\":2,\"name\":\"五台县\",\"parentAreaId\":140900},{\"areaId\":140923,\"areaType\":2,\"name\":\"代县\",\"parentAreaId\":140900},{\"areaId\":140924,\"areaType\":2,\"name\":\"繁峙县\",\"parentAreaId\":140900},{\"areaId\":140925,\"areaType\":2,\"name\":\"宁武县\",\"parentAreaId\":140900},{\"areaId\":140926,\"areaType\":2,\"name\":\"静乐县\",\"parentAreaId\":140900},{\"areaId\":140927,\"areaType\":2,\"name\":\"神池县\",\"parentAreaId\":140900},{\"areaId\":140928,\"areaType\":2,\"name\":\"五寨县\",\"parentAreaId\":140900},{\"areaId\":140929,\"areaType\":2,\"name\":\"岢岚县\",\"parentAreaId\":140900},{\"areaId\":140930,\"areaType\":2,\"name\":\"河曲县\",\"parentAreaId\":140900},{\"areaId\":140931,\"areaType\":2,\"name\":\"保德县\",\"parentAreaId\":140900},{\"areaId\":140932,\"areaType\":2,\"name\":\"偏关县\",\"parentAreaId\":140900},{\"areaId\":140981,\"areaType\":2,\"name\":\"原平市\",\"parentAreaId\":140900}],\"name\":\"忻州市\",\"parentAreaId\":140000},{\"areaId\":141000,\"areaType\":1,\"children\":[{\"areaId\":141002,\"areaType\":2,\"name\":\"尧都区\",\"parentAreaId\":141000},{\"areaId\":141021,\"areaType\":2,\"name\":\"曲沃县\",\"parentAreaId\":141000},{\"areaId\":141022,\"areaType\":2,\"name\":\"翼城县\",\"parentAreaId\":141000},{\"areaId\":141023,\"areaType\":2,\"name\":\"襄汾县\",\"parentAreaId\":141000},{\"areaId\":141024,\"areaType\":2,\"name\":\"洪洞县\",\"parentAreaId\":141000},{\"areaId\":141025,\"areaType\":2,\"name\":\"古县\",\"parentAreaId\":141000},{\"areaId\":141026,\"areaType\":2,\"name\":\"安泽县\",\"parentAreaId\":141000},{\"areaId\":141027,\"areaType\":2,\"name\":\"浮山县\",\"parentAreaId\":141000},{\"areaId\":141028,\"areaType\":2,\"name\":\"吉县\",\"parentAreaId\":141000},{\"areaId\":141029,\"areaType\":2,\"name\":\"乡宁县\",\"parentAreaId\":141000},{\"areaId\":141030,\"areaType\":2,\"name\":\"大宁县\",\"parentAreaId\":141000},{\"areaId\":141031,\"areaType\":2,\"name\":\"隰县\",\"parentAreaId\":141000},{\"areaId\":141032,\"areaType\":2,\"name\":\"永和县\",\"parentAreaId\":141000},{\"areaId\":141033,\"areaType\":2,\"name\":\"蒲县\",\"parentAreaId\":141000},{\"areaId\":141034,\"areaType\":2,\"name\":\"汾西县\",\"parentAreaId\":141000},{\"areaId\":141081,\"areaType\":2,\"name\":\"侯马市\",\"parentAreaId\":141000},{\"areaId\":141082,\"areaType\":2,\"name\":\"霍州市\",\"parentAreaId\":141000}],\"name\":\"临汾市\",\"parentAreaId\":140000},{\"areaId\":141100,\"areaType\":1,\"children\":[{\"areaId\":141102,\"areaType\":2,\"name\":\"离石区\",\"parentAreaId\":141100},{\"areaId\":141121,\"areaType\":2,\"name\":\"文水县\",\"parentAreaId\":141100},{\"areaId\":141122,\"areaType\":2,\"name\":\"交城县\",\"parentAreaId\":141100},{\"areaId\":141123,\"areaType\":2,\"name\":\"兴县\",\"parentAreaId\":141100},{\"areaId\":141124,\"areaType\":2,\"name\":\"临县\",\"parentAreaId\":141100},{\"areaId\":141125,\"areaType\":2,\"name\":\"柳林县\",\"parentAreaId\":141100},{\"areaId\":141126,\"areaType\":2,\"name\":\"石楼县\",\"parentAreaId\":141100},{\"areaId\":141127,\"areaType\":2,\"name\":\"岚县\",\"parentAreaId\":141100},{\"areaId\":141128,\"areaType\":2,\"name\":\"方山县\",\"parentAreaId\":141100},{\"areaId\":141129,\"areaType\":2,\"name\":\"中阳县\",\"parentAreaId\":141100},{\"areaId\":141130,\"areaType\":2,\"name\":\"交口县\",\"parentAreaId\":141100},{\"areaId\":141181,\"areaType\":2,\"name\":\"孝义市\",\"parentAreaId\":141100},{\"areaId\":141182,\"areaType\":2,\"name\":\"汾阳市\",\"parentAreaId\":141100}],\"name\":\"吕梁市\",\"parentAreaId\":140000}],\"name\":\"山西省\",\"parentAreaId\":0},{\"areaId\":150000,\"areaType\":0,\"children\":[{\"areaId\":150100,\"areaType\":1,\"children\":[{\"areaId\":150102,\"areaType\":2,\"name\":\"新城区\",\"parentAreaId\":150100},{\"areaId\":150103,\"areaType\":2,\"name\":\"回民区\",\"parentAreaId\":150100},{\"areaId\":150104,\"areaType\":2,\"name\":\"玉泉区\",\"parentAreaId\":150100},{\"areaId\":150105,\"areaType\":2,\"name\":\"赛罕区\",\"parentAreaId\":150100},{\"areaId\":150121,\"areaType\":2,\"name\":\"土默特左旗\",\"parentAreaId\":150100},{\"areaId\":150122,\"areaType\":2,\"name\":\"托克托县\",\"parentAreaId\":150100},{\"areaId\":150123,\"areaType\":2,\"name\":\"和林格尔县\",\"parentAreaId\":150100},{\"areaId\":150124,\"areaType\":2,\"name\":\"清水河县\",\"parentAreaId\":150100},{\"areaId\":150125,\"areaType\":2,\"name\":\"武川县\",\"parentAreaId\":150100}],\"name\":\"呼和浩特市\",\"parentAreaId\":150000},{\"areaId\":150200,\"areaType\":1,\"children\":[{\"areaId\":150202,\"areaType\":2,\"name\":\"东河区\",\"parentAreaId\":150200},{\"areaId\":150203,\"areaType\":2,\"name\":\"昆都仑区\",\"parentAreaId\":150200},{\"areaId\":150204,\"areaType\":2,\"name\":\"青山区\",\"parentAreaId\":150200},{\"areaId\":150205,\"areaType\":2,\"name\":\"石拐区\",\"parentAreaId\":150200},{\"areaId\":150206,\"areaType\":2,\"name\":\"白云鄂博矿区\",\"parentAreaId\":150200},{\"areaId\":150207,\"areaType\":2,\"name\":\"九原区\",\"parentAreaId\":150200},{\"areaId\":150221,\"areaType\":2,\"name\":\"土默特右旗\",\"parentAreaId\":150200},{\"areaId\":150222,\"areaType\":2,\"name\":\"固阳县\",\"parentAreaId\":150200},{\"areaId\":150223,\"areaType\":2,\"name\":\"达尔罕茂明安联合旗\",\"parentAreaId\":150200}],\"name\":\"包头市\",\"parentAreaId\":150000},{\"areaId\":150300,\"areaType\":1,\"children\":[{\"areaId\":150302,\"areaType\":2,\"name\":\"海勃湾区\",\"parentAreaId\":150300},{\"areaId\":150303,\"areaType\":2,\"name\":\"海南区\",\"parentAreaId\":150300},{\"areaId\":150304,\"areaType\":2,\"name\":\"乌达区\",\"parentAreaId\":150300}],\"name\":\"乌海市\",\"parentAreaId\":150000},{\"areaId\":150400,\"areaType\":1,\"children\":[{\"areaId\":150402,\"areaType\":2,\"name\":\"红山区\",\"parentAreaId\":150400},{\"areaId\":150403,\"areaType\":2,\"name\":\"元宝山区\",\"parentAreaId\":150400},{\"areaId\":150404,\"areaType\":2,\"name\":\"松山区\",\"parentAreaId\":150400},{\"areaId\":150421,\"areaType\":2,\"name\":\"阿鲁科尔沁旗\",\"parentAreaId\":150400},{\"areaId\":150422,\"areaType\":2,\"name\":\"巴林左旗\",\"parentAreaId\":150400},{\"areaId\":150423,\"areaType\":2,\"name\":\"巴林右旗\",\"parentAreaId\":150400},{\"areaId\":150424,\"areaType\":2,\"name\":\"林西县\",\"parentAreaId\":150400},{\"areaId\":150425,\"areaType\":2,\"name\":\"克什克腾旗\",\"parentAreaId\":150400},{\"areaId\":150426,\"areaType\":2,\"name\":\"翁牛特旗\",\"parentAreaId\":150400},{\"areaId\":150428,\"areaType\":2,\"name\":\"喀喇沁旗\",\"parentAreaId\":150400},{\"areaId\":150429,\"areaType\":2,\"name\":\"宁城县\",\"parentAreaId\":150400},{\"areaId\":150430,\"areaType\":2,\"name\":\"敖汉旗\",\"parentAreaId\":150400}],\"name\":\"赤峰市\",\"parentAreaId\":150000},{\"areaId\":150500,\"areaType\":1,\"children\":[{\"areaId\":150502,\"areaType\":2,\"name\":\"科尔沁区\",\"parentAreaId\":150500},{\"areaId\":150521,\"areaType\":2,\"name\":\"科尔沁左翼中旗\",\"parentAreaId\":150500},{\"areaId\":150522,\"areaType\":2,\"name\":\"科尔沁左翼后旗\",\"parentAreaId\":150500},{\"areaId\":150523,\"areaType\":2,\"name\":\"开鲁县\",\"parentAreaId\":150500},{\"areaId\":150524,\"areaType\":2,\"name\":\"库伦旗\",\"parentAreaId\":150500},{\"areaId\":150525,\"areaType\":2,\"name\":\"奈曼旗\",\"parentAreaId\":150500},{\"areaId\":150526,\"areaType\":2,\"name\":\"扎鲁特旗\",\"parentAreaId\":150500},{\"areaId\":150581,\"areaType\":2,\"name\":\"霍林郭勒市\",\"parentAreaId\":150500}],\"name\":\"通辽市\",\"parentAreaId\":150000},{\"areaId\":150600,\"areaType\":1,\"children\":[{\"areaId\":150602,\"areaType\":2,\"name\":\"东胜区\",\"parentAreaId\":150600},{\"areaId\":150603,\"areaType\":2,\"name\":\"康巴什区\",\"parentAreaId\":150600},{\"areaId\":150621,\"areaType\":2,\"name\":\"达拉特旗\",\"parentAreaId\":150600},{\"areaId\":150622,\"areaType\":2,\"name\":\"准格尔旗\",\"parentAreaId\":150600},{\"areaId\":150623,\"areaType\":2,\"name\":\"鄂托克前旗\",\"parentAreaId\":150600},{\"areaId\":150624,\"areaType\":2,\"name\":\"鄂托克旗\",\"parentAreaId\":150600},{\"areaId\":150625,\"areaType\":2,\"name\":\"杭锦旗\",\"parentAreaId\":150600},{\"areaId\":150626,\"areaType\":2,\"name\":\"乌审旗\",\"parentAreaId\":150600},{\"areaId\":150627,\"areaType\":2,\"name\":\"伊金霍洛旗\",\"parentAreaId\":150600}],\"name\":\"鄂尔多斯市\",\"parentAreaId\":150000},{\"areaId\":150700,\"areaType\":1,\"children\":[{\"areaId\":150702,\"areaType\":2,\"name\":\"海拉尔区\",\"parentAreaId\":150700},{\"areaId\":150703,\"areaType\":2,\"name\":\"扎赉诺尔区\",\"parentAreaId\":150700},{\"areaId\":150721,\"areaType\":2,\"name\":\"阿荣旗\",\"parentAreaId\":150700},{\"areaId\":150722,\"areaType\":2,\"name\":\"莫力达瓦达斡尔族自治旗\",\"parentAreaId\":150700},{\"areaId\":150723,\"areaType\":2,\"name\":\"鄂伦春自治旗\",\"parentAreaId\":150700},{\"areaId\":150724,\"areaType\":2,\"name\":\"鄂温克族自治旗\",\"parentAreaId\":150700},{\"areaId\":150725,\"areaType\":2,\"name\":\"陈巴尔虎旗\",\"parentAreaId\":150700},{\"areaId\":150726,\"areaType\":2,\"name\":\"新巴尔虎左旗\",\"parentAreaId\":150700},{\"areaId\":150727,\"areaType\":2,\"name\":\"新巴尔虎右旗\",\"parentAreaId\":150700},{\"areaId\":150781,\"areaType\":2,\"name\":\"满洲里市\",\"parentAreaId\":150700},{\"areaId\":150782,\"areaType\":2,\"name\":\"牙克石市\",\"parentAreaId\":150700},{\"areaId\":150783,\"areaType\":2,\"name\":\"扎兰屯市\",\"parentAreaId\":150700},{\"areaId\":150784,\"areaType\":2,\"name\":\"额尔古纳市\",\"parentAreaId\":150700},{\"areaId\":150785,\"areaType\":2,\"name\":\"根河市\",\"parentAreaId\":150700}],\"name\":\"呼伦贝尔市\",\"parentAreaId\":150000},{\"areaId\":150800,\"areaType\":1,\"children\":[{\"areaId\":150802,\"areaType\":2,\"name\":\"临河区\",\"parentAreaId\":150800},{\"areaId\":150821,\"areaType\":2,\"name\":\"五原县\",\"parentAreaId\":150800},{\"areaId\":150822,\"areaType\":2,\"name\":\"磴口县\",\"parentAreaId\":150800},{\"areaId\":150823,\"areaType\":2,\"name\":\"乌拉特前旗\",\"parentAreaId\":150800},{\"areaId\":150824,\"areaType\":2,\"name\":\"乌拉特中旗\",\"parentAreaId\":150800},{\"areaId\":150825,\"areaType\":2,\"name\":\"乌拉特后旗\",\"parentAreaId\":150800},{\"areaId\":150826,\"areaType\":2,\"name\":\"杭锦后旗\",\"parentAreaId\":150800}],\"name\":\"巴彦淖尔市\",\"parentAreaId\":150000},{\"areaId\":150900,\"areaType\":1,\"children\":[{\"areaId\":150902,\"areaType\":2,\"name\":\"集宁区\",\"parentAreaId\":150900},{\"areaId\":150921,\"areaType\":2,\"name\":\"卓资县\",\"parentAreaId\":150900},{\"areaId\":150922,\"areaType\":2,\"name\":\"化德县\",\"parentAreaId\":150900},{\"areaId\":150923,\"areaType\":2,\"name\":\"商都县\",\"parentAreaId\":150900},{\"areaId\":150924,\"areaType\":2,\"name\":\"兴和县\",\"parentAreaId\":150900},{\"areaId\":150925,\"areaType\":2,\"name\":\"凉城县\",\"parentAreaId\":150900},{\"areaId\":150926,\"areaType\":2,\"name\":\"察哈尔右翼前旗\",\"parentAreaId\":150900},{\"areaId\":150927,\"areaType\":2,\"name\":\"察哈尔右翼中旗\",\"parentAreaId\":150900},{\"areaId\":150928,\"areaType\":2,\"name\":\"察哈尔右翼后旗\",\"parentAreaId\":150900},{\"areaId\":150929,\"areaType\":2,\"name\":\"四子王旗\",\"parentAreaId\":150900},{\"areaId\":150981,\"areaType\":2,\"name\":\"丰镇市\",\"parentAreaId\":150900}],\"name\":\"乌兰察布市\",\"parentAreaId\":150000},{\"areaId\":152200,\"areaType\":1,\"children\":[{\"areaId\":152201,\"areaType\":2,\"name\":\"乌兰浩特市\",\"parentAreaId\":152200},{\"areaId\":152202,\"areaType\":2,\"name\":\"阿尔山市\",\"parentAreaId\":152200},{\"areaId\":152221,\"areaType\":2,\"name\":\"科尔沁右翼前旗\",\"parentAreaId\":152200},{\"areaId\":152222,\"areaType\":2,\"name\":\"科尔沁右翼中旗\",\"parentAreaId\":152200},{\"areaId\":152223,\"areaType\":2,\"name\":\"扎赉特旗\",\"parentAreaId\":152200},{\"areaId\":152224,\"areaType\":2,\"name\":\"突泉县\",\"parentAreaId\":152200}],\"name\":\"兴安盟\",\"parentAreaId\":150000},{\"areaId\":152500,\"areaType\":1,\"children\":[{\"areaId\":152501,\"areaType\":2,\"name\":\"二连浩特市\",\"parentAreaId\":152500},{\"areaId\":152502,\"areaType\":2,\"name\":\"锡林浩特市\",\"parentAreaId\":152500},{\"areaId\":152522,\"areaType\":2,\"name\":\"阿巴嘎旗\",\"parentAreaId\":152500},{\"areaId\":152523,\"areaType\":2,\"name\":\"苏尼特左旗\",\"parentAreaId\":152500},{\"areaId\":152524,\"areaType\":2,\"name\":\"苏尼特右旗\",\"parentAreaId\":152500},{\"areaId\":152525,\"areaType\":2,\"name\":\"东乌珠穆沁旗\",\"parentAreaId\":152500},{\"areaId\":152526,\"areaType\":2,\"name\":\"西乌珠穆沁旗\",\"parentAreaId\":152500},{\"areaId\":152527,\"areaType\":2,\"name\":\"太仆寺旗\",\"parentAreaId\":152500},{\"areaId\":152528,\"areaType\":2,\"name\":\"镶黄旗\",\"parentAreaId\":152500},{\"areaId\":152529,\"areaType\":2,\"name\":\"正镶白旗\",\"parentAreaId\":152500},{\"areaId\":152530,\"areaType\":2,\"name\":\"正蓝旗\",\"parentAreaId\":152500},{\"areaId\":152531,\"areaType\":2,\"name\":\"多伦县\",\"parentAreaId\":152500}],\"name\":\"锡林郭勒盟\",\"parentAreaId\":150000},{\"areaId\":152900,\"areaType\":1,\"children\":[{\"areaId\":152921,\"areaType\":2,\"name\":\"阿拉善左旗\",\"parentAreaId\":152900},{\"areaId\":152922,\"areaType\":2,\"name\":\"阿拉善右旗\",\"parentAreaId\":152900},{\"areaId\":152923,\"areaType\":2,\"name\":\"额济纳旗\",\"parentAreaId\":152900}],\"name\":\"阿拉善盟\",\"parentAreaId\":150000}],\"name\":\"内蒙古自治区\",\"parentAreaId\":0},{\"areaId\":210000,\"areaType\":0,\"children\":[{\"areaId\":210100,\"areaType\":1,\"children\":[{\"areaId\":210102,\"areaType\":2,\"name\":\"和平区\",\"parentAreaId\":210100},{\"areaId\":210103,\"areaType\":2,\"name\":\"沈河区\",\"parentAreaId\":210100},{\"areaId\":210104,\"areaType\":2,\"name\":\"大东区\",\"parentAreaId\":210100},{\"areaId\":210105,\"areaType\":2,\"name\":\"皇姑区\",\"parentAreaId\":210100},{\"areaId\":210106,\"areaType\":2,\"name\":\"铁西区\",\"parentAreaId\":210100},{\"areaId\":210111,\"areaType\":2,\"name\":\"苏家屯区\",\"parentAreaId\":210100},{\"areaId\":210112,\"areaType\":2,\"name\":\"浑南区\",\"parentAreaId\":210100},{\"areaId\":210113,\"areaType\":2,\"name\":\"沈北新区\",\"parentAreaId\":210100},{\"areaId\":210114,\"areaType\":2,\"name\":\"于洪区\",\"parentAreaId\":210100},{\"areaId\":210115,\"areaType\":2,\"name\":\"辽中区\",\"parentAreaId\":210100},{\"areaId\":210123,\"areaType\":2,\"name\":\"康平县\",\"parentAreaId\":210100},{\"areaId\":210124,\"areaType\":2,\"name\":\"法库县\",\"parentAreaId\":210100},{\"areaId\":210181,\"areaType\":2,\"name\":\"新民市\",\"parentAreaId\":210100}],\"name\":\"沈阳市\",\"parentAreaId\":210000},{\"areaId\":210200,\"areaType\":1,\"children\":[{\"areaId\":210202,\"areaType\":2,\"name\":\"中山区\",\"parentAreaId\":210200},{\"areaId\":210203,\"areaType\":2,\"name\":\"西岗区\",\"parentAreaId\":210200},{\"areaId\":210204,\"areaType\":2,\"name\":\"沙河口区\",\"parentAreaId\":210200},{\"areaId\":210211,\"areaType\":2,\"name\":\"甘井子区\",\"parentAreaId\":210200},{\"areaId\":210212,\"areaType\":2,\"name\":\"旅顺口区\",\"parentAreaId\":210200},{\"areaId\":210213,\"areaType\":2,\"name\":\"金州区\",\"parentAreaId\":210200},{\"areaId\":210214,\"areaType\":2,\"name\":\"普兰店区\",\"parentAreaId\":210200},{\"areaId\":210224,\"areaType\":2,\"name\":\"长海县\",\"parentAreaId\":210200},{\"areaId\":210281,\"areaType\":2,\"name\":\"瓦房店市\",\"parentAreaId\":210200},{\"areaId\":210283,\"areaType\":2,\"name\":\"庄河市\",\"parentAreaId\":210200}],\"name\":\"大连市\",\"parentAreaId\":210000},{\"areaId\":210300,\"areaType\":1,\"children\":[{\"areaId\":210302,\"areaType\":2,\"name\":\"铁东区\",\"parentAreaId\":210300},{\"areaId\":210303,\"areaType\":2,\"name\":\"铁西区\",\"parentAreaId\":210300},{\"areaId\":210304,\"areaType\":2,\"name\":\"立山区\",\"parentAreaId\":210300},{\"areaId\":210311,\"areaType\":2,\"name\":\"千山区\",\"parentAreaId\":210300},{\"areaId\":210321,\"areaType\":2,\"name\":\"台安县\",\"parentAreaId\":210300},{\"areaId\":210323,\"areaType\":2,\"name\":\"岫岩满族自治县\",\"parentAreaId\":210300},{\"areaId\":210381,\"areaType\":2,\"name\":\"海城市\",\"parentAreaId\":210300}],\"name\":\"鞍山市\",\"parentAreaId\":210000},{\"areaId\":210400,\"areaType\":1,\"children\":[{\"areaId\":210402,\"areaType\":2,\"name\":\"新抚区\",\"parentAreaId\":210400},{\"areaId\":210403,\"areaType\":2,\"name\":\"东洲区\",\"parentAreaId\":210400},{\"areaId\":210404,\"areaType\":2,\"name\":\"望花区\",\"parentAreaId\":210400},{\"areaId\":210411,\"areaType\":2,\"name\":\"顺城区\",\"parentAreaId\":210400},{\"areaId\":210421,\"areaType\":2,\"name\":\"抚顺县\",\"parentAreaId\":210400},{\"areaId\":210422,\"areaType\":2,\"name\":\"新宾满族自治县\",\"parentAreaId\":210400},{\"areaId\":210423,\"areaType\":2,\"name\":\"清原满族自治县\",\"parentAreaId\":210400}],\"name\":\"抚顺市\",\"parentAreaId\":210000},{\"areaId\":210500,\"areaType\":1,\"children\":[{\"areaId\":210502,\"areaType\":2,\"name\":\"平山区\",\"parentAreaId\":210500},{\"areaId\":210503,\"areaType\":2,\"name\":\"溪湖区\",\"parentAreaId\":210500},{\"areaId\":210504,\"areaType\":2,\"name\":\"明山区\",\"parentAreaId\":210500},{\"areaId\":210505,\"areaType\":2,\"name\":\"南芬区\",\"parentAreaId\":210500},{\"areaId\":210521,\"areaType\":2,\"name\":\"本溪满族自治县\",\"parentAreaId\":210500},{\"areaId\":210522,\"areaType\":2,\"name\":\"桓仁满族自治县\",\"parentAreaId\":210500}],\"name\":\"本溪市\",\"parentAreaId\":210000},{\"areaId\":210600,\"areaType\":1,\"children\":[{\"areaId\":210602,\"areaType\":2,\"name\":\"元宝区\",\"parentAreaId\":210600},{\"areaId\":210603,\"areaType\":2,\"name\":\"振兴区\",\"parentAreaId\":210600},{\"areaId\":210604,\"areaType\":2,\"name\":\"振安区\",\"parentAreaId\":210600},{\"areaId\":210624,\"areaType\":2,\"name\":\"宽甸满族自治县\",\"parentAreaId\":210600},{\"areaId\":210681,\"areaType\":2,\"name\":\"东港市\",\"parentAreaId\":210600},{\"areaId\":210682,\"areaType\":2,\"name\":\"凤城市\",\"parentAreaId\":210600}],\"name\":\"丹东市\",\"parentAreaId\":210000},{\"areaId\":210700,\"areaType\":1,\"children\":[{\"areaId\":210702,\"areaType\":2,\"name\":\"古塔区\",\"parentAreaId\":210700},{\"areaId\":210703,\"areaType\":2,\"name\":\"凌河区\",\"parentAreaId\":210700},{\"areaId\":210711,\"areaType\":2,\"name\":\"太和区\",\"parentAreaId\":210700},{\"areaId\":210726,\"areaType\":2,\"name\":\"黑山县\",\"parentAreaId\":210700},{\"areaId\":210727,\"areaType\":2,\"name\":\"义县\",\"parentAreaId\":210700},{\"areaId\":210781,\"areaType\":2,\"name\":\"凌海市\",\"parentAreaId\":210700},{\"areaId\":210782,\"areaType\":2,\"name\":\"北镇市\",\"parentAreaId\":210700}],\"name\":\"锦州市\",\"parentAreaId\":210000},{\"areaId\":210800,\"areaType\":1,\"children\":[{\"areaId\":210802,\"areaType\":2,\"name\":\"站前区\",\"parentAreaId\":210800},{\"areaId\":210803,\"areaType\":2,\"name\":\"西市区\",\"parentAreaId\":210800},{\"areaId\":210804,\"areaType\":2,\"name\":\"鲅鱼圈区\",\"parentAreaId\":210800},{\"areaId\":210811,\"areaType\":2,\"name\":\"老边区\",\"parentAreaId\":210800},{\"areaId\":210881,\"areaType\":2,\"name\":\"盖州市\",\"parentAreaId\":210800},{\"areaId\":210882,\"areaType\":2,\"name\":\"大石桥市\",\"parentAreaId\":210800}],\"name\":\"营口市\",\"parentAreaId\":210000},{\"areaId\":210900,\"areaType\":1,\"children\":[{\"areaId\":210902,\"areaType\":2,\"name\":\"海州区\",\"parentAreaId\":210900},{\"areaId\":210903,\"areaType\":2,\"name\":\"新邱区\",\"parentAreaId\":210900},{\"areaId\":210904,\"areaType\":2,\"name\":\"太平区\",\"parentAreaId\":210900},{\"areaId\":210905,\"areaType\":2,\"name\":\"清河门区\",\"parentAreaId\":210900},{\"areaId\":210911,\"areaType\":2,\"name\":\"细河区\",\"parentAreaId\":210900},{\"areaId\":210921,\"areaType\":2,\"name\":\"阜新蒙古族自治县\",\"parentAreaId\":210900},{\"areaId\":210922,\"areaType\":2,\"name\":\"彰武县\",\"parentAreaId\":210900}],\"name\":\"阜新市\",\"parentAreaId\":210000},{\"areaId\":211000,\"areaType\":1,\"children\":[{\"areaId\":211002,\"areaType\":2,\"name\":\"白塔区\",\"parentAreaId\":211000},{\"areaId\":211003,\"areaType\":2,\"name\":\"文圣区\",\"parentAreaId\":211000},{\"areaId\":211004,\"areaType\":2,\"name\":\"宏伟区\",\"parentAreaId\":211000},{\"areaId\":211005,\"areaType\":2,\"name\":\"弓长岭区\",\"parentAreaId\":211000},{\"areaId\":211011,\"areaType\":2,\"name\":\"太子河区\",\"parentAreaId\":211000},{\"areaId\":211021,\"areaType\":2,\"name\":\"辽阳县\",\"parentAreaId\":211000},{\"areaId\":211081,\"areaType\":2,\"name\":\"灯塔市\",\"parentAreaId\":211000}],\"name\":\"辽阳市\",\"parentAreaId\":210000},{\"areaId\":211100,\"areaType\":1,\"children\":[{\"areaId\":211102,\"areaType\":2,\"name\":\"双台子区\",\"parentAreaId\":211100},{\"areaId\":211103,\"areaType\":2,\"name\":\"兴隆台区\",\"parentAreaId\":211100},{\"areaId\":211104,\"areaType\":2,\"name\":\"大洼区\",\"parentAreaId\":211100},{\"areaId\":211122,\"areaType\":2,\"name\":\"盘山县\",\"parentAreaId\":211100}],\"name\":\"盘锦市\",\"parentAreaId\":210000},{\"areaId\":211200,\"areaType\":1,\"children\":[{\"areaId\":211202,\"areaType\":2,\"name\":\"银州区\",\"parentAreaId\":211200},{\"areaId\":211204,\"areaType\":2,\"name\":\"清河区\",\"parentAreaId\":211200},{\"areaId\":211221,\"areaType\":2,\"name\":\"铁岭县\",\"parentAreaId\":211200},{\"areaId\":211223,\"areaType\":2,\"name\":\"西丰县\",\"parentAreaId\":211200},{\"areaId\":211224,\"areaType\":2,\"name\":\"昌图县\",\"parentAreaId\":211200},{\"areaId\":211281,\"areaType\":2,\"name\":\"调兵山市\",\"parentAreaId\":211200},{\"areaId\":211282,\"areaType\":2,\"name\":\"开原市\",\"parentAreaId\":211200}],\"name\":\"铁岭市\",\"parentAreaId\":210000},{\"areaId\":211300,\"areaType\":1,\"children\":[{\"areaId\":211302,\"areaType\":2,\"name\":\"双塔区\",\"parentAreaId\":211300},{\"areaId\":211303,\"areaType\":2,\"name\":\"龙城区\",\"parentAreaId\":211300},{\"areaId\":211321,\"areaType\":2,\"name\":\"朝阳县\",\"parentAreaId\":211300},{\"areaId\":211322,\"areaType\":2,\"name\":\"建平县\",\"parentAreaId\":211300},{\"areaId\":211324,\"areaType\":2,\"name\":\"喀喇沁左翼蒙古族自治县\",\"parentAreaId\":211300},{\"areaId\":211381,\"areaType\":2,\"name\":\"北票市\",\"parentAreaId\":211300},{\"areaId\":211382,\"areaType\":2,\"name\":\"凌源市\",\"parentAreaId\":211300}],\"name\":\"朝阳市\",\"parentAreaId\":210000},{\"areaId\":211400,\"areaType\":1,\"children\":[{\"areaId\":211402,\"areaType\":2,\"name\":\"连山区\",\"parentAreaId\":211400},{\"areaId\":211403,\"areaType\":2,\"name\":\"龙港区\",\"parentAreaId\":211400},{\"areaId\":211404,\"areaType\":2,\"name\":\"南票区\",\"parentAreaId\":211400},{\"areaId\":211421,\"areaType\":2,\"name\":\"绥中县\",\"parentAreaId\":211400},{\"areaId\":211422,\"areaType\":2,\"name\":\"建昌县\",\"parentAreaId\":211400},{\"areaId\":211481,\"areaType\":2,\"name\":\"兴城市\",\"parentAreaId\":211400}],\"name\":\"葫芦岛市\",\"parentAreaId\":210000}],\"name\":\"辽宁省\",\"parentAreaId\":0},{\"areaId\":220000,\"areaType\":0,\"children\":[{\"areaId\":220100,\"areaType\":1,\"children\":[{\"areaId\":220102,\"areaType\":2,\"name\":\"南关区\",\"parentAreaId\":220100},{\"areaId\":220103,\"areaType\":2,\"name\":\"宽城区\",\"parentAreaId\":220100},{\"areaId\":220104,\"areaType\":2,\"name\":\"朝阳区\",\"parentAreaId\":220100},{\"areaId\":220105,\"areaType\":2,\"name\":\"二道区\",\"parentAreaId\":220100},{\"areaId\":220106,\"areaType\":2,\"name\":\"绿园区\",\"parentAreaId\":220100},{\"areaId\":220112,\"areaType\":2,\"name\":\"双阳区\",\"parentAreaId\":220100},{\"areaId\":220113,\"areaType\":2,\"name\":\"九台区\",\"parentAreaId\":220100},{\"areaId\":220122,\"areaType\":2,\"name\":\"农安县\",\"parentAreaId\":220100},{\"areaId\":220182,\"areaType\":2,\"name\":\"榆树市\",\"parentAreaId\":220100},{\"areaId\":220183,\"areaType\":2,\"name\":\"德惠市\",\"parentAreaId\":220100}],\"name\":\"长春市\",\"parentAreaId\":220000},{\"areaId\":220200,\"areaType\":1,\"children\":[{\"areaId\":220202,\"areaType\":2,\"name\":\"昌邑区\",\"parentAreaId\":220200},{\"areaId\":220203,\"areaType\":2,\"name\":\"龙潭区\",\"parentAreaId\":220200},{\"areaId\":220204,\"areaType\":2,\"name\":\"船营区\",\"parentAreaId\":220200},{\"areaId\":220211,\"areaType\":2,\"name\":\"丰满区\",\"parentAreaId\":220200},{\"areaId\":220221,\"areaType\":2,\"name\":\"永吉县\",\"parentAreaId\":220200},{\"areaId\":220281,\"areaType\":2,\"name\":\"蛟河市\",\"parentAreaId\":220200},{\"areaId\":220282,\"areaType\":2,\"name\":\"桦甸市\",\"parentAreaId\":220200},{\"areaId\":220283,\"areaType\":2,\"name\":\"舒兰市\",\"parentAreaId\":220200},{\"areaId\":220284,\"areaType\":2,\"name\":\"磐石市\",\"parentAreaId\":220200}],\"name\":\"吉林市\",\"parentAreaId\":220000},{\"areaId\":220300,\"areaType\":1,\"children\":[{\"areaId\":220302,\"areaType\":2,\"name\":\"铁西区\",\"parentAreaId\":220300},{\"areaId\":220303,\"areaType\":2,\"name\":\"铁东区\",\"parentAreaId\":220300},{\"areaId\":220322,\"areaType\":2,\"name\":\"梨树县\",\"parentAreaId\":220300},{\"areaId\":220323,\"areaType\":2,\"name\":\"伊通满族自治县\",\"parentAreaId\":220300},{\"areaId\":220381,\"areaType\":2,\"name\":\"公主岭市\",\"parentAreaId\":220300},{\"areaId\":220382,\"areaType\":2,\"name\":\"双辽市\",\"parentAreaId\":220300}],\"name\":\"四平市\",\"parentAreaId\":220000},{\"areaId\":220400,\"areaType\":1,\"children\":[{\"areaId\":220402,\"areaType\":2,\"name\":\"龙山区\",\"parentAreaId\":220400},{\"areaId\":220403,\"areaType\":2,\"name\":\"西安区\",\"parentAreaId\":220400},{\"areaId\":220421,\"areaType\":2,\"name\":\"东丰县\",\"parentAreaId\":220400},{\"areaId\":220422,\"areaType\":2,\"name\":\"东辽县\",\"parentAreaId\":220400}],\"name\":\"辽源市\",\"parentAreaId\":220000},{\"areaId\":220500,\"areaType\":1,\"children\":[{\"areaId\":220502,\"areaType\":2,\"name\":\"东昌区\",\"parentAreaId\":220500},{\"areaId\":220503,\"areaType\":2,\"name\":\"二道江区\",\"parentAreaId\":220500},{\"areaId\":220521,\"areaType\":2,\"name\":\"通化县\",\"parentAreaId\":220500},{\"areaId\":220523,\"areaType\":2,\"name\":\"辉南县\",\"parentAreaId\":220500},{\"areaId\":220524,\"areaType\":2,\"name\":\"柳河县\",\"parentAreaId\":220500},{\"areaId\":220581,\"areaType\":2,\"name\":\"梅河口市\",\"parentAreaId\":220500},{\"areaId\":220582,\"areaType\":2,\"name\":\"集安市\",\"parentAreaId\":220500}],\"name\":\"通化市\",\"parentAreaId\":220000},{\"areaId\":220600,\"areaType\":1,\"children\":[{\"areaId\":220602,\"areaType\":2,\"name\":\"浑江区\",\"parentAreaId\":220600},{\"areaId\":220605,\"areaType\":2,\"name\":\"江源区\",\"parentAreaId\":220600},{\"areaId\":220621,\"areaType\":2,\"name\":\"抚松县\",\"parentAreaId\":220600},{\"areaId\":220622,\"areaType\":2,\"name\":\"靖宇县\",\"parentAreaId\":220600},{\"areaId\":220623,\"areaType\":2,\"name\":\"长白朝鲜族自治县\",\"parentAreaId\":220600},{\"areaId\":220681,\"areaType\":2,\"name\":\"临江市\",\"parentAreaId\":220600}],\"name\":\"白山市\",\"parentAreaId\":220000},{\"areaId\":220700,\"areaType\":1,\"children\":[{\"areaId\":220702,\"areaType\":2,\"name\":\"宁江区\",\"parentAreaId\":220700},{\"areaId\":220721,\"areaType\":2,\"name\":\"前郭尔罗斯蒙古族自治县\",\"parentAreaId\":220700},{\"areaId\":220722,\"areaType\":2,\"name\":\"长岭县\",\"parentAreaId\":220700},{\"areaId\":220723,\"areaType\":2,\"name\":\"乾安县\",\"parentAreaId\":220700},{\"areaId\":220781,\"areaType\":2,\"name\":\"扶余市\",\"parentAreaId\":220700}],\"name\":\"松原市\",\"parentAreaId\":220000},{\"areaId\":220800,\"areaType\":1,\"children\":[{\"areaId\":220802,\"areaType\":2,\"name\":\"洮北区\",\"parentAreaId\":220800},{\"areaId\":220821,\"areaType\":2,\"name\":\"镇赉县\",\"parentAreaId\":220800},{\"areaId\":220822,\"areaType\":2,\"name\":\"通榆县\",\"parentAreaId\":220800},{\"areaId\":220881,\"areaType\":2,\"name\":\"洮南市\",\"parentAreaId\":220800},{\"areaId\":220882,\"areaType\":2,\"name\":\"大安市\",\"parentAreaId\":220800}],\"name\":\"白城市\",\"parentAreaId\":220000},{\"areaId\":222400,\"areaType\":1,\"children\":[{\"areaId\":222401,\"areaType\":2,\"name\":\"延吉市\",\"parentAreaId\":222400},{\"areaId\":222402,\"areaType\":2,\"name\":\"图们市\",\"parentAreaId\":222400},{\"areaId\":222403,\"areaType\":2,\"name\":\"敦化市\",\"parentAreaId\":222400},{\"areaId\":222404,\"areaType\":2,\"name\":\"珲春市\",\"parentAreaId\":222400},{\"areaId\":222405,\"areaType\":2,\"name\":\"龙井市\",\"parentAreaId\":222400},{\"areaId\":222406,\"areaType\":2,\"name\":\"和龙市\",\"parentAreaId\":222400},{\"areaId\":222424,\"areaType\":2,\"name\":\"汪清县\",\"parentAreaId\":222400},{\"areaId\":222426,\"areaType\":2,\"name\":\"安图县\",\"parentAreaId\":222400}],\"name\":\"延边朝鲜族自治州\",\"parentAreaId\":220000}],\"name\":\"吉林省\",\"parentAreaId\":0},{\"areaId\":230000,\"areaType\":0,\"children\":[{\"areaId\":230100,\"areaType\":1,\"children\":[{\"areaId\":230102,\"areaType\":2,\"name\":\"道里区\",\"parentAreaId\":230100},{\"areaId\":230103,\"areaType\":2,\"name\":\"南岗区\",\"parentAreaId\":230100},{\"areaId\":230104,\"areaType\":2,\"name\":\"道外区\",\"parentAreaId\":230100},{\"areaId\":230108,\"areaType\":2,\"name\":\"平房区\",\"parentAreaId\":230100},{\"areaId\":230109,\"areaType\":2,\"name\":\"松北区\",\"parentAreaId\":230100},{\"areaId\":230110,\"areaType\":2,\"name\":\"香坊区\",\"parentAreaId\":230100},{\"areaId\":230111,\"areaType\":2,\"name\":\"呼兰区\",\"parentAreaId\":230100},{\"areaId\":230112,\"areaType\":2,\"name\":\"阿城区\",\"parentAreaId\":230100},{\"areaId\":230113,\"areaType\":2,\"name\":\"双城区\",\"parentAreaId\":230100},{\"areaId\":230123,\"areaType\":2,\"name\":\"依兰县\",\"parentAreaId\":230100},{\"areaId\":230124,\"areaType\":2,\"name\":\"方正县\",\"parentAreaId\":230100},{\"areaId\":230125,\"areaType\":2,\"name\":\"宾县\",\"parentAreaId\":230100},{\"areaId\":230126,\"areaType\":2,\"name\":\"巴彦县\",\"parentAreaId\":230100},{\"areaId\":230127,\"areaType\":2,\"name\":\"木兰县\",\"parentAreaId\":230100},{\"areaId\":230128,\"areaType\":2,\"name\":\"通河县\",\"parentAreaId\":230100},{\"areaId\":230129,\"areaType\":2,\"name\":\"延寿县\",\"parentAreaId\":230100},{\"areaId\":230183,\"areaType\":2,\"name\":\"尚志市\",\"parentAreaId\":230100},{\"areaId\":230184,\"areaType\":2,\"name\":\"五常市\",\"parentAreaId\":230100}],\"name\":\"哈尔滨市\",\"parentAreaId\":230000},{\"areaId\":230200,\"areaType\":1,\"children\":[{\"areaId\":230202,\"areaType\":2,\"name\":\"龙沙区\",\"parentAreaId\":230200},{\"areaId\":230203,\"areaType\":2,\"name\":\"建华区\",\"parentAreaId\":230200},{\"areaId\":230204,\"areaType\":2,\"name\":\"铁锋区\",\"parentAreaId\":230200},{\"areaId\":230205,\"areaType\":2,\"name\":\"昂昂溪区\",\"parentAreaId\":230200},{\"areaId\":230206,\"areaType\":2,\"name\":\"富拉尔基区\",\"parentAreaId\":230200},{\"areaId\":230207,\"areaType\":2,\"name\":\"碾子山区\",\"parentAreaId\":230200},{\"areaId\":230208,\"areaType\":2,\"name\":\"梅里斯达斡尔族区\",\"parentAreaId\":230200},{\"areaId\":230221,\"areaType\":2,\"name\":\"龙江县\",\"parentAreaId\":230200},{\"areaId\":230223,\"areaType\":2,\"name\":\"依安县\",\"parentAreaId\":230200},{\"areaId\":230224,\"areaType\":2,\"name\":\"泰来县\",\"parentAreaId\":230200},{\"areaId\":230225,\"areaType\":2,\"name\":\"甘南县\",\"parentAreaId\":230200},{\"areaId\":230227,\"areaType\":2,\"name\":\"富裕县\",\"parentAreaId\":230200},{\"areaId\":230229,\"areaType\":2,\"name\":\"克山县\",\"parentAreaId\":230200},{\"areaId\":230230,\"areaType\":2,\"name\":\"克东县\",\"parentAreaId\":230200},{\"areaId\":230231,\"areaType\":2,\"name\":\"拜泉县\",\"parentAreaId\":230200},{\"areaId\":230281,\"areaType\":2,\"name\":\"讷河市\",\"parentAreaId\":230200}],\"name\":\"齐齐哈尔市\",\"parentAreaId\":230000},{\"areaId\":230300,\"areaType\":1,\"children\":[{\"areaId\":230302,\"areaType\":2,\"name\":\"鸡冠区\",\"parentAreaId\":230300},{\"areaId\":230303,\"areaType\":2,\"name\":\"恒山区\",\"parentAreaId\":230300},{\"areaId\":230304,\"areaType\":2,\"name\":\"滴道区\",\"parentAreaId\":230300},{\"areaId\":230305,\"areaType\":2,\"name\":\"梨树区\",\"parentAreaId\":230300},{\"areaId\":230306,\"areaType\":2,\"name\":\"城子河区\",\"parentAreaId\":230300},{\"areaId\":230307,\"areaType\":2,\"name\":\"麻山区\",\"parentAreaId\":230300},{\"areaId\":230321,\"areaType\":2,\"name\":\"鸡东县\",\"parentAreaId\":230300},{\"areaId\":230381,\"areaType\":2,\"name\":\"虎林市\",\"parentAreaId\":230300},{\"areaId\":230382,\"areaType\":2,\"name\":\"密山市\",\"parentAreaId\":230300}],\"name\":\"鸡西市\",\"parentAreaId\":230000},{\"areaId\":230400,\"areaType\":1,\"children\":[{\"areaId\":230402,\"areaType\":2,\"name\":\"向阳区\",\"parentAreaId\":230400},{\"areaId\":230403,\"areaType\":2,\"name\":\"工农区\",\"parentAreaId\":230400},{\"areaId\":230404,\"areaType\":2,\"name\":\"南山区\",\"parentAreaId\":230400},{\"areaId\":230405,\"areaType\":2,\"name\":\"兴安区\",\"parentAreaId\":230400},{\"areaId\":230406,\"areaType\":2,\"name\":\"东山区\",\"parentAreaId\":230400},{\"areaId\":230407,\"areaType\":2,\"name\":\"兴山区\",\"parentAreaId\":230400},{\"areaId\":230421,\"areaType\":2,\"name\":\"萝北县\",\"parentAreaId\":230400},{\"areaId\":230422,\"areaType\":2,\"name\":\"绥滨县\",\"parentAreaId\":230400}],\"name\":\"鹤岗市\",\"parentAreaId\":230000},{\"areaId\":230500,\"areaType\":1,\"children\":[{\"areaId\":230502,\"areaType\":2,\"name\":\"尖山区\",\"parentAreaId\":230500},{\"areaId\":230503,\"areaType\":2,\"name\":\"岭东区\",\"parentAreaId\":230500},{\"areaId\":230505,\"areaType\":2,\"name\":\"四方台区\",\"parentAreaId\":230500},{\"areaId\":230506,\"areaType\":2,\"name\":\"宝山区\",\"parentAreaId\":230500},{\"areaId\":230521,\"areaType\":2,\"name\":\"集贤县\",\"parentAreaId\":230500},{\"areaId\":230522,\"areaType\":2,\"name\":\"友谊县\",\"parentAreaId\":230500},{\"areaId\":230523,\"areaType\":2,\"name\":\"宝清县\",\"parentAreaId\":230500},{\"areaId\":230524,\"areaType\":2,\"name\":\"饶河县\",\"parentAreaId\":230500}],\"name\":\"双鸭山市\",\"parentAreaId\":230000},{\"areaId\":230600,\"areaType\":1,\"children\":[{\"areaId\":230602,\"areaType\":2,\"name\":\"萨尔图区\",\"parentAreaId\":230600},{\"areaId\":230603,\"areaType\":2,\"name\":\"龙凤区\",\"parentAreaId\":230600},{\"areaId\":230604,\"areaType\":2,\"name\":\"让胡路区\",\"parentAreaId\":230600},{\"areaId\":230605,\"areaType\":2,\"name\":\"红岗区\",\"parentAreaId\":230600},{\"areaId\":230606,\"areaType\":2,\"name\":\"大同区\",\"parentAreaId\":230600},{\"areaId\":230621,\"areaType\":2,\"name\":\"肇州县\",\"parentAreaId\":230600},{\"areaId\":230622,\"areaType\":2,\"name\":\"肇源县\",\"parentAreaId\":230600},{\"areaId\":230623,\"areaType\":2,\"name\":\"林甸县\",\"parentAreaId\":230600},{\"areaId\":230624,\"areaType\":2,\"name\":\"杜尔伯特蒙古族自治县\",\"parentAreaId\":230600}],\"name\":\"大庆市\",\"parentAreaId\":230000},{\"areaId\":230700,\"areaType\":1,\"children\":[{\"areaId\":230702,\"areaType\":2,\"name\":\"伊春区\",\"parentAreaId\":230700},{\"areaId\":230703,\"areaType\":2,\"name\":\"南岔区\",\"parentAreaId\":230700},{\"areaId\":230704,\"areaType\":2,\"name\":\"友好区\",\"parentAreaId\":230700},{\"areaId\":230705,\"areaType\":2,\"name\":\"西林区\",\"parentAreaId\":230700},{\"areaId\":230706,\"areaType\":2,\"name\":\"翠峦区\",\"parentAreaId\":230700},{\"areaId\":230707,\"areaType\":2,\"name\":\"新青区\",\"parentAreaId\":230700},{\"areaId\":230708,\"areaType\":2,\"name\":\"美溪区\",\"parentAreaId\":230700},{\"areaId\":230709,\"areaType\":2,\"name\":\"金山屯区\",\"parentAreaId\":230700},{\"areaId\":230710,\"areaType\":2,\"name\":\"五营区\",\"parentAreaId\":230700},{\"areaId\":230711,\"areaType\":2,\"name\":\"乌马河区\",\"parentAreaId\":230700},{\"areaId\":230712,\"areaType\":2,\"name\":\"汤旺河区\",\"parentAreaId\":230700},{\"areaId\":230713,\"areaType\":2,\"name\":\"带岭区\",\"parentAreaId\":230700},{\"areaId\":230714,\"areaType\":2,\"name\":\"乌伊岭区\",\"parentAreaId\":230700},{\"areaId\":230715,\"areaType\":2,\"name\":\"红星区\",\"parentAreaId\":230700},{\"areaId\":230716,\"areaType\":2,\"name\":\"上甘岭区\",\"parentAreaId\":230700},{\"areaId\":230722,\"areaType\":2,\"name\":\"嘉荫县\",\"parentAreaId\":230700},{\"areaId\":230781,\"areaType\":2,\"name\":\"铁力市\",\"parentAreaId\":230700}],\"name\":\"伊春市\",\"parentAreaId\":230000},{\"areaId\":230800,\"areaType\":1,\"children\":[{\"areaId\":230803,\"areaType\":2,\"name\":\"向阳区\",\"parentAreaId\":230800},{\"areaId\":230804,\"areaType\":2,\"name\":\"前进区\",\"parentAreaId\":230800},{\"areaId\":230805,\"areaType\":2,\"name\":\"东风区\",\"parentAreaId\":230800},{\"areaId\":230811,\"areaType\":2,\"name\":\"郊区\",\"parentAreaId\":230800},{\"areaId\":230822,\"areaType\":2,\"name\":\"桦南县\",\"parentAreaId\":230800},{\"areaId\":230826,\"areaType\":2,\"name\":\"桦川县\",\"parentAreaId\":230800},{\"areaId\":230828,\"areaType\":2,\"name\":\"汤原县\",\"parentAreaId\":230800},{\"areaId\":230881,\"areaType\":2,\"name\":\"同江市\",\"parentAreaId\":230800},{\"areaId\":230882,\"areaType\":2,\"name\":\"富锦市\",\"parentAreaId\":230800},{\"areaId\":230883,\"areaType\":2,\"name\":\"抚远市\",\"parentAreaId\":230800}],\"name\":\"佳木斯市\",\"parentAreaId\":230000},{\"areaId\":230900,\"areaType\":1,\"children\":[{\"areaId\":230902,\"areaType\":2,\"name\":\"新兴区\",\"parentAreaId\":230900},{\"areaId\":230903,\"areaType\":2,\"name\":\"桃山区\",\"parentAreaId\":230900},{\"areaId\":230904,\"areaType\":2,\"name\":\"茄子河区\",\"parentAreaId\":230900},{\"areaId\":230921,\"areaType\":2,\"name\":\"勃利县\",\"parentAreaId\":230900}],\"name\":\"七台河市\",\"parentAreaId\":230000},{\"areaId\":231000,\"areaType\":1,\"children\":[{\"areaId\":231002,\"areaType\":2,\"name\":\"东安区\",\"parentAreaId\":231000},{\"areaId\":231003,\"areaType\":2,\"name\":\"阳明区\",\"parentAreaId\":231000},{\"areaId\":231004,\"areaType\":2,\"name\":\"爱民区\",\"parentAreaId\":231000},{\"areaId\":231005,\"areaType\":2,\"name\":\"西安区\",\"parentAreaId\":231000},{\"areaId\":231025,\"areaType\":2,\"name\":\"林口县\",\"parentAreaId\":231000},{\"areaId\":231081,\"areaType\":2,\"name\":\"绥芬河市\",\"parentAreaId\":231000},{\"areaId\":231083,\"areaType\":2,\"name\":\"海林市\",\"parentAreaId\":231000},{\"areaId\":231084,\"areaType\":2,\"name\":\"宁安市\",\"parentAreaId\":231000},{\"areaId\":231085,\"areaType\":2,\"name\":\"穆棱市\",\"parentAreaId\":231000},{\"areaId\":231086,\"areaType\":2,\"name\":\"东宁市\",\"parentAreaId\":231000}],\"name\":\"牡丹江市\",\"parentAreaId\":230000},{\"areaId\":231100,\"areaType\":1,\"children\":[{\"areaId\":231102,\"areaType\":2,\"name\":\"爱辉区\",\"parentAreaId\":231100},{\"areaId\":231121,\"areaType\":2,\"name\":\"嫩江县\",\"parentAreaId\":231100},{\"areaId\":231123,\"areaType\":2,\"name\":\"逊克县\",\"parentAreaId\":231100},{\"areaId\":231124,\"areaType\":2,\"name\":\"孙吴县\",\"parentAreaId\":231100},{\"areaId\":231181,\"areaType\":2,\"name\":\"北安市\",\"parentAreaId\":231100},{\"areaId\":231182,\"areaType\":2,\"name\":\"五大连池市\",\"parentAreaId\":231100}],\"name\":\"黑河市\",\"parentAreaId\":230000},{\"areaId\":231200,\"areaType\":1,\"children\":[{\"areaId\":231202,\"areaType\":2,\"name\":\"北林区\",\"parentAreaId\":231200},{\"areaId\":231221,\"areaType\":2,\"name\":\"望奎县\",\"parentAreaId\":231200},{\"areaId\":231222,\"areaType\":2,\"name\":\"兰西县\",\"parentAreaId\":231200},{\"areaId\":231223,\"areaType\":2,\"name\":\"青冈县\",\"parentAreaId\":231200},{\"areaId\":231224,\"areaType\":2,\"name\":\"庆安县\",\"parentAreaId\":231200},{\"areaId\":231225,\"areaType\":2,\"name\":\"明水县\",\"parentAreaId\":231200},{\"areaId\":231226,\"areaType\":2,\"name\":\"绥棱县\",\"parentAreaId\":231200},{\"areaId\":231281,\"areaType\":2,\"name\":\"安达市\",\"parentAreaId\":231200},{\"areaId\":231282,\"areaType\":2,\"name\":\"肇东市\",\"parentAreaId\":231200},{\"areaId\":231283,\"areaType\":2,\"name\":\"海伦市\",\"parentAreaId\":231200}],\"name\":\"绥化市\",\"parentAreaId\":230000},{\"areaId\":232700,\"areaType\":1,\"children\":[{\"areaId\":232701,\"areaType\":2,\"name\":\"漠河市\",\"parentAreaId\":232700},{\"areaId\":232721,\"areaType\":2,\"name\":\"呼玛县\",\"parentAreaId\":232700},{\"areaId\":232722,\"areaType\":2,\"name\":\"塔河县\",\"parentAreaId\":232700}],\"name\":\"大兴安岭地区\",\"parentAreaId\":230000}],\"name\":\"黑龙江省\",\"parentAreaId\":0},{\"areaId\":320000,\"areaType\":0,\"children\":[{\"areaId\":320100,\"areaType\":1,\"children\":[{\"areaId\":320102,\"areaType\":2,\"name\":\"玄武区\",\"parentAreaId\":320100},{\"areaId\":320104,\"areaType\":2,\"name\":\"秦淮区\",\"parentAreaId\":320100},{\"areaId\":320105,\"areaType\":2,\"name\":\"建邺区\",\"parentAreaId\":320100},{\"areaId\":320106,\"areaType\":2,\"name\":\"鼓楼区\",\"parentAreaId\":320100},{\"areaId\":320111,\"areaType\":2,\"name\":\"浦口区\",\"parentAreaId\":320100},{\"areaId\":320113,\"areaType\":2,\"name\":\"栖霞区\",\"parentAreaId\":320100},{\"areaId\":320114,\"areaType\":2,\"name\":\"雨花台区\",\"parentAreaId\":320100},{\"areaId\":320115,\"areaType\":2,\"name\":\"江宁区\",\"parentAreaId\":320100},{\"areaId\":320116,\"areaType\":2,\"name\":\"六合区\",\"parentAreaId\":320100},{\"areaId\":320117,\"areaType\":2,\"name\":\"溧水区\",\"parentAreaId\":320100},{\"areaId\":320118,\"areaType\":2,\"name\":\"高淳区\",\"parentAreaId\":320100}],\"name\":\"南京市\",\"parentAreaId\":320000},{\"areaId\":320200,\"areaType\":1,\"children\":[{\"areaId\":320205,\"areaType\":2,\"name\":\"锡山区\",\"parentAreaId\":320200},{\"areaId\":320206,\"areaType\":2,\"name\":\"惠山区\",\"parentAreaId\":320200},{\"areaId\":320211,\"areaType\":2,\"name\":\"滨湖区\",\"parentAreaId\":320200},{\"areaId\":320213,\"areaType\":2,\"name\":\"梁溪区\",\"parentAreaId\":320200},{\"areaId\":320214,\"areaType\":2,\"name\":\"新吴区\",\"parentAreaId\":320200},{\"areaId\":320281,\"areaType\":2,\"name\":\"江阴市\",\"parentAreaId\":320200},{\"areaId\":320282,\"areaType\":2,\"name\":\"宜兴市\",\"parentAreaId\":320200}],\"name\":\"无锡市\",\"parentAreaId\":320000},{\"areaId\":320300,\"areaType\":1,\"children\":[{\"areaId\":320302,\"areaType\":2,\"name\":\"鼓楼区\",\"parentAreaId\":320300},{\"areaId\":320303,\"areaType\":2,\"name\":\"云龙区\",\"parentAreaId\":320300},{\"areaId\":320305,\"areaType\":2,\"name\":\"贾汪区\",\"parentAreaId\":320300},{\"areaId\":320311,\"areaType\":2,\"name\":\"泉山区\",\"parentAreaId\":320300},{\"areaId\":320312,\"areaType\":2,\"name\":\"铜山区\",\"parentAreaId\":320300},{\"areaId\":320321,\"areaType\":2,\"name\":\"丰县\",\"parentAreaId\":320300},{\"areaId\":320322,\"areaType\":2,\"name\":\"沛县\",\"parentAreaId\":320300},{\"areaId\":320324,\"areaType\":2,\"name\":\"睢宁县\",\"parentAreaId\":320300},{\"areaId\":320381,\"areaType\":2,\"name\":\"新沂市\",\"parentAreaId\":320300},{\"areaId\":320382,\"areaType\":2,\"name\":\"邳州市\",\"parentAreaId\":320300}],\"name\":\"徐州市\",\"parentAreaId\":320000},{\"areaId\":320400,\"areaType\":1,\"children\":[{\"areaId\":320402,\"areaType\":2,\"name\":\"天宁区\",\"parentAreaId\":320400},{\"areaId\":320404,\"areaType\":2,\"name\":\"钟楼区\",\"parentAreaId\":320400},{\"areaId\":320411,\"areaType\":2,\"name\":\"新北区\",\"parentAreaId\":320400},{\"areaId\":320412,\"areaType\":2,\"name\":\"武进区\",\"parentAreaId\":320400},{\"areaId\":320413,\"areaType\":2,\"name\":\"金坛区\",\"parentAreaId\":320400},{\"areaId\":320481,\"areaType\":2,\"name\":\"溧阳市\",\"parentAreaId\":320400}],\"name\":\"常州市\",\"parentAreaId\":320000},{\"areaId\":320500,\"areaType\":1,\"children\":[{\"areaId\":320505,\"areaType\":2,\"name\":\"虎丘区\",\"parentAreaId\":320500},{\"areaId\":320506,\"areaType\":2,\"name\":\"吴中区\",\"parentAreaId\":320500},{\"areaId\":320507,\"areaType\":2,\"name\":\"相城区\",\"parentAreaId\":320500},{\"areaId\":320508,\"areaType\":2,\"name\":\"姑苏区\",\"parentAreaId\":320500},{\"areaId\":320509,\"areaType\":2,\"name\":\"吴江区\",\"parentAreaId\":320500},{\"areaId\":320581,\"areaType\":2,\"name\":\"常熟市\",\"parentAreaId\":320500},{\"areaId\":320582,\"areaType\":2,\"name\":\"张家港市\",\"parentAreaId\":320500},{\"areaId\":320583,\"areaType\":2,\"name\":\"昆山市\",\"parentAreaId\":320500},{\"areaId\":320585,\"areaType\":2,\"name\":\"太仓市\",\"parentAreaId\":320500}],\"name\":\"苏州市\",\"parentAreaId\":320000},{\"areaId\":320600,\"areaType\":1,\"children\":[{\"areaId\":320602,\"areaType\":2,\"name\":\"崇川区\",\"parentAreaId\":320600},{\"areaId\":320611,\"areaType\":2,\"name\":\"港闸区\",\"parentAreaId\":320600},{\"areaId\":320612,\"areaType\":2,\"name\":\"通州区\",\"parentAreaId\":320600},{\"areaId\":320623,\"areaType\":2,\"name\":\"如东县\",\"parentAreaId\":320600},{\"areaId\":320681,\"areaType\":2,\"name\":\"启东市\",\"parentAreaId\":320600},{\"areaId\":320682,\"areaType\":2,\"name\":\"如皋市\",\"parentAreaId\":320600},{\"areaId\":320684,\"areaType\":2,\"name\":\"海门市\",\"parentAreaId\":320600},{\"areaId\":320685,\"areaType\":2,\"name\":\"海安市\",\"parentAreaId\":320600}],\"name\":\"南通市\",\"parentAreaId\":320000},{\"areaId\":320700,\"areaType\":1,\"children\":[{\"areaId\":320703,\"areaType\":2,\"name\":\"连云区\",\"parentAreaId\":320700},{\"areaId\":320706,\"areaType\":2,\"name\":\"海州区\",\"parentAreaId\":320700},{\"areaId\":320707,\"areaType\":2,\"name\":\"赣榆区\",\"parentAreaId\":320700},{\"areaId\":320722,\"areaType\":2,\"name\":\"东海县\",\"parentAreaId\":320700},{\"areaId\":320723,\"areaType\":2,\"name\":\"灌云县\",\"parentAreaId\":320700},{\"areaId\":320724,\"areaType\":2,\"name\":\"灌南县\",\"parentAreaId\":320700}],\"name\":\"连云港市\",\"parentAreaId\":320000},{\"areaId\":320800,\"areaType\":1,\"children\":[{\"areaId\":320803,\"areaType\":2,\"name\":\"淮安区\",\"parentAreaId\":320800},{\"areaId\":320804,\"areaType\":2,\"name\":\"淮阴区\",\"parentAreaId\":320800},{\"areaId\":320812,\"areaType\":2,\"name\":\"清江浦区\",\"parentAreaId\":320800},{\"areaId\":320813,\"areaType\":2,\"name\":\"洪泽区\",\"parentAreaId\":320800},{\"areaId\":320826,\"areaType\":2,\"name\":\"涟水县\",\"parentAreaId\":320800},{\"areaId\":320830,\"areaType\":2,\"name\":\"盱眙县\",\"parentAreaId\":320800},{\"areaId\":320831,\"areaType\":2,\"name\":\"金湖县\",\"parentAreaId\":320800}],\"name\":\"淮安市\",\"parentAreaId\":320000},{\"areaId\":320900,\"areaType\":1,\"children\":[{\"areaId\":320902,\"areaType\":2,\"name\":\"亭湖区\",\"parentAreaId\":320900},{\"areaId\":320903,\"areaType\":2,\"name\":\"盐都区\",\"parentAreaId\":320900},{\"areaId\":320904,\"areaType\":2,\"name\":\"大丰区\",\"parentAreaId\":320900},{\"areaId\":320921,\"areaType\":2,\"name\":\"响水县\",\"parentAreaId\":320900},{\"areaId\":320922,\"areaType\":2,\"name\":\"滨海县\",\"parentAreaId\":320900},{\"areaId\":320923,\"areaType\":2,\"name\":\"阜宁县\",\"parentAreaId\":320900},{\"areaId\":320924,\"areaType\":2,\"name\":\"射阳县\",\"parentAreaId\":320900},{\"areaId\":320925,\"areaType\":2,\"name\":\"建湖县\",\"parentAreaId\":320900},{\"areaId\":320981,\"areaType\":2,\"name\":\"东台市\",\"parentAreaId\":320900}],\"name\":\"盐城市\",\"parentAreaId\":320000},{\"areaId\":321000,\"areaType\":1,\"children\":[{\"areaId\":321002,\"areaType\":2,\"name\":\"广陵区\",\"parentAreaId\":321000},{\"areaId\":321003,\"areaType\":2,\"name\":\"邗江区\",\"parentAreaId\":321000},{\"areaId\":321012,\"areaType\":2,\"name\":\"江都区\",\"parentAreaId\":321000},{\"areaId\":321023,\"areaType\":2,\"name\":\"宝应县\",\"parentAreaId\":321000},{\"areaId\":321081,\"areaType\":2,\"name\":\"仪征市\",\"parentAreaId\":321000},{\"areaId\":321084,\"areaType\":2,\"name\":\"高邮市\",\"parentAreaId\":321000}],\"name\":\"扬州市\",\"parentAreaId\":320000},{\"areaId\":321100,\"areaType\":1,\"children\":[{\"areaId\":321102,\"areaType\":2,\"name\":\"京口区\",\"parentAreaId\":321100},{\"areaId\":321111,\"areaType\":2,\"name\":\"润州区\",\"parentAreaId\":321100},{\"areaId\":321112,\"areaType\":2,\"name\":\"丹徒区\",\"parentAreaId\":321100},{\"areaId\":321181,\"areaType\":2,\"name\":\"丹阳市\",\"parentAreaId\":321100},{\"areaId\":321182,\"areaType\":2,\"name\":\"扬中市\",\"parentAreaId\":321100},{\"areaId\":321183,\"areaType\":2,\"name\":\"句容市\",\"parentAreaId\":321100}],\"name\":\"镇江市\",\"parentAreaId\":320000},{\"areaId\":321200,\"areaType\":1,\"children\":[{\"areaId\":321202,\"areaType\":2,\"name\":\"海陵区\",\"parentAreaId\":321200},{\"areaId\":321203,\"areaType\":2,\"name\":\"高港区\",\"parentAreaId\":321200},{\"areaId\":321204,\"areaType\":2,\"name\":\"姜堰区\",\"parentAreaId\":321200},{\"areaId\":321281,\"areaType\":2,\"name\":\"兴化市\",\"parentAreaId\":321200},{\"areaId\":321282,\"areaType\":2,\"name\":\"靖江市\",\"parentAreaId\":321200},{\"areaId\":321283,\"areaType\":2,\"name\":\"泰兴市\",\"parentAreaId\":321200}],\"name\":\"泰州市\",\"parentAreaId\":320000},{\"areaId\":321300,\"areaType\":1,\"children\":[{\"areaId\":321302,\"areaType\":2,\"name\":\"宿城区\",\"parentAreaId\":321300},{\"areaId\":321311,\"areaType\":2,\"name\":\"宿豫区\",\"parentAreaId\":321300},{\"areaId\":321322,\"areaType\":2,\"name\":\"沭阳县\",\"parentAreaId\":321300},{\"areaId\":321323,\"areaType\":2,\"name\":\"泗阳县\",\"parentAreaId\":321300},{\"areaId\":321324,\"areaType\":2,\"name\":\"泗洪县\",\"parentAreaId\":321300}],\"name\":\"宿迁市\",\"parentAreaId\":320000}],\"name\":\"江苏省\",\"parentAreaId\":0},{\"areaId\":330000,\"areaType\":0,\"children\":[{\"areaId\":330100,\"areaType\":1,\"children\":[{\"areaId\":330102,\"areaType\":2,\"name\":\"上城区\",\"parentAreaId\":330100},{\"areaId\":330103,\"areaType\":2,\"name\":\"下城区\",\"parentAreaId\":330100},{\"areaId\":330104,\"areaType\":2,\"name\":\"江干区\",\"parentAreaId\":330100},{\"areaId\":330105,\"areaType\":2,\"name\":\"拱墅区\",\"parentAreaId\":330100},{\"areaId\":330106,\"areaType\":2,\"name\":\"西湖区\",\"parentAreaId\":330100},{\"areaId\":330108,\"areaType\":2,\"name\":\"滨江区\",\"parentAreaId\":330100},{\"areaId\":330109,\"areaType\":2,\"name\":\"萧山区\",\"parentAreaId\":330100},{\"areaId\":330110,\"areaType\":2,\"name\":\"余杭区\",\"parentAreaId\":330100},{\"areaId\":330111,\"areaType\":2,\"name\":\"富阳区\",\"parentAreaId\":330100},{\"areaId\":330112,\"areaType\":2,\"name\":\"临安区\",\"parentAreaId\":330100},{\"areaId\":330122,\"areaType\":2,\"name\":\"桐庐县\",\"parentAreaId\":330100},{\"areaId\":330127,\"areaType\":2,\"name\":\"淳安县\",\"parentAreaId\":330100},{\"areaId\":330182,\"areaType\":2,\"name\":\"建德市\",\"parentAreaId\":330100}],\"name\":\"杭州市\",\"parentAreaId\":330000},{\"areaId\":330200,\"areaType\":1,\"children\":[{\"areaId\":330203,\"areaType\":2,\"name\":\"海曙区\",\"parentAreaId\":330200},{\"areaId\":330205,\"areaType\":2,\"name\":\"江北区\",\"parentAreaId\":330200},{\"areaId\":330206,\"areaType\":2,\"name\":\"北仑区\",\"parentAreaId\":330200},{\"areaId\":330211,\"areaType\":2,\"name\":\"镇海区\",\"parentAreaId\":330200},{\"areaId\":330212,\"areaType\":2,\"name\":\"鄞州区\",\"parentAreaId\":330200},{\"areaId\":330213,\"areaType\":2,\"name\":\"奉化区\",\"parentAreaId\":330200},{\"areaId\":330225,\"areaType\":2,\"name\":\"象山县\",\"parentAreaId\":330200},{\"areaId\":330226,\"areaType\":2,\"name\":\"宁海县\",\"parentAreaId\":330200},{\"areaId\":330281,\"areaType\":2,\"name\":\"余姚市\",\"parentAreaId\":330200},{\"areaId\":330282,\"areaType\":2,\"name\":\"慈溪市\",\"parentAreaId\":330200}],\"name\":\"宁波市\",\"parentAreaId\":330000},{\"areaId\":330300,\"areaType\":1,\"children\":[{\"areaId\":330302,\"areaType\":2,\"name\":\"鹿城区\",\"parentAreaId\":330300},{\"areaId\":330303,\"areaType\":2,\"name\":\"龙湾区\",\"parentAreaId\":330300},{\"areaId\":330304,\"areaType\":2,\"name\":\"瓯海区\",\"parentAreaId\":330300},{\"areaId\":330305,\"areaType\":2,\"name\":\"洞头区\",\"parentAreaId\":330300},{\"areaId\":330324,\"areaType\":2,\"name\":\"永嘉县\",\"parentAreaId\":330300},{\"areaId\":330326,\"areaType\":2,\"name\":\"平阳县\",\"parentAreaId\":330300},{\"areaId\":330327,\"areaType\":2,\"name\":\"苍南县\",\"parentAreaId\":330300},{\"areaId\":330328,\"areaType\":2,\"name\":\"文成县\",\"parentAreaId\":330300},{\"areaId\":330329,\"areaType\":2,\"name\":\"泰顺县\",\"parentAreaId\":330300},{\"areaId\":330381,\"areaType\":2,\"name\":\"瑞安市\",\"parentAreaId\":330300},{\"areaId\":330382,\"areaType\":2,\"name\":\"乐清市\",\"parentAreaId\":330300}],\"name\":\"温州市\",\"parentAreaId\":330000},{\"areaId\":330400,\"areaType\":1,\"children\":[{\"areaId\":330402,\"areaType\":2,\"name\":\"南湖区\",\"parentAreaId\":330400},{\"areaId\":330411,\"areaType\":2,\"name\":\"秀洲区\",\"parentAreaId\":330400},{\"areaId\":330421,\"areaType\":2,\"name\":\"嘉善县\",\"parentAreaId\":330400},{\"areaId\":330424,\"areaType\":2,\"name\":\"海盐县\",\"parentAreaId\":330400},{\"areaId\":330481,\"areaType\":2,\"name\":\"海宁市\",\"parentAreaId\":330400},{\"areaId\":330482,\"areaType\":2,\"name\":\"平湖市\",\"parentAreaId\":330400},{\"areaId\":330483,\"areaType\":2,\"name\":\"桐乡市\",\"parentAreaId\":330400}],\"name\":\"嘉兴市\",\"parentAreaId\":330000},{\"areaId\":330500,\"areaType\":1,\"children\":[{\"areaId\":330502,\"areaType\":2,\"name\":\"吴兴区\",\"parentAreaId\":330500},{\"areaId\":330503,\"areaType\":2,\"name\":\"南浔区\",\"parentAreaId\":330500},{\"areaId\":330521,\"areaType\":2,\"name\":\"德清县\",\"parentAreaId\":330500},{\"areaId\":330522,\"areaType\":2,\"name\":\"长兴县\",\"parentAreaId\":330500},{\"areaId\":330523,\"areaType\":2,\"name\":\"安吉县\",\"parentAreaId\":330500}],\"name\":\"湖州市\",\"parentAreaId\":330000},{\"areaId\":330600,\"areaType\":1,\"children\":[{\"areaId\":330602,\"areaType\":2,\"name\":\"越城区\",\"parentAreaId\":330600},{\"areaId\":330603,\"areaType\":2,\"name\":\"柯桥区\",\"parentAreaId\":330600},{\"areaId\":330604,\"areaType\":2,\"name\":\"上虞区\",\"parentAreaId\":330600},{\"areaId\":330624,\"areaType\":2,\"name\":\"新昌县\",\"parentAreaId\":330600},{\"areaId\":330681,\"areaType\":2,\"name\":\"诸暨市\",\"parentAreaId\":330600},{\"areaId\":330683,\"areaType\":2,\"name\":\"嵊州市\",\"parentAreaId\":330600}],\"name\":\"绍兴市\",\"parentAreaId\":330000},{\"areaId\":330700,\"areaType\":1,\"children\":[{\"areaId\":330702,\"areaType\":2,\"name\":\"婺城区\",\"parentAreaId\":330700},{\"areaId\":330703,\"areaType\":2,\"name\":\"金东区\",\"parentAreaId\":330700},{\"areaId\":330723,\"areaType\":2,\"name\":\"武义县\",\"parentAreaId\":330700},{\"areaId\":330726,\"areaType\":2,\"name\":\"浦江县\",\"parentAreaId\":330700},{\"areaId\":330727,\"areaType\":2,\"name\":\"磐安县\",\"parentAreaId\":330700},{\"areaId\":330781,\"areaType\":2,\"name\":\"兰溪市\",\"parentAreaId\":330700},{\"areaId\":330782,\"areaType\":2,\"name\":\"义乌市\",\"parentAreaId\":330700},{\"areaId\":330783,\"areaType\":2,\"name\":\"东阳市\",\"parentAreaId\":330700},{\"areaId\":330784,\"areaType\":2,\"name\":\"永康市\",\"parentAreaId\":330700}],\"name\":\"金华市\",\"parentAreaId\":330000},{\"areaId\":330800,\"areaType\":1,\"children\":[{\"areaId\":330802,\"areaType\":2,\"name\":\"柯城区\",\"parentAreaId\":330800},{\"areaId\":330803,\"areaType\":2,\"name\":\"衢江区\",\"parentAreaId\":330800},{\"areaId\":330822,\"areaType\":2,\"name\":\"常山县\",\"parentAreaId\":330800},{\"areaId\":330824,\"areaType\":2,\"name\":\"开化县\",\"parentAreaId\":330800},{\"areaId\":330825,\"areaType\":2,\"name\":\"龙游县\",\"parentAreaId\":330800},{\"areaId\":330881,\"areaType\":2,\"name\":\"江山市\",\"parentAreaId\":330800}],\"name\":\"衢州市\",\"parentAreaId\":330000},{\"areaId\":330900,\"areaType\":1,\"children\":[{\"areaId\":330902,\"areaType\":2,\"name\":\"定海区\",\"parentAreaId\":330900},{\"areaId\":330903,\"areaType\":2,\"name\":\"普陀区\",\"parentAreaId\":330900},{\"areaId\":330921,\"areaType\":2,\"name\":\"岱山县\",\"parentAreaId\":330900},{\"areaId\":330922,\"areaType\":2,\"name\":\"嵊泗县\",\"parentAreaId\":330900}],\"name\":\"舟山市\",\"parentAreaId\":330000},{\"areaId\":331000,\"areaType\":1,\"children\":[{\"areaId\":331002,\"areaType\":2,\"name\":\"椒江区\",\"parentAreaId\":331000},{\"areaId\":331003,\"areaType\":2,\"name\":\"黄岩区\",\"parentAreaId\":331000},{\"areaId\":331004,\"areaType\":2,\"name\":\"路桥区\",\"parentAreaId\":331000},{\"areaId\":331022,\"areaType\":2,\"name\":\"三门县\",\"parentAreaId\":331000},{\"areaId\":331023,\"areaType\":2,\"name\":\"天台县\",\"parentAreaId\":331000},{\"areaId\":331024,\"areaType\":2,\"name\":\"仙居县\",\"parentAreaId\":331000},{\"areaId\":331081,\"areaType\":2,\"name\":\"温岭市\",\"parentAreaId\":331000},{\"areaId\":331082,\"areaType\":2,\"name\":\"临海市\",\"parentAreaId\":331000},{\"areaId\":331083,\"areaType\":2,\"name\":\"玉环市\",\"parentAreaId\":331000}],\"name\":\"台州市\",\"parentAreaId\":330000},{\"areaId\":331100,\"areaType\":1,\"children\":[{\"areaId\":331102,\"areaType\":2,\"name\":\"莲都区\",\"parentAreaId\":331100},{\"areaId\":331121,\"areaType\":2,\"name\":\"青田县\",\"parentAreaId\":331100},{\"areaId\":331122,\"areaType\":2,\"name\":\"缙云县\",\"parentAreaId\":331100},{\"areaId\":331123,\"areaType\":2,\"name\":\"遂昌县\",\"parentAreaId\":331100},{\"areaId\":331124,\"areaType\":2,\"name\":\"松阳县\",\"parentAreaId\":331100},{\"areaId\":331125,\"areaType\":2,\"name\":\"云和县\",\"parentAreaId\":331100},{\"areaId\":331126,\"areaType\":2,\"name\":\"庆元县\",\"parentAreaId\":331100},{\"areaId\":331127,\"areaType\":2,\"name\":\"景宁畲族自治县\",\"parentAreaId\":331100},{\"areaId\":331181,\"areaType\":2,\"name\":\"龙泉市\",\"parentAreaId\":331100}],\"name\":\"丽水市\",\"parentAreaId\":330000}],\"name\":\"浙江省\",\"parentAreaId\":0},{\"areaId\":340000,\"areaType\":0,\"children\":[{\"areaId\":340100,\"areaType\":1,\"children\":[{\"areaId\":340102,\"areaType\":2,\"name\":\"瑶海区\",\"parentAreaId\":340100},{\"areaId\":340103,\"areaType\":2,\"name\":\"庐阳区\",\"parentAreaId\":340100},{\"areaId\":340104,\"areaType\":2,\"name\":\"蜀山区\",\"parentAreaId\":340100},{\"areaId\":340111,\"areaType\":2,\"name\":\"包河区\",\"parentAreaId\":340100},{\"areaId\":340121,\"areaType\":2,\"name\":\"长丰县\",\"parentAreaId\":340100},{\"areaId\":340122,\"areaType\":2,\"name\":\"肥东县\",\"parentAreaId\":340100},{\"areaId\":340123,\"areaType\":2,\"name\":\"肥西县\",\"parentAreaId\":340100},{\"areaId\":340124,\"areaType\":2,\"name\":\"庐江县\",\"parentAreaId\":340100},{\"areaId\":340181,\"areaType\":2,\"name\":\"巢湖市\",\"parentAreaId\":340100}],\"name\":\"合肥市\",\"parentAreaId\":340000},{\"areaId\":340200,\"areaType\":1,\"children\":[{\"areaId\":340202,\"areaType\":2,\"name\":\"镜湖区\",\"parentAreaId\":340200},{\"areaId\":340203,\"areaType\":2,\"name\":\"弋江区\",\"parentAreaId\":340200},{\"areaId\":340207,\"areaType\":2,\"name\":\"鸠江区\",\"parentAreaId\":340200},{\"areaId\":340208,\"areaType\":2,\"name\":\"三山区\",\"parentAreaId\":340200},{\"areaId\":340221,\"areaType\":2,\"name\":\"芜湖县\",\"parentAreaId\":340200},{\"areaId\":340222,\"areaType\":2,\"name\":\"繁昌县\",\"parentAreaId\":340200},{\"areaId\":340223,\"areaType\":2,\"name\":\"南陵县\",\"parentAreaId\":340200},{\"areaId\":340225,\"areaType\":2,\"name\":\"无为县\",\"parentAreaId\":340200}],\"name\":\"芜湖市\",\"parentAreaId\":340000},{\"areaId\":340300,\"areaType\":1,\"children\":[{\"areaId\":340302,\"areaType\":2,\"name\":\"龙子湖区\",\"parentAreaId\":340300},{\"areaId\":340303,\"areaType\":2,\"name\":\"蚌山区\",\"parentAreaId\":340300},{\"areaId\":340304,\"areaType\":2,\"name\":\"禹会区\",\"parentAreaId\":340300},{\"areaId\":340311,\"areaType\":2,\"name\":\"淮上区\",\"parentAreaId\":340300},{\"areaId\":340321,\"areaType\":2,\"name\":\"怀远县\",\"parentAreaId\":340300},{\"areaId\":340322,\"areaType\":2,\"name\":\"五河县\",\"parentAreaId\":340300},{\"areaId\":340323,\"areaType\":2,\"name\":\"固镇县\",\"parentAreaId\":340300}],\"name\":\"蚌埠市\",\"parentAreaId\":340000},{\"areaId\":340400,\"areaType\":1,\"children\":[{\"areaId\":340402,\"areaType\":2,\"name\":\"大通区\",\"parentAreaId\":340400},{\"areaId\":340403,\"areaType\":2,\"name\":\"田家庵区\",\"parentAreaId\":340400},{\"areaId\":340404,\"areaType\":2,\"name\":\"谢家集区\",\"parentAreaId\":340400},{\"areaId\":340405,\"areaType\":2,\"name\":\"八公山区\",\"parentAreaId\":340400},{\"areaId\":340406,\"areaType\":2,\"name\":\"潘集区\",\"parentAreaId\":340400},{\"areaId\":340421,\"areaType\":2,\"name\":\"凤台县\",\"parentAreaId\":340400},{\"areaId\":340422,\"areaType\":2,\"name\":\"寿县\",\"parentAreaId\":340400}],\"name\":\"淮南市\",\"parentAreaId\":340000},{\"areaId\":340500,\"areaType\":1,\"children\":[{\"areaId\":340503,\"areaType\":2,\"name\":\"花山区\",\"parentAreaId\":340500},{\"areaId\":340504,\"areaType\":2,\"name\":\"雨山区\",\"parentAreaId\":340500},{\"areaId\":340506,\"areaType\":2,\"name\":\"博望区\",\"parentAreaId\":340500},{\"areaId\":340521,\"areaType\":2,\"name\":\"当涂县\",\"parentAreaId\":340500},{\"areaId\":340522,\"areaType\":2,\"name\":\"含山县\",\"parentAreaId\":340500},{\"areaId\":340523,\"areaType\":2,\"name\":\"和县\",\"parentAreaId\":340500}],\"name\":\"马鞍山市\",\"parentAreaId\":340000},{\"areaId\":340600,\"areaType\":1,\"children\":[{\"areaId\":340602,\"areaType\":2,\"name\":\"杜集区\",\"parentAreaId\":340600},{\"areaId\":340603,\"areaType\":2,\"name\":\"相山区\",\"parentAreaId\":340600},{\"areaId\":340604,\"areaType\":2,\"name\":\"烈山区\",\"parentAreaId\":340600},{\"areaId\":340621,\"areaType\":2,\"name\":\"濉溪县\",\"parentAreaId\":340600}],\"name\":\"淮北市\",\"parentAreaId\":340000},{\"areaId\":340700,\"areaType\":1,\"children\":[{\"areaId\":340705,\"areaType\":2,\"name\":\"铜官区\",\"parentAreaId\":340700},{\"areaId\":340706,\"areaType\":2,\"name\":\"义安区\",\"parentAreaId\":340700},{\"areaId\":340711,\"areaType\":2,\"name\":\"郊区\",\"parentAreaId\":340700},{\"areaId\":340722,\"areaType\":2,\"name\":\"枞阳县\",\"parentAreaId\":340700}],\"name\":\"铜陵市\",\"parentAreaId\":340000},{\"areaId\":340800,\"areaType\":1,\"children\":[{\"areaId\":340802,\"areaType\":2,\"name\":\"迎江区\",\"parentAreaId\":340800},{\"areaId\":340803,\"areaType\":2,\"name\":\"大观区\",\"parentAreaId\":340800},{\"areaId\":340811,\"areaType\":2,\"name\":\"宜秀区\",\"parentAreaId\":340800},{\"areaId\":340822,\"areaType\":2,\"name\":\"怀宁县\",\"parentAreaId\":340800},{\"areaId\":340824,\"areaType\":2,\"name\":\"潜山市\",\"parentAreaId\":340800},{\"areaId\":340825,\"areaType\":2,\"name\":\"太湖县\",\"parentAreaId\":340800},{\"areaId\":340826,\"areaType\":2,\"name\":\"宿松县\",\"parentAreaId\":340800},{\"areaId\":340827,\"areaType\":2,\"name\":\"望江县\",\"parentAreaId\":340800},{\"areaId\":340828,\"areaType\":2,\"name\":\"岳西县\",\"parentAreaId\":340800},{\"areaId\":340881,\"areaType\":2,\"name\":\"桐城市\",\"parentAreaId\":340800}],\"name\":\"安庆市\",\"parentAreaId\":340000},{\"areaId\":341000,\"areaType\":1,\"children\":[{\"areaId\":341002,\"areaType\":2,\"name\":\"屯溪区\",\"parentAreaId\":341000},{\"areaId\":341003,\"areaType\":2,\"name\":\"黄山区\",\"parentAreaId\":341000},{\"areaId\":341004,\"areaType\":2,\"name\":\"徽州区\",\"parentAreaId\":341000},{\"areaId\":341021,\"areaType\":2,\"name\":\"歙县\",\"parentAreaId\":341000},{\"areaId\":341022,\"areaType\":2,\"name\":\"休宁县\",\"parentAreaId\":341000},{\"areaId\":341023,\"areaType\":2,\"name\":\"黟县\",\"parentAreaId\":341000},{\"areaId\":341024,\"areaType\":2,\"name\":\"祁门县\",\"parentAreaId\":341000}],\"name\":\"黄山市\",\"parentAreaId\":340000},{\"areaId\":341100,\"areaType\":1,\"children\":[{\"areaId\":341102,\"areaType\":2,\"name\":\"琅琊区\",\"parentAreaId\":341100},{\"areaId\":341103,\"areaType\":2,\"name\":\"南谯区\",\"parentAreaId\":341100},{\"areaId\":341122,\"areaType\":2,\"name\":\"来安县\",\"parentAreaId\":341100},{\"areaId\":341124,\"areaType\":2,\"name\":\"全椒县\",\"parentAreaId\":341100},{\"areaId\":341125,\"areaType\":2,\"name\":\"定远县\",\"parentAreaId\":341100},{\"areaId\":341126,\"areaType\":2,\"name\":\"凤阳县\",\"parentAreaId\":341100},{\"areaId\":341181,\"areaType\":2,\"name\":\"天长市\",\"parentAreaId\":341100},{\"areaId\":341182,\"areaType\":2,\"name\":\"明光市\",\"parentAreaId\":341100}],\"name\":\"滁州市\",\"parentAreaId\":340000},{\"areaId\":341200,\"areaType\":1,\"children\":[{\"areaId\":341202,\"areaType\":2,\"name\":\"颍州区\",\"parentAreaId\":341200},{\"areaId\":341203,\"areaType\":2,\"name\":\"颍东区\",\"parentAreaId\":341200},{\"areaId\":341204,\"areaType\":2,\"name\":\"颍泉区\",\"parentAreaId\":341200},{\"areaId\":341221,\"areaType\":2,\"name\":\"临泉县\",\"parentAreaId\":341200},{\"areaId\":341222,\"areaType\":2,\"name\":\"太和县\",\"parentAreaId\":341200},{\"areaId\":341225,\"areaType\":2,\"name\":\"阜南县\",\"parentAreaId\":341200},{\"areaId\":341226,\"areaType\":2,\"name\":\"颍上县\",\"parentAreaId\":341200},{\"areaId\":341282,\"areaType\":2,\"name\":\"界首市\",\"parentAreaId\":341200}],\"name\":\"阜阳市\",\"parentAreaId\":340000},{\"areaId\":341300,\"areaType\":1,\"children\":[{\"areaId\":341302,\"areaType\":2,\"name\":\"埇桥区\",\"parentAreaId\":341300},{\"areaId\":341321,\"areaType\":2,\"name\":\"砀山县\",\"parentAreaId\":341300},{\"areaId\":341322,\"areaType\":2,\"name\":\"萧县\",\"parentAreaId\":341300},{\"areaId\":341323,\"areaType\":2,\"name\":\"灵璧县\",\"parentAreaId\":341300},{\"areaId\":341324,\"areaType\":2,\"name\":\"泗县\",\"parentAreaId\":341300}],\"name\":\"宿州市\",\"parentAreaId\":340000},{\"areaId\":341500,\"areaType\":1,\"children\":[{\"areaId\":341502,\"areaType\":2,\"name\":\"金安区\",\"parentAreaId\":341500},{\"areaId\":341503,\"areaType\":2,\"name\":\"裕安区\",\"parentAreaId\":341500},{\"areaId\":341504,\"areaType\":2,\"name\":\"叶集区\",\"parentAreaId\":341500},{\"areaId\":341522,\"areaType\":2,\"name\":\"霍邱县\",\"parentAreaId\":341500},{\"areaId\":341523,\"areaType\":2,\"name\":\"舒城县\",\"parentAreaId\":341500},{\"areaId\":341524,\"areaType\":2,\"name\":\"金寨县\",\"parentAreaId\":341500},{\"areaId\":341525,\"areaType\":2,\"name\":\"霍山县\",\"parentAreaId\":341500}],\"name\":\"六安市\",\"parentAreaId\":340000},{\"areaId\":341600,\"areaType\":1,\"children\":[{\"areaId\":341602,\"areaType\":2,\"name\":\"谯城区\",\"parentAreaId\":341600},{\"areaId\":341621,\"areaType\":2,\"name\":\"涡阳县\",\"parentAreaId\":341600},{\"areaId\":341622,\"areaType\":2,\"name\":\"蒙城县\",\"parentAreaId\":341600},{\"areaId\":341623,\"areaType\":2,\"name\":\"利辛县\",\"parentAreaId\":341600}],\"name\":\"亳州市\",\"parentAreaId\":340000},{\"areaId\":341700,\"areaType\":1,\"children\":[{\"areaId\":341702,\"areaType\":2,\"name\":\"贵池区\",\"parentAreaId\":341700},{\"areaId\":341721,\"areaType\":2,\"name\":\"东至县\",\"parentAreaId\":341700},{\"areaId\":341722,\"areaType\":2,\"name\":\"石台县\",\"parentAreaId\":341700},{\"areaId\":341723,\"areaType\":2,\"name\":\"青阳县\",\"parentAreaId\":341700}],\"name\":\"池州市\",\"parentAreaId\":340000},{\"areaId\":341800,\"areaType\":1,\"children\":[{\"areaId\":341802,\"areaType\":2,\"name\":\"宣州区\",\"parentAreaId\":341800},{\"areaId\":341821,\"areaType\":2,\"name\":\"郎溪县\",\"parentAreaId\":341800},{\"areaId\":341822,\"areaType\":2,\"name\":\"广德县\",\"parentAreaId\":341800},{\"areaId\":341823,\"areaType\":2,\"name\":\"泾县\",\"parentAreaId\":341800},{\"areaId\":341824,\"areaType\":2,\"name\":\"绩溪县\",\"parentAreaId\":341800},{\"areaId\":341825,\"areaType\":2,\"name\":\"旌德县\",\"parentAreaId\":341800},{\"areaId\":341881,\"areaType\":2,\"name\":\"宁国市\",\"parentAreaId\":341800}],\"name\":\"宣城市\",\"parentAreaId\":340000}],\"name\":\"安徽省\",\"parentAreaId\":0},{\"areaId\":350000,\"areaType\":0,\"children\":[{\"areaId\":350100,\"areaType\":1,\"children\":[{\"areaId\":350102,\"areaType\":2,\"name\":\"鼓楼区\",\"parentAreaId\":350100},{\"areaId\":350103,\"areaType\":2,\"name\":\"台江区\",\"parentAreaId\":350100},{\"areaId\":350104,\"areaType\":2,\"name\":\"仓山区\",\"parentAreaId\":350100},{\"areaId\":350105,\"areaType\":2,\"name\":\"马尾区\",\"parentAreaId\":350100},{\"areaId\":350111,\"areaType\":2,\"name\":\"晋安区\",\"parentAreaId\":350100},{\"areaId\":350112,\"areaType\":2,\"name\":\"长乐区\",\"parentAreaId\":350100},{\"areaId\":350121,\"areaType\":2,\"name\":\"闽侯县\",\"parentAreaId\":350100},{\"areaId\":350122,\"areaType\":2,\"name\":\"连江县\",\"parentAreaId\":350100},{\"areaId\":350123,\"areaType\":2,\"name\":\"罗源县\",\"parentAreaId\":350100},{\"areaId\":350124,\"areaType\":2,\"name\":\"闽清县\",\"parentAreaId\":350100},{\"areaId\":350125,\"areaType\":2,\"name\":\"永泰县\",\"parentAreaId\":350100},{\"areaId\":350128,\"areaType\":2,\"name\":\"平潭县\",\"parentAreaId\":350100},{\"areaId\":350181,\"areaType\":2,\"name\":\"福清市\",\"parentAreaId\":350100}],\"name\":\"福州市\",\"parentAreaId\":350000},{\"areaId\":350200,\"areaType\":1,\"children\":[{\"areaId\":350203,\"areaType\":2,\"name\":\"思明区\",\"parentAreaId\":350200},{\"areaId\":350205,\"areaType\":2,\"name\":\"海沧区\",\"parentAreaId\":350200},{\"areaId\":350206,\"areaType\":2,\"name\":\"湖里区\",\"parentAreaId\":350200},{\"areaId\":350211,\"areaType\":2,\"name\":\"集美区\",\"parentAreaId\":350200},{\"areaId\":350212,\"areaType\":2,\"name\":\"同安区\",\"parentAreaId\":350200},{\"areaId\":350213,\"areaType\":2,\"name\":\"翔安区\",\"parentAreaId\":350200}],\"name\":\"厦门市\",\"parentAreaId\":350000},{\"areaId\":350300,\"areaType\":1,\"children\":[{\"areaId\":350302,\"areaType\":2,\"name\":\"城厢区\",\"parentAreaId\":350300},{\"areaId\":350303,\"areaType\":2,\"name\":\"涵江区\",\"parentAreaId\":350300},{\"areaId\":350304,\"areaType\":2,\"name\":\"荔城区\",\"parentAreaId\":350300},{\"areaId\":350305,\"areaType\":2,\"name\":\"秀屿区\",\"parentAreaId\":350300},{\"areaId\":350322,\"areaType\":2,\"name\":\"仙游县\",\"parentAreaId\":350300}],\"name\":\"莆田市\",\"parentAreaId\":350000},{\"areaId\":350400,\"areaType\":1,\"children\":[{\"areaId\":350402,\"areaType\":2,\"name\":\"梅列区\",\"parentAreaId\":350400},{\"areaId\":350403,\"areaType\":2,\"name\":\"三元区\",\"parentAreaId\":350400},{\"areaId\":350421,\"areaType\":2,\"name\":\"明溪县\",\"parentAreaId\":350400},{\"areaId\":350423,\"areaType\":2,\"name\":\"清流县\",\"parentAreaId\":350400},{\"areaId\":350424,\"areaType\":2,\"name\":\"宁化县\",\"parentAreaId\":350400},{\"areaId\":350425,\"areaType\":2,\"name\":\"大田县\",\"parentAreaId\":350400},{\"areaId\":350426,\"areaType\":2,\"name\":\"尤溪县\",\"parentAreaId\":350400},{\"areaId\":350427,\"areaType\":2,\"name\":\"沙县\",\"parentAreaId\":350400},{\"areaId\":350428,\"areaType\":2,\"name\":\"将乐县\",\"parentAreaId\":350400},{\"areaId\":350429,\"areaType\":2,\"name\":\"泰宁县\",\"parentAreaId\":350400},{\"areaId\":350430,\"areaType\":2,\"name\":\"建宁县\",\"parentAreaId\":350400},{\"areaId\":350481,\"areaType\":2,\"name\":\"永安市\",\"parentAreaId\":350400}],\"name\":\"三明市\",\"parentAreaId\":350000},{\"areaId\":350500,\"areaType\":1,\"children\":[{\"areaId\":350502,\"areaType\":2,\"name\":\"鲤城区\",\"parentAreaId\":350500},{\"areaId\":350503,\"areaType\":2,\"name\":\"丰泽区\",\"parentAreaId\":350500},{\"areaId\":350504,\"areaType\":2,\"name\":\"洛江区\",\"parentAreaId\":350500},{\"areaId\":350505,\"areaType\":2,\"name\":\"泉港区\",\"parentAreaId\":350500},{\"areaId\":350521,\"areaType\":2,\"name\":\"惠安县\",\"parentAreaId\":350500},{\"areaId\":350524,\"areaType\":2,\"name\":\"安溪县\",\"parentAreaId\":350500},{\"areaId\":350525,\"areaType\":2,\"name\":\"永春县\",\"parentAreaId\":350500},{\"areaId\":350526,\"areaType\":2,\"name\":\"德化县\",\"parentAreaId\":350500},{\"areaId\":350527,\"areaType\":2,\"name\":\"金门县\",\"parentAreaId\":350500},{\"areaId\":350581,\"areaType\":2,\"name\":\"石狮市\",\"parentAreaId\":350500},{\"areaId\":350582,\"areaType\":2,\"name\":\"晋江市\",\"parentAreaId\":350500},{\"areaId\":350583,\"areaType\":2,\"name\":\"南安市\",\"parentAreaId\":350500}],\"name\":\"泉州市\",\"parentAreaId\":350000},{\"areaId\":350600,\"areaType\":1,\"children\":[{\"areaId\":350602,\"areaType\":2,\"name\":\"芗城区\",\"parentAreaId\":350600},{\"areaId\":350603,\"areaType\":2,\"name\":\"龙文区\",\"parentAreaId\":350600},{\"areaId\":350622,\"areaType\":2,\"name\":\"云霄县\",\"parentAreaId\":350600},{\"areaId\":350623,\"areaType\":2,\"name\":\"漳浦县\",\"parentAreaId\":350600},{\"areaId\":350624,\"areaType\":2,\"name\":\"诏安县\",\"parentAreaId\":350600},{\"areaId\":350625,\"areaType\":2,\"name\":\"长泰县\",\"parentAreaId\":350600},{\"areaId\":350626,\"areaType\":2,\"name\":\"东山县\",\"parentAreaId\":350600},{\"areaId\":350627,\"areaType\":2,\"name\":\"南靖县\",\"parentAreaId\":350600},{\"areaId\":350628,\"areaType\":2,\"name\":\"平和县\",\"parentAreaId\":350600},{\"areaId\":350629,\"areaType\":2,\"name\":\"华安县\",\"parentAreaId\":350600},{\"areaId\":350681,\"areaType\":2,\"name\":\"龙海市\",\"parentAreaId\":350600}],\"name\":\"漳州市\",\"parentAreaId\":350000},{\"areaId\":350700,\"areaType\":1,\"children\":[{\"areaId\":350702,\"areaType\":2,\"name\":\"延平区\",\"parentAreaId\":350700},{\"areaId\":350703,\"areaType\":2,\"name\":\"建阳区\",\"parentAreaId\":350700},{\"areaId\":350721,\"areaType\":2,\"name\":\"顺昌县\",\"parentAreaId\":350700},{\"areaId\":350722,\"areaType\":2,\"name\":\"浦城县\",\"parentAreaId\":350700},{\"areaId\":350723,\"areaType\":2,\"name\":\"光泽县\",\"parentAreaId\":350700},{\"areaId\":350724,\"areaType\":2,\"name\":\"松溪县\",\"parentAreaId\":350700},{\"areaId\":350725,\"areaType\":2,\"name\":\"政和县\",\"parentAreaId\":350700},{\"areaId\":350781,\"areaType\":2,\"name\":\"邵武市\",\"parentAreaId\":350700},{\"areaId\":350782,\"areaType\":2,\"name\":\"武夷山市\",\"parentAreaId\":350700},{\"areaId\":350783,\"areaType\":2,\"name\":\"建瓯市\",\"parentAreaId\":350700}],\"name\":\"南平市\",\"parentAreaId\":350000},{\"areaId\":350800,\"areaType\":1,\"children\":[{\"areaId\":350802,\"areaType\":2,\"name\":\"新罗区\",\"parentAreaId\":350800},{\"areaId\":350803,\"areaType\":2,\"name\":\"永定区\",\"parentAreaId\":350800},{\"areaId\":350821,\"areaType\":2,\"name\":\"长汀县\",\"parentAreaId\":350800},{\"areaId\":350823,\"areaType\":2,\"name\":\"上杭县\",\"parentAreaId\":350800},{\"areaId\":350824,\"areaType\":2,\"name\":\"武平县\",\"parentAreaId\":350800},{\"areaId\":350825,\"areaType\":2,\"name\":\"连城县\",\"parentAreaId\":350800},{\"areaId\":350881,\"areaType\":2,\"name\":\"漳平市\",\"parentAreaId\":350800}],\"name\":\"龙岩市\",\"parentAreaId\":350000},{\"areaId\":350900,\"areaType\":1,\"children\":[{\"areaId\":350902,\"areaType\":2,\"name\":\"蕉城区\",\"parentAreaId\":350900},{\"areaId\":350921,\"areaType\":2,\"name\":\"霞浦县\",\"parentAreaId\":350900},{\"areaId\":350922,\"areaType\":2,\"name\":\"古田县\",\"parentAreaId\":350900},{\"areaId\":350923,\"areaType\":2,\"name\":\"屏南县\",\"parentAreaId\":350900},{\"areaId\":350924,\"areaType\":2,\"name\":\"寿宁县\",\"parentAreaId\":350900},{\"areaId\":350925,\"areaType\":2,\"name\":\"周宁县\",\"parentAreaId\":350900},{\"areaId\":350926,\"areaType\":2,\"name\":\"柘荣县\",\"parentAreaId\":350900},{\"areaId\":350981,\"areaType\":2,\"name\":\"福安市\",\"parentAreaId\":350900},{\"areaId\":350982,\"areaType\":2,\"name\":\"福鼎市\",\"parentAreaId\":350900}],\"name\":\"宁德市\",\"parentAreaId\":350000}],\"name\":\"福建省\",\"parentAreaId\":0},{\"areaId\":360000,\"areaType\":0,\"children\":[{\"areaId\":360100,\"areaType\":1,\"children\":[{\"areaId\":360102,\"areaType\":2,\"name\":\"东湖区\",\"parentAreaId\":360100},{\"areaId\":360103,\"areaType\":2,\"name\":\"西湖区\",\"parentAreaId\":360100},{\"areaId\":360104,\"areaType\":2,\"name\":\"青云谱区\",\"parentAreaId\":360100},{\"areaId\":360105,\"areaType\":2,\"name\":\"湾里区\",\"parentAreaId\":360100},{\"areaId\":360111,\"areaType\":2,\"name\":\"青山湖区\",\"parentAreaId\":360100},{\"areaId\":360112,\"areaType\":2,\"name\":\"新建区\",\"parentAreaId\":360100},{\"areaId\":360121,\"areaType\":2,\"name\":\"南昌县\",\"parentAreaId\":360100},{\"areaId\":360123,\"areaType\":2,\"name\":\"安义县\",\"parentAreaId\":360100},{\"areaId\":360124,\"areaType\":2,\"name\":\"进贤县\",\"parentAreaId\":360100}],\"name\":\"南昌市\",\"parentAreaId\":360000},{\"areaId\":360200,\"areaType\":1,\"children\":[{\"areaId\":360202,\"areaType\":2,\"name\":\"昌江区\",\"parentAreaId\":360200},{\"areaId\":360203,\"areaType\":2,\"name\":\"珠山区\",\"parentAreaId\":360200},{\"areaId\":360222,\"areaType\":2,\"name\":\"浮梁县\",\"parentAreaId\":360200},{\"areaId\":360281,\"areaType\":2,\"name\":\"乐平市\",\"parentAreaId\":360200}],\"name\":\"景德镇市\",\"parentAreaId\":360000},{\"areaId\":360300,\"areaType\":1,\"children\":[{\"areaId\":360302,\"areaType\":2,\"name\":\"安源区\",\"parentAreaId\":360300},{\"areaId\":360313,\"areaType\":2,\"name\":\"湘东区\",\"parentAreaId\":360300},{\"areaId\":360321,\"areaType\":2,\"name\":\"莲花县\",\"parentAreaId\":360300},{\"areaId\":360322,\"areaType\":2,\"name\":\"上栗县\",\"parentAreaId\":360300},{\"areaId\":360323,\"areaType\":2,\"name\":\"芦溪县\",\"parentAreaId\":360300}],\"name\":\"萍乡市\",\"parentAreaId\":360000},{\"areaId\":360400,\"areaType\":1,\"children\":[{\"areaId\":360402,\"areaType\":2,\"name\":\"濂溪区\",\"parentAreaId\":360400},{\"areaId\":360403,\"areaType\":2,\"name\":\"浔阳区\",\"parentAreaId\":360400},{\"areaId\":360404,\"areaType\":2,\"name\":\"柴桑区\",\"parentAreaId\":360400},{\"areaId\":360423,\"areaType\":2,\"name\":\"武宁县\",\"parentAreaId\":360400},{\"areaId\":360424,\"areaType\":2,\"name\":\"修水县\",\"parentAreaId\":360400},{\"areaId\":360425,\"areaType\":2,\"name\":\"永修县\",\"parentAreaId\":360400},{\"areaId\":360426,\"areaType\":2,\"name\":\"德安县\",\"parentAreaId\":360400},{\"areaId\":360428,\"areaType\":2,\"name\":\"都昌县\",\"parentAreaId\":360400},{\"areaId\":360429,\"areaType\":2,\"name\":\"湖口县\",\"parentAreaId\":360400},{\"areaId\":360430,\"areaType\":2,\"name\":\"彭泽县\",\"parentAreaId\":360400},{\"areaId\":360481,\"areaType\":2,\"name\":\"瑞昌市\",\"parentAreaId\":360400},{\"areaId\":360482,\"areaType\":2,\"name\":\"共青城市\",\"parentAreaId\":360400},{\"areaId\":360483,\"areaType\":2,\"name\":\"庐山市\",\"parentAreaId\":360400}],\"name\":\"九江市\",\"parentAreaId\":360000},{\"areaId\":360500,\"areaType\":1,\"children\":[{\"areaId\":360502,\"areaType\":2,\"name\":\"渝水区\",\"parentAreaId\":360500},{\"areaId\":360521,\"areaType\":2,\"name\":\"分宜县\",\"parentAreaId\":360500}],\"name\":\"新余市\",\"parentAreaId\":360000},{\"areaId\":360600,\"areaType\":1,\"children\":[{\"areaId\":360602,\"areaType\":2,\"name\":\"月湖区\",\"parentAreaId\":360600},{\"areaId\":360603,\"areaType\":2,\"name\":\"余江区\",\"parentAreaId\":360600},{\"areaId\":360681,\"areaType\":2,\"name\":\"贵溪市\",\"parentAreaId\":360600}],\"name\":\"鹰潭市\",\"parentAreaId\":360000},{\"areaId\":360700,\"areaType\":1,\"children\":[{\"areaId\":360702,\"areaType\":2,\"name\":\"章贡区\",\"parentAreaId\":360700},{\"areaId\":360703,\"areaType\":2,\"name\":\"南康区\",\"parentAreaId\":360700},{\"areaId\":360704,\"areaType\":2,\"name\":\"赣县区\",\"parentAreaId\":360700},{\"areaId\":360722,\"areaType\":2,\"name\":\"信丰县\",\"parentAreaId\":360700},{\"areaId\":360723,\"areaType\":2,\"name\":\"大余县\",\"parentAreaId\":360700},{\"areaId\":360724,\"areaType\":2,\"name\":\"上犹县\",\"parentAreaId\":360700},{\"areaId\":360725,\"areaType\":2,\"name\":\"崇义县\",\"parentAreaId\":360700},{\"areaId\":360726,\"areaType\":2,\"name\":\"安远县\",\"parentAreaId\":360700},{\"areaId\":360727,\"areaType\":2,\"name\":\"龙南县\",\"parentAreaId\":360700},{\"areaId\":360728,\"areaType\":2,\"name\":\"定南县\",\"parentAreaId\":360700},{\"areaId\":360729,\"areaType\":2,\"name\":\"全南县\",\"parentAreaId\":360700},{\"areaId\":360730,\"areaType\":2,\"name\":\"宁都县\",\"parentAreaId\":360700},{\"areaId\":360731,\"areaType\":2,\"name\":\"于都县\",\"parentAreaId\":360700},{\"areaId\":360732,\"areaType\":2,\"name\":\"兴国县\",\"parentAreaId\":360700},{\"areaId\":360733,\"areaType\":2,\"name\":\"会昌县\",\"parentAreaId\":360700},{\"areaId\":360734,\"areaType\":2,\"name\":\"寻乌县\",\"parentAreaId\":360700},{\"areaId\":360735,\"areaType\":2,\"name\":\"石城县\",\"parentAreaId\":360700},{\"areaId\":360781,\"areaType\":2,\"name\":\"瑞金市\",\"parentAreaId\":360700}],\"name\":\"赣州市\",\"parentAreaId\":360000},{\"areaId\":360800,\"areaType\":1,\"children\":[{\"areaId\":360802,\"areaType\":2,\"name\":\"吉州区\",\"parentAreaId\":360800},{\"areaId\":360803,\"areaType\":2,\"name\":\"青原区\",\"parentAreaId\":360800},{\"areaId\":360821,\"areaType\":2,\"name\":\"吉安县\",\"parentAreaId\":360800},{\"areaId\":360822,\"areaType\":2,\"name\":\"吉水县\",\"parentAreaId\":360800},{\"areaId\":360823,\"areaType\":2,\"name\":\"峡江县\",\"parentAreaId\":360800},{\"areaId\":360824,\"areaType\":2,\"name\":\"新干县\",\"parentAreaId\":360800},{\"areaId\":360825,\"areaType\":2,\"name\":\"永丰县\",\"parentAreaId\":360800},{\"areaId\":360826,\"areaType\":2,\"name\":\"泰和县\",\"parentAreaId\":360800},{\"areaId\":360827,\"areaType\":2,\"name\":\"遂川县\",\"parentAreaId\":360800},{\"areaId\":360828,\"areaType\":2,\"name\":\"万安县\",\"parentAreaId\":360800},{\"areaId\":360829,\"areaType\":2,\"name\":\"安福县\",\"parentAreaId\":360800},{\"areaId\":360830,\"areaType\":2,\"name\":\"永新县\",\"parentAreaId\":360800},{\"areaId\":360881,\"areaType\":2,\"name\":\"井冈山市\",\"parentAreaId\":360800}],\"name\":\"吉安市\",\"parentAreaId\":360000},{\"areaId\":360900,\"areaType\":1,\"children\":[{\"areaId\":360902,\"areaType\":2,\"name\":\"袁州区\",\"parentAreaId\":360900},{\"areaId\":360921,\"areaType\":2,\"name\":\"奉新县\",\"parentAreaId\":360900},{\"areaId\":360922,\"areaType\":2,\"name\":\"万载县\",\"parentAreaId\":360900},{\"areaId\":360923,\"areaType\":2,\"name\":\"上高县\",\"parentAreaId\":360900},{\"areaId\":360924,\"areaType\":2,\"name\":\"宜丰县\",\"parentAreaId\":360900},{\"areaId\":360925,\"areaType\":2,\"name\":\"靖安县\",\"parentAreaId\":360900},{\"areaId\":360926,\"areaType\":2,\"name\":\"铜鼓县\",\"parentAreaId\":360900},{\"areaId\":360981,\"areaType\":2,\"name\":\"丰城市\",\"parentAreaId\":360900},{\"areaId\":360982,\"areaType\":2,\"name\":\"樟树市\",\"parentAreaId\":360900},{\"areaId\":360983,\"areaType\":2,\"name\":\"高安市\",\"parentAreaId\":360900}],\"name\":\"宜春市\",\"parentAreaId\":360000},{\"areaId\":361000,\"areaType\":1,\"children\":[{\"areaId\":361002,\"areaType\":2,\"name\":\"临川区\",\"parentAreaId\":361000},{\"areaId\":361003,\"areaType\":2,\"name\":\"东乡区\",\"parentAreaId\":361000},{\"areaId\":361021,\"areaType\":2,\"name\":\"南城县\",\"parentAreaId\":361000},{\"areaId\":361022,\"areaType\":2,\"name\":\"黎川县\",\"parentAreaId\":361000},{\"areaId\":361023,\"areaType\":2,\"name\":\"南丰县\",\"parentAreaId\":361000},{\"areaId\":361024,\"areaType\":2,\"name\":\"崇仁县\",\"parentAreaId\":361000},{\"areaId\":361025,\"areaType\":2,\"name\":\"乐安县\",\"parentAreaId\":361000},{\"areaId\":361026,\"areaType\":2,\"name\":\"宜黄县\",\"parentAreaId\":361000},{\"areaId\":361027,\"areaType\":2,\"name\":\"金溪县\",\"parentAreaId\":361000},{\"areaId\":361028,\"areaType\":2,\"name\":\"资溪县\",\"parentAreaId\":361000},{\"areaId\":361030,\"areaType\":2,\"name\":\"广昌县\",\"parentAreaId\":361000}],\"name\":\"抚州市\",\"parentAreaId\":360000},{\"areaId\":361100,\"areaType\":1,\"children\":[{\"areaId\":361102,\"areaType\":2,\"name\":\"信州区\",\"parentAreaId\":361100},{\"areaId\":361103,\"areaType\":2,\"name\":\"广丰区\",\"parentAreaId\":361100},{\"areaId\":361121,\"areaType\":2,\"name\":\"上饶县\",\"parentAreaId\":361100},{\"areaId\":361123,\"areaType\":2,\"name\":\"玉山县\",\"parentAreaId\":361100},{\"areaId\":361124,\"areaType\":2,\"name\":\"铅山县\",\"parentAreaId\":361100},{\"areaId\":361125,\"areaType\":2,\"name\":\"横峰县\",\"parentAreaId\":361100},{\"areaId\":361126,\"areaType\":2,\"name\":\"弋阳县\",\"parentAreaId\":361100},{\"areaId\":361127,\"areaType\":2,\"name\":\"余干县\",\"parentAreaId\":361100},{\"areaId\":361128,\"areaType\":2,\"name\":\"鄱阳县\",\"parentAreaId\":361100},{\"areaId\":361129,\"areaType\":2,\"name\":\"万年县\",\"parentAreaId\":361100},{\"areaId\":361130,\"areaType\":2,\"name\":\"婺源县\",\"parentAreaId\":361100},{\"areaId\":361181,\"areaType\":2,\"name\":\"德兴市\",\"parentAreaId\":361100}],\"name\":\"上饶市\",\"parentAreaId\":360000}],\"name\":\"江西省\",\"parentAreaId\":0},{\"areaId\":370000,\"areaType\":0,\"children\":[{\"areaId\":370100,\"areaType\":1,\"children\":[{\"areaId\":370102,\"areaType\":2,\"name\":\"历下区\",\"parentAreaId\":370100},{\"areaId\":370103,\"areaType\":2,\"name\":\"市中区\",\"parentAreaId\":370100},{\"areaId\":370104,\"areaType\":2,\"name\":\"槐荫区\",\"parentAreaId\":370100},{\"areaId\":370105,\"areaType\":2,\"name\":\"天桥区\",\"parentAreaId\":370100},{\"areaId\":370112,\"areaType\":2,\"name\":\"历城区\",\"parentAreaId\":370100},{\"areaId\":370113,\"areaType\":2,\"name\":\"长清区\",\"parentAreaId\":370100},{\"areaId\":370114,\"areaType\":2,\"name\":\"章丘区\",\"parentAreaId\":370100},{\"areaId\":370124,\"areaType\":2,\"name\":\"平阴县\",\"parentAreaId\":370100},{\"areaId\":370125,\"areaType\":2,\"name\":\"济阳区\",\"parentAreaId\":370100},{\"areaId\":370126,\"areaType\":2,\"name\":\"商河县\",\"parentAreaId\":370100}],\"name\":\"济南市\",\"parentAreaId\":370000},{\"areaId\":370200,\"areaType\":1,\"children\":[{\"areaId\":370202,\"areaType\":2,\"name\":\"市南区\",\"parentAreaId\":370200},{\"areaId\":370203,\"areaType\":2,\"name\":\"市北区\",\"parentAreaId\":370200},{\"areaId\":370211,\"areaType\":2,\"name\":\"黄岛区\",\"parentAreaId\":370200},{\"areaId\":370212,\"areaType\":2,\"name\":\"崂山区\",\"parentAreaId\":370200},{\"areaId\":370213,\"areaType\":2,\"name\":\"李沧区\",\"parentAreaId\":370200},{\"areaId\":370214,\"areaType\":2,\"name\":\"城阳区\",\"parentAreaId\":370200},{\"areaId\":370215,\"areaType\":2,\"name\":\"即墨区\",\"parentAreaId\":370200},{\"areaId\":370281,\"areaType\":2,\"name\":\"胶州市\",\"parentAreaId\":370200},{\"areaId\":370283,\"areaType\":2,\"name\":\"平度市\",\"parentAreaId\":370200},{\"areaId\":370285,\"areaType\":2,\"name\":\"莱西市\",\"parentAreaId\":370200}],\"name\":\"青岛市\",\"parentAreaId\":370000},{\"areaId\":370300,\"areaType\":1,\"children\":[{\"areaId\":370302,\"areaType\":2,\"name\":\"淄川区\",\"parentAreaId\":370300},{\"areaId\":370303,\"areaType\":2,\"name\":\"张店区\",\"parentAreaId\":370300},{\"areaId\":370304,\"areaType\":2,\"name\":\"博山区\",\"parentAreaId\":370300},{\"areaId\":370305,\"areaType\":2,\"name\":\"临淄区\",\"parentAreaId\":370300},{\"areaId\":370306,\"areaType\":2,\"name\":\"周村区\",\"parentAreaId\":370300},{\"areaId\":370321,\"areaType\":2,\"name\":\"桓台县\",\"parentAreaId\":370300},{\"areaId\":370322,\"areaType\":2,\"name\":\"高青县\",\"parentAreaId\":370300},{\"areaId\":370323,\"areaType\":2,\"name\":\"沂源县\",\"parentAreaId\":370300}],\"name\":\"淄博市\",\"parentAreaId\":370000},{\"areaId\":370400,\"areaType\":1,\"children\":[{\"areaId\":370402,\"areaType\":2,\"name\":\"市中区\",\"parentAreaId\":370400},{\"areaId\":370403,\"areaType\":2,\"name\":\"薛城区\",\"parentAreaId\":370400},{\"areaId\":370404,\"areaType\":2,\"name\":\"峄城区\",\"parentAreaId\":370400},{\"areaId\":370405,\"areaType\":2,\"name\":\"台儿庄区\",\"parentAreaId\":370400},{\"areaId\":370406,\"areaType\":2,\"name\":\"山亭区\",\"parentAreaId\":370400},{\"areaId\":370481,\"areaType\":2,\"name\":\"滕州市\",\"parentAreaId\":370400}],\"name\":\"枣庄市\",\"parentAreaId\":370000},{\"areaId\":370500,\"areaType\":1,\"children\":[{\"areaId\":370502,\"areaType\":2,\"name\":\"东营区\",\"parentAreaId\":370500},{\"areaId\":370503,\"areaType\":2,\"name\":\"河口区\",\"parentAreaId\":370500},{\"areaId\":370505,\"areaType\":2,\"name\":\"垦利区\",\"parentAreaId\":370500},{\"areaId\":370522,\"areaType\":2,\"name\":\"利津县\",\"parentAreaId\":370500},{\"areaId\":370523,\"areaType\":2,\"name\":\"广饶县\",\"parentAreaId\":370500}],\"name\":\"东营市\",\"parentAreaId\":370000},{\"areaId\":370600,\"areaType\":1,\"children\":[{\"areaId\":370602,\"areaType\":2,\"name\":\"芝罘区\",\"parentAreaId\":370600},{\"areaId\":370611,\"areaType\":2,\"name\":\"福山区\",\"parentAreaId\":370600},{\"areaId\":370612,\"areaType\":2,\"name\":\"牟平区\",\"parentAreaId\":370600},{\"areaId\":370613,\"areaType\":2,\"name\":\"莱山区\",\"parentAreaId\":370600},{\"areaId\":370634,\"areaType\":2,\"name\":\"长岛县\",\"parentAreaId\":370600},{\"areaId\":370681,\"areaType\":2,\"name\":\"龙口市\",\"parentAreaId\":370600},{\"areaId\":370682,\"areaType\":2,\"name\":\"莱阳市\",\"parentAreaId\":370600},{\"areaId\":370683,\"areaType\":2,\"name\":\"莱州市\",\"parentAreaId\":370600},{\"areaId\":370684,\"areaType\":2,\"name\":\"蓬莱市\",\"parentAreaId\":370600},{\"areaId\":370685,\"areaType\":2,\"name\":\"招远市\",\"parentAreaId\":370600},{\"areaId\":370686,\"areaType\":2,\"name\":\"栖霞市\",\"parentAreaId\":370600},{\"areaId\":370687,\"areaType\":2,\"name\":\"海阳市\",\"parentAreaId\":370600}],\"name\":\"烟台市\",\"parentAreaId\":370000},{\"areaId\":370700,\"areaType\":1,\"children\":[{\"areaId\":370702,\"areaType\":2,\"name\":\"潍城区\",\"parentAreaId\":370700},{\"areaId\":370703,\"areaType\":2,\"name\":\"寒亭区\",\"parentAreaId\":370700},{\"areaId\":370704,\"areaType\":2,\"name\":\"坊子区\",\"parentAreaId\":370700},{\"areaId\":370705,\"areaType\":2,\"name\":\"奎文区\",\"parentAreaId\":370700},{\"areaId\":370724,\"areaType\":2,\"name\":\"临朐县\",\"parentAreaId\":370700},{\"areaId\":370725,\"areaType\":2,\"name\":\"昌乐县\",\"parentAreaId\":370700},{\"areaId\":370781,\"areaType\":2,\"name\":\"青州市\",\"parentAreaId\":370700},{\"areaId\":370782,\"areaType\":2,\"name\":\"诸城市\",\"parentAreaId\":370700},{\"areaId\":370783,\"areaType\":2,\"name\":\"寿光市\",\"parentAreaId\":370700},{\"areaId\":370784,\"areaType\":2,\"name\":\"安丘市\",\"parentAreaId\":370700},{\"areaId\":370785,\"areaType\":2,\"name\":\"高密市\",\"parentAreaId\":370700},{\"areaId\":370786,\"areaType\":2,\"name\":\"昌邑市\",\"parentAreaId\":370700}],\"name\":\"潍坊市\",\"parentAreaId\":370000},{\"areaId\":370800,\"areaType\":1,\"children\":[{\"areaId\":370811,\"areaType\":2,\"name\":\"任城区\",\"parentAreaId\":370800},{\"areaId\":370812,\"areaType\":2,\"name\":\"兖州区\",\"parentAreaId\":370800},{\"areaId\":370826,\"areaType\":2,\"name\":\"微山县\",\"parentAreaId\":370800},{\"areaId\":370827,\"areaType\":2,\"name\":\"鱼台县\",\"parentAreaId\":370800},{\"areaId\":370828,\"areaType\":2,\"name\":\"金乡县\",\"parentAreaId\":370800},{\"areaId\":370829,\"areaType\":2,\"name\":\"嘉祥县\",\"parentAreaId\":370800},{\"areaId\":370830,\"areaType\":2,\"name\":\"汶上县\",\"parentAreaId\":370800},{\"areaId\":370831,\"areaType\":2,\"name\":\"泗水县\",\"parentAreaId\":370800},{\"areaId\":370832,\"areaType\":2,\"name\":\"梁山县\",\"parentAreaId\":370800},{\"areaId\":370881,\"areaType\":2,\"name\":\"曲阜市\",\"parentAreaId\":370800},{\"areaId\":370883,\"areaType\":2,\"name\":\"邹城市\",\"parentAreaId\":370800}],\"name\":\"济宁市\",\"parentAreaId\":370000},{\"areaId\":370900,\"areaType\":1,\"children\":[{\"areaId\":370902,\"areaType\":2,\"name\":\"泰山区\",\"parentAreaId\":370900},{\"areaId\":370911,\"areaType\":2,\"name\":\"岱岳区\",\"parentAreaId\":370900},{\"areaId\":370921,\"areaType\":2,\"name\":\"宁阳县\",\"parentAreaId\":370900},{\"areaId\":370923,\"areaType\":2,\"name\":\"东平县\",\"parentAreaId\":370900},{\"areaId\":370982,\"areaType\":2,\"name\":\"新泰市\",\"parentAreaId\":370900},{\"areaId\":370983,\"areaType\":2,\"name\":\"肥城市\",\"parentAreaId\":370900}],\"name\":\"泰安市\",\"parentAreaId\":370000},{\"areaId\":371000,\"areaType\":1,\"children\":[{\"areaId\":371002,\"areaType\":2,\"name\":\"环翠区\",\"parentAreaId\":371000},{\"areaId\":371003,\"areaType\":2,\"name\":\"文登区\",\"parentAreaId\":371000},{\"areaId\":371082,\"areaType\":2,\"name\":\"荣成市\",\"parentAreaId\":371000},{\"areaId\":371083,\"areaType\":2,\"name\":\"乳山市\",\"parentAreaId\":371000}],\"name\":\"威海市\",\"parentAreaId\":370000},{\"areaId\":371100,\"areaType\":1,\"children\":[{\"areaId\":371102,\"areaType\":2,\"name\":\"东港区\",\"parentAreaId\":371100},{\"areaId\":371103,\"areaType\":2,\"name\":\"岚山区\",\"parentAreaId\":371100},{\"areaId\":371121,\"areaType\":2,\"name\":\"五莲县\",\"parentAreaId\":371100},{\"areaId\":371122,\"areaType\":2,\"name\":\"莒县\",\"parentAreaId\":371100}],\"name\":\"日照市\",\"parentAreaId\":370000},{\"areaId\":371200,\"areaType\":1,\"children\":[{\"areaId\":371202,\"areaType\":2,\"name\":\"莱城区\",\"parentAreaId\":371200},{\"areaId\":371203,\"areaType\":2,\"name\":\"钢城区\",\"parentAreaId\":371200}],\"name\":\"莱芜市\",\"parentAreaId\":370000},{\"areaId\":371300,\"areaType\":1,\"children\":[{\"areaId\":371302,\"areaType\":2,\"name\":\"兰山区\",\"parentAreaId\":371300},{\"areaId\":371311,\"areaType\":2,\"name\":\"罗庄区\",\"parentAreaId\":371300},{\"areaId\":371312,\"areaType\":2,\"name\":\"河东区\",\"parentAreaId\":371300},{\"areaId\":371321,\"areaType\":2,\"name\":\"沂南县\",\"parentAreaId\":371300},{\"areaId\":371322,\"areaType\":2,\"name\":\"郯城县\",\"parentAreaId\":371300},{\"areaId\":371323,\"areaType\":2,\"name\":\"沂水县\",\"parentAreaId\":371300},{\"areaId\":371324,\"areaType\":2,\"name\":\"兰陵县\",\"parentAreaId\":371300},{\"areaId\":371325,\"areaType\":2,\"name\":\"费县\",\"parentAreaId\":371300},{\"areaId\":371326,\"areaType\":2,\"name\":\"平邑县\",\"parentAreaId\":371300},{\"areaId\":371327,\"areaType\":2,\"name\":\"莒南县\",\"parentAreaId\":371300},{\"areaId\":371328,\"areaType\":2,\"name\":\"蒙阴县\",\"parentAreaId\":371300},{\"areaId\":371329,\"areaType\":2,\"name\":\"临沭县\",\"parentAreaId\":371300}],\"name\":\"临沂市\",\"parentAreaId\":370000},{\"areaId\":371400,\"areaType\":1,\"children\":[{\"areaId\":371402,\"areaType\":2,\"name\":\"德城区\",\"parentAreaId\":371400},{\"areaId\":371403,\"areaType\":2,\"name\":\"陵城区\",\"parentAreaId\":371400},{\"areaId\":371422,\"areaType\":2,\"name\":\"宁津县\",\"parentAreaId\":371400},{\"areaId\":371423,\"areaType\":2,\"name\":\"庆云县\",\"parentAreaId\":371400},{\"areaId\":371424,\"areaType\":2,\"name\":\"临邑县\",\"parentAreaId\":371400},{\"areaId\":371425,\"areaType\":2,\"name\":\"齐河县\",\"parentAreaId\":371400},{\"areaId\":371426,\"areaType\":2,\"name\":\"平原县\",\"parentAreaId\":371400},{\"areaId\":371427,\"areaType\":2,\"name\":\"夏津县\",\"parentAreaId\":371400},{\"areaId\":371428,\"areaType\":2,\"name\":\"武城县\",\"parentAreaId\":371400},{\"areaId\":371481,\"areaType\":2,\"name\":\"乐陵市\",\"parentAreaId\":371400},{\"areaId\":371482,\"areaType\":2,\"name\":\"禹城市\",\"parentAreaId\":371400}],\"name\":\"德州市\",\"parentAreaId\":370000},{\"areaId\":371500,\"areaType\":1,\"children\":[{\"areaId\":371502,\"areaType\":2,\"name\":\"东昌府区\",\"parentAreaId\":371500},{\"areaId\":371521,\"areaType\":2,\"name\":\"阳谷县\",\"parentAreaId\":371500},{\"areaId\":371522,\"areaType\":2,\"name\":\"莘县\",\"parentAreaId\":371500},{\"areaId\":371523,\"areaType\":2,\"name\":\"茌平县\",\"parentAreaId\":371500},{\"areaId\":371524,\"areaType\":2,\"name\":\"东阿县\",\"parentAreaId\":371500},{\"areaId\":371525,\"areaType\":2,\"name\":\"冠县\",\"parentAreaId\":371500},{\"areaId\":371526,\"areaType\":2,\"name\":\"高唐县\",\"parentAreaId\":371500},{\"areaId\":371581,\"areaType\":2,\"name\":\"临清市\",\"parentAreaId\":371500}],\"name\":\"聊城市\",\"parentAreaId\":370000},{\"areaId\":371600,\"areaType\":1,\"children\":[{\"areaId\":371602,\"areaType\":2,\"name\":\"滨城区\",\"parentAreaId\":371600},{\"areaId\":371603,\"areaType\":2,\"name\":\"沾化区\",\"parentAreaId\":371600},{\"areaId\":371621,\"areaType\":2,\"name\":\"惠民县\",\"parentAreaId\":371600},{\"areaId\":371622,\"areaType\":2,\"name\":\"阳信县\",\"parentAreaId\":371600},{\"areaId\":371623,\"areaType\":2,\"name\":\"无棣县\",\"parentAreaId\":371600},{\"areaId\":371625,\"areaType\":2,\"name\":\"博兴县\",\"parentAreaId\":371600},{\"areaId\":371626,\"areaType\":2,\"name\":\"邹平县\",\"parentAreaId\":371600}],\"name\":\"滨州市\",\"parentAreaId\":370000},{\"areaId\":371700,\"areaType\":1,\"children\":[{\"areaId\":371702,\"areaType\":2,\"name\":\"牡丹区\",\"parentAreaId\":371700},{\"areaId\":371703,\"areaType\":2,\"name\":\"定陶区\",\"parentAreaId\":371700},{\"areaId\":371721,\"areaType\":2,\"name\":\"曹县\",\"parentAreaId\":371700},{\"areaId\":371722,\"areaType\":2,\"name\":\"单县\",\"parentAreaId\":371700},{\"areaId\":371723,\"areaType\":2,\"name\":\"成武县\",\"parentAreaId\":371700},{\"areaId\":371724,\"areaType\":2,\"name\":\"巨野县\",\"parentAreaId\":371700},{\"areaId\":371725,\"areaType\":2,\"name\":\"郓城县\",\"parentAreaId\":371700},{\"areaId\":371726,\"areaType\":2,\"name\":\"鄄城县\",\"parentAreaId\":371700},{\"areaId\":371728,\"areaType\":2,\"name\":\"东明县\",\"parentAreaId\":371700}],\"name\":\"菏泽市\",\"parentAreaId\":370000}],\"name\":\"山东省\",\"parentAreaId\":0},{\"areaId\":410000,\"areaType\":0,\"children\":[{\"areaId\":410100,\"areaType\":1,\"children\":[{\"areaId\":410102,\"areaType\":2,\"name\":\"中原区\",\"parentAreaId\":410100},{\"areaId\":410103,\"areaType\":2,\"name\":\"二七区\",\"parentAreaId\":410100},{\"areaId\":410104,\"areaType\":2,\"name\":\"管城回族区\",\"parentAreaId\":410100},{\"areaId\":410105,\"areaType\":2,\"name\":\"金水区\",\"parentAreaId\":410100},{\"areaId\":410106,\"areaType\":2,\"name\":\"上街区\",\"parentAreaId\":410100},{\"areaId\":410108,\"areaType\":2,\"name\":\"惠济区\",\"parentAreaId\":410100},{\"areaId\":410122,\"areaType\":2,\"name\":\"中牟县\",\"parentAreaId\":410100},{\"areaId\":410181,\"areaType\":2,\"name\":\"巩义市\",\"parentAreaId\":410100},{\"areaId\":410182,\"areaType\":2,\"name\":\"荥阳市\",\"parentAreaId\":410100},{\"areaId\":410183,\"areaType\":2,\"name\":\"新密市\",\"parentAreaId\":410100},{\"areaId\":410184,\"areaType\":2,\"name\":\"新郑市\",\"parentAreaId\":410100},{\"areaId\":410185,\"areaType\":2,\"name\":\"登封市\",\"parentAreaId\":410100}],\"name\":\"郑州市\",\"parentAreaId\":410000},{\"areaId\":410200,\"areaType\":1,\"children\":[{\"areaId\":410202,\"areaType\":2,\"name\":\"龙亭区\",\"parentAreaId\":410200},{\"areaId\":410203,\"areaType\":2,\"name\":\"顺河回族区\",\"parentAreaId\":410200},{\"areaId\":410204,\"areaType\":2,\"name\":\"鼓楼区\",\"parentAreaId\":410200},{\"areaId\":410205,\"areaType\":2,\"name\":\"禹王台区\",\"parentAreaId\":410200},{\"areaId\":410212,\"areaType\":2,\"name\":\"祥符区\",\"parentAreaId\":410200},{\"areaId\":410221,\"areaType\":2,\"name\":\"杞县\",\"parentAreaId\":410200},{\"areaId\":410222,\"areaType\":2,\"name\":\"通许县\",\"parentAreaId\":410200},{\"areaId\":410223,\"areaType\":2,\"name\":\"尉氏县\",\"parentAreaId\":410200},{\"areaId\":410225,\"areaType\":2,\"name\":\"兰考县\",\"parentAreaId\":410200}],\"name\":\"开封市\",\"parentAreaId\":410000},{\"areaId\":410300,\"areaType\":1,\"children\":[{\"areaId\":410302,\"areaType\":2,\"name\":\"老城区\",\"parentAreaId\":410300},{\"areaId\":410303,\"areaType\":2,\"name\":\"西工区\",\"parentAreaId\":410300},{\"areaId\":410304,\"areaType\":2,\"name\":\"瀍河回族区\",\"parentAreaId\":410300},{\"areaId\":410305,\"areaType\":2,\"name\":\"涧西区\",\"parentAreaId\":410300},{\"areaId\":410306,\"areaType\":2,\"name\":\"吉利区\",\"parentAreaId\":410300},{\"areaId\":410311,\"areaType\":2,\"name\":\"洛龙区\",\"parentAreaId\":410300},{\"areaId\":410322,\"areaType\":2,\"name\":\"孟津县\",\"parentAreaId\":410300},{\"areaId\":410323,\"areaType\":2,\"name\":\"新安县\",\"parentAreaId\":410300},{\"areaId\":410324,\"areaType\":2,\"name\":\"栾川县\",\"parentAreaId\":410300},{\"areaId\":410325,\"areaType\":2,\"name\":\"嵩县\",\"parentAreaId\":410300},{\"areaId\":410326,\"areaType\":2,\"name\":\"汝阳县\",\"parentAreaId\":410300},{\"areaId\":410327,\"areaType\":2,\"name\":\"宜阳县\",\"parentAreaId\":410300},{\"areaId\":410328,\"areaType\":2,\"name\":\"洛宁县\",\"parentAreaId\":410300},{\"areaId\":410329,\"areaType\":2,\"name\":\"伊川县\",\"parentAreaId\":410300},{\"areaId\":410381,\"areaType\":2,\"name\":\"偃师市\",\"parentAreaId\":410300}],\"name\":\"洛阳市\",\"parentAreaId\":410000},{\"areaId\":410400,\"areaType\":1,\"children\":[{\"areaId\":410402,\"areaType\":2,\"name\":\"新华区\",\"parentAreaId\":410400},{\"areaId\":410403,\"areaType\":2,\"name\":\"卫东区\",\"parentAreaId\":410400},{\"areaId\":410404,\"areaType\":2,\"name\":\"石龙区\",\"parentAreaId\":410400},{\"areaId\":410411,\"areaType\":2,\"name\":\"湛河区\",\"parentAreaId\":410400},{\"areaId\":410421,\"areaType\":2,\"name\":\"宝丰县\",\"parentAreaId\":410400},{\"areaId\":410422,\"areaType\":2,\"name\":\"叶县\",\"parentAreaId\":410400},{\"areaId\":410423,\"areaType\":2,\"name\":\"鲁山县\",\"parentAreaId\":410400},{\"areaId\":410425,\"areaType\":2,\"name\":\"郏县\",\"parentAreaId\":410400},{\"areaId\":410481,\"areaType\":2,\"name\":\"舞钢市\",\"parentAreaId\":410400},{\"areaId\":410482,\"areaType\":2,\"name\":\"汝州市\",\"parentAreaId\":410400}],\"name\":\"平顶山市\",\"parentAreaId\":410000},{\"areaId\":410500,\"areaType\":1,\"children\":[{\"areaId\":410502,\"areaType\":2,\"name\":\"文峰区\",\"parentAreaId\":410500},{\"areaId\":410503,\"areaType\":2,\"name\":\"北关区\",\"parentAreaId\":410500},{\"areaId\":410505,\"areaType\":2,\"name\":\"殷都区\",\"parentAreaId\":410500},{\"areaId\":410506,\"areaType\":2,\"name\":\"龙安区\",\"parentAreaId\":410500},{\"areaId\":410522,\"areaType\":2,\"name\":\"安阳县\",\"parentAreaId\":410500},{\"areaId\":410523,\"areaType\":2,\"name\":\"汤阴县\",\"parentAreaId\":410500},{\"areaId\":410526,\"areaType\":2,\"name\":\"滑县\",\"parentAreaId\":410500},{\"areaId\":410527,\"areaType\":2,\"name\":\"内黄县\",\"parentAreaId\":410500},{\"areaId\":410581,\"areaType\":2,\"name\":\"林州市\",\"parentAreaId\":410500}],\"name\":\"安阳市\",\"parentAreaId\":410000},{\"areaId\":410600,\"areaType\":1,\"children\":[{\"areaId\":410602,\"areaType\":2,\"name\":\"鹤山区\",\"parentAreaId\":410600},{\"areaId\":410603,\"areaType\":2,\"name\":\"山城区\",\"parentAreaId\":410600},{\"areaId\":410611,\"areaType\":2,\"name\":\"淇滨区\",\"parentAreaId\":410600},{\"areaId\":410621,\"areaType\":2,\"name\":\"浚县\",\"parentAreaId\":410600},{\"areaId\":410622,\"areaType\":2,\"name\":\"淇县\",\"parentAreaId\":410600}],\"name\":\"鹤壁市\",\"parentAreaId\":410000},{\"areaId\":410700,\"areaType\":1,\"children\":[{\"areaId\":410702,\"areaType\":2,\"name\":\"红旗区\",\"parentAreaId\":410700},{\"areaId\":410703,\"areaType\":2,\"name\":\"卫滨区\",\"parentAreaId\":410700},{\"areaId\":410704,\"areaType\":2,\"name\":\"凤泉区\",\"parentAreaId\":410700},{\"areaId\":410711,\"areaType\":2,\"name\":\"牧野区\",\"parentAreaId\":410700},{\"areaId\":410721,\"areaType\":2,\"name\":\"新乡县\",\"parentAreaId\":410700},{\"areaId\":410724,\"areaType\":2,\"name\":\"获嘉县\",\"parentAreaId\":410700},{\"areaId\":410725,\"areaType\":2,\"name\":\"原阳县\",\"parentAreaId\":410700},{\"areaId\":410726,\"areaType\":2,\"name\":\"延津县\",\"parentAreaId\":410700},{\"areaId\":410727,\"areaType\":2,\"name\":\"封丘县\",\"parentAreaId\":410700},{\"areaId\":410728,\"areaType\":2,\"name\":\"长垣县\",\"parentAreaId\":410700},{\"areaId\":410781,\"areaType\":2,\"name\":\"卫辉市\",\"parentAreaId\":410700},{\"areaId\":410782,\"areaType\":2,\"name\":\"辉县市\",\"parentAreaId\":410700}],\"name\":\"新乡市\",\"parentAreaId\":410000},{\"areaId\":410800,\"areaType\":1,\"children\":[{\"areaId\":410802,\"areaType\":2,\"name\":\"解放区\",\"parentAreaId\":410800},{\"areaId\":410803,\"areaType\":2,\"name\":\"中站区\",\"parentAreaId\":410800},{\"areaId\":410804,\"areaType\":2,\"name\":\"马村区\",\"parentAreaId\":410800},{\"areaId\":410811,\"areaType\":2,\"name\":\"山阳区\",\"parentAreaId\":410800},{\"areaId\":410821,\"areaType\":2,\"name\":\"修武县\",\"parentAreaId\":410800},{\"areaId\":410822,\"areaType\":2,\"name\":\"博爱县\",\"parentAreaId\":410800},{\"areaId\":410823,\"areaType\":2,\"name\":\"武陟县\",\"parentAreaId\":410800},{\"areaId\":410825,\"areaType\":2,\"name\":\"温县\",\"parentAreaId\":410800},{\"areaId\":410882,\"areaType\":2,\"name\":\"沁阳市\",\"parentAreaId\":410800},{\"areaId\":410883,\"areaType\":2,\"name\":\"孟州市\",\"parentAreaId\":410800}],\"name\":\"焦作市\",\"parentAreaId\":410000},{\"areaId\":410900,\"areaType\":1,\"children\":[{\"areaId\":410902,\"areaType\":2,\"name\":\"华龙区\",\"parentAreaId\":410900},{\"areaId\":410922,\"areaType\":2,\"name\":\"清丰县\",\"parentAreaId\":410900},{\"areaId\":410923,\"areaType\":2,\"name\":\"南乐县\",\"parentAreaId\":410900},{\"areaId\":410926,\"areaType\":2,\"name\":\"范县\",\"parentAreaId\":410900},{\"areaId\":410927,\"areaType\":2,\"name\":\"台前县\",\"parentAreaId\":410900},{\"areaId\":410928,\"areaType\":2,\"name\":\"濮阳县\",\"parentAreaId\":410900}],\"name\":\"濮阳市\",\"parentAreaId\":410000},{\"areaId\":411000,\"areaType\":1,\"children\":[{\"areaId\":411002,\"areaType\":2,\"name\":\"魏都区\",\"parentAreaId\":411000},{\"areaId\":411003,\"areaType\":2,\"name\":\"建安区\",\"parentAreaId\":411000},{\"areaId\":411024,\"areaType\":2,\"name\":\"鄢陵县\",\"parentAreaId\":411000},{\"areaId\":411025,\"areaType\":2,\"name\":\"襄城县\",\"parentAreaId\":411000},{\"areaId\":411081,\"areaType\":2,\"name\":\"禹州市\",\"parentAreaId\":411000},{\"areaId\":411082,\"areaType\":2,\"name\":\"长葛市\",\"parentAreaId\":411000}],\"name\":\"许昌市\",\"parentAreaId\":410000},{\"areaId\":411100,\"areaType\":1,\"children\":[{\"areaId\":411102,\"areaType\":2,\"name\":\"源汇区\",\"parentAreaId\":411100},{\"areaId\":411103,\"areaType\":2,\"name\":\"郾城区\",\"parentAreaId\":411100},{\"areaId\":411104,\"areaType\":2,\"name\":\"召陵区\",\"parentAreaId\":411100},{\"areaId\":411121,\"areaType\":2,\"name\":\"舞阳县\",\"parentAreaId\":411100},{\"areaId\":411122,\"areaType\":2,\"name\":\"临颍县\",\"parentAreaId\":411100}],\"name\":\"漯河市\",\"parentAreaId\":410000},{\"areaId\":411200,\"areaType\":1,\"children\":[{\"areaId\":411202,\"areaType\":2,\"name\":\"湖滨区\",\"parentAreaId\":411200},{\"areaId\":411203,\"areaType\":2,\"name\":\"陕州区\",\"parentAreaId\":411200},{\"areaId\":411221,\"areaType\":2,\"name\":\"渑池县\",\"parentAreaId\":411200},{\"areaId\":411224,\"areaType\":2,\"name\":\"卢氏县\",\"parentAreaId\":411200},{\"areaId\":411281,\"areaType\":2,\"name\":\"义马市\",\"parentAreaId\":411200},{\"areaId\":411282,\"areaType\":2,\"name\":\"灵宝市\",\"parentAreaId\":411200}],\"name\":\"三门峡市\",\"parentAreaId\":410000},{\"areaId\":411300,\"areaType\":1,\"children\":[{\"areaId\":411302,\"areaType\":2,\"name\":\"宛城区\",\"parentAreaId\":411300},{\"areaId\":411303,\"areaType\":2,\"name\":\"卧龙区\",\"parentAreaId\":411300},{\"areaId\":411321,\"areaType\":2,\"name\":\"南召县\",\"parentAreaId\":411300},{\"areaId\":411322,\"areaType\":2,\"name\":\"方城县\",\"parentAreaId\":411300},{\"areaId\":411323,\"areaType\":2,\"name\":\"西峡县\",\"parentAreaId\":411300},{\"areaId\":411324,\"areaType\":2,\"name\":\"镇平县\",\"parentAreaId\":411300},{\"areaId\":411325,\"areaType\":2,\"name\":\"内乡县\",\"parentAreaId\":411300},{\"areaId\":411326,\"areaType\":2,\"name\":\"淅川县\",\"parentAreaId\":411300},{\"areaId\":411327,\"areaType\":2,\"name\":\"社旗县\",\"parentAreaId\":411300},{\"areaId\":411328,\"areaType\":2,\"name\":\"唐河县\",\"parentAreaId\":411300},{\"areaId\":411329,\"areaType\":2,\"name\":\"新野县\",\"parentAreaId\":411300},{\"areaId\":411330,\"areaType\":2,\"name\":\"桐柏县\",\"parentAreaId\":411300},{\"areaId\":411381,\"areaType\":2,\"name\":\"邓州市\",\"parentAreaId\":411300}],\"name\":\"南阳市\",\"parentAreaId\":410000},{\"areaId\":411400,\"areaType\":1,\"children\":[{\"areaId\":411402,\"areaType\":2,\"name\":\"梁园区\",\"parentAreaId\":411400},{\"areaId\":411403,\"areaType\":2,\"name\":\"睢阳区\",\"parentAreaId\":411400},{\"areaId\":411421,\"areaType\":2,\"name\":\"民权县\",\"parentAreaId\":411400},{\"areaId\":411422,\"areaType\":2,\"name\":\"睢县\",\"parentAreaId\":411400},{\"areaId\":411423,\"areaType\":2,\"name\":\"宁陵县\",\"parentAreaId\":411400},{\"areaId\":411424,\"areaType\":2,\"name\":\"柘城县\",\"parentAreaId\":411400},{\"areaId\":411425,\"areaType\":2,\"name\":\"虞城县\",\"parentAreaId\":411400},{\"areaId\":411426,\"areaType\":2,\"name\":\"夏邑县\",\"parentAreaId\":411400},{\"areaId\":411481,\"areaType\":2,\"name\":\"永城市\",\"parentAreaId\":411400}],\"name\":\"商丘市\",\"parentAreaId\":410000},{\"areaId\":411500,\"areaType\":1,\"children\":[{\"areaId\":411502,\"areaType\":2,\"name\":\"浉河区\",\"parentAreaId\":411500},{\"areaId\":411503,\"areaType\":2,\"name\":\"平桥区\",\"parentAreaId\":411500},{\"areaId\":411521,\"areaType\":2,\"name\":\"罗山县\",\"parentAreaId\":411500},{\"areaId\":411522,\"areaType\":2,\"name\":\"光山县\",\"parentAreaId\":411500},{\"areaId\":411523,\"areaType\":2,\"name\":\"新县\",\"parentAreaId\":411500},{\"areaId\":411524,\"areaType\":2,\"name\":\"商城县\",\"parentAreaId\":411500},{\"areaId\":411525,\"areaType\":2,\"name\":\"固始县\",\"parentAreaId\":411500},{\"areaId\":411526,\"areaType\":2,\"name\":\"潢川县\",\"parentAreaId\":411500},{\"areaId\":411527,\"areaType\":2,\"name\":\"淮滨县\",\"parentAreaId\":411500},{\"areaId\":411528,\"areaType\":2,\"name\":\"息县\",\"parentAreaId\":411500}],\"name\":\"信阳市\",\"parentAreaId\":410000},{\"areaId\":411600,\"areaType\":1,\"children\":[{\"areaId\":411602,\"areaType\":2,\"name\":\"川汇区\",\"parentAreaId\":411600},{\"areaId\":411621,\"areaType\":2,\"name\":\"扶沟县\",\"parentAreaId\":411600},{\"areaId\":411622,\"areaType\":2,\"name\":\"西华县\",\"parentAreaId\":411600},{\"areaId\":411623,\"areaType\":2,\"name\":\"商水县\",\"parentAreaId\":411600},{\"areaId\":411624,\"areaType\":2,\"name\":\"沈丘县\",\"parentAreaId\":411600},{\"areaId\":411625,\"areaType\":2,\"name\":\"郸城县\",\"parentAreaId\":411600},{\"areaId\":411626,\"areaType\":2,\"name\":\"淮阳县\",\"parentAreaId\":411600},{\"areaId\":411627,\"areaType\":2,\"name\":\"太康县\",\"parentAreaId\":411600},{\"areaId\":411628,\"areaType\":2,\"name\":\"鹿邑县\",\"parentAreaId\":411600},{\"areaId\":411681,\"areaType\":2,\"name\":\"项城市\",\"parentAreaId\":411600}],\"name\":\"周口市\",\"parentAreaId\":410000},{\"areaId\":411700,\"areaType\":1,\"children\":[{\"areaId\":411702,\"areaType\":2,\"name\":\"驿城区\",\"parentAreaId\":411700},{\"areaId\":411721,\"areaType\":2,\"name\":\"西平县\",\"parentAreaId\":411700},{\"areaId\":411722,\"areaType\":2,\"name\":\"上蔡县\",\"parentAreaId\":411700},{\"areaId\":411723,\"areaType\":2,\"name\":\"平舆县\",\"parentAreaId\":411700},{\"areaId\":411724,\"areaType\":2,\"name\":\"正阳县\",\"parentAreaId\":411700},{\"areaId\":411725,\"areaType\":2,\"name\":\"确山县\",\"parentAreaId\":411700},{\"areaId\":411726,\"areaType\":2,\"name\":\"泌阳县\",\"parentAreaId\":411700},{\"areaId\":411727,\"areaType\":2,\"name\":\"汝南县\",\"parentAreaId\":411700},{\"areaId\":411728,\"areaType\":2,\"name\":\"遂平县\",\"parentAreaId\":411700},{\"areaId\":411729,\"areaType\":2,\"name\":\"新蔡县\",\"parentAreaId\":411700}],\"name\":\"驻马店市\",\"parentAreaId\":410000},{\"areaId\":419001,\"areaType\":1,\"children\":[{\"areaId\":419001001,\"areaType\":2,\"name\":\"沁园街道\",\"parentAreaId\":419001},{\"areaId\":419001002,\"areaType\":2,\"name\":\"济水街道\",\"parentAreaId\":419001},{\"areaId\":419001003,\"areaType\":2,\"name\":\"北海街道\",\"parentAreaId\":419001},{\"areaId\":419001004,\"areaType\":2,\"name\":\"天坛街道\",\"parentAreaId\":419001},{\"areaId\":419001005,\"areaType\":2,\"name\":\"玉泉街道\",\"parentAreaId\":419001},{\"areaId\":419001100,\"areaType\":2,\"name\":\"克井镇\",\"parentAreaId\":419001},{\"areaId\":419001101,\"areaType\":2,\"name\":\"五龙口镇\",\"parentAreaId\":419001},{\"areaId\":419001102,\"areaType\":2,\"name\":\"轵城镇\",\"parentAreaId\":419001},{\"areaId\":419001103,\"areaType\":2,\"name\":\"承留镇\",\"parentAreaId\":419001},{\"areaId\":419001104,\"areaType\":2,\"name\":\"邵原镇\",\"parentAreaId\":419001},{\"areaId\":419001105,\"areaType\":2,\"name\":\"坡头镇\",\"parentAreaId\":419001},{\"areaId\":419001106,\"areaType\":2,\"name\":\"梨林镇\",\"parentAreaId\":419001},{\"areaId\":419001107,\"areaType\":2,\"name\":\"大峪镇\",\"parentAreaId\":419001},{\"areaId\":419001108,\"areaType\":2,\"name\":\"思礼镇\",\"parentAreaId\":419001},{\"areaId\":419001109,\"areaType\":2,\"name\":\"王屋镇\",\"parentAreaId\":419001},{\"areaId\":419001110,\"areaType\":2,\"name\":\"下冶镇\",\"parentAreaId\":419001}],\"name\":\"济源市\",\"parentAreaId\":410000}],\"name\":\"河南省\",\"parentAreaId\":0},{\"areaId\":420000,\"areaType\":0,\"children\":[{\"areaId\":420100,\"areaType\":1,\"children\":[{\"areaId\":420102,\"areaType\":2,\"name\":\"江岸区\",\"parentAreaId\":420100},{\"areaId\":420103,\"areaType\":2,\"name\":\"江汉区\",\"parentAreaId\":420100},{\"areaId\":420104,\"areaType\":2,\"name\":\"硚口区\",\"parentAreaId\":420100},{\"areaId\":420105,\"areaType\":2,\"name\":\"汉阳区\",\"parentAreaId\":420100},{\"areaId\":420106,\"areaType\":2,\"name\":\"武昌区\",\"parentAreaId\":420100},{\"areaId\":420107,\"areaType\":2,\"name\":\"青山区\",\"parentAreaId\":420100},{\"areaId\":420111,\"areaType\":2,\"name\":\"洪山区\",\"parentAreaId\":420100},{\"areaId\":420112,\"areaType\":2,\"name\":\"东西湖区\",\"parentAreaId\":420100},{\"areaId\":420113,\"areaType\":2,\"name\":\"汉南区\",\"parentAreaId\":420100},{\"areaId\":420114,\"areaType\":2,\"name\":\"蔡甸区\",\"parentAreaId\":420100},{\"areaId\":420115,\"areaType\":2,\"name\":\"江夏区\",\"parentAreaId\":420100},{\"areaId\":420116,\"areaType\":2,\"name\":\"黄陂区\",\"parentAreaId\":420100},{\"areaId\":420117,\"areaType\":2,\"name\":\"新洲区\",\"parentAreaId\":420100}],\"name\":\"武汉市\",\"parentAreaId\":420000},{\"areaId\":420200,\"areaType\":1,\"children\":[{\"areaId\":420202,\"areaType\":2,\"name\":\"黄石港区\",\"parentAreaId\":420200},{\"areaId\":420203,\"areaType\":2,\"name\":\"西塞山区\",\"parentAreaId\":420200},{\"areaId\":420204,\"areaType\":2,\"name\":\"下陆区\",\"parentAreaId\":420200},{\"areaId\":420205,\"areaType\":2,\"name\":\"铁山区\",\"parentAreaId\":420200},{\"areaId\":420222,\"areaType\":2,\"name\":\"阳新县\",\"parentAreaId\":420200},{\"areaId\":420281,\"areaType\":2,\"name\":\"大冶市\",\"parentAreaId\":420200}],\"name\":\"黄石市\",\"parentAreaId\":420000},{\"areaId\":420300,\"areaType\":1,\"children\":[{\"areaId\":420302,\"areaType\":2,\"name\":\"茅箭区\",\"parentAreaId\":420300},{\"areaId\":420303,\"areaType\":2,\"name\":\"张湾区\",\"parentAreaId\":420300},{\"areaId\":420304,\"areaType\":2,\"name\":\"郧阳区\",\"parentAreaId\":420300},{\"areaId\":420322,\"areaType\":2,\"name\":\"郧西县\",\"parentAreaId\":420300},{\"areaId\":420323,\"areaType\":2,\"name\":\"竹山县\",\"parentAreaId\":420300},{\"areaId\":420324,\"areaType\":2,\"name\":\"竹溪县\",\"parentAreaId\":420300},{\"areaId\":420325,\"areaType\":2,\"name\":\"房县\",\"parentAreaId\":420300},{\"areaId\":420381,\"areaType\":2,\"name\":\"丹江口市\",\"parentAreaId\":420300}],\"name\":\"十堰市\",\"parentAreaId\":420000},{\"areaId\":420500,\"areaType\":1,\"children\":[{\"areaId\":420502,\"areaType\":2,\"name\":\"西陵区\",\"parentAreaId\":420500},{\"areaId\":420503,\"areaType\":2,\"name\":\"伍家岗区\",\"parentAreaId\":420500},{\"areaId\":420504,\"areaType\":2,\"name\":\"点军区\",\"parentAreaId\":420500},{\"areaId\":420505,\"areaType\":2,\"name\":\"猇亭区\",\"parentAreaId\":420500},{\"areaId\":420506,\"areaType\":2,\"name\":\"夷陵区\",\"parentAreaId\":420500},{\"areaId\":420525,\"areaType\":2,\"name\":\"远安县\",\"parentAreaId\":420500},{\"areaId\":420526,\"areaType\":2,\"name\":\"兴山县\",\"parentAreaId\":420500},{\"areaId\":420527,\"areaType\":2,\"name\":\"秭归县\",\"parentAreaId\":420500},{\"areaId\":420528,\"areaType\":2,\"name\":\"长阳土家族自治县\",\"parentAreaId\":420500},{\"areaId\":420529,\"areaType\":2,\"name\":\"五峰土家族自治县\",\"parentAreaId\":420500},{\"areaId\":420581,\"areaType\":2,\"name\":\"宜都市\",\"parentAreaId\":420500},{\"areaId\":420582,\"areaType\":2,\"name\":\"当阳市\",\"parentAreaId\":420500},{\"areaId\":420583,\"areaType\":2,\"name\":\"枝江市\",\"parentAreaId\":420500}],\"name\":\"宜昌市\",\"parentAreaId\":420000},{\"areaId\":420600,\"areaType\":1,\"children\":[{\"areaId\":420602,\"areaType\":2,\"name\":\"襄城区\",\"parentAreaId\":420600},{\"areaId\":420606,\"areaType\":2,\"name\":\"樊城区\",\"parentAreaId\":420600},{\"areaId\":420607,\"areaType\":2,\"name\":\"襄州区\",\"parentAreaId\":420600},{\"areaId\":420624,\"areaType\":2,\"name\":\"南漳县\",\"parentAreaId\":420600},{\"areaId\":420625,\"areaType\":2,\"name\":\"谷城县\",\"parentAreaId\":420600},{\"areaId\":420626,\"areaType\":2,\"name\":\"保康县\",\"parentAreaId\":420600},{\"areaId\":420682,\"areaType\":2,\"name\":\"老河口市\",\"parentAreaId\":420600},{\"areaId\":420683,\"areaType\":2,\"name\":\"枣阳市\",\"parentAreaId\":420600},{\"areaId\":420684,\"areaType\":2,\"name\":\"宜城市\",\"parentAreaId\":420600}],\"name\":\"襄阳市\",\"parentAreaId\":420000},{\"areaId\":420700,\"areaType\":1,\"children\":[{\"areaId\":420702,\"areaType\":2,\"name\":\"梁子湖区\",\"parentAreaId\":420700},{\"areaId\":420703,\"areaType\":2,\"name\":\"华容区\",\"parentAreaId\":420700},{\"areaId\":420704,\"areaType\":2,\"name\":\"鄂城区\",\"parentAreaId\":420700}],\"name\":\"鄂州市\",\"parentAreaId\":420000},{\"areaId\":420800,\"areaType\":1,\"children\":[{\"areaId\":420802,\"areaType\":2,\"name\":\"东宝区\",\"parentAreaId\":420800},{\"areaId\":420804,\"areaType\":2,\"name\":\"掇刀区\",\"parentAreaId\":420800},{\"areaId\":420822,\"areaType\":2,\"name\":\"沙洋县\",\"parentAreaId\":420800},{\"areaId\":420881,\"areaType\":2,\"name\":\"钟祥市\",\"parentAreaId\":420800},{\"areaId\":420882,\"areaType\":2,\"name\":\"京山市\",\"parentAreaId\":420800}],\"name\":\"荆门市\",\"parentAreaId\":420000},{\"areaId\":420900,\"areaType\":1,\"children\":[{\"areaId\":420902,\"areaType\":2,\"name\":\"孝南区\",\"parentAreaId\":420900},{\"areaId\":420921,\"areaType\":2,\"name\":\"孝昌县\",\"parentAreaId\":420900},{\"areaId\":420922,\"areaType\":2,\"name\":\"大悟县\",\"parentAreaId\":420900},{\"areaId\":420923,\"areaType\":2,\"name\":\"云梦县\",\"parentAreaId\":420900},{\"areaId\":420981,\"areaType\":2,\"name\":\"应城市\",\"parentAreaId\":420900},{\"areaId\":420982,\"areaType\":2,\"name\":\"安陆市\",\"parentAreaId\":420900},{\"areaId\":420984,\"areaType\":2,\"name\":\"汉川市\",\"parentAreaId\":420900}],\"name\":\"孝感市\",\"parentAreaId\":420000},{\"areaId\":421000,\"areaType\":1,\"children\":[{\"areaId\":421002,\"areaType\":2,\"name\":\"沙市区\",\"parentAreaId\":421000},{\"areaId\":421003,\"areaType\":2,\"name\":\"荆州区\",\"parentAreaId\":421000},{\"areaId\":421022,\"areaType\":2,\"name\":\"公安县\",\"parentAreaId\":421000},{\"areaId\":421023,\"areaType\":2,\"name\":\"监利县\",\"parentAreaId\":421000},{\"areaId\":421024,\"areaType\":2,\"name\":\"江陵县\",\"parentAreaId\":421000},{\"areaId\":421081,\"areaType\":2,\"name\":\"石首市\",\"parentAreaId\":421000},{\"areaId\":421083,\"areaType\":2,\"name\":\"洪湖市\",\"parentAreaId\":421000},{\"areaId\":421087,\"areaType\":2,\"name\":\"松滋市\",\"parentAreaId\":421000}],\"name\":\"荆州市\",\"parentAreaId\":420000},{\"areaId\":421100,\"areaType\":1,\"children\":[{\"areaId\":421102,\"areaType\":2,\"name\":\"黄州区\",\"parentAreaId\":421100},{\"areaId\":421121,\"areaType\":2,\"name\":\"团风县\",\"parentAreaId\":421100},{\"areaId\":421122,\"areaType\":2,\"name\":\"红安县\",\"parentAreaId\":421100},{\"areaId\":421123,\"areaType\":2,\"name\":\"罗田县\",\"parentAreaId\":421100},{\"areaId\":421124,\"areaType\":2,\"name\":\"英山县\",\"parentAreaId\":421100},{\"areaId\":421125,\"areaType\":2,\"name\":\"浠水县\",\"parentAreaId\":421100},{\"areaId\":421126,\"areaType\":2,\"name\":\"蕲春县\",\"parentAreaId\":421100},{\"areaId\":421127,\"areaType\":2,\"name\":\"黄梅县\",\"parentAreaId\":421100},{\"areaId\":421181,\"areaType\":2,\"name\":\"麻城市\",\"parentAreaId\":421100},{\"areaId\":421182,\"areaType\":2,\"name\":\"武穴市\",\"parentAreaId\":421100}],\"name\":\"黄冈市\",\"parentAreaId\":420000},{\"areaId\":421200,\"areaType\":1,\"children\":[{\"areaId\":421202,\"areaType\":2,\"name\":\"咸安区\",\"parentAreaId\":421200},{\"areaId\":421221,\"areaType\":2,\"name\":\"嘉鱼县\",\"parentAreaId\":421200},{\"areaId\":421222,\"areaType\":2,\"name\":\"通城县\",\"parentAreaId\":421200},{\"areaId\":421223,\"areaType\":2,\"name\":\"崇阳县\",\"parentAreaId\":421200},{\"areaId\":421224,\"areaType\":2,\"name\":\"通山县\",\"parentAreaId\":421200},{\"areaId\":421281,\"areaType\":2,\"name\":\"赤壁市\",\"parentAreaId\":421200}],\"name\":\"咸宁市\",\"parentAreaId\":420000},{\"areaId\":421300,\"areaType\":1,\"children\":[{\"areaId\":421303,\"areaType\":2,\"name\":\"曾都区\",\"parentAreaId\":421300},{\"areaId\":421321,\"areaType\":2,\"name\":\"随县\",\"parentAreaId\":421300},{\"areaId\":421381,\"areaType\":2,\"name\":\"广水市\",\"parentAreaId\":421300}],\"name\":\"随州市\",\"parentAreaId\":420000},{\"areaId\":422800,\"areaType\":1,\"children\":[{\"areaId\":422801,\"areaType\":2,\"name\":\"恩施市\",\"parentAreaId\":422800},{\"areaId\":422802,\"areaType\":2,\"name\":\"利川市\",\"parentAreaId\":422800},{\"areaId\":422822,\"areaType\":2,\"name\":\"建始县\",\"parentAreaId\":422800},{\"areaId\":422823,\"areaType\":2,\"name\":\"巴东县\",\"parentAreaId\":422800},{\"areaId\":422825,\"areaType\":2,\"name\":\"宣恩县\",\"parentAreaId\":422800},{\"areaId\":422826,\"areaType\":2,\"name\":\"咸丰县\",\"parentAreaId\":422800},{\"areaId\":422827,\"areaType\":2,\"name\":\"来凤县\",\"parentAreaId\":422800},{\"areaId\":422828,\"areaType\":2,\"name\":\"鹤峰县\",\"parentAreaId\":422800}],\"name\":\"恩施土家族苗族自治州\",\"parentAreaId\":420000},{\"areaId\":429004,\"areaType\":1,\"children\":[{\"areaId\":429004001,\"areaType\":2,\"name\":\"沙嘴街道\",\"parentAreaId\":429004},{\"areaId\":429004002,\"areaType\":2,\"name\":\"干河街道\",\"parentAreaId\":429004},{\"areaId\":429004003,\"areaType\":2,\"name\":\"龙华山街道\",\"parentAreaId\":429004},{\"areaId\":429004100,\"areaType\":2,\"name\":\"郑场镇\",\"parentAreaId\":429004},{\"areaId\":429004101,\"areaType\":2,\"name\":\"毛嘴镇\",\"parentAreaId\":429004},{\"areaId\":429004102,\"areaType\":2,\"name\":\"豆河镇\",\"parentAreaId\":429004},{\"areaId\":429004103,\"areaType\":2,\"name\":\"三伏潭镇\",\"parentAreaId\":429004},{\"areaId\":429004104,\"areaType\":2,\"name\":\"胡场镇\",\"parentAreaId\":429004},{\"areaId\":429004105,\"areaType\":2,\"name\":\"长倘口镇\",\"parentAreaId\":429004},{\"areaId\":429004106,\"areaType\":2,\"name\":\"西流河镇\",\"parentAreaId\":429004},{\"areaId\":429004107,\"areaType\":2,\"name\":\"沙湖镇\",\"parentAreaId\":429004},{\"areaId\":429004108,\"areaType\":2,\"name\":\"杨林尾镇\",\"parentAreaId\":429004},{\"areaId\":429004109,\"areaType\":2,\"name\":\"彭场镇\",\"parentAreaId\":429004},{\"areaId\":429004110,\"areaType\":2,\"name\":\"张沟镇\",\"parentAreaId\":429004},{\"areaId\":429004111,\"areaType\":2,\"name\":\"郭河镇\",\"parentAreaId\":429004},{\"areaId\":429004112,\"areaType\":2,\"name\":\"沔城回族镇\",\"parentAreaId\":429004},{\"areaId\":429004113,\"areaType\":2,\"name\":\"通海口镇\",\"parentAreaId\":429004},{\"areaId\":429004114,\"areaType\":2,\"name\":\"陈场镇\",\"parentAreaId\":429004},{\"areaId\":429004400,\"areaType\":2,\"name\":\"工业园区\",\"parentAreaId\":429004},{\"areaId\":429004401,\"areaType\":2,\"name\":\"九合垸原种场\",\"parentAreaId\":429004},{\"areaId\":429004404,\"areaType\":2,\"name\":\"五湖渔场\",\"parentAreaId\":429004},{\"areaId\":429004405,\"areaType\":2,\"name\":\"赵西垸林场\",\"parentAreaId\":429004},{\"areaId\":429004407,\"areaType\":2,\"name\":\"畜禽良种场\",\"parentAreaId\":429004}],\"name\":\"仙桃市\",\"parentAreaId\":420000},{\"areaId\":429005,\"areaType\":1,\"children\":[{\"areaId\":429005001,\"areaType\":2,\"name\":\"园林街道\",\"parentAreaId\":429005},{\"areaId\":429005003,\"areaType\":2,\"name\":\"周矶街道\",\"parentAreaId\":429005},{\"areaId\":429005004,\"areaType\":2,\"name\":\"广华街道\",\"parentAreaId\":429005},{\"areaId\":429005005,\"areaType\":2,\"name\":\"泰丰街道\",\"parentAreaId\":429005},{\"areaId\":429005006,\"areaType\":2,\"name\":\"高场街道\",\"parentAreaId\":429005},{\"areaId\":429005100,\"areaType\":2,\"name\":\"竹根滩镇\",\"parentAreaId\":429005},{\"areaId\":429005101,\"areaType\":2,\"name\":\"渔洋镇\",\"parentAreaId\":429005},{\"areaId\":429005102,\"areaType\":2,\"name\":\"王场镇\",\"parentAreaId\":429005},{\"areaId\":429005103,\"areaType\":2,\"name\":\"高石碑镇\",\"parentAreaId\":429005},{\"areaId\":429005104,\"areaType\":2,\"name\":\"熊口镇\",\"parentAreaId\":429005},{\"areaId\":429005105,\"areaType\":2,\"name\":\"老新镇\",\"parentAreaId\":429005},{\"areaId\":429005106,\"areaType\":2,\"name\":\"浩口镇\",\"parentAreaId\":429005},{\"areaId\":429005107,\"areaType\":2,\"name\":\"积玉口镇\",\"parentAreaId\":429005},{\"areaId\":429005108,\"areaType\":2,\"name\":\"张金镇\",\"parentAreaId\":429005},{\"areaId\":429005109,\"areaType\":2,\"name\":\"龙湾镇\",\"parentAreaId\":429005},{\"areaId\":429005451,\"areaType\":2,\"name\":\"后湖管理区\",\"parentAreaId\":429005},{\"areaId\":429005452,\"areaType\":2,\"name\":\"熊口管理区\",\"parentAreaId\":429005},{\"areaId\":429005453,\"areaType\":2,\"name\":\"总口管理区\",\"parentAreaId\":429005},{\"areaId\":429005454,\"areaType\":2,\"name\":\"白鹭湖管理区\",\"parentAreaId\":429005},{\"areaId\":429005455,\"areaType\":2,\"name\":\"运粮湖管理区\",\"parentAreaId\":429005},{\"areaId\":429005900,\"areaType\":2,\"name\":\"杨市街道\",\"parentAreaId\":429005},{\"areaId\":429005950,\"areaType\":2,\"name\":\"广华寺农场\",\"parentAreaId\":429005}],\"name\":\"潜江市\",\"parentAreaId\":420000},{\"areaId\":429006,\"areaType\":1,\"children\":[{\"areaId\":429006001,\"areaType\":2,\"name\":\"竟陵街道\",\"parentAreaId\":429006},{\"areaId\":429006002,\"areaType\":2,\"name\":\"侨乡街道开发区\",\"parentAreaId\":429006},{\"areaId\":429006003,\"areaType\":2,\"name\":\"杨林街道\",\"parentAreaId\":429006},{\"areaId\":429006100,\"areaType\":2,\"name\":\"多宝镇\",\"parentAreaId\":429006},{\"areaId\":429006101,\"areaType\":2,\"name\":\"拖市镇\",\"parentAreaId\":429006},{\"areaId\":429006102,\"areaType\":2,\"name\":\"张港镇\",\"parentAreaId\":429006},{\"areaId\":429006103,\"areaType\":2,\"name\":\"蒋场镇\",\"parentAreaId\":429006},{\"areaId\":429006104,\"areaType\":2,\"name\":\"汪场镇\",\"parentAreaId\":429006},{\"areaId\":429006105,\"areaType\":2,\"name\":\"渔薪镇\",\"parentAreaId\":429006},{\"areaId\":429006106,\"areaType\":2,\"name\":\"黄潭镇\",\"parentAreaId\":429006},{\"areaId\":429006107,\"areaType\":2,\"name\":\"岳口镇\",\"parentAreaId\":429006},{\"areaId\":429006108,\"areaType\":2,\"name\":\"横林镇\",\"parentAreaId\":429006},{\"areaId\":429006109,\"areaType\":2,\"name\":\"彭市镇\",\"parentAreaId\":429006},{\"areaId\":429006110,\"areaType\":2,\"name\":\"麻洋镇\",\"parentAreaId\":429006},{\"areaId\":429006111,\"areaType\":2,\"name\":\"多祥镇\",\"parentAreaId\":429006},{\"areaId\":429006112,\"areaType\":2,\"name\":\"干驿镇\",\"parentAreaId\":429006},{\"areaId\":429006113,\"areaType\":2,\"name\":\"马湾镇\",\"parentAreaId\":429006},{\"areaId\":429006114,\"areaType\":2,\"name\":\"卢市镇\",\"parentAreaId\":429006},{\"areaId\":429006115,\"areaType\":2,\"name\":\"小板镇\",\"parentAreaId\":429006},{\"areaId\":429006116,\"areaType\":2,\"name\":\"九真镇\",\"parentAreaId\":429006},{\"areaId\":429006118,\"areaType\":2,\"name\":\"皂市镇\",\"parentAreaId\":429006},{\"areaId\":429006119,\"areaType\":2,\"name\":\"胡市镇\",\"parentAreaId\":429006},{\"areaId\":429006120,\"areaType\":2,\"name\":\"石河镇\",\"parentAreaId\":429006},{\"areaId\":429006121,\"areaType\":2,\"name\":\"佛子山镇\",\"parentAreaId\":429006},{\"areaId\":429006201,\"areaType\":2,\"name\":\"净潭乡\",\"parentAreaId\":429006},{\"areaId\":429006450,\"areaType\":2,\"name\":\"蒋湖农场\",\"parentAreaId\":429006},{\"areaId\":429006451,\"areaType\":2,\"name\":\"白茅湖农场\",\"parentAreaId\":429006},{\"areaId\":429006452,\"areaType\":2,\"name\":\"沉湖管委会\",\"parentAreaId\":429006}],\"name\":\"天门市\",\"parentAreaId\":420000},{\"areaId\":429021,\"areaType\":1,\"children\":[{\"areaId\":429021100,\"areaType\":2,\"name\":\"松柏镇\",\"parentAreaId\":429021},{\"areaId\":429021101,\"areaType\":2,\"name\":\"阳日镇\",\"parentAreaId\":429021},{\"areaId\":429021102,\"areaType\":2,\"name\":\"木鱼镇\",\"parentAreaId\":429021},{\"areaId\":429021103,\"areaType\":2,\"name\":\"红坪镇\",\"parentAreaId\":429021},{\"areaId\":429021104,\"areaType\":2,\"name\":\"新华镇\",\"parentAreaId\":429021},{\"areaId\":429021105,\"areaType\":2,\"name\":\"九湖镇\",\"parentAreaId\":429021},{\"areaId\":429021200,\"areaType\":2,\"name\":\"宋洛乡\",\"parentAreaId\":429021},{\"areaId\":429021202,\"areaType\":2,\"name\":\"下谷坪土家族乡\",\"parentAreaId\":429021}],\"name\":\"神农架林区\",\"parentAreaId\":420000}],\"name\":\"湖北省\",\"parentAreaId\":0},{\"areaId\":430000,\"areaType\":0,\"children\":[{\"areaId\":430100,\"areaType\":1,\"children\":[{\"areaId\":430102,\"areaType\":2,\"name\":\"芙蓉区\",\"parentAreaId\":430100},{\"areaId\":430103,\"areaType\":2,\"name\":\"天心区\",\"parentAreaId\":430100},{\"areaId\":430104,\"areaType\":2,\"name\":\"岳麓区\",\"parentAreaId\":430100},{\"areaId\":430105,\"areaType\":2,\"name\":\"开福区\",\"parentAreaId\":430100},{\"areaId\":430111,\"areaType\":2,\"name\":\"雨花区\",\"parentAreaId\":430100},{\"areaId\":430112,\"areaType\":2,\"name\":\"望城区\",\"parentAreaId\":430100},{\"areaId\":430121,\"areaType\":2,\"name\":\"长沙县\",\"parentAreaId\":430100},{\"areaId\":430181,\"areaType\":2,\"name\":\"浏阳市\",\"parentAreaId\":430100},{\"areaId\":430182,\"areaType\":2,\"name\":\"宁乡市\",\"parentAreaId\":430100}],\"name\":\"长沙市\",\"parentAreaId\":430000},{\"areaId\":430200,\"areaType\":1,\"children\":[{\"areaId\":430202,\"areaType\":2,\"name\":\"荷塘区\",\"parentAreaId\":430200},{\"areaId\":430203,\"areaType\":2,\"name\":\"芦淞区\",\"parentAreaId\":430200},{\"areaId\":430204,\"areaType\":2,\"name\":\"石峰区\",\"parentAreaId\":430200},{\"areaId\":430211,\"areaType\":2,\"name\":\"天元区\",\"parentAreaId\":430200},{\"areaId\":430221,\"areaType\":2,\"name\":\"渌口区\",\"parentAreaId\":430200},{\"areaId\":430223,\"areaType\":2,\"name\":\"攸县\",\"parentAreaId\":430200},{\"areaId\":430224,\"areaType\":2,\"name\":\"茶陵县\",\"parentAreaId\":430200},{\"areaId\":430225,\"areaType\":2,\"name\":\"炎陵县\",\"parentAreaId\":430200},{\"areaId\":430281,\"areaType\":2,\"name\":\"醴陵市\",\"parentAreaId\":430200}],\"name\":\"株洲市\",\"parentAreaId\":430000},{\"areaId\":430300,\"areaType\":1,\"children\":[{\"areaId\":430302,\"areaType\":2,\"name\":\"雨湖区\",\"parentAreaId\":430300},{\"areaId\":430304,\"areaType\":2,\"name\":\"岳塘区\",\"parentAreaId\":430300},{\"areaId\":430321,\"areaType\":2,\"name\":\"湘潭县\",\"parentAreaId\":430300},{\"areaId\":430381,\"areaType\":2,\"name\":\"湘乡市\",\"parentAreaId\":430300},{\"areaId\":430382,\"areaType\":2,\"name\":\"韶山市\",\"parentAreaId\":430300}],\"name\":\"湘潭市\",\"parentAreaId\":430000},{\"areaId\":430400,\"areaType\":1,\"children\":[{\"areaId\":430405,\"areaType\":2,\"name\":\"珠晖区\",\"parentAreaId\":430400},{\"areaId\":430406,\"areaType\":2,\"name\":\"雁峰区\",\"parentAreaId\":430400},{\"areaId\":430407,\"areaType\":2,\"name\":\"石鼓区\",\"parentAreaId\":430400},{\"areaId\":430408,\"areaType\":2,\"name\":\"蒸湘区\",\"parentAreaId\":430400},{\"areaId\":430412,\"areaType\":2,\"name\":\"南岳区\",\"parentAreaId\":430400},{\"areaId\":430421,\"areaType\":2,\"name\":\"衡阳县\",\"parentAreaId\":430400},{\"areaId\":430422,\"areaType\":2,\"name\":\"衡南县\",\"parentAreaId\":430400},{\"areaId\":430423,\"areaType\":2,\"name\":\"衡山县\",\"parentAreaId\":430400},{\"areaId\":430424,\"areaType\":2,\"name\":\"衡东县\",\"parentAreaId\":430400},{\"areaId\":430426,\"areaType\":2,\"name\":\"祁东县\",\"parentAreaId\":430400},{\"areaId\":430481,\"areaType\":2,\"name\":\"耒阳市\",\"parentAreaId\":430400},{\"areaId\":430482,\"areaType\":2,\"name\":\"常宁市\",\"parentAreaId\":430400}],\"name\":\"衡阳市\",\"parentAreaId\":430000},{\"areaId\":430500,\"areaType\":1,\"children\":[{\"areaId\":430502,\"areaType\":2,\"name\":\"双清区\",\"parentAreaId\":430500},{\"areaId\":430503,\"areaType\":2,\"name\":\"大祥区\",\"parentAreaId\":430500},{\"areaId\":430511,\"areaType\":2,\"name\":\"北塔区\",\"parentAreaId\":430500},{\"areaId\":430521,\"areaType\":2,\"name\":\"邵东县\",\"parentAreaId\":430500},{\"areaId\":430522,\"areaType\":2,\"name\":\"新邵县\",\"parentAreaId\":430500},{\"areaId\":430523,\"areaType\":2,\"name\":\"邵阳县\",\"parentAreaId\":430500},{\"areaId\":430524,\"areaType\":2,\"name\":\"隆回县\",\"parentAreaId\":430500},{\"areaId\":430525,\"areaType\":2,\"name\":\"洞口县\",\"parentAreaId\":430500},{\"areaId\":430527,\"areaType\":2,\"name\":\"绥宁县\",\"parentAreaId\":430500},{\"areaId\":430528,\"areaType\":2,\"name\":\"新宁县\",\"parentAreaId\":430500},{\"areaId\":430529,\"areaType\":2,\"name\":\"城步苗族自治县\",\"parentAreaId\":430500},{\"areaId\":430581,\"areaType\":2,\"name\":\"武冈市\",\"parentAreaId\":430500}],\"name\":\"邵阳市\",\"parentAreaId\":430000},{\"areaId\":430600,\"areaType\":1,\"children\":[{\"areaId\":430602,\"areaType\":2,\"name\":\"岳阳楼区\",\"parentAreaId\":430600},{\"areaId\":430603,\"areaType\":2,\"name\":\"云溪区\",\"parentAreaId\":430600},{\"areaId\":430611,\"areaType\":2,\"name\":\"君山区\",\"parentAreaId\":430600},{\"areaId\":430621,\"areaType\":2,\"name\":\"岳阳县\",\"parentAreaId\":430600},{\"areaId\":430623,\"areaType\":2,\"name\":\"华容县\",\"parentAreaId\":430600},{\"areaId\":430624,\"areaType\":2,\"name\":\"湘阴县\",\"parentAreaId\":430600},{\"areaId\":430626,\"areaType\":2,\"name\":\"平江县\",\"parentAreaId\":430600},{\"areaId\":430681,\"areaType\":2,\"name\":\"汨罗市\",\"parentAreaId\":430600},{\"areaId\":430682,\"areaType\":2,\"name\":\"临湘市\",\"parentAreaId\":430600}],\"name\":\"岳阳市\",\"parentAreaId\":430000},{\"areaId\":430700,\"areaType\":1,\"children\":[{\"areaId\":430702,\"areaType\":2,\"name\":\"武陵区\",\"parentAreaId\":430700},{\"areaId\":430703,\"areaType\":2,\"name\":\"鼎城区\",\"parentAreaId\":430700},{\"areaId\":430721,\"areaType\":2,\"name\":\"安乡县\",\"parentAreaId\":430700},{\"areaId\":430722,\"areaType\":2,\"name\":\"汉寿县\",\"parentAreaId\":430700},{\"areaId\":430723,\"areaType\":2,\"name\":\"澧县\",\"parentAreaId\":430700},{\"areaId\":430724,\"areaType\":2,\"name\":\"临澧县\",\"parentAreaId\":430700},{\"areaId\":430725,\"areaType\":2,\"name\":\"桃源县\",\"parentAreaId\":430700},{\"areaId\":430726,\"areaType\":2,\"name\":\"石门县\",\"parentAreaId\":430700},{\"areaId\":430781,\"areaType\":2,\"name\":\"津市市\",\"parentAreaId\":430700}],\"name\":\"常德市\",\"parentAreaId\":430000},{\"areaId\":430800,\"areaType\":1,\"children\":[{\"areaId\":430802,\"areaType\":2,\"name\":\"永定区\",\"parentAreaId\":430800},{\"areaId\":430811,\"areaType\":2,\"name\":\"武陵源区\",\"parentAreaId\":430800},{\"areaId\":430821,\"areaType\":2,\"name\":\"慈利县\",\"parentAreaId\":430800},{\"areaId\":430822,\"areaType\":2,\"name\":\"桑植县\",\"parentAreaId\":430800}],\"name\":\"张家界市\",\"parentAreaId\":430000},{\"areaId\":430900,\"areaType\":1,\"children\":[{\"areaId\":430902,\"areaType\":2,\"name\":\"资阳区\",\"parentAreaId\":430900},{\"areaId\":430903,\"areaType\":2,\"name\":\"赫山区\",\"parentAreaId\":430900},{\"areaId\":430921,\"areaType\":2,\"name\":\"南县\",\"parentAreaId\":430900},{\"areaId\":430922,\"areaType\":2,\"name\":\"桃江县\",\"parentAreaId\":430900},{\"areaId\":430923,\"areaType\":2,\"name\":\"安化县\",\"parentAreaId\":430900},{\"areaId\":430981,\"areaType\":2,\"name\":\"沅江市\",\"parentAreaId\":430900}],\"name\":\"益阳市\",\"parentAreaId\":430000},{\"areaId\":431000,\"areaType\":1,\"children\":[{\"areaId\":431002,\"areaType\":2,\"name\":\"北湖区\",\"parentAreaId\":431000},{\"areaId\":431003,\"areaType\":2,\"name\":\"苏仙区\",\"parentAreaId\":431000},{\"areaId\":431021,\"areaType\":2,\"name\":\"桂阳县\",\"parentAreaId\":431000},{\"areaId\":431022,\"areaType\":2,\"name\":\"宜章县\",\"parentAreaId\":431000},{\"areaId\":431023,\"areaType\":2,\"name\":\"永兴县\",\"parentAreaId\":431000},{\"areaId\":431024,\"areaType\":2,\"name\":\"嘉禾县\",\"parentAreaId\":431000},{\"areaId\":431025,\"areaType\":2,\"name\":\"临武县\",\"parentAreaId\":431000},{\"areaId\":431026,\"areaType\":2,\"name\":\"汝城县\",\"parentAreaId\":431000},{\"areaId\":431027,\"areaType\":2,\"name\":\"桂东县\",\"parentAreaId\":431000},{\"areaId\":431028,\"areaType\":2,\"name\":\"安仁县\",\"parentAreaId\":431000},{\"areaId\":431081,\"areaType\":2,\"name\":\"资兴市\",\"parentAreaId\":431000}],\"name\":\"郴州市\",\"parentAreaId\":430000},{\"areaId\":431100,\"areaType\":1,\"children\":[{\"areaId\":431102,\"areaType\":2,\"name\":\"零陵区\",\"parentAreaId\":431100},{\"areaId\":431103,\"areaType\":2,\"name\":\"冷水滩区\",\"parentAreaId\":431100},{\"areaId\":431121,\"areaType\":2,\"name\":\"祁阳县\",\"parentAreaId\":431100},{\"areaId\":431122,\"areaType\":2,\"name\":\"东安县\",\"parentAreaId\":431100},{\"areaId\":431123,\"areaType\":2,\"name\":\"双牌县\",\"parentAreaId\":431100},{\"areaId\":431124,\"areaType\":2,\"name\":\"道县\",\"parentAreaId\":431100},{\"areaId\":431125,\"areaType\":2,\"name\":\"江永县\",\"parentAreaId\":431100},{\"areaId\":431126,\"areaType\":2,\"name\":\"宁远县\",\"parentAreaId\":431100},{\"areaId\":431127,\"areaType\":2,\"name\":\"蓝山县\",\"parentAreaId\":431100},{\"areaId\":431128,\"areaType\":2,\"name\":\"新田县\",\"parentAreaId\":431100},{\"areaId\":431129,\"areaType\":2,\"name\":\"江华瑶族自治县\",\"parentAreaId\":431100}],\"name\":\"永州市\",\"parentAreaId\":430000},{\"areaId\":431200,\"areaType\":1,\"children\":[{\"areaId\":431202,\"areaType\":2,\"name\":\"鹤城区\",\"parentAreaId\":431200},{\"areaId\":431221,\"areaType\":2,\"name\":\"中方县\",\"parentAreaId\":431200},{\"areaId\":431222,\"areaType\":2,\"name\":\"沅陵县\",\"parentAreaId\":431200},{\"areaId\":431223,\"areaType\":2,\"name\":\"辰溪县\",\"parentAreaId\":431200},{\"areaId\":431224,\"areaType\":2,\"name\":\"溆浦县\",\"parentAreaId\":431200},{\"areaId\":431225,\"areaType\":2,\"name\":\"会同县\",\"parentAreaId\":431200},{\"areaId\":431226,\"areaType\":2,\"name\":\"麻阳苗族自治县\",\"parentAreaId\":431200},{\"areaId\":431227,\"areaType\":2,\"name\":\"新晃侗族自治县\",\"parentAreaId\":431200},{\"areaId\":431228,\"areaType\":2,\"name\":\"芷江侗族自治县\",\"parentAreaId\":431200},{\"areaId\":431229,\"areaType\":2,\"name\":\"靖州苗族侗族自治县\",\"parentAreaId\":431200},{\"areaId\":431230,\"areaType\":2,\"name\":\"通道侗族自治县\",\"parentAreaId\":431200},{\"areaId\":431281,\"areaType\":2,\"name\":\"洪江市\",\"parentAreaId\":431200}],\"name\":\"怀化市\",\"parentAreaId\":430000},{\"areaId\":431300,\"areaType\":1,\"children\":[{\"areaId\":431302,\"areaType\":2,\"name\":\"娄星区\",\"parentAreaId\":431300},{\"areaId\":431321,\"areaType\":2,\"name\":\"双峰县\",\"parentAreaId\":431300},{\"areaId\":431322,\"areaType\":2,\"name\":\"新化县\",\"parentAreaId\":431300},{\"areaId\":431381,\"areaType\":2,\"name\":\"冷水江市\",\"parentAreaId\":431300},{\"areaId\":431382,\"areaType\":2,\"name\":\"涟源市\",\"parentAreaId\":431300}],\"name\":\"娄底市\",\"parentAreaId\":430000},{\"areaId\":433100,\"areaType\":1,\"children\":[{\"areaId\":433101,\"areaType\":2,\"name\":\"吉首市\",\"parentAreaId\":433100},{\"areaId\":433122,\"areaType\":2,\"name\":\"泸溪县\",\"parentAreaId\":433100},{\"areaId\":433123,\"areaType\":2,\"name\":\"凤凰县\",\"parentAreaId\":433100},{\"areaId\":433124,\"areaType\":2,\"name\":\"花垣县\",\"parentAreaId\":433100},{\"areaId\":433125,\"areaType\":2,\"name\":\"保靖县\",\"parentAreaId\":433100},{\"areaId\":433126,\"areaType\":2,\"name\":\"古丈县\",\"parentAreaId\":433100},{\"areaId\":433127,\"areaType\":2,\"name\":\"永顺县\",\"parentAreaId\":433100},{\"areaId\":433130,\"areaType\":2,\"name\":\"龙山县\",\"parentAreaId\":433100}],\"name\":\"湘西土家族苗族自治州\",\"parentAreaId\":430000}],\"name\":\"湖南省\",\"parentAreaId\":0},{\"areaId\":440000,\"areaType\":0,\"children\":[{\"areaId\":440100,\"areaType\":1,\"children\":[{\"areaId\":440103,\"areaType\":2,\"name\":\"荔湾区\",\"parentAreaId\":440100},{\"areaId\":440104,\"areaType\":2,\"name\":\"越秀区\",\"parentAreaId\":440100},{\"areaId\":440105,\"areaType\":2,\"name\":\"海珠区\",\"parentAreaId\":440100},{\"areaId\":440106,\"areaType\":2,\"name\":\"天河区\",\"parentAreaId\":440100},{\"areaId\":440111,\"areaType\":2,\"name\":\"白云区\",\"parentAreaId\":440100},{\"areaId\":440112,\"areaType\":2,\"name\":\"黄埔区\",\"parentAreaId\":440100},{\"areaId\":440113,\"areaType\":2,\"name\":\"番禺区\",\"parentAreaId\":440100},{\"areaId\":440114,\"areaType\":2,\"name\":\"花都区\",\"parentAreaId\":440100},{\"areaId\":440115,\"areaType\":2,\"name\":\"南沙区\",\"parentAreaId\":440100},{\"areaId\":440117,\"areaType\":2,\"name\":\"从化区\",\"parentAreaId\":440100},{\"areaId\":440118,\"areaType\":2,\"name\":\"增城区\",\"parentAreaId\":440100}],\"name\":\"广州市\",\"parentAreaId\":440000},{\"areaId\":440200,\"areaType\":1,\"children\":[{\"areaId\":440203,\"areaType\":2,\"name\":\"武江区\",\"parentAreaId\":440200},{\"areaId\":440204,\"areaType\":2,\"name\":\"浈江区\",\"parentAreaId\":440200},{\"areaId\":440205,\"areaType\":2,\"name\":\"曲江区\",\"parentAreaId\":440200},{\"areaId\":440222,\"areaType\":2,\"name\":\"始兴县\",\"parentAreaId\":440200},{\"areaId\":440224,\"areaType\":2,\"name\":\"仁化县\",\"parentAreaId\":440200},{\"areaId\":440229,\"areaType\":2,\"name\":\"翁源县\",\"parentAreaId\":440200},{\"areaId\":440232,\"areaType\":2,\"name\":\"乳源瑶族自治县\",\"parentAreaId\":440200},{\"areaId\":440233,\"areaType\":2,\"name\":\"新丰县\",\"parentAreaId\":440200},{\"areaId\":440281,\"areaType\":2,\"name\":\"乐昌市\",\"parentAreaId\":440200},{\"areaId\":440282,\"areaType\":2,\"name\":\"南雄市\",\"parentAreaId\":440200}],\"name\":\"韶关市\",\"parentAreaId\":440000},{\"areaId\":440300,\"areaType\":1,\"children\":[{\"areaId\":440303,\"areaType\":2,\"name\":\"罗湖区\",\"parentAreaId\":440300},{\"areaId\":440304,\"areaType\":2,\"name\":\"福田区\",\"parentAreaId\":440300},{\"areaId\":440305,\"areaType\":2,\"name\":\"南山区\",\"parentAreaId\":440300},{\"areaId\":440306,\"areaType\":2,\"name\":\"宝安区\",\"parentAreaId\":440300},{\"areaId\":440307,\"areaType\":2,\"name\":\"龙岗区\",\"parentAreaId\":440300},{\"areaId\":440308,\"areaType\":2,\"name\":\"盐田区\",\"parentAreaId\":440300},{\"areaId\":440309,\"areaType\":2,\"name\":\"龙华区\",\"parentAreaId\":440300},{\"areaId\":440310,\"areaType\":2,\"name\":\"坪山区\",\"parentAreaId\":440300},{\"areaId\":440311,\"areaType\":2,\"name\":\"光明区\",\"parentAreaId\":440300}],\"name\":\"深圳市\",\"parentAreaId\":440000},{\"areaId\":440400,\"areaType\":1,\"children\":[{\"areaId\":440402,\"areaType\":2,\"name\":\"香洲区\",\"parentAreaId\":440400},{\"areaId\":440403,\"areaType\":2,\"name\":\"斗门区\",\"parentAreaId\":440400},{\"areaId\":440404,\"areaType\":2,\"name\":\"金湾区\",\"parentAreaId\":440400},{\"areaId\":440499,\"areaType\":2,\"name\":\"香洲区(由澳门特别行政区实施管辖)\",\"parentAreaId\":440400}],\"name\":\"珠海市\",\"parentAreaId\":440000},{\"areaId\":440500,\"areaType\":1,\"children\":[{\"areaId\":440507,\"areaType\":2,\"name\":\"龙湖区\",\"parentAreaId\":440500},{\"areaId\":440511,\"areaType\":2,\"name\":\"金平区\",\"parentAreaId\":440500},{\"areaId\":440512,\"areaType\":2,\"name\":\"濠江区\",\"parentAreaId\":440500},{\"areaId\":440513,\"areaType\":2,\"name\":\"潮阳区\",\"parentAreaId\":440500},{\"areaId\":440514,\"areaType\":2,\"name\":\"潮南区\",\"parentAreaId\":440500},{\"areaId\":440515,\"areaType\":2,\"name\":\"澄海区\",\"parentAreaId\":440500},{\"areaId\":440523,\"areaType\":2,\"name\":\"南澳县\",\"parentAreaId\":440500}],\"name\":\"汕头市\",\"parentAreaId\":440000},{\"areaId\":440600,\"areaType\":1,\"children\":[{\"areaId\":440604,\"areaType\":2,\"name\":\"禅城区\",\"parentAreaId\":440600},{\"areaId\":440605,\"areaType\":2,\"name\":\"南海区\",\"parentAreaId\":440600},{\"areaId\":440606,\"areaType\":2,\"name\":\"顺德区\",\"parentAreaId\":440600},{\"areaId\":440607,\"areaType\":2,\"name\":\"三水区\",\"parentAreaId\":440600},{\"areaId\":440608,\"areaType\":2,\"name\":\"高明区\",\"parentAreaId\":440600}],\"name\":\"佛山市\",\"parentAreaId\":440000},{\"areaId\":440700,\"areaType\":1,\"children\":[{\"areaId\":440703,\"areaType\":2,\"name\":\"蓬江区\",\"parentAreaId\":440700},{\"areaId\":440704,\"areaType\":2,\"name\":\"江海区\",\"parentAreaId\":440700},{\"areaId\":440705,\"areaType\":2,\"name\":\"新会区\",\"parentAreaId\":440700},{\"areaId\":440781,\"areaType\":2,\"name\":\"台山市\",\"parentAreaId\":440700},{\"areaId\":440783,\"areaType\":2,\"name\":\"开平市\",\"parentAreaId\":440700},{\"areaId\":440784,\"areaType\":2,\"name\":\"鹤山市\",\"parentAreaId\":440700},{\"areaId\":440785,\"areaType\":2,\"name\":\"恩平市\",\"parentAreaId\":440700}],\"name\":\"江门市\",\"parentAreaId\":440000},{\"areaId\":440800,\"areaType\":1,\"children\":[{\"areaId\":440802,\"areaType\":2,\"name\":\"赤坎区\",\"parentAreaId\":440800},{\"areaId\":440803,\"areaType\":2,\"name\":\"霞山区\",\"parentAreaId\":440800},{\"areaId\":440804,\"areaType\":2,\"name\":\"坡头区\",\"parentAreaId\":440800},{\"areaId\":440811,\"areaType\":2,\"name\":\"麻章区\",\"parentAreaId\":440800},{\"areaId\":440823,\"areaType\":2,\"name\":\"遂溪县\",\"parentAreaId\":440800},{\"areaId\":440825,\"areaType\":2,\"name\":\"徐闻县\",\"parentAreaId\":440800},{\"areaId\":440881,\"areaType\":2,\"name\":\"廉江市\",\"parentAreaId\":440800},{\"areaId\":440882,\"areaType\":2,\"name\":\"雷州市\",\"parentAreaId\":440800},{\"areaId\":440883,\"areaType\":2,\"name\":\"吴川市\",\"parentAreaId\":440800}],\"name\":\"湛江市\",\"parentAreaId\":440000},{\"areaId\":440900,\"areaType\":1,\"children\":[{\"areaId\":440902,\"areaType\":2,\"name\":\"茂南区\",\"parentAreaId\":440900},{\"areaId\":440904,\"areaType\":2,\"name\":\"电白区\",\"parentAreaId\":440900},{\"areaId\":440981,\"areaType\":2,\"name\":\"高州市\",\"parentAreaId\":440900},{\"areaId\":440982,\"areaType\":2,\"name\":\"化州市\",\"parentAreaId\":440900},{\"areaId\":440983,\"areaType\":2,\"name\":\"信宜市\",\"parentAreaId\":440900}],\"name\":\"茂名市\",\"parentAreaId\":440000},{\"areaId\":441200,\"areaType\":1,\"children\":[{\"areaId\":441202,\"areaType\":2,\"name\":\"端州区\",\"parentAreaId\":441200},{\"areaId\":441203,\"areaType\":2,\"name\":\"鼎湖区\",\"parentAreaId\":441200},{\"areaId\":441204,\"areaType\":2,\"name\":\"高要区\",\"parentAreaId\":441200},{\"areaId\":441223,\"areaType\":2,\"name\":\"广宁县\",\"parentAreaId\":441200},{\"areaId\":441224,\"areaType\":2,\"name\":\"怀集县\",\"parentAreaId\":441200},{\"areaId\":441225,\"areaType\":2,\"name\":\"封开县\",\"parentAreaId\":441200},{\"areaId\":441226,\"areaType\":2,\"name\":\"德庆县\",\"parentAreaId\":441200},{\"areaId\":441284,\"areaType\":2,\"name\":\"四会市\",\"parentAreaId\":441200}],\"name\":\"肇庆市\",\"parentAreaId\":440000},{\"areaId\":441300,\"areaType\":1,\"children\":[{\"areaId\":441302,\"areaType\":2,\"name\":\"惠城区\",\"parentAreaId\":441300},{\"areaId\":441303,\"areaType\":2,\"name\":\"惠阳区\",\"parentAreaId\":441300},{\"areaId\":441322,\"areaType\":2,\"name\":\"博罗县\",\"parentAreaId\":441300},{\"areaId\":441323,\"areaType\":2,\"name\":\"惠东县\",\"parentAreaId\":441300},{\"areaId\":441324,\"areaType\":2,\"name\":\"龙门县\",\"parentAreaId\":441300}],\"name\":\"惠州市\",\"parentAreaId\":440000},{\"areaId\":441400,\"areaType\":1,\"children\":[{\"areaId\":441402,\"areaType\":2,\"name\":\"梅江区\",\"parentAreaId\":441400},{\"areaId\":441403,\"areaType\":2,\"name\":\"梅县区\",\"parentAreaId\":441400},{\"areaId\":441422,\"areaType\":2,\"name\":\"大埔县\",\"parentAreaId\":441400},{\"areaId\":441423,\"areaType\":2,\"name\":\"丰顺县\",\"parentAreaId\":441400},{\"areaId\":441424,\"areaType\":2,\"name\":\"五华县\",\"parentAreaId\":441400},{\"areaId\":441426,\"areaType\":2,\"name\":\"平远县\",\"parentAreaId\":441400},{\"areaId\":441427,\"areaType\":2,\"name\":\"蕉岭县\",\"parentAreaId\":441400},{\"areaId\":441481,\"areaType\":2,\"name\":\"兴宁市\",\"parentAreaId\":441400}],\"name\":\"梅州市\",\"parentAreaId\":440000},{\"areaId\":441500,\"areaType\":1,\"children\":[{\"areaId\":441502,\"areaType\":2,\"name\":\"城区\",\"parentAreaId\":441500},{\"areaId\":441521,\"areaType\":2,\"name\":\"海丰县\",\"parentAreaId\":441500},{\"areaId\":441523,\"areaType\":2,\"name\":\"陆河县\",\"parentAreaId\":441500},{\"areaId\":441581,\"areaType\":2,\"name\":\"陆丰市\",\"parentAreaId\":441500}],\"name\":\"汕尾市\",\"parentAreaId\":440000},{\"areaId\":441600,\"areaType\":1,\"children\":[{\"areaId\":441602,\"areaType\":2,\"name\":\"源城区\",\"parentAreaId\":441600},{\"areaId\":441621,\"areaType\":2,\"name\":\"紫金县\",\"parentAreaId\":441600},{\"areaId\":441622,\"areaType\":2,\"name\":\"龙川县\",\"parentAreaId\":441600},{\"areaId\":441623,\"areaType\":2,\"name\":\"连平县\",\"parentAreaId\":441600},{\"areaId\":441624,\"areaType\":2,\"name\":\"和平县\",\"parentAreaId\":441600},{\"areaId\":441625,\"areaType\":2,\"name\":\"东源县\",\"parentAreaId\":441600}],\"name\":\"河源市\",\"parentAreaId\":440000},{\"areaId\":441700,\"areaType\":1,\"children\":[{\"areaId\":441702,\"areaType\":2,\"name\":\"江城区\",\"parentAreaId\":441700},{\"areaId\":441704,\"areaType\":2,\"name\":\"阳东区\",\"parentAreaId\":441700},{\"areaId\":441721,\"areaType\":2,\"name\":\"阳西县\",\"parentAreaId\":441700},{\"areaId\":441781,\"areaType\":2,\"name\":\"阳春市\",\"parentAreaId\":441700}],\"name\":\"阳江市\",\"parentAreaId\":440000},{\"areaId\":441800,\"areaType\":1,\"children\":[{\"areaId\":441802,\"areaType\":2,\"name\":\"清城区\",\"parentAreaId\":441800},{\"areaId\":441803,\"areaType\":2,\"name\":\"清新区\",\"parentAreaId\":441800},{\"areaId\":441821,\"areaType\":2,\"name\":\"佛冈县\",\"parentAreaId\":441800},{\"areaId\":441823,\"areaType\":2,\"name\":\"阳山县\",\"parentAreaId\":441800},{\"areaId\":441825,\"areaType\":2,\"name\":\"连山壮族瑶族自治县\",\"parentAreaId\":441800},{\"areaId\":441826,\"areaType\":2,\"name\":\"连南瑶族自治县\",\"parentAreaId\":441800},{\"areaId\":441881,\"areaType\":2,\"name\":\"英德市\",\"parentAreaId\":441800},{\"areaId\":441882,\"areaType\":2,\"name\":\"连州市\",\"parentAreaId\":441800}],\"name\":\"清远市\",\"parentAreaId\":440000},{\"areaId\":441900,\"areaType\":1,\"children\":[{\"areaId\":441999,\"areaType\":2,\"name\":\"东莞市\",\"parentAreaId\":441900}],\"name\":\"东莞市\",\"parentAreaId\":440000},{\"areaId\":442000,\"areaType\":1,\"children\":[{\"areaId\":442099,\"areaType\":2,\"name\":\"中山市\",\"parentAreaId\":442000}],\"name\":\"中山市\",\"parentAreaId\":440000},{\"areaId\":445100,\"areaType\":1,\"children\":[{\"areaId\":445102,\"areaType\":2,\"name\":\"湘桥区\",\"parentAreaId\":445100},{\"areaId\":445103,\"areaType\":2,\"name\":\"潮安区\",\"parentAreaId\":445100},{\"areaId\":445122,\"areaType\":2,\"name\":\"饶平县\",\"parentAreaId\":445100}],\"name\":\"潮州市\",\"parentAreaId\":440000},{\"areaId\":445200,\"areaType\":1,\"children\":[{\"areaId\":445202,\"areaType\":2,\"name\":\"榕城区\",\"parentAreaId\":445200},{\"areaId\":445203,\"areaType\":2,\"name\":\"揭东区\",\"parentAreaId\":445200},{\"areaId\":445222,\"areaType\":2,\"name\":\"揭西县\",\"parentAreaId\":445200},{\"areaId\":445224,\"areaType\":2,\"name\":\"惠来县\",\"parentAreaId\":445200},{\"areaId\":445281,\"areaType\":2,\"name\":\"普宁市\",\"parentAreaId\":445200}],\"name\":\"揭阳市\",\"parentAreaId\":440000},{\"areaId\":445300,\"areaType\":1,\"children\":[{\"areaId\":445302,\"areaType\":2,\"name\":\"云城区\",\"parentAreaId\":445300},{\"areaId\":445303,\"areaType\":2,\"name\":\"云安区\",\"parentAreaId\":445300},{\"areaId\":445321,\"areaType\":2,\"name\":\"新兴县\",\"parentAreaId\":445300},{\"areaId\":445322,\"areaType\":2,\"name\":\"郁南县\",\"parentAreaId\":445300},{\"areaId\":445381,\"areaType\":2,\"name\":\"罗定市\",\"parentAreaId\":445300}],\"name\":\"云浮市\",\"parentAreaId\":440000}],\"name\":\"广东省\",\"parentAreaId\":0},{\"areaId\":450000,\"areaType\":0,\"children\":[{\"areaId\":450100,\"areaType\":1,\"children\":[{\"areaId\":450102,\"areaType\":2,\"name\":\"兴宁区\",\"parentAreaId\":450100},{\"areaId\":450103,\"areaType\":2,\"name\":\"青秀区\",\"parentAreaId\":450100},{\"areaId\":450105,\"areaType\":2,\"name\":\"江南区\",\"parentAreaId\":450100},{\"areaId\":450107,\"areaType\":2,\"name\":\"西乡塘区\",\"parentAreaId\":450100},{\"areaId\":450108,\"areaType\":2,\"name\":\"良庆区\",\"parentAreaId\":450100},{\"areaId\":450109,\"areaType\":2,\"name\":\"邕宁区\",\"parentAreaId\":450100},{\"areaId\":450110,\"areaType\":2,\"name\":\"武鸣区\",\"parentAreaId\":450100},{\"areaId\":450123,\"areaType\":2,\"name\":\"隆安县\",\"parentAreaId\":450100},{\"areaId\":450124,\"areaType\":2,\"name\":\"马山县\",\"parentAreaId\":450100},{\"areaId\":450125,\"areaType\":2,\"name\":\"上林县\",\"parentAreaId\":450100},{\"areaId\":450126,\"areaType\":2,\"name\":\"宾阳县\",\"parentAreaId\":450100},{\"areaId\":450127,\"areaType\":2,\"name\":\"横县\",\"parentAreaId\":450100}],\"name\":\"南宁市\",\"parentAreaId\":450000},{\"areaId\":450200,\"areaType\":1,\"children\":[{\"areaId\":450202,\"areaType\":2,\"name\":\"城中区\",\"parentAreaId\":450200},{\"areaId\":450203,\"areaType\":2,\"name\":\"鱼峰区\",\"parentAreaId\":450200},{\"areaId\":450204,\"areaType\":2,\"name\":\"柳南区\",\"parentAreaId\":450200},{\"areaId\":450205,\"areaType\":2,\"name\":\"柳北区\",\"parentAreaId\":450200},{\"areaId\":450206,\"areaType\":2,\"name\":\"柳江区\",\"parentAreaId\":450200},{\"areaId\":450222,\"areaType\":2,\"name\":\"柳城县\",\"parentAreaId\":450200},{\"areaId\":450223,\"areaType\":2,\"name\":\"鹿寨县\",\"parentAreaId\":450200},{\"areaId\":450224,\"areaType\":2,\"name\":\"融安县\",\"parentAreaId\":450200},{\"areaId\":450225,\"areaType\":2,\"name\":\"融水苗族自治县\",\"parentAreaId\":450200},{\"areaId\":450226,\"areaType\":2,\"name\":\"三江侗族自治县\",\"parentAreaId\":450200}],\"name\":\"柳州市\",\"parentAreaId\":450000},{\"areaId\":450300,\"areaType\":1,\"children\":[{\"areaId\":450302,\"areaType\":2,\"name\":\"秀峰区\",\"parentAreaId\":450300},{\"areaId\":450303,\"areaType\":2,\"name\":\"叠彩区\",\"parentAreaId\":450300},{\"areaId\":450304,\"areaType\":2,\"name\":\"象山区\",\"parentAreaId\":450300},{\"areaId\":450305,\"areaType\":2,\"name\":\"七星区\",\"parentAreaId\":450300},{\"areaId\":450311,\"areaType\":2,\"name\":\"雁山区\",\"parentAreaId\":450300},{\"areaId\":450312,\"areaType\":2,\"name\":\"临桂区\",\"parentAreaId\":450300},{\"areaId\":450321,\"areaType\":2,\"name\":\"阳朔县\",\"parentAreaId\":450300},{\"areaId\":450323,\"areaType\":2,\"name\":\"灵川县\",\"parentAreaId\":450300},{\"areaId\":450324,\"areaType\":2,\"name\":\"全州县\",\"parentAreaId\":450300},{\"areaId\":450325,\"areaType\":2,\"name\":\"兴安县\",\"parentAreaId\":450300},{\"areaId\":450326,\"areaType\":2,\"name\":\"永福县\",\"parentAreaId\":450300},{\"areaId\":450327,\"areaType\":2,\"name\":\"灌阳县\",\"parentAreaId\":450300},{\"areaId\":450328,\"areaType\":2,\"name\":\"龙胜各族自治县\",\"parentAreaId\":450300},{\"areaId\":450329,\"areaType\":2,\"name\":\"资源县\",\"parentAreaId\":450300},{\"areaId\":450330,\"areaType\":2,\"name\":\"平乐县\",\"parentAreaId\":450300},{\"areaId\":450331,\"areaType\":2,\"name\":\"荔浦县\",\"parentAreaId\":450300},{\"areaId\":450332,\"areaType\":2,\"name\":\"恭城瑶族自治县\",\"parentAreaId\":450300}],\"name\":\"桂林市\",\"parentAreaId\":450000},{\"areaId\":450400,\"areaType\":1,\"children\":[{\"areaId\":450403,\"areaType\":2,\"name\":\"万秀区\",\"parentAreaId\":450400},{\"areaId\":450405,\"areaType\":2,\"name\":\"长洲区\",\"parentAreaId\":450400},{\"areaId\":450406,\"areaType\":2,\"name\":\"龙圩区\",\"parentAreaId\":450400},{\"areaId\":450421,\"areaType\":2,\"name\":\"苍梧县\",\"parentAreaId\":450400},{\"areaId\":450422,\"areaType\":2,\"name\":\"藤县\",\"parentAreaId\":450400},{\"areaId\":450423,\"areaType\":2,\"name\":\"蒙山县\",\"parentAreaId\":450400},{\"areaId\":450481,\"areaType\":2,\"name\":\"岑溪市\",\"parentAreaId\":450400}],\"name\":\"梧州市\",\"parentAreaId\":450000},{\"areaId\":450500,\"areaType\":1,\"children\":[{\"areaId\":450502,\"areaType\":2,\"name\":\"海城区\",\"parentAreaId\":450500},{\"areaId\":450503,\"areaType\":2,\"name\":\"银海区\",\"parentAreaId\":450500},{\"areaId\":450512,\"areaType\":2,\"name\":\"铁山港区\",\"parentAreaId\":450500},{\"areaId\":450521,\"areaType\":2,\"name\":\"合浦县\",\"parentAreaId\":450500}],\"name\":\"北海市\",\"parentAreaId\":450000},{\"areaId\":450600,\"areaType\":1,\"children\":[{\"areaId\":450602,\"areaType\":2,\"name\":\"港口区\",\"parentAreaId\":450600},{\"areaId\":450603,\"areaType\":2,\"name\":\"防城区\",\"parentAreaId\":450600},{\"areaId\":450621,\"areaType\":2,\"name\":\"上思县\",\"parentAreaId\":450600},{\"areaId\":450681,\"areaType\":2,\"name\":\"东兴市\",\"parentAreaId\":450600}],\"name\":\"防城港市\",\"parentAreaId\":450000},{\"areaId\":450700,\"areaType\":1,\"children\":[{\"areaId\":450702,\"areaType\":2,\"name\":\"钦南区\",\"parentAreaId\":450700},{\"areaId\":450703,\"areaType\":2,\"name\":\"钦北区\",\"parentAreaId\":450700},{\"areaId\":450721,\"areaType\":2,\"name\":\"灵山县\",\"parentAreaId\":450700},{\"areaId\":450722,\"areaType\":2,\"name\":\"浦北县\",\"parentAreaId\":450700}],\"name\":\"钦州市\",\"parentAreaId\":450000},{\"areaId\":450800,\"areaType\":1,\"children\":[{\"areaId\":450802,\"areaType\":2,\"name\":\"港北区\",\"parentAreaId\":450800},{\"areaId\":450803,\"areaType\":2,\"name\":\"港南区\",\"parentAreaId\":450800},{\"areaId\":450804,\"areaType\":2,\"name\":\"覃塘区\",\"parentAreaId\":450800},{\"areaId\":450821,\"areaType\":2,\"name\":\"平南县\",\"parentAreaId\":450800},{\"areaId\":450881,\"areaType\":2,\"name\":\"桂平市\",\"parentAreaId\":450800}],\"name\":\"贵港市\",\"parentAreaId\":450000},{\"areaId\":450900,\"areaType\":1,\"children\":[{\"areaId\":450902,\"areaType\":2,\"name\":\"玉州区\",\"parentAreaId\":450900},{\"areaId\":450903,\"areaType\":2,\"name\":\"福绵区\",\"parentAreaId\":450900},{\"areaId\":450921,\"areaType\":2,\"name\":\"容县\",\"parentAreaId\":450900},{\"areaId\":450922,\"areaType\":2,\"name\":\"陆川县\",\"parentAreaId\":450900},{\"areaId\":450923,\"areaType\":2,\"name\":\"博白县\",\"parentAreaId\":450900},{\"areaId\":450924,\"areaType\":2,\"name\":\"兴业县\",\"parentAreaId\":450900},{\"areaId\":450981,\"areaType\":2,\"name\":\"北流市\",\"parentAreaId\":450900}],\"name\":\"玉林市\",\"parentAreaId\":450000},{\"areaId\":451000,\"areaType\":1,\"children\":[{\"areaId\":451002,\"areaType\":2,\"name\":\"右江区\",\"parentAreaId\":451000},{\"areaId\":451021,\"areaType\":2,\"name\":\"田阳县\",\"parentAreaId\":451000},{\"areaId\":451022,\"areaType\":2,\"name\":\"田东县\",\"parentAreaId\":451000},{\"areaId\":451023,\"areaType\":2,\"name\":\"平果县\",\"parentAreaId\":451000},{\"areaId\":451024,\"areaType\":2,\"name\":\"德保县\",\"parentAreaId\":451000},{\"areaId\":451026,\"areaType\":2,\"name\":\"那坡县\",\"parentAreaId\":451000},{\"areaId\":451027,\"areaType\":2,\"name\":\"凌云县\",\"parentAreaId\":451000},{\"areaId\":451028,\"areaType\":2,\"name\":\"乐业县\",\"parentAreaId\":451000},{\"areaId\":451029,\"areaType\":2,\"name\":\"田林县\",\"parentAreaId\":451000},{\"areaId\":451030,\"areaType\":2,\"name\":\"西林县\",\"parentAreaId\":451000},{\"areaId\":451031,\"areaType\":2,\"name\":\"隆林各族自治县\",\"parentAreaId\":451000},{\"areaId\":451081,\"areaType\":2,\"name\":\"靖西市\",\"parentAreaId\":451000}],\"name\":\"百色市\",\"parentAreaId\":450000},{\"areaId\":451100,\"areaType\":1,\"children\":[{\"areaId\":451102,\"areaType\":2,\"name\":\"八步区\",\"parentAreaId\":451100},{\"areaId\":451103,\"areaType\":2,\"name\":\"平桂区\",\"parentAreaId\":451100},{\"areaId\":451121,\"areaType\":2,\"name\":\"昭平县\",\"parentAreaId\":451100},{\"areaId\":451122,\"areaType\":2,\"name\":\"钟山县\",\"parentAreaId\":451100},{\"areaId\":451123,\"areaType\":2,\"name\":\"富川瑶族自治县\",\"parentAreaId\":451100}],\"name\":\"贺州市\",\"parentAreaId\":450000},{\"areaId\":451200,\"areaType\":1,\"children\":[{\"areaId\":451202,\"areaType\":2,\"name\":\"金城江区\",\"parentAreaId\":451200},{\"areaId\":451203,\"areaType\":2,\"name\":\"宜州区\",\"parentAreaId\":451200},{\"areaId\":451221,\"areaType\":2,\"name\":\"南丹县\",\"parentAreaId\":451200},{\"areaId\":451222,\"areaType\":2,\"name\":\"天峨县\",\"parentAreaId\":451200},{\"areaId\":451223,\"areaType\":2,\"name\":\"凤山县\",\"parentAreaId\":451200},{\"areaId\":451224,\"areaType\":2,\"name\":\"东兰县\",\"parentAreaId\":451200},{\"areaId\":451225,\"areaType\":2,\"name\":\"罗城仫佬族自治县\",\"parentAreaId\":451200},{\"areaId\":451226,\"areaType\":2,\"name\":\"环江毛南族自治县\",\"parentAreaId\":451200},{\"areaId\":451227,\"areaType\":2,\"name\":\"巴马瑶族自治县\",\"parentAreaId\":451200},{\"areaId\":451228,\"areaType\":2,\"name\":\"都安瑶族自治县\",\"parentAreaId\":451200},{\"areaId\":451229,\"areaType\":2,\"name\":\"大化瑶族自治县\",\"parentAreaId\":451200}],\"name\":\"河池市\",\"parentAreaId\":450000},{\"areaId\":451300,\"areaType\":1,\"children\":[{\"areaId\":451302,\"areaType\":2,\"name\":\"兴宾区\",\"parentAreaId\":451300},{\"areaId\":451321,\"areaType\":2,\"name\":\"忻城县\",\"parentAreaId\":451300},{\"areaId\":451322,\"areaType\":2,\"name\":\"象州县\",\"parentAreaId\":451300},{\"areaId\":451323,\"areaType\":2,\"name\":\"武宣县\",\"parentAreaId\":451300},{\"areaId\":451324,\"areaType\":2,\"name\":\"金秀瑶族自治县\",\"parentAreaId\":451300},{\"areaId\":451381,\"areaType\":2,\"name\":\"合山市\",\"parentAreaId\":451300}],\"name\":\"来宾市\",\"parentAreaId\":450000},{\"areaId\":451400,\"areaType\":1,\"children\":[{\"areaId\":451402,\"areaType\":2,\"name\":\"江州区\",\"parentAreaId\":451400},{\"areaId\":451421,\"areaType\":2,\"name\":\"扶绥县\",\"parentAreaId\":451400},{\"areaId\":451422,\"areaType\":2,\"name\":\"宁明县\",\"parentAreaId\":451400},{\"areaId\":451423,\"areaType\":2,\"name\":\"龙州县\",\"parentAreaId\":451400},{\"areaId\":451424,\"areaType\":2,\"name\":\"大新县\",\"parentAreaId\":451400},{\"areaId\":451425,\"areaType\":2,\"name\":\"天等县\",\"parentAreaId\":451400},{\"areaId\":451481,\"areaType\":2,\"name\":\"凭祥市\",\"parentAreaId\":451400}],\"name\":\"崇左市\",\"parentAreaId\":450000}],\"name\":\"广西壮族自治区\",\"parentAreaId\":0},{\"areaId\":460000,\"areaType\":0,\"children\":[{\"areaId\":460100,\"areaType\":1,\"children\":[{\"areaId\":460105,\"areaType\":2,\"name\":\"秀英区\",\"parentAreaId\":460100},{\"areaId\":460106,\"areaType\":2,\"name\":\"龙华区\",\"parentAreaId\":460100},{\"areaId\":460107,\"areaType\":2,\"name\":\"琼山区\",\"parentAreaId\":460100},{\"areaId\":460108,\"areaType\":2,\"name\":\"美兰区\",\"parentAreaId\":460100}],\"name\":\"海口市\",\"parentAreaId\":460000},{\"areaId\":460200,\"areaType\":1,\"children\":[{\"areaId\":460202,\"areaType\":2,\"name\":\"海棠区\",\"parentAreaId\":460200},{\"areaId\":460203,\"areaType\":2,\"name\":\"吉阳区\",\"parentAreaId\":460200},{\"areaId\":460204,\"areaType\":2,\"name\":\"天涯区\",\"parentAreaId\":460200},{\"areaId\":460205,\"areaType\":2,\"name\":\"崖州区\",\"parentAreaId\":460200}],\"name\":\"三亚市\",\"parentAreaId\":460000},{\"areaId\":460300,\"areaType\":1,\"children\":[{\"areaId\":460321,\"areaType\":2,\"name\":\"西沙群岛\",\"parentAreaId\":460300},{\"areaId\":460322,\"areaType\":2,\"name\":\"南沙群岛\",\"parentAreaId\":460300},{\"areaId\":460323,\"areaType\":2,\"name\":\"中沙群岛的岛礁及其海域\",\"parentAreaId\":460300}],\"name\":\"三沙市\",\"parentAreaId\":460000},{\"areaId\":460400,\"areaType\":1,\"children\":[{\"areaId\":460499,\"areaType\":2,\"name\":\"儋州市\",\"parentAreaId\":460400}],\"name\":\"儋州市\",\"parentAreaId\":460000},{\"areaId\":469001,\"areaType\":1,\"children\":[{\"areaId\":469001100,\"areaType\":2,\"name\":\"通什镇\",\"parentAreaId\":469001},{\"areaId\":469001101,\"areaType\":2,\"name\":\"南圣镇\",\"parentAreaId\":469001},{\"areaId\":469001102,\"areaType\":2,\"name\":\"毛阳镇\",\"parentAreaId\":469001},{\"areaId\":469001103,\"areaType\":2,\"name\":\"番阳镇\",\"parentAreaId\":469001},{\"areaId\":469001200,\"areaType\":2,\"name\":\"畅好乡\",\"parentAreaId\":469001},{\"areaId\":469001201,\"areaType\":2,\"name\":\"毛道乡\",\"parentAreaId\":469001},{\"areaId\":469001202,\"areaType\":2,\"name\":\"水满乡\",\"parentAreaId\":469001},{\"areaId\":469001400,\"areaType\":2,\"name\":\"国营畅好农场\",\"parentAreaId\":469001}],\"name\":\"五指山市\",\"parentAreaId\":460000},{\"areaId\":469002,\"areaType\":1,\"children\":[{\"areaId\":469002100,\"areaType\":2,\"name\":\"嘉积镇\",\"parentAreaId\":469002},{\"areaId\":469002101,\"areaType\":2,\"name\":\"万泉镇\",\"parentAreaId\":469002},{\"areaId\":469002102,\"areaType\":2,\"name\":\"石壁镇\",\"parentAreaId\":469002},{\"areaId\":469002103,\"areaType\":2,\"name\":\"中原镇\",\"parentAreaId\":469002},{\"areaId\":469002104,\"areaType\":2,\"name\":\"博鳌镇\",\"parentAreaId\":469002},{\"areaId\":469002105,\"areaType\":2,\"name\":\"阳江镇\",\"parentAreaId\":469002},{\"areaId\":469002106,\"areaType\":2,\"name\":\"龙江镇\",\"parentAreaId\":469002},{\"areaId\":469002107,\"areaType\":2,\"name\":\"潭门镇\",\"parentAreaId\":469002},{\"areaId\":469002108,\"areaType\":2,\"name\":\"塔洋镇\",\"parentAreaId\":469002},{\"areaId\":469002109,\"areaType\":2,\"name\":\"长坡镇\",\"parentAreaId\":469002},{\"areaId\":469002110,\"areaType\":2,\"name\":\"大路镇\",\"parentAreaId\":469002},{\"areaId\":469002111,\"areaType\":2,\"name\":\"会山镇\",\"parentAreaId\":469002},{\"areaId\":469002400,\"areaType\":2,\"name\":\"东太农场\",\"parentAreaId\":469002},{\"areaId\":469002401,\"areaType\":2,\"name\":\"南俸农场\",\"parentAreaId\":469002},{\"areaId\":469002402,\"areaType\":2,\"name\":\"东红农场\",\"parentAreaId\":469002},{\"areaId\":469002500,\"areaType\":2,\"name\":\"彬村山华侨农场\",\"parentAreaId\":469002},{\"areaId\":469002953,\"areaType\":2,\"name\":\"东平农场\",\"parentAreaId\":469002}],\"name\":\"琼海市\",\"parentAreaId\":460000},{\"areaId\":469005,\"areaType\":1,\"children\":[{\"areaId\":469005100,\"areaType\":2,\"name\":\"文城镇\",\"parentAreaId\":469005},{\"areaId\":469005101,\"areaType\":2,\"name\":\"重兴镇\",\"parentAreaId\":469005},{\"areaId\":469005102,\"areaType\":2,\"name\":\"蓬莱镇\",\"parentAreaId\":469005},{\"areaId\":469005103,\"areaType\":2,\"name\":\"会文镇\",\"parentAreaId\":469005},{\"areaId\":469005104,\"areaType\":2,\"name\":\"东路镇\",\"parentAreaId\":469005},{\"areaId\":469005105,\"areaType\":2,\"name\":\"潭牛镇\",\"parentAreaId\":469005},{\"areaId\":469005106,\"areaType\":2,\"name\":\"东阁镇\",\"parentAreaId\":469005},{\"areaId\":469005107,\"areaType\":2,\"name\":\"文教镇\",\"parentAreaId\":469005},{\"areaId\":469005108,\"areaType\":2,\"name\":\"东郊镇\",\"parentAreaId\":469005},{\"areaId\":469005109,\"areaType\":2,\"name\":\"龙楼镇\",\"parentAreaId\":469005},{\"areaId\":469005110,\"areaType\":2,\"name\":\"昌洒镇\",\"parentAreaId\":469005},{\"areaId\":469005111,\"areaType\":2,\"name\":\"翁田镇\",\"parentAreaId\":469005},{\"areaId\":469005112,\"areaType\":2,\"name\":\"抱罗镇\",\"parentAreaId\":469005},{\"areaId\":469005113,\"areaType\":2,\"name\":\"冯坡镇\",\"parentAreaId\":469005},{\"areaId\":469005114,\"areaType\":2,\"name\":\"锦山镇\",\"parentAreaId\":469005},{\"areaId\":469005115,\"areaType\":2,\"name\":\"铺前镇\",\"parentAreaId\":469005},{\"areaId\":469005116,\"areaType\":2,\"name\":\"公坡镇\",\"parentAreaId\":469005},{\"areaId\":469005401,\"areaType\":2,\"name\":\"国营南阳农场\",\"parentAreaId\":469005},{\"areaId\":469005402,\"areaType\":2,\"name\":\"国营罗豆农场\",\"parentAreaId\":469005}],\"name\":\"文昌市\",\"parentAreaId\":460000},{\"areaId\":469006,\"areaType\":1,\"children\":[{\"areaId\":469006100,\"areaType\":2,\"name\":\"万城镇\",\"parentAreaId\":469006},{\"areaId\":469006101,\"areaType\":2,\"name\":\"龙滚镇\",\"parentAreaId\":469006},{\"areaId\":469006102,\"areaType\":2,\"name\":\"和乐镇\",\"parentAreaId\":469006},{\"areaId\":469006103,\"areaType\":2,\"name\":\"后安镇\",\"parentAreaId\":469006},{\"areaId\":469006104,\"areaType\":2,\"name\":\"大茂镇\",\"parentAreaId\":469006},{\"areaId\":469006105,\"areaType\":2,\"name\":\"东澳镇\",\"parentAreaId\":469006},{\"areaId\":469006106,\"areaType\":2,\"name\":\"礼纪镇\",\"parentAreaId\":469006},{\"areaId\":469006107,\"areaType\":2,\"name\":\"长丰镇\",\"parentAreaId\":469006},{\"areaId\":469006108,\"areaType\":2,\"name\":\"山根镇\",\"parentAreaId\":469006},{\"areaId\":469006109,\"areaType\":2,\"name\":\"北大镇\",\"parentAreaId\":469006},{\"areaId\":469006110,\"areaType\":2,\"name\":\"南桥镇\",\"parentAreaId\":469006},{\"areaId\":469006111,\"areaType\":2,\"name\":\"三更罗镇\",\"parentAreaId\":469006},{\"areaId\":469006400,\"areaType\":2,\"name\":\"国营东兴农场\",\"parentAreaId\":469006},{\"areaId\":469006500,\"areaType\":2,\"name\":\"兴隆华侨农场\",\"parentAreaId\":469006},{\"areaId\":469006501,\"areaType\":2,\"name\":\"地方国营六连林场\",\"parentAreaId\":469006},{\"areaId\":469006951,\"areaType\":2,\"name\":\"东岭农场\",\"parentAreaId\":469006}],\"name\":\"万宁市\",\"parentAreaId\":460000},{\"areaId\":469007,\"areaType\":1,\"children\":[{\"areaId\":469007100,\"areaType\":2,\"name\":\"八所镇\",\"parentAreaId\":469007},{\"areaId\":469007101,\"areaType\":2,\"name\":\"东河镇\",\"parentAreaId\":469007},{\"areaId\":469007102,\"areaType\":2,\"name\":\"大田镇\",\"parentAreaId\":469007},{\"areaId\":469007103,\"areaType\":2,\"name\":\"感城镇\",\"parentAreaId\":469007},{\"areaId\":469007104,\"areaType\":2,\"name\":\"板桥镇\",\"parentAreaId\":469007},{\"areaId\":469007105,\"areaType\":2,\"name\":\"三家镇\",\"parentAreaId\":469007},{\"areaId\":469007106,\"areaType\":2,\"name\":\"四更镇\",\"parentAreaId\":469007},{\"areaId\":469007107,\"areaType\":2,\"name\":\"新龙镇\",\"parentAreaId\":469007},{\"areaId\":469007200,\"areaType\":2,\"name\":\"天安乡\",\"parentAreaId\":469007},{\"areaId\":469007201,\"areaType\":2,\"name\":\"江边乡\",\"parentAreaId\":469007},{\"areaId\":469007400,\"areaType\":2,\"name\":\"国营广坝农场\",\"parentAreaId\":469007},{\"areaId\":469007500,\"areaType\":2,\"name\":\"东方华侨农场\",\"parentAreaId\":469007},{\"areaId\":469007950,\"areaType\":2,\"name\":\"东方农场\",\"parentAreaId\":469007}],\"name\":\"东方市\",\"parentAreaId\":460000},{\"areaId\":469021,\"areaType\":1,\"children\":[{\"areaId\":469021100,\"areaType\":2,\"name\":\"定城镇\",\"parentAreaId\":469021},{\"areaId\":469021101,\"areaType\":2,\"name\":\"新竹镇\",\"parentAreaId\":469021},{\"areaId\":469021102,\"areaType\":2,\"name\":\"龙湖镇\",\"parentAreaId\":469021},{\"areaId\":469021103,\"areaType\":2,\"name\":\"黄竹镇\",\"parentAreaId\":469021},{\"areaId\":469021104,\"areaType\":2,\"name\":\"雷鸣镇\",\"parentAreaId\":469021},{\"areaId\":469021105,\"areaType\":2,\"name\":\"龙门镇\",\"parentAreaId\":469021},{\"areaId\":469021106,\"areaType\":2,\"name\":\"龙河镇\",\"parentAreaId\":469021},{\"areaId\":469021107,\"areaType\":2,\"name\":\"岭口镇\",\"parentAreaId\":469021},{\"areaId\":469021108,\"areaType\":2,\"name\":\"翰林镇\",\"parentAreaId\":469021},{\"areaId\":469021109,\"areaType\":2,\"name\":\"富文镇\",\"parentAreaId\":469021},{\"areaId\":469021400,\"areaType\":2,\"name\":\"国营中瑞农场\",\"parentAreaId\":469021},{\"areaId\":469021401,\"areaType\":2,\"name\":\"国营南海农场\",\"parentAreaId\":469021},{\"areaId\":469021402,\"areaType\":2,\"name\":\"国营金鸡岭农场\",\"parentAreaId\":469021},{\"areaId\":469021403,\"areaType\":2,\"name\":\"国营东升农场\",\"parentAreaId\":469021}],\"name\":\"定安县\",\"parentAreaId\":460000},{\"areaId\":469022,\"areaType\":1,\"children\":[{\"areaId\":469022100,\"areaType\":2,\"name\":\"屯城镇\",\"parentAreaId\":469022},{\"areaId\":469022101,\"areaType\":2,\"name\":\"新兴镇\",\"parentAreaId\":469022},{\"areaId\":469022102,\"areaType\":2,\"name\":\"枫木镇\",\"parentAreaId\":469022},{\"areaId\":469022103,\"areaType\":2,\"name\":\"乌坡镇\",\"parentAreaId\":469022},{\"areaId\":469022104,\"areaType\":2,\"name\":\"南吕镇\",\"parentAreaId\":469022},{\"areaId\":469022105,\"areaType\":2,\"name\":\"南坤镇\",\"parentAreaId\":469022},{\"areaId\":469022106,\"areaType\":2,\"name\":\"坡心镇\",\"parentAreaId\":469022},{\"areaId\":469022107,\"areaType\":2,\"name\":\"西昌镇\",\"parentAreaId\":469022},{\"areaId\":469022400,\"areaType\":2,\"name\":\"国营中瑞农场\",\"parentAreaId\":469022},{\"areaId\":469022401,\"areaType\":2,\"name\":\"国营中坤农场\",\"parentAreaId\":469022},{\"areaId\":469022950,\"areaType\":2,\"name\":\"国营中建农场\",\"parentAreaId\":469022},{\"areaId\":469022951,\"areaType\":2,\"name\":\"晨星农场\",\"parentAreaId\":469022},{\"areaId\":469022952,\"areaType\":2,\"name\":\"黄岭农场\",\"parentAreaId\":469022},{\"areaId\":469022954,\"areaType\":2,\"name\":\"广青农场\",\"parentAreaId\":469022}],\"name\":\"屯昌县\",\"parentAreaId\":460000},{\"areaId\":469023,\"areaType\":1,\"children\":[{\"areaId\":469023100,\"areaType\":2,\"name\":\"金江镇\",\"parentAreaId\":469023},{\"areaId\":469023101,\"areaType\":2,\"name\":\"老城镇\",\"parentAreaId\":469023},{\"areaId\":469023102,\"areaType\":2,\"name\":\"瑞溪镇\",\"parentAreaId\":469023},{\"areaId\":469023103,\"areaType\":2,\"name\":\"永发镇\",\"parentAreaId\":469023},{\"areaId\":469023104,\"areaType\":2,\"name\":\"加乐镇\",\"parentAreaId\":469023},{\"areaId\":469023105,\"areaType\":2,\"name\":\"文儒镇\",\"parentAreaId\":469023},{\"areaId\":469023106,\"areaType\":2,\"name\":\"中兴镇\",\"parentAreaId\":469023},{\"areaId\":469023107,\"areaType\":2,\"name\":\"仁兴镇\",\"parentAreaId\":469023},{\"areaId\":469023108,\"areaType\":2,\"name\":\"福山镇\",\"parentAreaId\":469023},{\"areaId\":469023109,\"areaType\":2,\"name\":\"桥头镇\",\"parentAreaId\":469023},{\"areaId\":469023110,\"areaType\":2,\"name\":\"大丰镇\",\"parentAreaId\":469023},{\"areaId\":469023400,\"areaType\":2,\"name\":\"国营红光农场\",\"parentAreaId\":469023},{\"areaId\":469023401,\"areaType\":2,\"name\":\"红岗农场\",\"parentAreaId\":469023},{\"areaId\":469023402,\"areaType\":2,\"name\":\"国营西达农场\",\"parentAreaId\":469023},{\"areaId\":469023405,\"areaType\":2,\"name\":\"国营金安农场\",\"parentAreaId\":469023}],\"name\":\"澄迈县\",\"parentAreaId\":460000},{\"areaId\":469024,\"areaType\":1,\"children\":[{\"areaId\":469024100,\"areaType\":2,\"name\":\"临城镇\",\"parentAreaId\":469024},{\"areaId\":469024101,\"areaType\":2,\"name\":\"波莲镇\",\"parentAreaId\":469024},{\"areaId\":469024102,\"areaType\":2,\"name\":\"东英镇\",\"parentAreaId\":469024},{\"areaId\":469024103,\"areaType\":2,\"name\":\"博厚镇\",\"parentAreaId\":469024},{\"areaId\":469024104,\"areaType\":2,\"name\":\"皇桐镇\",\"parentAreaId\":469024},{\"areaId\":469024105,\"areaType\":2,\"name\":\"多文镇\",\"parentAreaId\":469024},{\"areaId\":469024106,\"areaType\":2,\"name\":\"和舍镇\",\"parentAreaId\":469024},{\"areaId\":469024107,\"areaType\":2,\"name\":\"南宝镇\",\"parentAreaId\":469024},{\"areaId\":469024108,\"areaType\":2,\"name\":\"新盈镇\",\"parentAreaId\":469024},{\"areaId\":469024109,\"areaType\":2,\"name\":\"调楼镇\",\"parentAreaId\":469024},{\"areaId\":469024400,\"areaType\":2,\"name\":\"国营红华农场\",\"parentAreaId\":469024},{\"areaId\":469024401,\"areaType\":2,\"name\":\"国营加来农场\",\"parentAreaId\":469024}],\"name\":\"临高县\",\"parentAreaId\":460000},{\"areaId\":469025,\"areaType\":1,\"children\":[{\"areaId\":469025100,\"areaType\":2,\"name\":\"牙叉镇\",\"parentAreaId\":469025},{\"areaId\":469025101,\"areaType\":2,\"name\":\"七坊镇\",\"parentAreaId\":469025},{\"areaId\":469025102,\"areaType\":2,\"name\":\"邦溪镇\",\"parentAreaId\":469025},{\"areaId\":469025103,\"areaType\":2,\"name\":\"打安镇\",\"parentAreaId\":469025},{\"areaId\":469025200,\"areaType\":2,\"name\":\"细水乡\",\"parentAreaId\":469025},{\"areaId\":469025201,\"areaType\":2,\"name\":\"元门乡\",\"parentAreaId\":469025},{\"areaId\":469025202,\"areaType\":2,\"name\":\"南开乡\",\"parentAreaId\":469025},{\"areaId\":469025203,\"areaType\":2,\"name\":\"阜龙乡\",\"parentAreaId\":469025},{\"areaId\":469025204,\"areaType\":2,\"name\":\"青松乡\",\"parentAreaId\":469025},{\"areaId\":469025205,\"areaType\":2,\"name\":\"金波乡\",\"parentAreaId\":469025},{\"areaId\":469025206,\"areaType\":2,\"name\":\"荣邦乡\",\"parentAreaId\":469025},{\"areaId\":469025401,\"areaType\":2,\"name\":\"国营白沙农场\",\"parentAreaId\":469025},{\"areaId\":469025404,\"areaType\":2,\"name\":\"国营龙江农场\",\"parentAreaId\":469025},{\"areaId\":469025950,\"areaType\":2,\"name\":\"卫星农场\",\"parentAreaId\":469025}],\"name\":\"白沙黎族自治县\",\"parentAreaId\":460000},{\"areaId\":469026,\"areaType\":1,\"children\":[{\"areaId\":469026100,\"areaType\":2,\"name\":\"石碌镇\",\"parentAreaId\":469026},{\"areaId\":469026101,\"areaType\":2,\"name\":\"叉河镇\",\"parentAreaId\":469026},{\"areaId\":469026102,\"areaType\":2,\"name\":\"十月田镇\",\"parentAreaId\":469026},{\"areaId\":469026103,\"areaType\":2,\"name\":\"乌烈镇\",\"parentAreaId\":469026},{\"areaId\":469026104,\"areaType\":2,\"name\":\"昌化镇\",\"parentAreaId\":469026},{\"areaId\":469026105,\"areaType\":2,\"name\":\"海尾镇\",\"parentAreaId\":469026},{\"areaId\":469026106,\"areaType\":2,\"name\":\"七叉镇\",\"parentAreaId\":469026},{\"areaId\":469026200,\"areaType\":2,\"name\":\"王下乡\",\"parentAreaId\":469026},{\"areaId\":469026401,\"areaType\":2,\"name\":\"国营红林农场\",\"parentAreaId\":469026},{\"areaId\":469026500,\"areaType\":2,\"name\":\"国营霸王岭林场\",\"parentAreaId\":469026}],\"name\":\"昌江黎族自治县\",\"parentAreaId\":460000},{\"areaId\":469027,\"areaType\":1,\"children\":[{\"areaId\":469027100,\"areaType\":2,\"name\":\"抱由镇\",\"parentAreaId\":469027},{\"areaId\":469027101,\"areaType\":2,\"name\":\"万冲镇\",\"parentAreaId\":469027},{\"areaId\":469027102,\"areaType\":2,\"name\":\"大安镇\",\"parentAreaId\":469027},{\"areaId\":469027103,\"areaType\":2,\"name\":\"志仲镇\",\"parentAreaId\":469027},{\"areaId\":469027104,\"areaType\":2,\"name\":\"千家镇\",\"parentAreaId\":469027},{\"areaId\":469027105,\"areaType\":2,\"name\":\"九所镇\",\"parentAreaId\":469027},{\"areaId\":469027106,\"areaType\":2,\"name\":\"利国镇\",\"parentAreaId\":469027},{\"areaId\":469027107,\"areaType\":2,\"name\":\"黄流镇\",\"parentAreaId\":469027},{\"areaId\":469027108,\"areaType\":2,\"name\":\"佛罗镇\",\"parentAreaId\":469027},{\"areaId\":469027109,\"areaType\":2,\"name\":\"尖峰镇\",\"parentAreaId\":469027},{\"areaId\":469027110,\"areaType\":2,\"name\":\"莺歌海镇\",\"parentAreaId\":469027},{\"areaId\":469027401,\"areaType\":2,\"name\":\"国营山荣农场\",\"parentAreaId\":469027},{\"areaId\":469027402,\"areaType\":2,\"name\":\"国营乐光农场\",\"parentAreaId\":469027},{\"areaId\":469027405,\"areaType\":2,\"name\":\"国营保国农场\",\"parentAreaId\":469027},{\"areaId\":469027951,\"areaType\":2,\"name\":\"福报农场\",\"parentAreaId\":469027}],\"name\":\"乐东黎族自治县\",\"parentAreaId\":460000},{\"areaId\":469028,\"areaType\":1,\"children\":[{\"areaId\":469028100,\"areaType\":2,\"name\":\"椰林镇\",\"parentAreaId\":469028},{\"areaId\":469028101,\"areaType\":2,\"name\":\"光坡镇\",\"parentAreaId\":469028},{\"areaId\":469028102,\"areaType\":2,\"name\":\"三才镇\",\"parentAreaId\":469028},{\"areaId\":469028103,\"areaType\":2,\"name\":\"英州镇\",\"parentAreaId\":469028},{\"areaId\":469028104,\"areaType\":2,\"name\":\"隆广镇\",\"parentAreaId\":469028},{\"areaId\":469028105,\"areaType\":2,\"name\":\"文罗镇\",\"parentAreaId\":469028},{\"areaId\":469028106,\"areaType\":2,\"name\":\"本号镇\",\"parentAreaId\":469028},{\"areaId\":469028107,\"areaType\":2,\"name\":\"新村镇\",\"parentAreaId\":469028},{\"areaId\":469028108,\"areaType\":2,\"name\":\"黎安镇\",\"parentAreaId\":469028},{\"areaId\":469028200,\"areaType\":2,\"name\":\"提蒙乡\",\"parentAreaId\":469028},{\"areaId\":469028201,\"areaType\":2,\"name\":\"群英乡\",\"parentAreaId\":469028},{\"areaId\":469028400,\"areaType\":2,\"name\":\"岭门农场\",\"parentAreaId\":469028},{\"areaId\":469028401,\"areaType\":2,\"name\":\"国营南平农场\",\"parentAreaId\":469028}],\"name\":\"陵水黎族自治县\",\"parentAreaId\":460000},{\"areaId\":469029,\"areaType\":1,\"children\":[{\"areaId\":469029100,\"areaType\":2,\"name\":\"保城镇\",\"parentAreaId\":469029},{\"areaId\":469029101,\"areaType\":2,\"name\":\"什玲镇\",\"parentAreaId\":469029},{\"areaId\":469029102,\"areaType\":2,\"name\":\"加茂镇\",\"parentAreaId\":469029},{\"areaId\":469029103,\"areaType\":2,\"name\":\"响水镇\",\"parentAreaId\":469029},{\"areaId\":469029104,\"areaType\":2,\"name\":\"新政镇\",\"parentAreaId\":469029},{\"areaId\":469029105,\"areaType\":2,\"name\":\"三道镇\",\"parentAreaId\":469029},{\"areaId\":469029200,\"areaType\":2,\"name\":\"六弓乡\",\"parentAreaId\":469029},{\"areaId\":469029201,\"areaType\":2,\"name\":\"南林乡\",\"parentAreaId\":469029},{\"areaId\":469029202,\"areaType\":2,\"name\":\"毛感乡\",\"parentAreaId\":469029},{\"areaId\":469029401,\"areaType\":2,\"name\":\"新星农场\",\"parentAreaId\":469029},{\"areaId\":469029402,\"areaType\":2,\"name\":\"海南保亭热带作物研究所\",\"parentAreaId\":469029},{\"areaId\":469029403,\"areaType\":2,\"name\":\"国营金江农场\",\"parentAreaId\":469029},{\"areaId\":469029950,\"areaType\":2,\"name\":\"南茂农场\",\"parentAreaId\":469029},{\"areaId\":469029952,\"areaType\":2,\"name\":\"通什茶场\",\"parentAreaId\":469029}],\"name\":\"保亭黎族苗族自治县\",\"parentAreaId\":460000},{\"areaId\":469030,\"areaType\":1,\"children\":[{\"areaId\":469030100,\"areaType\":2,\"name\":\"营根镇\",\"parentAreaId\":469030},{\"areaId\":469030101,\"areaType\":2,\"name\":\"湾岭镇\",\"parentAreaId\":469030},{\"areaId\":469030102,\"areaType\":2,\"name\":\"黎母山镇\",\"parentAreaId\":469030},{\"areaId\":469030103,\"areaType\":2,\"name\":\"和平镇\",\"parentAreaId\":469030},{\"areaId\":469030104,\"areaType\":2,\"name\":\"长征镇\",\"parentAreaId\":469030},{\"areaId\":469030105,\"areaType\":2,\"name\":\"红毛镇\",\"parentAreaId\":469030},{\"areaId\":469030106,\"areaType\":2,\"name\":\"中平镇\",\"parentAreaId\":469030},{\"areaId\":469030200,\"areaType\":2,\"name\":\"吊罗山乡\",\"parentAreaId\":469030},{\"areaId\":469030201,\"areaType\":2,\"name\":\"上安乡\",\"parentAreaId\":469030},{\"areaId\":469030202,\"areaType\":2,\"name\":\"什运乡\",\"parentAreaId\":469030},{\"areaId\":469030402,\"areaType\":2,\"name\":\"阳江农场\",\"parentAreaId\":469030},{\"areaId\":469030403,\"areaType\":2,\"name\":\"乌石农场\",\"parentAreaId\":469030},{\"areaId\":469030950,\"areaType\":2,\"name\":\"岭头茶场\",\"parentAreaId\":469030},{\"areaId\":469030951,\"areaType\":2,\"name\":\"南方农场\",\"parentAreaId\":469030}],\"name\":\"琼中黎族苗族自治县\",\"parentAreaId\":460000}],\"name\":\"海南省\",\"parentAreaId\":0},{\"areaId\":510000,\"areaType\":0,\"children\":[{\"areaId\":510100,\"areaType\":1,\"children\":[{\"areaId\":510104,\"areaType\":2,\"name\":\"锦江区\",\"parentAreaId\":510100},{\"areaId\":510105,\"areaType\":2,\"name\":\"青羊区\",\"parentAreaId\":510100},{\"areaId\":510106,\"areaType\":2,\"name\":\"金牛区\",\"parentAreaId\":510100},{\"areaId\":510107,\"areaType\":2,\"name\":\"武侯区\",\"parentAreaId\":510100},{\"areaId\":510108,\"areaType\":2,\"name\":\"成华区\",\"parentAreaId\":510100},{\"areaId\":510112,\"areaType\":2,\"name\":\"龙泉驿区\",\"parentAreaId\":510100},{\"areaId\":510113,\"areaType\":2,\"name\":\"青白江区\",\"parentAreaId\":510100},{\"areaId\":510114,\"areaType\":2,\"name\":\"新都区\",\"parentAreaId\":510100},{\"areaId\":510115,\"areaType\":2,\"name\":\"温江区\",\"parentAreaId\":510100},{\"areaId\":510116,\"areaType\":2,\"name\":\"双流区\",\"parentAreaId\":510100},{\"areaId\":510117,\"areaType\":2,\"name\":\"郫都区\",\"parentAreaId\":510100},{\"areaId\":510121,\"areaType\":2,\"name\":\"金堂县\",\"parentAreaId\":510100},{\"areaId\":510129,\"areaType\":2,\"name\":\"大邑县\",\"parentAreaId\":510100},{\"areaId\":510131,\"areaType\":2,\"name\":\"蒲江县\",\"parentAreaId\":510100},{\"areaId\":510132,\"areaType\":2,\"name\":\"新津县\",\"parentAreaId\":510100},{\"areaId\":510181,\"areaType\":2,\"name\":\"都江堰市\",\"parentAreaId\":510100},{\"areaId\":510182,\"areaType\":2,\"name\":\"彭州市\",\"parentAreaId\":510100},{\"areaId\":510183,\"areaType\":2,\"name\":\"邛崃市\",\"parentAreaId\":510100},{\"areaId\":510184,\"areaType\":2,\"name\":\"崇州市\",\"parentAreaId\":510100},{\"areaId\":510185,\"areaType\":2,\"name\":\"简阳市\",\"parentAreaId\":510100}],\"name\":\"成都市\",\"parentAreaId\":510000},{\"areaId\":510300,\"areaType\":1,\"children\":[{\"areaId\":510302,\"areaType\":2,\"name\":\"自流井区\",\"parentAreaId\":510300},{\"areaId\":510303,\"areaType\":2,\"name\":\"贡井区\",\"parentAreaId\":510300},{\"areaId\":510304,\"areaType\":2,\"name\":\"大安区\",\"parentAreaId\":510300},{\"areaId\":510311,\"areaType\":2,\"name\":\"沿滩区\",\"parentAreaId\":510300},{\"areaId\":510321,\"areaType\":2,\"name\":\"荣县\",\"parentAreaId\":510300},{\"areaId\":510322,\"areaType\":2,\"name\":\"富顺县\",\"parentAreaId\":510300}],\"name\":\"自贡市\",\"parentAreaId\":510000},{\"areaId\":510400,\"areaType\":1,\"children\":[{\"areaId\":510402,\"areaType\":2,\"name\":\"东区\",\"parentAreaId\":510400},{\"areaId\":510403,\"areaType\":2,\"name\":\"西区\",\"parentAreaId\":510400},{\"areaId\":510411,\"areaType\":2,\"name\":\"仁和区\",\"parentAreaId\":510400},{\"areaId\":510421,\"areaType\":2,\"name\":\"米易县\",\"parentAreaId\":510400},{\"areaId\":510422,\"areaType\":2,\"name\":\"盐边县\",\"parentAreaId\":510400}],\"name\":\"攀枝花市\",\"parentAreaId\":510000},{\"areaId\":510500,\"areaType\":1,\"children\":[{\"areaId\":510502,\"areaType\":2,\"name\":\"江阳区\",\"parentAreaId\":510500},{\"areaId\":510503,\"areaType\":2,\"name\":\"纳溪区\",\"parentAreaId\":510500},{\"areaId\":510504,\"areaType\":2,\"name\":\"龙马潭区\",\"parentAreaId\":510500},{\"areaId\":510521,\"areaType\":2,\"name\":\"泸县\",\"parentAreaId\":510500},{\"areaId\":510522,\"areaType\":2,\"name\":\"合江县\",\"parentAreaId\":510500},{\"areaId\":510524,\"areaType\":2,\"name\":\"叙永县\",\"parentAreaId\":510500},{\"areaId\":510525,\"areaType\":2,\"name\":\"古蔺县\",\"parentAreaId\":510500}],\"name\":\"泸州市\",\"parentAreaId\":510000},{\"areaId\":510600,\"areaType\":1,\"children\":[{\"areaId\":510603,\"areaType\":2,\"name\":\"旌阳区\",\"parentAreaId\":510600},{\"areaId\":510604,\"areaType\":2,\"name\":\"罗江区\",\"parentAreaId\":510600},{\"areaId\":510623,\"areaType\":2,\"name\":\"中江县\",\"parentAreaId\":510600},{\"areaId\":510681,\"areaType\":2,\"name\":\"广汉市\",\"parentAreaId\":510600},{\"areaId\":510682,\"areaType\":2,\"name\":\"什邡市\",\"parentAreaId\":510600},{\"areaId\":510683,\"areaType\":2,\"name\":\"绵竹市\",\"parentAreaId\":510600}],\"name\":\"德阳市\",\"parentAreaId\":510000},{\"areaId\":510700,\"areaType\":1,\"children\":[{\"areaId\":510703,\"areaType\":2,\"name\":\"涪城区\",\"parentAreaId\":510700},{\"areaId\":510704,\"areaType\":2,\"name\":\"游仙区\",\"parentAreaId\":510700},{\"areaId\":510705,\"areaType\":2,\"name\":\"安州区\",\"parentAreaId\":510700},{\"areaId\":510722,\"areaType\":2,\"name\":\"三台县\",\"parentAreaId\":510700},{\"areaId\":510723,\"areaType\":2,\"name\":\"盐亭县\",\"parentAreaId\":510700},{\"areaId\":510725,\"areaType\":2,\"name\":\"梓潼县\",\"parentAreaId\":510700},{\"areaId\":510726,\"areaType\":2,\"name\":\"北川羌族自治县\",\"parentAreaId\":510700},{\"areaId\":510727,\"areaType\":2,\"name\":\"平武县\",\"parentAreaId\":510700},{\"areaId\":510781,\"areaType\":2,\"name\":\"江油市\",\"parentAreaId\":510700}],\"name\":\"绵阳市\",\"parentAreaId\":510000},{\"areaId\":510800,\"areaType\":1,\"children\":[{\"areaId\":510802,\"areaType\":2,\"name\":\"利州区\",\"parentAreaId\":510800},{\"areaId\":510811,\"areaType\":2,\"name\":\"昭化区\",\"parentAreaId\":510800},{\"areaId\":510812,\"areaType\":2,\"name\":\"朝天区\",\"parentAreaId\":510800},{\"areaId\":510821,\"areaType\":2,\"name\":\"旺苍县\",\"parentAreaId\":510800},{\"areaId\":510822,\"areaType\":2,\"name\":\"青川县\",\"parentAreaId\":510800},{\"areaId\":510823,\"areaType\":2,\"name\":\"剑阁县\",\"parentAreaId\":510800},{\"areaId\":510824,\"areaType\":2,\"name\":\"苍溪县\",\"parentAreaId\":510800}],\"name\":\"广元市\",\"parentAreaId\":510000},{\"areaId\":510900,\"areaType\":1,\"children\":[{\"areaId\":510903,\"areaType\":2,\"name\":\"船山区\",\"parentAreaId\":510900},{\"areaId\":510904,\"areaType\":2,\"name\":\"安居区\",\"parentAreaId\":510900},{\"areaId\":510921,\"areaType\":2,\"name\":\"蓬溪县\",\"parentAreaId\":510900},{\"areaId\":510922,\"areaType\":2,\"name\":\"射洪县\",\"parentAreaId\":510900},{\"areaId\":510923,\"areaType\":2,\"name\":\"大英县\",\"parentAreaId\":510900}],\"name\":\"遂宁市\",\"parentAreaId\":510000},{\"areaId\":511000,\"areaType\":1,\"children\":[{\"areaId\":511002,\"areaType\":2,\"name\":\"市中区\",\"parentAreaId\":511000},{\"areaId\":511011,\"areaType\":2,\"name\":\"东兴区\",\"parentAreaId\":511000},{\"areaId\":511024,\"areaType\":2,\"name\":\"威远县\",\"parentAreaId\":511000},{\"areaId\":511025,\"areaType\":2,\"name\":\"资中县\",\"parentAreaId\":511000},{\"areaId\":511083,\"areaType\":2,\"name\":\"隆昌市\",\"parentAreaId\":511000}],\"name\":\"内江市\",\"parentAreaId\":510000},{\"areaId\":511100,\"areaType\":1,\"children\":[{\"areaId\":511102,\"areaType\":2,\"name\":\"市中区\",\"parentAreaId\":511100},{\"areaId\":511111,\"areaType\":2,\"name\":\"沙湾区\",\"parentAreaId\":511100},{\"areaId\":511112,\"areaType\":2,\"name\":\"五通桥区\",\"parentAreaId\":511100},{\"areaId\":511113,\"areaType\":2,\"name\":\"金口河区\",\"parentAreaId\":511100},{\"areaId\":511123,\"areaType\":2,\"name\":\"犍为县\",\"parentAreaId\":511100},{\"areaId\":511124,\"areaType\":2,\"name\":\"井研县\",\"parentAreaId\":511100},{\"areaId\":511126,\"areaType\":2,\"name\":\"夹江县\",\"parentAreaId\":511100},{\"areaId\":511129,\"areaType\":2,\"name\":\"沐川县\",\"parentAreaId\":511100},{\"areaId\":511132,\"areaType\":2,\"name\":\"峨边彝族自治县\",\"parentAreaId\":511100},{\"areaId\":511133,\"areaType\":2,\"name\":\"马边彝族自治县\",\"parentAreaId\":511100},{\"areaId\":511181,\"areaType\":2,\"name\":\"峨眉山市\",\"parentAreaId\":511100}],\"name\":\"乐山市\",\"parentAreaId\":510000},{\"areaId\":511300,\"areaType\":1,\"children\":[{\"areaId\":511302,\"areaType\":2,\"name\":\"顺庆区\",\"parentAreaId\":511300},{\"areaId\":511303,\"areaType\":2,\"name\":\"高坪区\",\"parentAreaId\":511300},{\"areaId\":511304,\"areaType\":2,\"name\":\"嘉陵区\",\"parentAreaId\":511300},{\"areaId\":511321,\"areaType\":2,\"name\":\"南部县\",\"parentAreaId\":511300},{\"areaId\":511322,\"areaType\":2,\"name\":\"营山县\",\"parentAreaId\":511300},{\"areaId\":511323,\"areaType\":2,\"name\":\"蓬安县\",\"parentAreaId\":511300},{\"areaId\":511324,\"areaType\":2,\"name\":\"仪陇县\",\"parentAreaId\":511300},{\"areaId\":511325,\"areaType\":2,\"name\":\"西充县\",\"parentAreaId\":511300},{\"areaId\":511381,\"areaType\":2,\"name\":\"阆中市\",\"parentAreaId\":511300}],\"name\":\"南充市\",\"parentAreaId\":510000},{\"areaId\":511400,\"areaType\":1,\"children\":[{\"areaId\":511402,\"areaType\":2,\"name\":\"东坡区\",\"parentAreaId\":511400},{\"areaId\":511403,\"areaType\":2,\"name\":\"彭山区\",\"parentAreaId\":511400},{\"areaId\":511421,\"areaType\":2,\"name\":\"仁寿县\",\"parentAreaId\":511400},{\"areaId\":511423,\"areaType\":2,\"name\":\"洪雅县\",\"parentAreaId\":511400},{\"areaId\":511424,\"areaType\":2,\"name\":\"丹棱县\",\"parentAreaId\":511400},{\"areaId\":511425,\"areaType\":2,\"name\":\"青神县\",\"parentAreaId\":511400}],\"name\":\"眉山市\",\"parentAreaId\":510000},{\"areaId\":511500,\"areaType\":1,\"children\":[{\"areaId\":511502,\"areaType\":2,\"name\":\"翠屏区\",\"parentAreaId\":511500},{\"areaId\":511503,\"areaType\":2,\"name\":\"南溪区\",\"parentAreaId\":511500},{\"areaId\":511521,\"areaType\":2,\"name\":\"叙州区\",\"parentAreaId\":511500},{\"areaId\":511523,\"areaType\":2,\"name\":\"江安县\",\"parentAreaId\":511500},{\"areaId\":511524,\"areaType\":2,\"name\":\"长宁县\",\"parentAreaId\":511500},{\"areaId\":511525,\"areaType\":2,\"name\":\"高县\",\"parentAreaId\":511500},{\"areaId\":511526,\"areaType\":2,\"name\":\"珙县\",\"parentAreaId\":511500},{\"areaId\":511527,\"areaType\":2,\"name\":\"筠连县\",\"parentAreaId\":511500},{\"areaId\":511528,\"areaType\":2,\"name\":\"兴文县\",\"parentAreaId\":511500},{\"areaId\":511529,\"areaType\":2,\"name\":\"屏山县\",\"parentAreaId\":511500}],\"name\":\"宜宾市\",\"parentAreaId\":510000},{\"areaId\":511600,\"areaType\":1,\"children\":[{\"areaId\":511602,\"areaType\":2,\"name\":\"广安区\",\"parentAreaId\":511600},{\"areaId\":511603,\"areaType\":2,\"name\":\"前锋区\",\"parentAreaId\":511600},{\"areaId\":511621,\"areaType\":2,\"name\":\"岳池县\",\"parentAreaId\":511600},{\"areaId\":511622,\"areaType\":2,\"name\":\"武胜县\",\"parentAreaId\":511600},{\"areaId\":511623,\"areaType\":2,\"name\":\"邻水县\",\"parentAreaId\":511600},{\"areaId\":511681,\"areaType\":2,\"name\":\"华蓥市\",\"parentAreaId\":511600}],\"name\":\"广安市\",\"parentAreaId\":510000},{\"areaId\":511700,\"areaType\":1,\"children\":[{\"areaId\":511702,\"areaType\":2,\"name\":\"通川区\",\"parentAreaId\":511700},{\"areaId\":511703,\"areaType\":2,\"name\":\"达川区\",\"parentAreaId\":511700},{\"areaId\":511722,\"areaType\":2,\"name\":\"宣汉县\",\"parentAreaId\":511700},{\"areaId\":511723,\"areaType\":2,\"name\":\"开江县\",\"parentAreaId\":511700},{\"areaId\":511724,\"areaType\":2,\"name\":\"大竹县\",\"parentAreaId\":511700},{\"areaId\":511725,\"areaType\":2,\"name\":\"渠县\",\"parentAreaId\":511700},{\"areaId\":511781,\"areaType\":2,\"name\":\"万源市\",\"parentAreaId\":511700}],\"name\":\"达州市\",\"parentAreaId\":510000},{\"areaId\":511800,\"areaType\":1,\"children\":[{\"areaId\":511802,\"areaType\":2,\"name\":\"雨城区\",\"parentAreaId\":511800},{\"areaId\":511803,\"areaType\":2,\"name\":\"名山区\",\"parentAreaId\":511800},{\"areaId\":511822,\"areaType\":2,\"name\":\"荥经县\",\"parentAreaId\":511800},{\"areaId\":511823,\"areaType\":2,\"name\":\"汉源县\",\"parentAreaId\":511800},{\"areaId\":511824,\"areaType\":2,\"name\":\"石棉县\",\"parentAreaId\":511800},{\"areaId\":511825,\"areaType\":2,\"name\":\"天全县\",\"parentAreaId\":511800},{\"areaId\":511826,\"areaType\":2,\"name\":\"芦山县\",\"parentAreaId\":511800},{\"areaId\":511827,\"areaType\":2,\"name\":\"宝兴县\",\"parentAreaId\":511800}],\"name\":\"雅安市\",\"parentAreaId\":510000},{\"areaId\":511900,\"areaType\":1,\"children\":[{\"areaId\":511902,\"areaType\":2,\"name\":\"巴州区\",\"parentAreaId\":511900},{\"areaId\":511903,\"areaType\":2,\"name\":\"恩阳区\",\"parentAreaId\":511900},{\"areaId\":511921,\"areaType\":2,\"name\":\"通江县\",\"parentAreaId\":511900},{\"areaId\":511922,\"areaType\":2,\"name\":\"南江县\",\"parentAreaId\":511900},{\"areaId\":511923,\"areaType\":2,\"name\":\"平昌县\",\"parentAreaId\":511900}],\"name\":\"巴中市\",\"parentAreaId\":510000},{\"areaId\":512000,\"areaType\":1,\"children\":[{\"areaId\":512002,\"areaType\":2,\"name\":\"雁江区\",\"parentAreaId\":512000},{\"areaId\":512021,\"areaType\":2,\"name\":\"安岳县\",\"parentAreaId\":512000},{\"areaId\":512022,\"areaType\":2,\"name\":\"乐至县\",\"parentAreaId\":512000}],\"name\":\"资阳市\",\"parentAreaId\":510000},{\"areaId\":513200,\"areaType\":1,\"children\":[{\"areaId\":513201,\"areaType\":2,\"name\":\"马尔康市\",\"parentAreaId\":513200},{\"areaId\":513221,\"areaType\":2,\"name\":\"汶川县\",\"parentAreaId\":513200},{\"areaId\":513222,\"areaType\":2,\"name\":\"理县\",\"parentAreaId\":513200},{\"areaId\":513223,\"areaType\":2,\"name\":\"茂县\",\"parentAreaId\":513200},{\"areaId\":513224,\"areaType\":2,\"name\":\"松潘县\",\"parentAreaId\":513200},{\"areaId\":513225,\"areaType\":2,\"name\":\"九寨沟县\",\"parentAreaId\":513200},{\"areaId\":513226,\"areaType\":2,\"name\":\"金川县\",\"parentAreaId\":513200},{\"areaId\":513227,\"areaType\":2,\"name\":\"小金县\",\"parentAreaId\":513200},{\"areaId\":513228,\"areaType\":2,\"name\":\"黑水县\",\"parentAreaId\":513200},{\"areaId\":513230,\"areaType\":2,\"name\":\"壤塘县\",\"parentAreaId\":513200},{\"areaId\":513231,\"areaType\":2,\"name\":\"阿坝县\",\"parentAreaId\":513200},{\"areaId\":513232,\"areaType\":2,\"name\":\"若尔盖县\",\"parentAreaId\":513200},{\"areaId\":513233,\"areaType\":2,\"name\":\"红原县\",\"parentAreaId\":513200}],\"name\":\"阿坝藏族羌族自治州\",\"parentAreaId\":510000},{\"areaId\":513300,\"areaType\":1,\"children\":[{\"areaId\":513301,\"areaType\":2,\"name\":\"康定市\",\"parentAreaId\":513300},{\"areaId\":513322,\"areaType\":2,\"name\":\"泸定县\",\"parentAreaId\":513300},{\"areaId\":513323,\"areaType\":2,\"name\":\"丹巴县\",\"parentAreaId\":513300},{\"areaId\":513324,\"areaType\":2,\"name\":\"九龙县\",\"parentAreaId\":513300},{\"areaId\":513325,\"areaType\":2,\"name\":\"雅江县\",\"parentAreaId\":513300},{\"areaId\":513326,\"areaType\":2,\"name\":\"道孚县\",\"parentAreaId\":513300},{\"areaId\":513327,\"areaType\":2,\"name\":\"炉霍县\",\"parentAreaId\":513300},{\"areaId\":513328,\"areaType\":2,\"name\":\"甘孜县\",\"parentAreaId\":513300},{\"areaId\":513329,\"areaType\":2,\"name\":\"新龙县\",\"parentAreaId\":513300},{\"areaId\":513330,\"areaType\":2,\"name\":\"德格县\",\"parentAreaId\":513300},{\"areaId\":513331,\"areaType\":2,\"name\":\"白玉县\",\"parentAreaId\":513300},{\"areaId\":513332,\"areaType\":2,\"name\":\"石渠县\",\"parentAreaId\":513300},{\"areaId\":513333,\"areaType\":2,\"name\":\"色达县\",\"parentAreaId\":513300},{\"areaId\":513334,\"areaType\":2,\"name\":\"理塘县\",\"parentAreaId\":513300},{\"areaId\":513335,\"areaType\":2,\"name\":\"巴塘县\",\"parentAreaId\":513300},{\"areaId\":513336,\"areaType\":2,\"name\":\"乡城县\",\"parentAreaId\":513300},{\"areaId\":513337,\"areaType\":2,\"name\":\"稻城县\",\"parentAreaId\":513300},{\"areaId\":513338,\"areaType\":2,\"name\":\"得荣县\",\"parentAreaId\":513300}],\"name\":\"甘孜藏族自治州\",\"parentAreaId\":510000},{\"areaId\":513400,\"areaType\":1,\"children\":[{\"areaId\":513401,\"areaType\":2,\"name\":\"西昌市\",\"parentAreaId\":513400},{\"areaId\":513422,\"areaType\":2,\"name\":\"木里藏族自治县\",\"parentAreaId\":513400},{\"areaId\":513423,\"areaType\":2,\"name\":\"盐源县\",\"parentAreaId\":513400},{\"areaId\":513424,\"areaType\":2,\"name\":\"德昌县\",\"parentAreaId\":513400},{\"areaId\":513425,\"areaType\":2,\"name\":\"会理县\",\"parentAreaId\":513400},{\"areaId\":513426,\"areaType\":2,\"name\":\"会东县\",\"parentAreaId\":513400},{\"areaId\":513427,\"areaType\":2,\"name\":\"宁南县\",\"parentAreaId\":513400},{\"areaId\":513428,\"areaType\":2,\"name\":\"普格县\",\"parentAreaId\":513400},{\"areaId\":513429,\"areaType\":2,\"name\":\"布拖县\",\"parentAreaId\":513400},{\"areaId\":513430,\"areaType\":2,\"name\":\"金阳县\",\"parentAreaId\":513400},{\"areaId\":513431,\"areaType\":2,\"name\":\"昭觉县\",\"parentAreaId\":513400},{\"areaId\":513432,\"areaType\":2,\"name\":\"喜德县\",\"parentAreaId\":513400},{\"areaId\":513433,\"areaType\":2,\"name\":\"冕宁县\",\"parentAreaId\":513400},{\"areaId\":513434,\"areaType\":2,\"name\":\"越西县\",\"parentAreaId\":513400},{\"areaId\":513435,\"areaType\":2,\"name\":\"甘洛县\",\"parentAreaId\":513400},{\"areaId\":513436,\"areaType\":2,\"name\":\"美姑县\",\"parentAreaId\":513400},{\"areaId\":513437,\"areaType\":2,\"name\":\"雷波县\",\"parentAreaId\":513400}],\"name\":\"凉山彝族自治州\",\"parentAreaId\":510000}],\"name\":\"四川省\",\"parentAreaId\":0},{\"areaId\":520000,\"areaType\":0,\"children\":[{\"areaId\":520100,\"areaType\":1,\"children\":[{\"areaId\":520102,\"areaType\":2,\"name\":\"南明区\",\"parentAreaId\":520100},{\"areaId\":520103,\"areaType\":2,\"name\":\"云岩区\",\"parentAreaId\":520100},{\"areaId\":520111,\"areaType\":2,\"name\":\"花溪区\",\"parentAreaId\":520100},{\"areaId\":520112,\"areaType\":2,\"name\":\"乌当区\",\"parentAreaId\":520100},{\"areaId\":520113,\"areaType\":2,\"name\":\"白云区\",\"parentAreaId\":520100},{\"areaId\":520115,\"areaType\":2,\"name\":\"观山湖区\",\"parentAreaId\":520100},{\"areaId\":520121,\"areaType\":2,\"name\":\"开阳县\",\"parentAreaId\":520100},{\"areaId\":520122,\"areaType\":2,\"name\":\"息烽县\",\"parentAreaId\":520100},{\"areaId\":520123,\"areaType\":2,\"name\":\"修文县\",\"parentAreaId\":520100},{\"areaId\":520181,\"areaType\":2,\"name\":\"清镇市\",\"parentAreaId\":520100}],\"name\":\"贵阳市\",\"parentAreaId\":520000},{\"areaId\":520200,\"areaType\":1,\"children\":[{\"areaId\":520201,\"areaType\":2,\"name\":\"钟山区\",\"parentAreaId\":520200},{\"areaId\":520203,\"areaType\":2,\"name\":\"六枝特区\",\"parentAreaId\":520200},{\"areaId\":520221,\"areaType\":2,\"name\":\"水城县\",\"parentAreaId\":520200},{\"areaId\":520281,\"areaType\":2,\"name\":\"盘州市\",\"parentAreaId\":520200}],\"name\":\"六盘水市\",\"parentAreaId\":520000},{\"areaId\":520300,\"areaType\":1,\"children\":[{\"areaId\":520302,\"areaType\":2,\"name\":\"红花岗区\",\"parentAreaId\":520300},{\"areaId\":520303,\"areaType\":2,\"name\":\"汇川区\",\"parentAreaId\":520300},{\"areaId\":520304,\"areaType\":2,\"name\":\"播州区\",\"parentAreaId\":520300},{\"areaId\":520322,\"areaType\":2,\"name\":\"桐梓县\",\"parentAreaId\":520300},{\"areaId\":520323,\"areaType\":2,\"name\":\"绥阳县\",\"parentAreaId\":520300},{\"areaId\":520324,\"areaType\":2,\"name\":\"正安县\",\"parentAreaId\":520300},{\"areaId\":520325,\"areaType\":2,\"name\":\"道真仡佬族苗族自治县\",\"parentAreaId\":520300},{\"areaId\":520326,\"areaType\":2,\"name\":\"务川仡佬族苗族自治县\",\"parentAreaId\":520300},{\"areaId\":520327,\"areaType\":2,\"name\":\"凤冈县\",\"parentAreaId\":520300},{\"areaId\":520328,\"areaType\":2,\"name\":\"湄潭县\",\"parentAreaId\":520300},{\"areaId\":520329,\"areaType\":2,\"name\":\"余庆县\",\"parentAreaId\":520300},{\"areaId\":520330,\"areaType\":2,\"name\":\"习水县\",\"parentAreaId\":520300},{\"areaId\":520381,\"areaType\":2,\"name\":\"赤水市\",\"parentAreaId\":520300},{\"areaId\":520382,\"areaType\":2,\"name\":\"仁怀市\",\"parentAreaId\":520300}],\"name\":\"遵义市\",\"parentAreaId\":520000},{\"areaId\":520400,\"areaType\":1,\"children\":[{\"areaId\":520402,\"areaType\":2,\"name\":\"西秀区\",\"parentAreaId\":520400},{\"areaId\":520403,\"areaType\":2,\"name\":\"平坝区\",\"parentAreaId\":520400},{\"areaId\":520422,\"areaType\":2,\"name\":\"普定县\",\"parentAreaId\":520400},{\"areaId\":520423,\"areaType\":2,\"name\":\"镇宁布依族苗族自治县\",\"parentAreaId\":520400},{\"areaId\":520424,\"areaType\":2,\"name\":\"关岭布依族苗族自治县\",\"parentAreaId\":520400},{\"areaId\":520425,\"areaType\":2,\"name\":\"紫云苗族布依族自治县\",\"parentAreaId\":520400}],\"name\":\"安顺市\",\"parentAreaId\":520000},{\"areaId\":520500,\"areaType\":1,\"children\":[{\"areaId\":520502,\"areaType\":2,\"name\":\"七星关区\",\"parentAreaId\":520500},{\"areaId\":520521,\"areaType\":2,\"name\":\"大方县\",\"parentAreaId\":520500},{\"areaId\":520522,\"areaType\":2,\"name\":\"黔西县\",\"parentAreaId\":520500},{\"areaId\":520523,\"areaType\":2,\"name\":\"金沙县\",\"parentAreaId\":520500},{\"areaId\":520524,\"areaType\":2,\"name\":\"织金县\",\"parentAreaId\":520500},{\"areaId\":520525,\"areaType\":2,\"name\":\"纳雍县\",\"parentAreaId\":520500},{\"areaId\":520526,\"areaType\":2,\"name\":\"威宁彝族回族苗族自治县\",\"parentAreaId\":520500},{\"areaId\":520527,\"areaType\":2,\"name\":\"赫章县\",\"parentAreaId\":520500}],\"name\":\"毕节市\",\"parentAreaId\":520000},{\"areaId\":520600,\"areaType\":1,\"children\":[{\"areaId\":520602,\"areaType\":2,\"name\":\"碧江区\",\"parentAreaId\":520600},{\"areaId\":520603,\"areaType\":2,\"name\":\"万山区\",\"parentAreaId\":520600},{\"areaId\":520621,\"areaType\":2,\"name\":\"江口县\",\"parentAreaId\":520600},{\"areaId\":520622,\"areaType\":2,\"name\":\"玉屏侗族自治县\",\"parentAreaId\":520600},{\"areaId\":520623,\"areaType\":2,\"name\":\"石阡县\",\"parentAreaId\":520600},{\"areaId\":520624,\"areaType\":2,\"name\":\"思南县\",\"parentAreaId\":520600},{\"areaId\":520625,\"areaType\":2,\"name\":\"印江土家族苗族自治县\",\"parentAreaId\":520600},{\"areaId\":520626,\"areaType\":2,\"name\":\"德江县\",\"parentAreaId\":520600},{\"areaId\":520627,\"areaType\":2,\"name\":\"沿河土家族自治县\",\"parentAreaId\":520600},{\"areaId\":520628,\"areaType\":2,\"name\":\"松桃苗族自治县\",\"parentAreaId\":520600}],\"name\":\"铜仁市\",\"parentAreaId\":520000},{\"areaId\":522300,\"areaType\":1,\"children\":[{\"areaId\":522301,\"areaType\":2,\"name\":\"兴义市\",\"parentAreaId\":522300},{\"areaId\":522322,\"areaType\":2,\"name\":\"兴仁市\",\"parentAreaId\":522300},{\"areaId\":522323,\"areaType\":2,\"name\":\"普安县\",\"parentAreaId\":522300},{\"areaId\":522324,\"areaType\":2,\"name\":\"晴隆县\",\"parentAreaId\":522300},{\"areaId\":522325,\"areaType\":2,\"name\":\"贞丰县\",\"parentAreaId\":522300},{\"areaId\":522326,\"areaType\":2,\"name\":\"望谟县\",\"parentAreaId\":522300},{\"areaId\":522327,\"areaType\":2,\"name\":\"册亨县\",\"parentAreaId\":522300},{\"areaId\":522328,\"areaType\":2,\"name\":\"安龙县\",\"parentAreaId\":522300}],\"name\":\"黔西南布依族苗族自治州\",\"parentAreaId\":520000},{\"areaId\":522600,\"areaType\":1,\"children\":[{\"areaId\":522601,\"areaType\":2,\"name\":\"凯里市\",\"parentAreaId\":522600},{\"areaId\":522622,\"areaType\":2,\"name\":\"黄平县\",\"parentAreaId\":522600},{\"areaId\":522623,\"areaType\":2,\"name\":\"施秉县\",\"parentAreaId\":522600},{\"areaId\":522624,\"areaType\":2,\"name\":\"三穗县\",\"parentAreaId\":522600},{\"areaId\":522625,\"areaType\":2,\"name\":\"镇远县\",\"parentAreaId\":522600},{\"areaId\":522626,\"areaType\":2,\"name\":\"岑巩县\",\"parentAreaId\":522600},{\"areaId\":522627,\"areaType\":2,\"name\":\"天柱县\",\"parentAreaId\":522600},{\"areaId\":522628,\"areaType\":2,\"name\":\"锦屏县\",\"parentAreaId\":522600},{\"areaId\":522629,\"areaType\":2,\"name\":\"剑河县\",\"parentAreaId\":522600},{\"areaId\":522630,\"areaType\":2,\"name\":\"台江县\",\"parentAreaId\":522600},{\"areaId\":522631,\"areaType\":2,\"name\":\"黎平县\",\"parentAreaId\":522600},{\"areaId\":522632,\"areaType\":2,\"name\":\"榕江县\",\"parentAreaId\":522600},{\"areaId\":522633,\"areaType\":2,\"name\":\"从江县\",\"parentAreaId\":522600},{\"areaId\":522634,\"areaType\":2,\"name\":\"雷山县\",\"parentAreaId\":522600},{\"areaId\":522635,\"areaType\":2,\"name\":\"麻江县\",\"parentAreaId\":522600},{\"areaId\":522636,\"areaType\":2,\"name\":\"丹寨县\",\"parentAreaId\":522600}],\"name\":\"黔东南苗族侗族自治州\",\"parentAreaId\":520000},{\"areaId\":522700,\"areaType\":1,\"children\":[{\"areaId\":522701,\"areaType\":2,\"name\":\"都匀市\",\"parentAreaId\":522700},{\"areaId\":522702,\"areaType\":2,\"name\":\"福泉市\",\"parentAreaId\":522700},{\"areaId\":522722,\"areaType\":2,\"name\":\"荔波县\",\"parentAreaId\":522700},{\"areaId\":522723,\"areaType\":2,\"name\":\"贵定县\",\"parentAreaId\":522700},{\"areaId\":522725,\"areaType\":2,\"name\":\"瓮安县\",\"parentAreaId\":522700},{\"areaId\":522726,\"areaType\":2,\"name\":\"独山县\",\"parentAreaId\":522700},{\"areaId\":522727,\"areaType\":2,\"name\":\"平塘县\",\"parentAreaId\":522700},{\"areaId\":522728,\"areaType\":2,\"name\":\"罗甸县\",\"parentAreaId\":522700},{\"areaId\":522729,\"areaType\":2,\"name\":\"长顺县\",\"parentAreaId\":522700},{\"areaId\":522730,\"areaType\":2,\"name\":\"龙里县\",\"parentAreaId\":522700},{\"areaId\":522731,\"areaType\":2,\"name\":\"惠水县\",\"parentAreaId\":522700},{\"areaId\":522732,\"areaType\":2,\"name\":\"三都水族自治县\",\"parentAreaId\":522700}],\"name\":\"黔南布依族苗族自治州\",\"parentAreaId\":520000}],\"name\":\"贵州省\",\"parentAreaId\":0},{\"areaId\":530000,\"areaType\":0,\"children\":[{\"areaId\":530100,\"areaType\":1,\"children\":[{\"areaId\":530102,\"areaType\":2,\"name\":\"五华区\",\"parentAreaId\":530100},{\"areaId\":530103,\"areaType\":2,\"name\":\"盘龙区\",\"parentAreaId\":530100},{\"areaId\":530111,\"areaType\":2,\"name\":\"官渡区\",\"parentAreaId\":530100},{\"areaId\":530112,\"areaType\":2,\"name\":\"西山区\",\"parentAreaId\":530100},{\"areaId\":530113,\"areaType\":2,\"name\":\"东川区\",\"parentAreaId\":530100},{\"areaId\":530114,\"areaType\":2,\"name\":\"呈贡区\",\"parentAreaId\":530100},{\"areaId\":530115,\"areaType\":2,\"name\":\"晋宁区\",\"parentAreaId\":530100},{\"areaId\":530124,\"areaType\":2,\"name\":\"富民县\",\"parentAreaId\":530100},{\"areaId\":530125,\"areaType\":2,\"name\":\"宜良县\",\"parentAreaId\":530100},{\"areaId\":530126,\"areaType\":2,\"name\":\"石林彝族自治县\",\"parentAreaId\":530100},{\"areaId\":530127,\"areaType\":2,\"name\":\"嵩明县\",\"parentAreaId\":530100},{\"areaId\":530128,\"areaType\":2,\"name\":\"禄劝彝族苗族自治县\",\"parentAreaId\":530100},{\"areaId\":530129,\"areaType\":2,\"name\":\"寻甸回族彝族自治县\",\"parentAreaId\":530100},{\"areaId\":530181,\"areaType\":2,\"name\":\"安宁市\",\"parentAreaId\":530100}],\"name\":\"昆明市\",\"parentAreaId\":530000},{\"areaId\":530300,\"areaType\":1,\"children\":[{\"areaId\":530302,\"areaType\":2,\"name\":\"麒麟区\",\"parentAreaId\":530300},{\"areaId\":530303,\"areaType\":2,\"name\":\"沾益区\",\"parentAreaId\":530300},{\"areaId\":530304,\"areaType\":2,\"name\":\"马龙区\",\"parentAreaId\":530300},{\"areaId\":530322,\"areaType\":2,\"name\":\"陆良县\",\"parentAreaId\":530300},{\"areaId\":530323,\"areaType\":2,\"name\":\"师宗县\",\"parentAreaId\":530300},{\"areaId\":530324,\"areaType\":2,\"name\":\"罗平县\",\"parentAreaId\":530300},{\"areaId\":530325,\"areaType\":2,\"name\":\"富源县\",\"parentAreaId\":530300},{\"areaId\":530326,\"areaType\":2,\"name\":\"会泽县\",\"parentAreaId\":530300},{\"areaId\":530381,\"areaType\":2,\"name\":\"宣威市\",\"parentAreaId\":530300}],\"name\":\"曲靖市\",\"parentAreaId\":530000},{\"areaId\":530400,\"areaType\":1,\"children\":[{\"areaId\":530402,\"areaType\":2,\"name\":\"红塔区\",\"parentAreaId\":530400},{\"areaId\":530403,\"areaType\":2,\"name\":\"江川区\",\"parentAreaId\":530400},{\"areaId\":530422,\"areaType\":2,\"name\":\"澄江县\",\"parentAreaId\":530400},{\"areaId\":530423,\"areaType\":2,\"name\":\"通海县\",\"parentAreaId\":530400},{\"areaId\":530424,\"areaType\":2,\"name\":\"华宁县\",\"parentAreaId\":530400},{\"areaId\":530425,\"areaType\":2,\"name\":\"易门县\",\"parentAreaId\":530400},{\"areaId\":530426,\"areaType\":2,\"name\":\"峨山彝族自治县\",\"parentAreaId\":530400},{\"areaId\":530427,\"areaType\":2,\"name\":\"新平彝族傣族自治县\",\"parentAreaId\":530400},{\"areaId\":530428,\"areaType\":2,\"name\":\"元江县\",\"parentAreaId\":530400}],\"name\":\"玉溪市\",\"parentAreaId\":530000},{\"areaId\":530500,\"areaType\":1,\"children\":[{\"areaId\":530502,\"areaType\":2,\"name\":\"隆阳区\",\"parentAreaId\":530500},{\"areaId\":530521,\"areaType\":2,\"name\":\"施甸县\",\"parentAreaId\":530500},{\"areaId\":530523,\"areaType\":2,\"name\":\"龙陵县\",\"parentAreaId\":530500},{\"areaId\":530524,\"areaType\":2,\"name\":\"昌宁县\",\"parentAreaId\":530500},{\"areaId\":530581,\"areaType\":2,\"name\":\"腾冲市\",\"parentAreaId\":530500}],\"name\":\"保山市\",\"parentAreaId\":530000},{\"areaId\":530600,\"areaType\":1,\"children\":[{\"areaId\":530602,\"areaType\":2,\"name\":\"昭阳区\",\"parentAreaId\":530600},{\"areaId\":530621,\"areaType\":2,\"name\":\"鲁甸县\",\"parentAreaId\":530600},{\"areaId\":530622,\"areaType\":2,\"name\":\"巧家县\",\"parentAreaId\":530600},{\"areaId\":530623,\"areaType\":2,\"name\":\"盐津县\",\"parentAreaId\":530600},{\"areaId\":530624,\"areaType\":2,\"name\":\"大关县\",\"parentAreaId\":530600},{\"areaId\":530625,\"areaType\":2,\"name\":\"永善县\",\"parentAreaId\":530600},{\"areaId\":530626,\"areaType\":2,\"name\":\"绥江县\",\"parentAreaId\":530600},{\"areaId\":530627,\"areaType\":2,\"name\":\"镇雄县\",\"parentAreaId\":530600},{\"areaId\":530628,\"areaType\":2,\"name\":\"彝良县\",\"parentAreaId\":530600},{\"areaId\":530629,\"areaType\":2,\"name\":\"威信县\",\"parentAreaId\":530600},{\"areaId\":530630,\"areaType\":2,\"name\":\"水富县\",\"parentAreaId\":530600}],\"name\":\"昭通市\",\"parentAreaId\":530000},{\"areaId\":530700,\"areaType\":1,\"children\":[{\"areaId\":530702,\"areaType\":2,\"name\":\"古城区\",\"parentAreaId\":530700},{\"areaId\":530721,\"areaType\":2,\"name\":\"玉龙纳西族自治县\",\"parentAreaId\":530700},{\"areaId\":530722,\"areaType\":2,\"name\":\"永胜县\",\"parentAreaId\":530700},{\"areaId\":530723,\"areaType\":2,\"name\":\"华坪县\",\"parentAreaId\":530700},{\"areaId\":530724,\"areaType\":2,\"name\":\"宁蒗彝族自治县\",\"parentAreaId\":530700}],\"name\":\"丽江市\",\"parentAreaId\":530000},{\"areaId\":530800,\"areaType\":1,\"children\":[{\"areaId\":530802,\"areaType\":2,\"name\":\"思茅区\",\"parentAreaId\":530800},{\"areaId\":530821,\"areaType\":2,\"name\":\"宁洱哈尼族彝族自治县\",\"parentAreaId\":530800},{\"areaId\":530822,\"areaType\":2,\"name\":\"墨江哈尼族自治县\",\"parentAreaId\":530800},{\"areaId\":530823,\"areaType\":2,\"name\":\"景东彝族自治县\",\"parentAreaId\":530800},{\"areaId\":530824,\"areaType\":2,\"name\":\"景谷傣族彝族自治县\",\"parentAreaId\":530800},{\"areaId\":530825,\"areaType\":2,\"name\":\"镇沅县\",\"parentAreaId\":530800},{\"areaId\":530826,\"areaType\":2,\"name\":\"江城哈尼族彝族自治县\",\"parentAreaId\":530800},{\"areaId\":530827,\"areaType\":2,\"name\":\"孟连县\",\"parentAreaId\":530800},{\"areaId\":530828,\"areaType\":2,\"name\":\"澜沧拉祜族自治县\",\"parentAreaId\":530800},{\"areaId\":530829,\"areaType\":2,\"name\":\"西盟佤族自治县\",\"parentAreaId\":530800}],\"name\":\"普洱市\",\"parentAreaId\":530000},{\"areaId\":530900,\"areaType\":1,\"children\":[{\"areaId\":530902,\"areaType\":2,\"name\":\"临翔区\",\"parentAreaId\":530900},{\"areaId\":530921,\"areaType\":2,\"name\":\"凤庆县\",\"parentAreaId\":530900},{\"areaId\":530922,\"areaType\":2,\"name\":\"云县\",\"parentAreaId\":530900},{\"areaId\":530923,\"areaType\":2,\"name\":\"永德县\",\"parentAreaId\":530900},{\"areaId\":530924,\"areaType\":2,\"name\":\"镇康县\",\"parentAreaId\":530900},{\"areaId\":530925,\"areaType\":2,\"name\":\"双江县\",\"parentAreaId\":530900},{\"areaId\":530926,\"areaType\":2,\"name\":\"耿马傣族佤族自治县\",\"parentAreaId\":530900},{\"areaId\":530927,\"areaType\":2,\"name\":\"沧源佤族自治县\",\"parentAreaId\":530900}],\"name\":\"临沧市\",\"parentAreaId\":530000},{\"areaId\":532300,\"areaType\":1,\"children\":[{\"areaId\":532301,\"areaType\":2,\"name\":\"楚雄市\",\"parentAreaId\":532300},{\"areaId\":532322,\"areaType\":2,\"name\":\"双柏县\",\"parentAreaId\":532300},{\"areaId\":532323,\"areaType\":2,\"name\":\"牟定县\",\"parentAreaId\":532300},{\"areaId\":532324,\"areaType\":2,\"name\":\"南华县\",\"parentAreaId\":532300},{\"areaId\":532325,\"areaType\":2,\"name\":\"姚安县\",\"parentAreaId\":532300},{\"areaId\":532326,\"areaType\":2,\"name\":\"大姚县\",\"parentAreaId\":532300},{\"areaId\":532327,\"areaType\":2,\"name\":\"永仁县\",\"parentAreaId\":532300},{\"areaId\":532328,\"areaType\":2,\"name\":\"元谋县\",\"parentAreaId\":532300},{\"areaId\":532329,\"areaType\":2,\"name\":\"武定县\",\"parentAreaId\":532300},{\"areaId\":532331,\"areaType\":2,\"name\":\"禄丰县\",\"parentAreaId\":532300}],\"name\":\"楚雄彝族自治州\",\"parentAreaId\":530000},{\"areaId\":532500,\"areaType\":1,\"children\":[{\"areaId\":532501,\"areaType\":2,\"name\":\"个旧市\",\"parentAreaId\":532500},{\"areaId\":532502,\"areaType\":2,\"name\":\"开远市\",\"parentAreaId\":532500},{\"areaId\":532503,\"areaType\":2,\"name\":\"蒙自市\",\"parentAreaId\":532500},{\"areaId\":532504,\"areaType\":2,\"name\":\"弥勒市\",\"parentAreaId\":532500},{\"areaId\":532523,\"areaType\":2,\"name\":\"屏边苗族自治县\",\"parentAreaId\":532500},{\"areaId\":532524,\"areaType\":2,\"name\":\"建水县\",\"parentAreaId\":532500},{\"areaId\":532525,\"areaType\":2,\"name\":\"石屏县\",\"parentAreaId\":532500},{\"areaId\":532527,\"areaType\":2,\"name\":\"泸西县\",\"parentAreaId\":532500},{\"areaId\":532528,\"areaType\":2,\"name\":\"元阳县\",\"parentAreaId\":532500},{\"areaId\":532529,\"areaType\":2,\"name\":\"红河县\",\"parentAreaId\":532500},{\"areaId\":532530,\"areaType\":2,\"name\":\"金平苗族瑶族傣族自治县\",\"parentAreaId\":532500},{\"areaId\":532531,\"areaType\":2,\"name\":\"绿春县\",\"parentAreaId\":532500},{\"areaId\":532532,\"areaType\":2,\"name\":\"河口瑶族自治县\",\"parentAreaId\":532500}],\"name\":\"红河哈尼族彝族自治州\",\"parentAreaId\":530000},{\"areaId\":532600,\"areaType\":1,\"children\":[{\"areaId\":532601,\"areaType\":2,\"name\":\"文山市\",\"parentAreaId\":532600},{\"areaId\":532622,\"areaType\":2,\"name\":\"砚山县\",\"parentAreaId\":532600},{\"areaId\":532623,\"areaType\":2,\"name\":\"西畴县\",\"parentAreaId\":532600},{\"areaId\":532624,\"areaType\":2,\"name\":\"麻栗坡县\",\"parentAreaId\":532600},{\"areaId\":532625,\"areaType\":2,\"name\":\"马关县\",\"parentAreaId\":532600},{\"areaId\":532626,\"areaType\":2,\"name\":\"丘北县\",\"parentAreaId\":532600},{\"areaId\":532627,\"areaType\":2,\"name\":\"广南县\",\"parentAreaId\":532600},{\"areaId\":532628,\"areaType\":2,\"name\":\"富宁县\",\"parentAreaId\":532600}],\"name\":\"文山壮族苗族自治州\",\"parentAreaId\":530000},{\"areaId\":532800,\"areaType\":1,\"children\":[{\"areaId\":532801,\"areaType\":2,\"name\":\"景洪市\",\"parentAreaId\":532800},{\"areaId\":532822,\"areaType\":2,\"name\":\"勐海县\",\"parentAreaId\":532800},{\"areaId\":532823,\"areaType\":2,\"name\":\"勐腊县\",\"parentAreaId\":532800}],\"name\":\"西双版纳傣族自治州\",\"parentAreaId\":530000},{\"areaId\":532900,\"areaType\":1,\"children\":[{\"areaId\":532901,\"areaType\":2,\"name\":\"大理市\",\"parentAreaId\":532900},{\"areaId\":532922,\"areaType\":2,\"name\":\"漾濞彝族自治县\",\"parentAreaId\":532900},{\"areaId\":532923,\"areaType\":2,\"name\":\"祥云县\",\"parentAreaId\":532900},{\"areaId\":532924,\"areaType\":2,\"name\":\"宾川县\",\"parentAreaId\":532900},{\"areaId\":532925,\"areaType\":2,\"name\":\"弥渡县\",\"parentAreaId\":532900},{\"areaId\":532926,\"areaType\":2,\"name\":\"南涧彝族自治县\",\"parentAreaId\":532900},{\"areaId\":532927,\"areaType\":2,\"name\":\"巍山彝族回族自治县\",\"parentAreaId\":532900},{\"areaId\":532928,\"areaType\":2,\"name\":\"永平县\",\"parentAreaId\":532900},{\"areaId\":532929,\"areaType\":2,\"name\":\"云龙县\",\"parentAreaId\":532900},{\"areaId\":532930,\"areaType\":2,\"name\":\"洱源县\",\"parentAreaId\":532900},{\"areaId\":532931,\"areaType\":2,\"name\":\"剑川县\",\"parentAreaId\":532900},{\"areaId\":532932,\"areaType\":2,\"name\":\"鹤庆县\",\"parentAreaId\":532900}],\"name\":\"大理白族自治州\",\"parentAreaId\":530000},{\"areaId\":533100,\"areaType\":1,\"children\":[{\"areaId\":533102,\"areaType\":2,\"name\":\"瑞丽市\",\"parentAreaId\":533100},{\"areaId\":533103,\"areaType\":2,\"name\":\"芒市\",\"parentAreaId\":533100},{\"areaId\":533122,\"areaType\":2,\"name\":\"梁河县\",\"parentAreaId\":533100},{\"areaId\":533123,\"areaType\":2,\"name\":\"盈江县\",\"parentAreaId\":533100},{\"areaId\":533124,\"areaType\":2,\"name\":\"陇川县\",\"parentAreaId\":533100}],\"name\":\"德宏傣族景颇族自治州\",\"parentAreaId\":530000},{\"areaId\":533300,\"areaType\":1,\"children\":[{\"areaId\":533301,\"areaType\":2,\"name\":\"泸水市\",\"parentAreaId\":533300},{\"areaId\":533323,\"areaType\":2,\"name\":\"福贡县\",\"parentAreaId\":533300},{\"areaId\":533324,\"areaType\":2,\"name\":\"贡山独龙族怒族自治县\",\"parentAreaId\":533300},{\"areaId\":533325,\"areaType\":2,\"name\":\"兰坪白族普米族自治县\",\"parentAreaId\":533300}],\"name\":\"怒江傈僳族自治州\",\"parentAreaId\":530000},{\"areaId\":533400,\"areaType\":1,\"children\":[{\"areaId\":533401,\"areaType\":2,\"name\":\"香格里拉市\",\"parentAreaId\":533400},{\"areaId\":533422,\"areaType\":2,\"name\":\"德钦县\",\"parentAreaId\":533400},{\"areaId\":533423,\"areaType\":2,\"name\":\"维西傈僳族自治县\",\"parentAreaId\":533400}],\"name\":\"迪庆藏族自治州\",\"parentAreaId\":530000}],\"name\":\"云南省\",\"parentAreaId\":0},{\"areaId\":540000,\"areaType\":0,\"children\":[{\"areaId\":540100,\"areaType\":1,\"children\":[{\"areaId\":540102,\"areaType\":2,\"name\":\"城关区\",\"parentAreaId\":540100},{\"areaId\":540103,\"areaType\":2,\"name\":\"堆龙德庆区\",\"parentAreaId\":540100},{\"areaId\":540104,\"areaType\":2,\"name\":\"达孜区\",\"parentAreaId\":540100},{\"areaId\":540121,\"areaType\":2,\"name\":\"林周县\",\"parentAreaId\":540100},{\"areaId\":540122,\"areaType\":2,\"name\":\"当雄县\",\"parentAreaId\":540100},{\"areaId\":540123,\"areaType\":2,\"name\":\"尼木县\",\"parentAreaId\":540100},{\"areaId\":540124,\"areaType\":2,\"name\":\"曲水县\",\"parentAreaId\":540100},{\"areaId\":540127,\"areaType\":2,\"name\":\"墨竹工卡县\",\"parentAreaId\":540100}],\"name\":\"拉萨市\",\"parentAreaId\":540000},{\"areaId\":540200,\"areaType\":1,\"children\":[{\"areaId\":540202,\"areaType\":2,\"name\":\"桑珠孜区\",\"parentAreaId\":540200},{\"areaId\":540221,\"areaType\":2,\"name\":\"南木林县\",\"parentAreaId\":540200},{\"areaId\":540222,\"areaType\":2,\"name\":\"江孜县\",\"parentAreaId\":540200},{\"areaId\":540223,\"areaType\":2,\"name\":\"定日县\",\"parentAreaId\":540200},{\"areaId\":540224,\"areaType\":2,\"name\":\"萨迦县\",\"parentAreaId\":540200},{\"areaId\":540225,\"areaType\":2,\"name\":\"拉孜县\",\"parentAreaId\":540200},{\"areaId\":540226,\"areaType\":2,\"name\":\"昂仁县\",\"parentAreaId\":540200},{\"areaId\":540227,\"areaType\":2,\"name\":\"谢通门县\",\"parentAreaId\":540200},{\"areaId\":540228,\"areaType\":2,\"name\":\"白朗县\",\"parentAreaId\":540200},{\"areaId\":540229,\"areaType\":2,\"name\":\"仁布县\",\"parentAreaId\":540200},{\"areaId\":540230,\"areaType\":2,\"name\":\"康马县\",\"parentAreaId\":540200},{\"areaId\":540231,\"areaType\":2,\"name\":\"定结县\",\"parentAreaId\":540200},{\"areaId\":540232,\"areaType\":2,\"name\":\"仲巴县\",\"parentAreaId\":540200},{\"areaId\":540233,\"areaType\":2,\"name\":\"亚东县\",\"parentAreaId\":540200},{\"areaId\":540234,\"areaType\":2,\"name\":\"吉隆县\",\"parentAreaId\":540200},{\"areaId\":540235,\"areaType\":2,\"name\":\"聂拉木县\",\"parentAreaId\":540200},{\"areaId\":540236,\"areaType\":2,\"name\":\"萨嘎县\",\"parentAreaId\":540200},{\"areaId\":540237,\"areaType\":2,\"name\":\"岗巴县\",\"parentAreaId\":540200}],\"name\":\"日喀则市\",\"parentAreaId\":540000},{\"areaId\":540300,\"areaType\":1,\"children\":[{\"areaId\":540302,\"areaType\":2,\"name\":\"卡若区\",\"parentAreaId\":540300},{\"areaId\":540321,\"areaType\":2,\"name\":\"江达县\",\"parentAreaId\":540300},{\"areaId\":540322,\"areaType\":2,\"name\":\"贡觉县\",\"parentAreaId\":540300},{\"areaId\":540323,\"areaType\":2,\"name\":\"类乌齐县\",\"parentAreaId\":540300},{\"areaId\":540324,\"areaType\":2,\"name\":\"丁青县\",\"parentAreaId\":540300},{\"areaId\":540325,\"areaType\":2,\"name\":\"察雅县\",\"parentAreaId\":540300},{\"areaId\":540326,\"areaType\":2,\"name\":\"八宿县\",\"parentAreaId\":540300},{\"areaId\":540327,\"areaType\":2,\"name\":\"左贡县\",\"parentAreaId\":540300},{\"areaId\":540328,\"areaType\":2,\"name\":\"芒康县\",\"parentAreaId\":540300},{\"areaId\":540329,\"areaType\":2,\"name\":\"洛隆县\",\"parentAreaId\":540300},{\"areaId\":540330,\"areaType\":2,\"name\":\"边坝县\",\"parentAreaId\":540300}],\"name\":\"昌都市\",\"parentAreaId\":540000},{\"areaId\":540400,\"areaType\":1,\"children\":[{\"areaId\":540402,\"areaType\":2,\"name\":\"巴宜区\",\"parentAreaId\":540400},{\"areaId\":540421,\"areaType\":2,\"name\":\"工布江达县\",\"parentAreaId\":540400},{\"areaId\":540422,\"areaType\":2,\"name\":\"米林县\",\"parentAreaId\":540400},{\"areaId\":540423,\"areaType\":2,\"name\":\"墨脱县\",\"parentAreaId\":540400},{\"areaId\":540424,\"areaType\":2,\"name\":\"波密县\",\"parentAreaId\":540400},{\"areaId\":540425,\"areaType\":2,\"name\":\"察隅县\",\"parentAreaId\":540400},{\"areaId\":540426,\"areaType\":2,\"name\":\"朗县\",\"parentAreaId\":540400}],\"name\":\"林芝市\",\"parentAreaId\":540000},{\"areaId\":540500,\"areaType\":1,\"children\":[{\"areaId\":540502,\"areaType\":2,\"name\":\"乃东区\",\"parentAreaId\":540500},{\"areaId\":540521,\"areaType\":2,\"name\":\"扎囊县\",\"parentAreaId\":540500},{\"areaId\":540522,\"areaType\":2,\"name\":\"贡嘎县\",\"parentAreaId\":540500},{\"areaId\":540523,\"areaType\":2,\"name\":\"桑日县\",\"parentAreaId\":540500},{\"areaId\":540524,\"areaType\":2,\"name\":\"琼结县\",\"parentAreaId\":540500},{\"areaId\":540525,\"areaType\":2,\"name\":\"曲松县\",\"parentAreaId\":540500},{\"areaId\":540526,\"areaType\":2,\"name\":\"措美县\",\"parentAreaId\":540500},{\"areaId\":540527,\"areaType\":2,\"name\":\"洛扎县\",\"parentAreaId\":540500},{\"areaId\":540528,\"areaType\":2,\"name\":\"加查县\",\"parentAreaId\":540500},{\"areaId\":540529,\"areaType\":2,\"name\":\"隆子县\",\"parentAreaId\":540500},{\"areaId\":540530,\"areaType\":2,\"name\":\"错那县\",\"parentAreaId\":540500},{\"areaId\":540531,\"areaType\":2,\"name\":\"浪卡子县\",\"parentAreaId\":540500}],\"name\":\"山南市\",\"parentAreaId\":540000},{\"areaId\":540600,\"areaType\":1,\"children\":[{\"areaId\":540602,\"areaType\":2,\"name\":\"色尼区\",\"parentAreaId\":540600},{\"areaId\":540621,\"areaType\":2,\"name\":\"嘉黎县\",\"parentAreaId\":540600},{\"areaId\":540622,\"areaType\":2,\"name\":\"比如县\",\"parentAreaId\":540600},{\"areaId\":540623,\"areaType\":2,\"name\":\"聂荣县\",\"parentAreaId\":540600},{\"areaId\":540624,\"areaType\":2,\"name\":\"安多县\",\"parentAreaId\":540600},{\"areaId\":540625,\"areaType\":2,\"name\":\"申扎县\",\"parentAreaId\":540600},{\"areaId\":540626,\"areaType\":2,\"name\":\"索县\",\"parentAreaId\":540600},{\"areaId\":540627,\"areaType\":2,\"name\":\"班戈县\",\"parentAreaId\":540600},{\"areaId\":540628,\"areaType\":2,\"name\":\"巴青县\",\"parentAreaId\":540600},{\"areaId\":540629,\"areaType\":2,\"name\":\"尼玛县\",\"parentAreaId\":540600},{\"areaId\":540630,\"areaType\":2,\"name\":\"双湖县\",\"parentAreaId\":540600}],\"name\":\"那曲市\",\"parentAreaId\":540000},{\"areaId\":542500,\"areaType\":1,\"children\":[{\"areaId\":542521,\"areaType\":2,\"name\":\"普兰县\",\"parentAreaId\":542500},{\"areaId\":542522,\"areaType\":2,\"name\":\"札达县\",\"parentAreaId\":542500},{\"areaId\":542523,\"areaType\":2,\"name\":\"噶尔县\",\"parentAreaId\":542500},{\"areaId\":542524,\"areaType\":2,\"name\":\"日土县\",\"parentAreaId\":542500},{\"areaId\":542525,\"areaType\":2,\"name\":\"革吉县\",\"parentAreaId\":542500},{\"areaId\":542526,\"areaType\":2,\"name\":\"改则县\",\"parentAreaId\":542500},{\"areaId\":542527,\"areaType\":2,\"name\":\"措勤县\",\"parentAreaId\":542500}],\"name\":\"阿里地区\",\"parentAreaId\":540000}],\"name\":\"西藏自治区\",\"parentAreaId\":0},{\"areaId\":610000,\"areaType\":0,\"children\":[{\"areaId\":610100,\"areaType\":1,\"children\":[{\"areaId\":610102,\"areaType\":2,\"name\":\"新城区\",\"parentAreaId\":610100},{\"areaId\":610103,\"areaType\":2,\"name\":\"碑林区\",\"parentAreaId\":610100},{\"areaId\":610104,\"areaType\":2,\"name\":\"莲湖区\",\"parentAreaId\":610100},{\"areaId\":610111,\"areaType\":2,\"name\":\"灞桥区\",\"parentAreaId\":610100},{\"areaId\":610112,\"areaType\":2,\"name\":\"未央区\",\"parentAreaId\":610100},{\"areaId\":610113,\"areaType\":2,\"name\":\"雁塔区\",\"parentAreaId\":610100},{\"areaId\":610114,\"areaType\":2,\"name\":\"阎良区\",\"parentAreaId\":610100},{\"areaId\":610115,\"areaType\":2,\"name\":\"临潼区\",\"parentAreaId\":610100},{\"areaId\":610116,\"areaType\":2,\"name\":\"长安区\",\"parentAreaId\":610100},{\"areaId\":610117,\"areaType\":2,\"name\":\"高陵区\",\"parentAreaId\":610100},{\"areaId\":610118,\"areaType\":2,\"name\":\"鄠邑区\",\"parentAreaId\":610100},{\"areaId\":610122,\"areaType\":2,\"name\":\"蓝田县\",\"parentAreaId\":610100},{\"areaId\":610124,\"areaType\":2,\"name\":\"周至县\",\"parentAreaId\":610100}],\"name\":\"西安市\",\"parentAreaId\":610000},{\"areaId\":610200,\"areaType\":1,\"children\":[{\"areaId\":610202,\"areaType\":2,\"name\":\"王益区\",\"parentAreaId\":610200},{\"areaId\":610203,\"areaType\":2,\"name\":\"印台区\",\"parentAreaId\":610200},{\"areaId\":610204,\"areaType\":2,\"name\":\"耀州区\",\"parentAreaId\":610200},{\"areaId\":610222,\"areaType\":2,\"name\":\"宜君县\",\"parentAreaId\":610200}],\"name\":\"铜川市\",\"parentAreaId\":610000},{\"areaId\":610300,\"areaType\":1,\"children\":[{\"areaId\":610302,\"areaType\":2,\"name\":\"渭滨区\",\"parentAreaId\":610300},{\"areaId\":610303,\"areaType\":2,\"name\":\"金台区\",\"parentAreaId\":610300},{\"areaId\":610304,\"areaType\":2,\"name\":\"陈仓区\",\"parentAreaId\":610300},{\"areaId\":610322,\"areaType\":2,\"name\":\"凤翔县\",\"parentAreaId\":610300},{\"areaId\":610323,\"areaType\":2,\"name\":\"岐山县\",\"parentAreaId\":610300},{\"areaId\":610324,\"areaType\":2,\"name\":\"扶风县\",\"parentAreaId\":610300},{\"areaId\":610326,\"areaType\":2,\"name\":\"眉县\",\"parentAreaId\":610300},{\"areaId\":610327,\"areaType\":2,\"name\":\"陇县\",\"parentAreaId\":610300},{\"areaId\":610328,\"areaType\":2,\"name\":\"千阳县\",\"parentAreaId\":610300},{\"areaId\":610329,\"areaType\":2,\"name\":\"麟游县\",\"parentAreaId\":610300},{\"areaId\":610330,\"areaType\":2,\"name\":\"凤县\",\"parentAreaId\":610300},{\"areaId\":610331,\"areaType\":2,\"name\":\"太白县\",\"parentAreaId\":610300}],\"name\":\"宝鸡市\",\"parentAreaId\":610000},{\"areaId\":610400,\"areaType\":1,\"children\":[{\"areaId\":610402,\"areaType\":2,\"name\":\"秦都区\",\"parentAreaId\":610400},{\"areaId\":610403,\"areaType\":2,\"name\":\"杨陵区\",\"parentAreaId\":610400},{\"areaId\":610404,\"areaType\":2,\"name\":\"渭城区\",\"parentAreaId\":610400},{\"areaId\":610422,\"areaType\":2,\"name\":\"三原县\",\"parentAreaId\":610400},{\"areaId\":610423,\"areaType\":2,\"name\":\"泾阳县\",\"parentAreaId\":610400},{\"areaId\":610424,\"areaType\":2,\"name\":\"乾县\",\"parentAreaId\":610400},{\"areaId\":610425,\"areaType\":2,\"name\":\"礼泉县\",\"parentAreaId\":610400},{\"areaId\":610426,\"areaType\":2,\"name\":\"永寿县\",\"parentAreaId\":610400},{\"areaId\":610428,\"areaType\":2,\"name\":\"长武县\",\"parentAreaId\":610400},{\"areaId\":610429,\"areaType\":2,\"name\":\"旬邑县\",\"parentAreaId\":610400},{\"areaId\":610430,\"areaType\":2,\"name\":\"淳化县\",\"parentAreaId\":610400},{\"areaId\":610431,\"areaType\":2,\"name\":\"武功县\",\"parentAreaId\":610400},{\"areaId\":610481,\"areaType\":2,\"name\":\"兴平市\",\"parentAreaId\":610400},{\"areaId\":610482,\"areaType\":2,\"name\":\"彬州市\",\"parentAreaId\":610400}],\"name\":\"咸阳市\",\"parentAreaId\":610000},{\"areaId\":610500,\"areaType\":1,\"children\":[{\"areaId\":610502,\"areaType\":2,\"name\":\"临渭区\",\"parentAreaId\":610500},{\"areaId\":610503,\"areaType\":2,\"name\":\"华州区\",\"parentAreaId\":610500},{\"areaId\":610522,\"areaType\":2,\"name\":\"潼关县\",\"parentAreaId\":610500},{\"areaId\":610523,\"areaType\":2,\"name\":\"大荔县\",\"parentAreaId\":610500},{\"areaId\":610524,\"areaType\":2,\"name\":\"合阳县\",\"parentAreaId\":610500},{\"areaId\":610525,\"areaType\":2,\"name\":\"澄城县\",\"parentAreaId\":610500},{\"areaId\":610526,\"areaType\":2,\"name\":\"蒲城县\",\"parentAreaId\":610500},{\"areaId\":610527,\"areaType\":2,\"name\":\"白水县\",\"parentAreaId\":610500},{\"areaId\":610528,\"areaType\":2,\"name\":\"富平县\",\"parentAreaId\":610500},{\"areaId\":610581,\"areaType\":2,\"name\":\"韩城市\",\"parentAreaId\":610500},{\"areaId\":610582,\"areaType\":2,\"name\":\"华阴市\",\"parentAreaId\":610500}],\"name\":\"渭南市\",\"parentAreaId\":610000},{\"areaId\":610600,\"areaType\":1,\"children\":[{\"areaId\":610602,\"areaType\":2,\"name\":\"宝塔区\",\"parentAreaId\":610600},{\"areaId\":610603,\"areaType\":2,\"name\":\"安塞区\",\"parentAreaId\":610600},{\"areaId\":610621,\"areaType\":2,\"name\":\"延长县\",\"parentAreaId\":610600},{\"areaId\":610622,\"areaType\":2,\"name\":\"延川县\",\"parentAreaId\":610600},{\"areaId\":610623,\"areaType\":2,\"name\":\"子长县\",\"parentAreaId\":610600},{\"areaId\":610625,\"areaType\":2,\"name\":\"志丹县\",\"parentAreaId\":610600},{\"areaId\":610626,\"areaType\":2,\"name\":\"吴起县\",\"parentAreaId\":610600},{\"areaId\":610627,\"areaType\":2,\"name\":\"甘泉县\",\"parentAreaId\":610600},{\"areaId\":610628,\"areaType\":2,\"name\":\"富县\",\"parentAreaId\":610600},{\"areaId\":610629,\"areaType\":2,\"name\":\"洛川县\",\"parentAreaId\":610600},{\"areaId\":610630,\"areaType\":2,\"name\":\"宜川县\",\"parentAreaId\":610600},{\"areaId\":610631,\"areaType\":2,\"name\":\"黄龙县\",\"parentAreaId\":610600},{\"areaId\":610632,\"areaType\":2,\"name\":\"黄陵县\",\"parentAreaId\":610600}],\"name\":\"延安市\",\"parentAreaId\":610000},{\"areaId\":610700,\"areaType\":1,\"children\":[{\"areaId\":610702,\"areaType\":2,\"name\":\"汉台区\",\"parentAreaId\":610700},{\"areaId\":610703,\"areaType\":2,\"name\":\"南郑区\",\"parentAreaId\":610700},{\"areaId\":610722,\"areaType\":2,\"name\":\"城固县\",\"parentAreaId\":610700},{\"areaId\":610723,\"areaType\":2,\"name\":\"洋县\",\"parentAreaId\":610700},{\"areaId\":610724,\"areaType\":2,\"name\":\"西乡县\",\"parentAreaId\":610700},{\"areaId\":610725,\"areaType\":2,\"name\":\"勉县\",\"parentAreaId\":610700},{\"areaId\":610726,\"areaType\":2,\"name\":\"宁强县\",\"parentAreaId\":610700},{\"areaId\":610727,\"areaType\":2,\"name\":\"略阳县\",\"parentAreaId\":610700},{\"areaId\":610728,\"areaType\":2,\"name\":\"镇巴县\",\"parentAreaId\":610700},{\"areaId\":610729,\"areaType\":2,\"name\":\"留坝县\",\"parentAreaId\":610700},{\"areaId\":610730,\"areaType\":2,\"name\":\"佛坪县\",\"parentAreaId\":610700}],\"name\":\"汉中市\",\"parentAreaId\":610000},{\"areaId\":610800,\"areaType\":1,\"children\":[{\"areaId\":610802,\"areaType\":2,\"name\":\"榆阳区\",\"parentAreaId\":610800},{\"areaId\":610803,\"areaType\":2,\"name\":\"横山区\",\"parentAreaId\":610800},{\"areaId\":610822,\"areaType\":2,\"name\":\"府谷县\",\"parentAreaId\":610800},{\"areaId\":610824,\"areaType\":2,\"name\":\"靖边县\",\"parentAreaId\":610800},{\"areaId\":610825,\"areaType\":2,\"name\":\"定边县\",\"parentAreaId\":610800},{\"areaId\":610826,\"areaType\":2,\"name\":\"绥德县\",\"parentAreaId\":610800},{\"areaId\":610827,\"areaType\":2,\"name\":\"米脂县\",\"parentAreaId\":610800},{\"areaId\":610828,\"areaType\":2,\"name\":\"佳县\",\"parentAreaId\":610800},{\"areaId\":610829,\"areaType\":2,\"name\":\"吴堡县\",\"parentAreaId\":610800},{\"areaId\":610830,\"areaType\":2,\"name\":\"清涧县\",\"parentAreaId\":610800},{\"areaId\":610831,\"areaType\":2,\"name\":\"子洲县\",\"parentAreaId\":610800},{\"areaId\":610881,\"areaType\":2,\"name\":\"神木市\",\"parentAreaId\":610800}],\"name\":\"榆林市\",\"parentAreaId\":610000},{\"areaId\":610900,\"areaType\":1,\"children\":[{\"areaId\":610902,\"areaType\":2,\"name\":\"汉滨区\",\"parentAreaId\":610900},{\"areaId\":610921,\"areaType\":2,\"name\":\"汉阴县\",\"parentAreaId\":610900},{\"areaId\":610922,\"areaType\":2,\"name\":\"石泉县\",\"parentAreaId\":610900},{\"areaId\":610923,\"areaType\":2,\"name\":\"宁陕县\",\"parentAreaId\":610900},{\"areaId\":610924,\"areaType\":2,\"name\":\"紫阳县\",\"parentAreaId\":610900},{\"areaId\":610925,\"areaType\":2,\"name\":\"岚皋县\",\"parentAreaId\":610900},{\"areaId\":610926,\"areaType\":2,\"name\":\"平利县\",\"parentAreaId\":610900},{\"areaId\":610927,\"areaType\":2,\"name\":\"镇坪县\",\"parentAreaId\":610900},{\"areaId\":610928,\"areaType\":2,\"name\":\"旬阳县\",\"parentAreaId\":610900},{\"areaId\":610929,\"areaType\":2,\"name\":\"白河县\",\"parentAreaId\":610900}],\"name\":\"安康市\",\"parentAreaId\":610000},{\"areaId\":611000,\"areaType\":1,\"children\":[{\"areaId\":611002,\"areaType\":2,\"name\":\"商州区\",\"parentAreaId\":611000},{\"areaId\":611021,\"areaType\":2,\"name\":\"洛南县\",\"parentAreaId\":611000},{\"areaId\":611022,\"areaType\":2,\"name\":\"丹凤县\",\"parentAreaId\":611000},{\"areaId\":611023,\"areaType\":2,\"name\":\"商南县\",\"parentAreaId\":611000},{\"areaId\":611024,\"areaType\":2,\"name\":\"山阳县\",\"parentAreaId\":611000},{\"areaId\":611025,\"areaType\":2,\"name\":\"镇安县\",\"parentAreaId\":611000},{\"areaId\":611026,\"areaType\":2,\"name\":\"柞水县\",\"parentAreaId\":611000}],\"name\":\"商洛市\",\"parentAreaId\":610000}],\"name\":\"陕西省\",\"parentAreaId\":0},{\"areaId\":620000,\"areaType\":0,\"children\":[{\"areaId\":620100,\"areaType\":1,\"children\":[{\"areaId\":620102,\"areaType\":2,\"name\":\"城关区\",\"parentAreaId\":620100},{\"areaId\":620103,\"areaType\":2,\"name\":\"七里河区\",\"parentAreaId\":620100},{\"areaId\":620104,\"areaType\":2,\"name\":\"西固区\",\"parentAreaId\":620100},{\"areaId\":620105,\"areaType\":2,\"name\":\"安宁区\",\"parentAreaId\":620100},{\"areaId\":620111,\"areaType\":2,\"name\":\"红古区\",\"parentAreaId\":620100},{\"areaId\":620121,\"areaType\":2,\"name\":\"永登县\",\"parentAreaId\":620100},{\"areaId\":620122,\"areaType\":2,\"name\":\"皋兰县\",\"parentAreaId\":620100},{\"areaId\":620123,\"areaType\":2,\"name\":\"榆中县\",\"parentAreaId\":620100}],\"name\":\"兰州市\",\"parentAreaId\":620000},{\"areaId\":620200,\"areaType\":1,\"children\":[{\"areaId\":620201,\"areaType\":2,\"name\":\"嘉峪关市\",\"parentAreaId\":620200},{\"areaId\":620299,\"areaType\":2,\"name\":\"嘉峪关市\",\"parentAreaId\":620200}],\"name\":\"嘉峪关市\",\"parentAreaId\":620000},{\"areaId\":620300,\"areaType\":1,\"children\":[{\"areaId\":620302,\"areaType\":2,\"name\":\"金川区\",\"parentAreaId\":620300},{\"areaId\":620321,\"areaType\":2,\"name\":\"永昌县\",\"parentAreaId\":620300}],\"name\":\"金昌市\",\"parentAreaId\":620000},{\"areaId\":620400,\"areaType\":1,\"children\":[{\"areaId\":620402,\"areaType\":2,\"name\":\"白银区\",\"parentAreaId\":620400},{\"areaId\":620403,\"areaType\":2,\"name\":\"平川区\",\"parentAreaId\":620400},{\"areaId\":620421,\"areaType\":2,\"name\":\"靖远县\",\"parentAreaId\":620400},{\"areaId\":620422,\"areaType\":2,\"name\":\"会宁县\",\"parentAreaId\":620400},{\"areaId\":620423,\"areaType\":2,\"name\":\"景泰县\",\"parentAreaId\":620400}],\"name\":\"白银市\",\"parentAreaId\":620000},{\"areaId\":620500,\"areaType\":1,\"children\":[{\"areaId\":620502,\"areaType\":2,\"name\":\"秦州区\",\"parentAreaId\":620500},{\"areaId\":620503,\"areaType\":2,\"name\":\"麦积区\",\"parentAreaId\":620500},{\"areaId\":620521,\"areaType\":2,\"name\":\"清水县\",\"parentAreaId\":620500},{\"areaId\":620522,\"areaType\":2,\"name\":\"秦安县\",\"parentAreaId\":620500},{\"areaId\":620523,\"areaType\":2,\"name\":\"甘谷县\",\"parentAreaId\":620500},{\"areaId\":620524,\"areaType\":2,\"name\":\"武山县\",\"parentAreaId\":620500},{\"areaId\":620525,\"areaType\":2,\"name\":\"张家川回族自治县\",\"parentAreaId\":620500}],\"name\":\"天水市\",\"parentAreaId\":620000},{\"areaId\":620600,\"areaType\":1,\"children\":[{\"areaId\":620602,\"areaType\":2,\"name\":\"凉州区\",\"parentAreaId\":620600},{\"areaId\":620621,\"areaType\":2,\"name\":\"民勤县\",\"parentAreaId\":620600},{\"areaId\":620622,\"areaType\":2,\"name\":\"古浪县\",\"parentAreaId\":620600},{\"areaId\":620623,\"areaType\":2,\"name\":\"天祝藏族自治县\",\"parentAreaId\":620600}],\"name\":\"武威市\",\"parentAreaId\":620000},{\"areaId\":620700,\"areaType\":1,\"children\":[{\"areaId\":620702,\"areaType\":2,\"name\":\"甘州区\",\"parentAreaId\":620700},{\"areaId\":620721,\"areaType\":2,\"name\":\"肃南裕固族自治县\",\"parentAreaId\":620700},{\"areaId\":620722,\"areaType\":2,\"name\":\"民乐县\",\"parentAreaId\":620700},{\"areaId\":620723,\"areaType\":2,\"name\":\"临泽县\",\"parentAreaId\":620700},{\"areaId\":620724,\"areaType\":2,\"name\":\"高台县\",\"parentAreaId\":620700},{\"areaId\":620725,\"areaType\":2,\"name\":\"山丹县\",\"parentAreaId\":620700}],\"name\":\"张掖市\",\"parentAreaId\":620000},{\"areaId\":620800,\"areaType\":1,\"children\":[{\"areaId\":620802,\"areaType\":2,\"name\":\"崆峒区\",\"parentAreaId\":620800},{\"areaId\":620821,\"areaType\":2,\"name\":\"泾川县\",\"parentAreaId\":620800},{\"areaId\":620822,\"areaType\":2,\"name\":\"灵台县\",\"parentAreaId\":620800},{\"areaId\":620823,\"areaType\":2,\"name\":\"崇信县\",\"parentAreaId\":620800},{\"areaId\":620824,\"areaType\":2,\"name\":\"华亭县\",\"parentAreaId\":620800},{\"areaId\":620825,\"areaType\":2,\"name\":\"庄浪县\",\"parentAreaId\":620800},{\"areaId\":620826,\"areaType\":2,\"name\":\"静宁县\",\"parentAreaId\":620800}],\"name\":\"平凉市\",\"parentAreaId\":620000},{\"areaId\":620900,\"areaType\":1,\"children\":[{\"areaId\":620902,\"areaType\":2,\"name\":\"肃州区\",\"parentAreaId\":620900},{\"areaId\":620921,\"areaType\":2,\"name\":\"金塔县\",\"parentAreaId\":620900},{\"areaId\":620922,\"areaType\":2,\"name\":\"瓜州县\",\"parentAreaId\":620900},{\"areaId\":620923,\"areaType\":2,\"name\":\"肃北蒙古族自治县\",\"parentAreaId\":620900},{\"areaId\":620924,\"areaType\":2,\"name\":\"阿克塞哈萨克族自治县\",\"parentAreaId\":620900},{\"areaId\":620981,\"areaType\":2,\"name\":\"玉门市\",\"parentAreaId\":620900},{\"areaId\":620982,\"areaType\":2,\"name\":\"敦煌市\",\"parentAreaId\":620900}],\"name\":\"酒泉市\",\"parentAreaId\":620000},{\"areaId\":621000,\"areaType\":1,\"children\":[{\"areaId\":621002,\"areaType\":2,\"name\":\"西峰区\",\"parentAreaId\":621000},{\"areaId\":621021,\"areaType\":2,\"name\":\"庆城县\",\"parentAreaId\":621000},{\"areaId\":621022,\"areaType\":2,\"name\":\"环县\",\"parentAreaId\":621000},{\"areaId\":621023,\"areaType\":2,\"name\":\"华池县\",\"parentAreaId\":621000},{\"areaId\":621024,\"areaType\":2,\"name\":\"合水县\",\"parentAreaId\":621000},{\"areaId\":621025,\"areaType\":2,\"name\":\"正宁县\",\"parentAreaId\":621000},{\"areaId\":621026,\"areaType\":2,\"name\":\"宁县\",\"parentAreaId\":621000},{\"areaId\":621027,\"areaType\":2,\"name\":\"镇原县\",\"parentAreaId\":621000}],\"name\":\"庆阳市\",\"parentAreaId\":620000},{\"areaId\":621100,\"areaType\":1,\"children\":[{\"areaId\":621102,\"areaType\":2,\"name\":\"安定区\",\"parentAreaId\":621100},{\"areaId\":621121,\"areaType\":2,\"name\":\"通渭县\",\"parentAreaId\":621100},{\"areaId\":621122,\"areaType\":2,\"name\":\"陇西县\",\"parentAreaId\":621100},{\"areaId\":621123,\"areaType\":2,\"name\":\"渭源县\",\"parentAreaId\":621100},{\"areaId\":621124,\"areaType\":2,\"name\":\"临洮县\",\"parentAreaId\":621100},{\"areaId\":621125,\"areaType\":2,\"name\":\"漳县\",\"parentAreaId\":621100},{\"areaId\":621126,\"areaType\":2,\"name\":\"岷县\",\"parentAreaId\":621100}],\"name\":\"定西市\",\"parentAreaId\":620000},{\"areaId\":621200,\"areaType\":1,\"children\":[{\"areaId\":621202,\"areaType\":2,\"name\":\"武都区\",\"parentAreaId\":621200},{\"areaId\":621221,\"areaType\":2,\"name\":\"成县\",\"parentAreaId\":621200},{\"areaId\":621222,\"areaType\":2,\"name\":\"文县\",\"parentAreaId\":621200},{\"areaId\":621223,\"areaType\":2,\"name\":\"宕昌县\",\"parentAreaId\":621200},{\"areaId\":621224,\"areaType\":2,\"name\":\"康县\",\"parentAreaId\":621200},{\"areaId\":621225,\"areaType\":2,\"name\":\"西和县\",\"parentAreaId\":621200},{\"areaId\":621226,\"areaType\":2,\"name\":\"礼县\",\"parentAreaId\":621200},{\"areaId\":621227,\"areaType\":2,\"name\":\"徽县\",\"parentAreaId\":621200},{\"areaId\":621228,\"areaType\":2,\"name\":\"两当县\",\"parentAreaId\":621200}],\"name\":\"陇南市\",\"parentAreaId\":620000},{\"areaId\":622900,\"areaType\":1,\"children\":[{\"areaId\":622901,\"areaType\":2,\"name\":\"临夏市\",\"parentAreaId\":622900},{\"areaId\":622921,\"areaType\":2,\"name\":\"临夏县\",\"parentAreaId\":622900},{\"areaId\":622922,\"areaType\":2,\"name\":\"康乐县\",\"parentAreaId\":622900},{\"areaId\":622923,\"areaType\":2,\"name\":\"永靖县\",\"parentAreaId\":622900},{\"areaId\":622924,\"areaType\":2,\"name\":\"广河县\",\"parentAreaId\":622900},{\"areaId\":622925,\"areaType\":2,\"name\":\"和政县\",\"parentAreaId\":622900},{\"areaId\":622926,\"areaType\":2,\"name\":\"东乡族自治县\",\"parentAreaId\":622900},{\"areaId\":622927,\"areaType\":2,\"name\":\"积石山县\",\"parentAreaId\":622900}],\"name\":\"临夏回族自治州\",\"parentAreaId\":620000},{\"areaId\":623000,\"areaType\":1,\"children\":[{\"areaId\":623001,\"areaType\":2,\"name\":\"合作市\",\"parentAreaId\":623000},{\"areaId\":623021,\"areaType\":2,\"name\":\"临潭县\",\"parentAreaId\":623000},{\"areaId\":623022,\"areaType\":2,\"name\":\"卓尼县\",\"parentAreaId\":623000},{\"areaId\":623023,\"areaType\":2,\"name\":\"舟曲县\",\"parentAreaId\":623000},{\"areaId\":623024,\"areaType\":2,\"name\":\"迭部县\",\"parentAreaId\":623000},{\"areaId\":623025,\"areaType\":2,\"name\":\"玛曲县\",\"parentAreaId\":623000},{\"areaId\":623026,\"areaType\":2,\"name\":\"碌曲县\",\"parentAreaId\":623000},{\"areaId\":623027,\"areaType\":2,\"name\":\"夏河县\",\"parentAreaId\":623000}],\"name\":\"甘南藏族自治州\",\"parentAreaId\":620000}],\"name\":\"甘肃省\",\"parentAreaId\":0},{\"areaId\":630000,\"areaType\":0,\"children\":[{\"areaId\":630100,\"areaType\":1,\"children\":[{\"areaId\":630102,\"areaType\":2,\"name\":\"城东区\",\"parentAreaId\":630100},{\"areaId\":630103,\"areaType\":2,\"name\":\"城中区\",\"parentAreaId\":630100},{\"areaId\":630104,\"areaType\":2,\"name\":\"城西区\",\"parentAreaId\":630100},{\"areaId\":630105,\"areaType\":2,\"name\":\"城北区\",\"parentAreaId\":630100},{\"areaId\":630121,\"areaType\":2,\"name\":\"大通回族土族自治县\",\"parentAreaId\":630100},{\"areaId\":630122,\"areaType\":2,\"name\":\"湟中县\",\"parentAreaId\":630100},{\"areaId\":630123,\"areaType\":2,\"name\":\"湟源县\",\"parentAreaId\":630100}],\"name\":\"西宁市\",\"parentAreaId\":630000},{\"areaId\":630200,\"areaType\":1,\"children\":[{\"areaId\":630202,\"areaType\":2,\"name\":\"乐都区\",\"parentAreaId\":630200},{\"areaId\":630203,\"areaType\":2,\"name\":\"平安区\",\"parentAreaId\":630200},{\"areaId\":630222,\"areaType\":2,\"name\":\"民和回族土族自治县\",\"parentAreaId\":630200},{\"areaId\":630223,\"areaType\":2,\"name\":\"互助土族自治县\",\"parentAreaId\":630200},{\"areaId\":630224,\"areaType\":2,\"name\":\"化隆回族自治县\",\"parentAreaId\":630200},{\"areaId\":630225,\"areaType\":2,\"name\":\"循化撒拉族自治县\",\"parentAreaId\":630200}],\"name\":\"海东市\",\"parentAreaId\":630000},{\"areaId\":632200,\"areaType\":1,\"children\":[{\"areaId\":632221,\"areaType\":2,\"name\":\"门源回族自治县\",\"parentAreaId\":632200},{\"areaId\":632222,\"areaType\":2,\"name\":\"祁连县\",\"parentAreaId\":632200},{\"areaId\":632223,\"areaType\":2,\"name\":\"海晏县\",\"parentAreaId\":632200},{\"areaId\":632224,\"areaType\":2,\"name\":\"刚察县\",\"parentAreaId\":632200}],\"name\":\"海北藏族自治州\",\"parentAreaId\":630000},{\"areaId\":632300,\"areaType\":1,\"children\":[{\"areaId\":632321,\"areaType\":2,\"name\":\"同仁县\",\"parentAreaId\":632300},{\"areaId\":632322,\"areaType\":2,\"name\":\"尖扎县\",\"parentAreaId\":632300},{\"areaId\":632323,\"areaType\":2,\"name\":\"泽库县\",\"parentAreaId\":632300},{\"areaId\":632324,\"areaType\":2,\"name\":\"河南蒙古族自治县\",\"parentAreaId\":632300}],\"name\":\"黄南藏族自治州\",\"parentAreaId\":630000},{\"areaId\":632500,\"areaType\":1,\"children\":[{\"areaId\":632521,\"areaType\":2,\"name\":\"共和县\",\"parentAreaId\":632500},{\"areaId\":632522,\"areaType\":2,\"name\":\"同德县\",\"parentAreaId\":632500},{\"areaId\":632523,\"areaType\":2,\"name\":\"贵德县\",\"parentAreaId\":632500},{\"areaId\":632524,\"areaType\":2,\"name\":\"兴海县\",\"parentAreaId\":632500},{\"areaId\":632525,\"areaType\":2,\"name\":\"贵南县\",\"parentAreaId\":632500}],\"name\":\"海南藏族自治州\",\"parentAreaId\":630000},{\"areaId\":632600,\"areaType\":1,\"children\":[{\"areaId\":632621,\"areaType\":2,\"name\":\"玛沁县\",\"parentAreaId\":632600},{\"areaId\":632622,\"areaType\":2,\"name\":\"班玛县\",\"parentAreaId\":632600},{\"areaId\":632623,\"areaType\":2,\"name\":\"甘德县\",\"parentAreaId\":632600},{\"areaId\":632624,\"areaType\":2,\"name\":\"达日县\",\"parentAreaId\":632600},{\"areaId\":632625,\"areaType\":2,\"name\":\"久治县\",\"parentAreaId\":632600},{\"areaId\":632626,\"areaType\":2,\"name\":\"玛多县\",\"parentAreaId\":632600}],\"name\":\"果洛藏族自治州\",\"parentAreaId\":630000},{\"areaId\":632700,\"areaType\":1,\"children\":[{\"areaId\":632701,\"areaType\":2,\"name\":\"玉树市\",\"parentAreaId\":632700},{\"areaId\":632722,\"areaType\":2,\"name\":\"杂多县\",\"parentAreaId\":632700},{\"areaId\":632723,\"areaType\":2,\"name\":\"称多县\",\"parentAreaId\":632700},{\"areaId\":632724,\"areaType\":2,\"name\":\"治多县\",\"parentAreaId\":632700},{\"areaId\":632725,\"areaType\":2,\"name\":\"囊谦县\",\"parentAreaId\":632700},{\"areaId\":632726,\"areaType\":2,\"name\":\"曲麻莱县\",\"parentAreaId\":632700}],\"name\":\"玉树藏族自治州\",\"parentAreaId\":630000},{\"areaId\":632800,\"areaType\":1,\"children\":[{\"areaId\":632801,\"areaType\":2,\"name\":\"格尔木市\",\"parentAreaId\":632800},{\"areaId\":632802,\"areaType\":2,\"name\":\"德令哈市\",\"parentAreaId\":632800},{\"areaId\":632821,\"areaType\":2,\"name\":\"乌兰县\",\"parentAreaId\":632800},{\"areaId\":632822,\"areaType\":2,\"name\":\"都兰县\",\"parentAreaId\":632800},{\"areaId\":632823,\"areaType\":2,\"name\":\"天峻县\",\"parentAreaId\":632800},{\"areaId\":632824,\"areaType\":2,\"name\":\"冷湖行政委员会\",\"parentAreaId\":632800},{\"areaId\":632825,\"areaType\":2,\"name\":\"大柴旦行政委员会\",\"parentAreaId\":632800},{\"areaId\":632826,\"areaType\":2,\"name\":\"茫崖行政委员会\",\"parentAreaId\":632800}],\"name\":\"海西蒙古族藏族自治州\",\"parentAreaId\":630000}],\"name\":\"青海省\",\"parentAreaId\":0},{\"areaId\":640000,\"areaType\":0,\"children\":[{\"areaId\":640100,\"areaType\":1,\"children\":[{\"areaId\":640104,\"areaType\":2,\"name\":\"兴庆区\",\"parentAreaId\":640100},{\"areaId\":640105,\"areaType\":2,\"name\":\"西夏区\",\"parentAreaId\":640100},{\"areaId\":640106,\"areaType\":2,\"name\":\"金凤区\",\"parentAreaId\":640100},{\"areaId\":640121,\"areaType\":2,\"name\":\"永宁县\",\"parentAreaId\":640100},{\"areaId\":640122,\"areaType\":2,\"name\":\"贺兰县\",\"parentAreaId\":640100},{\"areaId\":640181,\"areaType\":2,\"name\":\"灵武市\",\"parentAreaId\":640100}],\"name\":\"银川市\",\"parentAreaId\":640000},{\"areaId\":640200,\"areaType\":1,\"children\":[{\"areaId\":640202,\"areaType\":2,\"name\":\"大武口区\",\"parentAreaId\":640200},{\"areaId\":640205,\"areaType\":2,\"name\":\"惠农区\",\"parentAreaId\":640200},{\"areaId\":640221,\"areaType\":2,\"name\":\"平罗县\",\"parentAreaId\":640200}],\"name\":\"石嘴山市\",\"parentAreaId\":640000},{\"areaId\":640300,\"areaType\":1,\"children\":[{\"areaId\":640302,\"areaType\":2,\"name\":\"利通区\",\"parentAreaId\":640300},{\"areaId\":640303,\"areaType\":2,\"name\":\"红寺堡区\",\"parentAreaId\":640300},{\"areaId\":640323,\"areaType\":2,\"name\":\"盐池县\",\"parentAreaId\":640300},{\"areaId\":640324,\"areaType\":2,\"name\":\"同心县\",\"parentAreaId\":640300},{\"areaId\":640381,\"areaType\":2,\"name\":\"青铜峡市\",\"parentAreaId\":640300}],\"name\":\"吴忠市\",\"parentAreaId\":640000},{\"areaId\":640400,\"areaType\":1,\"children\":[{\"areaId\":640402,\"areaType\":2,\"name\":\"原州区\",\"parentAreaId\":640400},{\"areaId\":640422,\"areaType\":2,\"name\":\"西吉县\",\"parentAreaId\":640400},{\"areaId\":640423,\"areaType\":2,\"name\":\"隆德县\",\"parentAreaId\":640400},{\"areaId\":640424,\"areaType\":2,\"name\":\"泾源县\",\"parentAreaId\":640400},{\"areaId\":640425,\"areaType\":2,\"name\":\"彭阳县\",\"parentAreaId\":640400}],\"name\":\"固原市\",\"parentAreaId\":640000},{\"areaId\":640500,\"areaType\":1,\"children\":[{\"areaId\":640502,\"areaType\":2,\"name\":\"沙坡头区\",\"parentAreaId\":640500},{\"areaId\":640521,\"areaType\":2,\"name\":\"中宁县\",\"parentAreaId\":640500},{\"areaId\":640522,\"areaType\":2,\"name\":\"海原县\",\"parentAreaId\":640500}],\"name\":\"中卫市\",\"parentAreaId\":640000}],\"name\":\"宁夏回族自治区\",\"parentAreaId\":0},{\"areaId\":650000,\"areaType\":0,\"children\":[{\"areaId\":650100,\"areaType\":1,\"children\":[{\"areaId\":650102,\"areaType\":2,\"name\":\"天山区\",\"parentAreaId\":650100},{\"areaId\":650103,\"areaType\":2,\"name\":\"沙依巴克区\",\"parentAreaId\":650100},{\"areaId\":650104,\"areaType\":2,\"name\":\"新市区\",\"parentAreaId\":650100},{\"areaId\":650105,\"areaType\":2,\"name\":\"水磨沟区\",\"parentAreaId\":650100},{\"areaId\":650106,\"areaType\":2,\"name\":\"头屯河区\",\"parentAreaId\":650100},{\"areaId\":650107,\"areaType\":2,\"name\":\"达坂城区\",\"parentAreaId\":650100},{\"areaId\":650109,\"areaType\":2,\"name\":\"米东区\",\"parentAreaId\":650100},{\"areaId\":650121,\"areaType\":2,\"name\":\"乌鲁木齐县\",\"parentAreaId\":650100}],\"name\":\"乌鲁木齐市\",\"parentAreaId\":650000},{\"areaId\":650200,\"areaType\":1,\"children\":[{\"areaId\":650202,\"areaType\":2,\"name\":\"独山子区\",\"parentAreaId\":650200},{\"areaId\":650203,\"areaType\":2,\"name\":\"克拉玛依区\",\"parentAreaId\":650200},{\"areaId\":650204,\"areaType\":2,\"name\":\"白碱滩区\",\"parentAreaId\":650200},{\"areaId\":650205,\"areaType\":2,\"name\":\"乌尔禾区\",\"parentAreaId\":650200}],\"name\":\"克拉玛依市\",\"parentAreaId\":650000},{\"areaId\":650400,\"areaType\":1,\"children\":[{\"areaId\":650402,\"areaType\":2,\"name\":\"高昌区\",\"parentAreaId\":650400},{\"areaId\":650421,\"areaType\":2,\"name\":\"鄯善县\",\"parentAreaId\":650400},{\"areaId\":650422,\"areaType\":2,\"name\":\"托克逊县\",\"parentAreaId\":650400}],\"name\":\"吐鲁番市\",\"parentAreaId\":650000},{\"areaId\":650500,\"areaType\":1,\"children\":[{\"areaId\":650502,\"areaType\":2,\"name\":\"伊州区\",\"parentAreaId\":650500},{\"areaId\":650521,\"areaType\":2,\"name\":\"巴里坤哈萨克自治县\",\"parentAreaId\":650500},{\"areaId\":650522,\"areaType\":2,\"name\":\"伊吾县\",\"parentAreaId\":650500}],\"name\":\"哈密市\",\"parentAreaId\":650000},{\"areaId\":652300,\"areaType\":1,\"children\":[{\"areaId\":652301,\"areaType\":2,\"name\":\"昌吉市\",\"parentAreaId\":652300},{\"areaId\":652302,\"areaType\":2,\"name\":\"阜康市\",\"parentAreaId\":652300},{\"areaId\":652323,\"areaType\":2,\"name\":\"呼图壁县\",\"parentAreaId\":652300},{\"areaId\":652324,\"areaType\":2,\"name\":\"玛纳斯县\",\"parentAreaId\":652300},{\"areaId\":652325,\"areaType\":2,\"name\":\"奇台县\",\"parentAreaId\":652300},{\"areaId\":652327,\"areaType\":2,\"name\":\"吉木萨尔县\",\"parentAreaId\":652300},{\"areaId\":652328,\"areaType\":2,\"name\":\"木垒哈萨克自治县\",\"parentAreaId\":652300}],\"name\":\"昌吉回族自治州\",\"parentAreaId\":650000},{\"areaId\":652700,\"areaType\":1,\"children\":[{\"areaId\":652701,\"areaType\":2,\"name\":\"博乐市\",\"parentAreaId\":652700},{\"areaId\":652702,\"areaType\":2,\"name\":\"阿拉山口市\",\"parentAreaId\":652700},{\"areaId\":652722,\"areaType\":2,\"name\":\"精河县\",\"parentAreaId\":652700},{\"areaId\":652723,\"areaType\":2,\"name\":\"温泉县\",\"parentAreaId\":652700}],\"name\":\"博尔塔拉蒙古自治州\",\"parentAreaId\":650000},{\"areaId\":652800,\"areaType\":1,\"children\":[{\"areaId\":652801,\"areaType\":2,\"name\":\"库尔勒市\",\"parentAreaId\":652800},{\"areaId\":652822,\"areaType\":2,\"name\":\"轮台县\",\"parentAreaId\":652800},{\"areaId\":652823,\"areaType\":2,\"name\":\"尉犁县\",\"parentAreaId\":652800},{\"areaId\":652824,\"areaType\":2,\"name\":\"若羌县\",\"parentAreaId\":652800},{\"areaId\":652825,\"areaType\":2,\"name\":\"且末县\",\"parentAreaId\":652800},{\"areaId\":652826,\"areaType\":2,\"name\":\"焉耆回族自治县\",\"parentAreaId\":652800},{\"areaId\":652827,\"areaType\":2,\"name\":\"和静县\",\"parentAreaId\":652800},{\"areaId\":652828,\"areaType\":2,\"name\":\"和硕县\",\"parentAreaId\":652800},{\"areaId\":652829,\"areaType\":2,\"name\":\"博湖县\",\"parentAreaId\":652800}],\"name\":\"巴音郭楞蒙古自治州\",\"parentAreaId\":650000},{\"areaId\":652900,\"areaType\":1,\"children\":[{\"areaId\":652901,\"areaType\":2,\"name\":\"阿克苏市\",\"parentAreaId\":652900},{\"areaId\":652922,\"areaType\":2,\"name\":\"温宿县\",\"parentAreaId\":652900},{\"areaId\":652923,\"areaType\":2,\"name\":\"库车县\",\"parentAreaId\":652900},{\"areaId\":652924,\"areaType\":2,\"name\":\"沙雅县\",\"parentAreaId\":652900},{\"areaId\":652925,\"areaType\":2,\"name\":\"新和县\",\"parentAreaId\":652900},{\"areaId\":652926,\"areaType\":2,\"name\":\"拜城县\",\"parentAreaId\":652900},{\"areaId\":652927,\"areaType\":2,\"name\":\"乌什县\",\"parentAreaId\":652900},{\"areaId\":652928,\"areaType\":2,\"name\":\"阿瓦提县\",\"parentAreaId\":652900},{\"areaId\":652929,\"areaType\":2,\"name\":\"柯坪县\",\"parentAreaId\":652900}],\"name\":\"阿克苏地区\",\"parentAreaId\":650000},{\"areaId\":653000,\"areaType\":1,\"children\":[{\"areaId\":653001,\"areaType\":2,\"name\":\"阿图什市\",\"parentAreaId\":653000},{\"areaId\":653022,\"areaType\":2,\"name\":\"阿克陶县\",\"parentAreaId\":653000},{\"areaId\":653023,\"areaType\":2,\"name\":\"阿合奇县\",\"parentAreaId\":653000},{\"areaId\":653024,\"areaType\":2,\"name\":\"乌恰县\",\"parentAreaId\":653000}],\"name\":\"克孜勒苏柯尔克孜自治州\",\"parentAreaId\":650000},{\"areaId\":653100,\"areaType\":1,\"children\":[{\"areaId\":653101,\"areaType\":2,\"name\":\"喀什市\",\"parentAreaId\":653100},{\"areaId\":653121,\"areaType\":2,\"name\":\"疏附县\",\"parentAreaId\":653100},{\"areaId\":653122,\"areaType\":2,\"name\":\"疏勒县\",\"parentAreaId\":653100},{\"areaId\":653123,\"areaType\":2,\"name\":\"英吉沙县\",\"parentAreaId\":653100},{\"areaId\":653124,\"areaType\":2,\"name\":\"泽普县\",\"parentAreaId\":653100},{\"areaId\":653125,\"areaType\":2,\"name\":\"莎车县\",\"parentAreaId\":653100},{\"areaId\":653126,\"areaType\":2,\"name\":\"叶城县\",\"parentAreaId\":653100},{\"areaId\":653127,\"areaType\":2,\"name\":\"麦盖提县\",\"parentAreaId\":653100},{\"areaId\":653128,\"areaType\":2,\"name\":\"岳普湖县\",\"parentAreaId\":653100},{\"areaId\":653129,\"areaType\":2,\"name\":\"伽师县\",\"parentAreaId\":653100},{\"areaId\":653130,\"areaType\":2,\"name\":\"巴楚县\",\"parentAreaId\":653100},{\"areaId\":653131,\"areaType\":2,\"name\":\"塔什库尔干塔吉克自治县\",\"parentAreaId\":653100}],\"name\":\"喀什地区\",\"parentAreaId\":650000},{\"areaId\":653200,\"areaType\":1,\"children\":[{\"areaId\":653201,\"areaType\":2,\"name\":\"和田市\",\"parentAreaId\":653200},{\"areaId\":653221,\"areaType\":2,\"name\":\"和田县\",\"parentAreaId\":653200},{\"areaId\":653222,\"areaType\":2,\"name\":\"墨玉县\",\"parentAreaId\":653200},{\"areaId\":653223,\"areaType\":2,\"name\":\"皮山县\",\"parentAreaId\":653200},{\"areaId\":653224,\"areaType\":2,\"name\":\"洛浦县\",\"parentAreaId\":653200},{\"areaId\":653225,\"areaType\":2,\"name\":\"策勒县\",\"parentAreaId\":653200},{\"areaId\":653226,\"areaType\":2,\"name\":\"于田县\",\"parentAreaId\":653200},{\"areaId\":653227,\"areaType\":2,\"name\":\"民丰县\",\"parentAreaId\":653200}],\"name\":\"和田地区\",\"parentAreaId\":650000},{\"areaId\":654000,\"areaType\":1,\"children\":[{\"areaId\":654002,\"areaType\":2,\"name\":\"伊宁市\",\"parentAreaId\":654000},{\"areaId\":654003,\"areaType\":2,\"name\":\"奎屯市\",\"parentAreaId\":654000},{\"areaId\":654004,\"areaType\":2,\"name\":\"霍尔果斯市\",\"parentAreaId\":654000},{\"areaId\":654021,\"areaType\":2,\"name\":\"伊宁县\",\"parentAreaId\":654000},{\"areaId\":654022,\"areaType\":2,\"name\":\"察布查尔锡伯自治县\",\"parentAreaId\":654000},{\"areaId\":654023,\"areaType\":2,\"name\":\"霍城县\",\"parentAreaId\":654000},{\"areaId\":654024,\"areaType\":2,\"name\":\"巩留县\",\"parentAreaId\":654000},{\"areaId\":654025,\"areaType\":2,\"name\":\"新源县\",\"parentAreaId\":654000},{\"areaId\":654026,\"areaType\":2,\"name\":\"昭苏县\",\"parentAreaId\":654000},{\"areaId\":654027,\"areaType\":2,\"name\":\"特克斯县\",\"parentAreaId\":654000},{\"areaId\":654028,\"areaType\":2,\"name\":\"尼勒克县\",\"parentAreaId\":654000}],\"name\":\"伊犁哈萨克自治州\",\"parentAreaId\":650000},{\"areaId\":654200,\"areaType\":1,\"children\":[{\"areaId\":654201,\"areaType\":2,\"name\":\"塔城市\",\"parentAreaId\":654200},{\"areaId\":654202,\"areaType\":2,\"name\":\"乌苏市\",\"parentAreaId\":654200},{\"areaId\":654221,\"areaType\":2,\"name\":\"额敏县\",\"parentAreaId\":654200},{\"areaId\":654223,\"areaType\":2,\"name\":\"沙湾县\",\"parentAreaId\":654200},{\"areaId\":654224,\"areaType\":2,\"name\":\"托里县\",\"parentAreaId\":654200},{\"areaId\":654225,\"areaType\":2,\"name\":\"裕民县\",\"parentAreaId\":654200},{\"areaId\":654226,\"areaType\":2,\"name\":\"和布克赛尔蒙古自治县\",\"parentAreaId\":654200}],\"name\":\"塔城地区\",\"parentAreaId\":650000},{\"areaId\":654300,\"areaType\":1,\"children\":[{\"areaId\":654301,\"areaType\":2,\"name\":\"阿勒泰市\",\"parentAreaId\":654300},{\"areaId\":654321,\"areaType\":2,\"name\":\"布尔津县\",\"parentAreaId\":654300},{\"areaId\":654322,\"areaType\":2,\"name\":\"富蕴县\",\"parentAreaId\":654300},{\"areaId\":654323,\"areaType\":2,\"name\":\"福海县\",\"parentAreaId\":654300},{\"areaId\":654324,\"areaType\":2,\"name\":\"哈巴河县\",\"parentAreaId\":654300},{\"areaId\":654325,\"areaType\":2,\"name\":\"青河县\",\"parentAreaId\":654300},{\"areaId\":654326,\"areaType\":2,\"name\":\"吉木乃县\",\"parentAreaId\":654300}],\"name\":\"阿勒泰地区\",\"parentAreaId\":650000},{\"areaId\":659001,\"areaType\":1,\"children\":[{\"areaId\":659001001,\"areaType\":2,\"name\":\"新城街道\",\"parentAreaId\":659001},{\"areaId\":659001002,\"areaType\":2,\"name\":\"向阳街道\",\"parentAreaId\":659001},{\"areaId\":659001003,\"areaType\":2,\"name\":\"红山街道\",\"parentAreaId\":659001},{\"areaId\":659001004,\"areaType\":2,\"name\":\"老街街道\",\"parentAreaId\":659001},{\"areaId\":659001005,\"areaType\":2,\"name\":\"东城街道\",\"parentAreaId\":659001},{\"areaId\":659001100,\"areaType\":2,\"name\":\"北泉镇\",\"parentAreaId\":659001},{\"areaId\":659001200,\"areaType\":2,\"name\":\"石河子镇\",\"parentAreaId\":659001},{\"areaId\":659001500,\"areaType\":2,\"name\":\"兵团一五二团\",\"parentAreaId\":659001}],\"name\":\"石河子市\",\"parentAreaId\":650000},{\"areaId\":659002,\"areaType\":1,\"children\":[{\"areaId\":659002001,\"areaType\":2,\"name\":\"金银川路街道\",\"parentAreaId\":659002},{\"areaId\":659002002,\"areaType\":2,\"name\":\"幸福路街道\",\"parentAreaId\":659002},{\"areaId\":659002003,\"areaType\":2,\"name\":\"青松路街道\",\"parentAreaId\":659002},{\"areaId\":659002004,\"areaType\":2,\"name\":\"南口街道\",\"parentAreaId\":659002},{\"areaId\":659002200,\"areaType\":2,\"name\":\"托喀依乡\",\"parentAreaId\":659002},{\"areaId\":659002500,\"areaType\":2,\"name\":\"兵团七团\",\"parentAreaId\":659002},{\"areaId\":659002501,\"areaType\":2,\"name\":\"兵团八团\",\"parentAreaId\":659002},{\"areaId\":659002503,\"areaType\":2,\"name\":\"兵团十团\",\"parentAreaId\":659002},{\"areaId\":659002505,\"areaType\":2,\"name\":\"兵团十二团\",\"parentAreaId\":659002},{\"areaId\":659002507,\"areaType\":2,\"name\":\"兵团十四团\",\"parentAreaId\":659002},{\"areaId\":659002509,\"areaType\":2,\"name\":\"兵团十六团\",\"parentAreaId\":659002},{\"areaId\":659002511,\"areaType\":2,\"name\":\"兵团第一师水利水电工程处\",\"parentAreaId\":659002},{\"areaId\":659002513,\"areaType\":2,\"name\":\"阿拉尔农场\",\"parentAreaId\":659002},{\"areaId\":659002514,\"areaType\":2,\"name\":\"兵团第一师幸福农场\",\"parentAreaId\":659002},{\"areaId\":659002901,\"areaType\":2,\"name\":\"兵团二团\",\"parentAreaId\":659002},{\"areaId\":659002902,\"areaType\":2,\"name\":\"兵团农一师沙井子水利管理处\",\"parentAreaId\":659002},{\"areaId\":659002964,\"areaType\":2,\"name\":\"兵团九团\",\"parentAreaId\":659002},{\"areaId\":659002966,\"areaType\":2,\"name\":\"兵团十一团\",\"parentAreaId\":659002},{\"areaId\":659002967,\"areaType\":2,\"name\":\"兵团十三团\",\"parentAreaId\":659002},{\"areaId\":659002968,\"areaType\":2,\"name\":\"兵团十五团\",\"parentAreaId\":659002}],\"name\":\"阿拉尔市\",\"parentAreaId\":650000},{\"areaId\":659003,\"areaType\":1,\"children\":[{\"areaId\":659003001,\"areaType\":2,\"name\":\"齐干却勒街道\",\"parentAreaId\":659003},{\"areaId\":659003002,\"areaType\":2,\"name\":\"前海街道\",\"parentAreaId\":659003},{\"areaId\":659003003,\"areaType\":2,\"name\":\"永安坝街道\",\"parentAreaId\":659003},{\"areaId\":659003504,\"areaType\":2,\"name\":\"兵团四十四团\",\"parentAreaId\":659003},{\"areaId\":659003509,\"areaType\":2,\"name\":\"兵团四十九团\",\"parentAreaId\":659003},{\"areaId\":659003513,\"areaType\":2,\"name\":\"兵团五十三团\",\"parentAreaId\":659003},{\"areaId\":659003960,\"areaType\":2,\"name\":\"喀拉拜勒镇\",\"parentAreaId\":659003},{\"areaId\":659003964,\"areaType\":2,\"name\":\"兵团五十一团\",\"parentAreaId\":659003},{\"areaId\":659003965,\"areaType\":2,\"name\":\"兵团五十二团\",\"parentAreaId\":659003},{\"areaId\":659003966,\"areaType\":2,\"name\":\"兵团五十团\",\"parentAreaId\":659003}],\"name\":\"图木舒克市\",\"parentAreaId\":650000},{\"areaId\":659004,\"areaType\":1,\"children\":[{\"areaId\":659004001,\"areaType\":2,\"name\":\"军垦路街道\",\"parentAreaId\":659004},{\"areaId\":659004002,\"areaType\":2,\"name\":\"青湖路街道\",\"parentAreaId\":659004},{\"areaId\":659004003,\"areaType\":2,\"name\":\"人民路街道\",\"parentAreaId\":659004},{\"areaId\":659004500,\"areaType\":2,\"name\":\"兵团一零一团\",\"parentAreaId\":659004},{\"areaId\":659004960,\"areaType\":2,\"name\":\"蔡家湖镇\",\"parentAreaId\":659004},{\"areaId\":659004961,\"areaType\":2,\"name\":\"梧桐镇\",\"parentAreaId\":659004}],\"name\":\"五家渠市\",\"parentAreaId\":650000},{\"areaId\":659005,\"areaType\":1,\"children\":[{\"areaId\":659005502,\"areaType\":2,\"name\":\"兵团一八七团\",\"parentAreaId\":659005},{\"areaId\":659005503,\"areaType\":2,\"name\":\"兵团一八八团\",\"parentAreaId\":659005}],\"name\":\"北屯市\",\"parentAreaId\":650000},{\"areaId\":659006,\"areaType\":1,\"children\":[{\"areaId\":659006501,\"areaType\":2,\"name\":\"兵团二十九团\",\"parentAreaId\":659006},{\"areaId\":659006502,\"areaType\":2,\"name\":\"农二师三十团\",\"parentAreaId\":659006}],\"name\":\"铁门关市\",\"parentAreaId\":650000},{\"areaId\":659007,\"areaType\":1,\"children\":[{\"areaId\":659007501,\"areaType\":2,\"name\":\"兵团八十一团\",\"parentAreaId\":659007},{\"areaId\":659007502,\"areaType\":2,\"name\":\"兵团八十四团\",\"parentAreaId\":659007},{\"areaId\":659007504,\"areaType\":2,\"name\":\"兵团八十六团\",\"parentAreaId\":659007},{\"areaId\":659007505,\"areaType\":2,\"name\":\"兵团八十九团\",\"parentAreaId\":659007},{\"areaId\":659007506,\"areaType\":2,\"name\":\"兵团九十团\",\"parentAreaId\":659007}],\"name\":\"双河市\",\"parentAreaId\":650000},{\"areaId\":659008,\"areaType\":1,\"children\":[{\"areaId\":659008502,\"areaType\":2,\"name\":\"兵团六十七团\",\"parentAreaId\":659008},{\"areaId\":659008503,\"areaType\":2,\"name\":\"兵团六十八团\",\"parentAreaId\":659008},{\"areaId\":659008507,\"areaType\":2,\"name\":\"兵团六十三团\",\"parentAreaId\":659008},{\"areaId\":659008508,\"areaType\":2,\"name\":\"兵团六十四团\",\"parentAreaId\":659008},{\"areaId\":659008509,\"areaType\":2,\"name\":\"兵团六十六团\",\"parentAreaId\":659008}],\"name\":\"可克达拉市\",\"parentAreaId\":650000},{\"areaId\":659009,\"areaType\":1,\"children\":[{\"areaId\":659009400,\"areaType\":2,\"name\":\"兵团一牧场\",\"parentAreaId\":659009},{\"areaId\":659009401,\"areaType\":2,\"name\":\"兵团皮山农场\",\"parentAreaId\":659009},{\"areaId\":659009501,\"areaType\":2,\"name\":\"兵团二二四团\",\"parentAreaId\":659009}],\"name\":\"昆玉市\",\"parentAreaId\":650000}],\"name\":\"新疆维吾尔自治区\",\"parentAreaId\":0}]");

/***/ }),
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */
/*!********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-line/props.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    color: {
      type: String,
      default: uni.$u.props.line.color
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
    length: {
      type: [String, Number],
      default: uni.$u.props.line.length
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: uni.$u.props.line.direction
    },
    // 是否显示细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.line.hairline
    },
    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
    margin: {
      type: [String, Number],
      default: uni.$u.props.line.margin
    },
    // 是否虚线，true-虚线，false-实线
    dashed: {
      type: Boolean,
      default: uni.$u.props.line.dashed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */
/*!****************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-loading-icon/props.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: uni.$u.props.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: uni.$u.props.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: uni.$u.props.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.loadingIcon.inactiveColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */
/*!*******************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-gap/props.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 背景颜色（默认transparent）
    bgColor: {
      type: String,
      default: uni.$u.props.gap.bgColor
    },
    // 分割槽高度，单位px（默认30）
    height: {
      type: [String, Number],
      default: uni.$u.props.gap.height
    },
    // 与上一个组件的距离
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.gap.marginTop
    },
    // 与下一个组件的距离
    marginBottom: {
      type: [String, Number],
      default: uni.$u.props.gap.marginBottom
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-overlay/props.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: uni.$u.props.overlay.show
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.overlay.zIndex
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.overlay.duration
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: uni.$u.props.overlay.opacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */
/*!**************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-status-bar/props.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    bgColor: {
      type: String,
      default: uni.$u.props.statusBar.bgColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */
/*!***************************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-safe-bottom/props.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {}
};
exports.default = _default;

/***/ }),
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */
/*!**********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-picker/props.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示picker弹窗
    show: {
      type: Boolean,
      default: uni.$u.props.picker.show
    },
    // 是否展示顶部的操作栏
    showToolbar: {
      type: Boolean,
      default: uni.$u.props.picker.showToolbar
    },
    // 顶部标题
    title: {
      type: String,
      default: uni.$u.props.picker.title
    },
    // 对象数组，设置每一列的数据
    columns: {
      type: Array,
      default: uni.$u.props.picker.columns
    },
    // 是否显示加载中状态
    loading: {
      type: Boolean,
      default: uni.$u.props.picker.loading
    },
    // 各列中，单个选项的高度
    itemHeight: {
      type: [String, Number],
      default: uni.$u.props.picker.itemHeight
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: uni.$u.props.picker.cancelText
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: uni.$u.props.picker.confirmText
    },
    // 取消按钮的颜色
    cancelColor: {
      type: String,
      default: uni.$u.props.picker.cancelColor
    },
    // 确认按钮的颜色
    confirmColor: {
      type: String,
      default: uni.$u.props.picker.confirmColor
    },
    // 每列中可见选项的数量
    visibleItemCount: {
      type: [String, Number],
      default: uni.$u.props.picker.visibleItemCount
    },
    // 选项对象中，需要展示的属性键名
    keyName: {
      type: String,
      default: uni.$u.props.picker.keyName
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.picker.closeOnClickOverlay
    },
    // 各列的默认索引
    defaultIndex: {
      type: Array,
      default: uni.$u.props.picker.defaultIndex
    },
    // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
    immediateChange: {
      type: Boolean,
      default: uni.$u.props.picker.immediateChange
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */
/*!***********************************************************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/uni_modules/uview-ui/components/u-toolbar/props.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示工具条
    show: {
      type: Boolean,
      default: uni.$u.props.toolbar.show
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: uni.$u.props.toolbar.cancelText
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: uni.$u.props.toolbar.confirmText
    },
    // 取消按钮的颜色
    cancelColor: {
      type: String,
      default: uni.$u.props.toolbar.cancelColor
    },
    // 确认按钮的颜色
    confirmColor: {
      type: String,
      default: uni.$u.props.toolbar.confirmColor
    },
    // 标题文字
    title: {
      type: String,
      default: uni.$u.props.toolbar.title
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */
/*!**********************************************************!*\
  !*** D:/webProject/mallproject/xiaofanshu/utils/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestampFormat = exports.stringDateFormat = void 0;
var timestampFormat = function timestampFormat(timespan) {
  var dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
  return dateTimeFormat(dateTime);
};
exports.timestampFormat = timestampFormat;
var stringDateFormat = function stringDateFormat(params) {
  var fullDate = params.split(" ")[0].split("-");
  var fullTime = params.split(" ")[1].split(":");
  var dateTime = new Date(fullDate[0], fullDate[1] - 1, fullDate[2], fullTime[0] != null ? fullTime[0] : 0, fullTime[1] != null ? fullTime[1] : 0, fullTime[2] != null ? fullTime[2] : 0);
  console.log(dateTime);
  return dateTimeFormat(dateTime);
};
exports.stringDateFormat = stringDateFormat;
function dateTimeFormat(dateTime) {
  var year = dateTime.getFullYear();
  var month = padZero(dateTime.getMonth() + 1); // 补零
  var day = padZero(dateTime.getDate()); // 补零
  var hour = padZero(dateTime.getHours()); // 补零
  var minute = padZero(dateTime.getMinutes()); // 补零
  var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
  var now = new Date(); // 获取本机当前的时间
  var nowNew = now.getTime(); // 将本机的时间转换为毫秒
  var milliseconds = 0;
  var timeSpanStr;
  milliseconds = nowNew - millisecond;
  if (milliseconds <= 1000 * 60 * 1) {
    // 小于一分钟展示为刚刚
    timeSpanStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    // 大于一分钟小于一小时展示为分钟
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前';
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    // 大于一小时小于一天展示为小时
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    // 大于一天小于十五天展示位天
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
  // 补零函数
  function padZero(number) {
    return number < 10 ? '0' + number : number;
  }
}

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map