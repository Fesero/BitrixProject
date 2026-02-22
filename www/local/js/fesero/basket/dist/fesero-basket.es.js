// @__NO_SIDE_EFFECTS__
function ht(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ee = Object.freeze({}), Xt = Object.freeze([]), Ee = () => {
}, fu = () => !1, Mn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), cr = (e) => e.startsWith("onUpdate:"), de = Object.assign, ko = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ya = Object.prototype.hasOwnProperty, Y = (e, t) => ya.call(e, t), B = Array.isArray, Ft = (e) => wr(e) === "[object Map]", du = (e) => wr(e) === "[object Set]", j = (e) => typeof e == "function", ae = (e) => typeof e == "string", Tt = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Fo = (e) => (te(e) || j(e)) && j(e.then) && j(e.catch), pu = Object.prototype.toString, wr = (e) => pu.call(e), Vo = (e) => wr(e).slice(8, -1), hu = (e) => wr(e) === "[object Object]", Cr = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, yn = /* @__PURE__ */ ht(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), va = /* @__PURE__ */ ht(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Ar = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ba = /-\w/g, Be = Ar(
  (e) => e.replace(ba, (t) => t.slice(1).toUpperCase())
), Sa = /\B([A-Z])/g, wt = Ar(
  (e) => e.replace(Sa, "-$1").toLowerCase()
), Tr = Ar((e) => e.charAt(0).toUpperCase() + e.slice(1)), Dt = Ar(
  (e) => e ? `on${Tr(e)}` : ""
), Ot = (e, t) => !Object.is(e, t), fn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, fr = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Oa = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Es;
const Un = () => Es || (Es = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function No(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ae(r) ? Ta(r) : No(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if (ae(e) || te(e))
    return e;
}
const wa = /;(?![^(]*\))/g, Ca = /:([^]+)/, Aa = /\/\*[^]*?\*\//g;
function Ta(e) {
  const t = {};
  return e.replace(Aa, "").split(wa).forEach((n) => {
    if (n) {
      const r = n.split(Ca);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function $o(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const r = $o(e[n]);
      r && (t += r + " ");
    }
  else if (te(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const xa = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Ia = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Da = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Pa = /* @__PURE__ */ ht(xa), Ra = /* @__PURE__ */ ht(Ia), ka = /* @__PURE__ */ ht(Da), Fa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Va = /* @__PURE__ */ ht(Fa);
function _u(e) {
  return !!e || e === "";
}
const gu = (e) => !!(e && e.__v_isRef === !0), _n = (e) => ae(e) ? e : e == null ? "" : B(e) || te(e) && (e.toString === pu || !j(e.toString)) ? gu(e) ? _n(e.value) : JSON.stringify(e, mu, 2) : String(e), mu = (e, t) => gu(t) ? mu(e, t.value) : Ft(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, o], s) => (n[Br(r, s) + " =>"] = o, n),
    {}
  )
} : du(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Br(n))
} : Tt(t) ? Br(t) : te(t) && !B(t) && !hu(t) ? String(t) : t, Br = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
var Na = { NODE_ENV: '"production"' };
function Ne(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ge;
class Eu {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ge, !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    } else
      Ne("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (ge = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function yu(e) {
  return new Eu(e);
}
function vu() {
  return ge;
}
function $a(e, t = !1) {
  ge ? ge.cleanups.push(e) : t || Ne(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let X;
const jr = /* @__PURE__ */ new WeakSet();
class bu {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && ge.active && ge.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, jr.has(this) && (jr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ou(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ys(this), wu(this);
    const t = X, n = je;
    X = this, je = !0;
    try {
      return this.fn();
    } finally {
      X !== this && Ne(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Cu(this), X = t, je = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Uo(t);
      this.deps = this.depsTail = void 0, ys(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? jr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    no(this) && this.run();
  }
  get dirty() {
    return no(this);
  }
}
let Su = 0, vn, bn;
function Ou(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = bn, bn = e;
    return;
  }
  e.next = vn, vn = e;
}
function Lo() {
  Su++;
}
function Mo() {
  if (--Su > 0)
    return;
  if (bn) {
    let t = bn;
    for (bn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; vn; ) {
    let t = vn;
    for (vn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function wu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Cu(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Uo(r), La(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function no(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Au(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Au(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === xn) || (e.globalVersion = xn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !no(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = X, r = je;
  X = e, je = !0;
  try {
    wu(e);
    const o = e.fn(e._value);
    (t.version === 0 || Ot(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    X = n, je = r, Cu(e), e.flags &= -3;
  }
}
function Uo(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subsHead === e && (n.subsHead = o), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      Uo(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function La(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let je = !0;
const Tu = [];
function He() {
  Tu.push(je), je = !1;
}
function Ke() {
  const e = Tu.pop();
  je = e === void 0 ? !0 : e;
}
function ys(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = X;
    X = void 0;
    try {
      t();
    } finally {
      X = n;
    }
  }
}
let xn = 0;
class Ma {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Bo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, this.subsHead = void 0;
  }
  track(t) {
    if (!X || !je || X === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== X)
      n = this.activeLink = new Ma(X, this), X.deps ? (n.prevDep = X.depsTail, X.depsTail.nextDep = n, X.depsTail = n) : X.deps = X.depsTail = n, xu(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = X.depsTail, n.nextDep = void 0, X.depsTail.nextDep = n, X.depsTail = n, X.deps === n && (X.deps = r);
    }
    return X.onTrack && X.onTrack(
      de(
        {
          effect: X
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, xn++, this.notify(t);
  }
  notify(t) {
    Lo();
    try {
      if (Na.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            de(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Mo();
    }
  }
}
function xu(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep)
        xu(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const dr = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ Symbol(
  "Object iterate"
), ro = /* @__PURE__ */ Symbol(
  "Map keys iterate"
), In = /* @__PURE__ */ Symbol(
  "Array iterate"
);
function _e(e, t, n) {
  if (je && X) {
    let r = dr.get(e);
    r || dr.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new Bo()), o.map = r, o.key = n), o.track({
      target: e,
      type: t,
      key: n
    });
  }
}
function Qe(e, t, n, r, o, s) {
  const i = dr.get(e);
  if (!i) {
    xn++;
    return;
  }
  const u = (l) => {
    l && l.trigger({
      target: e,
      type: t,
      key: n,
      newValue: r,
      oldValue: o,
      oldTarget: s
    });
  };
  if (Lo(), t === "clear")
    i.forEach(u);
  else {
    const l = B(e), d = l && Cr(n);
    if (l && n === "length") {
      const f = Number(r);
      i.forEach((a, h) => {
        (h === "length" || h === In || !Tt(h) && h >= f) && u(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && u(i.get(n)), d && u(i.get(In)), t) {
        case "add":
          l ? d && u(i.get("length")) : (u(i.get(Vt)), Ft(e) && u(i.get(ro)));
          break;
        case "delete":
          l || (u(i.get(Vt)), Ft(e) && u(i.get(ro)));
          break;
        case "set":
          Ft(e) && u(i.get(Vt));
          break;
      }
  }
  Mo();
}
function Ua(e, t) {
  const n = dr.get(e);
  return n && n.get(t);
}
function Kt(e) {
  const t = H(e);
  return t === e ? t : (_e(t, "iterate", In), Ae(e) ? t : t.map(pt));
}
function jo(e) {
  return _e(e = H(e), "iterate", In), e;
}
function gt(e, t) {
  return st(e) ? rt(e) ? Dn(pt(t)) : Dn(t) : pt(t);
}
const Ba = {
  __proto__: null,
  [Symbol.iterator]() {
    return Hr(this, Symbol.iterator, (e) => gt(this, e));
  },
  concat(...e) {
    return Kt(this).concat(
      ...e.map((t) => B(t) ? Kt(t) : t)
    );
  },
  entries() {
    return Hr(this, "entries", (e) => (e[1] = gt(this, e[1]), e));
  },
  every(e, t) {
    return ut(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ut(
      this,
      "filter",
      e,
      t,
      (n) => n.map((r) => gt(this, r)),
      arguments
    );
  },
  find(e, t) {
    return ut(
      this,
      "find",
      e,
      t,
      (n) => gt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ut(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ut(
      this,
      "findLast",
      e,
      t,
      (n) => gt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ut(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ut(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Kr(this, "includes", e);
  },
  indexOf(...e) {
    return Kr(this, "indexOf", e);
  },
  join(e) {
    return Kt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Kr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ut(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return dn(this, "pop");
  },
  push(...e) {
    return dn(this, "push", e);
  },
  reduce(e, ...t) {
    return vs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return vs(this, "reduceRight", e, t);
  },
  shift() {
    return dn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ut(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return dn(this, "splice", e);
  },
  toReversed() {
    return Kt(this).toReversed();
  },
  toSorted(e) {
    return Kt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Kt(this).toSpliced(...e);
  },
  unshift(...e) {
    return dn(this, "unshift", e);
  },
  values() {
    return Hr(this, "values", (e) => gt(this, e));
  }
};
function Hr(e, t, n) {
  const r = jo(e), o = r[t]();
  return r !== e && !Ae(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = n(s.value)), s;
  }), o;
}
const ja = Array.prototype;
function ut(e, t, n, r, o, s) {
  const i = jo(e), u = i !== e && !Ae(e), l = i[t];
  if (l !== ja[t]) {
    const a = l.apply(e, s);
    return u ? pt(a) : a;
  }
  let d = n;
  i !== e && (u ? d = function(a, h) {
    return n.call(this, gt(e, a), h, e);
  } : n.length > 2 && (d = function(a, h) {
    return n.call(this, a, h, e);
  }));
  const f = l.call(i, d, r);
  return u && o ? o(f) : f;
}
function vs(e, t, n, r) {
  const o = jo(e);
  let s = n;
  return o !== e && (Ae(e) ? n.length > 3 && (s = function(i, u, l) {
    return n.call(this, i, u, l, e);
  }) : s = function(i, u, l) {
    return n.call(this, i, gt(e, u), l, e);
  }), o[t](s, ...r);
}
function Kr(e, t, n) {
  const r = H(e);
  _e(r, "iterate", In);
  const o = r[t](...n);
  return (o === -1 || o === !1) && Qt(n[0]) ? (n[0] = H(n[0]), r[t](...n)) : o;
}
function dn(e, t, n = []) {
  He(), Lo();
  const r = H(e)[t].apply(e, n);
  return Mo(), Ke(), r;
}
const Ha = /* @__PURE__ */ ht("__proto__,__v_isRef,__isVue"), Iu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Tt)
);
function Ka(e) {
  Tt(e) || (e = String(e));
  const t = H(this);
  return _e(t, "has", e), t.hasOwnProperty(e);
}
class Du {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return r === (o ? s ? Nu : Vu : s ? Fu : ku).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = B(t);
    if (!o) {
      let l;
      if (i && (l = Ba[n]))
        return l;
      if (n === "hasOwnProperty")
        return Ka;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      re(t) ? t : r
    );
    if ((Tt(n) ? Iu.has(n) : Ha(n)) || (o || _e(t, "get", n), s))
      return u;
    if (re(u)) {
      const l = i && Cr(n) ? u : u.value;
      return o && te(l) ? so(l) : l;
    }
    return te(u) ? o ? so(u) : Ir(u) : u;
  }
}
class Pu extends Du {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    const i = B(t) && Cr(n);
    if (!this._isShallow) {
      const d = st(s);
      if (!Ae(r) && !st(r) && (s = H(s), r = H(r)), !i && re(s) && !re(r))
        return d ? (Ne(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (s.value = r, !0);
    }
    const u = i ? Number(n) < t.length : Y(t, n), l = Reflect.set(
      t,
      n,
      r,
      re(t) ? t : o
    );
    return t === H(o) && (u ? Ot(r, s) && Qe(t, "set", n, r, s) : Qe(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = Y(t, n), o = t[n], s = Reflect.deleteProperty(t, n);
    return s && r && Qe(t, "delete", n, void 0, o), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Tt(n) || !Iu.has(n)) && _e(t, "has", n), r;
  }
  ownKeys(t) {
    return _e(
      t,
      "iterate",
      B(t) ? "length" : Vt
    ), Reflect.ownKeys(t);
  }
}
class Ru extends Du {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return Ne(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return Ne(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Wa = /* @__PURE__ */ new Pu(), za = /* @__PURE__ */ new Ru(), Ga = /* @__PURE__ */ new Pu(!0), qa = /* @__PURE__ */ new Ru(!0), oo = (e) => e, qn = (e) => Reflect.getPrototypeOf(e);
function Ya(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = H(o), i = Ft(s), u = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, d = o[e](...r), f = n ? oo : t ? Dn : pt;
    return !t && _e(
      s,
      "iterate",
      l ? ro : Vt
    ), {
      // iterator protocol
      next() {
        const { value: a, done: h } = d.next();
        return h ? { value: a, done: h } : {
          value: u ? [f(a[0]), f(a[1])] : f(a),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Yn(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      Ne(
        `${Tr(e)} operation ${n}failed: target is readonly.`,
        H(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ja(e, t) {
  const n = {
    get(o) {
      const s = this.__v_raw, i = H(s), u = H(o);
      e || (Ot(o, u) && _e(i, "get", o), _e(i, "get", u));
      const { has: l } = qn(i), d = t ? oo : e ? Dn : pt;
      if (l.call(i, o))
        return d(s.get(o));
      if (l.call(i, u))
        return d(s.get(u));
      s !== i && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && _e(H(o), "iterate", Vt), o.size;
    },
    has(o) {
      const s = this.__v_raw, i = H(s), u = H(o);
      return e || (Ot(o, u) && _e(i, "has", o), _e(i, "has", u)), o === u ? s.has(o) : s.has(o) || s.has(u);
    },
    forEach(o, s) {
      const i = this, u = i.__v_raw, l = H(u), d = t ? oo : e ? Dn : pt;
      return !e && _e(l, "iterate", Vt), u.forEach((f, a) => o.call(s, d(f), d(a), i));
    }
  };
  return de(
    n,
    e ? {
      add: Yn("add"),
      set: Yn("set"),
      delete: Yn("delete"),
      clear: Yn("clear")
    } : {
      add(o) {
        !t && !Ae(o) && !st(o) && (o = H(o));
        const s = H(this);
        return qn(s).has.call(s, o) || (s.add(o), Qe(s, "add", o, o)), this;
      },
      set(o, s) {
        !t && !Ae(s) && !st(s) && (s = H(s));
        const i = H(this), { has: u, get: l } = qn(i);
        let d = u.call(i, o);
        d ? bs(i, u, o) : (o = H(o), d = u.call(i, o));
        const f = l.call(i, o);
        return i.set(o, s), d ? Ot(s, f) && Qe(i, "set", o, s, f) : Qe(i, "add", o, s), this;
      },
      delete(o) {
        const s = H(this), { has: i, get: u } = qn(s);
        let l = i.call(s, o);
        l ? bs(s, i, o) : (o = H(o), l = i.call(s, o));
        const d = u ? u.call(s, o) : void 0, f = s.delete(o);
        return l && Qe(s, "delete", o, void 0, d), f;
      },
      clear() {
        const o = H(this), s = o.size !== 0, i = Ft(o) ? new Map(o) : new Set(o), u = o.clear();
        return s && Qe(
          o,
          "clear",
          void 0,
          void 0,
          i
        ), u;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = Ya(o, e, t);
  }), n;
}
function xr(e, t) {
  const n = Ja(e, t);
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    Y(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Xa = {
  get: /* @__PURE__ */ xr(!1, !1)
}, Za = {
  get: /* @__PURE__ */ xr(!1, !0)
}, Qa = {
  get: /* @__PURE__ */ xr(!0, !1)
}, ec = {
  get: /* @__PURE__ */ xr(!0, !0)
};
function bs(e, t, n) {
  const r = H(n);
  if (r !== n && t.call(e, r)) {
    const o = Vo(e);
    Ne(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const ku = /* @__PURE__ */ new WeakMap(), Fu = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap(), Nu = /* @__PURE__ */ new WeakMap();
function tc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function nc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : tc(Vo(e));
}
function Ir(e) {
  return st(e) ? e : Dr(
    e,
    !1,
    Wa,
    Xa,
    ku
  );
}
function rc(e) {
  return Dr(
    e,
    !1,
    Ga,
    Za,
    Fu
  );
}
function so(e) {
  return Dr(
    e,
    !0,
    za,
    Qa,
    Vu
  );
}
function tt(e) {
  return Dr(
    e,
    !0,
    qa,
    ec,
    Nu
  );
}
function Dr(e, t, n, r, o) {
  if (!te(e))
    return Ne(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = nc(e);
  if (s === 0)
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const u = new Proxy(
    e,
    s === 2 ? r : n
  );
  return o.set(e, u), u;
}
function rt(e) {
  return st(e) ? rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function st(e) {
  return !!(e && e.__v_isReadonly);
}
function Ae(e) {
  return !!(e && e.__v_isShallow);
}
function Qt(e) {
  return e ? !!e.__v_raw : !1;
}
function H(e) {
  const t = e && e.__v_raw;
  return t ? H(t) : e;
}
function bt(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && fr(e, "__v_skip", !0), e;
}
const pt = (e) => te(e) ? Ir(e) : e, Dn = (e) => te(e) ? so(e) : e;
function re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Pr(e) {
  return oc(e, !1);
}
function oc(e, t) {
  return re(e) ? e : new sc(e, t);
}
class sc {
  constructor(t, n) {
    this.dep = new Bo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : H(t), this._value = n ? t : pt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || Ae(t) || st(t);
    t = r ? t : H(t), Ot(t, n) && (this._rawValue = t, this._value = r ? t : pt(t), this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }));
  }
}
function Le(e) {
  return re(e) ? e.value : e;
}
const ic = {
  get: (e, t, n) => t === "__v_raw" ? e : Le(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return re(o) && !re(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function $u(e) {
  return rt(e) ? e : new Proxy(e, ic);
}
function Ss(e) {
  Qt(e) || Ne("toRefs() expects a reactive object but received a plain one.");
  const t = B(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Lu(e, n);
  return t;
}
class uc {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0, this._raw = H(t);
    let o = !0, s = t;
    if (!B(t) || !Cr(String(n)))
      do
        o = !Qt(s) || Ae(s);
      while (o && (s = s.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = Le(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && re(this._raw[this._key])) {
      const n = this._object[this._key];
      if (re(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Ua(this._raw, this._key);
  }
}
class lc {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Wr(e, t, n) {
  return re(e) ? e : j(e) ? new lc(e) : te(e) && arguments.length > 1 ? Lu(e, t, n) : Pr(e);
}
function Lu(e, t, n) {
  return new uc(e, t, n);
}
class ac {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Bo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = xn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return Ou(this, !0), !0;
  }
  get value() {
    const t = this.dep.track({
      target: this,
      type: "get",
      key: "value"
    });
    return Au(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : Ne("Write operation failed: computed value is readonly");
  }
}
function cc(e, t, n = !1) {
  let r, o;
  return j(e) ? r = e : (r = e.get, o = e.set), new ac(r, o, n);
}
const Jn = {}, pr = /* @__PURE__ */ new WeakMap();
let Pt;
function fc(e, t = !1, n = Pt) {
  if (n) {
    let r = pr.get(n);
    r || pr.set(n, r = []), r.push(e);
  } else t || Ne(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function dc(e, t, n = ee) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: u, call: l } = n, d = (N) => {
    (n.onWarn || Ne)(
      "Invalid watch source: ",
      N,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (N) => o ? N : Ae(N) || o === !1 || o === 0 ? vt(N, 1) : vt(N);
  let a, h, _, m, S = !1, x = !1;
  if (re(e) ? (h = () => e.value, S = Ae(e)) : rt(e) ? (h = () => f(e), S = !0) : B(e) ? (x = !0, S = e.some((N) => rt(N) || Ae(N)), h = () => e.map((N) => {
    if (re(N))
      return N.value;
    if (rt(N))
      return f(N);
    if (j(N))
      return l ? l(N, 2) : N();
    d(N);
  })) : j(e) ? t ? h = l ? () => l(e, 2) : e : h = () => {
    if (_) {
      He();
      try {
        _();
      } finally {
        Ke();
      }
    }
    const N = Pt;
    Pt = a;
    try {
      return l ? l(e, 3, [m]) : e(m);
    } finally {
      Pt = N;
    }
  } : (h = Ee, d(e)), t && o) {
    const N = h, J = o === !0 ? 1 / 0 : o;
    h = () => vt(N(), J);
  }
  const C = vu(), $ = () => {
    a.stop(), C && C.active && ko(C.effects, a);
  };
  if (s && t) {
    const N = t;
    t = (...J) => {
      N(...J), $();
    };
  }
  let V = x ? new Array(e.length).fill(Jn) : Jn;
  const ne = (N) => {
    if (!(!(a.flags & 1) || !a.dirty && !N))
      if (t) {
        const J = a.run();
        if (o || S || (x ? J.some((L, le) => Ot(L, V[le])) : Ot(J, V))) {
          _ && _();
          const L = Pt;
          Pt = a;
          try {
            const le = [
              J,
              // pass undefined as the old value when it's changed for the first time
              V === Jn ? void 0 : x && V[0] === Jn ? [] : V,
              m
            ];
            V = J, l ? l(t, 3, le) : (
              // @ts-expect-error
              t(...le)
            );
          } finally {
            Pt = L;
          }
        }
      } else
        a.run();
  };
  return u && u(ne), a = new bu(h), a.scheduler = i ? () => i(ne, !1) : ne, m = (N) => fc(N, !1, a), _ = a.onStop = () => {
    const N = pr.get(a);
    if (N) {
      if (l)
        l(N, 4);
      else
        for (const J of N) J();
      pr.delete(a);
    }
  }, a.onTrack = n.onTrack, a.onTrigger = n.onTrigger, t ? r ? ne(!0) : V = a.run() : i ? i(ne.bind(null, !0), !0) : a.run(), $.pause = a.pause.bind(a), $.resume = a.resume.bind(a), $.stop = $, $;
}
function vt(e, t = 1 / 0, n) {
  if (t <= 0 || !te(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, re(e))
    vt(e.value, t, n);
  else if (B(e))
    for (let r = 0; r < e.length; r++)
      vt(e[r], t, n);
  else if (du(e) || Ft(e))
    e.forEach((r) => {
      vt(r, t, n);
    });
  else if (hu(e)) {
    for (const r in e)
      vt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && vt(e[r], t, n);
  }
  return e;
}
var mt = { NODE_ENV: '"production"' };
const Nt = [];
function Zn(e) {
  Nt.push(e);
}
function Qn() {
  Nt.pop();
}
let zr = !1;
function T(e, ...t) {
  if (zr) return;
  zr = !0, He();
  const n = Nt.length ? Nt[Nt.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = pc();
  if (r)
    rn(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var i, u;
          return (u = (i = s.toString) == null ? void 0 : i.call(s)) != null ? u : JSON.stringify(s);
        }).join(""),
        n && n.proxy,
        o.map(
          ({ vnode: s }) => `at <${Wn(n, s.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    o.length && s.push(`
`, ...hc(o)), console.warn(...s);
  }
  Ke(), zr = !1;
}
function pc() {
  let e = Nt[Nt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function hc(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ..._c(n));
  }), t;
}
function _c({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, o = ` at <${Wn(
    e.component,
    e.type,
    r
  )}`, s = ">" + n;
  return e.props ? [o, ...gc(e.props), s] : [o + s];
}
function gc(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Mu(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Mu(e, t, n) {
  return ae(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : re(t) ? (t = Mu(e, H(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : j(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = H(t), n ? t : [`${e}=`, t]);
}
const Ho = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function rn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Bn(o, t, n);
  }
}
function it(e, t, n, r) {
  if (j(e)) {
    const o = rn(e, t, n, r);
    return o && Fo(o) && o.catch((s) => {
      Bn(s, t, n);
    }), o;
  }
  if (B(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(it(e[s], t, n, r));
    return o;
  } else
    T(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
    );
}
function Bn(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || ee;
  if (t) {
    let u = t.parent;
    const l = t.proxy, d = Ho[n];
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let a = 0; a < f.length; a++)
          if (f[a](e, l, d) === !1)
            return;
      }
      u = u.parent;
    }
    if (s) {
      He(), rn(s, null, 10, [
        e,
        l,
        d
      ]), Ke();
      return;
    }
  }
  mc(e, n, o, r, i);
}
function mc(e, t, n, r = !0, o = !1) {
  {
    const s = Ho[t];
    if (n && Zn(n), T(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Qn(), r)
      throw e;
    console.error(e);
  }
}
const we = [];
let Xe = -1;
const Zt = [];
let Et = null, qt = 0;
const Uu = /* @__PURE__ */ Promise.resolve();
let hr = null;
const Ec = 100;
function io(e) {
  const t = hr || Uu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yc(e) {
  let t = Xe + 1, n = we.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = we[r], s = Pn(o);
    s < e || s === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Rr(e) {
  if (!(e.flags & 1)) {
    const t = Pn(e), n = we[we.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Pn(n) ? we.push(e) : we.splice(yc(t), 0, e), e.flags |= 1, Bu();
  }
}
function Bu() {
  hr || (hr = Uu.then(Ku));
}
function ju(e) {
  B(e) ? Zt.push(...e) : Et && e.id === -1 ? Et.splice(qt + 1, 0, e) : e.flags & 1 || (Zt.push(e), e.flags |= 1), Bu();
}
function Os(e, t, n = Xe + 1) {
  for (t = t || /* @__PURE__ */ new Map(); n < we.length; n++) {
    const r = we[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid || Ko(t, r))
        continue;
      we.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Hu(e) {
  if (Zt.length) {
    const t = [...new Set(Zt)].sort(
      (n, r) => Pn(n) - Pn(r)
    );
    if (Zt.length = 0, Et) {
      Et.push(...t);
      return;
    }
    for (Et = t, e = e || /* @__PURE__ */ new Map(), qt = 0; qt < Et.length; qt++) {
      const n = Et[qt];
      Ko(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Et = null, qt = 0;
  }
}
const Pn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ku(e) {
  e = e || /* @__PURE__ */ new Map();
  const t = (n) => Ko(e, n);
  try {
    for (Xe = 0; Xe < we.length; Xe++) {
      const n = we[Xe];
      if (n && !(n.flags & 8)) {
        if (mt.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), rn(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Xe < we.length; Xe++) {
      const n = we[Xe];
      n && (n.flags &= -2);
    }
    Xe = -1, we.length = 0, Hu(e), hr = null, (we.length || Zt.length) && Ku(e);
  }
}
function Ko(e, t) {
  const n = e.get(t) || 0;
  if (n > Ec) {
    const r = t.i, o = r && wl(r.type);
    return Bn(
      `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let nt = !1;
const er = /* @__PURE__ */ new Map();
Un().__VUE_HMR_RUNTIME__ = {
  createRecord: Gr(Wu),
  rerender: Gr(Sc),
  reload: Gr(Oc)
};
const Ut = /* @__PURE__ */ new Map();
function vc(e) {
  const t = e.type.__hmrId;
  let n = Ut.get(t);
  n || (Wu(t, e.type), n = Ut.get(t)), n.instances.add(e);
}
function bc(e) {
  Ut.get(e.type.__hmrId).instances.delete(e);
}
function Wu(e, t) {
  return Ut.has(e) ? !1 : (Ut.set(e, {
    initialDef: _r(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function _r(e) {
  return Cl(e) ? e.__vccOpts : e;
}
function Sc(e, t) {
  const n = Ut.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, _r(r.type).render = t), r.renderCache = [], nt = !0, r.job.flags & 8 || r.update(), nt = !1;
  }));
}
function Oc(e, t) {
  const n = Ut.get(e);
  if (!n) return;
  t = _r(t), ws(n.initialDef, t);
  const r = [...n.instances];
  for (let o = 0; o < r.length; o++) {
    const s = r[o], i = _r(s.type);
    let u = er.get(i);
    u || (i !== n.initialDef && ws(i, t), er.set(i, u = /* @__PURE__ */ new Set())), u.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (u.add(s), s.ceReload(t.styles), u.delete(s)) : s.parent ? Rr(() => {
      s.job.flags & 8 || (nt = !0, s.parent.update(), nt = !1, u.delete(s));
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(i);
  }
  ju(() => {
    er.clear();
  });
}
function ws(e, t) {
  de(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Gr(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let et, gn = [], uo = !1;
function jn(e, ...t) {
  et ? et.emit(e, ...t) : uo || gn.push({ event: e, args: t });
}
function zu(e, t) {
  var n, r;
  et = e, et ? (et.enabled = !0, gn.forEach(({ event: o, args: s }) => et.emit(o, ...s)), gn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    zu(s, t);
  }), setTimeout(() => {
    et || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, uo = !0, gn = []);
  }, 3e3)) : (uo = !0, gn = []);
}
function wc(e, t) {
  jn("app:init", e, t, {
    Fragment: Ze,
    Text: Hn,
    Comment: Ve,
    Static: tr
  });
}
function Cc(e) {
  jn("app:unmount", e);
}
const Ac = /* @__PURE__ */ Wo(
  "component:added"
  /* COMPONENT_ADDED */
), Gu = /* @__PURE__ */ Wo(
  "component:updated"
  /* COMPONENT_UPDATED */
), Tc = /* @__PURE__ */ Wo(
  "component:removed"
  /* COMPONENT_REMOVED */
), xc = (e) => {
  et && typeof et.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !et.cleanupBuffer(e) && Tc(e);
};
// @__NO_SIDE_EFFECTS__
function Wo(e) {
  return (t) => {
    jn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const Ic = /* @__PURE__ */ qu(
  "perf:start"
  /* PERFORMANCE_START */
), Dc = /* @__PURE__ */ qu(
  "perf:end"
  /* PERFORMANCE_END */
);
function qu(e) {
  return (t, n, r) => {
    jn(e, t.appContext.app, t.uid, t, n, r);
  };
}
function Pc(e, t, n) {
  jn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let ke = null, Yu = null;
function gr(e) {
  const t = ke;
  return ke = e, Yu = e && e.type.__scopeId || null, t;
}
function Rc(e, t = ke, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Ls(-1);
    const s = gr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      gr(s), r._d && Ls(1);
    }
    return Gu(t), i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ju(e) {
  va(e) && T("Do not use built-in directive ids as custom directive id: " + e);
}
function xt(e, t, n, r) {
  const o = e.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const u = o[i];
    s && (u.oldValue = s[i].value);
    let l = u.dir[r];
    l && (He(), it(l, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Ke());
  }
}
const kc = /* @__PURE__ */ Symbol("_vte"), Fc = (e) => e.__isTeleport, Vc = /* @__PURE__ */ Symbol("_leaveCb");
function zo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, zo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Xu(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Cs = /* @__PURE__ */ new WeakSet(), mr = /* @__PURE__ */ new WeakMap();
function Sn(e, t, n, r, o = !1) {
  if (B(e)) {
    e.forEach(
      (S, x) => Sn(
        S,
        t && (B(t) ? t[x] : t),
        n,
        r,
        o
      )
    );
    return;
  }
  if (On(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Sn(e, t, n, r.component.subTree);
    return;
  }
  const s = r.shapeFlag & 4 ? Qo(r.component) : r.el, i = o ? null : s, { i: u, r: l } = e;
  if (!u) {
    T(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, f = u.refs === ee ? u.refs = {} : u.refs, a = u.setupState, h = H(a), _ = a === ee ? fu : (S) => (Y(h, S) && !re(h[S]) && T(
    `Template ref "${S}" used on a non-ref value. It will not work in the production build.`
  ), Cs.has(h[S]) ? !1 : Y(h, S)), m = (S) => !Cs.has(S);
  if (d != null && d !== l) {
    if (As(t), ae(d))
      f[d] = null, _(d) && (a[d] = null);
    else if (re(d)) {
      m(d) && (d.value = null);
      const S = t;
      S.k && (f[S.k] = null);
    }
  }
  if (j(l))
    rn(l, u, 12, [i, f]);
  else {
    const S = ae(l), x = re(l);
    if (S || x) {
      const C = () => {
        if (e.f) {
          const $ = S ? _(l) ? a[l] : f[l] : m(l) || !e.k ? l.value : f[e.k];
          if (o)
            B($) && ko($, s);
          else if (B($))
            $.includes(s) || $.push(s);
          else if (S)
            f[l] = [s], _(l) && (a[l] = f[l]);
          else {
            const V = [s];
            m(l) && (l.value = V), e.k && (f[e.k] = V);
          }
        } else S ? (f[l] = i, _(l) && (a[l] = i)) : x ? (m(l) && (l.value = i), e.k && (f[e.k] = i)) : T("Invalid template ref type:", l, `(${typeof l})`);
      };
      if (i) {
        const $ = () => {
          C(), mr.delete(e);
        };
        $.id = -1, mr.set(e, $), Pe($, n);
      } else
        As(e), C();
    } else
      T("Invalid template ref type:", l, `(${typeof l})`);
  }
}
function As(e) {
  const t = mr.get(e);
  t && (t.flags |= 8, mr.delete(e));
}
Un().requestIdleCallback;
Un().cancelIdleCallback;
const On = (e) => !!e.type.__asyncLoader, Go = (e) => e.type.__isKeepAlive;
function Nc(e, t) {
  Zu(e, "a", t);
}
function $c(e, t) {
  Zu(e, "da", t);
}
function Zu(e, t, n = ce) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (kr(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Go(o.parent.vnode) && Lc(r, t, n, o), o = o.parent;
  }
}
function Lc(e, t, n, r) {
  const o = kr(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  el(() => {
    ko(r[t], o);
  }, n);
}
function kr(e, t, n = ce, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      He();
      const u = Kn(n), l = it(t, n, e, i);
      return u(), Ke(), l;
    });
    return r ? o.unshift(s) : o.push(s), s;
  } else {
    const o = Dt(Ho[e].replace(/ hook$/, ""));
    T(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const _t = (e) => (t, n = ce) => {
  (!kn || e === "sp") && kr(e, (...r) => t(...r), n);
}, Mc = _t("bm"), Qu = _t("m"), Uc = _t(
  "bu"
), Bc = _t("u"), jc = _t(
  "bum"
), el = _t("um"), Hc = _t(
  "sp"
), Kc = _t("rtg"), Wc = _t("rtc");
function zc(e, t = ce) {
  kr("ec", e, t);
}
const Gc = /* @__PURE__ */ Symbol.for("v-ndc"), lo = (e) => e ? Sl(e) ? Qo(e) : lo(e.parent) : null, $t = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ de(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => tt(e.props),
    $attrs: (e) => tt(e.attrs),
    $slots: (e) => tt(e.slots),
    $refs: (e) => tt(e.refs),
    $parent: (e) => lo(e.parent),
    $root: (e) => lo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => rl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Rr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = io.bind(e.proxy)),
    $watch: (e) => cf.bind(e)
  })
), qo = (e) => e === "_" || e === "$", qr = (e, t) => e !== ee && !e.__isScriptSetup && Y(e, t), tl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: u, appContext: l } = e;
    if (t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (qr(r, t))
          return i[t] = 1, r[t];
        if (o !== ee && Y(o, t))
          return i[t] = 2, o[t];
        if (Y(s, t))
          return i[t] = 3, s[t];
        if (n !== ee && Y(n, t))
          return i[t] = 4, n[t];
        ao && (i[t] = 0);
      }
    }
    const d = $t[t];
    let f, a;
    if (d)
      return t === "$attrs" ? (_e(e.attrs, "get", ""), yr()) : t === "$slots" && _e(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (f = u.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ee && Y(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = l.config.globalProperties, Y(a, t)
    )
      return a[t];
    ke && (!ae(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== ee && qo(t[0]) && Y(o, t) ? T(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === ke && T(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return qr(o, t) ? (o[t] = n, !0) : o.__isScriptSetup && Y(o, t) ? (T(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== ee && Y(r, t) ? (r[t] = n, !0) : Y(e.props, t) ? (T(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (T(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: s, type: i }
  }, u) {
    let l;
    return !!(n[u] || e !== ee && u[0] !== "$" && Y(e, u) || qr(t, u) || Y(s, u) || Y(r, u) || Y($t, u) || Y(o.config.globalProperties, u) || (l = i.__cssModules) && l[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Y(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
tl.ownKeys = (e) => (T(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e));
function qc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys($t).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => $t[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Ee
    });
  }), t;
}
function Yc(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((r) => {
    Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[r],
      set: Ee
    });
  });
}
function Jc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(H(n)).forEach((r) => {
    if (!n.__isScriptSetup) {
      if (qo(r[0])) {
        T(
          `setup() return property ${JSON.stringify(
            r
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, r, {
        enumerable: !0,
        configurable: !0,
        get: () => n[r],
        set: Ee
      });
    }
  });
}
function Ts(e) {
  return B(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Xc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? T(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let ao = !0;
function Zc(e) {
  const t = rl(e), n = e.proxy, r = e.ctx;
  ao = !1, t.beforeCreate && xs(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: i,
    watch: u,
    provide: l,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: h,
    beforeUpdate: _,
    updated: m,
    activated: S,
    deactivated: x,
    beforeDestroy: C,
    beforeUnmount: $,
    destroyed: V,
    unmounted: ne,
    render: N,
    renderTracked: J,
    renderTriggered: L,
    errorCaptured: le,
    serverPrefetch: Z,
    // public API
    expose: k,
    inheritAttrs: P,
    // assets
    components: z,
    directives: ue,
    filters: ye
  } = t, ve = Xc();
  {
    const [R] = e.propsOptions;
    if (R)
      for (const K in R)
        ve("Props", K);
  }
  if (d && Qc(d, r, ve), i)
    for (const R in i) {
      const K = i[R];
      j(K) ? (Object.defineProperty(r, R, {
        value: K.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }), ve("Methods", R)) : T(
        `Method "${R}" has type "${typeof K}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    j(o) || T(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const R = o.call(n, n);
    if (Fo(R) && T(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !te(R))
      T("data() should return an object.");
    else {
      e.data = Ir(R);
      for (const K in R)
        ve("Data", K), qo(K[0]) || Object.defineProperty(r, K, {
          configurable: !0,
          enumerable: !0,
          get: () => R[K],
          set: Ee
        });
    }
  }
  if (ao = !0, s)
    for (const R in s) {
      const K = s[R], G = j(K) ? K.bind(n, n) : j(K.get) ? K.get.bind(n, n) : Ee;
      G === Ee && T(`Computed property "${R}" has no getter.`);
      const We = !j(K) && j(K.set) ? K.set.bind(n) : () => {
        T(
          `Write operation failed: computed property "${R}" is readonly.`
        );
      }, Te = es({
        get: G,
        set: We
      });
      Object.defineProperty(r, R, {
        enumerable: !0,
        configurable: !0,
        get: () => Te.value,
        set: (pe) => Te.value = pe
      }), ve("Computed", R);
    }
  if (u)
    for (const R in u)
      nl(u[R], r, n, R);
  if (l) {
    const R = j(l) ? l.call(n) : l;
    Reflect.ownKeys(R).forEach((K) => {
      sf(K, R[K]);
    });
  }
  f && xs(f, e, "c");
  function se(R, K) {
    B(K) ? K.forEach((G) => R(G.bind(n))) : K && R(K.bind(n));
  }
  if (se(Mc, a), se(Qu, h), se(Uc, _), se(Bc, m), se(Nc, S), se($c, x), se(zc, le), se(Wc, J), se(Kc, L), se(jc, $), se(el, ne), se(Hc, Z), B(k))
    if (k.length) {
      const R = e.exposed || (e.exposed = {});
      k.forEach((K) => {
        Object.defineProperty(R, K, {
          get: () => n[K],
          set: (G) => n[K] = G,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === Ee && (e.render = N), P != null && (e.inheritAttrs = P), z && (e.components = z), ue && (e.directives = ue), Z && Xu(e);
}
function Qc(e, t, n = Ee) {
  B(e) && (e = co(e));
  for (const r in e) {
    const o = e[r];
    let s;
    te(o) ? "default" in o ? s = wn(
      o.from || r,
      o.default,
      !0
    ) : s = wn(o.from || r) : s = wn(o), re(s) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[r] = s, n("Inject", r);
  }
}
function xs(e, t, n) {
  it(
    B(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function nl(e, t, n, r) {
  let o = r.includes(".") ? il(n, r) : () => n[r];
  if (ae(e)) {
    const s = t[e];
    j(s) ? Cn(o, s) : T(`Invalid watch handler specified by key "${e}"`, s);
  } else if (j(e))
    Cn(o, e.bind(n));
  else if (te(e))
    if (B(e))
      e.forEach((s) => nl(s, t, n, r));
    else {
      const s = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(s) ? Cn(o, s, e) : T(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else
    T(`Invalid watch option: "${r}"`, e);
}
function rl(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, u = s.get(t);
  let l;
  return u ? l = u : !o.length && !n && !r ? l = t : (l = {}, o.length && o.forEach(
    (d) => Er(l, d, i, !0)
  ), Er(l, t, i)), te(t) && s.set(t, l), l;
}
function Er(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Er(e, s, n, !0), o && o.forEach(
    (i) => Er(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      T(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const u = ef[i] || n && n[i];
      e[i] = u ? u(e[i], t[i]) : t[i];
    }
  return e;
}
const ef = {
  data: Is,
  props: Ds,
  emits: Ds,
  // objects
  methods: mn,
  computed: mn,
  // lifecycle
  beforeCreate: Se,
  created: Se,
  beforeMount: Se,
  mounted: Se,
  beforeUpdate: Se,
  updated: Se,
  beforeDestroy: Se,
  beforeUnmount: Se,
  destroyed: Se,
  unmounted: Se,
  activated: Se,
  deactivated: Se,
  errorCaptured: Se,
  serverPrefetch: Se,
  // assets
  components: mn,
  directives: mn,
  // watch
  watch: nf,
  // provide / inject
  provide: Is,
  inject: tf
};
function Is(e, t) {
  return t ? e ? function() {
    return de(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function tf(e, t) {
  return mn(co(e), co(t));
}
function co(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mn(e, t) {
  return e ? de(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ds(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : de(
    /* @__PURE__ */ Object.create(null),
    Ts(e),
    Ts(t ?? {})
  ) : t;
}
function nf(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = de(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Se(e[r], t[r]);
  return n;
}
function ol() {
  return {
    app: null,
    config: {
      isNativeTag: fu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let rf = 0;
function of(e, t) {
  return function(r, o = null) {
    j(r) || (r = de({}, r)), o != null && !te(o) && (T("root props passed to app.mount() must be an object."), o = null);
    const s = ol(), i = /* @__PURE__ */ new WeakSet(), u = [];
    let l = !1;
    const d = s.app = {
      _uid: rf++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: js,
      get config() {
        return s.config;
      },
      set config(f) {
        T(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...a) {
        return i.has(f) ? T("Plugin has already been applied to target app.") : f && j(f.install) ? (i.add(f), f.install(d, ...a)) : j(f) ? (i.add(f), f(d, ...a)) : T(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(f) {
        return s.mixins.includes(f) ? T(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : s.mixins.push(f), d;
      },
      component(f, a) {
        return Eo(f, s.config), a ? (s.components[f] && T(`Component "${f}" has already been registered in target app.`), s.components[f] = a, d) : s.components[f];
      },
      directive(f, a) {
        return Ju(f), a ? (s.directives[f] && T(`Directive "${f}" has already been registered in target app.`), s.directives[f] = a, d) : s.directives[f];
      },
      mount(f, a, h) {
        if (l)
          T(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          f.__vue_app__ && T(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const _ = d._ceVNode || ft(r, o);
          return _.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), s.reload = () => {
            const m = Ct(_);
            m.el = null, e(m, f, h);
          }, e(_, f, h), l = !0, d._container = f, f.__vue_app__ = d, d._instance = _.component, wc(d, js), Qo(_.component);
        }
      },
      onUnmount(f) {
        typeof f != "function" && T(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), u.push(f);
      },
      unmount() {
        l ? (it(
          u,
          d._instance,
          16
        ), e(null, d._container), d._instance = null, Cc(d), delete d._container.__vue_app__) : T("Cannot unmount an app that is not mounted.");
      },
      provide(f, a) {
        return f in s.provides && (Y(s.provides, f) ? T(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : T(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), s.provides[f] = a, d;
      },
      runWithContext(f) {
        const a = Lt;
        Lt = d;
        try {
          return f();
        } finally {
          Lt = a;
        }
      }
    };
    return d;
  };
}
let Lt = null;
function sf(e, t) {
  if ((!ce || ce.isMounted) && T("provide() can only be used inside setup()."), ce) {
    let n = ce.provides;
    const r = ce.parent && ce.parent.provides;
    r === n && (n = ce.provides = Object.create(r)), n[e] = t;
  }
}
function wn(e, t, n = !1) {
  const r = Nr();
  if (r || Lt) {
    let o = Lt ? Lt._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && j(t) ? t.call(r && r.proxy) : t;
    T(`injection "${String(e)}" not found.`);
  } else
    T("inject() can only be used inside setup() or functional components.");
}
function uf() {
  return !!(Nr() || Lt);
}
const lf = /* @__PURE__ */ Symbol.for("v-scx"), af = () => {
  {
    const e = wn(lf);
    return e || T(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Cn(e, t, n) {
  return j(t) || T(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), sl(e, t, n);
}
function sl(e, t, n = ee) {
  const { immediate: r, deep: o, flush: s, once: i } = n;
  t || (r !== void 0 && T(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && T(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && T(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = de({}, n);
  u.onWarn = T;
  const l = t && r || !t && s !== "post";
  let d;
  if (kn) {
    if (s === "sync") {
      const _ = af();
      d = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!l) {
      const _ = () => {
      };
      return _.stop = Ee, _.resume = Ee, _.pause = Ee, _;
    }
  }
  const f = ce;
  u.call = (_, m, S) => it(_, f, m, S);
  let a = !1;
  s === "post" ? u.scheduler = (_) => {
    Pe(_, f && f.suspense);
  } : s !== "sync" && (a = !0, u.scheduler = (_, m) => {
    m ? _() : Rr(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), a && (_.flags |= 2, f && (_.id = f.uid, _.i = f));
  };
  const h = dc(e, t, u);
  return kn && (d ? d.push(h) : l && h()), h;
}
function cf(e, t, n) {
  const r = this.proxy, o = ae(e) ? e.includes(".") ? il(r, e) : () => r[e] : e.bind(r, r);
  let s;
  j(t) ? s = t : (s = t.handler, n = t);
  const i = Kn(this), u = sl(o, s.bind(r), n);
  return i(), u;
}
function il(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
const ff = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Be(t)}Modifiers`] || e[`${wt(t)}Modifiers`];
function df(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ee;
  {
    const {
      emitsOptions: f,
      propsOptions: [a]
    } = e;
    if (f)
      if (!(t in f))
        (!a || !(Dt(Be(t)) in a)) && T(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Dt(Be(t))}" prop.`
        );
      else {
        const h = f[t];
        j(h) && (h(...n) || T(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = n;
  const s = t.startsWith("update:"), i = s && ff(r, t.slice(7));
  i && (i.trim && (o = n.map((f) => ae(f) ? f.trim() : f)), i.number && (o = n.map(Oa))), Pc(e, t, o);
  {
    const f = t.toLowerCase();
    f !== t && r[Dt(f)] && T(
      `Event "${f}" is emitted in component ${Wn(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${wt(
        t
      )}" instead of "${t}".`
    );
  }
  let u, l = r[u = Dt(t)] || // also try camelCase event handler (#2249)
  r[u = Dt(Be(t))];
  !l && s && (l = r[u = Dt(wt(t))]), l && it(
    l,
    e,
    6,
    o
  );
  const d = r[u + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, it(
      d,
      e,
      6,
      o
    );
  }
}
const pf = /* @__PURE__ */ new WeakMap();
function ul(e, t, n = !1) {
  const r = n ? pf : t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let i = {}, u = !1;
  if (!j(e)) {
    const l = (d) => {
      const f = ul(d, t, !0);
      f && (u = !0, de(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !u ? (te(e) && r.set(e, null), null) : (B(s) ? s.forEach((l) => i[l] = null) : de(i, s), te(e) && r.set(e, i), i);
}
function Fr(e, t) {
  return !e || !Mn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, wt(t)) || Y(e, t));
}
let fo = !1;
function yr() {
  fo = !0;
}
function Ps(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    propsOptions: [s],
    slots: i,
    attrs: u,
    emit: l,
    render: d,
    renderCache: f,
    props: a,
    data: h,
    setupState: _,
    ctx: m,
    inheritAttrs: S
  } = e, x = gr(e);
  let C, $;
  fo = !1;
  try {
    if (n.shapeFlag & 4) {
      const N = o || r, J = mt.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(N, {
        get(L, le, Z) {
          return T(
            `Property '${String(
              le
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(L, le, Z);
        }
      }) : N;
      C = Ue(
        d.call(
          J,
          N,
          f,
          mt.NODE_ENV !== "production" ? tt(a) : a,
          _,
          h,
          m
        )
      ), $ = u;
    } else {
      const N = t;
      mt.NODE_ENV !== "production" && u === a && yr(), C = Ue(
        N.length > 1 ? N(
          mt.NODE_ENV !== "production" ? tt(a) : a,
          mt.NODE_ENV !== "production" ? {
            get attrs() {
              return yr(), tt(u);
            },
            slots: i,
            emit: l
          } : { attrs: u, slots: i, emit: l }
        ) : N(
          mt.NODE_ENV !== "production" ? tt(a) : a,
          null
        )
      ), $ = t.props ? u : hf(u);
    }
  } catch (N) {
    An.length = 0, Bn(N, e, 1), C = ft(Ve);
  }
  let V = C, ne;
  if (C.patchFlag > 0 && C.patchFlag & 2048 && ([V, ne] = ll(C)), $ && S !== !1) {
    const N = Object.keys($), { shapeFlag: J } = V;
    if (N.length) {
      if (J & 7)
        s && N.some(cr) && ($ = _f(
          $,
          s
        )), V = Ct(V, $, !1, !0);
      else if (!fo && V.type !== Ve) {
        const L = Object.keys(u), le = [], Z = [];
        for (let k = 0, P = L.length; k < P; k++) {
          const z = L[k];
          Mn(z) ? cr(z) || le.push(z[2].toLowerCase() + z.slice(3)) : Z.push(z);
        }
        Z.length && T(
          `Extraneous non-props attributes (${Z.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), le.length && T(
          `Extraneous non-emits event listeners (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (Rs(V) || T(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), V = Ct(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs), n.transition && (Rs(V) || T(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), zo(V, n.transition)), ne ? ne(V) : C = V, gr(x), C;
}
const ll = (e) => {
  const t = e.children, n = e.dynamicChildren, r = Yo(t, !1);
  if (r) {
    if (r.patchFlag > 0 && r.patchFlag & 2048)
      return ll(r);
  } else return [e, void 0];
  const o = t.indexOf(r), s = n ? n.indexOf(r) : -1, i = (u) => {
    t[o] = u, n && (s > -1 ? n[s] = u : u.patchFlag > 0 && (e.dynamicChildren = [...n, u]));
  };
  return [Ue(r), i];
};
function Yo(e, t = !0) {
  let n;
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    if (Vr(o)) {
      if (o.type !== Ve || o.children === "v-if") {
        if (n)
          return;
        if (n = o, t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Yo(n.children);
      }
    } else
      return;
  }
  return n;
}
const hf = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Mn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, _f = (e, t) => {
  const n = {};
  for (const r in e)
    (!cr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
}, Rs = (e) => e.shapeFlag & 7 || e.type === Ve;
function gf(e, t, n) {
  const { props: r, children: o, component: s } = e, { props: i, children: u, patchFlag: l } = t, d = s.emitsOptions;
  if ((o || u) && nt || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? ks(r, i, d) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const h = f[a];
        if (i[h] !== r[h] && !Fr(d, h))
          return !0;
      }
    }
  } else
    return (o || u) && (!u || !u.$stable) ? !0 : r === i ? !1 : r ? i ? ks(r, i, d) : !0 : !!i;
  return !1;
}
function ks(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !Fr(n, s))
      return !0;
  }
  return !1;
}
function mf({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const al = {}, cl = () => Object.create(al), fl = (e) => Object.getPrototypeOf(e) === al;
function Ef(e, t, n, r = !1) {
  const o = {}, s = cl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), dl(e, t, o, s);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  hl(t || {}, o, e), n ? e.props = r ? o : rc(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function yf(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function vf(e, t, n, r) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, u = H(o), [l] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !yf(e) && (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        let h = f[a];
        if (Fr(e.emitsOptions, h))
          continue;
        const _ = t[h];
        if (l)
          if (Y(s, h))
            _ !== s[h] && (s[h] = _, d = !0);
          else {
            const m = Be(h);
            o[m] = po(
              l,
              u,
              m,
              _,
              e,
              !1
            );
          }
        else
          _ !== s[h] && (s[h] = _, d = !0);
      }
    }
  } else {
    dl(e, t, o, s) && (d = !0);
    let f;
    for (const a in u)
      (!t || // for camelCase
      !Y(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = wt(a)) === a || !Y(t, f))) && (l ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[f] !== void 0) && (o[a] = po(
        l,
        u,
        a,
        void 0,
        e,
        !0
      )) : delete o[a]);
    if (s !== u)
      for (const a in s)
        (!t || !Y(t, a)) && (delete s[a], d = !0);
  }
  d && Qe(e.attrs, "set", ""), hl(t || {}, o, e);
}
function dl(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1, u;
  if (t)
    for (let l in t) {
      if (yn(l))
        continue;
      const d = t[l];
      let f;
      o && Y(o, f = Be(l)) ? !s || !s.includes(f) ? n[f] = d : (u || (u = {}))[f] = d : Fr(e.emitsOptions, l) || (!(l in r) || d !== r[l]) && (r[l] = d, i = !0);
    }
  if (s) {
    const l = H(n), d = u || ee;
    for (let f = 0; f < s.length; f++) {
      const a = s[f];
      n[a] = po(
        o,
        l,
        a,
        d[a],
        e,
        !Y(d, a)
      );
    }
  }
  return i;
}
function po(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const u = Y(i, "default");
    if (u && r === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && j(l)) {
        const { propsDefaults: d } = o;
        if (n in d)
          r = d[n];
        else {
          const f = Kn(o);
          r = d[n] = l.call(
            null,
            t
          ), f();
        }
      } else
        r = l;
      o.ce && o.ce._setProp(n, r);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !u ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === wt(n)) && (r = !0));
  }
  return r;
}
const bf = /* @__PURE__ */ new WeakMap();
function pl(e, t, n = !1) {
  const r = n ? bf : t.propsCache, o = r.get(e);
  if (o)
    return o;
  const s = e.props, i = {}, u = [];
  let l = !1;
  if (!j(e)) {
    const f = (a) => {
      l = !0;
      const [h, _] = pl(a, t, !0);
      de(i, h), _ && u.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !l)
    return te(e) && r.set(e, Xt), Xt;
  if (B(s))
    for (let f = 0; f < s.length; f++) {
      ae(s[f]) || T("props must be strings when using array syntax.", s[f]);
      const a = Be(s[f]);
      Fs(a) && (i[a] = ee);
    }
  else if (s) {
    te(s) || T("invalid props options", s);
    for (const f in s) {
      const a = Be(f);
      if (Fs(a)) {
        const h = s[f], _ = i[a] = B(h) || j(h) ? { type: h } : de({}, h), m = _.type;
        let S = !1, x = !0;
        if (B(m))
          for (let C = 0; C < m.length; ++C) {
            const $ = m[C], V = j($) && $.name;
            if (V === "Boolean") {
              S = !0;
              break;
            } else V === "String" && (x = !1);
          }
        else
          S = j(m) && m.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = S, _[
          1
          /* shouldCastTrue */
        ] = x, (S || Y(_, "default")) && u.push(a);
      }
    }
  }
  const d = [i, u];
  return te(e) && r.set(e, d), d;
}
function Fs(e) {
  return e[0] !== "$" && !yn(e) ? !0 : (T(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Sf(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function hl(e, t, n) {
  const r = H(t), o = n.propsOptions[0], s = Object.keys(e).map((i) => Be(i));
  for (const i in o) {
    let u = o[i];
    u != null && Of(
      i,
      r[i],
      u,
      tt(r),
      !s.includes(i)
    );
  }
}
function Of(e, t, n, r, o) {
  const { type: s, required: i, validator: u, skipCheck: l } = n;
  if (i && o) {
    T('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !l) {
      let d = !1;
      const f = B(s) ? s : [s], a = [];
      for (let h = 0; h < f.length && !d; h++) {
        const { valid: _, expectedType: m } = Cf(t, f[h]);
        a.push(m || ""), d = _;
      }
      if (!d) {
        T(Af(e, t, a));
        return;
      }
    }
    u && !u(t, r) && T('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const wf = /* @__PURE__ */ ht(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Cf(e, t) {
  let n;
  const r = Sf(t);
  if (r === "null")
    n = e === null;
  else if (wf(r)) {
    const o = typeof e;
    n = o === r.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else r === "Object" ? n = te(e) : r === "Array" ? n = B(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: r
  };
}
function Af(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Tr).join(" | ")}`;
  const o = n[0], s = Vo(t), i = Vs(t, o), u = Vs(t, s);
  return n.length === 1 && Ns(o) && !Tf(o, s) && (r += ` with value ${i}`), r += `, got ${s} `, Ns(s) && (r += `with value ${u}.`), r;
}
function Vs(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Ns(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Tf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Jo = (e) => e === "_" || e === "_ctx" || e === "$stable", Xo = (e) => B(e) ? e.map(Ue) : [Ue(e)], xf = (e, t, n) => {
  if (t._n)
    return t;
  const r = Rc((...o) => (mt.NODE_ENV !== "production" && ce && !(n === null && ke) && !(n && n.root !== ce.root) && T(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Xo(t(...o))), n);
  return r._c = !1, r;
}, _l = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (Jo(o)) continue;
    const s = e[o];
    if (j(s))
      t[o] = xf(o, s, r);
    else if (s != null) {
      T(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const i = Xo(s);
      t[o] = () => i;
    }
  }
}, gl = (e, t) => {
  Go(e.vnode) || T(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = Xo(t);
  e.slots.default = () => n;
}, ho = (e, t, n) => {
  for (const r in t)
    (n || !Jo(r)) && (e[r] = t[r]);
}, If = (e, t, n) => {
  const r = e.slots = cl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (ho(r, t, n), n && fr(r, "_", o, !0)) : _l(t, r);
  } else t && gl(e, t);
}, Df = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let s = !0, i = ee;
  if (r.shapeFlag & 32) {
    const u = t._;
    u ? nt ? (ho(o, t, n), Qe(e, "set", "$slots")) : n && u === 1 ? s = !1 : ho(o, t, n) : (s = !t.$stable, _l(t, o)), i = t;
  } else t && (gl(e, t), i = { default: 1 });
  if (s)
    for (const u in o)
      !Jo(u) && i[u] == null && delete o[u];
};
let pn, ct;
function Wt(e, t) {
  e.appContext.config.performance && vr() && ct.mark(`vue-${t}-${e.uid}`), Ic(e, t, vr() ? ct.now() : Date.now());
}
function zt(e, t) {
  if (e.appContext.config.performance && vr()) {
    const n = `vue-${t}-${e.uid}`, r = n + ":end", o = `<${Wn(e, e.type)}> ${t}`;
    ct.mark(r), ct.measure(o, n, r), ct.clearMeasures(o), ct.clearMarks(n), ct.clearMarks(r);
  }
  Dc(e, t, vr() ? ct.now() : Date.now());
}
function vr() {
  return pn !== void 0 || (typeof window < "u" && window.performance ? (pn = !0, ct = window.performance) : pn = !1), pn;
}
function Pf() {
  const e = [];
  if (e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Pe = Nf;
function Rf(e) {
  return kf(e);
}
function kf(e, t) {
  Pf();
  const n = Un();
  n.__VUE__ = !0, zu(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: r,
    remove: o,
    patchProp: s,
    createElement: i,
    createText: u,
    createComment: l,
    setText: d,
    setElementText: f,
    parentNode: a,
    nextSibling: h,
    setScopeId: _ = Ee,
    insertStaticContent: m
  } = e, S = (c, p, g, O = null, v = null, E = null, I = void 0, A = null, w = nt ? !1 : !!p.dynamicChildren) => {
    if (c === p)
      return;
    c && !hn(c, p) && (O = Gn(c), xe(c, v, E, !0), c = null), p.patchFlag === -2 && (w = !1, p.dynamicChildren = null);
    const { type: b, ref: U, shapeFlag: D } = p;
    switch (b) {
      case Hn:
        x(c, p, g, O);
        break;
      case Ve:
        C(c, p, g, O);
        break;
      case tr:
        c == null ? $(p, g, O, I) : V(c, p, g, I);
        break;
      case Ze:
        ue(
          c,
          p,
          g,
          O,
          v,
          E,
          I,
          A,
          w
        );
        break;
      default:
        D & 1 ? J(
          c,
          p,
          g,
          O,
          v,
          E,
          I,
          A,
          w
        ) : D & 6 ? ye(
          c,
          p,
          g,
          O,
          v,
          E,
          I,
          A,
          w
        ) : D & 64 || D & 128 ? b.process(
          c,
          p,
          g,
          O,
          v,
          E,
          I,
          A,
          w,
          an
        ) : T("Invalid VNode type:", b, `(${typeof b})`);
    }
    U != null && v ? Sn(U, c && c.ref, E, p || c, !p) : U == null && c && c.ref != null && Sn(c.ref, null, E, c, !0);
  }, x = (c, p, g, O) => {
    if (c == null)
      r(
        p.el = u(p.children),
        g,
        O
      );
    else {
      const v = p.el = c.el;
      p.children !== c.children && d(v, p.children);
    }
  }, C = (c, p, g, O) => {
    c == null ? r(
      p.el = l(p.children || ""),
      g,
      O
    ) : p.el = c.el;
  }, $ = (c, p, g, O) => {
    [c.el, c.anchor] = m(
      c.children,
      p,
      g,
      O,
      c.el,
      c.anchor
    );
  }, V = (c, p, g, O) => {
    if (p.children !== c.children) {
      const v = h(c.anchor);
      N(c), [p.el, p.anchor] = m(
        p.children,
        g,
        v,
        O
      );
    } else
      p.el = c.el, p.anchor = c.anchor;
  }, ne = ({ el: c, anchor: p }, g, O) => {
    let v;
    for (; c && c !== p; )
      v = h(c), r(c, g, O), c = v;
    r(p, g, O);
  }, N = ({ el: c, anchor: p }) => {
    let g;
    for (; c && c !== p; )
      g = h(c), o(c), c = g;
    o(p);
  }, J = (c, p, g, O, v, E, I, A, w) => {
    if (p.type === "svg" ? I = "svg" : p.type === "math" && (I = "mathml"), c == null)
      L(
        p,
        g,
        O,
        v,
        E,
        I,
        A,
        w
      );
    else {
      const b = c.el && c.el._isVueCE ? c.el : null;
      try {
        b && b._beginPatch(), k(
          c,
          p,
          v,
          E,
          I,
          A,
          w
        );
      } finally {
        b && b._endPatch();
      }
    }
  }, L = (c, p, g, O, v, E, I, A) => {
    let w, b;
    const { props: U, shapeFlag: D, transition: M, dirs: W } = c;
    if (w = c.el = i(
      c.type,
      E,
      U && U.is,
      U
    ), D & 8 ? f(w, c.children) : D & 16 && Z(
      c.children,
      w,
      null,
      O,
      v,
      Yr(c, E),
      I,
      A
    ), W && xt(c, null, O, "created"), le(w, c, c.scopeId, I, O), U) {
      for (const oe in U)
        oe !== "value" && !yn(oe) && s(w, oe, null, U[oe], E, O);
      "value" in U && s(w, "value", null, U.value, E), (b = U.onVnodeBeforeMount) && Ye(b, O, c);
    }
    fr(w, "__vnode", c, !0), fr(w, "__vueParentComponent", O, !0), W && xt(c, null, O, "beforeMount");
    const q = Ff(v, M);
    q && M.beforeEnter(w), r(w, p, g), ((b = U && U.onVnodeMounted) || q || W) && Pe(() => {
      b && Ye(b, O, c), q && M.enter(w), W && xt(c, null, O, "mounted");
    }, v);
  }, le = (c, p, g, O, v) => {
    if (g && _(c, g), O)
      for (let E = 0; E < O.length; E++)
        _(c, O[E]);
    if (v) {
      let E = v.subTree;
      if (E.patchFlag > 0 && E.patchFlag & 2048 && (E = Yo(E.children) || E), p === E || El(E.type) && (E.ssContent === p || E.ssFallback === p)) {
        const I = v.vnode;
        le(
          c,
          I,
          I.scopeId,
          I.slotScopeIds,
          v.parent
        );
      }
    }
  }, Z = (c, p, g, O, v, E, I, A, w = 0) => {
    for (let b = w; b < c.length; b++) {
      const U = c[b] = A ? yt(c[b]) : Ue(c[b]);
      S(
        null,
        U,
        p,
        g,
        O,
        v,
        E,
        I,
        A
      );
    }
  }, k = (c, p, g, O, v, E, I) => {
    const A = p.el = c.el;
    A.__vnode = p;
    let { patchFlag: w, dynamicChildren: b, dirs: U } = p;
    w |= c.patchFlag & 16;
    const D = c.props || ee, M = p.props || ee;
    let W;
    if (g && It(g, !1), (W = M.onVnodeBeforeUpdate) && Ye(W, g, p, c), U && xt(p, c, g, "beforeUpdate"), g && It(g, !0), nt && (w = 0, I = !1, b = null), (D.innerHTML && M.innerHTML == null || D.textContent && M.textContent == null) && f(A, ""), b ? (P(
      c.dynamicChildren,
      b,
      A,
      g,
      O,
      Yr(p, v),
      E
    ), _o(c, p)) : I || G(
      c,
      p,
      A,
      null,
      g,
      O,
      Yr(p, v),
      E,
      !1
    ), w > 0) {
      if (w & 16)
        z(A, D, M, g, v);
      else if (w & 2 && D.class !== M.class && s(A, "class", null, M.class, v), w & 4 && s(A, "style", D.style, M.style, v), w & 8) {
        const q = p.dynamicProps;
        for (let oe = 0; oe < q.length; oe++) {
          const Q = q[oe], Ie = D[Q], De = M[Q];
          (De !== Ie || Q === "value") && s(A, Q, Ie, De, v, g);
        }
      }
      w & 1 && c.children !== p.children && f(A, p.children);
    } else !I && b == null && z(A, D, M, g, v);
    ((W = M.onVnodeUpdated) || U) && Pe(() => {
      W && Ye(W, g, p, c), U && xt(p, c, g, "updated");
    }, O);
  }, P = (c, p, g, O, v, E, I) => {
    for (let A = 0; A < p.length; A++) {
      const w = c[A], b = p[A], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === Ze || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !hn(w, b) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 198) ? a(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      S(
        w,
        b,
        U,
        null,
        O,
        v,
        E,
        I,
        !0
      );
    }
  }, z = (c, p, g, O, v) => {
    if (p !== g) {
      if (p !== ee)
        for (const E in p)
          !yn(E) && !(E in g) && s(
            c,
            E,
            p[E],
            null,
            v,
            O
          );
      for (const E in g) {
        if (yn(E)) continue;
        const I = g[E], A = p[E];
        I !== A && E !== "value" && s(c, E, A, I, v, O);
      }
      "value" in g && s(c, "value", p.value, g.value, v);
    }
  }, ue = (c, p, g, O, v, E, I, A, w) => {
    const b = p.el = c ? c.el : u(""), U = p.anchor = c ? c.anchor : u("");
    let { patchFlag: D, dynamicChildren: M, slotScopeIds: W } = p;
    // #5523 dev root fragment may inherit directives
    (nt || D & 2048) && (D = 0, w = !1, M = null), W && (A = A ? A.concat(W) : W), c == null ? (r(b, g, O), r(U, g, O), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      g,
      U,
      v,
      E,
      I,
      A,
      w
    )) : D > 0 && D & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (P(
      c.dynamicChildren,
      M,
      g,
      v,
      E,
      I,
      A
    ), _o(c, p)) : G(
      c,
      p,
      g,
      U,
      v,
      E,
      I,
      A,
      w
    );
  }, ye = (c, p, g, O, v, E, I, A, w) => {
    p.slotScopeIds = A, c == null ? p.shapeFlag & 512 ? v.ctx.activate(
      p,
      g,
      O,
      I,
      w
    ) : ve(
      p,
      g,
      O,
      v,
      E,
      I,
      w
    ) : se(c, p, w);
  }, ve = (c, p, g, O, v, E, I) => {
    const A = c.component = Gf(
      c,
      O,
      v
    );
    if (A.type.__hmrId && vc(A), Zn(c), Wt(A, "mount"), Go(c) && (A.ctx.renderer = an), Wt(A, "init"), Yf(A, !1, I), zt(A, "init"), nt && (c.el = null), A.asyncDep) {
      if (v && v.registerDep(A, R, I), !c.el) {
        const w = A.subTree = ft(Ve);
        C(null, w, p, g), c.placeholder = w.el;
      }
    } else
      R(
        A,
        c,
        p,
        g,
        v,
        E,
        I
      );
    Qn(), zt(A, "mount");
  }, se = (c, p, g) => {
    const O = p.component = c.component;
    if (gf(c, p, g))
      if (O.asyncDep && !O.asyncResolved) {
        Zn(p), K(O, p, g), Qn();
        return;
      } else
        O.next = p, O.update();
    else
      p.el = c.el, O.vnode = p;
  }, R = (c, p, g, O, v, E, I) => {
    const A = () => {
      if (c.isMounted) {
        let { next: D, bu: M, u: W, parent: q, vnode: oe } = c;
        {
          const Ge = ml(c);
          if (Ge) {
            D && (D.el = oe.el, K(c, D, I)), Ge.asyncDep.then(() => {
              c.isUnmounted || A();
            });
            return;
          }
        }
        let Q = D, Ie;
        Zn(D || c.vnode), It(c, !1), D ? (D.el = oe.el, K(c, D, I)) : D = oe, M && fn(M), (Ie = D.props && D.props.onVnodeBeforeUpdate) && Ye(Ie, q, D, oe), It(c, !0), Wt(c, "render");
        const De = Ps(c);
        zt(c, "render");
        const ze = c.subTree;
        c.subTree = De, Wt(c, "patch"), S(
          ze,
          De,
          // parent may have changed if it's in a teleport
          a(ze.el),
          // anchor may have changed if it's in a fragment
          Gn(ze),
          c,
          v,
          E
        ), zt(c, "patch"), D.el = De.el, Q === null && mf(c, De.el), W && Pe(W, v), (Ie = D.props && D.props.onVnodeUpdated) && Pe(
          () => Ye(Ie, q, D, oe),
          v
        ), Gu(c), Qn();
      } else {
        let D;
        const { el: M, props: W } = p, { bm: q, m: oe, parent: Q, root: Ie, type: De } = c, ze = On(p);
        It(c, !1), q && fn(q), !ze && (D = W && W.onVnodeBeforeMount) && Ye(D, Q, p), It(c, !0);
        {
          Ie.ce && // @ts-expect-error _def is private
          Ie.ce._def.shadowRoot !== !1 && Ie.ce._injectChildStyle(De), Wt(c, "render");
          const Ge = c.subTree = Ps(c);
          zt(c, "render"), Wt(c, "patch"), S(
            null,
            Ge,
            g,
            O,
            c,
            v,
            E
          ), zt(c, "patch"), p.el = Ge.el;
        }
        if (oe && Pe(oe, v), !ze && (D = W && W.onVnodeMounted)) {
          const Ge = p;
          Pe(
            () => Ye(D, Q, Ge),
            v
          );
        }
        (p.shapeFlag & 256 || Q && On(Q.vnode) && Q.vnode.shapeFlag & 256) && c.a && Pe(c.a, v), c.isMounted = !0, Ac(c), p = g = O = null;
      }
    };
    c.scope.on();
    const w = c.effect = new bu(A);
    c.scope.off();
    const b = c.update = w.run.bind(w), U = c.job = w.runIfDirty.bind(w);
    U.i = c, U.id = c.uid, w.scheduler = () => Rr(U), It(c, !0), w.onTrack = c.rtc ? (D) => fn(c.rtc, D) : void 0, w.onTrigger = c.rtg ? (D) => fn(c.rtg, D) : void 0, b();
  }, K = (c, p, g) => {
    p.component = c;
    const O = c.vnode.props;
    c.vnode = p, c.next = null, vf(c, p.props, O, g), Df(c, p.children, g), He(), Os(c), Ke();
  }, G = (c, p, g, O, v, E, I, A, w = !1) => {
    const b = c && c.children, U = c ? c.shapeFlag : 0, D = p.children, { patchFlag: M, shapeFlag: W } = p;
    if (M > 0) {
      if (M & 128) {
        Te(
          b,
          D,
          g,
          O,
          v,
          E,
          I,
          A,
          w
        );
        return;
      } else if (M & 256) {
        We(
          b,
          D,
          g,
          O,
          v,
          E,
          I,
          A,
          w
        );
        return;
      }
    }
    W & 8 ? (U & 16 && ln(b, v, E), D !== b && f(g, D)) : U & 16 ? W & 16 ? Te(
      b,
      D,
      g,
      O,
      v,
      E,
      I,
      A,
      w
    ) : ln(b, v, E, !0) : (U & 8 && f(g, ""), W & 16 && Z(
      D,
      g,
      O,
      v,
      E,
      I,
      A,
      w
    ));
  }, We = (c, p, g, O, v, E, I, A, w) => {
    c = c || Xt, p = p || Xt;
    const b = c.length, U = p.length, D = Math.min(b, U);
    let M;
    for (M = 0; M < D; M++) {
      const W = p[M] = w ? yt(p[M]) : Ue(p[M]);
      S(
        c[M],
        W,
        g,
        null,
        v,
        E,
        I,
        A,
        w
      );
    }
    b > U ? ln(
      c,
      v,
      E,
      !0,
      !1,
      D
    ) : Z(
      p,
      g,
      O,
      v,
      E,
      I,
      A,
      w,
      D
    );
  }, Te = (c, p, g, O, v, E, I, A, w) => {
    let b = 0;
    const U = p.length;
    let D = c.length - 1, M = U - 1;
    for (; b <= D && b <= M; ) {
      const W = c[b], q = p[b] = w ? yt(p[b]) : Ue(p[b]);
      if (hn(W, q))
        S(
          W,
          q,
          g,
          null,
          v,
          E,
          I,
          A,
          w
        );
      else
        break;
      b++;
    }
    for (; b <= D && b <= M; ) {
      const W = c[D], q = p[M] = w ? yt(p[M]) : Ue(p[M]);
      if (hn(W, q))
        S(
          W,
          q,
          g,
          null,
          v,
          E,
          I,
          A,
          w
        );
      else
        break;
      D--, M--;
    }
    if (b > D) {
      if (b <= M) {
        const W = M + 1, q = W < U ? p[W].el : O;
        for (; b <= M; )
          S(
            null,
            p[b] = w ? yt(p[b]) : Ue(p[b]),
            g,
            q,
            v,
            E,
            I,
            A,
            w
          ), b++;
      }
    } else if (b > M)
      for (; b <= D; )
        xe(c[b], v, E, !0), b++;
    else {
      const W = b, q = b, oe = /* @__PURE__ */ new Map();
      for (b = q; b <= M; b++) {
        const be = p[b] = w ? yt(p[b]) : Ue(p[b]);
        be.key != null && (oe.has(be.key) && T(
          "Duplicate keys found during update:",
          JSON.stringify(be.key),
          "Make sure keys are unique."
        ), oe.set(be.key, b));
      }
      let Q, Ie = 0;
      const De = M - q + 1;
      let ze = !1, Ge = 0;
      const cn = new Array(De);
      for (b = 0; b < De; b++) cn[b] = 0;
      for (b = W; b <= D; b++) {
        const be = c[b];
        if (Ie >= De) {
          xe(be, v, E, !0);
          continue;
        }
        let qe;
        if (be.key != null)
          qe = oe.get(be.key);
        else
          for (Q = q; Q <= M; Q++)
            if (cn[Q - q] === 0 && hn(be, p[Q])) {
              qe = Q;
              break;
            }
        qe === void 0 ? xe(be, v, E, !0) : (cn[qe - q] = b + 1, qe >= Ge ? Ge = qe : ze = !0, S(
          be,
          p[qe],
          g,
          null,
          v,
          E,
          I,
          A,
          w
        ), Ie++);
      }
      const _s = ze ? Vf(cn) : Xt;
      for (Q = _s.length - 1, b = De - 1; b >= 0; b--) {
        const be = q + b, qe = p[be], gs = p[be + 1], ms = be + 1 < U ? (
          // #13559, fallback to el placeholder for unresolved async component
          gs.el || gs.placeholder
        ) : O;
        cn[b] === 0 ? S(
          null,
          qe,
          g,
          ms,
          v,
          E,
          I,
          A,
          w
        ) : ze && (Q < 0 || b !== _s[Q] ? pe(qe, g, ms, 2) : Q--);
      }
    }
  }, pe = (c, p, g, O, v = null) => {
    const { el: E, type: I, transition: A, children: w, shapeFlag: b } = c;
    if (b & 6) {
      pe(c.component.subTree, p, g, O);
      return;
    }
    if (b & 128) {
      c.suspense.move(p, g, O);
      return;
    }
    if (b & 64) {
      I.move(c, p, g, an);
      return;
    }
    if (I === Ze) {
      r(E, p, g);
      for (let D = 0; D < w.length; D++)
        pe(w[D], p, g, O);
      r(c.anchor, p, g);
      return;
    }
    if (I === tr) {
      ne(c, p, g);
      return;
    }
    if (O !== 2 && b & 1 && A)
      if (O === 0)
        A.beforeEnter(E), r(E, p, g), Pe(() => A.enter(E), v);
      else {
        const { leave: D, delayLeave: M, afterLeave: W } = A, q = () => {
          c.ctx.isUnmounted ? o(E) : r(E, p, g);
        }, oe = () => {
          E._isLeaving && E[Vc](
            !0
            /* cancelled */
          ), D(E, () => {
            q(), W && W();
          });
        };
        M ? M(E, q, oe) : oe();
      }
    else
      r(E, p, g);
  }, xe = (c, p, g, O = !1, v = !1) => {
    const {
      type: E,
      props: I,
      ref: A,
      children: w,
      dynamicChildren: b,
      shapeFlag: U,
      patchFlag: D,
      dirs: M,
      cacheIndex: W
    } = c;
    if (D === -2 && (v = !1), A != null && (He(), Sn(A, null, g, c, !0), Ke()), W != null && (p.renderCache[W] = void 0), U & 256) {
      p.ctx.deactivate(c);
      return;
    }
    const q = U & 1 && M, oe = !On(c);
    let Q;
    if (oe && (Q = I && I.onVnodeBeforeUnmount) && Ye(Q, p, c), U & 6)
      Ea(c.component, g, O);
    else {
      if (U & 128) {
        c.suspense.unmount(g, O);
        return;
      }
      q && xt(c, null, p, "beforeUnmount"), U & 64 ? c.type.remove(
        c,
        p,
        g,
        an,
        O
      ) : b && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !b.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== Ze || D > 0 && D & 64) ? ln(
        b,
        p,
        g,
        !1,
        !0
      ) : (E === Ze && D & 384 || !v && U & 16) && ln(w, p, g), O && Ht(c);
    }
    (oe && (Q = I && I.onVnodeUnmounted) || q) && Pe(() => {
      Q && Ye(Q, p, c), q && xt(c, null, p, "unmounted");
    }, g);
  }, Ht = (c) => {
    const { type: p, el: g, anchor: O, transition: v } = c;
    if (p === Ze) {
      c.patchFlag > 0 && c.patchFlag & 2048 && v && !v.persisted ? c.children.forEach((I) => {
        I.type === Ve ? o(I.el) : Ht(I);
      }) : un(g, O);
      return;
    }
    if (p === tr) {
      N(c);
      return;
    }
    const E = () => {
      o(g), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: I, delayLeave: A } = v, w = () => I(g, E);
      A ? A(c.el, E, w) : w();
    } else
      E();
  }, un = (c, p) => {
    let g;
    for (; c !== p; )
      g = h(c), o(c), c = g;
    o(p);
  }, Ea = (c, p, g) => {
    c.type.__hmrId && bc(c);
    const { bum: O, scope: v, job: E, subTree: I, um: A, m: w, a: b } = c;
    $s(w), $s(b), O && fn(O), v.stop(), E && (E.flags |= 8, xe(I, c, p, g)), A && Pe(A, p), Pe(() => {
      c.isUnmounted = !0;
    }, p), xc(c);
  }, ln = (c, p, g, O = !1, v = !1, E = 0) => {
    for (let I = E; I < c.length; I++)
      xe(c[I], p, g, O, v);
  }, Gn = (c) => {
    if (c.shapeFlag & 6)
      return Gn(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const p = h(c.anchor || c.el), g = p && p[kc];
    return g ? h(g) : p;
  };
  let Ur = !1;
  const hs = (c, p, g) => {
    c == null ? p._vnode && xe(p._vnode, null, null, !0) : S(
      p._vnode || null,
      c,
      p,
      null,
      null,
      null,
      g
    ), p._vnode = c, Ur || (Ur = !0, Os(), Hu(), Ur = !1);
  }, an = {
    p: S,
    um: xe,
    m: pe,
    r: Ht,
    mt: ve,
    mc: Z,
    pc: G,
    pbc: P,
    n: Gn,
    o: e
  };
  return {
    render: hs,
    hydrate: void 0,
    createApp: of(hs)
  };
}
function Yr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function It({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ff(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _o(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (B(r) && B(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let u = o[s];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = o[s] = yt(o[s]), u.el = i.el), !n && u.patchFlag !== -2 && _o(i, u)), u.type === Hn && // avoid cached text nodes retaining detached dom nodes
      u.patchFlag !== -1 && (u.el = i.el), u.type === Ve && !u.el && (u.el = i.el), u.el && (u.el.__vnode = u);
    }
}
function Vf(e) {
  const t = e.slice(), n = [0];
  let r, o, s, i, u;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const d = e[r];
    if (d !== 0) {
      if (o = n[n.length - 1], e[o] < d) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        u = s + i >> 1, e[n[u]] < d ? s = u + 1 : i = u;
      d < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function ml(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ml(t);
}
function $s(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const El = (e) => e.__isSuspense;
function Nf(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : ju(e);
}
const Ze = /* @__PURE__ */ Symbol.for("v-fgt"), Hn = /* @__PURE__ */ Symbol.for("v-txt"), Ve = /* @__PURE__ */ Symbol.for("v-cmt"), tr = /* @__PURE__ */ Symbol.for("v-stc"), An = [];
let Fe = null;
function go(e = !1) {
  An.push(Fe = e ? null : []);
}
function $f() {
  An.pop(), Fe = An[An.length - 1] || null;
}
let Rn = 1;
function Ls(e, t = !1) {
  Rn += e, e < 0 && Fe && t && (Fe.hasOnce = !0);
}
function yl(e) {
  return e.dynamicChildren = Rn > 0 ? Fe || Xt : null, $f(), Rn > 0 && Fe && Fe.push(e), e;
}
function Ms(e, t, n, r, o, s) {
  return yl(
    Oe(
      e,
      t,
      n,
      r,
      o,
      s,
      !0
    )
  );
}
function Lf(e, t, n, r, o) {
  return yl(
    ft(
      e,
      t,
      n,
      r,
      o,
      !0
    )
  );
}
function Vr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function hn(e, t) {
  if (t.shapeFlag & 6 && e.component) {
    const n = er.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Mf = (...e) => Uf(
  ...e
), vl = ({ key: e }) => e ?? null, nr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || re(e) || j(e) ? { i: ke, r: e, k: t, f: !!n } : e : null);
function Oe(e, t = null, n = null, r = 0, o = null, s = e === Ze ? 0 : 1, i = !1, u = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vl(t),
    ref: t && nr(t),
    scopeId: Yu,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ke
  };
  return u ? (Zo(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= ae(n) ? 8 : 16), l.key !== l.key && T("VNode created with invalid key (NaN). VNode type:", l.type), Rn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Fe.push(l), l;
}
const ft = Mf;
function Uf(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Gc) && (e || T(`Invalid vnode type when creating vnode: ${e}.`), e = Ve), Vr(e)) {
    const u = Ct(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Zo(u, n), Rn > 0 && !s && Fe && (u.shapeFlag & 6 ? Fe[Fe.indexOf(e)] = u : Fe.push(u)), u.patchFlag = -2, u;
  }
  if (Cl(e) && (e = e.__vccOpts), t) {
    t = Bf(t);
    let { class: u, style: l } = t;
    u && !ae(u) && (t.class = $o(u)), te(l) && (Qt(l) && !B(l) && (l = de({}, l)), t.style = No(l));
  }
  const i = ae(e) ? 1 : El(e) ? 128 : Fc(e) ? 64 : te(e) ? 4 : j(e) ? 2 : 0;
  return i & 4 && Qt(e) && (e = H(e), T(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Oe(
    e,
    t,
    n,
    r,
    o,
    i,
    s,
    !0
  );
}
function Bf(e) {
  return e ? Qt(e) || fl(e) ? de({}, e) : e : null;
}
function Ct(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: u, transition: l } = e, d = t ? Kf(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && vl(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? B(s) ? s.concat(nr(t)) : [s, nr(t)] : nr(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i === -1 && B(u) ? u.map(bl) : u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ze ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ct(e.ssContent),
    ssFallback: e.ssFallback && Ct(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && r && zo(
    f,
    l.clone(f)
  ), f;
}
function bl(e) {
  const t = Ct(e);
  return B(e.children) && (t.children = e.children.map(bl)), t;
}
function jf(e = " ", t = 0) {
  return ft(Hn, null, e, t);
}
function Hf(e = "", t = !1) {
  return t ? (go(), Lf(Ve, null, e)) : ft(Ve, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? ft(Ve) : B(e) ? ft(
    Ze,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Vr(e) ? yt(e) : ft(Hn, null, String(e));
}
function yt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ct(e);
}
function Zo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Zo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !fl(t) ? t._ctx = ke : o === 3 && ke && (ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: ke }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [jf(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Kf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = $o([t.class, r.class]));
      else if (o === "style")
        t.style = No([t.style, r.style]);
      else if (Mn(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(B(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Ye(e, t, n, r = null) {
  it(e, t, 7, [
    n,
    r
  ]);
}
const Wf = ol();
let zf = 0;
function Gf(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Wf, s = {
    uid: zf++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Eu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: pl(r, o),
    emitsOptions: ul(r, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ee,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ee,
    data: ee,
    props: ee,
    attrs: ee,
    slots: ee,
    refs: ee,
    setupState: ee,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = qc(s), s.root = t ? t.root : s, s.emit = df.bind(null, s), e.ce && e.ce(s), s;
}
let ce = null;
const Nr = () => ce || ke;
let br, mo;
{
  const e = Un(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (s) => {
      o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
    };
  };
  br = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ce = n
  ), mo = t(
    "__VUE_SSR_SETTERS__",
    (n) => kn = n
  );
}
const Kn = (e) => {
  const t = ce;
  return br(e), e.scope.on(), () => {
    e.scope.off(), br(t);
  };
}, Us = () => {
  ce && ce.scope.off(), br(null);
}, qf = /* @__PURE__ */ ht("slot,component");
function Eo(e, { isNativeTag: t }) {
  (qf(e) || t(e)) && T(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Sl(e) {
  return e.vnode.shapeFlag & 4;
}
let kn = !1;
function Yf(e, t = !1, n = !1) {
  t && mo(t);
  const { props: r, children: o } = e.vnode, s = Sl(e);
  Ef(e, r, s, t), If(e, o, n || t);
  const i = s ? Jf(e, t) : void 0;
  return t && mo(!1), i;
}
function Jf(e, t) {
  const n = e.type;
  {
    if (n.name && Eo(n.name, e.appContext.config), n.components) {
      const o = Object.keys(n.components);
      for (let s = 0; s < o.length; s++)
        Eo(o[s], e.appContext.config);
    }
    if (n.directives) {
      const o = Object.keys(n.directives);
      for (let s = 0; s < o.length; s++)
        Ju(o[s]);
    }
    n.compilerOptions && Xf() && T(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, tl), Yc(e);
  const { setup: r } = n;
  if (r) {
    He();
    const o = e.setupContext = r.length > 1 ? ed(e) : null, s = Kn(e), i = rn(
      r,
      e,
      0,
      [
        tt(e.props),
        o
      ]
    ), u = Fo(i);
    if (Ke(), s(), (u || e.sp) && !On(e) && Xu(e), u) {
      if (i.then(Us, Us), t)
        return i.then((l) => {
          Bs(e, l, t);
        }).catch((l) => {
          Bn(l, e, 0);
        });
      if (e.asyncDep = i, !e.suspense) {
        const l = Wn(e, n);
        T(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Bs(e, i, t);
  } else
    Ol(e, t);
}
function Bs(e, t, n) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) ? (Vr(t) && T(
    "setup() should not return VNodes directly - return a render function instead."
  ), e.devtoolsRawSetupState = t, e.setupState = $u(t), Jc(e)) : t !== void 0 && T(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Ol(e, n);
}
const Xf = () => !0;
function Ol(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Ee);
  {
    const o = Kn(e);
    He();
    try {
      Zc(e);
    } finally {
      Ke(), o();
    }
  }
  !r.render && e.render === Ee && !t && (r.template ? T(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : T("Component is missing template or render function: ", r));
}
const Zf = {
  get(e, t) {
    return yr(), _e(e, "get", ""), e[t];
  },
  set() {
    return T("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return T("setupContext.attrs is readonly."), !1;
  }
};
function Qf(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return _e(e, "get", "$slots"), t[n];
    }
  });
}
function ed(e) {
  const t = (n) => {
    if (e.exposed && T("expose() should be called only once per setup()."), n != null) {
      let r = typeof n;
      r === "object" && (B(n) ? r = "array" : re(n) && (r = "ref")), r !== "object" && T(
        `expose() should be passed a plain object, received ${r}.`
      );
    }
    e.exposed = n || {};
  };
  {
    let n, r;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, Zf));
      },
      get slots() {
        return r || (r = Qf(e));
      },
      get emit() {
        return (o, ...s) => e.emit(o, ...s);
      },
      expose: t
    });
  }
}
function Qo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy($u(bt(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in $t)
        return $t[n](e);
    },
    has(t, n) {
      return n in t || n in $t;
    }
  })) : e.proxy;
}
const td = /(?:^|[-_])\w/g, nd = (e) => e.replace(td, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function wl(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Wn(e, t, n = !1) {
  let r = wl(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e) {
    const o = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    r = o(e.components) || e.parent && o(
      e.parent.type.components
    ) || o(e.appContext.components);
  }
  return r ? nd(r) : n ? "App" : "Anonymous";
}
function Cl(e) {
  return j(e) && "__vccOpts" in e;
}
const es = (e, t) => {
  const n = cc(e, t, kn);
  {
    const r = Nr();
    r && r.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function rd() {
  if (typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, o = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!te(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (re(a)) {
        He();
        const h = a.value;
        return Ke(), [
          "div",
          {},
          ["span", e, f(a)],
          "<",
          u(h),
          ">"
        ];
      } else {
        if (rt(a))
          return [
            "div",
            {},
            ["span", e, Ae(a) ? "ShallowReactive" : "Reactive"],
            "<",
            u(a),
            `>${st(a) ? " (readonly)" : ""}`
          ];
        if (st(a))
          return [
            "div",
            {},
            ["span", e, Ae(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            u(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...s(a.$)
        ];
    }
  };
  function s(a) {
    const h = [];
    a.type.props && a.props && h.push(i("props", H(a.props))), a.setupState !== ee && h.push(i("setup", a.setupState)), a.data !== ee && h.push(i("data", H(a.data)));
    const _ = l(a, "computed");
    _ && h.push(i("computed", _));
    const m = l(a, "inject");
    return m && h.push(i("injected", m)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), h;
  }
  function i(a, h) {
    return h = de({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((_) => [
          "div",
          {},
          ["span", r, _ + ": "],
          u(h[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function u(a, h = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", r, a] : te(a) ? ["object", { object: h ? H(a) : a }] : ["span", n, String(a)];
  }
  function l(a, h) {
    const _ = a.type;
    if (j(_))
      return;
    const m = {};
    for (const S in a.ctx)
      d(_, S, h) && (m[S] = a.ctx[S]);
    return m;
  }
  function d(a, h, _) {
    const m = a[_];
    if (B(m) && m.includes(h) || te(m) && h in m || a.extends && d(a.extends, h, _) || a.mixins && a.mixins.some((S) => d(S, h, _)))
      return !0;
  }
  function f(a) {
    return Ae(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const js = "3.5.25", dt = T;
let yo;
const Hs = typeof window < "u" && window.trustedTypes;
if (Hs)
  try {
    yo = /* @__PURE__ */ Hs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    dt(`Error creating trusted types policy: ${e}`);
  }
const Al = yo ? (e) => yo.createHTML(e) : (e) => e, od = "http://www.w3.org/2000/svg", sd = "http://www.w3.org/1998/Math/MathML", at = typeof document < "u" ? document : null, Ks = at && /* @__PURE__ */ at.createElement("template"), id = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? at.createElementNS(od, e) : t === "mathml" ? at.createElementNS(sd, e) : n ? at.createElement(e, { is: n }) : at.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => at.createTextNode(e),
  createComment: (e) => at.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => at.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, o, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      Ks.innerHTML = Al(
        r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Ks.content;
      if (r === "svg" || r === "mathml") {
        const l = u.firstChild;
        for (; l.firstChild; )
          u.appendChild(l.firstChild);
        u.removeChild(l);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ud = /* @__PURE__ */ Symbol("_vtc");
function ld(e, t, n) {
  const r = e[ud];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ws = /* @__PURE__ */ Symbol("_vod"), ad = /* @__PURE__ */ Symbol("_vsh"), cd = /* @__PURE__ */ Symbol("CSS_VAR_TEXT"), fd = /(?:^|;)\s*display\s*:/;
function dd(e, t, n) {
  const r = e.style, o = ae(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ae(t))
        for (const i of t.split(";")) {
          const u = i.slice(0, i.indexOf(":")).trim();
          n[u] == null && rr(r, u, "");
        }
      else
        for (const i in t)
          n[i] == null && rr(r, i, "");
    for (const i in n)
      i === "display" && (s = !0), rr(r, i, n[i]);
  } else if (o) {
    if (t !== n) {
      const i = r[cd];
      i && (n += ";" + i), r.cssText = n, s = fd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ws in e && (e[Ws] = s ? r.display : "", e[ad] && (r.display = "none"));
}
const pd = /[^\\];\s*$/, zs = /\s*!important$/;
function rr(e, t, n) {
  if (B(n))
    n.forEach((r) => rr(e, t, r));
  else if (n == null && (n = ""), pd.test(n) && dt(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = hd(e, t);
    zs.test(n) ? e.setProperty(
      wt(r),
      n.replace(zs, ""),
      "important"
    ) : e[r] = n;
  }
}
const Gs = ["Webkit", "Moz", "ms"], Jr = {};
function hd(e, t) {
  const n = Jr[t];
  if (n)
    return n;
  let r = Be(t);
  if (r !== "filter" && r in e)
    return Jr[t] = r;
  r = Tr(r);
  for (let o = 0; o < Gs.length; o++) {
    const s = Gs[o] + r;
    if (s in e)
      return Jr[t] = s;
  }
  return t;
}
const qs = "http://www.w3.org/1999/xlink";
function Ys(e, t, n, r, o, s = Va(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(qs, t.slice(6, t.length)) : e.setAttributeNS(qs, t, n) : n == null || s && !_u(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Tt(n) ? String(n) : n
  );
}
function Js(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Al(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = _u(n) : n == null && u === "string" ? (n = "", i = !0) : u === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
    i || dt(
      `Failed setting prop "${t}" on <${s.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  i && e.removeAttribute(o || t);
}
function _d(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function gd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Xs = /* @__PURE__ */ Symbol("_vei");
function md(e, t, n, r, o = null) {
  const s = e[Xs] || (e[Xs] = {}), i = s[t];
  if (r && i)
    i.value = Qs(r, t);
  else {
    const [u, l] = Ed(t);
    if (r) {
      const d = s[t] = bd(
        Qs(r, t),
        o
      );
      _d(e, u, d, l);
    } else i && (gd(e, u, i, l), s[t] = void 0);
  }
}
const Zs = /(?:Once|Passive|Capture)$/;
function Ed(e) {
  let t;
  if (Zs.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Zs); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let Xr = 0;
const yd = /* @__PURE__ */ Promise.resolve(), vd = () => Xr || (yd.then(() => Xr = 0), Xr = Date.now());
function bd(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    it(
      Sd(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = vd(), n;
}
function Qs(e, t) {
  return j(e) || B(e) ? e : (dt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Ee);
}
function Sd(e, t) {
  if (B(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (o) => !o._stopped && r && r(o)
    );
  } else
    return t;
}
const ei = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Od = (e, t, n, r, o, s) => {
  const i = o === "svg";
  t === "class" ? ld(e, r, i) : t === "style" ? dd(e, n, r) : Mn(t) ? cr(t) || md(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wd(e, t, r, i)) ? (Js(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ys(e, t, r, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ae(r)) ? Js(e, Be(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ys(e, t, r, i));
};
function wd(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ei(t) && j(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ei(t) && ae(n) ? !1 : t in e;
}
const Cd = /* @__PURE__ */ de({ patchProp: Od }, id);
let ti;
function Ad() {
  return ti || (ti = Rf(Cd));
}
const Td = ((...e) => {
  const t = Ad().createApp(...e);
  Id(t), Dd(t);
  const { mount: n } = t;
  return t.mount = (r) => {
    const o = Pd(r);
    if (!o) return;
    const s = t._component;
    !j(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = n(o, !1, xd(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
});
function xd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Id(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Pa(t) || Ra(t) || ka(t),
    writable: !1
  });
}
function Dd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        dt(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, r = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return dt(r), n;
      },
      set() {
        dt(r);
      }
    });
  }
}
function Pd(e) {
  if (ae(e)) {
    const t = document.querySelector(e);
    return t || dt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && dt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function Rd() {
  rd();
}
Rd();
var kd = Object.create, Tl = Object.defineProperty, Fd = Object.getOwnPropertyDescriptor, ts = Object.getOwnPropertyNames, Vd = Object.getPrototypeOf, Nd = Object.prototype.hasOwnProperty, $d = (e, t) => function() {
  return e && (t = (0, e[ts(e)[0]])(e = 0)), t;
}, Ld = (e, t) => function() {
  return t || (0, e[ts(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Md = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of ts(t))
      !Nd.call(e, o) && o !== n && Tl(e, o, { get: () => t[o], enumerable: !(r = Fd(t, o)) || r.enumerable });
  return e;
}, Ud = (e, t, n) => (n = e != null ? kd(Vd(e)) : {}, Md(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Tl(n, "default", { value: e, enumerable: !0 }),
  e
)), zn = $d({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), Bd = Ld({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    zn(), t.exports = r;
    function n(s) {
      return s instanceof Buffer ? Buffer.from(s) : new s.constructor(s.buffer.slice(), s.byteOffset, s.length);
    }
    function r(s) {
      if (s = s || {}, s.circles) return o(s);
      const i = /* @__PURE__ */ new Map();
      if (i.set(Date, (a) => new Date(a)), i.set(Map, (a, h) => new Map(l(Array.from(a), h))), i.set(Set, (a, h) => new Set(l(Array.from(a), h))), s.constructorHandlers)
        for (const a of s.constructorHandlers)
          i.set(a[0], a[1]);
      let u = null;
      return s.proto ? f : d;
      function l(a, h) {
        const _ = Object.keys(a), m = new Array(_.length);
        for (let S = 0; S < _.length; S++) {
          const x = _[S], C = a[x];
          typeof C != "object" || C === null ? m[x] = C : C.constructor !== Object && (u = i.get(C.constructor)) ? m[x] = u(C, h) : ArrayBuffer.isView(C) ? m[x] = n(C) : m[x] = h(C);
        }
        return m;
      }
      function d(a) {
        if (typeof a != "object" || a === null) return a;
        if (Array.isArray(a)) return l(a, d);
        if (a.constructor !== Object && (u = i.get(a.constructor)))
          return u(a, d);
        const h = {};
        for (const _ in a) {
          if (Object.hasOwnProperty.call(a, _) === !1) continue;
          const m = a[_];
          typeof m != "object" || m === null ? h[_] = m : m.constructor !== Object && (u = i.get(m.constructor)) ? h[_] = u(m, d) : ArrayBuffer.isView(m) ? h[_] = n(m) : h[_] = d(m);
        }
        return h;
      }
      function f(a) {
        if (typeof a != "object" || a === null) return a;
        if (Array.isArray(a)) return l(a, f);
        if (a.constructor !== Object && (u = i.get(a.constructor)))
          return u(a, f);
        const h = {};
        for (const _ in a) {
          const m = a[_];
          typeof m != "object" || m === null ? h[_] = m : m.constructor !== Object && (u = i.get(m.constructor)) ? h[_] = u(m, f) : ArrayBuffer.isView(m) ? h[_] = n(m) : h[_] = f(m);
        }
        return h;
      }
    }
    function o(s) {
      const i = [], u = [], l = /* @__PURE__ */ new Map();
      if (l.set(Date, (_) => new Date(_)), l.set(Map, (_, m) => new Map(f(Array.from(_), m))), l.set(Set, (_, m) => new Set(f(Array.from(_), m))), s.constructorHandlers)
        for (const _ of s.constructorHandlers)
          l.set(_[0], _[1]);
      let d = null;
      return s.proto ? h : a;
      function f(_, m) {
        const S = Object.keys(_), x = new Array(S.length);
        for (let C = 0; C < S.length; C++) {
          const $ = S[C], V = _[$];
          if (typeof V != "object" || V === null)
            x[$] = V;
          else if (V.constructor !== Object && (d = l.get(V.constructor)))
            x[$] = d(V, m);
          else if (ArrayBuffer.isView(V))
            x[$] = n(V);
          else {
            const ne = i.indexOf(V);
            ne !== -1 ? x[$] = u[ne] : x[$] = m(V);
          }
        }
        return x;
      }
      function a(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, a);
        if (_.constructor !== Object && (d = l.get(_.constructor)))
          return d(_, a);
        const m = {};
        i.push(_), u.push(m);
        for (const S in _) {
          if (Object.hasOwnProperty.call(_, S) === !1) continue;
          const x = _[S];
          if (typeof x != "object" || x === null)
            m[S] = x;
          else if (x.constructor !== Object && (d = l.get(x.constructor)))
            m[S] = d(x, a);
          else if (ArrayBuffer.isView(x))
            m[S] = n(x);
          else {
            const C = i.indexOf(x);
            C !== -1 ? m[S] = u[C] : m[S] = a(x);
          }
        }
        return i.pop(), u.pop(), m;
      }
      function h(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, h);
        if (_.constructor !== Object && (d = l.get(_.constructor)))
          return d(_, h);
        const m = {};
        i.push(_), u.push(m);
        for (const S in _) {
          const x = _[S];
          if (typeof x != "object" || x === null)
            m[S] = x;
          else if (x.constructor !== Object && (d = l.get(x.constructor)))
            m[S] = d(x, h);
          else if (ArrayBuffer.isView(x))
            m[S] = n(x);
          else {
            const C = i.indexOf(x);
            C !== -1 ? m[S] = u[C] : m[S] = h(x);
          }
        }
        return i.pop(), u.pop(), m;
      }
    }
  }
});
zn();
zn();
zn();
var xl = typeof navigator < "u", F = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof F.chrome < "u" && F.chrome.devtools;
xl && (F.self, F.top);
var ni;
typeof navigator < "u" && ((ni = navigator.userAgent) == null || ni.toLowerCase().includes("electron"));
zn();
var jd = Ud(Bd()), Hd = /(?:^|[-_/])(\w)/g;
function Kd(e, t) {
  return t ? t.toUpperCase() : "";
}
function Wd(e) {
  return e && `${e}`.replace(Hd, Kd);
}
function zd(e, t) {
  let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
  const r = n.lastIndexOf("/"), o = n.substring(r + 1);
  {
    const s = o.lastIndexOf(t);
    return o.substring(0, s);
  }
}
var ri = (0, jd.default)({ circles: !0 });
const Gd = {
  trailing: !0
};
function en(e, t = 25, n = {}) {
  if (n = { ...Gd, ...n }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let r, o, s = [], i, u;
  const l = (d, f) => (i = qd(e, d, f), i.finally(() => {
    if (i = null, n.trailing && u && !o) {
      const a = l(d, u);
      return u = null, a;
    }
  }), i);
  return function(...d) {
    return i ? (n.trailing && (u = d), i) : new Promise((f) => {
      const a = !o && n.leading;
      clearTimeout(o), o = setTimeout(() => {
        o = null;
        const h = n.leading ? r : l(this, d);
        for (const _ of s)
          _(h);
        s = [];
      }, t), a ? (r = l(this, d), f(r)) : s.push(f);
    });
  };
}
async function qd(e, t, n) {
  return await e.apply(t, n);
}
function vo(e, t = {}, n) {
  for (const r in e) {
    const o = e[r], s = n ? `${n}:${r}` : r;
    typeof o == "object" && o !== null ? vo(o, t, s) : typeof o == "function" && (t[s] = o);
  }
  return t;
}
const Yd = { run: (e) => e() }, Jd = () => Yd, Il = typeof console.createTask < "u" ? console.createTask : Jd;
function Xd(e, t) {
  const n = t.shift(), r = Il(n);
  return e.reduce(
    (o, s) => o.then(() => r.run(() => s(...t))),
    Promise.resolve()
  );
}
function Zd(e, t) {
  const n = t.shift(), r = Il(n);
  return Promise.all(e.map((o) => r.run(() => o(...t))));
}
function Zr(e, t) {
  for (const n of [...e])
    n(t);
}
class Qd {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != "function")
      return () => {
      };
    const o = t;
    let s;
    for (; this._deprecatedHooks[t]; )
      s = this._deprecatedHooks[t], t = s.to;
    if (s && !r.allowDeprecated) {
      let i = s.message;
      i || (i = `${o} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
      n && (this.removeHook(t, n), n = void 0);
    };
  }
  hookOnce(t, n) {
    let r, o = (...s) => (typeof r == "function" && r(), r = void 0, o = void 0, n(...s));
    return r = this.hook(t, o), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const o of r)
      this.hook(t, o);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t)
      this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = vo(t), r = Object.keys(n).map(
      (o) => this.hook(o, n[o])
    );
    return () => {
      for (const o of r.splice(0, r.length))
        o();
    };
  }
  removeHooks(t) {
    const n = vo(t);
    for (const r in n)
      this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Xd, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Zd, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const o = this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Zr(this._before, o);
    const s = t(
      n in this._hooks ? [...this._hooks[n]] : [],
      r
    );
    return s instanceof Promise ? s.finally(() => {
      this._after && o && Zr(this._after, o);
    }) : (this._after && o && Zr(this._after, o), s);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    };
  }
}
function Dl() {
  return new Qd();
}
var ep = Object.create, Pl = Object.defineProperty, tp = Object.getOwnPropertyDescriptor, ns = Object.getOwnPropertyNames, np = Object.getPrototypeOf, rp = Object.prototype.hasOwnProperty, op = (e, t) => function() {
  return e && (t = (0, e[ns(e)[0]])(e = 0)), t;
}, Rl = (e, t) => function() {
  return t || (0, e[ns(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, sp = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of ns(t))
      !rp.call(e, o) && o !== n && Pl(e, o, { get: () => t[o], enumerable: !(r = tp(t, o)) || r.enumerable });
  return e;
}, ip = (e, t, n) => (n = e != null ? ep(np(e)) : {}, sp(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Pl(n, "default", { value: e, enumerable: !0 }),
  e
)), y = op({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), up = Rl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    y(), (function(n) {
      var r = {
        // latin
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "Ae",
        Å: "A",
        Æ: "AE",
        Ç: "C",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        Ð: "D",
        Ñ: "N",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "Oe",
        Ő: "O",
        Ø: "O",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "Ue",
        Ű: "U",
        Ý: "Y",
        Þ: "TH",
        ß: "ss",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "ae",
        å: "a",
        æ: "ae",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ð: "d",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "oe",
        ő: "o",
        ø: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "ue",
        ű: "u",
        ý: "y",
        þ: "th",
        ÿ: "y",
        "ẞ": "SS",
        // language specific
        // Arabic
        ا: "a",
        أ: "a",
        إ: "i",
        آ: "aa",
        ؤ: "u",
        ئ: "e",
        ء: "a",
        ب: "b",
        ت: "t",
        ث: "th",
        ج: "j",
        ح: "h",
        خ: "kh",
        د: "d",
        ذ: "th",
        ر: "r",
        ز: "z",
        س: "s",
        ش: "sh",
        ص: "s",
        ض: "dh",
        ط: "t",
        ظ: "z",
        ع: "a",
        غ: "gh",
        ف: "f",
        ق: "q",
        ك: "k",
        ل: "l",
        م: "m",
        ن: "n",
        ه: "h",
        و: "w",
        ي: "y",
        ى: "a",
        ة: "h",
        ﻻ: "la",
        ﻷ: "laa",
        ﻹ: "lai",
        ﻵ: "laa",
        // Persian additional characters than Arabic
        گ: "g",
        چ: "ch",
        پ: "p",
        ژ: "zh",
        ک: "k",
        ی: "y",
        // Arabic diactrics
        "َ": "a",
        "ً": "an",
        "ِ": "e",
        "ٍ": "en",
        "ُ": "u",
        "ٌ": "on",
        "ْ": "",
        // Arabic numbers
        "٠": "0",
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        // Persian numbers
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        // Burmese consonants
        က: "k",
        ခ: "kh",
        ဂ: "g",
        ဃ: "ga",
        င: "ng",
        စ: "s",
        ဆ: "sa",
        ဇ: "z",
        "စျ": "za",
        ည: "ny",
        ဋ: "t",
        ဌ: "ta",
        ဍ: "d",
        ဎ: "da",
        ဏ: "na",
        တ: "t",
        ထ: "ta",
        ဒ: "d",
        ဓ: "da",
        န: "n",
        ပ: "p",
        ဖ: "pa",
        ဗ: "b",
        ဘ: "ba",
        မ: "m",
        ယ: "y",
        ရ: "ya",
        လ: "l",
        ဝ: "w",
        သ: "th",
        ဟ: "h",
        ဠ: "la",
        အ: "a",
        // consonant character combos
        "ြ": "y",
        "ျ": "ya",
        "ွ": "w",
        "ြွ": "yw",
        "ျွ": "ywa",
        "ှ": "h",
        // independent vowels
        ဧ: "e",
        "၏": "-e",
        ဣ: "i",
        ဤ: "-i",
        ဉ: "u",
        ဦ: "-u",
        ဩ: "aw",
        "သြော": "aw",
        ဪ: "aw",
        // numbers
        "၀": "0",
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        // virama and tone marks which are silent in transliteration
        "္": "",
        "့": "",
        "း": "",
        // Czech
        č: "c",
        ď: "d",
        ě: "e",
        ň: "n",
        ř: "r",
        š: "s",
        ť: "t",
        ů: "u",
        ž: "z",
        Č: "C",
        Ď: "D",
        Ě: "E",
        Ň: "N",
        Ř: "R",
        Š: "S",
        Ť: "T",
        Ů: "U",
        Ž: "Z",
        // Dhivehi
        ހ: "h",
        ށ: "sh",
        ނ: "n",
        ރ: "r",
        ބ: "b",
        ޅ: "lh",
        ކ: "k",
        އ: "a",
        ވ: "v",
        މ: "m",
        ފ: "f",
        ދ: "dh",
        ތ: "th",
        ލ: "l",
        ގ: "g",
        ޏ: "gn",
        ސ: "s",
        ޑ: "d",
        ޒ: "z",
        ޓ: "t",
        ޔ: "y",
        ޕ: "p",
        ޖ: "j",
        ޗ: "ch",
        ޘ: "tt",
        ޙ: "hh",
        ޚ: "kh",
        ޛ: "th",
        ޜ: "z",
        ޝ: "sh",
        ޞ: "s",
        ޟ: "d",
        ޠ: "t",
        ޡ: "z",
        ޢ: "a",
        ޣ: "gh",
        ޤ: "q",
        ޥ: "w",
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": "",
        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        ა: "a",
        ბ: "b",
        გ: "g",
        დ: "d",
        ე: "e",
        ვ: "v",
        ზ: "z",
        თ: "t",
        ი: "i",
        კ: "k",
        ლ: "l",
        მ: "m",
        ნ: "n",
        ო: "o",
        პ: "p",
        ჟ: "zh",
        რ: "r",
        ს: "s",
        ტ: "t",
        უ: "u",
        ფ: "p",
        ქ: "k",
        ღ: "gh",
        ყ: "q",
        შ: "sh",
        ჩ: "ch",
        ც: "ts",
        ძ: "dz",
        წ: "ts",
        ჭ: "ch",
        ხ: "kh",
        ჯ: "j",
        ჰ: "h",
        // Greek
        α: "a",
        β: "v",
        γ: "g",
        δ: "d",
        ε: "e",
        ζ: "z",
        η: "i",
        θ: "th",
        ι: "i",
        κ: "k",
        λ: "l",
        μ: "m",
        ν: "n",
        ξ: "ks",
        ο: "o",
        π: "p",
        ρ: "r",
        σ: "s",
        τ: "t",
        υ: "y",
        φ: "f",
        χ: "x",
        ψ: "ps",
        ω: "o",
        ά: "a",
        έ: "e",
        ί: "i",
        ό: "o",
        ύ: "y",
        ή: "i",
        ώ: "o",
        ς: "s",
        ϊ: "i",
        ΰ: "y",
        ϋ: "y",
        ΐ: "i",
        Α: "A",
        Β: "B",
        Γ: "G",
        Δ: "D",
        Ε: "E",
        Ζ: "Z",
        Η: "I",
        Θ: "TH",
        Ι: "I",
        Κ: "K",
        Λ: "L",
        Μ: "M",
        Ν: "N",
        Ξ: "KS",
        Ο: "O",
        Π: "P",
        Ρ: "R",
        Σ: "S",
        Τ: "T",
        Υ: "Y",
        Φ: "F",
        Χ: "X",
        Ψ: "PS",
        Ω: "O",
        Ά: "A",
        Έ: "E",
        Ί: "I",
        Ό: "O",
        Ύ: "Y",
        Ή: "I",
        Ώ: "O",
        Ϊ: "I",
        Ϋ: "Y",
        // Latvian
        ā: "a",
        // 'č': 'c', // duplicate
        ē: "e",
        ģ: "g",
        ī: "i",
        ķ: "k",
        ļ: "l",
        ņ: "n",
        // 'š': 's', // duplicate
        ū: "u",
        // 'ž': 'z', // duplicate
        Ā: "A",
        // 'Č': 'C', // duplicate
        Ē: "E",
        Ģ: "G",
        Ī: "I",
        Ķ: "k",
        Ļ: "L",
        Ņ: "N",
        // 'Š': 'S', // duplicate
        Ū: "U",
        // 'Ž': 'Z', // duplicate
        // Macedonian
        Ќ: "Kj",
        ќ: "kj",
        Љ: "Lj",
        љ: "lj",
        Њ: "Nj",
        њ: "nj",
        Тс: "Ts",
        тс: "ts",
        // Polish
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        // 'ó': 'o', // duplicate
        ś: "s",
        ź: "z",
        ż: "z",
        Ą: "A",
        Ć: "C",
        Ę: "E",
        Ł: "L",
        Ń: "N",
        Ś: "S",
        Ź: "Z",
        Ż: "Z",
        // Ukranian
        Є: "Ye",
        І: "I",
        Ї: "Yi",
        Ґ: "G",
        є: "ye",
        і: "i",
        ї: "yi",
        ґ: "g",
        // Romanian
        ă: "a",
        Ă: "A",
        ș: "s",
        Ș: "S",
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        ț: "t",
        Ț: "T",
        ţ: "t",
        Ţ: "T",
        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "I",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "Kh",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Sh",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",
        // Serbian
        ђ: "dj",
        ј: "j",
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        ћ: "c",
        џ: "dz",
        Ђ: "Dj",
        Ј: "j",
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        Ћ: "C",
        Џ: "Dz",
        // Slovak
        ľ: "l",
        ĺ: "l",
        ŕ: "r",
        Ľ: "L",
        Ĺ: "L",
        Ŕ: "R",
        // Turkish
        ş: "s",
        Ş: "S",
        ı: "i",
        İ: "I",
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        ğ: "g",
        Ğ: "G",
        // Vietnamese
        ả: "a",
        Ả: "A",
        ẳ: "a",
        Ẳ: "A",
        ẩ: "a",
        Ẩ: "A",
        đ: "d",
        Đ: "D",
        ẹ: "e",
        Ẹ: "E",
        ẽ: "e",
        Ẽ: "E",
        ẻ: "e",
        Ẻ: "E",
        ế: "e",
        Ế: "E",
        ề: "e",
        Ề: "E",
        ệ: "e",
        Ệ: "E",
        ễ: "e",
        Ễ: "E",
        ể: "e",
        Ể: "E",
        ỏ: "o",
        ọ: "o",
        Ọ: "o",
        ố: "o",
        Ố: "O",
        ồ: "o",
        Ồ: "O",
        ổ: "o",
        Ổ: "O",
        ộ: "o",
        Ộ: "O",
        ỗ: "o",
        Ỗ: "O",
        ơ: "o",
        Ơ: "O",
        ớ: "o",
        Ớ: "O",
        ờ: "o",
        Ờ: "O",
        ợ: "o",
        Ợ: "O",
        ỡ: "o",
        Ỡ: "O",
        Ở: "o",
        ở: "o",
        ị: "i",
        Ị: "I",
        ĩ: "i",
        Ĩ: "I",
        ỉ: "i",
        Ỉ: "i",
        ủ: "u",
        Ủ: "U",
        ụ: "u",
        Ụ: "U",
        ũ: "u",
        Ũ: "U",
        ư: "u",
        Ư: "U",
        ứ: "u",
        Ứ: "U",
        ừ: "u",
        Ừ: "U",
        ự: "u",
        Ự: "U",
        ữ: "u",
        Ữ: "U",
        ử: "u",
        Ử: "ư",
        ỷ: "y",
        Ỷ: "y",
        ỳ: "y",
        Ỳ: "Y",
        ỵ: "y",
        Ỵ: "Y",
        ỹ: "y",
        Ỹ: "Y",
        ạ: "a",
        Ạ: "A",
        ấ: "a",
        Ấ: "A",
        ầ: "a",
        Ầ: "A",
        ậ: "a",
        Ậ: "A",
        ẫ: "a",
        Ẫ: "A",
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        ắ: "a",
        Ắ: "A",
        ằ: "a",
        Ằ: "A",
        ặ: "a",
        Ặ: "A",
        ẵ: "a",
        Ẵ: "A",
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",
        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",
        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",
        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",
        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",
        // symbols
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "∂": "d",
        ƒ: "f",
        "™": "(TM)",
        "©": "(C)",
        œ: "oe",
        Œ: "OE",
        "®": "(R)",
        "†": "+",
        "℠": "(SM)",
        "…": "...",
        "˚": "o",
        º: "o",
        ª: "a",
        "•": "*",
        "၊": ",",
        "။": ".",
        // currency
        $: "USD",
        "€": "EUR",
        "₢": "BRN",
        "₣": "FRF",
        "£": "GBP",
        "₤": "ITL",
        "₦": "NGN",
        "₧": "ESP",
        "₩": "KRW",
        "₪": "ILS",
        "₫": "VND",
        "₭": "LAK",
        "₮": "MNT",
        "₯": "GRD",
        "₱": "ARS",
        "₲": "PYG",
        "₳": "ARA",
        "₴": "UAH",
        "₵": "GHS",
        "¢": "cent",
        "¥": "CNY",
        元: "CNY",
        円: "YEN",
        "﷼": "IRR",
        "₠": "EWE",
        "฿": "THB",
        "₨": "INR",
        "₹": "INR",
        "₰": "PF",
        "₺": "TRY",
        "؋": "AFN",
        "₼": "AZN",
        лв: "BGN",
        "៛": "KHR",
        "₡": "CRC",
        "₸": "KZT",
        ден: "MKD",
        zł: "PLN",
        "₽": "RUB",
        "₾": "GEL"
      }, o = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ], s = {
        // Burmese
        // dependent vowels
        "ာ": "a",
        "ါ": "a",
        "ေ": "e",
        "ဲ": "e",
        "ိ": "i",
        "ီ": "i",
        "ို": "o",
        "ု": "u",
        "ူ": "u",
        "ေါင်": "aung",
        "ော": "aw",
        "ော်": "aw",
        "ေါ": "aw",
        "ေါ်": "aw",
        "်": "်",
        // this is special case but the character will be converted to latin in the code
        "က်": "et",
        "ိုက်": "aik",
        "ောက်": "auk",
        "င်": "in",
        "ိုင်": "aing",
        "ောင်": "aung",
        "စ်": "it",
        "ည်": "i",
        "တ်": "at",
        "ိတ်": "eik",
        "ုတ်": "ok",
        "ွတ်": "ut",
        "ေတ်": "it",
        "ဒ်": "d",
        "ိုဒ်": "ok",
        "ုဒ်": "ait",
        "န်": "an",
        "ာန်": "an",
        "ိန်": "ein",
        "ုန်": "on",
        "ွန်": "un",
        "ပ်": "at",
        "ိပ်": "eik",
        "ုပ်": "ok",
        "ွပ်": "ut",
        "န်ုပ်": "nub",
        "မ်": "an",
        "ိမ်": "ein",
        "ုမ်": "on",
        "ွမ်": "un",
        "ယ်": "e",
        "ိုလ်": "ol",
        "ဉ်": "in",
        "ံ": "an",
        "ိံ": "ein",
        "ုံ": "on",
        // Dhivehi
        "ައް": "ah",
        "ަށް": "ah"
      }, i = {
        en: {},
        // default language
        az: {
          // Azerbaijani
          ç: "c",
          ə: "e",
          ğ: "g",
          ı: "i",
          ö: "o",
          ş: "s",
          ü: "u",
          Ç: "C",
          Ə: "E",
          Ğ: "G",
          İ: "I",
          Ö: "O",
          Ş: "S",
          Ü: "U"
        },
        cs: {
          // Czech
          č: "c",
          ď: "d",
          ě: "e",
          ň: "n",
          ř: "r",
          š: "s",
          ť: "t",
          ů: "u",
          ž: "z",
          Č: "C",
          Ď: "D",
          Ě: "E",
          Ň: "N",
          Ř: "R",
          Š: "S",
          Ť: "T",
          Ů: "U",
          Ž: "Z"
        },
        fi: {
          // Finnish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        hu: {
          // Hungarian
          ä: "a",
          // ok
          Ä: "A",
          // ok
          // 'á': 'a', duplicate see charMap/latin
          // 'Á': 'A', duplicate see charMap/latin
          ö: "o",
          // ok
          Ö: "O",
          // ok
          // 'ő': 'o', duplicate see charMap/latin
          // 'Ő': 'O', duplicate see charMap/latin
          ü: "u",
          Ü: "U",
          ű: "u",
          Ű: "U"
        },
        lt: {
          // Lithuanian
          ą: "a",
          č: "c",
          ę: "e",
          ė: "e",
          į: "i",
          š: "s",
          ų: "u",
          ū: "u",
          ž: "z",
          Ą: "A",
          Č: "C",
          Ę: "E",
          Ė: "E",
          Į: "I",
          Š: "S",
          Ų: "U",
          Ū: "U"
        },
        lv: {
          // Latvian
          ā: "a",
          č: "c",
          ē: "e",
          ģ: "g",
          ī: "i",
          ķ: "k",
          ļ: "l",
          ņ: "n",
          š: "s",
          ū: "u",
          ž: "z",
          Ā: "A",
          Č: "C",
          Ē: "E",
          Ģ: "G",
          Ī: "i",
          Ķ: "k",
          Ļ: "L",
          Ņ: "N",
          Š: "S",
          Ū: "u",
          Ž: "Z"
        },
        pl: {
          // Polish
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
          Ą: "A",
          Ć: "C",
          Ę: "e",
          Ł: "L",
          Ń: "N",
          Ó: "O",
          Ś: "S",
          Ź: "Z",
          Ż: "Z"
        },
        sv: {
          // Swedish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        sk: {
          // Slovak
          ä: "a",
          Ä: "A"
        },
        sr: {
          // Serbian
          љ: "lj",
          њ: "nj",
          Љ: "Lj",
          Њ: "Nj",
          đ: "dj",
          Đ: "Dj"
        },
        tr: {
          // Turkish
          Ü: "U",
          Ö: "O",
          ü: "u",
          ö: "o"
        }
      }, u = {
        ar: {
          "∆": "delta",
          "∞": "la-nihaya",
          "♥": "hob",
          "&": "wa",
          "|": "aw",
          "<": "aqal-men",
          ">": "akbar-men",
          "∑": "majmou",
          "¤": "omla"
        },
        az: {},
        ca: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "amor",
          "&": "i",
          "|": "o",
          "<": "menys que",
          ">": "mes que",
          "∑": "suma dels",
          "¤": "moneda"
        },
        cs: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "nebo",
          "<": "mensi nez",
          ">": "vetsi nez",
          "∑": "soucet",
          "¤": "mena"
        },
        de: {
          "∆": "delta",
          "∞": "unendlich",
          "♥": "Liebe",
          "&": "und",
          "|": "oder",
          "<": "kleiner als",
          ">": "groesser als",
          "∑": "Summe von",
          "¤": "Waehrung"
        },
        dv: {
          "∆": "delta",
          "∞": "kolunulaa",
          "♥": "loabi",
          "&": "aai",
          "|": "noonee",
          "<": "ah vure kuda",
          ">": "ah vure bodu",
          "∑": "jumula",
          "¤": "faisaa"
        },
        en: {
          "∆": "delta",
          "∞": "infinity",
          "♥": "love",
          "&": "and",
          "|": "or",
          "<": "less than",
          ">": "greater than",
          "∑": "sum",
          "¤": "currency"
        },
        es: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "y",
          "|": "u",
          "<": "menos que",
          ">": "mas que",
          "∑": "suma de los",
          "¤": "moneda"
        },
        fa: {
          "∆": "delta",
          "∞": "bi-nahayat",
          "♥": "eshgh",
          "&": "va",
          "|": "ya",
          "<": "kamtar-az",
          ">": "bishtar-az",
          "∑": "majmooe",
          "¤": "vahed"
        },
        fi: {
          "∆": "delta",
          "∞": "aarettomyys",
          "♥": "rakkaus",
          "&": "ja",
          "|": "tai",
          "<": "pienempi kuin",
          ">": "suurempi kuin",
          "∑": "summa",
          "¤": "valuutta"
        },
        fr: {
          "∆": "delta",
          "∞": "infiniment",
          "♥": "Amour",
          "&": "et",
          "|": "ou",
          "<": "moins que",
          ">": "superieure a",
          "∑": "somme des",
          "¤": "monnaie"
        },
        ge: {
          "∆": "delta",
          "∞": "usasruloba",
          "♥": "siqvaruli",
          "&": "da",
          "|": "an",
          "<": "naklebi",
          ">": "meti",
          "∑": "jami",
          "¤": "valuta"
        },
        gr: {},
        hu: {
          "∆": "delta",
          "∞": "vegtelen",
          "♥": "szerelem",
          "&": "es",
          "|": "vagy",
          "<": "kisebb mint",
          ">": "nagyobb mint",
          "∑": "szumma",
          "¤": "penznem"
        },
        it: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amore",
          "&": "e",
          "|": "o",
          "<": "minore di",
          ">": "maggiore di",
          "∑": "somma",
          "¤": "moneta"
        },
        lt: {
          "∆": "delta",
          "∞": "begalybe",
          "♥": "meile",
          "&": "ir",
          "|": "ar",
          "<": "maziau nei",
          ">": "daugiau nei",
          "∑": "suma",
          "¤": "valiuta"
        },
        lv: {
          "∆": "delta",
          "∞": "bezgaliba",
          "♥": "milestiba",
          "&": "un",
          "|": "vai",
          "<": "mazak neka",
          ">": "lielaks neka",
          "∑": "summa",
          "¤": "valuta"
        },
        my: {
          "∆": "kwahkhyaet",
          "∞": "asaonasme",
          "♥": "akhyait",
          "&": "nhin",
          "|": "tho",
          "<": "ngethaw",
          ">": "kyithaw",
          "∑": "paungld",
          "¤": "ngwekye"
        },
        mk: {},
        nl: {
          "∆": "delta",
          "∞": "oneindig",
          "♥": "liefde",
          "&": "en",
          "|": "of",
          "<": "kleiner dan",
          ">": "groter dan",
          "∑": "som",
          "¤": "valuta"
        },
        pl: {
          "∆": "delta",
          "∞": "nieskonczonosc",
          "♥": "milosc",
          "&": "i",
          "|": "lub",
          "<": "mniejsze niz",
          ">": "wieksze niz",
          "∑": "suma",
          "¤": "waluta"
        },
        pt: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "e",
          "|": "ou",
          "<": "menor que",
          ">": "maior que",
          "∑": "soma",
          "¤": "moeda"
        },
        ro: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "dragoste",
          "&": "si",
          "|": "sau",
          "<": "mai mic ca",
          ">": "mai mare ca",
          "∑": "suma",
          "¤": "valuta"
        },
        ru: {
          "∆": "delta",
          "∞": "beskonechno",
          "♥": "lubov",
          "&": "i",
          "|": "ili",
          "<": "menshe",
          ">": "bolshe",
          "∑": "summa",
          "¤": "valjuta"
        },
        sk: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "alebo",
          "<": "menej ako",
          ">": "viac ako",
          "∑": "sucet",
          "¤": "mena"
        },
        sr: {},
        tr: {
          "∆": "delta",
          "∞": "sonsuzluk",
          "♥": "ask",
          "&": "ve",
          "|": "veya",
          "<": "kucuktur",
          ">": "buyuktur",
          "∑": "toplam",
          "¤": "para birimi"
        },
        uk: {
          "∆": "delta",
          "∞": "bezkinechnist",
          "♥": "lubov",
          "&": "i",
          "|": "abo",
          "<": "menshe",
          ">": "bilshe",
          "∑": "suma",
          "¤": "valjuta"
        },
        vn: {
          "∆": "delta",
          "∞": "vo cuc",
          "♥": "yeu",
          "&": "va",
          "|": "hoac",
          "<": "nho hon",
          ">": "lon hon",
          "∑": "tong",
          "¤": "tien te"
        }
      }, l = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), f = [".", "!", "~", "*", "'", "(", ")"].join(""), a = function(x, C) {
        var $ = "-", V = "", ne = "", N = !0, J = {}, L, le, Z, k, P, z, ue, ye, ve, se, R, K, G, We, Te = "";
        if (typeof x != "string")
          return "";
        if (typeof C == "string" && ($ = C), ue = u.en, ye = i.en, typeof C == "object") {
          L = C.maintainCase || !1, J = C.custom && typeof C.custom == "object" ? C.custom : J, Z = +C.truncate > 1 && C.truncate || !1, k = C.uric || !1, P = C.uricNoSlash || !1, z = C.mark || !1, N = !(C.symbols === !1 || C.lang === !1), $ = C.separator || $, k && (Te += l), P && (Te += d), z && (Te += f), ue = C.lang && u[C.lang] && N ? u[C.lang] : N ? u.en : {}, ye = C.lang && i[C.lang] ? i[C.lang] : C.lang === !1 || C.lang === !0 ? {} : i.en, C.titleCase && typeof C.titleCase.length == "number" && Array.prototype.toString.call(C.titleCase) ? (C.titleCase.forEach(function(pe) {
            J[pe + ""] = pe + "";
          }), le = !0) : le = !!C.titleCase, C.custom && typeof C.custom.length == "number" && Array.prototype.toString.call(C.custom) && C.custom.forEach(function(pe) {
            J[pe + ""] = pe + "";
          }), Object.keys(J).forEach(function(pe) {
            var xe;
            pe.length > 1 ? xe = new RegExp("\\b" + _(pe) + "\\b", "gi") : xe = new RegExp(_(pe), "gi"), x = x.replace(xe, J[pe]);
          });
          for (R in J)
            Te += R;
        }
        for (Te += $, Te = _(Te), x = x.replace(/(^\s+|\s+$)/g, ""), G = !1, We = !1, se = 0, K = x.length; se < K; se++)
          R = x[se], m(R, J) ? G = !1 : ye[R] ? (R = G && ye[R].match(/[A-Za-z0-9]/) ? " " + ye[R] : ye[R], G = !1) : R in r ? (se + 1 < K && o.indexOf(x[se + 1]) >= 0 ? (ne += R, R = "") : We === !0 ? (R = s[ne] + r[R], ne = "") : R = G && r[R].match(/[A-Za-z0-9]/) ? " " + r[R] : r[R], G = !1, We = !1) : R in s ? (ne += R, R = "", se === K - 1 && (R = s[ne]), We = !0) : /* process symbol chars */ ue[R] && !(k && l.indexOf(R) !== -1) && !(P && d.indexOf(R) !== -1) ? (R = G || V.substr(-1).match(/[A-Za-z0-9]/) ? $ + ue[R] : ue[R], R += x[se + 1] !== void 0 && x[se + 1].match(/[A-Za-z0-9]/) ? $ : "", G = !0) : (We === !0 ? (R = s[ne] + R, ne = "", We = !1) : G && (/[A-Za-z0-9]/.test(R) || V.substr(-1).match(/A-Za-z0-9]/)) && (R = " " + R), G = !1), V += R.replace(new RegExp("[^\\w\\s" + Te + "_-]", "g"), $);
        return le && (V = V.replace(/(\w)(\S*)/g, function(pe, xe, Ht) {
          var un = xe.toUpperCase() + (Ht !== null ? Ht : "");
          return Object.keys(J).indexOf(un.toLowerCase()) < 0 ? un : un.toLowerCase();
        })), V = V.replace(/\s+/g, $).replace(new RegExp("\\" + $ + "+", "g"), $).replace(new RegExp("(^\\" + $ + "+|\\" + $ + "+$)", "g"), ""), Z && V.length > Z && (ve = V.charAt(Z) === $, V = V.slice(0, Z), ve || (V = V.slice(0, V.lastIndexOf($)))), !L && !le && (V = V.toLowerCase()), V;
      }, h = function(x) {
        return function($) {
          return a($, x);
        };
      }, _ = function(x) {
        return x.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, m = function(S, x) {
        for (var C in x)
          if (x[C] === S)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = a, t.exports.createSlug = h;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return a;
        });
      else
        try {
          if (n.getSlug || n.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          n.getSlug = a, n.createSlug = h;
        } catch {
        }
    })(e);
  }
}), lp = Rl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    y(), t.exports = up();
  }
});
y();
y();
y();
y();
y();
y();
y();
y();
function ap(e) {
  var t;
  const n = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return n === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : n;
}
function cp(e) {
  const t = e.__file;
  if (t)
    return Wd(zd(t, ".vue"));
}
function oi(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function rs(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function kl(e) {
  var t, n;
  const r = (t = e.subTree) == null ? void 0 : t.type, o = rs(e);
  return o ? ((n = o?.types) == null ? void 0 : n.Fragment) === r : !1;
}
function $r(e) {
  var t, n, r;
  const o = ap(e?.type || {});
  if (o)
    return o;
  if (e?.root === e)
    return "Root";
  for (const i in (n = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : n.components)
    if (e.parent.type.components[i] === e?.type)
      return oi(e, i);
  for (const i in (r = e.appContext) == null ? void 0 : r.components)
    if (e.appContext.components[i] === e?.type)
      return oi(e, i);
  const s = cp(e?.type || {});
  return s || "Anonymous Component";
}
function fp(e) {
  var t, n, r;
  const o = (r = (n = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : n.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? r : 0, s = e === e?.root ? "root" : e.uid;
  return `${o}:${s}`;
}
function bo(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function dp() {
  const e = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return e.right - e.left;
    },
    get height() {
      return e.bottom - e.top;
    }
  };
  return e;
}
var Xn;
function pp(e) {
  return Xn || (Xn = document.createRange()), Xn.selectNode(e), Xn.getBoundingClientRect();
}
function hp(e) {
  const t = dp();
  if (!e.children)
    return t;
  for (let n = 0, r = e.children.length; n < r; n++) {
    const o = e.children[n];
    let s;
    if (o.component)
      s = Bt(o.component);
    else if (o.el) {
      const i = o.el;
      i.nodeType === 1 || i.getBoundingClientRect ? s = i.getBoundingClientRect() : i.nodeType === 3 && i.data.trim() && (s = pp(i));
    }
    s && _p(t, s);
  }
  return t;
}
function _p(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var si = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function Bt(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? si : kl(e) ? hp(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Bt(e.subTree.component) : si;
}
y();
function os(e) {
  return kl(e) ? gp(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function gp(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((n) => {
    n.component ? t.push(...os(n.component)) : n?.el && t.push(n.el);
  }), t;
}
var Fl = "__vue-devtools-component-inspector__", Vl = "__vue-devtools-component-inspector__card__", Nl = "__vue-devtools-component-inspector__name__", $l = "__vue-devtools-component-inspector__indicator__", Ll = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, mp = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, Ep = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function on() {
  return document.getElementById(Fl);
}
function yp() {
  return document.getElementById(Vl);
}
function vp() {
  return document.getElementById($l);
}
function bp() {
  return document.getElementById(Nl);
}
function ss(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function is(e) {
  var t;
  const n = document.createElement("div");
  n.id = (t = e.elementId) != null ? t : Fl, Object.assign(n.style, {
    ...Ll,
    ...ss(e.bounds),
    ...e.style
  });
  const r = document.createElement("span");
  r.id = Vl, Object.assign(r.style, {
    ...mp,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const o = document.createElement("span");
  o.id = Nl, o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const s = document.createElement("i");
  return s.id = $l, s.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(s.style, Ep), r.appendChild(o), r.appendChild(s), n.appendChild(r), document.body.appendChild(n), n;
}
function us(e) {
  const t = on(), n = yp(), r = bp(), o = vp();
  t && (Object.assign(t.style, {
    ...Ll,
    ...ss(e.bounds)
  }), Object.assign(n.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, o.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function Sp(e) {
  const t = Bt(e);
  if (!t.width && !t.height)
    return;
  const n = $r(e);
  on() ? us({ bounds: t, name: n }) : is({ bounds: t, name: n });
}
function Ml() {
  const e = on();
  e && (e.style.display = "none");
}
var So = null;
function Oo(e) {
  const t = e.target;
  if (t) {
    const n = t.__vueParentComponent;
    if (n && (So = n, n.vnode.el)) {
      const o = Bt(n), s = $r(n);
      on() ? us({ bounds: o, name: s }) : is({ bounds: o, name: s });
    }
  }
}
function Op(e, t) {
  if (e.preventDefault(), e.stopPropagation(), So) {
    const n = fp(So);
    t(n);
  }
}
var Sr = null;
function wp() {
  Ml(), window.removeEventListener("mouseover", Oo), window.removeEventListener("click", Sr, !0), Sr = null;
}
function Cp() {
  return window.addEventListener("mouseover", Oo), new Promise((e) => {
    function t(n) {
      n.preventDefault(), n.stopPropagation(), Op(n, (r) => {
        window.removeEventListener("click", t, !0), Sr = null, window.removeEventListener("mouseover", Oo);
        const o = on();
        o && (o.style.display = "none"), e(JSON.stringify({ id: r }));
      });
    }
    Sr = t, window.addEventListener("click", t, !0);
  });
}
function Ap(e) {
  const t = bo(Ce.value, e.id);
  if (t) {
    const [n] = os(t);
    if (typeof n.scrollIntoView == "function")
      n.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const r = Bt(t), o = document.createElement("div"), s = {
        ...ss(r),
        position: "absolute"
      };
      Object.assign(o.style, s), document.body.appendChild(o), o.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(o);
      }, 2e3);
    }
    setTimeout(() => {
      const r = Bt(t);
      if (r.width || r.height) {
        const o = $r(t), s = on();
        s ? us({ ...e, name: o, bounds: r }) : is({ ...e, name: o, bounds: r }), setTimeout(() => {
          s && (s.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
y();
var ii, ui;
(ui = (ii = F).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (ii.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function Tp(e) {
  let t = 0;
  const n = setInterval(() => {
    F.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(n);
  }, 30);
}
function xp() {
  const e = F.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...n) => {
    e.disable(), t(...n);
  };
}
function Ip() {
  return new Promise((e) => {
    function t() {
      xp(), e(F.__VUE_INSPECTOR__);
    }
    F.__VUE_INSPECTOR__ ? t() : Tp(() => {
      t();
    });
  });
}
y();
y();
function Dp(e) {
  return !!(e && e.__v_isReadonly);
}
function Ul(e) {
  return Dp(e) ? Ul(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Qr(e) {
  return !!(e && e.__v_isRef === !0);
}
function En(e) {
  const t = e && e.__v_raw;
  return t ? En(t) : e;
}
var Pp = class {
  constructor() {
    this.refEditor = new Rp();
  }
  set(e, t, n, r) {
    const o = Array.isArray(t) ? t : t.split(".");
    for (; o.length > 1; ) {
      const u = o.shift();
      e instanceof Map ? e = e.get(u) : e instanceof Set ? e = Array.from(e.values())[u] : e = e[u], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const s = o[0], i = this.refEditor.get(e)[s];
    r ? r(e, s, n) : this.refEditor.isRef(i) ? this.refEditor.set(i, n) : e[s] = n;
  }
  get(e, t) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (let r = 0; r < n.length; r++)
      if (e instanceof Map ? e = e.get(n[r]) : e = e[n[r]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e)
        return;
    return e;
  }
  has(e, t, n = !1) {
    if (typeof e > "u")
      return !1;
    const r = Array.isArray(t) ? t.slice() : t.split("."), o = n ? 2 : 1;
    for (; e && r.length > o; ) {
      const s = r.shift();
      e = e[s], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, r[0]);
  }
  createDefaultSetCallback(e) {
    return (t, n, r) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : En(t) instanceof Map ? t.delete(n) : En(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
        const o = t[e.newKey || n];
        this.refEditor.isRef(o) ? this.refEditor.set(o, r) : En(t) instanceof Map ? t.set(e.newKey || n, r) : En(t) instanceof Set ? t.add(r) : t[e.newKey || n] = r;
      }
    };
  }
}, Rp = class {
  set(e, t) {
    if (Qr(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((o) => e.add(o));
        return;
      }
      const n = Object.keys(t);
      if (e instanceof Map) {
        const o = new Set(e.keys());
        n.forEach((s) => {
          e.set(s, Reflect.get(t, s)), o.delete(s);
        }), o.forEach((s) => e.delete(s));
        return;
      }
      const r = new Set(Object.keys(e));
      n.forEach((o) => {
        Reflect.set(e, o, Reflect.get(t, o)), r.delete(o);
      }), r.forEach((o) => Reflect.deleteProperty(e, o));
    }
  }
  get(e) {
    return Qr(e) ? e.value : e;
  }
  isRef(e) {
    return Qr(e) || Ul(e);
  }
};
y();
y();
y();
var kp = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Fp() {
  if (typeof window > "u" || !xl || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem(kp) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
y();
y();
y();
var li, ai;
(ai = (li = F).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (li.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Vp = new Proxy(F.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function Np(e, t) {
  fe.timelineLayersState[t.id] = !1, Vp.push({
    ...e,
    descriptorId: t.id,
    appRecord: rs(t.app)
  });
}
var ci, fi;
(fi = (ci = F).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ci.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var ls = new Proxy(F.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
}), Bl = en(() => {
  sn.hooks.callHook("sendInspectorToClient", jl());
});
function $p(e, t) {
  var n, r;
  ls.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (n = e.treeFilterPlaceholder) != null ? n : "Search tree...",
    stateFilterPlaceholder: (r = e.stateFilterPlaceholder) != null ? r : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: rs(t.app)
  }), Bl();
}
function jl() {
  return ls.filter((e) => e.descriptor.app === Ce.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const n = e.descriptor, r = e.options;
    return {
      id: r.id,
      label: r.label,
      logo: n.logo,
      icon: `custom-ic-baseline-${(t = r?.icon) == null ? void 0 : t.replace(/_/g, "-")}`,
      packageName: n.packageName,
      homepage: n.homepage,
      pluginId: n.id
    };
  });
}
function or(e, t) {
  return ls.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function Lp() {
  const e = Dl();
  e.hook("addInspector", ({ inspector: r, plugin: o }) => {
    $p(r, o.descriptor);
  });
  const t = en(async ({ inspectorId: r, plugin: o }) => {
    var s;
    if (!r || !((s = o?.descriptor) != null && s.app) || fe.highPerfModeEnabled)
      return;
    const i = or(r, o.descriptor.app), u = {
      app: o.descriptor.app,
      inspectorId: r,
      filter: i?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((l) => {
      e.callHookWith(
        async (d) => {
          await Promise.all(d.map((f) => f(u))), l();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    }), e.callHookWith(
      async (l) => {
        await Promise.all(l.map((d) => d({
          inspectorId: r,
          rootNodes: u.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  e.hook("sendInspectorTree", t);
  const n = en(async ({ inspectorId: r, plugin: o }) => {
    var s;
    if (!r || !((s = o?.descriptor) != null && s.app) || fe.highPerfModeEnabled)
      return;
    const i = or(r, o.descriptor.app), u = {
      app: o.descriptor.app,
      inspectorId: r,
      nodeId: i?.selectedNodeId || "",
      state: null
    }, l = {
      currentTab: `custom-inspector:${r}`
    };
    u.nodeId && await new Promise((d) => {
      e.callHookWith(
        async (f) => {
          await Promise.all(f.map((a) => a(u, l))), d();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (d) => {
        await Promise.all(d.map((f) => f({
          inspectorId: r,
          nodeId: u.nodeId,
          state: u.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: r, nodeId: o, plugin: s }) => {
    const i = or(r, s.descriptor.app);
    i && (i.selectedNodeId = o);
  }), e.hook("timelineLayerAdded", ({ options: r, plugin: o }) => {
    Np(r, o.descriptor);
  }), e.hook("timelineEventAdded", ({ options: r, plugin: o }) => {
    var s;
    const i = ["performance", "component-event", "keyboard", "mouse"];
    fe.highPerfModeEnabled || !((s = fe.timelineLayersState) != null && s[o.descriptor.id]) && !i.includes(r.layerId) || e.callHookWith(
      async (u) => {
        await Promise.all(u.map((l) => l(r)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: r }) => {
    const o = r.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!o)
      return null;
    const s = o.id.toString();
    return [...o.instanceMap].filter(([u]) => u.split(":")[0] === s).map(([, u]) => u);
  }), e.hook("getComponentBounds", async ({ instance: r }) => Bt(r)), e.hook("getComponentName", ({ instance: r }) => $r(r)), e.hook("componentHighlight", ({ uid: r }) => {
    const o = Ce.value.instanceMap.get(r);
    o && Sp(o);
  }), e.hook("componentUnhighlight", () => {
    Ml();
  }), e;
}
var di, pi;
(pi = (di = F).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (di.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var hi, _i;
(_i = (hi = F).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (hi.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var gi, mi;
(mi = (gi = F).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (gi.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var Ei, yi;
(yi = (Ei = F).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (Ei.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var vi, bi;
(bi = (vi = F).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (vi.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var kt = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function Mp() {
  return {
    connected: !1,
    clientConnected: !1,
    vitePluginDetected: !0,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: !0,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: Fp()
  };
}
var Si, Oi;
(Oi = (Si = F)[kt]) != null || (Si[kt] = Mp());
var Up = en((e) => {
  sn.hooks.callHook("devtoolsStateUpdated", { state: e });
});
en((e, t) => {
  sn.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var Lr = new Proxy(F.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, n) {
    return t === "value" ? F.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : F.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), Ce = new Proxy(F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, n) {
    return t === "value" ? F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function Hl() {
  Up({
    ...F[kt],
    appRecords: Lr.value,
    activeAppRecordId: Ce.id,
    tabs: F.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: F.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function Bp(e) {
  F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, Hl();
}
function jp(e) {
  F.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, Hl();
}
var fe = new Proxy(F[kt], {
  get(e, t) {
    return t === "appRecords" ? Lr : t === "activeAppRecordId" ? Ce.id : t === "tabs" ? F.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? F.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : F[kt][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, n) {
    return { ...F[kt] }, e[t] = n, F[kt][t] = n, !0;
  }
});
function Hp(e = {}) {
  var t, n, r;
  const { file: o, host: s, baseUrl: i = window.location.origin, line: u = 0, column: l = 0 } = e;
  if (o) {
    if (s === "chrome-extension") {
      const d = o.replace(/\\/g, "\\\\"), f = (n = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? n : "/";
      fetch(`${f}__open-in-editor?file=${encodeURI(o)}`).then((a) => {
        if (!a.ok) {
          const h = `Opening component ${d} failed`;
          console.log(`%c${h}`, "color:red");
        }
      });
    } else if (fe.vitePluginDetected) {
      const d = (r = F.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? r : i;
      F.__VUE_INSPECTOR__.openInEditor(d, o, u, l);
    }
  }
}
y();
y();
y();
y();
y();
var wi, Ci;
(Ci = (wi = F).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (wi.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var as = new Proxy(F.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function wo(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = e[n].defaultValue;
  }), t;
}
function cs(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Kp(e) {
  var t, n, r;
  const o = (n = (t = as.find((s) => {
    var i;
    return s[0].id === e && !!((i = s[0]) != null && i.settings);
  })) == null ? void 0 : t[0]) != null ? n : null;
  return (r = o?.settings) != null ? r : null;
}
function Kl(e, t) {
  var n, r, o;
  const s = cs(e);
  if (s) {
    const i = localStorage.getItem(s);
    if (i)
      return JSON.parse(i);
  }
  if (e) {
    const i = (r = (n = as.find((u) => u[0].id === e)) == null ? void 0 : n[0]) != null ? r : null;
    return wo((o = i?.settings) != null ? o : {});
  }
  return wo(t);
}
function Wp(e, t) {
  const n = cs(e);
  localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(wo(t)));
}
function zp(e, t, n) {
  const r = cs(e), o = localStorage.getItem(r), s = JSON.parse(o || "{}"), i = {
    ...s,
    [t]: n
  };
  localStorage.setItem(r, JSON.stringify(i)), sn.hooks.callHookWith(
    (u) => {
      u.forEach((l) => l({
        pluginId: e,
        key: t,
        oldValue: s[t],
        newValue: n,
        settings: i
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var Ai, Ti, Re = (Ti = (Ai = F).__VUE_DEVTOOLS_HOOK) != null ? Ti : Ai.__VUE_DEVTOOLS_HOOK = Dl(), Gp = {
  vueAppInit(e) {
    Re.hook("app:init", e);
  },
  vueAppUnmount(e) {
    Re.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    Re.hook("app:connected", e);
  },
  componentAdded(e) {
    return Re.hook("component:added", e);
  },
  componentEmit(e) {
    return Re.hook("component:emit", e);
  },
  componentUpdated(e) {
    return Re.hook("component:updated", e);
  },
  componentRemoved(e) {
    return Re.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    Re.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return Re.hook("perf:start", e);
  },
  perfEnd(e) {
    return Re.hook("perf:end", e);
  }
}, Wl = {
  on: Gp,
  setupDevToolsPlugin(e, t) {
    return Re.callHook("devtools-plugin:setup", e, t);
  }
}, qp = class {
  constructor({ plugin: e, ctx: t }) {
    this.hooks = t.hooks, this.plugin = e;
  }
  get on() {
    return {
      // component inspector
      visitComponentTree: (e) => {
        this.hooks.hook("visitComponentTree", e);
      },
      inspectComponent: (e) => {
        this.hooks.hook("inspectComponent", e);
      },
      editComponentState: (e) => {
        this.hooks.hook("editComponentState", e);
      },
      // custom inspector
      getInspectorTree: (e) => {
        this.hooks.hook("getInspectorTree", e);
      },
      getInspectorState: (e) => {
        this.hooks.hook("getInspectorState", e);
      },
      editInspectorState: (e) => {
        this.hooks.hook("editInspectorState", e);
      },
      // timeline
      inspectTimelineEvent: (e) => {
        this.hooks.hook("inspectTimelineEvent", e);
      },
      timelineCleared: (e) => {
        this.hooks.hook("timelineCleared", e);
      },
      // settings
      setPluginSettings: (e) => {
        this.hooks.hook("setPluginSettings", e);
      }
    };
  }
  // component inspector
  notifyComponentUpdate(e) {
    var t;
    if (fe.highPerfModeEnabled)
      return;
    const n = jl().find((r) => r.packageName === this.plugin.descriptor.packageName);
    if (n?.id) {
      if (e) {
        const r = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        Re.callHook("component:updated", ...r);
      } else
        Re.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: n.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && Wp(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    fe.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    fe.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return fe.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    fe.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return Kl(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  // utilities
  getComponentInstances(e) {
    return this.hooks.callHook("getComponentInstances", { app: e });
  }
  getComponentBounds(e) {
    return this.hooks.callHook("getComponentBounds", { instance: e });
  }
  getComponentName(e) {
    return this.hooks.callHook("getComponentName", { instance: e });
  }
  highlightElement(e) {
    const t = e.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid: t });
  }
  unhighlightElement() {
    return this.hooks.callHook(
      "componentUnhighlight"
      /* COMPONENT_UNHIGHLIGHT */
    );
  }
}, Yp = qp;
y();
y();
y();
y();
var Jp = "__vue_devtool_undefined__", Xp = "__vue_devtool_infinity__", Zp = "__vue_devtool_negative_infinity__", Qp = "__vue_devtool_nan__";
y();
y();
var eh = {
  [Jp]: "undefined",
  [Qp]: "NaN",
  [Xp]: "Infinity",
  [Zp]: "-Infinity"
};
Object.entries(eh).reduce((e, [t, n]) => (e[n] = t, e), {});
y();
y();
y();
y();
y();
var xi, Ii;
(Ii = (xi = F).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (xi.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function zl(e, t) {
  return Wl.setupDevToolsPlugin(e, t);
}
function th(e, t) {
  const [n, r] = e;
  if (n.app !== t)
    return;
  const o = new Yp({
    plugin: {
      setupFn: r,
      descriptor: n
    },
    ctx: sn
  });
  n.packageName === "vuex" && o.on.editInspectorState((s) => {
    o.sendInspectorState(s.inspectorId);
  }), r(o);
}
function Gl(e, t) {
  F.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || fe.highPerfModeEnabled && !t?.inspectingComponent || (F.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), as.forEach((n) => {
    th(n, e);
  }));
}
y();
y();
var Fn = "__VUE_DEVTOOLS_ROUTER__", tn = "__VUE_DEVTOOLS_ROUTER_INFO__", Di, Pi;
(Pi = (Di = F)[tn]) != null || (Di[tn] = {
  currentRoute: null,
  routes: []
});
var Ri, ki;
(ki = (Ri = F)[Fn]) != null || (Ri[Fn] = {});
new Proxy(F[tn], {
  get(e, t) {
    return F[tn][t];
  }
});
new Proxy(F[Fn], {
  get(e, t) {
    if (t === "value")
      return F[Fn];
  }
});
function nh(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((n) => !t.has(n.path) && t.set(n.path, 1));
}
function fs(e) {
  return e.map((t) => {
    let { path: n, name: r, children: o, meta: s } = t;
    return o?.length && (o = fs(o)), {
      path: n,
      name: r,
      children: o,
      meta: s
    };
  });
}
function rh(e) {
  if (e) {
    const { fullPath: t, hash: n, href: r, path: o, name: s, matched: i, params: u, query: l } = e;
    return {
      fullPath: t,
      hash: n,
      href: r,
      path: o,
      name: s,
      params: u,
      query: l,
      matched: fs(i)
    };
  }
  return e;
}
function oh(e, t) {
  function n() {
    var r;
    const o = (r = e.app) == null ? void 0 : r.config.globalProperties.$router, s = rh(o?.currentRoute.value), i = fs(nh(o)), u = console.warn;
    console.warn = () => {
    }, F[tn] = {
      currentRoute: s ? ri(s) : {},
      routes: ri(i)
    }, F[Fn] = o, console.warn = u;
  }
  n(), Wl.on.componentUpdated(en(() => {
    var r;
    ((r = t.value) == null ? void 0 : r.app) === e.app && (n(), !fe.highPerfModeEnabled && sn.hooks.callHook("routerInfoUpdated", { state: F[tn] }));
  }, 200));
}
function sh(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const n = {
        ...t,
        app: Ce.value.app,
        rootNodes: []
      };
      return await new Promise((r) => {
        e.callHookWith(
          async (o) => {
            await Promise.all(o.map((s) => s(n))), r();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      }), n.rootNodes;
    },
    // get inspector state
    async getInspectorState(t) {
      const n = {
        ...t,
        app: Ce.value.app,
        state: null
      }, r = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((o) => {
        e.callHookWith(
          async (s) => {
            await Promise.all(s.map((i) => i(n, r))), o();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), n.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const n = new Pp(), r = {
        ...t,
        app: Ce.value.app,
        set: (o, s = t.path, i = t.state.value, u) => {
          n.set(o, s, i, u || n.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (o) => {
          o.forEach((s) => s(r));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const n = or(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: n.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return Cp();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return wp();
    },
    // get component render code
    getComponentRenderCode(t) {
      const n = bo(Ce.value, t);
      if (n)
        return typeof n?.type != "function" ? n.render.toString() : n.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return Ap({ id: t });
    },
    // open in editor
    openInEditor: Hp,
    // get vue inspector
    getVueInspector: Ip,
    // toggle app
    toggleApp(t, n) {
      const r = Lr.value.find((o) => o.id === t);
      r && (jp(t), Bp(r), oh(r, Ce), Bl(), Gl(r.app, n));
    },
    // inspect dom
    inspectDOM(t) {
      const n = bo(Ce.value, t);
      if (n) {
        const [r] = os(n);
        r && (F.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = r);
      }
    },
    updatePluginSettings(t, n, r) {
      zp(t, n, r);
    },
    getPluginSettings(t) {
      return {
        options: Kp(t),
        values: Kl(t)
      };
    }
  };
}
y();
var Fi, Vi;
(Vi = (Fi = F).__VUE_DEVTOOLS_ENV__) != null || (Fi.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var Ni = Lp(), $i, Li;
(Li = ($i = F).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || ($i.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: Ni,
  get state() {
    return {
      ...fe,
      activeAppRecordId: Ce.id,
      activeAppRecord: Ce.value,
      appRecords: Lr.value
    };
  },
  api: sh(Ni)
});
var sn = F.__VUE_DEVTOOLS_KIT_CONTEXT__;
y();
ip(lp());
var Mi, Ui;
(Ui = (Mi = F).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (Mi.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
y();
y();
function ih(e) {
  fe.highPerfModeEnabled = e ?? !fe.highPerfModeEnabled, !e && Ce.value && Gl(Ce.value.app);
}
y();
y();
y();
function uh(e) {
  fe.devtoolsClientDetected = {
    ...fe.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(fe.devtoolsClientDetected).some(Boolean);
  ih(!t);
}
var Bi, ji;
(ji = (Bi = F).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (Bi.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = uh);
y();
y();
y();
y();
y();
y();
y();
var lh = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    this.keyToValue.set(e, t), this.valueToKey.set(t, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}, ql = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new lh();
  }
  register(e, t) {
    this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}, ah = class extends ql {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, t) {
    typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
};
y();
y();
function ch(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const n in e)
    e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function fh(e, t) {
  const n = ch(e);
  if ("find" in n)
    return n.find(t);
  const r = n;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t(s))
      return s;
  }
}
function nn(e, t) {
  Object.entries(e).forEach(([n, r]) => t(r, n));
}
function sr(e, t) {
  return e.indexOf(t) !== -1;
}
function Hi(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (t(r))
      return r;
  }
}
var dh = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return fh(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
y();
y();
var ph = (e) => Object.prototype.toString.call(e).slice(8, -1), Yl = (e) => typeof e > "u", hh = (e) => e === null, Vn = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, Co = (e) => Vn(e) && Object.keys(e).length === 0, At = (e) => Array.isArray(e), _h = (e) => typeof e == "string", gh = (e) => typeof e == "number" && !isNaN(e), mh = (e) => typeof e == "boolean", Eh = (e) => e instanceof RegExp, Nn = (e) => e instanceof Map, $n = (e) => e instanceof Set, Jl = (e) => ph(e) === "Symbol", yh = (e) => e instanceof Date && !isNaN(e.valueOf()), vh = (e) => e instanceof Error, Ki = (e) => typeof e == "number" && isNaN(e), bh = (e) => mh(e) || hh(e) || Yl(e) || gh(e) || _h(e) || Jl(e), Sh = (e) => typeof e == "bigint", Oh = (e) => e === 1 / 0 || e === -1 / 0, wh = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), Ch = (e) => e instanceof URL;
y();
var Xl = (e) => e.replace(/\./g, "\\."), eo = (e) => e.map(String).map(Xl).join("."), Tn = (e) => {
  const t = [];
  let n = "";
  for (let o = 0; o < e.length; o++) {
    let s = e.charAt(o);
    if (s === "\\" && e.charAt(o + 1) === ".") {
      n += ".", o++;
      continue;
    }
    if (s === ".") {
      t.push(n), n = "";
      continue;
    }
    n += s;
  }
  const r = n;
  return t.push(r), t;
};
y();
function Je(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
var Zl = [
  Je(Yl, "undefined", () => null, () => {
  }),
  Je(Sh, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Je(yh, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Je(vh, "Error", (e, t) => {
    const n = {
      name: e.name,
      message: e.message
    };
    return t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }, (e, t) => {
    const n = new Error(e.message);
    return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }),
  Je(Eh, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, n);
  }),
  Je(
    $n,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Je(Nn, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Je((e) => Ki(e) || Oh(e), "number", (e) => Ki(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Je((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Je(Ch, "URL", (e) => e.toString(), (e) => new URL(e))
];
function Mr(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
var Ql = Mr((e, t) => Jl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
  const r = n.symbolRegistry.getValue(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown symbol");
  return r;
}), Ah = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), ea = Mr(wh, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const n = Ah[t[1]];
  if (!n)
    throw new Error("Trying to deserialize unknown typed array");
  return new n(e);
});
function ta(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var na = Mr(ta, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const n = t.classRegistry.getAllowedProps(e.constructor);
  if (!n)
    return { ...e };
  const r = {};
  return n.forEach((o) => {
    r[o] = e[o];
  }), r;
}, (e, t, n) => {
  const r = n.classRegistry.getValue(t[1]);
  if (!r)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(r.prototype), e);
}), ra = Mr((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
  const r = n.customTransformerRegistry.findByName(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown custom value");
  return r.deserialize(e);
}), Th = [na, Ql, ra, ea], Wi = (e, t) => {
  const n = Hi(Th, (o) => o.isApplicable(e, t));
  if (n)
    return {
      value: n.transform(e, t),
      type: n.annotation(e, t)
    };
  const r = Hi(Zl, (o) => o.isApplicable(e, t));
  if (r)
    return {
      value: r.transform(e, t),
      type: r.annotation
    };
}, oa = {};
Zl.forEach((e) => {
  oa[e.annotation] = e;
});
var xh = (e, t, n) => {
  if (At(t))
    switch (t[0]) {
      case "symbol":
        return Ql.untransform(e, t, n);
      case "class":
        return na.untransform(e, t, n);
      case "custom":
        return ra.untransform(e, t, n);
      case "typed-array":
        return ea.untransform(e, t, n);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const r = oa[t];
    if (!r)
      throw new Error("Unknown transformation: " + t);
    return r.untransform(e, n);
  }
};
y();
var Yt = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const n = e.keys();
  for (; t > 0; )
    n.next(), t--;
  return n.next().value;
};
function sa(e) {
  if (sr(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (sr(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (sr(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var Ih = (e, t) => {
  sa(t);
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if ($n(e))
      e = Yt(e, +r);
    else if (Nn(e)) {
      const o = +r, s = +t[++n] == 0 ? "key" : "value", i = Yt(e, o);
      switch (s) {
        case "key":
          e = i;
          break;
        case "value":
          e = e.get(i);
          break;
      }
    } else
      e = e[r];
  }
  return e;
}, Ao = (e, t, n) => {
  if (sa(t), t.length === 0)
    return n(e);
  let r = e;
  for (let s = 0; s < t.length - 1; s++) {
    const i = t[s];
    if (At(r)) {
      const u = +i;
      r = r[u];
    } else if (Vn(r))
      r = r[i];
    else if ($n(r)) {
      const u = +i;
      r = Yt(r, u);
    } else if (Nn(r)) {
      if (s === t.length - 2)
        break;
      const l = +i, d = +t[++s] == 0 ? "key" : "value", f = Yt(r, l);
      switch (d) {
        case "key":
          r = f;
          break;
        case "value":
          r = r.get(f);
          break;
      }
    }
  }
  const o = t[t.length - 1];
  if (At(r) ? r[+o] = n(r[+o]) : Vn(r) && (r[o] = n(r[o])), $n(r)) {
    const s = Yt(r, +o), i = n(s);
    s !== i && (r.delete(s), r.add(i));
  }
  if (Nn(r)) {
    const s = +t[t.length - 2], i = Yt(r, s);
    switch (+o == 0 ? "key" : "value") {
      case "key": {
        const l = n(i);
        r.set(l, r.get(i)), l !== i && r.delete(i);
        break;
      }
      case "value": {
        r.set(i, n(r.get(i)));
        break;
      }
    }
  }
  return e;
};
function To(e, t, n = []) {
  if (!e)
    return;
  if (!At(e)) {
    nn(e, (s, i) => To(s, t, [...n, ...Tn(i)]));
    return;
  }
  const [r, o] = e;
  o && nn(o, (s, i) => {
    To(s, t, [...n, ...Tn(i)]);
  }), t(r, n);
}
function Dh(e, t, n) {
  return To(t, (r, o) => {
    e = Ao(e, o, (s) => xh(s, r, n));
  }), e;
}
function Ph(e, t) {
  function n(r, o) {
    const s = Ih(e, Tn(o));
    r.map(Tn).forEach((i) => {
      e = Ao(e, i, () => s);
    });
  }
  if (At(t)) {
    const [r, o] = t;
    r.forEach((s) => {
      e = Ao(e, Tn(s), () => e);
    }), o && nn(o, n);
  } else
    nn(t, n);
  return e;
}
var Rh = (e, t) => Vn(e) || At(e) || Nn(e) || $n(e) || ta(e, t);
function kh(e, t, n) {
  const r = n.get(e);
  r ? r.push(t) : n.set(e, [t]);
}
function Fh(e, t) {
  const n = {};
  let r;
  return e.forEach((o) => {
    if (o.length <= 1)
      return;
    t || (o = o.map((u) => u.map(String)).sort((u, l) => u.length - l.length));
    const [s, ...i] = o;
    s.length === 0 ? r = i.map(eo) : n[eo(s)] = i.map(eo);
  }), r ? Co(n) ? [r] : [r, n] : Co(n) ? void 0 : n;
}
var ia = (e, t, n, r, o = [], s = [], i = /* @__PURE__ */ new Map()) => {
  var u;
  const l = bh(e);
  if (!l) {
    kh(e, o, t);
    const m = i.get(e);
    if (m)
      return r ? {
        transformedValue: null
      } : m;
  }
  if (!Rh(e, n)) {
    const m = Wi(e, n), S = m ? {
      transformedValue: m.value,
      annotations: [m.type]
    } : {
      transformedValue: e
    };
    return l || i.set(e, S), S;
  }
  if (sr(s, e))
    return {
      transformedValue: null
    };
  const d = Wi(e, n), f = (u = d?.value) != null ? u : e, a = At(f) ? [] : {}, h = {};
  nn(f, (m, S) => {
    if (S === "__proto__" || S === "constructor" || S === "prototype")
      throw new Error(`Detected property ${S}. This is a prototype pollution risk, please remove it from your object.`);
    const x = ia(m, t, n, r, [...o, S], [...s, e], i);
    a[S] = x.transformedValue, At(x.annotations) ? h[S] = x.annotations : Vn(x.annotations) && nn(x.annotations, (C, $) => {
      h[Xl(S) + "." + $] = C;
    });
  });
  const _ = Co(h) ? {
    transformedValue: a,
    annotations: d ? [d.type] : void 0
  } : {
    transformedValue: a,
    annotations: d ? [d.type, h] : h
  };
  return l || i.set(e, _), _;
};
y();
y();
function ua(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function zi(e) {
  return ua(e) === "Array";
}
function Vh(e) {
  if (ua(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Nh(e, t, n, r, o) {
  const s = {}.propertyIsEnumerable.call(r, t) ? "enumerable" : "nonenumerable";
  s === "enumerable" && (e[t] = n), o && s === "nonenumerable" && Object.defineProperty(e, t, {
    value: n,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function xo(e, t = {}) {
  if (zi(e))
    return e.map((o) => xo(o, t));
  if (!Vh(e))
    return e;
  const n = Object.getOwnPropertyNames(e), r = Object.getOwnPropertySymbols(e);
  return [...n, ...r].reduce((o, s) => {
    if (zi(t.props) && !t.props.includes(s))
      return o;
    const i = e[s], u = xo(i, t);
    return Nh(o, s, u, e, t.nonenumerable), o;
  }, {});
}
var ie = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new ah(), this.symbolRegistry = new ql((t) => {
      var n;
      return (n = t.description) != null ? n : "";
    }), this.customTransformerRegistry = new dh(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), n = ia(e, t, this, this.dedupe), r = {
      json: n.transformedValue
    };
    n.annotations && (r.meta = {
      ...r.meta,
      values: n.annotations
    });
    const o = Fh(t, this.dedupe);
    return o && (r.meta = {
      ...r.meta,
      referentialEqualities: o
    }), r;
  }
  deserialize(e) {
    const { json: t, meta: n } = e;
    let r = xo(t);
    return n?.values && (r = Dh(r, n.values, this)), n?.referentialEqualities && (r = Ph(r, n.referentialEqualities)), r;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, t) {
    this.classRegistry.register(e, t);
  }
  registerSymbol(e, t) {
    this.symbolRegistry.register(e, t);
  }
  registerCustom(e, t) {
    this.customTransformerRegistry.register({
      name: t,
      ...e
    });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
};
ie.defaultInstance = new ie();
ie.serialize = ie.defaultInstance.serialize.bind(ie.defaultInstance);
ie.deserialize = ie.defaultInstance.deserialize.bind(ie.defaultInstance);
ie.stringify = ie.defaultInstance.stringify.bind(ie.defaultInstance);
ie.parse = ie.defaultInstance.parse.bind(ie.defaultInstance);
ie.registerClass = ie.defaultInstance.registerClass.bind(ie.defaultInstance);
ie.registerSymbol = ie.defaultInstance.registerSymbol.bind(ie.defaultInstance);
ie.registerCustom = ie.defaultInstance.registerCustom.bind(ie.defaultInstance);
ie.allowErrorProps = ie.defaultInstance.allowErrorProps.bind(ie.defaultInstance);
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var Gi, qi;
(qi = (Gi = F).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (Gi.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var Yi, Ji;
(Ji = (Yi = F).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (Yi.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Xi, Zi;
(Zi = (Xi = F).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (Xi.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Qi, eu;
(eu = (Qi = F).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Qi.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var tu, nu;
(nu = (tu = F).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (tu.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var ru, ou;
(ou = (ru = F).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (ru.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
y();
y();
y();
y();
y();
y();
y();
const Mt = typeof window < "u";
let Io;
const Ln = (e) => Io = e, la = /* @__PURE__ */ Symbol("pinia");
function jt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ot;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ot || (ot = {}));
const su = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function $h(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function ds(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    fa(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function aa(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function ir(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = new MouseEvent("click", {
      bubbles: !0,
      cancelable: !0,
      view: window,
      detail: 0,
      screenX: 80,
      screenY: 20,
      clientX: 80,
      clientY: 20,
      ctrlKey: !1,
      altKey: !1,
      shiftKey: !1,
      metaKey: !1,
      button: 0,
      relatedTarget: null
    });
    e.dispatchEvent(n);
  }
}
const ur = typeof navigator == "object" ? navigator : { userAgent: "" }, ca = /Macintosh/.test(ur.userAgent) && /AppleWebKit/.test(ur.userAgent) && !/Safari/.test(ur.userAgent), fa = Mt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ca ? Lh : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ur ? Mh : (
      // Fallback to using FileReader and a popup
      Uh
    )
  )
) : () => {
};
function Lh(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? aa(r.href) ? ds(e, t, n) : (r.target = "_blank", ir(r)) : ir(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    ir(r);
  }, 0));
}
function Mh(e, t = "download", n) {
  if (typeof e == "string")
    if (aa(e))
      ds(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        ir(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob($h(e, n), t);
}
function Uh(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return ds(e, t, n);
  const o = e.type === "application/octet-stream", s = /constructor/i.test(String(su.HTMLElement)) || "safari" in su, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && s || ca) && typeof FileReader < "u") {
    const u = new FileReader();
    u.onloadend = function() {
      let l = u.result;
      if (typeof l != "string")
        throw r = null, new Error("Wrong reader.result type");
      l = i ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = l : location.assign(l), r = null;
    }, u.readAsDataURL(e);
  } else {
    const u = URL.createObjectURL(e);
    r ? r.location.assign(u) : location.href = u, r = null, setTimeout(function() {
      URL.revokeObjectURL(u);
    }, 4e4);
  }
}
function he(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function ps(e) {
  return "_a" in e && "install" in e;
}
function da() {
  if (!("clipboard" in navigator))
    return he("Your browser doesn't support the Clipboard API", "error"), !0;
}
function pa(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (he('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Bh(e) {
  if (!da())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), he("Global state copied to clipboard.");
    } catch (t) {
      if (pa(t))
        return;
      he("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function jh(e) {
  if (!da())
    try {
      ha(e, JSON.parse(await navigator.clipboard.readText())), he("Global state pasted from clipboard.");
    } catch (t) {
      if (pa(t))
        return;
      he("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Hh(e) {
  try {
    fa(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    he("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let lt;
function Kh() {
  lt || (lt = document.createElement("input"), lt.type = "file", lt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      lt.onchange = async () => {
        const r = lt.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, lt.oncancel = () => t(null), lt.onerror = n, lt.click();
    });
  }
  return e;
}
async function Wh(e) {
  try {
    const n = await Kh()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    ha(e, JSON.parse(r)), he(`Global state imported from "${o.name}".`);
  } catch (t) {
    he("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function ha(e, t) {
  for (const n in t) {
    const r = e.state.value[n];
    r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
  }
}
function Me(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const _a = "🍍 Pinia (root)", lr = "_root";
function zh(e) {
  return ps(e) ? {
    id: lr,
    label: _a
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Gh(e) {
  if (ps(e)) {
    const n = Array.from(e._s.keys()), r = e._s;
    return {
      state: n.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: n.filter((s) => r.get(s)._getters).map((s) => {
        const i = r.get(s);
        return {
          editable: !1,
          key: s,
          value: i._getters.reduce((u, l) => (u[l] = i[l], u), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function qh(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Me(e.type),
    key: Me(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Yh(e) {
  switch (e) {
    case ot.direct:
      return "mutation";
    case ot.patchFunction:
      return "$patch";
    case ot.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Jt = !0;
const ar = [], Rt = "pinia:mutations", me = "pinia", { assign: Jh } = Object, Or = (e) => "🍍 " + e;
function Xh(e, t) {
  zl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ar,
    app: e
  }, (n) => {
    typeof n.now != "function" && he("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: Rt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: me,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Bh(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await jh(t), n.sendInspectorTree(me), n.sendInspectorState(me);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Hh(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Wh(t), n.sendInspectorTree(me), n.sendInspectorState(me);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (r) => {
            const o = t._s.get(r);
            o ? typeof o.$reset != "function" ? he(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), he(`Store "${r}" reset.`)) : he(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r) => {
      const o = r.componentInstance && r.componentInstance.proxy;
      if (o && o._pStores) {
        const s = r.componentInstance.proxy._pStores;
        Object.values(s).forEach((i) => {
          r.instanceData.state.push({
            type: Or(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: H(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((u, l) => (u[l] = i.$state[l], u), {})
            )
          }), i._getters && i._getters.length && r.instanceData.state.push({
            type: Or(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, l) => {
              try {
                u[l] = i[l];
              } catch (d) {
                u[l] = d;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((r) => {
      if (r.app === e && r.inspectorId === me) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(r.filter.toLowerCase()) : _a.toLowerCase().includes(r.filter.toLowerCase())) : o).map(zh);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === me) {
        const o = r.nodeId === lr ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.nodeId !== lr && (globalThis.$store = H(o)), r.state = Gh(o));
      }
    }), n.on.editInspectorState((r) => {
      if (r.app === e && r.inspectorId === me) {
        const o = r.nodeId === lr ? t : t._s.get(r.nodeId);
        if (!o)
          return he(`store "${r.nodeId}" not found`, "error");
        const { path: s } = r;
        ps(o) ? s.unshift("state") : (s.length !== 1 || !o._customProperties.has(s[0]) || s[0] in o.$state) && s.unshift("$state"), Jt = !1, r.set(o, s, r.state.value), Jt = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), s = t._s.get(o);
        if (!s)
          return he(`store "${o}" not found`, "error");
        const { path: i } = r;
        if (i[0] !== "state")
          return he(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", Jt = !1, r.set(s, i, r.state.value), Jt = !0;
      }
    });
  });
}
function Zh(e, t) {
  ar.includes(Or(t.$id)) || ar.push(Or(t.$id)), zl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ar,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const r = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: u, name: l, args: d }) => {
      const f = ga++;
      n.addTimelineEvent({
        layerId: Rt,
        event: {
          time: r(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: Me(t.$id),
            action: Me(l),
            args: d
          },
          groupId: f
        }
      }), i((a) => {
        St = void 0, n.addTimelineEvent({
          layerId: Rt,
          event: {
            time: r(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: Me(t.$id),
              action: Me(l),
              args: d,
              result: a
            },
            groupId: f
          }
        });
      }), u((a) => {
        St = void 0, n.addTimelineEvent({
          layerId: Rt,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: Me(t.$id),
              action: Me(l),
              args: d,
              error: a
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      Cn(() => Le(t[i]), (u, l) => {
        n.notifyComponentUpdate(), n.sendInspectorState(me), Jt && n.addTimelineEvent({
          layerId: Rt,
          event: {
            time: r(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: u,
              oldValue: l
            },
            groupId: St
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: u }, l) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(me), !Jt)
        return;
      const d = {
        time: r(),
        title: Yh(u),
        data: Jh({ store: Me(t.$id) }, qh(i)),
        groupId: St
      };
      u === ot.patchFunction ? d.subtitle = "⤵️" : u === ot.patchObject ? d.subtitle = "🧩" : i && !Array.isArray(i) && (d.subtitle = i.type), i && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: Rt,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = bt((i) => {
      o(i), n.addTimelineEvent({
        layerId: Rt,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Me(t.$id),
            info: Me("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me), n.getSettings().logStoreChanges && he(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(me), n.sendInspectorState(me), n.getSettings().logStoreChanges && he(`"${t.$id}" store installed 🆕`);
  });
}
let ga = 0, St;
function iu(e, t, n) {
  const r = t.reduce((o, s) => (o[s] = H(e)[s], o), {});
  for (const o in r)
    e[o] = function() {
      const s = ga, i = n ? new Proxy(e, {
        get(...l) {
          return St = s, Reflect.get(...l);
        },
        set(...l) {
          return St = s, Reflect.set(...l);
        }
      }) : e;
      St = s;
      const u = r[o].apply(i, arguments);
      return St = void 0, u;
    };
}
function Qh({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      iu(t, Object.keys(n.actions), t._isOptionsAPI);
      const r = t._hotUpdate;
      H(t)._hotUpdate = function(o) {
        r.apply(this, arguments), iu(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Zh(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function e_() {
  const e = yu(!0), t = e.run(() => Pr({}));
  let n = [], r = [];
  const o = bt({
    install(s) {
      Ln(o), o._a = s, s.provide(la, o), s.config.globalProperties.$pinia = o, Mt && Xh(s, o), r.forEach((i) => n.push(i)), r = [];
    },
    use(s) {
      return this._a ? n.push(s) : r.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Mt && typeof Proxy < "u" && o.use(Qh), o;
}
function ma(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    jt(o) && jt(r) && !re(r) && !rt(r) ? e[n] = ma(o, r) : e[n] = r;
  }
  return e;
}
const t_ = () => {
};
function uu(e, t, n, r = t_) {
  e.add(t);
  const o = () => {
    e.delete(t) && r();
  };
  return !n && vu() && $a(o), o;
}
function Gt(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const n_ = (e) => e(), lu = /* @__PURE__ */ Symbol(), to = /* @__PURE__ */ Symbol();
function Do(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    jt(o) && jt(r) && e.hasOwnProperty(n) && !re(r) && !rt(r) ? e[n] = Do(o, r) : e[n] = r;
  }
  return e;
}
const r_ = /* @__PURE__ */ Symbol("pinia:skipHydration");
function o_(e) {
  return !jt(e) || !Object.prototype.hasOwnProperty.call(e, r_);
}
const { assign: $e } = Object;
function au(e) {
  return !!(re(e) && e.effect);
}
function cu(e, t, n, r) {
  const { state: o, actions: s, getters: i } = t, u = n.state.value[e];
  let l;
  function d() {
    !u && !r && (n.state.value[e] = o ? o() : {});
    const f = /* use ref() to unwrap refs inside state TODO: check if this is still necessary */ Ss(r ? Pr(o ? o() : {}).value : n.state.value[e]);
    return $e(f, s, Object.keys(i || {}).reduce((a, h) => (h in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${h}" in store "${e}".`), a[h] = bt(es(() => {
      Ln(n);
      const _ = n._s.get(e);
      return i[h].call(_, _);
    })), a), {}));
  }
  return l = Po(e, d, t, n, r, !0), l;
}
function Po(e, t, n = {}, r, o, s) {
  let i;
  const u = $e({ actions: {} }, n);
  if (!r._e.active)
    throw new Error("Pinia destroyed");
  const l = { deep: !0 };
  l.onTrigger = (k) => {
    d ? _ = k : d == !1 && !L._hotUpdating && (Array.isArray(_) ? _.push(k) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  };
  let d, f, a = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), _;
  const m = r.state.value[e];
  !s && !m && !o && (r.state.value[e] = {});
  const S = Pr({});
  let x;
  function C(k) {
    let P;
    d = f = !1, _ = [], typeof k == "function" ? (k(r.state.value[e]), P = {
      type: ot.patchFunction,
      storeId: e,
      events: _
    }) : (Do(r.state.value[e], k), P = {
      type: ot.patchObject,
      payload: k,
      storeId: e,
      events: _
    });
    const z = x = /* @__PURE__ */ Symbol();
    io().then(() => {
      x === z && (d = !0);
    }), f = !0, Gt(a, P, r.state.value[e]);
  }
  const $ = s ? function() {
    const { state: P } = n, z = P ? P() : {};
    this.$patch((ue) => {
      $e(ue, z);
    });
  } : (
    /* istanbul ignore next */
    (() => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    })
  );
  function V() {
    i.stop(), a.clear(), h.clear(), r._s.delete(e);
  }
  const ne = (k, P = "") => {
    if (lu in k)
      return k[to] = P, k;
    const z = function() {
      Ln(r);
      const ue = Array.from(arguments), ye = /* @__PURE__ */ new Set(), ve = /* @__PURE__ */ new Set();
      function se(G) {
        ye.add(G);
      }
      function R(G) {
        ve.add(G);
      }
      Gt(h, {
        args: ue,
        name: z[to],
        store: L,
        after: se,
        onError: R
      });
      let K;
      try {
        K = k.apply(this && this.$id === e ? this : L, ue);
      } catch (G) {
        throw Gt(ve, G), G;
      }
      return K instanceof Promise ? K.then((G) => (Gt(ye, G), G)).catch((G) => (Gt(ve, G), Promise.reject(G))) : (Gt(ye, K), K);
    };
    return z[lu] = !0, z[to] = P, z;
  }, N = /* @__PURE__ */ bt({
    actions: {},
    getters: {},
    state: [],
    hotState: S
  }), J = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: uu.bind(null, h),
    $patch: C,
    $reset: $,
    $subscribe(k, P = {}) {
      const z = uu(a, k, P.detached, () => ue()), ue = i.run(() => Cn(() => r.state.value[e], (ye) => {
        (P.flush === "sync" ? f : d) && k({
          storeId: e,
          type: ot.direct,
          events: _
        }, ye);
      }, $e({}, l, P)));
      return z;
    },
    $dispose: V
  }, L = Ir($e(
    {
      _hmrPayload: N,
      _customProperties: bt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    J
    // must be added later
    // setupStore
  ));
  r._s.set(e, L);
  const Z = (r._a && r._a.runWithContext || n_)(() => r._e.run(() => (i = yu()).run(() => t({ action: ne }))));
  for (const k in Z) {
    const P = Z[k];
    if (re(P) && !au(P) || rt(P))
      o ? S.value[k] = Wr(Z, k) : s || (m && o_(P) && (re(P) ? P.value = m[k] : Do(P, m[k])), r.state.value[e][k] = P), N.state.push(k);
    else if (typeof P == "function") {
      const z = o ? P : ne(P, k);
      Z[k] = z, N.actions[k] = P, u.actions[k] = P;
    } else
      au(P) && (N.getters[k] = s ? (
        // @ts-expect-error
        n.getters[k]
      ) : P, Mt && (Z._getters || // @ts-expect-error: same
      (Z._getters = bt([]))).push(k));
  }
  if ($e(L, Z), $e(H(L), Z), Object.defineProperty(L, "$state", {
    get: () => o ? S.value : r.state.value[e],
    set: (k) => {
      if (o)
        throw new Error("cannot set hotState");
      C((P) => {
        $e(P, k);
      });
    }
  }), L._hotUpdate = bt((k) => {
    L._hotUpdating = !0, k._hmrPayload.state.forEach((P) => {
      if (P in L.$state) {
        const z = k.$state[P], ue = L.$state[P];
        typeof z == "object" && jt(z) && jt(ue) ? ma(z, ue) : k.$state[P] = ue;
      }
      L[P] = Wr(k.$state, P);
    }), Object.keys(L.$state).forEach((P) => {
      P in k.$state || delete L[P];
    }), d = !1, f = !1, r.state.value[e] = Wr(k._hmrPayload, "hotState"), f = !0, io().then(() => {
      d = !0;
    });
    for (const P in k._hmrPayload.actions) {
      const z = k[P];
      L[P] = //
      ne(z, P);
    }
    for (const P in k._hmrPayload.getters) {
      const z = k._hmrPayload.getters[P], ue = s ? (
        // special handling of options api
        es(() => (Ln(r), z.call(L, L)))
      ) : z;
      L[P] = //
      ue;
    }
    Object.keys(L._hmrPayload.getters).forEach((P) => {
      P in k._hmrPayload.getters || delete L[P];
    }), Object.keys(L._hmrPayload.actions).forEach((P) => {
      P in k._hmrPayload.actions || delete L[P];
    }), L._hmrPayload = k._hmrPayload, L._getters = k._getters, L._hotUpdating = !1;
  }), Mt) {
    const k = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((P) => {
      Object.defineProperty(L, P, $e({ value: L[P] }, k));
    });
  }
  return r._p.forEach((k) => {
    if (Mt) {
      const P = i.run(() => k({
        store: L,
        app: r._a,
        pinia: r,
        options: u
      }));
      Object.keys(P || {}).forEach((z) => L._customProperties.add(z)), $e(L, P);
    } else
      $e(L, i.run(() => k({
        store: L,
        app: r._a,
        pinia: r,
        options: u
      })));
  }), L.$state && typeof L.$state == "object" && typeof L.$state.constructor == "function" && !L.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${L.$id}".`), m && s && n.hydrate && n.hydrate(L.$state, m), d = !0, f = !0, L;
}
// @__NO_SIDE_EFFECTS__
function s_(e, t, n) {
  let r;
  const o = typeof t == "function";
  r = o ? n : t;
  function s(i, u) {
    const l = uf();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (l ? wn(la, null) : null), i && Ln(i), !Io)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = Io, i._s.has(e) || (o ? Po(e, t, r, i) : cu(e, r, i), s._pinia = i);
    const d = i._s.get(e);
    if (u) {
      const f = "__hot:" + e, a = o ? Po(f, t, r, i, !0) : cu(f, $e({}, r), i, !0);
      u._hotUpdate(a), delete i.state.value[f], i._s.delete(f);
    }
    if (Mt) {
      const f = Nr();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const a = f.proxy, h = "_pStores" in a ? a._pStores : a._pStores = {};
        h[e] = d;
      }
    }
    return d;
  }
  return s.$id = e, s;
}
const i_ = {
  add(e, t = 1) {
    const n = `/api/v1/basket/add/${e}/${t}`;
    return BX.ajax.promise({
      method: "POST",
      url: n,
      dataType: "json"
    }).then((r) => {
      if (r.status === "error")
        throw new Error(r.errors[0]?.message || "Unknown error");
      return r.data || r;
    });
  }
}, u_ = /* @__PURE__ */ s_("basket", {
  state: () => ({
    items: {},
    totalPrice: 0,
    totalCount: 0,
    isLoading: !1,
    error: null
  }),
  actions: {
    async addToBasket(e) {
      this.isLoading = !0, this.error = null;
      try {
        const t = await i_.add(e, 1);
        this.totalPrice = t.basketTotal, this.totalCount = t.basketCount, this.items[e] || (this.items[e] = { quantity: 0 }), this.items[e].quantity = t.currentItemQuantity, console.log("Товар добавлен:", t);
      } catch (t) {
        console.error("Ошибка корзины:", t), this.error = "Не удалось добавить товар";
      } finally {
        this.isLoading = !1;
      }
    },
    init(e) {
      e && (this.totalPrice = e.totalPrice || 0, this.totalCount = e.totalCount || 0);
    }
  }
}), l_ = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, a_ = { class: "fesero-basket-widget" }, c_ = { class: "header" }, f_ = { class: "stats" }, d_ = { class: "badge" }, p_ = { class: "price" }, h_ = { class: "debug-controls" }, __ = { class: "product-row" }, g_ = ["disabled"], m_ = { class: "product-row" }, E_ = ["disabled"], y_ = {
  key: 0,
  class: "error-msg"
}, v_ = {
  __name: "App",
  props: {
    initialConfig: Object
  },
  setup(e) {
    const t = e, n = u_();
    return Qu(() => {
      t.initialConfig && n.init(t.initialConfig);
    }), (r, o) => (go(), Ms("div", a_, [
      Oe("div", c_, [
        o[2] || (o[2] = Oe("h3", null, "🛒 Корзина (Fesero)", -1)),
        Oe("div", f_, [
          Oe("span", d_, "Товаров: " + _n(Le(n).totalCount), 1),
          Oe("span", p_, _n(Le(n).totalPrice) + " ₽", 1)
        ])
      ]),
      Oe("div", h_, [
        o[5] || (o[5] = Oe("h4", null, "Debug Panel", -1)),
        Oe("div", __, [
          o[3] || (o[3] = Oe("span", null, "Товар ID 5", -1)),
          Oe("button", {
            onClick: o[0] || (o[0] = (s) => Le(n).addToBasket(5)),
            disabled: Le(n).isLoading
          }, _n(Le(n).isLoading ? "..." : "+ Купить"), 9, g_)
        ]),
        Oe("div", m_, [
          o[4] || (o[4] = Oe("span", null, "Товар ID 6", -1)),
          Oe("button", {
            onClick: o[1] || (o[1] = (s) => Le(n).addToBasket(6)),
            disabled: Le(n).isLoading
          }, " + Купить ", 8, E_)
        ]),
        Le(n).error ? (go(), Ms("div", y_, _n(Le(n).error), 1)) : Hf("", !0)
      ])
    ]));
  }
}, b_ = /* @__PURE__ */ l_(v_, [["__scopeId", "data-v-d2e7b716"]]), S_ = e_(), O_ = {
  "basket-widget": b_
};
class Ro {
  static init() {
    document.querySelectorAll("[data-component]").forEach((n) => {
      const r = n.dataset.component, o = O_[r];
      if (!o) return;
      let s = {};
      try {
        s = JSON.parse(n.dataset.initial || "{}");
      } catch (u) {
        console.error("JSON Parse Error", u);
      }
      const i = Td(o, { initialConfig: s });
      i.use(S_), i.mount(n), console.log(`[System] Mounted ${r}`);
    });
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => Ro.init()) : Ro.init();
Ro.init();
