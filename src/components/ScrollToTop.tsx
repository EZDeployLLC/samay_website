import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-brand hover:bg-brand-light text-text-light flex items-center justify-center shadow-lg shadow-black/20 transition-colors duration-300 cursor-pointer border-none"
          aria-label="Scroll to top"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14V4M4 8l5-5 5 5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
