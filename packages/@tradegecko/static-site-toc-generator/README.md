# static-site-toc-generator

This is addon is intended to be used with [broccoli-static-site-json](https://github.com/empress/broccoli-static-site-json)

## Input/Output

The JSON should have the following shape
```
{
  data: {
    attributes: {
      html: ''
    }
  }
}
```

The output JSON will be

```
{
  data: {
    attributes: {
      html: ''
      toc: [
        {
         level: //what h tag was it [1,2,3,4]?
         id: //the id of the htag
         label: //the innerText of the htag
    }
      ]
    }
  }
}
```
The ToC array is flat and the order of the tags in the order that they were found in the HTML.

## Installation

`npm install @tradegecko/static-site-toc-generator`

## Usage

```
const jsonTree = new StaticSiteJson(folder, staticSiteConfig);
const jsonTreeWithToc = new MarkDownTableOfContents(jsonTree, {depth: siteGeneratorOptions.markdownTocDepth});
```
Now you should use jsonTreeWithToc for the rest of your pipeline since the original output of StaticSiteJson does not contain the toc attribute.

Below is an example ember component consuming the array.

```
  <nav class="navigation">
    <ul class="list">
      {{#each @toc as |toc|}}
      <li class="list-item">
        <a class="link" href="#{{toc.id}}">{{toc.label}}</a>
      </li>
      {{/each}}
    </ul>
  </nav>
```
