import LegalArticle from '../components/LegalArticle'
import content from '../content/legal/terms.md?raw'

export default function Terms() {
  return (
    <LegalArticle
      kicker="LEGAL · MASTER SUBSCRIPTION TERMS"
      title="Terms of Service"
      effective="on execution of the first Order Form"
      updated="30 June 2026"
      version="1.0"
      content={content}
    />
  )
}
