const walkSync = require('walk-sync')
const { join } = require('path');
const Plugin = require('broccoli-plugin');
const { writeFileSync } = require('fs');
const buildTree = require('./build-tree');

class TableOfContents extends Plugin {
  constructor(tree, options){
    super([tree]);
    this.options = options;
  }

  build() {
    let inputPath = this.inputPaths[0]
    let res = walkSync(inputPath, ['**/*.json']);
    let pages = buildTree(res);
    let navigation = buildNav(pages, inputPath, this.options.root)
    writeFileSync(join(this.outputPath,'pages.json'), JSON.stringify(navigation))
  }

}

function humanize(title) {
  return capitalize(title.split('.')[0])
  .replace(/-/g,' ')
  .replace(/_/g,' ');
}

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buildNav(pages, inputPath){
  let path = [];
  let topLevel= buildNavigationSection({children:pages},inputPath,path);
  return [
    {
       title: 'root',
       url: `index.md`,
    },
    ...topLevel
  ]
}

function buildNavigationSection(page, dir, path){
  if(!page.children){
    return [];
  }
  return Object.entries(page.children).map(([key, value]) => {
    let newPath = [...path, key];
    return {
      title: humanize(key),
      url: `${key}/index`,
      pages: getPageLinks(value.pages,dir,newPath),
      children: buildNavigationSection(value, dir, newPath),
    }
  });
}

function getPageLinks(pages,root,path){
  return pages.map((page) => {
    let pageJson = require(join(...[root,...path,page]));
    let navigationSettings = pageJson.data.attributes.navigation || {}
    if(navigationSettings.hidden){
      return null;
    }
    return {
      title: navigationSettings.title || humanize(page),
      url: [...path,page.split('.')[0]].join('/')
    }
  }).filter((element) => element !== null);
}

module.exports = TableOfContents;
