(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) a(l);
  new MutationObserver((l) => {
    for (const d of l)
      if (d.type === "childList")
        for (const f of d.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && a(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(l) {
    const d = {};
    return (
      l.integrity && (d.integrity = l.integrity),
      l.referrerPolicy && (d.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function a(l) {
    if (l.ep) return;
    l.ep = !0;
    const d = s(l);
    fetch(l.href, d);
  }
})();
var Oa = { exports: {} },
  Yr = {},
  Aa = { exports: {} },
  se = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hd;
function pm() {
  if (hd) return se;
  hd = 1;
  var i = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    d = Symbol.for("react.provider"),
    f = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    S = Symbol.for("react.lazy"),
    E = Symbol.iterator;
  function x(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (E && C[E]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    I = Object.assign,
    L = {};
  function R(C, _, ie) {
    (this.props = C),
      (this.context = _),
      (this.refs = L),
      (this.updater = ie || T);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (C, _) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, C, _, "setState");
    }),
    (R.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    });
  function M() {}
  M.prototype = R.prototype;
  function $(C, _, ie) {
    (this.props = C),
      (this.context = _),
      (this.refs = L),
      (this.updater = ie || T);
  }
  var G = ($.prototype = new M());
  (G.constructor = $), I(G, R.prototype), (G.isPureReactComponent = !0);
  var W = Array.isArray,
    te = Object.prototype.hasOwnProperty,
    le = { current: null },
    Z = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ne(C, _, ie) {
    var oe,
      ce = {},
      de = null,
      ge = null;
    if (_ != null)
      for (oe in (_.ref !== void 0 && (ge = _.ref),
      _.key !== void 0 && (de = "" + _.key),
      _))
        te.call(_, oe) && !Z.hasOwnProperty(oe) && (ce[oe] = _[oe]);
    var pe = arguments.length - 2;
    if (pe === 1) ce.children = ie;
    else if (1 < pe) {
      for (var ke = Array(pe), rt = 0; rt < pe; rt++)
        ke[rt] = arguments[rt + 2];
      ce.children = ke;
    }
    if (C && C.defaultProps)
      for (oe in ((pe = C.defaultProps), pe))
        ce[oe] === void 0 && (ce[oe] = pe[oe]);
    return {
      $$typeof: i,
      type: C,
      key: de,
      ref: ge,
      props: ce,
      _owner: le.current,
    };
  }
  function re(C, _) {
    return {
      $$typeof: i,
      type: C.type,
      key: _,
      ref: C.ref,
      props: C.props,
      _owner: C._owner,
    };
  }
  function ae(C) {
    return typeof C == "object" && C !== null && C.$$typeof === i;
  }
  function me(C) {
    var _ = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (ie) {
        return _[ie];
      })
    );
  }
  var mt = /\/+/g;
  function qe(C, _) {
    return typeof C == "object" && C !== null && C.key != null
      ? me("" + C.key)
      : _.toString(36);
  }
  function Me(C, _, ie, oe, ce) {
    var de = typeof C;
    (de === "undefined" || de === "boolean") && (C = null);
    var ge = !1;
    if (C === null) ge = !0;
    else
      switch (de) {
        case "string":
        case "number":
          ge = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case i:
            case r:
              ge = !0;
          }
      }
    if (ge)
      return (
        (ge = C),
        (ce = ce(ge)),
        (C = oe === "" ? "." + qe(ge, 0) : oe),
        W(ce)
          ? ((ie = ""),
            C != null && (ie = C.replace(mt, "$&/") + "/"),
            Me(ce, _, ie, "", function (rt) {
              return rt;
            }))
          : ce != null &&
            (ae(ce) &&
              (ce = re(
                ce,
                ie +
                  (!ce.key || (ge && ge.key === ce.key)
                    ? ""
                    : ("" + ce.key).replace(mt, "$&/") + "/") +
                  C,
              )),
            _.push(ce)),
        1
      );
    if (((ge = 0), (oe = oe === "" ? "." : oe + ":"), W(C)))
      for (var pe = 0; pe < C.length; pe++) {
        de = C[pe];
        var ke = oe + qe(de, pe);
        ge += Me(de, _, ie, ke, ce);
      }
    else if (((ke = x(C)), typeof ke == "function"))
      for (C = ke.call(C), pe = 0; !(de = C.next()).done; )
        (de = de.value),
          (ke = oe + qe(de, pe++)),
          (ge += Me(de, _, ie, ke, ce));
    else if (de === "object")
      throw (
        ((_ = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (_ === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : _) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return ge;
  }
  function Fe(C, _, ie) {
    if (C == null) return C;
    var oe = [],
      ce = 0;
    return (
      Me(C, oe, "", "", function (de) {
        return _.call(ie, de, ce++);
      }),
      oe
    );
  }
  function Pe(C) {
    if (C._status === -1) {
      var _ = C._result;
      (_ = _()),
        _.then(
          function (ie) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = ie));
          },
          function (ie) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = ie));
          },
        ),
        C._status === -1 && ((C._status = 0), (C._result = _));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ye = { current: null },
    F = { transition: null },
    Q = {
      ReactCurrentDispatcher: ye,
      ReactCurrentBatchConfig: F,
      ReactCurrentOwner: le,
    };
  function B() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (se.Children = {
      map: Fe,
      forEach: function (C, _, ie) {
        Fe(
          C,
          function () {
            _.apply(this, arguments);
          },
          ie,
        );
      },
      count: function (C) {
        var _ = 0;
        return (
          Fe(C, function () {
            _++;
          }),
          _
        );
      },
      toArray: function (C) {
        return (
          Fe(C, function (_) {
            return _;
          }) || []
        );
      },
      only: function (C) {
        if (!ae(C))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return C;
      },
    }),
    (se.Component = R),
    (se.Fragment = s),
    (se.Profiler = l),
    (se.PureComponent = $),
    (se.StrictMode = a),
    (se.Suspense = h),
    (se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q),
    (se.act = B),
    (se.cloneElement = function (C, _, ie) {
      if (C == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            C +
            ".",
        );
      var oe = I({}, C.props),
        ce = C.key,
        de = C.ref,
        ge = C._owner;
      if (_ != null) {
        if (
          (_.ref !== void 0 && ((de = _.ref), (ge = le.current)),
          _.key !== void 0 && (ce = "" + _.key),
          C.type && C.type.defaultProps)
        )
          var pe = C.type.defaultProps;
        for (ke in _)
          te.call(_, ke) &&
            !Z.hasOwnProperty(ke) &&
            (oe[ke] = _[ke] === void 0 && pe !== void 0 ? pe[ke] : _[ke]);
      }
      var ke = arguments.length - 2;
      if (ke === 1) oe.children = ie;
      else if (1 < ke) {
        pe = Array(ke);
        for (var rt = 0; rt < ke; rt++) pe[rt] = arguments[rt + 2];
        oe.children = pe;
      }
      return {
        $$typeof: i,
        type: C.type,
        key: ce,
        ref: de,
        props: oe,
        _owner: ge,
      };
    }),
    (se.createContext = function (C) {
      return (
        (C = {
          $$typeof: f,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (C.Provider = { $$typeof: d, _context: C }),
        (C.Consumer = C)
      );
    }),
    (se.createElement = ne),
    (se.createFactory = function (C) {
      var _ = ne.bind(null, C);
      return (_.type = C), _;
    }),
    (se.createRef = function () {
      return { current: null };
    }),
    (se.forwardRef = function (C) {
      return { $$typeof: m, render: C };
    }),
    (se.isValidElement = ae),
    (se.lazy = function (C) {
      return { $$typeof: S, _payload: { _status: -1, _result: C }, _init: Pe };
    }),
    (se.memo = function (C, _) {
      return { $$typeof: g, type: C, compare: _ === void 0 ? null : _ };
    }),
    (se.startTransition = function (C) {
      var _ = F.transition;
      F.transition = {};
      try {
        C();
      } finally {
        F.transition = _;
      }
    }),
    (se.unstable_act = B),
    (se.useCallback = function (C, _) {
      return ye.current.useCallback(C, _);
    }),
    (se.useContext = function (C) {
      return ye.current.useContext(C);
    }),
    (se.useDebugValue = function () {}),
    (se.useDeferredValue = function (C) {
      return ye.current.useDeferredValue(C);
    }),
    (se.useEffect = function (C, _) {
      return ye.current.useEffect(C, _);
    }),
    (se.useId = function () {
      return ye.current.useId();
    }),
    (se.useImperativeHandle = function (C, _, ie) {
      return ye.current.useImperativeHandle(C, _, ie);
    }),
    (se.useInsertionEffect = function (C, _) {
      return ye.current.useInsertionEffect(C, _);
    }),
    (se.useLayoutEffect = function (C, _) {
      return ye.current.useLayoutEffect(C, _);
    }),
    (se.useMemo = function (C, _) {
      return ye.current.useMemo(C, _);
    }),
    (se.useReducer = function (C, _, ie) {
      return ye.current.useReducer(C, _, ie);
    }),
    (se.useRef = function (C) {
      return ye.current.useRef(C);
    }),
    (se.useState = function (C) {
      return ye.current.useState(C);
    }),
    (se.useSyncExternalStore = function (C, _, ie) {
      return ye.current.useSyncExternalStore(C, _, ie);
    }),
    (se.useTransition = function () {
      return ye.current.useTransition();
    }),
    (se.version = "18.3.1"),
    se
  );
}
var md;
function ll() {
  return md || ((md = 1), (Aa.exports = pm())), Aa.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gd;
function hm() {
  if (gd) return Yr;
  gd = 1;
  var i = ll(),
    r = Symbol.for("react.element"),
    s = Symbol.for("react.fragment"),
    a = Object.prototype.hasOwnProperty,
    l = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(m, h, g) {
    var S,
      E = {},
      x = null,
      T = null;
    g !== void 0 && (x = "" + g),
      h.key !== void 0 && (x = "" + h.key),
      h.ref !== void 0 && (T = h.ref);
    for (S in h) a.call(h, S) && !d.hasOwnProperty(S) && (E[S] = h[S]);
    if (m && m.defaultProps)
      for (S in ((h = m.defaultProps), h)) E[S] === void 0 && (E[S] = h[S]);
    return {
      $$typeof: r,
      type: m,
      key: x,
      ref: T,
      props: E,
      _owner: l.current,
    };
  }
  return (Yr.Fragment = s), (Yr.jsx = f), (Yr.jsxs = f), Yr;
}
var vd;
function mm() {
  return vd || ((vd = 1), (Oa.exports = hm())), Oa.exports;
}
var v = mm(),
  P = ll(),
  ws = {},
  Da = { exports: {} },
  et = {},
  Ma = { exports: {} },
  za = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yd;
function gm() {
  return (
    yd ||
      ((yd = 1),
      (function (i) {
        function r(F, Q) {
          var B = F.length;
          F.push(Q);
          e: for (; 0 < B; ) {
            var C = (B - 1) >>> 1,
              _ = F[C];
            if (0 < l(_, Q)) (F[C] = Q), (F[B] = _), (B = C);
            else break e;
          }
        }
        function s(F) {
          return F.length === 0 ? null : F[0];
        }
        function a(F) {
          if (F.length === 0) return null;
          var Q = F[0],
            B = F.pop();
          if (B !== Q) {
            F[0] = B;
            e: for (var C = 0, _ = F.length, ie = _ >>> 1; C < ie; ) {
              var oe = 2 * (C + 1) - 1,
                ce = F[oe],
                de = oe + 1,
                ge = F[de];
              if (0 > l(ce, B))
                de < _ && 0 > l(ge, ce)
                  ? ((F[C] = ge), (F[de] = B), (C = de))
                  : ((F[C] = ce), (F[oe] = B), (C = oe));
              else if (de < _ && 0 > l(ge, B))
                (F[C] = ge), (F[de] = B), (C = de);
              else break e;
            }
          }
          return Q;
        }
        function l(F, Q) {
          var B = F.sortIndex - Q.sortIndex;
          return B !== 0 ? B : F.id - Q.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var d = performance;
          i.unstable_now = function () {
            return d.now();
          };
        } else {
          var f = Date,
            m = f.now();
          i.unstable_now = function () {
            return f.now() - m;
          };
        }
        var h = [],
          g = [],
          S = 1,
          E = null,
          x = 3,
          T = !1,
          I = !1,
          L = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          M = typeof clearTimeout == "function" ? clearTimeout : null,
          $ = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function G(F) {
          for (var Q = s(g); Q !== null; ) {
            if (Q.callback === null) a(g);
            else if (Q.startTime <= F)
              a(g), (Q.sortIndex = Q.expirationTime), r(h, Q);
            else break;
            Q = s(g);
          }
        }
        function W(F) {
          if (((L = !1), G(F), !I))
            if (s(h) !== null) (I = !0), Pe(te);
            else {
              var Q = s(g);
              Q !== null && ye(W, Q.startTime - F);
            }
        }
        function te(F, Q) {
          (I = !1), L && ((L = !1), M(ne), (ne = -1)), (T = !0);
          var B = x;
          try {
            for (
              G(Q), E = s(h);
              E !== null && (!(E.expirationTime > Q) || (F && !me()));

            ) {
              var C = E.callback;
              if (typeof C == "function") {
                (E.callback = null), (x = E.priorityLevel);
                var _ = C(E.expirationTime <= Q);
                (Q = i.unstable_now()),
                  typeof _ == "function"
                    ? (E.callback = _)
                    : E === s(h) && a(h),
                  G(Q);
              } else a(h);
              E = s(h);
            }
            if (E !== null) var ie = !0;
            else {
              var oe = s(g);
              oe !== null && ye(W, oe.startTime - Q), (ie = !1);
            }
            return ie;
          } finally {
            (E = null), (x = B), (T = !1);
          }
        }
        var le = !1,
          Z = null,
          ne = -1,
          re = 5,
          ae = -1;
        function me() {
          return !(i.unstable_now() - ae < re);
        }
        function mt() {
          if (Z !== null) {
            var F = i.unstable_now();
            ae = F;
            var Q = !0;
            try {
              Q = Z(!0, F);
            } finally {
              Q ? qe() : ((le = !1), (Z = null));
            }
          } else le = !1;
        }
        var qe;
        if (typeof $ == "function")
          qe = function () {
            $(mt);
          };
        else if (typeof MessageChannel < "u") {
          var Me = new MessageChannel(),
            Fe = Me.port2;
          (Me.port1.onmessage = mt),
            (qe = function () {
              Fe.postMessage(null);
            });
        } else
          qe = function () {
            R(mt, 0);
          };
        function Pe(F) {
          (Z = F), le || ((le = !0), qe());
        }
        function ye(F, Q) {
          ne = R(function () {
            F(i.unstable_now());
          }, Q);
        }
        (i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (F) {
            F.callback = null;
          }),
          (i.unstable_continueExecution = function () {
            I || T || ((I = !0), Pe(te));
          }),
          (i.unstable_forceFrameRate = function (F) {
            0 > F || 125 < F
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (re = 0 < F ? Math.floor(1e3 / F) : 5);
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (i.unstable_getFirstCallbackNode = function () {
            return s(h);
          }),
          (i.unstable_next = function (F) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = x;
            }
            var B = x;
            x = Q;
            try {
              return F();
            } finally {
              x = B;
            }
          }),
          (i.unstable_pauseExecution = function () {}),
          (i.unstable_requestPaint = function () {}),
          (i.unstable_runWithPriority = function (F, Q) {
            switch (F) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                F = 3;
            }
            var B = x;
            x = F;
            try {
              return Q();
            } finally {
              x = B;
            }
          }),
          (i.unstable_scheduleCallback = function (F, Q, B) {
            var C = i.unstable_now();
            switch (
              (typeof B == "object" && B !== null
                ? ((B = B.delay),
                  (B = typeof B == "number" && 0 < B ? C + B : C))
                : (B = C),
              F)
            ) {
              case 1:
                var _ = -1;
                break;
              case 2:
                _ = 250;
                break;
              case 5:
                _ = 1073741823;
                break;
              case 4:
                _ = 1e4;
                break;
              default:
                _ = 5e3;
            }
            return (
              (_ = B + _),
              (F = {
                id: S++,
                callback: Q,
                priorityLevel: F,
                startTime: B,
                expirationTime: _,
                sortIndex: -1,
              }),
              B > C
                ? ((F.sortIndex = B),
                  r(g, F),
                  s(h) === null &&
                    F === s(g) &&
                    (L ? (M(ne), (ne = -1)) : (L = !0), ye(W, B - C)))
                : ((F.sortIndex = _), r(h, F), I || T || ((I = !0), Pe(te))),
              F
            );
          }),
          (i.unstable_shouldYield = me),
          (i.unstable_wrapCallback = function (F) {
            var Q = x;
            return function () {
              var B = x;
              x = Q;
              try {
                return F.apply(this, arguments);
              } finally {
                x = B;
              }
            };
          });
      })(za)),
    za
  );
}
var xd;
function vm() {
  return xd || ((xd = 1), (Ma.exports = gm())), Ma.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wd;
function ym() {
  if (wd) return et;
  wd = 1;
  var i = ll(),
    r = vm();
  function s(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var a = new Set(),
    l = {};
  function d(e, t) {
    f(e, t), f(e + "Capture", t);
  }
  function f(e, t) {
    for (l[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var m = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    h = Object.prototype.hasOwnProperty,
    g =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    S = {},
    E = {};
  function x(e) {
    return h.call(E, e)
      ? !0
      : h.call(S, e)
        ? !1
        : g.test(e)
          ? (E[e] = !0)
          : ((S[e] = !0), !1);
  }
  function T(e, t, n, o) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function I(e, t, n, o) {
    if (t === null || typeof t > "u" || T(e, t, n, o)) return !0;
    if (o) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function L(e, t, n, o, u, c, p) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = o),
      (this.attributeNamespace = u),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = c),
      (this.removeEmptyString = p);
  }
  var R = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      R[e] = new L(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      R[t] = new L(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        R[e] = new L(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      R[e] = new L(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        R[e] = new L(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      R[e] = new L(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      R[e] = new L(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      R[e] = new L(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      R[e] = new L(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var M = /[\-:]([a-z])/g;
  function $(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(M, $);
      R[t] = new L(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(M, $);
        R[t] = new L(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(M, $);
      R[t] = new L(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      R[e] = new L(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (R.xlinkHref = new L(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      R[e] = new L(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function G(e, t, n, o) {
    var u = R.hasOwnProperty(t) ? R[t] : null;
    (u !== null
      ? u.type !== 0
      : o ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (I(t, n, u, o) && (n = null),
      o || u === null
        ? x(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : u.mustUseProperty
          ? (e[u.propertyName] = n === null ? (u.type === 3 ? !1 : "") : n)
          : ((t = u.attributeName),
            (o = u.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((u = u.type),
                (n = u === 3 || (u === 4 && n === !0) ? "" : "" + n),
                o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n))));
  }
  var W = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    te = Symbol.for("react.element"),
    le = Symbol.for("react.portal"),
    Z = Symbol.for("react.fragment"),
    ne = Symbol.for("react.strict_mode"),
    re = Symbol.for("react.profiler"),
    ae = Symbol.for("react.provider"),
    me = Symbol.for("react.context"),
    mt = Symbol.for("react.forward_ref"),
    qe = Symbol.for("react.suspense"),
    Me = Symbol.for("react.suspense_list"),
    Fe = Symbol.for("react.memo"),
    Pe = Symbol.for("react.lazy"),
    ye = Symbol.for("react.offscreen"),
    F = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (F && e[F]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var B = Object.assign,
    C;
  function _(e) {
    if (C === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        C = (t && t[1]) || "";
      }
    return (
      `
` +
      C +
      e
    );
  }
  var ie = !1;
  function oe(e, t) {
    if (!e || ie) return "";
    ie = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (j) {
            var o = j;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (j) {
            o = j;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (j) {
          o = j;
        }
        e();
      }
    } catch (j) {
      if (j && o && typeof j.stack == "string") {
        for (
          var u = j.stack.split(`
`),
            c = o.stack.split(`
`),
            p = u.length - 1,
            y = c.length - 1;
          1 <= p && 0 <= y && u[p] !== c[y];

        )
          y--;
        for (; 1 <= p && 0 <= y; p--, y--)
          if (u[p] !== c[y]) {
            if (p !== 1 || y !== 1)
              do
                if ((p--, y--, 0 > y || u[p] !== c[y])) {
                  var w =
                    `
` + u[p].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      w.includes("<anonymous>") &&
                      (w = w.replace("<anonymous>", e.displayName)),
                    w
                  );
                }
              while (1 <= p && 0 <= y);
            break;
          }
      }
    } finally {
      (ie = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? _(e) : "";
  }
  function ce(e) {
    switch (e.tag) {
      case 5:
        return _(e.type);
      case 16:
        return _("Lazy");
      case 13:
        return _("Suspense");
      case 19:
        return _("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = oe(e.type, !1)), e;
      case 11:
        return (e = oe(e.type.render, !1)), e;
      case 1:
        return (e = oe(e.type, !0)), e;
      default:
        return "";
    }
  }
  function de(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Z:
        return "Fragment";
      case le:
        return "Portal";
      case re:
        return "Profiler";
      case ne:
        return "StrictMode";
      case qe:
        return "Suspense";
      case Me:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case me:
          return (e.displayName || "Context") + ".Consumer";
        case ae:
          return (e._context.displayName || "Context") + ".Provider";
        case mt:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Fe:
          return (
            (t = e.displayName || null), t !== null ? t : de(e.type) || "Memo"
          );
        case Pe:
          (t = e._payload), (e = e._init);
          try {
            return de(e(t));
          } catch {}
      }
    return null;
  }
  function ge(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return de(t);
      case 8:
        return t === ne ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function pe(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ke(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function rt(e) {
    var t = ke(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      o = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var u = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (p) {
            (o = "" + p), c.call(this, p);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return o;
          },
          setValue: function (p) {
            o = "" + p;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function ci(e) {
    e._valueTracker || (e._valueTracker = rt(e));
  }
  function wl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      o = "";
    return (
      e && (o = ke(e) ? (e.checked ? "true" : "false") : e.value),
      (e = o),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function di(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Fs(e, t) {
    var n = t.checked;
    return B({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Sl(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      o = t.checked != null ? t.checked : t.defaultChecked;
    (n = pe(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: o,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      });
  }
  function kl(e, t) {
    (t = t.checked), t != null && G(e, "checked", t, !1);
  }
  function Bs(e, t) {
    kl(e, t);
    var n = pe(t.value),
      o = t.type;
    if (n != null)
      o === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value")
      ? Us(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && Us(e, t.type, pe(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function El(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (
        !(
          (o !== "submit" && o !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n);
  }
  function Us(e, t, n) {
    (t !== "number" || di(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var dr = Array.isArray;
  function An(e, t, n, o) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < n.length; u++) t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        (u = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== u && (e[n].selected = u),
          u && o && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + pe(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          (e[u].selected = !0), o && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vs(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return B({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Cl(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(s(92));
        if (dr(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: pe(n) };
  }
  function Nl(e, t) {
    var n = pe(t.value),
      o = pe(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      o != null && (e.defaultValue = "" + o);
  }
  function bl(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Il(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Hs(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Il(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var fi,
    jl = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, o, u) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, o, u);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          fi = fi || document.createElement("div"),
            fi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = fi.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function fr(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var pr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    yp = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pr).forEach(function (e) {
    yp.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (pr[t] = pr[e]);
    });
  });
  function Tl(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (pr.hasOwnProperty(e) && pr[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Ll(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = n.indexOf("--") === 0,
          u = Tl(n, t[n], o);
        n === "float" && (n = "cssFloat"), o ? e.setProperty(n, u) : (e[n] = u);
      }
  }
  var xp = B(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function Ws(e, t) {
    if (t) {
      if (xp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function qs(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ks = null;
  function Qs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Gs = null,
    Dn = null,
    Mn = null;
  function Pl(e) {
    if ((e = Ar(e))) {
      if (typeof Gs != "function") throw Error(s(280));
      var t = e.stateNode;
      t && ((t = Ai(t)), Gs(e.stateNode, e.type, t));
    }
  }
  function Rl(e) {
    Dn ? (Mn ? Mn.push(e) : (Mn = [e])) : (Dn = e);
  }
  function _l() {
    if (Dn) {
      var e = Dn,
        t = Mn;
      if (((Mn = Dn = null), Pl(e), t)) for (e = 0; e < t.length; e++) Pl(t[e]);
    }
  }
  function Ol(e, t) {
    return e(t);
  }
  function Al() {}
  var Ys = !1;
  function Dl(e, t, n) {
    if (Ys) return e(t, n);
    Ys = !0;
    try {
      return Ol(e, t, n);
    } finally {
      (Ys = !1), (Dn !== null || Mn !== null) && (Al(), _l());
    }
  }
  function hr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var o = Ai(n);
    if (o === null) return null;
    n = o[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) ||
          ((e = e.type),
          (o = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !o);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var Js = !1;
  if (m)
    try {
      var mr = {};
      Object.defineProperty(mr, "passive", {
        get: function () {
          Js = !0;
        },
      }),
        window.addEventListener("test", mr, mr),
        window.removeEventListener("test", mr, mr);
    } catch {
      Js = !1;
    }
  function wp(e, t, n, o, u, c, p, y, w) {
    var j = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, j);
    } catch (A) {
      this.onError(A);
    }
  }
  var gr = !1,
    pi = null,
    hi = !1,
    Xs = null,
    Sp = {
      onError: function (e) {
        (gr = !0), (pi = e);
      },
    };
  function kp(e, t, n, o, u, c, p, y, w) {
    (gr = !1), (pi = null), wp.apply(Sp, arguments);
  }
  function Ep(e, t, n, o, u, c, p, y, w) {
    if ((kp.apply(this, arguments), gr)) {
      if (gr) {
        var j = pi;
        (gr = !1), (pi = null);
      } else throw Error(s(198));
      hi || ((hi = !0), (Xs = j));
    }
  }
  function hn(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Ml(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function zl(e) {
    if (hn(e) !== e) throw Error(s(188));
  }
  function Cp(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = hn(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, o = t; ; ) {
      var u = n.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((o = u.return), o !== null)) {
          n = o;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === n) return zl(u), e;
          if (c === o) return zl(u), t;
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== o.return) (n = u), (o = c);
      else {
        for (var p = !1, y = u.child; y; ) {
          if (y === n) {
            (p = !0), (n = u), (o = c);
            break;
          }
          if (y === o) {
            (p = !0), (o = u), (n = c);
            break;
          }
          y = y.sibling;
        }
        if (!p) {
          for (y = c.child; y; ) {
            if (y === n) {
              (p = !0), (n = c), (o = u);
              break;
            }
            if (y === o) {
              (p = !0), (o = c), (n = u);
              break;
            }
            y = y.sibling;
          }
          if (!p) throw Error(s(189));
        }
      }
      if (n.alternate !== o) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function $l(e) {
    return (e = Cp(e)), e !== null ? Fl(e) : null;
  }
  function Fl(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Fl(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Bl = r.unstable_scheduleCallback,
    Ul = r.unstable_cancelCallback,
    Np = r.unstable_shouldYield,
    bp = r.unstable_requestPaint,
    je = r.unstable_now,
    Ip = r.unstable_getCurrentPriorityLevel,
    Zs = r.unstable_ImmediatePriority,
    Vl = r.unstable_UserBlockingPriority,
    mi = r.unstable_NormalPriority,
    jp = r.unstable_LowPriority,
    Hl = r.unstable_IdlePriority,
    gi = null,
    Et = null;
  function Tp(e) {
    if (Et && typeof Et.onCommitFiberRoot == "function")
      try {
        Et.onCommitFiberRoot(gi, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var gt = Math.clz32 ? Math.clz32 : Rp,
    Lp = Math.log,
    Pp = Math.LN2;
  function Rp(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Lp(e) / Pp) | 0)) | 0;
  }
  var vi = 64,
    yi = 4194304;
  function vr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function xi(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var o = 0,
      u = e.suspendedLanes,
      c = e.pingedLanes,
      p = n & 268435455;
    if (p !== 0) {
      var y = p & ~u;
      y !== 0 ? (o = vr(y)) : ((c &= p), c !== 0 && (o = vr(c)));
    } else (p = n & ~u), p !== 0 ? (o = vr(p)) : c !== 0 && (o = vr(c));
    if (o === 0) return 0;
    if (
      t !== 0 &&
      t !== o &&
      !(t & u) &&
      ((u = o & -o), (c = t & -t), u >= c || (u === 16 && (c & 4194240) !== 0))
    )
      return t;
    if ((o & 4 && (o |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= o; 0 < t; )
        (n = 31 - gt(t)), (u = 1 << n), (o |= e[n]), (t &= ~u);
    return o;
  }
  function _p(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Op(e, t) {
    for (
      var n = e.suspendedLanes,
        o = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes;
      0 < c;

    ) {
      var p = 31 - gt(c),
        y = 1 << p,
        w = u[p];
      w === -1
        ? (!(y & n) || y & o) && (u[p] = _p(y, t))
        : w <= t && (e.expiredLanes |= y),
        (c &= ~y);
    }
  }
  function eo(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function Wl() {
    var e = vi;
    return (vi <<= 1), !(vi & 4194240) && (vi = 64), e;
  }
  function to(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function yr(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - gt(t)),
      (e[t] = n);
  }
  function Ap(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements);
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var u = 31 - gt(n),
        c = 1 << u;
      (t[u] = 0), (o[u] = -1), (e[u] = -1), (n &= ~c);
    }
  }
  function no(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var o = 31 - gt(n),
        u = 1 << o;
      (u & t) | (e[o] & t) && (e[o] |= t), (n &= ~u);
    }
  }
  var he = 0;
  function ql(e) {
    return (
      (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
  }
  var Kl,
    ro,
    Ql,
    Gl,
    Yl,
    io = !1,
    wi = [],
    Vt = null,
    Ht = null,
    Wt = null,
    xr = new Map(),
    wr = new Map(),
    qt = [],
    Dp =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Jl(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Vt = null;
        break;
      case "dragenter":
      case "dragleave":
        Ht = null;
        break;
      case "mouseover":
      case "mouseout":
        Wt = null;
        break;
      case "pointerover":
      case "pointerout":
        xr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wr.delete(t.pointerId);
    }
  }
  function Sr(e, t, n, o, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: o,
          nativeEvent: c,
          targetContainers: [u],
        }),
        t !== null && ((t = Ar(t)), t !== null && ro(t)),
        e)
      : ((e.eventSystemFlags |= o),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function Mp(e, t, n, o, u) {
    switch (t) {
      case "focusin":
        return (Vt = Sr(Vt, e, t, n, o, u)), !0;
      case "dragenter":
        return (Ht = Sr(Ht, e, t, n, o, u)), !0;
      case "mouseover":
        return (Wt = Sr(Wt, e, t, n, o, u)), !0;
      case "pointerover":
        var c = u.pointerId;
        return xr.set(c, Sr(xr.get(c) || null, e, t, n, o, u)), !0;
      case "gotpointercapture":
        return (
          (c = u.pointerId), wr.set(c, Sr(wr.get(c) || null, e, t, n, o, u)), !0
        );
    }
    return !1;
  }
  function Xl(e) {
    var t = mn(e.target);
    if (t !== null) {
      var n = hn(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Ml(n)), t !== null)) {
            (e.blockedOn = t),
              Yl(e.priority, function () {
                Ql(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Si(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = oo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var o = new n.constructor(n.type, n);
        (Ks = o), n.target.dispatchEvent(o), (Ks = null);
      } else return (t = Ar(n)), t !== null && ro(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function Zl(e, t, n) {
    Si(e) && n.delete(t);
  }
  function zp() {
    (io = !1),
      Vt !== null && Si(Vt) && (Vt = null),
      Ht !== null && Si(Ht) && (Ht = null),
      Wt !== null && Si(Wt) && (Wt = null),
      xr.forEach(Zl),
      wr.forEach(Zl);
  }
  function kr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      io ||
        ((io = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, zp)));
  }
  function Er(e) {
    function t(u) {
      return kr(u, e);
    }
    if (0 < wi.length) {
      kr(wi[0], e);
      for (var n = 1; n < wi.length; n++) {
        var o = wi[n];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (
      Vt !== null && kr(Vt, e),
        Ht !== null && kr(Ht, e),
        Wt !== null && kr(Wt, e),
        xr.forEach(t),
        wr.forEach(t),
        n = 0;
      n < qt.length;
      n++
    )
      (o = qt[n]), o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < qt.length && ((n = qt[0]), n.blockedOn === null); )
      Xl(n), n.blockedOn === null && qt.shift();
  }
  var zn = W.ReactCurrentBatchConfig,
    ki = !0;
  function $p(e, t, n, o) {
    var u = he,
      c = zn.transition;
    zn.transition = null;
    try {
      (he = 1), so(e, t, n, o);
    } finally {
      (he = u), (zn.transition = c);
    }
  }
  function Fp(e, t, n, o) {
    var u = he,
      c = zn.transition;
    zn.transition = null;
    try {
      (he = 4), so(e, t, n, o);
    } finally {
      (he = u), (zn.transition = c);
    }
  }
  function so(e, t, n, o) {
    if (ki) {
      var u = oo(e, t, n, o);
      if (u === null) Co(e, t, o, Ei, n), Jl(e, o);
      else if (Mp(u, e, t, n, o)) o.stopPropagation();
      else if ((Jl(e, o), t & 4 && -1 < Dp.indexOf(e))) {
        for (; u !== null; ) {
          var c = Ar(u);
          if (
            (c !== null && Kl(c),
            (c = oo(e, t, n, o)),
            c === null && Co(e, t, o, Ei, n),
            c === u)
          )
            break;
          u = c;
        }
        u !== null && o.stopPropagation();
      } else Co(e, t, o, null, n);
    }
  }
  var Ei = null;
  function oo(e, t, n, o) {
    if (((Ei = null), (e = Qs(o)), (e = mn(e)), e !== null))
      if (((t = hn(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Ml(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (Ei = e), null;
  }
  function eu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Ip()) {
          case Zs:
            return 1;
          case Vl:
            return 4;
          case mi:
          case jp:
            return 16;
          case Hl:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Kt = null,
    ao = null,
    Ci = null;
  function tu() {
    if (Ci) return Ci;
    var e,
      t = ao,
      n = t.length,
      o,
      u = "value" in Kt ? Kt.value : Kt.textContent,
      c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++);
    var p = n - e;
    for (o = 1; o <= p && t[n - o] === u[c - o]; o++);
    return (Ci = u.slice(e, 1 < o ? 1 - o : void 0));
  }
  function Ni(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function bi() {
    return !0;
  }
  function nu() {
    return !1;
  }
  function it(e) {
    function t(n, o, u, c, p) {
      (this._reactName = n),
        (this._targetInst = u),
        (this.type = o),
        (this.nativeEvent = c),
        (this.target = p),
        (this.currentTarget = null);
      for (var y in e)
        e.hasOwnProperty(y) && ((n = e[y]), (this[y] = n ? n(c) : c[y]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? bi
          : nu),
        (this.isPropagationStopped = nu),
        this
      );
    }
    return (
      B(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = bi));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = bi));
        },
        persist: function () {},
        isPersistent: bi,
      }),
      t
    );
  }
  var $n = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    lo = it($n),
    Cr = B({}, $n, { view: 0, detail: 0 }),
    Bp = it(Cr),
    uo,
    co,
    Nr,
    Ii = B({}, Cr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: po,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Nr &&
              (Nr && e.type === "mousemove"
                ? ((uo = e.screenX - Nr.screenX), (co = e.screenY - Nr.screenY))
                : (co = uo = 0),
              (Nr = e)),
            uo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : co;
      },
    }),
    ru = it(Ii),
    Up = B({}, Ii, { dataTransfer: 0 }),
    Vp = it(Up),
    Hp = B({}, Cr, { relatedTarget: 0 }),
    fo = it(Hp),
    Wp = B({}, $n, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qp = it(Wp),
    Kp = B({}, $n, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Qp = it(Kp),
    Gp = B({}, $n, { data: 0 }),
    iu = it(Gp),
    Yp = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Jp = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Xp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Zp(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Xp[e])
        ? !!t[e]
        : !1;
  }
  function po() {
    return Zp;
  }
  var eh = B({}, Cr, {
      key: function (e) {
        if (e.key) {
          var t = Yp[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Ni(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Jp[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: po,
      charCode: function (e) {
        return e.type === "keypress" ? Ni(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Ni(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    th = it(eh),
    nh = B({}, Ii, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    su = it(nh),
    rh = B({}, Cr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: po,
    }),
    ih = it(rh),
    sh = B({}, $n, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    oh = it(sh),
    ah = B({}, Ii, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    lh = it(ah),
    uh = [9, 13, 27, 32],
    ho = m && "CompositionEvent" in window,
    br = null;
  m && "documentMode" in document && (br = document.documentMode);
  var ch = m && "TextEvent" in window && !br,
    ou = m && (!ho || (br && 8 < br && 11 >= br)),
    au = " ",
    lu = !1;
  function uu(e, t) {
    switch (e) {
      case "keyup":
        return uh.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cu(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Fn = !1;
  function dh(e, t) {
    switch (e) {
      case "compositionend":
        return cu(t);
      case "keypress":
        return t.which !== 32 ? null : ((lu = !0), au);
      case "textInput":
        return (e = t.data), e === au && lu ? null : e;
      default:
        return null;
    }
  }
  function fh(e, t) {
    if (Fn)
      return e === "compositionend" || (!ho && uu(e, t))
        ? ((e = tu()), (Ci = ao = Kt = null), (Fn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ou && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var ph = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function du(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!ph[e.type] : t === "textarea";
  }
  function fu(e, t, n, o) {
    Rl(o),
      (t = Ri(t, "onChange")),
      0 < t.length &&
        ((n = new lo("onChange", "change", null, n, o)),
        e.push({ event: n, listeners: t }));
  }
  var Ir = null,
    jr = null;
  function hh(e) {
    Lu(e, 0);
  }
  function ji(e) {
    var t = Wn(e);
    if (wl(t)) return e;
  }
  function mh(e, t) {
    if (e === "change") return t;
  }
  var pu = !1;
  if (m) {
    var mo;
    if (m) {
      var go = "oninput" in document;
      if (!go) {
        var hu = document.createElement("div");
        hu.setAttribute("oninput", "return;"),
          (go = typeof hu.oninput == "function");
      }
      mo = go;
    } else mo = !1;
    pu = mo && (!document.documentMode || 9 < document.documentMode);
  }
  function mu() {
    Ir && (Ir.detachEvent("onpropertychange", gu), (jr = Ir = null));
  }
  function gu(e) {
    if (e.propertyName === "value" && ji(jr)) {
      var t = [];
      fu(t, jr, e, Qs(e)), Dl(hh, t);
    }
  }
  function gh(e, t, n) {
    e === "focusin"
      ? (mu(), (Ir = t), (jr = n), Ir.attachEvent("onpropertychange", gu))
      : e === "focusout" && mu();
  }
  function vh(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ji(jr);
  }
  function yh(e, t) {
    if (e === "click") return ji(t);
  }
  function xh(e, t) {
    if (e === "input" || e === "change") return ji(t);
  }
  function wh(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var vt = typeof Object.is == "function" ? Object.is : wh;
  function Tr(e, t) {
    if (vt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      o = Object.keys(t);
    if (n.length !== o.length) return !1;
    for (o = 0; o < n.length; o++) {
      var u = n[o];
      if (!h.call(t, u) || !vt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function vu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function yu(e, t) {
    var n = vu(e);
    e = 0;
    for (var o; n; ) {
      if (n.nodeType === 3) {
        if (((o = e + n.textContent.length), e <= t && o >= t))
          return { node: n, offset: t - e };
        e = o;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = vu(n);
    }
  }
  function xu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? xu(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function wu() {
    for (var e = window, t = di(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = di(e.document);
    }
    return t;
  }
  function vo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function Sh(e) {
    var t = wu(),
      n = e.focusedElem,
      o = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      xu(n.ownerDocument.documentElement, n)
    ) {
      if (o !== null && vo(n)) {
        if (
          ((t = o.start),
          (e = o.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          (n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var u = n.textContent.length,
            c = Math.min(o.start, u);
          (o = o.end === void 0 ? c : Math.min(o.end, u)),
            !e.extend && c > o && ((u = o), (o = c), (c = u)),
            (u = yu(n, c));
          var p = yu(n, o);
          u &&
            p &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== u.node ||
              e.anchorOffset !== u.offset ||
              e.focusNode !== p.node ||
              e.focusOffset !== p.offset) &&
            ((t = t.createRange()),
            t.setStart(u.node, u.offset),
            e.removeAllRanges(),
            c > o
              ? (e.addRange(t), e.extend(p.node, p.offset))
              : (t.setEnd(p.node, p.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top);
    }
  }
  var kh = m && "documentMode" in document && 11 >= document.documentMode,
    Bn = null,
    yo = null,
    Lr = null,
    xo = !1;
  function Su(e, t, n) {
    var o =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    xo ||
      Bn == null ||
      Bn !== di(o) ||
      ((o = Bn),
      "selectionStart" in o && vo(o)
        ? (o = { start: o.selectionStart, end: o.selectionEnd })
        : ((o = (
            (o.ownerDocument && o.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (o = {
            anchorNode: o.anchorNode,
            anchorOffset: o.anchorOffset,
            focusNode: o.focusNode,
            focusOffset: o.focusOffset,
          })),
      (Lr && Tr(Lr, o)) ||
        ((Lr = o),
        (o = Ri(yo, "onSelect")),
        0 < o.length &&
          ((t = new lo("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: o }),
          (t.target = Bn))));
  }
  function Ti(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Un = {
      animationend: Ti("Animation", "AnimationEnd"),
      animationiteration: Ti("Animation", "AnimationIteration"),
      animationstart: Ti("Animation", "AnimationStart"),
      transitionend: Ti("Transition", "TransitionEnd"),
    },
    wo = {},
    ku = {};
  m &&
    ((ku = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Un.animationend.animation,
      delete Un.animationiteration.animation,
      delete Un.animationstart.animation),
    "TransitionEvent" in window || delete Un.transitionend.transition);
  function Li(e) {
    if (wo[e]) return wo[e];
    if (!Un[e]) return e;
    var t = Un[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in ku) return (wo[e] = t[n]);
    return e;
  }
  var Eu = Li("animationend"),
    Cu = Li("animationiteration"),
    Nu = Li("animationstart"),
    bu = Li("transitionend"),
    Iu = new Map(),
    ju =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Qt(e, t) {
    Iu.set(e, t), d(t, [e]);
  }
  for (var So = 0; So < ju.length; So++) {
    var ko = ju[So],
      Eh = ko.toLowerCase(),
      Ch = ko[0].toUpperCase() + ko.slice(1);
    Qt(Eh, "on" + Ch);
  }
  Qt(Eu, "onAnimationEnd"),
    Qt(Cu, "onAnimationIteration"),
    Qt(Nu, "onAnimationStart"),
    Qt("dblclick", "onDoubleClick"),
    Qt("focusin", "onFocus"),
    Qt("focusout", "onBlur"),
    Qt(bu, "onTransitionEnd"),
    f("onMouseEnter", ["mouseout", "mouseover"]),
    f("onMouseLeave", ["mouseout", "mouseover"]),
    f("onPointerEnter", ["pointerout", "pointerover"]),
    f("onPointerLeave", ["pointerout", "pointerover"]),
    d(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    d(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    d(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    d(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    d(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var Pr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Nh = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Pr),
    );
  function Tu(e, t, n) {
    var o = e.type || "unknown-event";
    (e.currentTarget = n), Ep(o, t, void 0, e), (e.currentTarget = null);
  }
  function Lu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var o = e[n],
        u = o.event;
      o = o.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var p = o.length - 1; 0 <= p; p--) {
            var y = o[p],
              w = y.instance,
              j = y.currentTarget;
            if (((y = y.listener), w !== c && u.isPropagationStopped()))
              break e;
            Tu(u, y, j), (c = w);
          }
        else
          for (p = 0; p < o.length; p++) {
            if (
              ((y = o[p]),
              (w = y.instance),
              (j = y.currentTarget),
              (y = y.listener),
              w !== c && u.isPropagationStopped())
            )
              break e;
            Tu(u, y, j), (c = w);
          }
      }
    }
    if (hi) throw ((e = Xs), (hi = !1), (Xs = null), e);
  }
  function xe(e, t) {
    var n = t[Lo];
    n === void 0 && (n = t[Lo] = new Set());
    var o = e + "__bubble";
    n.has(o) || (Pu(t, e, 2, !1), n.add(o));
  }
  function Eo(e, t, n) {
    var o = 0;
    t && (o |= 4), Pu(n, e, o, t);
  }
  var Pi = "_reactListening" + Math.random().toString(36).slice(2);
  function Rr(e) {
    if (!e[Pi]) {
      (e[Pi] = !0),
        a.forEach(function (n) {
          n !== "selectionchange" && (Nh.has(n) || Eo(n, !1, e), Eo(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Pi] || ((t[Pi] = !0), Eo("selectionchange", !1, t));
    }
  }
  function Pu(e, t, n, o) {
    switch (eu(t)) {
      case 1:
        var u = $p;
        break;
      case 4:
        u = Fp;
        break;
      default:
        u = so;
    }
    (n = u.bind(null, t, n, e)),
      (u = void 0),
      !Js ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      o
        ? u !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: u })
          : e.addEventListener(t, n, !0)
        : u !== void 0
          ? e.addEventListener(t, n, { passive: u })
          : e.addEventListener(t, n, !1);
  }
  function Co(e, t, n, o, u) {
    var c = o;
    if (!(t & 1) && !(t & 2) && o !== null)
      e: for (;;) {
        if (o === null) return;
        var p = o.tag;
        if (p === 3 || p === 4) {
          var y = o.stateNode.containerInfo;
          if (y === u || (y.nodeType === 8 && y.parentNode === u)) break;
          if (p === 4)
            for (p = o.return; p !== null; ) {
              var w = p.tag;
              if (
                (w === 3 || w === 4) &&
                ((w = p.stateNode.containerInfo),
                w === u || (w.nodeType === 8 && w.parentNode === u))
              )
                return;
              p = p.return;
            }
          for (; y !== null; ) {
            if (((p = mn(y)), p === null)) return;
            if (((w = p.tag), w === 5 || w === 6)) {
              o = c = p;
              continue e;
            }
            y = y.parentNode;
          }
        }
        o = o.return;
      }
    Dl(function () {
      var j = c,
        A = Qs(n),
        D = [];
      e: {
        var O = Iu.get(e);
        if (O !== void 0) {
          var U = lo,
            H = e;
          switch (e) {
            case "keypress":
              if (Ni(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = th;
              break;
            case "focusin":
              (H = "focus"), (U = fo);
              break;
            case "focusout":
              (H = "blur"), (U = fo);
              break;
            case "beforeblur":
            case "afterblur":
              U = fo;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = ru;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Vp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = ih;
              break;
            case Eu:
            case Cu:
            case Nu:
              U = qp;
              break;
            case bu:
              U = oh;
              break;
            case "scroll":
              U = Bp;
              break;
            case "wheel":
              U = lh;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Qp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = su;
          }
          var q = (t & 4) !== 0,
            Te = !q && e === "scroll",
            N = q ? (O !== null ? O + "Capture" : null) : O;
          q = [];
          for (var k = j, b; k !== null; ) {
            b = k;
            var z = b.stateNode;
            if (
              (b.tag === 5 &&
                z !== null &&
                ((b = z),
                N !== null &&
                  ((z = hr(k, N)), z != null && q.push(_r(k, z, b)))),
              Te)
            )
              break;
            k = k.return;
          }
          0 < q.length &&
            ((O = new U(O, H, null, n, A)), D.push({ event: O, listeners: q }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((O = e === "mouseover" || e === "pointerover"),
            (U = e === "mouseout" || e === "pointerout"),
            O &&
              n !== Ks &&
              (H = n.relatedTarget || n.fromElement) &&
              (mn(H) || H[Rt]))
          )
            break e;
          if (
            (U || O) &&
            ((O =
              A.window === A
                ? A
                : (O = A.ownerDocument)
                  ? O.defaultView || O.parentWindow
                  : window),
            U
              ? ((H = n.relatedTarget || n.toElement),
                (U = j),
                (H = H ? mn(H) : null),
                H !== null &&
                  ((Te = hn(H)), H !== Te || (H.tag !== 5 && H.tag !== 6)) &&
                  (H = null))
              : ((U = null), (H = j)),
            U !== H)
          ) {
            if (
              ((q = ru),
              (z = "onMouseLeave"),
              (N = "onMouseEnter"),
              (k = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((q = su),
                (z = "onPointerLeave"),
                (N = "onPointerEnter"),
                (k = "pointer")),
              (Te = U == null ? O : Wn(U)),
              (b = H == null ? O : Wn(H)),
              (O = new q(z, k + "leave", U, n, A)),
              (O.target = Te),
              (O.relatedTarget = b),
              (z = null),
              mn(A) === j &&
                ((q = new q(N, k + "enter", H, n, A)),
                (q.target = b),
                (q.relatedTarget = Te),
                (z = q)),
              (Te = z),
              U && H)
            )
              t: {
                for (q = U, N = H, k = 0, b = q; b; b = Vn(b)) k++;
                for (b = 0, z = N; z; z = Vn(z)) b++;
                for (; 0 < k - b; ) (q = Vn(q)), k--;
                for (; 0 < b - k; ) (N = Vn(N)), b--;
                for (; k--; ) {
                  if (q === N || (N !== null && q === N.alternate)) break t;
                  (q = Vn(q)), (N = Vn(N));
                }
                q = null;
              }
            else q = null;
            U !== null && Ru(D, O, U, q, !1),
              H !== null && Te !== null && Ru(D, Te, H, q, !0);
          }
        }
        e: {
          if (
            ((O = j ? Wn(j) : window),
            (U = O.nodeName && O.nodeName.toLowerCase()),
            U === "select" || (U === "input" && O.type === "file"))
          )
            var K = mh;
          else if (du(O))
            if (pu) K = xh;
            else {
              K = vh;
              var Y = gh;
            }
          else
            (U = O.nodeName) &&
              U.toLowerCase() === "input" &&
              (O.type === "checkbox" || O.type === "radio") &&
              (K = yh);
          if (K && (K = K(e, j))) {
            fu(D, K, n, A);
            break e;
          }
          Y && Y(e, O, j),
            e === "focusout" &&
              (Y = O._wrapperState) &&
              Y.controlled &&
              O.type === "number" &&
              Us(O, "number", O.value);
        }
        switch (((Y = j ? Wn(j) : window), e)) {
          case "focusin":
            (du(Y) || Y.contentEditable === "true") &&
              ((Bn = Y), (yo = j), (Lr = null));
            break;
          case "focusout":
            Lr = yo = Bn = null;
            break;
          case "mousedown":
            xo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (xo = !1), Su(D, n, A);
            break;
          case "selectionchange":
            if (kh) break;
          case "keydown":
          case "keyup":
            Su(D, n, A);
        }
        var J;
        if (ho)
          e: {
            switch (e) {
              case "compositionstart":
                var X = "onCompositionStart";
                break e;
              case "compositionend":
                X = "onCompositionEnd";
                break e;
              case "compositionupdate":
                X = "onCompositionUpdate";
                break e;
            }
            X = void 0;
          }
        else
          Fn
            ? uu(e, n) && (X = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (X = "onCompositionStart");
        X &&
          (ou &&
            n.locale !== "ko" &&
            (Fn || X !== "onCompositionStart"
              ? X === "onCompositionEnd" && Fn && (J = tu())
              : ((Kt = A),
                (ao = "value" in Kt ? Kt.value : Kt.textContent),
                (Fn = !0))),
          (Y = Ri(j, X)),
          0 < Y.length &&
            ((X = new iu(X, e, null, n, A)),
            D.push({ event: X, listeners: Y }),
            J ? (X.data = J) : ((J = cu(n)), J !== null && (X.data = J)))),
          (J = ch ? dh(e, n) : fh(e, n)) &&
            ((j = Ri(j, "onBeforeInput")),
            0 < j.length &&
              ((A = new iu("onBeforeInput", "beforeinput", null, n, A)),
              D.push({ event: A, listeners: j }),
              (A.data = J)));
      }
      Lu(D, t);
    });
  }
  function _r(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ri(e, t) {
    for (var n = t + "Capture", o = []; e !== null; ) {
      var u = e,
        c = u.stateNode;
      u.tag === 5 &&
        c !== null &&
        ((u = c),
        (c = hr(e, n)),
        c != null && o.unshift(_r(e, c, u)),
        (c = hr(e, t)),
        c != null && o.push(_r(e, c, u))),
        (e = e.return);
    }
    return o;
  }
  function Vn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Ru(e, t, n, o, u) {
    for (var c = t._reactName, p = []; n !== null && n !== o; ) {
      var y = n,
        w = y.alternate,
        j = y.stateNode;
      if (w !== null && w === o) break;
      y.tag === 5 &&
        j !== null &&
        ((y = j),
        u
          ? ((w = hr(n, c)), w != null && p.unshift(_r(n, w, y)))
          : u || ((w = hr(n, c)), w != null && p.push(_r(n, w, y)))),
        (n = n.return);
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var bh = /\r\n?/g,
    Ih = /\u0000|\uFFFD/g;
  function _u(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        bh,
        `
`,
      )
      .replace(Ih, "");
  }
  function _i(e, t, n) {
    if (((t = _u(t)), _u(e) !== t && n)) throw Error(s(425));
  }
  function Oi() {}
  var No = null,
    bo = null;
  function Io(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var jo = typeof setTimeout == "function" ? setTimeout : void 0,
    jh = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Ou = typeof Promise == "function" ? Promise : void 0,
    Th =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Ou < "u"
          ? function (e) {
              return Ou.resolve(null).then(e).catch(Lh);
            }
          : jo;
  function Lh(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function To(e, t) {
    var n = t,
      o = 0;
    do {
      var u = n.nextSibling;
      if ((e.removeChild(n), u && u.nodeType === 8))
        if (((n = u.data), n === "/$")) {
          if (o === 0) {
            e.removeChild(u), Er(t);
            return;
          }
          o--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || o++;
      n = u;
    } while (n);
    Er(t);
  }
  function Gt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Au(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Hn = Math.random().toString(36).slice(2),
    Ct = "__reactFiber$" + Hn,
    Or = "__reactProps$" + Hn,
    Rt = "__reactContainer$" + Hn,
    Lo = "__reactEvents$" + Hn,
    Ph = "__reactListeners$" + Hn,
    Rh = "__reactHandles$" + Hn;
  function mn(e) {
    var t = e[Ct];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Rt] || n[Ct])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Au(e); e !== null; ) {
            if ((n = e[Ct])) return n;
            e = Au(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function Ar(e) {
    return (
      (e = e[Ct] || e[Rt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Wn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ai(e) {
    return e[Or] || null;
  }
  var Po = [],
    qn = -1;
  function Yt(e) {
    return { current: e };
  }
  function we(e) {
    0 > qn || ((e.current = Po[qn]), (Po[qn] = null), qn--);
  }
  function ve(e, t) {
    qn++, (Po[qn] = e.current), (e.current = t);
  }
  var Jt = {},
    Be = Yt(Jt),
    Ge = Yt(!1),
    gn = Jt;
  function Kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Jt;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
      return o.__reactInternalMemoizedMaskedChildContext;
    var u = {},
      c;
    for (c in n) u[c] = t[c];
    return (
      o &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      u
    );
  }
  function Ye(e) {
    return (e = e.childContextTypes), e != null;
  }
  function Di() {
    we(Ge), we(Be);
  }
  function Du(e, t, n) {
    if (Be.current !== Jt) throw Error(s(168));
    ve(Be, t), ve(Ge, n);
  }
  function Mu(e, t, n) {
    var o = e.stateNode;
    if (((t = t.childContextTypes), typeof o.getChildContext != "function"))
      return n;
    o = o.getChildContext();
    for (var u in o) if (!(u in t)) throw Error(s(108, ge(e) || "Unknown", u));
    return B({}, n, o);
  }
  function Mi(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Jt),
      (gn = Be.current),
      ve(Be, e),
      ve(Ge, Ge.current),
      !0
    );
  }
  function zu(e, t, n) {
    var o = e.stateNode;
    if (!o) throw Error(s(169));
    n
      ? ((e = Mu(e, t, gn)),
        (o.__reactInternalMemoizedMergedChildContext = e),
        we(Ge),
        we(Be),
        ve(Be, e))
      : we(Ge),
      ve(Ge, n);
  }
  var _t = null,
    zi = !1,
    Ro = !1;
  function $u(e) {
    _t === null ? (_t = [e]) : _t.push(e);
  }
  function _h(e) {
    (zi = !0), $u(e);
  }
  function Xt() {
    if (!Ro && _t !== null) {
      Ro = !0;
      var e = 0,
        t = he;
      try {
        var n = _t;
        for (he = 1; e < n.length; e++) {
          var o = n[e];
          do o = o(!0);
          while (o !== null);
        }
        (_t = null), (zi = !1);
      } catch (u) {
        throw (_t !== null && (_t = _t.slice(e + 1)), Bl(Zs, Xt), u);
      } finally {
        (he = t), (Ro = !1);
      }
    }
    return null;
  }
  var Qn = [],
    Gn = 0,
    $i = null,
    Fi = 0,
    ut = [],
    ct = 0,
    vn = null,
    Ot = 1,
    At = "";
  function yn(e, t) {
    (Qn[Gn++] = Fi), (Qn[Gn++] = $i), ($i = e), (Fi = t);
  }
  function Fu(e, t, n) {
    (ut[ct++] = Ot), (ut[ct++] = At), (ut[ct++] = vn), (vn = e);
    var o = Ot;
    e = At;
    var u = 32 - gt(o) - 1;
    (o &= ~(1 << u)), (n += 1);
    var c = 32 - gt(t) + u;
    if (30 < c) {
      var p = u - (u % 5);
      (c = (o & ((1 << p) - 1)).toString(32)),
        (o >>= p),
        (u -= p),
        (Ot = (1 << (32 - gt(t) + u)) | (n << u) | o),
        (At = c + e);
    } else (Ot = (1 << c) | (n << u) | o), (At = e);
  }
  function _o(e) {
    e.return !== null && (yn(e, 1), Fu(e, 1, 0));
  }
  function Oo(e) {
    for (; e === $i; )
      ($i = Qn[--Gn]), (Qn[Gn] = null), (Fi = Qn[--Gn]), (Qn[Gn] = null);
    for (; e === vn; )
      (vn = ut[--ct]),
        (ut[ct] = null),
        (At = ut[--ct]),
        (ut[ct] = null),
        (Ot = ut[--ct]),
        (ut[ct] = null);
  }
  var st = null,
    ot = null,
    Ee = !1,
    yt = null;
  function Bu(e, t) {
    var n = ht(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function Uu(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (st = e), (ot = Gt(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (st = e), (ot = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = vn !== null ? { id: Ot, overflow: At } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = ht(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (st = e),
              (ot = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ao(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Do(e) {
    if (Ee) {
      var t = ot;
      if (t) {
        var n = t;
        if (!Uu(e, t)) {
          if (Ao(e)) throw Error(s(418));
          t = Gt(n.nextSibling);
          var o = st;
          t && Uu(e, t)
            ? Bu(o, n)
            : ((e.flags = (e.flags & -4097) | 2), (Ee = !1), (st = e));
        }
      } else {
        if (Ao(e)) throw Error(s(418));
        (e.flags = (e.flags & -4097) | 2), (Ee = !1), (st = e);
      }
    }
  }
  function Vu(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    st = e;
  }
  function Bi(e) {
    if (e !== st) return !1;
    if (!Ee) return Vu(e), (Ee = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !Io(e.type, e.memoizedProps))),
      t && (t = ot))
    ) {
      if (Ao(e)) throw (Hu(), Error(s(418)));
      for (; t; ) Bu(e, t), (t = Gt(t.nextSibling));
    }
    if ((Vu(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                ot = Gt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        ot = null;
      }
    } else ot = st ? Gt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Hu() {
    for (var e = ot; e; ) e = Gt(e.nextSibling);
  }
  function Yn() {
    (ot = st = null), (Ee = !1);
  }
  function Mo(e) {
    yt === null ? (yt = [e]) : yt.push(e);
  }
  var Oh = W.ReactCurrentBatchConfig;
  function Dr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(s(309));
          var o = n.stateNode;
        }
        if (!o) throw Error(s(147, e));
        var u = o,
          c = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === c
          ? t.ref
          : ((t = function (p) {
              var y = u.refs;
              p === null ? delete y[c] : (y[c] = p);
            }),
            (t._stringRef = c),
            t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Ui(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ))
    );
  }
  function Wu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function qu(e) {
    function t(N, k) {
      if (e) {
        var b = N.deletions;
        b === null ? ((N.deletions = [k]), (N.flags |= 16)) : b.push(k);
      }
    }
    function n(N, k) {
      if (!e) return null;
      for (; k !== null; ) t(N, k), (k = k.sibling);
      return null;
    }
    function o(N, k) {
      for (N = new Map(); k !== null; )
        k.key !== null ? N.set(k.key, k) : N.set(k.index, k), (k = k.sibling);
      return N;
    }
    function u(N, k) {
      return (N = an(N, k)), (N.index = 0), (N.sibling = null), N;
    }
    function c(N, k, b) {
      return (
        (N.index = b),
        e
          ? ((b = N.alternate),
            b !== null
              ? ((b = b.index), b < k ? ((N.flags |= 2), k) : b)
              : ((N.flags |= 2), k))
          : ((N.flags |= 1048576), k)
      );
    }
    function p(N) {
      return e && N.alternate === null && (N.flags |= 2), N;
    }
    function y(N, k, b, z) {
      return k === null || k.tag !== 6
        ? ((k = ja(b, N.mode, z)), (k.return = N), k)
        : ((k = u(k, b)), (k.return = N), k);
    }
    function w(N, k, b, z) {
      var K = b.type;
      return K === Z
        ? A(N, k, b.props.children, z, b.key)
        : k !== null &&
            (k.elementType === K ||
              (typeof K == "object" &&
                K !== null &&
                K.$$typeof === Pe &&
                Wu(K) === k.type))
          ? ((z = u(k, b.props)), (z.ref = Dr(N, k, b)), (z.return = N), z)
          : ((z = fs(b.type, b.key, b.props, null, N.mode, z)),
            (z.ref = Dr(N, k, b)),
            (z.return = N),
            z);
    }
    function j(N, k, b, z) {
      return k === null ||
        k.tag !== 4 ||
        k.stateNode.containerInfo !== b.containerInfo ||
        k.stateNode.implementation !== b.implementation
        ? ((k = Ta(b, N.mode, z)), (k.return = N), k)
        : ((k = u(k, b.children || [])), (k.return = N), k);
    }
    function A(N, k, b, z, K) {
      return k === null || k.tag !== 7
        ? ((k = bn(b, N.mode, z, K)), (k.return = N), k)
        : ((k = u(k, b)), (k.return = N), k);
    }
    function D(N, k, b) {
      if ((typeof k == "string" && k !== "") || typeof k == "number")
        return (k = ja("" + k, N.mode, b)), (k.return = N), k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case te:
            return (
              (b = fs(k.type, k.key, k.props, null, N.mode, b)),
              (b.ref = Dr(N, null, k)),
              (b.return = N),
              b
            );
          case le:
            return (k = Ta(k, N.mode, b)), (k.return = N), k;
          case Pe:
            var z = k._init;
            return D(N, z(k._payload), b);
        }
        if (dr(k) || Q(k))
          return (k = bn(k, N.mode, b, null)), (k.return = N), k;
        Ui(N, k);
      }
      return null;
    }
    function O(N, k, b, z) {
      var K = k !== null ? k.key : null;
      if ((typeof b == "string" && b !== "") || typeof b == "number")
        return K !== null ? null : y(N, k, "" + b, z);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case te:
            return b.key === K ? w(N, k, b, z) : null;
          case le:
            return b.key === K ? j(N, k, b, z) : null;
          case Pe:
            return (K = b._init), O(N, k, K(b._payload), z);
        }
        if (dr(b) || Q(b)) return K !== null ? null : A(N, k, b, z, null);
        Ui(N, b);
      }
      return null;
    }
    function U(N, k, b, z, K) {
      if ((typeof z == "string" && z !== "") || typeof z == "number")
        return (N = N.get(b) || null), y(k, N, "" + z, K);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case te:
            return (
              (N = N.get(z.key === null ? b : z.key) || null), w(k, N, z, K)
            );
          case le:
            return (
              (N = N.get(z.key === null ? b : z.key) || null), j(k, N, z, K)
            );
          case Pe:
            var Y = z._init;
            return U(N, k, b, Y(z._payload), K);
        }
        if (dr(z) || Q(z)) return (N = N.get(b) || null), A(k, N, z, K, null);
        Ui(k, z);
      }
      return null;
    }
    function H(N, k, b, z) {
      for (
        var K = null, Y = null, J = k, X = (k = 0), De = null;
        J !== null && X < b.length;
        X++
      ) {
        J.index > X ? ((De = J), (J = null)) : (De = J.sibling);
        var fe = O(N, J, b[X], z);
        if (fe === null) {
          J === null && (J = De);
          break;
        }
        e && J && fe.alternate === null && t(N, J),
          (k = c(fe, k, X)),
          Y === null ? (K = fe) : (Y.sibling = fe),
          (Y = fe),
          (J = De);
      }
      if (X === b.length) return n(N, J), Ee && yn(N, X), K;
      if (J === null) {
        for (; X < b.length; X++)
          (J = D(N, b[X], z)),
            J !== null &&
              ((k = c(J, k, X)),
              Y === null ? (K = J) : (Y.sibling = J),
              (Y = J));
        return Ee && yn(N, X), K;
      }
      for (J = o(N, J); X < b.length; X++)
        (De = U(J, N, X, b[X], z)),
          De !== null &&
            (e &&
              De.alternate !== null &&
              J.delete(De.key === null ? X : De.key),
            (k = c(De, k, X)),
            Y === null ? (K = De) : (Y.sibling = De),
            (Y = De));
      return (
        e &&
          J.forEach(function (ln) {
            return t(N, ln);
          }),
        Ee && yn(N, X),
        K
      );
    }
    function q(N, k, b, z) {
      var K = Q(b);
      if (typeof K != "function") throw Error(s(150));
      if (((b = K.call(b)), b == null)) throw Error(s(151));
      for (
        var Y = (K = null), J = k, X = (k = 0), De = null, fe = b.next();
        J !== null && !fe.done;
        X++, fe = b.next()
      ) {
        J.index > X ? ((De = J), (J = null)) : (De = J.sibling);
        var ln = O(N, J, fe.value, z);
        if (ln === null) {
          J === null && (J = De);
          break;
        }
        e && J && ln.alternate === null && t(N, J),
          (k = c(ln, k, X)),
          Y === null ? (K = ln) : (Y.sibling = ln),
          (Y = ln),
          (J = De);
      }
      if (fe.done) return n(N, J), Ee && yn(N, X), K;
      if (J === null) {
        for (; !fe.done; X++, fe = b.next())
          (fe = D(N, fe.value, z)),
            fe !== null &&
              ((k = c(fe, k, X)),
              Y === null ? (K = fe) : (Y.sibling = fe),
              (Y = fe));
        return Ee && yn(N, X), K;
      }
      for (J = o(N, J); !fe.done; X++, fe = b.next())
        (fe = U(J, N, X, fe.value, z)),
          fe !== null &&
            (e &&
              fe.alternate !== null &&
              J.delete(fe.key === null ? X : fe.key),
            (k = c(fe, k, X)),
            Y === null ? (K = fe) : (Y.sibling = fe),
            (Y = fe));
      return (
        e &&
          J.forEach(function (fm) {
            return t(N, fm);
          }),
        Ee && yn(N, X),
        K
      );
    }
    function Te(N, k, b, z) {
      if (
        (typeof b == "object" &&
          b !== null &&
          b.type === Z &&
          b.key === null &&
          (b = b.props.children),
        typeof b == "object" && b !== null)
      ) {
        switch (b.$$typeof) {
          case te:
            e: {
              for (var K = b.key, Y = k; Y !== null; ) {
                if (Y.key === K) {
                  if (((K = b.type), K === Z)) {
                    if (Y.tag === 7) {
                      n(N, Y.sibling),
                        (k = u(Y, b.props.children)),
                        (k.return = N),
                        (N = k);
                      break e;
                    }
                  } else if (
                    Y.elementType === K ||
                    (typeof K == "object" &&
                      K !== null &&
                      K.$$typeof === Pe &&
                      Wu(K) === Y.type)
                  ) {
                    n(N, Y.sibling),
                      (k = u(Y, b.props)),
                      (k.ref = Dr(N, Y, b)),
                      (k.return = N),
                      (N = k);
                    break e;
                  }
                  n(N, Y);
                  break;
                } else t(N, Y);
                Y = Y.sibling;
              }
              b.type === Z
                ? ((k = bn(b.props.children, N.mode, z, b.key)),
                  (k.return = N),
                  (N = k))
                : ((z = fs(b.type, b.key, b.props, null, N.mode, z)),
                  (z.ref = Dr(N, k, b)),
                  (z.return = N),
                  (N = z));
            }
            return p(N);
          case le:
            e: {
              for (Y = b.key; k !== null; ) {
                if (k.key === Y)
                  if (
                    k.tag === 4 &&
                    k.stateNode.containerInfo === b.containerInfo &&
                    k.stateNode.implementation === b.implementation
                  ) {
                    n(N, k.sibling),
                      (k = u(k, b.children || [])),
                      (k.return = N),
                      (N = k);
                    break e;
                  } else {
                    n(N, k);
                    break;
                  }
                else t(N, k);
                k = k.sibling;
              }
              (k = Ta(b, N.mode, z)), (k.return = N), (N = k);
            }
            return p(N);
          case Pe:
            return (Y = b._init), Te(N, k, Y(b._payload), z);
        }
        if (dr(b)) return H(N, k, b, z);
        if (Q(b)) return q(N, k, b, z);
        Ui(N, b);
      }
      return (typeof b == "string" && b !== "") || typeof b == "number"
        ? ((b = "" + b),
          k !== null && k.tag === 6
            ? (n(N, k.sibling), (k = u(k, b)), (k.return = N), (N = k))
            : (n(N, k), (k = ja(b, N.mode, z)), (k.return = N), (N = k)),
          p(N))
        : n(N, k);
    }
    return Te;
  }
  var Jn = qu(!0),
    Ku = qu(!1),
    Vi = Yt(null),
    Hi = null,
    Xn = null,
    zo = null;
  function $o() {
    zo = Xn = Hi = null;
  }
  function Fo(e) {
    var t = Vi.current;
    we(Vi), (e._currentValue = t);
  }
  function Bo(e, t, n) {
    for (; e !== null; ) {
      var o = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), o !== null && (o.childLanes |= t))
          : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Zn(e, t) {
    (Hi = e),
      (zo = Xn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (Je = !0), (e.firstContext = null));
  }
  function dt(e) {
    var t = e._currentValue;
    if (zo !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Xn === null)) {
        if (Hi === null) throw Error(s(308));
        (Xn = e), (Hi.dependencies = { lanes: 0, firstContext: e });
      } else Xn = Xn.next = e;
    return t;
  }
  var xn = null;
  function Uo(e) {
    xn === null ? (xn = [e]) : xn.push(e);
  }
  function Qu(e, t, n, o) {
    var u = t.interleaved;
    return (
      u === null ? ((n.next = n), Uo(t)) : ((n.next = u.next), (u.next = n)),
      (t.interleaved = n),
      Dt(e, o)
    );
  }
  function Dt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var Zt = !1;
  function Vo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function Gu(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Mt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function en(e, t, n) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (((o = o.shared), ue & 2)) {
      var u = o.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (o.pending = t),
        Dt(e, n)
      );
    }
    return (
      (u = o.interleaved),
      u === null ? ((t.next = t), Uo(o)) : ((t.next = u.next), (u.next = t)),
      (o.interleaved = t),
      Dt(e, n)
    );
  }
  function Wi(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var o = t.lanes;
      (o &= e.pendingLanes), (n |= o), (t.lanes = n), no(e, n);
    }
  }
  function Yu(e, t) {
    var n = e.updateQueue,
      o = e.alternate;
    if (o !== null && ((o = o.updateQueue), n === o)) {
      var u = null,
        c = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var p = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          c === null ? (u = c = p) : (c = c.next = p), (n = n.next);
        } while (n !== null);
        c === null ? (u = c = t) : (c = c.next = t);
      } else u = c = t;
      (n = {
        baseState: o.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: o.shared,
        effects: o.effects,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  function qi(e, t, n, o) {
    var u = e.updateQueue;
    Zt = !1;
    var c = u.firstBaseUpdate,
      p = u.lastBaseUpdate,
      y = u.shared.pending;
    if (y !== null) {
      u.shared.pending = null;
      var w = y,
        j = w.next;
      (w.next = null), p === null ? (c = j) : (p.next = j), (p = w);
      var A = e.alternate;
      A !== null &&
        ((A = A.updateQueue),
        (y = A.lastBaseUpdate),
        y !== p &&
          (y === null ? (A.firstBaseUpdate = j) : (y.next = j),
          (A.lastBaseUpdate = w)));
    }
    if (c !== null) {
      var D = u.baseState;
      (p = 0), (A = j = w = null), (y = c);
      do {
        var O = y.lane,
          U = y.eventTime;
        if ((o & O) === O) {
          A !== null &&
            (A = A.next =
              {
                eventTime: U,
                lane: 0,
                tag: y.tag,
                payload: y.payload,
                callback: y.callback,
                next: null,
              });
          e: {
            var H = e,
              q = y;
            switch (((O = t), (U = n), q.tag)) {
              case 1:
                if (((H = q.payload), typeof H == "function")) {
                  D = H.call(U, D, O);
                  break e;
                }
                D = H;
                break e;
              case 3:
                H.flags = (H.flags & -65537) | 128;
              case 0:
                if (
                  ((H = q.payload),
                  (O = typeof H == "function" ? H.call(U, D, O) : H),
                  O == null)
                )
                  break e;
                D = B({}, D, O);
                break e;
              case 2:
                Zt = !0;
            }
          }
          y.callback !== null &&
            y.lane !== 0 &&
            ((e.flags |= 64),
            (O = u.effects),
            O === null ? (u.effects = [y]) : O.push(y));
        } else
          (U = {
            eventTime: U,
            lane: O,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null,
          }),
            A === null ? ((j = A = U), (w = D)) : (A = A.next = U),
            (p |= O);
        if (((y = y.next), y === null)) {
          if (((y = u.shared.pending), y === null)) break;
          (O = y),
            (y = O.next),
            (O.next = null),
            (u.lastBaseUpdate = O),
            (u.shared.pending = null);
        }
      } while (!0);
      if (
        (A === null && (w = D),
        (u.baseState = w),
        (u.firstBaseUpdate = j),
        (u.lastBaseUpdate = A),
        (t = u.shared.interleaved),
        t !== null)
      ) {
        u = t;
        do (p |= u.lane), (u = u.next);
        while (u !== t);
      } else c === null && (u.shared.lanes = 0);
      (kn |= p), (e.lanes = p), (e.memoizedState = D);
    }
  }
  function Ju(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var o = e[t],
          u = o.callback;
        if (u !== null) {
          if (((o.callback = null), (o = n), typeof u != "function"))
            throw Error(s(191, u));
          u.call(o);
        }
      }
  }
  var Mr = {},
    Nt = Yt(Mr),
    zr = Yt(Mr),
    $r = Yt(Mr);
  function wn(e) {
    if (e === Mr) throw Error(s(174));
    return e;
  }
  function Ho(e, t) {
    switch ((ve($r, t), ve(zr, e), ve(Nt, Mr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Hs(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Hs(t, e));
    }
    we(Nt), ve(Nt, t);
  }
  function er() {
    we(Nt), we(zr), we($r);
  }
  function Xu(e) {
    wn($r.current);
    var t = wn(Nt.current),
      n = Hs(t, e.type);
    t !== n && (ve(zr, e), ve(Nt, n));
  }
  function Wo(e) {
    zr.current === e && (we(Nt), we(zr));
  }
  var Ce = Yt(0);
  function Ki(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var qo = [];
  function Ko() {
    for (var e = 0; e < qo.length; e++)
      qo[e]._workInProgressVersionPrimary = null;
    qo.length = 0;
  }
  var Qi = W.ReactCurrentDispatcher,
    Qo = W.ReactCurrentBatchConfig,
    Sn = 0,
    Ne = null,
    Re = null,
    Oe = null,
    Gi = !1,
    Fr = !1,
    Br = 0,
    Ah = 0;
  function Ue() {
    throw Error(s(321));
  }
  function Go(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!vt(e[n], t[n])) return !1;
    return !0;
  }
  function Yo(e, t, n, o, u, c) {
    if (
      ((Sn = c),
      (Ne = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Qi.current = e === null || e.memoizedState === null ? $h : Fh),
      (e = n(o, u)),
      Fr)
    ) {
      c = 0;
      do {
        if (((Fr = !1), (Br = 0), 25 <= c)) throw Error(s(301));
        (c += 1),
          (Oe = Re = null),
          (t.updateQueue = null),
          (Qi.current = Bh),
          (e = n(o, u));
      } while (Fr);
    }
    if (
      ((Qi.current = Xi),
      (t = Re !== null && Re.next !== null),
      (Sn = 0),
      (Oe = Re = Ne = null),
      (Gi = !1),
      t)
    )
      throw Error(s(300));
    return e;
  }
  function Jo() {
    var e = Br !== 0;
    return (Br = 0), e;
  }
  function bt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Oe === null ? (Ne.memoizedState = Oe = e) : (Oe = Oe.next = e), Oe;
  }
  function ft() {
    if (Re === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Re.next;
    var t = Oe === null ? Ne.memoizedState : Oe.next;
    if (t !== null) (Oe = t), (Re = e);
    else {
      if (e === null) throw Error(s(310));
      (Re = e),
        (e = {
          memoizedState: Re.memoizedState,
          baseState: Re.baseState,
          baseQueue: Re.baseQueue,
          queue: Re.queue,
          next: null,
        }),
        Oe === null ? (Ne.memoizedState = Oe = e) : (Oe = Oe.next = e);
    }
    return Oe;
  }
  function Ur(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xo(e) {
    var t = ft(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var o = Re,
      u = o.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (u !== null) {
        var p = u.next;
        (u.next = c.next), (c.next = p);
      }
      (o.baseQueue = u = c), (n.pending = null);
    }
    if (u !== null) {
      (c = u.next), (o = o.baseState);
      var y = (p = null),
        w = null,
        j = c;
      do {
        var A = j.lane;
        if ((Sn & A) === A)
          w !== null &&
            (w = w.next =
              {
                lane: 0,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null,
              }),
            (o = j.hasEagerState ? j.eagerState : e(o, j.action));
        else {
          var D = {
            lane: A,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          };
          w === null ? ((y = w = D), (p = o)) : (w = w.next = D),
            (Ne.lanes |= A),
            (kn |= A);
        }
        j = j.next;
      } while (j !== null && j !== c);
      w === null ? (p = o) : (w.next = y),
        vt(o, t.memoizedState) || (Je = !0),
        (t.memoizedState = o),
        (t.baseState = p),
        (t.baseQueue = w),
        (n.lastRenderedState = o);
    }
    if (((e = n.interleaved), e !== null)) {
      u = e;
      do (c = u.lane), (Ne.lanes |= c), (kn |= c), (u = u.next);
      while (u !== e);
    } else u === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Zo(e) {
    var t = ft(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var o = n.dispatch,
      u = n.pending,
      c = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var p = (u = u.next);
      do (c = e(c, p.action)), (p = p.next);
      while (p !== u);
      vt(c, t.memoizedState) || (Je = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (n.lastRenderedState = c);
    }
    return [c, o];
  }
  function Zu() {}
  function ec(e, t) {
    var n = Ne,
      o = ft(),
      u = t(),
      c = !vt(o.memoizedState, u);
    if (
      (c && ((o.memoizedState = u), (Je = !0)),
      (o = o.queue),
      ea(rc.bind(null, n, o, e), [e]),
      o.getSnapshot !== t || c || (Oe !== null && Oe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Vr(9, nc.bind(null, n, o, u, t), void 0, null),
        Ae === null)
      )
        throw Error(s(349));
      Sn & 30 || tc(n, t, u);
    }
    return u;
  }
  function tc(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ne.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ne.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function nc(e, t, n, o) {
    (t.value = n), (t.getSnapshot = o), ic(t) && sc(e);
  }
  function rc(e, t, n) {
    return n(function () {
      ic(t) && sc(e);
    });
  }
  function ic(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vt(e, n);
    } catch {
      return !0;
    }
  }
  function sc(e) {
    var t = Dt(e, 1);
    t !== null && kt(t, e, 1, -1);
  }
  function oc(e) {
    var t = bt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ur,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = zh.bind(null, Ne, e)),
      [t.memoizedState, e]
    );
  }
  function Vr(e, t, n, o) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: o, next: null }),
      (t = Ne.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ne.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((o = n.next), (n.next = e), (e.next = o), (t.lastEffect = e))),
      e
    );
  }
  function ac() {
    return ft().memoizedState;
  }
  function Yi(e, t, n, o) {
    var u = bt();
    (Ne.flags |= e),
      (u.memoizedState = Vr(1 | t, n, void 0, o === void 0 ? null : o));
  }
  function Ji(e, t, n, o) {
    var u = ft();
    o = o === void 0 ? null : o;
    var c = void 0;
    if (Re !== null) {
      var p = Re.memoizedState;
      if (((c = p.destroy), o !== null && Go(o, p.deps))) {
        u.memoizedState = Vr(t, n, c, o);
        return;
      }
    }
    (Ne.flags |= e), (u.memoizedState = Vr(1 | t, n, c, o));
  }
  function lc(e, t) {
    return Yi(8390656, 8, e, t);
  }
  function ea(e, t) {
    return Ji(2048, 8, e, t);
  }
  function uc(e, t) {
    return Ji(4, 2, e, t);
  }
  function cc(e, t) {
    return Ji(4, 4, e, t);
  }
  function dc(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function fc(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null), Ji(4, 4, dc.bind(null, t, e), n)
    );
  }
  function ta() {}
  function pc(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var o = n.memoizedState;
    return o !== null && t !== null && Go(t, o[1])
      ? o[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function hc(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var o = n.memoizedState;
    return o !== null && t !== null && Go(t, o[1])
      ? o[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function mc(e, t, n) {
    return Sn & 21
      ? (vt(n, t) ||
          ((n = Wl()), (Ne.lanes |= n), (kn |= n), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), (Je = !0)), (e.memoizedState = n));
  }
  function Dh(e, t) {
    var n = he;
    (he = n !== 0 && 4 > n ? n : 4), e(!0);
    var o = Qo.transition;
    Qo.transition = {};
    try {
      e(!1), t();
    } finally {
      (he = n), (Qo.transition = o);
    }
  }
  function gc() {
    return ft().memoizedState;
  }
  function Mh(e, t, n) {
    var o = sn(e);
    if (
      ((n = {
        lane: o,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vc(e))
    )
      yc(t, n);
    else if (((n = Qu(e, t, n, o)), n !== null)) {
      var u = Qe();
      kt(n, e, o, u), xc(n, t, o);
    }
  }
  function zh(e, t, n) {
    var o = sn(e),
      u = {
        lane: o,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (vc(e)) yc(t, u);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var p = t.lastRenderedState,
            y = c(p, n);
          if (((u.hasEagerState = !0), (u.eagerState = y), vt(y, p))) {
            var w = t.interleaved;
            w === null
              ? ((u.next = u), Uo(t))
              : ((u.next = w.next), (w.next = u)),
              (t.interleaved = u);
            return;
          }
        } catch {
        } finally {
        }
      (n = Qu(e, t, u, o)),
        n !== null && ((u = Qe()), kt(n, e, o, u), xc(n, t, o));
    }
  }
  function vc(e) {
    var t = e.alternate;
    return e === Ne || (t !== null && t === Ne);
  }
  function yc(e, t) {
    Fr = Gi = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function xc(e, t, n) {
    if (n & 4194240) {
      var o = t.lanes;
      (o &= e.pendingLanes), (n |= o), (t.lanes = n), no(e, n);
    }
  }
  var Xi = {
      readContext: dt,
      useCallback: Ue,
      useContext: Ue,
      useEffect: Ue,
      useImperativeHandle: Ue,
      useInsertionEffect: Ue,
      useLayoutEffect: Ue,
      useMemo: Ue,
      useReducer: Ue,
      useRef: Ue,
      useState: Ue,
      useDebugValue: Ue,
      useDeferredValue: Ue,
      useTransition: Ue,
      useMutableSource: Ue,
      useSyncExternalStore: Ue,
      useId: Ue,
      unstable_isNewReconciler: !1,
    },
    $h = {
      readContext: dt,
      useCallback: function (e, t) {
        return (bt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: dt,
      useEffect: lc,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Yi(4194308, 4, dc.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Yi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Yi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = bt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var o = bt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (o.memoizedState = o.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (o.queue = e),
          (e = e.dispatch = Mh.bind(null, Ne, e)),
          [o.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = bt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: oc,
      useDebugValue: ta,
      useDeferredValue: function (e) {
        return (bt().memoizedState = e);
      },
      useTransition: function () {
        var e = oc(!1),
          t = e[0];
        return (e = Dh.bind(null, e[1])), (bt().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var o = Ne,
          u = bt();
        if (Ee) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), Ae === null)) throw Error(s(349));
          Sn & 30 || tc(o, t, n);
        }
        u.memoizedState = n;
        var c = { value: n, getSnapshot: t };
        return (
          (u.queue = c),
          lc(rc.bind(null, o, c, e), [e]),
          (o.flags |= 2048),
          Vr(9, nc.bind(null, o, c, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = bt(),
          t = Ae.identifierPrefix;
        if (Ee) {
          var n = At,
            o = Ot;
          (n = (o & ~(1 << (32 - gt(o) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = Br++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":");
        } else (n = Ah++), (t = ":" + t + "r" + n.toString(32) + ":");
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Fh = {
      readContext: dt,
      useCallback: pc,
      useContext: dt,
      useEffect: ea,
      useImperativeHandle: fc,
      useInsertionEffect: uc,
      useLayoutEffect: cc,
      useMemo: hc,
      useReducer: Xo,
      useRef: ac,
      useState: function () {
        return Xo(Ur);
      },
      useDebugValue: ta,
      useDeferredValue: function (e) {
        var t = ft();
        return mc(t, Re.memoizedState, e);
      },
      useTransition: function () {
        var e = Xo(Ur)[0],
          t = ft().memoizedState;
        return [e, t];
      },
      useMutableSource: Zu,
      useSyncExternalStore: ec,
      useId: gc,
      unstable_isNewReconciler: !1,
    },
    Bh = {
      readContext: dt,
      useCallback: pc,
      useContext: dt,
      useEffect: ea,
      useImperativeHandle: fc,
      useInsertionEffect: uc,
      useLayoutEffect: cc,
      useMemo: hc,
      useReducer: Zo,
      useRef: ac,
      useState: function () {
        return Zo(Ur);
      },
      useDebugValue: ta,
      useDeferredValue: function (e) {
        var t = ft();
        return Re === null ? (t.memoizedState = e) : mc(t, Re.memoizedState, e);
      },
      useTransition: function () {
        var e = Zo(Ur)[0],
          t = ft().memoizedState;
        return [e, t];
      },
      useMutableSource: Zu,
      useSyncExternalStore: ec,
      useId: gc,
      unstable_isNewReconciler: !1,
    };
  function xt(e, t) {
    if (e && e.defaultProps) {
      (t = B({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function na(e, t, n, o) {
    (t = e.memoizedState),
      (n = n(o, t)),
      (n = n == null ? t : B({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Zi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? hn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var o = Qe(),
        u = sn(e),
        c = Mt(o, u);
      (c.payload = t),
        n != null && (c.callback = n),
        (t = en(e, c, u)),
        t !== null && (kt(t, e, u, o), Wi(t, e, u));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var o = Qe(),
        u = sn(e),
        c = Mt(o, u);
      (c.tag = 1),
        (c.payload = t),
        n != null && (c.callback = n),
        (t = en(e, c, u)),
        t !== null && (kt(t, e, u, o), Wi(t, e, u));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Qe(),
        o = sn(e),
        u = Mt(n, o);
      (u.tag = 2),
        t != null && (u.callback = t),
        (t = en(e, u, o)),
        t !== null && (kt(t, e, o, n), Wi(t, e, o));
    },
  };
  function wc(e, t, n, o, u, c, p) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(o, c, p)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Tr(n, o) || !Tr(u, c)
          : !0
    );
  }
  function Sc(e, t, n) {
    var o = !1,
      u = Jt,
      c = t.contextType;
    return (
      typeof c == "object" && c !== null
        ? (c = dt(c))
        : ((u = Ye(t) ? gn : Be.current),
          (o = t.contextTypes),
          (c = (o = o != null) ? Kn(e, u) : Jt)),
      (t = new t(n, c)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Zi),
      (e.stateNode = t),
      (t._reactInternals = e),
      o &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = u),
        (e.__reactInternalMemoizedMaskedChildContext = c)),
      t
    );
  }
  function kc(e, t, n, o) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, o),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, o),
      t.state !== e && Zi.enqueueReplaceState(t, t.state, null);
  }
  function ra(e, t, n, o) {
    var u = e.stateNode;
    (u.props = n), (u.state = e.memoizedState), (u.refs = {}), Vo(e);
    var c = t.contextType;
    typeof c == "object" && c !== null
      ? (u.context = dt(c))
      : ((c = Ye(t) ? gn : Be.current), (u.context = Kn(e, c))),
      (u.state = e.memoizedState),
      (c = t.getDerivedStateFromProps),
      typeof c == "function" && (na(e, t, c, n), (u.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((t = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" &&
          u.UNSAFE_componentWillMount(),
        t !== u.state && Zi.enqueueReplaceState(u, u.state, null),
        qi(e, n, u, o),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function tr(e, t) {
    try {
      var n = "",
        o = t;
      do (n += ce(o)), (o = o.return);
      while (o);
      var u = n;
    } catch (c) {
      u =
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack;
    }
    return { value: e, source: t, stack: u, digest: null };
  }
  function ia(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function sa(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var Uh = typeof WeakMap == "function" ? WeakMap : Map;
  function Ec(e, t, n) {
    (n = Mt(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var o = t.value;
    return (
      (n.callback = function () {
        os || ((os = !0), (wa = o)), sa(e, t);
      }),
      n
    );
  }
  function Cc(e, t, n) {
    (n = Mt(-1, n)), (n.tag = 3);
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var u = t.value;
      (n.payload = function () {
        return o(u);
      }),
        (n.callback = function () {
          sa(e, t);
        });
    }
    var c = e.stateNode;
    return (
      c !== null &&
        typeof c.componentDidCatch == "function" &&
        (n.callback = function () {
          sa(e, t),
            typeof o != "function" &&
              (nn === null ? (nn = new Set([this])) : nn.add(this));
          var p = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: p !== null ? p : "",
          });
        }),
      n
    );
  }
  function Nc(e, t, n) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Uh();
      var u = new Set();
      o.set(t, u);
    } else (u = o.get(t)), u === void 0 && ((u = new Set()), o.set(t, u));
    u.has(n) || (u.add(n), (e = nm.bind(null, e, t, n)), t.then(e, e));
  }
  function bc(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ic(e, t, n, o, u) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = u), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = Mt(-1, 1)), (t.tag = 2), en(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var Vh = W.ReactCurrentOwner,
    Je = !1;
  function Ke(e, t, n, o) {
    t.child = e === null ? Ku(t, null, n, o) : Jn(t, e.child, n, o);
  }
  function jc(e, t, n, o, u) {
    n = n.render;
    var c = t.ref;
    return (
      Zn(t, u),
      (o = Yo(e, t, n, o, c, u)),
      (n = Jo()),
      e !== null && !Je
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          zt(e, t, u))
        : (Ee && n && _o(t), (t.flags |= 1), Ke(e, t, o, u), t.child)
    );
  }
  function Tc(e, t, n, o, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" &&
        !Ia(c) &&
        c.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = c), Lc(e, t, c, o, u))
        : ((e = fs(n.type, null, o, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !(e.lanes & u))) {
      var p = c.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Tr), n(p, o) && e.ref === t.ref)
      )
        return zt(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = an(c, o)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Lc(e, t, n, o, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Tr(c, o) && e.ref === t.ref)
        if (((Je = !1), (t.pendingProps = o = c), (e.lanes & u) !== 0))
          e.flags & 131072 && (Je = !0);
        else return (t.lanes = e.lanes), zt(e, t, u);
    }
    return oa(e, t, n, o, u);
  }
  function Pc(e, t, n) {
    var o = t.pendingProps,
      u = o.children,
      c = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden")
      if (!(t.mode & 1))
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ve(rr, at),
          (at |= n);
      else {
        if (!(n & 1073741824))
          return (
            (e = c !== null ? c.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ve(rr, at),
            (at |= e),
            null
          );
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (o = c !== null ? c.baseLanes : n),
          ve(rr, at),
          (at |= o);
      }
    else
      c !== null ? ((o = c.baseLanes | n), (t.memoizedState = null)) : (o = n),
        ve(rr, at),
        (at |= o);
    return Ke(e, t, u, n), t.child;
  }
  function Rc(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function oa(e, t, n, o, u) {
    var c = Ye(n) ? gn : Be.current;
    return (
      (c = Kn(t, c)),
      Zn(t, u),
      (n = Yo(e, t, n, o, c, u)),
      (o = Jo()),
      e !== null && !Je
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          zt(e, t, u))
        : (Ee && o && _o(t), (t.flags |= 1), Ke(e, t, n, u), t.child)
    );
  }
  function _c(e, t, n, o, u) {
    if (Ye(n)) {
      var c = !0;
      Mi(t);
    } else c = !1;
    if ((Zn(t, u), t.stateNode === null))
      ts(e, t), Sc(t, n, o), ra(t, n, o, u), (o = !0);
    else if (e === null) {
      var p = t.stateNode,
        y = t.memoizedProps;
      p.props = y;
      var w = p.context,
        j = n.contextType;
      typeof j == "object" && j !== null
        ? (j = dt(j))
        : ((j = Ye(n) ? gn : Be.current), (j = Kn(t, j)));
      var A = n.getDerivedStateFromProps,
        D =
          typeof A == "function" ||
          typeof p.getSnapshotBeforeUpdate == "function";
      D ||
        (typeof p.UNSAFE_componentWillReceiveProps != "function" &&
          typeof p.componentWillReceiveProps != "function") ||
        ((y !== o || w !== j) && kc(t, p, o, j)),
        (Zt = !1);
      var O = t.memoizedState;
      (p.state = O),
        qi(t, o, p, u),
        (w = t.memoizedState),
        y !== o || O !== w || Ge.current || Zt
          ? (typeof A == "function" && (na(t, n, A, o), (w = t.memoizedState)),
            (y = Zt || wc(t, n, y, o, O, w, j))
              ? (D ||
                  (typeof p.UNSAFE_componentWillMount != "function" &&
                    typeof p.componentWillMount != "function") ||
                  (typeof p.componentWillMount == "function" &&
                    p.componentWillMount(),
                  typeof p.UNSAFE_componentWillMount == "function" &&
                    p.UNSAFE_componentWillMount()),
                typeof p.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof p.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = o),
                (t.memoizedState = w)),
            (p.props = o),
            (p.state = w),
            (p.context = j),
            (o = y))
          : (typeof p.componentDidMount == "function" && (t.flags |= 4194308),
            (o = !1));
    } else {
      (p = t.stateNode),
        Gu(e, t),
        (y = t.memoizedProps),
        (j = t.type === t.elementType ? y : xt(t.type, y)),
        (p.props = j),
        (D = t.pendingProps),
        (O = p.context),
        (w = n.contextType),
        typeof w == "object" && w !== null
          ? (w = dt(w))
          : ((w = Ye(n) ? gn : Be.current), (w = Kn(t, w)));
      var U = n.getDerivedStateFromProps;
      (A =
        typeof U == "function" ||
        typeof p.getSnapshotBeforeUpdate == "function") ||
        (typeof p.UNSAFE_componentWillReceiveProps != "function" &&
          typeof p.componentWillReceiveProps != "function") ||
        ((y !== D || O !== w) && kc(t, p, o, w)),
        (Zt = !1),
        (O = t.memoizedState),
        (p.state = O),
        qi(t, o, p, u);
      var H = t.memoizedState;
      y !== D || O !== H || Ge.current || Zt
        ? (typeof U == "function" && (na(t, n, U, o), (H = t.memoizedState)),
          (j = Zt || wc(t, n, j, o, O, H, w) || !1)
            ? (A ||
                (typeof p.UNSAFE_componentWillUpdate != "function" &&
                  typeof p.componentWillUpdate != "function") ||
                (typeof p.componentWillUpdate == "function" &&
                  p.componentWillUpdate(o, H, w),
                typeof p.UNSAFE_componentWillUpdate == "function" &&
                  p.UNSAFE_componentWillUpdate(o, H, w)),
              typeof p.componentDidUpdate == "function" && (t.flags |= 4),
              typeof p.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof p.componentDidUpdate != "function" ||
                (y === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 4),
              typeof p.getSnapshotBeforeUpdate != "function" ||
                (y === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = o),
              (t.memoizedState = H)),
          (p.props = o),
          (p.state = H),
          (p.context = w),
          (o = j))
        : (typeof p.componentDidUpdate != "function" ||
            (y === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 4),
          typeof p.getSnapshotBeforeUpdate != "function" ||
            (y === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 1024),
          (o = !1));
    }
    return aa(e, t, n, o, c, u);
  }
  function aa(e, t, n, o, u, c) {
    Rc(e, t);
    var p = (t.flags & 128) !== 0;
    if (!o && !p) return u && zu(t, n, !1), zt(e, t, c);
    (o = t.stateNode), (Vh.current = t);
    var y =
      p && typeof n.getDerivedStateFromError != "function" ? null : o.render();
    return (
      (t.flags |= 1),
      e !== null && p
        ? ((t.child = Jn(t, e.child, null, c)), (t.child = Jn(t, null, y, c)))
        : Ke(e, t, y, c),
      (t.memoizedState = o.state),
      u && zu(t, n, !0),
      t.child
    );
  }
  function Oc(e) {
    var t = e.stateNode;
    t.pendingContext
      ? Du(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Du(e, t.context, !1),
      Ho(e, t.containerInfo);
  }
  function Ac(e, t, n, o, u) {
    return Yn(), Mo(u), (t.flags |= 256), Ke(e, t, n, o), t.child;
  }
  var la = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ua(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Dc(e, t, n) {
    var o = t.pendingProps,
      u = Ce.current,
      c = !1,
      p = (t.flags & 128) !== 0,
      y;
    if (
      ((y = p) ||
        (y = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0),
      y
        ? ((c = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (u |= 1),
      ve(Ce, u & 1),
      e === null)
    )
      return (
        Do(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((p = o.children),
            (e = o.fallback),
            c
              ? ((o = t.mode),
                (c = t.child),
                (p = { mode: "hidden", children: p }),
                !(o & 1) && c !== null
                  ? ((c.childLanes = 0), (c.pendingProps = p))
                  : (c = ps(p, o, 0, null)),
                (e = bn(e, o, n, null)),
                (c.return = t),
                (e.return = t),
                (c.sibling = e),
                (t.child = c),
                (t.child.memoizedState = ua(n)),
                (t.memoizedState = la),
                e)
              : ca(t, p))
      );
    if (((u = e.memoizedState), u !== null && ((y = u.dehydrated), y !== null)))
      return Hh(e, t, p, o, y, u, n);
    if (c) {
      (c = o.fallback), (p = t.mode), (u = e.child), (y = u.sibling);
      var w = { mode: "hidden", children: o.children };
      return (
        !(p & 1) && t.child !== u
          ? ((o = t.child),
            (o.childLanes = 0),
            (o.pendingProps = w),
            (t.deletions = null))
          : ((o = an(u, w)), (o.subtreeFlags = u.subtreeFlags & 14680064)),
        y !== null ? (c = an(y, c)) : ((c = bn(c, p, n, null)), (c.flags |= 2)),
        (c.return = t),
        (o.return = t),
        (o.sibling = c),
        (t.child = o),
        (o = c),
        (c = t.child),
        (p = e.child.memoizedState),
        (p =
          p === null
            ? ua(n)
            : {
                baseLanes: p.baseLanes | n,
                cachePool: null,
                transitions: p.transitions,
              }),
        (c.memoizedState = p),
        (c.childLanes = e.childLanes & ~n),
        (t.memoizedState = la),
        o
      );
    }
    return (
      (c = e.child),
      (e = c.sibling),
      (o = an(c, { mode: "visible", children: o.children })),
      !(t.mode & 1) && (o.lanes = n),
      (o.return = t),
      (o.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = o),
      (t.memoizedState = null),
      o
    );
  }
  function ca(e, t) {
    return (
      (t = ps({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function es(e, t, n, o) {
    return (
      o !== null && Mo(o),
      Jn(t, e.child, null, n),
      (e = ca(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Hh(e, t, n, o, u, c, p) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (o = ia(Error(s(422)))), es(e, t, p, o))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((c = o.fallback),
            (u = t.mode),
            (o = ps({ mode: "visible", children: o.children }, u, 0, null)),
            (c = bn(c, u, p, null)),
            (c.flags |= 2),
            (o.return = t),
            (c.return = t),
            (o.sibling = c),
            (t.child = o),
            t.mode & 1 && Jn(t, e.child, null, p),
            (t.child.memoizedState = ua(p)),
            (t.memoizedState = la),
            c);
    if (!(t.mode & 1)) return es(e, t, p, null);
    if (u.data === "$!") {
      if (((o = u.nextSibling && u.nextSibling.dataset), o)) var y = o.dgst;
      return (
        (o = y), (c = Error(s(419))), (o = ia(c, o, void 0)), es(e, t, p, o)
      );
    }
    if (((y = (p & e.childLanes) !== 0), Je || y)) {
      if (((o = Ae), o !== null)) {
        switch (p & -p) {
          case 4:
            u = 2;
            break;
          case 16:
            u = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            u = 32;
            break;
          case 536870912:
            u = 268435456;
            break;
          default:
            u = 0;
        }
        (u = u & (o.suspendedLanes | p) ? 0 : u),
          u !== 0 &&
            u !== c.retryLane &&
            ((c.retryLane = u), Dt(e, u), kt(o, e, u, -1));
      }
      return ba(), (o = ia(Error(s(421)))), es(e, t, p, o);
    }
    return u.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = rm.bind(null, e)),
        (u._reactRetry = t),
        null)
      : ((e = c.treeContext),
        (ot = Gt(u.nextSibling)),
        (st = t),
        (Ee = !0),
        (yt = null),
        e !== null &&
          ((ut[ct++] = Ot),
          (ut[ct++] = At),
          (ut[ct++] = vn),
          (Ot = e.id),
          (At = e.overflow),
          (vn = t)),
        (t = ca(t, o.children)),
        (t.flags |= 4096),
        t);
  }
  function Mc(e, t, n) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), Bo(e.return, t, n);
  }
  function da(e, t, n, o, u) {
    var c = e.memoizedState;
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: o,
          tail: n,
          tailMode: u,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = o),
        (c.tail = n),
        (c.tailMode = u));
  }
  function zc(e, t, n) {
    var o = t.pendingProps,
      u = o.revealOrder,
      c = o.tail;
    if ((Ke(e, t, o.children, n), (o = Ce.current), o & 2))
      (o = (o & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Mc(e, n, t);
          else if (e.tag === 19) Mc(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      o &= 1;
    }
    if ((ve(Ce, o), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (u) {
        case "forwards":
          for (n = t.child, u = null; n !== null; )
            (e = n.alternate),
              e !== null && Ki(e) === null && (u = n),
              (n = n.sibling);
          (n = u),
            n === null
              ? ((u = t.child), (t.child = null))
              : ((u = n.sibling), (n.sibling = null)),
            da(t, !1, u, n, c);
          break;
        case "backwards":
          for (n = null, u = t.child, t.child = null; u !== null; ) {
            if (((e = u.alternate), e !== null && Ki(e) === null)) {
              t.child = u;
              break;
            }
            (e = u.sibling), (u.sibling = n), (n = u), (u = e);
          }
          da(t, !0, n, null, c);
          break;
        case "together":
          da(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function ts(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function zt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (kn |= t.lanes),
      !(n & t.childLanes))
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, n = an(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = an(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Wh(e, t, n) {
    switch (t.tag) {
      case 3:
        Oc(t), Yn();
        break;
      case 5:
        Xu(t);
        break;
      case 1:
        Ye(t.type) && Mi(t);
        break;
      case 4:
        Ho(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context,
          u = t.memoizedProps.value;
        ve(Vi, o._currentValue), (o._currentValue = u);
        break;
      case 13:
        if (((o = t.memoizedState), o !== null))
          return o.dehydrated !== null
            ? (ve(Ce, Ce.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? Dc(e, t, n)
              : (ve(Ce, Ce.current & 1),
                (e = zt(e, t, n)),
                e !== null ? e.sibling : null);
        ve(Ce, Ce.current & 1);
        break;
      case 19:
        if (((o = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (o) return zc(e, t, n);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          ve(Ce, Ce.current),
          o)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Pc(e, t, n);
    }
    return zt(e, t, n);
  }
  var $c, fa, Fc, Bc;
  ($c = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (fa = function () {}),
    (Fc = function (e, t, n, o) {
      var u = e.memoizedProps;
      if (u !== o) {
        (e = t.stateNode), wn(Nt.current);
        var c = null;
        switch (n) {
          case "input":
            (u = Fs(e, u)), (o = Fs(e, o)), (c = []);
            break;
          case "select":
            (u = B({}, u, { value: void 0 })),
              (o = B({}, o, { value: void 0 })),
              (c = []);
            break;
          case "textarea":
            (u = Vs(e, u)), (o = Vs(e, o)), (c = []);
            break;
          default:
            typeof u.onClick != "function" &&
              typeof o.onClick == "function" &&
              (e.onclick = Oi);
        }
        Ws(n, o);
        var p;
        n = null;
        for (j in u)
          if (!o.hasOwnProperty(j) && u.hasOwnProperty(j) && u[j] != null)
            if (j === "style") {
              var y = u[j];
              for (p in y) y.hasOwnProperty(p) && (n || (n = {}), (n[p] = ""));
            } else
              j !== "dangerouslySetInnerHTML" &&
                j !== "children" &&
                j !== "suppressContentEditableWarning" &&
                j !== "suppressHydrationWarning" &&
                j !== "autoFocus" &&
                (l.hasOwnProperty(j)
                  ? c || (c = [])
                  : (c = c || []).push(j, null));
        for (j in o) {
          var w = o[j];
          if (
            ((y = u != null ? u[j] : void 0),
            o.hasOwnProperty(j) && w !== y && (w != null || y != null))
          )
            if (j === "style")
              if (y) {
                for (p in y)
                  !y.hasOwnProperty(p) ||
                    (w && w.hasOwnProperty(p)) ||
                    (n || (n = {}), (n[p] = ""));
                for (p in w)
                  w.hasOwnProperty(p) &&
                    y[p] !== w[p] &&
                    (n || (n = {}), (n[p] = w[p]));
              } else n || (c || (c = []), c.push(j, n)), (n = w);
            else
              j === "dangerouslySetInnerHTML"
                ? ((w = w ? w.__html : void 0),
                  (y = y ? y.__html : void 0),
                  w != null && y !== w && (c = c || []).push(j, w))
                : j === "children"
                  ? (typeof w != "string" && typeof w != "number") ||
                    (c = c || []).push(j, "" + w)
                  : j !== "suppressContentEditableWarning" &&
                    j !== "suppressHydrationWarning" &&
                    (l.hasOwnProperty(j)
                      ? (w != null && j === "onScroll" && xe("scroll", e),
                        c || y === w || (c = []))
                      : (c = c || []).push(j, w));
        }
        n && (c = c || []).push("style", n);
        var j = c;
        (t.updateQueue = j) && (t.flags |= 4);
      }
    }),
    (Bc = function (e, t, n, o) {
      n !== o && (t.flags |= 4);
    });
  function Hr(e, t) {
    if (!Ee)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var o = null; n !== null; )
            n.alternate !== null && (o = n), (n = n.sibling);
          o === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (o.sibling = null);
      }
  }
  function Ve(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      o = 0;
    if (t)
      for (var u = e.child; u !== null; )
        (n |= u.lanes | u.childLanes),
          (o |= u.subtreeFlags & 14680064),
          (o |= u.flags & 14680064),
          (u.return = e),
          (u = u.sibling);
    else
      for (u = e.child; u !== null; )
        (n |= u.lanes | u.childLanes),
          (o |= u.subtreeFlags),
          (o |= u.flags),
          (u.return = e),
          (u = u.sibling);
    return (e.subtreeFlags |= o), (e.childLanes = n), t;
  }
  function qh(e, t, n) {
    var o = t.pendingProps;
    switch ((Oo(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ve(t), null;
      case 1:
        return Ye(t.type) && Di(), Ve(t), null;
      case 3:
        return (
          (o = t.stateNode),
          er(),
          we(Ge),
          we(Be),
          Ko(),
          o.pendingContext &&
            ((o.context = o.pendingContext), (o.pendingContext = null)),
          (e === null || e.child === null) &&
            (Bi(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), yt !== null && (Ea(yt), (yt = null)))),
          fa(e, t),
          Ve(t),
          null
        );
      case 5:
        Wo(t);
        var u = wn($r.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          Fc(e, t, n, o, u),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(s(166));
            return Ve(t), null;
          }
          if (((e = wn(Nt.current)), Bi(t))) {
            (o = t.stateNode), (n = t.type);
            var c = t.memoizedProps;
            switch (((o[Ct] = t), (o[Or] = c), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                xe("cancel", o), xe("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                xe("load", o);
                break;
              case "video":
              case "audio":
                for (u = 0; u < Pr.length; u++) xe(Pr[u], o);
                break;
              case "source":
                xe("error", o);
                break;
              case "img":
              case "image":
              case "link":
                xe("error", o), xe("load", o);
                break;
              case "details":
                xe("toggle", o);
                break;
              case "input":
                Sl(o, c), xe("invalid", o);
                break;
              case "select":
                (o._wrapperState = { wasMultiple: !!c.multiple }),
                  xe("invalid", o);
                break;
              case "textarea":
                Cl(o, c), xe("invalid", o);
            }
            Ws(n, c), (u = null);
            for (var p in c)
              if (c.hasOwnProperty(p)) {
                var y = c[p];
                p === "children"
                  ? typeof y == "string"
                    ? o.textContent !== y &&
                      (c.suppressHydrationWarning !== !0 &&
                        _i(o.textContent, y, e),
                      (u = ["children", y]))
                    : typeof y == "number" &&
                      o.textContent !== "" + y &&
                      (c.suppressHydrationWarning !== !0 &&
                        _i(o.textContent, y, e),
                      (u = ["children", "" + y]))
                  : l.hasOwnProperty(p) &&
                    y != null &&
                    p === "onScroll" &&
                    xe("scroll", o);
              }
            switch (n) {
              case "input":
                ci(o), El(o, c, !0);
                break;
              case "textarea":
                ci(o), bl(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof c.onClick == "function" && (o.onclick = Oi);
            }
            (o = u), (t.updateQueue = o), o !== null && (t.flags |= 4);
          } else {
            (p = u.nodeType === 9 ? u : u.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Il(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = p.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof o.is == "string"
                    ? (e = p.createElement(n, { is: o.is }))
                    : ((e = p.createElement(n)),
                      n === "select" &&
                        ((p = e),
                        o.multiple
                          ? (p.multiple = !0)
                          : o.size && (p.size = o.size)))
                : (e = p.createElementNS(e, n)),
              (e[Ct] = t),
              (e[Or] = o),
              $c(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((p = qs(n, o)), n)) {
                case "dialog":
                  xe("cancel", e), xe("close", e), (u = o);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  xe("load", e), (u = o);
                  break;
                case "video":
                case "audio":
                  for (u = 0; u < Pr.length; u++) xe(Pr[u], e);
                  u = o;
                  break;
                case "source":
                  xe("error", e), (u = o);
                  break;
                case "img":
                case "image":
                case "link":
                  xe("error", e), xe("load", e), (u = o);
                  break;
                case "details":
                  xe("toggle", e), (u = o);
                  break;
                case "input":
                  Sl(e, o), (u = Fs(e, o)), xe("invalid", e);
                  break;
                case "option":
                  u = o;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!o.multiple }),
                    (u = B({}, o, { value: void 0 })),
                    xe("invalid", e);
                  break;
                case "textarea":
                  Cl(e, o), (u = Vs(e, o)), xe("invalid", e);
                  break;
                default:
                  u = o;
              }
              Ws(n, u), (y = u);
              for (c in y)
                if (y.hasOwnProperty(c)) {
                  var w = y[c];
                  c === "style"
                    ? Ll(e, w)
                    : c === "dangerouslySetInnerHTML"
                      ? ((w = w ? w.__html : void 0), w != null && jl(e, w))
                      : c === "children"
                        ? typeof w == "string"
                          ? (n !== "textarea" || w !== "") && fr(e, w)
                          : typeof w == "number" && fr(e, "" + w)
                        : c !== "suppressContentEditableWarning" &&
                          c !== "suppressHydrationWarning" &&
                          c !== "autoFocus" &&
                          (l.hasOwnProperty(c)
                            ? w != null && c === "onScroll" && xe("scroll", e)
                            : w != null && G(e, c, w, p));
                }
              switch (n) {
                case "input":
                  ci(e), El(e, o, !1);
                  break;
                case "textarea":
                  ci(e), bl(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + pe(o.value));
                  break;
                case "select":
                  (e.multiple = !!o.multiple),
                    (c = o.value),
                    c != null
                      ? An(e, !!o.multiple, c, !1)
                      : o.defaultValue != null &&
                        An(e, !!o.multiple, o.defaultValue, !0);
                  break;
                default:
                  typeof u.onClick == "function" && (e.onclick = Oi);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return Ve(t), null;
      case 6:
        if (e && t.stateNode != null) Bc(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(s(166));
          if (((n = wn($r.current)), wn(Nt.current), Bi(t))) {
            if (
              ((o = t.stateNode),
              (n = t.memoizedProps),
              (o[Ct] = t),
              (c = o.nodeValue !== n) && ((e = st), e !== null))
            )
              switch (e.tag) {
                case 3:
                  _i(o.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    _i(o.nodeValue, n, (e.mode & 1) !== 0);
              }
            c && (t.flags |= 4);
          } else
            (o = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(o)),
              (o[Ct] = t),
              (t.stateNode = o);
        }
        return Ve(t), null;
      case 13:
        if (
          (we(Ce),
          (o = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (Ee && ot !== null && t.mode & 1 && !(t.flags & 128))
            Hu(), Yn(), (t.flags |= 98560), (c = !1);
          else if (((c = Bi(t)), o !== null && o.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(s(318));
              if (
                ((c = t.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              )
                throw Error(s(317));
              c[Ct] = t;
            } else
              Yn(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4);
            Ve(t), (c = !1);
          } else yt !== null && (Ea(yt), (yt = null)), (c = !0);
          if (!c) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((o = o !== null),
            o !== (e !== null && e.memoizedState !== null) &&
              o &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || Ce.current & 1 ? _e === 0 && (_e = 3) : ba())),
            t.updateQueue !== null && (t.flags |= 4),
            Ve(t),
            null);
      case 4:
        return (
          er(),
          fa(e, t),
          e === null && Rr(t.stateNode.containerInfo),
          Ve(t),
          null
        );
      case 10:
        return Fo(t.type._context), Ve(t), null;
      case 17:
        return Ye(t.type) && Di(), Ve(t), null;
      case 19:
        if ((we(Ce), (c = t.memoizedState), c === null)) return Ve(t), null;
        if (((o = (t.flags & 128) !== 0), (p = c.rendering), p === null))
          if (o) Hr(c, !1);
          else {
            if (_e !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((p = Ki(e)), p !== null)) {
                  for (
                    t.flags |= 128,
                      Hr(c, !1),
                      o = p.updateQueue,
                      o !== null && ((t.updateQueue = o), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      o = n,
                      n = t.child;
                    n !== null;

                  )
                    (c = n),
                      (e = o),
                      (c.flags &= 14680066),
                      (p = c.alternate),
                      p === null
                        ? ((c.childLanes = 0),
                          (c.lanes = e),
                          (c.child = null),
                          (c.subtreeFlags = 0),
                          (c.memoizedProps = null),
                          (c.memoizedState = null),
                          (c.updateQueue = null),
                          (c.dependencies = null),
                          (c.stateNode = null))
                        : ((c.childLanes = p.childLanes),
                          (c.lanes = p.lanes),
                          (c.child = p.child),
                          (c.subtreeFlags = 0),
                          (c.deletions = null),
                          (c.memoizedProps = p.memoizedProps),
                          (c.memoizedState = p.memoizedState),
                          (c.updateQueue = p.updateQueue),
                          (c.type = p.type),
                          (e = p.dependencies),
                          (c.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling);
                  return ve(Ce, (Ce.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            c.tail !== null &&
              je() > ir &&
              ((t.flags |= 128), (o = !0), Hr(c, !1), (t.lanes = 4194304));
          }
        else {
          if (!o)
            if (((e = Ki(p)), e !== null)) {
              if (
                ((t.flags |= 128),
                (o = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                Hr(c, !0),
                c.tail === null &&
                  c.tailMode === "hidden" &&
                  !p.alternate &&
                  !Ee)
              )
                return Ve(t), null;
            } else
              2 * je() - c.renderingStartTime > ir &&
                n !== 1073741824 &&
                ((t.flags |= 128), (o = !0), Hr(c, !1), (t.lanes = 4194304));
          c.isBackwards
            ? ((p.sibling = t.child), (t.child = p))
            : ((n = c.last),
              n !== null ? (n.sibling = p) : (t.child = p),
              (c.last = p));
        }
        return c.tail !== null
          ? ((t = c.tail),
            (c.rendering = t),
            (c.tail = t.sibling),
            (c.renderingStartTime = je()),
            (t.sibling = null),
            (n = Ce.current),
            ve(Ce, o ? (n & 1) | 2 : n & 1),
            t)
          : (Ve(t), null);
      case 22:
      case 23:
        return (
          Na(),
          (o = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== o && (t.flags |= 8192),
          o && t.mode & 1
            ? at & 1073741824 &&
              (Ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ve(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Kh(e, t) {
    switch ((Oo(t), t.tag)) {
      case 1:
        return (
          Ye(t.type) && Di(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          er(),
          we(Ge),
          we(Be),
          Ko(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return Wo(t), null;
      case 13:
        if (
          (we(Ce), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          Yn();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return we(Ce), null;
      case 4:
        return er(), null;
      case 10:
        return Fo(t.type._context), null;
      case 22:
      case 23:
        return Na(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ns = !1,
    He = !1,
    Qh = typeof WeakSet == "function" ? WeakSet : Set,
    V = null;
  function nr(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (o) {
          Ie(e, t, o);
        }
      else n.current = null;
  }
  function pa(e, t, n) {
    try {
      n();
    } catch (o) {
      Ie(e, t, o);
    }
  }
  var Uc = !1;
  function Gh(e, t) {
    if (((No = ki), (e = wu()), vo(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var o = n.getSelection && n.getSelection();
          if (o && o.rangeCount !== 0) {
            n = o.anchorNode;
            var u = o.anchorOffset,
              c = o.focusNode;
            o = o.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break e;
            }
            var p = 0,
              y = -1,
              w = -1,
              j = 0,
              A = 0,
              D = e,
              O = null;
            t: for (;;) {
              for (
                var U;
                D !== n || (u !== 0 && D.nodeType !== 3) || (y = p + u),
                  D !== c || (o !== 0 && D.nodeType !== 3) || (w = p + o),
                  D.nodeType === 3 && (p += D.nodeValue.length),
                  (U = D.firstChild) !== null;

              )
                (O = D), (D = U);
              for (;;) {
                if (D === e) break t;
                if (
                  (O === n && ++j === u && (y = p),
                  O === c && ++A === o && (w = p),
                  (U = D.nextSibling) !== null)
                )
                  break;
                (D = O), (O = D.parentNode);
              }
              D = U;
            }
            n = y === -1 || w === -1 ? null : { start: y, end: w };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      bo = { focusedElem: e, selectionRange: n }, ki = !1, V = t;
      V !== null;

    )
      if (((t = V), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        (e.return = t), (V = e);
      else
        for (; V !== null; ) {
          t = V;
          try {
            var H = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (H !== null) {
                    var q = H.memoizedProps,
                      Te = H.memoizedState,
                      N = t.stateNode,
                      k = N.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? q : xt(t.type, q),
                        Te,
                      );
                    N.__reactInternalSnapshotBeforeUpdate = k;
                  }
                  break;
                case 3:
                  var b = t.stateNode.containerInfo;
                  b.nodeType === 1
                    ? (b.textContent = "")
                    : b.nodeType === 9 &&
                      b.documentElement &&
                      b.removeChild(b.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
          } catch (z) {
            Ie(t, t.return, z);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (V = e);
            break;
          }
          V = t.return;
        }
    return (H = Uc), (Uc = !1), H;
  }
  function Wr(e, t, n) {
    var o = t.updateQueue;
    if (((o = o !== null ? o.lastEffect : null), o !== null)) {
      var u = (o = o.next);
      do {
        if ((u.tag & e) === e) {
          var c = u.destroy;
          (u.destroy = void 0), c !== void 0 && pa(t, n, c);
        }
        u = u.next;
      } while (u !== o);
    }
  }
  function rs(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var o = n.create;
          n.destroy = o();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function ha(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function Vc(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Vc(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Ct],
          delete t[Or],
          delete t[Lo],
          delete t[Ph],
          delete t[Rh])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function Hc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Wc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Hc(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ma(e, t, n) {
    var o = e.tag;
    if (o === 5 || o === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Oi));
    else if (o !== 4 && ((e = e.child), e !== null))
      for (ma(e, t, n), e = e.sibling; e !== null; )
        ma(e, t, n), (e = e.sibling);
  }
  function ga(e, t, n) {
    var o = e.tag;
    if (o === 5 || o === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (o !== 4 && ((e = e.child), e !== null))
      for (ga(e, t, n), e = e.sibling; e !== null; )
        ga(e, t, n), (e = e.sibling);
  }
  var ze = null,
    wt = !1;
  function tn(e, t, n) {
    for (n = n.child; n !== null; ) qc(e, t, n), (n = n.sibling);
  }
  function qc(e, t, n) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(gi, n);
      } catch {}
    switch (n.tag) {
      case 5:
        He || nr(n, t);
      case 6:
        var o = ze,
          u = wt;
        (ze = null),
          tn(e, t, n),
          (ze = o),
          (wt = u),
          ze !== null &&
            (wt
              ? ((e = ze),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : ze.removeChild(n.stateNode));
        break;
      case 18:
        ze !== null &&
          (wt
            ? ((e = ze),
              (n = n.stateNode),
              e.nodeType === 8
                ? To(e.parentNode, n)
                : e.nodeType === 1 && To(e, n),
              Er(e))
            : To(ze, n.stateNode));
        break;
      case 4:
        (o = ze),
          (u = wt),
          (ze = n.stateNode.containerInfo),
          (wt = !0),
          tn(e, t, n),
          (ze = o),
          (wt = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !He &&
          ((o = n.updateQueue), o !== null && ((o = o.lastEffect), o !== null))
        ) {
          u = o = o.next;
          do {
            var c = u,
              p = c.destroy;
            (c = c.tag),
              p !== void 0 && (c & 2 || c & 4) && pa(n, t, p),
              (u = u.next);
          } while (u !== o);
        }
        tn(e, t, n);
        break;
      case 1:
        if (
          !He &&
          (nr(n, t),
          (o = n.stateNode),
          typeof o.componentWillUnmount == "function")
        )
          try {
            (o.props = n.memoizedProps),
              (o.state = n.memoizedState),
              o.componentWillUnmount();
          } catch (y) {
            Ie(n, t, y);
          }
        tn(e, t, n);
        break;
      case 21:
        tn(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((He = (o = He) || n.memoizedState !== null), tn(e, t, n), (He = o))
          : tn(e, t, n);
        break;
      default:
        tn(e, t, n);
    }
  }
  function Kc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Qh()),
        t.forEach(function (o) {
          var u = im.bind(null, e, o);
          n.has(o) || (n.add(o), o.then(u, u));
        });
    }
  }
  function St(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var o = 0; o < n.length; o++) {
        var u = n[o];
        try {
          var c = e,
            p = t,
            y = p;
          e: for (; y !== null; ) {
            switch (y.tag) {
              case 5:
                (ze = y.stateNode), (wt = !1);
                break e;
              case 3:
                (ze = y.stateNode.containerInfo), (wt = !0);
                break e;
              case 4:
                (ze = y.stateNode.containerInfo), (wt = !0);
                break e;
            }
            y = y.return;
          }
          if (ze === null) throw Error(s(160));
          qc(c, p, u), (ze = null), (wt = !1);
          var w = u.alternate;
          w !== null && (w.return = null), (u.return = null);
        } catch (j) {
          Ie(u, t, j);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) Qc(t, e), (t = t.sibling);
  }
  function Qc(e, t) {
    var n = e.alternate,
      o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((St(t, e), It(e), o & 4)) {
          try {
            Wr(3, e, e.return), rs(3, e);
          } catch (q) {
            Ie(e, e.return, q);
          }
          try {
            Wr(5, e, e.return);
          } catch (q) {
            Ie(e, e.return, q);
          }
        }
        break;
      case 1:
        St(t, e), It(e), o & 512 && n !== null && nr(n, n.return);
        break;
      case 5:
        if (
          (St(t, e),
          It(e),
          o & 512 && n !== null && nr(n, n.return),
          e.flags & 32)
        ) {
          var u = e.stateNode;
          try {
            fr(u, "");
          } catch (q) {
            Ie(e, e.return, q);
          }
        }
        if (o & 4 && ((u = e.stateNode), u != null)) {
          var c = e.memoizedProps,
            p = n !== null ? n.memoizedProps : c,
            y = e.type,
            w = e.updateQueue;
          if (((e.updateQueue = null), w !== null))
            try {
              y === "input" && c.type === "radio" && c.name != null && kl(u, c),
                qs(y, p);
              var j = qs(y, c);
              for (p = 0; p < w.length; p += 2) {
                var A = w[p],
                  D = w[p + 1];
                A === "style"
                  ? Ll(u, D)
                  : A === "dangerouslySetInnerHTML"
                    ? jl(u, D)
                    : A === "children"
                      ? fr(u, D)
                      : G(u, A, D, j);
              }
              switch (y) {
                case "input":
                  Bs(u, c);
                  break;
                case "textarea":
                  Nl(u, c);
                  break;
                case "select":
                  var O = u._wrapperState.wasMultiple;
                  u._wrapperState.wasMultiple = !!c.multiple;
                  var U = c.value;
                  U != null
                    ? An(u, !!c.multiple, U, !1)
                    : O !== !!c.multiple &&
                      (c.defaultValue != null
                        ? An(u, !!c.multiple, c.defaultValue, !0)
                        : An(u, !!c.multiple, c.multiple ? [] : "", !1));
              }
              u[Or] = c;
            } catch (q) {
              Ie(e, e.return, q);
            }
        }
        break;
      case 6:
        if ((St(t, e), It(e), o & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          (u = e.stateNode), (c = e.memoizedProps);
          try {
            u.nodeValue = c;
          } catch (q) {
            Ie(e, e.return, q);
          }
        }
        break;
      case 3:
        if (
          (St(t, e), It(e), o & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Er(t.containerInfo);
          } catch (q) {
            Ie(e, e.return, q);
          }
        break;
      case 4:
        St(t, e), It(e);
        break;
      case 13:
        St(t, e),
          It(e),
          (u = e.child),
          u.flags & 8192 &&
            ((c = u.memoizedState !== null),
            (u.stateNode.isHidden = c),
            !c ||
              (u.alternate !== null && u.alternate.memoizedState !== null) ||
              (xa = je())),
          o & 4 && Kc(e);
        break;
      case 22:
        if (
          ((A = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((He = (j = He) || A), St(t, e), (He = j)) : St(t, e),
          It(e),
          o & 8192)
        ) {
          if (
            ((j = e.memoizedState !== null),
            (e.stateNode.isHidden = j) && !A && e.mode & 1)
          )
            for (V = e, A = e.child; A !== null; ) {
              for (D = V = A; V !== null; ) {
                switch (((O = V), (U = O.child), O.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Wr(4, O, O.return);
                    break;
                  case 1:
                    nr(O, O.return);
                    var H = O.stateNode;
                    if (typeof H.componentWillUnmount == "function") {
                      (o = O), (n = O.return);
                      try {
                        (t = o),
                          (H.props = t.memoizedProps),
                          (H.state = t.memoizedState),
                          H.componentWillUnmount();
                      } catch (q) {
                        Ie(o, n, q);
                      }
                    }
                    break;
                  case 5:
                    nr(O, O.return);
                    break;
                  case 22:
                    if (O.memoizedState !== null) {
                      Jc(D);
                      continue;
                    }
                }
                U !== null ? ((U.return = O), (V = U)) : Jc(D);
              }
              A = A.sibling;
            }
          e: for (A = null, D = e; ; ) {
            if (D.tag === 5) {
              if (A === null) {
                A = D;
                try {
                  (u = D.stateNode),
                    j
                      ? ((c = u.style),
                        typeof c.setProperty == "function"
                          ? c.setProperty("display", "none", "important")
                          : (c.display = "none"))
                      : ((y = D.stateNode),
                        (w = D.memoizedProps.style),
                        (p =
                          w != null && w.hasOwnProperty("display")
                            ? w.display
                            : null),
                        (y.style.display = Tl("display", p)));
                } catch (q) {
                  Ie(e, e.return, q);
                }
              }
            } else if (D.tag === 6) {
              if (A === null)
                try {
                  D.stateNode.nodeValue = j ? "" : D.memoizedProps;
                } catch (q) {
                  Ie(e, e.return, q);
                }
            } else if (
              ((D.tag !== 22 && D.tag !== 23) ||
                D.memoizedState === null ||
                D === e) &&
              D.child !== null
            ) {
              (D.child.return = D), (D = D.child);
              continue;
            }
            if (D === e) break e;
            for (; D.sibling === null; ) {
              if (D.return === null || D.return === e) break e;
              A === D && (A = null), (D = D.return);
            }
            A === D && (A = null),
              (D.sibling.return = D.return),
              (D = D.sibling);
          }
        }
        break;
      case 19:
        St(t, e), It(e), o & 4 && Kc(e);
        break;
      case 21:
        break;
      default:
        St(t, e), It(e);
    }
  }
  function It(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Hc(n)) {
              var o = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (o.tag) {
          case 5:
            var u = o.stateNode;
            o.flags & 32 && (fr(u, ""), (o.flags &= -33));
            var c = Wc(e);
            ga(e, c, u);
            break;
          case 3:
          case 4:
            var p = o.stateNode.containerInfo,
              y = Wc(e);
            ma(e, y, p);
            break;
          default:
            throw Error(s(161));
        }
      } catch (w) {
        Ie(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Yh(e, t, n) {
    (V = e), Gc(e);
  }
  function Gc(e, t, n) {
    for (var o = (e.mode & 1) !== 0; V !== null; ) {
      var u = V,
        c = u.child;
      if (u.tag === 22 && o) {
        var p = u.memoizedState !== null || ns;
        if (!p) {
          var y = u.alternate,
            w = (y !== null && y.memoizedState !== null) || He;
          y = ns;
          var j = He;
          if (((ns = p), (He = w) && !j))
            for (V = u; V !== null; )
              (p = V),
                (w = p.child),
                p.tag === 22 && p.memoizedState !== null
                  ? Xc(u)
                  : w !== null
                    ? ((w.return = p), (V = w))
                    : Xc(u);
          for (; c !== null; ) (V = c), Gc(c), (c = c.sibling);
          (V = u), (ns = y), (He = j);
        }
        Yc(e);
      } else
        u.subtreeFlags & 8772 && c !== null ? ((c.return = u), (V = c)) : Yc(e);
    }
  }
  function Yc(e) {
    for (; V !== null; ) {
      var t = V;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                He || rs(5, t);
                break;
              case 1:
                var o = t.stateNode;
                if (t.flags & 4 && !He)
                  if (n === null) o.componentDidMount();
                  else {
                    var u =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : xt(t.type, n.memoizedProps);
                    o.componentDidUpdate(
                      u,
                      n.memoizedState,
                      o.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var c = t.updateQueue;
                c !== null && Ju(t, c, o);
                break;
              case 3:
                var p = t.updateQueue;
                if (p !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Ju(t, p, n);
                }
                break;
              case 5:
                var y = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = y;
                  var w = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      w.autoFocus && n.focus();
                      break;
                    case "img":
                      w.src && (n.src = w.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var j = t.alternate;
                  if (j !== null) {
                    var A = j.memoizedState;
                    if (A !== null) {
                      var D = A.dehydrated;
                      D !== null && Er(D);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          He || (t.flags & 512 && ha(t));
        } catch (O) {
          Ie(t, t.return, O);
        }
      }
      if (t === e) {
        V = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        (n.return = t.return), (V = n);
        break;
      }
      V = t.return;
    }
  }
  function Jc(e) {
    for (; V !== null; ) {
      var t = V;
      if (t === e) {
        V = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        (n.return = t.return), (V = n);
        break;
      }
      V = t.return;
    }
  }
  function Xc(e) {
    for (; V !== null; ) {
      var t = V;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              rs(4, t);
            } catch (w) {
              Ie(t, n, w);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var u = t.return;
              try {
                o.componentDidMount();
              } catch (w) {
                Ie(t, u, w);
              }
            }
            var c = t.return;
            try {
              ha(t);
            } catch (w) {
              Ie(t, c, w);
            }
            break;
          case 5:
            var p = t.return;
            try {
              ha(t);
            } catch (w) {
              Ie(t, p, w);
            }
        }
      } catch (w) {
        Ie(t, t.return, w);
      }
      if (t === e) {
        V = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        (y.return = t.return), (V = y);
        break;
      }
      V = t.return;
    }
  }
  var Jh = Math.ceil,
    is = W.ReactCurrentDispatcher,
    va = W.ReactCurrentOwner,
    pt = W.ReactCurrentBatchConfig,
    ue = 0,
    Ae = null,
    Le = null,
    $e = 0,
    at = 0,
    rr = Yt(0),
    _e = 0,
    qr = null,
    kn = 0,
    ss = 0,
    ya = 0,
    Kr = null,
    Xe = null,
    xa = 0,
    ir = 1 / 0,
    $t = null,
    os = !1,
    wa = null,
    nn = null,
    as = !1,
    rn = null,
    ls = 0,
    Qr = 0,
    Sa = null,
    us = -1,
    cs = 0;
  function Qe() {
    return ue & 6 ? je() : us !== -1 ? us : (us = je());
  }
  function sn(e) {
    return e.mode & 1
      ? ue & 2 && $e !== 0
        ? $e & -$e
        : Oh.transition !== null
          ? (cs === 0 && (cs = Wl()), cs)
          : ((e = he),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : eu(e.type))),
            e)
      : 1;
  }
  function kt(e, t, n, o) {
    if (50 < Qr) throw ((Qr = 0), (Sa = null), Error(s(185)));
    yr(e, n, o),
      (!(ue & 2) || e !== Ae) &&
        (e === Ae && (!(ue & 2) && (ss |= n), _e === 4 && on(e, $e)),
        Ze(e, o),
        n === 1 &&
          ue === 0 &&
          !(t.mode & 1) &&
          ((ir = je() + 500), zi && Xt()));
  }
  function Ze(e, t) {
    var n = e.callbackNode;
    Op(e, t);
    var o = xi(e, e === Ae ? $e : 0);
    if (o === 0)
      n !== null && Ul(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = o & -o), e.callbackPriority !== t)) {
      if ((n != null && Ul(n), t === 1))
        e.tag === 0 ? _h(ed.bind(null, e)) : $u(ed.bind(null, e)),
          Th(function () {
            !(ue & 6) && Xt();
          }),
          (n = null);
      else {
        switch (ql(o)) {
          case 1:
            n = Zs;
            break;
          case 4:
            n = Vl;
            break;
          case 16:
            n = mi;
            break;
          case 536870912:
            n = Hl;
            break;
          default:
            n = mi;
        }
        n = ld(n, Zc.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function Zc(e, t) {
    if (((us = -1), (cs = 0), ue & 6)) throw Error(s(327));
    var n = e.callbackNode;
    if (sr() && e.callbackNode !== n) return null;
    var o = xi(e, e === Ae ? $e : 0);
    if (o === 0) return null;
    if (o & 30 || o & e.expiredLanes || t) t = ds(e, o);
    else {
      t = o;
      var u = ue;
      ue |= 2;
      var c = nd();
      (Ae !== e || $e !== t) && (($t = null), (ir = je() + 500), Cn(e, t));
      do
        try {
          em();
          break;
        } catch (y) {
          td(e, y);
        }
      while (!0);
      $o(),
        (is.current = c),
        (ue = u),
        Le !== null ? (t = 0) : ((Ae = null), ($e = 0), (t = _e));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((u = eo(e)), u !== 0 && ((o = u), (t = ka(e, u)))),
        t === 1)
      )
        throw ((n = qr), Cn(e, 0), on(e, o), Ze(e, je()), n);
      if (t === 6) on(e, o);
      else {
        if (
          ((u = e.current.alternate),
          !(o & 30) &&
            !Xh(u) &&
            ((t = ds(e, o)),
            t === 2 && ((c = eo(e)), c !== 0 && ((o = c), (t = ka(e, c)))),
            t === 1))
        )
          throw ((n = qr), Cn(e, 0), on(e, o), Ze(e, je()), n);
        switch (((e.finishedWork = u), (e.finishedLanes = o), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Nn(e, Xe, $t);
            break;
          case 3:
            if (
              (on(e, o),
              (o & 130023424) === o && ((t = xa + 500 - je()), 10 < t))
            ) {
              if (xi(e, 0) !== 0) break;
              if (((u = e.suspendedLanes), (u & o) !== o)) {
                Qe(), (e.pingedLanes |= e.suspendedLanes & u);
                break;
              }
              e.timeoutHandle = jo(Nn.bind(null, e, Xe, $t), t);
              break;
            }
            Nn(e, Xe, $t);
            break;
          case 4:
            if ((on(e, o), (o & 4194240) === o)) break;
            for (t = e.eventTimes, u = -1; 0 < o; ) {
              var p = 31 - gt(o);
              (c = 1 << p), (p = t[p]), p > u && (u = p), (o &= ~c);
            }
            if (
              ((o = u),
              (o = je() - o),
              (o =
                (120 > o
                  ? 120
                  : 480 > o
                    ? 480
                    : 1080 > o
                      ? 1080
                      : 1920 > o
                        ? 1920
                        : 3e3 > o
                          ? 3e3
                          : 4320 > o
                            ? 4320
                            : 1960 * Jh(o / 1960)) - o),
              10 < o)
            ) {
              e.timeoutHandle = jo(Nn.bind(null, e, Xe, $t), o);
              break;
            }
            Nn(e, Xe, $t);
            break;
          case 5:
            Nn(e, Xe, $t);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Ze(e, je()), e.callbackNode === n ? Zc.bind(null, e) : null;
  }
  function ka(e, t) {
    var n = Kr;
    return (
      e.current.memoizedState.isDehydrated && (Cn(e, t).flags |= 256),
      (e = ds(e, t)),
      e !== 2 && ((t = Xe), (Xe = n), t !== null && Ea(t)),
      e
    );
  }
  function Ea(e) {
    Xe === null ? (Xe = e) : Xe.push.apply(Xe, e);
  }
  function Xh(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var o = 0; o < n.length; o++) {
            var u = n[o],
              c = u.getSnapshot;
            u = u.value;
            try {
              if (!vt(c(), u)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function on(e, t) {
    for (
      t &= ~ya,
        t &= ~ss,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - gt(t),
        o = 1 << n;
      (e[n] = -1), (t &= ~o);
    }
  }
  function ed(e) {
    if (ue & 6) throw Error(s(327));
    sr();
    var t = xi(e, 0);
    if (!(t & 1)) return Ze(e, je()), null;
    var n = ds(e, t);
    if (e.tag !== 0 && n === 2) {
      var o = eo(e);
      o !== 0 && ((t = o), (n = ka(e, o)));
    }
    if (n === 1) throw ((n = qr), Cn(e, 0), on(e, t), Ze(e, je()), n);
    if (n === 6) throw Error(s(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      Nn(e, Xe, $t),
      Ze(e, je()),
      null
    );
  }
  function Ca(e, t) {
    var n = ue;
    ue |= 1;
    try {
      return e(t);
    } finally {
      (ue = n), ue === 0 && ((ir = je() + 500), zi && Xt());
    }
  }
  function En(e) {
    rn !== null && rn.tag === 0 && !(ue & 6) && sr();
    var t = ue;
    ue |= 1;
    var n = pt.transition,
      o = he;
    try {
      if (((pt.transition = null), (he = 1), e)) return e();
    } finally {
      (he = o), (pt.transition = n), (ue = t), !(ue & 6) && Xt();
    }
  }
  function Na() {
    (at = rr.current), we(rr);
  }
  function Cn(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), jh(n)), Le !== null))
      for (n = Le.return; n !== null; ) {
        var o = n;
        switch ((Oo(o), o.tag)) {
          case 1:
            (o = o.type.childContextTypes), o != null && Di();
            break;
          case 3:
            er(), we(Ge), we(Be), Ko();
            break;
          case 5:
            Wo(o);
            break;
          case 4:
            er();
            break;
          case 13:
            we(Ce);
            break;
          case 19:
            we(Ce);
            break;
          case 10:
            Fo(o.type._context);
            break;
          case 22:
          case 23:
            Na();
        }
        n = n.return;
      }
    if (
      ((Ae = e),
      (Le = e = an(e.current, null)),
      ($e = at = t),
      (_e = 0),
      (qr = null),
      (ya = ss = kn = 0),
      (Xe = Kr = null),
      xn !== null)
    ) {
      for (t = 0; t < xn.length; t++)
        if (((n = xn[t]), (o = n.interleaved), o !== null)) {
          n.interleaved = null;
          var u = o.next,
            c = n.pending;
          if (c !== null) {
            var p = c.next;
            (c.next = u), (o.next = p);
          }
          n.pending = o;
        }
      xn = null;
    }
    return e;
  }
  function td(e, t) {
    do {
      var n = Le;
      try {
        if (($o(), (Qi.current = Xi), Gi)) {
          for (var o = Ne.memoizedState; o !== null; ) {
            var u = o.queue;
            u !== null && (u.pending = null), (o = o.next);
          }
          Gi = !1;
        }
        if (
          ((Sn = 0),
          (Oe = Re = Ne = null),
          (Fr = !1),
          (Br = 0),
          (va.current = null),
          n === null || n.return === null)
        ) {
          (_e = 1), (qr = t), (Le = null);
          break;
        }
        e: {
          var c = e,
            p = n.return,
            y = n,
            w = t;
          if (
            ((t = $e),
            (y.flags |= 32768),
            w !== null && typeof w == "object" && typeof w.then == "function")
          ) {
            var j = w,
              A = y,
              D = A.tag;
            if (!(A.mode & 1) && (D === 0 || D === 11 || D === 15)) {
              var O = A.alternate;
              O
                ? ((A.updateQueue = O.updateQueue),
                  (A.memoizedState = O.memoizedState),
                  (A.lanes = O.lanes))
                : ((A.updateQueue = null), (A.memoizedState = null));
            }
            var U = bc(p);
            if (U !== null) {
              (U.flags &= -257),
                Ic(U, p, y, c, t),
                U.mode & 1 && Nc(c, j, t),
                (t = U),
                (w = j);
              var H = t.updateQueue;
              if (H === null) {
                var q = new Set();
                q.add(w), (t.updateQueue = q);
              } else H.add(w);
              break e;
            } else {
              if (!(t & 1)) {
                Nc(c, j, t), ba();
                break e;
              }
              w = Error(s(426));
            }
          } else if (Ee && y.mode & 1) {
            var Te = bc(p);
            if (Te !== null) {
              !(Te.flags & 65536) && (Te.flags |= 256),
                Ic(Te, p, y, c, t),
                Mo(tr(w, y));
              break e;
            }
          }
          (c = w = tr(w, y)),
            _e !== 4 && (_e = 2),
            Kr === null ? (Kr = [c]) : Kr.push(c),
            (c = p);
          do {
            switch (c.tag) {
              case 3:
                (c.flags |= 65536), (t &= -t), (c.lanes |= t);
                var N = Ec(c, w, t);
                Yu(c, N);
                break e;
              case 1:
                y = w;
                var k = c.type,
                  b = c.stateNode;
                if (
                  !(c.flags & 128) &&
                  (typeof k.getDerivedStateFromError == "function" ||
                    (b !== null &&
                      typeof b.componentDidCatch == "function" &&
                      (nn === null || !nn.has(b))))
                ) {
                  (c.flags |= 65536), (t &= -t), (c.lanes |= t);
                  var z = Cc(c, y, t);
                  Yu(c, z);
                  break e;
                }
            }
            c = c.return;
          } while (c !== null);
        }
        id(n);
      } catch (K) {
        (t = K), Le === n && n !== null && (Le = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function nd() {
    var e = is.current;
    return (is.current = Xi), e === null ? Xi : e;
  }
  function ba() {
    (_e === 0 || _e === 3 || _e === 2) && (_e = 4),
      Ae === null || (!(kn & 268435455) && !(ss & 268435455)) || on(Ae, $e);
  }
  function ds(e, t) {
    var n = ue;
    ue |= 2;
    var o = nd();
    (Ae !== e || $e !== t) && (($t = null), Cn(e, t));
    do
      try {
        Zh();
        break;
      } catch (u) {
        td(e, u);
      }
    while (!0);
    if (($o(), (ue = n), (is.current = o), Le !== null)) throw Error(s(261));
    return (Ae = null), ($e = 0), _e;
  }
  function Zh() {
    for (; Le !== null; ) rd(Le);
  }
  function em() {
    for (; Le !== null && !Np(); ) rd(Le);
  }
  function rd(e) {
    var t = ad(e.alternate, e, at);
    (e.memoizedProps = e.pendingProps),
      t === null ? id(e) : (Le = t),
      (va.current = null);
  }
  function id(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = Kh(n, t)), n !== null)) {
          (n.flags &= 32767), (Le = n);
          return;
        }
        if (e !== null)
          (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (_e = 6), (Le = null);
          return;
        }
      } else if (((n = qh(n, t, at)), n !== null)) {
        Le = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Le = t;
        return;
      }
      Le = t = e;
    } while (t !== null);
    _e === 0 && (_e = 5);
  }
  function Nn(e, t, n) {
    var o = he,
      u = pt.transition;
    try {
      (pt.transition = null), (he = 1), tm(e, t, n, o);
    } finally {
      (pt.transition = u), (he = o);
    }
    return null;
  }
  function tm(e, t, n, o) {
    do sr();
    while (rn !== null);
    if (ue & 6) throw Error(s(327));
    n = e.finishedWork;
    var u = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(s(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var c = n.lanes | n.childLanes;
    if (
      (Ap(e, c),
      e === Ae && ((Le = Ae = null), ($e = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        as ||
        ((as = !0),
        ld(mi, function () {
          return sr(), null;
        })),
      (c = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || c)
    ) {
      (c = pt.transition), (pt.transition = null);
      var p = he;
      he = 1;
      var y = ue;
      (ue |= 4),
        (va.current = null),
        Gh(e, n),
        Qc(n, e),
        Sh(bo),
        (ki = !!No),
        (bo = No = null),
        (e.current = n),
        Yh(n),
        bp(),
        (ue = y),
        (he = p),
        (pt.transition = c);
    } else e.current = n;
    if (
      (as && ((as = !1), (rn = e), (ls = u)),
      (c = e.pendingLanes),
      c === 0 && (nn = null),
      Tp(n.stateNode),
      Ze(e, je()),
      t !== null)
    )
      for (o = e.onRecoverableError, n = 0; n < t.length; n++)
        (u = t[n]), o(u.value, { componentStack: u.stack, digest: u.digest });
    if (os) throw ((os = !1), (e = wa), (wa = null), e);
    return (
      ls & 1 && e.tag !== 0 && sr(),
      (c = e.pendingLanes),
      c & 1 ? (e === Sa ? Qr++ : ((Qr = 0), (Sa = e))) : (Qr = 0),
      Xt(),
      null
    );
  }
  function sr() {
    if (rn !== null) {
      var e = ql(ls),
        t = pt.transition,
        n = he;
      try {
        if (((pt.transition = null), (he = 16 > e ? 16 : e), rn === null))
          var o = !1;
        else {
          if (((e = rn), (rn = null), (ls = 0), ue & 6)) throw Error(s(331));
          var u = ue;
          for (ue |= 4, V = e.current; V !== null; ) {
            var c = V,
              p = c.child;
            if (V.flags & 16) {
              var y = c.deletions;
              if (y !== null) {
                for (var w = 0; w < y.length; w++) {
                  var j = y[w];
                  for (V = j; V !== null; ) {
                    var A = V;
                    switch (A.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Wr(8, A, c);
                    }
                    var D = A.child;
                    if (D !== null) (D.return = A), (V = D);
                    else
                      for (; V !== null; ) {
                        A = V;
                        var O = A.sibling,
                          U = A.return;
                        if ((Vc(A), A === j)) {
                          V = null;
                          break;
                        }
                        if (O !== null) {
                          (O.return = U), (V = O);
                          break;
                        }
                        V = U;
                      }
                  }
                }
                var H = c.alternate;
                if (H !== null) {
                  var q = H.child;
                  if (q !== null) {
                    H.child = null;
                    do {
                      var Te = q.sibling;
                      (q.sibling = null), (q = Te);
                    } while (q !== null);
                  }
                }
                V = c;
              }
            }
            if (c.subtreeFlags & 2064 && p !== null) (p.return = c), (V = p);
            else
              e: for (; V !== null; ) {
                if (((c = V), c.flags & 2048))
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Wr(9, c, c.return);
                  }
                var N = c.sibling;
                if (N !== null) {
                  (N.return = c.return), (V = N);
                  break e;
                }
                V = c.return;
              }
          }
          var k = e.current;
          for (V = k; V !== null; ) {
            p = V;
            var b = p.child;
            if (p.subtreeFlags & 2064 && b !== null) (b.return = p), (V = b);
            else
              e: for (p = k; V !== null; ) {
                if (((y = V), y.flags & 2048))
                  try {
                    switch (y.tag) {
                      case 0:
                      case 11:
                      case 15:
                        rs(9, y);
                    }
                  } catch (K) {
                    Ie(y, y.return, K);
                  }
                if (y === p) {
                  V = null;
                  break e;
                }
                var z = y.sibling;
                if (z !== null) {
                  (z.return = y.return), (V = z);
                  break e;
                }
                V = y.return;
              }
          }
          if (
            ((ue = u),
            Xt(),
            Et && typeof Et.onPostCommitFiberRoot == "function")
          )
            try {
              Et.onPostCommitFiberRoot(gi, e);
            } catch {}
          o = !0;
        }
        return o;
      } finally {
        (he = n), (pt.transition = t);
      }
    }
    return !1;
  }
  function sd(e, t, n) {
    (t = tr(n, t)),
      (t = Ec(e, t, 1)),
      (e = en(e, t, 1)),
      (t = Qe()),
      e !== null && (yr(e, 1, t), Ze(e, t));
  }
  function Ie(e, t, n) {
    if (e.tag === 3) sd(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          sd(t, e, n);
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof o.componentDidCatch == "function" &&
              (nn === null || !nn.has(o)))
          ) {
            (e = tr(n, e)),
              (e = Cc(t, e, 1)),
              (t = en(t, e, 1)),
              (e = Qe()),
              t !== null && (yr(t, 1, e), Ze(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function nm(e, t, n) {
    var o = e.pingCache;
    o !== null && o.delete(t),
      (t = Qe()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Ae === e &&
        ($e & n) === n &&
        (_e === 4 || (_e === 3 && ($e & 130023424) === $e && 500 > je() - xa)
          ? Cn(e, 0)
          : (ya |= n)),
      Ze(e, t);
  }
  function od(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = yi), (yi <<= 1), !(yi & 130023424) && (yi = 4194304))
        : (t = 1));
    var n = Qe();
    (e = Dt(e, t)), e !== null && (yr(e, t, n), Ze(e, n));
  }
  function rm(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), od(e, n);
  }
  function im(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode,
          u = e.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    o !== null && o.delete(t), od(e, n);
  }
  var ad;
  ad = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ge.current) Je = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (Je = !1), Wh(e, t, n);
        Je = !!(e.flags & 131072);
      }
    else (Je = !1), Ee && t.flags & 1048576 && Fu(t, Fi, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var o = t.type;
        ts(e, t), (e = t.pendingProps);
        var u = Kn(t, Be.current);
        Zn(t, n), (u = Yo(null, t, o, e, u, n));
        var c = Jo();
        return (
          (t.flags |= 1),
          typeof u == "object" &&
          u !== null &&
          typeof u.render == "function" &&
          u.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Ye(o) ? ((c = !0), Mi(t)) : (c = !1),
              (t.memoizedState =
                u.state !== null && u.state !== void 0 ? u.state : null),
              Vo(t),
              (u.updater = Zi),
              (t.stateNode = u),
              (u._reactInternals = t),
              ra(t, o, e, n),
              (t = aa(null, t, o, !0, c, n)))
            : ((t.tag = 0), Ee && c && _o(t), Ke(null, t, u, n), (t = t.child)),
          t
        );
      case 16:
        o = t.elementType;
        e: {
          switch (
            (ts(e, t),
            (e = t.pendingProps),
            (u = o._init),
            (o = u(o._payload)),
            (t.type = o),
            (u = t.tag = om(o)),
            (e = xt(o, e)),
            u)
          ) {
            case 0:
              t = oa(null, t, o, e, n);
              break e;
            case 1:
              t = _c(null, t, o, e, n);
              break e;
            case 11:
              t = jc(null, t, o, e, n);
              break e;
            case 14:
              t = Tc(null, t, o, xt(o.type, e), n);
              break e;
          }
          throw Error(s(306, o, ""));
        }
        return t;
      case 0:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : xt(o, u)),
          oa(e, t, o, u, n)
        );
      case 1:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : xt(o, u)),
          _c(e, t, o, u, n)
        );
      case 3:
        e: {
          if ((Oc(t), e === null)) throw Error(s(387));
          (o = t.pendingProps),
            (c = t.memoizedState),
            (u = c.element),
            Gu(e, t),
            qi(t, o, null, n);
          var p = t.memoizedState;
          if (((o = p.element), c.isDehydrated))
            if (
              ((c = {
                element: o,
                isDehydrated: !1,
                cache: p.cache,
                pendingSuspenseBoundaries: p.pendingSuspenseBoundaries,
                transitions: p.transitions,
              }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              (u = tr(Error(s(423)), t)), (t = Ac(e, t, o, n, u));
              break e;
            } else if (o !== u) {
              (u = tr(Error(s(424)), t)), (t = Ac(e, t, o, n, u));
              break e;
            } else
              for (
                ot = Gt(t.stateNode.containerInfo.firstChild),
                  st = t,
                  Ee = !0,
                  yt = null,
                  n = Ku(t, null, o, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((Yn(), o === u)) {
              t = zt(e, t, n);
              break e;
            }
            Ke(e, t, o, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Xu(t),
          e === null && Do(t),
          (o = t.type),
          (u = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (p = u.children),
          Io(o, u) ? (p = null) : c !== null && Io(o, c) && (t.flags |= 32),
          Rc(e, t),
          Ke(e, t, p, n),
          t.child
        );
      case 6:
        return e === null && Do(t), null;
      case 13:
        return Dc(e, t, n);
      case 4:
        return (
          Ho(t, t.stateNode.containerInfo),
          (o = t.pendingProps),
          e === null ? (t.child = Jn(t, null, o, n)) : Ke(e, t, o, n),
          t.child
        );
      case 11:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : xt(o, u)),
          jc(e, t, o, u, n)
        );
      case 7:
        return Ke(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ke(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ke(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((o = t.type._context),
            (u = t.pendingProps),
            (c = t.memoizedProps),
            (p = u.value),
            ve(Vi, o._currentValue),
            (o._currentValue = p),
            c !== null)
          )
            if (vt(c.value, p)) {
              if (c.children === u.children && !Ge.current) {
                t = zt(e, t, n);
                break e;
              }
            } else
              for (c = t.child, c !== null && (c.return = t); c !== null; ) {
                var y = c.dependencies;
                if (y !== null) {
                  p = c.child;
                  for (var w = y.firstContext; w !== null; ) {
                    if (w.context === o) {
                      if (c.tag === 1) {
                        (w = Mt(-1, n & -n)), (w.tag = 2);
                        var j = c.updateQueue;
                        if (j !== null) {
                          j = j.shared;
                          var A = j.pending;
                          A === null
                            ? (w.next = w)
                            : ((w.next = A.next), (A.next = w)),
                            (j.pending = w);
                        }
                      }
                      (c.lanes |= n),
                        (w = c.alternate),
                        w !== null && (w.lanes |= n),
                        Bo(c.return, n, t),
                        (y.lanes |= n);
                      break;
                    }
                    w = w.next;
                  }
                } else if (c.tag === 10) p = c.type === t.type ? null : c.child;
                else if (c.tag === 18) {
                  if (((p = c.return), p === null)) throw Error(s(341));
                  (p.lanes |= n),
                    (y = p.alternate),
                    y !== null && (y.lanes |= n),
                    Bo(p, n, t),
                    (p = c.sibling);
                } else p = c.child;
                if (p !== null) p.return = c;
                else
                  for (p = c; p !== null; ) {
                    if (p === t) {
                      p = null;
                      break;
                    }
                    if (((c = p.sibling), c !== null)) {
                      (c.return = p.return), (p = c);
                      break;
                    }
                    p = p.return;
                  }
                c = p;
              }
          Ke(e, t, u.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (u = t.type),
          (o = t.pendingProps.children),
          Zn(t, n),
          (u = dt(u)),
          (o = o(u)),
          (t.flags |= 1),
          Ke(e, t, o, n),
          t.child
        );
      case 14:
        return (
          (o = t.type),
          (u = xt(o, t.pendingProps)),
          (u = xt(o.type, u)),
          Tc(e, t, o, u, n)
        );
      case 15:
        return Lc(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (o = t.type),
          (u = t.pendingProps),
          (u = t.elementType === o ? u : xt(o, u)),
          ts(e, t),
          (t.tag = 1),
          Ye(o) ? ((e = !0), Mi(t)) : (e = !1),
          Zn(t, n),
          Sc(t, o, u),
          ra(t, o, u, n),
          aa(null, t, o, !0, e, n)
        );
      case 19:
        return zc(e, t, n);
      case 22:
        return Pc(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function ld(e, t) {
    return Bl(e, t);
  }
  function sm(e, t, n, o) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = o),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ht(e, t, n, o) {
    return new sm(e, t, n, o);
  }
  function Ia(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function om(e) {
    if (typeof e == "function") return Ia(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === mt)) return 11;
      if (e === Fe) return 14;
    }
    return 2;
  }
  function an(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ht(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function fs(e, t, n, o, u, c) {
    var p = 2;
    if (((o = e), typeof e == "function")) Ia(e) && (p = 1);
    else if (typeof e == "string") p = 5;
    else
      e: switch (e) {
        case Z:
          return bn(n.children, u, c, t);
        case ne:
          (p = 8), (u |= 8);
          break;
        case re:
          return (
            (e = ht(12, n, t, u | 2)), (e.elementType = re), (e.lanes = c), e
          );
        case qe:
          return (e = ht(13, n, t, u)), (e.elementType = qe), (e.lanes = c), e;
        case Me:
          return (e = ht(19, n, t, u)), (e.elementType = Me), (e.lanes = c), e;
        case ye:
          return ps(n, u, c, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ae:
                p = 10;
                break e;
              case me:
                p = 9;
                break e;
              case mt:
                p = 11;
                break e;
              case Fe:
                p = 14;
                break e;
              case Pe:
                (p = 16), (o = null);
                break e;
            }
          throw Error(s(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = ht(p, n, t, u)), (t.elementType = e), (t.type = o), (t.lanes = c), t
    );
  }
  function bn(e, t, n, o) {
    return (e = ht(7, e, o, t)), (e.lanes = n), e;
  }
  function ps(e, t, n, o) {
    return (
      (e = ht(22, e, o, t)),
      (e.elementType = ye),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function ja(e, t, n) {
    return (e = ht(6, e, null, t)), (e.lanes = n), e;
  }
  function Ta(e, t, n) {
    return (
      (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function am(e, t, n, o, u) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = to(0)),
      (this.expirationTimes = to(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = to(0)),
      (this.identifierPrefix = o),
      (this.onRecoverableError = u),
      (this.mutableSourceEagerHydrationData = null);
  }
  function La(e, t, n, o, u, c, p, y, w) {
    return (
      (e = new am(e, t, n, y, w)),
      t === 1 ? ((t = 1), c === !0 && (t |= 8)) : (t = 0),
      (c = ht(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (c.memoizedState = {
        element: o,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Vo(c),
      e
    );
  }
  function lm(e, t, n) {
    var o =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: le,
      key: o == null ? null : "" + o,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function ud(e) {
    if (!e) return Jt;
    e = e._reactInternals;
    e: {
      if (hn(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ye(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ye(n)) return Mu(e, n, t);
    }
    return t;
  }
  function cd(e, t, n, o, u, c, p, y, w) {
    return (
      (e = La(n, o, !0, e, u, c, p, y, w)),
      (e.context = ud(null)),
      (n = e.current),
      (o = Qe()),
      (u = sn(n)),
      (c = Mt(o, u)),
      (c.callback = t ?? null),
      en(n, c, u),
      (e.current.lanes = u),
      yr(e, u, o),
      Ze(e, o),
      e
    );
  }
  function hs(e, t, n, o) {
    var u = t.current,
      c = Qe(),
      p = sn(u);
    return (
      (n = ud(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Mt(c, p)),
      (t.payload = { element: e }),
      (o = o === void 0 ? null : o),
      o !== null && (t.callback = o),
      (e = en(u, t, p)),
      e !== null && (kt(e, u, p, c), Wi(e, u, p)),
      p
    );
  }
  function ms(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function dd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Pa(e, t) {
    dd(e, t), (e = e.alternate) && dd(e, t);
  }
  var fd =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Ra(e) {
    this._internalRoot = e;
  }
  (gs.prototype.render = Ra.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      hs(e, t, null, null);
    }),
    (gs.prototype.unmount = Ra.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          En(function () {
            hs(null, e, null, null);
          }),
            (t[Rt] = null);
        }
      });
  function gs(e) {
    this._internalRoot = e;
  }
  gs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Gl();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < qt.length && t !== 0 && t < qt[n].priority; n++);
      qt.splice(n, 0, e), n === 0 && Xl(e);
    }
  };
  function _a(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function vs(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function pd() {}
  function um(e, t, n, o, u) {
    if (u) {
      if (typeof o == "function") {
        var c = o;
        o = function () {
          var j = ms(p);
          c.call(j);
        };
      }
      var p = cd(t, o, e, 0, null, !1, !1, "", pd);
      return (
        (e._reactRootContainer = p),
        (e[Rt] = p.current),
        Rr(e.nodeType === 8 ? e.parentNode : e),
        En(),
        p
      );
    }
    for (; (u = e.lastChild); ) e.removeChild(u);
    if (typeof o == "function") {
      var y = o;
      o = function () {
        var j = ms(w);
        y.call(j);
      };
    }
    var w = La(e, 0, !1, null, null, !1, !1, "", pd);
    return (
      (e._reactRootContainer = w),
      (e[Rt] = w.current),
      Rr(e.nodeType === 8 ? e.parentNode : e),
      En(function () {
        hs(t, w, n, o);
      }),
      w
    );
  }
  function ys(e, t, n, o, u) {
    var c = n._reactRootContainer;
    if (c) {
      var p = c;
      if (typeof u == "function") {
        var y = u;
        u = function () {
          var w = ms(p);
          y.call(w);
        };
      }
      hs(t, p, e, u);
    } else p = um(n, t, e, u, o);
    return ms(p);
  }
  (Kl = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = vr(t.pendingLanes);
          n !== 0 &&
            (no(t, n | 1), Ze(t, je()), !(ue & 6) && ((ir = je() + 500), Xt()));
        }
        break;
      case 13:
        En(function () {
          var o = Dt(e, 1);
          if (o !== null) {
            var u = Qe();
            kt(o, e, 1, u);
          }
        }),
          Pa(e, 1);
    }
  }),
    (ro = function (e) {
      if (e.tag === 13) {
        var t = Dt(e, 134217728);
        if (t !== null) {
          var n = Qe();
          kt(t, e, 134217728, n);
        }
        Pa(e, 134217728);
      }
    }),
    (Ql = function (e) {
      if (e.tag === 13) {
        var t = sn(e),
          n = Dt(e, t);
        if (n !== null) {
          var o = Qe();
          kt(n, e, t, o);
        }
        Pa(e, t);
      }
    }),
    (Gl = function () {
      return he;
    }),
    (Yl = function (e, t) {
      var n = he;
      try {
        return (he = e), t();
      } finally {
        he = n;
      }
    }),
    (Gs = function (e, t, n) {
      switch (t) {
        case "input":
          if ((Bs(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var o = n[t];
              if (o !== e && o.form === e.form) {
                var u = Ai(o);
                if (!u) throw Error(s(90));
                wl(o), Bs(o, u);
              }
            }
          }
          break;
        case "textarea":
          Nl(e, n);
          break;
        case "select":
          (t = n.value), t != null && An(e, !!n.multiple, t, !1);
      }
    }),
    (Ol = Ca),
    (Al = En);
  var cm = { usingClientEntryPoint: !1, Events: [Ar, Wn, Ai, Rl, _l, Ca] },
    Gr = {
      findFiberByHostInstance: mn,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    dm = {
      bundleType: Gr.bundleType,
      version: Gr.version,
      rendererPackageName: Gr.rendererPackageName,
      rendererConfig: Gr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: W.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = $l(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: Gr.findFiberByHostInstance,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xs.isDisabled && xs.supportsFiber)
      try {
        (gi = xs.inject(dm)), (Et = xs);
      } catch {}
  }
  return (
    (et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cm),
    (et.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_a(t)) throw Error(s(200));
      return lm(e, t, null, n);
    }),
    (et.createRoot = function (e, t) {
      if (!_a(e)) throw Error(s(299));
      var n = !1,
        o = "",
        u = fd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (o = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = La(e, 1, !1, null, null, n, !1, o, u)),
        (e[Rt] = t.current),
        Rr(e.nodeType === 8 ? e.parentNode : e),
        new Ra(t)
      );
    }),
    (et.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(s(188))
          : ((e = Object.keys(e).join(",")), Error(s(268, e)));
      return (e = $l(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (et.flushSync = function (e) {
      return En(e);
    }),
    (et.hydrate = function (e, t, n) {
      if (!vs(t)) throw Error(s(200));
      return ys(null, e, t, !0, n);
    }),
    (et.hydrateRoot = function (e, t, n) {
      if (!_a(e)) throw Error(s(405));
      var o = (n != null && n.hydratedSources) || null,
        u = !1,
        c = "",
        p = fd;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (u = !0),
          n.identifierPrefix !== void 0 && (c = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (p = n.onRecoverableError)),
        (t = cd(t, null, e, 1, n ?? null, u, !1, c, p)),
        (e[Rt] = t.current),
        Rr(e),
        o)
      )
        for (e = 0; e < o.length; e++)
          (n = o[e]),
            (u = n._getVersion),
            (u = u(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, u])
              : t.mutableSourceEagerHydrationData.push(n, u);
      return new gs(t);
    }),
    (et.render = function (e, t, n) {
      if (!vs(t)) throw Error(s(200));
      return ys(null, e, t, !1, n);
    }),
    (et.unmountComponentAtNode = function (e) {
      if (!vs(e)) throw Error(s(40));
      return e._reactRootContainer
        ? (En(function () {
            ys(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Rt] = null);
            });
          }),
          !0)
        : !1;
    }),
    (et.unstable_batchedUpdates = Ca),
    (et.unstable_renderSubtreeIntoContainer = function (e, t, n, o) {
      if (!vs(n)) throw Error(s(200));
      if (e == null || e._reactInternals === void 0) throw Error(s(38));
      return ys(e, t, n, !1, o);
    }),
    (et.version = "18.3.1-next-f1338f8080-20240426"),
    et
  );
}
var Sd;
function xm() {
  if (Sd) return Da.exports;
  Sd = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (r) {
        console.error(r);
      }
  }
  return i(), (Da.exports = ym()), Da.exports;
}
var kd;
function wm() {
  if (kd) return ws;
  kd = 1;
  var i = xm();
  return (ws.createRoot = i.createRoot), (ws.hydrateRoot = i.hydrateRoot), ws;
}
var Sm = wm(),
  Jr = {},
  Ed;
function km() {
  if (Ed) return Jr;
  (Ed = 1),
    Object.defineProperty(Jr, "__esModule", { value: !0 }),
    (Jr.parse = f),
    (Jr.serialize = g);
  const i = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    r = /^[\u0021-\u003A\u003C-\u007E]*$/,
    s =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    a = /^[\u0020-\u003A\u003D-\u007E]*$/,
    l = Object.prototype.toString,
    d = (() => {
      const x = function () {};
      return (x.prototype = Object.create(null)), x;
    })();
  function f(x, T) {
    const I = new d(),
      L = x.length;
    if (L < 2) return I;
    const R = (T == null ? void 0 : T.decode) || S;
    let M = 0;
    do {
      const $ = x.indexOf("=", M);
      if ($ === -1) break;
      const G = x.indexOf(";", M),
        W = G === -1 ? L : G;
      if ($ > W) {
        M = x.lastIndexOf(";", $ - 1) + 1;
        continue;
      }
      const te = m(x, M, $),
        le = h(x, $, te),
        Z = x.slice(te, le);
      if (I[Z] === void 0) {
        let ne = m(x, $ + 1, W),
          re = h(x, W, ne);
        const ae = R(x.slice(ne, re));
        I[Z] = ae;
      }
      M = W + 1;
    } while (M < L);
    return I;
  }
  function m(x, T, I) {
    do {
      const L = x.charCodeAt(T);
      if (L !== 32 && L !== 9) return T;
    } while (++T < I);
    return I;
  }
  function h(x, T, I) {
    for (; T > I; ) {
      const L = x.charCodeAt(--T);
      if (L !== 32 && L !== 9) return T + 1;
    }
    return I;
  }
  function g(x, T, I) {
    const L = (I == null ? void 0 : I.encode) || encodeURIComponent;
    if (!i.test(x)) throw new TypeError(`argument name is invalid: ${x}`);
    const R = L(T);
    if (!r.test(R)) throw new TypeError(`argument val is invalid: ${T}`);
    let M = x + "=" + R;
    if (!I) return M;
    if (I.maxAge !== void 0) {
      if (!Number.isInteger(I.maxAge))
        throw new TypeError(`option maxAge is invalid: ${I.maxAge}`);
      M += "; Max-Age=" + I.maxAge;
    }
    if (I.domain) {
      if (!s.test(I.domain))
        throw new TypeError(`option domain is invalid: ${I.domain}`);
      M += "; Domain=" + I.domain;
    }
    if (I.path) {
      if (!a.test(I.path))
        throw new TypeError(`option path is invalid: ${I.path}`);
      M += "; Path=" + I.path;
    }
    if (I.expires) {
      if (!E(I.expires) || !Number.isFinite(I.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${I.expires}`);
      M += "; Expires=" + I.expires.toUTCString();
    }
    if (
      (I.httpOnly && (M += "; HttpOnly"),
      I.secure && (M += "; Secure"),
      I.partitioned && (M += "; Partitioned"),
      I.priority)
    )
      switch (
        typeof I.priority == "string" ? I.priority.toLowerCase() : void 0
      ) {
        case "low":
          M += "; Priority=Low";
          break;
        case "medium":
          M += "; Priority=Medium";
          break;
        case "high":
          M += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${I.priority}`);
      }
    if (I.sameSite)
      switch (
        typeof I.sameSite == "string" ? I.sameSite.toLowerCase() : I.sameSite
      ) {
        case !0:
        case "strict":
          M += "; SameSite=Strict";
          break;
        case "lax":
          M += "; SameSite=Lax";
          break;
        case "none":
          M += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${I.sameSite}`);
      }
    return M;
  }
  function S(x) {
    if (x.indexOf("%") === -1) return x;
    try {
      return decodeURIComponent(x);
    } catch {
      return x;
    }
  }
  function E(x) {
    return l.call(x) === "[object Date]";
  }
  return Jr;
}
km();
/**
 * react-router v7.1.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Cd = "popstate";
function Em(i = {}) {
  function r(a, l) {
    let { pathname: d, search: f, hash: m } = a.location;
    return Ga(
      "",
      { pathname: d, search: f, hash: m },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function s(a, l) {
    return typeof l == "string" ? l : ii(l);
  }
  return Nm(r, s, null, i);
}
function be(i, r) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(r);
}
function Tt(i, r) {
  if (!i) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function Cm() {
  return Math.random().toString(36).substring(2, 10);
}
function Nd(i, r) {
  return { usr: i.state, key: i.key, idx: r };
}
function Ga(i, r, s = null, a) {
  return {
    pathname: typeof i == "string" ? i : i.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? ur(r) : r),
    state: s,
    key: (r && r.key) || a || Cm(),
  };
}
function ii({ pathname: i = "/", search: r = "", hash: s = "" }) {
  return (
    r && r !== "?" && (i += r.charAt(0) === "?" ? r : "?" + r),
    s && s !== "#" && (i += s.charAt(0) === "#" ? s : "#" + s),
    i
  );
}
function ur(i) {
  let r = {};
  if (i) {
    let s = i.indexOf("#");
    s >= 0 && ((r.hash = i.substring(s)), (i = i.substring(0, s)));
    let a = i.indexOf("?");
    a >= 0 && ((r.search = i.substring(a)), (i = i.substring(0, a))),
      i && (r.pathname = i);
  }
  return r;
}
function Nm(i, r, s, a = {}) {
  let { window: l = document.defaultView, v5Compat: d = !1 } = a,
    f = l.history,
    m = "POP",
    h = null,
    g = S();
  g == null && ((g = 0), f.replaceState({ ...f.state, idx: g }, ""));
  function S() {
    return (f.state || { idx: null }).idx;
  }
  function E() {
    m = "POP";
    let R = S(),
      M = R == null ? null : R - g;
    (g = R), h && h({ action: m, location: L.location, delta: M });
  }
  function x(R, M) {
    m = "PUSH";
    let $ = Ga(L.location, R, M);
    g = S() + 1;
    let G = Nd($, g),
      W = L.createHref($);
    try {
      f.pushState(G, "", W);
    } catch (te) {
      if (te instanceof DOMException && te.name === "DataCloneError") throw te;
      l.location.assign(W);
    }
    d && h && h({ action: m, location: L.location, delta: 1 });
  }
  function T(R, M) {
    m = "REPLACE";
    let $ = Ga(L.location, R, M);
    g = S();
    let G = Nd($, g),
      W = L.createHref($);
    f.replaceState(G, "", W),
      d && h && h({ action: m, location: L.location, delta: 0 });
  }
  function I(R) {
    let M = l.location.origin !== "null" ? l.location.origin : l.location.href,
      $ = typeof R == "string" ? R : ii(R);
    return (
      ($ = $.replace(/ $/, "%20")),
      be(
        M,
        `No window.location.(origin|href) available to create URL for href: ${$}`,
      ),
      new URL($, M)
    );
  }
  let L = {
    get action() {
      return m;
    },
    get location() {
      return i(l, f);
    },
    listen(R) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Cd, E),
        (h = R),
        () => {
          l.removeEventListener(Cd, E), (h = null);
        }
      );
    },
    createHref(R) {
      return r(l, R);
    },
    createURL: I,
    encodeLocation(R) {
      let M = I(R);
      return { pathname: M.pathname, search: M.search, hash: M.hash };
    },
    push: x,
    replace: T,
    go(R) {
      return f.go(R);
    },
  };
  return L;
}
function pf(i, r, s = "/") {
  return bm(i, r, s, !1);
}
function bm(i, r, s, a) {
  let l = typeof r == "string" ? ur(r) : r,
    d = fn(l.pathname || "/", s);
  if (d == null) return null;
  let f = hf(i);
  Im(f);
  let m = null;
  for (let h = 0; m == null && h < f.length; ++h) {
    let g = zm(d);
    m = Dm(f[h], g, a);
  }
  return m;
}
function hf(i, r = [], s = [], a = "") {
  let l = (d, f, m) => {
    let h = {
      relativePath: m === void 0 ? d.path || "" : m,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: f,
      route: d,
    };
    h.relativePath.startsWith("/") &&
      (be(
        h.relativePath.startsWith(a),
        `Absolute route path "${h.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (h.relativePath = h.relativePath.slice(a.length)));
    let g = Ft([a, h.relativePath]),
      S = s.concat(h);
    d.children &&
      d.children.length > 0 &&
      (be(
        d.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${g}".`,
      ),
      hf(d.children, r, S, g)),
      !(d.path == null && !d.index) &&
        r.push({ path: g, score: Om(g, d.index), routesMeta: S });
  };
  return (
    i.forEach((d, f) => {
      var m;
      if (d.path === "" || !((m = d.path) != null && m.includes("?"))) l(d, f);
      else for (let h of mf(d.path)) l(d, f, h);
    }),
    r
  );
}
function mf(i) {
  let r = i.split("/");
  if (r.length === 0) return [];
  let [s, ...a] = r,
    l = s.endsWith("?"),
    d = s.replace(/\?$/, "");
  if (a.length === 0) return l ? [d, ""] : [d];
  let f = mf(a.join("/")),
    m = [];
  return (
    m.push(...f.map((h) => (h === "" ? d : [d, h].join("/")))),
    l && m.push(...f),
    m.map((h) => (i.startsWith("/") && h === "" ? "/" : h))
  );
}
function Im(i) {
  i.sort((r, s) =>
    r.score !== s.score
      ? s.score - r.score
      : Am(
          r.routesMeta.map((a) => a.childrenIndex),
          s.routesMeta.map((a) => a.childrenIndex),
        ),
  );
}
var jm = /^:[\w-]+$/,
  Tm = 3,
  Lm = 2,
  Pm = 1,
  Rm = 10,
  _m = -2,
  bd = (i) => i === "*";
function Om(i, r) {
  let s = i.split("/"),
    a = s.length;
  return (
    s.some(bd) && (a += _m),
    r && (a += Lm),
    s
      .filter((l) => !bd(l))
      .reduce((l, d) => l + (jm.test(d) ? Tm : d === "" ? Pm : Rm), a)
  );
}
function Am(i, r) {
  return i.length === r.length && i.slice(0, -1).every((a, l) => a === r[l])
    ? i[i.length - 1] - r[r.length - 1]
    : 0;
}
function Dm(i, r, s = !1) {
  let { routesMeta: a } = i,
    l = {},
    d = "/",
    f = [];
  for (let m = 0; m < a.length; ++m) {
    let h = a[m],
      g = m === a.length - 1,
      S = d === "/" ? r : r.slice(d.length) || "/",
      E = Ns(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: g },
        S,
      ),
      x = h.route;
    if (
      (!E &&
        g &&
        s &&
        !a[a.length - 1].route.index &&
        (E = Ns(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          S,
        )),
      !E)
    )
      return null;
    Object.assign(l, E.params),
      f.push({
        params: l,
        pathname: Ft([d, E.pathname]),
        pathnameBase: Um(Ft([d, E.pathnameBase])),
        route: x,
      }),
      E.pathnameBase !== "/" && (d = Ft([d, E.pathnameBase]));
  }
  return f;
}
function Ns(i, r) {
  typeof i == "string" && (i = { path: i, caseSensitive: !1, end: !0 });
  let [s, a] = Mm(i.path, i.caseSensitive, i.end),
    l = r.match(s);
  if (!l) return null;
  let d = l[0],
    f = d.replace(/(.)\/+$/, "$1"),
    m = l.slice(1);
  return {
    params: a.reduce((g, { paramName: S, isOptional: E }, x) => {
      if (S === "*") {
        let I = m[x] || "";
        f = d.slice(0, d.length - I.length).replace(/(.)\/+$/, "$1");
      }
      const T = m[x];
      return (
        E && !T ? (g[S] = void 0) : (g[S] = (T || "").replace(/%2F/g, "/")), g
      );
    }, {}),
    pathname: d,
    pathnameBase: f,
    pattern: i,
  };
}
function Mm(i, r = !1, s = !0) {
  Tt(
    i === "*" || !i.endsWith("*") || i.endsWith("/*"),
    `Route path "${i}" will be treated as if it were "${i.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/, "/*")}".`,
  );
  let a = [],
    l =
      "^" +
      i
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, m, h) => (
            a.push({ paramName: m, isOptional: h != null }),
            h ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    i.endsWith("*")
      ? (a.push({ paramName: "*" }),
        (l += i === "*" || i === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (l += "\\/*$")
        : i !== "" && i !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, r ? void 0 : "i"), a]
  );
}
function zm(i) {
  try {
    return i
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Tt(
        !1,
        `The URL path "${i}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`,
      ),
      i
    );
  }
}
function fn(i, r) {
  if (r === "/") return i;
  if (!i.toLowerCase().startsWith(r.toLowerCase())) return null;
  let s = r.endsWith("/") ? r.length - 1 : r.length,
    a = i.charAt(s);
  return a && a !== "/" ? null : i.slice(s) || "/";
}
function $m(i, r = "/") {
  let {
    pathname: s,
    search: a = "",
    hash: l = "",
  } = typeof i == "string" ? ur(i) : i;
  return {
    pathname: s ? (s.startsWith("/") ? s : Fm(s, r)) : r,
    search: Vm(a),
    hash: Hm(l),
  };
}
function Fm(i, r) {
  let s = r.replace(/\/+$/, "").split("/");
  return (
    i.split("/").forEach((l) => {
      l === ".." ? s.length > 1 && s.pop() : l !== "." && s.push(l);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function $a(i, r, s, a) {
  return `Cannot include a '${i}' character in a manually specified \`to.${r}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Bm(i) {
  return i.filter(
    (r, s) => s === 0 || (r.route.path && r.route.path.length > 0),
  );
}
function gf(i) {
  let r = Bm(i);
  return r.map((s, a) => (a === r.length - 1 ? s.pathname : s.pathnameBase));
}
function vf(i, r, s, a = !1) {
  let l;
  typeof i == "string"
    ? (l = ur(i))
    : ((l = { ...i }),
      be(
        !l.pathname || !l.pathname.includes("?"),
        $a("?", "pathname", "search", l),
      ),
      be(
        !l.pathname || !l.pathname.includes("#"),
        $a("#", "pathname", "hash", l),
      ),
      be(!l.search || !l.search.includes("#"), $a("#", "search", "hash", l)));
  let d = i === "" || l.pathname === "",
    f = d ? "/" : l.pathname,
    m;
  if (f == null) m = s;
  else {
    let E = r.length - 1;
    if (!a && f.startsWith("..")) {
      let x = f.split("/");
      for (; x[0] === ".."; ) x.shift(), (E -= 1);
      l.pathname = x.join("/");
    }
    m = E >= 0 ? r[E] : "/";
  }
  let h = $m(l, m),
    g = f && f !== "/" && f.endsWith("/"),
    S = (d || f === ".") && s.endsWith("/");
  return !h.pathname.endsWith("/") && (g || S) && (h.pathname += "/"), h;
}
var Ft = (i) => i.join("/").replace(/\/\/+/g, "/"),
  Um = (i) => i.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Vm = (i) => (!i || i === "?" ? "" : i.startsWith("?") ? i : "?" + i),
  Hm = (i) => (!i || i === "#" ? "" : i.startsWith("#") ? i : "#" + i);
function Wm(i) {
  return (
    i != null &&
    typeof i.status == "number" &&
    typeof i.statusText == "string" &&
    typeof i.internal == "boolean" &&
    "data" in i
  );
}
var yf = ["POST", "PUT", "PATCH", "DELETE"];
new Set(yf);
var qm = ["GET", ...yf];
new Set(qm);
var cr = P.createContext(null);
cr.displayName = "DataRouter";
var _s = P.createContext(null);
_s.displayName = "DataRouterState";
var xf = P.createContext({ isTransitioning: !1 });
xf.displayName = "ViewTransition";
var Km = P.createContext(new Map());
Km.displayName = "Fetchers";
var Qm = P.createContext(null);
Qm.displayName = "Await";
var Lt = P.createContext(null);
Lt.displayName = "Navigation";
var ai = P.createContext(null);
ai.displayName = "Location";
var Ut = P.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ut.displayName = "Route";
var ul = P.createContext(null);
ul.displayName = "RouteError";
function Gm(i, { relative: r } = {}) {
  be(
    li(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: s, navigator: a } = P.useContext(Lt),
    { hash: l, pathname: d, search: f } = ui(i, { relative: r }),
    m = d;
  return (
    s !== "/" && (m = d === "/" ? s : Ft([s, d])),
    a.createHref({ pathname: m, search: f, hash: l })
  );
}
function li() {
  return P.useContext(ai) != null;
}
function _n() {
  return (
    be(
      li(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    P.useContext(ai).location
  );
}
var wf =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Sf(i) {
  P.useContext(Lt).static || P.useLayoutEffect(i);
}
function Ym() {
  let { isDataRoute: i } = P.useContext(Ut);
  return i ? ug() : Jm();
}
function Jm() {
  be(
    li(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let i = P.useContext(cr),
    { basename: r, navigator: s } = P.useContext(Lt),
    { matches: a } = P.useContext(Ut),
    { pathname: l } = _n(),
    d = JSON.stringify(gf(a)),
    f = P.useRef(!1);
  return (
    Sf(() => {
      f.current = !0;
    }),
    P.useCallback(
      (h, g = {}) => {
        if ((Tt(f.current, wf), !f.current)) return;
        if (typeof h == "number") {
          s.go(h);
          return;
        }
        let S = vf(h, JSON.parse(d), l, g.relative === "path");
        i == null &&
          r !== "/" &&
          (S.pathname = S.pathname === "/" ? r : Ft([r, S.pathname])),
          (g.replace ? s.replace : s.push)(S, g.state, g);
      },
      [r, s, d, l, i],
    )
  );
}
P.createContext(null);
function ui(i, { relative: r } = {}) {
  let { matches: s } = P.useContext(Ut),
    { pathname: a } = _n(),
    l = JSON.stringify(gf(s));
  return P.useMemo(() => vf(i, JSON.parse(l), a, r === "path"), [i, l, a, r]);
}
function Xm(i, r) {
  return kf(i, r);
}
function kf(i, r, s, a) {
  var M;
  be(
    li(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: l } = P.useContext(Lt),
    { matches: d } = P.useContext(Ut),
    f = d[d.length - 1],
    m = f ? f.params : {},
    h = f ? f.pathname : "/",
    g = f ? f.pathnameBase : "/",
    S = f && f.route;
  {
    let $ = (S && S.path) || "";
    Ef(
      h,
      !S || $.endsWith("*") || $.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${$}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${$}"> to <Route path="${$ === "/" ? "*" : `${$}/*`}">.`,
    );
  }
  let E = _n(),
    x;
  if (r) {
    let $ = typeof r == "string" ? ur(r) : r;
    be(
      g === "/" || ((M = $.pathname) == null ? void 0 : M.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${$.pathname}" was given in the \`location\` prop.`,
    ),
      (x = $);
  } else x = E;
  let T = x.pathname || "/",
    I = T;
  if (g !== "/") {
    let $ = g.replace(/^\//, "").split("/");
    I = "/" + T.replace(/^\//, "").split("/").slice($.length).join("/");
  }
  let L = pf(i, { pathname: I });
  Tt(
    S || L != null,
    `No routes matched location "${x.pathname}${x.search}${x.hash}" `,
  ),
    Tt(
      L == null ||
        L[L.length - 1].route.element !== void 0 ||
        L[L.length - 1].route.Component !== void 0 ||
        L[L.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let R = rg(
    L &&
      L.map(($) =>
        Object.assign({}, $, {
          params: Object.assign({}, m, $.params),
          pathname: Ft([
            g,
            l.encodeLocation
              ? l.encodeLocation($.pathname).pathname
              : $.pathname,
          ]),
          pathnameBase:
            $.pathnameBase === "/"
              ? g
              : Ft([
                  g,
                  l.encodeLocation
                    ? l.encodeLocation($.pathnameBase).pathname
                    : $.pathnameBase,
                ]),
        }),
      ),
    d,
    s,
    a,
  );
  return r && R
    ? P.createElement(
        ai.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...x,
            },
            navigationType: "POP",
          },
        },
        R,
      )
    : R;
}
function Zm() {
  let i = lg(),
    r = Wm(i)
      ? `${i.status} ${i.statusText}`
      : i instanceof Error
        ? i.message
        : JSON.stringify(i),
    s = i instanceof Error ? i.stack : null,
    a = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: a },
    d = { padding: "2px 4px", backgroundColor: a },
    f = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", i),
    (f = P.createElement(
      P.Fragment,
      null,
      P.createElement("p", null, "💿 Hey developer 👋"),
      P.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        P.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        P.createElement("code", { style: d }, "errorElement"),
        " prop on your route.",
      ),
    )),
    P.createElement(
      P.Fragment,
      null,
      P.createElement("h2", null, "Unexpected Application Error!"),
      P.createElement("h3", { style: { fontStyle: "italic" } }, r),
      s ? P.createElement("pre", { style: l }, s) : null,
      f,
    )
  );
}
var eg = P.createElement(Zm, null),
  tg = class extends P.Component {
    constructor(i) {
      super(i),
        (this.state = {
          location: i.location,
          revalidation: i.revalidation,
          error: i.error,
        });
    }
    static getDerivedStateFromError(i) {
      return { error: i };
    }
    static getDerivedStateFromProps(i, r) {
      return r.location !== i.location ||
        (r.revalidation !== "idle" && i.revalidation === "idle")
        ? { error: i.error, location: i.location, revalidation: i.revalidation }
        : {
            error: i.error !== void 0 ? i.error : r.error,
            location: r.location,
            revalidation: i.revalidation || r.revalidation,
          };
    }
    componentDidCatch(i, r) {
      console.error(
        "React Router caught the following error during render",
        i,
        r,
      );
    }
    render() {
      return this.state.error !== void 0
        ? P.createElement(
            Ut.Provider,
            { value: this.props.routeContext },
            P.createElement(ul.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function ng({ routeContext: i, match: r, children: s }) {
  let a = P.useContext(cr);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = r.route.id),
    P.createElement(Ut.Provider, { value: i }, s)
  );
}
function rg(i, r = [], s = null, a = null) {
  if (i == null) {
    if (!s) return null;
    if (s.errors) i = s.matches;
    else if (r.length === 0 && !s.initialized && s.matches.length > 0)
      i = s.matches;
    else return null;
  }
  let l = i,
    d = s == null ? void 0 : s.errors;
  if (d != null) {
    let h = l.findIndex(
      (g) => g.route.id && (d == null ? void 0 : d[g.route.id]) !== void 0,
    );
    be(
      h >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`,
    ),
      (l = l.slice(0, Math.min(l.length, h + 1)));
  }
  let f = !1,
    m = -1;
  if (s)
    for (let h = 0; h < l.length; h++) {
      let g = l[h];
      if (
        ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = h),
        g.route.id)
      ) {
        let { loaderData: S, errors: E } = s,
          x =
            g.route.loader &&
            !S.hasOwnProperty(g.route.id) &&
            (!E || E[g.route.id] === void 0);
        if (g.route.lazy || x) {
          (f = !0), m >= 0 ? (l = l.slice(0, m + 1)) : (l = [l[0]]);
          break;
        }
      }
    }
  return l.reduceRight((h, g, S) => {
    let E,
      x = !1,
      T = null,
      I = null;
    s &&
      ((E = d && g.route.id ? d[g.route.id] : void 0),
      (T = g.route.errorElement || eg),
      f &&
        (m < 0 && S === 0
          ? (Ef(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (x = !0),
            (I = null))
          : m === S &&
            ((x = !0), (I = g.route.hydrateFallbackElement || null))));
    let L = r.concat(l.slice(0, S + 1)),
      R = () => {
        let M;
        return (
          E
            ? (M = T)
            : x
              ? (M = I)
              : g.route.Component
                ? (M = P.createElement(g.route.Component, null))
                : g.route.element
                  ? (M = g.route.element)
                  : (M = h),
          P.createElement(ng, {
            match: g,
            routeContext: { outlet: h, matches: L, isDataRoute: s != null },
            children: M,
          })
        );
      };
    return s && (g.route.ErrorBoundary || g.route.errorElement || S === 0)
      ? P.createElement(tg, {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: E,
          children: R(),
          routeContext: { outlet: null, matches: L, isDataRoute: !0 },
        })
      : R();
  }, null);
}
function cl(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ig(i) {
  let r = P.useContext(cr);
  return be(r, cl(i)), r;
}
function sg(i) {
  let r = P.useContext(_s);
  return be(r, cl(i)), r;
}
function og(i) {
  let r = P.useContext(Ut);
  return be(r, cl(i)), r;
}
function dl(i) {
  let r = og(i),
    s = r.matches[r.matches.length - 1];
  return (
    be(
      s.route.id,
      `${i} can only be used on routes that contain a unique "id"`,
    ),
    s.route.id
  );
}
function ag() {
  return dl("useRouteId");
}
function lg() {
  var a;
  let i = P.useContext(ul),
    r = sg("useRouteError"),
    s = dl("useRouteError");
  return i !== void 0 ? i : (a = r.errors) == null ? void 0 : a[s];
}
function ug() {
  let { router: i } = ig("useNavigate"),
    r = dl("useNavigate"),
    s = P.useRef(!1);
  return (
    Sf(() => {
      s.current = !0;
    }),
    P.useCallback(
      async (l, d = {}) => {
        Tt(s.current, wf),
          s.current &&
            (typeof l == "number"
              ? i.navigate(l)
              : await i.navigate(l, { fromRouteId: r, ...d }));
      },
      [i, r],
    )
  );
}
var Id = {};
function Ef(i, r, s) {
  !r && !Id[i] && ((Id[i] = !0), Tt(!1, s));
}
P.memo(cg);
function cg({ routes: i, future: r, state: s }) {
  return kf(i, void 0, s, r);
}
function lr(i) {
  be(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function dg({
  basename: i = "/",
  children: r = null,
  location: s,
  navigationType: a = "POP",
  navigator: l,
  static: d = !1,
}) {
  be(
    !li(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let f = i.replace(/^\/*/, "/"),
    m = P.useMemo(
      () => ({ basename: f, navigator: l, static: d, future: {} }),
      [f, l, d],
    );
  typeof s == "string" && (s = ur(s));
  let {
      pathname: h = "/",
      search: g = "",
      hash: S = "",
      state: E = null,
      key: x = "default",
    } = s,
    T = P.useMemo(() => {
      let I = fn(h, f);
      return I == null
        ? null
        : {
            location: { pathname: I, search: g, hash: S, state: E, key: x },
            navigationType: a,
          };
    }, [f, h, g, S, E, x, a]);
  return (
    Tt(
      T != null,
      `<Router basename="${f}"> is not able to match the URL "${h}${g}${S}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    T == null
      ? null
      : P.createElement(
          Lt.Provider,
          { value: m },
          P.createElement(ai.Provider, { children: r, value: T }),
        )
  );
}
function fg({ children: i, location: r }) {
  return Xm(Ya(i), r);
}
function Ya(i, r = []) {
  let s = [];
  return (
    P.Children.forEach(i, (a, l) => {
      if (!P.isValidElement(a)) return;
      let d = [...r, l];
      if (a.type === P.Fragment) {
        s.push.apply(s, Ya(a.props.children, d));
        return;
      }
      be(
        a.type === lr,
        `[${typeof a.type == "string" ? a.type : a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        be(
          !a.props.index || !a.props.children,
          "An index route cannot have child routes.",
        );
      let f = {
        id: a.props.id || d.join("-"),
        caseSensitive: a.props.caseSensitive,
        element: a.props.element,
        Component: a.props.Component,
        index: a.props.index,
        path: a.props.path,
        loader: a.props.loader,
        action: a.props.action,
        hydrateFallbackElement: a.props.hydrateFallbackElement,
        HydrateFallback: a.props.HydrateFallback,
        errorElement: a.props.errorElement,
        ErrorBoundary: a.props.ErrorBoundary,
        hasErrorBoundary:
          a.props.hasErrorBoundary === !0 ||
          a.props.ErrorBoundary != null ||
          a.props.errorElement != null,
        shouldRevalidate: a.props.shouldRevalidate,
        handle: a.props.handle,
        lazy: a.props.lazy,
      };
      a.props.children && (f.children = Ya(a.props.children, d)), s.push(f);
    }),
    s
  );
}
var Es = "get",
  Cs = "application/x-www-form-urlencoded";
function Os(i) {
  return i != null && typeof i.tagName == "string";
}
function pg(i) {
  return Os(i) && i.tagName.toLowerCase() === "button";
}
function hg(i) {
  return Os(i) && i.tagName.toLowerCase() === "form";
}
function mg(i) {
  return Os(i) && i.tagName.toLowerCase() === "input";
}
function gg(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey);
}
function vg(i, r) {
  return i.button === 0 && (!r || r === "_self") && !gg(i);
}
var Ss = null;
function yg() {
  if (Ss === null)
    try {
      new FormData(document.createElement("form"), 0), (Ss = !1);
    } catch {
      Ss = !0;
    }
  return Ss;
}
var xg = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Fa(i) {
  return i != null && !xg.has(i)
    ? (Tt(
        !1,
        `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Cs}"`,
      ),
      null)
    : i;
}
function wg(i, r) {
  let s, a, l, d, f;
  if (hg(i)) {
    let m = i.getAttribute("action");
    (a = m ? fn(m, r) : null),
      (s = i.getAttribute("method") || Es),
      (l = Fa(i.getAttribute("enctype")) || Cs),
      (d = new FormData(i));
  } else if (pg(i) || (mg(i) && (i.type === "submit" || i.type === "image"))) {
    let m = i.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let h = i.getAttribute("formaction") || m.getAttribute("action");
    if (
      ((a = h ? fn(h, r) : null),
      (s = i.getAttribute("formmethod") || m.getAttribute("method") || Es),
      (l =
        Fa(i.getAttribute("formenctype")) ||
        Fa(m.getAttribute("enctype")) ||
        Cs),
      (d = new FormData(m, i)),
      !yg())
    ) {
      let { name: g, type: S, value: E } = i;
      if (S === "image") {
        let x = g ? `${g}.` : "";
        d.append(`${x}x`, "0"), d.append(`${x}y`, "0");
      } else g && d.append(g, E);
    }
  } else {
    if (Os(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (s = Es), (a = null), (l = Cs), (f = i);
  }
  return (
    d && l === "text/plain" && ((f = d), (d = void 0)),
    { action: a, method: s.toLowerCase(), encType: l, formData: d, body: f }
  );
}
function fl(i, r) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(r);
}
async function Sg(i, r) {
  if (i.id in r) return r[i.id];
  try {
    let s = await import(i.module);
    return (r[i.id] = s), s;
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${i.module}\`, reloading page...`,
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function kg(i) {
  return i == null
    ? !1
    : i.href == null
      ? i.rel === "preload" &&
        typeof i.imageSrcSet == "string" &&
        typeof i.imageSizes == "string"
      : typeof i.rel == "string" && typeof i.href == "string";
}
async function Eg(i, r, s) {
  let a = await Promise.all(
    i.map(async (l) => {
      let d = r.routes[l.route.id];
      if (d) {
        let f = await Sg(d, s);
        return f.links ? f.links() : [];
      }
      return [];
    }),
  );
  return Ig(
    a
      .flat(1)
      .filter(kg)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" },
      ),
  );
}
function jd(i, r, s, a, l, d) {
  let f = (h, g) => (s[g] ? h.route.id !== s[g].route.id : !0),
    m = (h, g) => {
      var S;
      return (
        s[g].pathname !== h.pathname ||
        (((S = s[g].route.path) == null ? void 0 : S.endsWith("*")) &&
          s[g].params["*"] !== h.params["*"])
      );
    };
  return d === "assets"
    ? r.filter((h, g) => f(h, g) || m(h, g))
    : d === "data"
      ? r.filter((h, g) => {
          var E;
          let S = a.routes[h.route.id];
          if (!S || !S.hasLoader) return !1;
          if (f(h, g) || m(h, g)) return !0;
          if (h.route.shouldRevalidate) {
            let x = h.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin,
              ),
              currentParams: ((E = s[0]) == null ? void 0 : E.params) || {},
              nextUrl: new URL(i, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x == "boolean") return x;
          }
          return !0;
        })
      : [];
}
function Cg(i, r) {
  return Ng(
    i
      .map((s) => {
        let a = r.routes[s.route.id];
        if (!a) return [];
        let l = [a.module];
        return a.imports && (l = l.concat(a.imports)), l;
      })
      .flat(1),
  );
}
function Ng(i) {
  return [...new Set(i)];
}
function bg(i) {
  let r = {},
    s = Object.keys(i).sort();
  for (let a of s) r[a] = i[a];
  return r;
}
function Ig(i, r) {
  let s = new Set();
  return (
    new Set(r),
    i.reduce((a, l) => {
      let d = JSON.stringify(bg(l));
      return s.has(d) || (s.add(d), a.push({ key: d, link: l })), a;
    }, [])
  );
}
function jg(i) {
  let r =
    typeof i == "string"
      ? new URL(
          i,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : i;
  return (
    r.pathname === "/"
      ? (r.pathname = "_root.data")
      : (r.pathname = `${r.pathname.replace(/\/$/, "")}.data`),
    r
  );
}
function Tg() {
  let i = P.useContext(cr);
  return (
    fl(
      i,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    i
  );
}
function Lg() {
  let i = P.useContext(_s);
  return (
    fl(
      i,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    i
  );
}
var pl = P.createContext(void 0);
pl.displayName = "FrameworkContext";
function Cf() {
  let i = P.useContext(pl);
  return (
    fl(i, "You must render this element inside a <HydratedRouter> element"), i
  );
}
function Pg(i, r) {
  let s = P.useContext(pl),
    [a, l] = P.useState(!1),
    [d, f] = P.useState(!1),
    {
      onFocus: m,
      onBlur: h,
      onMouseEnter: g,
      onMouseLeave: S,
      onTouchStart: E,
    } = r,
    x = P.useRef(null);
  P.useEffect(() => {
    if ((i === "render" && f(!0), i === "viewport")) {
      let L = (M) => {
          M.forEach(($) => {
            f($.isIntersecting);
          });
        },
        R = new IntersectionObserver(L, { threshold: 0.5 });
      return (
        x.current && R.observe(x.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [i]),
    P.useEffect(() => {
      if (a) {
        let L = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(L);
        };
      }
    }, [a]);
  let T = () => {
      l(!0);
    },
    I = () => {
      l(!1), f(!1);
    };
  return s
    ? i !== "intent"
      ? [d, x, {}]
      : [
          d,
          x,
          {
            onFocus: Xr(m, T),
            onBlur: Xr(h, I),
            onMouseEnter: Xr(g, T),
            onMouseLeave: Xr(S, I),
            onTouchStart: Xr(E, T),
          },
        ]
    : [!1, x, {}];
}
function Xr(i, r) {
  return (s) => {
    i && i(s), s.defaultPrevented || r(s);
  };
}
function Rg({ page: i, ...r }) {
  let { router: s } = Tg(),
    a = P.useMemo(() => pf(s.routes, i, s.basename), [s.routes, i, s.basename]);
  return a ? P.createElement(Og, { page: i, matches: a, ...r }) : null;
}
function _g(i) {
  let { manifest: r, routeModules: s } = Cf(),
    [a, l] = P.useState([]);
  return (
    P.useEffect(() => {
      let d = !1;
      return (
        Eg(i, r, s).then((f) => {
          d || l(f);
        }),
        () => {
          d = !0;
        }
      );
    }, [i, r, s]),
    a
  );
}
function Og({ page: i, matches: r, ...s }) {
  let a = _n(),
    { manifest: l, routeModules: d } = Cf(),
    { loaderData: f, matches: m } = Lg(),
    h = P.useMemo(() => jd(i, r, m, l, a, "data"), [i, r, m, l, a]),
    g = P.useMemo(() => jd(i, r, m, l, a, "assets"), [i, r, m, l, a]),
    S = P.useMemo(() => {
      if (i === a.pathname + a.search + a.hash) return [];
      let T = new Set(),
        I = !1;
      if (
        (r.forEach((R) => {
          var $;
          let M = l.routes[R.route.id];
          !M ||
            !M.hasLoader ||
            ((!h.some((G) => G.route.id === R.route.id) &&
              R.route.id in f &&
              ($ = d[R.route.id]) != null &&
              $.shouldRevalidate) ||
            M.hasClientLoader
              ? (I = !0)
              : T.add(R.route.id));
        }),
        T.size === 0)
      )
        return [];
      let L = jg(i);
      return (
        I &&
          T.size > 0 &&
          L.searchParams.set(
            "_routes",
            r
              .filter((R) => T.has(R.route.id))
              .map((R) => R.route.id)
              .join(","),
          ),
        [L.pathname + L.search]
      );
    }, [f, a, l, h, r, i, d]),
    E = P.useMemo(() => Cg(g, l), [g, l]),
    x = _g(g);
  return P.createElement(
    P.Fragment,
    null,
    S.map((T) =>
      P.createElement("link", {
        key: T,
        rel: "prefetch",
        as: "fetch",
        href: T,
        ...s,
      }),
    ),
    E.map((T) =>
      P.createElement("link", { key: T, rel: "modulepreload", href: T, ...s }),
    ),
    x.map(({ key: T, link: I }) => P.createElement("link", { key: T, ...I })),
  );
}
function Ag(...i) {
  return (r) => {
    i.forEach((s) => {
      typeof s == "function" ? s(r) : s != null && (s.current = r);
    });
  };
}
var Nf =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Nf && (window.__reactRouterVersion = "7.1.1");
} catch {}
function Dg({ basename: i, children: r, window: s }) {
  let a = P.useRef();
  a.current == null && (a.current = Em({ window: s, v5Compat: !0 }));
  let l = a.current,
    [d, f] = P.useState({ action: l.action, location: l.location }),
    m = P.useCallback(
      (h) => {
        P.startTransition(() => f(h));
      },
      [f],
    );
  return (
    P.useLayoutEffect(() => l.listen(m), [l, m]),
    P.createElement(dg, {
      basename: i,
      children: r,
      location: d.location,
      navigationType: d.action,
      navigator: l,
    })
  );
}
var bf = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  tt = P.forwardRef(function (
    {
      onClick: r,
      discover: s = "render",
      prefetch: a = "none",
      relative: l,
      reloadDocument: d,
      replace: f,
      state: m,
      target: h,
      to: g,
      preventScrollReset: S,
      viewTransition: E,
      ...x
    },
    T,
  ) {
    let { basename: I } = P.useContext(Lt),
      L = typeof g == "string" && bf.test(g),
      R,
      M = !1;
    if (typeof g == "string" && L && ((R = g), Nf))
      try {
        let re = new URL(window.location.href),
          ae = g.startsWith("//") ? new URL(re.protocol + g) : new URL(g),
          me = fn(ae.pathname, I);
        ae.origin === re.origin && me != null
          ? (g = me + ae.search + ae.hash)
          : (M = !0);
      } catch {
        Tt(
          !1,
          `<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let $ = Gm(g, { relative: l }),
      [G, W, te] = Pg(a, x),
      le = Fg(g, {
        replace: f,
        state: m,
        target: h,
        preventScrollReset: S,
        relative: l,
        viewTransition: E,
      });
    function Z(re) {
      r && r(re), re.defaultPrevented || le(re);
    }
    let ne = P.createElement("a", {
      ...x,
      ...te,
      href: R || $,
      onClick: M || d ? r : Z,
      ref: Ag(T, W),
      target: h,
      "data-discover": !L && s === "render" ? "true" : void 0,
    });
    return G && !L
      ? P.createElement(P.Fragment, null, ne, P.createElement(Rg, { page: $ }))
      : ne;
  });
tt.displayName = "Link";
var Mg = P.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: s = !1,
    className: a = "",
    end: l = !1,
    style: d,
    to: f,
    viewTransition: m,
    children: h,
    ...g
  },
  S,
) {
  let E = ui(f, { relative: g.relative }),
    x = _n(),
    T = P.useContext(_s),
    { navigator: I, basename: L } = P.useContext(Lt),
    R = T != null && Wg(E) && m === !0,
    M = I.encodeLocation ? I.encodeLocation(E).pathname : E.pathname,
    $ = x.pathname,
    G =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  s ||
    (($ = $.toLowerCase()),
    (G = G ? G.toLowerCase() : null),
    (M = M.toLowerCase())),
    G && L && (G = fn(G, L) || G);
  const W = M !== "/" && M.endsWith("/") ? M.length - 1 : M.length;
  let te = $ === M || (!l && $.startsWith(M) && $.charAt(W) === "/"),
    le =
      G != null &&
      (G === M || (!l && G.startsWith(M) && G.charAt(M.length) === "/")),
    Z = { isActive: te, isPending: le, isTransitioning: R },
    ne = te ? r : void 0,
    re;
  typeof a == "function"
    ? (re = a(Z))
    : (re = [
        a,
        te ? "active" : null,
        le ? "pending" : null,
        R ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ae = typeof d == "function" ? d(Z) : d;
  return P.createElement(
    tt,
    {
      ...g,
      "aria-current": ne,
      className: re,
      ref: S,
      style: ae,
      to: f,
      viewTransition: m,
    },
    typeof h == "function" ? h(Z) : h,
  );
});
Mg.displayName = "NavLink";
var zg = P.forwardRef(
  (
    {
      discover: i = "render",
      fetcherKey: r,
      navigate: s,
      reloadDocument: a,
      replace: l,
      state: d,
      method: f = Es,
      action: m,
      onSubmit: h,
      relative: g,
      preventScrollReset: S,
      viewTransition: E,
      ...x
    },
    T,
  ) => {
    let I = Vg(),
      L = Hg(m, { relative: g }),
      R = f.toLowerCase() === "get" ? "get" : "post",
      M = typeof m == "string" && bf.test(m),
      $ = (G) => {
        if ((h && h(G), G.defaultPrevented)) return;
        G.preventDefault();
        let W = G.nativeEvent.submitter,
          te = (W == null ? void 0 : W.getAttribute("formmethod")) || f;
        I(W || G.currentTarget, {
          fetcherKey: r,
          method: te,
          navigate: s,
          replace: l,
          state: d,
          relative: g,
          preventScrollReset: S,
          viewTransition: E,
        });
      };
    return P.createElement("form", {
      ref: T,
      method: R,
      action: L,
      onSubmit: a ? h : $,
      ...x,
      "data-discover": !M && i === "render" ? "true" : void 0,
    });
  },
);
zg.displayName = "Form";
function $g(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function If(i) {
  let r = P.useContext(cr);
  return be(r, $g(i)), r;
}
function Fg(
  i,
  {
    target: r,
    replace: s,
    state: a,
    preventScrollReset: l,
    relative: d,
    viewTransition: f,
  } = {},
) {
  let m = Ym(),
    h = _n(),
    g = ui(i, { relative: d });
  return P.useCallback(
    (S) => {
      if (vg(S, r)) {
        S.preventDefault();
        let E = s !== void 0 ? s : ii(h) === ii(g);
        m(i, {
          replace: E,
          state: a,
          preventScrollReset: l,
          relative: d,
          viewTransition: f,
        });
      }
    },
    [h, m, g, s, a, r, i, l, d, f],
  );
}
var Bg = 0,
  Ug = () => `__${String(++Bg)}__`;
function Vg() {
  let { router: i } = If("useSubmit"),
    { basename: r } = P.useContext(Lt),
    s = ag();
  return P.useCallback(
    async (a, l = {}) => {
      let { action: d, method: f, encType: m, formData: h, body: g } = wg(a, r);
      if (l.navigate === !1) {
        let S = l.fetcherKey || Ug();
        await i.fetch(S, s, l.action || d, {
          preventScrollReset: l.preventScrollReset,
          formData: h,
          body: g,
          formMethod: l.method || f,
          formEncType: l.encType || m,
          flushSync: l.flushSync,
        });
      } else
        await i.navigate(l.action || d, {
          preventScrollReset: l.preventScrollReset,
          formData: h,
          body: g,
          formMethod: l.method || f,
          formEncType: l.encType || m,
          replace: l.replace,
          state: l.state,
          fromRouteId: s,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [i, r, s],
  );
}
function Hg(i, { relative: r } = {}) {
  let { basename: s } = P.useContext(Lt),
    a = P.useContext(Ut);
  be(a, "useFormAction must be used inside a RouteContext");
  let [l] = a.matches.slice(-1),
    d = { ...ui(i || ".", { relative: r }) },
    f = _n();
  if (i == null) {
    d.search = f.search;
    let m = new URLSearchParams(d.search),
      h = m.getAll("index");
    if (h.some((S) => S === "")) {
      m.delete("index"),
        h.filter((E) => E).forEach((E) => m.append("index", E));
      let S = m.toString();
      d.search = S ? `?${S}` : "";
    }
  }
  return (
    (!i || i === ".") &&
      l.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (d.pathname = d.pathname === "/" ? s : Ft([s, d.pathname])),
    ii(d)
  );
}
function Wg(i, r = {}) {
  let s = P.useContext(xf);
  be(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: a } = If("useViewTransitionState"),
    l = ui(i, { relative: r.relative });
  if (!s.isTransitioning) return !1;
  let d = fn(s.currentLocation.pathname, a) || s.currentLocation.pathname,
    f = fn(s.nextLocation.pathname, a) || s.nextLocation.pathname;
  return Ns(l.pathname, f) != null || Ns(l.pathname, d) != null;
}
new TextEncoder();
const qg = (i, r, s, a) => {
    var d, f, m, h;
    const l = [s, { code: r, ...(a || {}) }];
    if (
      (f = (d = i == null ? void 0 : i.services) == null ? void 0 : d.logger) !=
        null &&
      f.forward
    )
      return i.services.logger.forward(l, "warn", "react-i18next::", !0);
    Tn(l[0]) && (l[0] = `react-i18next:: ${l[0]}`),
      (h = (m = i == null ? void 0 : i.services) == null ? void 0 : m.logger) !=
        null && h.warn
        ? i.services.logger.warn(...l)
        : console != null && console.warn && console.warn(...l);
  },
  Td = {},
  Ja = (i, r, s, a) => {
    (Tn(s) && Td[s]) || (Tn(s) && (Td[s] = new Date()), qg(i, r, s, a));
  },
  jf = (i, r) => () => {
    if (i.isInitialized) r();
    else {
      const s = () => {
        setTimeout(() => {
          i.off("initialized", s);
        }, 0),
          r();
      };
      i.on("initialized", s);
    }
  },
  Xa = (i, r, s) => {
    i.loadNamespaces(r, jf(i, s));
  },
  Ld = (i, r, s, a) => {
    if (
      (Tn(s) && (s = [s]),
      i.options.preload && i.options.preload.indexOf(r) > -1)
    )
      return Xa(i, s, a);
    s.forEach((l) => {
      i.options.ns.indexOf(l) < 0 && i.options.ns.push(l);
    }),
      i.loadLanguages(r, jf(i, a));
  },
  Kg = (i, r, s = {}) =>
    !r.languages || !r.languages.length
      ? (Ja(r, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
          languages: r.languages,
        }),
        !0)
      : r.hasLoadedNamespace(i, {
          lng: s.lng,
          precheck: (a, l) => {
            var d;
            if (
              ((d = s.bindI18n) == null
                ? void 0
                : d.indexOf("languageChanging")) > -1 &&
              a.services.backendConnector.backend &&
              a.isLanguageChangingTo &&
              !l(a.isLanguageChangingTo, i)
            )
              return !1;
          },
        }),
  Tn = (i) => typeof i == "string",
  Qg = (i) => typeof i == "object" && i !== null,
  Gg =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  Yg = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/",
  },
  Jg = (i) => Yg[i],
  Xg = (i) => i.replace(Gg, Jg);
let Za = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Xg,
};
const Zg = (i = {}) => {
    Za = { ...Za, ...i };
  },
  ev = () => Za;
let Tf;
const tv = (i) => {
    Tf = i;
  },
  nv = () => Tf,
  rv = {
    type: "3rdParty",
    init(i) {
      Zg(i.options.react), tv(i);
    },
  },
  iv = P.createContext();
class sv {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(r) {
    r.forEach((s) => {
      this.usedNamespaces[s] || (this.usedNamespaces[s] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const ov = (i, r) => {
    const s = P.useRef();
    return (
      P.useEffect(() => {
        s.current = i;
      }, [i, r]),
      s.current
    );
  },
  Lf = (i, r, s, a) => i.getFixedT(r, s, a),
  av = (i, r, s, a) => P.useCallback(Lf(i, r, s, a), [i, r, s, a]),
  Pt = (i, r = {}) => {
    var W, te, le, Z;
    const { i18n: s } = r,
      { i18n: a, defaultNS: l } = P.useContext(iv) || {},
      d = s || a || nv();
    if ((d && !d.reportNamespaces && (d.reportNamespaces = new sv()), !d)) {
      Ja(
        d,
        "NO_I18NEXT_INSTANCE",
        "useTranslation: You will need to pass in an i18next instance by using initReactI18next",
      );
      const ne = (ae, me) =>
          Tn(me)
            ? me
            : Qg(me) && Tn(me.defaultValue)
              ? me.defaultValue
              : Array.isArray(ae)
                ? ae[ae.length - 1]
                : ae,
        re = [ne, {}, !1];
      return (re.t = ne), (re.i18n = {}), (re.ready = !1), re;
    }
    (W = d.options.react) != null &&
      W.wait &&
      Ja(
        d,
        "DEPRECATED_OPTION",
        "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.",
      );
    const f = { ...ev(), ...d.options.react, ...r },
      { useSuspense: m, keyPrefix: h } = f;
    let g = l || ((te = d.options) == null ? void 0 : te.defaultNS);
    (g = Tn(g) ? [g] : g || ["translation"]),
      (Z = (le = d.reportNamespaces).addUsedNamespaces) == null ||
        Z.call(le, g);
    const S =
        (d.isInitialized || d.initializedStoreOnce) &&
        g.every((ne) => Kg(ne, d, f)),
      E = av(d, r.lng || null, f.nsMode === "fallback" ? g : g[0], h),
      x = () => E,
      T = () => Lf(d, r.lng || null, f.nsMode === "fallback" ? g : g[0], h),
      [I, L] = P.useState(x);
    let R = g.join();
    r.lng && (R = `${r.lng}${R}`);
    const M = ov(R),
      $ = P.useRef(!0);
    P.useEffect(() => {
      const { bindI18n: ne, bindI18nStore: re } = f;
      ($.current = !0),
        !S &&
          !m &&
          (r.lng
            ? Ld(d, r.lng, g, () => {
                $.current && L(T);
              })
            : Xa(d, g, () => {
                $.current && L(T);
              })),
        S && M && M !== R && $.current && L(T);
      const ae = () => {
        $.current && L(T);
      };
      return (
        ne && (d == null || d.on(ne, ae)),
        re && (d == null || d.store.on(re, ae)),
        () => {
          ($.current = !1),
            d && (ne == null || ne.split(" ").forEach((me) => d.off(me, ae))),
            re && d && re.split(" ").forEach((me) => d.store.off(me, ae));
        }
      );
    }, [d, R]),
      P.useEffect(() => {
        $.current && S && L(x);
      }, [d, h, S]);
    const G = [I, d, S];
    if (((G.t = I), (G.i18n = d), (G.ready = S), S || (!S && !m))) return G;
    throw new Promise((ne) => {
      r.lng ? Ld(d, r.lng, g, () => ne()) : Xa(d, g, () => ne());
    });
  },
  lv = [
    { textKey: "navbar.b3", path: "/corporate_responsibility" },
    { textKey: "navbar.b4", path: "/about" },
    { textKey: "navbar.b5", path: "/contact" },
  ],
  uv = [
    {
      textKey: "navbar.sections.buy.title",
      id: "buy-section",
      descriptionKey: "navbar.sections.buy.description",
    },
    {
      textKey: "navbar.sections.sell.title",
      id: "sell-section",
      descriptionKey: "navbar.sections.sell.description",
    },
    {
      textKey: "navbar.sections.invest.title",
      id: "invest-section",
      descriptionKey: "navbar.sections.invest.description",
    },
    {
      textKey: "navbar.sections.legal.title",
      id: "legal-aspect-section",
      descriptionKey: "navbar.sections.legal.description",
    },
  ],
  cv = () => {
    const { t: i, i18n: r } = Pt(),
      [s, a] = P.useState(!1),
      [l, d] = P.useState(i("lang")),
      [f, m] = P.useState(!1),
      [h, g] = P.useState(!1),
      S = (E) => {
        d(E), r.changeLanguage(E);
      };
    return v.jsx("nav", {
      className: "sticky top-0 z-30 w-full bg-white font-zesta-bold",
      children: v.jsxs("div", {
        className:
          "justify-between px-8 md:w-full md:mx-auto lg:max-w-7xl md:items-center md:flex md:px-16 md:mx-16",
        children: [
          v.jsxs("div", {
            className:
              "flex items-center justify-between w-full md:w-auto md:mr-5",
            children: [
              v.jsxs(tt, {
                to: "/",
                className: "flex items-center",
                onClick: () => a(!s),
                children: [
                  v.jsx("img", {
                    alt: "LBA_Logo",
                    className: "hidden md:block w-full max-w-[10rem] h-auto",
                    src: "icons/LBA_Logo.jpg",
                  }),
                  v.jsx("span", {
                    className:
                      "block md:hidden text-lg font-bold text-primary ",
                    children: "L-B-A",
                  }),
                ],
              }),
              v.jsx("button", {
                className:
                  "md:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md",
                onClick: () => a(!s),
                children: s
                  ? v.jsx("svg", {
                      className: "w-6 h-6",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      children: v.jsx("path", {
                        fillRule: "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        clipRule: "evenodd",
                      }),
                    })
                  : v.jsx("svg", {
                      className: "w-6 h-6",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      children: v.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4 6h16M4 12h16M4 18h16",
                      }),
                    }),
              }),
            ],
          }),
          v.jsxs("div", {
            className: `w-full md:flex flex-col md:flex-row items-center justify-between ${s ? "block" : "hidden"}`,
            children: [
              v.jsxs("ul", {
                className:
                  "flex flex-col md:flex-row justify-left items-left space-y-4 mx-3 md:space-y-0 md:space-x-8 py-4 md:py-0",
                children: [
                  v.jsxs("li", {
                    className:
                      "relative text-sm md:text-base font-medium text-primary hover:text-secondary uppercase",
                    children: [
                      v.jsxs("span", {
                        className:
                          "cursor-pointer flex items-center justify-between",
                        onClick: () => {
                          g(!h);
                        },
                        children: [
                          i("navbar.b2"),
                          v.jsx("svg", {
                            className: `w-5 h-5 transform transition-transform duration-200 ${h ? "rotate-180" : ""}`,
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: v.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7",
                            }),
                          }),
                        ],
                      }),
                      h &&
                        v.jsx("ul", {
                          className:
                            "pt-4 pb-6 w-full md:absolute md:w-max md:mt-4 md:bg-white md:shadow-md md:rounded-md",
                          children: uv.map((E) =>
                            v.jsx(
                              "li",
                              {
                                className: "px-4 py-2 hover:bg-gray-100",
                                onClick: () => {
                                  g(!h);
                                },
                                children: v.jsxs("a", {
                                  href: `/invest_and_plan#${E.id}`,
                                  className: "block text-primary",
                                  children: [
                                    v.jsx("h2", { children: i(E.textKey) }),
                                    v.jsx("p", {
                                      className: "text-sm",
                                      children: i(E.descriptionKey),
                                    }),
                                  ],
                                }),
                              },
                              E.id,
                            ),
                          ),
                        }),
                    ],
                  }),
                  lv.map((E) =>
                    v.jsx(
                      "li",
                      {
                        className:
                          "text-sm md:text-base font-medium text-primary hover:text-secondary uppercase",
                        children: v.jsx(tt, {
                          to: E.path,
                          onClick: () => {
                            a(!s), g(h && !h);
                          },
                          children: i(E.textKey),
                        }),
                      },
                      E.textKey,
                    ),
                  ),
                ],
              }),
              v.jsx("div", {
                className: "flex items-left justify-left space-x-4",
                children: v.jsxs("div", {
                  className: "relative",
                  children: [
                    v.jsxs("span", {
                      className:
                        "cursor-pointer flex items-center justify-between",
                      onClick: () => m(!f),
                      children: [
                        v.jsx("img", {
                          src: `/flags/${l}.png`,
                          alt: `${l} flag`,
                          className: "w-icon",
                        }),
                        v.jsx("svg", {
                          className: `w-5 h-5 transform transition-transform duration-200 ${h ? "rotate-180" : ""}`,
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: v.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M19 9l-7 7-7-7",
                          }),
                        }),
                      ],
                    }),
                    f &&
                      v.jsx("div", {
                        className:
                          "absolute bg-white border rounded-md shadow-lg md:mt-1",
                        children: v.jsxs("div", {
                          className: "flex flex-col",
                          children: [
                            v.jsx("button", {
                              className:
                                "flex items-center px-3 py-2 hover:bg-gray-100",
                              onClick: () => {
                                m(!1), S("en");
                              },
                              children: v.jsx("img", {
                                src: "/flags/en.png",
                                alt: "English",
                                className: "w-icon",
                              }),
                            }),
                            v.jsx("button", {
                              className:
                                "flex items-center px-3 py-2 hover:bg-gray-100",
                              onClick: () => {
                                m(!1), S("fr");
                              },
                              children: v.jsx("img", {
                                src: "/flags/fr.png",
                                alt: "French",
                                className: "w-icon",
                              }),
                            }),
                          ],
                        }),
                      }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  dv = () => {
    const { t: i } = Pt();
    return v.jsx("footer", {
      className: "bg-primary text-white py-12 font-zesta-regular",
      children: v.jsxs("div", {
        className: "container mx-auto md:px-bdr px-6 text-center",
        children: [
          v.jsx("h2", {
            className: "text-3xl font-bold",
            children: i("callToAction.title"),
          }),
          v.jsx("p", {
            className: "mt-4 text-white",
            children: i("callToAction.body"),
          }),
          v.jsxs("div", {
            className: "mt-8 flex justify-center gap-4",
            children: [
              v.jsx("button", {
                className:
                  "border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-white hover:text-primary text-white transition uppercase",
                children: v.jsx(tt, {
                  to: "/contact",
                  children: i("callToAction.contactUsButton"),
                }),
              }),
              v.jsx("button", {
                className:
                  "border rounded border-white mt-6 px-6 py-2 w-1/2 lg:w-1/4 bg-transparent hover:bg-pink-50 hover:text-primary text-white transition uppercase",
                children: v.jsx(tt, {
                  to: "/about",
                  children: i("callToAction.learnMoreButton"),
                }),
              }),
            ],
          }),
          v.jsxs("div", {
            className: "mt-12",
            children: [
              v.jsxs("div", {
                className: "flex justify-center gap-6 mt-4",
                children: [
                  v.jsx("a", {
                    href: "https://www.linkedin.com/company/legal-boutique-advisers/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:underline w-icon",
                    children: v.jsx("img", { src: "icons/linkedin.png" }),
                  }),
                  v.jsx("a", {
                    href: "https://x.com/legalboutiquea",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:underline w-icon",
                    children: v.jsx("img", { src: "icons/twitter.png" }),
                  }),
                  v.jsx("a", {
                    href: "https://www.instagram.com/legalboutiqueadvisers/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:underline w-icon",
                    children: v.jsx("img", { src: "icons/instagram.png" }),
                  }),
                ],
              }),
              v.jsxs("div", {
                className:
                  "flex flex-col items-center justify-center items-start mt-6 text-sm gap-4 text-black text-xl",
                children: [
                  v.jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      v.jsx("img", {
                        src: "icons/telephone.png",
                        className: "w-icon",
                        alt: "Phone Icon",
                      }),
                      v.jsx("a", {
                        href: "tel:+34 952 777 991",
                        className: "hover:underline",
                        children: "+34 952 777 991",
                      }),
                    ],
                  }),
                  v.jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      v.jsx("img", {
                        src: "icons/email.png",
                        className: "w-icon",
                        alt: "Email Icon",
                      }),
                      v.jsx("a", {
                        href: "mailto:info@legalboutiqueadvisers.com",
                        className: "hover:underline",
                        children: "info@legalboutiqueadvisers.com",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  };
function fv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-pink-50 relative",
        children: [
          v.jsxs("div", {
            className: `container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary`,
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("landingPage.title"),
              }),
              v.jsx("p", {
                className: "mt-4 text-2xl lg:text-2xl",
                children: i("landingPage.subtitle"),
              }),
              v.jsx("p", {
                className: "mt-6",
                children: i("landingPage.content"),
              }),
              v.jsxs("div", {
                className: "mt-8 flex justify-center gap-4",
                children: [
                  v.jsx("button", {
                    className: `border rounded border-primary mt-6 px-6 py-2 
                      w-1/2 text-xl hover:bg-lt-primary bg-primary text-pink-50 
                      hover:text-pink-50 transition uppercase font-zesta-bold 
                      uppercase`,
                    children: v.jsx(tt, {
                      to: "/contact",
                      children: i("landingPage.contactUsButton"),
                    }),
                  }),
                  v.jsx("button", {
                    className: `border rounded border-primary mt-6 px-6 py-2 
                      w-1/2 text-xl hover:bg-lt-primary bg-primary text-pink-50 
                      hover:text-pink-50 transition uppercase font-zesta-bold 
                      uppercase`,
                    children: v.jsx(tt, {
                      to: "/about",
                      children: i("landingPage.learnMoreButton"),
                    }),
                  }),
                ],
              }),
            ],
          }),
          v.jsx("div", {
            className: `absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary`,
            style: {
              backgroundImage: "url('images/puerto-banus-la-concha.jpeg')",
            },
          }),
        ],
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto py-16 lg:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsxs("section", {
              className: "flex flex-col-reverse lg:flex-row gap-8 items-center",
              children: [
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("main.section1.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("main.section1.description"),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/hand-pen.jpg",
                    alt: "Legal Expertise in Real Estate",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center",
              children: [
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/modern-house.jpeg",
                    alt: "Buying Properties in Marbella",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("main.section2.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "my-4 text-lt-primary",
                      children: i("main.section2.description"),
                    }),
                    v.jsx("button", {
                      className: `border rounded border-primary p-1 w-full 
                          text-xl bg-transparent hover:bg-pink-50 text-primary 
                          uppercase`,
                      children: v.jsx(tt, {
                        to: "/buy",
                        children: i("main.section2.button"),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("section", {
              className: "p-8 gap-8 items-center justify-center",
              children: [
                v.jsx("h2", {
                  className: "text-3xl font-bold text-primary",
                  children: i("main.section3.sectionTitle"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary",
                  children: i("main.section3.description"),
                }),
                v.jsx("button", {
                  className: `border rounded border-primary mt-6 px-6 py-2 
                        w-auto text-xl bg-transparent hover:bg-pink-50 
                        text-primary transition uppercase`,
                  children: v.jsx(tt, {
                    to: "/sell",
                    children: i("main.section3.button"),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function pv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    id: "buy-section",
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsx("div", {
        className: "sticky top-0 relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-primary",
        children: [
          v.jsxs("div", {
            className: "container mx-auto md:px-bdr px-6 py-16 text-center",
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("buy.section1.sectionTitle"),
              }),
              v.jsx("p", {
                className: "mt-4 font-light text-lg lg:text-2xl",
                children: i("buy.section1.description"),
              }),
            ],
          }),
          v.jsx("div", {
            className: `absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary`,
            style: { backgroundImage: "url('images/puente-romano-peer.jpeg')" },
          }),
        ],
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto py-16 md:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsx("section", {
              className: "flex flex-col-reverse lg:flex-row gap-8 items-center",
              children: v.jsxs("div", {
                className: "lg:w-1/2",
                children: [
                  v.jsx("h2", {
                    className: "text-5xl font-bold text-primary",
                    children: i("buy.section2.sectionTitle"),
                  }),
                  v.jsx("p", {
                    className: "mt-4 text-lt-primary",
                    children: i("buy.section2.description"),
                  }),
                ],
              }),
            }),
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center",
              children: [
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("buy.section3.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("buy.section3.description"),
                    }),
                    v.jsx("button", {
                      className:
                        "border rounded border-primary mt-4 px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase",
                      children: v.jsx(tt, {
                        to: "/contact",
                        children: i("sell.section2.button"),
                      }),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/marbella-old-town-flowers.jpg",
                    alt: "Luxury Properties Portfolio",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className: "text-center bg-gray-50 py-16",
              children: [
                v.jsx("h2", {
                  className: "text-6xl font-bold text-primary",
                  children: i("buy.section4.sectionTitle"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                  children: i("buy.section4.description"),
                }),
                v.jsx("img", {
                  src: "https://via.placeholder.com/800x400?text=Your+Dream+Home+Marbella",
                  alt: "Dream Property in Marbella",
                  className: "mt-8 mx-auto rounded-lg shadow-lg",
                }),
              ],
            }),
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center",
              children: [
                v.jsxs("div", {
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("buy.section5.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("buy.section5.description"),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "https://via.placeholder.com/600x400?text=Golden+Visa+Legal+Support",
                    alt: "Golden Visa Legal Support",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function hv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    id: "sell-section",
    className: "bg-gray-50 min-h-screen font-zesta-bold",
    children: [
      v.jsx("div", { className: "sticky top-0 relative h-4 bg-primary z-20" }),
      v.jsx("header", {
        className: "sticky top-0 bg-white text-primary",
        children: v.jsxs("div", {
          className: "container mx-auto md:px-bdr px-6 py-16 text-center",
          children: [
            v.jsx("h1", {
              className: "text-4xl lg:text-6xl font-bold uppercase",
              children: i("sell.section1.sectionTitle"),
            }),
            v.jsx("p", {
              className: "mt-4 font-light text-lg lg:text-2xl",
              children: i("sell.section1.description"),
            }),
            v.jsx("div", {
              className: "absolute inset-0 bg-cover bg-center opacity-40",
              style: {
                backgroundImage: 'url("images/plaza-los-naranjos.jpg")',
              },
            }),
          ],
        }),
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto pt-16 md:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center",
              children: [
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("sell.section2.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "my-4 text-lt-primary",
                      children: i("sell.section2.description"),
                    }),
                    v.jsx("button", {
                      className:
                        "border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase",
                      children: v.jsx(tt, {
                        to: "/contact",
                        children: i("sell.section2.button"),
                      }),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/palmera-house.jpeg",
                    alt: "Sell with Confidence",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className: "text-center bg-gray-50 py-16",
              children: [
                v.jsx("h2", {
                  className: "text-6xl font-bold text-primary",
                  children: i("sell.section3.sectionTitle"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                  children: i("sell.section3.description"),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function mv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    id: "invest-section",
    className: "bg-gray-50 min-h-screen font-zesta-bold",
    children: [
      v.jsx("div", { className: "sticky top-0 relative h-4 bg-primary z-20" }),
      v.jsx("header", {
        className: "sticky top-0 bg-white text-primary",
        children: v.jsxs("div", {
          className: "container mx-auto md:px-bdr px-6 py-16 text-center",
          children: [
            v.jsx("h1", {
              className: "text-4xl lg:text-6xl font-bold uppercase",
              children: i("investPlan.title"),
            }),
            v.jsx("p", {
              className: "mt-4 font-light text-lg lg:text-2xl",
              children: i("investPlan.description"),
            }),
            v.jsx("div", {
              className: "absolute inset-0 bg-cover bg-center opacity-40",
              style: { backgroundImage: 'url("images/ronda-cliff.jpeg")' },
            }),
          ],
        }),
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto pt-16 md:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center",
              children: [
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/bugambilla-terace.jpg",
                    alt: "Sell with Confidence",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("investPlan.section2.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "my-4 text-lt-primary",
                      children: i("investPlan.section2.description"),
                    }),
                    v.jsx("button", {
                      className:
                        "border rounded border-primary px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition uppercase",
                      children: v.jsx(tt, {
                        to: "/contact",
                        children: i("investPlan.section2.button"),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("section", {
              className: "text-center bg-gray-50 py-16",
              children: [
                v.jsx("h2", {
                  className: "text-6xl font-bold text-primary",
                  children: i("investPlan.section3.sectionTitle"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                  children: i("investPlan.section3.description"),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function gv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    id: "legal-aspect-section",
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsx("div", {
        className: "sticky top-0 relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-primary",
        children: [
          v.jsxs("div", {
            className: "container mx-auto md:px-bdr px-6 py-16 text-center",
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("legalAspect.description.paragraph2.title"),
              }),
              v.jsx("p", {
                className: "mt-4 font-light text-lg lg:text-2xl",
                children: i("legalAspect.description.paragraph2.text"),
              }),
            ],
          }),
          v.jsx("div", {
            className: `absolute inset-0 w-full h-full bg-cover bg-center z-0 
            opacity-50 bg-primary`,
            style: {
              backgroundImage: "url('images/golf-lake-villa-padierna.jpg')",
            },
          }),
        ],
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto py-16 md:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row-reverse gap-8 items-center",
              children: [
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("legalAspect.description.paragraph3.title"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("legalAspect.description.paragraph3.text"),
                    }),
                    v.jsx("div", {
                      className: "mt-4",
                      children: v.jsx("button", {
                        className:
                          "border rounded border-primary px-6 py-2 text-lg bg-transparent hover:bg-pink-50 text-primary transition uppercase",
                        children: "Learn More",
                      }),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/golf-sand-bunker-pink-trees-crop.jpg",
                    alt: "Inheritance Planning",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className: "text-center bg-gray-50 py-16",
              children: [
                v.jsx("h2", {
                  className: "text-6xl font-bold text-primary",
                  children: i("legalAspect.description.paragraph4.title"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                  children: i("legalAspect.description.paragraph4.text"),
                }),
                v.jsx("div", {
                  className: "mt-4",
                  children: v.jsx("button", {
                    className:
                      "border rounded border-primary px-6 py-2 text-lg bg-transparent hover:bg-pink-50 text-primary transition uppercase",
                    children: i("landingPage.learnMoreButton"),
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className: "bg-gray-50 text-center py-16",
              children: [
                v.jsx("h2", {
                  className: "text-4xl font-bold text-primary",
                  children: i("legalAspect.title"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary text-lg",
                  children: "We specialize in the following areas:",
                }),
                v.jsx("div", {
                  className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8",
                  children: [
                    i("legalAspect.description.services.area1"),
                    i("legalAspect.description.services.area2"),
                    i("legalAspect.description.services.area3"),
                    i("legalAspect.description.services.area4"),
                    i("legalAspect.description.services.area5"),
                  ].map((r, s) =>
                    v.jsxs(
                      "div",
                      {
                        className:
                          "border p-8 rounded-lg shadow-lg hover:bg-pink-50 transition",
                        children: [
                          v.jsx("h3", {
                            className: "text-xl font-bold text-primary",
                            children: r,
                          }),
                          v.jsx("p", {
                            className: "mt-4 text-lt-primary",
                            children:
                              "Comprehensive solutions tailored for your needs.",
                          }),
                        ],
                      },
                      s,
                    ),
                  ),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function vv() {
  return v.jsxs("div", {
    children: [v.jsx(pv, {}), v.jsx(hv, {}), v.jsx(mv, {}), v.jsx(gv, {})],
  });
}
function yv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-pink-50 relative",
        children: [
          v.jsxs("div", {
            className: `container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary`,
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("invest.section1.title"),
              }),
              v.jsx("p", {
                className: "mt-4 text-2xl lg:text-2xl",
                children: i("invest.section1.body"),
              }),
            ],
          }),
          v.jsx("div", {
            className: `absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary`,
            style: {
              backgroundImage: 'url("images/las-brisas-landscape.jpg")',
            },
          }),
        ],
      }),
      v.jsx("div", { className: "relative h-4 bg-primary z-20" }),
      v.jsxs("main", {
        className: "relative md:px-bdr px-2 py-16 z-20 space-y-16 bg-gray-50",
        children: [
          v.jsxs("section", {
            className: "text-center bg-gray-50 ",
            children: [
              v.jsx("h2", {
                className: "text-3xl font-bold text-primary",
                children: i("corporateResposibility.section1.sectionTitle"),
              }),
              v.jsx("p", {
                className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                children: i("corporateResposibility.section1.description"),
              }),
              v.jsx("img", {
                src: "images/golf-fondo-la-concha.jpg",
                alt: "Contemporary Art",
                className: "mt-8 mx-auto rounded-lg shadow-lg",
              }),
            ],
          }),
          v.jsxs("section", {
            className: "flex flex-col lg:flex-row gap-8 mx-auto px-2",
            children: [
              v.jsxs("div", {
                className: "bg-white shadow-md p-8 rounded-lg lg:w-1/2",
                children: [
                  v.jsx("h2", {
                    className: "text-3xl font-bold text-primary",
                    children: i("corporateResposibility.section2.sectionTitle"),
                  }),
                  v.jsx("p", {
                    className: "mt-4 text-lt-primary",
                    children: i("corporateResposibility.section2.description"),
                  }),
                ],
              }),
              v.jsxs("div", {
                className: "bg-white shadow-md p-8 rounded-lg lg:w-1/2",
                children: [
                  v.jsx("h2", {
                    className: "text-3xl font-bold text-primary",
                    children: i("corporateResposibility.section3.sectionTitle"),
                  }),
                  v.jsx("p", {
                    className: "mt-4 text-lt-primary",
                    children: i("corporateResposibility.section3.description"),
                  }),
                  v.jsx("button", {
                    className:
                      "border rounded border-primary mt-6 px-6 py-2 w-full text-xl bg-transparent hover:bg-pink-50 text-primary transition",
                    children: v.jsx(tt, {
                      to: "/sell",
                      children: i("corporateResposibility.section3.button"),
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function xv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-pink-50 relative",
        children: [
          v.jsxs("div", {
            className: `container mx-auto lg:px-bdr px-6 py-16 text-center 
                relative z-10 text-primary`,
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("about.section1.sectionTitle"),
              }),
              v.jsx("p", {
                className: "mt-4 text-2xl lg:text-2xl",
                children: i("about.section1.description"),
              }),
            ],
          }),
          v.jsx("div", {
            className: `absolute inset-0 w-full h-full bg-cover bg-center z-0 
              opacity-50 bg-primary`,
            style: { backgroundImage: 'url("images/pool-house.jpg")' },
          }),
        ],
      }),
      v.jsx("div", {
        className: "relative h-4 bg-primary z-20",
        children: " ",
      }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto py-16 lg:px-bdr px-6 space-y-16 z-20",
          children: [
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg flex flex-col lg:flex-row gap-8 items-center",
              children: [
                v.jsxs("div", {
                  className: "lg:w-1/2",
                  children: [
                    v.jsx("h2", {
                      className: "text-3xl font-bold text-primary",
                      children: i("about.section2.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("about.section2.description"),
                    }),
                    v.jsx("h2", {
                      className: "mt-4 text-3xl font-bold text-primary",
                      children: i("about.section3.sectionTitle"),
                    }),
                    v.jsx("p", {
                      className: "mt-4 text-lt-primary",
                      children: i("about.section3.description"),
                    }),
                  ],
                }),
                v.jsx("div", {
                  className: "lg:w-1/2",
                  children: v.jsx("img", {
                    src: "images/catedral-malaga-crop.jpeg",
                    alt: "Global Legal Advice",
                    className: "rounded-lg shadow-lg",
                  }),
                }),
              ],
            }),
            v.jsxs("section", {
              className: "text-center bg-gray-50 py-16",
              children: [
                v.jsx("h2", {
                  className: "text-3xl font-bold text-primary",
                  children: i("about.section4.sectionTitle"),
                }),
                v.jsx("p", {
                  className: "mt-4 text-lt-primary max-w-3xl mx-auto",
                  children: i("about.section4.description"),
                }),
                v.jsx("img", {
                  src: "https://via.placeholder.com/800x400?text=Real+Estate+Team",
                  alt: "Our Real Estate Team",
                  className: "mt-8 mx-auto rounded-lg shadow-lg",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function wv() {
  const { t: i } = Pt();
  return v.jsxs("div", {
    className: "bg-gray-50 min-h-screen font-zesta-regular",
    children: [
      v.jsxs("header", {
        className: "sticky top-0 bg-white text-primary",
        children: [
          v.jsxs("div", {
            className:
              "container mx-auto md:px-bdr px-6 py-16 text-center relative",
            children: [
              v.jsx("h1", {
                className: "text-4xl lg:text-6xl font-bold uppercase",
                children: i("contact.title"),
              }),
              v.jsx("p", {
                className: "mt-4 font-light text-lg lg:text-2xl",
                children: i("contact.description"),
              }),
            ],
          }),
          v.jsx("div", {
            className: "absolute inset-0 bg-cover bg-center opacity-30",
            style: { backgroundImage: 'url("images/casa-la-concha.jpg")' },
          }),
        ],
      }),
      v.jsx("div", { className: "relative h-4 bg-primary z-10" }),
      v.jsx("main", {
        className: "relative bg-gray-50",
        children: v.jsxs("div", {
          className: "container mx-auto py-16 md:px-bdr px-6 z-20",
          children: [
            v.jsxs("section", {
              className:
                "bg-white shadow-md p-8 rounded-lg max-w-2xl mx-auto relative",
              children: [
                v.jsx("h2", {
                  className: "text-3xl font-bold text-center mb-6 text-primary",
                  children: i("contact.title"),
                }),
                v.jsxs("form", {
                  className: "space-y-6",
                  children: [
                    v.jsxs("div", {
                      children: [
                        v.jsx("label", {
                          htmlFor: "email",
                          className: "block text-lt-primary font-semibold mb-1",
                          children: i("contact.email"),
                        }),
                        v.jsx("input", {
                          type: "email",
                          id: "email",
                          name: "email",
                          placeholder: i("contact.email-placeholder"),
                          className:
                            "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent",
                        }),
                      ],
                    }),
                    v.jsxs("div", {
                      children: [
                        v.jsx("label", {
                          htmlFor: "subject",
                          className: "block text-lt-primary font-semibold mb-1",
                          children: i("contact.subject"),
                        }),
                        v.jsx("input", {
                          type: "text",
                          id: "subject",
                          name: "subject",
                          placeholder: i("contact.subject-placeholder"),
                          className:
                            "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent",
                        }),
                      ],
                    }),
                    v.jsxs("div", {
                      children: [
                        v.jsx("label", {
                          htmlFor: "message",
                          className: "block text-lt-primary font-semibold mb-1",
                          children: i("contact.message"),
                        }),
                        v.jsx("textarea", {
                          id: "message",
                          name: "message",
                          rows: 4,
                          placeholder: i("contact.message-body"),
                          className:
                            "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent",
                        }),
                      ],
                    }),
                    v.jsx("div", {
                      className: "text-center",
                      children: v.jsx("button", {
                        type: "submit",
                        className:
                          "border rounded border-primary px-6 py-2 w-1/2 text-lg bg-transparent hover:bg-pink-50 text-primary transition",
                        children: i("contact.submit"),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("section", {
              className: "mt-16 text-center",
              children: [
                v.jsx("p", {
                  className: "text-lt-primary font-light text-md mb-8",
                  children: i("contact.description"),
                }),
                v.jsx("img", {
                  src: "https://via.placeholder.com/800x400?text=Contact+Your+Real+Estate+Expert",
                  alt: "Contact our firm",
                  className: "mx-auto rounded-lg shadow-lg",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const ee = (i) => typeof i == "string",
  Zr = () => {
    let i, r;
    const s = new Promise((a, l) => {
      (i = a), (r = l);
    });
    return (s.resolve = i), (s.reject = r), s;
  },
  Pd = (i) => (i == null ? "" : "" + i),
  Sv = (i, r, s) => {
    i.forEach((a) => {
      r[a] && (s[a] = r[a]);
    });
  },
  kv = /###/g,
  Rd = (i) => (i && i.indexOf("###") > -1 ? i.replace(kv, ".") : i),
  _d = (i) => !i || ee(i),
  ni = (i, r, s) => {
    const a = ee(r) ? r.split(".") : r;
    let l = 0;
    for (; l < a.length - 1; ) {
      if (_d(i)) return {};
      const d = Rd(a[l]);
      !i[d] && s && (i[d] = new s()),
        Object.prototype.hasOwnProperty.call(i, d) ? (i = i[d]) : (i = {}),
        ++l;
    }
    return _d(i) ? {} : { obj: i, k: Rd(a[l]) };
  },
  Od = (i, r, s) => {
    const { obj: a, k: l } = ni(i, r, Object);
    if (a !== void 0 || r.length === 1) {
      a[l] = s;
      return;
    }
    let d = r[r.length - 1],
      f = r.slice(0, r.length - 1),
      m = ni(i, f, Object);
    for (; m.obj === void 0 && f.length; )
      (d = `${f[f.length - 1]}.${d}`),
        (f = f.slice(0, f.length - 1)),
        (m = ni(i, f, Object)),
        m != null &&
          m.obj &&
          typeof m.obj[`${m.k}.${d}`] < "u" &&
          (m.obj = void 0);
    m.obj[`${m.k}.${d}`] = s;
  },
  Ev = (i, r, s, a) => {
    const { obj: l, k: d } = ni(i, r, Object);
    (l[d] = l[d] || []), l[d].push(s);
  },
  bs = (i, r) => {
    const { obj: s, k: a } = ni(i, r);
    if (s && Object.prototype.hasOwnProperty.call(s, a)) return s[a];
  },
  Cv = (i, r, s) => {
    const a = bs(i, s);
    return a !== void 0 ? a : bs(r, s);
  },
  Pf = (i, r, s) => {
    for (const a in r)
      a !== "__proto__" &&
        a !== "constructor" &&
        (a in i
          ? ee(i[a]) ||
            i[a] instanceof String ||
            ee(r[a]) ||
            r[a] instanceof String
            ? s && (i[a] = r[a])
            : Pf(i[a], r[a], s)
          : (i[a] = r[a]));
    return i;
  },
  or = (i) => i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var Nv = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};
const bv = (i) => (ee(i) ? i.replace(/[&<>"'\/]/g, (r) => Nv[r]) : i);
class Iv {
  constructor(r) {
    (this.capacity = r), (this.regExpMap = new Map()), (this.regExpQueue = []);
  }
  getRegExp(r) {
    const s = this.regExpMap.get(r);
    if (s !== void 0) return s;
    const a = new RegExp(r);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(r, a),
      this.regExpQueue.push(r),
      a
    );
  }
}
const jv = [" ", ",", "?", "!", ";"],
  Tv = new Iv(20),
  Lv = (i, r, s) => {
    (r = r || ""), (s = s || "");
    const a = jv.filter((f) => r.indexOf(f) < 0 && s.indexOf(f) < 0);
    if (a.length === 0) return !0;
    const l = Tv.getRegExp(
      `(${a.map((f) => (f === "?" ? "\\?" : f)).join("|")})`,
    );
    let d = !l.test(i);
    if (!d) {
      const f = i.indexOf(s);
      f > 0 && !l.test(i.substring(0, f)) && (d = !0);
    }
    return d;
  },
  el = function (i, r) {
    let s =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
    if (!i) return;
    if (i[r]) return Object.prototype.hasOwnProperty.call(i, r) ? i[r] : void 0;
    const a = r.split(s);
    let l = i;
    for (let d = 0; d < a.length; ) {
      if (!l || typeof l != "object") return;
      let f,
        m = "";
      for (let h = d; h < a.length; ++h)
        if ((h !== d && (m += s), (m += a[h]), (f = l[m]), f !== void 0)) {
          if (
            ["string", "number", "boolean"].indexOf(typeof f) > -1 &&
            h < a.length - 1
          )
            continue;
          d += h - d + 1;
          break;
        }
      l = f;
    }
    return l;
  },
  Is = (i) => (i == null ? void 0 : i.replace("_", "-")),
  Pv = {
    type: "logger",
    log(i) {
      this.output("log", i);
    },
    warn(i) {
      this.output("warn", i);
    },
    error(i) {
      this.output("error", i);
    },
    output(i, r) {
      var s, a;
      (a =
        (s = console == null ? void 0 : console[i]) == null
          ? void 0
          : s.apply) == null || a.call(s, console, r);
    },
  };
let Rv = class tl {
  constructor(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(r, s);
  }
  init(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.prefix = s.prefix || "i18next:"),
      (this.logger = r || Pv),
      (this.options = s),
      (this.debug = s.debug);
  }
  log() {
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return this.forward(s, "log", "", !0);
  }
  warn() {
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return this.forward(s, "warn", "", !0);
  }
  error() {
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return this.forward(s, "error", "");
  }
  deprecate() {
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return this.forward(s, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(r, s, a, l) {
    return l && !this.debug
      ? null
      : (ee(r[0]) && (r[0] = `${a}${this.prefix} ${r[0]}`), this.logger[s](r));
  }
  create(r) {
    return new tl(this.logger, {
      prefix: `${this.prefix}:${r}:`,
      ...this.options,
    });
  }
  clone(r) {
    return (
      (r = r || this.options),
      (r.prefix = r.prefix || this.prefix),
      new tl(this.logger, r)
    );
  }
};
var jt = new Rv();
class As {
  constructor() {
    this.observers = {};
  }
  on(r, s) {
    return (
      r.split(" ").forEach((a) => {
        this.observers[a] || (this.observers[a] = new Map());
        const l = this.observers[a].get(s) || 0;
        this.observers[a].set(s, l + 1);
      }),
      this
    );
  }
  off(r, s) {
    if (this.observers[r]) {
      if (!s) {
        delete this.observers[r];
        return;
      }
      this.observers[r].delete(s);
    }
  }
  emit(r) {
    for (
      var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), l = 1;
      l < s;
      l++
    )
      a[l - 1] = arguments[l];
    this.observers[r] &&
      Array.from(this.observers[r].entries()).forEach((f) => {
        let [m, h] = f;
        for (let g = 0; g < h; g++) m(...a);
      }),
      this.observers["*"] &&
        Array.from(this.observers["*"].entries()).forEach((f) => {
          let [m, h] = f;
          for (let g = 0; g < h; g++) m.apply(m, [r, ...a]);
        });
  }
}
class Ad extends As {
  constructor(r) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { ns: ["translation"], defaultNS: "translation" };
    super(),
      (this.data = r || {}),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(r) {
    this.options.ns.indexOf(r) < 0 && this.options.ns.push(r);
  }
  removeNamespaces(r) {
    const s = this.options.ns.indexOf(r);
    s > -1 && this.options.ns.splice(s, 1);
  }
  getResource(r, s, a) {
    var g, S;
    let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const d =
        l.keySeparator !== void 0 ? l.keySeparator : this.options.keySeparator,
      f =
        l.ignoreJSONStructure !== void 0
          ? l.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let m;
    r.indexOf(".") > -1
      ? (m = r.split("."))
      : ((m = [r, s]),
        a &&
          (Array.isArray(a)
            ? m.push(...a)
            : ee(a) && d
              ? m.push(...a.split(d))
              : m.push(a)));
    const h = bs(this.data, m);
    return (
      !h &&
        !s &&
        !a &&
        r.indexOf(".") > -1 &&
        ((r = m[0]), (s = m[1]), (a = m.slice(2).join("."))),
      h || !f || !ee(a)
        ? h
        : el(
            (S = (g = this.data) == null ? void 0 : g[r]) == null
              ? void 0
              : S[s],
            a,
            d,
          )
    );
  }
  addResource(r, s, a, l) {
    let d =
      arguments.length > 4 && arguments[4] !== void 0
        ? arguments[4]
        : { silent: !1 };
    const f =
      d.keySeparator !== void 0 ? d.keySeparator : this.options.keySeparator;
    let m = [r, s];
    a && (m = m.concat(f ? a.split(f) : a)),
      r.indexOf(".") > -1 && ((m = r.split(".")), (l = s), (s = m[1])),
      this.addNamespaces(s),
      Od(this.data, m, l),
      d.silent || this.emit("added", r, s, a, l);
  }
  addResources(r, s, a) {
    let l =
      arguments.length > 3 && arguments[3] !== void 0
        ? arguments[3]
        : { silent: !1 };
    for (const d in a)
      (ee(a[d]) || Array.isArray(a[d])) &&
        this.addResource(r, s, d, a[d], { silent: !0 });
    l.silent || this.emit("added", r, s, a);
  }
  addResourceBundle(r, s, a, l, d) {
    let f =
        arguments.length > 5 && arguments[5] !== void 0
          ? arguments[5]
          : { silent: !1, skipCopy: !1 },
      m = [r, s];
    r.indexOf(".") > -1 && ((m = r.split(".")), (l = a), (a = s), (s = m[1])),
      this.addNamespaces(s);
    let h = bs(this.data, m) || {};
    f.skipCopy || (a = JSON.parse(JSON.stringify(a))),
      l ? Pf(h, a, d) : (h = { ...h, ...a }),
      Od(this.data, m, h),
      f.silent || this.emit("added", r, s, a);
  }
  removeResourceBundle(r, s) {
    this.hasResourceBundle(r, s) && delete this.data[r][s],
      this.removeNamespaces(s),
      this.emit("removed", r, s);
  }
  hasResourceBundle(r, s) {
    return this.getResource(r, s) !== void 0;
  }
  getResourceBundle(r, s) {
    return s || (s = this.options.defaultNS), this.getResource(r, s);
  }
  getDataByLanguage(r) {
    return this.data[r];
  }
  hasLanguageSomeTranslations(r) {
    const s = this.getDataByLanguage(r);
    return !!((s && Object.keys(s)) || []).find(
      (l) => s[l] && Object.keys(s[l]).length > 0,
    );
  }
  toJSON() {
    return this.data;
  }
}
var Rf = {
  processors: {},
  addPostProcessor(i) {
    this.processors[i.name] = i;
  },
  handle(i, r, s, a, l) {
    return (
      i.forEach((d) => {
        var f;
        r =
          ((f = this.processors[d]) == null ? void 0 : f.process(r, s, a, l)) ??
          r;
      }),
      r
    );
  },
};
const Dd = {};
class js extends As {
  constructor(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(),
      Sv(
        [
          "resourceStore",
          "languageUtils",
          "pluralResolver",
          "interpolator",
          "backendConnector",
          "i18nFormat",
          "utils",
        ],
        r,
        this,
      ),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      (this.logger = jt.create("translator"));
  }
  changeLanguage(r) {
    r && (this.language = r);
  }
  exists(r) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} };
    if (r == null) return !1;
    const a = this.resolve(r, s);
    return (a == null ? void 0 : a.res) !== void 0;
  }
  extractFromKey(r, s) {
    let a = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    a === void 0 && (a = ":");
    const l =
      s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
    let d = s.ns || this.options.defaultNS || [];
    const f = a && r.indexOf(a) > -1,
      m =
        !this.options.userDefinedKeySeparator &&
        !s.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !s.nsSeparator &&
        !Lv(r, a, l);
    if (f && !m) {
      const h = r.match(this.interpolator.nestingRegexp);
      if (h && h.length > 0) return { key: r, namespaces: ee(d) ? [d] : d };
      const g = r.split(a);
      (a !== l || (a === l && this.options.ns.indexOf(g[0]) > -1)) &&
        (d = g.shift()),
        (r = g.join(l));
    }
    return { key: r, namespaces: ee(d) ? [d] : d };
  }
  translate(r, s, a) {
    if (
      (typeof s != "object" &&
        this.options.overloadTranslationOptionHandler &&
        (s = this.options.overloadTranslationOptionHandler(arguments)),
      typeof s == "object" && (s = { ...s }),
      s || (s = {}),
      r == null)
    )
      return "";
    Array.isArray(r) || (r = [String(r)]);
    const l =
        s.returnDetails !== void 0
          ? s.returnDetails
          : this.options.returnDetails,
      d =
        s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator,
      { key: f, namespaces: m } = this.extractFromKey(r[r.length - 1], s),
      h = m[m.length - 1],
      g = s.lng || this.language,
      S = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((g == null ? void 0 : g.toLowerCase()) === "cimode") {
      if (S) {
        const W = s.nsSeparator || this.options.nsSeparator;
        return l
          ? {
              res: `${h}${W}${f}`,
              usedKey: f,
              exactUsedKey: f,
              usedLng: g,
              usedNS: h,
              usedParams: this.getUsedParamsDetails(s),
            }
          : `${h}${W}${f}`;
      }
      return l
        ? {
            res: f,
            usedKey: f,
            exactUsedKey: f,
            usedLng: g,
            usedNS: h,
            usedParams: this.getUsedParamsDetails(s),
          }
        : f;
    }
    const E = this.resolve(r, s);
    let x = E == null ? void 0 : E.res;
    const T = (E == null ? void 0 : E.usedKey) || f,
      I = (E == null ? void 0 : E.exactUsedKey) || f,
      L = Object.prototype.toString.apply(x),
      R = ["[object Number]", "[object Function]", "[object RegExp]"],
      M = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays,
      $ = !this.i18nFormat || this.i18nFormat.handleAsObject,
      G = !ee(x) && typeof x != "boolean" && typeof x != "number";
    if ($ && x && G && R.indexOf(L) < 0 && !(ee(M) && Array.isArray(x))) {
      if (!s.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            "accessing an object - but returnObjects options is not enabled!",
          );
        const W = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(T, x, { ...s, ns: m })
          : `key '${f} (${this.language})' returned an object instead of string.`;
        return l
          ? ((E.res = W), (E.usedParams = this.getUsedParamsDetails(s)), E)
          : W;
      }
      if (d) {
        const W = Array.isArray(x),
          te = W ? [] : {},
          le = W ? I : T;
        for (const Z in x)
          if (Object.prototype.hasOwnProperty.call(x, Z)) {
            const ne = `${le}${d}${Z}`;
            (te[Z] = this.translate(ne, { ...s, joinArrays: !1, ns: m })),
              te[Z] === ne && (te[Z] = x[Z]);
          }
        x = te;
      }
    } else if ($ && ee(M) && Array.isArray(x))
      (x = x.join(M)), x && (x = this.extendTranslation(x, r, s, a));
    else {
      let W = !1,
        te = !1;
      const le = s.count !== void 0 && !ee(s.count),
        Z = js.hasDefaultValue(s),
        ne = le ? this.pluralResolver.getSuffix(g, s.count, s) : "",
        re =
          s.ordinal && le
            ? this.pluralResolver.getSuffix(g, s.count, { ordinal: !1 })
            : "",
        ae = le && !s.ordinal && s.count === 0,
        me =
          (ae && s[`defaultValue${this.options.pluralSeparator}zero`]) ||
          s[`defaultValue${ne}`] ||
          s[`defaultValue${re}`] ||
          s.defaultValue;
      !this.isValidLookup(x) && Z && ((W = !0), (x = me)),
        this.isValidLookup(x) || ((te = !0), (x = f));
      const qe =
          (s.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          te
            ? void 0
            : x,
        Me = Z && me !== x && this.options.updateMissing;
      if (te || W || Me) {
        if (
          (this.logger.log(
            Me ? "updateKey" : "missingKey",
            g,
            h,
            f,
            Me ? me : x,
          ),
          d)
        ) {
          const F = this.resolve(f, { ...s, keySeparator: !1 });
          F &&
            F.res &&
            this.logger.warn(
              "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.",
            );
        }
        let Fe = [];
        const Pe = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          s.lng || this.language,
        );
        if (this.options.saveMissingTo === "fallback" && Pe && Pe[0])
          for (let F = 0; F < Pe.length; F++) Fe.push(Pe[F]);
        else
          this.options.saveMissingTo === "all"
            ? (Fe = this.languageUtils.toResolveHierarchy(
                s.lng || this.language,
              ))
            : Fe.push(s.lng || this.language);
        const ye = (F, Q, B) => {
          var _;
          const C = Z && B !== x ? B : qe;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(F, h, Q, C, Me, s)
            : (_ = this.backendConnector) != null &&
              _.saveMissing &&
              this.backendConnector.saveMissing(F, h, Q, C, Me, s),
            this.emit("missingKey", F, h, Q, x);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && le
            ? Fe.forEach((F) => {
                const Q = this.pluralResolver.getSuffixes(F, s);
                ae &&
                  s[`defaultValue${this.options.pluralSeparator}zero`] &&
                  Q.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  Q.push(`${this.options.pluralSeparator}zero`),
                  Q.forEach((B) => {
                    ye([F], f + B, s[`defaultValue${B}`] || me);
                  });
              })
            : ye(Fe, f, me));
      }
      (x = this.extendTranslation(x, r, s, E, a)),
        te &&
          x === f &&
          this.options.appendNamespaceToMissingKey &&
          (x = `${h}:${f}`),
        (te || W) &&
          this.options.parseMissingKeyHandler &&
          (x = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${h}:${f}` : f,
            W ? x : void 0,
          ));
    }
    return l
      ? ((E.res = x), (E.usedParams = this.getUsedParamsDetails(s)), E)
      : x;
  }
  extendTranslation(r, s, a, l, d) {
    var g, S;
    var f = this;
    if ((g = this.i18nFormat) != null && g.parse)
      r = this.i18nFormat.parse(
        r,
        { ...this.options.interpolation.defaultVariables, ...a },
        a.lng || this.language || l.usedLng,
        l.usedNS,
        l.usedKey,
        { resolved: l },
      );
    else if (!a.skipInterpolation) {
      a.interpolation &&
        this.interpolator.init({
          ...a,
          interpolation: { ...this.options.interpolation, ...a.interpolation },
        });
      const E =
        ee(r) &&
        (((S = a == null ? void 0 : a.interpolation) == null
          ? void 0
          : S.skipOnVariables) !== void 0
          ? a.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let x;
      if (E) {
        const I = r.match(this.interpolator.nestingRegexp);
        x = I && I.length;
      }
      let T = a.replace && !ee(a.replace) ? a.replace : a;
      if (
        (this.options.interpolation.defaultVariables &&
          (T = { ...this.options.interpolation.defaultVariables, ...T }),
        (r = this.interpolator.interpolate(
          r,
          T,
          a.lng || this.language || l.usedLng,
          a,
        )),
        E)
      ) {
        const I = r.match(this.interpolator.nestingRegexp),
          L = I && I.length;
        x < L && (a.nest = !1);
      }
      !a.lng && l && l.res && (a.lng = this.language || l.usedLng),
        a.nest !== !1 &&
          (r = this.interpolator.nest(
            r,
            function () {
              for (
                var I = arguments.length, L = new Array(I), R = 0;
                R < I;
                R++
              )
                L[R] = arguments[R];
              return (d == null ? void 0 : d[0]) === L[0] && !a.context
                ? (f.logger.warn(
                    `It seems you are nesting recursively key: ${L[0]} in key: ${s[0]}`,
                  ),
                  null)
                : f.translate(...L, s);
            },
            a,
          )),
        a.interpolation && this.interpolator.reset();
    }
    const m = a.postProcess || this.options.postProcess,
      h = ee(m) ? [m] : m;
    return (
      r != null &&
        h != null &&
        h.length &&
        a.applyPostProcessor !== !1 &&
        (r = Rf.handle(
          h,
          r,
          s,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...l,
                  usedParams: this.getUsedParamsDetails(a),
                },
                ...a,
              }
            : a,
          this,
        )),
      r
    );
  }
  resolve(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a,
      l,
      d,
      f,
      m;
    return (
      ee(r) && (r = [r]),
      r.forEach((h) => {
        if (this.isValidLookup(a)) return;
        const g = this.extractFromKey(h, s),
          S = g.key;
        l = S;
        let E = g.namespaces;
        this.options.fallbackNS && (E = E.concat(this.options.fallbackNS));
        const x = s.count !== void 0 && !ee(s.count),
          T = x && !s.ordinal && s.count === 0,
          I =
            s.context !== void 0 &&
            (ee(s.context) || typeof s.context == "number") &&
            s.context !== "",
          L = s.lngs
            ? s.lngs
            : this.languageUtils.toResolveHierarchy(
                s.lng || this.language,
                s.fallbackLng,
              );
        E.forEach((R) => {
          var M, $;
          this.isValidLookup(a) ||
            ((m = R),
            !Dd[`${L[0]}-${R}`] &&
              (M = this.utils) != null &&
              M.hasLoadedNamespace &&
              !(($ = this.utils) != null && $.hasLoadedNamespace(m)) &&
              ((Dd[`${L[0]}-${R}`] = !0),
              this.logger.warn(
                `key "${l}" for languages "${L.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`,
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!",
              )),
            L.forEach((G) => {
              var le;
              if (this.isValidLookup(a)) return;
              f = G;
              const W = [S];
              if ((le = this.i18nFormat) != null && le.addLookupKeys)
                this.i18nFormat.addLookupKeys(W, S, G, R, s);
              else {
                let Z;
                x && (Z = this.pluralResolver.getSuffix(G, s.count, s));
                const ne = `${this.options.pluralSeparator}zero`,
                  re = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (x &&
                    (W.push(S + Z),
                    s.ordinal &&
                      Z.indexOf(re) === 0 &&
                      W.push(S + Z.replace(re, this.options.pluralSeparator)),
                    T && W.push(S + ne)),
                  I)
                ) {
                  const ae = `${S}${this.options.contextSeparator}${s.context}`;
                  W.push(ae),
                    x &&
                      (W.push(ae + Z),
                      s.ordinal &&
                        Z.indexOf(re) === 0 &&
                        W.push(
                          ae + Z.replace(re, this.options.pluralSeparator),
                        ),
                      T && W.push(ae + ne));
                }
              }
              let te;
              for (; (te = W.pop()); )
                this.isValidLookup(a) ||
                  ((d = te), (a = this.getResource(G, R, te, s)));
            }));
        });
      }),
      { res: a, usedKey: l, exactUsedKey: d, usedLng: f, usedNS: m }
    );
  }
  isValidLookup(r) {
    return (
      r !== void 0 &&
      !(!this.options.returnNull && r === null) &&
      !(!this.options.returnEmptyString && r === "")
    );
  }
  getResource(r, s, a) {
    var d;
    let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return (d = this.i18nFormat) != null && d.getResource
      ? this.i18nFormat.getResource(r, s, a, l)
      : this.resourceStore.getResource(r, s, a, l);
  }
  getUsedParamsDetails() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const s = [
        "defaultValue",
        "ordinal",
        "context",
        "replace",
        "lng",
        "lngs",
        "fallbackLng",
        "ns",
        "keySeparator",
        "nsSeparator",
        "returnObjects",
        "returnDetails",
        "joinArrays",
        "postProcess",
        "interpolation",
      ],
      a = r.replace && !ee(r.replace);
    let l = a ? r.replace : r;
    if (
      (a && typeof r.count < "u" && (l.count = r.count),
      this.options.interpolation.defaultVariables &&
        (l = { ...this.options.interpolation.defaultVariables, ...l }),
      !a)
    ) {
      l = { ...l };
      for (const d of s) delete l[d];
    }
    return l;
  }
  static hasDefaultValue(r) {
    const s = "defaultValue";
    for (const a in r)
      if (
        Object.prototype.hasOwnProperty.call(r, a) &&
        s === a.substring(0, s.length) &&
        r[a] !== void 0
      )
        return !0;
    return !1;
  }
}
class Md {
  constructor(r) {
    (this.options = r),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = jt.create("languageUtils"));
  }
  getScriptPartFromCode(r) {
    if (((r = Is(r)), !r || r.indexOf("-") < 0)) return null;
    const s = r.split("-");
    return s.length === 2 || (s.pop(), s[s.length - 1].toLowerCase() === "x")
      ? null
      : this.formatLanguageCode(s.join("-"));
  }
  getLanguagePartFromCode(r) {
    if (((r = Is(r)), !r || r.indexOf("-") < 0)) return r;
    const s = r.split("-");
    return this.formatLanguageCode(s[0]);
  }
  formatLanguageCode(r) {
    if (ee(r) && r.indexOf("-") > -1) {
      let s;
      try {
        s = Intl.getCanonicalLocales(r)[0];
      } catch {}
      return (
        s && this.options.lowerCaseLng && (s = s.toLowerCase()),
        s || (this.options.lowerCaseLng ? r.toLowerCase() : r)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? r.toLowerCase()
      : r;
  }
  isSupportedCode(r) {
    return (
      (this.options.load === "languageOnly" ||
        this.options.nonExplicitSupportedLngs) &&
        (r = this.getLanguagePartFromCode(r)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(r) > -1
    );
  }
  getBestMatchFromCodes(r) {
    if (!r) return null;
    let s;
    return (
      r.forEach((a) => {
        if (s) return;
        const l = this.formatLanguageCode(a);
        (!this.options.supportedLngs || this.isSupportedCode(l)) && (s = l);
      }),
      !s &&
        this.options.supportedLngs &&
        r.forEach((a) => {
          if (s) return;
          const l = this.getLanguagePartFromCode(a);
          if (this.isSupportedCode(l)) return (s = l);
          s = this.options.supportedLngs.find((d) => {
            if (d === l) return d;
            if (
              !(d.indexOf("-") < 0 && l.indexOf("-") < 0) &&
              ((d.indexOf("-") > 0 &&
                l.indexOf("-") < 0 &&
                d.substring(0, d.indexOf("-")) === l) ||
                (d.indexOf(l) === 0 && l.length > 1))
            )
              return d;
          });
        }),
      s || (s = this.getFallbackCodes(this.options.fallbackLng)[0]),
      s
    );
  }
  getFallbackCodes(r, s) {
    if (!r) return [];
    if (
      (typeof r == "function" && (r = r(s)),
      ee(r) && (r = [r]),
      Array.isArray(r))
    )
      return r;
    if (!s) return r.default || [];
    let a = r[s];
    return (
      a || (a = r[this.getScriptPartFromCode(s)]),
      a || (a = r[this.formatLanguageCode(s)]),
      a || (a = r[this.getLanguagePartFromCode(s)]),
      a || (a = r.default),
      a || []
    );
  }
  toResolveHierarchy(r, s) {
    const a = this.getFallbackCodes(s || this.options.fallbackLng || [], r),
      l = [],
      d = (f) => {
        f &&
          (this.isSupportedCode(f)
            ? l.push(f)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${f}`,
              ));
      };
    return (
      ee(r) && (r.indexOf("-") > -1 || r.indexOf("_") > -1)
        ? (this.options.load !== "languageOnly" &&
            d(this.formatLanguageCode(r)),
          this.options.load !== "languageOnly" &&
            this.options.load !== "currentOnly" &&
            d(this.getScriptPartFromCode(r)),
          this.options.load !== "currentOnly" &&
            d(this.getLanguagePartFromCode(r)))
        : ee(r) && d(this.formatLanguageCode(r)),
      a.forEach((f) => {
        l.indexOf(f) < 0 && d(this.formatLanguageCode(f));
      }),
      l
    );
  }
}
const zd = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  $d = {
    select: (i) => (i === 1 ? "one" : "other"),
    resolvedOptions: () => ({ pluralCategories: ["one", "other"] }),
  };
class _v {
  constructor(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.languageUtils = r),
      (this.options = s),
      (this.logger = jt.create("pluralResolver")),
      (this.pluralRulesCache = {});
  }
  addRule(r, s) {
    this.rules[r] = s;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const a = Is(r === "dev" ? "en" : r),
      l = s.ordinal ? "ordinal" : "cardinal",
      d = JSON.stringify({ cleanedCode: a, type: l });
    if (d in this.pluralRulesCache) return this.pluralRulesCache[d];
    let f;
    try {
      f = new Intl.PluralRules(a, { type: l });
    } catch {
      if (!Intl)
        return (
          this.logger.error("No Intl support, please use an Intl polyfill!"), $d
        );
      if (!r.match(/-|_/)) return $d;
      const h = this.languageUtils.getLanguagePartFromCode(r);
      f = this.getRule(h, s);
    }
    return (this.pluralRulesCache[d] = f), f;
  }
  needsPlural(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a = this.getRule(r, s);
    return (
      a || (a = this.getRule("dev", s)),
      (a == null ? void 0 : a.resolvedOptions().pluralCategories.length) > 1
    );
  }
  getPluralFormsOfKey(r, s) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(r, a).map((l) => `${s}${l}`);
  }
  getSuffixes(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a = this.getRule(r, s);
    return (
      a || (a = this.getRule("dev", s)),
      a
        ? a
            .resolvedOptions()
            .pluralCategories.sort((l, d) => zd[l] - zd[d])
            .map(
              (l) =>
                `${this.options.prepend}${s.ordinal ? `ordinal${this.options.prepend}` : ""}${l}`,
            )
        : []
    );
  }
  getSuffix(r, s) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const l = this.getRule(r, a);
    return l
      ? `${this.options.prepend}${a.ordinal ? `ordinal${this.options.prepend}` : ""}${l.select(s)}`
      : (this.logger.warn(`no plural rule found for: ${r}`),
        this.getSuffix("dev", s, a));
  }
}
const Fd = function (i, r, s) {
    let a =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".",
      l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0,
      d = Cv(i, r, s);
    return (
      !d &&
        l &&
        ee(s) &&
        ((d = el(i, s, a)), d === void 0 && (d = el(r, s, a))),
      d
    );
  },
  Ba = (i) => i.replace(/\$/g, "$$$$");
class Ov {
  constructor() {
    var s;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = jt.create("interpolator")),
      (this.options = r),
      (this.format =
        ((s = r == null ? void 0 : r.interpolation) == null
          ? void 0
          : s.format) || ((a) => a)),
      this.init(r);
  }
  init() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    r.interpolation || (r.interpolation = { escapeValue: !0 });
    const {
      escape: s,
      escapeValue: a,
      useRawValueToEscape: l,
      prefix: d,
      prefixEscaped: f,
      suffix: m,
      suffixEscaped: h,
      formatSeparator: g,
      unescapeSuffix: S,
      unescapePrefix: E,
      nestingPrefix: x,
      nestingPrefixEscaped: T,
      nestingSuffix: I,
      nestingSuffixEscaped: L,
      nestingOptionsSeparator: R,
      maxReplaces: M,
      alwaysFormat: $,
    } = r.interpolation;
    (this.escape = s !== void 0 ? s : bv),
      (this.escapeValue = a !== void 0 ? a : !0),
      (this.useRawValueToEscape = l !== void 0 ? l : !1),
      (this.prefix = d ? or(d) : f || "{{"),
      (this.suffix = m ? or(m) : h || "}}"),
      (this.formatSeparator = g || ","),
      (this.unescapePrefix = S ? "" : E || "-"),
      (this.unescapeSuffix = this.unescapePrefix ? "" : S || ""),
      (this.nestingPrefix = x ? or(x) : T || or("$t(")),
      (this.nestingSuffix = I ? or(I) : L || or(")")),
      (this.nestingOptionsSeparator = R || ","),
      (this.maxReplaces = M || 1e3),
      (this.alwaysFormat = $ !== void 0 ? $ : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const r = (s, a) =>
      (s == null ? void 0 : s.source) === a
        ? ((s.lastIndex = 0), s)
        : new RegExp(a, "g");
    (this.regexp = r(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = r(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`,
      )),
      (this.nestingRegexp = r(
        this.nestingRegexp,
        `${this.nestingPrefix}(.+?)${this.nestingSuffix}`,
      ));
  }
  interpolate(r, s, a, l) {
    var T;
    let d, f, m;
    const h =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      g = (I) => {
        if (I.indexOf(this.formatSeparator) < 0) {
          const $ = Fd(
            s,
            h,
            I,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          );
          return this.alwaysFormat
            ? this.format($, void 0, a, { ...l, ...s, interpolationkey: I })
            : $;
        }
        const L = I.split(this.formatSeparator),
          R = L.shift().trim(),
          M = L.join(this.formatSeparator).trim();
        return this.format(
          Fd(
            s,
            h,
            R,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          ),
          M,
          a,
          { ...l, ...s, interpolationkey: R },
        );
      };
    this.resetRegExp();
    const S =
        (l == null ? void 0 : l.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      E =
        ((T = l == null ? void 0 : l.interpolation) == null
          ? void 0
          : T.skipOnVariables) !== void 0
          ? l.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (I) => Ba(I) },
        {
          regex: this.regexp,
          safeValue: (I) => (this.escapeValue ? Ba(this.escape(I)) : Ba(I)),
        },
      ].forEach((I) => {
        for (m = 0; (d = I.regex.exec(r)); ) {
          const L = d[1].trim();
          if (((f = g(L)), f === void 0))
            if (typeof S == "function") {
              const M = S(r, d, l);
              f = ee(M) ? M : "";
            } else if (l && Object.prototype.hasOwnProperty.call(l, L)) f = "";
            else if (E) {
              f = d[0];
              continue;
            } else
              this.logger.warn(
                `missed to pass in variable ${L} for interpolating ${r}`,
              ),
                (f = "");
          else !ee(f) && !this.useRawValueToEscape && (f = Pd(f));
          const R = I.safeValue(f);
          if (
            ((r = r.replace(d[0], R)),
            E
              ? ((I.regex.lastIndex += f.length),
                (I.regex.lastIndex -= d[0].length))
              : (I.regex.lastIndex = 0),
            m++,
            m >= this.maxReplaces)
          )
            break;
        }
      }),
      r
    );
  }
  nest(r, s) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      l,
      d,
      f;
    const m = (h, g) => {
      const S = this.nestingOptionsSeparator;
      if (h.indexOf(S) < 0) return h;
      const E = h.split(new RegExp(`${S}[ ]*{`));
      let x = `{${E[1]}`;
      (h = E[0]), (x = this.interpolate(x, f));
      const T = x.match(/'/g),
        I = x.match(/"/g);
      ((((T == null ? void 0 : T.length) ?? 0) % 2 === 0 && !I) ||
        I.length % 2 !== 0) &&
        (x = x.replace(/'/g, '"'));
      try {
        (f = JSON.parse(x)), g && (f = { ...g, ...f });
      } catch (L) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${h}`,
            L,
          ),
          `${h}${S}${x}`
        );
      }
      return (
        f.defaultValue &&
          f.defaultValue.indexOf(this.prefix) > -1 &&
          delete f.defaultValue,
        h
      );
    };
    for (; (l = this.nestingRegexp.exec(r)); ) {
      let h = [];
      (f = { ...a }),
        (f = f.replace && !ee(f.replace) ? f.replace : f),
        (f.applyPostProcessor = !1),
        delete f.defaultValue;
      let g = !1;
      if (l[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(l[1])) {
        const S = l[1].split(this.formatSeparator).map((E) => E.trim());
        (l[1] = S.shift()), (h = S), (g = !0);
      }
      if (((d = s(m.call(this, l[1].trim(), f), f)), d && l[0] === r && !ee(d)))
        return d;
      ee(d) || (d = Pd(d)),
        d ||
          (this.logger.warn(`missed to resolve ${l[1]} for nesting ${r}`),
          (d = "")),
        g &&
          (d = h.reduce(
            (S, E) =>
              this.format(S, E, a.lng, { ...a, interpolationkey: l[1].trim() }),
            d.trim(),
          )),
        (r = r.replace(l[0], d)),
        (this.regexp.lastIndex = 0);
    }
    return r;
  }
}
const Av = (i) => {
    let r = i.toLowerCase().trim();
    const s = {};
    if (i.indexOf("(") > -1) {
      const a = i.split("(");
      r = a[0].toLowerCase().trim();
      const l = a[1].substring(0, a[1].length - 1);
      r === "currency" && l.indexOf(":") < 0
        ? s.currency || (s.currency = l.trim())
        : r === "relativetime" && l.indexOf(":") < 0
          ? s.range || (s.range = l.trim())
          : l.split(";").forEach((f) => {
              if (f) {
                const [m, ...h] = f.split(":"),
                  g = h
                    .join(":")
                    .trim()
                    .replace(/^'+|'+$/g, ""),
                  S = m.trim();
                s[S] || (s[S] = g),
                  g === "false" && (s[S] = !1),
                  g === "true" && (s[S] = !0),
                  isNaN(g) || (s[S] = parseInt(g, 10));
              }
            });
    }
    return { formatName: r, formatOptions: s };
  },
  ar = (i) => {
    const r = {};
    return (s, a, l) => {
      let d = l;
      l &&
        l.interpolationkey &&
        l.formatParams &&
        l.formatParams[l.interpolationkey] &&
        l[l.interpolationkey] &&
        (d = { ...d, [l.interpolationkey]: void 0 });
      const f = a + JSON.stringify(d);
      let m = r[f];
      return m || ((m = i(Is(a), l)), (r[f] = m)), m(s);
    };
  };
class Dv {
  constructor() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = jt.create("formatter")),
      (this.options = r),
      (this.formats = {
        number: ar((s, a) => {
          const l = new Intl.NumberFormat(s, { ...a });
          return (d) => l.format(d);
        }),
        currency: ar((s, a) => {
          const l = new Intl.NumberFormat(s, { ...a, style: "currency" });
          return (d) => l.format(d);
        }),
        datetime: ar((s, a) => {
          const l = new Intl.DateTimeFormat(s, { ...a });
          return (d) => l.format(d);
        }),
        relativetime: ar((s, a) => {
          const l = new Intl.RelativeTimeFormat(s, { ...a });
          return (d) => l.format(d, a.range || "day");
        }),
        list: ar((s, a) => {
          const l = new Intl.ListFormat(s, { ...a });
          return (d) => l.format(d);
        }),
      }),
      this.init(r);
  }
  init(r) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} };
    this.formatSeparator = s.interpolation.formatSeparator || ",";
  }
  add(r, s) {
    this.formats[r.toLowerCase().trim()] = s;
  }
  addCached(r, s) {
    this.formats[r.toLowerCase().trim()] = ar(s);
  }
  format(r, s, a) {
    let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const d = s.split(this.formatSeparator);
    if (
      d.length > 1 &&
      d[0].indexOf("(") > 1 &&
      d[0].indexOf(")") < 0 &&
      d.find((m) => m.indexOf(")") > -1)
    ) {
      const m = d.findIndex((h) => h.indexOf(")") > -1);
      d[0] = [d[0], ...d.splice(1, m)].join(this.formatSeparator);
    }
    return d.reduce((m, h) => {
      var E;
      const { formatName: g, formatOptions: S } = Av(h);
      if (this.formats[g]) {
        let x = m;
        try {
          const T =
              ((E = l == null ? void 0 : l.formatParams) == null
                ? void 0
                : E[l.interpolationkey]) || {},
            I = T.locale || T.lng || l.locale || l.lng || a;
          x = this.formats[g](m, I, { ...S, ...l, ...T });
        } catch (T) {
          this.logger.warn(T);
        }
        return x;
      } else this.logger.warn(`there was no format function for ${g}`);
      return m;
    }, r);
  }
}
const Mv = (i, r) => {
  i.pending[r] !== void 0 && (delete i.pending[r], i.pendingCount--);
};
class zv extends As {
  constructor(r, s, a) {
    var d, f;
    let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(),
      (this.backend = r),
      (this.store = s),
      (this.services = a),
      (this.languageUtils = a.languageUtils),
      (this.options = l),
      (this.logger = jt.create("backendConnector")),
      (this.waitingReads = []),
      (this.maxParallelReads = l.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = l.maxRetries >= 0 ? l.maxRetries : 5),
      (this.retryTimeout = l.retryTimeout >= 1 ? l.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      (f = (d = this.backend) == null ? void 0 : d.init) == null ||
        f.call(d, a, l.backend, l);
  }
  queueLoad(r, s, a, l) {
    const d = {},
      f = {},
      m = {},
      h = {};
    return (
      r.forEach((g) => {
        let S = !0;
        s.forEach((E) => {
          const x = `${g}|${E}`;
          !a.reload && this.store.hasResourceBundle(g, E)
            ? (this.state[x] = 2)
            : this.state[x] < 0 ||
              (this.state[x] === 1
                ? f[x] === void 0 && (f[x] = !0)
                : ((this.state[x] = 1),
                  (S = !1),
                  f[x] === void 0 && (f[x] = !0),
                  d[x] === void 0 && (d[x] = !0),
                  h[E] === void 0 && (h[E] = !0)));
        }),
          S || (m[g] = !0);
      }),
      (Object.keys(d).length || Object.keys(f).length) &&
        this.queue.push({
          pending: f,
          pendingCount: Object.keys(f).length,
          loaded: {},
          errors: [],
          callback: l,
        }),
      {
        toLoad: Object.keys(d),
        pending: Object.keys(f),
        toLoadLanguages: Object.keys(m),
        toLoadNamespaces: Object.keys(h),
      }
    );
  }
  loaded(r, s, a) {
    const l = r.split("|"),
      d = l[0],
      f = l[1];
    s && this.emit("failedLoading", d, f, s),
      !s &&
        a &&
        this.store.addResourceBundle(d, f, a, void 0, void 0, { skipCopy: !0 }),
      (this.state[r] = s ? -1 : 2),
      s && a && (this.state[r] = 0);
    const m = {};
    this.queue.forEach((h) => {
      Ev(h.loaded, [d], f),
        Mv(h, r),
        s && h.errors.push(s),
        h.pendingCount === 0 &&
          !h.done &&
          (Object.keys(h.loaded).forEach((g) => {
            m[g] || (m[g] = {});
            const S = h.loaded[g];
            S.length &&
              S.forEach((E) => {
                m[g][E] === void 0 && (m[g][E] = !0);
              });
          }),
          (h.done = !0),
          h.errors.length ? h.callback(h.errors) : h.callback());
    }),
      this.emit("loaded", m),
      (this.queue = this.queue.filter((h) => !h.done));
  }
  read(r, s, a) {
    let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
      d =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : this.retryTimeout,
      f = arguments.length > 5 ? arguments[5] : void 0;
    if (!r.length) return f(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: r,
        ns: s,
        fcName: a,
        tried: l,
        wait: d,
        callback: f,
      });
      return;
    }
    this.readingCalls++;
    const m = (g, S) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const E = this.waitingReads.shift();
          this.read(E.lng, E.ns, E.fcName, E.tried, E.wait, E.callback);
        }
        if (g && S && l < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, r, s, a, l + 1, d * 2, f);
          }, d);
          return;
        }
        f(g, S);
      },
      h = this.backend[a].bind(this.backend);
    if (h.length === 2) {
      try {
        const g = h(r, s);
        g && typeof g.then == "function"
          ? g.then((S) => m(null, S)).catch(m)
          : m(null, g);
      } catch (g) {
        m(g);
      }
      return;
    }
    return h(r, s, m);
  }
  prepareLoading(r, s) {
    let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      l = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return (
        this.logger.warn(
          "No backend was added via i18next.use. Will not load resources.",
        ),
        l && l()
      );
    ee(r) && (r = this.languageUtils.toResolveHierarchy(r)), ee(s) && (s = [s]);
    const d = this.queueLoad(r, s, a, l);
    if (!d.toLoad.length) return d.pending.length || l(), null;
    d.toLoad.forEach((f) => {
      this.loadOne(f);
    });
  }
  load(r, s, a) {
    this.prepareLoading(r, s, {}, a);
  }
  reload(r, s, a) {
    this.prepareLoading(r, s, { reload: !0 }, a);
  }
  loadOne(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const a = r.split("|"),
      l = a[0],
      d = a[1];
    this.read(l, d, "read", void 0, void 0, (f, m) => {
      f &&
        this.logger.warn(
          `${s}loading namespace ${d} for language ${l} failed`,
          f,
        ),
        !f &&
          m &&
          this.logger.log(`${s}loaded namespace ${d} for language ${l}`, m),
        this.loaded(r, f, m);
    });
  }
  saveMissing(r, s, a, l, d) {
    var h, g, S, E, x;
    let f = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
      m =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : () => {};
    if (
      (g = (h = this.services) == null ? void 0 : h.utils) != null &&
      g.hasLoadedNamespace &&
      !(
        (E = (S = this.services) == null ? void 0 : S.utils) != null &&
        E.hasLoadedNamespace(s)
      )
    ) {
      this.logger.warn(
        `did not save key "${a}" as the namespace "${s}" was not yet loaded`,
        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!",
      );
      return;
    }
    if (!(a == null || a === "")) {
      if ((x = this.backend) != null && x.create) {
        const T = { ...f, isUpdate: d },
          I = this.backend.create.bind(this.backend);
        if (I.length < 6)
          try {
            let L;
            I.length === 5 ? (L = I(r, s, a, l, T)) : (L = I(r, s, a, l)),
              L && typeof L.then == "function"
                ? L.then((R) => m(null, R)).catch(m)
                : m(null, L);
          } catch (L) {
            m(L);
          }
        else I(r, s, a, l, m, T);
      }
      !r || !r[0] || this.store.addResource(r[0], s, a, l);
    }
  }
}
const Bd = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (i) => {
      let r = {};
      if (
        (typeof i[1] == "object" && (r = i[1]),
        ee(i[1]) && (r.defaultValue = i[1]),
        ee(i[2]) && (r.tDescription = i[2]),
        typeof i[2] == "object" || typeof i[3] == "object")
      ) {
        const s = i[3] || i[2];
        Object.keys(s).forEach((a) => {
          r[a] = s[a];
        });
      }
      return r;
    },
    interpolation: {
      escapeValue: !0,
      format: (i) => i,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
  }),
  Ud = (i) => {
    var r, s;
    return (
      ee(i.ns) && (i.ns = [i.ns]),
      ee(i.fallbackLng) && (i.fallbackLng = [i.fallbackLng]),
      ee(i.fallbackNS) && (i.fallbackNS = [i.fallbackNS]),
      ((s = (r = i.supportedLngs) == null ? void 0 : r.indexOf) == null
        ? void 0
        : s.call(r, "cimode")) < 0 &&
        (i.supportedLngs = i.supportedLngs.concat(["cimode"])),
      typeof i.initImmediate == "boolean" && (i.initAsync = i.initImmediate),
      i
    );
  },
  ks = () => {},
  $v = (i) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(i)).forEach((s) => {
      typeof i[s] == "function" && (i[s] = i[s].bind(i));
    });
  };
class si extends As {
  constructor() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      s = arguments.length > 1 ? arguments[1] : void 0;
    if (
      (super(),
      (this.options = Ud(r)),
      (this.services = {}),
      (this.logger = jt),
      (this.modules = { external: [] }),
      $v(this),
      s && !this.isInitialized && !r.isClone)
    ) {
      if (!this.options.initAsync) return this.init(r, s), this;
      setTimeout(() => {
        this.init(r, s);
      }, 0);
    }
  }
  init() {
    var r = this;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      a = arguments.length > 1 ? arguments[1] : void 0;
    (this.isInitializing = !0),
      typeof s == "function" && ((a = s), (s = {})),
      !s.defaultNS &&
        s.defaultNS !== !1 &&
        s.ns &&
        (ee(s.ns)
          ? (s.defaultNS = s.ns)
          : s.ns.indexOf("translation") < 0 && (s.defaultNS = s.ns[0]));
    const l = Bd();
    (this.options = { ...l, ...this.options, ...Ud(s) }),
      (this.options.interpolation = {
        ...l.interpolation,
        ...this.options.interpolation,
      }),
      s.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = s.keySeparator),
      s.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = s.nsSeparator);
    const d = (S) => (S ? (typeof S == "function" ? new S() : S) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? jt.init(d(this.modules.logger), this.options)
        : jt.init(null, this.options);
      let S;
      this.modules.formatter ? (S = this.modules.formatter) : (S = Dv);
      const E = new Md(this.options);
      this.store = new Ad(this.options.resources, this.options);
      const x = this.services;
      (x.logger = jt),
        (x.resourceStore = this.store),
        (x.languageUtils = E),
        (x.pluralResolver = new _v(E, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        S &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === l.interpolation.format) &&
          ((x.formatter = d(S)),
          x.formatter.init(x, this.options),
          (this.options.interpolation.format = x.formatter.format.bind(
            x.formatter,
          ))),
        (x.interpolator = new Ov(this.options)),
        (x.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (x.backendConnector = new zv(
          d(this.modules.backend),
          x.resourceStore,
          x,
          this.options,
        )),
        x.backendConnector.on("*", function (T) {
          for (
            var I = arguments.length, L = new Array(I > 1 ? I - 1 : 0), R = 1;
            R < I;
            R++
          )
            L[R - 1] = arguments[R];
          r.emit(T, ...L);
        }),
        this.modules.languageDetector &&
          ((x.languageDetector = d(this.modules.languageDetector)),
          x.languageDetector.init &&
            x.languageDetector.init(x, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((x.i18nFormat = d(this.modules.i18nFormat)),
          x.i18nFormat.init && x.i18nFormat.init(this)),
        (this.translator = new js(this.services, this.options)),
        this.translator.on("*", function (T) {
          for (
            var I = arguments.length, L = new Array(I > 1 ? I - 1 : 0), R = 1;
            R < I;
            R++
          )
            L[R - 1] = arguments[R];
          r.emit(T, ...L);
        }),
        this.modules.external.forEach((T) => {
          T.init && T.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      a || (a = ks),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const S = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng,
      );
      S.length > 0 && S[0] !== "dev" && (this.options.lng = S[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        "init: no languageDetector is used and no lng is defined",
      ),
      [
        "getResource",
        "hasResourceBundle",
        "getResourceBundle",
        "getDataByLanguage",
      ].forEach((S) => {
        this[S] = function () {
          return r.store[S](...arguments);
        };
      }),
      [
        "addResource",
        "addResources",
        "addResourceBundle",
        "removeResourceBundle",
      ].forEach((S) => {
        this[S] = function () {
          return r.store[S](...arguments), r;
        };
      });
    const h = Zr(),
      g = () => {
        const S = (E, x) => {
          (this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                "init: i18next is already initialized. You should call init just once!",
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log("initialized", this.options),
            this.emit("initialized", this.options),
            h.resolve(x),
            a(E, x);
        };
        if (this.languages && !this.isInitialized)
          return S(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, S);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? g()
        : setTimeout(g, 0),
      h
    );
  }
  loadResources(r) {
    var d, f;
    let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ks;
    const l = ee(r) ? r : this.language;
    if (
      (typeof r == "function" && (a = r),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        (l == null ? void 0 : l.toLowerCase()) === "cimode" &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return a();
      const m = [],
        h = (g) => {
          if (!g || g === "cimode") return;
          this.services.languageUtils.toResolveHierarchy(g).forEach((E) => {
            E !== "cimode" && m.indexOf(E) < 0 && m.push(E);
          });
        };
      l
        ? h(l)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((S) => h(S)),
        (f = (d = this.options.preload) == null ? void 0 : d.forEach) == null ||
          f.call(d, (g) => h(g)),
        this.services.backendConnector.load(m, this.options.ns, (g) => {
          !g &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            a(g);
        });
    } else a(null);
  }
  reloadResources(r, s, a) {
    const l = Zr();
    return (
      typeof r == "function" && ((a = r), (r = void 0)),
      typeof s == "function" && ((a = s), (s = void 0)),
      r || (r = this.languages),
      s || (s = this.options.ns),
      a || (a = ks),
      this.services.backendConnector.reload(r, s, (d) => {
        l.resolve(), a(d);
      }),
      l
    );
  }
  use(r) {
    if (!r)
      throw new Error(
        "You are passing an undefined module! Please check the object you are passing to i18next.use()",
      );
    if (!r.type)
      throw new Error(
        "You are passing a wrong module! Please check the object you are passing to i18next.use()",
      );
    return (
      r.type === "backend" && (this.modules.backend = r),
      (r.type === "logger" || (r.log && r.warn && r.error)) &&
        (this.modules.logger = r),
      r.type === "languageDetector" && (this.modules.languageDetector = r),
      r.type === "i18nFormat" && (this.modules.i18nFormat = r),
      r.type === "postProcessor" && Rf.addPostProcessor(r),
      r.type === "formatter" && (this.modules.formatter = r),
      r.type === "3rdParty" && this.modules.external.push(r),
      this
    );
  }
  setResolvedLanguage(r) {
    if (!(!r || !this.languages) && !(["cimode", "dev"].indexOf(r) > -1))
      for (let s = 0; s < this.languages.length; s++) {
        const a = this.languages[s];
        if (
          !(["cimode", "dev"].indexOf(a) > -1) &&
          this.store.hasLanguageSomeTranslations(a)
        ) {
          this.resolvedLanguage = a;
          break;
        }
      }
  }
  changeLanguage(r, s) {
    var a = this;
    this.isLanguageChangingTo = r;
    const l = Zr();
    this.emit("languageChanging", r);
    const d = (h) => {
        (this.language = h),
          (this.languages = this.services.languageUtils.toResolveHierarchy(h)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(h);
      },
      f = (h, g) => {
        g
          ? (d(g),
            this.translator.changeLanguage(g),
            (this.isLanguageChangingTo = void 0),
            this.emit("languageChanged", g),
            this.logger.log("languageChanged", g))
          : (this.isLanguageChangingTo = void 0),
          l.resolve(function () {
            return a.t(...arguments);
          }),
          s &&
            s(h, function () {
              return a.t(...arguments);
            });
      },
      m = (h) => {
        var S, E;
        !r && !h && this.services.languageDetector && (h = []);
        const g = ee(h)
          ? h
          : this.services.languageUtils.getBestMatchFromCodes(h);
        g &&
          (this.language || d(g),
          this.translator.language || this.translator.changeLanguage(g),
          (E =
            (S = this.services.languageDetector) == null
              ? void 0
              : S.cacheUserLanguage) == null || E.call(S, g)),
          this.loadResources(g, (x) => {
            f(x, g);
          });
      };
    return (
      !r &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? m(this.services.languageDetector.detect())
        : !r &&
            this.services.languageDetector &&
            this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(m)
            : this.services.languageDetector.detect(m)
          : m(r),
      l
    );
  }
  getFixedT(r, s, a) {
    var l = this;
    const d = function (f, m) {
      let h;
      if (typeof m != "object") {
        for (
          var g = arguments.length, S = new Array(g > 2 ? g - 2 : 0), E = 2;
          E < g;
          E++
        )
          S[E - 2] = arguments[E];
        h = l.options.overloadTranslationOptionHandler([f, m].concat(S));
      } else h = { ...m };
      (h.lng = h.lng || d.lng),
        (h.lngs = h.lngs || d.lngs),
        (h.ns = h.ns || d.ns),
        h.keyPrefix !== "" && (h.keyPrefix = h.keyPrefix || a || d.keyPrefix);
      const x = l.options.keySeparator || ".";
      let T;
      return (
        h.keyPrefix && Array.isArray(f)
          ? (T = f.map((I) => `${h.keyPrefix}${x}${I}`))
          : (T = h.keyPrefix ? `${h.keyPrefix}${x}${f}` : f),
        l.t(T, h)
      );
    };
    return ee(r) ? (d.lng = r) : (d.lngs = r), (d.ns = s), (d.keyPrefix = a), d;
  }
  t() {
    var l;
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return (l = this.translator) == null ? void 0 : l.translate(...s);
  }
  exists() {
    var l;
    for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
      s[a] = arguments[a];
    return (l = this.translator) == null ? void 0 : l.exists(...s);
  }
  setDefaultNamespace(r) {
    this.options.defaultNS = r;
  }
  hasLoadedNamespace(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18next was not initialized",
          this.languages,
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18n.languages were undefined or empty",
          this.languages,
        ),
        !1
      );
    const a = s.lng || this.resolvedLanguage || this.languages[0],
      l = this.options ? this.options.fallbackLng : !1,
      d = this.languages[this.languages.length - 1];
    if (a.toLowerCase() === "cimode") return !0;
    const f = (m, h) => {
      const g = this.services.backendConnector.state[`${m}|${h}`];
      return g === -1 || g === 0 || g === 2;
    };
    if (s.precheck) {
      const m = s.precheck(this, f);
      if (m !== void 0) return m;
    }
    return !!(
      this.hasResourceBundle(a, r) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (f(a, r) && (!l || f(d, r)))
    );
  }
  loadNamespaces(r, s) {
    const a = Zr();
    return this.options.ns
      ? (ee(r) && (r = [r]),
        r.forEach((l) => {
          this.options.ns.indexOf(l) < 0 && this.options.ns.push(l);
        }),
        this.loadResources((l) => {
          a.resolve(), s && s(l);
        }),
        a)
      : (s && s(), Promise.resolve());
  }
  loadLanguages(r, s) {
    const a = Zr();
    ee(r) && (r = [r]);
    const l = this.options.preload || [],
      d = r.filter(
        (f) =>
          l.indexOf(f) < 0 && this.services.languageUtils.isSupportedCode(f),
      );
    return d.length
      ? ((this.options.preload = l.concat(d)),
        this.loadResources((f) => {
          a.resolve(), s && s(f);
        }),
        a)
      : (s && s(), Promise.resolve());
  }
  dir(r) {
    var l, d;
    if (
      (r ||
        (r =
          this.resolvedLanguage ||
          (((l = this.languages) == null ? void 0 : l.length) > 0
            ? this.languages[0]
            : this.language)),
      !r)
    )
      return "rtl";
    const s = [
        "ar",
        "shu",
        "sqr",
        "ssh",
        "xaa",
        "yhd",
        "yud",
        "aao",
        "abh",
        "abv",
        "acm",
        "acq",
        "acw",
        "acx",
        "acy",
        "adf",
        "ads",
        "aeb",
        "aec",
        "afb",
        "ajp",
        "apc",
        "apd",
        "arb",
        "arq",
        "ars",
        "ary",
        "arz",
        "auz",
        "avl",
        "ayh",
        "ayl",
        "ayn",
        "ayp",
        "bbz",
        "pga",
        "he",
        "iw",
        "ps",
        "pbt",
        "pbu",
        "pst",
        "prp",
        "prd",
        "ug",
        "ur",
        "ydd",
        "yds",
        "yih",
        "ji",
        "yi",
        "hbo",
        "men",
        "xmn",
        "fa",
        "jpr",
        "peo",
        "pes",
        "prs",
        "dv",
        "sam",
        "ckb",
      ],
      a =
        ((d = this.services) == null ? void 0 : d.languageUtils) ||
        new Md(Bd());
    return s.indexOf(a.getLanguagePartFromCode(r)) > -1 ||
      r.toLowerCase().indexOf("-arab") > 1
      ? "rtl"
      : "ltr";
  }
  static createInstance() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      s = arguments.length > 1 ? arguments[1] : void 0;
    return new si(r, s);
  }
  cloneInstance() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ks;
    const a = r.forkResourceStore;
    a && delete r.forkResourceStore;
    const l = { ...this.options, ...r, isClone: !0 },
      d = new si(l);
    if (
      ((r.debug !== void 0 || r.prefix !== void 0) &&
        (d.logger = d.logger.clone(r)),
      ["store", "services", "language"].forEach((m) => {
        d[m] = this[m];
      }),
      (d.services = { ...this.services }),
      (d.services.utils = { hasLoadedNamespace: d.hasLoadedNamespace.bind(d) }),
      a)
    ) {
      const m = Object.keys(this.store.data).reduce(
        (h, g) => (
          (h[g] = { ...this.store.data[g] }),
          Object.keys(h[g]).reduce((S, E) => ((S[E] = { ...h[g][E] }), S), {})
        ),
        {},
      );
      (d.store = new Ad(m, l)), (d.services.resourceStore = d.store);
    }
    return (
      (d.translator = new js(d.services, l)),
      d.translator.on("*", function (m) {
        for (
          var h = arguments.length, g = new Array(h > 1 ? h - 1 : 0), S = 1;
          S < h;
          S++
        )
          g[S - 1] = arguments[S];
        d.emit(m, ...g);
      }),
      d.init(l, s),
      (d.translator.options = l),
      (d.translator.backendConnector.services.utils = {
        hasLoadedNamespace: d.hasLoadedNamespace.bind(d),
      }),
      d
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const We = si.createInstance();
We.createInstance = si.createInstance;
We.createInstance;
We.dir;
We.init;
We.loadResources;
We.reloadResources;
We.use;
We.changeLanguage;
We.getFixedT;
We.t;
We.exists;
We.setDefaultNamespace;
We.hasLoadedNamespace;
We.loadNamespaces;
We.loadLanguages;
const { slice: Fv, forEach: Bv } = [];
function Uv(i) {
  return (
    Bv.call(Fv.call(arguments, 1), (r) => {
      if (r) for (const s in r) i[s] === void 0 && (i[s] = r[s]);
    }),
    i
  );
}
const Vd = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  Vv = function (i, r) {
    const a =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: "/" },
      l = encodeURIComponent(r);
    let d = `${i}=${l}`;
    if (a.maxAge > 0) {
      const f = a.maxAge - 0;
      if (Number.isNaN(f)) throw new Error("maxAge should be a Number");
      d += `; Max-Age=${Math.floor(f)}`;
    }
    if (a.domain) {
      if (!Vd.test(a.domain)) throw new TypeError("option domain is invalid");
      d += `; Domain=${a.domain}`;
    }
    if (a.path) {
      if (!Vd.test(a.path)) throw new TypeError("option path is invalid");
      d += `; Path=${a.path}`;
    }
    if (a.expires) {
      if (typeof a.expires.toUTCString != "function")
        throw new TypeError("option expires is invalid");
      d += `; Expires=${a.expires.toUTCString()}`;
    }
    if (
      (a.httpOnly && (d += "; HttpOnly"),
      a.secure && (d += "; Secure"),
      a.sameSite)
    )
      switch (
        typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite
      ) {
        case !0:
          d += "; SameSite=Strict";
          break;
        case "lax":
          d += "; SameSite=Lax";
          break;
        case "strict":
          d += "; SameSite=Strict";
          break;
        case "none":
          d += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    return d;
  },
  Hd = {
    create(i, r, s, a) {
      let l =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: "/", sameSite: "strict" };
      s &&
        ((l.expires = new Date()),
        l.expires.setTime(l.expires.getTime() + s * 60 * 1e3)),
        a && (l.domain = a),
        (document.cookie = Vv(i, encodeURIComponent(r), l));
    },
    read(i) {
      const r = `${i}=`,
        s = document.cookie.split(";");
      for (let a = 0; a < s.length; a++) {
        let l = s[a];
        for (; l.charAt(0) === " "; ) l = l.substring(1, l.length);
        if (l.indexOf(r) === 0) return l.substring(r.length, l.length);
      }
      return null;
    },
    remove(i) {
      this.create(i, "", -1);
    },
  };
var Hv = {
    name: "cookie",
    lookup(i) {
      let { lookupCookie: r } = i;
      if (r && typeof document < "u") return Hd.read(r) || void 0;
    },
    cacheUserLanguage(i, r) {
      let {
        lookupCookie: s,
        cookieMinutes: a,
        cookieDomain: l,
        cookieOptions: d,
      } = r;
      s && typeof document < "u" && Hd.create(s, i, a, l, d);
    },
  },
  Wv = {
    name: "querystring",
    lookup(i) {
      var a;
      let { lookupQuerystring: r } = i,
        s;
      if (typeof window < "u") {
        let { search: l } = window.location;
        !window.location.search &&
          ((a = window.location.hash) == null ? void 0 : a.indexOf("?")) > -1 &&
          (l = window.location.hash.substring(
            window.location.hash.indexOf("?"),
          ));
        const f = l.substring(1).split("&");
        for (let m = 0; m < f.length; m++) {
          const h = f[m].indexOf("=");
          h > 0 && f[m].substring(0, h) === r && (s = f[m].substring(h + 1));
        }
      }
      return s;
    },
  };
let ei = null;
const Wd = () => {
  if (ei !== null) return ei;
  try {
    ei = window !== "undefined" && window.localStorage !== null;
    const i = "i18next.translate.boo";
    window.localStorage.setItem(i, "foo"), window.localStorage.removeItem(i);
  } catch {
    ei = !1;
  }
  return ei;
};
var qv = {
  name: "localStorage",
  lookup(i) {
    let { lookupLocalStorage: r } = i;
    if (r && Wd()) return window.localStorage.getItem(r) || void 0;
  },
  cacheUserLanguage(i, r) {
    let { lookupLocalStorage: s } = r;
    s && Wd() && window.localStorage.setItem(s, i);
  },
};
let ti = null;
const qd = () => {
  if (ti !== null) return ti;
  try {
    ti = window !== "undefined" && window.sessionStorage !== null;
    const i = "i18next.translate.boo";
    window.sessionStorage.setItem(i, "foo"),
      window.sessionStorage.removeItem(i);
  } catch {
    ti = !1;
  }
  return ti;
};
var Kv = {
    name: "sessionStorage",
    lookup(i) {
      let { lookupSessionStorage: r } = i;
      if (r && qd()) return window.sessionStorage.getItem(r) || void 0;
    },
    cacheUserLanguage(i, r) {
      let { lookupSessionStorage: s } = r;
      s && qd() && window.sessionStorage.setItem(s, i);
    },
  },
  Qv = {
    name: "navigator",
    lookup(i) {
      const r = [];
      if (typeof navigator < "u") {
        const { languages: s, userLanguage: a, language: l } = navigator;
        if (s) for (let d = 0; d < s.length; d++) r.push(s[d]);
        a && r.push(a), l && r.push(l);
      }
      return r.length > 0 ? r : void 0;
    },
  },
  Gv = {
    name: "htmlTag",
    lookup(i) {
      let { htmlTag: r } = i,
        s;
      const a = r || (typeof document < "u" ? document.documentElement : null);
      return (
        a &&
          typeof a.getAttribute == "function" &&
          (s = a.getAttribute("lang")),
        s
      );
    },
  },
  Yv = {
    name: "path",
    lookup(i) {
      var l;
      let { lookupFromPathIndex: r } = i;
      if (typeof window > "u") return;
      const s = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      return Array.isArray(s)
        ? (l = s[typeof r == "number" ? r : 0]) == null
          ? void 0
          : l.replace("/", "")
        : void 0;
    },
  },
  Jv = {
    name: "subdomain",
    lookup(i) {
      var l, d;
      let { lookupFromSubdomainIndex: r } = i;
      const s = typeof r == "number" ? r + 1 : 1,
        a =
          typeof window < "u" &&
          ((d = (l = window.location) == null ? void 0 : l.hostname) == null
            ? void 0
            : d.match(
                /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i,
              ));
      if (a) return a[s];
    },
  };
let _f = !1;
try {
  document.cookie, (_f = !0);
} catch {}
const Of = [
  "querystring",
  "cookie",
  "localStorage",
  "sessionStorage",
  "navigator",
  "htmlTag",
];
_f || Of.splice(1, 1);
const Xv = () => ({
  order: Of,
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  convertDetectedLanguage: (i) => i,
});
class Af {
  constructor(r) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.type = "languageDetector"), (this.detectors = {}), this.init(r, s);
  }
  init() {
    let r =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    (this.services = r),
      (this.options = Uv(s, this.options || {}, Xv())),
      typeof this.options.convertDetectedLanguage == "string" &&
        this.options.convertDetectedLanguage.indexOf("15897") > -1 &&
        (this.options.convertDetectedLanguage = (l) => l.replace("-", "_")),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = a),
      this.addDetector(Hv),
      this.addDetector(Wv),
      this.addDetector(qv),
      this.addDetector(Kv),
      this.addDetector(Qv),
      this.addDetector(Gv),
      this.addDetector(Yv),
      this.addDetector(Jv);
  }
  addDetector(r) {
    return (this.detectors[r.name] = r), this;
  }
  detect() {
    let r =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      s = [];
    return (
      r.forEach((a) => {
        if (this.detectors[a]) {
          let l = this.detectors[a].lookup(this.options);
          l && typeof l == "string" && (l = [l]), l && (s = s.concat(l));
        }
      }),
      (s = s.map((a) => this.options.convertDetectedLanguage(a))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? s
        : s.length > 0
          ? s[0]
          : null
    );
  }
  cacheUserLanguage(r) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches;
    s &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(r) > -1) ||
        s.forEach((a) => {
          this.detectors[a] &&
            this.detectors[a].cacheUserLanguage(r, this.options);
        }));
  }
}
Af.type = "languageDetector";
const Zv = "en",
  ey = {
    b1: "Home",
    b2: "Invest & Plan",
    b3: "Corporate Responsibility",
    b4: "About",
    b5: "Contact",
    sections: {
      buy: { title: "Buy", description: "Discover our buying opportunities." },
      sell: { title: "Sell", description: "Explore ways to sell your assets." },
      invest: {
        title: "Invest",
        description: "Learn how to invest effectively with us.",
      },
      legal: {
        title: "Legal Aspects",
        description: "Understand the legal aspects of investing.",
      },
    },
  },
  ty = {
    title: "Welcome to Legal Boutique Advisers",
    subtitle: "Draw Your Dream Home",
    content:
      "With our extensive listings and experienced agents, your perfect property is just a search away.",
    contactUsButton: "Contact Us",
    learnMoreButton: "Learn more",
  },
  ny = {
    section1: {
      sectionTitle: "Expertise",
      description:
        "Our firm is a law and tax boutique that specializes in the real estate sector and offers you expert advice and representation as your investor, promoter and/or professional intermediate in real estate transactions, without the language being an obstacle.",
    },
    section2: {
      sectionTitle: "Interested in buying?",
      description:
        "We're your Marbella house-hunting experts. With our local knowledge and an array of listings, we'll help you find your dream home effortlessly. From consultation to closing, we make buying in Marbella a breeze.",
      button: "Buy With Us",
    },
    section3: {
      sectionTitle: "Time to make a listing?",
      description:
        "We're your Marbella selling experts. From pricing to marketing, we've got you covered for a seamless selling experience. Trust us to maximize your property's value and secure the best deal possible. With our extensive expertise and range of listings, we'll make finding your dream home effortless. From consultation to closing, we make buying in Marbella feel like a summer breeze.",
      button: "Market With Us",
    },
  },
  ry = {
    title: "Optimizing Your Investments",
    description:
      "A law firm that offers asset management advice, both in real estate and in the art sector, covering legal and tax aspects at national and international levels, without language being an obstacle.",
    section2: {
      sectionTitle: "Comprehensive Asset Management",
      description:
        "LBA was founded as a group of professionals specializing in asset investment, where we assist from the beginning to analyze interests and search for the best investment that suits the needs of our clients, whether it is for investment purposes or searching for a vacation residence. Always in contact with professionals from the real estate sector, architects, notaries, and banks, we provide services as financial advisers or asset management consultants, where clients benefit from our global and detailed analysis that allows us to select and advise on the best investment possibilities, financial, and tax strategies.",
      button: "Learn More",
    },
    section3: {
      sectionTitle: "Tailored Real Estate Solutions",
      description:
        "Our clients typically have an international profile with unique needs. We deal with investments in second holiday homes, but also primary residences, investments to establish rental businesses or hotel projects, already built homes, or land to build their dream residence, to mention a few examples.",
    },
    section4: {
      sectionTitle: "Expanding into Art Investment",
      description:
        "Precisely in the quest to optimize our clients' resources, we not only focus on real estate but also consider investments in the art sector, which offers interesting tax benefits. What better way to invest in a work of art and become part of our history?",
    },
    section5: {
      sectionTitle: "Operating Across Spain",
      description:
        "Our main area of operation is Marbella, Costa del Sol, the province of Málaga, but we have competence and scope of action throughout Spain.",
    },
    conclusion: "We want to shape your future!!!",
  },
  iy = {
    section1: {
      sectionTitle: "Why buy with us?",
      description:
        "At Legal Boutique Advisers, we're committed to making this journey an extraordinary one for you. Our dedication to finding your dream property goes beyond just bricks and mortar – it's about helping you discover your ideal lifestyle.",
    },
    section2: {
      sectionTitle: "Our expertise",
      description:
        "Having extensive experience in market research, we have developed a deep understanding of the real estate industry and the factors that influence market trends. Our skills collecting and analyzing data show us able to translate complex research findings into actionable insights for our clients.",
    },
    section3: {
      sectionTitle: "Knowledge comes with experience",
      description:
        "With an extensive portfolio of properties and a team of experienced, local experts, we offer unparalleled insights into the real estate market. Whether you're a first-time buyer or a seasoned investor, we provide personalized guidance every step of the way, ensuring your home-buying experience is smooth, transparent, and rewarding.",
    },
    section4: {
      sectionTitle: "Your Vision, Our Mission",
      description:
        "At Legal Boutique Advisers, your vision of home becomes our mission, and we're here to turn it into reality. Discover your perfect property with us and embark on a journey that promises not just a house, but a place you'll truly call home.",
    },
    section5: {
      sectionTitle: "Expert Legal Support: Golden Visa",
      description:
        "The Golden Visa residence permit is designed to cater to non-European Union citizens seeking to make investments that grant them the privilege of residing and moving seamlessly within European nations. Our legal services are dedicated to furnishing you with comprehensive assistance and counsel throughout the requisite procedures for securing a Golden Visa. This coveted permit can be acquired either through a real estate investment or various other forms of investment.",
    },
  },
  sy = {
    section1: {
      sectionTitle: "Find your perfect match",
      description:
        "With our vast network, industry expertise, and unwavering commitment, we're not just selling properties; we're finding your perfect match. Our dedicated team works tirelessly to showcase your property in the best light, reaching the right audience and ensuring a seamless selling process.",
    },
    section2: {
      sectionTitle: "Sell with Confidence",
      description:
        "Explore the possibilities, discover the potential, and embark on a seamless selling experience with us. Whether you're a seasoned seller or a first-time lister, our comprehensive resources, and expert guidance will empower you to make the most of your property.",
      button: "Learn more",
    },
    section3: {
      sectionTitle: "Tax Advice",
      description:
        "Tax advice is the compass that guides you through the complex landscape of financial decisions. It's about maximizing your savings while staying compliant with ever-changing tax laws. We help you navigate the intricacies of tax planning, ensuring your financial goals are met efficiently and legally. Let us be your trusted partner in making smart tax decisions.",
    },
  },
  oy = {
    title: "Legal Boutique Advisers",
    description: {
      paragraph1: {
        title: "Personalized Legal Services",
        text: "LEGAL BOUTIQUE ADVISERS has been developed to offer our clients a wide range of legal services with a personalized approach.",
      },
      paragraph2: {
        title: "Comprehensive Real Estate Investment Support",
        text: "From the moment you decide to invest in Spain, whether for a vacation residence, for investment companies or funds, or even construction companies, we provide complete advice, from finding the property to recommending the best legal form to minimize the tax impact of your investment, accompanying you until the end 'turnkey,' in all aspects related to Real Estate Law.",
      },
      paragraph3: {
        title: "Inheritance and Post-Investment Planning",
        text: "Once you’ve invested, we assist you in matters related to Inheritance Law, including prior tax planning and post-investment legal and fiscal aspects.",
      },
      paragraph4: {
        title: "Banking Advice and Real-Time Interaction",
        text: "We study individual or corporate relationships with banking entities, offering tailored advice and maintaining real-time communication for seamless interactions.",
      },
      services: {
        area1: "Real Estate Law",
        area2: "Private International Law",
        area3: "Family Law",
        area4: "Obligations and Contracts",
        area5: "Tax Law",
      },
    },
  },
  ay = {
    section1: {
      title: "Why choose Marbella?",
      body: "Investing in Marbella is a smart move for its stunning location, strong rental potential, and stable economy. This coastal gem on the Costa del Sol offers a diverse range of properties and favorable tax incentives, making it an attractive destination for both lifestyle and financial gains.",
    },
    section2: {
      title: "A long term commitment to a bright future",
      body: "Investing in Marbella is a pledge to a brilliant future. With its enduring sunshine, economic vitality, and enviable lifestyle, Marbella offers a long-term commitment to both financial security and a high-quality life.",
    },
    section3: {
      title: "Marbella's Luxurious Lifestyle",
      body: "Marbella's lifestyle is a harmonious blend of luxury, leisure, and year-round outdoor enjoyment. With pristine beaches, gourmet dining, high-end shopping, and a vibrant cultural scene, it's a place where every day feels like a vacation.",
    },
    section4: {
      title: "Securing Your Legacy",
      body: "Inheritance is more than assets; it's a legacy of security and values. Effective estate planning and the thoughtful distribution of assets can help minimize tax liabilities and legal complexities, allowing your loved ones to inherit your legacy with ease. It's an essential aspect of financial planning that offers peace of mind and a lasting impact on generations to come.",
    },
    section5: {
      title: "The Art of Investment",
      body: "Journey into the world of culture, aesthetics, and potential growth. Art not only has the potential to appreciate in value over time but also offers the unique opportunity to surround yourself with beauty and creativity. Blend financial potential with cultural enrichment and diversify your portfolio and add a touch of sophistication to your wealth management.",
    },
  },
  ly = {
    section1: {
      sectionTitle: "Who are we?",
      description:
        "With a wealth of expertise and an extensive understanding of the real estate landscape, we are a team adept at crafting meticulous comparative assessments. We are committed to proactively identify and mitigate potential challenges that might emerge, all while delivering comprehensive legal and tax guidance.",
    },
    section2: {
      sectionTitle: "An attentive relation",
      description:
        "We are a law and tax firm who offers legal advice, at national and international level, without the language being an obstacle.",
    },
    section3: {
      sectionTitle: "Providing trust",
      description:
        "The security of having an expert lawyer in real estate and taxes, in situ, allows us to propose a real service of accompaniment to companies and individuals, that best suits your needs, without wasting time, that allows you to reduce the cost of your acquisition.",
    },
    section4: {
      sectionTitle: "The Team",
      description:
        "We recognize the individuality of our clients, which is why our advisory services are meticulously tailored to align with their distinctive needs.",
    },
    marisela: {
      name: "Marisela Castro Abad",
      title: "Lawyer",
      description: `A graduate in law from the University of Malaga, I have specialized in European law and hold degrees in tax law and accounting. With a diverse professional background, I have worked with the European Commission , and Spanish Bar Delegation in Brussels, and esteemed law firms across Spain. 
 As a member of the Malaga Bar Association and a certified "Avocat Mandataire in Transactions Immobilières" by the AAMTI Association in Paris, I bring a wealth of experience. Additionally, I am associated with the "Chambre Franco-Espagnole de Commerce et d' Industrie" and have furthered my expertise through specialized training such as "Tax in the Arts" at the University Panthéon-Assas Paris 2. My approach revolves around meticulously analyzing each client's unique circumstances, providing tailored advice, and executing decisions that yield optimal solutions. My mission is to offer tax-efficient strategies that enhance your investments across various domains, including real estate, the arts market, and more, even facilitating financing when needed. An ardent enthusiast of opera and art, I am devoted to engaging and fostering artistic pursuits.`,
    },
  },
  uy = {
    title: "We are here to help you in any way.",
    description:
      "Investing in Marbella is a smart move for its stunning location, strong rental potential, and stable economy. This coastal gem on the Costa del Sol offers a diverse range of properties and favorable tax incentives, making it an attractive destination for both lifestyle and financial gains.",
    email: "Your email",
    "email-placeholder": "name@email.com",
    subject: "Subject",
    "subject-placeholder": "Let us konw how we can help you",
    message: "Your message",
    "message-body": "Leave us a comment",
    submit: "Submit",
  },
  cy = {
    title: "Do not hesitate to contact us",
    body: "Having extensive experience in market research, we have developed a deep understanding of the real estate industry and the factors that influence market trends. Our skills collecting and analyzing data show us able to translate complex research findings into actionable insights for our clients.",
    contactUsButton: "Contact Us",
    learnMoreButton: "Learn more",
  },
  dy = {
    section1: {
      sectionTitle: "Culture and Artistry",
      description:
        "At Legal Boutique Advisers we hold a profound appreciation for art in all its forms, considering it an essential facet of daily life's harmony. We are dedicated to fostering and promoting culture in all its expressions, actively supporting contemporary artists by providing a platform to showcase their creativity and talent on our website.",
    },
    section2: {
      sectionTitle: "Patronage",
      description:
        "The Musical Outreach Center of the Mediterranean was founded in Marbella in 2004. Since then he has developed different activities related to classical music. Also known as Música con Encanto, this project has carried out since its foundation a season of concerts, musical documentary cinema, courses and workshops for adults, musical trips and the administrative and artistic management of the Little Mediterranean Orchestra, children's orchestra and youth string.",
    },
    section3: {
      sectionTitle: "Investing in the future",
      description:
        "We're your Marbella investment specialists, offering local insights and opportunities to simplify your journey. From property selection to financial guidance, we're here to ensure your Marbella investments thrive.",
      button: "Start Investing Now",
    },
  },
  fy = {
    lang: Zv,
    navbar: ey,
    landingPage: ty,
    main: ny,
    investPlan: ry,
    buy: iy,
    sell: sy,
    legalAspect: oy,
    invest: ay,
    about: ly,
    contact: uy,
    callToAction: cy,
    corporateResposibility: dy,
  },
  py = "fr",
  hy = {
    b1: "Accueil",
    b2: "Investir & Planifier",
    b3: "Responsabilité d'Entreprise",
    b4: "À Propos",
    b5: "Contact",
    sections: {
      buy: {
        title: "Acheter",
        description: "Découvrez nos opportunités d'achat.",
      },
      sell: {
        title: "Vendre",
        description: "Explorez les solutions pour vendre vos actifs.",
      },
      invest: {
        title: "Investir",
        description: "Apprenez à investir efficacement avec nous.",
      },
      legal: {
        title: "Aspects Juridiques",
        description: "Comprenez les aspects juridiques de l'investissement.",
      },
    },
  },
  my = {
    title: "Bienvenue chez Legal Boutique Advisers",
    subtitle: "Réalisez la maison de vos rêves",
    content:
      "Avec nos nombreuses annonces et nos agents expérimentés, la propriété parfaite est à portée de recherche.",
    contactUsButton: "Contactez-nous",
    learnMoreButton: "En savoir plus",
  },
  gy = {
    section1: {
      sectionTitle: "Expertise",
      description:
        "Notre cabinet est une boutique spécialisée en droit et en fiscalité, dédiée au secteur immobilier. Nous vous offrons des conseils et une représentation experte en tant qu'investisseur, promoteur et/ou intermédiaire professionnel dans les transactions immobilières, sans que la langue soit un obstacle.",
    },
    section2: {
      sectionTitle: "Intéressé par l'achat ?",
      description:
        "Nous sommes vos experts en recherche de maison à Marbella. Grâce à notre expertise locale et un large éventail d'annonces, nous vous aidons à trouver la maison de vos rêves facilement. De la consultation à la conclusion, nous rendons l'achat à Marbella simple et accessible.",
      button: "Achetez avec nous",
    },
    section3: {
      sectionTitle: "Prêt à mettre en vente ?",
      description:
        "Nous sommes vos experts en vente à Marbella. De l'évaluation au marketing, nous assurons une expérience de vente sans faille. Faites-nous confiance pour maximiser la valeur de votre propriété et conclure le meilleur accord possible. Avec notre expertise et notre gamme variée de propriétés, nous contribuons à rendre l'achat ou la vente aussi agréable qu'une brise d'été.",
      button: "Mettez en valeur avec nous",
    },
    section4: {
      sectionTitle: "Culture et Art",
      description:
        "Chez Legal Boutique Advisers, nous avons une profonde appréciation pour l’art sous toutes ses formes, le considérant comme une facette essentielle de l'harmonie de la vie quotidienne. Nous sommes dédiés à encourager et promouvoir la culture sous toutes ses expressions, en soutenant activement les artistes contemporains en leur offrant une plateforme pour exposer leur créativité et leur talent sur notre site.",
    },
    section5: {
      sectionTitle: "Mécénat",
      description:
        "Le Centre de Diffusion Musicale de la Méditerranée a été fondé à Marbella en 2004. Depuis lors, il a développé diverses activités liées à la musique classique. Également connu comme Música con Encanto, ce projet a organisé depuis sa création une saison de concerts, des documentaires musicaux, des cours et ateliers pour adultes, des voyages musicaux ainsi que la gestion administrative et artistique de l'Orchestre Méditerranéen des Petits, orchestre pour enfants et instruments à cordes pour jeunes.",
    },
    section6: {
      sectionTitle: "Investir dans l'avenir",
      description:
        "Nous sommes vos spécialistes en investissement à Marbella, offrant des perspectives locales et des opportunités pour simplifier votre parcours. De la sélection des propriétés aux conseils financiers, nous sommes là pour garantir le succès de vos investissements à Marbella.",
      button: "Commencez à investir maintenant",
    },
  },
  vy = {
    title: "Optimiser Vos Investissements",
    description:
      "Un cabinet d’avocats qui offre des conseils en gestion d’actifs, tant dans le secteur immobilier que dans celui de l'art, couvrant les aspects juridiques et fiscaux aux niveaux national et international, sans que la langue ne soit un obstacle.",
    section2: {
      sectionTitle: "Gestion Globale d’Actifs",
      description:
        "LBA a été fondé en tant que groupe de professionnels spécialisés dans l’investissement d’actifs, où nous assistons dès le début à analyser les intérêts et chercher le meilleur investissement répondant aux besoins de nos clients, que ce soit pour des objectifs d'investissement ou pour chercher une résidence de vacances. Toujours en contact avec des professionnels du secteur immobilier, des architectes, des notaires et des banques, nous offrons des services en tant que conseillers financiers ou consultants en gestion d’actifs. Nos clients bénéficient de nos analyses globales et détaillées qui nous permettent de sélectionner et de conseiller sur les meilleures possibilités d’investissement ainsi que sur les stratégies financières et fiscales.",
      button: "En savoir plus",
    },
    section3: {
      sectionTitle: "Solutions Immobilières Sur Mesure",
      description:
        "Nos clients ont généralement un profil international avec des besoins spécifiques. Nous gérons des investissements dans des secondes résidences de vacances, mais aussi des résidences principales, des investissements pour créer des entreprises locatives ou des projets hôteliers, des maisons déjà construites ou des terrains pour construire leur résidence de rêve, pour ne citer que quelques exemples.",
    },
    section4: {
      sectionTitle: "S’étendre à l’Investissement dans l’Art",
      description:
        "Précisément dans la quête d’optimisation des ressources de nos clients, nous ne nous concentrons pas seulement sur l'immobilier, mais nous considérons également les investissements dans le secteur de l’art, qui offre des avantages fiscaux intéressants. Quelle meilleure façon d’investir qu’à travers une œuvre d’art pour devenir partie intégrante de notre histoire ?",
    },
    section5: {
      sectionTitle: "Opérant à Travers Toute l’Espagne",
      description:
        "Notre principal domaine d'intervention est Marbella, la Costa del Sol, et la province de Málaga, mais nous avons la compétence et la capacité d'action dans toute l'Espagne.",
    },
    conclusion: "Nous voulons façonner votre avenir !!!",
  },
  yy = {
    section1: {
      sectionTitle: "Pourquoi acheter avec nous ?",
      description:
        "Chez Legal Boutique Advisers, nous nous engageons à faire de ce parcours une expérience extraordinaire pour vous. Notre dévouement à trouver la propriété de vos rêves va au-delà des simples biens physiques – il s'agit de vous aider à découvrir votre mode de vie idéal.",
    },
    section2: {
      sectionTitle: "Notre expertise",
      description:
        "Grâce à une longue expérience dans la recherche de marché, nous avons développé une profonde compréhension du secteur immobilier ainsi que des tendances qui influencent le marché. Nos compétences dans la collecte et l’analyse de données nous permettent de transformer des résultats complexes en conseils exploitables pour nos clients.",
    },
    section3: {
      sectionTitle: "L'expérience apporte la connaissance",
      description:
        "Avec un large portefeuille de propriétés et une équipe d’experts locaux expérimentés, nous offrons des perspectives inégalées sur le marché immobilier. Que vous soyez un primo-acquéreur ou un investisseur aguerri, nous fournissons un accompagnement personnalisé à chaque étape, garantissant une expérience d'achat fluide, transparente et enrichissante.",
    },
    section4: {
      sectionTitle: "Votre vision, notre mission",
      description:
        "Chez Legal Boutique Advisers, votre vision de la maison devient notre mission, et nous sommes là pour la concrétiser. Découvrez la propriété idéale avec nous et commencez un voyage qui promet bien plus qu'une maison : un endroit que vous appellerez vraiment chez vous.",
    },
    section5: {
      sectionTitle: "Support juridique expert : Golden Visa",
      description:
        "Le permis de résidence Golden Visa est conçu pour les citoyens non européens cherchant à réaliser des investissements leur permettant de résider et de voyager librement dans les pays de l’Union européenne. Nos services juridiques vous proposent une assistance et des conseils complets tout au long des démarches nécessaires pour obtenir un Golden Visa. Ce permis convoité peut être obtenu grâce à un investissement immobilier ou d’autres formes d’investissements.",
    },
  },
  xy = {
    section1: {
      sectionTitle: "Trouvez votre accord parfait",
      description:
        "Avec notre vaste réseau, notre expertise du secteur et notre engagement sans faille, nous ne nous contentons pas de vendre des propriétés ; nous trouvons l'accord parfait pour vous. Notre équipe dévouée travaille sans relâche pour mettre en valeur votre propriété sous son meilleur jour, atteindre le bon public et assurer un processus de vente fluide.",
    },
    section2: {
      sectionTitle: "Vendez en toute confiance",
      description:
        "Explorez les opportunités offertes, découvrez votre potentiel et profitez d’une expérience de vente sans encombre avec nous. Que vous soyez un vendeur expérimenté ou un débutant, nos ressources complètes et nos conseils d’experts vous permettront de tirer le meilleur parti de votre bien immobilier.",
      button: "En savoir plus",
    },
    section3: {
      sectionTitle: "Conseils fiscaux",
      description:
        "Les conseils fiscaux sont une boussole qui vous guide à travers le paysage complexe des décisions financières. Il s’agit d’optimiser vos économies tout en respectant les lois fiscales en constante évolution. Nous vous aidons à naviguer dans les subtilités de la planification fiscale, en veillant à ce que vos objectifs financiers soient atteints avec efficacité et en toute légalité. Faites de nous votre partenaire de confiance pour prendre des décisions fiscales éclairées.",
    },
  },
  wy = {
    title: "Conseillers Boutique Légale",
    description: {
      paragraph1: {
        title: "Services Juridiques Personnalisés",
        text: "LEGAL BOUTIQUE ADVISERS a été développé pour offrir à nos clients une large gamme de services juridiques avec une approche personnalisée.",
      },
      paragraph2: {
        title: "Soutien Complet pour les Investissements Immobiliers",
        text: "Dès que vous décidez d'investir en Espagne, que ce soit pour une résidence de vacances, pour des entreprises ou fonds d'investissement, ou même des entreprises de construction, nous fournissons des conseils complets, de la recherche de la propriété à la recommandation de la meilleure forme juridique pour minimiser l'impact fiscal de votre investissement, en vous accompagnant jusqu'à la fin 'clé en main,' dans tous les aspects liés au Droit Immobilier.",
      },
      paragraph3: {
        title: "Planification Successorale et Post-Investissement",
        text: "Une fois que vous avez investi, nous vous accompagnons dans les questions relatives au Droit des Successions, y compris une planification fiscale préalable et des aspects juridiques et fiscaux postérieurs.",
      },
      paragraph4: {
        title: "Conseils Bancaires Globaux et Interaction en Temps Réel",
        text: "Nous analysons les relations des particuliers ou des entreprises avec les entités bancaires, proposant des conseils sur mesure et assurant une communication en temps réel pour des interactions fluides.",
      },
      services: {
        area1: "Droit Immobilier",
        area2: "Droit International Privé",
        area3: "Droit de la Famille",
        area4: "Obligations et Contrats",
        area5: "Droit Fiscal",
      },
    },
  },
  Sy = {
    section1: {
      title: "Pourquoi choisir Marbella ?",
      body: "Investir à Marbella est une décision intelligente grâce à son emplacement magnifique, son fort potentiel locatif et une économie stable. Ce joyau côtier de la Costa del Sol offre une vaste gamme de propriétés et des incitations fiscales avantageuses, en faisant une destination attrayante tant pour le style de vie que pour les gains financiers.",
    },
    section2: {
      title: "Un engagement à long terme pour un avenir brillant",
      body: "Investir à Marbella, c'est un engagement envers un avenir brillant. Avec son ensoleillement durable, sa vitalité économique et son style de vie enviable, Marbella offre un engagement à long terme tant pour la sécurité financière que pour une vie de qualité.",
    },
    section3: {
      title: "Le style de vie luxueux de Marbella",
      body: "Le style de vie à Marbella est un mélange harmonieux de luxe, de loisirs et de plaisir en plein air tout au long de l'année. Avec ses plages immaculées, sa cuisine gastronomique, ses boutiques haut de gamme et sa scène culturelle vibrante, c'est un endroit où chaque jour ressemble à des vacances.",
    },
    section4: {
      title: "Assurer votre héritage",
      body: "L'héritage, c'est bien plus que des biens ; c'est un legs de sécurité et de valeurs. Une planification successorale efficace et une distribution réfléchie des actifs peuvent aider à minimiser les charges fiscales et les complexités juridiques, permettant à vos proches d'hériter facilement de votre héritage. C'est un aspect essentiel de la planification financière qui offre sérénité et impact durable pour les générations futures.",
    },
    section5: {
      title: "L'Art de l'Investissement",
      body: "Partez à la découverte du monde de la culture, de l'esthétique et de la croissance potentielle. L'art a non seulement le potentiel de prendre de la valeur au fil du temps, mais il offre également l'opportunité unique de vous entourer de beauté et de créativité. Alliez potentiel financier et enrichissement culturel pour diversifier votre portefeuille et ajouter une touche de sophistication à votre gestion de patrimoine.",
    },
  },
  ky = {
    section1: {
      sectionTitle: "Qui sommes-nous ?",
      description:
        "Avec une expertise approfondie et une vaste connaissance de l’univers immobilier, nous sommes une équipe spécialisée dans les évaluations comparatives méticuleuses. Nous nous engageons à identifier et à atténuer de façon proactive les défis qui pourraient survenir tout en offrant une assistance juridique et fiscale complète.",
    },
    section2: {
      sectionTitle: "Une relation attentive",
      description:
        "Nous sommes un cabinet de droit et de fiscalité qui offre des conseils juridiques, au niveau national et international, sans que la langue soit un obstacle.",
    },
    section3: {
      sectionTitle: "Offrir de la confiance",
      description:
        "La sérénité d'avoir un avocat expert en immobilier et en taxes sur place nous permet de proposer un accompagnement réel aux entreprises et aux particuliers, adapté à vos besoins, sans perte de temps et permettant de réduire le coût de votre acquisition.",
    },
    section4: {
      sectionTitle: "L'équipe",
      description:
        "Nous reconnaissons l’unicité de nos clients, c'est pourquoi nos conseils sont soigneusement adaptés pour correspondre à leurs besoins spécifiques.",
    },
    marisela: {
      name: "Marisela Castro Abad",
      title: "Avocate",
      description: `Diplômée en droit de l’Université de Malaga, je me suis spécialisée en droit européen et je possède des diplômes en droit fiscal et en comptabilité. Avec un parcours professionnel diversifié, j’ai travaillé avec la Commission Européenne, la Délégation du Barreau Espagnol à Bruxelles, ainsi que dans des cabinets d’avocats prestigieux à travers l'Espagne. 
 En tant que membre du Barreau de Malaga et avocate mandataire en transactions immobilières certifiée par l’association AAMTI à Paris, j’apporte une expérience riche et variée. De plus, je suis associée à la Chambre Franco-Espagnole de Commerce et d’Industrie et j’ai enrichi mon expertise grâce à des formations spécialisées comme "Tax in the Arts" à l’université Panthéon-Assas Paris 2. Mon approche repose sur l’analyse minutieuse des circonstances uniques de chaque client, la fourniture de conseils sur mesure et la mise en œuvre de décisions qui génèrent des solutions optimales. Ma mission est de proposer des stratégies fiscalement avantageuses pour maximiser vos investissements dans divers domaines, y compris l’immobilier, le marché de l’art et bien plus encore, tout en facilitant le financement en cas de besoin. Passionnée d’opéra et d’art, je m’engage à m’impliquer et à encourager les initiatives artistiques.`,
    },
  },
  Ey = {
    title: "Nous sommes là pour vous aider de toutes les manières.",
    description:
      "Investir à Marbella est un choix judicieux en raison de son emplacement magnifique, de son fort potentiel locatif et de son économie stable. Ce joyau côtier de la Costa del Sol offre une grande variété de propriétés et des avantages fiscaux attractifs, ce qui en fait une destination attrayante tant pour le style de vie que pour les gains financiers.",
    email: "Votre email",
    "email-placeholder": "nom@email.com",
    subject: "Sujet",
    "subject-placeholder": "Faites-nous savoir comment nous pouvons vous aider",
    message: "Votre message",
    "message-body": "Laissez-nous un commentaire",
    submit: "Envoyer",
  },
  Cy = {
    title: "N'hésitez pas à nous contacter",
    body: "Fort d'une grande expérience en étude de marché, nous avons acquis une connaissance approfondie du secteur immobilier et des facteurs qui influencent les tendances du marché. Nos compétences en collecte et analyse de données nous permettent de traduire des résultats de recherche complexes en insights exploitables pour nos clients.",
    contactUsButton: "Contactez-nous",
    learnMoreButton: "En savoir plus",
  },
  Ny = {
    section1: {
      sectionTitle: "Culture et Art",
      description:
        "Chez Legal Boutique Advisers, nous avons une profonde appréciation pour l'art sous toutes ses formes, le considérant comme une composante essentielle de l'harmonie de la vie quotidienne. Nous nous consacrons à favoriser et à promouvoir la culture dans toutes ses expressions, en soutenant activement les artistes contemporains en leur offrant une plateforme pour présenter leur créativité et leur talent sur notre site web.",
    },
    section2: {
      sectionTitle: "Mécénat",
      description:
        "Le Centre Musical de la Méditerranée a été fondé à Marbella en 2004. Depuis, il a développé diverses activités liées à la musique classique. Également connu sous le nom de Música con Encanto, ce projet a réalisé, depuis sa création, une saison de concerts, du cinéma documentaire musical, des cours et des ateliers pour adultes, des voyages musicaux et la gestion administrative et artistique de la Petite Méditerranée Orchestra, un orchestre pour enfants et un orchestre à cordes pour jeunes.",
    },
    section3: {
      sectionTitle: "Investir dans l'avenir",
      description:
        "Nous sommes vos spécialistes en investissement à Marbella, offrant des perspectives locales et des opportunités pour simplifier votre parcours. De la sélection de propriétés aux conseils financiers, nous sommes là pour assurer le succès de vos investissements à Marbella.",
      button: "Commencez à investir maintenant",
    },
  },
  by = {
    lang: py,
    navbar: hy,
    landingPage: my,
    main: gy,
    investPlan: vy,
    buy: yy,
    sell: xy,
    legalAspect: wy,
    invest: Sy,
    about: ky,
    contact: Ey,
    callToAction: Cy,
    corporateResposibility: Ny,
  };
We.use(Af)
  .use(rv)
  .init({
    resources: { en: { translation: fy }, fr: { translation: by } },
    fallbackLng: "en",
    interpolation: { escapeValue: !1 },
  });
var Kd = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Df = function (i) {
    const r = [];
    let s = 0;
    for (let a = 0; a < i.length; a++) {
      let l = i.charCodeAt(a);
      l < 128
        ? (r[s++] = l)
        : l < 2048
          ? ((r[s++] = (l >> 6) | 192), (r[s++] = (l & 63) | 128))
          : (l & 64512) === 55296 &&
              a + 1 < i.length &&
              (i.charCodeAt(a + 1) & 64512) === 56320
            ? ((l = 65536 + ((l & 1023) << 10) + (i.charCodeAt(++a) & 1023)),
              (r[s++] = (l >> 18) | 240),
              (r[s++] = ((l >> 12) & 63) | 128),
              (r[s++] = ((l >> 6) & 63) | 128),
              (r[s++] = (l & 63) | 128))
            : ((r[s++] = (l >> 12) | 224),
              (r[s++] = ((l >> 6) & 63) | 128),
              (r[s++] = (l & 63) | 128));
    }
    return r;
  },
  Iy = function (i) {
    const r = [];
    let s = 0,
      a = 0;
    for (; s < i.length; ) {
      const l = i[s++];
      if (l < 128) r[a++] = String.fromCharCode(l);
      else if (l > 191 && l < 224) {
        const d = i[s++];
        r[a++] = String.fromCharCode(((l & 31) << 6) | (d & 63));
      } else if (l > 239 && l < 365) {
        const d = i[s++],
          f = i[s++],
          m = i[s++],
          h =
            (((l & 7) << 18) | ((d & 63) << 12) | ((f & 63) << 6) | (m & 63)) -
            65536;
        (r[a++] = String.fromCharCode(55296 + (h >> 10))),
          (r[a++] = String.fromCharCode(56320 + (h & 1023)));
      } else {
        const d = i[s++],
          f = i[s++];
        r[a++] = String.fromCharCode(
          ((l & 15) << 12) | ((d & 63) << 6) | (f & 63),
        );
      }
    }
    return r.join("");
  },
  Mf = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(i, r) {
      if (!Array.isArray(i))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const s = r ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        a = [];
      for (let l = 0; l < i.length; l += 3) {
        const d = i[l],
          f = l + 1 < i.length,
          m = f ? i[l + 1] : 0,
          h = l + 2 < i.length,
          g = h ? i[l + 2] : 0,
          S = d >> 2,
          E = ((d & 3) << 4) | (m >> 4);
        let x = ((m & 15) << 2) | (g >> 6),
          T = g & 63;
        h || ((T = 64), f || (x = 64)), a.push(s[S], s[E], s[x], s[T]);
      }
      return a.join("");
    },
    encodeString(i, r) {
      return this.HAS_NATIVE_SUPPORT && !r
        ? btoa(i)
        : this.encodeByteArray(Df(i), r);
    },
    decodeString(i, r) {
      return this.HAS_NATIVE_SUPPORT && !r
        ? atob(i)
        : Iy(this.decodeStringToByteArray(i, r));
    },
    decodeStringToByteArray(i, r) {
      this.init_();
      const s = r ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        a = [];
      for (let l = 0; l < i.length; ) {
        const d = s[i.charAt(l++)],
          m = l < i.length ? s[i.charAt(l)] : 0;
        ++l;
        const g = l < i.length ? s[i.charAt(l)] : 64;
        ++l;
        const E = l < i.length ? s[i.charAt(l)] : 64;
        if ((++l, d == null || m == null || g == null || E == null))
          throw new jy();
        const x = (d << 2) | (m >> 4);
        if ((a.push(x), g !== 64)) {
          const T = ((m << 4) & 240) | (g >> 2);
          if ((a.push(T), E !== 64)) {
            const I = ((g << 6) & 192) | E;
            a.push(I);
          }
        }
      }
      return a;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let i = 0; i < this.ENCODED_VALS.length; i++)
          (this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i)),
            (this.charToByteMap_[this.byteToCharMap_[i]] = i),
            (this.byteToCharMapWebSafe_[i] =
              this.ENCODED_VALS_WEBSAFE.charAt(i)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i),
            i >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i));
      }
    },
  };
class jy extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const Ty = function (i) {
    const r = Df(i);
    return Mf.encodeByteArray(r, !0);
  },
  zf = function (i) {
    return Ty(i).replace(/\./g, "");
  },
  Ly = function (i) {
    try {
      return Mf.decodeString(i, !0);
    } catch (r) {
      console.error("base64Decode failed: ", r);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Py() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ry = () => Py().__FIREBASE_DEFAULTS__,
  _y = () => {
    if (typeof process > "u" || typeof Kd > "u") return;
    const i = Kd.__FIREBASE_DEFAULTS__;
    if (i) return JSON.parse(i);
  },
  Oy = () => {
    if (typeof document > "u") return;
    let i;
    try {
      i = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const r = i && Ly(i[1]);
    return r && JSON.parse(r);
  },
  Ay = () => {
    try {
      return Ry() || _y() || Oy();
    } catch (i) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);
      return;
    }
  },
  $f = () => {
    var i;
    return (i = Ay()) === null || i === void 0 ? void 0 : i.config;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dy {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((r, s) => {
        (this.resolve = r), (this.reject = s);
      }));
  }
  wrapCallback(r) {
    return (s, a) => {
      s ? this.reject(s) : this.resolve(a),
        typeof r == "function" &&
          (this.promise.catch(() => {}), r.length === 1 ? r(s) : r(s, a));
    };
  }
}
function My() {
  const i =
    typeof chrome == "object"
      ? chrome.runtime
      : typeof browser == "object"
        ? browser.runtime
        : void 0;
  return typeof i == "object" && i.id !== void 0;
}
function Ff() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function Bf() {
  return new Promise((i, r) => {
    try {
      let s = !0;
      const a = "validate-browser-context-for-indexeddb-analytics-module",
        l = self.indexedDB.open(a);
      (l.onsuccess = () => {
        l.result.close(), s || self.indexedDB.deleteDatabase(a), i(!0);
      }),
        (l.onupgradeneeded = () => {
          s = !1;
        }),
        (l.onerror = () => {
          var d;
          r(
            ((d = l.error) === null || d === void 0 ? void 0 : d.message) || "",
          );
        });
    } catch (s) {
      r(s);
    }
  });
}
function zy() {
  return !(typeof navigator > "u" || !navigator.cookieEnabled);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const $y = "FirebaseError";
class On extends Error {
  constructor(r, s, a) {
    super(s),
      (this.code = r),
      (this.customData = a),
      (this.name = $y),
      Object.setPrototypeOf(this, On.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, Ds.prototype.create);
  }
}
class Ds {
  constructor(r, s, a) {
    (this.service = r), (this.serviceName = s), (this.errors = a);
  }
  create(r, ...s) {
    const a = s[0] || {},
      l = `${this.service}/${r}`,
      d = this.errors[r],
      f = d ? Fy(d, a) : "Error",
      m = `${this.serviceName}: ${f} (${l}).`;
    return new On(l, m, a);
  }
}
function Fy(i, r) {
  return i.replace(By, (s, a) => {
    const l = r[a];
    return l != null ? String(l) : `<${a}?>`;
  });
}
const By = /\{\$([^}]+)}/g;
function Ts(i, r) {
  if (i === r) return !0;
  const s = Object.keys(i),
    a = Object.keys(r);
  for (const l of s) {
    if (!a.includes(l)) return !1;
    const d = i[l],
      f = r[l];
    if (Qd(d) && Qd(f)) {
      if (!Ts(d, f)) return !1;
    } else if (d !== f) return !1;
  }
  for (const l of a) if (!s.includes(l)) return !1;
  return !0;
}
function Qd(i) {
  return i !== null && typeof i == "object";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Uy = 1e3,
  Vy = 2,
  Hy = 4 * 60 * 60 * 1e3,
  Wy = 0.5;
function Gd(i, r = Uy, s = Vy) {
  const a = r * Math.pow(s, i),
    l = Math.round(Wy * a * (Math.random() - 0.5) * 2);
  return Math.min(Hy, a + l);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Uf(i) {
  return i && i._delegate ? i._delegate : i;
}
class pn {
  constructor(r, s, a) {
    (this.name = r),
      (this.instanceFactory = s),
      (this.type = a),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(r) {
    return (this.instantiationMode = r), this;
  }
  setMultipleInstances(r) {
    return (this.multipleInstances = r), this;
  }
  setServiceProps(r) {
    return (this.serviceProps = r), this;
  }
  setInstanceCreatedCallback(r) {
    return (this.onInstanceCreated = r), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const In = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qy {
  constructor(r, s) {
    (this.name = r),
      (this.container = s),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(r) {
    const s = this.normalizeInstanceIdentifier(r);
    if (!this.instancesDeferred.has(s)) {
      const a = new Dy();
      if (
        (this.instancesDeferred.set(s, a),
        this.isInitialized(s) || this.shouldAutoInitialize())
      )
        try {
          const l = this.getOrInitializeService({ instanceIdentifier: s });
          l && a.resolve(l);
        } catch {}
    }
    return this.instancesDeferred.get(s).promise;
  }
  getImmediate(r) {
    var s;
    const a = this.normalizeInstanceIdentifier(
        r == null ? void 0 : r.identifier,
      ),
      l =
        (s = r == null ? void 0 : r.optional) !== null && s !== void 0 ? s : !1;
    if (this.isInitialized(a) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: a });
      } catch (d) {
        if (l) return null;
        throw d;
      }
    else {
      if (l) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(r) {
    if (r.name !== this.name)
      throw Error(`Mismatching Component ${r.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = r), !!this.shouldAutoInitialize())) {
      if (Qy(r))
        try {
          this.getOrInitializeService({ instanceIdentifier: In });
        } catch {}
      for (const [s, a] of this.instancesDeferred.entries()) {
        const l = this.normalizeInstanceIdentifier(s);
        try {
          const d = this.getOrInitializeService({ instanceIdentifier: l });
          a.resolve(d);
        } catch {}
      }
    }
  }
  clearInstance(r = In) {
    this.instancesDeferred.delete(r),
      this.instancesOptions.delete(r),
      this.instances.delete(r);
  }
  async delete() {
    const r = Array.from(this.instances.values());
    await Promise.all([
      ...r.filter((s) => "INTERNAL" in s).map((s) => s.INTERNAL.delete()),
      ...r.filter((s) => "_delete" in s).map((s) => s._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(r = In) {
    return this.instances.has(r);
  }
  getOptions(r = In) {
    return this.instancesOptions.get(r) || {};
  }
  initialize(r = {}) {
    const { options: s = {} } = r,
      a = this.normalizeInstanceIdentifier(r.instanceIdentifier);
    if (this.isInitialized(a))
      throw Error(`${this.name}(${a}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const l = this.getOrInitializeService({
      instanceIdentifier: a,
      options: s,
    });
    for (const [d, f] of this.instancesDeferred.entries()) {
      const m = this.normalizeInstanceIdentifier(d);
      a === m && f.resolve(l);
    }
    return l;
  }
  onInit(r, s) {
    var a;
    const l = this.normalizeInstanceIdentifier(s),
      d =
        (a = this.onInitCallbacks.get(l)) !== null && a !== void 0
          ? a
          : new Set();
    d.add(r), this.onInitCallbacks.set(l, d);
    const f = this.instances.get(l);
    return (
      f && r(f, l),
      () => {
        d.delete(r);
      }
    );
  }
  invokeOnInitCallbacks(r, s) {
    const a = this.onInitCallbacks.get(s);
    if (a)
      for (const l of a)
        try {
          l(r, s);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: r, options: s = {} }) {
    let a = this.instances.get(r);
    if (
      !a &&
      this.component &&
      ((a = this.component.instanceFactory(this.container, {
        instanceIdentifier: Ky(r),
        options: s,
      })),
      this.instances.set(r, a),
      this.instancesOptions.set(r, s),
      this.invokeOnInitCallbacks(a, r),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, r, a);
      } catch {}
    return a || null;
  }
  normalizeInstanceIdentifier(r = In) {
    return this.component ? (this.component.multipleInstances ? r : In) : r;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Ky(i) {
  return i === In ? void 0 : i;
}
function Qy(i) {
  return i.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gy {
  constructor(r) {
    (this.name = r), (this.providers = new Map());
  }
  addComponent(r) {
    const s = this.getProvider(r.name);
    if (s.isComponentSet())
      throw new Error(
        `Component ${r.name} has already been registered with ${this.name}`,
      );
    s.setComponent(r);
  }
  addOrOverwriteComponent(r) {
    this.getProvider(r.name).isComponentSet() && this.providers.delete(r.name),
      this.addComponent(r);
  }
  getProvider(r) {
    if (this.providers.has(r)) return this.providers.get(r);
    const s = new qy(r, this);
    return this.providers.set(r, s), s;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Se;
(function (i) {
  (i[(i.DEBUG = 0)] = "DEBUG"),
    (i[(i.VERBOSE = 1)] = "VERBOSE"),
    (i[(i.INFO = 2)] = "INFO"),
    (i[(i.WARN = 3)] = "WARN"),
    (i[(i.ERROR = 4)] = "ERROR"),
    (i[(i.SILENT = 5)] = "SILENT");
})(Se || (Se = {}));
const Yy = {
    debug: Se.DEBUG,
    verbose: Se.VERBOSE,
    info: Se.INFO,
    warn: Se.WARN,
    error: Se.ERROR,
    silent: Se.SILENT,
  },
  Jy = Se.INFO,
  Xy = {
    [Se.DEBUG]: "log",
    [Se.VERBOSE]: "log",
    [Se.INFO]: "info",
    [Se.WARN]: "warn",
    [Se.ERROR]: "error",
  },
  Zy = (i, r, ...s) => {
    if (r < i.logLevel) return;
    const a = new Date().toISOString(),
      l = Xy[r];
    if (l) console[l](`[${a}]  ${i.name}:`, ...s);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${r})`,
      );
  };
class Vf {
  constructor(r) {
    (this.name = r),
      (this._logLevel = Jy),
      (this._logHandler = Zy),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(r) {
    if (!(r in Se))
      throw new TypeError(`Invalid value "${r}" assigned to \`logLevel\``);
    this._logLevel = r;
  }
  setLogLevel(r) {
    this._logLevel = typeof r == "string" ? Yy[r] : r;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(r) {
    if (typeof r != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = r;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(r) {
    this._userLogHandler = r;
  }
  debug(...r) {
    this._userLogHandler && this._userLogHandler(this, Se.DEBUG, ...r),
      this._logHandler(this, Se.DEBUG, ...r);
  }
  log(...r) {
    this._userLogHandler && this._userLogHandler(this, Se.VERBOSE, ...r),
      this._logHandler(this, Se.VERBOSE, ...r);
  }
  info(...r) {
    this._userLogHandler && this._userLogHandler(this, Se.INFO, ...r),
      this._logHandler(this, Se.INFO, ...r);
  }
  warn(...r) {
    this._userLogHandler && this._userLogHandler(this, Se.WARN, ...r),
      this._logHandler(this, Se.WARN, ...r);
  }
  error(...r) {
    this._userLogHandler && this._userLogHandler(this, Se.ERROR, ...r),
      this._logHandler(this, Se.ERROR, ...r);
  }
}
const e0 = (i, r) => r.some((s) => i instanceof s);
let Yd, Jd;
function t0() {
  return (
    Yd ||
    (Yd = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function n0() {
  return (
    Jd ||
    (Jd = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Hf = new WeakMap(),
  nl = new WeakMap(),
  Wf = new WeakMap(),
  Ua = new WeakMap(),
  hl = new WeakMap();
function r0(i) {
  const r = new Promise((s, a) => {
    const l = () => {
        i.removeEventListener("success", d), i.removeEventListener("error", f);
      },
      d = () => {
        s(un(i.result)), l();
      },
      f = () => {
        a(i.error), l();
      };
    i.addEventListener("success", d), i.addEventListener("error", f);
  });
  return (
    r
      .then((s) => {
        s instanceof IDBCursor && Hf.set(s, i);
      })
      .catch(() => {}),
    hl.set(r, i),
    r
  );
}
function i0(i) {
  if (nl.has(i)) return;
  const r = new Promise((s, a) => {
    const l = () => {
        i.removeEventListener("complete", d),
          i.removeEventListener("error", f),
          i.removeEventListener("abort", f);
      },
      d = () => {
        s(), l();
      },
      f = () => {
        a(i.error || new DOMException("AbortError", "AbortError")), l();
      };
    i.addEventListener("complete", d),
      i.addEventListener("error", f),
      i.addEventListener("abort", f);
  });
  nl.set(i, r);
}
let rl = {
  get(i, r, s) {
    if (i instanceof IDBTransaction) {
      if (r === "done") return nl.get(i);
      if (r === "objectStoreNames") return i.objectStoreNames || Wf.get(i);
      if (r === "store")
        return s.objectStoreNames[1]
          ? void 0
          : s.objectStore(s.objectStoreNames[0]);
    }
    return un(i[r]);
  },
  set(i, r, s) {
    return (i[r] = s), !0;
  },
  has(i, r) {
    return i instanceof IDBTransaction && (r === "done" || r === "store")
      ? !0
      : r in i;
  },
};
function s0(i) {
  rl = i(rl);
}
function o0(i) {
  return i === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (r, ...s) {
        const a = i.call(Va(this), r, ...s);
        return Wf.set(a, r.sort ? r.sort() : [r]), un(a);
      }
    : n0().includes(i)
      ? function (...r) {
          return i.apply(Va(this), r), un(Hf.get(this));
        }
      : function (...r) {
          return un(i.apply(Va(this), r));
        };
}
function a0(i) {
  return typeof i == "function"
    ? o0(i)
    : (i instanceof IDBTransaction && i0(i),
      e0(i, t0()) ? new Proxy(i, rl) : i);
}
function un(i) {
  if (i instanceof IDBRequest) return r0(i);
  if (Ua.has(i)) return Ua.get(i);
  const r = a0(i);
  return r !== i && (Ua.set(i, r), hl.set(r, i)), r;
}
const Va = (i) => hl.get(i);
function qf(i, r, { blocked: s, upgrade: a, blocking: l, terminated: d } = {}) {
  const f = indexedDB.open(i, r),
    m = un(f);
  return (
    a &&
      f.addEventListener("upgradeneeded", (h) => {
        a(un(f.result), h.oldVersion, h.newVersion, un(f.transaction), h);
      }),
    s && f.addEventListener("blocked", (h) => s(h.oldVersion, h.newVersion, h)),
    m
      .then((h) => {
        d && h.addEventListener("close", () => d()),
          l &&
            h.addEventListener("versionchange", (g) =>
              l(g.oldVersion, g.newVersion, g),
            );
      })
      .catch(() => {}),
    m
  );
}
const l0 = ["get", "getKey", "getAll", "getAllKeys", "count"],
  u0 = ["put", "add", "delete", "clear"],
  Ha = new Map();
function Xd(i, r) {
  if (!(i instanceof IDBDatabase && !(r in i) && typeof r == "string")) return;
  if (Ha.get(r)) return Ha.get(r);
  const s = r.replace(/FromIndex$/, ""),
    a = r !== s,
    l = u0.includes(s);
  if (
    !(s in (a ? IDBIndex : IDBObjectStore).prototype) ||
    !(l || l0.includes(s))
  )
    return;
  const d = async function (f, ...m) {
    const h = this.transaction(f, l ? "readwrite" : "readonly");
    let g = h.store;
    return (
      a && (g = g.index(m.shift())),
      (await Promise.all([g[s](...m), l && h.done]))[0]
    );
  };
  return Ha.set(r, d), d;
}
s0((i) => ({
  ...i,
  get: (r, s, a) => Xd(r, s) || i.get(r, s, a),
  has: (r, s) => !!Xd(r, s) || i.has(r, s),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class c0 {
  constructor(r) {
    this.container = r;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((s) => {
        if (d0(s)) {
          const a = s.getImmediate();
          return `${a.library}/${a.version}`;
        } else return null;
      })
      .filter((s) => s)
      .join(" ");
  }
}
function d0(i) {
  const r = i.getComponent();
  return (r == null ? void 0 : r.type) === "VERSION";
}
const il = "@firebase/app",
  Zd = "0.10.17";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bt = new Vf("@firebase/app"),
  f0 = "@firebase/app-compat",
  p0 = "@firebase/analytics-compat",
  h0 = "@firebase/analytics",
  m0 = "@firebase/app-check-compat",
  g0 = "@firebase/app-check",
  v0 = "@firebase/auth",
  y0 = "@firebase/auth-compat",
  x0 = "@firebase/database",
  w0 = "@firebase/data-connect",
  S0 = "@firebase/database-compat",
  k0 = "@firebase/functions",
  E0 = "@firebase/functions-compat",
  C0 = "@firebase/installations",
  N0 = "@firebase/installations-compat",
  b0 = "@firebase/messaging",
  I0 = "@firebase/messaging-compat",
  j0 = "@firebase/performance",
  T0 = "@firebase/performance-compat",
  L0 = "@firebase/remote-config",
  P0 = "@firebase/remote-config-compat",
  R0 = "@firebase/storage",
  _0 = "@firebase/storage-compat",
  O0 = "@firebase/firestore",
  A0 = "@firebase/vertexai",
  D0 = "@firebase/firestore-compat",
  M0 = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sl = "[DEFAULT]",
  z0 = {
    [il]: "fire-core",
    [f0]: "fire-core-compat",
    [h0]: "fire-analytics",
    [p0]: "fire-analytics-compat",
    [g0]: "fire-app-check",
    [m0]: "fire-app-check-compat",
    [v0]: "fire-auth",
    [y0]: "fire-auth-compat",
    [x0]: "fire-rtdb",
    [w0]: "fire-data-connect",
    [S0]: "fire-rtdb-compat",
    [k0]: "fire-fn",
    [E0]: "fire-fn-compat",
    [C0]: "fire-iid",
    [N0]: "fire-iid-compat",
    [b0]: "fire-fcm",
    [I0]: "fire-fcm-compat",
    [j0]: "fire-perf",
    [T0]: "fire-perf-compat",
    [L0]: "fire-rc",
    [P0]: "fire-rc-compat",
    [R0]: "fire-gcs",
    [_0]: "fire-gcs-compat",
    [O0]: "fire-fst",
    [D0]: "fire-fst-compat",
    [A0]: "fire-vertex",
    "fire-js": "fire-js",
    [M0]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ls = new Map(),
  $0 = new Map(),
  ol = new Map();
function ef(i, r) {
  try {
    i.container.addComponent(r);
  } catch (s) {
    Bt.debug(
      `Component ${r.name} failed to register with FirebaseApp ${i.name}`,
      s,
    );
  }
}
function Ln(i) {
  const r = i.name;
  if (ol.has(r))
    return (
      Bt.debug(`There were multiple attempts to register component ${r}.`), !1
    );
  ol.set(r, i);
  for (const s of Ls.values()) ef(s, i);
  for (const s of $0.values()) ef(s, i);
  return !0;
}
function Ms(i, r) {
  const s = i.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return s && s.triggerHeartbeat(), i.container.getProvider(r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const F0 = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  },
  cn = new Ds("app", "Firebase", F0);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class B0 {
  constructor(r, s, a) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, r)),
      (this._config = Object.assign({}, s)),
      (this._name = s.name),
      (this._automaticDataCollectionEnabled = s.automaticDataCollectionEnabled),
      (this._container = a),
      this.container.addComponent(new pn("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(r) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = r);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(r) {
    this._isDeleted = r;
  }
  checkDestroyed() {
    if (this.isDeleted) throw cn.create("app-deleted", { appName: this._name });
  }
}
function Kf(i, r = {}) {
  let s = i;
  typeof r != "object" && (r = { name: r });
  const a = Object.assign({ name: sl, automaticDataCollectionEnabled: !1 }, r),
    l = a.name;
  if (typeof l != "string" || !l)
    throw cn.create("bad-app-name", { appName: String(l) });
  if ((s || (s = $f()), !s)) throw cn.create("no-options");
  const d = Ls.get(l);
  if (d) {
    if (Ts(s, d.options) && Ts(a, d.config)) return d;
    throw cn.create("duplicate-app", { appName: l });
  }
  const f = new Gy(l);
  for (const h of ol.values()) f.addComponent(h);
  const m = new B0(s, a, f);
  return Ls.set(l, m), m;
}
function U0(i = sl) {
  const r = Ls.get(i);
  if (!r && i === sl && $f()) return Kf();
  if (!r) throw cn.create("no-app", { appName: i });
  return r;
}
function dn(i, r, s) {
  var a;
  let l = (a = z0[i]) !== null && a !== void 0 ? a : i;
  s && (l += `-${s}`);
  const d = l.match(/\s|\//),
    f = r.match(/\s|\//);
  if (d || f) {
    const m = [`Unable to register library "${l}" with version "${r}":`];
    d &&
      m.push(
        `library name "${l}" contains illegal characters (whitespace or "/")`,
      ),
      d && f && m.push("and"),
      f &&
        m.push(
          `version name "${r}" contains illegal characters (whitespace or "/")`,
        ),
      Bt.warn(m.join(" "));
    return;
  }
  Ln(new pn(`${l}-version`, () => ({ library: l, version: r }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const V0 = "firebase-heartbeat-database",
  H0 = 1,
  oi = "firebase-heartbeat-store";
let Wa = null;
function Qf() {
  return (
    Wa ||
      (Wa = qf(V0, H0, {
        upgrade: (i, r) => {
          switch (r) {
            case 0:
              try {
                i.createObjectStore(oi);
              } catch (s) {
                console.warn(s);
              }
          }
        },
      }).catch((i) => {
        throw cn.create("idb-open", { originalErrorMessage: i.message });
      })),
    Wa
  );
}
async function W0(i) {
  try {
    const s = (await Qf()).transaction(oi),
      a = await s.objectStore(oi).get(Gf(i));
    return await s.done, a;
  } catch (r) {
    if (r instanceof On) Bt.warn(r.message);
    else {
      const s = cn.create("idb-get", {
        originalErrorMessage: r == null ? void 0 : r.message,
      });
      Bt.warn(s.message);
    }
  }
}
async function tf(i, r) {
  try {
    const a = (await Qf()).transaction(oi, "readwrite");
    await a.objectStore(oi).put(r, Gf(i)), await a.done;
  } catch (s) {
    if (s instanceof On) Bt.warn(s.message);
    else {
      const a = cn.create("idb-set", {
        originalErrorMessage: s == null ? void 0 : s.message,
      });
      Bt.warn(a.message);
    }
  }
}
function Gf(i) {
  return `${i.name}!${i.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const q0 = 1024,
  K0 = 30 * 24 * 60 * 60 * 1e3;
class Q0 {
  constructor(r) {
    (this.container = r), (this._heartbeatsCache = null);
    const s = this.container.getProvider("app").getImmediate();
    (this._storage = new Y0(s)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((a) => ((this._heartbeatsCache = a), a)));
  }
  async triggerHeartbeat() {
    var r, s;
    try {
      const l = this.container
          .getProvider("platform-logger")
          .getImmediate()
          .getPlatformInfoString(),
        d = nf();
      return (((r = this._heartbeatsCache) === null || r === void 0
        ? void 0
        : r.heartbeats) == null &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        ((s = this._heartbeatsCache) === null || s === void 0
          ? void 0
          : s.heartbeats) == null)) ||
        this._heartbeatsCache.lastSentHeartbeatDate === d ||
        this._heartbeatsCache.heartbeats.some((f) => f.date === d)
        ? void 0
        : (this._heartbeatsCache.heartbeats.push({ date: d, agent: l }),
          (this._heartbeatsCache.heartbeats =
            this._heartbeatsCache.heartbeats.filter((f) => {
              const m = new Date(f.date).valueOf();
              return Date.now() - m <= K0;
            })),
          this._storage.overwrite(this._heartbeatsCache));
    } catch (a) {
      Bt.warn(a);
    }
  }
  async getHeartbeatsHeader() {
    var r;
    try {
      if (
        (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
        ((r = this._heartbeatsCache) === null || r === void 0
          ? void 0
          : r.heartbeats) == null ||
          this._heartbeatsCache.heartbeats.length === 0)
      )
        return "";
      const s = nf(),
        { heartbeatsToSend: a, unsentEntries: l } = G0(
          this._heartbeatsCache.heartbeats,
        ),
        d = zf(JSON.stringify({ version: 2, heartbeats: a }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = s),
        l.length > 0
          ? ((this._heartbeatsCache.heartbeats = l),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        d
      );
    } catch (s) {
      return Bt.warn(s), "";
    }
  }
}
function nf() {
  return new Date().toISOString().substring(0, 10);
}
function G0(i, r = q0) {
  const s = [];
  let a = i.slice();
  for (const l of i) {
    const d = s.find((f) => f.agent === l.agent);
    if (d) {
      if ((d.dates.push(l.date), rf(s) > r)) {
        d.dates.pop();
        break;
      }
    } else if ((s.push({ agent: l.agent, dates: [l.date] }), rf(s) > r)) {
      s.pop();
      break;
    }
    a = a.slice(1);
  }
  return { heartbeatsToSend: s, unsentEntries: a };
}
class Y0 {
  constructor(r) {
    (this.app = r),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return Ff()
      ? Bf()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const s = await W0(this.app);
      return s != null && s.heartbeats ? s : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(r) {
    var s;
    if (await this._canUseIndexedDBPromise) {
      const l = await this.read();
      return tf(this.app, {
        lastSentHeartbeatDate:
          (s = r.lastSentHeartbeatDate) !== null && s !== void 0
            ? s
            : l.lastSentHeartbeatDate,
        heartbeats: r.heartbeats,
      });
    } else return;
  }
  async add(r) {
    var s;
    if (await this._canUseIndexedDBPromise) {
      const l = await this.read();
      return tf(this.app, {
        lastSentHeartbeatDate:
          (s = r.lastSentHeartbeatDate) !== null && s !== void 0
            ? s
            : l.lastSentHeartbeatDate,
        heartbeats: [...l.heartbeats, ...r.heartbeats],
      });
    } else return;
  }
}
function rf(i) {
  return zf(JSON.stringify({ version: 2, heartbeats: i })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function J0(i) {
  Ln(new pn("platform-logger", (r) => new c0(r), "PRIVATE")),
    Ln(new pn("heartbeat", (r) => new Q0(r), "PRIVATE")),
    dn(il, Zd, i),
    dn(il, Zd, "esm2017"),
    dn("fire-js", "");
}
J0("");
var X0 = "firebase",
  Z0 = "11.1.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ dn(X0, Z0, "app");
const Yf = "@firebase/installations",
  ml = "0.6.11";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Jf = 1e4,
  Xf = `w:${ml}`,
  Zf = "FIS_v2",
  ex = "https://firebaseinstallations.googleapis.com/v1",
  tx = 60 * 60 * 1e3,
  nx = "installations",
  rx = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ix = {
    "missing-app-config-values":
      'Missing App configuration value: "{$valueName}"',
    "not-registered": "Firebase Installation is not registered.",
    "installation-not-found": "Firebase Installation not found.",
    "request-failed":
      '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    "app-offline": "Could not process request. Application offline.",
    "delete-pending-registration":
      "Can't delete installation while there is a pending registration request.",
  },
  Pn = new Ds(nx, rx, ix);
function ep(i) {
  return i instanceof On && i.code.includes("request-failed");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tp({ projectId: i }) {
  return `${ex}/projects/${i}/installations`;
}
function np(i) {
  return {
    token: i.token,
    requestStatus: 2,
    expiresIn: ox(i.expiresIn),
    creationTime: Date.now(),
  };
}
async function rp(i, r) {
  const a = (await r.json()).error;
  return Pn.create("request-failed", {
    requestName: i,
    serverCode: a.code,
    serverMessage: a.message,
    serverStatus: a.status,
  });
}
function ip({ apiKey: i }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": i,
  });
}
function sx(i, { refreshToken: r }) {
  const s = ip(i);
  return s.append("Authorization", ax(r)), s;
}
async function sp(i) {
  const r = await i();
  return r.status >= 500 && r.status < 600 ? i() : r;
}
function ox(i) {
  return Number(i.replace("s", "000"));
}
function ax(i) {
  return `${Zf} ${i}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function lx(
  { appConfig: i, heartbeatServiceProvider: r },
  { fid: s },
) {
  const a = tp(i),
    l = ip(i),
    d = r.getImmediate({ optional: !0 });
  if (d) {
    const g = await d.getHeartbeatsHeader();
    g && l.append("x-firebase-client", g);
  }
  const f = { fid: s, authVersion: Zf, appId: i.appId, sdkVersion: Xf },
    m = { method: "POST", headers: l, body: JSON.stringify(f) },
    h = await sp(() => fetch(a, m));
  if (h.ok) {
    const g = await h.json();
    return {
      fid: g.fid || s,
      registrationStatus: 2,
      refreshToken: g.refreshToken,
      authToken: np(g.authToken),
    };
  } else throw await rp("Create Installation", h);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function op(i) {
  return new Promise((r) => {
    setTimeout(r, i);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ux(i) {
  return btoa(String.fromCharCode(...i))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const cx = /^[cdef][\w-]{21}$/,
  al = "";
function dx() {
  try {
    const i = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(i),
      (i[0] = 112 + (i[0] % 16));
    const s = fx(i);
    return cx.test(s) ? s : al;
  } catch {
    return al;
  }
}
function fx(i) {
  return ux(i).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function zs(i) {
  return `${i.appName}!${i.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ap = new Map();
function lp(i, r) {
  const s = zs(i);
  up(s, r), px(s, r);
}
function up(i, r) {
  const s = ap.get(i);
  if (s) for (const a of s) a(r);
}
function px(i, r) {
  const s = hx();
  s && s.postMessage({ key: i, fid: r }), mx();
}
let jn = null;
function hx() {
  return (
    !jn &&
      "BroadcastChannel" in self &&
      ((jn = new BroadcastChannel("[Firebase] FID Change")),
      (jn.onmessage = (i) => {
        up(i.data.key, i.data.fid);
      })),
    jn
  );
}
function mx() {
  ap.size === 0 && jn && (jn.close(), (jn = null));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gx = "firebase-installations-database",
  vx = 1,
  Rn = "firebase-installations-store";
let qa = null;
function gl() {
  return (
    qa ||
      (qa = qf(gx, vx, {
        upgrade: (i, r) => {
          switch (r) {
            case 0:
              i.createObjectStore(Rn);
          }
        },
      })),
    qa
  );
}
async function Ps(i, r) {
  const s = zs(i),
    l = (await gl()).transaction(Rn, "readwrite"),
    d = l.objectStore(Rn),
    f = await d.get(s);
  return (
    await d.put(r, s), await l.done, (!f || f.fid !== r.fid) && lp(i, r.fid), r
  );
}
async function cp(i) {
  const r = zs(i),
    a = (await gl()).transaction(Rn, "readwrite");
  await a.objectStore(Rn).delete(r), await a.done;
}
async function $s(i, r) {
  const s = zs(i),
    l = (await gl()).transaction(Rn, "readwrite"),
    d = l.objectStore(Rn),
    f = await d.get(s),
    m = r(f);
  return (
    m === void 0 ? await d.delete(s) : await d.put(m, s),
    await l.done,
    m && (!f || f.fid !== m.fid) && lp(i, m.fid),
    m
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function vl(i) {
  let r;
  const s = await $s(i.appConfig, (a) => {
    const l = yx(a),
      d = xx(i, l);
    return (r = d.registrationPromise), d.installationEntry;
  });
  return s.fid === al
    ? { installationEntry: await r }
    : { installationEntry: s, registrationPromise: r };
}
function yx(i) {
  const r = i || { fid: dx(), registrationStatus: 0 };
  return dp(r);
}
function xx(i, r) {
  if (r.registrationStatus === 0) {
    if (!navigator.onLine) {
      const l = Promise.reject(Pn.create("app-offline"));
      return { installationEntry: r, registrationPromise: l };
    }
    const s = {
        fid: r.fid,
        registrationStatus: 1,
        registrationTime: Date.now(),
      },
      a = wx(i, s);
    return { installationEntry: s, registrationPromise: a };
  } else
    return r.registrationStatus === 1
      ? { installationEntry: r, registrationPromise: Sx(i) }
      : { installationEntry: r };
}
async function wx(i, r) {
  try {
    const s = await lx(i, r);
    return Ps(i.appConfig, s);
  } catch (s) {
    throw (
      (ep(s) && s.customData.serverCode === 409
        ? await cp(i.appConfig)
        : await Ps(i.appConfig, { fid: r.fid, registrationStatus: 0 }),
      s)
    );
  }
}
async function Sx(i) {
  let r = await sf(i.appConfig);
  for (; r.registrationStatus === 1; )
    await op(100), (r = await sf(i.appConfig));
  if (r.registrationStatus === 0) {
    const { installationEntry: s, registrationPromise: a } = await vl(i);
    return a || s;
  }
  return r;
}
function sf(i) {
  return $s(i, (r) => {
    if (!r) throw Pn.create("installation-not-found");
    return dp(r);
  });
}
function dp(i) {
  return kx(i) ? { fid: i.fid, registrationStatus: 0 } : i;
}
function kx(i) {
  return i.registrationStatus === 1 && i.registrationTime + Jf < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Ex({ appConfig: i, heartbeatServiceProvider: r }, s) {
  const a = Cx(i, s),
    l = sx(i, s),
    d = r.getImmediate({ optional: !0 });
  if (d) {
    const g = await d.getHeartbeatsHeader();
    g && l.append("x-firebase-client", g);
  }
  const f = { installation: { sdkVersion: Xf, appId: i.appId } },
    m = { method: "POST", headers: l, body: JSON.stringify(f) },
    h = await sp(() => fetch(a, m));
  if (h.ok) {
    const g = await h.json();
    return np(g);
  } else throw await rp("Generate Auth Token", h);
}
function Cx(i, { fid: r }) {
  return `${tp(i)}/${r}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function yl(i, r = !1) {
  let s;
  const a = await $s(i.appConfig, (d) => {
    if (!fp(d)) throw Pn.create("not-registered");
    const f = d.authToken;
    if (!r && Ix(f)) return d;
    if (f.requestStatus === 1) return (s = Nx(i, r)), d;
    {
      if (!navigator.onLine) throw Pn.create("app-offline");
      const m = Tx(d);
      return (s = bx(i, m)), m;
    }
  });
  return s ? await s : a.authToken;
}
async function Nx(i, r) {
  let s = await of(i.appConfig);
  for (; s.authToken.requestStatus === 1; )
    await op(100), (s = await of(i.appConfig));
  const a = s.authToken;
  return a.requestStatus === 0 ? yl(i, r) : a;
}
function of(i) {
  return $s(i, (r) => {
    if (!fp(r)) throw Pn.create("not-registered");
    const s = r.authToken;
    return Lx(s)
      ? Object.assign(Object.assign({}, r), { authToken: { requestStatus: 0 } })
      : r;
  });
}
async function bx(i, r) {
  try {
    const s = await Ex(i, r),
      a = Object.assign(Object.assign({}, r), { authToken: s });
    return await Ps(i.appConfig, a), s;
  } catch (s) {
    if (
      ep(s) &&
      (s.customData.serverCode === 401 || s.customData.serverCode === 404)
    )
      await cp(i.appConfig);
    else {
      const a = Object.assign(Object.assign({}, r), {
        authToken: { requestStatus: 0 },
      });
      await Ps(i.appConfig, a);
    }
    throw s;
  }
}
function fp(i) {
  return i !== void 0 && i.registrationStatus === 2;
}
function Ix(i) {
  return i.requestStatus === 2 && !jx(i);
}
function jx(i) {
  const r = Date.now();
  return r < i.creationTime || i.creationTime + i.expiresIn < r + tx;
}
function Tx(i) {
  const r = { requestStatus: 1, requestTime: Date.now() };
  return Object.assign(Object.assign({}, i), { authToken: r });
}
function Lx(i) {
  return i.requestStatus === 1 && i.requestTime + Jf < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Px(i) {
  const r = i,
    { installationEntry: s, registrationPromise: a } = await vl(r);
  return a ? a.catch(console.error) : yl(r).catch(console.error), s.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Rx(i, r = !1) {
  const s = i;
  return await _x(s), (await yl(s, r)).token;
}
async function _x(i) {
  const { registrationPromise: r } = await vl(i);
  r && (await r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ox(i) {
  if (!i || !i.options) throw Ka("App Configuration");
  if (!i.name) throw Ka("App Name");
  const r = ["projectId", "apiKey", "appId"];
  for (const s of r) if (!i.options[s]) throw Ka(s);
  return {
    appName: i.name,
    projectId: i.options.projectId,
    apiKey: i.options.apiKey,
    appId: i.options.appId,
  };
}
function Ka(i) {
  return Pn.create("missing-app-config-values", { valueName: i });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pp = "installations",
  Ax = "installations-internal",
  Dx = (i) => {
    const r = i.getProvider("app").getImmediate(),
      s = Ox(r),
      a = Ms(r, "heartbeat");
    return {
      app: r,
      appConfig: s,
      heartbeatServiceProvider: a,
      _delete: () => Promise.resolve(),
    };
  },
  Mx = (i) => {
    const r = i.getProvider("app").getImmediate(),
      s = Ms(r, pp).getImmediate();
    return { getId: () => Px(s), getToken: (l) => Rx(s, l) };
  };
function zx() {
  Ln(new pn(pp, Dx, "PUBLIC")), Ln(new pn(Ax, Mx, "PRIVATE"));
}
zx();
dn(Yf, ml);
dn(Yf, ml, "esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Rs = "analytics",
  $x = "firebase_id",
  Fx = "origin",
  Bx = 60 * 1e3,
  Ux =
    "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",
  xl = "https://www.googletagmanager.com/gtag/js";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const nt = new Vf("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vx = {
    "already-exists":
      "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
    "already-initialized":
      "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.",
    "already-initialized-settings":
      "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
    "interop-component-reg-failed":
      "Firebase Analytics Interop Component failed to instantiate: {$reason}",
    "invalid-analytics-context":
      "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "indexeddb-unavailable":
      "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "fetch-throttle":
      "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
    "config-fetch-failed":
      "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
    "no-api-key":
      'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
    "no-app-id":
      'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
    "no-client-id": 'The "client_id" field is empty.',
    "invalid-gtag-resource":
      "Trusted Types detected an invalid gtag resource: {$gtagURL}.",
  },
  lt = new Ds("analytics", "Analytics", Vx);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hx(i) {
  if (!i.startsWith(xl)) {
    const r = lt.create("invalid-gtag-resource", { gtagURL: i });
    return nt.warn(r.message), "";
  }
  return i;
}
function hp(i) {
  return Promise.all(i.map((r) => r.catch((s) => s)));
}
function Wx(i, r) {
  let s;
  return window.trustedTypes && (s = window.trustedTypes.createPolicy(i, r)), s;
}
function qx(i, r) {
  const s = Wx("firebase-js-sdk-policy", { createScriptURL: Hx }),
    a = document.createElement("script"),
    l = `${xl}?l=${i}&id=${r}`;
  (a.src = s ? (s == null ? void 0 : s.createScriptURL(l)) : l),
    (a.async = !0),
    document.head.appendChild(a);
}
function Kx(i) {
  let r = [];
  return Array.isArray(window[i]) ? (r = window[i]) : (window[i] = r), r;
}
async function Qx(i, r, s, a, l, d) {
  const f = a[l];
  try {
    if (f) await r[f];
    else {
      const h = (await hp(s)).find((g) => g.measurementId === l);
      h && (await r[h.appId]);
    }
  } catch (m) {
    nt.error(m);
  }
  i("config", l, d);
}
async function Gx(i, r, s, a, l) {
  try {
    let d = [];
    if (l && l.send_to) {
      let f = l.send_to;
      Array.isArray(f) || (f = [f]);
      const m = await hp(s);
      for (const h of f) {
        const g = m.find((E) => E.measurementId === h),
          S = g && r[g.appId];
        if (S) d.push(S);
        else {
          d = [];
          break;
        }
      }
    }
    d.length === 0 && (d = Object.values(r)),
      await Promise.all(d),
      i("event", a, l || {});
  } catch (d) {
    nt.error(d);
  }
}
function Yx(i, r, s, a) {
  async function l(d, ...f) {
    try {
      if (d === "event") {
        const [m, h] = f;
        await Gx(i, r, s, m, h);
      } else if (d === "config") {
        const [m, h] = f;
        await Qx(i, r, s, a, m, h);
      } else if (d === "consent") {
        const [m, h] = f;
        i("consent", m, h);
      } else if (d === "get") {
        const [m, h, g] = f;
        i("get", m, h, g);
      } else if (d === "set") {
        const [m] = f;
        i("set", m);
      } else i(d, ...f);
    } catch (m) {
      nt.error(m);
    }
  }
  return l;
}
function Jx(i, r, s, a, l) {
  let d = function (...f) {
    window[a].push(arguments);
  };
  return (
    window[l] && typeof window[l] == "function" && (d = window[l]),
    (window[l] = Yx(d, i, r, s)),
    { gtagCore: d, wrappedGtag: window[l] }
  );
}
function Xx(i) {
  const r = window.document.getElementsByTagName("script");
  for (const s of Object.values(r))
    if (s.src && s.src.includes(xl) && s.src.includes(i)) return s;
  return null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Zx = 30,
  ew = 1e3;
class tw {
  constructor(r = {}, s = ew) {
    (this.throttleMetadata = r), (this.intervalMillis = s);
  }
  getThrottleMetadata(r) {
    return this.throttleMetadata[r];
  }
  setThrottleMetadata(r, s) {
    this.throttleMetadata[r] = s;
  }
  deleteThrottleMetadata(r) {
    delete this.throttleMetadata[r];
  }
}
const mp = new tw();
function nw(i) {
  return new Headers({ Accept: "application/json", "x-goog-api-key": i });
}
async function rw(i) {
  var r;
  const { appId: s, apiKey: a } = i,
    l = { method: "GET", headers: nw(a) },
    d = Ux.replace("{app-id}", s),
    f = await fetch(d, l);
  if (f.status !== 200 && f.status !== 304) {
    let m = "";
    try {
      const h = await f.json();
      !((r = h.error) === null || r === void 0) &&
        r.message &&
        (m = h.error.message);
    } catch {}
    throw lt.create("config-fetch-failed", {
      httpStatus: f.status,
      responseMessage: m,
    });
  }
  return f.json();
}
async function iw(i, r = mp, s) {
  const { appId: a, apiKey: l, measurementId: d } = i.options;
  if (!a) throw lt.create("no-app-id");
  if (!l) {
    if (d) return { measurementId: d, appId: a };
    throw lt.create("no-api-key");
  }
  const f = r.getThrottleMetadata(a) || {
      backoffCount: 0,
      throttleEndTimeMillis: Date.now(),
    },
    m = new aw();
  return (
    setTimeout(async () => {
      m.abort();
    }, Bx),
    gp({ appId: a, apiKey: l, measurementId: d }, f, m, r)
  );
}
async function gp(i, { throttleEndTimeMillis: r, backoffCount: s }, a, l = mp) {
  var d;
  const { appId: f, measurementId: m } = i;
  try {
    await sw(a, r);
  } catch (h) {
    if (m)
      return (
        nt.warn(
          `Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${m} provided in the "measurementId" field in the local Firebase config. [${h == null ? void 0 : h.message}]`,
        ),
        { appId: f, measurementId: m }
      );
    throw h;
  }
  try {
    const h = await rw(i);
    return l.deleteThrottleMetadata(f), h;
  } catch (h) {
    const g = h;
    if (!ow(g)) {
      if ((l.deleteThrottleMetadata(f), m))
        return (
          nt.warn(
            `Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${m} provided in the "measurementId" field in the local Firebase config. [${g == null ? void 0 : g.message}]`,
          ),
          { appId: f, measurementId: m }
        );
      throw h;
    }
    const S =
        Number(
          (d = g == null ? void 0 : g.customData) === null || d === void 0
            ? void 0
            : d.httpStatus,
        ) === 503
          ? Gd(s, l.intervalMillis, Zx)
          : Gd(s, l.intervalMillis),
      E = { throttleEndTimeMillis: Date.now() + S, backoffCount: s + 1 };
    return (
      l.setThrottleMetadata(f, E),
      nt.debug(`Calling attemptFetch again in ${S} millis`),
      gp(i, E, a, l)
    );
  }
}
function sw(i, r) {
  return new Promise((s, a) => {
    const l = Math.max(r - Date.now(), 0),
      d = setTimeout(s, l);
    i.addEventListener(() => {
      clearTimeout(d),
        a(lt.create("fetch-throttle", { throttleEndTimeMillis: r }));
    });
  });
}
function ow(i) {
  if (!(i instanceof On) || !i.customData) return !1;
  const r = Number(i.customData.httpStatus);
  return r === 429 || r === 500 || r === 503 || r === 504;
}
class aw {
  constructor() {
    this.listeners = [];
  }
  addEventListener(r) {
    this.listeners.push(r);
  }
  abort() {
    this.listeners.forEach((r) => r());
  }
}
async function lw(i, r, s, a, l) {
  if (l && l.global) {
    i("event", s, a);
    return;
  } else {
    const d = await r,
      f = Object.assign(Object.assign({}, a), { send_to: d });
    i("event", s, f);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function uw() {
  if (Ff())
    try {
      await Bf();
    } catch (i) {
      return (
        nt.warn(
          lt.create("indexeddb-unavailable", {
            errorInfo: i == null ? void 0 : i.toString(),
          }).message,
        ),
        !1
      );
    }
  else
    return (
      nt.warn(
        lt.create("indexeddb-unavailable", {
          errorInfo: "IndexedDB is not available in this environment.",
        }).message,
      ),
      !1
    );
  return !0;
}
async function cw(i, r, s, a, l, d, f) {
  var m;
  const h = iw(i);
  h
    .then((T) => {
      (s[T.measurementId] = T.appId),
        i.options.measurementId &&
          T.measurementId !== i.options.measurementId &&
          nt.warn(
            `The measurement ID in the local Firebase config (${i.options.measurementId}) does not match the measurement ID fetched from the server (${T.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`,
          );
    })
    .catch((T) => nt.error(T)),
    r.push(h);
  const g = uw().then((T) => {
      if (T) return a.getId();
    }),
    [S, E] = await Promise.all([h, g]);
  Xx(d) || qx(d, S.measurementId), l("js", new Date());
  const x =
    (m = f == null ? void 0 : f.config) !== null && m !== void 0 ? m : {};
  return (
    (x[Fx] = "firebase"),
    (x.update = !0),
    E != null && (x[$x] = E),
    l("config", S.measurementId, x),
    S.measurementId
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dw {
  constructor(r) {
    this.app = r;
  }
  _delete() {
    return delete ri[this.app.options.appId], Promise.resolve();
  }
}
let ri = {},
  af = [];
const lf = {};
let Qa = "dataLayer",
  fw = "gtag",
  uf,
  vp,
  cf = !1;
function pw() {
  const i = [];
  if (
    (My() && i.push("This is a browser extension environment."),
    zy() || i.push("Cookies are not available."),
    i.length > 0)
  ) {
    const r = i.map((a, l) => `(${l + 1}) ${a}`).join(" "),
      s = lt.create("invalid-analytics-context", { errorInfo: r });
    nt.warn(s.message);
  }
}
function hw(i, r, s) {
  pw();
  const a = i.options.appId;
  if (!a) throw lt.create("no-app-id");
  if (!i.options.apiKey)
    if (i.options.measurementId)
      nt.warn(
        `The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${i.options.measurementId} provided in the "measurementId" field in the local Firebase config.`,
      );
    else throw lt.create("no-api-key");
  if (ri[a] != null) throw lt.create("already-exists", { id: a });
  if (!cf) {
    Kx(Qa);
    const { wrappedGtag: d, gtagCore: f } = Jx(ri, af, lf, Qa, fw);
    (vp = d), (uf = f), (cf = !0);
  }
  return (ri[a] = cw(i, af, lf, r, uf, Qa, s)), new dw(i);
}
function mw(i = U0()) {
  i = Uf(i);
  const r = Ms(i, Rs);
  return r.isInitialized() ? r.getImmediate() : gw(i);
}
function gw(i, r = {}) {
  const s = Ms(i, Rs);
  if (s.isInitialized()) {
    const l = s.getImmediate();
    if (Ts(r, s.getOptions())) return l;
    throw lt.create("already-initialized");
  }
  return s.initialize({ options: r });
}
function vw(i, r, s, a) {
  (i = Uf(i)),
    lw(vp, ri[i.app.options.appId], r, s, a).catch((l) => nt.error(l));
}
const df = "@firebase/analytics",
  ff = "0.10.10";
function yw() {
  Ln(
    new pn(
      Rs,
      (r, { options: s }) => {
        const a = r.getProvider("app").getImmediate(),
          l = r.getProvider("installations-internal").getImmediate();
        return hw(a, l, s);
      },
      "PUBLIC",
    ),
  ),
    Ln(new pn("analytics-internal", i, "PRIVATE")),
    dn(df, ff),
    dn(df, ff, "esm2017");
  function i(r) {
    try {
      const s = r.getProvider(Rs).getImmediate();
      return { logEvent: (a, l, d) => vw(s, a, l, d) };
    } catch (s) {
      throw lt.create("interop-component-reg-failed", { reason: s });
    }
  }
}
yw();
const xw = {
    apiKey: "AIzaSyDcS6ugm3ikZLUn_W72ZSs1yhj4OuoeAnc",
    authDomain: "legal-boutique-advisers-bf25a.firebaseapp.com",
    projectId: "legal-boutique-advisers-bf25a",
    storageBucket: "legal-boutique-advisers-bf25a.firebasestorage.app",
    messagingSenderId: "349550465017",
    appId: "1:349550465017:web:e1e07f7f7850f8d7bcb728",
    measurementId: "G-X730YGS783",
  },
  ww = Kf(xw);
mw(ww);
const Sw = () =>
  v.jsxs(Dg, {
    children: [
      v.jsx(cv, {}),
      v.jsxs(fg, {
        children: [
          v.jsx(lr, { path: "/", element: v.jsx(fv, {}) }),
          v.jsx(lr, { path: "/invest_and_plan", element: v.jsx(vv, {}) }),
          v.jsx(lr, {
            path: "/corporate_responsibility",
            element: v.jsx(yv, {}),
          }),
          v.jsx(lr, { path: "/about", element: v.jsx(xv, {}) }),
          v.jsx(lr, { path: "/contact", element: v.jsx(wv, {}) }),
        ],
      }),
      v.jsx(dv, {}),
    ],
  });
Sm.createRoot(document.getElementById("root")).render(
  v.jsx(P.StrictMode, { children: v.jsx(Sw, {}) }),
);
