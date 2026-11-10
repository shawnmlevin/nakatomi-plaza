(() => {
  const N = window.NAKATOMI;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- Fill content from eggs.js ----
  $$("[data-party]").forEach((el) => (el.textContent = N.party[el.dataset.party]));
  $$("[data-bakery]").forEach((el) => (el.textContent = N.bakery[el.dataset.bakery]));
  $("#specials").innerHTML = N.bakery.specials.map((s) => `<li>${esc(s)}</li>`).join("");
  $("#shows").innerHTML = N.party.shows
    .map((s) => `<li><span class="when"><strong>${esc(s.day)}</strong><span>${esc(s.time)}</span></span>` +
      `<a class="rsvp" href="${esc(s.url)}" target="_blank" rel="noopener">RSVP</a></li>`)
    .join("");
  $("#jobs").innerHTML = N.careers
    .map((j) => `<article class="card"><p class="floor">${esc(j.where)}</p><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p></article>`)
    .join("");
  $("#vault-hint").textContent = N.vaultHint;

  // ---- Mobile menu ----
  const btn = $(".menu-btn"), nav = $("#nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  // ---- Lobby directory ----
  const screen = $("#screen"), input = $("#dir-q");
  const pub = N.directory.filter((d) => !d.hidden).sort((a, b) => a.name.localeCompare(b.name));
  const floorLabel = (d) => (d.floor === 0 ? "--" : `FL ${d.floor}${d.suite ? " · " + d.suite : ""}`);
  const row = (d, hit) =>
    `<div class="row${hit ? " hit" : ""}"><span>${esc(d.name.toUpperCase())}</span><span>${esc(floorLabel(d))}</span>` +
    `<small>${esc(d.dept.toUpperCase())}${d.note ? " — " + esc(d.note.toUpperCase()) : ""}</small></div>`;

  const header = "NAKATOMI PLAZA BUILDING DIRECTORY\n" + "=".repeat(22) + "\n";
  function render(q) {
    const nq = norm(q);
    if (!nq) { screen.innerHTML = header + pub.map((d) => row(d)).join(""); return; }
    const secret = N.directory.filter((d) => d.hidden && d.keys.some((k) => norm(k) === nq));
    const matches = pub.filter((d) => norm(d.name + d.dept + (d.note || "")).includes(nq) || norm(d.floor) === nq);
    const all = [...secret.map((d) => row(d, true)), ...matches.map((d) => row(d))];
    screen.innerHTML = header + (all.length ? all.join("") : `NO LISTING FOUND FOR "${esc(q.toUpperCase())}".\nPLEASE SEE THE FRONT DESK.`);
  }
  // Typewriter boot, then the full listing
  (function boot() {
    const msg = "INITIALIZING...\n";
    let i = 0;
    const t = setInterval(() => {
      screen.textContent = msg.slice(0, ++i) + "█";
      if (i >= msg.length) { clearInterval(t); setTimeout(() => render(""), 350); }
    }, 45);
  })();
  input.addEventListener("input", () => render(input.value));
  $("#dir-form").addEventListener("submit", (e) => {
    e.preventDefault();
    render(input.value);
    if (norm(input.value) === "vault") revealVault(true);
  });

  // ---- Vault ----
  const vault = $("#vault"), locks = $("#locks");
  locks.innerHTML = '<span class="lock"></span>'.repeat(7);
  function revealVault(scroll) {
    vault.hidden = false;
    if (scroll) vault.scrollIntoView({ behavior: "smooth" });
  }
  $("#vault-link").addEventListener("click", (e) => { e.preventDefault(); revealVault(true); });
  if (location.hash === "#vault") revealVault(false);

  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  async function decrypt(pw) {
    const V = window.VAULT;
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64(V.salt), iterations: V.iterations, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(V.iv) }, key, b64(V.ct));
    return new TextDecoder().decode(pt);
  }
  const normPw = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");

  $("#vault-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget, pw = normPw($("#vault-pw").value);
    if (!pw) return;
    try {
      const msg = await decrypt(pw);
      const ls = $$(".lock", locks);
      for (let i = 0; i < ls.length; i++) { await new Promise((r) => setTimeout(r, 380)); ls[i].classList.add("open"); }
      const out = $("#vault-msg");
      out.textContent = msg;
      out.hidden = false;
      form.hidden = true;
      $("#vault-hint").hidden = true;
      snow();
    } catch {
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
      $("#vault-hint").textContent = "Access denied. " + N.vaultHint;
    }
  });

  function snow() {
    const box = $(".snow");
    for (let i = 0; i < 70; i++) {
      const f = document.createElement("span");
      f.className = "flake";
      f.textContent = "❄";
      f.style.left = Math.random() * 100 + "vw";
      f.style.fontSize = 10 + Math.random() * 16 + "px";
      f.style.animationDuration = 4 + Math.random() * 5 + "s";
      f.style.animationDelay = Math.random() * 3 + "s";
      box.appendChild(f);
      setTimeout(() => f.remove(), 13000);
    }
  }
})();
