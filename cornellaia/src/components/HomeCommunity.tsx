import Link from "next/link";
import Container from "@/components/ui/Container";
import CommunityPath from "@/components/CommunityPath";
import Section from "@/components/ui/Section";
import { HOME_CTA_ITEMS } from "@/content/home";
import styles from "./HomeCommunity.module.css";

export default function HomeCommunity() {
  return (
    <div className={styles.root}>
      <section className={styles.mission} aria-labelledby="mission-title">
        <Container>
          <h2 id="mission-title" className={styles.missionTitle}>Managing risks from advanced AI is one of the most important challenges of our time.</h2>
          <p className={styles.missionCopy}>We bring together technical AI safety, policy, governance, and broader conversations about AI to ensure that increasingly capable AI systems remain aligned with human intentions and benefit all of humanity.</p>
        </Container>
      </section>

      <CommunityPath />

      <Section id="join" title="Join Us" className="mt-4">
        <p className={styles.paragraph}>All of our events are open to everyone. If you <a href={HOME_CTA_ITEMS[0].href} target="_blank" rel="noopener noreferrer">join our Slack</a>, you’re considered a member! It’s where we share conversations, announcements, and opportunities. Come to an event or explore <Link href="/join">ways to get involved</Link>.</p>
      </Section>
    </div>
  );
}
