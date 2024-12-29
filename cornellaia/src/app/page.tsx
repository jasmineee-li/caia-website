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
          <div className="max-w-4xl">
            <h1
              className={`text-6xl font-bold text-cornell-red mb-8 tracking-tighter ${youngSerif.className}`}
            >
              AI will change the world as we know it.
            </h1>

            <p className="text-xl italic mb-8">
              Let&apos;s ensure those changes are positive.
            </p>
            <a
              href="https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form"
              className="text-xl text-gray-600 hover:underline mb-4 inline-block"
            >
              Join our mailing list →
            </a>
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
        </div>
      </main>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              We&apos;re a group of Cornell students dedicated to reducing risks
              from advanced artificial intelligence and shaping its development
              for the better.
            </p>

            <p className="text-xl mb-4">
              We think that reducing risks from advanced AI is{" "}
              <span className="italic text-cornell-red">
                one of the most important problems of our time
              </span>
              . Why?
            </p>

            <div className="text-lg mb-8 space-y-2">
              <p className={`pl-4 ${youngSerif.className}`}>
                <span className="text-cornell-red">1.</span> Experts predict
                that we likely will see human-level AI within our lifetimes.
              </p>
              <p className={`pl-4 ${youngSerif.className}`}>
                <span className="font-bold text-cornell-red">2.</span> Aligning
                powerful AI systems with human values is an extremely difficult,
                and currently neglected, technical and policy problem.
              </p>
              <p className={`pl-4 ${youngSerif.className}`}>
                <span className="font-bold text-cornell-red">3.</span> The
                stakes of AI alignment are enormous: succeeding could bring
                about unprecedented human flourishing, while failure could
                result in human disempowerment or even extinction.
              </p>
              <p className="text-xl mt-4">
                We also think that AI safety is a highly interesting and
                exciting problem, with open opportunities for many more
                researchers to make meaningful progress.
              </p>
            </div>

            <p className="text-xl mb-8">
              CAIA runs an 8-week introductory AI alignment fellowship, covering
              topics like neural network interpretability, learning from human
              feedback, goal misgeneralization, eliciting latent knowledge, and
              evaluating dangerous model capabilities.
            </p>

            <p className="text-xl mb-8">
              We also run reading groups in technical machine learning and
              policy tracks. Finally, we support undergraduate and graduate
              students in conducting original research relevant to reducing
              risks from advanced AI.
            </p>

            <p className="text-xl mb-8">
              Interested in helping shape the future of AI safety? Express
              interest in our programs by{" "}
              <a
                href="https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form"
                className="inline text-cornell-red hover:underline"
              >
                joining our mailing list
              </a>
              .
            </p>

            <div className="space-y-4">
              {/* <a href="#" className="block text-cornell-red hover:underline">
                Apply to our introductory AI alignment fellowship
              </a>
              <a href="#" className="block text-cornell-red hover:underline">
                Apply to our reading groups
              </a> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="">
          <h2 className="text-3xl mb-12">Selected Research</h2>

          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden">
              <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4">
                <div className="w-[20%] flex-shrink-0 snap-start">
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
                  <p className="text-gray-600 mb-2 text-sm">Jasmine Li</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      NeurIPS 2024
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Benchmarks
                    </span>
                  </div>
                </div>

                <div className="w-[20%] flex-shrink-0 snap-start">
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
                  <p className="text-gray-600 mb-2 text-sm">Jasmine Li</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      SPAR S24
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Model Steering
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-0 top-1/3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              className="absolute right-0 top-1/3 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="">
          <h2 className="text-3xl mb-12">Sponsors and Organizations</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-8">
            <div className="flex items-center justify-center">
              <img
                src="/openphil.png"
                alt="Open Philanthropy"
                className="max-h-24"
              />
            </div>
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
