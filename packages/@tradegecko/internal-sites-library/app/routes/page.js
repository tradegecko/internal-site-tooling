import Route from '@ember/routing/route';

export default class PageRoute extends Route {
  async model(params){
    let model = await this.store.find('page',params.page_id)
    return model
  }

  afterModel(){
    if(window.scrollTo) {
      //replace with did-insert modifier when we can upgrade ember
      window.scrollTo(0,0)
    }

  }
}
