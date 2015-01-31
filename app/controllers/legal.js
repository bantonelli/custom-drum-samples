import Ember from 'ember';

export default Ember.Controller.extend({
    tab: 1,
    actions: {
        setTab: function (tab){
            this.set('tab', tab);
        }
    }
});
