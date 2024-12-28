export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-cornell-red mb-4">
              AI will change the world as we know it.
            </h1>

            <p className="text-xl italic mb-4">
              let's ensure those changes are positive.
            </p>

            <a
              href="#"
              className="text-xl text-gray-600 hover:underline mb-8 inline-block"
            >
              Join our mailing list →
            </a>

            <div className="mb-12 mt-8">
              <p className="text-xl mb-4">
                Apply to our Intro to ML Safety Fellowship, by [Date] here:
              </p>
              <a
                href="#"
                className="inline-block bg-cornell-red text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition"
              >
                CAIA Fellowship
              </a>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-xl mb-8">
              We're a group of Cornell students dedicated to reducing risks from
              advanced artificial intelligence and shaping its development for
              the better.
            </p>

            <p className="text-xl mb-8">
              We think that reducing risks from advanced AI is one of the most
              important problems of our time. Experts anticipate that we will
              see human-level AI within our lifetimes, but aligning these
              systems with human values is a daunting and neglected technical
              and policy problem. The stakes are also enormous: success could
              bring about unprecedented human flourishing, while failure could
              result in human disempowerment or even extinction. We also think
              that AI safety a highly interesting and exciting problem, with
              open opportunities for many more researchers to make progress on
              it.
            </p>

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
              Interested in helping shape the future of AI safety?
            </p>

            <div className="space-y-4">
              <a href="#" className="block text-cornell-red hover:underline">
                Apply to our introductory AI alignment fellowship
              </a>
              <a href="#" className="block text-cornell-red hover:underline">
                Apply to our reading groups
              </a>
              <a href="#" className="block text-cornell-red hover:underline">
                Join our mailing list
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-mono mb-12">Selected Research</h2>

          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden">
              <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-4">
                {/* Paper Card 1 */}
                <div className="min-w-[200px] flex-shrink-0 snap-start">
                  <div className="aspect-[1308/1696] relative mb-4">
                    <img
                      src="/paper-preview-1.png"
                      alt="Paper preview"
                      className="w-full h-full object-cover"
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

                {/* Paper Card 2 */}
                <div className="min-w-[200px] flex-shrink-0 snap-start">
                  <div className="aspect-[1308/1696] relative mb-4">
                    <img
                      src="/paper-preview-2.png"
                      alt="Paper preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">
                    Open Problems and Fundamental Limitations of RLHF
                  </h3>
                  <p className="text-gray-600 mb-2 text-sm">
                    Stephen Casper, Tony Wang, Eric J. Michaud
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      RLHF
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
        <div className="max-w-4xl">
          <h2 className="text-3xl font-mono mb-12">
            Organizations we work with
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-8">
            <div className="flex items-center justify-center">
              <img src="/assets/rand.svg" alt="RAND" className="max-h-16" />
            </div>
            {/* <div className="flex items-center justify-center">
              <img src="/csai.png" alt="MIT CSAI" className="max-h-16" />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/eleutherai.png"
                alt="EleutherAI"
                className="max-h-16"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/redwood.png"
                alt="Redwood Research"
                className="max-h-16"
              />
            </div> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
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
          </div>

          <p className="text-sm text-gray-600">
            This is a list of some of the organizations our members have worked
            with. Not all organisations listed endorse or are affiliated with
            CAIA.
          </p>
        </div>
      </section>
    </>
  );
}
