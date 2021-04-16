const remark = require('remark')
const remarkBibtex = require('./index.js')

const bibtexFilePath = './example/example.bib'

test('Infer citation A', () => {
  remark()
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('(@Wasserman1994)', function (err, output) {
      const result = output.contents
      expect(result).toBe(
        '(Wasserman & Faust, 1994)\n\n## References\n\nWasserman, S., & Faust, K. (1994). Social Network Analysis. Cambridge University Press.\n'
      )
    })
})

test('Infer citation B', () => {
  remark()
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process('(@Harris2020)', function (err, output) {
      const result = output.contents
      expect(result).toBe(
        '(Harris et al., 2020)\n\n## References\n\nHarris, C. R., Millman, K. J., van der Walt, S. J., Gommers, R., Virtanen, P., Cournapeau, D., Wieser, E., Taylor, J., Berg, S., Smith, N. J., Kern, R., Picus, M., Hoyer, S., van Kerkwijk, M. H., Brett, M., Haldane, A., del Río, J. F., Wiebe, M., Peterson, P., … Oliphant, T. E. (2020). Array programming with NumPy. Nature, 585(7825), 357–362. https://doi.org/10.1038/s41586-020-2649-2\n'
      )
    })
})

test('Infer citation A in context', () => {
  remark()
    .use(remarkBibtex, { bibtexFile: bibtexFilePath })
    .process(
      '# My Document\n\nSo here is my citation (@Wasserman1994). End of story.\n\n',
      function (err, output) {
        const result = output.contents
        expect(result).toBe(
          '# My Document\n\nSo here is my citation (Wasserman & Faust, 1994). End of story.\n\n## References\n\nWasserman, S., & Faust, K. (1994). Social Network Analysis. Cambridge University Press.\n'
        )
      }
    )
})

test('Infer citation A with custom references heading', () => {
  remark()
    .use(remarkBibtex, { bibtexFile: bibtexFilePath, citeHeadingText: '## Bibliography' })
    .process(
      '# My Document\n\nSo here is my citation (@Wasserman1994). End of story.\n\n',
      function (err, output) {
        const result = output.contents
        expect(result).toBe(
          '# My Document\n\nSo here is my citation (Wasserman & Faust, 1994). End of story.\n\n## Bibliography\n\nWasserman, S., & Faust, K. (1994). Social Network Analysis. Cambridge University Press.\n'
        )
      }
    )
})

test('Infer citations A & B with custom cite JS options', () => {
  remark()
    .use(remarkBibtex, {
      bibtexFile: bibtexFilePath,
      citeHeadingText: '## Bibliography',
      citeJsOptions: {
        format: 'html',
        template: 'vancouver',
      },
    })
    .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)', function (err, output) {
      const result = output.contents
      expect(result).toBe(
        'Ref A: (1) Ref B: (2)\n\n## Bibliography\n\n<div class="csl-bib-body">\n  <div data-csl-entry-id="Harris2020" class="csl-entry">\n    <div class="csl-left-margin">1. </div><div class="csl-right-inline">Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature [Internet]. 2020 Sep;585(7825):357–62. Available from: http://www.nature.com/articles/s41586-020-2649-2</div>\n  </div>\n  <div data-csl-entry-id="Wasserman1994" class="csl-entry">\n    <div class="csl-left-margin">2. </div><div class="csl-right-inline">Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.</div>\n   </div>\n</div>\n'
      )
    })
})

test('Infer citations A & B with reverse order and duplicate entry', () => {
  remark()
    .use(remarkBibtex, {
      bibtexFile: bibtexFilePath,
      citeHeadingText: '## Bibliography',
      citeJsOptions: {
        format: 'html',
        template: 'vancouver',
      },
    })
    .process(
      'Ref A: (@Wasserman1994) Ref B: (@Harris2020) Ref C: (@Wasserman1994)',
      function (err, output) {
        const result = output.contents
        expect(result).toBe(
          'Ref A: (1) Ref B: (2) Ref C: (1)\n\n## Bibliography\n\n<div class="csl-bib-body">\n  <div data-csl-entry-id="Wasserman1994" class="csl-entry">\n    <div class="csl-left-margin">1. </div><div class="csl-right-inline">Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.</div>\n   </div>\n  <div data-csl-entry-id="Harris2020" class="csl-entry">\n    <div class="csl-left-margin">2. </div><div class="csl-right-inline">Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature [Internet]. 2020 Sep;585(7825):357–62. Available from: http://www.nature.com/articles/s41586-020-2649-2</div>\n  </div>\n</div>\n'
        )
      }
    )
})
