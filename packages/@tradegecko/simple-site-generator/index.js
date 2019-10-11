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
    let folder = siteGeneratorOptions.folder;

    let staticSiteConfig = {
      ...siteGeneratorOptions.staticSiteJson,
      attributes: [...siteGeneratorOptions.staticSiteJson.attributes, 'navigation'],
      buildToc: function(markdownFolder, jsonFolder, options) {
        return new TableOfContents(jsonFolder, {
          root: options.contentFolder,
        });
      },
      postProcessContentTree: (contentTree) => {
        return new MarkDownTableOfContents(contentTree,
          {depth: siteGeneratorOptions.markdownTocDepth});
      }
    };


    const jsonTree = new StaticSiteJson(folder, staticSiteConfig);

    let images = funnel(folder,{
      destDir: 'images',
      include: ['**/*.png','**/*.jpg']
    });

    return new BroccoliMergeTrees(
      [jsonTree, images]
    );
  }
};
