/* eslint-disable @typescript-eslint/ban-ts-comment */
// Ported from the static homepage script plus app.js. Kept close to the original.
// @ts-nocheck

export function initHome() {

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const scene = [
          {
            speaker: "Mika", side: "trail",
            japanese: "あれ、まだいたの？何してんの？",
            english: "Huh, you're still here? What are you up to?",
            words: [
              ["あれ", "Huh?", "A surprised \"huh?\", not the あれ that means \"that\"."],
              ["まだ", "still", ""],
              ["いた", "were (here)", "Past of いる, \"to be\" for people."],
              ["の", "softens it into a question", "Casual speech asks with の instead of ですか."],
              ["何", "what", ""],
              ["して", "doing", "て-form of する."],
              ["ん", "る, squashed", "している → してる → してん: る melts into ん before の."],
              ["の", "softens it into a question", ""],
            ],
          },
          {
            speaker: "Kaito", side: "lead",
            japanese: "明日の資料。でも、ぜんぜんわかんない。",
            english: "Tomorrow's materials. But I don't get any of it.",
            words: [
              ["明日", "tomorrow", ""],
              ["の", "'s, for", "Links 明日 to 資料: tomorrow's materials."],
              ["資料", "materials", ""],
              ["でも", "but", ""],
              ["ぜんぜん", "(not) at all", "Pairs with a negative: ぜんぜん〜ない."],
              ["わかんない", "don't get it", "わからない, with ら melted into ん."],
            ],
          },
          {
            speaker: "Mika", side: "trail",
            japanese: "ごめん、私、行かなきゃ。終電、なくなっちゃう。",
            english: "Sorry, I've gotta go. I'll miss the last train.",
            words: [
              ["ごめん", "sorry", "Casual ごめんなさい."],
              ["私", "I", ""],
              ["行か", "go", "行く, in the shape it takes before ない."],
              ["なきゃ", "have to", "なければならない, cut down to its first beat."],
              ["終電", "the last train", ""],
              ["なくなっ", "be gone", "なくなる, \"to disappear\"."],
              ["ちゃう", "and that would be bad", "Short for てしまう."],
            ],
          },
          {
            speaker: "Kaito", side: "lead",
            japanese: "マジか。じゃあ、また明日。",
            english: "Seriously? Okay. See you tomorrow.",
            words: [
              ["マジ", "seriously", "Slang for 本当."],
              ["か", "a surprised question", ""],
              ["じゃあ", "well then", ""],
              ["また", "again", ""],
              ["明日", "tomorrow", ""],
            ],
          },
        ];

        const dict = {
          "あれ": { reading: "あれ", lemma: "あれ", romaji: "are", kanji: [], definitions: [
            ["huh?; eh?", "int", "A little sound of surprise."],
            ["that", "pn", "Something away from both speakers. Not this あれ."],
          ]},
          "まだ": { reading: "まだ", lemma: "まだ", romaji: "mada", kanji: [], definitions: [
            ["still; not yet", "adv", "The state hasn't changed."],
          ]},
          "いた": { reading: "いる", lemma: "いる", romaji: "iru", kanji: [], definitions: [
            ["to be; to stay", "v", "For people and animals. いた is the plain past."],
          ]},
          "の": { reading: "の", lemma: "の", romaji: "no", kanji: [], definitions: [
            ["soft question", "prt", "Casual speech asks with の instead of ですか."],
            ["'s; of", "prt", "Links two nouns."],
          ]},
          "何": { reading: "なに", lemma: "何", romaji: "nani", kanji: [["何", "what"]], definitions: [
            ["what", "pn", "Often なん before の, as in 何してんの."],
          ]},
          "して": { reading: "する", lemma: "する", romaji: "suru", kanji: [], definitions: [
            ["to do", "v", "して is the て-form."],
          ]},
          "ん": { reading: "ん", lemma: "ん", romaji: "n", kanji: [], definitions: [
            ["る, squashed", "—", "している → してる → してん before の."],
          ]},
          "明日": { reading: "あした", lemma: "明日", romaji: "ashita", kanji: [["明", "bright"], ["日", "day"]], definitions: [
            ["tomorrow", "n", "あした in casual speech. Also read あす."],
          ]},
          "資料": { reading: "しりょう", lemma: "資料", romaji: "shiryō", kanji: [["資", "resources"], ["料", "materials"]], definitions: [
            ["materials; documents", "n", "The papers or files for something."],
          ]},
          "でも": { reading: "でも", lemma: "でも", romaji: "demo", kanji: [], definitions: [
            ["but", "conj", "Turns the sentence the other way."],
          ]},
          "ぜんぜん": { reading: "ぜんぜん", lemma: "全然", romaji: "zenzen", kanji: [["全", "whole"], ["然", "sort of thing"]], definitions: [
            ["(not) at all; (not) in the slightest", "adv", "With a negative sentence."],
            ["wholly; entirely; completely", "adv", "The older, positive sense."],
          ]},
          "わかんない": { reading: "わかる", lemma: "分かる", romaji: "wakaru", kanji: [["分", "understand"]], definitions: [
            ["to understand; to get it", "v", "わかんない is わからない, with ら melted into ん."],
          ]},
          "ごめん": { reading: "ごめん", lemma: "ごめん", romaji: "gomen", kanji: [], definitions: [
            ["sorry", "int", "Casual ごめんなさい."],
          ]},
          "私": { reading: "わたし", lemma: "私", romaji: "watashi", kanji: [["私", "I"]], definitions: [
            ["I; me", "pn", "Neutral. あたし is the softer casual reading."],
          ]},
          "行か": { reading: "いく", lemma: "行く", romaji: "iku", kanji: [["行", "go"]], definitions: [
            ["to go", "v", "行か is the shape it takes before ない."],
          ]},
          "なきゃ": { reading: "なきゃ", lemma: "なきゃ", romaji: "nakya", kanji: [], definitions: [
            ["have to", "—", "なければならない, cut down to its first beat."],
          ]},
          "終電": { reading: "しゅうでん", lemma: "終電", romaji: "shūden", kanji: [["終", "end"], ["電", "train"]], definitions: [
            ["last train", "n", "Short for 最終電車."],
          ]},
          "なくなっ": { reading: "なくなる", lemma: "なくなる", romaji: "nakunaru", kanji: [], definitions: [
            ["to be gone; to disappear", "v", "なくなっ is the stem before ちゃう."],
          ]},
          "ちゃう": { reading: "ちゃう", lemma: "ちゃう", romaji: "chau", kanji: [], definitions: [
            ["and that would be bad", "—", "Short for てしまう. The outcome is unwanted."],
          ]},
          "マジ": { reading: "マジ", lemma: "マジ", romaji: "maji", kanji: [], definitions: [
            ["seriously; for real", "adv", "Slang for 本当."],
          ]},
          "か": { reading: "か", lemma: "か", romaji: "ka", kanji: [], definitions: [
            ["?", "prt", "Turns the word into a surprised question."],
          ]},
          "じゃあ": { reading: "じゃあ", lemma: "じゃあ", romaji: "jā", kanji: [], definitions: [
            ["well then; okay", "conj", "Casual では."],
          ]},
          "また": { reading: "また", lemma: "また", romaji: "mata", kanji: [], definitions: [
            ["again", "adv", "また明日 is the everyday goodbye."],
          ]},
        };

        // Furigana for the bubbles, per token: [kanji, reading] pairs, with kana left as plain text.
        const furigana = {
          "何": [["何", "なに"]],
          "明日": [["明日", "あした"]],
          "資料": [["資料", "しりょう"]],
          "私": [["私", "わたし"]],
          "行か": [["行", "い"], "か"],
          "終電": [["終電", "しゅうでん"]],
        };

        const phrases = {
          "まだいた": { reading: "まだいた", lemma: "まだいる", romaji: "mada ita", gloss: "were still here", note: "まだ plus いた, the past of いる.", definitions: [
            ["were still (here)", "—", "The state hadn't changed: he was still at the office."],
          ]},
          "いたの": { reading: "いたの", lemma: "いたの", romaji: "ita no", gloss: "you were here?", note: "の turns the past into a soft question.", definitions: [
            ["were you (here)?", "—", "いた plus the casual question の."],
          ]},
          "まだいたの": { reading: "まだいたの", lemma: "まだいたの", romaji: "mada ita no", gloss: "you were still here?", note: "Surprise that he hasn't left. Soft, not a complaint.", definitions: [
            ["you were still here?", "—", "まだいた, asked with の."],
          ]},
          "何して": { reading: "なにして", lemma: "何して", romaji: "nani shite", gloss: "what are you doing", note: "何 plus して, the て-form of する.", definitions: [
            ["what are you doing", "—", "Often なんして before の, as in 何してんの."],
          ]},
          "してん": { reading: "してん", lemma: "している", romaji: "shiten", gloss: "doing", note: "している squeezed into してん.", definitions: [
            ["doing", "—", "している → してる → してん, before の."],
          ]},
          "んの": { reading: "んの", lemma: "んの", romaji: "n no", gloss: "a soft question", note: "ん stands in for る, and の asks.", definitions: [
            ["a soft question", "—", "The squeezed ending of しているの."],
          ]},
          "何してん": { reading: "なにしてん", lemma: "何している", romaji: "nani shiten", gloss: "what are you doing", note: "何している, with る melted into ん.", definitions: [
            ["what are you doing", "—", "何して plus ん, the squashed る of ている."],
          ]},
          "してんの": { reading: "してんの", lemma: "しているの", romaji: "shiten no", gloss: "are you doing?", note: "しているの, squeezed. の keeps the question soft.", definitions: [
            ["are you doing?", "—", "してんの is しているの in casual speech."],
          ]},
          "明日の": { reading: "あしたの", lemma: "明日の", romaji: "ashita no", gloss: "tomorrow's", note: "の links 明日 to the noun that follows.", definitions: [
            ["tomorrow's", "—", "明日の資料: the materials for tomorrow."],
          ]},
          "の資料": { reading: "のしりょう", lemma: "の資料", romaji: "no shiryō", gloss: "the materials for", note: "の ties the previous word to 資料.", definitions: [
            ["materials for (something)", "—", "の marks what the 資料 belong to."],
          ]},
          "明日の資料": { reading: "あしたのしりょう", lemma: "明日の資料", romaji: "ashita no shiryō", gloss: "tomorrow's materials", note: "What he's still at the office working on.", definitions: [
            ["tomorrow's materials", "n", "The documents for tomorrow."],
          ]},
          "ぜんぜんわかんない": { reading: "ぜんぜんわかんない", lemma: "全然分からない", romaji: "zenzen wakannai", gloss: "don't get it at all", note: "ぜんぜん pairs with the negative. わかんない is わからない.", definitions: [
            ["to not understand at all", "—", "全然〜ない. わかんない melts ら into ん."],
          ]},
          "なくなっちゃう": { reading: "なくなっちゃう", lemma: "なくなってしまう", romaji: "nakunacchau", gloss: "I'll miss it", note: "なくなる plus ちゃう: it'll be gone, and that would be bad.", definitions: [
            ["it'll end up gone", "—", "なくなってしまう. Here, she'll miss the last train."],
          ]},
          "マジか": { reading: "マジか", lemma: "マジか", romaji: "maji ka", gloss: "seriously?", note: "か makes it a surprised question.", definitions: [
            ["seriously?; for real?", "—", "マジ plus the question か."],
          ]},
          "また明日": { reading: "またあした", lemma: "また明日", romaji: "mata ashita", gloss: "see you tomorrow", note: "また plus 明日. The everyday goodbye.", definitions: [
            ["see you tomorrow", "—", "He lets her go."],
          ]},
          "行かなきゃ": { reading: "いかなきゃ", lemma: "行かなければならない", romaji: "ikanakya", gloss: "have to go", note: "行く plus なきゃ. なければならない, cut down.", definitions: [
            ["have to go", "—", "行かなければならない, shortened to 行かなきゃ."],
          ]},
        };

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
        let openLine = -1;
        let scrubbing = false;
        let anchorIndex = -1;

        function pieces(line) {
          let rest = line.japanese;
          const out = [];
          line.words.forEach((word, index) => {
            const at = rest.indexOf(word[0]);
            if (at < 0) return;
            if (at > 0) out.push({ text: rest.slice(0, at) });
            out.push({ text: word[0], index });
            rest = rest.slice(at + word[0].length);
          });
          if (rest) out.push({ text: rest });
          return out;
        }

        function renderChat() {
          chat.replaceChildren();
          scene.forEach((line, index) => {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "line " + line.side + (index === openLine ? " on" : "");
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
              const word = document.createElement("span");
              word.className = "w";
              (furigana[piece.text] || [piece.text]).forEach((part) => {
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
              text.append(word);
            });
            bubble.append(text);
            shell.append(glow, bubble);
            const en = document.createElement("span");
            en.className = "en";
            en.textContent = line.english;
            row.append(who, shell, en);
            row.addEventListener("click", () => openLineAt(index));
            chat.append(row);
          });
        }

        function fillReading(gloss, note, entry, options = {}) {
          const showDefinitions = options.definitions !== false;
          tokenTip.hidden = true;
          wordPanel.hidden = false;
          glossMeaning.textContent = gloss;
          glossNote.textContent = note;
          glossNote.hidden = !note;
          entryRead.textContent = entry.reading;
          entryLemma.textContent = entry.lemma;
          entryRoma.textContent = entry.romaji;
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
            fillReading(word[1], word[2], entry);
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
          chat.querySelectorAll(".line").forEach((row, index) => {
            const selected = index === openLine;
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
}
