// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var defaultCallback = function defaultCallback(start, end) {
  return console.log(start, end);
};

function createElement(tag, attrs) {
  var element = document.createElement(tag.toUpperCase());

  for (var name in attrs) {
    switch (name) {
      case "className":
        if (Array.isArray(attrs[name])) {
          for (var i in attrs[name]) {
            element.classList.add(attrs[name][i]);
          }
        } else {
          element.classList.add(attrs[name]);
        }

        break;

      case "children":
        for (var _i in attrs[name]) {
          element.appendChild(attrs[name][_i]);
        }

        break;

      case "text":
        element.innerText = attrs[name];
        break;

      case "html":
        element.innerHTML = attrs[name];
        break;

      case "on":
        for (var event in attrs[name]) {
          element.addEventListener(event, attrs[name][event]);
        }

        break;

      case "attrs":
        for (var attr in attrs[name]) {
          element.setAttribute(attr, attrs[name][attr]);
        }

        break;

      default:
        if (name in element) {
          element[name] = attrs[name];
          break;
        }

        element.setAttribute(name, attrs[name]);
    }
  }

  return element;
}

function getDateElement(date) {
  return createElement("div", {
    className: "date",
    children: [createElement("b", {
      text: addNull(date.getDate())
    })],
    "data-date": date
  });
}

function setDisableClass(element) {
  element.classList.add("disable");
  return element;
}

function addNull(nm) {
  return String(nm).length == 1 ? "0" + nm : String(nm);
}

function getFirstDays(date) {
  var secondDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  var arDates = [];

  for (var i = 0; i < secondDate.getDay() - 1; i++) {
    arDates.push(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth(), lastMonthDate.getDate() - i));
  }

  return arDates.reverse();
}

function getLastDays(date) {
  var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var secondMonthDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  var arDates = [];
  var j = 1;

  for (var i = lastDate.getDay() + 1; i <= 7; i++) {
    arDates.push(new Date(secondMonthDate.getFullYear(), secondMonthDate.getMonth(), j++));
  }

  return arDates;
}

function getDates(date) {
  var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var arDates = [];

  for (var i = 1; i <= lastDate.getDate(); i++) {
    arDates.push(new Date(lastDate.getFullYear(), lastDate.getMonth(), i));
  }

  return arDates;
}

function getDatesBlock(date) {
  var dates = [].concat(_toConsumableArray(getFirstDays(date).map(getDateElement).map(setDisableClass)), _toConsumableArray(getDates(date).map(getDateElement)), _toConsumableArray(getLastDays(date).map(getDateElement).map(setDisableClass)));
  var datesBlock = createElement("div", {
    className: "dates"
  });

  for (var i = 0; i < Math.ceil(dates.length / 7); i++) {
    var row = createElement("div", {
      className: "row"
    });

    for (var j = i * 7; j <= i * 7 + 6; j++) {
      if (dates[j]) {
        row.appendChild(dates[j]);
      }
    }

    datesBlock.appendChild(row);
  }

  return datesBlock;
}

var arrow = "<svg width=\"7\" height=\"11\" viewBox=\"0 0 7 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.14001 0.787354L1.16001 5.14485L6.14001 9.50235\" stroke=\"black\" stroke-width=\"1.55625\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n";

function getWeekDays(locale) {
  var date = new Date(Date.UTC(2012, 11, 10, 3, 0, 0));
  var weekDays = [];

  for (var i = 0; i <= 6; i++) {
    weekDays.push(date.toLocaleString(locale, {
      weekday: "short"
    }));
    date.setDate(date.getDate() + 1);
  }

  return weekDays;
}

function getDate(date) {
  return date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : false;
}

function setSelectDate(content, selectDate) {
  selectDate = getDate(selectDate);

  if (!selectDate) {
    return;
  }

  var dates = content.querySelector(".dates").querySelectorAll(".date");

  var _iterator = _createForOfIteratorHelper(dates),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      element.classList.remove("select");
      var date = new Date(element.getAttribute("data-date"));

      if (date.valueOf() == selectDate.valueOf()) {
        element.classList.add("select");
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function setSelectDateRange(content, start, end) {
  var _ref = [getDate(start), getDate(end)];
  start = _ref[0];
  end = _ref[1];

  if (!start && !end) {
    return;
  }

  var dates = content.querySelector(".dates").querySelectorAll(".date");

  var _iterator2 = _createForOfIteratorHelper(dates),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var element = _step2.value;
      element.classList.remove("path");
      element.classList.remove("select-start");
      element.classList.remove("select-end");
      var date = new Date(element.getAttribute("data-date"));

      if (start && end) {
        if (date >= start && date <= end) {
          element.classList.add("path");
        }
      }

      if (start && date.valueOf() == start.valueOf()) {
        element.classList.add("select-start");
      }

      if (end && date.valueOf() == end.valueOf()) {
        element.classList.add("select-end");
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function getRangeElement(content) {
  return [content.querySelector(".dates").querySelector(".select-start") || false, content.querySelector(".dates").querySelector(".select-end") || false];
}

function getRangeDate(content) {
  var _getRangeElement = getRangeElement(content),
      _getRangeElement2 = _slicedToArray(_getRangeElement, 2),
      startElement = _getRangeElement2[0],
      endElement = _getRangeElement2[1];

  return [startElement ? new Date(startElement.getAttribute("data-date")) : false, endElement ? new Date(endElement.getAttribute("data-date")) : false];
}

function removeActive(content) {
  var dates = content.querySelector(".dates").querySelectorAll(".date");

  var _iterator3 = _createForOfIteratorHelper(dates),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var element = _step3.value;
      element.classList.remove("active");
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}

function onRangeSelect(content, ev, options) {
  var _options$onSelect = options.onSelect,
      onSelect = _options$onSelect === void 0 ? defaultCallback : _options$onSelect;
  var start = options.start,
      end = options.end;
  var target = ev.currentTarget;
  var date = new Date(target.getAttribute("data-date"));

  var setDate = function setDate(start, end) {
    options.start = start;
    options.end = end;
    setSelectDateRange(content, start, end);
  };

  if (start && end) {
    if (![start.valueOf(), end.valueOf()].includes(date.valueOf())) {
      if (date.valueOf() < start.valueOf()) {
        setDate(date, end);
      } else if (date.valueOf() > end.valueOf()) {
        setDate(start, date);
      } else {
        var _getRangeElement3 = getRangeElement(content),
            _getRangeElement4 = _slicedToArray(_getRangeElement3, 2),
            _ = _getRangeElement4[0],
            endElement = _getRangeElement4[1];

        if (endElement && endElement.classList.contains("active")) {
          setDate(start, date);
        } else {
          setDate(date, end);
        }
      }
    }

    onSelect.apply(void 0, _toConsumableArray(getRangeDate(content)));
    removeActive(content);
    target.classList.add("active");
  } else if (start || end) {
    var selectDate = start || end;

    if (date.valueOf() != selectDate.valueOf()) {
      if (selectDate.valueOf() > date.valueOf()) {
        setDate(date, selectDate);
      } else {
        setDate(selectDate, date);
      }
    }

    onSelect.apply(void 0, _toConsumableArray(getRangeDate(content)));
    removeActive(content);
    target.classList.add("active");
  }
}

function rangeSelect(content, options) {
  var dates = content.querySelector(".dates").querySelectorAll(".date");

  var _iterator4 = _createForOfIteratorHelper(dates),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var element = _step4.value;
      element.addEventListener("click", function (ev) {
        return onRangeSelect(content, ev, options);
      }, true);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

function registerSelect(content, options) {
  var dates = content.querySelector(".dates").querySelectorAll(".date");

  var _iterator5 = _createForOfIteratorHelper(dates),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var element = _step5.value;
      element.addEventListener("click", function (ev) {
        var target = ev.currentTarget;
        var _options$onSelect2 = options.onSelect,
            onSelect = _options$onSelect2 === void 0 ? defaultCallback : _options$onSelect2;
        options.select = new Date(target.getAttribute("data-date"));
        setSelectDate(content, options.select);
        onSelect(options.select);
      }, true);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

function getRawCalendar(date, options) {
  var _options$locale = options.locale,
      locale = _options$locale === void 0 ? window.navigator.language : _options$locale;
  var month = date.toLocaleString(locale, {
    month: "long"
  });
  var weekDays = getWeekDays(locale);
  var header = createElement("div", {
    className: "header",
    children: [createElement("div", {
      classList: "caption",
      children: [createElement("span", {
        children: [createElement("h3", {
          text: month,
          on: {
            click: function click(ev) {
              ev.stopPropagation();
              ev.target.classList.add("focus");
            }
          }
        }), createElement("ul", {
          className: "select",
          children: Array(12).fill(0).map(function (_, i) {
            return createElement("li", {
              children: [createElement("a", {
                href: i,
                text: new Date(date.getFullYear(), i, date.getDate()).toLocaleString(locale, {
                  month: "long"
                }),
                on: {
                  click: function click() {
                    for (var _len = arguments.length, attr = new Array(_len), _key = 0; _key < _len; _key++) {
                      attr[_key] = arguments[_key];
                    }

                    var ev = attr[0];
                    ev.preventDefault();
                    options.onSelectMonth.apply(options, attr);
                  }
                }
              })]
            });
          })
        })]
      }), createElement("p", {
        text: date.getFullYear(),
        contenteditable: true,
        on: {
          keyup: options.onInputYear
        }
      })]
    }), createElement("div", {
      className: "input",
      children: [createElement("button", {
        className: ["btn", "arrow", "left"],
        html: arrow,
        on: {
          click: options.onPrev
        }
      }), createElement("button", {
        className: ["btn", "arrow", "right"],
        html: arrow,
        on: {
          click: options.onNext
        }
      })]
    })]
  });
  var weekBlock = createElement("div", {
    className: "weeks",
    children: weekDays.map(function (week) {
      return createElement("div", {
        className: "item",
        text: week
      });
    })
  });
  var content = createElement("div", {
    className: "content",
    children: [weekBlock, getDatesBlock(date)]
  });

  if (options.range) {
    setSelectDateRange(content, options.start, options.end);
    rangeSelect(content, options);
  } else {
    setSelectDate(content, options.select);
    registerSelect(content, options);
  }

  return createElement("div", {
    className: "wrap",
    children: [header, content]
  });
}

function addMonth(date, month) {
  var nmMonth = date.getMonth() + month;
  date.setMonth(nmMonth);
  return date;
}

function getCalendar(date, options) {
  var container = createElement("div", {
    className: "pekush-calendar"
  });

  options.onPrev = function () {
    var usageDate = addMonth(date, -1);
    container.innerHTML = "";
    container.appendChild(getRawCalendar(usageDate, options));
  };

  options.onNext = function () {
    var usageDate = addMonth(date, 1);
    container.innerHTML = "";
    container.appendChild(getRawCalendar(usageDate, options));
  };

  options.onInputYear = function (ev) {
    var value = ev.target.innerText;

    if (/^((19|20)[0-9]{2}){1}$/.test(value)) {
      date.setYear(value);
      container.innerHTML = "";
      container.appendChild(getRawCalendar(date, options));
    }
  };

  options.onSelectMonth = function (ev) {
    date.setMonth(ev.target.getAttribute("href"));
    container.innerHTML = "";
    container.appendChild(getRawCalendar(date, options));
  };

  container.appendChild(getRawCalendar(date, options));
  document.addEventListener("click", function () {
    var h3 = container.querySelector(".header h3.focus");

    if (container.querySelector(".header h3.focus")) {
      h3.classList.remove("focus");
    }
  });
  return container;
}

window.pekushCalendar = {
  new: getCalendar
};
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59446" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map