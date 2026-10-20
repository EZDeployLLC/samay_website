import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Updates from './pages/Updates'
import ComingSoonA from './pages/ComingSoonA'
import ComingSoonB from './pages/ComingSoonB'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PasswordGate from './components/PasswordGate'

function OldSite() {
  const location = useLocation()
  return (
    <PasswordGate>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/updates" element={<Updates />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </PasswordGate>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoonB />} />
      <Route path="/option-a" element={<ComingSoonA />} />
      <Route path="/old/*" element={<OldSite />} />
    </Routes>
  )
}
