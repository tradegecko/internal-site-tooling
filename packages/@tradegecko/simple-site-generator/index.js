const showdown = require('showdown');
showdown.setOption('tables', true);
showdown.setOption('simplifiedAutoLink', true);

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const TableOfContents = require('@tradegecko/folder-toc-generator');
const MarkDownTableOfContents = require('@tradegecko/static-site-toc-generator');
const funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,
  treeForPublic() {
    let siteGeneratorOptions = this.app.options.simpleSiteGenerator;
    let staticSiteConfig = siteGeneratorOptions.staticSiteJson;
    let folder = siteGeneratorOptions.folder;
    staticSiteConfig.attributes.push('navigation')
    const jsonTree = new StaticSiteJson(folder, staticSiteConfig);

    let jsonTreeWithToc = new MarkDownTableOfContents(jsonTree,
      {depth: siteGeneratorOptions.markdownTocDepth});
    let images = funnel(folder,{
      destDir: 'images',
      include: ['**/*.png']
    });

    const navigation = new TableOfContents(jsonTree, {
      root: staticSiteConfig.contentFolder
    });


    return new BroccoliMergeTrees(
      [jsonTreeWithToc, navigation, images]
    );
  }
};
