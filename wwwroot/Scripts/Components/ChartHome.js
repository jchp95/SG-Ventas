"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/* jshint ignore:start */
/* global React, Chart */
var ChartHome = /*#__PURE__*/function (_React$Component) {
  function ChartHome(props) {
    var _this;
    _classCallCheck(this, ChartHome);
    _this = _callSuper(this, ChartHome, [props]);
    _this.chartRef = React.createRef();
    return _this;
  }
  _inherits(ChartHome, _React$Component);
  return _createClass(ChartHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ctx = this.chartRef.current.getContext('2d');
      var chartType = this.props.type || 'bar';
      var chartData = {};
      var chartOptions = {};
      // Configuración según el tipo de gráfico
      if (chartType === 'bar') {
        chartData = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Ventas mes anterior',
            data: [100, 140, 160, 80, 180, 150, 190, 170, 210, 200, 230, 250],
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderRadius: 8,
            borderSkipped: false
          }, {
            label: 'Ventas mes actual',
            data: [120, 150, 180, 90, 200, 170, 210, 190, 230, 220, 250, 270],
            backgroundColor: 'rgba(0, 0, 255, 0.7)',
            borderRadius: 8,
            borderSkipped: false
          }]
        };
        chartOptions = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: 'var(--primary-dark)'
              }
            },
            y: {
              grid: {
                color: 'rgba(67,97,238,0.08)'
              },
              ticks: {
                color: 'var(--primary-dark)'
              }
            }
          }
        };
      } else if (chartType === 'line') {
        chartData = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Productos vendidos mes anterior',
            data: [70, 90, 110, 60, 140, 120, 160, 130, 180, 170, 190, 210],
            fill: true,
            borderColor: 'rgba(255, 0, 0, 0.7)',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(255, 0, 0, 0.7)'
          }, {
            label: 'Productos vendidos mes actual',
            data: [80, 100, 130, 70, 160, 140, 180, 150, 200, 190, 210, 230],
            fill: true,
            borderColor: 'rgba(0, 0, 255, 0.7)',
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(0, 0, 255, 0.7)'
          }]
        };
        chartOptions = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: 'var(--primary-dark)'
              }
            },
            y: {
              grid: {
                color: 'rgba(255,159,64,0.08)'
              },
              ticks: {
                color: 'var(--primary-dark)'
              }
            }
          }
        };
      } else if (chartType === 'doughnut') {
        chartData = {
          labels: ['Clientes nuevos', 'Clientes recurrentes', 'Clientes inactivos'],
          datasets: [{
            label: 'Clientes',
            data: [45, 120, 30],
            backgroundColor: ['rgba(0, 0, 255, 0.7)', 'rgba(255, 94, 0, 0.7)', 'rgba(255, 0, 0, 0.7)'],
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.8)'
          }]
        };
        chartOptions = {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true
            }
          }
        };
      }
      this.chart = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: chartOptions
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.chart) this.chart.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          width: '100%',
          height: '180px'
        }
      }, /*#__PURE__*/React.createElement("canvas", {
        ref: this.chartRef,
        style: {
          width: '100%',
          height: '180px'
        }
      }));
    }
  }]);
}(React.Component);
window.ChartHome = ChartHome;

/* jshint ignore:end */