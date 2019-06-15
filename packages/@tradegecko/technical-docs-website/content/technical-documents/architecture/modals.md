---
navigation:
  title:  Modal Framework
---
# Modal Framework architecture

Modals are a large part of our application, we have simple modals and we have super complicated modals. we currently define many modals in components and manage their visibility in the template. We have also started opening modals from javascript, this design was initially built with a simple confirm modal in mind.

So the big question is when do we open modals from javascript? The Current ruling is if you need to use it in multiple places, but opening from handlebars means managing some extra state. some modals can also be done very simply.

```
await modalService.confirm('delete product','do you want to do this')
if(){
  this.transitionTo('somewhere')
} else {
  doNothing();
}
```

We cannot answer questions yet about the types of modals that we have. This answer needs to come from design. Depending on that answer we would be able to desing the most optimal api's.

What we do know is that modals may be opened by:
1. javascript
2. handlebars,

They may also be configured in:
1. javascript
2. handlebars

This design attempts to lay a foundation where these questions can be answered.

# Code conventions
**Components**

Will follow the following naming conventions will have a `-modal` suffix for example `${type/name}-modal`

# Nomenclature

Right now we use both modal and pane for modals, we also use modal pane for the deprecated ember modal. The
nomenclature moving forward will be:

**EmberModal**<br/>
We use often use the Pane suffix for this in order to free the word pane from it it will be addressed as `EmberModal`

**Javascript Modal**<br/>
Will reference modals that are defined in javascript, right now these are:
  1. `confirmPane`
  2. `promptPane`
  3. `notificationPane`

**Handlebars Modal**<br/>
Will reference modals that are defined in Handlebars.

# Existing modal types

**FunctionalModal**<br/>
Used to create complex modals they are usually encapsulated in a component

**BaseModal**<br/>
Root modal, deals with showing the modal box and cancelation of the modal.

**ConfirmPane**<br/>
Most usages of confirm pane by this point are not confirmation modals, and such the api design is not appropriate, We will deconstruct this When we have defined the types.

Children of FunctionalModal and BaseModal are all HBS modals. we will define an api to open them through javascript.

# How Opener from JS and HBS interface.

We will be using, the [Splat-Shim](/page/patterns%2Fsplat-shim) pattern to create a translation boundary for javascript to connect to modals that are usable in javascript.

![Layout diagram](/images/technical-documents/architecture/modals-birds-eye-view.png)


# Code changes required

modal-pane needs to be renamed to confirm-pane

ModalPaneService needs to have a open modal function.
`public openModal(name:string options:hash)`
  - application-modal-wormhole

The following functions need to be moved to use that function. they will all be opening a confirmPane, and renamed
- `confirmPopup` -> `openConfirmModal`
- `promptPopup` -> `openPromptModal`
- `notificationPopup` -> `openNotificationModal`

The following functions and related code within confirm pane need to be removed
- `promptPane`
- `notificationPane`

visible property of functional modal needs to be deprecated.
