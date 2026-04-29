import type { Metadata } from "next";
import styles from "./poster.module.css";

const COURSE_URL = "https://www.cornell-aia.org/programs/cs1998";
const ROSTER_URL =
  "https://classes.cornell.edu/browse/roster/FA26/class/CS/1998";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(
  COURSE_URL,
)}`;

const TOPICS = [
  "Modern LLM training pipeline",
  "Mechanistic interpretability",
  "RLHF and reward hacking",
  "Red teaming and evaluations",
  "Scalable oversight and AI control",
  "Policy, trajectories, and careers",
];

export const metadata: Metadata = {
  title: "CS 1998 Poster",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CS1998PosterPage() {
  return (
    <main className={`cs1998-poster-page ${styles.page}`}>
      <section className={styles.sheet} aria-label="CS 1998 course poster">
        <div className={styles.content}>
          <div className={styles.masthead}>
            <img
              className={styles.logo}
              src="/serif-logo.svg"
              alt="Cornell AI Alignment"
            />
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              Fall 2026 · Open Enrollment
            </div>
          </div>

          <section className={styles.hero}>
            <h1 className={styles.preEnroll}>Pre-enroll Now!</h1>
            <h2 className={styles.title}>
              CS 1998:
              <br />
              Intro to AI Safety &amp; Alignment
            </h2>
            <p className={styles.intro}>
              A practical, research-oriented introduction to how modern AI
              systems fail, how researchers evaluate them, and how alignment
              methods can make them safer.
            </p>
          </section>

          <section className={styles.stats} aria-label="Course logistics">
            <div className={styles.stat}>
              <p className={styles.label}>Course</p>
              <p className={styles.value}>CS 1998, PRJ 608</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Class #</p>
              <p className={styles.value}>18589</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Credits</p>
              <p className={styles.value}>1 credit · S/U</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.label}>Duration</p>
              <p className={styles.value}>7 weeks first</p>
            </div>
          </section>

          <section className={styles.main}>
            <div className={styles.leftColumn}>
              <article className={`${styles.panel} ${styles.formatPanel}`}>
                <p className={styles.formatHeading}>Logistics</p>
                <div className={styles.formatList}>
                  <p className={styles.formatItem}>
                    <span className={styles.formatDot} aria-hidden="true" />
                    Fridays, 2:55-4:10pm
                  </p>
                  <p className={styles.formatItem}>
                    <span className={styles.formatDot} aria-hidden="true" />
                    Phillips Hall 203
                  </p>
                  <p className={styles.formatItem}>
                    <span className={styles.formatDot} aria-hidden="true" />
                    August 24-October 9
                  </p>
                </div>
              </article>

              <article className={`${styles.panel} ${styles.topicPanel}`}>
                <h3 className={styles.sectionTitle}>Topics</h3>
                <ul className={styles.topics}>
                  {TOPICS.map((topic, index) => (
                    <li className={styles.topic} key={topic}>
                      <span className={styles.topicIndex}>{index + 1}</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className={styles.rightColumn}>
              <section className={`${styles.panel} ${styles.sidePanel} ${styles.join}`}>
                <h3 className={styles.sideTitle}>Anyone is Welcome!</h3>
                <p className={styles.bodyCopy}>
                  Background in Python, linear algebra, and LLMs is useful, but
                  students from policy, governance, and other non-CS backgrounds
                  are also welcome.
                </p>
              </section>

              <section className={`${styles.panel} ${styles.sidePanel} ${styles.learn}`}>
                <h3 className={styles.sideTitle}>Learn More</h3>
                <div className={styles.learnRow}>
                  <div className={styles.qr}>
                    <img src={QR_URL} alt="QR code for CS 1998 course page" />
                  </div>
                  <a className={styles.url} href={COURSE_URL}>
                    cornell-aia.org/programs/cs1998
                  </a>
                </div>
                <a className={styles.roster} href={ROSTER_URL}>
                  Pre-enroll through Cornell Class Roster
                </a>
              </section>
            </aside>

            <div className={styles.beamPanel} aria-hidden="true">
              <img src="/graphics/beam-lines.svg" alt="" />
            </div>
          </section>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              CS 1998: Intro to AI Safety &amp; Alignment
            </p>
            <p className={styles.footerText}>
              Proudly run by <strong>Cornell AI Alignment</strong>
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
