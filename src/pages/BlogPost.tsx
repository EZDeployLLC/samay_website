import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPostBySlug } from '../data/blogPosts'
import Markdown from '../components/Markdown'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="bg-dark pt-[72px]">
        <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body text-[13px] text-text-light-muted hover:text-text-light transition-colors no-underline mb-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] text-brand-light tracking-wider mb-4">{post.tag.toUpperCase()}</p>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[26px] sm:text-[32px] md:text-[42px] font-medium text-text-light leading-[1.15] mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[17px] text-text-light-muted leading-[1.6] mb-8 italic"
          >
            {post.subtitle}
          </motion.p>

          {/* Date / author */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="font-mono text-[11px] text-text-light-muted/50 tracking-wider">{post.date}</span>
            <span className="text-text-light-muted/20">&middot;</span>
            <span className="font-mono text-[11px] text-text-light-muted/50 tracking-wider">{post.author}</span>
          </motion.div>

          {/* Hero image or gradient */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.45, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            {post.image ? (
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.06]">
                <img src={post.image} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ) : (
              <div className={`aspect-[16/9] rounded-xl bg-gradient-to-br ${post.gradient} bg-dark-lighter border border-white/[0.06]`} />
            )}
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.55, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <Markdown content={post.raw} />
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 pt-10 border-t border-white/[0.06] text-center"
          >
            <p className="font-display text-[22px] font-medium text-text-light mb-3">
              Want to learn more?
            </p>
            <p className="font-body text-[15px] text-text-light-muted mb-6">
              See how Samay handles timesheets for creative agencies.
            </p>
            <a
              href="mailto:hello@samayapp.co"
              className="inline-block font-body text-[14px] font-semibold text-text-light bg-brand hover:bg-brand-light px-8 py-3.5 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
