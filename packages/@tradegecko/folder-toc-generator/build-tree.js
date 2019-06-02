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


// let pages = [ 'chapter/active-projects.json',
//      'chapter/documentation-process.json',
//      'chapter/rfc-process.json',
//      'chapter/sentry_breakdown.json',
//      'chapter/talks.json',
//      'chapter/test-image.json',
//      'technical-documents/architecture/modals-future-thoughts.json',
//      'technical-documents/architecture/modals.json',
//      'technical-documents/architecture/split-shims.json',
//      'technical-documents/guides/forms.json',
//      'technical-documents/guides/frontend-test.json',
//      'technical-documents/guides/tables.json',
//      'technical-documents/patterns/splat-shim.json',
//      'technical-documents/principals.json' ]

const buildTree =  function(pages, parent) {
  let result = pages.reduce((acc, item) => {
    let path = item.split('/');
    if(path.length === 1 ){
      if(!acc.pages){
        acc.pages = []
      }
      acc.pages.push(item)
      return acc;
    }
    let page = path.shift();
    if(!acc[page]){
      acc[page] =  {
        pages:[],
        children:[]
      }
    }
    if(path.length == 1){
      acc[page].pages.push(path[0]);
    } else {
      acc[page].children.push(path.join('/'))
    }
    return acc;
  },{});
  for(let key in result){
    if(result[key].children && result[key].children.length){
      result[key].children = buildTree(result[key].children)
    }
  }
  return result;
}


module.exports = buildTree;
