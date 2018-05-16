/*jslint browser: true, es6: true*/
// symbols represent private members of the class
// this.myProperty == public this[myProperty] == private
'use strict';

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _instanceof2(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return _instanceof2(left, right);
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  _setPrototypeOf(subClass.prototype, superClass && superClass.prototype);

  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {}

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, _setPrototypeOf(function Super() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }, Class));
  };

  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (typeof Reflect !== "undefined" && Reflect.construct) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Parent.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

var container = Symbol();
var basePath = Symbol();
var items = Symbol();
var input = Symbol();
var listBox = Symbol();
var list = Symbol();
var selectionControls = Symbol();
var okCancelControls = Symbol();
var selectAllButton = Symbol();
var deselectButton = Symbol();
var okButton = Symbol();
var cancelButton = Symbol();
var dispatch = Symbol();

var PPContextSearch =
/*#__PURE__*/
function (_HTMLElement) {
  function PPContextSearch() {
    var _this;

    _classCallCheck(this, PPContextSearch); // always call super first


    _this = _possibleConstructorReturn(this, _getPrototypeOf(PPContextSearch).call(this));

    _this[dispatch] = function (eventName, detail) {
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var e = new CustomEvent(eventName, {
        cancelable: cancelable,
        bubbles: bubbles,
        detail: detail
      });

      _this.dispatchEvent(e);

      return e.defaultPrevented;
    };

    _this[dispatch]('created');

    _this.attachShadow({
      mode: 'open'
    });

    _this[input] = document.createElement('input');
    _this[container] = document.createElement('div');
    _this[listBox] = document.createElement('div');
    _this[list] = document.createElement('ul');
    _this[selectionControls] = document.createElement('div');
    _this[okCancelControls] = document.createElement('div');
    _this[selectAllButton] = document.createElement('div');
    _this[deselectButton] = document.createElement('div');
    _this[okButton] = document.createElement('button');
    _this[cancelButton] = document.createElement('button');
    return _this;
  }

  _createClass(PPContextSearch, [{
    key: "render",
    value: function render(i) {
      var _this2 = this;

      if (this[dispatch]('beforerender')) {
        return;
      }

      this[list].innerHTML = '';
      i = i || this[items] || [];

      var checkSelectHighlight = function checkSelectHighlight() {
        if (i.filter(function (t) {
          return t.selected;
        }).length === i.length) {
          _this2[selectAllButton].className = 'pp-context-selection-controls-highlight';
          _this2[deselectButton].className = '';
        } else {
          _this2[selectAllButton].className = '';
          _this2[deselectButton].className = 'pp-context-selection-controls-highlight';
        }
      };

      i.forEach(function (item, index) {
        var li = document.createElement('li'),
            checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'pp-context-search-item-checkbox';
        li.className = 'pp-context-search-item-container';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(item.value));
        checkbox.checked = item.selected;
        checkbox.addEventListener('change', function () {
          item.selected = checkbox.checked;
          checkSelectHighlight(i);

          _this2[dispatch]('change');
        });

        if (_this2[dispatch]('renderitem', {
          item: item,
          itemContainer: li,
          itemCheckbox: checkbox
        })) {
          return;
        }

        _this2[list].appendChild(li);
      });
      checkSelectHighlight();
      this[dispatch]('afterrender');
    }
  }, {
    key: "changeSelection",
    value: function changeSelection(select) {
      (this[items] || []).forEach(function (item) {
        item.selected = select;
      });
      this.render();
      this[dispatch]('change');
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      if (this[dispatch]('selectall')) {
        return;
      }

      this.changeSelection(true);
    }
  }, {
    key: "deselect",
    value: function deselect() {
      if (this[dispatch]('deselect')) {
        return;
      }

      this.changeSelection(false);
    }
  }, {
    key: "close",
    value: function close() {
      if (this[dispatch]('closing')) {
        return;
      }

      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }

      this[dispatch]('closed');
    }
  }, {
    key: "ok",
    value: function ok() {
      if (this[dispatch]('okpressed')) {
        return;
      }

      this.close();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this[dispatch]('cancelpressed')) {
        return;
      }

      this.close();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, old, value) {
      if (this[dispatch]('attributechanged', {
        name: name,
        old: old,
        value: value
      })) {
        return;
      }

      if (name in this) {
        this[name] = value;
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this3 = this;

      this[input].addEventListener('keyup', function (e) {
        _this3.render(_this3[items].filter(function (item) {
          return new RegExp(this[input].value, 'ig').test(item.value);
        }));
      });
      this[input].type = 'text';
      this[input].setAttribute('placeholder', 'Search Locations');
      this[listBox].appendChild(this[list]);
      this[selectionControls].appendChild(this[selectAllButton]);
      this[selectionControls].appendChild(document.createTextNode("\u2022"));
      this[selectionControls].appendChild(this[deselectButton]);
      this[okCancelControls].appendChild(this[okButton]);
      this[okCancelControls].appendChild(this[cancelButton]);
      this[selectAllButton].addEventListener('click', function () {
        _this3.selectAll();
      });
      this[deselectButton].addEventListener('click', function () {
        _this3.deselect();
      });
      this[okButton].addEventListener('click', function () {
        _this3.ok();
      });
      this[cancelButton].addEventListener('click', function () {
        _this3.cancel();
      });
      this[dispatch]('attached');
      this[basePath] = this[basePath] || '';
      this[listBox].className = 'pp-context-search-list-box';
      this[selectionControls].className = 'pp-context-selection-controls';
      this[okCancelControls].className = 'pp-context-okcancel-controls';
      this[okButton].className = 'pp-context-ok-button';
      this[cancelButton].className = 'pp-context-cancel-button';
      this[selectAllButton].innerHTML = 'Select All';
      this[deselectButton].innerHTML = 'Deselect';
      this[okButton].innerHTML = 'OK';
      this[cancelButton].innerHTML = 'Cancel';

      if (this.hasAttribute('basePath')) {
        this.basePath = this.getAttribute('basePath');
      }

      this.shadowRoot.innerHTML = "<style>@import \"".concat(this[basePath], "css/main.css\";</style>");
      this[container].className = 'pp-context-search';
      this.shadowRoot.appendChild(this[container]);
      this[container].appendChild(this[input]);
      this[container].appendChild(this[listBox]);
      this[container].appendChild(this[selectionControls]);
      this[container].appendChild(this[okCancelControls]);
      this[dispatch]('afterattached');
    }
  }, {
    key: "basePath",
    get: function get() {
      return this[basePath];
    },
    set: function set(val) {
      this[dispatch]('basepathchange');

      if (!val) {
        this[basePath] = '';
        return;
      }

      if (!/\/$/.test(val)) {
        val += '/';
      }

      this[basePath] = val;
    }
  }, {
    key: "items",
    get: function get() {
      return this[items];
    },
    set: function set(val) {
      if (typeof val === 'string') {
        try {
          val = JSON.parse(val);
        } catch (e) {
          throw new Error('Cannot parse JSON in items attribute/property. ' + e.message);
        }
      }

      if (this[dispatch]('beforechange')) {
        return;
      }

      this[items] = val;
      this[dispatch]('change');
      this.render();
    }
  }]);

  _inherits(PPContextSearch, _HTMLElement);

  return PPContextSearch;
}(_wrapNativeSuper(HTMLElement));

customElements.define('pp-context-search', PPContextSearch);
window.PPContextSearch = PPContextSearch;

if (window.define) {
  define([], function () {
    return PPContextSearch;
  });
}