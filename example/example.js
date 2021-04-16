const remark = require('remark')

// const remarkBibtex = require('remark-bibtex')
const remarkBibtex = require('../index.js')
const bibtexFilePath = './example/example.bib'

remark()
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('Ref A: (@Wasserman1994) Ref B: (@Harris2020)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))

remark()
  .use(remarkBibtex, {
    bibtexFile: bibtexFilePath,
    citeHeadingText: '## Bibliography',
    citeJsOptions: {
      format: 'html',
      template: 'vancouver',
    },
  })
  .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))
