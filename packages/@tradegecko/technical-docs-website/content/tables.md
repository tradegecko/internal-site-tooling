# The "correct" table
The currently recommended table to use for *most* of your table needs is `gecko-table-v2` (For exceptions, look at the [Old tables](#old-tables) section). This is a table built on top of a fork of ember table [Ember Table](https://github.com/Addepar/ember-table) - specifically [this one](https://github.com/tradegecko/ember-table#be5c5e3555857b5ae3ad38d86e2d2886ef88d296).

Because of the ember version we are on, we use a legacy implementation of ember table with the aim of keeping our tables easily upgradable along with ember when that happens.

Note: `gecko-table-v2` is not as feature complete in the "out of the box" usage sense for a lot of the in-app use cases we see. This is primarily due to the tables not making too many assumptions about the data - it just displays the things it is told to display. Recepies for things like search, pagination, filtering with this table still have to be built.

# Usage
```js
init() {
  ...
  let columns = [
    {
      heading: "",
      valuePath: "", // The attribute on the row that this column works with
      minWidth: 50, // Only works on resizable columns
      width: 100, // Only works on non resizable columns
      maxWidth: Infinity, // Only works on resizable columns
      isSortable: false,
      isResizable: true,
      isReorderable: true,
    },
    ...
  ];
  this.set('columns', columns);
}
```
```hbs
{{gecko-table-v2 isNew=true rows=rows columns=columns}}
```
All of the options in this example are a part of the ember table api and can be found in their [documentation](https://opensource.addepar.com/ember-table/latest/docs).

### Custom cells

By default each cell will be displayed using `tables/text-display-cell` - you can however pass a custom cell to be used by the table.

```javascript
{
  ...
    cellComponent: 'tables/type-action-cell', // Your custom cell to be used for this column
    cellPaddingType: 'text-display-cell' // Or 'input', different types of cells need different padding for vertical alignment.
    cellComponentOptions: {
      // A static hash of options that will be passed to the cell
    },
  ...
}
```
All the cells for generic use can be found in `components/tables/*` - page specific use cases should go in their respective folders.

`cellPaddingType` and `cellComponentOptions` are our additions to the ember table API, as such cannot be found on the ember table docs.

**Note:** If your `cellComponentOptions` contains a dynamic property, the columns array needs to be a computed with the dynamic property as a dependent key. Otherwise the table will not update as expected.

### Passing an action
```javascript
{
  ...
    cellComponent: 'tables/type-action-cell', // Your custom cell to be used for this column
    cellComponentOptions: {
      anAction: this.anAction.bind(this), // Create closure action, or use one that is passed in
      //(anAction is a placeholder name)
    },
  ...
}
```

# Example to follow
If you want to see a table in use, look at `assembly/new` which contains 2 of these tables. The specific components where the tables are located are:
- `manufacturing/assembly-edit-line-items`
- `manufacturing/assembly-edit-freeform-line-items`

# Old tables
- Using `TableControllerMixin`: `controllers/price-list-products`
  - This one currently has a bunch of side functionality (addons for filtering, searching etc) which arn't in the new table. Ideally these addons should be built for `gecko-table-v2`.
  - Its fine to use this for index tables across the app because the functionality they require is a perfect fit for `TableControllerMixin` and its friends.


- Using `gecko-table-v2` without the `isNew` flag: `forecasts/forecast-details`
  - This should be deprecated soon


- Handing the table yourself: `variant-index/index`
  - This should really only be used for highly specialized uses like maybe building a more performant table. These use cases will probably be few and far between - so tread lightly.
