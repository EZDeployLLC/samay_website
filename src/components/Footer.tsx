import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark px-8 md:px-16 py-10 border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0">
        <div className="flex-1 flex justify-center md:justify-start items-center gap-3">
          <span className="font-display font-bold text-[18px] text-text-light-muted tracking-[0.15em]">SAMAY</span>
          <span className="font-body text-[12px] text-text-light-muted/60">
            &copy; {new Date().getFullYear()} Samay LLC
          </span>
        </div>
        <div className="flex-1 flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <Link to="/about" className="font-body text-[13px] text-text-light-muted hover:text-text-light transition-colors no-underline">About</Link>
          <Link to="/blog" className="font-body text-[13px] text-text-light-muted hover:text-text-light transition-colors no-underline">Blog</Link>
          <a href="mailto:hello@samayapp.co" className="font-body text-[13px] text-text-light-muted hover:text-text-light transition-colors no-underline">Contact</a>
          <Link to="/privacy" className="font-body text-[13px] text-text-light-muted hover:text-text-light transition-colors no-underline">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
