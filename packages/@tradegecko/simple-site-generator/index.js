const showdown = require('showdown');
showdown.setOption('tables', true);
showdown.setOption('simplifiedAutoLink', true);

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const TableOfContents = require('./table-of-contents-compiler');
const funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,
  treeForPublic() {
    let staticSiteConfig = this.app.options.simpleSiteGenerator.staticSiteJson;
    let folder = this.app.options.simpleSiteGenerator.folder;
    const jsonTree = new StaticSiteJson(folder, staticSiteConfig);

    let images = funnel(folder,{
      destDir: 'images',
      include: ['**/*.png']
    });

    const navigation = new TableOfContents(jsonTree);


    return new BroccoliMergeTrees(
      [jsonTree, navigation, images]
    );
  }
};
