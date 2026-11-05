// Templates that create fresh practice questions with new numbers every time.
// Each generator returns a question in the same shape as the hand-written ones.
// key: "v<n>" = video chapter n, "s<n>" = SAT skill n.
const GEN = (() => {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const nz = (a, b) => { let v; do { v = ri(a, b); } while (v === 0); return v; };
  const sg = n => (n < 0 ? `-${-n}` : `+${n}`);           // signed term: "+3" / "-3"
  const lin = (m, b, v = "x") => `${m === 1 ? "" : m === -1 ? "-" : m}${v}${b === 0 ? "" : sg(b)}`;
  const co = (a, v) => `${a === 1 ? "" : a === -1 ? "-" : a}${v}`;            // coefficient: 1x -> x
  const term = (a, v) => a === 0 ? "" : (a > 0 ? "+" : "-") + (Math.abs(a) === 1 ? "" : Math.abs(a)) + v;
  const quad = (a, b, c) => `${co(a, "x^2")}${term(b, "x")}${c === 0 ? "" : sg(c)}`;
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const fr = (n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? `${n}` : `${n < 0 ? "-" : ""}\\frac{${Math.abs(n)}}{${d}}`; };
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Build multiple choice: correct value plus distinct distractors, rendered by fmt
  function mc(correct, distractors, fmt = v => `\\(${v}\\)`) {
    const vals = [correct];
    for (const d of distractors) if (!vals.some(v => String(v) === String(d)) && vals.length < 4) vals.push(d);
    let k = 1; while (vals.length < 4) { const d = typeof correct === "number" ? correct + k * 3 : correct + "'".repeat(k); if (!vals.includes(d)) vals.push(d); k++; }
    shuffle(vals);
    return { c: vals.map(fmt), a: vals.findIndex(v => String(v) === String(correct)) };
  }
  const L = [];
  const add = (key, diff, fn) => L.push({ key, diff, fn });

  // ── One-variable linear equation
  add("v0", "Easy", () => {
    const x = nz(-9, 12), a = ri(2, 9), b = nz(-8, 8); let c; do { c = ri(1, 9); } while (c === a);
    const d = a * (x + b) - c * x;
    return { type: "spr", a: x, s: `\\(${a}(x${sg(b)})=${lin(c, d)}\\)<br><br>What is the solution to the given equation?`,
      e: `Distribute: \\(${a}x${sg(a * b)}=${lin(c, d)}\\), so \\(${co(a - c, "x")}=${d - a * b}\\) and \\(x=${x}\\).`,
      d: `Graph both sides and click the intersection.`, dz: [`y=${a}(x${sg(b)})`, `y=${lin(c, d)}`] };
  });
  add("s0", "Medium", () => {
    const a = ri(2, 6), b = ri(2, 9), m = ri(2, 5), t = a * ri(1, 6) + b;
    return { type: "spr", a: m * t, s: `If \\(${a}x+${b}=${t}\\), what is the value of \\(${m * a}x+${m * b}\\)?`,
      e: `\\(${m * a}x+${m * b}=${m}(${a}x+${b})=${m}(${t})=${m * t}\\).` };
  });
  // ── Systems
  add("v1", "Medium", () => {
    const x = nz(-6, 8), y = nz(-6, 8); let a1, b1, a2, b2;
    do { a1 = nz(-5, 6); b1 = nz(-5, 6); a2 = nz(-5, 6); b2 = nz(-5, 6); } while (a1 * b2 - a2 * b1 === 0);
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y; const ask = pick(["x", "y", "x+y"]);
    const ans = ask === "x" ? x : ask === "y" ? y : x + y;
    const eq = (a, b, c) => `${co(a, "x")}${term(b, "y")}=${c}`;
    return { type: "spr", a: ans, s: `\\(${eq(a1, b1, c1)}\\)<br>\\(${eq(a2, b2, c2)}\\)<br><br>The solution to the given system is \\((x, y)\\). What is the value of \\(${ask}\\)?`,
      e: `The solution is \\((${x}, ${y})\\), so \\(${ask}=${ans}\\).`, d: `Graph both equations and click the intersection.`, dz: [eq(a1, b1, c1), eq(a2, b2, c2)] };
  });
  add("v2", "Medium", () => {
    const a = ri(1, 5), b = ri(2, 7), n = ri(2, 4), m = ri(3, 12); const p = n * m + nz(-5, 5);
    return { type: "spr", a: b, s: `\\(${co(a, "x")}+ky=${m}\\)<br>\\(${n * a}x+${n * b}y=${p}\\)<br><br>In the given system, \\(k\\) is a constant. If the system has no solution, what is the value of \\(k\\)?`,
      e: `No solution means parallel lines: the second equation's \\(x\\)-coefficient is ${n} times the first's, so \\(k=${n * b}/${n}=${b}\\). The constants (${n * m} vs ${p}) differ, so the lines are distinct.`,
      d: `Use a slider for \\(k\\) and slide until the lines are parallel.`, dz: [`${co(a,"x")}+ky=${m}`, `${n * a}x+${n * b}y=${p}`, `k=1`] };
  });
  add("v2", "Hard", () => {
    const h = nz(-5, 5), b = -2 * h, k = nz(-6, 6), c = h * h + k;
    return { type: "spr", a: c, s: `\\(y=x^2${term(b, "x")}+c\\)<br>\\(y=${k}\\)<br><br>In the given system, \\(c\\) is a constant. For what value of \\(c\\) does the system have exactly one real solution?`,
      e: `\\(x^2${term(b, "x")}+(c${sg(-k)})=0\\) needs discriminant 0: \\(${b * b}-4(c${sg(-k)})=0\\), so \\(c=${c}\\).`,
      d: `Slide \\(c\\) until the vertex touches \\(y=${k}\\).`, dz: [`y=x^2${term(b, "x")}+c`, `y=${k}`, `c=0`] };
  });
  // ── Functions / quadratics
  add("v4", "Medium", () => {
    const a = ri(1, 3), h = nz(-6, 6), k = nz(-9, 9); const b = -2 * a * h, c = a * h * h + k;
    return { type: "spr", a: k, s: `The function \\(f\\) is defined by \\(f(x)=${quad(a, b, c)}\\). What is the minimum value of \\(f(x)\\)?`,
      e: `The vertex is at \\(x=${h}\\), and \\(f(${h})=${k}\\).`, d: `Graph \\(f\\) and click the vertex.`, dz: [`f(x)=${quad(a, b, c)}`] };
  });
  add("v4", "Easy", () => {
    const m = nz(-4, 5), b = nz(-6, 6), p = ri(1, 3), q = nz(-5, 5), n = nz(-3, 3);
    const g = p * n * n + q, ans = m * g + b;
    return { type: "spr", a: ans, s: `The functions \\(f\\) and \\(g\\) are defined by \\(f(x)=${lin(m, b)}\\) and \\(g(x)=${quad(p, 0, q)}\\). What is the value of \\(f(g(${n}))\\)?`,
      e: `\\(g(${n})=${g}\\), so \\(f(${g})=${ans}\\).`, d: `Define both functions in Desmos and type \\(f(g(${n}))\\).`, dz: [`f(x)=${lin(m, b)}`, `g(x)=${quad(p, 0, q)}`, `f(g(${n}))`] };
  });
  // ── Circles
  add("v6", "Medium", () => {
    const h = nz(-7, 7), k = nz(-7, 7), r = ri(2, 12), C = r * r - h * h - k * k;
    return { type: "spr", a: r, s: `\\(x^2+y^2${term(-2 * h, "x")}${term(-2 * k, "y")}=${C}\\)<br><br>The graph of the given equation in the xy-plane is a circle. What is the length of its radius?`,
      e: `Complete the square: \\((x${sg(-h)})^2+(y${sg(-k)})^2=${C}+${h * h}+${k * k}=${r * r}\\), so \\(r=${r}\\).`, d: `Type the equation into Desmos and measure the radius.`,
      dz: [`x^2+y^2${term(-2 * h, "x")}${term(-2 * k, "y")}=${C}`], v: [h - r - 3, h + r + 3, k - r - 3, k + r + 3] };
  });
  add("s18", "Easy", () => {
    const h = nz(-9, 9), k = nz(-9, 9), r2 = pick([4, 9, 16, 20, 25, 36, 50]);
    const o = mc(`(${h},${k})`, [`(${-h},${-k})`, `(${-h},${k})`, `(${h},${-k})`]);
    return { type: "mc", c: o.c, a: o.a, s: `What is the center of the circle defined by \\((x${sg(-h)})^2+(y${sg(-k)})^2=${r2}\\)?`,
      e: `\\((x-h)^2+(y-k)^2=r^2\\) has center \\((h,k)=(${h},${k})\\). Watch the signs!` };
  });
  add("s18", "Medium", () => {
    const r = ri(2, 12), ang = pick([30, 45, 60, 72, 80, 90, 120, 135, 150, 180, 240, 270]);
    const k = (ang / 360) * 2 * r; if (!Number.isInteger(k * 2)) return null;
    return { type: "spr", a: k, s: `A circle has a radius of ${r}. An arc of the circle has a central angle of ${ang}°. The length of the arc is \\(k\\pi\\). What is the value of \\(k\\)?`,
      e: `Arc length \\(=\\frac{${ang}}{360}(2\\pi\\cdot${r})=${k}\\pi\\).` };
  });
  // ── Regression
  add("v7", "Medium", () => {
    const m = pick([-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 2.5, 3, 4]), b = nz(-6, 10), x0 = ri(0, 3), dx = ri(1, 3);
    const xs = [0, 1, 2, 3].map(i => x0 + i * dx), ys = xs.map(x => m * x + b), X = ri(10, 30);
    const ans = m * X + b;
    return { type: "spr", a: ans, s: `<table class="dt"><tr><th>\\(x\\)</th>${xs.map(x => `<td>${x}</td>`).join("")}</tr><tr><th>\\(y\\)</th>${ys.map(y => `<td>${y}</td>`).join("")}</tr></table>The table shows values for a linear relationship. What is the value of \\(y\\) when \\(x=${X}\\)?`,
      e: `The slope is \\(${m}\\) and the y-intercept is \\(${b}\\), so \\(y=${m}x${sg(b)}\\) and \\(y(${X})=${ans}\\).`,
      d: `Enter the table and run \\(y_1\\sim mx_1+b\\).`, dz: [{ table: [xs, ys] }, `y_1\\sim mx_1+b`, `y=mx+b`] };
  });
  add("v7", "Medium", () => {
    const a = ri(2, 6), b = pick([2, 3, 4]), n = ri(4, 6), xs = [0, 1, 2, 3], ys = xs.map(x => a * b ** x), ans = a * b ** n;
    const o = mc(ans, [a * b ** (n - 1), a * b * n, ans * b, a ** n * b]);
    return { type: "mc", c: o.c.map(s => s.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1{,}")), a: o.a,
      s: `<table class="dt"><tr><th>\\(x\\)</th>${xs.map(x => `<td>${x}</td>`).join("")}</tr><tr><th>\\(g(x)\\)</th>${ys.map(y => `<td>${y}</td>`).join("")}</tr></table>For the exponential function \\(g\\), the table shows four values. What is the value of \\(g(${n})\\)?`,
      e: `\\(g(x)=${a}\\cdot${b}^x\\), so \\(g(${n})=${ans}\\).`, d: `Run \\(y_1\\sim ab^{x_1}\\) on the table.`, dz: [{ table: [xs, ys] }, `y_1\\sim ab^{x_1}`] };
  });
  add("v8", "Hard", () => {
    const r1 = nz(-6, 6); let r2; do { r2 = nz(-6, 6); } while (r2 === r1);
    const a = ri(1, 3), y0 = a * r1 * r2, b = -a * (r1 + r2), ask = ri(-3, 4), ans = a * (ask - r1) * (ask - r2);
    return { type: "spr", a: ans, s: `The graph of the quadratic function \\(f\\) passes through \\((${r1},0)\\), \\((${r2},0)\\), and \\((0,${y0})\\). What is the value of \\(f(${ask})\\)?`,
      e: `\\(f(x)=k(x${sg(-r1)})(x${sg(-r2)})\\) with \\(f(0)=${r1 * r2}k=${y0}\\), so \\(k=${a}\\). Then \\(f(${ask})=${ans}\\).`,
      d: `Table the three points and run \\(y_1\\sim ax_1^2+bx_1+c\\).`, dz: [{ table: [[r1, r2, 0], [0, 0, y0]] }, `y_1\\sim ax_1^2+bx_1+c`, `f(x)=ax^2+bx+c`, `f(${ask})`] };
  });
  // ── Factoring
  add("v10", "Easy", () => {
    const r1 = nz(-9, 9); let r2; do { r2 = nz(-9, 9); } while (r2 === r1 || r2 === -r1);
    const b = -(r1 + r2), c = r1 * r2;
    const f = r => `x${sg(-r)}`;
    const o = mc(f(r1), [f(-r1), f(-r2), f(r1 + r2)]);
    return { type: "mc", c: o.c, a: o.a, s: `Which of the following is a factor of \\(${quad(1, b, c)}\\)?`,
      e: `\\(${quad(1, b, c)}=(${f(r1)})(${f(r2)})\\). The zeros are ${r1} and ${r2}.`, d: `Graph it; an x-intercept at \\(r\\) means \\((x-r)\\) is a factor.`, dz: [`y=${quad(1, b, c)}`] };
  });
  // ── Slopes
  add("v11", "Easy", () => {
    const m = pick([-3, -2, -1.5, -0.75, -0.5, 0.25, 0.5, 0.75, 1.5, 2, 3, 4]), dx = pick([2, 4, 4, 8]), x1 = nz(-8, 5), y1 = nz(-8, 8);
    const x2 = x1 + dx, y2 = y1 + m * dx;
    return { type: "spr", a: m, s: `What is the slope of the line in the xy-plane that passes through the points \\((${x1}, ${y1})\\) and \\((${x2}, ${y2})\\)?`,
      e: `\\(\\frac{${y2}-(${y1})}{${x2}-(${x1})}=\\frac{${y2 - y1}}{${dx}}=${m}\\).` };
  });
  add("v11", "Medium", () => {
    const a = nz(-6, 6), b = nz(-6, 6), c = nz(-12, 12), perp = b / a; if (Math.abs(perp * 1000 - Math.round(perp * 1000)) > 1e-9) return null;
    return { type: "spr", a: perp, s: `Line \\(\\ell\\) is perpendicular to the line \\(${co(a, "x")}${term(b, "y")}=${c}\\). What is the slope of line \\(\\ell\\)?`,
      e: `The given line has slope \\(${fr(-a, b)}\\). The perpendicular slope is the negative reciprocal: \\(${fr(b, a)}=${perp}\\).` };
  });
  // ── PSDA
  add("s9", "Medium", () => {
    const o = ri(4, 40) * 10, p = pick([-40, -25, -20, -15, -10, 5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75]), n = o * (1 + p / 100);
    if (!Number.isInteger(n)) return null;
    return { type: "spr", a: Math.abs(p), s: `The price of an item changed from $${o} to $${n}. By what percent did the price ${p > 0 ? "increase" : "decrease"}? (Enter your answer without the % sign.)`,
      e: `\\(\\frac{|${n}-${o}|}{${o}}=${Math.abs(p) / 100}=${Math.abs(p)}\\%\\).` };
  });
  add("s9", "Hard", () => {
    const o = ri(2, 20) * 20, d = pick([10, 20, 25, 40]), t = pick([5, 8, 10]), ans = +(o * (1 - d / 100) * (1 + t / 100)).toFixed(2);
    return { type: "spr", a: ans, s: `An item originally priced at $${o} is discounted by ${d}%. Then a ${t}% sales tax is applied to the discounted price. What is the final price, in dollars?`,
      e: `\\(${o}(1-${d / 100})(1+${t / 100})=${ans}\\).` };
  });
  add("s10", "Easy", () => {
    const n = ri(4, 7), mean = ri(10, 60), vals = Array.from({ length: n - 1 }, () => mean + nz(-12, 12));
    const last = mean * n - vals.reduce((s, v) => s + v, 0); if (last <= 0) return null;
    return { type: "spr", a: last, s: `The mean of ${n} numbers is ${mean}. ${n - 1} of the numbers are ${vals.join(", ")}. What is the remaining number?`,
      e: `The total is \\(${n}\\times${mean}=${mean * n}\\). Subtract the known values: \\(${last}\\).` };
  });
  add("s12", "Easy", () => {
    const tot = pick([10, 20, 25, 40, 50]), r = ri(1, tot - 2), b = ri(1, tot - r - 1), g = tot - r - b; const col = pick(["red", "blue", "green"]);
    const k = { red: r, blue: b, green: g }[col];
    return { type: "spr", a: k / tot, s: `A bag contains ${r} red, ${b} blue, and ${g} green marbles. If one marble is chosen at random, what is the probability it is ${col}? (Express your answer as a decimal or fraction.)`,
      e: `\\(${k}/${tot}=${k / tot}\\).` };
  });
  add("s8", "Easy", () => {
    const rate = ri(3, 25), t1 = ri(2, 6), t2 = ri(7, 20), item = pick(["pages", "cookies", "widgets", "flyers"]);
    return { type: "spr", a: rate * t2, s: `A machine produces ${rate * t1} ${item} in ${t1} minutes. At this rate, how many ${item} does it produce in ${t2} minutes?`,
      e: `The rate is \\(${rate * t1}/${t1}=${rate}\\) per minute, so \\(${rate}\\times${t2}=${rate * t2}\\).` };
  });
  // ── Geometry
  add("s17", "Easy", () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(1, 4);
    return { type: "spr", a: c * k, s: `A right triangle has legs of lengths ${a * k} and ${b * k}. What is the length of the hypotenuse?`,
      e: `\\(\\sqrt{${(a * k) ** 2}+${(b * k) ** 2}}=${c * k}\\).` };
  });
  add("s17", "Medium", () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
    const f = pick(["sin", "cos"]); const ans = f === "sin" ? b / c : a / c;
    return { type: "spr", a: ans, tol: 0.0011, ad: `${f === "sin" ? b : a}/${c}`, s: `For acute angle \\(\\theta\\), \\(\\tan\\theta=\\frac{${b}}{${a}}\\). What is the value of \\(\\${f}\\theta\\)?`,
      e: `Opposite ${b}, adjacent ${a}, hypotenuse ${c}: \\(\\${f}\\theta=${f === "sin" ? b : a}/${c}\\).` };
  });
  add("s15", "Easy", () => {
    const r = ri(2, 9), h = ri(2, 12);
    return { type: "spr", a: r * r * h, s: `A right circular cylinder has a radius of ${r} and a height of ${h}. Its volume is \\(k\\pi\\). What is the value of \\(k\\)?`,
      e: `\\(V=\\pi r^2h=\\pi(${r * r})(${h})=${r * r * h}\\pi\\).` };
  });
  add("s15", "Hard", () => {
    const k = ri(2, 9), A = ri(3, 30) * 2;
    return { type: "spr", a: A * k * k, s: `Two similar triangles have corresponding sides in the ratio \\(1:${k}\\). The smaller triangle has an area of ${A}. What is the area of the larger triangle?`,
      e: `Areas scale by the square of the ratio: \\(${A}\\times${k * k}=${A * k * k}\\).` };
  });
  add("s16", "Easy", () => {
    const sets = [[1, 2, 3], [2, 3, 4], [1, 1, 2], [2, 3, 5], [1, 4, 5], [3, 4, 5], [1, 2, 6], [4, 5, 9], [2, 7, 9]];
    const r = pick(sets), unit = 180 / (r[0] + r[1] + r[2]); if (!Number.isInteger(unit)) return null;
    return { type: "spr", a: unit * r[2], s: `The measures of the angles of a triangle are in the ratio \\(${r.join(":")}\\). What is the measure, in degrees, of the largest angle?`,
      e: `${r[0] + r[1] + r[2]} parts \\(=180°\\), so each part is \\(${unit}°\\). Largest \\(=${r[2]}\\times${unit}=${unit * r[2]}°\\).` };
  });

  function make(keys, n) {
    const pool = L.filter(g => keys.includes(g.key));
    if (!pool.length) return [];
    const out = []; let guard = 0;
    while (out.length < n && guard++ < n * 30) {
      const g = pick(pool), q = g.fn(); if (!q) continue;
      out.push(Object.assign(q, { key: g.key, diff: g.diff, src: "generated" }));
    }
    return out;
  }
  return { list: L, make, keysWithGenerators: () => [...new Set(L.map(g => g.key))] };
})();
