interface EyebrowProps {
  children: React.ReactNode
  light?: boolean
}

export default function Eyebrow({ children, light }: EyebrowProps) {
  return (
    <span
      className={`font-mono text-[12px] font-medium tracking-[3px] uppercase ${
        light ? 'text-brand-light' : 'text-brand'
      }`}
    >
      {children}
    </span>
  )
}
