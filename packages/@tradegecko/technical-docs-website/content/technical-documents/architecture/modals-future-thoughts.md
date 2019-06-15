---
navigation:
  hidden:  true
---
## Problem statement.
Currently modal pane service, which should be the bridge for javascript. only works for confirm pane, but we need it to be the interface to open any Modals from javascript.

## Design Statements
1. Modal Layouts should be usable in javascript and handlebars.
2. Modals need to be usable by javascript and HBS.
3. ModalPane service should support standalone modals.

## Architecture

All modals are composed using `BaseModal`, they are then specialised into reusable types, some types may be pure layouts others may have more semantic code. If your modal does not fit into these types within the boundaries of the API it should be constructed using `BaseModal`.

Building modals HBS first allows us to encapsulate it's code within a component, which allows for better ergonomics. This means that every modal will in some way use `BaseModal`, in its component tree.

Opening modals from HBS, has negative ergonomics that the state of its openness has to be managed by the developer and can be error prone. On the flip side we don't fully understand the scope of opening modals from javascript. One of the goals of this architecture will be to, provide a solid foundation to allow modals to be opened via javascript when they need to be used in multiple places, but still use the handlebars approach if they are to be used in one location until the scope of using javascript to open all modals is more understood.

### Modal Types

We have defined a few base modal types, which should be used for different reasons:
1. `ConfirmModal`: Is analogous to `window.confirm`,
2. `AlertModal`: Is analogous to `window.alert`,
2. `FormModal`: Modals which are forms
3. `ComplexModal`: They look like form modals but are not forms
4. `FunctionalModal`: Will begin its EOL all new code should use the new modals.
5. `BaseModal`: is the root modal to be used when building specialised modals

![Layout diagram](/images/technical-documents/architecture/modal-types.png)

### Modal Pane Service

The goal of Modal Pane service is to open a modal from javascript. it is built in conjunction with `application-modal-wormhole`.

##### Interface

```
interface ModalPaneService {
    //Base Function.
    public openModal(name: string, parameters: hash)

    //Sugar Functions
    public openDeleteModal(objectType:string)
    public openDiscardModal(onDiscard:function)
    public openConfirmModal(options: {onSuccess:function; onCancel:function; onTertiary:function, title:string; body:string; header:string;})
}

```

##### Modal shims

Modals should be built using normal handlebars techniques. These components will be wrapped by a shim under `components/splat-shims/modals/${modalName}Shim.hbs`. please reference the following diagram:

![Shim diagram](/images/technical-documents/architecture/modal-shims.png)

##### application-modal-wormhole

We will be using the splat shim-pattern, within the application-modal-wormhole component, in order to discover the modal to render.

### Existing code that needs to change

#### New Base modals that need to be developed
  - Form Modal
  - Complex Modal
  - Confirm Modal
    - update code in ModalPaneService
  - Discard Modal
    - update code in ModalPaneService
  - Delete Modal
    - update code in ModalPaneService
  - Alert Modal
    - update code in ModalPaneService


### Obscure Modals
 - [installation-complete-modal](https://github.com/tradegecko/tradegecko/blame/develop/app/assets/javascripts/templates/components/integrations/installation-complete-modal.hbs#L1)
 - [post-install-survey](https://github.com/tradegecko/tradegecko/blame/develop/app/assets/javascripts/templates/components/integrations/post-install-survey.hbs#L5)
 - [batches/preview-modal](https://github.com/tradegecko/tradegecko/blame/develop/app/assets/javascripts/templates/components/batches/preview-modal.hbs#L2)

### Unanswered Questions
2. the many configuration options.
5. permanent modals
6. Do all modals have a header ? which don't lockout
8. Modal Pane service currently does not support chaining modals.
9. when do you use javascript and hbs
