import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isResourcesPage = ['/blog', '/updates', '/privacy'].includes(location.pathname)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 sm:px-8 md:px-16 h-[72px]">
        <Link
          to="/"
          className="font-display font-bold text-[22px] text-text-light no-underline hover:opacity-80 transition-opacity tracking-[0.15em]"
        >
          SAMAY
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className={`font-body text-[15px] no-underline transition-colors ${
              location.pathname === '/about' ? 'text-text-light' : 'text-text-light-muted hover:text-text-light'
            }`}
          >
            About
          </Link>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className={`font-body text-[15px] transition-colors bg-transparent border-none cursor-pointer ${
                isResourcesPage ? 'text-text-light' : 'text-text-light-muted hover:text-text-light'
              }`}
            >
              Resources
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-dark-lighter border border-white/[0.08] rounded-lg py-2 min-w-[160px] shadow-xl shadow-black/30"
                >
                  <Link
                    to="/blog"
                    className="block px-5 py-2.5 font-body text-[14px] text-text-light-muted hover:text-text-light hover:bg-white/[0.04] transition-colors no-underline"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/updates"
                    className="block px-5 py-2.5 font-body text-[14px] text-text-light-muted hover:text-text-light hover:bg-white/[0.04] transition-colors no-underline"
                  >
                    Updates
                  </Link>
                  <Link
                    to="/privacy"
                    className="block px-5 py-2.5 font-body text-[14px] text-text-light-muted hover:text-text-light hover:bg-white/[0.04] transition-colors no-underline"
                  >
                    Privacy
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="https://app.samayapp.co/"
            className="font-body text-[15px] text-text-light-muted hover:text-text-light transition-colors no-underline"
          >
            Login
          </a>
          <a
            href="mailto:hello@samayapp.co"
            className="font-body text-[14px] font-semibold text-text-light bg-brand hover:bg-brand-light px-7 py-3 rounded-full transition-colors no-underline"
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] bg-transparent border-none cursor-pointer"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="block w-6 h-[2px] bg-text-light rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[2px] bg-text-light rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="block w-6 h-[2px] bg-text-light rounded-full"
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              <Link
                to="/about"
                className="font-body text-[16px] text-text-light-muted hover:text-text-light no-underline py-3"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="font-body text-[16px] text-text-light-muted hover:text-text-light no-underline py-3"
              >
                Blog
              </Link>
              <Link
                to="/updates"
                className="font-body text-[16px] text-text-light-muted hover:text-text-light no-underline py-3"
              >
                Updates
              </Link>
              <Link
                to="/privacy"
                className="font-body text-[16px] text-text-light-muted hover:text-text-light no-underline py-3"
              >
                Privacy
              </Link>
              <a
                href="https://app.samayapp.co/"
                className="font-body text-[16px] text-text-light-muted hover:text-text-light no-underline py-3"
              >
                Login
              </a>
              <a
                href="mailto:hello@samayapp.co"
                className="font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-7 py-3.5 rounded-full transition-colors no-underline text-center mt-3 mb-1"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
