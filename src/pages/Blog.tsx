import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts, type BlogPost } from '../data/blogPosts'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block no-underline">
      <div className={`aspect-[16/10] rounded-lg bg-gradient-to-br ${post.gradient} bg-dark-lighter mb-4 overflow-hidden`}>
        {post.image ? (
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[10px] text-text-light-muted/30 tracking-wider uppercase">{post.tag}</span>
          </div>
        )}
      </div>
      <h3 className="font-display text-[16px] md:text-[18px] font-medium text-text-light leading-[1.3] mb-2 group-hover:text-brand-light transition-colors">{post.title}</h3>
      <p className="font-body text-[13px] text-text-light-muted/60 leading-[1.5] mb-3 line-clamp-2">{post.excerpt}</p>
      <p className="font-mono text-[11px] text-text-light-muted/40 tracking-wider">{post.date} &middot; {post.author}</p>
    </Link>
  )
}

export default function Blog() {
  const visible = [...posts.filter(p => !p.hidden)].reverse()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="bg-dark pt-[72px] min-h-screen">
        <div className="max-w-[1120px] mx-auto px-6 md:px-16 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[30px] md:text-[44px] font-medium text-text-light leading-[1.2] mb-8 md:mb-16"
          >
            Blog
          </motion.h1>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {visible.map(post => (
              <motion.div key={post.id} variants={fadeUp}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
