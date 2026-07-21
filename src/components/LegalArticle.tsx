import { motion } from 'framer-motion'
import Eyebrow from './Eyebrow'
import Markdown from './Markdown'

interface LegalArticleProps {
  kicker: string
  title: string
  effective: string
  updated: string
  version: string
  content: string
}

export default function LegalArticle({ kicker, title, effective, updated, version, content }: LegalArticleProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <section className="bg-dark pt-[72px]">
        <div className="max-w-[820px] mx-auto px-6 py-20 md:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow light>{kicker}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[36px] md:text-[46px] font-medium text-text-light leading-[1.15] mt-5 mb-6"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 font-mono text-[12px] text-text-light-muted"
          >
            <span>Effective: {effective}</span>
            <span className="hidden sm:inline text-text-light-muted/40">·</span>
            <span>Last updated: {updated}</span>
            <span className="hidden sm:inline text-text-light-muted/40">·</span>
            <span>Version {version}</span>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-warm px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-[820px] mx-auto">
          <Markdown content={content} className="legal-content" />
        </div>
      </section>
    </motion.main>
  )
}
