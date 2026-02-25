import BackLink from "@/components/ui/BackLink";
import FaultyTerminal from "@/components/ui/FaultyTerminal";

export default function NotFound() {
  return (
    <main className="not-found-page w-full">
      <section className="relative h-[100dvh] w-full overflow-hidden">
        <FaultyTerminal
          className="absolute inset-0 z-0"
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.2}
          pause={false}
          scanlineIntensity={0.2}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          mobileCurvature={0}
          tint="#A7EF9E"
          mouseReact
          mouseStrength={0.2}
          pageLoadAnimation
          brightness={0.6}
        />
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="px-6 py-6 text-center text-white sm:px-8">
            <h1
              className="text-4xl font-semibold sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ color: "#ffffff" }}
            >
              404: Not Found
            </h1>
            <p
              className="mt-3 text-sm text-white/90 sm:text-base"
              style={{ color: "rgba(255, 255, 255, 0.92)" }}
            >
              The page you requested does not exist.
            </p>
            <BackLink
              className="focus-ring mt-6 inline-block text-base underline decoration-white/70 underline-offset-4 transition hover:text-white/85 hover:decoration-white"
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
