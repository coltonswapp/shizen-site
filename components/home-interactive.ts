/* eslint-disable @typescript-eslint/ban-ts-comment */
// Ported from the static homepage script plus app.js. Kept close to the original.
// @ts-nocheck

import demo from "@/content/demo/takoyaki-booth.json";

const MATTETE_HIGHLIGHT_START = 9.95;
const CLIP_END = demo.audio.clipEnd ?? 10.4;

const dict = {
  "あ": { reading: "あ", lemma: "あ", romaji: "a", kanji: [], gloss: "oh", note: "A little sound of noticing.", definitions: [
    ["oh; ah", "int", "He just caught the smell."],
  ]},
  "たこ焼き": { reading: "たこやき", lemma: "たこ焼き", romaji: "takoyaki", kanji: [["焼", "grill"]], gloss: "takoyaki — grilled octopus balls, a festival-stall classic", note: "", definitions: [
    ["takoyaki; grilled octopus balls", "n", "A festival-stall classic."],
  ]},
  "の": { reading: "の", lemma: "の", romaji: "no", kanji: [], gloss: "'s, of", note: "Links the two nouns: takoyaki's smell, that stall over there.", definitions: [
    ["'s; of", "prt", "Ties たこ焼き to 匂い, and あそこ to 屋台."],
  ]},
  "匂い": { reading: "におい", lemma: "匂い", romaji: "nioi", kanji: [["匂", "smell"]], gloss: "smell", note: "", definitions: [
    ["smell; scent", "n", "Here, the smell of the stall."],
  ]},
  "する": { reading: "する", lemma: "する", romaji: "suru", kanji: [], gloss: "there's (a smell)", note: "匂いがする with the が dropped.", definitions: [
    ["to do; there is (a smell)", "v", "With 匂い: I smell it."],
  ]},
  "ほんと": { reading: "ほんと", lemma: "ほんと", romaji: "honto", kanji: [], gloss: "you're right", note: "Casual 本当.", definitions: [
    ["really; it's true", "adv", "She's agreeing: you're right."],
  ]},
  "だ": { reading: "だ", lemma: "だ", romaji: "da", kanji: [], gloss: "it is", note: "Plain copula. ほんとだ, 屋台だ.", definitions: [
    ["is; it is", "cop", "Ends a casual statement."],
  ]},
  "あそこ": { reading: "あそこ", lemma: "あそこ", romaji: "asoko", kanji: [], gloss: "over there", note: "Away from both of them.", definitions: [
    ["over there", "pn", "The stall they're looking at."],
  ]},
  "屋台": { reading: "やたい", lemma: "屋台", romaji: "yatai", kanji: [["屋", "shop"], ["台", "stand"]], gloss: "food stall / street stand (the kind lining a festival)", note: "", definitions: [
    ["food stall; street stand", "n", "The kind lining a festival."],
  ]},
  "食べたくない": { reading: "たべたくない", lemma: "食べたくない", romaji: "tabetakunai", kanji: [["食", "eat"]], gloss: "don't you want some?", note: "A negative question, used as a casual invitation.", definitions: [
    ["don't want to eat?", "v", "Rising 〜たくない？ means \"want some?\""],
  ]},
  "めっちゃ": { reading: "めっちゃ", lemma: "めっちゃ", romaji: "meccha", kanji: [], gloss: "really", note: "Casual intensifier. めっちゃ食べたい.", definitions: [
    ["really; so", "adv", "Originally Kansai, now everywhere."],
  ]},
  "食べたい": { reading: "たべたい", lemma: "食べたい", romaji: "tabetai", kanji: [["食", "eat"]], gloss: "want to eat", note: "", definitions: [
    ["want to eat", "v", "たい on 食べる."],
  ]},
  "じゃあ": { reading: "じゃあ", lemma: "じゃあ", romaji: "jā", kanji: [], gloss: "alright", note: "Casual では. He's deciding.", definitions: [
    ["well then; alright", "conj", "Moves them into action."],
  ]},
  "僕": { reading: "ぼく", lemma: "僕", romaji: "boku", kanji: [["僕", "I"]], gloss: "I", note: "", definitions: [
    ["I; me", "pn", "Casual, typically masculine."],
  ]},
  "が": { reading: "が", lemma: "が", romaji: "ga", kanji: [], gloss: "I'll (subject)", note: "Marks 僕 as the one who goes.", definitions: [
    ["subject marker", "prt", "僕が買ってくる: I'll go buy some."],
  ]},
  "買ってくる": { reading: "かってくる", lemma: "買ってくる", romaji: "katte kuru", kanji: [["買", "buy"]], gloss: "go buy some", note: "て-form of 買う plus くる: go buy and come back.", definitions: [
    ["to go buy (and come back)", "v", "買ってくる, not just 買う."],
  ]},
  "よ": { reading: "よ", lemma: "よ", romaji: "yo", kanji: [], gloss: "I'm telling you", note: "Marks this as new info for her.", definitions: [
    ["I'm telling you", "prt", "I'll go buy some (you should know)."],
  ]},
  "ここで": { reading: "ここで", lemma: "ここで", romaji: "koko de", kanji: [], gloss: "here", note: "この場所で. Wait at this spot.", definitions: [
    ["here; at this place", "—", "ここで待ってて: wait here."],
  ]},
  "待ってて": { reading: "まってて", lemma: "待ってて", romaji: "mattete", kanji: [["待", "wait"]], gloss: "wait (for me)", note: "待っていて with the い dropped.", definitions: [
    ["wait (here) for me", "v", "Casual 待っていて."],
  ]},
};

const phrases = {
  "たこ焼きの": { reading: "たこやきの", lemma: "たこ焼きの", romaji: "takoyaki no", gloss: "takoyaki's", note: "の links たこ焼き to the smell that follows." },
  "の匂い": { reading: "のにおい", lemma: "の匂い", romaji: "no nioi", gloss: "the smell of", note: "の ties the previous word to 匂い." },
  "匂いする": { reading: "においする", lemma: "匂いする", romaji: "nioi suru", gloss: "I smell…", note: "Textbooks say 匂いがする. In casual speech the が drops." },
  "たこ焼きの匂い": { reading: "たこやきのにおい", lemma: "たこ焼きの匂い", romaji: "takoyaki no nioi", gloss: "the smell of takoyaki", note: "What he caught walking by." },
  "の匂いする": { reading: "のにおいする", lemma: "の匂いする", romaji: "no nioi suru", gloss: "I smell…", note: "の匂い plus する: there's the smell of it." },
  "ほんとだ": { reading: "ほんとだ", lemma: "ほんとだ", romaji: "honto da", gloss: "you're right", note: "ほんと plus だ. She's agreeing." },
  "あそこの": { reading: "あそこの", lemma: "あそこの", romaji: "asoko no", gloss: "that … over there", note: "の points 屋台 to the stall they're looking at." },
  "の屋台": { reading: "のやたい", lemma: "の屋台", romaji: "no yatai", gloss: "the stall of", note: "の ties the previous word to 屋台." },
  "屋台だ": { reading: "やたいだ", lemma: "屋台だ", romaji: "yatai da", gloss: "it's a stall", note: "だ closes it: that's the one." },
  "あそこの屋台": { reading: "あそこのやたい", lemma: "あそこの屋台", romaji: "asoko no yatai", gloss: "that stall over there", note: "The stall they're both looking at." },
  "の屋台だ": { reading: "のやたいだ", lemma: "の屋台だ", romaji: "no yatai da", gloss: "it's that stall", note: "の屋台 plus だ." },
  "めっちゃ食べたい": { reading: "めっちゃたべたい", lemma: "めっちゃ食べたい", romaji: "meccha tabetai", gloss: "I really want some", note: "めっちゃ intensifies 食べたい." },
  "僕が": { reading: "ぼくが", lemma: "僕が", romaji: "boku ga", gloss: "I'll", note: "が marks 僕 as the one who goes." },
  "が買ってくる": { reading: "がかってくる", lemma: "が買ってくる", romaji: "ga katte kuru", gloss: "I'll go buy", note: "が plus 買ってくる: he's the one going." },
  "買ってくるよ": { reading: "かってくるよ", lemma: "買ってくるよ", romaji: "katte kuru yo", gloss: "I'll go get some", note: "よ tells her this; he's not asking." },
  "僕が買ってくる": { reading: "ぼくがかってくる", lemma: "僕が買ってくる", romaji: "boku ga katte kuru", gloss: "I'll go buy some", note: "僕が plus 買ってくる: he goes, then comes back." },
  "が買ってくるよ": { reading: "がかってくるよ", lemma: "が買ってくるよ", romaji: "ga katte kuru yo", gloss: "I'll go get some", note: "買ってくる plus よ: he's telling her." },
  "ここで待ってて": { reading: "ここでまってて", lemma: "ここで待ってて", romaji: "koko de mattete", gloss: "wait here", note: "ここで plus 待ってて. 待ってて is 待っていて with the い dropped." },
};

function buildDemo() {
  const highlights = demo.highlights;
  const furigana = {};

  const scene = demo.lines.map((line) => {
    const words = line.tokens.map((token, tokenIndex) => {
      const highlight = highlights.find(
        (item) => item.line === line.index && item.tokenStart === tokenIndex,
      );
      const entry = dict[token.surface];
      const start =
        token.surface === "待ってて" ? MATTETE_HIGHLIGHT_START : token.start;
      return {
        surface: token.surface,
        gloss: highlight?.gloss || entry?.gloss || "",
        note: entry?.note || "",
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
            chat.append(row);
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
          const hit = document.elementFromPoint(event.clientX, event.clientY) || event.target;
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
          try { sentenceEl.setPointerCapture(event.pointerId); } catch {}
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
