const citejs = require('citation-js')
const fs = require('fs')
const findAndReplace = require('mdast-util-find-and-replace')
const fromMarkdown = require('mdast-util-from-markdown')

function plugin(options) {
  // the bibtex filepath is mandatory
  if (!('bibtexFile' in options))
    throw new Error(
      'Options requires a "bibtexFile" key with a filepath to the .bib file as a value.'
    )
  // https://citation.js.org/api/0.3/tutorial-output_formats.html
  const citeJsOptions = options.citeJsOptions || { format: 'text', template: 'apa' }
  const citeHeadingText = options.citeHeadingText || '## References'

  // read-in bibtex and instance citeJS
  const bibtexFile = fs.readFileSync(options.bibtexFile, 'utf8')
  const citations = new citejs(bibtexFile)

  // gather citation keys
  const reCitation = /\(\@(.*?)\)/g

  function transformer(markdownAST) {
    const citeKeys = []
    const citeRefs = []
    // identify citations
    findAndReplace(markdownAST, reCitation, (match) => {
      // citations are defined per (@citationKey)
      const citeKey = match.replace('(@', '').replace(')', '')
      // check that key exists
      if (!citations.data.some((citation) => citation.id === citeKey)) {
        console.error(`Requested ${match} key does not exist in provided bibtex file.`)
        return match
      } else {
        // don't add duplicates
        if (!citeKeys.includes(citeKey)) {
          citeKeys.push(citeKey)
          const opts = { ...citeJsOptions, entry: [citeKey] }
          let citeRef = citations.format('citation', opts)
          // check for vancouver style links
          if ('template' in citeJsOptions && citeJsOptions.template === 'vancouver') {
            // in this case, numbers have to be incremented (otherwise [(1), (1), (1), ...])
            citeRef = `(${citeRefs.length + 1})`
            citeRefs.push(citeRef)
          } else {
            citeRefs.push(citeRef)
          }
          return citeRef
        } else {
          // if already exists, find the associated ref
          const refIdx = citeKeys.findIndex((key) => key === citeKey)
          return citeRefs[refIdx]
        }
      }
    })
    // see if any citations were found
    if (citeKeys.length > 0) {
      // if so, add a References heading
      fromMarkdown(citeHeadingText).children.forEach((child) => {
        markdownAST.children.push(child)
      })
      // and add the entry to the bibliography
      const opts = { ...citeJsOptions, entry: citeKeys }
      const citedHtml = citations.format('bibliography', opts)
      fromMarkdown(citedHtml).children.forEach((child) => {
        markdownAST.children.push(child)
      })
    }
    return markdownAST
  }

  return transformer
}

module.exports = plugin
