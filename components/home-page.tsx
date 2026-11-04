'use client';

import { useEffect } from "react";
import Link from "next/link";
import { initHome } from "@/components/home-interactive";
import { SiteFooter } from "@/components/site-footer";
import "@/app/home.css";

export function HomePage() {
  useEffect(() => initHome(), []);

  return (
    <div className="home">
    <header className="top">
      <Link className="mark" href="/">Shizen</Link>
      <nav className="nav" aria-label="Sections">
        <a href="#stage">Demo</a>
        <a href="#moves">Method</a>
        <a href="#in-the-app">Stats</a>
        <a href="#places-title">Conversations</a>
      </nav>
      <button type="button" className="store" data-open-waitlist>Join the waitlist</button>
    </header>
    <section className="pitch" id="pitch">
      <p className="kicker">Coming to iPhone</p>
      <h1>Understand Japanese the way it’s actually spoken.</h1>
      <p className="lede">Everyday conversations at full speed, with every squashed sound and dropped syllable explained in the line it’s in.</p>
      <button type="button" className="store" data-open-waitlist>Join the waitlist</button>
    </section>
    <div className="carousel" aria-hidden="true">
      <div className="carousel-track">
        <img src="/assets/stickers/travel.webp" width="569" height="900" alt=""  />
        <img src="/assets/stickers/baseball.webp" width="856" height="900" alt=""  />
        <img src="/assets/stickers/garden.webp" width="821" height="900" alt=""  />
        <img src="/assets/stickers/photo.webp" width="740" height="900" alt=""  />
        <img src="/assets/stickers/bike.webp" width="423" height="900" alt=""  />
        <img src="/assets/stickers/fence.webp" width="900" height="896" alt=""  />
        <img src="/assets/stickers/shopping-2.webp" width="900" height="892" alt=""  />
        <img src="/assets/stickers/travel.webp" width="569" height="900" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/baseball.webp" width="856" height="900" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/garden.webp" width="821" height="900" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/photo.webp" width="740" height="900" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/bike.webp" width="423" height="900" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/fence.webp" width="900" height="896" alt="" aria-hidden="true"  />
        <img src="/assets/stickers/shopping-2.webp" width="900" height="892" alt="" aria-hidden="true"  />
      </div>
    </div>
    <main className="sheet">
      <div className="stage" id="stage">
        <div className="thread">
          <div className="intro">
            <div>
              <p className="setting">Festival Day · N4</p>
              <h2>Tap a line. Take it apart.</h2>
            </div>
            <button type="button" className="play" id="play-demo" aria-label="Play Takoyaki booth dialogue" aria-pressed="false">
              <svg className="play-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M5 3.2v11.6L15 9 5 3.2Z" fill="currentColor" />
              </svg>
              <svg className="pause-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4.5 3.5h3v11h-3v-11Zm6 0h3v11h-3v-11Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <section className="conversation" id="chat" aria-label="Conversation"></section>
        </div>
        <div className="divider" aria-hidden="true"></div>
        <section className="reading" id="reading" aria-label="This line" aria-hidden="true">
          <button className="back" type="button" id="back" aria-label="Back">
            <svg width="13" height="20" viewBox="0.77 0 13 20" fill="none" aria-hidden="true">
              <path d="M10 3.5 4 10l6 6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"  />
            </svg>
          </button>
          <p className="sentence" id="sentence"></p>
          <p className="sentence-en" id="sentence-en"></p>
          <p className="token-tip" id="token-tip">
            <svg className="point" width="25" height="32" viewBox="0 0 12.6304 16.3686" fill="currentColor" aria-hidden="true">
              <g transform="matrix(0.00634765 0 0 0.00634765 -1.46364 15.7)">
                <path d="M1361.61 105.319C1913.56 105.319 2220.35-229.254 2220.35-832.596L2220.35-1069.25C2220.35-1293.49 2111.65-1431.05 1988.13-1431.05C1960.13-1431.05 1945.3-1416.23 1945.3-1389.87L1945.3-1274.72C1945.3-1228.65 1920.53-1205.95 1893.07-1205.95C1861.89-1205.95 1838.16-1228.65 1838.16-1274.72L1838.16-1351.99C1838.16-1485.4 1752.51-1572.69 1637.22-1572.69C1584.52-1572.69 1561.46-1551.28 1561.46-1506.81L1561.46-1352.13C1561.46-1306.06 1537.29-1283.36 1509.84-1283.36C1478.65-1283.36 1454.92-1306.06 1454.92-1352.13L1454.92-1495.28C1454.92-1645.16 1367.63-1715.98 1255.63-1715.98C1206.22-1715.98 1179.87-1692.92 1179.87-1650.1L1179.87-1352.13C1179.87-1306.06 1156.31-1283.36 1128.25-1283.36C1097.07-1283.36 1073.94-1306.06 1073.94-1352.13L1073.94-2316.65C1073.94-2412.17 1012.14-2473.36 931.439-2473.36C847.193-2473.36 786.254-2412.17 786.254-2316.65L786.254-925.592C786.254-893.012 765.452-875.075 743.003-875.075C722.381-875.075 704.873-887.462 690.23-920.042L501.005-1361.82C472.397-1428.31 428.966-1456.13 373.938-1456.13C284.391-1456.13 230.58-1395.8 230.58-1322.12C230.58-1293.87 236.559-1269.77 243.756-1248.18L453.714-617.406C620.945-115.422 958.245 105.319 1361.61 105.319Z" />
              </g>
            </svg>
            Tap a word, or drag across a few.
          </p>
          <div id="word" hidden>
          <hr className="rule" />
          <div className="entry" id="entry">
            <p className="entry-read" id="entry-read"></p>
            <p className="entry-lemma" id="entry-lemma"></p>
            <p className="entry-roma" id="entry-roma"></p>
          </div>
          <article className="gcard">
            <p className="card-kicker">In this sentence</p>
            <p className="meaning" id="gloss-meaning"></p>
            <p className="note" id="gloss-note"></p>
          </article>
          <hr className="rule" id="lex-rule" />
          <div className="lex" id="lex">
            <section id="kanji-block">
              <p className="dict-kicker">Kanji</p>
              <div className="kanji" id="kanji"></div>
            </section>
            <section id="defs-block">
              <p className="dict-kicker">Definitions</p>
              <ol className="defs" id="defs"></ol>
            </section>
          </div>
          </div>
        </section>
      </div>
    </main>

    <section className="section" aria-labelledby="moves">
      <div className="head-row">
        <div>
          <h2 id="moves">How a line clicks.</h2>
          <p className="sub">One line, heard twice.</p>
        </div>
        <img className="sticker" src="/assets/stickers/study.webp" width="900" height="701" alt="" loading="lazy"  />
      </div>
      <div className="squares">
        <article className="square">
          <h3>Hear it.</h3>
          <p>At full speed, before any text shows up.</p>
        </article>
        <article className="square">
          <h3>Take it apart.</h3>
          <p>Tap a word, or drag across a few, and see what each piece is doing in this sentence.</p>
        </article>
        <article className="square">
          <h3>Hear it again.</h3>
          <p>This time, you catch all of it.</p>
        </article>
      </div>
      <p className="aside">When you’re ready, step into the other person’s line and say it yourself.</p>
    </section>

    <section className="section stats" aria-labelledby="in-the-app">
      <h2 id="in-the-app">What’s in the app.</h2>
      <p className="sub">Counted only from conversations you can play today.</p>
      {/* From Neon, Oct 2026: 172 scenes with published audio, 2,510 spoken lines,
           139 min of dialogue audio, 105 distinct patterns tagged on published scenes (68 N5). */}
      <div className="stat-row">
        <p className="stat"><b>170+</b><span>Conversations</span></p>
        <p className="stat"><b>2,500+</b><span>Spoken lines</span></p>
        <p className="stat"><b>2 hrs+</b><span>Of dialogue audio</span></p>
        <p className="stat"><b>105</b><span>Grammar patterns</span></p>
      </div>
    </section>

    <section className="section" aria-labelledby="places-title">
      <div className="head-row">
        <div>
          <h2 id="places-title">Conversations you’ll hear.</h2>
          <p className="sub">The line happens at a window, a sidewalk, a storefront, a table.</p>
        </div>
        <img className="sticker tilt-left" src="/assets/stickers/walking.webp" width="877" height="900" alt="" loading="lazy"  />
      </div>
      <div className="places">
        <article className="place-card">
          <img src="/assets/places/station.jpg" alt="A traveler at a ticket window, talking with the station attendant"  />
          <div>
            <h3>At the station</h3>
            <p>A traveler and the attendant at the ticket window. Each talk builds on the last.</p>
          </div>
        </article>
        <article className="place-card">
          <img src="/assets/places/directions.jpg" alt="Someone stopping a passerby to ask the way"  />
          <div>
            <h3>Asking directions</h3>
            <p>Stop someone on the street and get pointed the right way.</p>
          </div>
        </article>
        <article className="place-card">
          <img src="/assets/places/store.jpg" alt="A traveler with a bottled tea, standing outside a convenience store"  />
          <div>
            <h3>The convenience store</h3>
            <p>A quick exchange out front, before you head in.</p>
          </div>
        </article>
        <article className="place-card">
          <img src="/assets/places/library.jpg" alt="Two people at a library table, looking at an open book together"  />
          <div>
            <h3>The library</h3>
            <p>Two people, one open book.</p>
          </div>
        </article>
      </div>
    </section>

    <section className="close">
      <img className="sticker" src="/assets/stickers/shopping.webp" width="900" height="895" alt="" loading="lazy"  />
      <h2>Catch every word.</h2>
      <p className="sub">170+ conversations, N5 to N3.</p>
      <button type="button" className="store" data-open-waitlist>Join the waitlist</button>
    </section>
    <SiteFooter credit={<>© 2026 Shizen · <Link href="/">shizenapp.com</Link></>} />

    <dialog id="waitlist-dialog" className="join">
      <form id="waitlist" className="waitlist" noValidate>
        <h2>Join the waitlist</h2>
        <p className="sub">We’ll write when it’s ready for iPhone.</p>
        <label className="sr-only" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          required
         />
        <button type="submit">Join the waitlist</button>
        <p className="form-status" role="status" aria-live="polite"></p>
      </form>
      <button type="button" className="join-close" data-close-waitlist>Close</button>
    </dialog>

    </div>
  );
}
