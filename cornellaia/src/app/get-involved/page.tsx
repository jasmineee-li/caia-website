export default function GetInvolved() {
  return (
    <main>
      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-cornell-red mb-8">
            Introduction to AI Alignment Fellowship
          </h1>

          <p className="text-xl mb-6">
            CAIA runs an{" "}
            <span className="font-semibold">
              8-week introductory fellowship on AI safety
            </span>
            , covering both technical and policy topics. Topics covered include
            include neural network interpretability,
            <span className="text-cornell-red">
              <sup>
          <a
            href="https://distill.pub/2020/circuits/zoom-in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            1
          </a>
              </sup>
            </span>{" "}
            learning from human feedback,
            <span className="text-cornell-red">
              <sup>
          <a
            href="https://arxiv.org/abs/2009.01325"
            target="_blank"
            rel="noopener noreferrer"
          >
            2
          </a>
              </sup>
            </span>{" "}
            US AI policy, and potential catastrophic risks from advanced AI
            systems. The program is open to both undergraduate and graduate
            students. Students with machine learning experience are especially
            encouraged to apply, but no prior experience is required. The fellowship meets weekly in small groups, with dinner provided
            and no additional work outside of meetings.
          </p>

          {/* <p className="text-xl mb-8">
            The fellowship meets weekly in small groups, with dinner provided
            and no additional work outside of meetings. Our curriculum is
            adapted from OpenAI&apos;s{" "}
            <a
              href="https://course.aisafetyfundamentals.com/alignment"
              className="text-cornell-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Safety Fundamentals
            </a>{" "}
            course. See the Fall 2025 syllabus{" "}
            <a
              href="https://docs.google.com/document/d/1OuJmW-3W5qZfCH9PtcPNkskU_ySpQIb_oF-8lhmZqLc/edit?tab=t.0#heading=h.c6ivfpz8bbwa"
              className="text-cornell-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p> */}

          <div className="text-xl mb-6">
            <p>
              <span className="font-semibold">Note:</span> Due to time constraints in the Fall 2025 semester, we will be running a one-day accelerated workshop instead of the full fellowship. You can view the curriculum{" "}
              <a
          href="https://docs.google.com/document/d/1WnHIJ8oLKoe6nEM6q2gbkdhsz1PQHetuWnYZsyZbuwc/edit?tab=t.0"
          className="text-cornell-red hover:underline"
          target="_blank"
          rel="noopener noreferrer"
              >
          here.
              </a>
            </p>
          </div>

          <a
            href="https://luma.com/noc7jeyk"
            className="inline-block bg-cornell-red text-bold text-white px-4 py-3 rounded-lg bg-opacity-90 transition mb-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign up for the Fall 2025 Workshop
          </a>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-cornell-red mb-8">
            Technical Paper Reading Group
          </h1>

          <p className="text-xl mb-6">
            CAIA runs a weekly open technical ML reading group. Reading group
            sessions are led by experienced TAs; cover recent significant papers
            in AI/ML safety; and meet weekly in small groups. Dinner is provided
            and there is no additional work outside of meetings.
          </p>

          <a
            href="https://join.slack.com/t/cornellaialignment/shared_invite/zt-3h031d0zn-Ch9ANyyhXTpaDdyKYBuo8w"
            className="inline-block bg-cornell-red text-bold text-white px-4 py-3 rounded-lg bg-opacity-90 transition mb-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the CAIA Slack
          </a>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-cornell-red mb-8">
            Student Research
          </h1>

          <p className="text-xl mb-6">
            CAIA supports original student research in AI safety. If you are
            interested in beginning technical or policy research, reach out to{" "}
            <a
              href="mailto:cornellaialignment@gmail.com"
              className="text-cornell-red hover:underline"
            >
              cornellaialignment@gmail.com
            </a>{" "}
            to be connected with resources and a faculty or upperclassman
            mentor.
          </p>

          {/* <a
            href="#"
            className="inline-block bg-cornell-red text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition"
          >
            Apply here by February 9, 2025, 11:59pm EST.
          </a> */}
        </div>
      </section>
    </main>
  );
}
