// Priority Practice: drills built from the 10 questions missed on SAT Practice 10 (Nov 4, 2026).
// Each topic has: the missed question's lesson, a key rule, hand-written drills, and a generator for unlimited reps.
const PRIORITY = (() => {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const nz = (a, b) => { let v; do { v = ri(a, b); } while (v === 0); return v; };
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sg = n => (n < 0 ? `-${-n}` : `+${n}`);
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "{,}");
  function mc(correct, wrong) {
    const vals = [correct]; for (const w of wrong) if (!vals.includes(w) && vals.length < 4) vals.push(w);
    shuffle(vals); return { c: vals.map(v => `\\(${v}\\)`), a: vals.indexOf(correct) };
  }
  function mcText(correct, wrong) {
    const vals = [correct, ...wrong.slice(0, 3)]; shuffle(vals); return { c: vals, a: vals.indexOf(correct) };
  }
  const p = n => (n < 0 ? `(${n})` : `${n}`);
  const pw = (v, e) => e === 0 ? "" : e === 1 ? v : `${v}^{${e}}`;

  const T = [];
  const topic = (key, name, missed, rule, qs, gen) => T.push({ key, name, missed, rule, qs, gen });

  // 0 ── Exponent rules
  topic("p0", "Exponent rules: multiplying powers",
    "You multiplied the exponents. When you multiply powers with the same base, you add the exponents.",
    "x^a · x^b = x^(a+b). Group each base, then add exponents, including negative ones: z^(−1) · z^3 = z^2.",
    [
      { type: "mc", s: R`Which expression is equivalent to \((a^3b^{-2})(a^2b^5)\), where \(a\) and \(b\) are positive?`, ...{ c: [R`\(a^6b^{-10}\)`, R`\(a^5b^3\)`, R`\(a^5b^{7}\)`, R`\(a^6b^3\)`], a: 1 }, e: R`Add exponents: \(a^{3+2}b^{-2+5}=a^5b^3\).` },
      { type: "mc", s: R`Which expression is equivalent to \(\dfrac{x^7y^2}{x^3y^{-1}}\), where \(x\) and \(y\) are positive?`, c: [R`\(x^4y^3\)`, R`\(x^4y\)`, R`\(x^{10}y\)`, R`\(x^{21}y^{-2}\)`], a: 0, e: R`Dividing subtracts exponents: \(x^{7-3}y^{2-(-1)}=x^4y^3\).` },
      { type: "mc", s: R`Which expression is equivalent to \((2m^3)^4\)?`, c: [R`\(8m^{7}\)`, R`\(16m^{7}\)`, R`\(8m^{12}\)`, R`\(16m^{12}\)`], a: 3, e: R`Raise each factor to the 4th power: \(2^4=16\) and \((m^3)^4=m^{12}\). A power of a power multiplies exponents.` },
      { type: "spr", s: R`If \(\dfrac{k^{9}\cdot k^{-4}}{k^{2}}=k^n\) for all positive values of \(k\), what is the value of \(n\)?`, a: 3, e: R`\(9+(-4)-2=3\).` },
      { type: "mc", s: R`For \(x>0\), which expression is equivalent to \(x^{\frac12}\cdot x^{\frac13}\)?`, c: [R`\(x^{\frac16}\)`, R`\(x^{\frac25}\)`, R`\(x^{\frac56}\)`, R`\(x^{\frac23}\)`], a: 2, e: R`\(\frac12+\frac13=\frac56\).` },
    ],
    () => {
      const e = Array.from({ length: 6 }, () => nz(-4, 7));
      const [m1, q1, z1, m2, q2, z2] = e;
      const left = `(${pw("m", m1)}${pw("q", q1)}${pw("z", z1)})(${pw("m", m2)}${pw("q", q2)}${pw("z", z2)})`;
      const right = (a, b, c) => `${pw("m", a)}${pw("q", b)}${pw("z", c)}` || "1";
      const o = mc(right(m1 + m2, q1 + q2, z1 + z2), [right(m1 * m2, q1 * q2, z1 * z2), right(m1 + m2, q1 * q2, z1 - z2), right(m1 - m2, q1 - q2, z1 + z2)]);
      return { type: "mc", c: o.c, a: o.a, s: `Which expression is equivalent to \\(${left}\\), where \\(m\\), \\(q\\), and \\(z\\) are positive?`,
        e: `Add the exponents for each base: \\(m^{${m1}+${p(m2)}}q^{${q1}+${p(q2)}}z^{${z1}+${p(z2)}}=${right(m1 + m2, q1 + q2, z1 + z2)}\\). Multiplying the exponents is the common mistake.` };
    });

  // 1 ── Interpreting linear models
  topic("p1", "Interpreting linear models",
    "In w(t) = 300 − 4t you picked 296. The rate is the coefficient of t (4 mL per second); 300 is the starting amount.",
    "In y = b + mx, m is the change per 1 unit of x (the rate), and b is the value when x = 0 (the start). A minus sign means it decreases by m each unit.",
    [
      { type: "mc", s: R`\(C(h)=45+18h\)<br><br>The function \(C\) gives the total cost, in dollars, of renting a kayak for \(h\) hours. What is the best interpretation of 18?`,
        c: [R`The total cost of renting for 1 hour`, R`The additional cost for each hour of rental`, R`The fixed fee charged for any rental`, R`The number of hours rented`], a: 1, e: R`18 is multiplied by \(h\), so it is the cost per hour.` },
      { type: "spr", s: R`\(P(d)=2{,}400-150d\)<br><br>The function \(P\) models the number of pages left to read in a book \(d\) days after starting. According to the model, how many pages are read each day?`, a: 150, e: R`The coefficient of \(d\) is \(-150\): the pages left drop by 150 each day.` },
      { type: "mc", s: R`\(T(m)=72-3.5m\)<br><br>The function \(T\) gives the temperature of a cup of coffee, in °F above room temperature, \(m\) minutes after it is poured. What is the best interpretation of 72?`,
        c: [R`The temperature decrease each minute`, R`The temperature after 72 minutes`, R`The temperature, in °F above room temperature, when the coffee is poured`, R`The number of minutes until the coffee reaches room temperature`], a: 2, e: R`At \(m=0\), \(T=72\), so 72 is the starting value.` },
      { type: "spr", s: R`A tank is filled at a constant rate. The volume is modeled by \(V(t)=12t+80\), where \(V\) is in gallons and \(t\) is in minutes. By how many gallons does the volume increase every 5 minutes?`, a: 60, e: R`12 gallons per minute, so \(12\times5=60\).` },
    ],
    () => {
      const start = ri(8, 60) * 10, rate = ri(2, 15), ctx = pick([
        ["liquid in a container", "milliliters", "draining from the container each second", "seconds", "t"],
        ["water in a pool", "gallons", "draining from the pool each minute", "minutes", "t"],
        ["fuel in a generator", "liters", "used each hour", "hours", "h"],
      ]);
      const [thing, unit, ask, tunit, v] = ctx;
      const o = mc(rate, [start, start - rate, start + rate]);
      return { type: "mc", c: o.c.map(s => s.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1{,}")), a: o.a,
        s: `\\(f(${v})=${start}-${rate}${v}\\)<br><br>The function \\(f\\) models the amount of ${thing}, in ${unit}, ${v} ${tunit} after it begins. According to the model, what is the predicted amount, in ${unit}, ${ask}?`,
        e: `The coefficient of \\(${v}\\) is \\(-${rate}\\): the amount drops by ${rate} ${unit} each unit of time. ${start} is the starting amount, not the rate.` };
    });

  // 2 ── Interpreting exponential models
  topic("p2", "Interpreting exponential models",
    "In f(x) = 3,000(0.75)^x you chose 'population 8 years after 2008.' The number in front is the value at x = 0: the initial amount.",
    "In f(x) = a(b)^x: a is the initial value (x = 0). b > 1 means growth of (b − 1)·100% per period; b < 1 means decay of (1 − b)·100% per period.",
    [
      { type: "mc", s: R`\(f(x)=5{,}200(1.06)^x\)<br><br>The function estimates the number of members of a club \(x\) years after 2015. What is the best interpretation of 1.06?`,
        c: [R`The club had 1.06 members in 2015.`, R`The number of members increases by 6% each year.`, R`The number of members increases by 106% each year.`, R`The number of members increases by 0.06 each year.`], a: 1, e: R`\(1.06=1+0.06\): a 6% increase per year.` },
      { type: "spr", s: R`\(V(t)=18{,}000(0.85)^t\)<br><br>The function estimates the value of a car, in dollars, \(t\) years after purchase. By what percent does the value decrease each year? (Enter without the % sign.)`, a: 15, e: R`\(1-0.85=0.15\), a 15% decrease each year.` },
      { type: "mc", s: R`\(P(x)=640(0.5)^{x}\)<br><br>The function estimates the mass, in grams, of a substance \(x\) hours after an experiment began. What is the best interpretation of 640?`,
        c: [R`The mass lost each hour`, R`The mass, in grams, when the experiment began`, R`The mass after 0.5 hours`, R`The number of hours for half the mass to decay`], a: 1, e: R`At \(x=0\), \(P=640(1)=640\): the initial mass.` },
      { type: "spr", s: R`\(f(x)=200(3)^{x}\)<br><br>What is the value of \(f(0)\)?`, a: 200, e: R`Anything to the power 0 is 1, so \(f(0)=200\).` },
    ],
    () => {
      const a = ri(10, 90) * 100, decay = Math.random() < 0.5, p = pick([5, 10, 12, 15, 20, 25, 30, 40]);
      const b = decay ? (100 - p) / 100 : (100 + p) / 100, yr = ri(2005, 2020), lim = ri(5, 10);
      const askA = Math.random() < 0.5;
      const word = decay ? "decrease" : "increase";
      if (askA) {
        const o = mcText(`The estimated initial population in ${yr}`, [`The estimated population ${lim} years after ${yr}`, `The estimated percent ${word} in the population each year after ${yr}`, `The estimated percent ${word} in the population every ${lim} years after ${yr}`]);
        return { type: "mc", c: o.c, a: o.a, s: `\\(f(x)=${fmt(a)}(${b})^x\\)<br><br>The function estimates a species' population \\(x\\) years after ${yr}, where \\(x\\le${lim}\\). Which is the best interpretation of ${a.toLocaleString("en-US")} in this context?`,
          e: `\\(f(0)=${fmt(a)}(${b})^0=${fmt(a)}\\), so ${a.toLocaleString("en-US")} is the population in ${yr}, the starting value.` };
      }
      return { type: "spr", a: p, s: `\\(f(x)=${fmt(a)}(${b})^x\\)<br><br>The function estimates a species' population \\(x\\) years after ${yr}. By what percent does the population ${word} each year? (Enter without the % sign.)`,
        e: `${decay ? `\\(1-${b}=${p / 100}\\)` : `\\(${b}-1=${p / 100}\\)`}, which is ${p}% per year.` };
    });

  // 3 ── Comparing distributions: median & standard deviation
  topic("p3", "Comparing data sets: median & standard deviation",
    "Both dot plots were symmetric around 13, so the medians match. But set B had more points at the extremes (10 and 16), so its standard deviation is larger.",
    "Median: the middle value. A symmetric data set has mean = median = center. Standard deviation measures spread from the mean: more values far from center means a larger SD. Same center doesn't mean same SD.",
    [
      { type: "mc", s: R`Data set A: 4, 6, 8, 10, 12<br>Data set B: 4, 4, 8, 12, 12<br><br>Which statement is true?`,
        c: [R`The medians are equal, and set B has the greater standard deviation.`, R`The medians are equal, and the standard deviations are equal.`, R`The medians are different, and set A has the greater standard deviation.`, R`The medians are equal, and set A has the greater standard deviation.`], a: 0, e: R`Both medians are 8. Set B's values sit farther from 8 (two 4s and two 12s), so its SD is greater.` },
      { type: "mc", s: R`Data set P: 20, 20, 20, 20, 20<br>Data set Q: 18, 19, 20, 21, 22<br><br>Which statement must be true?`,
        c: [R`The mean of P is greater.`, R`The standard deviation of P is greater.`, R`The standard deviation of Q is greater.`, R`The medians are different.`], a: 2, e: R`P has no spread (SD = 0). Q's values vary, so its SD is greater. Both have mean and median 20.` },
      { type: "mc", s: R`Each value in a data set is increased by 7. Which statement is true about the new data set?`,
        c: [R`The mean and standard deviation both increase by 7.`, R`The mean increases by 7, and the standard deviation is unchanged.`, R`The mean is unchanged, and the standard deviation increases by 7.`, R`Both stay the same.`], a: 1, e: R`Shifting every value moves the center but not the spread.` },
      { type: "spr", s: R`Data set: 3, 5, 5, 9, 11, 14. What is the median?`, a: 7, e: R`Even count: the average of the 3rd and 4th values, \((5+9)/2=7\).` },
    ],
    () => {
      const c = ri(10, 30), d = ri(1, 3), n1 = ri(1, 2), extra = ri(1, 3);
      const A = [c - 2 * d, ...Array(n1).fill(c - d), ...Array(3).fill(c), ...Array(n1).fill(c + d), c + 2 * d];
      const B = [...Array(1 + extra).fill(c - 2 * d), ...Array(n1).fill(c - d), c, ...Array(n1).fill(c + d), ...Array(1 + extra).fill(c + 2 * d)];
      const o = mcText("I only", ["II only", "I and II", "Neither I nor II"]);
      return { type: "mc", c: o.c, a: o.a, s: `Data set A: ${A.join(", ")}<br>Data set B: ${B.join(", ")}<br><br>Which of the following statements must be true?<br>I. The median of data set A is equal to the median of data set B.<br>II. The standard deviation of data set A is equal to the standard deviation of data set B.`,
        e: `Both sets are symmetric around ${c}, so both medians are ${c} (I is true). Set B has more values at the extremes (${c - 2 * d} and ${c + 2 * d}) and fewer at the center, so its standard deviation is larger (II is false).` };
    });

  // 4 ── Systems: solve for an expression
  topic("p4", "Systems: add/subtract to find an expression",
    "You entered 2.999 instead of 3. When the answer is exact, enter the exact value. Adding the two equations eliminates 8x right away, so there's no need to approximate.",
    "Look for a combination of the equations (add, subtract, or scale) that cancels a term or directly builds the expression being asked for. Treat chunks like 8x and 7y as single variables. Enter exact answers (3, not 2.999).",
    [
      { type: "spr", s: R`\(3(2x)+5(3y)=36\)<br>\(-3(2x)+5(3y)=24\)<br><br>The solution to the given system is \((x,y)\). What is the value of \(2x+3y\)?`, a: 8,
        e: R`Adding gives \(10(3y)=60\), so \(3y=6\). Then \(3(2x)=36-30=6\), so \(2x=2\). \(2x+3y=8\).` },
      { type: "spr", s: R`\(x+y=11\)<br>\(x-y=5\)<br><br>What is the value of \(x^2-y^2\)?`, a: 55, e: R`\(x^2-y^2=(x+y)(x-y)=11\cdot5=55\). No need to find \(x\) and \(y\).` },
      { type: "spr", s: R`\(4a+3b=26\)<br>\(2a+5b=20\)<br><br>What is the value of \(a+b\)?`, a: 7,
        e: R`Double the second: \(4a+10b=40\). Subtract the first: \(7b=14\), so \(b=2\) and \(a=5\). \(a+b=7\).` },
      { type: "spr", s: R`\(5p-2q=17\)<br>\(3p+2q=15\)<br><br>What is the value of \(p\)?`, a: 4, e: R`Adding eliminates \(q\): \(8p=32\), so \(p=4\).` },
    ],
    () => {
      const a = ri(2, 9), b = ri(2, 9); let A, B; do { A = nz(-3, 4); B = nz(-3, 4); } while (A === 0 || B === 0);
      const k = ri(2, 4), m = ri(2, 5);
      // unknowns u = a*x, v = b*y with chosen integer values
      const u = nz(-6, 6), v = nz(-6, 6);
      const c1 = k * u + m * v, c2 = -k * u + m * v;
      return { type: "spr", a: u + v,
        s: `\\(${k}(${a}x)+${m}(${b}y)=${c1}\\)<br>\\(-${k}(${a}x)+${m}(${b}y)=${c2}\\)<br><br>The solution to the given system of equations is \\((x, y)\\). What is the value of \\(${a}x+${b}y\\)?`,
        e: `Add the equations: \\(${2 * m}(${b}y)=${c1 + c2}\\), so \\(${b}y=${v}\\). Substitute: \\(${k}(${a}x)${sg(m * v)}=${c1}\\), so \\(${a}x=${u}\\). Then \\(${a}x+${b}y=${u + v}\\). Enter it exactly.` };
    });

  // 5 ── Similar right triangles in the coordinate plane
  topic("p5", "Triangles in the coordinate plane",
    "Both triangles were right isosceles (legs parallel to the axes and equal length), so every acute angle is 45°. You needed ∠N = 45° = 90° − t.",
    "Find side lengths from coordinates (horizontal = Δx, vertical = Δy). Equal legs on a right angle mean 45-45-90. Similar triangles have equal angles no matter the size (k doesn't change angles). Acute angles in a right triangle add to 90°.",
    [
      { type: "mc", s: R`Triangle \(ABC\) has vertices \(A(1,1)\), \(B(1,4)\), and \(C(4,1)\). What is the measure of angle \(B\)?`, c: [R`\(30°\)`, R`\(45°\)`, R`\(60°\)`, R`\(90°\)`], a: 1, e: R`\(AB=3\) (vertical) and \(AC=3\) (horizontal), so the triangle is right isosceles at \(A\). Angle \(B=45°\).` },
      { type: "mc", s: R`Triangle \(DEF\) has vertices \(D(0,0)\), \(E(0,6)\), \(F(8,0)\). Triangle \(GHJ\) has vertices \(G(0,0)\), \(H(0,6k)\), \(J(8k,0)\), where \(k>1\). If angle \(E\) measures \(w°\), what is the measure of angle \(J\)?`,
        c: [R`\(w°\)`, R`\((90-w)°\)`, R`\((90-kw)°\)`, R`\((180-w)°\)`], a: 1, e: R`The triangles are similar (scale factor \(k\)), so angle \(J\) = angle \(F\). In right triangle \(DEF\), \(F=90-w\).` },
      { type: "spr", s: R`In right triangle \(PQR\), angle \(P\) is the right angle, and angle \(Q\) measures \(37°\). What is the measure, in degrees, of angle \(R\)?`, a: 53, e: R`The acute angles add to \(90°\): \(90-37=53\).` },
      { type: "spr", s: R`Points \(A(2,3)\), \(B(2,9)\), and \(C(10,3)\) form a triangle. What is the length of \(BC\)?`, a: 10, e: R`Legs 6 and 8, so \(BC=\sqrt{36+64}=10\).` },
    ],
    () => {
      const x0 = ri(-3, 6), y0 = ri(-3, 6), s = ri(2, 6);
      const o = mcText(`(90-t)^\\circ`, [`(90-(t-k))^\\circ`, `(90-(t+k))^\\circ`, `(90+k)^\\circ`]);
      return { type: "mc", c: o.c.map(c => `\\(${c}\\)`), a: o.a,
        s: `Triangles \\(PQR\\) and \\(LMN\\) are graphed in the xy-plane. Triangle \\(PQR\\) has vertices \\(P(${x0},${y0})\\), \\(Q(${x0},${y0 + s})\\), and \\(R(${x0 + s},${y0})\\). Triangle \\(LMN\\) has vertices \\(L(${x0},${y0})\\), \\(M(${x0},${y0 + s}+k)\\), and \\(N(${x0 + s}+k,${y0})\\), where \\(k\\) is a positive constant. If the measure of \\(\\angle Q\\) is \\(t°\\), what is the measure of \\(\\angle N\\)?`,
        e: `Both triangles have equal vertical and horizontal legs (${s} and ${s}+k), so both are right isosceles: every acute angle is 45°. So \\(t=45\\), and \\(\\angle N=45°=(90-t)°\\).` };
    });

  // 6 ── Inequality word problems with two constraints
  topic("p6", "Inequality word problems (two constraints)",
    "You answered 49; the answer was 182. To maximize large candles, use the minimum total (s = 200 − ℓ) inside the budget inequality, then solve for ℓ.",
    "Write one inequality per condition (budget ≤, minimum count ≥). To maximize one item, make the other as small as allowed (substitute the boundary), solve, and round down to a whole number.",
    [
      { type: "spr", s: R`A store owner has $1,500 to buy at least 100 shirts. Plain shirts cost $9 each and printed shirts cost $16 each. What is the maximum number of printed shirts the owner can buy?`, a: 85,
        e: R`Let \(p\) be printed. Buy the minimum plain: \(100-p\). Then \(9(100-p)+16p\le1500\Rightarrow900+7p\le1500\Rightarrow p\le85.7\). Max \(=85\).` },
      { type: "spr", s: R`A school spends at most $600 on at least 50 books. Paperbacks cost $8 and hardcovers cost $15. What is the maximum number of hardcovers it can buy?`, a: 28,
        e: R`\(8(50-h)+15h\le600\Rightarrow400+7h\le600\Rightarrow h\le28.57\). Max \(=28\).` },
      { type: "mc", s: R`A caterer must make at least 40 meals and spend no more than $500. Chicken meals cost $11 and vegetarian meals cost $9. Which system represents this situation, where \(c\) is chicken and \(v\) is vegetarian?`,
        c: [R`\(c+v\le40,\ 11c+9v\ge500\)`, R`\(c+v\ge40,\ 11c+9v\le500\)`, R`\(c+v\ge500,\ 11c+9v\le40\)`, R`\(11c+v\ge40,\ c+9v\le500\)`], a: 1, e: R`“At least 40 meals” is \(c+v\ge40\); “no more than $500” is \(11c+9v\le500\).` },
    ],
    () => {
      const n = ri(10, 30) * 10, lo = pick([2.5, 3.5, 4.9, 6, 7.25]), hi = +(lo + pick([3, 4.5, 6.7, 8])).toFixed(2);
      const ans = ri(Math.ceil(n * 0.2), Math.floor(n * 0.8));
      const budget = Math.ceil((lo * n + (hi - lo) * ans) / 50) * 50;
      const max = Math.floor((budget - lo * n) / (hi - lo) + 1e-9);
      if (max < 1 || max > n) return null;
      const item = pick(["candles", "notebooks", "plants", "T-shirts"]);
      return { type: "spr", a: max,
        s: `A small business owner budgets $${budget.toLocaleString("en-US")} to purchase ${item}. The owner must purchase a minimum of ${n} ${item} to keep a discount. If small ${item} cost $${lo.toFixed(2)} each and large ${item} cost $${hi.toFixed(2)} each, what is the maximum number of large ${item} the owner can purchase while staying within the budget and keeping the discount?`,
        e: `Let \\(\\ell\\) be large. Buy the fewest small: \\(${n}-\\ell\\). Then \\(${lo}(${n}-\\ell)+${hi}\\ell\\le${budget}\\), so \\(${+(lo * n).toFixed(2)}+${+(hi - lo).toFixed(2)}\\ell\\le${budget}\\) and \\(\\ell\\le${((budget - lo * n) / (hi - lo)).toFixed(2)}\\). Round down: ${max}.` };
    });

  // 7 ── Inscribed squares & circles
  topic("p7", "Squares and circles (inscribed)",
    "You picked 20√2 (the diagonal). For a square inscribed in a circle, the diagonal equals the diameter, and side = diagonal ÷ √2.",
    "Square inscribed in a circle: diagonal = diameter = 2r, side = 2r/√2 = r√2. Circle inscribed in a square: diameter = side. In a 45-45-90 triangle, hypotenuse = leg·√2.",
    [
      { type: "spr", s: R`A square is inscribed in a circle with radius \(5\sqrt2\). What is the side length of the square?`, a: 10, e: R`Diameter \(=10\sqrt2\) = diagonal, so side \(=10\sqrt2/\sqrt2=10\).` },
      { type: "spr", s: R`A circle is inscribed in a square with side length 14. The area of the circle is \(k\pi\). What is \(k\)?`, a: 49, e: R`Diameter = side = 14, so \(r=7\) and area \(=49\pi\).` },
      { type: "mc", s: R`A square has a diagonal of length 12. What is its area?`, c: [R`\(36\)`, R`\(72\)`, R`\(144\)`, R`\(72\sqrt2\)`], a: 1, e: R`Side \(=12/\sqrt2=6\sqrt2\), so area \(=72\). (Shortcut: area \(=d^2/2\).)` },
      { type: "spr", s: R`A square with side length 8 is inscribed in a circle. The area of the circle is \(k\pi\). What is \(k\)?`, a: 32, e: R`Diagonal \(=8\sqrt2\) = diameter, so \(r=4\sqrt2\) and \(r^2=32\).` },
    ],
    () => {
      const s = ri(3, 30), kind = ri(0, 2);
      if (kind === 0) {
        const o = mcText(`${s}`, [`\\frac{${s}\\sqrt2}{2}`, `${s}\\sqrt2`, `${2 * s}`]);
        return { type: "mc", c: o.c.map(c => `\\(${c}\\)`), a: o.a,
          s: `A square is inscribed in a circle. The radius of the circle is \\(\\frac{${s}\\sqrt2}{2}\\) inches. What is the side length, in inches, of the square?`,
          e: `Diameter \\(=${s}\\sqrt2\\) = the square's diagonal. Side \\(=\\frac{${s}\\sqrt2}{\\sqrt2}=${s}\\).` };
      }
      if (kind === 1) return { type: "spr", a: s * s / 2, s: `A square has a diagonal of length ${s}. What is the area of the square?`,
        e: `Side \\(=${s}/\\sqrt2\\), so area \\(=${s}^2/2=${s * s / 2}\\).` };
      return { type: "spr", a: s * s / 2, s: `A square with side length ${s} is inscribed in a circle. The area of the circle is \\(k\\pi\\). What is the value of \\(k\\)?`,
        e: `Diagonal \\(=${s}\\sqrt2\\) = diameter, so \\(r^2=\\left(\\frac{${s}\\sqrt2}{2}\\right)^2=${s * s / 2}\\).` };
    });

  // 8 ── Discriminant with a parameter
  topic("p8", "Discriminant: no / one / two solutions",
    "You answered 49; the answer was 50. Discriminant < 0 gives k > 49 (strictly), so the least integer is 50. Watch strict vs. non-strict inequalities.",
    "Rewrite as ax² + bx + c = 0. b² − 4ac < 0: no real solutions; = 0: exactly one; > 0: two. With a parameter, solve the inequality, then pick the right integer (strict ⇒ step past the boundary).",
    [
      { type: "spr", s: R`\(x(kx-20)=-25\)<br><br>In the given equation, \(k\) is an integer constant. If the equation has no real solution, what is the least possible value of \(k\)?`, a: 5, e: R`\(kx^2-20x+25=0\). Need \(400-100k<0\Rightarrow k>4\). Least integer: 5.` },
      { type: "spr", s: R`\(3x^2-12x+c=0\)<br><br>For what value of \(c\) does the equation have exactly one real solution?`, a: 12, e: R`\(144-12c=0\Rightarrow c=12\).` },
      { type: "spr", s: R`\(x^2+bx+36=0\)<br><br>If \(b\) is a positive integer and the equation has no real solutions, what is the greatest possible value of \(b\)?`, a: 11, e: R`\(b^2-144<0\Rightarrow b<12\). Greatest integer: 11.` },
      { type: "mc", s: R`How many real solutions does \(2x^2-5x+4=0\) have?`, c: [R`Zero`, R`Exactly one`, R`Exactly two`, R`Infinitely many`], a: 0, e: R`\(25-32=-7<0\): no real solutions.` },
    ],
    () => {
      const b = pick([8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 60]), c = pick([1, 2, 4, 5, 9, 16]);
      const bound = (b * b) / (4 * c);
      const least = Number.isInteger(bound) ? bound + 1 : Math.ceil(bound);
      return { type: "spr", a: least, s: `\\(x(kx-${b})=-${c}\\)<br><br>In the given equation, \\(k\\) is an integer constant. If the equation has no real solution, what is the least possible value of \\(k\\)?`,
        e: `\\(kx^2-${b}x+${c}=0\\). No real solution: \\(${b}^2-4k(${c})<0\\Rightarrow ${b * b}<${4 * c}k\\Rightarrow k>${+bound.toFixed(3)}\\). The least integer${Number.isInteger(bound) ? " strictly greater" : ""} is ${least}.` };
    });

  // 9 ── Building a linear model from a word problem
  topic("p9", "Building linear functions from word problems",
    "You chose 60x + 220, which charges the $220 fee on top of all x hours. The fee covers the first 2 hours, so f(x) = 220 + 60(x − 2) = 60x + 100.",
    "Translate piece by piece: fixed amount + rate × (the units the rate applies to). If the flat fee covers the first n units, the rate only applies to (x − n). Find the rate from the given data point, then simplify. Check by plugging in the given point.",
    [
      { type: "mc", s: R`A plumber charges $150 for the first hour plus a fixed rate for each additional hour. A 4-hour job costs $390. Which function gives the cost, in dollars, of an \(x\)-hour job, where \(x\ge1\)?`,
        c: [R`\(f(x)=80x+150\)`, R`\(f(x)=80x+70\)`, R`\(f(x)=60x+150\)`, R`\(f(x)=97.5x\)`], a: 1, e: R`\(150+r(4-1)=390\Rightarrow r=80\). \(f(x)=150+80(x-1)=80x+70\). Check: \(80(4)+70=390\) ✓.` },
      { type: "spr", s: R`A gym charges a $60 sign-up fee plus a monthly fee. The total for 7 months is $375. What is the monthly fee, in dollars?`, a: 45, e: R`\(60+7m=375\Rightarrow m=45\).` },
      { type: "mc", s: R`A phone plan costs $30 per month and includes 2 GB of data. Each additional GB costs $12. Which function gives the monthly cost for \(g\) GB of data, where \(g\ge2\)?`,
        c: [R`\(C(g)=12g+30\)`, R`\(C(g)=12g+6\)`, R`\(C(g)=30g+12\)`, R`\(C(g)=12g-24\)`], a: 1, e: R`\(30+12(g-2)=12g+6\).` },
    ],
    () => {
      const n = ri(1, 3), fee = ri(8, 40) * 10, r = ri(3, 12) * 10, x = n + ri(2, 5), total = fee + r * (x - n);
      const right = `${r}x+${fee - r * n}`;
      const o = mc(`f(x)=${right}`.replace("+-", "-"), [`f(x)=${r}x+${fee}`, `f(x)=${Math.round(total / x)}x`, `f(x)=${r + 20}x+${fee}`]);
      const job = pick(["window repair specialist", "electrician", "tutor", "bike repair shop"]);
      return { type: "mc", c: o.c, a: o.a,
        s: `A ${job} charges $${fee} for the first ${n === 1 ? "hour" : n + " hours"} of work plus an hourly fee for each additional hour. The total cost for ${x} hours of work is $${total}. Which function \\(f\\) gives the total cost, in dollars, for \\(x\\) hours of work, where \\(x\\ge${n}\\)?`,
        e: `\\(${fee}+r(${x}-${n})=${total}\\Rightarrow r=${r}\\). So \\(f(x)=${fee}+${r}(x-${n})=${right.replace("+-", "-")}\\). Check: \\(f(${x})=${total}\\) ✓.` };
    });

  function make(keys, perTopic) {
    const out = [];
    for (const t of T.filter(t => keys.includes(t.key))) {
      const fixed = t.qs.map(q => ({ ...q, key: t.key, src: "priority" }));
      const gen = []; let guard = 0;
      while (fixed.length + gen.length < perTopic && guard++ < perTopic * 20) {
        const q = t.gen(); if (q) gen.push({ ...q, key: t.key, src: "priority", gen: 1 });
      }
      out.push(...fixed, ...gen);
    }
    return out;
  }
  return { topics: T, make };
})();
