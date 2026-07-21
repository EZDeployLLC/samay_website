import LegalArticle from '../components/LegalArticle'
import content from '../content/legal/privacy.md?raw'

export default function Privacy() {
  return (
    <LegalArticle
      kicker="LEGAL · DATA PROTECTION"
      title="Privacy Policy"
      effective="on first publication"
      updated="30 June 2026"
      version="1.0"
      content={content}
    />
  )
}
