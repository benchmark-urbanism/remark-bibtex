> Please note that this package is deprecated. Please consider using [rehype-citation](https://github.com/timlrx/rehype-citation) instead.

# remark-bibtex

Remark-bibtex is a [remark](https://github.com/wooorm/remark) plugin to generate footnoted citations from a `bibtex` file. It uses [`citation-js`](https://github.com/citation-js/citation-js) to load a specified `.bib` file from which citations will be retrieved and added to the markdown file's footnotes section.

Citation keys take the form of `(@citationKey)`: where "citationKey" corresponds to a bibtex entry in the provided `.bib` file. The citation key will be replaced with a numbered footnote reference corresponding to the bibliography entry in the footnotes section.

In order to work, this package has to be chained to the [`remark-gfm`](https://github.com/remarkjs/remark-gfm) package, which adds the necessary markdown footnoting capability.

```md
# My Document

So here is my citation (@Wasserman1994). End of story.
```

Will become:

```md
So here is my citation[^1]. End of story.

[^1]: 1\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.
```

## Install

```sh
yarn add remark-gfm @benchmark-urbanism/remark-bibtex
```

## Usage

```js
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkBibtex from '../index.js'

const bibtexFilePath = './example/example.bib'

remark()
  .use(remarkGfm)
  .use(remarkBibtex, { bibtexFile: bibtexFilePath })
  .process('Ref A: (@Harris2020) Ref B: (@Wasserman1994)')
  .then((content) => content.toString())
  .then((markdown) => console.log(markdown))
  .catch((err) => console.error(err))

```

Will give:

```md
Ref A:[^1] Ref B:[^2]

[^1]: 1\. Harris CR, Millman KJ, van der Walt SJ, Gommers R, Virtanen P, Cournapeau D, et al. Array programming with NumPy. Nature \[Internet]. 2020 Sep;585(7825):357–62. Available from: http\://www\.nature.com/articles/s41586-020-2649-2


[^2]: 1\. Wasserman S, Faust K. Social Network Analysis. Cambridge: Cambridge University Press; 1994.&#x20;
```

### Options

### options.bibtexFile

A mandatory filepath to the `.bib` file to be loaded by `citation-js`

## License

MIT © Gareth Simons
