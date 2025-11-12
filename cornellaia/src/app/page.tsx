import { Young_Serif } from "next/font/google";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <main className="">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl flex flex-col items-center gap-8 mx-auto">
            <div>
                <h1
                className={`text-6xl font-bold text-cornell-red mb-8 tracking-tighter ${youngSerif.className}`}
                >
                AI will change the world as we know it.
                </h1>

              <p className="text-2xl italic mb-4">
                We conduct research and outreach to advance the development of
                safe AI.
              </p>
              <p className="text-2xl text-gray-600 mb-4 underline">
                Join our{" "}
                <a
                  href="https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form"
                  className="hover:text-cornell-red"
                >
                  mailing list
                </a>
                {" / "}
                <a
                  href="https://join.slack.com/t/cornellaialignment/shared_invite/zt-3hzie60ir-Ai4TDMKHUCFSpKZDcMbb0w"
                  className="hover:text-cornell-red"
                >
                  Slack
                </a>

              </p>
              {/* <div className="mb-12 mt-8">
                <p className="text-xl mb-4">
                  Apply to our Intro to ML Safety Fellowship, by [Date] here:
                </p>
                <a
                  href="#"
                  className="inline-block bg-cornell-red text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition"
                >
                  CAIA Fellowship
                </a>
              </div> */}
            </div>
            <div className="flex-shrink-0">
              <img
                src="/Title2.jpg"
                alt="AI illustration"
                className="w-[600px] object-contain"
                // className="w-[500px] object-contain -rotate-90"
              />
            </div>
          </div>
        </div>
      </main>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="">
              <p className="text-xl mb-4">
                Managing risks from advanced artificial intelligence is one of
                the most important problems of our time.
                <span className="text-cornell-red">
                  <sup>
                    <a
                      href="https://arxiv.org/pdf/2310.17688"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      1
                    </a>
                  </sup>
                </span>{" "}
                We are a community of student technical and policy researchers
                at Cornell, working to reduce these risks and steer the
                trajectory of AI development for the better.
              </p>

              <p className="text-xl mb-8">
                CAIA runs a semester-long{" "}
                <a
                  href="/get-involved"
                  className="text-cornell-red underline hover:no-underline"
                >
                  Introduction to AI Alignment fellowship
                </a>
                , covering topics like neural network interpretability,
                <span className="text-cornell-red">
                  <sup>
                    <a
                      href="https://distill.pub/2020/circuits/zoom-in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      2
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
                      3
                    </a>
                  </sup>
                </span>{" "}
                goal misgeneralization in reinforcement learning agents,
                <span className="text-cornell-red">
                  <sup>
                    <a
                      href="https://arxiv.org/abs/2105.14111"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      4
                    </a>
                  </sup>
                </span>{" "}
                eliciting latent knowledge,
                <span className="text-cornell-red">
                  <sup>
                    <a
                      href="https://arxiv.org/abs/2212.03827"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      5
                    </a>
                  </sup>
                </span>{" "}
                and evaluating dangerous capabilities in models.
                <span className="text-cornell-red">
                  <sup>
                    <a
                      href="https://evals.alignment.org/Evaluating_LMAs_Realistic_Tasks.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      6
                    </a>
                  </sup>
                </span>{" "}
              </p>

              <p className="text-xl mb-8">
                We also run an intermediate-level{" "}
                <a
                  href="/get-involved"
                  className="text-cornell-red underline hover:no-underline"
                >
                  technical reading group
                </a>
                , where we discuss relevant contemporary ML papers in AI safety.
                Finally, we support undergraduate and graduate students in
                conducting original research relevant to AI safety, and host
                workshops and socials.
              </p>

              <p className="text-xl">
                Interested in helping shape the future of AI safety? Express
                interest in our programs by{" "}
                <a
                  href="https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form"
                  className="inline text-cornell-red underline hover:no-underline"
                >
                  joining our mailing list
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-16 container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl">Upcoming Events</h2>
          <a
            href="https://luma.com/cornellaia"
            className="bg-cornell-red text-bold text-white px-4 py-3 rounded-lg bg-opacity-90 transition w-auto self-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe to our Events Calendar
          </a>
        </div>
        <div className="">
          <iframe
            src="https://luma.com/embed/calendar/cal-NrH7EP037bvvQtm/events?lt=light"
            // width="600"
            className="w-full rounded-lg border min-h-[500px]"
            // height="450"
            // frameBorder="0"
            style={{ border: "1px solid #bfcbda88" }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </section>

      <section className="pt-16 container mx-auto px-4 md:px-12">
        <div className="">
          <h2 className="text-3xl mb-12">Student Research</h2>

          <div className="relative">
        {/* Use grid for responsive layout: 2 cols on small, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <a
          href="https://deceptionsurvey.com/paper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition"
            >
          <div className="aspect-[3/4] relative mb-4">
            <img
              src="/paper-deceptionsurvey.png"
              alt="Paper preview"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-semibold mb-2 text-sm">
            Shadows of Intelligence: A Comprehensive Survey of AI
            Deception
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Survey
            </span>
          </div>
            </a>
          </div>

          <div>
            <a
          href="https://arxiv.org/pdf/2509.01938"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition"
            >
          <div className="aspect-[3/4] relative mb-4">
            <img
              src="/paper-eigenbench.png"
              alt="Paper preview"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-semibold mb-2 text-sm">
            EigenBench: A Comparative Behavior Measure of Value
            Alignment
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Benchmarks
            </span>
          </div>
            </a>
          </div>

          <div>
            <a
          href="https://arxiv.org/abs/2406.20087"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition"
            >
          <div className="aspect-[3/4] relative mb-4">
            <img
              src="/paper-progressgym.png"
              alt="Paper preview"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-semibold mb-2 text-sm">
            ProgressGym: Alignment with a Millennium of Moral Progress
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              NeurIPS 2024
            </span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Benchmarks
            </span>
          </div>
            </a>
          </div>

          <div>
            <a
          href="https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition"
            >
          <div className="aspect-[3/4] relative mb-4">
            <img
              src="/paper-scalinglaws.png"
              alt="Paper preview"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-semibold mb-2 text-sm">
            Scaling laws for contrastive activation addition with
            refusal mechanisms and Llama 2 models
          </h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              SPAR S24
            </span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              Model Steering
            </span>
          </div>
            </a>
          </div>
        </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="">
          <h2 className="text-3xl mb-12">Sponsors and Organizations</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-8">
            {/* <div className="flex items-center justify-center">
              <img
                src="/openphil.png"
                alt="Open Philanthropy"
                className="max-h-24"
              />
            </div> */}
            <div className="flex items-center justify-center">
              <img src="/rand.svg" alt="RAND" className="max-h-24" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/spar.png" alt="Berkeley SPAR" className="max-h-24" />
            </div>

            <div className="flex items-center justify-center">
              <img src="/saif.svg" alt="Safe AI Forum" className="max-h-24" />
            </div>
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="flex items-center justify-center">
              <img src="/anthropic.png" alt="Anthropic" className="max-h-12" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/openai.png" alt="OpenAI" className="max-h-12" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/epoch.png" alt="Epoch AI" className="max-h-12" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/metr.png" alt="METR" className="max-h-12" />
            </div>
          </div> */}

          <p className="text-sm text-gray-600">
            This is a list of some of the organizations our members have worked
            with. Not all organisations listed sponsor or are affiliated with
            CAIA.
          </p>
        </div>
      </section>
    </>
  );
}
