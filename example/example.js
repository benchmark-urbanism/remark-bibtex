import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkBibtex from '../index.js'

const bibtexFilePath = './example/example.bib'

remark()
  .use(remarkGfm)
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('# My Document\n\nSo here is my citation (@Wasserman1994). End of story.')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))

remark()
  .use(remarkGfm)
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))
