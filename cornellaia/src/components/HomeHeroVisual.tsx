import Image from "next/image";

export default function HomeHeroVisual({ src }: { src: string }) {
  return (
    <div className="relative isolate mx-auto aspect-[1030/960] w-full max-w-[27rem]">
      <div
        aria-hidden="true"
        className="absolute left-0 top-[34.896%] aspect-square w-[60.68%] border border-slate-800/80 bg-white"
      />
      <div
        aria-hidden="true"
        className="absolute left-[14.466%] top-[8.333%] aspect-square w-[77.767%] bg-white"
      />
      <div className="absolute right-0 top-0 aspect-square w-[77.767%]">
        <Image
          src={src}
          alt="Robot hand"
          fill
          priority
          sizes="(max-width: 480px) 72vw, 336px"
          className="object-cover"
          quality={80}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[14.466%] top-[8.333%] aspect-square w-[77.767%] border border-slate-800/80"
      />
    </div>
  );
}
