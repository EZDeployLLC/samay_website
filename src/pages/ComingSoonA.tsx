export default function ComingSoonA() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <header className="px-6 md:px-12 pt-6 md:pt-8 flex-shrink-0">
        <p className="font-display font-bold text-[22px] text-text-light tracking-[0.15em]">
          SAMAY
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 pb-10 gap-8">
        <div className="w-full max-w-[880px]">
          <video
            src="/videos/Introducing-Samay.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full rounded-2xl shadow-2xl shadow-black/40"
          />
        </div>

        <div className="text-center max-w-xl">
          <h1 className="font-display text-[32px] md:text-[44px] font-medium text-text-light leading-tight mb-4">
            Timesheets that fill themselves
          </h1>
          <p className="font-body text-[15px] md:text-[16px] text-text-light-muted leading-relaxed mb-8">
            Built for creative agencies. Coming soon.
          </p>
          <a
            href="mailto:hello@samayapp.co?subject=Waitlist"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand hover:bg-brand-light text-text-light font-body text-[15px] font-semibold transition-colors no-underline"
          >
            Join the waitlist
          </a>
        </div>
      </main>

      <footer className="px-6 md:px-12 pb-6 text-center flex-shrink-0">
        <p className="font-body text-[12px] text-text-light-muted/40">
          &copy; {new Date().getFullYear()} Samay LLC
        </p>
      </footer>
    </div>
  )
}
