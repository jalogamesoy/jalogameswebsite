export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur">
          Independent Game Studio
        </span>

        <h1 className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
          JaloGames
        </h1>

        <p className="max-w-xl text-balance text-lg leading-relaxed text-white/70 sm:text-xl">
          Crafting unforgettable worlds, one game at a time.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href="#games"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Explore our games
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Get in touch
          </a>
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-white/40">
        &copy; {new Date().getFullYear()} JaloGames. All rights reserved.
      </footer>
    </main>
  );
}
