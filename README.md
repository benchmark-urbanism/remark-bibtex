# remark-bibtex

Remark-bibtex is a [remark](https://github.com/wooorm/remark) plugin to generate citations from a `bibtex` file. It uses [`citation-js`](https://github.com/citation-js/citation-js) to load the provided `.bib` file, and interpolates references based on citation keys provided inside your markdown text.

Citation keys should take the form of `(@my-citation)`: The citation key will be replaced with a `citation-js` "citation" formatted string, and a "References" section will be added to the end of the document, which will list the `citation-js` "bibliography" formatted string.

For example:

```md
# My Document

So here is my citation (@Wasserman1994). End of story.
```

Will become:

```
# My Document

So here is my citation (Wasserman & Faust, 1994). End of story.

## References

Wasserman, S., & Faust, K. (1994). Social Network Analysis. Cambridge University Press.

```

## Install

```sh
yarn add @benchmark-urbanism/remark-bibtex
```

## Usage

```js
const remark = require('remark')
const remarkBibtex = require('@benchmark-urbanism/remark-bibtex')

const bibtexFilePath = './example/example.bib'

remark()
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('Ref A: (@Wasserman1994) Ref B: (@Harris2020)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))
```

Will give:

```md
Ref A: (Wasserman & Faust, 1994) Ref B: (Harris et al., 2020)

## References

Harris, C. R., Millman, K. J., van der Walt, S. J., Gommers, R., Virtanen, P., Cournapeau, D., Wieser, E., Taylor, J., Berg, S., Smith, N. J., Kern, R., Picus, M., Hoyer, S., van Kerkwijk, M. H., Brett, M., Haldane, A., del Río, J. F., Wiebe, M., Peterson, P., … Oliphant, T. E. (2020). Array programming with NumPy. Nature, 585(7825), 357–362. https://doi.org/10.1038/s41586-020-2649-2
Wasserman, S., & Faust, K. (1994). Social Network Analysis. Cambridge University Press.
```

And with options:

```js
const remark = require('remark')
const remarkBibtex = require('@benchmark-urbanism/remark-bibtex')

const bibtexFilePath = './example/example.bib'

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
```

Will give:

```md
Ref A: (1) Ref B: (2)

## Bibliography

<div class="csl-bib-body">
  <div data-csl-entry-id="Harris2020" class="csl-entry">
    <div class="csl-left-margin">1. </div><div class="csl-right-inline">Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature [Internet]. 2020 Sep;585(7825):357–62. Available from: http://www.nature.com/articles/s41586-020-2649-2</div>
  </div>
  <div data-csl-entry-id="Wasserman1994" class="csl-entry">
    <div class="csl-left-margin">2. </div><div class="csl-right-inline">Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.</div>
   </div>
</div>
```

### Options

### options.bibtexFile

A mandatory filepath to the `.bib` file to be loaded by `citation-js`

### options.citeHeadingText

Heading text (and heading level) to use for the appended references section.

Default `citeHeadingText = "## References"`

### options.citeJsOptions

`citation-js` options to pass to the `citation-js` formatter. More information on the available options can be found in the `citation-js` [output docs](https://citation.js.org/api/0.5/module-@citation-js_plugin-csl.output.html).

Default: `citeJsOptions = { format: 'text', template: 'apa' }`

## License

MIT © Gareth Simons
