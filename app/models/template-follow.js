import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user-profile', {async: true}),
  template: DS.belongsTo('kitbuilder-template', {async: true}),
  date_followed: DS.attr('date')
});
