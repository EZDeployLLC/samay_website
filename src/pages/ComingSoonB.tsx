import { useState, useCallback } from 'react'

const SHEET_URL = import.meta.env.VITE_WAITLIST_URL as string | undefined

export default function ComingSoonB() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) return

    setStatus('sending')
    try {
      if (SHEET_URL) {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ email: trimmed }),
        })
      }
      setStatus('sent')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }, [email])

  return (
    <div className="min-h-screen lg:h-screen bg-warm flex flex-col lg:overflow-hidden">
      <header className="px-6 lg:px-10 pt-6 lg:pt-8 flex-shrink-0">
        <p className="font-display font-bold text-[22px] text-text-dark tracking-[0.15em]">
          SAMAY
        </p>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center px-6 lg:px-10 pb-8 lg:pb-10 pt-6 lg:pt-0 gap-8 lg:gap-12 min-h-0">
        {/* Video */}
        <div className="w-full lg:w-1/2 flex-shrink-0 lg:h-full flex items-center">
          <video
            src="/videos/Introducing-Samay.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full rounded-2xl lg:max-h-[calc(100vh-140px)] object-contain"
          />
        </div>

        {/* Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-4 max-w-lg">
          <h1 className="font-display text-[32px] lg:text-[42px] font-medium text-text-dark leading-[1.15] mb-5">
            Timesheets that fill themselves
          </h1>
          <p className="font-body text-[15px] lg:text-[17px] text-text-body leading-relaxed mb-4">
            Samay drafts your team's timesheets from the tools they already use.
            A weekly nudge in their channel, a quick visual review, and they're
            filed. No tracking apps. No compliance chase.
          </p>
          <p className="font-body text-[13px] lg:text-[14px] text-text-muted mb-8">
            Built for creative agencies. Coming soon.
          </p>

          {status === 'sent' ? (
            <p className="font-body text-[15px] text-brand font-medium">
              You're on the list. We'll be in touch.
            </p>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                placeholder="harriet@undergroundrailroad.com"
                required
                className="flex-1 min-w-0 px-5 py-3.5 rounded-full border border-border-medium bg-white text-text-dark font-body text-[15px] placeholder:text-text-muted/50 outline-none focus:border-brand transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-7 py-3.5 rounded-full bg-brand hover:bg-brand-light text-text-light font-body text-[15px] font-semibold transition-colors cursor-pointer border-none whitespace-nowrap disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Get updates'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="font-body text-[13px] text-[#e11d48] mt-3">
              Something went wrong. Try again, or email hello@samayapp.co.
            </p>
          )}
        </div>
      </main>

      <footer className="px-6 lg:px-10 pb-5 flex-shrink-0 flex items-center justify-between">
        <p className="font-body text-[12px] text-text-muted/60">
          &copy; {new Date().getFullYear()} Samay LLC
        </p>
        <a
          href="mailto:hello@samayapp.co"
          className="font-body text-[12px] text-text-muted/60 hover:text-text-muted transition-colors no-underline"
        >
          hello@samayapp.co
        </a>
      </footer>
    </div>
  )
}
