import { motion } from 'framer-motion'
import Section from '../components/Section'
import Eyebrow from '../components/Eyebrow'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

const values = [
  { trait: 'Quiet', desc: 'Our product does its most important work without announcing it. No fanfare when the draft is ready. The week ends, the admin is done. That is the whole point.' },
  { trait: 'Precise', desc: 'Confidence indicators on every drafted entry. Campaign-level attribution. Accuracy is the product\u2019s north star. Not speed, not volume.' },
  { trait: 'Protective', desc: 'Every design decision asks: does this put burden back on the person we\u2019re supposed to serve? If yes, it doesn\u2019t ship.' },
  { trait: 'Warm', desc: 'We speak to people doing emotionally taxing, unrecognized work. We never talk down. We never create urgency. We never add to the pile.' },
]

const team = [
  { name: 'Payal Ramakrishnan', url: 'https://www.linkedin.com/in/payal-ramakrishnan/', image: '/images/payal_dp.jpeg' },
  { name: 'Vivek Vijayachandran', url: 'https://www.linkedin.com/in/vivekvijayachandran/', image: '/images/vivek_dp.jpg' },
]

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mission */}
      <section className="bg-dark pt-[72px]">
        <div className="max-w-[750px] mx-auto text-center px-6 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow light>OUR MISSION</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-medium text-text-light leading-[1.2] mt-6 mb-8"
          >
            The record of how creative work gets done should reflect what actually happened.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[17px] text-text-light-muted leading-[1.75]"
          >
            Every staffing decision, every profitability call, every "do we need more people" conversation at a creative agency runs on timesheet data. That data is currently built on guesswork. Not because creatives are lazy, but because every tool in the market put the burden of reporting on the wrong person.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <Section className="bg-warm px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[720px] mx-auto">
          <Eyebrow>OUR STORY</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-dark leading-[1.2] mt-3 mb-8">
            Why we built Samay
          </h2>
          <div className="aspect-[16/9] rounded-xl overflow-hidden mb-10">
            <img src="/images/team-collaboration.jpg" alt="Team collaboration" className="w-full h-full object-cover" />
          </div>
          <div className="font-body text-[16px] text-text-body leading-[1.8] space-y-6">
            <p>
              We started by sitting with creatives. The writers, designers, and producers whose work defines the world's most recognized brands. We wanted to understand why the most talented people in the room were the ones most frustrated by their tools.
            </p>
            <p>
              What we heard surprised us. It wasn't just that timesheets were tedious. It was that the entire system felt like an insult: asking people who think in ideas, tone, and craft to quantify their days in fifteen-minute increments. The tools weren't built for how creatives actually work.
            </p>
            <p>
              Then we discovered something else: at agencies with 150 to 350 people, creatives rarely file their own timesheets at all. Executive assistants and coordinators spend hours every Friday reconstructing someone else's week from calendar entries, Slack threads, and institutional knowledge. No tool was built for them either.
            </p>
            <p>
              So we built Samay for both: the creative who shouldn't have to think about admin, and the coordinator who deserves a tool that actually helps.
            </p>
            <p className="text-text-dark font-medium">
              The name Samay (suh-my) means time in Sanskrit. But the product is really about giving time back. To the creatives who just want to make things, and to the people who take care of everything else.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-white px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[1120px] mx-auto">
          <Eyebrow>HOW WE BUILD</Eyebrow>
          <h2 className="font-display text-[32px] md:text-[40px] font-medium text-text-dark leading-[1.2] mt-3 mb-12">
            Our principles
          </h2>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div key={v.trait} variants={fadeUp}
                className="border border-border-light rounded-lg p-7 group hover:border-brand/30 transition-colors duration-500"
              >
                <h3 className="font-display text-[24px] font-medium text-text-dark mb-4 group-hover:text-brand transition-colors duration-500">{v.trait}</h3>
                <p className="font-body text-[14px] text-text-body leading-[1.7]">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-warm px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-display text-[30px] md:text-[36px] font-medium text-text-dark leading-[1.2] mb-6">
            Built by people who've seen this problem up close.
          </h2>
          <p className="font-body text-[16px] text-text-body leading-[1.7] mb-12">
            Founded by two people with deep experience across creative agencies, enterprise technology, and product strategy. We've sat in the rooms where timesheet data drives staffing decisions, and watched that data fail the people who depend on it most.
          </p>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 max-w-[400px] mx-auto gap-8 mb-12"
          >
            {team.map((m) => (
              <motion.div key={m.name} variants={fadeUp} className="flex flex-col items-center gap-3">
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 no-underline group">
                  <div className="w-20 h-20 rounded-full overflow-hidden group-hover:ring-2 ring-brand/30 transition-all">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-body text-[15px] font-medium text-text-dark group-hover:text-brand transition-colors">{m.name}</p>
                </a>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-body text-[14px] text-text-muted mb-8">
            Currently in private pilot with select creative agencies.
          </p>
          <a href="mailto:hello@samayapp.co"
            className="inline-block font-body text-[15px] font-semibold text-text-light bg-brand hover:bg-brand-light px-9 py-4 rounded-full transition-all duration-300 no-underline hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5">
            Get in Touch
          </a>
        </div>
      </Section>
    </motion.main>
  )
}
