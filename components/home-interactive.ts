/* eslint-disable @typescript-eslint/ban-ts-comment */
// Ported from the static homepage script plus app.js. Kept close to the original.
// @ts-nocheck

import demo from "@/content/demo/takoyaki-booth.json";

const MATTETE_HIGHLIGHT_START = 9.95;
const CLIP_END = demo.audio.clipEnd ?? 10.4;

function buildDemo() {
  const highlights = demo.highlights;
  const nuances = demo.nuances.filter((item) => !item.optional);
  const dict = {};
  const furigana = {};
  const phrases = {};

  const scene = demo.lines.map((line) => {
    const words = line.tokens.map((token, tokenIndex) => {
      const highlight = highlights.find(
        (item) => item.line === line.index && item.tokenStart === tokenIndex,
      );
      const nuance = nuances.find(
        (item) =>
          item.line === line.index &&
          tokenIndex >= item.tokenStart &&
          tokenIndex <= item.tokenEnd,
      );
      const start =
        token.surface === "待ってて" ? MATTETE_HIGHLIGHT_START : token.start;
      return {
        surface: token.surface,
        gloss: highlight?.gloss || nuance?.label || "",
        note: nuance?.note || "",
        reading: token.reading || token.surface,
        start,
        end: token.end,
        charStart: token.charStart,
        charEnd: token.charEnd,
        highlight: Boolean(highlight),
        tip: highlight ? `${highlight.reading} — ${highlight.gloss}` : "",
      };
    });

    words.forEach((word) => {
      if (word.reading && word.reading !== word.surface && !furigana[word.surface]) {
        furigana[word.surface] = [[word.surface, word.reading]];
      }
      if (!dict[word.surface]) {
        dict[word.surface] = {
          reading: word.reading,
          lemma: word.surface,
          romaji: "",
          kanji: [],
          definitions: word.gloss ? [[word.gloss, "—", word.note]] : [],
        };
      }
    });

    nuances
      .filter((item) => item.line === line.index && item.tokenEnd > item.tokenStart)
      .forEach((item) => {
        const span = words.slice(item.tokenStart, item.tokenEnd + 1);
        const surface = span.map((word) => word.surface).join("");
        phrases[surface] = {
          reading: span.map((word) => word.reading).join(""),
          lemma: surface,
          romaji: "",
          gloss: item.label,
          note: item.note,
          definitions: [[item.label, "—", item.note]],
        };
      });

    return {
      speaker: line.speaker,
      side: line.speaker === "Mika" ? "trail" : "lead",
      japanese: line.japanese,
      english: line.english,
      start: line.start,
      end: line.end,
      words: words.map((word) => [word.surface, word.gloss, word.note]),
      tokens: words,
      nuances: nuances.filter((item) => item.line === line.index),
    };
  });

  return { scene, dict, furigana, phrases };
}

export function initHome() {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const { scene, dict, furigana, phrases } = buildDemo();

        const stage = document.getElementById("stage");
        const chat = document.getElementById("chat");
        const reading = document.getElementById("reading");
        const sentenceEl = document.getElementById("sentence");
        const sentenceEn = document.getElementById("sentence-en");
        const glossMeaning = document.getElementById("gloss-meaning");
        const glossNote = document.getElementById("gloss-note");
        const wordPanel = document.getElementById("word");
        const tokenTip = document.getElementById("token-tip");
        const entryRead = document.getElementById("entry-read");
        const entryLemma = document.getElementById("entry-lemma");
        const entryRoma = document.getElementById("entry-roma");
        const kanjiBlock = document.getElementById("kanji-block");
        const kanjiEl = document.getElementById("kanji");
        const lexEl = document.getElementById("lex");
        const lexRule = document.getElementById("lex-rule");
        const defsBlock = document.getElementById("defs-block");
        const defsEl = document.getElementById("defs");
        const playButton = document.getElementById("play-demo");
        let openLine = -1;
        let scrubbing = false;
        let anchorIndex = -1;
        let playing = false;
        let raf = 0;

        const audio = new Audio("/demo/takoyaki-booth.m4a");
        audio.preload = "auto";

        function pieces(line) {
          const out = [];
          let cursor = 0;
          line.tokens.forEach((token, index) => {
            if (token.charStart > cursor) {
              out.push({ text: line.japanese.slice(cursor, token.charStart) });
            }
            out.push({ text: token.surface, index });
            cursor = token.charEnd;
          });
          if (cursor < line.japanese.length) out.push({ text: line.japanese.slice(cursor) });
          return out;
        }

        function appendFurigana(word, surface) {
          (furigana[surface] || [surface]).forEach((part) => {
            if (typeof part === "string") {
              word.append(part);
              return;
            }
            const ruby = document.createElement("ruby");
            const rt = document.createElement("rt");
            rt.textContent = part[1];
            ruby.append(part[0], rt);
            word.append(ruby);
          });
        }

        function renderChat() {
          chat.replaceChildren();
          scene.forEach((line, index) => {
            const turn = document.createElement("div");
            turn.className = "turn " + line.side;
            const row = document.createElement("button");
            row.type = "button";
            row.className = "line " + line.side + (index === openLine ? " on" : "");
            row.dataset.line = String(index);
            row.setAttribute("aria-pressed", index === openLine ? "true" : "false");
            const who = document.createElement("span");
            who.className = "who";
            who.textContent = line.speaker;
            const shell = document.createElement("span");
            shell.className = "shell";
            const glow = document.createElement("span");
            glow.className = "glow";
            glow.setAttribute("aria-hidden", "true");
            const bubble = document.createElement("span");
            bubble.className = "bubble";
            const text = document.createElement("span");
            pieces(line).forEach((piece) => {
              if (piece.index == null) {
                text.append(piece.text);
                return;
              }
              const token = line.tokens[piece.index];
              const word = document.createElement("span");
              word.className = "w" + (token.highlight ? " vocab" : "");
              word.dataset.index = String(piece.index);
              if (token.tip) word.dataset.tip = token.tip;
              appendFurigana(word, piece.text);
              text.append(word);
            });
            bubble.append(text);
            shell.append(glow, bubble);
            const en = document.createElement("span");
            en.className = "en";
            en.textContent = line.english;
            row.append(who, shell, en);
            row.addEventListener("click", (event) => {
              const vocab = event.target.closest?.(".vocab");
              openLineAt(index);
              if (vocab) {
                const tokenIndex = Number(vocab.dataset.index);
                showSpan(scene[index], tokenIndex, tokenIndex);
              }
            });
            turn.append(row);
            line.nuances.forEach((item) => {
              const callout = document.createElement("button");
              callout.type = "button";
              callout.className = "callout";
              callout.setAttribute("aria-expanded", "false");
              const kicker = document.createElement("span");
              kicker.className = "card-kicker";
              kicker.textContent = "Nuance";
              const label = document.createElement("span");
              label.className = "meaning";
              label.textContent = item.label;
              const note = document.createElement("span");
              note.className = "note";
              note.textContent = item.note;
              note.hidden = true;
              callout.append(kicker, label, note);
              callout.addEventListener("click", () => {
                const open = callout.getAttribute("aria-expanded") === "true";
                callout.setAttribute("aria-expanded", open ? "false" : "true");
                note.hidden = open;
                syncPush();
              });
              turn.append(callout);
            });
            chat.append(turn);
          });
        }

        function fillReading(gloss, note, entry, options = {}) {
          const showDefinitions = options.definitions !== false && entry.definitions?.length;
          tokenTip.hidden = true;
          wordPanel.hidden = false;
          glossMeaning.textContent = gloss;
          glossNote.textContent = note;
          glossNote.hidden = !note;
          entryRead.textContent = entry.reading;
          entryLemma.textContent = entry.lemma;
          entryRoma.textContent = entry.romaji;
          entryRoma.hidden = !entry.romaji;
          kanjiEl.replaceChildren();
          kanjiBlock.hidden = entry.kanji.length === 0;
          entry.kanji.forEach((item) => {
            const chip = document.createElement("p");
            chip.className = "kanji-chip";
            const mark = document.createElement("b");
            mark.textContent = item[0];
            const gloss = document.createElement("span");
            gloss.textContent = item[1];
            chip.append(mark, gloss);
            kanjiEl.append(chip);
          });
          defsBlock.hidden = !showDefinitions;
          defsEl.replaceChildren();
          if (showDefinitions) {
            entry.definitions.forEach((def, number) => {
              const item = document.createElement("li");
              const text = document.createElement("p");
              text.className = "def-text";
              text.textContent = (number + 1) + ". " + def[0];
              const meta = document.createElement("p");
              meta.className = "def-meta";
              meta.textContent = def[1] + (def[2] ? "  ·  " + def[2] : "");
              item.append(text, meta);
              defsEl.append(item);
            });
          }
          const lexHidden = kanjiBlock.hidden && defsBlock.hidden;
          lexEl.hidden = lexHidden;
          lexRule.hidden = lexHidden;
        }

        function clauseSpan(anchor, current) {
          const tokens = [...sentenceEl.querySelectorAll(".tok")];
          const clause = tokens[anchor].dataset.clause;
          let end = anchor;
          if (current !== anchor) {
            const step = current > anchor ? 1 : -1;
            for (let i = anchor; i !== current; i += step) {
              const next = i + step;
              if (!tokens[next] || tokens[next].dataset.clause !== clause) break;
              end = next;
            }
          }
          let start = Math.min(anchor, end);
          let stop = Math.max(anchor, end);
          if (stop - start > 2) {
            if (end >= anchor) stop = anchor + 2;
            else start = anchor - 2;
          }
          return [start, stop];
        }

        function paintHighlight() {
          const ons = sentenceEl.querySelectorAll(".tok.on");
          sentenceEl.classList.toggle("multi", ons.length > 1);
        }

        function showSpan(line, anchor, current) {
          const [start, stop] = clauseSpan(anchor, current);
          sentenceEl.querySelectorAll(".tok").forEach((token) => {
            const index = Number(token.dataset.index);
            token.classList.toggle("on", index >= start && index <= stop);
          });
          paintHighlight();
          if (start === stop) {
            const word = line.words[start];
            const entry = dict[word[0]];
            if (!entry) return;
            fillReading(word[1] || entry.reading, word[2], entry, {
              definitions: entry.definitions.length > 0,
            });
            syncPush();
            return;
          }
          const surface = line.words.slice(start, stop + 1).map((word) => word[0]).join("");
          const phrase = phrases[surface];
          if (!phrase) return;
          const kanji = [];
          const seen = new Set();
          for (let i = start; i <= stop; i++) {
            const entry = dict[line.words[i][0]];
            if (!entry) continue;
            entry.kanji.forEach((item) => {
              if (seen.has(item[0])) return;
              seen.add(item[0]);
              kanji.push(item);
            });
          }
          fillReading(phrase.gloss, phrase.note, { ...phrase, kanji }, { definitions: false });
          syncPush();
        }

        const mobileQuery = window.matchMedia("(max-width: 760px)");

        function syncPush(scroll) {
          if (!mobileQuery.matches || !stage.classList.contains("open")) {
            stage.style.height = "";
            reading.style.minHeight = "";
            return;
          }
          // Never shorter than the conversation it covers, so the page below doesn't jump up.
          reading.style.minHeight = (chat.offsetHeight - 8) + "px";
          stage.style.height = (reading.offsetHeight + 8) + "px";
          if (!scroll) return;
          // Bring the panel's top into view with some air, but only if it isn't
          // already sitting comfortably near the top of the screen.
          const top = stage.getBoundingClientRect().top;
          if (top < 0 || top > window.innerHeight * 0.35) {
            window.scrollTo({ top: window.scrollY + top - 16, behavior: reduceMotion ? "auto" : "smooth" });
          }
        }

        // Where the page was before a line opened, so Back returns you to the same spot.
        let returnY = null;

        function closeLine() {
          openLine = -1;
          stage.classList.remove("open");
          reading.setAttribute("aria-hidden", "true");
          chat.querySelectorAll(".line").forEach((row) => {
            row.classList.remove("on");
            row.setAttribute("aria-pressed", "false");
          });
          syncPush();
          if (returnY != null && mobileQuery.matches) {
            window.scrollTo({ top: returnY, behavior: reduceMotion ? "auto" : "smooth" });
          }
          returnY = null;
        }

        function openLineAt(index) {
          if (index === openLine) {
            closeLine();
            return;
          }
          if (openLine < 0) returnY = window.scrollY;
          openLine = index;
          anchorIndex = -1;
          stage.classList.add("used");
          const line = scene[index];
          sentenceEl.replaceChildren();
          let clause = 0;
          pieces(line).forEach((piece) => {
            if (piece.index == null) {
              sentenceEl.append(document.createTextNode(piece.text));
              if (/[、。？]/.test(piece.text)) clause += 1;
            } else {
              const token = document.createElement("span");
              token.className = "tok";
              token.dataset.index = String(piece.index);
              token.dataset.clause = String(clause);
              token.textContent = piece.text;
              sentenceEl.append(token);
            }
            if (/[？。]$/.test(piece.text)) sentenceEl.append(document.createElement("br"));
          });
          sentenceEn.textContent = line.english;
          tokenTip.hidden = false;
          wordPanel.hidden = true;
          stage.classList.add("open");
          reading.setAttribute("aria-hidden", "false");
          chat.querySelectorAll(".line").forEach((row) => {
            const selected = Number(row.dataset.line) === openLine;
            row.classList.toggle("on", selected);
            row.setAttribute("aria-pressed", selected ? "true" : "false");
          });
          syncPush(true);
        }

        function tokenFrom(event) {
          const hit = document.elementFromPoint(event.clientX, event.clientY);
          const token = hit && hit.closest ? hit.closest(".tok") : null;
          if (!token || !sentenceEl.contains(token)) return null;
          return token;
        }

        function atTime(time) {
          let lineIndex = 0;
          for (let i = 0; i < scene.length; i++) {
            if (time >= scene[i].start) lineIndex = i;
          }
          const tokens = scene[lineIndex].tokens;
          let tokenIndex = 0;
          for (let i = 0; i < tokens.length; i++) {
            if (time >= tokens[i].start) tokenIndex = i;
          }
          return { lineIndex, tokenIndex };
        }

        function paintKaraoke(time) {
          const { lineIndex, tokenIndex } = atTime(time);
          chat.querySelectorAll(".line").forEach((row) => {
            const index = Number(row.dataset.line);
            row.classList.toggle("live", playing && index === lineIndex);
          });
          chat.querySelectorAll(".w").forEach((word) => {
            const row = word.closest(".line");
            const index = Number(row?.dataset.line);
            word.classList.toggle(
              "sing",
              playing && index === lineIndex && Number(word.dataset.index) === tokenIndex,
            );
          });
          if (openLine === lineIndex) {
            sentenceEl.querySelectorAll(".tok").forEach((token) => {
              token.classList.toggle("on", playing && Number(token.dataset.index) === tokenIndex);
            });
            paintHighlight();
          }
        }

        function setPlaying(next) {
          playing = next;
          stage.classList.toggle("playing", playing);
          playButton.setAttribute("aria-pressed", playing ? "true" : "false");
          playButton.setAttribute(
            "aria-label",
            playing ? "Pause Takoyaki booth dialogue" : "Play Takoyaki booth dialogue",
          );
          playButton.classList.toggle("on", playing);
          if (!playing) paintKaraoke(audio.currentTime);
        }

        function stopPlayback() {
          playing = false;
          cancelAnimationFrame(raf);
          audio.pause();
          setPlaying(false);
          paintKaraoke(0);
          chat.querySelectorAll(".w.sing, .line.live").forEach((node) => {
            node.classList.remove("sing", "live");
          });
        }

        function tick() {
          if (!playing) return;
          const time = audio.currentTime;
          if (time >= CLIP_END || audio.ended) {
            stopPlayback();
            return;
          }
          paintKaraoke(time);
          raf = requestAnimationFrame(tick);
        }

        playButton.addEventListener("click", () => {
          if (playing) {
            cancelAnimationFrame(raf);
            audio.pause();
            setPlaying(false);
            return;
          }
          if (audio.ended || audio.currentTime >= CLIP_END - 0.05) {
            audio.currentTime = 0;
          }
          const start = audio.play();
          const go = () => {
            setPlaying(true);
            raf = requestAnimationFrame(tick);
          };
          if (start && typeof start.then === "function") start.then(go).catch(() => setPlaying(false));
          else go();
        });
        audio.addEventListener("ended", () => stopPlayback());

        sentenceEl.addEventListener("pointerdown", (event) => {
          const token = tokenFrom(event);
          if (!token) return;
          event.preventDefault();
          window.getSelection().removeAllRanges();
          scrubbing = true;
          anchorIndex = Number(token.dataset.index);
          sentenceEl.setPointerCapture(event.pointerId);
          showSpan(scene[openLine], anchorIndex, anchorIndex);
        });
        sentenceEl.addEventListener("pointermove", (event) => {
          if (!scrubbing || anchorIndex < 0) return;
          const token = tokenFrom(event);
          if (!token) return;
          showSpan(scene[openLine], anchorIndex, Number(token.dataset.index));
        });
        sentenceEl.addEventListener("pointerup", () => { scrubbing = false; });
        sentenceEl.addEventListener("pointercancel", () => { scrubbing = false; });

        const back = document.getElementById("back");
        back.addEventListener("click", () => closeLine());
        mobileQuery.addEventListener("change", () => syncPush(false));

        renderChat();

        const waitlistDialog = document.getElementById("waitlist-dialog");
        document.querySelectorAll("[data-open-waitlist]").forEach((button) => {
          button.addEventListener("click", () => {
            waitlistDialog.showModal();
            waitlistDialog.querySelector("input").focus();
          });
        });
        waitlistDialog.querySelector("[data-close-waitlist]").addEventListener("click", () => {
          waitlistDialog.close();
        });

        // Toolbar: tighten once scrolled, mark the section in view, and show the
        // bar's waitlist button only after the hero's button has scrolled away.
        const bar = document.querySelector(".top");
        const navLinks = [...document.querySelectorAll(".nav a")];
        const targets = navLinks.map((link) => document.querySelector(link.hash));
        const heroStore = document.querySelector(".pitch .store");

        function syncBar() {
          bar.classList.toggle("scrolled", window.scrollY > 8);
          bar.classList.toggle("cta", heroStore.getBoundingClientRect().bottom < bar.offsetHeight);
          const line = bar.offsetHeight + window.innerHeight * 0.25;
          let current = -1;
          targets.forEach((target, i) => {
            if (target.getBoundingClientRect().top <= line) current = i;
          });
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            current = targets.length - 1;
          }
          navLinks.forEach((link, i) => {
            if (i === current) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
          // On phones the links scroll sideways; keep the current one in view.
          const active = navLinks[current];
          const nav = active && active.parentElement;
          if (active && nav.scrollWidth > nav.clientWidth) {
            const left = active.offsetLeft - nav.offsetLeft;
            if (left < nav.scrollLeft || left + active.offsetWidth > nav.scrollLeft + nav.clientWidth) {
              nav.scrollTo({ left: left - 12, behavior: "smooth" });
            }
          }
        }
        window.addEventListener("scroll", syncBar, { passive: true });
        window.addEventListener("resize", syncBar);
        syncBar();

  const form = document.getElementById("waitlist");
  const statusEl = form.querySelector(".form-status");
  const button = form.querySelector("button");

  function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = String(new FormData(form).get("email") || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Need a real email.", "error");
      return;
    }

    button.disabled = true;
    setStatus("Joining…");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setStatus("You’re already on the list.", "ok");
        return;
      }
      if (!res.ok) {
        setStatus(body.error || "Couldn’t join just now. Try again.", "error");
        return;
      }
      form.reset();
      setStatus("You’re on the list. We’ll write when it’s ready.", "ok");
    } catch {
      setStatus("Couldn’t reach the waitlist. Try again.", "error");
    } finally {
      button.disabled = false;
    }
  });

  return () => {
    cancelAnimationFrame(raf);
    audio.pause();
    audio.src = "";
  };
}
