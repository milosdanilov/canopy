"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputs = exports.border_padding = exports.border_width = exports.jq = exports.Self = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.find = find;
exports.append = append;
exports.css = css;
exports.click = click;
exports.value = value;
exports.set = set;
exports.remove = remove;
exports.exists = exists;
exports.bind = bind;
exports.bindEach = bindEach;
exports.bool = bool;
exports.px = px;
exports.toInt = toInt;
exports.border = border;
exports.createBorders = createBorders;
exports.mouseOver = mouseOver;
exports.mouseOut = mouseOut;
exports.mouseDown = mouseDown;

var _Symbol2 = require("fable-core/umd/Symbol");

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = require("fable-core/umd/Util");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _String = require("fable-core/umd/String");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Self = exports.Self = function () {
  function Self(_self) {
    _classCallCheck(this, Self);

    this.self = _self;
  }

  _createClass(Self, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "Companion.Self",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          self: _Util.Any
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }]);

  return Self;
}();

(0, _Symbol2.setType)("Companion.Self", Self);
var jq = exports.jq = _jquery2.default;

function find(selector) {
  return jq(selector);
}

function append(selector, element) {
  find(selector).append(element);
}

function css(selector, property, value) {
  find(selector).css(property, value);
}

function click(selector, f) {
  find(selector).click(f);
}

function value(selector) {
  return find(selector).val();
}

function set(selector, value_1) {
  find(selector).val(value_1);
}

function remove(selector) {
  find(selector).remove();
}

function exists(selector) {
  var value_1 = Number.parseInt((0, _String.fsFormat)("%O")(function (x) {
    return x;
  })(find(selector).length));
  return value_1 > 0;
}

function bind(element, event, f) {
  var element_1 = jq(element);
  element_1.bind(event, new Self(element_1), f);
}

function bindEach(selector, event, f) {
  var elements = find(selector);
  jq.each(elements, function (index, element) {
    bind(element, event, f);
  });
}

function bool(whatever) {
  var matchValue = (0, _String.fsFormat)("%O")(function (x) {
    return x;
  })(whatever);

  if (matchValue === "true") {
    return true;
  } else {
    return false;
  }
}

var border_width = exports.border_width = 5;
var border_padding = exports.border_padding = 2;
var inputs = exports.inputs = "\r\n<div id=\"canopy_companion\">\r\n  <input type=\"text\" id=\"selector\" value=\"\">\r\n  <input type=\"button\" id=\"go\" value=\"Go\">\r\n  <input type=\"button\" id=\"clear\" value=\"Clear\">\r\n  <input type=\"button\" id=\"close\" value=\"X\">\r\n</div>";

function px(value_1) {
  return (0, _String.fsFormat)("%ipx")(function (x) {
    return x;
  })(value_1);
}

function toInt(value_1) {
  return Number.parseInt((0, _String.fsFormat)("%O")(function (x) {
    return x;
  })(value_1));
}

function border(heightValue, widthvalue, topValue, leftValue) {
  var element = jq("<div>");
  element.addClass("canopy_companion_border").css("height", px(heightValue)).css("width", px(widthvalue)).css("top", px(topValue)).css("left", px(leftValue)).css("background-color", "#F00 !important");
  append("body", element);
}

function createBorders(elements) {
  jq.each(elements, function (index, element) {
    var clone = jq(element);
    var position = clone.offset();
    var top = toInt(position.top);
    var left = toInt(position.left);
    var width = toInt(clone.outerWidth());
    var height = toInt(clone.outerHeight());
    border(border_width, width + border_padding * 2 + border_width * 2, top - border_width - border_padding, left - border_padding - border_width);
    border(border_width + 6, width + border_padding * 2 + border_width * 2 - 5, top + height + border_padding, left - border_padding - border_width);
    border(height + border_padding * 2, border_width, top - border_padding, left - border_padding - border_width);
    border(height + border_padding * 2, border_width, top - border_padding, left + width + border_padding);
  });
}

function mouseOver(event) {
  var element = jq(event.data.self);
  var body = jq("body");
  var bodyParent = jq("body").parent();

  if (element !== body ? element !== bodyParent : false) {
    createBorders(element);
  }
}

function mouseOut(event) {
  var element = jq(event.data.self);
  var body = jq("body");
  var bodyParent = jq("body").parent();

  if (element !== body ? element !== bodyParent : false) {
    remove(".canopy_companion_border");
  }
}

function mouseDown(element) {}

if (!exists("#canopy_companion")) {
  bindEach("*", "mouseover", function (event) {
    mouseOver(event);
  });
  bindEach("*", "mouseout", function (event) {
    mouseOut(event);
  });
  bindEach("*", "mousedown", function (element) {
    mouseDown(element);
  });
  append("body", inputs);
  click("#canopy_companion #go", function (_arg1) {
    var selector = value("#selector");
    remove(".canopy_companion_border");
    createBorders(find(selector));
  });
  click("#canopy_companion #clear", function (_arg2) {
    set("#selector", "");
    remove(".canopy_companion_border");
  });
  click("#canopy_companion #close", function (_arg3) {
    remove(".canopy_companion_border");
    remove("#canopy_companion");
  });
}