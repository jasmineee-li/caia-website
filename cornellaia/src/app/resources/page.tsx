"use client";
import { useState } from "react";

export default function Resources() {
  const [isNonTechnicalOpen, setNonTechnicalOpen] = useState(false);
  const [isTechnicalOpen, setTechnicalOpen] = useState(false);
  const [isPolicyOpen, setPolicyOpen] = useState(false);

  const toggleNonTechnical = () => {
    setNonTechnicalOpen(!isNonTechnicalOpen);
  };

  const toggleTechnical = () => {
    setTechnicalOpen(!isTechnicalOpen);
  };

  const togglePolicy = () => {
    setPolicyOpen(!isPolicyOpen);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>

      {/* Non-Technical Introduction to AI Safety */}
      <section className="mb-12">
        <h2
          className="text-2xl font-semibold mb-4 cursor-pointer flex items-center justify-between border-b-2 border-gray-300 pb-2"
          onClick={toggleNonTechnical}
        >
          <span>Non-Technical Introduction to AI Safety</span>
          <span
            className={`transform transition-transform ${
              isNonTechnicalOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </h2>
        {isNonTechnicalOpen && (
          <>
            <p>
              For those who want a high-level, non-technical overview of the
              arguments supporting caution regarding advanced AI systems, check
              out the following curated resources.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-4">Blogs, YouTube</h3>
            <ul className="ml-4 space-y-2">
              <li>
                <a
                  href="https://www.planned-obsolescence.org/"
                  className="text-blue-600 hover:underline"
                >
                  Planned Obsolescence
                </a>
                , a blog by Ajeya Cotra (Open Philanthropy) and Kelsey Piper
                (Vox)
              </li>
              <li>
                <a
                  href="https://www.cold-takes.com/cold-takes-on-ai/"
                  className="text-blue-600 hover:underline"
                >
                  Cold Takes
                </a>
                , a blog by Holden Karnofsky (CEO of Open Philanthropy). Some
                excellent posts include:
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      href="https://www.cold-takes.com/ai-could-defeat-all-of-us-combined/"
                      className="text-blue-600 hover:underline"
                    >
                      AI Could Defeat all of us Combined
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cold-takes.com/why-would-ai-aim-to-defeat-humanity/"
                      className="text-blue-600 hover:underline"
                    >
                      Why Would AI &quot;Aim&quot; to Defeat Humanity?
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cold-takes.com/how-we-could-stumble-into-ai-catastrophe/"
                      className="text-blue-600 hover:underline"
                    >
                      How We Could Stumble into AI Catastrophe
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cold-takes.com/ai-safety-seems-hard-to-measure/"
                      className="text-blue-600 hover:underline"
                    >
                      AI Safety Seems Hard to Measure
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cold-takes.com/high-level-hopes-for-ai-alignment/"
                      className="text-blue-600 hover:underline"
                    >
                      High-Level Hopes for AI Alignment
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.cold-takes.com/what-does-bing-chat-tell-us-about-ai-risk/"
                      className="text-blue-600 hover:underline"
                    >
                      What Does Bing Chat tell us about AI risk?
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="https://joecarlsmith.com/2023/03/22/existential-risk-from-power-seeking-ai-shorter-version"
                  className="text-blue-600 hover:underline"
                >
                  Is Power-Seeking AI an Existential Risk?
                </a>{" "}
                by Carlsmith
              </li>
              <li>
                <a
                  href="https://www.youtube.com/c/robertmilesai"
                  className="text-blue-600 hover:underline"
                >
                  Robert Miles
                </a>
                , an AI Safety YouTuber
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              AI Safety in the News
            </h3>
            <ul className="ml-4 space-y-2">
              <li>
                <a
                  href="https://www.nytimes.com/2023/05/30/technology/ai-threat-warning.html"
                  className="text-blue-600 hover:underline"
                >
                  A.I. Poses &apos;Risk of Extinction,&apos; Industry Experts
                  Warn
                </a>{" "}
                (Kevin Roose, New York Times)
              </li>
              <li>
                <a
                  href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/"
                  className="text-blue-600 hover:underline"
                >
                  Geoffrey Hinton tells us why he&apos;s now scared of the tech
                  he helped build
                </a>{" "}
                (Will Douglas Heaven, MIT Technology Review)
              </li>
              <li>
                <a
                  href="https://www.bloomberg.com/opinion/articles/2023-04-09/artificial-intelligence-the-aliens-have-landed-and-we-created-them"
                  className="text-blue-600 hover:underline"
                >
                  The Aliens Have Landed, and We Created Them
                </a>{" "}
                (Niall Ferguson, Bloomberg)
              </li>
            </ul>
          </>
        )}
      </section>

      {/* Technical Papers */}
      <section className="mb-12">
        <h2
          className="text-2xl font-semibold mb-4 cursor-pointer flex items-center justify-between border-b-2 border-gray-300 pb-2"
          onClick={toggleTechnical}
        >
          <span>Technical Papers</span>
          <span
            className={`transform transition-transform ${
              isTechnicalOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </h2>
        {isTechnicalOpen && (
          <>
            <p>
              This page is intended for researchers considering pivoting to AI
              Safety, as well as for advanced undergraduates excited to get
              started in the field.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Mechanistic Interpretability
            </h3>
            <p>
              Mechanistic interpretability is the study of taking a trained
              neural network and analyzing the weights to reverse engineer the
              algorithms learned by the model.
            </p>
            <p>Several good papers:</p>
            <ul className="ml-4 space-y-2">
              <li>
                <a
                  href="https://haist.ai/tech-papers#:~:text=Articles%20in%20Anthropic%E2%80%99s%20Transformer%20Circuits%20Thread"
                  className="text-blue-600 hover:underline"
                >
                  Articles in Anthropic&apos;s Transformer Circuits Thread
                </a>{" "}
                (a few great papers are here)
              </li>
              <li>
                <a
                  href="https://haist.ai/tech-papers#:~:text=Indirect%20Object%20Identification%20(IOI)%20in%20GPT%2D2%20Small"
                  className="text-blue-600 hover:underline"
                >
                  Indirect Object Identification (IOI) in GPT-2 Small
                </a>{" "}
                by Wang et al
              </li>
              <li>
                We recommend Neel Nanda&apos;s materials for getting started in
                Mechanistic Interpretability, including:
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      href="https://haist.ai/tech-papers#:~:text=Concrete%20Steps%20to%20Getting%20Started"
                      className="text-blue-600 hover:underline"
                    >
                      Concrete Steps to Getting Started
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://haist.ai/tech-papers#:~:text=An%20Opinionated%20Annotated%20List%20of%20His%20Favorite%20Papers"
                      className="text-blue-600 hover:underline"
                    >
                      An Opinionated Annotated List of His Favorite Papers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://haist.ai/tech-papers#:~:text=200%20Concrete%20Open%20Problems%20in%20Mechanistic%20Interpretability"
                      className="text-blue-600 hover:underline"
                    >
                      200 Concrete Open Problems in Mechanistic Interpretability
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://example.com"
                      className="text-blue-600 hover:underline"
                    >
                      TransformerLens, a Python library for doing mechanistic
                      interpretability on GPT-2-style language models
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Eliciting Latent Knowledge & Hallucinations
            </h3>
            <p>
              Because language models are trained to predict the next token in
              naturally occurring text, they often reproduce common human errors
              and misconceptions, even when they &quot;know better&quot; in some
              sense. More worryingly, when models are trained to generate text
              that's rated highly by humans, they may learn to output false
              statements that human evaluators can&apos;t detect. One attempt to
              circumvent this issue is by directly eliciting latent knowledge
              inside the activations of a language model.
            </p>
            <p>A few good papers:</p>
            <ul className="ml-4 space-y-2">
              <li>Tuned Lens by Belrose et al (Eleuther AI)</li>
              <li>
                Discovering Latent Knowledge in Language Models Without
                Supervision by Burns et al
              </li>
              <li>
                Improving Factuality and Reasoning in Language Models through
                Multiagent Debate by Du et al
              </li>
              <li>
                How Language Model Hallucinations can Snowball by Zhang et al
              </li>
              <li>Language Models (Mostly) Know What They Know by Anthropic</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              AI Evaluations and Standards
            </h3>
            <p>
              AI evaluations and standards (or &quot;evals&quot;) are processes
              that check or audit AI models. Evaluations can focus on how
              powerful models are (&quot;capability evaluations&quot;) and on
              whether models are exhibiting dangerous behaviors or are
              misaligned (&quot;alignment evaluations&quot; or &quot;safety
              evaluations&quot;). Working on AI evaluations might involve
              developing standards and enforcing compliance with the standards.
              Evaluations can help labs determine whether it's safe to deploy
              new models, and can help with AI governance and regulation.
            </p>
            <p>A couple good papers:</p>
            <ul className="ml-4 space-y-2">
              <li>
                Model Evaluations for Extreme Risks by Shevalne et al and the
                accompanying technical blog (DeepMind)
              </li>
              <li>GPT-4 System Card (OpenAI)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Goal Misgeneralization & Specification Gaming
            </h3>
            <p>
              Goal misgeneralization failures occur when an RL agent retains its
              capabilities out-of-distribution yet pursues the wrong goal.
            </p>
            <p>A few good papers:</p>
            <ul className="ml-4 space-y-2">
              <li>
                Goal Misgeneralization in Deep Reinforcement Learning by
                Langosco et al
              </li>
              <li>Goal Misgeneralization by Shah et al (DeepMind)</li>
              <li>Specification Gaming (DeepMind)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Emergent Abilities
            </h3>
            <p>
              It sometimes seems that large language models&apos; abilities
              emerge suddenly and unpredictably. If we don&apos;t know the
              capabilities of our models, we don&apos;t know how dangerous they
              may be.
            </p>
            <p>Two papers with contrasting perspectives:</p>
            <ul className="ml-4 space-y-2">
              <li>Emergent Abilities of Large Language Models by Wei et al</li>
              <li>
                Are Emergent Abilities of Large Language Models a Mirage? by
                Schaeffer, Miranda, and Koyejo
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">Survey Papers</h3>
            <ul className="ml-4 space-y-2">
              <li>Catastrophic Risks from AI</li>
              <li>Interpretability</li>
              <li>Adversaries</li>
              <li>Specification learning</li>
              <li>Recommender systems</li>
              <li>Paradoxical dilemmas for AGI/ASI</li>
              <li>Embedded agency</li>
              <li>Potential ways to build AGI</li>
              <li>General problems</li>
              <li>Other general problems</li>
              <li>Some more general problems</li>
              <li>Digital Evolution</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">Other</h3>
            <ul className="ml-4 space-y-2">
              <li>
                AI Alignment Problem introduction by Ngo, Chan, and Mindermand
              </li>
              <li>
                Locating and Editing Factual Associations in GPT by Meng et al
              </li>
              <li>
                Constitutional AI: Harmlessness from AI Feedback by Anthropic
              </li>
              <li>Power-seeking by Turner et al</li>
              <li>Heuristic Arguments (Alignment Research Center)</li>
            </ul>
          </>
        )}
      </section>

      {/* Policy Papers */}
      <section className="mb-12">
        <h2
          className="text-2xl font-semibold mb-4 cursor-pointer flex items-center justify-between border-b-2 border-gray-300 pb-2"
          onClick={togglePolicy}
        >
          <span>Policy Papers</span>
          <span
            className={`transform transition-transform ${
              isPolicyOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </h2>
        {isPolicyOpen && (
          <>
            <p>
              This page is intended for students, researchers, and practitioners
              who are interested in learning about work from public policy, law,
              corporate governance, economics, and related fields that is
              relevant to reducing risks from advanced AI. The papers here
              represent a broad overview of what we see as the central
              challenges in and approaches to the governance of advanced AI.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Overviews and Surveys
            </h3>
            <ul className="ml-4 space-y-2">
              <li>
                <strong>
                  The Role of Cooperation in Responsible AI Development
                </strong>{" "}
                (Askell et al., 2019). This paper outlines one of the central
                issues in the governance of advanced AI: the risk of a
                &quot;race to the bottom&quot; where, because AI developers are
                unable to coordinate with each other, they are each incentivized
                to quickly develop more capable models while cutting corners on
                safety.
              </li>
              <li>
                <strong>
                  AI Policy Levers: A Review of the U.S. Government's Tools to
                  Shape AI Research, Development, and Deployment
                </strong>{" "}
                (Fischer et al., 2021). Fischer et al. give a high-level
                overview of the many options available to the U.S. federal
                government for shaping the development of AI.
              </li>
              <li>
                <strong>AI Chips: What They Are and Why They Matter</strong>{" "}
                (Khan & Mann, 2020). The specialized chips used to train
                cutting-edge AI systems are one of the inputs to AI development
                most amenable to regulatory intervention. In this paper,
                researchers from the Center for Security and Emerging Technology
                explain the basic dynamics that govern these chips' development
                and production, and discuss their strategic importance.
              </li>
              <li>
                <strong>
                  Towards Best Practices in AGI Safety and Governance
                </strong>{" "}
                (Schuett et al., 2023). Researchers from the Centre for the
                Governance of AI survey experts at top AI labs and other
                relevant institutions. They find a remarkable degree of
                consensus among their respondents about the safety and
                governance practices that top labs should implement.
              </li>
              <li>
                <strong>12 Tentative Ideas for U.S. AI Policy</strong>{" "}
                (Muehlhauser, 2023).
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Licensing, Auditing and Standards
            </h3>
            <p>
              Governments often ensure that risky technologies are developed
              safely by creating regulatory regimes that ensure that approved
              projects obey best practices for safety. Many researchers and
              practitioners advocate for a similar approach to AI regulation.
              This approach would reduce risks from the wide deployment of
              dangerous systems and incentivize further research into safety and
              reliability from developers. Much work remains to be done,
              however, in working out the details of just what such a regulatory
              regime would look like, as well as how it would be realistically
              enforced.
            </p>
            <ul className="ml-4 space-y-2">
              <li>
                <strong>
                  Auditing Large Language Models: A Three-Layered Approach
                </strong>{" "}
                (Mökander et al., 2023). This paper provides a blueprint for an
                auditing regime for contemporary foundation models. The authors
                also discuss the unique challenges that AI poses, cover some of
                the limitations of their proposed approach, and argue that the
                safe development of AI requires more than just a licensing
                regime.
              </li>
              <li>
                <strong>
                  Towards Trustworthy AI Development: Mechanisms for Supporting
                  Verifiable Claims
                </strong>{" "}
                (Brundage et al., 2020). For a licensing and auditing regime to
                be effective, it needs to be enforceable. This paper describes
                some ways in which AI developers' claims might be verified by a
                third party.
              </li>
              <li>
                <strong>
                  Nuclear Arms Control Verification and Lessons for AI Treaties
                </strong>{" "}
                (Baker, 2023). Many researchers believe that the effective
                governance of nuclear weapons and nuclear power poses very
                similar challenges to the effective governance of advanced AI.
                Here, Mauricio Baker discusses in depth the lessons the AI
                governance community can draw from the challenges of verifying
                states&apos; claims about their nuclear development.
              </li>
              <li>
                <strong>
                  Verifying Rules on Large-Scale Neural Network Training via
                  Compute Monitoring
                </strong>{" "}
                (Shavit, 2023). Yonadav Shavit gives a detailed description of a
                possible verification scheme here, based on privacy-preserving
                monitoring of the usage of specialized chips.
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">
              Misuse and Conflict
            </h3>
            <p>
              In addition to the risk of catastrophic AI accidents, another
              source of AI-related risk is conflict precipitated by the
              development of advanced AI. AI might radically reshape the balance
              of power and the security landscape, leading to significant
              geopolitical instability.
            </p>
            <ul className="ml-4 space-y-2">
              <li>
                <strong>How does the offense-defense balance scale?</strong>{" "}
                (Garfinkel & Dafoe, 2019). The &quot;offense-defense
                balance&quot; refers to the relative ease of attacking another
                power and defending against an attack. Some researchers worry
                that advanced AI might tilt this balance in favor of offense,
                leading to a more conflict-prone world. This paper discusses
                that possibility.
              </li>
              <li>
                <strong>
                  The Malicious Use of Artificial Intelligence: Forecasting,
                  Prevention, and Mitigation
                </strong>{" "}
                (Brundage et al., 2018). This paper advocates for increased
                concern about the potential catastrophic misuse of powerful AI
                systems. The authors describe several concrete threat models,
                and they make high-level recommendations to policymakers and AI
                developers aimed at reducing misuse risks.
              </li>
              <li>
                <strong>
                  Protecting Society from AI Misuse: When are Restrictions on
                  Capabilities Warranted?
                </strong>{" "}
                (Anderljung & Hazell, 2023). The authors discuss the tradeoffs
                inherent in restrictions to AI capabilities aimed at curbing
                misuse risks. They describe some domains in which significant
                capabilities restrictions might be worthwhile.
              </li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-4">Structural Risk</h3>
            <ul className="ml-4 space-y-2">
              <li>
                <strong>
                  Thinking About Risks From AI: Accidents, Misuse and Structure
                </strong>{" "}
                (Zwetsloot & Dafoe, 2019). This blog post develops a rough
                taxonomy for classifying different risks associated with AI
                development. Most significantly, it develops the notion of
                &quot;structural risk.&quot;
              </li>
              <li>
                <strong>
                  The Windfall Clause: Distributing the Benefits of AI
                </strong>{" "}
                (O'Keefe et al., 2020). A central structural risk posed by
                advanced AI development is that of extreme economic
                concentration and correspondingly extreme inequality. If a few
                AI developers rapidly develop the ability to automate large
                swathes of the economy, they may quickly acquire much more
                economic power than private entities have had in the past. This
                paper outlines a proposal for an ex ante commitment by AI
                developers to avoid such extreme concentration of wealth.
              </li>
              <li>
                <strong>Algorithmic Black Swans</strong> (Kolt, 2023). This
                article introduces the concept of an &quot;algorithmic black
                swan&quot; — a catastrophic tail outcome caused by AI
                development. Noam Kolt argues that existing institutions and
                efforts to regulate AI systematically neglect these outcomes,
                and argues that future efforts should actively take them into
                account.
              </li>
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
