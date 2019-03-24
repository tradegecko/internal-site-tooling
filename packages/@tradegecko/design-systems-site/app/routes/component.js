import Route from '@ember/routing/route';

export default Route.extend({
  async model(params){
    let model = await this.store.queryRecord('component', {
      path:params.component_id,
    });
    return model
  }
});
