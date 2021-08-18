import footnotes from 'remark-footnotes'
import { remark } from 'remark'
import remarkBibtex from '../index.js'

const bibtexFilePath = './example/example.bib'

remark()
  .use(footnotes)
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('# My Document\n\nSo here is my citation (@Wasserman1994). End of story.')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))

remark()
  .use(footnotes)
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))
