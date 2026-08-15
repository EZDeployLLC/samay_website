import post01 from '../content/blog/01_the_reconstruction_problem.md?raw'
import post02 from '../content/blog/02_the_invisible_workforce.md?raw'
import post03 from '../content/blog/03_the_admin_tax.md?raw'
import post04 from '../content/blog/04_the_revenue_you_cant_see.md?raw'
import post05 from '../content/blog/05_designing_for_neurodivergent_majority.md?raw'
import post06 from '../content/blog/06_why_creatives_hate_every_tool.md?raw'
import post07 from '../content/blog/07_timesheets_are_just_the_start.md?raw'
import post08 from '../content/blog/08_meet_them_where_they_are.md?raw'
import post09 from '../content/blog/09_the_1800_hour_question.md?raw'

export interface BlogPost {
  id: number
  slug: string
  title: string
  subtitle: string
  excerpt: string
  date: string
  author: string
  tag: string
  gradient: string
  image?: string
  raw: string
  hidden?: boolean
}

function parsePost(raw: string): { title: string; subtitle: string; body: string } {
  const lines = raw.split('\n')
  let title = ''
  let subtitle = ''
  let bodyStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!title && line.startsWith('# ')) {
      title = line.replace(/^# /, '')
    } else if (!subtitle && line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      subtitle = line.replace(/^\*/, '').replace(/\*$/, '')
    } else if (!bodyStart && line === '---' && i > 0) {
      bodyStart = i + 1
      break
    }
  }

  // Find the last --- to exclude the footer CTA
  let bodyEnd = lines.length
  for (let i = lines.length - 1; i > bodyStart; i--) {
    if (lines[i] === '---') {
      bodyEnd = i
      break
    }
  }

  const body = lines.slice(bodyStart, bodyEnd).join('\n').trim()
  return { title, subtitle, body }
}

const parsed = [post01, post02, post03, post04, post05, post06, post07, post08, post09].map(parsePost)

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: 'the-reconstruction-problem',
    title: parsed[0].title,
    subtitle: parsed[0].subtitle,
    excerpt: 'The US economy loses $7.4 billion per day to inaccurate time tracking. The cognitive science behind why your team can\u2019t reconstruct their week from memory.',
    date: 'APR 8, 2026',
    author: 'Samay Team',
    tag: 'Research',
    gradient: 'from-brand/40 to-[#2563eb]/20',
    image: '/images/blog/time-memory.jpg',
    raw: parsed[0].body,
  },
  {
    id: 2,
    slug: 'the-invisible-workforce',
    title: parsed[1].title,
    subtitle: parsed[1].subtitle,
    excerpt: 'At agencies with 150+ people, EAs and coordinators file timesheets for entire teams. No tool was built for them. Until now.',
    date: 'APR 19, 2026',
    author: 'Samay Team',
    tag: 'Product',
    gradient: 'from-[#ea580c]/40 to-[#e11d48]/20',
    image: '/images/blog/office-work.jpg',
    raw: parsed[1].body,
  },
  {
    id: 3,
    slug: 'the-admin-tax',
    title: parsed[2].title,
    subtitle: parsed[2].subtitle,
    excerpt: 'Knowledge workers spend 60% of their time on "work about work." For creatives interrupted every 3 minutes, the cost is measured in ideas that never get made.',
    date: 'MAY 2, 2026',
    author: 'Samay Team',
    tag: 'Industry',
    gradient: 'from-[#7c3aed]/40 to-brand/20',
    image: '/images/blog/team-meeting.jpg',
    raw: parsed[2].body,
  },
  {
    id: 4,
    slug: 'the-revenue-you-cant-see',
    title: parsed[3].title,
    subtitle: parsed[3].subtitle,
    excerpt: 'Most agencies know they\u2019re leaving money on the table. Few know how much. The answer is larger than they think, and the cause is simpler than they expect.',
    date: 'MAY 15, 2026',
    author: 'Samay Team',
    tag: 'Finance',
    gradient: 'from-[#e11d48]/40 to-[#ea580c]/20',
    image: '/images/blog/financial-charts.jpg',
    raw: parsed[3].body,
  },
  {
    id: 5,
    slug: 'designing-for-the-neurodivergent-majority',
    title: parsed[4].title,
    subtitle: parsed[4].subtitle,
    excerpt: 'Nearly half of creative professionals are neurodivergent. Every timesheet tool on the market ignores this. That\u2019s not an accessibility gap. It\u2019s a market failure.',
    date: 'MAY 28, 2026',
    author: 'Samay Team',
    tag: 'Design',
    gradient: 'from-[#0d9488]/40 to-[#2563eb]/20',
    image: '/images/blog/creative-art.jpg',
    raw: parsed[4].body,
    hidden: true,
  },
  {
    id: 6,
    slug: 'why-creatives-hate-every-tool',
    title: parsed[5].title,
    subtitle: parsed[5].subtitle,
    excerpt: 'The problem isn\u2019t that agencies haven\u2019t tried enough tools. Every tool in the market shares the same five broken assumptions.',
    date: 'JUN 10, 2026',
    author: 'Samay Team',
    tag: 'Product',
    gradient: 'from-brand/40 to-[#7c3aed]/20',
    image: '/images/blog/frustrated-tools.jpg',
    raw: parsed[5].body,
  },
  {
    id: 7,
    slug: 'timesheets-are-just-the-start',
    title: parsed[6].title,
    subtitle: parsed[6].subtitle,
    excerpt: 'Timesheets are just the beginning. The real mission is helping agencies understand and protect their most valuable asset: creative talent.',
    date: 'JUN 24, 2026',
    author: 'Samay Team',
    tag: 'Vision',
    gradient: 'from-[#2563eb]/40 to-[#0d9488]/20',
    image: '/images/blog/team-vision.jpg',
    raw: parsed[6].body,
  },
  {
    id: 8,
    slug: 'meet-them-where-they-are',
    title: parsed[7].title,
    subtitle: parsed[7].subtitle,
    excerpt: 'Creatives open their messaging app 50 times a day. They open their time tracker zero times. The future of time tracking lives inside the channels they already use.',
    date: 'JUL 8, 2026',
    author: 'Samay Team',
    tag: 'Strategy',
    gradient: 'from-[#ea580c]/40 to-brand/20',
    image: '/images/blog/messaging-channel.jpg',
    raw: parsed[7].body,
  },
  {
    id: 9,
    slug: 'the-1800-hour-question',
    title: parsed[8].title,
    subtitle: parsed[8].subtitle,
    excerpt: 'Every FTE represents 1,800 billable hours per year. Most agencies can\u2019t tell you how those hours are actually being spent. That\u2019s not a timesheet problem. It\u2019s a strategy problem.',
    date: 'AUG 5, 2026',
    author: 'Samay Team',
    tag: 'Strategy',
    gradient: 'from-[#7c3aed]/40 to-[#e11d48]/20',
    image: '/images/blog/strategy-meeting.jpg',
    raw: parsed[8].body,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}
