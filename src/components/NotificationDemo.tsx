import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * HeroSlider: auto-advancing screenshot carousel showing the full Samay loop.
 *   1. Slack notification with drafted timesheet
 *   2. Filed in Slack
 *   3. Gmail notification
 *   4. Web app with pre-filled timesheet
 *   5. Web app filed state
 */

const SLIDES = [
  {
    image: '/images/hero-slack-draft.png',
    label: 'Your timesheet arrives in Slack, already drafted.',
  },
  {
    image: '/images/hero-slack-filed.png',
    label: 'Filed from Slack. The whole week, handled.',
  },
  {
    image: '/images/hero-gmail-notification.png',
    label: 'Or approve straight from Gmail. One click, same result.',
  },
  {
    image: '/images/hero-web-filled.png',
    label: 'Every entry pre-filled from the tools you already use.',
  },
  {
    image: '/images/hero-web-filed.png',
    label: 'Reviewed, confirmed, done. Time given back.',
  },
]

const INTERVAL = 4000

export default function NotificationDemo() {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    const t = setInterval(next, reduce ? 2000 : INTERVAL)
    return () => clearInterval(t)
  }, [next, reduce])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.06] bg-[#f4f2ed]"
    >
      {/* image area — fixed aspect ratio to prevent layout jumps */}
      <div className="relative aspect-video overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={SLIDES[current].image}
            alt={SLIDES[current].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
      </div>

      {/* caption + dots */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-t border-[#e8e5e0]">
        <p className="font-body text-[13px] text-[#4b4a48] leading-[1.4]">
          {SLIDES[current].label}
        </p>
        <div className="flex items-center gap-1.5 shrink-0 ml-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer p-0"
              style={{
                width: current === i ? 18 : 6,
                background: current === i ? '#1f513f' : '#d5cfc3',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
