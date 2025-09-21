/**
 * @license
 * yoga.js <https://yogajs.com/>
 * Released under MIT license <https://yogajs.com/license>
 * Copyright Vaseem Abbas Mohammed
 */

; (() => {
    const yoga = {
        ananthasana: { prototype: Array.prototype },
        salabhasana: { prototype: String.prototype },
        nadishodhana: { prototype: Number.prototype },
        balasana: { prototype: Boolean.prototype },
        makarasana: { prototype: Math },
        dhyana: { prototype: Date.prototype },
        ekasana: { prototype: Object.prototype },
        matsyasana: { prototype: Function.prototype },
        virabhadrasana: {} // safer than Window.prototype
    };

    const MSG_NO_DIFFERENCE = "No Difference";

    const isArray = Array.isArray;
    const isObject = (obj) =>
        Object.prototype.toString.call(obj) === "[object Object]";
    const shallowCopy = (array) => Array.prototype.slice.call(array);
    const setConstant = (value) => ({
        enumerable: false,
        configurable: false,
        writable: false,
        value
    });
    const inspect = (array) =>
        array.length === 0
            ? MSG_NO_DIFFERENCE
            : array.length === 1
                ? array[0]
                : array;

    /* ---------------- Array ---------------- */
    yoga.ananthasana.contains = function (ele) {
        return this.indexOf(ele) !== -1;
    };

    yoga.ananthasana.iterator = function () {
        let pos = 0;
        const arr = this;
        return {
            hasNext: () => pos < arr.length,
            next: () => arr[pos++]
        };
    };

    yoga.ananthasana.concatAll = function (a) {
        return this.concat(a);
    };

    yoga.ananthasana.apply = function (operation) {
        return this.map(operation);
    };

    yoga.ananthasana.truthy = function () {
        return this.filter(Boolean);
    };

    yoga.ananthasana.difference = function (array) {
        if (!isArray(array)) {
            console.error("TypeError: Passed parameter is not an Array");
            return inspect(this);
        }
        const diff = [
            ...this.filter((x) => !array.includes(x)),
            ...array.filter((x) => !this.includes(x))
        ];
        return inspect([...new Set(diff)]);
    };

    yoga.ananthasana.differenceBy = function (array, fn) {
        const mapper = fn || ((x) => x);
        const setA = new Set(this.map(mapper));
        const setB = new Set(array.map(mapper));
        const diff = [...setA].filter((x) => !setB.has(x));
        return inspect(diff);
    };

    yoga.ananthasana.unique = function () {
        return [...new Set(this)];
    };

    yoga.ananthasana.flatten = function (depth = 1) {
        return this.flat(depth);
    };

    yoga.ananthasana.groupBy = function (fn) {
        return this.reduce((acc, val) => {
            const key = fn(val);
            (acc[key] = acc[key] || []).push(val);
            return acc;
        }, {});
    };

    yoga.ananthasana.chunk = function (size) {
        const res = [];
        for (let i = 0; i < this.length; i += size) {
            res.push(this.slice(i, i + size));
        }
        return res;
    };

    yoga.ananthasana.intersection = function (arr) {
        return this.filter((x) => arr.includes(x));
    };

    /* ---------------- Object ---------------- */
    yoga.ekasana.size = function () {
        return Object.keys(this).length;
    };

    yoga.ekasana.entries = function () {
        return Object.entries(this);
    };

    yoga.ekasana.mapValues = function (fn) {
        return Object.fromEntries(
            Object.entries(this).map(([k, v]) => [k, fn(v, k)])
        );
    };

    yoga.ekasana.pick = function (keys) {
        return keys.reduce((acc, k) => {
            if (k in this) acc[k] = this[k];
            return acc;
        }, {});
    };

    yoga.ekasana.omit = function (keys) {
        return Object.fromEntries(
            Object.entries(this).filter(([k]) => !keys.includes(k))
        );
    };

    yoga.ekasana.deepClone = function () {
        return structuredClone(this);
    };

    /* ---------------- String ---------------- */
    yoga.salabhasana.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    yoga.salabhasana.reverse = function () {
        return this.split("").reverse().join("");
    };

    yoga.salabhasana.camelCase = function () {
        return this.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
    };

    /* ---------------- Number ---------------- */
    yoga.nadishodhana.clamp = function (min, max) {
        return Math.min(Math.max(this, min), max);
    };

    yoga.nadishodhana.toCurrency = function (locale = "en-US", currency = "USD") {
        return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
            this
        );
    };

    /* ---------------- Date ---------------- */
    yoga.dhyana.format = function (pattern = "YYYY-MM-DD HH:mm:ss") {
        const pad = (n) => String(n).padStart(2, "0");
        return pattern
            .replace("YYYY", this.getFullYear())
            .replace("MM", pad(this.getMonth() + 1))
            .replace("DD", pad(this.getDate()))
            .replace("HH", pad(this.getHours()))
            .replace("mm", pad(this.getMinutes()))
            .replace("ss", pad(this.getSeconds()));
    };

    yoga.dhyana.addDays = function (n) {
        const d = new Date(this);
        d.setDate(d.getDate() + n);
        return d;
    };

    /* ---------------- Function ---------------- */
    yoga.matsyasana.memoize = function () {
        const fn = this;
        const cache = new Map();
        return function (...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    };

    yoga.matsyasana.curry = function (...args) {
        const fn = this;
        return function (...next) {
            return fn.apply(this, args.concat(next));
        };
    };

    yoga.matsyasana.debounce = function (delay) {
        let timer;
        const fn = this;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    };

    yoga.matsyasana.throttle = function (delay) {
        let last = 0;
        const fn = this;
        return function (...args) {
            const now = Date.now();
            if (now - last >= delay) {
                last = now;
                fn.apply(this, args);
            }
        };
    };
    
    // Install methods onto the target prototypes (from the `yoga` map)
    Object.keys(yoga).forEach((key) => {
        const meta = yoga[key];
        const proto = meta && meta.prototype;
        if (!proto) return; // skip entries without a prototype
        Object.keys(meta).forEach((name) => {
            if (name === 'prototype') return;
            const fn = meta[name];
            if (typeof fn !== 'function') return;
            try {
                Object.defineProperty(proto, name, setConstant(fn));
            } catch (e) {
                // fallback to direct assign if defineProperty fails in some environments
                proto[name] = fn;
            }
        });
    });

    // Expose the yoga registry for debugging
    if (typeof window !== 'undefined') window.yoga = yoga;

})();