const showdown = require('showdown');
showdown.setOption('tables', true);
showdown.setOption('simplifiedAutoLink', true);

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const TableOfContents = require('./table-of-contents-compiler');
const MarkDownTableOfContents = require('@tradegecko/static-site-toc-generator');
const funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,
  treeForPublic() {
    let siteGeneratorOptions = this.app.options.simpleSiteGenerator;
    let staticSiteConfig = siteGeneratorOptions.staticSiteJson;
    let folder = siteGeneratorOptions.folder;
    const jsonTree = new StaticSiteJson(folder, staticSiteConfig);

    console.log(siteGeneratorOptions.markdownTocDepth)
    let jsonTreeWithToc = new MarkDownTableOfContents(jsonTree,
      {depth: siteGeneratorOptions.markdownTocDepth});
    let images = funnel(folder,{
      destDir: 'images',
      include: ['**/*.png']
    });

    const navigation = new TableOfContents(jsonTree);


    return new BroccoliMergeTrees(
      [jsonTreeWithToc, navigation, images]
    );
  }
};
