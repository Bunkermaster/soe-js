(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "tools": {
    "rotate": {
      "name": {
        "en": "rotating the globe",
        "pt": "girar o globo"
      },
      "file": "info_rotate"
    },
    "indicatrix": {
      "name": {
        "en": "the Tissot indicatrix",
        "pt": "a indicatriz de Tissot"
      },
      "file": "info_tissot"
    },
    "geodesic": {
      "name": {
        "en": "geodesics",
        "pt": "geodésicas"
      },
      "file": "info_geodesic"
    },
    "loxodrome": {
      "name": {
        "en": "loxodromes",
        "pt": "loxodrómias"
      },
      "file": "info_loxodrome"
    }
  },
  "projections": {
    "platecarre": {
      "file": "platecarre",
      "name": {
        "en": "the Plate Carrée projection",
        "pt": "projeção Equirectangular"
      }
    },
    "mercator": {
      "file": "mercator",
      "name": {
        "en": "the Mercator projection",
        "pt": "projecção de Mercator"
      }
    },
    "gallpeters": {
      "file": "gallpeters",
      "name": {
        "en": "the Gall-Peters projection",
        "pt": "projecção de Gall-Peters"
      }
    },
    "mollweide": {
      "file": "mollweide",
      "name": {
        "en": "the Mollweide projection",
        "pt": "projecção de Mollweide"
      }
    },
    "aziequi": {
      "file": "aziequi",
      "name": {
        "en": "the Azimuthal equidistant projection",
        "pt": "projecção azimutal equidistante"
      }
    },
    "gnomo": {
      "file": "gnomo",
      "name": {
        "en": "the Gnomonic projection",
        "pt": "projecção gnomônica"
      }
    },
    "stereo": {
      "file": "stereo",
      "name": {
        "en": "the Stereographic projection",
        "pt": "projeção estereográfica"
      }
    },
    "ortho": {
      "file": "ortho",
      "name": {
        "en": "the Orthographic projection",
        "pt": "projecção ortográfic"
      }
    }
  }
}
},{}],2:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Maps of the Earth",
    "pt": "Mapas da Terra"
  },
  "MORE_ABOUT": {
    "en": "More about",
    "pt": "Mais sobre"
  },
  "": {
    "en": "",
    "pt": ""
  }
}

},{}],3:[function(require,module,exports){
'use strict';

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init UI
var ui = new _ui2.default();
window.SoEUI = ui;

$(function () {
  ui.init();

  // Hook language change links
  $('[data-ui-lang-set]').on('click', function (ev) {
    var $target = $(ev.target);
    ui.setLanguage($target.attr('data-ui-lang-set'));
    $('a[data-ui-lang-set]').removeClass('active');
    $target.addClass('active');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook help files
  $('[data-ui-help]').on('click', function (ev) {
    ui.displayHelpFile($(ev.target).attr('data-ui-help'), 'right');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook info pane close buttons
  $('.info_pane-close').click(function (ev) {
    ui.hideInfo();
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Set keyboard commands
  $(window).on('keypress', function (ev) {
    // 1 - Toggle countries visible
    if (ev.which === '1'.charCodeAt()) {
      ui.setCountriesVisible(!ui.getCountriesVisible());
      // 2 - Toggle graticule visible
    } else if (ev.which === '2'.charCodeAt()) {
      ui.setGraticuleVisible(!ui.getGraticuleVisible());
      // 3 - Toggle raster visible
    } else if (ev.which === '3'.charCodeAt()) {
      ui.setRasterVisible(!ui.getRasterVisible());
    }
  });
});

},{"./ui":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _strings = require('../config/strings.json');

var _strings2 = _interopRequireDefault(_strings);

var _help = require('../config/help.json');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.language = 'en';
    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;

    this.helpFile = undefined;
    this.tool = 'rotate';
    this.projection = 'platecarre';
  }

  _createClass(UI, [{
    key: 'init',
    value: function init() {
      this.setLanguage('en');
      this.setTool('rotate');
      this.setProjection('platecarre');
      this.initToolButtons();
      this.initProjectionButtons();
      this.initHelpBanners();
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(langCode) {
      this.language = langCode;

      // Sets a language class in the body
      $('body').removeClass(function (index, className) {
        return (className.match(/(^|\s)lang-\S+/g) || []).join(' ');
      });
      $('body').addClass('lang-' + langCode);

      // Reload the current help file with the new language
      if (this.helpFile !== undefined) {
        this.displayHelpFile();
      }

      // Inject translatable strings
      this.injectStrings();
    }
  }, {
    key: 'injectStrings',
    value: function injectStrings() {
      var _this = this;

      $('[data-ui-str]').each(function (i, element) {
        $(element).html(_this.str($(element).attr('data-ui-str')));
      });
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage() {
      return this.language;
    }
  }, {
    key: 'displayHelpFile',
    value: function displayHelpFile() {
      var _this2 = this;

      var helpFileID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.helpFile;
      var pane = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.helpPane;

      d3.text('./txt/' + this.getLanguage() + '/' + helpFileID + '.html', function (error, text) {
        if (error) throw error;
        _this2.displayInfo(text, pane);
        _this2.helpFile = helpFileID;
        _this2.helpPane = pane;
      });
    }
  }, {
    key: 'getCountriesVisible',
    value: function getCountriesVisible() {
      return this.isCountriesVisible;
    }
  }, {
    key: 'getGraticuleVisible',
    value: function getGraticuleVisible() {
      return this.isGraticuleVisible;
    }
  }, {
    key: 'getRasterVisible',
    value: function getRasterVisible() {
      return this.isRasterVisible;
    }
  }, {
    key: 'setCountriesVisible',
    value: function setCountriesVisible(isVisible) {
      this.isCountriesVisible = !!isVisible;
      $('.boundary').css({ visibility: this.getCountriesVisible() ? 'visible' : 'hidden' });
    }
  }, {
    key: 'setGraticuleVisible',
    value: function setGraticuleVisible(isVisible) {
      this.isGraticuleVisible = !!isVisible;
      $('.graticule').css({ visibility: this.getGraticuleVisible() ? 'visible' : 'hidden' });
    }
  }, {
    key: 'setRasterVisible',
    value: function setRasterVisible(isVisible) {
      this.isRasterVisible = !!isVisible;
      $('.land').css({ visibility: !isVisible ? 'visible' : 'hidden' });
      $('#map_tag canvas').css({ visibility: this.getRasterVisible() ? 'visible' : 'hidden' });
    }
  }, {
    key: 'str',
    value: function str(identifier) {
      if (_strings2.default[identifier] !== undefined && _strings2.default[identifier][this.getLanguage()] !== undefined) {
        return _strings2.default[identifier][this.getLanguage()];
      }
      console.trace('Requested undefined UI String \'' + identifier + '\'');
      return '';
    }
  }, {
    key: 'displayInfo',
    value: function displayInfo(content, pane) {
      console.log(pane);
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');
      $('.map_tag').addClass('docked-' + pane);

      $('.info_pane-' + pane + ' .content').html(content);
      $('.info_pane').removeClass('visible');
      $('.info_pane-' + pane).addClass('visible');
    }
  }, {
    key: 'hideInfo',
    value: function hideInfo() {
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');

      $('.info_pane-left').removeClass('visible');
      $('.info_pane-right').removeClass('visible');
    }
  }, {
    key: 'hideInfoLeft',
    value: function hideInfoLeft() {
      $('.map_tag').removeClass('docked-left');
      $('.info_pane-left').removeClass('visible');
    }
  }, {
    key: 'hideInfoRight',
    value: function hideInfoRight() {
      $('.map_tag').removeClass('docked-right');
      $('.info_pane-right').removeClass('visible');
    }
  }, {
    key: 'initToolButtons',
    value: function initToolButtons() {
      var _this3 = this;

      $('[data-ui-tool]').on('click', function (ev) {
        _this3.setTool($(ev.target).attr('data-ui-tool'));
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'getTool',
    value: function getTool() {
      return this.tool;
    }
  }, {
    key: 'setTool',
    value: function setTool(aTool) {
      this.tool = aTool;
      $('[data-ui-tool]').removeClass('active');
      $('[data-ui-tool=' + aTool + ']').addClass('active');
      updateMap();
      this.hideInfoLeft();
      this.showHelpBanner('left', 'tools', aTool);
    }
  }, {
    key: 'initProjectionButtons',
    value: function initProjectionButtons() {
      var _this4 = this;

      $('[data-ui-projection]').on('click', function (ev) {
        _this4.setProjection($(ev.target).attr('data-ui-projection'));
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'getProjection',
    value: function getProjection() {
      return this.projection;
    }
  }, {
    key: 'setProjection',
    value: function setProjection(aProjection) {
      this.projection = aProjection;
      $('[data-ui-projection]').removeClass('active');
      $('[data-ui-projection=' + aProjection + ']').addClass('active');
      updateMap();
      this.hideInfoRight();
      this.showHelpBanner('right', 'projections', aProjection);
    }
  }, {
    key: 'initHelpBanners',
    value: function initHelpBanners() {
      var _this5 = this;

      $('.help-banner-left').on('click', function (ev) {
        _this5.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'left');
        ev.preventDefault();
        ev.stopPropagation();
      });

      $('.help-banner-right').on('click', function (ev) {
        _this5.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'right');
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'getHelpBannerText',
    value: function getHelpBannerText(category, item) {
      return this.str('MORE_ABOUT') + ' ' + _help2.default[category][item].name[this.getLanguage()];
    }
  }, {
    key: 'getHelpBannerPage',
    value: function getHelpBannerPage(category, item) {
      return _help2.default[category][item].file;
    }
  }, {
    key: 'showHelpBanner',
    value: function showHelpBanner(bannerID, category, item) {
      $('.help-banner-' + bannerID).html(this.getHelpBannerText(category, item)).attr('data-ui-banner-help', this.getHelpBannerPage(category, item)).fadeIn().css('display', 'inline-block');
    }
  }, {
    key: 'hideHelpBanner',
    value: function hideHelpBanner(bannerID) {
      $('.help-banner-' + bannerID).fadeOut();
    }
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/help.json":1,"../config/strings.json":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTs7Ozs7O0FBRUE7QUFDQSxJQUFNLEtBQUssa0JBQVg7QUFDQSxPQUFPLEtBQVAsR0FBZSxFQUFmOztBQUVBLEVBQUUsWUFBTTtBQUNOLEtBQUcsSUFBSDs7QUFFQTtBQUNBLElBQUUsb0JBQUYsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDMUMsUUFBTSxVQUFVLEVBQUUsR0FBRyxNQUFMLENBQWhCO0FBQ0EsT0FB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QixDQUFyQixFQUErRCxNQUEvRDtBQUNBLFdBQUcsY0FBSDtBQUNBLFdBQUcsZUFBSDtBQUNELE9BSkQ7O0FBTUEsUUFBRSxvQkFBRixFQUF3QixFQUF4QixDQUEyQixPQUEzQixFQUFvQyxVQUFDLEVBQUQsRUFBUTtBQUMxQyxlQUFLLGVBQUwsQ0FBcUIsRUFBRSxHQUFHLE1BQUwsRUFBYSxJQUFiLENBQWtCLHFCQUFsQixDQUFyQixFQUErRCxPQUEvRDtBQUNBLFdBQUcsY0FBSDtBQUNBLFdBQUcsZUFBSDtBQUNELE9BSkQ7QUFLRDs7O3NDQUVpQixRLEVBQVUsSSxFQUFNO0FBQ2hDLGFBQVUsS0FBSyxHQUFMLENBQVMsWUFBVCxDQUFWLFNBQW9DLGVBQVEsUUFBUixFQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUE2QixLQUFLLFdBQUwsRUFBN0IsQ0FBcEM7QUFDRDs7O3NDQUVpQixRLEVBQVUsSSxFQUFNO0FBQ2hDLGFBQU8sZUFBUSxRQUFSLEVBQWtCLElBQWxCLEVBQXdCLElBQS9CO0FBQ0Q7OzttQ0FFYyxRLEVBQVUsUSxFQUFVLEksRUFBTTtBQUN2QywwQkFBa0IsUUFBbEIsRUFDRyxJQURILENBQ1EsS0FBSyxpQkFBTCxDQUF1QixRQUF2QixFQUFpQyxJQUFqQyxDQURSLEVBRUcsSUFGSCxDQUVRLHFCQUZSLEVBRStCLEtBQUssaUJBQUwsQ0FBdUIsUUFBdkIsRUFBaUMsSUFBakMsQ0FGL0IsRUFHRyxNQUhILEdBSUcsR0FKSCxDQUlPLFNBSlAsRUFJa0IsY0FKbEI7QUFLRDs7O21DQUVjLFEsRUFBVTtBQUN2QiwwQkFBa0IsUUFBbEIsRUFBOEIsT0FBOUI7QUFDRDs7Ozs7O2tCQXRNa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidG9vbHNcIjoge1xuICAgIFwicm90YXRlXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJyb3RhdGluZyB0aGUgZ2xvYmVcIixcbiAgICAgICAgXCJwdFwiOiBcImdpcmFyIG8gZ2xvYm9cIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fcm90YXRlXCJcbiAgICB9LFxuICAgIFwiaW5kaWNhdHJpeFwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFRpc3NvdCBpbmRpY2F0cml4XCIsXG4gICAgICAgIFwicHRcIjogXCJhIGluZGljYXRyaXogZGUgVGlzc290XCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3Rpc3NvdFwiXG4gICAgfSxcbiAgICBcImdlb2Rlc2ljXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJnZW9kZXNpY3NcIixcbiAgICAgICAgXCJwdFwiOiBcImdlb2TDqXNpY2FzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2dlb2Rlc2ljXCJcbiAgICB9LFxuICAgIFwibG94b2Ryb21lXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJsb3hvZHJvbWVzXCIsXG4gICAgICAgIFwicHRcIjogXCJsb3hvZHLDs21pYXNcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fbG94b2Ryb21lXCJcbiAgICB9XG4gIH0sXG4gIFwicHJvamVjdGlvbnNcIjoge1xuICAgIFwicGxhdGVjYXJyZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJwbGF0ZWNhcnJlXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFBsYXRlIENhcnLDqWUgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBFcXVpcmVjdGFuZ3VsYXJcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtZXJjYXRvclwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtZXJjYXRvclwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNZXJjYXRvciBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBkZSBNZXJjYXRvclwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImdhbGxwZXRlcnNcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ2FsbHBldGVyc1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBHYWxsLVBldGVycyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBkZSBHYWxsLVBldGVyc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm1vbGx3ZWlkZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtb2xsd2VpZGVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTW9sbHdlaWRlIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plY8Onw6NvIGRlIE1vbGx3ZWlkZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImF6aWVxdWlcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiYXppZXF1aVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBBemltdXRoYWwgZXF1aWRpc3RhbnQgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gYXppbXV0YWwgZXF1aWRpc3RhbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ25vbW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ25vbW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR25vbW9uaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gZ25vbcO0bmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcInN0ZXJlb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJzdGVyZW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIGVzdGVyZW9ncsOhZmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm9ydGhvXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm9ydGhvXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBvcnRvZ3LDoWZpY1wiXG4gICAgICB9XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkFQUF9USVRMRVwiOiB7XG4gICAgXCJlblwiOiBcIk1hcHMgb2YgdGhlIEVhcnRoXCIsXG4gICAgXCJwdFwiOiBcIk1hcGFzIGRhIFRlcnJhXCJcbiAgfSxcbiAgXCJNT1JFX0FCT1VUXCI6IHtcbiAgICBcImVuXCI6IFwiTW9yZSBhYm91dFwiLFxuICAgIFwicHRcIjogXCJNYWlzIHNvYnJlXCJcbiAgfSxcbiAgXCJcIjoge1xuICAgIFwiZW5cIjogXCJcIixcbiAgICBcInB0XCI6IFwiXCJcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICB1aS5pbml0KCk7XG5cbiAgLy8gSG9vayBsYW5ndWFnZSBjaGFuZ2UgbGlua3NcbiAgJCgnW2RhdGEtdWktbGFuZy1zZXRdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICB1aS5zZXRMYW5ndWFnZSgkdGFyZ2V0LmF0dHIoJ2RhdGEtdWktbGFuZy1zZXQnKSk7XG4gICAgJCgnYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGhlbHAgZmlsZXNcbiAgJCgnW2RhdGEtdWktaGVscF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICB1aS5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktaGVscCcpLCAncmlnaHQnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGluZm8gcGFuZSBjbG9zZSBidXR0b25zXG4gICQoJy5pbmZvX3BhbmUtY2xvc2UnKS5jbGljaygoZXYpID0+IHtcbiAgICB1aS5oaWRlSW5mbygpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuaW1wb3J0IEhlbHBDZmcgZnJvbSAnLi4vY29uZmlnL2hlbHAuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9ICdlbic7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5oZWxwRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvb2wgPSAncm90YXRlJztcbiAgICB0aGlzLnByb2plY3Rpb24gPSAncGxhdGVjYXJyZSc7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgdGhpcy5zZXRUb29sKCdyb3RhdGUnKTtcbiAgICB0aGlzLnNldFByb2plY3Rpb24oJ3BsYXRlY2FycmUnKTtcbiAgICB0aGlzLmluaXRUb29sQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdFByb2plY3Rpb25CdXR0b25zKCk7XG4gICAgdGhpcy5pbml0SGVscEJhbm5lcnMoKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmdDb2RlO1xuXG4gICAgLy8gU2V0cyBhIGxhbmd1YWdlIGNsYXNzIGluIHRoZSBib2R5XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCgvKF58XFxzKWxhbmctXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgIH0pO1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhgbGFuZy0ke2xhbmdDb2RlfWApO1xuXG4gICAgLy8gUmVsb2FkIHRoZSBjdXJyZW50IGhlbHAgZmlsZSB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2VcbiAgICBpZiAodGhpcy5oZWxwRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgpO1xuICAgIH1cblxuICAgIC8vIEluamVjdCB0cmFuc2xhdGFibGUgc3RyaW5nc1xuICAgIHRoaXMuaW5qZWN0U3RyaW5ncygpO1xuICB9XG5cbiAgaW5qZWN0U3RyaW5ncygpIHtcbiAgICAkKCdbZGF0YS11aS1zdHJdJykuZWFjaCgoaSwgZWxlbWVudCkgPT4ge1xuICAgICAgJChlbGVtZW50KS5odG1sKHRoaXMuc3RyKCQoZWxlbWVudCkuYXR0cignZGF0YS11aS1zdHInKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUsIHBhbmUgPSB0aGlzLmhlbHBQYW5lKSB7XG4gICAgZDMudGV4dChgLi90eHQvJHt0aGlzLmdldExhbmd1YWdlKCl9LyR7aGVscEZpbGVJRH0uaHRtbGAsIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHRoaXMuZGlzcGxheUluZm8odGV4dCwgcGFuZSk7XG4gICAgICB0aGlzLmhlbHBGaWxlID0gaGVscEZpbGVJRDtcbiAgICAgIHRoaXMuaGVscFBhbmUgPSBwYW5lO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHN0cihpZGVudGlmaWVyKSB7XG4gICAgaWYgKFVJU3RyaW5nc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgY29uc29sZS50cmFjZShgUmVxdWVzdGVkIHVuZGVmaW5lZCBVSSBTdHJpbmcgJyR7aWRlbnRpZmllcn0nYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZGlzcGxheUluZm8oY29udGVudCwgcGFuZSkge1xuICAgIGNvbnNvbGUubG9nKHBhbmUpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcyhgZG9ja2VkLSR7cGFuZX1gKTtcblxuICAgICQoYC5pbmZvX3BhbmUtJHtwYW5lfSAuY29udGVudGApLmh0bWwoY29udGVudCk7XG4gICAgJCgnLmluZm9fcGFuZScpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9YCkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvKCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG5cbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9MZWZ0KCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvUmlnaHQoKSB7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBpbml0VG9vbEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuc2V0VG9vbCgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS10b29sJykpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy50b29sO1xuICB9XG5cbiAgc2V0VG9vbChhVG9vbCkge1xuICAgIHRoaXMudG9vbCA9IGFUb29sO1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYFtkYXRhLXVpLXRvb2w9JHthVG9vbH1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHVwZGF0ZU1hcCgpO1xuICAgIHRoaXMuaGlkZUluZm9MZWZ0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcignbGVmdCcsICd0b29scycsIGFUb29sKTtcbiAgfVxuXG4gIGluaXRQcm9qZWN0aW9uQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRQcm9qZWN0aW9uKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXByb2plY3Rpb24nKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQcm9qZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Rpb247XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uKGFQcm9qZWN0aW9uKSB7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gYVByb2plY3Rpb247XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktcHJvamVjdGlvbj0ke2FQcm9qZWN0aW9ufV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb1JpZ2h0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcigncmlnaHQnLCAncHJvamVjdGlvbnMnLCBhUHJvamVjdGlvbik7XG4gIH1cblxuICBpbml0SGVscEJhbm5lcnMoKSB7XG4gICAgJCgnLmhlbHAtYmFubmVyLWxlZnQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdsZWZ0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKCcuaGVscC1iYW5uZXItcmlnaHQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdyaWdodCcpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclRleHQoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zdHIoJ01PUkVfQUJPVVQnKX0gJHtIZWxwQ2ZnW2NhdGVnb3J5XVtpdGVtXS5uYW1lW3RoaXMuZ2V0TGFuZ3VhZ2UoKV19YDtcbiAgfVxuXG4gIGdldEhlbHBCYW5uZXJQYWdlKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIEhlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLmZpbGU7XG4gIH1cblxuICBzaG93SGVscEJhbm5lcihiYW5uZXJJRCwgY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKVxuICAgICAgLmh0bWwodGhpcy5nZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcsIHRoaXMuZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pKVxuICAgICAgLmZhZGVJbigpXG4gICAgICAuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICB9XG5cbiAgaGlkZUhlbHBCYW5uZXIoYmFubmVySUQpIHtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKS5mYWRlT3V0KCk7XG4gIH1cbn1cbiJdfQ==