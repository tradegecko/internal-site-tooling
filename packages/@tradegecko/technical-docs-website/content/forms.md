---
name: Forms
image: /images/input-states.png
---
# Form Mixin

- FormAnalyticsMixin
- FormControllerMixin
- OrderFormControllerMixin
- NonProxyFormControllerMixin
- FormControllerWithChildrenMixin
- FormControllerWithEmbeddedChildrenMixin

Should we be doing something about this?
- [FormExtensionMixin](https://github.com/tradegecko/tradegecko/blob/fd7cb3f72b6c9888ee499883868f6158a8d4f3f2/app/assets/javascripts/helpers-old/form_extension.js.coffee#L1)

## Deprecated (STOP USING)
- [SendDiscardToControllerFormPaneMixIn](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/helpers-old/modal-panes.js.coffee#L169)

## FormAnalyticsMixin
Provides form analytics functionality via `trackAnalytics()` API.  
Tracking is done by extracting information from the model in the form.

Can be found in:
- [FormControllerMixin](https://github.com/tradegecko/tradegecko/blob/de8af0cd1529d35a0305bdcd3af16e3d66c44e8c/app/assets/javascripts/controllers/concerns/form-controller-mixin.es6#L12) (all forms should extend from `FormControllerMixin`)

## FormControllerMixin
Basic form submit flow

1. `showErrors = true` called from **EasierFormComponent**
2. `beforeValidations()`
3. `validate()` on controller or model

If `valid`:
1. `showErrors = false`
2. `beforeSave()`
3. `saveRecords()` with either one of the followings
    - `didSaveRecord()`
    - `didntSaveRecord()`
4. `afterSave()` is always called after `saveRecord()`

If `invalid`:
1. `showErrors = true`
2. `invalidSubmit()`

This is the form mixin that should be used unless there are specific functions that
should be overwritten and should already be in one of the following mixins:
1. `OrderFormControllerMixin`
2. `NonProxyFormControllerMixin`
3. `FormControllerWithChildrenMixin`
4. `FormControllerWithEmbeddedChildrenMixin`

Can be found in:
- [Company new & edit forms](https://github.com/tradegecko/tradegecko/blob/de8af0cd1529d35a0305bdcd3af16e3d66c44e8c/app/assets/javascripts/controllers/company-new.es6#L6)

## OrderFormControllerMixin
This is used to save models in the following scenario
- The model has child line items
- On create the child line items should be embeded in the main payload
- On edit the (changed) child lineItems should be saved in seperate requests

Can be found in:
- [New Production Order](https://github.com/tradegecko/tradegecko/blob/de8af0cd1529d35a0305bdcd3af16e3d66c44e8c/app/assets/javascripts/controllers/manufacturing/production-order/new.es6#L187)

## NonProxyFormControllerMixin
- `saveContent()`
  - it saves all changes to the `model` instead of `content` in `FormControllerMixin`
- `redirectAfterSave()`
  - will redirect to `home` if there is no redirect path specified

Note:
- Currently, some components actually extend this mixin (a component which acts like a controller) which we should stop doing and start removing.
- Relying on content is deprecated. So non-proxy is the new way

Can be found in:
- [Product Create form](https://github.com/tradegecko/tradegecko/blob/fd7cb3f72b6c9888ee499883868f6158a8d4f3f2/app/assets/javascripts/components/product-create-form.es6#L152)

## FormControllerWithChildrenMixin
- Required for forms that need to observe any changes to the form model’s children objects
- Usually for models with line items where the model is in `edit` state allowing items to be changed or deleted on `didSaveRecord()`

Can be found in:
- [order](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/controllers/order.es6#L35)
- [purchase-order](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/controllers/purchase-order.es6#L33)
- [stock-adjustment](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/controllers/stock-adjustment.es6#L11)
- [new assembly](https://github.com/tradegecko/tradegecko/blob/fd7cb3f72b6c9888ee499883868f6158a8d4f3f2/app/assets/javascripts/controllers/manufacturing/assembly/new.es6#L10)

## FormControllerWithEmbeddedChildrenMixin
Handles `beforeSave()` and `afterSave()` of the form used for model with `children` collection (usually `line items`)
- `beforeSave()`
  - clean up `children` collection with `no data`
- `afterSave()`
  - manually commit `children` collection
  - clean up stray `children` collection that were set up

Can be found in:
- [Partial-order](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/controllers/partial-order.es6#L11)
- [new Stock-transfer](https://github.com/tradegecko/tradegecko/blob/81f5078b9193fded74b21d3947b84ea2ee263ddd/app/assets/javascripts/controllers/stock-transfer-new.es6#L14)
