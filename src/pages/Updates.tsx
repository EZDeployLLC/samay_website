import { motion } from 'framer-motion'
import Section from '../components/Section'
import Eyebrow from '../components/Eyebrow'

const milestones = [
  {
    status: 'complete' as const,
    title: 'Research & Discovery',
    date: 'Mar \u2013 May 2026',
    description: 'In-depth interviews with agency professionals across creative operations, executive assistance, and IT leadership. Mapped the jobs-to-be-done framework and validated the core problem: timesheet tools are built for the wrong person.',
  },
  {
    status: 'complete' as const,
    title: 'Strategy & Design',
    date: 'May \u2013 Jun 2026',
    description: 'Built the strategic foundation, defined personas across four champion paths, and ran six rounds of design iteration. Over 200 artboards across individual, proxy, channel, catch-up, and admin workflows. Established the visual-first pie chart system and channel-first interaction model.',
  },
  {
    status: 'complete' as const,
    title: 'Product Validation & MVP Direction',
    date: 'Jun 2026',
    description: 'Built a fully interactive prototype with 55+ screens and validated the product direction with agency professionals. The pie chart visual and team management workflow resonated immediately with every person we showed it to.',
  },
  {
    status: 'current' as const,
    title: 'Private Pilots',
    date: 'Jul 2026',
    description: 'Working closely with select creative agencies to validate the product in real workflows. Gathering feedback from operations, creative, and agency leadership. Iterating on integrations and the drafting engine.',
  },
  {
    status: 'upcoming' as const,
    title: 'Scaled Development',
    date: 'Q3 2026',
    description: 'Building the production application. Core features: auto-drafted timesheets from connected tools, team management mode, channel-first notifications via Slack and WhatsApp, and integration with Harvest, NetSuite, and Monday.',
  },
  {
    status: 'upcoming' as const,
    title: 'Early Access',
    date: 'Q4 2026',
    description: 'Opening access to a broader group of creative agencies. Expanding integrations and refining drafting accuracy based on pilot learnings.',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Updates() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <section className="bg-dark pt-[72px]">
        <div className="max-w-[750px] mx-auto text-center px-6 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow light>PRODUCT UPDATES</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[36px] md:text-[44px] font-medium text-text-light leading-[1.2] mt-6 mb-6"
          >
            Building in the open.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[17px] text-text-light-muted leading-[1.75]"
          >
            We believe the agencies we're building for should see how the product takes shape. Here's where we are.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <Section className="bg-warm px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-border-light" />

            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className={`relative flex gap-4 md:gap-8 ${i < milestones.length - 1 ? 'pb-8 md:pb-12' : ''}`}
              >
                {/* Status dot */}
                <div className="relative z-10 flex-shrink-0 mt-1.5">
                  {m.status === 'current' ? (
                    <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-brand/15 flex items-center justify-center">
                      <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-brand animate-pulse" />
                    </div>
                  ) : m.status === 'complete' ? (
                    <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-brand/10 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brand">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-warm-dark flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-border-medium" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className={`font-display text-[20px] md:text-[24px] font-medium leading-[1.3] ${
                      m.status === 'upcoming' ? 'text-text-muted' : 'text-text-dark'
                    }`}>
                      {m.title}
                    </h3>
                    {m.status === 'current' && (
                      <span className="font-mono text-[10px] text-brand tracking-wider uppercase bg-brand/10 px-2 py-0.5 rounded">Current</span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-text-muted tracking-wider mb-3">{m.date}</p>
                  <p className={`font-body text-[15px] leading-[1.7] ${
                    m.status === 'upcoming' ? 'text-text-muted' : 'text-text-body'
                  }`}>
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display text-[30px] md:text-[36px] font-medium text-text-light leading-[1.2] mb-4">
            Want to be part of the journey?
          </h2>
          <p className="font-body text-[16px] text-text-light-muted mb-8">
            We're looking for creative agencies to join our private pilot.
          </p>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
            className="inline-block font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-9 py-4 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5">
            Book a Demo
          </a>
        </div>
      </Section>
    </motion.main>
  )
}
