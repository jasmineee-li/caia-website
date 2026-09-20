import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { HOME_CTA_ITEMS } from "@/content/home";
import styles from "./HomeCommunity.module.css";

export default function HomeCommunity() {
  return (
    <div className={styles.root}>
      <section className={styles.mission} aria-labelledby="mission-title">
        <Container>
          <h2 id="mission-title" className={styles.missionTitle}>Managing risks from advanced AI is one of the most important challenges of our time.</h2>
          <p className={styles.missionCopy}>We’re a community of students, faculty, and researchers at Cornell working toward reducing risks and improving the trajectory of AI development. We bring together technical AI safety, policy, governance, and broader conversations about AI to ensure that increasingly capable AI systems remain aligned with human intentions and benefit all of humanity.</p>
        </Container>
      </section>

      <div className={styles.pathway}>
        <Container>
          <div className={styles.steps}>
            <article className={styles.step}>
              <div className={styles.stepHeading}><svg className={styles.stepIcon} viewBox="0 0 32 32" aria-hidden="true">
                <rect x="5" y="5" width="22" height="22" rx="3" fill="#8BCED1" />
              </svg><h2>Engage</h2></div>
              <p>We invite everyone to explore how AI can serve people and help build a better future. Our <Link href="/events#events">talks and discussions</Link> bring the Cornell community into that conversation, regardless of your background.</p>
            </article>
            <article className={styles.step}>
              <div className={styles.stepHeading}><svg className={styles.stepIcon} viewBox="0 0 32 32" aria-hidden="true">
                <rect x="1" y="17" width="14" height="14" rx="2" fill="#A9DADD" />
                <rect x="17" y="1" width="14" height="14" rx="2" fill="#6BBFC3" />
              </svg><h2>Upskill</h2></div>
              <p>Learn technical AI safety and governance through <Link href="/programs/cs1998" className="whitespace-nowrap">CS 1998</Link>, reading groups, and workshops. Our <Link href="/resources">resources</Link> include courses and readings for independent study.</p>
            </article>
            <article className={styles.step}>
              <div className={styles.stepHeading}><svg className={styles.stepIcon} viewBox="0 0 32 32" aria-hidden="true">
                <rect x="1" y="17" width="14" height="14" rx="2" fill="#BFE3E8" />
                <rect x="17" y="17" width="14" height="14" rx="2" fill="#8BCED1" />
                <rect x="17" y="1" width="14" height="14" rx="2" fill="#6BBFC3" />
              </svg><h2>Contribute</h2></div>
              <p>We help members find <Link href="/research">research collaborators</Link>, mentors, and <Link href="/resources#opportunities">fellowships</Link> to work on technical AI safety and policy.</p>
            </article>
          </div>
          <section className={styles.foundation} aria-labelledby="community-title">
            <div className={styles.communityHeading}>
              <h2 id="community-title">Community</h2>
              <Image className={styles.communityIllustration} src="/graphics/community-together-aqua.png" width={2079} height={756} alt="" />
            </div>
            <p>Above all, we aim to build trust and community where people exchange ideas, challenge each other’s thinking, and work together to make AI go well. We welcome questions, perspectives from all backgrounds, and great conversations, both in our discussions and at our <Link href="/events#events">socials</Link>.</p>
            <Image className={styles.communityBlocks} src="/graphics/community-blocks.svg" width={113} height={84} alt="" />
          </section>
        </Container>
      </div>

      <Section id="join" title="Join Us" className="mt-4">
        <p className={styles.paragraph}>All of our events are open to everyone. If you <a href={HOME_CTA_ITEMS[0].href} target="_blank" rel="noopener noreferrer">join our Slack</a>, you’re considered a member! It’s where we share conversations, announcements, and opportunities. Active and engaged members will be recognized as <Link href="/join#fellows">fellows</Link>. Come to an event or explore <Link href="/join">ways to get involved</Link>.</p>
      </Section>
    </div>
  );
}
