function renderMarkdown(md: string): string {
  const lines = md.split('\n')
  const html: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' = 'ul'

  function inline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  }

  function closeList() {
    if (inList) {
      html.push(listType === 'ul' ? '</ul>' : '</ol>')
      inList = false
    }
  }

  // A GFM-style separator row, e.g. | --- | :--: |
  function isTableSep(s: string): boolean {
    return s.includes('-') && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(s)
  }
  function splitRow(s: string): string[] {
    let t = s.trim()
    if (t.startsWith('|')) t = t.slice(1)
    if (t.endsWith('|')) t = t.slice(0, -1)
    return t.split('|').map((c) => c.trim())
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Pipe table: a row of cells followed by a separator row.
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      closeList()
      const header = splitRow(line)
      i += 1 // consume the separator row
      const rows: string[][] = []
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim() !== '') {
        i += 1
        rows.push(splitRow(lines[i]))
      }
      let t = '<table><thead><tr>'
      header.forEach((h) => { t += `<th>${inline(h)}</th>` })
      t += '</tr></thead><tbody>'
      rows.forEach((r) => {
        t += '<tr>'
        r.forEach((c) => { t += `<td>${inline(c)}</td>` })
        t += '</tr>'
      })
      t += '</tbody></table>'
      html.push(t)
      continue
    }

    if (line.startsWith('### ')) {
      closeList()
      html.push(`<h3>${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      closeList()
      html.push(`<h2>${inline(line.slice(3))}</h2>`)
    } else if (line === '---') {
      closeList()
      html.push('<hr />')
    } else if (/^- /.test(line)) {
      if (!inList || listType !== 'ul') {
        closeList()
        html.push('<ul>')
        inList = true
        listType = 'ul'
      }
      html.push(`<li>${inline(line.slice(2))}</li>`)
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== 'ol') {
        closeList()
        html.push('<ol>')
        inList = true
        listType = 'ol'
      }
      html.push(`<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>`)
    } else if (line.startsWith('> ')) {
      closeList()
      html.push(`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`)
    } else if (line.trim() === '') {
      closeList()
    } else {
      closeList()
      html.push(`<p>${inline(line)}</p>`)
    }
  }
  closeList()
  return html.join('\n')
}

export default function Markdown({ content, className = 'article-content' }: { content: string; className?: string }) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
