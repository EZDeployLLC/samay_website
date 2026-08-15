import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Section from '../components/Section'
import Eyebrow from '../components/Eyebrow'
import FaqItem from '../components/FaqItem'
import NotificationDemo from '../components/NotificationDemo'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

const stats = [
  { num: '$7.4B', label: 'lost per day to inaccurate time tracking in the US alone', source: 'HBR / AffinityLive' },
  { num: '80%', label: 'of timesheets are filled in from memory, days after the work actually happened', source: 'AffinityLive / Accelo' },
  { num: '1 in 3', label: 'billable hours never makes it onto the timesheet when entry is manual', source: 'WorkflowMax / Rize' },
  { num: '60%', label: 'of the workday spent on "work about work" instead of the creative work that drives revenue', source: 'Asana Anatomy of Work Index' },
]

type Feature = { eyebrow: string; title: string; body: string; image: string; contain?: boolean }

const features: Feature[] = [
  {
    eyebrow: 'TIMESHEETS',
    title: 'It figures out the week,\nso nobody has to.',
    body: 'Samay pieces together your team\u2019s week from the tools they already use: calendar, Slack, Figma, Monday. It drafts the timesheet for them. No timers. No forms. Just a draft waiting for a quick review. Works daily or weekly, depending on how your agency tracks time.',
    image: '/images/feature-timesheet.png',
  },
  {
    eyebrow: 'RAMBLE MODE',
    title: 'Just talk about your week.\nSamay does the rest.',
    body: 'Open your phone, tap once, and describe what you worked on in plain language. Samay turns the ramble into structured entries: project codes, hours, descriptions. All drafted and ready for review.',
    image: '/images/feature-ramble.png',
    contain: true,
  },
  {
    eyebrow: 'CHANNELS',
    title: 'Meet creatives\nwhere they are.',
    body: 'A Friday Slack message. A Gmail notification. A WhatsApp nudge. A magic link to a single-page approval. No app to download, no password to remember, no onboarding to survive.',
    image: '/images/feature-channels.png',
  },
  {
    eyebrow: 'PROXY MODE',
    title: 'One view for\nthe whole team.',
    body: 'At large agencies, one person often handles timesheets for an entire group. Samay gives them a single dashboard to switch between people, review drafted entries, and approve in seconds.',
    image: '/images/feature-proxy.png',
  },
  {
    eyebrow: 'CATCH-UP MODE',
    title: 'Months behind?\nCaught up in one sitting.',
    body: 'Weeks or months of missing timesheets, reconstructed from what already happened. Samay drafts every open week at once, so falling behind stops being a lost cause. It becomes an afternoon.',
    image: '/images/feature-catchup.png',
  },
  {
    eyebrow: 'RESOURCE MANAGER',
    title: 'Chase no one.\nSee everyone.',
    body: 'The ops view: who has filed, who hasn\u2019t, and a nudge that goes out from one place. Managers get a live read on capacity, actuals against plan, without sending a single reminder by hand.',
    image: '/images/feature-resource.png',
  },
]

const faqs = [
  { q: 'How does Samay know what to file?', a: 'Samay connects to the tools your team already uses: Google Calendar, Slack, Figma, Monday, and more. It pieces together activity and drafts the entries automatically. No surveillance. No screen recording. Just smart integration.' },
  { q: 'Is this employee monitoring?', a: 'Absolutely not. Samay helps the person doing the admin work, not their manager. There are no productivity metrics, no surveillance dashboards, no accountability trails. Your team stays in control of their own data.' },
  { q: 'How is our data protected?', a: 'Samay reads only the tools you choose to connect, and only to draft entries your team approves. No screen recording, no keylogging. Samay is being built in line with SOC 2 security standards, with formal certification actively underway. A security overview is available for your IT team on request.' },
  { q: 'Can our IT or security team review Samay first?', a: 'Yes. We are happy to walk your team through how Samay handles data and to answer diligence questions before any rollout. Reach us at hello@samayapp.co.' },
  { q: 'What can Samay actually see?', a: 'Only what it needs to draft a timesheet: calendar events and activity signals from the tools you choose to connect. Samay does not record your screen, log keystrokes, or read message contents to monitor anyone. You approve every entry before it is filed.' },
  { q: 'Do you sell our data or train models on it?', a: 'Never. Your data is used to draft your own entries and nothing else. We do not sell it, and we do not use it to train models. It stays yours, and it exports to the systems your Finance team already trusts.' },
  { q: 'Do my creatives need to install anything?', a: 'No. Zero mandatory engagement. Notifications arrive through channels they already use: Slack, Gmail, WhatsApp, or SMS. A magic link opens a single-page approval. No app, no password, no onboarding.' },
  { q: 'What happens to our existing tools?', a: 'Samay complements your current system. It doesn\u2019t replace it. Entries export to Harvest, Accountability, Workamajig, NetSuite, or CSV. Your Finance team keeps the tools they trust.' },
  { q: 'How accurate are the drafts?', a: 'Draft entries target 80 to 90% accuracy based on connected app data. A human always reviews and approves before anything is submitted. Confidence indicators are visible on every entry.' },
  { q: 'How do I get started?', a: 'Book a demo. We connect to your existing tools and have you running live in days, not months. No procurement battle, no IT project.' },
  { q: 'What does it cost?', a: 'Samay is priced per user per month. We offer founding-customer pricing for agencies who join early. Contact us at hello@samayapp.co for details.' },
]

export default function Landing() {
  const heroRef = useRef(null)
  const carouselRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Carousel "breathe" — scales up as it enters center of viewport
  const { scrollYProgress: carouselScroll } = useScroll({
    target: carouselRef,
    offset: ['start end', 'center center'],
  })
  const carouselScale = useTransform(carouselScroll, [0, 1], [0.88, 1]) as MotionValue<number>

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section ref={heroRef} className="relative bg-dark overflow-hidden min-h-screen flex flex-col items-center justify-center pt-[72px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand/5 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-light/5 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-[1000px] mx-auto">
          {/* Text block parallax-fades on scroll; the interactive demo below does not. */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col items-center"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Eyebrow light>FOR CREATIVE AGENCIES</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[32px] sm:text-[40px] md:text-[56px] font-medium text-text-light leading-[1.12] mt-6 mb-6 max-w-[960px]"
            >
              Your creatives do extraordinary work.{' '}
              <span className="text-text-light-muted">Their admin work should take care of itself.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[16px] md:text-[19px] text-text-light-muted leading-[1.6] max-w-[680px] mb-10"
            >
              Start with the timesheet that fills itself in, drafted from the tools your team already uses. The admin that quietly drains your creatives' time, finally handled. No forms. No chasing. No rebuilding Monday from memory on Friday.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="mailto:hello@samayapp.co"
                className="font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-9 py-4 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5">
                Book a Demo
              </a>
              <a href="#features"
                className="font-body text-[15px] font-medium text-text-light-muted border border-text-light-muted/30 hover:border-text-light-muted/60 px-9 py-4 rounded-full transition-all duration-300 no-underline hover:text-text-light">
                See How It Works
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* Carousel lives outside the max-w-[1000px] text container so it can breathe wider */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ scale: carouselScale }}
          className="relative z-10 mt-16 w-full flex justify-center px-6 pb-20 max-w-[1200px] mx-auto"
        >
          <NotificationDemo />
        </motion.div>
      </section>

      {/* Problem */}
      <Section className="bg-warm px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[1120px] mx-auto text-center">
          <Eyebrow>THE PROBLEM</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-dark leading-[1.2] mt-4 mb-5 max-w-[760px] mx-auto">
            By Friday, nobody remembers Monday.
          </h2>
          <p className="font-body text-[16px] md:text-[17px] text-text-body leading-[1.6] mb-12 max-w-[640px] mx-auto">
            Creatives don’t skip timesheets because they’re careless. They skip them because reporting means rebuilding a week they’ve already moved on from. So the “actuals” are never truly actual. Every tool put that burden on the person least able to carry it.
          </p>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <motion.div key={s.num} variants={fadeUp}
                className="bg-white p-5 md:p-8 rounded-lg text-left group hover:shadow-lg hover:shadow-black/5 transition-shadow duration-500"
              >
                <span className="font-display text-[36px] md:text-[42px] font-semibold text-brand block mb-3 group-hover:scale-105 inline-block transition-transform duration-500">{s.num}</span>
                <p className="font-body text-[15px] text-text-body leading-[1.5] mb-3">{s.label}</p>
                <p className="font-mono text-[11px] text-text-muted">Source: {s.source}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-body text-[15px] italic text-text-muted mt-10 max-w-[620px] mx-auto">
            The problem was never careless people. It’s that remembering a week, days later, is the part machines are good at and humans aren’t.
            <span className="block font-mono text-[11px] text-text-muted/70 mt-2 not-italic tracking-wider">ON THE $7.4B/DAY FINDING · HARVARD BUSINESS REVIEW</span>
          </p>
        </div>
      </Section>

      {/* Features */}
      <section id="features" className="bg-white px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[1120px] mx-auto">
          <Section>
            <div className="text-center mb-12 md:mb-28 max-w-[720px] mx-auto">
              <Eyebrow>HOW IT WORKS</Eyebrow>
              <h2 className="font-display text-[28px] md:text-[42px] font-medium text-text-dark leading-[1.15] mt-4">
                From a Friday message to a filed week.
              </h2>
              <p className="font-body text-[16px] md:text-[17px] text-text-body leading-[1.6] mt-5">
                Samay meets your team in the channels they already live in, drafts the week for them, and takes one tap to file. Here’s the whole loop.
              </p>
            </div>
          </Section>
        </div>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-16 md:gap-28">
          {features.map((f, i) => (
            <Section key={f.eyebrow} delay={0.1}>
              <div className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
                <div className="flex-1 min-w-0">
                  <Eyebrow>{f.eyebrow}</Eyebrow>
                  <h3 className="font-display text-[26px] md:text-[36px] font-medium text-text-dark leading-[1.2] mt-3 mb-5 whitespace-pre-line">{f.title}</h3>
                  <p className="font-body text-[16px] text-text-body leading-[1.7]">{f.body}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex-1 min-w-0 w-full aspect-video rounded-2xl overflow-hidden border border-border-light bg-warm flex items-center justify-center"
                >
                  <img
                    src={f.image}
                    alt={f.eyebrow}
                    className={`w-full h-full ${f.contain ? 'object-contain p-4' : 'object-cover object-top'}`}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </motion.div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white px-6 md:px-16 py-12 md:py-20">
        <div className="max-w-[1120px] mx-auto text-center">
          <Eyebrow>INTEGRATIONS</Eyebrow>
          <h2 className="font-display text-[28px] md:text-[36px] font-medium text-text-dark leading-[1.2] mt-4 mb-10 max-w-[600px] mx-auto">
            Works with the tools your agency already uses.
          </h2>
          <div className="space-y-6">
            {[
              { label: 'Channels', items: ['Slack', 'Gmail', 'Google Chat', 'WhatsApp', 'SMS'] },
              { label: 'Connected Apps', items: ['Google Calendar', 'Figma', 'Google Drive', 'Monday.com', 'Smartsheet'] },
              { label: 'Exports To', items: ['Harvest', 'Accountability', 'Workamajig', 'Advantage', 'NetSuite', 'CSV'] },
            ].map((row) => (
              <div key={row.label} className="flex flex-col items-center gap-3">
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase">{row.label}</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {row.items.map((item) => (
                    <span key={item} className="font-body text-[14px] text-text-dark bg-warm px-4 py-1.5 rounded-full border border-border-light">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <Section dark className="px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[1120px] mx-auto text-center">
          <Eyebrow light>WHY WE'RE DIFFERENT</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[44px] font-medium text-text-light leading-[1.15] mt-4 mb-12 max-w-[800px] mx-auto">
            Every other tool asks your team to do the work. Samay does the work for them.
          </h2>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-10"
          >
            <motion.div variants={fadeUp} className="bg-white/[0.06] border border-white/[0.08] p-8 rounded-lg text-left">
              <h3 className="font-display text-[18px] font-medium text-text-light-muted mb-5">Traditional tools</h3>
              <ul className="space-y-3">
                {['Timer-based', 'Requires daily discipline', 'Desktop or mobile app', 'Productivity scores', 'Onboarding and training'].map((item) => (
                  <li key={item} className="font-body text-[15px] text-text-light-muted/60 leading-[1.5] flex items-start gap-2">
                    <span className="text-text-light-muted/30 mt-0.5">&times;</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-brand/10 border border-brand/20 p-8 rounded-lg text-left">
              <h3 className="font-display text-[18px] font-medium text-text-light mb-5">Samay</h3>
              <ul className="space-y-3">
                {['Observation-based', 'Requires one tap to approve', 'Channel-first: Slack, Gmail, WhatsApp', 'No surveillance, no scores', 'No onboarding required'].map((item) => (
                  <li key={item} className="font-body text-[15px] text-text-light leading-[1.5] flex items-start gap-2">
                    <span className="text-brand-light mt-0.5">&#10003;</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Social Proof / Testimonials */}
      <Section className="bg-warm px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[1120px] mx-auto text-center">
          <Eyebrow>EARLY PARTNERS</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-dark leading-[1.2] mt-4 mb-12 max-w-[700px] mx-auto">
            Built with the agencies who live this problem every day.
          </h2>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-10"
          >
            {[
              { text: '"I have never been this excited about timesheets."', role: 'Global Account Director, Full-Service Agency' },
              { text: '"You hit the problem head on. This is exactly what we need."', role: 'Head of IT, Creative Agency' },
              { text: '"Comparing creative work to quantifiable tasks is like trying to weigh flour with a tape measure."', role: 'Creative Professional' },
              { text: '"Getting paid for all the work your agency does will add at least 10% to revenue. The data has to be right first."', role: 'Agency Management Consultant' },
            ].map((q) => (
              <motion.div key={q.role} variants={fadeUp}
                className="bg-white p-5 md:p-8 rounded-lg text-left border border-border-light"
              >
                <p className="font-display italic text-[18px] md:text-[20px] text-text-dark leading-[1.5] mb-5">{q.text}</p>
                <p className="font-body text-[13px] font-medium text-text-muted">{q.role}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-body text-[15px] text-text-body mb-8">
            We're working closely with creative agencies to build something that actually fits. Interested in joining?
          </p>
          <a href="mailto:hello@samayapp.co"
            className="inline-block font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-9 py-4 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5">
            Contact Us
          </a>
        </div>
      </Section>

      {/* Trust / Security */}
      <Section className="bg-white px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[1120px] mx-auto text-center">
          <Eyebrow>SECURITY &amp; PRIVACY</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-dark leading-[1.2] mt-4 mb-5 max-w-[700px] mx-auto">
            Built to help, not to watch.
          </h2>
          <p className="font-body text-[16px] md:text-[17px] text-text-body leading-[1.6] mb-12 max-w-[640px] mx-auto">
            Samay serves the person doing the admin, never their manager. There is nothing here to surveil your team with. That is a design decision, not a setting you can switch on.
          </p>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            {[
              { h: 'Not a monitoring tool', b: 'No productivity scores. No surveillance dashboards. No activity trails. Samay drafts a timesheet for someone to review. It never reports on your people.' },
              { h: 'Only what you connect', b: 'Samay reads the tools you choose to connect, and only to draft entries you approve. No screen recording. No keylogging. Your team stays in control of their own data.' },
              { h: 'Security aligned with SOC 2', b: 'Samay is being built in line with SOC 2 security standards, with formal certification actively underway. A security overview is available for your IT team on request.' },
            ].map((c) => (
              <motion.div key={c.h} variants={fadeUp}
                className="bg-white p-8 rounded-lg border border-border-light"
              >
                <h3 className="font-display text-[21px] font-medium text-text-dark mb-3">{c.h}</h3>
                <p className="font-body text-[15px] text-text-body leading-[1.6]">{c.b}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Bigger Picture */}
      <Section dark className="px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[680px] mx-auto text-center">
          <Eyebrow light>THE BIGGER PICTURE</Eyebrow>
          <h2 className="font-display text-[36px] md:text-[44px] font-medium text-text-light leading-[1.15] mt-4 mb-8">
            More than timesheets.
          </h2>
          <div className="font-body text-[17px] text-text-light-muted leading-[1.75] space-y-6 text-center">
            <p>
              Behind every timesheet is a bigger question: are we using our creative talent well, and pricing and staffing our work fairly?
            </p>
            <p>
              Samay starts with the timesheet that fills itself in. But the bigger opportunity is what accurate data unlocks: helping agencies understand how creative capacity flows, so they can protect their people, retain their talent, and run a healthier business.
            </p>
            <p className="text-text-light font-medium font-display text-[20px]">
              Creative capital management. That's the real mission.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-warm px-6 md:px-16 py-16 md:py-32">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-[36px] md:text-[40px] font-medium text-text-dark mb-10">Questions</h2>
          <div>
            {faqs.map((f) => <FaqItem key={f.q} question={f.q} answer={f.a} />)}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark className="px-6 md:px-16 py-28 md:py-36">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display text-[36px] md:text-[44px] font-medium text-text-light leading-[1.2] mb-4">
            Let your creatives do what they do best.
          </h2>
          <p className="font-body text-[18px] text-text-light-muted mb-8">Samay takes care of the rest.</p>
          <a href="mailto:hello@samayapp.co"
            className="inline-block font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-10 py-4 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5 mb-6">
            Book a Demo
          </a>
        </div>
      </Section>
    </motion.main>
  )
}
