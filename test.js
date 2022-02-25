import { test } from 'tape'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkBibtex from './index.js'

const bibtexFilePath = './example/example.bib'

test('Infer citation A', async (t) => {
  return remark()
    .use(remarkGfm)
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('(@Wasserman1994)')
    .then((content) => {
      return content.toString()
    })
    .then((markdown) => {
      t.equal(
        markdown,
        '[^1]\n\n[^1]: 1\\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.&#x20;\n'
      )
    })
    .catch((err) => console.error(err))
})

test('Infer citation B', async (t) => {
  return remark()
    .use(remarkGfm)
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('(@Harris2020)')
    .then((content) => content.toString())
    .then((markdown) => {
      t.equal(
        markdown,
        '[^1]\n\n[^1]: 1\\. Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature \\[Internet]. 2020 Sep;585(7825):357–62. Available from: http\\://www\\.nature.com/articles/s41586-020-2649-2\n'
      )
    })
    .catch((err) => console.error(err))
})

test('Infer citation A in context', async (t) => {
  return remark()
    .use(remarkGfm)
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('# My Document\n\nSo here is my citation (@Wasserman1994). End of story.\n\n')
    .then((content) => content.toString())
    .then((markdown) => {
      t.equal(
        markdown,
        '# My Document\n\nSo here is my citation[^1]. End of story.\n\n[^1]: 1\\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.&#x20;\n'
      )
    })
    .catch((err) => console.error(err))
})
test('Infer citations A & B', async (t) => {
  return remark()
    .use(remarkGfm)
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)')
    .then((content) => content.toString())
    .then((markdown) => {
      t.equal(
        markdown,
        'Ref A:[^1] Ref B:[^2]\n\n[^1]: 1\\. Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature \\[Internet]. 2020 Sep;585(7825):357–62. Available from: http\\://www\\.nature.com/articles/s41586-020-2649-2\n\n\n[^2]: 1\\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.&#x20;\n'
      )
    })
    .catch((err) => console.error(err))
})
test('Infer citations A & B with reverse order and duplicate entry', async (t) => {
  return remark()
    .use(remarkGfm)
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('Ref A: (@Wasserman1994) Ref B: (@Harris2020) Ref C: (@Wasserman1994)')
    .then((content) => content.toString())
    .then((markdown) => {
      t.equal(
        markdown,
        'Ref A:[^1] Ref B:[^2] Ref C:[^1]\n\n[^1]: 1\\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.&#x20;\n\n\n[^2]: 1\\. Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature \\[Internet]. 2020 Sep;585(7825):357–62. Available from: http\\://www\\.nature.com/articles/s41586-020-2649-2\n'
      )
    })
    .catch((err) => console.error(err))
})
