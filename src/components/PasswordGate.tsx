import { useState, useCallback } from 'react'

const STORAGE_KEY = 'samay-site-auth'
const PASS_HASH = '24616d6179' // hex of '$amay' — lightweight obfuscation, not crypto

function check(input: string): boolean {
  return Array.from(input).map(c => c.charCodeAt(0).toString(16)).join('') === PASS_HASH
}

function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(isAuthed)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = useCallback(() => {
    if (check(value.trim())) {
      try { sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
      setAuthed(true)
    } else {
      setError(true)
      setValue('')
    }
  }, [value])

  if (authed) return <>{children}</>

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="w-full max-w-[360px] text-center">
        <p className="font-display font-bold text-[28px] text-text-light tracking-[0.15em] mb-10">
          SAMAY
        </p>
        <form
          onSubmit={e => { e.preventDefault(); submit() }}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
            className="w-full px-5 py-3.5 rounded-lg bg-dark-lighter border border-white/[0.08] text-text-light font-body text-[15px] placeholder:text-text-light-muted/50 outline-none focus:border-brand transition-colors"
          />
          {error && (
            <p className="font-body text-[13px] text-[#e11d48]">
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-brand hover:bg-brand-light text-text-light font-body text-[15px] font-semibold transition-colors cursor-pointer border-none"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
