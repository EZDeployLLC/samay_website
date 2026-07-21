import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  dark?: boolean
  id?: string
  delay?: number
}

export default function Section({ children, className = '', dark, id, delay = 0 }: SectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(4px)' }}
      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${dark ? 'bg-dark' : ''} ${className}`}
    >
      {children}
    </motion.section>
  )
}
