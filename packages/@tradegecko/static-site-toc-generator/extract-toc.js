const { JSDOM } = require('jsdom');


module.exports = function(htmlString, depth){
  const query = buildQuery(depth)
  const dom = new JSDOM(htmlString);
  const nodes = dom.window.document.querySelectorAll(query);
  const nodeArray = Array.from(nodes)
  return nodeArray.map((node) => {
    return {
      level:+node.nodeName.replace('H', ''),
      id:node.id,
      label: node.textContent,
    }
  })
}

function buildQuery(depth){
  let i = 0;
  let nodes = []
  while (i < depth){
    i++;
    nodes.push(`h${i}`);
  }
  return nodes.join(',')
}
