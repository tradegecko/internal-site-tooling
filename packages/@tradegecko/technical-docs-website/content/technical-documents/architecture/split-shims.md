### attributes to asses your design
- readability
- testability
- search-ability
- portability
- extensability

### Assesment from a code perspective.
- Synchronise like is easier to read then disconnected code
```
if(await modalService.confirm('do you want to do this')){
  this.transitionTo('somewhere')
} else {
  doNothing();
}
```

vs

```
modalService.confirm('do you want to do this',{
  onPrimary:() => {
    this.transitionTo('somewhere')
  },

  onSecondary:() => {
    doNothing();
  }
})
```

- The more code you have to read at once the harder it is to digest a piece of code, encapsulation is a technique that you can use to decrease the amount of code some one has to digest if this is true then the following is better.

```
//services/manufacturing-actions.es6
actions: {
  discontinueAssembly(assembly) {
    this.get('modalPane').openModal('discontinue-assembly-modal', {
      assembly,
    });
  }
}

//discontinue-assembly-modal.es6

Component.extend({
  actions: {
    async discontinueAssemblyAndReactivate() {
      await this.get('manufacturingActions').discontinueAssembly(this.get('assembly'))
      this.get('router').transitionTo('manufacturing.assembly.clone', assembly.get('id'), {
        queryParams: {
          isReactivate: true,
        },
      });
    },

    async discontinueAssembly() {
      await this.get('manufacturingActions').discontinueAssembly(this.get('assembly'))
      this.get('router').transitionTo('manufacturing.assembly.show', assembly.get('id'));
    }
  }
})

{{!discontinue-assembly-modal.hbs}}
{{confirm-modal
  title=(t 'assembly.discontinue.confirmHeading')
  contentHeader=(t 'common.modals.confirm')
  message=(t 'assembly.discontinue.confirmMessage')
  primaryBtnLabel=(t 'assembly.discontinue.primaryCtaName')
  secondaryBtnLabel=(t 'assembly.discontinue.secondaryCtaName')
  onPrimaryAction=(action "discontinueAssemblyAndReactivate")
  secondaryAction=(action "discontinueAssembly")
}}
```
1. You can write a unit test for this component alone
2. You can arrange all assembly modals together scannability.
3. there is a direct reference to the file, so if the reader wants to dig deeper, they can or they can move on.

vs

```
//services/manufacturing-actions.es6:89
_discontinueAssembly(assembly) {
  assembly.set('status', 'discontinued');
  return assembly.save().then(() => {
    App.Flash.flash('success', I18n.t('assembly.discontinue.success', {
      assemblyNumber: assembly.get('assemblyNumber'),
    }));
  });
},

//services/manufacturing-actions.es6:67
discontinueAssembly(assembly) {
  this.get('modalPane').confirmPopup({
    title: I18n.t('assembly.discontinue.confirmHeading'),
    contentHeader: I18n.t('common.modals.confirm'),
    message: I18n.t('assembly.discontinue.confirmMessage'),
    primaryBtnLabel: I18n.t('assembly.discontinue.primaryCtaName'),
    secondaryBtnLabel: I18n.t('assembly.discontinue.secondaryCtaName'),
    primaryAction: () => {
      return this._discontinueAssembly(assembly).then(() => {
        this.get('router').transitionTo('manufacturing.assembly.clone', assembly.get('id'), {
          queryParams: {
            isReactivate: true,
          },
        });
      });
    },
    secondaryAction: () => {
      return this._discontinueAssembly(assembly).then(() => {
        this.get('router').transitionTo('manufacturing.assembly.show', assembly.get('id'));
      });
    },
  });
},
```

### Assessment of the design.
- At its root a confirmation is a yes or no question. having more then 3 questions is a selection not a confirmation.

- The intention of the modal is to ensure that you want understand the repercussions of what you are doing, and offer you a follow up acton.

because this design is multi intentional it, causes you not to be able to confirm with a yes no question, increasing the complexity on the configuration of the messaging and the actions because you need to do multiple different things.

lets observe the reactivate modal

- the intention of the modal is to ensure the repercussion of your actions.
  - Re-activate
    - The same Bill of Materials can no longer be activated once it has been discontinued. We will clone this Bill of Materials into a new version instead.
    - Re-activate Bill of Materials
    - cancel
    vs

  - Are you sure you want to re-activate this bill of materials
    - The same Bill of Materials can no longer be activated once it has been discontinued. We will clone this Bill of Materials into a new version instead.
      - yes
      - no

if you compare this to the intentions of each intention
  - what is the intetion of this text.
    - what the repurcussions are ?
    - what you will be doing
      - don't do it

vs
  - this is what you are doing.
    - this is what will happen
    - do it
    - don't do it

source translations: https://github.com/tradegecko/tradegecko/blame/develop/config/locales/client.en.yml#L1784




-----
The heirechy of information is:

  - Discontinue Bill of Materials,
    - Are you sure?
    - You will no longer be able to create Production Orders for this variant once the Bill of Materials gets discontinued. You can choose to activate this again afterwards or create a new Bill of Materials to replace it with.
    success: Bill of Materials {{assemblyNumber}} discontinued
      - Discontinue
      - Discontinue Bill of Materials
      - Cancel

source translations: https://github.com/tradegecko/tradegecko/blame/develop/config/locales/client.en.yml#L1777 
