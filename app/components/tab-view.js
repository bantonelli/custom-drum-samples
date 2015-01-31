import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['tab'],

    activePaneId: null,

    afterRender: function() {
        this.set('panes', []);
    },

    setActivePane: function(paneId) {
        if (this.get('activePaneId') !== null) {
            if (paneId !== this.get('activePaneId')) {
                this.set('activePaneId', paneId);
            }
        } else {
            this.set('activePaneId', paneId);
        }
    }

});
