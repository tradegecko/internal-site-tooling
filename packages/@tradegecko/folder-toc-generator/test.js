let pages = [ 'page/README.json',
  'page/chapter/active-projects.json',
  'page/chapter/documentation-process.json',
  'page/chapter/rfc-process.json',
  'page/chapter/sentry_breakdown.json',
  'page/chapter/talks.json',
  'page/chapter/test-image.json',
  'page/technical-documents/architecture/modals-future-thoughts.json',
  'page/technical-documents/architecture/modals.json',
  'page/technical-documents/architecture/split-shims.json',
  'page/technical-documents/guides/forms.json',
  'page/technical-documents/guides/frontend-test.json',
  'page/technical-documents/guides/tables.json',
  'page/technical-documents/patterns/splat-shim.json',
  'page/technical-documents/principals.json' ]

const buildTree = require('./build-tree');
let res = buildTree(pages)
console.log(res.page.children['technical-documents'])
