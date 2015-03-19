import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // the server returns `{ id: 12 }`
    return {id: params.user_id};
  },
  serialize: function(model) {
    // this will make the URL `/posts/12`
    return { user_id: model.id };
  }
});
